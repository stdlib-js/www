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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":47}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":48}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":49}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":73}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":73}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":73}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":73}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* One half times the natural logarithm of 2.
*
* @module @stdlib/constants/float64/half-ln-two
* @type {number}
*
* @example
* var HALF_LN2 = require( '@stdlib/constants/float64/half-ln-two' );
* // returns 3.46573590279972654709e-01
*/

// MAIN //

/**
* One half times the natural logarithm of 2.
*
* ```tex
* \frac{\ln 2}{2}
* ```
*
* @constant
* @type {number}
* @default 3.46573590279972654709e-01
*/
var HALF_LN2 = 3.46573590279972654709e-01; // 0x3FD62E42 0xFEFA39EF


// EXPORTS //

module.exports = HALF_LN2;

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

},{"@stdlib/number/ctor":65}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":51}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":53}],53:[function(require,module,exports){
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
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FDLIBM]{@link http://www.netlib.org/fdlibm/s_expm1.c}. The implementation follows the original, but has been modified for JavaScript.
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
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var HALF_LN2 = require( '@stdlib/constants/float64/half-ln-two' );
var polyval = require( './polyval_q.js' );


// VARIABLES //

var OVERFLOW_THRESHOLD = 7.09782712893383973096e+02; // 0x40862E42 0xFEFA39EF

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3FE62E42 0xFEE00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3DEA39EF 0x35793C76

// 1 / ln(2):
var LN2_INV = 1.44269504088896338700e+00; // 0x3FF71547 0x652B82FE

// ln(2) * 56:
var LN2x56 = 3.88162421113569373274e+01; // 0x4043687A 0x9F1AF2B1

// ln(2) * 1.5:
var LN2_HALFX3 = 1.03972077083991796413e+00; // 0x3FF0A2B2 0x3F3BAB73


// MAIN //

/**
* Computes `exp(x) - 1`.
*
* ## Method
*
* 1.  Given \\(x\\), we use argument reduction to find \\(r\\) and an integer \\(k\\) such that
*
*     ```tex
*     x = k \cdot \ln(2) + r
*     ```
*
*     where
*
*     ```tex
*     |r| \leq \frac{\ln(2)}{2} \approx 0.34658
*     ```
*
*     <!-- <note> -->
*
*     A correction term \\(c\\) will need to be computed to compensate for the error in \\(r\\) when rounded to a floating-point number.
*
*     <!-- </note> -->
*
* 2.  To approximate \\(\operatorname{expm1}(r)\\), we use a special rational function on the interval \\(\[0,0.34658]\\). Since
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*     ```
*
*     we define \\(\operatorname{R1}(r^2)\\) by
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} \operatorname{R1}(r^2)
*     ```
*
*     That is,
*
*     ```tex
*     \begin{align*}
*     \operatorname{R1}(r^2) &= \frac{6}{r} \biggl(\frac{e^r+1}{e^r-1} - \frac{2}{r}\biggr) \\
*     &= \frac{6}{r} \biggl( 1 + 2 \biggl(\frac{1}{e^r-1} - \frac{1}{r}\biggr)\biggr) \\
*     &= 1 - \frac{r^2}{60} + \frac{r^4}{2520} - \frac{r^6}{100800} + \ldots
*     \end{align*}
*     ```
*
*     We use a special Remes algorithm on \\(\[0,0.347]\\) to generate a polynomial of degree \\(5\\) in \\(r^2\\) to approximate \\(\mathrm{R1}\\). The maximum error of this polynomial approximation is bounded by \\(2^{-61}\\). In other words,
*
*     ```tex
*     \operatorname{R1}(z) \approx 1 + \mathrm{Q1} \cdot z + \mathrm{Q2} \cdot z^2 + \mathrm{Q3} \cdot z^3 + \mathrm{Q4} \cdot z^4 + \mathrm{Q5} \cdot z^5
*     ```
*
*     where
*
*     ```tex
*     \begin{align*}
*     \mathrm{Q1} &= -1.6666666666666567384\mbox{e-}2 \\
*     \mathrm{Q2} &= 3.9682539681370365873\mbox{e-}4 \\
*     \mathrm{Q3} &= -9.9206344733435987357\mbox{e-}6 \\
*     \mathrm{Q4} &= 2.5051361420808517002\mbox{e-}7 \\
*     \mathrm{Q5} &= -6.2843505682382617102\mbox{e-}9
*     \end{align*}
*     ```
*
*     where \\(z = r^2\\) and the values of \\(\mathrm{Q1}\\) to \\(\mathrm{Q5}\\) are listed in the source. The error is bounded by
*
*     ```tex
*     \biggl| 1 + \mathrm{Q1} \cdot z + \ldots + \mathrm{Q5} \cdot z - \operatorname{R1}(z) \biggr| \leq 2^{-61}
*     ```
*
*     \\(\operatorname{expm1}(r) = e^r - 1\\) is then computed by the following specific way which minimizes the accumulated rounding error
*
*     ```tex
*     \operatorname{expm1}(r) = r + \frac{r^2}{2} + \frac{r^3}{2} \biggl( \frac{3 - (\mathrm{R1} + \mathrm{R1} \cdot \frac{r}{2})}{6 - r ( 3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr)
*     ```
*
*     To compensate for the error in the argument reduction, we use
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &= \operatorname{expm1}(r) + c + \operatorname{expm1}(r) \cdot c \\
*     &\approx \operatorname{expm1}(r) + c + rc
*     \end{align*}
*     ```
*
*     Thus, \\(c + rc\\) will be added in as the correction terms for \\(\operatorname{expm1}(r+c)\\). Now, we can rearrange the term to avoid optimization screw up.
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &\approx r - \biggl( \biggl( r + \biggl( \frac{r^2}{2} \biggl( \frac{\mathrm{R1} - (3 - \mathrm{R1} \cdot \frac{r}{2})}{6 - r (3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr) - c \biggr) - c \biggr) - \frac{r^2}{2} \biggr) \\
*     &= r - \mathrm{E}
*     \end{align*}
*     ```
*
* 3.  To scale back to obtain \\(\operatorname{expm1}(x)\\), we have (from step 1)
*
*     ```tex
*     \operatorname{expm1}(x) = \begin{cases}
*     2^k  (\operatorname{expm1}(r) + 1) - 1 \\
*     2^k (\operatorname{expm1}(r) + (1-2^{-k}))
*     \end{cases}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{expm1}(\infty) &= \infty \\
* \operatorname{expm1}(-\infty) &= -1 \\
* \operatorname{expm1}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* ## Notes
*
* -   For finite arguments, only \\(\operatorname{expm1}(0) = 0\\) is exact.
*
* -   To save one multiplication, we scale the coefficient \\(\mathrm{Qi}\\) to \\(\mathrm{Qi} \cdot {2^i}\\) and replace \\(z\\) by \\(\frac{x^2}{2}\\).
*
* -   To achieve maximum accuracy, we compute \\(\operatorname{expm1}(x)\\) by
*
*     -   if \\(x < -56 \cdot \ln(2)\\), return \\(-1.0\\) (raise inexact if \\(x\\) does not equal \\(\infty\\))
*
*     -   if \\(k = 0\\), return \\(r-\mathrm{E}\\)
*
*     -   if \\(k = -1\\), return \\(\frac{(r-\mathrm{E})-1}{2}\\)
*
*     -   if \\(k = 1\\),
*
*         -   if \\(r < -0.25\\), return \\(2((r+0.5)- \mathrm{E})\\)
*         -   else return \\(1+2(r-\mathrm{E})\\)
*
*     -   if \\(k < -2\\) or \\(k > 56\\), return \\(2^k(1-(\mathrm{E}-r)) - 1\\) (or \\(e^x-1\\))
*
*     -   if \\(k \leq 20\\), return \\(2^k((1-2^{-k})-(\mathrm{E}-r))\\)
*
*     -   else return \\(2^k(1-((\mathrm{E}+2^{-k})-r))\\)
*
* -   For IEEE 754 double, if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(\operatorname{expm1}(x)\\) will overflow.
*
* -   The hexadecimal values listed in the source are the intended ones for the implementation constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = expm1( 0.2 );
* // returns ~0.221
*
* @example
* var v = expm1( -9.0 );
* // returns ~-0.9999
*
* @example
* var v = expm1( 0.0 );
* // returns 0.0
*
* @example
* var v = expm1( NaN );
* // returns NaN
*/
function expm1( x ) {
	var halfX;
	var sign;
	var hi;
	var lo;
	var hx;
	var r1;
	var y;
	var z;
	var c;
	var t;
	var e;
	var k;

	if ( x === PINF || isnan( x ) ) {
		return x;
	}
	if ( x === NINF ) {
		return -1.0;
	}
	if ( x === 0.0 ) {
		return x; // handles +-0 (IEEE 754-2008)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		sign = true;
		y = -x;
	} else {
		sign = false;
		y = x;
	}
	// Filter out huge and non-finite arguments...
	if ( y >= LN2x56 ) { // if |x| >= 56*ln(2)
		if ( sign ) { // if x <= -56*ln(2)
			return -1.0;
		}
		if ( y >= OVERFLOW_THRESHOLD ) { // if |x| >= 709.78...
			return PINF;
		}
	}
	// Extract the more significant bits from |x|:
	hx = getHighWord( y )|0; // asm type annotation

	// Argument reduction...
	if ( y > HALF_LN2 ) { // if |x| > 0.5*ln(2)
		if ( y < LN2_HALFX3 ) { // if |x| < 1.5*ln(2)
			if ( sign ) {
				hi = x + LN2_HI;
				lo = -LN2_LO;
				k = -1;
			} else {
				hi = x - LN2_HI;
				lo = LN2_LO;
				k = 1;
			}
		} else {
			if ( sign ) {
				k = (LN2_INV*x) - 0.5;
			} else {
				k = (LN2_INV*x) + 0.5;
			}
			k |= 0; // use a bitwise OR to cast `k` to an integer (see also asm.js type annotations: http://asmjs.org/spec/latest/#annotations)
			t = k;
			hi = x - (t*LN2_HI); // t*ln2_hi is exact here
			lo = t * LN2_LO;
		}
		x = hi - lo;
		c = (hi-x) - lo;
	}
	// if |x| < 2**-54 => high word: 0 01111001001 00000000000000000000 => 0x3c900000 = 1016070144  => exponent = 01111001001 = 969 = 1023-54
	else if ( hx < 1016070144 ) {
		return x;
	}
	else {
		k = 0;
	}
	// x is now in primary range...
	halfX = 0.5 * x;
	z = x * halfX;

	r1 = 1.0 + ( z * polyval( z ) );

	t = 3.0 - (r1*halfX);
	e = z * ( (r1-t) / (6.0 - (x*t)) );
	if ( k === 0 ) {
		return x - ( (x*e) - z );	// c is 0
	}
	e = ( x * (e-c) ) - c;
	e -= z;
	if ( k === -1 ) {
		return ( 0.5*(x-e) )- 0.5;
	}
	if ( k === 1 ) {
		if ( x < -0.25 ) {
			return -2.0 * ( e - (x+0.5) );
		}
		return 1 + ( 2.0 * (x-e) );
	}
	if ( k <= -2 || k > 56 ) { // suffice to return exp(x)-1
		y = 1.0 - (e-x);

		// Add k to y's exponent:
		hi = (getHighWord( y ) + (k<<20))|0; // asm type annotation
		y = setHighWord( y, hi );

		return y - 1.0;
	}
	t = 1.0;
	if ( k < 20 ) {
		// 0x3ff00000 - (0x200000>>k) = 1072693248 - (0x200000>>k) => 0x200000 = 0 00000000010 00000000000000000000
		hi = (1072693248 - (0x200000>>k))|0; // asm type annotation
		t = setHighWord( t, hi ); // t=1-2^-k
		y = t - (e-x);
	} else {
		hi = ( (FLOAT64_EXPONENT_BIAS-k)<<20 )|0; // asm type annotation
		t = setHighWord( t, hi ); // t=2^-k
		y = x - (e+t);
		y += 1.0;
	}
	// Add k to y's exponent:
	hi = (getHighWord( y ) + (k<<20))|0; // asm type annotation
	return setHighWord( y, hi );
}


// EXPORTS //

module.exports = expm1;

},{"./polyval_q.js":56,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/half-ln-two":44,"@stdlib/constants/float64/ninf":45,"@stdlib/constants/float64/pinf":46,"@stdlib/math/base/assert/is-nan":50,"@stdlib/number/float64/base/get-high-word":68,"@stdlib/number/float64/base/set-high-word":71}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute `exp(x) - 1`.
*
* @module @stdlib/math/base/special/expm1
*
* @example
* var expm1 = require( '@stdlib/math/base/special/expm1' );
*
* var v = expm1( 0.2 );
* // returns ~0.221
*
* v = expm1( -9.0 );
* // returns ~-0.999
*
* v = expm1( 0.0 );
* // returns 0.0
*
* v = expm1( NaN );
* // returns NaN
*/

// MODULES //

var expm1 = require( './expm1.js' );


// EXPORTS //

module.exports = expm1;

},{"./expm1.js":54}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return -0.03333333333333313;
	}
	return -0.03333333333333313 + (x * (0.0015873015872548146 + (x * (-0.0000793650757867488 + (x * (0.000004008217827329362 + (x * -2.0109921818362437e-7))))))); // eslint-disable-line max-len
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
* Relative error exponential function.
*
* @module @stdlib/math/base/special/expm1rel
*
* @example
* var expm1rel = require( '@stdlib/math/base/special/expm1rel' );
*
* var v = expm1rel( 0.0 );
* // returns 1.0
*
* v = expm1rel( 1.0 );
* // returns ~1.718
*
* v = expm1rel( -1.0 );
* // returns ~0.632
*
* v = expm1rel( NaN );
* // returns NaN
*/

// MODULES //

var expm1rel = require( './main.js' );


// EXPORTS //

module.exports = expm1rel;

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

// MODULES //

var expm1 = require( '@stdlib/math/base/special/expm1' );
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// VARIABLES //

var OVERFLOW_THRESHOLD = 7.09782712893383973096e+02; // 0x40862E42 0xFEFA39EF


// MAIN //

/**
* Computes the relative error exponential.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = expm1rel( 0.0 );
* // returns 1.0
*
* @example
* var v = expm1rel( 1.0 );
* // returns ~1.718
*
* @example
* var v = expm1rel( -1.0 );
* // returns ~0.632
*
* @example
* var v = expm1rel( NaN );
* // returns NaN
*/
function expm1rel( x ) {
	if ( abs( x ) <= EPS ) {
		return 1.0; // L'Hopital's Rule
	}
	if ( x >= OVERFLOW_THRESHOLD ) {
		return PINF; // L'Hopital's Rule
	}
	return expm1( x ) / x;
}


// EXPORTS //

