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

},{"@stdlib/utils/native-class":85}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":85}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":85}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":85}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":77}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Test if a double-precision floating-point numeric value is negative zero.
*
* @module @stdlib/math/base/assert/is-negative-zero
*
* @example
* var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
*
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* bool = isNegativeZero( 0.0 );
* // returns false
*/

// MODULES //

var isNegativeZero = require( './main.js' );


// EXPORTS //

module.exports = isNegativeZero;

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
*/

'use strict';

// MODULES //

var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is negative zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is negative zero
*
* @example
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZero( 0.0 );
* // returns false
*/
function isNegativeZero( x ) {
	return (x === 0.0 && 1.0/x === NINF);
}


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/constants/float64/ninf":44}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":56}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":45}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":58}],58:[function(require,module,exports){
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

var isinfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );


// MAIN //

/**
* Computes the hyperbolic arcsine of a number.
*
* @param {number} x - input value
* @returns {number} hyperbolic arcsine (in radians)
*
* @example
* var v = asinh( 0.0 );
* // returns 0.0
*
* @example
* var v = asinh( 2.0 );
* // returns ~1.444
*
* @example
* var v = asinh( -2.0 );
* // returns ~-1.444
*
* @example
* var v = asinh( NaN );
* // returns NaN
*/
function asinh( x ) {
	if (
		x === 0.0 || // +-0.0
		isnan( x ) ||
		isinfinite( x )
	) {
		return x;
	}
	if ( x > 0 ) {
		return ln( x + sqrt( (x*x) + 1 ) );
	}
	// Better precision for large negative `x`:
	return -ln( -x + sqrt( (x*x) + 1 ) );
}


// EXPORTS //

module.exports = asinh;

},{"@stdlib/math/base/assert/is-infinite":49,"@stdlib/math/base/assert/is-nan":51,"@stdlib/math/base/special/ln":71,"@stdlib/math/base/special/sqrt":75}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the hyperbolic arcsine of a number.
*
* @module @stdlib/math/base/special/fast/asinh
*
* @example
* var asinh = require( '@stdlib/math/base/special/fast/asinh' );
*
* var v = asinh( 0.0 );
* // returns 0.0
*
* v = asinh( 2.0 );
* // returns ~1.444
*
* v = asinh( -2.0 );
* // returns ~-1.444
*
* v = asinh( NaN );
* // returns NaN
*/

// MODULES //

var asinh = require( './asinh.js' );


// EXPORTS //

