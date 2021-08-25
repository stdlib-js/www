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

},{"@stdlib/utils/native-class":168}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":168}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":168}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":168}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* The Euler-Mascheroni constant.
*
* @module @stdlib/constants/float64/eulergamma
* @type {number}
*
* @example
* var GAMMA = require( '@stdlib/constants/float64/eulergamma' );
* // returns 0.5772156649015329
*/


// MAIN //

/**
* The Euler-Mascheroni constant.
*
* @constant
* @type {number}
* @default 0.5772156649015329
* @see [OEIS]{@link http://oeis.org/A001620}
* @see [Mathworld]{@link http://mathworld.wolfram.com/Euler-MascheroniConstant.html}
*/
var GAMMA = 0.577215664901532860606512090082402431042;


// EXPORTS //

module.exports = GAMMA;

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
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @module @stdlib/constants/float64/gamma-lanczos-g
* @type {number}
*
* @example
* var FLOAT64_GAMMA_LANCZOS_G = require( '@stdlib/constants/float64/gamma-lanczos-g' );
* // returns 10.900511
*/


// MAIN //

/**
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @constant
* @type {number}
* @default 10.900511
* @see [Lanczos Approximation]{@link https://en.wikipedia.org/wiki/Lanczos_approximation}
*/
var FLOAT64_GAMMA_LANCZOS_G = 10.90051099999999983936049829935654997826;


// EXPORTS //

module.exports = FLOAT64_GAMMA_LANCZOS_G;

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

},{"@stdlib/number/ctor":140}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* The mathematical constant `π`.
*
* @module @stdlib/constants/float64/pi
* @type {number}
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
* // returns 3.141592653589793
*/


// MAIN //

/**
* The mathematical constant `π`.
*
* @constant
* @type {number}
* @default 3.141592653589793
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var PI = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679; // eslint-disable-line max-len


// EXPORTS //

module.exports = PI;

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
* Square root of the mathematical constant `π` times `2`.
*
* @module @stdlib/constants/float64/sqrt-two-pi
* @type {number}
*
* @example
* var SQRT_TWO_PI = require( '@stdlib/constants/float64/sqrt-two-pi' );
* // returns 2.5066282746310007
*/


// MAIN //

/**
* Square root of the mathematical constant `π` times `2`.
*
* @constant
* @type {number}
* @default 2.5066282746310007
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var SQRT_TWO_PI = 2.506628274631000502415765284811045253e+00;


// EXPORTS //

module.exports = SQRT_TWO_PI;

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

var isEven = require( './is_even.js' );


// EXPORTS //

module.exports = isEven;

},{"./is_even.js":61}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isInfinite = require( './main.js' );


// EXPORTS //

module.exports = isInfinite;

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

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isInteger = require( './is_integer.js' );


// EXPORTS //

module.exports = isInteger;

},{"./is_integer.js":65}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":85}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":52}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a finite numeric value is an odd number.
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

var isOdd = require( './is_odd.js' );


// EXPORTS //

module.exports = isOdd;

},{"./is_odd.js":71}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Tests if a finite numeric value is an odd number.
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

},{"@stdlib/math/base/assert/is-even":60}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":73}],73:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":144,"@stdlib/number/float64/base/get-high-word":148,"@stdlib/number/float64/base/to-words":162}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./copysign.js":76}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./expmulti.js":79,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/trunc":138}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":81,"@stdlib/math/base/special/ldexp":112}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./exp.js":78}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var FACTORIALS = require( './factorials.json' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider extracting as a constant


// MAIN //

/**
* Evaluates the factorial of `x`.
*
* @param {number} x - input value
* @returns {number} factorial
*
* @example
* var v = factorial( 3.0 );
* // returns 6.0
*
* @example
* var v = factorial( -1.5 );
* // returns ~-3.545
*
* @example
* var v = factorial( -0.5 );
* // returns ~1.772
*
* @example
* var v = factorial( 0.5 );
* // returns ~0.886
*
* @example
* var v = factorial( -10.0 );
* // returns NaN
*
* @example
* var v = factorial( 171.0 );
* // returns Infinity
*
* @example
* var v = factorial( NaN );
* // returns NaN
*/
function factorial( x ) {
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInteger( x ) ) {
		if ( x < 0 ) {
			return NaN;
		}
		if ( x <= MAX_FACTORIAL ) {
			return FACTORIALS[ x ];
		}
		return PINF;
	}
	return gamma( x + 1.0 );
}


// EXPORTS //

module.exports = factorial;

},{"./factorials.json":83,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-integer":64,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/gamma":101}],83:[function(require,module,exports){
module.exports=[
	1,
	1,
	2,
	6,
	24,
	120,
	720,
	5040,
	40320,
	362880.0,
	3628800.0,
	39916800.0,
	479001600.0,
	6227020800.0,
	87178291200.0,
	1307674368000.0,
	20922789888000.0,
	355687428096000.0,
	6402373705728000.0,
	121645100408832000.0,
	0.243290200817664e19,
	0.5109094217170944e20,
	0.112400072777760768e22,
	0.2585201673888497664e23,
	0.62044840173323943936e24,
	0.15511210043330985984e26,
	0.403291461126605635584e27,
	0.10888869450418352160768e29,
	0.304888344611713860501504e30,
	0.8841761993739701954543616e31,
	0.26525285981219105863630848e33,
	0.822283865417792281772556288e34,
	0.26313083693369353016721801216e36,
	0.868331761881188649551819440128e37,
	0.29523279903960414084761860964352e39,
	0.103331479663861449296666513375232e41,
	0.3719933267899012174679994481508352e42,
	0.137637530912263450463159795815809024e44,
	0.5230226174666011117600072241000742912e45,
	0.203978820811974433586402817399028973568e47,
	0.815915283247897734345611269596115894272e48,
	0.3345252661316380710817006205344075166515e50,
	0.1405006117752879898543142606244511569936e52,
	0.6041526306337383563735513206851399750726e53,
	0.265827157478844876804362581101461589032e55,
	0.1196222208654801945619631614956577150644e57,
	0.5502622159812088949850305428800254892962e58,
	0.2586232415111681806429643551536119799692e60,
	0.1241391559253607267086228904737337503852e62,
	0.6082818640342675608722521633212953768876e63,
	0.3041409320171337804361260816606476884438e65,
	0.1551118753287382280224243016469303211063e67,
	0.8065817517094387857166063685640376697529e68,
	0.427488328406002556429801375338939964969e70,
	0.2308436973392413804720927426830275810833e72,
	0.1269640335365827592596510084756651695958e74,
	0.7109985878048634518540456474637249497365e75,
	0.4052691950487721675568060190543232213498e77,
	0.2350561331282878571829474910515074683829e79,
	0.1386831185456898357379390197203894063459e81,
	0.8320987112741390144276341183223364380754e82,
	0.507580213877224798800856812176625227226e84,
	0.3146997326038793752565312235495076408801e86,
	0.1982608315404440064116146708361898137545e88,
	0.1268869321858841641034333893351614808029e90,
	0.8247650592082470666723170306785496252186e91,
	0.5443449390774430640037292402478427526443e93,
	0.3647111091818868528824985909660546442717e95,
	0.2480035542436830599600990418569171581047e97,
	0.1711224524281413113724683388812728390923e99,
	0.1197857166996989179607278372168909873646e101,
	0.8504785885678623175211676442399260102886e102,
	0.6123445837688608686152407038527467274078e104,
	0.4470115461512684340891257138125051110077e106,
	0.3307885441519386412259530282212537821457e108,
	0.2480914081139539809194647711659403366093e110,
	0.188549470166605025498793226086114655823e112,
	0.1451830920282858696340707840863082849837e114,
	0.1132428117820629783145752115873204622873e116,
	0.8946182130782975286851441715398316520698e117,
	0.7156945704626380229481153372318653216558e119,
	0.5797126020747367985879734231578109105412e121,
	0.4753643337012841748421382069894049466438e123,
	0.3945523969720658651189747118012061057144e125,
	0.3314240134565353266999387579130131288001e127,
	0.2817104114380550276949479442260611594801e129,
	0.2422709538367273238176552320344125971528e131,
	0.210775729837952771721360051869938959523e133,
	0.1854826422573984391147968456455462843802e135,
	0.1650795516090846108121691926245361930984e137,
	0.1485715964481761497309522733620825737886e139,
	0.1352001527678402962551665687594951421476e141,
	0.1243841405464130725547532432587355307758e143,
	0.1156772507081641574759205162306240436215e145,
	0.1087366156656743080273652852567866010042e147,
	0.103299784882390592625997020993947270954e149,
	0.9916779348709496892095714015418938011582e150,
	0.9619275968248211985332842594956369871234e152,
	0.942689044888324774562618574305724247381e154,
	0.9332621544394415268169923885626670049072e156,
	0.9332621544394415268169923885626670049072e158,
	0.9425947759838359420851623124482936749562e160,
	0.9614466715035126609268655586972595484554e162,
	0.990290071648618040754671525458177334909e164,
	0.1029901674514562762384858386476504428305e167,
	0.1081396758240290900504101305800329649721e169,
	0.1146280563734708354534347384148349428704e171,
	0.1226520203196137939351751701038733888713e173,
	0.132464181945182897449989183712183259981e175,
	0.1443859583202493582204882102462797533793e177,
	0.1588245541522742940425370312709077287172e179,
	0.1762952551090244663872161047107075788761e181,
	0.1974506857221074023536820372759924883413e183,
	0.2231192748659813646596607021218715118256e185,
	0.2543559733472187557120132004189335234812e187,
	0.2925093693493015690688151804817735520034e189,
	0.339310868445189820119825609358857320324e191,
	0.396993716080872089540195962949863064779e193,
	0.4684525849754290656574312362808384164393e195,
	0.5574585761207605881323431711741977155627e197,
	0.6689502913449127057588118054090372586753e199,
	0.8094298525273443739681622845449350829971e201,
	0.9875044200833601362411579871448208012564e203,
	0.1214630436702532967576624324188129585545e206,
	0.1506141741511140879795014161993280686076e208,
	0.1882677176888926099743767702491600857595e210,
	0.237217324288004688567714730513941708057e212,
	0.3012660018457659544809977077527059692324e214,
	0.3856204823625804217356770659234636406175e216,
	0.4974504222477287440390234150412680963966e218,
	0.6466855489220473672507304395536485253155e220,
	0.8471580690878820510984568758152795681634e222,
	0.1118248651196004307449963076076169029976e225,
	0.1487270706090685728908450891181304809868e227,
	0.1992942746161518876737324194182948445223e229,
	0.269047270731805048359538766214698040105e231,
	0.3659042881952548657689727220519893345429e233,
	0.5012888748274991661034926292112253883237e235,
	0.6917786472619488492228198283114910358867e237,
	0.9615723196941089004197195613529725398826e239,
	0.1346201247571752460587607385894161555836e242,
	0.1898143759076170969428526414110767793728e244,
	0.2695364137888162776588507508037290267094e246,
	0.3854370717180072770521565736493325081944e248,
	0.5550293832739304789551054660550388118e250,
	0.80479260574719919448490292577980627711e252,
	0.1174997204390910823947958271638517164581e255,
	0.1727245890454638911203498659308620231933e257,
	0.2556323917872865588581178015776757943262e259,
	0.380892263763056972698595524350736933546e261,
	0.571338395644585459047893286526105400319e263,
	0.8627209774233240431623188626544191544816e265,
	0.1311335885683452545606724671234717114812e268,
	0.2006343905095682394778288746989117185662e270,
	0.308976961384735088795856467036324046592e272,
	0.4789142901463393876335775239063022722176e274,
	0.7471062926282894447083809372938315446595e276,
	0.1172956879426414428192158071551315525115e279,
	0.1853271869493734796543609753051078529682e281,
	0.2946702272495038326504339507351214862195e283,
	0.4714723635992061322406943211761943779512e285,
	0.7590705053947218729075178570936729485014e287,
	0.1229694218739449434110178928491750176572e290,
	0.2004401576545302577599591653441552787813e292,
	0.3287218585534296227263330311644146572013e294,
	0.5423910666131588774984495014212841843822e296,
	0.9003691705778437366474261723593317460744e298,
	0.1503616514864999040201201707840084015944e301,
	0.2526075744973198387538018869171341146786e303,
	0.4269068009004705274939251888899566538069e305,
	0.7257415615307998967396728211129263114717e307
]

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
*/

'use strict';

/**
* Evaluate the factorial function.
*
* @module @stdlib/math/base/special/factorial
*
* @example
* var factorial = require( '@stdlib/math/base/special/factorial' );
*
* var v = factorial( 3.0 );
* // returns 6.0
*
* v = factorial( -1.5 );
* // returns ~-3.545
*
* v = factorial( -0.5 );
* // returns ~1.772
*
* v = factorial( 0.5 );
* // returns ~0.886
*
* v = factorial( -10.0 );
* // returns NaN
*
* v = factorial( 171.0 );
* // returns Infinity
*
* v = factorial( NaN );
* // returns NaN
*/

// MODULES //

var factorial = require( './factorial.js' );


// EXPORTS //

module.exports = factorial;

},{"./factorial.js":82}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var gammaDeltaRatioLanczos = require( './gamma_delta_ratio_lanczos.js' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider moving to pkg


// MAIN //

/**
* Computes the ratio of two gamma functions.
*
* ## Notes
*
* -   Specifically, the function evaluates
*
*     ```tex
*     \frac{ \Gamma( z ) }{ \Gamma( z + \delta ) }
*     ```
*
* @param {number} z - first gamma parameter
* @param {number} delta - difference
* @returns {number} gamma ratio
*
* @example
* var y = gammaDeltaRatio( 2.0, 3.0 );
* // returns ~0.042
*
* @example
* var y = gammaDeltaRatio( 4.0, 0.5 );
* // returns ~0.516
*
* @example
* var y = gammaDeltaRatio( 100.0, 0.0 );
* // returns 1.0
*/
function gammaDeltaRatio( z, delta ) {
	var result;
	var idelta;
	var iz;

	if ( z <= 0.0 || z + delta <= 0.0 ) {
		// This isn't very sophisticated, or accurate, but it does work:
		return gamma( z ) / gamma( z + delta );
	}
	idelta = floor( delta );
	if ( idelta === delta ) {
		iz = floor( z );
		if ( iz === z ) {
			// As both `z` and `delta` are integers, see if we can use a table lookup:
			if ( z <= MAX_FACTORIAL && ( z + delta <= MAX_FACTORIAL ) ) {
				return factorial( iz - 1.0 ) / factorial( idelta + iz - 1.0 );
			}
		}
		if ( abs(delta) < 20.0 ) {
			// As `delta` is a small integer, we can use a finite product:
			if ( delta === 0.0 ) {
				return 1.0;
			}
			if ( delta < 0.0 ) {
				z -= 1.0;
				result = z;
				delta += 1.0;
				while ( delta !== 0.0 ) {
					z -= 1.0;
					result *= z;
					delta += 1.0;
				}
				return result;
			}
			result = 1.0 / z;
			delta -= 1.0;
			while ( delta !== 0.0 ) {
				z += 1.0;
				result /= z;
				delta -= 1.0;
			}
			return result;
		}
	}
	return gammaDeltaRatioLanczos( z, delta );
}


// EXPORTS //

module.exports = gammaDeltaRatio;

},{"./gamma_delta_ratio_lanczos.js":88,"@stdlib/math/base/special/abs":72,"@stdlib/math/base/special/factorial":84,"@stdlib/math/base/special/floor":85,"@stdlib/math/base/special/gamma":101}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var lanczosSum = require( '@stdlib/math/base/special/gamma-lanczos-sum' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var EPSILON = require( '@stdlib/constants/float64/eps' );
var E = require( '@stdlib/constants/float64/e' );
var G = require( '@stdlib/constants/float64/gamma-lanczos-g' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider moving to pkg
var FACTORIAL_169 = 4.269068009004705e+304;


// MAIN //

/**
* Calculates the ratio of two gamma functions via Lanczos approximation.
*
* ## Notes
*
* -   When \\( z < \epsilon \\), we get spurious numeric overflow unless we're very careful. This can occur either inside `lanczosSum(z)` or in the final combination of terms. To avoid this, split the product up into 2 (or 3) parts:
*
*     ```tex
*     \begin{align*}
*     G(z) / G(L) &= 1 / (z \cdot G(L)) ; z < \eps, L = z + \delta = \delta \\
*     z * G(L) &= z * G(lim) \cdot (G(L)/G(lim)) ; lim = \text{largest factorial}
*     \end{align*}
*     ```
*
* @private
* @param {number} z - first gamma parameter
* @param {number} delta - difference
* @returns {number} gamma ratio
*/
function gammaDeltaRatioLanczos( z, delta ) {
	var result;
	var ratio;
	var zgh;

	if ( z < EPSILON ) {
		if ( delta > MAX_FACTORIAL ) {
			ratio = gammaDeltaRatioLanczos( delta, MAX_FACTORIAL-delta );
			ratio *= z;
			ratio *= FACTORIAL_169;
			return 1.0 / ratio;
		}
		return 1.0 / ( z * gamma( z+delta ) );
	}
	zgh = z + G - 0.5;
	if ( z + delta === z ) {
		if ( abs(delta) < 10.0 ) {
			result = exp( ( 0.5-z ) * log1p( delta/zgh ) );
		} else {
			result = 1.0;
		}
	} else {
		if ( abs(delta) < 10.0 ) {
			result = exp( ( 0.5-z ) * log1p( delta/zgh ));
		} else {
			result = pow( zgh / (zgh+delta), z-0.5 );
		}
		// Split up the calculation to avoid spurious overflow:
		result *= lanczosSum( z ) / lanczosSum( z + delta );
	}
	result *= pow( E / ( zgh+delta ), delta );
	return result;
}


// EXPORTS //

module.exports = gammaDeltaRatioLanczos;

},{"@stdlib/constants/float64/e":42,"@stdlib/constants/float64/eps":43,"@stdlib/constants/float64/gamma-lanczos-g":46,"@stdlib/math/base/special/abs":72,"@stdlib/math/base/special/exp":80,"@stdlib/math/base/special/gamma":101,"@stdlib/math/base/special/gamma-lanczos-sum":98,"@stdlib/math/base/special/log1p":114,"@stdlib/math/base/special/pow":117}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Calculate the ratio of two gamma functions.
*
* @module @stdlib/math/base/special/gamma-delta-ratio
*
* @example
* var gammaDeltaRatio = require( '@stdlib/math/base/special/gamma-delta-ratio' );
*
* var y = gammaDeltaRatio( 2.0, 3.0 );
* // returns ~0.042
*
* y = gammaDeltaRatio( 4.0, 0.5 );
* // returns 2.0
*
* y = gammaDeltaRatio( 100.0, 0.0 );
* // returns 1.0
*/

// MODULES //

var gammaDeltaRatio = require( './gamma_delta_ratio.js' );


// EXPORTS //

module.exports = gammaDeltaRatio;

},{"./gamma_delta_ratio.js":87}],90:[function(require,module,exports){
module.exports={"z":[303.65710702491924,496.58902896568179,284.14748936658725,156.46023795939982,438.87228231644258,432.82113331370056,154.4461424020119,197.13713004719466,179.49481461197138,380.98109145881608,86.030831665266305,427.08244673907757,471.71985183376819,132.05515286652371,333.40937917120755,483.52752412902191,255.34771585837007,364.73054690053686,330.47897142125294,491.85389786260203,286.01657081861049,387.15253226924688,334.2363958270289,120.83237611455843,285.62638818286359,195.71707020746544,368.89191328315064,122.26116051198915,275.57279288070276,421.07192574301735,497.0411712047644,477.71954042371362,132.77801716700196,390.66392430104315,79.725188035517931,435.12534035835415,81.557808371726424,244.16195656638592,59.88794538192451,186.36140450369567,220.15259840060025,423.98218275979161,240.73526683961973,290.52513108821586,201.93360389443114,86.806819173507392,388.84718242567033,129.72635287092999,325.11129976250231,260.88244998827577,392.83078207401559,222.5377548346296,468.44117766944692,386.97040002793074,487.18820078764111,197.82018608413637,120.25332185672596,392.73944620741531,95.270872330293059,491.32399043999612,357.24517557537183,427.69600932719186,74.095410865265876,422.27216397877783,276.94006951292977,202.58140627061948,279.26178542198613,53.794193700887263,434.73571012727916,488.51395197445527,257.88106392836198,426.01696788566187,214.92448803968728,438.64638251019642,345.5726371333003,65.484263221733272,378.39123440440744,45.216752043925226,274.42466069711372,318.54794884799048,193.42495587887242,375.76973423594609,100.49871031893417,319.2980679939501,305.46327070100233,341.43613727763295,153.20829720469192,477.09428038215265,50.893423315137625,154.96713190339506,384.81863413006067,462.11129137547687,144.10911907441914,85.646377382799983,237.92908667121083,177.1408817358315,353.26415760908276,439.89423785358667,198.83725883672014,139.81253720354289,376.0798352654092,409.78749240050092,215.5125128547661,291.56993033131585,351.20545603102073,473.48838589619845,360.90229388559237,266.7406274494715,237.88354480173439,343.2159077632241,39.20148559845984,101.89389433013275,185.50320313777775,487.41752412403002,229.42546337144449,327.87044641561806,157.02709860634059,113.96539796376601,122.6152863772586,64.847117944154888,416.20895519852638,262.63814666075632,232.06305998610333,399.41055641276762,447.25234982790425,248.39947720756754,213.85600674431771,445.02488063415512,391.48376265075058,334.2633826774545,216.4920104900375,454.52325562015176,410.00162821961567,32.807598824147135,384.88623410463333,355.97404985688627,207.37590654054657,304.99213287606835,131.52889068005607,79.519807414617389,401.49139094632119,495.45035135000944,476.17283809231594,138.09625178109854,183.9557544910349,186.46668180357665,345.49425257369876,354.00994002819061,236.16313844919205,481.86775053618476,421.7452812124975,136.50157373864204,391.36149759404361,464.39346066908911,108.60916528385133,441.83570981491357,435.13082687044516,232.91992859914899,495.23991121444851,251.31708192871884,271.77902302704751,294.18816553428769,445.61207815539092,423.67924362188205,306.37224733596668,99.705173128750175,102.73360403720289,330.46074589714408,123.93552555469796,497.92903291527182,221.26877143513411,330.51522855879739,381.89168656943366,236.57361254561692,418.02439342951402,43.342524408362806,401.28262443933636,69.080923642031848,179.70639687264338,279.27257701056078,281.01013854844496,397.54071135539562,72.276818959508091,376.22325584525242,82.501702059525996,119.37565468251705,94.0574980690144,153.05881385225803,348.96658397046849,242.55504103144631,262.73319911211729,246.21263580163941,119.16389175225049,346.60945725860074,262.65273723518476,113.16794393118471,99.375864546746016,118.28049261355773,55.837850458920002,75.348801854997873,429.83495687600225,182.22106528235599,293.46297758864239,110.05345257697627,466.91616849275306,41.625014131423086,357.4335821182467,420.40220270631835,303.91175474505872,145.06934054428712,413.23669021017849,96.756453404668719,443.13653505407274,103.05772474268451,494.78845948120579,172.41504050791264,30.245516300201416,45.778989256359637,436.75613699946553,222.36600939882919,317.90623944718391,398.06811325950548,495.2765958965756,238.38479842059314,278.00963548244908,38.219459136016667,255.37599037634209,164.31865172693506,406.63337126374245,477.15644943527877,137.08618147997186,110.51806134637445,264.10431981552392,74.250420562457293,453.40067105833441,158.73852148884907,300.09077261434868,124.64104984188452,427.23374652676284,383.96468687104061,377.16093705967069,406.4133277349174,305.4139079595916,305.45956790447235,145.96522558247671,263.58742421492934,343.21562214987352,307.75742503115907,69.23692204291001,297.3320157523267,324.20110046165064,116.99606278445572,340.64394050044939,453.7786207976751,372.98337246058509,41.497208832297474,448.65349692059681,154.25694281700999,491.68251518858597,397.78217380633578,391.44366822671145,311.85999588109553,303.27985008945689,291.42125512240455,466.30713894963264,75.3703907225281,302.64247161569074,465.5899087828584,37.981980827171355,217.24391904193908,86.804000246338546,48.754381984472275,435.47403891338035,305.00488545745611,257.61936123017222,224.2110197735019,427.08216944243759,90.880704703740776,128.42039031209424,316.20131826261058,289.57693076692522,56.041015442460775,326.04518844746053,428.69900615653023,45.035779108293355,242.4700417323038,318.91530681867152,257.95675781322643,200.33338933018968,61.700021473225206,53.280314768198878,133.87276537017897,260.09789309464395,332.85142134409398,120.47988284146413,488.64095777506009,87.849359335377812,476.19090144056827,126.58225938910618,376.14207074278966,98.862007062416524,227.80119775561616,118.86392189888284,352.29490222176537,50.046631272416562,352.52155928639695,328.54302350664511,138.69514478603378,162.47742162551731,497.54413390764967,283.14043814083561,234.72874388331547,356.72662910772488,379.58253764780238,264.58452690392733,188.88375295791775,281.82649690192193,200.57041120482609,239.23608630197123,495.24512830888852,88.248169464059174,370.78679065452889,260.46792510664091,423.62812627339736,430.90913161635399,217.07664952846244,440.74588072719052,430.29699862701818,157.03833885956556,110.65337006933987,127.97683868790045,475.27530087390915,295.54039778420702,194.92142352741212,330.94655877677724,210.89295765617862,226.00360926473513,217.87311288760975,126.80849131662399,367.63222074368969,475.52856692578644,422.88123882608488,68.573465428780764,476.91089461557567,79.683431144803762,60.071285844314843,96.759328031912446,342.32706686947495,108.2364091114141,112.86642180755734,321.85056299204007,204.35029204236344,299.64359019882977,109.14795615710318,54.476610883139074,83.205265025608242,467.66465066932142,101.70951799955219,372.47098922263831,215.89288899442181,376.78557677194476,216.34331011213362,59.800116869155318,43.143313911277801,434.40706359921023,241.51516571873799,469.1704075364396,76.315578534267843,492.66720682848245,460.52837119204924,433.70124264620245,249.16899814503267,399.21272462932393,382.0905336481519,271.28738593310118,372.78476098552346,113.47315407823771,376.06426485115662,217.33706357423216,338.57769555645064,92.947688521817327,131.42753470921889,44.518087948672473,54.201543778181076,471.3966016471386,57.588314169552177,171.61385030252859,228.06120723718777,168.90089958440512,410.89289529481903,186.48005376104265,178.90498977620155,249.52204568311572,445.52307556383312,334.65325026307255,222.28081739274785,41.857244705315679,124.73648486193269,425.83710818551481,41.98484088294208,292.74529799120501,61.227007901761681,431.42697586910799,347.90649401722476,193.50322137819603,68.105477557983249,239.63252649642527,184.82342114904895,55.492557706311345,203.70249480940402,113.24054126394913,404.52301361132413,341.51978883193806,112.94805229175836,185.48962917178869,73.573910214472562,452.28848796570674,58.018829459324479,85.532944016158581,164.8461179761216,494.55642566317692,366.5133729018271,283.79158744588494,261.96466764435172,362.25118642905727,455.4085273318924,499.76106101414189,220.13993817847222,165.28919204603881,61.666862310376018,224.82559196650982,206.26158528728411,248.4747716714628,428.83192688925192,389.05982681782916,201.41280392650515,414.5559011795558,97.027254474814981,77.10412569809705,228.19879090879112,113.71496572159231,438.41240214416757,199.02840912807733,498.6094578076154,56.651205385569483,280.8354696794413,275.28626753715798,215.44618675950915,187.84901726292446,186.16518255090341,112.56444467231631,50.224937060847878,128.20493465289474,432.56220555165783,455.42217395966873,114.92575972341001,347.43385491659865,186.65859504370019,250.18005364807323,232.74124680785462,458.7022651382722,183.90653718262911,78.8854396995157,148.7174360989593,380.40665603941306,91.835574151482433,376.04570436058566,72.545206651557237,294.07486797077581,477.50727542676032,116.57122660428286,161.3858772162348,310.68933471338823,301.73469324363396,170.97038443433121,195.91469243168831,93.037779070436954,178.97231212584302,129.92272102274001,395.06785367615521,450.62258933437988,203.98437242489308,63.582823309116066,119.99864240176976,143.96868495969102,35.18155297730118,55.264563511591405,214.36900530941784,237.60936528677121,456.13646384095773,36.243103169836104,494.023091646377,451.67993324110284,363.19401831366122,122.42935033515096,329.83780512353405,73.884141794405878,321.89562435261905,174.46244077058509,464.79454235406592,244.34710164554417,443.95152224460617,77.784616139251739,39.142590812407434,497.83316947519779,368.59043810516596,186.08363195089623,307.80610722489655,169.75300381658599,56.560241472907364,59.161253424827009,330.22578492527828,170.17466629622504,169.34162779478356,51.785094845108688,248.34319014800712,267.55122604314238,475.5286177014932,387.87016798509285,289.40825474448502,326.6028984147124,266.60284713143483,72.249078352469951,92.66814396250993,68.005338015500456,365.16891524428502,395.30305025167763,464.79705969104543,455.41332673048601,454.66794417006895,280.87281729094684,329.05740986810997,81.302479556761682,190.72544660652056,418.13016141531989,341.91708345897496,188.90592870069668,340.0168845965527,168.16733550745994,157.10596509743482,380.76730986591429,331.87165472889319,34.858209337107837,231.74928045365959,52.770248719025403,407.03996506752446,343.92057882156223,186.12627435242757,313.62995111616328,363.93811298767105,277.26815914968029,337.51063609030098,372.96344113536179,143.10797796584666,362.40913717774674,461.98510389542207,397.24721463862807,313.80353279411793,165.34917993238196,210.12537637259811,355.49003273015842,396.65898310951889,291.63482387317345,262.65222816495225,216.36477149324492,445.9784860513173,58.947612559422851,217.05417296150699,396.68249937472865,160.63075206708163,188.66441842867061,143.98739766795188,315.69697892526165,30.700907637365162,378.38940472807735,215.64400136237964,79.262225537095219,124.93876214604825,90.107537764124572,392.87513651419431,288.28385057393461,315.9746698429808,258.05782083887607,396.1567628919147,448.5235704225488,264.71433663973585,405.51133286906406,210.72026564739645,375.14030686579645,420.44352975441143,54.125986571889371,90.139882108196616,64.256092328578234,147.34256707597524,71.607906802091748,266.48172233952209,405.22490634117275,90.259370368439704,473.21382348425686,489.98271414311603,351.34631790919229,371.62857800722122,92.078989716246724,134.9975404003635,369.68053135788068,350.8111986448057,81.866135862655938,240.89277198771015,85.221640127710998,345.86769498419017,331.13742236047983,457.40180999273434,184.54268062487245,424.21820520656183,337.29165327036753,129.58802047651261,382.09178618853912,477.00298128416762,304.09729070961475,442.6090603787452,377.81519309384748,363.26305904891342,140.36864740774035,486.23530229087919,375.43004442937672,228.76742016989738,486.18130385875702,423.51991011062637,437.45723800035194,73.86007027933374,70.530228647403419,346.51051926193759,202.22521228017285,76.234185404609889,203.52343756239861,357.82105284975842,351.96338456822559,131.49711898528039,311.03256908012554,395.58010789565742,401.00105476099998,67.946205108892173,202.79687035595998,220.49154736334458,126.83309367857873,127.52050668699667,70.733277525287122,69.965354928281158,392.80894140712917,274.01579106925055,126.66702286573127,489.88903504330665,212.48766874661669,108.06239988887683,289.33590767905116,461.68300540186465,137.60802749311551,173.23339268332347,331.71209283638746,303.01800622604787,257.70577283808962,426.62251677596942,101.36739664943889,212.39395780256018,397.50802733935416,32.826364825014025,77.284973445348442,34.662314800079912,168.21117923595011,123.23522635037079,141.565319634974,214.88957689609379,279.50996066210791,122.36467849928886,73.004403868690133,422.57140896515921,220.4982471303083,396.47732765646651,79.277738390956074,66.285598531831056,82.773464256897569,166.96734502213076,398.68110976414755,159.47569895768538,167.0380480051972,322.20181609038264,313.6607162700966,462.95046016806737,483.27865411527455,135.94663192285225,233.26794824795797,163.85391153162345,356.53353336267173,69.777865849900991,386.30666031735018,184.06462504761294,233.34189474815503,54.486454147845507,338.08407656848431,317.11564867058769,81.584874449763447,285.94919255003333,468.86712949257344,193.51478171534836,118.10657793888822,277.67429181374609,155.10405406821519,499.93480935459957,404.98022072715685,431.96720137493685,259.17377129197121,454.39282355364412,391.41038409434259,90.538575474638492,216.12317072227597,319.43449400132522,158.28123065875843,420.26050817221403,47.500277399085462,494.28048913367093,346.44860780797899,333.440732951276,231.89529617549852,382.65618093078956,242.31743884738535,385.96480105305091,316.63286832626909,343.32276381552219,57.919549820944667,283.81292604608461,178.4313752129674,373.2197120366618,393.17940030712634,396.47864180617034,357.32350563863292,259.66410583583638,88.906125230714679,309.06657398445532,91.171178843360394,484.57138325553387,73.40560034615919,66.837504748255014,33.675539824180305,46.529499616008252,228.86141016148031,204.93933062069118,338.11939479317516,66.619302057661116,369.77358462521806,398.56808260316029,279.66836937703192,254.24636035691947,81.144430430140346,237.10662910481915,326.93019697908312,162.44276928482577,89.454937630798668,272.89835455128923,93.122553599532694,202.89447997696698,76.339223927352577,85.40899942163378,96.752804776187986,311.35374785866588,109.07811045181006,37.793867120053619,122.23699379246682,249.85527482815087,179.21549504157156,80.058797232341021,178.72163027292117,189.2026848020032,132.25475523388013,70.839231761638075,147.98966822214425,126.42424079356715,449.67352965613827,273.35614186711609,360.51491398131475,254.08622647169977,291.19683372089639,46.539402191992849,116.68382239062339,430.97536414861679,129.65449484996498,476.78851476637647,66.35299879591912,430.8796672616154,459.4861913844943,490.74114978080615,362.15614940738305,435.28448783792555,292.16081303078681,416.01430050795898,177.31162216281518,461.75335634732619,108.11567575205117,311.1689227540046,322.5737090758048,418.58399107120931,494.32932398281991,282.67488301731646,110.10304829571396,459.17509771184996,151.16235729074106,108.8576834788546,216.49568045744672,38.877649740315974,64.777541547082365,432.55506412358955,351.52514962013811,425.44705599080771,219.12251579575241,400.44787718215957,491.9325443985872,372.87371105048805,219.0264704823494,375.23731352528557,321.71581575646996,305.63779140124097,102.55380922928452,294.71805249340832,209.23224569763988,464.38928841613233,105.7329651969485,314.46147334994748,386.3128429162316,77.62141163693741,439.42222852492705,320.93684068880975,194.86506818328053,374.89545995136723,352.20178296789527,166.75316400825977,168.24985828716308,179.75368579849601,279.39577419543639,299.7296250378713,421.23899116879329,331.39395917765796,310.82039173692465,56.04818619787693,187.59632528293878,490.55994813563302,170.63575906679034,402.48278508894145,242.71849306533113,330.41471410775557,228.64345664391294,182.43339013773948,199.01496768230572,487.15915029868484,292.4100229353644,267.46043163817376,378.99631963809952,463.07839831570163,229.43734926404431,297.71755011286587,231.79721928667277,239.78290466126055,88.690195519011468,483.29877683427185,41.483987232204527,86.492467867210507,166.38707116246223,492.91420350316912,179.23467315733433,138.08581365272403,337.23436382832006,310.58808685978875,479.75988351972774,298.06343816686422,469.7935079690069,389.38253313535824,245.20657875109464,223.72582714539021,143.02484861342236,56.265856400132179,389.03203215217218,267.82080280594528,386.8838695785962,110.85939753334969,378.10459087602794,278.64220755407587,379.53351928386837,281.22300989925861,79.782594458665699,350.86192707763985,350.33340088557452,252.04104129923508,247.73247209377587,185.48277926631272,129.71670526778325,206.02203075541183,76.303809185046703,94.825166459195316,417.08000292768702,372.81317294808105,112.25457640131935,184.7707189200446,106.87785594258457,340.43818146921694,343.0139938974753,59.959481349214911,450.36300422390923,456.4712675800547,272.78235898120329,79.189329240471125,360.27008676435798,76.648161930497736,102.18747826293111,214.48450855212286,478.12482051551342,342.86461264360696,284.21551787061617,262.931249209214,349.47493382263929,247.32430588454008,47.184617852326483,129.30458413437009,410.32581108156592,222.46632392052561,381.85087176505476,80.630517245735973,86.487898600753397,259.98091812245548,276.77122978260741,82.556815915741026,183.14180502900854,198.541414947249,286.83123880065978,166.61132502602413,217.47395389480516,184.0676753106527,225.09389101993293,151.74350626533851,114.9467470520176,286.24739039689302,150.03176986472681,62.726940116845071,39.651817420963198,38.150510650593787,464.12754008546472,93.412019447423518,337.23894567927346,451.37374620884657,468.32837637281045,378.8916142215021,106.85081415809691,313.72170588234439,462.91570966830477,477.85612313542515,403.4892062144354,459.65653873747215,301.37527204118669,143.90519256470725,236.81672947481275,453.97181240376085,151.07845645397902,238.27278338139877,383.41480467934161,294.46067240554839,137.47465842403471,195.03442026674747,60.167932696640491,47.238700764719397,390.64486896619201,294.97816779417917,345.46502721495926,193.17886649165303,366.14988034125417,392.70927898120135,331.76858814200386,326.18904105853289,226.95269706659019,449.52608805615455,213.65817736834288,435.13696635374799,413.58584870118648,188.67767756339163,179.19109523529187,341.97749856160954,412.83369086682796,351.64985672570765,400.86455291835591,218.03809092845768,430.56403069524094,38.644289844669402,267.64921122929081,31.920419849921018,328.76085402444005,213.44030515756458,476.92037292988971,499.97254139510915,238.66315489402041,124.03033014619723,58.208846380002797,325.18008257029578,437.37244847929105,462.15681179659441],"delta":[7.871324080042541,21.16694575175643,-8.6955810477957129,19.670522846281528,29.820196107029915,25.41667019482702,-16.549710072577,-13.447821345180273,9.1470642574131489,8.7005834374576807,6.2994386907666922,-4.9087101174518466,-6.7652743589133024,29.522762596607208,-21.468770555220544,-1.7552668042480946,-28.491900837980211,10.520156272687018,-4.7332650376483798,25.99980880971998,-18.95398280583322,4.2661788733676076,13.546516243368387,-3.6994610074907541,-7.7782387984916568,-10.797231704927981,20.493604922667146,24.927833913825452,14.053781102411449,28.926486284472048,4.2615524679422379,-13.217694880440831,-19.388696285896003,-28.813367332331836,27.443041638471186,-9.8220805590972304,-14.080678182654083,23.168849986977875,25.47485388815403,-23.324083965271711,-16.573775480501354,-11.275357436388731,-7.5861714268103242,1.48949075024575,-24.749978757463396,-22.837493740953505,8.4069927502423525,15.652588815428317,-19.162986748851836,-11.240805708803236,-27.296933429315686,-12.660782318562269,13.390408675186336,-10.451379404403269,-9.1537413792684674,-5.3005726262927055,9.6370094362646341,-14.198731170035899,-6.9678837340325117,-0.81489791627973318,7.6407900592312217,-16.397483702749014,-28.70101117528975,25.878054066561162,24.634199542924762,-27.327181803993881,18.033519303426147,28.588497955352068,14.750849129632115,16.979737007059157,18.78676890861243,-2.9685726575553417,-7.0016208104789257,-17.162242317572236,7.0367540046572685,-23.814120143651962,4.5296913525089622,2.6994268130511045,1.8031021440401673,2.1652309270575643,-13.495814893394709,10.076094497926533,-15.082262218929827,-25.150000476278365,-2.9016740340739489,8.8066393788903952,-16.337230266071856,-21.255450532771647,18.266975032165647,-5.8144623041152954,29.166254396550357,25.106371692381799,-28.20048310328275,-4.5932093029841781,2.1398513065651059,8.5389274265617132,-24.775367081165314,6.9392501609399915,18.125486201606691,17.978824116289616,29.348694384098053,-3.4353124257177114,-25.983224376104772,12.014817176386714,26.363901528529823,19.143844395875931,-28.909348100423813,-14.078347021713853,11.030316855758429,-26.657676757313311,17.024188572540879,12.44921192061156,2.0482539385557175,18.039934309199452,23.121566651389003,28.038320099003613,23.940293840132654,29.523109048604965,7.5562575599178672,-27.465737820602953,-21.727860714308918,25.395768648013473,-16.931903986260295,-26.230772836133838,-19.071535617113113,-7.1106244437396526,-27.490807911381125,-22.336860573850572,-23.583500403910875,-3.6503666499629617,6.9866093108430505,-29.483846523799002,26.379660246893764,22.440198347903788,-8.7326563568785787,23.220847346819937,-5.3622547863051295,1.1097215255722404,29.060965008102357,-11.653337809257209,26.734751514159143,-6.2162720086053014,10.598680693656206,-5.8415863662958145,29.298135889694095,-16.503041437827051,16.009883154183626,3.077972293831408,-9.7980439150705934,-12.846286254934967,9.7429115837439895,-7.7261071326211095,-15.350082549266517,-27.032417384907603,-12.269564950838685,18.848582650534809,10.810702135786414,7.2779132192954421,1.6708099376410246,-11.351259537041187,-5.3043891023844481,-16.254190150648355,6.1582930432632565,-4.1511689499020576,15.031203129328787,13.471004292368889,5.0119902938604355,21.724090436473489,3.1075507029891014,10.926698050461709,5.0142370350658894,4.6328772185370326,0.70919504854828119,18.118104455061257,-25.044436315074563,-19.974618670530617,13.174208197742701,8.2496593706309795,29.769366611726582,29.494857117533684,-8.7279419554397464,24.56263171043247,28.275529048405588,-1.5666820295155048,-9.2130743572488427,6.6089163953438401,23.192631583660841,23.868864085525274,-2.7183082234114408,12.748836907558143,-5.1943626953288913,-4.4656095374375582,-16.936075855046511,1.6594533808529377,-22.460724664852023,-16.284646801650524,-11.465124771930277,23.67488210555166,13.566266004927456,-23.472900241613388,16.972323982045054,26.994486451148987,11.627256749197841,-6.1151935067027807,-29.411864764988422,-28.318136050365865,20.592800136655569,-3.1760016828775406,25.339920097030699,-17.644971418194473,16.25725285615772,23.451886726543307,-27.440408826805651,26.424573906697333,-7.3088315175846219,-25.441379696130753,12.260377407073975,-21.688152607530355,13.770782696083188,0.83965976256877184,-16.543375938199461,22.025195304304361,-13.856716258451343,18.376228669658303,10.381869706325233,20.402757609263062,-1.350468210875988,24.997565005905926,7.4229845311492682,19.472073535434902,-15.813304181210697,9.3705625366419554,-19.372574910521507,24.215629692189395,19.778603296726942,-13.286550021730363,16.015300070866942,19.454502328298986,26.068696095608175,10.997857209295034,-23.526666015386581,13.009855644777417,-19.066349845379591,16.852858420461416,-24.054283280856907,9.735643076710403,-0.61417213641107082,15.048425383865833,-18.405279940925539,-17.871541022323072,23.753494299016893,4.126971079967916,-24.054621155373752,8.9165451284497976,-27.350065866485238,11.868319865316153,3.4377091331407428,8.251269394531846,16.349703851155937,18.54781596455723,-11.283596875146031,17.360314456745982,-19.261051258072257,13.522623740136623,-9.6626592334359884,-28.373534018173814,-17.391262007877231,27.185892281122506,0.60915120877325535,-21.817981009371579,24.38185962382704,-17.465119510889053,7.7354366518557072,-22.156470422632992,-23.907966795377433,22.283590142615139,-6.5487149124965072,23.335987566970289,-26.723002656362951,-29.617827921174467,0.076974788680672646,11.721406001597643,-4.0967296622693539,19.188068951480091,29.853620859794319,9.2647156119346619,18.696154779754579,-2.3923065047711134,-0.86090007796883583,13.98707598913461,23.66686524823308,4.0172925498336554,-21.747204163111746,-3.3736726641654968,-6.5997049771249294,1.5408360818400979,25.641373316757381,3.9543082611635327,25.049629812128842,8.4542385907843709,12.81444086227566,5.7620838610455394,7.1002427022904158,16.032072845846415,-9.4027265533804893,10.686405943706632,26.161639946512878,-21.947120069526136,-22.513557462953031,-14.950143950991333,13.835121891461313,-10.118719856254756,8.7886462127789855,-18.992023975588381,19.98911916743964,5.7132809143513441,-6.1030665971338749,16.458092252723873,14.989332826808095,-9.3405061075463891,20.113230566494167,-12.277507726103067,-10.652376268990338,24.236379191279411,3.1356971897184849,-1.4199057826772332,28.747747940942645,4.4332872703671455,2.9585119429975748,-13.63622544799,-10.174583159387112,-20.462567671202123,7.1682933485135436,11.795295425690711,-8.3618057565763593,-18.382419613189995,15.390572771430016,-21.651111915707588,-5.1659547630697489,-23.598225675523281,-0.45929363463073969,-11.851848866790533,11.684594163671136,-12.334004519507289,28.36403327062726,-29.758696239441633,-10.33470212481916,-21.710710292682052,20.268190889619291,14.638468245975673,14.344333587214351,-19.646845324896276,27.250467399135232,9.053843691945076,-28.084642169997096,18.228584825992584,-8.587860893458128,1.1450514290481806,9.7592304088175297,-24.688893961720169,-13.109906609170139,11.842081798240542,-16.177016026340425,21.901262369938195,12.667713006958365,-2.6787016494199634,7.4743747478350997,23.350468408316374,5.4365190071985126,1.9208469009026885,9.6262779040262103,-10.594921843148768,-27.146719261072576,-19.132451936602592,-9.0729117393493652,3.5481106024235487,-2.9195650666952133,-15.027042576111853,-15.545700299553573,-7.3615314206108451,12.902701031416655,-23.859443413093686,21.370937400497496,29.214992062188685,-13.109538056887686,-14.800264737568796,13.863049680367112,-4.9178729904815555,-21.734226546250284,-3.7993385782465339,20.203366591595113,13.93721713218838,-21.683896905742586,-6.969515704549849,5.2925630891695619,-12.284745471552014,-8.0305920168757439,20.928667760454118,18.405572832562029,-22.396311876364052,0.22684697527438402,-1.3841772638261318,-0.62433976214379072,17.1066621132195,22.622922956943512,29.882464539259672,-8.8114913133904338,17.668057470582426,-3.0333862686529756,-28.362028291448951,27.811817089095712,27.5587836233899,-27.462132261134684,-9.8704151110723615,28.377500167116523,-27.178750382736325,-18.647589473985136,6.3562648231163621,10.027217650786042,28.443430429324508,5.1863767113536596,11.483988887630403,10.506745046004653,10.469070486724377,-8.3386771380901337,-17.951303003355861,7.2167056007310748,-17.466312297619879,18.669052734039724,21.800960074178874,-28.844551322981715,21.932242722250521,-24.967589727602899,13.267200174741447,28.488100273534656,-28.78991112112999,9.0809720288962126,-7.5209353677928448,-16.125731086358428,-11.204337403178215,-5.7905314257368445,-0.10168269742280245,-22.678769049234688,13.751001725904644,-13.89367064461112,12.896467857062817,-14.529229528270662,-22.43908136151731,-10.100085879676044,18.036797074601054,-20.865958957001567,-10.152752841822803,-9.1195403086021543,-5.1783669926226139,-22.700492469593883,-10.249510514549911,23.049183329567313,6.9247309723868966,-24.343296708539128,-11.165551668964326,25.802437509410083,17.030680733732879,-6.0588021297007799,10.226903893053532,-27.155912085436285,2.245853254571557,-9.457589783705771,13.298119017854333,14.157969234511256,13.786959797143936,17.680929293856025,8.3689129259437323,2.6943540293723345,8.1719400594010949,11.173407873138785,-23.87939537409693,23.617961956188083,-23.116628802381456,-26.712492741644382,3.3647876651957631,-11.780317299999297,-1.9822099339216948,-27.228506784886122,14.616262461058795,-18.271394209004939,-24.496713252738118,13.209947990253568,17.823885851539671,13.305196277797222,2.7382939076051116,22.667944268323481,28.22810027282685,4.9459778750315309,-17.651705201715231,-25.758939986117184,24.047169853001833,25.364674217998981,14.106989060528576,18.022325383499265,17.398306704126298,-12.843188513070345,-6.1509975465014577,2.6197936479002237,24.546155193820596,29.086574544198811,-23.124909047037363,12.940684142522514,-21.050001857802272,20.338176065124571,-17.117549506947398,-4.0043661603704095,-22.170466776005924,-1.7625170107930899,-25.838636797852814,3.6428050417453051,-24.628173806704581,-13.854507612995803,5.804615244269371,14.941108021885157,27.416612352244556,0.23326650727540255,-22.749270214699209,8.8085797894746065,21.334249670617282,-11.535265417769551,19.333830066025257,-21.676521738991141,-1.6778763849288225,-1.4656239096075296,10.356198688969016,-8.2524431962519884,-20.159635520540178,17.286805640906096,15.956621593795717,16.817749449983239,-15.504513359628618,10.110732670873404,2.2416010312736034,-21.989768659695983,13.378331805579364,-28.706646761856973,-17.671341234818101,3.5904424404725432,5.0474710576236248,-11.950858840718865,-21.331333676353097,26.36458286549896,-2.566460813395679,28.854218060150743,-4.971099947579205,-12.802776815369725,-6.248164689168334,18.049217336811125,-2.9434183146804571,23.766681225970387,7.4576181918382645,5.8515945682302117,3.6063940264284611,23.041003807447851,16.969651845283806,26.623892644420266,-11.925748223438859,2.9494851501658559,18.379483544267714,13.703209273517132,12.131345216184855,4.6054978156462312,-9.3810387421399355,-28.448551506735384,-28.763717925176024,-3.2081412244588137,-6.7796923778951168,8.7781176622956991,-10.9465267136693,1.2721772957593203,-21.924989372491837,-7.6612404081970453,-3.8723505148664117,26.228079828433692,14.78415418881923,19.771969662979245,-29.43770938552916,20.945128351449966,29.836590997874737,-7.6479455223307014,-13.108611493371427,5.5910744424909353,28.228253186680377,22.353153834119439,17.25410652346909,26.010096352547407,28.690149248577654,10.107856630347669,-20.762851070612669,-17.593412376008928,-6.7237573675811291,9.2310353228822351,25.085724829696119,-25.676907040178776,0.22267531603574753,-5.5963850906118751,-2.4154006876051426,10.015891995280981,-22.87997854873538,26.023539737798274,5.9733719984069467,18.657001610845327,20.912802186794579,-0.92710346449166536,-20.878871306777,15.404952387325466,8.4472676552832127,-4.9771527433767915,12.572357389144599,28.307159570977092,-25.12518082279712,29.278482128866017,13.240864863619208,21.848851810209453,-29.797075102105737,-6.6669738292694092,21.541637163609266,-2.7154907444491982,29.158577187918127,-15.198768004775047,-18.379802056588233,17.065385696478188,-9.8137378692626953,22.970256395637989,6.8590452242642641,24.822700875811279,24.612540202215314,3.4970954060554504,-28.485882421955466,5.9320863056927919,-22.664024764671922,-21.067396500147879,-20.652165608480573,23.982808822765946,14.720997624099255,-2.976385192014277,-23.945296732708812,-17.659659348428249,-23.082124488428235,23.979059080593288,26.344704022631049,15.755132362246513,0.019744522869586945,22.949178493581712,-19.777344893664122,-12.902987021952868,21.383769339881837,10.393559373915195,-10.069150663912296,9.8567941132932901,1.6228766273707151,-22.631100257858634,-3.2683065254241228,-5.5608947155997157,-11.086305105127394,-13.482782780192792,-20.781687903217971,13.000184395350516,-11.103908023796976,-12.996937385760248,21.175247090868652,23.771931272931397,-5.8478086441755295,19.594733496196568,26.344963260926306,-6.5984093165025115,-5.4205404873937368,-0.12582365423440933,16.150002996437252,11.688311635516584,-8.2137368945404887,20.06214018445462,8.4757891902700067,6.5777813969179988,22.177312122657895,4.4842294743284583,25.639057508669794,-10.437469538301229,-5.1933170109987259,-2.6145240850746632,25.777700990438461,12.827735161408782,-3.7208267720416188,23.064302704297006,18.520870632492006,13.251340468414128,-8.8221324328333139,-28.883233456872404,-9.8669179435819387,10.486587923951447,-10.450487807393074,-3.6894705751910806,-24.181434726342559,-3.7307892506942153,13.214982119388878,-22.977790762670338,-29.616271485574543,18.880901229567826,-5.3768679639324546,-10.508673973381519,24.085821392945945,-15.226313103921711,-26.262117438018322,-9.4372067414224148,23.683691835030913,-7.458471804857254,-2.4273097096011043,2.7932274341583252,-9.7573880944401026,3.7152091227471828,-4.6206649951636791,-6.2506663799285889,-16.931401351466775,-6.1121470062062144,-24.159743087366223,0.92203306965529919,-15.104687539860606,9.4518325058743358,-2.956707626581192,27.054911996237934,-4.0924573224037886,13.340910854749382,-4.967266540043056,-5.9952153218910098,-3.518909951671958,19.912280584685504,-20.810151868499815,-21.939699500799179,-29.393111290410161,-26.371993641369045,14.955475470051169,-24.945177189074457,27.142245154827833,-20.166100887581706,24.554051882587373,-10.546804675832391,-25.547498557716608,-11.896393275819719,0.79019499476999044,-29.299140335060656,-24.581859293393791,2.394305756315589,-28.072590655647218,-24.277638313360512,-22.935085957869887,-21.209108554758132,-21.00465084426105,7.8684721374884248,21.163496179506183,21.559224952943623,-15.240191663615406,28.453297689557076,24.798835767433047,4.2503054067492485,17.424555248580873,29.811012544669211,27.393725286237895,3.2124943099915981,-9.1130755143240094,0.92750715091824532,11.22354855760932,-10.159075940027833,5.2535831881687045,-4.1998920449987054,-5.0234568770974874,-0.49162492621690035,28.49318656604737,-25.737774618901312,-29.607487502507865,23.264353098347783,3.9182084240019321,-26.121984659694135,14.599722074344754,-3.8289027940481901,14.763335064053535,19.597770385444164,-13.43108288012445,-6.3279191125184298,26.09731079544872,6.8084928765892982,18.452942012809217,19.118444016203284,0.65904084127396345,23.174102185294032,-4.9815416755154729,25.866697900928557,-20.656973398290575,-18.55292113032192,29.583846917375922,-14.485064735636115,-12.806855840608478,23.871941207908094,-13.894259599037468,5.6017117062583566,16.97260498534888,0.2304051211103797,-26.350921522825956,6.768575320020318,12.607375094667077,19.165334673598409,7.5016824994236231,1.9133500708267093,22.628844785504043,-17.875494137406349,-9.3533321376889944,-2.7663919469341636,13.061138126067817,-4.3253446463495493,-3.3207894768565893,27.963165314868093,-19.135476085357368,7.2033033426851034,6.0427111806347966,11.723397262394428,-4.7721784142777324,13.209876897744834,-29.336717971600592,-9.1862886166200042,-12.328129406087101,1.0194250708445907,8.4403024474158883,3.401677985675633,11.907623768784106,-20.610286882147193,15.140954512171447,3.7233626749366522,-3.3620456652715802,11.688197180628777,22.263848693110049,-4.4126675790175796,-24.236943474970758,20.176225011236966,21.406746008433402,13.883224041201174,-11.469579879194498,-8.3981373673304915,-1.3065208029001951,-2.7472575567662716,4.7792587475851178,-6.8166060280054808,-11.328493687324226,16.533278538845479,-28.636819110251963,14.056266476400197,2.4728801753371954,-4.183329613879323,16.475349669344723,11.625154358334839,-12.335673915222287,26.712809256277978,13.362474432215095,17.053955839946866,3.4920647135004401,12.334311339072883,14.345423108898103,-23.439945671707392,-16.706070173531771,-6.6041608108207583,22.865421795286238,5.4542837245389819,-7.2325929254293442,-2.4371972260996699,-10.40572727099061,-26.979601015336812,8.8591535948216915,-16.278745229355991,26.940189572051167,20.051343790255487,-0.14937983360141516,-29.061318291351199,-23.460836154408753,21.822651699185371,27.402773620560765,-25.315857022069395,25.507491175085306,10.142555334605277,-7.4410976422950625,0.012679584324359894,-2.1071523427963257,-16.920372010208666,-6.8199083302170038,4.2969434754922986,27.168523496948183,-22.668650764971972,-16.608569179661572,10.269973827525973,24.123339699581265,5.9751329245045781,-29.359274846501648,-26.641430505551398,10.00557960011065,-26.619419292546809,26.25307378359139,-20.849961605854332,-28.978541940450668,-28.822735939174891,-29.867219673469663,-3.8894672133028507,-28.523696735501289,19.933288595639169,6.3160772155970335,7.0434102695435286,-23.874140800908208,1.2077650940045714,-6.6614275658503175,21.832093563862145,-19.58719699177891,-24.138124748133123,6.3575303507968783,24.483131999149919,7.0273511577397585,-23.518998096697032,-13.613596907816827,1.0198057908564806,-14.691746737807989,-21.410638340748847,-27.985475021414459,3.5622344724833965,-9.7205587802454829,-29.725222606211901,13.278249618597329,16.000919505022466,27.208510818891227,20.92255387455225,-23.527910867705941,25.00927600543946,22.531843101605773,29.218096621334553,-3.0274625401943922,0.30798608902841806,-14.338159505277872,-13.714702762663364,15.563292391598225,-23.954969574697316,18.294310416094959,0.47092985361814499,-15.51619412843138,5.1365476241335273,-9.1336482809856534,15.773225761950016,14.019464263692498,-25.022241147235036,-13.651294307783246,9.6957715786993504,23.340673944912851,1.0187406186014414,16.652790661901236,-19.737118673510849,-12.529817344620824,26.313471919856966,-21.170871835201979,5.4289907868951559,-2.50214958563447,-3.5619192151352763,13.783517167903483,26.51513587217778,17.194243781268597,9.3548290617763996,13.122833389788866,-2.8832574561238289,-13.423346620984375,20.381845235824585,-29.01275385171175,1.957410229369998,-7.1094509772956371,3.2332241116091609,2.3454875266179442,10.803931849077344,-9.6657406026497483,-7.9686057893559337,20.173930674791336,-15.642563584260643,-0.2975766034796834,4.7354092122986913,20.621081069111824,22.013223054818809,24.64534786529839,-5.5933944135904312,3.5573023511096835,-23.243091646581888,-7.9931174637749791,-3.3692498411983252,17.265070248395205,-11.9889358850196,-11.281793131493032,-5.9167886339128017,4.0829621348530054,20.001814034767449,-24.920187927782536,-5.7822799030691385,-25.61089585069567,-6.5894441306591034,26.16951503790915,-8.3730665780603886,1.7661718279123306],"expected":[2.6423299757942757e-20,5.6214753582310402e-58,1.8614590392773221e+21,2.2123126428821706e-44,6.1502657591335119e-80,4.8783656468164177e-68,6.3002354873037695e+35,4.3690733056181874e+30,1.964727085473207e-21,3.2115736292179264e-23,5.3744673701563812e-13,7899687138801.1582,1.1585068621089421e+18,1.2483842066619827e-64,6.9811359056248745e+53,51250.739659502593,6.9262928263930316e+67,9.7401058206054462e-28,805099670429.93237,5.378332532021064e-71,1.8387216255214985e+46,8.9503879866486569e-12,4.9986583635830712e-35,46918526.571961395,1.1203861725165462e+19,3.9730228650248606e+24,1.4586768533729133e-53,9.4034929443210915e-54,3.6576854538476265e-35,4.7760991122685428e-77,3.1851171843176605e-12,2.1195343636438027e+35,3.04239451578325e+40,1.5441451470424531e+74,1.0695241773102695e-54,7.298141598871806e+25,2.0525539966473915e+26,1.7256959702099548e-56,5.28982373709817e-48,1.8314516857534504e+52,3.4100613660567599e+38,3.5705088412397321e+29,1.0170576550690817e+18,0.00021407518431714552,2.1779180238661889e+56,5.8648858371791874e+42,1.5602930395853384e-22,3.5963564850415415e-34,7.4920304916594449e+47,1.1130126132941987e+27,2.3792358686265541e+70,3.5299765025887038e+29,1.4541992160808211e-36,9.484177554822825e+26,3.6372890191804642e+24,1363094595978.6023,6.4187753897157901e-21,5.1541560066622744e+36,45622538134062.727,155.7886889777522,2.9018913798627386e-20,9.9360200010741165e+42,5.661579679201569e+50,5.3722219211858689e-69,2.4546261199735501e-61,1.4530051838924598e+62,4.5268960287328638e-45,6.0311697317904784e-53,9.6318622965752287e-40,1.6761060319549808e-46,2.6440568042806567e-46,63041055.870252825,18728695917586880,1.5423759939995479e+45,1.289428380229696e-18,9.7552374288985107e+40,2.0586370143028588e-12,3.235630820902191e-05,4.0006447635936411e-05,3.7873164874801147e-06,4.2976030378376562e+30,1.0056353407443768e-26,4.4016513989223033e+29,3.3173243943181988e+62,15939064.619626904,4.432853217423829e-23,1.9250420809208428e+35,5.2033569456180609e+56,4.0983598876246779e-33,4772819292626.4463,1.3973373496454451e-76,6.5826910406651524e-68,3.4963565953630043e+59,646949129.59931183,8.1758828769831326e-06,5.2969198815625332e-20,5.3438538401833032e+62,4.3341004647808228e-19,1.0214420980331373e-42,9.3347868759139453e-40,8.9193587949917078e-77,926521372.33417404,7.8316535147678648e+59,1.9466055354881268e-30,3.0578704436730136e-68,4.236913271620478e-52,2.4973721615210435e+73,9.5340506956957135e+33,4.8799181691736173e-27,1.2973304682523415e+67,3.4727706025063188e-29,5.1004326749140565e-26,2.2456077530498385e-05,2.3719509752786281e-49,8.898693966185086e-56,9.447939255630985e-72,5.051928889866745e-54,6.2272673831768246e-63,1.3561896710456021e-16,4.5668392751851803e+46,4.4635218592321563e+56,1.1528416400626569e-62,5.7904789469773512e+39,6.9174412370543562e+67,2.2987132108143737e+50,95516495319745584,1.6767533935435488e+63,7.9026567963573107e+58,6.5596138391472493e+60,1595055723.1309726,4.3816757925236433e-17,8.2379672360691593e+77,5.34872310105124e-70,2.1661581955714668e-37,3.3766024721418464e+22,2.7902214283445661e-60,2437717096301.7925,0.0017500271683170332,1.4486535296485763e-63,5.2721412555138977e+21,1.0643894510214679e-70,54088368419558680,3.7424784882095246e-29,2743022561726.8452,5.2102446689595532e-68,1.3326892299714116e+37,1.625676864085764e-41,1.4134723341498131e-08,1.4259694274799719e+23,2.4252283349207812e+34,2.4034030883640413e-26,24368601255577168,4.5197578281322052e+39,5.3805383052190063e+71,4.366319565112893e+24,9.4948059044840789e-51,2.6433310220983361e-29,5.3639737259831777e-18,3.1403944875776515e-05,1.3257225575093978e+27,7675690002046.5449,8.2120000980782075e+39,4.6938822170255927e-17,78392644685.269745,3.0304365540255317e-38,5.3002399851814723e-28,7.5062526179241103e-11,9.6541327738157258e-56,3.0471406226831531e-07,3.0331251488768873e-30,1.6687614338215568e-12,2.0791380576087195e-12,0.014757678286129665,5.132938333070429e-44,1.9978780990164111e+65,1.4337978868448876e+30,4.1277432452073813e-35,4.4115089591137768e-16,7.9470135002084133e-69,1.6701890888044923e-73,2.0228513159704344e+21,6.9567254530651805e-65,2.3390580722496557e-55,10779.018312662232,2.5033636275055901e+17,1.6126124477328573e-14,1.3458900836629931e-47,1.2946596818980828e-53,8049359.5876353877,2.9144077497244689e-31,3475769321799.2729,45392706347.857674,3.7934917386702518e+34,6.0893147562638738e-05,7.8008413813163318e+53,7.5022385608715303e+32,3.7449508236305411e+22,9.9358632649323521e-51,4.8321176569042704e-25,1.5654549101045533e+42,1.4842824341995199e-45,1.5063120049655268e-62,1.6551066655805226e-29,2495609420515.062,1.2081664240842015e+78,7.9397305283430788e+39,1.5202358721934239e-53,211784276.71982864,4.5522649057431949e-64,4.2322535607836266e+37,2.1831261880486345e-43,2.1581821455435023e-48,1.7035290970310765e+72,3.1284306614787631e-55,4.6373057681817805e+19,1.0193303948058384e+56,9.1943994908375058e-20,1.4944738920855411e+33,3.5915208719829535e-37,0.010700215076553986,1.5652822017783876e+41,3.0707975836170298e-58,1.7807281268068958e+37,1.07332915195361e-44,3.5554681392926265e-26,6.030522974874406e-35,1770.5759062547925,7.1974679148325832e-57,4.0421195595708778e-20,4.7792266484430415e-53,2.259466432932397e+33,5.031910661816269e-20,3.8288629227256454e+46,1.6116065105493703e-47,1.9190246154068092e-53,9.3745541932466889e+28,1.4287975990508426e-40,4.3049661093091263e-42,1.2481299276085102e-69,3.2863110586299339e-29,1.8948488193358134e+60,9.442013317948443e-35,1.2581620650127016e+47,8.6060353561518502e-43,1.2821172123899276e+51,2.2987014288633416e-24,36.028544725675715,2.5675078171613908e-38,4.2965411802349374e+32,8.8939445894411944e+43,1.0132911086483392e-60,2.7606355497257982e-09,3.3095568667118053e+60,1.8904211032340954e-24,7.4608011509458976e+69,1.5005196956928322e-20,7.5762447767756399e-10,7.2669829255722847e-19,7.6223298018262842e-45,4.0477202207228993e-49,1.503016166504695e+29,3.2343284177552988e-44,3.2902177496904887e+47,3.5388795757089426e-34,5.4718996643783602e+25,3.0064346643270135e+50,8.1723877917798443e+42,1.3870503057375761e-73,0.10943549650695576,2.964045956166114e+50,2.6544704340702465e-49,6.7068281610088777e+27,3.636110224202636e-21,4.6644303537766227e+54,1.3273940390575614e+57,1.492052601067222e-53,1.589261899118473e+17,1.3951529611088692e-47,9.9322609700125952e+54,2.511692222022407e+73,0.64648662430515014,1.1161022712905737e-21,19153483930.195541,2.0884130952421496e-51,1.4827145271957784e-53,6.9033388018492741e-23,9.3280457116649124e-48,578498.36448467954,95.463900958690743,2.301012744589363e-26,1.6338891801846842e-43,2.7350407684171634e-09,1.250745690505221e+52,315924685.16163093,43771750726376.867,7.1835203189512192e-05,5.355995387830867e-52,2.5463243955354985e-11,2.3114591539068718e-54,1.5532194016988351e-22,1.3040249055772711e-26,2.4524914938606513e-14,1.5450390135042481e-15,1.0505178361555177e-41,3335957485431512,5.2069461137470987e-28,5.4657262602732819e-67,1.50393044608403e+46,1.0698674234902735e+49,1.6325060904083721e+40,8.7530019127635701e-35,7.6104421113245628e+23,3.3657126903794119e-23,5.8239966036871924e+48,1.8660706883468577e-49,9.2211291575577952e-14,829347885327497.5,6.9289901951972119e-39,1.4334265157160029e-36,1.3438538406260169e+25,9.6123836745564752e-41,2.7916386679970765e+31,4.2514086281711932e+25,1.1167946821667e-64,5.4449798357417996e-09,2062.1636908138194,3.9872611724030307e-77,2.0705735975635078e-12,3.1269454008865511e-07,2.9004651603685078e+27,1.7404738366077351e+21,3.7454239841213752e+54,1.8098710405486906e-18,7.0997068345558535e-28,1.0420714595715278e+21,2.2057450520340685e+42,3.6353103874786623e-37,1.3135878165570644e+50,64475249681.818321,1.5438163507399283e+60,16.955238676892112,1.1131569497553857e+31,1.4784973465604909e-22,9.1262724966134904e+32,1.4629009705892421e-56,7.2749059340573699e+48,1.7711549284991117e+20,5.0671324837156414e+54,1.0646507263341967e-42,3.8423338305976918e-31,7.9806562783200077e-37,8.8232750480399625e+44,1.0179697112809803e-68,2.5509644210904555e-19,5.1560948736220388e+44,1.7039974003990391e-36,7.7722083106946506e+22,0.0050247433434241172,7.2225115477700552e-26,9.2359548216926735e+56,4.6178680987828614e+33,1.6609823360994999e-28,4.1991709585804202e+27,1.5742294521369407e-38,3.2409868098308452e-34,2367544.182344777,1.026093090618387e-20,4.8358288700031112e-46,2.245357278786457e-15,7.6464358547268466e-06,3.7357869202388998e-26,1.9141752964460765e+25,1.5438509406271306e+70,1.5150215819097599e+49,1.0098666943980356e+22,7.4289938081843878e-10,949013.23059299716,3.6103799238984785e+38,1.1717182641186616e+36,3.8227221187700956e+18,1.8221676660672976e-26,3.190259414324079e+49,8.2518974702032944e-38,3.1891414862977968e-54,9.1374240241758546e+34,1.2055481567134742e+25,6.3430007379756256e-32,370394674989.57422,5.6329658324688091e+47,8332394711.3657398,4.8856995369353313e-47,2.461178472880615e-32,3.4460839901210181e+51,2.7171775385913708e+18,4.2048431762262497e-14,4.6613894680404948e+28,4159428520036.9131,2.7813506431980029e-45,2.7935014738474402e-49,8.7849684051417117e+32,0.2758127613526592,289.4809050609727,44.112991561255491,2.2633830269541963e-44,5.4863620121701115e-53,6.2485063612597453e-58,7.726277612131949e+20,4.1214776200442889e-41,174587.33334318682,3.5885088887756675e+64,3.5269097239627522e-59,5.9074043366939404e-73,1.1531157993316003e+69,1.1216725110549689e+20,5.80337439698617e-66,1.3240698007474538e+48,2.1810248972790918e+49,4.6446151210263056e-12,2.5372468124633327e-20,9.2057522260917395e-65,1.040586987854728e-14,3.0436250359619512e-30,1.4171437299071294e-26,4.0003401224914815e-26,1.9574592496959344e+21,3.6083988792658136e+47,3.1946210909739192e-20,3.900583620269377e+40,1.4763208908056137e-42,3.4339270973928781e-41,9.2842369765370083e+66,5.9185680990579345e-52,1.6497024041015068e+59,9.892672004231143e-36,6.1433809544592012e-75,2.29836447808109e+65,1.5546227536220546e-24,624816934652063.25,3.8896727118107879e+29,1.954050553323172e+26,672615201755.32288,1.8560012408705029,3.3612691670683262e+51,6.7204292741648592e-38,3.0766723088229779e+23,2.026268272912948e-32,1.8487712256534976e+35,6.4267527739414384e+51,6.8164645793545469e+22,5.1360139478951737e-42,7.2885010983230481e+41,55035637728417984,1.1554493485011069e+19,43081933090371.117,1.2198701020176959e+60,7.8213775219311732e+20,1.3304334386332419e-59,1.6842770767934982e-16,6.7179225079901513e+57,1.9885696055499283e+26,1.0677808802175666e-69,1.3159991771564255e-39,235720382753.91431,4.4523703893405169e-23,4.1836577664435922e+69,3.8440683427127192e-05,1.9858518115194327e+24,6.2283120855073506e-26,8.2446503942325808e-36,9.6732918847693484e-38,8.6398944542460894e-38,2.759972609261955e-19,1.9125255699339693e-07,4.9525132697136925e-21,8.1134473350786426e-26,1.1105325988685221e+54,2.2365584807473191e-48,2.3362547377075397e+51,1.3421329537727037e+55,1.8129595652118113e-09,1.5471774283710841e+31,37306.75004429862,9.5825642431887218e+45,1.8340825665663745e-31,7.5641079298630418e+38,3.2331332129876943e+32,2.4676639490964953e-24,1.4247829316519414e-42,1.7444682965099151e-32,5.2042076380357261e-08,1.5047167574601248e-38,4.2554496930388661e-77,7.2429168696472948e-14,9.7860243464095652e+44,2.890595182736917e+52,1.2176418598321475e-61,9.1966399490723288e-50,3.1672375372101423e-36,1.6968984527327668e-41,2.9004861866027719e-47,3.2260405723519984e+30,18286548348452552,1.0827008666348455e-05,1.6153329093733849e-42,1.5898775005027597e-79,1.0355598182371139e+59,2.8313757019360784e-30,1.1037608314880509e+52,1.4621662681227713e-46,4.5775752936180095e+28,10480774.022864942,3.1435016666726955e+55,8428.4859428153777,4.4556682499594385e+56,5.1988858527315233e-07,2.5957172922090806e+58,2.8868704197938991e+33,2.8011175674102791e-16,1.6105151646463251e-39,9.6916131781812632e-69,0.25922821724224832,5.410257230761077e+54,2.6736124640404177e-17,1.2276968196941386e-43,4.4383756042912478e+20,1.778002463333028e-50,1.0404014266799563e+56,29732.799229698321,7843.2755454062371,2.6942866601351605e-28,1.4013059275946192e+20,2.8820357568507057e+50,1.8855282064474683e-34,2.2269983347895389e-37,6.0124503781919857e-45,1.3246369589288962e+39,7.6094516252029713e-24,2.1067426888064409e-06,1.8178004257168213e+48,2.4872900080607943e-30,3.8266700780762039e+73,2.1329658052992447e+44,2.5476824948855403e-06,1.1056555142709418e-12,7.7653519519028593e+19,2.5600185339361691e+55,5.1917827160887362e-68,652581.33493658574,2.6755343297681567e-73,5168015828746.291,1.3653345943141357e+31,5858995171319417,2.5528099863092633e-47,2124541.5371460142,7.2251313786459679e-62,1.2755538321921239e-20,5.9689813637490423e-16,9.7630394383899589e-10,1.7670514744871395e-52,2.0669788927708097e-40,4.7882166421366973e-69,7.9944329870372202e+30,5.3176950912424113e-08,1.8825077669056694e-45,6.748308493583935e-33,6.2383892211679533e-33,6.1140101037942619e-09,6.6144944377677732e+21,2.8298141082821471e+73,1.6331450281521063e+62,19279405.927911412,356334363206448.5,1.0340746944683519e-22,1627234389104097,0.00052505645658134888,4.3905207985394448e+50,229527069059734.25,121889141.90299137,1.85791420679033e-53,3.4264613205429161e-39,1.2330056072320409e-49,8.8683610864679831e+72,1.3921437653733225e-51,1.0669010582535822e-78,1.7721203612768335e+20,4.0259521930738901e+31,2.5396435136094194e-15,4.4300002490568507e-67,1.5402028074736356e-58,3.8664312360122544e-46,4.3495327405311402e-48,1.4876983326806504e-58,2.6865478580774069e-19,2.0901676322568713e+44,3.5244573540118295e+31,18488146227916036,7.7239316465647712e-25,4.0546190490086366e-51,2.3276462109602539e+68,0.25179080891131128,167481534342442.25,1595917.0725331216,1.3219129906289653e-20,6.4166728798353076e+47,6.3396352218831593e-68,6.0122317792671927e-16,3.1023282116720206e-37,6.6708766653172488e-51,60.987596640310592,5.2080872818572521e+52,1.0864498962888885e-39,3.148167069050896e-23,175127079995.47125,7.7845049693043071e-34,9.0122597515941073e-73,7.9070793299894699e+51,8.6876531588199389e-77,2.8902044288917086e-36,2.6983976499192878e-55,2.4144289272515179e+78,1.4226187510893254e+17,3.8823484659378962e-56,653376.5459142006,1.9756056698995486e-79,9.6658515202799088e+38,1.0408526056602621e+43,1.0657804931095054e-46,5.303866230914459e+25,1.232274392298594e-61,1.17380404513128e-13,2.999215461426448e-48,1.3648834055050514e-63,8.4516792683348153e-09,6.9762323642914807e+50,1.8800006832069135e-14,3.4963498628075627e+57,2.2656931603978725e+53,9.5206426897428379e+42,6.9188444875839481e-61,4.5346721075119142e-39,55148819.621663734,4.7964049772604718e+41,2.3880574594204025e+40,3.3296402886872522e+53,4.7472476334079276e-52,2.8973209758856496e-57,1.5547828541349972e-30,0.9196739219991974,1.5572911156073969e-60,7.5639036301002541e+47,6.4811257098617608e+26,1.9277521421147881e-58,5.1577314513400188e-25,1.7608695350028721e+20,4.7167245050372688e-25,4.7383105252076664e-05,3.1932587278937854e+47,19903053.462698694,98550257999725.812,2.5884957292003888e+27,2.1931465050262771e+32,2.6449598761341522e+54,3.9967902027583246e-27,5.0163870191841745e+25,4.8196503352983024e+33,3.3430600791853549e-35,5.3518812227444323e-47,545815823.48526454,8.5400664237645156e-45,6.5720507356802177e-57,130217560657685.77,4039911188395.3486,2.0309747053537586,7.3716728128844415e-35,7.3562367195086514e-23,3.3829311569502169e+21,4.171869462329564e-48,8.7816443382526815e-23,2.5690817577647917e-13,1.6292531040476519e-42,2.2876545903170782e-09,1.7007042505569552e-58,1.1976424742224139e+27,248293269547.93094,629857.27139191865,8.4450712959311766e-66,7.4538816339499077e-33,8123215948.1792984,7.339613609554076e-63,9.8023396171856116e-41,2.9805749235397077e-32,2.6251483749017248e+19,1.4864721104994597e+73,6.9225343282467366e+17,6.5533585482972378e-28,3.3572865618367051e+23,525341085.49438739,1.1942572940109844e+39,2653838801.2831979,6.8765017407703444e-34,1.9629159752308593e+42,1.0765036574335617e+72,2.5931052135250187e-51,1805051973951.0598,3.5256998773807477e+21,5.2773338063312178e-60,9.9288000780622443e+32,3.651734521295231e+70,3.5780031122293224e+24,2.0770069162433165e-63,8.877568169125449e+17,2795278.2304597422,5.693964868840822e-08,6.7882318907902188e+18,2.0701930623306503e-09,358227893765.9696,48397109907454.438,1.8228880934426019e+44,10953952337.456696,6.517933298638463e+64,0.0045542205884224864,8.8809918649391577e+37,3.7136113504928982e-23,42653180.86707259,7.6011487931144611e-66,37459687596.892204,3.379807026525441e-34,3772791609917.8901,25413125494.735882,416653500.48587239,5.3155323660710516e-46,1.7936018024133107e+53,4.3766074807569509e+56,7.374015537440206e+75,7.5721653282099476e+66,5.247307626686316e-37,7.2229684356706483e+46,8.5036492520368732e-69,2.6251439069725156e+38,6.4357751412388713e-67,1.9845580935224721e+19,1.1520993662979525e+44,1.0715016052522194e+17,0.048188284724153978,1.7865169204751663e+68,1.3451193173209676e+56,8.7597749786675713e-07,1.1000065346560836e+48,9.4342568072693598e+61,2.1758480062979952e+59,3.2775000457538523e+51,1.3036286811415144e+50,6.8645962805729383e-16,2.2801456363717335e-51,3.177039859174366e-55,2.2356752058041199e+33,5.5680909411767962e-58,1.360658457520116e-61,3.9730640887589811e-09,3.1530163577869593e-41,4.9429902246282687e-59,2.6182170937519543e-55,4.0296022581477393e-07,4.5317406244958162e+22,0.0128859807127059,4.911933655133705e-19,9.9206389028320825e+20,2.4223935121622325e-13,2736770692.5687032,3003770781.3433671,12.774201787280969,1.8422248425596131e-66,2.4398427107980875e+53,3.1397894429545274e+51,6.1259997071684727e-52,5.5606545263303327e-09,8.9096277021763708e+68,1.8593255338511573e-36,6012139485.201108,2.1084653405438014e-36,2.7631159366561681e-49,2.4519778928093603e+21,9814027578064.0195,8.3987312202902252e-70,3.547445961726318e-15,2.7048267373253047e-50,1.3443646589375212e-36,0.018363904879446613,1.1621944569834148e-62,24624046880569.863,2.7092197505399294e-67,1.9150773161913493e+54,2.9431162414775924e+45,1.2168980775022352e-78,1.9513111167176831e+32,1.093330288265872e+34,2.6421694015005158e-50,3.102000329369587e+34,8.5137692821060658e-15,2.3051165702318435e-45,0.23953155680522023,1.0510289467161252e+64,1.2715792661794736e-14,2.3487487085057891e-34,5.6171850246805722e-43,4.215595277745323e-16,3.3862500550118019e-05,5.0243175349848584e-39,1.3296841679413381e+31,4.0437433720085645e+24,10880702.797616538,3.8429193415866917e-35,12626479923.913881,431222982.65024239,2.5061598568733961e-76,9.5417489468559079e+48,1.2497906852883262e-17,2.6709435183289418e-16,3.3114757888646289e-30,692097645353.00598,1.2804204180543357e-27,5.8241677308439749e+71,1.65697540980041e+21,6.3113179984051002e+32,0.0086383054232200707,7.5295884678566798e-22,1.5685027569821598e-09,1.4062344621775514e-23,1.7654140184696797e+54,8.0854317508224492e-39,2.905709329942623e-09,441651537.58908421,1.4334385324312431e-30,8.645517724814109e-51,6183980190.5433865,7.432771247249704e+53,2.2420016571980927e-50,4.6979367642275715e-54,2.9637470299909641e-37,6.4927621907172079e+28,7.5294459325063587e+20,187.3826873060741,1710594.3232703088,1.3567950551374186e-13,1400700807658993.5,2.7024846934656423e+29,2.1956792182990836e-40,3.655311370365385e+71,4.6567924483219763e-34,2.5365309582876478e-06,3918770694.7273345,4.0481619235737868e-45,1.7453170508541856e-29,6.3993243904108067e+29,5.4031547941275572e-70,2.0114276364115954e-36,3.0777757889569627e-41,2.2645850891580002e-09,5.0029625478088748e-30,4.9019801912940881e-35,1.2849788885556797e+44,5.1072467654239549e+44,25435510746.678825,3.5566061584260921e-46,7.1447515230818947e-13,2.8141660258016272e+19,303269.63922490663,1.1968852213681856e+22,5.04374496155701e+67,7.4662845209737686e-23,3.2725371763398158e+43,7.0300014480266252e-68,1.780343837075641e-54,2.4369925605825817,4.3270421535087542e+68,3.5341516492950814e+54,2.0194966575094501e-48,4.0559189252358386e-51,1.5393231537347172e+65,3.8020174345234295e-63,5.0547687140911915e-27,1228210627116367,0.92752184009985417,140271.04219296982,2.9219332410716814e+43,45788938267194152,6.1609498560699393e-09,2.6493442924788488e-70,2.1868478880937193e+57,4.2377414644178576e+39,2.1452859676699241e-25,4.5080321275411899e-56,2.1158795999332121e-13,8.8385003986754392e+66,5.6616970886236835e+47,1.0470377659991216e-20,2.276994783980158e+69,1.296868307379577e-68,6.3611715134153328e+41,4.0149120035430719e+64,3.5126058724265722e+56,1.0437403734379751e+75,7061898753.3767996,9.9604558568426023e+46,8.4403877018381804e-54,1.5382750363032769e-17,6.4554970724395608e-18,3.1758312213633108e+43,0.00081666238113609784,2536062454818.4985,1.6795257805623128e-45,1.7534076096446495e+45,2.504155907985912e+64,7.268266098247998e-17,3.1594317165593356e-61,9.12481752807106e-18,2.829978648187687e+59,2.5285948534061113e+32,0.019631613923764168,4.168905019896487e+30,4.8998731687073128e+55,7.2675769857470012e+64,6.2735354686681086e-10,1.7334881907138266e+18,9.0516986273898416e+54,6.30680484522602e-33,5.4817598118433229e-40,1.4033419241766192e-54,1.5131800422404248e-48,2.5429712063363882e+53,1.2427555749151132e-62,2.1615199145771437e-51,8.2449515428191287e-70,6960775.3012970937,0.18867326548123764,8.8634787638218339e+30,7.2627026543205424e+27,3.9446957586778601e-39,1.6365493417233204e+51,1.2958166912738317e-34,0.17729437228206352,6.5795796395781624e+22,1.962376514472091e-14,5.9429712272643494e+17,9.5157038805896695e-41,4.9874363777540087e-38,3.2780161266829684e+66,1.2133473796280518e+35,1.4548058003179166e-20,2.3795451458665222e-59,0.0019254665282817177,1.8411435933010303e-45,1.6127481405116683e+51,1.9008634788747631e+33,1.9919896438180512e-66,8.7416203356537439e+44,1.2230399675422371e-13,4406389.9043542072,54774204.62455301,1.1964037841743343e-33,1.3149060576209934e-69,2.215022979746933e-43,7.5232808363741011e-21,5.9406070405414087e-31,122794.97701123731,3.0307401632959436e+21,9.093731365381068e-54,9.8149584138698801e+70,1.0718291525680017e-05,15354749710691042,5.0914876214396784e-09,8.2015543942038238e-07,4.9710437674680242e-28,1.6795352288059469e+24,5.0614367658635244e+18,1.9921449739979381e-54,1.4834579678685924e+36,6.0953766729004819,3.9832280581909703e-13,4.1903190002651996e-48,7.2089122450655632e-51,1.5386247557906567e-63,408853355928719.38,8.6519498367675304e-10,1.5497573339233726e+60,4.1651110640546662e+18,736689703.10220325,1.6205322513968411e-29,9.4532268311858952e+28,7627123070013422,732215319333851.88,2.9985918912884367e-10,1.8008805014659658e-54,9.3934330369956308e+66,51644230162014.562,2.1384307815356182e+52,272687214858.63046,6.7643524711842308e-67,1.1824807651457752e+22,1.9628580000015662e-05]}
},{}],91:[function(require,module,exports){
module.exports={"z":[1,1.0290290290290289,1.0580580580580581,1.087087087087087,1.1161161161161162,1.1451451451451451,1.1741741741741742,1.2032032032032032,1.2322322322322323,1.2612612612612613,1.2902902902902902,1.3193193193193193,1.3483483483483485,1.3773773773773774,1.4064064064064064,1.4354354354354355,1.4644644644644644,1.4934934934934936,1.5225225225225225,1.5515515515515514,1.5805805805805806,1.6096096096096097,1.6386386386386387,1.6676676676676676,1.6966966966966968,1.7257257257257259,1.7547547547547548,1.7837837837837838,1.8128128128128127,1.8418418418418419,1.870870870870871,1.8998998998998999,1.9289289289289289,1.957957957957958,1.9869869869869872,2.0160160160160161,2.045045045045045,2.0740740740740744,2.1031031031031029,2.1321321321321323,2.1611611611611612,2.1901901901901901,2.2192192192192195,2.248248248248248,2.2772772772772774,2.3063063063063063,2.3353353353353352,2.3643643643643646,2.3933933933933935,2.4224224224224224,2.4514514514514518,2.4804804804804803,2.5095095095095097,2.5385385385385386,2.5675675675675675,2.5965965965965969,2.6256256256256254,2.6546546546546548,2.6836836836836837,2.7127127127127126,2.741741741741742,2.7707707707707709,2.7997997997997999,2.8288288288288292,2.8578578578578577,2.8868868868868871,2.915915915915916,2.944944944944945,2.9739739739739743,3.0030030030030033,3.0320320320320322,3.0610610610610611,3.0900900900900901,3.1191191191191194,3.1481481481481484,3.1771771771771773,3.2062062062062062,3.2352352352352352,3.2642642642642645,3.2932932932932935,3.3223223223223224,3.3513513513513513,3.3803803803803807,3.4094094094094096,3.4384384384384385,3.4674674674674675,3.4964964964964964,3.5255255255255258,3.5545545545545547,3.5835835835835836,3.6126126126126126,3.6416416416416419,3.6706706706706709,3.6996996996996998,3.7287287287287287,3.7577577577577581,3.786786786786787,3.815815815815816,3.8448448448448449,3.8738738738738738,3.9029029029029032,3.9319319319319321,3.9609609609609611,3.98998998998999,4.0190190190190194,4.0480480480480487,4.0770770770770772,4.1061061061061057,4.1351351351351351,4.1641641641641645,4.1931931931931938,4.2222222222222223,4.2512512512512508,4.2802802802802802,4.3093093093093096,4.3383383383383389,4.3673673673673674,4.3963963963963968,4.4254254254254253,4.4544544544544546,4.483483483483484,4.5125125125125125,4.5415415415415419,4.5705705705705704,4.5995995995995997,4.6286286286286291,4.6576576576576585,4.686686686686687,4.7157157157157155,4.7447447447447448,4.7737737737737742,4.8028028028028036,4.8318318318318321,4.8608608608608606,4.8898898898898899,4.9189189189189193,4.9479479479479487,4.9769769769769772,5.0060060060060065,5.035035035035035,5.0640640640640644,5.0930930930930929,5.1221221221221223,5.1511511511511516,5.1801801801801801,5.2092092092092095,5.2382382382382389,5.2672672672672673,5.2962962962962967,5.3253253253253252,5.3543543543543546,5.383383383383384,5.4124124124124124,5.4414414414414418,5.4704704704704703,5.4994994994994997,5.5285285285285291,5.5575575575575575,5.5865865865865869,5.6156156156156163,5.6446446446446448,5.6736736736736741,5.7027027027027026,5.731731731731732,5.7607607607607614,5.7897897897897899,5.8188188188188192,5.8478478478478477,5.8768768768768771,5.9059059059059065,5.934934934934935,5.9639639639639643,5.9929929929929928,6.0220220220220222,6.0510510510510516,6.0800800800800801,6.1091091091091094,6.1381381381381388,6.1671671671671673,6.1961961961961967,6.2252252252252251,6.2542542542542545,6.2832832832832839,6.3123123123123124,6.3413413413413418,6.3703703703703702,6.3993993993993996,6.428428428428429,6.4574574574574575,6.4864864864864868,6.5155155155155162,6.5445445445445447,6.5735735735735741,6.6026026026026026,6.6316316316316319,6.6606606606606613,6.6896896896896898,6.7187187187187192,6.7477477477477477,6.776776776776777,6.8058058058058064,6.8348348348348349,6.8638638638638643,6.8928928928928928,6.9219219219219221,6.9509509509509515,6.97997997997998,7.0090090090090094,7.0380380380380387,7.0670670670670672,7.0960960960960966,7.1251251251251251,7.1541541541541545,7.1831831831831838,7.2122122122122123,7.2412412412412417,7.2702702702702702,7.2992992992992995,7.3283283283283289,7.3573573573573574,7.3863863863863868,7.4154154154154162,7.4444444444444446,7.473473473473474,7.5025025025025025,7.5315315315315319,7.5605605605605612,7.5895895895895897,7.6186186186186191,7.6476476476476476,7.676676676676677,7.7057057057057063,7.7347347347347348,7.7637637637637642,7.7927927927927936,7.8218218218218221,7.8508508508508514,7.8798798798798799,7.9089089089089093,7.9379379379379387,7.9669669669669672,7.9959959959959965,8.025025025025025,8.0540540540540544,8.0830830830830838,8.1121121121121114,8.1411411411411407,8.1701701701701701,8.1991991991991995,8.2282282282282289,8.2572572572572582,8.2862862862862876,8.315315315315317,8.3443443443443446,8.373373373373374,8.4024024024024015,8.4314314314314309,8.4604604604604603,8.4894894894894897,8.518518518518519,8.5475475475475484,8.5765765765765778,8.6056056056056072,8.6346346346346348,8.6636636636636641,8.6926926926926935,8.7217217217217211,8.7507507507507505,8.7797797797797799,8.8088088088088092,8.8378378378378386,8.866866866866868,8.8958958958958974,8.924924924924925,8.9539539539539543,8.9829829829829837,9.0120120120120131,9.0410410410410407,9.07007007007007,9.0990990990990994,9.1281281281281288,9.1571571571571582,9.1861861861861858,9.2152152152152151,9.2442442442442445,9.2732732732732739,9.3023023023023033,9.3313313313313326,9.3603603603603602,9.3893893893893896,9.418418418418419,9.4474474474474484,9.4764764764764777,9.5055055055055053,9.5345345345345347,9.5635635635635641,9.5925925925925934,9.6216216216216228,9.6506506506506504,9.6796796796796798,9.7087087087087092,9.7377377377377385,9.7667667667667679,9.7957957957957955,9.8248248248248249,9.8538538538538543,9.8828828828828836,9.911911911911913,9.9409409409409406,9.96996996996997,9.9989989989989994,10.028028028028029,10.057057057057058,10.086086086086086,10.115115115115115,10.144144144144144,10.173173173173174,10.202202202202203,10.231231231231233,10.26026026026026,10.28928928928929,10.318318318318319,10.347347347347348,10.376376376376378,10.405405405405405,10.434434434434435,10.463463463463464,10.492492492492493,10.521521521521523,10.55055055055055,10.57957957957958,10.608608608608609,10.637637637637638,10.666666666666668,10.695695695695695,10.724724724724725,10.753753753753754,10.782782782782784,10.811811811811813,10.840840840840841,10.86986986986987,10.898898898898899,10.927927927927929,10.956956956956958,10.985985985985986,11.015015015015015,11.044044044044044,11.073073073073074,11.102102102102103,11.131131131131133,11.16016016016016,11.189189189189189,11.218218218218219,11.247247247247248,11.276276276276278,11.305305305305305,11.334334334334335,11.363363363363364,11.392392392392393,11.421421421421423,11.45045045045045,11.47947947947948,11.508508508508509,11.537537537537538,11.566566566566568,11.595595595595595,11.624624624624625,11.653653653653654,11.682682682682684,11.711711711711713,11.74074074074074,11.76976976976977,11.798798798798799,11.827827827827829,11.856856856856858,11.885885885885886,11.914914914914915,11.943943943943944,11.972972972972974,12.002002002002003,12.031031031031032,12.06006006006006,12.089089089089089,12.118118118118119,12.147147147147148,12.176176176176178,12.205205205205205,12.234234234234235,12.263263263263264,12.292292292292293,12.321321321321323,12.35035035035035,12.37937937937938,12.408408408408409,12.437437437437438,12.466466466466468,12.495495495495495,12.524524524524525,12.553553553553554,12.582582582582583,12.611611611611613,12.64064064064064,12.66966966966967,12.698698698698699,12.727727727727729,12.756756756756758,12.785785785785786,12.814814814814815,12.843843843843844,12.872872872872874,12.901901901901903,12.930930930930932,12.95995995995996,12.988988988988989,13.018018018018019,13.047047047047048,13.076076076076077,13.105105105105105,13.134134134134134,13.163163163163164,13.192192192192193,13.221221221221223,13.25025025025025,13.27927927927928,13.308308308308309,13.337337337337338,13.366366366366368,13.395395395395395,13.424424424424425,13.453453453453454,13.482482482482483,13.511511511511513,13.54054054054054,13.56956956956957,13.598598598598599,13.627627627627628,13.656656656656658,13.685685685685687,13.714714714714715,13.743743743743744,13.772772772772774,13.801801801801803,13.830830830830832,13.85985985985986,13.888888888888889,13.917917917917919,13.946946946946948,13.975975975975977,14.005005005005005,14.034034034034034,14.063063063063064,14.092092092092093,14.121121121121122,14.15015015015015,14.179179179179179,14.208208208208209,14.237237237237238,14.266266266266268,14.295295295295295,14.324324324324325,14.353353353353354,14.382382382382383,14.411411411411413,14.44044044044044,14.46946946946947,14.498498498498499,14.527527527527528,14.556556556556558,14.585585585585587,14.614614614614615,14.643643643643644,14.672672672672673,14.701701701701703,14.730730730730732,14.75975975975976,14.788788788788789,14.817817817817819,14.846846846846848,14.875875875875877,14.904904904904905,14.933933933933934,14.962962962962964,14.991991991991993,15.021021021021022,15.05005005005005,15.079079079079079,15.108108108108109,15.137137137137138,15.166166166166168,15.195195195195195,15.224224224224224,15.253253253253254,15.282282282282283,15.311311311311313,15.34034034034034,15.36936936936937,15.398398398398399,15.427427427427428,15.456456456456458,15.485485485485487,15.514514514514515,15.543543543543544,15.572572572572573,15.601601601601603,15.630630630630632,15.65965965965966,15.688688688688689,15.717717717717719,15.746746746746748,15.775775775775777,15.804804804804805,15.833833833833834,15.862862862862864,15.891891891891893,15.920920920920922,15.94994994994995,15.978978978978979,16.008008008008009,16.037037037037038,16.066066066066067,16.095095095095097,16.124124124124123,16.153153153153156,16.182182182182181,16.211211211211214,16.24024024024024,16.26926926926927,16.298298298298299,16.327327327327328,16.356356356356358,16.385385385385387,16.414414414414416,16.443443443443442,16.472472472472475,16.501501501501501,16.530530530530534,16.55955955955956,16.588588588588589,16.617617617617618,16.646646646646648,16.675675675675677,16.704704704704703,16.733733733733736,16.762762762762762,16.791791791791795,16.820820820820821,16.84984984984985,16.878878878878879,16.907907907907909,16.936936936936938,16.965965965965967,16.994994994994997,17.024024024024026,17.053053053053056,17.082082082082081,17.111111111111111,17.14014014014014,17.169169169169169,17.198198198198199,17.227227227227228,17.256256256256258,17.285285285285287,17.314314314314316,17.343343343343346,17.372372372372372,17.401401401401401,17.43043043043043,17.45945945945946,17.488488488488489,17.517517517517518,17.546546546546548,17.575575575575577,17.604604604604607,17.633633633633636,17.662662662662665,17.691691691691691,17.72072072072072,17.74974974974975,17.778778778778779,17.807807807807809,17.836836836836838,17.865865865865867,17.894894894894897,17.923923923923926,17.952952952952955,17.981981981981981,18.011011011011011,18.04004004004004,18.069069069069069,18.098098098098099,18.127127127127128,18.156156156156158,18.185185185185187,18.214214214214216,18.243243243243246,18.272272272272271,18.301301301301301,18.33033033033033,18.35935935935936,18.388388388388389,18.417417417417418,18.446446446446448,18.475475475475477,18.504504504504506,18.533533533533536,18.562562562562565,18.591591591591591,18.62062062062062,18.64964964964965,18.678678678678679,18.707707707707709,18.736736736736738,18.765765765765767,18.794794794794797,18.823823823823826,18.852852852852855,18.881881881881881,18.910910910910911,18.93993993993994,18.968968968968969,18.997997997997999,19.027027027027028,19.056056056056057,19.085085085085087,19.114114114114116,19.143143143143146,19.172172172172171,19.201201201201201,19.23023023023023,19.25925925925926,19.288288288288289,19.317317317317318,19.346346346346348,19.375375375375377,19.404404404404406,19.433433433433436,19.462462462462465,19.491491491491491,19.52052052052052,19.54954954954955,19.578578578578579,19.607607607607608,19.636636636636638,19.665665665665667,19.694694694694697,19.723723723723726,19.752752752752755,19.781781781781781,19.810810810810811,19.83983983983984,19.868868868868869,19.897897897897899,19.926926926926928,19.955955955955957,19.984984984984987,20.014014014014016,20.043043043043046,20.072072072072071,20.101101101101101,20.13013013013013,20.159159159159159,20.188188188188189,20.217217217217218,20.246246246246248,20.275275275275277,20.304304304304306,20.333333333333336,20.362362362362365,20.391391391391391,20.42042042042042,20.44944944944945,20.478478478478479,20.507507507507508,20.536536536536538,20.565565565565567,20.594594594594597,20.623623623623626,20.652652652652655,20.681681681681681,20.71071071071071,20.73973973973974,20.768768768768769,20.797797797797799,20.826826826826828,20.855855855855857,20.884884884884887,20.913913913913916,20.942942942942945,20.971971971971971,21.001001001001001,21.03003003003003,21.059059059059059,21.088088088088089,21.117117117117118,21.146146146146148,21.175175175175177,21.204204204204206,21.233233233233236,21.262262262262265,21.291291291291291,21.32032032032032,21.34934934934935,21.378378378378379,21.407407407407408,21.436436436436438,21.465465465465467,21.494494494494496,21.523523523523526,21.552552552552555,21.581581581581581,21.61061061061061,21.63963963963964,21.668668668668669,21.697697697697699,21.726726726726728,21.755755755755757,21.784784784784787,21.813813813813816,21.842842842842845,21.871871871871871,21.900900900900901,21.92992992992993,21.958958958958959,21.987987987987989,22.017017017017018,22.046046046046047,22.075075075075077,22.104104104104106,22.133133133133136,22.162162162162165,22.191191191191191,22.22022022022022,22.24924924924925,22.278278278278279,22.307307307307308,22.336336336336338,22.365365365365367,22.394394394394396,22.423423423423426,22.452452452452455,22.481481481481481,22.51051051051051,22.53953953953954,22.568568568568569,22.597597597597598,22.626626626626628,22.655655655655657,22.684684684684687,22.713713713713716,22.742742742742745,22.771771771771771,22.800800800800801,22.82982982982983,22.858858858858859,22.887887887887889,22.916916916916918,22.945945945945947,22.974974974974977,23.004004004004006,23.033033033033036,23.062062062062065,23.091091091091091,23.12012012012012,23.149149149149149,23.178178178178179,23.207207207207208,23.236236236236238,23.265265265265267,23.294294294294296,23.323323323323326,23.352352352352355,23.381381381381381,23.41041041041041,23.43943943943944,23.468468468468469,23.497497497497498,23.526526526526528,23.555555555555557,23.584584584584587,23.613613613613616,23.642642642642645,23.671671671671671,23.7007007007007,23.72972972972973,23.758758758758759,23.787787787787789,23.816816816816818,23.845845845845847,23.874874874874877,23.903903903903906,23.932932932932935,23.961961961961965,23.990990990990991,24.02002002002002,24.049049049049049,24.078078078078079,24.107107107107108,24.136136136136138,24.165165165165167,24.194194194194196,24.223223223223226,24.252252252252255,24.281281281281281,24.31031031031031,24.33933933933934,24.368368368368369,24.397397397397398,24.426426426426428,24.455455455455457,24.484484484484486,24.513513513513516,24.542542542542545,24.571571571571571,24.6006006006006,24.62962962962963,24.658658658658659,24.687687687687689,24.716716716716718,24.745745745745747,24.774774774774777,24.803803803803806,24.832832832832835,24.861861861861865,24.890890890890891,24.91991991991992,24.948948948948949,24.977977977977979,25.007007007007008,25.036036036036037,25.065065065065067,25.094094094094096,25.123123123123126,25.152152152152155,25.181181181181181,25.21021021021021,25.23923923923924,25.268268268268269,25.297297297297298,25.326326326326328,25.355355355355357,25.384384384384386,25.413413413413416,25.442442442442445,25.471471471471471,25.5005005005005,25.52952952952953,25.558558558558559,25.587587587587588,25.616616616616618,25.645645645645647,25.674674674674677,25.703703703703706,25.732732732732735,25.761761761761765,25.790790790790791,25.81981981981982,25.848848848848849,25.877877877877879,25.906906906906908,25.935935935935937,25.964964964964967,25.993993993993996,26.023023023023026,26.052052052052055,26.081081081081081,26.11011011011011,26.139139139139139,26.168168168168169,26.197197197197198,26.226226226226228,26.255255255255257,26.284284284284286,26.313313313313316,26.342342342342345,26.371371371371374,26.4004004004004,26.42942942942943,26.458458458458459,26.487487487487488,26.516516516516518,26.545545545545547,26.574574574574577,26.603603603603606,26.632632632632635,26.661661661661665,26.69069069069069,26.71971971971972,26.748748748748749,26.777777777777779,26.806806806806808,26.835835835835837,26.864864864864867,26.893893893893896,26.922922922922925,26.951951951951955,26.980980980980981,27.01001001001001,27.039039039039039,27.068068068068069,27.097097097097098,27.126126126126128,27.155155155155157,27.184184184184186,27.213213213213216,27.242242242242245,27.271271271271274,27.3003003003003,27.32932932932933,27.358358358358359,27.387387387387388,27.416416416416418,27.445445445445447,27.474474474474476,27.503503503503506,27.532532532532535,27.561561561561565,27.59059059059059,27.61961961961962,27.648648648648649,27.677677677677679,27.706706706706708,27.735735735735737,27.764764764764767,27.793793793793796,27.822822822822825,27.851851851851855,27.880880880880881,27.90990990990991,27.938938938938939,27.967967967967969,27.996996996996998,28.026026026026027,28.055055055055057,28.084084084084086,28.113113113113116,28.142142142142145,28.171171171171174,28.2002002002002,28.22922922922923,28.258258258258259,28.287287287287288,28.316316316316318,28.345345345345347,28.374374374374376,28.403403403403406,28.432432432432435,28.461461461461464,28.49049049049049,28.51951951951952,28.548548548548549,28.577577577577578,28.606606606606608,28.635635635635637,28.664664664664667,28.693693693693696,28.722722722722725,28.751751751751755,28.780780780780781,28.80980980980981,28.838838838838839,28.867867867867869,28.896896896896898,28.925925925925927,28.954954954954957,28.983983983983986,29.013013013013015,29.042042042042045,29.071071071071074,29.1001001001001,29.129129129129129,29.158158158158159,29.187187187187188,29.216216216216218,29.245245245245247,29.274274274274276,29.303303303303306,29.332332332332335,29.361361361361364,29.39039039039039,29.41941941941942,29.448448448448449,29.477477477477478,29.506506506506508,29.535535535535537,29.564564564564566,29.593593593593596,29.622622622622625,29.651651651651655,29.68068068068068,29.70970970970971,29.738738738738739,29.767767767767769,29.796796796796798,29.825825825825827,29.854854854854857,29.883883883883886,29.912912912912915,29.941941941941945,29.970970970970974,30],"delta":[13,-15,17,14,-15,19,17,-11,5,-8,-17,2,-9,-13,2,20,19,20,19,19,-14,9,19,20,19,-16,-1,12,12,-8,-15,-20,-3,-16,17,6,12,16,19,0,6,12,-19,-6,14,-12,18,7,7,-4,11,10,10,-1,-4,-3,6,-13,-13,-8,8,12,-19,-8,-9,15,-19,-14,-17,20,13,13,8,-15,-7,11,18,0,-19,7,-3,-15,-5,-12,11,-18,12,-19,-13,-4,0,-2,-2,-1,6,12,9,17,10,13,-9,8,7,-20,6,9,-14,6,-16,-2,0,11,19,3,-7,15,3,13,-11,-20,10,13,-10,13,0,18,8,-4,16,-3,19,3,2,-14,-15,11,-14,-11,-10,13,14,20,-10,-7,13,-8,-11,-20,18,-12,-6,17,-12,14,-10,19,5,11,-1,20,-6,-18,14,12,3,4,2,10,17,8,-9,7,11,-4,10,3,-5,-12,3,1,-17,-4,-18,-6,1,4,11,-6,18,19,-15,-14,3,-4,-1,-5,-20,9,-7,-5,-14,18,12,-3,-8,15,1,5,-14,-16,4,-1,-10,-7,6,1,8,9,10,20,-2,9,-17,17,-11,0,17,2,-14,0,13,-2,2,2,20,-2,-17,15,-2,4,-16,0,19,20,-20,-19,11,20,13,-6,15,7,-17,-6,-4,15,-10,-19,12,7,-3,10,17,-15,-13,20,-10,-17,-15,-9,-15,12,15,-17,3,5,2,-20,-15,7,14,1,5,-3,-6,-12,1,-15,-4,-5,-17,11,-11,-19,-15,-10,-13,0,-11,13,-3,20,-18,13,17,-8,18,-19,0,-10,0,2,-7,16,16,-6,-5,-19,-16,-14,11,15,-5,-12,-11,-9,-4,0,-17,-11,-15,0,18,19,19,6,3,11,-18,-3,-11,2,-6,-18,13,-7,-20,-4,-19,17,-14,13,6,-10,10,-15,6,0,-2,-5,2,9,-8,-9,10,5,-13,13,8,-8,-13,-5,-5,-6,5,13,11,7,-17,-5,18,-2,11,-8,-1,17,-3,0,-2,10,-8,-16,0,-4,0,15,13,-6,12,17,6,2,-5,-15,13,-12,1,18,-6,20,18,-11,15,-20,2,-5,5,11,4,-1,-12,2,-8,-20,-1,16,-11,-13,14,16,-13,-2,-11,-14,-14,-11,-11,12,-3,-1,-8,-17,17,6,-3,5,-13,3,17,9,20,-6,-3,7,-16,9,-10,-14,-4,-15,4,-2,-10,-19,4,12,9,-14,-11,14,-16,-7,-8,6,-7,-3,-3,12,0,-16,-17,20,-10,-13,12,11,-19,-10,18,-10,9,-16,0,-6,3,-9,-11,19,-2,-12,19,4,2,-11,1,-13,-11,-4,0,-4,5,-14,7,-8,-4,6,-5,-14,20,11,-19,16,16,19,17,-20,12,3,-16,11,-10,-7,-7,-15,7,-9,-15,14,9,-11,-16,0,6,-20,0,-20,11,-9,9,-16,17,-5,16,-6,-7,9,8,-18,-12,1,-19,-3,10,8,0,-10,-1,-4,17,-10,5,18,5,-1,15,5,13,0,3,1,-13,-10,-11,-7,16,0,-19,4,0,-8,-14,19,20,-11,9,10,0,-7,-1,-7,-18,19,7,1,-19,15,-18,18,1,7,-17,-9,13,-18,13,-11,9,8,-14,-13,7,-3,1,18,19,-15,6,6,12,-1,-2,-3,-3,-10,13,0,-17,17,-15,-17,-13,9,-4,5,14,-13,12,-4,-18,-9,-4,15,1,17,-3,5,6,-13,5,1,-9,13,-3,-6,-20,13,20,-8,-14,-13,-16,0,-5,-12,-12,15,0,-12,-7,5,19,16,17,-4,-18,18,10,-14,-9,19,-3,3,2,4,18,-15,-3,3,20,2,-8,-8,8,-16,7,10,2,-11,8,13,7,-13,-13,-8,-15,16,20,7,-13,10,-19,-18,3,-15,16,-17,7,-20,-13,-2,-5,6,-2,1,20,0,-14,-7,15,-10,6,-11,-5,-13,-13,4,-3,9,-1,15,-16,8,4,-11,-11,-1,-5,-20,3,10,-10,6,-9,-17,5,-1,-10,20,13,1,20,16,9,11,-6,-12,3,17,-16,-5,17,14,16,-7,13,-7,-10,7,4,4,-20,-18,-3,11,-8,0,-14,0,-13,-3,-3,-4,-17,11,4,19,-1,10,8,6,8,-18,6,5,-19,1,-18,-8,-7,-7,1,5,6,20,-4,1,13,9,9,-10,19,-7,1,10,-7,8,-16,7,5,-17,11,-2,-3,8,-17,-18,-10,-18,-14,1,-9,-10,-2,-1,1,-15,-2,-17,15,-16,1,19,18,11,6,-10,19,9,-11,-3,7,-1,-9,-18,7,5,8,0,-18,17,-10,18,-11,17,7,-8,14,12,-6,-11,12,-2,7,0,-20,-11,4,9,-5,20,17,6,-20,-9,-2,-1,-3,-20,-2,-2,11,19,-7,-8,12,-12,-1,-10,-19,13,-13,-1,9,-4,-1,-12,-14,2,-7,9,4,-9,-13,2,10,10,-11,-7,17,12,-9,15,11,-20,-13,16,-9,4,-17,-17,3,17,8,17,2,20,-3,16,6,18,6,18,7,-20,6,11,18,-19,-12,4,9,6,-11,-7,-16,-16,4,-15,-2,19,-2,1,7,7,11,9,-6,-18,7,-12,-3,-3,14,-20,14,-18,-10,-6,5,-8],"expected":[1.6059043836821613e-10,2301204513.7373009,2.3085275139061478e-15,8.6916049700860264e-12,6861508663.0223179,4.9897285310804168e-18,1.5790314954233859e-15,392305.07066982199,0.0050793600798639035,-629.70013103020176,2103382041879.05,0.32680563205390256,4857.5891585855343,48686405.286503427,0.2954746241436278,9.7288866201780718e-20,1.8220738966505779e-18,8.1546227610740262e-20,1.5339089915807106e-18,1.4089529241479796e-18,-382264611.110484,6.1294215607340601e-07,1.0965022906150945e-18,4.8865780121961023e-20,9.3081328854016292e-19,-40176020653.217705,0.75475475475475484,2.609430815125455e-10,2.4406021480360691e-10,-138.82050420177578,1042933543.6672473,-812108692445907.88,0.070712084187020643,-4019900709.4359689,1.6135477597797387e-16,0.00019342761298439572,1.4565287730806301e-10,2.3503903914405328e-15,3.1542880912404454e-19,1,0.00015447501109577355,1.0713723481291258e-10,-42838736264699.539,4.2128647107860751,4.1063931795075937e-13,542520.13858784596,3.6088464412271933e-18,1.369682965628683e-05,1.3097146606990508e-05,0.54749051834367923,8.5109081221618384e-10,1.0058957951590377e-08,9.5512616118634339e-09,1.5385385385385386,0.55110740219223431,-0.38425146201591315,7.9898855669021599e-05,-3449109.4855925776,-3120553.9029381596,76.942233117565721,8.0551330995608405e-07,3.4582075895887922e-11,-11525803924190.396,45.128362752554004,-227.84205057477993,7.0177118163513628e-15,-4080240571226.5088,4758551.3891450241,-4744915318.0653524,1.7676930635228994e-21,1.4431439775187449e-12,1.3695528700730649e-12,4.8515270336750852e-07,92399803.6920477,6.3317715104500261,2.3966129982378073e-10,5.3721433102405254e-19,1,6073900326819.6211,3.7770675777799736e-06,0.98980629044226198,159476109.11226577,1.2543000461284317,-133987.52597769481,1.5826789797541526e-10,-371328970801.36121,9.9812191771748494e-12,5244966147084.0938,1107139.4705773469,-0.99424729063077422,1,4.3366289212135074,4.4618111605098605,2.6996996996996998,2.180943786769267e-05,6.6182787361896789e-12,1.649936978254365e-08,3.4271206137272152e-18,1.1905281721146921e-09,3.4919984740348085e-13,72.063279600097303,1.6303147203689195e-07,1.7259445355138751e-06,-1276051646289.7341,1.6224765035602023e-05,1.1787382201404122e-08,1528967.5201732595,1.4891518023378554e-05,318444672.77479076,6.8477706936165408,1,5.0479626884119888e-11,3.3720725413968506e-21,0.0070451750728017732,-9.7244770178329443,5.4092516124807378e-16,0.0066997569279575054,1.5791900201939829e-13,-7032.9893496751083,20263505485645.188,5.1422880224055788e-10,1.3339821632182497e-13,1039.6108118413952,1.2272295013223257e-13,1,3.9281220633290356e-20,7.1652786674690546e-08,11.472189135805701,1.5281566466562481e-17,17.933129352602883,1.3550292386249223e-21,0.0052744787926330243,0.035488136697605317,1305993.2240585138,-10336674.886273768,2.0296526220660159e-11,469378.36935096909,-400.90063056075633,-17.275632578521449,6.4350328220642302e-14,3.4256193036680158e-15,3.306816047429362e-23,-335.87249714475809,7.683945790672853,5.2985313536823009e-14,-29.836739818502203,3466.4342063720615,-5400162771363.6191,1.3362298907398287e-20,-28353.990931045071,-10.655377635842397,2.613277411688648e-19,-30940.363635926828,2.0418213410343373e-15,-868.49564872731958,4.1577572565295615e-22,4.528611792966118e-05,9.4351675306465157e-12,4.5865865865865869,1.4095440672403032e-23,-16.866708033539933,-20727323145.482079,1.4450904113519343e-15,4.6217250728667447e-13,0.0033084174014745486,0.00037151525213840607,0.025203219058988501,1.0756254106096776e-10,1.2709539075579413e-19,2.0977618894787419e-08,45.223343116151227,2.5805022504838319e-07,5.7796618488972167e-12,123.42597397792834,8.7056782018722107e-11,0.0028749934910170137,152.6870250617624,11336.940525874028,0.0027700990634268114,0.16138933764135702,-845241711.74964476,163.97925372412726,11388290269.347525,71.911423480383178,0.15769534333070243,0.00027154672728906996,3.7347682898772279e-12,122.48443631346629,2.4239493097908799e-21,9.5080022679757264e-23,-10850583.72761927,1257670.7527536554,0.0023428028524828896,241.7784090771259,5.6316316316316319,426.72143885875761,1497940573558.3748,7.0543454180641767e-10,-92.64062280033383,514.18060093831059,684093.8078583054,1.4468158588990571e-21,1.2977344506572844e-13,112.24492433447534,49.816608703717343,1.494541222776871e-17,0.14326688656245518,1.7945198686000332e-05,-136986.28892440704,-16966843.004390988,0.00018953802114242901,6.1251251251251251,-707.75858951715941,201.9319098645897,1.3106958470949457e-06,0.138097871163948,6.6704486752489705e-09,4.2625801366580687e-10,2.5475671418438988e-11,1.0886554929901506e-24,34.399544689834983,3.8675272007576499e-10,678311123.30468333,1.5346020256584606e-20,6937.7816480462261,1,1.3787587536720633e-20,0.015339432560221583,-1040177.1842848442,1,2.8798015458369993e-15,38.260783305828362,0.014801470214621993,0.014697281948074171,6.0704422510230197e-25,39.715431146862578,273055771.24902391,5.1194284557276999e-18,40.824113402691985,0.0001296651393328838,-6729338.3639943339,1,1.2109145923074679e-23,4.3154277042068069e-25,190213659033.33957,-21087749343.402519,6.9362314671754147e-13,3.7160269904368829e-25,1.6985984095841657e-15,7158.6847353849989,3.3903929515744171e-18,4.8000387391359543e-08,-457330555.93475258,8481.854951814068,1104.3307452196505,2.9028906047232852e-18,5286.2109773793345,-53425344710.233093,2.6210805987682454e-14,4.1429627540695043e-08,274.14829659905575,8.8032102995423734e-12,4.0333118433618444e-21,-7779686.6664655022,-220800.70339099827,1.9252815201115128e-25,6278.3693826565031,-367722708.07667762,-5594018.9384431178,-4444.2480357499526,-4330441.5388366468,1.8643882593181782e-14,1.7344363508205323e-18,-121001432.00738284,0.0010242797927225121,6.5261845544879451e-06,0.011082988334022629,-65070210541.293793,2057371.8574199413,2.905991782880184e-08,3.1686347157787216e-17,0.10920419763882815,5.9454412239524801e-06,368.40405903733893,26929.025508733474,-75358.366702041909,0.10750026901969223,8844600.5718258452,2097.9724670346482,9370.0505475432074,510983388.56332135,2.3012794531092483e-13,48608.869588582791,43001586169.844505,11022118.10711634,-37921.533318868394,456738.08317148557,1,56667.441128108439,4.2684054172906241e-16,450.37506191092217,5.5374986581115153e-26,-3053980912.5055094,3.854646136888908e-16,1.0779808304719806e-21,276109.30343276064,3.7759654368014445e-23,11461465502.78882,1,-10002.704363862238,1,0.0090424600700132144,195641.66490395903,2.1494272334643587e-20,2.0891165248727387e-20,69686.411627378169,17174.617980096154,-24978596176.774506,60718680.744091965,2483119.4334709737,1.19691250033675e-13,4.3404652592357489e-19,19457.995521123572,365802.03989378893,-247807.82299444446,1100162.2999150883,3863.7048470796326,1,-678703713.73322237,-354464.32571250922,-19348750.613368209,1,1.7157417444994241e-23,5.8105953682585448e-25,5.6357271752741209e-25,1.9666583327901022e-07,0.00062033358870212528,8.3081525507939176e-14,3058202496.5173368,682.16340594578287,-318047.99999383115,0.0077109981965244965,142213.10156669852,773714860.53339386,1.4196203475653206e-16,614818.78953706461,-58079618699.740807,5218.71309274534,15020630489.827681,2.9389033559165521e-22,-4002470.1661046022,1.2064397235242232e-16,1.5728351246602635e-07,7177088.6758759199,1.2420945573440845e-12,29824006.077944119,1.49407715870047e-07,1,97.609427245062903,39404.61196522064,0.0070144296513223294,2.2282290956850961e-11,3620191.3270222414,9536788.4958574232,1.0285644416809266e-12,2.2124130231902856e-06,5775329.4512709351,8.3829238592390201e-17,3.8868339600690336e-10,4685559.5246950993,5604721.811139904,48535.66565151426,49366.414092229694,292606.0317702521,2.00949457956386e-06,7.0153884680156192e-17,3.7605255452152648e-14,6.4033404587461087e-09,126768242.40600479,55503.279935037339,4.3846609622004974e-24,111.26486847207568,3.3458226313238737e-14,7643350.2266308609,11.147147147147148,1.116715373002654e-22,1052.6282726658076,1,115.59783607431257,6.5185725573593062e-13,9645740.3159427028,384761388.05114239,1,9393.7574882834433,1,6.7414171593819092e-20,4.4478999091440255e-17,483467.07119580352,1.046634781138794e-15,7.7837592579878368e-23,8.7289727489222525e-08,0.005799574709128375,80057.197813219347,-155868847.97829795,3.7552095578638799e-17,213503200.17333534,0.07821185312769123,2.1318256218182058e-24,600220.38323437027,2.0562717098847835e-27,1.9713720518729695e-24,413669436.58585453,4.5402139448584795e-20,26428539750.904346,0.0054798480710899202,97343.876062243551,1.3127574814261264e-06,1.7343039822642362e-14,2.2061046103727259e-05,12.163163163163164,847023343.63779986,0.0053185290502455315,25650310.310770746,-687243254246.49011,12.308308308308309,1.1928273552471974e-21,999509968.09121943,582952938.24270868,8.6671427675340636e-19,1.0861784260999555e-21,890789502.39063847,144.02640879117359,1387187437.5912094,-563064175.68830311,-592691051.39591503,1626588693.6339705,1714114943.9188681,4.9111591422860746e-16,1595.9487803145516,12.743743743743744,42205890.648457661,5347867516.7518349,2.6961548606860688e-23,5.3908423707928804e-08,1668.5541838134432,9.9815226986360155e-07,5248327956.9781227,0.00029905792871936474,2.338025604810805e-23,5.4446869182663028e-12,6.7724570790488657e-28,1303856.5460134954,1768.7331118248728,2.4046220838622342e-09,2880653377.1997223,4.9843967778686335e-12,1420354725.312057,3680801759.1416225,19009.616187640531,-3563898714.2498522,1.5990172443966798e-05,165.70577584591601,1775869078.45524,-355745932381.16687,1.552789719127926e-05,2.9364769097366979e-16,4.2488205281903621e-12,16779256783.931877,7917359353.2744398,3.7192152209458029e-19,11681412380.736275,13893486.679192603,94964694.885984048,3.9362926351297097e-08,14737844.573951382,2078.8575018117876,2093.1041926785624,2.3716322155975753e-16,1,6614190022.7213926,-10197054327.306911,3.0492685523808668e-28,3598587611.9259319,91392081368.220322,2.0975015208536951e-16,5.3755083012587806e-15,252165807837.43884,4257553951.9423532,2.8988908535187213e-25,4549805783.905508,3.0282506697117594e-12,-35911276144.923508,1,2547078.2291206326,0.00023006274114281493,1031133189.2578762,25151376481.157055,7.0442762499768508e-27,194.53267682096515,98430457489.748795,6.5592073567084305e-27,1.195394847103931e-05,0.0038748037111046773,32885494167.658161,0.06397694524495677,345104358848.09119,36806786361.2612,30086.699156672224,1,30622.677871306125,5.6780704696721435e-07,882235024152.88257,1.2246321949958245e-09,239793199.14757136,31993.876985365099,2.6018133981874271e-08,357420.90366768884,1332152542702.2302,1.2272993979085452e-28,3.1298349771913046e-15,-847897377000.74072,1.4566876878462552e-22,1.4271993522044958e-22,3.8308436256853763e-27,4.253528686870159e-24,9285048562448.0078,1.0301994640456494e-16,0.00019384011227324767,1178772986764.4907,2.6830386632525837e-15,16101860209.257265,41409863.16593162,42111122.717183225,5429568778765.8613,9.675206518177575e-10,2844266468.5020995,6882398959490.9932,1.0179969390099063e-19,1.5956528438174938e-12,117398583384.95284,6317990832945.1895,1,2.0228398288794747e-08,18953243499984.445,1,16249230543074.41,2.0752013097889186e-15,3771484273.6977797,1.4041724024734139e-12,16850571879426.434,2.4683541530074669e-24,523214.01520181296,7.8231220701530516e-23,5905332.3553343248,60319910.557409413,1.2853726435095103e-12,3.1911218899398516e-11,-5102032225841.0586,1123924782107.7534,0.058047646717024982,15788876805099.658,3555.967947223799,4.4753269132323197e-14,2.9476839800745906e-11,1,41915563972.431732,16.43043043043043,49521.016412143887,1.7111506900778911e-24,46479112049.272568,3.5510660240115572e-07,4.6595355835868543e-26,3.498521803850455e-07,16.633633633633636,1.6681384058658845e-21,3.421445127339888e-07,1.567445974916516e-18,1,0.0001514367411140355,0.056155143338954466,11851972028550.445,62952838620.908096,444972665319.7558,94273164.013527587,4.2233932624390895e-23,1,-4022477368664.4438,6.9047744830698677e-06,1,1040443808.3844552,72579380291461.953,8.5279295776442799e-28,2.2452816834845833e-29,609325761535.7832,7.9775686611687836e-13,2.8905547667935837e-14,1,115789111.04254842,17.35935935935936,119180788.90139787,555927681808607.25,6.9070778640014909e-28,4.8942381742010195e-10,0.054040895813047704,-462890350952847.25,9.5820913037666758e-22,1294597615582035.8,2.2314917876142893e-26,0.053620310235628792,4.5793644234661434e-10,3005033875656841,14778670010.140585,8.8250914380499404e-19,3009970076245780,8.5543172151787377e-19,1111415956921.2808,6.1623150935488367e-13,1.6392767142471358e-11,245004262206904.81,51380992013607.523,4.1302307920189479e-10,4919.4426786172598,0.052476755791353677,1.624578105289163e-26,4.292090578858215e-28,1350485056977841.5,9.833767324467287e-09,9.7546136853935716e-09,2.1524953976986909e-17,18.25925925925926,316.17320022725431,5175.963951839628,5202.0952275590907,211655316370.24744,6.2898821142821448e-19,1,19166811495236436,4.5117661310344018e-25,2460724384634362.5,23293044795406760,105388010728720.38,4.6361934315338359e-13,85505.131743310674,2.1173015204778393e-07,1.6541938658029586e-20,124257250243600.83,1.6665650005000915e-17,88451.697127429958,74291551100280208,30342089011.643978,90255.746317083773,4.3679395554008409e-22,0.050183352589541368,3.3617034398508001e-25,5799.4325913717757,1.9543413068203127e-07,7.7524662404057863e-09,182813023552119.28,1.9159825844551281e-07,0.049676777722526107,36971125553.372452,4.2008402067244293e-19,6027.4760661978717,21371281.306073584,84302479066582320,3.9612431933856535e-19,4.7201414157024417e-30,3681377200.0838308,1646782189055347.8,265691420276113.94,42841181292172960,1,1618070.8788072499,39830020848909.602,40898513103367.156,2.9464715114011994e-22,1,44262559730822.797,341624877.21500981,1.6713616138238513e-07,1.4158327826341073e-28,7.4776432213574248e-24,1.9980758683725791e-25,111971.27207682823,8.9573251805685325e+17,5.0023512867572674e-27,9.4916585345043567e-15,3164297278177527.5,59969220596.590225,1.1919401478564951e-28,6872.5439223277599,9.3353901378414019e-05,0.0021468646615421128,3.8404117353233807e-06,4.2433885875600039e-27,25472328620288116,7063.3343274828021,9.117412281421086e-05,2.4962843768062376e-30,0.0021069914402819584,5941522961.3000727,6025644517.9428892,7.0513159213251511e-12,1.8529449058304426e+17,1.9677829649388089e-10,7.6366709786773589e-15,0.0020682190125521616,9951372563356.8125,6.6653599374370714e-12,2.1124064132954976e-19,1.8717174050147554e-10,902868207584295.12,928188458880885.62,7119210874.4967422,50977303488441944,4.2546790031736502e-24,1.7603656573740853e-30,1.7663498513231958e-10,1094296388555316.5,6.5256704752075163e-15,2.0617101237745857e+19,7.4954180106712842e+18,8.2788138524512669e-05,69947495743169320,3.6770331344615563e-24,2.2871212059676434e+18,1.6406979395165543e-10,6.7076273353273672e+19,1432779164410638.8,426.67494521548588,2567948.7483384246,4.4455999143828564e-09,430.28134440747056,0.044886772106398271,1.2491370211343341e-30,1,14806841951171730,683344696.53689647,1.0995882079990591e-22,1691738480770.1152,4.1725811445455843e-09,20170826300714.465,2810985.3007357563,2123305233965660.2,2178749619242222.8,2.9640266499256642e-06,8792.2060475567359,1.5208696068307999e-13,21.713713713713716,9.3186501908218559e-23,1.1727186883749942e+18,4.5032065313014362e-12,2.8660324051030033e-06,25603527477085.598,26111195270222.98,21.916916916916918,3117393.1054669996,5.3195941133599408e+20,7.2427470043400635e-05,4.2201053535132069e-15,2433535981723.7632,3.6082131338770298e-09,191882265149.02307,1.1537200336788961e+19,9.9612322441521557e-08,22.207207207207208,2693326922198.3545,6.7630843723094115e-31,9.518320027840156e-20,0.042875536480686691,6.4022803589979177e-31,1.7533360225769752e-24,1.1918978568118233e-13,1.0882587831049856e-16,62012234.810083292,449720907328082.62,6.7891345737027608e-05,4.0427260466099515e-26,3.1670508875430487e+18,3678237.7044444606,3.8531460112026423e-26,2.1916150025261367e-21,1.4816350327781129e-24,1122240462.4241793,7.7317635809947671e-20,1145808074.1307347,3748838382992.5938,1.0147009230577555e-10,2.4214375994226639e-06,2.4103672090380282e-06,3.7908522262041073e+21,2.0384499292980521e+20,10612.933283904795,8.6894640898132422e-17,20176518217.725315,1,78467218949370768,1,8131826976548438,10910.272050521689,10953.196707886736,222698.49928923926,5.1307019078187409e+19,7.7780757564311112e-17,2.2516611455202158e-06,1.4811244080005956e-29,23.397397397397398,2.5624317092805859e-15,2.7542738388706842e-12,2.6215138740149792e-09,2.70863281388998e-12,4.6415516646146494e+20,2.5711200094135934e-09,7.5616924106145243e-08,2.9453164158579203e+21,0.040553706259641144,5.6635525908921064e+20,26491936786.208473,1600515440.1406162,1616407608.9829314,0.040316396949029415,7.239197932427278e-08,2.4111214758429784e-09,2.4913340808347108e-31,251403.77708931747,0.040081848820414059,4.5503102852372672e-20,7.1296481052434088e-14,7.0652420702953322e-14,7363589755700.3789,9.7305030914817827e-30,1817907739.1984499,0.039758029211605039,1.9755798934732706e-15,1871514442.3073893,2.2044607456283853e-12,2.0383548042257539e+19,7.0050601667705966e-11,6.6070618778137657e-08,1.8637210807691808e+20,5.2116035348935114e-17,571.6013410808207,12859.307440899689,2.0661496838124053e-12,2.2006846395236286e+20,1.7126447546988762e+21,9498108965089.4531,1.8432909163307739e+21,2.8536081210894419e+17,0.038992974238875877,642742762737.00366,10223777049439.289,586.9753356960565,24.761761761761765,0.038773529982534444,3.6397947001225288e+18,592.61644026408794,3.3622500122822384e+20,1.9848615182378589e-23,4.0120190731650146e+19,0.038513435367593198,5.8546201316935547e-30,2.5360693528432638e-28,4.0927099511562779e-17,1.8543618586680486e-09,12527986351929.646,5.4009791360218023e-30,4.9942333349502176e-14,198757656048873.47,14194.389108558742,5.5425040639294888e-11,25.284284284284286,848783330162.31482,4.6528396284770391e+21,5.3902284358201558e-11,5.4459740235315767e-08,1.5901821534788026e-12,1,5.5264438119547221e+21,8.4974172149117996e-27,15504862795553.693,1.8940297689456244e-28,248821000700786.19,8.0163214279453896e-27,5.0300234969858427e-11,56320840584.596436,5.5695972506407627e-22,8.4725451203870466e-19,156531988.95952705,277915779693869.62,8.1996488168282762e-19,643.12636961285614,4.7616023426441214e-11,1,5.2350672428590997e+23,305273042133207.94,1.5182663682210533e-06,3.8586262302050209e-14,8006569.572643606,6.9402063115520815e-32,6.2715860544837676e-27,1.4850201080245357e-09,7.2407411802247444e+23,1238157567435.8003,662.41303565828105,26.271271271271274,16169.553364202067,8.840626887753232e+23,668.40469698928166,669.90682574466359,2.5381133441168362e-17,2.6540699018988041e-30,3828835327.7899737,75329310374.223007,6.3304870295594857e-19,6458655351921645,26.59059059059059,25739533534919.156,1.778964647511735e+23,1.5128231053080397e-20,1.0338382233304635e+17,26.735735735735737,3.1295221337104889e-14,407714.45840097504,26.822822822822825,7646575716583141,1.6061538720183634e+18,0.0012393524426237456,4396015112.5702944,2.9538468424589341e-14,1.3247628013601276e-06,1718379508363.3352,1.2937578007547768e+17,0.0012242901173094476,7.6390238147678441e-16,7.5708310055693205e-16,567775611451949.12,4745568490.7213478,3.6696904043498528e-27,4.8634581409198827e-19,1904491108888.7139,6.7574748606455954e-24,1.854679267448511e-17,3.4898370511526007e+24,1.612672167620423e+17,1.4799906218670975e-25,2038297945253.085,1.2395790911623576e-06,4.9091975742381495e+21,5.0438506239346061e+21,3.8690906836237135e-05,3.0668448022151503e-27,8.9737936362558349e-13,2.9838394126429515e-27,0.0011736789562725761,2.8476932932283091e-32,19118.305833100112,1.265007253607308e-25,1.0710355173924944e-09,5.9966662343845751e-29,1.0591611446950633e-09,5.8280283697066856e-29,2.9990332845895376e-11,7.16021913776109e+24,1.0358702529726083e-09,1.4883724407171953e-17,5.4279825605740801e-29,9.082346238137288e+23,15389387883551360,1.1392525136654469e-06,2.121293278060914e-14,9.9653386399616465e-10,952002580101840.38,6392403973.3659601,7.9657221674688945e+20,8.1555308958000166e+20,1.1094758134915048e-06,6.397468393729835e+19,777.62387612838063,9.5271592655314977e-31,780.86577067558051,0.033924205378973102,2.6422937361972136e-11,2.6257727264042787e-11,1.2450936875342044e-17,1.8849404967763899e-14,313697582.65921015,1.590336715587973e+23,2.5449189262757551e-11,21341224214462160,21315.490567265588,21382.539769331226,1.5840240495379712e-22,1.9981259598344309e+25,1.5485377149405065e-22,1.9848821366643888e+23,70106886934747.648,337524474.82278758,3.0084918717311143e-08,173059286400]}
},{}],92:[function(require,module,exports){
module.exports={"z":[296,104,274,148,267,280,251,277,189,184,155,291,81,53,214,260,266,192,118,60,260,256,67,82,145,225,117,82,88,95,208,297,129,58,290,236,175,263,235,300,53,275,201,200,194,217,252,295,214,82,270,265,276,266,88,87,98,228,248,166,65,91,147,71,125,159,234,50,76,119,248,102,246,134,183,244,113,226,67,98,207,121,56,261,65,146,82,246,163,297,218,156,264,297,175,144,62,123,128,129,211,186,247,209,122,111,174,109,255,218,199,123,184,113,133,97,153,252,249,211,136,197,166,64,142,300,220,195,192,216,213,163,173,172,150,299,169,222,66,166,153,223,293,272,245,292,232,223,242,80,239,186,261,60,243,201,295,134,77,143,149,90,173,199,114,119,59,109,294,146,232,166,87,139,87,168,226,105,145,290,69,157,153,153,85,124,250,158,283,284,51,200,213,287,220,124,113,199,261,155,123,250,56,234,73,152,250,96,228,96,246,207,206,232,257,227,58,250,151,186,112,71,170,172,271,155,120,175,200,137,56,236,88,144,259,155,98,289,258,249,134,168,218,175,63,142,234,185,175,149,286,157,122,140,144,292,78,97,292,247,158,272,71,228,229,253,177,215,132,103,239,102,259,143,113,140,184,185,159,269,89,82,200,266,285,80,77,204,275,153,188,165,157,188,88,261,112,58,162,67,183,181,139,170,244,197,271,240,234,283,152,131,201,185,210,161,81,81,174,170,127,177,195,55,286,213,157,137,58,76,283,184,282,103,139,217,115,174,247,272,178,148,191,167,221,93,73,75,269,164,286,282,74,294,262,51,278,120,52,79,181,223,213,61,146,281,212,266,241,263,194,166,208,155,119,130,260,190,157,64,208,194,259,206,117,66,150,97,189,81,161,233,72,176,236,98,58,176,157,251,59,173,294,150,181,225,278,62,146,116,271,241,114,81,278,156,274,163,150,280,206,200,192,92,274,284,103,203,50,184,271,54,109,215,111,120,210,123,126,298,257,190,271,60,287,183,148,158,251,172,89,188,206,95,225,289,71,77,183,155,273,245,116,193,108,244,260,151,174,281,88,181,107,192,215,112,191,228,123,83,206,93,229,141,120,193,153,214,140,281,246,268,84,205,276,235,122,148,175,262,246,196,219,243,87,57,224,259,82,183,287,177,272,169,179,64,220,115,295,103,81,55,238,110,257,106,246,67,97,262,157,266,53,238,131,112,83,110,163,96,193,280,248,158,155,87,183,64,282,124,275,187,186,271,276,109,63,79,252,278,134,235,107,157,256,81,137,50,91,140,57,195,289,124,220,226,266,261,285,52,220,177,280,82,114,267,272,270,280,289,125,94,68,80,242,219,71,150,232,52,162,139,213,285,92,292,183,231,209,98,53,214,168,283,272,79,78,191,161,281,215,64,123,136,288,204,224,233,101,98,189,293,270,168,190,249,238,112,274,79,261,109,82,210,97,111,88,58,57,197,52,159,199,217,202,190,280,112,234,77,125,226,174,208,114,167,233,219,79,231,237,204,253,78,237,180,134,208,196,122,167,67,71,215,258,73,222,125,117,183,293,143,96,287,125,103,153,254,109,148,98,111,227,123,95,150,181,176,124,104,166,201,282,260,104,94,50,145,277,85,220,272,179,136,181,70,75,268,300,103,140,140,206,64,148,238,51,56,186,290,177,240,111,50,61,207,261,283,62,129,129,173,246,56,294,231,197,168,245,234,232,191,213,267,216,300,285,280,184,245,150,159,218,60,160,277,83,295,160,94,187,206,149,204,149,108,238,273,181,217,173,178,72,79,112,114,162,96,210,56,228,91,299,192,283,179,73,165,289,228,90,164,293,285,199,103,110,83,67,266,125,99,254,273,69,57,138,177,83,209,89,200,65,67,226,87,71,274,204,289,93,72,213,282,175,193,121,103,258,75,255,78,285,263,50,278,210,242,51,143,76,88,76,178,142,249,110,96,136,160,112,92,147,259,155,170,210,173,247,228,117,77,261,283,235,212,257,220,95,175,66,245,203,166,226,83,78,253,74,215,200,211,253,192,254,250,72,115,233,141,276,74,163,52,67,129,110,248,233,183,60,214,156,229,185,204,289,126,102,64,79,212,212,125,77,90,296,216,112,201,202,79,254,296,258,183,172,76,240,90,279,290,276,204,103,264,187,231,246,220,98,275,237,62,169,154,196,202,115,195,71,254,124,282,280,258,168,254,117,241,241,287,243,196,55,88,270,157,250,218,131,254,217,183,124,89,283,163,120,290],"delta":[92,64,237,194,169,203,214,220,292,219,128,118,69,139,248,283,141,187,196,219,96,90,69,217,88,150,257,235,125,105,146,65,213,99,255,218,242,51,143,103,97,151,212,234,50,245,121,284,210,282,198,271,131,299,298,60,80,124,234,99,89,201,159,60,258,270,140,206,69,182,189,154,118,131,83,57,225,103,171,228,95,63,75,139,100,151,83,154,131,200,288,230,183,262,112,111,159,102,217,72,187,290,202,164,266,170,145,161,237,70,89,88,64,245,135,209,255,257,144,162,294,109,201,289,134,217,282,257,275,112,263,138,114,220,121,171,245,119,226,292,173,206,292,215,169,283,299,71,173,57,176,57,242,239,147,164,163,52,83,240,240,62,191,68,212,208,250,61,105,125,265,91,277,296,123,175,232,241,135,211,118,234,92,198,216,205,184,56,258,144,117,54,94,212,158,161,169,171,247,109,82,189,62,240,207,211,57,80,84,68,224,156,179,61,186,227,252,225,249,213,175,95,119,125,80,179,272,54,293,273,286,123,210,79,72,146,68,161,95,82,57,300,231,102,86,286,209,175,248,249,192,81,144,145,256,245,126,112,130,184,247,187,176,73,115,144,233,217,90,70,281,207,105,117,70,70,68,73,243,67,255,240,235,74,240,168,291,149,167,224,247,191,156,79,286,267,50,178,296,64,193,217,136,208,189,85,125,215,89,257,216,107,221,65,248,115,137,287,112,185,136,182,132,291,282,295,239,71,122,175,202,234,242,263,262,97,276,118,199,276,67,204,104,148,268,159,153,120,215,78,246,97,112,237,189,204,107,79,51,169,242,73,55,86,148,266,113,284,101,102,216,148,279,222,51,119,237,69,250,85,277,138,294,144,80,162,180,187,256,225,209,233,289,176,287,149,292,276,66,293,159,282,130,94,83,228,83,71,252,264,181,125,287,110,298,195,152,185,143,183,106,269,161,278,116,174,165,283,158,195,115,172,83,178,155,264,177,108,131,277,221,95,161,135,159,238,249,177,254,299,238,195,248,113,175,219,189,123,208,256,74,68,111,291,204,218,126,210,242,72,117,208,59,149,124,299,189,274,293,243,222,59,230,116,190,128,183,298,269,295,148,299,164,223,102,119,240,153,187,285,139,118,225,217,77,138,51,298,199,70,215,53,195,133,278,225,209,233,181,66,115,288,62,189,233,136,91,104,120,60,115,212,187,227,185,286,247,293,268,273,247,217,293,119,95,215,283,167,61,104,110,294,52,55,218,129,277,300,193,254,89,95,176,194,192,58,97,297,131,238,229,130,188,52,85,264,145,240,149,71,194,59,54,204,194,190,283,207,76,237,233,93,293,159,202,204,230,146,125,126,165,259,62,135,146,59,140,235,122,176,254,260,163,123,252,103,248,66,121,265,67,253,63,185,210,100,156,234,277,92,154,262,88,225,185,126,285,134,215,80,149,86,115,85,262,214,287,102,144,204,66,177,95,159,194,254,96,203,123,91,165,183,137,250,129,200,165,288,109,105,56,158,215,263,89,147,251,199,152,221,132,87,237,281,237,59,93,64,79,109,93,77,207,179,261,131,178,268,91,73,229,76,277,80,104,73,268,229,103,65,260,145,265,147,181,127,169,220,273,114,66,242,177,209,205,51,234,77,107,190,55,166,84,299,243,101,293,119,147,231,299,270,131,217,84,212,146,65,191,83,209,277,185,163,129,241,89,256,88,82,84,221,228,201,166,166,78,269,225,89,95,161,251,256,179,220,187,267,102,147,246,90,182,130,193,173,155,241,231,162,68,289,199,86,266,162,162,219,213,223,126,172,202,78,120,143,250,224,249,78,289,172,161,53,164,69,200,179,261,246,57,277,97,283,286,159,287,247,163,252,253,251,283,277,218,60,143,209,151,276,160,244,220,257,166,271,289,258,139,122,135,256,274,69,186,280,238,92,81,287,163,185,68,250,216,61,226,221,280,156,215,266,223,137,264,112,167,86,165,55,252,193,257,194,97,74,56,223,64,279,85,260,93,173,207,208,57,80,168,176,220,104,78,210,109,185,122,208,93,129,131,133,251,141,125,135,244,135,188,296,189,204,233,246,244,300,276,215,84,253,249,88,97,235,57,248,81,188,83,292,82,172,284,177,118,106,286,293,210,157,269,147,142,60,109,59,97,133,186,206,114,294,126,252,53,113,197,95,291,189,263,294,51,209,209,139,140,264,78,155,185,135,154,288,179,169,272,99,87,145,159,121,64,227,145,186,231,256,73,250],"expected":[1.1208003980556012e-233,6.5860547676781165e-137,0,0,0,0,0,0,0,0,2.3247626661147878e-299,1.3143975027692601e-300,1.8789947671603346e-142,4.3623970502770777e-287,0,0,0,0,0,0,2.1747899529842547e-239,1.383754826067054e-223,2.0232315964285085e-138,0,1.3348527454274127e-200,0,0,0,4.4526613989111745e-271,2.7575104532718398e-227,0,2.6810331179059691e-164,0,5.4245185597761691e-200,0,0,0,3.9808905303499911e-126,0,9.8831909343357942e-263,2.1176112734366063e-193,0,0,0,1.1884320380048761e-117,0,3.4703642164088976e-302,0,0,0,0,0,0,0,0,2.0618853639087125e-124,2.7461009477125089e-171,1.4893718919729887e-305,0,2.982566058489892e-231,6.3242862733362228e-181,0,0,1.8523023577590118e-120,0,0,0,0,4.469878813452123e-141,0,0,0,1.8239477551368185e-293,8.1783853031932597e-301,1.3732609070938553e-195,1.8836679307722834e-139,0,4.8415265920125604e-252,0,0,6.0787434456733232e-229,5.5235891752408477e-138,1.9633040161206266e-147,0,3.8600089675892447e-205,0,1.763535301929159e-173,0,8.1888007007341692e-309,0,0,0,0,0,7.3797008899414898e-265,2.9331791395550559e-255,0,1.7642957037145691e-228,0,4.8895788442596391e-160,0,0,0,0,0,0,0,0,0,8.7016420090931134e-169,7.9297688374715598e-213,9.3316068506853515e-196,5.7833186065530924e-150,0,3.2672107883128229e-310,0,0,0,0,0,0,6.499524987763912e-262,0,0,1.8790266340392227e-310,0,0,0,0,5.8497693594793595e-273,0,0,2.4515649757296823e-269,0,5.7172882027960307e-281,0,0,9.895050868288851e-292,0,0,0,0,0,0,0,0,0,7.4617030285682987e-172,0,2.4449514311264613e-116,0,1.7376444380793078e-133,0,0,0,0,0,3.6076798868729723e-115,6.3986603575988691e-172,0,0,1.913475572393351e-129,0,1.5458081786882986e-161,0,0,0,3.1028829165002157e-131,3.7427906784090205e-267,1.2080138423074518e-289,0,6.3229170833675286e-212,0,0,4.8077074064574573e-266,0,0,0,9.2657794711036521e-314,0,3.2343195949679272e-247,0,9.3221638506549044e-212,0,0,0,0,1.1633262078447229e-127,0,0,2.0227293928361833e-236,7.6221495483077851e-128,1.9791876435010101e-227,0,0,0,0,0,0,4.4854659896937397e-253,7.4469215019160824e-182,0,3.1981371088180837e-120,0,0,0,5.4067019153872193e-140,9.1866985312650433e-171,9.5896083742768195e-205,5.1536471578930557e-144,0,0,0,3.4969177846760381e-148,0,0,0,0,0,0,0,2.20847510353875e-196,5.9319235466675744e-281,3.2191426193379311e-296,5.3906092292439368e-200,0,0,4.3619689564369073e-125,0,0,0,1.7285848389537896e-304,0,3.4398435687819925e-179,2.0140496129978598e-178,0,1.7734945430266127e-144,0,1.4437904619318569e-236,1.8389475122268269e-202,1.5363854656337368e-126,0,0,2.3046058296250744e-240,1.2310636003661975e-173,0,0,0,0,0,0,2.5072624032363674e-186,0,0,0,0,2.2334896109970089e-269,4.1129517626868642e-244,0,0,0,0,0,2.1109669909596025e-177,7.2193973110031119e-283,0,0,0,1.6784276910377491e-202,4.5042101834110795e-150,0,0,3.010211193659173e-262,1.8296575457578086e-269,2.9835770556787286e-152,1.90817689451678e-157,1.4924931977113163e-159,1.010792790840218e-171,0,7.9326214821698309e-167,0,0,0,3.2122065471944281e-184,0,0,0,0,0,0,0,0,0,1.1185788728799353e-186,0,0,2.3225148896722013e-107,0,0,8.4174594590029932e-128,0,0,1.8832313759929491e-314,0,0,1.077893330253737e-202,1.0389617040513676e-315,0,4.429357752587139e-218,0,0,2.1702539244107638e-242,0,1.7232326460774859e-152,0,4.6672393709921031e-269,3.2914060996008942e-296,0,1.2129853186915322e-264,0,9.0569844409829396e-311,0,5.480719615881532e-319,0,0,0,0,3.156558192041104e-159,3.6311540505724615e-251,0,0,0,0,0,0,1.5230142714509339e-235,0,2.1039058305168233e-279,0,0,2.4901681396642834e-156,0,2.1926316242720433e-248,0,0,0,0,2.4886681622165383e-254,0,2.0445558923907135e-180,0,7.1908562974545713e-245,1.0843181121269179e-235,0,0,0,3.8223118419339901e-270,2.8132416156249201e-174,1.6133175133486488e-96,0,0,8.6033702623870622e-177,1.3830558010626517e-131,7.0817080088754611e-173,0,0,9.7548312176435537e-275,0,2.3386786017508996e-249,3.8081188441288291e-255,0,0,0,0,1.0973181593437405e-110,9.5786160242748057e-271,0,8.9575318783523158e-163,0,7.7557006823070443e-172,0,0,0,0,6.6791872525929917e-176,0,0,0,0,0,0,0,0,0,0,0,0,0,6.6675703103467562e-151,0,0,0,0,6.606854826187396e-216,2.9164389854983342e-195,0,1.9389049070091413e-208,4.5390639490988951e-141,0,0,0,1.6204049207282409e-310,0,7.3932925014172294e-234,0,0,0,0,0,0,4.0348976126087033e-256,0,0,0,7.6438768583506674e-293,0,0,0,0,0,8.5643111386131713e-290,0,7.1643246993914083e-181,0,0,0,0,1.2727889515232225e-242,2.1947285670741429e-298,0,0,4.7696222227587176e-226,0,1.0433742880860812e-281,0,0,0,0,0,0,0,0,0,9.3804163008647792e-246,0,0,0,4.7815276552460292e-262,0,0,5.8610879112976536e-185,6.692047356396437e-167,1.0277350135081483e-247,0,0,0,1.8937733831353317e-316,0,0,1.0984190361645533e-180,1.589491938152343e-252,0,2.1133839295923585e-126,0,4.8756120142065103e-303,0,0,0,0,0,0,1.441765574286942e-123,0,1.5693324226508576e-266,0,1.6775966713225881e-308,0,0,0,0,0,0,0,0,5.8259963491128377e-257,4.2058685303438488e-294,0,0,0,0,0,3.9394494681274275e-284,0,0,1.2086946880888746e-161,5.3491560700425592e-287,6.8023062683264528e-123,0,0,3.236389100770484e-164,0,5.8667530069107748e-123,0,2.7420592158988274e-315,0,0,0,0,0,3.806088053443202e-141,2.7612748817712082e-245,0,2.9207932540104308e-151,0,0,1.1030604545238598e-303,8.8704311680230618e-225,7.5005341836736119e-215,9.8965570178823026e-263,1.471700994641505e-148,4.1381005263241432e-268,0,0,0,0,0,0,0,0,0,0,0,0,4.2070415313416392e-278,2.3893496682856543e-219,0,0,0,7.9227161615893866e-153,1.8800078970877636e-233,1.8180447586526019e-277,0,1.3835008262962597e-121,8.9553671362078133e-137,0,4.4454512891094171e-288,0,0,0,0,1.3273187632368796e-200,2.6490528849639148e-233,0,0,0,1.0345716412256264e-118,3.7768432606303315e-220,0,2.9435673303424072e-286,0,0,5.8068172463253332e-314,0,1.0802000857590505e-113,4.0509246667305674e-206,0,0,0,0,1.5707461371731833e-137,0,3.7147566008871362e-137,5.7962351821720881e-135,0,0,0,0,0,8.8430829544781479e-191,0,0,1.5085961158839424e-199,0,0,0,0,0,0,7.4321474411565081e-309,4.428117763205039e-257,0,0,1.2886573633382186e-148,0,4.5454039417394682e-322,1.4202086120443565e-148,0,0,8.537669286620924e-297,0,0,0,0,1.9526366536193351e-312,0,3.1143014255256915e-217,0,1.1284824065794546e-155,1.0003635838505719e-283,0,4.57821243916779e-161,0,2.3953943420947527e-138,0,0,7.7110406750202151e-241,0,0,0,1.8880180912140606e-198,0,0,2.8661556518611222e-220,0,0,1.592141070241536e-314,0,5.1153732155398471e-301,0,6.11042630313047e-166,0,9.965864842333098e-188,1.1411391093034074e-245,1.1414033947877201e-204,0,0,0,1.3753313282838776e-206,9.0152982329407729e-301,0,3.9071619787840719e-127,0,1.3195587719835127e-227,0,0,0,4.8970806175574856e-242,0,4.0175216207915626e-304,1.2539731261433623e-189,0,0,0,0,9.404505734672057e-290,0,0,0,7.8975805602006052e-231,6.7097039843731164e-258,2.4531553438793204e-136,0,0,0,1.690073484406486e-218,0,0,0,0,0,2.6388215082816402e-312,2.7131188112612391e-177,0,0,0,7.2282211090565406e-119,2.4431471301301222e-226,5.587163956416251e-141,1.3091207015082264e-173,3.7704660056612571e-259,6.5885459547614057e-236,2.5963939257166477e-174,0,0,0,9.9239978838012333e-291,0,0,3.3592305973640185e-199,7.5628350091859303e-166,0,2.0712984103123179e-165,0,3.0839191323734878e-177,5.4874458020109611e-225,3.3992833072962399e-166,0,0,4.2676179263892235e-231,3.9202706950464978e-139,0,0,0,0,0,5.0649879455889615e-278,0,0,0,1.6725472833543437e-244,3.4099636580455565e-159,0,0,0,0,2.55807426414454e-101,0,4.8762324049224158e-192,3.6917281878447642e-273,0,7.2343328086726523e-123,0,1.3070155727078663e-201,0,0,6.7331367723600868e-249,0,1.9759629974529346e-243,0,0,0,0,1.620062974646244e-293,0,1.4991975854789352e-168,0,0,4.5713657937432139e-163,0,1.7270106800544615e-185,0,0,0,0,0,0,1.6686952923071848e-212,0,4.5326629981563898e-217,1.4887294831140878e-200,2.7540503979467365e-205,0,0,0,0,0,2.0521446590629654e-196,0,0,1.3611600595064233e-219,2.70772738778172e-218,0,0,0,0,0,0,0,2.9476422175938178e-237,0,0,2.0872283117549211e-216,0,6.2899050242639611e-316,0,0,0,0,0,0,5.2473235845089283e-158,0,0,3.4449431589489745e-179,0,0,0,0,0,0,1.1986317698726789e-310,0,0,7.4933306833193064e-185,1.2875463493398322e-304,0,0,0,0,8.2659343619881305e-190,0,0,0,8.1583772143617808e-133,0,7.7472415154670557e-148,0,0,0,0,4.1420548455287073e-125,0,4.186074590723971e-241,0,0,0,0,0,0,0,0,0,0,0,0,2.0618853639087125e-124,1.1880220492876623e-305,0,0,0,0,0,0,0,0,0,0,0,0,6.5114289958569817e-259,0,0,0,2.8019287113080253e-171,0,0,0,9.4863191409766334e-227,3.5901320322026343e-158,0,0,0,6.4366254913710567e-139,0,0,7.4316544497293659e-150,0,0,0,0,0,0,0,0,0,9.0580498517197988e-264,0,3.7528281842998845e-201,0,4.8611274860352608e-133,0,0,0,0,2.4252063398003429e-238,7.3344568758632593e-178,4.0809082684815441e-138,0,5.8672781611571266e-135,0,1.4435666594361211e-172,0,2.4586113978449998e-223,0,0,0,7.2848601550603425e-116,6.588960047774051e-198,0,0,0,5.1223638132599389e-252,7.2407399756998604e-193,0,9.9388674747729021e-272,0,1.2413139769992812e-257,0,5.5892552635448319e-228,5.4558407606623602e-298,0,7.9824349349487146e-284,0,4.3693880711909837e-291,2.9440893641989208e-262,5.5981117518107065e-309,0,0,0,0,0,0,0,0,0,0,0,0,2.2864567969115038e-181,0,0,2.1886850990807802e-212,9.8732928330631375e-235,0,1.2677548841273843e-115,0,2.8317934263979183e-205,0,1.3263469860012697e-181,0,4.2145458869955915e-196,0,0,0,1.8023179270965081e-295,9.1956801976930755e-252,0,0,0,0,0,0,0,9.4365571635303478e-143,4.3058622296627863e-239,3.1493487185331534e-146,2.0386424457692663e-230,0,0,0,4.3080160653748315e-249,0,2.4154051100543844e-312,0,5.0047749466481179e-122,1.5651479970551823e-262,0,4.1119403897594991e-228,0,0,0,0,1.8903501500783381e-111,0,0,0,0,0,2.5527853679410415e-171,0,0,0,0,0,0,0,0,2.2296018619619049e-229,3.3283410280767277e-215,0,0,1.5860456551258453e-302,5.9744024174661566e-154,0,0,0,0,0,1.5703200335389665e-160,0]}
},{}],93:[function(require,module,exports){
module.exports={"z":[42.936352132586762,198.62960125808604,78.778926618397236,191.75323746865615,26.957715227268636,178.69660904956982,129.38980199443176,297.87917281338014,77.927551642991602,247.77175921131857,89.969059605151415,184.86416486417875,128.0326635192614,222.46436126576737,36.642971495632082,156.66889335378073,149.02500916831195,216.41358021600172,212.21576236118563,37.738253940828145,73.828437955351546,205.07781488099135,235.73595338617451,215.66888625943102,23.15278197824955,202.75174000067636,118.77114499313757,200.23483065911569,2.0148424091748893,142.37376951868646,66.982390977907926,18.148251664591953,1.3888708048034459,113.45447830134071,57.564720305381343,187.78556128335185,43.602733459556475,35.175174958072603,81.154722757870331,160.56718959379941,53.292726773303002,196.72430632961914,42.456042324192822,287.05170960840769,180.06679745996371,286.68496072548442,270.41631242702715,269.25494240317494,281.87454909458756,271.94015549682081,67.134154160739854,44.372682631248608,145.31874214555137,113.52618823666126,113.42732325568795,204.96739017264917,157.61023063049652,160.4611915810965,80.196904085809365,214.95219743391499,21.43880847748369,247.37294468376786,131.46179727092385,2.2735453748609871,52.982058465015143,204.62783768749796,8.806025636382401,222.61928356951103,286.44880246184766,275.4937303760089,129.74835856305435,174.49112497130409,288.50601365952753,7.2477819891646504,228.96192982653156,251.31504555791616,3.1972504977602512,179.52276118146256,204.33155323355459,83.155842033447698,212.07927676755935,95.236275915056467,193.893508505309,2.746075902832672,166.14064424438402,145.07637563394383,66.214509829878807,51.374855997040868,231.93749731313437,113.15647035511211,69.180469353450462,154.47706255945377,111.88854984310456,292.81471596914344,267.38771746098064,51.168434571474791,257.0566943148151,260.21888781432062,121.3276301228907,218.35365415643901,96.087716469075531,123.88207563245669,182.98199419397861,204.35884096799418,273.14837273792364,109.65010901447386,272.8203590256162,89.369968827581033,177.88672786275856,138.85672505991533,100.43885050853714,207.41172271594405,256.06602556095459,46.444947462296113,133.27697110315785,23.715686031384394,271.40228820266202,177.63900277088396,10.920642834622413,145.5019818097353,160.19551716325805,242.65166845102794,215.23270570626482,289.78821457596496,54.611251697642729,32.087452726904303,101.62334506912157,209.76514812465757,57.126172587042674,142.71201252005994,97.25622934056446,33.367301515303552,121.75315777142532,66.442260873503983,165.02132326923311,127.82634902442805,15.572839168598875,57.556760509731248,166.26690848520957,33.253455998143181,83.168611066648737,116.34749094606377,73.209021149203181,25.995002037612721,73.700408522039652,166.6757858491037,47.093677421333268,6.1843269614037126,286.96848993026651,298.96091090794653,280.76275023701601,299.75867947423831,245.79561682464555,193.22385548776947,218.75029212841764,181.55490011582151,53.567705278750509,217.74359385902062,108.75092228711583,232.95770881464705,57.448203538777307,59.944379596039653,1.3583223095629364,31.232790954178199,95.609435629565269,69.185976286185905,210.18547932943329,115.9414913833607,187.95129821053706,211.45457607950084,163.37559134699404,101.87942711799406,132.27212337590754,283.90389460278675,86.940752154681832,242.21979311294854,150.9960718578659,161.8770204090979,228.7023093868047,242.48620483768173,228.960006326437,36.08297162828967,173.24071589834057,90.658049402758479,224.55118858674541,114.11291166744195,194.01481745345518,221.78620307799429,37.842635461594909,238.63610741659068,151.81496042734943,237.12419039546512,104.83113164710812,125.32275694492273,28.552156110992655,268.60537140886299,45.206991433864459,205.91465966845863,60.252740539610386,11.635915593709797,202.00880023720674,262.19341531023383,130.02184261404909,173.12958660279401,208.62677064491436,22.581248489674181,77.778583278646693,200.60985901602544,3.9178354030009359,244.96413855371065,160.15263884444721,135.74585671094246,84.538197573972866,239.51464885473251,283.92281688703224,111.79019535891712,272.02653492242098,237.76942547387443,118.41268874169327,182.75870326184668,8.4317169038113207,5.6546638163272291,201.75960338581353,100.13456984958611,251.31401941273361,188.95878098672256,291.47839285596274,62.880900866119191,18.02293253550306,159.94938141293824,135.64682068256661,3.8050805653911084,175.15862071700394,158.42915512202308,206.30470712902024,126.75320799369365,216.11039225547574,151.16407145606354,195.36218325328082,249.42043931689113,218.34745175624266,142.61730767367408,112.78045226237737,98.816519569605589,174.8930419520475,256.44699685787782,35.719435053179041,289.2330374517478,18.238654985558242,112.09389353776351,293.94980129110627,101.30494537646882,86.162293218076229,150.41768547380343,178.89731483254582,181.7805204114411,288.68614885164425,166.18818289134651,56.547701758332551,128.51899040909484,58.718904806766659,154.67841020529158,103.15158643107861,153.5094886161387,279.93647223873995,10.77235761564225,117.80959432711825,51.283003263408318,82.691795164253563,240.01896127103828,46.432176270987839,250.15013039042242,119.73554373416118,192.87887745141052,113.04201882751659,44.280508826952428,40.203298187348992,26.922636516857892,131.07717466540635,223.28855592478067,28.362438017735258,116.22285572811961,184.77346031321213,261.74264943297021,4.2827480151318014,247.0097461657133,172.40485590393655,59.011700436705723,237.12922734813765,84.116115308832377,71.374663971364498,162.16132841212675,134.95789611549117,13.066422126721591,171.23809590283781,233.83463960862719,19.359032667474821,24.979982037097216,149.39037540066056,199.00891304016113,193.05225435667671,134.30191101762466,67.158453752053902,174.99441883061081,251.27987662469968,98.786387867527083,291.35149517585523,85.105212334077805,254.06549496133812,9.0660954497288913,152.29383773985319,102.32081817742437,84.383805955760181,276.83477626321837,224.23854936962016,60.636507560033351,71.842183513566852,255.08922285493463,287.24623791384511,183.52122903196141,186.45775044127367,243.65537446993403,180.47838143841363,112.95732376980595,52.608746151439846,17.062982349656522,28.013674034737051,277.81257023662329,77.323398502776399,265.04632893018425,257.71259016450495,10.975877709686756,273.40904779592529,288.84927377291024,210.19049630220979,201.06769234640524,217.82952398061752,24.001610317500308,69.73593872715719,61.721521452534944,173.23998520500027,35.085830501979217,243.37780338153243,152.62619384238496,121.74916805769317,112.34052335540764,296.54334105248563,213.15087767550722,27.909645399311557,141.59952042275108,96.961369446245953,67.962952967500314,153.91127130691893,254.31312084989622,19.121302884072065,247.11426810268313,217.98068943736143,101.27290430641733,167.41016990086064,24.121623148210347,159.27861035661772,122.19541520648636,249.16474858159199,92.915561703499407,257.76895212847739,136.32504437933676,236.91964728897437,124.63185882358812,96.032083318801597,106.97646121750586,136.21002951613627,9.591007417300716,225.91616495931521,24.368440651567653,33.848650835221633,162.47841618442908,33.812967715552077,114.02567825792357,81.695216886233538,50.849504471756518,157.86656636139378,157.39019175712019,291.82267236174084,206.91315907961689,213.41219668486156,207.16138777625747,94.246124062687159,88.280042734928429,88.145681554218754,145.20290469541214,255.25684255664237,243.35480248345993,273.58257924951613,296.22863395093009,192.1435696601402,16.544016733299941,77.3557191521395,57.447094967821613,27.511086363811046,180.50300001190044,251.6384205231443,133.32291630120017,175.83086708327755,179.44914981443435,284.48451233049855,109.18037664657459,19.247650037985295,66.328950010007247,175.80775076127611,129.95323506230488,86.247316586552188,147.96815690444782,248.49191841250286,214.10561937396415,58.104947594227269,45.614230167819187,133.31645903550088,30.540281214052811,118.63003965769894,166.56038085580803,248.14561940566637,147.82082361960784,203.38445743056946,93.743910858174786,63.07330712559633,180.51567645533942,96.113313779002056,183.3752066232264,41.009485460352153,131.34621169278398,201.76740403845906,139.1548619356472,171.72633181256242,257.19535402744077,51.760352914454415,267.49908470525406,45.149076119996607,280.6787513429299,143.3478356054984,40.688688458641991,272.52262237435207,41.326883095083758,166.10033261124045,163.69745542830788,10.849028273718432,170.07018597866409,17.105014690430835,183.27383447857574,241.71390583529137,130.6226492957212,135.96108168247156,142.91345554031432,115.41122201899998,168.23191928514279,237.10346616129391,251.78191766794771,109.92177378106862,289.38396113086492,160.17262897407636,233.1739295090083,213.78535646898672,58.638112163869664,261.57147943601012,75.975345728686079,99.278192451223731,268.85880803596228,195.38528968975879,90.920049051288515,292.47600695583969,287.20335548766889,23.714241352630779,190.88115656818263,176.51873027929105,269.59230608027428,124.75206226389855,114.92422005929984,93.431791048729792,240.90009236824699,79.886378560680896,187.21244924375787,227.87111494177952,55.45110426004976,298.56957777240314,257.10133002907969,56.784861244494095,103.35771129094064,234.56243600323796,55.025111365364864,59.54359764046967,48.958128499565646,297.7153323055245,222.44618150964379,240.87620963971131,47.487425757339224,127.84378687897697,48.88091810583137,218.93029595445842,117.95301593816839,150.00772077194415,176.50451273843646,242.88808916835114,191.63304885663092,107.59617291856557,19.995212676003575,22.89978818083182,111.07350249565206,177.70644605858251,118.92676561861299,273.14616095647216,208.38033477845602,58.93601331859827,215.10656837606803,130.27796879969537,192.39722126256675,224.99875851604156,223.63652300927788,12.71616097423248,231.43479588907212,283.95117177069187,25.313201452139765,229.3383239172399,131.47123989509419,168.08734496636316,195.08162576216273,55.969039971940219,95.192909655161202,149.88669571932405,184.02846596203744,155.83583423448727,275.5449588294141,298.27865906921215,290.58875087997876,256.60065297922119,204.74052123795263,288.75877967220731,62.7105216414202,204.00336046796292,201.60657847602852,121.64691547490656,195.39961374364793,280.55874693579972,202.62595938472077,144.36588050657883,98.445295816520229,70.305692543042824,146.57767769135535,119.49078471702524,235.27769706677645,211.81816354417242,232.3109070896171,168.00915040611289,172.2045649648644,227.232579811709,183.11778856674209,298.64883523527533,283.9501818260178,288.76699001714587,135.53173049446195,160.9850649421569,59.310458638472483,289.19716706406325,279.62859958433546,35.572137551149353,240.71162493294105,16.383039894513786,9.0239465015474707,92.000335366232321,1.7583849888760597,174.47735708253458,194.92242065980099,159.75837089191191,133.0409218587447,270.46121978433803,195.68440878274851,162.62457699049264,280.7994795513805,130.16220444673672,39.641591326799244,163.25742961536162,35.178782826056704,214.0120260224212,188.36262439959683,5.9857404397334903,26.681171049829572,240.47534393565729,30.170546346111223,43.610288087977096,243.21539704035968,144.06386620830745,198.04694098629989,77.793770018499345,212.71165391267277,111.35841372446157,269.42897899309173,198.86770961526781,43.46480332640931,51.713033907115459,177.59356444957666,84.356421454576775,247.98317073774524,60.268315738765523,270.01937099732459,59.326388184912503,298.47207260783762,98.725055504124612,7.5339571030344814,264.22102131438442,148.25074078864418,141.85945601575077,293.71395957306959,121.78684206609614,94.996672964189202,54.590210917871445,165.94053744059056,290.70857358840294,176.00418300461024,122.82926606037654,117.14098973199725,253.50173128535971,204.51243979507126,184.98220323561691,155.96630184166133,113.60671313502826,70.722225061384961,263.27734263055027,132.28811689978465,235.67087489669211,181.95858597871847,140.02133071306162,159.57318572886288,244.37910123122856,228.93607911304571,269.63479677517898,248.34359205025248,129.34232621104456,9.0437506162561476,100.96449741604738,32.470633368706331,179.39748403104022,233.149479476735,270.69525175541639,7.4217424187809229,210.91786748007871,221.68674120632932,113.85907662590034,67.365916220704094,220.75182193168439,147.91483425162733,286.27673364803195,84.311995146330446,163.30111931287684,231.04033781425096,162.49164315406233,209.94806755357422,94.02178067038767,295.97784177097492,22.29913764866069,120.23229490849189,55.412159613799304,253.29759606113657,28.803688800195232,148.62842466169968,139.58328513754532,236.33613310288638,3.7904202644713223,168.70906837144867,274.59274712880142,280.35756922350265,193.17977802711539,275.24695833213627,1.4242969008628279,230.58006255072542,10.085196639876813,72.439700404414907,63.332595634507015,218.58010908262804,137.03487738547847,90.43091564741917,39.052543405676261,253.49704011715949,3.58565898030065,6.815681790234521,218.39680182095617,43.249154669698328,106.88082379032858,156.9297421046067,234.3533376196865,213.83385568251833,131.56033512460999,107.56329721794464,131.52988137723878,12.224548462079838,15.714740915223956,77.275450302753597,15.839938633376732,18.417441499885172,28.238951817853376,169.73812644183636,178.61707152007148,212.78006180468947,73.084133015014231,43.402029416989535,252.56936170998961,83.554330617189407,257.30661719525233,183.04347839066759,289.12004772853106,86.146314383251593,147.18103657849133,155.93047224916518,66.872720980551094,46.978255859343335,68.636383438482881,248.47793526994064,161.49955297331326,162.40607280982658,228.87080200808123,197.46120485477149,104.92257949197665,78.939331001834944,138.9082960258238,248.26393624255434,192.15780425700359,245.82416099519469,275.28347747470252,66.081270864931867,49.31019905093126,232.62702963105403,214.9749871159438,8.092290841974318,173.74392336374149,102.60572112188675,130.55639540357515,80.453785191290081,265.38859248533845,86.257838473189622,118.52247451106086,178.33720824331976,54.513570751762018,106.89008520310745,190.36674170382321,65.784999846946448,187.57616605563089,201.49248616886325,99.054539374774322,19.669898407766595,241.08662885450758,111.84429625305347,299.84387890249491,112.35197183582932,294.31247002864257,293.40138085256331,38.984045360470191,226.2848541198764,70.439802895998582,222.67267827526666,8.0661073622759432,294.5889161862433,182.62235007854179,264.49260685755871,34.131987411528826,103.97061235364527,122.83039363659918,120.43160599726252,265.33896590443328,110.93146548443474,164.89170066546649,11.53590911324136,111.33192038233392,174.79165191599168,63.295449318131432,135.88920306670479,132.8420386321377,225.83916397159919,286.90265081240796,21.149185543647036,38.083748878678307,223.93970428663306,141.75821147789247,86.564333419781178,257.21200298937038,74.694308728212491,13.973750418052077,153.65895612980239,207.79591808584519,185.36021249555051,293.7166548401583,25.560873078648001,85.69710115971975,225.53382528317161,41.000369754619896,228.22668984159827,205.89862695056945,86.64194563915953,272.92691188072786,58.387999300379306,183.64982569939457,276.42413217527792,270.09485741145909,53.715223186183721,58.836690749274567,211.43037652689964,226.57295092381537,83.136432643514127,104.53195407637395,206.23295444925316,126.16899847937748,297.23988422541879,47.560229226481169,250.59894464258105,245.88117470755242,181.9948405791074,187.85213554999791,25.300349714700133,221.82956585707143,234.01167081599124,241.72861229185946,267.66839079372585,21.099574974505231,111.10730458120815,285.28630611486733,26.647620000876486,149.77552521089092,277.40318599599414,226.78862603474408,191.58516748831607,222.97911474411376,252.7396291308105,249.50774255162105,98.299199127126485,47.794052139623091,90.286255491664633,137.73530675261281,140.63209392689168,185.81204851553775,79.176745214266703,279.72282171086408,298.15590801811777,250.69138187519275,197.23518015770242,268.73163126385771,288.41109314165078,175.17303777835332,269.75763540365733,175.24129543825984,105.39154245983809,256.62285600416362,41.907392151653767,11.424845605157316,14.623268712777644,265.74060797016136,162.91249488038011,122.91151278023608,41.603149224771187,11.878228013403714,140.55371815524995,224.0982354329899,188.2131497154478,47.293802255764604,251.93463556957431,44.028589627705514,274.59039151994511,182.18175682262518,120.04511335701682,77.089772255858406,212.72100345976651,97.922106993151829,275.34077278524637,121.1354852032382,38.213184910593554,122.50562293292023,275.5636497088708,116.47115202224813,58.222276714164764,183.33074543718249,98.410174779361114,50.900326574454084,186.54194607120007,57.239528422709554,216.00370504078455,29.294031579513103,274.91615293407813,97.632696319604293,75.990757747087628,231.10948252584785,97.49014164111577,71.00128211104311,112.8096133035142,222.36927638365887,67.563832824118435,208.15270625962876,126.89648508117534,247.39938469976187,148.20810835482553,248.56528695765883,144.672580125276,88.717012041481212,171.62743306765333,93.501403443049639,249.48771455069073,157.38591062929481,67.731493738712743,98.264398882165551,208.29398835101165,249.72090896731243,243.56561287259683,243.27814080589451,247.33824050938711,167.54248164547607,39.500817713327706,79.626246371073648,46.740144578274339,204.48929472151212,128.64060935890302,70.862291094148532,97.077810331014916,137.47118498850614,132.54310040245764,115.9855002022814,253.76037152670324,162.04182962863706,120.47435127920471,297.51941362209618,83.721206398447976,226.81089958106168,136.28128423006274,294.15600091894157,89.84095352422446,71.200010023545474,181.47874580230564,159.03916620067321,293.80756886675954,16.379381345817819,74.863963664276525,227.30576700624079,29.251292911125347,180.99195053358562,159.90953460824676,257.29344306443818,195.67164719849825,296.49486536928453,80.40354856220074,278.91585912043229,30.973264705389738,123.44496416929178,284.52047649142332,1.102097547147423,85.651818013284355,162.72261910606176,182.10619877325371,63.111456196056679,36.981038715690374,66.565790722845122,298.06650320463814,98.416072538355365,106.35514193540439,29.688874980900437,210.2986435808707,224.51256431499496,204.92863808525726,224.80417702370323,195.0439581584651,163.44652930647135,160.17903312249109,102.10156241850927,86.883347894530743,249.86776649393141,1.1878022509627044,166.2190814872738,87.906006759265438,287.30539156356826,186.583530430682,267.95716315484606,180.86664518853649,107.59458176698536,154.85596137726679,164.37416552612558,196.02880204166286,104.65784190152772,297.75762473302893,187.21803338103928,166.74410463217646,239.19078051834367,99.911566433031112,224.01659535011277,197.44591452577151,38.535333444364369,226.48375676944852,246.8958079891745,33.2956996941939,8.5199998496100307,48.778504013083875,124.91423476370983,244.746615546057,219.69083334202878,178.47456257953309,234.63082795310766,11.558020174968988,110.81848905794322,17.544617235893384],"delta":[7.4741917989216745e-17,3.3173806408187372e-17,8.9334451548522335e-17,7.7559430254157636e-17,2.5017735657282175e-17,3.1844801456667476e-17,1.3830100633669644e-17,6.560596977057867e-17,2.3281720051309092e-17,7.8713052915409204e-17,3.5651377306785428e-17,9.7689228544943034e-17,2.9421376963146027e-17,5.250363064045086e-17,9.2821312819840383e-17,8.0161808195989562e-18,6.0800614093895999e-18,8.5654386352980511e-17,5.9674008718458934e-17,3.5148405210115012e-17,1.7126991190947592e-17,2.8811352251097556e-17,8.4002170908963302e-17,5.5212937524775036e-17,1.7588532267371192e-17,3.6097810084465886e-17,5.0717860943637786e-17,6.0445660931756716e-17,9.9933618300361554e-17,2.0627316034631804e-17,3.6185308310668912e-17,3.6454607326071703e-17,5.6606935015879573e-18,2.2293751951539889e-17,2.2152398098958657e-17,3.0508362505119289e-17,4.0386073261033738e-17,3.5310939000453795e-17,3.4033150285249572e-17,8.5771971619687986e-18,2.3730650621466337e-17,1.9198066146811471e-17,9.367589735379443e-17,3.6569149423390621e-17,6.8635689609684053e-17,4.8273771984735499e-17,9.6249265899648884e-17,7.4198505248641599e-17,4.4359344044933093e-17,8.2854643997270615e-17,9.4093329157214605e-17,3.1838036097818981e-17,1.5775975971482694e-18,7.9063301378162577e-17,6.1420395500492306e-17,9.5882228199858214e-17,8.0306499921483916e-17,6.5314019736833871e-18,2.4065171886701136e-17,8.9928582003340124e-18,9.331439936277457e-17,1.2214923803461714e-17,7.6563014866085726e-17,5.765465897112153e-17,8.2818504112074145e-17,5.302843287587165e-17,5.7772895260248328e-17,9.53739113532938e-17,7.9465585259487851e-17,2.205490851844661e-17,3.3575078430352729e-17,7.2670739122899254e-17,2.3122735466808081e-17,7.3270215218188243e-17,3.1926248235860835e-17,9.3214599580969647e-18,5.8867824742570521e-17,2.5825193158583715e-17,8.3161500141490245e-17,4.485506029683165e-17,2.9755786642199378e-17,6.8784659904893492e-17,4.0852884266292674e-17,9.0014220297802239e-17,8.6343672751216212e-17,1.1499689465854317e-18,6.1859214993426572e-17,7.443691960163415e-17,9.9127590582007535e-17,9.7126001316355546e-17,2.1166188478469848e-17,2.3133409131085501e-17,8.2893699252977961e-17,9.6287404447561134e-17,6.7910300114424901e-17,9.3886067955754701e-17,2.5645997806452214e-17,2.6299163658637553e-17,4.81027766149491e-17,8.1508691776311029e-17,4.0508447850821538e-17,2.4003133750054984e-17,6.0344386456767096e-17,8.7065393225522715e-17,8.0251753772376103e-17,8.4008427987108009e-17,1.1401808299589903e-17,7.6878805396147073e-17,8.232277695741504e-17,9.7918947934871531e-17,8.4267546751536425e-17,2.7784921171376477e-17,3.6096117943758141e-17,6.8838726210407917e-17,4.3576876961626109e-17,1.6293332281522451e-17,5.7651682586641989e-17,7.701678386470303e-17,7.0381648971233522e-17,9.9423815528862174e-18,7.4504505353281279e-17,8.9262942831497639e-17,7.6030530840624124e-17,7.856962961284444e-17,3.9523747905390334e-17,5.502537041995674e-17,4.3500946333864697e-17,1.698179562506266e-17,9.5678121607284991e-17,1.2352981288218871e-17,5.7724165498744692e-17,1.3285698761465027e-17,8.5122482985956597e-17,5.5323596764123065e-17,2.8358186200493943e-17,5.0201904051005838e-17,6.2610037494217971e-17,7.0944319490576158e-17,5.9247806969564407e-17,5.5557094271760432e-17,9.6383378014201302e-17,4.8545750151854001e-17,9.5043668127618727e-18,5.5210565517423671e-17,5.0549390842206769e-17,1.0662451791809872e-17,5.2637377869803455e-17,3.3454569365130731e-17,9.9264338798820961e-18,9.5442175311967723e-17,9.056198160327039e-17,5.0674908146960658e-17,8.8554504247615117e-17,9.951739278482273e-17,4.4459976709214968e-17,6.9718210989842194e-17,7.8390539047075432e-17,4.1645859037525948e-18,1.5698037867434323e-17,7.6262839264236391e-18,6.2361777095589784e-17,5.3981570551171893e-17,2.6801744731143116e-17,1.2020637071458621e-17,4.5119965361431237e-17,1.7682233173167332e-17,8.4555951321963221e-17,8.6464309837436307e-17,2.0424287340138107e-17,4.2038795741042119e-17,3.1081310870125888e-17,4.6374626993434499e-17,4.8846162303583688e-17,8.3767754503758617e-17,3.4443392951274288e-17,2.9211088214069605e-18,8.0050097119994457e-17,8.7979188646655524e-17,9.8761269606184213e-17,7.7244268027367068e-17,1.6745708285365253e-17,4.4440751592628651e-17,2.4451098653720692e-17,3.2059624494751911e-17,7.0521426971536126e-17,3.6150428305147212e-17,3.8171694541117173e-17,5.0069069311255584e-17,9.7396785273915151e-17,7.8170251420931885e-17,9.7258249589009209e-17,6.1021935537690293e-17,6.4726106391055508e-17,7.1425894193584101e-17,8.614978891424834e-17,1.1565006973920389e-17,4.0786456051282582e-17,6.0554933584295211e-17,6.356114854686894e-17,9.5818367826985195e-17,9.8538427276536814e-17,2.9176764356205238e-17,5.6388263640692457e-17,3.0595625849440689e-17,9.3425599360605704e-17,8.2527342364890503e-17,7.2313977240351964e-17,4.9475981426890935e-17,4.8919812594773242e-17,9.9113190225092698e-17,6.4264078608946876e-17,3.872218326549045e-17,8.8876050121383739e-17,4.3445593963610006e-17,2.0674938739510252e-17,7.7697178090456869e-18,4.0141261384822422e-17,2.791294768685475e-18,9.9225354437250639e-17,8.7984628455713387e-17,4.0832809425890442e-17,8.8344659161055458e-17,6.6226791327353572e-17,9.6800699453102419e-17,9.0233464485965668e-17,2.1864906064234674e-17,9.9542795663699508e-17,5.4146610708674411e-17,6.5663164661265914e-17,6.0553915317170318e-17,1.1735206211684272e-17,9.7941107899416231e-17,4.5752894131001084e-18,1.7065197294577956e-17,6.2191032189643007e-17,8.03573809613008e-17,5.7147291955538097e-17,7.0493915618630131e-17,9.6234500841936099e-17,7.8905905162217099e-17,7.4864440999459477e-17,9.542388193192892e-17,6.6589093748480078e-17,5.0042722709709771e-17,5.2808018588693809e-17,6.3310649832244963e-17,2.6729533212492242e-17,9.8121801585890355e-17,9.6237382881809026e-17,7.4819378737593069e-17,5.4480199868557969e-17,5.7577652266249058e-17,3.9967460418120026e-18,5.6478617422049866e-17,6.9935132244601842e-17,2.6005483373766765e-17,5.2451899047009641e-17,9.2181917038979001e-17,6.8440250789280974e-18,7.3225953222718087e-18,8.9113587597385041e-17,7.0953193723689754e-18,3.3690021601738405e-17,7.7302947744959966e-17,2.3740418204106389e-17,8.9816870281938463e-17,1.2280915447045116e-17,8.3890688568819313e-17,3.1781348658027126e-17,1.9150462596677243e-17,2.3614799985429272e-17,2.860345601569861e-17,6.5547719893744212e-17,4.5183922775788229e-17,7.5498521865811199e-18,6.1170649998355654e-17,2.8267706772312517e-17,3.4588864943943916e-18,2.8900203249417243e-17,9.8994141092523926e-17,8.8126559440046542e-17,8.7119029067922384e-17,4.4988705482799555e-17,2.3377595608355477e-17,7.5835498041706162e-17,8.7267001518514012e-17,6.0726340907858683e-17,8.7384451748570423e-17,7.8543328051455319e-17,5.427783785597421e-17,1.2279133571777492e-17,4.7827718245098363e-17,9.7877825050149105e-17,3.7533491540700195e-17,8.5011070995125924e-17,7.7350620053941386e-17,6.0140026665758341e-18,8.5001266094157466e-17,4.715398102742619e-17,9.2160466145724056e-17,3.323967381101101e-17,6.8249154961900783e-17,6.3390307337045668e-17,6.0908181467093525e-18,2.37996171512641e-17,5.2731389423599463e-17,5.8408612085506325e-17,6.1900376256788147e-17,6.0712475201115012e-17,9.5870004845317446e-17,6.0388030576054007e-17,3.242065475042909e-17,4.5394360184203829e-17,2.8421502265147864e-17,4.5069224198814477e-18,4.1663379119941958e-17,5.1867668629856773e-17,7.7381695364834736e-17,4.1365286029176779e-17,9.5069383858935907e-17,1.1696557216346263e-17,5.5840568074490871e-17,4.6527687276015055e-17,8.8416346064768737e-18,4.5637392098316916e-17,7.9482607764890418e-17,5.5562893272610377e-17,6.8401789207011464e-17,8.0735027669463311e-17,5.5470315235899754e-17,7.0384157389868054e-17,4.4359989658929402e-17,8.7351314801722759e-17,6.2111904379213234e-17,6.1670232797041531e-18,1.2725241433363408e-17,2.2748449713224543e-17,5.0587718102382493e-17,4.6504559040302406e-17,2.975956409145146e-17,9.5894826120696956e-17,4.8926421788288278e-17,7.9214489958714695e-17,8.3242186078568925e-17,4.5735586508875705e-17,3.7290699671721082e-17,3.4009390265680842e-17,6.4155848633730789e-17,6.8504357638303187e-18,6.0733631443232294e-17,7.434962488594465e-17,4.233538627927191e-17,5.1172657867427908e-17,5.8575519173638891e-17,2.0792615991318598e-17,7.2381528485799205e-17,4.329216132755391e-17,8.4661612118128691e-17,1.7700336918933316e-17,9.4500333634205163e-17,7.5417765086982401e-17,1.4306165316607801e-17,3.7466733845649284e-17,7.9602376488037397e-18,9.4239961605519049e-17,6.7039583228994167e-17,2.7000813288614154e-18,4.3077329830033701e-17,8.3076535251224409e-17,4.6665322203887624e-17,6.3032506972318519e-17,5.3364023680333049e-18,5.4335904967505479e-17,2.3999632419552652e-17,6.5400255862157797e-17,8.686905112722888e-17,7.2936323477886613e-17,9.2464410630520434e-17,1.0354368222644553e-17,3.7768878683447836e-17,8.787981955008581e-17,6.1864740964258093e-17,2.4218520997092128e-18,3.3634278161218383e-17,3.0135959540726612e-17,9.205364315677434e-17,1.881157282809727e-17,2.3397280876757576e-17,9.2703132704133165e-17,1.4558200513711198e-17,7.7498633288778372e-18,3.3172240029554811e-17,5.8528229060582819e-17,7.6415435537230227e-17,6.40779710910283e-17,4.8496051519876343e-17,6.5475657464005052e-17,4.2651204662397505e-18,8.6597579811699687e-17,1.1003060808172449e-17,6.5393004589714107e-18,3.7913490940118201e-17,8.1868661951739335e-17,5.33681657759007e-17,5.3363324258709323e-17,7.2157061137724666e-17,6.9740705689880996e-17,6.8544768492924053e-17,2.2028085007565096e-17,5.9907318597193808e-17,5.4784715077141292e-17,6.3080973715987052e-18,7.0549506512703375e-17,8.0435578625649219e-17,9.5687021625228224e-17,2.6362418040866031e-17,4.5009674695320422e-17,1.1007244978798552e-17,9.4543848012108367e-18,8.2952358663314951e-17,6.6766747348010536e-18,3.3291065275203433e-17,6.3315598440822216e-17,1.4144002104876562e-17,7.9821727551752695e-17,3.9271813437808298e-17,6.9427942254813392e-17,3.1641665278933941e-17,3.5185478399274869e-17,7.2978599796304476e-17,9.4734849708620459e-17,8.9997182440944009e-17,5.2498841746943065e-17,6.4156208885833623e-17,9.5427489823661744e-17,1.8708377600181849e-17,8.2859682464040817e-18,3.8603131605777887e-18,2.1496162347495557e-17,6.9684416097123181e-17,7.7727753756102177e-17,3.3617164722643788e-17,9.1504594334401194e-17,3.3928332274779671e-17,7.8472514091525224e-17,9.807987717539072e-17,3.0257885250262914e-17,3.6200042066164312e-17,1.6032726292964071e-17,8.5701333225006238e-17,8.4943141725845638e-17,8.5372666511684657e-17,7.8700604682788249e-17,3.6622666358016433e-18,2.7812318563926963e-17,8.9068117000628261e-17,2.3553260217886418e-17,2.2235513346269727e-17,3.2781298591988159e-17,8.3460049857385456e-17,8.3126618499401952e-17,6.2581629948224878e-17,8.2396037330850957e-17,1.6978288439800963e-17,5.7497602331219238e-17,6.0423899989807983e-17,5.7611133952392268e-17,5.819253843394108e-17,2.9315808690618721e-17,7.0433819879079242e-17,7.0214222100330515e-17,8.9898193880682805e-17,7.9829536532983184e-17,5.8714087114203716e-18,4.4717316594906146e-17,8.2801874313503502e-17,4.5175345322815695e-17,6.0333274999400602e-17,4.7100578753044822e-17,4.7111561682308089e-17,2.8624879225622858e-17,7.4157566696638241e-17,6.7862155990209431e-17,7.8730038171634072e-17,9.0462788080330934e-17,6.066833308152855e-17,9.094406359130516e-17,9.7286080026300625e-17,7.4972497844370086e-17,2.1766956931212915e-17,2.6790639312937856e-17,6.02623377898708e-17,6.92741462548729e-17,4.7198529415763909e-18,1.4051236139610408e-17,4.0684279689798127e-17,1.3226582795148715e-17,1.2887188664404674e-17,1.9899382300674913e-17,2.3888111631618812e-17,1.5427477681543679e-17,2.9815156045835464e-17,5.8919317466439679e-17,8.2405038631521163e-17,8.2628076481632889e-18,3.7119198672007765e-17,8.2410296044079583e-17,2.2436964713269844e-17,7.2567393930163236e-17,6.4017276091501118e-17,9.2659945717081424e-17,3.2011212619021533e-17,4.9771220944821832e-17,4.1653812350938095e-17,6.583340661111288e-17,7.3860954767791552e-17,8.9122224035905675e-17,8.5296093888813624e-17,5.4314032347174355e-17,8.4375568868126718e-18,2.8938311578473075e-17,2.6702018179930748e-18,9.7619794418103985e-17,6.7762449000263589e-17,4.6061257391702385e-18,9.3570808825781565e-17,3.3298212668625633e-17,3.7480029381811612e-17,9.7328348784241824e-17,9.1282147592864924e-17,3.7138229544274503e-17,6.1826860832516107e-17,3.1605812415247779e-17,4.6567313670413562e-17,1.2970325947739184e-17,5.5001942554255944e-17,9.1660805215127765e-17,1.8490845375927164e-17,1.441234165430069e-17,9.6048700491432095e-17,3.3879670788068321e-17,8.7065616374835368e-17,8.9850509885232894e-17,9.2760968445800229e-18,5.0465228883782397e-17,7.6303139569936322e-17,6.1913536004023626e-17,9.3586642008274792e-17,5.8730164436390625e-17,1.0776732107624412e-17,7.0127138893585654e-17,6.0302009938983245e-17,3.9039016827009619e-18,4.0739366083405908e-17,5.3260385649045923e-17,9.988265605457127e-17,4.1752119001466779e-18,5.8121355693321676e-17,8.2887089898111301e-17,3.1069534275215113e-17,3.465863465075381e-17,1.935217952542007e-17,8.4824385215993964e-17,1.819097213866189e-17,2.53608876906801e-17,2.3465483498759569e-17,5.8567633458180349e-17,7.4727813320700079e-17,9.3830011354759334e-17,3.1447162543190638e-17,5.7309413708280772e-18,8.1308333428343754e-17,6.3437878233380613e-18,7.788219172810204e-17,3.0411848879884926e-18,6.9845753926085307e-17,6.8466372504364699e-17,8.5766906437696893e-17,6.0264223713893438e-17,7.6309324731351804e-17,1.2288973647402598e-17,1.648883908544667e-17,7.9828289169585336e-17,9.0593623880762604e-17,6.2167208712780844e-17,5.8807021968532351e-18,7.9511389147955915e-18,6.6775903053814543e-17,7.8586181348655366e-18,3.0328895552083848e-17,1.4464731262763961e-17,6.9488347743405027e-17,7.9100240645464506e-17,5.6765260309213777e-17,1.0147447841940449e-17,1.0230760906357319e-17,2.4549010214861483e-17,8.270719720725901e-17,2.512114336225204e-17,2.707337246555835e-17,1.1377399116288869e-17,2.3473961236421018e-17,8.5976923225447538e-17,3.0742832202464337e-17,7.0121777340071277e-17,3.1368510835338379e-17,7.364047146821394e-17,7.3826121839229014e-18,6.5402532049687578e-17,4.146720249927602e-17,5.2110786244738844e-17,3.7776337831281121e-17,3.3312424866482611e-17,9.3840896274428815e-17,6.6515843263594433e-17,5.8033046283293514e-17,1.2638982871780172e-17,2.4477957293158397e-17,1.5633923965040595e-17,4.953872879617847e-17,2.9567017706576734e-18,2.6776217242702841e-17,9.6464881773572408e-17,1.7829566579079255e-17,9.706691736681387e-17,2.2878345317672937e-17,1.3262190127745271e-17,8.5959217764670033e-17,4.727359226299449e-17,8.3970627655275162e-17,6.6012706542154777e-17,1.2360344178276137e-17,2.9728371270466591e-17,4.5733748437138267e-17,7.5699127649655566e-17,4.8072089769644657e-17,5.6253686602925883e-17,8.1109659314854065e-17,4.3351467227796086e-17,2.3743932327488436e-17,2.7452211700612677e-17,3.094205707823857e-17,7.5619871334172785e-17,3.8796127285808318e-17,8.9939256696496159e-17,2.389329415396787e-17,7.3115959273884074e-17,2.2083921156125142e-17,4.1276183714158831e-17,3.6170690705301236e-17,9.3893268618267032e-17,2.3300955955404786e-17,2.6287318212678654e-17,6.7386849659960715e-17,5.3783160869963461e-17,8.095571694592945e-17,9.5520732329459859e-17,5.0386241126572705e-17,2.7507006716215984e-17,2.840105943614617e-18,2.5758377261692659e-17,5.8744395812042055e-17,9.283959886990488e-17,8.3972379818791528e-17,7.7896526653785261e-18,1.3977175147738308e-18,3.0640638115350154e-17,6.5005581300938501e-17,5.9566769465338442e-17,8.7791121789719909e-17,2.1126615307061001e-17,4.0012852151645341e-17,6.3952437236206603e-17,2.356904649315402e-17,8.0038655606331309e-17,1.1766399378422648e-17,5.0668404085561631e-17,3.8969906155718488e-17,6.5430401925928896e-17,2.4950174822937695e-17,7.9799543384462595e-17,7.5410001238109538e-17,2.4104002379579468e-17,9.2611106927972281e-17,6.0483055279823018e-17,2.1854322964325546e-17,1.213377531734295e-17,9.1296020906185724e-17,5.2060800245497371e-17,1.6086766528664156e-17,8.3946227692067628e-17,9.5500765940407294e-17,9.215822107600979e-17,2.6785616759210824e-17,5.0324564578942948e-17,7.2046573092462491e-17,2.8483501654351125e-17,1.0687786280643193e-17,6.5599475874332707e-17,6.102223661984317e-17,9.1812581438338382e-17,3.4981093544280154e-17,5.1474105827510352e-17,1.0455431649694218e-17,9.7444956597406411e-17,5.9700416725827377e-17,2.0530615417519584e-17,3.9663958212826395e-17,1.2007313298759982e-17,9.127488289680332e-17,3.043807455152273e-17,6.7031209839740768e-17,4.0245435279561202e-17,1.8838034058455379e-17,4.265481240744702e-17,8.6350083205616097e-17,3.1836060139583419e-17,8.3351284794043743e-17,6.9690473214490334e-17,9.909306555008516e-17,1.0095311094541101e-17,7.3160652801161636e-17,4.0806772642536084e-17,9.0279181950725615e-17,3.0222899006213988e-17,8.6745362674118946e-17,3.1343181325355539e-17,3.2703629238996651e-17,1.1450552006484941e-17,1.410755726508796e-17,5.9788932481547817e-17,9.0921552963554856e-17,2.8990023717517031e-17,8.747200126154348e-17,1.6366940598236397e-17,3.0598719190806146e-17,1.065208027837798e-18,8.6824609539005902e-17,2.9075946068391202e-17,5.5595802967203781e-17,5.5530277030542489e-17,2.0547939719632268e-17,8.7219316624104973e-17,4.5930689841508859e-17,5.1830891782883552e-18,7.5086138631450016e-17,9.0567475995281716e-17,8.2582782464334743e-17,1.3966434744652359e-17,3.0582032873062411e-17,8.3539166096597911e-17,1.9305866396520286e-17,8.0246368661522863e-17,6.1865635428577657e-17,9.1870128720998765e-17,5.292434710217639e-17,1.4593062793603167e-17,9.1866709503810844e-18,5.096849890472367e-17,9.1162791269831361e-17,4.1090889569837593e-17,1.4432005716487765e-17,1.8183644077507777e-17,1.7358635183190927e-17,5.794317780155689e-17,6.5178509271470835e-17,6.1015575471101334e-17,5.86948397688102e-17,2.2230128488969058e-17,6.7331278228666627e-18,5.2473293213639404e-17,9.8771573337260629e-17,9.8929394714767111e-17,9.4024258163757619e-17,4.9501601231517265e-17,2.1758044313173744e-18,6.9792448047781363e-17,6.5705847124801947e-17,4.1730760877020654e-17,9.223780417465605e-17,4.4428978371433907e-18,5.3000151077285407e-18,2.9990324038080865e-17,1.375135773909278e-17,8.0342731938464566e-17,1.7718376285396516e-17,3.5303696870570998e-17,9.2164516256190836e-17,9.2482784395106134e-18,8.2222915115999051e-17,5.1599530516425143e-17,8.7553311675554142e-17,3.7316507105249907e-17,5.6086698032217095e-17,7.4208471339894453e-17,5.8077745996415611e-18,5.2949275814695278e-17,5.9869566555600614e-17,8.0647567038191479e-17,3.0806654334999618e-17,8.1874206869862969e-17,4.3553100806893775e-17,1.9757676286622882e-17,7.9468709188513453e-17,1.3245652046054602e-17,7.5131282790796825e-17,8.2278651480097327e-17,1.1511290962807835e-17,6.4151864539133385e-17,2.619968422059901e-17,2.5958608957007527e-18,1.9259663609089329e-17,8.9699507781071582e-17,5.1776210995856668e-17,5.2022130989003919e-17,2.421686621243134e-17,5.4907672215485939e-17,4.1687942970311266e-17,6.1037778516532851e-17,3.6087594612734389e-17,7.6283185927663e-17,4.5294773332076144e-17,8.567934002890251e-17,7.9727243375964468e-17,3.8903976724715896e-17,2.6539478895254432e-17,9.3802694946061801e-18,7.7551498415181411e-17,7.3653456656029449e-17,8.0426460667746145e-17,3.3866943762870504e-17,9.4563647993141787e-17,8.413520351191983e-17,6.6333229377400129e-17,3.7800607445416971e-17,8.4816024273866791e-17,8.2993311736965552e-17,8.4043202353408563e-17,1.8475344255100936e-17,3.3560666433069854e-17,1.3822466004407033e-17,4.8415921070380132e-17,8.8108474411070351e-17,3.4326214322121808e-17,5.3638340132310982e-18,4.804028166877105e-17,6.8985281901434063e-17,6.5608524819836016e-17,7.3643518063705416e-17,1.7646525318501516e-17,4.4280071732588107e-17,2.7848863971885292e-17,3.8604052569484334e-17,4.3898942525964224e-17,9.7986086212331429e-17,7.9655884669860822e-17,4.0500348574947559e-17,6.731779666873626e-17,4.4578504814300682e-17,5.3327965707285322e-17,1.6523980964673682e-17,4.0470139353536063e-17,3.3277393835829567e-17,8.589263847842812e-17,3.2092131132958451e-17,5.226720121223479e-17,8.9555565663846202e-17,8.0568357883486901e-17,2.5455394086893646e-17,1.108652994572185e-17,3.1757222231943158e-17,6.5654091466916727e-17,4.1478021702729162e-17,8.883885170030408e-17,7.1093078299891203e-17,6.0452062742318964e-17,1.5220121582271532e-17,6.6762641355395322e-17,8.72608847010415e-17,1.4037878137314691e-17,9.2324339393526315e-18,5.3673145100940015e-17,4.6712045742198822e-17,6.0142780584050348e-17,4.0085133935790511e-18,7.1481860322412102e-17,7.556685263873078e-17,2.3628638585098088e-17,7.0304224365623668e-17,6.1124715492594982e-17,2.2236712742131203e-17,3.1522451360244299e-17,6.8310564149869603e-17,1.5603266624035314e-17,5.6171975207049399e-17,4.3889940672088409e-17,8.5217211148468774e-17,5.675451684882865e-17,5.629798421938903e-17,2.5649608648614956e-17,9.0275592683581629e-17,3.6511220221407707e-17,4.2532252701232204e-17,9.7541935439221568e-18,3.6454706787830213e-17,8.452896491507999e-17,4.9409764190670099e-17,6.0700482210610067e-17,2.6340252083260565e-17,2.9136406148318203e-18,9.2987758004339416e-17,2.1946451751980931e-17,4.7208925178041676e-17,1.4052436757134274e-17,2.6146776949986814e-17,5.9995751786977053e-17,4.3690626614959909e-17,2.7269736853428184e-17,7.0550470473477615e-17,9.6248285918962212e-17,4.0830656787613404e-17,7.8982456440571691e-17,1.9002168134320526e-17,2.2567145126406103e-17,8.5768860544310876e-17,4.1260507019702339e-17,5.883592165168375e-17,6.1598915604408826e-18,3.7984299644595007e-17,4.458986030449159e-17,2.294775994401425e-17,3.8347167257452378e-17,2.2680417201947419e-17,9.2540041950996962e-17,5.2701011520577591e-17,9.9086434251395985e-17,4.39088480642531e-17,8.6924308346118775e-17,7.4389095345512031e-17,7.6102680477779359e-18,7.9745133270043864e-18,5.93659184416756e-17,8.4886010338552292e-17,6.9474561490817001e-17,6.8308143391273918e-17,4.0052471193019299e-17,1.452850074856542e-17,7.9899993583094329e-17,8.5981816767016429e-17,4.6664629544364284e-17,2.0783578202128408e-17,1.9778672606218605e-17,6.1126652196282517e-17,4.2866139324381944e-17,5.4761453173123293e-17,9.0881023207446563e-17,1.7070144750643522e-17,3.6927327373996373e-17,1.5596531054470689e-18,9.6061227970756594e-17,7.737702921382151e-17,6.4190399020910258e-17,7.6713968195952473e-17,2.1123127852799372e-17,4.2685865705367173e-17,8.0639879854395985e-17,6.6245054865721607e-18,8.0026436939369889e-18,5.8988952591316778e-17,8.8433324420591816e-17,1.8241369100520389e-17,2.3494813169352709e-17,7.3132455173647027e-17,4.6321144596440711e-17,5.3894814012339332e-17,8.1568127518519759e-17,2.605336463311687e-17,7.425335196591914e-17,9.1788618576712908e-17,2.0993950032629072e-17,7.6061258553992956e-17,1.6882732335943729e-17,8.8816042641177769e-17,5.5036209838464849e-17,7.8110191717278217e-18,2.2393514446448535e-17,1.9169291548896581e-17,4.3340958487940949e-17,7.3970192960230634e-17,7.8845329363830387e-18,6.9974769979715352e-17,5.9063542801886796e-17,7.7922297406010327e-17,4.8122160685947158e-17,5.0688438634155315e-17,5.9830469717271627e-17,4.3124186068540437e-17,5.3046213641762729e-17,6.1512475836556408e-17,9.6214795404579495e-17],"expected":[0.99999999999999967,0.99999999999999978,0.99999999999999956,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999944,0.99999999999999989,0.99999999999999967,0.99999999999999967,1,1,0.99999999999999956,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999967,1,0.99999999999999978,0.99999999999999978,0.99999999999999967,1,0.99999999999999989,0.99999999999999989,0.99999999999999989,1,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,1,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999944,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999956,0.99999999999999989,1,0.99999999999999967,0.99999999999999967,0.99999999999999944,0.99999999999999956,1,0.99999999999999989,1,0.99999999999999967,0.99999999999999989,0.99999999999999967,1,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999944,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999978,1,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999956,1,0.99999999999999978,0.99999999999999967,0.99999999999999944,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999944,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999956,0.99999999999999956,0.99999999999999956,0.99999999999999989,0.99999999999999967,0.99999999999999956,0.99999999999999956,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999978,1,0.99999999999999967,0.99999999999999956,0.99999999999999989,1,0.99999999999999967,0.99999999999999956,0.99999999999999956,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999978,1,0.99999999999999956,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999956,0.99999999999999978,1,0.99999999999999978,0.99999999999999978,1,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999944,0.99999999999999944,0.99999999999999967,0.99999999999999956,0.99999999999999944,0.99999999999999978,0.99999999999999967,0.99999999999999967,1,0.99999999999999989,1,0.99999999999999978,0.99999999999999978,1,1,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999956,0.99999999999999989,1,0.99999999999999956,0.99999999999999956,0.99999999999999944,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999956,0.99999999999999956,0.99999999999999967,0.99999999999999967,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999944,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999944,0.99999999999999967,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999989,1,0.99999999999999978,1,0.99999999999999956,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999956,0.99999999999999956,0.99999999999999989,0.99999999999999944,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999989,1,0.99999999999999989,0.99999999999999967,0.99999999999999956,0.99999999999999967,0.99999999999999967,0.99999999999999944,0.99999999999999956,0.99999999999999956,0.99999999999999956,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999944,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999978,1,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999956,1,1,0.99999999999999967,1,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999978,1,0.99999999999999978,0.99999999999999989,1,0.99999999999999989,0.99999999999999944,0.99999999999999967,0.99999999999999956,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999967,0.99999999999999967,0.99999999999999956,0.99999999999999978,1,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999956,0.99999999999999956,1,0.99999999999999978,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999967,0.99999999999999978,1,0.99999999999999989,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999989,1,0.99999999999999978,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999967,0.99999999999999978,1,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999967,0.99999999999999956,0.99999999999999989,0.99999999999999956,0.99999999999999967,1,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999956,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999967,1,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999978,1,0.99999999999999944,0.99999999999999967,1,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999967,1,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999956,1,0.99999999999999989,0.99999999999999956,0.99999999999999967,1,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999989,1,0.99999999999999978,0.99999999999999967,0.99999999999999956,0.99999999999999967,0.99999999999999989,0.99999999999999967,1,0.99999999999999967,0.99999999999999989,1,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999978,1,0.99999999999999956,0.99999999999999956,0.99999999999999967,0.99999999999999989,0.99999999999999978,1,1,0.99999999999999956,1,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999944,0.99999999999999956,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999989,1,1,0.99999999999999989,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999978,0.99999999999999944,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999956,0.99999999999999956,0.99999999999999967,1,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999956,1,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999967,0.99999999999999956,0.99999999999999967,0.99999999999999967,0.99999999999999956,0.99999999999999956,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999967,1,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999978,1,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999956,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999967,1,0.99999999999999989,1,0.99999999999999944,0.99999999999999967,1,0.99999999999999956,0.99999999999999978,0.99999999999999978,0.99999999999999956,0.99999999999999944,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999944,0.99999999999999978,0.99999999999999956,0.99999999999999956,1,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999944,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999967,1,0.99999999999999978,0.99999999999999967,0.99999999999999944,1,0.99999999999999967,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999989,1,0.99999999999999978,1,0.99999999999999956,0.99999999999999989,1,0.99999999999999956,1,0.99999999999999956,1,0.99999999999999956,0.99999999999999967,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999967,1,1,0.99999999999999967,1,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999967,0.99999999999999967,1,1,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999989,1,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999956,1,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999978,1,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999944,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999956,0.99999999999999967,0.99999999999999978,0.99999999999999989,1,0.99999999999999989,0.99999999999999967,0.99999999999999956,0.99999999999999956,1,1,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999956,1,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999989,1,0.99999999999999967,0.99999999999999967,0.99999999999999956,0.99999999999999989,0.99999999999999967,1,0.99999999999999944,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999967,0.99999999999999956,1,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999989,1,0.99999999999999967,0.99999999999999956,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999989,1,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999956,0.99999999999999978,1,0.99999999999999978,0.99999999999999956,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999967,0.99999999999999967,0.99999999999999956,0.99999999999999967,1,1,0.99999999999999978,0.99999999999999944,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999989,1,0.99999999999999978,0.99999999999999956,0.99999999999999956,0.99999999999999944,0.99999999999999967,1,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999956,1,1,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999967,1,0.99999999999999956,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999978,0.99999999999999956,1,0.99999999999999978,0.99999999999999967,0.99999999999999956,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999956,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999989,1,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999956,0.99999999999999956,0.99999999999999978,0.99999999999999989,1,0.99999999999999956,0.99999999999999956,0.99999999999999967,0.99999999999999989,0.99999999999999956,0.99999999999999956,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999956,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999956,0.99999999999999978,1,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999978,1,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999967,0.99999999999999956,0.99999999999999956,0.99999999999999989,1,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999967,0.99999999999999989,1,0.99999999999999967,0.99999999999999978,0.99999999999999978,1,0.99999999999999967,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999967,0.99999999999999989,0.99999999999999967,0.99999999999999978,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999978,1,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999967,0.99999999999999989,1,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999944,0.99999999999999978,0.99999999999999967,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999967,1,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999978,0.99999999999999989,0.99999999999999956,0.99999999999999967,0.99999999999999967,0.99999999999999978,0.99999999999999956,0.99999999999999956,1,1,0.99999999999999978,0.99999999999999956,0.99999999999999978,0.99999999999999967,0.99999999999999978,1,0.99999999999999967,0.99999999999999956,0.99999999999999978,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999978,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999978,1,0.99999999999999944,0.99999999999999956,0.99999999999999967,0.99999999999999956,0.99999999999999989,0.99999999999999978,0.99999999999999967,1,1,0.99999999999999967,0.99999999999999956,0.99999999999999989,0.99999999999999989,0.99999999999999956,0.99999999999999978,0.99999999999999978,0.99999999999999956,0.99999999999999989,0.99999999999999956,0.99999999999999956,0.99999999999999989,0.99999999999999956,0.99999999999999989,0.99999999999999956,0.99999999999999978,1,0.99999999999999989,0.99999999999999989,0.99999999999999978,0.99999999999999956,1,0.99999999999999989,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999978,0.99999999999999967,0.99999999999999978,0.99999999999999989,0.99999999999999967,0.99999999999999978]}
},{}],94:[function(require,module,exports){
module.exports={"z":[40,18,6,13,8,26,18,17,43,21,30,10,30,22,47,19,29,26,1,15,41,20,31,41,24,41,14,8,13,14,25,3,12,23,3,3,9,42,13,12,10,14,31,48,42,42,41,29,41,31,36,28,43,5,40,20,11,17,50,7,5,24,33,38,11,23,13,35,17,22,10,40,26,15,48,17,20,15,30,49,31,5,36,48,21,6,43,1,47,49,38,43,15,41,40,35,8,18,26,13,31,19,36,40,20,30,37,15,45,43,3,40,7,24,44,29,22,34,21,1,48,29,38,34,50,43,12,45,5,14,20,1,26,9,29,5,49,1,25,32,21,27,50,17,14,35,34,3,49,12,34,13,15,26,27,36,1,3,45,2,21,29,16,25,48,24,24,45,15,20,5,8,30,5,8,40,4,36,30,16,15,49,19,23,37,31,43,18,18,1,49,4,48,30,11,31,39,27,31,22,46,24,31,12,36,38,38,43,20,32,13,9,2,22,24,26,33,16,14,30,26,38,13,4,15,12,33,46,45,12,44,27,11,34,20,4,45,7,13,47,49,39,31,10,9,6,42,27,33,16,28,15,13,21,3,35,12,33,19,43,32,30,50,4,11,20,38,28,45,7,24,42,8,21,41,22,24,48,6,19,44,1,32,36,5,33,46,43,2,43,2,32,50,17,35,8,19,31,26,20,39,21,3,10,37,39,36,31,23,3,30,15,17,36,9,19,20,36,46,16,12,2,19,28,17,48,5,20,26,8,42,26,46,25,37,17,20,19,15,8,35,9,45,17,47,14,5,46,25,20,7,19,13,9,45,42,10,18,7,42,28,38,16,1,20,32,40,25,42,7,35,12,21,29,33,16,11,2,31,6,34,29,31,29,18,41,19,37,9,27,40,30,25,32,18,42,39,17,12,10,43,4,41,44,43,20,19,3,20,2,44,47,24,44,29,40,35,7,49,11,28,43,32,20,29,42,47,49,44,16,9,19,9,35,13,50,38,50,10,20,50,11,36,18,9,44,43,48,46,4,49,37,29,44,29,22,9,26,26,21,28,22,9,42,25,26,27,43,10,16,32,29,2,18,16,27,27,27,17,31,31,39,19,19,7,16,46,14,33,40,33,33,34,36,38,39,43,23,26,11,8,4,20,2,42,36,9,33,17,29,49,13,41,21,12,8,50,3,4,8,22,21,21,6,21,21,6,49,22,48,31,20,50,45,11,47,18,41,14,7,15,42,10,13,2,38,23,13,13,11,44,5,27,11,46,18,49,30,30,5,6,28,47,1,30,16,45,33,22,4,31,33,4,14,47,32,33,22,6,1,36,24,20,38,5,38,11,16,13,38,12,8,36,7,38,28,28,29,28,6,32,23,50,47,32,17,31,4,46,36,29,3,17,38,48,11,22,49,31,10,37,37,34,42,11,48,5,48,14,26,44,42,28,37,24,40,22,13,39,35,33,12,33,25,9,49,22,18,26,35,19,50,25,3,18,35,39,26,20,45,36,49,25,13,37,36,47,46,26,36,46,34,11,35,44,45,5,23,24,9,2,50,41,1,9,2,9,31,10,38,35,30,11,45,15,50,39,40,26,5,46,2,3,11,22,26,29,40,29,18,42,48,7,7,16,1,1,18,48,34,39,26,38,35,7,48,18,18,8,10,25,45,41,7,32,29,35,49,32,27,37,4,43,19,32,30,10,39,29,5,9,45,46,20,4,45,17,30,30,3,24,6,41,49,27,8,12,14,36,22,8,30,33,31,32,9,12,5,10,10,9,32,8,47,11,5,48,7,1,5,48,31,2,9,49,42,15,30,27,37,44,37,45,26,10,16,34,43,48,1,49,31,6,22,9,47,38,20,3,36,4,45,25,48,43,37,50,16,1,25,28,2,44,13,46,16,43,42,44,39,38,31,6,34,26,41,9,39,42,34,47,38,9,49,45,13,20,25,20,38,14,36,44,31,38,6,23,14,36,10,48,14,9,20,13,26,33,45,41,46,43,32,20,3,6,31,5,48,19,50,42,30,11,10,40,2,33,4,2,43,40,41,47,44,25,46,42,24,7,11,38,14,47,45,42,37,13,23,11,32,27,15,20,14,24,24,50,18,31,12,48,34,25,42,22,12,39,23,38,8,23,34,3,32,5,20,40,11,33,31,2,26,28,12,36,16,6,25,11,32,41,36,7,44,45,3,47,15,1,34,19,2,9,32,28,13,6,2,2,32,47,5,49,4,19,42,33,33,4,26,11,40,2,17,24,32,8,5,50,36],"delta":[22,2,48,3,37,18,30,43,28,44,36,49,1,15,40,48,47,6,1,15,42,30,39,41,50,30,12,6,46,36,33,9,6,34,14,29,39,32,41,49,6,24,24,34,11,15,47,42,17,45,43,34,13,19,44,11,10,40,38,49,2,44,33,14,29,50,19,50,11,29,40,12,8,23,25,18,1,48,10,50,25,25,42,29,8,43,37,23,35,18,2,4,25,12,49,43,6,33,38,10,32,5,30,30,25,40,29,39,22,30,4,37,15,21,29,35,32,10,47,4,49,43,5,38,34,39,31,4,24,5,18,44,24,47,34,37,48,2,5,36,40,25,30,21,46,43,6,21,15,31,3,36,26,2,39,34,15,13,12,9,17,8,23,30,37,40,26,6,20,38,46,6,49,1,32,32,7,34,31,46,20,8,50,41,15,25,36,11,27,29,10,32,35,43,3,45,10,49,3,23,45,30,42,23,6,28,21,11,7,10,29,28,48,43,13,33,50,37,18,26,11,14,34,34,49,5,32,14,4,30,19,47,9,19,12,9,3,8,46,2,40,31,19,10,42,7,38,24,32,3,20,18,18,36,5,22,18,7,28,28,24,44,33,5,26,30,41,12,5,6,24,28,30,20,10,3,31,17,3,37,29,49,43,4,25,41,22,48,8,3,2,33,38,40,40,12,15,47,6,36,19,26,42,11,43,16,34,28,49,7,48,37,6,41,33,27,25,22,4,7,45,8,25,10,39,42,4,15,14,32,33,22,7,16,32,2,20,31,39,39,33,22,20,30,16,27,18,18,46,48,23,3,23,32,23,40,48,30,11,49,45,23,1,5,18,7,39,18,18,49,31,32,23,6,1,22,30,10,31,48,33,40,18,33,25,16,36,26,45,4,3,1,5,27,33,8,39,3,50,25,7,39,19,19,34,17,19,1,44,48,15,8,7,50,34,40,11,43,44,32,38,6,21,40,1,3,8,29,14,41,44,45,31,25,17,20,15,27,22,21,46,26,47,42,26,46,32,29,36,5,2,31,29,9,3,3,22,48,24,43,2,49,4,7,47,8,27,32,19,36,19,17,8,26,8,10,18,36,17,3,40,11,25,6,24,14,7,14,45,18,34,4,42,7,33,4,50,7,49,27,13,7,32,41,37,24,25,44,43,47,10,27,7,4,1,1,8,49,27,14,26,17,20,10,16,18,1,4,41,39,32,49,23,3,13,27,41,48,42,22,43,40,24,1,49,38,43,20,4,40,12,44,41,9,21,3,24,40,48,16,49,33,39,5,29,7,46,47,25,15,9,4,17,30,15,33,28,4,4,10,4,41,9,36,48,2,41,32,36,48,49,45,50,12,50,34,8,26,48,24,27,20,4,2,16,14,45,14,42,10,1,33,33,50,41,20,13,2,4,14,14,28,6,26,25,26,21,44,20,19,45,1,22,7,15,4,3,35,11,12,12,11,2,33,36,41,1,41,31,35,21,27,13,5,33,40,17,7,6,1,27,17,9,19,45,23,34,49,43,10,39,11,41,15,32,46,36,9,35,29,17,37,27,2,44,5,3,6,26,9,22,21,46,25,32,33,50,14,30,50,43,24,24,25,28,18,9,10,32,23,49,50,27,23,24,13,40,23,5,36,45,24,1,7,26,29,34,27,29,40,24,26,17,37,31,38,46,20,35,34,48,26,5,31,26,8,6,31,28,18,35,22,8,13,39,43,20,44,45,6,16,8,4,7,11,19,5,31,48,30,1,46,6,29,1,38,11,44,1,48,33,40,26,16,13,38,10,40,5,28,19,12,1,39,31,37,24,40,16,8,38,20,42,2,14,5,26,13,23,17,18,37,42,28,50,17,32,1,10,28,7,26,29,26,17,6,14,32,28,19,10,34,34,9,3,32,2,47,15,2,4,15,46,35,43,37,20,49,9,23,22,26,21,35,37,49,21,34,48,19,46,24,48,48,18,17,15,14,45,41,11,18,7,45,27,40,46,3,21,34,11,3,4,28,47,37,31,10,19,42,34,16,40,22,17,49,35,3,11,6,48,33,36,1,9,30,23,10,32,30,47,45,27,4,32,42,35,50,47,3,8,17,21,7,16,31,35,33,45,37,25,15,41,31,17,37,28,27,20,6,45,38,34,7,42,15,6,2,14,22,39,5,11,23,2,23,22,44,47,33,14,7,29,27,18,40,2,41,26,2,42,46,13,4,3,18,13,36,34,14,17,17,33,49,1,1,36,14,20,18,2,42,21,43,36,29,47,16,50,19],"expected":[4.0186519339249405e-38,0.0029239766081871343,2.8070941830727891e-68,0.0003663003663003663,1.89596881214106e-51,2.5674323435553336e-28,1.3753111515333021e-45,1.5086760456073018e-67,1.1729329309563762e-49,1.9173779098170156e-71,1.072034016842028e-60,1.5438014535955504e-73,0.033333333333333333,1.3734370616966789e-22,2.2712677985824287e-73,1.1761611518936423e-77,1.2289355239246003e-80,1.8863570958491241e-09,1,9.8598323797593167e-21,1.716399875638574e-75,1.9998146846275055e-46,1.5500763111350191e-66,1.4074478980236307e-73,5.7832995504184739e-84,6.8114572064830208e-53,4.0145293517428029e-16,8.0937580937580941e-07,2.0378179187461264e-70,1.0237064703361271e-53,1.5309537692806173e-53,5.010421677088344e-08,1.1222437693025928e-07,1.5808761748006374e-54,9.5589546647747705e-14,2.4322500831070358e-34,1.5590246168289115e-55,7.4835934107714284e-57,1.1205021708687992e-61,4.7971231608901281e-75,2.775002775002775e-07,4.5242171657157898e-34,1.1490582713305919e-39,4.4612320067837052e-62,4.147444018199741e-19,4.7050060558411394e-26,3.8710115432890894e-85,2.5452812990722809e-71,2.0132674607792638e-29,1.0691739058144023e-77,9.1247716334281783e-76,2.145250967771606e-56,1.106617424333836e-22,9.283608409513641e-22,5.1698791434896808e-79,4.5860052364736535e-16,1.4915520591475184e-12,2.9427329739988662e-62,2.8859198566263909e-70,5.6708973395409886e-71,0.033333333333333333,7.0883546149377625e-73,3.1903732341218755e-56,8.8734360680353898e-24,1.7790082252436345e-40,1.8355689877415156e-83,5.8252584070420158e-26,8.908008685324864e-89,1.9214841341674956e-15,1.6798443350871047e-45,5.9656554215392018e-58,1.3150432252828448e-20,1.7863230074328825e-12,6.3339040320021063e-33,4.2234919417330813e-45,7.086878543326517e-26,0.050000000000000003,2.7702054424600849e-75,4.3346470768599781e-16,1.3168621890590318e-93,2.0891968569647126e-41,2.714391092747452e-30,7.1173218740739788e-74,1.3716466096809764e-52,7.9796491114641567e-12,9.6665712849014846e-60,1.5705091816970565e-66,3.8681701706306841e-23,9.49198299315682e-64,2.2805237453984972e-32,0.00067476383265856947,2.5533392570804098e-07,4.2738893603253077e-36,1.0115717117560344e-20,1.0997191884344004e-88,2.0335205354497081e-75,8.0937580937580941e-07,1.1694822717119916e-50,7.8236381451707937e-63,4.2615773118500526e-13,8.428760254018761e-54,2.4765470989727281e-07,1.2528595690396604e-51,1.1920050111345286e-52,4.5760975500974836e-38,5.1669210371167299e-68,4.5102944485427777e-50,2.0393139509812145e-59,4.8834321474425625e-39,2.2944697397425201e-53,0.0027777777777777779,1.0818318430263199e-65,1.4092517565641709e-17,9.7251225134671721e-33,9.8662198808928361e-52,1.5378143138147712e-58,1.1951423881492818e-50,1.4372721690714715e-16,6.6707647420833448e-77,0.041666666666666664,2.6079358269156578e-91,3.5849032381299729e-73,9.796222889932774e-09,1.0209919139097784e-65,1.5417010990236961e-62,2.4236252803966921e-70,2.8410410101161414e-44,2.1413643060266556e-07,7.8717341689676112e-29,9.7261126672891379e-07,8.8380763300944588e-27,3.7618428812322616e-55,2.5500037006622248e-38,3.1757025101429537e-69,9.6882301770330595e-57,7.1743459851417715e-49,1.2518091969195156e-89,0.5,7.0172483965587417e-08,2.2546169960721078e-61,2.9238141763869509e-64,2.6000037732242291e-40,6.799345856611018e-55,1.5201369676805055e-30,4.4901072785931603e-71,2.0335205354497081e-75,4.2569702012426471e-10,7.7363403412613683e-23,6.2614059953661142e-27,2.8410410101161414e-44,2.3342670401493929e-05,3.8585859266515558e-53,1.0684723400813269e-37,0.0014245014245014246,4.889773840731746e-65,6.0384524764366022e-59,7.6471637318198164e-13,1.5294327463639633e-12,3.7387860122136034e-21,2.7557319223985888e-07,1.7676152660188919e-25,8.1960702693979324e-13,2.500225275790305e-33,2.6877424373490519e-48,7.8033947755896501e-68,1.303939690861799e-65,4.2500061677703749e-41,8.7402624735781865e-11,2.9528660597193821e-28,3.001587633478844e-60,7.8910785999195792e-64,8.0937580937580941e-07,7.8077909357776885e-85,0.20000000000000001,2.4708447572828257e-43,2.3984004248179653e-56,1.6534391534391535e-06,6.0384524764366022e-59,1.0625857093566318e-51,2.5762910614878788e-72,2.9528660597193821e-28,1.7459831574156548e-14,2.5815653026638331e-81,5.6693030037469525e-67,2.3982259643338891e-25,2.0891968569647126e-41,1.2407022535406746e-64,1.1666153671731223e-15,1.3380402193267496e-40,1.1309962886447716e-31,5.281255769557335e-18,5.8065557751791348e-40,5.4405268375411042e-64,1.4439193598023503e-73,0.00058275058275058275,1.0691739058144023e-77,4.2131961794638836e-17,1.6255760898473548e-83,3.0547409579667644e-05,1.9219609710409431e-35,8.0514865374826944e-83,6.0474204840353669e-48,4.3317580794070507e-72,1.3520448991389111e-31,3.0888991094382623e-10,1.6688089459608279e-48,5.8555175344922515e-36,3.2866537502714929e-19,3.0163073641334513e-10,2.4580620618779145e-16,1.4318846690985352e-41,1.0838904113667718e-37,1.6439747083165791e-63,4.0264936106157332e-70,6.9495915321851957e-20,6.598938660692316e-54,5.5353508515227229e-88,1.6212545910300655e-56,7.5728359291546202e-25,6.9639895232157081e-43,4.1697549193111172e-17,8.8734360680353898e-24,8.7049698505259091e-50,4.3592761074918426e-43,4.3971514959683886e-77,1.9078144078144078e-06,2.073742602179219e-54,8.625579098588705e-25,2.1413643060266556e-07,1.1932372242487794e-42,1.9197748458026201e-33,9.0219472986528187e-80,2.9831041182950368e-11,1.0765576583413638e-31,1.4793565278947269e-17,1.252605419272086e-08,1.0278548668927947e-05,8.258936830365401e-09,2.0378179187461264e-70,0.00044326241134751772,6.692764045979571e-74,3.0564231054731501e-54,4.3606899283988519e-31,2.9831041182950368e-12,1.3257012047864892e-60,2.5052108385441718e-07,3.7393075754691817e-68,1.326001924344357e-38,2.073742602179219e-54,0.0002042483660130719,4.2103213101782024e-32,3.3131157190051465e-25,1.805830106183025e-24,3.421809902165882e-57,0.00039682539682539683,4.1523682902255221e-37,4.5145752654575619e-24,1.2899909700735294e-11,1.1635132341971736e-42,1.1729329309563762e-49,6.4765102565906085e-40,1.9779717257566442e-75,1.2796119121896677e-60,0.00014880952380952382,9.7550137023009466e-36,1.9998146846275055e-46,1.2154195815726332e-72,5.338235316330022e-19,4.3701312367890935e-09,1.5031265031265031e-06,9.9960145065959221e-38,1.9548882182606271e-49,3.661791930293148e-40,2.9818071289117606e-30,2.6826881795770034e-17,8.2345191040843218e-05,1.1198926822287716e-49,2.038218097449907e-30,0.002976190476190476,5.0426672242444575e-58,9.8662198808928361e-52,1.6439747083165791e-63,2.4858293310184852e-74,5.0657945394787503e-07,2.714391092747452e-30,5.8864438558517727e-71,3.2799171139539599e-39,9.4567612608441322e-88,2.7557319223985893e-06,1.1745360582569884e-05,0.16666666666666666,6.4804456318100593e-56,2.8859198566263909e-70,2.9427329739988662e-62,8.9251216300887692e-70,4.143200164298662e-14,7.3731884364769077e-22,1.8270230789719791e-81,1.8863570958491241e-09,9.5810677260644688e-57,1.2905560646020923e-32,4.4213502899492595e-40,7.5236857624645231e-55,1.4915520591475184e-13,4.1581237823217011e-76,2.265700227015433e-27,6.0384524764366022e-59,1.128466023336743e-46,1.3216096711738912e-81,5.5114638447971785e-06,6.0900769299065975e-83,5.620349248904227e-56,1.861456969816103e-08,5.4803378430369635e-72,1.2052901255038175e-45,5.3521608773069986e-41,4.5760975500974836e-38,2.5496998273314608e-37,1.966559056555092e-07,1.1634106061350644e-09,5.6141883661455783e-68,2.7557319223985893e-06,1.0597278537067857e-37,7.9112647388010924e-16,1.6479304654393651e-60,1.5666582504633827e-77,0.00059523809523809529,4.1203111850900369e-22,7.6043238124359287e-22,2.4708447572828257e-43,1.0112964068610038e-58,5.9976087039575524e-35,1.483076211580009e-12,7.6043238124359292e-25,1.4999515951468519e-55,0.0032679738562091504,5.9636142578235212e-30,1.0525340445407924e-47,2.0393139509812145e-59,9.1592696238698546e-55,8.0949768626972962e-57,1.5200590119385732e-28,2.0949923912528593e-35,3.8023308307097173e-45,1.7485309295570265e-28,7.6319452862951925e-39,2.1352299341881376e-20,6.0335780868082354e-32,5.1796526232647148e-77,3.3353823710416723e-78,8.1431732782423562e-29,0.00012531328320802005,4.6355825113334095e-32,4.9416895145656521e-44,7.2887046976754668e-41,5.7705363818968852e-72,8.9540484308541921e-72,1.3753111515333021e-45,2.0242492231287748e-12,2.2516098240105077e-89,1.7782258125644706e-76,1.6541009984441386e-39,0.0625,0.0083333333333333332,8.8380763300944588e-27,1.572176494777114e-11,1.8012518198906425e-69,4.4159836309151734e-28,2.4121556368191064e-31,5.6708973395409886e-71,3.5795987686847441e-53,6.6070721165491657e-46,4.0269658440857854e-35,1.0327048539441395e-09,0.030303030303030304,9.5008560480031592e-32,4.4475205631090867e-42,2.505210838544172e-08,5.2258313574916317e-52,2.8070941830727891e-68,1.5951866170609377e-56,1.2293708674519116e-67,2.1367380649154377e-29,6.0067027097604962e-55,2.5315720949662102e-37,1.1475624526441804e-27,2.7734669733344518e-56,1.1820579690740911e-44,9.4318364551245722e-66,1.5204038192543939e-06,1.4518002322880372e-05,0.033333333333333333,7.0172483965587417e-08,3.4982446723439032e-45,1.1694822717119916e-50,5.4995107681328564e-14,3.6025036397812851e-69,0.00017199862401100791,7.864136329328079e-77,1.2291317264899192e-33,2.3097945226157999e-12,4.2704440387748634e-51,5.8833064312661127e-33,1.9197748458026201e-33,7.4516577347652921e-61,3.27008824213495e-25,4.6516191211023469e-28,0.33333333333333331,6.1356093114144501e-71,1.6439747083165791e-63,2.5702483172562305e-26,2.3837004099469048e-14,9.7461783285538076e-11,5.2227436849957836e-92,9.6882301770330595e-57,2.2800655947982816e-71,2.4680431186075772e-18,1.1836617899879369e-60,9.9803041915170097e-82,2.5827645546510374e-45,1.3202389369975716e-63,1.1317993160817419e-10,1.0194674794899278e-34,8.7714425291608526e-64,0.034482758620689655,1.2584314909896305e-05,2.3837004099469048e-14,8.550524320089203e-53,1.4907440240086137e-24,1.8392081087492914e-63,4.998873321216023e-64,3.2292680586391842e-72,1.9766758058262606e-42,2.1288301138277206e-42,5.4174903185490746e-23,3.5546584063228093e-36,1.7064300130837288e-25,3.2261128259696563e-49,4.4130745507894057e-29,1.4909035644558803e-31,5.8885104623094017e-86,9.7550137023009466e-36,2.1737322793929734e-83,2.5647492775324132e-66,1.3657019183221324e-34,3.6597666079466791e-84,4.2474449088162163e-57,1.3716466096809764e-52,2.0634745637297435e-65,0.00014880952380952382,0.00040816326530612246,1.0199670846998593e-53,7.5231068222449539e-48,7.4902838968687326e-16,3.7078235076010381e-05,8.2345191040843218e-05,1.5200590119385732e-28,3.4699797302510845e-81,2.5500037006622248e-38,1.22712186228289e-69,0.0012315270935960591,4.2651948478793763e-81,8.417508417508418e-05,2.6947602763850997e-12,7.2952853848798796e-79,1.7863230074328825e-12,9.4339759550951723e-44,4.2474449088162163e-57,1.1902062063479028e-24,8.430523873356341e-55,2.7036277556072883e-31,2.5487601083294763e-27,2.7557319223985893e-06,5.8873769650376978e-39,5.0583069831959321e-11,1.0841362790208905e-15,1.5171191121008788e-28,1.281511928178976e-59,2.4095387047310156e-24,3.0547409579667644e-05,2.2143947301928841e-68,8.5983595499262929e-19,1.0597278537067857e-37,1.0318946245719701e-08,2.714391092747452e-30,1.4789748569638973e-19,1.483076211580009e-12,5.718702780260403e-19,1.8124068943402034e-78,5.0331686519481598e-31,4.8338988395785993e-58,7.0735364853011916e-07,3.5000476980740274e-73,7.3545216891387197e-12,1.149031242659079e-57,3.7225646981744543e-07,1.1295701458246694e-91,1.2712406515504967e-10,4.6891617976366005e-83,2.6364901898110665e-37,2.0716000821493312e-15,1.6534391534391535e-06,7.8424105279510022e-50,7.117406731291439e-52,2.9540529846206535e-66,7.4509053983970212e-41,4.6433865222952507e-33,1.3955533086419567e-76,1.5086760456073018e-67,1.2289355239246003e-80,5.281255769557335e-18,2.3482908573215976e-38,3.154841299182556e-12,3.9211995733734863e-06,0.083333333333333329,0.125,1.5009328897081945e-14,1.2893919280914345e-66,2.2619925772895435e-32,9.864762295949196e-17,1.9754969380624351e-40,1.7676152660188919e-25,2.9818071289117606e-30,9.1765964781837796e-11,6.5401764842698995e-24,4.6516191211023469e-27,0.16666666666666666,1.5390771693292702e-07,1.6234822238002635e-66,1.0674958653337415e-71,8.428760254018761e-54,4.9049740750612831e-80,9.9336530469562076e-42,1.0278548668927947e-05,1.4036815915184625e-16,1.2309798722626294e-48,1.5132020737441236e-64,4.3988767537376012e-87,4.9045549566647774e-64,2.3615202506902833e-27,2.151120595028411e-66,5.7705363818968852e-72,4.1790478700657253e-32,0.076923076923076927,3.287949416633158e-65,5.547855605263179e-67,1.3628132220545557e-70,1.8203932522006299e-27,2.2893772893772894e-05,1.1931310843078404e-58,4.7584549246354951e-21,1.933314256980297e-60,1.1057833199302909e-68,2.9831041182950368e-11,2.1975444663491534e-37,0.00014619883040935673,2.0272761320318793e-43,5.1669210371167299e-68,6.0900769299065975e-83,9.864762295949196e-18,5.1983225612459059e-70,1.3086030903406797e-54,1.9532903067808887e-71,0.0083333333333333332,3.761553411122477e-48,1.1634106061350644e-09,1.7892192305517099e-84,2.9412640284651144e-82,9.2848356088934447e-39,9.3715241811517366e-16,1.3003941230579933e-14,7.0735364853011916e-07,2.466190573987299e-18,1.0307032501816699e-43,1.0840891763253564e-26,6.4804456318100593e-56,3.1622550710453364e-47,3.2938076416337287e-06,0.00033068783068783067,2.7557319223985888e-07,5.0657945394787503e-07,2.037405766971561e-67,3.9898245557320782e-13,3.0790598609210641e-63,2.9755198340571568e-67,0.00067476383265856947,2.3394727143290988e-60,5.0562909982841991e-48,3.8585859266515558e-53,4.885780763645237e-86,4.7971231608901281e-75,6.2485916515200288e-65,3.6680035763102386e-89,1.1245829017382083e-13,6.5300464630382753e-90,2.145250967771606e-56,1.0537804632083056e-12,1.320756633713324e-42,4.3890554425878583e-82,1.3571955463737261e-29,3.4982446723439032e-45,7.9999703458608216e-31,1.4229204018327215e-07,0.00044326241134751772,3.1794662405941711e-26,7.8878659038074533e-20,1.0691739058144023e-77,1.6868743526073125e-14,5.6753318305408012e-77,8.6381509151265203e-17,0.034482758620689655,1.9355185917263781e-40,3.4396537403293868e-50,6.5300464630382753e-90,1.3943258429124105e-75,1.3680531107447158e-26,1.7305306977378155e-19,0.00040816326530612246,8.9845322293140134e-07,1.4036815915184625e-17,1.2230952418102834e-23,2.9316913915528057e-48,4.2569702012426471e-10,9.172335520078862e-46,3.5118049328283405e-34,5.785605399634358e-47,1.5472680682522736e-24,1.9128916367074268e-81,7.171246145032785e-28,5.8350735080803033e-30,3.2571922810725447e-82,0.023809523809523808,1.7901025978648819e-35,6.1572739723021839e-12,4.9428104780833536e-23,3.3762796099721792e-07,8.2345191040843218e-05,1.8521212447927469e-51,8.5983595499262929e-19,5.3653111274077767e-20,9.8985686575170216e-20,3.5513144265417105e-14,0.00089126559714795004,1.5309537692806173e-53,1.516775049712848e-50,7.5199596022242371e-76,0.045454545454545456,1.5132020737441236e-64,2.1816091212248796e-50,1.7252721361247434e-60,3.1387443462229062e-31,3.2261128259696563e-49,4.5078431560120188e-20,0.00039682539682539683,1.1694822717119916e-50,8.9251216300887692e-70,4.1194549582098783e-29,5.8948659245285129e-11,7.8423991467469723e-09,0.022222222222222223,3.2834943585391421e-46,1.5051456719630082e-30,7.1452920297315307e-14,5.8252584070420158e-26,6.4168576887680578e-80,4.3960341850542429e-39,7.6885062244570245e-62,1.1001098400310266e-90,6.254430542592143e-72,8.6381509151265203e-17,3.6093407842690338e-71,3.2665276569806169e-18,2.3394727143290988e-60,4.8535525468662038e-25,2.4352017477212972e-57,1.7892192305517099e-84,2.9414818539081259e-47,1.3669254317747275e-13,1.099823110115386e-56,2.9294335442345184e-39,1.5619206968586225e-16,2.5107502752649599e-68,2.2371550048972834e-47,0.5,4.998873321216023e-64,0.0013888888888888889,0.0010101010101010101,7.1305811343762012e-10,3.5118049328283409e-35,2.5013080475975055e-15,4.1523682902255221e-37,2.907126618932568e-34,5.1038076055868898e-69,1.5534323737586247e-44,1.5843045127957157e-47,1.2796119121896677e-60,2.819792790857437e-90,4.7715646780945021e-24,1.2217011078859326e-48,1.0396645122491812e-70,6.4492407165236376e-79,6.4469502843844736e-26,4.9591925264495952e-27,3.5118049328283405e-34,8.3992216754355237e-44,2.5674323435553336e-28,2.2151541268643059e-14,3.3533602244712542e-17,3.6640886529539028e-53,4.3593671475318138e-34,2.2516098240105077e-89,2.6885936359955231e-93,8.2917616469558043e-35,8.1431732782423562e-29,6.4108340404879615e-35,1.6059043836821613e-10,1.2256174391283858e-48,4.3593671475318138e-34,3.2064107694359797e-09,5.0743298121315978e-62,1.3256100367922257e-80,2.5500037006622248e-38,0.026315789473684209,8.825426026966464e-12,2.7362813434954155e-33,1.3716466096809764e-52,2.2931024935529246e-52,1.3380402193267496e-40,1.3548630142084647e-38,5.9656554215392018e-58,4.9980072532979611e-38,2.2191891053694638e-46,2.0132674607792638e-29,1.1917518247743806e-50,2.6129156787458159e-52,5.601013672110909e-64,4.1251227999223225e-81,5.0055393884953845e-36,1.5105933873683123e-59,4.8466781123728876e-56,1.1224090943509328e-85,6.78597773186863e-31,5.4326367171923615e-09,1.0525340445407924e-47,2.0289819099594638e-43,6.4239469679064872e-13,2.775002775002775e-07,3.0564231054731501e-54,4.2881708886796232e-46,2.1352299341881376e-20,6.6738102187365307e-49,4.8834321474425625e-39,2.7982570029811491e-14,4.6229891496710217e-19,4.2704440387748634e-51,1.2611848512312892e-78,5.6245067804178701e-29,1.9779717257566442e-75,2.6729347645360054e-77,4.9603174603174603e-05,1.2673873020726547e-24,1.9270852604185938e-08,3.0693450999747088e-07,9.7775056815276679e-13,2.9300980514078119e-17,1.2497165166652979e-23,1.9078144078144078e-06,2.3425073867765224e-45,2.6189545534855101e-85,3.2938124217394208e-47,0.125,3.5639130193813405e-79,5.0309647832867649e-10,1.9126542768419373e-48,0.03125,7.3274156990958837e-54,3.5513144265417105e-14,1.933314256980297e-60,0.10000000000000001,8.9540484308541921e-72,1.2052901255038175e-45,9.6684840332365368e-69,5.8042331528690633e-34,1.7485309295570265e-28,1.4036815915184625e-16,1.7081776155099454e-50,6.3815173882151128e-18,1.308467089124265e-55,0.0083333333333333332,9.1209378116513842e-35,4.7510911362468697e-34,1.8879124899215931e-19,0.5,1.5590246168289115e-55,1.3876216033900038e-56,2.9540529846206535e-66,1.66681685052687e-34,5.1669210371167299e-68,2.8703893600948626e-25,1.3993804482504963e-13,1.0421588705705775e-68,5.2319840456841573e-34,1.0972308205712216e-76,0.0014245014245014246,1.4036815915184625e-17,5.3749570003439971e-07,6.2612650406697659e-44,1.106617424333836e-22,2.1590490806139513e-41,2.8114572543455206e-15,2.2805237453984972e-32,7.2729580518455088e-63,4.6399542167527126e-58,8.3992216754355237e-44,1.7153349484395005e-74,2.7754459199317882e-30,8.0432186986135532e-56,0.050000000000000003,4.17535139757362e-09,5.2118958072049876e-48,1.6534391534391535e-06,2.2191891053694638e-46,1.451380916168488e-46,5.785605399634358e-47,1.0131053674640246e-29,2.6476278080899391e-10,3.0680889377293957e-25,5.0562909982841991e-48,3.2798892370698378e-30,1.0269729374221334e-29,7.9112647388010924e-16,9.6775929586318907e-41,4.1613153583754226e-61,9.3754700860701152e-12,9.63613937711995e-06,5.0562909982841991e-48,0.00052854122621564484,1.8035394690324167e-85,2.5702483172562305e-26,0.00064102564102564103,4.1144136137717652e-07,2.2174212942466447e-24,7.7363515685486072e-65,3.5012875703708026e-60,6.254430542592143e-72,5.6199056780588046e-66,1.3224513403865587e-25,2.4814176559545445e-88,1.0999021536265713e-15,1.2212847912428004e-38,2.2187674594394434e-39,6.9422452151970434e-45,4.5601770358157191e-27,3.146328773517747e-64,4.5854990305105413e-67,9.4369635951936948e-76,1.4909035644558803e-31,2.6395754642769263e-55,3.3353823710416723e-78,1.9358340969031383e-32,4.4901072785931603e-71,7.4509053983970212e-41,4.4685794968823919e-88,2.3423372807333067e-83,1.0840670942657574e-30,1.0676149670940688e-19,8.1663825290072804e-23,5.718702780260403e-19,1.4437929799728131e-79,1.1931310843078405e-59,1.1002616186577782e-19,7.5728359291546202e-25,3.0833364166697499e-08,9.5868895490850783e-73,2.3482908573215976e-38,1.8806822464352871e-66,2.3235985824874404e-80,1.0278548668927947e-05,1.6074607735699763e-36,1.3371315172968738e-61,3.2866537502714929e-19,2.7852049910873439e-05,4.7054394880481834e-06,7.5399752576318108e-33,1.4877599170285782e-66,7.2729580518455088e-63,2.3226223100716539e-39,6.3815173882151128e-18,4.6516191211023469e-28,4.4991211295358681e-78,1.3483952091480052e-60,7.3914043141554821e-26,1.1931310843078404e-58,4.4130745507894057e-29,2.8689061316104508e-29,3.287949416633158e-65,7.2147743874307448e-60,0.0083333333333333332,2.08767569878681e-09,1.1317993160817419e-10,9.6775288582227227e-87,1.825266685554007e-58,1.1575589016044904e-65,0.022727272727272728,7.1452920297315307e-14,4.8216994604881683e-54,2.6364043985362671e-40,2.9772050123881378e-15,1.3766135076290029e-42,4.4475205631090867e-42,4.152913649098452e-84,2.6491632943699645e-69,1.2309798722626294e-48,2.1413643060266556e-07,7.4835934107714284e-57,3.2849177880341439e-74,1.8521212447927469e-51,1.8355689877415156e-83,8.9540484308541919e-71,2.7852049910873439e-05,1.366011711566322e-12,1.0601970300816469e-23,1.4909035644558803e-31,2.5595033334971416e-09,1.2673873020726547e-24,1.1198926822287716e-49,1.8353584512186859e-64,1.1694822717119916e-50,1.0691739058144023e-77,3.21548827220963e-54,4.2234919417330813e-45,6.9948257293071765e-25,7.5227289857411476e-68,5.463023189863143e-55,9.7684001543149277e-26,3.21548827220963e-54,9.6082939312896144e-49,1.847828768595815e-42,3.3962001700055058e-34,8.0937580937580941e-07,3.0818933108425054e-74,1.0209919139097784e-65,5.3764405325732727e-42,1.572176494777114e-11,4.3615569637475501e-57,4.1203111850900369e-22,1.7051917222081714e-10,0.007575757575757576,4.7819172258536333e-23,3.288604772548154e-36,1.2256174391283858e-48,5.8477069971322843e-08,2.0819117733687086e-17,1.3520448991389111e-31,0.00075075075075075074,2.500225275790305e-33,1.1020427836554655e-26,2.5017722170368573e-73,8.9540484308541919e-71,6.4804456318100593e-56,3.5344923541440759e-24,7.3545216891387197e-12,6.9678669302149617e-38,5.0436116031124176e-48,8.4470093215315294e-32,1.4234813462582878e-51,0.00044326241134751772,6.8663769393306884e-63,2.4795962632247976e-27,0.00084033613445378156,7.6942478325972393e-67,3.866628513960594e-60,7.8918098367593568e-16,7.95772854596384e-07,4.1050903119868638e-05,1.805830106183025e-24,1.8743048362303472e-14,7.2654601791530714e-44,9.6775929586318907e-41,6.8740060121645982e-23,2.7754459199317882e-30,4.6975058552139025e-19,2.1413913632561788e-60,7.4387995851428921e-68,0.052631578947368418,0.023809523809523808,1.0609962334456977e-61,4.7819172258536333e-23,2.3209021023784102e-22,2.5674323435553336e-28,0.007575757575757576,3.5186197450590768e-75,8.8967913924505741e-22,1.5086760456073018e-67,1.8641069662972643e-58,9.8820470970166762e-49,2.1832954757232804e-68,9.864762295949196e-18,6.5178027539285416e-94,4.4762530168631126e-32]}
},{}],95:[function(require,module,exports){
module.exports={"z":[8.5577188478782776e-19,9.4483507517725234e-19,6.7079710750840609e-19,9.1629395098425451e-19,5.2359204553067688e-19,6.4000640297308573e-19,2.9881540988571945e-19,4.3595275934785611e-19,7.0396907767280944e-19,3.188166595064104e-19,3.8161087664775555e-19,7.5531754363328225e-19,5.6768499710597101e-19,6.2460054107941691e-19,8.8786095613613728e-19,2.0178252155892552e-19,8.4294928610324863e-19,3.8816305506043139e-19,8.9879855816252536e-19,9.3477667775005108e-20,9.3900309386663138e-19,5.189328549895436e-19,8.1543515576049692e-19,9.6142439707182352e-19,1.3578275684267283e-21,6.9467409700155266e-19,3.0906954780220989e-21,4.0409812727011744e-19,8.7468812009319672e-20,7.9715215298347181e-19,2.6072735036723319e-19,7.0610185922123498e-19,2.2798671387135984e-20,7.748464029282332e-19,4.2408481473103169e-19,8.5941682313568899e-19,3.4106497396714986e-19,2.2738733794540166e-19,5.4135393165051937e-19,9.7242362354882059e-19,9.2616908391937616e-19,8.1444121897220616e-21,2.9849944589659573e-19,5.9354742104187612e-19,3.3808479038998485e-19,9.020674282219261e-19,8.594801060389728e-19,2.5049173692241314e-19,3.404783089645207e-19,3.0421430571004749e-19,1.3812039862386883e-19,6.8782688560895629e-19,5.0779895787127318e-19,6.8199790315702562e-20,8.5665648197755221e-19,4.8871322069317103e-21,3.8431361503899099e-19,6.3166458765044811e-19,6.9569092476740489e-19,5.8917167317122226e-19,6.2790417787618943e-19,1.447555145714432e-19,4.5038815541192897e-19,7.9522875370457771e-19,4.7361794416792695e-19,1.2854782165959478e-19,9.4970635976642378e-19,3.4408971667289734e-20,8.3497565006837254e-20,3.6903609056025748e-20,2.7982891583815218e-19,8.7112229433842007e-19,4.4700730801559991e-19,4.5829721610061831e-19,5.8757126587443061e-19,9.1539183398708711e-20,8.7763414462096998e-19,7.3234632844105368e-20,4.6910052001476291e-19,2.8757000807672744e-20,4.3741847155615693e-19,9.9390816292725505e-19,7.4618494417518379e-19,3.1124011520296336e-19,4.6791046159341937e-19,6.2813736568205059e-19,8.6082735261879864e-19,2.5924637541174892e-19,4.66512015555054e-19,3.8655109959654512e-19,4.9810448638163515e-19,5.6821530079469086e-19,4.874306484125555e-19,9.9319426692090941e-19,2.2946877358481292e-19,5.9362260042689748e-19,8.5552233271300795e-20,2.5927162286825481e-19,6.7383312154561289e-20,2.5769893685355783e-19,8.8839093409478669e-19,8.4526658873073761e-19,2.3316768603399399e-19,1.3599915662780405e-20,8.6159575893543668e-19,3.5953508806414906e-19,7.1173509210348137e-19,1.213915788102895e-19,8.7281299079768361e-19,8.9509164751507343e-19,9.3800201034173374e-19,2.281930856406689e-19,1.3968927506357432e-19,5.9260465949773796e-19,3.9390014670789246e-19,5.0077258166857069e-19,9.8056283150799578e-19,1.6560542839579286e-19,6.4479402708821003e-19,1.9573014695197344e-19,8.9640977303497509e-19,9.5528808538801973e-19,4.8223040509037674e-19,3.9024595753289761e-19,1.4093075413256885e-20,5.3240388096310203e-19,6.2288034288212665e-19,6.4589569251984362e-19,2.3109535919502382e-19,5.8811152656562635e-19,5.2743396582081917e-19,1.5391638968139888e-19,7.249919590540231e-19,8.7163241114467398e-19,6.0741579229943458e-19,4.3879574723541739e-19,5.8836644794791938e-19,5.860737103503198e-19,4.3343484238721436e-19,4.6528050140477718e-19,2.4417289835400881e-19,5.6988664437085395e-21,4.2896035825833683e-19,8.616037783212961e-20,1.0177451185882092e-20,9.5695397793315356e-19,6.0882144561037422e-19,6.4840178960002961e-19,9.5797518873587262e-19,2.4022180167958142e-19,9.5446524908766156e-20,5.3632588987238711e-19,3.5590563435107472e-20,5.5512342718429865e-19,8.8623511395417157e-19,1.1596942832693458e-19,2.469413601793349e-19,9.6723578008823096e-19,8.9150553103536369e-21,5.9531508991494782e-19,8.1492027360945945e-19,3.3489907882176341e-19,1.4049943792633712e-19,1.5885562403127553e-19,8.7986644078046088e-19,5.5836650938726964e-19,9.5376784680411225e-20,5.3301223833113912e-19,3.5256010224111379e-19,7.7304237708449365e-19,5.9342056955210866e-19,3.5690707294270399e-19,5.8518163464032119e-19,9.8391407681629065e-19,6.6768176830373704e-19,4.1587580135092141e-19,6.480271148029715e-19,6.5171281341463335e-20,4.3336906726472081e-19,6.0366482730023569e-19,1.3975876243785025e-19,1.1440167645923794e-19,7.5192951131612067e-19,1.7657363391481341e-19,2.4178679543547335e-19,9.5681453123688708e-20,6.5045932400971658e-19,4.1942486958578231e-19,8.5737406159751126e-19,4.9133591144345709e-19,8.4370464086532595e-20,9.3396967905573557e-19,9.7208915720693774e-19,6.9852219964377584e-19,3.1459936639294032e-20,7.3770942864939573e-20,8.3540454902686182e-19,7.2157031670212754e-19,8.3571334672160455e-19,8.5076586459763351e-19,4.9857502803206445e-20,5.5436244281008839e-19,5.458862108644098e-19,7.0386058860458435e-19,9.4316983432509007e-19,9.9668266740627594e-19,3.2147307065315545e-19,5.1135184243321422e-20,8.0646680528298027e-19,1.1256301705725491e-19,6.0139875602908437e-19,5.5206012446433306e-19,7.8962046490050861e-19,8.1111746211536235e-19,7.9918503016233452e-19,6.5524842310696848e-19,4.9564764602109793e-20,2.2476009768433869e-19,2.8319863928481938e-19,2.0683563291095198e-19,6.5345682739280173e-19,2.6068676775321366e-19,4.8965534381568439e-19,9.5304281241260481e-19,9.7285223635844893e-19,9.3130749184638261e-19,7.4848990980535755e-19,1.4804847864434123e-19,5.6784114241600039e-19,9.8285051505081364e-19,2.989641637541354e-19,7.7264562854543336e-19,2.5610977900214496e-19,9.3269735132344078e-19,8.8656379445455971e-19,2.1297693392261865e-19,4.4680086290463808e-19,6.7114725569263107e-19,8.159872533287854e-19,2.143774754367769e-19,9.8337301518768078e-20,2.1781571488827467e-19,8.5959345614537601e-19,3.2912476710043848e-19,2.7629003161564473e-20,7.0228639151901007e-19,8.9915642980486157e-19,7.2247060923837134e-19,8.9993549883365637e-19,2.2716608946211638e-19,5.2410600334405902e-19,8.4198861662298445e-19,1.2019951525144279e-19,4.9420569883659484e-19,1.7779409838840366e-19,5.6209658272564411e-20,7.0610759430564942e-19,5.8491509407758712e-20,8.3135975594632331e-19,6.5290324925445024e-19,3.4833820536732675e-20,2.5416026869788765e-19,7.5783871067687872e-19,8.9844987378455706e-19,9.5711217378266163e-19,9.7244783700443809e-19,3.428705162368715e-19,5.2106682793237273e-19,6.3824370922520762e-19,5.8927622344344854e-19,3.4300580853596334e-19,7.7345224632881591e-19,2.1647139522247018e-19,9.7260851389728497e-19,7.8620062512345614e-19,9.1221507685258992e-19,7.2308995947241784e-19,5.0980510492809118e-19,2.788389096967876e-19,2.7858084067702293e-19,5.8243143069557852e-19,7.6509303413331515e-20,4.2100578290410341e-19,4.5011529582552614e-19,9.2068708967417486e-20,6.4046950335614386e-19,2.4027318926528098e-20,9.7232337715104224e-19,4.9114580336026853e-19,9.3113876716233802e-19,2.7826702129095796e-19,2.22115428885445e-19,3.3975716168060902e-19,6.4407896017655734e-19,2.8734960500150919e-19,7.3080067429691558e-19,1.7090322845615448e-19,9.4303451431915164e-19,3.9926331234164538e-19,9.1660342412069444e-19,6.9764957483857874e-19,1.8599576316773892e-20,2.0367643912322821e-19,6.3859123014844961e-19,6.6632649046368906e-19,3.9128018729388715e-19,4.4306608452461666e-19,8.7422327953390781e-19,4.3329526693560184e-19,9.8726583411917094e-20,1.7523944121785464e-19,8.1418944429606205e-19,1.9320231489837172e-19,3.2882728707045318e-19,6.1642133421264592e-19,6.2436277023516604e-19,2.6901060622185471e-19,5.9666490252129737e-19,5.5967793590389199e-19,3.9322649501264097e-19,9.4478398840874449e-19,8.2403369061648854e-19,7.1447163540869957e-19,6.7066732444800445e-19,6.7921965057030327e-19,9.5992656517773868e-19,9.5938057545572518e-19,9.1035639261826875e-19,7.7533430722542112e-19,7.9157840041443707e-19,6.0772696742787965e-19,6.640855188015849e-19,9.4800236052833502e-19,8.0836197780445225e-19,5.9641625499352819e-20,2.1185902296565474e-19,2.6871234737336636e-19,4.6403936552815138e-19,9.8668003873899582e-19,7.6597365760244435e-19,7.7220673579722645e-19,1.2796492828056217e-19,4.7535429918207228e-19,1.353657222352922e-19,6.8089955486357221e-19,3.426613574847579e-19,4.1693475306965414e-19,5.3113223239779472e-19,3.8014920754358176e-19,3.1333381775766612e-19,2.1327038994058968e-19,7.1350559359416373e-20,3.8293798826634889e-19,8.6647338233888159e-19,2.9667756520211697e-20,2.0255471719428898e-19,4.7232106747105717e-19,2.4212447111494841e-19,3.3337268629111351e-19,6.0542861628346145e-19,9.7584480675868692e-19,4.8824781482107943e-19,5.5544353765435525e-19,7.8582407464273282e-19,8.4630363527685409e-19,4.6144604729488493e-19,4.0806349716149273e-19,9.8365195095539104e-20,4.6201816666871311e-19,2.3646375397220257e-19,8.2630671816878028e-19,7.0313829788938172e-19,9.9120319727808235e-19,4.7271288465708495e-19,5.2394765475764874e-19,7.51024556811899e-20,9.2543688928708432e-19,7.337197377346457e-19,7.3902186355553569e-19,1.9580338313244285e-19,5.6743004987947643e-19,9.3830761080607771e-19,9.6877765934914366e-19,8.5734686977230014e-19,8.2449941965751353e-19,8.6541389813646682e-19,9.59609280107543e-19,1.9481410761363806e-19,6.4634606754407295e-19,4.0563604608178142e-19,3.795734848827124e-19,8.2483664341270933e-19,4.7657467820681637e-19,8.9008284802548593e-19,9.11889810115099e-19,8.2019247300922878e-19,1.4853854896500709e-20,7.7320368471555422e-19,1.5669385041110219e-19,1.6732152737677098e-19,4.7156787570565943e-19,9.8562077363021677e-19,5.4299169266596439e-19,6.0499964840710172e-19,5.9691029600799086e-20,7.4879761552438145e-19,6.5803030342794958e-19,5.7654685154557236e-19,8.8963530445471411e-19,1.6812582430429759e-19,1.0963261104188861e-19,3.0750265438109636e-19,4.3777311523444955e-19,7.6983972336165615e-19,2.8023008862510326e-19,9.4433143665082765e-19,9.8524631420150401e-19,5.7757857441902169e-19,6.087587096262724e-19,5.9864059975370768e-19,2.5374920875765385e-19,3.439574711956084e-20,1.3261473062448204e-19,3.3692782931029797e-19,5.450048961210996e-19,2.4822391173802316e-19,8.2780393073335294e-19,9.114948904607446e-19,8.3700627088546762e-19,1.843569986522198e-20,8.3334865025244655e-19,3.683419362641871e-20,2.0371543196961286e-19,7.4946273537352689e-19,5.4441770142875619e-19,6.7615767265670005e-19,8.7494272389449183e-19,2.1555067878216506e-19,1.2100008153356612e-19,6.5349697927013041e-19,8.5635076626203957e-19,5.2412572945468136e-19,8.9977601682767286e-19,9.740085422527046e-19,2.1786511712707581e-19,9.4519147998653364e-19,7.6979080680757761e-20,8.83480227785185e-19,4.7421516454778617e-19,4.2303225793875756e-19,8.3502747095189992e-19,2.6850430178456011e-19,4.6939350082539029e-19,3.8201842946000402e-19,4.1376994131132961e-19,1.6076528280973437e-19,5.0274626235477635e-19,2.9443535790778699e-19,1.2543996167369187e-19,4.315646055620164e-19,1.3228532345965506e-19,8.2667856849730017e-19,8.704753634519875e-19,7.8920694859698425e-19,6.0295017855241899e-19,4.3152735196053986e-19,2.6530172536149623e-19,9.0541934780776506e-19,8.6480258079245691e-19,4.6377989975735546e-19,5.8109455043450004e-20,4.5813293196260936e-19,4.5775388204492633e-19,4.4157506106421351e-19,7.22209646832198e-19,5.7072588475421074e-19,3.3899914985522629e-19,9.211534229107202e-19,4.0121985436417165e-19,6.2513474375009544e-19,5.2697975444607441e-19,4.1592709254473448e-20,8.9423571084626033e-19,8.9188385754823687e-19,7.7836066461168238e-19,1.2339686113409698e-19,6.9367603864520794e-20,2.704025059938431e-20,2.7878452953882516e-19,3.3067634096369149e-20,3.7936983630061152e-19,2.8329929034225646e-19,8.6467254674062142e-19,6.3950588577426972e-19,4.1996036563068633e-19,6.3234474440105261e-19,2.3987747379578651e-19,4.9046079395338898e-19,5.9765451727434993e-19,3.2198264845646919e-19,4.7940440080128615e-19,8.4465442947112029e-19,8.9854750409722336e-19,1.9639658788219095e-19,9.3470923858694746e-19,2.5340306991711259e-19,8.1788683310151101e-19,5.9524177410639822e-19,7.0890897861681879e-19,5.0700233434326949e-19,7.4322056816890844e-19,3.6255707824602725e-19,8.9970978302881124e-19,8.6874539684504282e-19,6.5239808056503534e-20,3.8074687914922835e-19,3.3591117034666244e-19,2.2785991267301145e-19,4.3350737541913987e-21,5.9626795002259315e-19,8.2809560117311779e-19,4.2150024115107957e-19,5.0743537768721583e-19,4.4845507759600883e-19,3.6616243934258823e-19,2.5887221028096974e-19,2.2663971292786301e-19,9.7678890055976809e-19,5.3483170480467379e-19,9.2445132392458615e-19,2.8948487201705576e-19,5.7190990541130308e-20,6.8370893830433495e-20,5.1641626656055454e-19,8.4970748750492941e-20,4.1645893757231537e-19,6.8339470541104684e-20,1.4567416836507621e-19,4.0981649910099806e-19,4.1289432509802283e-19,1.2338137812912465e-19,8.1106447591446346e-19,4.4301659357734029e-19,5.3342682286165659e-19,8.9893973944708714e-19,1.0426593222655356e-19,3.5363900428637864e-19,3.5185932531021537e-19,1.2017812044359744e-19,1.6165269701741638e-19,5.6911101960577072e-19,8.1480472371913494e-19,8.7503272341564303e-19,4.5842199935577812e-19,3.4857498016208412e-19,4.6453639958053831e-19,4.1921009775251155e-20,3.4331905422732237e-20,1.4233971689827741e-19,7.40467488532886e-19,7.6592840021476153e-20,2.7819186984561386e-19,7.4052658746950335e-19,3.3955411682836713e-19,4.5652513043023652e-19,3.6366694094613198e-19,6.682493116240949e-19,8.3920592837966989e-19,6.9924607267603282e-19,5.8036800124682493e-19,5.7135721179656691e-19,9.2350100935436792e-19,6.2869334104470909e-19,9.6585225011222067e-19,8.7776392325758941e-19,7.4594887066632515e-19,6.6235173819586636e-19,6.2972294329665603e-19,8.7541361758485451e-19,4.6109686139971019e-20,4.6751702157780536e-19,6.9800105411559351e-20,1.4133603102527559e-19,6.0789075586944825e-19,6.8134459201246508e-20,4.827120248228312e-20,7.1424240991473198e-19,9.8036684095859533e-20,3.0798602593131364e-19,9.5846448722295468e-19,6.7116397060453895e-19,3.985821956302971e-19,6.5242083882912994e-19,2.3023822996765375e-19,5.3104883432388313e-19,5.3971884492784743e-19,7.1510703349486003e-19,7.9960435861721646e-20,5.0481062079779806e-19,8.9242250309325761e-19,4.8799935868009927e-19,1.6402922617271544e-19,4.978383101988584e-19,7.4936864874325699e-19,9.3597555649466824e-19,2.3074755445122719e-19,3.8928168732672934e-19,1.6966332681477071e-20,1.1714515881612899e-19,9.9013876146636904e-19,2.4042355758138003e-19,1.7170506180264056e-19,6.8490849877707667e-19,3.7024204619228841e-20,8.3925361186265951e-19,4.2908557015471161e-19,9.7014463087543845e-19,4.5896827010437846e-19,2.1516961161978544e-19,5.651970922481269e-19,7.6034335023723549e-19,4.5617277151905e-19,5.8410284877754753e-19,4.262702846899629e-19,4.0295157581567765e-19,2.3562777158804241e-19,5.1004033675417309e-19,3.2217326783575118e-19,4.9564421712420883e-19,9.8192941700108357e-19,6.5136834909208127e-19,2.5732389884069562e-20,7.4370614672079683e-19,3.0930911423638468e-20,3.0195346567779782e-19,5.8797522773966193e-19,8.961193985305727e-20,3.4451229008845989e-19,8.2596548134461052e-19,4.6545902127400044e-19,3.8958701095543806e-19,1.9578539347276094e-19,7.7530485275201508e-19,9.1311701131053278e-19,1.7936909804120662e-19,4.4243085151538253e-19,1.0936121107079089e-19,9.9653040757402786e-20,9.051583386026324e-19,6.1891538649797447e-19,8.7635100446641456e-19,6.7699712351895871e-19,9.997925662901253e-19,4.7106814803555609e-19,8.6425468837842355e-19,3.7593504646793012e-19,3.6877525039017203e-20,2.5521076284348966e-19,5.4468243592418735e-19,8.4770448366180072e-19,9.9761618045158683e-19,3.8871327554807069e-19,5.1100815087556839e-19,4.5237789023667574e-19,8.7351217190735044e-19,6.3442885852418849e-19,7.022146973758937e-20,4.7382509987801313e-19,9.8753873724490407e-19,5.6904362724162645e-19,9.2271343269385395e-19,1.0884699830785395e-19,5.6426091818138958e-19,6.278728623874486e-19,4.3146205437369649e-19,5.6238460727036e-19,3.3784456294961278e-19,9.6587406750768426e-19,7.2072343365289279e-19,2.0300159230828288e-21,1.3655570102855565e-20,1.3210538565181196e-19,3.7406019610352819e-19,2.0961309806443753e-19,9.226852154824884e-19,9.4021606259047997e-19,5.4647964402101941e-19,7.5672862166538844e-19,4.7388686449266971e-19,9.871621930506082e-19,4.9653731449507179e-19,7.4825544189661744e-19,3.0897107883356512e-19,5.3897033608518542e-19,9.5083755301311622e-19,8.4469297272153201e-19,9.8199328267946845e-19,7.0042603416368366e-20,5.1356310257688164e-19,9.4211361417546874e-19,9.925898211076857e-19,2.712539713829756e-19,4.5584370335564021e-19,1.4306859578937293e-20,4.2604088457301261e-19,6.845611007884145e-20,2.1321477741003038e-19,1.8627820792607964e-19,1.9324948452413084e-19,2.003977878484875e-19,8.327542422339321e-19,8.7649135245010258e-19,7.2663710196502509e-19,5.8948755147866909e-19,5.2974569634534422e-19,4.5381657104007907e-19,8.2908073486760264e-19,9.1572443512268367e-19,5.1187443640083076e-19,1.9551241979934277e-19,5.5196184432134033e-19,9.4697053125128155e-19,2.1328488923609259e-19,8.9153437619097544e-19,5.8782062260434037e-19,9.3657379201613369e-19,1.4276322419755161e-19,7.4817944364622237e-19,5.2223530597984796e-20,2.5283648073673252e-19,6.8330790963955225e-19,9.1677901567891253e-19,6.0855947947129607e-19,5.453140307217837e-19,2.1965593728236858e-19,5.0804360024631025e-19,4.0627994225360458e-19,7.8765760641545063e-19,6.2990794563665987e-19,1.9516960717737677e-19,5.5530762439593677e-19,7.3172697913832967e-19,1.2757905921898783e-19,8.4714667988009759e-19,1.6919833025895061e-19,6.5620696218684323e-19,9.9941366352140917e-22,6.2895268411375589e-19,4.1816246882081037e-19,8.1894335150718697e-19,4.8848567367531365e-19,9.793339876923711e-19,1.5986883826553824e-19,9.0591293410398064e-19,6.6683857655152684e-19,7.777254355605692e-19,1.7920374404639007e-20,2.1898103714920582e-19,1.1967535805888476e-19,4.496026360429824e-19,9.5212530856952075e-19,7.2890242538414901e-19,9.7585396654903901e-19,8.3829688187688597e-19,3.0914542498067026e-20,1.4224158134311439e-19,4.9388184095732867e-19,9.6903727110475317e-19,8.6272212211042651e-19,9.3411860219202948e-19,2.4287616461515428e-19,2.2521141101606193e-19,8.342701608780772e-19,9.1252523963339642e-19,8.1359119433909656e-19,3.6512384121306242e-19,6.2897311127744621e-19,2.1387126762419941e-21,2.2381963208317759e-21,9.2564791929908102e-19,3.7972393888048829e-19,4.5735808275640011e-19,9.0440569608472294e-19,7.7347222366370268e-19,6.8035166570916777e-19,7.2599895414896311e-19,3.7882312783040109e-19,9.1991350846365107e-19,6.3195471279323108e-19,4.6936457348056145e-19,2.4326952476985754e-19,5.9764753445051612e-19,5.7141307042911654e-19,2.2017633449286224e-19,9.817287710029632e-19,5.2849743375554683e-19,8.4968202514573938e-19,9.9951514042913926e-20,2.8344418411143124e-19,6.1799582978710532e-19,6.8245766637846832e-19,1.7869464051909745e-19,3.5812452668324114e-19,8.8946970575489119e-19,9.8692676681093882e-19,7.6665819436311725e-19,8.3986289799213412e-20,7.9953170521184805e-19,2.503058898728341e-19,3.7249363027513028e-19,8.1134661752730614e-19,3.2807008526287974e-19,8.4423107793554675e-20,1.9322461821138861e-19,5.3125396580435342e-19,4.4264385942369699e-21,8.0062297778204089e-19,2.4582926672883333e-19,7.3882323806174102e-19,9.2423950182274e-19,1.416629848536104e-19,3.5790479322895412e-19,4.378942565526814e-19,4.0025822399184112e-19,3.503803755156696e-19,5.2112971968017519e-19,4.7849749331362552e-19,9.2756026308052246e-19,5.8740340033546093e-19,7.8413082566112289e-19,1.4580569439567627e-19,1.4182461868040265e-19,9.0533060976304124e-19,1.9319886434823276e-19,6.4019424468278888e-19,4.898186337668449e-19,1.629395759664476e-19,8.0060402629897008e-20,5.6591059220954781e-19,7.7537969825789341e-19,9.3161614029668273e-19,2.7321587200276557e-19,7.8310188418254263e-19,6.2067146110348411e-19,6.8568713730201134e-19,6.4414466521702709e-19,4.6621928736567503e-19,1.8016818840987981e-19,2.6031809882260861e-19,3.5764826158992951e-19,5.6926817074418074e-19,5.4467282281257212e-19,2.4877066724002365e-19,1.6589159751310946e-19,3.193015912547708e-19,1.6071886522695422e-19,9.1080223722383378e-19,2.6548616890795531e-19,8.8522003870457417e-19,6.823366486933083e-19,7.9458942683413627e-19,2.0436897408217192e-19,9.2580980272032326e-19,8.7805637298151861e-19,1.7883994849398735e-19,8.687701849266887e-19,5.1754115149378776e-19,6.2809560215100648e-20,6.2700532143935562e-19,1.237864443100989e-20,9.1318234615027915e-19,7.1652950881980364e-19,6.6396825620904569e-19,4.9437207938171929e-19,3.8919282448478044e-19,4.5597469503991313e-19,7.4000758328475063e-19,2.8045096853747968e-19,8.1763486214913433e-19,2.0370460534468295e-19,6.0034479852765807e-19,1.5677880379371346e-19,8.4997060243040333e-20,8.8422223529778419e-19,9.2235800530761496e-19,3.0892860307358209e-19,5.3597811842337253e-20,9.9755204212851838e-19,5.2702495059929796e-19,7.4766358151100581e-19,1.1885327380150557e-19,7.5325805414468057e-19,3.8014299352653327e-19,4.6527384407818323e-19,8.1283252895809712e-19,8.2577294646762314e-19,2.4409591872245077e-19,2.0211204909719528e-19,8.8442265964113185e-19,8.952581610064954e-19,7.1264679334126418e-19,6.5905538341030481e-19,3.7814844353124503e-19,2.0613394770771266e-19,2.4891961156390611e-19,6.4251797203905885e-19,2.5285374582745136e-19,2.0230605523101986e-19,7.6724360091611752e-19,7.9958460526540884e-20,4.9861885141581303e-20,9.2483778088353576e-19,6.8528856895864018e-19,5.6884217285551135e-19,6.2027812330052261e-19,2.8321387036703529e-19,7.4668462667614226e-19,5.6692299502901735e-19,9.7725564334541573e-19,7.961227134801448e-19,3.8391351141035558e-19,4.1780702979303899e-19,2.6020560227334499e-19,7.5541937141679233e-19,8.7746953568421319e-19,5.1302989455871283e-19,8.0609598220326015e-19,4.5672445208765568e-19,4.6112108021043241e-19,6.6093800775706777e-19,9.0961687732487921e-20,8.8234015507623558e-20,5.6426882487721746e-19,7.0939762936905033e-19,1.8738289084285499e-19,6.4760186662897475e-19,5.3168958961032332e-19,2.2005185787566009e-19,3.5503331804648045e-19,8.1271635042503484e-19,3.1478349934332074e-19,8.2015960011631253e-19,7.2674146899953492e-19,7.9144914611242719e-19,5.1577286212705077e-19,1.8274983251467348e-19,7.9064489621669061e-19,8.5260473284870395e-19,2.0449258363805712e-19,6.6285428637638696e-19,6.7810608050785964e-19,7.3067555436864506e-20,5.2485547494143252e-20,2.857226689811796e-19,8.0117236613295982e-19,2.1268731495365501e-19,6.7856863792985683e-19,9.9438091623596854e-19,9.4600894674658782e-19,2.7685959637165069e-19,9.1558143030852082e-20,9.1655909968540071e-19,9.0843837568536399e-19,1.2702511949464679e-19,5.0995303899981089e-19,1.9980870652943852e-20,6.14903561770916e-19,4.5219820388592782e-19,3.1607119785621763e-19,4.691451138351113e-19,7.7487481990829118e-20,7.1744190622121104e-19,8.5061406344175345e-19,3.4385955706238747e-19,1.4452690817415714e-19,8.5496697342023259e-20,3.7048579007387162e-19,3.4630057914182545e-19,6.2239143531769517e-19,7.4829559074714784e-20,9.9755189660936595e-19,9.0641619684174663e-19,5.1734413555823267e-19,1.5836613043211402e-19,9.9051121575757875e-19,8.5599451512098319e-19,2.2653445624746382e-19,8.7794573744758978e-19,3.980051847174764e-19,8.535375846549869e-19,6.9656868698075416e-19,9.0218974486924723e-19,6.4640752971172334e-20,8.7004634412005554e-19,7.4766157846897848e-19,8.9970880234614022e-19,4.204004330094904e-19,7.302884249947966e-19,8.1131741986610004e-19,8.3116872282698758e-19],"delta":[114.50197997386567,297.8837372798007,96.401276641059667,272.31537077366374,295.82926764409058,260.53875146945938,215.73609187686816,117.67965615238063,124.54182328586467,190.76362959854305,30.490440910914913,107.09861621330492,220.63317727134563,258.58943219762295,191.5545820267871,100.07447533472441,23.078719357959926,278.10448577650823,37.031943035311997,90.675925353076309,294.49726450466551,292.27689907723106,149.54302654019557,199.21042922721244,7.7016816469840705,232.76520550996065,17.095633467892185,60.025135063799098,43.121265582973137,15.60643588588573,268.14881999418139,45.291301652323455,140.2802018718794,261.25851935707033,168.69616644061171,38.606732124928385,148.8424466624856,162.75258533004671,21.267860904801637,77.524946226039901,269.39631715393625,139.8713199829217,87.281028510769829,42.160662256414071,81.44499869318679,61.354323404841125,178.66406005853787,65.911919525824487,143.2878285984043,124.09680660627782,111.12500092131086,218.53255491121672,197.02771727135405,6.3947301644366235,281.52192028961144,262.84211860620417,186.50712960562669,249.14178618136793,85.569186941487715,145.65219783852808,62.34919343655929,139.32968296273611,132.3010900481604,215.94648916251026,9.147815452190116,171.54234258900397,262.97911622817628,264.65412468509749,183.41758265998214,50.446772909956053,61.874122189823538,216.36651934613474,156.45512962969951,291.73018173337914,17.093465127050877,164.18662823503837,258.79404255351983,35.284514834638685,133.43746501323767,159.52653907635249,164.8547388324514,7.215199512662366,170.49138850183226,280.54769192705862,204.43810232938267,259.14587780158035,112.04219329426996,293.87808871036395,24.39038449479267,183.77133750962093,137.44886598270386,90.539355662884191,15.305296108359471,47.764021868584678,221.73884083889425,45.834995975252241,12.362458128016442,222.66587968054228,286.31905350438319,52.552300299750641,222.96932856319472,19.46700026630424,281.29742186167277,1.8343293394427747,154.4958299472928,257.87204672116786,73.030534472549334,239.15622796840034,78.729619158897549,21.411160339135677,227.93327344255522,164.26557701895945,298.0094863595441,266.5262937117368,107.65502060437575,96.504007975570858,226.10449455422349,282.00946407346055,33.904501745477319,76.430722784949467,179.51652459963225,70.392972386674955,129.74796530022286,142.94613742898218,219.48468766687438,28.976979311555624,79.091674645897001,67.322473522042856,29.347495692782104,186.10892463894561,135.83808147441596,283.14039100124501,192.38227755343542,156.13583682873286,40.479607131099328,23.439768818905577,136.39390505617484,215.80866944091395,196.00768015882932,112.62598434463143,248.27250288403593,37.332721991231665,93.114996013231575,209.53005916834809,121.3067106148228,121.79805037006736,265.38516429718584,80.595065333414823,210.47327525145374,37.763353772228584,73.319816077360883,276.33551987446845,228.18971227528527,290.43132698186673,87.986796408658847,139.38534249761142,83.954177625011653,155.71355608734302,2.8262337141204625,134.14519330789335,113.03863171301782,7.2323857040610164,131.64290277590044,36.452304740203544,91.98524233000353,37.420834655407816,87.967237691627815,222.1625651451759,73.512374935904518,294.46580675011501,281.06839788286015,297.6186963012442,258.19688105420209,231.70173662854359,119.771248991834,184.39421083778143,144.34631120786071,284.09567361883819,169.93383154226467,283.27649356564507,147.39619840797968,15.855604751501232,81.673678558319807,98.309587698429823,296.9323039597366,54.218354491284117,55.919032589532435,192.85552137065679,258.63535978272557,280.63176649413072,10.75713773840107,206.39049342321232,100.2554475243669,54.909705118974671,224.87535216612741,186.62341427127831,193.66557276947424,5.9476251332089305,51.60215105349198,251.69812929374166,285.70932548586279,63.48390255169943,163.43780101579614,205.62749105948023,76.172628892818466,167.90666433004662,173.99311979743652,273.76684331847355,274.72750435699709,48.668453980004415,268.78335970197804,283.19420549366623,145.26947868359275,278.98453663662076,133.37925132364035,273.15550778852776,94.214730076724663,115.6714163760189,17.538817775202915,240.94435612228699,226.38374068192206,64.390437077265233,40.452294613234699,284.70211616274901,107.42071337020025,51.326846395386383,119.36541866650805,111.99567557126284,265.7708477168344,75.579560557147488,7.3506232479121536,287.97528162482195,253.38013551780023,114.82023298484273,87.13312263134867,95.877956242766231,75.852521371562034,274.58981384336948,147.02551104896702,5.34151117852889,218.9817988355644,10.434529458172619,61.582214307738468,25.916896447073668,65.666584085207433,274.33071664022282,292.92401915788651,103.16117615462281,178.37750170659274,69.504940985236317,92.01666966220364,194.3859587807674,290.34316133963875,109.09642021846958,268.89497972326353,8.9561909844633192,57.817617336055264,227.39579077879898,1.5379990779329091,49.735969660570845,213.81736607244238,56.28662055847235,260.45031091221608,40.533427123213187,36.374063119292259,259.0024960807059,12.6678699136246,83.578141780104488,179.86016328679398,32.461676040198654,181.68973789014854,217.94007281493396,155.41329041286372,239.00794240133837,3.2447143071331084,216.4529649768956,206.99107531365007,241.45432549458928,283.86009205714799,128.73026423435658,262.1874005261343,154.0276459865272,34.869659304851666,29.006953889504075,107.01623339345679,118.60173343587667,73.339112340705469,218.14475097716786,168.53965792804956,231.08880806737579,184.20540499733761,78.547787694493309,90.941918196156621,213.35833011940122,239.6443721933756,150.888480048161,238.89684582548216,133.00320684630424,234.54658742062747,87.370331405894831,105.9784314383287,271.01170427841134,17.234908032231033,143.58319390751421,212.902680932777,154.70447373599745,297.88560459949076,138.06271452410147,49.580468496773392,208.98806599085219,34.956333138048649,286.19836539495736,273.949752722634,183.24775117682293,145.0154362549074,174.70254533900879,255.68997969129123,173.05603823857382,243.16422734316438,159.01725166593678,56.841103607555851,214.54980086605065,74.912756867706776,41.164193833013996,17.202464231522754,52.208931584842503,183.07947520166636,38.31833882490173,233.39249467360787,234.15325392852537,153.8081618163269,271.02661422360688,9.2972760042175651,247.17449899599887,297.12519997032359,101.6273489149753,150.78103673015721,129.77993633621372,100.26724882051349,121.08917786087841,52.991058537969366,294.27645142772235,188.06528289080597,141.74591465247795,172.96531516965479,166.32457874948159,225.54463071725331,22.591247975127771,46.902120063779876,153.87877745204605,107.67937185103074,272.32990938518196,44.041289323009551,106.49301386927254,255.33168863947503,272.02093922882341,102.02305089496076,271.33647345053032,83.283752422779799,7.9577625819947571,2.7972822182346135,47.299677528673783,240.77167865261436,145.67051912471652,149.72507520765066,259.93043004954234,161.81500914692879,55.892828921088949,261.40284577198327,103.08406183146872,217.13022755016573,146.26097190403379,200.75769374752417,257.59013707144186,54.469508606707677,295.89162851963192,165.59811105276458,241.94090543990023,288.00264997500926,68.370912300422788,179.21048021013848,196.17594047030434,242.76264229323715,137.37245575943962,295.37517299083993,243.86613208986819,265.8914096117951,164.22826675605029,64.93726378842257,216.33106254925951,11.354389390908182,45.808136242209002,135.88601352344267,99.335121579701081,5.1245743406470865,21.787343213800341,142.63951445790008,143.86132338875905,285.40792986820452,119.95078847673722,75.436732355970889,69.251551488414407,116.54041758785024,102.00548717402853,129.99857905344106,170.61484692478552,249.43505993648432,63.467929703881964,247.56939948280342,160.52996168704703,136.44658487150446,159.53222394851036,114.78749192226678,113.92368791997433,277.83469543047249,74.775422024074942,222.51224423525855,144.45243773236871,221.55228854971938,64.52819609339349,284.12788183777593,298.27915800968185,153.51981202652678,155.46441959333606,237.77187736216001,15.152808010345325,136.19987750123255,44.178290773881599,254.91041441145353,45.18055406329222,117.7388168333564,261.61196573660709,221.77457714546472,235.09895817004144,292.95512736868113,210.1096287521068,157.46641902858391,197.79337884089909,129.54467605403624,9.348221606342122,62.940268238075078,55.299631586298347,97.697012092219666,116.2569529870525,34.150194596499205,243.53621012344956,113.18780669872649,1.9367717660497874,99.641289468621835,161.72138592996635,103.28944472013973,284.75417040544562,245.31853700662032,218.79481019102968,159.97390725743026,266.49166681151837,156.81549371755682,109.1087835971266,232.51860291231424,272.65025903214701,36.958567319670692,257.26498319930397,188.0095953005366,110.91989287803881,104.64795526419766,296.64546025032178,101.05119498842396,213.94284469261765,172.8103530453518,182.84058867278509,259.31735404091887,95.660203292267397,60.370359542081133,124.02206808072515,202.06283785006963,162.13374564354308,270.64757860964164,195.96905150124803,60.547996829496697,130.10197856579907,90.186960629653186,266.68896668357775,149.45956055936404,174.62815586989745,267.08136641141027,35.176698929863051,150.92296416522004,12.426298212027177,83.821575719397515,198.14633338083513,160.65349494758993,176.71710412297398,172.70061719091609,124.82266223593615,124.42851541587152,272.3125417039264,5.4143359502777457,84.316635076887906,211.12667723419145,71.117586130043492,152.51739954925142,103.57367363898084,114.99856267659925,148.79300184990279,20.41452977922745,26.810157986590639,108.21540823485702,188.24898689612746,71.041122302180156,166.6025202665478,61.847710995003581,185.64726609829813,244.32009495934471,223.78150521032512,118.63694504392333,81.347055989783257,17.018976663472131,213.36221095314249,113.14042225200683,215.84492689557374,232.72325817076489,212.16252415301278,50.423989145318046,36.007240164559335,273.75344906072132,239.87898713187315,96.442528930492699,239.87079189368524,99.604119413066655,245.48190795211121,62.06646440224722,185.40019665332511,230.39720542845316,241.70023165014572,21.921972835203633,22.962678767275065,285.06015241867863,8.5519772903062403,48.304724637186155,263.39369781757705,86.647314940346405,115.6169401104562,206.45160433696583,187.17079123016447,43.203796337591484,191.24324115482159,154.11390706431121,230.3379197861068,216.67675220407546,98.66654608421959,278.7246942599304,230.25790434028022,219.89905045204796,123.36132700182498,225.20455701439641,206.94157606107183,122.78856005053967,209.90610336721875,72.608016408979893,77.74531619483605,156.73429186968133,118.61646954901516,66.5041299094446,159.48640740150586,252.87398244487122,167.23567927302793,199.21693988866173,260.91931021981873,245.05435008159839,147.05363898328505,238.36940225888975,238.96202922682278,141.26245526061393,184.49481191160157,93.54796808748506,146.17451833700761,206.58619462512434,126.95198066951707,296.06881594611332,89.249822403071448,231.21022937633097,158.74190217489377,249.04467302653939,132.49170640134253,212.11934265494347,298.25198660418391,179.00558964838274,152.46074505732395,226.10936206066981,260.37591441185214,149.51993778627366,193.72836157679558,259.67466426780447,72.792556437198073,21.340279882773757,164.59147293190472,290.5952358529903,168.14450988546014,30.528137475019321,245.70364574319683,164.54614787641913,243.81388361752033,121.4880015081726,191.04435716243461,33.005006339168176,139.31125432811677,217.52568649942987,29.814574076095596,184.49102143989876,137.63519104407169,235.10748868063092,268.91626005293801,170.41955423168838,64.792878060368821,243.58442989690229,50.189862774452195,173.45598117774352,158.51058879238553,283.26472791307606,169.36683195852675,261.56419192557223,148.00920354714617,152.77306174184196,24.360992814647034,236.85812640446238,1.5207366566173732,142.43616102542728,268.88652725261636,248.81170674273744,280.16420824523084,97.421996272401884,22.380665161879733,292.86781557113864,46.833006818778813,84.185099554713815,218.86206467915326,22.776411417871714,45.950368457706645,225.61585716693662,180.43239941331558,249.52539830538444,57.077529058791697,276.77909103990532,101.0921591357328,98.780263646505773,197.42172047286294,241.41670864121988,173.48606129409745,161.93684843252413,249.42261037277058,139.52516911970451,20.153746676631272,246.40432350151241,277.61802271706983,285.62004472874105,159.30102487606928,23.805592152290046,278.65181804168969,212.89264851878397,41.254983385559171,71.243005715543404,162.13711653742939,120.26977141527459,140.43525588978082,81.169203866273165,120.81143857934512,249.92147969454527,265.0760561611969,298.6167688248679,101.27576150116511,195.27554255747236,201.65739688905887,211.48189729941078,180.97698336374015,279.7586574992165,12.511755847372115,206.60811236221343,196.93511087098159,170.93782062130049,199.46915147663094,114.87341285450384,29.600481623550877,190.73926644749008,206.3129384284839,109.60535780666396,81.07365714921616,122.87821241980419,236.9888900204096,111.24121875525452,64.558624082710594,141.05122954025865,125.86545624118298,151.5207391239237,87.507107647834346,273.2501982243266,292.90093179629184,62.722874020691961,231.66786645818502,102.24249782040715,296.46585247176699,172.66356130619533,171.38939251680858,146.59279982722364,213.21366724860854,79.403476795880124,149.8528203277383,174.29844498028979,228.6047224230133,263.61998197482899,59.589191136648878,19.2241166443564,111.49284842005,132.82206347002648,296.55382172623649,26.193141343770549,152.09496774035506,169.4080469335895,20.907135856105015,162.2538628987968,232.15572755341418,230.64931273111142,104.71251114364713,70.69399137981236,226.27947514201514,176.6211600357201,177.60583182726987,138.23318529431708,185.26526176417246,258.43347553396598,212.23551238398068,198.58999205403961,53.993794035166502,106.809870027937,198.82173315947875,104.80870292591862,29.718376515666023,76.861713159829378,74.291153690079227,285.80591463833116,158.89324912149459,90.162097215419635,103.11440280033275,48.363415686180815,258.37741201533936,109.02782192570157,27.012234654976055,222.74709781864658,259.76466910471208,212.06410332443193,162.85693392227404,210.56676139379852,5.7059052879922092,2.8615109007805586,13.373438151786104,112.92933499859646,27.921151104383171,270.54718937841244,247.20067126746289,96.185103216208518,163.97874994785525,179.52779507101513,115.06554245855659,90.040758123388514,240.43325165519491,38.379299645777792,67.825340354582295,117.11834415583871,151.41821225266904,245.48863567737862,63.675781815312803,294.37153498711996,237.90944026899524,258.73496165289544,76.149505957262591,26.062444281065837,106.81066198367625,101.97588497400284,19.360626255627722,71.602620800957084,68.275917919585481,96.023812407627702,35.209948539966717,295.3500735075213,95.481020660838112,164.92701447033323,299.5249868829269,225.0261270054616,219.77528042625636,252.71366932848468,45.110256504733115,50.900021863635629,90.217015892965719,271.0261860829778,85.042804258642718,32.432115053059533,178.68965688114986,223.78283495246433,166.27488589379936,219.08220978709869,109.70470439363271,215.52340922527947,271.38764182501473,40.896097392309457,212.69723782595247,134.29091024002992,205.05751823051833,153.12738271174021,63.500071021495387,159.61659668246284,168.36344318138435,258.05539679690264,94.56350596412085,203.63974759331904,218.01403790269978,241.94563907408156,70.041390959871933,159.84161625849083,286.52449118113145,286.81285517266952,199.33187761693262,20.936407656874508,5.2168085023295134,162.91389110614546,95.296823423588648,85.216442712582648,112.09338164865039,144.78919971524738,162.88315555173904,205.77426929306239,216.91547764069401,63.269257206004113,234.59080397477373,182.84013714105822,45.051512616919354,98.526675812667236,235.4594612121582,264.37331483466551,65.63126526796259,40.884988222038373,279.88979941047728,31.619927685009316,266.56579187768511,287.77595285349526,187.88469359115697,46.71769880107604,1.8992007202468812,46.608886616537347,203.75523452507332,47.510222749086097,286.0906815524213,27.781250688945875,227.98879325739108,136.87294471403584,54.498414016561583,200.99981179833412,48.236844019498676,249.55920310597867,11.161121350480244,237.28030453133397,199.03593985247426,214.10056418180466,32.943770533660427,142.30665328865871,116.16774191590957,212.86785750556737,270.78026287141256,287.45978506142274,249.58832035842352,152.22689241799526,255.01618025358766,92.210882814368233,18.11295895348303,237.15354309044778,192.02831086120568,71.679702822118998,55.291686618933454,71.056546851526946,283.81541819311678,139.94511959259398,145.78530293121003,186.1966534384992,64.505385735305026,184.98349246103317,19.56468629417941,37.664545946288854,140.13924509775825,38.014265901176259,34.841424091719091,86.053239255910739,156.7480383166112,220.98410785477608,224.43203370808624,123.98112259060144,28.021625615656376,248.865587370703,58.719040767522529,280.59912073635496,24.000375671312213,120.32093073963188,54.539552831323817,16.611200908897445,245.24418526957743,171.78464345238172,272.37938830978237,224.55332302441821,129.51633488480002,96.752824164694175,232.839733654866,148.38736157724634,91.113688355777413,67.274173968238756,34.100425510900095,281.8428478220012,213.10609124181792,145.20928225037642,42.864125504624099,162.45882878545672,272.82441097637638,67.096072687767446,204.46683112252504,29.687555750831962,48.059841354843229,18.989458682946861,150.90813685464673,246.03315425803885,81.905655663227662,231.67201461875811,79.224505310878158,59.513024292187765,119.63368281302974,268.64032794255763,298.7076588338241,205.60574200283736,268.98547417204827,197.39709758316167,107.99705184972845,297.12397806392983,215.56938185216859,11.073845266131684,277.55952541041188,127.85172940976918,16.816916006850079,147.50511794094928,97.024069980019704,175.46783627104014,91.88439014996402,25.897655946435407,100.11694869515486,198.38623449858278,169.72534174495377,16.639260758413002,268.40781569667161,167.492330922978,52.494649597676471,213.89554949407466,66.040328507544473,146.88527751923539,177.25038543925621,185.66259290627204,151.94506491557695,64.919494142290205,115.19108658772893,194.05193989141844,205.93311879504472,114.81204596138559,155.56411412288435,32.010138604789972,232.51907337969169,113.87594487937167,103.30741193750873,79.595380912534893,109.85296719614416,73.14439857727848,219.08278690674342,187.25428979145363,227.58962431293912,157.35540244192816,44.328314591897652,124.55808699084446,138.02819754811935,66.119818837149069,56.248318680096418,257.70753135229461,256.98574250168167,258.4414679100737,164.5904891830869,85.89776545134373,7.816402172204107,185.00246375519782,4.8456640422809869,234.06736070360057,281.26763615291566,286.49934512446634,217.96148019446991,275.96137021528557,111.60407100152224,116.05989524070174,129.47286907350644,49.630261739250273,41.997950299410149],"expected":[4.8646997507544787e-168,0,2.3142692531031871e-131,0,0,0,0,2.6589577193838177e-174,8.59354439619675e-189,0,5.613177154817765e-14,7.2883627167378285e-153,0,0,0,3.7697454005873876e-138,0.00082589812981732718,0,2.6661931338569314e-24,3.0988814264470363e-119,0,0,3.1714544069422737e-242,0,2.6500850099422659e+17,0,11824030.237041751,1.6102174630075937e-62,5.1632689679171452e-33,2807196.5817171019,0,1.7617629920836997e-37,1.1430688981508421e-220,0,4.4309601009647154e-284,9.3307382555285144e-27,2.5215847231195092e-240,1.2599475768194892e-270,0.33748805836730128,5.5861961843876231e-95,0,2.410440879151252e-219,3.9463867534316579e-113,2.7670679552506657e-32,5.8564649455564329e-102,3.1104057493062329e-65,1.0646241397062552e-306,6.9956226809684542e-73,2.6135882997694007e-228,1.6977449198045662e-187,2.5314624258445714e-160,0,0,61455892155493952,0,0,4.9406564584124654e-324,0,3.4643829984480946e-110,1.1916321437387193e-233,7.4388723640369158e-67,1.9643896521018415e-219,6.0299155595357413e-205,0,38113389523580.5,6.5981100573865633e-290,0,0,2.0565207313577154e-316,7.7776127116631423e-45,1.182298193872603e-65,0,4.6947969813783045e-257,0,62575.833417069814,2.1050235127681638e-273,0,1.6868409915182634e-20,2.2463983171429077e-207,1.301775558647082e-262,1.4593833228892256e-275,930600976695513.5,2.5183885436332709e-288,0,0,0,5.4008052754756529e-163,0,2.4098279340341991e-05,7.0334345430361928e-318,6.0339683514240682e-216,9.4267369950877171e-120,10368259.217577446,9.6762745266744087e-42,0,2.6431853505304469e-38,120129959471.89973,0,0,2.8282992365452038e-49,0,47.02546288215715,0,7.8144620630340616e+19,4.7643677533674034e-253,0,2.0131605109278748e-86,0,3.2900533787127098e-97,0.13209017638272008,0,5.6462425897796951e-274,0,0,1.0387071019814135e-153,1.9397464699713442e-131,0,0,2.4973234587380972e-19,3.1939056356850588e-92,1.2282773857759904e-308,1.1540547834053847e-81,1.419889583561117e-199,1.2417946197790734e-227,0,6.6543550534870981e-12,9.5027590566885087e-98,7.3419492350424989e-76,4.4217242721559248e-12,2.4703282292062327e-323,1.5601340303596106e-212,0,0,1.2068832678426352e-256,1.3801444887162987e-29,0.00051339714638541894,9.1304680376220488e-214,0,0,6.3638492254092271e-164,0,1.4230038959127609e-22,1.1134945511823458e-124,0,3.3770426767465855e-180,3.4028002532536269e-183,0,1.2726499751312885e-100,0,7.1255331867034671e-25,4.3448120920605252e-86,0,0,0,5.6789954934698581e-115,1.8632227212349647e-219,1.257049483111609e-106,9.160163924597865e-256,6.5438679467708416e+19,5.5491057891679808e-209,5.1782588991787512e-165,2672793582906108.5,4.79527013048319e-203,1.2087503589577311e-22,8.9856931610968364e-123,1.0568741238635856e-24,5.759155445939823e-114,0,5.1498452188727066e-87,0,0,0,0,0,8.0227457387920354e-179,2.5429064725803118e-319,7.1668730409689184e-231,0,7.5910905241782653e-287,0,8.4382017913817985e-237,9923484.6529296376,9.6378159643895232e-103,1.4254322400164778e-134,0,1.0248481781873542e-51,1.6761189860379213e-55,0,0,0,5765889384350.25,0,3.4025814822356475e-139,8.8972855480321554e-54,0,1.4821969375237396e-323,0,12625229882140224,3.6954891393237464e-48,0,0,7.7350871207228885e-69,1.6029895808464739e-272,0,2.0254628346470427e-92,1.0761546434530128e-282,8.7278952456717976e-296,0,0,2.5888431608398535e-42,0,0,5.9719751490594225e-233,0,1.7527711351291135e-207,0,6.5808049511853136e-126,7.2388393507248194e-170,36937.9440684441,0,0,3.8216632393379537e-70,1.8935057837563893e-29,0,1.2570947637936184e-153,9.7871605000592271e-48,4.9788392755869627e-178,3.9102875174405025e-162,0,2.5232237389952089e-91,2386959532118343,0,0,9.8823802819037033e-169,2.5708882034878502e-113,7.9283246204869803e-130,1.7067471496679281e-91,0,9.1838761052308245e-237,1.1475141350987362e+17,0,4709375799742.3105,1.279242748885571e-65,2.5634549407807272e-07,1.7680743756944742e-71,0,0,6.825250451184337e-145,4.4886121458986792e-306,2.0964040228493867e-79,1.3089008833937657e-122,0,0,9.7211682595851182e-157,0,484559762423554.88,7.3146522304350232e-59,0,1.3544844134503711e+18,7.0496748928664936e-45,0,9.7935208774746163e-56,0,7.6504945802704411e-30,2.6549909712926097e-23,0,14026705927.49263,3.1420901015178789e-106,2.9006272241876747e-309,4.1826808919726605e-17,4.0251057126475873e-313,0,1.8611015086352908e-254,0,5.0163215447101773e+17,0,0,0,0,3.4483593890857878e-197,0,5.6681606392020288e-251,1.2760940082861444e-20,7.1189845865793054e-12,8.7838657810560131e-152,2.230684333978839e-176,1.5888766107745957e-85,0,8.5323322051867466e-284,0,1.0170785978723317e-318,2.8558051523663575e-96,2.5735540945558673e-120,0,0,4.1891755087973874e-245,0,9.3353023599264277e-207,0,8.6264992673946681e-114,1.4655995592351646e-150,0,121256.40156201579,3.217731516678987e-229,0,3.6673241516111453e-253,0,1.6756397723056932e-217,1.9466159559572903e-44,0,2.2560251062523808e-20,0,0,1.2647570163723758e-316,2.706859545131483e-232,1.1571338777679665e-297,0,5.8831950589649773e-294,0,1.2573711863370354e-262,2.8255089739379832e-57,0,6.1627622807724035e-90,9.9487249753582816e-31,39840.304666187287,2.9463281426128214e-49,1.041275907536488e-316,2.514126884433397e-26,0,0,2.153839017261472e-251,0,13774396108313.146,0,0,2.7992581631566413e-141,1.9523174827234379e-244,1.2631303871416677e-199,3.1750306586067433e-139,1.2729164723174182e-181,1.6634068643149736e-50,0,0,1.3694273227130514e-224,8.2260539718452167e-294,1.0244937411861296e-278,0,0.0059584135632749077,6.9605323542353744e-40,2.9280081437484428e-251,1.7120407792726756e-153,0,3.6988256750363164e-35,1.0721804367610183e-151,0,0,2.0192292981815449e-142,0,1.8031527048095845e-105,356803183340323.19,6.1264585362973082e+17,1.1767137906139052e-40,0,8.1555044862980856e-234,1.2286403988783998e-242,0,8.2686755883855174e-269,1.2313209130441505e-54,0,2.9803685939691255e-144,0,4.8164492695986325e-235,0,0,6.8772657072799593e-53,0,1.5518124529256898e-277,0,0,2.9327585395832711e-77,9.4899189243334715e-308,0,0,5.1051985435588819e-216,0,0,0,7.9993190423926854e-274,1.5835432569703943e-71,0,313630056636.81824,2.1074546775688186e-38,1.3646836204792138e-212,2.5580538479361684e-137,37811456200428200,0.045776494874715724,1.4919855885876952e-225,6.6808008499301499e-230,0,1.3566308181939603e-178,9.7435638133050333e-91,1.4120830367205303e-79,4.8290589028568687e-172,1.7096607714763452e-142,3.3911152252489311e-199,1.3311292645506836e-288,0,7.9462535373953348e-69,0,1.3717286942318139e-265,3.7828586634564732e-213,1.1828119740203567e-263,2.4588745086742405e-168,8.3535786390984477e-167,0,8.4260443271656519e-90,0,4.7455268134502835e-231,0,9.384801783913712e-71,0,0,4.2113336368247806e-250,9.2395868406673799e-255,0,30684583.357416645,1.6828795636912194e-213,9.2642744272341356e-36,0,1.0279273461535966e-35,1.0493560173816623e-174,0,0,0,0,0,1.4480142612265917e-259,0,1.52014140166016e-198,17883489130749.867,4.7501890038759195e-68,2.492346308795539e-54,4.6255508520293361e-134,1.0355867000938864e-171,3.1183489155226857e-19,0,2.7094437469846886e-164,1.1610348859116485e+18,1.1759276218921607e-137,1.2837134559937218e-268,3.2598890164305579e-145,0,0,0,9.3622441682146023e-265,0,6.7627498150758929e-258,1.539807266175603e-156,0,0,2.3587043866761015e-23,0,0,1.162965499593338e-160,8.2696062366053651e-148,0,3.1896986081203323e-140,0,1.4385717771839808e-293,7.4714938953961673e-316,0,9.9413537294121445e-130,3.4644447175293192e-63,1.676452855950347e-187,0,1.1693182289233569e-269,0,0,1.9101564135226726e-63,1.958180737802699e-200,4.9603640984208637e-119,0,4.3912018425389909e-242,1.1890943174492778e-297,0,1.4675788319933145e-20,3.7126989530124699e-244,324499431226.30237,2.0017958577101508e-106,0,3.2473334806369126e-266,7.7054562634004792e-302,2.531542774592962e-293,2.4422357670583791e-189,2.4872131241275038e-188,0,91363447568971840,1.2722031174680082e-107,0,1.5718029494328366e-82,1.7984544373595596e-248,8.6337519862903817e-146,4.4053070490152923e-169,5.6070060143417904e-240,2.5559460235469862,1.8216706513400707e-08,3.6387813753276973e-155,0,9.8854703732279729e-83,1.6723632345217509e-279,4.9627498226154816e-66,4.1995579896505956e-322,0,0,1.8512032202522323e-175,7.9963656479248099e-102,134910.63317773052,0,6.0183738453072899e-163,0,0,0,6.1834480127148073e-46,2.1029263996822677e-22,0,0,5.6742743259997715e-131,0,1.2369063534393611e-137,0,5.1755560656269378e-66,9.7182712536973195e-321,0,0,0.29261362071053953,0.002399463925040461,0,438930207821751.56,2.9066124997367131e-42,0,1.6117357883431219e-111,2.5978950990240829e-170,0,0,3.6856798243087114e-34,0,7.9433342646064536e-252,0,0,3.0305602513980263e-135,0,0,0,3.8856520816085983e-186,0,0,6.6752197396936577e-184,0,6.1438458847970887e-85,2.815602477933172e-95,6.6900893202217105e-257,4.786903996457503e-176,1.9845635798477617e-74,1.3511924017349088e-263,0,9.146642561063154e-281,0,0,0,1.1222305051311694e-236,0,0,3.2260832258927281e-224,6.4796709452079484e-320,7.6519069666877001e-126,6.9839661208254642e-235,0,8.4458070545114797e-194,0,3.8138266314612233e-116,0,2.8571722965909069e-261,0,1.7616571496075631e-205,0,0,2.1813360169213336e-307,1.169021120946884e-247,0,0,4.3251141010065801e-242,0,0,1.7243027840679271e-85,0.27614887691463375,4.5305129474234579e-275,0,3.9679708792450269e-282,3.7326114946199443e-14,0,6.3138159069973455e-275,0,2.8944352826114153e-182,0,3.9901984151060778e-18,1.3496095989182644e-219,0,1.2478620148305931e-11,5.4490994145476923e-319,1.2136063334653526e-216,0,0,3.9678130756118262e-288,5.0437459765610568e-70,0,1.8257842116799511e-45,4.6095810535660385e-295,1.4017451075092827e-261,0,1.067559733988336e-285,0,1.21214831147317e-238,4.0849899483613939e-249,2.8951107399165456e-05,0,4.784242714732673e+18,1.1904145006520991e-226,0,0,0,2.2487367261968052e-133,0.23577266711985662,0,1.1152234247339055e-38,3.699665592724633e-107,0,0.019894090687810926,2.9326602734867343e-38,0,2.0395635289571627e-310,0,5.2540327676730527e-57,0,7.6724401109695776e-141,1.6210940475740529e-135,0,0,3.8431635646396778e-294,2.0064926066373344e-269,0,1.2367989301244098e-220,7.6861742634186996,0,0,0,3.1229154861254899e-263,0.0019361828963609402,0,0,5.6219304074945153e-31,2.9739139802574145e-83,1.6876647220325294e-269,9.6563412514813924e-180,2.6778307702002671e-222,7.6112789515080199e-102,5.8150469596530068e-181,0,0,0,5.2791720141551967e-141,0,0,0,8.9349628911007776e-312,0,12619791047.073296,0,0,2.6315505195012522e-289,0,5.2460968783665814e-167,3.3005759313055176e-12,0,0,4.7857688201370428e-158,1.0756086439835849e-101,3.3278967990130626e-185,0,4.26968426814387e-161,5.0145877820650192e-71,1.1612067372094705e-223,1.3598859782771885e-191,4.1578526362613998e-246,7.965491553404071e-114,0,0,1.0172183486844573e-67,0,6.735834128943909e-143,0,2.6688468832478891e-293,6.8648637217061426e-290,1.4217754325811704e-235,0,3.5608313969055972e-98,8.0134079792312899e-242,2.7252777013317959e-296,0,0,1.9251100350445597e-61,97.397756022291844,7.0597528928704521e-162,2.9357025449623143e-206,0,6.5058437378418623e-08,1.5855043283064518e-247,5.890943868530325e-286,0.59407052992045084,7.0777396096433976e-270,0,0,3.9009445860578463e-148,1.4384969787613777e-81,0,6.0993389637211953e-302,2.3464134155633032e-304,4.4318881900475369e-217,1.5019595633573895e-321,0,0,0,2.6153936189154672e-52,3.4817093788200629e-152,0,1.0755647403522889e-147,5.7665601813790716e-13,2.3778311012646069e-93,8.122996316442819e-89,0,4.7477538686351164e-262,5.2640975252195117e-119,8.3688421665625203e-145,7.4406550622617726e-42,0,3.9162850848151931e-156,3.6301592365403673e-09,0,0,0,2.0569316735031095e-271,0,13942224637568628,3.5402331228877691e+18,892293543.48389184,1.0603660010589516e-164,1.5333223003344558e-10,0,0,3.4778642909229719e-130,1.2365827897368749e-273,1.0907308617620824e-308,3.9531314377500693e-169,5.1685071530455937e-119,0,5.9324717895512586e-25,4.0219110124440454e-76,3.3979369799663091e-173,2.2173855270567726e-246,0,2.0724996486607271e-69,0,0,0,2.3137392571075975e-92,6.4726597905761449e-08,5.7816313730696033e-152,1.8855049233226059e-142,25409.479507612665,2.8630045223254561e-81,9.2602309212938145e-78,2.287086665886104e-130,3.5191365422257668e-21,0,1.3317545904589548e-129,6.4890186468558791e-276,0,0,0,0,5.2733628591379441e-37,2.0002626248366355e-46,3.8209407756549454e-119,0,1.1333470057243714e-108,2.7813462119302249e-17,1.5162632159442435e-306,0,4.5277512051199066e-278,0,4.4827744956775316e-158,0,0,5.0266986668618795e-30,0,1.64007207277661e-209,0,4.7856796836316164e-249,5.0157000321401228e-69,9.4741098126999332e-264,2.7750428319108112e-283,0,2.0393143202850258e-127,0,0,0,1.107621901504966e-78,9.464182813965502e-265,0,0,0,3.515574953352691,83557064806929376,2.8787099343948654e-271,5.9528734928103374e-129,3.2953483363627975e-109,7.0083941588553858e-163,1.0740845956830037e-231,1.5891632277638154e-271,0,0,7.1535684137933161e-68,0,3.8364807570645408e-316,1.6012949422799261e-36,1.453341102582044e-135,0,0,7.0715266987554998e-72,3.314466637664059e-30,0,4.8329773945955553e-16,0,0,0,7.8281247157123776e-40,1.6146217029745979e+18,1.7469890534272528e-39,0,9.8160786120897218e-41,0,3.3279727778532204e-10,0,2.0515762092369876e-214,1.9355630080372821e-52,0,9.6359121797049023e-42,0,709740380972.23853,0,0,0,2.261546439732993e-17,1.245856742888287e-226,1.755105647879178e-171,0,0,0,0,5.9165071193926126e-248,0,3.1241321545989263e-123,2838.7066214102711,0,0,1.1851952068093112e-83,2.9574502967262308e-54,8.8682814281613405e-83,0,1.6678197593818427e-221,1.7766704402872502e-233,1.4821969375237396e-323,3.9400908558450767e-70,5.7543825771129985e-320,33.713884094601596,2.6529530609675391e-25,1.6924201227990584e-221,1.2872406048255588e-24,5.9512034615319277e-21,5.3149864123511325e-111,6.3937692614365327e-258,0,0,2.3718842937764565e-187,1.8372908228496594e-10,0,1.6150074442145651e-60,0,0.000191160554636808,4.3676610008162564e-180,3.0437449201122734e-53,198556.43362152873,0,6.451554512843507e-291,0,0,3.2855183084655325e-199,1.2335309158128267e-131,0,1.0898954291779928e-239,5.0433647174068441e-120,1.1650394448180525e-74,8.7504104429423462e-20,0,0,1.0256745713579794e-232,4.1818719112748721e-33,1.7105053710670176e-270,0,1.2559250749995048e-75,0,8.4674111843740916e-13,7.345210495632005e-42,619.01225734721902,3.6723301546064903e-245,0,5.0924645695387952e-103,0,7.2574966193361065e-98,1.1414128269317377e-61,1.5644389404954585e-178,0,0,0,0,0,1.2764566972643624e-154,0,0,652278903578.16956,0,2.163644295937434e-195,97264.280347587992,9.4232694398693612e-238,1.1413989056772921e-132,2.6950944987679587e-299,6.8217208876335031e-122,1.1356314659148293e-07,7.3379669851362139e-139,0,1.446812313785096e-286,193008.42882471837,0,1.7043257246724125e-280,3.2035666721878106e-49,0,4.8158870849177626e-73,2.222389784076583e-236,1.3911219346195512e-303,1.4821969375237396e-322,5.5162879682424839e-247,1.2037735749954711e-70,1.7334766536516148e-169,0,0,1.8789789172334966e-168,9.4233838011163449e-254,1.9097633328194917e-16,0,2.5502424332749505e-166,5.3388356444019059e-145,8.4646451352174026e-98,1.9253354507366018e-158,1.0341379907194912e-86,0,0,0,5.9942507421169159e-259,1.3833126042200854e-35,8.9869565787762309e-189,2.3202916206630255e-216,7.3631942214429369e-74,3.2033821400671509e-56,0,0,0,2.8709330431338972e-275,2.4691655858149014e-110,326465637901957.88,1.1131299000803285e-320,61426967065356768,0,0,0,0,0,4.0731257662513782e-162,6.118590594346761e-171,3.5705285143895446e-199,8.563794885079999e-45,3.624085179082525e-32]}
},{}],96:[function(require,module,exports){
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
var EPS = require( '@stdlib/constants/float64/eps' );
var gammaDeltaRatio = require( './../lib' );


// FIXTURES //

var decimalsIntegers = require( './fixtures/cpp/decimals_integers.json' );
var largeIntegers = require( './fixtures/cpp/large_integers.json' );
var smallIntegers = require( './fixtures/cpp/small_integers.json' );
var largeTiny = require( './fixtures/cpp/large_tiny.json' );
var tinyLarge = require( './fixtures/cpp/tiny_large.json' );
var decimals = require( './fixtures/cpp/decimals.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof gammaDeltaRatio, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN` for either parameter', function test( t ) {
	var v;

	v = gammaDeltaRatio( NaN, 5.0 );
	t.equal( isnan( v ), true, 'returns NaN' );

	v = gammaDeltaRatio( 1.0, NaN );
	t.equal( isnan( v ), true, 'returns NaN' );

	v = gammaDeltaRatio( NaN, NaN );
	t.equal( isnan( v ), true, 'returns NaN' );

	t.end();
});

tape( 'the function returns `0` for very large `z` and negligible `delta`', function test( t ) {
	var v;

	v = gammaDeltaRatio( 1.0e100, 20.7 );
	t.equal( v, 0.0, 'returns 0' );

	v = gammaDeltaRatio( 1.0e120, 100.1 );
	t.equal( v, 0.0, 'returns 0' );

	t.end();
});

tape( 'the function evaluates the ratio of two gamma functions (decimals)', function test( t ) {
	var expected;
	var delta;
	var diff;
	var tol;
	var v;
	var i;
	var z;

	z = decimals.z;
	diff = decimals.delta;
	expected = decimals.expected;
	for ( i = 0; i < z.length; i++ ) {
		v = gammaDeltaRatio( z[ i ], diff[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 350.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. z: '+z[i]+'. delta: '+diff[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
	}
	t.end();
});

tape( 'the function evaluates the ratio of two gamma functions (small integers)', function test( t ) {
	var expected;
	var delta;
	var diff;
	var tol;
	var v;
	var i;
	var z;

	z = smallIntegers.z;
	diff = smallIntegers.delta;
	expected = smallIntegers.expected;
	for ( i = 0; i < z.length; i++ ) {
		v = gammaDeltaRatio( z[ i ], diff[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 10.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. z: '+z[i]+'. delta: '+diff[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
	}
	t.end();
});

tape( 'the function evaluates the ratio of two gamma functions (large integers)', function test( t ) {
	var expected;
	var delta;
	var diff;
	var tol;
	var v;
	var i;
	var z;

	z = largeIntegers.z;
	diff = largeIntegers.delta;
	expected = largeIntegers.expected;
	for ( i = 0; i < z.length; i++ ) {
		v = gammaDeltaRatio( z[ i ], diff[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 150.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. z: '+z[i]+'. delta: '+diff[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
	}
	t.end();
});

tape( 'the function evaluates the ratio of two gamma functions (non-integer `z`, integer `delta`)', function test( t ) {
	var expected;
	var delta;
	var diff;
	var tol;
	var v;
	var i;
	var z;

	z = decimalsIntegers.z;
	diff = decimalsIntegers.delta;
	expected = decimalsIntegers.expected;
	for ( i = 0; i < z.length; i++ ) {
		v = gammaDeltaRatio( z[ i ], diff[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 150.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. z: '+z[i]+'. delta: '+diff[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
	}
	t.end();
});

tape( 'the function evaluates the ratio of two gamma functions (tiny `z`, large `delta`)', function test( t ) {
	var expected;
	var delta;
	var diff;
	var tol;
	var v;
	var i;
	var z;

	z = tinyLarge.z;
	diff = tinyLarge.delta;
	expected = tinyLarge.expected;
	for ( i = 0; i < z.length; i++ ) {
		v = gammaDeltaRatio( z[ i ], diff[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 100.0 * EPS * abs( expected[ i ] );

		// Handle cases where either the expected value is zero or `v` is zero and the expected value is very small...
		if ( tol < 1.0e-300 ) {
			tol = 1.0e-300;
		}
		t.ok( delta <= tol, 'within tolerance. z: '+z[i]+'. delta: '+diff[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
	}
	t.end();
});

tape( 'the function evaluates the ratio of two gamma functions (large `z`, tiny `delta`)', function test( t ) {
	var expected;
	var delta;
	var diff;
	var tol;
	var v;
	var i;
	var z;

	z = largeTiny.z;
	diff = largeTiny.delta;
	expected = largeTiny.expected;
	for ( i = 0; i < z.length; i++ ) {
		v = gammaDeltaRatio( z[ i ], diff[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 1.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. z: '+z[i]+'. delta: '+diff[i]+'. v: '+v+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/gamma-delta-ratio/test/test.js")
},{"./../lib":89,"./fixtures/cpp/decimals.json":90,"./fixtures/cpp/decimals_integers.json":91,"./fixtures/cpp/large_integers.json":92,"./fixtures/cpp/large_tiny.json":93,"./fixtures/cpp/small_integers.json":94,"./fixtures/cpp/tiny_large.json":95,"@stdlib/constants/float64/eps":43,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":72,"tape":276}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/lanczos.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* Copyright John Maddock 2006.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MAIN //

/**
* Calculates the Lanczos sum approximation.
*
* @name gammaLanczosSum
* @type {Function}
* @param {number} x - input value
* @returns {number} Lanczos sum approximation
*
* @example
* var v = gammaLanczosSum( 4.0 );
* // returns ~950.366
*
* @example
* var v = gammaLanczosSum( -1.5 );
* // returns ~1373366.245
*
* @example
* var v = gammaLanczosSum( -0.5 );
* // returns ~-699841.735
*
* @example
* var v = gammaLanczosSum( 0.5 );
* // returns ~96074.186
*
* @example
* var v = gammaLanczosSum( 0.0 );
* // returns Infinity
*
* @example
* var v = gammaLanczosSum( NaN );
* // returns NaN
*/
var gammaLanczosSum = require( './rational_pq.js' );


// EXPORTS //

module.exports = gammaLanczosSum;

},{"./rational_pq.js":99}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Calculate the Lanczos sum for the approximation of the gamma function.
*
* @module @stdlib/math/base/special/gamma-lanczos-sum
*
* @example
* var gammaLanczosSum = require( '@stdlib/math/base/special/gamma-lanczos-sum' );
*
* var v = gammaLanczosSum( 4.0 );
* // returns ~950.366
*
* v = gammaLanczosSum( -1.5 );
* // returns ~1373366.245
*
* v = gammaLanczosSum( -0.5 );
* // returns ~-699841.735
*
* v = gammaLanczosSum( 0.5 );
* // returns ~96074.186
*
* v = gammaLanczosSum( 0.0 );
* // returns Infinity
*
* v = gammaLanczosSum( NaN );
* // returns NaN
*/

// MODULES //

var gammaLanczosSum = require( './gamma_lanczos_sum.js' );


// EXPORTS //

module.exports = gammaLanczosSum;

},{"./gamma_lanczos_sum.js":97}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return Infinity;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 38474670393.31777 + (x * (36857665043.51951 + (x * (15889202453.72942 + (x * (4059208354.298835 + (x * (680547661.1834733 + (x * (78239755.00312005 + (x * (6246580.776401795 + (x * (341986.3488721347 + (x * (12287.194511824551 + (x * (261.61404416416684 + (x * 2.5066282746310007))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (362880.0 + (x * (1026576.0 + (x * (1172700.0 + (x * (723680.0 + (x * (269325.0 + (x * (63273.0 + (x * (9450.0 + (x * (870.0 + (x * (45.0 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 2.5066282746310007 + (x * (261.61404416416684 + (x * (12287.194511824551 + (x * (341986.3488721347 + (x * (6246580.776401795 + (x * (78239755.00312005 + (x * (680547661.1834733 + (x * (4059208354.298835 + (x * (15889202453.72942 + (x * (36857665043.51951 + (x * 38474670393.31777))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (45.0 + (x * (870.0 + (x * (9450.0 + (x * (63273.0 + (x * (269325.0 + (x * (723680.0 + (x * (1172700.0 + (x * (1026576.0 + (x * (362880.0 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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
*
*
* ## Notice
*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var sin = require( '@stdlib/math/base/special/sin' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PI = require( '@stdlib/constants/float64/pi' );
var stirlingApprox = require( './stirling_approximation.js' );
var smallApprox = require( './small_approximation.js' );
var rateval = require( './rational_pq.js' );


// MAIN //

/**
* Evaluates the gamma function.
*
* ## Method
*
* 1.  Arguments \\(|x| \leq 34\\) are reduced by recurrence and the function approximated by a rational function of degree \\(6/7\\) in the interval \\((2,3)\\).
* 2.  Large negative arguments are made positive using a reflection formula.
* 3.  Large arguments are handled by Stirling's formula.
*
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain    | # trials | peak    | rms     |
*     |:----------:|:---------:|:--------:|:-------:|:-------:|
*     | DEC        | -34,34    | 10000    | 1.3e-16 | 2.5e-17 |
*     | IEEE       | -170,-33  | 20000    | 2.3e-15 | 3.3e-16 |
*     | IEEE       | -33, 33   | 20000    | 9.4e-16 | 2.2e-16 |
*     | IEEE       | 33, 171.6 | 20000    | 2.3e-15 | 3.2e-16 |
*
* -   Error for arguments outside the test range will be larger owing to error amplification by the exponential function.
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gamma( 4.0 );
* // returns 6.0
*
* @example
* var v = gamma( -1.5 );
* // returns ~2.363
*
* @example
* var v = gamma( -0.5 );
* // returns ~-3.545
*
* @example
* var v = gamma( 0.5 );
* // returns ~1.772
*
* @example
* var v = gamma( 0.0 );
* // returns Infinity
*
* @example
* var v = gamma( -0.0 );
* // returns -Infinity
*
* @example
* var v = gamma( NaN );
* // returns NaN
*/
function gamma( x ) {
	var sign;
	var q;
	var p;
	var z;
	if (
		(isInteger( x ) && x < 0) ||
		x === NINF ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		if ( isNegativeZero( x ) ) {
			return NINF;
		}
		return PINF;
	}
	if ( x > 171.61447887182298 ) {
		return PINF;
	}
	if ( x < -170.5674972726612 ) {
		return 0.0;
	}
	q = abs( x );
	if ( q > 33.0 ) {
		if ( x >= 0.0 ) {
			return stirlingApprox( x );
		}
		p = floor( q );

		// Check whether `x` is even...
		if ( (p&1) === 0 ) {
			sign = -1.0;
		} else {
			sign = 1.0;
		}
		z = q - p;
		if ( z > 0.5 ) {
			p += 1.0;
			z = q - p;
		}
		z = q * sin( PI * z );
		return sign * PI / ( abs(z)*stirlingApprox(q) );
	}
	// Reduce `x`...
	z = 1.0;
	while ( x >= 3.0 ) {
		x -= 1.0;
		z *= x;
	}
	while ( x < 0.0 ) {
		if ( x > -1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	while ( x < 2.0 ) {
		if ( x < 1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	if ( x === 2.0 ) {
		return z;
	}
	x -= 2.0;
	return z * rateval( x );
}


// EXPORTS //

module.exports = gamma;

},{"./rational_pq.js":103,"./small_approximation.js":104,"./stirling_approximation.js":105,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pi":53,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-integer":64,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-negative-zero":68,"@stdlib/math/base/special/abs":72,"@stdlib/math/base/special/floor":85,"@stdlib/math/base/special/sin":134}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the gamma function.
*
* @module @stdlib/math/base/special/gamma
*
* @example
* var gamma = require( '@stdlib/math/base/special/gamma' );
*
* var v = gamma( 4.0 );
* // returns 6.0
*
* v = gamma( -1.5 );
* // returns ~2.363
*
* v = gamma( -0.5 );
* // returns ~-3.545
*
* v = gamma( 0.5 );
* // returns ~1.772
*
* v = gamma( 0.0 );
* // returns Infinity
*
* v = gamma( -0.0 );
* // returns -Infinity
*
* v = gamma( NaN );
* // returns NaN
*/

// MODULES //

var gamma = require( './gamma.js' );


// EXPORTS //

module.exports = gamma;

},{"./gamma.js":100}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.08333333333334822;
	}
	return 0.08333333333334822 + (x * (0.0034722222160545866 + (x * (-0.0026813261780578124 + (x * (-0.00022954996161337813 + (x * 0.0007873113957930937))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
		return 1.0;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 1.0 + (x * (0.4942148268014971 + (x * (0.20744822764843598 + (x * (0.04763678004571372 + (x * (0.010421379756176158 + (x * (0.0011913514700658638 + (x * (0.00016011952247675185 + (x * 0.0))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.0714304917030273 + (x * (-0.23459179571824335 + (x * (0.035823639860549865 + (x * (0.011813978522206043 + (x * (-0.004456419138517973 + (x * (0.0005396055804933034 + (x * -0.000023158187332412014))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.00016011952247675185 + (x * (0.0011913514700658638 + (x * (0.010421379756176158 + (x * (0.04763678004571372 + (x * (0.20744822764843598 + (x * (0.4942148268014971 + (x * 1.0))))))))))))); // eslint-disable-line max-len
		s2 = -0.000023158187332412014 + (x * (0.0005396055804933034 + (x * (-0.004456419138517973 + (x * (0.011813978522206043 + (x * (0.035823639860549865 + (x * (-0.23459179571824335 + (x * (0.0714304917030273 + (x * 1.0))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original C code, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var EULER = require( '@stdlib/constants/float64/eulergamma' );


// MAIN //

/**
* Evaluates the gamma function using a small-value approximation.
*
* @private
* @param {number} x - input value
* @param {number} z - scale factor
* @returns {number} function value
*/
function gamma( x, z ) {
	return z / ( (1.0+( EULER*x )) * x );
}


// EXPORTS //

module.exports = gamma;

},{"@stdlib/constants/float64/eulergamma":44}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original C code, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var SQRT_TWO_PI = require( '@stdlib/constants/float64/sqrt-two-pi' );
var pow = require( '@stdlib/math/base/special/pow' );
var exp = require( '@stdlib/math/base/special/exp' );
var polyval = require( './polyval_s.js' );


// VARIABLES //

var MAX_STIRLING = 143.01608;


// MAIN //

/**
* Evaluates the gamma function using Stirling's formula. The polynomial is valid for \\(33 \leq x \leq 172\\).
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function gamma( x ) {
	var w;
	var y;
	var v;

	w = 1.0 / x;
	w = 1.0 + ( w * polyval( w ) );
	y = exp( x );

	// Check `x` to avoid `pow()` overflow...
	if ( x > MAX_STIRLING ) {
		v = pow( x, ( 0.5*x ) - 0.25 );
		y = v * (v/y);
	} else {
		y = pow( x, x-0.5 ) / y;
	}
	return SQRT_TWO_PI * y * w;
}


// EXPORTS //

module.exports = gamma;

},{"./polyval_s.js":102,"@stdlib/constants/float64/sqrt-two-pi":56,"@stdlib/math/base/special/exp":80,"@stdlib/math/base/special/pow":117}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the cosine of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-cos
*
* @example
* var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
*
* var v = kernelCos( 0.0, 0.0 );
* // returns ~1.0
*
* v = kernelCos( 3.141592653589793/6.0, 0.0 );
* // returns ~0.866
*
* v = kernelCos( 0.785, -1.144e-17 );
* // returns ~0.707
*
* v = kernelCos( NaN, 0.0 );
* // returns NaN
*/

// MODULES //

var kernelCos = require( './kernel_cos.js' );


// EXPORTS //

module.exports = kernelCos;

},{"./kernel_cos.js":107}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_cos.c}. The implementation follows the original, but has been modified for JavaScript.
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

var polyval13 = require( './polyval_c13.js' );
var polyval46 = require( './polyval_c46.js' );


// MAIN //

/**
* Computes the cosine on \\( \[-\pi/4, \pi/4] \\), where \\( \pi/4 \approx 0.785398164 \\).
*
* ## Method
*
* -   Since \\( \cos(-x) = \cos(x) \\), we need only to consider positive \\(x\\).
*
* -   If \\( x < 2^{-27} \\), return \\(1\\) which is inexact if \\( x \ne 0 \\).
*
* -   \\( cos(x) \\) is approximated by a polynomial of degree \\(14\\) on \\( \[0,\pi/4] \\).
*
*     ```tex
*     \cos(x) \approx 1 - \frac{x \cdot x}{2} + C_1 \cdot x^4 + \ldots + C_6 \cdot x^{14}
*     ```
*
*     where the Remez error is
*
*     ```tex
*     \left| \cos(x) - \left( 1 - \frac{x^2}{2} + C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{15} \right) \right| \le 2^{-58}
*     ```
*
* -   Let \\( C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{14} \\), then
*
*     ```tex
*     \cos(x) \approx 1 - \frac{x \cdot x}{2} + r
*     ```
*
*     Since
*
*     ```tex
*     \cos(x+y) \approx \cos(x) - \sin(x) \cdot y \approx \cos(x) - x \cdot y
*     ```
*
*     a correction term is necessary in \\( \cos(x) \\). Hence,
*
*     ```tex
*     \cos(x+y) = 1 - \left( \frac{x \cdot x}{2} - (r - x \cdot y) \right)
*     ```
*
*     For better accuracy, rearrange to
*
*     ```tex
*     \cos(x+y) \approx w + \left( t + ( r - x \cdot y ) \right)
*     ```
*
*     where \\( w = 1 - \frac{x \cdot x}{2} \\) and \\( t \\) is a tiny correction term (\\( 1 - \frac{x \cdot x}{2} = w + t \\) exactly in infinite precision). The exactness of \\(w + t\\) in infinite precision depends on \\(w\\) and \\(t\\) having the same precision as \\(x\\).
*
*
* @param {number} x - input value (in radians, assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of `x`
* @returns {number} cosine
*
* @example
* var v = kernelCos( 0.0, 0.0 );
* // returns ~1.0
*
* @example
* var v = kernelCos( 3.141592653589793/6.0, 0.0 );
* // returns ~0.866
*
* @example
* var v = kernelCos( 0.785, -1.144e-17 );
* // returns ~0.707
*
* @example
* var v = kernelCos( NaN, 0.0 );
* // returns NaN
*/
function kernelCos( x, y ) {
	var hz;
	var r;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = z * polyval13( z );
	r += w * w * polyval46( z );
	hz = 0.5 * z;
	w = 1.0 - hz;
	return w + ( ((1.0-w) - hz) + ((z*r) - (x*y)) );
}


// EXPORTS //

module.exports = kernelCos;

},{"./polyval_c13.js":108,"./polyval_c46.js":109}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.0416666666666666;
	}
	return 0.0416666666666666 + (x * (-0.001388888888887411 + (x * 0.00002480158728947673))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return -2.7557314351390663e-7;
	}
	return -2.7557314351390663e-7 + (x * (2.087572321298175e-9 + (x * -1.1359647557788195e-11))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the sine of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-sin
*
* @example
* var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
*
* var v = kernelSin( 0.0, 0.0 );
* // returns ~0.0
*
* v = kernelSin( 3.141592653589793/6.0, 0.0 );
* // returns ~0.5
*
* v = kernelSin( 0.619, 9.279e-18 );
* // returns ~0.581
*
* v = kernelSin( NaN, 0.0 );
* // returns NaN
*
* v = kernelSin( 3.0, NaN );
* // returns NaN
*
* v = kernelSin( NaN, NaN );
* // returns NaN
*/

// MODULES //

var kernelSin = require( './kernel_sin.js' );


// EXPORTS //

module.exports = kernelSin;

},{"./kernel_sin.js":111}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_sin.c}. The implementation follows the original, but has been modified for JavaScript.
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

// VARIABLES //

var S1 = -1.66666666666666324348e-01; // 0xBFC55555, 0x55555549
var S2 = 8.33333333332248946124e-03;  // 0x3F811111, 0x1110F8A6
var S3 = -1.98412698298579493134e-04; // 0xBF2A01A0, 0x19C161D5
var S4 = 2.75573137070700676789e-06;  // 0x3EC71DE3, 0x57B1FE7D
var S5 = -2.50507602534068634195e-08; // 0xBE5AE5E6, 0x8A2B9CEB
var S6 = 1.58969099521155010221e-10;  // 0x3DE5D93A, 0x5ACFD57C


// MAIN //

/**
* Computes the sine on \\( \approx \[-\pi/4, \pi/4] \\) (except on \\(-0\\)), where \\( \pi/4 \approx 0.7854 \\).
*
* ## Method
*
* -   Since \\( \sin(-x) = -\sin(x) \\), we need only to consider positive \\(x\\).
*
* -   Callers must return \\( \sin(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\(-0\\). Callers may do the optimization \\( \sin(x) \approx x \\) for tiny \\(x\\).
*
* -   \\( \sin(x) \\) is approximated by a polynomial of degree \\(13\\) on \\( \left\[0,\tfrac{pi}{4}\right] \\)
*
*     ```tex
*     \sin(x) \approx x + S_1 \cdot x^3 + \ldots + S_6 \cdot x^{13}
*     ```
*
*     where
*
*     ```tex
*     \left| \frac{\sin(x)}{x} \left( 1 + S_1 \cdot x + S_2 \cdot x + S_3 \cdot x + S_4 \cdot x + S_5 \cdot x + S_6 \cdot x \right) \right| \le 2^{-58}
*     ```
*
* -   We have
*
*     ```tex
*     \sin(x+y) = \sin(x) + \sin'(x') \cdot y \approx \sin(x) + (1-x*x/2) \cdot y
*     ```
*
*     For better accuracy, let
*
*     ```tex
*     r = x^3 * \left( S_2 + x^2 \cdot \left( S_3 + x^2 * \left( S_4 + x^2 \cdot ( S_5+x^2 \cdot S_6 ) \right) \right) \right)
*     ```
*
*     then
*
*     ```tex
*     \sin(x) = x + \left( S_1 \cdot x + ( x \cdot (r-y/2) + y ) \right)
*     ```
*
*
* @param {number} x - input value (in radians, assumed to be bounded by `~pi/4` in magnitude)
* @param {number} y - tail of `x`
* @returns {number} sine
*
* @example
* var v = kernelSin( 0.0, 0.0 );
* // returns ~0.0
*
* @example
* var v = kernelSin( 3.141592653589793/6.0, 0.0 );
* // returns ~0.5
*
* @example
* var v = kernelSin( 0.619, 9.279e-18 );
* // returns ~0.58
*
* @example
* var v = kernelSin( NaN, 0.0 );
* // returns NaN
*
* @example
* var v = kernelSin( 3.0, NaN );
* // returns NaN
*
* @example
* var v = kernelSin( NaN, NaN );
* // returns NaN
*/
function kernelSin( x, y ) {
	var r;
	var v;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = S2 + (z * (S3 + (z*S4))) + (z * w * (S5 + (z*S6)));
	v = z * x;
	if ( y === 0.0 ) {
		return x + (v * (S1 + (z*r)));
	}
	return x - (((z*((0.5*y) - (v*r))) - y) - (v*S1));
}


// EXPORTS //

module.exports = kernelSin;

},{}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ldexp.js":113}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":45,"@stdlib/constants/float64/max-base2-exponent":50,"@stdlib/constants/float64/max-base2-exponent-subnormal":49,"@stdlib/constants/float64/min-base2-exponent-subnormal":51,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/copysign":77,"@stdlib/number/float64/base/exponent":142,"@stdlib/number/float64/base/from-words":144,"@stdlib/number/float64/base/normalize":153,"@stdlib/number/float64/base/to-words":162}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var log1p = require( './log1p.js' );


// EXPORTS //

module.exports = log1p;

},{"./log1p.js":115}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
*
* ## Special Cases
*
* -   \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* -   \\(\operatorname{log1p}(+\infty) = +\infty\\)
* -   \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* -   \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
*
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

},{"./polyval_lp.js":116,"@stdlib/constants/float64/exponent-bias":45,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":66,"@stdlib/number/float64/base/get-high-word":148,"@stdlib/number/float64/base/set-high-word":157}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
	return 0.6666666666666735 + (x * (0.3999999999940942 + (x * (0.2857142874366239 + (x * (0.22222198432149784 + (x * (0.1818357216161805 + (x * (0.15313837699209373 + (x * 0.14798198605116586))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var pow = require( './pow.js' );


// EXPORTS //

module.exports = pow;

},{"./pow.js":123}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

// TODO: consider making an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

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

},{"./polyval_l.js":120,"@stdlib/constants/float64/exponent-bias":45,"@stdlib/number/float64/base/get-high-word":148,"@stdlib/number/float64/base/set-high-word":157,"@stdlib/number/float64/base/set-low-word":159}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":122,"@stdlib/number/float64/base/set-low-word":159}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.5999999999999946;
	}
	return 0.5999999999999946 + (x * (0.4285714285785502 + (x * (0.33333332981837743 + (x * (0.272728123808534 + (x * (0.23066074577556175 + (x * 0.20697501780033842))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],121:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"dup":81}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.5;
	}
	return 0.5 + (x * (-0.3333333333333333 + (x * 0.25)));
}


// EXPORTS //

module.exports = evalpoly;

},{}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var xIsZero = require( './x_is_zero.js' );
var yIsHuge = require( './y_is_huge.js' );
var yIsInfinite = require( './y_is_infinite.js' );
var log2ax = require( './log2ax.js' );
var logx = require( './logx.js' );
var pow2 = require( './pow2.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

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
var WORDS = [ 0|0, 0|0 ]; // WARNING: not thread safe

// Log workspace:
var LOG_WORKSPACE = [ 0.0, 0.0 ]; // WARNING: not thread safe


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
	toWords( WORDS, y );
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
	toWords( WORDS, x );
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
	toWords( WORDS, z );
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
			// signal underflow...
			return sx * TINY * TINY;
		}
		if ( lp <= (z-hp) ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
	}
	// Compute `2^(hp+lp)`...
	z = pow2( j, hp, lp );

	return sx * z;
}


// EXPORTS //

module.exports = pow;

},{"./log2ax.js":118,"./logx.js":119,"./pow2.js":124,"./x_is_zero.js":125,"./y_is_huge.js":126,"./y_is_infinite.js":127,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-integer":64,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-odd":70,"@stdlib/math/base/special/abs":72,"@stdlib/math/base/special/sqrt":136,"@stdlib/number/float64/base/set-low-word":159,"@stdlib/number/float64/base/to-words":162,"@stdlib/number/uint32/base/to-int32":166}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var polyvalP = require( './polyval_p.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3fe00000 = 1071644672 => 0 01111111110 00000000000000000000 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_BIASED_EXP_NEG_1 = 0x3fe00000|0; // asm type annotation

// TODO: consider making into an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

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

},{"./polyval_p.js":121,"@stdlib/constants/float64/exponent-bias":45,"@stdlib/constants/float64/ln-two":48,"@stdlib/math/base/special/ldexp":112,"@stdlib/number/float64/base/get-high-word":148,"@stdlib/number/float64/base/set-high-word":157,"@stdlib/number/float64/base/set-low-word":159,"@stdlib/number/uint32/base/to-int32":166}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-odd":70,"@stdlib/math/base/special/copysign":77}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

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
			// signal overflow...
			return HUGE * HUGE;
		}
		// signal underflow...
		return TINY * TINY;
	}
	// `x` has a biased exponent greater than or equal to `0`...

	if ( y > 0 ) {
		// signal overflow...
		return HUGE * HUGE;
	}
	// signal underflow...
	return TINY * TINY;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/number/float64/base/get-high-word":148}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/special/abs":72}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute `x - nπ/2 = r`.
*
* @module @stdlib/math/base/special/rempio2
*
* @example
* var rempio2 = require( '@stdlib/math/base/special/rempio2' );
*
* var y = [ 0.0, 0.0 ];
* var n = rempio2( 128.0, y );
* // returns 81
*
* var y1 = y[ 0 ];
* // returns ~0.765
*
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*/

// MODULES //

var rempio2 = require( './rempio2.js' );


// EXPORTS //

module.exports = rempio2;

},{"./rempio2.js":130}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
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

/* eslint-disable array-element-newline */

'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );


// VARIABLES //

/*
* Table of constants for `2/π` (`396` hex digits, `476` decimal).
*
* Integer array which contains the (`24*i`)-th to (`24*i+23`)-th bit of `2/π` after binary point. The corresponding floating value is
*
* ```tex
* \operatorname{ipio2}[i] \cdot 2^{-24(i+1)}
* ```
*
* This table must have at least `(e0-3)/24 + jk` terms. For quad precision (`e0 <= 16360`, `jk = 6`), this is `686`.
*/
var IPIO2 = [
	0xA2F983, 0x6E4E44, 0x1529FC, 0x2757D1, 0xF534DD, 0xC0DB62,
	0x95993C, 0x439041, 0xFE5163, 0xABDEBB, 0xC561B7, 0x246E3A,
	0x424DD2, 0xE00649, 0x2EEA09, 0xD1921C, 0xFE1DEB, 0x1CB129,
	0xA73EE8, 0x8235F5, 0x2EBB44, 0x84E99C, 0x7026B4, 0x5F7E41,
	0x3991D6, 0x398353, 0x39F49C, 0x845F8B, 0xBDF928, 0x3B1FF8,
	0x97FFDE, 0x05980F, 0xEF2F11, 0x8B5A0A, 0x6D1F6D, 0x367ECF,
	0x27CB09, 0xB74F46, 0x3F669E, 0x5FEA2D, 0x7527BA, 0xC7EBE5,
	0xF17B3D, 0x0739F7, 0x8A5292, 0xEA6BFB, 0x5FB11F, 0x8D5D08,
	0x560330, 0x46FC7B, 0x6BABF0, 0xCFBC20, 0x9AF436, 0x1DA9E3,
	0x91615E, 0xE61B08, 0x659985, 0x5F14A0, 0x68408D, 0xFFD880,
	0x4D7327, 0x310606, 0x1556CA, 0x73A8C9, 0x60E27B, 0xC08C6B
];

// Double precision array, obtained by cutting `π/2` into `24` bits chunks...
var PIO2 = [
	1.57079625129699707031e+00, // 0x3FF921FB, 0x40000000
	7.54978941586159635335e-08, // 0x3E74442D, 0x00000000
	5.39030252995776476554e-15, // 0x3CF84698, 0x80000000
	3.28200341580791294123e-22, // 0x3B78CC51, 0x60000000
	1.27065575308067607349e-29, // 0x39F01B83, 0x80000000
	1.22933308981111328932e-36, // 0x387A2520, 0x40000000
	2.73370053816464559624e-44, // 0x36E38222, 0x80000000
	2.16741683877804819444e-51  // 0x3569F31D, 0x00000000
];
var TWO24 = 1.67772160000000000000e+07;  // 0x41700000, 0x00000000
var TWON24 = 5.96046447753906250000e-08; // 0x3E700000, 0x00000000

// Arrays for storing temporary values (note that, in C, this is not thread safe):
var F = zeros( 20 );
var Q = zeros( 20 );
var FQ = zeros( 20 );
var IQ = zeros( 20 );


// FUNCTIONS //

/**
* Returns an array of zeros.
*
* @private
* @param {NonNegativeInteger} len - array length
* @returns {NonNegativeIntegerArray} output array
*/
function zeros( len ) {
	var out;
	var i;

	out = [];
	for ( i = 0; i < len; i++ ) {
		out.push( 0.0 );
	}
	return out;
}

/**
* Performs the computation for `kernelRempio2()`.
*
* @private
* @param {PositiveNumber} x - input value
* @param {(Array|TypedArray|Object)} y - output object for storing double precision numbers
* @param {integer} jz - number of terms of `ipio2[]` used
* @param {Array<integer>} q - array with integral values, representing the 24-bits chunk of the product of `x` and `2/π`
* @param {integer} q0 - the corresponding exponent of `q[0]` (the exponent for `q[i]` would be `q0-24*i`)
* @param {integer} jk - `jk+1` is the initial number of terms of `IPIO2[]` needed in the computation
* @param {integer} jv - index for pointing to the suitable `ipio2[]` for the computation
* @param {integer} jx - `nx - 1`
* @param {Array<number>} f - `IPIO2[]` in floating point
* @returns {number} last three binary digits of `N`
*/
function compute( x, y, jz, q, q0, jk, jv, jx, f ) {
	var carry;
	var fw;
	var ih;
	var jp;
	var i;
	var k;
	var n;
	var j;
	var z;

	// `jp+1` is the number of terms in `PIO2[]` needed:
	jp = jk;

	// Distill `q[]` into `IQ[]` in reverse order...
	z = q[ jz ];
	j = jz;
	for ( i = 0; j > 0; i++ ) {
		fw = ( TWON24 * z )|0;
		IQ[ i ] = ( z - (TWO24*fw) )|0;
		z = q[ j-1 ] + fw;
		j -= 1;
	}
	// Compute `n`...
	z = ldexp( z, q0 );
	z -= 8.0 * floor( z*0.125 ); // Trim off integer >= 8
	n = z|0;
	z -= n;
	ih = 0;
	if ( q0 > 0 ) {
		// Need `IQ[jz-1]` to determine `n`...
		i = ( IQ[ jz-1 ] >> (24-q0) );
		n += i;
		IQ[ jz-1 ] -= ( i << (24-q0) );
		ih = ( IQ[ jz-1 ] >> (23-q0) );
	}
	else if ( q0 === 0 ) {
		ih = ( IQ[ jz-1 ] >> 23 );
	}
	else if ( z >= 0.5 ) {
		ih = 2;
	}
	// Case: q > 0.5
	if ( ih > 0 ) {
		n += 1;
		carry = 0;

		// Compute `1-q`:
		for ( i = 0; i < jz; i++ ) {
			j = IQ[ i ];
			if ( carry === 0 ) {
				if ( j !== 0 ) {
					carry = 1;
					IQ[ i ] = 0x1000000 - j;
				}
			} else {
				IQ[ i ] = 0xffffff - j;
			}
		}
		if ( q0 > 0 ) {
			// Rare case: chance is 1 in 12...
			switch ( q0 ) { // eslint-disable-line default-case
			case 1:
				IQ[ jz-1 ] &= 0x7fffff;
				break;
			case 2:
				IQ[ jz-1 ] &= 0x3fffff;
				break;
			}
		}
		if ( ih === 2 ) {
			z = 1.0 - z;
			if ( carry !== 0 ) {
				z -= ldexp( 1.0, q0 );
			}
		}
	}
	// Check if re-computation is needed...
	if ( z === 0.0 ) {
		j = 0;
		for ( i = jz-1; i >= jk; i-- ) {
			j |= IQ[ i ];
		}
		if ( j === 0 ) {
			// Need re-computation...
			for ( k = 1; IQ[ jk-k ] === 0; k++ ) {
				// `k` is the number of terms needed...
			}
			for ( i = jz+1; i <= jz+k; i++ ) {
				// Add `q[jz+1]` to `q[jz+k]`...
				f[ jx+i ] = IPIO2[ jv+i ];
				fw = 0.0;
				for ( j = 0; j <= jx; j++ ) {
					fw += x[ j ] * f[ jx + (i-j) ];
				}
				q[ i ] = fw;
			}
			jz += k;
			return compute( x, y, jz, q, q0, jk, jv, jx, f );
		}
	}
	// Chop off zero terms...
	if ( z === 0.0 ) {
		jz -= 1;
		q0 -= 24;
		while ( IQ[ jz ] === 0 ) {
			jz -= 1;
			q0 -= 24;
		}
	} else {
		// Break `z` into 24-bit if necessary...
		z = ldexp( z, -q0 );
		if ( z >= TWO24 ) {
			fw = (TWON24*z)|0;
			IQ[ jz ] = ( z - (TWO24*fw) )|0;
			jz += 1;
			q0 += 24;
			IQ[ jz ] = fw;
		} else {
			IQ[ jz ] = z|0;
		}
	}
	// Convert integer "bit" chunk to floating-point value...
	fw = ldexp( 1.0, q0 );
	for ( i = jz; i >= 0; i-- ) {
		q[ i ] = fw * IQ[i];
		fw *= TWON24;
	}
	// Compute `PIO2[0,...,jp]*q[jz,...,0]`...
	for ( i = jz; i >= 0; i-- ) {
		fw = 0.0;
		for ( k = 0; k <= jp && k <= jz-i; k++ ) {
			fw += PIO2[ k ] * q[ i+k ];
		}
		FQ[ jz-i ] = fw;
	}
	// Compress `FQ[]` into `y[]`...
	fw = 0.0;
	for ( i = jz; i >= 0; i-- ) {
		fw += FQ[ i ];
	}
	if ( ih === 0 ) {
		y[ 0 ] = fw;
	} else {
		y[ 0 ] = -fw;
	}
	fw = FQ[ 0 ] - fw;
	for ( i = 1; i <= jz; i++ ) {
		fw += FQ[i];
	}
	if ( ih === 0 ) {
		y[ 1 ] = fw;
	} else {
		y[ 1 ] = -fw;
	}
	return ( n & 7 );
}


// MAIN //

/**
* Returns the last three binary digits of `N` with `y = x - Nπ/2` so that `|y| < π/2`.
*
* ## Method
*
* -   The method is to compute the integer (`mod 8`) and fraction parts of `2x/π` without doing the full multiplication. In general, we skip the part of the product that is known to be a huge integer (more accurately, equals `0 mod 8` ). Thus, the number of operations is independent of the exponent of the input.
*
* @private
* @param {PositiveNumber} x - input value
* @param {(Array|TypedArray|Object)} y - remainder elements
* @param {PositiveInteger} e0 - the exponent of `x[0]` (must be <= 16360)
* @param {PositiveInteger} nx - dimension of `x[]`
* @returns {number} last three binary digits of `N`
*/
function kernelRempio2( x, y, e0, nx ) {
	var fw;
	var jk;
	var jv;
	var jx;
	var jz;
	var q0;
	var i;
	var j;
	var m;

	// Initialize `jk` for double-precision floating-point numbers:
	jk = 4;

	// Determine `jx`, `jv`, `q0` (note that `q0 < 3`):
	jx = nx - 1;
	jv = ( (e0 - 3) / 24 )|0;
	if ( jv < 0 ) {
		jv = 0;
	}
	q0 = e0 - (24 * (jv + 1));

	// Set up `F[0]` to `F[jx+jk]` where `F[jx+jk] = IPIO2[jv+jk]`:
	j = jv - jx;
	m = jx + jk;
	for ( i = 0; i <= m; i++ ) {
		if ( j < 0 ) {
			F[ i ] = 0.0;
		} else {
			F[ i ] = IPIO2[ j ];
		}
		j += 1;
	}
	// Compute `Q[0],Q[1],...,Q[jk]`:
	for ( i = 0; i <= jk; i++ ) {
		fw = 0.0;
		for ( j = 0; j <= jx; j++ ) {
			fw += x[ j ] * F[ jx + (i-j) ];
		}
		Q[ i ] = fw;
	}
	jz = jk;
	return compute( x, y, jz, Q, q0, jk, jv, jx, F );
}


// EXPORTS //

module.exports = kernelRempio2;

},{"@stdlib/math/base/special/floor":85,"@stdlib/math/base/special/ldexp":112}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
*
* Optimized by Bruce D. Evans.
* ```
*/

'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var getLowWord = require( '@stdlib/number/float64/base/get-low-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var rempio2Kernel = require( './kernel_rempio2.js' );
var rempio2Medium = require( './rempio2_medium.js' );


// VARIABLES //

var ZERO = 0.00000000000000000000e+00;    // 0x00000000, 0x00000000
var TWO24 = 1.67772160000000000000e+07;   // 0x41700000, 0x00000000

// 33 bits of π/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = π/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331
var TWO_PIO2_1T = 2.0 * PIO2_1T;
var THREE_PIO2_1T = 3.0 * PIO2_1T;
var FOUR_PIO2_1T = 4.0 * PIO2_1T;

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word significand mask: 0xfffff = 1048575 => 00000000000011111111111111111111
var SIGNIFICAND_MASK = 0xfffff|0; // asm type annotation

// High word significand for π and π/2: 0x921fb = 598523 => 00000000000010010010000111111011
var PI_HIGH_WORD_SIGNIFICAND = 0x921fb|0; // asm type annotation

// High word for π/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// High word for 3π/4: 0x4002d97c = 1073928572 => 01000000000000101101100101111100
var THREE_PIO4_HIGH_WORD = 0x4002d97c|0; // asm type annotation

// High word for 5π/4: 0x400f6a7a = 1074752122 => 01000000000011110110101001111010
var FIVE_PIO4_HIGH_WORD = 0x400f6a7a|0; // asm type annotation

// High word for 6π/4: 0x4012d97c = 1074977148 => 01000000000100101101100101111100
var THREE_PIO2_HIGH_WORD = 0x4012d97c|0; // asm type annotation

// High word for 7π/4: 0x4015fdbc = 1075183036 => 01000000000101011111110110111100
var SEVEN_PIO4_HIGH_WORD = 0x4015fdbc|0; // asm type annotation

// High word for 8π/4: 0x401921fb = 1075388923 => 01000000000110010010000111111011
var TWO_PI_HIGH_WORD = 0x401921fb|0; // asm type annotation

// High word for 9π/4: 0x401c463b = 1075594811 => 01000000000111000100011000111011
var NINE_PIO4_HIGH_WORD = 0x401c463b|0; // asm type annotation

// 2^20*π/2 = 1647099.3291652855 => 0100000100111001001000011111101101010100010001000010110100011000 => high word => 0x413921fb = 1094263291 => 01000001001110010010000111111011
var MEDIUM = 0x413921fb|0; // asm type annotation

// Arrays for storing temporary values:
var TX = [ 0.0, 0.0, 0.0 ]; // WARNING: not thread safe
var TY = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Computes `x - nπ/2 = r`.
*
* ## Notes
*
* -   Returns `n` and stores the remainder `r` as two numbers `y[0]` and `y[1]`, such that `y[0]+y[1] = r`.
*
*
* @param {number} x - input value
* @param {(Array|TypedArray|Object)} y - remainder elements
* @returns {integer} factor of `π/2`
*
* @example
* var y = [ 0.0, 0.0 ];
* var n = rempio2( 128.0, y );
* // returns 81
*
* var y1 = y[ 0 ];
* // returns ~0.765
*
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*
* @example
* var y = [ 0.0, 0.0 ];
* var n = rempio2( NaN, y );
* // returns 0
*
* var y1 = y[ 0 ];
* // returns NaN
*
* var y2 = y[ 1 ];
* // returns NaN
*/
function rempio2( x, y ) {
	var low;
	var e0;
	var hx;
	var ix;
	var nx;
	var i;
	var n;
	var z;

	hx = getHighWord( x );
	ix = (hx & ABS_MASK)|0; // asm type annotation

	// Case: |x| ~<= π/4 (no need for reduction)
	if ( ix <= PIO4_HIGH_WORD ) {
		y[ 0 ] = x;
		y[ 1 ] = 0.0;
		return 0;
	}
	// Case: |x| ~<= 5π/4
	if ( ix <= FIVE_PIO4_HIGH_WORD ) {
		// Case: |x| ~= π/2 or π
		if ( (ix & SIGNIFICAND_MASK) === PI_HIGH_WORD_SIGNIFICAND ) {
			// Cancellation => use medium case
			return rempio2Medium( x, ix, y );
		}
		// Case: |x| ~<= 3π/4
		if ( ix <= THREE_PIO4_HIGH_WORD ) {
			if ( x > 0.0 ) {
				z = x - PIO2_1;
				y[ 0 ] = z - PIO2_1T;
				y[ 1 ] = (z - y[0]) - PIO2_1T;
				return 1;
			}
			z = x + PIO2_1;
			y[ 0 ] = z + PIO2_1T;
			y[ 1 ] = (z - y[0]) + PIO2_1T;
			return -1;
		}
		if ( x > 0.0 ) {
			z = x - ( 2.0*PIO2_1 );
			y[ 0 ] = z - TWO_PIO2_1T;
			y[ 1 ] = (z - y[0]) - TWO_PIO2_1T;
			return 2;
		}
		z = x + ( 2.0*PIO2_1 );
		y[ 0 ] = z + TWO_PIO2_1T;
		y[ 1 ] = (z - y[0]) + TWO_PIO2_1T;
		return -2;
	}
	// Case: |x| ~<= 9π/4
	if ( ix <= NINE_PIO4_HIGH_WORD ) {
		// Case: |x| ~<= 7π/4
		if ( ix <= SEVEN_PIO4_HIGH_WORD ) {
			// Case: |x| ~= 3π/2
			if ( ix === THREE_PIO2_HIGH_WORD ) {
				return rempio2Medium( x, ix, y );
			}
			if ( x > 0.0 ) {
				z = x - ( 3.0*PIO2_1 );
				y[ 0 ] = z - THREE_PIO2_1T;
				y[ 1 ] = (z - y[0]) - THREE_PIO2_1T;
				return 3;
			}
			z = x + ( 3.0*PIO2_1 );
			y[ 0 ] = z + THREE_PIO2_1T;
			y[ 1 ] = (z - y[0]) + THREE_PIO2_1T;
			return -3;
		}
		// Case: |x| ~= 4π/2
		if ( ix === TWO_PI_HIGH_WORD ) {
			return rempio2Medium( x, ix, y );
		}
		if ( x > 0.0 ) {
			z = x - ( 4.0*PIO2_1 );
			y[ 0 ] = z - FOUR_PIO2_1T;
			y[ 1 ] = (z - y[0]) - FOUR_PIO2_1T;
			return 4;
		}
		z = x + ( 4.0*PIO2_1 );
		y[ 0 ] = z + FOUR_PIO2_1T;
		y[ 1 ] = (z - y[0]) + FOUR_PIO2_1T;
		return -4;
	}
	// Case: |x| ~< 2^20*π/2 (medium size)
	if ( ix < MEDIUM ) {
		return rempio2Medium( x, ix, y );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		y[ 0 ] = NaN;
		y[ 1 ] = NaN;
		return 0.0;
	}
	// Set z = scalbn(|x|, ilogb(x)-23)...
	low = getLowWord( x );
	e0 = (ix >> 20) - 1046; // `e0 = ilogb(z) - 23` => unbiased exponent minus 23
	z = fromWords( ix - ((e0 << 20)|0), low );
	for ( i = 0; i < 2; i++ ) {
		TX[ i ] = z|0;
		z = (z - TX[i]) * TWO24;
	}
	TX[ 2 ] = z;
	nx = 3;
	while ( TX[ nx-1 ] === ZERO ) {
		// Skip zero term...
		nx -= 1;
	}
	n = rempio2Kernel( TX, TY, e0, nx, 1 );
	if ( x < 0.0 ) {
		y[ 0 ] = -TY[ 0 ];
		y[ 1 ] = -TY[ 1 ];
		return -n;
	}
	y[ 0 ] = TY[ 0 ];
	y[ 1 ] = TY[ 1 ];
	return n;
}


// EXPORTS //

module.exports = rempio2;

},{"./kernel_rempio2.js":129,"./rempio2_medium.js":131,"@stdlib/number/float64/base/from-words":144,"@stdlib/number/float64/base/get-high-word":148,"@stdlib/number/float64/base/get-low-word":150}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
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

var round = require( '@stdlib/math/base/special/round' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// VARIABLES //

// 53 bits of 2/π:
var INVPIO2 = 6.36619772367581382433e-01; // 0x3FE45F30, 0x6DC9C883

// First 33 bits of π/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = π/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331

// Another 33 bits of π/2:
var PIO2_2 = 6.07710050630396597660e-11;  // 0x3DD0B461, 0x1A600000

// PIO2_2T = π/2 - ( PIO2_1 + PIO2_2 ):
var PIO2_2T = 2.02226624879595063154e-21; // 0x3BA3198A, 0x2E037073

// Another 33 bits of π/2:
var PIO2_3 = 2.02226624871116645580e-21;  // 0x3BA3198A, 0x2E000000

// PIO2_3T = π/2 - ( PIO2_1 + PIO2_2 + PIO2_3 ):
var PIO2_3T = 8.47842766036889956997e-32; // 0x397B839A, 0x252049C1

// Exponent mask (2047 => 0x7ff):
var EXPONENT_MASK = 0x7ff|0; // asm type annotation


// MAIN //

/**
* Computes `x - nπ/2 = r` for medium-sized inputs.
*
* @private
* @param {number} x - input value
* @param {uint32} ix - high word of `x`
* @param {(Array|TypedArray|Object)} y - remainder elements
* @returns {integer} factor of `π/2`
*/
function rempio2Medium( x, ix, y ) {
	var high;
	var n;
	var t;
	var r;
	var w;
	var i;
	var j;

	n = round( x * INVPIO2 );
	r = x - ( n * PIO2_1 );
	w = n * PIO2_1T;

	// First rounding (good to 85 bits)...
	j = (ix >> 20)|0; // asm type annotation
	y[ 0 ] = r - w;
	high = getHighWord( y[0] );
	i = j - ( (high >> 20) & EXPONENT_MASK );

	// Check if a second iteration is needed (good to 118 bits)...
	if ( i > 16 ) {
		t = r;
		w = n * PIO2_2;
		r = t - w;
		w = (n * PIO2_2T) - ((t-r) - w);
		y[ 0 ] = r - w;
		high = getHighWord( y[0] );
		i = j - ( (high >> 20) & EXPONENT_MASK );

		// Check if a third iteration is needed (151 bits accumulated)...
		if ( i > 49 ) {
			t = r;
			w = n * PIO2_3;
			r = t - w;
			w = (n * PIO2_3T) - ((t-r) - w);
			y[ 0 ] = r - w;
		}
	}
	y[ 1 ] = (r - y[0]) - w;
	return n;
}


// EXPORTS //

module.exports = rempio2Medium;

},{"@stdlib/math/base/special/round":132,"@stdlib/number/float64/base/get-high-word":148}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: implementation

/**
* Round a numeric value to the nearest integer.
*
* @module @stdlib/math/base/special/round
*
* @example
* var round = require( '@stdlib/math/base/special/round' );
*
* var v = round( -4.2 );
* // returns -4.0
*
* v = round( -4.5 );
* // returns -4.0
*
* v = round( -4.6 );
* // returns -5.0
*
* v = round( 9.99999 );
* // returns 10.0
*
* v = round( 9.5 );
* // returns 10.0
*
* v = round( 9.2 );
* // returns 9.0
*
* v = round( 0.0 );
* // returns 0.0
*
* v = round( -0.0 );
* // returns -0.0
*
* v = round( Infinity );
* // returns Infinity
*
* v = round( -Infinity );
* // returns -Infinity
*
* v = round( NaN );
* // returns NaN
*/

// MODULES //

var round = require( './round.js' );


// EXPORTS //

module.exports = round;

},{"./round.js":133}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: implementation

/**
* Rounds a numeric value to the nearest integer.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = round( -4.2 );
* // returns -4.0
*
* @example
* var v = round( -4.5 );
* // returns -4.0
*
* @example
* var v = round( -4.6 );
* // returns -5.0
*
* @example
* var v = round( 9.99999 );
* // returns 10.0
*
* @example
* var v = round( 9.5 );
* // returns 10.0
*
* @example
* var v = round( 9.2 );
* // returns 9.0
*
* @example
* var v = round( 0.0 );
* // returns 0.0
*
* @example
* var v = round( -0.0 );
* // returns -0.0
*
* @example
* var v = round( Infinity );
* // returns Infinity
*
* @example
* var v = round( -Infinity );
* // returns -Infinity
*
* @example
* var v = round( NaN );
* // returns NaN
*/
var round = Math.round; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = round;

},{}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the sine of a number.
*
* @module @stdlib/math/base/special/sin
*
* @example
* var sin = require( '@stdlib/math/base/special/sin' );
*
* var v = sin( 0.0 );
* // returns ~0.0
*
* v = sin( 3.141592653589793/2.0 );
* // returns ~1.0
*
* v = sin( -3.141592653589793/6.0 );
* // returns ~-0.5
*
* v = sin( NaN );
* // returns NaN
*/

// MODULES //

var sin = require( './sin.js' );


// EXPORTS //

module.exports = sin;

},{"./sin.js":135}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_sin.c}. The implementation follows the original, but has been modified for JavaScript.
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
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// 2^-26 = 1.4901161193847656e-8 => 0011111001010000000000000000000000000000000000000000000000000000 => high word => 00111110010100000000000000000000 => 0x3e500000 = 1045430272
var SMALL_HIGH_WORD = 0x3e500000|0; // asm type annotation

// Array for storing remainder elements:
var Y = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Computes the sine of a number.
*
* ## Method
*
* -   Let \\(S\\), \\(C\\), and \\(T\\) denote the \\(\sin\\), \\(\cos\\), and \\(\tan\\), respectively, on \\(\[-\pi/4, +\pi/4\]\\).
*
* -   Reduce the argument \\(x\\) to \\(y1+y2 = x-k\pi/2\\) in \\(\[-\pi/4, +\pi/4\]\\), and let \\(n = k \mod 4\\).
*
* -   We have
*
*     | n | sin(x) | cos(x) | tan(x) |
*     | - | ------ | ------ | ------ |
*     | 0 |   S    |   C    |    T   |
*     | 1 |   C    |  -S    |  -1/T  |
*     | 2 |  -S    |  -C    |    T   |
*     | 3 |  -C    |   S    |  -1/T  |
*
*
* @param {number} x - input value (in radians)
* @returns {number} sine
*
* @example
* var v = sin( 0.0 );
* // returns ~0.0
*
* @example
* var v = sin( 3.141592653589793/2.0 );
* // returns ~1.0
*
* @example
* var v = sin( -3.141592653589793/6.0 );
* // returns ~-0.5
*
* @example
* var v = sin( NaN );
* // returns NaN
*/
function sin( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= ABS_MASK;

	// Case: |x| ~< π/4
	if ( ix <= PIO4_HIGH_WORD ) {
		// Case: |x| ~< 2^-26
		if ( ix < SMALL_HIGH_WORD ) {
			return x;
		}
		return kernelSin( x, 0.0 );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction...
	n = rempio2( x, Y );
	switch ( n & 3 ) {
	case 0:
		return kernelSin( Y[ 0 ], Y[ 1 ] );
	case 1:
		return kernelCos( Y[ 0 ], Y[ 1 ] );
	case 2:
		return -kernelSin( Y[ 0 ], Y[ 1 ] );
	default:
		return -kernelCos( Y[ 0 ], Y[ 1 ] );
	}
}


// EXPORTS //

module.exports = sin;

},{"@stdlib/math/base/special/kernel-cos":106,"@stdlib/math/base/special/kernel-sin":110,"@stdlib/math/base/special/rempio2":128,"@stdlib/number/float64/base/get-high-word":148}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":137}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":139}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":74,"@stdlib/math/base/special/floor":85}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":141}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":143}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":45,"@stdlib/constants/float64/high-word-exponent-mask":47,"@stdlib/number/float64/base/get-high-word":148}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":146}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":145,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":149}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":147,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return an unsigned 32-bit integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-low-word
*
* @example
* var getLowWord = require( '@stdlib/number/float64/base/get-low-word' );
*
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/

// MODULES //

var getLowWord = require( './main.js' );


// EXPORTS //

module.exports = getLowWord;

},{"./main.js":152}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Returns a 32-bit unsigned integer corresponding to the less significant 32 bits of a double-precision floating-point number.
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
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - input value
* @returns {uinteger32} lower order word
*
* @example
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/
function getLowWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ LOW ];
}


// EXPORTS //

module.exports = getLowWord;

},{"./low.js":151,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":155}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":55,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":72}],156:[function(require,module,exports){
arguments[4][147][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":147}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":156,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var setLowWord = require( './main.js' );


// EXPORTS //

module.exports = setLowWord;

},{"./main.js":161}],160:[function(require,module,exports){
arguments[4][151][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":151}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":160,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],162:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":164}],163:[function(require,module,exports){
arguments[4][145][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":145}],164:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":165}],165:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":163,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],166:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":167}],167:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./native_class.js":169,"./polyfill.js":170,"@stdlib/assert/has-tostringtag-support":20}],169:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":171}],170:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":171,"./tostringtag.js":172,"@stdlib/assert/has-own-property":16}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){

},{}],175:[function(require,module,exports){
arguments[4][174][0].apply(exports,arguments)
},{"dup":174}],176:[function(require,module,exports){
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

},{}],177:[function(require,module,exports){
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
},{"_process":268}],178:[function(require,module,exports){
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

},{"events":176,"inherits":263,"readable-stream/lib/_stream_duplex.js":180,"readable-stream/lib/_stream_passthrough.js":181,"readable-stream/lib/_stream_readable.js":182,"readable-stream/lib/_stream_transform.js":183,"readable-stream/lib/_stream_writable.js":184,"readable-stream/lib/internal/streams/end-of-stream.js":188,"readable-stream/lib/internal/streams/pipeline.js":190}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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
},{"./_stream_readable":182,"./_stream_writable":184,"_process":268,"inherits":263}],181:[function(require,module,exports){
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
},{"./_stream_transform":183,"inherits":263}],182:[function(require,module,exports){
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
},{"../errors":179,"./_stream_duplex":180,"./internal/streams/async_iterator":185,"./internal/streams/buffer_list":186,"./internal/streams/destroy":187,"./internal/streams/from":189,"./internal/streams/state":191,"./internal/streams/stream":192,"_process":268,"buffer":193,"events":176,"inherits":263,"string_decoder/":275,"util":174}],183:[function(require,module,exports){
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
},{"../errors":179,"./_stream_duplex":180,"inherits":263}],184:[function(require,module,exports){
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
},{"../errors":179,"./_stream_duplex":180,"./internal/streams/destroy":187,"./internal/streams/state":191,"./internal/streams/stream":192,"_process":268,"buffer":193,"inherits":263,"util-deprecate":284}],185:[function(require,module,exports){
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
},{"./end-of-stream":188,"_process":268}],186:[function(require,module,exports){
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
},{"buffer":193,"util":174}],187:[function(require,module,exports){
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
},{"_process":268}],188:[function(require,module,exports){
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
},{"../../../errors":179}],189:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],190:[function(require,module,exports){
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
},{"../../../errors":179,"./end-of-stream":188}],191:[function(require,module,exports){
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
},{"../../../errors":179}],192:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":176}],193:[function(require,module,exports){
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
},{"base64-js":173,"buffer":193,"ieee754":262}],194:[function(require,module,exports){
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

},{"./":195,"get-intrinsic":258}],195:[function(require,module,exports){
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

},{"function-bind":257,"get-intrinsic":258}],196:[function(require,module,exports){
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

},{"./lib/is_arguments.js":197,"./lib/keys.js":198}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],199:[function(require,module,exports){
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

},{"object-keys":266}],200:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],201:[function(require,module,exports){
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

},{"./ToNumber":231,"./ToPrimitive":233,"./Type":238}],202:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/isNaN":248,"../helpers/isPrefixOf":249,"./ToNumber":231,"./ToPrimitive":233,"./Type":238,"get-intrinsic":258}],203:[function(require,module,exports){
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

},{"get-intrinsic":258}],204:[function(require,module,exports){
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

},{"./DayWithinYear":207,"./InLeapYear":211,"./MonthFromTime":221,"get-intrinsic":258}],205:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":253,"./floor":242}],206:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":242}],207:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":205,"./DayFromYear":206,"./YearFromTime":240}],208:[function(require,module,exports){
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

},{"./modulo":243}],209:[function(require,module,exports){
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

},{"../helpers/assertRecord":246,"./IsAccessorDescriptor":212,"./IsDataDescriptor":214,"./Type":238,"get-intrinsic":258}],210:[function(require,module,exports){
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

},{"../helpers/timeConstants":253,"./floor":242,"./modulo":243}],211:[function(require,module,exports){
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

},{"./DaysInYear":208,"./YearFromTime":240,"get-intrinsic":258}],212:[function(require,module,exports){
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

},{"../helpers/assertRecord":246,"./Type":238,"has":261}],213:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":264}],214:[function(require,module,exports){
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

},{"../helpers/assertRecord":246,"./Type":238,"has":261}],215:[function(require,module,exports){
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

},{"../helpers/assertRecord":246,"./IsAccessorDescriptor":212,"./IsDataDescriptor":214,"./Type":238}],216:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":250,"./IsAccessorDescriptor":212,"./IsDataDescriptor":214,"./Type":238}],217:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/timeConstants":253}],218:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"./DateFromTime":204,"./Day":205,"./MonthFromTime":221,"./ToInteger":230,"./YearFromTime":240,"./floor":242,"./modulo":243,"get-intrinsic":258}],219:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/timeConstants":253,"./ToInteger":230}],220:[function(require,module,exports){
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

},{"../helpers/timeConstants":253,"./floor":242,"./modulo":243}],221:[function(require,module,exports){
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

},{"./DayWithinYear":207,"./InLeapYear":211}],222:[function(require,module,exports){
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

},{"../helpers/isNaN":248}],223:[function(require,module,exports){
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

},{"../helpers/timeConstants":253,"./floor":242,"./modulo":243}],224:[function(require,module,exports){
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

},{"./Type":238}],225:[function(require,module,exports){
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


},{"../helpers/isFinite":247,"./ToNumber":231,"./abs":241,"get-intrinsic":258}],226:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":253,"./DayFromYear":206}],227:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":253,"./modulo":243}],228:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],229:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":231}],230:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/isNaN":248,"../helpers/sign":252,"./ToNumber":231,"./abs":241,"./floor":242}],231:[function(require,module,exports){
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

},{"./ToPrimitive":233}],232:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":203,"get-intrinsic":258}],233:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":254}],234:[function(require,module,exports){
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

},{"./IsCallable":213,"./ToBoolean":228,"./Type":238,"get-intrinsic":258,"has":261}],235:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":258}],236:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/isNaN":248,"../helpers/sign":252,"./ToNumber":231,"./abs":241,"./floor":242,"./modulo":243}],237:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":231}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":205,"./modulo":243}],240:[function(require,module,exports){
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

},{"call-bind/callBound":194,"get-intrinsic":258}],241:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":258}],242:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],243:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":251}],244:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":253,"./modulo":243}],245:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":201,"./5/AbstractRelationalComparison":202,"./5/CheckObjectCoercible":203,"./5/DateFromTime":204,"./5/Day":205,"./5/DayFromYear":206,"./5/DayWithinYear":207,"./5/DaysInYear":208,"./5/FromPropertyDescriptor":209,"./5/HourFromTime":210,"./5/InLeapYear":211,"./5/IsAccessorDescriptor":212,"./5/IsCallable":213,"./5/IsDataDescriptor":214,"./5/IsGenericDescriptor":215,"./5/IsPropertyDescriptor":216,"./5/MakeDate":217,"./5/MakeDay":218,"./5/MakeTime":219,"./5/MinFromTime":220,"./5/MonthFromTime":221,"./5/SameValue":222,"./5/SecFromTime":223,"./5/StrictEqualityComparison":224,"./5/TimeClip":225,"./5/TimeFromYear":226,"./5/TimeWithinDay":227,"./5/ToBoolean":228,"./5/ToInt32":229,"./5/ToInteger":230,"./5/ToNumber":231,"./5/ToObject":232,"./5/ToPrimitive":233,"./5/ToPropertyDescriptor":234,"./5/ToString":235,"./5/ToUint16":236,"./5/ToUint32":237,"./5/Type":238,"./5/WeekDay":239,"./5/YearFromTime":240,"./5/abs":241,"./5/floor":242,"./5/modulo":243,"./5/msFromTime":244}],246:[function(require,module,exports){
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

},{"get-intrinsic":258,"has":261}],247:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],248:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],249:[function(require,module,exports){
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

},{"call-bind/callBound":194}],250:[function(require,module,exports){
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

},{"get-intrinsic":258,"has":261}],251:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],252:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],253:[function(require,module,exports){
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

},{}],254:[function(require,module,exports){
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

},{"./helpers/isPrimitive":255,"is-callable":264}],255:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],256:[function(require,module,exports){
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

},{}],257:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":256}],258:[function(require,module,exports){
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

},{"function-bind":257,"has":261,"has-symbols":259}],259:[function(require,module,exports){
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

},{"./shams":260}],260:[function(require,module,exports){
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

},{}],261:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":257}],262:[function(require,module,exports){
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

},{}],263:[function(require,module,exports){
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

},{}],264:[function(require,module,exports){
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

},{}],265:[function(require,module,exports){
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

},{"./isArguments":267}],266:[function(require,module,exports){
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

},{"./implementation":265,"./isArguments":267}],267:[function(require,module,exports){
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

},{}],268:[function(require,module,exports){
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

},{}],269:[function(require,module,exports){
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
},{"_process":268,"through":282,"timers":283}],270:[function(require,module,exports){
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

},{"buffer":193}],271:[function(require,module,exports){
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

},{"es-abstract/es5":245,"function-bind":257}],272:[function(require,module,exports){
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

},{"./implementation":271,"./polyfill":273,"./shim":274,"define-properties":199,"function-bind":257}],273:[function(require,module,exports){
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

},{"./polyfill":273,"define-properties":199}],275:[function(require,module,exports){
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
},{"safe-buffer":270}],276:[function(require,module,exports){
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
},{"./lib/default_stream":277,"./lib/results":279,"./lib/test":280,"_process":268,"defined":200,"through":282,"timers":283}],277:[function(require,module,exports){
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
},{"_process":268,"fs":175,"through":282}],278:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":268,"timers":283}],279:[function(require,module,exports){
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
},{"_process":268,"events":176,"function-bind":257,"has":261,"inherits":263,"object-inspect":281,"resumer":269,"through":282,"timers":283}],280:[function(require,module,exports){
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
},{"./next_tick":278,"deep-equal":196,"defined":200,"events":176,"has":261,"inherits":263,"path":177,"string.prototype.trim":272}],281:[function(require,module,exports){
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
},{"_process":268,"stream":178}],283:[function(require,module,exports){
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
},{"process/browser.js":268,"timers":283}],284:[function(require,module,exports){
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
},{}]},{},[96]);
