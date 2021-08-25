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

},{"@stdlib/utils/native-class":105}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":105}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":105}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":105}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* One half times the mathematical constant `π`.
*
* @module @stdlib/constants/float64/half-pi
* @type {number}
*
* @example
* var HALF_PI = require( '@stdlib/constants/float64/half-pi' );
* // returns 1.5707963267948966
*/


// MAIN //

/**
* One half times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 1.5707963267948966
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var HALF_PI = 1.5707963267948966;


// EXPORTS //

module.exports = HALF_PI;

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

},{"@stdlib/number/ctor":70}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":46,"@stdlib/constants/float64/pinf":48}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":57}],57:[function(require,module,exports){
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var PIO2 = require( '@stdlib/constants/float64/half-pi' );
var PIO4 = require( '@stdlib/constants/float64/fourth-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS.
var T3P8 = 2.41421356237309504880; // tan( 3*pi/8 )


// MAIN //

/**
* Computes the arctangent of a number.
*
* ## Method
*
* -   Range reduction is from three intervals into the interval from 0 to 0.66. The approximant uses a rational function of degree 4/5 of the form
*
*     ```tex
*     x + x^3 \frac{P(x)}{Q(x)}
*     ```
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain  | # trials | peak    | rms     |
*     |:-----------|:--------|:---------|:--------|:--------|
*     | DEC        | -10, 10 | 50000    | 2.4e-17 | 8.3e-18 |
*     | IEEE       | -10, 10 | 10^6     | 1.8e-16 | 5.0e-17 |
*
* @param {number} x - input value
* @returns {number} arctangent (in radians)
*
* @example
* var v = atan( 0.0 );
* // returns ~0.0
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
*
* var v = atan( -PI/4.0 );
* // returns ~-0.666
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
*
* var v = atan( PI/4.0 );
* // returns ~0.666
*
* @example
* var v = atan( NaN );
* // returns NaN
*/
function atan( x ) {
	var flg;
	var sgn;
	var y;
	var z;
	if ( isnan( x ) || x === 0.0 ) {
		return x;
	}
	if ( x === PINF ) {
		return PIO2;
	}
	if ( x === NINF ) {
		return -PIO2;
	}
	if ( x < 0.0 ) {
		sgn = true;
		x = -x;
	}
	// Range reduction:
	flg = 0;
	if ( x > T3P8 ) {
		y = PIO2;
		flg = 1;
		x = -( 1.0/x );
	}
	else if ( x <= 0.66 ) {
		y = 0.0;
	}
	else {
		y = PIO4;
		flg = 2;
		x = (x-1.0) / (x+1.0);
	}
	z = x * x;
	z = z*polyvalP( z ) / polyvalQ( z );
	z = ( x*z ) + x;
	if ( flg === 2 ) {
		z += 0.5 * MOREBITS;
	}
	else if ( flg === 1 ) {
		z += MOREBITS;
	}
	y += z;
	return ( sgn ) ? -y : y;
}


// EXPORTS //

module.exports = atan;

},{"./polyval_p.js":60,"./polyval_q.js":61,"@stdlib/constants/float64/fourth-pi":44,"@stdlib/constants/float64/half-pi":45,"@stdlib/constants/float64/ninf":46,"@stdlib/constants/float64/pinf":48,"@stdlib/math/base/assert/is-nan":54}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the arctangent of a number.
*
* @module @stdlib/math/base/special/atan
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
* var atan = require( '@stdlib/math/base/special/atan' );
*
* var v = atan( 0.0 );
* // returns ~0.0
*
* v = atan( -PI/4.0 );
* // returns ~-0.666
*
* v = atan( PI/4.0 );
* // returns ~0.666
*
* v = atan( NaN );
* // returns NaN
*/

// MODULES //

var atan = require( './atan.js' );


// EXPORTS //