module.exports = asinh;

},{"./asinh.js":59}],61:[function(require,module,exports){
module.exports={"expected":[-1.8184464592320668,-1.8340783073668,-1.8494813604892717,-1.8646618798755306,-1.8796258881180774,-1.8943791802213703,-1.9089273341275603,-1.923275720700717,-1.9374295131969697,-1.9513936962470653,-1.9651730743768294,-1.9787722800899739,-1.9921957815366158,-2.005447889789794,-2.0185327657511913,-2.0314544267062202,-2.044216752547588,-2.05682349168546,-2.069278266661378,-2.0815845794821426,-2.0937458166889944,-2.1057652541765695,-2.1176460617752886,-2.1293913076100854,-2.14100396224762,-2.1524869026434574,-2.16384291590002,-2.175074702845502,-2.1861848814433613,-2.1971759900414334,-2.2080504904692106,-2.2188107709913276,-2.2294591491248283,-2.239997874327378,-2.250429130563143,-2.2607550387527033,-2.270977659112983,-2.281098993392859,-2.2911209870097715,-2.3010455310923756,-2.3108744644339803,-2.3206095753612535,-2.330252603522435,-2.3398052415990502,-2.3492691369449012,-2.3586458931559076,-2.3679370715741674,-2.377144192729433,-2.386268737721014,-2.3953121495429626,-2.4042758343552437,-2.413161162703444,-2.4219694706894392,-2.4307020610953183,-2.4393602044627274,-2.4479451401296966,-2.456458077226902,-2.4649001956352077,-2.473272646906249,-2.4815765551477122,-2.489813017874902,-2.4979831068300866,-2.5060878687710533,-2.514128326230222,-2.5221054782455994,-2.5300203010648077,-2.537873748823336,-2.5456667541981286,-2.553400229037554,-2.561075064968764,-2.5686921339833826,-2.576252289002444,-2.583756364421431,-2.591205176636246,-2.598599524550892,-2.6059401900676105,-2.6132279385601938,-2.620463519331144,-2.627647666053331,-2.6347810971967682,-2.641864516441089,-2.648898613074298,-2.6558840623783264,-2.6628215260019115,-2.669711652321281,-2.676555076789129,-2.683352422272312,-2.6901042993787123,-2.6968113067736614,-2.703474031486334,-2.7100930492064705,-2.716668924571804,-2.7232022114465195,-2.7296934531910924,-2.736143182923804,-2.742551923774251,-2.748920189129132,-2.7552484828705865,-2.7615372996073604,-2.7677871248990455,-2.7739984354736453,-2.7801716994386925,-2.786307376486154,-2.792405918091336,-2.798467767705989,-2.8044933609458296,-2.8104831257726515,-2.8164374826712257,-2.8223568448211536,-2.828241618263856,-2.8340922020648467,-2.839908988471465,-2.845692363066199,-2.851442704915764,-2.8571603867160587,-2.8628457749331466,-2.868499229940386,-2.874121106151833,-2.879711752152038,-2.8852715108223546,-2.8908007194638676,-2.896299709917047,-2.9017688086782374,-2.9072083370130732,-2.9126186110669265,-2.917999941972466,-2.923352635954431,-2.9286769944316964,-2.933973314116714,-2.939241887112413,-2.9444830010066307,-2.9496969389641574,-2.9548839798164552,-2.960044398149132,-2.9651784643872277,-2.9702864448783863,-2.9753686019739685,-2.980425194108169,-2.985456475875196,-2.990462698104573,-2.9954441079346106,-3.0004009488841015,-3.0053334609222992,-3.010241880537219,-3.0151264408023093,-3.0199873714415495,-3.024824898893006,-3.0296392463708983,-3.0344306339262133,-3.0391992785059068,-3.0439453940107377,-3.0486691913517627,-3.053370878505537,-3.0580506605680524,-3.062708739807446,-3.0673453157155173,-3.071960585058078,-3.0765547419241766,-3.081127977774218,-3.0856804814870133,-3.0902124394057835,-3.0947240353831513,-3.0992154508251413,-3.103686864734218,-3.108138453751384,-3.112570392197367,-3.1169828521129137,-3.1213760032982183,-3.125750013351506,-3.1301050477067913,-3.134441269670835,-3.138758840459317,-3.143057919232251,-3.1473386631286497,-3.151601227300468,-3.155845764945842,-3.160072427341631,-3.164281363875298,-3.1684727220761224,-3.1726466476457835,-3.1768032844883134,-3.1809427747394428,-3.1850652587953516,-3.189170875340844,-3.193259761376951,-3.197332052247984,-3.201387881668051,-3.2054273817470404,-3.2094506830161,-3.2134579144526025,-3.217449203504632,-3.2214246761149843,-3.2253844567447016,-3.2293286683961537,-3.233257432635669,-3.237170869615731,-3.2410690980967494,-3.244952235468415,-3.248820397770649,-3.2526736997141508,-3.256512254700563,-3.2603361748422532,-3.2641455709817255,-3.2679405527106677,-3.2717212283886483,-3.275487705161461,-3.279240088979133,-3.282978484613601,-3.286702995676064,-3.290413724634015,-3.2941107728279677,-3.2977942404878737,-3.3014642267492476,-3.305120829668999,-3.3087641462409785,-3.3123942724112494,-3.316011303093083,-3.3196153321816904,-3.3232064525686904,-3.326784756156324,-3.3303503338714195,-3.33390327567911,-3.3374436705963113,-3.3409716067049713,-3.344487171165079,-3.3479904502274582,-3.351481529246335,-3.3549604926916916,-3.358427424161407,-3.3618824063931934,-3.365325521276327,-3.3687568498631792,-3.372176472380558,-3.3755844682408522,-3.378980916052993,-3.3823658936332297,-3.3857394780157284,-3.389101745462991,-3.3924527714761052,-3.395792630804823,-3.399121397457474,-3.402439144710717,-3.4057459451191305,-3.4090418705246486,-3.412326992065842,-3.4156013801870513,-3.4188651046473675,-3.4221182345294765,-3.4253608382483534,-3.4285929835598226,-3.4318147375689803,-3.435026166738482,-3.4382273368967016,-3.4414183132457596,-3.4445991603694233,-3.4477699422408867,-3.4509307222304284,-3.454081563112945,-3.4572225270753743,-3.4603536757239994,-3.4634750700916395,-3.4665867706447338,-3.4696888372903114,-3.472781329382858,-3.4758643057310787,-3.478937824604554,-3.4820019437402965,-3.4850567203492107,-3.4881022111224533,-3.4911384722376955,-3.494165559365298,-3.4971835276743857,-3.5001924318388387,-3.503192326043189,-3.506183263988435,-3.5091652988977646,-3.512138483522198,-3.5151028701461464,-3.518058510592888,-3.5210054562299673,-3.523943757974511,-3.526873466298473,-3.5297946312337953,-3.5327073023775033,-3.5356115288967205,-3.5385073595336154,-3.5413948426102753,-3.5442740260335146,-3.547144957299607,-3.5500076834989573,-3.552862251320708,-3.555708707057271,-3.5585470966088097,-3.561377465487645,-3.564199858822608,-3.567014321363331,-3.5698208974844725,-3.572619631189893,-3.5754105661167657,-3.578193745539633,-3.5809692123744084,-3.58373700918232,-3.586497178173805,-3.5892497612123457,-3.591994799818256,-3.5947323351724183,-3.5974624081199646,-3.6001850591739144,-3.6029003285187566,-3.605608256013989,-3.6083088811976074,-3.611002243289549,-3.6136883811950904,-3.6163673335081987,-3.619039138514838,-3.6217038341962375,-3.6243614582321073,-3.6270120480038206,-3.6296556405975493,-3.6322922728073586,-3.634921981138264,-3.6375448018092458,-3.6401607707562254,-3.6427699236350053,-3.6453722958241648,-3.647967922427925,-3.6505568382789764,-3.653139077941263,-3.655714675712742,-3.658283665628097,-3.6608460814614268,-3.6634019567288916,-3.665951324691332,-3.6684942183568494,-3.6710306704833613,-3.673560713581115,-3.6760843799151783,-3.678601701507895,-3.6811127101413073,-3.683617437359557,-3.6861159144712436,-3.6886081725517674,-3.6910942424456326,-3.693574154768727,-3.696047939910575,-3.698515628036557,-3.70097724909011,-3.703432832794893,-3.7058824086569335,-3.708326005966741,-3.710763653801401,-3.7131953810266385,-3.715621216298861,-3.7180411880671755,-3.720455324575378,-3.722863653863924,-3.7252662037718745,-3.727663001938815,-3.7300540758067564,-3.732439452622011,-3.734819159437046,-3.737193223112319,-3.7395616703180825,-3.7419245275361805,-3.7442818210618123,-3.746633577005282,-3.7489798212937253,-3.751320579672819,-3.753655877708465,-3.7559857407884616,-3.75831019412415,-3.760629262752045,-3.7629429715354457,-3.7652513451660288,-3.76755440816542,-3.769852184886755,-3.772144699516213,-3.7744319760745406,-3.7767140384185556,-3.7789909102426322,-3.781262615080171,-3.7835291763050547,-3.785790617133082,-3.7880469606233897,-3.7902982296798586,-3.7925444470525007,-3.794785635338836,-3.797021816985247,-3.7992530142883254,-3.801479249396199,-3.803700544309846,-3.8059169208843944,-3.808128400830407,-3.8103350057151513,-3.8125367569638593,-3.814733675860967,-3.8169257835513477,-3.8191131010415265,-3.821295649200882,-3.8234734487628406,-3.825646520326049,-3.827814884355542,-3.8299785611838937,-3.8321375710123555,-3.834291933911986,-3.8364416698247643,-3.838586798564695,-3.8407273398188986,-3.8428633131486913,-3.8449947379906564,-3.8471216336576974,-3.8492440193400874,-3.851361914106503,-3.8534753369050483,-3.855584306564269,-3.857688841794154,-3.859788961187129,-3.86188468321904,-3.86397602625012,-3.8660630085259564,-3.868145648178439,-3.870223963226703,-3.872297971578063,-3.8743676910289313,-3.8764331392657354,-3.8784943338658184,-3.8805512922983354,-3.8826040319251383,-3.884652570001652,-3.8866969236777402,-3.888737109998568,-3.890773145905447,-3.892805048236679,-3.89483283372839,-3.8968565190153504,-3.8988761206317957,-3.9008916550122312,-3.9029031384922335,-3.904910587309241,-3.906914017603339,-3.908913445418034,-3.9109088867010255,-3.912900357304963,-3.9148878729882006,-3.9168714494155434,-3.9188511021589854,-3.9208268466984406,-3.9227986984224668,-3.924766672628984,-3.926730784525981,-3.928691049232222,-3.930647481777941,-3.9326000971055297,-3.934548910070224,-3.9364939354407746,-3.9384351879001227,-3.9403726820460574,-3.942306432391876,-3.944236453367033,-3.9461627593177835,-3.948085364507823,-3.950004283118917,-3.951919529251529,-3.953831116925438,-3.955739060080355,-3.957643372576528,-3.9595440681953478,-3.9614411606399424,-3.9633346635357687,-3.9652245904311973,-3.9671109547980934,-3.9689937700323914,-3.9708730494546636,-3.972748806310683,-3.9746210537719837,-3.976489804936414,-3.978355072828683,-3.980216870400906,-3.982075210533141,-3.9839301060339216,-3.9857815696407872,-3.987629614020804,-3.9894742517710853,-3.9913154954193044,-3.9931533574242044,-3.9949878501761007,-3.996818985997384,-3.9986467771430125,-4.0004712358010055,-4.002292374092927,-4.004110204074369,-4.005924737735429,-4.007735987001183,-4.009543963732156,-4.011348679724784,-4.013150146711875,-4.014948376363069,-4.016743380285286,-4.018535170023177,-4.0203237570595665,-4.022109152815895,-4.023891368652656,-4.025670415869822],"x":[-3.0,-3.049800796812749,-3.099601593625498,-3.149402390438247,-3.199203187250996,-3.249003984063745,-3.298804780876494,-3.348605577689243,-3.398406374501992,-3.448207171314741,-3.49800796812749,-3.547808764940239,-3.597609561752988,-3.647410358565737,-3.697211155378486,-3.747011952191235,-3.7968127490039842,-3.846613545816733,-3.896414342629482,-3.946215139442231,-3.99601593625498,-4.0458167330677295,-4.095617529880478,-4.145418326693227,-4.195219123505976,-4.245019920318725,-4.294820717131474,-4.344621513944223,-4.394422310756972,-4.444223107569721,-4.49402390438247,-4.543824701195219,-4.5936254980079685,-4.643426294820717,-4.693227091633466,-4.743027888446215,-4.792828685258964,-4.842629482071713,-4.892430278884462,-4.942231075697211,-4.99203187250996,-5.04183266932271,-5.091633466135458,-5.1414342629482075,-5.191235059760956,-5.241035856573705,-5.290836653386454,-5.340637450199203,-5.390438247011952,-5.440239043824701,-5.49003984063745,-5.539840637450199,-5.589641434262949,-5.639442231075697,-5.6892430278884465,-5.739043824701195,-5.788844621513944,-5.838645418326693,-5.888446215139442,-5.938247011952191,-5.98804780876494,-6.03784860557769,-6.087649402390438,-6.137450199203188,-6.187250996015936,-6.2370517928286855,-6.286852589641434,-6.336653386454183,-6.386454183266932,-6.436254980079681,-6.48605577689243,-6.535856573705179,-6.585657370517929,-6.635458167330677,-6.685258964143427,-6.735059760956175,-6.7848605577689245,-6.834661354581673,-6.884462151394422,-6.934262948207171,-6.98406374501992,-7.03386454183267,-7.083665338645418,-7.133466135458168,-7.183266932270916,-7.233067729083666,-7.282868525896414,-7.3326693227091635,-7.382470119521912,-7.432270916334661,-7.48207171314741,-7.531872509960159,-7.581673306772909,-7.631474103585657,-7.681274900398407,-7.731075697211155,-7.780876494023905,-7.830677290836653,-7.8804780876494025,-7.930278884462151,-7.9800796812749,-8.02988047808765,-8.079681274900398,-8.129482071713147,-8.179282868525897,-8.229083665338646,-8.278884462151394,-8.328685258964143,-8.378486055776893,-8.428286852589641,-8.47808764940239,-8.52788844621514,-8.577689243027889,-8.627490039840637,-8.677290836653386,-8.727091633466136,-8.776892430278885,-8.826693227091633,-8.876494023904382,-8.926294820717132,-8.97609561752988,-9.025896414342629,-9.07569721115538,-9.125498007968128,-9.175298804780876,-9.225099601593625,-9.274900398406375,-9.324701195219124,-9.374501992031872,-9.42430278884462,-9.474103585657371,-9.52390438247012,-9.573705179282868,-9.623505976095618,-9.673306772908367,-9.723107569721115,-9.772908366533864,-9.822709163346614,-9.872509960159363,-9.922310756972111,-9.97211155378486,-10.02191235059761,-10.071713147410359,-10.121513944223107,-10.171314741035857,-10.221115537848606,-10.270916334661354,-10.320717131474103,-10.370517928286853,-10.420318725099602,-10.47011952191235,-10.5199203187251,-10.569721115537849,-10.619521912350598,-10.669322709163346,-10.719123505976096,-10.768924302788845,-10.818725099601593,-10.868525896414342,-10.918326693227092,-10.96812749003984,-11.01792828685259,-11.06772908366534,-11.117529880478088,-11.167330677290837,-11.217131474103585,-11.266932270916335,-11.316733067729084,-11.366533864541832,-11.41633466135458,-11.466135458167331,-11.51593625498008,-11.565737051792828,-11.615537848605578,-11.665338645418327,-11.715139442231076,-11.764940239043824,-11.814741035856574,-11.864541832669323,-11.914342629482071,-11.96414342629482,-12.01394422310757,-12.063745019920319,-12.113545816733067,-12.163346613545817,-12.213147410358566,-12.262948207171315,-12.312749003984063,-12.362549800796813,-12.412350597609562,-12.46215139442231,-12.51195219123506,-12.56175298804781,-12.611553784860558,-12.661354581673306,-12.711155378486056,-12.760956175298805,-12.810756972111554,-12.860557768924302,-12.910358565737052,-12.9601593625498,-13.00996015936255,-13.0597609561753,-13.109561752988048,-13.159362549800797,-13.209163346613545,-13.258964143426295,-13.308764940239044,-13.358565737051793,-13.408366533864541,-13.458167330677291,-13.50796812749004,-13.557768924302788,-13.607569721115539,-13.657370517928287,-13.707171314741036,-13.756972111553784,-13.806772908366534,-13.856573705179283,-13.906374501992032,-13.95617529880478,-14.00597609561753,-14.055776892430279,-14.105577689243027,-14.155378486055778,-14.205179282868526,-14.254980079681275,-14.304780876494023,-14.354581673306773,-14.404382470119522,-14.45418326693227,-14.50398406374502,-14.55378486055777,-14.603585657370518,-14.653386454183266,-14.703187250996017,-14.752988047808765,-14.802788844621514,-14.852589641434262,-14.902390438247012,-14.952191235059761,-15.00199203187251,-15.05179282868526,-15.101593625498008,-15.151394422310757,-15.201195219123505,-15.250996015936256,-15.300796812749004,-15.350597609561753,-15.400398406374501,-15.450199203187251,-15.5,-15.549800796812749,-15.599601593625499,-15.649402390438247,-15.699203187250996,-15.749003984063744,-15.798804780876495,-15.848605577689243,-15.898406374501992,-15.94820717131474,-15.99800796812749,-16.04780876494024,-16.09760956175299,-16.147410358565736,-16.197211155378486,-16.247011952191237,-16.296812749003983,-16.346613545816734,-16.39641434262948,-16.44621513944223,-16.49601593625498,-16.545816733067728,-16.595617529880478,-16.64541832669323,-16.695219123505975,-16.745019920318725,-16.794820717131476,-16.844621513944222,-16.894422310756973,-16.94422310756972,-16.99402390438247,-17.04382470119522,-17.093625498007967,-17.143426294820717,-17.193227091633467,-17.243027888446214,-17.292828685258964,-17.342629482071715,-17.39243027888446,-17.44223107569721,-17.49203187250996,-17.54183266932271,-17.59163346613546,-17.641434262948206,-17.691235059760956,-17.741035856573706,-17.790836653386453,-17.840637450199203,-17.890438247011954,-17.9402390438247,-17.99003984063745,-18.0398406374502,-18.089641434262948,-18.139442231075698,-18.189243027888445,-18.239043824701195,-18.288844621513945,-18.338645418326692,-18.388446215139442,-18.438247011952193,-18.48804780876494,-18.53784860557769,-18.58764940239044,-18.637450199203187,-18.687250996015937,-18.737051792828684,-18.786852589641434,-18.836653386454184,-18.88645418326693,-18.93625498007968,-18.98605577689243,-19.03585657370518,-19.08565737051793,-19.13545816733068,-19.185258964143426,-19.235059760956176,-19.284860557768923,-19.334661354581673,-19.384462151394423,-19.43426294820717,-19.48406374501992,-19.53386454183267,-19.583665338645417,-19.633466135458168,-19.683266932270918,-19.733067729083665,-19.782868525896415,-19.83266932270916,-19.882470119521912,-19.932270916334662,-19.98207171314741,-20.03187250996016,-20.08167330677291,-20.131474103585656,-20.181274900398407,-20.231075697211157,-20.280876494023904,-20.330677290836654,-20.3804780876494,-20.43027888446215,-20.4800796812749,-20.529880478087648,-20.5796812749004,-20.62948207171315,-20.679282868525895,-20.729083665338646,-20.778884462151396,-20.828685258964143,-20.878486055776893,-20.92828685258964,-20.97808764940239,-21.02788844621514,-21.077689243027887,-21.127490039840637,-21.177290836653388,-21.227091633466134,-21.276892430278885,-21.326693227091635,-21.37649402390438,-21.426294820717132,-21.47609561752988,-21.52589641434263,-21.57569721115538,-21.625498007968126,-21.675298804780876,-21.725099601593627,-21.774900398406373,-21.824701195219124,-21.874501992031874,-21.92430278884462,-21.97410358565737,-22.02390438247012,-22.073705179282868,-22.12350597609562,-22.173306772908365,-22.223107569721115,-22.272908366533866,-22.322709163346612,-22.372509960159363,-22.422310756972113,-22.47211155378486,-22.52191235059761,-22.57171314741036,-22.621513944223107,-22.671314741035857,-22.721115537848604,-22.770916334661354,-22.820717131474105,-22.87051792828685,-22.9203187250996,-22.970119521912352,-23.0199203187251,-23.06972111553785,-23.1195219123506,-23.169322709163346,-23.219123505976096,-23.268924302788843,-23.318725099601593,-23.368525896414344,-23.41832669322709,-23.46812749003984,-23.51792828685259,-23.567729083665338,-23.617529880478088,-23.66733067729084,-23.717131474103585,-23.766932270916335,-23.816733067729082,-23.866533864541832,-23.916334661354583,-23.96613545816733,-24.01593625498008,-24.06573705179283,-24.115537848605577,-24.165338645418327,-24.215139442231077,-24.264940239043824,-24.314741035856574,-24.36454183266932,-24.41434262948207,-24.46414342629482,-24.51394422310757,-24.56374501992032,-24.61354581673307,-24.663346613545816,-24.713147410358566,-24.762948207171316,-24.812749003984063,-24.862549800796813,-24.91235059760956,-24.96215139442231,-25.01195219123506,-25.061752988047807,-25.111553784860558,-25.161354581673308,-25.211155378486055,-25.260956175298805,-25.310756972111555,-25.360557768924302,-25.410358565737052,-25.4601593625498,-25.50996015936255,-25.5597609561753,-25.609561752988046,-25.659362549800797,-25.709163346613547,-25.758964143426294,-25.808764940239044,-25.858565737051794,-25.90836653386454,-25.95816733067729,-26.00796812749004,-26.05776892430279,-26.10756972111554,-26.157370517928285,-26.207171314741036,-26.256972111553786,-26.306772908366533,-26.356573705179283,-26.406374501992033,-26.45617529880478,-26.50597609561753,-26.55577689243028,-26.605577689243027,-26.655378486055778,-26.705179282868524,-26.754980079681275,-26.804780876494025,-26.85458167330677,-26.904382470119522,-26.954183266932272,-27.00398406374502,-27.05378486055777,-27.10358565737052,-27.153386454183266,-27.203187250996017,-27.252988047808763,-27.302788844621514,-27.352589641434264,-27.40239043824701,-27.45219123505976,-27.50199203187251,-27.551792828685258,-27.60159362549801,-27.65139442231076,-27.701195219123505,-27.750996015936256,-27.800796812749002,-27.850597609561753,-27.900398406374503,-27.95019920318725,-28.0]}
},{}],62:[function(require,module,exports){
module.exports={"expected":[1.8184464592320668,1.8340783073668,1.8494813604892717,1.8646618798755306,1.8796258881180774,1.8943791802213703,1.9089273341275603,1.923275720700717,1.9374295131969697,1.9513936962470653,1.9651730743768294,1.9787722800899739,1.9921957815366158,2.005447889789794,2.0185327657511913,2.0314544267062202,2.044216752547588,2.05682349168546,2.069278266661378,2.0815845794821426,2.0937458166889944,2.1057652541765695,2.1176460617752886,2.1293913076100854,2.14100396224762,2.1524869026434574,2.16384291590002,2.175074702845502,2.1861848814433613,2.1971759900414334,2.2080504904692106,2.2188107709913276,2.2294591491248283,2.239997874327378,2.250429130563143,2.2607550387527033,2.270977659112983,2.281098993392859,2.2911209870097715,2.3010455310923756,2.3108744644339803,2.3206095753612535,2.330252603522435,2.3398052415990502,2.3492691369449012,2.3586458931559076,2.3679370715741674,2.377144192729433,2.386268737721014,2.3953121495429626,2.4042758343552437,2.413161162703444,2.4219694706894392,2.4307020610953183,2.4393602044627274,2.4479451401296966,2.456458077226902,2.4649001956352077,2.473272646906249,2.4815765551477122,2.489813017874902,2.4979831068300866,2.5060878687710533,2.514128326230222,2.5221054782455994,2.5300203010648077,2.537873748823336,2.5456667541981286,2.553400229037554,2.561075064968764,2.5686921339833826,2.576252289002444,2.583756364421431,2.591205176636246,2.598599524550892,2.6059401900676105,2.6132279385601938,2.620463519331144,2.627647666053331,2.6347810971967682,2.641864516441089,2.648898613074298,2.6558840623783264,2.6628215260019115,2.669711652321281,2.676555076789129,2.683352422272312,2.6901042993787123,2.6968113067736614,2.703474031486334,2.7100930492064705,2.716668924571804,2.7232022114465195,2.7296934531910924,2.736143182923804,2.742551923774251,2.748920189129132,2.7552484828705865,2.7615372996073604,2.7677871248990455,2.7739984354736453,2.7801716994386925,2.786307376486154,2.792405918091336,2.798467767705989,2.8044933609458296,2.8104831257726515,2.8164374826712257,2.8223568448211536,2.828241618263856,2.8340922020648467,2.839908988471465,2.845692363066199,2.851442704915764,2.8571603867160587,2.8628457749331466,2.868499229940386,2.874121106151833,2.879711752152038,2.8852715108223546,2.8908007194638676,2.896299709917047,2.9017688086782374,2.9072083370130732,2.9126186110669265,2.917999941972466,2.923352635954431,2.9286769944316964,2.933973314116714,2.939241887112413,2.9444830010066307,2.9496969389641574,2.9548839798164552,2.960044398149132,2.9651784643872277,2.9702864448783863,2.9753686019739685,2.980425194108169,2.985456475875196,2.990462698104573,2.9954441079346106,3.0004009488841015,3.0053334609222992,3.010241880537219,3.0151264408023093,3.0199873714415495,3.024824898893006,3.0296392463708983,3.0344306339262133,3.0391992785059068,3.0439453940107377,3.0486691913517627,3.053370878505537,3.0580506605680524,3.062708739807446,3.0673453157155173,3.071960585058078,3.0765547419241766,3.081127977774218,3.0856804814870133,3.0902124394057835,3.0947240353831513,3.0992154508251413,3.103686864734218,3.108138453751384,3.112570392197367,3.1169828521129137,3.1213760032982183,3.125750013351506,3.1301050477067913,3.134441269670835,3.138758840459317,3.143057919232251,3.1473386631286497,3.151601227300468,3.155845764945842,3.160072427341631,3.164281363875298,3.1684727220761224,3.1726466476457835,3.1768032844883134,3.1809427747394428,3.1850652587953516,3.189170875340844,3.193259761376951,3.197332052247984,3.201387881668051,3.2054273817470404,3.2094506830161,3.2134579144526025,3.217449203504632,3.2214246761149843,3.2253844567447016,3.2293286683961537,3.233257432635669,3.237170869615731,3.2410690980967494,3.244952235468415,3.248820397770649,3.2526736997141508,3.256512254700563,3.2603361748422532,3.2641455709817255,3.2679405527106677,3.2717212283886483,3.275487705161461,3.279240088979133,3.282978484613601,3.286702995676064,3.290413724634015,3.2941107728279677,3.2977942404878737,3.3014642267492476,3.305120829668999,3.3087641462409785,3.3123942724112494,3.316011303093083,3.3196153321816904,3.3232064525686904,3.326784756156324,3.3303503338714195,3.33390327567911,3.3374436705963113,3.3409716067049713,3.344487171165079,3.3479904502274582,3.351481529246335,3.3549604926916916,3.358427424161407,3.3618824063931934,3.365325521276327,3.3687568498631792,3.372176472380558,3.3755844682408522,3.378980916052993,3.3823658936332297,3.3857394780157284,3.389101745462991,3.3924527714761052,3.395792630804823,3.399121397457474,3.402439144710717,3.4057459451191305,3.4090418705246486,3.412326992065842,3.4156013801870513,3.4188651046473675,3.4221182345294765,3.4253608382483534,3.4285929835598226,3.4318147375689803,3.435026166738482,3.4382273368967016,3.4414183132457596,3.4445991603694233,3.4477699422408867,3.4509307222304284,3.454081563112945,3.4572225270753743,3.4603536757239994,3.4634750700916395,3.4665867706447338,3.4696888372903114,3.472781329382858,3.4758643057310787,3.478937824604554,3.4820019437402965,3.4850567203492107,3.4881022111224533,3.4911384722376955,3.494165559365298,3.4971835276743857,3.5001924318388387,3.503192326043189,3.506183263988435,3.5091652988977646,3.512138483522198,3.5151028701461464,3.518058510592888,3.5210054562299673,3.523943757974511,3.526873466298473,3.5297946312337953,3.5327073023775033,3.5356115288967205,3.5385073595336154,3.5413948426102753,3.5442740260335146,3.547144957299607,3.5500076834989573,3.552862251320708,3.555708707057271,3.5585470966088097,3.561377465487645,3.564199858822608,3.567014321363331,3.5698208974844725,3.572619631189893,3.5754105661167657,3.578193745539633,3.5809692123744084,3.58373700918232,3.586497178173805,3.5892497612123457,3.591994799818256,3.5947323351724183,3.5974624081199646,3.6001850591739144,3.6029003285187566,3.605608256013989,3.6083088811976074,3.611002243289549,3.6136883811950904,3.6163673335081987,3.619039138514838,3.6217038341962375,3.6243614582321073,3.6270120480038206,3.6296556405975493,3.6322922728073586,3.634921981138264,3.6375448018092458,3.6401607707562254,3.6427699236350053,3.6453722958241648,3.647967922427925,3.6505568382789764,3.653139077941263,3.655714675712742,3.658283665628097,3.6608460814614268,3.6634019567288916,3.665951324691332,3.6684942183568494,3.6710306704833613,3.673560713581115,3.6760843799151783,3.678601701507895,3.6811127101413073,3.683617437359557,3.6861159144712436,3.6886081725517674,3.6910942424456326,3.693574154768727,3.696047939910575,3.698515628036557,3.70097724909011,3.703432832794893,3.7058824086569335,3.708326005966741,3.710763653801401,3.7131953810266385,3.715621216298861,3.7180411880671755,3.720455324575378,3.722863653863924,3.7252662037718745,3.727663001938815,3.7300540758067564,3.732439452622011,3.734819159437046,3.737193223112319,3.7395616703180825,3.7419245275361805,3.7442818210618123,3.746633577005282,3.7489798212937253,3.751320579672819,3.753655877708465,3.7559857407884616,3.75831019412415,3.760629262752045,3.7629429715354457,3.7652513451660288,3.76755440816542,3.769852184886755,3.772144699516213,3.7744319760745406,3.7767140384185556,3.7789909102426322,3.781262615080171,3.7835291763050547,3.785790617133082,3.7880469606233897,3.7902982296798586,3.7925444470525007,3.794785635338836,3.797021816985247,3.7992530142883254,3.801479249396199,3.803700544309846,3.8059169208843944,3.808128400830407,3.8103350057151513,3.8125367569638593,3.814733675860967,3.8169257835513477,3.8191131010415265,3.821295649200882,3.8234734487628406,3.825646520326049,3.827814884355542,3.8299785611838937,3.8321375710123555,3.834291933911986,3.8364416698247643,3.838586798564695,3.8407273398188986,3.8428633131486913,3.8449947379906564,3.8471216336576974,3.8492440193400874,3.851361914106503,3.8534753369050483,3.855584306564269,3.857688841794154,3.859788961187129,3.86188468321904,3.86397602625012,3.8660630085259564,3.868145648178439,3.870223963226703,3.872297971578063,3.8743676910289313,3.8764331392657354,3.8784943338658184,3.8805512922983354,3.8826040319251383,3.884652570001652,3.8866969236777402,3.888737109998568,3.890773145905447,3.892805048236679,3.89483283372839,3.8968565190153504,3.8988761206317957,3.9008916550122312,3.9029031384922335,3.904910587309241,3.906914017603339,3.908913445418034,3.9109088867010255,3.912900357304963,3.9148878729882006,3.9168714494155434,3.9188511021589854,3.9208268466984406,3.9227986984224668,3.924766672628984,3.926730784525981,3.928691049232222,3.930647481777941,3.9326000971055297,3.934548910070224,3.9364939354407746,3.9384351879001227,3.9403726820460574,3.942306432391876,3.944236453367033,3.9461627593177835,3.948085364507823,3.950004283118917,3.951919529251529,3.953831116925438,3.955739060080355,3.957643372576528,3.9595440681953478,3.9614411606399424,3.9633346635357687,3.9652245904311973,3.9671109547980934,3.9689937700323914,3.9708730494546636,3.972748806310683,3.9746210537719837,3.976489804936414,3.978355072828683,3.980216870400906,3.982075210533141,3.9839301060339216,3.9857815696407872,3.987629614020804,3.9894742517710853,3.9913154954193044,3.9931533574242044,3.9949878501761007,3.996818985997384,3.9986467771430125,4.0004712358010055,4.002292374092927,4.004110204074369,4.005924737735429,4.007735987001183,4.009543963732156,4.011348679724784,4.013150146711875,4.014948376363069,4.016743380285286,4.018535170023177,4.0203237570595665,4.022109152815895,4.023891368652656,4.025670415869822],"x":[3.0,3.049800796812749,3.099601593625498,3.149402390438247,3.199203187250996,3.249003984063745,3.298804780876494,3.348605577689243,3.398406374501992,3.448207171314741,3.49800796812749,3.547808764940239,3.597609561752988,3.647410358565737,3.697211155378486,3.747011952191235,3.7968127490039842,3.846613545816733,3.896414342629482,3.946215139442231,3.99601593625498,4.0458167330677295,4.095617529880478,4.145418326693227,4.195219123505976,4.245019920318725,4.294820717131474,4.344621513944223,4.394422310756972,4.444223107569721,4.49402390438247,4.543824701195219,4.5936254980079685,4.643426294820717,4.693227091633466,4.743027888446215,4.792828685258964,4.842629482071713,4.892430278884462,4.942231075697211,4.99203187250996,5.04183266932271,5.091633466135458,5.1414342629482075,5.191235059760956,5.241035856573705,5.290836653386454,5.340637450199203,5.390438247011952,5.440239043824701,5.49003984063745,5.539840637450199,5.589641434262949,5.639442231075697,5.6892430278884465,5.739043824701195,5.788844621513944,5.838645418326693,5.888446215139442,5.938247011952191,5.98804780876494,6.03784860557769,6.087649402390438,6.137450199203188,6.187250996015936,6.2370517928286855,6.286852589641434,6.336653386454183,6.386454183266932,6.436254980079681,6.48605577689243,6.535856573705179,6.585657370517929,6.635458167330677,6.685258964143427,6.735059760956175,6.7848605577689245,6.834661354581673,6.884462151394422,6.934262948207171,6.98406374501992,7.03386454183267,7.083665338645418,7.133466135458168,7.183266932270916,7.233067729083666,7.282868525896414,7.3326693227091635,7.382470119521912,7.432270916334661,7.48207171314741,7.531872509960159,7.581673306772909,7.631474103585657,7.681274900398407,7.731075697211155,7.780876494023905,7.830677290836653,7.8804780876494025,7.930278884462151,7.9800796812749,8.02988047808765,8.079681274900398,8.129482071713147,8.179282868525897,8.229083665338646,8.278884462151394,8.328685258964143,8.378486055776893,8.428286852589641,8.47808764940239,8.52788844621514,8.577689243027889,8.627490039840637,8.677290836653386,8.727091633466136,8.776892430278885,8.826693227091633,8.876494023904382,8.926294820717132,8.97609561752988,9.025896414342629,9.07569721115538,9.125498007968128,9.175298804780876,9.225099601593625,9.274900398406375,9.324701195219124,9.374501992031872,9.42430278884462,9.474103585657371,9.52390438247012,9.573705179282868,9.623505976095618,9.673306772908367,9.723107569721115,9.772908366533864,9.822709163346614,9.872509960159363,9.922310756972111,9.97211155378486,10.02191235059761,10.071713147410359,10.121513944223107,10.171314741035857,10.221115537848606,10.270916334661354,10.320717131474103,10.370517928286853,10.420318725099602,10.47011952191235,10.5199203187251,10.569721115537849,10.619521912350598,10.669322709163346,10.719123505976096,10.768924302788845,10.818725099601593,10.868525896414342,10.918326693227092,10.96812749003984,11.01792828685259,11.06772908366534,11.117529880478088,11.167330677290837,11.217131474103585,11.266932270916335,11.316733067729084,11.366533864541832,11.41633466135458,11.466135458167331,11.51593625498008,11.565737051792828,11.615537848605578,11.665338645418327,11.715139442231076,11.764940239043824,11.814741035856574,11.864541832669323,11.914342629482071,11.96414342629482,12.01394422310757,12.063745019920319,12.113545816733067,12.163346613545817,12.213147410358566,12.262948207171315,12.312749003984063,12.362549800796813,12.412350597609562,12.46215139442231,12.51195219123506,12.56175298804781,12.611553784860558,12.661354581673306,12.711155378486056,12.760956175298805,12.810756972111554,12.860557768924302,12.910358565737052,12.9601593625498,13.00996015936255,13.0597609561753,13.109561752988048,13.159362549800797,13.209163346613545,13.258964143426295,13.308764940239044,13.358565737051793,13.408366533864541,13.458167330677291,13.50796812749004,13.557768924302788,13.607569721115539,13.657370517928287,13.707171314741036,13.756972111553784,13.806772908366534,13.856573705179283,13.906374501992032,13.95617529880478,14.00597609561753,14.055776892430279,14.105577689243027,14.155378486055778,14.205179282868526,14.254980079681275,14.304780876494023,14.354581673306773,14.404382470119522,14.45418326693227,14.50398406374502,14.55378486055777,14.603585657370518,14.653386454183266,14.703187250996017,14.752988047808765,14.802788844621514,14.852589641434262,14.902390438247012,14.952191235059761,15.00199203187251,15.05179282868526,15.101593625498008,15.151394422310757,15.201195219123505,15.250996015936256,15.300796812749004,15.350597609561753,15.400398406374501,15.450199203187251,15.5,15.549800796812749,15.599601593625499,15.649402390438247,15.699203187250996,15.749003984063744,15.798804780876495,15.848605577689243,15.898406374501992,15.94820717131474,15.99800796812749,16.04780876494024,16.09760956175299,16.147410358565736,16.197211155378486,16.247011952191237,16.296812749003983,16.346613545816734,16.39641434262948,16.44621513944223,16.49601593625498,16.545816733067728,16.595617529880478,16.64541832669323,16.695219123505975,16.745019920318725,16.794820717131476,16.844621513944222,16.894422310756973,16.94422310756972,16.99402390438247,17.04382470119522,17.093625498007967,17.143426294820717,17.193227091633467,17.243027888446214,17.292828685258964,17.342629482071715,17.39243027888446,17.44223107569721,17.49203187250996,17.54183266932271,17.59163346613546,17.641434262948206,17.691235059760956,17.741035856573706,17.790836653386453,17.840637450199203,17.890438247011954,17.9402390438247,17.99003984063745,18.0398406374502,18.089641434262948,18.139442231075698,18.189243027888445,18.239043824701195,18.288844621513945,18.338645418326692,18.388446215139442,18.438247011952193,18.48804780876494,18.53784860557769,18.58764940239044,18.637450199203187,18.687250996015937,18.737051792828684,18.786852589641434,18.836653386454184,18.88645418326693,18.93625498007968,18.98605577689243,19.03585657370518,19.08565737051793,19.13545816733068,19.185258964143426,19.235059760956176,19.284860557768923,19.334661354581673,19.384462151394423,19.43426294820717,19.48406374501992,19.53386454183267,19.583665338645417,19.633466135458168,19.683266932270918,19.733067729083665,19.782868525896415,19.83266932270916,19.882470119521912,19.932270916334662,19.98207171314741,20.03187250996016,20.08167330677291,20.131474103585656,20.181274900398407,20.231075697211157,20.280876494023904,20.330677290836654,20.3804780876494,20.43027888446215,20.4800796812749,20.529880478087648,20.5796812749004,20.62948207171315,20.679282868525895,20.729083665338646,20.778884462151396,20.828685258964143,20.878486055776893,20.92828685258964,20.97808764940239,21.02788844621514,21.077689243027887,21.127490039840637,21.177290836653388,21.227091633466134,21.276892430278885,21.326693227091635,21.37649402390438,21.426294820717132,21.47609561752988,21.52589641434263,21.57569721115538,21.625498007968126,21.675298804780876,21.725099601593627,21.774900398406373,21.824701195219124,21.874501992031874,21.92430278884462,21.97410358565737,22.02390438247012,22.073705179282868,22.12350597609562,22.173306772908365,22.223107569721115,22.272908366533866,22.322709163346612,22.372509960159363,22.422310756972113,22.47211155378486,22.52191235059761,22.57171314741036,22.621513944223107,22.671314741035857,22.721115537848604,22.770916334661354,22.820717131474105,22.87051792828685,22.9203187250996,22.970119521912352,23.0199203187251,23.06972111553785,23.1195219123506,23.169322709163346,23.219123505976096,23.268924302788843,23.318725099601593,23.368525896414344,23.41832669322709,23.46812749003984,23.51792828685259,23.567729083665338,23.617529880478088,23.66733067729084,23.717131474103585,23.766932270916335,23.816733067729082,23.866533864541832,23.916334661354583,23.96613545816733,24.01593625498008,24.06573705179283,24.115537848605577,24.165338645418327,24.215139442231077,24.264940239043824,24.314741035856574,24.36454183266932,24.41434262948207,24.46414342629482,24.51394422310757,24.56374501992032,24.61354581673307,24.663346613545816,24.713147410358566,24.762948207171316,24.812749003984063,24.862549800796813,24.91235059760956,24.96215139442231,25.01195219123506,25.061752988047807,25.111553784860558,25.161354581673308,25.211155378486055,25.260956175298805,25.310756972111555,25.360557768924302,25.410358565737052,25.4601593625498,25.50996015936255,25.5597609561753,25.609561752988046,25.659362549800797,25.709163346613547,25.758964143426294,25.808764940239044,25.858565737051794,25.90836653386454,25.95816733067729,26.00796812749004,26.05776892430279,26.10756972111554,26.157370517928285,26.207171314741036,26.256972111553786,26.306772908366533,26.356573705179283,26.406374501992033,26.45617529880478,26.50597609561753,26.55577689243028,26.605577689243027,26.655378486055778,26.705179282868524,26.754980079681275,26.804780876494025,26.85458167330677,26.904382470119522,26.954183266932272,27.00398406374502,27.05378486055777,27.10358565737052,27.153386454183266,27.203187250996017,27.252988047808763,27.302788844621514,27.352589641434264,27.40239043824701,27.45219123505976,27.50199203187251,27.551792828685258,27.60159362549801,27.65139442231076,27.701195219123505,27.750996015936256,27.800796812749002,27.850597609561753,27.900398406374503,27.95019920318725,28.0]}
},{}],63:[function(require,module,exports){
module.exports={"expected":[-4.025670415869822,-4.03077647004319,-4.035856601095907,-4.040911070756253,-4.045940136811094,-4.050944053184585,-4.055923070014915,-4.060877433729144,-4.065807387116224,-4.07071316939821,-4.075595016299757,-4.080453160115921,-4.0852878297783315,-4.0900992509197795,-4.094887645937255,-4.099653234053492,-4.104396231377061,-4.10911685096104,-4.113815302860314,-4.118491794187543,-4.123146529167823,-4.127779709192085,-4.132391532869275,-4.13698219607733,-4.141551892012993,-4.146100811240503,-4.150629141739182,-4.15513706894995,-4.159624775820806,-4.1640924428512855,-4.168540248135942,-4.1729683674068605,-4.177376974075238,-4.181766239272058,-4.18613633188787,-4.190487418611717,-4.194819663969207,-4.19913323035978,-4.203428278093166,-4.207704965425072,-4.2119634485921065,-4.216203881845963,-4.220426417486895,-4.224631205896471,-4.2288183955696645,-4.232988133146259,-4.237140563441615,-4.241275829476793,-4.245394072508067,-4.2494954320558245,-4.253580045932884,-4.257648050272234,-4.261699579554216,-4.2657347666331535,-4.26975374276345,-4.273756637625171,-4.277743579349105,-4.281714694541339,-4.285670108307347,-4.289609944275598,-4.293534324620707,-4.29744337008614,-4.30133720000646,-4.305215932329165,-4.309079683636089,-4.312928569164394,-4.316762702827169,-4.320582197233623,-4.324387163708909,-4.328177712313563,-4.331953951862576,-4.335715989944115,-4.339463932937888,-4.343197886033172,-4.346917953246499,-4.350624237439019,-4.3543168403335475,-4.357995862531287,-4.361661403528259,-4.365313561731421,-4.3689524344745045,-4.3725781180335535,-4.376190707642194,-4.379790297506621,-4.383376980820319,-4.386950849778527,-4.390511995592434,-4.394060508503133,-4.397596477795322,-4.401119991810772,-4.404631137961551,-4.408130002743019,-4.4116166717466,-4.4150912296723295,-4.418553760341187,-4.422004346707209,-4.425443070869412,-4.428870014083485,-4.4322852567733095,-4.435688878542263,-4.439080958184343,-4.442461573695098,-4.445830802282379,-4.449188720376904,-4.452535403642654,-4.455870926987086,-4.45919536457119,-4.462508789819364,-4.465811275429141,-4.469102893380743,-4.472383714946488,-4.475653810700038,-4.478913250525504,-4.482162103626388,-4.485400438534398,-4.488628323118113,-4.491845824591501,-4.495053009522319,-4.49824994384036,-4.501436692845581,-4.504613321216098,-4.507779893016055,-4.5109364717033635,-4.514083120137334,-4.517219900586174,-4.520346874734376,-4.523464103689985,-4.526571647991766,-4.529669567616242,-4.53275792198464,-4.53583676996972,-4.538906169902503,-4.541966179578895,-4.5450168562662165,-4.548058256709618,-4.5510904371384155,-4.554113453272318,-4.557127360327569,-4.560132213022989,-4.563128065585931,-4.566114971758154,-4.569092984801593,-4.572062157504058,-4.575022542184844,-4.577974190700257,-4.5809171544490574,-4.5838514843778295,-4.586777230986266,-4.5896944443323795,-4.592603174037636,-4.595503469292021,-4.598395378859016,-4.601278951080523,-4.604154233881707,-4.607021274775768,-4.6098801208686515,-4.61273081886369,-4.615573415066172,-4.618407955387856,-4.621234485351417,-4.624053050094823,-4.6268636943756665,-4.6296664625754165,-4.6324613987036285,-4.635248546402079,-4.638027948948859,-4.640799649262401,-4.643563689905446,-4.646320113088973,-4.649068960676057,-4.651810274185681,-4.654544094796499,-4.657270463350544,-4.659989420356887,-4.662701005995238,-4.665405260119522,-4.668102222261377,-4.670791931633621,-4.67347442713368,-4.676149747346949,-4.678817930550127,-4.681479014714498,-4.684133037509172,-4.686780036304281,-4.689420048174137,-4.692053109900341,-4.69467925797486,-4.697298528603057,-4.6999109577066855,-4.702516580926841,-4.7051154336268795,-4.707707550895295,-4.710292967548556,-4.712871718133917,-4.715443836932178,-4.718009357960427,-4.720568314974726,-4.723120741472787,-4.725666670696589,-4.7282061356349825,-4.730739169026251,-4.733265803360636,-4.735786070882846,-4.738300003594517,-4.740807633256651,-4.743308991392019,-4.745804109287545,-4.748293017996644,-4.750775748341545,-4.753252330915579,-4.755722796085438,-4.758187173993408,-4.760645494559575,-4.763097787484004,-4.76554408224889,-4.767984408120682,-4.770418794152186,-4.772847269184636,-4.775269861849744,-4.777686600571724,-4.780097513569295,-4.78250262885765,-4.784901974250417,-4.787295577361579,-4.7896834656073874,-4.79206566620824,-4.794442206190543,-4.796813112388552,-4.799178411446186,-4.801538129818826,-4.8038922937750845,-4.806240929398567,-4.808584062589595,-4.810921719066928,-4.8132539243694525,-4.815580703857854,-4.817902082716273,-4.820218085953939,-4.822528738406786,-4.824834064739049,-4.8271340894448445,-4.829428836849732,-4.831718331112252,-4.8340025962254565,-4.836281656018415,-4.838555534157704,-4.840824254148885,-4.8430878393379535,-4.84534631291279,-4.847599697904577,-4.849848017189209,-4.85209129348869,-4.854329549372502,-4.856562807258976,-4.8587910894166315,-4.861014417965511,-4.863232814878499,-4.86544630198262,-4.867654900960328,-4.869858633350782,-4.872057520551107,-4.8742515838176335,-4.876440844267135,-4.8786253228780465,-4.88080504049167,-4.882980017813367,-4.885150275413732,-4.887315833729772,-4.88947671306605,-4.8916329335958295,-4.893784515362206,-4.895931478279224,-4.8980738421329795,-4.900211626582716,-4.9023448511619065,-4.904473535279323,-4.906597698220098,-4.9087173591467685,-4.9108325371003145,-4.9129432510011855,-4.9150495196503154,-4.917151361730126,-4.919248795805522,-4.9213418403248745,-4.923430513620992,-4.925514833912084,-4.927594819302718,-4.929670487784758,-4.931741857238301,-4.933808945432598,-4.935871770026969,-4.937930348571711,-4.9399846985089875,-4.942034837173721,-4.944080781794468,-4.946122549494284,-4.948160157291589,-4.950193622101013,-4.952222960734243,-4.954248189900851,-4.956269326209125,-4.958286386166881,-4.9602993861822755,-4.962308342564602,-4.964313271525088,-4.966314189177677,-4.968311111539805,-4.970304054533171,-4.9722930339844975,-4.974278065626283,-4.976259165097552,-4.978236347944591,-4.980209629621681,-4.982179025491822,-4.98414455082745,-4.986106220811148,-4.988064050536352,-4.990018055008038,-4.991968249143426,-4.993914647772651,-4.995857265639445,-4.997796117401806,-4.999731217632661,-5.001662580820524,-5.0035902213701435,-5.005514153603152,-5.0074343917587,-5.009350949994089,-5.011263842385398,-5.013173082928105,-5.015078685537699,-5.016980664050289,-5.018879032223204,-5.020773803735598,-5.022664992189031,-5.024552611108063,-5.026436673940825,-5.028317194059606,-5.030194184761411,-5.032067659268529,-5.033937630729095,-5.035804112217637,-5.037667116735631,-5.039526657212039,-5.041382746503849,-5.043235397396611,-5.045084622604959,-5.04693043477314,-5.04877284647553,-5.05061187021715,-5.05244751843417,-5.054279803494421,-5.056108737697888,-5.057934333277209,-5.0597566023981635,-5.061575557160162,-5.063391209596724,-5.065203571675959,-5.0670126553010375,-5.068818472310659,-5.0706210344795215,-5.072420353518774,-5.074216441076483,-5.076009308738075,-5.077798968026792,-5.07958543040413,-5.0813687072702844,-5.083148809964585,-5.084925749765924,-5.086699537893192,-5.088470185505696,-5.090237703703587,-5.092002103528271,-5.093763395962827,-5.095521591932417,-5.097276702304688,-5.099028737890182,-5.10077770944273,-5.102523627659849,-5.104266503183137,-5.106006346598657,-5.107743168437329,-5.109476979175308,-5.1112077892343635,-5.112935608982255,-5.11466044873311,-5.1163823187477835,-5.118101229234232,-5.119817190347874,-5.121530212191948,-5.123240304817874,-5.124947478225603,-5.1266517423639675,-5.1283531071310335,-5.130051582374441,-5.131747177891749,-5.133439903430773,-5.135129768689919,-5.1368167833185225,-5.138500956917174,-5.140182299038048,-5.141860819185228,-5.143536526815032,-5.145209431336324,-5.146879542110842,-5.148546868453501,-5.150211419632713,-5.151873204870693,-5.153532233343764,-5.1551885141826626,-5.156842056472842,-5.158492869254766,-5.160140961524212,-5.161786342232562,-5.163429020287088,-5.165069004551255,-5.166706303844996,-5.1683409269450005,-5.169972882584998,-5.171602179456038,-5.173228826206761,-5.174852831443686,-5.176474203731473,-5.178092951593199,-5.179709083510625,-5.181322607924463,-5.182933533234644,-5.184541867800572,-5.186147619941391,-5.187750797936243,-5.18935141002452,-5.190949464406123,-5.192544969241708,-5.194137932652941,-5.195728362722747,-5.197316267495547,-5.198901654977515,-5.20048453313681,-5.20206490990382,-5.2036427931714,-5.205218190795112,-5.20679111059345,-5.2083615603480835,-5.209929547804085,-5.2114950806701525,-5.213058166618848,-5.214618813286814,-5.216177028275002,-5.217732819148893,-5.219286193438718,-5.220837158639678,-5.222385722212157,-5.223931891581943,-5.225475674140435,-5.227017077244865,-5.228556108218493,-5.230092774350831,-5.231627082897844,-5.23315904108215,-5.234688656093232,-5.236215935087641,-5.237740885189187,-5.239263513489151,-5.24078382704647,-5.2423018328879465,-5.243817538008431,-5.245330949371025,-5.246842073907268,-5.248350918517327,-5.249857490070189,-5.251361795403848,-5.252863841325487,-5.2543636346116696,-5.255861182008516,-5.257356490231891,-5.258849565967584,-5.2603404158714815,-5.261829046569755,-5.263315464659032,-5.264799676706572,-5.266281689250439,-5.267761508799679,-5.269239141834488,-5.270714594806383,-5.272187874138368,-5.273658986225108,-5.2751279374330915,-5.2765947341007955,-5.27805938253885,-5.279521889030203,-5.28098225983028,-5.282440501167143,-5.283896619241654,-5.28535062022763,-5.286802510272002,-5.288252295494969,-5.289699981990154,-5.291145575824756,-5.292589083039707,-5.294030509649818,-5.29546986164393,-5.29690714498507,-5.298342365610589],"x":[-28.0,-28.143426294820717,-28.286852589641434,-28.43027888446215,-28.573705179282868,-28.717131474103585,-28.860557768924302,-29.00398406374502,-29.147410358565736,-29.290836653386453,-29.43426294820717,-29.577689243027887,-29.721115537848604,-29.86454183266932,-30.00796812749004,-30.15139442231076,-30.294820717131476,-30.438247011952193,-30.58167330677291,-30.725099601593627,-30.868525896414344,-31.01195219123506,-31.155378486055778,-31.298804780876495,-31.44223107569721,-31.58565737051793,-31.729083665338646,-31.872509960159363,-32.01593625498008,-32.1593625498008,-32.30278884462152,-32.44621513944223,-32.58964143426295,-32.733067729083665,-32.876494023904385,-33.0199203187251,-33.16334661354582,-33.30677290836653,-33.45019920318725,-33.59362549800797,-33.73705179282869,-33.8804780876494,-34.02390438247012,-34.167330677290835,-34.310756972111555,-34.45418326693227,-34.59760956175299,-34.7410358565737,-34.88446215139442,-35.02788844621514,-35.17131474103586,-35.31474103585657,-35.45816733067729,-35.601593625498005,-35.745019920318725,-35.88844621513944,-36.03187250996016,-36.17529880478088,-36.31872509960159,-36.462151394422314,-36.60557768924303,-36.74900398406375,-36.89243027888446,-37.03585657370518,-37.179282868525895,-37.322709163346616,-37.46613545816733,-37.60956175298805,-37.75298804780876,-37.896414342629484,-38.0398406374502,-38.18326693227092,-38.32669322709163,-38.47011952191235,-38.613545816733065,-38.756972111553786,-38.9003984063745,-39.04382470119522,-39.18725099601593,-39.330677290836654,-39.47410358565737,-39.61752988047809,-39.7609561752988,-39.90438247011952,-40.04780876494024,-40.191235059760956,-40.33466135458168,-40.47808764940239,-40.62151394422311,-40.764940239043824,-40.908366533864545,-41.05179282868526,-41.19521912350598,-41.33864541832669,-41.48207171314741,-41.625498007968126,-41.76892430278885,-41.91235059760956,-42.05577689243028,-42.199203187250994,-42.342629482071715,-42.48605577689243,-42.62948207171315,-42.77290836653386,-42.91633466135458,-43.059760956175296,-43.20318725099602,-43.34661354581673,-43.49003984063745,-43.633466135458164,-43.776892430278885,-43.9203187250996,-44.06374501992032,-44.20717131474104,-44.35059760956175,-44.49402390438247,-44.63745019920319,-44.78087649402391,-44.92430278884462,-45.06772908366534,-45.211155378486055,-45.354581673306775,-45.49800796812749,-45.64143426294821,-45.78486055776892,-45.92828685258964,-46.07171314741036,-46.21513944223108,-46.35856573705179,-46.50199203187251,-46.645418326693225,-46.788844621513945,-46.93227091633466,-47.07569721115538,-47.21912350597609,-47.36254980079681,-47.50597609561753,-47.64940239043825,-47.79282868525896,-47.93625498007968,-48.0796812749004,-48.223107569721115,-48.366533864541836,-48.50996015936255,-48.65338645418327,-48.79681274900398,-48.940239043824704,-49.08366533864542,-49.22709163346614,-49.37051792828685,-49.51394422310757,-49.657370517928285,-49.800796812749006,-49.94422310756972,-50.08764940239044,-50.23107569721115,-50.374501992031874,-50.51792828685259,-50.66135458167331,-50.80478087649402,-50.94820717131474,-51.091633466135455,-51.235059760956176,-51.37848605577689,-51.52191235059761,-51.66533864541832,-51.808764940239044,-51.95219123505976,-52.09561752988048,-52.2390438247012,-52.38247011952191,-52.52589641434263,-52.669322709163346,-52.81274900398407,-52.95617529880478,-53.0996015936255,-53.243027888446214,-53.386454183266935,-53.52988047808765,-53.67330677290837,-53.81673306772908,-53.9601593625498,-54.103585657370516,-54.24701195219124,-54.39043824701195,-54.53386454183267,-54.677290836653384,-54.820717131474105,-54.96414342629482,-55.10756972111554,-55.25099601593625,-55.39442231075697,-55.537848605577686,-55.68127490039841,-55.82470119521912,-55.96812749003984,-56.11155378486056,-56.254980079681275,-56.398406374501995,-56.54183266932271,-56.68525896414343,-56.82868525896414,-56.97211155378486,-57.11553784860558,-57.2589641434263,-57.40239043824701,-57.54581673306773,-57.689243027888445,-57.832669322709165,-57.97609561752988,-58.1195219123506,-58.26294820717131,-58.40637450199203,-58.54980079681275,-58.69322709163347,-58.83665338645418,-58.9800796812749,-59.123505976095615,-59.266932270916335,-59.41035856573705,-59.55378486055777,-59.69721115537848,-59.8406374501992,-59.98406374501992,-60.12749003984064,-60.27091633466136,-60.41434262948207,-60.55776892430279,-60.701195219123505,-60.844621513944226,-60.98804780876494,-61.13147410358566,-61.27490039840637,-61.418326693227094,-61.56175298804781,-61.70517928286853,-61.84860557768924,-61.99203187250996,-62.135458167330675,-62.278884462151396,-62.42231075697211,-62.56573705179283,-62.70916334661354,-62.852589641434264,-62.99601593625498,-63.1394422310757,-63.28286852589641,-63.42629482071713,-63.569721115537845,-63.713147410358566,-63.85657370517928,-64.0,-64.14342629482071,-64.28685258964144,-64.43027888446215,-64.57370517928287,-64.71713147410358,-64.86055776892431,-65.00398406374502,-65.14741035856574,-65.29083665338645,-65.43426294820718,-65.57768924302789,-65.7211155378486,-65.86454183266932,-66.00796812749005,-66.15139442231076,-66.29482071713147,-66.43824701195219,-66.58167330677291,-66.72509960159363,-66.86852589641434,-67.01195219123505,-67.15537848605578,-67.2988047808765,-67.44223107569721,-67.58565737051792,-67.72908366533865,-67.87250996015936,-68.01593625498008,-68.1593625498008,-68.30278884462152,-68.44621513944223,-68.58964143426294,-68.73306772908367,-68.87649402390439,-69.0199203187251,-69.16334661354581,-69.30677290836654,-69.45019920318725,-69.59362549800797,-69.73705179282868,-69.88047808764941,-70.02390438247012,-70.16733067729083,-70.31075697211155,-70.45418326693228,-70.59760956175299,-70.7410358565737,-70.88446215139442,-71.02788844621514,-71.17131474103586,-71.31474103585657,-71.45816733067728,-71.60159362549801,-71.74501992031873,-71.88844621513944,-72.03187250996017,-72.17529880478088,-72.3187250996016,-72.4621513944223,-72.60557768924303,-72.74900398406375,-72.89243027888446,-73.03585657370517,-73.1792828685259,-73.32270916334662,-73.46613545816733,-73.60956175298804,-73.75298804780877,-73.89641434262948,-74.0398406374502,-74.18326693227091,-74.32669322709164,-74.47011952191235,-74.61354581673307,-74.75697211155378,-74.9003984063745,-75.04382470119522,-75.18725099601593,-75.33067729083665,-75.47410358565737,-75.61752988047809,-75.7609561752988,-75.90438247011951,-76.04780876494024,-76.19123505976096,-76.33466135458167,-76.4780876494024,-76.62151394422311,-76.76494023904382,-76.90836653386454,-77.05179282868527,-77.19521912350598,-77.33864541832669,-77.4820717131474,-77.62549800796813,-77.76892430278885,-77.91235059760956,-78.05577689243027,-78.199203187251,-78.34262948207171,-78.48605577689243,-78.62948207171314,-78.77290836653387,-78.91633466135458,-79.0597609561753,-79.20318725099601,-79.34661354581674,-79.49003984063745,-79.63346613545816,-79.77689243027888,-79.9203187250996,-80.06374501992032,-80.20717131474103,-80.35059760956176,-80.49402390438247,-80.63745019920319,-80.7808764940239,-80.92430278884463,-81.06772908366534,-81.21115537848605,-81.35458167330677,-81.4980079681275,-81.64143426294821,-81.78486055776892,-81.92828685258964,-82.07171314741036,-82.21513944223108,-82.35856573705179,-82.5019920318725,-82.64541832669323,-82.78884462151395,-82.93227091633466,-83.07569721115537,-83.2191235059761,-83.36254980079681,-83.50597609561753,-83.64940239043824,-83.79282868525897,-83.93625498007968,-84.0796812749004,-84.22310756972112,-84.36653386454184,-84.50996015936255,-84.65338645418326,-84.79681274900399,-84.9402390438247,-85.08366533864542,-85.22709163346613,-85.37051792828686,-85.51394422310757,-85.65737051792829,-85.800796812749,-85.94422310756973,-86.08764940239044,-86.23107569721115,-86.37450199203187,-86.5179282868526,-86.66135458167331,-86.80478087649402,-86.94820717131473,-87.09163346613546,-87.23505976095618,-87.37848605577689,-87.5219123505976,-87.66533864541833,-87.80876494023904,-87.95219123505976,-88.09561752988049,-88.2390438247012,-88.38247011952191,-88.52589641434263,-88.66932270916335,-88.81274900398407,-88.95617529880478,-89.0996015936255,-89.24302788844622,-89.38645418326693,-89.52988047808765,-89.67330677290836,-89.81673306772909,-89.9601593625498,-90.10358565737052,-90.24701195219123,-90.39043824701196,-90.53386454183267,-90.67729083665338,-90.8207171314741,-90.96414342629483,-91.10756972111554,-91.25099601593625,-91.39442231075697,-91.5378486055777,-91.6812749003984,-91.82470119521912,-91.96812749003983,-92.11155378486056,-92.25498007968127,-92.39840637450199,-92.54183266932272,-92.68525896414343,-92.82868525896414,-92.97211155378486,-93.11553784860558,-93.2589641434263,-93.40239043824701,-93.54581673306772,-93.68924302788845,-93.83266932270917,-93.97609561752988,-94.11952191235059,-94.26294820717132,-94.40637450199203,-94.54980079681275,-94.69322709163346,-94.83665338645419,-94.9800796812749,-95.12350597609561,-95.26693227091633,-95.41035856573706,-95.55378486055777,-95.69721115537848,-95.8406374501992,-95.98406374501992,-96.12749003984064,-96.27091633466135,-96.41434262948208,-96.55776892430279,-96.7011952191235,-96.84462151394422,-96.98804780876495,-97.13147410358566,-97.27490039840637,-97.41832669322709,-97.56175298804781,-97.70517928286853,-97.84860557768924,-97.99203187250995,-98.13545816733068,-98.2788844621514,-98.42231075697211,-98.56573705179282,-98.70916334661355,-98.85258964143426,-98.99601593625498,-99.13944223107569,-99.28286852589642,-99.42629482071713,-99.56972111553785,-99.71314741035856,-99.85657370517929,-100.0]}
},{}],64:[function(require,module,exports){
module.exports={"expected":[4.025670415869822,4.03077647004319,4.035856601095907,4.040911070756253,4.045940136811094,4.050944053184585,4.055923070014915,4.060877433729144,4.065807387116224,4.07071316939821,4.075595016299757,4.080453160115921,4.0852878297783315,4.0900992509197795,4.094887645937255,4.099653234053492,4.104396231377061,4.10911685096104,4.113815302860314,4.118491794187543,4.123146529167823,4.127779709192085,4.132391532869275,4.13698219607733,4.141551892012993,4.146100811240503,4.150629141739182,4.15513706894995,4.159624775820806,4.1640924428512855,4.168540248135942,4.1729683674068605,4.177376974075238,4.181766239272058,4.18613633188787,4.190487418611717,4.194819663969207,4.19913323035978,4.203428278093166,4.207704965425072,4.2119634485921065,4.216203881845963,4.220426417486895,4.224631205896471,4.2288183955696645,4.232988133146259,4.237140563441615,4.241275829476793,4.245394072508067,4.2494954320558245,4.253580045932884,4.257648050272234,4.261699579554216,4.2657347666331535,4.26975374276345,4.273756637625171,4.277743579349105,4.281714694541339,4.285670108307347,4.289609944275598,4.293534324620707,4.29744337008614,4.30133720000646,4.305215932329165,4.309079683636089,4.312928569164394,4.316762702827169,4.320582197233623,4.324387163708909,4.328177712313563,4.331953951862576,4.335715989944115,4.339463932937888,4.343197886033172,4.346917953246499,4.350624237439019,4.3543168403335475,4.357995862531287,4.361661403528259,4.365313561731421,4.3689524344745045,4.3725781180335535,4.376190707642194,4.379790297506621,4.383376980820319,4.386950849778527,4.390511995592434,4.394060508503133,4.397596477795322,4.401119991810772,4.404631137961551,4.408130002743019,4.4116166717466,4.4150912296723295,4.418553760341187,4.422004346707209,4.425443070869412,4.428870014083485,4.4322852567733095,4.435688878542263,4.439080958184343,4.442461573695098,4.445830802282379,4.449188720376904,4.452535403642654,4.455870926987086,4.45919536457119,4.462508789819364,4.465811275429141,4.469102893380743,4.472383714946488,4.475653810700038,4.478913250525504,4.482162103626388,4.485400438534398,4.488628323118113,4.491845824591501,4.495053009522319,4.49824994384036,4.501436692845581,4.504613321216098,4.507779893016055,4.5109364717033635,4.514083120137334,4.517219900586174,4.520346874734376,4.523464103689985,4.526571647991766,4.529669567616242,4.53275792198464,4.53583676996972,4.538906169902503,4.541966179578895,4.5450168562662165,4.548058256709618,4.5510904371384155,4.554113453272318,4.557127360327569,4.560132213022989,4.563128065585931,4.566114971758154,4.569092984801593,4.572062157504058,4.575022542184844,4.577974190700257,4.5809171544490574,4.5838514843778295,4.586777230986266,4.5896944443323795,4.592603174037636,4.595503469292021,4.598395378859016,4.601278951080523,4.604154233881707,4.607021274775768,4.6098801208686515,4.61273081886369,4.615573415066172,4.618407955387856,4.621234485351417,4.624053050094823,4.6268636943756665,4.6296664625754165,4.6324613987036285,4.635248546402079,4.638027948948859,4.640799649262401,4.643563689905446,4.646320113088973,4.649068960676057,4.651810274185681,4.654544094796499,4.657270463350544,4.659989420356887,4.662701005995238,4.665405260119522,4.668102222261377,4.670791931633621,4.67347442713368,4.676149747346949,4.678817930550127,4.681479014714498,4.684133037509172,4.686780036304281,4.689420048174137,4.692053109900341,4.69467925797486,4.697298528603057,4.6999109577066855,4.702516580926841,4.7051154336268795,4.707707550895295,4.710292967548556,4.712871718133917,4.715443836932178,4.718009357960427,4.720568314974726,4.723120741472787,4.725666670696589,4.7282061356349825,4.730739169026251,4.733265803360636,4.735786070882846,4.738300003594517,4.740807633256651,4.743308991392019,4.745804109287545,4.748293017996644,4.750775748341545,4.753252330915579,4.755722796085438,4.758187173993408,4.760645494559575,4.763097787484004,4.76554408224889,4.767984408120682,4.770418794152186,4.772847269184636,4.775269861849744,4.777686600571724,4.780097513569295,4.78250262885765,4.784901974250417,4.787295577361579,4.7896834656073874,4.79206566620824,4.794442206190543,4.796813112388552,4.799178411446186,4.801538129818826,4.8038922937750845,4.806240929398567,4.808584062589595,4.810921719066928,4.8132539243694525,4.815580703857854,4.817902082716273,4.820218085953939,4.822528738406786,4.824834064739049,4.8271340894448445,4.829428836849732,4.831718331112252,4.8340025962254565,4.836281656018415,4.838555534157704,4.840824254148885,4.8430878393379535,4.84534631291279,4.847599697904577,4.849848017189209,4.85209129348869,4.854329549372502,4.856562807258976,4.8587910894166315,4.861014417965511,4.863232814878499,4.86544630198262,4.867654900960328,4.869858633350782,4.872057520551107,4.8742515838176335,4.876440844267135,4.8786253228780465,4.88080504049167,4.882980017813367,4.885150275413732,4.887315833729772,4.88947671306605,4.8916329335958295,4.893784515362206,4.895931478279224,4.8980738421329795,4.900211626582716,4.9023448511619065,4.904473535279323,4.906597698220098,4.9087173591467685,4.9108325371003145,4.9129432510011855,4.9150495196503154,4.917151361730126,4.919248795805522,4.9213418403248745,4.923430513620992,4.925514833912084,4.927594819302718,4.929670487784758,4.931741857238301,4.933808945432598,4.935871770026969,4.937930348571711,4.9399846985089875,4.942034837173721,4.944080781794468,4.946122549494284,4.948160157291589,4.950193622101013,4.952222960734243,4.954248189900851,4.956269326209125,4.958286386166881,4.9602993861822755,4.962308342564602,4.964313271525088,4.966314189177677,4.968311111539805,4.970304054533171,4.9722930339844975,4.974278065626283,4.976259165097552,4.978236347944591,4.980209629621681,4.982179025491822,4.98414455082745,4.986106220811148,4.988064050536352,4.990018055008038,4.991968249143426,4.993914647772651,4.995857265639445,4.997796117401806,4.999731217632661,5.001662580820524,5.0035902213701435,5.005514153603152,5.0074343917587,5.009350949994089,5.011263842385398,5.013173082928105,5.015078685537699,5.016980664050289,5.018879032223204,5.020773803735598,5.022664992189031,5.024552611108063,5.026436673940825,5.028317194059606,5.030194184761411,5.032067659268529,5.033937630729095,5.035804112217637,5.037667116735631,5.039526657212039,5.041382746503849,5.043235397396611,5.045084622604959,5.04693043477314,5.04877284647553,5.05061187021715,5.05244751843417,5.054279803494421,5.056108737697888,5.057934333277209,5.0597566023981635,5.061575557160162,5.063391209596724,5.065203571675959,5.0670126553010375,5.068818472310659,5.0706210344795215,5.072420353518774,5.074216441076483,5.076009308738075,5.077798968026792,5.07958543040413,5.0813687072702844,5.083148809964585,5.084925749765924,5.086699537893192,5.088470185505696,5.090237703703587,5.092002103528271,5.093763395962827,5.095521591932417,5.097276702304688,5.099028737890182,5.10077770944273,5.102523627659849,5.104266503183137,5.106006346598657,5.107743168437329,5.109476979175308,5.1112077892343635,5.112935608982255,5.11466044873311,5.1163823187477835,5.118101229234232,5.119817190347874,5.121530212191948,5.123240304817874,5.124947478225603,5.1266517423639675,5.1283531071310335,5.130051582374441,5.131747177891749,5.133439903430773,5.135129768689919,5.1368167833185225,5.138500956917174,5.140182299038048,5.141860819185228,5.143536526815032,5.145209431336324,5.146879542110842,5.148546868453501,5.150211419632713,5.151873204870693,5.153532233343764,5.1551885141826626,5.156842056472842,5.158492869254766,5.160140961524212,5.161786342232562,5.163429020287088,5.165069004551255,5.166706303844996,5.1683409269450005,5.169972882584998,5.171602179456038,5.173228826206761,5.174852831443686,5.176474203731473,5.178092951593199,5.179709083510625,5.181322607924463,5.182933533234644,5.184541867800572,5.186147619941391,5.187750797936243,5.18935141002452,5.190949464406123,5.192544969241708,5.194137932652941,5.195728362722747,5.197316267495547,5.198901654977515,5.20048453313681,5.20206490990382,5.2036427931714,5.205218190795112,5.20679111059345,5.2083615603480835,5.209929547804085,5.2114950806701525,5.213058166618848,5.214618813286814,5.216177028275002,5.217732819148893,5.219286193438718,5.220837158639678,5.222385722212157,5.223931891581943,5.225475674140435,5.227017077244865,5.228556108218493,5.230092774350831,5.231627082897844,5.23315904108215,5.234688656093232,5.236215935087641,5.237740885189187,5.239263513489151,5.24078382704647,5.2423018328879465,5.243817538008431,5.245330949371025,5.246842073907268,5.248350918517327,5.249857490070189,5.251361795403848,5.252863841325487,5.2543636346116696,5.255861182008516,5.257356490231891,5.258849565967584,5.2603404158714815,5.261829046569755,5.263315464659032,5.264799676706572,5.266281689250439,5.267761508799679,5.269239141834488,5.270714594806383,5.272187874138368,5.273658986225108,5.2751279374330915,5.2765947341007955,5.27805938253885,5.279521889030203,5.28098225983028,5.282440501167143,5.283896619241654,5.28535062022763,5.286802510272002,5.288252295494969,5.289699981990154,5.291145575824756,5.292589083039707,5.294030509649818,5.29546986164393,5.29690714498507,5.298342365610589],"x":[28.0,28.143426294820717,28.286852589641434,28.43027888446215,28.573705179282868,28.717131474103585,28.860557768924302,29.00398406374502,29.147410358565736,29.290836653386453,29.43426294820717,29.577689243027887,29.721115537848604,29.86454183266932,30.00796812749004,30.15139442231076,30.294820717131476,30.438247011952193,30.58167330677291,30.725099601593627,30.868525896414344,31.01195219123506,31.155378486055778,31.298804780876495,31.44223107569721,31.58565737051793,31.729083665338646,31.872509960159363,32.01593625498008,32.1593625498008,32.30278884462152,32.44621513944223,32.58964143426295,32.733067729083665,32.876494023904385,33.0199203187251,33.16334661354582,33.30677290836653,33.45019920318725,33.59362549800797,33.73705179282869,33.8804780876494,34.02390438247012,34.167330677290835,34.310756972111555,34.45418326693227,34.59760956175299,34.7410358565737,34.88446215139442,35.02788844621514,35.17131474103586,35.31474103585657,35.45816733067729,35.601593625498005,35.745019920318725,35.88844621513944,36.03187250996016,36.17529880478088,36.31872509960159,36.462151394422314,36.60557768924303,36.74900398406375,36.89243027888446,37.03585657370518,37.179282868525895,37.322709163346616,37.46613545816733,37.60956175298805,37.75298804780876,37.896414342629484,38.0398406374502,38.18326693227092,38.32669322709163,38.47011952191235,38.613545816733065,38.756972111553786,38.9003984063745,39.04382470119522,39.18725099601593,39.330677290836654,39.47410358565737,39.61752988047809,39.7609561752988,39.90438247011952,40.04780876494024,40.191235059760956,40.33466135458168,40.47808764940239,40.62151394422311,40.764940239043824,40.908366533864545,41.05179282868526,41.19521912350598,41.33864541832669,41.48207171314741,41.625498007968126,41.76892430278885,41.91235059760956,42.05577689243028,42.199203187250994,42.342629482071715,42.48605577689243,42.62948207171315,42.77290836653386,42.91633466135458,43.059760956175296,43.20318725099602,43.34661354581673,43.49003984063745,43.633466135458164,43.776892430278885,43.9203187250996,44.06374501992032,44.20717131474104,44.35059760956175,44.49402390438247,44.63745019920319,44.78087649402391,44.92430278884462,45.06772908366534,45.211155378486055,45.354581673306775,45.49800796812749,45.64143426294821,45.78486055776892,45.92828685258964,46.07171314741036,46.21513944223108,46.35856573705179,46.50199203187251,46.645418326693225,46.788844621513945,46.93227091633466,47.07569721115538,47.21912350597609,47.36254980079681,47.50597609561753,47.64940239043825,47.79282868525896,47.93625498007968,48.0796812749004,48.223107569721115,48.366533864541836,48.50996015936255,48.65338645418327,48.79681274900398,48.940239043824704,49.08366533864542,49.22709163346614,49.37051792828685,49.51394422310757,49.657370517928285,49.800796812749006,49.94422310756972,50.08764940239044,50.23107569721115,50.374501992031874,50.51792828685259,50.66135458167331,50.80478087649402,50.94820717131474,51.091633466135455,51.235059760956176,51.37848605577689,51.52191235059761,51.66533864541832,51.808764940239044,51.95219123505976,52.09561752988048,52.2390438247012,52.38247011952191,52.52589641434263,52.669322709163346,52.81274900398407,52.95617529880478,53.0996015936255,53.243027888446214,53.386454183266935,53.52988047808765,53.67330677290837,53.81673306772908,53.9601593625498,54.103585657370516,54.24701195219124,54.39043824701195,54.53386454183267,54.677290836653384,54.820717131474105,54.96414342629482,55.10756972111554,55.25099601593625,55.39442231075697,55.537848605577686,55.68127490039841,55.82470119521912,55.96812749003984,56.11155378486056,56.254980079681275,56.398406374501995,56.54183266932271,56.68525896414343,56.82868525896414,56.97211155378486,57.11553784860558,57.2589641434263,57.40239043824701,57.54581673306773,57.689243027888445,57.832669322709165,57.97609561752988,58.1195219123506,58.26294820717131,58.40637450199203,58.54980079681275,58.69322709163347,58.83665338645418,58.9800796812749,59.123505976095615,59.266932270916335,59.41035856573705,59.55378486055777,59.69721115537848,59.8406374501992,59.98406374501992,60.12749003984064,60.27091633466136,60.41434262948207,60.55776892430279,60.701195219123505,60.844621513944226,60.98804780876494,61.13147410358566,61.27490039840637,61.418326693227094,61.56175298804781,61.70517928286853,61.84860557768924,61.99203187250996,62.135458167330675,62.278884462151396,62.42231075697211,62.56573705179283,62.70916334661354,62.852589641434264,62.99601593625498,63.1394422310757,63.28286852589641,63.42629482071713,63.569721115537845,63.713147410358566,63.85657370517928,64.0,64.14342629482071,64.28685258964144,64.43027888446215,64.57370517928287,64.71713147410358,64.86055776892431,65.00398406374502,65.14741035856574,65.29083665338645,65.43426294820718,65.57768924302789,65.7211155378486,65.86454183266932,66.00796812749005,66.15139442231076,66.29482071713147,66.43824701195219,66.58167330677291,66.72509960159363,66.86852589641434,67.01195219123505,67.15537848605578,67.2988047808765,67.44223107569721,67.58565737051792,67.72908366533865,67.87250996015936,68.01593625498008,68.1593625498008,68.30278884462152,68.44621513944223,68.58964143426294,68.73306772908367,68.87649402390439,69.0199203187251,69.16334661354581,69.30677290836654,69.45019920318725,69.59362549800797,69.73705179282868,69.88047808764941,70.02390438247012,70.16733067729083,70.31075697211155,70.45418326693228,70.59760956175299,70.7410358565737,70.88446215139442,71.02788844621514,71.17131474103586,71.31474103585657,71.45816733067728,71.60159362549801,71.74501992031873,71.88844621513944,72.03187250996017,72.17529880478088,72.3187250996016,72.4621513944223,72.60557768924303,72.74900398406375,72.89243027888446,73.03585657370517,73.1792828685259,73.32270916334662,73.46613545816733,73.60956175298804,73.75298804780877,73.89641434262948,74.0398406374502,74.18326693227091,74.32669322709164,74.47011952191235,74.61354581673307,74.75697211155378,74.9003984063745,75.04382470119522,75.18725099601593,75.33067729083665,75.47410358565737,75.61752988047809,75.7609561752988,75.90438247011951,76.04780876494024,76.19123505976096,76.33466135458167,76.4780876494024,76.62151394422311,76.76494023904382,76.90836653386454,77.05179282868527,77.19521912350598,77.33864541832669,77.4820717131474,77.62549800796813,77.76892430278885,77.91235059760956,78.05577689243027,78.199203187251,78.34262948207171,78.48605577689243,78.62948207171314,78.77290836653387,78.91633466135458,79.0597609561753,79.20318725099601,79.34661354581674,79.49003984063745,79.63346613545816,79.77689243027888,79.9203187250996,80.06374501992032,80.20717131474103,80.35059760956176,80.49402390438247,80.63745019920319,80.7808764940239,80.92430278884463,81.06772908366534,81.21115537848605,81.35458167330677,81.4980079681275,81.64143426294821,81.78486055776892,81.92828685258964,82.07171314741036,82.21513944223108,82.35856573705179,82.5019920318725,82.64541832669323,82.78884462151395,82.93227091633466,83.07569721115537,83.2191235059761,83.36254980079681,83.50597609561753,83.64940239043824,83.79282868525897,83.93625498007968,84.0796812749004,84.22310756972112,84.36653386454184,84.50996015936255,84.65338645418326,84.79681274900399,84.9402390438247,85.08366533864542,85.22709163346613,85.37051792828686,85.51394422310757,85.65737051792829,85.800796812749,85.94422310756973,86.08764940239044,86.23107569721115,86.37450199203187,86.5179282868526,86.66135458167331,86.80478087649402,86.94820717131473,87.09163346613546,87.23505976095618,87.37848605577689,87.5219123505976,87.66533864541833,87.80876494023904,87.95219123505976,88.09561752988049,88.2390438247012,88.38247011952191,88.52589641434263,88.66932270916335,88.81274900398407,88.95617529880478,89.0996015936255,89.24302788844622,89.38645418326693,89.52988047808765,89.67330677290836,89.81673306772909,89.9601593625498,90.10358565737052,90.24701195219123,90.39043824701196,90.53386454183267,90.67729083665338,90.8207171314741,90.96414342629483,91.10756972111554,91.25099601593625,91.39442231075697,91.5378486055777,91.6812749003984,91.82470119521912,91.96812749003983,92.11155378486056,92.25498007968127,92.39840637450199,92.54183266932272,92.68525896414343,92.82868525896414,92.97211155378486,93.11553784860558,93.2589641434263,93.40239043824701,93.54581673306772,93.68924302788845,93.83266932270917,93.97609561752988,94.11952191235059,94.26294820717132,94.40637450199203,94.54980079681275,94.69322709163346,94.83665338645419,94.9800796812749,95.12350597609561,95.26693227091633,95.41035856573706,95.55378486055777,95.69721115537848,95.8406374501992,95.98406374501992,96.12749003984064,96.27091633466135,96.41434262948208,96.55776892430279,96.7011952191235,96.84462151394422,96.98804780876495,97.13147410358566,97.27490039840637,97.41832669322709,97.56175298804781,97.70517928286853,97.84860557768924,97.99203187250995,98.13545816733068,98.2788844621514,98.42231075697211,98.56573705179282,98.70916334661355,98.85258964143426,98.99601593625498,99.13944223107569,99.28286852589642,99.42629482071713,99.56972111553785,99.71314741035856,99.85657370517929,100.0]}
},{}],65:[function(require,module,exports){
module.exports={"expected":[-0.881373587019543,-0.8841879414415139,-0.8869966952115446,-0.889799859606722,-0.8925974459675294,-0.895389465696171,-0.8981759302549194,-0.9009568511644865,-0.9037322400024143,-0.9065021084014879,-0.9092664680481705,-0.9120253306810584,-0.9147787080893591,-0.9175266121113876,-0.9202690546330863,-0.9230060475865629,-0.9257376029486509,-0.9284637327394891,-0.931184449021121,-0.9338997638961148,-0.9366096895062032,-0.9393142380309416,-0.9420134216863869,-0.9447072527237945,-0.9473957434283358,-0.9500789061178323,-0.9527567531415096,-0.955429296878771,-0.9580965497379865,-0.9607585241553029,-0.9634152325934697,-0.9660666875406838,-0.968712901509451,-0.9713538870354661,-0.9739896566765089,-0.9766202230113581,-0.9792455986387214,-0.9818657961761822,-0.9844808282591644,-0.9870907075399109,-0.9896954466864806,-0.9922950583817594,-0.9948895553224886,-0.997478950218308,-1.0000632557908151,-1.0026424847726378,-1.0052166499065254,-1.0077857639444503,-1.010349839646729,-1.012908889781154,-1.0154629271221416,-1.0180119644498946,-1.0205560145495776,-1.023095090210506,-1.0256292042253523,-1.0281583693893603,-1.0306825984995778,-1.0332019043540985,-1.035716299751321,-1.0382257974892164,-1.0407304103646127,-1.043230151172489,-1.045725032705283,-1.048215067752211,-1.0507002690986003,-1.0531806495252316,-1.0556562218076977,-1.0581269987157678,-1.060592993012768,-1.063054217454972,-1.0655106847910014,-1.067962407761239,-1.0704093990972527,-1.0728516715212293,-1.0752892377454193,-1.0777221104715928,-1.0801503023905055,-1.082573826181374,-1.0849926945113624,-1.0874069200350789,-1.0898165153940804,-1.0922214932163898,-1.094621866116019,-1.0970176466925055,-1.0994088475304549,-1.1017954811990944,-1.104177560251835,-1.1065550972258418,-1.1089281046416137,-1.111296595002573,-1.1136605807946607,-1.1160200744859425,-1.1183750885262225,-1.1207256353466646,-1.1230717273594228,-1.1254133769572783,-1.127750596513286,-1.1300833983804264,-1.1324117948912684,-1.1347357983576358,-1.1370554210702846,-1.1393706752985848,-1.1416815732902115,-1.1439881272708419,-1.146290349443859,-1.1485882519900639,-1.1508818470673925,-1.1531711468106405,-1.1554561633311937,-1.1577369087167668,-1.1600133950311466,-1.1622856343139412,-1.1645536385803374,-1.166817419820863,-1.1690769900011544,-1.1713323610617308,-1.1735835449177747,-1.1758305534589177,-1.1780733985490306,-1.1803120920260217,-1.1825466457016374,-1.184777071361272,-1.1870033807637779,-1.189225585641286,-1.1914436976990277,-1.1936577286151626,-1.195867690040613,-1.1980735935989013,-1.2002754508859916,-1.2024732734701395,-1.2046670728917421,-1.2068568606631955,-1.2090426482687573,-1.2112244471644091,-1.2134022687777295,-1.2155761245077663,-1.2177460257249162,-1.2199119837708068,-1.2220740099581822,-1.2242321155707956,-1.226386311863302,-1.2285366100611579,-1.2306830213605227,-1.2328255569281643,-1.2349642279013702,-1.2370990453878588,-1.2392300204656976,-1.2413571641832224,-1.2434804875589622,-1.2456000015815647,-1.2477157172097273,-1.2498276453721322,-1.2519357969673803,-1.2540401828639332,-1.2561408139000563,-1.2582377008837633,-1.260330854592767,-1.26242028577443,-1.2645060051457209,-1.2665880233931701,-1.268666351172832,-1.2707409991102478,-1.2728119778004106,-1.2748792978077343,-1.2769429696660257,-1.2790030038784563,-1.2810594109175397,-1.2831122012251097,-1.285161385212302,-1.287206973259536,-1.289248975716502,-1.2912874029021477,-1.2933222651046699,-1.2953535725815055,-1.2973813355593264,-1.299405564234036,-1.3014262687707687,-1.3034434593038886,-1.3054571459369941,-1.3074673387429216,-1.3094740477637519,-1.3114772830108192,-1.3134770544647203,-1.315473372075328,-1.3174662457618036,-1.3194556854126134,-1.3214417008855448,-1.323424302007727,-1.3254034985756493,-1.327379300355185,-1.3293517170816143,-1.3313207584596498,-1.3332864341634627,-1.3352487538367115,-1.3372077270925722,-1.3391633635137676,-1.3411156726526021,-1.3430646640309936,-1.3450103471405093,-1.346952731442402,-1.3488918263676486,-1.3508276413169882,-1.3527601856609621,-1.354689468739956,-1.356615499864242,-1.3585382883140218,-1.360457843339473,-1.3623741741607933,-1.3642872899682488,-1.3661971999222207,-1.3681039131532553,-1.370007438762114,-1.3719077858198234,-1.373804963367728,-1.3756989804175435,-1.3775898459514087,-1.3794775689219423,-1.3813621582522975,-1.3832436228362182,-1.3851219715380962,-1.3869972131930302,-1.3888693566068824,-1.3907384105563405,-1.3926043837889768,-1.3944672850233093,-1.396327122948863,-1.3981839062262333,-1.4000376434871489,-1.4018883433345346,-1.4037360143425768,-1.4055806650567877,-1.4074223039940723,-1.4092609396427922,-1.411096580462835,-1.4129292348856803,-1.4147589113144674,-1.416585618124064,-1.4184093636611355,-1.4202301562442146,-1.4220480041637695,-1.423862915682277,-1.4256748990342907,-1.4274839624265139,-1.4292901140378709,-1.4310933620195787,-1.43289371449522,-1.4346911795608164,-1.4364857652849001,-1.4382774797085895,-1.4400663308456623,-1.4418523266826293,-1.4436354751788103,-1.445415784266408,-1.447193261850583,-1.448967915809531,-1.450739753994557,-1.4525087842301523,-1.4542750143140704,-1.456038452017404,-1.4577991050846613,-1.4595569812338436,-1.4613120881565227,-1.4630644335179177,-1.4648140249569739,-1.466560870086439,-1.4683049764929428,-1.4700463517370745,-1.4717850033534616,-1.4735209388508486,-1.4752541657121747,-1.4769846913946536,-1.4787125233298528,-1.4804376689237715,-1.4821601355569207,-1.4838799305844026,-1.485597061335989,-1.4873115351162027,-1.4890233592043947,-1.4907325408548258,-1.4924390872967457,-1.4941430057344725,-1.4958443033474724,-1.4975429872904413,-1.4992390646933824,-1.5009325426616875,-1.5026234282762165,-1.5043117285933785,-1.5059974506452103,-1.5076806014394573,-1.5093611879596538,-1.5110392171652027,-1.5127146959914552,-1.5143876313497917,-1.5160580301277011,-1.5177258991888611,-1.5193912453732188,-1.5210540754970687,-1.522714396353135,-1.5243722147106507,-1.5260275373154353,-1.5276803708899784,-1.5293307221335162,-1.5309785977221129,-1.5326240043087394,-1.5342669485233533,-1.535907436972978,-1.5375454762417822,-1.5391810728911595,-1.5408142334598072,-1.5424449644638054,-1.544073272396696,-1.545699163729562,-1.547322644911106,-1.5489437223677285,-1.5505624025036073,-1.5521786917007763,-1.5537925963192014,-1.555404122696862,-1.5570132771498277,-1.5586200659723355,-1.560224495436869,-1.561826571794235,-1.5634263012736427,-1.5650236900827794,-1.5666187444078885,-1.5682114704138481,-1.569801874244245,-1.5713899620214549,-1.5729757398467168,-1.574559213800211,-1.5761403899411344,-1.5777192743077781,-1.5792958729176023,-1.5808701917673134,-1.5824422368329385,-1.5840120140699028,-1.5855795294131028,-1.587144788776984,-1.5887077980556146,-1.5902685631227607,-1.591827089831961,-1.593383384016602,-1.594937451489992,-1.5964892980454355,-1.5980389294563062,-1.5995863514761237,-1.601131569838624,-1.6026745902578345,-1.6042154184281483,-1.605754060024395,-1.6072905207019155,-1.6088248060966348,-1.610356921825133,-1.6118868734847196,-1.6134146666535036,-1.6149403068904682,-1.6164637997355393,-1.6179851507096603,-1.619504365314861,-1.6210214490343302,-1.6225364073324862,-1.6240492456550475,-1.6255599694291039,-1.6270685840631862,-1.6285750949473363,-1.6300795074531782,-1.6315818269339868,-1.6330820587247574,-1.634580208142276,-1.6360762804851867,-1.6375702810340629,-1.6390622150514738,-1.640552087782054,-1.6420399044525729,-1.6435256702719991,-1.645009390431573,-1.6464910701048707,-1.6479707144478735,-1.649448328599034,-1.6509239176793433,-1.652397486792399,-1.6538690410244696,-1.655338585444563,-1.6568061251044908,-1.658271665038935,-1.659735210265515,-1.6611967657848503,-1.6626563365806277,-1.6641139276196668,-1.6655695438519826,-1.667023190210852,-1.6684748716128783,-1.6699245929580533,-1.6713723591298235,-1.6728181749951532,-1.674262045404587,-1.6757039751923142,-1.6771439691762315,-1.678582032158006,-1.6800181689231377,-1.6814523842410218,-1.6828846828650108,-1.6843150695324767,-1.6857435489648733,-1.6871701258677967,-1.6885948049310469,-1.6900175908286896,-1.691438488219116,-1.6928575017451044,-1.69427463603388,-1.6956898956971758,-1.6971032853312915,-1.6985148095171545,-1.6999244728203786,-1.7013322797913237,-1.702738234965155,-1.704142342861902,-1.7055446079865166,-1.7069450348289321,-1.7083436278641215,-1.7097403915521552,-1.7111353303382593,-1.7125284486528727,-1.7139197509117046,-1.7153092415157918,-1.7166969248515562,-1.7180828052908605,-1.7194668871910654,-1.720849174895086,-1.7222296727314474,-1.7236083850143407,-1.7249853160436794,-1.7263604701051545,-1.7277338514702887,-1.729105464396493,-1.7304753131271209,-1.7318434018915227,-1.7332097349051008,-1.7345743163693625,-1.7359371504719758,-1.7372982413868212,-1.738657593274047,-1.7400152102801216,-1.7413710965378872,-1.7427252561666127,-1.7440776932720459,-1.7454284119464667,-1.7467774162687395,-1.7481247103043642,-1.74947029810553,-1.7508141837111648,-1.7521563711469892,-1.7534968644255657,-1.7548356675463515,-1.7561727844957475,-1.757508219247151,-1.758841975761005,-1.7601740579848486,-1.761504469853368,-1.7628332152884445,-1.7641602981992066,-1.7654857224820772,-1.7668094920208253,-1.7681316106866127,-1.7694520823380442,-1.7707709108212168,-1.7720880999697668,-1.773403653604919,-1.774717575535535,-1.776029869558161,-1.7773405394570745,-1.7786495890043335,-1.7799570219598229,-1.7812628420713013,-1.7825670530744493,-1.7838696586929148,-1.785170662638361,-1.7864700686105108,-1.7877678802971961,-1.7890641013744002,-1.7903587355063062,-1.791651786345342,-1.7929432575322257,-1.7942331526960102,-1.7955214754541295,-1.7968082294124426,-1.7980934181652786,-1.799377045295482,-1.800659114374455,-1.801939628962204,-1.8032185926073825,-1.804496008847334,-1.805771881208138,-1.8070462132046512,-1.8083190083405514,-1.8095902701083815,-1.810860001989591,-1.8121282074545804,-1.813394889962742,-1.8146600529625023,-1.8159236998913675,-1.8171858341759606,-1.8184464592320668],"x":[-1.0,-1.00398406374502,-1.0079681274900398,-1.0119521912350598,-1.0159362549800797,-1.0199203187250996,-1.0239043824701195,-1.0278884462151394,-1.0318725099601593,-1.0358565737051793,-1.0398406374501992,-1.043824701195219,-1.047808764940239,-1.051792828685259,-1.0557768924302788,-1.0597609561752988,-1.0637450199203187,-1.0677290836653386,-1.0717131474103585,-1.0756972111553784,-1.0796812749003983,-1.0836653386454183,-1.0876494023904382,-1.091633466135458,-1.095617529880478,-1.099601593625498,-1.1035856573705178,-1.1075697211155378,-1.1115537848605577,-1.1155378486055776,-1.1195219123505975,-1.1235059760956174,-1.1274900398406376,-1.1314741035856575,-1.1354581673306774,-1.1394422310756973,-1.1434262948207172,-1.1474103585657371,-1.151394422310757,-1.155378486055777,-1.159362549800797,-1.1633466135458168,-1.1673306772908367,-1.1713147410358566,-1.1752988047808766,-1.1792828685258965,-1.1832669322709164,-1.1872509960159363,-1.1912350597609562,-1.1952191235059761,-1.199203187250996,-1.203187250996016,-1.207171314741036,-1.2111553784860558,-1.2151394422310757,-1.2191235059760956,-1.2231075697211156,-1.2270916334661355,-1.2310756972111554,-1.2350597609561753,-1.2390438247011952,-1.2430278884462151,-1.247011952191235,-1.250996015936255,-1.254980079681275,-1.2589641434262948,-1.2629482071713147,-1.2669322709163346,-1.2709163346613546,-1.2749003984063745,-1.2788844621513944,-1.2828685258964143,-1.2868525896414342,-1.2908366533864541,-1.294820717131474,-1.298804780876494,-1.302788844621514,-1.3067729083665338,-1.3107569721115537,-1.3147410358565736,-1.3187250996015936,-1.3227091633466135,-1.3266932270916334,-1.3306772908366533,-1.3346613545816732,-1.3386454183266931,-1.342629482071713,-1.346613545816733,-1.350597609561753,-1.3545816733067728,-1.3585657370517927,-1.3625498007968126,-1.3665338645418326,-1.3705179282868525,-1.3745019920318724,-1.3784860557768925,-1.3824701195219125,-1.3864541832669324,-1.3904382470119523,-1.3944223107569722,-1.3984063745019921,-1.402390438247012,-1.406374501992032,-1.4103585657370519,-1.4143426294820718,-1.4183266932270917,-1.4223107569721116,-1.4262948207171315,-1.4302788844621515,-1.4342629482071714,-1.4382470119521913,-1.4422310756972112,-1.4462151394422311,-1.450199203187251,-1.454183266932271,-1.4581673306772909,-1.4621513944223108,-1.4661354581673307,-1.4701195219123506,-1.4741035856573705,-1.4780876494023905,-1.4820717131474104,-1.4860557768924303,-1.4900398406374502,-1.4940239043824701,-1.49800796812749,-1.50199203187251,-1.5059760956175299,-1.5099601593625498,-1.5139442231075697,-1.5179282868525896,-1.5219123505976095,-1.5258964143426295,-1.5298804780876494,-1.5338645418326693,-1.5378486055776892,-1.5418326693227091,-1.545816733067729,-1.549800796812749,-1.5537848605577689,-1.5577689243027888,-1.5617529880478087,-1.5657370517928286,-1.5697211155378485,-1.5737051792828685,-1.5776892430278884,-1.5816733067729083,-1.5856573705179282,-1.5896414342629481,-1.593625498007968,-1.597609561752988,-1.6015936254980079,-1.6055776892430278,-1.6095617529880477,-1.6135458167330676,-1.6175298804780875,-1.6215139442231075,-1.6254980079681276,-1.6294820717131475,-1.6334661354581674,-1.6374501992031874,-1.6414342629482073,-1.6454183266932272,-1.649402390438247,-1.653386454183267,-1.657370517928287,-1.6613545816733069,-1.6653386454183268,-1.6693227091633467,-1.6733067729083666,-1.6772908366533865,-1.6812749003984064,-1.6852589641434264,-1.6892430278884463,-1.6932270916334662,-1.697211155378486,-1.701195219123506,-1.705179282868526,-1.7091633466135459,-1.7131474103585658,-1.7171314741035857,-1.7211155378486056,-1.7250996015936255,-1.7290836653386454,-1.7330677290836654,-1.7370517928286853,-1.7410358565737052,-1.745019920318725,-1.749003984063745,-1.752988047808765,-1.7569721115537849,-1.7609561752988048,-1.7649402390438247,-1.7689243027888446,-1.7729083665338645,-1.7768924302788844,-1.7808764940239044,-1.7848605577689243,-1.7888446215139442,-1.792828685258964,-1.796812749003984,-1.800796812749004,-1.8047808764940239,-1.8087649402390438,-1.8127490039840637,-1.8167330677290836,-1.8207171314741035,-1.8247011952191234,-1.8286852589641434,-1.8326693227091633,-1.8366533864541832,-1.840637450199203,-1.844621513944223,-1.848605577689243,-1.8525896414342629,-1.8565737051792828,-1.8605577689243027,-1.8645418326693226,-1.8685258964143425,-1.8725099601593624,-1.8764940239043826,-1.8804780876494025,-1.8844621513944224,-1.8884462151394423,-1.8924302788844622,-1.8964143426294822,-1.900398406374502,-1.904382470119522,-1.908366533864542,-1.9123505976095618,-1.9163346613545817,-1.9203187250996017,-1.9243027888446216,-1.9282868525896415,-1.9322709163346614,-1.9362549800796813,-1.9402390438247012,-1.9442231075697212,-1.948207171314741,-1.952191235059761,-1.956175298804781,-1.9601593625498008,-1.9641434262948207,-1.9681274900398407,-1.9721115537848606,-1.9760956175298805,-1.9800796812749004,-1.9840637450199203,-1.9880478087649402,-1.9920318725099602,-1.99601593625498,-2.0,-2.00398406374502,-2.00796812749004,-2.0119521912350598,-2.0159362549800797,-2.0199203187250996,-2.0239043824701195,-2.0278884462151394,-2.0318725099601593,-2.0358565737051793,-2.039840637450199,-2.043824701195219,-2.047808764940239,-2.051792828685259,-2.055776892430279,-2.0597609561752988,-2.0637450199203187,-2.0677290836653386,-2.0717131474103585,-2.0756972111553784,-2.0796812749003983,-2.0836653386454183,-2.087649402390438,-2.091633466135458,-2.095617529880478,-2.099601593625498,-2.103585657370518,-2.1075697211155378,-2.1115537848605577,-2.1155378486055776,-2.1195219123505975,-2.1235059760956174,-2.1274900398406373,-2.1314741035856573,-2.135458167330677,-2.139442231075697,-2.143426294820717,-2.147410358565737,-2.151394422310757,-2.1553784860557768,-2.1593625498007967,-2.1633466135458166,-2.1673306772908365,-2.1713147410358564,-2.1752988047808763,-2.1792828685258963,-2.183266932270916,-2.187250996015936,-2.191235059760956,-2.195219123505976,-2.199203187250996,-2.2031872509960158,-2.2071713147410357,-2.2111553784860556,-2.2151394422310755,-2.2191235059760954,-2.2231075697211153,-2.2270916334661353,-2.231075697211155,-2.235059760956175,-2.239043824701195,-2.243027888446215,-2.247011952191235,-2.250996015936255,-2.254980079681275,-2.258964143426295,-2.262948207171315,-2.266932270916335,-2.270916334661355,-2.2749003984063747,-2.2788844621513946,-2.2828685258964145,-2.2868525896414345,-2.2908366533864544,-2.2948207171314743,-2.298804780876494,-2.302788844621514,-2.306772908366534,-2.310756972111554,-2.314741035856574,-2.318725099601594,-2.3227091633466137,-2.3266932270916336,-2.3306772908366535,-2.3346613545816735,-2.3386454183266934,-2.3426294820717133,-2.346613545816733,-2.350597609561753,-2.354581673306773,-2.358565737051793,-2.362549800796813,-2.366533864541833,-2.3705179282868527,-2.3745019920318726,-2.3784860557768925,-2.3824701195219125,-2.3864541832669324,-2.3904382470119523,-2.394422310756972,-2.398406374501992,-2.402390438247012,-2.406374501992032,-2.410358565737052,-2.414342629482072,-2.4183266932270917,-2.4223107569721116,-2.4262948207171315,-2.4302788844621515,-2.4342629482071714,-2.4382470119521913,-2.442231075697211,-2.446215139442231,-2.450199203187251,-2.454183266932271,-2.458167330677291,-2.462151394422311,-2.4661354581673307,-2.4701195219123506,-2.4741035856573705,-2.4780876494023905,-2.4820717131474104,-2.4860557768924303,-2.49003984063745,-2.49402390438247,-2.49800796812749,-2.50199203187251,-2.50597609561753,-2.50996015936255,-2.5139442231075697,-2.5179282868525896,-2.5219123505976095,-2.5258964143426295,-2.5298804780876494,-2.5338645418326693,-2.537848605577689,-2.541832669322709,-2.545816733067729,-2.549800796812749,-2.553784860557769,-2.557768924302789,-2.5617529880478087,-2.5657370517928286,-2.5697211155378485,-2.5737051792828685,-2.5776892430278884,-2.5816733067729083,-2.585657370517928,-2.589641434262948,-2.593625498007968,-2.597609561752988,-2.601593625498008,-2.605577689243028,-2.6095617529880477,-2.6135458167330676,-2.6175298804780875,-2.6215139442231075,-2.6254980079681274,-2.6294820717131473,-2.633466135458167,-2.637450199203187,-2.641434262948207,-2.645418326693227,-2.649402390438247,-2.653386454183267,-2.6573705179282867,-2.6613545816733066,-2.6653386454183265,-2.6693227091633465,-2.6733067729083664,-2.6772908366533863,-2.681274900398406,-2.685258964143426,-2.689243027888446,-2.693227091633466,-2.697211155378486,-2.701195219123506,-2.7051792828685257,-2.7091633466135456,-2.7131474103585655,-2.7171314741035855,-2.7211155378486054,-2.7250996015936253,-2.729083665338645,-2.733067729083665,-2.737051792828685,-2.741035856573705,-2.745019920318725,-2.749003984063745,-2.752988047808765,-2.756972111553785,-2.760956175298805,-2.764940239043825,-2.768924302788845,-2.7729083665338647,-2.7768924302788847,-2.7808764940239046,-2.7848605577689245,-2.7888446215139444,-2.7928286852589643,-2.7968127490039842,-2.800796812749004,-2.804780876494024,-2.808764940239044,-2.812749003984064,-2.816733067729084,-2.8207171314741037,-2.8247011952191237,-2.8286852589641436,-2.8326693227091635,-2.8366533864541834,-2.8406374501992033,-2.8446215139442232,-2.848605577689243,-2.852589641434263,-2.856573705179283,-2.860557768924303,-2.864541832669323,-2.8685258964143427,-2.8725099601593627,-2.8764940239043826,-2.8804780876494025,-2.8844621513944224,-2.8884462151394423,-2.8924302788844622,-2.896414342629482,-2.900398406374502,-2.904382470119522,-2.908366533864542,-2.912350597609562,-2.9163346613545817,-2.9203187250996017,-2.9243027888446216,-2.9282868525896415,-2.9322709163346614,-2.9362549800796813,-2.9402390438247012,-2.944223107569721,-2.948207171314741,-2.952191235059761,-2.956175298804781,-2.960159362549801,-2.9641434262948207,-2.9681274900398407,-2.9721115537848606,-2.9760956175298805,-2.9800796812749004,-2.9840637450199203,-2.9880478087649402,-2.99203187250996,-2.99601593625498,-3.0]}
},{}],66:[function(require,module,exports){
module.exports={"expected":[0.881373587019543,0.8841879414415139,0.8869966952115446,0.889799859606722,0.8925974459675294,0.895389465696171,0.8981759302549194,0.9009568511644865,0.9037322400024143,0.9065021084014879,0.9092664680481705,0.9120253306810584,0.9147787080893591,0.9175266121113876,0.9202690546330863,0.9230060475865629,0.9257376029486509,0.9284637327394891,0.931184449021121,0.9338997638961148,0.9366096895062032,0.9393142380309416,0.9420134216863869,0.9447072527237945,0.9473957434283358,0.9500789061178323,0.9527567531415096,0.955429296878771,0.9580965497379865,0.9607585241553029,0.9634152325934697,0.9660666875406838,0.968712901509451,0.9713538870354661,0.9739896566765089,0.9766202230113581,0.9792455986387214,0.9818657961761822,0.9844808282591644,0.9870907075399109,0.9896954466864806,0.9922950583817594,0.9948895553224886,0.997478950218308,1.0000632557908151,1.0026424847726378,1.0052166499065254,1.0077857639444503,1.010349839646729,1.012908889781154,1.0154629271221416,1.0180119644498946,1.0205560145495776,1.023095090210506,1.0256292042253523,1.0281583693893603,1.0306825984995778,1.0332019043540985,1.035716299751321,1.0382257974892164,1.0407304103646127,1.043230151172489,1.045725032705283,1.048215067752211,1.0507002690986003,1.0531806495252316,1.0556562218076977,1.0581269987157678,1.060592993012768,1.063054217454972,1.0655106847910014,1.067962407761239,1.0704093990972527,1.0728516715212293,1.0752892377454193,1.0777221104715928,1.0801503023905055,1.082573826181374,1.0849926945113624,1.0874069200350789,1.0898165153940804,1.0922214932163898,1.094621866116019,1.0970176466925055,1.0994088475304549,1.1017954811990944,1.104177560251835,1.1065550972258418,1.1089281046416137,1.111296595002573,1.1136605807946607,1.1160200744859425,1.1183750885262225,1.1207256353466646,1.1230717273594228,1.1254133769572783,1.127750596513286,1.1300833983804264,1.1324117948912684,1.1347357983576358,1.1370554210702846,1.1393706752985848,1.1416815732902115,1.1439881272708419,1.146290349443859,1.1485882519900639,1.1508818470673925,1.1531711468106405,1.1554561633311937,1.1577369087167668,1.1600133950311466,1.1622856343139412,1.1645536385803374,1.166817419820863,1.1690769900011544,1.1713323610617308,1.1735835449177747,1.1758305534589177,1.1780733985490306,1.1803120920260217,1.1825466457016374,1.184777071361272,1.1870033807637779,1.189225585641286,1.1914436976990277,1.1936577286151626,1.195867690040613,1.1980735935989013,1.2002754508859916,1.2024732734701395,1.2046670728917421,1.2068568606631955,1.2090426482687573,1.2112244471644091,1.2134022687777295,1.2155761245077663,1.2177460257249162,1.2199119837708068,1.2220740099581822,1.2242321155707956,1.226386311863302,1.2285366100611579,1.2306830213605227,1.2328255569281643,1.2349642279013702,1.2370990453878588,1.2392300204656976,1.2413571641832224,1.2434804875589622,1.2456000015815647,1.2477157172097273,1.2498276453721322,1.2519357969673803,1.2540401828639332,1.2561408139000563,1.2582377008837633,1.260330854592767,1.26242028577443,1.2645060051457209,1.2665880233931701,1.268666351172832,1.2707409991102478,1.2728119778004106,1.2748792978077343,1.2769429696660257,1.2790030038784563,1.2810594109175397,1.2831122012251097,1.285161385212302,1.287206973259536,1.289248975716502,1.2912874029021477,1.2933222651046699,1.2953535725815055,1.2973813355593264,1.299405564234036,1.3014262687707687,1.3034434593038886,1.3054571459369941,1.3074673387429216,1.3094740477637519,1.3114772830108192,1.3134770544647203,1.315473372075328,1.3174662457618036,1.3194556854126134,1.3214417008855448,1.323424302007727,1.3254034985756493,1.327379300355185,1.3293517170816143,1.3313207584596498,1.3332864341634627,1.3352487538367115,1.3372077270925722,1.3391633635137676,1.3411156726526021,1.3430646640309936,1.3450103471405093,1.346952731442402,1.3488918263676486,1.3508276413169882,1.3527601856609621,1.354689468739956,1.356615499864242,1.3585382883140218,1.360457843339473,1.3623741741607933,1.3642872899682488,1.3661971999222207,1.3681039131532553,1.370007438762114,1.3719077858198234,1.373804963367728,1.3756989804175435,1.3775898459514087,1.3794775689219423,1.3813621582522975,1.3832436228362182,1.3851219715380962,1.3869972131930302,1.3888693566068824,1.3907384105563405,1.3926043837889768,1.3944672850233093,1.396327122948863,1.3981839062262333,1.4000376434871489,1.4018883433345346,1.4037360143425768,1.4055806650567877,1.4074223039940723,1.4092609396427922,1.411096580462835,1.4129292348856803,1.4147589113144674,1.416585618124064,1.4184093636611355,1.4202301562442146,1.4220480041637695,1.423862915682277,1.4256748990342907,1.4274839624265139,1.4292901140378709,1.4310933620195787,1.43289371449522,1.4346911795608164,1.4364857652849001,1.4382774797085895,1.4400663308456623,1.4418523266826293,1.4436354751788103,1.445415784266408,1.447193261850583,1.448967915809531,1.450739753994557,1.4525087842301523,1.4542750143140704,1.456038452017404,1.4577991050846613,1.4595569812338436,1.4613120881565227,1.4630644335179177,1.4648140249569739,1.466560870086439,1.4683049764929428,1.4700463517370745,1.4717850033534616,1.4735209388508486,1.4752541657121747,1.4769846913946536,1.4787125233298528,1.4804376689237715,1.4821601355569207,1.4838799305844026,1.485597061335989,1.4873115351162027,1.4890233592043947,1.4907325408548258,1.4924390872967457,1.4941430057344725,1.4958443033474724,1.4975429872904413,1.4992390646933824,1.5009325426616875,1.5026234282762165,1.5043117285933785,1.5059974506452103,1.5076806014394573,1.5093611879596538,1.5110392171652027,1.5127146959914552,1.5143876313497917,1.5160580301277011,1.5177258991888611,1.5193912453732188,1.5210540754970687,1.522714396353135,1.5243722147106507,1.5260275373154353,1.5276803708899784,1.5293307221335162,1.5309785977221129,1.5326240043087394,1.5342669485233533,1.535907436972978,1.5375454762417822,1.5391810728911595,1.5408142334598072,1.5424449644638054,1.544073272396696,1.545699163729562,1.547322644911106,1.5489437223677285,1.5505624025036073,1.5521786917007763,1.5537925963192014,1.555404122696862,1.5570132771498277,1.5586200659723355,1.560224495436869,1.561826571794235,1.5634263012736427,1.5650236900827794,1.5666187444078885,1.5682114704138481,1.569801874244245,1.5713899620214549,1.5729757398467168,1.574559213800211,1.5761403899411344,1.5777192743077781,1.5792958729176023,1.5808701917673134,1.5824422368329385,1.5840120140699028,1.5855795294131028,1.587144788776984,1.5887077980556146,1.5902685631227607,1.591827089831961,1.593383384016602,1.594937451489992,1.5964892980454355,1.5980389294563062,1.5995863514761237,1.601131569838624,1.6026745902578345,1.6042154184281483,1.605754060024395,1.6072905207019155,1.6088248060966348,1.610356921825133,1.6118868734847196,1.6134146666535036,1.6149403068904682,1.6164637997355393,1.6179851507096603,1.619504365314861,1.6210214490343302,1.6225364073324862,1.6240492456550475,1.6255599694291039,1.6270685840631862,1.6285750949473363,1.6300795074531782,1.6315818269339868,1.6330820587247574,1.634580208142276,1.6360762804851867,1.6375702810340629,1.6390622150514738,1.640552087782054,1.6420399044525729,1.6435256702719991,1.645009390431573,1.6464910701048707,1.6479707144478735,1.649448328599034,1.6509239176793433,1.652397486792399,1.6538690410244696,1.655338585444563,1.6568061251044908,1.658271665038935,1.659735210265515,1.6611967657848503,1.6626563365806277,1.6641139276196668,1.6655695438519826,1.667023190210852,1.6684748716128783,1.6699245929580533,1.6713723591298235,1.6728181749951532,1.674262045404587,1.6757039751923142,1.6771439691762315,1.678582032158006,1.6800181689231377,1.6814523842410218,1.6828846828650108,1.6843150695324767,1.6857435489648733,1.6871701258677967,1.6885948049310469,1.6900175908286896,1.691438488219116,1.6928575017451044,1.69427463603388,1.6956898956971758,1.6971032853312915,1.6985148095171545,1.6999244728203786,1.7013322797913237,1.702738234965155,1.704142342861902,1.7055446079865166,1.7069450348289321,1.7083436278641215,1.7097403915521552,1.7111353303382593,1.7125284486528727,1.7139197509117046,1.7153092415157918,1.7166969248515562,1.7180828052908605,1.7194668871910654,1.720849174895086,1.7222296727314474,1.7236083850143407,1.7249853160436794,1.7263604701051545,1.7277338514702887,1.729105464396493,1.7304753131271209,1.7318434018915227,1.7332097349051008,1.7345743163693625,1.7359371504719758,1.7372982413868212,1.738657593274047,1.7400152102801216,1.7413710965378872,1.7427252561666127,1.7440776932720459,1.7454284119464667,1.7467774162687395,1.7481247103043642,1.74947029810553,1.7508141837111648,1.7521563711469892,1.7534968644255657,1.7548356675463515,1.7561727844957475,1.757508219247151,1.758841975761005,1.7601740579848486,1.761504469853368,1.7628332152884445,1.7641602981992066,1.7654857224820772,1.7668094920208253,1.7681316106866127,1.7694520823380442,1.7707709108212168,1.7720880999697668,1.773403653604919,1.774717575535535,1.776029869558161,1.7773405394570745,1.7786495890043335,1.7799570219598229,1.7812628420713013,1.7825670530744493,1.7838696586929148,1.785170662638361,1.7864700686105108,1.7877678802971961,1.7890641013744002,1.7903587355063062,1.791651786345342,1.7929432575322257,1.7942331526960102,1.7955214754541295,1.7968082294124426,1.7980934181652786,1.799377045295482,1.800659114374455,1.801939628962204,1.8032185926073825,1.804496008847334,1.805771881208138,1.8070462132046512,1.8083190083405514,1.8095902701083815,1.810860001989591,1.8121282074545804,1.813394889962742,1.8146600529625023,1.8159236998913675,1.8171858341759606,1.8184464592320668],"x":[1.0,1.00398406374502,1.0079681274900398,1.0119521912350598,1.0159362549800797,1.0199203187250996,1.0239043824701195,1.0278884462151394,1.0318725099601593,1.0358565737051793,1.0398406374501992,1.043824701195219,1.047808764940239,1.051792828685259,1.0557768924302788,1.0597609561752988,1.0637450199203187,1.0677290836653386,1.0717131474103585,1.0756972111553784,1.0796812749003983,1.0836653386454183,1.0876494023904382,1.091633466135458,1.095617529880478,1.099601593625498,1.1035856573705178,1.1075697211155378,1.1115537848605577,1.1155378486055776,1.1195219123505975,1.1235059760956174,1.1274900398406376,1.1314741035856575,1.1354581673306774,1.1394422310756973,1.1434262948207172,1.1474103585657371,1.151394422310757,1.155378486055777,1.159362549800797,1.1633466135458168,1.1673306772908367,1.1713147410358566,1.1752988047808766,1.1792828685258965,1.1832669322709164,1.1872509960159363,1.1912350597609562,1.1952191235059761,1.199203187250996,1.203187250996016,1.207171314741036,1.2111553784860558,1.2151394422310757,1.2191235059760956,1.2231075697211156,1.2270916334661355,1.2310756972111554,1.2350597609561753,1.2390438247011952,1.2430278884462151,1.247011952191235,1.250996015936255,1.254980079681275,1.2589641434262948,1.2629482071713147,1.2669322709163346,1.2709163346613546,1.2749003984063745,1.2788844621513944,1.2828685258964143,1.2868525896414342,1.2908366533864541,1.294820717131474,1.298804780876494,1.302788844621514,1.3067729083665338,1.3107569721115537,1.3147410358565736,1.3187250996015936,1.3227091633466135,1.3266932270916334,1.3306772908366533,1.3346613545816732,1.3386454183266931,1.342629482071713,1.346613545816733,1.350597609561753,1.3545816733067728,1.3585657370517927,1.3625498007968126,1.3665338645418326,1.3705179282868525,1.3745019920318724,1.3784860557768925,1.3824701195219125,1.3864541832669324,1.3904382470119523,1.3944223107569722,1.3984063745019921,1.402390438247012,1.406374501992032,1.4103585657370519,1.4143426294820718,1.4183266932270917,1.4223107569721116,1.4262948207171315,1.4302788844621515,1.4342629482071714,1.4382470119521913,1.4422310756972112,1.4462151394422311,1.450199203187251,1.454183266932271,1.4581673306772909,1.4621513944223108,1.4661354581673307,1.4701195219123506,1.4741035856573705,1.4780876494023905,1.4820717131474104,1.4860557768924303,1.4900398406374502,1.4940239043824701,1.49800796812749,1.50199203187251,1.5059760956175299,1.5099601593625498,1.5139442231075697,1.5179282868525896,1.5219123505976095,1.5258964143426295,1.5298804780876494,1.5338645418326693,1.5378486055776892,1.5418326693227091,1.545816733067729,1.549800796812749,1.5537848605577689,1.5577689243027888,1.5617529880478087,1.5657370517928286,1.5697211155378485,1.5737051792828685,1.5776892430278884,1.5816733067729083,1.5856573705179282,1.5896414342629481,1.593625498007968,1.597609561752988,1.6015936254980079,1.6055776892430278,1.6095617529880477,1.6135458167330676,1.6175298804780875,1.6215139442231075,1.6254980079681276,1.6294820717131475,1.6334661354581674,1.6374501992031874,1.6414342629482073,1.6454183266932272,1.649402390438247,1.653386454183267,1.657370517928287,1.6613545816733069,1.6653386454183268,1.6693227091633467,1.6733067729083666,1.6772908366533865,1.6812749003984064,1.6852589641434264,1.6892430278884463,1.6932270916334662,1.697211155378486,1.701195219123506,1.705179282868526,1.7091633466135459,1.7131474103585658,1.7171314741035857,1.7211155378486056,1.7250996015936255,1.7290836653386454,1.7330677290836654,1.7370517928286853,1.7410358565737052,1.745019920318725,1.749003984063745,1.752988047808765,1.7569721115537849,1.7609561752988048,1.7649402390438247,1.7689243027888446,1.7729083665338645,1.7768924302788844,1.7808764940239044,1.7848605577689243,1.7888446215139442,1.792828685258964,1.796812749003984,1.800796812749004,1.8047808764940239,1.8087649402390438,1.8127490039840637,1.8167330677290836,1.8207171314741035,1.8247011952191234,1.8286852589641434,1.8326693227091633,1.8366533864541832,1.840637450199203,1.844621513944223,1.848605577689243,1.8525896414342629,1.8565737051792828,1.8605577689243027,1.8645418326693226,1.8685258964143425,1.8725099601593624,1.8764940239043826,1.8804780876494025,1.8844621513944224,1.8884462151394423,1.8924302788844622,1.8964143426294822,1.900398406374502,1.904382470119522,1.908366533864542,1.9123505976095618,1.9163346613545817,1.9203187250996017,1.9243027888446216,1.9282868525896415,1.9322709163346614,1.9362549800796813,1.9402390438247012,1.9442231075697212,1.948207171314741,1.952191235059761,1.956175298804781,1.9601593625498008,1.9641434262948207,1.9681274900398407,1.9721115537848606,1.9760956175298805,1.9800796812749004,1.9840637450199203,1.9880478087649402,1.9920318725099602,1.99601593625498,2.0,2.00398406374502,2.00796812749004,2.0119521912350598,2.0159362549800797,2.0199203187250996,2.0239043824701195,2.0278884462151394,2.0318725099601593,2.0358565737051793,2.039840637450199,2.043824701195219,2.047808764940239,2.051792828685259,2.055776892430279,2.0597609561752988,2.0637450199203187,2.0677290836653386,2.0717131474103585,2.0756972111553784,2.0796812749003983,2.0836653386454183,2.087649402390438,2.091633466135458,2.095617529880478,2.099601593625498,2.103585657370518,2.1075697211155378,2.1115537848605577,2.1155378486055776,2.1195219123505975,2.1235059760956174,2.1274900398406373,2.1314741035856573,2.135458167330677,2.139442231075697,2.143426294820717,2.147410358565737,2.151394422310757,2.1553784860557768,2.1593625498007967,2.1633466135458166,2.1673306772908365,2.1713147410358564,2.1752988047808763,2.1792828685258963,2.183266932270916,2.187250996015936,2.191235059760956,2.195219123505976,2.199203187250996,2.2031872509960158,2.2071713147410357,2.2111553784860556,2.2151394422310755,2.2191235059760954,2.2231075697211153,2.2270916334661353,2.231075697211155,2.235059760956175,2.239043824701195,2.243027888446215,2.247011952191235,2.250996015936255,2.254980079681275,2.258964143426295,2.262948207171315,2.266932270916335,2.270916334661355,2.2749003984063747,2.2788844621513946,2.2828685258964145,2.2868525896414345,2.2908366533864544,2.2948207171314743,2.298804780876494,2.302788844621514,2.306772908366534,2.310756972111554,2.314741035856574,2.318725099601594,2.3227091633466137,2.3266932270916336,2.3306772908366535,2.3346613545816735,2.3386454183266934,2.3426294820717133,2.346613545816733,2.350597609561753,2.354581673306773,2.358565737051793,2.362549800796813,2.366533864541833,2.3705179282868527,2.3745019920318726,2.3784860557768925,2.3824701195219125,2.3864541832669324,2.3904382470119523,2.394422310756972,2.398406374501992,2.402390438247012,2.406374501992032,2.410358565737052,2.414342629482072,2.4183266932270917,2.4223107569721116,2.4262948207171315,2.4302788844621515,2.4342629482071714,2.4382470119521913,2.442231075697211,2.446215139442231,2.450199203187251,2.454183266932271,2.458167330677291,2.462151394422311,2.4661354581673307,2.4701195219123506,2.4741035856573705,2.4780876494023905,2.4820717131474104,2.4860557768924303,2.49003984063745,2.49402390438247,2.49800796812749,2.50199203187251,2.50597609561753,2.50996015936255,2.5139442231075697,2.5179282868525896,2.5219123505976095,2.5258964143426295,2.5298804780876494,2.5338645418326693,2.537848605577689,2.541832669322709,2.545816733067729,2.549800796812749,2.553784860557769,2.557768924302789,2.5617529880478087,2.5657370517928286,2.5697211155378485,2.5737051792828685,2.5776892430278884,2.5816733067729083,2.585657370517928,2.589641434262948,2.593625498007968,2.597609561752988,2.601593625498008,2.605577689243028,2.6095617529880477,2.6135458167330676,2.6175298804780875,2.6215139442231075,2.6254980079681274,2.6294820717131473,2.633466135458167,2.637450199203187,2.641434262948207,2.645418326693227,2.649402390438247,2.653386454183267,2.6573705179282867,2.6613545816733066,2.6653386454183265,2.6693227091633465,2.6733067729083664,2.6772908366533863,2.681274900398406,2.685258964143426,2.689243027888446,2.693227091633466,2.697211155378486,2.701195219123506,2.7051792828685257,2.7091633466135456,2.7131474103585655,2.7171314741035855,2.7211155378486054,2.7250996015936253,2.729083665338645,2.733067729083665,2.737051792828685,2.741035856573705,2.745019920318725,2.749003984063745,2.752988047808765,2.756972111553785,2.760956175298805,2.764940239043825,2.768924302788845,2.7729083665338647,2.7768924302788847,2.7808764940239046,2.7848605577689245,2.7888446215139444,2.7928286852589643,2.7968127490039842,2.800796812749004,2.804780876494024,2.808764940239044,2.812749003984064,2.816733067729084,2.8207171314741037,2.8247011952191237,2.8286852589641436,2.8326693227091635,2.8366533864541834,2.8406374501992033,2.8446215139442232,2.848605577689243,2.852589641434263,2.856573705179283,2.860557768924303,2.864541832669323,2.8685258964143427,2.8725099601593627,2.8764940239043826,2.8804780876494025,2.8844621513944224,2.8884462151394423,2.8924302788844622,2.896414342629482,2.900398406374502,2.904382470119522,2.908366533864542,2.912350597609562,2.9163346613545817,2.9203187250996017,2.9243027888446216,2.9282868525896415,2.9322709163346614,2.9362549800796813,2.9402390438247012,2.944223107569721,2.948207171314741,2.952191235059761,2.956175298804781,2.960159362549801,2.9641434262948207,2.9681274900398407,2.9721115537848606,2.9760956175298805,2.9800796812749004,2.9840637450199203,2.9880478087649402,2.99203187250996,2.99601593625498,3.0]}
},{}],67:[function(require,module,exports){
module.exports={"expected":[-0.732668256045411,-0.7329793289269997,-0.7332903413525386,-0.7336012933271961,-0.7339121848561588,-0.7342230159446318,-0.7345337865978382,-0.7348444968210198,-0.7351551466194364,-0.7354657359983658,-0.7357762649631044,-0.7360867335189664,-0.7363971416712842,-0.7367074894254088,-0.7370177767867082,-0.7373280037605694,-0.7376381703523968,-0.7379482765676132,-0.7382583224116591,-0.7385683078899928,-0.738878233008091,-0.7391880977714474,-0.7394979021855744,-0.7398076462560017,-0.7401173299882768,-0.7404269533879654,-0.74073651646065,-0.7410460192119316,-0.7413554616474286,-0.7416648437727769,-0.7419741655936302,-0.7422834271156594,-0.7425926283445535,-0.7429017692860184,-0.743210849945778,-0.7435198703295733,-0.7438288304431628,-0.7441377302923227,-0.744446569882846,-0.7447553492205434,-0.745064068311243,-0.7453727271607898,-0.7456813257750465,-0.7459898641598928,-0.7462983423212252,-0.7466067602649581,-0.7469151179970226,-0.7472234155233669,-0.7475316528499564,-0.7478398299827737,-0.7481479469278179,-0.7484560036911058,-0.7487640002786705,-0.7490719366965625,-0.7493798129508488,-0.7496876290476139,-0.7499953849929585,-0.7503030807930005,-0.7506107164538743,-0.7509182919817314,-0.7512258073827401,-0.751533262663085,-0.7518406578289675,-0.7521479928866058,-0.7524552678422346,-0.7527624827021057,-0.7530696374724865,-0.7533767321596616,-0.7536837667699322,-0.7539907413096154,-0.7542976557850457,-0.754604510202573,-0.7549113045685644,-0.7552180388894026,-0.7555247131714874,-0.7558313274212347,-0.7561378816450766,-0.7564443758494611,-0.7567508100408531,-0.7570571842257333,-0.7573634984105988,-0.7576697526019629,-0.7579759468063545,-0.758282081030319,-0.758588155280418,-0.7588941695632291,-0.7592001238853454,-0.7595060182533769,-0.7598118526739485,-0.7601176271537019,-0.7604233416992945,-0.760728996317399,-0.7610345910147048,-0.7613401257979167,-0.761645600673755,-0.7619510156489564,-0.7622563707302731,-0.7625616659244727,-0.7628669012383389,-0.7631720766786708,-0.7634771922522832,-0.7637822479660067,-0.7640872438266871,-0.7643921798411862,-0.764697056016381,-0.765001872359164,-0.7653066288764431,-0.765611325575142,-0.7659159624621996,-0.7662205395445704,-0.7665250568292237,-0.7668295143231445,-0.7671339120333335,-0.7674382499668058,-0.7677425281305925,-0.7680467465317398,-0.7683509051773085,-0.7686550040743755,-0.7689590432300322,-0.7692630226513852,-0.7695669423455564,-0.7698708023196827,-0.7701746025809162,-0.7704783431364234,-0.7707820239933865,-0.7710856451590021,-0.7713892066404823,-0.7716927084450537,-0.7719961505799577,-0.7722995330524511,-0.772602855869805,-0.7729061190393054,-0.7732093225682533,-0.773512466463964,-0.7738155507337684,-0.7741185753850108,-0.7744215404250514,-0.7747244458612643,-0.7750272917010386,-0.7753300779517778,-0.7756328046208999,-0.7759354717158375,-0.776238079244038,-0.7765406272129629,-0.7768431156300885,-0.7771455445029047,-0.7774479138389172,-0.7777502236456451,-0.7780524739306218,-0.7783546647013957,-0.7786567959655287,-0.7789588677305979,-0.7792608800041938,-0.7795628327939216,-0.7798647261074004,-0.780166559952264,-0.7804683343361598,-0.7807700492667495,-0.7810717047517091,-0.7813733007987281,-0.7816748374155109,-0.7819763146097752,-0.7822777323892531,-0.7825790907616904,-0.7828803897348472,-0.7831816293164969,-0.7834828095144276,-0.7837839303364406,-0.7840849917903514,-0.784385993883989,-0.7846869366251968,-0.7849878200218313,-0.785288644081763,-0.7855894088128761,-0.7858901142230688,-0.7861907603202523,-0.786491347112352,-0.7867918746073067,-0.7870923428130687,-0.7873927517376045,-0.7876931013888928,-0.7879933917749272,-0.7882936229037141,-0.7885937947832733,-0.7888939074216386,-0.7891939608268564,-0.7894939550069873,-0.7897938899701045,-0.7900937657242951,-0.7903935822776595,-0.7906933396383109,-0.7909930378143764,-0.7912926768139956,-0.7915922566453222,-0.7918917773165224,-0.7921912388357757,-0.7924906412112749,-0.792789984451226,-0.7930892685638475,-0.7933884935573718,-0.7936876594400437,-0.7939867662201214,-0.7942858139058758,-0.7945848025055908,-0.7948837320275638,-0.7951826024801041,-0.7954814138715347,-0.7957801662101912,-0.7960788595044219,-0.7963774937625885,-0.7966760689930645,-0.7969745852042371,-0.7972730424045059,-0.7975714406022831,-0.7978697798059937,-0.7981680600240753,-0.7984662812649784,-0.7987644435371657,-0.799062546849113,-0.7993605912093085,-0.7996585766262524,-0.7999565031084582,-0.8002543706644516,-0.8005521793027709,-0.8008499290319664,-0.8011476198606015,-0.8014452517972513,-0.8017428248505041,-0.8020403390289598,-0.802337794341231,-0.8026351907959426,-0.8029325284017318,-0.8032298071672478,-0.8035270271011524,-0.8038241882121195,-0.804121290508835,-0.8044183339999974,-0.8047153186943167,-0.8050122446005156,-0.8053091117273287,-0.8056059200835024,-0.8059026696777958,-0.8061993605189792,-0.8064959926158357,-0.8067925659771598,-0.8070890806117581,-0.8073855365284495,-0.8076819337360641,-0.8079782722434448,-0.8082745520594452,-0.8085707731929318,-0.8088669356527824,-0.8091630394478868,-0.8094590845871463,-0.8097550710794741,-0.8100509989337952,-0.8103468681590461,-0.8106426787641753,-0.8109384307581426,-0.8112341241499195,-0.8115297589484892,-0.8118253351628466,-0.812120852801998,-0.8124163118749611,-0.8127117123907652,-0.8130070543584514,-0.8133023377870718,-0.8135975626856904,-0.8138927290633822,-0.8141878369292336,-0.8144828862923428,-0.8147778771618193,-0.8150728095467832,-0.8153676834563668,-0.8156624988997131,-0.8159572558859768,-0.8162519544243235,-0.8165465945239302,-0.8168411761939849,-0.8171356994436868,-0.8174301642822466,-0.8177245707188857,-0.8180189187628368,-0.8183132084233437,-0.8186074397096609,-0.8189016126310547,-0.8191957271968016,-0.8194897834161893,-0.819783781298517,-0.8200777208530942,-0.8203716020892414,-0.8206654250162905,-0.8209591896435836,-0.8212528959804744,-0.8215465440363265,-0.8218401338205152,-0.822133665342426,-0.8224271386114556,-0.8227205536370109,-0.82301391042851,-0.8233072089953817,-0.823600449347065,-0.8238936314930101,-0.8241867554426774,-0.8244798212055383,-0.8247728287910745,-0.8250657782087784,-0.8253586694681527,-0.8256515025787111,-0.8259442775499775,-0.826236994391486,-0.8265296531127818,-0.8268222537234199,-0.8271147962329664,-0.8274072806509969,-0.8276997069870982,-0.8279920752508668,-0.8282843854519102,-0.8285766375998458,-0.8288688317043009,-0.829160967774914,-0.829453045821333,-0.8297450658532162,-0.8300370278802325,-0.8303289319120607,-0.8306207779583896,-0.8309125660289183,-0.8312042961333559,-0.8314959682814221,-0.8317875824828458,-0.8320791387473664,-0.8323706370847335,-0.8326620775047064,-0.8329534600170546,-0.8332447846315572,-0.8335360513580037,-0.8338272602061934,-0.834118411185935,-0.8344095043070477,-0.8347005395793605,-0.8349915170127118,-0.83528243661695,-0.8355732984019335,-0.8358641023775306,-0.8361548485536184,-0.836445536940085,-0.8367361675468272,-0.8370267403837521,-0.8373172554607762,-0.8376077127878254,-0.8378981123748361,-0.8381884542317533,-0.8384787383685319,-0.8387689647951366,-0.8390591335215414,-0.8393492445577301,-0.8396392979136955,-0.8399292935994404,-0.8402192316249765,-0.8405091120003256,-0.8407989347355185,-0.8410886998405953,-0.8413784073256059,-0.8416680572006088,-0.8419576494756726,-0.8422471841608752,-0.8425366612663029,-0.8428260808020523,-0.8431154427782287,-0.8434047472049467,-0.8436939940923304,-0.8439831834505125,-0.8442723152896354,-0.8445613896198504,-0.844850406451318,-0.8451393657942078,-0.8454282676586984,-0.8457171120549777,-0.8460058989932423,-0.8462946284836979,-0.8465833005365597,-0.8468719151620511,-0.8471604723704051,-0.8474489721718633,-0.8477374145766762,-0.8480257995951035,-0.8483141272374136,-0.8486023975138837,-0.8488906104348,-0.849178766010457,-0.8494668642511592,-0.8497549051672184,-0.8500428887689565,-0.850330815066703,-0.850618684070797,-0.8509064957915857,-0.8511942502394254,-0.8514819474246809,-0.8517695873577255,-0.8520571700489414,-0.8523446955087193,-0.8526321637474582,-0.8529195747755663,-0.8532069286034598,-0.8534942252415634,-0.8537814647003108,-0.8540686469901437,-0.8543557721215125,-0.854642840104876,-0.8549298509507015,-0.8552168046694645,-0.8555037012716491,-0.8557905407677479,-0.8560773231682611,-0.8563640484836983,-0.8566507167245767,-0.856937327901422,-0.8572238820247681,-0.8575103791051573,-0.85779681915314,-0.8580832021792746,-0.8583695281941284,-0.8586557972082761,-0.858942009232301,-0.8592281642767945,-0.8595142623523558,-0.8598003034695929,-0.8600862876391209,-0.8603722148715637,-0.8606580851775533,-0.8609438985677288,-0.8612296550527385,-0.861515354643238,-0.8618009973498909,-0.8620865831833691,-0.8623721121543519,-0.862657584273527,-0.8629429995515896,-0.863228357999243,-0.8635136596271986,-0.8637989044461749,-0.864084092466899,-0.8643692237001053,-0.864654298156536,-0.8649393158469416,-0.8652242767820795,-0.8655091809727155,-0.8657940284296229,-0.8660788191635826,-0.8663635531853832,-0.8666482305058207,-0.8669328511356995,-0.8672174150858308,-0.8675019223670337,-0.8677863729901351,-0.8680707669659689,-0.8683551043053769,-0.8686393850192087,-0.8689236091183208,-0.8692077766135775,-0.8694918875158506,-0.8697759418360193,-0.8700599395849702,-0.8703438807735971,-0.8706277654128018,-0.8709115935134927,-0.8711953650865861,-0.8714790801430056,-0.8717627386936817,-0.8720463407495527,-0.8723298863215637,-0.8726133754206676,-0.8728968080578243,-0.8731801842440008,-0.8734635039901715,-0.8737467673073176,-0.8740299742064281,-0.8743131246984988,-0.8745962187945324,-0.8748792565055395,-0.8751622378425369,-0.875445162816549,-0.8757280314386073,-0.8760108437197498,-0.8762935996710224,-0.8765762993034771,-0.8768589426281737,-0.8771415296561784,-0.8774240603985648,-0.877706534866413,-0.8779889530708103,-0.8782713150228509,-0.8785536207336357,-0.8788358702142729,-0.8791180634758771,-0.8794002005295698,-0.8796822813864797,-0.8799643060577417,-0.880246274554498,-0.8805281868878975,-0.8808100430690955,-0.8810918431092544,-0.881373587019543],"x":[-0.8,-0.800398406374502,-0.8007968127490039,-0.801195219123506,-0.801593625498008,-0.80199203187251,-0.802390438247012,-0.8027888446215139,-0.803187250996016,-0.8035856573705179,-0.80398406374502,-0.8043824701195219,-0.8047808764940239,-0.8051792828685259,-0.8055776892430279,-0.8059760956175299,-0.8063745019920319,-0.8067729083665338,-0.8071713147410359,-0.8075697211155378,-0.8079681274900399,-0.8083665338645418,-0.8087649402390438,-0.8091633466135458,-0.8095617529880478,-0.8099601593625498,-0.8103585657370518,-0.8107569721115537,-0.8111553784860558,-0.8115537848605577,-0.8119521912350598,-0.8123505976095617,-0.8127490039840638,-0.8131474103585657,-0.8135458167330677,-0.8139442231075698,-0.8143426294820717,-0.8147410358565738,-0.8151394422310757,-0.8155378486055777,-0.8159362549800797,-0.8163346613545817,-0.8167330677290837,-0.8171314741035857,-0.8175298804780876,-0.8179282868525897,-0.8183266932270916,-0.8187250996015937,-0.8191235059760956,-0.8195219123505976,-0.8199203187250996,-0.8203187250996016,-0.8207171314741036,-0.8211155378486056,-0.8215139442231075,-0.8219123505976096,-0.8223107569721115,-0.8227091633466136,-0.8231075697211155,-0.8235059760956175,-0.8239043824701195,-0.8243027888446215,-0.8247011952191236,-0.8250996015936255,-0.8254980079681274,-0.8258964143426295,-0.8262948207171315,-0.8266932270916335,-0.8270916334661355,-0.8274900398406374,-0.8278884462151395,-0.8282868525896414,-0.8286852589641435,-0.8290836653386454,-0.8294820717131474,-0.8298804780876494,-0.8302788844621514,-0.8306772908366534,-0.8310756972111554,-0.8314741035856573,-0.8318725099601594,-0.8322709163346613,-0.8326693227091634,-0.8330677290836653,-0.8334661354581673,-0.8338645418326693,-0.8342629482071713,-0.8346613545816733,-0.8350597609561753,-0.8354581673306772,-0.8358565737051793,-0.8362549800796812,-0.8366533864541833,-0.8370517928286852,-0.8374501992031872,-0.8378486055776893,-0.8382470119521912,-0.8386454183266933,-0.8390438247011952,-0.8394422310756973,-0.8398406374501992,-0.8402390438247012,-0.8406374501992032,-0.8410358565737052,-0.8414342629482072,-0.8418326693227092,-0.8422310756972111,-0.8426294820717132,-0.8430278884462151,-0.8434262948207172,-0.8438247011952191,-0.8442231075697211,-0.8446215139442231,-0.8450199203187251,-0.8454183266932271,-0.8458167330677291,-0.846215139442231,-0.8466135458167331,-0.847011952191235,-0.8474103585657371,-0.847808764940239,-0.848207171314741,-0.848605577689243,-0.849003984063745,-0.8494023904382471,-0.849800796812749,-0.850199203187251,-0.850597609561753,-0.850996015936255,-0.851394422310757,-0.851792828685259,-0.8521912350597609,-0.852589641434263,-0.8529880478087649,-0.853386454183267,-0.8537848605577689,-0.8541832669322709,-0.8545816733067729,-0.8549800796812749,-0.8553784860557769,-0.8557768924302789,-0.8561752988047808,-0.8565737051792829,-0.8569721115537848,-0.8573705179282869,-0.8577689243027888,-0.8581673306772908,-0.8585657370517928,-0.8589641434262948,-0.8593625498007968,-0.8597609561752988,-0.8601593625498007,-0.8605577689243028,-0.8609561752988047,-0.8613545816733068,-0.8617529880478088,-0.8621513944223107,-0.8625498007968128,-0.8629482071713147,-0.8633466135458168,-0.8637450199203187,-0.8641434262948208,-0.8645418326693227,-0.8649402390438247,-0.8653386454183267,-0.8657370517928287,-0.8661354581673307,-0.8665338645418327,-0.8669322709163346,-0.8673306772908367,-0.8677290836653386,-0.8681274900398407,-0.8685258964143426,-0.8689243027888446,-0.8693227091633466,-0.8697211155378486,-0.8701195219123506,-0.8705179282868526,-0.8709163346613545,-0.8713147410358566,-0.8717131474103585,-0.8721115537848606,-0.8725099601593626,-0.8729083665338645,-0.8733067729083666,-0.8737051792828685,-0.8741035856573706,-0.8745019920318725,-0.8749003984063745,-0.8752988047808765,-0.8756972111553785,-0.8760956175298805,-0.8764940239043825,-0.8768924302788844,-0.8772908366533865,-0.8776892430278884,-0.8780876494023905,-0.8784860557768924,-0.8788844621513944,-0.8792828685258964,-0.8796812749003984,-0.8800796812749004,-0.8804780876494024,-0.8808764940239043,-0.8812749003984064,-0.8816733067729083,-0.8820717131474104,-0.8824701195219123,-0.8828685258964143,-0.8832669322709163,-0.8836653386454183,-0.8840637450199204,-0.8844621513944223,-0.8848605577689242,-0.8852589641434263,-0.8856573705179283,-0.8860557768924303,-0.8864541832669323,-0.8868525896414342,-0.8872509960159363,-0.8876494023904382,-0.8880478087649403,-0.8884462151394422,-0.8888446215139443,-0.8892430278884462,-0.8896414342629482,-0.8900398406374502,-0.8904382470119522,-0.8908366533864542,-0.8912350597609562,-0.8916334661354581,-0.8920318725099602,-0.8924302788844621,-0.8928286852589642,-0.8932270916334661,-0.8936254980079681,-0.8940239043824701,-0.8944223107569721,-0.8948207171314742,-0.8952191235059761,-0.895617529880478,-0.8960159362549801,-0.896414342629482,-0.8968127490039841,-0.8972111553784861,-0.897609561752988,-0.8980079681274901,-0.898406374501992,-0.8988047808764941,-0.899203187250996,-0.899601593625498,-0.9,-0.900398406374502,-0.900796812749004,-0.901195219123506,-0.9015936254980079,-0.90199203187251,-0.9023904382470119,-0.902788844621514,-0.9031872509960159,-0.9035856573705179,-0.9039840637450199,-0.9043824701195219,-0.904780876494024,-0.9051792828685259,-0.9055776892430278,-0.9059760956175299,-0.9063745019920318,-0.9067729083665339,-0.9071713147410359,-0.9075697211155378,-0.9079681274900399,-0.9083665338645418,-0.9087649402390439,-0.9091633466135458,-0.9095617529880478,-0.9099601593625498,-0.9103585657370518,-0.9107569721115538,-0.9111553784860558,-0.9115537848605577,-0.9119521912350598,-0.9123505976095617,-0.9127490039840638,-0.9131474103585657,-0.9135458167330678,-0.9139442231075697,-0.9143426294820717,-0.9147410358565737,-0.9151394422310757,-0.9155378486055777,-0.9159362549800797,-0.9163346613545816,-0.9167330677290837,-0.9171314741035856,-0.9175298804780877,-0.9179282868525896,-0.9183266932270916,-0.9187250996015937,-0.9191235059760956,-0.9195219123505977,-0.9199203187250996,-0.9203187250996016,-0.9207171314741036,-0.9211155378486056,-0.9215139442231076,-0.9219123505976096,-0.9223107569721115,-0.9227091633466136,-0.9231075697211155,-0.9235059760956176,-0.9239043824701195,-0.9243027888446215,-0.9247011952191235,-0.9250996015936255,-0.9254980079681275,-0.9258964143426295,-0.9262948207171314,-0.9266932270916335,-0.9270916334661354,-0.9274900398406375,-0.9278884462151394,-0.9282868525896414,-0.9286852589641434,-0.9290836653386454,-0.9294820717131475,-0.9298804780876494,-0.9302788844621513,-0.9306772908366534,-0.9310756972111554,-0.9314741035856574,-0.9318725099601594,-0.9322709163346613,-0.9326693227091634,-0.9330677290836653,-0.9334661354581674,-0.9338645418326693,-0.9342629482071713,-0.9346613545816733,-0.9350597609561753,-0.9354581673306773,-0.9358565737051793,-0.9362549800796812,-0.9366533864541833,-0.9370517928286852,-0.9374501992031873,-0.9378486055776892,-0.9382470119521913,-0.9386454183266932,-0.9390438247011952,-0.9394422310756972,-0.9398406374501992,-0.9402390438247012,-0.9406374501992032,-0.9410358565737051,-0.9414342629482072,-0.9418326693227091,-0.9422310756972112,-0.9426294820717132,-0.9430278884462151,-0.9434262948207172,-0.9438247011952191,-0.9442231075697212,-0.9446215139442231,-0.9450199203187251,-0.9454183266932271,-0.9458167330677291,-0.9462151394422311,-0.9466135458167331,-0.947011952191235,-0.9474103585657371,-0.947808764940239,-0.9482071713147411,-0.948605577689243,-0.949003984063745,-0.949402390438247,-0.949800796812749,-0.950199203187251,-0.950597609561753,-0.9509960159362549,-0.951394422310757,-0.9517928286852589,-0.952191235059761,-0.952589641434263,-0.9529880478087649,-0.953386454183267,-0.9537848605577689,-0.954183266932271,-0.9545816733067729,-0.9549800796812749,-0.9553784860557769,-0.9557768924302789,-0.9561752988047809,-0.9565737051792829,-0.9569721115537848,-0.9573705179282869,-0.9577689243027888,-0.9581673306772909,-0.9585657370517928,-0.9589641434262948,-0.9593625498007968,-0.9597609561752988,-0.9601593625498008,-0.9605577689243028,-0.9609561752988047,-0.9613545816733068,-0.9617529880478087,-0.9621513944223108,-0.9625498007968127,-0.9629482071713148,-0.9633466135458167,-0.9637450199203187,-0.9641434262948207,-0.9645418326693227,-0.9649402390438248,-0.9653386454183267,-0.9657370517928286,-0.9661354581673307,-0.9665338645418327,-0.9669322709163347,-0.9673306772908367,-0.9677290836653386,-0.9681274900398407,-0.9685258964143426,-0.9689243027888447,-0.9693227091633466,-0.9697211155378486,-0.9701195219123506,-0.9705179282868526,-0.9709163346613546,-0.9713147410358566,-0.9717131474103585,-0.9721115537848606,-0.9725099601593625,-0.9729083665338646,-0.9733067729083665,-0.9737051792828685,-0.9741035856573705,-0.9745019920318725,-0.9749003984063745,-0.9752988047808765,-0.9756972111553784,-0.9760956175298805,-0.9764940239043824,-0.9768924302788845,-0.9772908366533865,-0.9776892430278884,-0.9780876494023905,-0.9784860557768924,-0.9788844621513945,-0.9792828685258964,-0.9796812749003984,-0.9800796812749004,-0.9804780876494024,-0.9808764940239044,-0.9812749003984064,-0.9816733067729083,-0.9820717131474104,-0.9824701195219123,-0.9828685258964144,-0.9832669322709163,-0.9836653386454183,-0.9840637450199203,-0.9844621513944223,-0.9848605577689243,-0.9852589641434263,-0.9856573705179282,-0.9860557768924303,-0.9864541832669322,-0.9868525896414343,-0.9872509960159362,-0.9876494023904383,-0.9880478087649402,-0.9884462151394422,-0.9888446215139443,-0.9892430278884462,-0.9896414342629483,-0.9900398406374502,-0.9904382470119522,-0.9908366533864542,-0.9912350597609562,-0.9916334661354582,-0.9920318725099602,-0.9924302788844621,-0.9928286852589642,-0.9932270916334661,-0.9936254980079682,-0.9940239043824701,-0.9944223107569721,-0.9948207171314741,-0.9952191235059761,-0.9956175298804781,-0.9960159362549801,-0.996414342629482,-0.9968127490039841,-0.997211155378486,-0.9976095617529881,-0.99800796812749,-0.998406374501992,-0.998804780876494,-0.999203187250996,-0.999601593625498,-1.0]}
},{}],68:[function(require,module,exports){
module.exports={"expected":[0.732668256045411,0.7329793289269997,0.7332903413525386,0.7336012933271961,0.7339121848561588,0.7342230159446318,0.7345337865978382,0.7348444968210198,0.7351551466194364,0.7354657359983658,0.7357762649631044,0.7360867335189664,0.7363971416712842,0.7367074894254088,0.7370177767867082,0.7373280037605694,0.7376381703523968,0.7379482765676132,0.7382583224116591,0.7385683078899928,0.738878233008091,0.7391880977714474,0.7394979021855744,0.7398076462560017,0.7401173299882768,0.7404269533879654,0.74073651646065,0.7410460192119316,0.7413554616474286,0.7416648437727769,0.7419741655936302,0.7422834271156594,0.7425926283445535,0.7429017692860184,0.743210849945778,0.7435198703295733,0.7438288304431628,0.7441377302923227,0.744446569882846,0.7447553492205434,0.745064068311243,0.7453727271607898,0.7456813257750465,0.7459898641598928,0.7462983423212252,0.7466067602649581,0.7469151179970226,0.7472234155233669,0.7475316528499564,0.7478398299827737,0.7481479469278179,0.7484560036911058,0.7487640002786705,0.7490719366965625,0.7493798129508488,0.7496876290476139,0.7499953849929585,0.7503030807930005,0.7506107164538743,0.7509182919817314,0.7512258073827401,0.751533262663085,0.7518406578289675,0.7521479928866058,0.7524552678422346,0.7527624827021057,0.7530696374724865,0.7533767321596616,0.7536837667699322,0.7539907413096154,0.7542976557850457,0.754604510202573,0.7549113045685644,0.7552180388894026,0.7555247131714874,0.7558313274212347,0.7561378816450766,0.7564443758494611,0.7567508100408531,0.7570571842257333,0.7573634984105988,0.7576697526019629,0.7579759468063545,0.758282081030319,0.758588155280418,0.7588941695632291,0.7592001238853454,0.7595060182533769,0.7598118526739485,0.7601176271537019,0.7604233416992945,0.760728996317399,0.7610345910147048,0.7613401257979167,0.761645600673755,0.7619510156489564,0.7622563707302731,0.7625616659244727,0.7628669012383389,0.7631720766786708,0.7634771922522832,0.7637822479660067,0.7640872438266871,0.7643921798411862,0.764697056016381,0.765001872359164,0.7653066288764431,0.765611325575142,0.7659159624621996,0.7662205395445704,0.7665250568292237,0.7668295143231445,0.7671339120333335,0.7674382499668058,0.7677425281305925,0.7680467465317398,0.7683509051773085,0.7686550040743755,0.7689590432300322,0.7692630226513852,0.7695669423455564,0.7698708023196827,0.7701746025809162,0.7704783431364234,0.7707820239933865,0.7710856451590021,0.7713892066404823,0.7716927084450537,0.7719961505799577,0.7722995330524511,0.772602855869805,0.7729061190393054,0.7732093225682533,0.773512466463964,0.7738155507337684,0.7741185753850108,0.7744215404250514,0.7747244458612643,0.7750272917010386,0.7753300779517778,0.7756328046208999,0.7759354717158375,0.776238079244038,0.7765406272129629,0.7768431156300885,0.7771455445029047,0.7774479138389172,0.7777502236456451,0.7780524739306218,0.7783546647013957,0.7786567959655287,0.7789588677305979,0.7792608800041938,0.7795628327939216,0.7798647261074004,0.780166559952264,0.7804683343361598,0.7807700492667495,0.7810717047517091,0.7813733007987281,0.7816748374155109,0.7819763146097752,0.7822777323892531,0.7825790907616904,0.7828803897348472,0.7831816293164969,0.7834828095144276,0.7837839303364406,0.7840849917903514,0.784385993883989,0.7846869366251968,0.7849878200218313,0.785288644081763,0.7855894088128761,0.7858901142230688,0.7861907603202523,0.786491347112352,0.7867918746073067,0.7870923428130687,0.7873927517376045,0.7876931013888928,0.7879933917749272,0.7882936229037141,0.7885937947832733,0.7888939074216386,0.7891939608268564,0.7894939550069873,0.7897938899701045,0.7900937657242951,0.7903935822776595,0.7906933396383109,0.7909930378143764,0.7912926768139956,0.7915922566453222,0.7918917773165224,0.7921912388357757,0.7924906412112749,0.792789984451226,0.7930892685638475,0.7933884935573718,0.7936876594400437,0.7939867662201214,0.7942858139058758,0.7945848025055908,0.7948837320275638,0.7951826024801041,0.7954814138715347,0.7957801662101912,0.7960788595044219,0.7963774937625885,0.7966760689930645,0.7969745852042371,0.7972730424045059,0.7975714406022831,0.7978697798059937,0.7981680600240753,0.7984662812649784,0.7987644435371657,0.799062546849113,0.7993605912093085,0.7996585766262524,0.7999565031084582,0.8002543706644516,0.8005521793027709,0.8008499290319664,0.8011476198606015,0.8014452517972513,0.8017428248505041,0.8020403390289598,0.802337794341231,0.8026351907959426,0.8029325284017318,0.8032298071672478,0.8035270271011524,0.8038241882121195,0.804121290508835,0.8044183339999974,0.8047153186943167,0.8050122446005156,0.8053091117273287,0.8056059200835024,0.8059026696777958,0.8061993605189792,0.8064959926158357,0.8067925659771598,0.8070890806117581,0.8073855365284495,0.8076819337360641,0.8079782722434448,0.8082745520594452,0.8085707731929318,0.8088669356527824,0.8091630394478868,0.8094590845871463,0.8097550710794741,0.8100509989337952,0.8103468681590461,0.8106426787641753,0.8109384307581426,0.8112341241499195,0.8115297589484892,0.8118253351628466,0.812120852801998,0.8124163118749611,0.8127117123907652,0.8130070543584514,0.8133023377870718,0.8135975626856904,0.8138927290633822,0.8141878369292336,0.8144828862923428,0.8147778771618193,0.8150728095467832,0.8153676834563668,0.8156624988997131,0.8159572558859768,0.8162519544243235,0.8165465945239302,0.8168411761939849,0.8171356994436868,0.8174301642822466,0.8177245707188857,0.8180189187628368,0.8183132084233437,0.8186074397096609,0.8189016126310547,0.8191957271968016,0.8194897834161893,0.819783781298517,0.8200777208530942,0.8203716020892414,0.8206654250162905,0.8209591896435836,0.8212528959804744,0.8215465440363265,0.8218401338205152,0.822133665342426,0.8224271386114556,0.8227205536370109,0.82301391042851,0.8233072089953817,0.823600449347065,0.8238936314930101,0.8241867554426774,0.8244798212055383,0.8247728287910745,0.8250657782087784,0.8253586694681527,0.8256515025787111,0.8259442775499775,0.826236994391486,0.8265296531127818,0.8268222537234199,0.8271147962329664,0.8274072806509969,0.8276997069870982,0.8279920752508668,0.8282843854519102,0.8285766375998458,0.8288688317043009,0.829160967774914,0.829453045821333,0.8297450658532162,0.8300370278802325,0.8303289319120607,0.8306207779583896,0.8309125660289183,0.8312042961333559,0.8314959682814221,0.8317875824828458,0.8320791387473664,0.8323706370847335,0.8326620775047064,0.8329534600170546,0.8332447846315572,0.8335360513580037,0.8338272602061934,0.834118411185935,0.8344095043070477,0.8347005395793605,0.8349915170127118,0.83528243661695,0.8355732984019335,0.8358641023775306,0.8361548485536184,0.836445536940085,0.8367361675468272,0.8370267403837521,0.8373172554607762,0.8376077127878254,0.8378981123748361,0.8381884542317533,0.8384787383685319,0.8387689647951366,0.8390591335215414,0.8393492445577301,0.8396392979136955,0.8399292935994404,0.8402192316249765,0.8405091120003256,0.8407989347355185,0.8410886998405953,0.8413784073256059,0.8416680572006088,0.8419576494756726,0.8422471841608752,0.8425366612663029,0.8428260808020523,0.8431154427782287,0.8434047472049467,0.8436939940923304,0.8439831834505125,0.8442723152896354,0.8445613896198504,0.844850406451318,0.8451393657942078,0.8454282676586984,0.8457171120549777,0.8460058989932423,0.8462946284836979,0.8465833005365597,0.8468719151620511,0.8471604723704051,0.8474489721718633,0.8477374145766762,0.8480257995951035,0.8483141272374136,0.8486023975138837,0.8488906104348,0.849178766010457,0.8494668642511592,0.8497549051672184,0.8500428887689565,0.850330815066703,0.850618684070797,0.8509064957915857,0.8511942502394254,0.8514819474246809,0.8517695873577255,0.8520571700489414,0.8523446955087193,0.8526321637474582,0.8529195747755663,0.8532069286034598,0.8534942252415634,0.8537814647003108,0.8540686469901437,0.8543557721215125,0.854642840104876,0.8549298509507015,0.8552168046694645,0.8555037012716491,0.8557905407677479,0.8560773231682611,0.8563640484836983,0.8566507167245767,0.856937327901422,0.8572238820247681,0.8575103791051573,0.85779681915314,0.8580832021792746,0.8583695281941284,0.8586557972082761,0.858942009232301,0.8592281642767945,0.8595142623523558,0.8598003034695929,0.8600862876391209,0.8603722148715637,0.8606580851775533,0.8609438985677288,0.8612296550527385,0.861515354643238,0.8618009973498909,0.8620865831833691,0.8623721121543519,0.862657584273527,0.8629429995515896,0.863228357999243,0.8635136596271986,0.8637989044461749,0.864084092466899,0.8643692237001053,0.864654298156536,0.8649393158469416,0.8652242767820795,0.8655091809727155,0.8657940284296229,0.8660788191635826,0.8663635531853832,0.8666482305058207,0.8669328511356995,0.8672174150858308,0.8675019223670337,0.8677863729901351,0.8680707669659689,0.8683551043053769,0.8686393850192087,0.8689236091183208,0.8692077766135775,0.8694918875158506,0.8697759418360193,0.8700599395849702,0.8703438807735971,0.8706277654128018,0.8709115935134927,0.8711953650865861,0.8714790801430056,0.8717627386936817,0.8720463407495527,0.8723298863215637,0.8726133754206676,0.8728968080578243,0.8731801842440008,0.8734635039901715,0.8737467673073176,0.8740299742064281,0.8743131246984988,0.8745962187945324,0.8748792565055395,0.8751622378425369,0.875445162816549,0.8757280314386073,0.8760108437197498,0.8762935996710224,0.8765762993034771,0.8768589426281737,0.8771415296561784,0.8774240603985648,0.877706534866413,0.8779889530708103,0.8782713150228509,0.8785536207336357,0.8788358702142729,0.8791180634758771,0.8794002005295698,0.8796822813864797,0.8799643060577417,0.880246274554498,0.8805281868878975,0.8808100430690955,0.8810918431092544,0.881373587019543],"x":[0.8,0.800398406374502,0.8007968127490039,0.801195219123506,0.801593625498008,0.80199203187251,0.802390438247012,0.8027888446215139,0.803187250996016,0.8035856573705179,0.80398406374502,0.8043824701195219,0.8047808764940239,0.8051792828685259,0.8055776892430279,0.8059760956175299,0.8063745019920319,0.8067729083665338,0.8071713147410359,0.8075697211155378,0.8079681274900399,0.8083665338645418,0.8087649402390438,0.8091633466135458,0.8095617529880478,0.8099601593625498,0.8103585657370518,0.8107569721115537,0.8111553784860558,0.8115537848605577,0.8119521912350598,0.8123505976095617,0.8127490039840638,0.8131474103585657,0.8135458167330677,0.8139442231075698,0.8143426294820717,0.8147410358565738,0.8151394422310757,0.8155378486055777,0.8159362549800797,0.8163346613545817,0.8167330677290837,0.8171314741035857,0.8175298804780876,0.8179282868525897,0.8183266932270916,0.8187250996015937,0.8191235059760956,0.8195219123505976,0.8199203187250996,0.8203187250996016,0.8207171314741036,0.8211155378486056,0.8215139442231075,0.8219123505976096,0.8223107569721115,0.8227091633466136,0.8231075697211155,0.8235059760956175,0.8239043824701195,0.8243027888446215,0.8247011952191236,0.8250996015936255,0.8254980079681274,0.8258964143426295,0.8262948207171315,0.8266932270916335,0.8270916334661355,0.8274900398406374,0.8278884462151395,0.8282868525896414,0.8286852589641435,0.8290836653386454,0.8294820717131474,0.8298804780876494,0.8302788844621514,0.8306772908366534,0.8310756972111554,0.8314741035856573,0.8318725099601594,0.8322709163346613,0.8326693227091634,0.8330677290836653,0.8334661354581673,0.8338645418326693,0.8342629482071713,0.8346613545816733,0.8350597609561753,0.8354581673306772,0.8358565737051793,0.8362549800796812,0.8366533864541833,0.8370517928286852,0.8374501992031872,0.8378486055776893,0.8382470119521912,0.8386454183266933,0.8390438247011952,0.8394422310756973,0.8398406374501992,0.8402390438247012,0.8406374501992032,0.8410358565737052,0.8414342629482072,0.8418326693227092,0.8422310756972111,0.8426294820717132,0.8430278884462151,0.8434262948207172,0.8438247011952191,0.8442231075697211,0.8446215139442231,0.8450199203187251,0.8454183266932271,0.8458167330677291,0.846215139442231,0.8466135458167331,0.847011952191235,0.8474103585657371,0.847808764940239,0.848207171314741,0.848605577689243,0.849003984063745,0.8494023904382471,0.849800796812749,0.850199203187251,0.850597609561753,0.850996015936255,0.851394422310757,0.851792828685259,0.8521912350597609,0.852589641434263,0.8529880478087649,0.853386454183267,0.8537848605577689,0.8541832669322709,0.8545816733067729,0.8549800796812749,0.8553784860557769,0.8557768924302789,0.8561752988047808,0.8565737051792829,0.8569721115537848,0.8573705179282869,0.8577689243027888,0.8581673306772908,0.8585657370517928,0.8589641434262948,0.8593625498007968,0.8597609561752988,0.8601593625498007,0.8605577689243028,0.8609561752988047,0.8613545816733068,0.8617529880478088,0.8621513944223107,0.8625498007968128,0.8629482071713147,0.8633466135458168,0.8637450199203187,0.8641434262948208,0.8645418326693227,0.8649402390438247,0.8653386454183267,0.8657370517928287,0.8661354581673307,0.8665338645418327,0.8669322709163346,0.8673306772908367,0.8677290836653386,0.8681274900398407,0.8685258964143426,0.8689243027888446,0.8693227091633466,0.8697211155378486,0.8701195219123506,0.8705179282868526,0.8709163346613545,0.8713147410358566,0.8717131474103585,0.8721115537848606,0.8725099601593626,0.8729083665338645,0.8733067729083666,0.8737051792828685,0.8741035856573706,0.8745019920318725,0.8749003984063745,0.8752988047808765,0.8756972111553785,0.8760956175298805,0.8764940239043825,0.8768924302788844,0.8772908366533865,0.8776892430278884,0.8780876494023905,0.8784860557768924,0.8788844621513944,0.8792828685258964,0.8796812749003984,0.8800796812749004,0.8804780876494024,0.8808764940239043,0.8812749003984064,0.8816733067729083,0.8820717131474104,0.8824701195219123,0.8828685258964143,0.8832669322709163,0.8836653386454183,0.8840637450199204,0.8844621513944223,0.8848605577689242,0.8852589641434263,0.8856573705179283,0.8860557768924303,0.8864541832669323,0.8868525896414342,0.8872509960159363,0.8876494023904382,0.8880478087649403,0.8884462151394422,0.8888446215139443,0.8892430278884462,0.8896414342629482,0.8900398406374502,0.8904382470119522,0.8908366533864542,0.8912350597609562,0.8916334661354581,0.8920318725099602,0.8924302788844621,0.8928286852589642,0.8932270916334661,0.8936254980079681,0.8940239043824701,0.8944223107569721,0.8948207171314742,0.8952191235059761,0.895617529880478,0.8960159362549801,0.896414342629482,0.8968127490039841,0.8972111553784861,0.897609561752988,0.8980079681274901,0.898406374501992,0.8988047808764941,0.899203187250996,0.899601593625498,0.9,0.900398406374502,0.900796812749004,0.901195219123506,0.9015936254980079,0.90199203187251,0.9023904382470119,0.902788844621514,0.9031872509960159,0.9035856573705179,0.9039840637450199,0.9043824701195219,0.904780876494024,0.9051792828685259,0.9055776892430278,0.9059760956175299,0.9063745019920318,0.9067729083665339,0.9071713147410359,0.9075697211155378,0.9079681274900399,0.9083665338645418,0.9087649402390439,0.9091633466135458,0.9095617529880478,0.9099601593625498,0.9103585657370518,0.9107569721115538,0.9111553784860558,0.9115537848605577,0.9119521912350598,0.9123505976095617,0.9127490039840638,0.9131474103585657,0.9135458167330678,0.9139442231075697,0.9143426294820717,0.9147410358565737,0.9151394422310757,0.9155378486055777,0.9159362549800797,0.9163346613545816,0.9167330677290837,0.9171314741035856,0.9175298804780877,0.9179282868525896,0.9183266932270916,0.9187250996015937,0.9191235059760956,0.9195219123505977,0.9199203187250996,0.9203187250996016,0.9207171314741036,0.9211155378486056,0.9215139442231076,0.9219123505976096,0.9223107569721115,0.9227091633466136,0.9231075697211155,0.9235059760956176,0.9239043824701195,0.9243027888446215,0.9247011952191235,0.9250996015936255,0.9254980079681275,0.9258964143426295,0.9262948207171314,0.9266932270916335,0.9270916334661354,0.9274900398406375,0.9278884462151394,0.9282868525896414,0.9286852589641434,0.9290836653386454,0.9294820717131475,0.9298804780876494,0.9302788844621513,0.9306772908366534,0.9310756972111554,0.9314741035856574,0.9318725099601594,0.9322709163346613,0.9326693227091634,0.9330677290836653,0.9334661354581674,0.9338645418326693,0.9342629482071713,0.9346613545816733,0.9350597609561753,0.9354581673306773,0.9358565737051793,0.9362549800796812,0.9366533864541833,0.9370517928286852,0.9374501992031873,0.9378486055776892,0.9382470119521913,0.9386454183266932,0.9390438247011952,0.9394422310756972,0.9398406374501992,0.9402390438247012,0.9406374501992032,0.9410358565737051,0.9414342629482072,0.9418326693227091,0.9422310756972112,0.9426294820717132,0.9430278884462151,0.9434262948207172,0.9438247011952191,0.9442231075697212,0.9446215139442231,0.9450199203187251,0.9454183266932271,0.9458167330677291,0.9462151394422311,0.9466135458167331,0.947011952191235,0.9474103585657371,0.947808764940239,0.9482071713147411,0.948605577689243,0.949003984063745,0.949402390438247,0.949800796812749,0.950199203187251,0.950597609561753,0.9509960159362549,0.951394422310757,0.9517928286852589,0.952191235059761,0.952589641434263,0.9529880478087649,0.953386454183267,0.9537848605577689,0.954183266932271,0.9545816733067729,0.9549800796812749,0.9553784860557769,0.9557768924302789,0.9561752988047809,0.9565737051792829,0.9569721115537848,0.9573705179282869,0.9577689243027888,0.9581673306772909,0.9585657370517928,0.9589641434262948,0.9593625498007968,0.9597609561752988,0.9601593625498008,0.9605577689243028,0.9609561752988047,0.9613545816733068,0.9617529880478087,0.9621513944223108,0.9625498007968127,0.9629482071713148,0.9633466135458167,0.9637450199203187,0.9641434262948207,0.9645418326693227,0.9649402390438248,0.9653386454183267,0.9657370517928286,0.9661354581673307,0.9665338645418327,0.9669322709163347,0.9673306772908367,0.9677290836653386,0.9681274900398407,0.9685258964143426,0.9689243027888447,0.9693227091633466,0.9697211155378486,0.9701195219123506,0.9705179282868526,0.9709163346613546,0.9713147410358566,0.9717131474103585,0.9721115537848606,0.9725099601593625,0.9729083665338646,0.9733067729083665,0.9737051792828685,0.9741035856573705,0.9745019920318725,0.9749003984063745,0.9752988047808765,0.9756972111553784,0.9760956175298805,0.9764940239043824,0.9768924302788845,0.9772908366533865,0.9776892430278884,0.9780876494023905,0.9784860557768924,0.9788844621513945,0.9792828685258964,0.9796812749003984,0.9800796812749004,0.9804780876494024,0.9808764940239044,0.9812749003984064,0.9816733067729083,0.9820717131474104,0.9824701195219123,0.9828685258964144,0.9832669322709163,0.9836653386454183,0.9840637450199203,0.9844621513944223,0.9848605577689243,0.9852589641434263,0.9856573705179282,0.9860557768924303,0.9864541832669322,0.9868525896414343,0.9872509960159362,0.9876494023904383,0.9880478087649402,0.9884462151394422,0.9888446215139443,0.9892430278884462,0.9896414342629483,0.9900398406374502,0.9904382470119522,0.9908366533864542,0.9912350597609562,0.9916334661354582,0.9920318725099602,0.9924302788844621,0.9928286852589642,0.9932270916334661,0.9936254980079682,0.9940239043824701,0.9944223107569721,0.9948207171314741,0.9952191235059761,0.9956175298804781,0.9960159362549801,0.996414342629482,0.9968127490039841,0.997211155378486,0.9976095617529881,0.99800796812749,0.998406374501992,0.998804780876494,0.999203187250996,0.999601593625498,1.0]}
},{}],69:[function(require,module,exports){
module.exports={"expected":[-0.732668256045411,-0.7301774959607861,-0.7276828637714429,-0.7251843569596472,-0.722681973085027,-0.7201757097855548,-0.7176655647785356,-0.7151515358616019,-0.7126336209137127,-0.7101118178961604,-0.7075861248535815,-0.7050565399149744,-0.7025230612947212,-0.6999856872936164,-0.6974444162999006,-0.6948992467902989,-0.6923501773310651,-0.6897972065790315,-0.6872403332826629,-0.6846795562831156,-0.682114874515303,-0.6795462870089631,-0.6769737928897338,-0.6743973913802306,-0.6718170818011299,-0.6692328635722564,-0.6666447362136749,-0.6640526993467866,-0.661456752695428,-0.6588568960869771,-0.6562531294534589,-0.653645452832659,-0.6510338663692373,-0.6484183703158484,-0.6457989650342617,-0.6431756509964887,-0.6405484287859092,-0.6379172990984048,-0.6352822627434911,-0.6326433206454551,-0.6300004738444944,-0.6273537234978581,-0.624703070880991,-0.6220485173886784,-0.6193900645361942,-0.6167277139604489,-0.6140614674211409,-0.6113913268019078,-0.6087172941114788,-0.6060393714848292,-0.6033575611843338,-0.6006718656009229,-0.5979822872552362,-0.5952888287987791,-0.5925914930150771,-0.5898902828208319,-0.5871852012670742,-0.5844762515403182,-0.581763436963714,-0.5790467609981991,-0.5763262272436482,-0.5736018394400215,-0.5708736014685112,-0.5681415173526857,-0.5654055912596313,-0.5626658275010916,-0.5599222305346032,-0.5571748049646297,-0.5544235555436903,-0.5516684871734865,-0.5489096049060241,-0.5461469139447301,-0.5433804196455665,-0.5406101275181393,-0.5378360432268003,-0.5350581725917463,-0.5322765215901104,-0.5294910963570492,-0.5267019031868218,-0.5239089485338639,-0.5211122390138538,-0.518311781404772,-0.5155075826479527,-0.512699649849128,-0.5098879902794633,-0.5070726113765849,-0.5042535207455985,-0.5014307261600979,-0.49860423556316547,-0.4957740570683619,-0.492940198960706,-0.49010266969764427,-0.48726147791000873,-0.4844166324029652,-0.48156814215694754,-0.47871601632858335,-0.47586026425160377,-0.4730008954377434,-0.47013791957762563,-0.46727134654163566,-0.4644011863807788,-0.461527449327526,-0.458650145796643,-0.4557692863860069,-0.45288488187740567,-0.449996943237323,-0.447105481617707,-0.4442105083567227,-0.44131203497948734,-0.43841007319878933,-0.4355046349157889,-0.4325957322207017,-0.4296833773934635,-0.4267675829043766,-0.42384836141473736,-0.4209257257774438,-0.4179996890375841,-0.4150702644330044,-0.41213746539485663,-0.4092013055481246,-0.40626179871212964,-0.40331895890101427,-0.40037280032420336,-0.39742333738684354,-0.39447058469021945,-0.391514557032147,-0.3885552694073422,-0.3855927370077681,-0.38262697522295475,-0.3796579996402969,-0.3766858260453248,-0.3737104704219512,-0.37073194895269135,-0.3677502780188576,-0.36476547420072736,-0.36177755427768393,-0.3587865352283311,-0.3557924342305791,-0.35279526866170363,-0.3497950560983762,-0.3467918143166663,-0.3437855612920147,-0.34077631519917756,-0.3377640944121411,-0.33474891750400665,-0.3317308032468457,-0.3287097706115241,-0.3256858387674969,-0.3226590270825705,-0.31962935512263546,-0.31659684265136634,-0.3135615096298908,-0.3105233762164269,-0.30748246276588675,-0.30443878982944966,-0.30139237815410125,-0.29834324868214035,-0.2952914225506522,-0.2922369210909494,-0.2891797658279777,-0.28611997847969023,-0.28305758095638567,-0.27999259536001386,-0.27692504398344714,-0.2738549493097162,-0.270782334011213,-0.2677072209488575,-0.26462963317123145,-0.26154959391367544,-0.2584671265973526,-0.2553822548282761,-0.25229500239630237,-0.249205393274089,-0.24611345161601683,-0.2430192017570778,-0.23992266821172636,-0.23682387567269675,-0.23372284900978393,-0.2306196132685902,-0.2275141936692356,-0.22440661560503372,-0.2212969046411321,-0.21818508651311744,-0.2150711871255858,-0.21195523255067777,-0.20883724902657888,-0.2057172629559849,-0.20259530090453293,-0.19947138959919766,-0.19634555592665323,-0.19321782693160108,-0.1900882298150636,-0.18695679193264397,-0.18382354079275232,-0.1806885040547986,-0.1775517095273521,-0.17441318516626783,-0.17127295907278076,-0.16813105949156706,-0.1649875148087734,-0.16184235355001445,-0.1586956043783388,-0.15554729609216345,-0.15239745762317783,-0.149246118034217,-0.14609330651710456,-0.14293905239046611,-0.13978338509751295,-0.1366263342037972,-0.13346792939493782,-0.13030820047431882,-0.1271471773607597,-0.12398489008615848,-0.12082136879310806,-0.11765664373248619,-0.1144907452610196,-0.11132370383882287,-0.10815555002691236,-0.10498631448469592,-0.10181602796743876,-0.0986447213237062,-0.09547242549278369,-0.09229917150207476,-0.08912499046447739,-0.08594991357573957,-0.08277397211179445,-0.0795971974260758,-0.07641962094681423,-0.07324127417431528,-0.07006218867821921,-0.06688239609474397,-0.06370192812391141,-0.06052081652675767,-0.05733909312252836,-0.05415678978585922,-0.05097393844394283,-0.04779057107368219,-0.04460671969883195,-0.04142241638712759,-0.03823769324740386,-0.03505258242670257,-0.031867116107370946,-0.02868132650415101,-0.025495245861260705,-0.02230890644946769,-0.019122340563156322,-0.0159355805173887,-0.012748658644960434,-0.009561607293451959,-0.00637445882227607,-0.003187245599722458,0.0,0.003187245599722458,0.00637445882227607,0.009561607293451959,0.012748658644960434,0.0159355805173887,0.019122340563156322,0.02230890644946769,0.025495245861260705,0.02868132650415101,0.031867116107370946,0.03505258242670257,0.03823769324740386,0.04142241638712759,0.04460671969883195,0.04779057107368219,0.05097393844394283,0.05415678978585922,0.05733909312252836,0.06052081652675767,0.06370192812391141,0.06688239609474397,0.07006218867821921,0.07324127417431528,0.07641962094681423,0.0795971974260758,0.08277397211179445,0.08594991357573957,0.08912499046447739,0.09229917150207476,0.09547242549278369,0.0986447213237062,0.10181602796743876,0.10498631448469592,0.10815555002691236,0.11132370383882287,0.1144907452610196,0.11765664373248619,0.12082136879310806,0.12398489008615848,0.1271471773607597,0.13030820047431882,0.13346792939493782,0.1366263342037972,0.13978338509751295,0.14293905239046611,0.14609330651710456,0.149246118034217,0.15239745762317783,0.15554729609216345,0.1586956043783388,0.16184235355001445,0.1649875148087734,0.16813105949156706,0.17127295907278076,0.17441318516626783,0.1775517095273521,0.1806885040547986,0.18382354079275232,0.18695679193264397,0.1900882298150636,0.19321782693160108,0.19634555592665323,0.19947138959919766,0.20259530090453293,0.2057172629559849,0.20883724902657888,0.21195523255067777,0.2150711871255858,0.21818508651311744,0.2212969046411321,0.22440661560503372,0.2275141936692356,0.2306196132685902,0.23372284900978393,0.23682387567269675,0.23992266821172636,0.2430192017570778,0.24611345161601683,0.249205393274089,0.25229500239630237,0.2553822548282761,0.2584671265973526,0.26154959391367544,0.26462963317123145,0.2677072209488575,0.270782334011213,0.2738549493097162,0.27692504398344714,0.27999259536001386,0.28305758095638567,0.28611997847969023,0.2891797658279777,0.2922369210909494,0.2952914225506522,0.29834324868214035,0.30139237815410125,0.30443878982944966,0.30748246276588675,0.3105233762164269,0.3135615096298908,0.31659684265136634,0.31962935512263546,0.3226590270825705,0.3256858387674969,0.3287097706115241,0.3317308032468457,0.33474891750400665,0.3377640944121411,0.34077631519917756,0.3437855612920147,0.3467918143166663,0.3497950560983762,0.35279526866170363,0.3557924342305791,0.3587865352283311,0.36177755427768393,0.36476547420072736,0.3677502780188576,0.37073194895269135,0.3737104704219512,0.3766858260453248,0.3796579996402969,0.38262697522295475,0.3855927370077681,0.3885552694073422,0.391514557032147,0.39447058469021945,0.39742333738684354,0.40037280032420336,0.40331895890101427,0.40626179871212964,0.4092013055481246,0.41213746539485663,0.4150702644330044,0.4179996890375841,0.4209257257774438,0.42384836141473736,0.4267675829043766,0.4296833773934635,0.4325957322207017,0.4355046349157889,0.43841007319878933,0.44131203497948734,0.4442105083567227,0.447105481617707,0.449996943237323,0.45288488187740567,0.4557692863860069,0.458650145796643,0.461527449327526,0.4644011863807788,0.46727134654163566,0.47013791957762563,0.4730008954377434,0.47586026425160377,0.47871601632858335,0.48156814215694754,0.4844166324029652,0.48726147791000873,0.49010266969764427,0.492940198960706,0.4957740570683619,0.49860423556316547,0.5014307261600979,0.5042535207455985,0.5070726113765849,0.5098879902794633,0.512699649849128,0.5155075826479527,0.518311781404772,0.5211122390138538,0.5239089485338639,0.5267019031868218,0.5294910963570492,0.5322765215901104,0.5350581725917463,0.5378360432268003,0.5406101275181393,0.5433804196455665,0.5461469139447301,0.5489096049060241,0.5516684871734865,0.5544235555436903,0.5571748049646297,0.5599222305346032,0.5626658275010916,0.5654055912596313,0.5681415173526857,0.5708736014685112,0.5736018394400215,0.5763262272436482,0.5790467609981991,0.581763436963714,0.5844762515403182,0.5871852012670742,0.5898902828208319,0.5925914930150771,0.5952888287987791,0.5979822872552362,0.6006718656009229,0.6033575611843338,0.6060393714848292,0.6087172941114788,0.6113913268019078,0.6140614674211409,0.6167277139604489,0.6193900645361942,0.6220485173886784,0.624703070880991,0.6273537234978581,0.6300004738444944,0.6326433206454551,0.6352822627434911,0.6379172990984048,0.6405484287859092,0.6431756509964887,0.6457989650342617,0.6484183703158484,0.6510338663692373,0.653645452832659,0.6562531294534589,0.6588568960869771,0.661456752695428,0.6640526993467866,0.6666447362136749,0.6692328635722564,0.6718170818011299,0.6743973913802306,0.6769737928897338,0.6795462870089631,0.682114874515303,0.6846795562831156,0.6872403332826629,0.6897972065790315,0.6923501773310651,0.6948992467902989,0.6974444162999006,0.6999856872936164,0.7025230612947212,0.7050565399149744,0.7075861248535815,0.7101118178961604,0.7126336209137127,0.7151515358616019,0.7176655647785356,0.7201757097855548,0.722681973085027,0.7251843569596472,0.7276828637714429,0.7301774959607861,0.732668256045411],"x":[-0.8,-0.796812749003984,-0.7936254980079681,-0.7904382470119522,-0.7872509960159363,-0.7840637450199203,-0.7808764940239044,-0.7776892430278884,-0.7745019920318725,-0.7713147410358566,-0.7681274900398406,-0.7649402390438247,-0.7617529880478088,-0.7585657370517929,-0.7553784860557768,-0.7521912350597609,-0.749003984063745,-0.7458167330677291,-0.7426294820717132,-0.7394422310756972,-0.7362549800796813,-0.7330677290836654,-0.7298804780876494,-0.7266932270916334,-0.7235059760956175,-0.7203187250996016,-0.7171314741035857,-0.7139442231075698,-0.7107569721115538,-0.7075697211155378,-0.7043824701195219,-0.701195219123506,-0.69800796812749,-0.6948207171314741,-0.6916334661354582,-0.6884462151394423,-0.6852589641434262,-0.6820717131474103,-0.6788844621513944,-0.6756972111553785,-0.6725099601593626,-0.6693227091633466,-0.6661354581673307,-0.6629482071713148,-0.6597609561752988,-0.6565737051792828,-0.6533864541832669,-0.650199203187251,-0.6470119521912351,-0.6438247011952192,-0.6406374501992032,-0.6374501992031872,-0.6342629482071713,-0.6310756972111554,-0.6278884462151394,-0.6247011952191235,-0.6215139442231076,-0.6183266932270917,-0.6151394422310758,-0.6119521912350597,-0.6087649402390438,-0.6055776892430279,-0.602390438247012,-0.599203187250996,-0.5960159362549801,-0.5928286852589641,-0.5896414342629482,-0.5864541832669322,-0.5832669322709163,-0.5800796812749004,-0.5768924302788845,-0.5737051792828686,-0.5705179282868525,-0.5673306772908366,-0.5641434262948207,-0.5609561752988048,-0.5577689243027888,-0.5545816733067729,-0.551394422310757,-0.5482071713147411,-0.5450199203187251,-0.5418326693227091,-0.5386454183266932,-0.5354581673306773,-0.5322709163346614,-0.5290836653386454,-0.5258964143426295,-0.5227091633466135,-0.5195219123505976,-0.5163346613545817,-0.5131474103585657,-0.5099601593625498,-0.5067729083665339,-0.503585657370518,-0.500398406374502,-0.49721115537848604,-0.4940239043824701,-0.49083665338645416,-0.48764940239043825,-0.48446215139442234,-0.48127490039840637,-0.47808764940239046,-0.4749003984063745,-0.4717131474103586,-0.4685258964143426,-0.4653386454183267,-0.46215139442231074,-0.4589641434262948,-0.45577689243027886,-0.45258964143426295,-0.44940239043824703,-0.44621513944223107,-0.44302788844621516,-0.4398406374501992,-0.4366533864541833,-0.4334661354581673,-0.4302788844621514,-0.42709163346613543,-0.4239043824701195,-0.4207171314741036,-0.41752988047808764,-0.41434262948207173,-0.41115537848605577,-0.40796812749003986,-0.4047808764940239,-0.401593625498008,-0.398406374501992,-0.3952191235059761,-0.39203187250996013,-0.3888446215139442,-0.3856573705179283,-0.38247011952191234,-0.37928286852589643,-0.37609561752988047,-0.37290836653386455,-0.3697211155378486,-0.3665338645418327,-0.3633466135458167,-0.3601593625498008,-0.3569721115537849,-0.3537848605577689,-0.350597609561753,-0.34741035856573704,-0.34422310756972113,-0.34103585657370517,-0.33784860557768925,-0.3346613545816733,-0.3314741035856574,-0.3282868525896414,-0.3250996015936255,-0.3219123505976096,-0.3187250996015936,-0.3155378486055777,-0.31235059760956174,-0.30916334661354583,-0.30597609561752986,-0.30278884462151395,-0.299601593625498,-0.2964143426294821,-0.2932270916334661,-0.2900398406374502,-0.2868525896414343,-0.2836653386454183,-0.2804780876494024,-0.27729083665338644,-0.27410358565737053,-0.27091633466135456,-0.26772908366533865,-0.2645418326693227,-0.2613545816733068,-0.25816733067729086,-0.2549800796812749,-0.251792828685259,-0.24860557768924302,-0.24541832669322708,-0.24223107569721117,-0.23904382470119523,-0.2358565737051793,-0.23266932270916335,-0.2294820717131474,-0.22629482071713147,-0.22310756972111553,-0.2199203187250996,-0.21673306772908366,-0.21354581673306772,-0.2103585657370518,-0.20717131474103587,-0.20398406374501993,-0.200796812749004,-0.19760956175298805,-0.1944223107569721,-0.19123505976095617,-0.18804780876494023,-0.1848605577689243,-0.18167330677290836,-0.17848605577689244,-0.1752988047808765,-0.17211155378486057,-0.16892430278884463,-0.1657370517928287,-0.16254980079681275,-0.1593625498007968,-0.15617529880478087,-0.15298804780876493,-0.149800796812749,-0.14661354581673305,-0.14342629482071714,-0.1402390438247012,-0.13705179282868526,-0.13386454183266933,-0.1306772908366534,-0.12749003984063745,-0.12430278884462151,-0.12111553784860558,-0.11792828685258964,-0.1147410358565737,-0.11155378486055777,-0.10836653386454183,-0.1051792828685259,-0.10199203187250996,-0.09880478087649402,-0.09561752988047809,-0.09243027888446215,-0.08924302788844622,-0.08605577689243028,-0.08286852589641434,-0.0796812749003984,-0.07649402390438247,-0.07330677290836653,-0.0701195219123506,-0.06693227091633466,-0.06374501992031872,-0.06055776892430279,-0.05737051792828685,-0.054183266932270914,-0.05099601593625498,-0.04780876494023904,-0.04462151394422311,-0.04143426294820717,-0.03824701195219123,-0.0350597609561753,-0.03187250996015936,-0.028685258964143426,-0.02549800796812749,-0.022310756972111555,-0.019123505976095617,-0.01593625498007968,-0.012749003984063745,-0.009561752988047808,-0.006374501992031873,-0.0031872509960159364,0.0,0.0031872509960159364,0.006374501992031873,0.009561752988047808,0.012749003984063745,0.01593625498007968,0.019123505976095617,0.022310756972111555,0.02549800796812749,0.028685258964143426,0.03187250996015936,0.0350597609561753,0.03824701195219123,0.04143426294820717,0.04462151394422311,0.04780876494023904,0.05099601593625498,0.054183266932270914,0.05737051792828685,0.06055776892430279,0.06374501992031872,0.06693227091633466,0.0701195219123506,0.07330677290836653,0.07649402390438247,0.0796812749003984,0.08286852589641434,0.08605577689243028,0.08924302788844622,0.09243027888446215,0.09561752988047809,0.09880478087649402,0.10199203187250996,0.1051792828685259,0.10836653386454183,0.11155378486055777,0.1147410358565737,0.11792828685258964,0.12111553784860558,0.12430278884462151,0.12749003984063745,0.1306772908366534,0.13386454183266933,0.13705179282868526,0.1402390438247012,0.14342629482071714,0.14661354581673305,0.149800796812749,0.15298804780876493,0.15617529880478087,0.1593625498007968,0.16254980079681275,0.1657370517928287,0.16892430278884463,0.17211155378486057,0.1752988047808765,0.17848605577689244,0.18167330677290836,0.1848605577689243,0.18804780876494023,0.19123505976095617,0.1944223107569721,0.19760956175298805,0.200796812749004,0.20398406374501993,0.20717131474103587,0.2103585657370518,0.21354581673306772,0.21673306772908366,0.2199203187250996,0.22310756972111553,0.22629482071713147,0.2294820717131474,0.23266932270916335,0.2358565737051793,0.23904382470119523,0.24223107569721117,0.24541832669322708,0.24860557768924302,0.251792828685259,0.2549800796812749,0.25816733067729086,0.2613545816733068,0.2645418326693227,0.26772908366533865,0.27091633466135456,0.27410358565737053,0.27729083665338644,0.2804780876494024,0.2836653386454183,0.2868525896414343,0.2900398406374502,0.2932270916334661,0.2964143426294821,0.299601593625498,0.30278884462151395,0.30597609561752986,0.30916334661354583,0.31235059760956174,0.3155378486055777,0.3187250996015936,0.3219123505976096,0.3250996015936255,0.3282868525896414,0.3314741035856574,0.3346613545816733,0.33784860557768925,0.34103585657370517,0.34422310756972113,0.34741035856573704,0.350597609561753,0.3537848605577689,0.3569721115537849,0.3601593625498008,0.3633466135458167,0.3665338645418327,0.3697211155378486,0.37290836653386455,0.37609561752988047,0.37928286852589643,0.38247011952191234,0.3856573705179283,0.3888446215139442,0.39203187250996013,0.3952191235059761,0.398406374501992,0.401593625498008,0.4047808764940239,0.40796812749003986,0.41115537848605577,0.41434262948207173,0.41752988047808764,0.4207171314741036,0.4239043824701195,0.42709163346613543,0.4302788844621514,0.4334661354581673,0.4366533864541833,0.4398406374501992,0.44302788844621516,0.44621513944223107,0.44940239043824703,0.45258964143426295,0.45577689243027886,0.4589641434262948,0.46215139442231074,0.4653386454183267,0.4685258964143426,0.4717131474103586,0.4749003984063745,0.47808764940239046,0.48127490039840637,0.48446215139442234,0.48764940239043825,0.49083665338645416,0.4940239043824701,0.49721115537848604,0.500398406374502,0.503585657370518,0.5067729083665339,0.5099601593625498,0.5131474103585657,0.5163346613545817,0.5195219123505976,0.5227091633466135,0.5258964143426295,0.5290836653386454,0.5322709163346614,0.5354581673306773,0.5386454183266932,0.5418326693227091,0.5450199203187251,0.5482071713147411,0.551394422310757,0.5545816733067729,0.5577689243027888,0.5609561752988048,0.5641434262948207,0.5673306772908366,0.5705179282868525,0.5737051792828686,0.5768924302788845,0.5800796812749004,0.5832669322709163,0.5864541832669322,0.5896414342629482,0.5928286852589641,0.5960159362549801,0.599203187250996,0.602390438247012,0.6055776892430279,0.6087649402390438,0.6119521912350597,0.6151394422310758,0.6183266932270917,0.6215139442231076,0.6247011952191235,0.6278884462151394,0.6310756972111554,0.6342629482071713,0.6374501992031872,0.6406374501992032,0.6438247011952192,0.6470119521912351,0.650199203187251,0.6533864541832669,0.6565737051792828,0.6597609561752988,0.6629482071713148,0.6661354581673307,0.6693227091633466,0.6725099601593626,0.6756972111553785,0.6788844621513944,0.6820717131474103,0.6852589641434262,0.6884462151394423,0.6916334661354582,0.6948207171314741,0.69800796812749,0.701195219123506,0.7043824701195219,0.7075697211155378,0.7107569721115538,0.7139442231075698,0.7171314741035857,0.7203187250996016,0.7235059760956175,0.7266932270916334,0.7298804780876494,0.7330677290836654,0.7362549800796813,0.7394422310756972,0.7426294820717132,0.7458167330677291,0.749003984063745,0.7521912350597609,0.7553784860557768,0.7585657370517929,0.7617529880478088,0.7649402390438247,0.7681274900398406,0.7713147410358566,0.7745019920318725,0.7776892430278884,0.7808764940239044,0.7840637450199203,0.7872509960159363,0.7904382470119522,0.7936254980079681,0.796812749003984,0.8]}
},{}],70:[function(require,module,exports){
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
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var EPS = require( '@stdlib/constants/float64/eps' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var abs = require( '@stdlib/math/base/special/abs' );
var asinh = require( './../lib' );


// FIXTURES //

var largerNegative = require( './fixtures/julia/larger_negative.json' );
var largerPositive = require( './fixtures/julia/larger_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var smaller = require( './fixtures/julia/smaller.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof asinh, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function underflows if provided a number which is negligible compared to unity', function test( t ) {
	var x = EPS / 2.0;
	var v = asinh( x );
	t.strictEqual( v, 0.0, 'returns 0' );
	t.end();
});

tape( 'the function computes the hyperbolic arcsine on the interval `[-0.8,0.8]` (tests whether `asinh` behaves as an odd function)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smaller.x;
	expected = smaller.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = asinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 50.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Delta: '+delta+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arcsine on the interval `[-1.0,-0.8]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = asinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.5 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Delta: '+delta+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arcsine on the interval `[0.8,1.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = asinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.5 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Delta: '+delta+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arcsine on the interval `[-3.0,-1.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = asinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 2.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Delta: '+delta+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arcsine on the interval `[1.0,3.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = asinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 2.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Delta: '+delta+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arcsine on the interval `[3.0,28.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = asinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Delta: '+delta+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arcsine on the interval `[-28.0,-3.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = asinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Delta: '+delta+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arcsine on the interval `[28.0,100.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largerPositive.x;
	expected = largerPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = asinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Delta: '+delta+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the hyperbolic arcsine on the interval `[-100.0,-28.0]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largerNegative.x;
	expected = largerNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = asinh( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. Expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. Value: '+y+'. Expected: '+expected[i]+'. Delta: '+delta+'. Tolerance: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function overflows if provided a value which, when squared, overflows', function test( t ) {
	var x = 1.0e200;
	var v = asinh( x );
	t.strictEqual( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', function test( t ) {
	var v = asinh( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', function test( t ) {
	var v = asinh( PINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `-infinity` if provided `-infinity`', function test( t ) {
	var v = asinh( NINF );
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0`', function test( t ) {
	var v = asinh( -0 );
	t.equal( isNegativeZero( v ), true, 'returns -0' );
	t.end();
});

tape( 'the function returns `+0` if provided `+0`', function test( t ) {
	var v = asinh( +0 );
	t.equal( isPositiveZero( v ), true, 'returns +0' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/fast/asinh/test/test.js")
},{"./../lib":60,"./fixtures/julia/large_negative.json":61,"./fixtures/julia/large_positive.json":62,"./fixtures/julia/larger_negative.json":63,"./fixtures/julia/larger_positive.json":64,"./fixtures/julia/medium_negative.json":65,"./fixtures/julia/medium_positive.json":66,"./fixtures/julia/small_negative.json":67,"./fixtures/julia/small_positive.json":68,"./fixtures/julia/smaller.json":69,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":44,"@stdlib/constants/float64/pinf":45,"@stdlib/math/base/assert/is-nan":51,"@stdlib/math/base/assert/is-negative-zero":53,"@stdlib/math/base/assert/is-positive-zero":55,"@stdlib/math/base/special/abs":57,"tape":193}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ln.js":72}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":73,"./polyval_q.js":74,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":44,"@stdlib/math/base/assert/is-nan":51,"@stdlib/number/float64/base/get-high-word":80,"@stdlib/number/float64/base/set-high-word":83}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./number.js":78}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":79,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],82:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":79}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":82,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":86,"./polyfill.js":87,"@stdlib/assert/has-tostringtag-support":20}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":88}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":88,"./tostringtag.js":89,"@stdlib/assert/has-own-property":16}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){

},{}],92:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"dup":91}],93:[function(require,module,exports){
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
},{"_process":185}],95:[function(require,module,exports){
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

},{"events":93,"inherits":180,"readable-stream/lib/_stream_duplex.js":97,"readable-stream/lib/_stream_passthrough.js":98,"readable-stream/lib/_stream_readable.js":99,"readable-stream/lib/_stream_transform.js":100,"readable-stream/lib/_stream_writable.js":101,"readable-stream/lib/internal/streams/end-of-stream.js":105,"readable-stream/lib/internal/streams/pipeline.js":107}],96:[function(require,module,exports){
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
},{"./_stream_readable":99,"./_stream_writable":101,"_process":185,"inherits":180}],98:[function(require,module,exports){
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
},{"./_stream_transform":100,"inherits":180}],99:[function(require,module,exports){
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
},{"../errors":96,"./_stream_duplex":97,"./internal/streams/async_iterator":102,"./internal/streams/buffer_list":103,"./internal/streams/destroy":104,"./internal/streams/from":106,"./internal/streams/state":108,"./internal/streams/stream":109,"_process":185,"buffer":110,"events":93,"inherits":180,"string_decoder/":192,"util":91}],100:[function(require,module,exports){
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
},{"../errors":96,"./_stream_duplex":97,"inherits":180}],101:[function(require,module,exports){
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
},{"../errors":96,"./_stream_duplex":97,"./internal/streams/destroy":104,"./internal/streams/state":108,"./internal/streams/stream":109,"_process":185,"buffer":110,"inherits":180,"util-deprecate":201}],102:[function(require,module,exports){
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
},{"./end-of-stream":105,"_process":185}],103:[function(require,module,exports){
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
},{"buffer":110,"util":91}],104:[function(require,module,exports){
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
},{"_process":185}],105:[function(require,module,exports){
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
},{"base64-js":90,"buffer":110,"ieee754":179}],111:[function(require,module,exports){
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

},{"./":112,"get-intrinsic":175}],112:[function(require,module,exports){
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

},{"function-bind":174,"get-intrinsic":175}],113:[function(require,module,exports){
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

},{"./lib/is_arguments.js":114,"./lib/keys.js":115}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],116:[function(require,module,exports){
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

},{"object-keys":183}],117:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],118:[function(require,module,exports){
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

},{"./ToNumber":148,"./ToPrimitive":150,"./Type":155}],119:[function(require,module,exports){
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

},{"../helpers/isFinite":164,"../helpers/isNaN":165,"../helpers/isPrefixOf":166,"./ToNumber":148,"./ToPrimitive":150,"./Type":155,"get-intrinsic":175}],120:[function(require,module,exports){
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

},{"get-intrinsic":175}],121:[function(require,module,exports){
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

},{"./DayWithinYear":124,"./InLeapYear":128,"./MonthFromTime":138,"get-intrinsic":175}],122:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":170,"./floor":159}],123:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":159}],124:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":122,"./DayFromYear":123,"./YearFromTime":157}],125:[function(require,module,exports){
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

},{"./modulo":160}],126:[function(require,module,exports){
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

},{"../helpers/assertRecord":163,"./IsAccessorDescriptor":129,"./IsDataDescriptor":131,"./Type":155,"get-intrinsic":175}],127:[function(require,module,exports){
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

},{"../helpers/timeConstants":170,"./floor":159,"./modulo":160}],128:[function(require,module,exports){
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

},{"./DaysInYear":125,"./YearFromTime":157,"get-intrinsic":175}],129:[function(require,module,exports){
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

},{"../helpers/assertRecord":163,"./Type":155,"has":178}],130:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":181}],131:[function(require,module,exports){
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

},{"../helpers/assertRecord":163,"./Type":155,"has":178}],132:[function(require,module,exports){
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

},{"../helpers/assertRecord":163,"./IsAccessorDescriptor":129,"./IsDataDescriptor":131,"./Type":155}],133:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":167,"./IsAccessorDescriptor":129,"./IsDataDescriptor":131,"./Type":155}],134:[function(require,module,exports){
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

},{"../helpers/isFinite":164,"../helpers/timeConstants":170}],135:[function(require,module,exports){
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

},{"../helpers/isFinite":164,"./DateFromTime":121,"./Day":122,"./MonthFromTime":138,"./ToInteger":147,"./YearFromTime":157,"./floor":159,"./modulo":160,"get-intrinsic":175}],136:[function(require,module,exports){
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

},{"../helpers/isFinite":164,"../helpers/timeConstants":170,"./ToInteger":147}],137:[function(require,module,exports){
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

},{"../helpers/timeConstants":170,"./floor":159,"./modulo":160}],138:[function(require,module,exports){
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

},{"./DayWithinYear":124,"./InLeapYear":128}],139:[function(require,module,exports){
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

},{"../helpers/isNaN":165}],140:[function(require,module,exports){
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

},{"../helpers/timeConstants":170,"./floor":159,"./modulo":160}],141:[function(require,module,exports){
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

},{"./Type":155}],142:[function(require,module,exports){
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


},{"../helpers/isFinite":164,"./ToNumber":148,"./abs":158,"get-intrinsic":175}],143:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":170,"./DayFromYear":123}],144:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":170,"./modulo":160}],145:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],146:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":148}],147:[function(require,module,exports){
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

},{"../helpers/isFinite":164,"../helpers/isNaN":165,"../helpers/sign":169,"./ToNumber":148,"./abs":158,"./floor":159}],148:[function(require,module,exports){
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

},{"./ToPrimitive":150}],149:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":120,"get-intrinsic":175}],150:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":171}],151:[function(require,module,exports){
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

},{"./IsCallable":130,"./ToBoolean":145,"./Type":155,"get-intrinsic":175,"has":178}],152:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":175}],153:[function(require,module,exports){
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

},{"../helpers/isFinite":164,"../helpers/isNaN":165,"../helpers/sign":169,"./ToNumber":148,"./abs":158,"./floor":159,"./modulo":160}],154:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":148}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":122,"./modulo":160}],157:[function(require,module,exports){
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

},{"call-bind/callBound":111,"get-intrinsic":175}],158:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":175}],159:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],160:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":168}],161:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":170,"./modulo":160}],162:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":118,"./5/AbstractRelationalComparison":119,"./5/CheckObjectCoercible":120,"./5/DateFromTime":121,"./5/Day":122,"./5/DayFromYear":123,"./5/DayWithinYear":124,"./5/DaysInYear":125,"./5/FromPropertyDescriptor":126,"./5/HourFromTime":127,"./5/InLeapYear":128,"./5/IsAccessorDescriptor":129,"./5/IsCallable":130,"./5/IsDataDescriptor":131,"./5/IsGenericDescriptor":132,"./5/IsPropertyDescriptor":133,"./5/MakeDate":134,"./5/MakeDay":135,"./5/MakeTime":136,"./5/MinFromTime":137,"./5/MonthFromTime":138,"./5/SameValue":139,"./5/SecFromTime":140,"./5/StrictEqualityComparison":141,"./5/TimeClip":142,"./5/TimeFromYear":143,"./5/TimeWithinDay":144,"./5/ToBoolean":145,"./5/ToInt32":146,"./5/ToInteger":147,"./5/ToNumber":148,"./5/ToObject":149,"./5/ToPrimitive":150,"./5/ToPropertyDescriptor":151,"./5/ToString":152,"./5/ToUint16":153,"./5/ToUint32":154,"./5/Type":155,"./5/WeekDay":156,"./5/YearFromTime":157,"./5/abs":158,"./5/floor":159,"./5/modulo":160,"./5/msFromTime":161}],163:[function(require,module,exports){
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

},{"get-intrinsic":175,"has":178}],164:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],165:[function(require,module,exports){
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

},{"call-bind/callBound":111}],167:[function(require,module,exports){
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

},{"get-intrinsic":175,"has":178}],168:[function(require,module,exports){
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

},{"./helpers/isPrimitive":172,"is-callable":181}],172:[function(require,module,exports){
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

},{"function-bind":174,"has":178,"has-symbols":176}],176:[function(require,module,exports){
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

},{"./shams":177}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":174}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
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

},{"./isArguments":184}],183:[function(require,module,exports){
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

},{"./implementation":182,"./isArguments":184}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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
},{"_process":185,"through":199,"timers":200}],187:[function(require,module,exports){
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

},{"buffer":110}],188:[function(require,module,exports){
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

},{"es-abstract/es5":162,"function-bind":174}],189:[function(require,module,exports){
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

},{"./implementation":188,"./polyfill":190,"./shim":191,"define-properties":116,"function-bind":174}],190:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":188}],191:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":190,"define-properties":116}],192:[function(require,module,exports){
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
},{"safe-buffer":187}],193:[function(require,module,exports){
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
},{"./lib/default_stream":194,"./lib/results":196,"./lib/test":197,"_process":185,"defined":117,"through":199,"timers":200}],194:[function(require,module,exports){
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
},{"_process":185,"fs":92,"through":199}],195:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":185,"timers":200}],196:[function(require,module,exports){
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
},{"_process":185,"events":93,"function-bind":174,"has":178,"inherits":180,"object-inspect":198,"resumer":186,"through":199,"timers":200}],197:[function(require,module,exports){
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
},{"./next_tick":195,"deep-equal":113,"defined":117,"events":93,"has":178,"inherits":180,"path":94,"string.prototype.trim":189}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
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
},{"_process":185,"stream":95}],200:[function(require,module,exports){
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
},{"process/browser.js":185,"timers":200}],201:[function(require,module,exports){
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
},{}]},{},[70]);
