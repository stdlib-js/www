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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":52}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":53}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":54}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":140}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":140}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":140}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":140}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":96}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_even.js":56}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/math/base/assert/is-integer":59}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_integer.js":60}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/math/base/special/floor":77}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

'use strict';

/**
* Test if a finite double-precision floating-point number is a nonnegative integer.
*
* @module @stdlib/math/base/assert/is-nonnegative-integer
*
* @example
* var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
*
* var bool = isNonNegativeInteger( 1.0 );
* // returns true
*
* bool = isNonNegativeInteger( 0.0 );
* // returns true
*
* bool = isNonNegativeInteger( -10.0 );
* // returns false
*/

// MODULES //

var isNonNegativeInteger = require( './is_nonnegative_integer.js' );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./is_nonnegative_integer.js":64}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Tests if a finite double-precision floating-point number is a nonnegative integer.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is a nonnegative integer
*
* @example
* var bool = isNonNegativeInteger( 1.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( 0.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( -10.0 );
* // returns false
*/
function isNonNegativeInteger( x ) {
	return (floor(x) === x && x >= 0);
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/math/base/special/floor":77}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_odd.js":66}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/math/base/assert/is-even":55}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":68}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/number/float64/base/from-words":100,"@stdlib/number/float64/base/get-high-word":104,"@stdlib/number/float64/base/to-words":115}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./copysign.js":71}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./expmulti.js":74,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/trunc":94}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":76,"@stdlib/math/base/special/ldexp":79}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./exp.js":73}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./ldexp.js":80}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":47,"@stdlib/constants/float64/max-base2-exponent-subnormal":46,"@stdlib/constants/float64/min-base2-exponent-subnormal":48,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-infinite":57,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/copysign":72,"@stdlib/number/float64/base/exponent":98,"@stdlib/number/float64/base/from-words":100,"@stdlib/number/float64/base/normalize":106,"@stdlib/number/float64/base/to-words":115}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./pow.js":87}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":84,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/number/float64/base/get-high-word":104,"@stdlib/number/float64/base/set-high-word":110,"@stdlib/number/float64/base/set-low-word":112}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":86,"@stdlib/number/float64/base/set-low-word":112}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],85:[function(require,module,exports){
arguments[4][76][0].apply(exports,arguments)
},{"dup":76}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./log2ax.js":82,"./logx.js":83,"./pow2.js":88,"./x_is_zero.js":89,"./y_is_huge.js":90,"./y_is_infinite.js":91,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-infinite":57,"@stdlib/math/base/assert/is-integer":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/assert/is-odd":65,"@stdlib/math/base/special/abs":67,"@stdlib/math/base/special/sqrt":92,"@stdlib/number/float64/base/set-low-word":112,"@stdlib/number/float64/base/to-words":115,"@stdlib/number/uint32/base/to-int32":119}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":85,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ln-two":45,"@stdlib/math/base/special/ldexp":79,"@stdlib/number/float64/base/get-high-word":104,"@stdlib/number/float64/base/set-high-word":110,"@stdlib/number/float64/base/set-low-word":112,"@stdlib/number/uint32/base/to-int32":119}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-odd":65,"@stdlib/math/base/special/copysign":72}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/number/float64/base/get-high-word":104}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/special/abs":67}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":93}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":95}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/math/base/special/ceil":69,"@stdlib/math/base/special/floor":77}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":99}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":104}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":102}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./indices.js":101,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":105}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./high.js":103,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":107}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./normalize.js":108}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/smallest-normal":51,"@stdlib/math/base/assert/is-infinite":57,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":67}],109:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":103}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":111}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./high.js":109,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":114}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":34}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./low.js":113,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":117}],116:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":101}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./to_words.js":118}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./indices.js":116,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":120}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Returns a function for evaluating the moment-generating function (MGF) of a binomial distribution with number of trials `n` and success probability `p`.
*
* @param {NonNegativeInteger} n - number of trials
* @param {Probability} p - success probability
* @returns {Function} MGF
*
* @example
* var mgf = factory( 10, 0.5 );
* var y = mgf( 0.3 );
* // returns ~5.013
*/
function factory( n, p ) {
	if ( isnan( n ) ||
		isnan( p ) ||
		p < 0.0 ||
		p > 1.0 ||
		!isNonNegativeInteger( n ) ||
		n === PINF
	) {
		return constantFunction( NaN );
	}
	return mgf;

	/**
	* Evaluates the moment-generating function (MGF) for a binomial distribution.
	*
	* @private
	* @param {number} t - input value
	* @returns {number} evaluated MGF
	*
	* @example
	* var y = mgf( 0.5 );
	* // returns <number>
	*/
	function mgf( t ) {
		var base;
		if ( isnan( t ) ) {
			return NaN;
		}
		base = 1.0 - p + (p * exp(t));
		return pow( base, n );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/assert/is-nonnegative-integer":63,"@stdlib/math/base/special/exp":75,"@stdlib/math/base/special/pow":81,"@stdlib/utils/constant-function":132}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the moment-generating function (MGF) for a binomial distribution.
*
* @module @stdlib/stats/base/dists/binomial/mgf
*
* @example
* var mgf = require( '@stdlib/stats/base/dists/binomial/mgf' );
*
* var y = mgf( 0.5, 20, 0.2 );
* // returns ~11.471
*
* y = mgf( 5.0, 20, 0.2 );
* // returns ~4.798e29
*
* y = mgf( 0.9, 10, 0.4 )
* // returns ~99.338
*
* @example
* var factory = require( '@stdlib/stats/base/dists/binomial/mgf' ).factory;
*
* var mgf = factory( 10, 0.5 );
*
* var y = mgf( 0.3 );
* // returns ~5.013
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var mgf = require( './mgf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( mgf, 'factory', factory );


// EXPORTS //

module.exports = mgf;

},{"./factory.js":121,"./mgf.js":123,"@stdlib/utils/define-nonenumerable-read-only-property":133}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Evaluates the moment-generating function (MGF) for a binomial distribution with number of trials `n` and success probability `p` at a value `t`.
*
* @param {number} t - input value
* @param {NonNegativeInteger} n - number of trials
* @param {Probability} p - success probability
* @returns {number} evaluated MGF
*
* @example
* var y = mgf( 0.5, 20, 0.2 );
* // returns ~11.471
*
* @example
* var y = mgf( 5.0, 20, 0.2 );
* // returns ~4.798e29
*
* @example
* var y = mgf( 0.9, 10, 0.4 );
* // returns ~99.338
*
* @example
* var y = mgf( 0.0, 10, 0.4 );
* // returns 1.0
*
* @example
* var y = mgf( NaN, 20, 0.5 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, NaN, 0.5 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, 20, NaN );
* // returns NaN
*
* @example
* var y = mgf( 0.2, 1.5, 0.5 );
* // returns NaN
*
* @example
* var y = mgf( 0.2, -2.0, 0.5 );
* // returns NaN
*
* @example
* var y = mgf( 0.2, 20, -1.0 );
* // returns NaN
*
* @example
* var y = mgf( 0.2, 20, 1.5 );
* // returns NaN
*/
function mgf( t, n, p ) {
	var base;
	if (
		isnan( t ) ||
		isnan( n ) ||
		isnan( p ) ||
		p < 0.0 ||
		p > 1.0 ||
		!isNonNegativeInteger( n ) ||
		n === PINF
	) {
		return NaN;
	}
	base = 1.0 - p + (p * exp(t));
	return pow( base, n );
}


// EXPORTS //

module.exports = mgf;

},{"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/assert/is-nonnegative-integer":63,"@stdlib/math/base/special/exp":75,"@stdlib/math/base/special/pow":81}],124:[function(require,module,exports){
module.exports={"expected":[2.4984753772144323e29,1.49289967485094,11.507832779686145,2.799099204092723e103,1.0,7.208359562182974e143,3.5783430731571995e105,2.3337204801153552e29,5.201760189973766e22,1.5579516794298583e24,1.2414805646872353e14,2.3826394280132268e24,4.8058242016250895e65,4.427195963457073e35,1.0793118224113995e121,5.008729606510727e27,2.266100380075466e16,1.4639206942022168e6,3.8778331774399726e65,2.305655124047201e67,4.147957371342038e145,240.3583542622627,215112.9598315282,3.592829061137687e73,2.1146159242759484e13,2.885307577183232e40,4.082986824826211e177,3.688296477132452e19,901862.4995978608,5.813872921399936e74,2628.5394858528502,8.568853244340113e22,1.0984384882380383e40,2.0549876908962223e86,9.87977706937278e19,7.037577018773128e150,2.160105762984694e47,1.6856351677711092e140,7.5232933260187405e62,1.610222750760045e32,1.6829547408246526e12,3.440316163741431e159,1.054323176736456e84,1.3393399642757682e7,259.7585098987208,1.3293010922617682e62,2.240241902483949e99,5.03257949919054e40,3.698636934554221e54,9.588891727743421e91,3.155592277594667e26,9.784579400424431e55,3.4219368957321897e75,1.3359589579551476e29,9.143889960843274e48,46.25740128016222,2.5896429952493665e77,2.42687319097775e108,4.3018402431785965e75,2.398122692167955e60,2.740381502004621e39,566.8951735340098,4.820011581081215e204,1.723991165619639e119,2250.1717743144723,12155.530333653127,1.8652162480455176e88,2.826638015787932e24,1138.3372420537576,3.4443406847563017e25,4.5340253628792745e8,27.44428565535699,5.967288053896342e74,4.776631603676434e98,1.5652253288499512e71,4.3364765506303156e23,1.3252523023984566e39,1.3403571148507647e37,1.1762625307889176e239,1.2000177549946146e41,1.7739455106450747e52,2.5103344142154242e61,4.8588787157257875e13,1.2192789920359283e77,1431.1005955068833,1.0695185467183172e29,269.2145108706244,46.28218431749315,6.249663883490848e42,1.5985079802722046e195,2.572109428414226e29,4.275273767080034e93,10019.6949344315,5.566214695543254e37,1.0,2.3746650548804694e19,1.3294643071419655e11,4.8759878779477843e176,2.9070789558220103e25,7.921243923406533e132,4.62152696410901e165,3.6654160785954883e58,1.8837096979054293e107,4.867679475579337e76,5.526270510844233e223,3.187558786250888e14,5.380669548657421e43,48.04832428623171,9.395041885444623e11,2.103988195598526e188,5.123632744665027e15,3.096473838299725e44,947175.0420750934,2.1917722344868624e107,2.4220972349576195,2.4882364955575027e212,126.60551738727602,9.327734817743211e63,8.185535878760905e10,3.50217431895025e157,1.4006508470555025e15,2.7250317552534344e10,1.2643431439746588e8,2.1690320793205266e9,9.019310308843907e84,3.858627406351895e56,1.723184291159715e26,1.7591693409153848,5.199713345228086e37,1.1539303106045837e9,5.1663072574427186e69,4.312568566606411e73,7664.885981933367,60.51272164244802,1.6427289535015292e37,2.0773828960907188e27,1.6228433290953177e93,9.237858632668129e14,2.7766208728347233e38,2.7856371000917577e196,1.7377277623289202e89,8.300152813706334e189,9.546214278185135e58,1.0,1.968575853835922e80,9.537135362220603,1.2411068388377797e28,4.279761135008333e197,6.846551189862044e19,1.5024951438232014e16,1.673017757497163e188,2.3354161222574244e107,49.232570676210635,1.6394864541554058e43,776684.5883905287,1.64098114850455e13,13.147980058259863,3.214371514160516e39,2.2267043005653274e48,8.920449612765647e173,2.2614409435831075,2.067140206932464e125,6.07062737782018e8,1.008247858783085e113,964992.2037626735,2.4422322422802862e88,2489.725612380715,3.0623659834549724e37,1.6545627647423436e33,4.410772671922673e73,614.8922563492879,1.6315210111398506e74,7.706869462282752e51,811937.8377355662,4.113789446349061e80,6.566147615130907e58,5.819611314981315e8,3.649613679485594e23,2294.273291253242,1.2512618957281802e82,1.2010827151555497e69,5.96036691877388e79,6.402416067671308e30,7.722930653262628e8,2.931345629878969e94,3.2241030092558606e62,2.0647120517396777e55,1.0529919803954442e8,4.1295575524219975e48,8.352407323187179e16,5.2847411426758215e7,3.3418683150251187e55,3.551714409775178e147,1.4249217208902692e11,1.569977567606881e41,4.263312940345593e35,7.581382423425586e41,2.892332992713207e86,1.0116620046899631e173,1.1229683972077015e87,1.1601495614325477e19,1.9016064058757195e75,1.661738864518106e20,1.3175821301412556e20,1.3567385104970688e6,1.3178053600752124,1.8170730090632822e48,1.234808589419804e37,14691.734070584742,1.2575439038088028e19,1.0862976738463373e14,2.211017720828992e60,5.833996920400654e52,1.061473561275601e24,1.3932635753537807e122,3.913595997294984e120,2.0509052316389546e96,2.0758866697735499e21,1.999725530148089e38,8.721954734214722e54,8.13168336745379e17,1.2923432711310773e30,1.767032769368907e60,3.075082278333652e79,1.0955700949110074e12,3.9317449219677186e23,4.1046594284531686e18,6.399555764588726e13,9.1664419361863e120,4.987827379107391e25,9.586203775481662e158,7.93518794243799e8,2.2491227892246e11,2.2250853506362708e31,1.6104400293058947e10,7.902329319235013e49,2.0706276117700363e75,6.15144879297956e12,323.5151952578421,1.7389710172554146e87,1.2089341128262672e88,7.814391073795729e18,1.6072155656920967e30,3.3075838617461592e19,8.882435595399704e107,1.2530962541550507e45,4.720264201393614e82,1.6324804763872116e10,2.0572447047322068e37,3.2461763405209045e130,4.87887268987889e22,1.1278814159432755e9,1.5404868611772067e58,1.2799893233962473e8,7.231128727498773e132,3.2936319699167014e127,8.270650473334598e41,1.5717954806667115e71,1.1050206250854703e102,3.1625834673887043,3.875083186157562e36,1.0076177590387505e18,7.341216027934708e86,1.2919247341378022e86,1.521567705965137e61,8.848995368243673e19,16.75620604237776,3.518001431264309e38,1.0,6.204000060530284e48,5.515691121653938e157,1.2627788790620317e98,4.5462143906656937e18,21.439733985616094,1.4865566072293853e17,2.593620999998687e20,3.3562509113512236e12,1.0356554752908315e28,4.844322673004592e17,8849.41165787408,6.018986204294741e36,2.1891540734049572e15,2.0558158200432495e73,2.69153535237561e22,4.366599141946264e117,683.9588262369494,4.637613274074347e43,6.8476866405495664e13,1.2205238591029616e102,4.133062874570874e210,3.6181721800208643e23,5.4207965051912735e22,1.3201847914567964e31,11.375740392562468,1.5938733726763607e98,2.438827819949353e139,4.7478688085124663e120,4.748215424584989e11,2.658665395267814e118,1.2269258495338923e17,7.668918596334738e13,255052.9554449656,2.0476783007010417e228,7688.949117177599,421840.6498754389,1.2642156882597725e17,9.333487758577296e54,5.781190459994504e18,5.627944438965369e11,3.1252771711423775e75,55.67079898190819,2.622010126245629e24,5.721325896699958e10,4.19816670462051,4.792385785679043e45,3.270731598689102e70,2.717695864908011e39,8.05233497175366e84,5.765017935557567,2.2206233230926867e13,1.4888372782581966e16,5.47735796706042e26,1.2462632310967818e63,4.787566410346332e53,8.64967899705494e126,116140.10542197623,2.010124037786902e122,2972.8682651010713,8.930162599964391e81,1.1254381588159075e148,2.6339928069035904e153,1.6554189765704596e11,2.434100506156705e66,2.497551689015696e56,47564.547575279816,6.301694857734109e47,6.316680884657633e28,68.24131919274147,1.809036079761811e104,9.488235943354121e12,6.015691584735104e50,1.1875705740293428e50,1.0752386736792044e14,8.271875183530738e93,9.464158862754364e7,2.7734807632111702e48,1.6126713244107952e69,1.0801230472127681e15,125940.97581754712,1.4021582425459292e32,2.6092468569798413e99,2.746993080854644e7,2.2199340032126486e7,2.6180968604526787e12,7.060607328743753e139,4.637849630101657e120,8.6698680436865e83,1.4151927624772815e44,8.880289293256197e69,4.9639134177909326e150,9.378432214778377e100,4.161125304717566e133,4.399790533668504e131,523257.46404254367,6.792569596354501e62,6.022471611403005e145,3.73758500997483e52,5.057428317974448e72,3.699630349913801e19,5.425319617114695e17,2.827768718906857e98,2.084294970423787e85,16742.606248763823,8.826772023664796e60,1.9623062654988465e204,7.063261197876987e34,1.2123042405291846e26,5.704629566175168e77,1.7544313538616001e137,3.118087793953117e24,1757.5783465720708,2.3633382187231975e66,1.7859764489639667e169,3.888973492043569e160,1.4011155257005506e103,5.035076103581051e100,9.358311765878035e120,2.8541408287090906e117,8.374748606246589e16,1.630020099353379e206,7.0150611396754825e93,1.1818447226567058e27,6.1113561848073825,9.73326768483433e56,1.3597203701876662e21,4.716064941016789e37,3.4639681502106167e72,4.82386848646441e157,3.374719253361329e188,4.5127656393580655e29,9.301902781299688e28,5.556394998933529e81,1.5627578073060669e111,6.312292461572118e24,2.535790782842112e235,2.168590411647233e6,6.20151433134363e60,7.034808666279785e82,1.0748703140512427e136,5.079112026097162e152,1.4106390579230935e19,3.683703362657306e73,1.0,2.2441616476436098e13,5.835706241030592e7,1.313654374418244e55,1.638636113854293e46,2.0331410818560344e22,1.3459520608717644e104,2.1701658459111986e85,2.482831319554582e86,7.296006639560572e201,6.615936818572577e197,1.3887077061390809e206,2.752634895842693e39,2.19384869396845e17,5.4758245353054005e149,2.250503158183863e28,499287.1635592167,1.1340330896883264e66,2.703746034878224e86,8.349805992870702e35,1.9782940763445293e13,89.45578354335863,4.1798587630619965e7,1.4049351997928977e64,1.0972770282539923e161,1.2055131030926098e142,1.1788433382671692e198,4645.71584368908,2.5978592000412126e107,1.8586124933273446e84,1.8657994334452389e93,4.4620323868523176e36,6.752511059550135e108,1.1126273629572798e192,8.775125945603818e30,4.804874033019331e109,5.638993607006798e100,1.5244710802849072e160,8.747158733046867e53,99.41725642881062,7.529230962476955e74,3.997782192534518e26,6.126938914761219e141,1.0,2.6860250825652403e34,1.1243001844018135e85,625688.0349924775,1.6168620384118616e86,1.8394650327165123e19,8.528221439730985e14,1.348203441545598e30,7.777041404248798,6.290935282265832e141,4.8502310368388314e101,3.670839890691141e140,3.735108706158618e11,1.640142095795633e32,1.9126970885319608e104,7.342048389874476e67,3.460617903379405e21,7.375444306972275e227,8.656417952590813,5.493387588913411e9,1.087037296138986e78,1.1704002062881714e10,2.027716673277586e67,5.287345279508101e200,2.185468165959491e14,2.77030182253373e11,3.2068394447419365e12,7.163855143661091e6,7461.560248051394,3.150823003741191e79,2.5028673119291285e142,5.593821141653045e184,1.836891800015595e18,1.1719443943882027e8,4.1325454123809984e60,9.18550922515317e7,5.590552125766367e130,3.7064306389251132e81,3.525884431788377e40,5.880743919981706e126,3.911571121546678e22,6.876480000821793e29,2.212641269518113e10,1.0995130033612801e100,26.734532262062082,7.436933145594601e14,1.1462281252355762e7,2.0963941350768237e159,3.63345450954593e87,5.703672376680892e35,3.7266703852461645e17,6.046661580970715e31,9.491269424022101e43,7.353198111879184e56,9.775636327050222e106,1.0,8.680276084353002e116,1.1732832908843557e42,8.40782271734326e56,7.714981077256177e49,1.819903647461003e36,3103.404458112179,1.2967824332385996e132,1.3312807531893195e197,2.0238612813918234e50,2.5679175851521024e93,3.0328916671229035e70,3.208753045943044e42,1.8527527463072337,5.726914111492886e137,5.229533078981436e20,1.2372228081391344e55,5.310440466171712e7,1.7860593633933794e8,3.9732343265676073e18,1.0966233089253706e124,2.416232218865307e25,5.610573831062479e93,6.647953595746214e42,1.717821781483508e206,2.5103021970938876e19,4.5526223264434634e26,2.330736356300353e196,1.6404473446844196e93,2.2132799966682933e43,4.107770587580479e82,9.251463561884899e27,1.078731718718622e164,1.3714001039194924e72,2.678364466187347e14,3.0813250140745537e148,9.113245772416283e17,5.375024410721097e98,5.554610325520224e69,1050.7973162086425,6.823072070118761e9,6.506325488059098e77,335658.3290505175,1.2506057479776112e10,1.9582060423590162e75,1.5446438730737947e7,8.841868047476016e76,17540.1219499789,3.093125190066416,24000.442463383893,4.631804247602624e56,3.43882118806756e17,6.653698851081527e50,5.160824115316049e15,1.138951674050063e10,1.2354628977688983e121,6.655174644888901e15,1.915465749806794e147,7.302273176096525,9.219404720918327e17,7.702300901585889e53,1.6611288228733051e155,3.1968381351142844e122,1.0075612374680328e25,1.3196891951010043e13,5.098190607179705e21,5.030730289497746e80,5.997054670950172e14,2.1276526045108705e111,1.7361432218857326e44,2.6842783307483545e22,13.072069076681323,5.5953472143979855e6,7.251395189870022e124,3.7217965555769265e7,5.114428026193995e149,1.0766583414468696e43,1.9524832578930404e16,7.60991485761861e54,1.1617537741964713e80,1.9804291936609662e42,4.2065200152466594e39,1.4275478238737447e114,5.864200546870391e42,8.153264295777169e204,2.5664728926470268e44,2.316806668184338e85,1.212682391443561e19,2.7389167054302546e46,107256.78451941758,1.104697683125262e55,3.296216941368188e107,6.377038870733831e132,9.618113628470215e26,6.252938417766354e23,3.306831191874872e20,5.96868053418453e48,8.918529445576942e199,2.5395991685212103e157,103138.53331904621,5.653724822233182e21,1.146891951683865e35,8.184837163466788e23,4.0746846383708166e77,1.3895450246178142e144,5.927732275688959e9,8.90992812775361e20,6.661867050677481e159,2.8750112485932593e43,2.1136937656171037e121,2.831702459331189e137,5556.550161426087,2.4164575657699257e76,3.6861593437776808e227,9.594572636852507e211,3.741350946627733e101,4.546733116624699e83,1.7977609768423158e8,3.0607595845996735e62,8.417673432196888e131,2.038148340509293e7,3.3204751968515684e13,1.1113248618576397e31,1.2038493055514126e82,5.322793811451969e120,2.291870152720927e81,9.73739433877779e46,8.53721368495562e93,2.6240326419253152e39,7.478087218880867e11,29.717643585633922,5.1214172907258156e14,1.0493643138240526e32,7.2614695698302235e68,741732.6366535134,3.9423185317869466e17,2.9097559982935706e41,5.175258717287698e11,2.1507541131122152e185,307441.3740946105,2.614994510299384e97,9.780241853704514e113,1.865392495588343e14,4.4172013415543955e153,1.2728450998131847e27,4.409534776475911e6,1.1065883758385092e15,6.242935433422751e7,3.6259029211665074e82,3.633961811357813e7,2.5389313133790588e120,4.519735033770262e171,1.0853384823585468,3.431986189855195,8.093079979570671e21,1.1082417373472477e85,7.950017795709845e103,3.147627132038094,1.855658497435208e49,4.194274504181403e85,17.388753697566226,1.4330074246230182e8,1.112420426150159e83,4.4142663312836563e189,5.0660569865359366e7,46.11009339310728,4.2776960151675394e100,1.0310770089248425e114,5.369830195952718e34,3.762820424223555e10,2.4282268127084482e7,1.1140024294022954e17,1.8426094517550452e6,1.699439797668686e24,9.001989243836464e55,1.9766732058719312e14,2.15080641452927e58,5.572541081279829e10,1.0893003049551057e38,1.2436986433042478,4.5786514860424126e29,3.1166601093551876e56,1.871691122630421e15,8.352262809803793e28,1.5914721187222958e208,6.720959685526821e19,6.966752187842591e102,1.3736683532007323e45,7.947554365574704e123,2.1661268458638813e96,2.911378130829771e166,1.4088430667051105e61,1.2197422996133609e116,1.5114599010931744e137,6.7850256427564555e69,6.100325538552195e100,2.790709953428944e13,1.942757161077237e62,7.859312397919882e233,2.3575963548720417e9,4.084819325737299e58,5839.895987215151,1.2069870042620117e113,6.6853492132395504e41,1.07316272505945e31,2.5429902608576582e13,2.567554174801765e138,1.7620817030554936e154,1.4126724901393884e65,1.0962223108084367e8,4.3805679224848895e43,5.016946770718762e66,1.0621482728026152e78,1.0162414249909692e43,1.0016720438435346e186,1.9173626254494724e30,4.926585256467933e96,69964.74264556289,4.99770129217924e18,2.483526694756064e8,2.781281505900828e78,5.718591411372782e83,3.947694704500466e75,7.721645534053605e76,1.930685852488e8,1.2885854158745242e7,6.95988183283762e112,6.570972523023505e54,4.89186043105651e66,1.1331352025591837e21,3.5802409029735225e15,6.85334101879465e43,1.8394557962998183e34,3.798557789711009e143,1.4925307605875206e165,2.5388340245845902e85,6.594817066465393e73,3.461622321651882e84,6.6709636401491094e38,1.5690988190944753e60,203468.4951301629,7.788538603682538e39,3.982007682956869,3.2854733135805217e45,1.0219503773817235e49,2.0222816920632143e31,1.5662259202425623e42,5.584771570954499e161,345847.60157456493,3.323496688360824e164,2.3085539865415884e114,1.3515218720655725e19,1.0810176903167473e102,6.1723873638427e65,1.1146157161376946e198,1.5473653261910114e19,2.902658371529426e55,4.6123032140993017e8,4.995342486484144e37,22.37546999316845,1076.6370551775235,1.658058246145151e13,4.6023105271101356e222,3.70223521752779e8,1.3726682043695143e117,5.141061794602325e196,8.47862132533468e59,1.2848986805360812e18,3.028033605121005e93,8.512573217319901e59,3.942086398929279e9,1.1200501310879878,2.8721464985080607e209,5.081231493450323e218,1.6799726148849055e222,4.1357903874337436e47,2.1115181510042913e140,9.63605257219458e13,9.342261087040305e60,6.215364767723201e106,3.885493755426795e6,3.052154015884617e144,1.5009716196265116e10,879736.2507168923,327958.2424230833,2.2449961416677572e58,1.4727652767799507e48,3.947920733166078e123,1.0527503042952789e14,672.4721968542934,2.9839016297802815e138,1.3553039581314717e13,1.3197383037560408e15,8.669216372092873e10,1.1417749255190669e20,3.2327522611131424e8,2.9336202143799054e56,3.1844838680904995e141,3.09880090498326e9,6.3131067493622794e56,4.0504590324622345e8,6.822118660623384e70,2.4815674302307394e36,3.0709565847974656e13,2.328687847676435e117,1.8040516568001274e84,6.846143941521815e26,4.452629546802812e123,5.747623692603559e134,4.529762786031548e68,138045.21456141607,3.700003852355757e20,5.967735919668774e62,452156.32422140613,1.4934899578275643e77,1.4008337041129878e76,1.4466623247552454e31,1.0253525723435736e70,1.354043951338162e63,6.082259790409632e73,1.1464171176469571e88,5.569364973993774e207,1.5194451791831583e6,2.090205825648388e147,3.291692822557062e45,5.445641163306831e45,2.2178275167482568e51,2.8549139448883816e135,2.3273810273336372e10,1.0,52.76309186482918,4.135655955616576e53,7.197298837928507e133,3.3718333355389963e42,2.4067308461024596e95,2.995705887848535e95,2.90957997043309e62,3.5656642580103855e21,5.122914146221316e26,1.0,6.626397592925273e20,6.296624830749974e184,3.616256673570629e148,9.151257477428922e109,1.9191160421209664e9,2.8569711758543266e89,2.9573887144772444e24,5.341065354074651e104,1.9534960248512185e56,1.3161021580035205e15,8.391185452063812e27,3.5208190199370274e185,2388.8646989371373,1.7937586705831694e45,5.294349876357953e21,1.6021251423773666e10,23660.218495593195,6.183877808967718e154,4.6068604811150175e27,5.58508435613863e46,2.102515416216611e49,1.0161669273828335e109,1.1387068545026404e147,1.618128216967694e128,4.993420925584525e122,3.1373066445018755e19,3.3685581802480386e111,1.2835821766612258e117,1.9465355313507296e37,7.221456944793484e26,1.4744025670019712e81,1.236970057165757e79,1.0,7335.726650610098,6.311486161677325e75,1.318772915660152e38,3.655705465569728e25,317589.26748877566,5.584021735401946e33,1.2813095061157357e140,5.466678075628196e100,5.423781816128064e15,1.4808525433954494e145,1.6387679057641757e34,1.385786899839666e92,8.738237520907472e100,2.0937398819496434e114,2.296465529452535e130,1.6818599606380978e102,5.533610150286622e67,5.535156763234412e64,1.500953609181397e9,1.011681112017578e210,8.205351923165354,1.2168574397607028e15,5.630289993333072e163,2.0483070138621097e96,5.366553211256547e93,1.9517296259728254e135,2.7340681125415992e82,3.5588131878929052e25,3.2315186193012165e21,2.3989820729422213e32,60759.28625313715,1.2960790261165228e87,1.7265631824524246e165,2.387464156400149e123,2.9803216340275825e122,2.358752145154366e37,8.073858447447729e71,2.756455293644712e22,1.4003460086377542e10,3.7485262171211425e45,2.0016240011894983e25,1.0551336774171059e97,71126.23897812283,7.695670509738766e97,2.467542812941443e10,2.7044442466887427e23,3.1884450455414397e34,4.826236760405212e63,3.843505158997408e30,5.628898657988394e24,2.0635828078762797e52,2.954538694112452e80,1.7686588111623717e72,3.57594581672227e9,6.424263475729363e72,5.457308100398825e36,3.88035046204814e78,93917.97614436808,3.8348456944616354e24,1.1555686596409018e62,5.2643249986666e52,430501.5610965921,4.615285451919978e57,6.338300895512835e238,259.994953326755,9.690338768918946e15,5.649903736072704e36,5.959955843611879e53,2.930643129959626e11,1.4566992885500336,2.5047062114079096e77,3.207909064198451e37,2.1255076662917476e19,1.7766896135924825e183,3.6663691312570317e12,266.35106028503645,3.149709458119071e46,5.620543443377527e64,5.941287245124683e156,9.116649545181207e170,1.4506259533403863e78,1.57092392503815e145,3.0273711864905236e112,2.2612091895732217e44,1.1234089032423396e73,1.033791939183475e10,2.715151549901222e130,4.503887827342172e59,1.4244475057521438e117,6.6626652279903126e165,1.8108811254227514e156,6.058166882319777e158,6.144687602317004e12,1.4443356712023583e67,3.84712686092733e100,57.001260173944246,2.39895020376577e21,6.318910040031641e97,975315.2548293027,1.0159715269076584e17,3.914067587280687e123,1.1607304915994958e74,1.6204620328022233e103,4.49175610760797e118,26499.203968328322,46.90632709627642,1.338555128932599e19,3.933634700321483e23,9.607107235869103e104,3.300390885468337e62,2.3020015834417467e59,17277.866649303338,1.5918226084671175e81,7.377211456146677e12,1.0162147347105607e173,1.4837069180792135e23,1.2251932896918904e18],"x":[6.623276513568266,0.09396719227595218,0.1258160822651644,14.331128258878902,9.777543961924952,10.44877223786851,9.001917675921257,8.884094741497265,3.5093582777049703,4.264714831843661,2.35632590315067,6.106107813133388,7.674931593956485,4.4046455281446395,10.7207368227646,2.9810466649629355,10.09007636592675,14.794754966117758,7.2462381311909505,11.760977074040124,14.924908473288548,0.2897740480235822,4.462283657272615,8.948126228276012,2.028415954776043,3.8523994343690395,12.007815401114039,4.145338434086012,14.197579725603324,7.8151425926601314,8.20242654016026,1.9820655589291603,3.87067505481994,6.600840094685497,11.830430882219437,10.532565491865567,12.527756054336832,11.51544324105903,13.524166492048824,2.8268854307515836,5.206068758280905,13.684969738641676,7.025459350327128,3.6216344429268723,6.040094624464725,9.410627433992614,11.799609625302022,6.085411250553648,5.571640434070665,10.552907053631671,2.5311498335698857,5.098949025920467,9.527361078492193,2.97887212326105,3.465373132665863,0.18413324458086855,10.84720543192009,9.232035521256332,6.0255666926171045,14.484040838647923,13.65016976894849,0.5345662026048892,14.746172583517119,12.345510583694356,4.257487220731924,0.6748854685757977,14.917759487430013,4.040102292281097,0.8701301443793741,1.9331491759240738,4.472792191184082,2.134195418210462,6.053198231723559,13.671285890460146,4.855243331788404,7.419477715565671,7.118907215294926,6.792274172130557,14.403942019606369,7.927178880432336,12.329855703970718,6.787145447946612,1.2579527850656658,12.165197158543913,7.70840301375811,3.1458549215812184,0.2110647372917973,4.486525687174746,8.669409892870917,14.367038680331255,6.5607706238790895,12.321184604471329,9.547166288325927,8.489192915265663,5.528200910414239,7.849415042798564,13.324561176003382,12.477080434230022,4.273326319973252,12.621587956810634,10.349484094596638,5.106045041332488,14.381570221448131,8.021339334069262,14.98658862439419,2.494749335822517,8.096315672163744,1.3341183689432468,4.227221583370589,13.523954405483034,9.488807670597044,5.7601665676856,14.382421585688688,9.14414777578979,1.268412513306837,13.758399673344323,0.38537842514430487,9.689977054868713,1.8787753782800654,12.26927618215087,6.1187677969176235,3.407425837994528,3.641461504401513,3.4572405376663373,8.972496422919908,14.889016770386368,12.582773368973704,0.14630809987633886,2.9604918351945155,7.256525865001947,10.422738159931125,14.718846425990048,1.1484515673523177,4.470032151305365,14.889443636416585,3.1345292068336796,6.332085271675163,4.744221511614695,3.7074561038600953,13.212236454374407,8.527149366702947,12.19704062296692,14.00368523009263,14.733252939690715,6.853784267627808,2.6863239687232654,7.8098911447037755,12.449975654527016,3.6616429769630288,13.005863240005437,13.689016141871583,14.182592271205372,1.2412415036557467,14.580163665694727,0.6414825713128725,10.648267134772983,0.22279108737539244,13.44604247172644,3.2309825789572457,10.62067518816063,1.1402551409452055,8.63869119260795,2.250564936656254,7.229899982228462,14.265914045718592,11.80293762846395,8.223118554015965,4.714413368303434,8.114217024533714,9.100275124122168,0.6116387570001958,11.82697886614777,8.4525460320004,0.9749594653605109,5.118269669354666,3.855530963345466,3.023805918353916,7.247879461586933,8.236755925555643,8.733651425742936,6.527464957716602,8.103146973933468,10.79577261070368,2.6113566116006446,14.866022164574021,10.17846082122881,4.514927961090934,1.5467044586140288,9.146694339600458,2.0283638285003636,6.382830976371883,3.683598541462877,13.21862754089979,6.763284882408494,4.104432255705447,5.474863946692037,4.377325247534936,13.607368264597724,12.62615299708919,12.137190543676553,6.082560004976081,7.5976149056024225,4.356118003898436,2.201892827569184,7.7079731406263186,0.009671044777903592,3.3990158256067335,3.26969653981376,5.353834392000769,2.5379757809879577,6.837757995936528,9.647114537400677,4.0612186971917055,5.444044229214268,9.312289933640367,7.6484674127316,12.937871442838864,6.45434023373207,4.86289258699096,9.486453903485646,2.141534800081341,4.2718768255549255,13.14021229039972,5.2852431471685835,2.3926414399929974,7.1529899122340925,5.440532700423486,1.679084290950238,9.59059391945044,4.674027606195797,12.723879303205699,0.6600413572852837,3.2272893021247007,2.5833692792879637,12.3443179775718,14.963632396975004,10.293953251316555,1.4351687470959984,1.2411799520438693,7.55980027320652,6.149670538607861,2.8154887925453984,5.163673648490928,1.6313539538701538,10.656634177123907,3.841368897009023,10.033718002765493,1.3889412724697947,4.109458395352483,10.252026175941944,1.5954256770333097,2.1659849799037345,12.865579831026357,1.9490907787759981,8.705448555810438,8.366228501253227,14.236715727837108,9.040295551089836,13.351960345897,1.4842932256779817,3.5786226094378315,2.12988712799417,5.726094215968269,11.696570788285644,5.033312362054451,5.396874702573844,0.19528823720103228,2.9134647426307216,12.904693579062018,7.561338770817352,10.983388811268544,7.325705256572867,5.3448872073828815,0.1530176986874887,1.7890210451570165,2.0362187749203917,6.112384491979467,2.6172590567808482,4.717034044741886,1.6122273741546567,2.9421887406296143,4.340416139644908,8.904519219677121,2.8645429620307006,9.641905830332663,0.2880454950599376,8.143338836363336,1.633537997613932,10.758531063714601,13.554419648915832,2.106362212198566,2.1026385990177943,2.5332848700889157,1.634189981354468,11.873362511517879,12.9560668992138,13.84317367149156,4.832073887651221,9.180993531776645,2.4737104151382674,6.773735118891623,12.892335355831234,13.886066077498317,1.7670854582577256,0.9504870407286925,2.3320468819388873,4.556892440859674,1.8063210705316857,9.646793748656659,14.930815436123256,0.5199683338526717,1.8447652894474798,0.8885790837919472,0.23964061514625712,4.1136815586298034,10.646100608891121,5.704377273182326,9.356806180274999,0.7730488490563114,2.767650656914915,1.62817585576151,4.27397438606354,11.028989353349804,12.712154396519471,9.498033803875984,0.9058306251488957,7.724805061205226,1.6613118797891313,8.022616466072918,10.67140345210927,10.259648485502913,6.745583063245588,14.397883511149448,11.124976680389102,0.6444335299762638,11.308219558516159,2.9668804537608318,4.8305244656516955,7.8554009341093565,1.303169623497764,5.331697217290897,10.862242760882149,2.570182751974114,6.903919919572786,9.54017102821319,11.724493802975047,5.181764752273233,2.592815565794746,6.175570227502426,4.0010447537406355,8.209279611951997,3.2943283660497014,0.7760010129673078,2.1173842010270025,11.576975865407572,9.555813084717812,8.024545365079046,4.879337881148359,6.943214885267132,10.247337408568182,11.211782105248743,9.640929779947601,14.155214518287087,7.274688528565111,4.392049892915532,12.607132964680623,3.870091725640367,7.308464718702404,1.5163144062516565,2.142081661347641,6.461851704508471,8.249826757464028,0.6387831698995017,5.691482712300554,13.88412713873347,4.63198856815727,12.638152381646831,4.869385913378796,11.191576355369497,9.773846039356082,0.32583349920388693,4.5840307962439635,10.78018517696103,9.868182719884139,9.341637235887385,6.397673843097072,12.258127186879221,8.122396526606048,4.8490416947172275,12.513290792241614,7.634138323114028,12.93570185251033,0.7583926747233039,6.8509059086176896,3.432203949075696,10.203169754074239,5.605126710851634,11.056894476762043,13.795264606004803,13.949884972736012,7.902311329202087,6.034439108331341,9.45749837431692,2.640526996384347,14.270776017156395,14.924379320619696,12.198500757441085,5.959652200940397,9.816622107240804,11.033485949697901,11.673509120290563,6.9429129524294995,3.3901945921763454,10.564583898847994,4.8895874545924425,10.949814471846,11.126853143315204,4.12161176039159,13.613002681049291,5.816759000845523,9.331205608599381,13.224301660490942,14.384864205187194,13.678935046189459,3.9948506283578675,8.53436369078983,10.806845529319283,9.893705011605402,13.679751545099988,6.41991288657392,8.03531527599223,4.621408209920833,4.14746190546904,0.8453467573716467,0.8417258742145062,7.6246939679515435,10.965726705215658,12.025434039333248,14.714272651177637,1.3614198839452096,11.420157703565375,11.285206021678164,10.784257051837537,8.919669714257134,12.42509944651125,12.744476254415423,7.590171940648749,7.322800018025292,8.627077272565396,10.822308355414483,8.759286142946035,2.9012265684854697,6.361922821925687,4.948164186876073,14.564897888280617,9.785950901682883,2.425868174091094,10.14592804528699,3.18868438247087,6.757582746452382,4.048556775694473,9.039522402174512,6.33075350523825,0.2678452057940506,9.342783520191432,13.581451185673549,14.100621059430303,2.343106242573254,2.3296816697421696,13.08303505853808,5.024458934715563,10.412494116377074,14.6342890983706,0.2092667775179602,11.574105572928644,6.256198559161303,0.9000678720940392,10.640435727614054,12.525284772464305,11.6503127215838,7.181485149635111,5.328549602326306,8.394989743900265,0.8857747223125045,5.750544097932399,9.319641569472601,14.145514031020086,11.099086646841572,1.1720144905260332,3.8610943191563365,1.6458666226546736,11.702317771153917,8.407332526233017,3.566836580421071,13.641033068452206,5.0391472003192455,11.814112977904383,1.7152035767722007,9.194300351945635,3.7450616587422325,9.253539686907125,8.417026913460262,12.81534294222902,6.898196541591025,6.401346316273999,10.520872506184588,5.175378894607222,3.162570823613712,10.723766954930472,9.985370124403902,7.2197499369369345,12.064064305417384,5.44130363699988,13.661130425762645,14.981418841252662,3.3782108436718294,2.542016782997875,11.900186271476198,14.205464891890372,6.537205151396197,9.643977095492284,4.915494479202219,3.077167268107892,0.1800957400674308,14.439646745555942,2.404418327316875,11.17586342091538,1.0522345037749692,9.977868888417765,3.9345352182154105,9.023455302383368,4.802548994729644,14.093627172854404,14.495091545875237,13.763642192841282,7.7649283963669316,3.0929755389027447,13.797119861899885,9.738647255998771,9.530697082986153,13.165277490815091,2.9076527950375586,14.021844720533709,10.153828047387902,11.470746738079837,9.832115176629078,14.158783937589526,6.374455171237129,5.420302045356285,1.8001203930028054,11.689204872864595,7.074557165094078,1.5962112260989725,4.420197233701697,5.9765070560426645,3.037077723220538,7.866811898221613,10.086993709281057,0.09230331886209364,10.524369580778291,6.8337628852696595,5.516857534253928,7.384080461265686,9.446285670611136,3.701823886054508,9.667592713224332,6.441780602519383,10.758174177364982,0.6614696347276139,8.82165125691484,5.9820569168296736,13.670039630863577,10.232417613230213,4.849784908898006,10.724578042923534,2.9525318021643865,6.337476323334007,7.258737109237737,12.886119718665478,3.657300082848743,10.904774470209984,0.1635396267018452,2.72466324246318,7.7984584105618975,4.812671897250164,9.024740348971504,7.608910160507363,5.747614899295318,6.1110333706245665,14.783173309286193,9.23685456647431,5.249809977546565,8.654971651386688,6.990336883405062,13.707691677490981,9.688216133856638,9.474146045516296,7.967758322619341,3.200322254198873,1.0652950243523773,10.417701164363033,14.05751476013732,9.585410807083202,4.730127450660005,9.576111900742747,12.366536185966883,4.3634698153166465,13.641243312185976,11.913992519816748,2.2594839124640878,6.1639492006952175,3.164249527998079,4.288884610574749,14.324962821133852,12.942776118675122,11.62802468644362,5.741546094240778,10.009189521877758,8.054594746022456,11.015407054345959,13.786707058846519,1.469730324161398,8.213644576584102,13.515382870313355,14.986434275234101,11.070602842456644,9.477079604258448,5.388744031610302,7.980370467217993,12.709541360589036,1.1507398778384792,2.6282153132193207,7.436317012012671,9.241204430937826,13.746750268136546,8.06494653181627,10.507624395590646,9.83701597718593,6.83814812096843,9.459181948999442,0.5006526991881854,1.1913339637349551,3.0792386621979686,11.028809508652282,3.1951152976310104,7.333310184819995,2.7481006529534757,1.3912293110797747,13.30766029901848,4.637576787870907,9.9635078002309,8.793121779636296,2.028455519655905,14.462789005295438,3.724293386203874,1.29723029977587,5.5472701548611365,6.493976819516312,11.64634108257408,3.1908800092682643,13.761308686274921,13.118958869548413,0.056030076386255345,0.14655967044043927,3.611855285089937,7.102425160901296,6.9460708548773695,1.5869582965371587,3.305597416977597,12.04452834774419,0.22866668111665378,1.06726271618379,7.401171568221294,14.157574320757305,2.1439447244857748,0.16829652678699625,6.860941491940617,7.962809380942457,3.96445401398187,0.9101834756632521,2.9732815147688383,13.389613458050896,7.657987076463152,6.507583874035876,5.27506235021395,2.7643558533256787,12.597850236445723,1.252767603884417,5.761208082416342,0.13250604205258032,2.1407321716566043,5.719758887695124,9.47114267807619,6.460839944500937,14.224393648801305,1.840803937028056,13.788915828027374,13.493351779393787,8.484901172419818,8.024306490308366,10.649789420009444,12.208407299795258,10.820332123771628,12.702084321680351,8.911562040978296,8.294208443027854,3.8925555480386898,4.635404325420796,14.896724707190906,11.467230763789546,9.340789385161218,9.199225880597776,8.058383119942755,2.9960959350909477,3.4007919043614407,10.95482323744157,10.284849056162065,12.773617553518378,12.805265409049474,4.045161811100726,3.4436633542829043,11.39294933403154,8.122392204538354,9.40012607614998,11.568570451036333,3.2276133913111913,10.753018844505768,5.937520748046596,1.6221720881602064,0.8493849011986532,7.795224076617522,6.862716931598851,8.232422669891413,12.117678922912386,1.115151002430983,1.9201396834128215,8.472256334256157,7.872198844981579,5.536521685878386,7.295595033592315,12.54031326545234,7.690720290540112,8.390384482610099,9.041145634005716,11.555747307925428,9.860658561069965,5.6470574143189,7.890957127508017,6.7155952810926625,5.636896495842224,0.9775704645179228,3.360797775923672,0.5816292315303129,4.4259651586406275,4.101038725485223,5.63527670875287,3.345948505748355,14.90181441024226,13.174842046562226,11.126035251507693,7.135235981674471,1.8495093595629408,11.858414425797232,9.915064578050725,13.4748489992136,6.104132381513488,7.731279510601872,3.0447676730082165,5.0985811729291335,0.7971964926411701,7.437900268151218,1.4832590297332193,14.693617210574732,2.5082178124810914,10.36910769527242,11.68478049471195,6.665713593806457,5.097091568035962,10.28468236555986,8.613676041376007,0.9202439483245628,0.016666981169289885,13.714174456410525,13.914279089453201,13.511149977577132,8.94743482363641,13.493724869155105,1.26555605000645,10.471762098970427,10.39777887502918,5.357605293554036,10.413601640692962,0.7881149252057584,1.8759062478197674,1.1103686090373477,10.647612678475557,3.686792986415912,13.972002916007975,3.729761008729935,0.8292440502546539,13.869879295256307,10.512324629019078,6.3010262989068515,1.1890730702854413,12.074171905107082,10.195756581264561,4.616413693855243,8.686696313342214,1.9547985530129597,6.18237794338977,0.9359437146153105,7.390769513719104,3.145259036017772,1.600612945434825,11.801471629118994,5.505076529131491,2.640391904839107,14.836628386112858,13.89217710198035,8.856456183495297,3.359882494942612,12.503701002253203,7.827493141127534,6.9591257877867925,13.213172640731997,14.975136536824593,10.687948395575182,14.023207180524182,7.369714933827247,11.920273201466212,7.967736576064667,12.953829210940475,1.2175297141927988,14.778350711644807,3.1218929847140964,3.0844385386559594,3.7497818034545682,9.347692318540975,12.251097805745593,9.983727188145302,4.278484597460518,5.540509915851812,12.235575662540262,7.032843108204133,12.553757473763563,7.430431495246914,12.504121983539171,10.447025804986296,3.693706745571675,12.855675127489803,3.897679085730509,12.165812297419233,14.25364709394048,14.407096265208317,3.6706219529633866,5.472021458782731,3.5942241013341403,8.57849322735801,13.611858742947518,12.066635567472215,2.0592578841503038,11.82477728111683,8.348863102024657,13.381008298608286,3.7296719150079416,1.6192722294754103,5.6531649404618225,12.259765102513214,2.6883679009633674,6.917259981469953,12.937334130301481,13.213650091771319,11.665951233187005,13.904784543949493,12.190686713474198,1.6716613746568099,9.162740855843829,10.669676798184224,2.8201698615519333,3.9547250197504367,13.757981519522408,7.432016860304777,8.731398579434531,1.476112886126174,8.795566795855134,11.396542592397916,7.003915180194778,0.7975236695784094,4.459765118115536,11.551750059766576,6.445538779433301,1.8670453647842966,11.383206414997577,7.604950447533385,8.484138487476182,14.271639313325096,14.290434331565221,11.681219489291282,10.549976122982848,6.649060667364549,4.903364765906019,10.961607116318394,12.782633193700363,0.09438853717513296,9.039016298767269,14.352931084096841,6.402368048028132,11.749764103900294,12.646472893646845,7.657652980193848,2.4042828065672293,10.388113748630897,3.4235102720770882,0.4526994522732142,8.353522406091798,11.026170398676623,13.254763093521131,13.155139260445885,3.8423322333379906,6.792181963122895,4.090032479766928,3.883904895923221,3.3076770829447066,12.184044326544003,7.81289864424828,1.9334871165123535,7.629183839262209,12.337681712756313,4.547965077840624,11.653737101717725,9.657792583219639,4.906032829727596,4.931446354250314,11.462240937246953,10.442145332455263,7.853853535145353,11.363305749246928,10.8106430951558,3.272170197059119,10.58408839071702,2.170953189686239,4.3037438328400714,5.514244070869195,4.956317207807768,0.5439513560134979,12.497021381771052,14.153166337689639,0.24985453799665658,1.511583053498342,3.407025358752116,6.0517032226300636,13.574563689983037,0.14580041173406943,9.391694751496365,3.689889977102631,6.195979841381096,12.038504200562944,2.608276904558915,2.470688978777711,4.93771593558723,4.7592192031855385,12.21090663722016,12.577585007786277,9.766559621237288,10.82290870052146,11.417374087502507,9.606758145864472,8.793143004682973,2.2696649588183515,10.795191190771984,11.838727810123727,9.714515651930109,10.200105771924807,10.948992717730825,14.485114319380223,4.89206790592566,4.43747200912078,9.531397375313125,0.8123259465466137,3.3514571867874885,12.891101718694237,7.275921107207206,2.843119359350953,7.641992452655355,9.133741149331547,7.982377855542405,14.696996586639882,1.778612463573721,1.7786952665173295,11.686687417533868,3.4747934578899917,7.711609933702252,5.095653467846902,5.3281032112341755,10.06317535151002,14.926397757645308,3.7455614974849816,14.192313951053418,2.0247270582374757,1.8428852930743955],"p":[0.6247653581206962,0.5213542959556683,0.5237235445770945,0.7264215225162916,0.7070827430027551,0.6629455377687679,0.5373446240539002,0.6496213998027944,0.532934125109644,0.7479019792459007,0.5304918301045125,0.6098710778456609,0.6228747370858296,0.5036944330912319,0.6710387507904841,0.5678987434483723,0.5090236008493998,0.5498408137405733,0.5062612981448527,0.5057051892998093,0.7069761028605405,0.5965017287568091,0.6876067822498719,0.6188925055068093,0.6814698366043985,0.6618581846525944,0.5232483848211473,0.6712993261449327,0.6154738598637184,0.7185996526873458,0.7201113802508636,0.5626515599525738,0.5517231956166286,0.5602322661000645,0.7257628617239262,0.5441036052622574,0.6586428353405582,0.6828261932470069,0.695930638252856,0.6824336841497785,0.5957983117115658,0.568104771412069,0.5614953486614528,0.704158904501326,0.6176611835967372,0.6247719829291467,0.6966393098647652,0.563113974509299,0.5778078658243546,0.6266256243478117,0.7418607704181388,0.6074454243283449,0.6883246684493527,0.6530364338481464,0.5947070619855832,0.6743337820387676,0.6963616504054162,0.726869567877152,0.6643471786776698,0.5593040351689973,0.5079010372600103,0.6880596050157115,0.6285431896664483,0.6646746258753695,0.6668742938888197,0.5241875078270078,0.6704268303365317,0.5864829576479311,0.517794125924515,0.6597522909700594,0.6104292917557326,0.5689382663372241,0.5092015394425351,0.7366988949379418,0.7375988802554079,0.5397366915184376,0.5039666790522188,0.5030554528745572,0.7489629118123323,0.52127102560959,0.7414895994715411,0.696728948578376,0.5800212589754747,0.7174549748461995,0.6424580169540364,0.6067261926668837,0.6565213561798073,0.515669899268723,0.6327049167947102,0.7254214162969147,0.6668825989972705,0.7090827822336498,0.7154190941270455,0.5553072915193985,0.56968897587288,0.6610321480438697,0.5957368531297187,0.5997626767501332,0.6901979890533863,0.683069773830365,0.7326064053856709,0.6315278106296143,0.5174711956023551,0.5146917665242496,0.5087151684722861,0.6351854323317982,0.7041572910058149,0.5838456284597,0.7454112046448813,0.6813650360774909,0.640382162806987,0.5268753215949176,0.5373084897651257,0.7283323636211744,0.5565493404598458,0.5824144165573146,0.5514254420407779,0.6162979317862982,0.6103598710138447,0.5670154753652434,0.7356952047890828,0.6563369574552469,0.5761682916269166,0.6692355553626513,0.6265628907977341,0.6624658985369178,0.6062284816955543,0.6265448023162825,0.5984646968648029,0.7398601916483367,0.6769084394900484,0.5545159937777038,0.5828013111381621,0.6891274243496681,0.5447421551994063,0.5177689470630864,0.587035015267188,0.6430045679011104,0.6424125978167347,0.7493944603977185,0.5357208510289808,0.6852354584359326,0.6550277613404593,0.720470524196186,0.6193291608529785,0.6241681368890681,0.5365244837328318,0.6221141358877562,0.6621118789149221,0.554492407742508,0.5736908214238742,0.6389801896169376,0.6703040507355746,0.6941366508971896,0.6630644944419679,0.6033149576358026,0.7000521188958004,0.6372773170186963,0.7290847268675857,0.7043057733983455,0.5929032542724775,0.5360187771505016,0.6225606140556497,0.6819077897814209,0.615057731428596,0.6088072821869221,0.6680955444905026,0.6682368227855788,0.627814882325056,0.5370128355561943,0.6335101795226914,0.6473107066745791,0.6140063380716052,0.7428446902603272,0.696731427360874,0.7416488595325097,0.5857446849238879,0.6271668660906359,0.6072858428177061,0.597621488064422,0.6633494448345989,0.6378860409761039,0.5156481227016916,0.6908636887381573,0.6943413152540084,0.5581678724541594,0.5139581364726862,0.6564782749837783,0.5851850194124337,0.6166330249169661,0.6337075091949972,0.6580996480157852,0.5297284995565683,0.7095534117298474,0.6276163891277442,0.7053364350079651,0.6942987897327796,0.7152832514299219,0.5742581923111667,0.7071214517484856,0.5503422985115483,0.5144664221191886,0.6162448859412345,0.6689244428156116,0.5230461444073653,0.7307285139728914,0.6089646377588088,0.5305576555179015,0.571290501563637,0.6108593163351652,0.6876662330016072,0.6811944056139996,0.6786972566859641,0.6589993969034301,0.5925130720458784,0.7107508566246805,0.5392828092290614,0.7266228535364073,0.6326693514700183,0.6373767678896132,0.5171214353040812,0.652201378829435,0.5892504911227614,0.5508176291976206,0.6280129933991221,0.6960986243725903,0.5052519843747184,0.6330697086356177,0.736072675231871,0.6358359066345893,0.593576592328538,0.7393472949285257,0.522574084132054,0.6977176498552027,0.5525881491549878,0.5477675458279518,0.517138741175651,0.702289335056313,0.5217176145416855,0.6798900231752134,0.5961258166309567,0.5649862573489988,0.5880938710559371,0.5763889397602712,0.7408572025624145,0.6031105181155546,0.597168779774147,0.5912270889256241,0.5819882711780284,0.5723140573245367,0.7167821893346671,0.7317838903513062,0.5038899054729833,0.5319721123489856,0.6456863438702574,0.6500734174628346,0.6386938145517662,0.6622195664735135,0.7419816956379617,0.6338455441224476,0.6217746183037982,0.6238526326569526,0.5487234600946846,0.5060552614548208,0.7117461803151661,0.7444123897193184,0.553427425051884,0.7236012168750299,0.6038780076955137,0.5828175296558241,0.7403397735070831,0.5052890956269971,0.5626117946741434,0.5223776480876968,0.667230641072265,0.5336957855041617,0.7082717854587244,0.5974882424139294,0.5204487277217993,0.5267426845142957,0.6692323992479521,0.6553761081053419,0.628681706658331,0.571931083274664,0.5418608394819475,0.5614575443602232,0.6641631656266185,0.6249932112944014,0.5836711521862994,0.639325017175997,0.5140904962778902,0.5751186039332923,0.7233278214850218,0.5751803349296394,0.567001956561568,0.542370676910284,0.5426073158037996,0.7015773551633325,0.6805728533032642,0.7269909293473382,0.6837879817407118,0.6420363940628387,0.6660285412855652,0.5336562025602283,0.5374723827556772,0.5938137445103652,0.7103079711440904,0.5616269953991364,0.533592159335321,0.6410174876178618,0.7254377725787706,0.7481517284814134,0.6419594114806045,0.6381761237896315,0.6946883052359434,0.6075973694283325,0.6944535594043851,0.624781646301823,0.6799629093790809,0.6455857284706257,0.6008318456834174,0.514059810857623,0.5211870062413227,0.7033838970950912,0.6947415423838609,0.5370697039784907,0.7304573573920323,0.6544325835900906,0.6219704513713711,0.5246985649168008,0.6396854149580715,0.7498720136848397,0.6056199380868299,0.7383709843963151,0.5671265440727298,0.7393439163425297,0.7156999144313548,0.5410615828795666,0.5592766091463379,0.5759598077518169,0.6295683858349037,0.6836374123513589,0.6312897760066227,0.703834035868234,0.6994939481906484,0.5654794842823702,0.5306323936598778,0.7318877240466546,0.737472893705124,0.73598170022141,0.7292341221239184,0.6306175527096733,0.593959277389024,0.6802305718557113,0.6230955714984974,0.5525862115605633,0.7455146880778201,0.6289084499526616,0.6057095222108799,0.716517488418531,0.5253175134250704,0.727870023659658,0.6858997848530977,0.5008421167825294,0.6845763988214615,0.5385313645216685,0.6555114968716498,0.5418578826050955,0.611752740376752,0.718220760475464,0.7148794939280596,0.6758490451366393,0.5073202379844053,0.5051530164191818,0.6414106473905492,0.6612265635147421,0.534615144185588,0.672257432354327,0.5180350193954236,0.6879804701588059,0.5988180579264171,0.5091079797723936,0.5918553282455079,0.6791725874743928,0.5796831249664123,0.6356438896961928,0.5209879420275304,0.6734358460109953,0.5916649645790408,0.7129159684898999,0.5147889956030489,0.6260478445927261,0.7298753790334113,0.7480791006854053,0.6656735389599451,0.5685396720589921,0.6789396747272414,0.6851655496870255,0.5269497536721148,0.7456419947772239,0.6119249076814834,0.7177654707406561,0.533215883777286,0.5135223622164071,0.689101994903841,0.7154872375478425,0.5865409935891377,0.5152467712708051,0.5465095704576206,0.6849562368205215,0.5219272749397141,0.5116918266790182,0.6651926835970412,0.7281262726554727,0.6550661674613719,0.6882707326502839,0.6153374352229581,0.629984574203148,0.7462665250685816,0.6016586273165276,0.7490987286241797,0.731250870913474,0.5588510007521164,0.6102352736892622,0.5978988420247924,0.5777658721526684,0.6985083393983038,0.5669273622569042,0.5718859387498536,0.7141167089358427,0.5144677232063313,0.500331013094732,0.7213960969018827,0.5671968980958169,0.6933107146730321,0.5534989038339878,0.6899123543642692,0.7107990929383214,0.6300941993431626,0.645581919564834,0.513434077090718,0.6032749803504731,0.5726901527231092,0.6182356885246869,0.6112266118189096,0.6306151085653209,0.627805968937732,0.6080416445270135,0.7104498558959282,0.5616367611083242,0.6194024750023894,0.5216669597132721,0.5398900704994831,0.5607405548916062,0.6905702879362314,0.7108492069425021,0.7293905248040049,0.7018047610381822,0.5774805940726542,0.7013409269425954,0.520856758889971,0.6410192448131515,0.5765460675241212,0.6069101166117661,0.5954599218168335,0.5634550716218683,0.5408079061249318,0.6063611119801053,0.651563660896689,0.6406447261460173,0.5685477778125846,0.6105674773727674,0.6353276520591018,0.6648226126838772,0.6971852065876841,0.6306348381061053,0.6979428053466032,0.7345942794407144,0.5094318611331485,0.5250228553561009,0.5514216173440074,0.5870935461047724,0.6047996714265831,0.5235808621590672,0.5123266406292124,0.5009791198419096,0.6550653844913114,0.5568568691205262,0.5577600714596831,0.7487802622814534,0.7401164853279931,0.5757628519693374,0.5589486108127304,0.6979892859072511,0.6886860697147594,0.7317215062588452,0.6951665715173456,0.5492187154143793,0.5154116668955855,0.622936954341253,0.5000871191373784,0.7484019533065338,0.5560093542532534,0.6736982719634721,0.593537878077558,0.6662964596015066,0.5453355164574089,0.6918228513025005,0.5212700029174393,0.6003452994659502,0.5582008447218914,0.6997234611312269,0.7083972702933385,0.5747969026314992,0.5364993589619449,0.7425410360582989,0.552212272405542,0.5307393818524184,0.6369532145648922,0.6430912513832092,0.7463637398062277,0.586002000217455,0.5865515158789998,0.5485485809531198,0.5228964546392416,0.5226551133303035,0.5462814574501763,0.6676974706134309,0.6203006071773507,0.6876072851308271,0.5362346370093964,0.5299193711681187,0.5476816274907133,0.664337044259179,0.5639949079504932,0.7260266658720144,0.5657620004213708,0.6074369361972142,0.6658414580786511,0.6328640280922229,0.6165465343466974,0.5694252639685018,0.5870948905149216,0.6817155721959203,0.6723658891467748,0.7155574637096161,0.6878216155290471,0.6751825565079236,0.5728437432345086,0.5981177897387429,0.6925181952375183,0.5084536428860369,0.6530650122259994,0.5745582338224324,0.6802803586733307,0.7448573267068774,0.6158702150242998,0.729961937749143,0.5203860415563308,0.6449665470687735,0.537156432829871,0.6238199935751217,0.606109794848395,0.6694113687866755,0.6662320123867875,0.688334769460001,0.6906429526005409,0.6178425716662352,0.6866817734331783,0.5776959027306814,0.7095272381379314,0.6487550857446568,0.6031258218841746,0.6535743862610748,0.5198244038769531,0.5401743996927937,0.7089771215051726,0.6353055585111181,0.506940336521095,0.6125053397733682,0.5621806807479361,0.5621705558105692,0.5756657466086046,0.6525697550043736,0.6317113508021139,0.6657309378137892,0.5875718442725315,0.6767182939717776,0.5386847095104175,0.5477775139689156,0.6817501266201089,0.6371030795091517,0.5015894549996107,0.6533367149662843,0.5480323268480265,0.6755549578311676,0.5829469707585483,0.5249705138494845,0.5728737898976912,0.5135144797656688,0.5125463802802548,0.7381113587608974,0.553481500480118,0.7443564557029279,0.6414231465707219,0.5742925858227016,0.5321030309808893,0.6145376571587284,0.5555400535927015,0.6817442709438515,0.5485365553726211,0.6062908207112268,0.5325529964779704,0.5607311976733435,0.5219726061086754,0.6862076628861151,0.6816973499063443,0.7226713362527084,0.6995954719630791,0.5123689216983771,0.5491329256186513,0.7250337592079573,0.5672539386917754,0.6599451615210192,0.5324019438314581,0.6442439967558129,0.7376405239844313,0.526747605500416,0.6650007811605982,0.5719038497970228,0.6108963044864135,0.5423891016660309,0.7498031245431939,0.5217859908008398,0.6007941536345864,0.5645995809183726,0.5108130171753104,0.6483297076247665,0.7009257978025143,0.7076942474958821,0.502670608486872,0.7121603591257386,0.6915858223526863,0.6323823785262755,0.5949537372733058,0.5592236489871134,0.676056975992817,0.5082184960923248,0.686586641973712,0.650013185464747,0.5394452406062785,0.7215698034570104,0.5230257471193498,0.7323123305653128,0.5355553718148679,0.5037528175687142,0.547767981133489,0.5994126145497785,0.6287707567395148,0.7378723510114604,0.5716023918315073,0.6914644783869323,0.7252501234285724,0.583341581441158,0.5117492562779944,0.5623399917215299,0.7401749742898447,0.552251670017571,0.7155679426720873,0.6393714437666433,0.5974120671953737,0.622296312261362,0.726775195953971,0.5995773502342059,0.5332214554138307,0.5787292532854841,0.653734438401065,0.6298390310418227,0.6066614882449175,0.6271566229609666,0.5578354710069582,0.7366478098361848,0.6408851480600939,0.7341991873715025,0.7249651011891708,0.5363962093960752,0.6788693805590325,0.5125573855249146,0.7495565258622074,0.5321924934333178,0.601499986405589,0.740191713374623,0.5067117449799656,0.6652828013363481,0.5902649005828955,0.5337359619977213,0.5309470806981549,0.6055452837762795,0.5710314239606329,0.5322951557223485,0.7479652902767873,0.6218609859967315,0.5829612944671521,0.5750220951918283,0.6383655287380041,0.7467775153451357,0.6284160618977579,0.580095105223629,0.711101314033628,0.5082475383194707,0.7091573427329517,0.5904751405764057,0.6701213604822174,0.6577655965802129,0.7363060385281779,0.5138327366752371,0.7221685820138635,0.5906306951017515,0.7377574326948942,0.7047159492787263,0.7296651344731797,0.655268818614394,0.5290128015800399,0.6718720319690762,0.7423149363501824,0.504994584929666,0.5310443341603094,0.697123218107464,0.5417311348555144,0.6760829045695843,0.5652095315376553,0.6474738918172286,0.7258687308537378,0.7298025157826173,0.5282664421949934,0.7112046710056695,0.5494701736062456,0.6391760380271052,0.6570667050629554,0.6905352091208969,0.5475796246640491,0.6179819806686799,0.6060481972306997,0.5688136867893752,0.5019419948932058,0.6087558962338082,0.7140871077140416,0.6674683584145509,0.7184625967062456,0.603084287492259,0.6916492509152923,0.5984591080866462,0.741513265017165,0.6697486791676497,0.7073337868191623,0.6134599653784458,0.6570401165230071,0.5613875623910614,0.6563313301292716,0.5470957029870193,0.681456355236078,0.6238995811131963,0.5113368076265226,0.6394894569937808,0.6403779693182607,0.5583951210336009,0.5289866704397309,0.5551417899804354,0.5861124734985301,0.7068682532237033,0.633406298631942,0.6982001144012228,0.6363934301373084,0.548784436516689,0.6841885600479234,0.6968495733980757,0.6743184430998823,0.626436605105738,0.6061124845434489,0.6086603581844321,0.5828355487183838,0.5211730527535823,0.7282710506246606,0.7380356947178179,0.6764979904616861,0.5983464310590468,0.5658913846880265,0.593001779987549,0.6415003767953531,0.5702045667120524,0.7395774191063026,0.717375501791011,0.7369709087363553,0.6470324808073835,0.5035888328960513,0.7317316356045684,0.6450755458035347,0.6570181879413599,0.5962338517781531,0.7104766769086015,0.5574043047488478,0.6484770150738601,0.6068264129136345,0.674953763485515,0.5897217826030094,0.6711466807097233,0.5708298118588458,0.71724887596372,0.6208132726835593,0.6081708589042887,0.6992135107292828,0.7410911222722003,0.5251912714185445,0.722526287054389,0.5820763575667394,0.6692269513104214,0.6211646699452833,0.5482326055224973,0.6695948929571667,0.5849566874382491,0.6577273535330217,0.5149447995285357,0.548543338532824,0.6384116111016693,0.5943393900423513,0.6948850875783548,0.645295395505686,0.5546738033098617,0.638979798270878,0.5521110584805773,0.6324492353014053,0.5023865063665343,0.6654228001825042,0.5250309373390021,0.7372431189043589,0.7182924523051261,0.6819920591234633,0.6463799826243255,0.7292035925949385,0.5728576180248626,0.7277144394707418,0.6713923607044006,0.6831384081044674,0.6034125213802537,0.7029751121917451,0.7125047797468165,0.5954522189301663,0.593381209478663,0.6239410463342765,0.6505588355071037,0.6152007776238395,0.7075586872229691,0.5650018557781878,0.7112931861158016,0.5275136951973264,0.7231538975718554,0.5201360435395087,0.5824653570568804,0.52182589279524,0.6299244880869779,0.6848642918175936,0.5589441066571278,0.5652588029384646,0.7005225962687778,0.5358280981412442,0.6035952921402131,0.5377295330247385,0.6844778749163146,0.6366514372932514,0.5563582628761896,0.7272624070910358,0.5149110184151283,0.684574052477436,0.6150507577199964,0.6577852638061112,0.5739258954221559,0.735241037290245,0.7419674862043629,0.6733580864896132,0.5872456644595176,0.6648789805322204,0.5028154099979613,0.5266955377728695,0.500132486367401,0.6160599501383606,0.653977957067454,0.6285435191595033,0.569894060417841,0.6871040336204413,0.652281229587781,0.7103128944622066,0.5960029627571365,0.5485951137600076,0.6419512587498127,0.723206821326317,0.549080963291221,0.6465970932762484,0.5689779790932676,0.7291198420179541,0.6634140794332993,0.5216191095693263,0.6723795229836148,0.6812665688960121,0.6451555481565834,0.7009596767293704,0.6783215012896251,0.6639468928613343,0.676522916759718,0.5142602603494171,0.5337766379539723,0.5250494629373652,0.6171241701940003,0.6312436682070851,0.5699849011701713,0.5278440604403608,0.632867328039519,0.7105870013528817,0.7141792613531852,0.5088290356972993,0.5163708631333492,0.5164044807980075,0.5701922591304794,0.5220863171715882,0.5872347149316213,0.6933200899767904,0.5142638052729624,0.5564992232235225,0.6885641380535932,0.6683992317810459,0.7377813071978647,0.6107757998014346,0.6008306547984054,0.575269198651867,0.5996304495999043,0.5015453873042335,0.537243846899651,0.6945000207481683,0.7169400737174936,0.5642085099104265,0.5880706447309656,0.5321805850063626,0.5829681401279639,0.554481415728332,0.5342531537799075,0.6427125385246605,0.652847251714655,0.6658971006163373,0.6259997615799298,0.552498666939901,0.5412332827438779,0.6539843896027382,0.6888475434412192,0.6282109722756324,0.6182359622990569,0.6840160516979519,0.5299915185562132,0.7277967013903616,0.6566029420433201,0.5017319519147437,0.6181380853829708,0.6851651817632276,0.5676634545627899,0.5226656227238434,0.7450657591404373,0.6871418177702178,0.5348159482199394,0.724502074685307,0.6818402778207451,0.6721655738751242,0.6447927829234588,0.6755175404529148,0.6619222387937147,0.663789812880038,0.5121730838911548,0.6549494602309921,0.5001319073381321,0.6190476371465554,0.5360416628558513,0.6238115732720299,0.5231267787461897,0.6836505397211903,0.683188864331239,0.6530462947749869,0.7080773248757831,0.5450847859603849,0.5734403831956847,0.7278458722880452,0.5225783659511832,0.5295329141452662,0.508383771464392,0.5257536219060549,0.6793433065980743,0.547646017245099,0.6381397685991219,0.7363799681789946,0.5805602615706218,0.6266417052010511,0.6340365788220605,0.6140642974817243,0.7455683928727102],"n":[11,8,36,17,0,33,29,8,18,14,18,10,21,22,27,26,4,1,23,14,23,30,3,20,18,27,36,12,1,23,1,35,28,33,4,35,9,29,11,30,6,28,30,5,1,16,20,17,25,21,27,28,19,26,38,30,17,28,31,10,7,16,33,23,2,23,14,16,13,37,5,2,32,17,36,8,14,14,39,13,10,22,35,15,1,25,39,1,12,32,11,18,1,11,0,6,2,34,15,25,38,29,18,24,36,16,13,4,7,33,4,20,1,28,1,37,21,16,17,31,6,8,6,7,23,9,5,6,35,3,16,12,11,1,6,25,37,8,27,35,26,37,10,0,29,1,9,38,14,3,33,18,4,7,29,3,16,7,38,39,1,36,11,38,1,18,1,20,10,20,15,15,15,17,39,38,8,8,1,23,26,24,7,9,15,15,33,15,13,24,3,39,27,4,26,16,24,15,33,17,8,25,12,25,2,39,38,32,2,21,5,15,33,11,32,38,18,8,20,14,26,18,11,39,14,8,9,24,30,14,30,39,10,32,2,8,18,25,7,28,36,19,15,37,24,31,20,23,24,31,39,11,11,13,37,37,7,19,18,1,27,24,39,18,30,9,25,34,0,16,34,34,9,37,27,31,5,30,10,8,33,9,20,22,30,38,13,25,23,37,35,32,32,2,20,26,21,6,31,18,5,1,39,7,21,21,30,32,3,12,10,35,38,9,28,16,17,22,3,13,30,17,14,10,32,20,38,6,25,34,36,4,11,12,26,10,25,1,33,32,24,11,15,33,2,10,35,15,2,20,29,6,32,16,29,31,25,23,25,35,22,33,22,2,36,28,35,25,39,22,37,25,26,28,35,19,5,40,30,6,36,39,38,39,27,39,24,35,9,39,31,5,3,20,16,9,32,34,33,5,9,33,29,28,39,1,12,36,34,33,4,27,0,3,4,12,10,14,18,37,22,36,33,36,26,5,33,7,1,25,27,21,8,8,27,21,35,28,32,8,23,18,21,10,21,36,10,37,28,36,15,2,30,14,23,0,37,20,5,31,13,4,12,12,37,18,24,14,38,19,35,5,37,15,2,31,33,15,39,3,4,6,2,16,36,38,31,4,23,39,13,27,24,29,22,11,6,19,27,1,4,2,30,31,14,4,16,36,13,26,0,23,19,10,8,27,4,27,33,19,23,37,38,6,23,26,12,22,2,12,34,14,16,7,36,6,24,34,23,11,15,27,28,17,3,36,3,38,33,5,2,28,10,6,31,6,24,1,23,1,21,8,17,4,7,30,6,33,4,5,22,27,29,13,3,21,31,5,21,32,5,27,7,39,4,40,14,7,23,13,11,19,33,15,36,11,22,6,40,17,13,18,34,14,6,4,30,35,32,6,9,30,15,13,27,2,9,38,13,27,24,7,23,40,34,22,21,4,19,25,20,15,10,22,21,25,11,23,14,3,12,35,27,15,5,6,40,29,33,3,24,31,22,25,20,18,7,3,17,6,21,31,2,14,17,30,36,1,38,17,20,24,27,32,11,38,36,35,23,37,7,3,2,9,26,15,11,30,16,3,40,24,4,11,35,34,18,8,36,30,37,12,26,26,19,29,9,35,37,2,15,1,34,37,23,3,32,29,12,5,32,14,24,11,38,27,22,2,37,30,25,30,22,15,26,10,33,17,30,7,3,14,10,39,35,21,32,26,14,27,16,32,3,26,30,14,33,26,1,36,39,30,21,16,35,8,18,8,19,5,1,25,36,10,27,40,22,9,22,17,35,13,36,37,39,13,25,35,14,25,3,33,37,9,18,13,34,21,10,10,24,3,6,27,4,2,32,39,14,23,27,23,33,23,24,38,28,20,23,19,4,4,20,2,14,12,7,12,21,15,27,39,15,24,37,38,35,35,2,0,1,24,26,15,18,31,12,5,19,0,14,36,25,18,7,40,19,30,10,3,37,38,1,8,16,19,2,30,28,17,9,20,30,22,24,36,29,26,35,18,14,27,0,9,21,8,9,24,19,29,38,25,31,11,26,17,19,27,23,25,35,2,39,34,4,27,37,19,26,27,32,5,25,39,26,36,22,22,27,27,15,7,39,5,30,8,32,2,13,7,16,16,13,11,19,23,2,16,31,18,7,15,29,28,34,11,40,34,34,30,22,2,4,20,26,8,36,13,3,24,34,31,33,19,32,24,11,20,12,29,12,29,39,35,26,7,39,26,7,18,18,2,16,39,20,32,19,8,3,4,19,33,32,28,1,13,9,29,33,26]}
},{}],125:[function(require,module,exports){
module.exports={"expected":[2.404058543339777e28,1.9577193139708736e80,1.3214991670801038e38,6.625052114618584e52,2.224591091086554,5.0007567742941086e19,2.4349562014293942e129,2.3271580506204037,2.0121210179984464e45,4.0589557507114964e37,160886.82264219166,1.4888307197159836e26,1.7712871608411186e10,8.897520846702772e85,9.62968313601571e7,1.0110256489379318e25,7.444912685740782e31,15759.797277968715,2.576964948843524e82,4.132586396972946e40,136613.22458063863,7.070960593254372e9,2.988005725002249e42,1.7026643398060465e50,2.71700889338783e24,8.7276426112005e15,3.645552871176428e26,2.0916327966970498e124,411.69181668986795,5.271299274094383e27,4.113112904555146e103,2.7370667385768147e17,6.284577329428582e79,5.913387141312419,3.087800045521574,1.5032773739376546,3.61742197302917e63,5.0923822078689935e48,3.8988946491277256e16,2.0075058072564004e35,1.0982823656120824,1.0,7.602530282560608e139,2.894189679197999e19,2.060672611100363e80,1.567948783960229,2.3799502278179978e151,9.73671940463735e60,4.646242303997825e76,8.61053845600738e162,6.721441825069586e60,9.976193499309525e82,43.72618318081789,4.125896237460738e109,2.0155601579067577e53,4.4640419730866797e89,22.17835370878041,1.9477790471598394e45,1.4269836873477288,7.110856522652835e6,2.3288745639905846e23,4.3997714393152415e18,2.4633607938371292e130,1.0426871368703157,2.3742286938973854e10,9.349638613035471e178,6.225570064825461e23,4.338130769468557e24,4.171949173815305e22,1.3781633070164857e107,1.4610791782863605e84,1.0629322059747972e64,545.246597458389,2.3502845142298183e59,16.979336856367144,29.241216001706945,3.1839507465915347,9380.504923731281,14.694126258634956,10.745668235773456,1.7977100027096643e42,3.1603252413695557e171,1.4152128990591633,3.4345666297799417e34,7.585299253460158e86,6.947747879786568e17,9.731034431577245e17,1.5586367701023276e88,4.2389654830248315e35,4.0835223550551124e102,1.0,7.532492397256478e36,1.5738071639109777e197,1.1062416503508157e98,8.264937184525663e8,2.646038814062695e24,5.5156825143815864e20,2.3352500564941497e23,1.480830768631833e152,1.4377689227495463e22,118368.75088481206,9.726182970218792,7.48819533856686e7,3.65477804959202e69,2.9747938556357525e89,5.837617636658831e47,9.394996401870366e125,4.575062177395573e7,191511.72940225867,4.2518018031882764e86,1.1125063202927154e88,3.6071978122085535e92,2.859070017101338e210,5.964755954414462e53,1.3385853960620725e9,5.247156424370165,7.255180576836256e183,2.382991838270739e39,1.1801374523572367e10,5.262331558917552e138,2.139480452407712e6,1.7795858094426623e76,429851.47411291936,5.558218759047904e85,5.281229950925172e21,3.4185807498089204e27,52991.17366870298,1.5007041636075633e34,5.960525391672364e166,3.206269390334952e84,3.5514494740378437e84,5.8326241645729944e7,3.2613000946889875e48,3.0993042755634756e132,7.843342800419331e96,1.1843902615647398e78,1.7658261729370563,3.664988724468262e31,4.661883139341779e39,5.767555427220864e21,1.0,1.0,1.228609739025003e148,1.5559616411871421e18,144.62388076985735,9.665196473140087e119,1.781944187432394e30,3.464696233622241e56,6.511616827505822e159,5.925029588150961e14,1.351156727621695e126,3.7960421697202555e71,3.1011331904744885e26,8.444859500543046e180,7.127586486365216,5.6831520847863555,4.2571745423176853e61,3.68621071595926e7,3.3193575507186783e34,2.3072131602268734e43,1507.432995400278,1.699913762725844e209,8.794984615250881e49,7.216907473623582e93,2.5351051442167465e54,6.420162452029254e13,8.958707110322748e14,2.736487893947057e132,1.068857341277264,4.627684217705667e12,8.847854639703518e50,1.4694026923586328e12,1.0062327918324276e54,4.964826140329793e72,1.6307541406317214e87,2.4151684468202412e166,1.2361096310204879e97,13.035293824533802,2.447286426609526e7,5.1791291957169303e39,2.539133249839419e68,1.012950953019951e28,5.8902032329825695e140,4.259087939897627e60,1.693355740810741,3.773772780936987e34,75.72918622719038,465.5914454406104,2.1221516606055627e84,1.9996476228436465e28,1.1808862538395315,1.3879342769215361,1.6970283350213138,1.5667868994264286e62,1.117076798760085e6,1362.4426532631703,1.1558426598769391,3.835034294811284e10,7.20601555316908e25,3.590558861652057e109,5.72075830529343e45,1.0001036462991884,8.670204732752668e72,9.434523433950336e41,5.855386870511612e45,16765.35370401562,1194.9639246067002,5.537322457983599e48,131838.6031943259,3.1474508672098415e10,1.7071797806886854e46,7.269366631416984e76,1.6979385109124958e49,1.1235103953997902e93,4.874307835011439e81,2.6596718262286225e81,7.398901351544922e36,1.1539575906909297e9,21.947185471371515,1.3136662289661103e65,99.99482207700024,7.687997932784823e74,142.2783210783011,9.019700533357503e80,2.752570394426172e87,1.061370477545476e146,3.7404403368031947,8.406766267616365e11,6.401312655942836e14,89338.13977136284,4.960829508708441e30,1.3632921541402744e63,7.753566755553806e7,2.0204608656883824e35,3.199994063445068e40,5.47694734814662e31,2.4315669095801366e6,11127.722629662427,1.0741912282296356e81,8.560381722161032e49,7.497065457661582e86,8.606312237296477e13,1.2424984101347934e105,508049.77706054813,1.0936638525776665,2.519174915596559,10.533143309147361,251053.91595556925,3.488268921777743e103,5.644756008146395e35,3.1254724923228763e147,1.0451001030296232,88242.90257164942,1.474638799830391e134,3.69710288358467e32,6.030194938319238e57,3.4630648917260125e71,5.544127419235438e71,3.3323448318147736e121,2.1074186811607804e54,5.466969295282164e87,7.846010397680325e169,3.0112424339443983e72,2.2304373224181475,1.0986562999252901e117,5.217210266316813e95,4.722016930192151e23,4.322913570001632e180,5.084329587870527e56,1.9612950865789116e10,1.3120104784328646e13,29701.334230264456,5.418620491049156e7,7.212647371591628e112,4.4664265291508326e18,2.0050957869516566e27,35690.39161932906,1.532993402711854e90,4.163697556626052e6,8.669392219331098e20,9.020482978342133e12,192.11434862991675,5.811788658703169e17,1.1219818858738191e89,1.601632067205531,3455.9189185090445,14103.784324938923,154399.20937634946,4.946405144990377e20,1.2781586102916275e59,2.1326390927229585e42,9.003967930336628e54,9.30183908950207e15,2.1181307343462765,5.049146382221395e74,1.6521951939734524e22,2.598912320944492,2.5089114150147103e7,2.3855473415872383e10,7.768574826015738e48,2.2799340292129632e91,5.588363851885895e64,2.671116418577469,2.592839499013179e95,2.7320227051136643e61,8.460930754677718e22,2.2445442357741667e52,5.4857933888624056e16,2.6634455532274035e8,2.6272878101656455e29,1.044905889655242,1.32712243686885e194,3.6403988802344847e9,4.041502443362126e175,2.489340470213982e39,2.894085520859578e152,5.3169288885203834e17,83.79255117153546,186.33489828130513,3.7323842997368605e49,8.831128544428718e41,3.772887472531407e12,5.479703592330689,390.4169954809316,4.056368420548716e7,1.745049625378152e103,3.417749706668015e160,4.374593023276908,2.489356367462806e48,30393.548343013885,1.499628780571055e174,6.70566909145601e9,2.66885496342897e64,5.560220883909053e79,4.763567391099351e34,2945.8814901431538,5.577995258308882e76,9.990239319288726e59,94.91952931279955,6.839754200521767e7,2.5682589387058917e138,3.9067155146417144e79,1.441994889162812e19,6.753560909787153e26,3.36600553790662e49,6.8211521795619475e134,4.328754826400066e54,1.0685494627551001e8,686.0086872915863,8.852234526776868e7,2.4041537616381272e111,7.585387956216431e85,4.088835594256825e50,2.5520061501489615e34,2.0710674524990596e61,8.326987213695688,1.3597310505810565e49,5.416584006271776e34,3.146464871104845e129,2.030915569578792e70,1.2295948803442219e121,2.6144545635660877e17,2.1670013731860356e25,1.3102340043135274e23,23.594838965674896,9.089788808848848e51,1.4282929280225763e53,1629.3057033716036,7081.1141921485905,1.2695034704768055e47,3.399734543766607e29,6.256028443038878e14,225.06139400786498,1.0,3.385482595496045,7.411359424502695e11,2.459118968607533e49,6.130358260356726e60,6.15166156711691,8.864439344668641e35,5.338889711830936e12,6.058821019377027e79,3.943948141640296,3.443073439354181e72,6.703225508580242e14,1.6341501281493293e52,1.2606806567526926e50,4.701646523330636e49,603.0579359275284,5.00196407832681e15,2.5381706356229166e14,2.4309229950448232e123,1.7143075631780685e65,3.2546971415129933e9,12.985208093146973,4.0873446495253234e13,7.993307869748142e18,4.178678495834225,24.597365306147157,5.257458448642529e64,9.942519400552969e64,16.972250512517785,4.404047684549686e7,9.544584555685781e7,8.280621597281466e125,1.8363962432655284e128,44997.31786555973,3.1659332964131594e28,8.692508819865253e6,9.641627682754655e129,3.9474095811290525e91,5.683701911478587e37,1.9643749931419432e49,1.3185326597750433e55,1.4755369436600637e8,3.3613521708687254e65,9.494980237274636e7,6.1785223567622535e25,5991.877363506192,8.563691619510656e15,2.0304583273024213e19,1.750187536789813e13,4.60748962635534e127,9.724779650603808e46,5.463555463869948e110,712.3595853735997,1.9199637868618314e71,3.7119806796305213,1.9829591150475434e50,2.4859900844715748,2.2945952634273968e29,3.8946200997509723e74,3.9087075169361615e11,239759.33298850353,3.601733109815822e19,1.0561790720884195e108,2.3524422801243004e10,4452.072559232107,1.3409371870499547e47,1.0,1.2538456650620218e142,4.980132472702679e18,1.1248888503628065,1.1904938383907051e64,1.122058245127018,11.024278185587985,1.2303032760831904e140,2.5405230482841817e28,1.0412639901296952e49,2.8521210887612636,1.6214760137808218e11,5.70748471216453e31,1.9597968098665906e26,9.540883488291253e7,10654.461368249793,7.652556982588495e11,76.39185171920376,68.4810724474382,1.5625860106825337e42,1.2578609684250028e20,1.6865461341077517e21,1.082697250542659e117,2.448688702050066e10,1.4432166121337482,4.581058964010781e43,7.038187145219844e48,41.174367727421604,2.074141150461436e66,5.746410420644679e37,6.929668440878799e92,1.0594398682335876e15,52.7004073282664,1.2838953253327107e39,6.178556109478633e48,5.5910365198175e51,8.93078402317401e70,1.5858845932257726,2259.792485003143,957.7494845384964,1.3347995929036196e7,253585.4137423981,1.196351022490437e31,34.81737667912321,1.3552887915255276e23,1.2489879436103902e94,90.81647847778102,1.2127893795309457e30,1.378517168891861e74,1.0003014428348704,8.625656452890352e164,1.6827813919192478e31,2.877445711097866,1.0585322523770417,6.759847840872088e77,1.72206335573635e107,2055.9819057575846,9.163370576830748e185,1.1435694175084774,22.99084262223332,1.0868658174697028,8513.25937217217,7.907421299237685e87,958.3707443723627,4.0919270590641434e86,1.061212746454233e24,1.0,1.6017842738916804e67,1.4308053772897975e93,1.726371263857111e132,1.6996024770482493e76,2.5645681249080378e106,1.2583756892472588e25,1.0395903979257861e45,1.0114034453550793,1.3398373739208318e35,2.0260065616408488e14,1.0956392070247949e24,4.27697490457307e31,1.0628540230807703e12,4.468935236286199e54,3.92758102741118e22,5.640081524427936e24,1.4497072943082756e14,2.8409510126335484e33,1.9126524800441297e31,9.326423030786526e58,1179.4539437645115,1.778496358124272e177,8.13083495926761e16,1.5689866110831436e19,1.085915977768122e99,1.1311349175031313,2.653204770653179e23,4.4869683935079794e14,2.4998843871818975e33,2.0803545238865293e120,1.3169787805651884e18,9.046511833275088e147,3.4481512538235e73,1263.4848621299177,8.26609839090103e8,2.2287016474338023e81,17697.302120089324,2.3111036604735207e54,1.2042790818708016e159,2.5376794664045964e122,7.65156280172786e17,1.6371623814899263e26,2.551921803029875e151,7.688551881149638e24,2.24235483803301,6012.481749994099,7.047184838613657e50,234326.74330222834,3.6021704338780106e113,5.01544353621584e74,39.93927184237035,1.0506380115123573,4.935364178481611e18,2.0397120491600784,88.40099210301403,489.0156432064102,1.3114719630303003e27,1.7718748740814605e46,6.644240110185778e9,1.9235474602193028e83,1726.2930438616233,18.906117643467578,3.3748654479510505e67,3.1202075395813583e76,1.2023413269851028e127,6.453235561075286e60,9.224383664666253e150,4.874422821871598e95,8.506995881017415,912.0758753241139,3.0036223495284102,3.448480709738117e66,1.0323196438929634,6.737628266080918e48,1.1312749139982732e135,1.1233709353593689e55,3.2942842048829918e10,7.436527317611021e7,6.854197000270339e140,3.2529239852872854e28,1.7164925370657544e9,236.66819313642173,3.399232688530454e91,3.8773995145786807e42,4.112393453442149e42,9.030629625744123e19,2.449262349033637e37,1.3927138424908598,3.3217561540946967,689451.3623820908,1.9999291053539474,3.855496670747132e50,1.1766261933854897e35,2.0818051207315725e18,1.103640452668688,1.145167978413122e114,3.3397203858703326e24,5.4953404423276474e72,2.1033336498146857,1.5910873949694902e57,2.850588670709957e19,2.2513116757027364e161,2.559367037751916e97,5.360072906935239e43,2.4265899974171905e91,1.8809226460526447e26,8.3614775063780625e12,13.674222034817817,17.40678192766926,2.3925148144848874e80,3.8979168323527116,441811.9715907222,3.28152746900221e15,6508.70538794209,1.5135855618144597e65,2.23326747206212e25,4.73941476443247e6,1.944430521892695e7,7.634301224883399e29,5.295642475413826e84,1.6511429602596705e9,2.5816807579155215e102,4.484613381035759e155,5.935843980911996e178,1.0471143281512143e79,3.021981964938427e72,5.691425385951669e69,112.67011185020219,1.9908227812588167e54,4.891689953263007e28,5.3369723753092914e11,2.1283965269727252e30,2.015905278186274e11,1.339216218326291e59,8.559531414329873e12,1.3507455291775521e18,41.815862922955766,4.950545905943788e6,3.446929646812159e189,5.388349000832544e6,4.81523340182119,1.2136612479494482e124,6.105899179774794e68,3.2100686277797477e13,7.434299349729388e9,1.660841513691296e87,9.452799820002465e6,1.5692229152691825e15,1.0,5.674563799111607e99,4.159907722290456e83,7.586832662293672e37,1.421287191430954e30,9.686010686158678e21,6.09317162513053e61,1.631423645649411e132,9.844215864454233e157,7.29716822846154e26,6.846516645769464e19,383702.0298645337,1.962704977582495e101,6.156766345731519e112,7.26728881476523e7,8.644432376410437e91,1.3171382896747906e11,1.4384504402445396e54,2.625833778999169e33,1.3604281106926144,1.7888315921054398e47,1.0,1.656691398822303e11,1.4757486967348434e120,2.6294000934645337e11,4.6035327106770865,5.831216122713658e27,8.178108951437751e36,83111.09771800437,1.1525511863749984e28,1.0,1.3518261514239631e98,5.9914895224222915e53,9.126428315228949e10,1.1722859768749533e27,4.03585247332426e40,1.042392583356014e92,1.283105686876526e82,959.5747429400129,1.0115630823326086e96,4.590620030027433e170,7.869600205334905e20,2.995938404133849,7.357533468290545e56,2.2419186783297088e57,3.852307513413167e12,12145.272495688296,6.92591227331682e52,1.5942934116111904,1.1665474973314046e66,3.22243452381474,1.6684198166144145e96,3.575555405252809e64,2.527985519602357e93,8.974287593377409e35,2.423817283610668e16,1.6453335405219956e36,5.00884855161049e44,1.0421831843185533e21,35195.679433988356,2.1841840858708194e121,203112.60311257897,7.500919920732579e52,1.114827707394485,8.505552766481102e156,9.537783151549135e7,2.8972543181288532e63,304.57304936030636,12.199880194957565,3.7442049045291914,7.640873607412683,2.3833572078667493,6.857813419687785e97,1.6569185371018131,22.099999126436437,1.68646714728538e26,1.1933077777583716e87,6.149189871459762e52,5.8822585489829935,3.856908141801833e39,2.936811520503492e17,3.716335419569212e13,2.9993545763283547,200.0199679966459,1.8975288943834147e44,52.79525760475409,1.2539458656347855e20,1.0,1.0527323725021581e8,3.0105504337323963e97,1.2276368390721281e101,3.9640522413710136e82,1252.5573047449611,7.444789140976008e70,2.665221981804274e173,1.1064124198886471,1.0022703029988072e113,7.000948957375808e105,8.251041221680504e56,4.606660724220675,7.082742652769378e13,4.2940114110727553e9,5.403913376865795e80,3.712832175008688e83,7.530641134635225e77,2.220866113537409e48,9.694823825213014,6.061135128096272e12,1.8866520310980895e19,2.332370637296191,1.7702240607124964e49,3.953924632030585e57,283.55279279110357,3.5345827789046318e78,1.1487601162432893e13,6.252972997833432e55,1.689654606814133e157,8.883388787636569e14,7.516882866154578e37,1.4445716379946766e30,8381.735295952285,1861.2842818995518,2.0878679127957913e49,4.998922179112054e8,9.565212794052211e37,1.2029156325019752,5.024847635883846e30,133.92316061994723,3.035199465875621e11,1.0,5.41819373487621,1777.318252264399,3.7615897004805033e31,11264.465033603234,5.130177098113496e32,1.1917618960643902e135,3.011120669511205e94,2.153134185194175e95,5.930268140317396e40,5.921526042539132e19,5.024617162703485e74,7.397355840746255e18,7.135515228214575e78,4.661530322132139e121,41950.10019849895,4.025547984511855,10358.108006083356,2.102435086413394e172,6.037297562094897e108,1.1337553868920571,1.5789256198551353e32,286.2235723963316,3.1720510739576253e38,1.777912202582491e17,4.770442595364971e168,2.1718505963616336e17,3.8946992452777283e89,3.845417560840758e17,7.23103250238116e10,1.4873728023069354e20,1.9237698588669833e19,6.08070767840785e49,4.629108693734123e53,8.575484587405365e35,1.0505909064865822e6,3.0002306861314315e104,2.1306397561033466e21,2.2660729208743423e24,7.038043577322906e25,3.2446413985597064e66,3.8420546125522296e63,3.6807027663240735e68,3.748517773430171e91,14.236799245655835,4.057685623894706e55,2.1679120356208818e74,1.0847587151270231e38,7.578502357881789e40,3.4016229711192914e25,78517.44877465184,5.673097180616285e101,1.0987607650432033e41,9.57260442920314e11,1.4325185917600882e9,3.730017326459376e46,1.2898232509643885e52,1.5051318864303965e13,2.5371825696180115e17,3.399823746576417e40,1.4233605674821295e34,4.615785066029554e96,3.1081023370277836,729.2177245679228,6.2884855370368175e6,8.768752635412397e77,7.419117441148697e23,193.7864744571995,988.9227254406662,2.0366262167857932e37,1.049988724268048e13,2.0033603241090256e17,5.0705890607121626e17,1.179939630001763e56,6.944495489675312e157,83.23098145716015,1.982865061815688e44,6.82333436319309,9366.77799520771,1.2331899808165803e28,3.210835543778143e101,5292.627250358157,2.9190739755453644e26,2.6895786297356228e81,1.5739104574747186e41,7.882022693055478e35,1.3431826726431093e17,6.460985399200455e95,4.409212315656267e35,2.5550822583433584e120,17.766750885523667,1.6091641627393096e40,14.14182737539268,1.0820029931479198,7.383557673307995e125,5.338661039970225e130,1.2635724585287434e11,3.186630912908181e8,2.8122099941212663e71,7.323309728249604e26,7.526358769280656e101,6.316995985667948e140,4.890183952973532e115,7.333105644072983e21,2.0566366376414697e61,1.4405084386432743,2.032674192863848,688287.3636750453,3.1654481253142803,1.2092556706657778e12,2.856221627091358e115,3.2980807864463192e10,4.293938818831662e13,607046.3232257982,1.6142753990815133e6,1.2541525766967119e116,7.058661222256933e31,1.0984361026282908e56,1.0308044530592666,4.914044359370701e116,3.1079177293798037e30,1.3370389301163686e13,2.5878194776758893e45,2.4469361415152528e67,1.5028564220648215e81,2.554984312477329e140,8.150829432800383e43,1.306259585195672e97,5.970350856541366e99,6.154910517575379e73,1.550758461614587e77,1.345514930322394e34,4.064562803767282e50,9.690018129461895e9,2.355092207982783e197,2098.538593141847,1.6185771906176013e62,4.1349777587791716e43,4.0302842205382013e113,7.843139186608018e131,1.4049402542732838e15,4.55804484602937e31,2.322684500381425e16,6881.535155360646,6.161237330207043e41,1.0263963553876822e92,2090.406750742187,1.1012246386765446e11,68.58425504799244,3.7735542824797243e40,4.349664688134759e48,1.1642286596895389e62,1.5177565631766003e115,3.5896500655535673e109,1.5962235374520621,1.4044984169133094e8,95.58180789198713,12047.91075113801,2.746284466283503,4.218407840077199e6,1.420037956230736e42,4.2893879633810623e21,1.3392964331117218e21,5.851032975222653e161,3.8007746097555984e111,6.273641642257486,4.0285176914219165e98,7.641641825807758e91,2.82360664120689e22,1.0590357168278581e108,5.008145518009217,2.091194510536739e29,2.9764622934049497e9,3.6736769312179095e100,2.164127571062179e79,5.023150694410361e93,3.273912525875154e13,8.388413011045761e60,1.0182632397219771e102,4.313300624914161e11,2.256068600688926e37,1.893685717490659e13,1.6661244086511285e20,2.478193074937214,25.78912707097309,3.7371390626857265e116,1.2998371350814707e41,16.965414840434047,1.4211443654089684e90,1.6609228524907526e99,2475.0844307166117,1.2708292975053702e8,4.997788408085758e44,2.737857335321836e86,1.0026848282841,3.675579193489858e118,1.0790599244737822e130,12.455616973001261,1.0042426641602427,1.0902623198494424e17,1.0896656105676967e11,14.749224171498524,4.977086030569282e44,7446.207701087639,7.6764698851111195,219081.96024344862,1.5300418824635063e33,9.138628895557438e73,38.7858043384735,2.1620778601698713e43,1.9189681192723196e7,5.865383581505994e60,1.0209329771337419e121,1.5679880906522886e86,2.3495719068586485e70,3.0456179817310893e81,42.55347090235719],"x":[5.340315190034217,10.200305502590751,4.821592979807871,5.519635066026388,1.8247543972970137,7.062175873695785,12.527495090122947,1.5176342812616994,14.522712294706853,7.564160230278155,1.9641817914561055,11.782738873003053,7.137322368112361,12.551204476968653,2.2925747465512227,4.325901673208355,13.60567986367769,7.577405562210417,12.198140761180621,7.712684673318597,2.5524051847292437,3.316738520815546,5.477098717356512,8.284358081031973,5.826225762876795,4.4097347311307,5.3989968352821105,10.570305054175101,1.7501934133331631,4.573609193465941,14.194829154849186,10.160718979401572,8.764675307991387,1.517188015240769,1.1303241015586996,1.4649904681826365,11.535242253273546,14.658215581928584,6.381477652033016,5.71032171440085,0.09498906851834299,6.700065534340286,10.299977556764778,6.05259345168875,7.301686702225778,2.968866867338058,12.14469139842611,5.369579636858829,7.249590534409776,12.341327615045708,5.621371618571449,13.829106199310958,1.622953068200128,9.925342669857452,14.062159080046833,9.83969968352892,1.3372467686642686,5.658164948789301,0.09996769669779915,9.974337080527215,6.598523331056566,5.170474414220538,9.901915902156443,0.10490740260107656,3.2171481421361303,12.232638299674397,4.053409423210654,10.270947122783086,10.735654980007688,8.506034527892364,8.985659672312934,9.068303588552984,3.2002545101295254,11.225071220767616,0.809435176555019,1.591441656196153,1.6586093458182205,2.794647271556978,0.9739647073067248,5.771249648120613,12.732119358355662,13.467025836102902,0.06837238552686031,14.0990010701983,10.527214878555052,6.0820426899381905,7.7300178514499365,8.997361794161762,4.986780959601788,12.380343812713148,5.429153347782464,10.131465306698544,14.959871063731875,11.408061428909463,2.511716103020958,6.629056516720263,4.169829895501353,4.010698989195652,12.975323359690627,3.2972160802104176,1.4762679647366839,1.9368578007265536,2.9422229304498293,6.512628995861015,12.282328623786116,13.663256808114015,12.510001655736758,6.069834827269604,2.806047507001783,8.805285351711635,10.84871066499075,13.699794863724401,14.743933837968964,14.202204862480537,2.501764227285589,0.4558190922233474,12.802499431820252,10.52684971633797,5.713746988394567,11.04620004219334,8.945272057475808,9.929055026288797,2.9874287263240995,8.473785293587087,12.113563926051555,11.714440752563199,4.806053422365092,8.91680906934338,11.873784814068948,14.28393664451039,7.115676417157099,1.8766835338073218,14.719779776312002,14.21256067070134,7.733188940147522,14.154462487527361,0.10833704126070542,5.089457358186379,6.48550814316624,5.436599958800048,2.4592882496828947,14.463456846314092,11.244900935994425,7.922787087094547,1.4687512555954974,12.724281965605584,7.038912452800431,13.008756706423657,13.186290129414417,2.8583300055291385,10.338688636713071,8.225731605116172,4.4685433556341305,13.250339627019468,6.5060438725964715,0.8312330918646416,13.368439237928353,3.1135795846119674,4.0716136814122015,6.439824110083466,2.465658183286817,14.886459290607176,5.225239211785684,8.561825934422162,10.678559462346449,12.28216477019674,3.328698840357652,10.152280226306763,0.6903523027708303,3.855451059141466,12.604566714679958,2.773043226751902,11.995548569192863,7.284026583653822,10.179802264727481,11.605483868683677,13.128863132992409,0.5942641370702773,1.7484632431451408,7.470541747860965,14.587201398596893,12.16678219745854,11.894134305000094,6.4421263576836125,2.3537219248726524,5.509720593234179,3.028431900968429,4.507446963753146,7.23838874002373,9.872906686368113,0.24805684009195583,0.12163524165748951,2.50572392388246,10.843948232541585,9.396944837878047,5.210974139957405,0.21046099032895338,2.5142929952405857,11.757263472811466,14.769500650376465,11.290546049199609,0.00031836560121512036,9.767863179005593,11.439164709328642,7.319663789229002,3.6917014888926936,2.8886135088033713,4.754767576754886,2.6880541312877657,11.473641588198085,11.260587117999476,8.026942540002974,14.976554801414965,12.898401966830482,13.92132188982082,10.642221716302858,12.505174490679021,12.811990691924654,1.7990729968412966,12.535743751053483,1.0998353920302906,11.444987970418358,2.1200160189611807,13.31356891564054,12.392458267907806,12.666887397420524,4.318637855684791,4.029531458028828,4.832364571192059,3.1423227692217806,5.163879204604331,6.716561051494553,8.621271050529089,6.466729323814608,7.648853662193441,6.2914766150401045,5.239636092546921,3.087005282163966,9.854874199373832,6.202294531383749,7.9990695611297475,5.970776435225716,10.151031557032026,2.508388197636643,0.1034781402012408,2.520593608648255,1.0067542300626575,3.187182683224493,8.461934849326981,6.938643767186038,14.364454390063646,0.22790069194104867,1.4379126758150051,14.148410159283157,6.07121675310276,9.39875412285861,8.219382708498312,14.746158432264636,10.35921292948376,10.070993091606443,8.951745887475408,13.938906134158234,9.556011420561108,0.958285675157794,11.369538267973347,8.281593565788897,5.317179666320145,13.869563454944617,10.706749243890263,9.66071820229043,9.472222166669091,2.807201824477281,6.062417433757106,14.815260172725575,4.568932663928484,5.903229325376811,13.013309827926964,12.107353779286456,2.6595482842862364,6.542330466132524,7.9602656532873475,2.3996928016036945,11.180680692808437,14.032468714160075,5.988734081499181,0.9396657792699614,1.0878954861823031,2.3563969853550457,9.163095295639899,8.545172310678014,6.436866804845359,13.067447802635206,14.339599189976116,1.1991258267664673,7.810184604143231,8.482144937904577,1.5540836401513802,5.548181286573771,2.3940531207514706,5.8740433781016,14.23846818335636,9.532009007024776,1.200237866867474,10.365311983545226,11.612905092289003,7.058104718662101,8.891700105702741,6.971079131816584,5.473566396889443,13.254599536620562,0.06649681618704273,14.14024543666844,1.855033067195544,13.102446480004996,9.570442411353836,12.4410162589956,2.686045325200064,7.482362034901323,1.4990675643574136,6.464656279524102,8.277060763794374,3.959530437362914,0.7654885308681547,0.8435137619454336,1.5705065291698284,9.820455227378044,11.10441244267455,2.953853772220796,8.732557713913616,3.460177046310174,14.547156047092598,3.8589454263695266,12.724430348856732,7.06980494313175,5.541496480568666,10.863224782636117,8.721707253471351,8.493147308568007,6.75913967980175,7.692625831499862,14.89099914035043,7.997771763343508,4.897583011077925,9.591057262105997,11.230598085213627,13.185877562690525,12.112286566707375,2.117152238771083,0.6803054165332856,2.778378061147472,10.119958269118644,8.4936452591719,9.259900786901772,3.765104887188173,10.085122136215197,1.0192850085615823,7.5594758492924266,6.321094445985289,9.994847104123869,6.891579862016157,12.190773565032224,7.5720075384417065,11.464872596451135,5.974395918043322,0.9132227312192076,7.155643315359411,6.595716915262209,2.3782961179610727,2.799599872341465,7.1967192857784426,6.379494342740975,6.1765503089030656,0.7464020470039701,8.01293327148888,3.128604529887138,4.961240139071627,7.518367865522135,14.920558514681566,1.3078121157546407,4.2644537105073645,2.506212374770876,7.336755967772789,2.9724955802385455,14.676700019802606,4.779944868090375,8.762599899684332,10.67784343328573,10.731160743999325,2.183346309900016,10.885963110386683,9.44647393430936,11.977314492660833,11.730993731978312,3.5916287328200083,1.0073547306843222,6.258550092141409,3.73893887005306,3.6954895546358193,2.2074795322227905,12.359624605842418,11.650312695442322,0.5691211008469077,1.443908593675055,3.9993061815915665,10.267667529265639,9.055204588000063,1.8709856678581605,13.050014718628228,3.2494515873373397,10.641310540639813,11.230538149697276,10.630393557273832,6.066068772753747,9.550294318770765,12.279415494612596,9.307651881498256,1.8674883584461832,9.226359021944926,10.629069682482513,6.447964592114323,6.643102292826653,4.910220247302761,14.216298097366401,5.140765156401455,9.64691633722807,3.9268341749297884,9.793717275199556,5.6047189754062865,13.409694417960319,0.46471992432963294,6.0245325423874405,12.153244828313623,3.810805455336511,14.782555788848445,5.190028308042262,10.151085940814578,3.0513010641875207,1.3538831967808307,10.812999518210537,0.5897122793037768,14.145382580029944,12.748564485028828,0.5530318966659142,10.149320066525927,1.416497253434179,0.8770216560950073,10.837247473222304,6.218001022472551,6.4889029311021815,0.25481211200887977,8.346622095789106,6.015416205349988,10.888126934056373,2.7061458866298747,1.5538957097980843,5.163153075144428,2.5081459852664088,1.0617765927919698,9.68464755290105,4.846743995509333,5.628842592252883,12.363191698378932,8.834393016833557,1.9326135694215374,11.00153116199354,11.864713951985571,0.817925099204917,14.786914687133688,4.743043766016325,10.470379536289572,10.663687398131078,1.3306999092608618,5.767699906486479,11.628657944498975,6.165854569378975,11.75208698668521,3.650907065029468,9.430898111011107,1.1081572072007584,4.433748076865927,1.9602058566334468,10.042648420576931,0.8128974017257107,13.423869050178673,9.349930238322278,7.181996348717712,13.720717064052083,11.738922863337836,0.0002874776246886146,13.697268222837653,12.531695697893227,1.0386191051050775,0.09960557531974557,6.2160854374506656,12.797948306344807,1.2059655449139428,13.879471338181798,1.7506385438010585,3.92474489397058,0.5731627766843117,1.0023008410500611,9.61756272741163,0.781275636068467,8.487625064556761,3.972330925038101,11.463210930423854,8.7128471052289,12.395004693342155,11.935338126038616,10.447072507151605,12.935311428756219,6.6383047419469285,5.633591862013162,0.09500576342356126,13.866264931922831,3.5446219489915243,5.493237078547465,11.01770540464373,8.905405726479852,12.793554535638968,4.808284638397219,11.140642114822821,2.8724571442721105,8.487898669177854,3.7079378399043037,9.788321728882407,5.273888706650016,14.398441789704036,4.087177466387121,8.345755254099691,9.35921916877657,0.10354723399898402,4.740101739607643,3.0560543639224838,5.232917827398634,12.745318384247595,3.876191301646137,11.982328134783437,13.13071103716741,2.8613205768966097,8.02780287020534,12.66674573002695,11.64109960562263,8.286297600387996,12.559288086367813,9.748892314478056,2.4131402715839756,11.954914446583421,14.098492126492268,5.37286206256089,0.4344474675137444,2.5707006587919254,9.849382940195767,4.64210838134926,14.799486733346853,8.009848240211127,1.1657659334288994,1.391895956472603,3.786903616490016,0.25208130243857707,4.685415728562602,5.433125569484892,3.5012997002144566,11.63591371425442,3.3621158246210103,8.069395471155513,10.3641569764087,3.0359509258453556,13.950333594347338,11.7104214206568,11.550728393929258,6.443236995024835,11.336375194861523,8.406225956143743,0.7330983261258905,0.8842698778341529,0.33961445518461586,11.928597285078148,0.40682293089934984,6.592107104250346,14.282837990502069,10.181074113861795,13.74808003177614,3.989719515612488,13.783238465329477,4.292242533200773,4.096946443654313,1.1746503665936403,8.94794943701191,9.298827643033626,4.934650064045406,2.953856386319517,8.404661969533162,0.4484546304009762,1.668408599007838,1.9343374042575001,1.8840564424608308,6.8097325224118475,13.683211566878995,2.7933112898235835,0.15961698840851635,8.560433307807271,14.233630331480668,9.976144087201854,1.5766887873822033,7.240024089846166,14.413590159130615,12.285670879588398,14.757713829936034,9.868299586774448,10.910890957038824,10.72088542267769,3.5997694605988437,0.40602885047419157,1.4446802814028437,8.410736081503122,3.283459244261028,4.1663941790800205,4.399168081751679,2.04536683088421,11.873267520281486,14.271873898438137,3.1298990830995788,10.765794279110679,11.956930806076794,11.465349553549078,12.251888485442162,9.490779076534523,13.648092845998805,14.950600743783165,10.377220494217747,14.598774237346559,14.649481544578025,2.4887911806621976,8.466956218412628,9.892871946250759,3.0716266661536373,7.710731668733011,2.5290653840296287,13.739295013046029,2.498794402709202,4.341376249781402,1.0170443562922837,4.490764555008601,13.80228473697128,3.17996910793131,2.2318078534211097,11.823811133838213,11.15328635163561,3.8642431896146268,7.045748838173567,8.025626502755749,1.7021960861294194,5.803430935500354,13.429821276314692,9.19495106603611,9.151100098358157,11.975397288935573,4.990606324140964,6.60923621744738,10.173218441149997,14.13236123813523,12.684549373181106,3.858857758747315,3.7479012837549384,8.911304113485233,10.413008783138771,11.118727888127616,6.048833866971933,8.132061527002394,4.04072013335881,8.535065081138384,14.839908446248224,0.6022843285947688,14.85756205682257,1.3422837983465485,4.306083894167295,12.98843167827459,6.241142811268233,0.30278306576127734,5.542856933491006,11.407637943029531,13.011353154123631,4.875364345198574,14.998865450943624,9.242955904868248,9.044037860498996,14.24300701413959,9.458117491193146,6.754600036242895,12.038063682618862,6.816532610377387,3.6289415934679727,7.886945745628725,12.447483474389745,7.685009125563202,0.8574281902641012,8.200435283406675,14.237973230945867,4.865636696086025,4.039821907774021,7.620221054026647,0.37738696844355046,8.485816460891803,0.239305156993328,10.69115624521648,14.477908915444003,9.506003266445733,13.568207920421557,6.3431573953157745,5.908521565539346,7.5636638528322155,6.052602560975985,4.02429772522524,10.235347787850728,2.811744023555166,7.020031051093909,0.8310873753785675,12.477636516286013,2.575282196739436,12.524107838407197,8.205142748745097,4.383023445344306,2.149280089903167,0.7096659306233699,1.063302052665962,8.9720490696443,0.11380082083607856,3.2704158487872115,5.045918937242647,13.094035884437462,10.158699788833717,1.433881868156195,11.004150519430594,2.6979395961818686,3.4105561551732055,3.077287058786186,6.9790933793633725,9.243563129424023,1.7356629645710864,3.614541415933857,5.912465416040465,5.771684513192232,10.791160848986468,10.175449909480523,14.65681541900283,2.0903805772919237,7.114428108012113,13.06211449213441,1.8138518324587538,12.126360212714854,10.559139514606663,10.988461939999144,2.5061574837248246,6.831983853201862,11.319054103812697,9.250343664319177,12.272486796774338,8.445862876297024,5.070468556221243,2.2291611916166385,7.130505524895126,8.608783872077046,2.336866540506696,6.032760637214945,13.680935460676523,1.6696182739375964,11.844741733856344,3.6024122482184087,8.173096077258565,13.930476466429482,6.933293152474821,11.80963228217804,6.368435751986702,4.967043799743132,1.9185360950823915,8.293857852823486,8.09980038898143,4.711912262506191,0.16841289359995515,4.775196539896445,1.9968027744164285,5.055963300373145,11.884727221675348,0.693911105500985,3.6211704891790886,4.1833452277121,2.2872001996049485,7.526098473264117,10.068764811342964,13.809183384784433,9.214514223851195,8.147778418263623,8.142529537842185,11.749479157787055,4.316190347068904,13.127110603715346,13.67148388087963,3.3524439137684747,1.4620313698283338,2.860678936757066,13.891503278969898,10.27363242186293,0.04299776955131618,13.773516005381868,3.779596751520422,7.265600783946407,5.134560799704968,12.980489785946556,2.9871854029874303,13.122164279336769,5.507173809523714,5.584912959174567,4.591432886158053,14.124103524314641,6.602848683982806,5.88087458474072,9.944373326138534,2.18195657737963,8.50390024461525,5.06095272895601,6.919067153994942,8.59059276412216,12.107570583474681,8.197448603776383,11.187013859436922,8.589590348827379,2.128561744012145,11.700468834122406,6.335598024586872,6.504338332878227,10.437039682404146,11.48925469671765,3.211320969549635,9.326840265355157,7.775982828994,4.889298912389552,3.4100361459541406,10.189644189183676,8.413367416165539,2.4005243168938106,4.299176802549124,8.188344664536345,8.207628642342966,8.452058825149058,0.6759741686987675,5.429404762672671,3.8237922920787124,14.54917276082379,7.16362443192983,3.071488709660748,0.7942248766582072,6.752339855306586,13.08730409135573,2.848769706374287,5.71388526406997,10.037134059220424,14.60744182561182,0.9240318981837525,6.980283497577291,2.5647780280810184,1.222716609874952,5.970161354909665,11.270896454348204,10.192066651046082,14.169605364600908,7.116538292972539,13.077063019753862,5.029091508776032,3.6412422836795546,14.048281814007558,5.954824253076732,9.47573121151011,1.595929470423122,7.823790946748894,4.571851746495996,0.3257712152872927,9.575523931234445,12.716275783156103,14.73422003135307,9.079472485409333,8.889196195348472,7.748742745110039,9.300143796289554,13.248599424279682,11.59177014286066,5.495034406174134,5.763155008091793,1.0648093629511057,1.2185874033550725,1.7808291534155274,2.143358492901588,2.4523880573794363,10.741092597341797,5.421221919772004,9.923579264614832,3.963732776277623,3.164146412036936,10.76133216403713,6.365151284517799,6.814691151656006,0.6991136196487024,9.400480118648805,14.31298190858069,2.9036812528124853,8.897998360071796,8.7377167167825,13.852182508313755,11.807193005096723,14.464206651232665,10.00248903955628,11.972970004068841,9.091375622229735,8.381123808614314,7.771457366233706,7.760425934654092,3.9695495360673307,13.727625260352092,3.224305314315601,11.140040319078942,8.637529015224814,14.689365832283094,10.29132236681317,3.9681233076309685,9.071626069712712,2.742200041934125,7.148599044402978,5.733947244577874,11.421214534302191,1.844170830202091,5.50758098360763,2.4640430269031857,8.515773879899347,14.462227791907763,11.105939710997866,9.461248985055018,14.857984857157543,2.6661235079959966,8.241009328701473,5.449621701173951,5.166648841315233,1.8324646732421224,2.5895820958220153,11.258055945627799,10.177134991635159,9.427417451812888,13.732269566818827,12.215990148575205,0.7414014324707163,9.424242026414934,10.803182664563264,5.9411858881466975,12.388161612582477,0.2851266686326981,5.238044914700581,9.101325850436929,9.248220451362888,13.630977157206457,11.598028623049569,6.70935457462676,14.427840117022626,13.777590396883589,6.562181265847152,4.069884990908561,5.204073539943211,8.274766134737103,2.8233573053179883,1.9621338015250633,8.94384294792485,5.588509786823225,6.29174868951152,11.281989450293272,14.786626686481952,10.725710158038446,12.44014341327832,9.694636057260965,7.397834318818547,0.27753582691578016,10.305535134870373,11.621394972220255,2.6930683459218385,0.05449058618549274,5.201319157098809,10.233770991062908,4.379103009190338,13.331310805251134,13.869145864086057,0.6369100127335914,8.043702491158234,14.52394819596171,11.052834650759472,0.950071797820371,7.126313134206352,5.440020244369651,11.73674815158051,12.201285605225232,10.475158013426732,8.724972723344637,11.424655356292645,6.833673274711786],"p":[0.17695870261114452,0.027356007586457134,0.10794653959139505,0.13990983569401558,0.058720139779751615,0.07916480883313969,0.05408891304727806,0.1475541646320919,0.053284602227217676,0.016057366064307122,0.15442542509665153,0.006171372847059553,0.08839187352261205,0.07023025551143403,0.07230168052545581,0.12064777200184583,0.044079787991107594,0.06378211846030322,0.04233540994367435,0.15412499219552422,0.05108957501485248,0.06325254734755847,0.10519464084389347,0.1556585615667559,0.12291272165623052,0.1298972213176989,0.06866765953170609,0.09146985871514102,0.1038418897633203,0.048111804921634166,0.0350744507624924,0.11873760894631272,0.07122114244616272,0.026108058097916987,0.07218469858782908,0.01571044734496976,0.05357501296161318,0.11114667448948463,0.11653599184546987,0.09494794796147228,0.0269159542198413,0.1311023270089495,0.12982846617890384,0.04440003655418119,0.18254333616140409,0.030750056570650178,0.15061440712121785,0.16666004793331413,0.10952926202747669,0.197473302550913,0.15640758652068942,0.1518897263855613,0.03844435835095714,0.13026314749969278,0.16723215816259854,0.06572245399981154,0.19830686308293274,0.18974616623127594,0.1419639326197197,0.12417058845432649,0.062311161255249915,0.015271122626384326,0.16735539669013635,0.12685591034815236,0.18823248203461224,0.1889810910024044,0.19553010693014447,0.11452037193411245,0.03705064680549635,0.11280996968179724,0.03729132496683483,0.12889285157157088,0.16280529469428073,0.06849041148521451,0.17984158703068284,0.04042140624496371,0.042314038917538134,0.13916253908990184,0.11903245167981767,0.00021311058304562813,0.020501595734375357,0.08226584545105689,0.1591991464668201,0.06465064989348557,0.1604788890672423,0.13695628719725256,0.010196688900031649,0.10759897267167857,0.0990067490812066,0.19382748589616555,0.14018417065471112,0.027291813239669695,0.1371539412009983,0.008484402072842779,0.18797135680220892,0.14216892719356805,0.04574196783165277,0.1277287468241591,0.18776311993409622,0.19914112812945747,0.10658640590377973,0.19110725677993534,0.037795825482723804,0.09917115000275177,0.08442507161394999,0.06962092191028213,0.17085605483719704,0.07656704608663484,0.06723408416368888,0.1859969741587707,0.19522467007465982,0.04765444782252648,0.13649335596536227,0.1620386214208932,0.15353513423012666,0.1578724051635978,0.18983581418805656,0.10183170087344849,0.00791126244274838,0.11376492547732697,0.19055987857604226,0.07323101011055395,0.1712776655248264,0.06927469769222609,0.12124833497159099,0.022597490849114533,0.11688652690252908,0.03690844494758432,0.17064333886915076,0.05854663526683557,0.18060335977122352,0.15413207748483987,0.02874842156599642,0.08382585470877064,0.18173278748396565,0.05399866873751136,0.17305070367664627,0.13992117923703803,0.06716319858369989,0.15236182682049854,0.13452085932968116,0.10916355226872976,0.1314560730537409,0.14358085344058785,0.11759293505921953,0.04086064870550539,0.12623761531447278,0.11534533812584319,0.1306473466255953,0.1536488490855292,0.06745271579126699,0.11963047712687112,0.058146937998514094,0.18671790522283402,0.0013835970977156276,0.06340325366982494,0.0860706428663089,0.05616722816416067,0.19061071205021968,0.12121975740928087,0.07799944582181634,0.07939147853445672,0.1709970918238562,0.11003088890261808,0.17713884047882833,0.18553682473848113,0.10256189590925208,0.11912004013737346,0.0026821289667481097,0.08765321052685958,0.14369056982012413,0.14748819069524505,0.04443011236745225,0.055538928063407544,0.013895394997602617,0.16827215213490151,0.14216897432083148,0.10292806339408284,0.1761649681181543,0.018630169776871642,0.08448033643835658,0.05209438089441787,0.12594590225881688,0.19500219587984569,0.008204782225205154,0.03088472845401782,0.04350525854492422,0.026944523466431614,0.1838064850791409,0.17773244714368408,0.1201000708094354,0.0910495282653753,0.006974635722372069,0.025116241545361052,0.08762442140313703,0.02784548060047816,0.12546387050931482,0.1929461575378246,0.038704132084642184,0.03676741335357083,0.08121531317363964,0.019146457218910354,0.01540109481255394,0.1696223197660472,0.05284036348195107,0.07703747140144955,0.13304513489587141,0.17168822396996455,0.08717066825900757,0.032828222472896455,0.04632370296971509,0.0340889962124507,0.009358321175200458,0.19755570749887041,0.11469335750711603,0.18008078249603432,0.008329569404720117,0.09266302298784629,0.04532906577826506,0.16110458126233462,0.11063419952821581,0.09350146359420566,0.11708931002023149,0.09551109325687578,0.0977223807861285,0.16193676186767694,0.03698984923382045,0.03619219824980533,0.021772500888310155,0.02267974551917891,0.10360001252592972,0.06754204781907257,0.00011049088583936495,0.1107465204911379,0.08437050795718495,0.032658360849369884,0.09558113867576089,0.1781324341360552,0.12480090813481942,0.12115709117382378,0.14379814660494944,0.1386581279059588,0.09581679401318106,0.0612630786061938,0.021637188078516046,0.13284173025992962,0.0439646192990268,0.09029333912011227,0.1918678537961549,0.09304706191394724,0.033074241691364574,0.011506354868525071,0.19947769719545386,0.04437676192596616,0.11747219885425975,0.06407142421181833,0.11998304351747785,0.13019071728718604,0.1988755850376682,0.17689730405179996,0.1760085930975468,0.18014242824433127,0.05604145166707526,0.07554919540276908,0.0919570088050076,0.1372280656561436,0.18178866882918127,0.09866924985640631,0.13504272016979635,0.023790564573371056,0.1464049229857987,0.046231745495713295,0.19793321575821002,0.08709787709514782,0.05730713421624554,0.06072984267185891,0.07960337182712784,0.10873590055668539,0.1482662932169701,0.034465041941672596,0.1358260523005201,0.06904606486360217,0.04977811818049425,0.005990413203938606,0.0006673782907703707,0.15799936735660391,0.15948514465512809,0.09163415796395001,0.04038536021162425,0.0943477954131558,0.13305706858210528,0.00973677514489655,0.12452187897327929,0.03753147905727388,0.047827387185486896,0.12384343038878601,0.10048305186439942,0.06298586418737666,0.17136755698969464,0.11736168413963499,0.04213248433937489,0.08773601009024717,0.033825528472849566,0.10767933605566134,0.0014059091448498596,0.1037044049055091,0.006579674469057029,0.030296497670219226,0.1998542710932001,0.14023201382851683,0.035535862393937155,0.06862394999422952,0.1455663606284545,0.06492304795022662,0.04539196797995557,0.067913124207286,0.14094992653522417,0.04663234618236185,0.17494873887247062,0.02755988324757155,0.10617334398336312,0.04553847021341775,0.16123675012517094,0.13611345617369572,0.17053642583152775,0.0729912092225741,0.19662466886906846,0.0027736328917138844,0.17057423184805237,0.10930787171447354,0.09126587776005746,0.1854613474541581,0.11904767017874854,0.16074219844586446,0.1724217777662923,0.05639460514339319,0.07206598890475605,0.1472586230903891,0.1090945398265645,0.1861873305986429,0.029930765730530953,0.15095648543711612,0.03639490277300355,0.011693649031529897,0.1777649569385023,0.08372990253826651,0.08759374441672088,0.09184816915879371,0.1820017512034339,0.09210839768491011,0.15768806630145363,0.0285258203409597,0.061603105565054245,0.15710374418288328,0.1685903728560204,0.14992080151128354,0.14871004208137686,0.03723589465860444,0.09540303132153585,0.07983160904834037,0.07604953428217365,0.15795242103873194,0.043669455118846616,0.0558356696106888,0.12129250557409028,0.1788722083828864,0.04379872633277562,0.1917389191446758,0.1314118392398579,0.04783606738800819,0.15639717789804225,0.018096245531499112,0.1851022218998451,0.050292442724458035,0.03845641189950353,0.10143972257009502,0.12163443031319737,0.1112289144301109,0.1310661509771087,0.16090336393999194,0.11165388831082126,0.10653679521052598,0.0024410294356985497,0.02895879142446636,0.1371728545913021,0.08746025567315399,0.013974385046078909,0.044750396977591804,0.028120972159875815,0.025811169165237003,0.05995359908292297,0.11297406144917509,0.17956324670072893,0.10711455220294673,0.08310486448057658,0.09451148133308984,0.05462487553004869,0.08095392444827443,0.029410821542532786,0.08850798347856129,0.05803021575030396,0.09567490633693501,0.19477533800009827,0.09858484739832392,0.08787047279610749,0.18782548655282405,0.08864918956622372,0.12092816362920718,0.04936556382123114,0.09752418354763984,0.19323417662085493,0.14410515803609036,0.07016510015930977,0.056611211485637906,0.05643634987539259,0.029971971955249588,0.16943060158288198,0.037241586189373524,0.14499553526659512,0.15399438095145937,0.023969468783767447,0.07009734273695241,0.13971705002222254,0.12366739355045234,0.18656115272889934,0.15942954263123493,0.09695420558016608,0.01001819353858906,0.16068364777108043,0.04879787623017569,0.030225844374916957,0.07341734420316777,0.0695865116550535,0.09115730307980706,0.13413656995271594,0.09268624230118934,0.09735277995636218,0.1935890234222434,0.08493076383177525,0.06513364346266241,0.027576663213819998,0.13730017304538197,0.020066268711635485,0.023845852767012368,0.00184933888075558,0.06889247917600115,0.09548642745763872,0.15434798211675754,0.09802516346601156,0.10178783402022838,0.0411811372489701,0.17811481176876223,0.1064899552266807,0.06977638980540894,0.10527068138357382,0.1146324647882595,0.017550715298982757,0.06397628468844214,0.0062950058732782034,0.021785900780427216,0.05087787930953378,0.13553436461238574,0.017277297396922364,0.07502557946471439,0.03805822637626748,0.08275763617562451,0.10066207594296187,0.12721156965293198,0.15064096368008914,0.1466657733548374,0.13335905459336694,0.10101320066509852,0.05997315882664611,0.10366014801538359,0.050581897500516164,0.01881780738996386,0.015619598488659438,0.18118580091228306,0.18049890538969496,0.1730007741834983,0.1414524512435043,0.12345096187298964,0.13959994517144345,0.06258705145949754,0.09427292939793613,0.06832582651664941,0.021818782447580932,0.10487627191343862,0.04557724305593332,0.11204756624881435,0.10432811211323174,0.16568238243637842,0.015530209590729394,0.1961042029537985,0.03684289015347,0.09232709735359053,0.1929399051086816,0.007168006273844396,0.0764477163997738,0.03638230599243384,0.1768245104701603,0.010419820198997032,0.1774087631318705,0.19958634814818424,0.15624818189654885,0.020633545177630098,0.18642395569828835,0.11294935827154906,0.05079521431044576,0.08467858141141008,0.0654575279829123,0.1104639906736439,0.16321644616623654,0.0063225507604764974,0.09910697061588856,0.17674460723671556,0.1272660462920431,0.1475442390607305,0.13761976746005353,0.04442892021570129,0.11897833218653103,0.19358360986079037,0.17331286701582016,0.00786383443907237,0.17173868656077984,0.04977448137332483,0.17171851822868922,0.06473213151047967,0.029261598395979107,0.000983037984260049,0.040842089288036836,0.10325497321138087,0.10616701064053191,0.17953582364777987,0.04293078581044796,0.18945175452917418,0.0841721533520718,0.08054011773495762,0.001731457232074396,0.016304797176771402,0.055013274670258475,0.060305552115862505,0.15567577006504402,0.05796641325384014,0.16765164950727535,0.0802407064434556,0.19229652214662296,0.0052504307752205825,0.12532186319162864,0.1310091618182231,0.15456943091885297,0.07137048693775415,0.1294735211951854,0.06667601129278103,0.03235203808168468,0.0343764405617137,0.06899674222660272,0.003284892147228691,0.0791197695896952,0.19659018611306772,0.0028099193305449522,0.003763283405915363,0.1751826621476986,0.14156849016571793,0.1686178641909193,0.12507904636796435,0.054422737847220494,0.026328430902090805,0.1367495701514513,0.1458426610756574,0.032618137704093456,0.19761946969432512,0.18626131027088555,0.06328851060727195,0.14185004137635215,0.193920273492118,0.1159528180424676,0.03280397029108158,0.031932476378782895,0.1472894169131845,0.09804101008711591,0.10445575448617724,0.19416158526569385,0.03967362220853077,0.11062864117400945,0.08750181496915813,0.020251095275364107,0.16955171526743149,0.1861927411042085,0.012240566100996154,0.1033583699389034,0.12368230034525043,0.1680739671021652,0.03696685985878445,0.0244477709918304,0.09551030476356842,0.07422543011578782,0.052506645785801845,0.11682725978644584,0.1524102041209956,0.07166854497262491,0.19206598965876856,0.052862754484661205,0.022941954474900286,0.006765010182350962,0.033829313420420525,0.04017771773232157,0.10598896580107922,0.100546677589541,0.11963791199314247,0.17166537935295528,0.04246770966699618,0.056483982577099835,0.1757684141052346,0.0829502940138359,0.08691930646105184,0.1129005839586414,0.1962756913654373,0.1818177812435586,0.04377269227599241,0.1544623549755206,0.07440269118029037,0.021423365675324303,0.09306402539701808,0.11915640140566795,0.014397039017269587,0.1940689976227018,0.03736048840852995,0.01474933087948318,0.12408147228175972,0.18031248632894356,0.06870588233849664,0.10083134370506414,0.048565077369901566,0.15141883664366662,0.19483724716229434,0.11723743902580162,0.15049172073321126,0.19621515813436347,0.005351075135727479,0.13753276075898,0.10552205676909354,0.10478274419552741,0.007616402085209995,0.09852967350109698,0.19946170553233197,0.020465393904852247,0.0421731423231329,0.09496433209554378,0.03899512048687673,0.0015779967878010394,0.05604646922737216,0.19054314512812653,0.1446543697798064,0.18322506969489405,0.0718168281926296,0.025888925328134606,0.10186442498655818,0.07489527750670692,0.09035884069001501,0.16449235158929731,0.14154490766505284,0.13741053251323496,0.0836923741485888,0.08648745299605905,0.0834110787811727,0.010203412182036376,0.11493075341394975,0.08600804823438049,0.17933639813462532,0.11039218584504772,0.10009137379184443,0.13334800059724544,0.07684287782253651,0.0069680151417459875,0.06299630976385343,0.1294556742862855,0.02316261890283418,0.15424180986688138,0.13391302574633576,0.1650166841949623,0.05456416098367232,0.1857359136979521,0.18687481376764403,0.19266989827749526,0.07439026181429154,0.02561126823751545,0.1970107467421266,0.18874492604943352,0.15885356420120897,0.05924866311907145,0.13867960486008343,0.021055721671428974,0.17409052422650972,0.09333734943858385,0.18774752570191766,0.12505013887257813,0.05141279715864129,0.10720551708726328,0.13310142195067468,0.17016352133983326,0.09683000555306967,0.10414664137133532,0.07153683842854566,0.15229222169793513,0.04728260260680894,0.04763886222847091,0.12363789065511073,0.17520335061996561,0.19503980125035558,0.08520972940864797,0.06929225189293779,0.03826462957111048,0.028942025201824918,0.1329064053780644,0.034993195202078824,0.17715689569029336,0.002153908195140275,0.15725408309805103,0.14629171350676248,0.06189053486953462,0.08297240508447522,0.016465269712008592,0.12337171789346701,0.12297025396537076,0.039589967037412736,0.04081458653946779,0.1205685267021607,0.010617650873452657,0.14903210518393237,0.046467762146154404,0.07713164843167007,0.045706242758762984,0.01843610051723359,0.19206943552613778,0.0700919706147797,0.0046307040731472515,0.012249323664342749,0.027797393920667136,0.023545688116813193,0.0954690530696417,0.0008410906367541494,0.12253880931190433,0.11549644959375525,0.04403564859698044,0.031141117723117298,0.14682616735566373,0.11353399913978493,0.10336410178707611,0.020726882323081466,0.17931528289918722,0.02741394816212486,0.19642940885885235,0.0048041976601034715,0.0021632837978911024,0.019719216459938238,0.026764420495000607,0.07056432768500942,0.10389929014443876,0.1985554096650214,0.09220306190561806,0.004897783359645836,0.10333220981884438,0.009453448492484019,0.06512895775773746,0.19703196429051084,0.09820506572525733,0.06071034729746954,0.18003249317108147,0.12781759934581624,0.07301880333533682,0.13232846295033457,0.04556989658317576,0.01567197179129449,0.13543440956485728,0.08937295677622831,0.0983564367464937,0.016376787667157843,0.08151572468302196,0.11306917641964005,0.05561465295942192,0.03256063100110427,0.05164401502664698,0.18517165601095065,0.11905908917756852,0.030602943858893242,0.1011874610792245,0.13291222482891776,0.17641270659395847,0.1231833590705497,0.031748380951765263,0.19290953478856132,0.1020180763533384,0.1940230120424331,0.19562955616671973,0.08397323411959867,0.04782962152325809,0.0849739350815399,0.1296580260201626,0.013862107066966134,0.16671600278250207,0.07771383905325197,0.19463440730926604,0.08674862694938851,0.04149478259136,0.0727403073334517,0.046975316303705265,0.03724223293989124,0.1520641093516507,0.11303966403127377,0.1898284521487876,0.15760795471853412,0.08204152039525088,0.02246945819035715,0.048642044182997425,0.11027045438975498,0.19568013837209286,0.08864600512802184,0.09943751136200141,0.19566039009206093,0.053089753579603105,0.053357742742579276,0.1382258159181242,0.14990395729198136,0.06209758457872279,0.0007798323248836781,0.09165098230005433,0.1273123635228115,0.0777191627434572,0.12635631534113562,0.04202692721921078,0.0408823550097825,0.18430683132936512,0.12982570679069147,0.17045037383422265,0.030384438118531733,0.022541920832907982,0.06387857448051869,0.1435607627927248,0.17405776188826044,0.13191507949670492,0.13165014006193151,0.008535233420910027,0.07473630423158406,0.1811833556025463,0.10260425656038219,0.0352441440700499,0.045987804573137,0.17730716568862298,0.023274921641709058,0.02678111750526231,0.19831852308739162,0.13709826489117546,0.04535571259391853,0.16076621941788388,0.01780964183065539,0.002429074126213493,0.08269027979993711,0.11710717663505169,0.15174487628397132,0.005154965279165192,0.184302358374467,0.04006336958959507,0.14633368674812394,0.19826552770932243,0.13780522758304267,0.1476496532047679,0.07909250555374281,0.17313796464558823,0.1491879406831694,0.028926264646806255,0.024526267678478854,0.13765367425423305,0.035527304469723124,0.19137146715546416,0.028839052780114297,0.01079390949874335,0.09723657952473644,0.06838406527347378,0.1418432169677733,0.0777485560572529,0.09928650033996803,0.026232917616077336,0.04376178468000713,0.1262964378665922,0.17804487806429195,0.19415163978430683,0.15592437867730605,0.028167156304563304,0.03085606587205967,0.11948938712346152,0.012311995923461883,0.10168656001095809,0.053801713830004386,0.03571212064261622,0.02606278781459448,0.11038048933042349,0.17183532874316929,0.043985389837360424,0.08005640258037948,0.19055846363402132,0.005009437056557831,0.06826836736006868,0.01380381545443754,0.17112622491212193,0.09405577957804719,0.06252946096939241,0.11418989402163598,0.18193554834334547,0.16112907353878608,0.032489476448477286,0.09067989990197134,0.10064627868673132,0.07060471285872319,0.056875980427638376,0.19613905209338786,0.027357760180056135,0.09385636270074427,0.14986882984928604,0.0029095673122894183,0.14324297084634785,0.060864712374534106,0.1990170051856095,0.15121130157365048,0.008252185729509521,0.1729777408428301,0.0644643949035976,0.11129352185093366,0.16677781319340315,0.08746937362314898,0.14983651881907264,0.014597837191222452,0.15831553335547685,0.13286348926127275,0.06723642192872355,0.1008639811629625,0.058098366966410624,0.00926609990311147,0.13680240878998995,0.03788401589288464,0.004996055939867183,0.12519678511262908,0.0428164252311158,0.022538763446126264,0.046787761218080925,0.08384324545776366,0.17965808741488024,0.019674625939657277,0.05207563689967301,0.06408305285028093,0.09626800061415995,0.08008963303067547,0.04176099679894785,0.14277642178904934,0.1095302504032369,0.16032119753016805,0.10730710288330805,0.10929310381565918,0.1667844374196359,0.037537686305848306,0.006246113197696435,0.13087555140263502,0.12156388614386603,0.14970827446727647,0.0650641075006841,0.04475224827781213,0.09335993407348586,0.09663382892310302,0.12717123874163289,0.13942195087786083,0.005785433089468217,0.15780190028608684,0.06314963435009883,0.05436348916365441,0.044598593486531085,0.058771023475690146,0.1323019671738821,0.0006985915079268601,0.10267187340707934,0.10384637505058913,0.0234775610731925,0.0027001389306834157,0.10771961705231986,0.17161377701472166,0.03606195040018574,0.15017991855231508,0.007056408460820807,0.07630171869898571,0.15003007822048092,0.1671522642862705,0.07902759783410902,0.0739187858870431,0.11727511224572501,0.018956115531893983,0.08994554878042478,0.10538538077023932,0.043938993498163686,0.18624838051738252,0.12956482854033724,0.044796971335576474],"n":[18,28,33,34,3,10,31,2,9,25,18,9,5,20,37,25,7,2,21,16,25,23,30,18,15,15,22,35,15,37,22,5,30,20,8,8,17,9,9,24,35,0,39,15,33,1,34,39,35,35,37,16,26,32,10,29,7,26,24,2,14,33,37,3,14,39,22,7,7,39,34,21,4,16,14,23,7,8,15,36,11,36,31,7,23,10,13,30,30,22,0,13,35,34,18,12,35,26,31,28,38,3,35,38,21,10,27,5,17,28,22,20,38,10,21,19,38,11,19,36,2,24,9,34,5,8,4,14,38,17,36,29,10,26,37,16,29,23,24,14,0,0,37,7,15,29,14,12,33,27,38,27,34,36,3,22,13,22,32,23,12,39,33,34,14,3,26,38,25,18,11,24,14,38,34,39,20,32,28,26,13,7,33,29,7,37,7,5,35,8,5,28,7,20,2,4,5,21,7,22,12,17,30,10,24,7,6,37,15,3,13,38,11,19,16,21,11,2,15,14,23,19,8,17,20,31,1,25,26,28,24,36,38,19,18,25,5,6,24,28,33,8,31,25,38,1,32,11,35,18,31,15,23,28,19,20,27,13,32,15,28,32,25,7,30,35,15,36,15,4,4,19,4,21,23,20,1,21,14,15,5,10,5,23,2,37,35,19,8,22,22,15,3,9,36,8,3,6,24,30,19,21,13,27,28,11,31,11,5,6,18,39,38,39,14,36,38,1,11,39,16,24,10,36,35,33,39,30,16,7,33,10,14,35,21,1,29,21,1,3,28,30,25,12,12,29,13,36,40,21,31,40,18,39,17,9,20,26,39,37,29,7,7,17,19,22,35,7,8,26,15,15,29,0,2,10,21,11,6,33,36,36,31,15,12,19,18,15,32,5,5,29,15,14,19,8,37,1,15,15,17,40,36,10,37,40,27,6,20,36,22,10,33,19,2,26,28,10,1,8,15,13,24,35,32,3,22,1,10,32,26,18,19,1,14,32,22,19,13,0,31,4,8,23,20,26,38,15,27,36,5,17,7,27,28,9,24,37,21,35,18,26,5,1,13,12,31,12,30,25,4,16,30,12,37,21,1,1,22,6,20,9,22,5,31,1,7,18,23,33,7,4,35,39,26,39,35,4,2,3,34,40,36,29,25,0,22,21,34,22,24,13,27,18,7,17,16,8,4,13,19,6,24,21,35,20,2,35,39,27,37,11,21,22,35,25,26,36,25,30,4,19,1,23,34,39,38,9,29,17,10,14,15,6,23,37,26,5,29,13,17,10,33,11,13,32,1,7,13,18,36,29,36,39,15,28,24,18,2,24,26,16,2,16,28,33,27,17,29,20,36,39,13,16,12,30,2,30,7,35,8,38,5,27,29,34,4,37,18,13,23,8,27,31,12,31,1,5,13,34,15,5,40,2,7,27,2,38,38,32,21,14,13,11,19,8,22,12,22,16,32,19,22,30,38,9,10,33,18,30,22,39,26,9,0,35,35,9,28,12,17,25,34,39,30,2,40,29,5,33,13,20,6,5,11,0,11,30,6,33,17,10,1,20,0,34,23,2,8,19,23,39,12,36,39,8,7,25,11,10,4,23,10,26,29,29,13,29,7,8,24,21,17,11,34,28,23,39,34,18,15,1,3,2,17,12,39,35,13,19,20,16,13,13,31,28,12,2,18,38,31,0,5,26,33,17,10,33,37,1,25,35,14,29,29,3,33,20,29,32,4,15,7,10,34,11,16,20,15,21,32,7,10,30,3,18,19,5,38,9,35,26,12,0,15,10,36,12,13,39,21,29,16,7,17,22,18,25,7,31,7,35,29,33,7,4,21,20,35,35,18,11,8,40,4,26,29,11,24,35,22,14,9,15,27,39,34,4,14,40,26,13,6,8,31,22,20,20,13,18,36,17,27,14,33,12,3,14,14,16,12,32,18,3,31,22,32,30,27,20,32,25,23,25,1,5,36,9,25,21,21,35,37,22,15,2,19,40,30,2,3,25,15,38,29,27,13,36,7,10,29,13,38,34,11,5,7,9,35,19,25,6,40,7,22,16,26,16,32,8,34,24,25,31,16,19,26,40,5,27,15,22,35,16,17,30,2,27,22,20,7,29,14,9,17,37,21,4,3,2,15,2,36,13,7,7,31,31,33,34,25,15,27,35,22,3,33,16,22,9,15,20,6,38,12,9,1,7,39,26,2,22,19,1,2,15,37,12,34,32,9,28,13,3,2,9,1,31,2,6,20,33,20,10,15,28,27,23,20,1]}
},{}],126:[function(require,module,exports){
module.exports={"expected":[242.73529462463853,7.5584206842119355e84,2.1490463398728594e8,1.3137619835823269e57,150110.6140610083,9.65885557048234e8,1.189390571474601e24,1.359929189309586e51,5.149754232435507e38,7.358291487009282e20,9.841995769711158e7,2.1320718199731494e14,269.10750163223236,8.417201822500443e24,465.81166285944727,1.727063861252657e9,6.398385640269952e112,1.2875432893552254e57,9.405795992497582e6,2.4398965926243186e47,1.7520009147462142e8,3.763420986469496e14,9.878022060277359e30,4.237602075461847e12,5.592079328292729e30,7.239469104961139e54,1.8029341510778482e21,4.521195821711301e36,25.08015140156222,3.197931132149842e19,1.952639020027331e6,7.200803951227669e12,1.4905853087665544e14,4.366048403609672e78,1.9820064855960697e29,372.0709207988112,5.195844505640421e38,9.46296519478052e80,313979.5316242795,1.5366367658853205e50,1.7444176763306606e8,9.246089414999358e16,4.610157165836451e13,280610.2755967947,3.5427848871268206e34,1.4118349181005778e48,1.4548691127030269,2.9512729196156634e58,1.0,1.8708336647819166e103,5.399801933381786e15,1.9098616264123354e42,4.156690145001271e25,8.490337776892174e10,2.202697087400939e17,1.9192402999393935e26,7.623996832337836e109,1060.408980656093,4.670648333312384e68,1.6810921893136318e28,2.0201630204905616e6,143.34265571006344,77547.18267963878,36002.72240215618,5.2278827308637336e36,4.0922959473511033e9,3.6802862530366986e67,4.5925784120418665e44,1.0740324027804176e52,2.4203992081031687e56,2.5958138956047976e8,3.083622934860841e79,4.138346997416345e70,6.385205340214996e6,1.6958337171037094e38,1.49556905625253e29,6.156943918898125e36,18.75533556052974,6.240491985087608e16,1.5458577547405297e60,7.087280533642284e27,1.3312568517816296e65,13263.543053047631,335.8794602560123,1.2888941046310174e16,2.4366802077610445e86,5.819092153663415e26,7.946349835538062e24,2.034874736918133e18,3.4536740347147117e13,1.3444321442501185e27,6.469291082250375e44,2.6012317629373025e21,1.7970688020108153e43,5.376892143306263e26,1.4523216130074144,1.678006605586578e30,1.5410407897332582e33,1.3901928704845774e49,1.1888676574438152e13,2.0932557245918082e33,1.5044157530544637e26,1.9626184139510117e7,7.018031912019008e7,1.6328224817925362e15,2.1751086880630948e36,1.928853930779666e6,2.354431827474868e11,1.6710369775279485e121,5.6817757642090316e19,1.0,8.466923860241798e102,2.4147697064550973e13,4.7736434681040546e61,1.0050804526270388e8,2.6262308325255076e20,5.149761216887959e24,6.502925561758046e28,3.2505078351168842e53,5.1608655281111205e23,7.757135211740511e92,1.860637876775964e10,2.3607280146027002e24,9.156240828245743e33,4.854666149313837e29,2.685918111278428e92,4.070143934104684e7,7.20268498170471e38,1.5983798060029426e59,3.6910048945803135e26,3.5649946656849055e13,1.1604746757531587e51,3.305725009421849e11,1.0,7.047498588151918e12,1.2704167949719998e53,1.6877687717757305e68,3.2218880333870845e53,8.567876769105233e63,1.1906009473833493e33,6.81918811608302e68,1.0,1.5003792541135792,1.4681270805075682e15,14.8685334214048,3.447100898831267e91,6.982892573445173e16,6.348330030595105e106,654.5096252245755,1.2539926922391854e16,5.0143781741135095e65,2.4173633478627723,6.009876969905627e8,3.9910522618912557e70,3.957471984450869e10,5.259687637466736e8,1.2854964857049301e27,4.270131687955202e48,256.2975069289075,3.918846639115851e92,3.0195271377223367e6,5.167851743464254e54,5.558182480910912e77,353491.5935381479,1.2675402331277414e42,8.245766324969117e28,1.4118108825898411e22,1.074364319759709e7,26.947090265402288,9.527434362549938e15,4.810078048591747e12,4703.9433932458505,1.415462573247148e25,3.150463043673503e39,1.9822930241817706e9,1.4787968127694275e78,1.5931452421635075e17,3.3578648961020665e9,1.6665280954063212e64,2.8125786690682325e55,3.388680788439274e117,4.5594007764220255,1.5705478807169322e38,4.513072486955512e73,35.13407999804759,1.0930468570084142e59,3.202255376965806e92,4.1646721708268736e17,2.1226604541522972e52,6627.486479014574,1.2439225160120114e72,2.19259042544405e24,1770.7622273537177,1.8098308804798362e83,123.02256298870307,2.765429762711395e13,9.98622418608231e87,12403.7860602265,2.4315240870684116e26,6.879330485226733e21,1.0547273021293872e92,2.161520250838083e34,24.98121461998032,1.4473748700039163e31,1.0950878392029441e33,8.98830430990271e68,1.3026624769431236,6.814968027760285e8,4.6562636542345304e16,6.788154040249853e24,8.030739147203345e33,2.3735506546609424e34,1.9001354183716532e6,5.300155009066885e23,113.95904471767393,1368.7591436265823,1.1122503087019491e17,8.590331071542237e36,1.0927799644608853e9,5.1247498722036865e48,3.352878650223147e71,3.9283435938601767e58,10610.699055384714,1.0930716411600405e30,1.3800852323623022e89,1.3173603174425078e14,3.3840528492542164e50,1.0937042323541145e10,5.340567387245029e7,1.0109336094434977e7,836.1885555085862,7.346652888315144e12,912.3674692951543,9.817880659344137,8.324412695712953e56,5.226629432149125e65,1.8059542648076413e20,3.405106508985788e61,5.573461173461951e77,4.271834394452417e73,1.7298171498950123e26,6.954102961315867e15,1.1516741511851193e43,1714.8636542515646,8.999751586902631e95,8.983669730341549e9,2.7732367803269452e6,2.7981108923221786e59,1.4376900353661485e7,3.8194267878708527e28,6.425967660175409e30,6.020975243752565e24,4.040051187514915,5.288396840265951e10,1.0,108.50053969581782,1.2504018061256227e19,1.5503839347544304e44,1.5578983600248021e25,1.424865952835663e28,12101.589304066323,1.6482638339157034e87,1.774406498104956,2.967279693052356e6,3.9692996704552014e46,7.883795023727836e51,152516.50635818022,46879.25157947739,2.5988764738875104e17,4.4309183624199207e24,1.7046217268159818e89,4.352500067008412e45,1.6133881179310016e82,2.129009140480855e44,1.09118453581338e6,9.860328084831705e12,3.3897986967442355e15,2.772555297568403e23,4.724815390273374e25,5.52098545684069e46,9.807688573292403e86,3.8879250206825035e40,3.0076073140423915e100,11.36061197356804,2.373439271095156e57,8.672921871919109e56,3.6303581455681704e67,9.048059732607104e7,1.5585596358919136e31,2.1153580876224616e74,1.0165223448954985e24,9.073834138723216e75,1.2066765677913365e17,1.1713095127355441e19,1.0440194264139674e74,3.5430659424466926e21,4.728420296956271e49,7.66611723680785e81,3.0645850814652314e34,8988.218522696381,1780.7944242964327,1.9518752871607963e7,193.30847987508113,3.0540555089260027e22,1.0310763891634502,1.66603542224448e25,1.0,1.6436353268097574e18,1.9269834354198833e30,1.5658285722061996e11,1.4130234793141736,5.821241056416659e67,5.265906065925328e10,4.4058704412497144e54,1.1106657242318e81,2.7348259677104065e27,1.9362953728847062e14,3.1657569592360602e94,1.7472855365153482e37,9.750945533801402e77,4.0619404686103214e45,3.4974832114339114e81,4.39184812073468e64,3.5647905586778445e9,2.1697918497462807e62,5436.739852656548,2.5011266073466913e73,8.536177874270882e21,2.980561415070571e53,537013.3201317681,8.472737907453327,1.3841009836145023e31,195037.66136875964,7.715685049887505e7,2.6111192582564074e28,6.93255428563096e88,6.159822641225147e41,1.044169067692255e102,7.807322590164355e35,6.830514907736678e24,1.0,9.916510639968726e41,2.714534523311611,1.6185824849097315e7,1.9312904897587302e12,9.60681753541098e63,2.137374884820711e30,5.888346690239485e7,4.505142206581416e29,7.411786523613523e33,1.0,1.2717697481869799e66,5.642286223294773e96,3.9899046322796e18,1.1756761759556995e12,36277.13429477485,3.902520660485006e39,4.745562780179437e32,5.134283388084557e31,1.5323783618320837e60,154316.8596168393,22968.991576074077,4.3168260481509245e52,1.0,2236.662988379688,5.661038313782254e19,8.048922961216054e30,1.0530183770636214e27,1.2934935901148828e59,1.4537005900208297e82,1.9210565990902957e21,1.4647213108514715e87,35581.24317069306,8.4254036793122e39,3.147507839059835e84,2.2474510885394382e15,1.2417506502223866e43,2.148171230164537e16,1.0244630606240255e86,6.0734341817023e33,3.8172831530980086e8,5.249696713771611e10,4.7895633954855894e54,1.5236767252180402e35,3.2383794148339258e32,2.0600706046662324e44,1.4173533740208211e45,7.321257429074412e50,1.0881144917245709e12,1.732997614379406e28,11.470117317975504,7417.7005952126365,3.981757941858096e6,11034.426046075414,525.0306285109763,16080.097042452051,1.4475320752100142e96,3.267909299462474e91,1.016306298954397e11,2.95426739024055e52,2.957275958741187e36,2.154123141660632e112,1.0,5.1425012477209115e8,1.900147060462752e10,1.8178828976456384e56,8.48859941192185e66,4.0797182421078234e50,5.665070621059263e64,2.0432685709026626e32,1.7011723261839868e25,8.782631115810369e29,8.017893034233197e15,16.689841286058044,3.284990255262983e66,2.243936187777347e21,1.2886812937854787e35,40.75185635163021,432.38734779320606,2.2462348898074213e11,6.858766153090806e7,2.245674850836852e16,2.6488017813427594e11,2.937796097089e7,6.219775948204598e83,1.1115837302604077e39,5.733853179862513e35,4.1439993310818104e48,3.0229399525509297e38,6.445026345849634e55,1.9521921006361658e24,1.2795248460838182e8,1.513820437321513e79,1.7775618991645724e6,2.980624343386614e16,731981.7861262893,6.630612037254508e71,7.760869914773405e9,1.460296427131763e28,5.716568629577447e20,2.341349032800358e31,29.811867267646623,4.416100561819873e68,1.4663754308190569e22,10608.831773374875,4.4870968317249943e67,3.7952558050422297e9,4.446786584912847e25,9.116854619069392e36,5.194972344968603e23,1.9487813164660416e29,6.195646679321474e43,1.6037568046446037e9,5.702333445013392e14,8.507182536320339e19,1.6567472427213018e9,8.372520806267833e33,3.508794644661414e14,12.66444356084275,1.1857852048615068e12,2.0217888868435714e37,3.604646243222321e41,1.212951669210756e13,6.991266979602653e12,1.682184532435923e19,4.575811249041133e9,1.0151998605350904e121,7.917818279401833e77,1.4387230875329397e56,3.4899135336922437e43,2.286067345149502e70,12118.1978764029,3.429293698517181e66,1.5125749521603315e15,4.0737056791247485e11,1.8174598124747246e10,3.492438934351564e71,7.182075318879401e53,9.078856010578268e38,2.4439268112069e21,2.888105115059399e19,1.5429063390393006e41,6.0834424998118095e6,2.827416866197169e98,8.955248356922649e10,1.5621911807161218e20,6.719276878816063e119,1.0358223123569258e46,8.239927996480874e28,8.387562768287196e31,5.728238256308632e43,6.280315458561582e13,2.002832144695845,4.159863072400822e102,2.0621486848595476e21,4.159292174111399e69,8.90825202291372e41,1.6381870768400645e71,1.1180075728718136e35,3.485941755559691e95,9.822573353734495e7,1.3562672099202655,183497.35087306506,3.310123313009102e31,2.205181948725799e14,1.8926296256490466e12,1.0,1.1058781692603967e51,4.2873809947130945e21,1.375907517717792e26,3.0804838287533635e15,1.917596298788593e24,1.4485825108533437e53,6.973265627332679e8,2.289129866766333,5.698428018397887,1.5239141481405685e78,7.408239652083678,1.2958978873506727e22,1.1339346810778747e9,6.729748916647785e93,289803.02845837845,1.4854965842748677e7,3.111853439691146e89,1.0138105646319697e84,1.7722573170483124e16,1.67041243468559e65,1.3971438337107344e31,3.346455078532226e23,1.8855892937657355,3.134437598446305e79,1.0,86026.30340606169,2.2874917284275023e108,7.021347921370274e96,3.637731514338342e14,1.821481820606651e38,1.478902249934448e29,9.562034742212848e35,27893.07560774161,8.115957333430764e29,1.7534278833812762e116,4.835787838672243e40,2.422244298242044e31,11.810365941716748,2.6300189789015427e105,1.2912410421172424e125,1.0136911713186026e11,3.063110551675129e20,1.2832847406845129e87,2.913198039153005e41,2.4135604881227785e6,5.491671100805835e6,1.1359338087659349e61,4.433602394020605e61,3.754691440392038e48,1.371807938942104e58,7.271652890999536e64,3.347506457638521e44,183670.79390508987,3.11328157209741e33,1.7812949083327165e105,3.264982648595055e113,40.73828123493783,1.2921700255342016e18,9.452720199302035e56,2.2390285179648182e17,1.2913136387651957e68,1.454673483352262,5.2215953508092276e48,8.4881051590790615e9,275645.4648442706,6.542214162618896e8,3.0160824716254094e41,1.0402429399870702e19,1.526892858818587e13,1.3016077606580602e20,5.61413964123683e27,1.1157369383651981e50,4.118196839901931e77,3195.3379878083897,338.38915075721934,7.718672459524246e84,2.9008655715610843e91,6.778437243604318e71,4.856193132246323e17,1.9864057561608939e108,1.4957596597357856,2.912728638559895e56,7.637925519264757e64,44200.68500267938,4.614544563607154e39,1.1676743637683908e15,1.6301441070870405e29,461533.8046588975,1.2700963828869528e52,9.228390552312269e31,5.5935494020069395e34,2.3672390315217604e48,1.7195568950730713e10,6.0856157041225,5.02283090202031e44,5.693321618624686e9,4.582313223292529e27,4.873287055444209,2.890912801612214e38,3.958825415296878e8,1.5244230108169403e7,5.994819544935644e28,4.435827743326114e40,7.0813892255224795,1.2574780982254763,6.802497832740078e14,1.8752566409417112e76,1.2585833983619056e16,2.1461398310390894e113,3.3332953379984374,1.0375016217602746e6,9.219266279097463e56,6.365955371232265e14,4.383168942291888e34,1.3495317433055062e87,3.0264937505308593e21,353.3188406676842,5.436306288576833e84,8.476120021848894e8,6.670270627447464e18,1.3666728616938074e66,1403.7464652719987,2.1875055082813662e32,5.522438726491786e18,3.3457226669954397e23,7.486627852187187e34,5.274060544011742e54,7.178155778981013e24,4.555304533066426e13,1.9228076720331784e63,1.0,8.040298954358708e55,1.1338817035719852e15,1.753322340862092e66,1.9576645970818887e41,2.5480659559151166e108,1.4380524150078154e25,2.8565744788592456e27,1.4260548143397522e10,1213.7432913887853,1.809462228791118,5.6891836823684e41,2.1250555521769458e37,5.0003397810038625e63,1.8928659500341746e42,4.199358395840771e37,4.5334473163377316e18,4.903951546251665e20,3.978225112883097e19,6.2455757246407945e34,6.82255559432344e19,2.2970681630699645e92,3.2245465810193945e31,134099.79750823032,449.1416485692019,36336.08746590533,6.823997046258892e90,7.144634255886247e9,1.8550572433057485e12,103819.25543191368,3.9190030441751823e30,2.1312752799613053e17,1.8001218240161467e43,9.549525419661198e14,2.1261012420454415e25,4.460431171369501e53,5.808976183818798e40,1.383756065795819e72,5.6801724992451836e32,13850.575914368726,8.651965091891254,1.333277309632788e14,2.263648697727394e7,5.46784202643135e18,2.990789093112662e30,4.571063359763869e53,3.3471548234680004e25,3.089615229692468e74,1.0863041280685042e68,1.374632865957456e32,1.6189044216412323e36,2.987226389865242e54,11.177622288313668,61799.10539155741,17.182890003921848,3.940212823007127e20,602338.3975074928,1225.6471218556455,1.7959645879755806e55,1.0,2.6198257672867224e40,7.321544850752991e20,1.0,2.740207058673585e12,1.0096144157733347e10,4.5465839193075835e50,3.781784007705671e21,1.726324983910727e55,2.5523341005753372e7,833834.7040425604,1.7508235658142786e25,56142.55313818354,2.7936242846026614e27,2.2737397403549324e58,5.236670876096605e62,3.960008139000069e25,5.6105906535145043e17,101695.97079392629,4.462927112393253e14,6.389810624330087e11,5.1384038430178596e47,4.681214998757664e35,128.85148585956892,6.394730169730087e29,8.9171133129083e30,1.6454781880631098e10,1.1836972167707568e16,4.047840745344974e66,3.161554419688972e9,1.9110368995947345e35,5.0720716246501936e64,2.458172935339915e40,1.5857191179699824e16,1.9653920659929394e23,465.0479939825927,1.0414875341987168e50,116880.25354991195,1.6046851418912653e71,2.2369375582246008e11,190744.8390390762,5.5322180857888945e99,8.48495294337188,2.3023131819045825e24,9.523457554760821e31,4.1042013168849254e45,8.196942229713853e11,1.9546269612581553e23,5.505687619834454e7,138.06111914413364,2.4746159634359883e96,23.323561938118804,3.2140259670882984e16,6.802920107546771e29,5.821467407432572,2.9089167846156133e51,8.604318160517564e20,6.770686236146265e37,6.875401472618744e17,1.4121980727089752e40,1.0,1.1862201244364781e9,2.522554664196282e94,2.4060339477787358e85,1.0,2.3030872514212975e92,1.1050594561892022e14,5.251345221835376e59,5.810006119446343e76,5.252805124962814e50,4.473808483603643e36,1.0,1.0497426765248672e36,1688.2558008944252,7.468184866625849e68,1.7072863012117443e29,3.5348670043531574e30,6.06276003318393e23,4818.420848896373,9.596528842120578e44,4.620699752716017e9,1.6296596589233732e8,42873.521429711975,4.152639226989089e46,4.446984899676496e35,1.5852816700805701e13,3.502164109642647e101,1.7549441927969154e10,195.94240934390797,1.0,1.0,4.963941382388591e9,13.825696028034566,1.5769350307285837e50,2.7510104444240855e19,2.751077466385688e10,1.0,8.890643000486238e82,7.396721703506452e60,5.168679762970698e10,1.7947779376566875e80,1.4681310713463626e19,9.879881865999252e19,1269.5814377100553,269.59298484102146,1.5753477339802864e6,5.313583548124525e18,2.493045910048622e12,1.0,1.3608036689078595e17,2.2010703552999728e14,21.487825187345795,1.2273622461525422e7,5.382879962971793e67,6.508161683982853e20,4.2909379849626366e41,1.1938828230686072e41,8.747374864200891e25,5.4753555036958984e45,8812.449227734798,3.1308863238828054e39,12.561999668060022,1.0257179502974e49,3.135245094911156e64,632.3222345083985,3.1564018261787597e7,1.3347858548248489e52,3.241107086385195e27,1.5410285138254203e14,4.39084632481448e14,4.768523732497765e94,2.9913678434781023e29,2.0493443631756225e51,1.4005310300135298e6,1.282089681939621e35,2.0347358819819593e21,4.690823734795911e11,29.58841174809987,3.5904204647503494e14,1.2361716035764585e80,9.105771066227847e11,1.0,1.0204095486586958e46,9.575269209470611e78,1.0,488.22753688417873,8.646671475701947e52,2.9419428423516285e70,6.897451047602872e13,1.80372774775919e73,3.8088718963470254e65,1.973232782882611e18,130.2161884993463,5.566693678498548e32,2.6841984948417905e43,1.4469338211696486e70,459.49605125851787,8.5019302917251,212.25647858700717,16121.03152344587,2.756265685145726e6,7.708109550736065e46,2.7968647160985238e14,1.1077147466745038e7,8.316107252137563e62,621.9999505589763,6.104484868747239e8,1.0,2.779220820271874e19,2.1299301178307256e14,8.835298055173972e36,1.0,1.734564685468874e80,1.177442337978883e16,7.356036308929773e82,2.912393428420044e73,1.9372259689682117e46,1.8735427582293888e36,1.0635283503177008e102,10446.545272768877,1.3670899436340649e30,1.8464054033070824e28,1.8435268789622522e27,1.3351763061425371e51,8.33711573502475e13,3.739468634595141e18,3.5443232919176747e31,1.8886678934496277e13,7.778959590663752e22,1.2432985280854413e25,1.0,2.4674480504941113e97,169451.9642417465,5441.250398433303,5848.636402721564,1.79965122009547e33,1.565485349149473e14,2.1967566462818545e67,1.151937654580621e91,2.3472434302568786e126,1.471098241274167e41,91184.487628271,8.722500539284129e80,1.1881279771367443e17,1.4679113639998907e11,7.28263927130914e44,1.3236828767105695e23,3.971549110447093e55,1.5313902338946184e29,637.9263697612895,3.1690809990012245e37,5.304130132679576e7,4.110207474433285e34,2.7798163280337895e13,6.355794981936004e33,19.23474973453317,61.778654882132436,8.267358467214845e17,7.412790424544075e62,1.1429407026479556e35,4.1996100621695324e45,1.054868039110885e11,6.667904529751854e78,2.5290753382167247e78,3.0056019266889885e15,5.117022498633438,6.218040942130603e33,1.626368856295839e6,3.7922464099547043e73,7.858112510520087e10,1.8906144683012055e28,1.8277079975742125e17,3.182402948868915e51,1.7472958738074194e11,3.369380532154077e20,1.3294460343800898e57,9.925057262042208e13,1.2480056366412922,4.673626350344544e66,6.258841779249789e47,24200.035206345176,3.997273703588138e7,2.34917061725282e15,443513.6336502782,900453.601484927,1.536194855079151e19,1.4074521543128533e23,2.5092951671427466e11,5.881866653420564e47,24980.729457956746,5.76245107474334e33,1.4346219710762164e32,3.2824935128637476e30,6.178847773344397e66,3.931533904070199e36,6.300282277836132e10,2.5177257457096355e66,5.0944368433788034e29,5.7922519293353745e44,4.4505854735706296e60,1.1969568807991948,1.9610592841094264e51,2.345284630443294e35,7.563219867365703e11,6.12569713472146e10,3.326860759385502,1.0167579004722119e57,2.5480490851484384e14,1.0404139983269257e56,8.3038116728311395e6,248195.08392884381,1.0603853489130666,1.1664246777647467e11,8.132836068415027e39,4556.131724249317,5.1693585034196766e13,8.422744106478369e17,5.919615645255335e74,1.0,203860.58520247682,1.035124843287841e18,1.4796576607735519,3.2864512063223144e38,7.934621117608722e32,1.848965570112043e30,2.3967133657637745e18,1.4019196298228373e10,1.93043219458829e19,2.137904600830266e10,1.5268919518209818e13,2.942570086875705e23,25439.615401147596,1.483278554288448e79,7784.684768251271,3.1877078475185663e30,1.871569839412705e69,2.8722161868778787e53,1704.7871226008085,3.954284542264966e7,2.5838275967354447e28,2.216140414708277e39,1.0930435383207022e15,1.0044769007067637e17,6.87141800666046e11],"x":[3.242112928874208,10.716924008639271,4.314247503112206,10.046383979063714,0.9231787112349887,7.373969221290096,3.5686280788610505,10.401104685709178,13.294243384883632,8.391971674052824,9.727286984285714,2.4941421461069235,6.073626786496482,7.489349660613858,0.8207048578226817,11.02031574532606,13.457015353681909,9.954114195149529,3.5279346659747244,6.007863582366365,4.2024986445449315,2.9168522560226395,12.467335982223362,3.0463438559120313,5.456733707368363,9.702625930267605,6.756134142818512,7.017176978743034,0.3432230985949003,4.171693361991169,1.145523352602642,5.271712536467005,6.002637450092107,13.556547974194789,5.1552712052801954,1.8679395583311575,6.667879378983217,12.308437957869767,4.538420582402355,6.312230207166031,1.381662726131534,13.402941125903425,8.253689287572723,4.744195146717579,7.810138598618581,10.369930913941296,0.06964633326087433,12.929820215055885,4.554066922944637,14.310681815219512,12.631707535367406,12.781143024411552,10.252575002351467,2.0402723101532114,3.7637715163164587,10.534315821487661,14.630981255590926,7.308921641091356,14.80642137885992,3.9111012650739685,14.987323645429761,5.381465902784556,4.322508300124311,2.0021584191459443,14.479274061480547,2.869266634954143,14.66110478293713,8.565770679328896,8.527312333460735,12.097211744308394,1.5343456233236685,10.146974747386459,10.12151056950914,8.262742993380723,13.000224230357116,4.352552797021811,14.429846933626683,0.5159739450399636,3.662595080668728,9.754287333638791,7.657889542598511,8.228452111575834,10.114231590733946,3.273843307326716,2.9545477465876147,13.898484122420943,5.669382560806112,11.956059954267795,2.8315922746862663,8.199788682653434,6.619851568268421,9.238838381334158,8.869572177087623,14.738357345679995,8.291989327339744,0.20708909291156874,14.564606273332492,7.496675655225312,6.668433701083671,4.194177183782477,9.908455088168846,5.547370769573372,1.4992617020053678,1.247991824451814,5.491958370113687,5.0619954993726175,1.6753249248188862,4.726909439153884,14.305182425654825,9.646246347504995,10.157856990644094,14.24805395186185,8.211139898158104,14.846419600720402,2.5863094058381018,6.177342829750091,7.526279120439745,11.703043674975596,11.65557446482716,9.72062589217191,13.899318881719058,8.251275322201618,7.5112950703492,7.788162820159263,5.251154282057008,11.548143677845738,4.9606695846256486,11.631233182339882,14.192398764314948,12.848929389896846,3.439128727303984,7.725403391387841,2.5470956678645864,2.8367842960906167,2.644012619963,12.802286246468643,14.707536658685692,12.679660464630668,8.624324312109188,11.244075367568687,8.909638714703048,3.2344377509209354,0.3250669339909873,4.777393695134493,0.9572844827772198,13.74810700593567,6.75160899072682,12.656218382730048,0.5962460872609399,4.7027714835983065,9.503902650287587,0.6476672590270705,3.7243683282411766,11.277754542250737,8.444960745693088,7.259401490762509,13.087177485246773,11.793660149206909,3.268221859951627,12.477341018277562,1.3501196041276364,6.7558198422074875,13.413755326420997,13.277468868389784,9.413263011263634,9.95043665126753,3.674192982188708,1.3855197468402203,1.0064094275291857,7.861244340209492,4.502413387636592,1.821187792597152,7.790762766350623,8.88615464411581,7.444965338584715,9.577134388878527,3.8146913973413987,1.9877246903070311,10.232176107052647,7.5844452619870815,14.577132458200541,1.9037369326840625,10.20640750429455,9.975557005203132,0.40113838335202323,11.90930527148273,12.838679588504583,8.758654068651625,7.0366692550340595,9.430767626692655,10.88277228041775,3.6203977901604056,1.0078390323578301,14.255685276939936,5.2737791269237135,5.488014013883392,11.801143713864208,0.8911976354898654,5.354778226097481,7.7137371613365655,14.72597290237373,7.192618926891545,0.5327095418544825,4.103373669221689,6.521570069674524,13.787755264139996,0.2466640216699889,10.47413086266808,3.068552084070398,8.487298647007558,5.883201186991698,5.9874968049948425,0.8965338622047014,5.97695333121697,0.8814086679138122,1.1446830870589875,3.1269668086463263,11.15985621444166,3.0215685694148497,14.588420340999615,9.101585916004085,10.020882004919612,1.6851084712785602,12.056473337026798,11.719524781953911,2.3980319662649574,10.913940540490591,8.329695238080578,5.007403117902637,2.190389706051521,2.5385709798081377,2.987083323655453,1.0773066315947366,0.8997558691674812,8.855362680723953,10.4448732268472,3.901843399908346,9.91882577078273,14.198308680820762,10.89398113268629,8.153659569597734,4.54164848826448,8.284231042500709,7.793054515339357,13.545692015778961,1.5693447931421645,2.7763705410351855,8.706670582573484,5.787444674032135,11.346860943267087,12.245563756780086,14.625626743290614,0.1463679919095351,3.0843266994499965,1.6149672277971872,1.1293463489315003,3.7216939076333033,8.918040011435282,5.903744748953503,8.538187776727902,2.1489261660390415,13.114747377317311,0.1679022560430632,7.884803572453882,10.083083400576264,7.325546121880371,12.44543875400343,11.269713414435529,6.067267656983105,9.951370199290533,11.720951989460055,6.145705482645186,10.987106135547144,13.382290525507996,1.3472151594282622,5.341062825206089,2.405581670359057,8.290667610569017,5.279300207599517,6.332725790846052,10.355317922160562,13.94641889865558,14.97192969398114,0.17262447714141205,13.57391399672509,14.925962559612312,9.501216131190754,9.658892863425091,4.151345161040902,10.70689248037194,8.536200762777161,9.832132106438644,10.480119216407408,6.77682470374688,14.499535557975593,7.65462005760938,13.105213293549804,11.513711423782455,13.646548250051984,0.829390493481662,7.928182705935674,3.9211268865136306,2.2838510991254077,11.003202217016076,0.04402389431469533,7.888011485654005,0.8877139598465489,2.7022882911680868,4.173616276031207,5.575631730998851,0.5677657929977353,11.628383944118028,2.111168580096706,11.792458560798414,13.74057715599006,6.6624794763866735,11.650512756016177,13.471226444217262,9.066564185979642,11.075188199717733,10.878322702097234,10.415511815811762,9.620129509010368,11.560305800341425,14.668163959285664,9.126352440657236,10.883375644151975,3.2683363504091814,8.006206827585366,13.503143203678897,0.17467559426426305,14.671033110438547,12.601165545752174,4.851420006965013,4.206926545165688,12.658416230584757,7.006623778780543,13.737266776390854,12.227763016478075,3.7480476778132044,0.03574124866391859,6.7164317831849925,0.22976577185971125,8.773072827375021,2.293174140784803,9.521303523861866,4.485191063746759,1.3843446180193153,6.541458659098477,9.018060298426425,11.104002871274885,12.98813299716795,14.415289259085043,3.820480271288954,3.402474542581878,5.724604169804478,5.744696154271988,8.865252983269725,9.725639876660612,12.127456389758246,0.8731120436777196,0.9810239728600723,9.629976064862479,4.443200851848916,0.656590286702895,6.071247734654798,6.060102521869829,12.783905716772246,11.98476060281396,12.440070248525473,12.783924083605157,12.24428888061539,10.893414500431387,10.694450756827449,12.760781642459134,3.884230407914666,14.681661142081143,2.2890163408793205,11.445354784662863,7.717015832728618,10.274764622716523,1.8275187271887883,10.864956336995997,12.13831604025332,12.787478443988665,9.664709478965033,6.995095113737312,6.5628888339071825,7.589417181350978,8.593011706333883,2.7248393126334305,0.8255673082454928,3.7031736457285644,1.2556387309723516,6.570437852050529,1.243094607950187,12.716758224041252,14.670819476228086,3.9715110374941176,12.622613038244113,4.6451558790668654,13.293593351405011,14.191374993283715,3.9701733572057893,1.5583378744958165,12.148398106761958,14.542684433678989,8.80198911976422,8.298076430362615,8.831371836509817,4.827960905049608,12.154934350464822,4.192383776663683,1.9365557514634857,12.142304239520609,10.511199899930617,4.914638007465467,0.8228617041595732,3.6995477434999726,9.07593097847631,1.7516436062828056,2.6835924846472246,6.955920009836287,9.008192607496609,10.589133732123635,10.401068724111132,5.24775099244796,7.124915539696347,13.251171545122586,7.585243019511598,7.641999559066338,5.00446518406918,14.57904762213538,1.1373173299422912,8.126086948658774,14.112785645151472,13.045985593833901,6.0106042752837086,7.141185504806209,3.1399493407333656,4.6961032203490936,0.3816976449202747,11.789605585486598,13.30642345336927,2.596795063186088,14.506299874197598,11.38187871151645,4.73635231465631,12.597018737985008,8.128086381278255,5.930508396438475,8.153446271391502,2.7898127234203383,6.1438417886393175,6.221679579639217,10.953692306107921,10.245744897227162,8.996417235103436,3.0520113831894213,7.33788900646751,11.299571902137846,14.083580044971718,8.208398476145964,7.875202188779191,6.09951968177548,5.09785959148473,14.620965337721097,10.097879253361693,8.224643861930902,12.84814424884793,13.831924530401269,9.938071575034204,11.465132054395065,11.960458784928782,2.551179926825874,4.015908771875276,10.920280928319114,12.839131028282502,9.305535774835064,12.693932410878086,5.129796075657502,7.850786344660245,8.340275551903964,12.580998016335014,3.4910180945981484,3.147895107737061,14.46307515085011,6.567469461838273,13.719757933414794,5.536899130270947,7.641732867065588,3.979193865344466,0.08154603947981287,13.720900823346744,12.663100522561212,12.120182979871466,8.653123450693204,10.31768501402842,8.543054897252432,13.229082456092636,9.549791719506612,0.13383484881884455,2.013236800921713,14.935061759768244,8.610679445592709,14.553439534759136,8.089185478203031,7.683274235953968,6.181506040135677,5.796845645100509,12.28452753697438,9.693567680432892,8.517543742732185,1.9631654404899612,0.4599829301175451,0.1548027002030028,14.32171719531602,1.0280359702979536,3.176599112430406,1.5720522711812202,11.20657793158577,13.123167949270728,1.8596598870511738,10.794125795803279,14.330756004005918,12.992416304751403,9.133980431901138,12.514131283100495,6.367815453447942,0.8365165635438909,10.016468411166747,4.97880379515086,1.4108757379523862,14.32528251493875,12.324433187304512,3.3173564060690053,12.901271151730123,13.790571347236115,14.260680602311432,1.6360272674201348,10.163621599931961,14.5070929773918,12.219929327051487,4.847577665981109,0.24594255843013557,12.818176961679553,14.883990173679841,8.973873354584633,9.744426062885015,14.976973119761437,5.908612829192242,2.476751118695878,1.3598163765483828,14.663456671487197,8.8739135053102,9.641965923500722,10.098376197633492,10.320474281656658,7.949082157714672,0.9873423355237931,5.115034630212091,12.800070062267137,14.443226583200204,4.213869981479489,2.8002770723673676,11.375780511216098,8.440375520823457,14.744849081022316,0.294031778263788,14.426585308350967,8.299024401158112,2.9849912096733613,10.661445236760615,12.311068279265164,9.068348688243073,1.9580057685401997,3.236040371464921,9.65248327383803,14.789438219714253,13.292681715292355,4.352866445637531,6.220961864671746,14.447649593365306,14.457390704855046,14.2419703835975,4.887252724019859,13.76920701690426,0.06711802192309713,9.934311977407264,10.253793112017684,2.0969473118993562,5.793877946901233,3.6064142858986425,4.749670313917935,1.319140026714395,12.321797094674704,4.425196054780523,8.45981690480689,11.769922695141009,12.375378084476743,0.17391415833783896,11.792438659520592,3.3770692541995198,6.31497841925113,0.3054702172027346,5.265213093921758,2.3307966566413887,4.540885347574389,8.67861334099417,12.290968315471302,0.30441104783230477,0.03202777467976592,2.5910079737335012,12.028205429267315,2.8788961409669858,14.852010508332457,0.3202597987494016,2.6663705799187043,8.344101352778923,11.77367951578439,11.795347085038513,13.842726084445099,4.645106984638026,6.225978833307572,10.188517739018298,5.6206605566224646,3.997462074378766,13.234698179916972,1.6802613145245038,11.095166704221285,2.7503215083614476,8.232831654870946,8.404302187481616,8.506885327387447,3.481554102953097,3.949774949410121,13.839109331297779,6.787928865399582,14.679927348274836,5.015338237800602,10.829158673848797,10.036263169866936,14.178210282842489,12.212730273111024,13.312010425752344,12.344052637585003,7.563182597722938,0.04789825713305995,10.122028845645449,5.43100659741747,8.086045447876165,7.453308876082156,8.526350290287846,11.30256161526608,9.882547946669089,9.46518593777459,10.321590114304758,5.563701578313688,14.474443285385407,8.472952450332706,3.3460631894297665,2.365911489698221,2.1156034340480767,13.726598544535541,1.786169596151459,4.318927281345846,1.4211004740267785,4.768153914136114,3.4301825485367923,14.758808743063076,8.996378032766488,4.916689297297522,8.689136136527347,7.091914571106752,14.310204357111227,6.32321713669147,5.298995923897657,0.7178406282262861,11.500140948914439,4.521736935011998,5.248181316910707,4.254694787241728,10.986610896830644,4.287959789004487,10.66093080930386,11.866639440393197,7.76489157934121,12.211281056485658,9.426865793261086,0.5353957190180147,4.087850644346265,0.4043413433867382,5.2321937837029875,2.4998971528919043,4.111902048907386,8.093101202716346,9.31562132594049,11.969278632451578,3.5923585668468117,4.706604141499748,14.816775622429923,8.171421205819316,13.31711288618354,4.2144477371093565,12.084118968182507,8.863001953974722,4.011034370214719,6.808596063080627,1.128528543498184,6.611555112059514,12.70824207835252,13.481749954297253,3.287898839639003,14.0545077978121,0.888465082103228,1.9412819293469608,13.931450093138977,7.250657392302625,4.917614473668392,1.6916427104666942,5.315859471404244,12.241843033404262,3.3309307147790754,5.7388908846809406,14.49727119689318,5.944782218975011,9.32341332344865,9.902592883587854,5.568482805466416,4.326322951505361,6.539457243566432,2.6709049818965602,8.048198334335115,1.9343036308572703,9.574162886648898,6.8312058767915484,2.774092922499932,13.988617712760954,2.7389526578431367,5.19899025967134,8.55682078064539,13.592798949175736,5.832636177443692,5.683879978971711,4.810581810049571,0.8155065210332102,12.154593807514303,0.4244897189147301,2.2959518694317693,11.844254676212497,0.16338588249522612,11.099325036795278,6.535481712884285,9.401084854464681,10.661770484726066,7.665261175114914,9.212441024863217,1.52461345424603,13.389599248544744,14.616347086628963,0.3116062617967008,10.957869798214029,4.100453237990131,10.124289018068055,9.645770226456179,14.950528094609878,5.600138355205871,13.715749983098313,5.873069298493949,0.8720794305155255,13.856005952078949,13.986263138084697,8.32885397564559,4.082741566188682,1.7574801561987075,5.646133249308462,6.100168643380015,2.0756895177895593,2.3450880966132823,13.881142707523725,8.680385518892527,10.464784401989531,14.152255559781347,5.011431004383191,3.00558350605045,8.948432209029459,3.407748086983161,11.53253109080008,1.7470143613128997,10.091074174310085,3.073029005217649,1.8202543242341485,7.11632724764206,12.609537117627232,12.306722031912557,8.570461288908833,13.803765578378261,6.697463714148714,3.3389563162505542,2.0683765651288644,1.8631870478586665,5.15192983453947,14.715693741257242,14.809612810043484,4.172540810313815,8.514024669079443,6.168260180810453,0.7873847656893029,8.561714759374867,14.5561883610436,8.333132237819767,6.580062475049252,14.123360249979807,9.104004060946489,9.101336367454966,1.917211979861999,11.8709670305518,0.7955361246047932,9.119384997045062,9.966294112417712,2.02002349929172,1.4282747785637817,14.000891824271026,3.9540391927087324,3.3091968725799537,6.151106239326322,14.263006985513279,9.154645821730048,6.719280572643099,2.4746593301238686,14.008164330612967,3.382262962562076,4.906162918433886,2.222137803785694,11.498857528913591,11.4046816222721,4.572072847117617,5.897473060974503,8.772523032708886,11.380563951044355,13.001163934523372,0.6741361933203172,13.95451925623772,10.74484429681884,3.176491891874196,11.555689718785471,11.110974523561566,3.3978227778262795,1.5404042027023757,13.22798366351667,7.007437933382072,9.627942046601019,6.492733086260081,0.3899813988256129,0.693839240024422,0.7620276023787753,7.914255835024326,14.153964218624926,4.059141671283201,5.769506267310285,13.744496748138168,6.883563995479687,5.622186394682256,11.418130848728604,7.8664673831120595,7.260338611438152,14.756887846948354,12.624542080782192,13.520074425568355,9.80159126947081,10.921676212565558,9.242563095919653,6.263617751298325,8.059304148935025,12.329594911635516,0.9076572606145938,10.249597953013504,9.973251747066557,3.7212583339671914,12.111435946867301,6.962805176910578,2.9467408180535437,7.055395603969239,2.1023991777301623,3.2734056439703494,4.950282676389143,7.60406833165793,13.094500870155684,4.682637929994863,1.1507918891169366,2.076995398944834,7.5285414992181785,3.0403596286822587,11.75744369162317,13.487551234217541,14.99726987010966,6.373711394324443,11.983130406052432,11.575707096403187,3.5524019153129194,4.184932570093441,12.123466198135986,13.931983889480502,8.558821725399001,9.989134022407654,0.6200785170433987,10.123969360685608,1.5897811123380723,4.497758724517734,5.063316922627763,4.603571780347195,0.5216800884176176,0.4495710108021622,7.302780293728009,13.760924043199896,12.081329906371513,8.557000811470871,2.420057790043667,12.426021922546612,11.118924672826978,2.5573747700345706,2.0972660698440695,8.095630801507523,1.846374366821183,11.259069849673997,3.121260374257088,5.566595619723509,10.404757063883643,10.444311473882415,3.2883091087703074,3.283749510069157,9.058798823080865,8.561534674930387,0.057032386097374266,10.192303806375033,11.39840759000184,3.0147241775090974,1.198667062292984,9.208910350801833,13.44966856531875,3.1480656719021525,6.915139494882676,3.584619428060929,5.8826927711544545,12.659981943326322,0.9629648262934465,5.747004974479815,9.617506896864302,6.511246393038328,9.016131600310562,11.047577468132484,3.1424261030297505,13.087986330538614,14.371300497701395,10.949947393660622,10.309153192392548,0.1309907624632367,12.21313759433336,11.98266191606847,4.99289380361592,5.579793385672741,1.6538331487226932,13.64223611885926,5.050132610617717,7.618455907270489,1.8967456567090324,6.5854260673549545,0.0074317772270315885,13.045048748139457,13.623549241946286,8.834783858700225,8.275936052093996,7.31012172217123,11.368949819037052,11.473897687574233,0.9265464001347523,14.42397175777273,0.1857216137360851,13.032483284214422,7.3324761522999236,5.933662568063097,7.35974949723965,8.260049605423175,11.59131879990467,4.362795485829347,3.330533730299836,11.478285911211474,4.012293119829393,12.84186299269966,1.8588838852736245,4.974757136766391,10.92722255666357,9.357722572537789,0.7189049477368936,6.497966538139468,3.731809839651251,7.9782626480590295,3.202727698291865,13.696426781466274,2.439685919961081],"p":[0.5929772569574034,0.6500993082996145,0.6154322091678677,0.5209398905543681,0.5751017442299713,0.6199177346187148,0.6020947871634856,0.5545917239811622,0.5710026477596684,0.6810250192975479,0.5915843090253261,0.7218728801006722,0.6188246665762758,0.7294116325544786,0.6670121906514619,0.6801246861333272,0.6251664121366174,0.5704745749634588,0.7204364210647238,0.5746410937073982,0.6611004163284918,0.6989070005240697,0.5640035248041877,0.6516468943713367,0.6691298877377025,0.5066729664806815,0.5277079262251998,0.5913501382120718,0.5851773739832968,0.645655818784064,0.5332396404901092,0.7120661846829881,0.5681966139537803,0.5365555815753907,0.5150889829455018,0.6195391129451537,0.7402648775661524,0.5194134640471362,0.7236356111339008,0.5853344326935201,0.6887554070276223,0.6831179329289458,0.6781778149544109,0.5659365667664478,0.5608045112789932,0.7475576851579813,0.5296524670014735,0.5013081654839163,0.6316385821093231,0.7240613290099953,0.5731179450539198,0.5424307723322699,0.6563666523611802,0.5707886857019842,0.6382464461942853,0.639027870371168,0.5628739276753552,0.7097905077486036,0.6491177171631819,0.604414107793013,0.6258559405385957,0.6579561482964367,0.5598973801551053,0.5427232408068716,0.6783472050692432,0.6433372409024952,0.5958210470562679,0.5192772356031277,0.5825164318405638,0.7448259047490788,0.7252706742084506,0.59820250823133,0.5730622452660167,0.6517242558442986,0.6537539110105614,0.5316618474748693,0.7324161001094847,0.5701832226191752,0.63473014662931,0.5975319872281175,0.5869136637552488,0.7144552794154282,0.5371423898013878,0.6818261801404941,0.5968261778789108,0.5285481835779573,0.5850075434480033,0.6131700216267796,0.684874500222102,0.6658670046531789,0.6880601086105916,0.5270158166506138,0.5213557862110147,0.6003937281115838,0.5496194114750605,0.5756604130804033,0.5243610342199468,0.5769424017707391,0.6821027816314502,0.6445949612809431,0.7276245249274732,0.5903119782797814,0.6664907788195862,0.6394478067534388,0.6123768002156817,0.5146551080216135,0.7490744180666827,0.6930167388182638,0.7054843788024647,0.5775169206680191,0.6725321594507918,0.7357339333672734,0.6019885054978643,0.5250090009632202,0.7333751605874006,0.7401407025398283,0.6610463966567942,0.5243415215905499,0.63499309086235,0.5376303988817721,0.5877715519346824,0.6913320422130411,0.6086449972228707,0.506871126536968,0.6900352771358435,0.7069558288775315,0.5566648018242222,0.6394465347875815,0.571067317968643,0.5410143980932469,0.7180811355078999,0.6860439424618467,0.5686535304217157,0.5959002557832673,0.6683037544097492,0.5629002235820175,0.6532522096990443,0.6983994492116007,0.6401562177263831,0.6948116285544541,0.5667300726062969,0.6613473592251224,0.5854883018206543,0.6594254206079624,0.6005577369190334,0.5628122020119724,0.7498655123558062,0.6976001564469105,0.6128687535032135,0.553536373153839,0.546008308389031,0.6089352323146405,0.6935305631949705,0.6439758150764392,0.7325523726115222,0.5675915683604054,0.5471727599422822,0.5509598217150593,0.5940840925913494,0.5311565407619757,0.5962212869199293,0.632932106973356,0.5341816927146354,0.6054065874600836,0.5487627748985695,0.644850447175153,0.6046938981111367,0.5311397374133777,0.7365011231403775,0.6047707617435081,0.7152382605326979,0.5972613878878209,0.5757642676360417,0.5388923197634499,0.7339332971197712,0.561274465167286,0.5891082737287221,0.6018625054757263,0.6881283812625485,0.611621771858718,0.7161810384223899,0.6232615911332693,0.6477545993767109,0.5748715621477972,0.6381224130299094,0.5594209175650311,0.7340561667728542,0.5248307439515275,0.7094241177226235,0.5316034799416998,0.6019927235054526,0.7160029717349401,0.6395415156691717,0.5699128901798234,0.6284896153003154,0.7180834801378864,0.5803388960021052,0.5579670215860056,0.7457157797893337,0.5881392354363851,0.5488669704944562,0.5460643009677231,0.6109795768446551,0.7163528495532758,0.5112150642654392,0.5730512342238753,0.5052470772011293,0.7376839101143152,0.581072069769827,0.7267289790767264,0.5059357122461864,0.7155098066442798,0.7307194743873561,0.5969360602344715,0.6837854233537863,0.6847110416767961,0.7110334633728096,0.5889561356319652,0.6394324486203682,0.5662894578831428,0.6481878056975985,0.681205084946933,0.62810639723485,0.589358890433736,0.728602632160436,0.6628247839057871,0.7140323290497421,0.5353876815951687,0.5688706248898499,0.6300896552072117,0.7221239974811138,0.7318436358295948,0.584787177579506,0.5278448308102786,0.5147881938591187,0.6999363633344033,0.5564416640265012,0.6229279296497435,0.6519643995442463,0.7425312093887992,0.5477186264822291,0.6093679624060335,0.5182176710764318,0.7074160655325827,0.5774930861377091,0.7493950660461137,0.7206260967044439,0.5194562065988703,0.7446923636992606,0.6851488200094646,0.6553518918519382,0.6967671022312486,0.7193434563664681,0.6973207060631049,0.5128282203384935,0.7418724153922567,0.548530934909605,0.6448355890432267,0.5311559992834731,0.6472731125274385,0.7332625361489382,0.569378535627928,0.5485927742423506,0.6482818697719719,0.7198005469928224,0.743371938309368,0.6002474647990899,0.59786426460121,0.7119321378514356,0.6108162812366907,0.7361505346511803,0.7346891065153076,0.6243852228002995,0.5360023336068706,0.5362500898151901,0.7001065243646234,0.5520305420056288,0.560152344487306,0.701162837405197,0.701750819089614,0.7117300518627809,0.5516683215822136,0.5993248424388192,0.7241411034755565,0.6957634715171428,0.6985533626135945,0.7043285744339839,0.6073736281448403,0.6849881083268892,0.5273857234878452,0.5275783170306136,0.5342166418436038,0.5235144474475948,0.6034387168403594,0.7432884020461024,0.5675010755866599,0.6728072299571342,0.6552335277774441,0.6623808219102354,0.6461350511655447,0.6417419164157285,0.5603580952636953,0.5425294643319813,0.5228038530677768,0.6904740423967426,0.5331482650308255,0.572270267675806,0.5816811293063462,0.7371171891667568,0.6555699499356313,0.5403797547172662,0.6168973045527424,0.6657623154694934,0.7018400889226408,0.6629994463493307,0.7079229091545458,0.5041580960016496,0.5109421440187691,0.6118511526332782,0.5993677424046036,0.6862369331299092,0.5866352226270206,0.7280907779002115,0.5694254311443506,0.730027250379619,0.5912639440536624,0.725755629304342,0.5249873697764026,0.7328910485957314,0.7339124603736503,0.6604214606869476,0.7189269426114602,0.656902711898055,0.7305472092542011,0.5579212967045997,0.5351227073373149,0.5529874422444275,0.5031411858366298,0.6562195825368429,0.5543518710609374,0.5315128642879705,0.5097505635295609,0.593629763079349,0.622916152395936,0.62793490288791,0.7308864718442467,0.6822480983436363,0.5227480450045612,0.7155225126829416,0.7027626621433076,0.6488664923295089,0.7379481763967546,0.6116249777172278,0.5818938042259174,0.5202612750065294,0.6205638047998924,0.6813392146126767,0.60329240708962,0.5495370576990044,0.5604771812783977,0.7310211163929023,0.6291139048289184,0.735534557623213,0.6430268506720739,0.5394306786624421,0.6790928482164391,0.5555011546101052,0.7120442560176712,0.5260929953086004,0.5401313174649527,0.5873493568224549,0.6453110599282945,0.6611000266087239,0.6189131832045903,0.5485103765031277,0.5010787153999147,0.6027345522212889,0.7035802501828352,0.6422496719472914,0.5243104722049421,0.6739014031401579,0.5635031129432968,0.6888061135482803,0.5682273142499195,0.7325819031607442,0.6779405998720796,0.6078262849147746,0.6707430412745163,0.5163223524776579,0.6279202229237462,0.7345408153390807,0.6323490984132631,0.5026719486171191,0.6122252972404227,0.7352934911838186,0.5725403303401052,0.6598398276611708,0.536407979672638,0.6984041491095273,0.582254378622953,0.6365061435927013,0.6971543975805431,0.5601862741029344,0.525158657924881,0.6599109759530243,0.6894816202321983,0.5869916056958537,0.6199399969918923,0.6370786286528485,0.5682924873828068,0.503530913841536,0.5149689429856672,0.582091021876626,0.5198671337824434,0.6971395693897657,0.5072645336856194,0.6523313096279073,0.5468460150320459,0.5020141961703378,0.6952962349286003,0.5517425650122483,0.5205149608491408,0.6833653658769493,0.6634000687047752,0.6477245727201075,0.6626810429344139,0.6656145129719041,0.5824870271743057,0.5524499235263041,0.6399694224972896,0.5214898906830969,0.7114934026055045,0.574347675060733,0.534717552097641,0.5829816271848485,0.5437447465332514,0.7226616020191388,0.7272874812858521,0.5184983966946899,0.5145600775669436,0.5003975705313544,0.703541206224121,0.6068121734338403,0.5789679041720563,0.7365835453660805,0.7082271942962004,0.7023139743864288,0.5921282579936165,0.6444085952592074,0.7209543921102994,0.7324960690671951,0.6723020235282312,0.6243531054769369,0.6173451398400382,0.6146696539255136,0.7120277677102023,0.6175569415218818,0.5359799714994904,0.578654906573749,0.6785205228466054,0.5699951957176056,0.661109495579308,0.5081409940757986,0.6178457144299163,0.5668949172144138,0.5196070431412692,0.5017909432190639,0.5181514795781335,0.5387575359308485,0.7294125973183163,0.7180071233453615,0.5852932712847331,0.5932912068357948,0.7337419948153863,0.5766806807793224,0.5179959549558782,0.5355758572419876,0.6451498540255842,0.7152280747863115,0.6825219598040502,0.5198182839015194,0.5736604954797353,0.5886628378748556,0.5221469142882298,0.7036252877335012,0.6466673935086201,0.5130175021073307,0.7150271930158039,0.6679889560073138,0.5273111730618871,0.6407574431160141,0.6313205889843054,0.5221809091290447,0.5522656670271955,0.6746284469138557,0.5117481209403861,0.5467004279589862,0.5106846311171203,0.6231486950737417,0.7495812350037769,0.7057939007240732,0.5527861059478532,0.5471118765379854,0.6572851971014199,0.7018704174482304,0.6577399579926141,0.7083598705175719,0.7134241066136744,0.5225929128365496,0.7214201496799206,0.6726195381830395,0.6874657496158904,0.6996862984447705,0.6189671532306382,0.5443454953787543,0.6062608154208519,0.6226313396073864,0.5287559029051447,0.6933540380121811,0.6311942330348623,0.6674858251517288,0.5791390686944562,0.5459031399136303,0.6120910637140311,0.5979392441655675,0.5938000205969335,0.7409399309579896,0.5702353742020452,0.7047312813834207,0.6768945236686017,0.6821853785212393,0.5265268963989529,0.5089852798449684,0.6288877229620575,0.5555781496619104,0.5771796835858403,0.7291614570716011,0.699549844353621,0.6359505293574462,0.6275867925700415,0.722356542658499,0.6572775846740453,0.6004945968820758,0.5470685401614163,0.5272744153476998,0.5059799083525325,0.618750371970966,0.5905999526789291,0.7332850080908759,0.5219226777468525,0.5451488865648388,0.6569318533776876,0.6264707506127347,0.5461058513796,0.5920334516446623,0.7251333862036653,0.5847659284495297,0.6949884135372062,0.5345166608731149,0.530008092853122,0.7430082251416059,0.5052843200879311,0.5032698904241275,0.5965122367354982,0.591837647301467,0.6419801287973295,0.6373089777074236,0.6141935849880695,0.6029328580706261,0.6673273000373288,0.5073155505491165,0.5987407767304846,0.5993061569203071,0.6891289576492001,0.7329509683333197,0.647769173433959,0.5831383591190935,0.5917575927171714,0.6807281969892456,0.5901587120935221,0.7239464324606666,0.6718396786292743,0.6149803814054977,0.6587744028712096,0.6320015608498811,0.6937347707703615,0.5248162508887386,0.6590582020352308,0.5232728862184349,0.7453507643015646,0.6926184322732992,0.6549958775478116,0.6259226397394333,0.5757685277394364,0.5056878294839625,0.7229269935334581,0.7110404017595823,0.6319218476681826,0.5318740187851589,0.5535392013081397,0.6735468274607674,0.7004539997974852,0.5506044584356,0.5909357772943096,0.5385594821214643,0.5441716301287065,0.5435840123348472,0.6627420211621362,0.6731506097497555,0.5533125325457176,0.6076538066825949,0.5069568229099987,0.6038622776513238,0.7262505782232762,0.6454022201525721,0.7015472855450446,0.5886567437687373,0.6768584596876921,0.5333065939948236,0.6627892391614676,0.6701486149399853,0.6264105573548533,0.5886094071112917,0.6980511309459914,0.6485438032055589,0.6166668793281049,0.6741641207492046,0.5801608649787288,0.5372551608556067,0.6330226326798207,0.5934274332154368,0.6096690760114416,0.6877687168706025,0.5315735787783152,0.5233363370210813,0.6270484817302389,0.5531410849912073,0.690335477560021,0.6859388245879601,0.5021571480817044,0.5166608399292356,0.5894770114700314,0.7329066461139533,0.5341112123789058,0.5126674642347004,0.5201306178384276,0.6300078575558627,0.7235396264180962,0.6019385828359551,0.5167876616711324,0.6930982708924402,0.6063173161028896,0.5215110520604525,0.5694596412422128,0.7017198602539381,0.6445272510751572,0.7359220221781997,0.6115479053239513,0.7434310009762015,0.662427272144281,0.6621309127714995,0.6897031967358431,0.6518730355524365,0.5196859612369129,0.6300695118690948,0.749915210297505,0.5151144685137857,0.5315896083513975,0.6869102070090276,0.588382202437641,0.6884838744062516,0.6475254324634417,0.6352420702414052,0.6785329178814534,0.6264869319803648,0.592779270732966,0.585974468926735,0.6810060498616255,0.5174340112680509,0.7470354326886688,0.6329970097514139,0.6960240184622344,0.5014600131863369,0.6865840911182112,0.5646350185746007,0.5082669127496936,0.6942053067397786,0.7403773936558443,0.6266628507393224,0.5814953362344057,0.6574825382691728,0.5920647104794718,0.610607529712045,0.7324602619032872,0.5662285279114487,0.5436911028907047,0.738270773455344,0.7146465311566228,0.6682451317307624,0.5830309968616919,0.6082017916321594,0.6107129723348821,0.6999753436031179,0.506696349880685,0.5935929440413421,0.7149759234032622,0.5390437699976661,0.7041538681377439,0.630842190251568,0.746546166207146,0.6109954894737537,0.702558398639276,0.6999607719035679,0.6494426821626895,0.583070345999259,0.7374870468431036,0.7118556504248363,0.6805524711878558,0.6992447217269376,0.5349947152642147,0.6595364521659044,0.6947121841704091,0.6647674833812254,0.6353413271920443,0.5742712606385001,0.6201443404063526,0.743054446340834,0.5538793002494808,0.50799341983278,0.5449516014659082,0.5592634784123117,0.5015651416051283,0.6904940165149193,0.5575041478027783,0.6278139861664991,0.7421566626611884,0.6908004762111828,0.6195119152231917,0.5172462264936283,0.5896876890409695,0.6870389052705601,0.628601892324301,0.7065132914556357,0.7245487738086259,0.6989940873979135,0.6755718751342098,0.6232583620738927,0.5675353139772829,0.7155353979103991,0.6733175494532342,0.6557312551025181,0.7213447472432949,0.5999234887894855,0.5014045925706054,0.6744837911638621,0.5745424557341838,0.6608321376431829,0.7488590580971843,0.547040936784776,0.5634629626159171,0.6374149952275383,0.7230531708568884,0.5952614470228199,0.739272612453377,0.709746969351055,0.70326175353183,0.7210032865113841,0.6552818424940814,0.5005625389819955,0.6934402100918854,0.5270445027559887,0.5919760213098305,0.5984363917811579,0.5084914790390045,0.6481644326607364,0.6253214010817066,0.5837318739053696,0.6569507545146538,0.521088168372634,0.6291969448650028,0.6236178049299127,0.7165268325272524,0.6713509632589276,0.7437383328274285,0.6770467852038049,0.6032829863007204,0.5862760142998784,0.6908707430203398,0.5737883732837696,0.6318919658678473,0.7475377529369911,0.6750459476164317,0.5814873641765361,0.5105691185097225,0.5341666362918143,0.7062984495522098,0.5464239826717993,0.6748069301572974,0.5149907490718527,0.7189249596423053,0.5606054675385855,0.6715989019414081,0.7093346520867746,0.5842946385102252,0.527220243754077,0.5359073460745759,0.5137328382945979,0.7071224313621229,0.6701005998062846,0.6850031905712188,0.7076740099713608,0.5544541623325803,0.542549908555553,0.5651017286848317,0.7225295265104756,0.6109675045362275,0.6045899875917419,0.726067841444662,0.6449919758612473,0.5043016464330365,0.6139908678316282,0.6816610974802509,0.5142827976329392,0.6404782258264222,0.5392603957608382,0.5866533849581781,0.5285103783477588,0.5112433458329051,0.6055128286670999,0.6023031949756641,0.5856673458204453,0.5017646839365429,0.6497700784915736,0.5396261117985586,0.7208136871019128,0.5731982435819956,0.523333027057383,0.6357900164528346,0.5360680548401484,0.5051601427185886,0.7292909929167124,0.5778898562607847,0.6629811853444452,0.5468337290642271,0.7453883618620998,0.7331130293365804,0.7226120202540027,0.6667173346950068,0.648593164899586,0.5161292945375595,0.7108907229984249,0.5204922295156347,0.6954015331652945,0.7498663340699596,0.5620278520952264,0.672182450368461,0.6066525019138778,0.5174634013963262,0.6901927861722652,0.6948370594975738,0.563421323104643,0.6368583734838027,0.5669301172810479,0.6449558954663427,0.6671252740652753,0.515538755086725,0.5608780439414448,0.6649552963413006,0.7238970544668216,0.5766871319712437,0.7252299861755456,0.712079235374978,0.7094418395912249,0.6270784974421408,0.558034306899378,0.5770943690995711,0.7141079813642388,0.5089779711604756,0.650583582241727,0.712234649110068,0.5754295120157064,0.7471308607118097,0.6365112724450855,0.50253857113072,0.591491394639158,0.6003842871578708,0.5472288083979282,0.5294319914378516,0.5075626876339878,0.7407915183554059,0.6686889709604635,0.5667826096374697,0.5703134893424286,0.5057443525834445,0.6819773553162094,0.6386990689120221,0.6375127721568847,0.5697856426963654,0.5419322710304874,0.5776395085956774,0.5932535127769027,0.524254472013949,0.5368610903284514,0.5725636261154218,0.677739377397036,0.6822895440205473,0.5888086468072455,0.6566077059431861,0.7356932918972736,0.5237361305710858,0.5982700608495127,0.5023377975752698,0.6575876543392773,0.6524012110708594,0.5484778940382222,0.5773409820444577,0.6211099175342188,0.5005354762097093,0.721737382106835,0.6068021686554422,0.6953689280933901,0.5763010539292024,0.7301778411819164,0.5002840362767708,0.5115920451844065,0.7031245532745489,0.5706026018680095,0.6262392358143274,0.5701378724906695,0.6492136657804315,0.5890852074943093,0.7482407718694992,0.6038116284174201,0.5478899404556985,0.5500203584094108,0.675120872291143,0.5918710735007895,0.7100927546008556,0.6971573303354254,0.6394252474239178,0.6513857673383311,0.5462053645347626,0.6277768130166057,0.5296827652656728,0.6450046568873482,0.6552676522212948,0.5672285945287403,0.6962246550960072,0.5183452127826889,0.6236169929340905,0.5976042304520326,0.6699614442299698,0.706930554964867,0.5012362644861653,0.5257461914127775,0.7158395776635025,0.6720283885891221,0.6685743941923671,0.706122420111744,0.645329492200879,0.5404636553850544,0.5504786559592658,0.5969989120567165,0.730736191383166,0.6357573967015124,0.6919947199950514,0.6872419409039981,0.7164655496735718,0.7379642595952562,0.6092991164604746,0.6632332504162639,0.6825184229859076,0.6496410685985516,0.5442418984227415,0.6551252676803085,0.5918313352125952,0.5504857012961424,0.6836102271238966,0.6957506279964104,0.6401067913205645,0.5628281130892008,0.7359895181495987,0.6235614647966852,0.612865689613499,0.6670731705384401,0.548924580608914,0.5114283930414738,0.523470726505826,0.5022617898358374,0.6372751894446556,0.7447808173735778,0.7456103857050104,0.5680784433174093,0.5627653893160778,0.5125108744786933,0.7431876814869339,0.6513353275533554,0.5656419281077743,0.5236369685533585,0.6818375788704749],"n":[2,19,5,14,19,3,18,12,7,6,2,15,1,8,10,2,20,14,5,20,5,13,6,11,14,14,8,13,15,12,19,6,6,14,15,4,14,16,3,20,17,3,4,3,11,11,10,11,0,17,3,8,6,16,12,6,18,1,11,19,1,1,3,7,6,9,11,13,15,11,15,19,17,2,7,18,6,9,12,15,9,19,1,2,15,15,12,5,17,4,10,12,6,7,8,3,5,11,18,8,8,12,14,19,7,19,10,6,20,5,0,17,4,10,8,8,8,6,11,6,16,3,8,11,14,19,4,8,10,5,10,16,13,0,13,10,11,10,18,7,19,0,2,8,4,16,6,20,16,9,17,2,6,15,3,3,5,10,2,18,15,20,14,1,11,7,16,17,4,5,7,6,8,11,3,20,12,14,15,18,19,1,9,18,13,12,17,5,18,1,16,17,10,14,1,6,18,16,12,7,15,12,9,19,13,12,2,2,15,7,15,14,20,10,7,8,14,8,8,8,19,14,7,6,18,16,11,3,4,9,3,11,9,4,16,15,14,15,13,16,8,9,13,1,17,17,6,17,3,6,6,4,13,9,0,5,14,12,11,8,5,16,6,2,11,17,1,1,7,6,18,18,18,8,15,6,19,7,12,18,20,7,16,19,10,9,17,2,19,17,7,19,4,7,12,7,9,17,6,15,1,5,3,5,1,8,0,19,18,5,1,14,14,11,14,10,3,17,10,17,10,19,16,2,10,1,16,19,16,1,18,5,1,4,18,17,15,18,7,18,0,16,7,2,15,16,17,19,11,9,0,12,16,13,10,2,17,9,8,12,17,14,13,0,19,8,13,5,12,16,4,17,1,9,16,11,7,19,18,11,2,18,12,7,6,11,16,19,4,8,1,15,5,10,1,11,18,15,7,10,20,20,0,6,19,11,11,14,19,9,14,6,10,2,13,5,18,7,2,3,14,18,4,2,19,9,17,17,7,18,8,4,13,19,5,1,13,4,10,19,18,12,14,4,4,11,2,14,7,7,12,13,9,6,8,2,8,4,1,4,8,7,4,4,8,5,20,19,17,8,12,1,14,3,13,7,16,10,10,4,10,13,2,19,8,17,20,17,5,15,14,9,16,18,4,14,12,17,10,17,2,4,8,5,4,2,0,16,9,11,3,6,15,13,3,18,13,3,18,17,20,1,12,20,14,3,17,6,9,1,19,0,12,18,19,12,7,5,6,8,7,19,8,17,18,20,20,3,5,14,18,7,15,10,17,12,14,15,14,19,16,20,19,1,18,12,5,11,2,8,3,5,2,8,5,19,17,7,8,14,2,1,14,15,12,9,19,9,14,15,6,17,11,16,15,10,18,10,10,2,15,9,8,11,9,19,11,4,8,8,10,14,16,15,15,18,6,6,17,3,7,15,12,1,20,4,12,12,6,7,19,7,10,16,20,9,11,0,9,8,15,10,18,5,5,2,1,17,10,18,19,14,11,4,5,5,8,9,15,9,4,3,6,16,16,7,12,17,13,7,4,13,15,14,12,13,2,4,3,4,9,18,12,15,17,14,10,7,14,7,3,11,10,6,2,17,0,8,15,0,2,3,9,14,11,2,4,9,13,10,11,11,20,3,19,20,2,16,18,4,14,6,8,7,11,4,9,16,19,10,9,3,15,8,18,4,5,17,1,12,9,8,5,10,4,8,19,12,19,6,16,11,8,10,4,13,0,16,17,14,0,20,9,14,19,8,16,0,16,11,12,5,9,16,6,20,4,11,6,8,10,3,17,5,2,0,0,2,2,12,16,16,0,16,12,3,14,7,17,4,4,3,3,2,0,5,6,5,2,11,6,16,7,7,12,6,8,4,13,16,4,15,9,18,12,6,16,8,19,7,6,18,6,2,3,17,7,0,13,17,0,14,9,16,11,15,14,14,4,6,15,18,1,7,12,17,2,8,9,3,11,1,4,0,6,5,6,0,14,4,18,19,18,11,20,15,7,7,19,10,5,16,11,20,19,13,0,18,3,9,5,11,13,14,16,20,16,1,17,13,7,9,4,16,7,14,9,14,19,7,19,10,13,6,11,7,13,14,15,17,16,1,10,11,16,9,13,4,12,9,17,15,4,7,16,10,4,18,4,1,5,7,17,5,9,14,15,8,12,18,8,9,12,5,10,14,2,10,7,6,5,1,10,7,18,10,2,11,2,7,1,4,6,16,0,19,3,3,7,11,13,6,3,4,6,11,5,3,15,6,15,15,14,16,3,19,12,13,3,13]}
},{}],127:[function(require,module,exports){
module.exports={"expected":[1.638595858077567e40,391289.21638743737,7.402013294441684e22,2.8042626132658016e48,1.0303606390691837,724.738039705747,4.1536425401690925e46,179.75909367064594,3.326226757079385e53,1.00010721132549,1.5040738824640855e54,308.15952659989057,202.46656759481243,192811.66112558078,9.236036082369887e56,5.1080772114108156e51,39791.80490809427,7.534971125846947e67,4.336527860085566e10,7.237529568266244e24,1.0667768269098621e89,106.21617297785846,1.5454435060385372,1.3949455149255522e26,9.055318557740113e60,7.866853626734442,1.4367571479383066e8,3.1272086276877476e12,8.776672668835402e7,1.1287101087291669e23,4.317235966675385e9,9.028264377888555e6,3.182173525344257e53,1.688723185106329e71,1.3646596154568712e28,3.052227559762082e16,7.784263586742875e14,2.9487259511885913e6,2.0188643767097553e32,66568.77994869693,9.369781647185339e11,2.0430432691686336e27,4.39931346653771e16,8.116885319771837e19,4.3518084709538524e35,7.074757622852134e16,3.583765516957353e15,4.110031924250217e46,5.574931224963652e97,198194.3027789701,1.0626532370704824,5.083632939403224e12,2.8125953939969462e17,259.88445328553297,2.3162224193230795e27,3.285741754521237e22,4.302617516866916e14,6.708409934293821e51,2.159372090453666e48,2.5454090155653435e15,1.7108112023723346e8,651.7321227930546,347.0734896390745,1.5080771011279975e66,6.787446977109928e23,1.0828828398903198e14,6.875952831304522e63,9.493934822195454,3.126267938813976e17,2.7026997802940727e49,1.3608501251203645e32,2.1373314237081575,6.034897127362974,1.6724417709211291e13,1.0671335515708115e11,1.0,7.624593862308605e29,1.3635358487791004e81,1.4750111822622232e26,4.313268579960389e9,1.6542054936398578,6.174692166037986e45,3.834610565205497e10,1.5176924431991656e23,11.73094542465326,6.202218431798962e11,1.014679003002157,4.839649056780582e68,2.6589293241119357e56,3.176691700481926e7,4.6813016016815737e24,6.268918968167834e26,1.7106126822141848e103,3.2126864903364236e45,3.2425834478028846e39,1.7916613725258967e8,8.192273233164006e92,1.0496543743604389e87,899039.706768329,3.379606854671749e32,7.677901382815052e39,157734.75052205924,18.552097545525168,2.5286747908915937e74,349.29242865503426,3.0456984133531917e6,8.324012324347014e11,5.107691213182489e7,84085.51851855266,8.096641095351652e19,4.357232462838734e10,1.3455814187469177e20,8.620153516635943e75,2.4480198196147457e8,7.2329567091394456,9.366461173897633e6,2.0905027318361604,6.399806663961972e9,5.328447129237887e38,181.77376681303485,13.275435095412657,1.476831747016467,129363.1634665844,1.0,6.80653179666664e45,4.608739021826431e18,3.225390069895802e12,6.02976724747794e13,1.3726215451402535e37,1.1489598604594857,9.590024042801162e19,3.780082304267104e54,2.572285083956663e46,3605.965481764795,1.31464224289062,874.8665348624326,10049.338627463118,3.281955317807089e55,24.095016715375873,82.68416172691926,1.1626146361566909e8,6.346022262304142e33,1.0477296555706507e19,1.5683280740625663e43,8.466429226281319,7.124480145023066e21,1.4830048628758544e7,1.8499283930017893e70,1.3955799633300559e37,4.277825979669616e16,9.231807194116459e24,94151.32493539511,4.140467362366178,1.420149223460283e20,17.10168018025826,1.2514600180110143,1.4717718171622949,9.857339436869749e47,5.704440879613053e42,1.719392697220986e19,1.8593552301148544e10,1.8340992281742943e55,1.5306925301132125e51,1.5212900627756687e10,1.741930401856308e12,1.7842324823002258,1.3085208224152243e40,814461.5725090051,5.376808268319496e15,907.4939019730081,1.304704505803999e27,1.4628016767591131e19,6.10598746293216e21,3.250039932593295e6,8.642287546494049e44,8179.778896293096,697333.4032560178,2.1141226175195875e9,5.565233998114992e22,1.0,2.619190443867236e53,8.334575222510734,5.303452510603857e14,2.653705899552141,2.291275188454241e49,28.758985374027613,3.4481032274055765e30,1.4964363177328604e44,1.4108121570086086e20,2.2785134161809077e52,2.7444330786812985e26,9.034854390725408e7,19213.726700341587,2.6911218395103003,3.4302117755724204e101,1.0936092439391419e59,3.016244969970617e42,5.092905093407509e27,3.9519711545861104e77,80116.17065724003,1.6433313512463057e6,446485.7919340782,2.6812112023810147e14,3.038315522555078e78,1.98206076430079e6,1.0347245726435887e12,4.2829641209255856e25,1.6649054823063285e22,1.0,7.014843019468895e7,390190.58191052254,21.35059725088283,1.0662114172577538e10,2.9991591840948504e8,712.6709171644823,3.3260590556438812e13,1.3570478604051746,4.966045922469251e15,2.5746488296108447e12,1.413115516883232e18,439859.14501776174,4.9096235603156315e54,2.832494399160803e31,1.5566072587477358e12,4615.620012757021,9.006932014813342e44,1.0,2.674444670544008e14,2.6121492549900215e22,9.271272036837845e44,576.8451400440674,5.891281264611935,1.0023927459341464e30,9.884021348143955e76,3.832654931256299,3409.8003588062097,10799.757716368098,208.8893681474284,3.7748797283132493e8,1.887864723982965e13,10.33488118336778,1697.6956341889943,8.900334116494168e74,1.2116098637926858,2.827865969684479e11,1.4861921668307216e9,4.7068011353033006e8,10353.87576537199,54.77094682668767,1.0,1.192437381891646e30,8.231229670275824e12,6.110136670013191,8.290608693789843e63,5.223444458488392,9.205375951313654e55,2.0936749325605416e8,1.2383708987947954,2.5478265428271345e32,18664.757910171003,2.0171013307320744,2.894470160370581e98,13.551225998153038,2448.6784109899404,1.0556724328928155,2.1614265047127706e23,8.425900617602495e66,7.649302082496704,4.171067744472577e16,3.2754656051016136e24,6.0144197982061845e57,1.476141726006944e38,3.002860293580197,2162.512036438062,1.2599862401579072e15,1.2204806787400112e29,1.0136799134411491e7,8.040552652359877e24,1.0,1.3491256781563877e25,2.000132567546889e14,9.172816042530793e23,990.4888716140598,5.1190505057033724e60,4.6693395932905733e27,1.4731345801789109,1.1709169154155747e40,1.2840313166214577e50,1.0,2.4191913340861285e64,4.3791856000863733e43,1.0,1.8091363051357755e11,1.7529870318222772e22,9.539240221256858,571.9598805127939,1.6312647837892689,2.933310107002195e34,1.835265044095152e88,2.5301351285464236e42,1.0746513081203488,3.3265613631100304e68,1.2795040947977417e22,1.6804546414589337e6,13.918164123257235,9.624769142751783e76,1.5854659429843318e8,7.799144072092486e40,851.8781210986549,5.883150763876653e11,3.6342613096976444e31,1.6411481914706115e15,5.442488604532704e18,42.43869120104016,25.34439039834601,7.195334999902508e8,1.779788196457618e53,844.3601256854466,2.2293427283818048e23,1.9985315448026782e49,1.087265272156309e9,2.6424245722812275e27,6.844200280131575e21,2.9680697778705364e8,2.5934502523716054e17,4.400741369417984e31,1.0067664387516166e25,1.6321749037808936e34,738842.5401336328,7.772492214683808e82,17512.005068217997,4.539551827919305e29,1.0,896462.4857131366,1.0604754576293032,1.9399680398343546e38,157.13875185477423,23.05047492120111,1.3103888070218884e24,2.8214927477234345e42,6.78000053642569,8.568565118653508e17,56.05268570900868,3.5372681296214475e104,2.6550078399563257,9.190568464320798e49,3.719050523555538e44,100.45767085675848,8.496640920948111e15,88.14921401749758,49.852421067251534,1.0015253510037115e12,4.4554911241214676e33,1.1072411312065512e58,1.0920748311379793e51,1.7611786284937347e18,7.605240731205563e16,1.378137579222401e45,1.7207401771482758e13,6.563009047896833e18,1.4575781480608438e25,3.1091967983533824e47,484.8596835199665,5.647887123924832e25,378.3404881379449,5.3542250384052475e14,1.6650475062330155e59,3.5667960671670404e41,4.5678940107832285e21,6.968297391663367,2.868362432304798e59,178.91775702118852,1.3570357357349554e8,515.5489309343099,5.2263391793972506e14,2.76580839385401,2.591720308848026e30,3.804280126559616e18,2.6513526660766637e83,1.0974902543263045,1.557078151890094,16.97785768985577,1.2002890418787349e95,2.4701479643965773e6,5.620251443974539e30,1.6778593381262562e16,41.40255453515689,8.935586920067922e50,2.432419687927785e22,4.3370176226878394e52,1.579830652683362e62,747.541899296893,7.135475080024974e46,1.0078921079591086,1.5467425554987522,1.36807286888478e6,2.5139871576043993e29,8.455039194167327e60,3.051052599938004e10,1.8196984119338142e10,1129.7938958499344,3.314466086051917,34452.35681178154,8.735180168067654e8,1.605411158633443e27,5.73609172587416e58,1461.9338325208714,1.8958040780885042e55,1.9716247746481106e8,11219.66160888271,8.114374844497188e11,9.045953786789868e50,5.746433368735573e36,5.392419806676045e6,9.010925035918623e6,3.493841482384606e47,1.7134286836282703e18,2.8219286822463e39,1.1934914979539857e43,6.006574756539229e76,1.0,41797.42621398835,4.9773585477542976e38,1.1502405110028478e77,3260.036088992896,59450.00431688711,9.509831593671883e24,5.273110900593431e62,171.5626458617806,6.526274458043457e46,1.466123981012721e32,1.785575453604951e37,449.0299989069353,116493.56466636393,2.2091185604384243e17,2.0839181592521233e24,5.438506649353285,1.992582251615064e54,1.7184111688676754e32,4.755175914482172e40,4.005084707912666e19,6.822518976358362e41,2.2544926044118775e34,1.4086319906038623e42,3.8037966290896377e6,25.748271378388267,8.838011734492177,1.3302752570947134,2.2346582747822977e6,25821.731421642853,1.2081583416303956e28,2.015297924419074e8,1448.0142030839286,2.408869451039771e9,1.1983310003022096e58,9.456169018324478e32,1.9058742964114983e74,10210.593919522564,1.0104505101784985e11,9.736539634860027e66,5.992188112847019e10,5.162110802889604e23,1.2270510870923557,2.919222941552127e39,6.225761416795577e28,1.1332560092701813e34,2.2178721027579336e26,2.6760420138095845e95,4.1484068865177105e6,4.9336049795980215e7,6.650556973740595e15,2.3136060052569424e19,2.892378103921912e26,1.7578574531424306e26,8816.383230118057,71.27158560081733,1.7834133647857108e36,8.766620595386349e79,1.3584202080970817,6.729602503292868,312.20872387542505,1.6803421179935745e38,3.0938785164086214e52,7.017683177730655e12,6.554016428051785e16,2.7302996340622954e20,8.83245091334483e36,315363.0401278632,1.6658222227889715e44,1.4795261124172573e12,3.5531959548982155e39,2.215718058219479,1.12324128929464,2.9163530947642557e44,1.4240968099899426e16,1.377311355165357e19,8.254290946993564e14,6.597278348661677e9,3.137093856839353e23,1.0,1.0,9.327770436704515,7.561610789483005e24,8.69603420648025e34,1.9131774019955753e14,2.640341041450924e24,3.460498550533246,83811.28646298888,5.777846709978264e9,1.0,4947.93659678348,1.1637962085563816e19,2.7500139778587243,7.666618348857683e6,27.8330395370797,2.8456189270758944e59,8.908626932010083e25,10.101830815792109,2.6524698372347684e21,8.879571052639936e17,1.3981030564985144e18,1.0922307366930061e10,5.78157305593016e61,2.279933868339378e11,4.7357780363797473e27,1.1144693784571573e7,3.3098365092054426e18,2.349041908652937e22,2.9205257598112547e13,1.601429107975799,1.051958227881369e16,9.879843609199705e6,11.485046089505493,16255.308313993351,5.869543933712286e9,1.6246126679523932e10,1.2715513813136353e41,88.78091096899223,4.222259605433506e48,1150.1644421495928,7.40820821879295,16.004965500789993,1.7174901688008948e61,3.5871021436795782,23422.922413745993,4.089904921259492e44,2.724236945176977e22,1.0,2.3635283861283065e98,3.20011486944066e17,2.4155565788885545,1.9525915267386159e21,9.135293193080983e54,1.9779329422874976e16,46.513414071969784,1.1301043592680608e15,41.65488479981863,2.0350633282711434e9,3.9853858299511764e46,1.0895032222987016e46,416945.50037893886,4.1671504067540516e37,31.28227485919044,2.7794401479953215e52,1.775372213844055e14,1.60304291179121e43,4.306544934926925e55,6.729256614389508e97,1.850731911411436,9.583015841221171e18,1.0499859001837886,3.5804869191571e24,1.4441321817425212,22.50479762819246,3.3730529600081047e10,628.0483104386337,2.248434228979223e6,12.399713194227017,1.847115214345522e39,9.472434671194664e9,9.422974689368009e14,5.976705327094881e6,3.2824556068906213e56,2.2144882369766615e18,1578.0628623013286,8.271545142705462e83,2.1193163313561425e57,6.9328169035540184e16,75.34534639958602,5.4293413929459016e38,5.507772033721331e6,2.0947252415639377e45,2.2113602004506836e16,1.7203084699230165e9,309.471579365281,59.420576719605506,3.0476691751425615e99,5.786137769376333e43,1.0,1.1024991800467052e10,7.294542798666172e30,1.7982720919212014,3.683873736639583e70,946.4846859042791,6.1958996884920845,1.0,126.63073227633592,1.535725098214594e6,1.0017341631895458e88,3.339561577096567e12,1.7312808825638573,249.59184914629736,13.930235602999694,8.502027123168163e7,13.047952647219585,166426.76421148892,2.422926237271185e48,1.2998141840547078e9,1.6359292780873952e24,6.628675625641787e31,2.353493743636423e55,2534.3880926819234,1.9931883907115766e18,1.4143498400965555e13,1.0,1.242163656412239e29,6.879107596915702e8,6.493178114491812e15,1.1194403965381279,1.5866056881643509e46,1.0499197301133253e11,2.1165796128532035e100,6.179446251376907e20,1.6376626427249703,523.7249983589915,7.78554876232929e58,33516.849807657876,6.932878239258233e8,2.0868145453738245e61,12.390082358667954,1.2929132422409406,2.1315600276369674e43,1.3181090241195854,1929.9694650063275,1.3473317991417098e31,7.055232696243297e7,1.0,6.498947592861851e54,1.0493740935592823e74,1.03417766260402,78187.55050732415,4.4679172433409957e21,1.9859368441671896e37,1.5867361175609954e59,2.912028290308569,20.153103754665054,5.3664281630913664e35,9654.241875304304,2.397056185509499,3.3058889286981836,1.2145188783678444e21,4.881433310497848e38,1.8824843734750566e13,2.157169809123519e48,2.8381649597004586e27,4.131585988395009e49,67.83437425216336,7.030767856097703,2.3181800852933807e22,5.416287450164093e20,2.0768059437790727e101,6.890835042067875e21,5.2894134007408196e79,9.154809370914512e26,1.1599360511376469,77.79857722649356,2.778574671122189e108,1.0140244065840597e10,1.0904371178689084e47,3.6278175206187924e22,1.834714636394726e40,3.8148681068741216e21,2.705716703106751e10,2.223775914497494e15,1.799614278876161e36,1.8517874980674164e9,2.669003534111873e20,1.2337087493667807,4.676931131993419e42,1341.8354926170832,2.413281812889153e25,2.270580644793966e31,5.0638007498876605e11,3.503439735796824e24,4.460135141220027e37,3.6299672471484046,1.583702783595319e23,1.9741417301492887e72,1.6501034647143678,6.410190587322356e9,1.0485206647519105,1.2774526692645483e10,4.108142504631981e26,137.47946331358204,366586.5886520384,1.0,2.921855069393233e19,8.722665000891773,802.533870005391,5.018395143527334e14,2.1766955352200136e65,1.1247724069997616,2.589910884222884e68,4.265362158424619e12,3.722396115251978e21,2.8394831536034824,2.634923547630983e19,2.9536165743003896e46,4.5000837807763634e26,3.0548592052528985e44,2.4962602141247722e56,9.438941625871028e63,2.423343808481933e34,10132.130925378158,1.3857906301080476,14.845687725590453,1.8801285412563974e8,7.372556517496954e8,33.79779645046981,7.367567319774139e32,1.0,1.0435633835789355e12,3.0544752691667047e59,7.139981412339583e61,2.5437738251809373e7,5.588328121780486e39,8.018662271653428,6.3817894952744375e34,4263.420013072504,2.0509258895664938e7,1.4469361379816845e17,1.0182911757767804e38,5.3202151714046035,5.391224782908357e66,2.1560890250460252e41,4.965030387596379e21,1.140792455509743,2.0150850803278908e6,1.9824409239957076e34,7.956912447190187e57,7.012477100472096,5.214250567015408e20,241.29063491547032,2.44282767506132,33.70789391019516,2.2089570345851183e92,1.1464323387855437e8,2553.6508649453085,3.1337533246217334e22,2.1653147664466387e49,8.00276327842032e15,1.1076446319188518,8.815684958976248e28,9.869646763861692e98,3.249552068927014e26,1.122355696715262,6.356324462485759e15,2.4677403562174374e21,8174.365633951126,1.4197591921188536e34,386203.7479006382,4.440609809565055,4.90637911002813,1.0,2.6214413188559696e47,8.150480753651124,1.0383430061595746,94575.78042872708,1.624723487722679e28,2.930158931273215e30,6.850856930029321e13,1.847762970489374e48,844655.3180303137,3.612381330613395e18,1.959196069104057e10,2.2618315545397914e17,2.927517134501802e6,2.6873581654958096,29.439404913541956,2.9187559775207153e11,5.0166462615622214e44,2.8465434112028867e79,8.153273367909185e14,1.0656071110133236e36,9.07720016945779e42,4.667220309717373e50,311.8308255307735,1.4239925794886743,1.1202741876777799e13,2.1018418679055865e6,1.0863450489100246e18,47.25199872338808,4.426060208866076e11,3.5126531113725944e100,1.0621734710523542e47,9.55083445440857,2.234616224855571,3.3837995113294735e9,3.2791984940385177,3.1618688669761544e14,5.038654721050127e20,4.091752042400451e8,1.5941616468601463e66,2.821343816979614e18,2.6410232587623565e41,4.787542434780823e16,7.757646550879499e88,1.4975250006259938e14,2.5083423724252514,1.351542918831013e6,3875.7780438799505,1.3647679111893565e21,3.464064009890526e8,1.3485186237858134e23,1.21975439448165e13,1.0,5.128083211275159e13,16930.18148051453,3.3592974559086153e50,5.996551371252187e28,4.0442699994660116e89,1.0517662360644764,6.313279601071738e20,2.731785623612493e56,1.2925297190457467e36,58.30781982981885,2.864062500375289e48,2.4241195078410227,4.9451450201163375e14,29.642186821748233,16.608946968012223,2.0334688682312772e36,5.076391903755027e97,7.278010598639934e16,1.0747219688290958e61,5.017024594145358e51,4374.779567305327,7.737303857833509e54,8.292539554155535e33,1.3109306042112482e15,4.387653023585839e15,5.004880175075284e26,29.16260419587823,5.882147414730272e16,4.950398153581302e66,12.383375870391404,1.9460577832405453e24,7.322950218091925e76,9.067188109645762e14,2.0399575222576205e59,1.767070799848001e32,6.885145448189871e53,5.233059231757903e15,3.0298024084259143e31,8.396295368263913e10,5.662901440878247e16,9.105936163265303e27,4.354684772143998,6.775645849236551e25,7.647345344691122e84,2.7833548584332585e15,138.41381809910263,1.0004461813304948,34.67753135293806,2.1222849925566488e35,1.3696642216899528,1.9464607008064476e42,1.754032261682135e8,5.011437570682219e12,7.760120696503348e15,1.0,1175.2972300618017,7.265838946458243e86,4.0669342497986054e17,30.04003391170154,1.712377873171377e8,9.304836640895625e8,9.37518795667084e19,224.00903379033352,5.9153712119450375e69,1.3183866976451463e20,1.0300686352614343e66,1.0540780648097993e19,210.67799520764143,3945.1868658201865,17.09715449116531,47.17115937517479,1.405703905630665e38,9.275288228773224e43,1.2981366897559372,8.00263839632454e13,2.105794985773887e6,2.001777163104185e11,9.36550917956264e84,9.144755049867075e9,6.507579236055377e96,1.9546501848958802e21,2.7543662045047408e25,1.061735266674836e16,3.139773579231173,3.720950145235376e33,2.531023447334412e8,1.920784874881385e7,5.451324162941636e16,1.4017229108298407e11,133435.13772331757,1.5302324092042432e52,1.6330437168294558e16,4.661331634561795e10,5.21812648189585,1.0204859183978738,665.6860458139035,10.115011843671793,1.8896991478475713,2.2496113965719054e34,2.983450562346895e49,50.022027604638225,3.7696264527041575e30,3.5549190833204057e24,426.7791555229824,5.393841179803943e20,1.4852386758723356e35,6.819095216785195e27,6.186823166447066e74,1.5813807545270977,3.0256661552857743e36,3.8445665539427045e21,4.321615958672539e39,3.1684425821791e65,1.3041510679214616e59,3.5997883843569887e50,2.1050709627205412e20,1.003623721151147e24,1.4295073434654764e25,2.4084763906418956,8.053413222621442e39,1.0,5.093430755769606e56,162.83895676429842,3.0224169920242577e57,6.082192866693149e37,40.79823447037391,4.575073686033472e41,1.1218969483508965e44,9.23101210288827,1.0120070368734222e44,1.8833811198884793,5.199859126160742e44,7.850193540593368e8,1.2520646498174015e7,1.0,1.482239347513138e27,9.25816455753982e53,1.4757038117898689e51,1.0,4.587316224448604e33,1.2448613318393505e8,2.887574306577427,2.7052435658763317e64,16501.990110063143,1.0191243108951593e85,4.9137073942114845e57,2.2166446006160148e63,7.066010798716558e8,4.9526123321342055e22,1.1234213467421808e16,4.611079962753962e76,7.679591730103331e20,1.2141627867458563e18,2.3190505409573857e80,3.8433763384364535e66,1.0531538335647765e35,2.5904955617256227,5.056055507275134e18,1.2624054501995912,1.747782924910261e76,4.451232658626971e13,1.8276868801171947e52,1.943883795849553,1.0910839021309696e86,226444.8414452564,4.112901958846532e70,1.0740255613231186e43,8.162187655594866e72,8.816858379626893e18,4.410324558425463,1.3237165217292698e20,1.2500563571822704e10,160.5311125941075,1.0],"x":[12.248509370791323,6.866773987948386,10.472645257658703,12.203632612320186,0.20243752679593108,6.045021438552154,9.377062741038628,6.306026024120314,10.560646704310603,1.799539610385903,11.582030429594614,7.4682035380125615,1.4960092238579525,14.28900303485886,8.546730580876748,12.822285590671369,1.992461174644583,14.053564552227101,14.063398607367386,7.010453562768494,14.540037482374098,4.958006113736247,1.1165713481921147,10.737481247790456,13.137143759826404,1.3841041136867627,8.983000388353526,7.830623288768418,2.62055310736515,12.748526955727685,7.1559507869167565,4.791110971403595,13.59582087178989,10.969263616096184,5.417112361610372,8.553705886674939,3.9479123138102725,6.673688434195075,9.48439693666648,3.4787684761910986,11.352062545194881,6.330830380909116,5.9315167975691185,7.207305449146942,14.276961650282026,8.533243811895376,13.613781948294179,11.408932997402612,14.898788596715383,3.832840754448629,0.10338903577113312,5.790846689373462,7.567792705383357,1.9878707613148372,14.221384965712966,6.024137061758369,10.0927445629072,12.21502248279797,13.251643754402938,12.009020165672542,4.576355741354976,6.116417310198303,2.1337189159040157,14.315296006133556,4.832381238476488,4.204580339533735,12.12724076869344,0.8726410385127092,8.052260338540831,12.805156941621997,8.076784749067315,0.9531636235396157,2.2270625266725244,11.405136007371315,3.452130733833388,10.093152863385358,8.706359605385018,11.549787069780814,12.185774691261841,12.859367918796934,0.6217554005294235,7.856605203725425,3.8352383905345766,7.795998971947824,3.3460238769116124,4.738874945880048,0.036545869441587664,14.558461462398366,9.56139728417944,11.660207737770051,6.153621068225929,7.8932830946694335,14.215501183032755,13.864214207914365,14.733746661419609,4.522932194809139,14.17207763916402,12.835487933751448,5.011781816788713,6.662897455252139,14.17545531264561,14.222573960034426,2.0146352760339292,11.18361237870397,8.263916423037582,2.608330837375651,7.029196758209504,8.569587211179075,1.8796157202064234,13.997408523870456,5.804864894724673,8.299816820793518,11.553359770678949,7.175537499172853,0.9965774644864756,10.33918140372587,0.5153322456408127,13.287546767855117,9.194899771491757,3.5210345294972334,1.5495378126556858,0.6914566187254778,13.514123173603947,11.312802565406216,13.799271049273965,12.720912218284468,8.446611389869163,9.709960364858647,12.751658422866667,0.23386215467917637,14.458373460907266,10.470621471106616,12.2047854839645,9.806793746662013,0.3127105329272839,1.3847278647530303,2.2270595096675616,10.853310144184379,0.8152039538676248,2.4198631391408676,12.622317605190972,6.112206339015783,14.031676593960704,10.25702517662202,1.3759765761106102,7.69512401713976,4.732915888481731,10.825992056954533,14.447509428602713,7.327392839129678,8.721208611548315,2.3512614875952975,0.6375114695640449,10.968602559597326,1.0609256000634149,0.8095814828881875,2.233121563019931,10.354185248854023,11.854587689154242,4.332466229809771,14.331742707125262,14.200503276496303,11.504090308587417,13.922689799403695,5.941035084495687,1.0139640869441224,9.261687976246138,4.040974783265318,5.862064821653096,8.81635342910256,10.562500007239002,7.285868182692667,6.86580836586387,7.075165454985709,11.255085692818916,2.8855957386447537,5.1820393491178525,5.12585772772633,9.477041088284514,11.784296735147032,14.280396572933132,3.2646270149123313,5.127138618711018,0.41092065724528837,12.3238858782531,1.8889286479397782,12.015004862728668,13.709397402370293,11.398756958283517,9.601302448828466,10.671325821087947,4.808823606551735,2.550691031303648,1.1514093334289521,14.704702026562352,14.975585750682917,8.268143363280986,13.246764504147315,12.402414385995737,6.33892683804623,2.7469207330306524,6.303368250001547,5.478909244062864,12.557482450497531,3.044556968131703,10.24409698817769,11.194659782354536,5.541082181021947,1.9544737007973156,3.791208964485131,8.083366596132244,1.3246644490536852,10.469491624261472,4.158384987729634,2.5339130155393663,6.018645137540996,0.3065754355773975,5.098110289445058,9.164590558110813,4.876315831575155,3.741553700412441,8.391570871076082,11.452461508558354,7.376717911670282,11.215904695884484,10.797511016077543,7.914063463484778,4.015161116058479,8.244653926455076,9.513595998940675,2.511827481183737,0.5542171444289834,14.962158859160263,14.430118010712748,0.49614333302103075,4.6746664582614725,11.46277153945274,2.97344471213028,3.8726126729098223,7.46000319167652,1.3335795231165315,2.7829664403551204,12.621763823270385,1.2322567684729346,8.370483750921908,14.495056174982464,4.8225198084173115,7.274107234588474,1.2056811589831384,8.379281804386775,9.725848844014067,5.00293010251737,0.5011625726817848,9.76254970257935,0.7752136231940487,14.429397919009613,3.4570338088074095,0.8013726738517502,11.64531284797826,2.2804275403623753,0.22949672847648928,14.360094492718517,1.1501108359136003,3.08554648840356,0.024415429457944615,8.400805485648565,12.632600030057768,1.013901915603963,14.731223349970625,13.36445487710547,10.929658109252626,10.578368315755645,2.3491606902874174,1.9287186251745148,13.816390746942643,6.689156609922363,4.327358823263445,5.953884888019006,8.348699803339183,5.6087124022938255,4.058381379642659,10.08925156895808,3.6750902753078805,13.516330080164801,7.790673348840147,0.38579357946041615,8.208707269862671,11.97973034603934,11.622810897772302,12.043443640226538,9.955050220324779,0.8766958587294849,6.896070194481501,6.31673957318522,1.4225367501539532,8.972240840176626,0.4964102884980648,7.772518603186844,14.916842733062417,8.977369171998404,0.5227717341364047,10.692231854621836,9.351520249014015,3.8871309937476606,1.9650875699346504,12.269328431547663,5.548958952365467,14.864996099898443,10.88561018263828,5.129690826973991,8.959629580655621,12.164424632941408,7.477450690169308,5.510444843769643,5.038670078244133,8.743639454097092,9.867596943497684,4.197420582078628,5.840784770900347,9.817359612820912,8.879991893189025,6.040196356622819,10.988057824781055,3.5121844880216724,5.021250473727123,9.920566242241458,6.9390482671066795,12.052131689572539,2.7539246161021023,13.195224759086004,3.2644670432051868,14.61770655543186,4.135792372435346,4.629188838669674,1.0383755757006419,11.569207803067272,8.623115017189882,5.287802500841137,8.299468900314638,14.675405192180758,3.7242222924113877,6.80523987527426,1.5367012242353584,13.96159593655684,1.193752385216038,13.612341345035336,10.10012083108079,5.1328784337801405,5.679648865550623,4.503482562623937,3.3679794121440954,8.527113133934627,9.029055035208142,14.243170953275868,14.858953616121907,7.599118160612167,7.138818545929953,13.192639970705509,11.846355372454614,6.266992396902894,5.558010976096512,9.013551463744506,2.2712761407896807,5.484193327770235,8.742331827267384,8.604176546250168,13.227477398351938,9.889501240276688,7.165886761857248,3.4871498899689457,9.73392254543226,3.3881808587176487,11.042906873173607,3.282574990842374,6.004502089313121,1.3890007192078035,7.065487289358845,7.609243182381663,11.641809674073965,0.06319519953784658,0.23985549911892612,5.42037830604386,13.320014536441683,3.062308248191737,7.127543652994676,7.001286231919115,6.566092231306562,9.097396545219775,7.871093244402678,13.295958817760097,12.323666679241724,8.275906863157074,8.50460043309328,0.9612694225123608,0.48032409825881084,2.2757656411970153,13.4408931772195,10.032528831841601,4.70646422265655,4.127350793642965,4.417918414143656,0.8651201251499552,5.678092187275517,13.700514236376758,14.223877456965262,11.772069424625284,3.9980535692728267,14.977044567355183,9.02635611637622,11.36151201355555,8.944693297643965,10.520622746532077,7.661083576517599,2.70330591398018,2.674022084558947,10.143021221659957,7.191526046788327,12.242057689245941,9.095806124891533,12.80774592749037,2.0864645183710353,7.809604348831685,8.170576198260708,12.149606240333492,10.984187002410144,5.962749062969178,10.07135852082588,10.248171158130578,6.842795246889266,11.03894382178006,6.716749811292092,10.643544246530933,1.1384036625502536,8.481482741287232,4.449725726857306,10.517376981404773,0.9583574004013717,8.966189276688311,10.476829624399208,12.628712386159554,10.503545734274164,12.431073783671799,10.770122429270172,13.176189652246787,9.430317118136118,2.7559149433106045,0.812477205074913,0.3809904635052741,7.651389471938667,1.670762547951169,5.920221031591931,8.459263185343849,9.508623490511459,3.898617485907836,8.718257098520954,6.540246118756268,14.413034695643214,4.751314312284959,5.9883897324114335,14.243633661184234,5.406738514724012,10.767736579028863,4.756300491137808,7.199128585908384,6.149528165096037,9.71000192992922,8.194218080248246,13.241564532139876,2.9956613402073637,3.7028751217725633,8.323440810739273,12.951988188938543,6.366670114968676,13.728485955748011,4.307078932617458,0.8249244011555945,13.994363375812837,14.25064487523141,0.37978677872761324,1.0120445267046319,3.2682687205813563,7.45746415686714,10.767378825583933,6.014774114163032,8.597315448858147,6.150478632584209,13.38702904394477,4.362918082468608,8.478784432861646,3.4160120209099576,12.545364599888314,0.4175147594980144,1.66529902513052,13.867499180972999,7.083114827573186,11.088728421270819,5.758212292222147,5.812384411798332,10.047706055833439,14.924503539919716,13.713668443515974,5.140892398350189,6.762083572844469,9.960537610597326,8.326576781145503,8.93864695858047,1.1525934519931036,3.1989708112546333,7.724739192813238,4.33767150207435,2.1647178658233504,7.484391855821066,1.3677401945331757,12.573431885822782,1.5549609123056574,10.251474783681168,13.252243015852004,0.7250979313127792,12.258365877739854,7.960826020477344,9.94158913032797,14.371980896227681,13.81450397640714,6.150267921881386,5.232179980753564,4.421670746459654,5.964531691785195,6.18267182041576,5.682709266579435,0.7989404078697682,8.014191604701601,5.725183245863183,1.5992556513561784,4.403155033171329,14.126828350805464,9.739027072074142,11.221735031712452,2.1213745584754684,13.211230680504922,3.018606947646746,3.9920072687222605,0.6810353693812521,12.521328411112291,2.927108153931232,2.396808988354312,12.67340062262858,5.795177715560752,0.4765581076944936,14.280191716763142,13.279916056836086,4.7430820025917475,4.447385754904246,14.902689777258955,6.790048199845966,1.5264622613363643,14.21733186495607,2.640963661656185,14.421374623737092,12.36858644605574,13.776046145988518,4.142089263941376,9.803096753048349,1.5180900343282056,14.643721737961508,10.355349278630753,12.693738365254863,9.690320134373822,14.476644898147692,0.45940926855807973,13.458152558999183,0.028370349802059325,8.429991868174701,0.6087718738276371,0.7512586918806241,5.724381959669302,6.667026575912932,10.046839574969082,1.4774500340447272,8.431271882483967,6.71264572686764,12.014691646509835,5.293599227040778,14.978379305309158,8.430035404675007,4.371712759284235,12.777854434601977,14.938661557216179,4.913410098928091,1.0179282827832992,8.54634683311528,4.737685452482385,11.671637050937257,7.8725492528538075,2.9011621761632886,2.5093560688736662,1.0305873783708552,14.57251510628008,8.861777313818354,8.988392996335907,4.815510021224533,11.5938391216966,0.39212906025420047,14.207927420206628,1.9890541198210354,1.1834480267253122,11.113767017641726,4.144236519726374,2.7002436263361207,14.08876897646373,7.876394616843207,0.49040032736985983,2.0411207280944996,2.4103816213126517,3.049246171391302,3.010581662265258,2.7386796006574174,11.414302748949549,7.54015877457865,13.850463790269549,12.019525962343687,14.569068992837174,9.885340193039996,7.925842681282683,11.93950371432681,8.272525070877142,5.5805583508887295,8.430240572928625,8.899136000127147,0.6985995472528306,8.86301320180885,5.852763769839841,14.826474768493755,12.381379806868305,0.29171761546547215,3.7919427093463143,13.279235237991719,12.957053742536603,11.842956127214674,12.107319092608206,0.5927130933070579,1.465491157334422,11.6959390889356,1.5229742955058356,2.2143325919388888,9.976809512174487,6.243310622058926,3.0293671556205126,12.178104780814223,11.859870094417532,0.3294801448987439,4.3398045381877495,7.034345301808031,7.853528981305054,14.288654347295223,1.170547534927665,1.0236678088083262,7.785543101307425,11.156782446924153,0.6866135515418104,0.9283757251571112,7.903379873200601,9.963242214800948,6.529834646187428,10.806550101934537,8.763440306283618,13.962920387807369,1.0104328201082258,1.8427660429836235,8.657787792719754,8.071345601208208,14.109857938497862,14.317846525304216,13.498626975838256,9.599921546201644,0.6229697781186971,6.851881978180377,14.41652801874611,3.372033205717214,14.750205677218524,9.274402824435855,13.666400110800035,6.96100596330476,13.948703651192961,9.658004014122048,8.698044997775106,3.237482944965918,6.070074265765529,0.2226334209004599,7.861021903615595,2.1220294153590444,5.500887006456059,14.764572735176046,7.227284220922627,8.4230192287098,11.358892029338772,0.5247686595724244,8.180066037540644,11.38589124534049,0.8202692739342299,4.026066157741428,0.27992532959274175,6.139274560760008,7.090004339552836,2.4633055018390912,2.3258598528314636,7.606843764995361,6.422514225218249,4.739869338509424,3.427851472636431,4.611048127118279,12.085616000203638,0.2787592634990055,13.20450640801879,4.741879111927921,9.123017027101916,3.5745522621230585,12.60543116902998,11.241111879508885,14.612144269173221,8.28019229016176,8.658581194505878,12.958874348185502,9.188983211902656,3.6796477734099797,0.7353972665541153,1.8125560722496303,11.252128719690162,5.75348290476735,3.1774717047681458,11.719079155295724,1.804210000398665,2.826389982613068,9.172558936267253,13.424069278961158,5.288971500444035,9.56512762007906,3.1426553477547134,8.332160482869185,5.179039308827216,8.873676979402948,14.92293367724229,7.767139727387318,2.4385928375733568,10.732684175549862,10.337396311947597,11.85640269581193,0.7073094086615772,10.40029272954152,12.799543033968561,14.306577376924395,1.9069306948246079,5.38570400466949,2.8007358485651555,3.5744457029007757,1.8810350341280713,12.849448687640379,5.4357778800747845,1.8708819031266233,10.535392047063755,11.569628020947311,8.439165811631632,0.4439609053415705,10.70791334986001,14.548232202430677,6.762204379951111,0.12684478347684158,7.514206597592052,14.794027183798143,6.287577564089402,6.232319572980851,3.52446482507807,3.906708478739771,1.1924705801845181,4.000018218782708,9.657419198270249,3.334699637757085,0.07659734359544923,14.293829689477143,5.716302147256601,13.659543277551396,4.899498163924462,10.134378093470461,8.478843631303867,8.736302577200556,4.040166439309832,6.2071864768268625,3.037558733040723,3.45520314140902,2.6150141185916507,10.48620967782106,9.398192395745898,12.605225997607805,4.553052665985128,13.766162305231548,11.305472892907193,11.385660408910645,3.7244906256398314,0.29173977856456146,9.82758194839433,10.159461115126605,6.137494161799667,1.6361656751115028,4.507026987303159,14.843436441422114,10.43841973843566,2.4673850216766158,0.26821854616793317,6.338605212642376,0.3661608325539978,11.029371336124678,5.314835712511558,5.138932858759756,14.55434051068131,10.51122708033626,9.457015247034086,3.821761879104404,14.091875129265144,5.160524511269902,3.3477215468074704,4.114388092865341,2.7565209708067573,12.238353788138367,12.307497158305441,13.012335044080665,5.564921696606061,6.41716651477275,5.291499530850038,14.36227995223922,9.133058510532729,11.110540680896223,14.554756855300948,0.28838082459055725,5.579734872981632,13.991670337426989,9.147996459724858,2.5044833407065825,14.9593203459353,1.752802971936539,6.633019526144103,1.4114302338994278,3.3449941277644104,7.017908579173887,14.271496223164618,4.431849296204908,11.66460392693433,14.129089882958763,1.5211173276162682,10.13867403728797,6.327066677951939,7.478150509950165,7.703049232091304,6.015272639632937,2.493271419584766,5.03262969601866,13.235030935493143,5.143551808514991,12.948527087811133,12.23983143333172,5.3638665819769855,11.359829492199562,11.371380128092664,12.975482488594794,8.55529872616345,12.281826592666583,6.681672442117199,7.397710926573046,13.064770891785564,0.9212782907199801,7.566202909212861,12.687324718598719,5.591654410205852,4.100932967700677,0.16471455078662212,1.176803242249378,10.681500807036324,1.5613891766433896,8.007465029843653,6.4339889882052415,4.874594092639116,10.898088735139721,14.133941142838667,2.871004933041512,14.439602623541033,4.314753581430138,2.114726423220663,12.404685648558813,4.5158139691375245,7.9723233664499045,1.637120260038717,13.433045174152328,5.695588271865553,11.169321927713252,5.910295902966731,4.825047018941552,2.7890304872467264,1.296790469195367,3.925192874653586,10.932678876232501,9.554035252278899,6.289745382623161,9.279571372532072,2.4219241718744944,4.788476545498595,13.296280356512163,13.585324464590512,14.446189600242365,8.709011334532793,10.434094070490541,5.2463912617114685,1.220901751883603,8.025378272195056,4.609131172348269,10.00735498250576,7.540481938123888,3.9262672378616967,2.678523608499833,10.826596647576554,7.883334490238808,10.167719171481282,1.2890935756575872,0.6092744760722202,1.6345924171745863,0.518956615943259,3.94814857494705,7.3365855574921355,10.197647360744597,3.6058812053476776,7.5137946551178105,6.869620090704051,6.240032924857309,4.7707458565360605,8.992926320903775,8.379973613925335,12.76744937859235,0.2876480148146565,8.10650315102551,7.743603797211013,9.166440518098053,10.887161209705166,11.358819703701124,13.731225969129156,10.83191474559619,10.944921312803892,11.742970632705372,0.352688805162199,10.31159446043254,5.682442469574497,14.428965762258525,3.9794801631666123,13.451995641740615,11.682123908149627,6.017733789992708,13.101672315040945,9.142107601542625,3.368201647510831,10.979395159519793,1.3607705517284274,8.058423675540233,13.128772585781016,4.47387249992394,5.542878005118602,10.997760955246992,14.124605088044573,12.281837251882184,14.759666662376961,8.102959279722658,11.084715300216354,1.2971186482212882,14.710482836847916,1.7636192494786274,13.406470020593272,11.357294963088918,11.481063921019818,3.407733622575906,5.805494525135252,4.0142581235414685,11.71213797758499,5.555615704479868,13.037157044611206,14.732256110343506,12.46984340881062,14.055233474613619,1.3128545510327683,10.849954863763124,0.25054285310888047,11.755108093502546,9.626603750385772,13.840341699125542,1.0903391065804324,12.580932625726517,2.4527663259667962,13.989553703757895,10.365470936592466,12.36055353346369,13.570589095720296,2.498135723705449,8.855983079813619,9.267077354042867,1.951138370472385,0.5445117727748683],"p":[0.02169237950766525,0.07523812098476279,0.18335448011251487,0.12716333500662094,0.13530685937067158,0.06156897901026146,0.18084841889965092,0.008491509880702753,0.17238994901268964,1.180115911392221e-6,0.1372286713096413,0.17547386252647496,0.16070849568742906,0.12008704116277352,0.1932117478196272,0.0549988274025969,0.11023866889315746,0.13119768316569078,0.16252228206747155,0.1634406691943474,0.17766242226087037,0.002395851028947682,0.024122647728520533,0.04023610187568161,0.04453045640960114,0.05748317554798055,0.002747559717662851,0.1250342197040697,0.11735959755598331,0.11854744215821196,0.19936682595931854,0.07414090101746669,0.09105181450339571,0.06271558709013272,0.15860775994459986,0.0033823632687402408,0.17381292736837267,0.18018089013588756,0.12920132715831056,0.02527517011063787,0.11492091760686947,0.0890446605508088,0.06221358760819871,0.04714043335836618,0.07777313932878616,0.12640207865001063,0.18723506144349744,0.19176322958109573,0.047214378872803844,0.06367329450229713,0.062199498099756625,0.19718128816495506,0.16028936832735444,0.13569112681995055,0.19800942579457168,0.09600587476635042,0.03491619058124851,0.10326411254847834,0.11975988761873256,0.0073340276948331345,0.01643350013942495,0.002759177956860981,0.12294053652519224,0.07474646209263872,0.13621254471725205,0.13724349568810892,0.019037227213790864,0.18116589751256185,0.10022999909073352,0.0033722983298094533,0.14768504489474102,0.03050200763315827,0.17607582436892444,0.02251335116968685,0.1679493038783571,0.15200921744059814,0.08603560409892208,0.10982231887954437,0.11728284737591435,0.17086190339784466,0.049681918012146435,0.09918077860366387,0.0634029863641715,0.15450808165582697,0.08853887145073146,0.04511526887846942,0.055986609150981796,0.09136622639621739,0.14671027980853632,0.048635159322506505,0.1661995094663801,0.1782227718460018,0.09726154433016712,0.10843352536748499,0.17604647711385898,0.017410672855026423,0.1016244008338208,0.05979330212952619,0.199718902870434,0.18729701355402897,0.018851930221812953,0.10498796786858429,0.04240627937516677,0.0729603331672493,0.08975995821299035,0.1027282338648921,0.08508725967034421,0.01585792312181358,0.1708616827368899,0.07908146806785604,0.03198953407813381,0.08134515792811042,0.15887561530572675,0.005782610191942927,0.0961953945207998,0.00020821159981232462,0.1266459178763984,0.1356346013818496,0.17128098221871912,0.14213246926571174,0.047290185009050405,0.10273068023838894,0.17486332619345657,0.04537658371532758,0.12577576882752992,0.13844123733463562,0.007644001652466726,0.16902984936540483,0.014986405917215518,0.04417434958949143,0.005213490174381219,0.046010064776885254,0.036897662499014716,0.19855856304752062,0.046972433947011984,0.17607202134184827,0.09414576624753607,0.09715491072992832,0.1746772497981926,0.025534763998112456,0.035552992450928,0.10656990717165563,0.045832685925233686,0.012164721269680802,0.0724343810700435,0.016108503925834274,0.13029255901527975,0.06479844290885368,0.0027537103741384072,0.15563123812924562,0.0967580888028385,0.0813711693415919,0.08707024827176851,0.184854584637154,0.0807441311910369,0.013957386055967592,0.025593411713197647,0.15667066263988616,0.1340353498047472,0.10857354889439917,0.08137321692936049,0.07190241910333249,0.18587680540830293,0.11080402334722216,0.03154640370381214,0.19114741124983656,0.04479951473558361,0.08018694134665726,0.055524910286383115,0.13444221146311763,0.1933580518979973,0.16981795381933376,0.06721352976034974,0.12455176186158715,0.07188278392559454,0.07498518497911255,0.009119121384584306,0.12243892322284466,0.1359304443189496,0.1092821779504861,0.13801222983541087,0.02098452033574021,0.06127463703469252,0.1667209547708214,0.13648090882466218,0.092967881976677,0.039726809278388946,0.09003664045762522,0.12007177114053427,0.03847154438900682,0.04678465352339028,0.07298402631561447,0.16858281789108603,0.1807732488876046,0.1797543464216479,0.010904966458149402,0.0585292181300547,0.07325228333961786,0.1507329758343018,0.004434575394193319,0.10938751351964,0.1383015440502641,0.11200418692497949,0.08062755909261479,0.1173858371580216,0.03583736135101092,0.02197472459233185,0.09246342369514027,0.08398181327658812,0.1977948312399488,0.1925374100303714,0.07145921574361438,0.062457840957536793,0.031089281524488754,0.10972088588838741,0.03890961576819359,0.14550561872639164,0.15809829950777612,0.13251067646903425,0.18362503250748707,0.03043281001486573,0.17123277273500623,0.09072647949003194,0.020297070308390987,0.062106387859847345,0.03322640927220162,0.14714064465652354,0.1112881392277124,0.010225944433200906,0.12022690706143213,0.061672275338496355,0.1823575692678778,0.031782331465101656,0.17088988390679655,0.18442755374859596,0.03849442144908384,0.11354288808620311,0.0616916965910288,0.0758135022279891,0.09341228636065058,0.05269744802081231,0.16179314082443202,0.08456890658932302,0.016112417702946892,0.0030042166471351273,0.01953905371785001,0.051645069065992824,0.06989704748596202,0.16929219023691944,0.1615227950166002,0.032326840286144125,0.07386162383056827,0.1971060957428449,0.13309196711216928,0.17218323326130305,0.02494899452246049,0.10955602464668601,0.09182918013461086,0.015236178533591715,0.14456885853629445,0.19923446136586925,0.17122854005395036,0.06811911584640788,0.1279402189435493,0.11553440537745137,0.18534907315078605,0.017050597510143508,0.16488492732490828,0.13880091320589943,0.1255858919915723,0.013858495310434194,0.038579643846366724,0.04671503654955398,0.11368002512294378,0.1079119198714985,0.03421940536187842,0.1834431501145617,0.09114718824464348,0.0939933623314472,0.170541098018917,0.1671505702851187,0.10999235295775547,0.014017579261505554,0.029260629875558886,0.03877023894303991,0.07613938825946237,0.045557797011669315,0.023787097387566816,0.11774687922139165,0.06216411126216928,0.06215956366845035,0.0495335429104502,0.17970823248384585,0.06838510081924412,0.0424094888519492,0.07245460847555396,0.07802058702907351,0.08322461162968474,0.10918865348749769,0.0846177927705699,0.053377166192845764,0.09177954272866523,0.12490247265959696,0.1413166228343623,0.024228054374802268,0.08878354123886965,0.08698074153028933,0.04526024293370759,0.015933641986035998,0.03530055489777242,0.05469575239397831,0.005750370451457255,0.12382953835867619,0.1682713673201895,0.15883884191208156,0.14276452652273375,0.032850796949909,0.1290047199426542,0.1793306070619996,0.18102859925141918,0.14296121782776564,0.12111879518234794,0.07363346383178175,0.0931327681379619,0.048148846291566155,0.03695566792698548,0.1809263367283136,0.11025571496662355,0.12429552112203855,0.139732374595502,0.09503620469721241,0.03930442454155086,0.17459593178430244,0.059995074103048385,0.004616550337329173,0.06372003879056996,0.028094258282336117,0.11198361642834001,0.007750220576579947,0.022042671733331434,0.009291677828519385,0.19236224243465905,0.07323171617899242,0.14587710234178677,0.12024115061581675,0.1214970289277177,0.0069109707164112695,0.05354674131296147,0.09272564231482448,0.09390654418614913,0.059143241154984955,0.19794246302670027,0.1372127577110128,0.12331523329130488,0.16510286030566276,0.032960158813572664,0.006089586429266581,0.19318919397158224,0.18496289741302127,0.040092111685936564,0.18039243275362038,0.17840106631485644,0.13417502502654854,0.13224790851514162,0.06026376897586823,0.16165166771040843,0.15505800119732782,0.0077481010182012255,0.196408176610578,0.014969849048013684,0.11902074159315448,0.014438435376996718,0.1863767735386168,0.021922575596870476,0.07083752941648469,0.018268403605859664,0.18594469487910464,0.05705290847324354,0.1303689621665301,0.11929671017811799,0.08698839535499286,0.07102387839090599,0.16571451050825853,0.09136317905453716,0.1254686463700579,0.18858354111566242,0.05693807870874728,0.07569645224391071,0.02762717345154222,0.04093114977125456,0.12320936566330803,0.19010085904342025,0.17155893886482315,0.0024385541324428496,0.18683881681279915,0.13648816608826575,0.11554467500139438,0.07069155825983486,0.0727429993969702,0.06278270688123984,0.008755726499040817,0.08368483796628623,0.1082365293462718,0.03315614223950405,0.1835542651998211,0.0637745029861757,0.19347719254813153,0.10551893085182291,0.06984738541212292,0.13052813351726528,0.03129465921049803,0.0412532168074744,0.13247175886207724,0.18946073073404604,0.11594899832981427,0.09788916434525069,0.07924320903914822,0.11660576782950427,0.13376484875435565,0.17231579333675617,0.07407318069508509,0.0825949499805883,0.10723641524864164,0.18049708357359173,0.05529994959450897,0.02066717294735203,0.05597919910437108,0.10807074440805381,0.18220462558163272,0.1279446632446203,0.09332604853968243,0.12667002796352272,0.1786671869365356,0.0003913755704298971,0.15757224533738162,0.08060332977692011,0.1288005380825188,0.1994777020891157,0.10753502201875734,0.10841599785821449,0.05072792054507898,0.17760750212688028,0.1378934440115925,0.09137872306084693,0.15645378653024858,0.019264056516593176,0.1026670932990991,0.08973231622515408,0.0617048586276487,0.18945432023331865,0.1978429636532485,0.12406590012433508,0.10738962140762053,0.040241413054475976,0.1862799214461509,0.16497819161272634,0.11122890788300564,0.07889602395848404,0.006410654792987369,0.09268723587202787,0.15162523774279446,0.051405474202039475,0.000934167690359411,0.08856262878416642,0.17562120299164743,0.02520842354436823,0.02077449176712061,0.18696394661243387,0.18894781983486736,0.1233243592174984,0.04398436870184424,0.16447129747804037,0.09823789124004244,0.19354816641836578,0.11867761883468808,0.19642725981736367,0.12620395984924046,0.13821143051562243,0.06733347430904893,0.10806532374219135,0.063508661357822,0.10176786836351992,0.040199880484292995,0.16506494056965956,0.11705238612557278,0.05945685054256416,0.0637290607566872,0.017111263584681603,0.1842552471623125,0.14257925375464145,0.08833130722081162,0.14474557437599864,0.004562025700349049,0.08278560927098103,0.16971158804337372,0.10279569606319289,0.14072045531991711,0.014075314380854742,0.0027350231604158282,0.060425131129405465,0.18238517295146575,0.049024898600800754,0.032509664841564055,0.14723356345177627,0.17364602184004588,0.06772186870320551,0.13008807166562392,0.08962840363902475,0.12140699395181596,0.005358384016147921,0.15131839128819735,0.1352844398128316,0.018686450372003362,0.009584610348744693,0.07180533471051312,0.07090061606218537,0.03711698227850895,0.1460311647373525,0.017650339691540395,0.12754929886391722,0.05084979851173306,0.059907513337618304,0.14036914630720276,0.036936833814672235,0.14830996056934947,0.03485057337472917,0.08738956769390756,0.14930031311854042,0.02030341224313852,0.04956647517075439,0.03296379185705618,0.0787529990483875,0.06291244588465279,0.010322418777711652,0.05611684274311131,0.006435919478821406,0.07297031310463313,0.15146228724715893,0.0481863247511281,0.026394863152162353,0.12053773915578714,0.17065817419697304,0.044090812467088195,0.14638269916256674,0.11697312536833092,0.09060865971531565,0.05076460084029653,0.18835337214036685,0.18339527626549545,0.04063306755785803,0.012440359634439525,0.16864160523343227,0.10566108690868004,0.12151456910743114,0.08761184149561695,0.06969370105768462,0.03469792312012241,0.0246125240434016,0.19428109391181045,0.04176876784658075,0.014690932147316716,0.07538091295015548,0.1782972958300583,0.07668420209917542,0.11613045620328322,0.003740175252396583,0.18559342608195908,0.1405266500790234,0.1852812451663266,0.07953659114828784,0.16991532003726395,0.06206767179041868,0.02330168992297521,0.16866468742576066,0.18294271384512834,0.03064867632987376,0.06492055054830596,0.06902885466881674,0.03288838842831883,0.1191634006120844,0.03353952895896404,0.03045390613043275,0.14014950657768055,0.09092619531672451,0.13612802936995064,0.04430994615666797,0.17572786579569458,0.06503808012867318,0.17546973351744322,0.03670071942657978,0.10859018775708847,0.05102277884230633,0.024578190791978163,0.1615374751973987,0.14169937021320833,0.14130663041151847,0.1578058562113693,0.18923450844909398,0.105381233015753,0.03443926636638319,0.024769884653402886,0.07780731645787307,0.07413481310787846,0.06884106451278611,0.04214393997857764,0.09318094045042527,0.03793418329469955,0.1909361227324966,0.058918379327670814,0.0015049933902369973,0.18330088930143604,0.10996675767248815,0.013885049211639224,0.15291268301511274,0.011319590746141861,0.13707645562731238,0.11880209525094423,0.1004057260853319,0.06723061601958893,0.02068123116670888,0.16214515584423428,0.1289956723074417,0.011743716835417618,0.012651949849383294,0.19723479593685408,0.19095616905689985,0.19241529076010175,0.19833814653561058,0.009344572679651586,0.17004883267978033,0.10523253095000018,0.06938063345280168,0.060394394748628115,0.1141720110845621,0.16290277924461513,0.13819878279562312,0.07908139436449693,0.006355545665486906,0.13237487118267027,0.1855327444050702,0.08797067178618811,0.17921377426093438,0.007809813738927973,0.12129986889150257,0.13360611947664142,0.009917610143753608,0.1305996049948599,0.19003941982107098,0.1597644285622628,0.08757996596346547,0.020572447930920657,0.05529802037142462,0.04548198283486307,0.15009934439846126,0.041892194158030055,0.159463500572475,0.1478641152183256,0.13783208843173034,0.1935868972911925,0.14409921597172423,0.15933472786594277,0.07885434233326305,0.06523533989278799,0.014103592831580514,0.17543034433350202,0.07899289569734816,0.18584739906558473,0.1723246956469022,0.01252633463639885,0.12172903934660986,0.086702764392364,0.1743431868044293,0.06717763629159182,0.06700951533306503,0.0586475380088991,0.08129767662049661,0.14493428492671825,0.08395430707196559,0.0661400819928974,0.06187519057977804,0.1252276954917771,0.020240811680444983,0.1439772505400395,0.005232673092994845,0.10249737330806248,0.17012483369561693,0.11436482754979599,0.04985126231567745,0.12440061579457905,0.09154220063243637,0.15409230529887075,0.0011795066881750583,0.1586557215978211,0.1170512335641575,0.1778825507371068,0.15107959075700342,0.10571969220225559,0.07246479343280435,0.1049364202520144,0.10110947993216556,0.15020435234001572,0.010783660770471083,0.09215153898863604,0.05921241787742777,0.1328799023283251,0.1557322619138197,0.14225579279306744,0.06808954358208075,0.09425297958053949,0.1256647740751677,0.12797352991033462,0.12433318049117124,0.06702398538145356,0.15242449447391893,0.05413143567658283,0.019755000517455868,0.025682018330030056,0.04926968659479023,0.09653141280816491,0.10466021164263589,0.11452698755656776,0.19641567342410216,0.029095575871358338,0.02673839808118128,0.051443984833738333,0.06040952487286999,0.17796324711399714,0.1857031593827402,0.018357442344219255,0.015739106063922526,0.17250595298555893,0.18820786897451597,0.14025489485021506,0.019658417753120584,0.028660625613159452,0.14388322294077138,0.04518567801239111,0.11425691424304692,0.024477005219535598,0.038194340947555895,0.17346080368559919,0.03325480990241521,0.07131432217605856,0.1837408704393198,0.1853830667521076,0.15488070176530191,0.025954345792502442,0.0011158716049565864,0.01786336086271505,0.04090611238080708,0.042148446903562856,0.06055532420026282,0.09672874281608368,0.041610217631004566,0.18360673780052364,0.19044556839749013,0.057639099944551124,0.11518975039038293,0.04345171052179513,0.05893169723684495,0.04023220206715679,0.19261137712793805,0.09282701935057709,0.07798426186024231,0.1256321643467156,0.04505846886644243,0.09818672635194972,0.0837738952707948,0.1665500433764474,0.19900806959614817,0.16038175881467362,0.07059836515711333,0.04273135685075156,0.15124605543199882,0.15585628417865194,0.06852264702052926,0.03380594198675962,0.058619789078725226,0.18814367895036593,0.13981307980874944,0.12839321187955707,0.041205956501271505,0.19082805270710157,0.19886420720813316,0.13651999471518647,0.1077741551035481,0.07736575873212935,0.05502604103395181,0.07633099545968025,0.1851723957263572,0.1291400460670598,0.08704290837725628,0.04861814027025209,0.1473087756583562,0.09892707961341314,0.18952693748142685,0.03142879075210656,0.17912845716686734,0.09863986055770396,0.05608145406033818,0.0922612599763879,0.061558414036445575,0.031478299502834386,0.07005690368479743,0.12132755848452229,0.035250011094259515,0.14051710269253484,0.14073429782110264,0.1542399360747816,0.012866297861991472,0.14388199319602268,0.1548186123931109,0.1570387433384414,0.005485299501710817,0.1199255363087938,0.16664399321010054,0.036172161024658235,0.0653046062744279,0.02127624411254088,0.037244498921901674,0.03694547455373298,0.0816466922336729,0.08408015035007953,0.09435757635393559,0.10552130492610196,0.1718237360323871,0.027343735223420262,0.00979889899813613,0.10122293995535321,0.02355206227424396,0.08911234847369882,0.050755910291422526,0.14701635882358666,0.11326037227657869,0.10863836969155188,0.0397939139902459,0.07715378409360488,0.11674428499972228,0.08918458500206583,0.14742602024904916,0.015381060443841223,0.07213497483629903,0.16984508870085527,0.10609194083506956,0.10065761026099858,0.03663080380574053,0.17819738188393922,0.06688534842362062,0.13540453033483382,0.0033463131448279618,0.18229231244841052,0.07201942578912406,0.18719809933099132,0.12142158492313011,0.10375170911948697,0.06683397287416395,0.17153482025463293,0.16060161160788713,0.03578847444459048,0.0593280142816091,0.123692582735658,0.181622964590586,0.08004121081211678,0.14568122311240406,0.04438155834870701,0.15101252658881342,0.09681016138824194,0.1546438113706414,0.19779899808656035,0.160586289870934,0.19091013000632492,0.0071070866159117065,0.0004152305550856994,0.11884587726591743,0.19330448535502304,0.029359090698644508,0.1460950817172127,0.18351487588791013,0.046376554448976974,0.1735597737933318,0.051169562753004355,0.03944219099189592,0.035857581213015965,0.18871507482513247,0.18403583626105308,0.05363914758405324,0.03274660336289288,0.1078759327699717,0.09720532008883397,0.0656990393311843,0.08889468986963817,0.18836615401942441,0.03303838253241875,0.10934943407145298,0.0357808736104702,0.06064122930638671,0.010762370849013082,0.052462397603715516,0.03962299881874905,0.0005541408650613366,0.005010296695983962,0.13195622218331393,0.1428686419108359,0.16742509638472886,0.0026311890919795467,0.12723930557361182,0.0755495052449053,0.01026366946232784,0.14631464895824806,0.19425181981620523,0.1247340252447775,0.01941589724846504,0.19747893863451096,0.03793239236024962,0.0799228470968064,0.1662408465768083,0.01572832507050146,0.03971876918362565,0.1381279775258389,0.06831932990901209,0.0012726550570829167,0.15720068496232523,0.1903903338009072,0.004648371970731135,0.05213138510986828,0.1273548982891309,0.03314103785433762,0.12221518053701633,0.07941238709343819,0.0034068704773952962,0.13313423400039714,0.10591301398226843,0.07758532003792924,0.07155652072679893,0.1407079238427032,0.19277883316567632,0.062035894621640345,0.11684724583653194,0.08139734069454377,0.1947286046361145,0.12365984010653262,0.04817267941138681,0.0004379125493328307,0.12376541154668011,0.11196735334099683,0.07031352921764987,0.08140811591357743,0.07740334891115355,0.00665439830034722,0.03796841049640492,0.002780624256388409,0.0017053758367753247,0.08688400102928369,0.14989761311354194,0.009994824806588688,0.02369363346732887,0.12843672755814892,0.13481633018518768,0.05567651664676703,0.16423363508964367,0.029641922610255823,0.12742160950847845,0.18298395798994016,0.040003170138461774,0.18040045329412435,0.1929790136179122,0.17119754722124855,0.053310415874455466,0.095646114256586,0.1479610604112554,0.044848440272069606,0.1543037951367522,0.09395070866524163,0.07930437854080391,0.16515898110488494,0.19767415845145442,0.14878628309110026,0.09189708316181089,0.0722922476556875,0.0041695242769026475,0.00819312518604609,0.07926816542154023,0.13743950010002362,0.025404066918117432,0.06886705357137304,0.05091928105452492,0.170294122260761,0.1642116616164192,0.19958272517101838,0.1160024956222122,0.10933165637602311,0.0929561656448311,0.03729271837611527,0.15447476168408292,0.06961279808967072,0.09857496739956884,0.10663979993165743,0.03150156289542632,0.08727473260776963,0.0948501113685262],"n":[11,3,6,11,1,2,14,3,14,18,13,1,12,1,19,12,20,13,2,11,16,16,9,8,14,13,6,5,20,5,4,7,11,20,18,13,15,3,10,19,3,16,12,11,7,6,3,11,19,9,9,7,7,9,5,14,5,12,10,5,20,8,9,13,19,14,18,10,7,16,12,16,2,4,14,0,11,20,6,2,12,19,18,9,2,15,7,13,17,2,13,10,20,9,7,20,18,20,4,15,9,1,12,20,1,18,6,4,17,4,10,8,18,9,13,8,9,2,12,3,16,4,1,0,9,4,8,4,10,12,5,17,12,1,16,16,16,15,16,19,2,20,4,17,11,14,6,20,10,7,9,20,19,5,20,13,2,13,10,20,2,11,12,2,11,2,15,8,12,1,7,8,12,3,12,11,14,7,7,0,10,5,14,12,11,8,8,9,5,19,8,8,9,3,18,13,18,6,17,9,15,3,10,18,12,4,8,16,0,8,2,17,3,18,8,11,6,11,4,13,16,19,8,8,1,14,0,17,14,14,12,14,6,14,12,5,1,7,13,6,17,6,17,5,10,2,10,2,12,0,11,12,15,19,9,12,13,2,10,12,14,18,19,6,19,8,18,8,3,5,20,12,3,15,3,20,6,16,0,15,14,7,16,14,14,11,18,14,0,16,14,0,5,14,18,1,10,15,16,15,2,19,7,7,19,18,6,8,1,14,12,5,8,1,1,3,19,3,13,14,3,16,6,14,19,11,11,8,13,17,8,6,0,7,7,10,1,1,16,9,6,8,17,20,4,10,20,2,11,2,4,4,11,11,9,10,18,9,3,14,15,15,8,17,1,5,12,19,9,5,18,15,2,14,10,19,13,9,20,12,19,1,19,14,14,7,1,18,12,12,14,1,16,2,4,18,6,19,11,15,13,11,3,2,5,15,3,10,3,1,5,16,15,12,17,14,9,9,14,16,0,2,15,17,1,5,8,18,1,12,17,10,19,11,15,7,9,17,9,9,6,9,9,9,2,13,18,7,3,17,15,3,1,20,19,16,14,4,20,13,7,7,2,19,15,13,14,19,10,10,7,4,15,5,4,19,7,15,10,11,6,17,16,7,6,14,8,15,15,17,9,11,6,9,7,5,9,13,13,0,0,1,17,10,5,9,5,10,4,0,11,8,19,2,14,18,6,16,6,7,6,2,12,9,19,12,12,12,16,8,8,5,11,16,2,5,11,6,11,17,1,18,15,1,13,10,18,0,18,4,1,18,10,8,14,3,10,2,10,10,20,12,7,10,4,14,16,18,6,4,10,10,19,18,6,2,2,12,18,5,4,8,10,7,3,20,10,17,16,17,6,12,9,16,6,18,18,14,0,14,9,16,14,19,20,0,4,11,18,18,5,10,20,13,13,11,12,4,5,9,10,1,12,4,0,17,3,5,12,15,7,19,5,13,3,12,1,3,14,18,1,10,10,11,9,10,0,12,17,1,12,12,18,11,12,12,14,1,5,6,8,12,8,17,9,10,15,3,12,8,20,4,17,9,3,1,20,19,9,8,8,16,2,8,13,13,12,17,17,14,16,9,5,9,9,13,9,19,4,12,1,13,13,10,16,0,10,1,5,13,15,3,15,10,8,2,5,13,5,17,20,13,14,13,6,10,2,5,10,10,0,20,19,15,9,12,3,13,5,3,3,20,3,17,11,5,5,4,9,12,9,18,6,1,5,19,7,16,7,13,7,1,8,19,13,19,7,4,2,17,7,1,17,0,14,2,14,1,16,6,11,16,2,6,11,10,16,1,5,3,14,18,20,7,11,12,7,6,4,2,11,17,20,19,13,7,19,5,18,5,14,6,12,8,13,18,19,13,2,12,19,5,2,5,9,0,17,1,17,9,17,3,13,11,12,11,9,2,8,9,8,19,18,17,15,11,17,17,18,18,6,18,3,13,14,1,5,17,16,16,8,11,6,7,7,7,6,7,10,18,9,14,6,15,9,3,16,4,15,4,0,14,18,15,4,2,15,8,16,15,14,16,17,2,19,19,9,11,16,1,8,17,9,17,3,18,8,10,11,3,13,18,2,9,16,10,18,8,3,10,19,13,19,3,18,14,5,13,13,6,17,12,11,17,10,13,10,13,18,14,10,6,17,6,19,12,0,11,17,13,15,7,9,14,9,14,2,17,2,6,0,7,10,13,0,12,2,8,12,18,19,14,16,17,13,15,18,15,4,20,20,7,3,6,12,20,4,10,2,19,16,14,14,16,4,2,7,4,12,0]}
},{}],128:[function(require,module,exports){
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

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallHigh = require( './fixtures/julia/small_high.json' );
var highSmall = require( './fixtures/julia/high_small.json' );
var highHigh = require( './fixtures/julia/high_high.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var mgf = factory( 0.0, 1.0 );
	t.equal( typeof mgf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 20, 0.5 );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, 0.5 );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 20, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided an `n` which is not a nonnegative integer, the created function always returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 20.5, 0.5 );

	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( -10, 0.5 );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( PINF, 0.5 );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NINF, 0.5 );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a success probability `p` outside `[0,1]`, the created function always returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 20, 1.5 );

	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 20, -0.5 );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 20, PINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 20, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the mgf for `x` given large `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var mgf;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = highHigh.expected;
	x = highHigh.x;
	n = highHigh.n;
	p = highHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( n[i], p[i] );
		y = mgf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 15.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the mgf for `x` given large `n` and small `p`', function test( t ) {
	var expected;
	var delta;
	var mgf;
	var tol;
	var n;
	var p;
	var i;
	var x;
	var y;

	expected = highSmall.expected;
	x = highSmall.x;
	n = highSmall.n;
	p = highSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( n[i], p[i] );
		y = mgf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 15.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the mgf for `x` given small `n` and large `p`', function test( t ) {
	var expected;
	var delta;
	var mgf;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = smallHigh.expected;
	x = smallHigh.x;
	n = smallHigh.n;
	p = smallHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( n[i], p[i] );
		y = mgf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 6.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the mgf for `x` given small `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var mgf;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = smallSmall.expected;
	x = smallSmall.x;
	n = smallSmall.n;
	p = smallSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( n[i], p[i] );
		y = mgf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 7.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/binomial/mgf/test/test.factory.js")
},{"./../lib/factory.js":121,"./fixtures/julia/high_high.json":124,"./fixtures/julia/high_small.json":125,"./fixtures/julia/small_high.json":126,"./fixtures/julia/small_small.json":127,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":67,"tape":248}],129:[function(require,module,exports){
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
var mgf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `mgf` functions', function test( t ) {
	t.equal( typeof mgf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/binomial/mgf/test/test.js")
},{"./../lib":122,"tape":248}],130:[function(require,module,exports){
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
var mgf = require( './../lib' );


// FIXTURES //

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallHigh = require( './fixtures/julia/small_high.json' );
var highSmall = require( './fixtures/julia/high_small.json' );
var highHigh = require( './fixtures/julia/high_high.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = mgf( NaN, 10, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 4.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 4.0, 10, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided an `n` which is not a nonnegative integer, the function returns `NaN`', function test( t ) {
	var y;

	y = mgf( 2.0, 1.5, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, -2, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, -1, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 2.5, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, PINF, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a success probability `p` outside of `[0,1]`, the function returns `NaN`', function test( t ) {
	var y;

	y = mgf( 2.0, 20, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 20, 1.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, 20, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, 20, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the mgf for `x` given large `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var n;
	var p;
	var y;
	var i;

	expected = highHigh.expected;
	x = highHigh.x;
	n = highHigh.n;
	p = highHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 15.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the mgf for `x` given large `n` and small `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var n;
	var p;
	var y;
	var i;

	expected = highSmall.expected;
	x = highSmall.x;
	n = highSmall.n;
	p = highSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 15.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the mgf for `x` given small `n` and large `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var n;
	var p;
	var y;
	var i;

	expected = smallHigh.expected;
	x = smallHigh.x;
	n = smallHigh.n;
	p = smallHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 6.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the mgf for `x` given small `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var n;
	var p;
	var y;
	var i;

	expected = smallSmall.expected;
	x = smallSmall.x;
	n = smallSmall.n;
	p = smallSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 7.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/binomial/mgf/test/test.mgf.js")
},{"./../lib":122,"./fixtures/julia/high_high.json":124,"./fixtures/julia/high_small.json":125,"./fixtures/julia/small_high.json":126,"./fixtures/julia/small_small.json":127,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":67,"tape":248}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":131}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":134}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":138}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{"./define_property.js":136}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":135,"./has_define_property_support.js":137,"./polyfill.js":139}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":141,"./polyfill.js":142,"@stdlib/assert/has-tostringtag-support":20}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":143}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":143,"./tostringtag.js":144,"@stdlib/assert/has-own-property":16}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){

},{}],147:[function(require,module,exports){
arguments[4][146][0].apply(exports,arguments)
},{"dup":146}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){
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
},{"_process":240}],150:[function(require,module,exports){
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

},{"events":148,"inherits":235,"readable-stream/lib/_stream_duplex.js":152,"readable-stream/lib/_stream_passthrough.js":153,"readable-stream/lib/_stream_readable.js":154,"readable-stream/lib/_stream_transform.js":155,"readable-stream/lib/_stream_writable.js":156,"readable-stream/lib/internal/streams/end-of-stream.js":160,"readable-stream/lib/internal/streams/pipeline.js":162}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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
},{"./_stream_readable":154,"./_stream_writable":156,"_process":240,"inherits":235}],153:[function(require,module,exports){
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
},{"./_stream_transform":155,"inherits":235}],154:[function(require,module,exports){
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
},{"../errors":151,"./_stream_duplex":152,"./internal/streams/async_iterator":157,"./internal/streams/buffer_list":158,"./internal/streams/destroy":159,"./internal/streams/from":161,"./internal/streams/state":163,"./internal/streams/stream":164,"_process":240,"buffer":165,"events":148,"inherits":235,"string_decoder/":247,"util":146}],155:[function(require,module,exports){
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
},{"../errors":151,"./_stream_duplex":152,"inherits":235}],156:[function(require,module,exports){
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
},{"../errors":151,"./_stream_duplex":152,"./internal/streams/destroy":159,"./internal/streams/state":163,"./internal/streams/stream":164,"_process":240,"buffer":165,"inherits":235,"util-deprecate":256}],157:[function(require,module,exports){
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
},{"./end-of-stream":160,"_process":240}],158:[function(require,module,exports){
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
},{"buffer":165,"util":146}],159:[function(require,module,exports){
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
},{"_process":240}],160:[function(require,module,exports){
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
},{"../../../errors":151}],161:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],162:[function(require,module,exports){
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
},{"../../../errors":151,"./end-of-stream":160}],163:[function(require,module,exports){
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
},{"../../../errors":151}],164:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":148}],165:[function(require,module,exports){
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
},{"base64-js":145,"buffer":165,"ieee754":234}],166:[function(require,module,exports){
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

},{"./":167,"get-intrinsic":230}],167:[function(require,module,exports){
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

},{"function-bind":229,"get-intrinsic":230}],168:[function(require,module,exports){
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

},{"./lib/is_arguments.js":169,"./lib/keys.js":170}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],171:[function(require,module,exports){
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

},{"object-keys":238}],172:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],173:[function(require,module,exports){
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

},{"./ToNumber":203,"./ToPrimitive":205,"./Type":210}],174:[function(require,module,exports){
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

},{"../helpers/isFinite":219,"../helpers/isNaN":220,"../helpers/isPrefixOf":221,"./ToNumber":203,"./ToPrimitive":205,"./Type":210,"get-intrinsic":230}],175:[function(require,module,exports){
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

},{"get-intrinsic":230}],176:[function(require,module,exports){
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

},{"./DayWithinYear":179,"./InLeapYear":183,"./MonthFromTime":193,"get-intrinsic":230}],177:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":225,"./floor":214}],178:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":214}],179:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":177,"./DayFromYear":178,"./YearFromTime":212}],180:[function(require,module,exports){
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

},{"./modulo":215}],181:[function(require,module,exports){
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

},{"../helpers/assertRecord":218,"./IsAccessorDescriptor":184,"./IsDataDescriptor":186,"./Type":210,"get-intrinsic":230}],182:[function(require,module,exports){
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

},{"../helpers/timeConstants":225,"./floor":214,"./modulo":215}],183:[function(require,module,exports){
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

},{"./DaysInYear":180,"./YearFromTime":212,"get-intrinsic":230}],184:[function(require,module,exports){
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

},{"../helpers/assertRecord":218,"./Type":210,"has":233}],185:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":236}],186:[function(require,module,exports){
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

},{"../helpers/assertRecord":218,"./Type":210,"has":233}],187:[function(require,module,exports){
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

},{"../helpers/assertRecord":218,"./IsAccessorDescriptor":184,"./IsDataDescriptor":186,"./Type":210}],188:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":222,"./IsAccessorDescriptor":184,"./IsDataDescriptor":186,"./Type":210}],189:[function(require,module,exports){
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

},{"../helpers/isFinite":219,"../helpers/timeConstants":225}],190:[function(require,module,exports){
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

},{"../helpers/isFinite":219,"./DateFromTime":176,"./Day":177,"./MonthFromTime":193,"./ToInteger":202,"./YearFromTime":212,"./floor":214,"./modulo":215,"get-intrinsic":230}],191:[function(require,module,exports){
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

},{"../helpers/isFinite":219,"../helpers/timeConstants":225,"./ToInteger":202}],192:[function(require,module,exports){
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

},{"../helpers/timeConstants":225,"./floor":214,"./modulo":215}],193:[function(require,module,exports){
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

},{"./DayWithinYear":179,"./InLeapYear":183}],194:[function(require,module,exports){
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

},{"../helpers/isNaN":220}],195:[function(require,module,exports){
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

},{"../helpers/timeConstants":225,"./floor":214,"./modulo":215}],196:[function(require,module,exports){
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

},{"./Type":210}],197:[function(require,module,exports){
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


},{"../helpers/isFinite":219,"./ToNumber":203,"./abs":213,"get-intrinsic":230}],198:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":225,"./DayFromYear":178}],199:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":225,"./modulo":215}],200:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],201:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":203}],202:[function(require,module,exports){
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

},{"../helpers/isFinite":219,"../helpers/isNaN":220,"../helpers/sign":224,"./ToNumber":203,"./abs":213,"./floor":214}],203:[function(require,module,exports){
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

},{"./ToPrimitive":205}],204:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":175,"get-intrinsic":230}],205:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":226}],206:[function(require,module,exports){
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

},{"./IsCallable":185,"./ToBoolean":200,"./Type":210,"get-intrinsic":230,"has":233}],207:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":230}],208:[function(require,module,exports){
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

},{"../helpers/isFinite":219,"../helpers/isNaN":220,"../helpers/sign":224,"./ToNumber":203,"./abs":213,"./floor":214,"./modulo":215}],209:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":203}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":177,"./modulo":215}],212:[function(require,module,exports){
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

},{"call-bind/callBound":166,"get-intrinsic":230}],213:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":230}],214:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],215:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":223}],216:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":225,"./modulo":215}],217:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":173,"./5/AbstractRelationalComparison":174,"./5/CheckObjectCoercible":175,"./5/DateFromTime":176,"./5/Day":177,"./5/DayFromYear":178,"./5/DayWithinYear":179,"./5/DaysInYear":180,"./5/FromPropertyDescriptor":181,"./5/HourFromTime":182,"./5/InLeapYear":183,"./5/IsAccessorDescriptor":184,"./5/IsCallable":185,"./5/IsDataDescriptor":186,"./5/IsGenericDescriptor":187,"./5/IsPropertyDescriptor":188,"./5/MakeDate":189,"./5/MakeDay":190,"./5/MakeTime":191,"./5/MinFromTime":192,"./5/MonthFromTime":193,"./5/SameValue":194,"./5/SecFromTime":195,"./5/StrictEqualityComparison":196,"./5/TimeClip":197,"./5/TimeFromYear":198,"./5/TimeWithinDay":199,"./5/ToBoolean":200,"./5/ToInt32":201,"./5/ToInteger":202,"./5/ToNumber":203,"./5/ToObject":204,"./5/ToPrimitive":205,"./5/ToPropertyDescriptor":206,"./5/ToString":207,"./5/ToUint16":208,"./5/ToUint32":209,"./5/Type":210,"./5/WeekDay":211,"./5/YearFromTime":212,"./5/abs":213,"./5/floor":214,"./5/modulo":215,"./5/msFromTime":216}],218:[function(require,module,exports){
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

},{"get-intrinsic":230,"has":233}],219:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],220:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],221:[function(require,module,exports){
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

},{"call-bind/callBound":166}],222:[function(require,module,exports){
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

},{"get-intrinsic":230,"has":233}],223:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],224:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],225:[function(require,module,exports){
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

},{}],226:[function(require,module,exports){
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

},{"./helpers/isPrimitive":227,"is-callable":236}],227:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],228:[function(require,module,exports){
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

},{}],229:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":228}],230:[function(require,module,exports){
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

},{"function-bind":229,"has":233,"has-symbols":231}],231:[function(require,module,exports){
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

},{"./shams":232}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":229}],234:[function(require,module,exports){
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

},{}],235:[function(require,module,exports){
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

},{}],236:[function(require,module,exports){
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

},{}],237:[function(require,module,exports){
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

},{"./isArguments":239}],238:[function(require,module,exports){
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

},{"./implementation":237,"./isArguments":239}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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

},{}],241:[function(require,module,exports){
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
},{"_process":240,"through":254,"timers":255}],242:[function(require,module,exports){
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

},{"buffer":165}],243:[function(require,module,exports){
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

},{"es-abstract/es5":217,"function-bind":229}],244:[function(require,module,exports){
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

},{"./implementation":243,"./polyfill":245,"./shim":246,"define-properties":171,"function-bind":229}],245:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":243}],246:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":245,"define-properties":171}],247:[function(require,module,exports){
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
},{"safe-buffer":242}],248:[function(require,module,exports){
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
},{"./lib/default_stream":249,"./lib/results":251,"./lib/test":252,"_process":240,"defined":172,"through":254,"timers":255}],249:[function(require,module,exports){
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
},{"_process":240,"fs":147,"through":254}],250:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":240,"timers":255}],251:[function(require,module,exports){
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
},{"_process":240,"events":148,"function-bind":229,"has":233,"inherits":235,"object-inspect":253,"resumer":241,"through":254,"timers":255}],252:[function(require,module,exports){
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
},{"./next_tick":250,"deep-equal":168,"defined":172,"events":148,"has":233,"inherits":235,"path":149,"string.prototype.trim":244}],253:[function(require,module,exports){
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

},{}],254:[function(require,module,exports){
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
},{"_process":240,"stream":150}],255:[function(require,module,exports){
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
},{"process/browser.js":240,"timers":255}],256:[function(require,module,exports){
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
},{}]},{},[128,129,130]);