module.exports = atan;

},{"./atan.js":58}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return -64.85021904942025;
	}
	return -64.85021904942025 + (x * (-122.88666844901361 + (x * (-75.00855792314705 + (x * (-16.157537187333652 + (x * -0.8750608600031904))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
		return 194.5506571482614;
	}
	return 194.5506571482614 + (x * (485.3903996359137 + (x * (432.88106049129027 + (x * (165.02700983169885 + (x * (24.858464901423062 + (x * 1.0))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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

/**
* Compute the angle in the plane (in radians) between the positive x-axis and the ray from `(0,0)` to the point `(x,y)`.
*
* @module @stdlib/math/base/special/atan2
*
* @example
* var atan2 = require( '@stdlib/math/base/special/atan2' );
*
* var v = atan2( 2.0, 2.0 ); // => atan(1.0)
* // returns ~0.785
*
* v = atan2( 6.0, 2.0 ); // => atan(3.0)
* // returns ~1.249
*
* v = atan2( -1.0, -1.0 ); // => atan(1.0) - π
* // returns ~-2.356
*
* v = atan2( 3.0, 0.0 ); // => π/2
* // returns ~1.571
*
* v = atan2( -2.0, 0.0 ); // => -π/2
* // returns ~-1.571
*
* v = atan2( 0.0, 0.0 );
* // returns 0.0
*
* v = atan2( 3.0, NaN );
* // returns NaN
*
* v = atan2( NaN, 2.0 );
* // returns NaN
*/

// MODULES //

var atan2 = require( './main.js' );


// EXPORTS //

module.exports = atan2;

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
*
*
* ## Notice
*
* The original code, copyright and license are from [Go]{@link https://golang.org/src/math/atan2.go}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (c) 2009 The Go Authors. All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are
* met:
*
*    * Redistributions of source code must retain the above copyright
* notice, this list of conditions and the following disclaimer.
*    * Redistributions in binary form must reproduce the above
* copyright notice, this list of conditions and the following disclaimer
* in the documentation and/or other materials provided with the
* distribution.
*    * Neither the name of Google Inc. nor the names of its
* contributors may be used to endorse or promote products derived from
* this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
* A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
* OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* ```
*/

'use strict';

// MODULES //

var isinfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var signbit = require( '@stdlib/number/float64/base/signbit' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var atan = require( '@stdlib/math/base/special/atan' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Computes the angle in the plane (in radians) between the positive x-axis and the ray from `(0,0)` to the point `(x,y)`.
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{atan2}(y,\mathrm{NaN}) &= \mathrm{NaN}\\
* \operatorname{atan2}(\mathrm{NaN},x) &= \mathrm{NaN}\\
* \operatorname{atan2}( +0,x \ge 0 ) &= +0 \\
* \operatorname{atan2}( -0, x \ge 0 ) &= -0 \\
* \operatorname{atan2}( +0,x \le -0 ) &= +\Pi \\
* \operatorname{atan2}( -0, x \le -0 ) &= -\Pi \\
* \operatorname{atan2}(+\infty, +\infty) &= +\tfrac{\Pi}{4} \\
* \operatorname{atan2}(-\infty, +\infty) &= -\tfrac{\Pi}{4} \\
* \operatorname{atan2}(+\infty, -\infty) &= +\tfrac{3\Pi}{4} \\
* \operatorname{atan2}(-\infty, -\infty) &= -\tfrac{3\Pi}{4} \\
* \operatorname{atan2}(y, +\infty) &= 0.0 \\
* \operatorname{atan2}(y>0, -\infty) &= +\Pi \\
* \operatorname{atan2}(y<0, -\infty) &= -\Pi \\
* \operatorname{atan2}(+\infty, x ) &= +\tfrac{\Pi}{2} \\
* \operatorname{atan2}(-\infty, x ) &= -\tfrac{\Pi}{2} \\
* \end{align*}
* ```
*
* @param {number} y - `y` coordinate
* @param {number} x - `x` coordinate
* @returns {number} angle (in radians)
*
* @example
* var v = atan2( 2.0, 2.0 ); // => atan(1.0)
* // returns ~0.785
*
* @example
* var v = atan2( 6.0, 2.0 ); // => atan(3.0)
* // returns ~1.249
*
* @example
* var v = atan2( -1.0, -1.0 ); // => atan(1.0) - π
* // returns ~-2.356
*
* @example
* var v = atan2( 3.0, 0.0 ); // => π/2
* // returns ~1.571
*
* @example
* var v = atan2( -2.0, 0.0 ); // => -π/2
* // returns ~-1.571
*
* @example
* var v = atan2( 0.0, 0.0 );
* // returns 0.0
*
* @example
* var v = atan2( 3.0, NaN );
* // returns NaN
*
* @example
* var v = atan2( NaN, 2.0 );
* // returns NaN
*/
function atan2( y, x ) {
	var q;
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	if ( isinfinite( x ) ) {
		if ( x === PINF ) {
			if ( isinfinite( y ) ) {
				return copysign( PI / 4.0, y );
			}
			return copysign( 0.0, y );
		}
		// Case: x is -Infinity
		if ( isinfinite( y ) ) {
			return copysign( 3.0*PI/4.0, y );
		}
		return copysign( PI, y );
	}
	if ( isinfinite( y ) ) {
		return copysign( PI / 2.0, y );
	}
	if ( y === 0.0 ) {
		if ( x >= 0.0 && !signbit( x ) ) {
			return copysign( 0.0, y );
		}
		return copysign( PI, y );
	}
	if ( x === 0.0 ) {
		return copysign( PI / 2.0, y );
	}
	q = atan( y / x );
	if ( x < 0.0 ) {
		if ( q <= 0.0 ) {
			return q + PI;
		}
		return q - PI;
	}
	return q;
}


// EXPORTS //

module.exports = atan2;

},{"@stdlib/constants/float64/pi":47,"@stdlib/constants/float64/pinf":48,"@stdlib/math/base/assert/is-infinite":52,"@stdlib/math/base/assert/is-nan":54,"@stdlib/math/base/special/atan":59,"@stdlib/math/base/special/copysign":65,"@stdlib/number/float64/base/signbit":81}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/from-words":72,"@stdlib/number/float64/base/get-high-word":76,"@stdlib/number/float64/base/to-words":83}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./copysign.js":64}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ln.js":67}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":68,"./polyval_q.js":69,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":46,"@stdlib/math/base/assert/is-nan":54,"@stdlib/number/float64/base/get-high-word":76,"@stdlib/number/float64/base/set-high-word":79}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":71}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":74}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":73,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":77}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":75,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],78:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":75}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":78,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a boolean indicating if the sign bit is on (true) or off (false).
*
* @module @stdlib/number/float64/base/signbit
*
* @example
* var signbit = require( '@stdlib/number/float64/base/signbit' );
*
* var bool = signbit( 4.0 );
* // returns false
*
* bool = signbit( -9.14e-307 );
* // returns true
*
* bool = signbit( 0.0 );
* // returns false
*
* bool = signbit( -0.0 );
* // returns true
*/

// MODULES //

var signbit = require( './main.js' );


// EXPORTS //

module.exports = signbit;

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


// MAIN //

/**
* Returns a boolean indicating if the sign bit is on (true) or off (false).
*
* @param {number} x - input value
* @returns {boolean} boolean indicating if sign bit is on or off
*
* @example
* var bool = signbit( 4.0 );
* // returns false
*
* @example
* var bool = signbit( -9.14e-307 );
* // returns true
*
* @example
* var bool = signbit( 0.0 );
* // returns false
*
* @example
* var bool = signbit( -0.0 );
* // returns true
*/
function signbit( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) containing the exponent and sign:
	var high = getHighWord( x );

	// Shift off all bits which are not the sign bit and check if the sign bit is on:
	return ( high >>> 31 ) ? true : false; // eslint-disable-line no-unneeded-ternary
}


// EXPORTS //

module.exports = signbit;

},{"@stdlib/number/float64/base/get-high-word":76}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":85}],84:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":73}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":86}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":84,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var atan2 = require( '@stdlib/math/base/special/atan2' );
var ln = require( '@stdlib/math/base/special/ln' );


// VARIABLES //

var ONE_OVER_PI = 0.3183098861837907;


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the cumulative distribution function (logCDF) for a Cauchy distribution with location parameter `x0` and scale parameter `gamma`.
*
* @param {number} x0 - location parameter
* @param {PositiveNumber} gamma - scale parameter
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 10.0, 2.0 );
*
* var y = logcdf( 10.0 );
* // returns ~-0.693
*
* y = logcdf( 12.0 );
* // returns ~-0.288
*/
function factory( x0, gamma ) {
	if (
		isnan( gamma ) ||
		isnan( x0 ) ||
		gamma <= 0.0
	) {
		return constantFunction( NaN );
	}
	return logcdf;

	/**
	* Evaluates the  natural logarithm of the cumulative distribution function (logCDF) for a Cauchy distribution.
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
		return ln( ( ONE_OVER_PI * atan2( x-x0, gamma ) ) + 0.5 );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":54,"@stdlib/math/base/special/atan2":62,"@stdlib/math/base/special/ln":66,"@stdlib/utils/constant-function":97}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Cauchy distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/cauchy/logcdf
*
* @example
* var logcdf = require( '@stdlib/stats/base/dists/cauchy/logcdf' );
*
* var y = logcdf( 2.0, 0.0, 1.0 );
* // returns ~-0.16
*
* @example
* var factory = require( '@stdlib/stats/base/dists/cauchy/logcdf' ).factory;
*
* var logCDF = factory( 1.5, 3.0 );
*
* var y = logCDF( 1.0 );
* // returns ~-0.805
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":87,"./logcdf.js":89,"@stdlib/utils/define-nonenumerable-read-only-property":98}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var atan2 = require( '@stdlib/math/base/special/atan2' );
var ln = require( '@stdlib/math/base/special/ln' );


// VARIABLES //

var ONE_OVER_PI = 0.3183098861837907;


// MAIN //

/**
* Evaluates the natural logarithm of the cumulative distribution function (logCDF) for a Cauchy distribution with location parameter `x0` and scale parameter `gamma` at a value `x`.
*
* @param {number} x - input value
* @param {number} x0 - location parameter
* @param {PositiveNumber} gamma - scale parameter
* @returns {number} evaluated logCDF
*
* @example
* var y = logcdf( 4.0, 0.0, 2.0 );
* // returns ~-0.16
*
* @example
* var y = logcdf( 1.0, 0.0, 2.0 );
* // returns ~-0.435
*
* @example
* var y = logcdf( 1.0, 3.0, 2.0 );
* // returns ~-1.386
*
* @example
* var y = logcdf( NaN, 0.0, 2.0 );
* // returns NaN
*
* @example
* var y = logcdf( 1.0, 2.0, NaN );
* // returns NaN
*
* @example
* var y = logcdf( 1.0, NaN, 3.0 );
* // returns NaN
*/
function logcdf( x, x0, gamma ) {
	if (
		isnan( x ) ||
		isnan( gamma ) ||
		isnan( x0 ) ||
		gamma <= 0.0
	) {
		return NaN;
	}
	return ln( ( ONE_OVER_PI * atan2( x-x0, gamma ) ) + 0.5 );
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/math/base/assert/is-nan":54,"@stdlib/math/base/special/atan2":62,"@stdlib/math/base/special/ln":66}],90:[function(require,module,exports){
module.exports={"expected":[-0.6092641258214034,-0.703126403018543,-0.6851240361387113,-0.6805320833404574,-0.6893842688581303,-0.7362771841381275,-0.6997577866810276,-0.6821800563805033,-0.6746219410365472,-0.6985497348477944,-0.685988056173681,-0.6917816442186159,-0.6608201919155046,-0.6985617984411844,-0.6319729530762389,-0.683938209592984,-0.6828015714848001,-0.6843156979990614,-0.688340163018188,-0.5220080720773908,-0.6294833396732482,-0.695092483411793,-0.6505383996323735,-0.6934748295994899,-0.7006690987301397,-0.6824739049658676,-0.6614843821605573,-0.6720555266881739,-0.6491804673341272,-0.6678968061763709,-0.7037128523237994,-0.685113670095209,-0.8476412145718148,-0.6207333890239348,-0.5110501741740217,-0.6579898178621383,-0.6660474424078928,-0.8878197248791717,-0.6911751096778302,-0.6788462339639486,-0.6929330053250022,-0.6775887065802934,-0.6832082415929066,-0.6651613423707243,-0.693611630620202,-0.6959375347441716,-0.5980602330495681,-0.6661197294159222,-0.6768211181700113,-0.6855820039493601,-0.6630403660007335,-0.6813035773610392,-0.6999335908769048,-0.69436611348401,-0.6718774872811252,-0.6497314305468704,-0.6658186575239176,-0.7142435084392407,-0.6976960435683257,-0.6647672165312575,-0.6681311188722109,-0.5664798063217775,-0.6967633888687217,-0.6622177015543161,-0.3106544735045498,-0.6997570832827155,-0.6535019458874176,-0.6922161613771525,-0.495510841862689,-0.6742278934215427,-0.6809893486383711,-0.6564367269776887,-0.6476424568691822,-0.7366283113261555,-0.7259763527942514,-0.6929784960310829,-0.6626783248719177,-0.6560995167590941,-0.6875488912741401,-0.6248280868110171,-0.5004235952116047,-0.693126830390402,-0.7034911696333724,-0.6825582491952923,-0.21826253877427193,-0.6654731096186192,-0.022121642440658913,-0.6683022836432014,-0.6670786173795481,-0.7014317874545257,-0.6956400167372802,-0.6754404727959256,-0.6569338128859209,-0.6747508958049725,-0.6885889763975438,-0.7013957122787188,-0.635878379525673,-0.6811278335461056,-0.7019685016498302,-1.0132872330646345,-0.6942076037686885,-0.7007773413511956,-0.677579355332588,-0.6965639627663925,-0.7349243536722653,-0.7117589777246193,-0.6882535280544366,-0.697825515704417,-0.680411052128753,-0.735395667604338,-0.6733222985407701,-0.6926209442450224,-0.7412225926165729,-0.6858700927124778,-0.700960575462864,-0.6931106265201449,-0.6801098368745745,-0.6896971320367534,-0.5557377321840986,-0.6801373244099108,-0.7037635574716139,-0.6620477196114313,-0.6768485358141142,-0.7675261889534813,-0.675742608532173,-0.6562326758106934,-0.6748160722051323,-0.7069058125207186,-0.702531653549346,-0.6804322268749814,-0.7168714906031528,-0.6480937853434141,-0.6792554934657443,-0.678031459578684,-0.6890372124712242,-0.682778782835642,-0.6952594778140437,-0.6745155206239619,-0.6709854151449023,-0.6933573170894022,-0.6872929375389784,-0.6876940699504441,-0.7004151424606037,-0.6905125648852374,-0.6884219861653157,-0.4181074934523727,-0.6414075639158878,-0.6774133531710004,-0.1346632172699366,-0.6712339362077528,-0.7176097852692294,-0.6891030712170609,-0.7073783529240194,-0.679536888327064,-0.6763907031617004,-0.690675736614466,-0.7322573524873508,-0.6182849893277585,-0.6976848929475058,-0.6905906512347056,-0.6903405461549591,-0.6981098171779935,-0.7095308377730983,-0.6885865134798519,-0.6730276853107583,-0.6641958401911773,-0.6893753146146062,-0.6573700969109313,-0.6522074398123542,-0.68660922744297,-0.5723587246153876,-0.6896201789027538,-0.6746898031135741,-0.6694549525757147,-0.6968443153926835,-0.6726147330952065,-0.5775774322230294,-0.719425712317247,-0.6742398904195361,-0.49743503580882364,-0.6838433298803662,-0.6959303929729788,-0.7165012007152669,-0.6648246413574657,-0.6494192284892921,-0.6814334475932458,-0.560906999294638,-0.6740750472892668,-0.6881741698481555,-0.6985285715462108,-0.6995987096614263,-0.6977776470716253,-0.6870111769380843,-0.677122809194583,-0.7067432868756298,-0.9373068263049342,-0.7045542674707966,-0.7039143427873382,-0.6697154266734019,-0.7045604283251935,-0.5904399445241407,-0.7001493876523648,-0.6699200582681205,-0.6923540817443358,-0.6776480319162745,-0.6709948193514205,-0.6756685573194593,-0.6617454131899569,-0.6960759476113627,-0.6803687328780964,-0.6949289770485936,-0.6855329804454942,-0.6837830908185427,-0.6582318222577277,-0.650162224115373,-0.6844202955633439,-0.6634923719626803,-0.6976691902796277,-0.68941948680876,-0.6979399227313893,-0.6299611742615332,-0.6221661303735577,-0.6866389516783165,-0.6833379167089885,-0.6697064649833909,-0.6570688492155656,-0.6671420285167928,-0.6999193618362152,-0.706806562746096,-0.6868778145122258,-0.6587208877582499,-0.6928174319931412,-0.6848800675289891,-0.5603356688235892,-0.6809389226282502,-0.39624896735564674,-0.6691097934717396,-0.7089229255468691,-0.7057277325669084,-0.7087918054776589,-0.7729595903637597,-0.686622573260459,-0.7159943020323516,-0.5948810204719523,-0.6741590124624295,-0.7040218500113551,-0.5405752280394993,-0.7361025123314596,-0.6707429286845142,-0.6826028064216146,-0.6644532770158128,-0.6712854836567094,-0.6012064106097667,-0.7046229970853967,-0.6894526741270348,-0.6794768126152347,-0.620298189522444,-0.6946719552970522,-0.6795994895516262,-0.45636088143214915,-0.6914522581234388,-0.7125619394833475,-0.6761656076081684,-0.4119376329853199,-0.6761780502857887,-0.6758861390264633,-0.6824855936755708,-0.6795633783637318,-0.624182844691234,-0.6732872159865614,-0.6679379229682546,-0.6826263589662781,-0.6915453853219614,-0.67020440771579,-0.6558165686260704,-0.686188599046248,-0.683493378031681,-0.6744909131890897,-0.5917095252672379,-0.7065074465286991,-0.6241439688098656,-0.6522307350196218,-0.6713822814437302,-0.6546442921813881,-0.6944124753859839,-0.6781555494457772,-0.6671816944201799,-0.6644827278428221,-0.6951207415637561,-0.7039823618230433,-0.6778673518351325,-0.6835318019223292,-0.5857576567134474,-0.7002966743339464,-0.6625749211003132,-0.673186207983615,-0.6971107280994351,-0.6745487521595234,-0.11853343359917584,-0.6812207629976669,-0.6911167671178591,-0.6686143369469474,-0.6753609885494173,-0.6543458151277654,-0.6984450521104125,-0.6791391085611148,-0.695843717968383,-0.7172584883958106,-0.498555745301815,-0.6810445385232132,-0.6754198779966618,-0.6685196850575748,-0.1813213595964292,-0.6773389552335096,-0.6441382615363997,-0.6902451575464505,-0.6878704379155871,-0.6933907846803622,-0.6995659581572372,-0.695659640788265,-0.6933286039490705,-0.6945920317152311,-0.690423783067783,-0.6821756810571807,-0.7053758014912965,-0.6728223880995323,-0.6168728226720733,-0.6487642848606384,-0.6091619588846913,-0.6666422727222157,-0.726246893332621,-0.7005375731660766,-0.6756407552831717,-0.6890140323205997,-0.6905392183035954,-0.6820438852169153,-0.6826599351222036,-0.6914107754286594,-0.6861576533829394,-0.6621556832662495,-0.6954821887446968,-0.6486105372777102,-0.567825725021829,-0.694036237049259,-0.6434355312075006,-0.6792464331718268,-0.690481545821697,-0.6999573902672951,-0.6924183639337743,-0.6824520917828636,-0.7119048183102027,-0.6710925178721342,-0.5665139975819979,-0.6978789871562147,-0.6902601445656068,-0.6839320536753034,-0.6865086581772699,-0.690676719201573,-0.6941992418629735,-0.697312720508236,-0.6899038381057513,-0.68150205364446,-0.6939829494221393,-0.6163387756415154,-0.6950788963236411,-0.6732141620674292,-0.6949589492763781,-0.6423601479092024,-0.709872847993541,-0.6833056592732626,-0.6785007240293819,-0.6840590425991628,-0.6761656968891802,-0.6705194560927559,-0.6996273251301991,-0.6622567380247831,-0.6720860529500313,-0.6864352277104082,-0.695710790365256,-0.6558617173596446,-0.6757747714317668,-0.6652403758541686,-0.6333644741545394,-0.6843089461179924,-0.7135180490868981,-0.6886113061680883,-0.6980094008012195,-0.6741466224141553,-0.6471592714074665,-0.6467486921767159,-0.6747274074632857,-0.6947643390631235,-0.7016637153957552,-0.676824702497129,-0.700682670754194,-0.6331451807476515,-0.6648916072341169,-0.6777867616671347,-0.6755648964828408,-0.6688819123760378,-0.7686498706217179,-0.6891274139092222,-0.6759732084738382,-0.6487366723464876,-0.7076979165565552,-0.680284564502286,-0.6786842533040914,-0.5989772435464408,-0.6649039681332022,-0.691274180503738,-0.6681703133575216,-0.6849776392830033,-0.554811008496441,-0.6449616701414536,-0.7190916650411405,-0.5615070296298127,-0.5212305244577917,-0.6735455623437627,-0.6867025504945031,-0.6737650026105146,-0.691609213543224,-0.6886837661864527,-0.7062243225041428,-0.606361935091346,-0.6644488219551037,-0.6978623982585882,-0.6890334874032902,-0.6975088924266705,-0.6857736029217653,-0.7134501322913765,-0.6855884590798899,-0.7013396243415663,-0.6839324937409794,-0.6874162145907876,-0.6937959085243004,-0.5398117235325228,-0.6763391510368454,-0.6337416357968242,-0.641009520743226,-0.6801580350917289,-0.6689265896605737,-0.6884690958237205,-0.7075866079138146,-0.6785385501776424,-0.691785174545303,-0.6718568231586519,-0.6600170057987106,-0.6738853048464102,-0.6711471129517157,-0.6844274039769042,-0.6902377125821609,-0.6860823466854435,-0.7071559675570013,-0.6509463672870229,-0.6720630326515702,-0.6665981751703723,-0.6474115968439136,-0.7068466002116549,-0.6555931523206049,-0.606617224013016,-0.6618202020387947,-0.6682712231006006,-0.5714665783076311,-0.7121358438742539,-0.6148168763915667,-0.554666870728671,-0.6972910684593301,-0.2660895764638673,-0.6914627086745635,-0.6772587896110118,-0.6861813592261216,-0.6682315567884287,-0.6835387827161993,-0.6645894178598871,-0.6895657167498774,-0.6668204699558794,-0.6797639426027495,-0.6404763269249638,-0.7201915704511181,-0.6872376617965309,-0.6838502121296183,-0.7099844245925478,-0.6569749288146695,-0.7004748807948017,-0.6861863307814169,-0.665602847424492,-0.6961491643726417,-0.6654594272077587,-0.6555238312286464,-0.6681951360830987,-0.6526232082395707,-0.6713648886562322,-0.6404698077802453,-0.6764015311780567,-0.6794450914398695,-0.6907644396758157,-0.6846387075525542,-0.6803293357978042,-0.6656968958746342,-0.6724744955633001,-0.6770075323316708,-0.5953832352975619,-0.7040307325071015,-0.5942767093052926,-0.655810278936659,-0.6829745073521185,-0.624114452982653,-0.7089456613205617,-0.6805004245436502,-0.6633475239722849,-0.5273118021903165,-0.08141087596712648,-0.7037560078438616,-0.5452627182155646,-0.6930991113652806,-0.6995768608650864,-0.68496447797569,-0.6838032144898725,-0.05049143643945024,-0.666378511348907,-0.6978558973231466,-0.6632626180853818,-0.6882284140438281,-0.6391570758567011,-0.653707118367409,-0.6683782848816104,-1.40605167490503,-0.6557031872321155,-0.7246944217289955,-0.6929367378698164,-0.6709244256288269,-0.6711277037357343,-0.6839855443305394,-0.6458712589133232,-0.6599812668310917,-0.6837115036052506,-0.6777838879822259,-0.6415552744853185,-0.701144968171686,-0.6918577903254379,-0.6947422045613284,-0.688130486472113,-0.350118669221309,-0.6772914984601437,-0.705548889335344,-0.6878738789380398,-0.6469066980271305,-0.6393836394921968,-0.7113679412337284,-0.6345528983398886,-0.6788222799796462,-0.6975057484678584,-0.7023893257436588,-0.6978307187186079,-0.6867407600673076,-0.7035625458396622,-0.646493023602124,-0.6890711511402406,-0.6939095984353991,-0.6971247839234194,-0.6937764720091529,-0.39747221994540555,-0.6993677646863982,-0.3279906064762933,-0.6781080135297913,-0.6082264691521473,-0.6975634590144586,-0.674393743321902,-0.5983346119106457,-0.6882707786422549,-0.6882818300867648,-0.7014821663134172,-0.6792104854492035,-0.7390931765957934,-0.7038041387541404,-0.6750969868556049,-0.6907066920751885,-0.8724682073060439,-0.6860641527145541,-0.6744544365292733,-0.6789811692834496,-0.6734207364064755,-0.6711816372876165,-0.6720601332657442,-0.6203193730259211,-0.7067640736524469,-0.6915472394798786,-0.6945882926793291,-0.6802545471694892,-0.19282201690183925,-0.6682065827998679,-0.6084113149408409,-0.6950679707634442,-0.6852096308182294,-0.6716937753068932,-0.6744383682333916,-0.6652065003066154,-0.5505948666249179,-0.5398344702975256,-0.685708686546105,-0.6640651807678889,-0.7318350099042837,-0.6949700601626396,-0.6607498165767027,-0.6812097805890376,-0.6979609334957491,-0.6886774231943105,-0.6877088220128625,-0.6392380333516972,-0.678312918592863,-0.7082676637205987,-0.6687538491647126,-0.6690188987448416,-0.6385609742068185,-0.6883075815663031,-0.36268756800047786,-0.24692425897357764,-0.6725908970947733,-0.6254110754124523,-0.689809916267042,-0.6221326594374237,-0.6348342978642842,-0.6776560868146936,-0.5360420458949041,-0.7071428571021078,-0.6980128103402774,-0.7406287704792504,-0.6657280587732249,-0.6897254152509433,-0.6901117174884984,-0.6777547768240691,-0.6414575404267151,-0.6620998869940934,-0.6343769875173431,-0.6778118003200637,-0.6788649171894027,-0.6732597753292023,-0.6960709642981657,-0.6756312945138734,-0.7012140401282595,-0.6730841771301377,-0.6923090547533133,-1.0518151025780882,-0.6748356860998923,-0.6881650598876304,-0.7579912571753897,-0.6614233826410638,-0.6588960449657815,-0.689840236233247,-0.6700321365693971,-0.6822307398353963,-0.6723120421934434,-0.687370523923133,-0.6725809092542911,-0.6587915832471434,-0.6918247774147601,-0.6796536641355164,-0.6914680128077494,-0.6665013547520827,-0.6805183021810404,-0.677418687649914,-0.6714453048049926,-0.6611340101925678,-0.6699382023478615,-0.6943283313539644,-0.6471084896051437,-0.6208310392215513,-0.6824233506060121,-0.7093012312128438,-0.6803207662216736,-0.6761445990513276,-0.3960243460519263,-0.6880111241691543,-0.5803958912777206,-0.6690749976559098,-0.6278984096809316,-0.6715351566221734,-0.3974772908400755,-0.6756014376450906,-0.6864508477607321,-0.6829329099529606,-0.6827901307527747,-0.6843735166536791,-0.6552186674785875,-0.48263078155042605,-0.6496934318101072,-0.6920720271695818,-0.6981909196463744,-0.6829899778216681,-0.6839780130359193,-1.091301798534126,-0.6633973575371243,-0.6565176238777879,-0.6901149793820553,-0.6904212454882831,-0.8847564563574672,-0.6818034047372138,-0.6604541934943061,-0.6949659894232313,-0.6637003031089518,-0.6707161326202783,-0.6823838999142482,-0.6744440838678791,-0.6884605992161045,-0.7397322137494948,-0.6988828175873636,-0.6702639099994985,-0.6699117573949911,-0.6912651985401804,-0.670355591183531,-0.6725923492889772,-0.6472382942849665,-0.6354645595047778,-0.6581021896132702,-0.6700566958153197,-0.6381737903359486,-0.6660329002557837,-0.6299570172747129,-0.640172741773447,-0.6783568894530041,-0.6869772349942731,-0.6825536923858664,-0.6916170754451038,-0.7033341164722133,-0.6879902082700683,-0.6795890491842866,-0.6623166348788818,-0.695596332939591,-0.7031797042868816,-0.6391804454201426,-0.6843748292975528,-0.685577348209029,-0.6732027793937612,-0.6711590485155987,-0.6444718480092331,-0.6826362696185247,-0.5813700296396775,-0.6571736087231567,-0.6735942512586972,-0.6563092587407449,-0.7313475011119207,-0.6406955149532205,-0.6807911932055808,-0.685741804049959,-0.6653323356971855,-1.7450580518679746,-0.6993445866381924,-0.6910787137413358,-0.6877426200038605,-0.706175609225946,-0.6572458593061927,-0.5175223592491843,-0.7022230118631619,-0.6530429819884891,-0.6952284325570129,-0.6744001784947872,-0.6816124782241146,-0.6953690252382888,-0.700200912908476,-0.6769663900948137,-0.6913361076714782,-0.6767136709998092,-0.684852165125544,-0.7683066066625022,-0.6268508087345763,-0.7284561068233388,-0.6699051190014405,-0.6922889351703357,-0.6684379678869108,-0.7189159976678886,-0.4374263516169549,-0.5741673223471017,-0.678238224387047,-0.6733319405941126,-0.7010160106736841,-0.6833699346106418,-0.6811964981605334,-0.6857006131833765,-0.6757551767488407,-0.6370247270470162,-0.6543147970502822,-0.6728270084773885,-0.4217256814490847,-0.6920750254140331,-0.6956668550223601,-0.6375731257700634,-0.6134774753216959,-0.692775304312821,-0.6737939181098541,-0.6944846407660609,-0.6807804953966502,-0.6535880375932779,-0.6839396025390031,-0.641161880888954,-0.6574419492715525,-0.6555413326249978,-0.653254060519924,-0.6272692204773915,-0.680856881400605,-0.661891906136703,-0.689821333401089,-0.7013091057316172,-0.6832101597696043,-0.6023754999240514,-0.7236860760780782,-0.6485000179416551,-0.6644102333159516,-0.694553496659592,-0.6764718588786025,-0.6996547675981871,-0.5048404283834953,-0.5013739203469708,-0.6662678640113385,-0.6492730223397662,-0.6917245461527288,-0.6603307753813519,-0.6873602669485402,-0.6811534795811403,-0.6730553849597358,-0.6387509221434267,-0.9570618412862344,-0.6771667125151847,-0.6718736932262059,-0.6826377934535947,-0.668727538279684,-0.6857336532094955,-0.3456944353728964,-0.7225344474636061,-0.01934263035965864,-0.6890120272103081,-0.6885409905277481,-0.6900295502805349,-0.6533669812872795,-0.6692185193861316,-0.7088284944033585,-0.6804272645033291,-0.6731628103851253,-0.6874170041561336,-0.6901666721020144,-0.6551843702836143,-0.6758278916941012,-0.6776151189250315,-0.6819789358300277,-0.6364599891281679,-0.6666487837030518,-0.6831772047909951,-0.7256292543477556,-0.6908467827872858,-0.6845490541953416,-0.6809208999696285,-0.6834161133058685,-0.6752960086975618,-0.6939896037320278,-0.650588181778921,-0.6605375620204654,-0.6698449986749047,-0.4171631522596848,-0.6979747922268627,-0.5166025771685279,-0.665130058103316,-0.5888730513812664,-0.6798182476593697,-0.6842411265211196,-0.6724436345323515,-0.691119372011614,-0.6331019770544918,-0.6649024436843942,-0.689240124059352,-0.7205026359426911,-0.7077001376372635,-0.6549894456445162,-0.701924890412046,-0.663168834165909,-0.6794119371318506,-0.6783709713382137,-0.6766522102869783,-0.7024930081960215,-0.6958414621298942,-0.6923064789567384,-0.7030443276827315,-0.7093563929665028,-0.6862937079183676,-0.6919092458451782,-0.74331431660034,-0.6645173249334195,-0.6363591245925154,-0.6992735561015965,-0.6786978919393053,-0.6729506899185165,-0.6940501901023323,-0.6502608950600425,-0.6098304785455112,-0.6598833362031807,-0.6813252218404087,-0.39345163475703965,-0.6794926808617462,-0.6942621362260034,-0.6102003355647025,-0.6841648873565145,-0.00892328411579667,-0.5533169905862251,-0.6903003690327588,-0.6056658145559117,-0.6593536953906541,-0.6404362904697394,-0.6911742676427665,-0.6813344522643234,-0.11057975477751923,-0.7007742587664165,-0.6875320461880353,-0.6789563579419972,-0.6951632045989611,-0.6098614843565013,-0.6840996281918589,-0.6748998531028245,-0.680780927742399,-0.6856490661349388,-0.6233189580857603,-0.2891987217657455,-0.6518393828716342,-0.6747680078036953,-0.6786970840385264,-0.5964703839027198,-0.6643176484298561,-0.6848945976096037,-0.6850872767242875,-0.6626528299510053,-0.6869474956147765,-0.6883725623968497,-0.7370213752950936,-0.6251827398293685,-0.6929353104455295,-0.68288615215818,-0.6893432638531527,-0.6015475163929614,-0.6954920691974448,-0.6868781550395737,-0.722660317557911,-0.6921711783296812,-0.6831437397729481,-0.6375794301518807,-0.7023503370909367,-0.688456374197941,-0.6529246463892304,-0.6970767836693197,-0.6896822677445809,-0.675177852230603,-0.7428171166567434,-0.6657669070450254,-0.68888313152734,-0.7093355493905643,-0.6469462817042927,-0.6930121023294569,-0.6833581442162465,-0.6825907938297211,-0.6540192673335103,-0.7089847767604692,-0.6856938591856064,-0.7004796456848955,-0.6654253957010224,-0.6859562189900726,-0.6781487102821552,-0.6989905521810145,-0.6622253895184907,-0.662129411893357,-0.6156010411725801,-0.6622711815922112,-0.6714605049680182,-0.6807417152306745,-0.5570914701392121,-0.706809409461397,-0.6931030313708393,-0.6369602011314799,-0.3899349374176843,-0.6971202500094449,-0.6656820190661898,-0.6837212225885121,-0.697810669653745,-0.6963997510445922,-0.6616548014681407,-0.6831804029944469,-0.666058697961719,-0.643407228838131,-0.6697612202875741,-0.6843949647085674,-0.6525693064178547,-0.6603340680733898,-0.6905419277115175,-0.6689660659686838,-0.6933035138970919,-0.7079051406710255,-0.6919035092879716,-0.707142858816585,-0.6871348272567708,-0.7080961648713199,-0.6726864667256824,-0.061305453945093,-0.6833277950356241,-0.6619111365650786,-0.6663052577482367],"x0":[0.18161752659566588,0.747705570007652,0.5511738601916927,0.6857655059347336,0.3941067597216601,0.676770702597222,0.7401248261478912,0.5782627525874335,0.9917608187022076,0.9132395466007406,0.8158689276078073,0.3289345764539875,0.027982849453696446,0.7667008129974644,0.39413019071569977,0.04523560935863857,0.4114160699573468,0.08114223404803655,0.6681062558526023,0.3110521218276894,0.534773350524465,0.715719284684585,0.46207913438379156,0.25437222020867045,0.6683169071042216,0.5633550518044355,0.197157492726157,0.8643783977972395,0.4899316586953839,0.2160151613858723,0.6899574629164953,0.05322302322230987,0.7286212469544571,0.4825567190034079,0.7111578148978344,0.19760611670553785,0.5680963567505244,0.9280337056916308,0.04945604963641648,0.2611948012112415,0.7154622946240132,0.831082094483746,0.8982887834188,0.09258212548662348,0.059023040455180587,0.536718077063268,0.22676978167240414,0.2322543587525212,0.3888281674421037,0.3372748755129491,0.2691199069574073,0.20030906973021145,0.9172984314597314,0.33680326915513237,0.28347308911476965,0.16331167562715643,0.7848541966894078,0.7499918925625348,0.5260689233651055,0.3243837459476804,0.21274529676384324,0.7372255444036757,0.39226952618118927,0.17462154021891307,0.2940220832663638,0.3778679478941187,0.2735543319692122,0.6005280696564486,0.2192935250368928,0.33833352703852526,0.8625164790364113,0.032178852582377404,0.2738419660025879,0.5542705313535043,0.49849866521834785,0.2599554270002533,0.4178611601325446,0.2894847574937087,0.907873301573763,0.3528486957830481,0.9443145504795101,0.6068683181868992,0.9975984169218604,0.4061499992866293,0.19683480195497038,0.681121944222596,0.17737813182006978,0.814753432384274,0.05210309931670887,0.7662491550892772,0.21479160021867383,0.32959315707045733,0.0059392899126902154,0.6866300978284658,0.5071751661075741,0.6445118219668111,0.012807696773524224,0.8551094665599877,0.8654695371567416,0.7163253537468668,0.3717074539816847,0.7259573057398112,0.6958919100705354,0.992285870600838,0.756947118902433,0.4397129768273407,0.7686177020917178,0.672511212885283,0.2341907150634739,0.5224209653767606,0.4757677321557323,0.46596988372118897,0.9009507606535396,0.6718189459262558,0.906089815970216,0.2896887045846175,0.20758491927141454,0.0829679608867977,0.5014931145334824,0.057901627305211534,0.8737186142417386,0.40715431489284337,0.5116772594609902,0.507554640180728,0.261393259451294,0.6524343232301277,0.4172342913236029,0.6703839596284591,0.8919366097572181,0.8093487422579142,0.8809707263000306,0.37461766411922603,0.4783295999822763,0.6430190555497997,0.10149547672864934,0.6310438870292643,0.7950368245964363,0.6053967270898639,0.7165756175957538,0.22209548599824158,0.7674861223225486,0.19420888116760704,0.59337917749567,0.3818863243969113,0.5151394268291634,0.4973224493160182,0.7655859394501818,0.3671528522506782,0.4444822692195569,0.40387261400920993,0.9181804218590017,0.7545943985273857,0.721377735612629,0.9707974628196965,0.29200592672624603,0.4584589160015111,0.8652926462052488,0.5448286254400205,0.5194943460672317,0.015956592337775133,0.45088551240976593,0.4962616169312368,0.9982516874681675,0.8881939391090423,0.9921454969624959,0.5457339908106462,0.16081595021273087,0.043740705093640475,0.8439665907880081,0.4178033628925337,0.6180359312018984,0.4395054878823841,0.29352040206052465,0.12448566696815089,0.13788236423318834,0.8150407723822766,0.7067834932883914,0.9657911427030617,0.1983888813302055,0.8594983398489477,0.6383363884325717,0.5341383177757908,0.843598066683727,0.04397874109283628,0.047031535737313446,0.48884483045254834,0.531295943786422,0.7581439188949277,0.5656017696244211,0.2424640279774306,0.8684519629652065,0.8693586708013745,0.7030157982002287,0.006833568796537737,0.9043865592426774,0.7406288088410413,0.9383470272280776,0.9066568236453039,0.9333432794449357,0.5355777028779651,0.45199757212594593,0.7894083304625847,0.9492577862408766,0.22422636893002545,0.30582142126105705,0.7975964328257497,0.24913523402691773,0.0939944163303299,0.9488473484998916,0.5628835431042256,0.1103096092666247,0.08351574109246918,0.6696859531612342,0.23195237634416044,0.34536819929735163,0.01713423756516841,0.34736349797011035,0.5947967286419529,0.4226290124722998,0.3779606726606437,0.2844406478210788,0.5168796278461774,0.8640999567191181,0.9419574964514619,0.37258394564420216,0.38841507165447653,0.682128369685097,0.8533381213466593,0.8713816560339316,0.015421737076874553,0.2619365285072919,0.9369592409287262,0.13811697161549197,0.3522503519848368,0.36833818707013855,0.09913294326022015,0.29249662426753087,0.6136809553222873,0.7472915039565389,0.7416726368506621,0.3880732702821974,0.07523840542453586,0.7507495448449384,0.9011411428767757,0.24282821516454067,0.25954108668779785,0.2878840629239783,0.7555069144038298,0.09977127577583378,0.3697532631960694,0.134268477689379,0.4425845243029105,0.8660164085847544,0.5294758759051925,0.632941215291059,0.27853081341031927,0.7789780939264395,0.17920214917206567,0.7022038913780873,0.08207784203292334,0.9063956480936273,0.9430852754066164,0.029726103204290144,0.31416326721099086,0.08497749123530651,0.1971807759103541,0.27735744937700524,0.12982929002357957,0.5595347851612078,0.11450838848831868,0.6810637326074609,0.34778615562700255,0.8506656438399525,0.9160206596847038,0.30562777060024593,0.40127078878262123,0.9275237753722068,0.5906673123606418,0.6220002066999568,0.6624247463790662,0.42462018347928954,0.7227687018443252,0.26001041537596614,0.21449575999907045,0.26010201478925254,0.4228468715188405,0.1346365082846217,0.1604239573940931,0.6437084167741285,0.7867379931361211,0.5455736400091336,0.4521745263647219,0.23363108300541158,0.8673511057003316,0.4598471472171153,0.6373564912422385,0.9542785216191325,0.3376106397559,0.03807940577753066,0.5933301461236216,0.07701278630789843,0.6792762712974405,0.7912161306332646,0.2732528932930407,0.8136054562313373,0.1572515286957641,0.9153470403598678,0.9405111171978056,0.008512223491660587,0.5518651432734449,0.9851616697509011,0.3763309211612378,0.3263865540109967,0.6525315733810109,0.2111914457824282,0.41653671977176576,0.567745626970191,0.34685505850830456,0.9073837160892062,0.4555027503976026,0.4527678277742284,0.46540389287217576,0.5919464470989009,0.855097361006927,0.6724021601259589,0.06934699906695507,0.6692084587629741,0.45791754103451043,0.09939536851658137,0.6130827965069634,0.6299376066176738,0.48635568544508256,0.1083645000200828,0.5716478435757077,0.553796639667409,0.872830394839395,0.40204342410164484,0.4129170953739698,0.7985345906226762,0.7693330234960878,0.5590265044773959,0.8422996228929716,0.21524397882011415,0.07995338152341569,0.7474074726822428,0.30580613534146295,0.29511794405022806,0.5030202007614109,0.8048740458391155,0.3845352055431541,0.853251012150958,0.5709654808558349,0.23665035467117046,0.6458618480123854,0.45050554500129736,0.0012392786729789051,0.5339023034430634,0.11060274456132446,0.9696138158752334,0.7018895832327059,0.13288919502986607,0.3934389429162528,0.8591994373953518,0.06201757759334203,0.5850251894146212,0.85677298931839,0.26630184486348685,0.20162253744500025,0.8452480016900206,0.9846966633870646,0.7286497131632625,0.14513926741675576,0.49223052308291093,0.9136082092361955,0.8164806672950047,0.3807853789351088,0.6030388935669129,0.6385254065244619,0.4965108818520594,0.0550832111160533,0.5558931095248241,0.07160331032977152,0.2196901546271035,0.32923729677763647,0.7635652307434815,0.06860942847675044,0.8136160834510113,0.7666321405073715,0.8605152344217204,0.2975657420053306,0.7613452024959897,0.5729858678153699,0.8771156544248191,0.1595017886586687,0.32046488380294846,0.3956525579199659,0.08852097372448542,0.9360957767840783,0.7755316840156161,0.5453133659787226,0.9646004025089203,0.616683608783597,0.795501661170835,0.013061487516651926,0.869436572709986,0.4504312074119021,0.2069930916924314,0.024545553958348787,0.05145245610144222,0.7262207690780937,0.7368335888334254,0.9854595589634949,0.0073716854193857095,0.11039132384993011,0.8809389222757384,0.009598169495730113,0.20233670104509138,0.9791466643427893,0.8368397450236964,0.1818644527679827,0.1822422232964216,0.3256387456885941,0.8921660481201468,0.4646333179686539,0.048611298215511356,0.48955425769628813,0.9667870832091463,0.3600954209271421,0.5384554601288809,0.7818758862935213,0.7565375613471219,0.7713799713713478,0.4923503119042516,0.6414867930126862,0.911926312600404,0.4268763113192462,0.10222066789412532,0.3266403639205937,0.38272135902462545,0.17272534206096335,0.05839396331444657,0.13898727395961474,0.5523098923879048,0.05888202344154503,0.45064405981061695,0.048490135100770715,0.3323665943992504,0.10823226228472671,0.5735018024060583,0.659213300631571,0.7745581050187007,0.67307029635272,0.4553668657905594,0.3419532300500452,0.3325901329008065,0.17038569724973796,0.6035221792011869,0.7344762066669532,0.32756009688349197,0.34509783178933384,0.5868869265914165,0.13200532571506773,0.39538423674976775,0.6499904468796942,0.22236714814500513,0.1784639696883521,0.9235044569119386,0.007751331492314106,0.7815756916979626,0.603874155120774,0.16263653471621908,0.032890637397633204,0.4615180870537674,0.869884327979771,0.6935996404513229,0.8751764181991382,0.17344300576165605,0.02396463079127864,0.9858774147307225,0.9921828270117752,0.061766897860320746,0.5257751795022194,0.22324578767238368,0.5537093360081418,0.28940653465949784,0.728005748896464,0.15301568995049397,0.1809305795678502,0.1923523282163977,0.7488444323469523,0.6671690780310415,0.0937529084586688,0.5362219517312599,0.9835919192971327,0.256617982983697,0.47891667066164767,0.11941316014851733,0.3996549510248273,0.6673024135713488,0.3945485769193069,0.6999034235394967,0.37853463477446736,0.6299023965422623,0.21732399389402723,0.056856809532698005,0.3526903552230898,0.6540244237306212,0.8421405284994721,0.8559378307909724,0.46003729045807784,0.033319294796576804,0.10846885312246579,0.7989076288566586,0.729586232200711,0.674815224842128,0.554343244695545,0.30077854927740777,0.20078578654511947,0.24342002812596264,0.5052561825541808,0.4128602716863701,0.26365269950887305,0.32265118102566714,0.8003226382592661,0.1395144028053763,0.44145839682668253,0.5671763739106923,0.9450691019655,0.618902393684339,0.2696567596618735,0.2599783407752543,0.32609494514383286,0.5969234517163011,0.058964449408349884,0.55925763457558,0.8349214176502082,0.8011880328936565,0.14265471901422,0.36051761941509963,0.21921302641019436,0.16761318337438857,0.1826827344419557,0.6983110877275742,0.5429180663508402,0.6627924600196966,0.862189840622124,0.128515344972139,0.15178553836767894,0.976194941682125,0.4103256167901266,0.6555641244901174,0.7333702233507426,0.5342616816207546,0.304285399266752,0.6459958208975911,0.7997966884001231,0.6420358171739773,0.5375557769996435,0.18142035048084337,0.5774888943054657,0.960554716842863,0.45278155940138354,0.7572198663960767,0.29358797140638204,0.8295079255494322,0.8072314130848335,0.7156760464400078,0.8981992405283143,0.680786190544836,0.2678535964736264,0.055519557881184456,0.49589173133894815,0.30478217672255004,0.9416631418867707,0.92613984886621,0.030382781616797194,0.7457726142214294,0.9799400075296656,0.4413876135061645,0.8898680952996953,0.27495626242603044,0.5353943459287329,0.5023367221380011,0.09515195054523917,0.15629828193971562,0.8476456633158265,0.6572349843414238,0.8120176645506483,0.5639486592135046,0.10260837243547916,0.024033317055700998,0.15061275719528266,0.2893438490706466,0.6706993691790744,0.022886070144618298,0.2729191245762901,0.5229822069963337,0.2552632882979786,0.45435420079445854,0.6216595613613971,0.6727509161129159,0.977120356438852,0.13383252183403926,0.5931605921035723,0.07525102537495676,0.5148948230328982,0.9844961035910926,0.5154931042101023,0.3041069530664371,0.4119727834305609,0.55854498755853,0.6137891807243641,0.13871308094520307,0.5311378620873342,0.8876555332586962,0.42780533196821247,0.47887952301951775,0.3280628954874596,0.3766433510245606,0.9148537227549531,0.3928575233887528,0.12749611403031258,0.6472162383809485,0.09950865515263851,0.7438021040432126,0.8834782263830896,0.8334677475929553,0.9113700699921463,0.16325550206307593,0.47905800677036736,0.4716523720005632,0.5262000874594064,0.17241797790167368,0.7824652697715531,0.540038859185588,0.31702814971960347,0.9320502614846995,0.32746257704636306,0.3723087703418435,0.7893390386128794,0.1058669600139932,0.16693745094946388,0.6944733022795291,0.13622280414753063,0.7469176077971806,0.7831048112466128,0.12435103137851589,0.5169405307204515,0.8184745228888943,0.1821498709486049,0.6559639595463385,0.9064075954485471,0.09512192734957425,0.021874777238164222,0.10432651823508099,0.9453168144152531,0.027493202953227325,0.9630660776565252,0.8922128964786364,0.06615554280831781,0.7786137587642299,0.7002898420202934,0.6975877751121105,0.5310399736710609,0.976271356716438,0.6984690980052868,0.27218642782047553,0.9449083622173342,0.7609342935229246,0.2722806013526702,0.37648990124847503,0.23417804091533267,0.19812657735154282,0.40229990462620857,0.01566184984915009,0.5184013794278626,0.21302571642253665,0.1361175078148782,0.5268705211209717,0.43814089557322133,0.48487391614336617,0.39343678421318407,0.9388922928344636,0.13737014230623723,0.48700350535003123,0.19487718665937703,0.9352561439444171,0.7452470114806975,0.5762193710720704,0.9442352090898896,0.9558202074001776,0.10925675356482079,0.4611233996581674,0.25513534933676985,0.2441300510438782,0.4086945362463159,0.0018303673240123164,0.22538153329101673,0.3806367530645052,0.343087817064861,0.011875077780427068,0.6973450766835607,0.014743050968748506,0.538520363392686,0.8855802919808005,0.43628655821594053,0.05358773971924413,0.8694915424532375,0.32090843024099924,0.0011152170148700513,0.5407621410673817,0.09204371713328086,0.2437940481208254,0.33555699994082033,0.9850387813823578,0.17038267905986326,0.19254596497364163,0.4143575139769873,0.4524624817787313,0.0021327450669117454,0.9005284196006333,0.622500765861939,0.22803677176553716,0.5824546985641161,0.06495194925363657,0.1426049305154602,0.34915673372690326,0.6255641005034824,0.7987190433681228,0.3642286464853983,0.493394640991073,0.5692652538314176,0.4896494430010332,0.41703109699162777,0.08133354966501227,0.1453093126298739,0.5550249288153766,0.7136129032326617,0.4063115329999025,0.3285875453593792,0.9334804138964994,0.05443796978948434,0.5156804303525595,0.8463799972537718,0.6344042039467823,0.7320442537186456,0.9207749732678077,0.13579348747153008,0.10078732721829864,0.5328026530554781,0.5348255407985272,0.216186333399484,0.81127749599964,0.26218599431837153,0.2193178078460254,0.4874539915069156,0.37677577369483406,0.1441521596312838,0.6426517111484562,0.6539097100682807,0.16802449009712417,0.7567788536172562,0.7863110469240855,0.9014221025619378,0.5362873890300603,0.2937074040959873,0.4442629195501109,0.31881944227195014,0.9199447363724109,0.8708028563717594,0.21598598354978504,0.4171616083672045,0.5640799798769327,0.7082565193120351,0.6272156503756403,0.009962388681572065,0.7131844040211817,0.06497539044143008,0.3566374689731846,0.46027534959655103,0.5596080696270649,0.11449233567359007,0.11737289305425858,0.7159068424848332,0.6315411459529012,0.3693566151158949,0.052782592917705706,0.8529885980467766,0.5257257629653744,0.1025678003358772,0.26137700117868645,0.3020631435982517,0.029669693641590333,0.04464264708339294,0.12275381437851052,0.13854230479764995,0.04934360931854975,0.8771630468878753,0.8474323491908684,0.10049200968411243,0.47651042646711317,0.5872092896727124,0.6152795705815137,0.4499322330589144,0.9420055778052405,0.8890215192162707,0.29151474240731967,0.5084552786311831,0.010653521122920395,0.5611432712448459,0.6069389625054205,0.10481760080672853,0.5421107100399918,0.554487596909371,0.7269141553365221,0.8959334408076518,0.7380943788114795,0.4487522420478105,0.08734895839062617,0.6537041158458337,0.9398579185595539,0.5329639640830366,0.2661033340975725,0.41641841415450886,0.5525005893656327,0.3064654032419809,0.3984827904556212,0.9535266629420842,0.06922667631145973,0.47381334661961527,0.5954272539268513,0.7050848126299019,0.3103188358603619,0.4228486084799865,0.7725440558089449,0.34432547941166924,0.2960795865162773,0.17207795433166617,0.050842337576099794,0.270147690300085,0.8524518371783993,0.6105874625052503,0.2166254340672038,0.8262834215961177,0.030424938906377763,0.2795588979444308,0.6570577475842787,0.6980946773547339,0.1584119041694647,0.08813090063071494,0.2667671268995171,0.06172363120830893,0.8651007347014732,0.8505975031827735,0.3092652836649312,0.47485026677221365,0.48895187451693123,0.9278429193095461,0.8588795281645849,0.49282020731266307,0.6698742242250679,0.21902392525776548,0.25808652777696883,0.09631961137570944,0.32091054108573425,0.18961364962968275,0.6837429008965195,0.8979287548823922,0.9645609350809838,0.7198233777592631,0.5297672793571224,0.8513448217172286,0.819974720569441,0.1831753226860966,0.01542227513402139,0.6133714263946388,0.7807130110525633,0.34224430966053854,0.37264874648859103,0.8381696897562505,0.6949937765365664,0.225260511897724,0.16578815722271956,0.8221538712146506,0.5132729873556439,0.07495008668449166,0.9557613521755357,0.03828010431835094,0.40481681068421493,0.13456747277622116,0.5242319649067075,0.0033368898519272605,0.5750289564016342,0.9554153118616335,0.5163865800332075,0.06158247172509013,0.4607263488675386,0.4340642703320121,0.7205286825492903,0.361279709636227,0.2936517284892879,0.5484287690760414,0.03389540455492468,0.957215517083305,0.03785859350550491,0.5654828872725504,0.20127562862406556,0.2521510436823853,0.8996307841627109,0.6521104951430956,0.10934808532208584,0.638000885057092,0.389577297549355,0.17423480013281845,0.06873042722589107,0.7744259673601261,0.02343908925815441,0.8400760722216076,0.7976474042427388,0.3705372394211983,0.26411059105963464,0.688313011562248,0.9946545779317963,0.03778927804768051,0.45476553646272566,0.27669418159125514,0.5265634002440771,0.30800010428505353,0.5199922549841207,0.7485529098219295,0.7249068412058166,0.29873231445164383,0.8138052891000775,0.6064710509374742,0.050103208233348795,0.5895991211587526,0.5952392279857006,0.6271363949783504,0.23187939731199592,0.35912574206276937,0.06016187444507026,0.7440369830931206,0.342380839766139,0.4777951204224202,0.8089585079473178,0.9339570821966352,0.21082383120447146,0.48673290364947697,0.28714541009592676,0.6147315818196455,0.9081667087277698,0.3714555678543927,0.9570885306371468,0.4626651484798594,0.08677160108406334,0.4929899070437278,0.3586823123448637,0.5394746354175401,0.9802047685862516,0.20236216632470905,0.9302521391287324,0.7345357087976694,0.632085501482551,0.2862072384500811,0.2391252583924508,0.6627140230123798,0.493122612678188,0.07914690635935373,0.3762596373854399,0.5738932347712908,0.9954450301632494,0.8260831001015259,0.09146289176385847,0.0773560804376967,0.23204234185813832,0.1877052279828073,0.09913247193801089,0.2933896681831196,0.55572749841839,0.128709823440178,0.604559542232493,0.7272326087832006,0.45363281083290463,0.6100689055262769,0.9282159202050804,0.46742718144025575,0.146540046518306,0.7465980106981085,0.05880960358099374,0.6365514256427691,0.5292360970555612,0.7216718990827482,0.7902068170351131,0.40505053981623007,0.8544159607675037,0.08964313995684381,0.09328077917734667,0.2169202644061794,0.34180832882191403,0.1219009391313648],"x":[1.8646942565254587,0.39820498900155243,1.168220565606572,1.4747070302031817,0.655665388338265,0.08441216390740891,0.46202397681147955,0.9960177481967429,1.9655125986763484,0.7086013881846105,1.1872810563921292,0.43087152311719823,0.8305961486831825,0.3824125376951084,1.5788607936698016,0.6287011792272406,0.8795123194727021,0.5125669660710233,1.0322016596045223,1.873070685122526,1.738221377064161,0.6606916028256697,1.428767612251352,0.2420037142660707,0.4265331774086141,1.2325925593572764,1.523417799225573,1.7148319945808974,1.9945523354281116,1.7752190280929345,0.3309285000218414,0.34243283550796866,0.2620042159355789,1.983467388059783,1.7273844709248274,1.2470082396408086,1.6557225580019437,0.4395236106632803,0.14632498894255708,0.8595096666080213,0.7271937736709235,1.9246862627532364,1.4554910154678988,0.9579997633727637,0.025855272725906264,0.4965684007958586,1.6522941191638907,0.5946127987742753,0.9759969733469753,0.6778073944935454,0.9626793553812178,0.998745853718833,0.5952028400519263,0.25855606562688216,1.8395028483640163,1.5014352513103355,1.355278985317601,0.12584618066373698,0.32203303933326577,1.6948818291722736,0.43713826275343903,1.7158928274716891,0.182033407812646,1.5047981334289422,1.9246278202012954,0.14092124484613322,0.9459552294128444,0.6671442601188242,1.2243059142867252,1.751969149418528,1.7326837251323393,1.7619918962943575,1.18547832734872,0.036185926846183936,0.1740723896245444,0.267716612056736,1.243961716082433,1.8654238765781161,1.2149142553372498,1.0003307861027952,1.8603209475983333,0.6078127226990282,0.930198974231192,0.9032235286308148,1.2770153197593936,1.1589937404501942,0.6803770159727773,1.9364226822179234,1.4444966236872774,0.14975920008398536,0.21004260971414546,1.5451065803255446,0.6483779273402202,1.3295486032306458,0.8392819616669898,0.29761898423459643,1.7265260648939549,1.132586497208628,0.3120773263997436,0.34280922401927727,0.3195458347342317,0.1715326997835116,1.910482848099487,0.7268260706158491,0.3839509949653275,0.15173637968539255,1.017722245247282,0.30789070959865317,1.2279547208724466,0.26714964425103815,1.5435622951097918,0.5004917966858926,0.4222829454208066,1.0787956115623865,0.5128508723528897,0.2925147309826519,1.1319230182830218,0.31222294199802114,1.9405876796258035,0.6666751412885574,0.08739348295112892,1.3352417389341342,1.0884569879382595,0.4542448751209034,1.496262528409643,1.8340235000476213,1.8415212674698567,0.16881889027676378,0.243110527540785,1.757204992348497,0.1978118195340084,0.40533575320264026,1.1506845075355825,1.4587885314801268,0.30747547855864976,1.4453181340494736,0.697171143331266,1.8817221654810514,1.5115114022480798,0.21388997092611595,1.1117028293204694,0.4956736980491656,0.11595904326424833,0.560284660172321,0.7149888244174765,1.172149806827969,1.1585792303889466,1.556151667777105,1.8925853238949903,1.986469527245033,0.3860669309608591,0.9094392726216087,0.30053704540674975,1.5722724877261105,0.6083326345507811,0.6503029240474616,0.18847805880222124,1.0527272860279662,0.19033020949656887,0.13207276856899952,0.5958479758561341,0.35998858690266244,0.2749464092820202,1.174790268588704,1.6959462639594411,1.7300706471580343,0.42915335433460466,0.19316937663261102,1.5792510785535208,0.9012286498893323,1.982456406796473,0.7097748177399033,1.1415535422773746,0.8219513572622796,0.053508604719035624,1.9274451911009862,1.4362020130380846,0.8184928655324573,1.610185235161408,1.4508749260829972,1.040120005295945,0.3258680009235899,0.3879060334847,1.5534961708443764,0.8182686079295696,1.4121468476427577,1.2816642723098948,1.5696294201503802,0.9541555879863477,0.05552969935877927,0.7947711515874536,0.5513524203914906,1.0442477845557203,0.5664254955866213,0.06541433204801006,0.27121078760053496,0.2298562934237789,0.5181347926645663,1.9085460316255993,0.06243105988338682,0.7337846308516167,0.7187896492410415,1.8419423843189624,0.2754187044994878,0.97794783327137,1.6430879137049037,1.6135491497532963,1.6723537689732586,0.727328828276733,1.166058566218847,0.07012168632513216,0.4664695703780217,1.2307112871600943,1.190894055964526,1.7836494581057964,0.5849062784731229,1.4494098553498365,0.5091295359759513,0.5757081582047605,0.020868800019793188,1.1745246073428346,1.8208177220096733,1.1323566996603032,1.6907810169846136,1.7687122602474012,0.9175684791417438,1.2778576724242927,0.4319114990616719,0.6692367141941205,0.4431237464373554,1.8570581284535002,0.9546274284676324,0.3224824117345335,1.8492537232694017,1.1773326104135124,1.8916821025911834,1.5590526152070372,0.02731823650221621,0.3013220218369512,0.3334996745282077,0.018268278835154028,0.46115680888009525,0.13129889397934402,1.6934709687602716,1.4493436521493797,0.10860002615945286,0.8007289890369154,0.2535119487044035,1.75885754593974,0.9504710493318957,1.3379826909814243,1.5968248405831669,1.7031685594869463,0.28332320869929717,0.6973246339303034,0.49696373654859993,1.78172486900392,0.12053943756954144,1.2522383646274027,1.9831748661162645,1.0256184456347426,0.1359767257115969,0.8861126762617806,1.5739911570982885,1.1513364646313495,0.9406381352459605,1.025702985640366,1.0844211933394123,1.4534565567706434,1.4977764266265288,1.5793918217089722,0.4402631685263372,0.9288490424191673,1.3120362844944995,1.961812699569636,0.701016227165256,1.2794921009657592,1.0283971528905353,1.7421173375565364,0.06225230145492677,1.0997686046674522,1.116319303038753,1.0519864884297783,1.728681794083911,0.16509204082613493,1.4395268923711013,1.1370038776677354,1.5317036586008284,0.4990927986447735,0.3552556548212067,1.6413043745091307,1.1693735465598598,0.883792867210826,0.533263892682744,1.119243467648881,1.5835601759097386,0.7374758839768676,1.398247423894075,1.8993936561185922,1.36953539581542,0.1999115180190847,1.967935045318534,1.501357393504306,1.0014871517373014,0.39873561348345143,1.098893502776006,0.7123093276223531,0.5053863370031619,1.933891645424128,1.2613754143330156,1.7075588758690916,1.6610070856814874,1.5814616292441883,1.1296348960021163,1.7118850711511575,0.5729886816510144,0.9811283938562481,0.3369091656068517,0.7808494594057698,0.4027934006501459,0.44336820012160016,0.38509657524607066,0.7719194965459781,1.57603910298719,0.13035171886636698,1.4198196578669453,1.604945531554271,1.1071173134939545,1.3645241228797533,1.2108201296339165,0.06619329771958027,0.032872426629362295,0.8758140086182378,0.774578034363913,0.7446033967985164,1.3103444076620265,0.7988080210808541,0.45163848065471246,1.30448182577996,1.1205690755915731,0.4079040584496898,1.1405763219155838,0.8821970288533962,0.03285584240314865,1.3418702257159474,0.5776472908531525,0.4866453372681807,0.0787198166624874,0.8425852953958466,0.541565944650177,0.668863086808666,1.397818032104805,1.8300095223628041,0.6071404626350145,0.5289445168230955,0.6155897184676205,1.0517424976428487,0.2482637150946001,0.9587612033995705,0.4921927333427729,0.2516170722177482,1.3000899856916357,0.8132013241201022,1.4982874603037488,0.4980159565474658,1.9557826322309277,0.14074978849671416,1.6726072369743226,0.5811427191092,1.7506563264914892,1.6756467077080908,0.8092375895306727,1.7142333784397743,1.9906201873300309,0.3723021091215486,1.4224363731978649,0.9070677939666649,1.1510023016376176,0.2973797730156713,1.5768366875636013,1.7152136023934954,0.345511552715017,1.6809852506054326,0.5819482615980833,0.0587201813894529,0.2833511838717886,0.6377023263937418,1.8609252923312356,1.8087449997828768,1.830023081030809,1.8496973323773096,0.4891356957164348,0.25598980797824256,0.8420126021900094,0.16265078054610793,1.862494478502899,1.2838246943760834,1.9561059985775198,1.501040012125228,1.8194732555755029,0.004688882241086656,0.826270727265324,1.8489493081274904,1.5796465841599225,0.09830263379186777,0.9267959087894995,1.1656547813252,1.052383436742368,0.7287508327431578,0.828332840879372,1.6865011653127868,1.3438998688068873,0.7317877776882096,1.1102885942949245,0.19819815163363685,1.4606867842731215,1.8499677664689544,1.4133313922947859,1.1107119256711342,1.3430002697005445,0.24596996272794236,0.6436141005463281,0.023403337503816957,1.230059953889333,1.999396178979771,0.1332960768134268,1.2899572279574487,0.13786301640039733,0.7733947818627955,0.14798958821428831,1.1447141824215166,0.2001476742059629,1.136435701305758,1.0647618146880276,0.8684085976927594,1.5099101839170497,1.221164827842228,1.8254295115272434,1.6374470128346688,0.8098774773426971,1.170254500902221,0.40963897493271073,0.2622393544572308,0.557300574821916,0.5285710481579193,0.8476738965227302,1.9939839943512951,0.4818985128856075,1.7936372171260024,1.237841133716198,0.9325043376966708,1.1508797640458912,0.1745683880371791,1.9714855227245311,0.6920333238523648,1.7785222360024808,1.3243092150401297,0.011180896570622156,1.5029215036709487,1.3992224400599964,0.8689659613841938,1.5518148652039656,0.8469942517406039,0.20766335349968035,1.8625675974357363,0.8001184519266693,0.6439778758311401,1.3752821870305594,0.901594010606785,1.8267109508477661,0.41219581615635503,1.2972745774048913,1.2190967399414583,1.5790776037447478,0.8793272238852916,1.713139400472993,0.7321563512607967,1.3723931064101587,0.06460564949771319,1.431929990178134,0.2319163509993234,0.1231836125184902,1.9694540904914022,0.12573261989904072,0.6623261623129255,1.9491541041722344,0.09139037133692485,1.9663339993911406,1.5040213179714974,1.7122679067196986,1.1697139677284611,1.7952323974843445,0.8472738016204922,1.6538095009874234,1.0123735039984445,0.6215608914869137,0.6985295338374371,1.0277569140233243,1.6734036021970815,1.4771713857107338,1.6739547477275583,1.6943066091347059,0.09907095526850673,1.1112238537418997,1.4833426964045917,0.7774045189756467,1.7948707827053303,0.04490931851818969,1.628900791128446,0.7828301234272792,1.374468526419232,1.6590102810984262,0.5823145998879733,1.8997528746646628,0.677483541588709,0.3916789431460117,0.6827151436826728,0.4207160129935068,1.1912021226382148,1.9610854901271706,0.12240315420482162,0.8724121594849632,0.6745462355686698,1.7858082127936163,1.91268383652272,1.2610818712945204,0.019678240303590222,1.8427999212452155,0.10734803943425053,0.28286204127647174,1.6707334537633165,1.504154535017276,1.2227966667660453,1.5805943885597418,1.8169729122894727,1.0350795789027414,1.9848887644993116,1.461173421460595,0.1762747011786021,0.23627212275117193,0.11833385027163201,0.4736311429785873,1.4872756092952262,1.5549796048326532,0.25206761838699965,1.2149294656112573,1.9988854617517657,1.4970485654096217,0.29701721683814686,1.564632434756927,1.2770046862125635,0.4572706795619328,0.2314475987621467,0.019671232767506375,1.0099492240662076,0.1658226080769749,1.5080661260977197,0.8460852978587794,0.13792219900206293,0.3400016320808037,0.9331644881276531,1.6221235914317624,0.32354585881324427,1.5607588694588532,1.60177813411928,1.8432047830772977,0.4985309668629574,1.8935420139346757,1.7633730475585208,0.6385978117232005,0.35702510239998064,0.1954725162972113,1.2276612731840837,0.17802632432763366,0.3295744707556221,1.3813807741734894,0.7886805352904567,0.8006061867244019,0.9215292664917141,1.523140946627226,1.0373288082435717,1.6768889094558785,1.9699488230782665,1.6604557677219205,1.489168261989156,0.15922733158497993,0.7284670720699711,0.729258205504479,1.1178085114347835,1.4344326197193098,1.5549429679820603,1.4759135810479473,0.2121199799188367,1.2648976274261963,0.7273213789971167,1.2198493258797596,1.8707566208405426,1.0530616850026644,1.5647552269248846,1.185023804126541,1.7078950524551324,0.6957134500115143,0.016931844253023964,1.3413222894798071,0.6843763343197766,0.14595435209550978,1.1994517632879558,0.8441924900898656,1.9375361213958464,1.4072057620167664,0.01576943247728968,0.7593341516923582,0.8777870579388711,1.7228860257524317,1.200165002775464,1.1961015773701629,1.968511648957398,1.0202469444913596,1.8916200448004594,0.9732416547437373,1.5966926200454532,1.0000127145520565,0.8597153840428127,1.7699052961299486,0.08757360036459305,0.6312904978450091,0.5501338283437276,1.467916414950908,0.27146843078572136,0.6078623512474994,1.406207446758204,1.3328516322962045,1.791072997367766,1.4923763103672525,1.559044204311646,1.398860773132315,1.4395117783627183,0.18103971479684455,1.0882271830532564,0.5519931209086546,1.204839701420875,0.190540201216296,0.09367379152082567,1.0459352342267847,0.8259795765941185,0.006942043086679117,0.5311197741304512,1.3974864590662714,1.068959505417316,1.498133809349489,1.2789805168107282,1.6513116664158063,0.1328796173625002,0.6914007537770885,1.5252888279062198,1.023005585328307,1.0122341561078336,1.0334594365470124,0.9324125518956619,0.8613249131351437,1.3109339487467104,1.6453364028112794,1.4469008577805171,0.7254377438042119,0.8846522520296847,1.4835367480048869,1.1164200428150433,1.472398303029658,0.5914000340834575,0.6843190634275045,0.6027577579811711,1.9229772774750278,0.4268034461193033,1.0825325132679224,0.3503269775343387,1.0877471233056664,0.9284773909809694,0.9734651311672886,1.2618832582213844,0.734639966471458,0.9439064846104674,1.165994456242581,1.3856094259700407,1.4965367094673558,1.8861451827730535,1.8956546830903624,1.0118329062118123,0.4298003306101239,1.0714965014193383,1.3193899056404361,0.4083335928438019,1.6278119018605142,1.0823179142280042,0.4148563043812512,0.4582408933332194,0.07118033165750504,0.8739447525675499,0.7820988669255327,0.2684312299622178,1.9933063752842952,0.6944828189498922,1.0616383021217652,1.317625548547913,0.7788007956305218,0.47120568155263953,0.08179173376237037,1.4946113819920943,1.6784131992878555,0.46859339858421123,1.4966344230497395,1.860680130453428,1.6494930468624909,0.9214439131000938,1.7880551150314554,1.801770820493783,0.7211635647607619,1.3161769393468563,1.496382518041,1.6868155267278349,0.8152296966813757,1.2689888077636984,1.2067671803091837,0.2713554975327592,0.12434271466476643,0.1869346210786329,0.9360675528260654,1.5747910384326258,0.6082505834428229,0.06883838877477233,0.9689302588910969,1.140628486114394,0.6515927362535261,1.3290892760732547,1.5555506481178516,1.94680835854993,0.9676798367921493,1.5489914715352748,1.4239825502228718,1.382737118226144,0.4387293022555143,0.6099565877499278,0.45062285612848685,1.3176478379607,0.9276700300218033,1.242632024874541,0.05450757010778906,0.47406109210004344,0.2904088563185532,0.4728014937484266,0.18757312403657522,1.1622227494477748,1.2604691287625815,0.28011638242860526,1.890784721410394,0.17602259391058572,1.0453537908247639,1.0632786493793729,0.0792571335318275,0.19973697237326915,1.0314559926693923,0.27654033281934787,1.4968523538341199,1.0012446749234272,0.25067395629327693,1.9759401532674463,0.08981871023365473,1.4839919248532865,0.38230306757856347,1.387453580005488,0.21201783621901393,1.2590886566249169,1.8228433410508837,1.5906406323426148,1.9096696012886771,0.31195834602172035,0.5810095935389419,1.1584842332357335,0.3725523356704308,1.387870750111294,1.9136506056122777,1.4005517040050637,1.138207757105374,1.9293106101429442,0.771589941197397,0.4414421333406904,1.7882941168412896,1.390051180216358,0.8727569628792446,0.8454936651130609,0.011857354885870475,1.12000782551906,1.7673876661431205,0.6013124093499931,1.9993974368182585,1.423146154147819,1.620365037448027,1.4932356472927912,1.7234910563670809,1.5014765368407414,1.8304664525609535,0.7228593507936822,0.25413162756605345,1.1289540046534348,1.834031225086906,0.06914697850308249,1.532055934672453,1.952771645498525,0.48950243567911134,0.29611954455191025,0.24786229905015045,1.3608467794095152,1.899653583710002,1.0668726005995777,1.2442528570393492,0.791768144252905,1.8629766636449574,1.0280588437717006,1.3325753781778942,1.5396366683127232,1.835051480887595,0.6169330045411163,1.7445383817444848,0.7615514538860886,0.9977922829159169,1.507758024815692,0.6699051952038957,1.9486738189507546,0.10060739951894737,1.6119606396642512,0.6229732432876203,0.7272653277362422,0.7407916887765018,1.7486580877667084,1.792609026046466,0.2579387094845762,0.5725452551994112,1.502997035180524,0.504619956097403,0.2736960524262102,1.0785980260942747,1.9000786242877625,1.712096480501287,0.5996806572646225,1.2106638307520425,0.2740613040977138,0.9545395015229552,0.26598219818265934,0.7100163218467377,0.4940478259451133,0.9831220788947381,0.755106006749668,1.0377751648348887,0.8050966741096994,1.5303230303152082,0.9941544951239782,1.6969158018994053,1.6477488796449062,0.623221894926552,1.9872958992341632,1.0993383958591418,1.175836819624407,0.6974318597555733,0.7466375406274581,0.6823950303177089,0.39106150542591367,1.143754233717213,1.8033548929218925,1.1184592417423396,0.03111692875268357,0.09679956915350418,1.6815864160195453,0.18126436783400335,1.8838571114722882,1.265614137604262,0.8003774476031627,1.5294142864196925,0.14135366430399543,0.13831635879249138,0.4273155348208353,0.5877020894235385,0.07286917446706864,0.6119345239589902,0.25823916592603524,0.1910683863483187,1.2259689335183825,1.1746045517968287,0.5852045866342177,1.0871026110164181,1.8325997511682015,0.07714113902569864,1.540065606505154,1.7112169965499606,1.5696269115412447,1.3718669411255884,1.7744211162836403,0.9912729986902171,0.38759256621525795,1.864603432966495,1.380027843788982,0.459467868964861,0.7291500580989427,0.7615811707514557,1.1536180741370217,1.969163013730968,0.6348222162455679,0.6471679195208964,1.0234247889965857,1.6771979052761483,0.45789878662089434,1.0069212117870245,0.28062386979412324,0.5561694684191112,1.487867951445343,0.8543210787167279,1.4964674082916103,1.465532841016373,0.3599463667672347,1.7440502368407378,1.156042769008922,1.9714909375488139,0.7061188647954459,1.1458079279538027,1.798807883526786,0.8599863411145368,0.5915684870219731,0.9042032115854073,1.4954677657630393,0.7763004189752274,0.833549030953574,0.3259894194042565,1.3171995428162373,0.31245453870348694,1.6016593196449391,0.8559195106962116,1.1408830891960138,0.4364516866906909,0.8417222407842311,0.37937144658024824,0.29641620949711633,0.9610292037031196,1.497449260142501,0.5801165687147498,0.6135807414388816,1.5683264254027494,0.6520541994741214,1.0578403359714494,1.0349280274098978,0.10503816980746983,0.7245454240719895,0.8237849571045244,0.24914650149253292,1.98477968243217,0.9650918832585673,1.1191928306223855,0.8246223557099768,1.3945497928169814,0.14488135338351205,1.1033406658301574,0.5901171233226625,0.9385448470567086,1.160540864001823,1.8644873021471504,0.2545453105537123,1.489884875833169,1.2549817165518689,1.7098431155187015,0.5985154419409748,1.3445039713893792,0.943978533069513,1.2733396496920868,0.4795202745109335,0.8276386900626185,1.824365796819572,1.5271829707158546,0.006312080930388042,1.5599504572917353,0.3486316157427556,0.1216005921843415,0.3465370587542944,1.0702614350823199,1.384845085289022,1.5486141141447494,0.8802035702161786,1.8125913347579603,1.3555479571880849,1.6046038537578369,1.2229558830867457,0.9010708813031356,1.0067012579009655,0.625837464791378,0.07133959054907901,0.8137264255048198,0.3356413683645645,0.8426166786855949,0.23977504696897256,1.0313087802009115,1.7932571759675624,0.5331767478448763,0.8530218587696297,1.266426073032783],"gamma":[12.168037019591205,22.405841498313038,48.76261678710377,39.55802048695081,44.167488857620796,8.920311679527126,26.869546337401793,24.11470298101246,33.14444391661014,24.17852782667067,32.90806494880103,47.490993842977645,15.538059526901405,45.30376199462959,11.916671069014184,40.14693933389447,28.65313407973882,30.960238243393757,48.10243596393161,5.173973929851128,11.61367282161605,18.025823603611656,14.115776330523278,24.035854901460375,20.5395475220697,39.701033097019774,26.22382873177227,25.390410918115116,21.275434889032987,38.79600031870899,21.745295855371495,22.825427547321574,2.040035875159696,12.664066875923307,3.1321338582597558,18.650539262831856,25.189938456739846,1.712587735332305,31.24010281751296,26.440027650378816,34.86720341944547,44.391782879440925,35.510542475852034,19.39940805513932,45.47347212192789,9.172882738895915,9.022927550605807,8.415173114116303,22.704653213852144,28.546656618671395,14.434811822899206,42.65910715694592,30.316653936736127,40.89152162174652,46.062216769858345,19.167402043904747,13.099062855421684,19.027271121832946,28.61961979533839,30.288193799129758,5.636345906602602,4.544349777692879,37.077835352634494,26.935844324853086,1.815166798365575,22.89574359789309,10.570496141998165,45.53011981378211,2.8120352693397743,47.105081570048526,45.28251677489698,29.416686215436037,12.4437540315663,7.739986832282952,6.389585450002322,29.288441949273093,16.985635191062066,26.550937504796256,34.81718178250174,5.805706723587556,2.640902816783297,29.543757192752484,4.169219683936487,29.72396627956759,0.7646807017604451,10.834625050315893,0.034627739645376465,28.37105218539705,33.54306520454583,47.567206217391465,1.2143018910018455,43.30493708971607,11.07820415678834,22.038495584428862,46.27713657543771,26.88218823417389,18.457080592325948,14.607014970589427,40.111241059937555,0.8137375549121195,31.331544908813093,46.43271796282843,49.273042020117074,49.54492402796363,5.795448239772838,9.939459371800385,32.326372380588374,49.73219053436111,49.351313535553196,3.9228431751404336,33.93922738310241,41.75224060994864,6.480387774556895,35.47250041337057,32.16405409086106,49.216759843794335,44.835936666405814,42.229899706903,6.108365081145417,29.591978631767933,47.39902317881132,18.6891207886855,22.340770211665706,0.4714621961419696,44.76543390526998,19.98037005679093,48.99818531044433,23.364133289891786,44.21845737692699,47.15040020079921,18.54186219384575,0.4236111088630534,30.59382457926113,34.09175562811521,31.839621644862536,49.733263394677685,29.526537446588573,43.192818792589485,22.573928214731787,24.861654636079212,37.32133367312832,35.09757447548697,41.968818325904245,43.0505732973265,26.861410033100917,1.243267351381372,4.700560614190907,47.72174166069506,0.6051062027143561,45.457054247758734,14.011163066711207,24.325945991989016,18.957123320284076,27.938584612442163,11.914821744236747,49.355849645007055,11.220163221375213,4.1387684752107745,46.284260169628375,28.87782418268011,32.83503033742788,17.524514032156148,28.33018271090181,39.91390322280678,22.038853177247464,25.649351367328144,45.204396868097454,2.6088120488560906,11.185251328648194,46.917173891681166,6.6736884400939385,48.696826648089406,28.972424432619736,18.51129596428056,14.555259249113684,34.125746606587406,3.743409703995826,3.613517275893785,47.07394500825611,1.6740889550890925,27.362547809287385,47.704858886203226,12.562061437699167,33.429237630121946,10.96640831268515,49.88074223958977,3.3230428510489296,26.821379428962146,49.61610963188673,22.173404511835493,7.2938574057686445,43.82162853127595,35.29373501885027,22.04921080981873,39.54549560144498,1.3257890543255657,39.762003084004945,23.093486716814283,26.174074161702176,26.539738186259697,1.642476230628731,6.442686598862856,24.17307975305635,41.07573186514214,27.38836687162448,24.019881528358134,49.250087789927,31.47252391734248,48.2212093558128,29.854412675460473,14.371539994390648,31.895317781027522,37.9603701376401,17.163295818464775,20.813739069146177,41.235477919996924,23.29194321051191,12.087527283339771,26.094034687050403,47.54536345335069,8.65713008262049,11.234436179322316,26.154035756415585,48.35670239520174,37.45704977312864,9.159567489143827,14.3867424379448,39.74907022659428,9.484379376071905,43.29338774444387,28.963305509580096,34.10496137002771,14.13789422992715,6.598079503440468,41.92416023223511,2.970247524091152,33.12650845672852,23.84461050085649,22.70694470975029,16.736547639498724,3.054141813616462,37.530846341839165,17.45117960229463,4.842139479027507,40.056121793008856,8.883598706443575,1.936336972497743,7.589698828518188,46.59733980370593,34.873265140271684,26.30663846116751,33.23242967221374,5.491973810424778,13.732326606517187,11.073638367900019,10.101327998649001,8.40787745270969,24.511325557417685,25.66806457883324,4.260859059946432,44.74252350733704,26.715113759360342,31.825449619745662,2.2518145066369954,39.65786426452399,27.177362889144085,44.4428819726324,44.42799124734924,7.937201166271524,43.887877161473035,22.389094662067656,5.565929892001953,31.048375345635225,10.85831926166777,27.68695445520345,27.326414793922027,23.09690016902981,14.793719180988063,6.61657283246162,28.78565176989305,5.991170864306827,5.990235978301506,22.90486737006353,24.526046970740765,47.8334543466132,42.842476078274004,24.244474900092207,29.999985919495074,46.69515919131864,25.486851273460054,45.295868437401474,47.253115557317685,3.6123233976047664,29.853697204883378,13.511360243835679,29.86731288038891,34.89116036177137,35.95835385759158,0.6818818005019489,41.1815704299725,38.49466949752258,33.01502484725469,25.18598254462071,11.702852888450066,49.98394188150345,42.488472022491976,47.999112745278836,11.62239338653588,5.48779079402939,37.09154759122498,25.706569218049758,32.78480753379777,0.7202404491749248,19.058183837394125,18.980554918364913,34.27101355037645,49.74051126204556,25.995139190739568,12.58967051897255,13.372475050147525,32.98654885467257,35.40993231521412,42.01287444168573,41.599319204041215,28.388489005799222,41.85701220121862,7.477137190671657,9.091447611100845,9.134676902694316,14.159184231504419,11.013538963214653,39.20652222122881,27.657569748475385,31.191902639223045,46.516143435131085,24.94378682085697,23.957011189126455,14.184099184598786,45.9199427997598,7.09799108504744,41.25016490450918,4.162299205334774,3.1334244060551963,33.73974081088483,7.409311435652921,12.361329357097883,45.68029213024866,39.79738964902586,32.928679453695075,9.296396212465607,6.3150659167548024,23.595663219854103,7.400805901685869,5.221835163711496,17.271488517794566,42.24368408492024,49.49328441266826,35.43024333251634,6.570545228045132,32.114323282329195,23.266538529150637,49.27151212235808,35.05219164624781,11.392969430561429,28.70253846687031,34.739866795939946,44.15637241636704,17.9345077310737,10.134500294322535,49.300353563883625,40.853951688756055,46.30553039308223,45.41289861698119,29.946758739520206,43.776849240439695,21.12036520327821,9.09013051512294,48.44299864583862,49.51326111251744,25.47108039024789,42.10522988481776,6.157649030094026,15.053501837529826,18.121324132417804,22.245128782162947,30.07065548401463,23.088317520499558,36.30642895007483,12.803641364817908,20.504243031279156,37.259400560895216,33.035560080606494,46.62503144580569,26.397184995823842,13.382263531150684,15.053391863958321,26.53448713388561,41.94268708594879,26.032225077231963,33.00833349569583,8.366544533293851,33.12568732942201,38.70619777489666,21.924595227714462,33.97866066163158,23.422564622650366,41.88602119806222,6.5732573801257965,15.041995341840654,34.67459400525812,23.891876314630455,27.816344629302982,3.051992742773968,12.86891695941147,16.962041906378033,6.458537750657511,5.429090879752718,13.959162264949432,26.96590081600817,37.757926510779825,26.358868309911387,45.251152990273646,42.564225011090905,5.338341538752922,42.62681234445098,48.21240656101368,49.9091080669311,32.50652602842711,20.208583604969345,20.071935752762947,32.568533412728605,44.5690503571319,44.290430232061496,46.883289625406874,42.71931676052161,4.066217127072569,42.015947806323474,15.541362579845542,14.88955673706327,31.02115870116767,28.857645269283683,36.74503934694916,12.879294268283214,21.558144217894515,36.399258528602374,23.634533501588873,31.373854150020996,12.22759110494438,34.90610112826854,42.05831176628166,34.5096730204063,42.90223844219052,12.848239601907263,24.030449839011638,10.735090307380734,38.02929944723699,9.78769464249426,33.837546516429576,19.52950410657127,7.374771319446271,5.638325699731062,35.86664600506041,2.1912562283351034,14.966480415328276,12.745195725150571,2.616026705407737,43.03171470925864,1.233636402169025,45.32074605955583,48.598446391064556,22.727443029839268,31.888809532240426,49.94999738570735,15.574160394831582,32.95440150373158,19.985947891993085,26.395734229968525,15.834473325761945,21.96826080538883,47.23181531383286,11.596255767489383,15.347061446941968,30.146523502995137,37.31674444520107,33.98625164240262,27.819074331342353,13.088185889705507,40.45953755941526,21.753342309912714,24.262389619600278,7.725063626320838,49.16900875854099,3.6521873823147533,25.261010906237168,34.86806923238244,38.06606161318654,43.14389589934683,30.99199149097174,22.99978416862547,32.98433825747629,38.10341760713543,8.085172293386044,31.21658862611921,5.4271795677109385,23.842902279496236,26.44195669996282,10.119190574971327,32.37333192596441,38.65918561248889,6.7885774870427245,4.606035283724719,0.3887017461074338,13.065290785696126,4.57602668511099,35.33785787571689,16.15711302306817,29.591872777105475,14.913229944861783,0.14778879247938637,34.14090812391144,39.36169387033293,12.76569760978532,45.43179115121008,11.280763790918735,28.02345859202472,20.795699958344628,0.5309267535949846,14.961235542776175,10.478478851145113,39.94369453426197,39.95019363886495,33.67232018347095,43.28847070578817,19.971221031616782,23.721505276916112,13.439951908359848,48.66444140823823,15.817240235580632,14.723597388426024,8.41726801802115,19.68444271582498,36.8281275218204,1.0535260132236601,40.30540571698966,21.21219023443751,42.47136190922953,25.113345527319442,15.46610210556123,23.94038678604322,12.141070370717665,27.415704621964277,40.41488489286606,20.95359447435321,38.776748936605145,36.04988080420929,38.949193993286144,11.522237949684232,48.08926948312045,36.33483506542733,38.085247313595424,27.71790816136154,1.9489624886860568,44.519337663294024,1.5281284759082747,32.43947299784967,7.393084124829774,31.370783174015493,33.46302979813495,6.8734189641961985,48.282211043524306,39.35463361403825,23.040241140338225,41.85669585943962,10.807792763416524,35.82422801913204,47.20728153086598,11.179146498170955,0.6799706046250797,43.00050353860952,21.36020117575994,34.01318757535952,36.464711100626864,42.05278328749752,46.74268878133133,11.179312202289148,32.39982723475655,28.320663363634722,36.58576588035732,27.16912286159756,0.818281228348372,38.57162138699414,9.479630833296737,25.619311867528396,47.46544920056365,20.67236249987243,31.912112648266767,30.26161349868115,3.2506966098711287,4.1696645509045505,48.0339411537836,22.31593608004604,4.7151938524986665,40.863329954611686,14.451881796287713,32.287227468636395,48.909053776467104,30.54688523935297,38.37241183459571,18.726705552279967,42.387123738430496,23.02149469296798,3.7504261745605727,19.25655534637719,13.488019853148547,41.00852895617534,1.087328140007393,1.2229022246962096,21.209557665756783,13.706127026806058,11.11946120433015,10.366861866012545,9.223053437550444,8.663631453049824,6.101474510965832,30.054388184081272,33.07598042961798,3.8828811193025503,12.737499518933149,20.09840622334067,26.972616064154764,38.34828240390169,9.657909614369709,32.65096309691884,7.443738482169793,41.970334565439515,47.87008455847419,16.078121718945415,31.928275421376807,25.78641201270383,18.80549862556924,34.511231278067655,17.92054694923482,1.1727812079155076,31.329689615363797,10.077256015244696,7.844331517403724,8.027203187080445,16.071795907641462,48.14073559161507,35.810597536703845,36.13124964088671,22.516120509791083,4.1489863689259,20.50520735693919,25.85514116514116,37.37547208253807,46.14000938867681,26.6656417293171,0.947139116953577,39.82649383052479,21.372547706221624,27.41214739981135,14.650970630776195,5.26828031448956,49.41021923355249,10.588508561261989,7.133360271973787,31.143838004284476,6.733913121708024,20.31724831519992,8.398191523147824,2.7953328802775568,28.271402099136356,3.5856834477485666,8.740279223807136,5.355624894006961,20.839774159589453,1.3956555617183342,26.428694667311824,28.092824353047142,28.461561493757937,47.23732596196007,32.26988586453196,22.355822365325174,3.6281517328816792,24.3402490441463,45.31821478467018,39.915282309195746,30.88229528531148,25.92613114736948,0.965328553542999,31.99074263305477,10.58766513566286,33.48282666756667,49.935401996558305,1.2012798906404942,48.6613156993597,10.65484111604581,39.30981553102249,35.127979433038625,19.148641227255382,21.429172921047414,43.921469409076884,32.56240023819604,5.78578765468587,39.45858986968855,39.61532107134451,21.896932210483723,49.91038828020753,41.280893175041186,40.447156213087545,21.066909427187607,7.2442378059046515,25.89899360848125,22.248873102542323,6.188303448805033,26.009661206620617,10.523266643031837,14.409209161801185,34.73367943054373,37.89967083283319,34.922808857994134,18.009489038472847,28.772771380830697,15.01943565423125,36.999236008998245,24.899892688250734,4.50587559001373,46.54391366910499,6.925059136359113,46.76181004911704,6.897207108342906,26.51951888566675,32.589093252399,23.760634915669453,49.54308036316153,5.28888670639498,12.332933308226268,31.471349626565182,1.8664218721153092,5.48890739796618,4.6724174182592115,41.05994269147156,6.962119820360657,13.719287421260518,0.41412665652640346,46.02894673293578,47.537184333263205,43.70132552898119,16.97704826602726,10.914791445801452,3.35710445118107,37.424854799007235,25.302771714945017,13.25701235727167,18.76287305566923,37.66698645219271,18.61480355930114,40.11385767284273,14.731167715691162,38.11034133781411,28.428451030399515,16.426310424083958,5.6970474073274495,13.319557493296818,3.7376894842883757,28.136582646756448,47.06994829554474,11.890793322670257,16.477135541553235,2.117504263694525,6.98950319624887,43.50061907688685,38.204992579638194,25.604761892792837,36.997832149341505,23.577115584537555,26.196291737154453,37.41065915655718,15.983975170535203,13.503078604090991,31.73667966743149,3.398522659820391,33.0455235250438,48.09061302797544,15.764454310823561,10.207616884149306,33.83542431587737,10.413940320649084,43.20622358869532,43.92278021453889,23.086943055135446,39.33941436434585,23.266752979610438,22.749611188151185,24.586934704971064,22.55449584135564,7.88195890799469,33.666548455509385,34.660239888452196,47.07628064898722,26.08438208217285,32.742864192960184,9.204393316759097,18.461286054985482,8.950428988135473,36.25078831193225,8.58570919964523,10.805211785060198,30.746201187956057,2.2339552782796646,5.205019268518263,12.254881455638145,9.774426743839026,29.00105694817743,18.437062759753108,31.80597055383474,46.62654794976443,45.54038450030218,13.418528154970755,0.846699396241335,47.87108637685371,14.663808234903398,35.029528155651676,24.588353566043274,31.09260461521427,2.0282135785899102,18.73677650304049,0.09295821881775135,22.91586194992633,18.179038189508834,7.279921997264582,22.53299319327854,35.990706789340685,21.05165247932421,11.348163674840828,38.05177088675108,36.838501472752775,47.529045183669524,13.28526724148521,38.166414406691715,44.78931608735962,21.711214708424375,4.183804075606035,5.7726896472237605,42.88196702137379,7.783344765150691,3.295428065522543,24.74284883693272,46.311927308641806,31.790108254000206,34.48959870928372,45.364186099884165,9.937382746526191,13.142006885954826,32.98447707148585,2.124994573318739,40.26681367694097,3.605656916775768,13.580441135668309,2.901600263829396,22.69453251609973,34.76488266468315,17.82908540113547,22.001127596385462,9.784515268948068,24.86389431904158,35.862859171426706,22.00852101203917,27.448287453946417,18.829066513506554,48.80937324985577,22.238685468841602,49.818747856711056,33.563730255849755,35.05571247202618,43.75264412510098,48.24987987478486,41.37890422850627,16.189534866882127,24.627382846658108,35.79385448522019,47.51433389163843,8.19484575485232,15.611048639383519,11.947242955879556,38.623139820776096,45.86892718560798,44.53738295289698,40.50369594720687,14.735054580353745,12.435966447173818,18.702650914541486,22.291284566067137,2.0569277629126637,43.04342337800515,41.78132459633558,10.465515971238403,46.52925752754794,0.002741007748796598,1.8129963717994135,47.59818697517196,7.743554650979578,18.725095049254904,7.004597343847752,26.332058753056597,44.04153623579292,0.4863279797969522,37.00967805963641,40.113032077970246,7.627995103511564,25.866682830445054,8.00036931935777,47.63403717165337,49.344588780644614,35.35443007521365,28.462501999650534,7.922821704488447,0.36096407316806856,24.131824949460057,15.16577257477425,20.006835008654278,5.000717454673731,17.88287839399304,10.509157518764567,49.36231151125276,19.90491828309773,47.93736934605472,41.70731938931009,6.257435717818249,5.339753222701082,41.227681318604894,48.6258197880241,41.66760042453882,7.184169737236445,41.62696557102399,24.951171403407834,5.4199503103744995,42.07503911335415,38.11074356470616,15.970194799672132,11.39051307229062,36.71937282556805,16.892077851030464,25.469113703959046,22.721840056447263,28.9271147445881,5.004997887817842,10.025052692570801,31.144569987853366,26.121262373258958,21.681066474310807,37.717020121197706,42.48457336919535,44.25871696971234,14.364632435216851,8.660577576758543,47.98071789177484,33.99104366470679,16.662054490493883,20.313501602216956,47.593809662642464,41.251138158270805,24.38042678063429,20.51135588981238,8.22321021574165,2.1379465976765655,36.729142796026494,28.949972350992827,3.001629952159346,24.20151173089299,22.430705629126336,19.035542462790556,2.331223949063088,36.24103476423053,31.352701982101383,16.77039209014649,23.50548622620632,41.010736400550776,18.719598117614755,49.58804898701262,19.03160711884625,5.313611685603603,32.33925135266752,30.945538681163796,17.45679126125388,20.524392198275855,37.69764182460199,24.642627246820492,43.63274316645125,19.895055875452194,47.09220518578161,20.818487326328004,46.191293753939654,26.366551987883135,28.990308243809647,0.3213225666680031,20.40170526003702,10.248638036666991,26.7661349668202]}
},{}],91:[function(require,module,exports){
module.exports={"expected":[-2.8639228276900988,-3.847489182923465,-3.7028780827483443,-3.2505153501149184,-3.9864164361045495,-3.4835340879954857,-3.888199098643732,-3.481629997675197,-4.663645148413022,-3.4502844199799476,-4.248126704226007,-3.758521616005592,-3.6892081746195817,-3.388003221272805,-3.1196904398698493,-5.482986616126319,-3.7027224103294216,-3.73992119225615,-5.2089664290660584,-5.404924011483642,-4.524010718536105,-4.4153215152721295,-4.883812079366158,-2.6895213196150998,-4.753029379807294,-3.374638895106648,-3.507814656173649,-4.6287789431612465,-3.647732928206745,-3.534655934615392,-3.3030345660194613,-3.2273102096621082,-3.2020973550439624,-4.205016976532615,-2.771546731783986,-4.196010641858388,-4.110698832748744,-3.8597837271648814,-4.030732565498715,-2.8494048258859044,-3.4761155414519895,-3.9771416475027306,-4.556596169283984,-3.8043975808709427,-4.549431900378674,-3.07891336500606,-3.245336936374046,-3.601740188406719,-3.4922668767263993,-3.066430809855111,-3.4890702917429173,-3.4271050725069054,-3.4769095287581577,-3.9368157318214827,-2.7247480850040335,-3.74306347605452,-4.475273019748064,-4.000816653813729,-4.44592043334163,-4.17693346281409,-4.656295610531508,-6.972430241431249,-3.5487683699493098,-7.748368372155229,-4.902378807755684,-3.5440512663858876,-2.813774234965101,-2.549203105655384,-3.4642717129100102,-4.15676165598021,-6.0328433152213705,-2.9779669324199216,-2.7849148988872243,-3.1824076999453643,-4.5684292868906065,-3.197707906654155,-3.7526148156897525,-5.789455538316699,-3.660327670485954,-2.969086905023442,-3.4363746441044816,-5.18158237687017,-3.2599487482521856,-3.2189521176215647,-3.2606943003612066,-3.6871895504880037,-3.310605350451202,-2.5713305484910833,-3.253046219981677,-5.161111159407626,-4.062774821505024,-3.460249899849251,-4.905574971704589,-4.12314093461701,-3.493809773856419,-2.621089749679738,-3.3856603507560057,-3.1326455359977317,-4.076724528710684,-3.106150658961622,-3.6369876700358903,-4.485740723333645,-4.6467499301068145,-4.535388731860446,-3.4433371346655406,-3.030398490449583,-6.113631902163316,-3.631968078953821,-4.818018107366541,-2.6124822425405765,-3.1686637251555947,-2.844456849450469,-2.987017118819355,-4.370544543362208,-4.253586488023402,-6.435099564156325,-4.318264584803111,-3.3745407366729037,-3.827556674151116,-2.897324764313947,-6.8831450885351115,-7.656046934034369,-3.6723864174650784,-4.159478500196227,-7.026431629391736,-3.0785503497972724,-3.436195409337731,-3.8405641335426024,-3.738592654305107,-3.0697770694776048,-4.899594155165914,-4.229333171562538,-3.8513594905407293,-2.8370349170493165,-3.603373985705746,-5.553470493848839,-2.7359261818547855,-2.6173356929052343,-3.78010492231267,-3.9463711498949423,-4.136814606012485,-2.499880057184822,-3.3822545274257627,-3.080858930884126,-4.430549056513987,-4.148780320614384,-3.9721295517153234,-3.055857417402202,-2.4643406316174725,-3.4080095887841333,-3.1882670258740022,-4.041479080149399,-3.5655542809870275,-3.088179839616518,-2.978721644466025,-3.0888100630624726,-2.736500046348246,-3.082053401061582,-4.441318587794751,-3.1846944592942834,-3.3663455462143945,-3.6160881079757576,-3.540276984316891,-2.8339319354057695,-4.947634958843992,-4.1006752530941135,-4.189022708767568,-4.483315527320342,-2.8354613305451184,-4.353245920814468,-3.6259031248150815,-3.530293082246926,-2.973375798564236,-3.2911253173002564,-5.5299542106407795,-3.489282588038737,-3.571283542081297,-3.5443360882009873,-3.3320412344800547,-3.3551147545651885,-3.5450503283745944,-7.100846095033555,-5.595000248689456,-2.5611114754164856,-4.33245043823937,-4.327926324460812,-4.490080965273443,-4.78535145174022,-5.155273025814994,-5.004331389203573,-2.782010066863569,-4.238944238568459,-3.229162755057041,-3.6960902133255833,-3.719436239947445,-7.102061260708983,-3.71384962544905,-3.956893263676722,-3.47340282086783,-4.092192804148964,-3.057787666698313,-4.425170063397041,-3.033535897754427,-3.7261963863786596,-2.8368656513647457,-4.23980030222121,-4.7595000237280365,-6.201327729451351,-3.3849439653334183,-3.4436121331298684,-5.460914885870708,-3.545097645771189,-3.468289109573695,-2.7531351477646093,-2.9655546021582135,-3.2485329624361503,-3.839511539589392,-4.520636114768981,-3.5519994129594914,-6.607067920307421,-7.29063627770269,-2.4585955061717657,-3.1877941971072667,-4.811391890263293,-3.5402473338911142,-3.9259697005530456,-5.562811816797687,-3.791059074539172,-4.651354089570663,-3.9010681264069813,-3.5325252683909087,-3.351300049866595,-4.044697559810962,-2.775159152834677,-4.112664596412127,-2.519181559393917,-4.840797744982629,-4.326383097643042,-3.58006550972672,-3.283551506763499,-3.2866952151984976,-3.0389430822185055,-5.403341446963403,-3.4652746147297044,-3.382994346095464,-3.7976291310635824,-3.6770972023571455,-3.7793364379930092,-3.207906781231353,-2.9919220036647647,-3.777966666762459,-5.407523082188688,-3.05842440055323,-3.524288857440384,-3.8428182227844423,-2.342196689750116,-2.946130838147187,-3.369606469054972,-2.7307245769990702,-3.700994253321141,-4.0258373890454155,-2.9846169224397014,-2.4046876125772747,-5.331815564702662,-4.142842739546205,-3.110333250873061,-3.13344267139559,-3.4113049248147447,-5.528629892989064,-2.716958248000025,-3.159809397102635,-5.624073047431604,-5.267065698142184,-3.7072784003503583,-3.284204385203785,-5.1072621582886235,-4.844441412866188,-3.6244554898360066,-5.66004952386463,-2.9599573444715253,-3.480684240226112,-3.8952614608044223,-4.3657937705886365,-2.942577053549933,-3.4229490290645592,-2.8827028638606884,-3.2137157013584323,-2.8787992338768524,-4.509970645397259,-3.044739349506594,-3.2208474574976633,-3.1285757650601647,-3.0549693573871064,-3.0585705427551613,-3.491430426309006,-4.418064260313501,-3.2241326286216943,-3.9181416269206575,-4.277383747419605,-3.667812524583935,-3.0651233596786067,-2.463437392096663,-4.07353103790862,-3.796769201816496,-3.435766716668511,-3.309806595782219,-3.5808114723312747,-2.78574479277375,-3.5031827907039843,-5.464119398708957,-3.0110224348266206,-4.447122519992469,-3.774629922120966,-3.16169438599486,-3.0641640667705654,-3.793422314844977,-4.345827944900144,-3.599472354933397,-2.9855987453509916,-4.234660145314359,-3.7668873307753348,-3.0834303841129014,-4.189405814602652,-4.573035814930396,-4.038984646894648,-3.328086099017004,-3.7737637222464446,-3.24895128807764,-4.038598917871694,-4.275562869693917,-7.814918793193312,-4.885440750614,-4.436269470406073,-3.873755882027515,-2.5788296205112227,-3.3043917601393193,-2.7601609856168956,-2.549349887946633,-6.042066383510447,-4.165346780346694,-2.641304830622139,-3.1819436522046343,-3.826532679002927,-6.016048911539263,-3.34573975601091,-3.4685308001050257,-4.548611900245152,-3.62107819315458,-2.9380064046707552,-4.049936575405493,-3.439711233339364,-3.5038848989613487,-4.584075001699557,-4.414017060235409,-2.4551178052013647,-3.8632795473017234,-3.461577335417965,-5.5198606364982705,-3.9243849989164974,-3.8211189528732903,-4.546102556376422,-4.124272708114347,-3.847110630415204,-4.715899099305759,-3.6236530936115576,-2.9997512789531857,-3.0371634537395433,-3.8259085081667776,-3.77421673069679,-3.793265459793176,-3.282015085515,-4.567696960822326,-5.592598017091809,-2.6608294169969566,-3.400892653656044,-2.5143516780920825,-4.668040906077842,-3.0686483288445148,-4.423092080393349,-4.140590164016597,-3.5002956608272657,-3.385580821314143,-3.1646342414714494,-3.6419786763249298,-4.316697135524233,-4.251794396126153,-3.176888885457251,-3.8209653189268993,-3.854806220180526,-3.121861265754561,-4.5401961525896635,-6.333398067987682,-3.328484392085478,-3.120167839325305,-3.1334522601216794,-3.532528172808696,-3.273671357492376,-2.612693506136977,-3.269103171343759,-4.028424379313006,-3.9004469752412407,-3.5962870429842337,-3.4133691622155373,-3.367387314264571,-4.049762687830022,-2.7298594583751377,-3.1983451770033113,-3.6822917619084263,-3.204994346538931,-3.799636025224223,-3.7036652864040875,-3.7795474011101455,-2.967431284578822,-2.823547884124944,-4.149490670700067,-3.487027872263514,-3.132000378992867,-3.0331886275040683,-4.128432176991846,-3.3126164816855774,-4.941014975456138,-3.676052320632019,-3.0473415181880927,-5.411394392510431,-2.9874460034114017,-3.2085945499889337,-3.8415980468550033,-3.330689524232842,-4.660327656758303,-4.968709604566855,-2.9241968486850034,-4.222068878196892,-2.471152985751893,-3.99739165259233,-3.6539871270812116,-3.7469958141312065,-3.8273334935836214,-5.1655374947633055,-5.8033878031603745,-3.013126703528839,-4.67244807989195,-4.412308121890166,-5.870608897339587,-5.686697199994936,-4.278862824180701,-5.262286528321939,-4.864253827795414,-4.339558218158902,-3.5900811681109492,-3.714417583345708,-5.017901108530352,-7.126587538711664,-3.381938191151109,-2.88374596857148,-3.8476942154287372,-3.2446911444216333,-4.283862972657664,-2.8563346142135706,-3.320469714595064,-2.7010717835907387,-3.1667183974236437,-3.2023328802463977,-3.3072536327943456,-3.9398467108222412,-3.3905896548294856,-2.808001309604173,-3.0800784358816933,-3.7856547837265433,-3.1406937368686165,-3.3432732374521414,-4.017482359275054,-4.076089100120023,-4.786332169868465,-4.077378863898012,-3.807147755339965,-3.3971854669961252,-7.246382519333041,-5.099567794237079,-4.838307621141082,-4.08961392597414,-3.321754335742687,-5.164706142410746,-3.7266943470783414,-5.01867234956182,-3.748272888204959,-2.5097400337216835,-2.616007956122931,-3.0376148912658625,-3.1974038126597613,-3.4167319830135736,-3.1313277650256715,-4.039254760044745,-3.6390857243095396,-2.9461909682524516,-3.2726144222716074,-3.6956452133716167,-4.681521667092863,-3.4778076188758598,-3.2530176402056314,-2.402210531100813,-3.57612989761251,-2.9168010836228695,-4.422253146226008,-3.4162160677959554,-4.792489791837253,-3.193439821936381,-3.9035397400601606,-4.6679007603017055,-3.9463713004351733,-3.889355381256072,-2.6233371550521674,-4.270371997685143,-4.597080957462918,-3.6062470272744145,-5.618568023489493,-3.738083908808191,-5.11838537206931,-3.526941555774054,-3.296987527315086,-3.861150291217691,-2.9107744052609723,-4.296356897307156,-2.889945073590978,-3.864473488957468,-4.18181388402415,-2.8648593902560755,-6.237890002286121,-5.7243021987028975,-3.1756543810780897,-3.523153980945415,-4.270501528410536,-3.0353660805062614,-4.9049620369215665,-3.173487037833462,-3.226292463059269,-3.6042401797522814,-3.6157346246430904,-3.232678906939272,-4.053026578586295,-3.545092437617323,-3.3848778922907927,-2.8357781982460257,-5.059859953339768,-2.9022666502055214,-3.579527211504968,-3.7113967666281225,-3.054883757983025,-5.001636996623381,-3.3536186628606592,-2.868869679944947,-3.29003241802421,-3.2631100017501096,-4.365084579042444,-3.085473197512811,-4.415058023461331,-3.579737762746656,-4.268432359928802,-2.7560558268444986,-3.212220495859157,-3.79404922274101,-4.690703843298027,-4.756165245080694,-3.4281578763097604,-5.318577179955071,-5.660514209503893,-3.9249093591309006,-4.101857152242004,-3.5195292797776196,-3.791299335217954,-3.446270362143852,-3.8015494502039804,-3.1685877432853102,-3.1532420028904466,-6.9599348974121655,-3.884748430656535,-3.2128809492979467,-3.9732962676076005,-3.0350428836312116,-3.2832133585853516,-4.6637248349652385,-3.298232678162343,-3.947138040225498,-3.720517772389498,-7.5984747833289985,-4.215775241513792,-4.709424059043447,-5.396919610530364,-3.2896006906005524,-5.67073148190823,-3.187634279313299,-3.881154818650444,-3.29653180441055,-5.024113972426695,-6.471206437388052,-3.4635122875122577,-5.404493574493297,-2.5209314849552285,-2.5728530000585805,-3.434592892084999,-3.295217462465478,-3.3216337324420784,-3.0347424238982854,-3.656538212162704,-3.7117084916152896,-4.72799548353899,-4.39073651495414,-3.382839416580382,-2.8673974164661997,-3.962559742094418,-3.808081760990677,-2.871533268298726,-3.8160700943297514,-2.9755375458921516,-3.935723244365559,-4.141206284072048,-5.504597714500189,-3.7856136928395943,-4.601694566678851,-3.201935092194778,-3.3280547665043825,-4.682896450394991,-5.492074585974358,-3.6808072990626384,-3.4228832177957766,-3.986011203653423,-2.9948389475000208,-4.540056282601008,-3.4256166829719206,-3.936417742636764,-4.102814042316599,-3.8290363137980172,-6.012073290008081,-2.70800855099228,-3.415243567742064,-4.182380578959483,-3.746573279771993,-3.807075975042673,-2.687860257534453,-4.032179434496744,-3.241043777948561,-2.9480645241031675,-3.3869609592132557,-2.7797114258952123,-4.051814414505888,-3.154040095153061,-3.6503703366721916,-3.486056587053593,-4.207737655662837,-3.05832823729637,-3.023751802004138,-3.379938895624202,-2.6573763249439692,-3.9850681378932853,-3.916631339651066,-4.144499389749323,-6.103032384286742,-3.7646390141741772,-4.499971378542011,-3.645096938535294,-3.0325836409152367,-3.725619658863645,-3.8385102067252843,-3.2767290627150083,-3.0946674917689374,-3.530145378341108,-6.173145213289011,-3.519786596736126,-3.2715807640612686,-3.3678385430922515,-2.7126780336884027,-3.8238599069945898,-4.0027900998545185,-3.367816004994852,-6.188336306719535,-3.6162792476934524,-3.69297991187427,-4.555832244395409,-3.3698780338529293,-3.688235816551681,-3.446596879410629,-3.5544923574728386,-3.9796225038304205,-3.262730125480992,-4.112570566576426,-3.2222142965440494,-4.253615277756472,-3.0390174283236875,-3.697275116596932,-4.659019658163291,-2.990939261298531,-8.326731977654896,-6.212323551810569,-4.106153459966519,-3.1666550742924238,-6.200454844430924,-6.0130576102184055,-3.404164672422966,-3.3805574493908312,-3.6069249603085485,-3.49264270367492,-3.405538083780479,-3.2546698837201564,-3.348371766188575,-3.3544676296793483,-7.196022531979651,-3.9332612821069195,-3.390198286270506,-3.182097300309346,-3.1620622738080626,-2.5742902129524055,-2.924144762557644,-2.9066457807473722,-8.817516488584742,-2.964817877152296,-2.905403288625418,-4.078601051676826,-3.1485152855979943,-2.72013063685079,-3.312446285391134,-4.325581905648546,-3.315199732415925,-3.919493509442475,-4.61422405524899,-5.027750462821893,-3.6615035940380736,-3.4867049309841485,-3.9646424179532254,-4.869572265448153,-4.795010600966176,-4.098003727922778,-3.369300719499467,-4.218033291494086,-2.8587048815429403,-3.964036896792105,-3.058947671868576,-4.424060671719661,-3.99910389703354,-6.056548488110197,-3.2074771757588136,-3.71373548671072,-3.0101470144274414,-3.6648421937543767,-5.0896717713968975,-3.830093184792133,-2.6224675734487937,-3.7093545230637215,-3.197072145068675,-3.834444591333083,-5.16696726068913,-3.281930837136045,-2.9923534507699276,-3.020772747518824,-4.926973361487456,-3.845021515021534,-3.387060537269329,-3.6049811803718725,-3.966216576454046,-3.5824094009658176,-3.0122369885284233,-3.529138283731757,-3.1912089022701817,-3.4813392451915806,-4.426954636364108,-3.4330187827540453,-7.951744751225171,-3.4829149111165574,-4.672590101797295,-5.644169707167853,-4.008713913536276,-3.354427025136866,-6.016198330074019,-3.371684209991905,-2.884466707171636,-3.1803418912679087,-3.983425799215268,-4.254802292080734,-3.14825789518115,-2.5877337789078334,-3.9340604355810798,-3.251779171143844,-3.9679332646714007,-3.689544187657596,-4.579637354797143,-3.8485456769800988,-3.6429720351365895,-3.544203303722666,-5.093860875962809,-4.834520022746273,-3.9631180343493293,-3.6696351730518777,-6.028483892188134,-4.846628411789376,-3.183894327093592,-5.039462419962529,-3.0851189779884494,-4.038422422057709,-4.611106856421615,-2.685823779829285,-3.890966256177264,-4.445089150394164,-5.038548011113429,-3.9837241696895087,-5.912698627124042,-3.2118370452681373,-3.7165476469619585,-4.157678811918092,-3.3930492744739955,-3.1226848125375772,-2.6444678162051685,-2.995003236061695,-3.4959784039184507,-5.437122513295526,-2.9992820658298545,-5.3085047847053755,-2.9945697785691707,-3.3112148813505375,-2.5705892299488884,-5.278053906627629,-4.179478982603004,-3.173516764245353,-4.741767625948487,-3.2008621923910394,-3.150133838534847,-3.250038233156641,-3.291675362895851,-4.378785904872541,-3.218044095506113,-4.227054480404697,-2.8347033521098104,-2.922394266098596,-2.934478643449599,-3.8797557396421314,-4.224139008210638,-3.447801979675102,-4.347040182955112,-3.613092266187187,-3.7916491834318364,-3.4417396173303385,-3.220173826579546,-3.7458895407310386,-3.778146184089354,-6.001838771787335,-3.074840046547714,-4.293161522600012,-4.461252838097458,-3.781153562740756,-5.76748208439813,-7.083709735826347,-3.198792503859607,-4.3970483531914555,-3.6362277222672104,-3.9591917322928456,-4.559164615244271,-4.557569375094169,-4.818884869714719,-3.870836899144768,-3.2291550656777783,-3.1510013845175995,-5.6757927719369565,-3.716867091878271,-4.037086774445613,-3.0633848506660533,-5.675383464519238,-4.985238904345236,-2.8190507237385307,-3.0631791492867304,-3.3477751348214393,-6.436065384457112,-3.350625853951648,-3.464977695400861,-3.9213908381234184,-5.452457359276617,-4.11260754656654,-4.449930131427783,-3.660663186598546,-3.1528343951391418,-4.659976935730495,-4.8281072628208435,-3.2769840908874976,-5.531506932381348,-2.7399429590686175,-5.387729427264586,-4.083421417621665,-4.9689938338471915,-6.167573734921711,-3.4047130491888065,-3.1908845178271825,-3.2222526213741087,-3.5962526532244556,-4.187529753972974,-4.1762337201210045,-3.5192980764253585,-3.4482073499590906,-3.511490116240553,-6.147502398735248,-3.087798492384172,-3.804440006839214,-4.408059187300406,-5.72845070030866,-5.220985187500952,-4.303774909429014,-2.9503048655991817,-5.34088563189187,-3.5357780978436906,-3.6759583343088673,-3.481655085472539,-3.1170003891799363,-3.307283479516415,-3.0231012158555792,-5.013483102747916,-10.38075519671675,-3.245493724671999,-3.2620903514118127,-4.654692895871793,-7.191759654771718,-3.4907437283810268,-4.8028671660393325,-3.9722551296334023,-3.1010676356486697,-2.8946596707985965,-6.229220457446846,-4.6417170679913164,-2.909084811957676,-3.6500623669679464,-4.653963016304377,-3.836715736083399,-3.3362271612130927,-3.4495519369305296,-5.356636747276166,-4.994105940672492,-3.543408379082187,-3.5015864115975894,-3.778397228100575,-4.332739968700779,-8.200316131212725,-2.9476418505607342,-3.5934434061157123,-3.7848871619305657,-3.3812984655829816,-3.2252469987682177,-3.704743592556992,-6.027564985247662,-2.9084140032439607,-2.7149406599079287,-3.882951093310739,-2.940673566350278,-4.850051235543411,-3.3277459523793818,-3.8032043238953297,-2.8828994418455887,-3.25181250402543,-3.2566150151737814,-3.244066743726943,-3.015447161461723,-4.992924096590106,-4.109666290686878,-2.9854644902535057,-5.792689269150118,-3.325127421133622,-3.5071888071379487,-4.138633465705631,-3.303684233712191,-3.2008995805499167,-2.833347492269836,-3.0557877667766657,-3.203727120832945,-3.066175185397287,-3.761948904468695,-5.916146894081262,-4.305415585179033,-4.032196935069306,-3.9595376800681583,-3.5051978438027316,-3.4456305106781207,-4.065081146928882,-2.620950206087641,-3.392426664937123,-4.103825608250421,-4.001804175517058,-3.5310031799663166,-4.296484617136429,-3.1602454554602644,-6.008395670537953,-3.5913617558004414,-3.1145655550494094,-3.600211705981992,-6.549417208690397,-3.3074256135277063,-3.424531808885979,-4.486863131784434,-3.3220444548961123,-4.044834280973488,-3.90047272800179,-3.9854786784751375,-2.6007642124495667,-2.6822034950515286,-3.2696568405756983,-3.856131087009087,-2.947978937149262,-3.272317243762751],"x0":[-33.8301592626151,-41.64748473275727,-4.755325149525403,-20.031013338512583,-29.79797762532258,-48.05654793549883,-24.164972235369397,-36.52978028656554,-43.41863897447836,-1.578690411644934,-36.39234753467835,-23.10176285118092,-25.595145478476024,-44.88977096975558,-33.13327360514515,-35.30682422723209,-6.178290294631983,-46.967838866189815,-21.60846114202589,-30.029363027338675,-25.234539282848235,-22.149665014964327,-27.0334249499107,-45.73161966744238,-1.18783874597449,-6.659789951829276,-31.62946705173244,-8.334830223036327,-14.974017116585003,-17.85033223807675,-46.49819557090087,-44.36556473020173,-48.42001314534136,-14.65229855605391,-44.363864370453896,-14.855095710669442,-42.03472590985269,-3.393483063513947,-24.328308211033224,-12.269375156914087,-42.58020643255542,-49.247289745597556,-26.92301661773803,-38.817258045322944,-9.408463896119112,-47.74764316936078,-35.43395474940596,-9.928671742427564,-4.04852325216174,-34.4075526500065,-1.3475486455914898,-1.96336828936311,-13.12758465537267,-31.084871600672535,-15.080666400540842,-0.294050243886701,-16.793691959147626,-10.558056804325878,-3.4538561543917656,-9.146840099685893,-2.7171294946697677,-18.959974288421122,-30.40092172040071,-2.11027893170721,-44.65429184551517,-36.78295533335633,-44.590393122113184,-48.30408377959105,-42.85095907954541,-16.89498933023352,-29.028242830599417,-45.46528910151586,-38.32655772880631,-44.639082429154286,-0.8838464234267152,-10.562295035092939,-33.30598044430564,-25.50026254906479,-46.81127910404484,-33.718083273074384,-29.820620699952173,-5.131481976841812,-19.85553049400195,-27.70006374104721,-36.09591305114562,-38.96642434854593,-1.524030867439219,-44.43334598528239,-49.84221496616994,-31.215019066919748,-27.545144995482396,-3.6865624200235314,-17.189857573360968,-39.18757745894019,-28.898373649098286,-33.52399812607225,-16.666348944519815,-47.5475141309782,-8.716527495870906,-34.70686673202316,-6.124848048376997,-21.92480543826636,-10.957081046262317,-45.271454583519514,-13.216221089503888,-33.039588953619116,-42.11737696175838,-45.25518383656302,-11.55245756755866,-35.803930831339656,-44.964126571507,-48.749067645076174,-46.30083249392292,-49.11208092802247,-14.562371713627487,-34.708455477570965,-18.71675948757855,-45.19054725798593,-4.086582227136704,-34.360229368389426,-49.57540582418244,-4.273674103385428,-28.348355027623672,-21.170263855531402,-25.269927570346972,-24.89003342401753,-6.770369963842415,-13.625199926552256,-46.690238234188044,-34.949938393031374,-1.5514384704653272,-8.139041423622817,-13.43296176281319,-32.17250068926036,-39.84997261921377,-7.141293590057963,-10.64667659578593,-30.144128633245202,-29.59251150479769,-30.802462540459395,-29.05708264074196,-48.38074054525182,-44.001056284013565,-34.6107223280256,-35.004823275845084,-22.974883517963118,-2.022706204930791,-48.874520616953646,-46.149962508339556,-19.969921849985507,-29.51017489810386,-17.79634149192606,-30.611434917356217,-31.97248479128184,-17.154449527891458,-8.426142837173444,-37.79917670267081,-8.916051688579573,-12.116799877787422,-3.357341089720156,-33.85387346172225,-41.63190888467386,-12.819119522768851,-27.678694073907153,-13.947231627203427,-24.874379550395975,-31.19519570439273,-9.023384190278827,-37.00131864272416,-9.686886915309433,-5.74342896687956,-30.374974709063007,-29.757682503373807,-33.02536196085908,-23.680156279581645,-27.778539401198653,-18.688755672924273,-35.10776216074297,-18.0644319017797,-17.761285762656563,-25.24968531009132,-13.347522830357395,-30.701063990258593,-25.061595346556853,-36.8813699735696,-3.0526648161763204,-40.52034772495454,-14.808111617289255,-14.931958755534403,-18.345972108998932,-12.886935845951664,-0.13051291636707596,-49.97870132842848,-41.829265060312395,-47.07581102869658,-5.668850332316067,-11.540406522382407,-41.20630324272463,-17.679856451597665,-21.55873044291995,-45.86723679040606,-24.505943359149963,-48.86885999965161,-5.871215746093306,-24.093669517683036,-37.18601825145599,-31.04160745954626,-47.40334367073811,-49.55989080331088,-12.937427121300171,-36.30663706728223,-47.318018162638445,-3.176137488657027,-38.07625086601654,-46.56160959998861,-2.0299842398626256,-37.37694475147983,-37.20434438915314,-13.194612005412697,-24.035900515867283,-6.8779041561786265,-39.65236897741824,-28.673072848487635,-36.143577767913484,-37.24955370063881,-47.376907079664,-44.780324117985714,-38.74662470106793,-11.168310097291933,-44.85101078211232,-26.004925378443644,-3.555058432417968,-18.043669701140963,-41.93295309436235,-20.68199466001257,-33.69536501916453,-26.031143275875447,-1.9103526126407422,-31.926623733149086,-6.608117716542228,-8.954466346041546,-48.04963195897726,-26.734698405185043,-29.90329784633291,-49.55541513566504,-5.935756067711129,-27.30510814357586,-22.770106256275913,-47.45200503662852,-16.37571811176478,-45.52128251801497,-36.37248218205047,-25.000007249266755,-11.308107471300522,-36.11400209682238,-41.00499659908111,-45.204670169945224,-44.30696610552196,-47.27147138725092,-49.14255116164401,-19.014297491817057,-43.10213390986624,-41.26163376631957,-13.69997193537712,-20.850951604349767,-26.979292368321683,-31.11403621245158,-23.279550502029256,-16.134591071662218,-44.245987749214,-25.2615260416418,-15.972879866204204,-26.817335782253547,-6.882245711594259,-10.279720724675979,-11.686247767114576,-8.346723311921235,-17.012549272780674,-36.33612856992168,-7.598564066758651,-41.3449992037618,-32.24401321547693,-1.9429359759932763,-25.938082310509515,-31.068836667443012,-39.67402210196982,-34.878388756232084,-49.96537341681767,-26.052672163879052,-46.41676532222823,-33.35144917627068,-34.28075984089085,-37.66726121035676,-43.24378496910653,-3.4627171918597766,-38.69165215282771,-39.383123340048556,-8.209286567542506,-32.71196490038779,-14.158020990703069,-22.011751657296298,-41.77701467233141,-24.99257745815251,-42.06745571308167,-23.34671869313494,-38.01942423276892,-3.753718222168656,-24.661743257965473,-31.493462729263623,-12.525370330080044,-7.477007790646429,-42.131284319907195,-20.65936281732107,-23.488035905613526,-29.169007541270066,-44.09429995556845,-15.50179139828417,-3.450091225101093,-16.175042689352658,-22.06732462890627,-16.37674480107838,-41.10850167970659,-30.977787904607034,-47.260579216323976,-16.808239178443785,-34.97698475436658,-25.784155706240874,-11.001231590428217,-33.47540400680701,-23.91855132595886,-28.000163327303863,-39.16361699299612,-12.841003293682396,-16.566176725175453,-42.88862576443818,-13.127553399481762,-42.10845953150951,-41.107675926650245,-41.07765084434748,-32.09267051003152,-39.367561873223934,-31.43604099227201,-21.250393201216156,-35.833127286760025,-8.874115374483027,-37.14761359792411,-34.59450179448408,-18.011447780113897,-43.58090131495723,-43.134791840084496,-45.664442224698696,-24.8477279033229,-10.493451564758283,-10.805396870587947,-45.235950736536935,-19.692386668645213,-40.8494513604923,-37.511352745159854,-14.235228256981536,-45.16179438230702,-17.094975267738675,-47.966227644720526,-19.82566979625361,-33.16832293959039,-3.4416047483541545,-23.81468855294352,-42.762428658350075,-45.855692590779555,-1.9260857066469184,-23.833205889855325,-46.47388562242774,-6.912540278591084,-36.98534795082401,-39.606000039057484,-5.362643718224103,-43.65906217927238,-32.5411556083659,-30.464045126935346,-8.62704320062615,-46.211076002503304,-5.221825806072311,-41.983589994311764,-16.850580743308154,-9.30946303579766,-11.233452035301617,-15.11512407930471,-28.243312299366487,-11.161391383341645,-42.91583066450644,-29.05890232977171,-16.044229937654343,-43.78143290057397,-13.025170340003234,-10.527413428906584,-42.67105440088761,-3.5973904102433063,-23.104036178130983,-39.91309636291955,-24.88794542381594,-11.675336111710543,-48.19289615409785,-39.64806972749969,-17.45789325358954,-45.67648831460487,-38.2000739153321,-27.895979626380107,-20.76677221092027,-18.670665949631925,-38.03783150521394,-1.5455348612366082,-29.72716499969409,-41.78702911785391,-3.971855146105774,-48.43125423934153,-14.878097415773484,-43.48277224192296,-4.646040193629142,-22.328576758984397,-23.032458618428485,-39.19400925698383,-6.888175002191311,-7.513405687245445,-8.272563287152346,-14.018980991556518,-3.874190557865498,-12.841454700122457,-19.14388192899815,-40.414535884132185,-33.90477169477144,-34.84661716548361,-10.41365395816527,-10.952034735271676,-37.554115964990075,-23.66601731813639,-38.498303583295964,-47.470894393403604,-13.096092161176543,-48.066249348279,-16.549011089322352,-26.21910284847335,-18.953652618449468,-42.72607277051995,-48.04762621755809,-25.839374089361435,-34.67354031041131,-43.47806705422871,-47.04546568332692,-30.65057916506938,-15.24050498274303,-2.6999164787874563,-1.780107372532902,-9.537856917767007,-18.644556385035415,-18.78003787861694,-40.82915165255112,-24.26732154635165,-45.685840462632164,-42.66594850768999,-22.7379210285632,-34.05352188158517,-49.84757562204134,-27.362763449597516,-33.792599294824434,-27.621443409928006,-30.469617532518168,-6.930383092092107,-27.99743190497753,-48.226713170156664,-6.94418846921121,-37.25830745530093,-32.191386993036545,-16.746171428383803,-29.466824938688994,-37.39186900812801,-40.276875099473585,-44.961908179839895,-8.57558728629424,-4.741658485170297,-12.260501409534685,-9.565332895336887,-13.844108855518511,-16.384206139075598,-36.80044701249818,-2.627974568748237,-40.6409760471944,-33.65767629152181,-48.196431089769156,-25.9022838525505,-23.298553650631316,-1.6871527674413467,-20.91222138852933,-19.147529757381765,-7.667152377883236,-19.223992382260867,-11.264996408293682,-16.35960585616314,-22.68596297267428,-25.84356735261374,-15.557659090124776,-48.797904013747385,-47.86841710165158,-4.289506508744301,-46.67516073439243,-5.661849490229088,-15.300517158525507,-6.319157366542239,-8.244802021950681,-5.2013695763363454,-7.1733227536805,-33.72984200277316,-40.57774743956336,-46.26261064838837,-42.909751395015675,-21.098662094451683,-13.663086239230404,-25.20940650595308,-22.737232788590855,-40.33125342059892,-26.059982671695458,-40.07276630528986,-10.387991804565244,-20.908074123652277,-28.63517163418292,-3.7357799353048393,-6.084011015583335,-35.37742628785655,-43.55246034912391,-9.706882563852993,-12.854849127150302,-9.696347972395369,-18.231075891451297,-35.57009484843272,-6.346636592451915,-12.590796129692606,-15.051661512687586,-6.075855575845068,-7.347871218352431,-22.0244383099364,-0.5958465242579924,-8.364544045905253,-35.595156480193765,-20.27343254718874,-36.927974094808846,-46.02838134477864,-0.24036878828014308,-18.052945155918366,-33.930202081289295,-45.14784640094361,-40.22563464150798,-16.455669598333778,-6.744101187285212,-12.918734338968163,-6.426784896037785,-0.29398381745951996,-3.8717053126819834,-6.6262202287231675,-12.522017211956872,-19.633298925727637,-22.834764148477426,-25.12252282583973,-18.36537611961472,-35.435821749472495,-27.647274408710498,-30.710333563050796,-2.0682190198895944,-38.49171916964222,-47.77384462105846,-19.150644418296004,-19.367958470950597,-31.943232452043834,-12.67404984199132,-41.527496013129095,-19.874006737604553,-18.670399379796056,-23.207912542127794,-4.154530624433672,-7.899996406711374,-32.27757281886851,-42.299494431096996,-43.44942747379055,-21.995152991185098,-11.116190084590382,-23.345935677492978,-0.3492768015988523,-23.073835748258297,-5.181985905733233,-38.92716849683902,-45.96933351889875,-47.35959670311652,-18.117537343164358,-8.614912062553659,-45.297579433615574,-1.723813434800725,-42.740332791989,-9.970403355468104,-18.398276553981553,-31.419091898953187,-49.92685740844189,-8.959142278835575,-13.80101031223141,-18.489456627503497,-19.1009808038223,-36.062106111855364,-19.831414926098077,-0.2822826193043415,-45.98887435842172,-36.5297052367591,-32.04273796410446,-43.097966993815874,-13.482256906713275,-32.59641465694243,-49.13731144138331,-44.11504771665879,-17.13744396144915,-12.63579050698348,-0.9107787495124753,-4.989206287925008,-1.1282639082242918,-30.62398659791279,-33.00475496295594,-18.205626762239312,-31.807822684961053,-29.832485653115416,-8.383715281198867,-39.93669289655759,-2.219100861012402,-22.789168099440193,-28.247766336635372,-43.50364683361904,-35.06949899870514,-4.536853693563758,-36.31998213165516,-42.641422036644784,-42.20964522311639,-42.286096629048295,-43.521466408119416,-9.163441322269083,-41.97242026624984,-29.066017344399555,-36.478675073642705,-7.759018005755047,-41.74052050384972,-6.653064642688744,-11.754901312435651,-35.51058079163002,-48.1520692431753,-4.785433356843005,-5.572498945616466,-28.18644303932505,-41.90370520166405,-3.154606020578632,-11.981658446164756,-29.163927393294543,-4.434677147511145,-31.077031426864167,-20.763288968235727,-0.5675359441886241,-38.032558018066744,-1.2932899149784793,-28.590213368651273,-7.315405360618565,-20.142400651718905,-17.684144261477652,-30.71831013722839,-10.85590722166775,-3.1069259495119295,-4.587809184554681,-42.647471926325096,-10.852723007855925,-36.23626292790391,-32.87433860340381,-8.011843648833207,-14.656052658452158,-49.0680517473038,-6.442568923967329,-2.450517944466568,-28.49561482552184,-32.82734237899139,-5.460391121587338,-38.93244956216538,-24.550831900835448,-20.507328133290237,-37.96426378132293,-4.976073008169523,-32.20913367738888,-42.88532583359378,-29.579306408595617,-1.2557525952159754,-39.33561217716601,-12.604476478495485,-14.37038212727324,-46.61413797945194,-5.127979582255504,-27.99152515722888,-34.37853342944873,-40.59234585673372,-41.05235815046755,-9.828130298322401,-4.838830705095576,-5.126161325147304,-26.724393335347575,-36.96553175297939,-42.06763588638588,-34.850805940703985,-22.713162997195436,-49.592474854403555,-4.064721767970858,-47.739156161424965,-34.08808032534908,-29.086562868847043,-16.84639479638772,-2.6821068250475144,-46.763997866186955,-34.5374876857739,-48.926862143804385,-33.862208820703245,-7.601768154436417,-46.01124524991798,-34.910806519627755,-44.48389074386094,-40.623545712475504,-0.30473437190638997,-31.951987650150283,-45.0400763137077,-30.49785474190818,-29.900523207449037,-36.1435031112998,-24.744643563652367,-15.151432933833176,-11.437334070315764,-21.525596311760285,-39.4552403250841,-48.62691252056739,-34.57595572336398,-30.665060524000342,-37.844827777390876,-36.718186752856774,-27.54812886464707,-3.406477098863847,-10.065170744584984,-45.902088461778746,-25.419485736374426,-16.735811340850404,-23.416408845581294,-37.9081757884163,-1.7433991464770315,-31.58532328992577,-12.173027907950084,-38.87941890533882,-28.959580387348215,-30.833021448871367,-19.130865131381302,-15.251053184000229,-8.14895585919313,-16.390525720200934,-24.37895274677966,-3.589876482553034,-8.757870096872955,-26.860131421134092,-2.64063634160554,-20.31835295596036,-41.29120824098821,-27.804480027114565,-21.88908615003038,-13.75839130037887,-40.03931526454697,-39.14307220629439,-18.366936830766168,-49.92413003307059,-2.5443211136724653,-25.65840584252882,-6.066538197478821,-27.495887338898573,-41.009021227621425,-28.627434509969763,-2.7831745096792204,-14.656440554581385,-25.283889045645225,-18.14188133743907,-32.588422363175326,-40.84124244227808,-27.84226248311512,-10.355147882960857,-4.739400190794008,-33.21399298157378,-47.35055440952443,-25.674399618581035,-47.56740179785536,-12.614533371270365,-4.118781988741671,-2.0024928224837146,-27.989563276290152,-17.440730690000894,-2.611356714296298,-47.61688198364927,-26.863671270732738,-29.959422802208802,-26.604074332308446,-6.824738370798567,-3.9926177434509547,-18.12286494677441,-34.177568177411125,-35.36305698952774,-41.39513684358717,-27.788314818938076,-29.47345409617054,-36.62494286936072,-0.47686809130995655,-36.04162483735094,-39.38796019357994,-7.171321271564645,-4.719325653292373,-19.06946025815793,-40.71722681393267,-38.89777910544954,-36.13959738703658,-42.33596687598743,-27.598856823086713,-26.504417754400457,-29.614769256371552,-34.570558290978546,-34.98675523177654,-38.69815450133868,-33.51313319629063,-35.531105232697676,-2.715861013252141,-21.483198850299758,-33.83508937904165,-38.37600630492785,-38.853894746985986,-46.123890155524705,-12.750268395845687,-30.35923722393892,-10.29268092118938,-4.864008940178078,-21.767285567037565,-32.214683172506206,-31.289686288447193,-9.116064612734565,-9.854715693493466,-41.44844143974233,-9.319880739203468,-12.590089646685554,-41.05672725028494,-5.588701874975599,-49.698635643793274,-15.434779032729129,-7.951772273463254,-2.0235787003005212,-28.510027911729864,-2.548581035215025,-8.69831853207701,-22.366339284031934,-30.749492459827067,-1.606431757744109,-2.7197636388462287,-35.453091285883744,-13.191424245777883,-49.10961118426614,-5.886729556068948,-33.403272206090726,-41.27761403001702,-19.90876418089981,-13.87839177101149,-8.183307373959481,-28.697295376183096,-37.98435844579444,-0.8228515665028358,-33.59338885976286,-23.888101881668653,-1.1878005879552012,-28.96297691721915,-5.513392023960062,-14.239065113072813,-29.505773440615023,-29.10119129204074,-34.53401871198388,-21.239299561110624,-9.809744754967053,-9.890588438041881,-48.720818648636275,-22.748472832582046,-41.42471737872789,-41.62369960173711,-21.046372584671758,-30.226117765343908,-34.522713852847986,-44.38934915623262,-5.981641739388466,-42.093789520532354,-5.327161706666583,-32.56757186796736,-30.253447729101566,-37.44082006461454,-42.895779615882134,-42.439779866370266,-31.47119671140772,-36.49426785258368,-0.1497243038577456,-28.485049866935476,-8.701105318316104,-22.456720666155107,-33.74909304361442,-3.628004970161214,-43.33313607210131,-16.414178234339204,-35.461299187075376,-39.69200927172597,-45.062693514156614,-19.74182103506482,-9.881063432856596,-15.522334577459851,-49.680787427578124,-12.014019421069355,-34.26982594272741,-32.14270371655563,-47.702832339255266,-1.2212453084876063,-34.199005640421845,-13.18273456164194,-18.18734321285732,-5.337800048030084,-6.525339896153282,-17.832954967137514,-49.055627187806664,-19.275128814173904,-34.41805423209715,-46.57893710334561,-36.51080273676376,-20.349861698988526,-33.600830808270466,-40.11119542063104,-46.455230925497894,-0.48664532896597334,-19.983515511129312,-23.3793063355739,-27.17201832526255,-21.75489485614548,-48.36520522651138,-5.204890575973042,-20.869911489340154,-23.79877572318746,-32.170552049635525,-47.11795665459546,-31.096022965868265,-16.846609565176575,-45.07127141990358,-43.005821649501705,-32.94508838615505,-12.041267160923653,-49.85276369155267,-10.45156408147989,-11.662271069185405,-22.814530465642857,-18.91672720296317,-32.63821151878894,-21.4174446706747,-4.5659017971032,-47.79368927308718,-10.69413071806633,-49.412622361183075,-49.28170526425365,-15.343521542675587,-5.611125627521451,-38.93974638835781,-38.16541167193692,-32.32597391566292,-19.39591005167206,-19.603421926186027,-31.04750123035699,-24.793656325439017,-33.02871074246531,-35.10722393768414,-9.258957632377985,-47.58462140284665,-48.81460524034817,-27.783787632518774,-25.96370107015147,-2.973355829521429,-12.769578929210756,-13.435865662477632,-23.803482038294298,-13.217708941956108,-5.616115388109977,-24.47753556110943,-18.613130266411883,-38.1590639498199,-49.6894957257482,-31.246033210360835,-34.36901373405059,-13.759918577245067,-37.33316362382808,-31.065581907982587,-2.4165413247283607,-32.82857824717812,-17.81540245963721,-0.502501227658747,-10.67331593511206,-25.100582625804012,-25.161065347737367],"x":[-125.11152427715837,-113.12041086636006,-175.08982870773485,-131.47689792121002,-180.41213047538014,-118.55508952240083,-186.21385810968056,-195.6929145906392,-130.35559687431265,-178.52042203248803,-117.15425369152837,-147.01468223361678,-193.90377338894908,-148.3018261845014,-161.25277596177207,-161.65789630225157,-106.41169643186805,-192.00173291481687,-183.65077842401118,-195.1640997420685,-138.28279259882777,-139.51012757942408,-191.4296957902931,-129.14294808329373,-196.1749526462319,-156.89186366966402,-180.2459900486746,-146.99295143372515,-129.02361494269178,-122.01191487744165,-158.04176313807903,-187.33764270478622,-142.08525525451412,-101.33245462612754,-137.903469080839,-162.52986649865534,-104.38266942175886,-192.83576746260042,-195.51580662552834,-113.92712654695553,-194.62540181788594,-178.26125770702066,-142.09590538533809,-190.8690217062889,-126.4458305614715,-159.75046725839096,-171.02633111595748,-135.1690187004902,-135.45712094205845,-132.51985540083908,-108.53185537661238,-186.52009666455095,-153.72982460673046,-197.12942673365868,-108.70210510388219,-148.97889952305758,-163.620810609905,-145.0803275078224,-197.50499509725626,-176.23604339841793,-165.2898419074493,-174.17989638546675,-129.29897314310813,-123.98370574429566,-199.57437839480352,-117.28156751594823,-128.17805472157468,-112.822056195599,-186.9484438291695,-137.70866311391757,-180.0066395786164,-112.28497661499766,-115.7154189402704,-167.728356259837,-117.09217996526466,-111.82907816485022,-156.3928065220095,-197.037998394857,-199.9489265656243,-131.08154840118533,-181.02410084034113,-147.87516325975162,-163.35419135366772,-125.7804550986262,-195.0595889753356,-103.54187927456846,-147.61298574955305,-117.38312287103987,-145.1288363207388,-186.9676093146504,-169.0951191633898,-109.62900036671601,-152.68317016508556,-141.84890361500175,-164.0943685784267,-109.76443698844216,-168.97285708819632,-166.1487420951189,-104.96520145657212,-161.12250500376237,-148.29495168657022,-144.36081132880219,-163.62894891300837,-149.49623961613725,-194.70853885686336,-119.1085738083427,-167.81738859209196,-188.52902130785225,-140.73266535065613,-105.1431227678967,-195.14907712753654,-114.20448311781011,-155.21210296450136,-139.64436479005224,-155.35764962234208,-166.3178039847941,-135.46446771964608,-158.50433962192264,-112.94546929971338,-124.79670705934383,-187.87321387353998,-136.0678177707971,-148.44050135133358,-140.21894987974682,-162.91180815017387,-158.45005002133342,-131.51224092730465,-110.96580728987533,-169.56771871539814,-100.3703395414727,-174.6617408038754,-165.59857352814254,-190.65392997956835,-117.76848465776841,-164.1991765279342,-195.55586091194914,-100.90655576355722,-104.46323666042964,-181.37973257409647,-161.79029952437122,-196.44870693636508,-121.56775336893133,-170.6993765580163,-153.03542958755256,-177.65623221801943,-172.4132918560512,-163.45642176211305,-121.3621446821689,-102.26220452557091,-177.35728389197766,-172.4720177096114,-155.24638342657377,-166.06989986117364,-122.2802715439197,-125.80020142076009,-119.03286689289723,-104.97070346785695,-101.79009778853279,-191.38400671314034,-156.12603695689677,-184.91476705450413,-198.010842004698,-139.77484384899049,-127.25730607919175,-172.84259536162187,-194.264336767768,-164.47232137647083,-166.78426729384734,-103.01080162678527,-159.8556430253303,-193.04036160277087,-135.149765157339,-143.9060011053861,-147.45417215504182,-107.90660050824496,-164.73917544333312,-181.98577087041645,-189.27640858763561,-173.87947515768224,-136.7998047590408,-152.30391741050877,-180.4796147622713,-143.49169369598775,-100.18689149893638,-165.52778612329922,-114.38499653606956,-161.11005151556415,-149.47790430324284,-171.0302560748242,-144.85140569543927,-103.06413276931332,-190.4714210509442,-197.92609509322727,-170.4289297770303,-193.84392184794123,-170.28499166049207,-126.3531571367059,-175.15642623374674,-140.7197697526936,-181.87421167961242,-110.34235507600772,-115.26661638636287,-155.3222232591175,-163.1682006966679,-118.98333417344948,-162.65209187173073,-138.78789178757955,-162.1124474002046,-153.0971795067343,-186.4946759956954,-146.8790980100328,-148.40476978362324,-159.04520882665565,-117.66792179923162,-154.6312798242638,-103.96670559776284,-153.3086738437976,-118.78756723189076,-168.6073398697365,-127.67785952368911,-170.94982423428775,-111.3582216141378,-169.44378159129414,-146.76592637433177,-170.71603941639873,-189.91345048394209,-152.41960641964164,-157.3299568282922,-108.36890367010908,-174.1826648839486,-184.10412344348032,-109.72101854089233,-181.14198555619515,-129.91386077610213,-183.66193551263564,-104.40776916098666,-172.9518706121568,-161.97703260366148,-114.5354399119761,-164.88849432269402,-115.24864602723461,-128.3093725181141,-170.50055952069175,-151.27533608059758,-125.27609870765393,-115.48893298077026,-140.63474640025916,-138.91157063070742,-171.39210282494815,-104.46944375346061,-181.90338490315565,-150.74116822636242,-146.5762217770515,-195.33672477052727,-104.720464909938,-100.58175970122267,-163.95273869736536,-176.67766546409672,-112.51198474479519,-192.75314573440266,-153.89693674352816,-146.19577356186755,-106.03087695063869,-161.24845065301878,-189.0957409160088,-135.68091578636353,-114.9189453009237,-113.27550619280925,-168.3067733406396,-100.2248551913369,-174.28684749300197,-142.3695544230046,-121.5290930579213,-179.72030785542088,-136.2531764083505,-188.68246819480817,-197.69727858306808,-158.1101626164464,-107.13506112610757,-117.97906370259714,-123.8235917908953,-192.27782241776845,-183.72969290375804,-127.90921211938783,-169.14926208119795,-141.3046703333047,-151.79480583106712,-156.45790444715232,-184.35509930388568,-142.39765316651568,-170.5522348171735,-125.85984737709055,-159.99346295872715,-149.74501090288092,-190.71239502887835,-165.95517817051106,-183.64009226080614,-153.3060470910338,-192.36564135310076,-139.23361992738464,-114.4279097692661,-100.42908133978045,-146.22367339428808,-198.42886739142628,-139.6516706430521,-198.14245745669524,-116.75100088459354,-110.82514847525671,-175.75261230320865,-190.47318851033768,-118.2965657671363,-185.29976358605978,-156.60413222140292,-155.08375487960416,-144.79724170302404,-174.30831486776978,-178.58590883103957,-137.79250918914113,-138.62968982734026,-140.87677276360523,-100.48805889111159,-157.55980249795283,-156.9237318062185,-165.63804753135273,-184.09623330537397,-106.14484090208411,-174.0756632595654,-112.20435662197828,-167.7368965197406,-131.81101740951445,-119.87910026520076,-110.03134831570178,-172.27227773826075,-167.4579705161444,-104.81505373095068,-134.56691321078046,-118.37044977882938,-106.0154659983789,-160.83753288903927,-168.57940303584118,-119.73217029525962,-158.9375269017279,-139.66835384085203,-187.35871266357412,-107.84888651921082,-156.1862312909222,-153.64314565501778,-156.62222479162227,-160.82004803112665,-125.70400655009747,-111.24465067543564,-131.78906482134988,-153.87108234642957,-192.4300564938532,-101.06739603655,-105.14346524878437,-143.48313713126913,-157.03443428241565,-126.61969885933406,-113.70847802742585,-198.47720121079,-157.2773524010195,-141.69062553423316,-145.24712762904016,-106.40703162816745,-125.40355902986934,-133.1269046030406,-157.50802052520532,-186.93048809913498,-171.57049154990602,-199.07150444850336,-166.4643918621073,-151.10776213264597,-121.19080155072265,-114.9781977081995,-104.29184113718608,-160.75149077929996,-164.38956474835845,-162.7130971186279,-119.21141051847799,-178.2061776939515,-146.08822906421264,-159.33803203987577,-137.12570740712698,-177.11606421779814,-183.58528733027356,-117.14618599801221,-106.693724974986,-186.29442490401976,-172.21144040383663,-175.86425283452724,-164.83183927959402,-163.30553790485254,-123.75315309580459,-133.67111786609559,-185.59932954241918,-177.60992149641882,-100.51216432335657,-150.70987562385056,-166.19234718438875,-160.2827247371841,-175.26784362446654,-162.33720993300028,-136.52757156651177,-198.09998884137775,-122.14910362948832,-141.4231821852674,-126.43620105509228,-103.00079896607157,-128.04392784767288,-170.80066664283967,-135.7161829764562,-121.10462765179508,-102.67283824458082,-161.16896628194536,-191.94451129658285,-108.71775393918064,-149.1248587724229,-126.7895535192161,-192.2654622653703,-103.091686408214,-151.06087691101843,-115.5542155326307,-158.38003298530302,-112.23288693846128,-110.96500684427441,-195.83602022658528,-158.72692094099187,-143.2198207719402,-176.39116177470007,-106.50828587874184,-171.386639517028,-108.2638759283363,-113.84127858106994,-104.9230376436463,-173.91617562771478,-112.22095479167005,-182.63104683508868,-101.53391411076417,-120.49641872296854,-140.43650380055203,-177.71647033016595,-189.0488779173951,-190.75387838668092,-183.1973280757788,-199.2998280518919,-164.1560564415189,-121.4477280509177,-116.98031763050068,-184.78582741815427,-151.71189489312275,-192.82479168877947,-165.89349804273326,-112.81043876817563,-130.96697259614876,-176.85411514422435,-198.56314193399666,-104.31581899772162,-143.53368647309878,-107.95563142918736,-134.5356611137838,-171.86836325441968,-194.64039742533285,-102.40935776187219,-120.19888120069461,-104.5793265114699,-142.79510616311478,-149.9030837445522,-102.13024407010268,-132.066625603441,-143.73876056371438,-193.488043208627,-142.0922879747857,-186.05188982160138,-186.6374619616836,-146.26990573572257,-176.84911142255314,-145.23630740520645,-131.53338129120175,-191.0557297818367,-173.1291090821369,-193.81763109532952,-131.82657288191845,-110.16450612867072,-151.86069824491318,-104.28331627762071,-105.97042151720647,-136.37173489874556,-131.323884663772,-112.20953852221922,-127.63877403561588,-142.26003765075768,-182.47220241386924,-138.37624236519474,-117.421917119326,-179.431921186037,-153.43368788982093,-186.15476088031892,-157.46324585901394,-116.4570075838175,-101.35838522729583,-109.94960329804731,-117.06256481788391,-149.51034813478415,-173.08502646748357,-146.87042374849034,-151.52839668151722,-123.66919693245133,-160.99026081640767,-193.02329929888643,-110.9078747591945,-169.0005103331966,-156.50051694031845,-136.66252249680366,-177.26826264217777,-127.65848618345453,-135.96525315813727,-165.36314799499166,-175.40333588304583,-186.29972189181697,-102.396337419637,-154.20576262978688,-134.6218669344537,-160.40386552699294,-182.4447196200274,-115.88452183506475,-116.99411432176578,-160.2372120298539,-135.97231143847642,-169.28062080164273,-171.6140994511721,-166.09258840168354,-136.5537962266194,-130.1246308084033,-123.23169306807125,-165.06723840444533,-187.6135088624506,-100.15714076349671,-119.9619444772433,-172.11034180023324,-161.39530068463915,-108.4363996988065,-175.16658291688213,-121.02472649921519,-164.76097480346527,-108.46868708151858,-159.4878494131429,-157.75802015812025,-169.47113729629478,-100.8910452114399,-143.54646446553738,-144.65659977985518,-150.8484236245538,-119.13812370384387,-197.40505882503666,-112.11979057728125,-143.8944913901518,-112.34272071274442,-172.71474674062665,-172.0736663906757,-144.74868862999676,-183.18725676125223,-107.44615885900745,-139.86555234582264,-191.7155962210646,-185.52813273074068,-191.61043906820984,-106.2621239129856,-163.1567896846393,-164.78422660843933,-192.3143347590449,-178.1018188554836,-113.85129014663502,-199.204385953849,-126.25972513071903,-118.48763264229166,-110.1471056684289,-138.74733489569928,-199.68191979141596,-180.55783067888086,-180.17606130253864,-121.90375993917067,-151.5828521910222,-106.67913118427535,-143.56917676694533,-196.63025746281784,-142.93877450219273,-113.78609700829554,-194.39415420026046,-137.3196906861246,-160.73572782763824,-136.77210944939205,-148.69445291296614,-106.40087260565248,-160.2955984922669,-118.2343913251955,-100.76149206295071,-115.82116812558682,-191.95606824498805,-113.36366285764412,-187.73847878648485,-120.17408993267293,-160.01007136899779,-171.15287968048804,-191.9250337988405,-171.5572066529602,-164.53742385451497,-127.36378833742845,-158.50167755183764,-137.48962356255123,-128.41923832332407,-136.20520269712728,-167.16418921319345,-190.64108817162375,-169.21613967072932,-135.14027442447383,-176.87875337325113,-177.128832642041,-170.02927144141506,-126.50306858717832,-187.42853256133372,-171.682881809686,-139.44442160476973,-104.60839818045532,-190.38222009082284,-103.42254512848604,-188.2691273250623,-189.77614048911332,-188.0575145651573,-105.71879386804139,-158.22634924303006,-113.36763520654483,-114.73385133667644,-151.71902040321783,-195.2395241989583,-187.03250594328563,-124.1227377024538,-127.79169630743297,-156.7037670119696,-162.54584628486512,-112.94496387127867,-135.84095426252787,-103.90133441876144,-165.30329017676098,-127.17532966555105,-141.25601434888964,-116.79630219516923,-186.98855078378975,-142.69241980526562,-164.31284885689053,-171.5111080526605,-100.25985367176402,-145.24156911219143,-167.8992617292024,-197.91155536568422,-165.04387589380343,-170.22178487130054,-177.7938531528838,-163.05728455520958,-152.22211763759944,-119.93512227906183,-199.85294096089618,-171.23049139508944,-136.10213854444822,-195.37232016225028,-116.98553029512941,-191.26204187699608,-188.91287332450327,-136.29906570616632,-105.29391019302471,-183.04737664101566,-107.01965306432425,-136.67394137752257,-183.7774582613944,-189.4711017851318,-122.41795823697225,-177.19941682845104,-147.6811803182418,-185.60445529401613,-148.31937098109628,-186.86749021288873,-177.52665836539546,-146.24352256396594,-181.5350661383351,-130.71526152571488,-178.68509298779145,-116.91188788072824,-111.74311388725744,-190.47238266969018,-107.65127545576792,-193.85322322210607,-188.9098545650074,-176.88289437806847,-164.15729572605028,-184.44613153609697,-190.54512168062945,-152.54444757624915,-186.1915556487114,-136.4568142644863,-199.3267701868805,-109.09898055516254,-158.37809513797174,-180.18096748087638,-149.25285966906742,-185.45333490372417,-119.55460927964434,-163.95286561121154,-179.22454678306585,-143.91118961950076,-109.36746210283943,-106.41304078343315,-113.45829632861835,-137.48448193084886,-147.3053081482637,-154.76233052455527,-105.89239039315066,-104.50291056700853,-130.81495776840995,-118.286349348839,-185.04576151527598,-121.80280941473234,-176.74906281644692,-185.57107903417213,-184.04511235604676,-189.6650088889148,-119.02920612463123,-182.53074792183818,-118.33837227079181,-120.50634659035062,-192.2853017995662,-181.1433069953042,-171.33008361612156,-136.77208227361214,-159.38203092111843,-122.7245416042301,-129.66556615299788,-181.43467879878972,-126.24860861573686,-118.93132220195217,-105.63707370734299,-145.54331295212427,-178.58336669983845,-191.06957034883686,-190.60290366157372,-104.2336677260507,-113.05031837179227,-146.93807553974057,-159.57073301771288,-163.576497693139,-152.14086967389858,-102.43190907480792,-111.94917060425433,-170.37646953809303,-140.85159014220775,-183.8648408625695,-144.343674879914,-103.74037627310508,-176.40482642061434,-143.49638774616153,-114.13719709885643,-149.11051032447565,-199.59623800200958,-154.95931205669103,-177.9335769797842,-131.96620832485922,-190.11911445748183,-141.36007041691363,-142.1469478788686,-113.0992694062563,-155.44858336836222,-184.2420599231825,-183.17822308890663,-130.43789676190897,-184.37489472402035,-172.10074332715087,-154.17854304567538,-133.67084491727175,-101.84689827300002,-101.71433260582373,-151.51722354505023,-190.5662589730821,-165.24038727196518,-117.29601495477763,-120.50779120250657,-130.73746340663376,-199.63657340968535,-107.79651867639804,-114.79289838853714,-161.77485196013086,-165.58966881341675,-164.27642492747967,-119.51182065601222,-104.882828671855,-146.3881217869409,-170.76896768216255,-108.84938591101414,-166.42426598505875,-103.76195817754044,-184.13555047389517,-134.2877860909324,-130.06522519528252,-167.43820540604034,-100.26979374640572,-130.12124689507468,-139.5710669708764,-165.0163110128968,-183.5782740717939,-119.89745544126956,-104.00563363161245,-111.67966631030504,-105.35278494181246,-183.39798479524018,-113.19226834715552,-169.39651894920104,-160.8823692518818,-152.91922367329545,-112.22662713416018,-166.87098100794248,-195.59161008839646,-148.5711302168293,-179.8897119990884,-183.73368096076828,-161.0935849113843,-122.06203025943228,-197.62535406280705,-180.2436593103998,-135.91226683367574,-181.97330947907088,-127.70676049674836,-136.02697953872504,-129.8960586635979,-115.9506528099727,-196.54589779511588,-157.1353430160258,-139.83342041862122,-118.73268788641226,-178.02695413536608,-132.8840231771959,-111.74688253626898,-125.68905450504697,-151.27795673921062,-196.85572466164658,-112.55687265820558,-160.67382669034308,-130.62723970859105,-167.30141910354777,-104.80229078062162,-116.8199733277714,-150.84512811795713,-192.610460260864,-197.052147160996,-115.4982473759335,-111.35851504867576,-163.70545425739024,-117.56542015250469,-105.24128735617144,-176.1206254689636,-135.84712986281738,-177.58201784523874,-181.00244189337306,-103.37502266262445,-126.93815797281889,-134.79003976383632,-192.92940217827143,-106.62706457592994,-118.4067663758812,-106.08314334962246,-105.79375507443922,-149.405149566433,-101.95117848604693,-100.84318641431568,-149.23630045127538,-195.62923866505955,-136.46100215815267,-187.5179037101439,-131.627442353255,-184.18179462672725,-176.9905526291041,-163.98519893390355,-101.8563797021272,-112.03246570321386,-190.9873336168128,-170.96776913271842,-172.73833923749112,-135.37689123348605,-177.0150065591255,-155.45691899763548,-136.77971429373434,-157.94699298718982,-187.69403853445104,-123.21770966417087,-141.30430565894255,-125.99228978688157,-136.34741910498693,-197.34184468963429,-159.01112293904313,-150.46692995170076,-142.6930063052672,-154.1750113513641,-189.23677359082168,-123.2039458360789,-113.48964438903599,-108.45314641192022,-134.99447212543197,-132.99694004391324,-135.0272113741521,-156.99388370912516,-171.03795173965767,-110.51488392426111,-120.4962590524661,-103.28993084976672,-149.75564911983295,-195.30270701549628,-149.80250526169766,-192.95608252466673,-199.51016548808838,-171.44623094413373,-141.3310443020626,-150.1650049122672,-117.15019471216863,-146.81409012712663,-174.1383492746794,-111.16712092211247,-154.30764521079413,-144.18392091039402,-117.1193989988247,-195.24290250269001,-119.65195080104975,-199.90484951110602,-139.83180870077345,-102.45922990024891,-155.02004209911775,-189.11729483163714,-168.74070891435287,-167.63211447906946,-104.08016306827548,-112.5695378362007,-117.38939910912394,-181.59293242105127,-122.2304981242088,-146.01334296225002,-149.1592699248889,-116.32344492228714,-131.87422546969788,-173.76035474724597,-107.92928342463159,-181.05491804401697,-154.63395854637375,-170.70066798374629,-113.8953343635412,-144.58244506714576,-143.2579139851934,-161.88582126304232,-139.06051015547374,-169.70456556475747,-120.51093074355437,-113.93675849715166,-114.44954947578752,-191.77887019805075,-174.71236571148853,-122.27903016917246,-199.48607540212925,-168.42213517428172,-106.17700142284173,-118.18643865314733,-179.47382736549486,-146.50457217673903,-173.33554777205575,-146.7539702175661,-118.10776071517265,-118.90706676835508,-154.24815980306744,-146.9807314968342,-191.4080226877757,-183.42000015683425,-117.13950095992519,-197.0061111802262,-175.30544801225588,-123.73488566056557,-159.49411310973056,-114.37283228888451,-169.55312626526992,-132.42310816275034,-177.22314383803524,-163.59462285653808,-124.63483752248179,-139.22500315649916,-131.46413826778632,-134.59372897116282,-141.48445827828016,-125.72042099957474,-161.18722474127497,-187.92155912556856,-179.03508433371823,-113.36860300932065,-105.67429907113896,-164.81171153331746,-178.86930496816896,-116.13706874627785,-156.93728425978037],"gamma":[16.536005734885975,4.797323883230837,13.218510749915172,13.635979504715298,8.794879343866455,6.820242155364187,10.441730689902782,15.427453306028852,2.5768319241205306,17.700400166134457,3.6283601265432353,9.093668435145839,13.241804769541936,11.014485308726162,17.89373450733889,1.6501471057863704,7.779653730134188,10.844252353083853,2.7835283730961846,2.3317849757203746,3.853265559817567,4.459958827811552,3.909408413397606,18.071382410888482,5.285032596172732,16.218255744655163,14.030648515993542,4.255771958216679,9.354583235380396,9.57180599192224,12.943229466759817,17.908287644934674,12.035058868451198,4.06604450273524,18.626090274350098,6.989980066520363,3.214419349637674,12.559695779490516,9.561985067903112,18.6910270065542,14.819529381695551,7.603929125303193,3.799732767086623,10.656682790357728,3.8890274776391376,16.3028332301629,16.67742625172309,10.7582855000018,12.60165039845582,14.462917381334366,10.311732339836453,18.89809236459993,13.69326296196338,10.190171695210815,19.560735778433024,11.08222806890395,5.254786679845056,7.742662929210176,7.151940371469023,8.06149784864051,4.854260194822553,0.4570993565424697,8.960064523666258,0.16519067720346392,3.6162662723249595,7.327767014108244,15.939264405748617,16.16498497251653,14.213293551317685,5.94781998769927,1.1377382018222537,10.776136145552195,15.200178597764605,16.13380383727014,3.788762003298314,13.069654052036386,9.086751379679727,1.6489000390365804,12.402768474515454,15.844492181549237,15.33897452314434,2.520108548493223,17.39133405123936,12.38947958960745,19.25111984606744,5.09082974890958,16.82280226521486,17.86160104318892,11.62904844816417,2.8066616149235513,7.656706804089088,10.492193522981,3.1526949543889327,5.227262170762517,12.944739243103221,17.728019456735762,16.26060468763589,16.34845315807235,5.134014011461656,17.8996286861165,11.787635573693054,4.336187581267987,4.602380726627273,3.5122943150462627,18.283041947633585,13.160182079894472,0.8737266553283307,11.939202606631483,3.280956946851137,16.267705714056767,19.96094032582144,12.09582451304669,17.40338889339617,3.598143557986142,6.29096962702838,0.6633031471697359,4.889376373681649,12.233964537377569,7.454258483309508,15.83364811028883,0.4453020969782395,0.19591485566614608,9.609297246811238,5.845000068982129,0.38402642836059986,19.447798710062415,12.656836394312085,6.579124845838065,9.19986666765221,9.611064355126224,4.052148797393107,7.208516493799535,11.849136561996424,15.938227697710868,10.66421233187862,2.2932119836250564,18.642817745598634,17.348585003341597,10.900623083474246,7.962100499066365,8.407223955656882,19.30551461225192,13.5731131794487,17.20361135247833,5.339069768537272,7.416104681251294,9.562630140039325,10.800782399690355,15.362872413779183,16.42895639159566,18.627868013908305,7.595286183783894,12.067029111096916,13.022034897533072,17.5080574193902,15.938876558762974,13.8658269212474,13.475523890575296,6.637566947282663,19.977746452636133,16.444604784631697,13.2408435729903,11.600688662748372,18.60078823849282,3.5448884507608103,8.821227686020636,6.352791958768558,5.600829708180068,12.310964610892036,6.0726092590313385,15.703097285347374,9.67049215076107,18.495096731694524,13.438552295593688,1.049523618761774,13.173568245699716,14.463426841257863,14.029911782526657,17.559029936243668,13.106153727681136,11.554099879568085,0.432864945489122,1.3169366799937077,18.590790552340195,5.311716160239408,4.617697854507243,4.252287541321942,3.534011811438247,2.829364918184676,2.666673575957894,17.76482008434234,8.630367110883856,18.496826698044014,10.047998744018676,11.201911165856874,0.425830969383747,8.81223848796337,8.056733067757143,12.02522787104025,8.41990964257497,9.588107032324356,3.4152735766287368,16.2252341843822,11.924319733185179,17.67179842489591,5.683961757985885,2.901566504731723,0.7303839392728495,11.061868749507703,17.478844942567704,1.4763096254750119,9.19222317465108,15.312365644343316,16.151153536680162,17.65010232127821,12.497481120811361,7.843951819362491,2.7901827688354386,14.034570302201193,0.4398199791449464,0.35148086990728356,19.750954631749423,18.351136940741362,2.8283060507350344,12.195978712854863,8.843117677876,1.297905989863155,8.42298976203329,2.9166994092318266,8.226726570561688,14.559502414629026,11.733920650077625,8.983553112044005,17.45439340594425,8.386086292396406,18.280344393713047,3.647458783735944,6.649303088601424,7.252465208198955,18.731123823261004,12.53915520301411,12.165921890059668,2.0332614276883376,11.9596535560251,8.105865424062767,7.730449283479537,9.025389955415806,8.347151700400492,15.831828428255342,14.006831820126223,9.815339438358496,1.6107505238689512,18.067944847909377,17.088329683059058,4.626549298966958,18.557154286623835,19.78143434716157,14.362694665003616,13.54744053755387,11.165747521101643,7.571160622304629,16.51402595788437,18.882027441612138,2.2415061612791387,8.399204520327812,15.32634838863749,11.542672781509644,9.36314239516105,1.8986906957397442,11.790044889796718,19.985065010561186,1.4335084254844421,1.5350913487722417,13.353669538744741,14.898056713717587,3.365971533729475,4.68371902327493,11.846934035235668,0.7745788490729666,18.130503227716893,8.00214297697309,10.239119533468287,7.259432459335993,17.04827111673969,14.198347158053428,18.061057364315445,14.847206942869393,19.000654593444768,5.472111938103144,14.463606168678439,17.297989340089636,12.675750123732993,18.243250037778147,15.825241539016556,17.97174368799589,4.823038030174764,18.127339819025767,9.072884307039303,6.965623179425946,10.054130907671123,13.641319042186408,16.073473183119678,6.487328338208291,11.042923000313811,11.805885680662849,18.45375380453926,9.912920585224224,16.909216286647336,13.682882492136056,2.36827034137848,17.28143033794308,5.2702664086632245,9.816678995998078,17.61403510294101,17.08421373650317,9.227213517064325,6.6440446882367565,11.566493561242414,19.595787066935564,5.410173954736135,6.121119221848459,16.87288217023874,6.001040646811742,3.841732299955254,9.267222013633361,8.05206505683859,10.717558460368988,12.40230081077672,7.4405343679580005,4.715893348612581,0.11651717829995967,1.6825191746851065,5.933028000306213,9.864663390902887,15.04485422757699,14.072229123127764,15.364211632793126,16.260168285825184,0.8941970093852092,6.661894025053505,18.300107829447967,16.719975767073308,8.11716252274823,1.1612012629361512,11.000613199701048,11.691347779201152,3.959107611489303,11.677690184504247,19.69235809151797,4.524149698051523,6.630532089512253,10.136151491842957,4.601949668588299,6.911159467969723,15.43470187129011,5.645430978776913,10.150933904015517,1.504456286644107,6.983537675052118,4.724236834503666,6.047253585797052,5.559546976709995,8.182786298856302,3.152818156937358,8.652225701921568,16.024492586624646,13.722388030760326,7.658194096422557,13.364854058552655,10.470593642088408,18.086644317876267,5.2057124018055045,1.3356915975843275,18.20682543614918,11.524596114143431,15.753843859847692,3.783506829248653,19.69785152971085,5.81024483872266,3.6525930923157413,16.455172579416036,11.115349282785267,19.01523956576469,10.544525369089307,6.958049318526913,7.541050145060355,11.718085533821597,6.585102409896475,9.553325614193762,19.949399852082923,5.359961524630696,0.6753995989157691,16.996174917916793,15.805960647242646,12.533558814264172,16.76067914936375,18.46770936456618,14.214068213388412,15.108704076135059,8.65081123068807,7.134424165199897,11.713907417700216,15.041879151606242,9.879739749433076,8.762796270079441,19.589442313154844,15.562080330700638,8.537621885902311,8.322689726770856,8.908206995099528,10.939112725531185,6.749311673918408,19.093801435442167,10.240299750192623,7.254739631256708,14.312234969541304,14.35502370773241,19.332643805219924,5.255128133073259,17.591142801897025,2.1605198185016317,11.443891291563911,16.123903267641957,2.025301468823262,17.30754051092459,12.525370214768067,11.930012941798287,13.3509862485638,3.2508970913568636,3.0919246927807764,16.36949856023083,7.398339719808638,19.221661174698124,5.208040179413738,5.4141745848496825,9.387477463264645,6.789227874246411,2.414145781323831,0.8056109575948245,14.670397980521411,3.569203789872617,5.145432400322036,1.2497155187530318,1.7568065407722289,6.470441286778201,2.537665468831354,2.83996219839028,3.7223656106712433,8.842566820605015,13.96769797230931,3.117880174409189,0.46264157782827553,15.779717630017993,16.692611309554394,6.048883507495533,18.779930881466044,6.626842101417387,11.25507422111793,13.772450785109926,15.821700652379768,11.277989203602239,18.56312233180958,18.58508657597763,4.57581707409116,9.532249792501425,18.731022901095344,16.689914425354452,7.261354531753721,13.014328664282328,10.563767840235396,6.313962207631039,9.433616810958934,2.9526249062427423,7.924498206866901,10.22954781527202,10.691020333739685,0.3767926710834457,2.6924562884747694,2.968458087707817,9.556693874079848,18.137260029261828,3.1858739940910707,7.2001102970304,2.2345325447142006,8.246533495001485,18.438842310338657,13.504960435983389,16.76776202256088,13.94621037437448,11.436024194296248,14.731246466974127,6.818195089641468,14.462955868131315,19.847548762642816,12.702222099663466,12.747177117466046,3.806691253279113,15.598615796975839,17.319058550762627,19.77615837864078,4.714651686792011,18.135161962838893,2.6563832857772596,14.892095194908217,4.11112435799454,18.218224540600055,9.091643653739517,3.4964941851418097,9.34976683860517,10.2522885815808,16.31569092329384,5.392731461427092,3.5987464375557288,9.88220770861406,1.8657465618863212,7.6743052105029985,2.129454958605561,11.579143003297702,17.43547840744535,9.681316311057579,15.889360816407386,5.7062852842146805,18.696454098000142,10.338084124637334,8.467327887748475,14.570252249034738,0.4508339053693122,1.5443874525323231,16.248110129068444,14.835426706187462,6.738311363280407,19.856828285207552,3.0315535670254956,15.545270551178447,13.56427391055794,13.623269168867044,15.268789466913937,9.733743596000636,6.520113597242481,14.890139164108351,13.441315189455029,16.43732596605409,2.7565604634266228,13.064350970253251,14.451553535664669,6.956801678920552,18.726801758886413,2.3801745873635527,14.25142110724099,15.218718118322858,16.083838385164412,15.915100819645032,5.771397954355795,17.183957070932646,7.356638272873965,9.264635034307634,5.783329628742937,18.7567212316138,19.06203342916823,10.406690484376018,3.645971307391487,3.9921873381393214,8.162524384061642,1.6803508077784368,2.073881503876933,9.131997105610314,7.481635515486209,8.12771782936597,10.210877884721675,13.34258154918059,12.626276555011415,18.15336007623938,12.68688106777426,0.5383302840075688,6.663230522103967,14.531407013092998,6.049594610498548,16.202921233588473,18.6312167056556,4.063601372005317,18.44405372762362,6.729051391465397,9.77691778896881,0.16742865230809034,5.591697455239295,5.420513736143744,1.4805006299300105,7.9766838740959845,1.5915447750511813,15.541932392699994,9.871494251829773,10.68434416628886,3.0373672086720616,0.3094670133295363,14.83891177705753,1.41034282763286,17.893458784897575,16.108572935264128,18.597623271071253,11.644481001975397,19.274174923736194,15.38633403350115,10.076948129101893,11.63938932419255,5.3261292165611,4.890765354180329,13.705308596121725,17.20662240936139,6.9019023970818605,8.65910144595643,17.22427656802219,6.031188512255077,19.893469441305008,10.659605115258284,7.829709999749146,1.715556651691097,12.27622895610394,5.550310677592893,17.91514139194372,10.578909282379731,4.920115116471058,1.8102423216181407,8.696855768594753,9.895117268110138,8.788601506140438,16.043615157675877,5.55055843522545,16.564861964506314,8.874826208225578,3.6712897852910986,10.508485762435784,0.5927991902666996,15.324376197261564,11.348204069729459,7.33934437220543,10.658982990491195,8.035403070995208,18.62494416023505,7.119106383001372,15.573244020488545,17.487741757470282,10.033229163074711,19.20303808132065,8.39744006905638,12.364698617231543,7.616373625847692,10.808800849068323,8.486817249998797,17.018868029947342,18.843465745403712,18.07806185361028,19.77095062861961,6.787339438969715,10.23691158105641,8.314991189260944,1.013565056931549,12.374311496927808,4.879782165256317,13.303394974621474,18.861754457960906,8.54238368933638,12.171450989659691,18.296455994172128,15.096331879335793,17.03300562266677,0.7458222162575412,17.412663374151517,17.51968067381583,13.635651472988993,14.608873710178116,10.321505380158772,5.687306981684315,13.263289802639537,0.8689474413692544,15.494329965199881,9.402848163293815,4.909721703837993,12.45864222365556,14.186811210134952,10.983237943624475,14.621337303438553,9.231548138795059,13.086111772291243,9.085648336721452,12.402304846357865,6.067586892304924,13.237037206014644,8.622548605856672,4.50051069021375,15.12747332142859,0.13643290978020417,0.8961270826451484,8.895433476762848,18.134481068586645,0.9563554986575395,1.1525909235029363,11.683316761449326,18.92604227896884,11.247378619120472,18.61615624760158,8.620144232114836,14.793255638636712,15.310012890432589,12.603897816117687,0.38322388435034327,4.308910544146696,16.992168930629173,17.239727930408524,14.694308692686914,19.596236030028464,15.258281247430418,19.21118945393419,0.04221400019491561,18.431225274664897,18.37762752385106,3.834955233043691,13.144335513158541,17.80279563903968,9.58325597153519,5.843742551487621,9.30493276929992,11.018100198455759,4.784134318007207,2.8623154523813055,12.87588805149829,8.595111644089615,8.736663968050046,2.257628445545441,2.738140811028602,9.443159757894847,17.32443052081671,6.105950849331729,16.053238245856317,7.45318189174343,13.674078803525536,3.4590021270649407,8.343719114683728,0.7263591112760004,14.763292836692825,7.336283711756426,15.552086282420579,12.348774819027746,3.37418758632702,11.419227535847378,15.400528312667987,8.58179574365618,14.897184774896779,10.023759027130218,2.2339180486735177,14.60131320715428,11.379172886323431,14.33160236383591,3.533056359546358,8.929187446402063,17.854748773783342,10.271595754495223,5.967744869269698,14.68357410264705,18.16606523232629,10.302855682746678,16.73171359722504,15.348768412211617,4.77622633193167,15.883654215194284,0.13073665830525272,14.52822250957356,3.0027403325530244,1.3758988796040317,3.6074899163857754,16.84645091829575,1.2151084905212306,19.17705336516849,18.26119067306752,18.830843726159525,8.403050877230909,6.756369144600423,16.14813665841899,18.429556236903245,5.143036704394626,14.532991514666218,8.90644085208677,10.806251644134042,3.4477259734426324,7.76224363455801,8.037421937943602,13.860436260900446,1.5828075697015276,1.6794568485881944,8.915779150909433,12.956008056550896,1.2282015370138977,2.2589196644001674,11.444165748984446,2.9260908699711274,17.81324947490315,4.54430687062823,4.263179440862528,16.780405208179392,11.393484911192516,4.806150308510735,2.280293730269891,7.802573848063843,0.5515662886141115,11.288737010033358,8.556469340840778,6.666830321656665,15.572722608200307,16.62829477409639,15.425785336259166,11.45837096125839,9.380185462680819,2.443077895451764,14.85388893467599,2.0009636609129045,19.34330866619326,13.439434367625784,17.125775131412514,2.2326548207347807,8.137122448715445,15.732943723258174,3.9834370545584497,19.136392669583078,16.575377839389567,10.839636842142855,19.025831169113467,6.997750635823827,14.467909038845708,6.79727859579947,16.673375275722954,16.583651984892928,14.121657659951982,6.7063294635313575,7.647721501614053,14.726188901468301,5.491982964738855,8.234960466416386,10.35093438287388,10.250810228112762,12.948291372723197,8.609259898210295,7.9029416766118965,1.4577311913574675,14.611130958327173,5.1370472792406074,4.5382337342017065,8.43678015919133,0.8781280937009006,0.28683746430675505,19.186097953843017,6.351297785340715,16.139034196630476,6.408940050678358,2.928453618355511,4.382154102581501,2.9426077805873696,6.722069820462733,17.586813464905596,16.596046084065318,1.3836015534013146,13.400026011576305,3.883590734967304,12.66645975495691,1.2377365164625598,3.847084438078854,18.67101258145852,13.267935368198977,7.553366366008909,0.528536271108524,12.808719042197364,7.694411369238798,6.211173396805791,1.619471409311366,9.782915654370088,4.486564247854603,12.793245818469195,13.846698150679785,4.451905535759946,3.9160891721140567,18.366691035966195,1.1441834288276542,13.022877532248845,2.4168233218804414,6.863766801608344,2.8632777558157896,0.7529655131484159,15.373593171620556,15.716021603804995,11.631856027079305,13.126180103682668,6.950571227948341,5.6918140920140825,10.147767392869014,9.59729978496252,9.303154904433004,1.0377838010704243,16.815638424204423,8.3395665844668,4.0652329925365605,1.5737019462136637,2.7283629973144485,4.865434331368128,15.100236432797981,1.1246300587046232,12.058151964784368,7.148852355507902,11.49670018595872,17.02009300349515,15.175850939937341,10.082264800406278,2.1045011033140826,0.009104021620647273,16.50765158354111,17.61053916736085,4.120830884683695,0.37527398958213,16.07460186837261,3.190872384407344,8.298449601597557,16.504826494853692,18.252224123125956,0.7964722298098481,5.114279436973175,18.102253294023033,11.167774075938395,2.847073919123404,6.638743924775299,18.047251580051288,7.315265006097178,2.4213641568355238,2.544515811155863,6.272214817803792,10.916543541666242,10.262869574743192,6.9450734844809014,0.12735830342428756,13.42273729484528,7.397162405888316,6.835129138444738,14.286360912724358,14.688895466209662,9.693364311097422,0.9496873731791444,14.567790090862962,17.88813846362106,9.241178549925726,15.257413153417726,3.3448267744038196,12.63415061011548,9.666287263682207,18.097129472438663,11.575491367002249,16.149753382922366,18.500734451645325,18.046322485446773,3.2150120273682647,4.53506680217743,14.807411318916532,1.0528421052034043,16.339437297372395,15.49445121236172,3.6530448724964337,17.41790899704229,19.69292285669333,18.796440215595027,11.808729925684624,18.126845608889198,16.83564507194796,11.258465821490686,1.0767838704335997,3.693277324387503,5.249165181247628,7.271716656069058,10.589638364330373,18.306884666169147,7.330634191363541,15.889732074348677,17.943831538047288,7.752681713936291,6.943763950038231,13.532697577394872,4.320416094100987,19.537156806877192,0.9205372074050677,14.895790060343463,19.530839569746163,9.121382620098931,0.45434092838806617,9.44697507678776,10.609972356215476,3.789336205465723,12.744844896670395,6.821021483938692,9.983494414627284,10.323063271000738,19.12649261763997,19.17915414819305,19.719233113162172,11.192028717439051,15.136635473674595,15.77243417130136]}
},{}],92:[function(require,module,exports){
module.exports={"expected":[-4.4225138629487075,-3.405479058413705,-7.540276575951372,-3.4516612882135216,-3.1229996714599526,-5.44056450064063,-3.0672761688474095,-8.315260993488684,-3.374743059069779,-4.241917265983093,-4.681853232093264,-3.3641311650393435,-3.864347312346246,-3.2176427484021937,-3.568426159216602,-4.293193250329894,-4.006770104039075,-3.3291980912475108,-4.735586154953983,-4.323560867178916,-4.203243785666541,-3.3813100608588567,-6.69489916189612,-4.522757600954651,-3.612031971222996,-3.75743587882361,-4.233418227735355,-4.135903618483151,-5.960066650239979,-4.083805043322786,-5.097128712736182,-5.195354721395602,-4.600586062039959,-3.479986612700603,-7.589061406372845,-9.948039159243075,-3.703712295443196,-6.446278988844991,-5.117374002052577,-3.672865716960421,-3.8636510982647496,-4.002313559541481,-3.277720543276131,-3.7891754506505175,-4.040775676068162,-3.176410662974048,-4.246738425600995,-5.695285577325076,-4.296289886005832,-3.0362405199575098,-3.6035735056198277,-3.3593047982552298,-3.248880150576571,-3.4944571040839723,-9.777774469748492,-3.9192374142718465,-4.183926770205716,-3.8708379091517684,-3.2281351981267843,-4.308152328277852,-3.6861801020272424,-5.27477656782493,-4.573130729517908,-3.7682860183105302,-3.6567588432520624,-4.474309097958946,-3.9779680495187835,-3.9396193879965917,-3.2090932306489033,-3.4004700162838364,-4.372933919640452,-4.21832140429941,-3.9851000398680663,-4.084240422970909,-5.128265929727094,-3.9920251694446813,-3.484250029974627,-4.497141705506246,-4.417201834040277,-4.124272544392409,-3.4986620126192562,-4.315959306897996,-3.0604006468098977,-4.564621498463798,-3.247732999317585,-3.6445386372120407,-3.4706003269710575,-4.024547407836606,-3.5503551385433054,-3.6630178842698546,-5.619336315334141,-3.8791762646838066,-4.289405304585794,-3.6911886779255,-4.888929444771243,-5.1126835002920465,-4.688270165732249,-3.5158519775462724,-4.712370185244097,-3.5919087358516713,-3.4449940438692455,-4.054538758312799,-3.445600443599374,-3.512185184621109,-4.503528142748688,-3.933151312663638,-3.3302250459420804,-4.364096603485981,-3.6546667240889716,-9.132983185117649,-4.2976727271983215,-4.454486281863073,-4.912349847258732,-3.940253931210371,-3.782761628860996,-4.9007297462676584,-4.149478227457973,-3.51510779951709,-4.847591599368257,-3.7111375445080017,-8.033771721697281,-3.653360132620753,-3.368796893750716,-5.61028603583893,-3.362289349255777,-4.434339434413267,-8.08259472936314,-4.469685979168652,-3.8428317666572593,-3.8188984162438047,-4.131944137110481,-3.7757029372286435,-3.7065183559858856,-3.7478717434489366,-4.927283971997802,-4.039836144366177,-4.51498386889715,-3.167198381829754,-3.420882304794688,-3.2765204774986523,-4.125168474476065,-4.914810380938329,-3.723838728962285,-3.9852924357563406,-4.496268163696074,-3.7867476799222874,-4.682950240462444,-3.434981408115903,-3.0279740030292177,-4.069242671137195,-3.3571758471085986,-3.873573598742936,-4.2789148454888215,-3.9345025363358586,-3.7653114396615375,-3.597257512374061,-3.6458260159511395,-5.890517440680031,-4.090407487681272,-4.002660407894557,-3.5918101100982627,-5.14738045215261,-3.2353104556880075,-3.373666267086501,-5.767249308623898,-4.8767532022400655,-3.6535624549060626,-3.315103126230786,-4.591566563877681,-3.139659677355351,-3.437042958411612,-4.5490336002444645,-3.0981779216475696,-5.024368537187648,-3.4803841761426186,-7.062479582400122,-4.305186839010644,-4.139365708552545,-4.006310895737788,-3.4367562879407507,-3.36805896400295,-3.735212723197944,-3.399424185087497,-3.4310894544365964,-3.309842950054315,-3.340420596396727,-5.888640057300913,-3.9148691676867378,-3.0039725660412455,-5.342145857610787,-3.708381269759474,-4.970132600494811,-4.731231416734845,-5.298261506605441,-5.559903725445197,-4.179201139356332,-4.304605397484715,-3.4926521995779956,-3.4024284085625505,-4.537315067028374,-5.120470633540629,-7.277827690381649,-4.437497692746575,-4.034434134001723,-4.335763498128199,-6.447889420800153,-3.5684903756204878,-3.5662896183971147,-3.3371198532067226,-3.633955168181978,-5.044476005962398,-4.270133098488141,-3.5500867772311504,-4.837202712822191,-2.971315963067493,-4.337019891504019,-4.399622882526046,-3.726651881926282,-4.112819322365756,-3.706812455669653,-4.057813677716525,-3.822998355031435,-3.881900356565018,-2.9625222424299635,-4.040801851039606,-6.4457521448841515,-6.9043242886992555,-3.2048644465246525,-3.561820948096937,-4.212114656482881,-4.6666785474730315,-4.7001185753787205,-3.602625689034169,-4.239712613741897,-3.595162215450394,-4.01241385614221,-2.9184502026399493,-4.568918628352635,-6.891569347540093,-4.857278137599413,-3.6883616063878417,-4.125379079683039,-3.452899780193675,-7.149693558468606,-2.9683704826773827,-7.004239346288388,-3.5363627741565007,-3.798102564992066,-3.9268625987251746,-4.353937723341694,-5.8303755141479545,-4.642846207702764,-3.7261200613571943,-3.0488082057072154,-3.8826191494999307,-3.8490247501781827,-3.9905848288248085,-4.235997959141558,-3.6104608370445916,-3.60763140350751,-4.452704290832149,-3.76177789388461,-3.546206874397011,-3.849335035828669,-7.3205028299244495,-3.264954426515248,-3.3110269277885123,-3.5106009607719715,-4.1266571035612065,-4.987108307936311,-4.164502434835581,-4.20930314658004,-4.103663488705469,-5.389760594322386,-5.820107195007524,-4.125234024366026,-3.6548372902822712,-5.601461901321568,-8.499264940024254,-4.442437277861174,-3.7669698957665956,-3.7703350479267703,-3.567371558283679,-4.881194545808826,-4.2390921155487264,-3.3803442920590654,-5.281522918551219,-4.142929629640763,-4.262024936206407,-7.23822246218778,-4.458482625781288,-6.151424900611931,-3.4913383862905363,-3.8917716752922877,-5.985921428680571,-3.5699825491204433,-3.714170399186873,-6.17176864315687,-4.624267057970819,-3.451728364370358,-4.905885361727584,-3.906626390841494,-4.81921248023437,-5.086231973402418,-3.5255415625932938,-3.918383013981118,-5.344103342340172,-4.966076537397308,-4.404540684434232,-4.816084525749592,-3.9342525515383597,-4.500818718943795,-3.998872577702242,-4.348304456638561,-5.546687646510037,-3.8704495797150607,-7.245788414724476,-4.002307643868709,-3.5976463191665866,-3.801152096254683,-3.2485088711573753,-4.254574470022703,-3.972390306144977,-3.7507132431479575,-3.513137715185691,-4.091093997572047,-5.373121457769338,-3.1760345112423543,-4.317616181957379,-3.1681902279226746,-4.304012468841489,-4.48224380238225,-5.2419358283245865,-4.159807428175425,-5.5198097798039765,-7.764631590096971,-4.762645045641806,-3.363751252489265,-5.967366209462599,-3.9487496529853767,-5.4670418907284475,-3.2986493754590094,-4.0394279003186915,-3.6047763417697047,-5.454597463411008,-3.517844869522579,-4.101342952473335,-3.23083403483614,-3.6085969141398775,-4.680914354571487,-3.4365126209518873,-4.166948413796867,-4.931441840549774,-4.6696654322072995,-3.52797586046348,-5.802923616858249,-5.302003278242372,-3.356947893746626,-3.4575692441960166,-3.5154565130732354,-6.155502344100423,-3.675160124456096,-3.7944654327232192,-4.172792819518246,-3.3384144967114815,-4.382048867718702,-3.3153166697300414,-3.421522972551523,-5.926895497675536,-5.372712151067732,-3.2094740618836424,-4.466608446994178,-3.457000357947902,-3.320848820650145,-3.3592601816446552,-4.779672693400346,-3.6911867297062306,-6.247164737583137,-3.536126927565745,-6.938421014880806,-3.236204450931267,-3.1228262834810576,-6.39561845750546,-3.864277390308003,-5.685934368187096,-3.5507373879952833,-3.8307186086485236,-3.421571063973532,-3.539332924781259,-3.2985136354800506,-5.805486612145828,-4.318192710744584,-3.4801559775674837,-4.083516243055722,-4.802515547057392,-3.956496375740213,-5.074364011490876,-3.866266680892772,-4.465457312893947,-4.297397174989818,-4.916726489679015,-4.17868676872591,-3.4357975151417595,-3.863918138034051,-3.707664609969364,-3.291751620329974,-3.9158061556696304,-4.1944277735672015,-3.4258477290493556,-2.825784302509736,-3.58283315170314,-5.608697315800062,-4.3950229334961,-3.251880777074458,-6.559575584161607,-3.3223324613786964,-3.6313751261675704,-5.343528468902516,-5.026669968322759,-3.4426855532122844,-3.1719877185524803,-4.943091033005933,-4.422520115855166,-4.140501226212563,-3.616876754740178,-3.7271224214559835,-5.338321424074962,-4.661792090764659,-4.53550269698581,-3.7958215285350825,-3.4892398386285723,-3.3868703439754375,-4.368446607922909,-3.38297407895852,-5.857205484041885,-3.4376949665367498,-5.444228935507464,-3.161516362235793,-4.714741149371593,-4.068571561274416,-7.23723982201893,-3.5312501424043923,-3.2754113225973853,-4.655229499067378,-4.248270540009921,-4.388467198778235,-3.260011192887642,-3.405354356276574,-3.6146144853286315,-3.1636639491680074,-3.5585049846868744,-4.445328891873895,-3.0471043207888484,-3.7443442203864477,-4.5120638753911795,-3.9186190865663812,-4.9454992921352305,-5.579335134953031,-3.522289169232547,-6.2341723350896485,-3.7291399756237733,-6.499342825999213,-3.686513893316032,-4.020831835555165,-3.287644403647285,-3.5219057558946574,-4.432244288927509,-3.3251025925229016,-3.3567233395058222,-4.862242224971191,-5.878333512384936,-3.7527092176358057,-3.5970452817481053,-3.6592265098127803,-4.280069442568601,-3.551583483587523,-4.97728793109002,-8.979328524618545,-4.457442318087634,-3.7148309653588525,-4.417753126441057,-5.5221258833689495,-3.4484093726042566,-4.08428403169359,-4.734194115532611,-4.951979362769667,-3.689130603499123,-3.6082055095181795,-4.551048982154737,-3.6456720735863364,-5.055901588288377,-4.162347838214563,-3.8004132339183423,-4.091041248871634,-7.6303573338736825,-3.660600557142972,-3.6438051218990495,-5.600174394658567,-3.9982691288504744,-4.895006665892588,-4.27661758071112,-4.379466781940873,-3.213320670938191,-4.7352473324281155,-3.500551325391043,-3.8745465127464964,-3.9157229599242984,-4.1926342406631685,-3.9053409445717753,-5.346653563248757,-3.9041697345995985,-6.462587648209359,-4.354445429405932,-3.157346193885802,-3.2607538626243047,-4.2544700116233605,-3.5614438164877953,-3.810938135643749,-3.4990180793534913,-3.215890820368765,-3.925833923573181,-4.466564588661541,-4.14039471097019,-4.336298187428872,-3.424686771620509,-4.271798389928084,-3.850140838203084,-4.620641275140622,-4.971298221909312,-3.507575898037616,-5.581594645048168,-4.464891857631597,-3.851921571358579,-5.604301091370361,-4.287698180255178,-4.31455249107688,-3.566205009599911,-4.046396334004465,-4.333818908563547,-6.8368145754197265,-3.791342996027778,-3.4276305557711924,-3.8580891619363182,-7.171013224252743,-4.0202332739372535,-4.587960952657935,-3.3138859142011983,-5.019044476006995,-3.214963300084593,-3.922904499318952,-3.6041391944193966,-3.5242677718524456,-3.144334648582808,-3.898970936270382,-3.205590081072085,-5.059066728755742,-3.816381269168035,-3.6149203436501045,-5.881335008146142,-3.246064712473629,-3.267200213254411,-4.697199184743151,-3.431631562446671,-3.921352700774628,-3.553904245904369,-3.2711826012229146,-5.842917947137604,-3.6388105336910925,-5.01818057739263,-5.112930304317728,-4.539657772510461,-3.2764237216430905,-7.089352193683854,-3.532968880419994,-3.7529173793207207,-4.064365453634945,-3.6759510997152995,-6.713170842466954,-4.340546818239805,-6.840359758137492,-4.955852308183746,-4.802428654646834,-4.8512187460742675,-4.1725597710044084,-3.8598781934110162,-3.7726804863833494,-3.6818285545967346,-4.205703082688035,-3.6590744784710223,-7.178221772703917,-3.586717790275213,-3.3593923568202806,-4.243426383530166,-4.504064062560321,-4.582676331143422,-5.11055804817885,-4.394763504429938,-4.0985144444102986,-4.961300184581626,-4.874497509771073,-3.2348986176924504,-4.5544802073239765,-3.4745400683783627,-6.0795254031322585,-4.586041876609914,-4.2803976177141925,-4.078259836561947,-5.229942924361669,-4.278681068638194,-3.9631177640692847,-6.319126261928009,-4.893846007588805,-3.777900950694563,-5.382061973749221,-4.250035528319231,-4.092441081635425,-6.085264413365718,-3.7722063559254746,-3.85697917684829,-4.440707250026382,-4.034022716965843,-3.7104451862582915,-3.5248447546694983,-4.763519914339472,-3.6374605728349794,-4.122441210128586,-3.6627671723967077,-4.6499231684756905,-4.5276330587153995,-8.940234931063344,-3.758556796910886,-3.192826296786776,-3.641840240447664,-4.844610760492411,-3.959617121660775,-4.615521774070048,-5.5036851783832885,-3.717060454633532,-3.5379622070227037,-3.2601785249326696,-4.0467382462438675,-3.5862948655435747,-4.028822169282415,-3.3100106396150157,-3.196032755671128,-3.6022236802145717,-5.0891468804175855,-4.878895390144566,-3.9486207713533674,-3.643340316291588,-5.241983067032369,-3.715570378131524,-3.8107019476543154,-3.309680662808748,-5.258666980185667,-4.52553845829243,-3.503840374655048,-7.547657257285155,-3.7820463630036527,-3.834714139480062,-3.0914791223638365,-3.7692984831875047,-3.1818148387134024,-3.8906070143809295,-3.677398600195102,-4.055197656609801,-4.478805101768464,-5.598494418883644,-5.356430046972592,-4.504359373172568,-3.598070438274179,-3.6260834410456173,-4.253498335722193,-3.6413589373209163,-4.184697779839912,-4.778128366063059,-3.8406811368745495,-3.9536387544990617,-4.925967890316109,-3.7231987974483127,-5.315254011500054,-3.372013115919534,-4.75092044881259,-3.847316101885502,-3.9122367700751988,-4.195287316278412,-3.66115808111777,-3.0713649140003576,-3.5511002944580317,-3.8404625929841347,-5.568747589449803,-5.674888414118975,-4.324422603706112,-3.817025307799768,-5.30724528365954,-4.324923707377658,-3.973080100092248,-3.8105198865973846,-3.5248873709132145,-3.8783707763452213,-3.6259356949166532,-4.375714617735518,-5.964463314919931,-4.284064785487661,-4.51838927331623,-5.210677457103258,-3.8855042194031606,-4.543024878470102,-5.358552043405945,-3.680688509189864,-3.5924213869467176,-4.278987949835091,-6.6395900294921235,-5.595156354722146,-3.968147092741035,-4.070908025340479,-5.35809834700777,-3.5617455541027736,-3.602402223119782,-5.638196779466256,-3.9535246762085174,-5.083927012736336,-5.1814995177345455,-3.6779036658803337,-6.466470256351505,-3.3511677196283784,-3.762856453889696,-3.561391226083119,-4.046481301190052,-4.631205347391171,-3.6150584066396476,-4.353675242708249,-3.731970617416345,-5.669479297701557,-3.6519329972551926,-4.940631073218792,-3.9908610098444903,-3.5726519846455957,-4.699780007761325,-3.802572552488238,-3.4921468967333333,-3.8484206360344344,-6.080263426930207,-3.555966639304089,-3.0451239255046696,-3.4964086793745586,-3.302304966425023,-3.763858728024455,-3.9583998806674963,-5.773752249406046,-3.352342827337213,-3.8107613581458017,-5.141058057106228,-3.1598915481003074,-3.7579674688941087,-4.172669120242652,-3.6465504045162094,-3.9553461795278397,-3.972290019797099,-4.6644363225276315,-5.3713323378878925,-4.4492940284604945,-6.897743876047006,-3.9678224897580074,-9.236867220884408,-4.163850414772673,-3.401505530462395,-3.8131662401807396,-4.258254805366137,-3.9881652438402027,-4.065238209427513,-5.128942964396659,-6.0796988861032295,-4.375083994064507,-4.204879590288524,-4.808722249720139,-4.228992212790575,-3.9037687929283873,-4.105443640320265,-4.723840671730641,-3.6081068628441915,-3.9827796700617144,-3.4587401974892282,-6.871138727265377,-4.97662211826046,-3.888802469054625,-4.1537057712056304,-3.773177227067476,-4.526504868409954,-3.7599823198164812,-3.3897094296854346,-3.2014113363213608,-5.253577643314821,-3.708585632865138,-5.942734598257578,-4.171599195052614,-3.5834622687105124,-3.2526742661429826,-3.7817518041680374,-3.650058536734402,-3.979972601041125,-3.751179318085961,-7.480105230824196,-4.839728818538429,-4.108247264839762,-3.9360864973728265,-4.8887361102312985,-3.4366715987004968,-4.102403017530685,-3.572420349148707,-3.2658868801955605,-3.9328979398432242,-3.392721653013632,-5.3045921758250545,-3.427097096523543,-3.735562401056188,-5.7204967774940485,-4.246451975217269,-3.4873342159881093,-4.478956512101148,-3.669949562094445,-4.662953670961649,-3.100051569116843,-3.664398094286632,-5.614745491536106,-3.3614649729916954,-4.075816472069035,-3.746565666220308,-4.213457163281662,-7.187030010277662,-4.035822257530674,-4.782837115215872,-3.1164070191865108,-3.908498285135506,-4.024835445574683,-4.6439781812903425,-3.319074432388146,-4.530474802646667,-3.349803681025258,-3.353503221846284,-5.177976208857361,-4.384889892771202,-4.170765947259762,-4.199570587208582,-4.951786569087724,-4.3509358337664885,-3.7410057571076716,-4.21267356680196,-5.8831729265481485,-4.231102764685616,-3.1784152789157702,-4.3899089129949544,-4.495228541085448,-5.097806454924049,-4.012788373279239,-3.7682947243375073,-5.38937381412698,-2.962083600585221,-3.776638317232286,-5.489950756820871,-4.217803072095945,-3.9347592293846616,-4.356919547168722,-7.595857827587122,-4.113448901669489,-3.6922227415416917,-5.62062703623156,-3.8955672826845262,-5.01212978507586,-3.87476213358799,-4.531211415842165,-3.804284028244971,-3.3900891170466183,-3.8535004821382315,-3.640754441282904,-3.6762965456160908,-5.512656379529759,-4.46976871933568,-4.586229590102218,-3.78396497051321,-5.265756531029513,-4.716942010484254,-4.9745598974959995,-3.6336042935346167,-5.176856087479413,-3.8054188081418667,-7.948623649233016,-5.5421049022079805,-4.479982748902227,-4.6525320817761004,-3.527266057560523,-3.940906164787771,-6.065901204641857,-5.798628669493527,-4.088772492955643,-3.9373711560019804,-5.144663259433755,-4.725071645017363,-3.6889357904259206,-3.583631172185975,-4.184987339474174,-4.630586319586839,-3.6391567953019184,-4.564692980478909,-4.643295856016012,-3.2699932377507404,-4.040097141413397,-4.237645868558759,-3.38358782687206,-3.637850421509765,-4.528612950674598,-5.11776311305038,-3.4616170305202694,-3.2995995894499375,-3.891501407992779,-3.9880966655531522,-4.489508490465194,-6.006920899073922,-4.201260046312553,-4.300117827770399,-3.8890693618937338,-3.3145801630993006,-3.902704457115121,-3.5442158355089974,-3.518635323326297,-3.5804262043491337,-5.78242166897767,-4.250332956069891,-3.3389050139426844,-3.8741714721256137,-6.126104657933547,-3.0356820365102104,-3.0213930023186433,-6.101438309600478,-4.93684052395793,-3.6280730290829055,-3.971505725121833,-7.756359517984118,-4.060181146692979,-3.8345018526333186,-6.115070955634344,-3.41332656292317,-4.27969482995874,-3.8334577092730826,-3.4567901665512712,-3.6695058782023886,-5.122605980479479,-4.1463481264555355,-5.726011947003987,-4.1292924466784005,-5.402279778521618,-4.031014455760572,-3.3435343500285475,-3.4412223251986847,-5.484928534666467,-3.0759345686067188,-4.468765940621757,-4.361817345131907,-4.419848745262344,-5.865891447747496,-3.6554309068449915,-3.63200247779392,-5.676498305919651,-5.715688033947871,-4.560526031394449,-3.55590342005276,-4.774668853767558,-3.776228371152393,-4.328151019854573,-4.996168092953556,-4.547113178690089,-3.3946849370173044,-3.6388877744100396,-3.9213453163599845,-3.0371929807205476,-4.18790670684399,-4.010594523992018,-3.458552356047675,-6.425379208157098,-4.934263375115526,-6.137616529088199,-3.8731835738235922,-3.697282403184477,-4.075037977333273,-3.8465766322798722,-7.714123263419143,-3.4592262751439535,-3.492614881905542,-3.379104464068753,-3.568433425821283,-4.877663765891087,-3.880780382299862,-3.873084595991601,-4.05086156775029,-3.620366099598874,-3.4475586282382293,-3.6036021313861735,-7.1106388131008655,-4.011317825376794,-5.697422615320611],"x0":[13.901907987794226,48.54629585540496,45.18650350348614,23.83729814349528,29.07158462659538,32.21905907862998,18.63329834977212,37.36398609691038,1.112356448255758,48.10580197407468,44.88675266512132,13.97717065063624,28.162229501874936,37.06899818472973,39.661529275922724,5.395695477507278,2.0100218619732435,24.589086018282114,42.493078855200984,8.753022601045712,33.287131220718926,16.3052693843334,36.154444830447815,2.547032908310487,48.5267358981349,43.0425502864938,23.311168690343976,39.4957647080782,37.010534793407146,18.256120891900906,49.6297178181531,32.20148503385555,14.418449924445198,44.26266861045968,39.00728481406027,49.63573280819554,33.22061911375363,36.38612659331565,6.977888449367531,42.03576767298619,6.534639893749095,32.89013950874351,20.729680388892756,10.170740248476095,30.549617200430077,12.863625318198801,25.75539823275096,34.43856975869662,43.198325861837375,17.097648012049028,5.45020130495123,7.213893872752153,41.03617735148845,13.313796551045954,44.66515742553566,29.766518597994317,23.742826264183435,30.430867160168873,28.924076712933335,48.12367863020387,14.6575584203813,43.11610219174102,24.22105003146867,32.704080290182645,25.384686857034687,40.115735819539786,45.11062576354503,26.357987305839714,35.593423098808664,18.53710150279285,31.64204662730533,22.789823382969388,47.033575589236364,17.416168256240216,26.895687739402028,40.02118964707726,12.094014439475009,32.54483081413325,14.722791483254982,4.7965063023953425,16.23302467013783,23.93111363087812,11.734151987608998,22.50924232783207,28.126984585887083,39.187444291963594,49.31986143627424,46.087688319542345,14.623011810194308,9.027695091000487,33.89522368185126,9.651997381075706,35.29384184498806,34.55754776406038,45.65112598182006,38.66602694311357,11.52792809228732,25.28588285516271,29.3638495137477,5.308575309089914,6.20963902183671,21.76157748953832,20.36970567732791,20.251206237181197,24.391095603551516,14.306475335435165,48.9327501294911,36.02391928579873,43.53480411990639,26.299158298393454,3.8674630741690863,26.372601750866366,47.23767725194698,23.095098675294977,28.953512301889127,30.12945543689991,20.113682827459822,43.142850711144874,0.632017231589932,2.633435442930876,2.010978456338952,39.325215875815154,8.800054649147649,7.953949854338904,15.652509875407826,15.934085215134486,8.664370538042077,35.178009619454166,45.90556881072626,33.52063905834448,34.550431095143175,44.570754567698756,9.546032426760586,31.83453131615277,30.35746265173295,15.337520076637357,16.24094402130012,1.3966079000396703,14.67538745102882,7.447167564801649,13.887228593570311,3.2552249253179566,28.163626732317802,10.03575975183768,26.493879447475454,2.274029030640645,21.63528564338486,20.47783532151618,18.497091131542444,21.975313774342442,8.0250182544905,31.056879209071052,5.741298149881347,14.425337779942604,18.64868207578776,26.051935042430184,8.770077379449981,0.06332579133280225,38.86980891219556,29.496849886965848,15.292574474535458,17.776107849623614,8.108450654125654,5.075209834704896,47.79648295497827,45.69110805265104,44.658181878329806,18.82143853883036,48.055353839355,17.262254760807537,5.549255234243766,33.935926159917415,23.111365915875293,14.636965978032324,32.01291330173842,25.98067509407257,39.96367295246029,49.92777726341379,44.872695733655796,14.115792894585466,13.025805943696279,7.244711243087043,3.1757657094943825,19.151915926979324,0.4108690716746466,8.58754991626517,31.970105794960414,18.177452066265676,21.471607900719004,35.54891531354099,48.682018469107845,1.0916544737328615,36.09772940412961,10.722677075401144,29.55924801598304,34.30793120281774,37.122774175989015,32.2826495773155,32.418803962007736,0.90629742156213,10.265069824128792,5.967654650796028,44.65263101043454,36.06947716645698,8.532836280417634,45.798771416961195,3.7496157443750233,22.565822239724596,29.85546244039241,49.37376310308049,45.60671058597574,28.08997232237701,5.343392363093069,9.275005413123605,17.990988643036044,13.606076519808896,44.097811717829984,3.485057720199003,26.10694075892117,37.55706713259435,39.73184826559486,28.36978378836308,33.978220867346266,13.956372780092819,0.8855430255381269,21.708933413770904,46.88017417929139,35.021218755278284,25.33393667913646,8.167661847571994,49.68766351135345,34.97120729990788,13.40000627186897,13.514830311392267,9.29417418340539,13.269340888334757,0.010868620811321783,1.4453367251898275,41.98631606660715,46.43222837296148,26.8026473425136,4.238882824152713,1.2993810826354202,43.5351564938879,1.789845886773478,49.339992264475775,25.547185663532456,40.84101580143922,4.513730057459209,36.27387592779006,46.27895277257248,12.796949606502173,34.70450109974719,6.132519900292599,10.862442211941847,33.18388735894548,42.23810928786463,45.04908172588743,17.59532475374034,41.98911275581987,18.418883930877783,17.0537542519563,12.725348457998864,20.437905522746647,8.766738875327839,41.69194274101249,26.0779452077739,39.03054961742121,36.854151418023974,25.074546257408194,12.208503319463782,49.1689919813261,46.137061028643615,12.656888286118107,22.170071006329863,25.43941895782065,1.930047975245519,48.49892462458709,1.5836451912397131,26.693621416496992,47.736227516760636,29.416962568800653,38.632378560183746,35.24741681541421,42.59666352108891,23.35002996316966,44.83170779617165,31.15922436674551,13.293016410892399,14.043576572806483,19.109010813243763,42.775231917421095,23.31606281505345,12.605029300513394,46.00427439329745,2.8803837058718473,29.714731151597274,30.6027227856979,15.16990271450066,39.95039446438173,12.989343866577563,24.209899119188627,13.293027480338438,41.57108102752163,33.87873785676303,8.50369120128498,46.31409055021138,24.59341934395295,6.343763583105277,48.34292013983254,20.959912304446416,25.484926275375265,23.7913760444027,36.15880624363281,3.4281418617080894,18.08220266403364,20.7494465030587,32.20223529354727,27.50937990128164,44.75268611985085,6.229386790107094,32.007437317269016,5.589736446764915,8.759774473847138,21.61822125935099,8.648868331540383,34.082514845507504,15.497031341304979,13.103386028582076,37.18878518029296,11.360192744272945,25.19960250745258,0.14438406463840314,28.60930785040219,45.735848278349,47.391614143292514,45.71078708532441,16.064671178491974,18.183856079393223,39.24011076702961,17.58402039446494,18.380577882988458,43.12542021031817,48.78461402928599,41.66421165523797,0.9239929326909646,17.36207723604142,16.371742149550762,18.444839242100542,6.65482380212411,42.41098995621421,17.328938575682507,30.991327014186698,9.749621287645516,29.652220537856998,40.703394125270265,36.59075387769324,1.6246956565985515,34.49834972353673,28.70931639019926,26.169736123327027,24.364361780186005,9.323930837776151,0.11329050662064466,20.29247859318958,36.25601081199863,10.078674931945153,15.53617696716647,35.392269816682386,28.601181441517088,46.75931238132788,14.84635699981477,25.25814374142332,24.32444163820342,49.14930745057601,23.987605186537497,17.66339670669127,37.28667112751097,34.64113439404323,20.224166718526448,18.283077992258534,30.272166532905885,49.80256077005449,37.9270643213238,2.8065612058902456,3.8665464886465384,20.249608303227483,43.19719379398255,39.370209223038714,41.37838926719234,1.0502815506812757,36.08174209685991,49.43568983616855,19.630911699695254,4.40546171322056,13.943635747095351,11.635078161888357,37.961810207661586,27.499646537886633,29.862565654365213,1.6400192227631782,44.66126193041697,28.781968588387585,5.705464761001322,5.869051703752836,31.959426028038372,10.68803790180909,16.354065670637517,43.99981518083537,0.7662390637261596,19.842707277982473,23.542320750614397,19.367226440683048,35.975174259617816,3.3165210169947223,31.54019718347699,26.85678620473896,29.555010648101433,24.88232512787277,14.880823655986596,30.24365045197864,16.1082034586724,15.380250934640848,26.23296747809181,32.316103457322576,45.14660488096558,18.38085149572304,42.23389761510149,31.23294951216401,41.3854727562858,43.28159781659029,45.54029628296613,5.022586360689774,36.73769915122751,12.946437600006021,36.05602473793779,16.29919938556209,5.359502479452372,37.31276565457428,7.082727623861151,13.28512316907351,34.40152378472972,47.30393893690744,43.607853886036594,37.248974803231526,29.934125689502523,23.748664679671492,27.611229779890056,46.360316646031066,9.056162230362986,3.1618905993963775,47.196218136685594,11.171737914981062,40.43217634808152,36.380495502637245,11.111215456793587,49.9575857964166,21.630239346658353,26.064961548320998,13.867279567990598,47.57568561386446,15.853417504728052,36.23870689387142,42.72618339826339,22.982020124436918,33.00485700527841,49.85289524484736,16.49076630042261,27.71521516319758,30.20349716869951,35.625124208528355,34.06974246465534,8.617892318696818,7.1567028201970135,1.421262484235164,45.03210712252699,11.242134008850456,34.008191385139405,37.63705104946262,22.93364529848815,19.259832457065528,6.763331582060317,4.2307515998870056,37.80838251946086,46.56606822006525,42.60447282395015,39.181763553538765,2.5759127614046307,12.311903760096621,21.660409006818316,45.83287119289241,27.93588292611455,27.493620899439676,13.87440638637213,46.197356525649624,45.2801653361434,35.117056363242774,45.841013531105986,48.62728475849736,34.635582339657745,8.7119340931612,17.520253937394116,10.566306634885613,40.05167794447326,13.460889616139294,38.151425296041765,0.867560983427107,6.866767976354016,39.51760715476581,30.4331667328823,49.56005519169434,39.19970860515345,5.488308178422319,3.7161363574952144,7.964374895098192,0.9102223832140988,31.552539305055905,30.57858910247009,41.65674408966675,19.00753923127043,9.076063973130532,36.652706196938524,40.13662832046852,23.970255144397157,28.76424041684922,21.868052341728795,22.026613571308772,41.848040121928875,25.702842858846953,49.084949893587904,38.04430416798773,12.90324993963836,18.185680603954026,16.523980289384323,31.717048559811232,3.9163093712719976,37.34606834285882,27.37950733558957,21.475764679979203,20.914773386373753,34.89697239799,4.751665188871234,39.41234618580446,32.599409362662854,28.28185179842532,10.847960975122517,46.7802162865065,9.752029203227963,2.3822909762360567,30.004944051809844,40.603426914188034,19.36695647475285,39.74096060110052,43.8926704196528,18.757828998101022,38.256303883374045,16.67043272465224,26.82053212643769,19.722955962211064,0.8059684514849286,37.03659531291924,41.038361236656925,2.7965765991464164,10.617675740970324,17.198193665515216,31.909935167466898,46.02963257218512,36.96209404892606,3.913422655625376,37.26688843110828,41.51382569562399,37.65842342498497,48.69202196689012,32.04542943254681,17.282539229816717,11.895843749363744,4.618646120670544,25.53409821997439,22.761830715637398,22.283104136155018,24.868348186331247,49.82443271852035,41.22248451456589,9.947568333263357,2.750025534331124,19.390739058738017,49.519396335389644,46.31594163587223,33.478734772889716,10.904956354021444,34.185698575647535,39.727012895332216,16.45511572091294,38.80858824337972,9.266884551840048,39.82800674832677,24.7739292483664,40.3483488172422,9.501716868924259,45.15119574686635,30.225673117728245,14.347849122122092,17.15500434592063,21.16703551473754,1.8896078544105577,7.079144928140324,29.0429068174624,28.96087338434138,34.36531614904973,47.647819589601035,49.603438324884195,3.960820857928915,17.78736941216853,6.627137691152973,13.24012498761885,11.742879590244936,49.861809409827664,13.903964552510162,21.96348479642527,42.241502610019246,41.55777539009651,15.740656304246025,29.441281581843082,33.83733817727402,46.909096838983054,14.006348844132088,15.5325545123151,30.42807646070963,0.42574071623563414,36.97631211796954,39.52839119299749,7.335809077566791,42.462586505980774,49.836120761733184,7.7794886432487775,16.969605873052885,39.570751346624014,34.81717829980988,5.773461494358734,49.028813369105485,17.082279331645378,32.64774219955902,17.971251693857116,13.316712619981796,17.296217087349362,48.42808016625568,3.201704900948521,37.671731153271395,11.829704483864079,18.13338930229129,36.94976195427737,9.509948347229214,20.501092003854627,5.586876187294365,11.261335783087322,7.50160805969834,8.521683752709464,19.989791472221853,20.94868083065845,11.980154001169774,22.78772848263162,27.895564798876592,0.8642408669325086,20.17861990940165,0.32811131831234075,29.61998013953375,48.70069271727475,7.507650790541209,10.631364933502486,21.73149157758455,8.49528864288035,15.43488675113548,1.747990818038636,48.07116960999319,26.573517837464124,17.772297443761754,1.6294361474233021,31.38576166420878,38.20601639900748,42.22986750003411,21.187714376785717,7.007844598744106,25.0587491181119,37.94410226749246,16.002949451006153,33.537003488480586,12.677415129315806,21.020851931323612,36.7757248603793,47.64053200440895,35.3240865268933,48.340136793275036,38.72923671131563,47.16879142070716,48.67890010431242,35.076371739781365,14.508742826408394,38.139266149058656,25.77004691828132,8.91811195662353,49.86307315449804,2.6190157113911594,19.403177506014945,13.787773459541253,7.3156281945498725,17.880434281613155,34.966398352128195,26.02052136904739,7.703631455584925,33.17344438767027,19.69094400618021,29.93896467943492,46.503785083147044,48.477106463524265,48.907381851046374,14.12249271999524,34.090363985501995,8.21892844438864,20.872687806974845,23.265721385959548,16.45440200918197,21.371176803856116,44.91096101954193,29.489638828048783,19.634900458954007,41.802073305806374,17.40854880241669,45.25399827386072,14.427247776218488,33.7400469742704,9.962651682635892,37.673413149570344,10.042755486850508,5.446113762281479,48.61634139044965,32.426034874622,17.783693760856778,8.994104410462567,22.25592294072838,31.535363027502928,31.43632271210596,34.6007440693762,35.251566297590045,26.153003969288868,0.6004349530986275,9.130478972682477,12.362024742794564,25.20428131668755,18.20193960031451,25.969723628429588,42.80734445170312,32.570366184215096,0.9182135697805793,5.074987639041739,39.984913605013304,44.80903818016533,16.068793779568402,13.955577576589128,39.558489529611364,49.04858488668782,10.709305126931278,25.816911432655722,15.772088319566102,25.667778509259765,49.1559891493545,10.211898761864513,0.6430263141389059,2.995744306155157,11.528755901760146,17.648837636642366,21.510504150691357,9.084823702548528,44.610416992323785,45.41703466102345,43.81734420240445,18.96391348351425,28.37273090653888,5.938732279442405,12.06600246408367,45.58927571998932,42.77643232784387,38.63805216979031,8.291474780710695,49.323415000213856,15.620531517610026,37.79494472418773,33.90371607856589,7.892856839124263,35.13982911462116,11.414444036460958,8.131993362465561,16.863111856323563,13.54258567585206,33.31671130887932,17.070824583831346,37.155961188727815,4.358402274032869,4.39575243111242,36.76119127569295,0.02615959592673356,29.17232340332999,30.448686197806563,23.239507043838525,29.208743770515746,32.889984272315,47.11310197459105,41.613334972483194,3.269523299303523,9.455035781634857,47.254823662337365,35.19179617789416,49.64483683539756,12.760807096681393,4.799978589443854,46.98917289401603,40.360743129284174,13.891654549853483,32.958662817556494,2.262840859742987,45.058275048957896,47.95220201345413,49.398451192059355,18.43327633379406,27.25088937291169,28.47898508728616,3.753597041303336,40.30231953625133,36.3155343449886,46.80474577192827,22.745032419523127,2.4713130004579864,47.87074651313039,1.8088479398501223,13.298302914500082,13.18287976612621,37.366510933277134,26.60396241690114,44.47665725295721,9.472505533702824,4.509527674234215,14.889683076578708,39.137085270021544,20.863390479825974,11.911132665445667,5.36840701872009,39.22596695729984,14.440112335126742,20.17005528084075,33.25577217027613,19.395347453224844,32.969282671373016,28.73306155139469,18.294236390113873,36.24346594446109,23.654297117613932,20.992638710688936,17.215636006284353,5.831283946278831,13.715907188545717,47.54307123731125,27.088404952762634,30.646484275339315,49.61914568460062,17.622146849967677,36.07436976757751,13.187113490798364,45.83414142665324,20.693828438674778,40.055735864018935,40.83143464004667,12.265946793669958,12.643272983546227,18.850118123548775,36.64541337548941,30.455979771942697,43.852539480164374,19.750924629537558,29.052682549761677,32.72207310181968,32.32197282317908,14.63757189826711,47.31051612032753,34.759706382062205,12.918920624080965,4.247782707108383,38.9245264772903,18.682558985630315,42.91430513681165,43.6390358449375,0.6679958208786196,45.47737200357089,26.120294256760335,28.649108501282537,28.572159997597947,20.7404036058499,20.125168462056674,0.23907994505573127,41.57713524503473,16.231863188667596,11.880267665896504,47.15853042762912,0.48387182454668887,3.817287902126454,47.546216479106285,26.422123049840916,6.6677152802380295,38.51068072035776,28.73058439198767,30.324068228478616,33.644971602022046,36.45714499282371,0.16527200281585275,0.6845665187240169,0.5797724029331319,5.868283821023079,19.56699804159975,25.2743436163408,4.46231945844019,12.655492245686117,25.88943913716999,29.998812831454014,5.2773885847168795,46.517861045971685,0.692892670327383,14.253104603890387,26.380614602391983,25.05948297528332,24.40958883518669,49.697340997345975,0.6328704114331174,26.33999513984301,27.688033721411355,10.206372792623375,44.302376992172896,20.599660943338993,36.55535784948063,6.265773559430565,33.424403083738596,29.81059821425809,12.631494211555715,8.951511829593695,45.03416538163392,45.663978052161355,43.413230923030746,43.77702273993934,44.84470021137018,4.791028932549168,38.71022636232146,23.217102805136523,20.872798593148,19.807632284801024,8.431761723865483,2.079535825906642,14.331862635180636,48.15323037390834,27.277198147995417,5.685779230806897,1.3952248984829607,12.708589946350568,7.161289286807926,26.89369967347658,9.297477408311849,7.5749180694395175,34.70123638321317,40.221611048467075,42.98542914871031,21.717501285611917,33.96282719968746,3.7099166508073655,36.77749650584941,48.75599500601556,25.149540663176275,23.852652475706304,9.888421527198844,6.149012214130201,48.88605077273584,20.259100796830698,42.17493330362433,47.92291411892193,27.536893862231093,20.564255635507422,35.94014513745798,2.231175949072961,8.401708983961809,6.138876126058346,28.46658334883444,30.59990299059271,18.22484142419637,10.981186794470975,6.8333151471475,46.948457923611265,36.974033865630794,24.371835663017748,45.69534869814733,35.01186078178931,9.776518646852516,48.58896363717648,41.93333393066667,22.66173313071912,41.6733701028573],"x":[-179.05886246982288,-114.07095438542565,-197.93397939093748,-140.00348429945097,-103.93176143259417,-108.63615281662511,-111.14830718358368,-101.09213474640441,-106.37478642977212,-190.84288281427246,-154.15526445623647,-166.92598169451244,-180.6392451511242,-120.1266140488509,-122.32845656631135,-134.48718891683242,-175.62496280353085,-142.57317394263455,-198.33254217330474,-176.08064252505028,-158.05942106001555,-126.38586429833103,-179.50207504687197,-157.0741718135592,-157.29002401151473,-136.0865548278433,-193.5154331622686,-137.04733765787006,-173.20654048553206,-141.81301542435017,-130.2498634142592,-189.9052542706013,-177.23338424445677,-114.68773829351035,-137.09413467073333,-186.10415478653618,-122.7582646403356,-183.5889881131742,-198.97581518823085,-126.67809318010615,-124.17309659253613,-126.63920184525938,-121.0543544852846,-195.43261254247602,-170.11505037003255,-130.51745613847038,-134.4193560301762,-118.61205681595732,-117.8767882168793,-102.52518833082036,-117.80386646423516,-169.41369997060764,-111.22181327774636,-186.51042608634668,-175.71651988920104,-134.19700927009336,-131.63452062151572,-183.63111348928228,-114.67986069264569,-147.51861663038866,-148.10042212045602,-144.3068953613838,-113.55267100407774,-197.42788725035712,-178.92017059464598,-165.7340329710947,-157.32609668985685,-120.05999318037455,-105.92375236389759,-124.73786315998403,-145.05560324046672,-196.74896936933405,-171.46858830468,-197.88650522812603,-168.63075116589084,-134.07147352771608,-114.7597006395027,-185.38063349500584,-172.29015777788365,-117.59107541897743,-152.19130176590085,-197.55036116177484,-104.96176842164975,-121.01620785273938,-122.40404874940005,-141.8350967034835,-122.38056213420481,-108.61583584251679,-192.72792123048214,-173.8164770239,-152.60545404179055,-123.95362413461288,-131.93916614455938,-159.9780596479864,-148.1095199533816,-117.22659768220483,-156.24917365997428,-179.18647072292336,-131.6460429810628,-110.47376499450783,-155.53800023877784,-136.15860187696876,-177.49951344062663,-105.97935614857825,-187.19822310237458,-138.74332398700506,-115.04966606238689,-156.77027290771377,-155.9507263251807,-142.0609452013126,-148.51372082026,-105.23202706560151,-132.14568773417705,-163.94413726586342,-182.3435731868397,-187.366050012466,-142.5461295368943,-115.33095437344274,-183.42459621651318,-192.82416835594668,-179.3165944025515,-172.41848184010132,-115.74204947569856,-189.14097275364242,-120.9629974884726,-184.3451771404537,-150.02584017108316,-192.96784257018876,-142.11256018364116,-190.4806868579364,-119.87102302715608,-188.2145564389566,-194.6584518447903,-105.79093310049461,-113.85805558403457,-169.3165918084126,-168.51535512066582,-145.85699677118237,-145.570094761645,-133.765796678379,-163.75621657660503,-192.97446844660993,-170.41117462916202,-199.8265939810644,-173.50948763560538,-153.0432866275287,-194.10787720354668,-155.1955133133913,-110.50047945894892,-142.37553756903162,-104.50818054219067,-111.31745579560848,-194.74304852682465,-194.39175789858112,-179.94477928766634,-159.68437139842194,-196.25443153411237,-124.90862091760448,-136.65590239980273,-116.3373818447031,-183.60684411669632,-124.87824326603454,-122.16877462047357,-146.2419203188283,-188.46360050131693,-183.8432832200223,-121.36585474147661,-104.05618416498604,-160.2913217543455,-121.94151652016852,-149.84665652356756,-175.77452121759435,-106.92838140941528,-160.98206729371384,-152.50523604037622,-193.8115079396302,-121.69725217933025,-167.16434902038827,-153.07412265649185,-142.7739209435812,-122.08712901550551,-116.2971546687986,-136.6628859714546,-166.43156050101615,-127.69991354833934,-137.62930163923104,-170.09354063520306,-138.28010310298075,-105.0890006083975,-188.944444414612,-107.03331214401315,-195.6527452873188,-142.90279506542012,-191.16759046349176,-100.59984102688281,-108.9628418069899,-124.05130759233771,-131.74686536581208,-118.32122948924541,-158.64207518454276,-131.83952220828473,-184.2757740182836,-125.44685285725046,-116.84861073390273,-194.99618966750432,-154.498479512015,-167.2982483308103,-158.5806154040906,-132.04365083307522,-156.8733988554754,-178.4047462708506,-126.71749083411213,-196.5875439332542,-106.51672636313086,-101.95778655077324,-195.29251871276819,-177.74505824958044,-188.04254388190625,-107.07746464891004,-162.18836872636615,-172.4379877241394,-183.09328003380716,-178.48269026531156,-104.47885775106481,-128.4839182356749,-102.31465765110535,-194.0623242577377,-118.0708196809457,-126.39201614464415,-110.23389770943292,-114.11999649535132,-179.91935417703638,-132.19447160277795,-170.534026669273,-191.20583323691886,-104.61729928156807,-107.98170797186823,-147.6376083896048,-111.73352622911182,-129.0365041332882,-170.64492639783722,-180.12772012734453,-177.26838485812777,-157.26603945197584,-110.44043075591878,-194.38057804704275,-135.92745730999803,-107.79375743278695,-127.88133643899755,-138.04934136495038,-183.77615943297945,-132.74831710128,-118.70773634174736,-121.62587841447771,-136.58774474192657,-167.8170364712918,-161.83867343605877,-176.86613949025542,-111.45147739711432,-160.60902877227463,-144.32094164999148,-169.32753018297163,-156.1620663576438,-149.99441116981023,-182.84546626777836,-106.0707637053681,-128.86910838427553,-112.55945687601083,-124.81877457103006,-162.2678344542785,-199.22184702384425,-127.29908786749759,-103.00664336104145,-151.63853736415936,-183.09164341665894,-172.7087281998583,-156.97119901390536,-118.75257849909269,-199.49437128261366,-118.18143494706104,-161.56840078538195,-188.8301972481155,-147.45146244808302,-101.21250162432295,-153.3250584462538,-129.8867306546847,-140.47993738311033,-148.92672226245986,-196.82902704080823,-115.17674692643513,-184.11444155212433,-195.52337200872617,-173.88058051705198,-175.0052113132066,-136.1912458339387,-102.20773715018821,-123.82270733116427,-153.21464729032786,-198.36147401530343,-143.84563137252158,-178.12963681946715,-190.74878999521906,-168.6790697854958,-129.951286265798,-156.80487930544615,-166.27422152489277,-125.76826919670057,-115.38002081872843,-189.17172217357825,-181.2380972461577,-177.723481038081,-128.47538846196085,-163.5855705162087,-161.28935386592377,-189.07456410771022,-187.02080713386925,-191.41020021770387,-154.0111685595976,-183.9375675139853,-158.8308830626423,-104.84028184015368,-183.3076380610764,-153.8318392409824,-184.4683718433058,-142.55607395402401,-177.73864603592415,-128.37781465345424,-107.28035331646544,-156.28564883813732,-105.18530304509517,-108.44027497301745,-114.99251095414125,-159.09458644054934,-143.21130482389358,-183.61441435532714,-193.48715989666786,-163.95301536955958,-163.30305676967606,-101.36394262716959,-198.52148820810586,-146.8085758244438,-144.6849070619854,-123.03708600715136,-130.2975825621832,-121.32239070280787,-159.05312470222026,-138.42676374706315,-104.82295943716737,-122.81727662585699,-186.88616628145877,-147.1804128218655,-159.1019688315077,-185.99291975674143,-159.2612814497319,-118.32867965884996,-121.54818229730355,-114.4429786554312,-144.94817949134546,-141.41143894452793,-146.01660043222435,-122.98188674924874,-123.02201122596432,-199.5086410788039,-138.23655732309135,-110.87228337869949,-182.02974560295826,-139.43291755169918,-150.5576110845294,-190.19908432569318,-113.10318566672358,-104.73526084315972,-186.30397600632173,-157.0742590792678,-143.54260710332278,-112.6444845551982,-107.4918953362373,-195.27345816148093,-195.22323620538765,-114.50821044667347,-103.27197622512092,-112.4600483584506,-112.41109196984449,-142.73189886605564,-140.35949989307622,-108.51839786570427,-146.47923970157322,-167.34337730751056,-123.10805916357732,-160.24185038852826,-129.2053793158733,-145.82197929298934,-155.8000696538575,-127.67216854613561,-155.53397035451326,-135.64589635026238,-111.32658056142238,-106.03877080350553,-154.57272474931966,-155.02131116594128,-164.55966079870078,-198.77826823866482,-158.00638072674144,-117.63677324673532,-180.8680064263561,-194.16273831064723,-132.1286550507256,-173.36720423438973,-187.3763890886025,-137.82647148605403,-104.66000070163959,-197.96633022116447,-128.12914353466698,-175.75308162935326,-124.11145946484348,-180.83803599788143,-105.84291598074715,-160.0353106258771,-127.87451780954828,-174.5199823875546,-112.49718159560757,-112.4136079054305,-184.41854765910267,-169.55686960705643,-152.47311548529115,-156.78451601009027,-121.0122553597421,-178.77128267163752,-165.20930175248552,-191.1243966606389,-154.97995776568928,-156.32953213419214,-100.40389671798182,-162.1431629085626,-105.2709931885782,-191.1708155643766,-151.36605734435184,-197.99088042373162,-108.14990371888655,-128.58753273224545,-162.73946727313086,-159.42538487572625,-166.0989030350269,-104.82831411373255,-153.66463762806782,-188.04430643869054,-181.69265527430892,-135.6068772106148,-129.08670048953508,-132.56644330814947,-123.17832370915343,-198.6612147260025,-183.37701499562237,-114.3000509478922,-161.31613020479512,-187.51790109027206,-182.02373912905315,-167.16526810470157,-100.62728901370465,-148.11882381013086,-174.01841801455978,-179.33776137115967,-172.4589499397427,-122.53986747215866,-137.54601770947767,-130.59167698208643,-163.9553188489898,-168.8012890741124,-148.26309648907025,-112.09377553879345,-199.48650597993512,-135.5643530499225,-135.7496658782036,-170.09037943744775,-194.62786260789628,-149.97844649458216,-119.13285115504874,-194.48044730750357,-141.50555048727944,-144.2190811996842,-189.33017983408138,-138.82720147414528,-151.5843462863939,-185.6150208352862,-178.76565422900552,-132.6801790255063,-154.99289760964277,-157.74608726841143,-193.74007482839758,-158.4153756112633,-114.99590056589571,-118.03236811717504,-157.12428732310474,-161.93482007654566,-182.12674825260746,-148.27705977951953,-158.1714636226856,-182.2204416764622,-188.6881405778929,-108.7454690330276,-168.66754986985433,-178.9794414779991,-109.46202911713783,-113.7799558830423,-180.5651870650298,-135.21455069332103,-133.26379750550421,-130.6237380988619,-121.09160308975385,-106.00510988873984,-160.2351556751355,-170.90860946249552,-186.73079832032647,-113.1921673343967,-135.99884333619158,-106.04224256998573,-179.69646996539316,-137.49896873265234,-154.20463826278473,-160.21290850825687,-120.81125427899173,-112.71346232470746,-153.74027029285077,-189.18207743077798,-103.99753630889006,-133.11123004825185,-148.19944685819152,-191.2983772317527,-181.941917323951,-195.175792777086,-105.85145352285339,-153.6981728585128,-154.4197694402856,-105.69612030350773,-173.14996460200308,-192.44635855465236,-170.24449686871338,-105.46374064242589,-174.25367365836567,-149.47115302586204,-151.25708515363442,-181.2105046807945,-136.42480095940152,-178.89604955129127,-129.48687683640662,-141.4504776270203,-179.81603428789103,-119.87658973521071,-139.72946874619564,-140.85107686882316,-170.30464937606365,-143.7058853561301,-163.32506904682657,-103.21082356399609,-176.17593705356737,-134.45900351421272,-195.28107082875093,-192.0890414120891,-155.699007641893,-143.91841357719073,-101.06069715749251,-113.10102318867756,-192.48428228235522,-168.95588364990516,-189.35886382937926,-180.28886331112201,-118.4003526607319,-138.8377590630526,-178.49754965428798,-112.16407345157128,-181.47099666211724,-125.56450888396733,-103.12780319424857,-136.60375466516354,-157.4020856318773,-165.5997336027272,-107.00690376089315,-170.26743894638935,-159.85631147923914,-180.10232196070427,-165.18275666585998,-116.675849281454,-186.3282798754795,-114.0678269143627,-168.96741816705438,-144.0276382337805,-140.40645651417736,-102.04516584347982,-158.92031965840212,-105.78013913767113,-168.15966703590234,-116.22490079840162,-127.19199186861552,-179.46001090295735,-137.06013740312702,-197.42556694813197,-182.02560955658208,-129.33921005246333,-137.65216502887367,-104.89002305127781,-152.8660720019357,-102.77786574334675,-174.64661143033084,-173.34114043888292,-173.0597253465999,-179.18435874233654,-156.60208077737514,-112.255068045131,-160.64285588824913,-195.5954929056877,-115.23117638008122,-152.46255129937873,-174.38253968743587,-131.6493955644184,-168.57046551925822,-156.59234284179743,-126.48669768831277,-110.57093632971812,-125.79422867080288,-198.28981373155494,-196.71112796063088,-112.43445160285921,-165.19323326048203,-185.9165291302045,-135.32153103298072,-132.04893836515316,-162.21290595768903,-187.9199905053967,-163.46372108693282,-154.5242798564987,-130.94228721760499,-120.0855457409469,-145.76658983593111,-126.08821714791651,-199.7200781219544,-154.42921639197613,-170.89278746220307,-117.18922425179133,-113.3048980319401,-117.17332848630164,-103.67799288027275,-164.78334473621584,-151.92817772210262,-157.32246866252524,-100.98249736108266,-117.1569253934333,-139.8199389422139,-158.97940498684525,-159.52909691514674,-116.51679364677088,-171.44664567486657,-131.779766475254,-131.26145012030813,-109.7041311172152,-122.89775257109301,-122.65000252818878,-124.89280675516927,-199.86228878699038,-188.61056422407972,-179.75153946505333,-168.0074242182619,-105.58079814471706,-124.40705553053107,-121.96439412316407,-158.26527353665904,-167.41852263003915,-197.2927282983651,-152.30815614004212,-151.66682126981553,-187.05039605809185,-196.7913916906672,-182.54175009970265,-192.73409524591412,-130.85069162548098,-173.97662367841542,-169.8513693750438,-152.3271175175927,-133.01549237857398,-176.91884289461194,-118.4363863132001,-104.83405012714526,-194.0256165735805,-114.22280979878022,-184.76524820476982,-184.20732695364637,-195.4730783252604,-174.57014525047614,-118.33931203501282,-100.85013578219382,-122.51881224641588,-104.55941705465644,-140.3737803490788,-194.10096955795825,-114.1075145575632,-172.33569510290522,-149.7921623890315,-157.46669482915797,-196.3666589827586,-134.56550632691093,-154.87646629613835,-117.4734054629508,-139.6751024920565,-154.14686067476765,-145.95712083651102,-180.98907462434533,-145.30864289723903,-104.90947540611131,-186.45157671175565,-143.11903474028057,-148.15706586323725,-102.80142702027182,-107.03428699804485,-126.57195450832997,-179.18571871638264,-195.56699818280188,-162.1461416865696,-171.35310382321725,-140.52023602846745,-185.11546698689602,-179.4209881290155,-185.7005602826796,-167.86146247473812,-126.14377972476818,-123.06563191217235,-118.68824809651176,-171.5059312669213,-110.07405275757691,-166.72736756578558,-148.8906676814994,-106.53784256890013,-103.21940335079451,-172.17099966942,-179.7017216582438,-178.61319080155542,-101.99050607600073,-164.01015904305166,-127.98732498108407,-146.1361590864397,-117.21297854760017,-178.24028524512448,-181.75793743501265,-137.32811648310476,-180.01449343997967,-110.17192517792327,-166.05866493874984,-101.60661392179333,-174.81256221339427,-109.26642570094229,-194.3259798749344,-177.27035935886835,-109.76503248209009,-101.63663205562084,-169.6552138233303,-148.41846221442714,-103.32231564772518,-154.0628050710354,-192.32568340529178,-144.26067226140688,-151.12273114399798,-108.68880503214426,-158.74759958134467,-185.51596102552486,-152.0332823464263,-172.30282117475042,-162.69204731631757,-162.53103643133392,-179.05545833700174,-157.51721941755068,-199.3732646418365,-171.65043573907494,-197.93433005529897,-147.39480814176713,-193.8893267514357,-175.32818116042276,-167.58589929875086,-171.22464871641566,-153.4313326049278,-181.17390160621918,-113.66121702350557,-163.0197602571372,-159.5587831745351,-185.90694059340825,-167.94269363175314,-101.62333355574569,-170.29978901508179,-172.65950447032844,-185.88104459147033,-103.40508055035139,-125.76781197565568,-159.84585187714896,-187.39516104741963,-148.47505899992308,-108.39739251945932,-156.15782252610478,-109.40548406701109,-187.69830146942675,-146.64585116767879,-174.67639506805483,-126.8338367490507,-192.9838850042764,-142.79683554273967,-159.893668870724,-121.1190868141561,-184.97997324709576,-163.10959981732282,-197.94096163234312,-140.46389345094758,-176.74281800823047,-176.81491595580428,-168.7325816446215,-104.74541394442751,-114.58784535458919,-188.93132274471878,-144.51603886083964,-126.20131518590134,-105.4615104814626,-144.65994806524643,-168.7216465954842,-154.97139035913102,-163.62203989673125,-181.34745026404408,-178.58794710156948,-120.2404842931604,-113.63176228233469,-188.76744418601484,-152.1327028124951,-146.10718225924543,-171.70551428966206,-121.41682938556058,-136.4223500979346,-113.56934299447758,-177.79549897587896,-185.29297534830232,-140.03840222027424,-195.34066895554926,-159.50832278543933,-136.29942125967187,-136.15310066248963,-195.74597886871268,-111.40859601817112,-122.29266267711432,-186.86023709965156,-138.77617819087877,-115.49268167762693,-170.34801103165304,-128.57572138292687,-163.31196649392962,-191.9273293840147,-112.45169584448512,-130.71078331689796,-189.4122944428031,-101.0172959184608,-132.12242572486747,-197.7490019041165,-136.74477981251812,-144.33364136776166,-169.26067841624194,-192.9298907280127,-106.47443132194945,-199.46679516127992,-134.19531063347966,-197.4446646588327,-159.59682873367547,-194.27272574886828,-166.09153127317086,-167.78206721025256,-142.21875755098915,-196.859502656834,-171.67142663539818,-106.1550175230093,-113.11429297237885,-183.36128107272643,-102.23210994909265,-131.1437961704651,-132.05519540249657,-129.64114352420302,-180.09354984812586,-105.28268526449031,-168.85768416125146,-180.87199537434836,-134.7169258374086,-198.360655213416,-139.63170022755588,-158.30197723136476,-161.8890623831914,-159.114065952747,-168.48148923395365,-108.84777309693501,-135.62928723296264,-189.99777891522075,-124.39920168635163,-128.5334942411991,-198.2962871196632,-124.94732990872002,-134.08965472814236,-191.22811312912683,-136.24764596010004,-145.92385387769528,-107.44689633632747,-175.54447127808493,-174.84088965640936,-183.14160033068472,-152.20984064401387,-115.9253861825047,-131.76407218947537,-185.30554026845385,-154.21483597233828,-104.97322350757645,-178.75883201535322,-129.88458741223405,-100.3702531068842,-183.78696349333467,-138.94180838314819,-188.36461599992353,-137.04897179141608,-188.56116070808287,-189.1061700140977,-108.80304300763743,-139.4227219858569,-129.05989909273984,-189.10497208003042,-117.18355032909768,-122.176144494892,-168.08895308877237,-181.7592994628799,-146.7801664402003,-157.4153909047601,-101.11429067941509,-182.4670931210881,-116.20444846991455,-135.33920315110015,-147.72405927829786,-100.78707293346649,-112.64613334680358,-179.88390334046403,-192.32103048127487,-152.05573372086928,-180.97270040467188,-162.51313528953554,-199.7330698959366,-125.47885988308192,-177.00679565486678,-106.44096542393282,-114.64627919600909,-185.05402551670315,-134.57083861200738,-114.16771978689609,-146.03264324891694,-187.66563910935884,-198.0188186393859,-195.25410932362502,-179.51731449640872,-142.52516634172775,-116.90859019610711,-175.42264721582376,-162.72283120741946,-100.30072765026136,-156.68847438448148,-199.71045796667565,-133.52517162256675,-171.96142720557003,-162.90996533068633,-145.29907468890332,-123.59427770699504,-130.02431384580683,-190.94081801608093,-159.08325397291554,-168.93818647759196,-127.76068428908287,-181.3764427809689,-184.70553533561966,-199.6082013296807,-143.917366537588,-194.38561642728598,-197.70036217905846,-111.54706344522063,-166.56489749986957,-163.7997730929918,-156.4004435741389,-177.61361682829417,-160.49159547310995,-173.0354576292019,-179.71630718992822,-130.48390960248497,-193.61560658888172,-135.8609549638349,-159.86759103832597,-110.68689347178584,-109.20709485247247,-172.84734972968837,-152.22508570725103,-181.47825464686375,-133.62708428308673,-128.69602232068712,-151.4640742585823,-116.16299367961295,-107.99388728877828,-111.62715532706254,-132.86330454144084,-196.6812103920393,-164.308367957754],"gamma":[7.2803369461164325,17.0182036121519,0.4057619478182417,16.367143231740023,18.513672513702424,1.9192985229837323,19.11494940987472,0.10646090481688297,11.60252233287206,10.802116183339141,5.793142342618651,19.73725791015696,13.779962748886243,19.883186392740207,14.38893226400641,6.0071859903346025,10.163269529334924,18.891854293411274,6.642380034033675,7.699869422660299,8.991751637575103,15.300968197217365,0.8382178198537327,5.447538553457423,17.497989252343512,13.160182297402358,9.885825003080404,8.874950705303778,1.703739973140559,8.477915420179215,3.4556542663455847,3.867600538852418,6.050592977808726,15.432332933548047,0.2799146336271052,0.03541640174944849,12.094334109194712,1.0963358802745482,3.8772471589964264,13.49331754281006,8.632150739348422,9.16822377975743,16.877968140233325,14.631660549048293,11.096251256308843,18.90787854184607,7.206122244254947,1.6164788744298697,6.895860187238569,18.182475951257754,10.568174144747552,19.364753534292973,18.660343525991294,19.120302836009895,0.039254718191408244,10.24136343451472,7.4441175542165405,14.035473431896515,17.97244483360948,8.276843387445115,12.844097847729765,3.0144205304964355,4.470778869713765,16.72413979496848,16.60626917386823,7.374255508780134,11.92149972607034,8.960466411461478,18.0554178457362,15.069843438550713,7.005949472449342,10.161956106368123,12.775939563898255,11.398336245072866,3.6410610532476273,10.108884325058964,12.263374412919461,7.630472150323908,7.093544860933938,6.224614585701764,16.04775205194338,9.297043321592916,17.30792415456285,4.697251862643768,18.470079490035115,14.895560121655214,16.828427268917842,8.694968660087543,18.755839712565006,14.768770923351893,2.125212345301297,8.687217060990019,7.209009775839599,15.27482512076677,4.5841770016172445,2.9486076754997415,4.851920999813433,19.14847281769594,4.545287845081223,10.044586293388885,16.26685976683095,8.612986350089118,19.887440102864083,11.864948577941977,7.361415400581728,9.427251029439066,18.513300467662923,7.712092483486992,16.248653652793163,0.05714587314926689,6.514634436109388,4.809007047146703,4.145748113127934,11.439121103006862,15.13393534944143,5.085332983916455,8.066595708795315,14.851903289660843,4.538444332899347,15.042886039897244,0.18475284881382947,17.26976508089169,13.524294299232986,2.266356271300114,14.932994860897573,7.467544899606011,0.15398338249250187,8.210883600554508,12.67902891565598,15.472597460430544,7.793729368207218,16.79152107296105,15.789119334761143,10.20853146841807,3.2835577364196,10.22052536974857,6.354592602145468,19.600375203866136,16.51183584132636,16.830363604312907,9.026814796740311,4.523936441357148,15.089164608247788,12.268399203540664,7.009070421201793,11.080037569334618,6.27234276593859,17.846359699602594,19.772704031219952,8.832624925466664,12.364201784473297,9.309529827764065,8.733648978541124,12.844879904490018,14.475320362258262,16.02699183108954,16.84877550501174,1.0858106958492453,9.235267732966875,8.37824672353008,17.257039426474776,2.60617922743958,16.186797430190758,16.351412055037507,2.322039794751083,5.49710005776999,13.538129040225698,14.085856323955586,6.63729741203396,19.05259382888233,15.753675549097913,6.971233725781341,18.562151855157303,3.6285048742185033,17.907513533383717,0.5915170299045602,6.859563558971269,10.875598796203448,11.330611081868698,15.909705098500883,14.683119594287103,9.281042794905021,14.723911656882564,18.927139059600794,14.763885564420995,16.33875565441878,1.7589161833753852,9.815425275417615,19.878027918100734,3.375371880476634,12.017433750417336,4.2916071067117745,4.958696593694096,3.171722956592493,1.5740192323091096,6.896656484137371,6.842888277105859,15.723791616539135,15.823781301504841,5.366301170079386,2.666961987153167,0.4128001177883567,6.3222544989870855,8.509890550247396,8.375737327015464,0.996656836783294,15.192527138412277,16.125120543433713,18.15145558903491,17.15257972531201,4.536191293758658,6.803398144549226,18.270505371970643,2.8850066533268537,19.47570058320863,8.585902541348771,8.564046327029594,14.51262617800202,6.85190340923806,15.439785506536946,11.5338601705364,14.546581427155513,13.77680782297201,19.402809277847304,7.153618092220091,0.6184479953476085,0.7595472241022616,19.615865964901626,13.567006920222507,5.514712736373513,4.84058334146634,6.141151904669906,12.49560393206207,8.338656795832694,17.337405199227494,6.706766167336542,18.50436445532599,4.858199520044941,0.4908069901949963,4.284960533762989,15.54754344251391,9.366470650244834,17.816094098184116,0.4952729268081768,18.277169640950035,0.6952495851881135,14.813074958672967,10.483200516159506,8.206580039224768,7.044500647850103,2.122727139524203,4.404716950410714,11.630717109352183,19.17289436840499,9.5543654048058,13.470590825113273,11.867064317256117,10.091727972767135,10.988547217565273,17.300682832691482,5.957344209201136,13.63344427740155,15.340489818099377,11.41840334526079,0.39840032465317865,17.817830725464532,17.835265473011116,14.271314805887968,8.203043776756957,4.017712500272199,10.32861024729736,8.242414018066997,7.743658409591547,2.3553844869346685,1.9135066069059148,10.068084310988667,12.940733216597549,1.940239709720486,0.12862656170537168,5.358156524860269,15.230679109300404,15.827868506415413,16.546627031993744,3.2535793190880824,8.882094955191477,16.447788984688575,2.9604195699118607,8.989562544821176,9.309610442267555,0.2917167458576131,7.396409457670026,1.5949532780262965,18.928180666214832,12.045564367159667,1.4389441935945069,9.319970786828513,11.780685299226779,1.2055287776008994,6.583479085939921,18.359365251336627,4.445627417215734,13.597430329988892,4.61626169499989,3.33121566734218,17.683998600960198,10.926198824102737,2.5822853338227914,3.065669265232236,7.510637633702579,5.842256689561722,12.224592934535842,5.370985935769617,10.805838927531708,8.024116884309871,2.3589167270960365,13.453295852531252,0.47534338812605714,10.70183243150677,18.238408435733973,14.314870482921762,13.61751529492425,9.611126464835046,9.440971887733266,14.292108534109932,15.416663570033759,9.800017884871064,2.368159557689462,16.196999875432795,7.098593812661638,18.931873234963707,5.089329547452386,4.9824443677093555,2.6466433076807983,8.433194106947672,2.8870155479333226,0.3212269755451169,5.628428596725477,19.577232070803873,0.961848364727782,14.417929243614704,2.1814812842976172,19.00560747479693,9.200786046027321,15.336496997547355,2.1899103296627764,14.951572497694862,8.107504867062909,15.12656044961146,12.051251356142467,5.638328480012751,19.23060051116627,8.597759003177776,4.919879956656845,4.979437395511144,13.690191285709293,1.5387714227194493,2.3638968407874827,16.107896150610163,17.468601938601545,16.369281809830976,0.9942224986877113,11.760468581295864,14.78279464200468,6.7026586033604385,14.686462896349294,8.576279852686813,17.135302278821133,17.103411921437477,1.8900116246401044,2.0664488032568817,19.32094153503509,7.261657921554674,18.1167663411343,19.131935493732122,17.73923171499762,3.469950205769452,16.719713300266967,1.4141240798702004,13.685643986643523,0.3762587864460354,16.230020189789627,19.864576004365976,1.009440018255865,11.766940368774584,1.1868311839282297,13.594237922762202,12.805002509053649,17.12435803408325,18.257047268722438,19.88460175691818,1.3893504497777531,8.036559546654804,17.19229110304144,9.280132515094728,3.6126633566833455,7.537658673370196,2.312690141799645,12.681982149432702,6.596721287740039,8.314275977223362,4.611653476673423,9.760883741173782,14.8622160637705,12.318314918068115,15.448697253161065,19.258375357668044,11.535934411975347,9.658596991098767,18.64209106189199,19.857971997647216,19.068960981779952,1.746813977546604,7.567209047754289,19.560433995589896,0.8194976826366407,15.634244958735977,15.58325124866955,2.363762139724348,4.110423082565506,12.840133595288368,18.896787419084582,4.49404819117452,6.9775639954812,8.942407747495121,15.99875626720626,12.584414349776756,2.9756427730525026,6.160076417311209,7.492415315171286,13.881373286743184,19.200436176235197,15.562364290722073,6.65785591962432,15.202277666938526,1.8335351817277257,18.98794511083959,2.9092432428743242,15.19592645957902,4.6722465964234905,9.132807438784116,0.3902797828713611,18.4879635861482,18.152083470124033,5.896648105300688,10.120209759979112,8.261404310068826,19.311892542136558,16.400795539217942,15.172451287783971,17.664294524277906,18.106847811962385,8.503030054128677,18.862331735422394,15.017996172531278,7.723400961323326,12.070927473689448,4.8542786607184585,1.4500112936176102,16.206730959680826,1.1576637801791279,17.151029152048064,0.8900270876410499,12.525862683890958,10.169828674542455,18.099209009091073,18.333002414809915,8.169780851421052,18.696735349548653,15.368044899100077,5.581262546000461,1.5056025048084631,12.535545827467086,15.423839349194338,16.36081479121558,6.587767070109014,14.83114272430683,4.455444543223854,0.06946854314852757,6.625631375070529,16.27587125935201,5.993054662151556,1.9886374001701945,19.02713927143229,11.465142547519429,4.9508066377038285,4.389197618831928,15.494649971245815,16.754555701581616,5.663913132837868,11.232059844893048,3.280534115073195,9.059927828497084,13.329437576858382,10.30603545117228,0.2966132866045035,16.473231681674253,17.8969425483238,2.7242151490639532,9.081017906045634,4.780789166674042,8.195180709086326,5.001948539751018,15.797028401381104,6.087051314512624,14.139145183561359,11.197516041955339,8.242099042884226,6.077246940647094,9.217059355707047,2.853899717990891,13.980363771663313,1.1078018229050457,4.793508752911166,18.783262910520108,13.805814745716084,8.062674339946575,15.121952879818759,12.865994632831876,19.227589887317016,17.716587397274775,7.556979451910424,6.873612071297028,11.476275120533263,5.263382048110219,16.616009303239498,7.4615862376930275,14.280524782618755,6.924844292901771,4.812435305634457,14.63081185831589,2.268990733203995,6.050856835023768,8.278168745973545,2.194117499503232,9.679672112873913,7.320985813090113,12.71358846456495,11.087187901415906,7.0486094669560995,0.5806612476661899,15.345770421547629,14.448427581786403,14.498088112155237,0.3913501595985247,9.580980368468639,6.095935351660828,19.127876590486395,3.1049630891304236,18.16627328227304,12.465667966206091,15.794253390762364,16.964577650900452,19.473195810557264,14.027929818453488,19.61746041013445,4.660571194101579,14.456244931674993,15.472352489657801,1.4349037423719535,12.520065543108888,18.063203536642106,6.693142403515915,17.506993522515838,12.464318368120107,17.799976735058838,18.011415919129217,1.6845161649806473,17.83154943402166,2.413194497355602,4.136263716254613,5.606406867656095,16.78114212136212,0.48545597313738753,17.43861676689077,13.496986219011845,6.421433145486644,13.943685512459542,0.7075321722227734,8.30849385801403,0.6300038461723734,3.1319404404860274,6.092153840469159,3.8152593112600552,8.669948217646084,9.730183319759348,11.56167655825033,12.013144635417179,9.620732268636147,11.29291811119213,0.4292382270965911,13.116982070386861,18.298726987448774,8.843330908554394,6.115377446335013,6.643438724824846,4.205147442402626,5.978410162107943,9.289722824667503,2.5173832563198273,4.753012436637172,16.53241593431194,6.2484383308928,18.596724331565326,1.3968896285474575,5.800450057445801,7.119825649652154,7.525410487515463,3.1893512482229047,10.020069816274031,9.735790078482133,1.1436313865799663,4.198718139385003,10.755585032034949,2.531094901918709,7.615430178131812,7.258133034517131,1.147238031967297,10.112279902409703,14.643543981309621,8.852901291932156,8.573200096263083,13.934788733242222,19.986284769972077,4.53709991552921,14.83075652226594,8.97894237935665,16.43749806056104,5.826449790100554,5.2623817059716504,0.06911208621004583,11.71326590362256,19.857414898242748,13.906959999286057,6.171902207035127,9.72980677791465,5.842975524649527,2.005342903099656,11.33224652670064,11.260549202713065,18.50302255832004,9.996805299781272,16.103309082520916,9.810107726370415,13.169968766611596,17.38215464525957,16.1628599321666,3.140624477197833,4.712636207378016,7.7839728144260345,15.61850834761386,2.8042493441218763,10.785997259823347,9.068012921933736,14.809393161544001,2.1887483971259236,4.505787923551772,19.752007821708748,0.34558860687118553,14.385266597463083,12.23671951433805,18.448439573778735,11.056889288466017,16.109297624120863,11.47042472208891,13.355029111921244,12.3676796427198,7.168507136795572,1.8520284530632525,2.930085298476355,7.596319408379966,16.470925032391037,17.449862048376,5.9252549638145435,18.329803723710818,9.403438243076954,4.496131675814303,9.09940735407076,12.569892436167285,3.571196629579747,11.182172265459807,3.324054122936708,13.12209435299566,5.699191658018425,14.91358256186452,13.302092600947159,9.857601022222045,10.602327020569163,17.87553945991327,14.398127754985364,10.288044064937637,2.1060118496427904,2.6133659381945984,6.361439522074197,15.190501427160994,3.0901162344312993,8.010093983736816,12.479444591749772,12.03004873490154,16.764183761646272,8.224787277391549,15.890484579592004,6.198389432476961,1.3343109194897407,8.441374972404066,5.231568918227119,2.105652262661768,14.305825715168353,5.656479945828337,2.3053059495421735,10.78983695736072,10.988263507855901,6.817546617887369,0.9270995393720893,2.8489996210167767,12.551896290704336,9.951303310182208,2.5838043643149877,17.28885433293275,17.19400746249232,2.3367187283412205,11.123592549426657,2.871569474155562,2.9658358856838873,11.791095302516803,0.933586252588694,16.788245196850113,13.454628617748972,17.367497920203213,6.650931657466974,4.193441681433683,15.437498676401123,8.78656170183531,14.218914893438956,1.1643824143031045,17.366642897012486,3.6039159044999325,9.52930085830097,11.162957708753796,5.731730750430324,14.976246810399854,16.18590594293427,14.391706482154255,1.0451221740182604,17.288607998882117,15.395831106224062,17.566178225034633,14.123846654793017,16.02473192526034,11.739380763423068,1.325397051866295,15.947798640170854,14.082959454471702,2.7455675427175796,14.53542960138687,14.248613108434775,11.489929610974627,13.166183334153367,9.944418228522224,8.780111663166155,6.154254022976748,2.8654687228303377,6.532743038943796,0.5968017513314372,11.205889120608523,0.06476250857780919,9.251963209865952,16.618152394096242,14.058987723019104,8.146583775429521,12.566598264074083,9.113886489973563,3.7771923604630953,1.5815361844905462,8.427273162464854,10.08870615499525,4.419455144488351,9.596346243757065,7.587124126452909,9.074393279337913,5.725218401571621,19.51887959775195,12.107011970658533,10.902158139558393,0.715701618654081,4.0803986886824095,14.403997605414688,6.780619746343151,9.665822350827526,6.62954574471204,14.568781884525261,16.651669219543123,16.105904509013264,2.787866955253828,11.012420246792175,1.6886021974171461,8.915329508151132,15.66440733979341,16.021646981600806,16.471935822823657,11.687303163961658,11.111749473980463,11.205458632934286,0.36906533881297054,4.779609910884415,11.93001595296117,11.520038629545585,5.1670805772021655,18.263368350969223,9.263330991763912,13.447480998548361,18.044045286855095,14.699063536240384,16.67221303471098,2.045057967238111,15.610648607882474,13.89474190442137,1.880691014380873,8.457234390326542,15.98695870354003,8.073003450786223,18.171259831834536,5.03161811875386,18.81548270817347,17.424159003219227,2.0675770833332363,16.39440926038942,11.31903272984724,11.715331691433445,8.522583895191413,0.32389546943897063,10.01790242366897,6.134105614470675,19.8770152907357,13.172923055839178,9.703148349360262,5.249798585926038,18.582775150271516,8.13522439817081,13.3804714730822,13.983633387577363,3.5747213303845404,6.97022447586511,6.61949007142328,8.596280785405481,2.9758525691465376,8.20930672283032,15.41340237075353,6.173580956317215,1.4351149791744655,9.542314645856585,17.633219668725122,6.270358445169988,7.579065615438871,3.321013186995465,9.553525646471716,13.825959547250957,3.013869807638767,18.406849224889665,15.363097714037423,2.357032432232349,10.398526120110727,11.699347373288571,9.826433335030554,0.29003645341959317,10.481136585048532,12.189717294736294,2.7619748331912763,12.30394339081235,3.0581036230347447,10.054165674985187,6.620103170972249,8.052060427764957,15.94240959318235,11.25526348149998,13.223870952386383,17.849051643409556,1.58519854052527,7.122130005783491,6.840900692606193,11.94955128855959,3.4568057999119395,5.253269126696467,4.1926663989170665,14.543060541146243,2.897784092754998,14.521348980885737,0.14148817729137786,2.197913015079749,8.322291884473536,3.7484720141039096,16.10980342343971,13.716108552681368,1.119827921501475,1.5493023677185258,11.170985561777286,9.591273886377941,2.677545336232594,4.153804692691754,15.092271077685222,16.33414182113052,11.021949139114543,4.67809208179327,9.90651798034329,5.867986052049425,6.404749153725975,19.30143344292112,7.939695413651187,9.420148092823148,17.140012350589522,11.101870525041724,7.472554987536717,2.6177856769734342,18.697068820684812,16.025532156496027,12.486776709163685,12.16464228860334,4.730605808778998,1.1127601832283762,6.672728873995877,9.169015223647232,9.475523545035326,14.618117153443585,13.62866061523512,16.60582587016725,15.038320430539196,16.130130198429686,1.2214022263207935,9.273761402742862,18.56676768253561,8.885571534116039,1.1949021462697074,19.53908310897471,18.95708262857385,1.5774117853406588,4.801741227313396,15.778841257812442,11.098128961148323,0.26346543323419347,12.448761895114618,9.391634652694702,1.2907164913253366,15.727354488162174,6.978103444567467,15.552269777061593,17.72460716037005,12.760403830669329,2.824558912730364,11.261643315223665,2.265923844646811,10.937047492118905,2.8220210374907717,8.429588746464036,13.254449496299703,19.15609488769094,2.748701329472194,18.62608477406117,5.849172085639367,8.062942311584088,5.532082569464323,1.5950993273969605,15.448176781481099,12.882294534381696,1.4116486064893552,1.7046474307244264,7.596474646863789,18.176359027345065,5.056955325640904,11.659465604846,7.675044904627835,4.707035472321657,8.272051125128662,17.88661107115319,18.0601084747121,12.938876988603386,17.87231968974574,10.281176937779502,10.490523670038932,19.699888970612108,1.1477935605223077,4.2513235898314905,1.3137969774312275,14.106795283209813,10.357147554098054,10.79405785433174,9.53987779083219,0.26416673227972254,14.007007668531571,12.216023711176888,19.75604808740676,14.128427913606,5.465591414472812,11.074884266291708,10.013664122176928,10.79279253930006,12.745304940865378,11.813557065179001,13.737016321147863,0.44830409097298407,12.492497452491769,2.1708782478259536]}
},{}],93:[function(require,module,exports){
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

var largeGamma = require( './fixtures/julia/large_gamma.json' );
var negativeMedian = require( './fixtures/julia/negative_median.json' );
var positiveMedian = require( './fixtures/julia/positive_median.json' );


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

tape( 'if provided a valid `x0` and `gamma`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a valid `x0` and `gamma`, the function returns a function which returns `-Infinity` when provided `-infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a nonpositive `gamma`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 0.0 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 0.0, -1.0 );
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

	logcdf = factory( NaN, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given `x0` and `gamma` (large gamma)', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var gamma;
	var tol;
	var x0;
	var i;
	var x;
	var y;

	expected = largeGamma.expected;
	x = largeGamma.x;
	x0 = largeGamma.x0;
	gamma = largeGamma.gamma;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( x0[i], gamma[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 7.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given `x0` and `gamma` (`x0 < 0`)', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var gamma;
	var tol;
	var x0;
	var i;
	var x;
	var y;

	expected = negativeMedian.expected;
	x = negativeMedian.x;
	x0 = negativeMedian.x0;
	gamma = negativeMedian.gamma;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( x0[i], gamma[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 7.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given `x0` and `gamma` (`x0 > 0`)', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var gamma;
	var tol;
	var x0;
	var i;
	var x;
	var y;

	expected = positiveMedian.expected;
	x = positiveMedian.x;
	x0 = positiveMedian.x0;
	gamma = positiveMedian.gamma;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( x0[i], gamma[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 7.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cauchy/logcdf/test/test.factory.js")
},{"./../lib/factory.js":87,"./fixtures/julia/large_gamma.json":90,"./fixtures/julia/negative_median.json":91,"./fixtures/julia/positive_median.json":92,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":46,"@stdlib/constants/float64/pinf":48,"@stdlib/math/base/assert/is-nan":54,"@stdlib/math/base/special/abs":56,"tape":213}],94:[function(require,module,exports){
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
var cdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `cdf` functions', function test( t ) {
	t.equal( typeof cdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cauchy/logcdf/test/test.js")
},{"./../lib":88,"tape":213}],95:[function(require,module,exports){
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

var largeGamma = require( './fixtures/julia/large_gamma.json' );
var negativeMedian = require( './fixtures/julia/negative_median.json' );
var positiveMedian = require( './fixtures/julia/positive_median.json' );


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

tape( 'if provided `+infinity` for `x` and a finite `x0` and `gamma`, the function returns `0`', function test( t ) {
	var y = logcdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `x0` and `gamma`, the function returns `-Infinity`', function test( t ) {
	var y = logcdf( NINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided a nonpositive `gamma`, the function always returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, 0.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logcdf for `x` given `x0` and `gamma` (large `gamma`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var tol;
	var x0;
	var x;
	var y;
	var i;

	expected = largeGamma.expected;
	x = largeGamma.x;
	x0 = largeGamma.x0;
	gamma = largeGamma.gamma;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 7.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given `x0` and `gamma` (`x0 < 0`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var tol;
	var x0;
	var x;
	var y;
	var i;

	expected = negativeMedian.expected;
	x = negativeMedian.x;
	x0 = negativeMedian.x0;
	gamma = negativeMedian.gamma;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 7.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given `x0` and `gamma` (`x0 > 0`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var tol;
	var x0;
	var x;
	var y;
	var i;

	expected = positiveMedian.expected;
	x = positiveMedian.x;
	x0 = positiveMedian.x0;
	gamma = positiveMedian.gamma;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0:'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 7.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cauchy/logcdf/test/test.logcdf.js")
},{"./../lib":88,"./fixtures/julia/large_gamma.json":90,"./fixtures/julia/negative_median.json":91,"./fixtures/julia/positive_median.json":92,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":46,"@stdlib/constants/float64/pinf":48,"@stdlib/math/base/assert/is-nan":54,"@stdlib/math/base/special/abs":56,"tape":213}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":96}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":103}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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

},{"./define_property.js":101}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":100,"./has_define_property_support.js":102,"./polyfill.js":104}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":106,"./polyfill.js":107,"@stdlib/assert/has-tostringtag-support":20}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":108}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":108,"./tostringtag.js":109,"@stdlib/assert/has-own-property":16}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){

},{}],112:[function(require,module,exports){
arguments[4][111][0].apply(exports,arguments)
},{"dup":111}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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
},{"_process":205}],115:[function(require,module,exports){
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

},{"events":113,"inherits":200,"readable-stream/lib/_stream_duplex.js":117,"readable-stream/lib/_stream_passthrough.js":118,"readable-stream/lib/_stream_readable.js":119,"readable-stream/lib/_stream_transform.js":120,"readable-stream/lib/_stream_writable.js":121,"readable-stream/lib/internal/streams/end-of-stream.js":125,"readable-stream/lib/internal/streams/pipeline.js":127}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
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
},{"./_stream_readable":119,"./_stream_writable":121,"_process":205,"inherits":200}],118:[function(require,module,exports){
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
},{"./_stream_transform":120,"inherits":200}],119:[function(require,module,exports){
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
},{"../errors":116,"./_stream_duplex":117,"./internal/streams/async_iterator":122,"./internal/streams/buffer_list":123,"./internal/streams/destroy":124,"./internal/streams/from":126,"./internal/streams/state":128,"./internal/streams/stream":129,"_process":205,"buffer":130,"events":113,"inherits":200,"string_decoder/":212,"util":111}],120:[function(require,module,exports){
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
},{"../errors":116,"./_stream_duplex":117,"inherits":200}],121:[function(require,module,exports){
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
},{"../errors":116,"./_stream_duplex":117,"./internal/streams/destroy":124,"./internal/streams/state":128,"./internal/streams/stream":129,"_process":205,"buffer":130,"inherits":200,"util-deprecate":221}],122:[function(require,module,exports){
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
},{"./end-of-stream":125,"_process":205}],123:[function(require,module,exports){
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
},{"buffer":130,"util":111}],124:[function(require,module,exports){
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
},{"_process":205}],125:[function(require,module,exports){
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
},{"../../../errors":116}],126:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],127:[function(require,module,exports){
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
},{"../../../errors":116,"./end-of-stream":125}],128:[function(require,module,exports){
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
},{"../../../errors":116}],129:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":113}],130:[function(require,module,exports){
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
},{"base64-js":110,"buffer":130,"ieee754":199}],131:[function(require,module,exports){
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

},{"./":132,"get-intrinsic":195}],132:[function(require,module,exports){
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

},{"function-bind":194,"get-intrinsic":195}],133:[function(require,module,exports){
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

},{"./lib/is_arguments.js":134,"./lib/keys.js":135}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],136:[function(require,module,exports){
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

},{"object-keys":203}],137:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],138:[function(require,module,exports){
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

},{"./ToNumber":168,"./ToPrimitive":170,"./Type":175}],139:[function(require,module,exports){
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

},{"../helpers/isFinite":184,"../helpers/isNaN":185,"../helpers/isPrefixOf":186,"./ToNumber":168,"./ToPrimitive":170,"./Type":175,"get-intrinsic":195}],140:[function(require,module,exports){
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

},{"get-intrinsic":195}],141:[function(require,module,exports){
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

},{"./DayWithinYear":144,"./InLeapYear":148,"./MonthFromTime":158,"get-intrinsic":195}],142:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":190,"./floor":179}],143:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":179}],144:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":142,"./DayFromYear":143,"./YearFromTime":177}],145:[function(require,module,exports){
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

},{"./modulo":180}],146:[function(require,module,exports){
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

},{"../helpers/assertRecord":183,"./IsAccessorDescriptor":149,"./IsDataDescriptor":151,"./Type":175,"get-intrinsic":195}],147:[function(require,module,exports){
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

},{"../helpers/timeConstants":190,"./floor":179,"./modulo":180}],148:[function(require,module,exports){
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

},{"./DaysInYear":145,"./YearFromTime":177,"get-intrinsic":195}],149:[function(require,module,exports){
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

},{"../helpers/assertRecord":183,"./Type":175,"has":198}],150:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":201}],151:[function(require,module,exports){
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

},{"../helpers/assertRecord":183,"./Type":175,"has":198}],152:[function(require,module,exports){
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

},{"../helpers/assertRecord":183,"./IsAccessorDescriptor":149,"./IsDataDescriptor":151,"./Type":175}],153:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":187,"./IsAccessorDescriptor":149,"./IsDataDescriptor":151,"./Type":175}],154:[function(require,module,exports){
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

},{"../helpers/isFinite":184,"../helpers/timeConstants":190}],155:[function(require,module,exports){
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

},{"../helpers/isFinite":184,"./DateFromTime":141,"./Day":142,"./MonthFromTime":158,"./ToInteger":167,"./YearFromTime":177,"./floor":179,"./modulo":180,"get-intrinsic":195}],156:[function(require,module,exports){
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

},{"../helpers/isFinite":184,"../helpers/timeConstants":190,"./ToInteger":167}],157:[function(require,module,exports){
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

},{"../helpers/timeConstants":190,"./floor":179,"./modulo":180}],158:[function(require,module,exports){
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

},{"./DayWithinYear":144,"./InLeapYear":148}],159:[function(require,module,exports){
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

},{"../helpers/isNaN":185}],160:[function(require,module,exports){
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

},{"../helpers/timeConstants":190,"./floor":179,"./modulo":180}],161:[function(require,module,exports){
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

},{"./Type":175}],162:[function(require,module,exports){
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


},{"../helpers/isFinite":184,"./ToNumber":168,"./abs":178,"get-intrinsic":195}],163:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":190,"./DayFromYear":143}],164:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":190,"./modulo":180}],165:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],166:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":168}],167:[function(require,module,exports){
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

},{"../helpers/isFinite":184,"../helpers/isNaN":185,"../helpers/sign":189,"./ToNumber":168,"./abs":178,"./floor":179}],168:[function(require,module,exports){
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

},{"./ToPrimitive":170}],169:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":140,"get-intrinsic":195}],170:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":191}],171:[function(require,module,exports){
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

},{"./IsCallable":150,"./ToBoolean":165,"./Type":175,"get-intrinsic":195,"has":198}],172:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":195}],173:[function(require,module,exports){
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

},{"../helpers/isFinite":184,"../helpers/isNaN":185,"../helpers/sign":189,"./ToNumber":168,"./abs":178,"./floor":179,"./modulo":180}],174:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":168}],175:[function(require,module,exports){
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

},{}],176:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":142,"./modulo":180}],177:[function(require,module,exports){
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

},{"call-bind/callBound":131,"get-intrinsic":195}],178:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":195}],179:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],180:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":188}],181:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":190,"./modulo":180}],182:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":138,"./5/AbstractRelationalComparison":139,"./5/CheckObjectCoercible":140,"./5/DateFromTime":141,"./5/Day":142,"./5/DayFromYear":143,"./5/DayWithinYear":144,"./5/DaysInYear":145,"./5/FromPropertyDescriptor":146,"./5/HourFromTime":147,"./5/InLeapYear":148,"./5/IsAccessorDescriptor":149,"./5/IsCallable":150,"./5/IsDataDescriptor":151,"./5/IsGenericDescriptor":152,"./5/IsPropertyDescriptor":153,"./5/MakeDate":154,"./5/MakeDay":155,"./5/MakeTime":156,"./5/MinFromTime":157,"./5/MonthFromTime":158,"./5/SameValue":159,"./5/SecFromTime":160,"./5/StrictEqualityComparison":161,"./5/TimeClip":162,"./5/TimeFromYear":163,"./5/TimeWithinDay":164,"./5/ToBoolean":165,"./5/ToInt32":166,"./5/ToInteger":167,"./5/ToNumber":168,"./5/ToObject":169,"./5/ToPrimitive":170,"./5/ToPropertyDescriptor":171,"./5/ToString":172,"./5/ToUint16":173,"./5/ToUint32":174,"./5/Type":175,"./5/WeekDay":176,"./5/YearFromTime":177,"./5/abs":178,"./5/floor":179,"./5/modulo":180,"./5/msFromTime":181}],183:[function(require,module,exports){
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

},{"get-intrinsic":195,"has":198}],184:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],185:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],186:[function(require,module,exports){
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

},{"call-bind/callBound":131}],187:[function(require,module,exports){
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

},{"get-intrinsic":195,"has":198}],188:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],189:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{"./helpers/isPrimitive":192,"is-callable":201}],192:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":193}],195:[function(require,module,exports){
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

},{"function-bind":194,"has":198,"has-symbols":196}],196:[function(require,module,exports){
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

},{"./shams":197}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":194}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
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

},{}],201:[function(require,module,exports){
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

},{}],202:[function(require,module,exports){
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

},{"./isArguments":204}],203:[function(require,module,exports){
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

},{"./implementation":202,"./isArguments":204}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
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
},{"_process":205,"through":219,"timers":220}],207:[function(require,module,exports){
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

},{"buffer":130}],208:[function(require,module,exports){
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

},{"es-abstract/es5":182,"function-bind":194}],209:[function(require,module,exports){
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

},{"./implementation":208,"./polyfill":210,"./shim":211,"define-properties":136,"function-bind":194}],210:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":208}],211:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":210,"define-properties":136}],212:[function(require,module,exports){
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
},{"safe-buffer":207}],213:[function(require,module,exports){
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
},{"./lib/default_stream":214,"./lib/results":216,"./lib/test":217,"_process":205,"defined":137,"through":219,"timers":220}],214:[function(require,module,exports){
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
},{"_process":205,"fs":112,"through":219}],215:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":205,"timers":220}],216:[function(require,module,exports){
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
},{"_process":205,"events":113,"function-bind":194,"has":198,"inherits":200,"object-inspect":218,"resumer":206,"through":219,"timers":220}],217:[function(require,module,exports){
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
},{"./next_tick":215,"deep-equal":133,"defined":137,"events":113,"has":198,"inherits":200,"path":114,"string.prototype.trim":209}],218:[function(require,module,exports){
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

},{}],219:[function(require,module,exports){
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
},{"_process":205,"stream":115}],220:[function(require,module,exports){
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
},{"process/browser.js":205,"timers":220}],221:[function(require,module,exports){
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
},{}]},{},[93,94,95]);
