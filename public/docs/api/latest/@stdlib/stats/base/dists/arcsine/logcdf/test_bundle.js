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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":49}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":50}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":51}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":92}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":92}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":92}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":92}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* One fourth times the mathematical constant `π`.
*
* @module @stdlib/constants/float64/fourth-pi
* @type {number}
*
* @example
* var FOURTH_PI = require( '@stdlib/constants/float64/fourth-pi' );
* // returns 7.85398163397448309616e-1
*/


// MAIN //

/**
* One fourth times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 7.85398163397448309616e-1
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var FOURTH_PI = 7.85398163397448309616e-1;


// EXPORTS //

module.exports = FOURTH_PI;

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
* Natural logarithm of the mathematical constant `π`.
*
* @module @stdlib/constants/float64/ln-pi
* @type {number}
*
* @example
* var LN_PI = require( '@stdlib/constants/float64/ln-pi' );
* // returns 1.1447298858494002
*/


// MAIN //

/**
* Natural logarithm of the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 1.1447298858494002
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var LN_PI = 1.1447298858494002;


// EXPORTS //

module.exports = LN_PI;

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

},{"@stdlib/number/ctor":66}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":53}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":55}],55:[function(require,module,exports){
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
*
*
* ## Notice
*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1995, 2000 by Stephen L. Moshier
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
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PIO4 = require( '@stdlib/constants/float64/fourth-pi' );
var ratevalPQ = require( './rational_pq.js' );
var ratevalRS = require( './rational_rs.js' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS


// MAIN //

/**
* Computes the arcsine of a number.
*
* ## Method
*
* -   A rational function of the form
*
*     ```tex
*     x + x^3 \frac{P(x^2)}{Q(x^2)}
*     ```
*
*     is used for \\(\|x\|\\) in the interval \\(\[0, 0.5\]\\). If \\(\|x\| > 0.5\\), it is transformed by the identity
*
*     ```tex
*     \operatorname{asin}(x) = \frac{\pi}{2} - 2 \operatorname{asin}( \sqrt{ (1-x)/2 } )
*     ```
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain | # trials | peak    | rms     |
*     |:-----------|:-------|:---------|:--------|:--------|
*     | DEC        | -1, 1  | 40000    | 2.6e-17 | 7.1e-18 |
*     | IEEE       | -1, 1  | 10^6     | 1.9e-16 | 5.4e-17 |
*
* @param {number} x - input value
* @returns {number} arcsine (in radians)
*
* @example
* var v = asin( 0.0 );
* // returns ~0.0
*
* @example
* var v = asin( 3.141592653589793/4.0 );
* // returns ~0.903
*
* @example
* var v = asin( -3.141592653589793/6.0 );
* // returns ~-0.551
*
* @example
* var v = asin( NaN );
* // returns NaN
*/
function asin( x ) {
	var sgn;
	var zz;
	var a;
	var p;
	var z;

	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x > 0.0 ) {
		a = x;
	} else {
		sgn = true;
		a = -x;
	}
	if ( a > 1.0 ) {
		return NaN;
	}
	if ( a > 0.625 ) {
		// arcsin(1-x) = pi/2 - sqrt(2x)(1+R(x))
		zz = 1.0 - a;
		p = zz * ratevalRS( zz );
		zz = sqrt( zz + zz );
		z = PIO4 - zz;
		zz = ( zz*p ) - MOREBITS;
		z -= zz;
		z += PIO4;
	} else {
		if ( a < 1.0e-8 ) {
			return x;
		}
		zz = a * a;
		z = zz * ratevalPQ( zz );
		z = ( a*z ) + a;
	}
	return ( sgn ) ? -z : z;
}


// EXPORTS //

module.exports = asin;

},{"./rational_pq.js":58,"./rational_rs.js":59,"@stdlib/constants/float64/fourth-pi":44,"@stdlib/math/base/assert/is-nan":52,"@stdlib/math/base/special/sqrt":64}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the arcsine of a number.
*
* @module @stdlib/math/base/special/asin
*
* @example
* var asin = require( '@stdlib/math/base/special/asin' );
*
* var v = asin( 0.0 );
* // returns 0.0
*
* v = asin( 3.141592653589793/4.0 );
* // returns ~0.903
*
* v = asin( -3.141592653589793/6.0 );
* // returns ~-0.551
*
* v = asin( NaN );
* // returns NaN
*/

// MODULES //

var asin = require( './asin.js' );


// EXPORTS //