module.exports = expm1rel;

},{"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/pinf":46,"@stdlib/math/base/special/abs":52,"@stdlib/math/base/special/expm1":55}],59:[function(require,module,exports){
module.exports={"x": [-709.78, -709.0705105105105, -708.361021021021, -707.6515315315315, -706.942042042042, -706.2325525525525, -705.5230630630631, -704.8135735735735, -704.1040840840841, -703.3945945945945, -702.6851051051051, -701.9756156156155, -701.2661261261261, -700.5566366366367, -699.8471471471471, -699.1376576576577, -698.4281681681681, -697.7186786786787, -697.0091891891892, -696.2996996996997, -695.5902102102102, -694.8807207207207, -694.1712312312312, -693.4617417417417, -692.7522522522522, -692.0427627627628, -691.3332732732732, -690.6237837837838, -689.9142942942942, -689.2048048048048, -688.4953153153153, -687.7858258258258, -687.0763363363363, -686.3668468468468, -685.6573573573573, -684.9478678678679, -684.2383783783783, -683.5288888888889, -682.8193993993993, -682.1099099099099, -681.4004204204203, -680.6909309309309, -679.9814414414415, -679.2719519519519, -678.5624624624625, -677.8529729729729, -677.1434834834835, -676.433993993994, -675.7245045045045, -675.015015015015, -674.3055255255255, -673.596036036036, -672.8865465465465, -672.177057057057, -671.4675675675676, -670.758078078078, -670.0485885885886, -669.339099099099, -668.6296096096096, -667.9201201201201, -667.2106306306306, -666.5011411411411, -665.7916516516516, -665.0821621621621, -664.3726726726727, -663.6631831831832, -662.9536936936937, -662.2442042042042, -661.5347147147147, -660.8252252252252, -660.1157357357357, -659.4062462462463, -658.6967567567567, -657.9872672672673, -657.2777777777777, -656.5682882882883, -655.8587987987987, -655.1493093093093, -654.4398198198198, -653.7303303303303, -653.0208408408408, -652.3113513513513, -651.6018618618618, -650.8923723723724, -650.1828828828828, -649.4733933933934, -648.7639039039038, -648.0544144144144, -647.344924924925, -646.6354354354354, -645.925945945946, -645.2164564564564, -644.506966966967, -643.7974774774775, -643.087987987988, -642.3784984984985, -641.669009009009, -640.9595195195195, -640.25003003003, -639.5405405405405, -638.8310510510511, -638.1215615615615, -637.4120720720721, -636.7025825825825, -635.9930930930931, -635.2836036036035, -634.5741141141141, -633.8646246246246, -633.1551351351351, -632.4456456456456, -631.7361561561561, -631.0266666666666, -630.3171771771772, -629.6076876876876, -628.8981981981982, -628.1887087087086, -627.4792192192192, -626.7697297297298, -626.0602402402402, -625.3507507507508, -624.6412612612612, -623.9317717717718, -623.2222822822823, -622.5127927927928, -621.8033033033033, -621.0938138138138, -620.3843243243243, -619.6748348348348, -618.9653453453453, -618.2558558558559, -617.5463663663663, -616.8368768768769, -616.1273873873873, -615.4178978978979, -614.7084084084083, -613.9989189189189, -613.2894294294294, -612.5799399399399, -611.8704504504504, -611.1609609609609, -610.4514714714715, -609.741981981982, -609.0324924924925, -608.323003003003, -607.6135135135135, -606.904024024024, -606.1945345345346, -605.485045045045, -604.7755555555556, -604.066066066066, -603.3565765765766, -602.6470870870871, -601.9375975975976, -601.2281081081081, -600.5186186186186, -599.8091291291291, -599.0996396396396, -598.3901501501501, -597.6806606606607, -596.9711711711711, -596.2616816816817, -595.5521921921921, -594.8427027027027, -594.1332132132131, -593.4237237237237, -592.7142342342343, -592.0047447447447, -591.2952552552553, -590.5857657657657, -589.8762762762763, -589.1667867867868, -588.4572972972973, -587.7478078078078, -587.0383183183183, -586.3288288288288, -585.6193393393394, -584.9098498498498, -584.2003603603604, -583.4908708708708, -582.7813813813814, -582.0718918918919, -581.3624024024024, -580.6529129129129, -579.9434234234234, -579.2339339339339, -578.5244444444445, -577.8149549549549, -577.1054654654654, -576.395975975976, -575.6864864864865, -574.976996996997, -574.2675075075075, -573.558018018018, -572.8485285285285, -572.1390390390391, -571.4295495495495, -570.7200600600601, -570.0105705705705, -569.3010810810811, -568.5915915915916, -567.8821021021021, -567.1726126126126, -566.4631231231231, -565.7536336336336, -565.0441441441442, -564.3346546546546, -563.6251651651652, -562.9156756756756, -562.2061861861862, -561.4966966966967, -560.7872072072072, -560.0777177177177, -559.3682282282282, -558.6587387387387, -557.9492492492493, -557.2397597597597, -556.5302702702702, -555.8207807807808, -555.1112912912913, -554.4018018018018, -553.6923123123123, -552.9828228228228, -552.2733333333333, -551.5638438438439, -550.8543543543543, -550.1448648648649, -549.4353753753753, -548.7258858858859, -548.0163963963964, -547.3069069069069, -546.5974174174174, -545.8879279279279, -545.1784384384384, -544.468948948949, -543.7594594594594, -543.04996996997, -542.3404804804804, -541.630990990991, -540.9215015015016, -540.212012012012, -539.5025225225224, -538.793033033033, -538.0835435435436, -537.3740540540541, -536.6645645645646, -535.955075075075, -535.2455855855856, -534.5360960960961, -533.8266066066066, -533.1171171171171, -532.4076276276276, -531.6981381381381, -530.9886486486487, -530.2791591591591, -529.5696696696697, -528.8601801801801, -528.1506906906907, -527.4412012012012, -526.7317117117117, -526.0222222222222, -525.3127327327327, -524.6032432432432, -523.8937537537538, -523.1842642642642, -522.4747747747748, -521.7652852852852, -521.0557957957958, -520.3463063063064, -519.6368168168168, -518.9273273273272, -518.2178378378378, -517.5083483483484, -516.7988588588589, -516.0893693693694, -515.3798798798798, -514.6703903903904, -513.9609009009009, -513.2514114114114, -512.5419219219219, -511.8324324324324, -511.1229429429429, -510.4134534534535, -509.70396396396393, -508.9944744744745, -508.284984984985, -507.5754954954955, -506.866006006006, -506.1565165165165, -505.44702702702705, -504.7375375375375, -504.02804804804805, -503.31855855855855, -502.60906906906905, -501.8995795795796, -501.19009009009005, -500.4806006006006, -499.7711111111111, -499.0616216216216, -498.3521321321321, -497.6426426426426, -496.93315315315317, -496.2236636636636, -495.5141741741742, -494.8046846846847, -494.0951951951952, -493.38570570570573, -492.6762162162162, -491.96672672672673, -491.25723723723723, -490.54774774774774, -489.8382582582583, -489.12876876876874, -488.4192792792793, -487.7097897897898, -487.0003003003003, -486.2908108108108, -485.5813213213213, -484.87183183183186, -484.1623423423423, -483.45285285285286, -482.74336336336336, -482.03387387387386, -481.3243843843844, -480.61489489489486, -479.9054054054054, -479.1959159159159, -478.4864264264264, -477.7769369369369, -477.0674474474474, -476.357957957958, -475.6484684684684, -474.938978978979, -474.2294894894895, -473.52, -472.81051051051054, -472.101021021021, -471.39153153153154, -470.68204204204204, -469.97255255255254, -469.2630630630631, -468.55357357357354, -467.8440840840841, -467.1345945945946, -466.4251051051051, -465.7156156156156, -465.0061261261261, -464.29663663663666, -463.5871471471471, -462.87765765765766, -462.16816816816817, -461.45867867867867, -460.7491891891892, -460.03969969969967, -459.3302102102102, -458.6207207207207, -457.9112312312312, -457.2017417417417, -456.49225225225223, -455.7827627627628, -455.07327327327323, -454.3637837837838, -453.6542942942943, -452.9448048048048, -452.2353153153153, -451.52582582582585, -450.81633633633635, -450.10684684684685, -449.39735735735735, -448.68786786786785, -447.97837837837835, -447.2688888888889, -446.5593993993994, -445.8499099099099, -445.1404204204204, -444.4309309309309, -443.7214414414414, -443.01195195195197, -442.3024624624625, -441.592972972973, -440.8834834834835, -440.173993993994, -439.4645045045045, -438.75501501501503, -438.04552552552553, -437.33603603603603, -436.62654654654654, -435.91705705705704, -435.2075675675676, -434.4980780780781, -433.7885885885886, -433.0790990990991, -432.3696096096096, -431.6601201201201, -430.95063063063066, -430.24114114114116, -429.53165165165166, -428.82216216216216, -428.11267267267266, -427.40318318318316, -426.6936936936937, -425.9842042042042, -425.2747147147147, -424.5652252252252, -423.8557357357357, -423.1462462462462, -422.4367567567568, -421.7272672672673, -421.0177777777778, -420.3082882882883, -419.5987987987988, -418.8893093093093, -418.17981981981984, -417.47033033033034, -416.76084084084084, -416.05135135135134, -415.34186186186184, -414.6323723723724, -413.9228828828829, -413.2133933933934, -412.5039039039039, -411.7944144144144, -411.0849249249249, -410.37543543543546, -409.66594594594596, -408.95645645645646, -408.24696696696697, -407.53747747747747, -406.82798798798797, -406.1184984984985, -405.409009009009, -404.6995195195195, -403.99003003003, -403.2805405405405, -402.57105105105103, -401.8615615615616, -401.1520720720721, -400.4425825825826, -399.7330930930931, -399.0236036036036, -398.3141141141141, -397.60462462462465, -396.89513513513515, -396.18564564564565, -395.47615615615615, -394.76666666666665, -394.05717717717715, -393.3476876876877, -392.6381981981982, -391.9287087087087, -391.2192192192192, -390.5097297297297, -389.80024024024027, -389.0907507507508, -388.3812612612613, -387.6717717717718, -386.9622822822823, -386.2527927927928, -385.54330330330333, -384.83381381381383, -384.12432432432433, -383.41483483483483, -382.70534534534534, -381.99585585585584, -381.2863663663664, -380.5768768768769, -379.8673873873874, -379.1578978978979, -378.4484084084084, -377.7389189189189, -377.02942942942946, -376.31993993993996, -375.61045045045046, -374.90096096096096, -374.19147147147146, -373.48198198198196, -372.7724924924925, -372.063003003003, -371.3535135135135, -370.644024024024, -369.9345345345345, -369.225045045045, -368.5155555555556, -367.8060660660661, -367.0965765765766, -366.3870870870871, -365.6775975975976, -364.96810810810814, -364.25861861861864, -363.54912912912914, -362.83963963963964, -362.13015015015014, -361.42066066066064, -360.7111711711712, -360.0016816816817, -359.2921921921922, -358.5827027027027, -357.8732132132132, -357.1637237237237, -356.45423423423426, -355.74474474474476, -355.03525525525527, -354.32576576576577, -353.61627627627627, -352.90678678678677, -352.1972972972973, -351.4878078078078, -350.7783183183183, -350.0688288288288, -349.35933933933933, -348.64984984984983, -347.9403603603604, -347.2308708708709, -346.5213813813814, -345.8118918918919, -345.1024024024024, -344.39291291291295, -343.68342342342345, -342.97393393393395, -342.26444444444445, -341.55495495495495, -340.84546546546545, -340.135975975976, -339.4264864864865, -338.716996996997, -338.0075075075075, -337.298018018018, -336.5885285285285, -335.87903903903907, -335.1695495495496, -334.4600600600601, -333.7505705705706, -333.0410810810811, -332.3315915915916, -331.62210210210213, -330.91261261261263, -330.20312312312313, -329.49363363363364, -328.78414414414414, -328.07465465465464, -327.3651651651652, -326.6556756756757, -325.9461861861862, -325.2366966966967, -324.5272072072072, -323.81771771771776, -323.10822822822826, -322.39873873873876, -321.68924924924926, -320.97975975975976, -320.27027027027026, -319.5607807807808, -318.8512912912913, -318.1418018018018, -317.4323123123123, -316.7228228228228, -316.0133333333333, -315.3038438438439, -314.5943543543544, -313.8848648648649, -313.1753753753754, -312.4658858858859, -311.7563963963964, -311.04690690690694, -310.33741741741744, -309.62792792792794, -308.91843843843844, -308.20894894894894, -307.49945945945944, -306.78996996997, -306.0804804804805, -305.370990990991, -304.6615015015015, -303.952012012012, -303.2425225225225, -302.53303303303306, -301.82354354354356, -301.11405405405407, -300.40456456456457, -299.69507507507507, -298.9855855855856, -298.2760960960961, -297.5666066066066, -296.8571171171171, -296.1476276276276, -295.43813813813813, -294.7286486486487, -294.0191591591592, -293.3096696696697, -292.6001801801802, -291.8906906906907, -291.1812012012012, -290.47171171171175, -289.76222222222225, -289.05273273273275, -288.34324324324325, -287.63375375375375, -286.92426426426425, -286.2147747747748, -285.5052852852853, -284.7957957957958, -284.0863063063063, -283.3768168168168, -282.6673273273273, -281.95783783783787, -281.2483483483484, -280.5388588588589, -279.8293693693694, -279.1198798798799, -278.4103903903904, -277.70090090090093, -276.99141141141143, -276.28192192192193, -275.57243243243244, -274.86294294294294, -274.1534534534535, -273.443963963964, -272.7344744744745, -272.024984984985, -271.3154954954955, -270.606006006006, -269.89651651651656, -269.18702702702706, -268.47753753753756, -267.76804804804806, -267.05855855855856, -266.34906906906906, -265.6395795795796, -264.9300900900901, -264.2206006006006, -263.5111111111111, -262.8016216216216, -262.0921321321321, -261.3826426426427, -260.6731531531532, -259.9636636636637, -259.2541741741742, -258.5446846846847, -257.8351951951952, -257.12570570570574, -256.41621621621624, -255.70672672672674, -254.99723723723724, -254.28774774774774, -253.5782582582583, -252.8687687687688, -252.1592792792793, -251.4497897897898, -250.7403003003003, -250.0308108108108, -249.32132132132136, -248.61183183183186, -247.90234234234237, -247.19285285285287, -246.48336336336337, -245.77387387387387, -245.06438438438443, -244.35489489489493, -243.64540540540543, -242.93591591591593, -242.22642642642643, -241.51693693693693, -240.8074474474475, -240.097957957958, -239.3884684684685, -238.678978978979, -237.9694894894895, -237.26, -236.55051051051055, -235.84102102102105, -235.13153153153155, -234.42204204204205, -233.71255255255255, -233.0030630630631, -232.2935735735736, -231.5840840840841, -230.8745945945946, -230.1651051051051, -229.4556156156156, -228.74612612612617, -228.03663663663667, -227.32714714714717, -226.61765765765767, -225.90816816816817, -225.19867867867868, -224.48918918918923, -223.77969969969973, -223.07021021021023, -222.36072072072074, -221.65123123123124, -220.94174174174174, -220.2322522522523, -219.5227627627628, -218.8132732732733, -218.1037837837838, -217.3942942942943, -216.6848048048048, -215.97531531531536, -215.26582582582586, -214.55633633633636, -213.84684684684686, -213.13735735735736, -212.42786786786786, -211.71837837837842, -211.00888888888892, -210.29939939939942, -209.58990990990992, -208.88042042042042, -208.17093093093098, -207.46144144144148, -206.75195195195198, -206.04246246246248, -205.33297297297298, -204.62348348348348, -203.91399399399404, -203.20450450450454, -202.49501501501504, -201.78552552552554, -201.07603603603604, -200.36654654654654, -199.6570570570571, -198.9475675675676, -198.2380780780781, -197.5285885885886, -196.81909909909916, -196.1096096096096, -195.40012012012016, -194.6906306306306, -193.98114114114117, -193.27165165165172, -192.56216216216217, -191.85267267267272, -191.14318318318317, -190.43369369369373, -189.72420420420417, -189.01471471471473, -188.30522522522529, -187.59573573573573, -186.8862462462463, -186.17675675675673, -185.4672672672673, -184.75777777777785, -184.0482882882883, -183.33879879879885, -182.6293093093093, -181.91981981981985, -181.2103303303304, -180.50084084084085, -179.7913513513514, -179.08186186186185, -178.3723723723724, -177.66288288288285, -176.9533933933934, -176.24390390390397, -175.5344144144144, -174.82492492492497, -174.11543543543542, -173.40594594594597, -172.69645645645653, -171.98696696696697, -171.27747747747753, -170.56798798798798, -169.85849849849853, -169.14900900900898, -168.43951951951954, -167.7300300300301, -167.02054054054054, -166.3110510510511, -165.60156156156154, -164.8920720720721, -164.18258258258265, -163.4730930930931, -162.76360360360366, -162.0541141141141, -161.34462462462466, -160.63513513513522, -159.92564564564566, -159.21615615615622, -158.50666666666666, -157.79717717717722, -157.08768768768766, -156.37819819819822, -155.66870870870878, -154.95921921921922, -154.24972972972978, -153.54024024024022, -152.83075075075078, -152.12126126126134, -151.41177177177178, -150.70228228228234, -149.99279279279278, -149.28330330330334, -148.57381381381379, -147.86432432432434, -147.1548348348349, -146.44534534534534, -145.7358558558559, -145.02636636636635, -144.3168768768769, -143.60738738738746, -142.8978978978979, -142.18840840840846, -141.4789189189189, -140.76942942942947, -140.05993993994002, -139.35045045045047, -138.64096096096102, -137.93147147147147, -137.22198198198203, -136.51249249249247, -135.80300300300303, -135.09351351351359, -134.38402402402403, -133.6745345345346, -132.96504504504503, -132.2555555555556, -131.54606606606615, -130.8365765765766, -130.12708708708715, -129.4175975975976, -128.70810810810815, -127.9986186186186, -127.28912912912915, -126.57963963963971, -125.87015015015015, -125.16066066066071, -124.45117117117115, -123.74168168168171, -123.03219219219227, -122.32270270270271, -121.61321321321327, -120.90372372372372, -120.19423423423427, -119.48474474474483, -118.77525525525527, -118.06576576576583, -117.35627627627628, -116.64678678678683, -115.93729729729728, -115.22780780780784, -114.51831831831839, -113.80882882882884, -113.0993393393394, -112.38984984984984, -111.6803603603604, -110.97087087087095, -110.2613813813814, -109.55189189189196, -108.8424024024024, -108.13291291291296, -107.4234234234234, -106.71393393393396, -106.00444444444452, -105.29495495495496, -104.58546546546552, -103.87597597597596, -103.16648648648652, -102.45699699699708, -101.74750750750752, -101.03801801801808, -100.32852852852852, -99.61903903903908, -98.90954954954952, -98.20006006006008, -97.49057057057064, -96.78108108108108, -96.07159159159164, -95.36210210210209, -94.65261261261264, -93.9431231231232, -93.23363363363364, -92.5241441441442, -91.81465465465465, -91.1051651651652, -90.39567567567576, -89.6861861861862, -88.97669669669676, -88.2672072072072, -87.55771771771776, -86.84822822822821, -86.13873873873877, -85.42924924924932, -84.71975975975977, -84.01027027027033, -83.30078078078077, -82.59129129129133, -81.88180180180188, -81.17231231231233, -80.46282282282289, -79.75333333333333, -79.04384384384389, -78.33435435435433, -77.62486486486489, -76.91537537537545, -76.20588588588589, -75.49639639639645, -74.78690690690689, -74.07741741741745, -73.36792792792801, -72.65843843843845, -71.94894894894901, -71.23945945945945, -70.52996996997001, -69.82048048048057, -69.11099099099101, -68.40150150150157, -67.69201201201201, -66.98252252252257, -66.27303303303302, -65.56354354354357, -64.85405405405413, -64.14456456456458, -63.43507507507513, -62.72558558558558, -62.016096096096135, -61.30660660660669, -60.597117117117136, -59.887627627627694, -59.17813813813814, -58.468648648648696, -57.75915915915914, -57.0496696696697, -56.340180180180255, -55.6306906906907, -54.92120120120126, -54.2117117117117, -53.50222222222226, -52.792732732732816, -52.08324324324326, -51.37375375375382, -50.66426426426426, -49.95477477477482, -49.24528528528538, -48.53579579579582, -47.82630630630638, -47.11681681681682, -46.40732732732738, -45.697837837837824, -44.98834834834838, -44.27885885885894, -43.56936936936938, -42.85987987987994, -42.150390390390385, -41.44090090090094, -40.7314114114115, -40.021921921921944, -39.3124324324325, -38.602942942942946, -37.8934534534535, -37.18396396396395, -36.474474474474505, -35.76498498498506, -35.05549549549551, -34.346006006006064, -33.63651651651651, -32.927027027027066, -32.21753753753762, -31.508048048048067, -30.798558558558625, -30.08906906906907, -29.379579579579627, -28.67009009009007, -27.96060060060063, -27.251111111111186, -26.54162162162163, -25.832132132132188, -25.12264264264263, -24.41315315315319, -23.703663663663747, -22.99417417417419, -22.28468468468475, -21.575195195195192, -20.86570570570575, -20.156216216216308, -19.44672672672675, -18.73723723723731, -18.027747747747753, -17.31825825825831, -16.608768768768755, -15.899279279279313, -15.18978978978987, -14.480300300300314, -13.770810810810872, -13.061321321321316, -12.351831831831873, -11.642342342342431, -10.932852852852875, -10.223363363363433, -9.513873873873877, -8.804384384384434, -8.094894894894878, -7.385405405405436, -6.6759159159159935, -5.9664264264264375, -5.256936936936995, -4.547447447447439, -3.8379579579579968, -3.1284684684685544, -2.4189789789789984, -1.709489489489556, -1.0], "expected": [0.0014088872608413875, 0.0014102969805922807, 0.0014117095242742394, 0.00141312490038106, 0.0014145431174406372, 0.0014159641840151337, 0.001417388108701154, 0.0014188149001299174, 0.0014202445669674315, 0.0014216771179146688, 0.001423112561707742, 0.0014245509071180832, 0.0014259921629526209, 0.001427436338053961, 0.0014288834413005672, 0.0014303334816069423, 0.0014317864679238125, 0.0014332424092383105, 0.0014347013145741612, 0.0014361631929918686, 0.0014376280535889025, 0.0014390959054998876, 0.0014405667578967934, 0.0014420406199891255, 0.0014435175010241172, 0.0014449974102869235, 0.0014464803571008157, 0.0014479663508273758, 0.001449455400866696, 0.0014509475166575748, 0.0014524427076777167, 0.0014539409834439347, 0.0014554423535123495, 0.0014569468274785947, 0.0014584544149780203, 0.0014599651256858987, 0.0014614789693176316, 0.0014629959556289583, 0.0014645160944161653, 0.0014660393955162967, 0.001467565868807368, 0.0014690955242085766, 0.0014706283716805202, 0.0014721644212254102, 0.0014737036828872908, 0.0014752461667522578, 0.0014767918829486771, 0.0014783408416474096, 0.0014798930530620321, 0.0014814485274490612, 0.0014830072751081816, 0.001484569306382471, 0.0014861346316586308, 0.0014877032613672145, 0.0014892752059828612, 0.0014908504760245277, 0.0014924290820557229, 0.001494011034684745, 0.0014955963445649177, 0.0014971850223948306, 0.0014987770789185798, 0.0015003725249260087, 0.0015019713712529537, 0.0015035736287814876, 0.0015051793084401685, 0.001506788421204287, 0.0015084009780961152, 0.0015100169901851618, 0.0015116364685884211, 0.0015132594244706321, 0.001514885869044531, 0.0015165158135711132, 0.0015181492693598908, 0.0015197862477691546, 0.001521426760206238, 0.001523070818127781, 0.0015247184330399984, 0.0015263696164989464, 0.0015280243801107942, 0.0015296827355320954, 0.0015313446944700613, 0.0015330102686828377, 0.00153467946997978, 0.0015363523102217347, 0.0015380288013213193, 0.0015397089552432036, 0.0015413927840043978, 0.0015430802996745352, 0.0015447715143761633, 0.0015464664402850329, 0.0015481650896303901, 0.001549867474695272, 0.0015515736078167998, 0.0015532835013864804, 0.0015549971678505037, 0.0015567146197100453, 0.0015584358695215714, 0.0015601609298971438, 0.001561889813504728, 0.0015636225330685036, 0.0015653591013691768, 0.001567099531244294, 0.001568843835588558, 0.0015705920273541478, 0.0015723441195510369, 0.0015741001252473183, 0.001575860057569528, 0.0015776239297029726, 0.0015793917548920593, 0.0015811635464406252, 0.0015829393177122736, 0.0015847190821307077, 0.0015865028531800711, 0.001588290644405287, 0.0015900824694124, 0.0015918783418689246, 0.0015936782755041885, 0.0015954822841096864, 0.0015972903815394293, 0.0015991025817103002, 0.0016009188986024123, 0.0016027393462594664, 0.001604563938789114, 0.0016063926903633226, 0.0016082256152187403, 0.0016100627276570678, 0.0016119040420454278, 0.0016137495728167424, 0.0016155993344701073, 0.0016174533415711737, 0.0016193116087525302, 0.0016211741507140857, 0.001623040982223461, 0.0016249121181163746, 0.0016267875732970394, 0.0016286673627385559, 0.0016305515014833122, 0.001632440004643385, 0.0016343328874009425, 0.001636230165008653, 0.0016381318527900928, 0.0016400379661401603, 0.0016419485205254906, 0.0016438635314848739, 0.0016457830146296766, 0.0016477069856442664, 0.001649635460286438, 0.0016515684543878455, 0.0016535059838544326, 0.0016554480646668722, 0.001657394712881003, 0.0016593459446282736, 0.0016613017761161878, 0.0016632622236287527, 0.0016652273035269315, 0.0016671970322490977, 0.0016691714263114953, 0.001671150502308697, 0.001673134276914073, 0.0016751227668802575, 0.001677115989039619, 0.0016791139603047377, 0.0016811166976688817, 0.0016831242182064913, 0.0016851365390736608, 0.0016871536775086302, 0.0016891756508322768, 0.0016912024764486088, 0.0016932341718452685, 0.0016952707545940312, 0.0016973122423513147, 0.0016993586528586888, 0.0017014100039433881, 0.0017034663135188316, 0.001705527599585142, 0.0017075938802296729, 0.0017096651736275368, 0.0017117414980421378, 0.0017138228718257093, 0.0017159093134198537, 0.0017180008413560876, 0.0017200974742563912, 0.0017221992308337586, 0.0017243061298927577, 0.001726418190330088, 0.0017285354311351482, 0.0017306578713906038, 0.0017327855302729602, 0.0017349184270531407, 0.0017370565810970685, 0.0017392000118662536, 0.001741348738918381, 0.0017435027819079074, 0.00174566216058666, 0.0017478268948044402, 0.0017499970045096321, 0.001752172509749814, 0.001754353430672378, 0.0017565397875251494, 0.0017587316006570156, 0.0017609288905185562, 0.0017631316776626782, 0.0017653399827452596, 0.0017675538265257919, 0.0017697732298680323, 0.0017719982137406596, 0.0017742287992179326, 0.0017764650074803582, 0.0017787068598153586, 0.0017809543776179492, 0.0017832075823914196, 0.001785466495748016, 0.0017877311394096365, 0.0017900015352085238, 0.0017922777050879695, 0.0017945596711030193, 0.001796847455421186, 0.001799141080323167, 0.0018014405682035676, 0.0018037459415716317, 0.001806057223051972, 0.0018083744353853154, 0.001810697601429244, 0.0018130267441589505, 0.0018153618866679933, 0.00181770305216906, 0.0018200502639947383, 0.0018224035455982881, 0.0018247629205544254, 0.0018271284125601088, 0.0018295000454353315, 0.0018318778431239229, 0.0018342618296943525, 0.0018366520293405437, 0.0018390484663826912, 0.0018414511652680853, 0.0018438601505719457, 0.0018462754469982556, 0.0018486970793806098, 0.0018511250726830641, 0.001853559452000993, 0.0018560002425619538, 0.0018584474697265604, 0.0018609011589893595, 0.0018633613359797167, 0.0018658280264627085, 0.0018683012563400214, 0.0018707810516508602, 0.0018732674385728606, 0.0018757604434230092, 0.0018782600926585753, 0.0018807664128780426, 0.0018832794308220565, 0.0018857991733743733, 0.001888325667562818, 0.0018908589405602532, 0.0018933990196855503, 0.001895945932404574, 0.0018984997063311716, 0.0019010603692281695, 0.0019036279490083816, 0.0019062024737356211, 0.0019087839716257255, 0.001911372471047586, 0.0019139680005241858, 0.00191657058873365, 0.0019191802645102994, 0.0019217970568457178, 0.0019244209948898244, 0.0019270521079519547, 0.0019296904255019544, 0.0019323359771712782, 0.0019349887927541001, 0.001937648902208431, 0.001940316335657246, 0.0019429911233896221, 0.0019456732958618857, 0.0019483628836987675, 0.0019510599176945666, 0.001953764428814329, 0.00195647644819503, 0.0019591960071467704, 0.0019619231371539813, 0.0019646578698766385, 0.001967400237151488, 0.0019701502709932824, 0.0019729080035960247, 0.0019756734673342267, 0.0019784466947641746, 0.0019812277186252066, 0.0019840165718410015, 0.0019868132875208795, 0.0019896178989611086, 0.0019924304396462303, 0.0019952509432503897, 0.001998079443638679, 0.002000915974868495, 0.002003760571190905, 0.002006613267052025, 0.002009474097094409, 0.002012343096158455, 0.0020152202992838163, 0.002018105741710828, 0.0020209994588819466, 0.002023901486443203, 0.0020268118602456615, 0.002029730616346902, 0.0020326577910125027, 0.0020355934207175485, 0.002038537542148141, 0.0020414901922029298, 0.0020444514079946525, 0.0020474212268516896, 0.002050399686319635, 0.002053386824162875, 0.0020563826783661873, 0.0020593872871363496, 0.002062400688903764, 0.002065422922324096, 0.0020684540262799257, 0.0020714940398824187, 0.0020745430024730047, 0.0020776009536250767, 0.0020806679331457027, 0.002083743981077352, 0.00208682913769964, 0.0020899234435310843, 0.00209302693933088, 0.002096139666100688, 0.0020992616650864415, 0.0021023929777801687, 0.002105533645921828, 0.0021086837115011662, 0.0021118432167595877, 0.002115012204192043, 0.0021181907165489346, 0.002121378796838037, 0.002124576488326441, 0.0021277838345425066, 0.0021310008792778403, 0.0021342276665892875, 0.0021374642408009442, 0.002140710646506187, 0.002143966928569718, 0.0021472331321296364, 0.00215050930259952, 0.0021537954856705333, 0.002157091727313549, 0.0021603980737812923, 0.002163714571610505, 0.00216704126762413, 0.0021703782089335113, 0.0021737254429406213, 0.0021770830173403026, 0.0021804509801225374, 0.0021838293795747293, 0.0021872182642840134, 0.0021906176831395854, 0.002194027685335053, 0.002197448320370808, 0.002200879638056421, 0.002204321688513061, 0.002207774522175935, 0.0022112381897967494, 0.0022147127424462, 0.0022181982315164803, 0.0022216947087238146, 0.0022252022261110174, 0.002228720836050075, 0.0022322505912447514, 0.0022357915447332203, 0.002239343749890723, 0.0022429072604322467, 0.0022464821304152365, 0.002250068414242325, 0.002253666166664095, 0.0022572754427818633, 0.0022608962980504963, 0.002264528788281247, 0.0022681729696446256, 0.002271828898673293, 0.0022754966322649844, 0.0022791762276854616, 0.0022828677425714935, 0.0022865712349338647, 0.002290286763160414, 0.002294014386019105, 0.002297754162661122, 0.0023015061526240003, 0.002305270415834785, 0.0023090470126132215, 0.0023128360036749783, 0.0023166374501349006, 0.0023204514135102953, 0.0023242779557242498, 0.002328117139108984, 0.0023319690264092343, 0.0023358336807856707, 0.0023397111658183516, 0.0023436015455102085, 0.0023475048842905677, 0.0023514212470187087, 0.002355350698987454, 0.0023592933059268, 0.002363249134007581, 0.002367218249845171, 0.0023712007205032243, 0.0023751966134974507, 0.002379205996799432, 0.002383228938840477, 0.0023872655085155126, 0.002391315775187018, 0.002395379808688999, 0.0023994576793309997, 0.002403549457902156, 0.002407655215675296, 0.002411775024411074, 0.002415908956362155, 0.002420057084277434, 0.0024242194814063094, 0.0024283962215029893, 0.0024325873788308503, 0.002436793028166839, 0.0024410132448059196, 0.0024452481045655647, 0.0024494976837902984, 0.0024537620593562833, 0.0024580413086759557, 0.002462335509702711, 0.0024666447409356362, 0.002470969081424293, 0.002475308610773554, 0.0024796634091484838, 0.002484033557279278, 0.0024884191364662506, 0.0024928202285848773, 0.0024972369160908897, 0.0025016692820254236, 0.0025061174100202252, 0.0025105813843029103, 0.0025150612897022816, 0.002519557211653701, 0.0025240692362045215, 0.002528597450019576, 0.0025331419403867264, 0.0025377027952224736, 0.0025422801030776246, 0.0025468739531430257, 0.0025514844352553545, 0.0025561116399029755, 0.0025607556582318606, 0.002565416582051575, 0.0025700945038413265, 0.0025747895167560807, 0.0025795017146327463, 0.0025842311919964263, 0.002588978044066739, 0.002593742366764206, 0.002598524256716717, 0.00260332381126606, 0.0026081411284745257, 0.002612976307131589, 0.00261782944676066, 0.0026227006476259125, 0.002627590010739189, 0.002632497637866984, 0.002637423631537504, 0.0026423680950478055, 0.002647331132471019, 0.0026523128486636485, 0.0026573133492729575, 0.002662332740744436, 0.0026673711303293554, 0.0026724286260924055, 0.0026775053369194218, 0.0026826013725251992, 0.002687716843461398, 0.002692851861124535, 0.0026980065377640704, 0.002703180986490589, 0.0027083753212840725, 0.002713589657002267, 0.0027188241093891526, 0.002724078795083504, 0.0027293538316275553, 0.002734649337475766, 0.0027399654320036846, 0.002745302235516923, 0.0027506598692602275, 0.0027560384554266644, 0.002761438117166907, 0.0027668589785986367, 0.0027723011648160515, 0.0027777648018994907, 0.002783250016925169, 0.002788756937975031, 0.0027942856941467185, 0.0027998364155636603, 0.0028054092333852794, 0.0028110042798173266, 0.0028166216881223317, 0.002822261592630185, 0.0028279241287488465, 0.0028336094329751813, 0.0028393176429059265, 0.002845048897248795, 0.0028508033358337075, 0.0028565810996241665, 0.002862382330728766, 0.002868207172412843, 0.0028740557691102698, 0.002879928266435396, 0.0028858248111951284, 0.002891745551401168, 0.0028976906362823936, 0.0029036602162973986, 0.0029096544431471867, 0.002915673469788019, 0.0029217174504444256, 0.002927786540622379, 0.0029338808971226295, 0.0029400006780542103, 0.0029461460428481107, 0.002952317152271121, 0.0029585141684398504, 0.0029647372548349256, 0.0029709865763153666, 0.0029772622991331424, 0.0029835645909479184, 0.002989893620841983, 0.0029962495593353687, 0.0030026325784011714, 0.0030090428514810545, 0.0030154805535009634, 0.0030219458608870364, 0.003028438951581718, 0.0030349600050600892, 0.0030415092023464013, 0.0030480867260308255, 0.0030546927602864253, 0.003061327490886345, 0.003067991105221223, 0.003074683792316836, 0.0030814057428519715, 0.0030881571491765372, 0.003094938205329911, 0.003101749107059525, 0.0031085900518397066, 0.0031154612388907613, 0.0031223628691983123, 0.003129295145532898, 0.0031362582724698304, 0.003143252456409318, 0.0031502779055968613, 0.0031573348301439197, 0.003164423442048859, 0.00317154395521818, 0.0031786965854880373, 0.003185881550646045, 0.003193099070453382, 0.0032003493666671987, 0.0032076326630633297, 0.0032149491854593154, 0.003222299161737742, 0.0032296828218698987, 0.0032371003979397655, 0.003244552124168328, 0.0032520382369382326, 0.003259558974818781, 0.003267114578591275, 0.00327470529127471, 0.0032823313581518327, 0.0032899930267955607, 0.0032976905470957748, 0.0033054241712864845, 0.003313194153973385, 0.003321000752161792, 0.003328844225284981, 0.0033367248352329285, 0.0033446428463814576, 0.003352598525621806, 0.00336059214239061, 0.0033686239687003242, 0.0033766942791700755, 0.0033848033510569635, 0.00339295146428781, 0.0034011389014913735, 0.0034093659480310245, 0.0034176328920379005, 0.003425940024444545, 0.0034342876390190354, 0.003442676032399613, 0.0034511055041298224, 0.0034595763566941658, 0.003468088895554285, 0.0034766434291856802, 0.003485240269114973, 0.0034938797299577207, 0.0035025621294567997, 0.0035112877885213577, 0.0035200570312663515, 0.003528870185052681, 0.0035377275805279227, 0.0035466295516676824, 0.0035555764358175743, 0.0035645685737358303, 0.0035736063096365673, 0.0035826899912337062, 0.0035918199697855674, 0.0036009966001401463, 0.0036102202407810907, 0.003619491253874377, 0.0036288100053157163, 0.0036381768647786895, 0.0036475922057636334, 0.0036570564056472854, 0.0036665698457332024, 0.0036761329113029714, 0.0036857459916682218, 0.003695409480223456, 0.0037051237744997133, 0.0037148892762190857, 0.0037247063913500907, 0.003734575530163931, 0.003744497107291649, 0.0037544715417821947, 0.0037644992571614225, 0.0037745806814920404, 0.003784716247434519, 0.0037949063923089898, 0.003805151558158142, 0.003815452191811146, 0.0038258087449486106, 0.003836221674168611, 0.0038466914410537852, 0.003857218512239545, 0.003867803359483401, 0.0038784464597354366, 0.003889148295209947, 0.0038999093534582705, 0.0039107301274428265, 0.003921611115612393, 0.003932552821978648, 0.003943555756193987, 0.003954620433630662, 0.0039657473754612415, 0.003976937108740448, 0.003988190166488376, 0.0039995070877751285, 0.004010888417806898, 0.004022334708013529, 0.0040338465161375665, 0.004045424406324857, 0.004057068949216706, 0.004068780722043627, 0.004080560308720733, 0.00409240829994477, 0.004104325293292866, 0.0041163118933229955, 0.0041283687116762165, 0.00414049636718071, 0.004152695485957653, 0.00416496670152898, 0.004177310654927043, 0.004189727994806247, 0.004202219377556666, 0.004214785467419708, 0.004227426936605861, 0.0042401444654145545, 0.004252938742356205, 0.004265810464276464, 0.0042787603364827405, 0.004291789072873031, 0.004304897396067107, 0.0043180860375401165, 0.004331355737758652, 0.004344707246319328, 0.004358141322089939, 0.0043716587333532345, 0.004385260257953386, 0.004398946683445191, 0.004412718807246081, 0.004426577436791, 0.0044405233896901986, 0.004454557493890032, 0.004468680587836814, 0.004482893520643792, 0.00449719715226132, 0.004511592353650311, 0.004526080006959018, 0.004540661005703233, 0.004555336254949994, 0.004570106671504849, 0.0045849731841027825, 0.004599936733602883, 0.004614998273186832, 0.0046301587685613045, 0.004645419198164375, 0.004660780553376014, 0.0046762438387327795, 0.004691810072146795, 0.004707480285129112, 0.004723255523017572, 0.004739136845209258, 0.004755125325397652, 0.004771222051814612, 0.0047874281274772786, 0.004803744670440034, 0.004820172814051628, 0.004836713707217596, 0.0048533685146681035, 0.004870138417231339, 0.0048870246121126, 0.004904028313179199, 0.004921150751251346, 0.0049383931743991315, 0.004955756848245795, 0.004973243056277397, 0.004990853100159078, 0.005008588300058056, 0.005026449994973549, 0.0050444395430737565, 0.005062558322040129, 0.005080807729419066, 0.005099189182981265, 0.005117704121088874, 0.005136354003070707, 0.005155140309605651, 0.005174064543114561, 0.005193128228160791, 0.005212332911859605, 0.005231680164296752, 0.0052511715789563315, 0.0052708087731583204, 0.005290593388505908, 0.005310527091342978, 0.005330611573221953, 0.005350848551382285, 0.005371239769239927, 0.005391786996887983, 0.005412492031608951, 0.005433356698398775, 0.005454382850503063, 0.005475572369965845, 0.005496927168191114, 0.005518449186517615, 0.005540140396807149, 0.005562002802046815, 0.005584038436965597, 0.005606249368665611, 0.0056286376972685395, 0.005651205556577561, 0.005673955114755314, 0.0056968885750182715, 0.0057200081763480225, 0.005743316194219982, 0.005766814941349932, 0.00579050676845902, 0.005814394065057657, 0.005838479260248896, 0.005862764823551907, 0.005887253265746015, 0.005911947139736062, 0.005936849041439562, 0.005961961610696437, 0.005987287532201898, 0.006012829536463205, 0.0060385904007810645, 0.006064572950256295, 0.006090780058822666, 0.006117214650306577, 0.006143879699514465, 0.006170778233348813, 0.006197913331953536, 0.006225288129889792, 0.006252905817343044, 0.006280769641362393, 0.0063088829071332436, 0.0063372489792842355, 0.006365871283229658, 0.006394753306548342, 0.006423898600400324, 0.006453310780982384, 0.00648299353102375, 0.006512950601323323, 0.00654318581232964, 0.006573703055765134, 0.006604506296296002, 0.006635599573249246, 0.006666987002378493, 0.006698672777680101, 0.0067306611732613686, 0.006762956545262456, 0.006795563333833984, 0.006828486065172055, 0.006861729353612729, 0.006895297903788025, 0.006929196512845439, 0.006963430072733337, 0.006998003572554376, 0.00703292210098938, 0.007068190848794205, 0.0071038151113720326, 0.007139800291423916, 0.0071761519016802534, 0.007212875567716119, 0.007249977030853551, 0.00728746215115378, 0.007325336910502862, 0.007363607415793941, 0.007402279902209877, 0.007441360736609796, 0.007480856421023495, 0.007520773596257772, 0.00756111904561875, 0.007601899698754745, 0.007643122635624112, 0.007684795090592884, 0.007726924456667269, 0.007769518289866026, 0.007812584313738373, 0.007856130424032869, 0.007900164693523426, 0.00794469537699846, 0.007989730916419734, 0.008035279946257733, 0.008081351299010482, 0.008127954010913421, 0.008175097327847916, 0.00822279071145659, 0.00827104384547405, 0.00831986664228171, 0.008369269249696262, 0.008419262058001382, 0.008469855707232948, 0.00852106109472861, 0.008572889382952767, 0.008625352007608961, 0.008678460686051862, 0.008732227426012068, 0.008786664534647163, 0.00884178462793345, 0.008897600640413492, 0.008954125835315069, 0.00901137381505846, 0.009069358532169258, 0.009128094300615277, 0.009187595807586912, 0.009247878125741146, 0.009308956725930897, 0.009370847490442015, 0.009433566726761974, 0.009497131181905141, 0.009561558057321106, 0.009626865024414078, 0.009693070240702508, 0.009760192366650265, 0.009828250583201895, 0.009897264610056685, 0.009967254724718193, 0.01003824178235765, 0.010110247236532425, 0.010183293160802454, 0.010257402271290725, 0.010332597950235974, 0.010408904270588994, 0.010486346021707053, 0.010564948736203696, 0.01064473871801543, 0.010725743071749744, 0.01080798973338344, 0.010891507502384358, 0.01097632607533385, 0.011062476081132788, 0.011149989117878486, 0.01123889779150595, 0.011329235756292829, 0.011421037757333467, 0.011514339675095074, 0.011609178572175619, 0.011705592742391881, 0.011803621762333898, 0.011903306545531749, 0.01200468939939061, 0.012107814085060115, 0.012212725880416497, 0.012319471646347552, 0.012428099896544456, 0.012538660871018976, 0.012651206613579715, 0.012765791053518953, 0.01288247009177889, 0.013001301691887098, 0.013122345975971526, 0.013245665326189416, 0.013371324491929825, 0.013499390703176364, 0.013629933790447735, 0.013763026311765195, 0.013898743687132172, 0.014037164341049981, 0.014178369853634933, 0.014322445120949375, 0.014469478525208173, 0.01461956211557794, 0.014772791800346383, 0.014929267551304215, 0.015089093621255597, 0.015252378775650784, 0.015419236539423219, 0.015589785460207655, 0.01576414938922204, 0.015942457781212033, 0.01612484601498399, 0.016311455736195246, 0.016502435224224975, 0.01669793978512307, 0.016898132172825774, 0.017103183041038382, 0.017313271428422886, 0.017528585279988875, 0.017749322007880035, 0.017975689095072498, 0.018207904745865748, 0.018446198587453264, 0.018690812427313495, 0.018942001071673546, 0.01920003321086825, 0.019465192378061946, 0.019737777988524826, 0.02001810646747146, 0.020306512475394323, 0.020603350240867385, 0.020908995011980257, 0.02122384463890783, 0.021548321301648, 0.02188287339870596, 0.022227977614490756, 0.022584141185470693, 0.022951904387742434, 0.023331843271670906, 0.02372457267271204, 0.024130749531515606, 0.0245510765610208, 0.024986306303602365, 0.02543724562754368, 0.025904760719358867, 0.026389782636949466, 0.026893313498505128, 0.027416433393709836, 0.02796030811755749, 0.02852619784331662, 0.029115466870445705, 0.029729594606176548, 0.030370187966838852, 0.031038995417786343, 0.03173792291020483, 0.03246905202068515, 0.033234660657145206, 0.03403724676492237, 0.03487955555275008, 0.03576461086382385, 0.03669575144738978, 0.03767667304782901, 0.038711477429695884, 0.0398047297098569, 0.04096152568665084, 0.04218757126064718, 0.04348927655857836, 0.04487386803715542, 0.04634952270541262, 0.04792552972983364, 0.04961248616853053, 0.05142253554894814, 0.053369660641650996, 0.05547004535337704, 0.05774252554575575, 0.0602091553384132, 0.0628959249016385, 0.06583367912374075, 0.06905930573812695, 0.07261728942649547, 0.0765617696335492, 0.08095930156640957, 0.08589261374722872, 0.09146580053511144, 0.09781161565892843, 0.10510189568837577, 0.11356272996478306, 0.12349695953816668, 0.13531819933733455, 0.14960330468755945, 0.16717487876238815, 0.18923353452246894, 0.2175738805672719, 0.25494350737857946, 0.3056496192631225, 0.37660002556905986, 0.4791148790078885, 0.6321205588285577]}
},{}],60:[function(require,module,exports){
module.exports={"x": [1.0, 1.7094894894894894, 2.418978978978979, 3.1284684684684683, 3.8379579579579577, 4.547447447447447, 5.2569369369369365, 5.966426426426426, 6.675915915915915, 7.385405405405405, 8.094894894894894, 8.804384384384385, 9.513873873873873, 10.223363363363362, 10.932852852852852, 11.642342342342342, 12.35183183183183, 13.06132132132132, 13.77081081081081, 14.4803003003003, 15.189789789789788, 15.899279279279277, 16.60876876876877, 17.318258258258258, 18.027747747747746, 18.737237237237235, 19.446726726726723, 20.156216216216215, 20.865705705705704, 21.575195195195192, 22.284684684684684, 22.994174174174173, 23.70366366366366, 24.41315315315315, 25.12264264264264, 25.83213213213213, 26.54162162162162, 27.251111111111108, 27.9606006006006, 28.67009009009009, 29.379579579579577, 30.089069069069065, 30.798558558558554, 31.508048048048046, 32.21753753753754, 32.92702702702702, 33.636516516516515, 34.346006006006, 35.05549549549549, 35.764984984984984, 36.47447447447447, 37.18396396396396, 37.893453453453446, 38.60294294294294, 39.31243243243243, 40.021921921921916, 40.73141141141141, 41.4409009009009, 42.150390390390385, 42.85987987987988, 43.56936936936937, 44.278858858858854, 44.988348348348346, 45.69783783783783, 46.40732732732732, 47.116816816816815, 47.8263063063063, 48.53579579579579, 49.24528528528528, 49.95477477477477, 50.66426426426426, 51.373753753753746, 52.08324324324324, 52.79273273273273, 53.502222222222215, 54.21171171171171, 54.9212012012012, 55.630690690690685, 56.34018018018018, 57.04966966966966, 57.759159159159154, 58.468648648648646, 59.17813813813813, 59.88762762762762, 60.59711711711711, 61.3066066066066, 62.01609609609609, 62.72558558558558, 63.43507507507507, 64.14456456456456, 64.85405405405405, 65.56354354354353, 66.27303303303303, 66.98252252252252, 67.692012012012, 68.4015015015015, 69.11099099099098, 69.82048048048047, 70.52996996996997, 71.23945945945945, 71.94894894894894, 72.65843843843844, 73.36792792792792, 74.07741741741741, 74.78690690690689, 75.49639639639639, 76.20588588588588, 76.91537537537536, 77.62486486486486, 78.33435435435435, 79.04384384384383, 79.75333333333333, 80.46282282282282, 81.1723123123123, 81.8818018018018, 82.59129129129128, 83.30078078078077, 84.01027027027027, 84.71975975975975, 85.42924924924924, 86.13873873873874, 86.84822822822822, 87.55771771771771, 88.26720720720719, 88.97669669669669, 89.68618618618618, 90.39567567567566, 91.10516516516516, 91.81465465465465, 92.52414414414413, 93.23363363363363, 93.94312312312312, 94.6526126126126, 95.3621021021021, 96.07159159159158, 96.78108108108107, 97.49057057057055, 98.20006006006005, 98.90954954954954, 99.61903903903902, 100.32852852852852, 101.03801801801801, 101.74750750750749, 102.45699699699699, 103.16648648648648, 103.87597597597596, 104.58546546546546, 105.29495495495495, 106.00444444444443, 106.71393393393393, 107.42342342342342, 108.1329129129129, 108.8424024024024, 109.55189189189188, 110.26138138138137, 110.97087087087085, 111.68036036036035, 112.38984984984984, 113.09933933933932, 113.80882882882882, 114.51831831831831, 115.22780780780779, 115.93729729729729, 116.64678678678678, 117.35627627627626, 118.06576576576576, 118.77525525525525, 119.48474474474473, 120.19423423423422, 120.90372372372372, 121.6132132132132, 122.32270270270268, 123.03219219219218, 123.74168168168167, 124.45117117117115, 125.16066066066065, 125.87015015015014, 126.57963963963962, 127.28912912912912, 127.99861861861861, 128.7081081081081, 129.4175975975976, 130.12708708708706, 130.83657657657656, 131.54606606606606, 132.25555555555553, 132.96504504504503, 133.67453453453453, 134.384024024024, 135.0935135135135, 135.803003003003, 136.51249249249247, 137.22198198198197, 137.93147147147147, 138.64096096096094, 139.35045045045044, 140.05993993993994, 140.7694294294294, 141.4789189189189, 142.1884084084084, 142.89789789789788, 143.60738738738738, 144.31687687687688, 145.02636636636635, 145.73585585585585, 146.44534534534534, 147.15483483483482, 147.86432432432431, 148.57381381381379, 149.28330330330328, 149.99279279279278, 150.70228228228225, 151.41177177177175, 152.12126126126125, 152.83075075075072, 153.54024024024022, 154.24972972972972, 154.9592192192192, 155.6687087087087, 156.3781981981982, 157.08768768768766, 157.79717717717716, 158.50666666666666, 159.21615615615613, 159.92564564564563, 160.63513513513513, 161.3446246246246, 162.0541141141141, 162.7636036036036, 163.47309309309307, 164.18258258258257, 164.89207207207207, 165.60156156156154, 166.31105105105104, 167.02054054054054, 167.73003003003, 168.4395195195195, 169.149009009009, 169.85849849849848, 170.56798798798798, 171.27747747747748, 171.98696696696695, 172.69645645645645, 173.40594594594592, 174.11543543543542, 174.82492492492491, 175.53441441441439, 176.24390390390388, 176.95339339339338, 177.66288288288285, 178.37237237237235, 179.08186186186185, 179.79135135135132, 180.50084084084082, 181.21033033033032, 181.9198198198198, 182.6293093093093, 183.3387987987988, 184.04828828828826, 184.75777777777776, 185.46726726726726, 186.17675675675673, 186.88624624624623, 187.59573573573573, 188.3052252252252, 189.0147147147147, 189.7242042042042, 190.43369369369367, 191.14318318318317, 191.85267267267267, 192.56216216216214, 193.27165165165164, 193.9811411411411, 194.6906306306306, 195.4001201201201, 196.10960960960958, 196.81909909909908, 197.52858858858858, 198.23807807807805, 198.94756756756755, 199.65705705705705, 200.36654654654652, 201.07603603603602, 201.78552552552551, 202.49501501501499, 203.20450450450448, 203.91399399399398, 204.62348348348345, 205.33297297297295, 206.04246246246245, 206.75195195195192, 207.46144144144142, 208.17093093093092, 208.8804204204204, 209.5899099099099, 210.2993993993994, 211.00888888888886, 211.71837837837836, 212.42786786786786, 213.13735735735733, 213.84684684684683, 214.55633633633633, 215.2658258258258, 215.9753153153153, 216.6848048048048, 217.39429429429427, 218.10378378378377, 218.81327327327324, 219.52276276276274, 220.23225225225224, 220.9417417417417, 221.6512312312312, 222.3607207207207, 223.07021021021018, 223.77969969969968, 224.48918918918918, 225.19867867867865, 225.90816816816815, 226.61765765765765, 227.32714714714712, 228.03663663663662, 228.74612612612611, 229.45561561561559, 230.16510510510508, 230.87459459459458, 231.58408408408405, 232.29357357357355, 233.00306306306305, 233.71255255255252, 234.42204204204202, 235.13153153153152, 235.841021021021, 236.5505105105105, 237.26, 237.96948948948946, 238.67897897897896, 239.38846846846843, 240.09795795795793, 240.80744744744743, 241.5169369369369, 242.2264264264264, 242.9359159159159, 243.64540540540537, 244.35489489489487, 245.06438438438437, 245.77387387387384, 246.48336336336334, 247.19285285285284, 247.9023423423423, 248.6118318318318, 249.3213213213213, 250.03081081081078, 250.74030030030028, 251.44978978978978, 252.15927927927925, 252.86876876876875, 253.57825825825824, 254.28774774774772, 254.99723723723721, 255.7067267267267, 256.4162162162162, 257.1257057057057, 257.8351951951952, 258.5446846846847, 259.2541741741741, 259.9636636636636, 260.6731531531531, 261.3826426426426, 262.0921321321321, 262.8016216216216, 263.51111111111106, 264.22060060060056, 264.93009009009006, 265.63957957957956, 266.34906906906906, 267.05855855855856, 267.768048048048, 268.4775375375375, 269.187027027027, 269.8965165165165, 270.606006006006, 271.3154954954955, 272.02498498498494, 272.73447447447444, 273.44396396396394, 274.15345345345344, 274.86294294294294, 275.5724324324324, 276.2819219219219, 276.9914114114114, 277.7009009009009, 278.4103903903904, 279.1198798798799, 279.8293693693693, 280.5388588588588, 281.2483483483483, 281.9578378378378, 282.6673273273273, 283.3768168168168, 284.08630630630626, 284.79579579579575, 285.50528528528525, 286.21477477477475, 286.92426426426425, 287.63375375375375, 288.3432432432432, 289.0527327327327, 289.7622222222222, 290.4717117117117, 291.1812012012012, 291.8906906906907, 292.60018018018013, 293.30966966966963, 294.01915915915913, 294.72864864864863, 295.43813813813813, 296.14762762762757, 296.85711711711707, 297.56660660660657, 298.27609609609607, 298.98558558558557, 299.69507507507507, 300.4045645645645, 301.114054054054, 301.8235435435435, 302.533033033033, 303.2425225225225, 303.952012012012, 304.66150150150145, 305.37099099099095, 306.08048048048045, 306.78996996996995, 307.49945945945944, 308.20894894894894, 308.9184384384384, 309.6279279279279, 310.3374174174174, 311.0469069069069, 311.7563963963964, 312.4658858858859, 313.1753753753753, 313.8848648648648, 314.5943543543543, 315.3038438438438, 316.0133333333333, 316.7228228228228, 317.43231231231226, 318.14180180180176, 318.85129129129126, 319.56078078078076, 320.27027027027026, 320.9797597597597, 321.6892492492492, 322.3987387387387, 323.1082282282282, 323.8177177177177, 324.5272072072072, 325.23669669669664, 325.94618618618614, 326.65567567567564, 327.36516516516514, 328.07465465465464, 328.78414414414414, 329.4936336336336, 330.2031231231231, 330.9126126126126, 331.6221021021021, 332.3315915915916, 333.0410810810811, 333.7505705705705, 334.46006006006, 335.1695495495495, 335.879039039039, 336.5885285285285, 337.298018018018, 338.00750750750746, 338.71699699699695, 339.42648648648645, 340.13597597597595, 340.84546546546545, 341.55495495495495, 342.2644444444444, 342.9739339339339, 343.6834234234234, 344.3929129129129, 345.1024024024024, 345.81189189189183, 346.52138138138133, 347.23087087087083, 347.94036036036033, 348.64984984984983, 349.35933933933933, 350.06882882882877, 350.77831831831827, 351.48780780780777, 352.19729729729727, 352.90678678678677, 353.61627627627627, 354.3257657657657, 355.0352552552552, 355.7447447447447, 356.4542342342342, 357.1637237237237, 357.8732132132132, 358.58270270270265, 359.29219219219215, 360.00168168168165, 360.71117117117115, 361.42066066066064, 362.13015015015014, 362.8396396396396, 363.5491291291291, 364.2586186186186, 364.9681081081081, 365.6775975975976, 366.387087087087, 367.0965765765765, 367.806066066066, 368.5155555555555, 369.225045045045, 369.9345345345345, 370.64402402402396, 371.35351351351346, 372.06300300300296, 372.77249249249246, 373.48198198198196, 374.19147147147146, 374.9009609609609, 375.6104504504504, 376.3199399399399, 377.0294294294294, 377.7389189189189, 378.4484084084084, 379.15789789789784, 379.86738738738734, 380.57687687687684, 381.28636636636634, 381.99585585585584, 382.70534534534534, 383.4148348348348, 384.1243243243243, 384.8338138138138, 385.5433033033033, 386.2527927927928, 386.9622822822822, 387.6717717717717, 388.3812612612612, 389.0907507507507, 389.8002402402402, 390.5097297297297, 391.21921921921916, 391.92870870870865, 392.63819819819815, 393.34768768768765, 394.05717717717715, 394.76666666666665, 395.4761561561561, 396.1856456456456, 396.8951351351351, 397.6046246246246, 398.3141141141141, 399.0236036036036, 399.73309309309303, 400.44258258258253, 401.15207207207203, 401.86156156156153, 402.57105105105103, 403.2805405405405, 403.99003003002997, 404.69951951951947, 405.40900900900897, 406.11849849849847, 406.82798798798797, 407.53747747747747, 408.2469669669669, 408.9564564564564, 409.6659459459459, 410.3754354354354, 411.0849249249249, 411.79441441441435, 412.50390390390385, 413.21339339339335, 413.92288288288285, 414.63237237237234, 415.34186186186184, 416.0513513513513, 416.7608408408408, 417.4703303303303, 418.1798198198198, 418.8893093093093, 419.5987987987988, 420.3082882882882, 421.0177777777777, 421.7272672672672, 422.4367567567567, 423.1462462462462, 423.8557357357357, 424.56522522522516, 425.27471471471466, 425.98420420420416, 426.69369369369366, 427.40318318318316, 428.11267267267266, 428.8221621621621, 429.5316516516516, 430.2411411411411, 430.9506306306306, 431.6601201201201, 432.3696096096096, 433.07909909909904, 433.78858858858854, 434.49807807807804, 435.20756756756754, 435.91705705705704, 436.6265465465465, 437.336036036036, 438.0455255255255, 438.755015015015, 439.4645045045045, 440.173993993994, 440.8834834834834, 441.5929729729729, 442.3024624624624, 443.0119519519519, 443.7214414414414, 444.4309309309309, 445.14042042042036, 445.84990990990985, 446.55939939939935, 447.26888888888885, 447.97837837837835, 448.68786786786785, 449.3973573573573, 450.1068468468468, 450.8163363363363, 451.5258258258258, 452.2353153153153, 452.9448048048048, 453.65429429429423, 454.36378378378373, 455.07327327327323, 455.78276276276273, 456.49225225225223, 457.20174174174167, 457.91123123123117, 458.62072072072067, 459.33021021021017, 460.03969969969967, 460.74918918918917, 461.4586786786786, 462.1681681681681, 462.8776576576576, 463.5871471471471, 464.2966366366366, 465.0061261261261, 465.71561561561555, 466.42510510510505, 467.13459459459455, 467.84408408408405, 468.55357357357354, 469.26306306306304, 469.9725525525525, 470.682042042042, 471.3915315315315, 472.101021021021, 472.8105105105105, 473.52, 474.2294894894894, 474.9389789789789, 475.6484684684684, 476.3579579579579, 477.0674474474474, 477.77693693693686, 478.48642642642636, 479.19591591591586, 479.90540540540536, 480.61489489489486, 481.32438438438436, 482.0338738738738, 482.7433633633633, 483.4528528528528, 484.1623423423423, 484.8718318318318, 485.5813213213213, 486.29081081081074, 487.00030030030024, 487.70978978978974, 488.41927927927924, 489.12876876876874, 489.83825825825824, 490.5477477477477, 491.2572372372372, 491.9667267267267, 492.6762162162162, 493.3857057057057, 494.0951951951952, 494.8046846846846, 495.5141741741741, 496.2236636636636, 496.9331531531531, 497.6426426426426, 498.3521321321321, 499.06162162162155, 499.77111111111105, 500.48060060060055, 501.19009009009005, 501.89957957957955, 502.609069069069, 503.3185585585585, 504.028048048048, 504.7375375375375, 505.447027027027, 506.1565165165165, 506.86600600600593, 507.57549549549543, 508.28498498498493, 508.99447447447443, 509.70396396396393, 510.4134534534534, 511.12294294294287, 511.83243243243237, 512.5419219219218, 513.2514114114114, 513.9609009009008, 514.6703903903904, 515.3798798798798, 516.0893693693694, 516.7988588588588, 517.5083483483482, 518.2178378378378, 518.9273273273272, 519.6368168168168, 520.3463063063062, 521.0557957957958, 521.7652852852852, 522.4747747747747, 523.1842642642642, 523.8937537537537, 524.6032432432432, 525.3127327327327, 526.0222222222221, 526.7317117117117, 527.4412012012011, 528.1506906906907, 528.8601801801801, 529.5696696696696, 530.2791591591591, 530.9886486486486, 531.6981381381381, 532.4076276276276, 533.1171171171171, 533.8266066066066, 534.536096096096, 535.2455855855856, 535.955075075075, 536.6645645645646, 537.374054054054, 538.0835435435434, 538.793033033033, 539.5025225225224, 540.212012012012, 540.9215015015014, 541.630990990991, 542.3404804804804, 543.0499699699699, 543.7594594594594, 544.4689489489489, 545.1784384384384, 545.8879279279279, 546.5974174174173, 547.3069069069069, 548.0163963963963, 548.7258858858859, 549.4353753753753, 550.1448648648648, 550.8543543543543, 551.5638438438438, 552.2733333333333, 552.9828228228228, 553.6923123123123, 554.4018018018018, 555.1112912912912, 555.8207807807808, 556.5302702702702, 557.2397597597597, 557.9492492492492, 558.6587387387386, 559.3682282282282, 560.0777177177176, 560.7872072072072, 561.4966966966966, 562.2061861861862, 562.9156756756756, 563.6251651651651, 564.3346546546546, 565.0441441441441, 565.7536336336336, 566.4631231231231, 567.1726126126125, 567.8821021021021, 568.5915915915915, 569.3010810810811, 570.0105705705705, 570.72006006006, 571.4295495495495, 572.139039039039, 572.8485285285285, 573.558018018018, 574.2675075075075, 574.976996996997, 575.6864864864864, 576.395975975976, 577.1054654654654, 577.8149549549549, 578.5244444444444, 579.2339339339338, 579.9434234234234, 580.6529129129128, 581.3624024024024, 582.0718918918918, 582.7813813813814, 583.4908708708708, 584.2003603603603, 584.9098498498498, 585.6193393393393, 586.3288288288288, 587.0383183183183, 587.7478078078077, 588.4572972972973, 589.1667867867867, 589.8762762762763, 590.5857657657657, 591.2952552552551, 592.0047447447447, 592.7142342342341, 593.4237237237237, 594.1332132132131, 594.8427027027027, 595.5521921921921, 596.2616816816816, 596.9711711711711, 597.6806606606606, 598.3901501501501, 599.0996396396396, 599.809129129129, 600.5186186186186, 601.228108108108, 601.9375975975976, 602.647087087087, 603.3565765765766, 604.066066066066, 604.7755555555555, 605.485045045045, 606.1945345345345, 606.904024024024, 607.6135135135135, 608.3230030030029, 609.0324924924925, 609.7419819819819, 610.4514714714715, 611.1609609609609, 611.8704504504504, 612.5799399399399, 613.2894294294293, 613.9989189189189, 614.7084084084083, 615.4178978978979, 616.1273873873873, 616.8368768768768, 617.5463663663663, 618.2558558558558, 618.9653453453453, 619.6748348348348, 620.3843243243242, 621.0938138138138, 621.8033033033032, 622.5127927927928, 623.2222822822822, 623.9317717717718, 624.6412612612612, 625.3507507507506, 626.0602402402402, 626.7697297297296, 627.4792192192192, 628.1887087087086, 628.8981981981981, 629.6076876876876, 630.3171771771771, 631.0266666666666, 631.7361561561561, 632.4456456456456, 633.1551351351351, 633.8646246246245, 634.5741141141141, 635.2836036036035, 635.9930930930931, 636.7025825825825, 637.412072072072, 638.1215615615615, 638.831051051051, 639.5405405405405, 640.25003003003, 640.9595195195194, 641.669009009009, 642.3784984984984, 643.087987987988, 643.7974774774774, 644.506966966967, 645.2164564564564, 645.9259459459458, 646.6354354354354, 647.3449249249248, 648.0544144144144, 648.7639039039038, 649.4733933933933, 650.1828828828828, 650.8923723723723, 651.6018618618618, 652.3113513513513, 653.0208408408408, 653.7303303303303, 654.4398198198197, 655.1493093093093, 655.8587987987987, 656.5682882882883, 657.2777777777777, 657.9872672672672, 658.6967567567567, 659.4062462462462, 660.1157357357357, 660.8252252252252, 661.5347147147146, 662.2442042042042, 662.9536936936936, 663.6631831831832, 664.3726726726726, 665.0821621621621, 665.7916516516516, 666.501141141141, 667.2106306306306, 667.92012012012, 668.6296096096096, 669.339099099099, 670.0485885885885, 670.758078078078, 671.4675675675675, 672.177057057057, 672.8865465465465, 673.596036036036, 674.3055255255255, 675.0150150150149, 675.7245045045045, 676.4339939939939, 677.1434834834835, 677.8529729729729, 678.5624624624623, 679.2719519519519, 679.9814414414413, 680.6909309309309, 681.4004204204203, 682.1099099099099, 682.8193993993993, 683.5288888888888, 684.2383783783783, 684.9478678678678, 685.6573573573573, 686.3668468468468, 687.0763363363362, 687.7858258258258, 688.4953153153152, 689.2048048048048, 689.9142942942942, 690.6237837837837, 691.3332732732732, 692.0427627627627, 692.7522522522522, 693.4617417417417, 694.1712312312312, 694.8807207207207, 695.5902102102101, 696.2996996996997, 697.0091891891891, 697.7186786786787, 698.4281681681681, 699.1376576576575, 699.8471471471471, 700.5566366366365, 701.2661261261261, 701.9756156156155, 702.6851051051051, 703.3945945945945, 704.104084084084, 704.8135735735735, 705.523063063063, 706.2325525525525, 706.942042042042, 707.6515315315314, 708.361021021021, 709.0705105105104, 709.78], "expected": [1.718281828459045, 2.6476557082478576, 4.230868893396085, 6.980723748510936, 11.837170938488475, 20.537051439636784, 36.3125547604133, 65.21644037709466, 118.64641795194642, 218.17100099748814, 404.7850366746777, 756.7133202032614, 1423.749138414389, 2693.647289367933, 5120.783387196175, 9775.992380562964, 18732.647410669844, 36014.031433864926, 69442.79309569157, 134256.9339007535, 260189.64786763582, 505349.4125130667, 983465.5739327852, 1917431.125210051, 3744638.4209245373, 7324418.982917706, 14346950.357244441, 28140024.394652512, 55262149.18296776, 108650939.37971984, 213849921.89277434, 421332677.31738895, 830911660.781952, 1640113202.6686773, 3240109964.4553404, 6406077484.200628, 12675128108.352404, 25097066810.39851, 49726518677.914314, 98589999443.34665, 195588679808.93036, 388246823408.48914, 771105217230.6013, 1532321530084.8323, 3046536809845.073, 6060013939840.757, 12059866513105.924, 24010690091289.633, 47824687841469.67, 95296637557045.12, 189965157177774.1, 378821552295908.44, 755707179508000.2, 1508081076537367.8, 3010527226693921.5, 6011763751570945.0, 1.2008748700996608e+16, 2.3995256581789976e+16, 4.796013040267117e+16, 9.588670109343966e+16, 1.9175885294734464e+17, 3.8359032744042586e+17, 7.675229818462166e+17, 1.536112968538228e+18, 3.0751026725018675e+18, 6.15740338755965e+18, 1.2332015946990504e+19, 2.470393489769626e+19, 4.9498381823442936e+19, 9.919870991025724e+19, 1.9884224569729633e+20, 3.986543158978485e+20, 7.994054781918712e+20, 1.6033131968863032e+21, 3.216237118398245e+21, 6.45288805134677e+21, 1.2948951191989999e+22, 2.598887853898275e+22, 5.21688340000463e+22, 1.047378362868676e+23, 2.103116060602734e+23, 4.223654800679491e+23, 8.483548468877192e+23, 1.7042335219928642e+24, 3.4240620001676046e+24, 6.880399813122283e+24, 1.3827507405292588e+25, 2.7792714715493136e+25, 5.586934837293588e+25, 1.123234859109803e+26, 2.2585030195298444e+26, 4.541745106526101e+26, 9.134308986142927e+26, 1.8372929843768536e+27, 3.695982131348738e+27, 7.435822613652629e+27, 1.4961492039335172e+28, 3.010693627644753e+28, 6.0590295118281625e+28, 1.219504820893569e+29, 2.4547487822072595e+29, 4.9416595021658996e+29, 9.949012899621302e+29, 2.0032160216938613e+30, 4.0338097983429115e+30, 8.12348038599974e+30, 1.6360900848666266e+31, 3.295413641437458e+31, 6.638188982373732e+31, 1.3372899207360182e+32, 2.694245451179928e+32, 5.42854867627191e+32, 1.0938674158456636e+33, 2.2043441695090083e+33, 4.4424986050771025e+33, 8.953808565609438e+33, 1.8047637498986704e+34, 3.6380144497462424e+34, 7.333975524435353e+34, 1.4785804250878585e+35, 2.981126491656587e+35, 6.010980507959926e+35, 1.2121021459952261e+36, 2.444340127741947e+36, 4.9296049269993937e+36, 9.942376547222754e+36, 2.0053744553381284e+37, 4.045083625029609e+37, 8.159919406135492e+37, 1.6461528873854453e+38, 3.321085101637076e+38, 6.7006200263953416e+38, 1.3519939539634139e+39, 2.728091357947893e+39, 5.5051240585864e+39, 1.1109614699194032e+40, 2.2420961052296468e+40, 4.525144513506393e+40, 9.133418396710686e+40, 1.843557124051455e+41, 3.721361623956826e+41, 7.512229880645694e+41, 1.5165519043580923e+42, 3.0617294075783357e+42, 6.181546752794812e+42, 1.248096172683489e+43, 2.5201083036296605e+43, 5.088740985505152e+43, 1.0275931608294923e+44, 2.0751596751323066e+44, 4.190839526567771e+44, 8.4638798160741e+44, 1.709450939955365e+45, 3.452727062165713e+45, 6.974066301525168e+45, 1.4087303684823927e+46, 2.8456889982455687e+46, 5.74863216733554e+46, 1.1613387411842084e+47, 2.346228997711128e+47, 4.7402228628818865e+47, 9.577315473443615e+47, 1.9351083682206815e+48, 3.9100566827030156e+48, 7.900905777665977e+48, 1.5965649304576352e+49, 3.226353662239748e+49, 6.520078944085465e+49, 1.3176772555261199e+50, 2.6630564828620197e+50, 5.382284641509789e+50, 1.0878467712678801e+51, 2.1987882281474012e+51, 4.444403919082487e+51, 8.983755382419596e+51, 1.8160024470174432e+52, 3.6710381372763563e+52, 7.421217531371164e+52, 1.5002895070934251e+53, 3.0331121909506075e+53, 6.132184611136386e+53, 1.2398100833516458e+54, 2.5067334707614314e+54, 5.06843715955704e+54, 1.0248321558906944e+55, 2.0722590962771903e+55, 4.190326505774815e+55, 8.473523511030972e+55, 1.7135329027204832e+56, 3.465237159211913e+56, 7.007860636079471e+56, 1.4172608945570857e+57, 2.8663279778094284e+57, 5.797137101683188e+57, 1.1724997294395394e+58, 2.3715009581484474e+58, 4.7967282593487255e+58, 9.702375342048342e+58, 1.9625560076382378e+59, 3.969876253572219e+59, 8.03050196106735e+59, 1.6244977778883214e+60, 3.2862920128635974e+60, 6.648193900195978e+60, 1.344966904683975e+61, 2.721007954509684e+61, 5.505011347896617e+61, 1.113773091747887e+62, 2.2534359734920392e+62, 4.5593573089830255e+62, 9.225116165081707e+62, 1.866593615211176e+63, 3.776916070893518e+63, 7.64248206767497e+63, 1.5464681132545414e+64, 3.1293696814609483e+64, 6.332599830056146e+64, 1.2814934993435323e+65, 2.5933424816328226e+65, 5.24822399602593e+65, 1.0621204987253186e+66, 2.1495328080156107e+66, 4.350339446082938e+66, 8.804626015099274e+66, 1.7819983846002473e+67, 3.606718487652263e+67, 7.300047033518307e+67, 1.4775679710332067e+68, 2.9907327268356984e+68, 6.053631627377828e+68, 1.2253567780829956e+69, 2.480374369576969e+69, 5.020881286353305e+69, 1.016367203853456e+70, 2.0574497467652588e+70, 4.1650063394823454e+70, 8.431597528150275e+70, 1.7069145259277518e+71, 3.455582942327362e+71, 6.995817088370136e+71, 1.4163255332490593e+72, 2.8674455205398847e+72, 5.805433529437242e+72, 1.1753885846645687e+73, 2.3797730966107015e+73, 4.818333359349445e+73, 9.755853937030675e+73, 1.9753353255494665e+74, 3.99966308209066e+74, 8.098656333354906e+74, 1.639870135531369e+75, 3.320571335648124e+75, 6.72392699029714e+75, 1.361569852189982e+76, 2.757170189636298e+76, 5.5833374823320215e+76, 1.1306567770195789e+77, 2.289677178435471e+77, 4.636862574383825e+77, 9.390325520710031e+77, 1.9017064297701495e+78, 3.8513470707835294e+78, 7.799884062434071e+78, 1.5796828254672773e+79, 3.199321301237321e+79, 6.479656505331111e+79, 1.312357717468767e+80, 2.658021860812974e+80, 5.383576586284977e+80, 1.0904084954540416e+81, 2.2085818389563745e+81, 4.473461073303571e+81, 9.061074079940771e+81, 1.8353610432736368e+82, 3.7176551750643495e+82, 7.530475961234946e+82, 1.5253918874382903e+83, 3.0899117909063255e+83, 6.259164042533174e+83, 1.2679208660885319e+84, 2.5684640273940843e+84, 5.2030776858611855e+84, 1.0540290445933783e+85, 2.135257487633213e+85, 4.325669134029088e+85, 8.763178807694517e+85, 1.775314676283499e+86, 3.5966176477730825e+86, 7.286490779896767e+86, 1.4762086765682586e+87, 2.9907646380222674e+87, 6.059291341731143e+87, 1.2276272261956521e+88, 2.487231637525793e+88, 5.0393087247497286e+88, 1.0210115955273046e+89, 2.068689577352362e+89, 4.191455776247785e+89, 8.492573757113854e+89, 1.7207532995491636e+90, 3.4866046657263454e+90, 7.064665173485147e+90, 1.4314797504392572e+91, 2.9005713436845766e+91, 5.877418043025327e+91, 1.1909520266794745e+92, 2.4132736974584445e+92, 4.890164706148787e+92, 9.909345258401931e+92, 2.0080335748829212e+93, 4.069129272304509e+93, 8.245869982058014e+93, 1.670997992049841e+94, 3.386256056156391e+94, 6.86227400093606e+94, 1.3906590949535356e+95, 2.8182378544319625e+95, 5.711351882080776e+95, 1.157455961832601e+96, 2.3457098474097423e+96, 4.753881328433477e+96, 9.634442417361411e+96, 1.952580791581245e+97, 3.9572691745947314e+97, 8.020220310242971e+97, 1.6254780366194036e+98, 3.2944277647042835e+98, 6.677023804202779e+98, 1.3532869267662758e+99, 2.7428423763299184e+99, 5.559244728905557e+99, 1.126768479686269e+100, 2.2837970963674343e+100, 4.628968765063795e+100, 9.382419949099461e+100, 1.9017321366083915e+101, 3.854674056414026e+101, 7.813215284855993e+101, 1.5837101984984896e+102, 3.2101505895267563e+102, 6.506970623682916e+102, 1.3189733244767042e+103, 2.6736027709289238e+103, 5.419527641738129e+103, 1.0985748441617983e+104, 2.2269040471280938e+104, 4.514160312178946e+104, 9.15073650789396e+104, 1.8549777293242932e+105, 3.760320885542712e+105, 7.62280220335045e+105, 1.545282590242585e+106, 3.132598023097299e+106, 6.350455901221588e+106, 1.287385452208177e+107, 2.6098510866112505e+107, 5.290860094612086e+107, 1.0726060128670571e+108, 2.174490715097846e+108, 4.4083721499261936e+108, 8.937216650165656e+108, 1.8118808996374774e+109, 3.6733331176532597e+109, 7.4472214856084014e+109, 1.509841980821092e+110, 3.0610609397482494e+110, 6.206055990753902e+110, 1.2582374882304202e+111, 2.551013467599088e+111, 5.172089896489394e+111, 1.0486306406703763e+112, 2.126092573991342e+112, 4.310671509102807e+112, 8.739987314577388e+112, 1.7720655126598288e+113, 3.592955401456253e+113, 7.284956193063475e+113, 1.4770837206465996e+114, 2.994927487030203e+114, 6.072542021428352e+114, 1.2312826132303912e+115, 2.49659416093167e+115, 5.062221264384251e+115, 1.02644870582291e+116, 2.081307830407319e+116, 4.2202512636505694e+116, 8.557427091099288e+116, 1.73520583882005e+117, 3.5185333505048843e+117, 7.134691633444749e+117, 1.4467436743491303e+118, 2.9336669741179814e+118, 5.948847718562194e+118, 1.206306583020825e+119, 2.446162678298947e+119, 4.960389178642346e+119, 1.0058863870938324e+120, 2.0397871897771716e+120, 4.1364094849568597e+120, 8.388125372531414e+120, 1.701018392377289e+121, 3.449497235896755e+121, 6.995282776050676e+121, 1.4185917095139198e+122, 2.8768168600706066e+122, 5.8340434005779026e+122, 1.1831225317824583e+123, 2.3993434097818833e+123, 4.8658386240293033e+123, 9.867919145317412e+123, 2.0012255626192e+124, 4.0585328631202745e+124, 8.230849213149619e+124, 1.6692553060937426e+125, 3.385348740954753e+125, 6.865727770687342e+125, 1.392426402164694e+126, 2.82397216775592e+126, 5.727314811907237e+126, 1.1615667394832662e+127, 2.355807160027915e+127, 4.777907664079972e+127, 9.690321845983673e+127, 1.9653552950659434e+128, 3.98608316799225e+128, 8.084516249693408e+128, 1.639698915003569e+129, 3.325650127484773e+129, 6.745146276783582e+129, 1.3680707017408232e+130, 2.774776811780166e+130, 5.627945774136491e+130, 1.1414951610343844e+131, 2.3152642041529046e+131, 4.696013547558402e+131, 9.524899802883576e+131, 1.931940606551244e+132, 3.918586119030548e+132, 7.948172429217074e+132, 1.612157299446303e+133, 3.2700153164423365e+133, 6.632761613273733e+133, 1.3453683586523665e+134, 2.7289164484970416e+134, 5.535303875308045e+134, 1.1227805619028329e+135, 2.277458554265904e+135, 4.619641231696714e+135, 9.370616737319996e+135, 1.900772990762938e+136, 3.855622178374567e+136, 7.820973576920341e+136, 1.5864605948393755e+137, 3.218102499631025e+137, 6.5278859657762155e+137, 1.3241809623699324e+138, 2.6861125452869324e+138, 5.448828594261936e+138, 1.1053101400542031e+139, 2.2421631973385313e+139, 4.548333845567683e+139, 9.226553163315823e+139, 1.8716673907062561e+140, 3.7968188902884236e+140, 7.702170053145259e+140, 1.5624579185936942e+141, 3.1696079843534014e+141, 6.429908057120799e+141, 1.3043854716897494e+142, 2.646117433238248e+142, 5.368021389965708e+142, 1.0889835405441835e+143, 2.209176117702768e+143, 4.481684721444732e+143, 9.091890422513751e+143, 1.8444590000119024e+144, 3.741844472218129e+144, 7.591093911931671e+144, 1.5400147970269556e+145, 3.12426103746997e+145, 6.338282815577286e+145, 1.2858721443321753e+146, 2.6087101581110046e+146, 5.2924373866902265e+146, 1.0737111891479935e+147, 2.1783169573873234e+147, 4.419330701400454e+147, 8.965897268777576e+147, 1.819000574047197e+148, 3.6904024252113034e+148, 7.487148097897104e+148, 1.5190109998740653e+149, 3.081819544541901e+149, 6.252522673094769e+149, 1.2685427925219514e+150, 2.5736929832423117e+150, 5.2216783630808174e+150, 1.0594128867787386e+151, 2.1494241980669687e+151, 4.3609464872432735e+151, 8.847918539756792e+151, 1.7951601584896268e+152, 3.642226979436122e+152, 7.389797313703616e+152, 1.4993387090047913e+153, 3.042066337591999e+153, 6.172190201223681e+153, 1.252309306201903e+154, 2.5408884279349296e+154, 5.1553868126507404e+154, 1.0460166182891771e+155, 2.1223527719918774e+155, 4.306239848860752e+155, 8.73736554622008e+155, 1.7728191616582374e+156, 3.597079227638147e+156, 7.298560264297455e+156, 1.4809009626839945e+157, 3.004806074340234e+157, 6.096891850805657e+157, 1.237092397172255e+158, 2.5101367480495735e+158, 5.093240889421062e+158, 1.0334575384559958e+159, 2.0969720275966697e+159, 4.25494754258232e+159, 8.63370788278123e+159, 1.751870711401235e+160, 3.554743828288192e+160, 7.213003041717217e+160, 1.463610328188579e+161, 2.9698625746586175e+161, 6.026272607134621e+161, 1.2228205265350601e+162, 2.481293783644282e+162, 5.034950088546655e+162, 1.0216771051432951e+163, 2.0731639898448703e+163, 4.206831819775895e+163, 8.53646642066121e+163, 1.7322182487128824e+164, 3.5150261828413054e+164, 7.132733459464077e+164, 1.4473877646121771e+165, 2.937076537957334e+165, 5.960011408120145e+165, 1.2094289849724155e+166, 2.4542291127531145e+166, 4.980251540187014e+166, 1.0106223353130887e+167, 2.0508218666664828e+167, 4.161677428448807e+167, 8.445207288124061e+167, 1.7137743192218637e+168, 3.477750009431043e+168, 7.057396181142597e+168, 1.4321616448072836e+169, 2.9063035794265697e+169, 5.8978172013385074e+169, 1.1968591010401397e+170, 2.4288244616842096e+170, 4.928906817402175e+170, 1.000245164040183e+171, 2.0298487618124114e+171, 4.1192890285076955e+171, 8.35953667989896e+171, 1.6964595308188334e+172, 3.4427552495288224e+172, 6.98666851643045e+172, 1.417866911077936e+173, 2.877412534352207e+173, 5.839425538398182e+173, 1.1850575571622351e+174, 2.4049723311967065e+174, 4.880699176777669e+174, 9.905018902704419e+174, 2.0101565615927036e+175, 4.0794889555941506e+175, 8.279096365400277e+175, 1.680201651373535e+176, 3.409896255455025e+176, 6.920256780113519e+176, 1.4044443437594291e+177, 2.8502839887661373e+177, 5.784595623102589e+177, 1.173975796612011e+178, 2.3825748051138857e+178, 4.835431164858603e+178, 9.81352695929162e+178, 1.991664968700119e+179, 4.0421152798654525e+179, 8.203559788396795e+179, 1.6649348250597785e+180, 3.379040215746536e+180, 6.857893128124128e+180, 1.3918399254623829e+181, 2.8248090019528322e+181, 5.733107744396688e+181, 1.163569507667457e+182, 2.3615425137227191e+182, 4.792922535037907e+182, 9.727612273004065e+182, 1.9743006609356764e+183, 4.007020115310249e+183, 8.132628669234219e+183, 1.6505988894882084e+184, 3.35006578274332e+184, 6.799332799244657e+184, 1.3800042866950752e+185, 2.800887992211082e+185, 5.684761036831596e+185, 1.1537981734723412e+186, 2.3417937289952866e+186, 4.753008428922934e+186, 9.64694229468579e+186, 1.9579965563976254e+187, 3.974068142675625e+187, 8.066030035652855e+187, 1.637138778838649e+188, 3.32286187273691e+188, 6.744351703065022e+188, 1.3688922209664847e+189, 2.778429762041265e+189, 5.639371520810922e+189, 1.144624678043853e+190, 2.3232535724846518e+190, 4.7155377838164806e+190, 9.571212261389738e+190, 1.9426911697420372e+191, 3.9431353151674314e+191, 8.003513620439624e+191, 1.6245040006159834e+192, 3.297326613886708e+192, 6.692744304531958e+192, 1.3584622594198477e+193, 2.7573506428196235e+193, 5.596770382682062e+193, 1.1360149604227207e+194, 2.3058533198576583e+194, 4.6803719341854697e+194, 9.500142383983838e+194, 1.9283280466128596e+195, 3.9141077210779706e+195, 7.944849574105707e+195, 1.6126481756494858e+196, 3.2733664211040518e+196, 6.644321763395671e+196, 1.3486762966409879e+197, 2.7375737422192826e+197, 5.556802461110885e+197, 1.1279377102408073e+198, 2.2895297885870745e+198, 4.6473833800969483e+198, 9.433475370019696e+198, 1.9148552653902338e+199, 3.886880581582645e+199, 7.88982644898895e+199, 1.6015286325951564e+200, 3.250895180379531e+200, 6.598910293438266e+200, 1.339499260602065e+201, 2.7190282802607844e+201, 5.519324911447796e+201, 1.1203640990338714e+202, 2.274224797428528e+202, 4.616454699826839e+202, 9.370974236144553e+202, 1.902224997090563e+203, 3.861357365333356e+203, 7.838249417931971e+203, 1.5911060495527353e+204, 3.229833527745857e+204, 6.556349711778912e+204, 1.3308988207843698e+205, 2.7016490020527294e+205, 5.484206024134842e+205, 1.1132675424968076e+206, 2.2598846880558063e+206, 4.587477587327319e+206, 9.31242037133511e+206, 1.8903931156537138e+207, 3.83744900427054e+207, 7.789938696309766e+207, 1.581344136534778e+208, 3.210108210309193e+208, 6.516492153061154e+208, 1.3228451294269206e+209, 2.6853756570827622e+209, 5.4513241768271145e+209, 1.1066234896042331e+210, 2.2464599006717418e+210, 4.5603519981465114e+210, 9.257611818039625e+210, 1.8793188520127433e+211, 3.815073197412932e+211, 7.744728140829331e+211, 1.5722093534560421e+212, 3.1916515186580375e+212, 6.479200927064289e+212, 1.3153105915959495e+213, 2.6701525364277955e+213, 5.420566902901229e+213, 1.100409235119978e+214, 2.2339045966233725e+214, 4.534985389806099e+214, 9.206361743150243e+214, 1.8689644863161863e+215, 3.794153791320704e+215, 7.702464002428233e+215, 1.5636706590943197e+216, 3.1744007815167945e+216, 6.444349501425872e+216, 1.3082696604004888e+217, 2.655928060503729e+217, 5.391830061548177e+217, 1.0946037525253415e+218, 2.2221763220572913e+218, 4.5112920446771586e+218, 9.15849707480386e+218, 1.8592950734820973e+219, 3.774620227562919e+219, 7.663003813862865e+219, 1.5556992871254477e+220, 3.1582979148283143e+220, 6.411820593775825e+220, 1.3016986542028714e+221, 2.6426544110341223e+221, 5.36501709676147e+221, 1.0891875448177547e+222, 2.2112357075046137e+222, 4.489192465086447e+222, 9.113857284401041e+222, 1.8502781979494265e+223, 3.7564070488840215e+223, 7.626215395316995e+223, 1.5482685458885524e+224, 3.1432890185475155e+224, 6.3815053598005686e+224, 1.2955755931182019e+225, 2.6302872017999154e+225, 5.340038374305296e+225, 1.0841425109910652e+226, 2.2010461989957085e+226, 4.468612831826772e+226, 9.072293296117583e+226, 1.8418837540654727e+227, 3.7394534569253266e+227, 7.591975963679796e+227, 1.5413536389994614e+228, 3.129324015357653e+228, 6.353302665622025e+228, 1.2898800524683393e+229, 2.6187851834919505e+229, 5.31681058726452e+229, 1.0794518263062574e+230, 2.1915738169131675e+230, 4.449484518448312e+230, 9.033666508613736e+230, 1.8340837490402554e+231, 3.723702915333165e+231, 7.560171333115111e+231, 1.534931504322577e+232, 3.116356326319184e+232, 6.327118434446827e+232, 1.284593031177548e+233, 2.608109978611184e+233, 5.295256222033747e+233, 1.0750998347223299e+234, 2.1827869392997177e+234, 4.43174365475206e+234, 8.997847915702226e+234, 1.826852125805558e+235, 3.709102792909217e+235, 7.530695196173876e+235, 1.5289806691500785e+236, 3.1043425791130435e+236, 6.302865058806164e+236, 1.2796968333601689e+237, 2.598225842911091e+237, 5.275303077711991e+237, 1.0710719520678968e+238, 2.174656106781668e+238, 4.415330733760154e+238, 8.964717314494137e+238, 1.8201646034772925e+239, 3.695604042172022e+239, 7.503448476166282e+239, 1.523481119714324e+240, 3.0932423451314004e+240, 6.280460870820639e+240, 1.275174961584766e+241, 2.5890994503372536e+241, 5.256883832761375e+241, 1.067354578726742e+242, 2.1671538466300456e+242, 4.400190257199897e+242, 8.93416259105369e+242, 1.8139985334092083e+243, 3.683160909302832e+243, 7.478338742672406e+243, 1.5184141834075003e+244, 3.0830179021362345e+244, 6.25982966392431e+244, 1.2710120204951968e+245, 2.5806996988023787e+245, 5.23993565361393e+245, 1.0639350207622613e+246, 2.1602545138074015e+246, 4.386270415176693e+246, 8.906079074834212e+246, 1.8083327690954552e+247, 3.671730671953432e+247, 7.45527968313587e+247, 1.5137624222904585e+248, 3.0736340196357423e+248, 6.24090026031886e+248, 1.2671936296332076e+249, 2.572997534488551e+249, 5.2243998405542065e+249, 1.0608014185459018e+250, 2.1539341471211047e+250, 4.373522796241198e+250, 8.880368954323311e+250, 1.8031475483886013e+251, 3.661273401847834e+251, 7.434190624373828e+251, 1.5095095366450874e+252, 3.065057764486336e+252, 6.2236061191287476e+252, 1.263706344455462e+253, 2.5659657926421336e+253, 5.210221506808361e+253, 1.0579426820713891e+254, 2.1481703388298803e+254, 4.3619021245543265e+254, 8.856940747214561e+254, 1.7984243866967735e+255, 3.651751749491091e+255, 7.414996098572043e+255, 1.5056402774876987e+256, 3.057258324527034e+256, 6.207884980866856e+256, 1.2605375846623622e+257, 2.559579053086742e+257, 5.19734928727102e+257, 1.0553484322339313e+258, 2.142942116265988e+258, 4.351366021232182e+258, 8.835708819273732e+258, 1.7941459799872163e+259, 3.6431307486126505e+259, 7.397625449040507e+259, 1.5021403670839554e+260, 3.050206848328693e+260, 6.193678544355244e+260, 1.257675569058372e+261, 2.5538135088949768e+261, 5.1857350737181676e+261, 1.0530089474438373e+262, 2.138229834196626e+262, 4.341874787321307e+262, 8.816592946771975e+262, 1.790296116557927e+263, 3.6353776382787607e+263, 7.382012471529314e+263, 1.498996426626574e+264, 3.043876299371115e+264, 6.1809321726835325e+264, 1.2551092562643522e+265, 2.5486468468383522e+265, 5.17533377374533e+265, 1.0509151150193746e+266, 2.134015076807975e+266, 4.333391206157825e+266, 8.799517917933526e+266, 1.7868595966728696e+267, 3.628461700831862e+267, 7.368095087428918e+267, 1.4961959103363949e+268, 3.0382413231486216e+268, 6.1695946252274116e+268, 1.2528282906751214e+269, 2.5440581384046926e+269, 5.166103090996034e+269, 1.0490583868648674e+270, 2.1302805683263127e+270, 4.325880363114606e+270, 8.784413169430844e+270, 1.783822159251522e+271, 3.622354114043409e+271, 7.35581504560866e+271, 1.4937270453278282e+272, 3.033278125897288e+272, 6.159617813059657e+272, 1.2508229531305438e+273, 2.5400277403132476e+273, 5.158003324507843e+273, 1.0474307390034485e+274, 2.1270100913983045e+274, 4.319309480983371e+274, 8.771212454365932e+274, 1.7811704149033468e+275, 3.617027816052337e+275, 7.345117649992365e+275, 1.4915787766642542e+276, 3.0289643637691263e+276, 6.150956575414476e+276, 1.249084115829456e+277, 2.536537203570355e+277, 5.150997185282151e+277, 1.0460246345768544e+278, 2.124188412458704e+278, 4.3136477694392714e+278, 8.759853538614073e+278, 1.7788917846783576e+279, 3.6124573818126916e+279, 7.335951510342405e+279, 1.4897407170852313e+280, 3.025279041422512e+280, 6.143568475130977e+280, 1.247603201064069e+281, 2.5335691902314887e+281, 5.1450496283668584e+281, 1.0448329899721037e+282, 2.121801213400894e+282, 4.308866287193079e+282, 8.750277922756385e+282, 1.7769744439701497e+283, 3.6086189099271507e+283, 7.328268313963066e+283, 1.4882031009506883e+284, 3.022202419113144e+284, 6.137413611209063e+284, 1.2463721434069037e+285, 2.531107397113335e+285, 5.140127698950014e+285, 1.0438491437727647e+286, 2.119835028933394e+286, 4.3049378156162456e+286, 8.742430587108567e+286, 1.775407271075102e+287, 3.605489918867857e+287, 7.322022616313357e+287, 1.486956741997388e+288, 3.0197159274616043e+288, 6.132454446852635e+288, 1.2453833550153735e+289, 2.529136485791815e+289, 5.136200391127643e+289, 1.043066828261568e+290, 2.1182771890855067e+290, 4.3018367427313045e+290, 8.736259757650023e+290, 1.7741797999659177e+291, 3.603049251680806e+291, 7.31717164873803e+291, 1.4859929945424901e+292, 3.0178020891716224e+292, 6.128655651515049e+292, 1.2446296937599752e+293, 2.5276420182940878e+293, 5.133238518133606e+293, 1.042480143236834e+294, 2.117115766370678e+294, 4.2995389565953115e+294, 8.731716690895745e+294, 1.7732821768783275e+295, 3.601276988388548e+295, 7.313675141696029e+295, 1.4853037178124472e+296, 3.0164444470515275e+296, 6.125983955643199e+296, 1.2441044339134643e+297, 2.5266103979460203e+297, 5.131214592979163e+297, 1.0420835319243277e+298, 2.116339527176246e+298, 4.298021747207806e+298, 8.728755475927608e+298, 1.7727051203629143e+299, 3.600154365367926e+299, 7.311495162058127e+299, 1.4848812431097936e+300, 3.0156274977481396e+300, 6.124408016954128e+300, 1.2438012391624045e+301, 2.5260288149083615e+301, 5.130102718530395e+301, 1.0418717587929655e+302, 2.115937886993775e+302, 4.297263716149366e+302, 8.727332852040496e+302, 1.7724398844799722e+303, 3.599663701068505e+303, 7.310595963196275e+303, 1.4847183435546851e+304, 3.0153366306819095e+304, 6.1238982971814895e+304, 1.243714137730863e+305, 2.525885195968491e+305]}
},{}],61:[function(require,module,exports){
module.exports={"x": [-1.0, -0.998998998998999, -0.997997997997998, -0.996996996996997, -0.995995995995996, -0.994994994994995, -0.993993993993994, -0.992992992992993, -0.991991991991992, -0.990990990990991, -0.98998998998999, -0.988988988988989, -0.987987987987988, -0.986986986986987, -0.985985985985986, -0.984984984984985, -0.983983983983984, -0.982982982982983, -0.9819819819819819, -0.980980980980981, -0.97997997997998, -0.978978978978979, -0.977977977977978, -0.9769769769769769, -0.975975975975976, -0.974974974974975, -0.973973973973974, -0.972972972972973, -0.9719719719719719, -0.970970970970971, -0.96996996996997, -0.968968968968969, -0.967967967967968, -0.9669669669669669, -0.965965965965966, -0.964964964964965, -0.963963963963964, -0.962962962962963, -0.9619619619619619, -0.960960960960961, -0.95995995995996, -0.958958958958959, -0.957957957957958, -0.9569569569569569, -0.955955955955956, -0.954954954954955, -0.953953953953954, -0.9529529529529529, -0.9519519519519519, -0.950950950950951, -0.94994994994995, -0.948948948948949, -0.9479479479479479, -0.9469469469469469, -0.9459459459459459, -0.944944944944945, -0.943943943943944, -0.9429429429429429, -0.9419419419419419, -0.9409409409409409, -0.93993993993994, -0.938938938938939, -0.9379379379379379, -0.9369369369369369, -0.9359359359359359, -0.934934934934935, -0.933933933933934, -0.9329329329329329, -0.9319319319319319, -0.9309309309309309, -0.92992992992993, -0.928928928928929, -0.9279279279279279, -0.9269269269269269, -0.9259259259259259, -0.924924924924925, -0.9239239239239239, -0.9229229229229229, -0.9219219219219219, -0.9209209209209209, -0.91991991991992, -0.9189189189189189, -0.9179179179179179, -0.9169169169169169, -0.9159159159159159, -0.914914914914915, -0.9139139139139139, -0.9129129129129129, -0.9119119119119119, -0.9109109109109109, -0.9099099099099099, -0.9089089089089089, -0.9079079079079079, -0.9069069069069069, -0.9059059059059059, -0.9049049049049049, -0.9039039039039038, -0.9029029029029029, -0.9019019019019019, -0.9009009009009009, -0.8998998998998999, -0.8988988988988988, -0.8978978978978979, -0.8968968968968969, -0.8958958958958959, -0.8948948948948949, -0.8938938938938938, -0.8928928928928929, -0.8918918918918919, -0.8908908908908909, -0.8898898898898899, -0.8888888888888888, -0.8878878878878879, -0.8868868868868869, -0.8858858858858859, -0.8848848848848849, -0.8838838838838838, -0.8828828828828829, -0.8818818818818819, -0.8808808808808809, -0.8798798798798799, -0.8788788788788788, -0.8778778778778779, -0.8768768768768769, -0.8758758758758759, -0.8748748748748749, -0.8738738738738738, -0.8728728728728729, -0.8718718718718719, -0.8708708708708709, -0.8698698698698699, -0.8688688688688688, -0.8678678678678678, -0.8668668668668669, -0.8658658658658659, -0.8648648648648649, -0.8638638638638638, -0.8628628628628628, -0.8618618618618619, -0.8608608608608609, -0.8598598598598599, -0.8588588588588588, -0.8578578578578578, -0.8568568568568569, -0.8558558558558559, -0.8548548548548549, -0.8538538538538538, -0.8528528528528528, -0.8518518518518519, -0.8508508508508509, -0.8498498498498499, -0.8488488488488488, -0.8478478478478478, -0.8468468468468469, -0.8458458458458459, -0.8448448448448449, -0.8438438438438438, -0.8428428428428428, -0.8418418418418419, -0.8408408408408409, -0.8398398398398399, -0.8388388388388388, -0.8378378378378378, -0.8368368368368369, -0.8358358358358359, -0.8348348348348349, -0.8338338338338338, -0.8328328328328328, -0.8318318318318318, -0.8308308308308309, -0.8298298298298299, -0.8288288288288288, -0.8278278278278278, -0.8268268268268268, -0.8258258258258259, -0.8248248248248249, -0.8238238238238238, -0.8228228228228228, -0.8218218218218218, -0.8208208208208209, -0.8198198198198199, -0.8188188188188188, -0.8178178178178178, -0.8168168168168168, -0.8158158158158157, -0.8148148148148149, -0.8138138138138138, -0.8128128128128128, -0.8118118118118118, -0.8108108108108107, -0.8098098098098099, -0.8088088088088088, -0.8078078078078078, -0.8068068068068068, -0.8058058058058057, -0.8048048048048049, -0.8038038038038038, -0.8028028028028028, -0.8018018018018018, -0.8008008008008007, -0.7997997997997999, -0.7987987987987988, -0.7977977977977978, -0.7967967967967968, -0.7957957957957957, -0.7947947947947948, -0.7937937937937938, -0.7927927927927928, -0.7917917917917918, -0.7907907907907907, -0.7897897897897898, -0.7887887887887888, -0.7877877877877878, -0.7867867867867868, -0.7857857857857857, -0.7847847847847848, -0.7837837837837838, -0.7827827827827828, -0.7817817817817818, -0.7807807807807807, -0.7797797797797797, -0.7787787787787788, -0.7777777777777778, -0.7767767767767768, -0.7757757757757757, -0.7747747747747747, -0.7737737737737738, -0.7727727727727728, -0.7717717717717718, -0.7707707707707707, -0.7697697697697697, -0.7687687687687688, -0.7677677677677678, -0.7667667667667668, -0.7657657657657657, -0.7647647647647647, -0.7637637637637638, -0.7627627627627628, -0.7617617617617618, -0.7607607607607607, -0.7597597597597597, -0.7587587587587588, -0.7577577577577578, -0.7567567567567568, -0.7557557557557557, -0.7547547547547547, -0.7537537537537538, -0.7527527527527528, -0.7517517517517518, -0.7507507507507507, -0.7497497497497497, -0.7487487487487487, -0.7477477477477478, -0.7467467467467468, -0.7457457457457457, -0.7447447447447447, -0.7437437437437437, -0.7427427427427428, -0.7417417417417418, -0.7407407407407407, -0.7397397397397397, -0.7387387387387387, -0.7377377377377378, -0.7367367367367368, -0.7357357357357357, -0.7347347347347347, -0.7337337337337337, -0.7327327327327328, -0.7317317317317318, -0.7307307307307307, -0.7297297297297297, -0.7287287287287287, -0.7277277277277278, -0.7267267267267268, -0.7257257257257257, -0.7247247247247247, -0.7237237237237237, -0.7227227227227226, -0.7217217217217218, -0.7207207207207207, -0.7197197197197197, -0.7187187187187187, -0.7177177177177176, -0.7167167167167168, -0.7157157157157157, -0.7147147147147147, -0.7137137137137137, -0.7127127127127126, -0.7117117117117118, -0.7107107107107107, -0.7097097097097097, -0.7087087087087087, -0.7077077077077076, -0.7067067067067068, -0.7057057057057057, -0.7047047047047047, -0.7037037037037037, -0.7027027027027026, -0.7017017017017018, -0.7007007007007007, -0.6996996996996997, -0.6986986986986987, -0.6976976976976976, -0.6966966966966968, -0.6956956956956957, -0.6946946946946947, -0.6936936936936937, -0.6926926926926926, -0.6916916916916918, -0.6906906906906907, -0.6896896896896897, -0.6886886886886887, -0.6876876876876876, -0.6866866866866868, -0.6856856856856857, -0.6846846846846847, -0.6836836836836837, -0.6826826826826826, -0.6816816816816818, -0.6806806806806807, -0.6796796796796797, -0.6786786786786787, -0.6776776776776776, -0.6766766766766767, -0.6756756756756757, -0.6746746746746747, -0.6736736736736737, -0.6726726726726726, -0.6716716716716717, -0.6706706706706707, -0.6696696696696697, -0.6686686686686687, -0.6676676676676676, -0.6666666666666667, -0.6656656656656657, -0.6646646646646647, -0.6636636636636637, -0.6626626626626626, -0.6616616616616617, -0.6606606606606606, -0.6596596596596597, -0.6586586586586587, -0.6576576576576576, -0.6566566566566567, -0.6556556556556556, -0.6546546546546547, -0.6536536536536537, -0.6526526526526526, -0.6516516516516517, -0.6506506506506506, -0.6496496496496497, -0.6486486486486487, -0.6476476476476476, -0.6466466466466467, -0.6456456456456456, -0.6446446446446447, -0.6436436436436437, -0.6426426426426426, -0.6416416416416417, -0.6406406406406406, -0.6396396396396397, -0.6386386386386387, -0.6376376376376376, -0.6366366366366367, -0.6356356356356356, -0.6346346346346347, -0.6336336336336337, -0.6326326326326326, -0.6316316316316316, -0.6306306306306306, -0.6296296296296297, -0.6286286286286287, -0.6276276276276276, -0.6266266266266266, -0.6256256256256256, -0.6246246246246246, -0.6236236236236237, -0.6226226226226226, -0.6216216216216216, -0.6206206206206206, -0.6196196196196196, -0.6186186186186187, -0.6176176176176176, -0.6166166166166166, -0.6156156156156156, -0.6146146146146146, -0.6136136136136137, -0.6126126126126126, -0.6116116116116116, -0.6106106106106106, -0.6096096096096096, -0.6086086086086087, -0.6076076076076076, -0.6066066066066066, -0.6056056056056056, -0.6046046046046046, -0.6036036036036037, -0.6026026026026026, -0.6016016016016016, -0.6006006006006006, -0.5995995995995996, -0.5985985985985987, -0.5975975975975976, -0.5965965965965966, -0.5955955955955956, -0.5945945945945945, -0.5935935935935936, -0.5925925925925926, -0.5915915915915916, -0.5905905905905906, -0.5895895895895895, -0.5885885885885886, -0.5875875875875876, -0.5865865865865866, -0.5855855855855856, -0.5845845845845845, -0.5835835835835836, -0.5825825825825826, -0.5815815815815816, -0.5805805805805806, -0.5795795795795795, -0.5785785785785786, -0.5775775775775776, -0.5765765765765766, -0.5755755755755756, -0.5745745745745745, -0.5735735735735736, -0.5725725725725725, -0.5715715715715716, -0.5705705705705706, -0.5695695695695695, -0.5685685685685686, -0.5675675675675675, -0.5665665665665666, -0.5655655655655656, -0.5645645645645645, -0.5635635635635636, -0.5625625625625625, -0.5615615615615616, -0.5605605605605606, -0.5595595595595595, -0.5585585585585586, -0.5575575575575575, -0.5565565565565566, -0.5555555555555556, -0.5545545545545545, -0.5535535535535536, -0.5525525525525525, -0.5515515515515516, -0.5505505505505506, -0.5495495495495495, -0.5485485485485486, -0.5475475475475475, -0.5465465465465466, -0.5455455455455456, -0.5445445445445445, -0.5435435435435436, -0.5425425425425425, -0.5415415415415415, -0.5405405405405406, -0.5395395395395395, -0.5385385385385386, -0.5375375375375375, -0.5365365365365365, -0.5355355355355356, -0.5345345345345345, -0.5335335335335336, -0.5325325325325325, -0.5315315315315315, -0.5305305305305306, -0.5295295295295295, -0.5285285285285286, -0.5275275275275275, -0.5265265265265265, -0.5255255255255256, -0.5245245245245245, -0.5235235235235236, -0.5225225225225225, -0.5215215215215215, -0.5205205205205206, -0.5195195195195195, -0.5185185185185186, -0.5175175175175175, -0.5165165165165165, -0.5155155155155156, -0.5145145145145145, -0.5135135135135136, -0.5125125125125125, -0.5115115115115115, -0.5105105105105106, -0.5095095095095095, -0.5085085085085086, -0.5075075075075075, -0.5065065065065065, -0.5055055055055055, -0.5045045045045045, -0.5035035035035035, -0.5025025025025025, -0.5015015015015015, -0.5005005005005005, -0.49949949949949946, -0.4984984984984985, -0.4974974974974975, -0.4964964964964965, -0.49549549549549554, -0.49449449449449445, -0.4934934934934935, -0.4924924924924925, -0.4914914914914915, -0.49049049049049054, -0.48948948948948945, -0.48848848848848847, -0.4874874874874875, -0.4864864864864865, -0.48548548548548554, -0.48448448448448445, -0.48348348348348347, -0.4824824824824825, -0.4814814814814815, -0.48048048048048053, -0.47947947947947944, -0.47847847847847846, -0.4774774774774775, -0.4764764764764765, -0.47547547547547553, -0.47447447447447444, -0.47347347347347346, -0.4724724724724725, -0.4714714714714715, -0.4704704704704705, -0.46946946946946944, -0.46846846846846846, -0.4674674674674675, -0.4664664664664665, -0.4654654654654655, -0.46446446446446443, -0.46346346346346345, -0.4624624624624625, -0.4614614614614615, -0.4604604604604605, -0.45945945945945943, -0.45845845845845845, -0.4574574574574575, -0.4564564564564565, -0.4554554554554555, -0.4544544544544544, -0.45345345345345345, -0.45245245245245247, -0.4514514514514515, -0.4504504504504504, -0.4494494494494494, -0.44844844844844844, -0.44744744744744747, -0.4464464464464465, -0.4454454454454454, -0.4444444444444444, -0.44344344344344344, -0.44244244244244246, -0.4414414414414415, -0.4404404404404404, -0.4394394394394394, -0.43843843843843844, -0.43743743743743746, -0.4364364364364365, -0.4354354354354354, -0.4344344344344344, -0.43343343343343343, -0.43243243243243246, -0.4314314314314315, -0.4304304304304304, -0.4294294294294294, -0.42842842842842843, -0.42742742742742745, -0.4264264264264265, -0.4254254254254254, -0.4244244244244244, -0.42342342342342343, -0.42242242242242245, -0.42142142142142147, -0.4204204204204204, -0.4194194194194194, -0.4184184184184184, -0.41741741741741745, -0.41641641641641647, -0.4154154154154154, -0.4144144144144144, -0.4134134134134134, -0.41241241241241244, -0.41141141141141147, -0.4104104104104104, -0.4094094094094094, -0.4084084084084084, -0.40740740740740744, -0.40640640640640646, -0.4054054054054054, -0.4044044044044044, -0.4034034034034034, -0.40240240240240244, -0.40140140140140146, -0.40040040040040037, -0.3993993993993994, -0.3983983983983984, -0.39739739739739743, -0.39639639639639646, -0.39539539539539537, -0.3943943943943944, -0.3933933933933934, -0.39239239239239243, -0.39139139139139134, -0.39039039039039036, -0.3893893893893894, -0.3883883883883884, -0.3873873873873874, -0.38638638638638634, -0.38538538538538536, -0.3843843843843844, -0.3833833833833834, -0.3823823823823824, -0.38138138138138133, -0.38038038038038036, -0.3793793793793794, -0.3783783783783784, -0.3773773773773774, -0.37637637637637633, -0.37537537537537535, -0.3743743743743744, -0.3733733733733734, -0.3723723723723724, -0.37137137137137133, -0.37037037037037035, -0.36936936936936937, -0.3683683683683684, -0.3673673673673674, -0.3663663663663663, -0.36536536536536535, -0.36436436436436437, -0.3633633633633634, -0.3623623623623624, -0.3613613613613613, -0.36036036036036034, -0.35935935935935936, -0.3583583583583584, -0.3573573573573574, -0.3563563563563563, -0.35535535535535534, -0.35435435435435436, -0.3533533533533534, -0.3523523523523524, -0.3513513513513513, -0.35035035035035034, -0.34934934934934936, -0.3483483483483484, -0.3473473473473474, -0.3463463463463463, -0.34534534534534533, -0.34434434434434436, -0.3433433433433434, -0.3423423423423424, -0.3413413413413413, -0.34034034034034033, -0.33933933933933935, -0.3383383383383384, -0.3373373373373374, -0.3363363363363363, -0.3353353353353353, -0.33433433433433435, -0.33333333333333337, -0.3323323323323324, -0.3313313313313313, -0.3303303303303303, -0.32932932932932935, -0.32832832832832837, -0.3273273273273274, -0.3263263263263263, -0.3253253253253253, -0.32432432432432434, -0.32332332332332336, -0.3223223223223223, -0.3213213213213213, -0.3203203203203203, -0.31931931931931934, -0.31831831831831836, -0.31731731731731727, -0.3163163163163163, -0.3153153153153153, -0.31431431431431434, -0.31331331331331336, -0.31231231231231227, -0.3113113113113113, -0.3103103103103103, -0.30930930930930933, -0.30830830830830835, -0.30730730730730726, -0.3063063063063063, -0.3053053053053053, -0.30430430430430433, -0.30330330330330335, -0.30230230230230226, -0.3013013013013013, -0.3003003003003003, -0.2992992992992993, -0.29829829829829835, -0.29729729729729726, -0.2962962962962963, -0.2952952952952953, -0.2942942942942943, -0.29329329329329334, -0.29229229229229226, -0.2912912912912913, -0.2902902902902903, -0.2892892892892893, -0.28828828828828834, -0.28728728728728725, -0.2862862862862863, -0.2852852852852853, -0.2842842842842843, -0.28328328328328334, -0.28228228228228225, -0.28128128128128127, -0.2802802802802803, -0.2792792792792793, -0.27827827827827833, -0.27727727727727725, -0.27627627627627627, -0.2752752752752753, -0.2742742742742743, -0.27327327327327333, -0.27227227227227224, -0.27127127127127126, -0.2702702702702703, -0.2692692692692693, -0.26826826826826833, -0.26726726726726724, -0.26626626626626626, -0.2652652652652653, -0.2642642642642643, -0.2632632632632632, -0.26226226226226224, -0.26126126126126126, -0.2602602602602603, -0.2592592592592593, -0.2582582582582582, -0.25725725725725723, -0.25625625625625625, -0.2552552552552553, -0.2542542542542543, -0.2532532532532532, -0.25225225225225223, -0.25125125125125125, -0.2502502502502503, -0.2492492492492493, -0.2482482482482482, -0.24724724724724723, -0.24624624624624625, -0.24524524524524527, -0.2442442442442443, -0.2432432432432432, -0.24224224224224222, -0.24124124124124124, -0.24024024024024027, -0.2392392392392393, -0.2382382382382382, -0.23723723723723722, -0.23623623623623624, -0.23523523523523526, -0.23423423423423428, -0.2332332332332332, -0.23223223223223222, -0.23123123123123124, -0.23023023023023026, -0.22922922922922928, -0.2282282282282282, -0.2272272272272272, -0.22622622622622623, -0.22522522522522526, -0.22422422422422428, -0.2232232232232232, -0.2222222222222222, -0.22122122122122123, -0.22022022022022025, -0.21921921921921927, -0.21821821821821819, -0.2172172172172172, -0.21621621621621623, -0.21521521521521525, -0.21421421421421427, -0.21321321321321318, -0.2122122122122122, -0.21121121121121122, -0.21021021021021025, -0.20920920920920927, -0.20820820820820818, -0.2072072072072072, -0.20620620620620622, -0.20520520520520524, -0.20420420420420426, -0.20320320320320318, -0.2022022022022022, -0.20120120120120122, -0.20020020020020024, -0.19919919919919926, -0.19819819819819817, -0.1971971971971972, -0.19619619619619622, -0.19519519519519524, -0.19419419419419415, -0.19319319319319317, -0.1921921921921922, -0.1911911911911912, -0.19019019019019023, -0.18918918918918914, -0.18818818818818817, -0.1871871871871872, -0.1861861861861862, -0.18518518518518523, -0.18418418418418414, -0.18318318318318316, -0.18218218218218218, -0.1811811811811812, -0.18018018018018023, -0.17917917917917914, -0.17817817817817816, -0.17717717717717718, -0.1761761761761762, -0.17517517517517522, -0.17417417417417413, -0.17317317317317316, -0.17217217217217218, -0.1711711711711712, -0.17017017017017022, -0.16916916916916913, -0.16816816816816815, -0.16716716716716717, -0.1661661661661662, -0.16516516516516522, -0.16416416416416413, -0.16316316316316315, -0.16216216216216217, -0.1611611611611612, -0.16016016016016021, -0.15915915915915912, -0.15815815815815815, -0.15715715715715717, -0.1561561561561562, -0.1551551551551552, -0.15415415415415412, -0.15315315315315314, -0.15215215215215216, -0.1511511511511512, -0.1501501501501502, -0.14914914914914912, -0.14814814814814814, -0.14714714714714716, -0.14614614614614618, -0.1451451451451452, -0.14414414414414412, -0.14314314314314314, -0.14214214214214216, -0.14114114114114118, -0.1401401401401402, -0.1391391391391391, -0.13813813813813813, -0.13713713713713716, -0.13613613613613618, -0.1351351351351351, -0.1341341341341341, -0.13313313313313313, -0.13213213213213215, -0.13113113113113117, -0.13013013013013008, -0.1291291291291291, -0.12812812812812813, -0.12712712712712715, -0.12612612612612617, -0.12512512512512508, -0.1241241241241241, -0.12312312312312312, -0.12212212212212215, -0.12112112112112117, -0.12012012012012008, -0.1191191191191191, -0.11811811811811812, -0.11711711711711714, -0.11611611611611616, -0.11511511511511507, -0.1141141141141141, -0.11311311311311312, -0.11211211211211214, -0.11111111111111116, -0.11011011011011007, -0.10910910910910909, -0.10810810810810811, -0.10710710710710714, -0.10610610610610616, -0.10510510510510507, -0.10410410410410409, -0.10310310310310311, -0.10210210210210213, -0.10110110110110115, -0.10010010010010006, -0.09909909909909909, -0.09809809809809811, -0.09709709709709713, -0.09609609609609615, -0.09509509509509506, -0.09409409409409408, -0.0930930930930931, -0.09209209209209213, -0.09109109109109115, -0.09009009009009006, -0.08908908908908908, -0.0880880880880881, -0.08708708708708712, -0.08608608608608614, -0.08508508508508505, -0.08408408408408408, -0.0830830830830831, -0.08208208208208212, -0.08108108108108114, -0.08008008008008005, -0.07907907907907907, -0.0780780780780781, -0.07707707707707712, -0.07607607607607614, -0.07507507507507505, -0.07407407407407407, -0.07307307307307309, -0.07207207207207211, -0.07107107107107113, -0.07007007007007005, -0.06906906906906907, -0.06806806806806809, -0.06706706706706711, -0.06606606606606602, -0.06506506506506504, -0.06406406406406406, -0.06306306306306309, -0.06206206206206211, -0.06106106106106102, -0.06006006006006004, -0.05905905905905906, -0.05805805805805808, -0.0570570570570571, -0.056056056056056014, -0.055055055055055035, -0.05405405405405406, -0.05305305305305308, -0.0520520520520521, -0.05105105105105101, -0.05005005005005003, -0.049049049049049054, -0.048048048048048075, -0.0470470470470471, -0.04604604604604601, -0.04504504504504503, -0.04404404404404405, -0.04304304304304307, -0.042042042042042094, -0.041041041041041004, -0.040040040040040026, -0.03903903903903905, -0.03803803803803807, -0.03703703703703709, -0.036036036036036, -0.03503503503503502, -0.034034034034034044, -0.033033033033033066, -0.03203203203203209, -0.031031031031030998, -0.03003003003003002, -0.02902902902902904, -0.028028028028028062, -0.027027027027027084, -0.026026026026025995, -0.025025025025025016, -0.024024024024024038, -0.02302302302302306, -0.02202202202202208, -0.02102102102102099, -0.020020020020020013, -0.019019019019019034, -0.018018018018018056, -0.017017017017017078, -0.016016016016015988, -0.01501501501501501, -0.014014014014014031, -0.013013013013013053, -0.012012012012012074, -0.011011011011010985, -0.010010010010010006, -0.009009009009009028, -0.00800800800800805, -0.00700700700700696, -0.006006006006005982, -0.005005005005005003, -0.004004004004004025, -0.0030030030030030463, -0.002002002002001957, -0.0010010010010009784, -5.551115123125783e-17], "expected": [0.6321205588285577, 0.6323851449331281, 0.6326498920765035, 0.6329148003730879, 0.6331798699373731, 0.6334451008839398, 0.633710493327457, 0.6339760473826822, 0.6342417631644617, 0.6345076407877301, 0.6347736803675114, 0.6350398820189175, 0.6353062458571501, 0.6355727719974997, 0.6358394605553455, 0.636106311646156, 0.636373325385489, 0.6366405018889914, 0.6369078412723996, 0.6371753436515394, 0.6374430091423258, 0.6377108378607639, 0.637978829922948, 0.6382469854450622, 0.6385153045433805, 0.6387837873342664, 0.6390524339341742, 0.6393212444596469, 0.6395902190273187, 0.6398593577539134, 0.6401286607562452, 0.6403981281512183, 0.6406677600558279, 0.6409375565871588, 0.641207517862387, 0.6414776439987787, 0.6417479351136909, 0.6420183913245715, 0.6422890127489588, 0.6425597995044824, 0.6428307517088625, 0.6431018694799105, 0.6433731529355289, 0.6436446021937117, 0.6439162173725435, 0.6441879985902006, 0.6444599459649507, 0.644732059615153, 0.6450043396592581, 0.6452767862158083, 0.6455493994034376, 0.6458221793408719, 0.6460951261469287, 0.6463682399405176, 0.6466415208406401, 0.6469149689663898, 0.6471885844369527, 0.6474623673716066, 0.6477363178897216, 0.6480104361107607, 0.6482847221542789, 0.6485591761399238, 0.6488337981874356, 0.6491085884166472, 0.6493835469474845, 0.6496586738999656, 0.649933969394202, 0.6502094335503982, 0.6504850664888515, 0.6507608683299525, 0.6510368391941849, 0.6513129792021255, 0.6515892884744451, 0.6518657671319071, 0.6521424152953693, 0.6524192330857821, 0.6526962206241902, 0.652973378031732, 0.6532507054296397, 0.653528202939239, 0.65380587068195, 0.6540837087792867, 0.6543617173528573, 0.654639896524364, 0.6549182464156036, 0.6551967671484668, 0.6554754588449389, 0.6557543216271, 0.6560333556171245, 0.6563125609372815, 0.6565919377099347, 0.656871486057543, 0.6571512061026595, 0.6574310979679333, 0.6577111617761074, 0.657991397650021, 0.6582718057126073, 0.6585523860868961, 0.6588331388960117, 0.6591140642631736, 0.6593951623116977, 0.6596764331649951, 0.6599578769465722, 0.6602394937800314, 0.6605212837890712, 0.6608032470974855, 0.6610853838291646, 0.6613676941080947, 0.661650178058358, 0.6619328358041329, 0.6622156674696947, 0.6624986731794141, 0.662781853057759, 0.6630652072292935, 0.6633487358186784, 0.6636324389506709, 0.6639163167501257, 0.6642003693419936, 0.6644845968513224, 0.6647689994032573, 0.6650535771230401, 0.6653383301360104, 0.6656232585676046, 0.6659083625433561, 0.6661936421888963, 0.666479097629954, 0.6667647289923552, 0.6670505364020236, 0.667336519984981, 0.6676226798673466, 0.6679090161753377, 0.6681955290352694, 0.6684822185735549, 0.6687690849167055, 0.6690561281913308, 0.6693433485241383, 0.6696307460419345, 0.6699183208716238, 0.6702060731402092, 0.6704940029747924, 0.670782110502574, 0.6710703958508528, 0.6713588591470266, 0.6716475005185929, 0.671936320093147, 0.6722253179983838, 0.672514494362098, 0.6728038493121823, 0.6730933829766296, 0.6733830954835319, 0.6736729869610808, 0.6739630575375675, 0.6742533073413824, 0.6745437365010165, 0.6748343451450597, 0.6751251334022023, 0.6754161014012345, 0.6757072492710464, 0.6759985771406284, 0.6762900851390712, 0.6765817733955652, 0.6768736420394024, 0.6771656911999736, 0.6774579210067716, 0.6777503315893894, 0.67804292307752, 0.6783356956009583, 0.6786286492895993, 0.6789217842734394, 0.6792151006825756, 0.6795085986472064, 0.6798022782976313, 0.6800961397642511, 0.6803901831775682, 0.6806844086681861, 0.6809788163668102, 0.6812734064042472, 0.6815681789114054, 0.6818631340192954, 0.6821582718590296, 0.6824535925618215, 0.6827490962589877, 0.6830447830819463, 0.6833406531622178, 0.6836367066314251, 0.6839329436212932, 0.6842293642636496, 0.6845259686904246, 0.6848227570336507, 0.6851197294254636, 0.6854168859981015, 0.6857142268839052, 0.686011752215319, 0.6863094621248897, 0.6866073567452678, 0.6869054362092066, 0.687203700649563, 0.6875021501992968, 0.6878007849914716, 0.6880996051592544, 0.688398610835916, 0.688697802154831, 0.6889971792494776, 0.6892967422534375, 0.6895964913003972, 0.6898964265241467, 0.6901965480585802, 0.6904968560376963, 0.6907973505955977, 0.6910980318664918, 0.6913988999846898, 0.6916999550846085, 0.6920011973007685, 0.6923026267677955, 0.69260424362042, 0.6929060479934773, 0.6932080400219077, 0.6935102198407567, 0.693812587585175, 0.6941151433904182, 0.6944178873918477, 0.69472081972493, 0.6950239405252372, 0.6953272499284472, 0.6956307480703431, 0.6959344350868143, 0.6962383111138558, 0.6965423762875684, 0.6968466307441594, 0.6971510746199414, 0.6974557080513343, 0.6977605311748634, 0.6980655441271606, 0.6983707470449646, 0.6986761400651201, 0.698981723324579, 0.6992874969603994, 0.6995934611097465, 0.6998996159098926, 0.7002059614982165, 0.7005124980122045, 0.7008192255894498, 0.7011261443676529, 0.7014332544846216, 0.7017405560782715, 0.702048049286625, 0.702355734247813, 0.7026636111000732, 0.7029716799817517, 0.7032799410313021, 0.7035883943872863, 0.7038970401883737, 0.7042058785733426, 0.7045149096810789, 0.7048241336505768, 0.7051335506209395, 0.705443160731378, 0.7057529641212122, 0.7060629609298706, 0.7063731512968907, 0.7066835353619185, 0.706994113264709, 0.707304885145126, 0.7076158511431432, 0.7079270113988425, 0.7082383660524159, 0.7085499152441642, 0.7088616591144982, 0.7091735978039376, 0.7094857314531124, 0.7097980602027618, 0.7101105841937354, 0.7104233035669919, 0.7107362184636009, 0.7110493290247416, 0.7113626353917036, 0.7116761377058862, 0.7119898361087998, 0.7123037307420651, 0.7126178217474128, 0.7129321092666854, 0.7132465934418346, 0.713561274414924, 0.7138761523281281, 0.7141912273237316, 0.7145064995441311, 0.7148219691318343, 0.7151376362294596, 0.7154535009797371, 0.7157695635255088, 0.7160858240097274, 0.7164022825754579, 0.7167189393658768, 0.7170357945242725, 0.717352848194045, 0.7176701005187067, 0.7179875516418821, 0.7183052017073075, 0.7186230508588317, 0.718941099240416, 0.7192593469961341, 0.7195777942701723, 0.7198964412068293, 0.7202152879505165, 0.7205343346457588, 0.7208535814371932, 0.7211730284695702, 0.7214926758877537, 0.7218125238367196, 0.7221325724615586, 0.722452821907474, 0.7227732723197822, 0.7230939238439141, 0.7234147766254139, 0.7237358308099392, 0.7240570865432618, 0.7243785439712674, 0.7247002032399561, 0.7250220644954413, 0.7253441278839513, 0.7256663935518286, 0.72598886164553, 0.7263115323116268, 0.7266344056968052, 0.7269574819478655, 0.7272807612117234, 0.7276042436354093, 0.7279279293660684, 0.7282518185509611, 0.7285759113374634, 0.7289002078730654, 0.7292247083053739, 0.7295494127821104, 0.7298743214511119, 0.7301994344603318, 0.730524751957838, 0.7308502740918155, 0.7311760010105643, 0.7315019328625011, 0.7318280697961582, 0.7321544119601843, 0.7324809595033445, 0.7328077125745204, 0.7331346713227095, 0.7334618358970268, 0.7337892064467032, 0.734116783121087, 0.7344445660696428, 0.7347725554419526, 0.7351007513877157, 0.7354291540567476, 0.7357577635989822, 0.7360865801644699, 0.7364156039033792, 0.736744834965996, 0.7370742735027231, 0.7374039196640825, 0.7377337736007125, 0.7380638354633706, 0.7383941054029316, 0.7387245835703886, 0.7390552701168531, 0.7393861651935549, 0.739717268951842, 0.7400485815431811, 0.7403801031191575, 0.7407118338314754, 0.7410437738319574, 0.7413759232725453, 0.7417082823053, 0.7420408510824011, 0.742373629756148, 0.7427066184789591, 0.743039817403372, 0.7433732266820441, 0.7437068464677521, 0.744040676913393, 0.7443747181719831, 0.7447089703966585, 0.7450434337406756, 0.7453781083574109, 0.7457129944003608, 0.7460480920231423, 0.7463834013794927, 0.7467189226232694, 0.7470546559084511, 0.747390601389137, 0.7477267592195465, 0.7480631295540204, 0.7483997125470203, 0.7487365083531292, 0.749073517127051, 0.7494107390236109, 0.7497481741977554, 0.7500858228045527, 0.7504236849991924, 0.7507617609369861, 0.7511000507733666, 0.7514385546638891, 0.7517772727642306, 0.7521162052301902, 0.7524553522176892, 0.752794713882771, 0.7531342903816016, 0.7534740818704696, 0.7538140885057858, 0.754154310444084, 0.7544947478420208, 0.7548354008563752, 0.7551762696440498, 0.7555173543620702, 0.7558586551675848, 0.7562001722178656, 0.7565419056703079, 0.7568838556824306, 0.757226022411876, 0.7575684060164102, 0.7579110066539234, 0.7582538244824291, 0.7585968596600652, 0.7589401123450938, 0.7592835826959009, 0.7596272708709968, 0.7599711770290167, 0.7603153013287195, 0.7606596439289898, 0.7610042049888357, 0.7613489846673911, 0.7616939831239145, 0.7620392005177891, 0.7623846370085237, 0.762730292755752, 0.7630761679192335, 0.7634222626588526, 0.7637685771346192, 0.7641151115066696, 0.7644618659352651, 0.7648088405807932, 0.7651560356037672, 0.7655034511648264, 0.7658510874247368, 0.76619894454439, 0.766547022684804, 0.7668953220071241, 0.767243842672621, 0.7675925848426929, 0.7679415486788645, 0.7682907343427877, 0.7686401419962408, 0.7689897718011297, 0.7693396239194875, 0.7696896985134744, 0.7700399957453776, 0.770390515777613, 0.7707412587727231, 0.7710922248933784, 0.7714434143023774, 0.7717948271626464, 0.7721464636372396, 0.7724983238893398, 0.7728504080822578, 0.7732027163794325, 0.7735552489444316, 0.7739080059409514, 0.7742609875328166, 0.774614193883981, 0.7749676251585271, 0.7753212815206664, 0.7756751631347395, 0.7760292701652162, 0.776383602776696, 0.7767381611339073, 0.7770929454017081, 0.7774479557450863, 0.7778031923291593, 0.7781586553191748, 0.7785143448805094, 0.7788702611786713, 0.7792264043792976, 0.779582774648156, 0.779939372151145, 0.7802961970542931, 0.7806532495237598, 0.781010529725835, 0.7813680378269395, 0.7817257739936252, 0.7820837383925745, 0.7824419311906019, 0.782800352554652, 0.7831590026518016, 0.7835178816492588, 0.7838769897143631, 0.7842363270145856, 0.7845958937175291, 0.7849556899909291, 0.7853157160026524, 0.7856759719206976, 0.7860364579131963, 0.7863971741484124, 0.7867581207947412, 0.787119298020712, 0.7874807059949855, 0.7878423448863564, 0.7882042148637508, 0.7885663160962292, 0.7889286487529844, 0.7892912130033425, 0.7896540090167632, 0.7900170369628392, 0.7903802970112975, 0.7907437893319975, 0.7911075140949337, 0.7914714714702334, 0.7918356616281587, 0.7922000847391052, 0.7925647409736032, 0.7929296305023166, 0.7932947534960444, 0.7936601101257196, 0.7940257005624108, 0.7943915249773201, 0.7947575835417853, 0.7951238764272788, 0.7954904038054083, 0.7958571658479162, 0.7962241627266814, 0.796591394613717, 0.7969588616811718, 0.7973265641013311, 0.7976945020466149, 0.7980626756895797, 0.7984310852029177, 0.7987997307594579, 0.7991686125321641, 0.7995377306941377, 0.799907085418616, 0.8002766768789729, 0.8006465052487189, 0.8010165707015016, 0.8013868734111046, 0.8017574135514501, 0.8021281912965956, 0.8024992068207367, 0.8028704602982069, 0.8032419519034757, 0.8036136818111514, 0.8039856501959798, 0.8043578572328436, 0.8047303030967644, 0.8051029879629017, 0.8054759120065524, 0.8058490754031524, 0.8062224783282756, 0.8065961209576346, 0.8069700034670801, 0.8073441260326022, 0.8077184888303293, 0.8080930920365287, 0.8084679358276071, 0.8088430203801104, 0.8092183458707232, 0.8095939124762699, 0.8099697203737143, 0.8103457697401603, 0.8107220607528504, 0.8110985935891684, 0.8114753684266363, 0.8118523854429179, 0.8122296448158167, 0.8126071467232757, 0.8129848913433791, 0.8133628788543517, 0.8137411094345582, 0.8141195832625053, 0.8144983005168395, 0.8148772613763484, 0.8152564660199613, 0.8156359146267487, 0.8160156073759217, 0.8163955444468337, 0.8167757260189794, 0.8171561522719951, 0.8175368233856589, 0.817917739539891, 0.8182989009147538, 0.8186803076904515, 0.8190619600473308, 0.8194438581658808, 0.8198260022267332, 0.8202083924106619, 0.8205910288985844, 0.8209739118715603, 0.8213570415107928, 0.8217404179976276, 0.8221240415135542, 0.822507912240205, 0.8228920303593563, 0.8232763960529277, 0.8236610095029827, 0.8240458708917283, 0.8244309804015157, 0.8248163382148402, 0.8252019445143416, 0.825587799482803, 0.8259739033031529, 0.8263602561584639, 0.8267468582319534, 0.8271337097069835, 0.8275208107670614, 0.8279081615958389, 0.8282957623771136, 0.8286836132948274, 0.8290717145330687, 0.8294600662760707, 0.8298486687082124, 0.8302375220140182, 0.8306266263781591, 0.8310159819854515, 0.8314055890208579, 0.8317954476694875, 0.8321855581165954, 0.8325759205475834, 0.832966535148, 0.8333574021035397, 0.8337485216000448, 0.8341398938235036, 0.8345315189600524, 0.834923397195974, 0.8353155287176991, 0.8357079137118052, 0.8361005523650178, 0.8364934448642101, 0.8368865913964028, 0.8372799921487646, 0.8376736473086126, 0.8380675570634118, 0.8384617216007753, 0.838856141108465, 0.8392508157743911, 0.8396457457866124, 0.8400409313333367, 0.8404363726029207, 0.8408320697838704, 0.8412280230648401, 0.8416242326346339, 0.8420206986822052, 0.8424174213966577, 0.8428144009672434, 0.843211637583365, 0.8436091314345748, 0.8440068827105753, 0.8444048916012187, 0.844803158296508, 0.8452016829865963, 0.845600465861787, 0.845999507112535, 0.8463988069294454, 0.8467983655032734, 0.8471981830249269, 0.8475982596854632, 0.8479985956760925, 0.8483991911881754, 0.8488000464132235, 0.8492011615429019, 0.8496025367690256, 0.8500041722835627, 0.8504060682786323, 0.8508082249465063, 0.8512106424796095, 0.8516133210705171, 0.8520162609119593, 0.852419462196817, 0.8528229251181246, 0.8532266498690702, 0.8536306366429932, 0.8540348856333876, 0.8544393970339, 0.8548441710383307, 0.8552492078406336, 0.8556545076349154, 0.8560600706154382, 0.8564658969766165, 0.8568719869130196, 0.8572783406193709, 0.8576849582905478, 0.8580918401215826, 0.8584989863076621, 0.8589063970441269, 0.859314072526474, 0.8597220129503534, 0.8601302185115722, 0.860538689406091, 0.8609474258300269, 0.8613564279796521, 0.8617656960513935, 0.8621752302418351, 0.8625850307477161, 0.862995097765932, 0.8634054314935331, 0.8638160321277277, 0.8642268998658799, 0.8646380349055093, 0.8650494374442937, 0.8654611076800662, 0.8658730458108177, 0.8662852520346958, 0.8666977265500054, 0.8671104695552083, 0.8675234812489239, 0.8679367618299295, 0.8683503114971594, 0.8687641304497064, 0.86917821888682, 0.8695925770079095, 0.8700072050125409, 0.8704221031004392, 0.8708372714714877, 0.8712527103257285, 0.871668419863362, 0.8720844002847474, 0.8725006517904038, 0.872917174581008, 0.8733339688573972, 0.873751034820567, 0.8741683726716735, 0.8745859826120321, 0.8750038648431171, 0.8754220195665636, 0.8758404469841669, 0.8762591472978821, 0.8766781207098239, 0.8770973674222686, 0.8775168876376527, 0.8779366815585726, 0.878356749387787, 0.878777091328214, 0.8791977075829341, 0.8796185983551881, 0.8800397638483785, 0.8804612042660694, 0.8808829198119863, 0.8813049106900169, 0.8817271771042101, 0.8821497192587776, 0.8825725373580924, 0.8829956316066907, 0.8834190022092705, 0.8838426493706926, 0.8842665732959804, 0.8846907741903204, 0.8851152522590617, 0.8855400077077168, 0.885965040741961, 0.886390351567634, 0.8868159403907376, 0.8872418074174383, 0.8876679528540662, 0.888094376907115, 0.8885210797832426, 0.8889480616892711, 0.8893753228321871, 0.8898028634191415, 0.8902306836574497, 0.890658783754592, 0.8910871639182136, 0.8915158243561244, 0.8919447652763004, 0.8923739868868811, 0.8928034893961735, 0.8932332730126487, 0.8936633379449436, 0.8940936844018623, 0.8945243125923729, 0.8949552227256111, 0.8953864150108785, 0.895817889657642, 0.8962496468755369, 0.8966816868743637, 0.8971140098640904, 0.8975466160548519, 0.8979795056569494, 0.8984126788808527, 0.8988461359371979, 0.8992798770367885, 0.8997139023905965, 0.9001482122097612, 0.9005828067055895, 0.9010176860895563, 0.901452850573306, 0.90188830036865, 0.9023240356875681, 0.9027600567422099, 0.9031963637448925, 0.9036329569081025, 0.9040698364444953, 0.904507002566896, 0.9049444554882983, 0.9053821954218654, 0.9058202225809308, 0.9062585371789972, 0.906697139429737, 0.9071360295469932, 0.9075752077447785, 0.9080146742372761, 0.9084544292388393, 0.9088944729639925, 0.9093348056274307, 0.9097754274440192, 0.9102163386287951, 0.9106575393969659, 0.9110990299639116, 0.911540810545182, 0.9119828813564991, 0.9124252426137577, 0.912867894533023, 0.9133108373305332, 0.9137540712226976, 0.9141975964260988, 0.914641413157491, 0.9150855216338023, 0.9155299220721318, 0.9159746146897525, 0.9164195997041105, 0.9168648773328241, 0.9173104477936861, 0.9177563113046622, 0.9182024680838914, 0.9186489183496864, 0.9190956623205346, 0.9195427002150969, 0.9199900322522082, 0.9204376586508777, 0.9208855796302888, 0.9213337954098006, 0.921782306208946, 0.9222311122474327, 0.9226802137451442, 0.9231296109221385, 0.9235793039986488, 0.9240292931950841, 0.9244795787320296, 0.9249301608302455, 0.9253810397106675, 0.9258322155944084, 0.9262836887027569, 0.9267354592571773, 0.9271875274793112, 0.9276398935909768, 0.9280925578141684, 0.928545520371058, 0.9289987814839944, 0.9294523413755036, 0.9299062002682889, 0.930360358385231, 0.9308148159493889, 0.9312695731839987, 0.9317246303124745, 0.932179987558409, 0.9326356451455734, 0.933091603297916, 0.9335478622395647, 0.9340044221948265, 0.9344612833881855, 0.9349184460443069, 0.9353759103880335, 0.9358336766443881, 0.9362917450385732, 0.93675011579597, 0.9372087891421406, 0.9376677653028258, 0.9381270445039472, 0.9385866269716061, 0.9390465129320853, 0.9395067026118465, 0.9399671962375333, 0.9404279940359689, 0.940889096234159, 0.9413505030592887, 0.9418122147387258, 0.942274231500019, 0.9427365535708978, 0.9431991811792747, 0.9436621145532428, 0.9441253539210781, 0.9445888995112387, 0.9450527515523645, 0.9455169102732778, 0.9459813759029844, 0.946446148670672, 0.9469112288057114, 0.9473766165376571, 0.9478423120962457, 0.9483083157113981, 0.948774627613218, 0.9492412480319936, 0.9497081771981963, 0.9501754153424817, 0.9506429626956894, 0.9511108194888438, 0.9515789859531527, 0.9520474623200098, 0.9525162488209925, 0.9529853456878634, 0.9534547531525706, 0.9539244714472471, 0.954394500804211, 0.9548648414559661, 0.9553354936352016, 0.9558064575747934, 0.9562777335078035, 0.9567493216674777, 0.957221222287251, 0.957693435600743, 0.9581659618417611, 0.9586388012442981, 0.9591119540425356, 0.9595854204708398, 0.960059200763767, 0.960533295156058, 0.9610077038826437, 0.9614824271786401, 0.9619574652793539, 0.9624328184202776, 0.9629084868370928, 0.9633844707656696, 0.9638607704420656, 0.964337386102528, 0.9648143179834922, 0.9652915663215834, 0.9657691313536149, 0.9662470133165895, 0.9667252124476998, 0.9672037289843278, 0.9676825631640458, 0.9681617152246145, 0.9686411854039855, 0.9691209739403016, 0.969601081071894, 0.9700815070372866, 0.9705622520751922, 0.9710433164245152, 0.9715247003243511, 0.9720064040139859, 0.9724884277328976, 0.9729707717207559, 0.9734534362174213, 0.9739364214629471, 0.9744197276975773, 0.9749033551617492, 0.9753873040960918, 0.9758715747414265, 0.9763561673387674, 0.9768410821293223, 0.9773263193544899, 0.9778118792558635, 0.9782977620752296, 0.9787839680545678, 0.9792704974360505, 0.9797573504620455, 0.9802445273751129, 0.9807320284180082, 0.98121985383368, 0.9817080038652717, 0.9821964787561216, 0.9826852787497621, 0.9831744040899209, 0.9836638550205202, 0.9841536317856783, 0.984643734629708, 0.9851341637971179, 0.9856249195326124, 0.9861160020810913, 0.9866074116876511, 0.9870991485975843, 0.9875912130563793, 0.9880836053097211, 0.9885763256034915, 0.9890693741837693, 0.9895627512968299, 0.9900564571891463, 0.9905504921073885, 0.991044856298424, 0.991539550009318, 0.9920345734873335, 0.9925299269799317, 0.9930256107347711, 0.9935216249997101, 0.9940179700228037, 0.994514646052307, 0.9950116533366726, 0.9955089921245539, 0.9960066626648015, 0.9965046652064669, 0.9970029999987994, 0.9975016672912493, 0.9980006673334666, 0.9985000003752998, 0.9989996666668004, 0.9994996664582168, 1.0]}
},{}],62:[function(require,module,exports){
module.exports={"x": [5.551115123125783e-17, 0.0010010010010010565, 0.0020020020020020575, 0.0030030030030030585, 0.0040040040040040595, 0.0050050050050050605, 0.0060060060060060615, 0.0070070070070070625, 0.008008008008008063, 0.009009009009009064, 0.010010010010010065, 0.011011011011011066, 0.012012012012012067, 0.013013013013013068, 0.01401401401401407, 0.01501501501501507, 0.01601601601601607, 0.01701701701701707, 0.018018018018018073, 0.019019019019019076, 0.020020020020020075, 0.021021021021021075, 0.022022022022022077, 0.02302302302302308, 0.02402402402402408, 0.02502502502502508, 0.02602602602602608, 0.027027027027027084, 0.028028028028028083, 0.029029029029029083, 0.030030030030030085, 0.031031031031031088, 0.03203203203203209, 0.033033033033033087, 0.034034034034034086, 0.03503503503503509, 0.03603603603603609, 0.03703703703703709, 0.0380380380380381, 0.039039039039039096, 0.040040040040040095, 0.041041041041041094, 0.042042042042042094, 0.0430430430430431, 0.0440440440440441, 0.0450450450450451, 0.046046046046046105, 0.047047047047047104, 0.0480480480480481, 0.0490490490490491, 0.0500500500500501, 0.05105105105105111, 0.05205205205205211, 0.053053053053053106, 0.05405405405405411, 0.05505505505505511, 0.05605605605605611, 0.05705705705705711, 0.05805805805805811, 0.059059059059059116, 0.060060060060060115, 0.061061061061061114, 0.06206206206206212, 0.06306306306306311, 0.06406406406406412, 0.06506506506506513, 0.06606606606606612, 0.06706706706706712, 0.06806806806806812, 0.06906906906906912, 0.07007007007007013, 0.07107107107107112, 0.07207207207207213, 0.07307307307307313, 0.07407407407407413, 0.07507507507507513, 0.07607607607607614, 0.07707707707707713, 0.07807807807807814, 0.07907907907907913, 0.08008008008008013, 0.08108108108108114, 0.08208208208208213, 0.08308308308308314, 0.08408408408408413, 0.08508508508508514, 0.08608608608608614, 0.08708708708708714, 0.08808808808808814, 0.08908908908908915, 0.09009009009009014, 0.09109109109109115, 0.09209209209209215, 0.09309309309309315, 0.09409409409409415, 0.09509509509509514, 0.09609609609609615, 0.09709709709709716, 0.09809809809809815, 0.09909909909909916, 0.10010010010010015, 0.10110110110110115, 0.10210210210210216, 0.10310310310310315, 0.10410410410410416, 0.10510510510510516, 0.10610610610610616, 0.10710710710710716, 0.10810810810810817, 0.10910910910910916, 0.11011011011011017, 0.11111111111111116, 0.11211211211211217, 0.11311311311311317, 0.11411411411411417, 0.11511511511511517, 0.11611611611611616, 0.11711711711711717, 0.11811811811811818, 0.11911911911911917, 0.12012012012012017, 0.12112112112112118, 0.12212212212212217, 0.12312312312312318, 0.12412412412412419, 0.1251251251251252, 0.12612612612612617, 0.12712712712712718, 0.12812812812812818, 0.1291291291291292, 0.1301301301301302, 0.13113113113113117, 0.13213213213213218, 0.13313313313313319, 0.1341341341341342, 0.1351351351351352, 0.13613613613613618, 0.13713713713713718, 0.1381381381381382, 0.1391391391391392, 0.1401401401401402, 0.1411411411411412, 0.14214214214214219, 0.1431431431431432, 0.1441441441441442, 0.1451451451451452, 0.1461461461461462, 0.1471471471471472, 0.1481481481481482, 0.1491491491491492, 0.1501501501501502, 0.15115115115115121, 0.15215215215215222, 0.1531531531531532, 0.1541541541541542, 0.1551551551551552, 0.15615615615615622, 0.15715715715715722, 0.1581581581581582, 0.1591591591591592, 0.16016016016016021, 0.16116116116116122, 0.16216216216216223, 0.1631631631631632, 0.1641641641641642, 0.16516516516516522, 0.16616616616616622, 0.16716716716716723, 0.1681681681681682, 0.16916916916916921, 0.17017017017017022, 0.17117117117117123, 0.17217217217217223, 0.17317317317317324, 0.17417417417417422, 0.17517517517517522, 0.17617617617617623, 0.17717717717717724, 0.17817817817817824, 0.17917917917917922, 0.18018018018018023, 0.18118118118118123, 0.18218218218218224, 0.18318318318318325, 0.18418418418418425, 0.18518518518518523, 0.18618618618618624, 0.18718718718718724, 0.18818818818818825, 0.18918918918918926, 0.19019019019019023, 0.19119119119119124, 0.19219219219219225, 0.19319319319319325, 0.19419419419419426, 0.19519519519519524, 0.19619619619619624, 0.19719719719719725, 0.19819819819819826, 0.19919919919919926, 0.20020020020020024, 0.20120120120120125, 0.20220220220220225, 0.20320320320320326, 0.20420420420420426, 0.20520520520520527, 0.20620620620620625, 0.20720720720720726, 0.20820820820820826, 0.20920920920920927, 0.21021021021021027, 0.21121121121121125, 0.21221221221221226, 0.21321321321321327, 0.21421421421421427, 0.21521521521521528, 0.21621621621621628, 0.21721721721721726, 0.21821821821821827, 0.21921921921921927, 0.22022022022022028, 0.2212212212212213, 0.22222222222222227, 0.22322322322322327, 0.22422422422422428, 0.22522522522522528, 0.2262262262262263, 0.22722722722722727, 0.22822822822822827, 0.22922922922922928, 0.2302302302302303, 0.2312312312312313, 0.23223223223223227, 0.23323323323323328, 0.23423423423423428, 0.2352352352352353, 0.2362362362362363, 0.2372372372372373, 0.23823823823823828, 0.2392392392392393, 0.2402402402402403, 0.2412412412412413, 0.2422422422422423, 0.24324324324324328, 0.2442442442442443, 0.2452452452452453, 0.2462462462462463, 0.2472472472472473, 0.24824824824824832, 0.2492492492492493, 0.25025025025025033, 0.2512512512512513, 0.2522522522522523, 0.2532532532532533, 0.2542542542542543, 0.25525525525525533, 0.2562562562562563, 0.2572572572572573, 0.2582582582582583, 0.2592592592592593, 0.26026026026026033, 0.2612612612612613, 0.2622622622622623, 0.2632632632632633, 0.2642642642642643, 0.26526526526526534, 0.2662662662662663, 0.2672672672672673, 0.26826826826826833, 0.2692692692692693, 0.27027027027027034, 0.2712712712712713, 0.2722722722722723, 0.27327327327327333, 0.2742742742742743, 0.27527527527527534, 0.2762762762762763, 0.27727727727727736, 0.27827827827827833, 0.2792792792792793, 0.28028028028028035, 0.2812812812812813, 0.28228228228228236, 0.28328328328328334, 0.2842842842842843, 0.28528528528528535, 0.28628628628628633, 0.28728728728728736, 0.28828828828828834, 0.2892892892892893, 0.29029029029029035, 0.29129129129129133, 0.29229229229229237, 0.29329329329329334, 0.2942942942942943, 0.29529529529529536, 0.29629629629629634, 0.29729729729729737, 0.29829829829829835, 0.2992992992992993, 0.30030030030030036, 0.30130130130130134, 0.3023023023023024, 0.30330330330330335, 0.3043043043043044, 0.30530530530530536, 0.30630630630630634, 0.3073073073073074, 0.30830830830830835, 0.3093093093093094, 0.31031031031031037, 0.31131131131131135, 0.3123123123123124, 0.31331331331331336, 0.3143143143143144, 0.31531531531531537, 0.31631631631631635, 0.3173173173173174, 0.31831831831831836, 0.3193193193193194, 0.3203203203203204, 0.32132132132132135, 0.3223223223223224, 0.32332332332332336, 0.3243243243243244, 0.3253253253253254, 0.32632632632632635, 0.3273273273273274, 0.32832832832832837, 0.3293293293293294, 0.3303303303303304, 0.33133133133133136, 0.3323323323323324, 0.33333333333333337, 0.3343343343343344, 0.3353353353353354, 0.33633633633633636, 0.3373373373373374, 0.3383383383383384, 0.3393393393393394, 0.3403403403403404, 0.3413413413413414, 0.3423423423423424, 0.3433433433433434, 0.3443443443443444, 0.3453453453453454, 0.3463463463463464, 0.3473473473473474, 0.3483483483483484, 0.3493493493493494, 0.3503503503503504, 0.3513513513513514, 0.3523523523523524, 0.3533533533533534, 0.3543543543543544, 0.3553553553553554, 0.35635635635635643, 0.3573573573573574, 0.3583583583583584, 0.3593593593593594, 0.3603603603603604, 0.36136136136136143, 0.3623623623623624, 0.3633633633633634, 0.3643643643643644, 0.3653653653653654, 0.36636636636636644, 0.3673673673673674, 0.36836836836836845, 0.3693693693693694, 0.3703703703703704, 0.37137137137137144, 0.3723723723723724, 0.37337337337337345, 0.37437437437437443, 0.3753753753753754, 0.37637637637637644, 0.3773773773773774, 0.37837837837837845, 0.37937937937937943, 0.3803803803803804, 0.38138138138138145, 0.3823823823823824, 0.38338338338338346, 0.38438438438438444, 0.3853853853853854, 0.38638638638638645, 0.3873873873873874, 0.38838838838838846, 0.38938938938938944, 0.3903903903903904, 0.39139139139139145, 0.39239239239239243, 0.39339339339339346, 0.39439439439439444, 0.3953953953953954, 0.39639639639639646, 0.39739739739739743, 0.39839839839839847, 0.39939939939939945, 0.4004004004004004, 0.40140140140140146, 0.40240240240240244, 0.40340340340340347, 0.40440440440440445, 0.4054054054054055, 0.40640640640640646, 0.40740740740740744, 0.4084084084084085, 0.40940940940940945, 0.4104104104104105, 0.41141141141141147, 0.41241241241241244, 0.4134134134134135, 0.41441441441441446, 0.4154154154154155, 0.41641641641641647, 0.41741741741741745, 0.4184184184184185, 0.41941941941941946, 0.4204204204204205, 0.42142142142142147, 0.42242242242242245, 0.4234234234234235, 0.42442442442442446, 0.4254254254254255, 0.4264264264264265, 0.42742742742742745, 0.4284284284284285, 0.42942942942942947, 0.4304304304304305, 0.4314314314314315, 0.4324324324324325, 0.4334334334334335, 0.43443443443443447, 0.4354354354354355, 0.4364364364364365, 0.4374374374374375, 0.4384384384384385, 0.43943943943943947, 0.4404404404404405, 0.4414414414414415, 0.4424424424424425, 0.4434434434434435, 0.4444444444444445, 0.4454454454454455, 0.4464464464464465, 0.4474474474474475, 0.4484484484484485, 0.4494494494494495, 0.4504504504504505, 0.4514514514514515, 0.4524524524524525, 0.4534534534534535, 0.4544544544544545, 0.4554554554554555, 0.4564564564564565, 0.45745745745745753, 0.4584584584584585, 0.4594594594594595, 0.4604604604604605, 0.4614614614614615, 0.46246246246246253, 0.4634634634634635, 0.4644644644644645, 0.4654654654654655, 0.4664664664664665, 0.46746746746746753, 0.4684684684684685, 0.46946946946946955, 0.4704704704704705, 0.4714714714714715, 0.47247247247247254, 0.4734734734734735, 0.47447447447447455, 0.47547547547547553, 0.4764764764764765, 0.47747747747747754, 0.4784784784784785, 0.47947947947947955, 0.48048048048048053, 0.4814814814814815, 0.48248248248248254, 0.4834834834834835, 0.48448448448448456, 0.48548548548548554, 0.4864864864864865, 0.48748748748748755, 0.4884884884884885, 0.48948948948948956, 0.49049049049049054, 0.4914914914914915, 0.49249249249249255, 0.49349349349349353, 0.49449449449449456, 0.49549549549549554, 0.4964964964964966, 0.49749749749749755, 0.49849849849849853, 0.49949949949949957, 0.5005005005005005, 0.5015015015015016, 0.5025025025025025, 0.5035035035035036, 0.5045045045045045, 0.5055055055055055, 0.5065065065065066, 0.5075075075075075, 0.5085085085085086, 0.5095095095095095, 0.5105105105105106, 0.5115115115115116, 0.5125125125125125, 0.5135135135135136, 0.5145145145145145, 0.5155155155155156, 0.5165165165165166, 0.5175175175175175, 0.5185185185185186, 0.5195195195195195, 0.5205205205205206, 0.5215215215215216, 0.5225225225225225, 0.5235235235235236, 0.5245245245245245, 0.5255255255255256, 0.5265265265265267, 0.5275275275275275, 0.5285285285285286, 0.5295295295295295, 0.5305305305305306, 0.5315315315315317, 0.5325325325325325, 0.5335335335335336, 0.5345345345345345, 0.5355355355355356, 0.5365365365365367, 0.5375375375375375, 0.5385385385385386, 0.5395395395395395, 0.5405405405405406, 0.5415415415415417, 0.5425425425425425, 0.5435435435435436, 0.5445445445445445, 0.5455455455455456, 0.5465465465465467, 0.5475475475475475, 0.5485485485485486, 0.5495495495495497, 0.5505505505505506, 0.5515515515515517, 0.5525525525525525, 0.5535535535535536, 0.5545545545545547, 0.5555555555555556, 0.5565565565565567, 0.5575575575575575, 0.5585585585585586, 0.5595595595595597, 0.5605605605605606, 0.5615615615615617, 0.5625625625625625, 0.5635635635635636, 0.5645645645645647, 0.5655655655655656, 0.5665665665665667, 0.5675675675675675, 0.5685685685685686, 0.5695695695695697, 0.5705705705705706, 0.5715715715715717, 0.5725725725725725, 0.5735735735735736, 0.5745745745745747, 0.5755755755755756, 0.5765765765765767, 0.5775775775775776, 0.5785785785785786, 0.5795795795795797, 0.5805805805805806, 0.5815815815815817, 0.5825825825825826, 0.5835835835835836, 0.5845845845845847, 0.5855855855855856, 0.5865865865865867, 0.5875875875875876, 0.5885885885885886, 0.5895895895895897, 0.5905905905905906, 0.5915915915915917, 0.5925925925925926, 0.5935935935935936, 0.5945945945945947, 0.5955955955955956, 0.5965965965965967, 0.5975975975975976, 0.5985985985985987, 0.5995995995995997, 0.6006006006006006, 0.6016016016016017, 0.6026026026026026, 0.6036036036036037, 0.6046046046046047, 0.6056056056056056, 0.6066066066066067, 0.6076076076076076, 0.6086086086086087, 0.6096096096096097, 0.6106106106106106, 0.6116116116116117, 0.6126126126126126, 0.6136136136136137, 0.6146146146146148, 0.6156156156156156, 0.6166166166166167, 0.6176176176176176, 0.6186186186186187, 0.6196196196196198, 0.6206206206206206, 0.6216216216216217, 0.6226226226226226, 0.6236236236236237, 0.6246246246246248, 0.6256256256256256, 0.6266266266266267, 0.6276276276276276, 0.6286286286286287, 0.6296296296296298, 0.6306306306306306, 0.6316316316316317, 0.6326326326326326, 0.6336336336336337, 0.6346346346346348, 0.6356356356356356, 0.6366366366366367, 0.6376376376376376, 0.6386386386386387, 0.6396396396396398, 0.6406406406406406, 0.6416416416416417, 0.6426426426426426, 0.6436436436436437, 0.6446446446446448, 0.6456456456456456, 0.6466466466466467, 0.6476476476476476, 0.6486486486486487, 0.6496496496496498, 0.6506506506506506, 0.6516516516516517, 0.6526526526526526, 0.6536536536536537, 0.6546546546546548, 0.6556556556556556, 0.6566566566566567, 0.6576576576576576, 0.6586586586586587, 0.6596596596596598, 0.6606606606606606, 0.6616616616616617, 0.6626626626626626, 0.6636636636636637, 0.6646646646646648, 0.6656656656656657, 0.6666666666666667, 0.6676676676676676, 0.6686686686686687, 0.6696696696696698, 0.6706706706706707, 0.6716716716716717, 0.6726726726726726, 0.6736736736736737, 0.6746746746746748, 0.6756756756756757, 0.6766766766766767, 0.6776776776776778, 0.6786786786786787, 0.6796796796796798, 0.6806806806806807, 0.6816816816816818, 0.6826826826826828, 0.6836836836836837, 0.6846846846846848, 0.6856856856856857, 0.6866866866866868, 0.6876876876876878, 0.6886886886886887, 0.6896896896896898, 0.6906906906906907, 0.6916916916916918, 0.6926926926926928, 0.6936936936936937, 0.6946946946946948, 0.6956956956956957, 0.6966966966966968, 0.6976976976976978, 0.6986986986986987, 0.6996996996996998, 0.7007007007007007, 0.7017017017017018, 0.7027027027027029, 0.7037037037037037, 0.7047047047047048, 0.7057057057057057, 0.7067067067067068, 0.7077077077077079, 0.7087087087087087, 0.7097097097097098, 0.7107107107107107, 0.7117117117117118, 0.7127127127127129, 0.7137137137137137, 0.7147147147147148, 0.7157157157157157, 0.7167167167167168, 0.7177177177177179, 0.7187187187187187, 0.7197197197197198, 0.7207207207207207, 0.7217217217217218, 0.7227227227227229, 0.7237237237237237, 0.7247247247247248, 0.7257257257257257, 0.7267267267267268, 0.7277277277277279, 0.7287287287287287, 0.7297297297297298, 0.7307307307307307, 0.7317317317317318, 0.7327327327327329, 0.7337337337337337, 0.7347347347347348, 0.7357357357357357, 0.7367367367367368, 0.7377377377377379, 0.7387387387387387, 0.7397397397397398, 0.7407407407407407, 0.7417417417417418, 0.7427427427427429, 0.7437437437437437, 0.7447447447447448, 0.7457457457457457, 0.7467467467467468, 0.7477477477477479, 0.7487487487487487, 0.7497497497497498, 0.7507507507507507, 0.7517517517517518, 0.7527527527527529, 0.7537537537537538, 0.7547547547547548, 0.7557557557557557, 0.7567567567567568, 0.7577577577577579, 0.7587587587587588, 0.7597597597597598, 0.7607607607607607, 0.7617617617617618, 0.7627627627627629, 0.7637637637637638, 0.7647647647647648, 0.7657657657657657, 0.7667667667667668, 0.7677677677677679, 0.7687687687687688, 0.7697697697697699, 0.7707707707707707, 0.7717717717717718, 0.7727727727727729, 0.7737737737737738, 0.7747747747747749, 0.7757757757757757, 0.7767767767767768, 0.7777777777777779, 0.7787787787787788, 0.7797797797797799, 0.7807807807807807, 0.7817817817817818, 0.7827827827827829, 0.7837837837837838, 0.7847847847847849, 0.7857857857857857, 0.7867867867867868, 0.7877877877877879, 0.7887887887887888, 0.7897897897897899, 0.7907907907907907, 0.7917917917917918, 0.7927927927927929, 0.7937937937937938, 0.7947947947947949, 0.7957957957957957, 0.7967967967967968, 0.7977977977977979, 0.7987987987987988, 0.7997997997997999, 0.8008008008008007, 0.8018018018018018, 0.8028028028028029, 0.8038038038038038, 0.8048048048048049, 0.805805805805806, 0.8068068068068068, 0.8078078078078079, 0.8088088088088088, 0.8098098098098099, 0.810810810810811, 0.8118118118118118, 0.8128128128128129, 0.8138138138138138, 0.8148148148148149, 0.815815815815816, 0.8168168168168168, 0.8178178178178179, 0.8188188188188188, 0.8198198198198199, 0.820820820820821, 0.8218218218218218, 0.8228228228228229, 0.8238238238238238, 0.8248248248248249, 0.825825825825826, 0.8268268268268268, 0.8278278278278279, 0.8288288288288288, 0.8298298298298299, 0.830830830830831, 0.8318318318318318, 0.8328328328328329, 0.8338338338338338, 0.8348348348348349, 0.835835835835836, 0.8368368368368369, 0.8378378378378379, 0.8388388388388388, 0.8398398398398399, 0.840840840840841, 0.8418418418418419, 0.8428428428428429, 0.8438438438438438, 0.8448448448448449, 0.845845845845846, 0.8468468468468469, 0.847847847847848, 0.8488488488488488, 0.8498498498498499, 0.850850850850851, 0.8518518518518519, 0.852852852852853, 0.8538538538538538, 0.8548548548548549, 0.855855855855856, 0.8568568568568569, 0.857857857857858, 0.8588588588588588, 0.8598598598598599, 0.860860860860861, 0.8618618618618619, 0.862862862862863, 0.8638638638638638, 0.8648648648648649, 0.865865865865866, 0.8668668668668669, 0.867867867867868, 0.8688688688688688, 0.8698698698698699, 0.870870870870871, 0.8718718718718719, 0.872872872872873, 0.8738738738738738, 0.8748748748748749, 0.875875875875876, 0.8768768768768769, 0.877877877877878, 0.8788788788788788, 0.8798798798798799, 0.880880880880881, 0.8818818818818819, 0.882882882882883, 0.8838838838838838, 0.8848848848848849, 0.885885885885886, 0.8868868868868869, 0.887887887887888, 0.8888888888888888, 0.8898898898898899, 0.890890890890891, 0.8918918918918919, 0.892892892892893, 0.8938938938938938, 0.8948948948948949, 0.895895895895896, 0.8968968968968969, 0.897897897897898, 0.8988988988988988, 0.8998998998998999, 0.900900900900901, 0.9019019019019019, 0.902902902902903, 0.9039039039039038, 0.9049049049049049, 0.905905905905906, 0.9069069069069069, 0.907907907907908, 0.9089089089089089, 0.9099099099099099, 0.910910910910911, 0.9119119119119119, 0.912912912912913, 0.9139139139139139, 0.914914914914915, 0.915915915915916, 0.9169169169169169, 0.917917917917918, 0.9189189189189189, 0.91991991991992, 0.920920920920921, 0.9219219219219219, 0.922922922922923, 0.9239239239239239, 0.924924924924925, 0.925925925925926, 0.9269269269269269, 0.927927927927928, 0.9289289289289289, 0.92992992992993, 0.930930930930931, 0.9319319319319319, 0.932932932932933, 0.9339339339339341, 0.934934934934935, 0.935935935935936, 0.9369369369369369, 0.937937937937938, 0.9389389389389391, 0.93993993993994, 0.940940940940941, 0.9419419419419419, 0.942942942942943, 0.9439439439439441, 0.944944944944945, 0.945945945945946, 0.9469469469469469, 0.947947947947948, 0.9489489489489491, 0.94994994994995, 0.9509509509509511, 0.9519519519519519, 0.952952952952953, 0.9539539539539541, 0.954954954954955, 0.9559559559559561, 0.9569569569569569, 0.957957957957958, 0.9589589589589591, 0.95995995995996, 0.9609609609609611, 0.9619619619619619, 0.962962962962963, 0.9639639639639641, 0.964964964964965, 0.9659659659659661, 0.9669669669669669, 0.967967967967968, 0.9689689689689691, 0.96996996996997, 0.9709709709709711, 0.9719719719719719, 0.972972972972973, 0.9739739739739741, 0.974974974974975, 0.9759759759759761, 0.9769769769769769, 0.977977977977978, 0.9789789789789791, 0.97997997997998, 0.9809809809809811, 0.9819819819819819, 0.982982982982983, 0.9839839839839841, 0.984984984984985, 0.9859859859859861, 0.986986986986987, 0.987987987987988, 0.9889889889889891, 0.98998998998999, 0.9909909909909911, 0.991991991991992, 0.992992992992993, 0.9939939939939941, 0.994994994994995, 0.9959959959959961, 0.996996996996997, 0.997997997997998, 0.9989989989989991, 1.0], "expected": [1.0, 1.0005006675428016, 1.001001669337473, 1.0015030056350673, 1.002004676686839, 1.0025066827442424, 1.0030090240589353, 1.0035117008827759, 1.0040147134678241, 1.0045180620663432, 1.0050217469307958, 1.0055257683138508, 1.0060301264683758, 1.0065348216474432, 1.0070398541043275, 1.007545224092507, 1.0080509318656616, 1.0085569776776762, 1.0090633617826381, 1.0095700844348388, 1.0100771458887732, 1.010584546399141, 1.0110922862208451, 1.0116003656089936, 1.012108784818898, 1.0126175441060763, 1.0131266437262494, 1.0136360839353447, 1.0141458649894939, 1.0146559871450351, 1.01516645065851, 1.0156772557866685, 1.0161884027864643, 1.0166998919150587, 1.0172117234298181, 1.0177238975883163, 1.0182364146483325, 1.0187492748678537, 1.0192624785050737, 1.019776025818393, 1.0202899170664188, 1.0208041525079679, 1.0213187324020616, 1.0218336570079323, 1.0223489265850174, 1.0228645413929647, 1.0233805016916289, 1.0238968077410742, 1.0244134598015715, 1.024930458133604, 1.0254478029978609, 1.0259654946552412, 1.0264835333668543, 1.027001919394018, 1.0275206529982608, 1.02803973444132, 1.028559163985144, 1.0290789418918904, 1.0295990684239282, 1.0301195438438362, 1.0306403684144048, 1.0311615423986344, 1.0316830660597374, 1.032204939661137, 1.0327271634664674, 1.0332497377395757, 1.0337726627445196, 1.0342959387455692, 1.0348195660072075, 1.0353435447941288, 1.0358678753712403, 1.0363925580036621, 1.036917592956727, 1.0374429804959808, 1.037968720887183, 1.038494814396306, 1.039021261289536, 1.0395480618332729, 1.0400752162941307, 1.0406027249389371, 1.0411305880347357, 1.0416588058487815, 1.0421873786485474, 1.0427163067017189, 1.0432455902761983, 1.0437752296401017, 1.0443052250617615, 1.0448355768097246, 1.0453662851527552, 1.045897350359832, 1.0464287727001504, 1.046960552443122, 1.0474926898583756, 1.0480251852157556, 1.0485580387853235, 1.0490912508373584, 1.0496248216423556, 1.0501587514710287, 1.0506930405943087, 1.051227689283344, 1.0517626978095007, 1.0522980664443642, 1.0528337954597367, 1.0533698851276398, 1.0539063357203136, 1.054443147510217, 1.0549803207700277, 1.0555178557726428, 1.056055752791179, 1.056594012098972, 1.0571326339695781, 1.0576716186767727, 1.058210966494552, 1.058750677697132, 1.0592907525589492, 1.0598311913546612, 1.0603719943591465, 1.0609131618475038, 1.061454694095054, 1.0619965913773388, 1.062538853970122, 1.0630814821493888, 1.0636244761913463, 1.0641678363724243, 1.064711562969274, 1.0652556562587707, 1.0658001165180107, 1.066344944024314, 1.0668901390552241, 1.0674357018885072, 1.0679816328021527, 1.068527932074374, 1.069074599983609, 1.0696216368085187, 1.0701690428279884, 1.0707168183211286, 1.0712649635672735, 1.0718134788459819, 1.0723623644370388, 1.072911620620453, 1.07346124767646, 1.0740112458855193, 1.0745616155283173, 1.075112356885766, 1.0756634702390035, 1.0762149558693936, 1.0767668140585271, 1.0773190450882224, 1.077871649240523, 1.0784246267977, 1.0789779780422528, 1.079531703256907, 1.0800858027246156, 1.080640276728561, 1.0811951255521526, 1.0817503494790273, 1.0823059487930518, 1.08286192377832, 1.083418274719156, 1.0839750019001118, 1.0845321056059685, 1.0850895861217378, 1.085647443732659, 1.0862056787242023, 1.086764291382068, 1.0873232819921865, 1.0878826508407176, 1.0884423982140519, 1.089002524398812, 1.089563029681849, 1.0901239143502472, 1.0906851786913216, 1.0912468229926178, 1.0918088475419143, 1.09237125262722, 1.0929340385367776, 1.0934972055590606, 1.0940607539827754, 1.0946246840968612, 1.0951889961904901, 1.0957536905530667, 1.0963187674742287, 1.096884227243849, 1.097450070152032, 1.0980162964891165, 1.0985829065456747, 1.0991499006125154, 1.0997172789806788, 1.100285041941442, 1.1008531897863147, 1.1014217228070438, 1.10199064129561, 1.1025599455442294, 1.1031296358453542, 1.1036997124916723, 1.104270175776107, 1.1048410259918189, 1.105412263432203, 1.1059838883908935, 1.106555901161759, 1.1071283020389064, 1.1077010913166792, 1.108274269289658, 1.1088478362526624, 1.1094217925007477, 1.1099961383292085, 1.1105708740335773, 1.1111459999096247, 1.1117215162533602, 1.1122974233610319, 1.1128737215291267, 1.1134504110543701, 1.1140274922337285, 1.1146049653644075, 1.11518283074385, 1.115761088669742, 1.116339739440008, 1.116918783352814, 1.1174982207065651, 1.118078051799908, 1.1186582769317306, 1.1192388964011608, 1.1198199105075697, 1.1204013195505682, 1.1209831238300099, 1.1215653236459908, 1.1221479192988473, 1.1227309110891603, 1.1233142993177518, 1.123898084285687, 1.1244822662942748, 1.1250668456450665, 1.1256518226398562, 1.1262371975806837, 1.1268229707698303, 1.1274091425098227, 1.1279957131034313, 1.1285826828536714, 1.129170052063802, 1.1297578210373278, 1.1303459900779984, 1.1309345594898081, 1.1315235295769972, 1.1321129006440516, 1.1327026729957028, 1.1332928469369286, 1.133883422772953, 1.1344744008092464, 1.1350657813515261, 1.1356575647057556, 1.1362497511781464, 1.136842341075157, 1.137435334703494, 1.13802873237011, 1.1386225343822067, 1.1392167410472347, 1.1398113526728915, 1.1404063695671238, 1.1410017920381272, 1.141597620394346, 1.142193854944474, 1.1427904959974535, 1.143387543862478, 1.1439849988489892, 1.1445828612666797, 1.1451811314254923, 1.1457798096356202, 1.1463788962075068, 1.1469783914518468, 1.1475782956795857, 1.1481786092019206, 1.1487793323303, 1.1493804653764241, 1.1499820086522452, 1.1505839624699672, 1.1511863271420455, 1.1517891029811915, 1.1523922903003654, 1.1529958894127827, 1.153599900631911, 1.1542043242714721, 1.1548091606454407, 1.1554144100680455, 1.1560200728537702, 1.156626149317351, 1.15723263977378, 1.1578395445383038, 1.1584468639264232, 1.1590545982538945, 1.1596627478367296, 1.1602713129911952, 1.160880294033814, 1.1614896912813661, 1.1620995050508856, 1.162709735659664, 1.1633203834252497, 1.1639314486654477, 1.1645429316983196, 1.1651548328421846, 1.1657671524156195, 1.1663798907374587, 1.166993048126795, 1.1676066249029782, 1.1682206213856166, 1.1688350378945787, 1.16944987474999, 1.1700651322722353, 1.1706808107819593, 1.1712969106000657, 1.1719134320477183, 1.1725303754463394, 1.173147741117613, 1.1737655293834823, 1.1743837405661521, 1.1750023749880871, 1.175621432972013, 1.176240914840917, 1.1768608209180476, 1.1774811515269141, 1.1781019069912897, 1.178723087635207, 1.1793446937829637, 1.1799667257591173, 1.18058918388849, 1.1812120684961664, 1.181835379907493, 1.1824591184480817, 1.1830832844438066, 1.183707878220807, 1.184332900105484, 1.1849583504245054, 1.185584229504802, 1.186210537673569, 1.1868372752582688, 1.187464442586626, 1.188092039986633, 1.1887200677865462, 1.1893485263148886, 1.1899774159004497, 1.1906067368722837, 1.1912364895597127, 1.1918666742923256, 1.192497291399977, 1.1931283412127898, 1.1937598240611542, 1.1943917402757267, 1.1950240901874343, 1.1956568741274693, 1.196290092427294, 1.1969237454186383, 1.1975578334335015, 1.1981923568041517, 1.1988273158631264, 1.1994627109432316, 1.2000985423775443, 1.2007348104994107, 1.2013715156424465, 1.202008658140539, 1.2026462383278447, 1.2032842565387927, 1.2039227131080812, 1.2045616083706812, 1.2052009426618342, 1.2058407163170533, 1.2064809296721242, 1.2071215830631044, 1.207762676826324, 1.2084042112983862, 1.2090461868161655, 1.2096886037168104, 1.2103314623377437, 1.2109747630166603, 1.2116185060915292, 1.2122626919005939, 1.212907320782371, 1.2135523930756538, 1.2141979091195076, 1.2148438692532741, 1.2154902738165707, 1.2161371231492886, 1.2167844175915958, 1.2174321574839355, 1.2180803431670286, 1.218728974981869, 1.2193780532697305, 1.2200275783721615, 1.220677550630989, 1.2213279703883164, 1.2219788379865244, 1.2226301537682722, 1.2232819180764953, 1.2239341312544099, 1.2245867936455086, 1.2252399055935634, 1.2258934674426252, 1.2265474795370233, 1.2272019422213676, 1.2278568558405474, 1.22851222073973, 1.2291680372643659, 1.2298243057601828, 1.2304810265731907, 1.2311382000496804, 1.231795826536222, 1.2324539063796704, 1.2331124399271571, 1.2337714275261, 1.2344308695241957, 1.2350907662694246, 1.235751118110049, 1.2364119253946138, 1.2370731884719472, 1.2377349076911606, 1.2383970834016476, 1.2390597159530876, 1.2397228056954412, 1.2403863529789558, 1.2410503581541608, 1.241714821571872, 1.2423797435831887, 1.2430451245394962, 1.243710964792464, 1.2443772646940492, 1.2450440245964918, 1.24571124485232, 1.2463789258143476, 1.247047067835675, 1.2477156712696886, 1.2483847364700635, 1.249054263790761, 1.2497242535860282, 1.250394706210403, 1.2510656220187093, 1.2517370013660598, 1.252408844607856, 1.2530811520997864, 1.2537539241978315, 1.2544271612582572, 1.255100863637622, 1.2557750316927725, 1.256449665780845, 1.2571247662592673, 1.2578003334857557, 1.2584763678183197, 1.2591528696152565, 1.2598298392351572, 1.2605072770369028, 1.2611851833796661, 1.261863558622912, 1.262542403126398, 1.2632217172501727, 1.2639015013545782, 1.2645817558002495, 1.2652624809481146, 1.265943677159394, 1.2666253447956028, 1.26730748421855, 1.267990095790338, 1.2686731798733637, 1.2693567368303187, 1.2700407670241898, 1.270725270818259, 1.2714102485761025, 1.2720957006615923, 1.272781627438897, 1.273468029272482, 1.2741549065271067, 1.2748422595678288, 1.275530088760002, 1.2762183944692786, 1.2769071770616056, 1.2775964369032302, 1.2782861743606952, 1.2789763898008444, 1.2796670835908157, 1.280358256098049, 1.2810499076902828, 1.2817420387355534, 1.2824346496021963, 1.2831277406588482, 1.2838213122744437, 1.2845153648182193, 1.2852098986597111, 1.2859049141687542, 1.2866004117154883, 1.2872963916703506, 1.2879928544040815, 1.2886898002877218, 1.2893872296926163, 1.2900851429904092, 1.29078354055305, 1.2914824227527877, 1.292181789962177, 1.292881642554074, 1.293581980901639, 1.2942828053783353, 1.294984116357931, 1.2956859142144974, 1.2963881993224116, 1.2970909720563535, 1.29779423279131, 1.298497981902571, 1.299202219765734, 1.2999069467567013, 1.3006121632516805, 1.301317869627186, 1.3020240662600395, 1.3027307535273684, 1.3034379318066074, 1.3041456014754977, 1.3048537629120907, 1.3055624164947421, 1.3062715626021177, 1.306981201613191, 1.3076913339072447, 1.3084019598638699, 1.3091130798629662, 1.3098246942847434, 1.310536803509721, 1.311249407918727, 1.3119625078929014, 1.3126761038136938, 1.3133901960628636, 1.314104785022483, 1.3148198710749333, 1.3155354546029085, 1.316251535989415, 1.3169681156177686, 1.3176851938716, 1.3184027711348512, 1.319120847791777, 1.3198394242269458, 1.3205585008252385, 1.32127807797185, 1.3219981560522884, 1.3227187354523773, 1.3234398165582535, 1.3241613997563682, 1.3248834854334883, 1.3256060739766957, 1.3263291657733876, 1.3270527612112766, 1.3277768606783915, 1.3285014645630773, 1.3292265732539956, 1.3299521871401248, 1.3306783066107597, 1.3314049320555128, 1.3321320638643146, 1.332859702427413, 1.3335878481353733, 1.334316501379081, 1.3350456625497382, 1.335775332038867, 1.336505510238309, 1.337236197540224, 1.3379673943370927, 1.3386991010217146, 1.3394313179872113, 1.3401640456270227, 1.3408972843349105, 1.3416310345049585, 1.3423652965315698, 1.3431000708094707, 1.3438353577337088, 1.3445711576996537, 1.3453074711029978, 1.3460442983397554, 1.346781639806265, 1.3475194958991878, 1.3482578670155076, 1.348996753552533, 1.349736155907897, 1.3504760744795559, 1.351216509665791, 1.351957461865209, 1.3526989314767413, 1.3534409188996437, 1.3541834245335, 1.3549264487782182, 1.3556699920340332, 1.3564140547015058, 1.357158637181525, 1.3579037398753058, 1.3586493631843903, 1.3593955075106487, 1.3601421732562797, 1.3608893608238093, 1.3616370706160923, 1.3623853030363122, 1.3631340584879814, 1.3638833373749422, 1.3646331401013656, 1.3653834670717535, 1.366134318690937, 1.3668856953640776, 1.3676375974966684, 1.368390025494533, 1.3691429797638255, 1.369896460711033, 1.3706504687429732, 1.371405004266797, 1.3721600676899863, 1.3729156594203569, 1.373671779866057, 1.3744284294355675, 1.3751856085377043, 1.3759433175816156, 1.376701556976784, 1.3774603271330272, 1.3782196284604973, 1.3789794613696806, 1.3797398262713987, 1.3805007235768096, 1.3812621536974066, 1.3820241170450187, 1.3827866140318115, 1.383549645070287, 1.3843132105732854, 1.385077310953982, 1.3858419466258907, 1.3866071180028634, 1.3873728254990896, 1.3881390695290974, 1.3889058505077536, 1.3896731688502628, 1.3904410249721706, 1.3912094192893607, 1.3919783522180575, 1.3927478241748248, 1.3935178355765667, 1.394288386840529, 1.3950594783842962, 1.3958311106257968, 1.3966032839832991, 1.3973759988754126, 1.398149255721091, 1.3989230549396283, 1.3996973969506628, 1.4004722821741744, 1.4012477110304868, 1.4020236839402673, 1.4028002013245273, 1.4035772636046218, 1.4043548712022502, 1.4051330245394564, 1.4059117240386305, 1.4066909701225068, 1.4074707632141648, 1.408251103737031, 1.409031992114877, 1.4098134287718223, 1.4105954141323316, 1.4113779486212168, 1.4121610326636385, 1.412944666685103, 1.4137288511114665, 1.4145135863689313, 1.4152988728840505, 1.416084711083724, 1.416871101395202, 1.417658044246084, 1.4184455400643181, 1.4192335892782035, 1.4200221923163898, 1.4208113496078763, 1.4216010615820138, 1.422391328668504, 1.4231821512974006, 1.4239735298991079, 1.4247654649043833, 1.425557956744337, 1.4263510058504298, 1.4271446126544778, 1.4279387775886492, 1.4287335010854654, 1.4295287835778028, 1.430324625498891, 1.4311210272823145, 1.4319179893620124, 1.4327155121722785, 1.4335135961477632, 1.4343122417234713, 1.4351114493347639, 1.4359112194173587, 1.4367115524073295, 1.437512448741107, 1.43831390885548, 1.4391159331875933, 1.4399185221749506, 1.4407216762554131, 1.441525395867201, 1.4423296814488924, 1.4431345334394243, 1.4439399522780947, 1.4447459384045591, 1.4455524922588339, 1.4463596142812951, 1.4471673049126805, 1.4479755645940873, 1.4487843937669744, 1.4495937928731635, 1.450403762354835, 1.451214302654533, 1.4520254142151656, 1.452837097480001, 1.4536493528926708, 1.4544621808971716, 1.455275581937862, 1.4560895564594643, 1.4569041049070657, 1.4577192277261177, 1.4585349253624378, 1.4593511982622058, 1.4601680468719702, 1.460985471638643, 1.461803473009503, 1.4626220514321957, 1.4634412073547325, 1.4642609412254919, 1.465081253493221, 1.4659021446070326, 1.4667236150164087, 1.4675456651711987, 1.4683682955216222, 1.4691915065182648, 1.4700152986120842, 1.4708396722544061, 1.471664627896926, 1.4724901659917098, 1.473316286991194, 1.4741429913481854, 1.4749702795158615, 1.4757981519477725, 1.4766266090978397, 1.4774556514203554, 1.4782852793699859, 1.4791154934017687, 1.4799462939711143, 1.480777681533808, 1.481609656546007, 1.4824422194642437, 1.4832753707454231, 1.4841091108468267, 1.484943440226109, 1.485778359341301, 1.4866138686508086, 1.4874499686134142, 1.4882866596882742, 1.489123942334924, 1.489961817013275, 1.490800284183615, 1.4916393443066092, 1.4924789978433017, 1.4933192452551134, 1.494160087003844, 1.4950015235516727, 1.495843555361156, 1.496686182895231, 1.497529406617214, 1.4983732269908017, 1.4992176444800704, 1.5000626595494782, 1.5009082726638616, 1.5017544842884418, 1.5026012948888188, 1.5034487049309762, 1.5042967148812794, 1.5051453252064757, 1.5059945363736957, 1.506844348850453, 1.5076947631046465, 1.508545779604556, 1.509397398818847, 1.5102496212165704, 1.51110244726716, 1.5119558774404362, 1.5128099122066048, 1.5136645520362568, 1.514519797400369, 1.5153756487703065, 1.5162321066178193, 1.5170891714150454, 1.5179468436345094, 1.5188051237491256, 1.5196640122321945, 1.5205235095574057, 1.5213836161988374, 1.5222443326309583, 1.5231056593286239, 1.5239675967670816, 1.5248301454219686, 1.5256933057693114, 1.5265570782855284, 1.5274214634474288, 1.5282864617322132, 1.5291520736174737, 1.5300182995811953, 1.5308851401017536, 1.5317525956579192, 1.5326206667288544, 1.5334893537941157, 1.5343586573336525, 1.5352285778278083, 1.536099115757323, 1.5369702716033282, 1.5378420458473527, 1.5387144389713208, 1.5395874514575507, 1.540461083788759, 1.541335336448058, 1.5422102099189547, 1.5430857046853568, 1.5439618212315669, 1.544838560042286, 1.5457159216026144, 1.5465939063980483, 1.547472514914485, 1.5483517476382203, 1.5492316050559496, 1.5501120876547676, 1.5509931959221688, 1.5518749303460502, 1.5527572914147074, 1.5536402796168387, 1.5545238954415428, 1.5554081393783208, 1.5562930119170768, 1.5571785135481155, 1.558064644762147, 1.558951406050282, 1.5598387979040367, 1.5607268208153309, 1.5616154752764873, 1.562504761780235, 1.5633946808197074, 1.5642852328884433, 1.5651764184803865, 1.566068238089887, 1.5669606922117016, 1.5678537813409945, 1.5687475059733342, 1.5696418666046996, 1.5705368637314754, 1.571432497850456, 1.5723287694588424, 1.5732256790542447, 1.5741232271346839, 1.5750214141985874, 1.575920240744796, 1.5768197072725578, 1.577719814281532, 1.57862056227179, 1.5795219517438128, 1.5804239831984934, 1.5813266571371372, 1.5822299740614612, 1.5831339344735955, 1.5840385388760827, 1.5849437877718795, 1.5858496816643548, 1.5867562210572932, 1.587663406454892, 1.5885712383617645, 1.5894797172829385, 1.5903888437238576, 1.59129861819038, 1.5922090411887824, 1.5931201132257542, 1.594031834808406, 1.5949442064442625, 1.5958572286412667, 1.59677090190778, 1.5976852267525812, 1.598600203684869, 1.5995158332142605, 1.6004321158507904, 1.6013490521049156, 1.6022666424875118, 1.6031848875098758, 1.6041037876837234, 1.6050233435211938, 1.605943555534846, 1.6068644242376613, 1.6077859501430436, 1.6087081337648192, 1.6096309756172362, 1.6105544762149675, 1.6114786360731088, 1.6124034557071802, 1.6133289356331257, 1.6142550763673136, 1.6151818784265384, 1.6161093423280195, 1.6170374685894016, 1.6179662577287566, 1.6188957102645813, 1.619825826715801, 1.6207566076017677, 1.6216880534422606, 1.622620164757487, 1.6235529420680825, 1.6244863858951126, 1.6254204967600694, 1.6263552751848764, 1.6272907216918866, 1.6282268368038824, 1.6291636210440774, 1.630101074936116, 1.6310391990040736, 1.6319779937724566, 1.632917459766205, 1.6338575975106897, 1.6347984075317155, 1.6357398903555194, 1.6366820465087715, 1.6376248765185772, 1.6385683809124743, 1.6395125602184373, 1.6404574149648739, 1.6414029456806274, 1.642349152894977, 1.6432960371376384, 1.6442435989387625, 1.645191838828939, 1.6461407573391929, 1.6470903550009868, 1.648040632346223, 1.6489915899072394, 1.6499432282168154, 1.6508955478081675, 1.6518485492149522, 1.6528022329712655, 1.6537565996116437, 1.6547116496710639, 1.6556673836849438, 1.6566238021891424, 1.6575809057199613, 1.658538694814142, 1.65949717000887, 1.6604563318417742, 1.661416180850924, 1.6623767175748356, 1.6633379425524666, 1.66429985632322, 1.6652624594269432, 1.6662257524039288, 1.6671897357949155, 1.668154410141086, 1.6691197759840706, 1.6700858338659463, 1.671052584329236, 1.6720200279169108, 1.6729881651723895, 1.673956996639538, 1.6749265228626715, 1.6758967443865547, 1.6768676617563998, 1.6778392755178706, 1.6788115862170787, 1.6797845944005882, 1.6807583006154128, 1.6817327054090174, 1.682707809329319, 1.6836836129246857, 1.684660116743939, 1.6856373213363516, 1.6866152272516515, 1.6875938350400173, 1.6885731452520838, 1.6895531584389392, 1.6905338751521257, 1.6915152959436424, 1.6924974213659414, 1.693480251971932, 1.6944637883149798, 1.695448030948906, 1.6964329804279896, 1.6974186373069675, 1.6984050021410322, 1.6993920754858363, 1.7003798578974898, 1.701368349932563, 1.7023575521480838, 1.7033474651015408, 1.7043380893508828, 1.705329425454518, 1.7063214739713164, 1.70731423546061, 1.7083077104821898, 1.7093018995963118, 1.7102968033636925, 1.7112924223455124, 1.7122887571034149, 1.7132858081995064, 1.7142835761963577, 1.7152820616570046, 1.716281265144947, 1.7172811872241505, 1.718281828459045]}
},{}],63:[function(require,module,exports){
module.exports={"x": [-5.551115123125783e-17, -5.5400017795359415e-17, -5.5288884359461e-17, -5.5177750923562586e-17, -5.506661748766417e-17, -5.4955484051765757e-17, -5.4844350615867345e-17, -5.473321717996893e-17, -5.4622083744070516e-17, -5.45109503081721e-17, -5.4399816872273687e-17, -5.4288683436375275e-17, -5.417755000047686e-17, -5.4066416564578446e-17, -5.395528312868003e-17, -5.3844149692781617e-17, -5.3733016256883205e-17, -5.362188282098479e-17, -5.3510749385086376e-17, -5.339961594918796e-17, -5.3288482513289546e-17, -5.3177349077391135e-17, -5.306621564149272e-17, -5.2955082205594306e-17, -5.284394876969589e-17, -5.2732815333797476e-17, -5.262168189789906e-17, -5.251054846200065e-17, -5.2399415026102235e-17, -5.228828159020382e-17, -5.2177148154305406e-17, -5.206601471840699e-17, -5.1954881282508577e-17, -5.1843747846610165e-17, -5.173261441071175e-17, -5.1621480974813336e-17, -5.151034753891492e-17, -5.1399214103016507e-17, -5.128808066711809e-17, -5.117694723121968e-17, -5.1065813795321266e-17, -5.095468035942285e-17, -5.0843546923524437e-17, -5.073241348762602e-17, -5.062128005172761e-17, -5.0510146615829196e-17, -5.039901317993078e-17, -5.0287879744032366e-17, -5.017674630813395e-17, -5.006561287223554e-17, -4.9954479436337126e-17, -4.984334600043871e-17, -4.9732212564540296e-17, -4.962107912864188e-17, -4.950994569274347e-17, -4.9398812256845055e-17, -4.928767882094664e-17, -4.9176545385048226e-17, -4.906541194914981e-17, -4.8954278513251397e-17, -4.8843145077352985e-17, -4.873201164145457e-17, -4.8620878205556156e-17, -4.850974476965774e-17, -4.8398611333759327e-17, -4.8287477897860915e-17, -4.81763444619625e-17, -4.8065211026064086e-17, -4.795407759016567e-17, -4.7842944154267257e-17, -4.7731810718368845e-17, -4.762067728247043e-17, -4.7509543846572016e-17, -4.73984104106736e-17, -4.7287276974775186e-17, -4.7176143538876775e-17, -4.706501010297836e-17, -4.6953876667079946e-17, -4.684274323118153e-17, -4.6731609795283116e-17, -4.6620476359384705e-17, -4.650934292348629e-17, -4.6398209487587875e-17, -4.628707605168946e-17, -4.6175942615791046e-17, -4.6064809179892635e-17, -4.5953675743994217e-17, -4.5842542308095805e-17, -4.573140887219739e-17, -4.5620275436298976e-17, -4.5509142000400564e-17, -4.5398008564502147e-17, -4.528687512860373e-17, -4.517574169270532e-17, -4.5064608256806906e-17, -4.4953474820908494e-17, -4.4842341385010077e-17, -4.473120794911166e-17, -4.462007451321325e-17, -4.4508941077314836e-17, -4.4397807641416424e-17, -4.4286674205518006e-17, -4.417554076961959e-17, -4.406440733372118e-17, -4.3953273897822766e-17, -4.384214046192435e-17, -4.3731007026025936e-17, -4.361987359012752e-17, -4.350874015422911e-17, -4.3397606718330695e-17, -4.328647328243228e-17, -4.3175339846533866e-17, -4.306420641063545e-17, -4.2953072974737037e-17, -4.2841939538838625e-17, -4.273080610294021e-17, -4.2619672667041796e-17, -4.250853923114338e-17, -4.2397405795244967e-17, -4.2286272359346555e-17, -4.217513892344814e-17, -4.2064005487549726e-17, -4.195287205165131e-17, -4.1841738615752897e-17, -4.1730605179854485e-17, -4.161947174395607e-17, -4.1508338308057656e-17, -4.139720487215924e-17, -4.1286071436260826e-17, -4.1174938000362415e-17, -4.1063804564464e-17, -4.0952671128565586e-17, -4.084153769266717e-17, -4.0730404256768756e-17, -4.0619270820870345e-17, -4.050813738497193e-17, -4.0397003949073515e-17, -4.02858705131751e-17, -4.0174737077276686e-17, -4.0063603641378275e-17, -3.9952470205479857e-17, -3.984133676958144e-17, -3.973020333368303e-17, -3.9619069897784616e-17, -3.9507936461886204e-17, -3.9396803025987787e-17, -3.928566959008937e-17, -3.917453615419096e-17, -3.9063402718292546e-17, -3.8952269282394134e-17, -3.8841135846495717e-17, -3.87300024105973e-17, -3.861886897469889e-17, -3.8507735538800476e-17, -3.8396602102902064e-17, -3.8285468667003646e-17, -3.817433523110523e-17, -3.806320179520682e-17, -3.7952068359308406e-17, -3.7840934923409994e-17, -3.7729801487511576e-17, -3.761866805161316e-17, -3.750753461571475e-17, -3.7396401179816335e-17, -3.7285267743917924e-17, -3.7174134308019506e-17, -3.706300087212109e-17, -3.6951867436222677e-17, -3.6840734000324265e-17, -3.6729600564425854e-17, -3.6618467128527436e-17, -3.650733369262902e-17, -3.6396200256730607e-17, -3.6285066820832195e-17, -3.6173933384933784e-17, -3.6062799949035366e-17, -3.595166651313695e-17, -3.5840533077238537e-17, -3.5729399641340125e-17, -3.5618266205441713e-17, -3.5507132769543296e-17, -3.539599933364488e-17, -3.5284865897746466e-17, -3.5173732461848055e-17, -3.506259902594964e-17, -3.4951465590051226e-17, -3.484033215415281e-17, -3.4729198718254396e-17, -3.4618065282355985e-17, -3.450693184645757e-17, -3.4395798410559155e-17, -3.428466497466074e-17, -3.4173531538762326e-17, -3.4062398102863915e-17, -3.3951264666965497e-17, -3.3840131231067085e-17, -3.372899779516867e-17, -3.3617864359270256e-17, -3.3506730923371844e-17, -3.3395597487473427e-17, -3.3284464051575015e-17, -3.31733306156766e-17, -3.3062197179778186e-17, -3.2951063743879774e-17, -3.2839930307981357e-17, -3.272879687208294e-17, -3.261766343618453e-17, -3.2506530000286116e-17, -3.2395396564387704e-17, -3.2284263128489286e-17, -3.217312969259087e-17, -3.206199625669246e-17, -3.1950862820794046e-17, -3.1839729384895634e-17, -3.1728595948997216e-17, -3.16174625130988e-17, -3.150632907720039e-17, -3.1395195641301975e-17, -3.1284062205403564e-17, -3.1172928769505146e-17, -3.106179533360673e-17, -3.0950661897708317e-17, -3.0839528461809905e-17, -3.0728395025911494e-17, -3.0617261590013076e-17, -3.050612815411466e-17, -3.0394994718216247e-17, -3.0283861282317835e-17, -3.0172727846419424e-17, -3.0061594410521006e-17, -2.995046097462259e-17, -2.9839327538724177e-17, -2.9728194102825765e-17, -2.9617060666927353e-17, -2.9505927231028936e-17, -2.939479379513052e-17, -2.9283660359232106e-17, -2.9172526923333695e-17, -2.9061393487435283e-17, -2.8950260051536866e-17, -2.883912661563845e-17, -2.8727993179740036e-17, -2.8616859743841625e-17, -2.8505726307943213e-17, -2.8394592872044795e-17, -2.828345943614638e-17, -2.8172326000247966e-17, -2.8061192564349555e-17, -2.7950059128451137e-17, -2.7838925692552725e-17, -2.7727792256654308e-17, -2.7616658820755896e-17, -2.7505525384857484e-17, -2.7394391948959067e-17, -2.7283258513060655e-17, -2.7172125077162237e-17, -2.7060991641263826e-17, -2.6949858205365414e-17, -2.6838724769466997e-17, -2.6727591333568585e-17, -2.6616457897670167e-17, -2.6505324461771756e-17, -2.6394191025873344e-17, -2.6283057589974926e-17, -2.6171924154076515e-17, -2.6060790718178097e-17, -2.5949657282279686e-17, -2.5838523846381274e-17, -2.5727390410482856e-17, -2.5616256974584445e-17, -2.5505123538686027e-17, -2.5393990102787615e-17, -2.5282856666889204e-17, -2.5171723230990786e-17, -2.5060589795092375e-17, -2.4949456359193957e-17, -2.4838322923295545e-17, -2.4727189487397128e-17, -2.4616056051498716e-17, -2.4504922615600304e-17, -2.4393789179701887e-17, -2.4282655743803475e-17, -2.4171522307905057e-17, -2.4060388872006646e-17, -2.3949255436108234e-17, -2.3838122000209817e-17, -2.3726988564311405e-17, -2.3615855128412987e-17, -2.3504721692514576e-17, -2.3393588256616164e-17, -2.3282454820717746e-17, -2.3171321384819335e-17, -2.3060187948920917e-17, -2.2949054513022506e-17, -2.2837921077124094e-17, -2.2726787641225676e-17, -2.2615654205327265e-17, -2.2504520769428847e-17, -2.2393387333530435e-17, -2.2282253897632024e-17, -2.2171120461733606e-17, -2.2059987025835195e-17, -2.1948853589936777e-17, -2.1837720154038365e-17, -2.1726586718139948e-17, -2.1615453282241536e-17, -2.1504319846343124e-17, -2.1393186410444707e-17, -2.1282052974546295e-17, -2.1170919538647877e-17, -2.1059786102749466e-17, -2.0948652666851054e-17, -2.0837519230952637e-17, -2.0726385795054225e-17, -2.0615252359155807e-17, -2.0504118923257396e-17, -2.0392985487358984e-17, -2.0281852051460566e-17, -2.0170718615562155e-17, -2.0059585179663737e-17, -1.9948451743765326e-17, -1.9837318307866914e-17, -1.9726184871968496e-17, -1.9615051436070085e-17, -1.9503918000171667e-17, -1.9392784564273255e-17, -1.9281651128374844e-17, -1.9170517692476426e-17, -1.9059384256578015e-17, -1.8948250820679597e-17, -1.8837117384781185e-17, -1.8725983948882774e-17, -1.8614850512984356e-17, -1.8503717077085944e-17, -1.8392583641187527e-17, -1.8281450205289115e-17, -1.8170316769390704e-17, -1.8059183333492286e-17, -1.7948049897593874e-17, -1.7836916461695457e-17, -1.7725783025797045e-17, -1.7614649589898627e-17, -1.7503516154000216e-17, -1.7392382718101804e-17, -1.7281249282203386e-17, -1.7170115846304975e-17, -1.7058982410406557e-17, -1.6947848974508146e-17, -1.6836715538609734e-17, -1.6725582102711316e-17, -1.6614448666812905e-17, -1.6503315230914487e-17, -1.6392181795016075e-17, -1.6281048359117664e-17, -1.6169914923219246e-17, -1.6058781487320835e-17, -1.5947648051422417e-17, -1.5836514615524005e-17, -1.5725381179625594e-17, -1.5614247743727176e-17, -1.5503114307828764e-17, -1.5391980871930347e-17, -1.5280847436031935e-17, -1.5169714000133524e-17, -1.5058580564235106e-17, -1.4947447128336694e-17, -1.4836313692438277e-17, -1.4725180256539865e-17, -1.4614046820641447e-17, -1.4502913384743036e-17, -1.4391779948844624e-17, -1.4280646512946206e-17, -1.4169513077047795e-17, -1.4058379641149377e-17, -1.3947246205250966e-17, -1.3836112769352554e-17, -1.3724979333454136e-17, -1.3613845897555725e-17, -1.3502712461657307e-17, -1.3391579025758895e-17, -1.3280445589860484e-17, -1.3169312153962066e-17, -1.3058178718063655e-17, -1.2947045282165237e-17, -1.2835911846266825e-17, -1.2724778410368414e-17, -1.2613644974469996e-17, -1.2502511538571584e-17, -1.2391378102673167e-17, -1.2280244666774755e-17, -1.2169111230876344e-17, -1.2057977794977926e-17, -1.1946844359079514e-17, -1.1835710923181097e-17, -1.1724577487282685e-17, -1.1613444051384273e-17, -1.1502310615485856e-17, -1.1391177179587444e-17, -1.1280043743689026e-17, -1.1168910307790615e-17, -1.1057776871892203e-17, -1.0946643435993786e-17, -1.0835510000095374e-17, -1.0724376564196956e-17, -1.0613243128298545e-17, -1.0502109692400127e-17, -1.0390976256501715e-17, -1.0279842820603304e-17, -1.0168709384704886e-17, -1.0057575948806475e-17, -9.946442512908057e-18, -9.835309077009645e-18, -9.724175641111234e-18, -9.613042205212816e-18, -9.501908769314404e-18, -9.390775333415987e-18, -9.279641897517575e-18, -9.168508461619164e-18, -9.057375025720746e-18, -8.946241589822334e-18, -8.835108153923917e-18, -8.723974718025505e-18, -8.612841282127093e-18, -8.501707846228676e-18, -8.390574410330264e-18, -8.279440974431846e-18, -8.168307538533435e-18, -8.057174102635023e-18, -7.946040666736606e-18, -7.834907230838194e-18, -7.723773794939776e-18, -7.612640359041365e-18, -7.501506923142947e-18, -7.390373487244535e-18, -7.279240051346124e-18, -7.168106615447706e-18, -7.056973179549295e-18, -6.945839743650877e-18, -6.834706307752465e-18, -6.723572871854054e-18, -6.612439435955636e-18, -6.501306000057224e-18, -6.390172564158807e-18, -6.279039128260395e-18, -6.1679056923619835e-18, -6.056772256463566e-18, -5.945638820565154e-18, -5.8345053846667365e-18, -5.723371948768325e-18, -5.612238512869913e-18, -5.501105076971496e-18, -5.389971641073084e-18, -5.278838205174666e-18, -5.167704769276255e-18, -5.056571333377843e-18, -4.9454378974794255e-18, -4.834304461581014e-18, -4.723171025682596e-18, -4.612037589784185e-18, -4.500904153885773e-18, -4.389770717987355e-18, -4.278637282088944e-18, -4.167503846190526e-18, -4.0563704102921145e-18, -3.945236974393703e-18, -3.834103538495285e-18, -3.722970102596874e-18, -3.611836666698456e-18, -3.500703230800044e-18, -3.3895697949016266e-18, -3.278436359003215e-18, -3.1673029231048035e-18, -3.0561694872063858e-18, -2.9450360513079742e-18, -2.8339026154095565e-18, -2.722769179511145e-18, -2.6116357436127334e-18, -2.5005023077143156e-18, -2.389368871815904e-18, -2.2782354359174864e-18, -2.1671020000190748e-18, -2.0559685641206632e-18, -1.9448351282222455e-18, -1.833701692323834e-18, -1.7225682564254162e-18, -1.6114348205270046e-18, -1.500301384628593e-18, -1.3891679487301754e-18, -1.2780345128317638e-18, -1.166901076933346e-18, -1.0557676410349345e-18, -9.44634205136523e-19, -8.335007692381052e-19, -7.2236733333969365e-19, -6.112338974412759e-19, -5.001004615428644e-19, -3.8896702564444664e-19, -2.7783358974603507e-19, -1.667001538476235e-19, -5.556671794920578e-20, 5.556671794921194e-20, 1.667001538476235e-19, 2.7783358974603507e-19, 3.8896702564444664e-19, 5.001004615428582e-19, 6.112338974412821e-19, 7.2236733333969365e-19, 8.335007692381052e-19, 9.446342051365168e-19, 1.0557676410349283e-18, 1.1669010769333522e-18, 1.2780345128317638e-18, 1.3891679487301754e-18, 1.500301384628587e-18, 1.6114348205269985e-18, 1.7225682564254224e-18, 1.833701692323834e-18, 1.9448351282222455e-18, 2.055968564120657e-18, 2.1671020000190686e-18, 2.2782354359174925e-18, 2.389368871815904e-18, 2.5005023077143156e-18, 2.6116357436127272e-18, 2.7227691795111388e-18, 2.8339026154095627e-18, 2.9450360513079742e-18, 3.0561694872063858e-18, 3.1673029231047974e-18, 3.278436359003209e-18, 3.3895697949016328e-18, 3.500703230800044e-18, 3.611836666698456e-18, 3.7229701025968675e-18, 3.834103538495279e-18, 3.945236974393703e-18, 4.0563704102921145e-18, 4.167503846190526e-18, 4.278637282088938e-18, 4.389770717987349e-18, 4.500904153885773e-18, 4.612037589784185e-18, 4.723171025682596e-18, 4.834304461581008e-18, 4.945437897479419e-18, 5.056571333377843e-18, 5.167704769276255e-18, 5.278838205174666e-18, 5.389971641073078e-18, 5.501105076971502e-18, 5.612238512869913e-18, 5.723371948768325e-18, 5.8345053846667365e-18, 5.945638820565148e-18, 6.056772256463572e-18, 6.1679056923619835e-18, 6.279039128260395e-18, 6.390172564158807e-18, 6.501306000057218e-18, 6.612439435955642e-18, 6.723572871854054e-18, 6.834706307752465e-18, 6.945839743650877e-18, 7.056973179549288e-18, 7.168106615447712e-18, 7.279240051346124e-18, 7.390373487244535e-18, 7.501506923142947e-18, 7.612640359041358e-18, 7.723773794939782e-18, 7.834907230838194e-18, 7.946040666736606e-18, 8.057174102635017e-18, 8.168307538533429e-18, 8.279440974431853e-18, 8.390574410330264e-18, 8.501707846228676e-18, 8.612841282127087e-18, 8.723974718025499e-18, 8.835108153923923e-18, 8.946241589822334e-18, 9.057375025720746e-18, 9.168508461619157e-18, 9.279641897517569e-18, 9.390775333415993e-18, 9.501908769314404e-18, 9.613042205212816e-18, 9.724175641111228e-18, 9.835309077009639e-18, 9.946442512908063e-18, 1.0057575948806475e-17, 1.0168709384704886e-17, 1.0279842820603298e-17, 1.0390976256501709e-17, 1.0502109692400133e-17, 1.0613243128298545e-17, 1.0724376564196956e-17, 1.0835510000095368e-17, 1.094664343599378e-17, 1.1057776871892203e-17, 1.1168910307790615e-17, 1.1280043743689026e-17, 1.1391177179587438e-17, 1.150231061548585e-17, 1.1613444051384273e-17, 1.1724577487282685e-17, 1.1835710923181097e-17, 1.1946844359079508e-17, 1.2057977794977932e-17, 1.2169111230876344e-17, 1.2280244666774755e-17, 1.2391378102673167e-17, 1.2502511538571578e-17, 1.2613644974470002e-17, 1.2724778410368414e-17, 1.2835911846266825e-17, 1.2947045282165237e-17, 1.3058178718063648e-17, 1.3169312153962072e-17, 1.3280445589860484e-17, 1.3391579025758895e-17, 1.3502712461657307e-17, 1.3613845897555719e-17, 1.3724979333454142e-17, 1.3836112769352554e-17, 1.3947246205250966e-17, 1.4058379641149377e-17, 1.416951307704779e-17, 1.4280646512946213e-17, 1.4391779948844624e-17, 1.4502913384743036e-17, 1.4614046820641447e-17, 1.472518025653986e-17, 1.4836313692438283e-17, 1.4947447128336694e-17, 1.5058580564235106e-17, 1.5169714000133517e-17, 1.528084743603193e-17, 1.5391980871930353e-17, 1.5503114307828764e-17, 1.5614247743727176e-17, 1.5725381179625588e-17, 1.5836514615524e-17, 1.5947648051422423e-17, 1.6058781487320835e-17, 1.6169914923219246e-17, 1.6281048359117658e-17, 1.639218179501607e-17, 1.6503315230914493e-17, 1.6614448666812905e-17, 1.6725582102711316e-17, 1.6836715538609728e-17, 1.694784897450814e-17, 1.7058982410406563e-17, 1.7170115846304975e-17, 1.7281249282203386e-17, 1.7392382718101798e-17, 1.750351615400021e-17, 1.7614649589898633e-17, 1.7725783025797045e-17, 1.7836916461695457e-17, 1.7948049897593868e-17, 1.805918333349228e-17, 1.8170316769390704e-17, 1.8281450205289115e-17, 1.8392583641187527e-17, 1.8503717077085938e-17, 1.861485051298435e-17, 1.8725983948882774e-17, 1.8837117384781185e-17, 1.8948250820679597e-17, 1.9059384256578008e-17, 1.917051769247642e-17, 1.9281651128374844e-17, 1.9392784564273255e-17, 1.9503918000171667e-17, 1.961505143607008e-17, 1.9726184871968502e-17, 1.9837318307866914e-17, 1.9948451743765326e-17, 2.0059585179663737e-17, 2.017071861556215e-17, 2.0281852051460573e-17, 2.0392985487358984e-17, 2.0504118923257396e-17, 2.0615252359155807e-17, 2.072638579505422e-17, 2.0837519230952643e-17, 2.0948652666851054e-17, 2.1059786102749466e-17, 2.1170919538647877e-17, 2.128205297454629e-17, 2.1393186410444713e-17, 2.1504319846343124e-17, 2.1615453282241536e-17, 2.1726586718139948e-17, 2.183772015403836e-17, 2.1948853589936783e-17, 2.2059987025835195e-17, 2.2171120461733606e-17, 2.2282253897632018e-17, 2.239338733353043e-17, 2.2504520769428853e-17, 2.2615654205327265e-17, 2.2726787641225676e-17, 2.2837921077124088e-17, 2.29490545130225e-17, 2.3060187948920923e-17, 2.3171321384819335e-17, 2.3282454820717746e-17, 2.3393588256616158e-17, 2.350472169251457e-17, 2.3615855128412993e-17, 2.3726988564311405e-17, 2.3838122000209817e-17, 2.3949255436108228e-17, 2.406038887200664e-17, 2.4171522307905064e-17, 2.4282655743803475e-17, 2.4393789179701887e-17, 2.4504922615600298e-17, 2.461605605149871e-17, 2.4727189487397134e-17, 2.4838322923295545e-17, 2.4949456359193957e-17, 2.5060589795092368e-17, 2.517172323099078e-17, 2.5282856666889204e-17, 2.5393990102787615e-17, 2.5505123538686027e-17, 2.561625697458444e-17, 2.572739041048285e-17, 2.5838523846381274e-17, 2.5949657282279686e-17, 2.6060790718178097e-17, 2.617192415407651e-17, 2.6283057589974933e-17, 2.6394191025873344e-17, 2.6505324461771756e-17, 2.6616457897670167e-17, 2.672759133356858e-17, 2.6838724769467003e-17, 2.6949858205365414e-17, 2.7060991641263826e-17, 2.7172125077162237e-17, 2.728325851306065e-17, 2.7394391948959073e-17, 2.7505525384857484e-17, 2.7616658820755896e-17, 2.7727792256654308e-17, 2.783892569255272e-17, 2.795005912845114e-17, 2.8061192564349555e-17, 2.8172326000247966e-17, 2.828345943614638e-17, 2.839459287204479e-17, 2.8505726307943213e-17, 2.8616859743841625e-17, 2.8727993179740036e-17, 2.883912661563845e-17, 2.895026005153686e-17, 2.9061393487435283e-17, 2.9172526923333695e-17, 2.9283660359232106e-17, 2.939479379513052e-17, 2.950592723102893e-17, 2.9617060666927353e-17, 2.9728194102825765e-17, 2.9839327538724177e-17, 2.995046097462259e-17, 3.0061594410521e-17, 3.0172727846419424e-17, 3.0283861282317835e-17, 3.0394994718216247e-17, 3.050612815411466e-17, 3.061726159001307e-17, 3.0728395025911494e-17, 3.0839528461809905e-17, 3.0950661897708317e-17, 3.106179533360673e-17, 3.117292876950514e-17, 3.1284062205403564e-17, 3.1395195641301975e-17, 3.150632907720039e-17, 3.16174625130988e-17, 3.172859594899721e-17, 3.1839729384895634e-17, 3.1950862820794046e-17, 3.206199625669246e-17, 3.217312969259087e-17, 3.228426312848928e-17, 3.2395396564387704e-17, 3.2506530000286116e-17, 3.261766343618453e-17, 3.272879687208294e-17, 3.283993030798135e-17, 3.2951063743879774e-17, 3.3062197179778186e-17, 3.31733306156766e-17, 3.328446405157501e-17, 3.339559748747342e-17, 3.3506730923371844e-17, 3.3617864359270256e-17, 3.372899779516867e-17, 3.384013123106708e-17, 3.39512646669655e-17, 3.4062398102863915e-17, 3.4173531538762326e-17, 3.428466497466074e-17, 3.439579841055915e-17, 3.4506931846457573e-17, 3.4618065282355985e-17, 3.4729198718254396e-17, 3.484033215415281e-17, 3.495146559005122e-17, 3.5062599025949643e-17, 3.5173732461848055e-17, 3.5284865897746466e-17, 3.539599933364488e-17, 3.550713276954329e-17, 3.5618266205441713e-17, 3.5729399641340125e-17, 3.5840533077238537e-17, 3.595166651313695e-17, 3.606279994903536e-17, 3.6173933384933784e-17, 3.6285066820832195e-17, 3.6396200256730607e-17, 3.650733369262902e-17, 3.661846712852743e-17, 3.6729600564425854e-17, 3.6840734000324265e-17, 3.6951867436222677e-17, 3.706300087212109e-17, 3.71741343080195e-17, 3.7285267743917924e-17, 3.7396401179816335e-17, 3.750753461571475e-17, 3.761866805161316e-17, 3.772980148751157e-17, 3.7840934923409994e-17, 3.7952068359308406e-17, 3.806320179520682e-17, 3.817433523110523e-17, 3.828546866700364e-17, 3.8396602102902064e-17, 3.8507735538800476e-17, 3.861886897469889e-17, 3.87300024105973e-17, 3.884113584649571e-17, 3.8952269282394134e-17, 3.9063402718292546e-17, 3.917453615419096e-17, 3.928566959008937e-17, 3.939680302598778e-17, 3.9507936461886204e-17, 3.9619069897784616e-17, 3.973020333368303e-17, 3.984133676958144e-17, 3.995247020547985e-17, 4.0063603641378275e-17, 4.0174737077276686e-17, 4.02858705131751e-17, 4.039700394907351e-17, 4.0508137384971933e-17, 4.0619270820870345e-17, 4.0730404256768756e-17, 4.084153769266717e-17, 4.095267112856558e-17, 4.1063804564464003e-17, 4.1174938000362415e-17, 4.1286071436260826e-17, 4.139720487215924e-17, 4.150833830805765e-17, 4.1619471743956073e-17, 4.1730605179854485e-17, 4.1841738615752897e-17, 4.195287205165131e-17, 4.206400548754972e-17, 4.2175138923448144e-17, 4.2286272359346555e-17, 4.2397405795244967e-17, 4.250853923114338e-17, 4.261967266704179e-17, 4.2730806102940214e-17, 4.2841939538838625e-17, 4.2953072974737037e-17, 4.306420641063545e-17, 4.317533984653386e-17, 4.3286473282432284e-17, 4.3397606718330695e-17, 4.350874015422911e-17, 4.361987359012752e-17, 4.373100702602593e-17, 4.3842140461924354e-17, 4.3953273897822766e-17, 4.406440733372118e-17, 4.417554076961959e-17, 4.4286674205518e-17, 4.4397807641416424e-17, 4.4508941077314836e-17, 4.462007451321325e-17, 4.473120794911166e-17, 4.484234138501007e-17, 4.4953474820908494e-17, 4.5064608256806906e-17, 4.517574169270532e-17, 4.528687512860373e-17, 4.539800856450214e-17, 4.5509142000400564e-17, 4.5620275436298976e-17, 4.573140887219739e-17, 4.58425423080958e-17, 4.595367574399421e-17, 4.6064809179892635e-17, 4.6175942615791046e-17, 4.628707605168946e-17, 4.639820948758787e-17, 4.650934292348628e-17, 4.6620476359384705e-17, 4.6731609795283116e-17, 4.684274323118153e-17, 4.695387666707994e-17, 4.706501010297835e-17, 4.7176143538876775e-17, 4.7287276974775186e-17, 4.73984104106736e-17, 4.750954384657201e-17, 4.762067728247042e-17, 4.7731810718368845e-17, 4.7842944154267257e-17, 4.795407759016567e-17, 4.806521102606408e-17, 4.8176344461962504e-17, 4.8287477897860915e-17, 4.8398611333759327e-17, 4.850974476965774e-17, 4.862087820555615e-17, 4.8732011641454574e-17, 4.8843145077352985e-17, 4.8954278513251397e-17, 4.906541194914981e-17, 4.917654538504822e-17, 4.9287678820946644e-17, 4.9398812256845055e-17, 4.950994569274347e-17, 4.962107912864188e-17, 4.973221256454029e-17, 4.9843346000438714e-17, 4.9954479436337126e-17, 5.006561287223554e-17, 5.017674630813395e-17, 5.028787974403236e-17, 5.0399013179930784e-17, 5.0510146615829196e-17, 5.062128005172761e-17, 5.073241348762602e-17, 5.084354692352443e-17, 5.0954680359422854e-17, 5.1065813795321266e-17, 5.117694723121968e-17, 5.128808066711809e-17, 5.13992141030165e-17, 5.1510347538914924e-17, 5.1621480974813336e-17, 5.173261441071175e-17, 5.184374784661016e-17, 5.195488128250857e-17, 5.2066014718406995e-17, 5.2177148154305406e-17, 5.228828159020382e-17, 5.239941502610223e-17, 5.251054846200064e-17, 5.2621681897899065e-17, 5.2732815333797476e-17, 5.284394876969589e-17, 5.29550822055943e-17, 5.306621564149271e-17, 5.3177349077391135e-17, 5.3288482513289546e-17, 5.339961594918796e-17, 5.351074938508637e-17, 5.362188282098478e-17, 5.3733016256883205e-17, 5.3844149692781617e-17, 5.395528312868003e-17, 5.406641656457844e-17, 5.417755000047685e-17, 5.4288683436375275e-17, 5.4399816872273687e-17, 5.45109503081721e-17, 5.462208374407051e-17, 5.4733217179968934e-17, 5.4844350615867345e-17, 5.4955484051765757e-17, 5.506661748766417e-17, 5.517775092356258e-17, 5.5288884359461004e-17, 5.5400017795359415e-17, 5.551115123125783e-17], "expected": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]}
},{}],64:[function(require,module,exports){
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
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var expm1rel = require( './../lib' );


// FIXTURES //

var mediumNegative = require( './fixtures/python/medium_negative.json' );
var mediumPositive = require( './fixtures/python/medium_positive.json' );
var smallNegative = require( './fixtures/python/small_negative.json' );
var smallPositive = require( './fixtures/python/small_positive.json' );
var tiny = require( './fixtures/python/tiny.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof expm1rel, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function accurately computes `(exp(x)-1)/x` for negative medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1rel( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 3.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `(exp(x)-1)/x` for positive medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1rel( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 3.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `(exp(x)-1)/x` for negative small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1rel( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 3.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `(exp(x)-1)/x` for positive small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1rel( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 3.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `(exp(x)-1)/x` for very small `x`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = tiny.x;
	expected = tiny.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1rel( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 3.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function returns `1.0` near `0.0`', function test( t ) {
	t.equal( expm1rel( 0 ), 1.0, 'equals 1.0' );
	t.equal( expm1rel( EPS ), 1.0, 'equals 1.0');
	t.equal( expm1rel( -EPS ), 1.0, 'equals 1.0');
	t.end();
});

tape( 'the function returns `NaN` when evaulated at `NaN`', function test( t ) {
	var y = expm1rel( NaN );
	t.equal( isnan( y ), true, 'equals NaN');
	t.end();
});

tape('the function returns `+infinity` at `+infinity`', function test( t ) {
	t.equal( expm1rel( PINF ), PINF, 'equals +infinity');
	t.end();
});

tape('the function returns `0` at `-infinity`', function test( t ) {
	t.equal( expm1rel( NINF ), 0.0, 'equals 0');
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/expm1rel/test/test.js")
},{"./../lib":57,"./fixtures/python/medium_negative.json":59,"./fixtures/python/medium_positive.json":60,"./fixtures/python/small_negative.json":61,"./fixtures/python/small_positive.json":62,"./fixtures/python/tiny.json":63,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":45,"@stdlib/constants/float64/pinf":46,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/abs":52,"tape":181}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":66}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":67,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],70:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":67}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":70,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":74,"./polyfill.js":75,"@stdlib/assert/has-tostringtag-support":20}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":76}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":76,"./tostringtag.js":77,"@stdlib/assert/has-own-property":16}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){

},{}],80:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"dup":79}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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
},{"_process":173}],83:[function(require,module,exports){
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

},{"events":81,"inherits":168,"readable-stream/lib/_stream_duplex.js":85,"readable-stream/lib/_stream_passthrough.js":86,"readable-stream/lib/_stream_readable.js":87,"readable-stream/lib/_stream_transform.js":88,"readable-stream/lib/_stream_writable.js":89,"readable-stream/lib/internal/streams/end-of-stream.js":93,"readable-stream/lib/internal/streams/pipeline.js":95}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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
},{"./_stream_readable":87,"./_stream_writable":89,"_process":173,"inherits":168}],86:[function(require,module,exports){
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
},{"./_stream_transform":88,"inherits":168}],87:[function(require,module,exports){
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
},{"../errors":84,"./_stream_duplex":85,"./internal/streams/async_iterator":90,"./internal/streams/buffer_list":91,"./internal/streams/destroy":92,"./internal/streams/from":94,"./internal/streams/state":96,"./internal/streams/stream":97,"_process":173,"buffer":98,"events":81,"inherits":168,"string_decoder/":180,"util":79}],88:[function(require,module,exports){
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
},{"../errors":84,"./_stream_duplex":85,"inherits":168}],89:[function(require,module,exports){
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
},{"../errors":84,"./_stream_duplex":85,"./internal/streams/destroy":92,"./internal/streams/state":96,"./internal/streams/stream":97,"_process":173,"buffer":98,"inherits":168,"util-deprecate":189}],90:[function(require,module,exports){
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
},{"./end-of-stream":93,"_process":173}],91:[function(require,module,exports){
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
},{"buffer":98,"util":79}],92:[function(require,module,exports){
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
},{"_process":173}],93:[function(require,module,exports){
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
},{"../../../errors":84}],94:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],95:[function(require,module,exports){
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
},{"../../../errors":84,"./end-of-stream":93}],96:[function(require,module,exports){
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
},{"../../../errors":84}],97:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":81}],98:[function(require,module,exports){
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
},{"base64-js":78,"buffer":98,"ieee754":167}],99:[function(require,module,exports){
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

},{"./":100,"get-intrinsic":163}],100:[function(require,module,exports){
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

},{"function-bind":162,"get-intrinsic":163}],101:[function(require,module,exports){
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

},{"./lib/is_arguments.js":102,"./lib/keys.js":103}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],104:[function(require,module,exports){
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

},{"object-keys":171}],105:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],106:[function(require,module,exports){
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

},{"./ToNumber":136,"./ToPrimitive":138,"./Type":143}],107:[function(require,module,exports){
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

},{"../helpers/isFinite":152,"../helpers/isNaN":153,"../helpers/isPrefixOf":154,"./ToNumber":136,"./ToPrimitive":138,"./Type":143,"get-intrinsic":163}],108:[function(require,module,exports){
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

},{"get-intrinsic":163}],109:[function(require,module,exports){
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

},{"./DayWithinYear":112,"./InLeapYear":116,"./MonthFromTime":126,"get-intrinsic":163}],110:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":158,"./floor":147}],111:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":147}],112:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":110,"./DayFromYear":111,"./YearFromTime":145}],113:[function(require,module,exports){
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

},{"./modulo":148}],114:[function(require,module,exports){
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

},{"../helpers/assertRecord":151,"./IsAccessorDescriptor":117,"./IsDataDescriptor":119,"./Type":143,"get-intrinsic":163}],115:[function(require,module,exports){
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

},{"../helpers/timeConstants":158,"./floor":147,"./modulo":148}],116:[function(require,module,exports){
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

},{"./DaysInYear":113,"./YearFromTime":145,"get-intrinsic":163}],117:[function(require,module,exports){
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

},{"../helpers/assertRecord":151,"./Type":143,"has":166}],118:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":169}],119:[function(require,module,exports){
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

},{"../helpers/assertRecord":151,"./Type":143,"has":166}],120:[function(require,module,exports){
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

},{"../helpers/assertRecord":151,"./IsAccessorDescriptor":117,"./IsDataDescriptor":119,"./Type":143}],121:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":155,"./IsAccessorDescriptor":117,"./IsDataDescriptor":119,"./Type":143}],122:[function(require,module,exports){
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

},{"../helpers/isFinite":152,"../helpers/timeConstants":158}],123:[function(require,module,exports){
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

},{"../helpers/isFinite":152,"./DateFromTime":109,"./Day":110,"./MonthFromTime":126,"./ToInteger":135,"./YearFromTime":145,"./floor":147,"./modulo":148,"get-intrinsic":163}],124:[function(require,module,exports){
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

},{"../helpers/isFinite":152,"../helpers/timeConstants":158,"./ToInteger":135}],125:[function(require,module,exports){
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

},{"../helpers/timeConstants":158,"./floor":147,"./modulo":148}],126:[function(require,module,exports){
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

},{"./DayWithinYear":112,"./InLeapYear":116}],127:[function(require,module,exports){
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

},{"../helpers/isNaN":153}],128:[function(require,module,exports){
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

},{"../helpers/timeConstants":158,"./floor":147,"./modulo":148}],129:[function(require,module,exports){
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

},{"./Type":143}],130:[function(require,module,exports){
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


},{"../helpers/isFinite":152,"./ToNumber":136,"./abs":146,"get-intrinsic":163}],131:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":158,"./DayFromYear":111}],132:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":158,"./modulo":148}],133:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],134:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":136}],135:[function(require,module,exports){
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

},{"../helpers/isFinite":152,"../helpers/isNaN":153,"../helpers/sign":157,"./ToNumber":136,"./abs":146,"./floor":147}],136:[function(require,module,exports){
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

},{"./ToPrimitive":138}],137:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":108,"get-intrinsic":163}],138:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":159}],139:[function(require,module,exports){
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

},{"./IsCallable":118,"./ToBoolean":133,"./Type":143,"get-intrinsic":163,"has":166}],140:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":163}],141:[function(require,module,exports){
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

},{"../helpers/isFinite":152,"../helpers/isNaN":153,"../helpers/sign":157,"./ToNumber":136,"./abs":146,"./floor":147,"./modulo":148}],142:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":136}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":110,"./modulo":148}],145:[function(require,module,exports){
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

},{"call-bind/callBound":99,"get-intrinsic":163}],146:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":163}],147:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],148:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":156}],149:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":158,"./modulo":148}],150:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":106,"./5/AbstractRelationalComparison":107,"./5/CheckObjectCoercible":108,"./5/DateFromTime":109,"./5/Day":110,"./5/DayFromYear":111,"./5/DayWithinYear":112,"./5/DaysInYear":113,"./5/FromPropertyDescriptor":114,"./5/HourFromTime":115,"./5/InLeapYear":116,"./5/IsAccessorDescriptor":117,"./5/IsCallable":118,"./5/IsDataDescriptor":119,"./5/IsGenericDescriptor":120,"./5/IsPropertyDescriptor":121,"./5/MakeDate":122,"./5/MakeDay":123,"./5/MakeTime":124,"./5/MinFromTime":125,"./5/MonthFromTime":126,"./5/SameValue":127,"./5/SecFromTime":128,"./5/StrictEqualityComparison":129,"./5/TimeClip":130,"./5/TimeFromYear":131,"./5/TimeWithinDay":132,"./5/ToBoolean":133,"./5/ToInt32":134,"./5/ToInteger":135,"./5/ToNumber":136,"./5/ToObject":137,"./5/ToPrimitive":138,"./5/ToPropertyDescriptor":139,"./5/ToString":140,"./5/ToUint16":141,"./5/ToUint32":142,"./5/Type":143,"./5/WeekDay":144,"./5/YearFromTime":145,"./5/abs":146,"./5/floor":147,"./5/modulo":148,"./5/msFromTime":149}],151:[function(require,module,exports){
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

},{"get-intrinsic":163,"has":166}],152:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],153:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],154:[function(require,module,exports){
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

},{"call-bind/callBound":99}],155:[function(require,module,exports){
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

},{"get-intrinsic":163,"has":166}],156:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],157:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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

},{"./helpers/isPrimitive":160,"is-callable":169}],160:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":161}],163:[function(require,module,exports){
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

},{"function-bind":162,"has":166,"has-symbols":164}],164:[function(require,module,exports){
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

},{"./shams":165}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":162}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{"./isArguments":172}],171:[function(require,module,exports){
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

},{"./implementation":170,"./isArguments":172}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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
},{"_process":173,"through":187,"timers":188}],175:[function(require,module,exports){
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

},{"buffer":98}],176:[function(require,module,exports){
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

},{"es-abstract/es5":150,"function-bind":162}],177:[function(require,module,exports){
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

},{"./implementation":176,"./polyfill":178,"./shim":179,"define-properties":104,"function-bind":162}],178:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":176}],179:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":178,"define-properties":104}],180:[function(require,module,exports){
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
},{"safe-buffer":175}],181:[function(require,module,exports){
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
},{"./lib/default_stream":182,"./lib/results":184,"./lib/test":185,"_process":173,"defined":105,"through":187,"timers":188}],182:[function(require,module,exports){
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
},{"_process":173,"fs":80,"through":187}],183:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":173,"timers":188}],184:[function(require,module,exports){
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
},{"_process":173,"events":81,"function-bind":162,"has":166,"inherits":168,"object-inspect":186,"resumer":174,"through":187,"timers":188}],185:[function(require,module,exports){
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
},{"./next_tick":183,"deep-equal":101,"defined":105,"events":81,"has":166,"inherits":168,"path":82,"string.prototype.trim":177}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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
},{"_process":173,"stream":83}],188:[function(require,module,exports){
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
},{"process/browser.js":173,"timers":188}],189:[function(require,module,exports){
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
},{}]},{},[64]);
