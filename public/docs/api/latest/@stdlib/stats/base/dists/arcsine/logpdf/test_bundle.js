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

},{"@stdlib/number/ctor":58}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ln.js":55}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":56,"./polyval_q.js":57,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":45,"@stdlib/math/base/assert/is-nan":50,"@stdlib/number/float64/base/get-high-word":61,"@stdlib/number/float64/base/set-high-word":64}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./number.js":59}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":62}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./high.js":60,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],63:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":60}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":63,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var LN_PI = require( '@stdlib/constants/float64/ln-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the probability density function (PDF) for an arcsine distribution with minimum support `a` and maximum support `b`.
*
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 0.0, 10.0 );
* var y = logpdf( 2.0 );
* // returns ~-2.531
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
	* Evaluates the logarithm of the probability density function (PDF) for an arcsine distribution.
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
		return -( LN_PI + ( ln( ( x-a ) * ( b-x ) ) / 2.0 ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ln-pi":44,"@stdlib/constants/float64/ninf":45,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/ln":54,"@stdlib/utils/constant-function":89}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Arcsine distribution logarithm of probability density function (PDF).
*
* @module @stdlib/stats/base/dists/arcsine/logpdf
*
* @example
* var logpdf = require( '@stdlib/stats/base/dists/arcsine/logpdf' );
*
* var y = logpdf( 3.0, 2.0, 6.0 );
* // returns ~-1.694
*
* var mylogPDF = logpdf.factory( 6.0, 7.0 );
* y = mylogPDF( 7.0 );
* // returns Infinity
*
* y = mylogPDF( 5.0 );
* // returns -Infinity
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":66,"./logpdf.js":68,"@stdlib/utils/define-nonenumerable-read-only-property":90}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var LN_PI = require( '@stdlib/constants/float64/ln-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Evaluates the logarithm of the probability density function (PDF) for an arcsine distribution with minimum support `a` and maximum support `b` at a value `x`.
*
* @param {number} x - input value
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 2.0, 0.0, 4.0 );
* // returns ~-1.838
*
* @example
* var y = logpdf( 5.0, 0.0, 4.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( 0.25, 0.0, 1.0 );
* // returns ~-0.308
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
	return -( LN_PI + ( ln( ( x-a ) * ( b-x ) ) / 2.0 ) );
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/float64/ln-pi":44,"@stdlib/constants/float64/ninf":45,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/ln":54}],69:[function(require,module,exports){
module.exports={"expected":[null,-3.5246005693518505,-3.6208002307339004,null,null,null,-4.477194428772976,-4.7487242614558145,-4.5001404008227395,null,-4.030672726059587,null,-3.8852216065092193,null,-4.791428862941064,-3.7101144717534558,null,-4.637166852548789,null,-3.718079791241082,null,null,-3.7077900927338465,-2.6029192538166313,-4.1541883317768615,null,null,null,-4.346270402685843,null,null,-4.222626548683895,-4.413665002431088,null,-4.609716436704113,null,null,null,null,-4.29470039401663,null,-4.641119637613135,-3.8883045249900325,-3.7750284017151836,null,-4.080145642892649,null,null,null,null,null,-4.300643859905066,null,-4.3094455883558,null,null,-4.544637733007797,null,-4.230071150530034,null,-4.602236881958122,null,null,null,-4.566324172516608,-4.5742428591526405,-3.451087685193733,null,null,-4.46152657291148,-3.523205343201397,null,-3.958864500471946,null,null,null,null,null,-3.4318770047620797,-3.4704008771196655,null,-2.1340092306571803,null,-4.198195420556088,-4.212773825518988,null,null,null,-4.653418883630102,null,-4.807379080155442,null,null,null,null,-4.690413716441696,null,null,-4.495545641242993,null,null,null,-4.537110976922603,null,null,-4.536534805192911,-4.194359635519228,-4.023928721351837,-3.7863597792262293,null,null,null,null,-4.227918884777067,null,-4.379144568222091,null,-4.131123795373618,null,null,null,null,null,null,null,-4.184915801755939,null,null,null,null,null,null,null,null,null,-3.1511250840247573,null,null,null,-4.450782649306896,null,null,null,-4.729216189638299,null,null,null,null,null,null,-4.2705278690918185,-3.6017361728419557,-3.953635911710048,null,-4.090199954114845,-3.7760988806530174,null,null,null,-4.495230453333504,null,-4.403880483574418,-4.1571046056179775,-4.659200570756322,-3.610360484222257,null,null,-4.533150960256817,null,-3.741532440915612,null,null,-2.0091257903124013,null,-3.7354661624258982,-4.451351584326863,null,null,-4.087204077255118,-3.4124835496467467,-3.629953086016446,null,null,-4.747677467729573,-3.4355386094422036,-2.6831055448557404,null,null,null,null,null,-3.9844725934474035,null,null,-4.630226654745012,null,-4.024740516685907,-4.538917088283636,-1.6840814150205388,null,null,null,-4.141577962844582,null,null,null,-2.7807228543181486,null,null,null,null,-4.657024757938151,null,-4.559492113054682,null,-3.3277558724542313,null,null,null,null,null,-4.378468088205529,null,null,null,-0.4657322412677517,-4.588564770983176,null,null,null,-4.338048525439575,-3.433656149576473,null,null,-4.737369312475975,-4.322384942918441,null,null,-2.8830617340149645,-4.628994346063555,null,null,null,-4.263783635203182,null,-4.33880530356602,null,null,-4.71921357863563,null,null,-4.55824966936857,null,-3.9267041235847806,null,-4.159590208672426,null,-4.291582013564728,-2.3614631400034636,-4.517251699241229,null,null,-4.40165774432698,null,-4.793275115141149,null,-3.5977597461528763,null,-4.168426555510427,null,-4.707918796043178,null,-3.5924445781373375,null,-4.410218446990111,-3.8338660747023354,null,-4.56046055953392,null,null,null,-4.575797816210298,-3.7731202515380886,-4.701961317159208,null,null,null,null,null,null,null,-4.488446659545228,-4.331408270894211,null,null,-4.112436163310348,null,-4.314689606388925,null,-4.72680917634831,-4.274074471751078,-4.278044178637061,null,null,null,null,null,-3.4464141714214804,-4.803712870986297,null,-3.5670833065878282,-4.56765326008677,null,null,-3.285469779961571,-2.671633439745852,-4.782195429242963,-4.411402303666759,null,null,null,null,-4.655188607082144,null,-2.7503977584111947,null,-4.738536920503139,-1.6308230927614278,null,-4.2747117734229425,null,-3.155508875249275,null,null,-3.8269197035701854,-4.305651598151157,null,null,null,null,null,-4.0259493220250215,null,null,null,null,null,null,null,null,null,null,-3.9820024428284446,null,-4.075166009510051,-4.337083132027225,null,null,null,null,-3.9884255564140645,null,null,null,-4.589983656603402,null,-3.6871240929910414,-4.6297649865996595,null,-2.0638360703653778,null,-2.6513031407898184,-4.17781852039204,-4.536028965586107,null,null,null,-3.1359029608222637,null,null,null,null,null,-2.9470677174667763,null,null,null,null,-4.653058961103587,null,-3.269125641028965,null,null,null,-4.119518567364725,-3.7988541559588036,null,null,-4.264684374263723,null,-4.546224130148102,null,null,-3.9411055082611632,-4.582472503148049,null,null,null,null,-4.486471866352526,-3.6359919874099713,-4.397625792328577,-3.4955681419824316,null,-4.042306211544709,null,-4.649886449897067,null,null,-2.9223678033668365,null,-4.057946378725592,null,null,null,null,null,null,null,-4.536296262460398,null,null,-3.382120284821305,-2.917251714888235,null,-4.439822084680665,-3.273731108414747,null,null,null,null,null,-3.679887968208119,-4.687358399042156,null,null,-4.570628161329112,-4.218038763806815,-3.9455652303327646,null,-4.6919672828414125,null,null,-4.74267091574081,-2.744272520329571,null,-4.178777462055566,-3.9858320013720867,null,null,null,-4.683265732915378,-4.790749490290445,null,-4.2500431078139,null,null,-4.4877079951415455,-3.665074384155578,null,-4.3418591397224695,null,null,null,null,null,null,null,null,null,-3.7727785967162273,null,-3.934092980887484,null,-4.360916472211081,-4.651116107306944,null,null,null,null,null,-4.352902987797854,null,null,null,null,null,null,null,null,null,null,null,null,-3.556444478095508,null,null,null,-4.60897958175462,-4.578298802673406,-3.679806223110746,null,null,null,-4.013033313396733,-3.395770659941568,null,null,-4.506156661875119,null,-4.269013321066176,null,-4.749812514528663,-3.3900343503553856,-4.310387693522098,null,-4.619723239025205,null,null,null,null,-4.080693476789143,null,null,null,null,null,null,null,-3.938820324425632,-3.4304428391538693,-3.3042018299584814,-3.706686697145238,null,null,null,null,-4.758256159978192,null,null,-3.425153385638727,null,null,-3.981735733306359,-4.229664576797145,-4.756821868725863,null,-3.504666219062587,-4.124419997764687,null,null,null,-4.121211256297142,null,-4.397220087350239,-3.26758886107796,null,-3.214152983853335,null,null,-2.4112175551238035,null,null,null,-4.185901096180042,null,-2.5377721303065295,-3.618370224019417,-4.410375500943755,null,null,-4.77407340777195,-1.7169882122677889,null,-3.56143761981203,null,-3.9312594764551356,-4.382133590691932,null,null,-3.857957075570358,null,null,-4.431572273048294,-4.72986808678585,-2.503412375466671,null,null,-3.9768014872014916,null,null,-3.8587460889715928,null,null,null,null,null,-4.183943670148977,-4.6067370238436975,null,null,null,null,null,null,null,null,-4.7612185517380565,-4.569478711447464,null,-4.321931047135213,null,null,null,-3.8791820119369502,-1.542998708716558,null,null,null,-4.442599676588867,-4.435464750165826,-3.822354131552636,-3.7145380829201056,null,-4.473662105426074,-3.584730340497625,null,-4.162310096691869,null,null,null,null,null,-4.320024486672647,null,-4.621211054396863,null,-4.797671581438773,null,null,-3.5915909321215445,null,-4.079982774077217,null,null,null,-3.2704971987959457,-4.486427460779176,null,null,null,null,null,null,-4.690146430387781,null,null,-4.361116623666482,null,null,null,null,null,null,-4.55054269593104,-3.796407118046478,-4.404432468795963,null,null,-3.9729602654880827,null,null,null,-4.349580550732398,-4.094398877384038,null,-3.657886521258151,null,-4.694902920538667,-3.8313596230217986,null,-4.01880212353498,null,null,null,-4.798298465133954,-4.476153628659911,-4.113812588988308,null,-3.2991327075128014,null,null,null,null,null,null,null,-4.453763353702223,null,null,null,-4.47676138850071,-4.097660152621533,null,-4.043737188566093,-4.300380201156658,null,null,-3.812042968776387,-4.591291395020179,null,null,-4.269840112562149,null,null,-3.6625207330901244,-4.11524820205453,-4.738187237442218,-3.875973686170928,-4.065515377648956,null,null,null,null,-3.751366102299049,null,-3.663070829269632,null,null,null,null,-4.505744786588271,null,-4.217820392578765,null,null,null,-0.9909722124631488,-3.4374347216197485,-3.638435957120943,-4.78444154696959,-4.372189836298431,-4.572315113611874,null,-3.6271119326542918,null,-2.525294158379542,null,-4.672144269710967,-3.629898093327367,null,null,null,-4.644187319282212,-4.5548214182001185,null,null,null,null,null,null,-3.974628284471194,-4.442596218335113,null,null,null,-4.187388813294913,-4.210545455671669,-3.125552643025961,null,-2.7413450665808305,null,null,-4.013464985753667,null,null,null,null,-3.6611843127279657,null,-4.139025710849865,null,-3.997611251595197,null,-3.6100913298400084,null,null,-4.1806127716912185,null,-3.3807069106595717,-3.2038887648791157,null,-4.3406759864865,null,-4.281732427455439,null,null,null,null,null,null,-2.7838491002097636,null,null,-4.709879580232665,-4.308009187465644,null,null,null,null,-4.425674394425844,null,-4.669722987707993,null,null,-3.764016262252386,null,null,-2.8454307204952314,-4.702878975031183,null,-4.355201978838759,null,null,null,null,null,-4.046290588538567,-4.332297172451168,-3.3012479402470865,null,null,null,null,null,null,-4.135390730309215,-4.369465782397323,null,null,null,-4.617294254217562,null,null,-3.812325143702174,null,-4.566526515383519,null,-3.7562067976315285,null,null,-3.321293827685852,-4.492385377196896,-3.979454099542945,null,null,-1.7420663258193247,-3.743511428840665,null,null,null,-4.693086720047514,-3.332463536149226,null,null,-4.4558556822446524,null,-2.5534275438827656,null,null,-4.334170842800243,-4.5315340884399955,null,null,-4.4914122012652795,null,-3.728613957481242,-4.278419721435291,null,null,-2.140426664852094,null,null,-3.517591437786489,null,-4.369301984481011,-4.145554776781032,-3.9864056604827622,null,-4.4745386174992055,-4.11611467929539,null,null,null,null,-4.16717074212429,null,null,null,-2.981179020487897,-2.409815985114486,null,-3.6267244000898726,-4.624555013509403,null,null,-3.8024937839806716,null,null,-4.214115008777283,-3.4887323236033936,null,null,null,-3.706522390092455,-4.392495425082593,null,null,null,null,-3.818018572086208,null,-4.740901379210471,null,null,null,-3.8211790014543814,null,-4.359669672618278,null,-1.8371122929197992,null,-4.378299911235603,null,null,null,null,null,null,null,null,-3.760400737246263,-3.8432360833076507,-3.30661140209532,null,-4.539651200677499,null,null,null,null,null,null,null,null,null,-4.580731327681895,-1.6363323989496246,-4.089041673243783,-4.012577801407901,null,null,-4.469321993993016,null,null,-3.341151041600308,-4.376929804626648,-4.782486427708337,-4.441755859124471,null,-4.779788040698075,-4.232946511022843,-3.4787146724548634,null,null,-3.978168053492859,-3.1874208515203106,null,null,-4.61419080360722,-2.2153951009225095,-3.8004894012754393,null,null,-2.8848711053201894,-3.2695292064481256,-2.812963216516048,null,null,null,-3.5085766305742814],"x":[98.5875333164562,14.986285320692483,18.906816400349193,67.49498132727332,88.28395479168442,83.0697938125694,19.461193916790776,44.51966129272571,40.04531126655488,85.4956382352538,7.395556653278601,45.600177156012236,28.435879469253187,49.54389545293807,43.91366702383155,8.281642873716756,1.4242025745232034,41.65236856836281,76.6301705336495,10.92196618553627,70.3582431287494,3.5916846101493594,52.30660600329347,22.56241028844066,27.809995111901387,91.12777294429071,47.919338124162024,55.92763573561194,28.465576027218866,98.37831368468531,94.6157868573464,17.93111051170446,37.075702934692245,54.76250914440217,59.4774786944944,12.26482033529912,67.84310621557235,90.07765547342126,79.36388044037797,64.15604154660197,64.25257006598875,48.33357967642484,27.06783081905193,50.27892185210816,53.98990407242934,52.59741605352679,82.17248930276315,24.498367446775116,52.207157341918254,99.59846043457642,60.08096806288889,17.10008658481921,10.245234839258943,51.0688841573359,78.90857255268595,79.14349691187287,35.62164787743745,83.24254639471214,11.278203503981743,87.51867123889032,41.21161897684491,38.811348237462326,73.03139005142884,90.29155763625347,31.002620812462432,54.28420017045674,79.17590723916248,64.20841675241655,55.73720822157624,31.30319576303617,38.341797589757775,10.424955832920002,21.85338965772101,95.63404558970716,87.76022890131794,85.84338524744093,42.72544991266769,85.21839236031875,70.26620539234851,14.233982802995904,83.65320931893505,15.287526056826707,5.872552949458898,63.54904205183083,54.89711188905542,88.5412361586655,62.481919657971034,65.66154155481473,30.035470647935327,3.6657264733416906,53.81655620788975,62.67548788819581,42.295758836789446,41.64478174247388,66.99471109452759,66.86729299216371,25.12942032650085,58.29038392416819,23.85578140076461,61.494692322919356,45.6156981165579,68.7269131679096,28.292252082613302,27.70027296574378,70.98871554551135,48.471979837731396,9.972405934901696,55.07764829824424,18.493260352789687,92.300404580937,97.64088101428369,90.10873942438829,0.48637378473364024,37.5362844843854,95.75039855789065,51.15203963869157,90.20206047680124,37.441517635365095,92.03356870167434,6.270274951313781,7.100875463296652,11.670765215132594,52.878897661905874,87.33012784411274,4.979950365620289,41.924367594421156,86.13556584559893,78.17004587053187,66.64841368962549,0.8051602626525156,84.64583117114826,80.82316936079627,1.5921387106432094,67.9794910853531,87.67731834910029,8.77210631363592,67.88664532642754,97.93139860280571,15.876731891380702,70.51573214956926,86.89937240472412,85.44163004640075,95.36702449414986,62.32965484323971,9.36426657808067,41.86595887152069,87.29018428901203,91.11139897067622,98.09205130031002,95.42948545389467,74.653984477994,18.540559709481986,23.9217647910545,0.984638438796881,54.899816879102744,32.56595880239503,99.96521641109585,80.73089948518782,11.04339253006934,48.86180656610828,8.790684685931737,54.98213022882528,82.3634920112257,46.1484287651746,28.528636144501675,59.85518422340736,92.05813225221853,33.646932156824285,95.32493738569903,21.170520056591723,12.982607256168377,95.27020929167087,19.41959874844126,98.21854588205632,16.014621021100318,34.47158494997971,98.08873848773531,84.40005130820825,31.445314241574017,19.870831165588854,16.01424422145019,12.628856783875042,5.8971602496482145,49.55338928767106,38.8944479763764,20.277894717713885,23.052467586025816,12.72771393791241,84.68059275917919,19.957970249861322,20.58434359354646,20.26494323586059,81.00888372718946,91.75484538440986,68.69698831080657,74.32730172135055,50.58155289859625,71.28646083052377,16.571413220621302,95.17672749716715,5.215849900516822,74.98115773001159,41.06912764671367,54.929534968658245,37.74035578476911,52.12222262712185,24.37929528273932,73.33843262614099,67.81606277740597,76.17279819996614,77.37958787145547,73.86630343536847,92.83910968120297,78.6383798014098,99.89036339745061,8.800317853433759,76.90293548278375,97.25890018353248,99.82719790466423,77.52315232299243,85.54185928973818,30.62041887934106,82.30945791994006,90.16904064334703,68.25621666325867,4.55142719179924,29.32050618514399,35.26881417263215,94.87035142894217,6.950935523806345,27.204476143713574,5.755663881586948,80.8154233895833,73.71434500847398,71.94033682851419,72.82400323738636,87.27450044562785,12.011702436569616,6.162169273241291,47.11795910942138,64.28188812675393,17.12129722437261,13.40495652831879,47.23745528437049,74.47204926245783,80.37305123300136,92.96390508077754,95.54912311403557,50.43454576705613,94.78007279751948,28.690491283446494,26.619796148634812,62.1743991970406,64.39590146923628,93.78099457596385,23.973042474985327,68.1569988380802,33.55458688039412,7.1346841174346975,45.86556269199813,46.07347380836559,2.15682925541687,25.807681729351817,80.69732387260093,61.25274300531374,71.17036730604605,75.29535407041163,41.745374417994086,23.509683710334173,99.76246081903632,39.93768733200931,70.92628790671165,29.266273162922186,95.92472749539314,57.67350320822582,27.86759267422998,54.246124723966396,33.892706390222656,46.59081915498244,71.49157715972724,73.72090894118115,49.73600445505859,20.720014108050442,32.72817154829968,57.05577161836008,76.07807174284216,67.01721947695118,48.73118904443257,39.44875384307112,63.37523169655803,76.55874221734607,66.93415954248391,37.878448190843095,88.1864343070131,34.75209831034858,51.75686157094776,89.68935503515394,60.52379618070292,9.837650726207459,43.96038621414673,17.38423474602473,32.83950084022946,49.235203161763266,61.167231971638,63.35080810669018,4.59598749185155,97.64671551300805,18.59552145775618,52.88372100393703,85.23169858171933,15.409948082400815,43.367823589056556,42.75699876063912,74.8368135495129,37.85352711464181,7.557654921476531,59.66853036061737,18.91671982545875,92.54984548113624,80.23823555253644,99.8122695346894,11.699672080260083,51.75815928364953,85.74261781186704,64.24183611746581,44.44287791846082,64.06716861638569,0.9382930396756972,78.63667167485879,37.83347923451841,80.05268225174167,17.01684968334696,3.725080921091828,71.82422071891898,37.11669291110358,52.025125038241484,98.07471475366873,8.116790463301893,25.74405677542906,54.763170264714354,98.12039526635981,13.49849477191234,4.518702553620746,94.80173140981812,15.159133433817518,67.15717246248283,99.4184995538421,2.025164040312588,74.20661097131294,53.53262008112638,99.30531365390894,86.77372141526885,11.215157595599168,53.844260893296855,30.528364323590807,37.81960566793621,32.83796423944039,56.66519498707234,48.9448956677164,80.3697713520907,17.421877571051738,15.520460148714532,49.74021966245354,93.62067409070882,56.32630789549711,70.3402107007107,20.461558516555,29.07327564662041,83.9810574087719,13.987553378831684,18.88036707929095,14.692072193442375,47.70387362923716,33.23680016726476,3.0412288048200287,79.84244359051867,41.83543164147638,81.1753491779348,74.6266173922529,78.88735546247578,51.87069683484759,95.87945503270264,75.64674564115784,9.425742886245093,74.54592347447398,89.95671130856925,55.025699727199864,58.07779317087516,43.80722882418022,88.6590429130226,20.341077510972717,77.72726858847763,65.56801425072459,14.057567564851968,41.70992439102177,26.82708452676621,71.2613604249525,65.00910937902728,51.84936417953017,83.24907192302405,30.90075897921487,53.43169313309264,60.23355644132753,26.476087801195327,27.40585932685997,51.61383219385671,83.71093406120605,77.72428083331569,87.58276268213405,78.50157854533965,16.891969808304896,57.33568350347491,22.309933506627424,90.98504976478876,37.137928462778966,23.500931865222483,34.311733558385946,73.4092321243517,73.93693327399389,10.499887897376103,87.4808365046033,34.9657680580048,88.60422426741958,8.458089289954685,61.79383351652375,92.73713125157886,85.30748545565746,73.85310960927633,84.81840850112705,45.568011389587035,47.79635282764998,90.91227540978241,27.904436558015643,15.364324522156592,65.43874560738405,69.02960511160362,15.677112310213182,75.25455561197501,9.209421420551745,17.63381185044688,41.325364913618515,32.99202189397641,45.44807502840173,64.18566716471481,7.990938308366413,3.627130019569269,79.46702298576929,29.490422627620426,37.36665482414192,49.125709734768705,39.38950230632541,44.405361669047096,90.07495192065502,43.95522155929144,20.363441708912266,57.10320567356464,41.76231063290847,18.40993155832966,93.98320836296585,84.5865270136031,85.48219406381907,71.41876208685795,49.41889370288555,48.735996139176784,15.616732337175666,13.50337007323066,6.075534006732175,36.707085294938956,9.285303610670436,64.16365731869647,18.272422060777217,97.70174480140822,90.95495170421886,92.90027724153913,0.21337211029819336,69.21684744049553,46.477305567158275,67.15220535565744,79.2725447454778,77.32174834991451,30.931612117413152,86.60765163353776,88.78550344478033,84.3079058009996,12.279028457183937,32.83726012733952,0.08029706976480089,75.8653066165375,6.153570699499711,4.49123825468285,53.32217241190265,40.350553585314074,10.652548092065906,92.43485371931905,8.098458516097251,76.99141892427413,92.10685171615754,5.5881679149442975,79.05259450677542,48.695445134260005,9.943310687100793,57.51523080936054,56.54141316507364,92.15452494716678,28.802747967929186,10.296940636931918,76.59365520537558,87.28610128118089,40.10538430525361,60.756813509963514,15.45802582322018,11.68929016335769,87.6555059354648,93.69790339720655,45.15357201059484,62.64122108614436,8.97483564740238,6.47037633969596,62.212480756247565,87.00552009213962,11.913837937175575,51.82855142163747,56.75337271911398,20.018067038226594,62.60457836647917,86.97902001116479,20.685053637851446,67.16720299830925,95.1137175112936,45.03927774708647,25.485026973635172,40.83783800137664,0.16454418976827867,8.509062734131124,64.65315181644577,88.56311805858768,69.15289998293983,45.617288556032484,80.55024261820442,5.021824740717951,84.85322806649911,4.4667400809234925,6.917744346935839,64.69363698619964,87.07560828469714,35.239351648050985,43.52730117678141,27.18223623395786,91.29501338450487,10.417286468602205,48.251863238883686,9.680437189451418,75.72078912040739,54.54133375166843,14.259850272125751,60.316370586858966,99.96756012217476,20.817148523184127,22.709550103213626,61.85268272415345,78.86787890825076,95.23892764420947,27.011534825174532,47.348852126560544,39.757264973013996,5.801236251704767,76.92128900900101,5.701872317969325,84.67850235752547,99.42855595136216,10.144674700711477,93.24331298489814,59.36323590992294,2.19529044063842,45.06480803629857,88.73371597515009,12.064337491331978,5.060088810994801,32.738509042965866,93.91651270165168,85.66663853650296,29.544462986613595,12.065811904937185,3.7053492160487256,12.30654776436424,96.38962102239137,9.240949376084107,23.9994045603239,26.967746478320276,27.62761454104261,38.887345413163764,85.17817580186112,45.583883203640816,32.57588488053684,44.96093354915271,55.96262084753987,88.32182107410071,28.361827008361807,24.147555793662832,93.25440481283415,67.07248956655248,62.25005813122182,72.15256852981256,2.736333272882008,72.8777146863058,62.132081350384325,8.40379972088181,36.58534964012179,39.39202062234746,31.3536942109522,96.41132179758326,2.515410637392157,67.7698917790611,67.65018044644549,39.037000953463384,91.03965952278028,49.72789341084922,41.822256040286334,61.68072470971118,97.06719221984552,32.46850442710914,99.81605667657792,64.60792719213356,0.27400421096737126,15.620001467320455,9.462622990326718,96.14582448484936,86.31018942026263,98.53197799220854,68.23879267317166,77.05265342613465,33.031987030485155,77.92995581966275,58.71739144528458,65.39472760887901,36.54162587302314,65.277655703523,55.123310649705125,79.4205813611087,73.0744405287802,61.69400933144629,43.89812882203916,68.51121383523136,15.113342096424653,76.4051124936206,70.70256468241377,87.6904931541043,42.63665906291536,50.174107816696534,1.6134366578013148,14.434549026394317,46.582858083217005,33.48764112962481,62.290694745549914,13.929430080829386,0.0606447054231074,18.35352938147623,37.3988609923392,78.69459685802995,66.3359964733505,16.199616479431977,87.20269464970659,8.39421648623584,83.41831126154004,70.40268256092584,96.967322127465,87.73869995277899,64.27206714847276,47.7564392375845,95.35585380236944,60.457856534460696,78.20342879432486,86.80303940283144,10.705858452893002,38.32764202710277,30.65038228971879,45.64542329176577,59.285731239317776,95.50967241516355,18.531702863821597,91.01190525039694,40.02129968657493,67.6173841133686,57.93896959251854,26.731176901448748,99.1648755516968,14.8455299043049,77.01619290258752,74.52970322592607,38.21477543076624,83.34327470802944,45.03087019157115,6.410878378606544,89.52655307074528,98.35032645277212,65.15156173780228,48.56355182449115,34.532901744563915,92.25082927360036,38.23928366065965,77.39960913706379,83.19441209525476,62.39990259197463,97.4004190802453,35.35054702230842,71.23285432832292,86.74026710747657,19.503672658410064,76.78260511608175,51.577942445801874,78.32490368834748,39.01356481058189,17.13257934211141,55.87822192944434,75.77839939352191,31.57150363235477,65.13773443214188,50.88708244553055,33.32616799121855,16.287249883403064,56.510931022273006,49.63953722510113,38.094641752494,48.7987829992385,12.381803591966655,16.450528266411936,19.4275431636989,38.580680495205534,31.820304652112185,30.16065487654169,90.47210656774054,41.13008725369285,76.71818460614112,58.670074295391416,18.55513741732251,82.9461982331043,10.613217142324082,96.13765210950702,96.29925857370291,80.8148448827565,97.31529258297964,66.21505506105474,16.920696974166827,17.628740187840975,78.18216540133261,96.05728918883878,6.943079052912915,9.449700480245603,39.13853892653576,88.18860467289804,61.7793230666017,38.739383937332114,27.470813866943278,38.440134750241775,43.435800508332804,86.77710279551987,76.73432093668384,7.492720734653768,63.84166605863917,8.343674341311358,85.62044888383409,2.390022066958486,51.881426469747005,76.6075152962574,44.476568608631425,51.81877777286441,64.80133008998965,88.96478032362955,89.15495652847312,88.29187922833053,55.87204608975534,10.936763700671047,19.477323710629314,25.053692921815895,70.42099552682213,36.317769751960995,21.757723464235347,49.143507185402655,27.22688474374264,92.84400589817707,31.47921431758014,55.50505630315363,66.98919233633525,19.486065796356034,92.88239587408265,5.4054523004198,89.14525961868938,90.4883897908575,13.337240936020534,18.05032391200616,13.173749227829678,55.96453788990223,30.212881679413563,74.24575569127643,21.762539704460117,84.71582953342984,94.15572373077659,28.24305862736285,84.52060141651943,63.03084566243036,9.650332362972236,31.801238957204525,24.00383716058101,80.46285467088616,69.88497442958688,93.62846809895173,13.060541864079633,81.73538363537767,7.2783116563489125,92.52673087694465,10.551987253560014,35.792591573765776,57.626739708629884,83.4397644398519,40.71264654739313,77.32469972347901,61.546947582238445,3.2333207684496656,77.51251354686039,8.969457985256746,48.20153864696306,89.56932293473103,45.64160755054885,5.812334987079937,9.448774737949538,68.75918311416613,19.942261992212252,84.94393025336993,8.355910644893271,29.561353968474435,90.61467974368091,15.683775704335767,39.55786087743447,55.08218082269776,70.41081986151269,53.53728155879571,14.067845640017085,61.89717678099203,23.99330443898604,24.037650043978353,64.4654557989688,10.65445716510196,8.62555733479564,60.007682394576456,94.15808947750763,81.69922002057702,28.246797104840326,70.84121865581193,56.690759930662374,85.43525106226309,95.46493866565643,36.37475076175327,85.96115357430583,26.851778885214507,33.20003026504532,99.36442758049708,41.89833888998273,86.97490843688884,12.83748599454042,28.388253544855058,99.87157299104574,10.926249204107119,12.675878753864644,61.78399860063237,50.80526874384537,87.4430315007739,20.951728297663674,13.100452024493613,88.35169906702538,99.85363788795172,84.76179363404448,45.081616162424076,61.77455507588287,78.57693037923357,92.32866121547228,38.09991708641112,79.44495158511626,29.274518686630422,80.22013269381401,24.985363729191334,35.36315508783765,45.91002060818825,92.00043219877814,99.08469842288703,63.39423992504108,94.52898606955735,47.41280624482069,17.305185283273183,85.5318128838155,73.35332305861841,12.128481115364576,4.597136435540827,96.52547421776,10.517896134896132,74.27261194388967,73.13327475317857,27.965595096982398,77.20069410116055,11.954244638482425,20.510741174455728,18.244340074475396,2.5609787898502656,64.29155836587279,75.427741360461,15.085794021731246,17.2513293152424,21.262498255860528,4.608563279803035,3.901679558465454,23.33713876462462,56.82107598801236,28.845161814649135,36.13761384349867,50.5121405316862,58.47412105480729,8.517316097318206,34.395805669610226,38.1431143930441,79.11794252382465,15.070098379704477,33.15996559999406,90.46271768435655,31.221207593759594,89.14278521877759,4.665613684984926,31.18294506345112,21.418925709520444,61.617570447592996,71.31752878151927,94.88297307029939,11.025863793607993,94.10829467234379,51.95545721199626,65.26962149207971,56.14225664868957,27.077869540130006,29.264975144924744,45.065660496702044,27.686160620444355,88.35176651944123,18.17048879230052,95.61148740378202,33.18192619653437,56.61816236684438,70.76703080904619,71.16873044427614,7.322861618966181,66.1554164529724,58.70787348374278,86.48675022270093,69.4325065073153,37.58218174545309,18.337319235358972,31.599808670530027,18.806475174038994,19.406143876218085,49.24470437517583,94.18980373603065,36.372662545800516,64.20269457771339,67.53398988788616,56.49410756773487,42.161217729095114,73.37726256409292,66.30954196116909,52.328085631162516,2.0710473171905663,51.70609682325649,22.58062931452487,92.1442740848851,49.568159625009955,68.3169240048763,60.37541894394458,5.922542222557681,73.79354467964443,76.33811361052325,65.08283854580984,31.112098827026145,78.27428529640731,52.10275321312179,23.454929579990335,32.568165440309606,63.44431509142745,81.12127592150212,23.727275515528625,26.594705237079186,45.50078877626444,10.216027543409067,56.83864503357607,69.50356638675707,26.28933696365232,45.21053134069965,50.51775306282629,21.048048226159665,1.5466827502854663,9.177290126886973,82.35057866095485,70.55580986797305,37.14800877929842,15.993314801671454],"b":[97.7759237755049,28.8475018144362,85.4153460856768,62.325383134423646,34.23380447636876,63.23571715743909,79.98148129821845,88.2491235998289,71.42136947828908,15.936254395239725,56.1015895405392,23.79115911353281,51.47487425871519,19.67794358214562,85.13222020299256,43.848485544890956,74.63013948945517,68.3455115434238,59.25428092424465,28.722266853441255,45.78945095920987,29.846639149544295,56.735906820348774,24.439920483957465,63.49940154017945,29.820612153688554,12.955135196891469,11.517177537964045,53.20410525451595,66.69010148153632,56.975298104856336,61.22196969567688,75.6859777016121,20.321956657143225,79.94173277312626,76.39330778962876,2.778331575426556,28.204093026671977,66.89600080795677,74.86615378948694,40.42602625148777,71.2335193463181,42.34242702225597,54.23423385194567,21.720057357135133,63.062857335665626,66.25181132871668,17.93369095637668,12.8682382903636,16.26388067843,52.84533551810613,81.20636727746128,13.88031151580918,64.37551440111886,58.12943286733069,31.688807103627916,61.89274912827182,29.781745453560113,62.8181286586055,63.472744211122716,79.74715541362706,27.895103537070604,56.63168367594187,83.55311220282162,68.81235257982563,75.0391465376717,80.70876513587139,48.48375650108412,50.632858447884914,73.47320128147969,42.02039486253769,69.32732144877615,69.01244284520118,28.80637917580421,12.474554480530848,44.02545490793294,36.00971968651518,84.46975170294436,71.72405919850877,30.56733583287673,35.091522892105814,44.73929836642578,38.34498049507675,72.13375236698697,63.95664183468682,17.90946086053632,22.19775669687037,9.054955540268,91.11603330239838,78.22158896631916,89.52059261522405,31.3333591793422,9.740890971149444,41.30664827553032,29.804583056208685,90.06644734026212,8.429449437124607,15.59206384584822,61.47004098242312,48.568851687165456,18.646358749607387,48.52379643060322,67.74495921975243,26.533054798850646,29.774851565316748,76.61786194449348,57.00210101409715,62.37295352944393,87.68965304315569,14.802985198603382,92.39722527425083,28.850777395497126,23.47969056822869,64.06622144243944,47.45168987124657,64.23300273817942,37.63062055292296,53.14391611321458,21.25919380002165,59.371218278541825,78.21995080700282,18.334062136279634,49.21001234457333,75.45493836075369,58.002751217996064,55.30473283051257,58.330126783478605,55.532408038643844,31.046949586688854,18.25554763273526,69.56065864196978,77.17727667908616,46.70948406816157,65.871812260602,46.4364240417285,23.80457652870765,24.93242815163404,7.010821719834213,95.51223183456358,82.16414777835367,46.42886761573827,29.002450700062585,26.016407742276048,87.06391787388138,51.50708175933231,5.538794290710611,40.90443430437475,46.03699670268036,30.947504837722775,86.39382500991475,83.32268581212077,80.07866835881859,38.63347368333504,55.06657717186508,64.47830496924132,45.72356485343869,34.076459257464364,76.86819866337122,45.0763974492031,71.23928668140877,81.80811322461528,73.34943790697199,88.55877415955307,76.42608254605109,40.598570693572,46.02481827583653,47.31081709820056,62.9770061442878,43.87612013010454,32.634201181235014,78.79086016850428,81.58542145617467,23.70478809363615,86.96260418815015,39.523312123555996,69.48393439001397,92.25876699599598,50.49162844413394,54.946135100159324,69.38745392381904,76.93729068761533,19.584528786877378,42.368649917363605,86.99933606723266,41.647580943325394,38.13114147279889,9.173167038580026,51.45624726167212,28.148349928625443,17.993119895888277,19.860467465726398,39.14665132741544,49.88154671614052,40.83738644718834,89.17848442614982,38.96824498424638,58.833214118437304,84.97977227892605,29.09030066449717,5.7950708271777085,49.3342446041419,72.83002112904049,50.955729348285786,14.052769286739224,31.712428138993157,29.495341286525697,25.622481439199888,35.35082213170655,43.78344451857073,19.96721517459367,38.149993989809026,92.57756887493014,65.39490470753718,93.69345092401163,80.77853894921329,32.03404743630753,3.675079889063624,18.161489440681354,74.84023351334733,70.30028108460081,22.591464881669378,54.63064577236642,82.27259462115082,44.14656938304296,21.49765552832453,28.3734951789166,63.73303544182783,22.50194084881548,60.046998426015406,56.49792146072437,79.02242640172462,49.48873176885194,7.9185683040670085,7.463528352439486,96.83772403810546,81.01061901122657,52.460666417822075,50.721953970951375,12.230848931193812,76.66722517044708,29.626308423514995,42.664840872419845,77.14415139841046,64.57921490181013,67.15021265354449,88.8833034850441,63.609831594558614,62.5318749014143,82.61208091575197,34.525359934968975,5.304730155542821,78.4645048860674,20.93621630018218,69.65912363385797,22.885935488734333,73.21501399344207,15.899745282224869,71.81781546764685,64.07416979738186,73.39295236546722,41.98743089680261,77.55464365955758,62.27683789378669,36.66555588055326,90.29668885297778,37.15950596752657,77.38611490810013,16.04557403086538,72.07990213195954,21.346429259561376,85.86548731611808,45.65120914318183,34.33805969868109,28.90413849927832,69.5737090966584,45.471834335301615,21.444946582539437,79.7545589277349,26.293748226344363,42.26959991056246,45.41694409492763,71.47362827826512,53.44970577475294,71.59071504019937,41.637541935912374,34.976330307387926,61.47999978936658,44.222755190141406,9.638501707521296,53.35335661671148,32.81491068352093,82.71290915775057,55.21957694572451,53.406600182489754,24.008335498525586,59.60961314894439,78.37349520505583,73.40898176060425,43.58873273077586,88.61459994238601,59.65020235440378,49.793697447069995,33.24596904107127,37.406002664683044,29.041663124144254,58.59598616107368,28.624772367708037,32.95460627104536,97.40245291473082,53.280046023779846,42.26320538700211,80.77753657491449,15.262663373103042,26.23993021323258,41.04642619097355,20.77891606886849,88.72416793179406,62.64969665603602,82.13830190939879,66.907011405426,22.86841283477727,65.89239619816128,77.78122371642088,19.415452071584976,64.69350649429121,16.255981858022142,92.78915796601018,77.35664773610992,6.1236539913170285,54.02408822748656,40.26484345077432,30.701701880725203,83.96662999997521,70.87852223993218,46.01279394161098,63.434047326903,58.70966869120805,37.65962721725505,23.47381434479498,2.007048646269718,38.964955333722294,43.71283182218546,50.55080399122076,86.00672012582167,8.077887895583512,32.930899958430814,24.18312158824731,60.47337368063922,36.47881446757737,52.49361827139731,9.676477952093684,36.398791412436786,47.556481463572354,53.328543787320214,44.247107174263604,66.19024433678649,22.84654280789737,23.05559373785245,18.66475971213073,28.592150019007537,68.34863979510817,28.962943584705148,3.839852069701224,42.33901499556657,75.22136747090205,34.85908546581781,90.27205953829696,78.42963115154502,22.686767987710482,14.665612297340873,11.956232445230611,23.859263417615995,60.44481418789291,63.12263748353634,77.82111222127136,78.19554163529237,20.789890798199792,82.04772640513815,8.992389676717885,17.16356645747608,31.108013620068572,71.03272062673389,13.454968686911828,17.04035805255446,28.228163394674223,20.931011751327205,32.016078338160476,56.24341578809466,76.52002316725138,85.54463023694954,46.10886487701533,33.822082606460874,22.127662066163634,76.30919457322022,54.77679022424695,54.94198063971223,19.462080284772796,8.003916720467213,62.51683547105519,55.12326965305421,70.41261018602816,41.99414207809431,47.15701515865838,44.56786662245432,67.10392816512652,29.14099114022165,82.31166214262888,37.98768436103192,62.59008627088222,90.75083824974267,33.49596738034873,72.40190107385162,37.893738653307196,69.3395750476989,46.3468113656028,22.743468605614417,73.01918835060775,73.08225529794146,41.118250132948404,35.87951757350616,46.12889021776098,50.705636649214085,49.75388692011466,74.22573510449111,50.70214474162555,23.153468832174045,69.26271569280708,57.91539336389178,17.55315058127301,76.74869730029968,25.11322899648141,17.60638310796354,31.08389789014217,34.01350031986096,63.6637272226379,82.9968163899048,48.38635837445074,17.198615297644405,77.12659102505292,34.14310348159162,24.994338215960674,24.581530460384514,51.62921844434116,91.06432746559074,67.731342732237,80.45643166478072,94.84490332720937,67.41865532922088,49.22660533692451,37.79439610223875,73.10227158911637,26.895945345429272,47.138685700743466,75.76806549819565,21.97268585666577,48.189107250881875,55.48009236683255,94.06738106675341,32.37536982627058,31.91305733241926,73.89022771081379,92.75559230670923,91.92590989735571,30.311733020057563,85.18813372761444,28.80366799812096,20.893615696643295,65.61021676155721,26.010734749611206,33.33900908429484,65.76682230474896,56.44410008260515,34.830722034356164,40.230689364231196,92.16742208485634,40.54021365688137,35.30152321776377,52.410960791179626,73.19036651148718,65.65261705470371,38.894651163177045,29.323290598068958,92.28203409315799,48.1052933074663,64.61063633878676,77.3080216454643,64.13741714284619,22.48247764808405,83.7547490686043,18.358380059469006,44.790930155537836,60.9480863866781,10.465611692682547,91.82982685515495,87.5017196955302,26.699003859162143,16.681315482741024,37.86650183168058,34.594670346324165,4.796390160902213,20.023368714582634,23.967749488049165,21.40643621658308,65.61721670944296,33.67725182571451,5.164190841465999,76.2411405495094,42.688032002480824,76.3829744264107,82.3212115810773,27.357897396397803,38.53576489628961,72.72862129791551,51.587237168699815,53.27491393969784,64.18945720271992,60.07330762221312,35.329178768411396,80.62687842192932,22.832228053262313,58.95732417806481,47.94444009379298,86.12647580852783,69.118757080685,71.92978832978774,71.13252828027443,73.4284725221844,21.805016947383148,44.47307727242635,33.28430217743133,24.487053813435512,50.02918573625638,67.09216613793463,69.08674034303581,42.41128599117738,31.923279410296004,40.99832722450116,36.03435161274877,21.726940813073195,62.08339746558638,86.11194842216311,67.23748359245356,57.46440408620259,35.8243119836345,39.51585275413354,28.647754188321883,8.86181763719664,81.74928526221332,70.08376886298537,21.846375197236668,51.11981465148861,75.21129113115461,62.66402990308115,61.840528863947284,66.82931491882299,87.75054694404821,55.67494821073493,39.24938031048297,45.892455860670594,45.567423583985175,48.36787268870786,64.99084228819213,42.20853808503609,13.158988443803787,57.3859103370623,42.433045406034246,65.91220333711816,19.037904278056594,33.9785448229915,56.061903458232536,20.346998465563544,74.9970746835798,59.02693858347141,33.86538958676851,54.972485590474136,41.97768363259843,30.143242209933945,46.48772420321441,59.206251859580384,35.2468415280954,76.33061799153563,82.59399437168881,13.537456125758279,53.865087284725945,33.233918859320895,33.36863178666687,77.68177599107092,85.60470809218518,15.49250577066148,20.977039677734876,45.62816347906998,71.27626626778185,42.7488512348247,64.95268420309779,73.94907157151344,56.2718075530786,41.91833373077078,16.479525133589693,47.23218439535903,46.94898032724949,40.77298282910641,67.18621403138688,37.40387873598092,28.220745793907632,62.1607521429236,59.76295394064586,69.56012715425722,57.46601480832781,88.74692782259325,28.35607208080408,54.82623496040025,30.424811530825252,8.622848678110802,58.328454919634645,34.13091898905718,76.61339158958575,20.720906400037187,75.47783940346928,83.39707924078357,89.9388589213969,54.988561508879236,78.10970320361679,44.75149045908873,33.34395266093057,75.63481487406833,26.22910247653445,59.8430858219037,21.975829483240137,26.407806656579268,82.04075782935253,87.65212754401398,45.68800454845916,80.80584506095873,19.10157975778061,79.31904133484082,42.97296786680512,33.54726142882119,65.77016848135561,12.826533044862298,47.359834756907944,53.25456830801557,38.68039325791595,63.92071069328376,83.55292307472459,40.319866349667095,90.33962375114159,50.070332887107,93.05149081236938,17.42235814848431,38.49599235009804,68.72601021558717,23.714538123737338,46.70779569596715,57.78169788886713,79.98164717513556,61.85982383646947,80.58584913303535,70.42463283668762,8.341406820443847,33.607745176390374,61.997171446954596,61.17655961128171,18.75016402247082,40.63162289463198,93.14863279066095,70.8537582009651,49.0383804413796,77.87404179622854,27.054245141949337,72.95954574990137,16.672862308991043,31.712744921904562,46.97531862808153,22.395777558276286,79.52026758671445,43.62200375018752,63.65569639187055,58.59456059724401,43.017763217736615,94.60482627759757,8.32885070184258,38.343233201237474,43.36138142709003,73.58239594894444,48.56355336722985,14.114755582848204,91.48571619215778,24.02205634796619,96.43001341096853,44.05395961523029,16.454733437277508,56.09561095916393,58.09718717405271,59.68180847960421,80.46671124098506,94.8867723611239,65.47269687707936,56.46643078469946,52.01237269070168,40.31294969814692,62.998854260365775,62.273291174141676,60.37909209262066,59.54180532393265,30.68006351504517,24.015701093730755,53.37831141699269,87.45895043449643,10.544330844134265,42.48178736176237,55.74442463053027,73.7871915855555,39.332961530562685,28.56414557607257,80.70911836427067,62.62677723657559,19.007618820821094,28.44294202559787,40.506898560905306,79.14307731434296,51.36159728946802,31.418238077879206,59.42991330891167,38.02759875539715,85.05391041128806,52.56726704398883,56.71478022398708,81.87606666119159,45.56080668067361,41.65154456700019,30.318289107881498,14.038557709773695,46.69236069689772,25.32997326228829,53.69986127910548,38.257264645714784,35.465920986385065,26.81180928452381,59.31740733134354,63.7286064596795,2.186585154021401,83.14210188779265,67.76793921288743,79.50428481138701,60.43196470659854,52.15660581690874,66.85219264216471,11.231360451697592,42.92168963797552,90.14347325496803,92.29418710355989,58.42175382518133,79.84625633251541,32.97810296128584,47.26337720921868,47.91051960913697,76.99944158603444,81.64641311504083,88.74137799310125,53.006740740766666,26.361006963676022,40.37687565093036,18.23646922967456,94.30889590492174,72.56961526539044,18.530675025571238,55.013472937829775,67.64727260970167,61.25363055030688,17.56714901446519,17.878219599091842,48.48043989687539,66.94374866415976,21.396284314691346,36.98116784678787,19.960441986418935,61.34098314454456,59.846322434322474,31.27016395121253,19.18758018100664,33.24712209724652,39.47250783436032,14.09469009822434,79.88706276460775,80.82658296905244,43.53373077149425,87.88799515410987,77.79108345274884,57.94585737525357,76.9378424630773,60.02074069724998,34.37921568875426,40.18676339549559,13.663275788238192,48.553023517128686,22.972938828915524,28.381523796378247,71.36918067563475,71.05909782785096,64.66813614007349,56.1622711172982,14.264302242607435,74.29458170572597,33.562095340560745,79.88705291765667,36.04419681502418,75.46137861628554,46.17711908247098,74.53734312945062,25.93377271834288,98.03934154106021,36.643829693902646,13.376176382991375,47.041032891634124,95.19966973401577,86.58720437677795,41.30417688350768,79.72953359900202,18.35728590389371,81.36729919104884,65.43075927258474,83.44397611528782,80.00870552291568,27.84117130834954,26.571483845425938,72.55713838138217,8.750492983024788,67.65591494141256,16.449070635479934,72.85954091962923,70.02304989680874,56.59735192651715,28.60981020950117,14.282403432552012,23.971519471651646,40.87404997798987,42.05652171611459,68.4656316958352,51.54432468250412,27.330390466670842,35.08546823781693,81.84544944834147,17.812812491680976,28.223347884245054,22.96512534583551,7.385466099461553,73.46752712824009,79.93868282283694,38.80708315493277,51.52035765758867,77.36639560788632,72.28265452596412,6.340347140277087,8.293764652325684,46.98467527247425,7.980271271459247,66.81077804876364,51.69599357960843,33.50764588464695,12.048854117519049,82.89104639403794,18.196726156659256,77.37734192383658,67.95004031434914,27.359675142491145,78.90618745044752,22.806165778979846,36.68755541837912,37.955812865260654,37.67361256985289,59.10088065947424,83.32588563422574,63.380533481171454,65.38978009253361,45.32245403281963,72.71614614058956,72.84235583040638,30.08766538988368,6.616455585289462,21.03682565674376,58.31825110930925,76.76021383667953,46.137991417514726,33.65163969864912,80.02890782221581,20.693683290075057,52.627033276388424,84.22163405236248,33.051188024883594,35.79424764802824,19.901327808364826,82.51338524038341,79.2086688439216,34.70822888911721,19.482918092147635,83.66493294428481,50.9894132793798,81.76831507862563,50.332433038883266,68.64145261937496,80.64130992581369,53.73828830949046,29.139248733402937,13.990579106269276,10.678056882999801,64.37409911434472,16.263108773195878,80.60531421365788,68.83995144929173,27.31033585093009,57.109074600100605,27.740401320218986,41.68012557350416,83.98211426913231,32.28202593905746,76.97580817391383,40.37661971130847,26.134391941544102,71.57005404966388,73.28041160831663,38.6820587067776,84.86987998436484,27.960427326965387,55.26582254007564,50.16393304130499,72.67742588204007,19.764658436970493,51.32977443312295,40.46738279433437,10.5418316862725,50.86911365067315,15.17897835106706,77.86244007167531,48.86033588886426,5.0435742581076415,12.459452216729435,39.72989777772902,19.961105509509313,60.56668307744091,36.83214275450853,18.394876756020885,75.468934119231,56.84474647894599,52.62324126611766,3.9136029347269385,31.935415158175637,44.89611340922563,31.32112185335314,49.55173007836709,33.864130650255404,14.043151498380148,46.73292001413113,50.46344796686819,37.69628089783191,10.605192447247704,82.45065580288713,36.79690237579732,16.642836300592982,29.961182145418658,40.72743935592215,30.202371639391764,38.26629553497642,31.501458511203076,58.19469861842937,35.662125942819735,76.88388624476417,56.954938847959724,61.862263634249544,96.64319581797966,45.2406262440961,49.11536173216896,83.67550098410108,28.93368522280971,43.33677581868021,74.98945379401415,87.01552485184415,94.3191362385456,65.60821613881048,47.491151915250285,86.82102728349531,44.80025429043593,36.895693786590904,13.859328592190536,28.42261760215529,41.24584201136062,29.424384623943038,24.360090471312223,75.69984294952496,75.59736484255451,69.66527850258483,54.42770508215969,20.850391312857255,12.334730300325951,33.40256290232453,60.084045345111676,12.742388922353967,66.05612463898441,57.18931836583347,36.478982273219884,45.23300216981504],"a":[18.097365846388193,6.565975638098629,16.779608054388877,6.783085218486589,18.361238898391832,19.624683623584602,6.500121335498803,13.644047286001637,13.871066445168818,7.207250079357963,0.8020667798976788,19.035415921729314,18.015168810939176,19.03977946027155,8.23655086469881,3.5258883969640475,12.430606350134475,1.1861620685326368,2.7225507765321533,1.2668836707327769,14.265856807696014,18.464387301791604,14.295488938578078,12.722641625494733,16.290244741365303,16.444549372898972,11.022841852596827,9.823152015873884,4.062257758916079,17.424773504996118,3.695506575352696,7.041035585006137,19.183736556025806,7.018882238947857,9.513943609187706,13.500901183058819,1.673270615104343,5.748502091216281,1.2972213537329047,13.312523021615835,14.42768090993881,0.7900727332531599,11.252841067840222,1.5858116310322234,9.148649766416966,18.71985119721451,15.337715607668736,8.915029488838693,11.875025706655634,13.807562611342847,0.054525699575158626,8.504184342446003,12.818969618695522,8.921653532770474,7.759043755096799,0.5798470733238492,1.4517126330300867,15.745983318891676,1.9938944539160275,7.819666478839795,15.072496112814884,1.3970348664776155,17.360167002716857,9.510700650147772,6.208115970105874,8.394469966705259,13.444181341868035,2.0888221362686954,10.014043372421808,13.275951649051896,6.701884024908176,12.69747165976443,15.954623339866263,0.6439357071449381,3.571971900177555,13.923698114915236,3.312225481596043,13.344477099228218,3.7577638967177585,7.822229452244267,4.087209514139389,15.041961498341262,10.916749300803946,11.251555126696173,3.874411313821824,6.462033289777609,15.171789203100058,4.029953197143166,11.76686033732786,9.045008516110865,11.294001184568657,14.03788354042863,4.222547972854023,1.0771142327043615,19.025349451060308,15.074457243513667,0.20876945118252,0.3861943274785018,2.2221678479408613,14.298029402875665,14.346274478039604,18.18715459176454,5.878840406566526,11.392531288967103,6.948592450551225,17.09078638818046,0.49907778403790903,11.646944630681656,15.646131534670555,6.3992424245870705,19.34609139027114,2.9296668506667656,0.5802173317019843,19.577054178072476,8.342944963759265,1.8644957351447777,10.146004217521405,12.439054408917478,16.056034793770543,15.10251454200533,9.843628585610418,13.29762045311,11.546515084112885,2.670863472517384,14.37889605746491,9.250242592787563,16.158244896537948,1.9686145982840175,4.963062036900117,14.251589400502183,16.343444694375087,6.278773168524747,9.914083481886852,6.032257485180539,19.70529911157323,5.093338533368459,12.82477550440726,0.9587795923429931,19.97420988713607,6.640265530951899,13.839111352126459,7.34934805801263,0.3458120620257299,9.831230431669065,10.010275854116113,1.3571993068707,4.516339176820474,12.721096043892901,0.8658653739350353,11.79058912244901,14.80185717014221,16.327544490242417,5.209702621703611,8.254926314463095,17.133395806833988,17.896935804800336,9.48185048750993,8.082463911429745,13.76135929645205,12.52082643256561,19.388128991823347,18.09993694418384,15.613019173335703,8.865653592806812,17.049357141951575,10.786393817262203,13.960678916791164,3.735859247928004,6.319426680094935,5.458575303855855,14.177592076789235,17.77112451972815,18.10487433788792,14.025005465201996,8.445307598211675,13.196374707347726,17.839072633474643,15.982277851934175,16.144393096923867,17.987204678769682,13.649109781660265,13.30560207956693,14.098797320829926,13.572185329331354,3.417684817353064,19.063111140366765,8.512975470179587,13.549818017663707,16.676878705737977,15.629730630928368,18.33632046728288,4.75793931665363,11.212810568357735,13.301387371908437,16.685132561100584,11.19706426665938,12.122015129049428,6.476007531218775,16.33649913882597,5.591681468665692,11.978125831118325,12.042753250894727,0.5199428399284445,6.3871976513303785,5.7445409520099355,0.9466602432541693,3.1727818522727125,10.980905521112572,14.927616136238058,14.25792032510266,11.657422362222407,13.799101255414392,10.015281285293977,17.21383127988858,3.9876535458548323,5.411616084460875,2.637712707127551,16.904111787893573,4.8619530687362955,2.309962897545672,3.8766899325923143,3.80447733050163,19.8309010313653,6.779922087877801,4.445635369591132,4.540631494976406,0.8391686452369607,15.86741387458883,4.693627459929561,8.930848040829463,15.744041244751372,3.5306836980975564,1.7817264535263355,7.288175643131147,18.928459624761757,2.5213516625682875,13.045180059597685,14.867102166070367,0.8312556541313931,11.155700589702167,9.054149705115133,18.490003090794378,16.7397542728856,17.719756118986094,5.48998935490443,10.486079224336029,6.129864470932578,7.483236377690434,10.879279394062769,16.738531129105493,3.9216233348969176,8.827124151235672,10.04599172287785,14.834860664378544,14.312225876859115,15.533110015290763,2.06228823650636,19.411656074963823,6.934500959298604,14.993176622358302,8.708688473433511,10.158553712139774,7.314745195379038,8.812935790359603,10.43322967216254,1.2019623207566132,10.674854988333834,11.02237217373112,14.800458908845231,12.452854094076816,12.843824932299274,14.317259791591868,2.9092109400716026,1.584017614772475,0.021705996254244297,15.561032087349496,14.909627514782482,13.689775746470874,5.400171751200693,16.764756545800434,7.548485606999851,5.784305287449745,14.857971777632851,1.0878606770212196,9.114688805663134,7.2577921119429645,15.115043607616606,10.170280185188565,1.1198458067832995,10.449909357453432,16.718090341769507,16.089785722939332,4.084703892847119,0.3767974621879233,19.361409189313896,3.5959097246720084,19.399516413581864,16.539124853538123,14.847157564276472,15.020814971199208,5.021249373741408,1.7735250280947268,8.096156311431745,19.263859097694933,1.1061828722087208,19.428965923085432,13.50956564262098,11.643824883291423,19.029762742837843,9.183661251451491,10.678081679633191,18.24149178081331,1.71765827508644,14.432461346434199,15.194677597541993,5.954488189002034,9.982761170165112,3.1918676872623752,16.663697749560278,18.834946789600973,19.768091331555265,19.416179765289957,8.726581892826356,16.616310697639843,9.307511980407494,0.4580157181740452,18.00688460560913,0.9036977069456364,4.685395370519534,5.518450988862091,4.810963273821667,12.940228774266558,13.409399089042711,10.202381096722949,13.099581754896207,3.2389136985209444,7.07153126124382,18.86074170595711,0.9046138695939199,1.59308535610875,5.4770408959993855,2.969610916843086,8.907696726865296,10.932213820939594,1.2978842667905566,7.342756031154409,12.940006905609739,12.604303214459707,2.14975915899553,8.814556858665728,5.368570356813991,7.395524696317608,3.1979544859869735,19.00092618962333,4.940728525402629,16.927910248219597,0.2912373144770175,17.56271703114969,1.1963885893536652,1.3732932994825076,11.626835275962932,15.690823859682421,0.6384765419238336,12.735812628830953,4.307411138572159,2.4375714760583556,18.147497558925878,7.5097413802316915,7.077170526768,4.718016090313251,7.482336605506927,12.472053600477825,13.873575529340378,3.7125058783196696,9.256113027121863,6.16660037693765,9.061719429380366,19.685045503035248,5.464589414431362,16.270827922848653,9.127378779927223,9.719399093725961,3.125563240882263,4.596903169962183,3.3217162716723925,10.136818332673014,8.611650904059447,12.2327163343434,9.721053553110632,8.534323885922648,17.623702485347344,9.448324198591047,7.705552166565468,15.84512880815248,12.353903607053667,19.642418808111486,7.10113730450157,7.834315689844824,3.7768812972347243,15.328295207961965,8.10925506579505,13.116392938677123,14.543776556506796,11.636571862721382,3.015628115104154,0.7565582210119093,11.238035810395273,11.354689436115581,2.283790633117486,13.265122260941942,8.108419235522186,12.931360816746897,15.242875506412252,1.2696234617430813,1.443875178263112,4.493511227398783,5.686720549864632,15.425951840291155,17.37273748794861,9.120928763141922,6.464441254362812,13.418778922173225,7.010702325642804,9.049758770223217,5.681632317197378,8.81718704302395,4.572793894987424,6.092883319010376,7.121818965208204,17.25464818006385,14.066718936357056,10.72066142984509,0.2974463817247974,13.506805559757687,11.787176522755622,16.913612243730924,13.51660155835651,10.889960491477456,18.17977556553004,17.670259215792274,5.5689931145379035,13.984933379970466,19.68833287530579,19.755247964710875,8.220043119312233,4.249246252625545,17.977523784938455,17.17414225166972,14.52688132196933,14.045167952390027,3.6377916713160596,4.410325629697156,12.888584930932456,2.0247857823602367,5.132626779474014,4.0286676929631815,10.280742863488083,14.5293372183327,11.982256798945436,2.4811792457702575,0.4537619709838747,15.904664652856258,14.870188977636998,6.285832673142107,8.458429917815229,14.28746638363231,6.390114183808491,8.991184786207436,0.0433008346579733,2.450520363946458,5.67305356579364,1.8825068170504489,3.0360005037649485,0.5916928044859704,12.7583721976788,17.66972231148231,10.876846000472096,12.012046330643521,3.7707576237889606,13.238510554340056,6.85389757103358,6.11433910852015,13.072118799547106,10.705795227567009,0.4000226163431675,7.860631961683713,18.059666422119843,12.635963609619631,14.75645748349763,4.810435932249408,5.166984656187652,10.649726239024764,4.050733397906732,16.655107108745252,8.586564355683812,13.781970873444426,3.5011975920115646,10.116285786833537,12.711383775322354,1.8372781382563197,14.961107682775978,2.4072336978230746,2.234909374695566,3.1849098601081494,3.2840647785362,4.651096232072778,17.62339621455154,10.146860529373424,11.962369181139906,16.22988611152866,2.079845219841596,12.13173359310749,13.129668086253222,4.219244985565314,6.981221215343356,4.378336968261678,19.306191446110116,9.895255763706402,17.074650123675454,16.373584064022285,0.9182460239028511,5.069268771587487,10.68687926309375,18.20188622769709,2.349061531992569,3.3645413073361308,0.9074987680318891,8.524938377621044,8.50028599075162,16.054312672390946,10.307283213316708,2.2219188794267763,9.88357952197684,9.879678786751045,3.7648566330137623,1.5006718695665722,2.130467694115117,18.543044501124708,9.382361391719694,0.33830471670406315,8.043577363824209,3.2701752736431944,3.594249953138031,7.025267306195726,6.750776915139576,15.414815167801432,8.151623666501369,1.9626141578965361,14.804339502787984,18.172169717967602,14.895484580365842,11.017545120616838,11.754033817205807,14.646469048541686,5.1647671546009954,10.297796544146136,0.7224678147006314,14.732482700463066,6.000257005877887,18.580451660597532,11.586035172449236,17.69847067719841,1.6847003093748114,8.074859084897712,1.8381534609349615,3.895628504844657,8.70079493732755,0.9980442768906261,2.5343371168729645,9.19648377672245,8.91055265375603,19.965076600816666,2.849414976363298,7.127712334537515,0.8512071747042294,1.9225166929111692,11.167303285888366,1.6615944564205387,6.8094453245905795,2.0031101887777547,0.7972696669537749,2.7696665843346535,9.931516951508993,4.129064246879319,6.302958242481296,5.001501972995124,5.394733966581753,13.471182712262646,6.193554627431168,14.763594992567647,5.161209366539383,15.67438075429151,17.691015368786406,10.46118194775914,0.10796883161503068,6.994233254680009,4.185416424171802,2.5965768286964552,11.656957370528271,11.310666986241994,8.214842458678465,16.120886698932754,9.84696891542809,7.125604693363861,18.72857681382543,3.550605108905942,11.535420067974078,15.68838430028936,18.79848795388066,19.122639144282413,14.848136234369008,8.950050056419595,4.067226307980927,6.674215867640947,12.746694106464872,17.31383434664728,4.990230326533531,0.6897642026107276,18.238494709573185,11.777181481863842,6.934885207942307,4.22285697913003,8.4529594159971,4.921329655292039,11.66764161965002,9.330344258611746,9.247985757995142,18.67249481005368,5.131983079638993,15.205037714855582,8.973888658365352,16.30345617416709,18.59168546449365,15.213959433933937,9.457622408050504,16.074547041817326,12.771702009958585,15.875501990002467,7.724018311314413,9.13223909236812,1.9818497009164515,0.30053184692094614,1.8138177209125006,6.743476093965457,1.5381020408627633,17.42348316484463,5.1923737768359945,13.101009938766413,8.21551107745918,6.805810270578294,11.976531527026065,19.535428500794247,6.677954858513244,17.759359990394515,17.55699634629495,9.123927288693858,17.225287966049706,13.204806321830391,0.5071861484145712,1.248917906551772,19.175307164472844,0.7914178358571089,16.935298282954424,8.841349754584261,17.60612602802512,7.208959666749641,13.712661842174722,18.551031129885555,2.7744727342975306,2.966858370174319,5.24789589223194,18.40602747660189,7.306190352015558,12.353401310106396,16.27645638420535,15.15425008429268,7.99053266193984,16.5409486427545,12.537984513625338,14.77039876756493,4.635160670881846,11.206644163995652,2.275527017364003,19.091204750104897,10.022236057230645,12.931419395412806,12.857405455115725,16.389073320939783,19.17036988660719,1.2979145285112859,12.999582926643086,16.68784626494756,6.9312310903853325,9.089875902314652,3.522329786023719,15.01225469997657,2.270453640667438,17.242544976313248,18.52173169691146,2.3841207874646964,1.8129730098833674,9.745978037291817,10.631084696989866,19.27183245325509,0.0073440141832969985,10.272816282758637,7.335452231859776,8.489122651568369,5.917071766711195,0.06992981153838507,17.808772436672506,16.475542642186156,0.5930864586321727,14.058517712546866,8.923152223879235,13.836647177000522,9.223800147468403,6.720895827758571,4.443981019723773,0.6089220189413691,4.823823760710559,6.23263237705185,13.809643383082522,8.04011428650513,15.253775628088718,12.19241886809781,9.227565460984394,8.045831269409828,14.66787598591079,0.19606152561047363,15.394026242346257,3.2121655270470706,2.0337013928393555,8.376165628529119,13.32834424727225,18.818204877208416,4.418385529219444,0.7921358775237941,3.9988834630691894,16.515317697623637,1.6382472727587327,17.151472762809043,17.2259505270382,10.082450649285711,16.603102104061826,1.3309123922360389,18.913861955187162,9.037011417687681,13.222747576377177,13.218519259691597,14.256531811282493,6.435205172220408,9.355953262395786,0.024435630928691943,6.003566472427271,16.54334897262803,17.072110969432256,9.465419497763467,17.31746950643395,5.1178468302230895,15.46603262039525,2.657796193239026,9.349817590149163,14.7228614894955,11.865199640836854,3.0548526126629083,13.7514729469064,14.92896154937931,1.700243317008212,16.681733304864174,3.464961335398833,3.289928649462359,4.05663474797942,1.9422291784906642,14.715296865351029,3.951769577026081,10.658095829292025,6.146766044199614,14.231562483142595,18.767415221537874,17.69624724901853,14.844148706585214,14.088907013730587,14.349089747963507,15.900755350827826,10.156663737392249,8.641822054918226,0.5487664925854219,9.898924925548895,18.102919259539718,4.659808891971515,16.21322819816539,0.07469935397372396,11.213420514754784,16.593555733898384,3.4556687363569427,9.150765488456262,18.19241295789173,11.156208981037414,9.572042556777433,8.3290421001547,9.397835261712192,12.133161292685193,15.335840305182561,16.836178759741628,4.706439706702374,19.903390115539544,15.067359271877155,15.394434139537378,0.9089114247906149,19.552048638336554,4.627400349037987,2.6514842533945204,9.86911754396309,17.785152080583778,16.949156451255078,10.941903480576723,17.38243290188928,10.580629982877085,14.131191120990593,7.131363144795908,5.3192668558134315,12.096650142309233,8.584321034271575,9.479508951042694,19.153276159427087,8.577011605664534,4.874705048750929,4.64831938389878,1.1102371287950463,6.905580094850565,0.6622797174436545,13.62721593600753,5.46313998718754,12.257050251884248,7.866588626467026,17.088328275729488,11.45423794893568,2.685039860106282,1.361449608907197,13.37595591043665,13.211278116847636,15.433762985491555,10.867935374173157,19.75833023249312,5.282709197078965,19.490561576457463,1.3308395292579034,6.540839239451022,0.8980877804280052,10.306292787841883,7.465220577738609,0.8079557856132435,6.914109640409918,18.146158418602774,2.899798090768413,4.252364909881092,12.232399615955721,3.864103321901058,2.0601208936411597,5.549347592230007,0.2362784554939834,0.1783969695132992,14.772541841954613,4.615571895756392,0.4277611896921396,19.170877058141336,5.433930544581869,11.414619909112332,10.144892070703872,8.259376286208667,13.495428142084025,12.286361305541886,5.367889025557542,3.932435990976253,16.386530301152522,3.3931462215734642,8.696178920055267,4.466359829468574,5.928269500722383,9.692668423781093,17.56460269808236,1.6537326040164935,0.0719761210050196,14.879111011556505,0.09709536108277739,13.75054767557733,9.428281834616307,3.071381159783728,3.805047242335453,11.186003310386994,18.000268648649765,8.732492964979057,5.760169181033095,18.322918715823025,13.108438719161368,10.41442660171513,12.849270681247003,13.266587680381097,4.299628115319534,12.138456218908065,16.0569773704465,18.22422882136761,13.197264408206504,4.450370752362249,8.2971051642624,5.983745612874518,18.834974129818374,4.26504969178068,13.42929059733827,13.224796384215587,14.58393159387903,10.307493927635463,19.043184887838645,9.332106472565073,13.456621180077924,0.3750394209519792,19.817780007683695,13.598242417868182,7.107879588915309,13.486950574022597,10.925987002736989,0.994920172687701,7.079972862880868,0.9745686678449772,15.2247793944376,13.087594426451048,7.220662027210989,7.939598885647325,6.148921669317753,5.758002938164419,13.73936418523722,0.6482904248284838,13.814433824825505,4.43182339895869,9.290725536335295,9.081397855058189,4.712315304115706,8.82699352642836,5.7597023748687315,0.3714659636780704,18.02930317898268,5.981435896231462,7.267317304093428,0.44573288046509063,11.94986444449536,15.274807330864185,12.511514256172532,14.764067183773868,0.40992234450601295,10.31333281656114,17.14190833155712,11.466092071821148,19.22017406402261,6.7993707771630785,5.308585547300062,15.326959250265212,2.5941263152404836,15.470040987236061,10.487244539320448,3.920455074060043,7.977641465195151,8.675474448382614,11.560497844465264,6.94827269780133,13.03475581095027,2.022344327679839,16.170231182563185,18.398646038959434,11.172851885891951,2.2466864356817196,18.04181331014007,1.6569741488110878,17.793282844953836,6.171390751513015,16.222510527068135,15.675346440334227,9.928967548552352,9.497508558781803,10.720582411947195,0.9079634373183865,7.962591138660748,8.528561425905057,6.03955982768448,7.223072541958926,5.580082484290796,11.769262676650975,12.93889200603742,1.8424976765115808,16.8745285506154,19.087148217320905,8.535614679389738,10.229431446148318,18.419948935229336,0.34954510243427883,1.2898243004302534,0.8937950129042926,2.676190259409208,1.022067763880159,12.127522919229108]}
},{}],70:[function(require,module,exports){
module.exports={"expected":[null,null,null,-2.2064783689677467,-4.002950653372424,-3.24291868970292,-3.5532089484545537,null,null,-3.210832455958224,null,null,null,null,null,null,null,-3.5377587975283555,-2.5537421560350957,-3.3731856344712092,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.4096759609338685,null,null,null,-3.2841973936141526,-3.0088166639306304,null,-3.327192867259588,-3.6883790818164375,null,-3.0983843672520672,-3.573513614662832,-2.944844668451646,null,-4.001596860175853,null,-3.771530257763427,-2.923030480554748,null,null,-3.8686086268610023,-1.623424152117765,null,-3.014284039701727,null,-3.5837596190210705,null,-4.0464214024689245,null,null,null,null,null,-4.060739883513959,null,-3.910404617758487,null,-3.583459204366757,null,-3.832184162518182,null,null,null,null,-3.1716519906591545,null,-3.368686247019096,null,null,-3.25538331672006,null,null,null,null,null,null,null,null,null,null,-3.7035902098803524,null,null,null,-3.48818864617476,null,-3.4113750179975098,null,null,null,null,-3.711015913273907,-3.390200373443532,null,null,null,null,-3.8685076523025215,-2.5871815399516898,null,-3.339430899526776,null,null,null,null,-3.9897900259476176,null,null,null,null,null,null,null,null,null,null,-3.9944285680667804,null,null,null,null,null,null,null,null,null,null,-2.1871253795275116,null,null,-3.1508824001590554,-3.693062146561436,null,null,-3.297725344469315,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-4.041546757314061,null,null,null,null,null,null,null,-3.9774391155054785,null,null,-3.331258125540118,null,null,null,null,null,-3.5728485112131,-3.961183492497926,null,null,null,-2.5772250962481786,null,null,null,-3.4865653056587407,-2.779273130550478,null,-2.5513181097146473,null,null,null,null,null,null,null,-3.1790593531082463,-3.9930146284470345,null,null,-1.8397873647080085,null,null,null,null,null,null,null,null,null,null,null,-3.8753069827236466,null,null,null,null,null,null,null,-3.4320241602926416,null,null,null,null,null,null,null,-3.5750376866404565,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.862898458728531,-2.6998308935196573,null,null,null,null,null,null,null,null,-3.913178571842372,null,null,null,null,null,null,-3.836881695282262,null,null,null,null,null,null,-3.642743710806145,-2.3748127675474873,null,null,null,null,-1.6538096547432777,-2.699056751498967,null,null,null,null,-3.289139548854102,null,null,null,null,-3.7820636154524747,null,null,null,null,-3.910591829602752,-2.007353866584757,-3.988619259689396,null,null,-3.790609485117998,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.904906885190888,null,null,-3.7691188548141517,null,-3.8146410847931813,null,-3.666312990851951,-3.889287372943408,null,null,null,null,null,null,null,null,-3.3294574691305225,null,null,null,null,null,null,null,null,null,null,-4.0324712009856905,null,null,null,null,null,null,null,null,-3.972621344511203,null,null,null,null,null,-3.947724972468672,null,null,null,-3.8539118949126516,null,-2.928230060471483,-3.9811312579062905,null,null,null,null,null,-3.1125246736521475,null,null,null,-4.006437691776819,null,null,null,-2.079711149606669,null,null,null,null,null,-3.9022832241579897,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.5036927413989165,-2.956714272198644,null,null,null,null,-2.399650489607211,null,null,null,null,null,null,null,null,null,null,null,null,null,-4.0534073882962245,null,null,null,null,null,-2.867269623859605,null,-3.4165827874301113,null,null,null,null,null,-3.9172940528255893,null,null,-3.908287880166413,null,null,-2.2400452927991745,null,null,null,null,null,-2.5286918731490378,null,null,-3.9192051491204465,null,null,-1.3300075745085884,null,null,-2.627070790184429,null,null,null,null,null,null,-3.9498002986523826,null,null,-3.9047320369600147,null,null,-3.941752295183446,null,-2.698097697364144,null,-2.711942356050784,null,null,null,null,null,null,null,null,null,null,null,-3.178559784405217,null,null,-2.4156912835369777,null,null,null,-3.121608679149298,null,null,null,-2.7115469748181784,null,null,-3.8412598607728397,null,null,null,null,null,null,null,-4.098444689370942,null,null,null,null,null,-3.4821931333541345,null,-3.079419320078221,null,null,null,null,-3.8705196703565603,-3.372590142047227,null,null,null,null,null,null,null,null,null,null,null,-3.8333101952775115,null,null,null,-3.3925070165624946,null,null,null,null,null,null,-3.710420835317886,null,null,null,null,null,-2.189628544677797,null,-4.1277982226583445,-3.851163225912134,null,null,null,null,-3.9659954662502637,null,null,-3.1253752634917182,null,null,null,null,-3.580738342567366,null,null,null,null,null,null,-3.1021437551515314,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.2491349995229273,null,null,-3.3888564559670105,null,null,-3.8658051617194964,null,null,null,null,null,null,-3.714959226602301,-3.1736285917679368,null,-3.229262755602062,null,null,null,null,null,-3.7018454545034274,-3.6837662029928433,null,null,-3.52267484607182,null,null,null,null,null,null,-3.9728415792403444,null,null,null,null,null,-2.8083457763195643,-2.2154674126389886,null,null,null,null,-3.9675169053060504,-3.762867830906295,null,null,null,-3.626377533939273,null,null,null,-4.013120953043316,null,null,null,null,null,null,null,-2.143557084010669,null,null,null,null,null,null,null,null,-3.7997388889764956,null,null,null,null,null,null,-3.5163669366511794,null,null,null,-3.832914363711679,null,null,null,-3.245081967263335,null,-2.9738736564404324,null,null,-3.9675993562141487,null,null,null,null,null,null,null,null,null,null,null,null,-2.5781511629162903,null,-1.7337276090697202,null,null,null,null,null,null,-3.630536713654833,null,null,null,null,null,null,null,-3.7357252500033766,null,null,null,null,null,null,null,-3.474707620909924,null,null,null,null,null,null,null,null,-3.2572713946410126,null,-4.088046336851602,null,null,-2.9141238226109136,null,null,-3.9016151261999665,null,null,-2.9754616326518524,null,null,null,null,null,null,null,null,null,null,null,-2.6479130127073036,null,-3.6873983197594464,null,null,null,null,null,null,null,null,null,null,-2.348590209264481,null,null,null,null,null,null,null,-3.5163537783121273,null,null,null,null,null,null,null,null,-3.318224630228227,null,-3.381231718990449,null,null,-2.4311896151379893,null,null,null,null,null,null,null,null,null,-3.548396985511804,null,null,-2.3306154519297686,null,null,null,null,-3.5520305216724406,null,null,-2.4758970460162164,null,null,-2.7357349910214426,null,-3.568614326482181,null,null,null,null,null,null,null,-3.9964647058243674,null,null,null,null,-4.010381881309417,-3.5334820200245662,null,null,null,null,-3.2730023913295074,null,null,-3.3427785431411996,null,null,null,null,null,null,-3.720674085720673,null,null,null,null,null,null,null,null,null,-2.97802174055146,null,null,null,null,-3.873726398426175,null,null,null,null,null,null,null,null,null,null,null,null,-3.6156361384497124,null,null,null,null,null,-3.787453357088565,null,null,null,null,null,null,null,null,null,-3.9727184165404754,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.867791814721974,null,null,null,null,null,null,null,null,null,-3.6915754488735297,-2.628368655232361,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.0462667092548585,-3.791773253020236,null,null,-3.2221708666030224,-3.625059960263492,-3.988505781980236,null,null,null,-3.643963198828173,null,-3.9637760802476487,-3.609055854126167,null,null,null,null,null,-3.6625994107797935,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"x":[15.375264686357749,96.60268700855667,91.17974683873827,8.85321306508773,33.79379205473998,30.314898783282462,21.90882048780365,83.33367490255807,34.794959012714074,21.62842491619874,93.5601135429135,85.36021881102542,43.85050904302783,3.974047783335277,76.03601900028025,98.65249444578225,98.66027409756238,22.383335538308046,3.0607105883394103,13.433608815874742,62.23982819738401,52.926841779886466,70.7830237227721,73.67214238426118,5.853053619489756,47.873805697106285,47.00239912141584,61.90796707196715,95.67892579917749,60.00680688835931,28.612342488495823,38.584251124775506,37.66777843964011,82.32819231581621,74.25663592558702,15.395788805564138,60.4823518031997,78.9029052204911,4.681270197469156,67.11540122710282,19.93374820591751,59.55607332792905,41.515260323522554,37.992777135513414,9.135371443896734,86.21312469051385,38.09225688626614,15.379547154680973,4.723997431179616,18.105004512916324,46.59381594742735,15.325401676880768,30.867432542756568,72.18330903038866,7.572675529689854,36.7901315806876,11.114398332660569,8.678124994560132,42.428333023118746,83.19081381140903,27.066387108140844,48.06829362383374,57.96482233432587,57.32563949175551,40.64474982893322,6.254772482487492,48.18007892053464,16.40872543898455,57.2490399345881,33.1477818133973,81.36369099138427,46.64623929943248,80.95017985137515,58.912239053190895,56.18202344281489,89.4049609001142,7.9225594979854375,13.566194828998345,90.25257956316031,23.227489228513853,44.570598505372104,18.68690830430364,68.132770345883,39.14647362112722,69.31109946228018,75.6499704223206,87.82377321075549,66.99608958803505,25.95250240491296,82.59637614829816,14.52583173269566,37.10018956632517,39.74148585856767,25.66534758103498,57.40415597317763,57.177403426873056,80.41321482614903,1.075581413729898,97.33280098712038,56.44515980955571,48.753997761280864,41.02891776226998,42.10653186546522,68.73736180564154,26.259678520575047,75.69481952798276,2.652560406677651,31.54698439741397,48.2415112165365,98.20575776637936,50.41375681401621,88.9619089195147,93.47551937335656,32.51274058477986,69.54324304145408,5.272242226789325,43.96547081343649,30.682079807870434,35.40822929704888,95.55064694019795,1.5277158606579855,29.149520284955766,22.06681640784891,74.59921692575773,23.98653516350635,46.47713083619516,6.243718488540906,80.66298980029043,18.755185497272684,30.06653558737149,11.719767520127178,69.67007311753545,96.79801357250047,37.90141079707268,3.472026953901053,99.7100516117467,64.116051955003,72.6820572932918,49.27603184556075,30.696324785642524,29.528477266738573,67.79031357853087,50.53541341275203,8.79383826197564,95.970041955555,32.47804374334737,70.71563953220668,79.04636802002555,70.93071052140006,12.799340334208997,93.92717588389934,14.8970271714576,2.239766119671005,36.304216710109905,17.982416939125944,25.44810153184671,54.570152137569885,25.20415693746787,9.659746746741993,65.83865104300052,5.466165065223549,85.1958904507556,95.37816339788662,48.758441879640976,96.43851301625712,41.96180929679636,83.98662273158801,55.31079843285045,51.790187862321524,72.54293062663932,94.62922526143134,90.39753820460541,53.5004781910821,56.21859415754638,99.141634988694,92.10697285178058,70.98579409749578,34.346078454092385,65.93053836826364,75.78829084572033,24.037727275170685,52.9525114354505,11.804720449886652,85.14564609133761,59.261698680285654,68.21235398756926,43.138911273577854,82.68182531771826,39.67355489536526,33.071318335063296,90.03103012771405,22.715551910440034,61.9543708071945,82.3033758826497,68.3436134279128,55.047418517346244,56.93065528693435,9.435559584007947,43.9332468183901,51.61920884677333,47.92363695759852,89.86887800850849,15.01640937543911,93.47192168959648,43.91344689287846,45.863365284762715,21.201300394804477,20.533726218523675,48.582134660106746,5.6668060674009535,34.51387105469408,60.24052867807042,83.94781967645713,3.8663578143044885,99.18797542940834,7.910357306781579,56.75165153244175,18.209030105982492,32.44612481041236,6.245791850462901,49.83834004014784,12.79390074310751,3.3848062738144113,57.48693334916097,82.47070330637851,85.5289290502954,69.87887019113901,37.600955727502885,88.3153160495371,92.77483481365998,88.51152248581917,85.01973510141887,80.96036450558974,40.57738888101496,55.4693620570528,72.1433416711009,10.062819136317191,53.19775298847866,63.977176358761255,26.593305209431218,66.50518528212264,52.57670536456995,69.84857145939225,50.51244962556369,53.34706683021131,55.5427502984938,56.11934209497191,70.0895419354866,7.0915781478053885,6.313535806864579,29.73558683573765,80.26560214422658,71.21895130344969,85.96052388223552,0.6049448105039934,73.54741431459348,83.8944041982372,89.84617382389585,8.524401283091487,28.538687915159656,87.56342443608591,37.2867489676171,71.78299565867161,99.61345145469697,72.17247693506921,23.03608716438137,9.533498910717242,44.60117709057032,47.0962671001234,55.7701675332317,61.863233272381855,95.44962528058096,66.66962021033133,35.972195219550684,71.55477382663184,39.08391984222514,79.89205320980494,75.13271193191389,68.50519811274584,56.82904631993204,52.949359138560496,9.462974284386494,28.23352416897633,93.11589613708462,76.5977407884854,73.3830782514035,47.52917194744634,36.89109501592558,81.45563134470619,24.400462496345042,21.81442753321985,7.1969849777879125,92.89403912592424,75.26722671839498,44.20901664009007,13.766061598866685,14.350914391748425,32.56265720199576,99.10542143453907,60.4989286339173,82.69603912965798,3.68223275342463,92.12877480869889,65.77667775198024,26.422679152977246,72.47316043994039,18.034442620417003,1.828775512830938,12.844246196231879,67.29047104417056,59.85434357890467,34.028681870879396,5.516650133510859,39.1248748504329,69.30577738707477,43.95570386031362,26.776629453691324,55.711852474186415,70.49445841454755,46.07979838490015,70.08582847761149,63.7345861939989,17.09117015187185,94.83943214410398,35.21606595844013,4.671076251278783,95.74498092590859,40.050192413794306,1.1751665844181858,38.83008634179457,59.645437579459724,60.03815236696604,1.547634489167482,22.929613357006563,69.28541792339502,91.14207036972782,87.40524776883692,77.7850037353088,85.15884150729408,83.72271582315595,68.22612530316327,79.91706466445521,57.910425548031256,48.64069091353676,40.49273618745926,6.56721875757762,4.734459689422144,74.59698783028388,77.83557047501029,27.660910296841834,29.967494632416347,25.692896883972182,0.41541387001327035,8.876624020326652,22.693643274918184,54.36133224232713,65.6596038450713,4.998497847534833,94.7121870515514,90.27005614133756,72.97373313247675,27.04954092664209,38.38901650146358,35.044014762487905,15.345442341119453,33.39779347627674,81.06728375905298,30.67223957237928,69.75684840136154,53.0292142216513,35.716851148969475,49.08739911202944,84.35397941962917,28.27550997356969,31.356579004094918,47.896672668375714,49.39091246834082,72.7701211189258,74.24509356643243,95.78593581523005,76.97857638635033,48.36378553437293,45.47949724821547,21.132520011173362,42.78446569557215,37.88588150473693,45.560171928735336,70.12153689412106,52.734985983445966,18.955450100860904,92.20293602690373,45.13658835044303,87.25851882049692,27.18782785558933,42.83375303139181,44.12087085760403,19.294487787102078,48.25884544826295,50.676444369204,7.990628081760898,81.41913193007025,93.83828023503811,38.27961489934311,44.20447621745909,9.459200401672163,77.50313860430902,21.06541299786091,37.987228845529295,90.19275382352494,4.202350792669285,11.588837144819841,39.97455284145024,79.7335864543292,98.40202488505663,72.04720997840566,56.00093185623698,31.62538008750786,23.17806834882681,82.8073599565095,41.39589527537255,26.28588489076382,75.86858127863864,57.936644724242626,13.013830616799659,40.625973310107085,67.2927870532663,81.09685120082288,86.82754446375426,53.31476451273887,47.933502254895345,71.72692957899784,86.97515798949836,47.610279778580924,43.389292970002266,69.96714025952313,19.34845071510076,8.583869506915542,69.62400131682924,42.065513660315766,11.431521602760908,57.22816676661577,21.096896045677973,76.92776839808467,52.48124999727759,11.174062865185942,32.00508962600595,98.98397207118438,44.19389030164418,89.54675111762775,91.75940465257418,46.55010692709878,53.972701684596515,66.74506477428346,33.48182949254872,87.70920951988568,31.56203935037343,70.21650474506981,63.58328003955847,51.79080544967049,81.76106738638387,36.83091495076758,24.977064206612297,73.3083935019342,27.87954129600676,55.202368970234936,76.46675202560651,60.64042725572065,24.11856475140821,39.03740026548319,17.78415830182287,60.93812509919132,35.76620616461397,23.482450902968854,77.92663899571058,72.734516167511,39.06358456832177,2.196426961155762,49.65903434268473,46.669791050319674,86.76714505617085,1.016981410673834,32.29410486017503,69.05327005269837,84.93974210580171,16.447176482854765,82.61791602888444,37.89696945770116,2.0876854878368434,50.349601415699105,82.59920975196657,29.89176785611205,55.32102377544259,64.57910706190675,79.0263493282873,77.47088321178246,66.01812568300684,67.05982843367069,45.410802738283216,47.11055770823786,79.98466610220125,19.81404012810104,43.97686708546624,0.6767319935808036,23.544454277704663,29.400201378077174,8.662166297203822,85.28317097282961,6.037993284398935,72.07917126214814,10.304028586258983,64.6421290930648,65.15852520877937,75.83545976292272,71.07910084984891,35.27255422239553,62.99042776884218,7.508881963850267,49.752093739927304,30.195852944418178,20.6161462087046,45.3239221042304,7.929224036896554,33.055464770094225,48.14308924541655,89.99521818848997,17.70011755110015,11.151443143237172,65.08620000894551,65.90035290855442,77.58573768496422,31.24408155937253,38.47726989443749,3.297789250349159,39.4074876547146,2.630508066142312,50.161346191658836,54.312932869912636,98.07078591617883,85.47764288541259,76.06078056055465,54.527290782865556,30.911281655834344,72.87258417122386,43.746099852396995,77.37728378306896,98.30664393093504,75.37960791226641,24.648760323847686,42.3896488377824,5.4404056674089984,47.96269541156808,88.29600852165942,24.018661840869427,84.19104791202945,25.93403476522429,11.119985739807369,92.8155060064773,76.87760318206468,51.776920432243756,27.082468665849312,45.2598110824334,83.46697612686135,48.14087150067898,62.24775714012023,93.68827606210391,60.64944160069956,48.16193801810733,13.21506873682885,41.701593099242665,71.97491920033588,75.9764364889918,37.61403445699551,58.37932093347047,40.595200003873465,71.27641838143843,34.322904536990585,31.946692281227172,11.210031545952436,21.549592704470832,40.90520988729731,81.82314509099349,48.34431771397363,46.57030556883146,50.87264411598225,33.16228322317119,38.319930508662495,24.951950713259443,25.940771810816578,30.635764085315408,90.94112303147368,84.48662025476324,52.04803188111704,31.54979478970532,10.51067607299887,86.33250887138611,13.2266130813953,90.83036986528954,95.37293992732549,97.96964514158837,85.54323013320155,38.835671090553745,87.67971507344143,56.065446483163804,14.642474941779572,98.62440464817068,83.51373963965918,3.634886286274308,35.244102825665905,0.3260945055551412,97.36390490675136,40.407060768793414,86.88944597089633,16.95856992124498,33.82035113002972,36.78872814420884,98.94024055290545,81.76119462195031,29.529806217777633,62.496279103379806,89.91880433751729,32.50670067596231,45.31798870427575,86.42992289137075,26.4879330062302,29.297204758604977,96.31929330320325,25.934462913104905,43.41975825994238,51.87781334873678,37.16520236952812,74.00264731149169,49.60178411498195,39.03279796273613,45.18202016766626,17.2270691041178,74.85995208986822,33.681629459146436,17.800717070981896,71.66277091232772,13.795699517009808,61.15040264881699,73.07754783279282,6.681491917492854,91.71396109154814,10.370132983248714,12.007983068616678,30.43370144424127,29.18137605406057,92.53292117057319,34.472379253383004,95.24328983030708,54.02782440601604,96.49958317406777,31.8831130644432,48.66051984735786,83.8185526816218,32.20288138297776,92.43220155672876,64.65653071046043,90.93120793123659,8.850194292693448,69.04737213699998,18.378920227934614,15.396775400725593,91.57125243704063,69.59211024370646,41.111986426768986,84.0042261618096,25.32061556911145,29.33035504005499,46.05741137417421,8.733593210673419,37.153032966028654,24.087319886061277,29.462929714746554,3.003688469540955,47.040408066246385,37.10081492369355,62.000684593230694,43.89187221996067,12.337362929595663,44.080057685535,54.93669044135159,68.73532500148912,40.07972925053534,14.926494087969155,59.506634401304304,3.9119907513805563,14.824359671475795,4.3787943540075425,27.34303429762397,17.12257150282479,33.58474212787148,4.956155080773694,35.180563893793334,32.525682133769784,33.118565655986856,63.32495893033625,64.83699027136088,27.01672814015503,45.167725814797535,37.890591095451676,70.25407959498501,68.61795191487793,52.32293767432434,14.788755151039013,98.77414961900422,50.9298609548811,51.10232073953922,27.70709134519138,74.1671448461658,11.379650254990747,64.78539929162164,79.69079096903708,31.299547593136335,98.1447126998081,59.15366871927657,96.77493940227544,6.481206618047142,17.414704445114303,2.1204003074245303,54.49655324407241,54.18917572158362,62.69367439089832,80.50788215496758,48.79599733531443,7.390175088762252,1.0871414031838222,71.43506276157036,13.712518623388936,72.4426216920338,47.09118090150495,20.70818229463256,74.27484165322737,78.40122515991459,90.07192162739098,14.439951660226003,67.18978214802188,81.25587244180679,89.56769062789134,81.29072231305499,98.05003029830304,72.08168336495508,54.74551132038539,18.243548156732125,51.14554292579017,75.55708815294177,59.40388276117865,36.18160712100356,4.8650377895519625,96.97548971362097,51.71621859275033,34.819563722198275,80.63905405632646,40.146143937501265,49.87513618231829,70.26069387897202,22.28593628745714,57.66318083135194,15.80405933640483,74.48739174404753,6.970193467979802,3.47171772443724,26.70225622851008,90.45394561271831,42.709396721056045,24.84677738123171,83.63566982872206,10.85780824163507,19.626593572407415,56.050963589804816,45.59076727152389,10.4966382655989,2.9651446593240927,78.2159107176829,73.60217473301982,81.76680061369875,75.13538678419597,68.43851851584309,66.97270935125643,67.07032361147745,97.40595750616016,48.503028315354044,72.90177199790047,37.81616180964507,59.191413787511536,27.393189686098363,92.57638875058545,20.69012621065911,93.50889385559793,7.101776594115039,92.28594054043648,5.415631190609282,58.94357492627948,62.23346091001582,63.26350644913943,82.20343168832976,3.9045891955820977,70.76362374131757,51.70314277323922,65.67401470659217,58.17680619813903,62.43543583119546,65.5931802690064,49.92267924613427,23.638631893723417,89.07845906812048,99.56315446064498,2.467535224399442,56.213016037371254,78.91241397581688,43.58417637748857,85.21040005713347,17.090317156667602,33.63097002258782,23.516779664428867,30.70869773087386,81.87750309596598,92.97457954814845,29.366208945758345,6.766546019358199,51.655422382100326,44.533086064072606,44.75561935188204,0.44720906384021486,81.02335683394703,80.05616873229648,2.2695378272973077,89.79229165332671,14.906200872314335,58.43763332903686,93.23838964964872,20.93287219237945,79.52230893190728,9.231553905216504,55.77914971073228,67.56413904945569,39.75786153023408,37.71789453146286,87.31898518182975,31.268926878081803,86.87827333573432,54.74992526541631,21.809847045245956,13.74839107589656,17.11728483579611,1.5393049697377759,8.884467138314921,25.659825704907348,91.72145484540522,68.4788343421403,74.34126575614148,40.13724288301903,35.25519227063434,86.61687030520594,34.58955529912191,97.25595322745644,29.458220874121068,30.54911033570886,32.1066389377004,7.769987990622607,7.169705841096108,89.39169833944737,48.92410110842298,16.110493173828576,69.606843839297,64.9692657125768,31.196871352799562,57.514618135021145,63.522568658909265,70.56024691304175,48.35014063684662,91.39980531208103,87.61129083530103,11.812402640504494,14.815504636824638,25.445514871643304,22.856904030815084,67.68647093532039,65.57529998041063,51.338456941077084,66.40732072708653,48.51911496535879,90.49824436425682,34.119793446426016,64.66642925224069,49.75425941165885,35.46253474135676,67.33229841630168,20.670454358893565,5.9326047416021765,71.36627484297324,77.92095277230912,70.64655212216829,72.48138390392714,41.56840615590098,61.093220434894334,72.2749263735637,34.82021111106211,73.17048575811123,62.70251967036682,40.43226466808771,27.411765990152936,62.56274812696405,29.889152428321285,74.48236727427417,75.89300625942741,72.40021979307379,13.321860138053054,2.72623387398645,60.486521159017826,41.086792885198406,90.88956995606823,87.17012662867414,37.53115044945681,72.3943825763092,70.91794982053258,1.9226490866085078,22.08762682546861,54.216940057350335,92.81991554445818,96.00405751806922,62.0222064211605,87.84433769589582,48.83396034474949,42.51163696021018,92.40338032695239,58.153483269621574,5.919663464712155,49.90203759288758,98.07625948396613,38.38716712664265,96.06379895190193,68.37886757171172,2.151192345826902,23.362799900272147,5.467554213500514,55.385718137549624,1.27992051473802,57.55215285694357,3.6379224340593375,47.58249277797011,45.80531382242987,43.91840722407221,61.98835017332014,22.401290551896437,19.352345790662117,55.89119117278207,21.964417181146366,87.49024970594984,57.66259515863648,55.201764125109776,4.876840139346328,3.3331323119957235,90.86604731422358,36.62163411380881,16.599066708221354,24.849834388623336,57.67061407985263,48.84535504736589,66.15378457404472,73.53573377126332,44.298769304487685,48.44468293126349,91.52678928259519,27.32178422790348,22.32280652107026,77.35663001427491,56.60014318062618,23.805064981759983,18.509800655679996,40.12944166255008,67.19740238451504,56.30160984749073,54.45730816902081,24.786360135541564,6.803932602524454,33.540228530060844,26.34611706978771,12.054987343940704,53.347054641482885,83.94888595659924,70.75341769479435,74.76198129520905,24.48064529486025,19.632029403070717,56.79925586420704,87.01495161948864,79.45872684873893,1.2076646365985821,48.08955696939541,82.35793584491591,33.043011741547666,95.12310959073591,37.87240619697463,61.62401413915097,16.636748830624313,87.85520448279098,23.95579558395944,94.76032089676],"b":[27.96579882134692,26.47809422428903,24.503729159540825,11.053771573163509,54.93016938041046,32.54334239130248,39.954255950627555,26.964457893704356,26.137292784424318,53.70391878662671,11.874258865863894,15.906281310655134,36.27053343282997,39.035100098161614,48.968455065541846,38.49281912010999,6.2387421871850535,28.553537571164114,27.820073112941724,36.640112746368416,20.160922996291227,43.6503015954686,20.261825522140697,19.925967586843157,42.162146532853356,34.790664648143725,17.102087953601938,29.160358188085418,16.51802479614325,9.150995352000626,3.084684114696161,6.7111861706479825,28.191652202123876,44.23945669480594,12.348540960919108,25.00100425016955,24.34132235840009,21.49441421779275,31.195943578574962,24.76135929966461,8.778783877326264,32.51429489022794,40.36019077242119,30.842988041258963,19.478878353689062,40.58473433880641,34.38950181347897,22.45302215221095,22.022154242469057,23.254977376148332,42.53945878010387,37.154933997069904,43.22779884516599,38.525319879136255,35.323312837938715,41.6722341729986,23.22252192583199,52.32737989254237,52.726236654345534,33.41172747103148,48.70870802857055,48.983711037565186,8.167178766811624,26.160690391472762,50.635539356643456,28.555855791154784,26.294915879281838,22.12121450049213,23.903942894159428,37.981294431642105,38.55343963430378,58.7926185107081,14.31524791405093,32.04592013344667,45.62269177587522,15.279572612868547,36.35078929274061,39.76040633152939,24.647046148552917,48.90938530285091,31.697078416042654,38.0938070672989,39.552460119268815,47.7022383036048,19.23044420664079,39.7824124791325,23.188418986766663,26.839660633262014,32.89135341679364,19.867001086409097,39.39021967539187,22.135640857610206,17.813993480516565,28.448642719379965,40.356399941253535,32.587522929190754,24.30621329499058,30.553787781771433,50.84018304074495,20.19683463311963,24.42563293872396,14.563109260247073,24.672689925346802,16.945768436476456,39.047721534779036,31.45685717442198,36.829792753903476,21.494591726817738,51.909701738942694,35.815096042083596,52.953521365978546,35.682713613857665,10.811696490302367,10.31946044881844,50.17523381084643,40.18303277564301,46.40639001733996,27.329162055717102,27.18151187355792,10.928299730400925,30.548698218683246,38.509550972947935,25.735374263500784,26.965520535497035,42.20600144524201,25.397094949418417,57.954351757170855,19.482756583092808,9.105922015043078,42.923889602457464,48.13263440738767,23.050162011974876,7.808865802914076,15.704454531304716,34.85689615416851,23.789671559328095,25.526535505488653,13.72747744254787,30.82291500826144,26.408597917955568,53.4627409551841,29.103246217524536,39.55728365851511,29.04180245009089,45.01743271234459,21.68982926635442,11.24361146795561,8.302301681172253,37.53381153581235,47.91843348514345,18.990959404602215,19.14619389739454,25.84618181978076,13.653692494907158,26.41627076608377,51.37292924892866,25.6609179725301,17.301395654061228,20.99201593057352,57.97492961646235,34.20060453301903,21.095393139851197,17.38498688423264,11.333544327485177,27.91171931635026,5.465951277637142,30.119631724906093,39.84271187860019,17.120568294475795,20.63065522937881,50.26321905422182,18.154541296840264,15.060919770913177,15.12982736069227,10.990381624312766,15.410229657222212,48.56132040568614,33.965133567132185,17.104520206983693,48.757551176300076,46.133983511765564,40.35804880504971,43.8128789609702,31.38381735912538,23.225027385064248,23.27033616763255,40.84587425142192,7.3163658975644585,50.234015820682764,20.832213994650395,48.20131569117446,37.86729575454585,47.4231171454762,39.27216935437597,16.458041330037616,13.445354019542219,38.54098025965806,24.481039054080654,53.14341950293638,50.05072660836632,45.39672063706299,50.968109976810965,48.75848587304819,18.17262248382137,33.989058661000314,14.753183151335302,29.5953272342348,25.914472246125413,25.472351001134683,9.19529304479012,32.88065647879918,4.840039533556655,42.03031212873415,19.82065974954182,36.20598625866539,47.41808925565936,4.337867150179129,31.351975359036242,48.33438013021758,35.19150545365305,30.613232828250524,13.176068150100267,44.30515382503451,25.642083986123126,45.04822296129723,26.13223532614648,46.13900697985808,13.646292643657443,21.397550031786302,32.00101525226813,32.20325729612382,45.33101583609123,32.57240778644315,51.66167092345576,50.753074129453466,29.837084384909648,19.63094922952681,19.035166038113445,23.48322996448195,12.441112793616028,12.481217351536085,55.38931702199943,9.620939565074327,26.64527742638898,28.91854335395794,35.463395441022016,3.8010033494987816,44.14956017159058,42.127614949752974,29.83906031101537,16.73492270876533,41.37990097277293,35.52549729406445,9.002201803796389,37.15435463942433,19.80329890963504,17.589486297505708,40.94155082295032,21.33779305522068,27.615658535467485,18.11699492786671,15.136885597043204,24.984093199077925,37.082897627348956,10.097031760874726,48.359676844311736,19.689940923696916,20.467413148479764,19.26572314030741,38.207716738639704,10.920198145409268,31.275159668743328,20.288425224764637,26.86354721152413,12.049292026118149,52.05268982944314,41.778331448670855,32.19990673768285,34.55670448146382,28.829640831500704,24.737042705725468,55.79494609540957,44.4634152150917,46.28917453266449,33.77120412733463,30.79972450335235,22.980856983176086,19.896758745426048,26.897386097643764,36.47643955071551,25.211746039522865,23.286366953321572,40.32034948705062,28.753079902047777,33.018443239046626,14.54736721126693,23.04316400135913,20.208793697897757,52.78389753407619,21.37731643441754,49.98137084295274,29.32591602739825,22.25982330637107,33.282736255231605,4.320577183794612,37.870463436219296,46.07031665263815,49.721878585411815,49.257115129458576,35.60773091551157,32.77152330445622,43.18412410219482,7.521849526778817,52.281980390752445,47.65546102609011,30.676832945008613,48.82784390741719,54.69127130887733,57.75548075985985,37.71679691295065,16.095417651888692,6.037469392488708,13.99435142715384,39.80819955107728,22.68970652671177,14.653622471040352,33.86459662367513,39.76723610134034,35.97868270862848,16.326872614650526,27.627239404119056,12.184353750791717,50.22657758797806,22.42967462545861,26.828870285620457,33.52441645900865,9.51527456976723,19.682719899552758,10.941878597026694,19.893566770206142,15.377176776566039,32.04708758403185,45.44822233491655,18.777892447848043,6.064295590698134,15.466457758448957,14.735026309595325,57.47716785683596,46.91060666569925,49.62009722706182,29.63357923982238,45.66142140557148,25.665260959514917,27.596870203884947,34.539822208277094,30.828642514116297,34.70714870557795,49.355300327471795,35.24398838121768,17.982005781275326,8.089177783781484,13.117830131476618,34.68488561537165,37.64375947089781,21.750680927216308,13.906998461109072,40.62765053390158,16.456429107433106,35.26697125185038,30.938911262087032,27.94615819242914,46.587675100419375,48.980170623263234,8.925303098554863,54.66879285103114,30.35086206577605,42.94180392662224,19.035090253240003,55.003098915593014,21.38441444923567,35.883854257750066,25.922553453174032,8.550525019546695,36.91399047653405,18.227722637804405,14.0533510077403,23.553915959393645,18.510582599798944,32.222898891821565,35.703010352951736,30.160525495368795,40.127619569238135,40.08635726519826,41.516777250008914,16.599289383770433,45.441019675547366,38.86928600504766,26.413132288756366,35.39631402517231,43.0724582414584,22.661971422138684,14.6826412548655,40.04548097153307,20.942934006510463,46.08484229266624,39.188580873226364,48.13287141354924,23.09530009676385,24.772677993155426,38.88122918673266,15.151016443114491,23.663224870860784,14.822944807702324,20.953547135057555,29.57534706262839,13.940916756382844,47.76706880936598,0.9582130932781574,41.765237169327534,34.190802566837405,16.93532116271282,37.47864145080996,23.854836973660255,11.494710733316742,26.69096790338017,40.99104835289101,48.78126246089998,19.328653427997207,41.48376013525571,31.59371347014896,21.95358819576326,15.02927538219514,17.276893557336482,39.86914097254694,14.434794677674777,30.203418407084705,30.99555361272114,53.373432836494935,18.63877321854237,19.101201634434332,24.793761937929055,26.561252617891736,33.37809521511971,13.89943601539883,22.53314428629959,18.27653336409746,10.728697531971596,18.6332169739382,31.745550703798646,40.431474060965904,26.729528890323984,43.27780296982242,35.100280568811776,19.9874310946864,39.84454773565348,58.48625395346035,19.15720999692097,31.647260837662138,45.971644904271294,34.92370857051345,22.594815131777352,26.98167275354426,39.436589266596044,36.92267300467226,39.538880747961514,16.86931571049982,9.17550635032427,14.388241802702657,13.217373882027793,44.18873319582055,14.926831516408058,13.3053878995177,50.62866117134498,19.730544791962238,41.03066314059042,39.48334565876307,15.457824604047996,33.36820294787048,37.96204671344712,41.85898879925806,12.513940819913483,33.16862657704632,18.024803791253355,36.04553782198455,39.794653478465726,5.19278704157657,11.306117526669773,20.442607175808632,42.29078390990555,23.660403477355096,31.03769008572296,26.963900261737702,50.701978950620045,49.58381803653691,30.156391398872564,54.61516725655585,18.790661559891788,54.69512791576901,28.84054625726175,48.246070327197835,45.99621036364877,26.44089083890124,33.29356203427083,41.945204035804174,5.6768254034872,13.343029212321529,37.98392671090526,12.158451443910291,29.719047221439773,10.257426503066508,20.804796337468673,11.657509131409839,47.31189555085163,17.82792895019191,27.093919696414,42.13075730494236,22.906291617646616,25.41946226940175,15.238182585187978,32.11458565438086,17.247491971992954,24.548804784317028,33.474553329806874,39.24160095319092,12.445320509359092,3.930206814648236,25.872891976439725,32.54820236243037,17.92294290803939,31.692046429098536,32.68776356743728,27.356790915188945,13.183476210866036,47.117736985325095,31.23317791507487,15.07541362007304,27.666946853519306,40.511591640911384,38.28804493437171,13.351053005017302,9.205298588992509,47.65371704388098,42.8988691315354,19.290636577200658,37.34886893165792,28.64775060472279,18.050415310207253,29.597688525426964,5.844394954044381,30.76883831123352,13.846013147886032,4.977450570717714,8.618492994900194,30.6348592717294,54.457341619148735,29.710731428827078,45.04449448668031,43.697077045504,17.077665307308475,17.101180468105532,21.23970284190105,48.81547147904623,41.59661410502295,11.817932771444903,25.02877112550996,20.38973993056058,43.68558612425127,33.902718951804786,20.928136236038583,19.674932832485098,15.924459908393388,41.97268538254583,50.943317566379804,25.962166372915963,30.18263591377704,15.794890813604287,31.328211010939768,56.10540380757648,30.811158857727783,36.648136227916474,34.68052415765143,23.216399330801465,38.17217336550516,38.25931831160146,33.583272554580034,14.110104791288403,47.2403466683707,37.83605738328688,23.73168269797643,22.68801114660502,31.323653030616754,9.928165538615477,50.38914674573279,0.7115973156129796,20.965625720320773,18.94536306056061,46.334095256109975,27.7552539364181,20.987266298016635,14.241583958956836,43.472310483997916,43.13713335935964,39.575865462772185,58.51536746037726,26.113064880397356,29.170358314987936,14.139553681562141,37.73415686276139,14.882886278317402,48.61442120637206,34.027182965325984,27.841304640497587,7.181258637897923,21.119749918351182,12.098990418564233,9.325914043042198,23.53021547286927,25.201160942362147,39.606197689413946,31.911749910241745,14.875428949083744,31.376441804330675,6.494434787676457,29.993134461084562,24.960442504511967,24.518321050654563,31.93328960683327,39.790596784257325,46.654235352660194,49.43993455271004,20.570921651645822,44.27843157908098,15.880511243734263,26.92544676547249,9.497257074499416,38.99023036758251,39.07537802491268,45.81364187698032,35.593453275579286,22.081278823565526,23.174842159254183,36.180532284808756,51.623854621553406,40.76723742614763,31.94769853558455,45.018138305615906,44.45128304533033,28.99165111461104,54.137683809710424,42.45676244776957,19.533457568006668,44.49797414832321,45.15082227803488,13.069295320004986,38.65606861336805,40.68538368396725,42.358288878598,44.3230222257256,33.01043068425732,25.028856478420387,45.57821084937895,29.415997958991245,21.56201146787902,23.436085457996136,40.071791359175904,31.481914319557596,11.410801736856811,31.05091028702288,37.60549364806759,45.378936279981644,24.920761216512993,47.91727028696721,32.502585357131764,36.07532153474561,21.119780393806593,17.386915373856922,35.353792675351364,53.49717464322427,40.52364541564086,11.06050361668245,26.38783839661725,19.097130769918707,14.082337990455578,5.215042858002805,39.23525948636644,17.578222066518975,18.870431669731232,23.87652959892135,13.909350619754765,38.089607214925564,26.085394058620057,12.340108940117608,18.735754859568967,26.195057318638817,45.54039690791886,24.34439473794324,21.1365665845496,32.18484427699941,2.1542754689366195,10.769925006284357,23.47654223453124,42.92038225674119,17.36197938272217,34.30149449742167,29.27791562517427,45.86521211835612,47.05070067044757,49.26645905466063,14.911264663083385,30.291064758009902,40.648242050357794,40.01987339908098,35.02968125189106,30.883062230348635,40.586596338840394,18.450190814686025,55.988550373771105,19.427732266194916,21.383898647575194,12.445486333943245,4.098833489895757,19.129243704598498,40.041522186556875,19.86845115546787,42.49826735160907,40.061032480646254,24.935524676743803,17.54682345853229,16.636080671287363,13.999548822848528,26.50904732060993,29.032370517241237,19.11498503461833,28.18383580385772,12.599943106067792,28.2618637424008,26.705640320490943,10.717758375370373,18.99326449380883,45.75236187554028,7.68468989318396,10.89898471716845,17.70728213792749,4.922449291020978,45.781639111559386,26.012416405548436,35.24883555363175,44.525517169105804,24.91334203392573,10.740720548488746,29.184164714941776,20.46175097552139,41.73308202785852,16.435957647883953,34.13029789607625,26.461153934208674,40.84978695011043,19.98583518829947,44.27785277973012,38.61699396286667,12.571782919065715,22.838311033718576,29.207995689879333,44.912248287264994,21.334231929012347,18.170004834968736,31.815745352585054,40.78295766575226,28.93662997750188,50.75696209573794,27.644617500423383,38.10105624241003,22.890635363058486,14.819710453065348,22.924611091136544,9.85203240384688,37.15721940045889,4.74790172086339,10.288074472383597,25.211863138919448,53.86659729169684,10.022759890514127,7.6316887746537,34.116080994571774,38.906387664134414,34.282917600212215,33.98643236075435,27.92824924128459,15.814323031571167,21.43249932783113,27.610011719089623,37.43970228798723,27.195371577015987,38.12819179898112,14.061542833719924,40.81605494424223,18.371421999698097,18.01690639732651,42.30885357809846,0.8350916988850976,58.26141541705532,31.466903493533945,45.14117540766152,30.839128527980087,7.258778055458501,30.27928682525633,37.4768326564243,15.29593820889445,20.512823334231573,29.46193548712418,25.033626182539976,27.04070583948758,31.577798254906938,6.8770186202625405,39.24306182484986,3.376607264975031,34.181945546353205,48.34983850103713,20.59500390776632,30.145932772319526,12.950408622681536,46.24536612564638,16.74262204348316,25.743274432665487,45.24805846984043,14.06238136352325,23.281825687138316,36.85829830953858,35.0323676069862,36.134171167469574,33.42276612541988,40.70224408699788,24.11056192965132,33.669478051645626,34.75985494521407,38.37348698214428,22.291510060714575,43.33199322953927,31.840391074435107,38.97128344591266,32.523111449434026,35.86967721611197,19.29604451017279,25.429113418764192,49.794169467690296,38.379660640896276,46.2067735192208,43.66617726267229,24.09261699041537,27.39393520137748,9.634600568511843,32.650395719273476,12.382849347594957,53.919915668764304,39.446060655204256,17.75822154224538,48.087447176363845,19.555991100806654,44.53099568632065,39.99075734771208,39.17751726591375,35.646590169927904,37.779467497359306,46.60747863345493,42.25797823967072,32.1143501228523,13.61465196802191,34.67701094454826,20.891951847386487,14.337578829954815,48.4141227357953,32.499777648011275,38.13640617785267,43.70742637514595,29.26481098619569,46.61507960354653,17.85996561200767,16.156998317102115,22.621402094314902,29.9040316939784,22.819251822240815,24.347005991919985,41.699729000608095,39.72414132434062,35.84977311479191,40.19445499760137,41.253464809444964,7.290620238220047,43.07845714557493,41.20754789870951,40.78824687727589,34.644848199259386,32.96156882294274,17.978715617606618,39.944499419469054,34.97534133868517,38.88258133976377,58.201122021752376,19.04227428210394,24.048381746150152,46.30470035251089,6.473962407638751,32.82939700071219,44.903939101478215,25.783599543822554,41.421343418897635,36.27804346543326,24.62177011287432,30.826378495039673,18.616476187927375,24.56439867172778,30.546434904000975,45.42418095277809,24.43762689380709,19.278516875048943,17.963625175794604,11.184012404311193,29.806750331772513,46.06994382495303,35.22071567184552,27.979116846947928,35.20547460634144,45.90209476132692,33.70643676358366,45.91132445875328,19.33501444371001,37.1911334560654,35.98114328897347,7.10002543054344,14.171727356071933,39.41999460849737,33.5758097769027,38.076658877813166,18.29353984475697,34.94909808470552,34.31942470000396,26.87505007538944,43.33749427595063,40.364390729475105,54.56765211269663,35.54013702514892,47.49151728417007,38.62277434638885,27.807550930776742,37.635533520987266,32.814494305011976,34.44403487764425,22.18383905640222,21.86748559349369,44.19360582511868,34.137127094497984,40.65111361216353,41.88465415695052,16.783081426009158,22.815700329795945,15.98457838045313,37.00031234820058,18.323159511561574,24.318675957999602,27.935225670896703,52.764738265090614,50.40552991965953,41.62561884741157,28.889551178921856,19.102056960039285,31.866451226374082,39.3648111399948,31.10362952118254,13.77383952681335,32.67177595681632,29.487360779649066,51.54055535024433,47.10422216358356,20.693761512168912,40.190463473635575,36.001476298545434,32.16860306334767,46.36428293949044,38.55680423067794,42.554457491007135,40.76884394584832,16.22733625287257,45.73846415881705,51.03766287388438,31.540961616844186,12.706059908665818,21.88529073920555,23.612788250391205,13.679617629612268,42.46859379860756,25.16764547704239,15.17650019799991,31.366698281005917,40.357501171667565,6.607919842372905,10.93774915456767,7.280388460736953,48.95738234943505,23.011048452592256,23.495863021409043],"a":[19.834493429208884,3.7871984278925908,12.964997554215469,5.054031101627894,19.419433906187248,0.4980329930722771,15.060075956615622,7.961917976128854,9.577764734758972,19.68565871871737,0.9711528140014725,9.423482027065543,5.1619328600344305,9.391776124603792,11.082375776756606,8.595945397463428,5.128310117952983,2.9628931703638273,2.3844516023460516,9.718236413566558,2.3826397544711497,4.998660477183647,5.718667842040928,6.232788104675149,6.007200231699468,0.42373330299173784,9.895172954321016,3.347808574889175,10.289122359078888,6.673550798752146,1.1448538041896938,1.1668004625118922,3.3064550065818343,11.174184736738702,6.5820169066818845,18.45631998057994,9.671546431561552,14.768737880739096,17.399531253147625,6.321974566610149,4.24269128619069,12.708818623174203,16.98582161154036,12.940717083808169,0.16853278508476954,18.824927293015183,0.9958548777975507,17.926441746002926,0.5522497241521496,10.02669921016507,8.012835753517518,11.722778587019818,17.764929233952742,8.19780652420449,5.77938869454135,10.426341746161798,8.091086189568667,16.81494026289886,13.00483507409072,18.31071758621057,18.229364205622808,9.786427402119177,6.313098283500138,14.275993637111245,17.3996613689826,6.1379671697216365,7.250933558115764,9.0458284618447,4.137980689076586,5.967656673130115,7.4582767753924495,19.360835081995106,4.564405866818788,18.82812784583972,11.462991576097084,11.375407701661327,19.13699119328872,0.5462611369646941,10.467252156400878,13.396268080956997,13.9621451139427,11.921449850320979,11.92971149979391,13.909673142604909,13.21666267669903,0.7072685628269015,13.792149692762292,10.140635822580562,17.64874585277139,17.719239513431404,11.089253949694875,2.4207403706451203,8.620526034333729,1.1898789788218656,6.4705876283414865,9.637585460154487,6.06934931032701,15.203256295713858,17.096402606573303,13.314202316662506,7.597749113342558,13.46324406507112,15.422216927483383,15.450059711876873,13.204171309862733,13.625922452810158,16.069186048914965,2.244952665749542,18.657944583688128,6.943332286966086,13.77088618348402,10.571052902714131,4.498451814662623,1.7744880187898682,17.26042159284109,0.41837337357830684,7.419670250563057,12.07415868611104,14.916845678764243,8.016034842675722,10.17880199266635,4.342989321792956,17.187014247025672,11.98840456206106,19.563122787750217,16.5178653808104,19.693465039916166,17.0481165092638,0.5055668801858726,7.05019703306593,18.090277722641535,3.9612437140103207,5.548767705579971,4.071448370696955,10.388368777791204,4.3936123146325246,5.448942003401136,6.799738172008594,17.4341084050075,13.291935583342411,17.048989658978083,3.7177552345915332,14.48274162121226,17.28602047712497,6.385339546245197,15.685890631446737,2.728645274352983,4.720990609372384,18.349254027835187,17.700437146363882,15.461319392344679,13.004206589253343,9.52636327781466,5.091311715472471,11.428576497130338,19.142342090795587,6.496542891520192,8.425527888291558,3.117134045828558,18.854171911108498,17.478980224221758,16.98919200370817,12.45780704860056,9.854473168068658,8.41225310716371,5.047086119200737,11.434298169519565,19.07099080220743,7.484370803347327,1.427836435301133,15.956761123975895,15.53025770889693,4.533439170572038,4.084827690724744,4.287578783993684,4.272085287800822,12.32500569785235,8.701635860137653,2.9963546296268806,16.408693293255254,9.184375481156618,7.437193549559935,15.873935586963546,7.1507525182716325,3.135858791470727,9.384946937658656,13.951470669675583,4.473200597666502,12.334902656888751,13.464097795398136,11.507466125303715,17.482781521914408,8.85817100940673,0.9481232642663162,12.27009691172424,7.805551533030344,17.964782987566327,0.8921543122499997,13.589252609853908,10.38843144848013,5.462424271983699,14.595238583292453,14.496320307989397,4.097936910958366,6.672095637340618,13.94848919202143,8.315184078262256,15.64828570596816,12.671665040278137,0.9444526204613934,10.792794178407501,4.4722016811448695,15.73777345608125,4.618754932145355,19.384300811872222,16.666492088312438,3.9723644683132164,13.75960987503598,13.6999577505722,9.017106441626822,3.7041407066704135,2.2872182158948773,6.440443029627105,0.30307471245153206,12.295228835605144,7.595565726892892,16.730726668677818,6.271170563530255,1.0826860651789483,0.2169146890154927,15.4578166120532,11.006936389196774,2.994752106226297,19.342912160208567,12.65420538994352,10.791538429005868,17.59970026519152,17.581940377802148,2.8586928717965643,7.533067549659411,5.421072425398892,18.09340768004777,1.0224147947048312,1.7426574865901623,0.013912049990008057,5.494175530705756,1.5958921023972916,12.664803254659072,17.280116993603656,0.8257238755976148,4.265949026924445,16.17508677950475,7.018225112075185,7.192009614395309,16.583061752492586,10.912215974698714,10.486185858263521,10.208785497995475,9.844120244581145,6.074969835942112,14.422529096552399,8.782464102397194,11.348768371929498,16.703659716435038,4.1164221411849145,13.969455845060184,7.325484113356042,5.086046616802542,3.310291577445046,11.901448015373433,9.606129021709435,18.827722949286215,6.4550656150703745,9.555486753399274,9.6358220786589,19.506962802364196,10.256599994060478,6.232540431002063,18.13604295399159,1.6104494143817316,13.913261840756746,18.012636516603134,14.804089023658182,11.402570338427545,5.209793885269112,19.818037259590156,14.170094299881972,10.655774924865614,1.6064389989319894,12.159235239101744,18.36854752273739,13.687464377124577,9.826922487799138,6.6273805277476106,16.946334729668614,10.223151559819392,11.774955236715709,17.096077542465117,18.224268493588003,4.902471551679493,18.869131593649385,0.8401929049855772,12.257872979257689,18.37944195221697,2.9337353726007898,3.01333313778136,11.067457685823264,15.476730409562304,17.418781926191443,0.38605103112440364,12.004074478158614,6.440833326303719,2.7169720017168197,16.685509690051823,8.575344864179794,10.015876133904754,17.766120831374227,17.696072653895193,19.768181561264825,7.00165135250661,3.825764826158662,3.5748530380482446,8.358931739403559,18.575353156413893,16.72350047531907,10.373429771931807,0.20525380204396093,7.496235917053755,16.462150723625818,8.259428012361102,16.65978394393864,1.6202482477775693,13.731447437998971,16.554349070140276,3.2874369916045554,1.3030615317589689,8.81871296655531,13.376089934472581,6.37870769067391,13.556560047861034,0.33641752907019207,4.830004489228217,18.388434644060176,4.68811266412716,3.447879380956116,10.422482674646725,1.3550121533239956,19.919311416606465,18.32918211951775,18.993306733187936,3.39140096894623,15.252682282533293,5.0408554097326785,0.59896179818133,2.2614938715647614,7.68393919716702,3.8476706586542653,9.83064756953583,7.6745532942283345,9.407742490744916,2.012507460991828,9.857383031107227,6.873568448403735,4.65619338907497,19.008929902516876,10.706033564914872,14.243638897768456,5.916545953783334,6.273067262480008,14.829943035575761,2.5877527597902317,16.783964653870584,17.89994327578851,7.851981537649961,17.53121042194802,11.688138075297969,11.235046161096683,13.796148814423335,15.668042810563772,17.831834856821892,0.16970520768551545,8.0168786380258,5.411202661243317,3.013786188030716,4.975927582108577,4.306253762722934,9.509693739214624,3.525753225067314,8.116975081745593,2.7112231325199643,5.449709212614153,0.8376581671070493,14.654301410232442,11.449766099948175,8.691212821104806,17.297974133647855,4.4361702725381535,5.455768039399582,18.405175842935662,9.688924019550056,13.323633847203421,14.211366031841454,9.289691137784178,19.461656833102296,11.602958346908995,12.957866021792253,9.762240911050203,1.686833255675606,1.0537285622298809,7.9164137448971905,9.767465246343079,17.49657347324094,12.157000755518212,4.92280551245456,11.48115958547657,10.163842549342625,16.23563491623749,0.02526360981907949,10.780328686408552,8.018845493475437,13.722911436775313,11.230863685470807,8.5355572373525,11.053192074039426,19.579993316875964,5.837003511577481,15.837929099041723,15.70466637198681,15.627211630344826,14.492537684098945,2.2590452961812257,9.32340736387153,12.933518496378419,13.587928662205035,2.313039511066841,9.036506209370527,6.911257738463776,13.736147525503405,9.249691611978816,18.92028611924353,3.7958745322823084,18.84540017006416,6.04815832944277,7.216809420638977,19.576941127783293,6.969667872379706,3.819832367945235,18.26482541666918,18.19758812301781,11.75904081794977,14.236361787411544,9.687158330541479,4.5670160968834805,13.3902695153138,13.060458340238728,19.079523264342537,17.55831892323773,3.6883515070800277,13.39931484007903,4.209106434033796,12.01819394529898,9.340208505747235,5.337074123364278,17.480638909694758,5.457302360860612,5.639580827052528,1.1610617131074985,7.210378070760166,0.7194412101427394,8.089344844631281,10.128016109290275,10.538163796216594,14.220835000360964,2.3684393154419103,13.689469488384237,17.763727213561225,10.857760262356111,0.9822680661381122,5.721807362833302,6.959197436830782,12.273626424845263,14.083536112575267,17.787806615040967,3.4021014243826198,5.440945121013905,1.1351908006969458,2.8603828371918327,2.008767206322495,8.762593680794701,19.915448930158853,12.972178990690018,11.15324223714078,18.909882072732543,11.400621287715428,6.714941559272702,15.08759563122933,2.8073825935347063,15.986724930382366,4.290479977841253,9.147242906048035,10.279455755174322,5.308421528130425,7.116663474775939,8.935225937102027,5.063640654678077,3.887838700731203,10.0403952260368,2.284120746110223,1.6489299541086444,1.6053081731899121,10.789260668072401,3.7455411967600805,13.68729416282414,8.83615520368691,11.574631338151935,8.31730021495214,18.927976386810283,3.0588106219940903,9.211187954166267,15.535449135423454,16.640335938662176,17.995732252890534,2.74188415947497,15.2888459491228,1.4236567498330377,2.6975622473215166,7.610291305994634,13.698404002066557,3.5473590468376726,2.415411408823309,15.342200978803566,10.533498883837296,12.50008781066402,10.890230329792576,17.798501587287575,8.984279758550828,6.271999838410673,16.08998353104058,15.009554743429256,0.7278475597623268,2.6958828307963634,8.94556136821128,5.261796856594052,6.750648407768778,12.855826446680094,6.613927789125751,15.293607496536614,2.9825164654947933,1.3093499406067366,3.548752225103815,5.231079328643942,3.740368729561121,1.3665203507053603,4.928494359525271,17.76085501396072,6.487671407075228,6.192076679066729,7.673793337328063,3.2302289634200543,6.084365199181443,11.14980155008781,15.894797721027905,2.0632607887315446,5.122264340244529,12.705646371160908,15.692234318547227,11.553203092673389,2.7543862418051823,4.557516998897091,10.013553078712093,12.814445873079624,17.05312502482238,17.204874557112678,8.671437594390401,10.514000837560324,5.989914548263733,18.65890475668312,19.078163139703477,3.275054545845588,8.924800060154547,6.563595350476117,17.270489917890632,18.92119427007787,12.080325045318393,13.961614565470072,12.824931330202457,7.454232382252424,7.086782446149642,9.276600098126245,6.134857045798774,14.627582129969818,1.1168793269843968,16.571782333150736,0.5773385870554337,5.18533426446063,4.0418997387597955,16.414207791264207,14.054006603347924,14.857920159699756,12.220835326067574,10.67216362942034,3.8226350794796593,3.3553789107588683,18.77285102400139,0.7021266744320798,18.259410914224887,13.90282886731288,15.10781953259797,13.801028773017174,16.557677738984168,2.4990119592916926,7.149103269907218,0.7174866199662677,9.394804866961195,8.665044959355859,4.923556808940006,10.856918767822652,6.037584413506605,12.745576724230464,13.10859049085822,3.109459703971913,13.969844260531685,3.7102758856536955,7.29461434474278,8.512494800049609,1.06143892820735,11.103912931983281,8.131600222837342,16.39089657750928,18.351081530231195,1.1388343474886353,6.095256884522819,2.0061018435775235,5.132274437356652,2.6885635125115614,1.8327721441414146,2.0164362515687806,15.735714631101905,7.909408883029401,5.99238041772145,1.9790456440124071,11.706887565297222,19.735211386315065,4.747630665938405,13.984813686204962,6.967933642887001,18.986328529485064,0.01752696859977032,17.46684279706017,19.91056868446173,4.309962908435829,19.544896060285918,19.661264937023425,7.453138528972301,11.548762586384601,9.79266824425109,4.034022721439192,4.492164441350752,5.8820614971344165,18.245892511467652,18.310250972749014,18.42536850604203,9.62607367073482,14.337980063170747,1.6225284475967072,11.321923459426394,7.280463375850084,19.735111015263026,2.2812348404011074,17.617869175316244,6.880631838894025,19.800219877041727,18.510703176955893,12.153349242500902,17.66742039317986,13.547256687419228,3.3171896020879865,18.19021149885498,19.998888671631004,3.189248092623944,14.968187095326755,1.467181840298366,0.8488562320298509,1.3291131781645227,14.55358481727628,12.14651640085981,17.912389388324538,12.89747936433995,11.282785990947794,9.817664844838468,15.001593819733428,9.592525687456575,14.600674274330379,16.126170071263193,15.648022035764178,16.962601651493543,14.093621929223632,14.842533851179711,0.3720931342198952,2.065547591082715,5.559855485677669,15.064696098171527,12.689584493920991,5.899788036203875,9.286086292850296,7.830571755335134,10.388961065763663,17.725032999249017,13.096697111094468,1.881242951297395,10.704857289296541,10.025091976058889,19.384713416305004,17.388569007310203,0.8181031629076818,16.008092885220506,18.360368742736174,17.284878314490474,9.956951792624803,1.076288874157525,3.8883546899206856,15.575486494034285,10.656298657550272,9.736594343905978,16.930945186594712,4.758772975350092,18.308941901845117,0.018990874281441528,2.0117850814942795,2.3971337765465384,15.818130993054087,7.103536220507576,14.287489783743155,11.718627955674133,12.532048220009795,10.820331357650597,2.6787298668862736,7.19561666929263,15.002576240231917,8.306610706930577,4.311762660053131,9.59538477552246,12.077614337596652,2.730726759387725,11.77843473259324,17.636558683014503,2.889289932340775,10.769917108402653,9.656106222269285,7.8497207657372625,15.290904560112484,2.3332384072743917,19.540602471317186,10.56422876578521,9.179550133823057,7.5902623340259545,11.359915261191258,11.978621684147353,6.772400535556247,16.61296327685551,3.693687077439538,2.660912308010297,7.096752545854561,6.922431910466682,4.453420508825956,15.040941720313104,19.906997721305295,18.139337273889772,11.069690535844261,11.657373276742815,9.589396567657236,6.930894424186436,7.356548952259927,8.74813789383493,6.305844465007446,3.056900202189703,7.176932573380843,1.8237863463234971,1.6315714975061457,8.662583935935357,17.343375350788065,8.79115733888018,5.383882468974042,11.28641127969166,19.27521971551359,14.297775181668332,2.878032658755272,16.33156586597481,6.616411822862114,14.847568449899814,7.132056027455449,8.000772559288297,7.298710986278567,6.244330816852468,13.206746440826285,8.92346378975641,14.48547221889629,3.1174320152520885,7.050411329233581,0.7812284912805456,19.278432287161653,14.051281794890276,8.030187785570204,11.037033138787917,1.2783603628857332,6.350207073426453,0.6025787630861945,12.66358538582914,16.318675237992537,8.232142946384776,8.863305760946417,0.5405739943002308,17.87164805786634,1.7220625561334613,19.866839532254087,1.6683030329291926,5.4817307612603905,11.323971662992346,17.64630671789495,12.560226027737578,12.738619117122823,16.63127392349442,16.173708324581163,10.125473403328055,6.239729064663608,6.3130964034372905,7.712380061262865,7.404292626219773,11.103915892200593,9.139993670450828,5.4217112158988945,12.5661439321272,17.560499036432052,12.154947947301853,16.193392763339638,15.908431370521994,0.4405989849418779,5.260632380420112,13.079824724901016,11.055447435030228,19.843415414088167,18.352083920715707,12.957151955278166,15.152381493806576,14.615402865282817,11.122860471372018,18.744618970777406,14.453460112071962,18.87801382724499,15.838745945474791,3.3215040320574074,15.374275367602088,10.76239694016623,19.18711786796356,2.79731467384313,15.437952275952064,18.822650933531342,7.926220465662515,8.494064701847503,17.037424855277735,17.679007266168533,12.497279193150828,7.001863220164948,9.650574693816939,13.411734279765604,18.81314303430189,2.7840051711531233,7.883550467311373,2.4381588081290673,4.30715742783923,12.763365324356638,11.715498968106504,5.230846856057343,19.58288322888393,1.913630269354032,16.688455288661935,10.721526408242358,13.221241428155203,0.8968165761366009,7.429878629516238,5.539327018731166,4.825288794654954,5.13999298110285,4.196465926282458,11.507944617539835,2.1584159254277147,12.272905618523309,0.5678080185563861,6.422067792087578,9.245952519979323,13.505610034421366,4.9698261603349625,16.572767117588405,15.022555427615112,11.285240570680234,12.779271908308232,8.702678362558235,18.691402040605247,8.356356627751715,16.146293180614443,11.28570741828391,2.310091425858287,1.565817213842422,9.045929738990726,13.442336690797067,17.755662276492345,9.420621638296351,14.111634152247747,2.0423490367581865,5.151163173080198,12.8568733308331,17.56785836925221,19.79051429278412,17.49806671669312,5.254413843918124,9.37594683175842,2.3860660707955494,17.78832301804574,10.162349476408693,16.281940698391203,9.204689643922666,2.6144814748594936,7.5727781696595375,13.515746290200576,9.271170956183603,1.0994374077244817,10.441483181883768,4.1977702705515485,6.943161153903423,8.163668709586084,0.8756072440973739,15.949115568246874,4.39842029572572,10.070276436475861,12.112635023518962,2.2013827064151403,8.20891314422678,5.119524634103083,5.36779077448581,19.11345068301086,4.499021570175725,16.688138012919683,10.182348789682907,2.3991708930156452,12.530033015374693,6.7490114874429,18.06429077852495,8.22593544550212,4.674542689304992,10.013853629853703,15.46638981704104,10.037060971836777,18.614036711106216,9.518671583000916,12.945485672559913,0.23110483410970772,19.87790652625888,5.628229419439372,3.0983041022744207,4.614457415072937,16.304719414883667,18.412478128562316,12.594378290136508,8.751822731117421,9.768490570277812,17.455540665743563,10.636642521261503,15.754863491452106,10.54553040972753,16.61587837294354,5.51165184203986,14.262545082969392,18.046430692592516,10.307942159085343,0.7310577299771159,11.573321728171893,9.804637278730182,11.634027896135866,15.028728307213207,13.486300247568167,3.1670610917899555,10.423806016950028,8.283871980031904,11.781887208321882,2.695045437142012,0.6512854055230788,11.981280364436602,18.223902138020712,10.659784890424318,10.497773208986283,11.503094080546465,5.997205070930689,19.015532837628093,4.426075911798502,6.286177102181307,10.242574528395991,7.114021702786575,13.79528518396393,9.095840069856514,9.284632093471291]}
},{}],71:[function(require,module,exports){
module.exports={"expected":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.1346976825847657,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.7162369990675677,null,null,null,null,-3.039245389403878,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.834048548992225,-2.2322178679170217,null,null,null,null,null,null,null,null,null,-3.3207962629214505,null,null,null,null,null,null,-1.6771359533342953,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.422112891922156,null,null,null,-2.140910129277828,null,null,null,null,null,null,null,null,-3.208749843713564,null,null,-2.670564506146996,null,null,null,null,-2.765493019211336,null,-2.7086059424234996,null,null,null,null,null,-2.5585854643733037,null,null,null,null,-2.877142250954215,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.96899569106362,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.2044339787683978,null,null,null,null,-2.963879631919804,-3.3369335192279053,-3.1903479230590097,null,null,-1.6352131125034357,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.423594744230992,null,-2.462436248521266,null,null,null,null,null,null,null,null,null,null,null,null,-1.9122070863172786,null,null,null,-2.5025961569451782,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.1382244691328856,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.679021056437602,null,null,-2.601936741586315,null,null,-2.6660600257419595,null,null,null,null,null,null,null,null,null,-2.8823742128258987,null,null,null,null,null,null,null,null,null,-2.5352563066543947,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.606252082115917,-3.281332596486802,null,null,null,null,-3.204855679325127,-3.142019945862234,null,null,null,null,null,null,-2.432877414936378,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-0.8057869300067583,null,-2.880973870685456,null,null,-3.141514788246385,null,null,null,null,null,null,null,null,null,null,-3.2386444844806155,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.7005426261640766,null,null,null,null,null,null,null,null,null,null,null,null,-3.08131657005921,null,null,null,null,null,null,null,null,null,null,null,null,-2.6157683221988384,null,null,-1.5454869573857926,null,null,null,null,null,null,-3.156422442744624,null,null,null,null,-0.9546478968441611,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.8034341718145868,null,null,null,-2.2795126884448496,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-0.0050426563078602715,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.8091940456688453,null,null,null,null,null,null,null,null,null,-2.489862700570879,null,null,null,null,null,null,-3.077429727675428,null,null,-3.295844623045154,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.9572775541112724,null,null,-2.0563852363060207,null,null,null,null,null,-2.2471262787360757,null,null,null,null,null,null,null,null,null,-3.1598610398309397,-3.0284056707794935,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.8674173838651207,null,null,null,null,null,null,-3.136970703973383,null,null,null,null,null,null,null,null,null,null,-2.72975935182203,null,null,null,null,null,null,null,null,null,null,-1.0991045671684858,null,null,null,null,null,null,null,null,null,null,null,null,-3.091317055866183,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.3517416728354235,null,null,null,null,null,null,null,null,null,null,-3.3069453729678155,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.9729999580885655,null,null,null,null,-2.914187208504755,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-1.8118945986168677,null,null,null,-1.9400481114353496,null,null,null,null,null,null,null,null,null,-3.315366945310358,null,null,null,-1.9321974140976814,null,null,null,null,null,null,null,null,-3.018248177795888,null,null,null,null,null,null,null,null,null,null,-2.9643683027885115,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.0394616777400745,null,null,null,-2.664763963146405,-3.138995871457811,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.3565082892959,null,null,null,null,null,-2.626407120935624,null,null,null,null,null,null,null,null,null,null,null,null,-2.679044303414929,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.380785653684027,-3.23644021116586,null,null,null,null,null,null,null,null,null,null,-0.4235165838409827,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.420535566026012,null,null,null,null,null,null,null,null,null,-3.1859433724789925,-2.0155034194496966,null,null,-1.7606639514379898,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.3772659420010624,null,null,null,null,-2.6450784122675715,null,null,null,null,null,null,null,-3.3517762107211038,null,null,null,null,null,null,null,null,null,null,null,-2.7240230553296882,null,null,null],"x":[23.25394860442953,65.13486470566316,22.653910701366375,87.50197689133763,28.42771367606609,69.65354678205753,13.820107043363272,66.09891788707026,82.21549775891302,77.47172294066411,55.15985428422798,58.78149973401943,72.8313457508403,50.68239160013028,35.04179971114094,57.94775918355788,70.74891491165943,75.35165388905149,39.62522454960003,92.77894793824932,61.18753650286624,35.75013411894958,38.26318784658662,11.58828673743415,63.63630824559223,22.07315416170608,61.4664801816817,89.0967535829386,18.927114077287133,59.22748314531856,25.521102586091814,98.01726003286491,64.76763314606104,83.77434762620702,24.611075553373517,0.3715356320787011,33.661158689394476,44.64557270116916,62.19581640174645,38.85699910591895,15.134352174236355,0.36110156004927063,44.87651991562922,37.74066927773341,87.97233090780294,12.756841102809723,41.34917105577394,71.34702860176381,89.4911908587779,32.323571318314,76.44795018490957,5.303333407630184,55.931360449513235,93.58952021851404,48.03085904506978,20.806403423132558,2.9871866152815896,51.88530739537218,92.11372130548956,53.13929323094284,65.54984740033412,73.51755189384998,47.21192510438279,11.81057065692137,61.63850888836156,97.27443833331435,43.11000463277088,28.542912418861444,58.20237420625239,7.1490469425942615,3.555979513652674,4.71905830236754,63.25548292499752,82.34496571886518,36.397390836712226,42.26545887371167,41.70834682094062,17.624969863828753,61.551075022934285,61.85303612048181,70.05538500529032,60.574808636432806,11.603291387262814,75.79014178254637,98.1332871810952,44.89731856018633,55.434938476903085,0.2610677021968488,7.7226469179391355,18.72213014877966,92.18061199134613,43.5656592058083,61.97462232308235,38.41328953141967,62.83883778198884,82.72015360586569,61.052434447406135,37.36855296050976,48.702694584208,23.006895041052665,46.69053308314104,59.74480119624661,4.294999778593933,2.15610567702591,90.42205225143758,35.34804769901005,81.53143245908456,63.482401609898176,29.37632357475799,96.81964072467476,94.14906499023601,88.470236895839,93.16412351603431,22.296536919209498,23.282321053937483,27.349433095497243,50.89823405368323,47.30419091722575,30.929706848291506,29.933245605152003,1.7572503682431906,28.776229723200487,29.267429315219307,3.7609855152498373,84.42438249420283,49.79746135367576,45.66478852704068,40.627930932445835,41.5180440454816,30.175967324880325,51.04549492880561,68.68255826978016,40.25085777981994,88.35093959092279,86.82869392428113,92.94068788448723,30.806867053548025,23.242006787781943,53.79860673285955,51.95081199300964,89.412902160693,82.93313899443481,27.540943469975087,58.15655015792078,68.63697963134337,88.22269215266563,77.59083442324332,86.05270905474896,47.45344553536377,72.3091964661785,42.49538066315846,20.122093889464043,62.859327527965036,20.348964567926984,96.5120394596006,4.864281929291425,38.04090617523492,26.72680093911879,40.44142304602156,31.04225679700061,27.040813241799277,45.35707397591941,41.81244454373954,23.53079419591728,27.884939369564886,11.784208051651612,8.631501204425573,8.468485081809973,12.149282765025958,41.3534513828866,37.791468867395594,47.651557995776564,6.619060211748828,49.97002825463528,21.482779973590695,70.0464831330251,43.59617890106369,49.11120963402429,72.61872024328207,73.95250466094248,15.196440169365722,80.74419740423069,82.24197196748577,10.865019021264777,87.43460501012956,21.344939156217492,18.200537756876756,10.302688832836072,23.66543466247839,31.773508997450904,65.87314047812474,76.42438541121433,72.3672578791315,91.30545614114243,48.4387422853714,96.8495442476497,99.48597122164546,98.17753898582077,59.135820530188646,84.37570631859066,91.99407545220137,21.667116568399436,15.727531748695567,31.20918507942607,82.70427908427136,35.42651349071295,48.16828528425559,76.57665463793484,48.484339847892954,67.11469623475175,55.55839494279871,87.72419795174835,68.66661708123556,99.12205956684798,24.592002476478903,68.99478516967538,6.76232440575113,73.9329241455512,41.3391899100487,85.29440250777185,32.870964248902055,75.34198085406561,21.859492947081982,44.34177386472549,93.83885542868768,51.332741425743734,44.16753681156103,87.66914827827202,59.01121825644542,45.98640416174496,89.34802571272569,47.36538948089235,19.165188479910846,37.57553477537492,18.403589631124717,42.49463771872666,48.307624042393485,16.912961429738683,17.27715772703182,11.841345118439817,13.838872160588478,6.110545443868554,18.319945534197267,56.57294820461081,7.710872085212284,30.9543809215878,43.390544568832404,88.74802476741475,69.37895583286533,48.33950014432127,31.38937206670125,70.36163570354901,25.011273496836182,67.81160509645696,10.197138770991664,43.57173385164368,50.0620505209489,40.898073768321616,17.921992376912364,64.29361705058956,36.50644158498901,83.9841519476243,45.67531887538219,43.7683319875108,46.41663850249556,52.95129682869004,18.25366316266539,98.31111194375713,90.35427766885553,34.11275408203056,81.30249244869883,12.70503529684417,45.58437517505667,10.549608879337713,59.968635000032734,42.24589703986161,70.89829307704079,19.24675496861148,24.95509167716041,46.84753916778468,89.94167124226777,34.74257403555345,92.81431317124466,58.77031449265087,14.076704652307237,42.885197501022574,65.16896314030127,76.37736079349591,36.91630145598332,30.438336964304003,57.153835907355344,91.51571060887025,27.86410694068571,29.948136210373534,87.09267162391853,82.24961753951767,15.042236599917791,86.10452527674323,26.612083173487488,67.2026942690563,49.972625425286225,84.6242738396739,95.37626663163495,78.2708371821155,14.569967003665951,49.212847452690475,49.5127628055432,95.04338906520913,50.708377279895124,32.41483561296643,67.89762660783698,37.830084001336495,98.9339230804372,72.16721747028674,10.061724262888937,76.70576379501681,54.64984892503537,52.839341260068664,84.59974669377472,62.823294330764945,91.32449161686628,24.19995285763614,36.42798263778453,76.26616823895691,46.788642069208564,69.90524156587603,21.58747232890741,19.15586107830043,36.220682532117074,25.679120973950287,27.07210058626859,80.29533129590953,77.76112557503374,53.19818220243573,70.35316638664241,86.83834366913472,73.93120130033924,40.65968329338185,9.637363638683638,76.8768183480129,40.18817451905363,10.64278899396025,55.46203258995788,94.43160824410712,24.871640768394897,80.89574305754455,83.83542417800172,51.64372144001705,17.936002575457177,55.29110984595456,59.55634333898241,83.32629587051532,51.83047498181257,25.591568847469514,16.823392368499277,64.8469407897569,71.60282452954372,26.66917381139937,94.12027554031293,41.17873086719368,55.132932482599315,52.25060530986405,97.61124249175404,41.613840282747084,17.03276912625853,45.4657072445426,72.66482714185092,11.178837328389225,39.5176651373061,92.91972956396471,73.41917673484264,71.33604805094744,96.72391402544565,6.7747084266309265,53.40329638990764,84.07476771183575,94.39525678154959,88.21118518881856,68.69007709028708,4.181278960363488,17.340018329843133,7.34685837325717,91.6205045552286,88.06284636619976,1.0391206446947132,17.300737208932972,11.761382224400485,67.47580005776112,17.277829343260475,78.5072287152526,69.06809751691776,72.81816639765273,33.074339359443236,17.752711867607562,57.5107799847818,92.28676499946798,45.215634508706756,87.69717583899211,85.1135300946612,76.52425702575796,79.0992870333175,93.74036809483712,71.26281200233096,30.001425032503203,92.41019564683705,82.61853647048957,55.68981753389761,36.0306369694108,1.264337775892499,37.43890768900597,0.36142455538108464,70.22468892400668,13.913715524574899,28.88409183819125,89.36808201318452,14.682032617625929,33.60186392391229,46.93418354595473,68.78267564433511,49.865435181530884,33.20628266922596,47.26301455896862,56.02820954014853,12.647002629680838,54.13012407906264,98.64361452083234,19.651465637970688,14.76165463695458,56.227526442058505,22.970565780931175,66.47753514601892,20.971640927719303,48.973007172005836,69.51164848953088,45.81509934453276,27.96050156377683,49.458135113780564,40.15649060203732,33.45466968833859,90.65161736491523,47.713574124014,14.372016593849457,59.90667458135057,66.60680396730609,17.86813434613579,54.57705396036161,83.40950545882602,26.807032348658755,23.20102358916487,49.67531178978126,41.12656504046694,43.31644207296244,84.31737539003092,88.6914894596512,10.88098167250604,31.190800722619105,93.86205107656697,48.99151311386538,36.89567909313567,47.0354231910751,45.030840527941706,21.880141110261555,18.999231614067114,75.65703415581551,97.1053315047417,65.05721482476096,13.292144324163235,25.151295379253025,72.67288093073468,66.47077559920305,65.12380553671227,91.11190824951566,40.62736452489722,56.29668873699261,2.715019582239786,83.72776529806039,59.69016568818763,13.002984608107893,73.27333770959063,49.983562432412086,49.120106774322124,13.080365284495965,99.74549812182374,79.92329779933402,7.006316759008135,4.6275886965188695,23.701647690618866,63.96220479966095,88.1114615338661,14.092423124199227,0.22178925540707883,92.82710346469514,65.3029919076877,29.37245683971279,45.5487255660169,45.79471285394525,19.991168835474937,43.051352162547765,62.13190945831541,73.13909768866955,40.5072838158935,30.45932222631702,53.785589841083905,83.79756278886552,59.716554465271045,97.79617007759995,18.246770991045192,41.496752251460414,99.38626301636029,82.39976386680961,18.375755395822434,1.2734986176051954,66.03027902593404,44.33375879679537,60.934813613873295,31.70335369402988,42.08119419478833,55.59558281074497,67.2095195274374,97.6229120074345,72.61948537662121,33.21333631796648,38.93989653551033,96.8314175665464,13.767257166569769,58.34874156569272,85.80830820775998,7.55484092818437,75.0062596171738,20.60693693859634,78.42448917539855,18.862138472593305,60.675693930322325,91.5096392011124,56.006325394739555,65.5692449459456,60.512999621146044,69.12722078057992,60.98225230351548,42.29967615118577,70.29859709293216,67.76746411044992,78.27623749530521,46.19136359690725,82.56047063512446,39.10369923244521,18.363481198391153,23.056324305117815,10.524477849318137,86.464108479915,90.5161308906431,54.30483411961744,76.10977207854066,13.490009280880733,36.61100080202069,42.07573853902693,86.68389115095954,49.65019126964254,89.31444372143784,96.38310005741421,99.95811389841607,7.669174791869726,87.2310805277003,21.164765435268574,7.02721008548175,73.13733869013038,45.20691359913758,71.99320865075694,17.11313443627107,74.74270804096896,39.76064626666731,33.504906888414055,71.42850565657741,82.41220951386887,75.04163263317196,23.137130944756823,60.116358353070495,61.61286453553723,7.04396507412528,35.470834923552005,89.8446388104764,71.78707051935598,57.46764466524081,1.4779454169281614,94.21930552534317,17.861904102953787,94.32671766625592,90.45640030724826,29.950560386402092,77.27496711663537,87.63638088179724,4.231944900889695,13.925830818443274,6.158348604226638,40.16109910900192,83.78280640029779,74.23888183371182,35.91448975880667,62.150134936130954,35.280861009105394,57.47387469420673,22.890712318614813,90.11215690563652,98.22001347241208,44.96254308611625,89.18180557396343,19.370336579415603,80.81716395729701,78.30706992525154,68.0540747365439,37.795085054954946,35.314779535827554,60.06467555276558,76.39406843634839,26.345767188901913,53.56802316891558,79.19007591587588,11.649484684736432,97.92487693342022,29.26235302194513,0.9607014421255,69.5118841635497,88.0628171774944,13.48164180562601,51.695273696765476,6.779459381491382,33.80232669469514,2.61392747538578,42.18216624001321,76.52945730308838,34.0400374565446,42.43147801024401,46.05934435697032,6.70676710475091,10.398136540070158,67.12816710368679,61.7399427191546,14.123937099685069,70.87576757086775,36.77763913961633,5.443511642346843,25.835203844748776,72.6246388790114,61.22443470376331,0.24621407505380777,53.21279776014589,35.09290333340389,52.04227320591832,10.90768295476816,95.56280673278879,33.53987677297157,52.75072907725564,63.890103533264345,69.18752700209363,70.01285609526819,22.02225219571583,80.76528719470204,16.47920611080398,55.71971386290666,32.00075147213957,3.111796131504474,3.9360843615804164,18.73797788318665,47.58175395246433,90.7523343476381,99.1778744020374,32.20387678033527,62.08974922346193,3.6736804220499186,83.41914991954782,66.73654762346727,33.03167488107677,57.81447936190285,2.3371473633098994,75.51987244421214,11.560891151727493,5.59912739309445,34.598104516742964,79.4729277416719,26.648361165934453,72.64103572441272,95.44374431429232,81.78916950309194,23.43095204470358,2.1831784605664817,84.25426718453221,74.81596827274082,75.66475396842279,14.383195467160137,45.61893844448499,76.94133374264862,77.38609081021369,44.081228633604795,10.51499460853802,14.115727595300065,0.14614829067089996,46.08562874350923,18.239821689948265,70.14207698203356,94.99088218427192,40.73895297766563,57.717190960801766,49.389959021389295,0.8712488217393455,44.89381636144716,7.90128448334273,70.21045765869643,56.15422425734737,48.98002156950157,70.81553543504158,84.91818966966443,43.17976441820952,75.28281191855758,78.75872977872523,81.96088219521869,35.560062570402984,40.44637926675614,76.85419182896538,74.42410617211344,20.2577979981291,80.29209866098338,67.53804754665262,32.71474020093563,89.72018199130456,75.90230063456819,94.34644491540409,77.0369979080006,78.45064853625468,61.48081851676754,75.17061545257897,69.51185709217194,62.73306180322733,12.48616693213085,53.92247503498269,31.736842571367816,52.47733091946283,50.96812419302908,3.9802445697273647,28.16251816340827,13.799650771730176,19.261569956083324,62.359840318998614,13.444335580830602,22.54558141037688,12.28804284602849,23.525988090371342,81.20552583030074,68.72476800376852,7.639936691380278,48.4598838612498,68.6065493422066,0.37306851975318356,59.281372971326185,59.344641059913904,78.01432928559619,80.42372711972419,63.21487792187792,99.77980251376101,37.006962629541995,84.46696375612781,40.85868645163031,80.3643656008575,14.388367496770282,48.942855436743415,56.45094846814405,61.57074524791264,46.88211024215927,13.659555469116702,6.314499076952584,69.29710787587193,23.666043282750415,3.4519282268550944,87.67124761123041,78.6853010161693,52.70993836390443,29.70202447117134,81.56309739225722,98.52692045159547,29.525422149392444,65.83664358574302,13.171357677325934,87.51482172520764,0.9853338438283732,62.66814290168319,74.35586756275445,76.7987524084643,97.09945825781175,68.49203492530648,48.600416086063866,52.629259770099445,24.462853202714662,44.47612527808076,68.00828643327665,24.79981047416522,5.944863693482838,30.083951157123433,11.18879037374214,10.203304770455368,20.59646314478789,25.346240811684062,46.592049314637585,6.111292695593407,35.88303445751442,95.8142586907706,13.214171199680425,67.62034145545906,40.14787987739257,30.27059973012467,30.800622030882717,87.30837742770694,85.46700236928962,57.94190744382745,30.016886176799183,26.197035797387326,14.505339837307174,95.75386940526174,88.75273097987555,13.295262891874305,98.87850997402528,36.139352857312424,73.818247817214,15.215106154213153,57.519076627488694,50.95971022218326,38.11572939847916,54.31401546274364,77.84134961319592,94.64396836126082,12.674812901395693,89.92168575435471,40.50023167833059,60.89062665230651,34.05612037400394,0.6641155253489739,2.8904143130773274,37.61098085786365,81.2329964408429,90.45041038339932,57.40833032856742,30.60758356416915,77.14919925707522,62.88334316474493,3.5639295704729568,41.57685800066155,74.37872069461682,55.94075010582167,1.9702951869797536,31.59104210698267,20.55936504292135,76.54879016989682,84.33312288659123,73.99235503737678,23.10683920513068,20.962037881498574,56.532274641631616,68.13297772666269,19.91931267922005,80.47115792711779,30.72065912405875,78.28574649366527,2.601332762841224,87.86532549928519,32.00716915484705,5.829008200456975,78.29991573382982,11.123252371773651,38.720456023746074,5.92462543317529,64.508805619891,64.62386616410927,30.81631566194405,57.486584978757826,23.657415609570776,76.74110828237033,98.01278273272564,11.852879020178996,22.874906788094496,75.00488578597881,68.91700260476996,73.81094924042928,23.94221231308984,76.37281745687947,48.29021798693236,80.78152894374233,35.587875954210624,89.85938024725024,92.04565813988465,43.541867814199534,15.237022653009413,26.391854525277502,64.2468155324553,80.58573557283013,42.25310710306675,99.58273296585783,8.227283175390653,96.6957115527484,47.4123540761686,26.255544018578682,40.85929563181876,17.736589764693367,42.59675225255417,24.855428372884212,46.54459481191109,28.92483797092038,6.126410103645474,5.975317437553995,20.45289448105354,73.09762581881434,55.10865242077714,50.99249738668152,44.67059264075177,87.34813274800453,89.01075589435396,0.07099125427860731,78.69699519554436,43.21643954392136,72.57815726166193,7.254654837668606,58.93947868159963,30.34741446276701,30.880280504212276,86.82054589777415,87.21355565663242,57.45879575701225,0.9532109479565287,98.93166215288119,38.8156156509939,44.719688238238135,67.53065306769264,17.690909791765506,59.05890087584922,96.61433928746284,95.84069372027895,2.0031224288848293,20.738283804894575,35.11238528405747,4.413744032129929,98.65484196763848,46.280081497292926,84.42773491171953,2.4741622840873445,64.10589860707174,89.60301321058128,63.731374278059306,22.744183936595807,33.21696560743739,92.78087313723537,37.03906942901683,14.770341815177911,62.66714291498305,91.03935630384998,21.787377467873135,95.55110665897928,96.77288370780789,35.80355401626765,63.748227456817716,43.08403207721203,25.2710313257402,58.6327728425242,28.419781423032077,39.22473708830117,53.794739648387704,36.05455678532174,77.06312646370637,25.815992052872172,94.44153938549414,76.64445271121491,67.07126989320551,0.4478488702264638,79.20333963897895,27.76529101709233,33.1572253168126,73.65134227565689,0.9866815296635023,14.18188045165203,81.49532567221665,10.112118449633666,1.3596987136700545,87.15994765323379,44.480058786679486,50.92849750776354,34.703240896148316,41.013772867339114,78.28319819161878,15.834312449007971,48.1956403758264,42.90129578712487,85.0107544945699,83.0584080600979,95.03377086391266,25.199219815288743,30.060972335042347,53.31630068980391,65.90646480394003,68.95390593362451,0.6551835543455287,17.646965938802484,4.286042481494667,81.94907904229058,35.849137787510756],"b":[20.79079452310356,31.560382680479734,20.027367271001502,17.799896720173436,15.93086993582023,17.74764117585893,30.25433873330596,16.5891015637544,20.555395656667102,22.94123682738011,13.876589163221883,11.54337227708,32.71316230134313,36.569861065006904,8.814660126793244,26.919373802510126,17.992148779554977,19.23147194282395,37.65959843866429,13.420579840439686,32.721213424647495,12.327130080424284,23.320174328176183,23.083745458035555,5.575083826039746,27.148082944447196,9.805390078611008,8.555579866134874,9.717711896222841,12.309109880061563,23.23805381859977,29.123763054373057,8.563708432387672,16.691926750551957,22.493664003178345,14.281532665859565,27.567333126720005,37.86173706509982,10.54435338368059,28.42099303845035,34.80932156797953,28.52068472999789,16.23198730796311,17.752495839662384,6.041409680818921,25.523141788805027,34.124937492406445,14.511531778020581,5.929309347917511,14.20247947474678,30.735239079731837,23.469337314000995,20.412876246953246,5.426046465030199,16.329179655138226,17.8396501222973,18.03509382380795,25.932787817976497,5.143426528162562,20.91197654300311,13.788313699847215,18.60180005456916,28.735008488586374,11.785559993599179,16.002995622668934,19.99089053315932,25.099650088658436,20.35402938018779,22.095684451679368,20.576850765394713,12.616915083727072,18.558779582590553,2.5259379189009756,10.570745260082909,6.356192580603999,18.415561481866707,27.474854974370263,19.120340849075596,9.096830822594836,12.03694024497375,26.21437384804488,12.800584009669887,20.73042492488291,21.26865010875269,25.041746319115525,27.396492101011788,13.769531972470244,18.369070430535483,20.62247634799938,12.992973171927051,18.430625810177904,14.160444787927316,20.98639335360373,27.005962359207018,31.647750926251135,20.274309651324923,21.605122314041203,28.78383008999737,26.13957683588661,19.692477618459712,33.58990607846561,14.954750036420386,21.56665831345147,18.73046786197049,35.68611034351484,14.38651144880541,21.465113852441426,17.420889918971646,11.099885235138073,32.51529847664919,8.319882649895579,18.47515272562983,22.705331618515523,27.708651453581215,11.002793399433013,4.805347981750083,9.039467655372064,10.722590855630765,13.299227621251548,17.698853302606743,16.33937627620878,16.89764018059373,18.631772502353144,3.1547847690730446,21.013553680782344,10.556489882801333,23.285901449915546,10.701765813343854,11.156893535811648,8.839786259319071,20.768478417403735,8.577094715672562,33.44671584482757,15.087745099624689,27.488558555943357,10.761076967212215,26.668587784979117,21.175556632504005,18.4150953073937,12.265164515239091,6.3123077025367635,22.242453093637685,18.368958910470887,13.54266595206407,20.994787772790513,9.666226839009934,32.67144615791427,17.313496728087504,24.126776593369208,11.866042475523294,17.364390909014027,34.32183368204912,21.845968812170447,16.50144232385518,28.413763345955516,19.33069054852556,15.117447373209464,8.425249128455707,34.26810953635619,20.242169676074983,13.473584027083728,13.483856748453574,9.373812163672287,6.455662453103845,32.94277941738098,31.41996981272703,16.95815460045344,18.07338235093663,8.179887921363829,16.13400187720491,10.920036659502724,29.11411471501078,21.52892736147752,13.398163019970895,24.203606933938122,21.35360300645678,12.707566973065862,20.692935575128956,22.726053311955,29.604629383275505,28.10496915919736,19.03100451193342,35.76740102287168,34.33447149141449,16.920898009571232,34.72407244865521,19.937982175214376,35.749732717278434,23.13727527481224,19.172490877622018,8.827600013261359,21.536744335694344,28.10098013121423,19.617861672464674,36.382980570221214,19.00031637825125,16.908690543761647,26.002221401934456,22.363678089961354,16.987261256783437,23.466087597200307,27.26759554927385,29.971718358394533,12.27071622052447,18.713049916650327,34.71794554841813,21.065887094757738,19.704814789424564,6.087344616248931,12.712730896990596,28.717422781882505,4.664894333622462,21.486109718197103,11.34405759185329,9.172913341335963,30.1986155493445,23.56818464125328,9.524607187874455,11.738747603976968,13.979891475014998,9.754832253557018,22.013023021058487,8.806790690833477,28.564053318741927,28.917548588030556,17.30558340446026,25.746905632138937,31.28486949179028,16.19728945804693,22.41905324844241,21.28992842984436,23.610985127976797,28.267694483646686,9.183674612927435,16.67525861574401,15.141823058668841,23.293698849074417,21.193842001366736,30.077475143865353,18.6679260050016,4.399736526088618,4.2547388070903835,19.14872393895805,23.241648564940185,34.37853307885074,4.444180187875508,13.920926429541186,25.080601017125606,11.073918402907324,16.030610808948644,25.912673335036686,19.321114432612042,6.496461022811477,27.39006763096416,17.14699348901051,26.15924996401362,30.332514802105358,17.287613092441685,30.051578732320635,22.221605057847672,37.27645702464616,31.71289244731431,21.58327050404953,36.419999384047394,35.89148919906068,28.155745489721813,11.440122521015223,8.001179034477834,15.051362709564065,31.41583660493358,7.128234448709918,31.09800178499075,23.46248295320422,13.482833383108913,35.36011461936496,23.255500408085574,21.287339251360542,27.113842229528196,3.603965260742421,33.15019177842191,9.274703424644946,23.436570378059535,20.426507372850384,15.822757363251103,21.38267150223534,19.160134253632126,13.35211413669847,6.972829857184686,18.359093529890128,13.948268639173632,30.80253178327005,21.21643902133372,23.31898797840583,14.446262508469992,8.708615998547252,11.933558739523416,18.753869901283796,26.318928134138368,26.42114588787988,13.121472488020057,17.72924850217853,27.745126350817664,21.7271804178111,19.167793702624927,14.426859428291205,14.576888914473734,24.98328385468869,32.01031006272272,29.98344715824549,28.819071306334994,7.888223895679398,7.213645980726637,23.336305901116248,16.216810739850025,20.947668176516704,26.832973928503165,23.2213485908359,22.746439723912072,19.07718067167272,28.539097735758,22.20253856648076,19.814724555469905,17.569486510636672,11.821708019936626,21.372218460769666,10.729467428216912,19.22342195378532,18.43289530527948,20.112058527483573,14.385651299971386,10.276647833521096,20.416749492990057,36.879671364936684,33.92294342177259,31.171345810984597,25.079131700751798,10.230795430415629,18.328056567893157,18.920944501967778,16.12727376981034,12.21592302837104,14.455184506439867,13.279929699953321,18.466516067765916,27.452113324212274,23.94159572577901,10.968960124477189,28.08876913668556,34.52632781572637,31.08795166968685,16.200732973849632,4.174608789768497,11.945757021975645,12.387346328479172,31.24082417261058,4.465287513651046,36.70575912833613,24.35887327721001,28.31020399990335,21.67037029730438,30.43750583833276,14.68143607766795,21.671061436402866,9.799657075964546,19.311093641953843,16.979413984738624,21.69288399389182,27.767171096124184,32.57223861577157,30.64165905486455,14.900301878931614,23.217433685575998,19.812825226431208,31.0731951838645,22.01885152625265,30.764719602661508,32.060253408535004,23.4854326781727,31.7470733391365,14.242817952299212,29.28781299895212,33.69909409731463,22.92676501582113,18.619341824227433,37.80669145362685,22.238739254705028,23.99875393531986,10.522199887795125,27.49477616820325,20.536055532097173,12.796125693032646,17.526488940277098,25.254378277546504,21.387803925698396,22.21321394856681,19.369338457826288,22.790953871406764,24.39243453609128,21.517741639297114,18.58053669099304,15.416644998226175,15.647601510815754,16.521556057882126,23.252538539148155,20.569813337483495,18.306568269669672,20.027355738533217,24.95358927092266,15.97224185426932,34.37666753532325,3.6071794646190103,19.601362141245755,16.243015532471908,7.282510251882637,13.909199282253262,28.03718891847018,27.220761146335278,8.80108598967379,22.276469345005474,12.107583241463868,17.695449431021064,21.496088003738436,17.754283409038884,30.330616631959806,18.612425680544106,29.474953911440693,28.245174935682165,30.975566729349204,20.875105684805384,19.20290347070184,16.399086681644857,15.534690672532815,35.673868265398525,20.201475713746664,23.728232251842453,16.136713926238546,9.625148351355826,34.30838624223713,8.41919312205965,10.620925806818029,25.182690360481974,13.415358999256387,4.5073413612787405,24.09291606880181,11.506415848783051,22.41900355715492,12.117349959166567,6.46656083928828,25.693084413255015,10.73361718244632,34.69442262251819,15.60280050734793,32.10139655142302,14.744339087196572,16.928855039861364,11.7614842858519,33.64284867093764,30.444021570980905,14.527455584933708,24.51689861726521,0.06861923581864993,25.318104718691508,16.29591407369022,30.08654944945218,11.163701237020547,35.472268180599016,3.4565866201215867,6.322811155803745,16.570767238298266,19.597420100743562,16.132260809304718,25.017273444629527,15.994784804968566,11.41332651377731,9.957977745191222,22.14919481469041,35.39615459966903,18.633685841441373,16.16262010048375,13.051678703254579,36.280661584514526,21.680354815287707,16.514697355804273,28.14374641690387,19.23835855147853,3.6231477237154364,22.73458031658346,15.988657340078671,29.022987717843886,14.145512051297263,16.159247999887594,19.849420441713534,22.22884475833861,24.349734982450396,14.503585376048237,32.89395659998732,18.861379069936717,18.794437826715917,33.268838102627285,27.5247728992557,8.562131300283639,21.64909507835687,16.799272385935588,3.3883945207058863,29.228475925887608,21.228971405489435,20.216253415856787,23.47982979504085,16.402397612417282,30.397736738060093,19.961048304613588,22.574814656223285,26.608947718558078,15.37577183117247,36.32812048098507,11.003155694604988,24.47307666818038,35.122927799807954,20.05600972570962,27.133729978272413,7.589633156111644,13.407609406086278,6.37367994611497,9.679425630002815,8.584369351191867,21.563114565368885,11.31861570829535,14.835835183436945,27.23053451569873,18.72886998740197,18.980784901053735,17.631734264385365,15.229021996503112,11.939573754665386,16.536300922286948,30.634700306350744,5.572782316957459,34.31234121710983,10.306366153636146,18.499190800353347,26.453226760558724,31.087638648870765,6.584444629964148,19.736474593927014,16.97292104780445,27.748563286191672,18.8116043571381,11.749269599949338,6.751525983495386,13.183780478243122,28.40898754883673,26.024238665614448,16.15121821052477,13.438108798175119,17.825886215696492,6.503348097510204,26.144205920179495,33.88349106927407,36.55138024750394,25.05408931860936,18.280481532999534,7.6610007498595545,6.370642598626688,16.97916714992969,5.00286750994078,14.549912776054823,10.368505262136276,6.774338709024259,18.95737361723542,4.766988792820346,23.68707580148018,16.67915077103588,28.814175087397295,23.675586353828006,27.66436510946245,12.230822098574588,8.223615645530987,22.43896773551763,10.142471983817764,28.76111693476558,18.67838883257046,36.085128232860754,9.619778753482366,22.350418015978114,35.9977629931459,27.76374450462057,12.920567966785432,26.422337177175095,35.73812026604411,16.755441033970953,36.199540131973464,19.49379138708288,34.784041719726076,24.341759901773372,9.114398166551666,23.25182082512778,12.23674072910121,14.70698561531948,23.85529617747732,8.698213350247709,18.955036550269778,5.0222784184643965,19.137707795082672,11.120494754414395,5.610470668034111,11.877801732873726,3.362308532620464,19.471809720694765,25.256462915183654,12.693069397840224,31.438802098064894,18.98323598774342,14.264898921352646,17.084963270230155,28.487017817898924,13.862782281732308,21.910668133193568,29.113215741591652,4.3182190391411845,26.53168376841802,29.658602382218096,24.39249364840823,24.690215696205936,21.211604408249322,30.02175291778849,19.823930268467727,28.319522886803924,11.660627727812205,17.719282119146147,24.461704528197963,26.65441025938991,15.862616678405054,9.547492823141228,19.355789576629263,17.59533918986095,4.535956503694689,7.038409614529035,5.5070790497532585,12.414741855354654,17.317435855661884,31.836806406004794,17.132344250282546,19.593044576933654,12.172168778551086,4.119054914386124,14.593393933977836,11.355282629247988,23.06487085223539,7.267393723806763,22.462231987474798,20.86688861311592,15.45798707497654,29.002171643624735,25.270407978356115,21.483794608051422,36.28730359520185,28.539077993268247,10.455357451799507,27.074642466518537,24.992883414875745,14.034451279277185,23.053872515430438,30.086877864519366,21.351436998089802,15.213751025451295,35.81976056753366,12.484496351161516,12.522286442130351,11.396179459233245,28.42930194074252,17.782843375443832,31.785909855386155,15.929238290480523,16.09209926638913,31.79263695304288,11.199660435250514,13.894626368315617,20.026301065643267,36.617279478988195,17.217764330521465,29.189044601051993,20.357328494031343,12.45064513929941,16.854470697087635,7.18248877293155,13.707031413220202,13.61988050374142,22.97615924493737,33.423622168737595,33.41464979888204,11.75428044130275,25.148046452898242,21.710639132238555,29.004702710147743,2.059547617658546,8.077003324629235,20.49608729527005,34.22905351485932,20.550501417556788,16.626909868108118,24.514785296129897,25.58303644174081,28.641714096576948,27.167758252584434,14.926955413768614,28.871751256151263,5.6211937098727605,32.18633053169357,29.605212658529645,13.217098005441601,20.912501782797158,15.65370491783809,29.50217786704107,31.82105590021024,9.307883373879108,18.789402190222006,30.982278672389267,22.356372780324158,19.942426765188436,19.388063876124328,29.858794094782965,17.37235128229979,23.345681820331908,15.729333856680991,8.271150010999367,16.396136030100195,23.7412046450606,7.12652303413031,17.417187025249497,14.03671620941262,16.598953159896162,24.398276209085825,14.560921153413716,19.211898448717605,13.084749156050401,21.572539578612737,20.45881007743158,22.45488754881249,19.0826103249147,28.563584288874114,2.74411221551337,5.521542589590389,11.213712715311553,28.50647959742688,21.795181523028948,7.7689526467326875,21.316601504590068,13.865559309836542,18.443402464504764,5.164536336267083,18.266302717982818,18.952602235710945,24.612948789957507,19.201015540757396,29.069799612553897,11.675021174125241,17.568918241156517,19.71712909283132,24.43587495621665,18.148105158119268,17.863695257057245,18.547568900347006,19.738525113976472,33.38869810747894,25.594404856130062,21.640491648775956,23.104334070001595,20.84437327219038,26.860301244512637,28.310976466275534,14.913248269261103,25.778953339980717,27.132707812458914,17.509869052980502,26.01860097259585,7.51041393682049,28.848180370961643,24.844245300767096,24.155336232837463,32.91754410022732,30.932748689988674,23.11671403792744,30.865433881860245,16.78988333969427,27.029632944728633,14.33846337050499,20.67143041402175,14.034007384897041,4.965961689468972,11.226711284033012,24.757500129279183,2.060314569551074,13.842964914868087,23.57403271750671,16.860782675930057,26.431942863228347,10.426035898058096,22.43444125290259,15.375746255640053,9.394889672855236,32.605415886259244,23.904840452892515,27.337243099710506,24.66885197446484,20.28146717438217,11.318968382520481,2.218516337576295,8.240311116552288,31.066785708753606,27.293606416950755,25.856050205701415,30.37066910434685,20.090693069205628,24.22279422298256,22.360106040628196,16.37666100231584,16.18031213853074,20.380087869625868,25.780960810862915,2.589334688795044,24.009872922196806,8.53157057304815,18.558694074459186,26.424092361425732,5.903791168437844,27.68563056289513,31.756608999791695,11.949689595189398,19.095779584711337,20.13126291370132,16.391223123883442,15.490414265198655,3.2904782340876704,12.563991893549588,17.25929320750389,18.487625008799053,26.043323652303847,16.41055785571831,30.503221253977983,19.707855472250255,31.782534971253313,32.181721070708214,23.332341949584805,15.393831240796466,9.052856013473454,27.146795669417987,17.59933904123905,11.379176507328914,23.683030537662265,19.832182497269848,23.803493081207563,9.910495508406122,24.24974400798209,24.34627347874975,20.985496638920424,16.599800579183025,17.56767333389479,20.302886779929814,30.00668335439829,14.510620892823036,2.4595893767026,33.77495292583599,20.76449192871948,21.80911512478175,35.751314546802405,23.998205213124187,29.322214254429852,20.887194760177724,19.479647835563394,18.277109089438575,38.15829658481141,22.42407013004094,21.70504620652882,17.165950035225627,3.952187909745448,15.856407989013501,24.960711337753196,7.492722737967297,21.750513801686843,16.141056244994502,22.8846452059189,38.098636550005594,23.722544137533966,18.900198245902157,16.50283223221446,8.141864145849024,32.33597257751449,11.041169440866101,27.196059747944837,27.810478936999004,11.852725515393692,34.61116858198561,18.438706340677335,31.305621330453633,10.229164089551265,14.54545157801944,26.14686002003187,21.658336549087316,20.00831936364642,23.992146929975515,26.3168732033553,20.65526409717329,7.660992109970675,20.448547657292146,20.019569206528768,16.67060069969546,25.123015036074356,37.548048654756286,29.43987674341015,22.822053246510272,12.62037772841962,16.40780509592734,7.261123010824244,18.935634905022546,17.213143749988422,9.66354767058072,25.220123839687187,7.333923238098947,30.29497852944212,22.920157643593605,19.949066575838255,33.49252052566705,26.990269587458165,24.850574090952314,17.718272523700428,18.06110152802055,15.050793891307912,23.08429775136949,21.23770718656557,15.14343416538875,14.860339592358383,32.433262574975295,32.736873466974515,20.040230545842256,32.661271786758896,32.35181417954231,18.197187080650092,24.01181874286369,16.693500010731444,19.865936006201746,21.83469645234012,21.14731192611794,37.74697764967848,17.60950298951395,31.622926053062653,33.54128096182897,25.179811915018686,15.072743877659521,21.425642327123708,2.38360126688423,18.751695951552616,16.160177551792206,20.566405015512863,1.123983883885038,23.5345232310475,30.34696000146466,16.71502208956259,19.449798614846927,24.11424550936001,6.825923270256609,23.189264497510305,21.3227446875931,29.431523785005275,27.057550488209785,13.344818163824854,24.947049771877783,7.7277521646180025,9.316132203737627,16.30885526441474,18.925209897308374,16.571683682648594,34.02795355270746,31.892514609810934,16.524418794982108,6.3168702762213735,19.401658983712423,15.197812933626142,11.684025496758931,36.091085241235035,13.64548094222403,14.426659390058841,15.703608043660108,20.45917493261808,31.92974984094928,24.484268551747874,18.193204785340058,12.313388947697499,17.181353974380638,22.535958925678138,19.163543859439965,19.504516896925963,6.692132319725497,30.525776082486956,25.293755918522514,12.29229338742828,30.958080096179117,22.42321360091544,11.423512556244336,5.319994317297274,28.75349622568897],"a":[5.587403964445881,15.442345345234813,0.8270233972764185,12.649162615035912,3.6070293178917767,8.239283446293255,19.004928531073602,4.873518942422739,10.445255462640105,3.315913338165628,10.483239102016073,7.229202930388392,15.959269093150246,17.60953897495542,8.73486220783597,16.08969586194619,16.60675734566752,17.41281765584221,17.68004494823554,6.2455487398576,17.342282882548243,9.114118372911966,6.390597884510605,14.95282699250502,2.205529047972119,11.528456928900205,5.606748902447807,4.417017133711201,5.266776967190756,6.525137355754662,3.2820291782523947,19.446428750468275,0.25755448525132785,2.5140860866447223,5.090387723872771,5.06802285548718,8.445155059961564,18.323998818963886,5.653848637657077,15.861846624234097,15.323635587328631,15.53805903996508,14.690093504081867,17.19611883536738,1.121926407882814,14.087151516113376,16.998512470837337,2.635178691447635,2.5915354350272723,10.843224489837597,13.972127280286625,11.710413609777621,10.967779264603843,0.8903934565350236,3.0914615810229984,1.9035243686463188,16.20658864358276,13.373581767133311,2.6601092920437974,18.898109212228228,7.504585232919165,11.737364349762277,12.571973389773014,8.720674394484643,4.650292074345854,19.517822716395955,13.10090725493878,6.87609673426373,19.261783801222943,15.649083005973914,10.011532163387841,6.611730903123503,1.9136636571224752,8.11772888311073,5.917030110603538,14.87492881576928,16.818087591331924,2.1280714787815302,1.6267707582961721,3.904726650427075,19.51453727325096,9.747524659162043,6.759104904508217,8.002864325254073,15.714263996861,10.553965832846327,3.7492376417536555,5.400895227309843,18.204260990874506,4.6809477514612485,15.36636494789021,13.079991570928119,19.893902659753934,9.771274848469375,11.998280714431449,5.336647879105425,19.73030075735494,10.766692253786232,7.597790410112619,13.338975454345476,17.23124945466081,14.62635077724018,2.596797169218603,1.625046112960491,19.53970978328694,0.18048180485625842,10.993608152978279,0.8409987760694593,9.917621130314686,16.272140517630483,5.236607264170257,1.8860912924853679,9.702360133513386,7.950225273141904,0.6176819694805014,0.9473066548594433,1.604528204697413,1.3317759465032086,9.822068418069607,9.383961935158434,1.5583565932649623,0.8077527337754953,9.751863937145444,0.785532595784546,16.11214832101303,1.4085595217377156,19.17214910289367,0.9956786509271964,11.025947323288573,6.267178009118752,9.092840527647596,0.8856655889855602,18.421182585286346,11.269845659163064,7.5225845283913895,5.089104809542082,14.064010333624175,18.804425156164548,8.35047419366434,1.4715605991659064,2.1581324679702885,17.03621340144576,16.71622280354303,0.10278816841171601,15.18683017865393,0.633215094229862,14.674662075284592,11.967040993248226,18.9621594438879,8.581574713199114,14.114271687186664,19.215859798556487,3.110084753071707,10.517405752800686,12.382857659623049,4.357395764704095,8.43327370720132,5.676764021134972,15.828829956952454,7.537027284077076,10.126541761511447,8.041095674969846,8.680551863500483,5.589842569414563,15.61563710952397,17.338900528227295,16.000644054449648,6.266418796883433,7.477060188127758,6.231731912111158,5.250278906731225,11.470210355658374,4.90390591052027,12.589676003334773,13.09466139605278,11.310680299869453,12.683090417290032,6.526216699281244,18.116244197495668,16.876181539930425,13.886707689980122,8.639640420238344,18.40582071365223,14.711068829418839,5.215806832679268,18.955333263366278,18.489849032414835,19.61240270488199,13.759012233270935,6.491346236070901,6.083606373230563,2.778102400090625,19.402219035723874,14.069999854375993,17.750089794964026,11.137420360051236,7.057211336097886,13.786979291426729,6.381376394851568,3.743222123134484,13.397936588400277,14.807308355484082,19.85357900592276,12.076091528402575,12.873793918751417,18.24195871328463,16.37640785866617,4.642926395909508,2.553754617228523,11.580908030490754,16.82831047301729,1.5127077715672677,16.66474425810117,8.264306062697235,0.07416286000577532,19.853970147544032,7.214788557906662,5.500318968302977,9.902179255218385,12.288704224102588,5.6177041727973975,13.14823775936568,1.4300056251160642,14.49641155911269,13.124714847156845,5.574849147393945,14.576835813760027,19.607389678516007,0.7132371782625402,10.207386702258127,18.967498719172383,16.834289506970524,12.406300170905023,4.81928232502014,7.31434823184415,5.896211919021379,7.9822543722816075,8.029948772460841,11.012416406042561,3.079450795861214,3.6113211557531866,3.2236141172891264,15.10191699496053,12.428579802293038,19.48494487983828,0.619226760331002,13.07044691136085,7.731553348615399,8.989668762008893,14.721455385888497,11.261662163051383,10.389546314605088,2.4479608483549464,7.928470529267098,13.43991942897453,7.042819759775534,18.339985148078817,11.508489237475775,10.059669490956713,13.274083027730313,18.39113156531782,17.48572542034505,16.97982089343634,19.16440053463262,16.814105402898768,12.232102669450725,3.5389462313419795,2.6771434273586125,10.564673832043528,17.122767521373483,4.937497009405591,13.16076162460309,8.734721767438053,8.967352257414923,17.202540551027383,16.46135090530407,18.43419661423722,17.3253730913763,1.6452339879774902,16.61157586267823,6.635453753122262,15.604310699314649,14.370205317444572,15.798076064022219,14.085109966704724,3.045780310068995,7.328693813310183,1.4162543435418096,10.864241344972756,3.5182198447437774,12.350572365686393,19.929997603623892,8.528523547000324,11.318071350072945,3.797302049595288,3.550643716312778,0.5223798466533713,7.762534702515902,16.96213084107598,2.8776473388213075,12.962273068164873,12.069351372417163,8.81672178256558,6.3072205692621885,7.699537858045904,5.10052856834283,10.223974455343207,19.393088390493176,18.898156195076062,19.652566327165914,4.573846950120202,1.9414024308916966,9.99029676327436,13.381900289557969,11.578114208755089,12.386649459091878,9.831552817835156,19.258263196302508,5.3479217131823775,11.87909600223132,6.671667805584756,11.058647344657313,17.412939904538103,1.6262069199200768,14.569269395303174,5.9598195250870445,15.942078761360943,3.6324327155377123,19.909055817536636,4.040025279533732,9.344964864688997,10.478696792130918,18.608428808561264,18.33554880490417,14.955223299681734,16.403265470714445,5.685619902032459,14.256056038611566,7.320220549163277,5.4176330630434455,10.616957959058979,5.806459923305636,12.699074322320891,5.1502574794537415,16.748736681083592,17.683415500502413,7.575158160375461,11.277429507505872,19.86173276171764,11.739874980703288,12.027864837618063,3.3311539062288142,5.176476443915914,3.371809214483319,14.582552722637171,4.398969949792835,19.391093436647942,19.90948574446778,19.960938456054024,7.749065563672279,10.628507606563474,5.061708035777492,15.090416550628042,7.266929146424492,9.950371272160439,3.176997636437382,18.547257075948075,13.064178978646241,15.905755521895987,14.856869474752553,7.260508698057042,13.114093467024155,9.318284773636742,12.439385508505767,7.155817172151608,15.231051284088561,17.50236958378209,10.733132834147984,12.924909566161897,2.332871828774894,11.334620479924435,18.510078127688043,5.350969102349086,15.877566430558371,18.91746869930889,4.831173376403903,7.323906893735939,9.222772309013099,18.8178256307334,18.328454187777822,12.348668142923032,7.9072716463531645,11.258013175242919,14.135655192147599,19.270135650542265,15.028888572277118,18.081222191087335,5.927052181781445,4.516247929425705,9.38279234058363,15.299156917322382,15.09493178166914,10.142394371213461,10.779009067678924,1.025763050981765,8.79256778398827,2.990486345750889,5.985310904714609,8.96521119627414,16.16424996736688,0.20500819846156038,1.0593690810496659,0.08260870203722348,5.268122962155317,12.053374653766182,10.620065960020932,7.5796640818872385,7.233818782042083,19.033709701895564,3.6465159259970426,12.780052320064001,17.206918965871868,10.432102317872157,14.290486403365437,14.907206759914903,17.14730737087355,11.985436723950972,17.60981181436746,3.958754605384973,15.112425727554637,3.904271199792464,10.530877149919924,15.981905053883265,1.5323219743093341,17.464002053569363,4.4507737150147575,7.530649670456353,15.814069370073351,6.390635898472641,6.376789551902218,9.907547454675512,4.7306238039506665,1.9254206655928385,17.049720521036367,6.088173150982454,19.590443124331628,11.291099738570566,0.18046767308637524,14.189398032768743,6.5910799471874615,17.08151624840553,14.992392590397966,14.814884832681429,2.7738327617718284,15.087061676191222,11.116612722338065,15.79280641129027,12.64403887129657,6.564145201706197,8.363345062586557,0.015000876117170492,7.890822995111506,9.983089977325147,12.441795723666388,4.212674948660191,17.14906781765309,1.2382556231403141,2.75691334431174,0.9613248675072761,5.550982110011362,1.5406958064762621,7.480924903662225,6.799893015838032,9.193729667214257,0.0979710621944907,8.984702611258019,18.198596761974912,12.607134575231758,15.676816238471321,2.8902972772049296,17.05966104597084,15.133582688035666,9.513224390058689,15.967771774343937,2.4371711612186786,0.33163927524868964,12.075507128443395,4.142237611535502,16.309467635492567,1.2131031313504659,13.237591849394207,11.074712080698323,7.2123892165869385,18.367916268972806,13.826380834830875,16.060515175981934,0.8057130149518388,11.883071483566647,14.145931290565992,13.19398941883707,0.4653965368930635,11.239943869064323,12.902985593737796,1.7002344230165711,10.159590794592251,18.633188274587216,4.238642155540835,13.42664892741784,9.982488370701269,14.31022227448523,12.272657985833142,16.51746387752139,9.351774658566638,14.94726521551717,19.88873547753152,5.114898284249096,6.9306911088928835,18.070522216593265,16.242188623973167,11.539924168712862,3.0663803380717036,12.906448587970658,1.1239670683944425,2.8018565189951827,2.6709342583064988,2.0584681093898016,7.890091107711705,14.47448706422672,8.13461373263146,16.02916983525743,8.83826231897537,6.586956882704511,2.8274717607040945,4.552712605104019,14.806255937188784,18.763277755364946,1.5738983919579663,15.977899423941269,4.833557625191078,6.013242100558975,15.497742839398573,16.808487869600715,5.331651047275288,14.507229958581265,15.683294432213764,17.56642217403259,18.13508816024884,9.763651075963228,4.431867412042609,12.70296989011175,16.810349845237727,15.669483273576038,14.935468693039425,0.7554838863023638,8.409700022036901,2.611929831719806,12.776792903521406,18.318610739146656,17.652621217622997,9.819091923479156,17.74715807899959,1.1130894035117977,2.2850412387262287,11.704717300170596,4.858664656396421,5.8408401183046355,5.393812574968098,2.3506593849097657,1.9803810184827064,3.7132557905252916,7.634702091800651,11.596332511648018,17.69538443583317,17.64232608416634,15.670724665891749,7.088181430983469,2.5675126225471834,13.742243088583507,2.288258523661013,11.884340591333604,2.1242166574972465,18.663409608828058,3.28949273075271,11.324154930895634,19.048840571916145,13.042361419400535,7.672872878347761,18.49715928915277,17.187964346090993,3.284700044924098,19.02992150064499,10.310774908681442,19.921278308632413,8.532925514026752,3.5630279978964152,11.198930442155826,2.2260642039282708,2.1431813519051968,14.692351068414693,3.4103809053522127,4.085644567821309,1.6368924814523478,9.852433616664559,0.1650708874785911,0.5466713151670799,3.2177598965070953,1.5847134380821082,5.696754123795493,8.039195068915985,6.063100600475155,13.196166039675155,6.905976151968662,12.418240463246818,7.165802656644367,8.819420530277572,0.9166810457180885,16.486331856678063,11.294902638748795,3.6346131072726973,13.809234081934223,18.869340205351083,10.527349228762745,5.6836909575687145,12.308496119988499,12.889865416879784,11.699559818391165,17.24349147923824,10.42674527338284,9.204080791914432,7.325476296443925,15.633808583243077,10.153843508099989,1.3030405233113473,2.257753673636369,4.386727681164344,2.2322515784642816,2.9890925319552153,3.640797614961504,6.859816407026504,14.275064483798406,18.622771247797772,13.363771765476127,10.349070200270546,1.8004213362651056,2.7768927997362036,9.575691383674645,8.188739678192412,19.389129356451313,4.871393593873652,9.372515894850796,12.670534696976198,13.156572882127598,13.837637828052078,9.46121287358174,8.335062981484857,19.824220209742233,19.094765449397926,2.714062373023265,16.7626123299302,6.276458047942182,12.23751489451255,11.659192475851704,14.001182559702755,13.550533305641359,1.8982834651397207,17.099151259278344,8.471774175475941,8.394480174318018,5.823631060904959,11.98526074392361,10.256383936466431,13.79634380509605,6.732585627758545,0.6062152897629325,14.559713772896163,10.397758894563927,13.43135724884636,16.816642927467704,18.242729397944263,8.070114933428233,13.38681201664608,18.357614705136562,5.115160029422063,9.270858175327827,2.0005954948789295,10.478359632186876,8.069129262365617,5.635969706732511,17.59006744271238,18.174856376913144,6.761059325131389,10.532482670884002,9.189520008818253,17.184512545538396,0.2700556946627186,7.733370947776987,13.74407704151908,15.171106849183777,17.107343754537695,0.3355728347243492,12.337840314113917,14.96556793633523,19.903525987970838,19.88126254934962,4.841654711423562,14.336201214502964,4.920829412956373,16.664477198112913,16.999294089823223,4.330872378981239,5.496482380851515,12.228584811564822,10.042974292615687,13.389912743440004,1.9241297847869898,2.963532351753204,12.022942594784634,3.2217656221160507,2.618132638184827,6.810157645726056,19.035820082798814,0.2799662628043098,11.371449135330668,7.096636362590187,2.0772573882841128,2.770334028753876,12.31289263789443,2.4777967732521056,6.694941747037952,3.2501226173225684,15.35978561494851,6.0868504362637355,7.098131283220099,0.010292422407567337,6.6157672357215125,5.325754321903311,3.5296720920363445,6.591138700298509,17.944582577368028,16.25738515337597,0.5380200176912231,0.4171964444719656,10.806930405940914,9.875925932693153,13.126675105995847,4.742883160539826,10.567368661733557,7.2087428776095175,12.28561679316365,1.005376431044409,13.320668689048421,0.9546101904303717,7.008868013323104,8.761973346270938,13.26140319292925,0.026621333344301057,5.536486273136405,6.804834707475282,10.132700345189335,12.38293944036123,3.6896706673874036,7.459297546838535,7.149866626468073,15.323774117390542,8.571442336341462,4.533427836672437,4.709835733560657,8.867571650495387,18.356430161742168,13.620815306275809,12.651112263265905,15.338170723871105,12.069724973538353,1.195158046258915,11.900720496069287,5.004181160085519,10.823883617735461,19.398533600663875,11.721210745777523,17.106241763454996,14.299670539855018,3.5109803483639013,15.348961235201957,11.349185808544018,19.58890337976832,6.782607634811053,11.546187583075454,0.5943693272507611,4.2506248514657585,4.908971427197906,11.57472073641502,0.5636011233407867,12.292399387940623,7.75614748240828,5.495348547175802,19.526470322196722,3.926887328904387,14.77821287382547,2.446847127588332,3.572662341152202,13.051518370210422,15.405750092448379,11.760059594405803,13.161697363041952,2.34645935773814,5.865070413837099,0.3227671874934579,5.120420021868721,12.652285857997638,10.812372580291768,15.28772434613639,17.078957783253138,19.728346521875938,6.890580028219797,15.394639532729473,6.004650748616744,0.9096109211699099,7.311309724904103,15.335650536469206,1.6665302000580429,9.145551818609,6.667620864093524,2.549475662463916,13.901429297709619,0.01106484912499095,11.267729020269588,16.18936605816449,5.765302898050546,6.746686836437474,15.296720336479922,6.616728535147942,6.313494157423842,0.8091304637415453,6.335879520132615,4.566535522341888,11.392284468132301,8.43582632786456,11.620793178955982,11.291348196526814,3.4090314748403294,13.607899257859074,17.579340895199167,19.582861980917542,1.6812708960043432,7.393079318670082,18.431364532970353,10.013603711683153,8.255823501374028,6.398864545781162,13.566848888239807,4.799247201677059,2.81330509697459,4.814267488000343,5.0129138038797905,10.92160845425845,10.727082436001742,7.603498619028715,1.5126075714445442,14.09536621219206,11.196539374641379,1.2641932883866724,14.797147276155581,6.7462851112842515,15.672643310819963,17.51092495797038,16.26263200820255,12.788683427163496,13.426522177075801,3.181192462332927,14.705082127451629,19.458022863435552,19.748372625081,12.177398747588576,16.074491779744292,3.074222910725317,12.668595939594244,13.591767135462721,7.278345693330079,4.188377014232456,0.4238675950346016,4.413719388549722,18.708055170965654,7.250652240841804,2.655193492093866,11.38004733052254,0.301014550742309,13.561542571229674,5.044042983220254,18.82695262202597,11.227597348934491,2.601223265782995,18.118799764215197,17.724327288898785,18.88943923176511,9.563338706345522,13.615137158372153,19.674525380867138,17.811037726574163,7.128721202369426,18.365920397018037,13.004552123815358,19.070564264591553,2.1113622704379553,10.280569976404571,8.190319938522034,4.8675920549034934,6.40832560046618,18.459876663115292,19.239845434354784,4.8832935125135,11.037202449399182,4.389934252264429,5.317486176226742,15.273878032572497,10.111457148782979,8.348743959594977,5.8275840593807215,4.272968257042411,18.729997922072315,6.285678932881682,3.990599530337686,19.41574506465729,9.218933190857266,15.953709709308356,7.995451991784166,15.574898145073707,4.942446066806592,7.070261928308481,15.71673628737174,7.0299383060407905,14.31531624242892,12.923059753292074,13.92213616638491,17.839219767878866,19.66239936241317,16.294195782803737,15.965442348003048,19.869377238119785,1.7205324424867108,4.227308879214662,6.6894331342339886,12.207345392416942,19.28884605095002,15.033662812657841,16.06652758886242,15.622472037766567,19.55068250593741,2.138279370980678,14.255319719734407,0.22527876021442683,15.128928364052161,14.886827054345474,14.746678628896142,0.9810656223552483,13.722271434099977,13.954238976647,14.806693616048928,1.6020129299282626,19.798511981954633,1.1489677842149648,7.760144422321473,19.51694303691204,9.725929597462581,10.49451114316672,9.975259958706921,19.704961513397127,5.679095140673094,4.706375443261188,7.570124789415642,3.594912510086501,11.749688359377103,19.646315724831837,18.643282216870986,11.54637040937609,1.7680344180534568,1.8754374921905503,6.1599458313855715,5.968394291976291,18.68994276280216,4.27257179372543,2.446385246430345,14.989467461665784,16.59773440676812,13.83871613929539,6.284338719612128,14.354179532240764,4.9040410948280355,11.868473725206353,8.634291321730112,2.1294776949635263,2.8106225127230555,3.4389255814449005,11.80848795759931,6.024281522915564,7.314036731330957,18.110199993005086,12.71897637416545,9.152457940517337,1.07719720614325,11.577760464945923]}
},{}],72:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/logpdf/test/test.factory.js")
},{"./../lib/factory.js":66,"./fixtures/julia/large_range.json":69,"./fixtures/julia/medium_range.json":70,"./fixtures/julia/small_range.json":71,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":45,"@stdlib/constants/float64/pinf":46,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/abs":52,"tape":207}],73:[function(require,module,exports){
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
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logpdf` functions', function test( t ) {
	t.equal( typeof logpdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/logpdf/test/test.js")
},{"./../lib":67,"tape":207}],74:[function(require,module,exports){
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
	t.equal( typeof logpdf, 'function', 'main export is a function' );
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/logpdf/test/test.logpdf.js")
},{"./../lib":67,"./fixtures/julia/large_range.json":69,"./fixtures/julia/medium_range.json":70,"./fixtures/julia/small_range.json":71,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":45,"@stdlib/constants/float64/pinf":46,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/abs":52,"tape":207}],75:[function(require,module,exports){
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
			out = replace.call( out, RE_PERIOD_ZERO_EXP, 'e');
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

},{"./is_number.js":78}],76:[function(require,module,exports){
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

},{"./is_number.js":78,"./zero_pad.js":82}],77:[function(require,module,exports){
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

var formatInterpolate = require( './main.js' );


// EXPORTS //

module.exports = formatInterpolate;

},{"./main.js":80}],78:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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
var isnan = isNaN; // NOTE: We use the global `isNaN` function here instead of `@stdlib/math/base/assert/is-nan` to avoid circular dependencies.
var isArray = Array.isArray; // NOTE: We use the global `Array.isArray` function here instead of `@stdlib/assert/is-array` to avoid circular dependencies.


// FUNCTIONS //

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
				break;
			case 'c':
				// Case: %c (character)
				if ( !isnan( token.arg ) ) {
					num = parseInt( token.arg, 10 );
					if ( num < 0 || num > 127 ) {
						throw new Error( 'invalid character code. Value: ' + token.arg );
					}
					token.arg = ( isnan( num ) ) ?
						String( token.arg ) :
						fromCharCode( num );
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

},{"./format_double.js":75,"./format_integer.js":76,"./is_string.js":79,"./space_pad.js":81,"./zero_pad.js":82}],81:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

var formatTokenize = require( './main.js' );


// EXPORTS //

module.exports = formatTokenize;

},{"./main.js":84}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

var format = require( './main.js' );


// EXPORTS //

module.exports = format;

},{"./main.js":87}],86:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"dup":79}],87:[function(require,module,exports){
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
	var tokens;
	var args;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	tokens = tokenize( str );
	args = new Array( arguments.length );
	args[ 0 ] = tokens;
	for ( i = 1; i < args.length; i++ ) {
		args[ i ] = arguments[ i ];
	}
	return interpolate.apply( null, args );
}


// EXPORTS //

module.exports = format;

},{"./is_string.js":86,"@stdlib/string/base/format-interpolate":77,"@stdlib/string/base/format-tokenize":83}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var constantFunction = require( './constant_function.js' );


// EXPORTS //

module.exports = constantFunction;

},{"./constant_function.js":88}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":95}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],93:[function(require,module,exports){
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

},{"./define_property.js":93}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":92,"./has_define_property_support.js":94,"./polyfill.js":96}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":85}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
},{"base64-js":102,"buffer":105,"ieee754":193}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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
},{"_process":199}],108:[function(require,module,exports){
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

},{"events":106,"inherits":194,"readable-stream/lib/_stream_duplex.js":110,"readable-stream/lib/_stream_passthrough.js":111,"readable-stream/lib/_stream_readable.js":112,"readable-stream/lib/_stream_transform.js":113,"readable-stream/lib/_stream_writable.js":114,"readable-stream/lib/internal/streams/end-of-stream.js":118,"readable-stream/lib/internal/streams/pipeline.js":120}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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
},{"./_stream_readable":112,"./_stream_writable":114,"_process":199,"inherits":194}],111:[function(require,module,exports){
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
},{"./_stream_transform":113,"inherits":194}],112:[function(require,module,exports){
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
},{"../errors":109,"./_stream_duplex":110,"./internal/streams/async_iterator":115,"./internal/streams/buffer_list":116,"./internal/streams/destroy":117,"./internal/streams/from":119,"./internal/streams/state":121,"./internal/streams/stream":122,"_process":199,"buffer":105,"events":106,"inherits":194,"string_decoder/":206,"util":103}],113:[function(require,module,exports){
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
},{"../errors":109,"./_stream_duplex":110,"inherits":194}],114:[function(require,module,exports){
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
},{"../errors":109,"./_stream_duplex":110,"./internal/streams/destroy":117,"./internal/streams/state":121,"./internal/streams/stream":122,"_process":199,"buffer":105,"inherits":194,"util-deprecate":215}],115:[function(require,module,exports){
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
},{"./end-of-stream":118,"_process":199}],116:[function(require,module,exports){
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
},{"buffer":105,"util":103}],117:[function(require,module,exports){
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
},{"_process":199}],118:[function(require,module,exports){
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
},{"../../../errors":109}],119:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],120:[function(require,module,exports){
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
},{"../../../errors":109,"./end-of-stream":118}],121:[function(require,module,exports){
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
},{"../../../errors":109}],122:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":106}],123:[function(require,module,exports){
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

},{"./":124,"get-intrinsic":188}],124:[function(require,module,exports){
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

},{"function-bind":187,"get-intrinsic":188}],125:[function(require,module,exports){
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

},{"has-property-descriptors":189,"object-keys":197}],129:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/isNaN":178,"../helpers/isPrefixOf":179,"./ToNumber":160,"./ToPrimitive":162,"./Type":167,"get-intrinsic":188}],132:[function(require,module,exports){
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

},{"get-intrinsic":188}],133:[function(require,module,exports){
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

},{"./DayWithinYear":136,"./InLeapYear":140,"./MonthFromTime":150,"get-intrinsic":188}],134:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":183,"./floor":171}],135:[function(require,module,exports){
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
	}
	throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');

};

},{"../helpers/assertRecord":175,"./IsAccessorDescriptor":141,"./IsDataDescriptor":143,"./Type":167,"get-intrinsic":188}],139:[function(require,module,exports){
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

},{"../helpers/timeConstants":183,"./floor":171,"./modulo":172}],140:[function(require,module,exports){
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

},{"./DaysInYear":137,"./YearFromTime":169,"get-intrinsic":188}],141:[function(require,module,exports){
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

},{"../helpers/assertRecord":175,"./Type":167,"has":192}],142:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":195}],143:[function(require,module,exports){
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

},{"../helpers/assertRecord":175,"./Type":167,"has":192}],144:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":180,"./IsAccessorDescriptor":141,"./IsDataDescriptor":143,"./Type":167}],146:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/timeConstants":183}],147:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"./DateFromTime":133,"./Day":134,"./MonthFromTime":150,"./ToInteger":159,"./YearFromTime":169,"./floor":171,"./modulo":172,"get-intrinsic":188}],148:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/timeConstants":183,"./ToInteger":159}],149:[function(require,module,exports){
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

},{"../helpers/timeConstants":183,"./floor":171,"./modulo":172}],150:[function(require,module,exports){
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

},{"../helpers/isNaN":178}],152:[function(require,module,exports){
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

},{"../helpers/timeConstants":183,"./floor":171,"./modulo":172}],153:[function(require,module,exports){
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


},{"../helpers/isFinite":176,"./ToNumber":160,"./abs":170,"get-intrinsic":188}],155:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":183,"./DayFromYear":135}],156:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":183,"./modulo":172}],157:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/isNaN":178,"../helpers/sign":182,"./ToNumber":160,"./abs":170,"./floor":171}],160:[function(require,module,exports){
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

},{"./CheckObjectCoercible":132,"get-intrinsic":188}],162:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":184}],163:[function(require,module,exports){
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

},{"./IsCallable":142,"./ToBoolean":157,"./Type":167,"get-intrinsic":188,"has":192}],164:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":188}],165:[function(require,module,exports){
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

},{"../helpers/isFinite":176,"../helpers/isNaN":178,"../helpers/sign":182,"./ToNumber":160,"./abs":170,"./floor":171,"./modulo":172}],166:[function(require,module,exports){
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

},{"call-bind/callBound":123,"get-intrinsic":188}],170:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":188}],171:[function(require,module,exports){
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

},{"../helpers/mod":181}],173:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":183,"./modulo":172}],174:[function(require,module,exports){
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

},{"./isMatchRecord":177,"get-intrinsic":188,"has":192}],176:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],177:[function(require,module,exports){
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

},{"has":192}],178:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],179:[function(require,module,exports){
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

},{"call-bind/callBound":123}],180:[function(require,module,exports){
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

},{"get-intrinsic":188,"has":192}],181:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],182:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
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

},{"./helpers/isPrimitive":185,"is-callable":195}],185:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":186}],188:[function(require,module,exports){
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

},{"function-bind":187,"has":192,"has-symbols":190}],189:[function(require,module,exports){
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

},{"get-intrinsic":188}],190:[function(require,module,exports){
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

},{"./shams":191}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":187}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
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

},{}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
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

},{"./isArguments":198}],197:[function(require,module,exports){
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

},{"./implementation":196,"./isArguments":198}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
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
},{"_process":199,"through":213,"timers":214}],201:[function(require,module,exports){
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

},{"buffer":105}],202:[function(require,module,exports){
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

},{"es-abstract/es5":174,"function-bind":187}],203:[function(require,module,exports){
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

},{"./implementation":202,"./polyfill":204,"./shim":205,"define-properties":128,"function-bind":187}],204:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":202}],205:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":204,"define-properties":128}],206:[function(require,module,exports){
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
},{"safe-buffer":201}],207:[function(require,module,exports){
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
},{"./lib/default_stream":208,"./lib/results":210,"./lib/test":211,"_process":199,"defined":129,"through":213,"timers":214}],208:[function(require,module,exports){
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
},{"_process":199,"fs":104,"through":213}],209:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":199,"timers":214}],210:[function(require,module,exports){
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
},{"_process":199,"events":106,"function-bind":187,"has":192,"inherits":194,"object-inspect":212,"resumer":200,"through":213,"timers":214}],211:[function(require,module,exports){
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
},{"./next_tick":209,"deep-equal":125,"defined":129,"events":106,"has":192,"inherits":194,"path":107,"string.prototype.trim":203}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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
},{"_process":199,"stream":108}],214:[function(require,module,exports){
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
},{"process/browser.js":199,"timers":214}],215:[function(require,module,exports){
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
},{}]},{},[72,73,74]);