module.exports = asin;

},{"./asin.js":56}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.16666666666666713;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -8.198089802484825 + (x * (19.562619833175948 + (x * (-16.262479672107002 + (x * (5.444622390564711 + (x * (-0.6019598008014124 + (x * 0.004253011369004428))))))))); // eslint-disable-line max-len
		s2 = -49.18853881490881 + (x * (139.51056146574857 + (x * (-147.1791292232726 + (x * (70.49610280856842 + (x * (-14.740913729888538 + (x * 1.0))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.004253011369004428 + (x * (-0.6019598008014124 + (x * (5.444622390564711 + (x * (-16.262479672107002 + (x * (19.562619833175948 + (x * -8.198089802484825))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-14.740913729888538 + (x * (70.49610280856842 + (x * (-147.1791292232726 + (x * (139.51056146574857 + (x * -49.18853881490881))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.08333333333333809;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 28.536655482610616 + (x * (-25.56901049652825 + (x * (6.968710824104713 + (x * (-0.5634242780008963 + (x * 0.002967721961301243))))))); // eslint-disable-line max-len
		s2 = 342.43986579130785 + (x * (-383.8770957603691 + (x * (147.0656354026815 + (x * (-21.947795316429207 + (x * 1.0))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.002967721961301243 + (x * (-0.5634242780008963 + (x * (6.968710824104713 + (x * (-25.56901049652825 + (x * 28.536655482610616))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-21.947795316429207 + (x * (147.0656354026815 + (x * (-383.8770957603691 + (x * 342.43986579130785))))))); // eslint-disable-line max-len
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

},{"./ln.js":61}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":62,"./polyval_q.js":63,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":47,"@stdlib/math/base/assert/is-nan":52,"@stdlib/number/float64/base/get-high-word":69,"@stdlib/number/float64/base/set-high-word":72}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":67}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":70}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":68,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],71:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":68}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":73}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":71,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var asin = require( '@stdlib/math/base/special/asin' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var ln = require( '@stdlib/math/base/special/ln' );
var LN_PI = require( '@stdlib/constants/float64/ln-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var LN2 = require( '@stdlib/constants/float64/ln-two' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the cumulative distribution function (CDF) for an arcsine distribution with minimum support `a` and maximum support `b`.
*
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 0.0, 10.0 );
* var y = logcdf( 0.5 );
* // returns ~-1.941
*
* y = logcdf( 8.0 );
* // returns ~-0.35
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
	* Evaluates the logarithm of the cumulative distribution function (CDF) for an arcsine distribution.
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
		return LN2 - LN_PI + ln( asin( sqrt( ( x-a ) / ( b-a ) ) ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ln-pi":45,"@stdlib/constants/float64/ln-two":46,"@stdlib/constants/float64/ninf":47,"@stdlib/math/base/assert/is-nan":52,"@stdlib/math/base/special/asin":57,"@stdlib/math/base/special/ln":60,"@stdlib/math/base/special/sqrt":64,"@stdlib/utils/constant-function":84}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Arcsine distribution logarithm of cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/arcsine/logcdf
*
* @example
* var logcdf = require( '@stdlib/stats/base/dists/arcsine/logcdf' );
*
* var y = logcdf( 5.0, 0.0, 4.0 );
* // returns 0.0
*
* var mylogcdf = logcdf.factory( 0.0, 10.0 );
* y = mylogcdf( 0.5 );
* // returns ~-1.938
*
* y = mylogcdf( 8.0 );
* // returns ~-0.35
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":74,"./logcdf.js":76,"@stdlib/utils/define-nonenumerable-read-only-property":85}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var asin = require( '@stdlib/math/base/special/asin' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var ln = require( '@stdlib/math/base/special/ln' );
var LN_PI = require( '@stdlib/constants/float64/ln-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var LN2 = require( '@stdlib/constants/float64/ln-two' );


// MAIN //

/**
* Evaluates the logarithm of the cumulative distribution function (CDF) for an arcsine distribution with minimum support `a` and maximum support `b` at a value `x`.
*
* @param {number} x - input value
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {number} evaluated logCDF
*
* @example
* var y = logcdf( 9.0, 0.0, 10.0 );
* // returns ~-0.23
*
* @example
* var y = logcdf( 0.5, 0.0, 2.0 );
* // returns ~-1.1
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
	return LN2 - LN_PI + ln( asin( sqrt( ( x-a ) / ( b-a ) ) ) );
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/constants/float64/ln-pi":45,"@stdlib/constants/float64/ln-two":46,"@stdlib/constants/float64/ninf":47,"@stdlib/math/base/assert/is-nan":52,"@stdlib/math/base/special/asin":57,"@stdlib/math/base/special/ln":60,"@stdlib/math/base/special/sqrt":64}],77:[function(require,module,exports){
module.exports={"expected":[-0.20339594484658438,-0.28172246386633926,0.0,0.0,-0.47865390372292804,0.0,-0.9900288364730626,0.0,-1.3133069331605665,0.0,0.0,-0.11125434467550395,-0.5017775261173985,0.0,-0.7826264044945401,0.0,0.0,0.0,-0.6578861166407158,0.0,-0.35306900522936807,0.0,-0.2906633241849249,-0.23655220157156337,-1.49577338990861,0.0,-0.5566422760850217,0.0,0.0,0.0,0.0,-0.08330840868370191,-1.740436270337915,-0.24207964665871162,-0.9635691523126844,-0.47639676729668673,-1.2127720772048174,-0.6275888440586248,0.0,0.0,0.0,0.0,-0.17798072857924066,0.0,-0.7073311870883509,0.0,-1.2721763558849177,0.0,-0.422776598176912,0.0,0.0,-0.3229532574080117,-0.5890025523557499,-1.6929275788828781,-1.0226927404170816,0.0,0.0,-0.8087715992573593,0.0,0.0,0.0,0.0,0.0,-0.9531994155966371,-1.7045179897676248,-0.19896817877252107,0.0,-0.4541025834892445,0.0,-0.14398746662096318,0.0,-0.9610037250159582,-1.7721723958308417,-1.1573033904238088,-0.936511211151366,-0.6191483957676139,-0.9426048268048086,-0.5599114308763935,-0.48324694411475644,0.0,0.0,0.0,0.0,-1.9744778813198174,-0.8782410978028892,-0.7465688325222091,-0.24812152517738242,-2.327888511502252,0.0,0.0,0.0,-1.2536752863528218,0.0,-2.1323784940688437,0.0,0.0,0.0,-1.5983010969465818,0.0,0.0,0.0,0.0,-0.86713086985841,0.0,-0.25859139479894067,0.0,-1.0168166989327418,-0.6469862437427308,-0.9510727149720709,-0.5370162772793201,0.0,-0.6307954865256838,-0.7604613890793265,-2.2851375516138543,0.0,0.0,-2.035260534152739,0.0,0.0,0.0,0.0,0.0,0.0,-0.8677331518761897,0.0,0.0,0.0,0.0,0.0,-0.7967816902179464,0.0,-1.0057304746073192,0.0,-1.1462887484874908,0.0,0.0,0.0,-0.15165266344294934,0.0,0.0,0.0,0.0,0.0,0.0,-0.8748829455880459,-0.7139233936071957,-1.2733349132946707,-0.34854700499072544,0.0,0.0,0.0,-1.0274922715401744,0.0,-0.2852232460641755,-0.4823161621099318,-0.5357108454152051,0.0,0.0,0.0,0.0,0.0,0.0,-0.6231768193778937,0.0,0.0,0.0,0.0,-0.5422074013368661,-1.5341800214004349,0.0,0.0,0.0,-0.4769625045887089,-0.21078058494130364,0.0,0.0,-0.9153075168726933,0.0,-0.3975516243311451,0.0,0.0,0.0,-0.7448917769931388,0.0,-0.6013264636658499,0.0,0.0,-0.5489569006607825,-0.44567151667675486,-0.3496315057068715,0.0,0.0,0.0,0.0,0.0,-0.6230571721077693,0.0,-1.0551949607445947,0.0,0.0,-0.6331849871264399,0.0,-0.3761761671608904,-0.807860966418023,0.0,-0.5678107959496265,0.0,0.0,0.0,-0.3067542361109758,-0.31965607375999167,0.0,0.0,-1.2831287973742649,-0.6848220159275525,0.0,0.0,0.0,-2.1152541833056957,0.0,0.0,0.0,-0.9156741630004321,0.0,0.0,-0.34757830036256077,-0.33885405974074845,0.0,0.0,-0.2671080024339273,-0.3989993679140333,0.0,-0.2867735289404011,-0.13671155638608098,-1.4857168034399315,0.0,-0.9581566498837081,-2.1764876626183356,0.0,-0.8827441037015518,0.0,0.0,-0.5903261814606591,0.0,-0.15156427319126614,0.0,-0.9956800328957917,-0.3627226634540591,0.0,0.0,-1.095616008710929,0.0,0.0,0.0,0.0,-0.05629510388319377,-1.4561553796173021,-0.1250360788711895,0.0,-0.38873155450823177,-2.6815973280469967,-0.15521924837614381,0.0,-1.1811697085338209,0.0,0.0,0.0,0.0,0.0,0.0,-1.074642059674227,-0.49911527267850864,0.0,-0.6473461400765211,-1.112742902776794,-0.7866926150455266,0.0,0.0,-0.9237058988970205,-1.4739640004520507,-1.4973322881891877,-0.8167174778284547,0.0,-1.0565153998691588,-0.7945733632249291,-0.23044300991786415,-1.3109471595304445,-0.23605186275296974,0.0,-1.2177246349284323,0.0,-1.0438303575812848,-0.27771149425182856,0.0,0.0,0.0,-1.0612728721899807,-0.5295536189222153,-0.38654341075221105,0.0,0.0,-0.3486137069490446,-1.8017630287625765,0.0,-0.5069094130614598,-0.9828756125991216,0.0,-0.7759653527835216,-0.20027948125718245,-0.862743169792188,0.0,0.0,-1.541770833994275,0.0,0.0,0.0,0.0,0.0,-0.46658723494515525,0.0,-0.27392444414716044,0.0,0.0,-1.5546360547442646,-0.21802035750414608,0.0,-1.2477298913864323,-1.2761204246883335,0.0,-0.5025628581477736,-0.7061138828906235,-1.4803290388704329,-1.4146349287789652,-0.1845067909821338,0.0,0.0,0.0,0.0,0.0,0.0,-0.15840872317029558,-0.23279198601949727,-3.255987862140246,-0.6112453814964784,-1.6152039715474964,0.0,-1.463429743647897,-1.5905370385508961,-0.33279677301487587,-1.419937496285577,0.0,0.0,0.0,-1.7652203982544057,-0.8340498409159433,-1.8413611902940026,0.0,0.0,0.0,-1.3557247132754509,-0.2186524854912798,0.0,0.0,-1.0329241384597698,0.0,0.0,0.0,-0.09008450569166641,0.0,-1.3813244626442585,-0.37489069290147914,-0.6127397698092647,0.0,-0.32839179597897167,0.0,0.0,-0.6414000342468029,0.0,-0.6886210745419313,-0.11663412756348251,-0.8709982476515586,0.0,0.0,-1.9165107836833288,-0.7477149374153593,0.0,0.0,-0.3527177726564606,-0.08863029699683073,0.0,0.0,-1.133273522277695,0.0,0.0,-0.7992766634670398,-0.960054280730732,-0.34159318778490133,0.0,0.0,-0.2517365686808139,0.0,-2.046627045080275,0.0,0.0,0.0,-0.4709487529427413,0.0,0.0,0.0,0.0,-0.32653324799665623,-1.2550426411104545,0.0,0.0,0.0,-0.19536393814665998,0.0,0.0,-1.0197233620558315,0.0,-0.1521266337951389,0.0,-1.2260400332240582,0.0,0.0,0.0,0.0,0.0,-0.8267247914340337,0.0,0.0,-0.545678850768739,-0.9102558432076903,0.0,-0.398624265110383,0.0,-0.3431574881869919,-1.7465851650649893,0.0,-0.49771875598396964,-0.9957345840633628,-0.4348012356475348,-0.28822042886174526,-2.2385033207018323,0.0,0.0,-0.2845949026203807,-0.7418488533937361,0.0,0.0,0.0,-1.4490939849389926,-1.817449321385979,-1.4770878278753943,0.0,0.0,-0.4480294106109436,-0.5742520567648057,0.0,0.0,0.0,0.0,-0.22059329189007462,0.0,0.0,-0.15264483050989452,-0.1860108573161318,-0.47075986002974274,-0.5135780275280035,0.0,0.0,-1.3214859883521306,0.0,-0.5317545911775694,-0.7632634711352163,-1.0856439492024088,0.0,-0.8208554035948623,-1.3502652953760181,-2.2437792115456165,0.0,-0.8162628759565261,0.0,-0.847631276741438,-0.18352808174274016,-0.9916485779057529,0.0,0.0,0.0,0.0,0.0,-0.517522490457883,0.0,0.0,0.0,0.0,-1.5318054149110807,-1.1009203496432187,0.0,0.0,0.0,-0.691168905754343,-1.3917085860930505,0.0,-0.4704483913202452,0.0,-0.665823552958674,-2.4909394299170105,-3.186407911509997,-0.503930461893749,-1.3217691293831986,0.0,0.0,0.0,0.0,0.0,0.0,-0.6800885247312894,-0.5252413794047657,-0.5224401545953139,0.0,-1.6731116811149807,0.0,-1.242174404063959,0.0,0.0,0.0,0.0,0.0,0.0,-1.5995983191443988,0.0,-0.8670071023644541,0.0,0.0,0.0,-0.17170243780434938,-0.3444630016376778,0.0,0.0,-0.4652269118755155,-0.6019953965231102,-0.32487970729772964,-0.3939339301977354,-1.5345472773049045,0.0,-0.4194456558064082,0.0,0.0,-0.43235197116997415,-0.3304311769802136,0.0,0.0,-0.6372088648386824,0.0,0.0,0.0,0.0,-0.23811336362611601,-0.6013704801829685,-1.4033986782111478,-0.9224490192968984,0.0,0.0,-0.6612271604446012,0.0,-0.8686765339738587,-0.13438950012600911,-1.8179865639786723,-0.5554309085946603,0.0,0.0,-0.2555871708246276,-1.1964311265288745,-2.646189313895792,-0.9181320987705732,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.5341567306086878,-1.7151291033395104,-0.6390874288092563,-2.1962512464762574,-0.3188440804919461,-1.655119285271669,0.0,0.0,-0.8488621166435784,-1.756453889852633,0.0,-0.9567786549596566,-0.4210994524710735,-0.620251437519839,-0.23353103192346955,0.0,-0.5433840929900258,-0.9120491374722304,0.0,0.0,-0.3274940150380555,-0.20309529600503462,-1.1811042286579623,0.0,-0.3241811885032548,0.0,-0.8263435823030141,0.0,-0.4808134701445931,0.0,-0.33332267312970654,-0.7690567665146614,0.0,-0.653151146662909,-0.26536467417618453,-0.9625089389872918,-1.4291428751977568,-0.8014696255777868,-1.009866035780906,0.0,-0.35401255203683446,0.0,0.0,-1.8975962678772986,-0.2016296524132868,-0.08170512470494169,0.0,0.0,-1.150714767078595,-0.34976913363194345,0.0,-1.1253454525751667,0.0,-0.8717326601570395,0.0,0.0,0.0,-0.5801870292311806,-0.41451147401188504,-0.09460464334734878,0.0,0.0,-0.6771083074323341,-0.3245941892826876,0.0,0.0,-0.6254012020978201,0.0,-0.3349041229444884,-0.6243218962413535,-1.079385101943646,0.0,-0.519176088673426,0.0,0.0,0.0,0.0,0.0,-0.26833043739421775,-0.757367860724533,-0.30897768155320104,0.0,0.0,-1.1196959076913364,0.0,0.0,0.0,-0.6739195970181204,0.0,0.0,-0.7841250877606377,-0.7948883606880912,0.0,-0.9246033710321208,0.0,-0.8170458913155219,-1.7961191260911435,-1.0366363605005455,0.0,-1.2328426666397154,0.0,-0.4266818829764135,-0.7072684118589097,-2.1635519112989305,-1.3889149214331744,-0.2699439347879609,0.0,0.0,-0.6131571603306436,0.0,0.0,-0.4614397970966909,-0.3240625338611237,0.0,-1.1582931958404932,0.0,0.0,-0.09070074754439769,-0.1928617549260122,-1.394293733997576,-0.589177977615541,-0.295588471725288,-0.9302192090264837,-0.33005161441566994,-0.4661888555002878,-1.3459410101401743,-1.2865677349413176,0.0,0.0,0.0,-0.2100648756047052,0.0,-0.0934679618809281,-0.9450446968295148,-1.5142279137880044,0.0,0.0,-0.20022454589703487,-0.9660313075001916,-0.8495804419590989,0.0,0.0,-0.5716312074695912,0.0,0.0,-1.2607920521700082,0.0,-0.5294957713768309,-0.8633350402200507,0.0,0.0,-0.6023686344057918,-1.8291183400568283,0.0,0.0,-0.3018863730352867,-0.23289819409030976,-1.677827752528373,-0.036088275818428876,0.0,0.0,-1.231389253396707,-0.9897251800048634,0.0,-0.09670301129352978,-0.16217370602485698,0.0,0.0,0.0,-1.9946705603079873,-1.0007708699872504,0.0,-1.2844452615990178,0.0,-0.5113826532420027,-1.99220656892142,0.0,0.0,-1.0139803718271716,-0.45264971374194185,0.0,0.0,0.0,0.0,-0.9047092078769232,-1.2650785670982074,0.0,0.0,0.0,-0.26729101617031265,0.0,-0.6670053510098182,-0.5703320162189307,-0.8617164887121884,0.0,-0.24929701722851383,0.0,-0.8160605461178754,-2.2933823855040356,-3.092846907004024,0.0,0.0,0.0,0.0,-0.43503791777155965,-0.38198250270543677,-1.8616838088234007,0.0,0.0,-0.5103765851487969,0.0,0.0,0.0,-1.4482207836844485,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.4072944116034654,0.0,0.0,-1.000510375841813,0.0,0.0,-1.566554026547989,0.0,0.0,-0.33541873770893255,0.0,0.0,0.0,-0.21571681862728126,0.0,0.0,0.0,0.0,0.0,-0.8254418665460166,0.0,-0.8696545006013088,-0.6894614057277831,-0.7639658959106843,-0.439032730880401,0.0,0.0,-0.3640351527676644,0.0,0.0,0.0,-1.0820046980978828,0.0,0.0,0.0,0.0,-0.9510296911606062,-3.572024897530795,-0.17028773278355427,-0.9068380228563427,-1.6945453912384292,0.0,0.0,-0.6406123672474273,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.10704599233150922,0.0,0.0,-1.2711455529676121,-0.72202431626122,0.0,0.0,0.0,-0.4929983991120477,-2.090809590492048,0.0,-0.8661440908939302,0.0,0.0,0.0,0.0,-0.34420037397924064,-0.428817703202243,-0.8527327712688604,-0.07461569040859307,-0.15446873030807917,-0.369982315449064,0.0,-0.4397605279371512,0.0,0.0,0.0,0.0,-0.2713892531337006,0.0,0.0,0.0,-0.261533441533044,0.0,0.0,0.0,0.0,-1.667888698188631,-1.6527482943748502,0.0,0.0,0.0,-0.16395249362378214,-0.6798175816288068,0.0,0.0,0.0,0.0,-1.2319342894083698,-0.04369446870812395,-0.24144239773442921,-0.9182576708341094,-2.078520969466179,0.0,0.0,-0.5555285053082101,-0.589665652061726,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.21142833540281494,0.0,0.0,-0.8987645663718451,-0.5048457052927517,-0.15324885021334084,-0.4776003453412625,0.0,0.0,-0.5369115130340605,-0.5291686998077194,0.0,-0.779049167783719,0.0,0.0,-0.7756986450293977,-0.7251892208613625,0.0,0.0,-1.4197838697800094,-0.9095970192325827,0.0,-0.41442799051515006,0.0,0.0,-0.9004322299693341,-2.386521801518056,0.0,-0.7863378555871192,0.0,-0.5560133830484744,-0.9067911014918257,-1.0414960463644778,0.0,-1.6930816070021653,-1.0377464380471986,-1.5425578445234636,0.0,0.0,-0.18421202524171243,-0.10533665715062866,-0.960450970771441,0.0,0.0,0.0,-0.38318637508498943,0.0,-0.9043427793845655,-0.16052597101677887,0.0,0.0,0.0,0.0,0.0,-2.6328939730087355,-0.5257257053656961,-0.4816528139643177,0.0,0.0,0.0,0.0,-0.11314918191271754,0.0,-1.0375463993857108,0.0,-1.1369052128527783,0.0,0.0,-0.5752038065816225],"x":[82.96387500940656,30.0891328381096,55.26173161487346,39.38524055671644,18.93834173892856,79.31964257215394,38.1661717872972,77.32672347684247,8.139785933253858,72.90024710862548,49.913313593039646,49.83046682844375,29.260869025777097,23.24569642461671,26.196704097660263,74.66192729751266,83.3223781624487,80.09568359350439,49.633078413940865,94.08325975759601,39.561058404576926,59.58188943552685,64.94979450701207,77.45429018484452,15.208235726106171,62.11758490845334,27.71426667061622,92.17226811457067,83.89252295267194,44.35429454482899,79.401318622728,84.65377697988964,8.58289883614647,64.65963677851339,32.58866980553573,58.74280959678277,23.937511959286724,45.27534617081522,80.91874404843614,39.26304881965386,46.88716432000072,85.54462352696945,42.79013519735125,84.29764169114259,41.06153366825866,93.38975779767128,22.46663794513086,85.7351707108329,57.78127029478238,42.76229175442682,81.22780197043438,36.7730332945763,33.09739620365434,16.446048978479393,33.55905537976247,84.83114386715158,63.738426393626284,40.961423506399626,84.97637640942433,58.79929264002679,49.565016791423496,73.51601771368581,85.37580948508348,42.65671992746272,12.783479798579371,69.36720229315837,45.69726460372689,67.01163081302718,72.60431650427051,46.76109545012932,31.782311648954206,30.187610324686545,20.220274925780505,15.017763426755621,24.087307347558475,34.23637069412692,27.195456742728123,58.327841993375586,42.57940304764702,62.2055509941738,66.66912560858333,79.63402557924867,69.75898204091429,8.462942304532245,29.08959357197455,31.703832015090995,48.80116876963035,7.082723363210346,77.57205003776548,48.58148654898164,56.713464455443045,11.365363220462935,14.14679335595633,20.143700114021218,94.92937665305621,71.25957420661227,38.16013521139826,7.940753118165116,53.0094348384769,43.89999845488078,46.47786769495147,26.273561956965835,42.880711233603655,33.83617859228774,48.83234460549256,33.499660645353735,36.17504222496501,46.754412072566296,29.656070465739013,33.65229763804572,69.92171743503052,38.064451609340935,31.944139907255753,10.514694114235326,61.833057112621304,60.972784617194776,4.871789591595155,57.92778633133815,81.50746291870986,31.38344872597547,93.65300155068087,80.20305875067422,64.60234579049569,25.983008605117853,38.1104631321989,78.42414592109468,86.43959841626136,88.80861917679847,89.57990037359544,33.280707382083826,64.35941867893573,11.76343708340411,72.05313022954756,15.206029992388181,32.948180090255455,83.12822414639862,60.50538856985355,59.75921165526235,87.50479021369514,67.19130590079433,61.54937618364562,33.37468028334492,81.58209803468563,52.45400856847502,20.118258420897952,20.59541591999058,11.87295309220508,64.56317349552114,49.896262902809255,81.86966768528931,34.980573887944416,27.241972985454392,84.34113205650353,43.806816720406346,47.642290500857875,38.530214281947735,65.69082803944933,46.29338200402423,72.0043374782413,79.7918643727371,88.33570162064306,57.26371417226363,42.07429454140093,79.62972879167177,56.2690307076771,69.42765299118214,37.410207935364184,58.20239130341659,18.966418702907546,89.47584941724456,90.99922296755676,69.38275566963313,60.40275909155756,56.78090527902578,92.72306092037276,88.48202568091351,21.958905201888804,88.26006538226866,31.945616130857797,51.52326514280432,71.48284972796964,69.04107638770836,27.976454716939983,66.32244049741084,28.996024369494204,60.513397361011016,82.90590009371066,52.27447765541092,46.89150326559373,63.773230342021805,79.36137781477314,44.57421597656791,86.49776611744183,59.246816858006916,62.51134124526473,22.161453070371504,78.78458688381765,29.999387331033162,85.33710196304196,52.45427509992108,42.99548765782644,80.79000335561992,73.70936693277508,33.36627232337602,60.1764782906274,39.416895166134076,76.93478727558985,69.60527643427713,61.103950112868965,73.95014251888703,38.30870972760372,61.74427062938284,70.08325822560853,26.910063173622387,40.13214759030928,77.22776726219207,90.83892817710078,32.85837593121083,6.456510255452184,52.43971782119376,76.9045451328618,83.67194105418565,33.42282276201351,62.50887611509117,74.24656539822385,50.10790687475834,64.04029591311918,40.0724454775557,49.684570647548995,82.87036126998714,69.5125235350965,77.13821465824178,66.70834523780658,71.65521698294697,15.68883500478095,31.515489455810787,27.07760345793382,11.173097480644527,86.34224192821054,21.116337984832874,22.08707875024949,94.18494880806895,61.891328199862485,38.149926853512405,61.92580823126765,57.66158938487759,31.3842296139983,46.14976581231263,33.42931131266191,58.05607998400904,26.152299874453362,64.18263883692362,64.61705414510452,70.83042650462829,72.46057596521834,45.651791983662264,25.04427894966467,78.14298285820423,35.736166446536124,37.222235789082916,5.298592382926679,72.47387449434368,41.350708248721574,28.60353492001294,83.13508781201784,93.19897665348427,80.63667799002091,21.76798973805311,35.705967492089464,77.38477448836774,19.708986778263405,38.51334944217216,63.69039403220714,37.89093307468197,24.916704499777996,15.692270469933556,24.425938258864015,71.96983649056168,26.81143521610688,21.2212753658633,5.664122824689848,43.009720155107225,83.15962682714834,19.323815556093436,43.017786981233535,43.27373794233801,14.597981097341176,55.201739320706906,68.56915130447928,20.09018479372932,72.9861261610776,29.74792113879376,67.01604940345379,79.23611768206082,85.0000836178154,82.15336820457796,20.90974350711201,52.63382034650941,39.20321280749597,77.4911527586221,58.81960663791308,59.742619668742385,10.740966661967866,53.78787433943483,46.16569549514861,30.75496554567983,86.72373245776929,33.37600671643919,62.69501063314588,41.35542206205099,23.55395962057226,15.103821819471062,11.942496706023245,79.94794489710833,73.41899478664598,77.26627452371548,78.2561739736153,90.97668303553091,46.845577855757114,63.35658413000495,80.53273316794858,74.6672130225726,63.28385345640009,24.734469642616222,79.75740349880438,60.09422616975034,29.278495210203864,22.958787076956334,86.75676060455876,27.517327378381374,27.752197684262008,17.515715295369358,20.78172689270952,83.0075330437931,69.77161704277928,77.05989386535289,65.04555321846162,52.04518747720451,80.89099451942006,84.86888532095807,11.54624184982644,60.549986552099185,5.4573503264739065,37.71699251674268,11.257527312178777,59.512367251913254,12.382768360893355,14.707102608625963,43.37784105255385,6.057238874032644,52.69257567293863,87.50413368564068,21.04132882876756,18.392824117696858,26.003579024750568,12.053248780247362,30.882279437982664,18.53055727575923,58.05730133627989,25.448922812499095,54.41428245574323,98.34687614388221,84.60739073731018,11.401610448293908,89.66101791202705,40.85334128321353,27.061299677816606,74.01329742451331,76.62445494940063,3.056872289939556,66.31352792152998,55.311887102042206,91.14799635924605,45.13356594431173,58.223958584518385,61.19112608925366,40.48977124541985,80.4498774162389,43.99907150182628,71.37962026999469,20.921820931173485,49.35134533664629,68.54633958317305,12.500664204029563,30.522686315793738,82.00698156176205,68.54699184398669,71.52878117923288,52.852419248625104,79.30757647003499,80.78695098579854,29.12434785507457,57.123425684993286,51.80520225984012,25.97635283869684,11.610686413211697,68.22830524453674,78.16407230793735,76.27236070269126,49.9556503877401,32.662493303689935,19.12548194015068,62.78903515516257,90.02997199130132,40.49866723322245,28.45556811414184,59.59105698981905,62.11919646748224,11.17061289212554,38.165741160248146,34.496501786801026,4.420365655106071,70.99295712537102,88.93787100990883,90.86969797013582,43.92634573572757,77.07597233561529,73.84263675198815,18.201213295397633,87.30538207276365,72.73329693094703,73.0257915674065,24.280438156217063,68.75037243901272,71.88000904368553,50.99727382711785,34.065377779275224,45.54695397236981,46.356215142699426,51.519571426693865,76.74798254904823,44.73933373593178,24.537120890497025,79.1544657739037,28.804158504241514,32.1130486556422,64.38079701650611,17.546487479591747,82.32365698417823,37.19330914118901,27.024711380472766,52.921440449114556,47.69765868175898,10.899816471439014,71.41723895844301,50.79387296228512,72.86572254073161,29.958167240520964,62.128180336996515,83.22688089316237,59.49284148631499,15.033863925672808,21.167036270891145,16.171470252354364,20.922295327034007,75.50916382864717,57.50251612776842,43.38085227099169,79.48752271829157,91.23024295685049,63.82660891177889,49.097161087279545,58.316117697493496,58.97780682966679,82.22801651548455,62.78882700426915,38.40711180695064,51.08948827653566,50.59055454025161,80.821340929638,77.38942248180628,15.011429620694457,53.960112647916496,40.671935150922536,22.725122313913815,15.21649960706978,86.60549915590853,33.47792527823117,8.136691757130325,4.671326903001383,55.97750384870662,32.63857361175584,44.46273074932628,13.720636632559842,39.762720400640355,20.80187706510575,83.71137884609291,72.66557618637968,75.89729463116456,67.96930792329772,88.56179227546802,48.917810008781814,63.56971489451482,94.18384305319043,43.44766977851361,92.23328729601344,22.109563345299,24.612128734652586,56.96997966782444,36.10703703326144,62.72746295762225,25.853371304017223,18.76741215316759,73.138457741353,36.341763641748216,72.79749207419918,36.72397614801198,6.675712073671751,11.20701455857179,37.69413374996406,21.356928798749045,88.49276525205052,35.90595236682377,77.43589032625817,46.990152101825444,50.71184722380827,71.59310742431308,23.24424515698845,47.34299970646875,29.007729306823347,81.52748897231527,15.893998577026371,81.95096760979504,11.521847879525389,96.59248298955718,72.92558401414708,86.37797195668867,81.11161381145875,13.840859127488043,47.13625999045849,10.607938248491022,96.229475475952,33.802180885566955,68.25642206627766,65.07862067155376,77.56984886537298,64.09644033881632,66.01861306419617,60.64827210635421,82.19712019892766,62.88668897143798,39.431278473465895,61.65297540652314,24.851446849363562,11.032755844152948,74.29114193976497,36.676877687564684,53.552486176637764,64.20574864805077,66.84991138231025,57.891230469842526,33.75494073751469,60.302020347099095,46.38785494291428,62.939421965664216,59.26624658503423,84.785170086742,48.524804725120504,75.78289095732347,22.46619268164395,13.349970118828267,37.66906432975873,50.3934323035642,80.40563337952926,34.01354025001974,22.001620629482716,24.58315213387729,85.94301786689998,4.464556937712225,29.96085338639805,86.65144959513242,23.690519310133688,68.73502902543552,18.759156913537964,4.30779330675545,29.49800422055555,54.48145205117237,59.99950500537228,93.80920904067564,78.1210043489914,73.4901251955159,26.199768131617027,43.65800165391816,45.07749159350972,12.747773501056354,27.908313825477013,19.541769314198763,67.07054687260563,19.284661377729844,60.419307946404665,46.48441796598582,35.25517617151697,3.3164051121163363,67.2865329311625,30.226763638745172,28.549669276695127,42.83941759716505,49.34247302686797,49.22193314643941,59.44442398647659,21.734419397494126,68.86357371747738,25.24931695780019,59.5290715291857,33.008668428408654,5.973474806231196,86.4778319658839,59.71483213057057,44.99310948519214,40.22431743824261,56.06643959774114,58.99729524976195,74.3595403492694,54.83616691553026,26.511677103758075,88.62201857935919,54.52828423976983,69.27590297447901,36.2298832402,28.146710376377694,34.795541100046634,21.06801520489846,35.27398953214255,46.27635847854899,36.47982329980317,76.3993486800032,11.47382951074054,83.50191147507759,59.10939174371699,68.01088177762486,88.96981418687885,31.416717774300395,16.474437234055603,85.33744821730477,34.195207255222826,70.95480183384116,29.59466846690006,95.2750424831667,83.97346426243993,54.13824495831437,57.12494128331591,21.014297358908752,49.27803889514754,39.060745651759696,69.46927510823532,44.70955605032773,66.03405513272793,95.03629636626118,75.85112966930252,29.227828905983987,94.05232244558893,56.02775374860386,22.258246505404756,27.241535626720367,74.67604998314008,54.86348759774915,83.30498772745118,85.13829406856564,75.42211549061132,54.77933899534206,48.77553959265167,62.25668834959695,36.106815158264226,39.17945206552421,34.42447434681646,60.35843965773262,14.557739346420618,87.51567991414518,77.53545519109312,12.183910642192451,29.986785377553087,65.5112236084566,85.9330812692989,38.441637727968185,38.741517319571486,46.32013746651481,18.39785709035128,35.155972738093624,31.44038347901951,14.374074346971115,11.932450886405427,81.33914910665253,23.914129348979056,81.18082191363052,61.92876648403352,35.27984325666158,7.2413281254840856,22.842926801794366,42.60298486341996,38.930996559891206,47.94584408769033,10.987114232116841,87.47075473997891,44.49346080242588,68.64080176615386,60.53820732044727,55.87497489059268,16.899396074667496,51.51281051634388,67.6699690107049,76.64675011492086,57.731399751284485,10.398324754196624,36.61476390108128,52.248329195279446,24.312441569682477,69.96198345207102,27.744257922386932,10.157656797478548,27.260579394968165,75.72683619082737,86.10431304096008,95.2006122666086,74.83549578364206,79.4775846131985,42.0699795723764,40.61946361046099,9.247839947571826,27.170769554111736,60.17982634407783,76.0018014435858,26.462784059182653,34.67468483628274,81.86933765898067,72.06777740832283,22.398867135810946,38.92199592017859,76.49009685866774,26.015202305685747,65.53533877443246,27.108594529898248,34.19723387233795,69.24198020925259,50.922311488976256,40.93285329852028,3.5959286925116007,80.07659684633282,85.92978718644946,81.50115433181736,68.88571872109641,8.905552348402646,56.73655924944414,68.91801549851698,93.01765992768232,19.589401089516777,13.28216457274912,48.464338814880165,82.90935361941686,76.46366226289577,63.200886335090026,47.23412142363052,83.17716843341886,12.925862135064111,24.035801176646263,87.25802174819951,14.717382326451034,35.91327458305863,50.082819143571044,1.966881845059567,82.32207838871783,88.85525805658598,20.784615034562147,63.296978169770284,66.04461749028262,58.76808175278626,70.2591045882974,83.222357201077,10.694475137536266,26.87826311983764,49.589937430191384,76.37412150572487,83.36937687138492,78.34649147929494,78.26034081249095,34.90564078776677,38.42283577149781,39.36551341466607,39.96568875667094,67.14058627481779,86.00665497780837,40.11665297629317,1.4354134670628316,7.736321882551596,80.2537516679215,67.5633070139305,72.89496435582683,75.74889068525259,57.660472607535056,69.84879809111375,14.931114225526443,65.15260950519914,76.39334480950856,40.676540301609805,77.36881012875763,26.037716522578883,51.6985974475844,6.081170782092684,60.804101467594805,65.19389972614948,84.51724830035262,61.407303041256846,35.32706065859684,72.24741593777765,72.6874484590618,78.53534788042735,57.45774787031169,62.79522527055697,58.53029543591934,91.56210420454542,86.17098899648303,61.99909890764019,85.04122166733566,31.46690360193297,68.16093847926686,79.40214177741673,62.949290768182664,28.68822505636527,28.410768282723403,43.040884850665634,10.723633298699262,49.3885989490821,50.244675002790956,51.039591378284605,69.60889117570557,73.40695630500839,67.21459256547857,67.93790920616586,44.26662951143696,56.86386363275359,56.78157361428488,45.72253059098044,15.032270488828585,23.09789730298885,57.788577608594444,17.857772638192316,30.55298225451128,41.69757298561863,49.87274814533037,83.42095984822848,66.86611792396724,77.01629814450767,83.54325344498284,81.24563533838099,88.979852486075,20.25041827939793,66.92655779771079,59.94801385608257,81.40560364291986,76.727258809666,15.63735661098379,17.08582226041592,75.20110727881925,19.98563341192963,13.32010355171176,21.629439698389717,41.10554905069753,18.840921979706692,70.61986657964364,48.98985156235681,19.104460911153186,93.37248328840859,66.37428465964341,58.99468876478319,52.17228239423481,21.685355039307407,75.5855298100224,66.52341162532124,18.805295668922604,37.48793429206768,20.975515171416564,75.41988545728839,65.04923924232303,25.2220975002543,18.385401268103937,92.10535479923315,25.218502486357757,77.93045540261232,62.328977155539675,67.02908106481219,69.28044569650002,60.7455766242078,57.24468035715787,23.157823841964177,74.77153636540817,44.68881902890417,48.93691463148804,28.773353642759048,45.327220214604395,86.57950295119723,84.19897387001917,56.27099242140237,69.25189700148198,41.182337966144004,51.45678867927377,67.3937877862407,53.37956542213131,77.21430163970435,88.85607836340695,51.52023211100226,55.767875077013464,60.80342156403816,6.415747297478278,18.699472742041337,65.71290011042318,74.64673181188182,74.04140440202146,93.14973108632181,42.82785525813678,39.6222525763782,80.61223040522606,61.90718844943148,64.890364801511,13.875212057831835,82.57006300193909,46.17886126790573,33.463472333200215,7.013345232556754,80.85122922406761,26.881760213578445,27.217035035741986,52.95846068567998,77.25699163598713,91.4369772330949,29.774160938287956,45.969796269158294,75.34615405533143,83.23079577816308,37.2975549016459,90.43411382797747,71.15786640270125,68.51381523910342,69.20209841233743,66.17196543693777,14.493338582991932,31.278541246859582,30.502563221653837,82.82986168219117,23.258223101665237,51.75636143633791,41.065609489703476,20.17221749600681,25.398215335785267,84.13468879586443,27.212382328422102,33.20866705500063,64.73684696744421,46.43581961305599,53.57324685723508,80.10984023195435,38.843019548324826,21.511621456194923,29.449346220650945,56.02540777607139,50.81049183542867,47.17897620011617,30.100035281468372,23.344359052597596,17.441011498694245,66.34569279890842,33.03333932437559,60.42818062841409,58.62337043114587,19.014209178660792,20.855766952425036,58.583026189518314,12.899977171286858,36.155740086643675,16.152348214958412,70.74386588889914,76.40870924940367,66.83556733325082,78.47291258798491,28.357326863268547,76.69042457977939,58.80161796451085,91.12843963414709,74.23957487167738,55.38888717014171,35.53220346494111,78.83667059324733,43.77152819948687,82.59785127649887,80.5709441391616,53.24193417031425,39.63019043601717,19.45697860740973,44.52479701337605,31.20891560050766,96.01131969289695,73.13872221284994,77.42057187427105,62.83794611789361,74.02052283198203,78.71116013248243,26.970194618505264,61.873024341729284,13.669430098096873,60.91255629973997,92.21278333007244,30.0018907916131],"b":[88.80344620062968,34.447924710805104,40.5666722707271,15.133985226801752,25.986289185856165,22.91684910469058,81.8682659805847,18.195673136504375,31.969742409856412,71.7972356608274,39.50159569633841,50.93482703652235,37.37893257492038,7.934075882713385,49.044582479293815,56.22398942126976,21.978852679919434,48.72482065804884,84.63396264654814,27.451112166980934,49.41498499518993,37.57518987825455,72.84663807485224,85.56182962108514,59.917445708172984,32.92197914509861,43.952395820032805,57.63079173424477,22.70633241641154,43.763897055384184,41.30758181870812,85.71781714881132,63.66476448510722,72.53632294188957,77.88102561586734,83.76288918262887,49.92395721859276,78.27936525237249,55.35753643094906,18.407292989671422,39.75075593903739,29.8163288682182,45.56343593703267,62.256293073771936,74.73341469837068,77.43470238043344,67.53809418818199,43.531511963002586,77.27159431514966,25.851441313676435,53.0965167776092,41.716109079158066,46.24272189676387,65.89843485237941,81.45678272817285,57.08755792265167,61.16437929256335,86.80927134668832,67.72092384790187,47.401577219174335,22.50286507951874,57.2772459753558,33.28999380336446,92.79686649649209,26.647552225685782,73.61452329610343,14.032543884345126,87.12726766790863,68.95655693803995,48.5755605359265,17.39487413007858,66.79813401699195,77.96065471817064,54.439819916677216,44.71052405393696,50.70871588636865,69.77485630186243,85.64252529852034,56.08806854908913,14.846375153530285,58.788005214673476,13.4512018139657,36.212795601259614,27.537623984254612,45.08025708332546,58.863777897224196,54.82067572099835,76.81164548528383,42.6113396645627,40.94569979360273,45.75507924512373,55.900845565429975,7.392128002069733,66.14052452146862,50.08003400833127,5.191463678851194,17.761131302453865,73.06458794777728,52.11519921901295,28.75707912228804,38.017449026581154,13.091482994242853,84.39044353170738,17.729532634397643,53.043756264034364,25.82823596451606,83.53934999689011,78.09044247521483,75.81818354501793,49.81716628181594,34.07513385077611,65.64711592586457,67.89360654969133,71.6171404825871,33.36271718833635,28.83945430544768,52.34057007978756,12.131390219206363,36.942076482827666,7.469139136895153,17.23842030711053,66.34113300859926,58.030324439837734,61.61277791403161,11.941937367649018,26.504078523369273,23.108964151642514,21.45101644805085,59.676560188892736,53.92324910901442,54.83412625955193,37.91309631393671,32.8252480816495,29.361713941830487,30.599272321646303,42.31739243359884,1.6429025041596512,62.68710460686379,58.10919865430041,34.32634966471926,20.361822775903352,17.39953164245425,61.48712969142175,9.868911720956977,47.15587536094546,39.20316079165139,52.650644380713835,77.76775658345028,15.930289412932188,36.13726461934949,19.844927861696302,55.96691677170314,27.41328464806878,50.274115613319765,67.46570808319593,60.295666086833236,39.44513329251121,31.13369024533171,65.90794080120415,38.52443933174592,21.361708245607982,34.53531973466765,59.84251938414809,59.00803825566726,7.577388782672645,63.50072779551667,35.73586050389644,81.65577516835873,45.40281307958971,26.484457246383446,31.001110113821266,61.40441287480698,80.36838335864192,60.87242193952735,31.722837468226828,60.24359545289707,36.301711824149294,24.01332894240153,39.04774458336817,45.99449660854461,28.058441987834062,20.467520193705067,54.92421364962424,7.307105097329152,45.34970091416311,27.237425240271545,80.80970527577867,74.85018535515711,64.43504762300988,79.41788921108542,35.914201685769896,33.18744956949747,68.44972466216699,53.69975385916324,37.67348327860373,32.57505118989094,53.081470999996284,69.29285615775109,57.8223026131651,45.19638499245612,69.9620798701335,43.42036044246901,90.27275339902431,69.73086544243243,34.72896473991342,54.087508429852925,24.587743621425197,26.029099659518828,37.731916502457786,86.32485070662109,43.98784401222124,23.390811675233255,27.71836295943723,72.61914855110021,77.38466903138101,37.598788509917874,87.06080866727027,28.268485387026338,39.368923879310564,32.04144751291452,71.80919104984257,46.01008689883049,80.35059928772446,39.47912573436912,25.156571960369916,57.61034226031397,76.24138935413632,14.260135199351769,33.72409823167315,92.61070991540711,85.8264675785849,61.484444405534035,75.1250236402183,74.03169375472537,30.65546596671056,13.166035643148465,63.05667143762113,87.1189600466244,46.131842290055374,55.57147752305324,17.922959197662482,74.55228615716244,94.45876183859136,12.794479128316976,64.85717939160467,46.01588258201414,84.97519296109803,57.35897170515644,20.69949013557252,35.61826388379778,48.818236361683546,42.45055094194184,15.024055832792715,24.84357683946138,34.909185629052686,45.93739395725415,93.9500998757475,80.40771638529479,27.761485913433134,47.568781059135176,46.9587814814157,75.89876013274828,13.931652187036043,89.99843199914429,34.53285992477702,24.79541200207265,78.85991439307952,2.6775635585399105,32.47645057723525,73.12706972861352,58.68141063238727,48.31360704865676,25.095815013202834,68.28735199911809,72.7529825512176,31.943520001512724,23.126166107955743,4.7224687327546855,77.36297483230996,87.92325883577789,25.54922309244013,82.22491834861552,31.902795377800945,63.86522649718017,88.91202561085822,47.82639884113078,67.9772363126325,59.38799064645657,10.245665904031958,83.19324289488985,24.2159574274449,87.09001550340416,75.2695246608452,14.173542105578347,27.702365720583614,31.580430467019962,45.0671084392751,80.47729555936459,48.20322489762107,35.09882572586654,30.246479600511872,69.63411872264444,70.59026015181523,10.779810856347858,65.3183061914519,75.41668001833227,68.57994437570481,64.65318347111001,67.87736563319157,87.81972875073775,23.351959966097994,13.717386421412368,82.00964845665955,62.11564010815804,38.68784453917142,59.65571344118998,65.40941038936789,55.62462547646422,59.7289451636342,14.590847693058855,90.20642449967852,52.44424788495528,38.687278561421195,80.45128887895491,86.64434405608239,45.369474119707434,72.45070807803879,38.776505417504154,52.07177790401701,39.41672677477203,42.654315028995256,64.04091454852784,51.80890528881792,87.67293734028308,39.360079847778785,62.66077015694925,1.3030910834300746,14.299331487982396,61.08168177046665,31.529667842062693,12.017192352029241,65.90719167116657,25.300234224963006,59.15755221478719,17.759966103231033,32.92189912695305,63.60457267544085,70.29411839098492,53.17242064833688,22.50712893540269,36.65359227559982,30.601620193052824,19.39589411879815,48.390707155057285,63.582479879189506,81.71804239242246,23.23973928073706,16.347580283916464,28.0680122061159,66.30243499082906,58.089282732238416,25.21816443195137,32.736596728378835,31.457207330796084,30.6400485469635,29.330507255927305,16.926192958873962,75.17063453660768,35.93631712699762,12.97430814368552,81.71271901749978,86.90994191168006,57.77636179872492,51.96475459651065,39.92904515085378,20.167854452788326,65.34578545427364,9.285115838719932,78.36574284327016,73.45844903843494,49.257988928168686,31.245869487452023,46.111877875375434,88.07501380249523,48.23348149143174,75.56023926203366,45.04819543852469,87.18318483571835,53.77759191670223,58.97040169901408,76.07679506696687,70.8798234739368,43.78109166771669,45.57314198142961,43.129836710631174,31.0159943029391,81.0496240393318,15.568197145961463,55.57011131714786,54.789802784833405,29.98799617991985,91.3582216051352,26.098858371341596,41.758430758670904,33.068550345304345,39.575627330266215,29.8020057193801,10.277648764653588,8.53927082582219,18.749721833306694,41.83583361409016,15.429942704064299,31.55503210128616,21.985114959613156,55.84205555258424,46.67850883113824,19.571522873712173,58.56183421017859,50.73140706309627,15.393648343063887,75.87580134802849,32.341912894243855,77.94697065498896,26.584235025474268,28.903757544737353,29.3148492531975,20.17093162291209,5.109976457368908,92.25892315077267,18.14108364721013,10.57496140086891,60.98314620481747,67.40076886903488,39.04950049034176,33.243291351022194,24.864777344967088,78.55330560222606,24.886662847864024,40.6065049667432,51.37390841133224,60.55037420452401,71.8955830906044,55.31531087640649,35.46377090652437,51.578452060789544,10.145581117616654,84.02149961722499,60.10774256755432,62.10035077637021,66.52674301783999,36.821412123240265,79.7967344212617,52.589844745114085,84.72433877473202,17.21513061662886,71.31913828369454,74.51166292509922,70.14944536087255,17.452852385934854,75.22613962215176,23.0779262872284,38.528475149106114,63.42066656619713,53.27222229596926,69.72021775256589,65.95388342952589,40.54154640069611,72.08198628000417,74.44532459985663,35.72214878265554,34.879750529594915,79.38018545888909,53.2521951336949,62.79995618176248,37.79287384628502,54.33453800250523,21.31769311604325,67.96206110393138,22.30863082005948,68.49407300340333,43.26985452550748,77.96551289415346,28.739824694624634,31.415761293625497,41.37095719882589,40.29229830158233,48.107193171136394,66.00950779681062,48.913242581389774,43.62727602333569,54.66554010544424,70.15776132907476,17.784896857797957,33.56925517579057,18.50703224391136,57.33986692884129,71.86327200840498,78.85528238210102,26.97354005323684,24.879572425165822,23.182829462144614,41.441505817079815,84.65882234696986,58.43636445539598,48.696425826463624,28.975908763915093,69.52442809200936,78.4440466669973,66.66111138758772,54.993376182196435,78.60395916546145,40.6314728435705,31.03747024257732,45.99075180649716,19.24811627872048,36.854861274132055,65.63287661453705,35.835486700994814,66.03621873095145,44.27833446043985,10.627892404367195,79.61419673119747,53.98339461593685,37.29124584826028,42.59086114805642,42.43458375215511,71.16961746855392,71.12198582792122,7.30759880953717,18.289931080449687,72.21250646717066,53.60865465406616,63.55254720668388,30.579343184990986,24.610471270673045,31.94308974345455,67.47555318986615,80.96078951025538,52.72035582815674,15.195345239454054,81.9819342459451,65.26655450659078,74.92701679503392,29.869556038680024,73.04742429357987,65.82310572460864,47.55980005325527,4.55761451071893,12.603735285477594,84.58411193711294,67.53762139467683,20.583079339062355,9.818174815669071,76.0002322888572,0.2732056810294914,46.47998213229056,58.075609664977634,20.742063862161967,82.60748069241487,32.122639930508754,77.0606662423964,86.7165161171625,7.289658423199072,18.22460469014933,51.83906721553576,19.5682179138656,63.5770223187235,88.90471888283112,23.80802501909072,38.900263093179944,72.44108208540541,18.5278750146175,78.00916416510847,81.02643175801546,69.46827997209274,67.53250646563725,15.877030203279677,47.291808922492805,85.02936541493348,20.667368964786444,16.00042365831118,24.29478782983491,22.940993770149664,70.24923133627306,23.37479899218696,44.31299321628748,87.93430451722688,78.1658932755042,89.84665846689788,58.61088276353946,34.95767017899049,77.2425884174568,23.74009773641705,46.995531454101254,71.89016301856171,37.82563951736603,66.85410358333102,54.51332111512641,16.414899827566046,83.57535556100629,41.30382665590877,28.96536367779469,17.076296519055152,70.37818791421107,35.65227108457939,25.289993402010808,75.20078496271117,69.59324281127631,36.52426982504712,72.69765859500006,47.20042901342616,82.0068540137014,27.942217771124533,62.80013840446573,36.20287739804427,78.46040121184876,87.83784342994687,78.73164046930663,89.24482413175326,90.12000939471454,62.42294981519899,57.720738626815006,30.99963973464068,54.15602411666724,8.884643779061157,45.95096988492424,77.15991989797985,89.17288441808786,59.95629999958371,26.448704836705762,15.993148306541789,80.24534613133383,19.308078651936622,59.02549313630139,80.98911380969673,50.926272679879546,75.92417912037357,78.16715721177647,81.56184403369356,32.511044830716955,88.51593221505267,26.773772870707035,50.241865357876044,13.102133764052649,62.35915232066466,83.67296648156227,77.34502765223246,71.77431111417226,58.90939470524068,49.419969144197914,37.43873953317988,64.4557821787497,38.9614624527203,74.8625608923394,52.03608270261201,82.40867885647103,56.44667834311368,67.32849667236614,24.302825840443308,50.35427478332463,22.455284904853837,70.37528392532803,78.54805368333997,46.08932646053517,29.10738965711843,54.991447624163726,51.29946105504748,32.213492286853075,46.5944460321617,9.821786892336647,48.934372581861936,31.299510354893695,64.62613787841333,64.82890239432905,75.19844499943491,33.972785856150814,41.56154513939856,29.799408749963256,61.14988768513701,83.83253802282482,37.60984136356263,68.84213101783817,49.92225205569703,65.87745712990717,79.46260336261305,52.90870327891162,80.1827193464218,81.1408752571562,47.62487828235386,6.272904947578053,4.765045653503535,16.106293510242775,78.22955974191845,12.573247892456028,92.43250207601486,71.06648731956021,22.68853037929311,70.11851805584845,27.019618489763516,16.778115088334005,77.83233668768484,62.30520549005007,68.30244458528828,59.43530272228824,59.837567362681305,44.932390772008915,83.08844224306893,37.85643814590301,52.477020618289814,69.35828126525288,69.35434045122895,61.2330100345133,60.11506016399175,81.21431379236545,37.07362988519369,42.776618767583635,90.63909362221436,68.99684909507273,22.806051295781764,55.3506420824878,81.11538378886118,75.95992516535608,67.57115342351496,47.91281505972467,65.24034695827429,35.79854822421704,36.82987357841708,23.69821501731277,83.19185111287825,7.641917806764051,42.31280635178771,77.42353022908298,50.753367545961225,13.131298061256654,57.09766290413348,25.1761583067196,37.371293174785315,82.55490586654058,93.9306202681265,74.9455938480299,70.85209884916401,56.90132591169447,28.266656596619008,51.48684997590787,61.348796771190976,32.45400379211121,18.284400210079834,84.56217005240273,80.03895761669021,37.18122951019869,38.84468424856928,41.05033297136157,85.25544068766749,42.76979874016913,20.263802008821724,47.42975273407339,27.247699391466746,68.5646703764094,42.386162428338274,30.061226688904497,23.842306772728328,45.74318365267699,85.49859524396184,49.79862492287936,54.47441576087785,30.014059493179484,50.085124597568864,30.18250048417748,76.97772613869122,12.216359714407488,44.028125817803634,71.22616581301867,88.25567303265022,45.264014977979485,64.61019721237398,63.821354850967616,73.38013195746922,24.952519775979436,74.70159513872193,25.20885321066572,86.12542202521422,33.233817352373556,84.05576559527636,76.48160607346426,57.62185764882882,20.93564598508693,16.56951577659084,77.89429519058795,88.09235595376315,59.82534325350109,60.48093959827969,68.21319563683981,58.795874356930696,13.27971034877737,24.996822975986547,49.23073692712102,44.109702209961306,19.181259706975247,28.877915386900646,40.32438207618682,14.63711988656613,26.624775792333388,61.003119349689506,26.156846015697358,66.65255992041402,12.173604724513062,10.963830078973306,40.87950203661188,51.89484757485949,70.09246128394102,28.310128551733825,35.78992649272158,30.0227432489776,87.57618352252823,19.091165547061408,37.256524215960496,82.00459099360424,11.52882879048748,33.232808600316154,56.55654835593541,48.84886453839105,28.59296258243505,62.453683142209066,61.990117174079074,11.251027294053397,59.56617299881192,74.34593253603613,21.69667859184415,11.30828025017319,26.235858729653234,36.18127688856566,12.308613140119151,55.91914800100226,56.11024482548427,35.94562898392049,53.69386547155293,70.27827462566653,67.19347527988548,83.06000260327886,57.75766821374379,93.27875524023534,79.36813923403147,71.03626563287659,28.02854207307549,45.468418678871316,28.15693212991999,56.7309902519564,43.42990358844452,50.55890598858634,41.173040169798476,64.96530242958862,79.4085206400668,55.359078541110755,81.67110204490675,12.875048031205441,38.82406956868149,31.187069254401962,49.38996374756687,28.591264054420705,12.005061908353486,18.246882679742455,24.15235060014137,43.20812669638744,36.33523836660054,22.055751826643576,33.820644998573,14.75389786593837,70.52514415243257,67.55227087467561,15.728745365550246,64.66596035070584,2.5833268885264093,37.541665529996024,55.04492195188884,88.09727763045224,64.93201844672939,34.47227029137305,61.18606514850806,53.331801515760304,29.390211117392933,70.95442712601262,77.90426177174444,53.006241417908164,75.5182960036303,46.126000724746106,57.804828653744124,18.351827763500495,57.37737901739304,18.274029253091303,41.23510606345302,34.88740033235977,43.39209636232068,45.22058152398816,20.85741607376575,26.551184102292883,13.04475195885114,87.13096702470911,14.701997325647298,27.438773241109672,19.800431184988547,18.431389696570296,61.482832197496485,70.0664635333805,48.755591502714076,18.571413213776,58.97893544273665,97.46926206176077,79.3048194524182,14.246116690017505,41.640332002781335,15.538577370364056,30.81388523105122,31.992829667087378,82.88381467591782,51.0815615932198,78.15939535597494,21.538857428121958,4.313968182919643,8.69860464093196,42.205833894451,78.64958236942354,76.8319063199453,27.726362515396218,20.58284484774719,20.33273496452803,25.832528794572042,33.24912443850778,33.97909562448769,87.25311729794568,45.01203290401139,42.188299924895105,75.52810526685315,63.79634676341349,10.111023026885512,62.03151885651342,45.41343375382266,86.1071781373685,27.074385238547457,51.7548807642095,32.29821624213273,21.383087128239616,35.11417222687969,24.74457107262819,60.53194484656434,27.144718552811675,45.23892756258226,90.49241780459539,92.00498160683071,52.383506161683854,16.357942101973627,86.98007660731022,64.09970259811705,43.5263428188741,62.556429418323766,45.56442807731932,4.226451522022994,50.47447810304966,87.47292551279337,26.97213656156861,58.83949861878828,54.51794427701266,84.69766358645693,33.41561552649675,61.34293575219575,30.561430017334455,26.62593459808309,82.84152269816242,75.12975365649015,27.469173756285556,35.91245243444662,71.51000775669327,80.2103270479843,55.889343758927104,9.06884917263731,28.97757780647947,37.30599164108186,91.20187557068274,12.2955473436099,71.40719912047318,83.09938307736931,18.862530610586706,48.714840003997566,39.242730807223644,17.356726861778906,35.07457205935412,95.48061463186288,62.19075214985326,40.66733142688597,49.413757590162234,45.642217321130865,35.45399891290316,49.195650705237114,76.11647915392628,66.62911561625295,83.51524271600925,13.025743944468612,44.816604472387354,57.13144918966202,37.492548768707806,49.49807920134794],"a":[16.95348134803954,3.644268627236218,17.79948245457222,8.73315663866519,3.717708356308873,7.2894603719742035,19.106218645123047,11.618130855360098,3.325065120567654,15.674149144543685,6.924054915630595,10.190266594278977,13.315965132534263,1.3258419332133276,8.75006638921748,3.521939307308717,4.2584287311507385,17.877561684713342,10.452342511531821,14.972849304823171,0.8503143468503938,16.579419253153596,19.8245898924821,8.752607656427958,9.177531632629531,17.250532640541124,1.8994290866999286,19.281284681562106,10.477865591620157,7.101303489073509,9.979689258122363,17.86729431121244,4.178242432679666,0.793793879318252,11.453143422498467,4.195971809196544,17.327730277336304,4.425991542305776,12.970006705951867,3.0382053183455326,1.6063784830182293,16.744291571012575,2.3441983968224234,13.938119503852796,8.847130645752825,13.878074990991834,12.468427103420435,18.262349546328437,3.9232654201134176,6.328186149202999,14.901258674081234,13.704110476498288,14.507623166091172,12.074529692107738,14.318792360898396,7.547028776851774,0.2732557212803144,8.482136039193865,17.895238088113317,17.538192119886162,13.96490290636577,9.848487589349265,11.968035650038718,18.624414893892354,11.587586428447274,19.29630487422587,6.058446107709843,18.757346985505066,3.4044460951420596,7.072967127096463,8.829055951890993,12.990193213695381,15.900937750368215,3.5980337112063054,13.764253116436347,13.256530216628942,6.218087757066457,15.424510127217172,13.95952459395556,1.1096606794612063,11.280654524780438,2.3886906265205665,12.690600918200733,7.52621778413356,19.744857366613626,8.642987089806473,2.238487814857608,5.421212526509902,11.074430018781074,11.788363983002036,7.89083254795286,1.0585669316160429,4.869996620171144,18.510910901293713,16.11675943621904,2.2002799443776455,15.228526951210082,0.8996570197989406,12.841271518827826,12.291220641519134,1.2475754854769372,0.8020393688089955,17.880016850084527,7.744603758510147,18.729744534492617,1.7943141035275056,16.867256635840704,10.399728513529855,7.408272282213995,5.990568631771951,1.2921782179756303,4.291785374543791,2.6542143031721466,8.926531166096563,4.575593969583878,6.292077044094415,2.815152145863644,6.321578927248557,2.2449941667053253,1.6863656605027,13.710720611483985,16.315247646804867,19.77089618308981,4.558914541387908,10.103459994960069,5.945400327525028,12.16832980944439,13.528392151022208,9.85698657848198,18.148291764866656,16.718534020356323,0.8026256012139177,8.198070953988656,10.996936563831063,19.005029578745415,8.711297403746642,0.8725530325542374,1.771418165480907,16.760355356672058,11.338759952857501,16.805241322047152,14.042011225552633,10.27562395291286,6.1265831776733926,4.173460581980528,3.1518717768523263,2.8511274764081707,11.378149913042655,2.660756085553073,3.582606210981041,19.208940168133957,15.840712127319403,10.412668997151894,5.4872688585934215,5.481043850591081,1.098943165726478,0.5239848500479161,7.677506861457712,10.782725377859679,11.175714731608997,15.106850243804306,18.7356694559367,19.75176432843259,13.209956660084114,1.1983670539668045,12.198012275354895,1.4758405972957123,18.8504778730389,15.685419442549842,16.67083465696825,18.99885179445014,3.9943703567321442,16.978553105369535,13.572912773763157,14.152127329128303,8.539441445586174,14.36815042605049,19.415817576545614,9.800385420974695,8.075371407555423,12.003200235807086,18.090046010375787,4.980738402397953,4.659968469077902,6.848406733665797,17.11948733872984,19.051233537987486,15.343854143669926,3.211803683837271,1.1380173119596027,5.597094372364779,17.255403830353746,14.478154543259638,11.4398743818984,5.115907368523516,9.073358628010144,3.135465515239675,15.437868785337328,11.375681189200627,1.5077285497261483,10.240884740900036,6.437094473904259,16.179117793467917,7.53832310813817,15.182427159463554,17.03052144344752,14.631140246100651,16.880064198373276,3.8328992600894107,10.186360439019904,11.27550161557978,9.772362892312202,2.7310450602050684,17.020516151927787,1.8882565862223455,11.484298148801702,15.77849365175005,12.49855565847029,5.2464926652042365,4.295021706557436,0.6067203499570262,10.577721592915346,8.610935054273874,15.693180122779316,3.7601150698804764,19.72658802801737,12.14197513918121,8.813237921127683,18.86845489267725,17.431050941880947,19.00451212944059,10.345736881076686,17.353965219139027,14.242875836314045,13.625338263903322,4.795849232107785,10.05225836587794,8.709711402101119,19.359824761054266,1.224665901292723,14.760888734882762,16.172730306169885,16.050366950563166,5.812231302350064,3.8043093051284504,3.334078454026499,8.343839839605574,4.35951774527942,0.22900204808473656,5.769339783873768,18.542008817052682,17.923209141710394,2.6254823751091827,12.585217179869144,17.774669217708063,7.212990468840341,14.910189258252267,13.205522917158863,7.017528918108575,3.513926104449694,4.813178988406475,7.594118319917227,9.409196136203253,11.791415236147058,5.135576495925682,16.07479791401065,18.699312431079235,0.8287779871189027,0.6936633679398563,0.4468752190685654,5.938990334793597,19.056677522447096,14.574401978398509,2.6681828402437757,9.505529742446225,3.427998080001098,18.715752620568598,1.4865813648652315,0.6437789497786683,11.78605168774963,2.9909544834612056,15.847204831327657,3.962484973207161,2.8710608106899382,9.160293038148147,2.7196285058143577,3.755303977245119,19.584593121779328,3.7412517978903193,4.223111324951039,6.6432218476765925,7.89330318117111,15.547629129448914,3.229688319303472,9.02899562128538,18.929935000263747,12.090226300218095,3.6068931663515436,9.55685942393217,11.551685611762528,8.358540885343086,19.91669250374948,6.533031299208245,5.637412859691828,9.313013573376278,10.918914527225878,7.2750235828740095,9.025833712827659,2.3621644582272205,13.0335348787401,17.778964257745407,1.0576650638765983,3.387956638232459,3.073643423931278,17.820349569695182,5.0002098662003425,9.87117892618814,14.4005316255851,17.565617886430033,8.279207993455415,18.60095950138772,5.022201997745013,19.57857686162925,18.11813516433371,11.567137032111074,10.173248677193772,19.14978640644167,19.48138582744384,6.797027315097552,4.21907699167011,13.44121280669091,11.025351052917735,15.782182358158629,19.488231457436775,1.688173112460638,2.6395544170439056,0.5343382890682369,12.766124626677211,15.119151611807604,9.560163556149174,2.9651820344230684,13.744054834646104,5.384439573968893,9.660395731019666,10.579453891617643,11.162375254450083,4.9685124923837165,8.596312415528086,0.23895662907900128,3.437437937884389,18.58892733688908,19.341635393769728,17.660249201767503,16.115811560741466,1.2098469434808257,7.54402363957817,6.016867579834906,10.043274403003672,4.509972956730253,17.945326687065908,18.22714256609666,18.638243808021322,18.62011252719908,3.548253127694121,15.675476305997424,14.688935155110947,5.607192458951511,11.578727559063907,18.9369967589425,1.3364092222282808,12.469261276205316,14.17529559236964,14.491187366487694,14.262993423661904,11.5520206862146,18.077195638024254,11.114835159668663,4.1626204915797915,9.139115855045393,3.2446720552159114,4.0340667825749055,18.12779275731886,13.496995943783624,8.316469120165548,15.536270230212835,3.005997633787043,17.679867165586014,9.91239235809465,1.345511157312278,10.758258167527783,15.285231002529152,16.31786596633521,5.121298100411273,0.41439521237976784,13.491184277319487,2.472907212482438,14.533883391650978,7.549142631529917,3.302460875643378,13.58124331402844,0.7761200165881954,16.06822853938823,6.748819859253636,19.237658921154793,2.6302554017417856,3.648311903552486,7.972314342273905,6.112702504117604,1.1104353825067115,3.4427630906630036,0.9645987614351004,1.8804151369674216,13.345942395386437,19.424985980204703,16.158909451805048,10.329812440989151,11.846958940644239,13.22727527272015,5.03662726833316,10.556711244860168,10.865649982522827,15.914779605180854,11.043660787931756,16.676925340102287,4.525291173637753,4.768312518388482,2.0645834642285443,1.6972561924396734,15.444117941123153,15.289692271921794,8.9341819354705,17.838275625385425,1.5465517848584875,17.236080449105174,15.03526072084362,15.983947421864224,5.549771997546573,16.967071554642988,8.348264934569158,8.88074369015554,12.612996507206278,3.312837061628753,3.4575930595738624,10.197758415240411,0.5754407899406999,0.39699349542192675,6.4863760244112445,3.9945295596359687,0.5125275412721564,7.584122361930614,3.2549898816651535,5.36050037684447,19.029023672281674,6.540333563842151,3.810426386081587,1.8451100650458319,15.59433164385383,3.476446523408483,13.644592647094882,17.486513315868507,19.16310161405333,5.783230769063561,8.892890590297764,16.053675981767736,9.158942924799508,0.8813883265399358,9.793792008742352,4.2206801075151335,5.888720737385689,19.76078408357253,0.06932035318326868,2.2439365775048037,1.3712963077338358,2.0369416122085315,10.549657646203965,1.7606309513558482,19.816977211339392,9.869396857891566,5.501722921940289,2.86672550341331,11.660036483302076,1.202414756916963,3.339040222025833,2.477535269862443,17.643177544817803,12.336313773123333,17.904700609432606,8.773128407929356,9.904440204811316,15.312198503725615,18.317123764049473,9.728793791212759,10.520148176383387,16.740255299216876,13.24649671670489,13.160139760429285,15.902888780584128,6.63167570523695,12.140527908931226,5.408356019002105,8.834033284531504,10.167959250928362,7.597313026596844,13.802700575395654,8.72167890527308,5.303304961128386,0.9402592423461531,5.4468840889668835,10.972745168093292,4.008730789228219,10.009271143447286,11.519256539843505,12.830057226913762,10.236142931901275,13.895344336293437,2.718988922567296,14.869043754645315,10.122137653646943,13.875166481332592,1.3686399596141108,4.293205027242215,10.019753828320619,18.697408918214443,5.398253610851835,17.88983931171468,1.7650328105709878,8.450586322726936,19.263999986725086,4.104590648760977,3.2515476844333824,3.965813272499874,16.354616366310594,15.877932811642633,13.73614691924173,8.028005687472831,9.775737563095102,11.316206572952883,4.446510036055549,4.065788072041219,12.14870160126039,19.23547669306509,4.524226287002833,0.41013375211796266,8.922070467463584,3.342273467578636,16.598222368668974,6.131766377560992,2.4714514744723415,10.190492538981918,19.962687476602188,14.816098591571443,19.485219087879656,7.627524270855308,10.900285714271414,0.1527179515784738,11.155514562260635,7.690448866790915,17.53892614477436,18.674386030311133,9.39056942786172,2.8257647413279408,12.195856607250546,0.7364032728749104,4.62497770993668,14.275002163289695,11.853892416067819,1.1963920839437625,12.002726433242842,3.149901069158081,15.685412090775905,15.335778615181788,10.837019896361241,0.9474043064841453,2.3066531093250653,3.492381706528853,9.518363140333847,0.4317611545010491,19.870760283112467,15.502255548190638,11.790271588876028,8.737488271654389,10.164768145590966,18.406138929929504,1.5306326031669215,11.851416161247368,8.37157705002847,17.4111340913031,13.996340328264658,12.526397692005933,7.472103136557071,3.921319399352745,8.667759897068002,1.7373157885119506,4.926562290625025,10.441318352980588,2.71571859638148,12.368023567690333,4.4372610354650766,2.543137111256697,19.135033774946635,11.28784633606379,18.62091017552811,6.103759691942674,10.241696764739178,3.040974601330211,0.6831077890217552,9.119238082818164,13.949042667944354,14.805303540781974,18.3325310678785,17.166512490680827,9.752474223623754,18.474685275078805,19.866691497322325,18.8128994621542,9.003548232878158,16.65938570519205,4.947982094014622,11.423029498118575,18.475102086245098,14.812583399663453,5.8638216841834145,9.51090436950925,15.481095679800884,3.7160953006719977,15.13242106434657,7.691568594754732,18.321592977885004,3.910858836848825,15.436778439293072,12.931347610581758,17.049597988459503,5.138266127896625,10.840628140350962,19.56887791646499,15.109116550384174,2.0383175457548397,18.402012203859176,15.245688044935438,0.9466742724046728,11.317581571807755,4.468477699611921,1.9794547512218141,4.797058811308328,4.169915233799983,3.7156948713281013,13.759768195118367,19.69733842580974,6.313848473455073,4.050479636406998,14.446404824788646,19.357264391703307,1.3549798832918603,10.609331971475772,7.684464138532978,4.369005815916602,15.545902452441132,18.680388849889944,11.107998100005819,6.697940335815233,0.12060539202483067,8.187325878326256,1.2100003988921548,4.065506370132943,5.779239158756417,9.20965126711744,2.916885331783887,13.52798231112589,8.514412291916553,0.10807067053734354,9.847432560952054,10.254945810521999,17.78508827292081,18.37962061079463,11.870510883703545,14.437736636363866,6.435606876960676,13.48533430182043,10.881082951360597,9.432499188130352,1.9700343518306118,8.293427971682416,17.599354362612818,12.597399779434415,14.347446686901964,18.410762987793138,4.8120185334998355,12.898622636819358,9.538937982584873,3.4631312919140678,4.717459016743479,4.332147042968586,19.3360359442418,4.7637087544408985,13.360109580715637,11.727205393594193,6.743924427600763,1.5190094752848715,15.790685649612207,9.100674976694574,13.526245873329845,0.5069329104038722,0.6383834817920953,4.36258592575034,10.256570858680831,13.819690830245133,11.216785888444987,4.723153336479893,2.2126736048280415,18.223397158409853,14.560481931220512,16.583640525789008,18.91200260179128,7.034142228610749,10.263758241621673,6.572756712923571,16.132458472166963,1.5050976035801034,5.816746416892551,11.44477301202322,16.438433939536516,3.5109007963479266,13.88510128580414,11.777583986708748,19.342629629272835,2.233558232520738,13.9718739783622,12.63325466793475,12.99708030638799,5.293546317650875,0.3309823031937542,7.891625911798563,2.5787748667438004,1.1415647958622044,19.12029364095735,2.1629574145373542,9.425015533186617,13.367877737499567,15.456204330979375,15.986632780415388,3.2516329262130217,3.6939390656317084,1.7101558296735009,16.117983449582308,9.416117636494118,4.914232487074552,5.689136091634577,5.165750149573571,14.180579466176706,17.120311397890426,0.433657640200269,17.56431982001358,9.518845307565748,16.084482006644265,11.573026647726397,7.660964991567436,1.0340891002023422,15.147486069964543,0.05326989580513253,11.909828111842359,13.909456722747775,10.537788828244071,9.69845083597229,9.096072549033005,13.86682265450693,9.965003554413268,14.639608731275278,0.08661563623673985,15.582894811115843,5.951128037353217,18.35942728016171,17.126420740336773,11.860074280047614,12.427328248471209,2.62284871447787,0.019920953115932782,18.573936951697455,15.889732185890733,9.17962834873601,8.130320430986298,8.189375503172439,0.6226615890702814,7.347335236516179,15.88183874122732,2.764118426377511,6.0688054096641775,2.4309699406051477,4.815270996058576,8.346070188222168,12.145695574376063,9.234459335630225,2.4653836818458608,6.289606371835106,5.8915009289829445,14.672351818987291,1.4246020026843853,0.39011427468267357,14.64939286407625,13.92053682369992,19.3875882742155,4.156307313575938,3.3460826950751166,12.268042701865634,14.247262480231516,1.7162882070332452,11.271512665198639,9.199320888328376,15.133377017550611,19.2058851397639,16.484089536027284,19.28834233931838,13.419723525861563,13.599259789552676,10.427257963524191,12.926004546457639,14.700514481532982,6.044131550214997,9.264183212833728,9.862179439928598,5.418872721550336,11.596264259122542,5.6143922509015765,1.5237200650502603,7.908670594019944,3.819946767446698,0.9848861285060462,3.190552456570872,9.644307081351474,1.342084677162827,13.947486402369673,10.985627591503405,2.636677358811843,0.9155467252522032,8.09192920680938,7.038329470201488,7.1420870029938,18.6507167467692,5.44633666159636,8.101257927572071,15.29831145734763,16.81022433842938,3.687002839628004,6.507316464319133,15.499756565278169,11.498759107952434,15.933432265337405,14.036814173950422,15.12404399453731,1.0806847034796485,3.329079835608475,16.99242544360082,8.436135108542992,0.8396064916515522,7.298619586888431,3.5560133879503786,9.164064036121822,4.211973715916022,12.470508865823566,6.213201374785089,5.36266337322632,17.88217648169118,7.965249207668923,4.399451003665145,16.395069100251625,7.364946744056815,14.02685773279206,4.32781113966568,7.305226151285886,9.996156150590929,15.21324539329363,7.257892268366448,0.7595165893628408,0.14852932626066018,16.968365759489895,13.656001032457832,1.2352129524257371,13.762723978602388,19.92461259255858,8.03882977480551,14.819735110691528,18.615941274040626,1.7306415820567533,4.45761220231129,16.724461560816252,17.20973687408741,17.12430688771374,7.183970760603211,14.520603656222622,17.449271719807985,18.635234186894248,2.6094501443478224,1.4171566242029954,14.864934088464912,19.737299655965657,17.835587786524677,12.072472800805723,7.848007167752615,13.364613841590103,9.959914336535633,18.64307088638266,10.423216769622808,1.282655918846265,13.754803955786565,2.6747839572469534,16.94876900262116,3.935926307164115,19.454803289671116,4.7801575315626055,11.952813115074541,9.529297485237649,3.724732511208493,12.71189528203697,9.467013229171638,13.21257408529355,6.226134184503227,9.992347575177781,6.437540044606047,1.8380764218235424,4.796732945413433,3.2899099996222736,16.711874229253525,4.385630965083629,16.848673284426376,9.004337726925446,10.737396023575387,4.748790456912659,16.29141885867075,1.3725914986871501,10.54976847894521,12.74069886956279,16.937151594476546,2.7869899525616537,2.071365725361254,7.82746523436288,14.271467115275073,1.5740928399800547,19.20928126971627,14.980447710589285,16.147741102045956,6.572960068597724,18.099320610490675,8.264938440965711,11.065837072784879,1.5039699361485237,8.379034975056898,3.0152302524202668,12.109827464890351,18.767740403421975,10.242415911854167,1.654154912206054,11.081615140412971,10.831592320756993,13.837599224031404,17.053402075227673,12.987772221694529,4.03992543301626,8.407446506200014,15.959521662344315,13.511408542090324,13.538321402218848,10.010553638784678,17.07476156298975,11.218414955458913,5.335572441074228,2.4023039282079095,11.68701778094893,18.092242330360587,8.963985668288927,15.384446370775233,15.230054804179094,2.998682974666922,9.183315200656228,15.406007396229256,8.19399879043441,14.61474829126795,11.454852255055972,17.406057747674062,2.0340526756472954,15.985420208937793,3.114255358400766,10.44525684218241,16.04215740922642,12.12007327342488,10.523522562963468,5.6154668313335465,18.47977111434757,12.955425287391087,11.03677504629009,19.828021915573512,17.89521748202347,8.767528325496642,2.2961268745397057,1.1946399040000832,7.241871151794901,5.0811215742388915,1.9994991358241032,4.198922958754041,0.8008435612081399,12.431774675345682,1.038176876852921]}
},{}],78:[function(require,module,exports){
module.exports={"expected":[-0.7357806236321112,-0.5397601109525685,0.0,0.0,-0.3855604344367316,0.0,0.0,0.0,-0.9152685088557828,0.0,0.0,0.0,0.0,-1.7500623262586648,0.0,-0.7190176751327969,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.6281686549258674,-1.0183400273648673,0.0,0.0,-1.0899126725245714,-0.98099457465467,0.0,0.0,0.0,0.0,0.0,0.0,-0.6081383016139843,0.0,0.0,0.0,0.0,0.0,-0.6539636100651675,0.0,0.0,0.0,0.0,0.0,0.0,-1.6844879208036014,0.0,0.0,0.0,0.0,0.0,-0.5717082058383063,0.0,0.0,-0.586877334678856,0.0,0.0,0.0,-1.2048324210645371,0.0,0.0,0.0,-0.2727176558757307,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.1578187337570136,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.7548879230292486,-1.6127359608273137,0.0,-0.5279090259156104,-1.0035057105530887,0.0,-0.7025354011534536,0.0,-0.44827423012047785,-0.9264211639094342,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.8518190936391441,0.0,0.0,-0.46510393873816047,0.0,-1.0967026536702915,0.0,-0.41314588921969225,-0.9088752582409763,0.0,-0.34404629506823003,0.0,0.0,0.0,0.0,-1.2440872567257484,0.0,-0.4756924857737417,-0.6726519076162196,0.0,0.0,-0.33478747646898127,0.0,0.0,0.0,0.0,0.0,0.0,-0.5127329476566209,0.0,0.0,-0.8413374562505591,0.0,0.0,0.0,0.0,0.0,0.0,-0.22552006089978752,-0.41647956620727394,0.0,-0.9537455804273333,0.0,0.0,0.0,0.0,0.0,-0.26278149687815455,0.0,-0.14584953710640738,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.20775629546507146,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.4180121525047328,0.0,-0.28808667409296446,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.7246780131635012,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.3494408388473538,-3.039240876077611,0.0,0.0,0.0,0.0,-0.652914653810888,0.0,-0.8400610170844774,0.0,0.0,-0.6149062844004956,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.4066728248572319,0.0,0.0,0.0,-1.4431427213074148,0.0,0.0,0.0,0.0,-0.4748063460562412,0.0,0.0,-1.4664868094822494,0.0,-1.2343678399817772,0.0,-0.672165396167979,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.3174085545959672,0.0,0.0,-0.20899023996709098,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.4598513378283019,0.0,-0.3151738089966238,-0.5957753943717087,-0.09847112365958478,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.36871282429096996,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.16181461756379567,0.0,0.0,-0.5416577546893614,0.0,-1.69486433526086,0.0,0.0,0.0,-1.0247121982371734,-0.18872969788251948,0.0,0.0,-0.8797067742152398,0.0,0.0,-0.8715662752309934,0.0,0.0,0.0,0.0,0.0,-1.8404716198871798,0.0,-1.643009027439918,-1.4614874703418657,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.9351731302277274,0.0,0.0,-0.6090411104050397,0.0,-0.6913155165007449,0.0,0.0,0.0,0.0,0.0,0.0,-1.07435421112636,0.0,-0.6064580296116527,0.0,0.0,-0.5835786538565798,0.0,-0.7191323096086352,0.0,-1.1024862794069084,-0.06432250878358109,-1.3661094463687418,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.3631630991864836,0.0,-1.4216032210386145,0.0,-0.33557993034709965,-1.0572938393551365,-0.7654154068385681,0.0,-0.9477959677856498,-0.6061285730022028,0.0,0.0,-1.0373483661219853,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.09123132674781351,0.0,0.0,-3.7044667681865655,0.0,0.0,-1.1069522460460925,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.4303786747878227,0.0,-0.8621940539759894,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.34015716398071644,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-2.987773783524713,-0.8539804601700104,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.42660553610945356,-0.9834064276362109,-0.8403921917470223,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.2713075883387152,0.0,-1.2729633907108533,-2.015100876216424,-1.166005175086389,-0.8519199953254941,0.0,0.0,-0.9982173415211086,-0.1816866255817623,-0.44164915342049993,0.0,0.0,0.0,-0.5640765298626615,-1.6673172213102878,0.0,0.0,-0.7397538671549148,-1.9313266569329794,0.0,0.0,0.0,0.0,0.0,-0.1692148537885979,-0.420434936848616,-0.6281662884985433,-0.5461547955365071,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.9706670710723608,0.0,0.0,0.0,0.0,0.0,-0.1254914283537032,0.0,-0.8944248729488066,-1.0750257638368612,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.7406224764137292,0.0,-0.8042002287450587,-0.4395688214070899,-0.14260616571733598,0.0,-0.21439579841211379,0.0,0.0,-0.6591887010265891,-0.1799682746081039,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.236545629561105,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.15205126379062212,0.0,-0.20460961223989194,-1.1560797832022034,0.0,0.0,0.0,0.0,-1.588933220041498,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.2007531944946344,0.0,-0.7337040721980771,-0.707265341030307,-1.044463942277273,-2.5488755525555455,-0.0535954164899441,0.0,0.0,0.0,-1.6105182445077366,0.0,0.0,0.0,0.0,0.0,-0.1137991081486388,0.0,0.0,0.0,0.0,0.0,0.0,-0.03724809910259001,-1.5426985703332199,0.0,-0.4302072046463532,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.075436151038003,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.3087727775321556,0.0,0.0,-1.1451900910151005,0.0,0.0,0.0,-0.49944173698913646,0.0,0.0,-0.9701063962569242,0.0,0.0,-0.6619951939720436,-1.9062432141555699,0.0,0.0,0.0,0.0,-0.29929678209805066,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.4453375041345594,0.0,-0.6989365976326578,0.0,0.0,0.0,-0.6208759335135415,0.0,0.0,0.0,0.0,0.0,0.0,-0.6622414532886469,0.0,0.0,0.0,0.0,-0.3196572112669712,-0.381037339106257,0.0,-1.1200728758856227,0.0,-0.9643862965530943,0.0,0.0,0.0,0.0,-0.26400573907716585,0.0,0.0,0.0,-1.1645417576556216,0.0,-0.7509328416943917,0.0,0.0,0.0,0.0,-0.3096931912434026,0.0,-0.8720604820921244,0.0,-0.2387325914114931,-1.847775131326061,0.0,0.0,0.0,0.0,0.0,0.0,-0.3967036252865664,0.0,0.0,0.0,0.0,0.0,0.0,-0.20369842958790738,0.0,0.0,-0.6890425936877835,0.0,0.0,0.0,0.0,0.0,-0.3069620885807285,-0.7598532689818254,0.0,0.0,0.0,-0.8070712781678395,0.0,-2.1236096403462503,0.0,0.0,0.0,0.0,-0.08553167465227858,-1.254057631371426,-1.2040449280509755,-0.5797923538021037,0.0,0.0,0.0,0.0,-0.4830636324478146,0.0,0.0,-0.49679504294482985,0.0,0.0,0.0,0.0,0.0,-1.3802435690557735,-0.7750569762384546,0.0,0.0,0.0,0.0,0.0,-0.6972972441296502,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.5548903120176936,0.0,0.0,-1.0481822543119779,0.0,0.0,-0.48074457081124566,-0.2408249332195771,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.7423399297920305,-0.12525383014209077,0.0,-1.1270320172529833,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.6388491369710327,0.0,0.0,0.0,0.0,0.0,0.0,-1.8940418136955648,0.0,0.0,-0.2587222260279155,-0.9162562887289722,0.0,0.0,0.0,0.0,-1.0624449269258003,-1.47884324302336,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.763950848795702,0.0,-0.7645932348488237,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.3923462570508724,-2.536454440663197,0.0,0.0,0.0,0.0,-0.968596591216859,0.0,0.0,0.0,0.0,-0.9466312366952208,0.0,0.0,0.0,0.0,0.0,-0.6781191038422297,0.0,0.0,0.0,0.0,-0.7389562965362042,0.0,0.0,-1.385628384522042,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.8740175206062077,-0.6326420351905595,-0.4508165521035352,0.0,0.0,-0.6599463608578405,0.0,0.0,0.0,-0.6876383339625595,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.444434790403773,-0.9090990727687331,0.0,0.0,0.0,0.0,-0.7191871182961043,-0.7647515243030186,0.0,-1.0337941312160672,0.0,0.0,0.0,0.0,0.0,0.0,-0.5675869631879165,0.0,0.0,0.0,-0.335511108613575,-0.5602946754550981,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.901428579129551,0.0,-0.6645262217869884,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.3361576758538636,-0.46551161235393423,-0.24035407653284227,-0.044036488864340216,0.0,0.0,0.0,-1.0640955868095512,0.0,0.0,0.0,0.0,0.0,-0.9408588028439671,-2.329949549004763,0.0,0.0,0.0,0.0,0.0,-1.1962860979715353,0.0,-1.5480248209213874,0.0,0.0,0.0,0.0,-0.4395314172194486,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0303242443476486,-0.27418140830866816,0.0,0.0,0.0,0.0,-0.31871922842453954,0.0,0.0,0.0,0.0,0.0,0.0,-1.2469460854090797,0.0,0.0,0.0,0.0,0.0,0.0,-0.5592469296708431,0.0,0.0,0.0,0.0,-0.6244350635752475,0.0,-2.007543804677168,0.0,0.0,-1.5073197283302489,0.0,-1.5873121249864925,0.0,0.0,0.0,0.0,0.0,-0.5120819770129468,0.0,0.0,0.0,-0.29426398571222634,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.6588878353491964],"x":[27.075083996775554,30.33913230374158,81.91809146527412,78.58522145741586,41.067482640323405,92.25359488739802,23.52147343659128,68.80426242553452,17.179961655968164,74.11534102384438,22.755520201278507,57.113972932238994,72.11600618463426,13.460770044316988,64.09162804007443,37.3187484213263,23.612508215367562,72.15313972774331,87.58761664825347,48.483371299327466,79.93011190733918,86.95272694933611,46.19456319062138,35.14308238958809,21.989813024593516,54.29282388308199,81.60198718546192,10.720430629617672,16.333677079174514,34.34854754477763,32.8418053983512,58.97092569673961,81.54401570576987,74.42123702139541,47.04786222201712,26.18339123982836,59.013127291614225,44.37870481201654,58.6643929742473,57.42111934706644,83.14578835973427,19.47012034191744,93.40927321648635,65.47558530939716,81.60675477551771,63.21879896431279,68.93219473362339,86.6769447031993,8.498190571042201,72.73181520153275,60.65559559468694,83.69133727859142,51.8987396229473,43.320509575158425,16.008231201446964,44.54509521861203,19.437831429600156,33.119995354693685,58.840763170068726,63.65386471304376,94.21004704728789,19.05714892615237,60.57263441587027,67.78965132212683,54.97985431721693,48.61592514193126,48.24983237815016,48.160618213587824,92.94336922642624,96.33427614323253,36.297910780240564,34.65512927690156,41.69816396524735,20.10235353453778,69.85160318386325,72.1696925995148,24.86448930484243,68.15753326470286,69.922738292745,84.04438947522307,40.78690423288346,33.308315047160235,34.75610010597005,13.709950472249055,39.662732257160954,40.10171339812395,14.211446175390785,57.75411317198651,19.777754885257593,85.70368623033994,24.446208445832912,28.151090091402743,66.54548948428058,49.983828563494306,66.79743559487817,76.11809362813223,17.187123247321342,31.228349330341246,71.66944716589197,75.62725399474438,40.116668881041704,73.81784657115806,24.666822004671992,81.11673179558127,39.660289130506186,13.539573404864257,35.190010414734076,16.81627563340613,28.889217490286683,24.57270713100343,21.27179965944093,26.01628298776124,41.89610367911173,93.7764144688949,78.6589531064599,47.763570611068175,68.66024078014263,11.41982859463388,43.62082126424974,34.77125426456429,7.960354687785052,69.57280060696476,40.30767769874203,33.083306370418,63.65541370123511,47.27786671917565,41.365323977948236,49.91736690796971,44.15235666498155,68.28344131137692,25.051429613885198,71.34180312200765,47.47749780036678,16.813567191890286,52.30995964793601,70.33699743302904,86.04348487439549,47.75712515295831,17.793753296722493,29.01633091697502,37.00780400409725,24.966824898673337,73.1536507364337,12.230322052019886,44.04542726632698,93.10181049234481,50.75583556427833,32.96822248023004,92.42671848714687,27.23131467773203,83.717675455385,39.71464411491731,33.41825132916597,71.40641541939124,67.79243699982553,69.98858174151943,74.94212967513164,71.55433265260233,59.576964854811536,45.96458789421519,84.01539790763873,30.02834320155568,57.69008979478981,93.17073761563924,55.97970027609321,25.76581006242105,78.72398713769134,39.67108883804312,90.64220885934535,28.65500114728325,73.19258707656131,35.48239402244713,17.350423555879665,15.197952913535588,57.80108610488202,58.42876871981009,50.05551614640021,68.98981512164919,57.384755896556065,83.54327000116103,88.33922464019882,36.10124596514212,32.6318942605029,65.99019746565402,94.09012224344364,53.28942803283958,66.1987069608463,58.05663371194803,22.72696796522864,73.69739965811732,78.6378958137297,56.45905668270386,53.263049405721176,36.70539433022928,64.41861307752794,78.09056071049007,55.09176839050741,71.36170336664807,36.58507654964588,31.738595106247697,7.356587624264561,1.44826742674796,48.28210716818265,51.1409607749047,31.35903875576038,63.292335618985305,29.523401986173774,68.94698295214636,11.288705456682301,46.78012167568255,71.23840668570125,11.112111473602258,84.18040468599595,98.69105834699815,54.21170146735059,41.374308790059004,79.4665647660223,46.273623477048,61.46147075236474,50.37291996731277,60.634934251979914,31.541272573139075,77.95280349069581,20.063232086936928,59.59621417652099,30.83543136305668,61.69916656924173,15.33232858929348,32.50883479880584,35.48150801485201,54.55436795726756,50.73770536465975,33.64826131194022,87.0953676503529,30.79392238963073,7.490719485923436,45.01348295529448,16.507596585655655,74.27362518143968,17.053103267917244,60.11747217857895,65.86099036134502,76.91596647972528,80.50219478968596,67.54657383068985,44.47456008707688,90.8669663330015,7.691826962310766,58.3107925924075,37.202962533725426,34.53953086597835,64.57341430588417,36.89584464519527,42.944135657463974,63.46609789358815,56.2855424205911,74.41243551927872,28.241878398422926,59.42815799708611,19.887995042636067,61.458556825788996,29.764424941069514,41.49890555906569,19.009429460671768,84.79592715682357,25.565471118560424,67.61237728853193,72.47148965357836,81.61290893915329,69.10221840050335,82.08832980903684,50.59517394675095,67.57136396669088,84.80155875774403,61.882818287091084,51.717664363500894,31.109886353275368,53.54177761913742,13.446478204128528,70.16728313548165,64.78956163304996,27.921226424636885,59.35546048303593,58.649446111321254,81.98684953424444,83.75492354077141,69.19129400538756,30.547483277762982,85.18099886346249,39.84269383666489,76.7599321845337,50.6453449850854,40.745866017203255,85.02133660272462,26.043810791284972,65.55238548889373,11.371743946808198,76.1949466762663,35.00523794508309,73.44854212731657,21.64293652701119,35.151190738246015,72.85858684914704,53.35211053601088,9.354783858174738,19.50261977475662,84.59561179326715,18.8422036707289,71.20419674186577,85.94081641262406,43.80483722845722,49.96953260909147,60.48030559034841,17.181034679061213,71.32165772376963,15.3501503014681,17.03532297884079,64.76147938873112,72.63213530447341,53.29887580907444,76.50899817808698,50.197294026829894,76.53596772086632,89.5832715967046,74.25055451516248,20.544364468121522,37.41398131265725,47.35377345104121,28.950661814820382,82.2954809211012,13.15374248645908,79.73389879786296,58.557115126372636,20.315490522025392,60.08853715757886,91.65579673886751,86.35756776346626,17.47430877628291,35.268833174760104,24.37984321968708,29.713477322518905,35.20823852526153,35.052180589998656,89.48845330321305,27.57618009894511,15.754083074857466,24.145022685683458,36.96439469200628,18.329958514875106,72.19072272278177,24.724603160867883,95.19118349661898,58.22601750669616,77.694810301991,59.14485809714139,85.59094656622341,39.753402213299694,24.630136230324787,31.03357436256143,9.786232920879637,80.46296578578821,41.7060612878901,13.420601718070406,18.274963514872677,62.04667795296497,29.562817495956313,16.53176674785454,32.520562677950075,70.78291921586435,24.063672493395515,46.70237475287588,94.7007868026937,34.62855063871092,30.351237506341032,39.52074081600744,70.22655657745513,86.24867188635014,52.955872118661944,46.16806172454744,50.738125451241515,60.3476846096586,39.891533154155255,54.52356704738132,75.68929867527999,15.910733159036369,95.87471249265448,46.19805427942046,24.17561646179697,86.23881720315251,79.62649400587128,49.694630121749626,58.76595993638224,48.16246965904233,50.0196228294399,57.74020666570556,34.31018022698463,70.11513062429702,24.233978934677832,43.831863476856014,24.995514053317542,93.17299655941656,74.63282913692672,72.39958510914879,75.45349790287258,47.14787416272491,10.319705145856606,42.33316114544446,76.67957037425869,82.62113472365354,68.39955464592205,55.73122891525135,58.19083186897773,44.28792109820837,64.4295143570203,72.4468435732873,64.30586649026547,65.75703374334557,48.23663540487686,19.140860106571232,33.73653389814874,65.75254837731072,46.159439720652585,70.99661330169661,44.603566404142725,47.11510535814155,74.22107766927809,82.54999451764093,49.45090621016945,35.931786786419536,29.925516889944767,13.358213258177699,20.833586886479274,9.62945441831858,82.44627591664708,66.74841851006127,92.05852289343187,37.02895575645748,24.11021268755455,12.810525941468835,86.94106233664019,31.692488658063137,78.91305147513191,4.297015650811482,14.096371460422873,17.381979877512713,19.481366286439197,43.81224931272013,31.946210669850387,13.64854966847679,33.9961807846644,41.88237578754617,30.8212434174623,81.35728987609617,14.879667139077611,37.719758553340995,7.335906886504033,55.15866959812358,59.467700399922805,19.672183013855804,2.893968009986816,61.26079518399656,95.96303086969652,86.0216555155713,58.38081360887715,62.39921445124105,35.16161822839867,27.415904300357127,15.90813063863492,29.481004406200626,53.8887580815234,41.23967425414558,75.093793048449,57.20582247230825,78.72198382746723,63.30849079946491,79.90489692868195,25.662074035324338,34.493309911679006,61.08678788864338,31.231256996599697,75.97859392155165,33.1531612386528,28.192880921439013,69.27497113372905,13.192611612468085,12.955540085652913,68.62918583322269,27.869532928586402,77.94608334304286,81.56336933132748,88.43079006542959,69.43998691683737,21.01466520869589,24.41770810799057,36.83505660967019,65.06666241425886,4.645049060224649,14.916323760358807,36.7059882937075,62.88843217500211,30.550482900061475,31.78791263075238,69.15272119190982,32.94723991805593,37.8336872450087,66.3912739622002,95.62797058801982,74.3924065399869,33.84567060798754,74.61218463381745,58.73212378074434,87.61683627866736,21.305386754469048,7.209254166730261,48.48700388091634,57.25791314189882,56.12822180359944,45.585688680007365,44.867135364045936,67.26495650624665,82.41635044343137,30.059945950364096,90.24999001988527,34.13458742908872,12.186279696719149,28.35392698168493,95.54370771269407,40.85586983993983,49.741867749113034,3.0137233658546414,16.10407276550873,58.7782631150441,48.72187265060708,69.21253168760798,51.251450803787854,51.65676733163152,46.277952206278435,58.15118591959834,30.547498301032974,69.02720471438006,80.97728334187308,93.26634679451641,18.195571894641095,54.53303488356172,25.56678256100956,38.0862618956465,22.243235335035738,6.35106603350946,53.94650931712002,62.42806268759573,47.46044616070867,57.65872621436086,10.61136624655786,83.70448136789601,51.284979846823504,56.68683814558507,30.579992345683014,47.624554225747,36.3190701402236,91.74670692606111,59.36612662555047,89.10859548491995,70.75404046835777,59.45031976405872,71.0157430323909,44.34098171891941,9.622675360285534,42.23020232127285,39.07511526430356,94.66510750746359,60.05194884742779,31.074645540677917,81.01708412094322,24.26787591483446,70.58323766865134,42.01991843872589,77.91910534260535,45.59451197296116,73.68650691584504,61.83636487908311,12.87925320934217,69.68805573818418,40.63993712910764,41.80029821880746,86.18884684487085,31.823969165205273,42.1791039354027,48.85703959389411,86.3246023206261,65.5238799875649,73.27735503095272,21.98908401393078,39.46364407732428,64.15896500996018,23.35819987276422,85.42858721715955,53.19656654641812,79.04687721903342,27.11199563973544,73.7368721923514,52.94843040291295,13.518233336482798,79.50428985478308,58.96671755622238,34.95207206574152,8.19713559255522,73.75127575281215,76.09241296750919,47.526160237033935,38.80153068171731,27.010113985140407,80.31166196887371,78.27418431087851,34.32199160801742,45.06505734560967,42.18980480270777,79.46206438821115,55.83169768438985,67.93165425927054,77.45872999239155,63.60175370312437,52.11841135112124,23.56837733938538,35.67785957750608,81.18541530859038,60.344854009043004,18.015306917481716,20.39843304158881,33.09394408343939,45.16505486707774,86.01814989015679,32.509182133094406,27.342520815197716,71.28328842791494,34.16941551131606,55.91328171556626,53.84119110493876,52.59424125976298,83.91993135452435,27.511403704392873,30.87694802212695,66.63384140157298,75.47133964914283,39.41732057727301,44.28466960331022,24.060923699038895,93.87967931948715,9.302154711252474,73.75031106465875,9.377621528795729,42.76944638346279,78.71861024814606,56.26083585676847,36.28569591251488,42.09035308173194,58.437389246507465,46.842736335655346,50.6315127973799,11.893853261745452,90.62774225552447,8.182620742801166,23.708823776841626,89.76420330908068,75.82425905584071,29.01195518646748,22.375426175633887,51.98101376280233,18.025648695782355,36.99731468747593,23.631022251783605,15.532284816494215,52.77660209268354,57.22865449575583,47.61904623027568,56.63856448568073,77.20132038095926,71.6391476125814,25.87509942447564,93.78134812125715,30.588053132064204,38.46362379901812,26.033776216968306,41.26950357947739,52.9547080912765,32.5480077262216,29.145475620111196,35.693016344150664,28.685567447865594,62.06820051266448,45.514377647742855,79.49675219304491,54.52998302086221,82.32010391109768,25.22272938254901,28.643004384254453,27.49635760320445,83.06511657979324,56.86783850178866,29.82800944886538,37.88747232722175,12.044182350893786,83.91360960549859,55.75771723518086,63.63023840478081,45.562676294003445,55.73740573939962,16.608519268806056,14.621409718280134,28.613596949934415,81.96209434804683,73.07491795435996,18.080102464823216,41.227051185385974,29.00154491393179,88.4362379330784,38.19145875394894,27.368116504462154,80.27539507694851,75.10288654303321,69.49568139006293,44.13196164465227,41.286240196864796,17.047212215584054,23.939376752004623,47.19611043630236,73.33027354790762,69.13419709118826,53.545676828915205,79.29788556489868,7.9359225338281325,81.27556268985055,30.80442793051583,51.699765913266795,61.1443941865614,48.457870490796545,34.773760276919305,68.21105344388617,41.38274606339936,58.683347108851144,28.628338863838266,10.68663351429391,86.98769880352879,19.303898514297945,56.47964277058756,66.01314774061144,26.677636746591602,7.086974961319177,48.306443406353026,20.40781644368295,49.71886250600479,46.739999263973544,62.5971781273283,45.42256609239854,84.98917343231098,53.23899500068831,65.80904672883791,27.064816130272295,24.933128326884358,34.381485250944905,31.43031803194743,9.92348414510191,42.497258040099396,57.6129552077447,48.19222372921433,45.480947519327756,61.78021934317073,50.05871477740857,69.61880302677334,50.57809747009469,11.8692394099571,23.543947594680247,63.73987276641347,75.17706330017052,62.860023916561424,16.078027889967075,38.37800256311925,6.683469099968442,70.40285886128991,47.364887440652495,14.337523002833258,26.268538627562243,86.95894688433229,82.20783275662353,63.089965389029864,49.32333971512769,14.749547122238763,5.075142650162845,77.33094361475565,48.78155503058163,32.8271717937196,32.84617911914069,50.21150219962661,94.70335631129659,82.49255842697957,21.85422149659694,62.885402715649306,22.512854550435854,9.677470788856768,45.079242964170476,36.069513624945635,57.97564673593208,47.67545702387403,73.04703023922606,45.32537284824045,85.6320903871388,72.21831382049206,4.07420317647488,19.162462146408075,96.26461217540655,78.19686712026363,62.426372301020216,37.343194290359556,28.45189816053586,75.05701376515401,86.02506746667672,54.16443280435322,82.03281081934193,15.088599343663613,89.73516113626427,77.20218128339351,87.0531684466923,74.3566493508484,36.4264701024189,19.037937574230828,42.829543376525166,96.75549094051055,55.894280083249306,47.76881398542986,22.078932625211166,53.05750247996018,86.95075429288983,11.65430984320679,46.79267505258537,68.8317282020932,43.991117973005856,40.56281358775915,82.93376269309726,52.44095440280172,89.60881175928141,4.441462494884578,16.0788611667482,10.80448228313109,60.72156252000949,67.55832148113255,26.739786900905493,50.375923421582165,58.169994559440724,72.40119059351993,27.541606131712182,50.115882590675874,41.49648344530121,70.28981019258678,53.52110856026409,67.25764537233147,72.22186810557433,29.852210311998533,83.63969987837368,66.70493489387621,43.19408631900157,12.760246947264896,14.659217070255352,34.80485344939382,36.53092957161958,43.01435622938049,54.23474887404141,19.6945783639611,20.722944195987296,83.09704170239696,14.458657105535693,40.590861670055,59.55244739302354,43.013832345065566,76.28804979891054,75.95893678719099,80.82659547463278,23.055236018246955,53.36625543255642,35.00745907379121,55.44324249363471,23.475796046978054,26.91705077832154,71.02385314286005,97.6876066772533,67.34103141170377,74.71147003678439,62.23528397629855,57.70600307200589,58.90026745482056,63.143631165514265,21.77578488399606,69.56857232706602,21.759799475243202,62.96394120366968,49.65148079544864,44.42337233626341,37.86168563519732,77.69590590173465,62.00454150735459,53.11414228614976,75.53578855445188,13.481150060578724,27.33091674872982,17.85878636300616,50.43617778025347,25.24799712963755,37.760176341315656,51.842897933367745,19.948614737018406,64.16436205151393,73.5581141378228,64.81403656545592,24.953399140368724,53.05796199710409,32.37324772672084,2.626523269059322,70.94438312911363,69.72747695625678,22.846606473744963,75.08701638497595,65.25940233927099,23.41439977350637,31.928012906255304,5.563841399762377,54.30942195977152,35.3155039440349,63.906121457444726,54.652111490294246,26.231271732507597,60.15532114537722,25.658524693725987,64.92826338949766,67.58829652026944,85.68867957348971,61.351446797754654,55.60990146856615,52.812891728625104,51.93129911257576,20.663025669460133,40.37880464247059,15.487825658343791,58.91922285077868,49.41974962129429,80.78310251279927,18.574403840074748,62.712570324664945,45.00500887817781,75.53696759613891,20.427166580796495,97.18752716377894,68.9552551911173,26.89901016839366,64.02537825733978,61.73643524250767,61.32398589826534,39.43762620238643,49.88876514011639,68.59546036993656,36.6152561675955,68.56225848096081,84.86141964554298,76.49912726354879,66.62848714176053,20.322112265028164,69.70096616165144,1.7206518128676906,76.0192672635884,51.12180093303897,21.075689126904322,40.27810845111922,20.14844305995775,35.356369063076784,51.383846073643674,44.07590704681447,67.35514303869044,87.72349366812152,20.79013599874195,78.02357986016212,77.35590501794076,49.05858690230155,26.340551861669933,84.46100041998189,32.13300873884474,70.30070215036369,40.344562103711255,79.85658226798228,25.188481033959746,62.110992371041135,67.53688182294181,16.272667788177007,70.08353704723444,81.05732000156388,45.80110396989478,24.34456574324618,62.10498477310213,51.70953715966614,54.80530666028813,51.13134598636457,89.2913682213255,25.823003967474214,22.790429021750494],"b":[40.528341446674986,39.92602118185448,21.83714990413428,18.16348499045442,47.92626884863634,42.519230999337466,19.32388781773325,44.50742375980377,31.165972359592075,45.34814077194543,11.697977546428913,28.031846448690306,41.29803722094245,31.320315705621447,40.81681690951112,56.764835855151354,8.484466616378876,22.059613924933437,46.18329955994966,37.74493575208445,11.21673848861878,21.037995030894848,44.37973964981501,49.74107415183398,40.20066465854099,30.866344101655695,38.37865093386638,40.38136865342272,38.88938099622797,9.707186048315277,27.636133899463616,22.641677861320574,31.251042772395394,35.70366040644388,26.84928512507812,40.49280136561428,11.59513656584695,29.113873455538865,39.33653214132173,12.493309745164263,19.187925621657953,22.193375220153776,54.12972568708639,39.13830755010386,15.770951300898707,25.1148629200142,27.37946932746287,25.694319160883076,33.82416616848151,11.073000378592495,32.7344405369991,23.52159045629893,21.43082498784356,37.87210553497377,25.43540039866818,35.12019434389333,13.217912149880705,46.647425773497176,38.283979912548354,28.37073651373265,40.54469218370595,37.00203587680266,15.07718687550133,40.996339261207595,21.247284951413945,53.923574758830384,43.66983079098961,15.505160525078013,22.803915397597137,33.48058769571254,27.93498526704961,18.610531647108523,14.309353793995548,36.73018590881699,30.080931317211363,19.639283684638706,21.376047783523823,13.210216819249041,27.616191729179963,46.0187706432038,8.28303065592718,9.302562957823035,56.051410443563185,31.93557313645515,21.31583034562194,52.009295715367465,36.626140860885705,6.210672511459587,37.7161485556657,26.658452766509825,32.40499193476559,44.64965119748089,32.381518481445504,35.67557222772783,22.635829635560313,45.63675243888011,12.224529938487777,3.5786278749304223,39.2479039526841,21.52490501510533,33.94357220730805,27.722476907320807,34.75066441973301,36.32626939414147,28.136499949509233,18.415933344018192,11.50584744596113,24.553145109399075,21.4605507730004,32.92280939787822,28.032783692106328,19.265988008875105,49.29282402523482,33.50239126351799,17.358625294614626,25.126872059041432,34.89838580116303,41.90096237632129,34.5120337811976,44.20087147988316,13.408723201742635,12.732406708692926,29.9182192936414,39.82184791715028,31.03152385942501,10.9810446954211,37.92495353998753,48.82012349407937,12.568950138714762,28.723735713794085,36.978497637238064,34.21504011159346,19.632530907524007,34.09832255991339,45.591498905915515,43.008300263850366,11.934831303132508,25.057140570437078,16.76726189933757,15.210781757804796,40.46985645893359,33.33079198199213,29.430756827039737,31.472766852039324,42.239840429337676,57.97854316451474,12.020044338574923,20.417015768147586,15.469256005300593,29.957707801091992,34.60816915908257,41.31193312033056,24.564734422576976,24.37360430512894,20.55556483922156,13.853633222941228,43.781680992085874,5.8247635236701,16.643980344443182,24.96977669138398,50.58908543170398,32.73454003002652,23.46734823692721,24.999408226240895,48.37749221618594,14.226203892754516,8.177207683755832,37.31267702754438,49.50569356582826,22.711133616668683,19.077859577097193,45.6385046641614,16.207206257605954,17.2469344226479,32.429863993088034,40.4315037678292,12.943997855807027,51.20173170102146,40.62322383106841,42.30601828517637,35.38163068276529,14.403279139745507,10.21257417476189,19.735147439070843,28.778158739551863,35.03092232484263,21.302892978223333,31.735072013001854,33.43306727102251,19.20024746332382,41.345887630915925,5.929828808240112,22.984319021793674,18.08795155090339,16.15645214014299,9.639263831396736,23.417545078579117,37.96008747855909,17.284789120771368,27.041959599522222,8.338559558743306,35.248103529480886,38.34822944198412,15.95701491970502,23.12897762727345,32.16629866706015,45.62901502464208,20.793937083413063,21.92875416725419,6.827582087992985,29.318514363190275,16.061037640679917,25.116197407555745,27.4073777308323,34.776642147306724,9.884409683747371,34.82594087537257,34.28136589748176,21.664543766337765,38.26189335845288,2.1635241344101974,29.801130488516275,37.117340663864645,26.420650054133958,31.399698869885018,13.708564996977376,1.8678656469732635,38.035938834665586,16.80774058134005,21.396053526789363,31.52568962796947,34.51836632088636,42.97489283943196,29.10421590863566,21.09590208767729,11.45534581852733,37.4809069067701,41.82918989991067,46.03965338556695,21.07620532127166,38.67178683905422,13.929341533310403,9.261914854889417,19.770454900630483,34.48184445942895,34.258653512210024,23.361397271674434,8.66118555598074,30.20927575751438,23.622854264914547,36.649145678588695,50.18399390721829,19.511283420613147,19.24067385532829,22.515552532115162,47.86564493391488,12.997302951431609,18.609533540375,28.466169661869067,22.668622251804933,52.74720110397036,34.55302182903249,57.64832143189163,19.19299760035406,13.70882262664321,15.359776058246656,9.728685711909373,33.542692568158415,11.58362294561822,10.780997216860722,36.58321518953394,31.611585374756956,16.265726397591948,11.447061023274369,51.334625194247266,40.46709714605633,35.99642723646549,33.97025735704737,0.8284043420959764,5.446701865452015,41.865156426036776,9.389533493340414,18.56091902530506,35.8741216929088,38.90583714973877,31.28903457409241,42.00705471840645,19.87581254066272,42.571901222641884,12.438906155045185,47.47737146964954,52.49848066605642,32.20534025660902,38.298860552038505,34.671414978041454,18.11204858297241,27.126962026114384,44.16290029289954,26.61649828638533,47.16060709354355,36.690042926569646,37.31430462578273,17.603251904380976,12.195839625482314,23.37926844340899,10.337893474113017,25.558251053314805,42.30435765948559,33.15701003219686,38.008909071875465,8.721642895464878,33.19563445295387,41.3429996866823,35.359915655775644,27.806898481594807,34.73604426494984,38.73768627410753,18.994618432171265,38.236322047178476,51.967233402262096,50.15375640956242,37.22451695585717,49.8797727153189,45.07220382804883,40.4161026355697,43.42939230051384,11.339736518478585,21.91126736319913,38.42186204995788,39.83178967841002,18.414972145351708,16.896466295606064,42.08358940264867,0.32197902566849734,18.48318191102422,47.09986492384738,33.77380681426592,32.27704349677499,2.477294578985929,29.13880308853548,13.682231238974817,13.287346078322916,47.22623396186832,10.362979218289942,47.44522020405099,14.957144455686864,50.49797558845087,37.20329530472746,36.10522675156817,21.44701262153912,8.203461094605938,28.947541138949912,18.30287288395637,21.50882694802068,11.74707614078207,42.08858637552858,27.387642003533117,52.300043050199854,13.676646921307798,38.499472221492695,23.359397179781855,48.851208960541115,37.29624358535748,37.30034995288503,23.87857783549125,50.052934202302225,24.082580012325202,19.336890943985615,2.2843326016732313,44.99412585519907,17.352777983679776,42.003465588012176,20.166523024580684,24.87124894514935,11.943653371750722,37.013708259332624,43.8655062549749,21.62424424852552,31.912625039078158,27.554053977755682,23.549283368378223,40.618065987754846,40.55663920764091,32.62635243504132,53.25611331409919,45.14529021956888,40.44875673999,39.29284446103677,42.464588472131894,14.511157651339506,25.881033573876927,21.433525976736195,39.559766119656885,47.56237824226893,30.207320128610988,44.61615901621116,30.416312733445736,32.85495684019183,13.735314367724625,10.407602503846851,32.919423796307754,11.857634347648775,25.83548230674544,40.144035461715674,13.727223840176839,12.680726526044035,12.867064188550806,38.341027869621506,23.280436717222997,50.545256187069654,41.867594473483564,30.212103710188444,14.92784393357708,50.54991624049421,52.89645241668535,33.28673024691656,47.24257751038043,16.01989036518438,41.43188553405105,56.122112562671326,15.722682483444373,31.482692477518825,7.012334918777721,29.669397614672878,17.464924438266003,42.61902920653358,48.74856655712133,11.489345509888924,14.74710951562936,37.77233162611368,32.789179403340256,41.49410355001615,8.568067565092147,17.06754291456969,30.70069546004183,46.635172877887086,5.676394374787055,17.694583272466538,10.811388177212065,44.69001121813494,35.59444485289549,36.169940985521485,22.33623495423154,42.782079662849426,44.75167193977172,42.694640597973255,30.576155056748235,30.554502250433508,33.092635289582944,35.49659714413222,51.298235443567435,25.51200724754681,25.956288426088847,10.704739321591173,51.27795761545081,34.62196178633906,19.666083255609138,48.43521197183989,30.633979141441152,16.017420434453335,35.52425458003938,24.028042768258075,46.71972004403098,51.0343910357949,26.021795118755335,36.832340257396794,36.80170487790698,26.016075907130052,38.180058786913335,20.9747214378396,28.173166930922346,5.354435292020834,43.84391513323722,41.85601242443449,23.34341315851549,12.500912720721988,47.35446479770741,21.165891210668157,32.064291904733956,9.855961895479934,20.59724750516873,30.13191206871829,28.64232932770794,18.412063289182775,32.54171978814403,20.248822256664397,53.901205430010194,22.207259587165833,25.4428281197075,14.535375366489362,47.77563223303564,15.145984441845558,11.243464628725595,24.1283870890852,57.318743857054,47.04471770744102,9.878971930376403,18.181460413861252,37.81645497956586,3.391036307850208,33.04480576251987,30.1042166692054,18.877388621443476,48.687850630839705,39.76927997574731,30.69861715542201,28.315022584185137,23.595060164389643,31.076122148080977,38.5892260231623,26.366145130980435,29.23232746087737,20.426088706656632,16.712236374732754,4.1803760287411995,46.85313015546895,29.827511939298045,31.82884544734051,39.70264537611924,31.50520531409527,46.72007037293537,30.90466084378371,47.85873410401797,36.33359113600204,40.426742360008866,12.867848380960266,29.709266239971946,25.697478161949,37.14182230304451,16.092627653130236,15.373893017960182,55.29941568096806,24.182502562910088,47.94125495192539,35.10433463379478,37.23682741349137,27.598158734268573,54.08363922889297,8.890041355511658,26.153273273394312,17.392422040817035,29.54774270620147,44.31965309992121,17.12824941237693,39.06745208748677,57.51052284725716,38.457619189153725,44.893218528775265,54.18036910924093,41.24491676221679,28.9564192796481,21.104240824377047,14.293619200057561,28.909118573622628,30.249212378533628,22.033140372822004,16.913745337798556,37.140721843287345,37.16195412034412,14.989625606186996,53.00429664157723,13.286706343174567,33.134234294714105,21.93973138719077,28.437855706129792,44.430852747864726,13.205576712820873,11.545436050022019,48.30728043603083,30.37859191179391,13.874166415297235,30.93286313880214,33.33049859325108,15.840069745695956,43.1333295078026,10.750339137842287,50.664139859885196,24.564798490676765,13.125383231278924,20.92274342966688,34.60205657902866,22.525378697834995,37.6373833624254,25.961041173723704,25.75547047053259,19.59255084003544,41.78707825900979,34.23758010480787,37.03648249552626,28.082992066555082,19.87111592237881,49.30617596807289,39.33342599289201,23.354848281181987,42.57702963188955,17.912723588685772,28.80710906348041,57.370214845007446,32.26434457850212,51.005111125197125,41.948686497707776,35.19274695651695,14.955395215479879,21.90501174004797,51.539504505867754,41.50174889001748,4.609029412137051,51.65320117515601,19.658470951887303,11.258433941067754,31.706593497159076,3.9595677305762633,12.180307278613052,8.775695095288235,29.0704095372365,28.049589819327302,39.562453378750675,35.1535437659372,3.718124184608045,39.74322981792739,52.20359714100604,40.31788310342843,14.598228725530946,25.71329740991051,38.28037257637215,24.787955331416406,21.786309497769658,8.699274998920355,48.185044121847724,31.009533777926407,39.43466881973486,15.526724817920567,42.77603746577909,39.85522185368114,27.84314973221467,42.63477462381725,42.18206203866678,40.420992007910975,47.2884333701027,38.95791112151737,28.26258525497598,48.72739334254422,25.06368296096966,10.536860057574508,50.421396379183754,29.347306545495353,48.2799834933914,15.263656897489884,54.93953944795476,20.245496652917844,25.342669803859906,38.32912320658824,12.224889927011727,28.830410372991764,46.79242638210686,34.63520531178432,29.83557326307267,45.04013090212126,38.9215089714433,18.928247625166264,14.669247065380993,15.734787380360519,42.91571817836275,36.31919575927874,5.957386801605824,25.483873465813808,44.82406196006947,41.280912926472624,22.065521994275837,24.897201297535545,48.249124224051386,29.496343028545724,14.918966816018205,20.599518117510986,21.957526109854165,32.39388652940353,15.181123089782247,33.649144090510056,38.77825156886094,30.080880684085454,27.359292174033072,12.887597095612605,12.859977801937404,21.148999455001203,35.33979009961985,25.811934814886413,17.508089556147823,41.37475139412415,38.49594483696441,29.764146078377106,53.46932575985173,3.460501313245503,45.73100247767077,28.619189179194112,40.62021262221953,25.269809810388082,51.64107040040486,9.100326268231402,44.20936499637871,6.265366219192177,33.34302778484992,28.82174673753122,23.188372728306135,31.58514422476799,37.18437772407759,56.383571766276646,33.95414602385893,45.3922264924451,36.66578165281301,31.337018861206875,2.6655361108486364,15.991755297274524,34.51286136226761,36.788747477144085,15.459603308604319,24.20273311378402,33.43635443613542,30.729282025515293,32.2019617093939,15.870825526043388,38.764637421968104,26.53630287659596,27.543507953708417,34.61161851467532,27.647619650083143,29.13736347142797,10.548871461489195,29.396613780958887,45.00128284454748,15.725020005043916,23.375909837015463,28.02405324328602,14.613101606937349,26.25489325061621,18.537496213032284,20.835720995470165,2.190892072331607,7.674425161873324,48.605785010793234,42.81193978606652,10.029881956737267,18.091338406979958,47.47764102343106,12.68753442799516,53.03464367320064,39.02365881846372,7.524469081269709,39.59503527656949,18.566853502766662,39.857329987399645,19.513106784181435,35.386293009805854,35.52788083296661,32.29835841714039,26.96048372414478,23.031102424948934,19.100242844884082,37.45320111206819,35.248002855075285,25.695944304226575,39.70922319600586,37.58953338457485,36.1321847238041,33.50923170120779,42.588126251219606,12.962466580723127,22.03334208200227,27.518458019586937,27.85230985584426,35.00192407432158,11.505151167785614,29.55781159940759,28.24046722949028,29.3046879739602,12.773124187719933,29.924926833804644,24.595297019538705,24.944920707293086,27.999165809519617,15.279186569677133,45.6495881145394,26.146585094713124,43.80316433666396,22.028186684022664,11.499993183770266,35.93400986001844,28.109968718270157,32.48744324934901,48.29128811645303,20.87721689046651,13.947084708810094,7.083293543926619,52.46570179647098,14.521118949359652,37.18232194853495,49.20891489184112,40.93820973082127,9.20873940042795,41.94144496815636,27.953344542374232,25.42915422300425,5.763850554467371,42.556748545123526,27.36497407109827,33.769003054911295,32.38093236853385,25.257183088872395,55.177662750178655,53.99757697978787,39.398589709347114,4.064849015382377,28.39308384379801,52.91594314740069,18.968689541999915,21.09455089934884,17.398922756595198,45.969675977647455,35.109265395037,27.87211819191523,27.071904165792272,52.343152802380786,31.169343490787075,30.711953564353564,20.213492139894687,23.01354559274824,35.59752984272188,7.846455857492813,35.36678287277694,27.775853196569788,29.422639666219858,31.65635289238509,42.09190134307353,23.00187443702347,31.994229584047616,23.996853082504558,28.088380327433903,23.228361590259865,25.830874205264415,17.170757035681447,30.10446723638197,22.213718388922935,13.418096264943514,16.824959812769066,23.33004015502138,43.041669151333004,26.17423971580081,23.577051611927008,6.486360159766065,37.59165112416849,21.821124456852225,37.28197162600259,49.6595945226349,26.43261168965246,17.62249735343505,45.891260189058116,20.35005889233407,16.91596603225927,17.671673461037045,8.80463588184963,27.330754674465265,39.49104854991441,17.095686584160404,34.98496869694973,3.7873323951891225,19.116160240810636,39.16048239629035,26.61023849677889,21.724578177256255,21.23465573589778,10.818760333734359,1.117239377299688,21.20838272315105,24.133281229522204,17.803124527029432,41.59628072810257,25.474418734972858,34.242522338046356,34.16291747850147,31.948767129739437,24.420113265522698,34.74704013718116,49.56653168073238,38.17663578753452,20.9978887207836,39.77198725452179,14.34552513992394,26.010185372451915,53.3844635199676,34.1736488962315,46.15490331518148,43.69868421540036,39.07681656881746,45.497601467728174,20.598234069558412,40.5252028727989,21.395463188613512,53.44884224821919,55.58156397920577,18.607468213323088,34.64843385628569,27.991262556343067,34.60832321383369,20.01496308633748,50.6033642373267,12.739600711590256,7.169544798622356,48.744411235868355,31.33224752667763,19.740919626905324,34.04102217293048,26.372800527355714,21.179707363357387,3.4380259766981425,57.73551825100182,32.898766511999455,42.70609752839644,38.69044544505827,10.018867216396345,32.81990661998765,16.7825998222495,47.85170705467279,6.3056195300575135,38.56516295087164,13.629461236198814,28.87033671635629,20.4585470368816,30.31979903911399,33.61021973277401,39.522680579811635,7.038609252515031,48.83989638473791,13.320432378100907,37.45939548277802,22.715511485083724,29.90150727979065,40.48862744923622,44.84113487221681,47.772481244511965,45.634278026550376,11.467860461484559,38.93679615819732,25.80631419066609,17.325206977677347,22.292150948559023,31.496849949056934,28.812535707367118,27.875881776317073,14.201674436191173,27.596352269844907,17.86413993484664,59.08396081102728,23.08081580572984,36.08892565634599,32.545365512930864,8.699704796090977,41.15783652325456,17.63530046130291,49.1606244866526,10.832623751063348,51.91663578698105,14.502195837938569,29.196231429333853,25.110421708262493,36.79624439956554,18.0123498123773,39.25807985686261,16.859299816882675,43.20506469456681,20.438154069463625,37.21522323177116,1.112096809509655,22.979470385568533,1.650500393776979,32.19308256521533,13.404893963692368,30.60939616766865,28.68405571948859,44.95844774343485,5.262915464237339,29.61492775813069,36.40624667844677,26.423479404242265,18.99349345617574,33.840381445323054,10.816726338673362,16.939078396929943,20.10498748269006,10.184461164368628,14.085548193702033,34.74272182255905,31.046803689338113,13.605507483988553,10.999970701873218,28.391419286125604,17.90222135675147,48.226807780795035,32.04395454659354,21.962028278136927,17.80942788760422,39.667704624020516],"a":[15.276196208236264,14.103878174907356,5.104200977167235,10.523601993899918,18.361843545738857,19.01763312195145,11.905935132279538,13.681482153483131,9.777273245095861,13.192344672759027,3.096454077256272,9.735510886224116,7.2728493165191255,12.061252894200631,13.374807972458305,19.37230235767867,5.798950078954261,15.75664401381976,16.72293424985209,0.06516235095833878,0.7476436209955928,14.277058339278238,18.905179156433118,17.11031884731208,14.594534825977235,19.4249181417864,19.51872364868408,0.6228659479235876,6.267641583590562,6.600706806103709,9.274217427030585,8.750659815100942,7.033078201561764,13.082794780939873,3.549733723379096,7.256808307075184,10.452393308287927,19.685370527814342,16.461925057240713,5.175747355304399,16.09381693270057,16.382339401943508,16.324809302701986,4.420754487069258,13.766129228154632,13.158849430488893,5.46004614582583,14.16856339032066,6.219054127506585,10.622925370242662,8.665658001861782,5.176881356263294,18.101469266328397,17.98444721535194,1.8251493099127147,9.502398012542388,8.173148778056522,13.84524027577918,14.802668817513673,10.9385869334813,16.726976876893023,14.407686102510095,1.628037209421631,15.31809086577837,2.3886695712751305,14.347507475789879,10.378421096390898,15.347965529003847,18.706290010243805,19.952102553308784,19.498925141685326,9.475494954480101,7.659922167528612,15.291494410469664,8.734710329982395,9.230351963726427,12.105409643479339,7.70673395979208,19.76589816281543,11.054488815791794,3.1628572209013495,2.222531676114272,17.11712226901589,11.79933654128483,17.549916418004933,19.001473433002637,4.763344188919794,5.866584034487956,2.3583238325351052,11.77129703249227,4.858113966997206,19.671472861077394,12.898389697500185,0.1975914940961987,1.2583333763004267,10.06431575602042,11.211108277776539,0.3127645488734654,0.2623254735445091,3.1021597656146582,17.35983773735319,7.141013075389897,18.33332598237542,1.8581433746095755,14.274387921238771,2.3864670241729646,2.8407164217218828,14.22537678112783,16.419444576837705,0.42844935647231797,17.632135370129628,17.255497980321874,11.345051483639864,16.34163922122007,11.297349003823825,14.662209838304907,2.6833051618646486,4.208413909970208,11.0333083880429,14.152567030381306,2.14570910954492,10.736036699684558,12.95473040678007,3.744073760730817,16.550907045313522,10.764206772460781,13.49544772335831,18.08739461997055,5.800179838384039,15.35453085674773,2.6263922193977463,16.1424192522471,3.8131033954157667,5.638240417588394,6.990449409186001,14.804175143630154,11.453106297387276,14.132034591271125,6.223629166545708,6.318437382263871,4.871068019209108,1.161578450823213,15.22593624249561,3.0203916242120243,14.245130777980734,19.872882224709826,5.459686396499435,19.8724416716539,12.645770443748123,8.333234877175704,11.73561062484068,5.626229085094576,12.723725711651074,18.554527146613957,7.200608561478337,0.6936319091039156,14.726038526449422,2.2561680906491777,0.6809337486197498,18.381622470220947,15.319509613738166,0.6508743254557992,13.44720881557134,14.834152138442906,17.0172484784206,5.360140655089531,2.8153584605653936,0.4544486304504014,17.42168668457699,18.688588413408254,0.16821481712183672,6.784525541000215,7.210969871011383,3.287749633362158,15.775705778648135,15.668596578127229,12.01628789525294,15.272781146998579,4.467435856360855,11.315267179813105,18.279689864314687,4.011063075196408,4.052764683264494,18.67776990247032,18.74888838938993,10.541674077410178,4.584575335984846,16.8801674001461,13.015928671632583,8.630351014785646,19.66111066237616,2.987583434075889,19.42196718835224,4.358632578406625,1.920681300875624,9.25362703837048,10.696070955305824,16.078614064791203,4.776033538064284,13.498843224861194,3.4209940528995286,1.2564259304664338,19.79355814923499,0.9625499075164656,12.488311778016152,2.1125051335621547,11.199092614119683,10.764408644443812,4.385054605890901,5.782404305422748,17.767342406854635,4.716944874278233,12.787103534428423,19.711441336498957,16.5835993763979,5.630104086870911,3.7176126352938743,2.1394999692821637,17.22303515512305,15.85767286485607,1.646990512522084,1.352039695713727,5.398898473758229,1.1019162113163627,17.96687522376719,11.57779218806342,0.191031347603432,11.896598777620015,13.682403879136222,0.7603997989037659,3.3426370295879826,3.692515971173016,13.178527180336598,10.00335067851838,3.831580861641024,6.920671796761799,14.740951883893452,10.381123584870036,11.65647766893767,12.752831679585368,18.463127718780346,8.462807655088401,8.53463009730115,1.3018614722732114,10.434548157581375,17.57822243074167,18.199813892632854,3.014471329957078,3.744071169638268,1.3603826633492178,11.895632084786968,13.687420257666325,13.71982209803592,14.307506680403552,5.478793840595517,10.580754078740004,4.1160813074943725,9.36215362599186,10.983521578018438,13.38259621903466,17.788747036558057,6.34206701467642,19.199371078911543,10.671854087941469,9.046322048757972,11.681568377189638,4.493788844038411,2.6964421858675225,2.631740122780859,9.972987512166572,12.072532002926435,17.188205595759367,11.85129847770407,9.442215107536537,12.189928034433368,1.6687805253106136,13.46244912644893,5.666126928963875,0.09771475660955264,5.373170273027821,10.640237767615544,7.405668476054252,16.676282860708906,16.20733081898187,19.903187015755574,15.371033761090466,16.64339969852051,1.6594089712570925,16.56738783794824,5.159829958569628,18.804814986620922,18.225867716668777,18.00716203599923,18.884419371888153,11.537653237317912,6.389144935687221,9.984700483777353,5.752970379540554,12.974918770263205,17.780736413947583,15.629001864805016,6.945586829756247,0.2404782461645194,7.670773693268034,1.1914765523448345,8.980132967325694,12.793566993027333,4.880828016085128,4.431516640792923,11.6217716091267,5.145899986404654,18.140801627425567,10.538842377286407,16.00217711563473,12.216221341960821,13.444967619206212,13.8805693674902,0.3071476475428492,2.870430155716903,12.771321624845546,15.451703666765706,19.895539794963963,11.720346436681348,10.861818207161726,3.9825062959420343,9.049029111076617,0.7974022063695241,2.4094626857051082,16.46239803898572,10.75299971849319,7.862122691495803,10.076979037015693,5.25360070689723,0.300748943140956,0.3535903201763402,19.1496942969089,13.35580892472787,12.24042990225557,1.14985681072159,18.048650628253355,11.860076284917259,0.9772900318805933,17.501106173323322,10.003293765278642,9.245837352181745,5.492869236735558,15.442557496944458,12.17545139859055,15.140027981202099,17.669771181191734,3.174629976504888,16.73174755723582,10.62881230374915,11.16802073853917,2.868630242153203,19.512660460943675,3.6575917532191493,19.63176136082152,8.950572771728691,5.230147157753788,11.924091778735168,10.738191876676089,4.618266965192754,2.998589585873148,6.2141083538810005,19.6033521053445,6.474903971343848,15.542787970754691,0.4862327958146828,15.957331419578228,12.25420969416271,15.330434417446423,6.569596574362797,15.920301102637534,6.2487465867936365,1.116139751670766,6.876352866936881,2.2785024918570596,6.424801471619275,4.217818720399049,3.818695005659296,1.6449707376501088,9.487663341210922,0.6365861680561791,15.854853901793625,16.592883568965767,16.082858233510787,19.23699416062394,9.717347820725767,9.231249833503963,10.676668982823983,3.4456357014598593,19.76515353954936,9.674531082313571,11.037106228479887,6.8150581525189,13.748415371419703,18.971247853883785,1.3319639924263527,9.148499216574475,16.784252551738753,10.631357805018599,4.0688991809888275,17.913501080142552,5.583367715559966,0.35113085558444723,4.764966563795814,5.706351175440156,14.61636761547529,11.920546185672034,8.390577065189131,9.431346694517927,3.381591000882964,16.27784149620302,14.73681744181162,0.05290839612965392,13.930774245662132,4.583650933680281,19.000565897797735,19.759883367692993,8.784578004260176,17.989355609778407,0.534831647024796,6.153805301767137,2.278267896303543,9.698074402083584,18.44915263900014,11.274172220445617,6.094177401492384,8.624212459900903,4.739806491793028,7.4406088515178315,7.508828517211801,13.036163566922463,11.717381325965937,16.973921169996,4.2983273134769995,8.428490350020716,10.064860111964737,8.83334025361805,6.248624351068615,12.111696687299691,0.30255708069006904,12.800870843072506,9.614904997403135,4.905539438028521,13.377039069077297,12.299454909775998,5.342430275650405,12.958416312365287,18.013837643681786,1.2669869311368132,15.59991770401675,1.76121789279017,16.746908643252418,4.789344339608088,14.105737902252727,10.173028624536894,10.172727955151881,2.189349717665925,16.671017726222892,15.973465130041266,19.674631019775997,17.963823232032095,16.641510514233033,8.327801070211716,1.19465555325164,3.4217801840182016,15.100401424380054,6.363668519227388,6.8156890006572945,3.787956393282177,14.33802614824324,17.27987993345263,12.004938017082218,9.523183814248206,15.722272618935653,0.5243174797000183,18.119351703433587,7.521760171205125,0.7205917611640356,3.9887786322492502,15.39536869391895,7.898059641088335,2.3672191481262983,10.381042336912781,15.635929563456884,8.687165766417513,13.561660081418246,5.175996228166562,9.339184073127424,11.576222911311774,9.480202991808643,15.400359152532088,19.130237085141147,9.639163219713996,0.8887215808373217,6.5616892586151465,11.963816503448772,2.702316840454171,5.05045221346367,14.802319997281256,3.0682134548274753,15.401465926039224,10.197257337884306,8.49607213629561,17.163492200009493,13.654891166363857,17.12325188547713,7.834358820739786,5.723238426609476,18.335704280091395,18.724457465487717,4.921566091415812,0.7740623441143546,14.455123266511016,10.292103549341242,4.699370613345546,0.19886189276191235,14.094770134415002,18.277328496851027,13.413951425084969,13.056380664409083,9.557666875681372,3.9818939802195086,10.514236599871317,17.907815413268988,17.848201456975147,9.026288854989408,1.5709817730241937,6.287484975335942,17.702648681196067,8.831843649799808,17.47013271103317,8.796728595513548,4.641627519931579,16.071169625969542,16.388481858348563,6.717489445682681,16.700086892083977,9.750233797806374,14.035470107728582,11.362243476511452,9.988029051658195,13.651831348289774,19.498983176788585,16.073176921709447,5.7640753591710014,19.298023841486277,9.178347557050227,8.559999872607559,17.553087039531867,10.223517228763974,10.341431839045478,18.210451259967442,14.746450148588153,12.800060998915814,15.117196949981135,7.353421893013081,13.556342805090473,16.87069782868702,13.13514941438926,7.070718590871294,10.42674183620294,10.243709507824171,17.155163830576345,9.186112056465397,9.305134356220307,14.425414368648042,18.983390146566265,9.91331614611739,16.55254812057678,18.46051629214,5.621917099736993,11.14457590357783,8.857755602640701,14.745599971440635,1.4164370591007636,4.372527779325637,0.3835940425373119,5.218874593486791,10.859358218433437,14.981705166222286,0.3644912532062117,12.140864002393187,7.428825443923883,4.947249758170513,0.5998574256943145,14.553237214705534,18.16495023050242,17.94165721660303,16.412941219197577,2.128535150506985,16.340446885834588,17.628679044776952,13.219762677375929,3.214234639897069,18.616391244713455,16.896402620220723,12.877995148041554,11.508597566851492,3.5723349701050067,13.998843397047294,14.353808537300715,16.630238113273116,6.313533051559599,4.2309473261384944,14.094492636462231,11.985709038232727,8.987875000464047,1.6387007678086718,0.8476055260598914,5.213955690972494,1.8659648807256835,13.063006231427657,14.421382407357765,1.6110457233957343,17.47150638792203,2.214749869971926,0.24796424949335982,16.053632017030594,13.005099214519614,13.808791366004725,1.7796436489275447,4.173740006222135,19.696978476179265,8.612342501341054,6.063009769302714,18.274064753959106,18.185769607974038,16.131217965486094,6.313608895086742,7.8010310178140285,0.2253503252807798,15.563949682319738,8.208189674800579,7.933607874108746,13.61964687402796,9.568592468139293,14.87813406705159,7.528672048157232,12.36284995013445,2.0915524118677764,1.4641456269064834,15.073478809664543,6.153167668018358,16.162144300307048,7.415083194079126,17.182447269894496,4.316814915933533,9.072533792896579,16.219263520141965,3.121334947550438,12.303153748272946,9.786212176885222,17.692939837974222,7.998363013630363,13.891838037314956,4.19731005599179,18.531995769087303,2.746204760798885,5.552639132192474,14.917017556686861,7.63968152284729,1.9162029030826266,6.64931116771506,11.234914912499839,4.205952466374292,7.922167614440219,13.087982935938523,13.442733617338618,19.814845401539458,7.844639668552031,3.5650617038072197,13.285752008538134,14.15291204047207,5.537353431738605,1.5332491928101843,17.20703342960151,8.837543001953634,13.475145507789765,7.989064834066659,4.513286479510978,2.903449957655795,1.0791126441718824,11.590555073835493,11.921636915817215,15.83135591842991,0.741288097945767,6.082989293083254,17.2056688525393,3.106544903587798,9.618027080314363,7.744390593656694,18.86700007614884,3.98746659444817,12.099911434942294,5.644483932768516,19.590694621278857,5.2599482596655855,11.274422144479823,3.9551707001473213,19.777162302905865,3.425906014813651,7.091709099047092,17.197359451454194,12.597762054370566,6.63415000289536,16.846812386050026,19.34762557306555,0.47989933751319214,11.70325517264796,18.241850519254776,12.490773101293424,14.8765008783035,7.542231866016893,15.207004563132447,11.90046992484552,16.070694913159713,15.129046048833485,14.147403128693545,9.373032327438375,15.22194666775559,15.608697763335705,12.53987057676959,12.439419613867155,6.326177061720788,17.220700038594924,6.665249830989315,0.24751167891305936,15.568154593044309,5.030057567292636,0.625461889731751,3.170651647263032,12.594468963971671,7.919232590370311,1.7916973707588024,1.7232043283950782,16.3348645222366,5.93296677618294,6.549940021952927,10.251691671923933,8.681035743998592,8.051896112822693,14.045715399292584,0.24721542364550153,3.5043046107554243,10.57327824006126,16.190331695287327,4.19842760941004,16.741375616636624,11.148495833734891,13.808423720519789,8.231642604933839,18.193356676515734,5.704641604936813,14.108195908076041,14.167202418971785,9.61844170310011,4.336879561750382,0.6508808297256286,3.2628163034273294,6.54511793402623,1.53506172099116,15.211733088066236,12.503326705027092,0.7030028653207543,10.503997146164096,14.656284312931058,9.575609509574647,11.173602447906879,3.5919414522917448,16.74242560887658,10.811476660980484,6.821890295263984,4.72353119222134,5.644451388053207,16.840015133323742,10.403924113767644,7.613144671258785,16.037048212708243,17.14916859041537,7.790572525796131,15.239772784385401,8.882751381771183,7.037619676581115,1.8513035647205411,12.16791240196056,16.9074232032049,5.325019938549813,6.989016371770136,3.7752870106355196,15.990929280723165,11.657254321123464,9.493427127980215,11.65540989171252,7.682454762093753,7.541413929953942,11.530593176810623,0.36796395021220896,15.12645189706243,1.861034271056381,19.46762019189427,19.911331929122994,7.260683387401858,18.437997661291092,0.48828123268957135,18.600016573573743,16.857541560163327,7.574794405731398,1.8962758657112122,4.047318609240831,17.18238497217869,3.2092161349900206,14.730738979654433,5.100753074473707,16.481967672717587,5.327843973282711,15.67670130715744,11.530234411713817,14.883476371488955,10.556477219993226,16.45605788203405,17.80510660564106,11.638206805549206,16.997946065231638,0.13852096501003608,4.103340903927601,17.130145150781026,19.423556265650465,15.137659710839117,6.424312517389197,8.11259439933571,17.57916582989222,4.278895396661855,13.186077830984534,3.4178502992554893,5.5405619785500715,10.551280494699768,2.889567664408239,8.613664221567209,4.443694954526047,8.71315229360382,7.484171762814338,8.613112683116748,13.806943833248475,7.990213756583997,1.8032638382395394,17.315625134622586,3.8965691691141924,18.56277582885417,11.76358344338368,7.171948696249411,4.687692775880308,8.807361184829144,12.229480680883773,9.885286634853806,12.654680994150382,7.287627556038747,10.561543588107693,1.2993486086792005,14.424770113498667,5.565079384694713,1.5521927015942039,10.259890271631482,1.7391670435644002,15.986521101266602,12.365971339504611,11.811049396778888,1.2827219103663623,0.6858768106237267,7.347006449061895,3.6768221259819844,7.6772172870138355,7.912464188076842,19.36071505888783,4.426064597514268,11.0545267752628,16.8107920746945,19.3813981615748,14.635774900307759,16.59075450065066,19.333854606630094,4.549146677521545,0.11479455439742825,1.6060780656616425,13.79031963696062,14.515223391966439,3.0402580185445593,8.389100349765876,12.945393162320894,2.788338552512535,11.012583957179697,15.69824433264749,17.644056295019688,7.553163577749351,15.699177261525122,17.66681561591128,3.686939241541607,10.702196537849549,10.696569198285886,10.715253520413942,0.13559432118764647,14.039369746633351,9.885411786572998,0.5566905743601946,14.650929370320691,15.821302651555769,5.038299498677681,3.7985194651841425,19.59502516923475,19.426340131317,0.7752777355627494,19.821205944925463,1.9082058613005648,9.32717231981989,2.904000488976468,3.4758759348137547,18.935903561544528,0.18865757561121743,16.955291014464713,0.06336813542219932,1.5887021203175378,2.124253817439863,9.26515104302593,5.842831884750308,9.709775429221391,7.34728446066077,13.666763028117579,2.104891515588405,18.58201384915718,12.044048537871678,5.989016456288918,8.623697629321319,18.232352509767967,10.81242500639104,18.316650972404428,9.978623764781931,6.793167344306523,10.610621877647063,17.057592669185127,9.532884516091261,3.0022351788906443,0.7772718169337933,19.33482332640481,8.859214511290489,0.06290351851799159,3.3764852138166424,19.14914691945562,13.00557492039883,19.334419219486843,16.967992016260958,15.410262574387122,9.147265145852344,8.10320674411293,12.556001861119643,8.04706507864552,16.861889869174632,9.608226339860897,14.400602008050289,11.005463155167629,1.8403148004118597,14.33207065951089,16.551771575652708,0.9733435511580213,12.39846307698317,11.57446833158005,18.164683842984317,3.479229202360532,18.259241087857244,1.1071003328889795,2.1341904033143866,1.1636888340691387,1.975026070195578,12.302074324046899,2.2805779202845367,12.667867975326406,11.387636210498364,4.384472524087362,8.06640649723239,14.778433716075954,19.202350006526842,2.388607115489245,12.254094535833651,8.971875015360077,15.40760916438117,12.107627114222321,9.90965648242966,0.04799795112189642,5.153650556638771,19.04070518974941,0.3937233192835654,9.430181644164639,7.485122597158553,14.642474857125878,9.49103596963996,19.20712993496562,18.26474304672063,11.929734589511822,3.959200069346731]}
},{}],79:[function(require,module,exports){
module.exports={"expected":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0863939122142865,0.0,-0.43168773676968286,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.20506867093427958,0.0,0.0,-0.8241955088472438,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.10818366785675787,0.0,0.0,0.0,0.0,0.0,-0.5860019480262746,-0.7571032928993796,0.0,0.0,-0.1364935232179489,-0.5445375819815657,0.0,-1.946712628132006,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.286345223912789,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.3271099390659071,0.0,0.0,0.0,0.0,-0.6011518100164793,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.19023593760892263,0.0,0.0,0.0,0.0,0.0,0.0,-0.33075666154785205,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.5438726759612245,0.0,-0.3608282111344391,-0.6410821029767656,0.0,-0.346749918090441,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.6489947400900925,-0.2797119678295942,0.0,0.0,0.0,-0.583599686341348,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.121290194077596,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.44625217592830835,0.0,0.0,0.0,-0.09600215220839689,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.3889518259194983,0.0,-0.605171038291913,0.0,0.0,-0.7496556946787712,0.0,0.0,0.0,-0.9517903268939067,0.0,0.0,0.0,0.0,0.0,0.0,-1.8898074394611397,0.0,-0.19438796644818798,0.0,0.0,0.0,0.0,-0.6731933458742603,-0.6500406620118162,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.2654181150915567,0.0,0.0,0.0,-2.217974838915154,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0930103370619375,0.0,0.0,-0.20390032239233616,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.3822603035262426,0.0,0.0,0.0,0.0,0.0,0.0,-1.1776470428848507,0.0,0.0,-0.7755882955005121,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-2.0896816152413757,0.0,0.0,-0.48943639623002155,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.21373992046674228,0.0,0.0,0.0,-1.4067350332011852,0.0,0.0,-0.15102251733748662,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.4359282141430467,0.0,0.0,0.0,-0.40222385621537454,-0.6503190029500041,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.653775857981763,0.0,0.0,0.0,0.0,0.0,-1.1445002898036791,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.23350472057819352,-0.31886265499773214,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.8599538327756389,0.0,0.0,0.0,-2.6857157884281,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0511369990811226,0.0,0.0,-0.2554225904515306,-1.199798998694105,0.0,0.0,-0.3432370377421004,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.5923100891874649,0.0,0.0,0.0,0.0,0.0,-1.8727088510864045,-0.29772998009554674,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.1506084174469304,0.0,0.0,-0.2220986605439835,0.0,0.0,0.0,0.0,0.0,0.0,-1.3399427523991367,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0496438146035227,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.3928409299263316,0.0,0.0,0.0,0.0,-1.0716027993294313,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.7271190584992726,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.3481017919631745,0.0,-0.37040124242268346,-0.468470781536767,0.0,0.0,0.0,0.0,0.0,-0.10981603326679837,-0.4527521076899264,0.0,0.0,0.0,0.0,0.0,-0.25167391938189165,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.29683614244400475,0.0,-0.9573284979268843,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.8958931562557277,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.9839397916282397,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.4133129026445959,0.0,-0.14274964775924737,0.0,0.0,0.0,0.0,-0.940684564388179,0.0,0.0,-0.9409627295149199,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.6633970673786864,0.0,0.0,0.0,0.0,0.0,-0.31134663246697425,0.0,-1.5947583881938707,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.4631196841741483,-1.4821008499756458,0.0,-0.4424210139868872,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.988094372239688,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.5528527293689167,0.0,0.0,0.0,0.0,-1.3237750220167743,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.4062702184169378,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-2.055230959915304,0.0,0.0,0.0,0.0,0.0,-1.0392561114196845,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.5684001802475133,-1.763807342085622,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.38856032360958775,-1.5116668539081148,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.31743567183430427,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.1724818610799241,0.0,0.0,0.0,0.0,-0.5281718317142459,0.0,-0.7986195193116234,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.2422150348251731,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.22873245597994463,0.0,0.0,0.0,-1.3145127123090041,0.0,0.0,-0.44233870760181687,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.5822560729698016,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.24051522815998788,0.0,0.0,-1.7456656121666478,0.0,0.0,-0.9780769773368234,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.013537877661529054,0.0,0.0,0.0,0.0,-1.1645449964854222,0.0,0.0,0.0,0.0,-0.570706966081122,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.1899485336718083,-0.3207119792901313,0.0,0.0,0.0,-1.158167128036349,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.6337688128802926,0.0,-0.3046019855392487,-0.47734970572148927,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0058256425981622,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-0.335075811960098,0.0,0.0,0.0,0.0,-0.19654234185837985,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.305170617489273,0.0],"x":[76.85343596921933,37.19743780443396,29.6736879353216,79.63394743596464,69.65887772695972,20.267715219306297,18.886693899954913,40.70105630419104,31.503082966084737,53.72245090706994,38.7114631274128,5.636848733770723,72.59760571642146,24.509908573752995,83.37971021934963,24.450295244504254,63.60832552556747,47.90795760376834,86.7592131225464,71.19383229518564,43.549564010011814,66.737883957476,70.02919153441108,42.45074800185674,90.89806304273837,36.48804799190262,87.97502339972353,61.64119332232375,64.03879240316913,65.23816580463733,32.77418439300263,47.5216045884902,63.18589706490402,62.69822062848512,46.60897766720181,27.370117406867024,29.284720925015797,79.51710434336118,12.779843979347532,37.410315869510825,31.71705653080775,16.43006766860955,23.671741811790238,30.64677030247504,43.95052766051813,23.883803119220637,28.56820170123097,74.8437582736043,39.850618466218855,27.77300097694622,26.951912070398105,32.210165563066354,16.511284262664162,34.88316402975481,41.86362337371445,16.49390558993321,10.78894402312628,71.36808734633473,53.25732210945246,30.092581386024126,10.695773667466195,80.24717092423413,12.400233876312697,41.49118677757197,41.16987275158373,70.87159254297961,49.19191174138396,62.621322332385034,57.68647717818098,49.76206664653525,53.67854023021203,13.94866458293043,50.03324247668071,51.39945812420156,81.38969650155619,77.32888972171335,68.56630601230371,27.32820354163177,42.27178299457541,40.57434299146839,55.78857129049896,9.381917678136746,56.34454536709735,28.384401851779934,67.75810416776619,65.02223668419462,17.489030286139734,41.27322298374823,42.168920306209245,65.15840368438396,65.67823848021135,41.775880662722074,70.863672200915,20.458925717873345,52.49635316744843,48.45836887762443,22.329637016540424,50.23526660767146,46.1290093431289,88.95293969793335,42.57541686527657,41.049073253246334,82.00458010842017,27.592409577850713,46.283674179716435,56.40348123197015,31.732479040918182,35.17888159277353,38.17351864862411,62.3183189456842,22.90770097377358,33.147911278601995,54.57815334453713,62.006247200366886,72.69950123633049,61.47583300977692,58.089639638406226,46.54477113847827,66.42730639545607,71.16803095441942,75.86551167753217,6.888151023990701,45.30376701532499,20.86075726220549,9.947522102365642,53.0756211615148,15.201602168631783,64.79695716547968,76.28513226958995,44.972257038138906,56.630913663597504,84.7680635125941,49.51553605811794,51.405342958252206,41.19499280839909,60.37215766494744,32.097950329922725,26.646574723756306,69.87239912798758,86.53751295458966,7.457309132288468,17.9806189271717,53.4086765713564,81.17608490118133,35.028115195950356,15.720482094183374,56.456194143298376,59.563076377111436,28.477344594553074,40.17427747338192,34.6221976486146,74.10868763077984,83.30165205440798,39.86141201995748,70.33847937357007,48.520270827723394,12.618442302728416,76.47366030009547,64.67021643758376,70.65357955552332,25.394786393764033,31.553736243725705,78.71755148100767,90.90815538802075,19.930375149613184,79.05961899477347,21.16980985818826,68.55347488288704,56.700391202854604,54.010291762956825,25.246731044416478,73.40890667126845,71.11305119325709,33.76455089497957,62.52359204753384,29.9629123319902,37.8765419203608,65.60128895470514,31.00568775421071,72.42112251026947,8.541228048932243,13.30309260302117,41.34312310942567,23.9386811791723,22.960257494844875,35.162418963534094,41.23508404734498,18.847988301220408,32.041908220924896,34.93319683898779,36.72860177424086,73.10802336733583,64.27843056031352,82.32885199795558,12.670885208157063,78.58716815447131,29.301479300898407,33.825442318522335,67.85079735268624,36.88113052091338,68.27922978632458,14.228803488464372,10.038080062614023,48.401093683912634,73.37741419737497,21.344290897803198,53.65079433965758,26.064295458695156,70.50710073326954,50.13103599188636,80.61931791442247,38.95338898906067,5.341750995506707,63.83498626955234,74.61333854580964,73.69765113158932,44.73688287821221,26.09609778084252,50.94644413807859,62.28386869145059,40.10665566515336,82.46021620781005,78.60273354897406,60.18127971054014,8.056461948058345,36.90580780856679,61.83879646026813,74.71018978501445,1.3385737209435833,42.53337437188845,46.88798237311382,80.93164399806375,27.60635636290082,87.43840157853873,31.68482928056679,31.015791402648325,50.5200224151395,63.464480308848245,70.89135511803615,76.29042510448593,17.17616708154585,25.271141726378787,57.80932865097723,31.566909277095178,41.51831914856611,32.21439311331881,47.31482386091052,45.78140611849847,62.3504536437387,55.38774695862798,56.99024677926801,37.015978431817764,40.81967338147761,50.13268787440732,76.7420352145833,45.78226274848735,75.45178248443413,45.98030391288525,71.81491562078811,85.43646125015535,23.50994458333528,69.31108521185979,64.41229803268207,16.78081700545588,73.80692644933555,97.68829790993851,55.980646176163866,86.55259321015009,48.86179547426777,53.98332572141843,40.20910889806822,16.110839208361675,63.49873755891697,70.28627291925113,18.945605531261872,49.49922612132505,44.0320410936627,92.42885417442716,6.800768712314373,26.804519245126226,84.96725020325978,20.144632981354164,30.457754849503715,19.196613346365137,45.60963483967738,30.605611673611726,32.0160684219468,24.94103661246355,26.42373305316408,51.72089508175597,73.5732486723928,50.19124845729341,19.97519423120519,69.77191527061825,52.965118003932005,69.91909784606328,21.952841733429143,88.30449058793002,49.659143674462726,38.91244044606671,57.80023436444427,62.87085110618469,80.18912689070152,58.24785282034833,59.05373398957033,52.095460546425734,5.302025589791652,49.145923615992515,30.085996391757718,27.834213464344693,15.792491329043084,39.016779797174074,27.389390326470398,17.71408247253234,23.984746215916083,39.346105081326066,58.460940092378024,85.51602924568478,36.387905726354006,16.862395012057107,29.303196687838682,37.327259873713075,66.2972832343157,28.3827285621976,24.350100805074575,42.22455133958746,80.32511416321688,22.173401147283016,87.18446505561076,81.74311766255155,78.07496238007802,6.692240238069296,35.861401865464856,38.46013939371332,18.382748292135975,83.57480500805909,24.278633728431984,26.45678161536551,80.62065803463301,69.86499338638761,34.24460119670071,78.59902689122768,65.14793296545047,34.63058284445006,38.35544421177016,49.044295929502276,90.62758135041666,8.482078552091167,55.32813506985448,88.1735831378168,28.775542002233983,27.117699774554488,9.153261811030461,51.71857757126442,53.28261508667071,58.158621229753436,47.124605408386856,67.37695842248291,46.906602087487286,66.9565260357857,63.84779107971802,68.9610785302571,73.47549509762526,33.65336824084171,46.75169498683654,73.89555297181165,34.019450793253796,50.33623897091472,84.50151942995006,13.561037192217889,65.98259707968231,85.06839811259093,39.07894017020693,66.16755078851921,52.43740414881434,5.644202817617359,58.12787226031989,30.808638892187993,20.789067545951934,66.77142676895859,68.97489981892527,12.17407763799034,17.55394145383777,82.77650113161351,59.49452099773943,55.74910865698212,26.917198830725354,65.40686852715932,62.23097620995547,74.10197673741573,50.799289331400814,34.8750993797455,14.589901483040922,25.969081875713705,21.752670225988147,84.78870837166768,63.12213058721696,53.88626895188342,63.46814400376821,51.24557089961061,50.18289486803248,32.826501731641926,57.20970401511421,49.04717090007335,71.72120163876988,6.200413003063923,50.538169990576975,42.17155630612163,29.562043208318926,3.203441988833444,82.73374918617529,47.389814196896566,91.08013941874816,29.648393957112994,38.685163816371016,75.50288135859941,36.28819537628728,46.53968551252626,72.1632272646703,69.75839763770496,3.99862292680099,38.820676865777635,56.388624888537066,28.22536706370034,20.004092442453185,33.751119526653625,75.88316774236009,20.106044409791043,55.130561924749514,47.398138848172046,49.39976334446906,85.16472173012441,42.574474544492865,42.54987367775276,33.08652515742602,89.82322471856773,42.43573690460622,84.0239773459461,39.94702531375795,55.73078755894495,95.14031273947876,64.27019094457023,49.37281844626299,39.84091214515691,38.340299992857574,91.14771938105591,78.4190374968979,33.826294185247505,90.51839960690177,77.83999572859045,83.82009606745964,10.255542413239183,40.578217613034354,44.433285752942126,40.86402958866345,35.861703833752244,58.6585434116287,19.133319638256655,33.76543405786394,33.5718330017347,68.85798229111653,52.591187622442135,36.95488870425348,11.980022102921328,31.515931628885316,38.56767900567227,92.69796128123984,62.81311930861134,35.37951752068165,33.8711457234767,86.84292464108566,60.827905994605814,64.54437799970154,73.47679139250528,19.78325516049703,70.32227345782064,50.125083048729806,18.090511474785657,64.51105836563913,34.63536330967817,58.616168786382914,92.05244801714677,70.15327240113446,57.84464508454744,6.484098880074742,37.29894365005737,28.051922575562884,24.899713470720197,47.86848111656654,21.94120204790118,31.007373547772033,60.75175475778154,8.82941147692831,26.583126305019114,56.04180537702969,83.72321857998713,32.31775531015089,84.25784489172426,43.801946044250414,58.08950523509469,72.844354947051,56.182529405190145,58.52369597498594,93.98903064070139,61.878251521398,48.72184133933749,26.831961496789823,41.60442627528178,50.62578981927845,74.26885055168614,30.924699099252635,75.22187242565201,29.0768152016047,84.00525742141575,35.31477564888525,79.93983545594602,28.58695292695929,18.896246845597656,81.54567115872801,42.81743243465923,62.96003600268476,67.1544395188647,9.82071484778352,83.53105836679408,46.877762283628584,41.77926120188248,59.204872159976304,40.28190662353684,46.44681799033251,57.664892737355316,77.97147892158603,79.64540395963033,58.18121184340066,31.976834275142323,83.27071027864336,29.92119005720867,18.081924583426545,49.28455609985661,5.770565781603669,41.59063730553155,48.091249127838125,61.973970449381326,57.39190213592217,19.649225661643705,56.83074322673664,62.88436202429181,19.426810325125757,25.785662420328244,86.84331433959167,33.49103813035787,63.02227185330744,15.24109238025806,71.07029473432485,24.389637260001223,27.206773303138178,81.29265371943542,73.49738635696939,30.065236516559423,24.634326596646233,90.21100006027979,22.43398804344504,12.889427186083907,31.31118199051732,58.98407431549138,18.627204074500142,38.363099654583806,61.819505220738684,25.314388474143733,75.55133017050137,59.73659218567876,72.30677218189663,19.856848246892937,26.247586520401022,25.673691435508527,88.19735519981047,44.621170577267556,29.28286911836905,82.33647452727581,10.06690296795886,54.25349703417121,46.19732277006872,54.2218624660165,79.94411163649713,52.56611140186244,66.30472618535524,65.32651992395033,76.78181432356351,35.69687626788702,68.79739317372014,23.783019800233646,53.67367527498078,24.55118047593516,58.3151328429009,78.77608830098904,32.75764286927349,33.607550080993384,64.32977025022748,73.06598514840263,34.701182812527634,41.766163199422415,74.71723175180179,8.689111258411831,26.717777036011057,19.302898734471192,41.05194154541312,15.678634742507086,56.531190223919054,31.347293949659228,54.0126505454358,63.79761518273321,14.181412540199192,77.01083927618245,68.49203149788642,65.43255249118272,4.408727338958349,59.002390097514166,80.21842079069563,26.062762633092632,28.490022875884122,33.44174625536241,62.252683537583415,52.134383798420025,40.125303136459415,38.895045206017166,25.203527240357566,21.668864963921028,68.62627189756107,22.02680655832532,43.305745532558575,20.15079884461608,25.5722831420581,14.255864824199413,30.37296320266774,23.93644272753173,19.15506815094038,56.54955402544803,94.26334736536064,19.13569060295852,20.43719115784989,37.96451984729785,52.09734459024863,56.61129456539453,57.54907886535896,31.731698083823602,57.232895636014504,19.680290930206578,66.14113785768912,52.2441518301133,91.98169385621463,23.006339382267562,46.34520802141013,30.69307972982941,71.24524611867096,16.009890588411388,90.89144499508762,28.688987080728026,24.42834466662086,51.8138389912544,21.956181651855022,26.28103717010149,88.15037185264349,53.9903692705693,32.0387005996742,21.461184915862628,42.6845313416843,31.640500272126275,38.601776585072386,75.85606561346562,42.01987846184467,91.76179024330224,83.23509829639724,68.06743770634884,27.70658935927335,71.8697991786283,13.9726733695332,28.935595413158012,24.7005093292423,5.620172851001102,69.14356224598443,29.753443043560914,41.22053239525975,12.552442969885135,36.9233901204764,18.812423839976738,37.06706178543825,36.99807746447397,57.7889920916233,78.58293074686827,56.34524269000523,67.26182590143657,36.986686893877014,45.20996527121577,69.34851751473704,72.71000723440984,41.97828301834157,94.20589709514522,16.378975626806472,90.80895963979896,49.756087022488416,62.12722426826507,42.66769730827821,38.52847424115678,32.7163448964079,39.64439804390436,28.629279404793394,79.1259262929129,38.79744731444689,67.73838163070822,57.2879810115956,20.5542560868839,85.59170903098206,22.032306872384446,57.068539694163604,33.09880894066458,45.351335201848734,42.170238058409495,62.41860946933002,63.552343607702916,56.58777723538828,27.119746387122042,73.62650880343006,75.18762956324954,20.4337819484746,45.00624172627583,91.70430721089856,87.77292537071645,51.58174804858673,36.33189117243124,65.49597688325835,76.37483692532724,78.75038305057046,76.70553897178846,46.264870507919525,55.390423502363916,13.586131178074572,77.11571739048546,29.294257345386995,31.081751197845538,68.43516769058874,29.234411453862194,63.8902897162211,70.06549723558682,62.94184969258752,42.53123105685419,69.54977734947555,76.18731688124694,56.127827413059975,41.156764710596434,31.920700132641343,22.188369253247313,39.953621098482586,52.034506847162014,41.15002861766717,66.6022983236171,66.30081473196292,36.16130516725765,81.72505656919073,38.684034904925184,79.88005317895984,3.969594580527618,40.82422911001566,82.67540201391338,73.62085082889668,30.19940111050525,19.25162780215367,4.520565610254641,56.76476727358669,70.89586616022616,66.0299832716073,51.8026051237298,50.48736672361519,84.19098821532253,41.79993838875493,47.50727402549256,87.32344121866703,78.3041214893142,47.83305883233463,12.717441035586795,31.62157018956811,62.259888816058435,42.06219798066829,54.065997145857466,16.335034517965052,58.36298530482813,69.25206043424025,68.24797494530755,82.42425843060309,36.285665849332624,48.06281695627355,39.72105346715926,35.40659633454709,86.88009366126143,31.259679949989252,15.788789926452807,65.01035685365312,78.4190211964455,74.47840199649583,75.80406231740544,59.299806458634535,34.80130707413927,44.813519708962566,63.74756450195695,40.90075610143906,27.788846373528884,75.96969705433213,12.060176604507609,17.459765359982786,18.249065731131022,75.77006264779929,41.804981065768494,37.37063979009797,79.9025621245168,46.275328885062876,36.14924255923897,76.93394457302516,78.5801393126253,78.79474851139067,22.561801626076377,50.114320674500576,66.30496122274386,57.69812205957857,34.83700762068931,74.52887224783662,26.617217521595634,22.248689825322767,17.73544981997194,49.04695824191624,45.18949746743034,48.11312235241784,86.31270289194289,75.27591022372732,8.966917538057867,57.80849566917822,41.16168821539734,65.55012805659675,39.706039681645294,69.83722518923092,83.72423656758525,33.01947820517922,53.82710915230679,73.47851995887153,72.59958061663397,82.8183781456838,70.52336249938391,9.464917774794932,79.83459828707969,26.178472073254376,72.91812158319462,6.808285176370195,10.409740144014892,24.682851826323976,22.79061945722685,34.236037219883194,71.74399560985755,69.84615765093736,39.391995072513346,76.38992559385528,32.4880809527144,24.19855939860045,59.18381042316204,36.545098022906025,28.699419117624643,36.75662071509195,20.888388154078257,26.136488833926606,8.442963774618644,61.0351639710508,65.21808822636822,69.43668027801732,88.96099123610377,80.46511175150323,21.451032456572786,69.37716072888693,43.550240971183584,61.000120379197114,27.001701687985413,8.701027080098944,39.584934693894695,43.48625518929666,61.68409077836863,16.823763715666487,83.14557283081618,29.40755978133856,23.353366100107763,49.20365630027836,26.34065528605869,33.85677233108413,79.02785079474918,35.9436859198121,30.279822465868946,16.138412296296067,65.64418383788801,20.292874855278363,72.74512145782987,82.76833304506138,93.18555697397336,57.28788823533559,26.114492446417557,76.11369365005558,75.74562935196627,46.9268859357508,80.14103770597615,83.41887706178944,56.74495325321657,24.043750698029584,34.87945171998169,81.42263040177019,2.54583634852497,21.04010193983669,41.666460389064035,7.220533287908655,46.16508100832583,62.31683572324505,18.059236745015006,52.181355761921225,33.167899381754786,72.74807648209911,13.295672480861572,66.30512265668003,67.79175098806718,69.3338124959079,84.2071582463584,36.52505315704862,19.502449364804626,71.10824190182335,63.26790150790352,57.2362041154682,82.43343625839479,4.7048852070697444,51.53051470050282,42.64872905941698,51.60374302173806,56.377221430432144,10.22479328398834,18.46002353398592,84.37612025181423,67.56118489835457,91.57916249403027,25.190818462420165,38.73981855663799,82.89026835768631,53.20469868642542,17.6819070532318,16.334557996383012,41.09422629974782,62.75854138516565,60.47191068179833,15.86777335533335,37.590744390480324,21.45462866257898,22.22159211320456,53.6215650802106,47.42174477745478,89.24677675613702,71.57013260983535,57.647955062010595,19.83295819106196,12.934640206241003,29.78903366474181,12.958648066173591,60.54318614209075,21.945194925433235,35.79850722991689,41.50478692258713,67.8233689726151,36.09103787770937,43.84491932820802,52.64653390677255,79.436242129949,94.79677263779091,53.719427448615484,49.51213457540746,67.59514207563771,10.921929332583842,55.957210606236366,27.26066757286336,85.68622386419537,48.2193689536725,40.43176806657907,58.67531047659341,48.66812468093584,12.844590510753662,27.061640458850746,53.46905324845162,55.94658530853941,40.06821689320515,24.06911239636566,91.15952422203691,48.753308800229064,47.3890123939641,70.5064392468137,33.05294032108866,35.78395847028881,54.20682198422899,47.13720570688723,36.032069159972586,31.341908765108716,51.060950377216265,11.20489858303301,44.41262868771934],"b":[18.332674570874087,17.544133655271835,20.139492207506017,26.3693069141247,22.586195469529407,19.170923641456273,17.103222637793777,22.505622209265557,20.729939892945293,5.003104039656612,26.25419781515287,20.322970936915514,27.748586935552563,27.75249365086742,30.89225091686011,23.585623150902705,20.262943308304035,13.071504106327158,26.004556303691274,9.950535443991221,24.073281851352732,16.746944928802602,24.168414516111014,29.036649760578015,14.621257425597168,20.686488133597706,16.358503174665152,15.93323543725336,31.958138607108186,11.88578651942392,32.280621949864994,7.962342223412544,21.873309587706423,31.356753784201413,17.516477220317462,1.3265328261660736,14.876360266309563,20.71996088609087,13.582203499718823,22.771967679333812,13.390605588281737,22.666662131595267,20.444306285672855,10.079725435089202,27.659835499314994,17.852269716801995,18.063886721463987,27.65948758332692,6.790563384153749,28.107557639000554,19.116440848873868,20.46825145459437,12.008329528679447,14.111113354943159,10.944291003121187,23.2261317327983,18.034911118353808,23.017310975394466,39.19651033934831,30.75840998015858,16.267224736832357,24.67515746090656,25.9854461598832,22.79188244516918,18.668001647236682,15.416555570578527,26.481660978478153,29.767665685340425,15.921015815745744,15.033460187191174,23.053937856670373,29.887133094110823,15.061041311811255,30.20169696231016,29.019664169709035,32.144247213633435,24.70353470746576,13.994615369872427,11.460724698779607,19.653620804357516,9.933757950502553,13.698663001335444,26.239078608087233,18.189790204167995,23.670290282355975,9.982862067454784,23.979052456635614,33.27595007715167,9.315522230728472,10.165275571479096,15.629470022143511,14.223490758466127,21.218708706977402,17.416581287541288,16.77036838456937,29.368052056159595,23.007283317430336,9.20887513828907,35.55645237119096,31.907714274138065,31.928380673589597,19.405051067649097,11.321171793858076,30.8316687287914,17.240096991055893,20.362080577147275,3.212014995630983,15.448873065649781,33.09810443240744,31.27648241745037,21.298858733043453,23.012373952518868,24.292628315936952,4.5621186322665475,12.172115752222199,11.948448159674506,16.17432183172509,20.059923244149957,25.369489325548376,14.333748777485491,4.951078461236458,11.287006293061026,20.700422347386514,24.45194481505188,14.972857969107185,25.520768270870914,18.365344388254307,0.5755532559215437,17.685913504775154,35.74655431790272,29.594549064851286,30.91931828155645,27.625587195132635,27.360633866925518,19.019256489490072,24.91134125688695,9.417358937621142,0.8403863523032529,30.526787872506617,17.318810939120883,7.661153300007477,20.510669442162435,5.3071431460491825,12.048640451702912,25.83689444083086,23.094462750766738,6.277171971079247,27.850288548609647,20.91302087633815,27.16262076727756,22.208877627366775,9.507888304175282,27.306248119214096,25.803838943205495,37.282819356268654,9.896270443786062,23.458758757721228,16.146617855048618,7.842468121233477,12.184058373231487,8.817501975862347,23.678257490638046,28.644377211073145,30.245765024178475,8.559519428214145,9.670081484075338,26.708313703681235,16.881565180688472,20.094502461708235,19.575286364917943,25.410464320035274,22.888222802861687,25.623861496122142,16.18976560193298,24.330041965176896,20.80435758879108,6.740128567513248,19.6670036469407,34.627190534280636,25.666556351936983,14.352190832339407,12.76488046438487,22.004824008547402,29.66839307772337,14.799953281782468,31.1321429642582,21.36529379841306,27.461073461496877,29.379321959743457,15.143687818130571,19.897542674091596,16.995162933753768,15.859965454756964,22.891838165334473,18.62499834628573,26.15162237157843,30.704007406908318,22.61831281209455,23.801248279227398,28.902252652340977,19.717659751243563,19.206003046747075,12.02079332526431,31.924018981069807,19.81033571265581,20.619339736626202,11.29874413307331,17.555251292507734,10.748166910379418,31.27271264939386,35.063170201885384,17.721754720332275,4.853339624755928,6.509823474224969,4.2801540497776,34.61587316770046,13.472057707893764,23.56743864696771,7.554038008119592,17.017235824256865,29.094918709991774,15.143261050060337,12.544244625681937,25.812136391035885,23.349133027643038,20.387804310522423,22.012827933103374,18.692059638784215,15.302866647838165,12.379942713320187,7.007176832200557,34.90079407800857,21.43170093789442,20.495027450780196,12.663439694347282,27.738612741739765,20.39005454267984,32.735279914085815,17.03538860991998,23.927812198050965,11.447780766812276,9.173435324456296,7.29534692042789,19.035316270980246,16.76044277096397,8.914138646839348,22.780006708143596,21.71137167207325,5.126277213845887,4.756024760311313,3.3968362409575192,8.357210977632455,24.6115488908446,15.846367722928445,15.26024398359008,18.96291057089008,14.50331467785091,17.829341688305774,6.1227326119313075,25.74654529464383,38.14004499437284,9.130887570426914,16.833073947146993,17.598820050736485,26.40765879090617,36.110641344272935,17.20674561165879,23.736363409630272,21.69408334805403,8.348281797396941,18.978706536828902,26.03697331295266,22.903524456823643,18.893665646799654,18.784507098477967,15.043167070101143,7.247510906864787,27.96103618863323,18.142593827778676,17.424883141602127,25.59833657727287,29.851265555549602,11.637273494393877,12.038860224524193,12.729865622036073,19.532511693518213,12.061754715422106,12.532084831739201,21.82140986313536,11.457709248524898,23.904818117083614,11.838176740736236,12.399062019813027,22.227411979096043,26.35785209063166,22.65320538713273,11.054914833580685,27.18291916624098,28.891365231550967,22.176519804116573,35.71114128913173,20.09543927480614,3.969950162879896,2.879103310590163,17.312544417105755,27.506855069767035,15.599993128951771,23.33851852314939,14.046388125372703,33.11612816315911,15.224887787764267,28.95244297392503,13.79060662294001,4.114298470255275,13.428047592371286,17.20701760977923,20.65482617745603,14.57035849410412,21.4687219097634,14.26768864434047,8.187164434319003,32.865927552044745,24.02335878022909,18.1435872982918,18.56346406578097,6.460400812641507,27.81462755813085,23.48192231442328,23.495530201615466,17.366060119297483,26.743985323835435,12.027571874171059,21.69311722884077,21.367770041489713,18.866063428049188,38.703024251861976,8.548517061908708,21.936235310650527,25.712051154784024,5.222751322817438,32.96176045916833,22.38509198658191,17.975508520214255,6.137582884034174,30.87297104733303,24.656958208097905,17.237243244333165,16.566776797207066,14.072780129514886,13.913177957737712,27.959285562333168,30.339808832573773,16.41021240103731,22.351419157986196,1.3285179335650588,23.112725638373224,27.212055986501667,12.516847417274086,4.624252779315681,27.101082336443703,15.708910463761038,4.606361864524198,14.713076037632533,16.819082581915023,35.07613788376475,28.927690092644852,25.370794986386592,30.64774460631115,14.282667364025038,19.215070551940535,31.743296748335634,36.55920271307046,26.450202101155305,12.03098472901491,29.2550449394831,15.538289641583818,12.951039029628179,16.88957532797474,9.7039765551553,10.245343793802778,25.21295590660326,5.76388595118023,2.483950366561296,24.036450361659067,23.134526656001746,15.01340286158424,21.878572163014468,21.06311810943413,2.8545669802260765,9.512349890194294,17.934428041450715,8.529549564067015,15.798580615634048,28.57876287229312,17.26051485590617,29.54698271372871,23.044032608701297,25.09099407206896,12.09242866060172,18.58379390594009,19.283988773333757,31.293658002890666,13.882908847358038,3.41961270839763,6.018396572396378,14.96523870202681,12.282163869905439,34.45694471161076,13.252153216385704,13.710994209128117,29.170137661637305,29.954331209622183,19.594321312961377,6.9146883292649175,35.04601975436876,23.652477508060727,5.929020050052798,28.427261900123185,16.804031443104854,17.979496250817878,10.614327565695213,10.449194492282512,13.124613441791361,29.549103520457727,33.761231431449325,9.578565624157282,27.535348656299675,21.595036085594437,8.636864614661516,27.169687019417776,7.928595991516492,24.783533130079892,22.62028511547247,24.27338498722358,13.230053248875294,25.836887141719657,23.07005788662145,26.974641638226633,9.517551224466786,22.983517998754266,18.23567517843043,9.996218530689763,13.797395256249395,24.808395519168336,29.014796275936266,22.7525293878392,20.393943018310175,25.1750035291506,28.242913553368002,17.07245211017748,6.015583838172991,6.607473178834624,34.56248738130232,31.862452452201435,31.94698648512098,9.438295429027237,25.564956349428797,23.44707779593687,16.017895635757725,20.789764623671815,14.02073420572349,19.7714244047137,11.688471521960405,13.449594612598833,33.80332046498883,27.208837182502926,29.51573569782978,15.575707798403393,22.638784974547033,32.51997648785931,20.998220115445996,16.66935959699479,12.323796541617721,24.529669319823906,27.467878931842648,21.9270222841565,26.628717141815944,18.737394761000445,17.832584491446745,21.997618589694742,32.790260576966745,27.718639314438906,16.90662346544179,25.222551075683114,21.216917612402447,20.209401531885064,20.29224911977088,21.24657233859648,21.423370180047037,16.36033021506116,16.399034319812742,30.846662318912518,12.956346648062226,16.64308609113954,33.397393227441384,30.18017371726702,12.937380301659696,26.60512343411794,34.4627386362418,10.111095008234074,23.788375774871284,16.07364769730305,26.780630414918516,27.19114333520236,28.093836404350053,13.81378384641656,23.933756013194444,30.723763088750182,36.19128268171243,21.959983563791273,15.747092740952757,21.21977255884551,16.128651174539275,25.18758074605918,29.13999290228316,20.381583039253805,4.588647148899554,30.432931398596935,6.4017130756026,19.037947754805337,19.537910904385235,16.038026524826652,24.31793790962081,28.099236405769656,17.852922978674698,10.717831264286882,25.326687772377817,36.486920783814156,28.275548036218428,38.92321893424953,18.870815003684328,17.55626711848264,21.015754283396983,9.562748957788703,3.6779838051064484,28.129953207205823,2.104960212809859,13.766894224760968,12.907240059906213,10.24004761656685,33.95803890791788,12.181468241664746,17.902344887628132,18.78333737834972,8.344812545896394,12.197831039416537,5.089734371539363,1.553945963718042,18.287655416394255,17.649264545358246,9.046483443276113,17.487570024021004,20.98380748065071,27.645697676238527,31.79770501301841,20.26591809156963,13.21440455567474,6.241340200469727,9.555223347203613,21.3169130170348,22.857416417000685,14.562089324843903,31.067543026434553,33.6075477329459,6.0512072258850935,21.701210494340014,10.910813578100434,27.521460540146386,29.811590570380247,27.658925471591374,22.698337164214102,16.233121778487988,13.99788924332075,15.930468262620096,10.517753883979504,10.046034075190743,31.405338169733675,27.16695546404727,21.192894095248352,29.620737353678127,15.261518807100988,21.107752264510683,25.354499097109652,37.08507048485743,33.83291354065152,28.49095847959701,10.814391888632088,24.571975552775307,33.51586874978959,8.898708382948982,18.86418555796407,18.5352549680861,29.91787690739657,21.30864146376743,5.14047387052325,22.05725059452049,32.474179322346025,25.187031989564595,7.572841752310091,6.913672742787091,14.902436758167568,6.607659385447038,21.92475695624438,17.82509975711982,18.320112325996178,27.831346187835262,22.23982048184491,28.706922870103313,6.001145618875068,8.23745064227694,3.6618675854424065,18.811823240828915,22.508433212692964,2.765248597037493,10.00165058014015,36.466464846529,26.226166983118585,16.815816602740707,23.797784742237823,22.229835484671348,25.90170143359262,18.49295033113826,34.77924220862255,33.472776197742526,23.481346854087896,21.528726872309004,22.51844076578608,24.44213665739612,24.37277281728206,20.664523273801564,22.390247507344302,11.374377790578247,9.959300817221038,12.217669482491655,26.15490395752405,13.913538901850508,34.26097999916743,28.734180574009358,20.399653548979366,29.912544295926182,14.897133786029965,21.975869618885074,25.874982236589698,23.27364137086589,28.282037378589873,24.373585799946284,27.3802144100725,16.473558618622043,17.61713302374205,7.4739709152400025,30.033808939005507,33.17770074768258,17.40498313000493,28.405346700540207,32.91248953995826,25.11312810381571,6.834155178583838,20.59444485809204,18.385670740620466,11.580674476278858,17.643870074021205,30.879855122805658,38.00845859069593,36.035547128002605,16.83817469163308,36.787547143796104,20.791689250275226,16.616818762640122,28.47399918424917,28.037218393604753,14.177967494546131,26.76605975957844,15.408436232156157,23.226892560862883,2.850545696345832,19.542174170581198,15.301557338221636,13.587076546612007,18.81644620624057,15.065015863591888,35.35134646539349,11.163003810929272,22.495853367046067,7.5893117841594115,3.8840331720800947,23.172871430367813,19.71040770035453,36.96761989798439,15.310463173470016,15.305370665144,4.528949316101878,35.70232854821192,24.035163318176274,16.459205919887342,26.428316656725976,24.51850843583995,1.6630539219867302,16.551589316259605,25.34509592294691,9.3629705193208,15.328908179820354,30.540876922074695,31.95005309019598,28.72819579209095,35.141023642107896,9.54104333639329,15.181703151682,12.60371019695679,13.535057959235615,31.24242206434011,23.428414324423493,17.505013805510625,9.579499774929715,12.51375200318913,13.989579710418035,14.321277871362653,8.207447390532373,33.524373835298846,8.835561351770117,15.228040944210278,27.92965949188883,24.857182342491484,7.202946640682253,6.23158481858288,29.358637846632266,21.976174124699146,18.129536742627618,17.996588749542315,22.990105883973673,14.930481666335183,7.455307378501068,24.56685404426911,12.445104562804389,22.597547305416306,7.580583704057591,25.917043735252904,10.080551582861169,27.581720741238595,31.542291532952166,23.600000613534682,26.980261315151367,23.49195972076366,12.336696661026929,26.827355744273227,26.947423914432445,11.74643447857521,23.471748576743632,4.2868002220035395,22.19537987147778,38.34214883718769,20.472500101382096,20.914304078178436,14.200831658648454,16.79363789967617,28.732556433397754,17.900437736848936,11.617309713612741,32.62097356215148,18.79634444251935,11.723211402077188,17.93766144605214,26.41475262578626,21.910297940576484,25.11950205399261,15.303290213659873,12.624328994973553,25.578672721283276,23.88803916282943,18.62251220571405,21.724394130200753,19.06845339454618,30.99468778097543,20.039416740967454,18.817028238824655,23.695566277601632,26.66208753416811,16.10294830503904,7.157513120498087,26.138069993430236,14.49936687069231,18.631247190132164,8.891697725807077,14.519643704900481,13.584702223016762,20.691820866375497,8.845591846266316,12.247199872739433,20.07027778584305,7.286692402825561,16.928234254242142,26.421069022439134,10.788274854613569,38.66917481626133,26.158731431237367,17.290796354585634,14.351524124761688,20.627149040132696,32.91359386816097,19.779214076584367,7.5978317636998005,23.117574175033834,2.9117797168815063,11.553242461479876,10.283891121993346,20.709712315261434,15.15529451988276,21.650750754711154,17.70473571877566,6.22825330129015,12.595143947641194,32.050398741698345,11.975262365893965,29.176417214901402,23.846616316986008,31.84980825809108,18.848161043377697,20.043880167014635,8.184826166130165,30.010255232618654,35.790808882867054,19.701956301620587,12.258718657316606,26.695698447606357,9.407661077637002,25.297378714348046,11.680279803649158,24.789646398550907,13.513110217308645,14.361725118795047,24.33696907237505,21.675605161796653,4.110030149643227,6.827789862488203,1.2869461301553464,19.092497999803363,27.189206602574405,31.22318202832761,14.87234902751538,16.82289438137188,2.2709661002406767,23.51148613662287,36.721971230167455,29.848950744767336,34.02244218624289,24.657448038963892,20.9768006703152,23.604403358851425,18.982173473392685,5.4729884462482215,14.009517551177373,7.545367176941689,28.772320069952045,33.95438924527581,28.30735817980949,12.49848968834252,8.400774716071595,13.79055843121809,16.741284467988848,15.864517290313005,26.742690141770787,24.47634103232013,21.17788552114323,4.473816497138903,16.291713403732583,5.108172400338731,9.325036736254297,23.703667364397766,29.750377868090894,24.70797507120905,34.247133645590175,16.06089665226576,11.349492273998276,16.61756870236706,19.066986858792877,23.006080942492837,15.121146096043008,9.440542704044294,23.668543618749204,18.046438105093348,23.24708010865832,29.93244225173092,16.311361426192526,20.372423292158835,24.79892797430721,20.693628402984263,15.892037370264337,13.512876317962657,14.098803855504173,10.421100360990966,21.08211142172327,9.398801459434791,10.796398102594873,33.32727025228612,28.871248282090008,13.873290342564838,22.61747664488872,12.633157040323226,21.9597035744345,22.09638416565843,18.535350137793113,7.6143826583317775,15.758777922235923,19.929783558551073,12.456540230059883,24.67193053246035,17.99772569841657,35.430714966746706,17.63380153090481,6.278955779875899,26.0010910793785,14.538897056033328,22.63135260979982,26.66997909107687,11.778725822851296,33.02608835313444,5.025882823126762,13.328084951286687,11.649787496654259,15.310115723690359,19.747053674509356,19.2110503984225,19.94431439341368,13.808568980377395,19.50712388218628,8.463153642782832,27.060015648352273,26.99699271445414,18.032613731435468,17.38202140542012,8.512847235593846,13.662514139437535,22.712173199784136,17.91414995199332,12.923948920285401,10.53445729845285,25.38305861304365,36.29766502209179,20.62489559936655,22.280571584546244,14.815664943262425,17.14253310273204,14.254755951220739,24.405096673316827,18.674582947235464,3.7912043521797667,25.083799577485227,36.231745580788726,30.460096344708326,5.35266852461127,14.190215803049842,15.723276988874684,10.25038117706513,27.307746272488476,22.93452202162775,23.652083950239053,29.252984202256723,26.909689371967943,8.61874900928354,32.079675639391624,14.379445228210393,21.215898448214475,10.29384082649658,34.392898686259244,30.206845568652533,20.921710829239828,25.21257507107039,21.44175864797342,18.208181602786183,24.285931558441014,16.756719143132447,13.190252670642582,37.86982956688105,2.415955688028899,21.61898704466436,17.311392721670916,16.90830978169595,33.3013281668632,2.1649623903653525,23.670280533083663,30.946478092880835,15.227658745608394,15.581467487336504,22.587167841106876,13.927674407447963,26.525249878599993,21.932875022134933,25.279829869964363,35.90594609457233,19.88848466066821,13.99631862894697,20.183842876717748,27.473057897056727,10.07998028297231,18.153114781153942,16.003356056002588,14.741269233770119,19.831011597674134,24.60018680517801,20.400453186002075,22.47626018451002],"a":[3.2511718055165417,4.532057876255471,14.604781700184692,7.263655098424913,5.733259044509813,15.426417612618044,15.723510140730435,12.745857500163197,13.612419293477824,2.523949121063156,15.134404445755276,0.5942996102629827,16.297686179889762,15.91080418762206,12.195319893076828,7.60134465740788,7.3355430209797134,7.894504620486531,6.939956762981083,5.217588546363716,13.746103403768073,6.072851410553963,17.807147923128653,17.39089915895875,11.104525013619195,18.32873884874251,9.688144681997946,15.029833528682722,19.420360509546374,9.696838523666699,14.738539394823498,1.7693937379852942,6.622371098925446,14.750249748846297,8.706160905237294,0.438432961334283,12.221859162375273,9.814935382134529,3.8506250271706888,11.841633566753309,4.450292227284955,12.20027492146162,19.132968992061056,8.742782100253685,16.330709113608542,16.71883806204751,4.0285955544031715,15.148458427544057,0.6302661830186551,15.099115062632148,5.106366103894793,9.964342314645037,4.726616746369641,13.405713947178706,1.565239369554372,6.871532960629074,4.826363262414746,19.18240857315947,19.498335032923247,13.957791423743945,1.429320786475543,15.598613278266766,11.693685011928206,9.419523077607534,1.4032803045058673,6.9978252531054475,10.355253079240189,19.86357300906,5.743068293536702,7.867795714350856,10.78356982057696,10.525395106545563,7.138824445611713,15.308659539746268,14.98421548143984,12.595548561790192,6.343004205289748,11.450648959533765,8.990517410673453,0.7513789011367811,7.251282086945716,8.536476209466644,8.26119060996267,4.785193296758665,14.66712963764627,0.783129876750861,8.69430979718064,13.409868551994105,4.494540068975343,8.16058018377741,0.5414711913781067,12.192622006693213,8.214540939949071,2.349969854118261,14.230611976572206,16.704701367752147,13.626622219947988,2.5214160447564105,19.10184440007329,16.07833946403798,12.117116163397906,18.728590675641975,4.584726826184129,13.155226697626045,0.21341285050552994,12.11607134170508,0.43701174443590673,2.760361724707958,18.39033390738214,17.247323633105704,19.183325743881205,7.535637576746139,17.81547539898344,0.5733088314123069,7.6170193594040425,0.45494635549216955,4.882517243551221,2.1173067353587527,13.817866471727909,0.942702773723445,2.8766898677028907,6.353523376400765,3.7876532364889126,7.3352759825655856,4.002287077602595,12.760915745119963,2.330638849137805,0.2715346107051664,16.759315830802294,18.477388558936273,10.747292996472053,18.596858053815705,13.499057106297121,15.569863639963582,8.894370642091829,7.24566413708879,8.137247532746086,0.1390076086955938,16.361209080384526,10.593365175951469,7.222378207915301,2.4187066923402334,3.541810142459747,7.188455306072679,8.375795857039039,5.090367544288359,2.1824692532454115,16.527210260368896,14.128975557085885,16.91246852894644,16.220230485734213,3.6270004084451424,18.662999925498617,13.265158011219725,19.57567039045078,3.818537901209229,9.197018169458326,7.69057699339712,4.442335199935816,6.730010082836144,2.8919123206045683,5.347665177639094,13.948967843379165,19.83802948259505,2.0493372268259957,0.5508444550255742,7.415673434792063,16.794222311423592,5.246220662576659,13.013283160218037,17.436211711555437,17.998681946901858,14.148915391114244,12.116846888647125,4.9704346353321815,1.0295255735746123,4.214538210735563,4.881079663592285,19.2201352831728,6.027915857333959,0.775939075364569,6.189378430643386,17.76761478978265,19.118330970401594,1.8077442799892163,16.49503140652843,7.692421695168696,14.704626915698093,16.373375809330362,6.9009449587037075,5.347165982569844,3.1231286266868974,6.5662987782987425,15.413743250254,12.32245220011853,7.451841346159966,12.015953713385814,9.34207133282506,19.02446873106704,16.120383615349773,16.082729936169343,8.926218705394291,7.760847035062275,12.656898781825149,15.118137714967851,7.683490789470282,6.849084364954008,15.998976219694882,1.0414413902066721,17.082779143317616,18.54494249071239,12.779349427111573,1.3549950578895098,0.6837753272304781,3.5535371950807226,16.60411258814376,4.74413149652515,18.319295535662512,2.610046637934529,11.274894629564077,16.121155444651627,14.459667753581575,6.398645135263714,19.121190441853475,4.611271305177094,7.923110059833802,12.53136755702168,2.6865796607616144,0.9224049753289387,11.584322333467277,5.017925993494292,19.230952100438547,3.8638654268680828,15.783251302417911,2.6951101194431315,16.73389771961969,3.3486895317967935,14.777377498220794,6.645258511903553,9.324370528305174,1.5616811988184187,3.3626091329487418,0.3205762398597001,11.566077287298583,10.805194256917288,4.420767586178567,5.865732904396368,16.465767104028686,5.046968730556496,0.14409880483817084,1.806443615336386,6.306310906711481,14.112440690333084,11.308588346491755,5.371876061326186,15.446186255424479,9.292063158358502,12.207371081104338,0.7392125115132675,9.946524712119217,18.56665201444859,2.9451260719603667,15.057874379321646,7.577720907010508,9.095265875195624,19.756103782473527,4.7791964550480115,14.665707860051977,2.8867396279377378,3.9989113872953297,17.895482736141282,14.392446765803978,17.706302697263222,6.404547724885159,0.7726703216825692,14.21067512519247,3.968764302468597,12.996693249783814,3.669170018509722,8.409633122703184,11.322453960786634,12.579432442884041,5.462008921528776,2.6069852952649697,5.490869239202554,15.909678822754065,5.484180867402766,8.219136079526027,9.971141129138065,9.588631693645699,10.973950129191676,0.36309853445660956,7.589083230945701,14.519483289542716,11.76491845640661,8.469731915591709,5.193615103212679,12.66481532323304,8.966471868017063,8.859298778416669,17.25934284321781,4.726403204510796,2.2889166580184384,2.312620228414679,15.429600889731475,8.45421771598521,4.903046348342128,11.116290739375296,13.78616927165671,16.92617319323464,15.208745865526044,17.638965225057678,11.62211621907601,4.0848681952623345,3.1887112776322146,14.841986092280068,10.889561805266656,11.779881743880205,9.482968656106948,1.342033600289665,4.759479893150633,18.503397990322735,14.404448750353458,3.63000929433273,4.737764504710915,1.7876365682601003,14.197714485618217,8.717660078938092,12.36458007058284,13.653960467796175,19.96958081657596,5.817392862131303,16.938877477533634,5.234488712712433,8.733957325863173,19.45817466705109,4.519616465536167,2.930738359995284,9.93096322462998,3.806944152680436,17.91197808331201,12.871927830145488,13.006787720880734,5.314723209948262,15.882567093747193,5.404627832017246,12.187324945408076,7.23907232362786,9.302892932693542,13.160133208076598,19.875482184638354,17.298082364501028,0.825959162295562,4.909566191285077,0.7498623695077455,13.170035011185167,8.580087639051381,0.34920639664647535,0.9060778082233689,19.66127174123781,12.183111443962463,3.9336001951499844,5.344177439551241,2.9233022930896446,17.269846068622684,12.800086008297606,10.13368222542896,18.517173158988385,7.259934191028985,7.146231396265961,18.002700152605815,17.548016513959222,17.872732540565167,8.369713288921506,13.6770596102787,2.689736237089768,12.301204760913048,8.88602252012387,2.0131645065602477,0.569922580293607,7.883470154446077,2.522763264778347,2.301346219765783,13.906743482064513,13.51303671297067,12.282948358968056,8.256903871597675,10.699171780770351,0.943090098908197,6.3114866095571065,2.6963685379367908,6.991622747131276,4.091107745196161,13.487163155533569,2.095693685611244,13.708696515125766,14.518446356888894,9.181723030149659,2.260512686802043,18.40506240013863,15.920030614014248,15.687279099274605,8.298123933242909,0.2562159039241374,4.91853870229868,0.8169709146334236,10.356741507181027,14.670766433575722,12.295594491395242,3.082022830385047,14.7760004180385,15.252418638548821,12.740605719265577,6.390033585135959,19.968257285502574,19.8821316889467,1.2920127052681218,18.0411294281301,0.7721422823921786,7.075890288521918,1.5223087697523097,0.5928298464497939,2.2249917736732128,18.537834291799147,16.39759147391837,8.49876089577469,18.521037472608732,13.927911016368416,4.2175162734611105,12.148445045755913,6.90954073334475,15.132798454558852,2.660024123828215,4.926749214712958,2.0372923266518983,10.277973080989234,12.84730357181389,7.559169215462052,1.9498831590938925,7.302224427138491,17.0240822731297,4.999639140363925,4.653142848529197,16.072157977593427,16.88744434403981,15.336299351270366,15.71324155035211,6.293122038510575,12.33620358327105,7.724635277672509,4.174845997979895,1.6225774678176164,19.226284838676197,15.035058662125188,13.260395571281647,4.748031963394421,16.970183084070815,13.103753989073962,10.843019954621852,4.540795982079269,1.931909806638128,10.118309065648585,4.997931465383383,11.8909118156642,19.033807887262228,14.882652723702003,16.678589798068874,2.4176165102613068,19.56292518038619,13.976690457192955,15.033974874917511,15.489061434713634,1.8772407392719126,9.533319098359424,17.521595023039012,14.972745393040409,18.131456712983734,11.908019085286563,11.465649635371031,10.169938056105416,16.090300187309236,14.498655764356512,0.1274352194149575,19.40886432426773,3.680710874716815,1.1654969647589963,13.551796128278442,15.872169734823807,12.23212960127682,2.6263609311020186,0.5381294879779608,12.005991509447771,7.278962732503995,4.015459676676203,15.265700678515275,18.70066830912663,9.913273079853502,8.907043789474582,16.78045647792624,4.686507068095995,15.27188853127996,9.112802640015909,17.439619931567027,19.23855162937197,19.605728155656532,8.000461339467577,6.299387428186143,13.04884688724028,17.326176735609906,14.870151865604594,7.69085130681205,18.706703679937952,8.401574938156426,16.617780319631624,12.375774597314804,12.53692204352367,1.8265836394233093,16.945422371572725,3.5908566588123403,16.390839025371516,9.09310355505609,14.864637963226395,4.66027627746886,15.470663848175885,16.298917757751493,2.402199092176196,12.798270923817437,19.454719408862935,16.856152846973565,19.23127312231806,7.78083046508923,14.306785757220343,2.904375088407014,2.355416172569429,3.582192701093727,13.661711899331221,0.9993340400250617,4.370919998630671,5.183641568113697,3.5523215423181176,19.698212392221343,7.598553845361269,1.2121172491530219,12.0821762496521,7.507832456773547,10.472073143226602,4.901794897371103,1.3107963258429933,13.066843715345243,10.434056713363887,0.6722488548119587,6.170381472763675,12.232135952751776,12.734577433747996,16.85656192375735,15.941314323578663,0.8486934736125695,6.2126552315668615,1.4942784505553686,10.648430438457247,6.849614276880702,8.85314729608195,12.58673505238615,19.28111182498491,5.995390906776321,16.285305049274356,6.165258866358845,8.6994537330582,16.125007678349558,7.890375764757236,6.33805874049763,13.944256223119087,12.288031171875303,13.864966624210439,9.998243816055759,4.785085538674845,17.6336621551541,19.18833501505211,4.790801089651562,10.359809936274154,10.186915683204472,13.267865722455943,14.418692911813897,17.8587331452284,16.542699771020462,18.7272143374293,6.352965529236192,4.983223283143903,15.370499849911607,4.021955225891749,4.523935032818498,12.493904186130042,10.373598350840702,4.76915281411872,1.5842552114382658,2.0814967129176543,19.92375529053937,19.96178899119339,1.2758186723856202,2.474946137336782,6.794955591055447,4.170062496669202,2.9560424880976033,3.619714322559453,2.675650811559911,8.906134104814246,15.046661294173017,9.016895889503488,1.345555167051975,6.210816616374029,3.30620125637215,6.577212997850199,17.300527708781118,1.9774215053977873,1.9314104783866304,19.351338741207588,19.931110584768554,11.46623356818775,18.90717340372431,7.742802119512064,18.06399894072394,0.395873354954821,18.83849189345096,14.370102291468246,7.713620343855414,6.486517027580825,19.823164126910694,15.048442471110995,10.59445112411288,8.726600739067614,8.544409685522911,1.6728529239519752,1.323845722166186,2.9102674430689746,15.689206131203184,10.786931089891226,16.068997664583776,14.386587857003006,17.799275251543698,11.286191287785563,6.277118177461993,18.942818772721335,17.274587649925685,15.677899212222698,12.24582502078444,14.519770922058196,18.775585892236645,7.893009957357644,14.377997160539838,0.9546306263144722,13.897997181304692,18.251062180591763,14.038281809144092,14.659504370708841,14.405648225420386,13.553071442737581,5.55965402566359,4.655074462733908,4.801527604157432,2.025163243426187,13.604533018800954,12.30485531507496,18.267892727518785,19.43587113231528,4.419935466535669,18.638153515851805,5.8802855073068905,15.515821401751326,9.203698279015505,19.465434292907766,5.291512799545974,18.298280780115846,7.763636233183715,14.303114172970552,1.8556879802690895,5.579179915232992,8.861627245504744,2.1284254725159046,14.627711314067241,6.9494829751563625,18.9796489754676,9.277225969777664,10.71095003622553,2.143808734471895,2.304769492745442,10.919690567438005,6.559740714657676,18.47702411485055,11.574723214841187,9.566875153334,3.4391208351390246,18.22791283545007,7.382720382832946,2.1825908881719336,12.712245110683028,17.147906713206893,0.2645557125410347,15.251692233751037,17.134907424701456,1.3812739880718272,5.13808127567299,17.941758910814936,15.70558306573747,9.775706272122203,18.130622812631284,2.670433212257217,5.948341726575785,3.3303517820755557,10.783979859615789,18.445177195146822,6.387407682163917,3.1909545046197696,8.96834273987106,9.917301582177597,5.778805848301638,3.365718900288317,0.018352787688513672,15.610177579722006,1.6467116053166864,4.291892498937719,15.108597164020882,16.574351233855445,6.139514868510436,2.496303914265212,14.826009821091759,17.351009404619703,7.2757181663738635,13.856885774323565,2.9988362835342697,12.707897161659417,2.5094993253932696,16.669039613576416,8.111297336634227,16.051640214449563,5.137549098301255,13.784500595396661,7.008169496849872,19.017840790605092,14.262836246861475,14.514722628937275,7.1814252621120955,7.714459874601451,2.4505412177221952,10.765477791519116,10.861653418848842,8.131725233956693,5.971956810084635,2.163981949821334,9.923116334254537,19.53686968409133,6.682290540916056,1.0614678659842758,1.3423712036455893,10.824990521815995,16.161094086795927,12.047418658333884,5.359521632817246,13.324805271393497,4.265195034478859,3.6471752107456457,3.6730017022358563,17.91186700811258,18.181124122275875,17.00277878700454,3.5582360519686684,1.396806235342618,8.790744977531562,8.902249212009066,12.368339901424088,6.124496588014345,3.4818898935344,15.817714437607751,15.39072227156538,3.5516994155771586,8.177145889992797,7.658236160712,15.30915338307877,1.956204395554244,12.291154680632497,12.9860899841036,0.14155083631217646,3.596644537140836,5.45878885867447,4.647249051512556,13.672316956790977,8.785001877476471,8.009529100423872,1.701897730089077,6.772699249757692,7.513720183246391,17.24353591043558,8.798868104141192,19.97751312824935,14.999312393620837,17.1403206594534,0.7969391055320996,6.18239350876399,16.37009568202251,8.247898102179603,7.286311023916694,11.456847718704019,2.118760871095553,11.027746723965745,2.5124786383292452,11.792130092736448,1.9678220832419502,16.913639525268735,4.851568528085632,5.6821187222425795,11.821605439601628,17.009567635376936,4.45509818228365,17.059835908648502,8.34874486959487,15.732603327065977,12.936854322000242,0.10452608495031601,0.37025728730298635,17.701410611519105,16.79038587656523,5.352563516640019,6.881661671754689,15.25147010929591,8.341495109503882,7.540554831401707,8.419702039796562,11.915913947358332,4.544981701421902,11.102015106990812,19.22275751371728,7.593850611926616,0.7025094187464243,4.59971493518359,1.0353367585761708,10.110214292265312,12.148231067917132,14.90301415430331,11.81088459590879,14.029165121551653,1.4612891774080072,8.837479802406323,17.031344327014843,18.38946621363514,19.444487748714817,5.218828066677288,7.988573545431441,3.7156098960140715,11.186397451070453,1.2268191607166123,4.03739746539487,0.056666775836275995,18.428641602249932,17.427579977241937,15.868695131979425,0.8967575240351611,1.0047849914387186,7.5973603327086,15.513901026552816,13.239571039839726,19.244207696650122,14.25272482304107,19.70469493998334,1.6949145438019242,15.773814944843885,0.9574934875249053,1.29856114063152,11.456085390101967,10.281119440275983,17.261713159331705,18.85700721556375,9.14962419884613,11.02915028443308,14.666732427442675,13.31783381325815,5.7516185645397755,10.786739049720158,2.0192400305832603,12.441913851849025,17.97391856159148,17.38800917830037,14.182426746869773,7.455913326789192,1.1348635707083865,19.700275989022277,18.126354322709194,11.906419035262656,8.35889412438708,0.5560747117074172,9.788133474072893,6.585979016269565,7.139302901500386,5.714718535984291,18.834301616628736,17.42202121203625,5.675385078696413,16.66550239005181,2.582999772616028,6.113201862078941,2.2489661776656833,1.8663195301736524,7.508054615344206,1.940733908050598,14.186673334586946,7.982155745134731,18.886885654323006,11.377052918290431,15.487259732893758,1.3525221506770269,5.877993450812369,15.709143149712759,3.9301255301879934,14.382971591648651,17.49130143632072,7.600050696673621,16.727656144774233,1.6325375074034554,8.917693849423953,2.6617641004802595,0.3447626288712735,4.2692173524862564,10.41139618551532,5.711522902304229,0.48745935106261573,9.027800725250472,1.365949998661482,16.675463153499962,19.17597948448952,13.156613569586145,1.0949020984196034,3.4876545522960667,10.183865251545118,5.373661262271416,12.482488303308493,6.14917926731259,4.195911959669387,16.093438390129577,19.823805939294722,12.090861030105575,15.605137254469735,1.2736308905462135,7.417967177733105,6.701344769408593,15.878350796738907,5.2663474413206846,1.1166828508062832,11.485633363514317,18.106494108137362,11.649317653393316,2.100898250981027,9.527707659801163,10.543534779994722,8.689747331803495,11.587169891106338,10.212453529410745,19.868684637996804,10.79996841402615,11.254100276521065,6.757231370959844,17.825133691503932,9.873504208080274,9.37820316926671,9.486452189963494,19.927721693101233,14.015178545835978,6.4227232266560685,19.349266419307703,16.68485459613169,6.046745650165786,14.666705788684054,15.957145773001017,6.602116616870792,18.189499173579357,2.2947526942078644,6.439257895742374,4.787562961415595,14.227649897449957,19.250818970526517,1.7616309166298771,11.019895829311936,14.217041257971811,8.407839131631247,0.9481732032084977,6.412402397326815,3.0951131757761274,9.271814664881784,7.292031734471718,9.458138947921316,16.206902008264375,14.807746203512572,3.8114367379405456,16.870408614133133,18.681877954475926,8.075922830034958,2.4341526929617885,0.4897470695878381,7.8313537553500545,19.751406688579717,7.979096210392123,9.312478599998212,18.936808723363573]}
},{}],80:[function(require,module,exports){
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
	t.equal( typeof factory, 'function', 'main export is a function' );
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

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `-infinity` when provided `-infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0, 1.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -infinity' );

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
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 30.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/logcdf/test/test.factory.js")
},{"./../lib/factory.js":74,"./fixtures/julia/large_range.json":77,"./fixtures/julia/medium_range.json":78,"./fixtures/julia/small_range.json":79,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":47,"@stdlib/constants/float64/pinf":48,"@stdlib/math/base/assert/is-nan":52,"@stdlib/math/base/special/abs":54,"tape":200}],81:[function(require,module,exports){
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
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logcdf` functions', function test( t ) {
	t.equal( typeof logcdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/logcdf/test/test.js")
},{"./../lib":75,"tape":200}],82:[function(require,module,exports){
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
	t.equal( typeof logcdf, 'function', 'main export is a function' );
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

tape( 'if provided `-infinity` for `x` and a valid `a` and `b`, the function returns `-infinity`', function test( t ) {
	var y = logcdf( NINF, 0.5, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );
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
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 30.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/logcdf/test/test.logcdf.js")
},{"./../lib":75,"./fixtures/julia/large_range.json":77,"./fixtures/julia/medium_range.json":78,"./fixtures/julia/small_range.json":79,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":47,"@stdlib/constants/float64/pinf":48,"@stdlib/math/base/assert/is-nan":52,"@stdlib/math/base/special/abs":54,"tape":200}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var constantFunction = require( './constant_function.js' );


// EXPORTS //

module.exports = constantFunction;

},{"./constant_function.js":83}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var setNonEnumerableReadOnly = require( './main.js' );


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

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

},{"@stdlib/utils/define-property":90}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{"./define_property.js":88}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":87,"./has_define_property_support.js":89,"./polyfill.js":91}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		throw new TypeError( 'invalid argument. First argument must be an object. Value: `' + obj + '`.' );
	}
	if ( typeof descriptor !== 'object' || descriptor === null || toStr.call( descriptor ) === '[object Array]' ) {
		throw new TypeError( 'invalid argument. Property descriptor must be an object. Value: `' + descriptor + '`.' );
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

},{}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":93,"./polyfill.js":94,"@stdlib/assert/has-tostringtag-support":20}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":95}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":95,"./tostringtag.js":96,"@stdlib/assert/has-own-property":16}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){

},{}],99:[function(require,module,exports){
arguments[4][98][0].apply(exports,arguments)
},{"dup":98}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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
},{"_process":192}],102:[function(require,module,exports){
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

},{"events":100,"inherits":187,"readable-stream/lib/_stream_duplex.js":104,"readable-stream/lib/_stream_passthrough.js":105,"readable-stream/lib/_stream_readable.js":106,"readable-stream/lib/_stream_transform.js":107,"readable-stream/lib/_stream_writable.js":108,"readable-stream/lib/internal/streams/end-of-stream.js":112,"readable-stream/lib/internal/streams/pipeline.js":114}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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
},{"./_stream_readable":106,"./_stream_writable":108,"_process":192,"inherits":187}],105:[function(require,module,exports){
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
},{"./_stream_transform":107,"inherits":187}],106:[function(require,module,exports){
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
},{"../errors":103,"./_stream_duplex":104,"./internal/streams/async_iterator":109,"./internal/streams/buffer_list":110,"./internal/streams/destroy":111,"./internal/streams/from":113,"./internal/streams/state":115,"./internal/streams/stream":116,"_process":192,"buffer":117,"events":100,"inherits":187,"string_decoder/":199,"util":98}],107:[function(require,module,exports){
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
},{"../errors":103,"./_stream_duplex":104,"inherits":187}],108:[function(require,module,exports){
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
},{"../errors":103,"./_stream_duplex":104,"./internal/streams/destroy":111,"./internal/streams/state":115,"./internal/streams/stream":116,"_process":192,"buffer":117,"inherits":187,"util-deprecate":208}],109:[function(require,module,exports){
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
},{"./end-of-stream":112,"_process":192}],110:[function(require,module,exports){
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
},{"buffer":117,"util":98}],111:[function(require,module,exports){
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
},{"_process":192}],112:[function(require,module,exports){
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
},{"../../../errors":103}],113:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],114:[function(require,module,exports){
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
},{"../../../errors":103,"./end-of-stream":112}],115:[function(require,module,exports){
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
},{"../../../errors":103}],116:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":100}],117:[function(require,module,exports){
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
},{"base64-js":97,"buffer":117,"ieee754":186}],118:[function(require,module,exports){
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

},{"./":119,"get-intrinsic":182}],119:[function(require,module,exports){
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

},{"function-bind":181,"get-intrinsic":182}],120:[function(require,module,exports){
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

},{"./lib/is_arguments.js":121,"./lib/keys.js":122}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],123:[function(require,module,exports){
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

},{"object-keys":190}],124:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],125:[function(require,module,exports){
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

},{"./ToNumber":155,"./ToPrimitive":157,"./Type":162}],126:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/isNaN":172,"../helpers/isPrefixOf":173,"./ToNumber":155,"./ToPrimitive":157,"./Type":162,"get-intrinsic":182}],127:[function(require,module,exports){
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

},{"get-intrinsic":182}],128:[function(require,module,exports){
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

},{"./DayWithinYear":131,"./InLeapYear":135,"./MonthFromTime":145,"get-intrinsic":182}],129:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":177,"./floor":166}],130:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":166}],131:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":129,"./DayFromYear":130,"./YearFromTime":164}],132:[function(require,module,exports){
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

},{"./modulo":167}],133:[function(require,module,exports){
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

},{"../helpers/assertRecord":170,"./IsAccessorDescriptor":136,"./IsDataDescriptor":138,"./Type":162,"get-intrinsic":182}],134:[function(require,module,exports){
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

},{"../helpers/timeConstants":177,"./floor":166,"./modulo":167}],135:[function(require,module,exports){
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

},{"./DaysInYear":132,"./YearFromTime":164,"get-intrinsic":182}],136:[function(require,module,exports){
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

},{"../helpers/assertRecord":170,"./Type":162,"has":185}],137:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":188}],138:[function(require,module,exports){
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

},{"../helpers/assertRecord":170,"./Type":162,"has":185}],139:[function(require,module,exports){
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

},{"../helpers/assertRecord":170,"./IsAccessorDescriptor":136,"./IsDataDescriptor":138,"./Type":162}],140:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":174,"./IsAccessorDescriptor":136,"./IsDataDescriptor":138,"./Type":162}],141:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/timeConstants":177}],142:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"./DateFromTime":128,"./Day":129,"./MonthFromTime":145,"./ToInteger":154,"./YearFromTime":164,"./floor":166,"./modulo":167,"get-intrinsic":182}],143:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/timeConstants":177,"./ToInteger":154}],144:[function(require,module,exports){
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

},{"../helpers/timeConstants":177,"./floor":166,"./modulo":167}],145:[function(require,module,exports){
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

},{"./DayWithinYear":131,"./InLeapYear":135}],146:[function(require,module,exports){
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

},{"../helpers/isNaN":172}],147:[function(require,module,exports){
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

},{"../helpers/timeConstants":177,"./floor":166,"./modulo":167}],148:[function(require,module,exports){
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

},{"./Type":162}],149:[function(require,module,exports){
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


},{"../helpers/isFinite":171,"./ToNumber":155,"./abs":165,"get-intrinsic":182}],150:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":177,"./DayFromYear":130}],151:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":177,"./modulo":167}],152:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],153:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":155}],154:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/isNaN":172,"../helpers/sign":176,"./ToNumber":155,"./abs":165,"./floor":166}],155:[function(require,module,exports){
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

},{"./ToPrimitive":157}],156:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":127,"get-intrinsic":182}],157:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":178}],158:[function(require,module,exports){
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

},{"./IsCallable":137,"./ToBoolean":152,"./Type":162,"get-intrinsic":182,"has":185}],159:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":182}],160:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/isNaN":172,"../helpers/sign":176,"./ToNumber":155,"./abs":165,"./floor":166,"./modulo":167}],161:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":155}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":129,"./modulo":167}],164:[function(require,module,exports){
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

},{"call-bind/callBound":118,"get-intrinsic":182}],165:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":182}],166:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],167:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":175}],168:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":177,"./modulo":167}],169:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":125,"./5/AbstractRelationalComparison":126,"./5/CheckObjectCoercible":127,"./5/DateFromTime":128,"./5/Day":129,"./5/DayFromYear":130,"./5/DayWithinYear":131,"./5/DaysInYear":132,"./5/FromPropertyDescriptor":133,"./5/HourFromTime":134,"./5/InLeapYear":135,"./5/IsAccessorDescriptor":136,"./5/IsCallable":137,"./5/IsDataDescriptor":138,"./5/IsGenericDescriptor":139,"./5/IsPropertyDescriptor":140,"./5/MakeDate":141,"./5/MakeDay":142,"./5/MakeTime":143,"./5/MinFromTime":144,"./5/MonthFromTime":145,"./5/SameValue":146,"./5/SecFromTime":147,"./5/StrictEqualityComparison":148,"./5/TimeClip":149,"./5/TimeFromYear":150,"./5/TimeWithinDay":151,"./5/ToBoolean":152,"./5/ToInt32":153,"./5/ToInteger":154,"./5/ToNumber":155,"./5/ToObject":156,"./5/ToPrimitive":157,"./5/ToPropertyDescriptor":158,"./5/ToString":159,"./5/ToUint16":160,"./5/ToUint32":161,"./5/Type":162,"./5/WeekDay":163,"./5/YearFromTime":164,"./5/abs":165,"./5/floor":166,"./5/modulo":167,"./5/msFromTime":168}],170:[function(require,module,exports){
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

},{"get-intrinsic":182,"has":185}],171:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],172:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],173:[function(require,module,exports){
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

},{"call-bind/callBound":118}],174:[function(require,module,exports){
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

},{"get-intrinsic":182,"has":185}],175:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],176:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
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

},{"./helpers/isPrimitive":179,"is-callable":188}],179:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":180}],182:[function(require,module,exports){
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

},{"function-bind":181,"has":185,"has-symbols":183}],183:[function(require,module,exports){
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

},{"./shams":184}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":181}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){
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

},{"./isArguments":191}],190:[function(require,module,exports){
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

},{"./implementation":189,"./isArguments":191}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
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

},{}],193:[function(require,module,exports){
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
},{"_process":192,"through":206,"timers":207}],194:[function(require,module,exports){
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

},{"buffer":117}],195:[function(require,module,exports){
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

},{"es-abstract/es5":169,"function-bind":181}],196:[function(require,module,exports){
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

},{"./implementation":195,"./polyfill":197,"./shim":198,"define-properties":123,"function-bind":181}],197:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":195}],198:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":197,"define-properties":123}],199:[function(require,module,exports){
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
},{"safe-buffer":194}],200:[function(require,module,exports){
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
},{"./lib/default_stream":201,"./lib/results":203,"./lib/test":204,"_process":192,"defined":124,"through":206,"timers":207}],201:[function(require,module,exports){
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
},{"_process":192,"fs":99,"through":206}],202:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":192,"timers":207}],203:[function(require,module,exports){
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
},{"_process":192,"events":100,"function-bind":181,"has":185,"inherits":187,"object-inspect":205,"resumer":193,"through":206,"timers":207}],204:[function(require,module,exports){
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
},{"./next_tick":202,"deep-equal":120,"defined":124,"events":100,"has":185,"inherits":187,"path":101,"string.prototype.trim":196}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
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
},{"_process":192,"stream":102}],207:[function(require,module,exports){
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
},{"process/browser.js":192,"timers":207}],208:[function(require,module,exports){
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
},{}]},{},[80,81,82]);
