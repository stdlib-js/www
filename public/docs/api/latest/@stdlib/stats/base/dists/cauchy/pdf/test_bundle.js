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

},{"@stdlib/utils/native-class":143}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":143}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":143}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":143}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":87}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_even.js":57}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-integer":60}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":51}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_integer.js":61}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":70}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_odd.js":65}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-even":56}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":67}],67:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var toWords = require( '@stdlib/number/float64/base/to-words' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000>>>0; // asm type annotation

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff|0; // asm type annotation

// High/low words workspace:
var WORDS = [ 0, 0 ];


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

},{"@stdlib/number/float64/base/from-words":91,"@stdlib/number/float64/base/get-high-word":95,"@stdlib/number/float64/base/to-words":106}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":71}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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
		exp === 0 ||
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":47,"@stdlib/constants/float64/max-base2-exponent-subnormal":46,"@stdlib/constants/float64/min-base2-exponent-subnormal":48,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-infinite":58,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/copysign":68,"@stdlib/number/float64/base/exponent":89,"@stdlib/number/float64/base/from-words":91,"@stdlib/number/float64/base/normalize":97,"@stdlib/number/float64/base/to-words":106}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./pow.js":80}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":77,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/number/float64/base/get-high-word":95,"@stdlib/number/float64/base/set-high-word":101,"@stdlib/number/float64/base/set-low-word":103}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":79,"@stdlib/number/float64/base/set-low-word":103}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./log2ax.js":75,"./logx.js":76,"./pow2.js":81,"./x_is_zero.js":82,"./y_is_huge.js":83,"./y_is_infinite.js":84,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-infinite":58,"@stdlib/math/base/assert/is-integer":60,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/assert/is-odd":64,"@stdlib/math/base/special/abs":66,"@stdlib/math/base/special/sqrt":85,"@stdlib/number/float64/base/set-low-word":103,"@stdlib/number/float64/base/to-words":106,"@stdlib/number/uint32/base/to-int32":110}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":78,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ln-two":45,"@stdlib/math/base/special/ldexp":72,"@stdlib/number/float64/base/get-high-word":95,"@stdlib/number/float64/base/set-high-word":101,"@stdlib/number/float64/base/set-low-word":103,"@stdlib/number/uint32/base/to-int32":110}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-odd":64,"@stdlib/math/base/special/copysign":68}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/number/float64/base/get-high-word":95}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/special/abs":66}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":88}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":95}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":93}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":92,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":96}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":94,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":98}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":99}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":52,"@stdlib/math/base/assert/is-infinite":58,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/abs":66}],100:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":94}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":102}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":100,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":105}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":104,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":108}],107:[function(require,module,exports){
arguments[4][92][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":92}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":109}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":107,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var pow = require( '@stdlib/math/base/special/pow' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a Cauchy distribution with location parameter `x0` and scale parameter `gamma`.
*
* @param {number} x0 - location parameter
* @param {PositiveNumber} gamma - scale parameter
* @returns {Function} PDF
*
* @example
* var pdf = factory( 4.0, 2.0 );
*
* var y = pdf( 10.0 );
* // returns ~0.0159
*
* y = pdf( 3.0 );
* // returns ~0.127
*/
function factory( x0, gamma ) {
	var gpi;
	if (
		isnan( gamma ) ||
		isnan( x0 ) ||
		gamma <= 0.0
	) {
		return constantFunction( NaN );
	}
	gpi = gamma * PI;
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a Cauchy distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( 2.3 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return 1.0 / ( gpi * (1.0 + pow( (x-x0)/gamma, 2.0 )) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/pi":50,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/pow":74,"@stdlib/utils/constant-function":135}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Cauchy distribution probability density function (PDF).
*
* @module @stdlib/stats/base/dists/cauchy/pdf
*
* @example
* var pdf = require( '@stdlib/stats/base/dists/cauchy/pdf' );
*
* var y = pdf( 2.0, 0.0, 1.0 );
* // returns ~0.063
*
* @example
* var factory = require( '@stdlib/stats/base/dists/cauchy/pdf' ).factory;
*
* var pdf = factory( 10.0, 2.0 );
*
* var y = pdf( 10.0 );
* // returns ~0.159
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":112,"./pdf.js":114,"@stdlib/utils/define-nonenumerable-read-only-property":136}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var pow = require( '@stdlib/math/base/special/pow' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a Cauchy distribution with location parameter `x0` and scale parameter `gamma` at a value `x`.
*
* @param {number} x - input value
* @param {number} x0 - location parameter
* @param {PositiveNumber} gamma - scale parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 2.0, 1.0, 1.0 );
* // returns ~0.159
*
* @example
* var y = pdf( 4.0, 3.0, 0.1 );
* // returns ~0.0315
*
* @example
* var y = pdf( 4.0, 3.0, 3.0 );
* // returns ~0.095
*
* @example
* var y = pdf( NaN, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 2.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 2.0, 1.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = pdf( 2.0, 1.0, -2.0 );
* // returns NaN
*/
function pdf( x, x0, gamma ) {
	var denom;
	if (
		isnan( x ) ||
		isnan( gamma ) ||
		isnan( x0 ) ||
		gamma <= 0.0
	) {
		return NaN;
	}
	denom = PI * gamma * ( 1.0 + pow( (x-x0)/gamma, 2.0 ) );
	return 1.0 / denom;
}


// EXPORTS //

module.exports = pdf;

},{"@stdlib/constants/float64/pi":50,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/pow":74}],115:[function(require,module,exports){
module.exports={"expected":[0.019835777881982486,0.09810258312827248,0.035442060865771625,0.19462012370610487,0.007317517697526805,0.014674500666357917,0.31686893899859825,0.0228749900707712,0.014939849980586214,0.13387227481200242,0.007624779583674127,0.008677162074312123,0.05144483524382996,0.009344850401993092,0.015944844261267254,0.012128242239952354,0.0084169773500862,0.019057467200977063,0.049705010482539745,0.008776625241509267,0.01848366470437055,0.00701023774619223,0.008728476877461169,0.015298170278548543,0.008450041810581616,0.019616766326055166,0.006739065739034887,0.0076926159675552355,0.02377851590883934,0.014178593902771625,0.032164768324971275,0.030438390024833804,0.046894035153506285,0.008249448353774617,0.0072710711153086685,0.008360179777483575,0.014724367846935494,0.007606535395933203,0.008968593956802936,0.012978013808946106,0.009941658999608815,0.007789052769578586,0.05290331600906694,0.007896509419861681,0.008248672658869322,0.022616038871504613,0.021772463928325627,0.02225574271830846,0.012999863926100697,0.007960892760143721,0.12559355162941874,0.012890737088163892,0.04086171246206288,0.007879651705588353,0.0070993888595250005,0.008977880783502737,0.008298177887044842,0.011800986207588826,0.07089383478578117,0.16447682646601897,0.011579571992105707,0.006775173630452009,0.006779706839536465,0.007651458300407563,0.007312211514731787,0.007863025782547819,0.010751385791971926,0.017943874351857986,0.011440428484302996,0.007490418831494378,0.00658752948784615,0.07142740164800684,0.1962025539373312,0.02212212668222668,0.019774416249407022,0.006571306015400917,0.012648673026969495,0.010148188362695508,0.0839689891252806,0.008710148447340043,0.06469636966196506,0.013845804522953347,0.02998119652703737,0.011969778783772695,0.007029081446061152,0.007991914913668026,0.029092043294469908,0.017685514676290044,0.04367057836606666,0.01486537464670036,0.10341824310660173,0.012210492455398517,0.0079651658712044,0.011045597495116927,0.015478202601933241,0.013760032582915053,0.015044791274376,0.006916082887098359,0.020438245780988396,0.18925090843709688,0.02009292150388356,0.036105118645196284,0.006549993052104315,0.05104816946548216,0.008474597283712151,0.008618942348808719,0.011223086030209944,0.019395495967481274,0.010181922445921721,0.007937560196433241,0.022669138940103015,0.01883407016003709,0.006573405860243535,0.007134922844387654,0.029756036120708602,0.02529169759611123,0.01786648047285039,0.023934523082691988,0.09440785584889999,0.014541439356874944,0.011352321114266213,0.020216013153916017,0.009134363623589548,0.006384479310554103,0.007555340527341545,0.011491528760678075,0.01929912385365169,0.007637650821090618,0.009151460236524609,0.009411257021262387,0.007434405693666245,0.10939315107034976,0.008647613639138609,0.00787355160135815,0.007673934701461567,0.007379101744241104,0.23944765205549107,0.030078446191703193,0.006407254789964891,0.02075047045056196,0.047812566690123286,0.010108076604121958,0.008206964338252475,0.008670224849010068,0.014524889749854707,0.018138669873849822,0.007898656216556815,0.013684278569545927,0.07548445127224344,0.010672412917595644,0.2816985080003896,0.04237706460763681,0.02663016247911469,0.013343840900186397,0.006403940719732527,0.008468082474260598,0.011696607860160307,0.04431480024186209,0.011330265312544975,0.00901267850630542,0.007236573435748419,0.29934640449975664,0.009849385261362637,0.030062023335786024,0.1004138137024518,0.06166958214338301,0.013134774065689747,0.007888074802470977,0.013187933120080176,0.010608621882399515,0.010485691507854562,0.02566090121317583,0.006402464117244656,0.018451547633170223,0.009086419387540668,0.019972387080730108,0.011209728164268414,0.0077088985924731995,0.012307349989165363,0.013887263820520728,0.007072106437756126,0.010553008422005685,0.013347920604348106,0.006969927059840892,0.04352654863002435,0.006581091155443175,0.007412639687862183,0.021968724362666142,0.026859374838860434,0.059681264661736226,0.013589015807013383,0.011031173305383184,0.007018922111457948,0.007207485389578787,0.15116072180901627,0.013014764102912114,0.010795039661048157,0.006814463578397287,0.010312426297147032,0.014823366037283552,0.007577577269635489,0.23656732764912294,0.010651200668264128,0.027802414364406298,0.089004785663308,0.012156887859733572,0.012122080331806447,0.008389793533612357,0.017477661052129972,0.013157519403144862,0.00791141597596955,0.00798890289704478,0.010055510229597194,0.06788274382779755,0.055241211402676696,0.006674784057456157,0.06585120343903206,0.008088183838696139,0.010499197249103896,0.007148492063502685,0.014101875893004526,0.01600856816281722,0.01398154308432233,0.00791974274928631,0.00759382012662083,2.8768491925773607,0.006816003234329506,0.010072123031082243,0.038601986501027225,0.014188501894111697,0.14793646535679628,0.14499782314224977,0.009236019521337438,0.027974082454634976,0.013382765305196784,0.03153455461932023,0.009021428651064808,0.0196114414862257,0.011901385656020495,0.016249752545537934,0.015786875523878873,0.025109574942326716,0.012599317664320117,0.010044093794818888,0.007130130021547001,0.01575777969143226,0.006735638778073507,0.00713063450452402,0.03401683326478673,0.01983788871447486,0.008494978566567701,0.010251911289637676,0.020205358195753153,0.013695171259097397,0.011186333447898163,0.009818685513966752,0.006721578509920266,0.019807284778567417,0.01441210702766733,0.013205125888980084,0.014423277794128834,0.03963888405964923,0.08798892906442908,0.007022299310242574,0.023224609600750165,0.007532972099258934,0.0268038966202211,0.01836795093271126,0.009148637819253302,0.008464038545709377,0.015252294726053207,0.007017794139945927,0.006707639266898562,0.012143324853008272,0.013733349770689634,0.0549283427558367,0.010778026376513811,0.007414292415643785,0.5166388167711079,0.0718658902517042,0.028996679658218717,0.008877386475576307,0.008152891254806043,0.006429429659734397,0.02100637253643864,0.006985601377193188,0.008399137604764751,0.34970664240975197,0.010064716518648936,0.007060084102615017,0.007843892075602113,0.012268013197334683,0.034668677929680515,0.009679897608269022,0.032867597602605866,0.01187869981607105,0.01551591392897933,0.018566606807419048,0.06572619037034329,0.017988099361406027,0.009584331527511621,0.009702930363297207,0.008840315941111013,0.012224800943861903,0.007080486933464713,0.011406545427805804,0.009720756591451527,0.01265832302050007,0.21128367718209737,0.006899769710905228,0.010949389603457878,0.008723667576603476,0.008907498446392596,0.07382869653210718,0.06372754420523857,0.011814006599918533,0.006540344389686633,0.059083144916961254,0.007221399629822174,0.06337117662166541,0.019704643470007104,0.00977621335428551,0.011945862332995608,0.01025030198001196,0.008483443887775928,0.011251916431478586,0.006648329879166419,0.013510461441327374,0.0077052530847420385,0.1235457082510668,0.04081641099672884,0.00886046123542478,0.03175088938885673,0.007773368507079611,0.019794440913981297,0.017597792486349222,0.011229248844380564,0.006988651163178707,0.07457942174625783,0.009238127340271051,0.009329936967386794,0.012038692188229535,0.006834598641571791,0.008720511256081838,0.011578859540888947,0.06063773477970332,0.007659647912251117,0.010954599323395384,0.029468836953045936,0.010890400482733655,0.008517997564171842,0.007090415036780096,0.012707188952509272,0.009093061522953395,0.023559989855786483,0.008630039079476496,0.011947613998446792,0.007966029385236151,0.10224509314718218,0.008197165612748795,0.009849305338798579,0.014331850077909275,0.008826586107306775,0.012354004422931678,0.024620713811165054,0.009965841300906277,0.0070370847753273,0.12400128222237394,0.006417359571579893,0.008171726184591218,0.007984619789504587,0.019390923563128003,0.026079767955057554,0.00693749108178105,0.012207641574607488,0.09728563120579949,0.010943646338683468,0.007860335241051786,0.009431505411280492,0.02985542030573699,0.02760421756901359,0.02000926530090159,0.010844893811939626,0.009847212197354772,0.015674251650513792,0.024466840914274996,0.03910553042885375,0.009170159450942477,0.09103597717897821,0.01595064692873355,0.10265730031849177,0.013553595027879398,0.006896493127126213,0.036755153564478546,0.0327997698538562,0.01121266214329126,0.00696292849768377,0.006603432555270576,0.015604010428726047,0.016566536930732133,0.009567449706227485,0.010746357518392083,0.025840864552185563,0.02814004743013716,0.11729870932624333,0.010279481186209378,0.015050675633645124,0.008454185065681527,0.3230742363804022,0.047473508004463406,0.021749509269564864,0.019597419434710363,0.009626674223170893,0.007416977413387832,0.10270601821935715,0.058202521369517576,0.02404038537906506,0.018020856517025216,0.013136592583206744,0.022809063641718124,0.02073506301362868,0.022373624245301236,0.019006533955270632,0.011718529764330163,0.0326978614782276,0.03650922258943667,0.01602184789884593,0.01836389357455646,0.006960473346281438,0.0075212256887037315,0.010231657875684587,0.7074436126155679,0.008811376481892522,0.012729349308604086,0.006897708730451719,0.006570566497374556,0.027204268721977672,0.05122266138890019,0.008623853791224555,0.012651540250541701,0.2549045703408836,0.011541150061033291,0.03506444812541104,0.02586365296709603,0.03334439343104014,0.03236201130931859,0.012835556320733337,0.027355780353037328,0.00766533811857671,0.04515812080115396,0.010885077759105263,0.02151329578537438,0.03334213685888257,0.028426106719503602,0.12144398031655121,0.06809391240599619,0.010399788645238297,0.013294802148416393,0.013393559299435606,0.015623174697714685,0.00828130941117054,0.1089337974220444,0.007868888941719795,0.042646548871266565,0.006795987325189065,0.00766837915796517,0.032188625273779185,0.012494612761259538,0.007363118813294168,0.03642549196476702,0.0073269451422470055,0.034717971654192305,0.14299036020622766,0.01073150881873342,0.01187655901697729,0.01044033678206367,0.006888529931941274,0.019406870465902403,0.29248552435669706,0.03808120711676593,0.007115339430245843,0.03150634071779422,0.013991265246600612,0.009011398688767111,0.032908109584152315,0.008308222807923255,0.006377604041301661,0.058300462302277235,0.008628231989041911,0.074045964301122,0.013662827841010214,0.022800185962478323,0.017448247031626028,0.016729512229065102,0.014152693229190452,0.00974178713959393,0.006946121466254676,0.010469659530093657,0.014461435876890813,0.013058836670714119,0.016753200151613953,0.008086304641530475,0.01738242842158053,0.01139657308344446,0.15923291013617974,0.026844867735707184,0.03946045672317648,0.1990125942241398,0.016999612961858437,0.006900106815419012,0.01687204318516494,0.01757603440663406,0.014338159006379468,0.006432033502682179,0.0785369933238066,0.012875994478548716,0.011880515730935456,0.011772411227739983,0.007911930700830405,0.046740590497893024,0.008785063902125086,0.007188295225176328,0.014326124336206593,0.010523715306651098,0.025299946000601106,0.019499898816334443,0.014602601893476265,0.007068319911090559,0.07153749843110963,0.02222776470254427,0.012141463634604926,0.18667042750116464,0.007428748783974952,0.03342286099297165,0.007940198345582213,0.009438716773817258,0.0073625223209764145,0.015269537076141457,0.02219387671041653,0.008490976010984579,0.03881261577730321,0.006671349115751774,0.00720097097589435,0.015395908908559795,0.03214697835598227,0.36167235276197834,0.023564870288724876,0.23134419039936313,0.01648068608203791,0.01990711191662677,0.012948081445176918,0.007227799508587658,0.33692549422365076,0.03203731600678899,0.007721636649863205,0.00936923649406359,0.015783168755885764,0.0187051040693505,0.011985942715910618,0.011967606290492759,0.03481286283438484,0.06910878905040294,0.02731258939226991,0.006786863834967468,0.021059238219486767,0.006594411632800908,0.010247151085204128,0.011868507759690873,0.013804174270314204,0.007209025430638045,0.021687237106626043,0.03206744354924584,0.009161725712135648,0.040200342577319206,0.027225065999092003,0.007277311433841536,0.007297559998268287,0.018407818292332116,0.01784108744205651,0.030638329782985654,0.011151464398932907,0.026627266035321215,0.026416845157594963,0.0074511119384564,0.013646899642451629,0.00942367360109738,0.03584870165754587,0.007568847105168803,0.05814922359751508,0.011499562790014397,0.00860359198532171,0.12317847157798849,0.03713260087444313,0.055660870056242435,0.03597371322393752,0.036774347331162145,0.03339705030918146,0.013149595374206997,0.02303800525962109,0.13006824326911012,0.008431117426674005,0.021383767752772176,0.016835750627584793,0.008596895768251638,0.010350934479855382,0.00713362333847129,0.013398408023734605,0.008944225410934405,0.09906706826876564,0.13579339046425612,0.06533859688475485,0.20242967981618767,0.010757840180725937,0.00717061650841175,0.02479656158987919,0.018008155866800126,0.017630706748867003,0.029886475222651695,0.0074263987142782015,0.010156905817042566,0.023126014784259658,0.013825501336502285,0.006943596566113583,0.007969325713168015,0.015192354539621195,0.010936662252220853,0.41884844518508924,0.02268733690852977,0.037130641711512695,0.12067998122281862,0.019281198459725382,0.046578587763570364,0.01074037370175417,0.2506022370583064,0.009816312325424957,0.0799970492301049,0.008839227702620436,0.014137470207047333,0.012073528140019356,0.008410304959147026,0.016476828174755237,0.007073587790856148,0.31487466541615633,0.10402865016455091,0.007438717604194379,0.017082681132418266,0.006579004733063559,0.01340800789998032,0.016670246057294225,0.010567100629064016,0.007726314891464745,0.021593954778510817,0.022412904865849542,0.006862671399504655,0.03813240277318699,0.008044386471224197,0.046047676969794865,0.0074567103442400385,0.008649665282361961,0.0078103711326590625,0.01245635958916088,0.009785713779167548,0.009944868781305112,0.05134978167591136,0.018704460172323002,0.018547144317931818,0.00913900627384539,0.008456014616170054,0.009849946049627327,0.014890964475254093,0.007784030189292072,0.11814206369307463,0.016295392516904903,1.6770541812501536,0.012848032088682767,0.031032238282389622,0.018304577641545933,0.02600395411324094,0.0073966805018214265,0.007094009195064843,0.015186761360708945,0.0086097870759912,0.009871292674308378,0.0452324102152508,0.07429100487064244,0.014378126423299584,0.012286612402768408,0.02172003437055672,0.007312849727776511,0.07663217450769429,0.012089494765925567,0.00787549592457266,0.009976731731193159,0.010358386896336766,0.07480443301304508,0.5605961318541778,0.020660911983849124,0.023611677355329975,0.008313427017162521,0.013460928813353253,0.013718331326037086,0.008012213330447264,0.015570270882996047,0.0071539275748934966,0.007135289148198712,0.009931201080983674,0.009156299249401742,0.020414433057149694,0.25949213338519633,0.012249000397452765,0.049615350545651485,0.02049969956825803,0.017407060433034673,0.0068413126380186505,0.008084455425346271,0.00642321516731562,0.030395348904857154,0.016963281331583053,0.017507882147260727,0.1462103963039079,0.060180723015970196,0.04161473203914123,0.006760546786805447,0.011803420076670007,0.0066882046869703084,0.008187166861047647,0.025794332969267125,0.023998337673736662,0.011660096491646753,0.006899357097564015,0.00796439863664487,0.015720374478425937,0.08923160274466897,0.007481652019457371,0.006893970391534705,0.025632794807729075,0.03542704193819496,0.10421563467196264,0.02802084705868586,0.008916577676243154,0.03378957337533393,0.019130392314479355,0.04085034368432155,0.01433707000321905,0.10200068435712775,0.011084219512991489,0.013939814835452641,0.007968293170912666,0.006647698571063775,0.01897403177100751,0.009213842229748623,0.009552453810703002,0.016393432707945244,0.02088708974647143,0.008499552136605375,0.009078601437824048,0.013849040110520584,0.010559494980741843,0.028143809295424732,0.06150561191006816,0.007697505138061444,0.04875965552663034,0.013111875301785305,0.010509765251940716,0.023390005233045554,0.009017160312556173,0.025971279164200126,0.0200912688698569,0.014809382765718903,0.012369626301263339,0.009860286335603383,0.009760067008424337,0.00962244283248834,0.009411528593409643,0.007183749137896217,0.010210685871154113,0.007640359419814325,0.025231049815048878,0.028128865245543578,0.0456273316903435,0.010783647663269134,0.007637158028219968,0.013916580249417207,0.0068737266277344045,0.008284506863537667,0.01735346714068495,0.014404497458552492,0.028759714439765275,0.011650263301584576,0.006828085563181463,0.007483506314523798,0.030449535189760103,0.01064605822720395,0.012754804010331888,0.008769675807611312,0.02026766453082829,0.01224816365039999,0.030524100508140153,0.012357842748856917,0.12138257357458329,0.13045062031913593,0.044483135524514494,0.022340523495224907,0.006941395302261685,0.007431175463089673,0.015045539446420605,0.009876411322350984,0.0066915321688961905,0.010087317417419616,0.09407454306820229,0.007509133099748493,0.008946128298666395,0.016158300734140228,0.04300436215057074,0.010410927794756518,0.008079176402510463,0.011144091656084579,0.019300869714697827,0.01405396710494577,0.0064078933583955715,0.012444006296213238,0.11370110647286805,0.047792684630847876,0.03368941366521615,0.00720651117899727,0.008667096119827869,0.007898523330125072,0.009183124949919371,0.017340208050801293,0.008104601170896463,0.024545199696143608,0.012246968708791788,0.011785661189074273,0.10292995969097112,0.007050227901668352,0.05119198255422927,0.011763776975992842,0.02714431065004354,0.03145793817609581,0.007648415865261324,0.021966073943257825,0.00795782201098839,0.009587583109006514,0.008238071175141628,0.022213345072979698,0.007450808819758172,0.03544573150331432,0.010915812007232283,0.011819609822203626,0.006878111453327518,0.013561144558348838,0.06884115045542478,0.007792984786928127,0.011997811810938347,0.07586880614811216,0.01949443900372525,0.010355651065761287,0.007432153075954638,0.01567099032944662,0.007692506466644624,0.0866365318264708,0.010794259925867026,0.010905567119827929,0.013896566280549711,0.007294016087205955,0.010679990526837867,0.04890409225420312,0.00792578647387819,0.008122952114371572,0.05407871714444339,0.008743904038743576,0.006818599212142377,0.02210917227237413,0.04099824039502022,0.007253042152394901,0.01642287256158039,0.029603980895509766,0.016099341252135656,0.031066835285856048,0.008539021460824942,0.561765203909671,0.013431209383077153,0.02656351293651064,0.027100636445964964,0.01799096558225009,0.13216943710771428,0.012147124414290222,0.007770302544911554,0.00792302491816004,0.01147194797463169,0.011675469272000527,0.08792949134690246,0.009902072443780892,0.00700750350118851,0.006814935393589856,0.012765277154780406,0.006609312562090378,0.010367334325814366,0.0068196000079326306,0.06227208109140185,0.029018706725863545,0.26809269206625913,0.013973326171011402,0.0708630927124636,0.016445819807315975,0.008576279552112478,0.008586499389881194,0.017474729319744302,0.025982566416477858,0.006537686518054096,0.006855462364889376,0.01242163412275173,0.013952474061932882,0.0238205578882008,0.038436429158181136,0.03141089291228333,0.010797251189559006,0.02401177768084019,0.2821735925218515,0.008714880696645786,0.03104523445052293,0.009468260403233498,0.0090480818566478,0.056434905055101965,0.03727722634724251,0.026956160103030504,0.007619434775251608,0.009040338986523858,0.013213338776477311,0.047129380407289485,0.13766489291110062,0.012942155075683524,0.015077373532387806,0.06341714368440282,0.007521943476235312,0.02101935353841119,0.017129608830591565,0.00951578886757991,0.009550886487597329,0.05806677700150843,0.007527049832201022,0.009579810835874869,0.012929555990513176,0.04719942607965935,0.018093245864095976,0.0072357438200531575,0.00810719630141493,0.017906705875659828,0.010257491220687457,0.007343135197446157,0.00641007297717135,0.009123471655963519,0.016095344524145672,0.052945851891520464,0.013196292648020141,0.007530986506787621,0.006615810642531296,0.015705456813988043,0.010052812770566055,0.010078176742885175,0.05729143889965427,0.00930046961605561,0.12117104498454574,0.011216523827713886,0.012933502732586553,0.00875639601630415,0.015453016032264797,0.010712275510648689,0.008161890938333503,0.011320332041459226,0.02020704434071605,0.006836099488675067,0.007951771867450252,0.07043246679991547,0.008006218919521144,0.021764681156902315,0.04345699153091599,0.012167601163381645,0.0077778043835867745,0.006596277581126328,0.020220040011601808,0.07306292908243868,0.38754053200246646,0.16450343439686116,0.01213215293427905,0.04622460681936697,0.06649244977989226,0.022062103441853963,0.006499667101934498,0.047650467300883306,0.00906777435768277,0.01909115790000532,0.008269518056383733,0.006435681390873447,0.009721904669759656,0.010794824708062572,0.008468996177106237,0.0788452008336612,0.5951657572431592,0.00774996373667176],"x0":[0.6329512182978616,0.32789458074548206,0.2873824377512628,0.735669270288521,0.4651773431495636,0.005454060392856119,0.45845316364809174,0.7234986838336501,0.1353420911418901,0.05827520600554137,0.9772523694920054,0.8642769865525795,0.8429593590806908,0.39189902290720324,0.3418718249758794,0.3763734002314434,0.17624605840847551,0.1024283083423505,0.45557627381980503,0.32298742999639707,0.15382308197849492,0.49720900550819724,0.20035754648087845,0.7344629352245411,0.3573259851036563,0.49940951361940145,0.7842194990059057,0.8448821710024392,0.22881624413707002,0.38875011020493755,0.25518303333976955,0.6180978464874509,0.8797209619905735,0.050001290206975524,0.08741047323372042,0.9018442785745668,0.9895048743415831,0.5332463845031692,0.2863520708019145,0.5183442174738035,0.5691170274928123,0.003361548121946223,0.457870443661466,0.9430859563783733,0.08170746863894762,0.5999648294839433,0.4076076886952449,0.6178661800599188,0.6454021605165294,0.2767881518703259,0.423062000368728,0.6031956004386014,0.3377538138037752,0.8772745447859007,0.04112720662050795,0.33033530564958435,0.6251696257717123,0.6497698379886765,0.3577003953304787,0.42141565678227133,0.6069982133563858,0.7625919231348695,0.15198430690897746,0.4308201441867523,0.03783216592074612,0.9396280171945428,0.9948425531383847,0.5296645031405749,0.7503333848114466,0.061701689625793366,0.2921856990079206,0.7715466258365709,0.6325021726020308,0.403858098362722,0.5557204110343916,0.13156943145874855,0.887593920706141,0.42946543901832634,0.7114411469171609,0.960609692224955,0.7395785761372813,0.22117797587158083,0.8323043661010463,0.7837311777747258,0.4312581392958823,0.9556392565294833,0.13814358818116768,0.08008411741970622,0.898128840945851,0.6566696841384168,0.2621360799389578,0.45635394322227074,0.25056118941377004,0.9034341542271593,0.9486750595413693,0.6987668916791854,0.7589749640349135,0.706465041843074,0.44366206506723627,0.4400061900241694,0.632753309993032,0.3099633098533239,0.9567988765826048,0.4445116283735069,0.2814783140893309,0.9678728881960419,0.5232686297233999,0.9785293483178361,0.25839415141023037,0.4089035851335212,0.12595679664312542,0.10471083333088349,0.40715590860610495,0.11760664836913004,0.7459408525198841,0.3109655726942939,0.042059206462223386,0.008107841182648734,0.4354440289158841,0.7556255199638406,0.7554757153611895,0.6891274880655645,0.6202551655030943,0.9252970784091525,0.10196118983907909,0.4857718719237909,0.055320072246380025,0.7716704086401447,0.07573027988135084,0.1707948816142013,0.14402574090508313,0.3478571822804972,0.9190248954614286,0.9536342076133666,0.16339313848783532,0.49521588160007957,0.45743362746285743,0.3739632247724649,0.5952230390793349,0.1008200253100815,0.7052430322619749,0.9388640544321827,0.9085020119250886,0.07657419962339884,0.7955121838362722,0.5963931873865433,0.11978026424881372,0.5219507898046762,0.846432900213905,0.27877832484337217,0.8459041346485057,0.36074514715931727,0.2546732157926921,0.07170523805323481,0.7211365423751055,0.9860036298043635,0.07845035639821263,0.388660820945282,0.7469996304966524,0.03345628590242011,0.3060056097261863,0.950224967352497,0.950355564637861,0.05445348669671746,0.02828853840771295,0.25634733585373604,0.8205881447552827,0.6237611457807584,0.34284440263065963,0.7593785039084637,0.08201785384055782,0.11494560022805644,0.2071716093953071,0.3065180037873778,0.1313707084916207,0.9070205621334593,0.32959893925629724,0.009332921104667324,0.48195226386184054,0.5644290051669354,0.06135118428600528,0.728365365797335,0.17863305440909283,0.6368452252303296,0.7041689135575719,0.41857890760453587,0.11892547580841129,0.5834502570789344,0.4901037414044702,0.5189614200308059,0.23669392377872978,0.9900541874374587,0.7002903737521362,0.5561101642892736,0.8390946160131947,0.8511288177360918,0.8257787164116936,0.8305132108572377,0.877845651641022,0.26012239566419715,0.9288057037029165,0.6148816879434742,0.5340840566738732,0.9933190984794429,0.03981927380521211,0.28484014162293336,0.8213010512590537,0.0004884128649884634,0.9368428434020035,0.9364769291843948,0.5210846695001616,0.9935413298148428,0.3002137777691609,0.013465834375267383,0.685458359714143,0.508171714687458,0.3062121550923227,0.8420892604885726,0.6288788082876384,0.10944614209544068,0.4479747319829366,0.6362348004274878,0.03025455653222009,0.1029955185712974,0.2633817161130736,0.33327854784409516,0.20640185708723235,0.8616419855010624,0.239445813937035,0.7076005077380201,0.602083023034357,0.10213920440730972,0.8950651103932079,0.4643703769681302,0.5580754116600666,0.32651435590907396,0.7929096645764686,0.41661677028980115,0.23582915878190835,0.43045653788220517,0.4976295727376816,0.9116331146351111,0.3142364461054301,0.027439456780060656,0.06794037656533325,0.3845081857415482,0.34554567816816073,0.9166396023295871,0.2185071139943897,0.9064049011144284,0.5587100737794872,0.9092077991712773,0.07144095573291653,0.2402963348112619,0.41563312250332607,0.4436584644022228,0.36911893548840413,0.5376588260422523,0.7945085291782983,0.7988925498359767,0.36451707476775774,0.21533502947323768,0.37489635615574346,0.13453113218684987,0.6934579678787134,0.05978954310098894,0.49591994331240774,0.666074576109873,0.8609074249990936,0.5329543366906,0.7453921001149408,0.48018755779082456,0.8920314212304967,0.4828773682136698,0.5055040700428661,0.811433663769715,0.2795213232295055,0.46810022967476894,0.20821387457906515,0.9831615628142591,0.7033376157011737,0.6820842242667551,0.4628789626948948,0.2741749577410708,0.9858939701711458,0.2125991256246622,0.27719887778723806,0.9572043841206335,0.5995129603321774,0.8796026116680611,0.959039207070105,0.11931978086048134,0.23929155881405562,0.4583702749017906,0.9468817745593066,0.6225050595327026,0.08456600050022711,0.09811614946887315,0.10796119522720593,0.11984006049138962,0.7652228574472484,0.3939215654310333,0.7470295918922409,0.08712142603445527,0.9499360581068705,0.9495210168763877,0.5234707488250983,0.414757066362029,0.23723485707520076,0.5312826376231439,0.7329522925465668,0.1052143069495215,0.40555559247258577,0.24687493732769705,0.9824853679904995,0.6438679778014522,0.41493346498221895,0.615778904326153,0.10491427707181367,0.3526561737841145,0.3946841131902714,0.3873625484209755,0.7289436578848789,0.38828496093176845,0.5479865605596774,0.5324378962778771,0.45907295961116046,0.9560667857181584,0.25662181821492536,0.4913502477396545,0.6258875100496075,0.8364727140981452,0.33596728511348384,0.36876795842964816,0.18197099092630098,0.6139257741374151,0.6876835879877947,0.020084166839479556,0.3315615791485842,0.907279645738893,0.6786252555615815,0.13786610598420435,0.8065732183899752,0.44797340691115206,0.4079085699494014,0.5491490599221021,0.3662533167392603,0.6943004007416014,0.6629241801921879,0.05766440258572225,0.7587837362227352,0.30998291612599793,0.7509292689015212,0.7825867194006264,0.4959056396913146,0.8691765427421545,0.2758923195217178,0.6636419194690526,0.4942730632885446,0.9405924051493679,0.1995343265524545,0.02703049650492595,0.6887242131415612,0.17474069898130917,0.8031502643675288,0.797247753294084,0.7700361585731004,0.9426784510574082,0.05624700149995299,0.27258966022147124,0.5238830485453196,0.7895285129994714,0.0033923357403891075,0.5225829407739404,0.9964028957211983,0.7129185653326067,0.18041088193770127,0.6198159752561763,0.36349864042842595,0.8728008160170586,0.4072783073354904,0.7199582928011121,0.6828003661374544,0.20538749432916692,0.051420746811288165,0.6168337612298014,0.7932771279843165,0.9072506893826862,0.5541228563717748,0.6584540824905618,0.0671824838138615,0.21386659728251423,0.2417648208984884,0.8100319862391894,0.24259046710249876,0.5690599655327682,0.13961571697101838,0.036912615846326435,0.6002311051802594,0.9206660103986597,0.45943985518404284,0.29478432915673536,0.03574370373553348,0.7496822258048861,0.8102918574207787,0.9435186107709967,0.057883922958510636,0.4700921281923336,0.29321918331306795,0.45838295822786046,0.8253290055809321,0.2744149912190692,0.33081850231404397,0.8058926300423546,0.45535948565024653,0.022775778588893125,0.9789913466016102,0.5507473828161613,0.8050877662223845,0.2795083663184992,0.4879237251070181,0.9257298569181631,0.9057481772423706,0.5596095383231894,0.4505175163674622,0.6848695347837537,0.1239238262335649,0.5474965427677105,0.3751330186476951,0.692161983437201,0.1523675793622863,0.8153871150828953,0.45717666168116633,0.9158868934057476,0.9839306026481152,0.30097011545905694,0.37566216874715064,0.6205866082786111,0.3749876693594154,0.3743111622594917,0.4925871482203681,0.575593581694618,0.7242909357343115,0.5333574472933122,0.16381052472981228,0.3960149030793336,0.0017080954362251877,0.9874222629228471,0.9994340091593708,0.9774728508015615,0.1744334453002534,0.0349639320384314,0.6134813582579282,0.31435133002664717,0.7064615463432677,0.5082412405603676,0.8440886159147956,0.5780153208143963,0.8913282095010835,0.469834670000965,0.21220323291569554,0.38589688139117784,0.031858815458430945,0.416384551743455,0.7649245046418767,0.8070980579634808,0.5790615035219155,0.07278945341537324,0.09892548116588462,0.731722445995054,0.9158074439742121,0.792477343255956,0.9242924053946493,0.4616076838128351,0.7070577495393031,0.30050724803278905,0.2354269319532447,0.07550453706473781,0.5722427683066,0.00053285858733787,0.2992121747641814,0.5350863501094458,0.40724864662501536,0.5924373486756236,0.509532410695599,0.9424294114214342,0.055056481740540786,0.07141826778875537,0.8543317935330534,0.6003288348542408,0.17158260423856464,0.7908701904807147,0.34671231772354627,0.3768898197647932,0.7799805958351984,0.6580471382430715,0.7775962621105468,0.2571191201771237,0.5907231312991748,0.6887053896473299,0.8025686519513189,0.25753538246520424,0.5544437105461018,0.6394312273726821,0.2946856961228461,0.061442032841497074,0.7349566990846523,0.6987339123659262,0.864076207838739,0.9102818308345384,0.19810250614126046,0.655655465700776,0.14705118007326812,0.2387662258378529,0.6419668818781432,0.41537747350861665,0.002865890628283907,0.15085965560295,0.6912940724518597,0.6784875071487761,0.20221916172515653,0.9241906561308681,0.44001156181032974,0.9296473263160523,0.22456823232068168,0.04211287936919894,0.9374557796859131,0.9845555029832396,0.6810622081856628,0.32537211045617864,0.7780091234063047,0.840807668998764,0.6479353175455145,0.12834095532387502,0.029675388961667215,0.8108614585828937,0.09425115448110977,0.4136855889267643,0.43673403762919105,0.5369875019795649,0.7465494069231298,0.7149820970098084,0.49689830299157656,0.9992498171893556,0.677586980647404,0.4357474110844972,0.34298928922946614,0.1760262725211046,0.9786647086624003,0.03906065592469754,0.8233410941284525,0.22488076845764104,0.5244614379896322,0.6674823243412518,0.7422037045593197,0.2781100678437556,0.08862333924370258,0.2925275707181896,0.42310457279845437,0.2500342435357805,0.6836349122009442,0.0932502296026636,0.1639223439807722,0.2830182827356389,0.9744756745185033,0.7044812927802189,0.816307777794562,0.012083274431897717,0.9423201350484129,0.5640281594138024,0.5933329527686542,0.25296705547171605,0.6222487926926312,0.42605991165307633,0.777341849450226,0.6726734805184043,0.17212128900875157,0.8035037621929693,0.8095989053333126,0.3264450226300284,0.9514699635005901,0.1252762239936014,0.1433463159959234,0.6705039016236103,0.5282474224490661,0.7226292718677956,0.6777320068954011,0.24284615090702166,0.7966076555587274,0.009217353845452081,0.48753995242764403,0.08834348394878222,0.18934918501407938,0.5620053322062681,0.010939937749114392,0.35677767898788604,0.02626685688014052,0.5664184881744025,0.8653822515925995,0.6068994376209595,0.5277359169821236,0.8677162344025213,0.2761720142923385,0.7846175247706995,0.8643054910514094,0.941768349273125,0.7406277047972571,0.27599828599799503,0.0534122285098364,0.7906254300585125,0.46589659202371325,0.6443006334899626,0.6871120364494894,0.668797755281898,0.09767032767356976,0.682960753157078,0.9661045811702322,0.3559223987660316,0.1425172362042355,0.5484331847921711,0.43852541151597113,0.5965644315503844,0.9843023940504769,0.8870115623536077,0.5449465507617755,0.22317996899717452,0.27638641673232933,0.7500847337632763,0.7591766211945203,0.674239460880778,0.24473426379649665,0.60114727679176,0.5154497834022458,0.25107256487361296,0.621068090629803,0.044093495745898714,0.20380720301829647,0.49485122302098206,0.5170183807007982,0.32196036337479694,0.10846826195086035,0.8607782070342014,0.5738410253957751,0.1858621060460648,0.12161668785992807,0.6920053972927076,0.6440244565227853,0.7602141856403517,0.7621308584763689,0.8559030792486384,0.9352977350820342,0.15683641898222334,0.875737819329901,0.8647137493462276,0.033568166507061514,0.6400594836661788,0.4517391251659184,0.31038877946193466,0.653687280473479,0.4261245387615329,0.7670694686417909,0.31840668287421336,0.23693201232621064,0.34113679855960166,0.39571674734750784,0.8053058731811091,0.7721798314725132,0.15628160925573842,0.7714306157682929,0.613855020449039,0.2312888110424547,0.9526751478204658,0.5744759043168892,0.9996341847196719,0.09157924225587588,0.5270492798021882,0.4092291795575642,0.597239194362801,0.22942532213577405,0.3037682059905602,0.45646823738223286,0.06996289719291826,0.24761482712378569,0.14730949780330116,0.7009750447072991,0.6965130408805826,0.49802659152159734,0.7029341463192771,0.682234715413123,0.0652028549483119,0.5879921025917811,0.17744579287052287,0.40739818598690314,0.8106833628056864,0.7300765263834397,0.3834992005988951,0.6173605624355689,0.7362225547523304,0.11467896463494576,0.8994206347770832,0.09284680278981439,0.19812014303531522,0.6419708709979366,0.4176688923130316,0.27753193343570515,0.05012141092807165,0.45342143956615466,0.5777396953467073,0.56670113024278,0.5893000343655186,0.5004636210126259,0.1047072712530599,0.8398810600341187,0.42593850980050174,0.7945150986236174,0.0624519496533642,0.12448658249474231,0.623572403396585,0.6842534716029482,0.2867869778850556,0.9540871830275239,0.6133586297873956,0.17150547345422784,0.1936314974062452,0.9396043614254042,0.6932545932865097,0.19231288802693935,0.7236525973781514,0.9435879711829891,0.19798431982769382,0.8375417621635597,0.41044230779336943,0.507411054364711,0.08966345560594391,0.2722852064768895,0.7556156736031376,0.40340755500967385,0.9871232039971831,0.5025558071688532,0.8346684950574319,0.1276061159623587,0.8079744611929063,0.7489134636048822,0.10018003645554696,0.2656774256563643,0.8868787253621715,0.9240138228937367,0.09507275224779121,0.6049193922619571,0.11165167632528927,0.9052609709147543,0.6178663233930861,0.9611046987576506,0.7681960496935338,0.9851161569851905,0.70338810667033,0.22929543536513197,0.6610451056221252,0.12774520711421888,0.5034036445352168,0.2807399725399964,0.029460663744408144,0.022612428752607494,0.039608092763688374,0.8535675349846661,0.6916711430970843,0.7632142892507026,0.740744579188469,0.4464680384689861,0.00625475070342163,0.2861185272709794,0.1085567351444432,0.46250715868620373,0.6361211954819797,0.7821310067781084,0.9465291152756996,0.7091722139933494,0.7594253827314197,0.17260355643300196,0.0720313991015209,0.6464784068821658,0.0007934598717478369,0.2809314981827864,0.8045413225994409,0.49424309530677113,0.04797215211125416,0.8508663542621155,0.17315682723459092,0.16415412114762562,0.11537148909420081,0.059168875362205275,0.6304193862931937,0.08354425510284358,0.908416876022879,0.04060317207268982,0.7805452639733474,0.36097578827677057,0.41152223741608074,0.7758572828916248,0.35368960375812275,0.5947326198409957,0.3469140584741002,0.13630143627538582,0.2560404512784016,0.3412649744015521,0.7325821559433228,0.766864905128193,0.30155535885748974,0.6071584980627995,0.7624234629807434,0.07303848139985036,0.05047034572839815,0.26811499669549366,0.6019261258899558,0.0829558675059594,0.2998066500414398,0.6860104167533716,0.9597513418016954,0.9033774292602568,0.38581594226880744,0.6887717758832601,0.17349346397059318,0.18759174549091928,0.8407293347035292,0.11179433423972007,0.41173405431067955,0.5210596281752793,0.8115593061503135,0.24335897551409058,0.14847837008113718,0.6962820317619631,0.7218474763968841,0.5295977100593572,0.23188578944400784,0.9598965871341558,0.09744832916265911,0.44507883121597236,0.3086935906287609,0.5678757089843463,0.35149492961065865,0.08112228397799104,0.024328322555754678,0.8192054185510755,0.14925307571994795,0.3936621715804196,0.8202245332281151,0.7427517245810178,0.42871348100285567,0.7540520238275432,0.6670498913641667,0.4622097311453117,0.15103332256074364,0.11184409273430052,0.73044148651387,0.3124435054459358,0.34168299875915453,0.07893606438419565,0.41508525576226263,0.990463478111365,0.14687011060634636,0.019794001270377448,0.07966958513005595,0.3931736118734235,0.7362558759426008,0.8917004735089733,0.630704942273518,0.6261679484027027,0.3596843381378674,0.3237577619630929,0.15970835787297988,0.9651889071515856,0.5125753273450766,0.27190809032844765,0.2275179428541223,0.6795832429390853,0.6652241872287132,0.9799014332840803,0.26188194961134315,0.06885873486081628,0.39205096471871004,0.5406338885032955,0.25888150879348903,0.32489144368043643,0.17469968857495521,0.05899143316497746,0.06929706568910343,0.6720651345486868,0.11802334380606339,0.38591889694004866,0.1435692279373173,0.4770971573318912,0.3254133873449583,0.7740537356380344,0.9661809865575106,0.5936701497052035,0.09991010127919653,0.5259174422646407,0.8363013996321254,0.8534370074969675,0.016482516845170103,0.8641620601730708,0.7087426870668065,0.6231474719232071,0.7689854618558487,0.012941640313792524,0.18374584543912542,0.6782519247750165,0.6307072789423589,0.5013603258804329,0.6914674494436286,0.5781932120812481,0.41894393511599204,0.2566116811879977,0.5155612123303752,0.9698143687810445,0.17488268433987098,0.49802937889742727,0.025103836621687137,0.5980424705435319,0.017206172079928583,0.1935704053574161,0.2004505780206789,0.37318951218910157,0.6545967698062878,0.9890843778352085,0.8116586494265892,0.6767977919419603,0.655403018461697,0.8265379758056659,0.6044261074039645,0.3691599188467831,0.9335820275198943,0.6818412980520447,0.5620373638075968,0.618740408823784,0.7431350719330976,0.6538419831599083,0.5326439476384968,0.43572196773518046,0.45707791646118956,0.8046351798488796,0.2772215387990673,0.0680864145196991,0.6474307120354252,0.715205652547408,0.8381035676800628,0.9425873441149699,0.03957230135332512,0.4602017812176227,0.6539342566797708,0.5507831450223277,0.07577636917106179,0.3405744545619782,0.3473562816130915,0.8887137782917736,0.4777877889301736,0.19032017139859447,0.23220816748972317,0.8281324854601881,0.5964102326775105,0.7665802594057094,0.9751515142770832,0.5480679388394953,0.1598442344608495,0.3090654641194541,0.5199387636753849,0.6963408919843792,0.7601089818568731,0.28971696390330726,0.02881493825152437,0.38031582259207264,0.33650821046705826,0.4698121204439456,0.07072097049323944,0.43850876065370215,0.5591073688464419,0.05371668389888251,0.5233200883662221,0.5590865681630095,0.7457390978274445,0.053350459148431284,0.5257498823701277,0.9038462937754641,0.7196062331141531,0.32713679620075786,0.4036632520039032,0.35578060935469935,0.6886061654805007,0.1442959955358969,0.8167539886563313,0.950193973033757,0.8307688287327719,0.052275074905447694,0.5438189914991887,0.2281410393002128,0.8251345835952621,0.8878843817378179,0.8990594068720852,0.09343150771788267,0.7551594824158003],"x":[1.678291663631144,1.0780356471853985,0.5315688709187372,1.4170049751775502,0.3665168522536426,1.6925762899435672,0.538090132881107,1.0142896538360269,0.5288528148707159,1.2081949738855693,1.6351641032786182,0.1006988406161935,1.1085669885311953,1.315981214929296,0.4763328949143908,1.0981845141139188,1.860552824972991,1.2408435816332393,1.3887616004058674,0.2021682491849215,0.5711828633231311,1.870935071409606,0.21241082394282307,1.5706545286067741,0.24983079463468183,1.1065540862925656,1.5646630826314953,0.9060427381075593,0.4336359914146093,0.49306226001859876,0.30660864831743107,0.8271100642938598,1.1584465554438323,0.5343199563854486,1.117224215239132,1.4138471640998085,1.1041220822874296,0.9108203646083344,1.8551605836249103,1.5239121147245553,0.26754743278640714,1.4695355549928006,0.47180253161443186,0.6213043734685408,1.1283305469964287,0.5862645750454631,1.2017505800744557,0.8109837248501455,1.4181075141981814,1.809901799173196,1.2808254745701646,0.6237070491391554,0.30093112763279173,1.1649564348995183,1.9404761989314534,1.6446696674472365,0.8032008794655163,0.9541794685436353,1.9821820852106087,0.6912645296002915,0.07312536860905317,0.6134926314662792,0.4138237420478377,0.28632960822679054,1.7652072694373735,0.5328684719689738,1.7788499496930679,1.6969887461395343,0.46991078149218923,1.4988317430732847,0.8996611990334782,1.9303484799620394,0.765512823557803,1.6933693501532985,1.7699024023078738,1.2687667193595242,0.37704784538537917,1.4220210774610456,1.2161822952859698,1.2441120705983417,0.3556650375921282,0.5170576065761683,1.3622541637975294,0.4247642253070949,1.7837626549089913,1.9689486401173868,1.0389204361706592,1.6415746917251464,0.738364946587299,0.7009378574796608,0.6610034698844638,1.7082152688909442,1.7430228351607138,0.7100101432550963,0.5764020117063922,0.49421096704491374,1.1797491712409265,0.0667670160007825,1.4466574590984749,0.7290562134693168,1.4709930389793229,0.8353208735121798,1.9985297404562061,0.04425641537816283,0.9799712926173862,1.753975367597897,1.3639139642847837,0.6473869791250704,1.0305407722512494,0.6549251732511916,0.9883660410175139,0.9792376472078819,1.6559377226667595,1.6522328237176067,1.7358550360516127,0.27960384667381044,0.9176871908140587,1.5304725793473484,1.7002319843789944,0.34472869531743777,0.8431566135059065,0.8929927961579498,0.7208023631882168,1.2365637399266478,1.5552738191378697,0.8068612762093186,1.4483847490952546,0.7894669232701901,1.3648053142405234,0.28017772981616496,1.0164165113732966,1.1441106937469443,1.6351342136111482,0.15651001813120446,1.0396010386795687,1.38561658944356,0.39749164624250444,0.2610801778094225,1.3595113576935418,0.5017630707388143,1.4590775983319362,0.10464596464358333,0.05837153626477454,1.791495721541592,1.9663195198173256,1.0885328149662938,0.4656393377597956,0.23300168303077085,0.024909078121114092,0.3506625168393205,0.7925349955555419,1.911190214735759,1.7414508660985288,0.03846450816269975,0.05154594912571708,1.6101176982992813,0.632709315061716,0.0952133125647765,0.36374157300101917,1.0487447355496369,1.6293019171877718,0.5271922491877907,1.6260183908568195,1.4937045826039386,0.6359067717498372,1.7972979297946106,0.24376365887216567,0.011934918845299514,0.7774258730508943,1.362670753487894,0.7867283987918623,1.2760640756592307,1.567473863311824,1.4359989579252943,1.3637530297986609,0.8987135186752995,0.6479395381420465,1.5770573438264157,1.8259586106890708,0.32698278712227724,0.5033529602552798,1.42551325818691,1.8232846187380867,0.06461917816449958,0.568326049151413,0.08509573608010346,1.6736264533830356,0.5814075150332094,1.866528833551154,0.5979218309476146,1.2871838263497613,1.5008336896216359,0.03081693642447325,0.29145306288417716,0.11547708648715371,0.654290958586234,1.4820651196615007,1.0258835812894191,0.3922148432220305,0.8712763447291509,1.0235093069382857,1.2289248460114428,0.2244097861392902,1.285253078015991,0.227908194439415,0.7506092190541116,1.2464236157891269,1.1619008397176223,1.92479539534559,1.6020776375019357,1.5475446256506884,0.04220958824926413,0.39416673098768573,1.6612389976758783,0.8943982715040817,0.5500321897712883,0.29684665295025914,1.8920390238630507,1.9955576382796005,0.8084705026267165,0.7076666130781568,0.9971318649351955,1.1021925425762582,0.2429276042407844,1.9276670532287468,0.3188010726240358,1.4632748929597281,1.2285786981553564,0.5653813282309481,1.529329819467924,1.0250322723824405,0.9904476425114126,0.21363923605367008,1.7309659759914573,0.8349745637318846,1.6687638221456917,0.9248047902657293,1.3128642697153143,0.7939993747192258,1.360192595598606,1.1419696671635178,1.2440982508717067,0.22043552777685926,1.7446381064938916,1.8484670624217165,1.9554838603107871,1.1878077722582927,1.4247738617128447,1.2284097875252842,1.6470716655567106,0.11560452710447322,1.1157519537940157,1.5714679069512427,0.5116161590330655,0.08266700902183155,1.9698628016695352,1.4018303374128416,0.054853693128739334,1.2975527859039162,1.4238305116077474,1.8236546952103279,1.2981553741282008,1.172293060060626,1.3007069772657576,1.983129102096456,0.8425748478561768,0.6637943398448254,1.8760408033610751,1.0670372822837102,1.6374500168364263,1.9820590435871641,0.15443051688431453,0.8100372023915856,1.4297628472195623,1.7890237361909085,0.1775082867361677,0.8133511653697663,1.9672384604869615,0.126121078723068,1.9600493657492972,1.374486598380912,0.1282028202821861,0.6918368738596126,0.5740109710984274,1.3679337526717545,1.7339025637069287,0.1756152686174488,1.291136942136779,1.8012025840620143,0.5242656488169182,0.009067203377659983,1.2903972187236108,0.9657745466010779,1.1726084500884042,1.066270075358025,0.10043835244537291,1.2991076385290228,1.1339456470018447,1.6274949573701547,1.0137053435856234,0.03939449534286732,1.2061745541229612,1.025253199387687,0.3572569351197443,0.25514689273576696,0.03431170252271709,0.9672411259591418,0.8081395072147175,0.21154900328772808,0.6305609971018975,1.9527797546173846,1.3331550194754653,1.0818597934355916,1.8581658137669539,0.7871744954721955,1.0769923557073722,0.8907417725933229,0.701299690724253,0.058055637224575296,0.12163144249966695,1.511409134067803,1.16397251994294,1.8794663818075659,0.3417097469115684,1.1630122785193433,1.706351293922038,0.6573083816170242,1.782851879702982,0.800901227747,1.402285891574242,0.9640940005826821,0.18605150352512956,1.1988814864064157,1.3556639397551096,1.5047598483148983,0.26280908388109125,1.5143708538983738,0.6147619968519451,1.125682747856389,1.8109726086323867,0.9098263292030988,0.6442641851943365,1.5098604207146025,0.6105830059012058,0.6085510376826639,1.156340161026959,0.3278155411914052,0.9573274692864158,1.4073068021477528,0.6927228870839155,1.1968184454836686,1.6848600797363162,1.8097174873687658,0.09531333910085937,0.7113458989445962,1.5215607047082202,1.1068461900007525,1.3610259158632627,1.5650147509839067,1.8190960042041087,1.3517157603635779,1.2120058773786742,0.6525878693012359,1.593459532155133,0.18304912755671188,1.840670178090987,1.4848540612563563,1.5086069710059342,0.22450752155019105,0.22398656767103908,1.9247570172165953,1.2504119878067463,1.9609354203059146,1.0992435930549633,1.1117074087751524,0.07974758655432268,1.023800557310182,1.3195162161289713,0.15097614137933135,1.198316664404421,1.4188230525249454,1.8147750537345377,1.4616637168356839,1.1743323416571116,0.40624179181287845,0.43743084035131563,0.8525751636489654,1.4558376100652883,0.5598653586105904,0.9370499577197391,1.0184342217031142,0.06850352187853925,1.395487397108293,1.3276473013536618,1.4427286396447845,0.7276712013788642,0.7135031105839369,1.7824862102157826,0.9730776780703057,1.8032972958482092,1.70388894697132,1.2186457494257468,0.1807170378751004,1.0146078317298604,1.7593573864237038,0.21912603782802575,1.3640278292626107,0.12523521804491633,0.6314704795776316,0.5066271763673038,1.7848289630597152,1.9554162361511698,0.08425725105053727,0.4440701528469235,0.3424905248911272,0.4925969380242985,1.3930444642242215,1.0181472935986031,1.2698734315351277,1.4861653359829372,1.6614232238038364,1.9790671629457082,0.5474667980482741,0.6016612240281658,0.42554140775426985,0.30355062153775547,1.6224674014262361,1.4854812753771713,0.6513505030882607,1.78351802602665,0.5502159995789762,0.8832022687779877,0.9578530757238726,0.8041290655563227,1.7944821470280399,0.11647061676429082,1.8584098204075943,0.4411510612475591,1.2704786509220112,1.1223631414529422,1.0102467032899227,0.7490084876011811,1.0373228064992421,1.5982575569567796,1.7272545233539716,1.4975280887420777,0.6060683797599076,0.5042117212316608,1.5773015172401386,1.7926435657127677,0.8300437723710212,1.920473662404333,1.8012935090334055,0.09520320777191449,0.5742306665236825,0.3958584533518952,0.623978720380558,0.108356082892342,0.3508198325298273,0.7406492401375724,1.4059864895912315,1.8436411721451385,0.6609176504017227,1.5486723003995024,1.565024486171049,1.1758376271010524,1.1693106535666922,0.41135062704541037,0.35963650510902,0.2644036276827162,1.816976925381525,1.9620290904717228,1.6731631471796544,0.12387552709759886,0.01768214723485162,1.624057167836066,0.8963111777410129,1.9304408349749433,0.7973194514127173,1.1263303848678343,0.020872736827826976,0.11338323545569295,0.035275677169025244,1.9275044071140024,0.8142623633348558,0.6178962756274355,0.5877217565961788,1.482979175017972,1.9246654850417944,0.9336563046471555,1.6283793480997457,0.18741394690986768,1.3348842273090704,1.8913280948285154,1.2135636975336679,1.1240635972348896,1.1793795030972682,0.15020874205467205,0.9317848686923185,0.7862587952818902,1.3038779117707868,0.43767752475474575,1.821180594062902,1.712041951117571,1.0981679423437294,0.166465624782568,1.4156719754883547,0.6725992841381898,0.21976530723511445,1.5844618216388962,1.449764997037688,1.611362404129725,1.9189751483656132,0.2774578810695214,0.13045090406834303,0.912181133962378,1.3748394796097463,0.9184660330413053,1.8622337390068604,1.0408067206540483,1.463389922937456,0.022495964356642695,1.5340973741332644,0.06893525588880012,0.6640113691324219,1.9970089037982075,0.4652908929567219,0.38089044582912157,0.07358789975322555,0.7514303229531785,0.06720814627024341,0.4544094366399789,0.9186828871823196,0.8990119887911647,1.1145575121286733,0.6093247243418873,1.5189161231025734,1.0864242268132087,0.5981237378783058,0.7535617303720503,1.079501083338641,1.4222741637187228,0.2726499643034672,1.4777077785301729,0.8975844677712748,0.7899380040387367,1.4642328860546918,0.854047482355409,0.28958923067295483,1.2066225697716324,1.173044508152338,0.41812410347731,0.052395596235431,1.8419427414510223,1.378294091591159,0.09021391181552518,1.4389641963356437,0.2596992689005173,1.2754698554885286,0.3363958082649394,0.5796343450749593,0.8767430685918876,0.860332114102385,1.1021309200368852,0.7580572353180237,1.2563578563796618,1.0116282590766357,1.7145722449356096,1.2233848118284172,1.3790625241372068,0.4614072719823432,1.9402975103502298,0.9768103007116644,0.8371162797135896,1.9858939629740773,0.7470906874536922,1.410484282362412,0.1139656422358053,1.7434283219979947,1.1047622509337942,1.6642657087430224,0.7817960864147726,1.1095810744414782,0.8519772352585435,1.2359389462717179,1.5566014413810225,1.8073199209826938,0.6117648827590427,1.102268443222524,0.401309634179587,1.9502002816543107,0.7030723990853263,1.9854917100126013,1.2997546655534546,0.17449567671131128,0.8798130392953247,1.1922890752871287,0.12467665596582256,1.24232212785643,1.0470303340323284,1.905732355407344,0.8314244127988504,0.30951808554681115,1.829085287319001,1.9358303868951534,0.06379666347431012,1.7185182753057453,1.8658665785204889,0.3665258448958779,1.9533176234514467,1.1984124976047141,0.3387416884514023,1.85222872705936,0.4070675498496099,1.4028723108457122,0.8505647296853289,1.2990957339571914,0.6251909358200316,1.406264258106121,1.6629024793423075,1.3319357369048128,0.9709417947580294,1.9716802703201535,1.2467545641526323,1.7968345518280855,1.8814703249481322,0.36629037722690594,0.6231041567035613,1.575517848440707,1.3290148649080722,0.9963267440261148,1.583112627742019,0.6112797957470049,0.2888701251458845,0.4350451824214261,0.5706320537941338,1.74266991872774,1.9710175716718834,0.8111062496629944,0.8965584597978049,0.3094115753660307,1.6864483002063069,0.0713904385087436,0.20500928962379117,0.07095466338186274,1.8900808092393073,1.7695028829287773,0.6605496691574775,1.4669311002720957,1.4693793850656949,1.2356923364514207,1.3483459663041089,1.5665259010135082,0.34553427072725595,1.9521472723657096,0.991654689112019,1.4241774995585983,1.0657717674624885,1.170866026581399,0.6496049268115307,0.45557784072270247,0.20591467888919013,1.4474526161809558,1.1933872436732966,1.17914489880476,1.721660476564824,0.27207333478693796,1.531534456625994,1.316224066861389,0.2448860910841586,1.500414301443699,1.7512699811446182,1.7528923195420063,1.0226094553413114,0.12987038888435487,1.5578330575514903,0.7175309407632247,0.928211321847138,0.5956524188508827,0.23401603550745387,1.0971383124050806,0.12171624222259192,1.791504738979611,1.8276440368258706,1.6624297522546696,0.6515701291145475,0.7194315220430272,1.2988437172754295,1.6123902612714378,0.43462127738404144,0.2172571505293135,1.350647171567923,0.9948784385139544,0.6832016017882063,1.8463816821048122,0.09966441480838562,1.1064960518681026,0.5734982171149645,0.9377977994676776,1.7567708988408626,1.3757466783107972,1.25102492327427,0.7756867086021284,0.7231657110470184,1.02610170553936,1.3414199306490713,1.933532949880966,0.08998651392677903,0.0002740623001127318,0.8420398835594871,1.208697104779715,0.1406669344600937,0.06612252092701265,1.8755117161158106,0.9332938915719939,1.4286080309502425,1.448239796899565,1.4000518266749982,0.3191614081935441,1.3728985339828639,1.3914850261438994,0.2927189833101971,0.015382643620795111,0.46802692239903765,1.8501866734901031,0.24880492669572662,0.8335359213017104,1.3383190925823394,1.6081472134291905,1.2717666735928401,0.2678418870012229,0.6801074396429585,0.07686612416260274,1.61996854137193,1.2650816208932798,0.5136616768100484,1.5819323995632573,0.8929963140550643,1.7466568179640305,0.6870220087638037,0.0783091688406432,1.69610586354622,0.7421674506113107,0.7115607887251323,1.7717838009705997,1.0003830269465048,0.09959006950488458,0.8598562656096314,0.0760474369954589,1.3375456356582598,0.874604145319263,0.9811105695793438,1.9802376115460065,0.9626825888964006,0.3744135693224693,0.3792503088967525,0.24735141599578325,1.7275961076570368,1.8828901741995683,0.13291251327734788,1.734269530645828,0.157035780591261,0.25206995083379535,0.8339122640658974,1.9142363835477587,1.7351753491358886,0.5516925063057756,0.3142331528556741,1.2268961407964127,1.536901197679494,1.2605315401707835,1.3596535995784773,1.9397757267211562,1.1320630999692711,1.4471850288709969,1.3096213599524353,1.415283121471632,1.244471197105352,0.20496417240016251,1.127793846382898,1.8062747578993212,0.7918843078696005,1.7319292155130555,0.4459207064587214,0.5028804588980038,1.2011079587332518,0.894608574869959,0.7961140142494614,1.3878262825163619,1.7754450962242214,0.07085111092683194,0.9549851269312208,1.5513481563179559,1.1071804802268663,1.9694860309863103,1.5227219707245494,0.21535130090192434,0.40799578115746993,1.0004942719337384,1.0270312555494878,0.7986672012081169,1.7294535729584557,1.3691428330407103,0.0776767770052964,1.6123559479755083,1.3118670121269718,1.4449108870248288,0.9365133266753305,0.43970347634513374,1.0648574825255883,1.3658307022750762,0.9427863040930728,1.9706506710499347,0.6693467222609009,1.774315307839668,0.9887984775267973,1.1146302027558455,1.9877273175132846,1.5819559651979298,0.7836440253212422,0.38536932382164224,1.2562892796244043,0.7557164176924935,1.952620464125049,0.4041160439043363,0.3322207381715332,1.2007219296014875,1.5074953935388864,1.297514660847411,0.8553788895734908,1.601896572934859,0.811919417264189,0.8641818421403133,1.5215485656026355,0.8547952862455026,1.7365197554747582,0.667588810359049,1.9375463327913405,1.5327922635724778,1.586718975788712,1.9517622050479728,1.8404587375021828,0.1580788630154446,1.0122540263534585,1.273592457951922,0.6597926936620877,0.7785100309487127,1.105233918504529,0.19864604847733336,0.7519528655051522,0.3296783443824052,0.6653158208836771,1.0433040803915667,1.020390757060444,1.611389068796227,0.8366175399543869,0.8935074613676006,0.903584261827981,0.3089312927204029,1.0539691677342855,1.8337569756242553,0.5463756387910084,0.38734900979455134,1.6337398565626926,0.5745943034944467,0.10814627030759505,1.061530954721983,1.0143804045946334,0.9263550157086136,0.4095353537038009,1.7523956427453076,0.8760408174882546,1.6997743996540313,1.6908031489310074,1.2554988781670535,0.7652310674451019,1.7603374299153542,1.0769947547935832,1.955956361202745,0.5196535618194229,0.592969967430776,1.1445735513416229,0.5745952614800323,1.7940349626731922,1.1836260075074914,0.450112246306694,1.043767132055185,1.2098518053213754,1.142344384157056,1.9892933141163578,1.8875343066449446,1.9262920577167773,0.871573576850027,1.1037181416586566,1.1005814003917238,1.2208089667114344,1.181425027343145,1.782492946131394,0.6706602584500048,0.9338464990359485,0.22103412929827027,0.16662335098606507,1.0894238105793108,0.562095789577834,1.801208177058744,1.3123667981208724,1.904262509392216,0.9807827026122311,1.134630500228671,0.9521021424874956,0.7197482862450899,0.2691523626884167,1.621693799043598,0.8892496091646604,0.29796166954604564,1.6747685509991523,0.15648534278323423,0.788169690716428,0.18668442315112932,1.504449753188418,1.8350555799321415,0.7246314962757276,0.19859553161212107,0.09077964460453991,0.2923106865526113,0.8856418989684425,0.07885819114647319,1.4928284736655675,0.18408627503526764,0.3826407191903014,0.43612545554291904,1.3063094244929787,1.9469150835057385,0.31629333183074415,0.499444230257041,0.14839875582397122,0.3699721766958355,1.3471296036465112,0.9910497636374953,0.19093073832486374,1.9267897445140258,0.6111607433436212,0.46198773468682797,0.3219521460503625,0.0919656696671245,0.02043305476325008,1.4574683912215183,1.8991178151290948,0.7543713377685144,1.7974964069458164,1.8315175652007567,0.837458403362846,0.5431531873373956,1.527767798050458,1.0154360190350546,0.48821031556246774,1.5200418412339425,1.7604241869391317,0.1448634220795184,0.2455580185968551,1.3605859593082505,1.2615497157479498,0.15634508380361645,1.3275086913105336,1.9268026311602973,0.06487311597024092,1.2101347331358214,1.1311628043752564,0.8638018518196153,1.5800926100164405,1.420329249417665,0.6648801384558904,1.6343669772249512,1.7964930982875602,1.0240280659214878,1.6553265093554828,0.5833781675053022,0.09658692048982376,0.8352340633018924,1.2727277030178956,1.9494693316986753,0.3604288507576747,1.2954055130233777,0.6344765736197417,1.675867446320367,1.167844778208179,1.0069697966538547,0.5693093542419261,0.5635454921646246,1.2044804891100718,0.05481937079708832,0.815591142294994,1.4719600194094977,1.8620660974465766,0.6609490133739775,1.5013346326398676,0.6963018414734763,1.9576488717644374,0.2837881945961418,0.700365202688022],"gamma":[15.978873723762776,3.0608202517255934,8.974489613939173,1.2700257150935368,43.49948464740818,21.559335168486136,0.9981939330697465,13.909112897821474,21.29882616757628,1.4906258298087116,41.736394627167506,36.66773864636752,6.175979318037273,34.03751053388186,19.96227995513046,26.225477101426364,37.74243597585145,16.62467753697211,6.264979429206274,36.2675111366493,17.211025084323417,45.364833564412145,36.467972119298,20.7733968104317,37.66931587255199,16.203670387106918,47.22063447144037,41.378536523167675,13.38331423362481,22.449547266336257,9.895960924202729,10.45333472536174,6.776389966111607,38.579516550930705,43.75333992929262,38.067640117907075,21.61729055574351,41.843487725418385,35.422134411089765,24.485560342466428,32.01494289037187,40.81364499343583,6.016790695235286,40.307632712555986,38.560817531834466,14.074506432618183,14.576572055030269,14.299762820491434,24.461223174559986,39.925323867034535,2.2000105719634178,24.69289881357357,7.789756093973765,40.394392300865945,44.75563269159621,35.406112016354164,38.358183420987814,26.969723851802375,3.794483961344941,1.8968989998880859,27.478543913730835,46.98133179649682,46.948930574516424,41.60070326009948,43.462621772743134,40.47776959933208,29.58562949907444,17.662043912937964,27.820422045981186,42.446948794770954,48.31243169710272,4.1313816925277695,1.611374083331396,14.2722475644958,16.004944619489525,48.412651936271786,25.155114687300095,31.3347382763571,3.7223614857069043,36.54251480705999,4.889916384673343,22.9858186963951,10.590465244725156,26.587949614723485,45.244274983855604,39.80319155067146,10.866808107300496,17.86183255932413,7.285382910869831,21.41274830175296,3.0253009071796066,26.008298318502742,39.90692827907927,28.81650772456049,20.55830079276644,23.131122183443896,21.149109488011153,46.01569808531064,15.509363311044345,1.6307111468239266,15.797413151049977,8.784780276544579,48.57463979584995,6.209681804404809,37.54747942617806,36.91469219862101,28.33712570016734,16.404851983640434,31.24317507420735,40.10021939764188,13.988382590065552,16.85537458674482,48.391664875179785,44.56008847535842,10.604918179765665,12.585470327615633,17.772897416365886,13.122583718383641,2.8004131079333416,21.88213152994205,28.03891559332723,15.74279326843121,34.84722628475673,49.85488451575567,42.08025605509748,27.695802296799187,16.374977085899324,41.67640490492155,34.73457446604419,33.82189607630431,42.79799827910232,0.23723446415191418,36.7950486318153,40.412015405067336,41.460840948168574,43.11828432391659,1.3266422538384282,10.58145299670893,49.66784399553879,15.329400955551876,6.57097101932661,31.468533600544646,38.76669519150367,36.63270868549632,21.852057986151763,17.53487698169819,40.296277049200825,23.257401511411302,0.16663154389650048,29.825311258993757,1.1274402207695489,7.176401666335908,11.765096328897185,23.85439623210479,49.696292461121075,37.57900478358488,27.202570037080655,7.1709165635618355,28.088542210379895,35.28880113717576,43.94642527627353,0.20961670429806567,32.30360926149647,10.389051343753074,3.0488877325812735,4.6509959160874415,24.22039741960883,40.344026240971196,24.12862257311633,29.99269405725553,30.340226330133323,12.294814600871284,49.6795306699703,17.176851143646733,34.98798011278045,15.93749402210658,28.3922919972846,41.231618962403125,25.793365908817112,22.91853362572579,45.0048636932152,30.146830369681986,23.733181257737623,45.6618701880355,7.3104812003162545,48.365042520147384,42.885140500652064,14.489229078675725,11.688898157365946,5.332328437538846,23.37685133391838,28.846443456739234,45.34036683793179,44.16220603454508,1.817703001061688,24.456015080560856,29.472066326362146,46.71010623534811,30.858991390728775,21.456114587149212,42.00660144780862,0.9476641688812903,29.881673774727023,11.441552821225509,3.566403630290671,26.17521303630802,26.25180031997818,37.90454723745611,18.158633363059508,24.17391489889035,40.20804553189134,39.8212775517905,31.654990635482317,4.012426559414228,5.754595231002114,47.68838035512187,4.833756630618469,39.32689563702816,30.255811147050558,44.5172799182594,22.56917804505385,19.877167374037196,22.715850928939584,40.19146048287222,41.85078032501143,0.10871740615853165,46.66652047996014,31.59879678400792,8.233042374987987,22.404215914540792,2.065040210151392,0.45287743280311155,34.45049002778755,11.235963259609438,23.781836758671947,9.912244520429159,35.2832628292712,16.181183999988157,26.733961761606228,19.544370947016954,20.14233192006879,12.668107615751456,25.26370924917073,31.597928208605175,44.57180132526065,20.077250219590713,47.2425485839601,44.63398543402377,9.247128587328868,16.01129003995262,37.46511709980476,31.047459409565292,15.609589017749148,23.239322708258637,28.45135073607963,32.34677795714831,47.33388741641692,16.055826163267607,22.074820368313386,24.088811919885313,21.972279507333326,7.881476854945257,3.4323640629467467,45.29841951084544,13.583266684864192,42.241044828270944,11.873134326243406,17.244738525798965,34.79192418912665,37.574863325667486,20.79609908705785,45.35520140523048,47.454689083043014,26.178496505693804,23.10657989928816,5.724806040845964,29.52357332363612,42.87951810145512,0.6049772234651751,4.202118607620897,10.936272033703831,35.847702969097064,39.04123446854546,49.50644574305567,15.143377216117237,45.51572128302399,37.89765260957169,0.7643250604869478,31.580587997415922,45.08304835165683,40.558354448171976,25.893363093642428,9.123635982955491,32.868079819249566,9.683138663640644,26.78651914593796,20.442901139303725,17.0814008032005,4.306850051679589,17.650313897767045,33.195614983538846,32.78541822703964,36.0044688365595,26.03523960928872,44.94519112800373,27.875849576441645,32.739366673436955,25.1401364576447,1.5061141316725757,46.13319362955705,29.019741815987466,36.446709616656726,35.72224419112718,3.587838122602216,4.987206842650971,26.936467815012577,48.6640214021106,5.386132676231393,44.078647183951844,5.012295934394273,16.07648321802794,32.54109545265587,26.596266464828254,31.05363829964135,37.511221246952275,28.240595444045724,47.87735191875498,23.531203073339245,41.303591018818395,2.1991199583231924,7.783881137605486,35.91297374282182,9.950394087773716,40.9249721463587,15.971213990583266,18.081239438213824,28.322368803270503,45.53891830661326,4.114807588182567,34.4323872444568,34.115478878128044,26.43086796722568,46.562688204741285,36.500562809851175,27.48914329686345,5.178170586229336,41.55669000812126,29.054809991487907,10.750031597613862,29.214678394738225,37.36396277229582,44.85083754601059,25.004758246234772,34.99230071153489,13.507175906827928,36.872402287563965,26.61618780075067,39.94623727666477,2.6864353606774305,38.811816364791326,32.27687447895599,22.146561459288893,36.06259121036882,25.687369310325046,12.898729006386745,31.905968723337132,45.221904234382826,2.435485051750841,49.60080850609165,38.952527706190864,39.81609020145389,16.402456056000712,11.882760386370883,45.87531637501113,26.0741323043019,3.1444128557502116,29.06179746433436,40.48362048949157,33.74829891839796,10.651764072422697,11.441776136313042,15.832417701026847,29.33044728337152,32.295802785416164,20.301618944864007,13.00737380108159,8.13933448271873,34.70281656488364,3.4965190408236313,19.952033155031945,2.7745705405307852,23.484373738117327,46.12646856567603,8.629230433805867,9.553878962811568,28.38754483677185,45.70773848454682,48.14040606598908,20.3924187003106,19.173395702058414,33.22347398515031,29.591414867310416,12.316375461100948,11.305424762562566,2.3265121673060163,30.94860413266073,21.06823355245012,37.64800247247777,0.8507703208393891,6.704653168608865,14.5720891775854,16.066560152102593,33.06356678167649,42.913338076710275,3.0951170830055275,5.428342239427519,13.227670885746823,17.65103928703875,24.22186147716836,13.850286553114,15.261049848964092,14.148595878033488,16.739724284610922,27.162889004989122,9.734819848111197,8.701906379719315,19.753556841321696,17.28255618157518,45.72940047568528,42.29338249570096,31.105205507295853,0.4394794113402378,36.11793587493987,25.005483027783036,46.13295025733402,48.444113516353426,11.509717008793864,6.209053998849312,36.88866071387066,25.13751260044189,0.973465731990486,27.579340008542943,9.067045292321396,12.214386127486044,9.282808283652722,9.710967283084337,24.784334878331048,11.615826607416102,41.51783370897319,6.9532172919717254,29.228069695289584,14.55164872339736,9.396625829767869,11.193510484926005,2.61435485489675,4.671868459590711,30.605758863286823,23.933214760336654,23.75359301481783,20.370612507420926,38.400032034424555,1.558871641252313,40.44190904531917,7.287991091493751,46.82424484921154,41.506133040884464,9.853536205282431,25.47127030339862,43.22873458025218,8.713594382950651,43.4250368065993,9.016745876717136,0.2895993450751644,29.657396544793357,26.78378086543628,30.430903209942194,46.199227570059186,16.18938374946589,1.039561152365498,8.204229392956819,44.73399569483285,10.085409332433482,22.744531408011003,35.27249537015884,9.663078479310517,38.309883175644444,49.90488975244962,5.066551159330945,36.860590230403965,4.27281148527936,23.20605861071097,13.934712794686233,18.189402651166986,18.905533070243884,22.48275577661688,32.668043343159106,45.82203417175816,30.40270308920069,22.005660085287527,24.374666412720625,18.986709129968695,39.36324859354301,18.224114960288894,27.889063374824406,1.5940162345771447,11.856453001405765,8.008694745075129,1.599018793027951,18.7023402156415,46.12129857583612,18.782704103777736,18.05987478462343,22.05785223750547,49.48818930725443,3.987373745155254,24.711200529909917,26.722158250072358,27.016821897883215,40.19752317051094,6.790807001794274,36.1891246939119,44.263324977743544,22.16483598507829,30.222399104665076,12.566077694344447,16.086095831307436,21.787930051258254,45.02522279150446,4.365011337704683,14.307685932065606,26.197478205060886,1.6126122467273962,42.84667391002049,9.460940035299558,40.059024013798805,33.722647410798764,43.18681187045087,20.8243400150644,14.340422784362072,37.48676967731473,8.187656931360287,47.7024837657289,44.20260754121915,20.66388718083444,9.896814333774396,0.701195549350353,13.414092684515644,0.8044588633278948,19.289500484763433,15.904043099044296,24.578580497030032,44.03881941505963,0.45530630124835936,9.794771922785017,41.21329370257308,33.97290161102995,20.076857319179332,17.017210939443117,26.529548150525606,26.59734307341679,9.142273101784548,4.46855119723315,11.612564447640505,46.886570010672834,15.11187693465148,48.2633310747699,31.062028663668396,26.711194396951278,23.055532435548752,44.13930786556834,14.676104924553124,9.63063538942004,34.73982330614969,7.896691664914757,11.565505661939223,43.739912424448114,43.5834870716017,17.264562985232956,17.792383045223648,10.330631203638374,28.526412180188466,11.918118504480935,11.97151828292905,42.71901223149086,23.30321160634502,33.75708245404721,8.733152087771433,42.052030547516225,5.456896638480224,27.67461775043385,36.9394088951434,2.4285306500795523,8.177747819327664,5.6219243932272285,8.845378049533048,8.624037618646362,9.386226466377023,24.198755960090125,0.010291116846428139,2.365356056738599,37.70381248218738,14.885496222577155,18.906724331131585,36.996655517173934,30.71441988677297,44.603785361464354,23.71697151350197,35.51714426837734,3.182266380154375,1.0243258795258336,4.7589458416251285,1.5106409908305918,29.542692062083653,44.389324117116516,12.702746865392578,17.67428418530089,18.04814589941639,10.643821247196882,42.8246511241532,31.299575053314467,13.705911497100299,23.017299070114028,45.82094406696896,39.938644029167726,20.876908819597183,29.010055226270293,0.7491755265515265,14.02913935209369,8.494246279316453,2.4636108029365666,16.474533912300494,6.689683585968654,29.636450920922762,1.269053983260593,32.42555856755579,3.9080793949962334,35.94517089359635,22.418134506484755,26.36099990936995,37.83887785858538,19.316548099074982,44.984624080331024,0.5604827629898557,3.0597092335426623,42.79090253710647,18.556131547295994,48.356485757460675,23.7398634086876,19.068441823060066,30.110227701261117,41.19596038912262,14.64374540354929,14.168401066371505,46.37698370987751,7.880388879138456,39.566069289729825,6.772996906736195,42.674338544374635,36.79298508654363,40.753545403280675,25.55020837530132,32.527630213025894,31.96160207050155,6.079381221951441,16.981717706833223,17.113136730726165,34.82263143096795,37.59270429929631,32.306714544423656,21.36967165742094,40.85325794916446,2.4320710719917926,19.46238419176114,0.18697988212977856,24.77493234947199,10.152740681543415,17.384165315158263,12.231870827176849,43.03103690771473,44.87013030466183,20.940093458554255,36.97063116912277,32.171929188121155,6.610052041255621,4.056770857220748,22.13839028669382,25.90515806002619,14.630856923015202,43.507589398400924,4.12061802611734,26.324240222292982,40.383674601181475,31.8944054416032,30.72914838685191,3.9388573473347344,0.27767828535764094,15.390836016999065,13.479072113441326,38.27094528787226,23.61582289002866,23.132101814877092,39.70015971094013,20.442564561852215,44.492326289265904,44.59808531710877,31.999390606836197,34.700900870810806,15.577121529528604,0.8485707385427865,25.984142693239566,6.336391566148391,15.527455802335544,18.25345217076452,46.482398582873344,39.3725878655546,49.51847055735678,10.302230599871809,18.7324552409454,18.173613119953824,1.1611098297516609,5.252811528830648,7.635506486465005,47.08293520598086,26.96480561179585,47.57529659029014,38.87404386863638,12.306893579200661,13.235284589666552,27.28289082342753,46.111161288957746,39.95847154558905,20.24464612060781,3.5144884279185384,42.49028655186071,46.150858426049844,12.413355764982848,8.827602738067164,3.051435575149408,11.221825942333973,35.69805061040772,9.420100267155041,16.591421527670423,7.792092278648144,22.185029907060848,1.9681064122404335,28.71694422137796,22.804780923189327,39.93241300447553,47.8768773434463,16.686016196265342,34.54689450785686,33.318356010056306,19.363275534502712,15.237069368308676,37.440233734162796,35.05855842868028,22.98424202708491,30.106639872742324,11.030855741890623,5.148638066339661,41.30119009385862,6.525646516954597,24.274288711314252,30.266213906395233,13.525622441257457,35.269584042935186,12.252575143912859,15.831704424186299,21.465423928099447,25.64181589164205,32.25257353021947,32.56542936478254,33.013842423193815,33.81400001755842,44.29973209995281,31.169962845362498,41.6496666110678,12.597123873080495,11.316037113544242,6.812686951368674,29.4721901415125,41.6640809778391,22.78028693559002,46.30541950856618,38.42230748807127,18.269943658880152,22.097864910689125,11.032733507597126,27.267204687304524,46.5585444683075,42.534855827531224,10.443599371895262,29.827087278423203,24.954495029818624,36.19385759165645,15.670155336914393,25.98756029596483,10.428148396967751,25.75576341647887,2.4362691964518124,2.4229145195325263,6.877833476190975,14.140609722713393,45.8560644633563,42.79664013888807,21.140555614798384,32.21503518034663,47.560581635497755,31.554565881845352,3.356340351890652,42.35023419631132,35.55835022176536,19.55120714861087,7.401190450966677,30.480740987723966,39.386751305859555,28.556673995903537,16.427670535414208,22.62876396731387,49.67146783537098,25.57577437601254,2.2868387590961214,6.611402385135367,9.315652957740618,44.16782764383878,36.72607177173048,40.288457691560566,34.6485018416008,18.296014315865172,39.262479320820596,12.904762090226818,25.99059986731982,27.004087691072332,2.399265443308718,45.148634296711975,5.750801801900973,27.056646892752767,11.495784087878347,10.02571951576,41.58105943161146,14.245332705290393,39.916994023165906,33.187051398141755,38.61960038934147,14.275430720655791,42.72091862000477,8.98006122664815,29.14473677712335,26.919200062273863,46.27851947200886,23.471450842537635,4.565905181876973,40.82444341850847,26.52749250380958,3.7449930028199407,16.31322433248069,30.716193792139677,42.82318561234252,20.28915329994043,41.35932130010795,2.1273201616981985,29.481422372290524,29.187833150754074,22.87043103309604,43.63756185816072,29.795158065356663,6.479608008104465,40.15062425745797,39.177209486765385,5.875424472547497,36.38660359702527,46.6797620953207,14.254154799755646,7.477641517358613,43.87883786814838,19.381591763910635,10.695317986196073,19.737947861949767,9.885741076910715,37.27665491931739,0.5617484621651458,23.66612557932398,11.977768405710766,11.517807499704025,17.620984556318987,2.3465455719139494,26.199272949965124,40.93580729874044,40.16105075305233,27.62347733674021,27.189970028983335,2.654655128401362,32.145488583410284,45.42373298746132,46.70218740240355,24.88511463796734,48.151892358303726,30.67396938460337,46.6750256217467,4.941287442144782,10.93128965302136,0.35171725801775855,22.770274099506715,4.482350129152213,19.188405683907007,37.080796538429475,37.030381852941055,18.208709707451266,12.218079673792271,48.68706439537894,46.43113924280763,25.62456809978699,22.731891796905735,13.352364170390551,8.226594400478648,9.906656590894592,29.47668356304599,13.212336380348855,0.1781347816174783,36.46421089305393,9.983198949783755,33.610448967565134,35.178952946761946,5.5833664762855335,8.481750838817536,11.807964842848506,41.7674896937257,35.19002185895141,24.072896410128266,6.7466678212774305,2.310267074503325,24.589163300648785,21.03567883155427,5.007242864775829,42.31716942622803,15.120264082694812,18.578100064065595,33.43086565149642,33.318528672273516,5.468837796052661,42.258999573942816,33.22380129285787,24.61247531337969,6.728190382963517,17.570639752661965,43.97611170482553,39.25588142937508,17.579312435675842,31.02915446948279,43.3177645899137,49.624709521499575,34.87248216871124,19.774443649990314,5.7705256267188805,24.12049422317172,42.26668930313594,48.07673435182993,20.15157685525465,31.649012446471747,31.58017668169988,5.491726585672141,34.222744470847275,2.567174129973948,28.33053115237757,24.50446692638981,36.34600299116,20.585736893105377,29.709863532194504,38.99107448405208,28.032577912893906,15.683455645865108,46.56076981860775,39.9961496744166,0.8009590918500842,39.74920453172071,14.542431638099307,7.28620753228345,26.15348427922919,40.923553387601395,48.25023138371763,15.510501898330354,4.3503713180285235,0.5345302376234651,1.9312215299479907,26.167366845376392,6.800281822094734,4.696875488960739,14.42691642734022,48.96967052291935,6.657519231638986,35.08056640134395,16.673143875332098,38.439518127481165,49.4250086870882,32.735792596262634,29.471752985137744,37.58433808799466,3.737304938031172,0.4552263768089482,41.072362461624344]}
},{}],116:[function(require,module,exports){
module.exports={"expected":[2.77203991028676e-5,9.110900862741818e-5,0.0006161000559646219,0.00045778872338155603,9.001418716720667e-5,0.00021628765948526776,0.0005758573875326073,0.00037621408684785127,0.00015452316317896044,0.0007860768750784907,4.881334254502391e-5,0.0010406053479641727,0.0001421296194099658,8.556417582258198e-5,0.00023765039234424713,0.0006573548373650029,2.71143636587867e-5,0.00010514713484625344,0.0003578709310148095,8.129251603680317e-5,0.0005844439207212133,0.0002043654966208307,0.0003132038617433933,0.00019869197042942643,0.00014254052963652995,3.0345700661245398e-5,0.0005724830175953531,0.0002346619011917495,0.0002550968038116394,0.00036980606873902416,0.00014420790354367687,0.00014755541118395478,0.0008406196408393336,0.0006872807682440911,0.00019455806037599368,0.0002743720922227304,0.00011326504201669329,9.242141122710402e-5,8.932833993988915e-5,5.2031729850105344e-5,3.130442217614526e-5,5.717432173588512e-5,0.0005411861824522711,2.2811585637742893e-5,0.00029695362945222,6.06891697611905e-5,4.722608619744905e-5,0.00044270708917241313,0.00033456575864677094,0.00016449492506038553,0.0002545653065639151,0.0003278918563752054,0.0003418796264462651,0.0003020695136704215,0.0004053792376994996,0.00022441599730832457,0.0002480053147530576,0.00013654730894758257,9.307104577473897e-5,0.0002901407621473352,0.00013177568795573667,0.00044661000025807645,0.0001230597709634808,6.177136730232156e-5,1.4301806905221387e-5,0.00020929300980077723,3.677648010503824e-5,0.00040946774633793834,7.90915561773139e-6,0.00027201104187916686,0.00017930642388869046,9.38787042975923e-5,1.9172847469392705e-5,0.00016578373598370155,0.0006857948565698882,0.00045381467787650545,0.0004783467335850066,3.79288521086204e-5,0.00037351609679873803,4.747935192164203e-5,0.0001903780093831739,0.0005269164575407955,0.00018660109373734528,0.0001856147232525518,0.000512542798241108,0.00047069232014417494,0.00025411510226584007,0.00012809163825603482,3.5540573938552956e-5,9.243612462023506e-5,0.00023282093651667905,6.288362508293886e-5,0.0001945445626646164,0.0005201475706685193,0.00024505822200442036,0.0001922227282770268,0.0001967193709284978,0.0013763662216835946,6.529713853779981e-5,0.00030999449053315784,0.00019524539388931754,0.00029910619876106587,8.791241586363127e-5,0.0009772241224320756,3.583251624771562e-5,0.0006895027798833173,0.0001377553631278635,0.0005353527975500547,0.00014443793224365123,6.827551202769176e-5,0.00013699365733852768,0.00018807285996615228,0.00030726208565375225,0.00030030274798199276,9.768774036958977e-5,0.0003098674031049381,0.00025262608157688906,0.0003250362331311614,0.00017980114969957635,0.0009716093252869408,0.00030050118612450356,0.00040469038219551783,0.000707878548905536,0.00015650521476335077,2.2617503957474624e-6,0.00020047441037439434,7.970265716943467e-6,3.994190442021839e-5,2.719584847647459e-5,0.00027072621463352904,0.00010481667240476276,0.0001900979171903415,0.00018902217037412416,0.00011564491703810937,8.72006246580376e-5,0.00042078765218876675,0.00010017389368180887,0.0006177892293140959,0.00043378239965976927,0.00016920103999607555,0.0001388591600806582,0.00034036417398988214,0.00017405319697234983,0.00020612880714497906,0.0007555890406320257,0.0002942392404254241,0.00020735101424902878,9.067851111690953e-5,0.00034738214740889496,0.00025646455991516916,0.0003791955636674444,0.0001904230472613356,0.000192657299647137,4.633144883919868e-5,6.867238085316691e-5,0.00102729109032792,0.00036547273357941004,7.333908063350864e-5,0.00021977132861788882,0.00020271662640919906,3.0866462252247085e-5,0.0009511149508921873,0.00027001095316274616,6.664892330017705e-5,0.0002068611551696131,0.00018284910406674265,0.0003434825112399172,0.00015798955311790573,0.00032140985964514986,5.443191564246975e-5,0.0004942735497812449,0.00022406174489841908,0.00022312137674585747,0.00048762541863481306,0.0003419066070698605,0.00015273993531892592,6.436441708599781e-5,0.0002711141814662374,0.00026115881987220826,0.00010140064657968318,5.290965117816253e-6,5.879538142587349e-5,0.0006087108122823651,0.0003352096409928033,0.00021131252688512623,2.746876326784508e-6,0.0001489986069459023,7.301551196950087e-7,0.00018210563439135068,0.00015754637525090568,0.00014816425442243323,0.0002008340453503732,8.782875876638447e-5,7.151123530263477e-5,0.00038585745330887956,0.0005045370618896284,6.13374006329424e-5,0.0004140745938712097,0.0005422784718074107,7.470345685355146e-5,0.0004126693667019145,0.0003610464691656378,0.00010293051534456076,0.00033928606041144375,0.000198751114397823,0.00023918453464277412,0.0009410465202262042,0.00038098387471378507,0.0006656944938768584,0.00026830152495718675,0.0007168641684459723,0.00015769454529762574,7.159582452030854e-5,7.2102559650723574e-6,9.031145212494731e-5,0.0001292978347887003,0.00037115792333527266,0.0002090296197722168,0.0002096866169754214,0.00011594289947955212,0.00011721044605909383,0.0001771311812397358,0.0004970348972258482,0.00019384245136467578,0.00013583232446979333,0.00046051378743299334,0.00025308049175851724,5.605531581248707e-5,0.00021294206226208384,0.0008113304014301707,0.00047514338054559387,0.00033373895064387697,5.506015198077786e-5,0.0001422979175585398,0.0006273837444719957,6.40448386404702e-5,0.00012376480400030484,9.926152206100382e-7,0.00014979092525890943,0.00019024720462332436,0.0008441677394940564,0.00012876764216013668,0.000484642123695813,0.00021215441802626247,0.00023930201741454056,6.0555514088369556e-5,0.0005987992336713725,4.791426957802666e-5,9.233322006635277e-5,0.00015684292599380453,0.001679568343102289,0.0003181385824083247,1.2754564666050404e-5,9.061822012600559e-5,0.00011514034196145943,0.0004585721723024968,1.0064235410301818e-5,4.229903976935248e-5,0.0004294802413690342,0.00024661979361984053,0.00021416673932109605,8.373350361729193e-5,0.0015294191725992834,0.0001435900823187932,0.00045792157886944746,0.0008791760641955108,0.0003050065625078938,0.00018288875923418743,8.915498712589012e-5,0.0005334911091417795,0.00020377158937280953,0.00019731589809399242,4.220380001658391e-5,9.342232075422306e-5,0.00011136900743432006,0.0006353102782922811,7.734971763948616e-5,0.0005663946325744047,0.0002838314835676947,0.00023791738379826292,0.0001186772043462381,0.00027029690728509184,0.00010024220722050574,0.0004953879377837502,0.00016476712316342563,0.0003605740801903445,0.0005072855701284518,0.00012706049588988947,9.853529645827131e-5,0.00028378519410043933,0.0004390927140794046,0.00026302793596170635,0.00018667550072055706,9.184289991725517e-5,0.0005757346233928472,0.00016261121856163906,2.9372759545674836e-5,0.00010706033538429937,0.00024361656780807697,0.00012841744275066412,2.863737402622226e-5,7.967147145854942e-5,0.0005023960474856547,0.000182157641358915,0.0002322130328021498,0.0015125208828422772,2.7085519286603893e-5,1.607684332261793e-5,0.00043576538338867585,0.0006010652602391163,0.00025670423329309146,0.00019582927469551794,0.0003511568068560218,9.306915378632674e-6,0.0003755341380315923,0.00029615054544778667,0.00031265871993424113,0.000308232178688816,7.579488891050811e-6,0.0004036096228531915,0.0001072675246990593,0.0001971656044240749,5.075403624702233e-5,0.0001301761811163567,2.5473111283561554e-5,0.00029308509346443324,0.0008042316992384395,0.00017764135922834258,0.00015077857792619143,0.0001601814949048719,0.0003294551999238292,0.0004958752555541233,0.00022512047357992255,0.00010887175992878202,0.00031351458126036615,0.00044159272140407155,2.3904017002313108e-5,1.9879563451949476e-5,0.0004929834712604612,4.799681373812182e-5,0.00019582828051782912,0.00014344093487046023,0.0005921678555432216,5.282817984664368e-5,0.00026879447868472065,0.00037742616527494953,0.00016166539441607488,0.00033929590733524414,1.7542750900015523e-5,0.0005158504155330484,0.00020653622790260472,0.00022733801871787076,0.0016271290969421851,0.0002378787951952142,4.388847034556343e-6,0.00034308877234628525,0.0005561704342506906,0.00012391192355111215,0.00022425159087402827,0.0002697446599321301,2.8173013547626528e-5,0.0001802309804480382,0.0003406671719749387,0.0001631498959033861,0.00020027992375394311,0.00030161074851128193,0.00013778186370285686,0.000225272198178526,0.0002892589498552033,0.0004180978107504228,0.0001786122082667369,3.897316156407526e-5,3.817150795865476e-5,0.00024150596570604658,4.062017255213392e-5,7.539841101096604e-6,0.00013408357268783136,0.0004352252628911793,0.00031506651766251173,7.581215611984089e-5,5.7777513115756494e-5,0.00026074148717872975,5.3580004975404425e-5,3.25940092383716e-5,0.000502291334711494,0.00010696035942865685,0.00011942860865229763,4.23270621159876e-5,0.0001366443605515556,0.00022812631067750525,0.0006028304155924038,0.0003409397523667991,6.447283784037041e-5,0.00025412830159458915,0.0001131249619692014,9.29395106731979e-5,6.629565456711576e-5,5.317698273944178e-6,0.00019242014081079776,3.0864508639944556e-5,2.61315022620671e-5,9.714321455125686e-5,1.1978932979508276e-5,0.0009322145809169745,0.00021278509497879984,0.00021765636212005602,0.0001068939743470304,0.00017144590278206235,0.00010446863087020633,0.00020283737068820475,0.0002269855272173932,0.0002472557761397479,0.00022570429930957733,0.00035407179810354806,0.0005026720470836437,0.00014539145875162304,0.000104563500049373,0.00016409458633168765,0.00040218114700146904,0.0001736128119791467,5.096471064866634e-5,0.00013808571826449785,0.00033838103843593994,0.0006061989544713681,1.835538837196521e-5,0.00017212641597935956,0.00010891686789173916,0.00019263006276173302,0.00013135717638020552,0.00021121854051551293,0.00041214872207294266,0.00014710050076482937,0.0005852983741064226,0.0005126912438387683,0.00016008971893369635,9.722091060214324e-5,0.0002011053144189284,0.00010835628631390537,0.00013259087216218107,0.0004344711940100282,0.00018692738976615098,5.654585595081602e-5,0.00038211625636698276,0.00019240606788892178,0.0002573699591144207,0.0004215879574971676,0.0003865771545478666,0.0007361339029740774,0.0002757444868474078,0.00016970771348653513,0.0002803507427007268,0.0002244041356822414,0.0001605960223575039,0.00012533402557031226,0.00013790542523503714,0.0009918607503989075,0.00022116410079451665,2.0515759668764676e-6,0.00021536789547461574,5.629492676453626e-6,1.8972949152325926e-5,2.579454274748874e-5,0.00016785489067537506,0.00029109324198053324,0.00023486118100193919,0.00023012278016021093,0.00029960404185180303,0.0006231507921833556,0.00011740058159152058,0.0001334642745610214,1.2316526647905296e-5,0.000310402816787742,0.0003702428307348274,0.00012687590155743283,0.0002867982959233584,5.255474336696224e-5,0.00016666554431507078,0.0003587038781447331,5.188088371613588e-5,0.0004490074321240112,0.00040958465941380703,0.00028654807994542427,4.5470504560255634e-5,0.00010671297580911266,0.00013526697399622088,8.971897180562792e-5,0.00013743185077250855,0.0001590750699057955,0.0002960256038426978,0.0002667100840027627,0.000641069444074548,0.00011031774866398453,0.00022250921861652413,0.0001606129238955593,0.00011171563588813911,0.00020636724760655518,0.00012355413177746663,0.0004156640309302951,0.00010221389358631152,0.00018604921831230138,2.079294377584993e-5,0.0002542638515222989,3.8145467988334305e-5,0.0002599255209131019,0.00032206144331409594,0.00036161855812648526,0.0004433188476324473,9.279825040385981e-5,0.00013432213475629958,2.189733173789847e-5,0.00033215416795671817,0.0010190605469595948,0.00028167679801620484,0.00015214149990624057,4.961744687549926e-5,7.126969905557602e-5,0.0004183980769996948,0.00027261231919523376,0.00010882575130810257,0.00034842349752007515,3.1424804634980535e-5,0.0002981255454360909,5.6120055959427614e-5,6.610561263389242e-5,0.0004053234682597105,0.0005225171292062535,3.7031305520757624e-5,0.00012611658605939997,2.863349626789552e-7,0.0001729454100490402,3.685006803695662e-5,0.00032744930751568447,1.9709977112241098e-5,0.0003379470211528069,0.0004920189322543686,4.8828429296138826e-5,0.0003233079144320538,3.159068583814883e-5,6.855278764679564e-5,0.00022093755047424948,4.908521474617744e-5,0.0002636518916981747,0.00019339095541132142,0.00021920504190361902,0.0004642865904780986,0.00024293896144905744,5.541078165866607e-5,0.0001313345318758094,0.00010637442316241637,0.0003931957760917813,8.498977981783816e-5,0.00010880980093311289,0.0004543570702307183,0.0009080687427128843,0.000292155760735343,0.0001396991878127481,5.163400095574677e-5,0.00026750078245958475,0.000304422197232472,0.0002871786113691757,0.00012174229083570051,0.00015303808520215954,0.00013934238636031677,0.00017684016680538628,0.0005202133352555817,0.00044418063765048723,3.386640518516743e-5,7.686639655892009e-5,0.00022574765680861218,0.0002838572944542808,5.014656864680305e-5,7.640588561419169e-5,2.4665925246720798e-5,8.251954675964163e-5,0.00010709313184207275,0.00026646485404678577,0.00019245151419464398,0.0002227206413673706,0.00017794330067428046,7.926265056056388e-5,6.621522605971105e-5,0.00034830624520485376,0.00044684514654410364,9.651777041899138e-5,0.0003352929648234972,0.0002302636155452139,0.00018383831707507306,0.00018089154294728463,0.0006136255266116101,0.00026082565637808883,1.938131029912209e-5,0.00017458293030709772,0.0010181671248647329,9.389448889432157e-5,0.00016659220767500452,0.000509720296154866,0.00018868279600619127,2.516676907328119e-5,1.3245053385868666e-5,0.00011913874472567755,0.00020187779217166926,0.0002096969760520765,0.0001569655585043371,0.00030678732803809613,0.00013370394073063528,4.995172648570092e-5,0.0002184040663754737,5.8642282818164835e-5,0.00018663599952890993,0.0008159656120776313,7.149137068098274e-6,0.0008755014705250186,0.0001698726991699488,0.00014185944818297195,7.9922638379818e-6,5.8591258722169416e-5,0.0007325914495982773,8.394165502755935e-5,5.564415000271978e-5,0.0005698012488737777,0.0003916022323271937,8.881082587189467e-5,0.00029050421727800074,0.0002094412688323257,0.0002516718158726873,0.0009448948014776688,0.00027399898748513215,0.0001352080264680571,6.490297575510731e-5,0.00043663224479511414,0.000570056971423256,0.0001109942582677876,0.00014723041773021393,3.492833896156643e-5,8.373344451221192e-5,0.00027812745157252495,0.00018231859691768604,0.00019521905188035077,9.089611915387449e-5,4.322925128545847e-5,0.0004974176335113224,7.338791923124655e-5,0.0001626016495504114,0.00021732893974723118,0.00029725446156290904,6.4967941069226635e-6,0.00019428505494095713,0.0001681775265264017,0.0005939559781687785,7.079278181657426e-5,0.0002217647665440356,0.0004966806729417404,0.0013605754489439922,0.0008284730515201849,0.0002540114880796778,0.00020438594260989757,2.6411524796780876e-5,0.00017229155950579606,0.00038192831139880916,0.0002289892955971676,0.00014835247752885235,2.3956266626827064e-5,0.00023688140827867764,0.0002803636936425257,0.00025537028252608916,0.00027412960592902583,0.0004616642331704556,8.813867203847267e-5,0.00011367168306604974,0.0004896300290396134,0.00017146606362611176,0.0006434969123891649,0.0005499346892879495,0.0006516262219394284,8.62391707926659e-5,7.324889010264698e-5,3.662243968887909e-5,0.0006010019407112676,8.974899750858499e-5,5.1601255833932465e-5,9.747159634017868e-5,1.458373772999957e-5,0.000310601146137154,0.00020460820299497614,3.74787305972629e-5,0.0004516861877892541,3.797404379207047e-5,0.0007769384768327309,0.00026659166641121326,0.00046235111717233006,5.323075565215883e-5,1.4095236446038335e-5,0.00028467501213596034,1.1636082552380384e-5,0.00013140550320781685,0.00027455212748771717,0.00022719135949921283,0.00017647000431364763,0.0001983818603044651,0.00016718154363605324,0.00011623170800333106,0.0010258279010029838,0.0003249579249791931,0.0011079071141818742,0.00022584774116627193,0.0003434251624966251,0.0003347257508718487,0.00015672992685413525,0.0001154698129082321,7.727808042790137e-5,7.065230315502391e-5,0.00025075984112089996,1.9908284634629827e-5,0.000565478151820203,6.478391582177755e-5,4.600023189663689e-5,0.0004319320169382856,0.0003187490113608975,0.00011899173829009194,1.4758468680202793e-5,9.421955979120203e-5,8.9069069981915e-5,9.816373154706846e-5,0.0010284042336019409,5.303298727859501e-5,0.00037733777187680596,0.00018306430260500253,0.00022865623760506533,0.00015163483586106205,9.049421280759226e-5,0.00013907182418813744,0.00014532421177929075,0.00033701140681795857,0.0004189052744483203,5.240264711097718e-5,0.0002205026328432895,0.0003862411773970417,9.016288893961014e-5,0.0002138497052249449,0.00018599301912927818,0.00040368379207430394,0.00010985861771633748,0.0006542244256873272,0.000846042944913089,0.000281891014506878,2.4384673311069963e-5,0.0006522606508957909,0.00011918610795513072,9.925264416154299e-5,5.187124867211711e-5,3.923998998576752e-5,0.0003974680356432133,0.0002723110469967604,0.0001775081580412244,0.00025920429874611906,0.00018640248811085204,3.730224689500024e-5,6.0588086906562143e-5,7.058702533390176e-5,1.1610340234983103e-5,0.00018755062554025122,9.009908864326737e-5,8.510460559154117e-6,2.3781921001518917e-5,0.00037102974821821627,0.00023993033935490744,0.0003913053542935884,4.2443130724445103e-5,0.0004904298162480584,5.831560432811979e-5,0.00021217994545422088,0.00016225803923627068,0.0004952958081985502,0.00020444731044724621,0.0003493128039682904,0.00012903635951619767,0.00025823604847449255,2.3670419360043567e-5,0.00021425278509955165,0.00017756170262319255,0.00010907498510309833,8.923216031538209e-5,0.00042039053453840955,5.545415460395149e-5,4.618646572923168e-5,6.974848124131406e-5,0.00030746565929541767,0.00027744572680585993,0.00015292048757133535,0.00036503935226744243,0.00041295951925733235,0.0002171896856737454,0.0001643362007913245,0.00039250850218361437,1.333431729452021e-5,1.5471107774172594e-5,0.00048485882628275474,0.00015111231856013166,0.0003366573151375545,0.0011791024799957946,9.364998818401739e-5,0.00017199545638096878,0.0010368506484433344,0.00015651514121363448,0.00032474037018923214,6.621346375701174e-5,2.3468385183044267e-5,0.00040534271231890373,0.00015488931902264574,0.00028296388138104037,0.00022232779272830376,0.00014439829696217833,0.0002701970907989464,3.7186395152671244e-5,0.00022864827181074128,8.987362157629983e-5,0.0007892564692050312,0.00019455793836332456,9.450378203113218e-5,0.00014364912433449456,0.0007270272867022395,0.0003146940229843275,0.0003995409179528441,0.00014881398210027515,0.00011012162662781633,0.00011309313177189126,5.9317431180566656e-5,0.0003275798007994836,0.0004085397923933544,1.2408682652107436e-5,0.00016316315233315946,9.971408247177042e-5,0.0003602728907426899,0.00019703861411318613,0.0006500015826653718,0.0002880417104484886,0.00020238019939923613,3.603867381709467e-5,0.00045394350739827173,0.00019575724145892568,0.0002049360587268566,0.00041633795862385946,0.00034789737709599403,0.000162564708807292,0.00021236339968604804,0.0002290129053124182,6.513459553870691e-5,0.0007170128840748274,0.0001450503302810396,0.0001181421065007397,0.00015268819349141104,0.0001014678789095269,0.00017503234491566345,0.0005613409460154654,0.00022182448813668447,9.621125865088405e-5,5.6167924416532484e-5,0.0003189062580473935,0.0007024875910237242,0.0006395973525877322,0.00048552368841164824,0.0012373841185417834,0.0002516053609268853,0.00010685812800888062,0.0005827750925920943,1.3315167179710632e-5,0.0003873537941649652,0.0005032946321380423,0.0003827152868400434,0.00010953171033312218,0.0001818270634147934,0.0006354347107142798,0.00036315644453308054,1.6553012025198178e-5,0.0005524263788807174,0.00030932944345849904,9.317310216358304e-5,0.00033125977470354213,9.852137200833413e-5,0.0003333821550000773,0.00017792394934222018,6.550006778592801e-5,8.675082980759001e-5,0.0004122379955986746,0.00035488125953228084,0.00021635565107132259,3.0140795050105584e-5,0.0002007035215476178,0.0003248845908533164,0.0005469711488373364,0.00021451359881315553,0.000254782754673469,0.00012833710808942824,0.00022332165975323686,0.00014777882153585098,0.0003956576058190547,0.0007197857047202493,8.080732632056645e-5,0.0001491348982094808,0.00013012361527580042,5.044434728759388e-5,0.00010352468507946,0.0001609212848129875,0.0008185317328819239,0.0001948013157702434,3.7160099030643356e-5,0.0001190744914446961,0.0003007996616886412,6.83720882576862e-5,0.000572951911205817,5.865398343374357e-5,0.00037203747555571864,0.000525507495160776,0.000261120201515764,0.00012663630943410468,1.6440373172862537e-5,0.00024347667612193864,2.105851205098965e-6,0.00047280772172434153,0.00016683987532025522,0.00018001286797841403,4.1598673109828885e-5,0.00029824438941763,0.00016833591868542196,8.714368459081674e-5,0.00019185896554695241,0.0005228487969397649,0.00048685868308726715,0.00028867291925660293,0.0002932360207936159,0.00038603984795653406,0.00012980108728193908,0.00024936766166789426,0.0008130271058867587,4.750316052991396e-5,0.0004273581822507362,0.00024825732141620495,8.076989994090764e-5,7.734172244274555e-5,8.306354287053318e-5,0.00029645161226503396,0.0001304209206526094,0.00022013097055027754,0.00017016732014717687,9.338192360086885e-5,0.0006424789301488096,0.0003459080134006204,0.00030922072480476967,0.00023135214267640798,0.0002840387995100619,6.441246090521995e-5,9.148726815479434e-5,8.848505986016189e-5,0.00014425899307234528,6.488971127063699e-5,6.576729383405943e-5,0.0001827344346517823,0.00019204156171918633,5.2969234592195496e-5,0.0001583727243373049,0.00034120591620189676,0.0002790678253281165,4.3136895399674505e-5,1.4485432874470771e-5,0.00021254592947683406,0.0004260445330966233,0.00018720300170998086,0.00010917521526227274,0.0004459346834848139,9.017033867482106e-5,0.0003072491441795335,8.701338232311135e-5,3.855553013071759e-5,0.00019897413470962392,0.0002291959239950873,4.81590468488848e-5,0.0004968429443496953,0.0005207701008645364,0.0011051068430124329,8.547619726802004e-5,0.000255816336535047,0.0002519821060203763,0.00033089683431689157,0.00016733612457919825,0.00014609649310418378,0.00014957466392152757,0.0001292778333561237,0.00036687510990251093,0.000266761466513922,0.0004167772107082858,0.0002721843471426737,4.649746212427579e-5,8.244255026241951e-5,0.0008474338622731145,8.13941357929317e-5,7.903568747063622e-5,1.7955690224242348e-5,0.00013273673622785635,0.00016193435289861582,0.00016752677709557401],"x0":[-0.22458937703343507,-1.69019338972336,-8.287706933164385,-38.40361856229242,-15.448109848163128,-34.81205479730538,-7.0082150082428685,-33.191984036159326,-1.8125888651841726,-26.693428484382864,-32.47170141482901,-45.15622959335538,-15.751841507293097,-10.637993916010224,-37.145649797519745,-24.596702962456764,-35.05489143687698,-1.1623070235250887,-33.09551220087156,-29.94859164828486,-23.605724057621025,-13.909796135076613,-49.3923102408501,-31.98133810468122,-39.85449620901469,-21.709084212901754,-38.46308590274321,-34.17384154251371,-23.062646589753477,-4.539639541473017,-44.51985881010192,-7.025748287841182,-49.103580265347155,-22.875323606188203,-18.061111834343414,-48.45861627189474,-27.95802614234999,-15.211639318274239,-41.43222922812295,-26.757517913311357,-9.170156127792195,-38.38323504602423,-23.90616906044952,-1.8189225412633903,-34.455815245464926,-17.885375257171276,-11.34952757892167,-26.315041798755157,-30.704505208706934,-40.821598604310395,-43.18447297155454,-14.71408698230906,-42.38825501063312,-20.07925717410882,-21.43512626803743,-28.758134619812115,-42.995590751460085,-6.641728639515431,-32.666318700227315,-15.992387438324783,-31.674141797342003,-44.49663274598913,-38.27321632868844,-0.09577273741788739,-7.794459960609556,-46.18254706273493,-36.004134243390155,-33.12641038584644,-42.527121182594044,-39.143465992945266,-8.13345348990019,-8.381455712032448,-3.6336566425298034,-3.8408968673702137,-24.85709507077646,-45.293210017700744,-29.317124403900518,-23.872421612283347,-36.033854762636906,-1.510411550690638,-37.02485574359067,-45.298324914518794,-6.72990129141361,-19.37706934674377,-24.703595842669134,-20.090965565339523,-5.0449070025208265,-4.157167135344753,-43.73049455676649,-27.915355647645768,-18.464703253475324,-36.23665666304435,-2.1340637379427707,-35.35102067355579,-30.837640549646473,-17.925356225913514,-46.28654476124432,-36.11074710787302,-10.6402860489752,-24.112481787849184,-12.811688473078986,-35.98170198805821,-30.846318547068428,-32.30650950966826,-0.3505915771338297,-25.238408907232333,-48.8675181967999,-31.72325088447534,-20.38432302538301,-18.07021138435363,-28.874054374792347,-9.95363057337989,-6.423867842106867,-41.13474651149471,-18.309978167614837,-42.62777513488475,-35.11302173868174,-42.26887861368922,-40.06572559287961,-33.573908165034915,-43.71477487757777,-10.046727350087693,-25.05127863775176,-4.468051895989856,-2.808057350963189,-7.6959322883144115,-28.94392497951874,-42.76679114541426,-8.143994841163538,-20.178840232809726,-45.18855007545943,-16.02735714084763,-8.675165088847315,-20.667717780141203,-2.0830502322312427,-29.195563496066757,-19.33407036046727,-13.441294105352098,-25.343510181251048,-33.555470318514935,-4.910585943887358,-11.682957483228751,-47.067674535358194,-49.67554329429953,-31.76409328655041,-49.295487657234375,-16.934939736335007,-23.73552713238938,-12.214243703866234,-29.701064314505743,-37.15726801247212,-39.94300520609567,-6.491929295186671,-20.301021443328494,-7.332837400499493,-40.11320914381794,-44.850182958494834,-2.4554351337453206,-45.71690068945272,-11.86190182898066,-19.734297323414797,-37.753617693332686,-3.4971807877244965,-0.08462329095998422,-39.96354208453157,-25.887292952948883,-25.208048110864933,-6.260361425826211,-36.317687229541974,-20.88504294907817,-12.70474813499468,-9.086169735874261,-18.523963373852183,-24.244388829534692,-40.99811507507973,-1.9462860661669468,-39.68103831335008,-24.50080082749381,-0.45241449156482316,-26.902837101403176,-15.012285895318978,-34.70134132735353,-29.629131533902253,-15.536905193569572,-18.440039430211165,-8.022437244359626,-42.34932422139524,-10.342505456749274,-37.721036532448124,-28.271881608459502,-16.967932963653965,-38.25102560078458,-2.266315332405522,-0.5390651100415145,-35.355795776538145,-46.30692861989375,-16.559328466841094,-35.68995262917372,-25.00232842326153,-14.751637420456575,-10.516709559228431,-22.548896519988105,-25.638401011875654,-4.688894118895959,-6.7642226426422924,-8.609954092785499,-28.79419088999692,-24.911679780980446,-44.7617778417888,-23.907548810740277,-14.099334807030106,-39.93532306666011,-25.231849200703415,-9.261514105961544,-20.668646345409016,-7.874907132192188,-34.08238938950843,-27.58389474607128,-8.288447430530333,-45.43050687500568,-23.34086207075333,-17.477672135536892,-4.731845665943735,-1.3372342943658522,-39.96876197867655,-40.00230193709457,-44.01174626160812,-47.75422781005885,-45.791533003433806,-48.840130888235265,-31.877636477093596,-11.88076779972379,-3.647686190738497,-13.180311508135622,-30.33935097192073,-25.45992940101519,-0.2073362656862643,-1.978877252746114,-13.272351734847964,-31.01913065120092,-36.185594636892695,-18.042267110539136,-47.982046385779796,-33.53581500366371,-37.405035246064564,-33.782864727278735,-17.152699727540245,-31.477798770540687,-28.24493198052981,-15.665118596003946,-47.93891205397731,-21.086004525183753,-1.4606175929501197,-29.325508876378382,-35.77938726908512,-40.459580866144684,-26.62225411954965,-42.978339405245045,-5.11413645356753,-9.996151825705478,-36.64237679612255,-48.096619421214285,-47.42681621919596,-12.317623485242857,-4.00473613335407,-39.28540510219277,-38.435064848390375,-24.726238933739342,-28.23908673036405,-13.692625240627187,-13.973964804948757,-34.45749745898537,-41.13316720374546,-11.918478177130842,-10.184482011844832,-41.389832287742166,-33.78759338968524,-42.675745999173145,-29.672085169045626,-20.50757280973722,-8.464314482200862,-17.818099828461854,-44.85662531416595,-48.649630331591574,-20.19712583831175,-15.477178258199242,-42.567876544927074,-17.087637212668362,-12.62079592209453,-42.688494490660425,-35.17150033186858,-49.44081991192557,-31.080840020385946,-0.630427336963546,-24.672560666541077,-29.72668307888663,-11.639979269851064,-38.19708780003184,-12.389416525034003,-0.2745753361865777,-6.509958447840269,-18.35798270948833,-20.59261470477949,-6.126290450098882,-44.38770706159243,-48.20209345684292,-34.365358952706146,-16.191489807966974,-40.74826596892716,-36.22277653200898,-19.129520276226998,-14.543265441212105,-3.0262690624427435,-10.182321194300004,-37.82351169520448,-32.819742319438575,-30.972780433665104,-35.53053259746096,-22.38181848309585,-0.20394476350323876,-11.652987667013171,-26.724867238168436,-26.098110132639253,-5.681165046186864,-2.0294311778641605,-16.225880901550028,-18.179589775302663,-31.619330386569022,-22.98653181499144,-8.685485221990174,-18.76243636855921,-21.885104560229063,-7.9440620562245545,-16.504563684940088,-21.807141847790177,-48.74889083149967,-7.867801137439779,-6.328033458671111,-46.423916856260426,-10.587218920615927,-19.841750531493584,-23.155051932610938,-44.89224731920108,-45.85142549097447,-25.406512566518714,-43.315178535844446,-39.10153570140443,-11.187446143698853,-46.72343444599326,-35.37874060773534,-39.60021670602042,-39.83639748281633,-44.282448560026545,-0.5513745082461718,-20.37574757687747,-6.394960436633612,-10.916728783692465,-9.554746247694757,-0.4926886439345579,-6.529890091354174,-35.85090378340509,-11.02620549170721,-18.252551211569145,-13.682819391146383,-30.66094162953964,-28.689930341056137,-32.47727144314916,-1.1980123829698264,-38.29724643921204,-17.90339422118521,-39.892393307433395,-39.93284630355238,-10.780279624705113,-14.069377742954325,-28.445781148541194,-9.907853048292614,-1.2165186279444629,-34.9304332386708,-24.41736378610788,-18.77281453533537,-7.318523304094748,-24.3667324749978,-21.996168615071753,-20.68610443047224,-41.79697200075743,-40.71192747472002,-24.574938353966182,-7.474677227785875,-17.99657688373164,-4.31396642719637,-17.828795659676466,-47.17335530871627,-44.61445888184027,-39.582654599706615,-46.958139530891316,-4.5683416219920225,-4.10948417738669,-8.54422892887029,-2.2493981938005114,-25.492830454722636,-15.654577442027373,-3.828525497264057,-20.11192947079613,-48.66094492827732,-12.814589923443986,-0.4178114942363309,-35.241536692868856,-15.063988417802099,-39.03718457985269,-42.43827356823719,-27.92551825189126,-47.10310868317586,-13.251660698216416,-1.710807641722123,-16.033892467446186,-47.85864553412625,-40.82273225093351,-23.64669106243813,-2.6066702028138766,-26.514061722040914,-16.744703835503937,-35.9412852270131,-29.41990778114262,-31.6941481416798,-15.634768996291804,-36.77891645695579,-8.33421207840017,-43.699403811109384,-7.188368131952016,-24.041758632277233,-41.9676130303395,-32.971981098834625,-45.984237393860916,-45.79688457642025,-3.8086999324358106,-38.977088186316564,-45.543356682034506,-4.649109743243917,-6.75398922074576,-33.82622525286983,-14.45195471407381,-18.107259196727064,-38.56836520762066,-21.19811537587867,-5.502275329752814,-27.53050792664844,-8.570036378312029,-47.68420450834071,-1.5739496306400258,-28.61344393792904,-10.438669813816038,-0.8989073658427271,-4.4650984283645005,-13.232834077321643,-22.7580806543902,-37.49990404948217,-38.355341084261006,-17.15374243238622,-13.886697644826441,-39.31956379073887,-25.762029134893695,-6.368348066641428,-15.401942115082267,-28.091048089300706,-6.518957377317647,-25.53676162403876,-32.15736238908151,-49.759074310962795,-24.074294584932364,-22.862146867500677,-30.897502199318836,-26.63781707878192,-21.95994886988596,-32.65224359377481,-44.001318690255296,-14.871058774580137,-20.029233789952904,-22.181257113391972,-40.107383968518995,-5.765702417231955,-10.811873981154296,-27.820933107587965,-0.2364259100047228,-11.636520907071047,-29.20237594920405,-34.38458661326936,-45.22768078370392,-28.442340275940058,-49.00175297095306,-18.19064938828796,-18.31754233176759,-42.22155762895275,-9.908319862358939,-0.7906427243641434,-30.702498097083698,-0.7351744155250528,-20.613689475340536,-31.531123593248502,-11.268641163919668,-40.26756596388131,-22.328250045099562,-16.899255279779325,-29.785089456122304,-16.156867346479096,-10.207765768159383,-48.38454994672632,-35.717079281836625,-25.727764442034207,-27.3175054986053,-16.29401208893745,-33.697939860405256,-33.08458667711772,-32.37914828963683,-8.189955362922262,-12.955067804319631,-1.979740955122511,-3.7057952552637996,-36.80849698711947,-8.221493401292236,-2.5757681096268636,-31.8944147275514,-44.984519243079944,-1.701668307146209,-4.228539198063985,-29.317752801168805,-33.68722637586953,-3.249424836137771,-40.67918168107649,-10.870036256968717,-48.433205479838826,-2.8166030376829965,-46.87250263010216,-4.730418863143715,-3.274428055085188,-28.920885455930357,-3.644626675435625,-39.78978031578778,-3.0297681328997683,-12.987156438857838,-27.36326811139277,-2.109060149937425,-20.621654963327806,-5.779830396597774,-38.34635072162133,-9.127839929360693,-32.974453365057734,-33.852843745761405,-9.127484546379339,-30.78412492171976,-15.796626912351108,-13.319691358381547,-27.61894965735454,-12.475967367502205,-44.94801988509438,-38.78356475242965,-25.00131741479077,-1.2441290139225902,-17.211993571023875,-0.6311901562360056,-43.91467293759721,-1.301483165734385,-39.38529183910138,-23.957302840046935,-0.08797729735892101,-42.68330448208878,-16.923858557814075,-27.200957961841855,-1.2757111591463421,-12.406312922855333,-16.462968824328193,-32.269321891875634,-42.32656091872392,-36.586206172044115,-48.85611291626266,-26.82833482428244,-46.150804918453616,-2.8161437804165135,-12.822629921185047,-8.294128085630902,-16.75883195161687,-30.262699641146583,-42.56853274768269,-22.425972400557004,-29.74577451872945,-17.774116152526986,-6.8809609499895235,-5.494804960575605,-39.41777557104302,-43.42786605790698,-25.883057178794445,-31.101632556477,-18.89371269805261,-48.806203248636685,-0.6992757384544634,-4.113492270926944,-19.41996585166472,-30.521610707231307,-49.044302013589835,-3.6701927676588753,-0.14559757130208073,-16.873222492627814,-20.85321113935159,-19.327418215972514,-31.183823618984164,-6.998365586482757,-46.30476049782673,-1.7623255431432172,-1.1671940737607356,-13.03693408767227,-35.108168293977705,-9.04496319678918,-46.13890393473123,-24.984844986105735,-42.215763272358394,-25.352936803064885,-14.326089735325198,-27.128410467062302,-12.326653313812585,-18.41519200942402,-24.490027789497294,-38.17744861620621,-13.369782748395952,-37.39882158412936,-9.2449517341344,-19.516974066575198,-48.06534338187559,-30.739656411889417,-9.089081931663134,-28.146272581942167,-23.307330062476062,-38.554354833602,-20.064769581345598,-2.8005219428202,-45.85643034162729,-4.817577183017574,-26.434615587657984,-49.177639585183805,-19.76523049408169,-35.01718619339829,-7.032027577717681,-16.11575855823737,-28.482331397983817,-4.893518244008,-4.683265323282415,-3.093932867626159,-17.37248905694082,-47.68171648730101,-4.097751079980472,-39.06791834094731,-38.823778350151784,-23.266894839450092,-30.5214204456431,-43.984467615824286,-27.02524368698419,-18.010902222980363,-12.351628786649272,-5.733024832693301,-30.103528504839126,-27.098110605652558,-40.342222780935025,-1.6161361620669168,-34.16256581969764,-10.924186219201825,-26.118015947626027,-46.75358752123454,-48.059893631958474,-16.348088458544773,-40.25754281104744,-7.075284204832821,-35.33386400589006,-20.248174667485564,-49.06333390081288,-24.948067475768177,-43.254786676547454,-26.926408151771184,-17.42544294955475,-11.924699993174837,-38.99697657534391,-13.282910821625727,-24.22303608429325,-30.03234722881125,-2.485583799596691,-20.663092270388372,-17.2528427192988,-0.6798150542604908,-17.693975191203315,-11.489565466435437,-42.2308159840307,-38.26130578960024,-20.045212980919537,-44.00661921917563,-32.73630645824963,-27.84447691176124,-43.65597802233877,-4.049092730369019,-5.788159693060679,-30.588432695990274,-6.647242401590692,-27.37026516782012,-6.138799759872571,-30.240286585967034,-42.35798139075091,-41.430054019701856,-40.25852163740109,-22.29171003613977,-25.326146511377257,-31.94595732047484,-5.099236716163191,-11.295279776964872,-14.324481173430147,-2.1924497757537686,-43.740942321249236,-14.524958341633642,-35.9889432381451,-28.608908231176212,-8.297554330822576,-38.10932614191327,-21.456655631657917,-14.638920065591531,-43.74752382143385,-28.844730435232123,-47.67781624552169,-8.410129681056478,-46.47074004050601,-4.807365185160018,-42.61641553075904,-8.3162425717907,-17.972854140607275,-48.52654997847308,-19.414173522383905,-28.63502297872733,-32.99157385552718,-22.30685204331553,-26.246949364369353,-35.02479227419582,-15.83514215893177,-46.7483752864414,-30.75839446372688,-21.211939939151602,-15.067041963868178,-15.538789527983665,-5.368438849767198,-24.15089413850865,-46.098204277266916,-18.604790871973297,-0.7814690735364005,-19.959932452243343,-48.16050356780824,-39.51909678444168,-16.72204389957781,-5.775494042168927,-26.046656532645287,-7.776128640005542,-7.523420420791071,-43.24200605939029,-41.607626018062035,-43.676014210823254,-43.92164362024176,-40.93284775391063,-44.34111576889468,-18.153062201362967,-23.362007528034834,-12.65665494032101,-0.8554167957575465,-9.498488741992151,-6.246442154202592,-5.0423689379634595,-39.000422273708004,-36.94984761771312,-9.628048481884166,-23.36642845978586,-34.21953402849759,-40.05882101084308,-34.878752218832865,-4.478432618615136,-7.254174448552653,-36.65469447229653,-15.438517415264775,-24.37841163746308,-16.64770308224113,-27.059496503178103,-24.094801236809747,-16.742823072369017,-30.17348129744759,-23.979215413221755,-44.726714608769136,-34.17866600530933,-2.093019800439011,-15.101840666862953,-38.17056699860941,-20.358824250141595,-25.584861946408154,-19.08629303890764,-42.53886265301783,-22.43148317484003,-4.701968846879323,-13.010952574143708,-6.79426101125965,-45.370408326215994,-37.174605486232196,-0.5198411695820915,-30.073710982267464,-40.85041841163539,-1.9664348934342657,-20.022039820063085,-5.002612073122603,-20.641428422573494,-19.553877705026533,-20.131959556559163,-42.86090414258326,-34.05836766263275,-44.75008148801257,-28.202035314018225,-42.319891155008364,-34.20609749518485,-9.789278926023515,-48.926107439198404,-21.16658502215696,-19.214024524372764,-10.81655154428386,-46.97566423386309,-32.69388276108839,-13.091829810062572,-27.757033371978046,-1.319001732799574,-8.175753736154224,-8.456211763064768,-21.402114963103656,-30.039871387636907,-14.02650656859803,-35.32746965098424,-40.963766839844006,-18.253357170355024,-17.493257940980723,-23.752103931772993,-29.978204626273698,-14.053935918978478,-20.084171371409088,-34.963312556565555,-34.577922011585194,-2.016782138173745,-18.80724999936909,-2.2738845715005063,-28.64791185500568,-28.880939757058332,-32.69876354748038,-31.449932212079656,-30.858386245651413,-12.47647516773962,-11.247844279405793,-24.77381101340145,-1.8795342606453658,-37.60989681305603,-21.339995193241567,-12.467245174228836,-32.304845924537695,-10.932716957329037,-40.39273806688794,-42.92006091700199,-40.81489129416765,-43.24385392891986,-41.61539923721133,-1.1280278315291548,-49.052752797723564,-39.22288233397221,-34.17906760699763,-28.666724246177612,-12.726275947306254,-11.147991806056833,-8.35058704411945,-34.50130932815373,-21.283259458419167,-37.954433440357384,-36.36793565469599,-1.5178069184580423,-24.936102871885268,-36.2216405873756,-34.92498281006665,-11.41299142533182,-23.73911466787003,-25.30709311885434,-45.59407641047174,-10.634269000552843,-30.27827533881755,-36.392396917092654,-34.71517610574209,-24.732875053331494,-15.565753981153508,-0.9157283679652406,-16.64065921103325,-13.486147500163337,-27.702908360934984,-39.43650017335385,-20.3498355484068,-49.41229587410323,-18.77134358672521,-46.25700308901383,-5.620748917454776,-8.947584520288531,-0.294657790917896,-1.9656588071069514,-12.45996624083725,-7.068414938928647,-26.487070935371182,-25.865342681341264,-0.5924753165376995,-39.68364141351069,-36.37172425798189,-1.4713148814379018,-39.71341553706247,-4.96606188781371,-11.274566615083359,-12.338270396947571,-27.79127279688407,-33.839077845136266,-3.5896439983117645,-37.9048335881419,-40.215856000797125,-42.04264963071886,-15.536644346655892,-4.596036357698329,-39.97545082002583,-43.81618820907196,-26.196042952748723,-27.742013074654903,-25.096254850194466,-9.143527179869615,-29.88375757594475,-49.57016919863448,-3.9382651180546513,-19.92060193544343,-6.766138495121643,-37.49483123014667,-32.47427158881272,-16.462533179642413,-19.216027825606176,-30.190510740947076,-20.9199348345418,-7.385306983450168,-9.107205983603494,-37.20230256814193,-4.543826500804016,-3.2974807532019867,-14.515512331111303,-3.7337657092652354,-46.3522038576631,-44.70394884079445,-39.36743061801001,-9.355035639970788,-45.689608558449976,-11.045363107611795,-6.319272854256597,-36.50300869485762,-35.07145255309837,-23.813409200663614,-0.3144138262020424,-9.951917488095285,-38.941402795883974,-9.534339689179038,-8.319042788570574,-9.572180085366854,-29.324014687924304,-35.015862050215084,-28.90050808971363,-10.568466937323851,-44.155626385486876,-47.339236621715216,-10.228761233611461,-33.43917134248888,-2.109869901689232,-44.63034932825636,-27.82399409611298,-22.819841448429422,-34.06913427358226,-25.893729376625608,-7.38624003570536,-27.795992236966562,-34.657196029027325,-40.59506847173974,-25.077033255715797,-34.76253687446453,-46.0585337376189,-40.827182703542675,-13.871360784719311,-22.896009873622425,-16.69464993098656,-9.992764698836243,-9.848917721852201,-3.5059496294621573,-31.42370825847123,-14.033753600029353,-32.53019172179029,-2.8998509190503396,-47.91814674013337,-4.938651644121417,-24.15284385594315,-4.637196731385906,-43.599570835243775,-23.777023746849192,-1.6794515881149774],"x":[-173.8658558605242,-184.98217817035717,-105.9054005010388,-132.3318834954701,-191.83123773151814,-152.50051929969297,-109.90082100705357,-155.4294443560941,-122.40688057140494,-105.87077776602574,-189.9449861517765,-114.56264559211111,-187.12138056659498,-197.66893719653257,-115.10020796291234,-117.36179578473009,-174.57593537330018,-152.72170437566393,-123.852052961455,-140.58821205645515,-122.0862484335711,-158.57837571938668,-104.91104047850388,-119.25298629934689,-184.42867578984144,-160.40899888309195,-131.76870833508178,-194.74360217615688,-101.59151489855584,-122.44215410789725,-155.8626022684524,-199.6917559228197,-132.68366810114105,-112.72292378215691,-137.37157746694632,-121.56068327591514,-171.28821233861518,-123.67585173323663,-119.20194551461236,-188.16947161470117,-105.176307079089,-152.73659789511547,-124.4175203156609,-105.93600067198108,-175.75570339244464,-156.61500242936611,-110.2720557222183,-116.4223766387054,-118.76831743924198,-178.54971814763257,-198.53980850027168,-108.90401287878417,-172.01370228308434,-153.29572577012397,-108.36162850945227,-195.50944530892505,-190.02198037687617,-155.35777738192002,-125.21764865003135,-136.06137646992667,-130.34081816373168,-100.76822600118544,-191.003526347744,-153.58413666528676,-100.37034780381417,-162.37414038810573,-144.68879485906632,-136.14719844720756,-196.26690599954668,-174.90506103452003,-125.06277578778233,-164.131888558178,-171.21291613650993,-155.35330120096882,-111.52809631149046,-129.25452202446573,-101.84758946630332,-165.93220443787445,-141.30480760085123,-178.69668987813273,-116.24267867752181,-141.88585632427205,-107.8599585971141,-197.28525150725704,-109.98455337690685,-133.6411236038398,-121.65098672810785,-180.78348917534217,-198.0846104621955,-166.14549694188253,-176.9782778582789,-173.91652897583467,-146.5965595135485,-129.6025544882047,-163.91610401108557,-148.4954140486576,-179.61013490767908,-100.66960811949104,-173.50794606288326,-113.37062037735906,-177.70498615997025,-169.4013160489882,-131.08492729953986,-107.26560527272841,-177.69074593459135,-107.85329614931554,-161.37505743257395,-125.61165040497171,-145.36754705176648,-110.86351814275379,-157.59663488128015,-155.65123582771378,-122.24135748912519,-185.08892940664322,-170.14713118894738,-163.93992155113227,-175.52397320025403,-172.71446157420274,-144.68210074094733,-107.64881688621304,-137.20218174774016,-122.1363389442595,-115.9264400585086,-137.34412019337938,-170.57609138919392,-151.18216907186908,-191.6286041647649,-173.2278450298716,-186.02000636720146,-115.02397804367959,-179.3101520529859,-161.63484436894694,-177.03103108374756,-138.73215970825117,-193.14630783759873,-150.4657158384071,-146.5513427737237,-106.78928484637886,-117.4498305480434,-162.0844414191859,-187.92219224030754,-142.25563838945982,-197.28205369361604,-168.40768646132588,-105.23197182691364,-147.3298253473045,-172.65708241997862,-194.67687285733487,-146.03384943212683,-181.89123939605844,-144.0565789887369,-173.0053716178887,-118.12115958132551,-175.26463825088544,-181.30710718712024,-104.82823512119994,-134.80439755197716,-183.77134353638226,-158.85189376285558,-176.97664424393204,-186.720311788139,-113.89722913280333,-150.2245808703152,-197.0412946742336,-180.2537972409082,-190.78662084743684,-142.4692998441024,-198.4852672920476,-165.4956366726047,-143.96823718124546,-115.93421003296662,-156.78479593547144,-177.52219315694794,-120.09683582482542,-113.54117927388583,-191.46105444719535,-130.70067741662834,-150.76498770297363,-136.59876510700795,-192.2043704258329,-188.67885921815306,-172.7961377040022,-124.13802228298178,-137.6635732145678,-183.88002428355938,-163.53777754119554,-141.05835349809647,-195.95637940321905,-155.6613852625111,-135.06154659658807,-169.15149355823038,-117.7785511550943,-163.4116541773647,-150.5133488511439,-138.76487830067566,-153.81264136697354,-197.6667331365739,-144.13495152725636,-126.72175707600664,-147.7993218119076,-108.36734336156968,-138.09173806205558,-193.30022589389176,-125.7368766451732,-166.81637685150676,-138.51309333109072,-104.4682318274728,-109.91884980276723,-134.47595625382888,-168.3516095878431,-102.49975443943586,-140.25248613457507,-135.90353096645816,-146.47998476273915,-114.06106792685998,-147.7130290112702,-145.51935254124348,-196.47382897300315,-168.92074572197384,-157.9301075241088,-184.10776492027603,-159.64156009127808,-108.19831124255286,-169.12507620327196,-126.37081151904614,-147.18582725224599,-192.09863672274858,-181.89330364072615,-154.56760843741,-118.98655725563768,-124.17477170458353,-133.2146649522608,-159.4944567680132,-195.220032361832,-116.16090915002417,-138.77231589725827,-188.64354463348886,-109.76923179817246,-189.77047877816278,-193.5338155822742,-111.01538048474391,-169.08037429747378,-156.81201338073515,-179.87332367762647,-179.30648808844842,-192.94397879031175,-106.70812783156276,-194.8112079003684,-185.52434818620506,-195.90564241893009,-100.75198631747332,-144.4202015946151,-188.99836907183794,-195.66836612142777,-172.4572313340504,-130.22660222982765,-198.84045757150724,-142.38860586040062,-117.79967913858978,-169.17332587028815,-167.64182727227657,-180.0426814130464,-105.98714502729365,-119.26045059633248,-119.33100668362404,-112.24031610464398,-117.82564794683022,-155.61576355950055,-174.42239812479392,-104.46055331786626,-182.7561515394588,-192.55351962494387,-184.27749446261973,-151.66251548923194,-117.16365654563188,-116.58372539435223,-182.47462195710187,-145.43904530947285,-152.14227978329,-150.7932215553232,-162.56620167471377,-130.07388781730688,-178.57035076885057,-108.35416030873346,-104.3000160300698,-104.6331560123337,-115.5889642989328,-152.18284613712675,-154.17572726132283,-126.46255072441075,-153.79527574016566,-187.81156557845458,-176.64053929962668,-141.74465240840453,-107.75853648920237,-169.20096768587268,-135.64302516635516,-184.80356511637237,-167.7124536767809,-198.57313093109886,-118.99457246120384,-183.3725192145297,-115.21791797071262,-179.17170206207675,-182.72902690331176,-104.61071517777312,-102.68088869248831,-150.75917743143515,-136.83007517819505,-108.24062941554733,-172.41124469933675,-153.72095984804764,-119.7438551680561,-176.0386247501483,-162.58915950674424,-162.77465087465131,-137.23564732320582,-127.04673479781012,-187.60768171143388,-119.52049060962592,-190.39522156704186,-154.9111227222948,-160.4465571828482,-167.54873342965413,-111.93005172288434,-123.58359560601077,-102.50109977445541,-163.33431152821544,-171.39451338123894,-122.37702531691255,-151.10786382903365,-122.86254091435357,-141.2949957278969,-164.69676728395748,-141.93302687581868,-142.343651036629,-123.60047766871389,-186.16811307695923,-131.34132357713605,-199.06665885670617,-189.04346953230092,-174.79077277956395,-105.84573406384581,-162.3070731939283,-114.80949463627998,-121.72179506153236,-146.7764403860021,-139.99089986269846,-159.1509129513438,-104.04397103281073,-166.27575645836902,-134.66065069262157,-101.08125728247359,-106.17126619148263,-182.0321165405323,-113.31871353868014,-107.56234099824783,-175.76435441455232,-138.93544969374918,-145.70603303497023,-191.59234188613806,-196.59118643681677,-138.52304682052775,-196.6135047515846,-191.88750506060052,-138.2712861871414,-190.28373799124046,-102.48829926321406,-123.04265619933578,-132.01463643237645,-194.85500340709388,-115.25674627907172,-134.43155288229792,-168.1350235724952,-189.93260938711717,-165.44462739852818,-184.1207975926927,-153.20458313502613,-143.54048494434284,-177.95549444684247,-177.19983923051785,-178.47732703218287,-197.39318836748257,-172.6206231914516,-149.06421178219506,-119.7383600563267,-161.3298135476394,-133.00243920806804,-156.62378546448676,-140.47182554109781,-109.03296740627289,-145.77366595931102,-148.15591618989774,-194.7086360147097,-175.30324886348237,-164.6389670026316,-125.54377725359839,-126.90099692227757,-129.62110910431772,-129.30888284742014,-162.69271600759603,-177.65435936180933,-150.43134578599293,-109.6939472409941,-104.59392391619534,-145.23847552058277,-137.62646194195017,-114.42349280624535,-145.95289570474966,-149.68416806121195,-161.5343780962545,-173.16656034935178,-179.5215348326962,-120.18011093025098,-114.96542374763273,-167.24524061003936,-130.4925443090663,-180.76470703865573,-123.13062199775186,-102.54136403575185,-108.3842411284628,-147.50142826199362,-138.78181454800446,-122.66086684142878,-190.5569005051471,-106.64171929796247,-104.92808465227003,-196.2601275181901,-199.33653832723456,-150.94322340055504,-115.84230536621327,-193.52798708523693,-145.23870053163478,-148.6324983636143,-198.6582428369911,-172.89675757595631,-191.79367727675088,-163.62402473237958,-109.89537400284884,-140.64968999333036,-188.9444252361012,-199.46241939955965,-134.08094176721457,-192.04852351943583,-118.79636863214384,-136.83351838426637,-109.7443946405017,-108.7981079710697,-124.42087919538254,-143.7392426904189,-158.75056442577358,-156.61227727679653,-176.3551631973191,-144.86670171999265,-191.69551686303654,-105.83649934725013,-197.71789730863054,-163.44800395396544,-170.66237431863624,-196.68483104052103,-176.08069577949684,-197.8282134557246,-178.95413173681155,-149.88916905180275,-165.16565256626853,-175.7888053393325,-114.68981065355419,-123.52613016723654,-115.78229221345356,-161.06509822858737,-167.24578669876,-157.51440051696238,-132.78923089964985,-176.86604995337396,-136.98494303047102,-187.29332447347815,-195.72557547505087,-151.73173491863963,-189.9565778197104,-114.24575222626765,-101.73111520289906,-171.5381619266172,-188.9440686533718,-151.4906987615992,-152.9929518636013,-148.01701145865417,-137.10543462044552,-198.9163631982061,-166.5599136215761,-117.92686305731175,-104.96136517163816,-134.14340566876078,-141.705887304187,-182.10297038184024,-167.46603920248958,-110.18226100835244,-127.22849078035381,-108.13740048809395,-176.24371186811987,-157.7731754183343,-194.81082197549256,-166.94975160883493,-188.05712503159404,-170.11819861551027,-139.13863299751227,-174.37023837582686,-137.98528909192305,-198.1945263084246,-169.92641883977652,-177.55953653452138,-147.18323297079388,-101.96006740476975,-113.85788349143485,-197.20171336928772,-169.89103623801026,-192.3854115544292,-105.46138576314108,-166.6600596963452,-191.7444324219137,-125.08713344104999,-129.67083098721588,-134.06113985351317,-198.52858450212335,-126.89425128611265,-123.47562696927467,-107.90007628234304,-187.72062508221066,-166.90599041333957,-146.91714876700343,-140.82184185565654,-140.63210506479376,-138.61786091054432,-186.78813028726873,-135.79754024876542,-128.55737568653467,-161.57231844271638,-131.83506115886524,-165.36288227681362,-192.0888380587937,-118.20538937361805,-172.65441558228946,-171.5677867317905,-107.1316528621506,-139.47695511129626,-104.08769481526463,-179.6049297318803,-198.1624835324957,-160.69323073368173,-161.85270680770626,-140.58465105729405,-191.03351158757602,-193.40273923905457,-105.46204779423238,-112.68901297405738,-180.84203251017698,-161.05752129207312,-193.0606159306418,-156.99692533782496,-114.94200826566524,-136.87033845154775,-157.76804251703248,-172.14560488265812,-185.4619277506897,-112.9390015308187,-116.17670769623972,-130.3527725736901,-155.07715164107015,-116.63727718423338,-172.41094722013793,-100.22237643703956,-169.1698215466909,-190.94538581142336,-121.61215403044652,-133.25730989547455,-187.312431407525,-190.01942996936938,-146.28802697193308,-161.16520975890197,-172.06969314975538,-131.91453380661744,-155.31609023507173,-165.20157331690993,-138.23712377311213,-188.63022980730645,-100.96417415514416,-159.89442104818713,-163.76807869560986,-159.6310816257316,-141.99753754840705,-164.2003861286189,-184.7695019618189,-183.59680461701495,-115.46679525012983,-163.7333568539071,-135.3055457797269,-122.39645207644705,-170.4543110527351,-162.41362837008847,-172.26472546616162,-183.15923871725184,-138.8279060128956,-121.02403564704566,-154.30674172476787,-159.91058385115605,-188.6199237090858,-193.88628738781105,-141.2313839322843,-119.1589339489501,-178.2387518959805,-100.17868014873095,-173.9058865938408,-103.79856211928313,-180.5468334540893,-179.20339353149714,-177.25760871508845,-157.52949388827102,-104.5481303644199,-189.31733364643753,-135.1129397040936,-113.3831506616028,-119.85136601262454,-119.73093739059237,-156.68739053927737,-118.05419865640168,-169.86998857558635,-119.92281691188467,-178.25880305053153,-119.57077121177694,-175.1097226043008,-133.11052927002294,-122.64546170711111,-175.25464437541785,-193.30736281656814,-121.12493130640085,-158.07089617267198,-163.4985652508442,-165.59772928002147,-189.63874595816824,-160.04257649795576,-197.39371770929768,-111.33601302817712,-194.32684770934,-134.1175189009569,-174.23947749691496,-143.61018455262172,-173.25045557564803,-156.36488631218842,-176.6112898111108,-133.05823323776042,-158.89705707526133,-139.06185669692206,-127.99820396560013,-104.47614678522123,-108.63255875022561,-167.79313152054306,-127.6696573412804,-197.56590191912838,-187.09181489148872,-137.979928522011,-197.47063560447327,-155.85877652446663,-189.32085676819995,-143.85397035189817,-141.06228778421035,-155.92904445641264,-178.7093327085782,-113.06569447155069,-194.00790254605647,-185.6439188772806,-102.1022102268929,-182.14332468341195,-126.58336283279337,-109.23898099273693,-107.53974494933922,-174.24161196563267,-156.73495793959287,-126.59733588654257,-126.31884412616343,-199.4810729187686,-118.34563697995759,-139.34207440491798,-194.66014013774262,-129.49486601784065,-186.20143537727407,-152.15165055383866,-105.82919049939773,-138.42784910343713,-104.43640383300887,-113.5800336866819,-106.21903439105272,-149.0153369645519,-165.86205443683855,-151.17242670658538,-157.41511064174932,-138.26233205622808,-127.93354168726157,-148.82877243507755,-134.74860306690115,-179.84988038151081,-151.63082968820993,-163.17258189978457,-100.27842166495321,-102.37500307557934,-111.19356517802501,-111.96821023059293,-149.84686940948825,-164.12361525278868,-165.0346007877927,-189.82060159284538,-100.10555976565047,-182.1366222988552,-132.71359130500264,-148.86506057067112,-137.87966978270703,-189.69714072122272,-141.26784823169368,-121.48888874162813,-121.98378541948675,-183.12676139558394,-161.02254333051192,-181.76120815244627,-151.58652682747822,-187.14574975221907,-110.21508650911827,-171.0178537580095,-158.37761159335977,-152.7144642981326,-182.4080108528426,-193.9685041326092,-176.81523714663757,-182.5978174151378,-180.09339753458283,-151.69336735716468,-127.64963820855561,-189.24604307835267,-164.26444707086557,-165.9467442729421,-172.6807498474788,-125.96242827621676,-167.02116209444503,-129.66683333540198,-168.80331778394276,-118.75992344507237,-120.80152042286034,-151.39814381075792,-112.49254473318277,-114.07452835484808,-147.7463718231213,-182.402263769777,-159.66491418487834,-152.7755110983863,-131.44047433391523,-119.17304990142642,-177.55772073478954,-115.31960512451072,-170.57413172359375,-179.37469669496497,-177.01773355272294,-192.68997276792956,-163.27208199816187,-136.39525326802152,-196.98421443086986,-120.72848861463245,-108.17875173756688,-118.75101418198024,-115.794535341815,-104.08599664552747,-142.03486089996423,-134.37939478935442,-198.88129312199564,-193.93143807761007,-197.90269843822804,-149.49760636993426,-166.92385718161773,-117.80363489913172,-115.64206046367227,-175.93234430126876,-180.85201269346254,-145.50243597114584,-178.20111791608562,-157.2899659035861,-115.09916651201823,-118.33956715362118,-144.47925404152835,-194.44305962476702,-162.14693063042458,-167.75347170429862,-100.95503956738013,-146.2444032008944,-156.59703129832025,-122.94759397663807,-100.43654291892301,-175.2339919056348,-155.9055947325328,-177.37693671460147,-181.44505793166343,-119.222592192846,-155.05359627849944,-164.72838560478448,-103.12855042531552,-171.17157761943062,-174.91036443197447,-105.39648420182819,-161.32687072828926,-107.86294707880282,-196.7903690823755,-184.85281277519124,-123.7143351527046,-168.54651495377297,-119.50319520236161,-177.77051107827236,-177.54121227486593,-166.92218897225877,-180.47726351758442,-169.43284533019317,-137.63219226299756,-123.78918842993743,-165.46624801908453,-184.29709273613247,-182.08774923484387,-128.58648512174523,-141.69891989542637,-105.8147119835505,-133.03124392302735,-183.18120460942066,-142.07989573096592,-132.26538850826933,-132.87705173190415,-143.80345400154656,-177.79910518030442,-155.8808484863322,-195.60282377779984,-126.96235332854202,-166.2340717848788,-112.14028330785415,-157.65610277703382,-118.99294968139067,-124.29495210521165,-123.3507603658914,-181.1672937116841,-157.3804557982364,-122.14797357791618,-132.74977326843776,-158.01640752054303,-179.83273639708975,-197.34580477382397,-164.41173024941125,-121.3290226093511,-159.78862150282583,-125.50764193876299,-121.0719473359173,-174.4596970469616,-153.46589346359585,-124.42024159678084,-150.4616319165835,-184.6181433302437,-155.86195851018562,-165.76914740276845,-125.0076351919789,-109.16341125912577,-123.03434336659713,-104.74739919382077,-152.8222266308386,-195.46124204892647,-135.36094441697398,-112.43729453043072,-139.18164513770466,-111.70187367956726,-107.38870184240325,-169.58482226555537,-161.16818082125965,-115.56260836511447,-166.46203722640956,-193.39370128567379,-106.61095707349824,-149.05985077406623,-184.45881600383996,-120.23792282975575,-197.3292797515596,-129.12138442942148,-190.22648537797556,-176.48292714395376,-194.18838417972458,-131.35804476648445,-152.75337794484653,-153.2572813779969,-188.26346070244585,-148.24951395519406,-132.05656468000973,-100.69463374198804,-126.52168207621438,-182.23870740031515,-193.78204950105865,-183.6762407370553,-149.1747275989856,-112.06510304564097,-118.80109622324247,-180.15252663691757,-120.36103802148791,-153.8143273222807,-128.04654921952067,-178.0958491414876,-171.93913935783678,-104.73378651807914,-160.62520329305744,-132.45445339880442,-170.58468083357556,-130.52738355324522,-131.29936672196868,-119.21939884015038,-152.55983666738987,-128.47405656611173,-101.14330077268386,-135.68278737167526,-142.93655344404507,-141.66881413490637,-170.87851620188005,-187.55828851812555,-145.29960479923204,-112.35103010528327,-136.87195666985437,-158.15903151936885,-182.5775653163944,-117.55730322707245,-133.817104856785,-142.01528313825685,-105.77907382155662,-114.58808124178175,-192.60758591419278,-136.3985474823345,-123.02682151626578,-134.4420120961885,-105.27156063367897,-111.76092701279615,-151.7570447968586,-102.22297846556947,-167.84217102820472,-172.20485948465253,-192.92523146548618,-160.62584147682716,-178.1586527311889,-139.00420452170766,-162.69500897610084,-188.99654856061463,-140.377520134661,-135.14796577584616,-164.2714030462149,-147.50970960557535,-107.50253089194814,-173.84486780492966,-155.37577262280234,-132.49966209993784,-187.63049700337797,-182.62537256720682,-186.72385309606133,-157.1359125369971,-130.28311303700212,-187.84969038851344,-195.5669686309301,-140.603390411867,-119.29557350799318,-152.38980094079656,-148.67922776034808,-184.25549637559075,-175.01824450393553,-110.42553778433381,-181.91106886724026,-189.08515152541662,-122.59182324639033,-199.25579869115796,-156.60956059044602,-170.7257521995735,-160.9894655893839,-143.56489463117535,-166.87141171476264,-185.59141898738758,-107.7059338798531,-126.34410693457936,-110.95946486852088,-145.72500584674285,-169.7383621908094,-159.824387788696,-168.26041472898567,-148.87067950072907,-183.94246506501693,-153.21674497554778,-191.5601402702528,-124.73985207302638,-130.789306328365,-148.9016375847341,-104.04665859247095,-125.64859937559136,-185.3024902299561,-106.2923359489481,-164.93384413652637,-170.6626986906345,-139.15662850665564,-191.00966419424577,-165.83551633968557,-166.2991917733106],"gamma":[2.6263619880511557,9.642695512778477,19.154250851446754,12.928819540650629,8.81981467269275,9.472261616821879,19.866881357693764,18.044971590928803,7.084237174480155,16.123643717911186,3.805008925958,16.655204713481346,13.19068045708564,9.426938775843414,4.552501265541995,18.4762704411358,1.6584030166596442,7.606865045888367,9.358927107036843,3.1287362232829663,18.43081815158387,13.5550775618632,3.0419908798666206,4.768383066403268,9.399430975932791,1.8343211895623757,16.125366674340228,19.281354019050866,4.96185391586994,16.464856279010736,5.630825570002234,17.34688989485511,19.44698863518431,18.140517155222224,8.747509883444739,4.624702753831418,7.329176753338369,3.4192178482162205,1.6981153057130216,4.261791309100764,0.9065513373737577,2.349806582113052,17.70940613198897,0.7769149377410933,18.961526294787557,3.6720084048314217,1.4521645186326815,11.475563143336927,8.222349351951909,9.852911447472806,19.609486835123025,9.226495874814775,18.411006637018946,17.1193011308048,9.744034860477191,19.882595560670996,17.069310707696115,9.526362653008658,2.506387303370836,13.302040738922173,4.036942639798475,4.470844893109831,9.049791313269502,4.57587154065648,0.3850738867139647,8.92917408586461,1.3649760646120912,13.90131244450934,0.5872984690030503,15.968249095844707,7.735513514633965,7.169597591415133,1.6916919361080618,12.03145494869673,16.791700179127503,10.198775225590682,8.001798226767098,2.4053947566319556,13.208709594488365,4.686174997640591,3.7617563848039737,15.859432602008713,6.016710163738628,18.65973984960567,11.940302383963415,19.636299030642807,10.950553786822518,12.618052151329477,2.6609688474370774,5.557744812982355,18.632200232948577,3.747572132341852,12.855976245577697,14.877922354412568,13.780560280631375,10.36018337458061,11.060886255064833,19.699744007913967,5.447526190442398,7.81841909897071,16.851912281850694,16.998381518750094,2.7771758880535335,18.27552124548398,3.5417224910280654,15.290822646280905,5.491043841254424,15.214996827841878,7.1111234900065945,1.8476524859978039,7.153175439233785,12.636756399998191,13.114144424399194,19.925043147004327,7.090749545874977,14.531884510024696,15.846249784830588,17.69536659548566,6.203921158812151,17.705707297094154,8.316208388099312,16.31190970473456,19.18376166036124,8.718422024976519,0.19999244760239065,13.074354129003334,0.662709490661455,2.136273431587772,2.703881106881707,7.701305197017012,5.935090001232957,12.758997629617364,17.003035058172404,5.073596508091498,10.028097652108926,19.968190976118137,5.101458862675057,17.50706477411324,11.749263643045019,8.822597868487033,14.705394322683635,18.60043805455273,12.4226720228864,9.183657408679341,13.227744156129706,8.958146274053856,15.962328342969254,8.344149072377206,19.97886439423526,18.951031247986645,13.84151901209201,10.660027019118171,7.5768275919788985,3.4970863961317544,6.53905712299955,14.16359681080257,9.391966886417427,7.587820914080612,8.891790957971356,17.558796517798854,2.7046485789483254,18.32776059866808,18.554249057581483,8.136261492177326,12.898511715200694,15.76270664593002,15.083087070579548,18.509980373164833,17.14631357160467,2.591752518563557,16.995738059143363,15.525400361118088,17.94624149411335,14.392124123167797,5.687355631838424,17.379027763222204,1.675765007908736,13.739621303568597,15.402447418210503,8.728782225209128,0.5013267290601897,3.52476817339916,17.678369626471667,15.9755568158453,18.394673824837664,0.20870662322066913,4.570629329253109,0.07902890347432301,7.994456336241771,5.6602436702831715,10.834893068820538,4.000550326651857,7.179319408400868,5.0588477529240095,13.17301233943654,18.88444413453424,6.328161644354573,15.615664787499375,18.190803511948957,4.158428718564462,12.619536739044023,15.41197132436913,9.116846057149806,15.887238180213568,16.157952184829302,12.803263296696565,17.87447186326455,8.740471476270724,17.470772941317097,17.85492893483825,18.35831906230473,4.997970613259559,2.756639334359381,0.4265106699905008,2.476402407283156,7.968936707036098,14.73305395334874,18.967435982062337,17.192259393672447,4.617714532938693,9.550795124765816,11.317939626770773,17.17684498638809,17.327131352751316,3.190014750004151,17.04079088366963,17.684447393993835,3.170442207437447,7.957860061241249,12.970578247530966,12.967002492006499,15.693744750085866,4.204349882978158,14.913717120527332,14.957957139026345,2.5847271029749175,13.881170625347083,0.03623186194757988,14.761925810945375,15.937125245552934,15.486043800108984,9.26318136513018,18.557328489424563,14.411358440487971,15.314366388662823,4.823654847524854,15.541814558352506,4.01816306797441,7.190488819027299,16.13564765479532,16.082058143675084,15.441447933627867,1.4093454189807808,7.894978057249955,6.773904628452843,11.809833599274082,0.9377814666296613,1.3134654883625796,17.548338362747394,19.93888296443214,11.637366531823465,4.585283151737847,18.04107159694498,5.1712069464697485,19.691458102503937,15.351511518429044,6.074806075924739,9.899744671297835,5.99543928372178,14.14362674169662,18.454746441663264,15.64538802084333,2.7177295275871316,5.741158016926691,4.0097973104135365,11.551298724392494,5.3792637347336925,19.46497294300319,13.537724728903608,12.80995093269716,8.883290558050959,10.799647390738386,5.64059100400748,5.596403521736915,3.6683242098547986,9.097967045633407,8.615959498464445,7.306490179743204,6.214812441482014,6.292189950656888,19.96068816679006,16.03366317492464,12.517552535800975,5.7551788181315855,12.781615393787181,9.988734394343389,1.419110468663587,7.246772404020785,18.73268210687204,15.96686268771171,1.1384495590222121,6.827156812462181,14.462350168832025,17.30774181175879,14.106942484017203,16.397264623751976,0.39713722432455967,0.9146444310412649,12.864763874726378,9.981963376242842,19.246755477073123,12.005669993535474,15.286567021312262,0.8043217548761161,18.78107359195367,15.94926042321454,11.214866423649328,8.174766584261736,0.6500587000220648,18.484725277057592,10.805798002043275,10.2430238620199,2.8792885440129146,10.76259109469774,0.966642201850707,10.718088527968433,18.863201550902392,9.734870489098872,10.484949841599835,6.526000529822933,18.48214401605012,16.298217936422297,12.690315024324779,7.530709559358315,14.417573319020995,12.364862778522427,1.0059249138048987,2.020154032442507,11.368160214327268,5.360946251617964,17.808163246066893,10.410419021603348,7.003046817289129,2.2516399920736463,6.788455355375516,7.353440324369425,5.906097482929917,18.030661068036874,0.6966412469621774,7.737986372723409,10.483247535990428,6.451586858936245,18.18077714500796,8.38935217533447,0.3603197887657039,12.490834993460993,16.814043098788023,10.799530294633279,13.633819008910413,16.649590769288743,2.1472078267203853,19.717287395023963,15.746339162193959,17.30529889416087,16.527239360579983,11.503495440958101,10.83009373071173,7.2986437823425465,6.5655019500855705,17.506019868492423,13.578019035706417,0.6947331942533097,1.83392637772962,18.262021861000672,3.329280582705425,0.573038942901487,14.176676849890942,19.65507656089851,14.246626246755607,6.043742294071115,5.2434059958594625,19.77504899665506,5.1829389962812344,2.3643170891218324,18.709169500478694,2.100023015734722,7.035448549688246,2.0958906714795145,8.279131978766753,13.415487322114332,16.253728589958627,10.532006004178637,2.1724327750407735,19.5160533593679,5.866422880105309,7.497652634127112,3.073234524787538,0.23402457053198322,9.866072330372155,1.0451587876443513,1.7751601380689497,9.247372769139787,0.6391410417644394,11.282027755081959,5.652296779442554,14.48455507816092,3.5244345748450367,5.332673731335786,3.7562506045215027,7.363798542324744,12.847412123442457,12.465231336243562,19.88306419704914,15.89275312812234,15.853132861470423,6.52975872177366,2.6436248008796426,12.810726632532585,18.800044916913293,3.158053686084923,1.3448651392985411,5.411747654500778,12.890822147081803,16.262729735871496,1.764603623120613,2.643081580415969,3.196092817034315,14.20723313794575,15.333204956060765,10.762866882985866,7.132215620835836,11.979206392024079,18.761794516804727,17.527908627327847,19.28165019984351,5.4868958797840905,13.630863002071564,8.62856751052179,4.439492030312233,15.921584108936525,18.072154873226918,5.848735120369457,11.099207768351738,17.836450183680718,10.466785144134194,16.169786800400043,12.625178762737978,8.817267551026283,13.224810916235654,7.093201180288928,19.715650307121052,17.30466992763411,15.020693261563324,6.841094188063654,12.431639802040042,15.278902271875484,17.86744058391989,0.1379407057675941,16.821292574640573,0.4379658643963502,1.3469312019409596,2.971240359736673,14.212278619181662,13.738974652377443,18.83215622453331,16.518394155145867,6.450476731340569,10.884848318322664,3.1055052209632095,8.035543286855962,0.7193654382836989,16.984497377895288,14.53280957700322,8.317347986131022,7.84549281949495,4.91248092757028,16.302119020504886,19.334412816334833,3.6620591600124675,17.007850990987713,10.786364698490832,18.915770308740694,5.090665479705172,6.571671735424309,6.530157606366895,3.6432158781793333,3.650421658354044,14.630374111574938,13.009820362494168,8.393832738122455,15.609997307547063,2.9313940356300616,12.247483038777487,16.728865599185546,6.579737480550758,7.805529695064917,4.419649499136811,7.741655421468736,8.764364616685437,8.10882950282856,1.9436203324824763,18.251033741586767,3.00301509618762,19.67230578110948,17.115479104980068,18.417311020400597,14.874373852986299,8.693658895247642,8.613352265258696,1.7892770732665708,13.632997662592299,16.00760677480356,5.905614061331312,17.217255479812902,3.841398815075072,8.132162265249857,13.862531808560142,14.623905116943664,11.560647945320772,16.735534684390146,0.9439112494167823,7.483958806236735,6.838500400093892,3.126919446325056,11.456372068298126,9.179147155372016,3.9607388092146456,6.3287164287253095,0.01664956598415035,4.649374120107921,2.199352804613235,8.737423110374657,2.052623766599546,19.030326437944673,15.727393809560972,3.8281973070977005,8.681923683276022,2.615989131962939,6.9186588516175584,5.750835612747975,4.48829143768362,19.17690146761587,6.264772736855071,7.077625122953521,13.415237933868639,16.620334182755467,4.7035522856728695,9.515670462050583,5.752013706800314,19.715703672855078,8.451623140814387,9.425481746656498,12.567371728739127,13.620184669938919,18.84853274883108,8.15337263284231,5.974183956018235,16.653932378925983,12.649896880022649,7.851288381718322,9.39719231219254,8.508758890988348,11.475993829894179,7.103281805939132,8.958462811617114,18.42768861602037,1.7401183487248995,3.216222694584583,18.396780736109555,6.291593383215797,2.9539511773840843,5.308576566090819,0.5602335355934507,1.847617159931394,8.690548307914456,17.58583519444474,12.540364258781196,15.566762266636234,15.122261425845487,3.3048130751556615,3.2553139119079955,16.763569323726095,19.353983964401642,7.672404691778731,7.346679502891873,17.149679740760277,14.590705605877217,8.251148913970843,19.46012864256356,15.883375416539206,1.4379281057947457,15.001798170854856,14.926354533757276,7.858772393296092,9.050689700803648,17.469491790725375,11.687993689782253,1.0162565680783864,1.1828016858342005,12.595693623705738,9.489801513000057,6.639391388671072,9.024554029527817,16.224441054844057,13.93730564005569,3.419774778185549,13.470978748688989,2.566074799888982,16.155049399856168,11.174079119188644,0.6104427031962434,9.386650350244352,13.004841878602047,8.39457393680171,0.5793863575728331,3.7773867789062354,14.262985437910922,8.278991002038772,2.381634889934312,14.522764127008898,8.291143867350023,3.1591105992498303,13.14441783738092,7.830457414754055,18.133447372103785,16.096866885141612,19.044704859902033,5.196280659415575,4.407818022709624,16.93173253622552,12.9649535087283,8.422762484689667,16.919231486217438,0.6217044383839632,6.188368500047501,16.65741722628845,7.797956306655105,17.894351674709796,4.469369712624656,4.924671311833331,14.497114340365789,6.350574571702339,8.567736611581731,19.899207391764758,18.767672029497213,0.49593280332828726,7.241653111078046,15.856889860234524,17.025155335721486,3.208792484895784,9.403212362951837,15.186033692865909,16.855332795173652,18.195176587221425,18.16626838238075,8.586106158394685,3.054214266560513,13.437506200032235,15.022842941636686,17.994222951633482,11.145908826562172,1.8120835499123666,13.28125891077419,11.758930206468419,9.636981873025636,14.891088293209247,13.845120633366994,6.5574945833061316,11.43376925546085,6.931295233176757,14.22777716974355,12.462527713242872,12.547011386447187,8.611758657978408,5.88902038920319,4.470534930621066,1.5131861292476412,14.811188142115768,9.802395873737243,1.4364784927964935,3.662966746206009,1.692170672997042,11.690878331083447,18.5693683141427,2.7023196997977683,11.200662142062988,1.922744570919952,9.673247202120564,4.770248007752622,10.960804340306534,1.8445787505892097,0.7848044429698131,13.772242215500308,0.47308232352433865,7.459222209152481,13.01462139102334,10.050779256990324,9.14398415116036,14.623511217818352,11.183430820191491,6.467886869038333,11.217044194505338,3.8066545538104712,18.735307927573782,5.7291727569818995,17.042169291101853,18.74129354278135,12.673876353077711,11.61050247203891,1.7872186285316838,7.198570136691056,6.267154451940353,1.1288226773763421,19.09059425672741,5.287036045361488,2.556110394298683,9.557710425082124,10.224326232621781,10.65459722015786,0.6376979771445157,6.935727570536763,3.0237669551142465,9.882087744944158,13.737689876356672,4.606236550605014,16.19667244700974,12.075463830614552,19.702109056776756,10.125773766204361,7.057620005349046,10.403972838928652,9.924215282064406,18.070154309860797,13.782056067366453,3.9180661214668744,15.426556470303074,17.61706465628938,5.714560887726474,7.408625880972632,13.599922708020667,16.880061836381994,9.248300341849603,19.150549874327652,15.468756607830008,15.838663816331797,0.9560730824955721,18.880839442941042,3.718570800758889,6.378502315757406,3.3314815436366496,2.6647484599762272,14.119112277004957,10.714220249751163,16.270457379171592,4.245184949517333,9.79611774816226,2.158469890146777,3.3740126667685244,5.112880244974858,0.5159325007363158,8.278217260193355,8.553296731405213,0.312270963000838,0.8606232005746506,14.146287019367993,9.108285048456505,12.243485745469616,1.4158071368517389,14.97072447452715,6.569682010103759,19.649892918826577,13.753703379214608,19.210419866268673,11.280646753810956,14.31843818271718,4.771603413332928,15.943498927958455,2.0349953821745093,9.94152064648015,14.679196859464296,5.823280760256777,2.3231575202156263,13.886774313402954,2.277155110676108,4.218859821931837,3.0231393415965613,17.531251212101107,8.583178911882609,8.29539548975228,16.391880831551,13.904740923192005,3.83291753645596,12.67081735213376,16.17027300366079,1.0057652612820345,1.5184070762504565,17.658383017572653,10.487245567975872,15.315574407599986,17.21044320666094,8.589699108567714,11.405348100960842,14.230439043832313,12.564891637898864,7.936158815448606,7.663564545135975,1.9883978166218919,14.067879199549145,10.774753012413303,5.246237924341002,14.573841031785095,8.028505227419824,16.56764147324161,2.2304642264886754,13.261724221604535,4.6206427613834045,14.411403932219628,12.827676264769575,8.110565820831281,13.318018650356255,15.78116703533337,11.886813882730355,10.941855878161299,5.193898281506031,11.48779919218638,6.384993498383049,2.8580462103741056,12.961446041087893,16.98089634106744,1.0456244589756247,7.478228071226782,7.50874758074239,13.58443858169852,13.813092851473954,16.509997657905746,14.953872011214173,7.032960267708783,1.2297149207949598,11.324100051029543,13.324351841862478,15.699261383409091,14.233119190133724,19.00096131988725,8.58502451327035,15.35958262344666,19.785373224884527,3.6202386046405888,19.27386538839209,9.933815889166011,4.854278089804529,4.457801808813739,9.52314938159654,7.411031570749977,19.40203551777385,13.395390745917478,7.02707879674533,3.7088101421035624,16.00534597602905,15.394104416159301,9.570796521666418,9.859236512690375,16.55963897919524,18.458262638451444,7.2134480921915145,17.481090401823174,0.25618940112231314,15.141766135686158,15.88832318977981,11.289605377664472,8.973199376998364,9.213533520602141,18.421542217824086,19.264282657520933,1.2823238037997475,19.8517852540352,15.19645403038405,6.444284152938975,7.635068594791519,10.733972293468398,11.776528427707408,15.33438210096917,3.5278679388860112,9.20540051798788,13.466899951225244,15.358490825343537,9.614145843752677,2.5328340266213267,11.179246077717565,17.879419223993057,12.40475646548784,8.661179597707598,19.416941197161343,9.642330352952108,18.96756774171731,4.630530667990724,10.968222249417451,12.23900403444064,7.748269807674983,5.831666186873656,9.672856550898974,2.5201964849637015,8.94887591759463,13.838835624689626,16.43901585326961,11.190443992680908,2.030340413952718,6.425396616753853,8.445003618696552,3.6232969595423015,11.62113452437746,4.0170297814067135,16.36728015168017,13.312364602024434,9.625153205685578,4.74414535949506,0.9847817018798777,13.667935936556749,0.1436261893056079,16.22818313900714,4.9255210110989545,9.950981622048554,1.8257750803104278,18.356673973942364,4.424540965834396,3.0830412987237876,8.280860268330255,15.74637152857466,11.164626531581664,18.877951115925203,16.41174524392874,13.1010932029216,6.665426088267581,3.608949776933885,16.775447489135157,2.7328128586496314,9.368455429001115,14.952341659996108,5.816103619927091,8.381539814656232,6.0003000946225304,18.8346992117922,7.430362286442018,17.789769907319165,16.419177680230433,5.486455270237425,16.461455792692835,15.807441464271005,11.489044372591565,7.037345748893653,14.85233380820607,4.218969499179055,4.582121378329744,6.360266097619651,9.911731520353385,5.416308101547456,5.086601468797922,8.352455307376712,13.487493532152271,5.764592651477387,8.744617940295782,13.08884513672214,13.436328182840223,1.7512286857921033,1.098382144352219,18.281139559843325,5.925098169913956,10.718086066521897,11.01352878101794,11.31432607474447,11.044602905362012,12.248433330790785,5.590817437479516,2.313041351215799,7.529915791669706,14.461167231876244,4.808221290402428,10.127226337226487,14.077648755612064,18.359634029183447,3.9128363416345824,14.818121090391179,10.330219541507937,17.18850496961352,9.629568751293691,11.96973446818232,8.794522570302426,13.46265377882915,15.490431699648548,13.735498269096706,18.519407005975186,6.969772881554914,1.266865709406031,8.63646599797276,9.302255698519488,6.556704381602261,5.336821272013106,1.020814979268252,9.095904174303943,10.32070881733202,14.371273400575287]}
},{}],117:[function(require,module,exports){
module.exports={"expected":[7.727969744768075e-5,0.00011714939298625806,0.00011518560060026846,7.494012140023269e-6,9.096432127214205e-5,9.270838819596701e-5,6.967048332177215e-5,9.564010439529722e-5,0.00025809394801317635,0.00010924508755265706,1.3565020498149513e-5,5.37804267161768e-5,0.00011718151306876067,0.00016510258234799915,8.847845851806762e-5,0.0001328119096604767,5.914913837009857e-5,2.7401773441738008e-5,1.4718467808554722e-5,1.3390923973240615e-5,0.00015606239114742136,7.717420039245684e-5,0.00018056921392157503,0.00018610994360826938,8.997701616409867e-6,4.226404707015149e-6,0.00014591222555399388,0.0002081860240301647,0.00010687862040298903,0.00019373050938296206,0.00010025421473033165,0.00010688324904015348,0.00012538040235433214,2.249591930667444e-5,4.838075153410999e-5,6.33671288538828e-5,4.59964774408594e-5,3.6961329024368874e-5,2.236851722522209e-5,0.0001665571202268477,0.00025323850666251736,0.00015553608215614976,3.2078249256371253e-5,2.801248604148849e-6,4.500639699114911e-5,0.0001288585134672948,5.369921089509957e-5,1.7127187162306528e-5,0.0003037602094384335,5.343216612493948e-5,0.00010781780001328206,0.00012708887184476365,6.714094788610092e-5,0.00010741909514134841,0.00025625948312932686,7.58970327415158e-6,8.771993383642959e-5,0.00019812804599351298,0.00016121137023961934,0.0001146179589406717,0.0001687898561290887,0.0002857699484835748,0.00018114786331213014,0.00025264111463899975,7.631729524650794e-5,0.00010145727565550263,0.00015382712110373535,0.0001288651549595072,9.091175129902107e-5,2.889747736883207e-6,6.294948058546907e-5,5.61908869735623e-5,9.873980789942842e-5,6.49007117302695e-5,5.062902595591867e-5,0.0001354699483621792,0.00014092919052074475,4.790853016387765e-5,6.746360963410385e-5,5.5233015256459254e-5,8.69501607348884e-5,0.00010462410035511928,5.0138661997087587e-5,6.155184255255382e-5,0.00018689464096194192,3.733977302653736e-5,0.00015634992603229698,0.00029013153857470854,2.465116679630492e-5,4.556738425636778e-5,5.158529731074228e-5,0.0001540082663395496,5.6868388071632905e-5,3.851696829021169e-5,0.00020523716194169921,3.989508827048113e-5,0.00014741817058463555,0.00010778521148919652,7.529917039407439e-6,4.728768437330657e-5,4.700057959326448e-5,3.1341896561748864e-5,0.00015163355843525643,2.4974536893418858e-5,0.0001825405405997581,0.0002520855025961644,4.433780856706761e-5,1.9451492944442827e-5,0.00017918826639273057,0.00027823189481891437,1.244748560234051e-5,0.00012519711526363397,1.5242830177127054e-5,0.00010890373531020339,6.11682955610333e-6,1.7105173814579564e-5,3.0190489776860098e-5,0.00013783569856315017,0.00016909539783299432,0.00019374064999311933,2.3941871902572216e-5,7.83488477111121e-5,9.295352431857077e-5,0.00015110219245800205,5.992529390734029e-5,0.0002298815589456762,6.819987953664255e-5,0.00015348166316540973,0.0001279830369436543,0.0004320378724788052,0.0001027604987917569,7.158283494823054e-5,0.00016403176884437822,0.00027179978179660513,2.0564012242956084e-5,7.311735994003742e-5,0.00010351951039653788,0.0001737876905816482,0.00021467824138026915,3.979715107568514e-6,4.3851817103664845e-5,9.056818919203054e-5,6.113784738262077e-5,7.093031017513545e-5,8.847645736823535e-5,7.355066621799292e-5,0.0003591446533624681,0.0003061773955966802,1.3903823860766753e-5,7.215171397292254e-5,8.916969963319628e-5,0.0002190693958010873,0.00012669479845319915,5.220750772666396e-5,1.7846817245422033e-5,0.00014953848584495094,0.00019976056753388618,0.00010046918900652377,0.00011388749651767295,0.0001323822403195004,5.996566787436707e-5,3.606654978069529e-5,7.783230940786343e-5,1.9859711059472927e-5,0.00011113543668085729,0.0001848346405947791,0.00010135142485178185,6.803897556429088e-5,0.00011621658160942341,0.0001676495430888478,2.407457225769691e-5,0.00010131549585861201,5.1863345375176214e-5,0.0003567287851699965,0.00012157517212943569,0.00020634621976416595,0.000211751144091444,0.00020244055422130168,6.311829824452845e-5,0.0003961535141829878,0.00014307253482150208,1.9203638683819285e-6,9.642642222008791e-5,4.553623620696285e-5,3.271510227691198e-5,6.32260209169711e-5,9.579646809824494e-5,0.0001800836698521698,8.301772179008568e-6,3.2867152297897175e-6,0.00012862429135704687,1.4064472915065757e-5,0.0001143141276997328,4.622982387422415e-6,1.1210994582255315e-5,6.635842743331985e-5,0.00016323782328688094,0.00010489617171903461,2.7729678952688996e-6,3.048533585174839e-5,0.00013128961058940178,4.185279082743983e-5,0.0002313736277472182,8.573621255295526e-5,5.445012794153673e-5,0.00019099379711741543,8.870042376362601e-5,5.518456554765001e-6,0.00018359017503208954,4.5216960940862434e-5,0.00015910884458301863,0.00021740649626281726,0.0001956431449208027,0.00014509868011581124,0.00013886908044073606,0.00026250604229767266,9.037578892444701e-5,0.00012184126315814687,9.806250297154274e-5,3.4181034944615625e-5,6.784653307036766e-5,0.0001374233047532443,0.00014576130351068268,0.00010792601097820497,0.00010813463463396786,1.2992720302287763e-5,5.340237626728274e-5,7.732746298586253e-5,9.521190020040315e-5,5.861129304415888e-5,5.6807551583022794e-5,2.67857164995709e-5,8.579217696751342e-5,0.0001221877891481394,8.51075099294277e-6,3.790582400864967e-5,0.0002095460307763691,9.450761035741845e-5,0.0002673367111062606,0.0001009765043043803,9.4903386857035e-5,0.00043837964840786866,9.689900477286847e-5,0.00043356093183185185,7.59737215548775e-5,2.783118848961318e-5,0.00016453247464459577,9.050018011669741e-5,2.8267446909302773e-5,0.0001699193720443515,7.278578503784997e-6,0.0002882191676464751,2.766730365528096e-5,6.976652322573888e-5,7.781204183089737e-5,0.0002603990871491234,0.00031660160111249904,0.00015444760463080546,3.1276726472337672e-6,8.100126461952927e-5,4.358913780165399e-5,0.0001776606225936491,0.00016068098811721824,0.00019503499083143176,0.00014474182294865675,0.0003933544432429317,0.00020708310498950087,0.0001625261756686436,2.5305611774817484e-5,0.0002695886246909885,1.903497767907262e-5,0.00019280376448921422,3.282521306280615e-5,2.0170917747515814e-6,0.0002863474713251567,5.923669433320564e-5,0.00011476650553159429,0.00010866190969115008,0.00020905749150306507,0.00012656033543627536,0.00012993836442377996,9.52901694058572e-5,0.00010325282424536277,0.0001283218967382723,4.577038193189236e-5,0.00014407568384549699,0.00013597742869840738,8.418750508837656e-5,5.2599749119437336e-5,0.0001409974538306058,0.00011568612359062381,8.93149055538114e-5,3.7945638750033406e-5,8.50038080792656e-5,1.9081358101256536e-6,5.874061299172195e-5,0.00016625219893774747,2.6761742088294365e-5,4.887306546932476e-5,6.548474290170027e-5,5.686995996442433e-5,0.00016189210483626073,5.799996596159741e-5,6.580390301461109e-5,0.00021152723206620993,6.81394044772819e-5,2.7867771993980914e-5,9.190926231828038e-5,0.00021755864716141427,0.00022473183862203744,0.00010988850293726614,0.0002237639861048011,7.039347977085315e-5,9.365107746531476e-5,3.164941014882668e-5,6.197281591361825e-5,0.00015545221836662425,4.674610713185913e-5,8.701966898565847e-6,2.1589073635033603e-5,0.00025852900719973274,7.50587900540758e-5,0.0002850766972032942,0.00013724870938070327,0.00018480318258877243,1.6309540914824694e-5,8.168761040285317e-5,3.7585056639916715e-5,1.9112171295878675e-5,9.000435637661615e-5,3.847212029202527e-5,0.0001151586198826011,8.507760357418098e-5,1.7083208621397144e-5,0.0001419217946972971,8.153848065772067e-6,8.731370552913638e-5,0.00023145208749879195,5.574312799382968e-5,4.070938085788041e-5,0.00019465246186051055,9.352635368563751e-5,5.608385326916567e-5,5.4071375358807836e-5,0.00010666052166918577,0.00011796188924945596,3.62423444467322e-5,6.764514156975232e-5,0.00010631758866815379,0.00016229732086509163,9.664949107103147e-5,4.289927475428089e-5,8.026431938321317e-5,0.000306875360410544,3.665539237756127e-5,9.305649081788098e-5,0.00036153649589811476,9.582002735872218e-5,7.214221604691991e-5,0.00024082032089368938,6.099031812987284e-5,5.0258616879831775e-5,0.00033521955607283377,4.883040964536739e-7,3.525346854279862e-5,4.2899892511656713e-5,0.00011998906787137434,0.00017796920629526084,0.00018639058937728082,8.641750058566441e-5,0.0001808782155175299,0.0001570137221035413,6.280569776968049e-5,0.00015207891156376158,8.355556603862338e-5,0.00019325033173675995,0.00013643965590997827,0.0002606872555513715,0.00011606162753477204,5.2873159779179586e-5,0.00013743579364626417,9.93687668756663e-5,2.5417156147188855e-5,4.189523507086962e-5,0.00026252053033474175,0.00026047955838671,0.00011982471957496069,5.490569550896926e-5,0.0001906747216722457,8.589591046558712e-5,4.9538321500017214e-5,0.000287359228219793,5.6640241184692674e-5,0.0001057816808106407,0.00014274822321549217,7.06218928730356e-5,2.7080186268008525e-6,5.395037350656718e-5,2.9948508920081727e-5,0.0001278743740212088,2.20187235636773e-5,0.0003516269514124647,0.0001326859282605236,1.058780938211838e-5,5.413187993911816e-5,0.00018624360212423345,0.00017341677186501905,0.00030454815482735187,4.5617355607586604e-5,0.00011384123100094856,0.00011352878903227483,0.00014083129579639327,0.00012536888094316403,9.621680952782654e-5,0.0002865921482112096,0.00023576268618730298,0.0001298498572396454,3.4953723152627417e-6,0.00026478881991379323,6.67106011025867e-5,4.094926043650218e-5,0.00025004382360336707,0.0001545698522704944,0.00014133271724387145,0.00024600387353794435,3.602450258863444e-5,5.972876603747827e-5,1.4562415863843858e-5,7.937478411797825e-5,5.4991721293010694e-5,0.00025939091588155535,0.00028894270593160206,0.0002227106096004112,7.572129696837349e-5,7.790617455459803e-5,5.855166196668716e-5,0.00013127885471929867,5.742064555853104e-5,9.541857977047754e-5,8.271803369485278e-5,0.0002042795753844499,0.00021583414721149772,0.00024127210555704217,0.0001465378914785996,7.244715262667851e-5,2.3328747597641265e-5,2.163487408294173e-6,4.586733319711974e-5,3.7309043115934384e-5,3.122648059478655e-5,1.2883321111824253e-5,5.222781570961899e-5,6.711494388617715e-5,8.275625260470333e-5,0.00025982382772909664,3.645145972272257e-5,0.00012682087410523156,0.00010078963501390512,0.00015725563875283814,0.00013980372170884427,3.168983040474782e-5,7.998724136039122e-5,3.482332375722997e-5,0.00011334510413574974,0.0001303515016949904,9.14351954927095e-5,2.1364552001576068e-5,6.305624330085883e-7,1.6227455265623197e-5,3.0491528517796456e-5,0.00010469420383369356,0.00023436750955459543,3.009124255736103e-6,1.58135823531367e-5,0.00011695351938731209,0.0005126663690308619,0.00010635415984146586,0.00018213802937132567,0.00013041094149904872,0.00030070802541716697,3.837330447237535e-5,0.0004270276075683874,0.00011103851441486773,5.6368901288857484e-5,5.313444994354127e-6,7.964038520661931e-6,9.945121094911279e-5,0.00012714958319288966,0.00012387102860706982,8.572529140603107e-5,0.00013260798128609454,0.00013434265053093202,0.0001252666659341754,0.00011846876820293427,0.0002471155167977776,2.7625263334486626e-5,0.0002640152319698559,4.1388614578408365e-5,9.929813761738946e-5,2.5461671438754e-5,9.17299790904734e-6,4.817862661767289e-5,0.00015871016644038586,6.724730578196576e-5,0.000248687834294817,0.0001207164983019703,0.00015638458850992563,0.00018937908123878725,0.00021125137826266682,1.3539675959577285e-5,2.836563931248517e-5,0.0003089617125268347,0.00013525309586331666,0.00013766418383976317,8.925525154152541e-5,0.0001723454921753979,0.0001826384968034836,0.00013093939932453622,6.615534159855481e-5,6.748149673289235e-5,4.4395829732541014e-5,0.00015480670892853372,6.820597093894336e-5,6.929358952467032e-5,0.00012514127414985353,0.00011932489877041276,0.0001819321733791282,6.118876568854063e-5,0.0001122676090315037,9.110509457278292e-6,6.67947474361295e-5,4.50569166402902e-5,0.0002792213206202506,4.3511330641155864e-5,2.8760837098744573e-6,0.00013082393824589462,0.00020159489479166048,7.095969584870228e-5,4.986969741263412e-5,0.00019170194216230107,0.00010252902884191297,0.00010661278394274179,0.00013971996614571696,0.00022797296229478054,4.293581054209434e-5,0.0003870874639239061,1.4841159928252652e-5,0.00012818881499570618,0.000307230869264169,3.0457380152141387e-6,0.0001606841097527225,3.862768323534351e-5,0.0001411261446490854,0.00014670169443060967,5.743042764917218e-5,0.0002716704354328997,1.2493739841478697e-5,0.0001816694749662078,0.00012896842584226887,0.00011607339156015156,0.0001829281107554386,7.867112703668058e-5,0.00013148341890617678,0.00013057541858422283,8.402019762957282e-5,0.00016319574171169696,0.00010180869585794192,5.668408976499689e-5,1.5125416881545789e-5,8.35512907189189e-5,1.621492069227698e-5,0.00016158285533961908,0.00013540893640282578,7.991586286316381e-5,0.0002497701541062176,0.0001062040323894357,0.00031113024101857046,9.558206993074569e-5,0.00023060651430282226,5.460835886812657e-5,0.00029680113658080544,6.544518048326594e-5,9.346410879224432e-5,7.563026873358787e-5,0.00010946885197241951,5.2577551681537524e-6,5.308947118983067e-5,2.4175554612904255e-5,4.195273305068938e-5,0.00011905594909389872,1.7197187314483018e-7,2.6889800713820896e-6,0.00011364850495262677,0.00017344064738010487,0.0001277697157409289,0.00024848576201159727,5.060013015297804e-5,6.17914520346003e-5,0.00011258913553736879,8.199720348183359e-5,7.370439013932098e-5,0.00014714613622537106,9.481172803272934e-5,1.117213372376149e-5,0.00012268936397430986,4.77559462047131e-5,9.675947244777037e-5,1.2999089726120844e-5,0.00017703335638662426,0.0001985093790890745,0.00024216927574105955,9.705170547433793e-5,0.00043495662644050875,0.00026244844320938134,0.0001812066913678017,0.00014982660857283772,2.842384161097065e-6,0.00014051264369625353,0.00011710154398960193,0.00011333891015057358,0.0001242139725423113,9.764349994152732e-5,0.00021964150588763885,0.00012978162810492735,0.00028378818534360726,0.00018624749948192303,6.699510368456898e-5,0.0001440808065782495,0.0001714561448225589,0.00013870734638154285,8.99197304430567e-5,9.058800186426256e-5,0.00014411291513141274,0.00016711029661982857,0.00015450328468318543,3.333915124106447e-5,7.852798708550204e-5,0.00014487599687944633,1.1400243656100548e-5,8.543681373082547e-5,7.654499860905417e-6,0.00017775884097334064,5.6199835779659106e-5,5.288146362500501e-5,8.150221621435219e-5,4.4811921817202955e-5,9.080628230148194e-6,0.0001447359950385184,0.00014296732889892494,0.00013556169964467154,0.00012980634554185717,0.00011767303342065979,6.786722703560255e-5,0.00012269882207921248,0.00016415059514220112,0.00025236580015884825,0.00011601954292981928,0.00012922682147731377,0.00024344093373270833,7.937986965942291e-5,4.482777616280659e-6,7.961793260385136e-6,0.00010182349870566862,0.00012052270481245849,9.632506799180069e-5,4.3785549745212204e-5,1.924046577733967e-6,5.494808853486568e-5,0.00011025930676511128,0.00016622607943359604,7.225778031156364e-5,6.50448565667636e-5,6.48166216221607e-5,0.00012725104872936914,0.0004200278020414208,1.0390915991126531e-5,0.0003625888596363602,9.990867709824236e-5,0.00014498324470556164,0.00026360811585967003,0.0001201095446892634,8.958407461980945e-5,0.00018088045001076088,0.00020847118344666194,0.00010878782464559544,0.00026207322071767383,6.899933842705585e-5,0.00012134351266537361,0.00018806408950607542,0.0003171636623166506,3.3327535985325995e-5,8.011792803465714e-6,0.00014428024242370749,0.00015741449180020444,0.00020598078275725095,0.00023729493110404029,1.574524875591272e-5,3.5855216065147254e-5,0.00043752867737472707,5.349972498540078e-5,9.567856636031806e-5,2.719325235471914e-5,0.00010337542728448665,7.608044864863444e-5,1.993759543327592e-5,8.132135841846257e-5,0.00028996773801240674,0.0001353261244494537,4.390306054474479e-5,8.233977147680338e-5,0.00027760630213750654,5.8612450717534246e-5,0.00019886589425321317,0.00020828431763887827,0.0003212392570602372,0.00015944755169527817,5.157321212251412e-5,0.0003941095078069497,0.00025873862573605645,8.122983427398014e-5,9.109216643144411e-5,8.754800774624362e-5,0.00024042897333809808,0.00010272644257062371,5.511174909333655e-5,0.000139818827582189,0.00018965532570533862,4.3182826372190716e-5,0.0001311432366266371,5.11517581708309e-6,0.00017946012976166332,6.191558369292408e-5,0.0001554520839048354,0.0004153305152687161,9.968708574832017e-5,0.00011588776100402727,0.00011957653546692572,0.00012762181949232764,0.00012615148461202474,0.000103690589406901,9.700785275139879e-6,9.910536130122933e-5,0.0001477651659779995,0.00014665261433269156,5.3035697755915116e-5,0.00023392992615466215,3.8073887909619405e-5,0.00013830850435925094,3.0283428770182097e-5,6.035524572519349e-5,8.940540559836403e-5,6.796549652859935e-5,0.0002628003134853262,0.00019967013339781029,0.00011394172200024735,7.548130826159085e-5,9.499874209119543e-5,6.872888563745984e-5,2.4600110675607556e-5,0.00023913824530149514,3.0434746518307136e-5,7.10063966212508e-5,3.621316994549664e-5,0.00010863233613226956,0.0001574188400270758,8.925757228876135e-5,5.8896086738356535e-5,0.0002894633375513576,0.00020563529035764165,0.00011368525575266459,0.00016769632443642074,2.241455940220545e-5,2.762149305627043e-5,0.00016835977859377507,0.0001085428547511002,2.116419564142314e-5,0.00021641917749216417,0.00023691685596374188,0.00017253406151185438,0.00014792551082788295,2.1498884063036817e-5,6.919870457949255e-5,0.0002613350047780848,0.0001715829692429935,0.00010016933845441648,0.00015772746667394052,9.478843207260006e-5,0.00043002285920647947,0.00022016623570202706,0.00016674584385173346,0.00010501011075680088,8.481757304787788e-5,0.00011316755850968924,5.3295747795338364e-5,3.481588645992455e-5,0.0002218279287192117,7.521961642521347e-5,6.159696895583424e-5,0.00012485570651402079,9.825916023464576e-5,0.000282786862701652,2.95081043203117e-5,0.00026324200899087023,3.060017841524803e-5,4.53347713289971e-5,3.334705917165065e-5,8.304248046304394e-5,0.00012555869287300559,2.3328040391896006e-5,0.00016512366735526793,2.8207672008347687e-5,0.0001048446411351416,0.0001668225272316657,5.420216113550511e-5,0.00014076214210365003,0.0001859762614490946,3.8715099195161014e-5,6.502041748019401e-5,6.668339098632499e-5,3.4641139655161918e-6,9.546700919776801e-5,1.3483195511826507e-5,6.168437473187239e-5,0.00021426039751536147,0.00015465447171533154,6.53878346547568e-5,9.782713767952523e-5,0.00020878126589390342,6.323301493585047e-5,6.885728067113332e-5,0.00013670983697437983,9.368519186245945e-5,4.7119127724860284e-5,0.00015014015670149693,1.9608825356591624e-5,0.00024631107609750534,7.90396479845556e-5,1.184424523974438e-5,7.66738860554151e-5,5.9901236023239955e-5,8.242319822589763e-5,8.631612517056606e-5,0.00011711977602915982,0.0003339581474190486,8.682478655342674e-6,8.024028064741722e-5,5.382402848841863e-5,5.232184671653023e-5,0.0002110881453568698,5.282077465299413e-5,8.805381909113882e-5,5.8429525972944756e-5,0.00017299583047438038,3.634662083784633e-5,3.433471244277303e-5,0.000251683697814895,8.613349702595996e-5,5.2412429844776925e-5,4.9940351896834954e-5,0.00028827538840856004,7.573012752003917e-5,2.0324258826639565e-5,4.389528181848004e-6,3.3233630430625914e-5,0.00023964289718342568,0.00020350535255177096,7.88885818617038e-5,0.0002007468091907037,1.2931824999801442e-5,2.4535918200794103e-5,3.118995194240099e-5,0.00017987175460933843,0.00026501328863284335,0.00013836516657484864,0.00010048227485368277,0.00022851481084513127,0.0002216522525464496,0.00010976816284113731,0.00011981546943390455,0.00027301134504078536,0.0002128625120407006,0.0002385587753492025,7.354052166368244e-5,0.00010655379011368098,0.00025970891822026045,0.00015084129195440274,3.322938685212628e-6,0.00013462079687998865,3.832821432097121e-5,5.42741837309855e-5,2.1343382645477758e-5,4.7132982038700944e-5,7.870721083502005e-6,2.1279201241363787e-5,2.101363706724445e-5,2.5280246017269997e-5,0.0001283726480557645,0.00019235472350991352,0.0002664606677604339,0.00037279215882369664,0.00013057466800937815,7.679488235878658e-5,0.0001444770696276003,0.0003097641031768529,9.458198314898618e-5,1.6683320142351613e-5,6.338986151296249e-5,0.00016413973553384227,0.00022968036017294476,0.00020018971619283074,1.2571240216362842e-5,0.0002818047858497395,7.947477455155022e-5,0.00019161949766541373,0.0002256274778877614,0.00010971904655462413,7.751468727017654e-5,0.00017570296947967188,0.00021538431935516462,0.00016600766345138527,0.00013397719911879317,0.00023624530492424154,7.23054189553343e-5,0.0001624427328581937,5.156519638947417e-5,0.00023154141580151392,5.8688878139313426e-5,7.587808466100097e-5,0.00010108825436286357,0.00022481967910512008,0.00011457836131237822,9.041463877869939e-5,0.00013188323161284288,7.754227987191606e-5,0.00016484944745496957,0.00012158291636211103,0.00011304391119724318,0.00026314364816880153,3.312244179284548e-5,0.00016103181412135582,0.00018519008972940314,1.6852018942622504e-6,2.4098378317348987e-5,0.00013557529845152427,1.9977817769605503e-5,0.0001810411726999631,9.142627835611447e-5,6.117394836272112e-5,2.321189309746471e-5,9.766243905094133e-5,0.00018154402248581,0.0001030080265187919,0.000315827770703546,5.1411764793326704e-5,2.7439979225518552e-5,0.0001073117587193183,7.400345314275793e-5,0.0001521666441377559,5.241853326132162e-5,0.0001429913223135733,7.387584580615278e-5,0.00013136111037569462,0.00020036803173398803,1.8065791673102366e-5,8.659617930034383e-5,0.00016900660124538519,0.00019773003305461774,3.0963763096615135e-5,0.0003067513641730643,5.172517129402148e-5,0.00017974381499482906,8.674839329140479e-5,0.00014496054306865593,0.00019401380618234065,0.0003030212961203989,5.591655774618799e-5,9.99161879641295e-5,9.3455196596582e-5,2.667745597358149e-5,2.5869984570449108e-5,4.92511488028761e-5,7.5962231635426115e-6,0.00015636068012770012,0.00019058108808667781,0.00016716813115767032,0.0002853943105617003,0.00023911197525760118,0.00019914583229199633,7.645246786156074e-5,0.0003616359204214402,0.00012772015815146805,3.214670419258689e-5,8.49424587556037e-5,0.0002854687962441197,0.00020710388471689435,0.00015162682978721526,0.00022654034014983054,0.00020771433510344506,0.00025565600169671145,0.0002589908443717967],"x0":[13.061399162900866,21.100159420672338,32.331525979050724,26.59870836182543,44.451697341520756,17.390150376576628,12.928641402725349,21.405800306103117,24.062036161618995,40.585215781465365,44.15042459736127,7.704145388881467,40.958742850020656,11.044226209665908,20.490199976826908,19.303488688103187,27.99182614798612,13.188894871501844,43.24154147731208,46.988749752848314,3.4274491114385297,16.695226087325665,2.608379421754603,40.665370751432306,33.67814984429872,11.504178187278658,8.12221628648092,15.04544697007396,42.99210712703562,9.93403594997908,20.388496276610102,31.51094760212141,1.8108973272671247,22.97958597281282,18.29176616301462,14.640975070574559,34.84614559446983,3.3292757088539737,5.775982049393535,43.054285709743255,26.212589500953108,25.579355681159598,24.81845240998737,45.812030158361694,34.82799195970993,35.57999489305382,9.777936164376111,24.6583748380927,10.814054902218405,44.42019545167666,40.936602779557916,20.04451022729651,46.24911209642526,0.021940461294278624,12.217480036873473,16.89230031615534,23.948495334001553,4.714761602780748,22.420342658212967,40.25702479458491,7.599715382067407,5.583456370424766,11.187571552002462,8.385334116366295,19.04986658404013,45.373164741177405,32.44919969791441,10.39080589957967,22.052454226950136,21.61874912068552,47.57361764325352,43.516497413919176,10.522722022544272,42.148549021843564,48.57202108990454,20.790036581891126,41.65632222969673,39.34922761352051,32.83876983992734,30.562369612396655,39.47484514653302,42.5753506151638,20.21594227127742,45.22448049623827,43.306293879828125,39.232360244045914,3.6526531126455097,29.418434063414978,31.417620544262213,46.64519861531403,13.270041666161713,28.89626797929019,26.73401442628549,27.34705246203322,4.525143685551825,32.50413664425772,33.10394404607185,28.894082292429633,5.7783328174172865,46.91586182127634,42.45227591142642,28.12714827441346,14.505411189412133,41.66608392934397,13.132530374520268,39.277904987181714,26.798959763022555,36.51065253443766,31.883313010260174,8.204126633882435,28.19817183591027,42.143795692967736,37.37736216491496,48.73446299321418,33.74851473052026,44.38113030588736,26.426588774707994,29.847628562234586,32.78297723927789,21.75774289844713,40.58760524954976,28.017284983844437,4.203044080491702,30.90515076472171,44.29097265659433,15.684421376687684,25.16461139358054,5.377815450319767,20.814537750795836,4.0264153911850675,32.14178869775438,7.667467127505478,4.248324693795869,4.539626833381938,5.892696914585649,10.996558433711478,38.348570474718436,38.01707798342735,29.693142565106957,39.627981540228575,23.337689332371912,43.74092674742811,19.49598371540221,31.660858848307505,12.426679529395424,49.155452539012465,18.48659825904705,15.03350991029494,14.489842006698872,40.70005204698192,29.73692907112898,2.2166613474014607,25.9188570603332,26.844243341667184,10.065320720039972,36.70654043932154,1.1444795810702346,29.320093879712374,26.04391575403967,18.681862996531684,45.907948135008525,7.271369601016298,24.642862528837593,44.827709473787614,19.788835989446717,44.089582265166214,29.34061634826789,21.378084765578198,29.325967537478192,13.368108687849967,40.35668150566901,36.29881621234393,32.44546115364867,15.196796905817711,15.904113375162632,26.02311202982136,0.7373063937506474,8.110136922844656,10.764226746172657,3.7709832443540536,19.2021887019339,32.5369159856287,10.601894265436352,45.60330918322393,45.715638659048075,38.74270313268947,48.94062918862969,37.141899738880134,22.62610837625254,33.992951925290214,6.097847621576347,36.42523174838074,33.6311908129865,43.7886449270077,35.176786004659874,6.297855611773051,7.3528026423421045,49.06186834943681,18.519837344692135,39.78369850891662,44.21935126405209,3.28041280279624,41.47264322432278,31.602574410315356,8.475928367618202,14.273521716172855,35.60838261242437,30.560172242655746,39.12126447032542,42.981891217411025,34.6493836329356,0.19436510696798637,14.818338925219244,33.02756924878805,32.310607901436065,6.252581022618486,30.17216054424743,30.53501000077612,41.22120596124994,9.72195505139224,29.465767961113087,26.442477774005702,11.713259893910399,24.669889592539928,38.51756278450289,32.42751708017509,46.84745481560682,19.61041153023816,21.251507245050583,7.331758536038602,7.10430022410301,40.20184521880247,27.441420180199337,21.193477761433133,2.8724506222609802,18.527131780718264,22.26800163749587,36.90015400221858,20.321761603973123,1.323923979311925,31.137389144083528,3.818998133161011,39.27872252600352,10.782281704481733,39.088755790523756,11.627114014233442,24.81947759132378,35.41311584651204,39.49517304259942,21.397916301125473,0.3263115871860012,5.0099407238797244,27.248325588855828,19.733173838856523,31.314619056320137,18.017602558358103,13.637582508956324,10.52498759492111,8.849199178804213,35.283358682879005,32.54711137881351,26.03466394870929,14.032465416716578,24.226037336423502,38.46814799030616,1.531632743334499,49.137631746612655,12.599137619954192,45.46101668062259,2.0424368384814984,48.10539113191488,37.30642499232382,6.919202916419831,17.282621038588264,19.363190431036315,2.683974156018798,9.13713132389542,18.863833449318236,9.055749266090052,49.50822896282501,29.570648786947938,48.67466820637013,18.163447285403546,33.22542506124899,39.71552844507502,45.948696863785656,30.920332504376468,2.498596314687651,2.6782169055931337,35.6507590718924,44.969594219753326,6.406120385724067,27.715043290232543,13.61832731398569,2.3892029700667505,5.068944659734531,0.17981239983551056,14.747918619600087,12.001381774948749,41.833484369322264,39.9298608197474,42.75761901228616,24.51279712166651,19.643084352395135,15.169815914792661,2.627625781294707,24.913598567062223,48.34981836197514,14.690935489025325,26.848692286393515,23.629440747875186,14.802257301369192,35.848744313898706,15.088642582100931,0.9123883082195028,26.499578192705332,4.793640123340581,40.10293586774185,0.9293649051855146,10.569913617122795,5.622307105107172,15.416827788144772,3.781346232276206,8.284513664376536,33.649791539345856,20.101251586382883,46.552537841885275,14.817959804385472,28.155477727803568,10.290815757358562,24.968504362395894,36.72023212697783,30.28499898455528,33.38330341779567,39.87765252310639,40.625786666624606,24.056485628531597,30.022998062709018,37.402600555380914,37.92701857385947,28.552208402127842,12.220366282272222,32.401719456864555,8.492448185096269,21.489141115128284,40.391183391313454,32.09957329176012,16.284098800517533,19.34589789255182,33.82703145558743,36.29726458517892,21.961462138704302,46.60351871640604,1.775978693933633,4.452451821097303,41.9126412449051,13.63383710406999,27.83160419572477,45.16997582825384,45.84059062471907,49.60686369793081,29.31590511429356,11.410131353839859,45.209372862831266,43.542448208948784,48.996629350912144,13.536358262072634,13.175138702758426,39.59646436144158,8.357138731343705,16.75355681125472,44.497963598064125,41.92498611109142,34.92161625245891,34.26093368931852,0.7573864402627417,16.022340540868196,10.043407482745547,30.99873925951593,5.199211311162843,14.301080734858807,46.679334349787894,4.523844741207228,36.12879723941196,35.4137509041781,0.811727491242864,47.51624325240271,4.987083026290673,4.379841345426727,39.052275439219486,31.66718369778627,4.914622295734484,28.51166895145506,14.009701815347608,4.781690522053228,45.647689215306485,26.63262174784893,17.98632666296014,42.51433523761489,34.609486326914805,41.31009895474603,10.515502244478892,43.133725933220404,39.605104195788265,21.249049875090044,26.658653218578465,13.945488632820746,13.188739758357382,7.194577879950915,47.29995719218655,48.05507575702413,29.482187974148278,26.167521652269134,14.954309635976204,6.372319036495044,26.210194516471862,43.318949025461166,2.8582556098470158,22.835445305641045,40.13546069842491,15.952597760843679,26.14014756104417,14.013829990656902,12.594396523213335,26.9781786378422,2.9263148887147095,38.94273717447534,47.170337929524855,27.30216721162436,37.665058364633055,24.13296336304096,4.921440986679226,9.435512597532814,7.522265543541962,17.038274066852466,15.232757405620312,43.634219452450814,49.77347075212892,39.52087538917199,26.928554349766497,24.86866738909387,41.11037994916062,48.1635355450948,37.089337983972726,36.30653812576011,14.833262295984662,33.72608169395457,19.638691360997118,16.63443786946692,33.769443824263924,10.475562625031321,23.471655242174315,47.67338385717764,31.6563177120323,37.44733672888108,46.37161700813844,18.4060310958145,40.16543108461684,5.039240174810167,10.87741259572379,42.14901529195881,23.906779204856278,1.543105678588974,32.436678272647036,43.11983901210702,38.96972734173087,24.188340258524875,31.581436575869304,39.07158365738841,21.48160890303895,18.042066254327338,39.90217226896282,15.218952695870314,9.478758740145587,26.299979363640922,1.4016126089612557,27.522212199890106,1.7005707242626178,27.585302071210037,22.673658354174798,30.05850755109386,2.0158261808751132,6.8848892899209035,26.241400779331904,39.76648365706874,21.92211003523038,43.78156689706256,37.585793550033806,31.101049726198603,25.317337043202382,44.1946543890348,31.998300421532832,21.394212422871473,2.040918442430617,8.708085854297721,48.32693703182328,37.27892804324817,11.458235942236284,49.034641214951705,9.862367718592225,17.535962290517237,49.89756903869535,38.07916593399961,32.601502199464385,34.64797197463102,12.831825529847285,18.0396207320491,39.04939737636908,21.295675141149506,41.90348562222553,23.408328964353508,0.5641999349957239,14.83801543898421,2.9487310376811626,44.80592511784185,36.10060046344432,27.571870411237043,39.72742717351547,19.488648532410057,3.073452002055066,26.862494764906998,38.90287100821313,48.99169021044057,23.240801795554578,21.74355286971269,47.18260870856466,25.84905909465004,2.2314446304540603,4.2678577802429345,15.582491704965973,47.740656014474744,46.391445372876106,34.59534017442974,15.60460309995989,45.039644052459806,18.87776362816327,16.594402618064528,32.066553895914666,47.40330075946409,14.24589493442301,17.693039728249115,37.032793121310384,15.109602485221085,9.683227045624477,9.05613496306078,5.242883291270816,12.586397603165633,14.058269347693376,16.19929738518051,9.589614301643978,17.315504493573954,36.489526077981104,20.582579013603464,49.04402840896117,44.42165220392752,20.875944363699162,37.45675370265534,44.97228677160879,47.26472041051891,35.542471416098046,37.80858574811743,39.57823417517552,47.89379268980446,7.467588933980696,7.702948084371231,7.818303630225909,28.956638851294336,13.790530152647296,48.790570375819506,19.609867678069627,28.664510716328895,16.41223707715914,12.701982538646362,3.56095282655019,42.30061572568522,40.2320621799329,9.2807869682204,27.425368321480814,27.32353256871448,40.97669169415751,7.019889911294586,5.6907098127455535,32.37836910331324,6.937236411340808,31.28435762571452,49.54745675304799,40.089439102278455,41.622865381368534,8.804984032884999,3.770237509229213,34.14684899825444,22.385968938774358,40.758721887924075,32.598210151652566,9.779208935205052,23.501361092850747,48.52774871963593,39.25750409358444,29.20539982961623,39.025964048858405,39.415030220872936,16.62152880934713,3.717650491240987,44.60631945392816,31.239918676039334,14.892209285705349,26.975588644538394,6.932577886598212,40.64154803885508,38.224212532554304,38.834182735423205,21.148317192712483,5.827691677435398,18.669596482187465,26.342828792659855,7.001317354937342,22.844127440977623,3.006348621355992,48.818810244280755,48.74482616983927,17.846280509440536,11.634764761633754,39.678650961314986,28.140286135237258,1.5035129665458502,13.275619451171384,40.11416263893183,22.9279229483791,44.94077642846474,33.66281633147761,5.50267350388709,1.0298217891200445,48.36089786666952,5.610637432320409,16.438457760518098,22.594609976644964,18.744843289299993,22.491746818073043,31.495185579140873,19.10731814686536,33.902476041508656,29.139990358484237,48.02256006766052,37.49466371869696,14.013613672457947,7.38597744580638,47.597692278471385,10.347445035873681,6.133561813870281,16.266925705300505,17.33943770080073,38.749689448598154,13.709791197383492,43.70763567776714,19.90561201377936,3.0457304655357897,21.3721417604698,20.337855359069536,3.7510709188125824,20.14871040551863,43.19230519963981,11.361568922677678,22.315503675512048,34.060116751306715,16.56553601264379,7.415241041072241,2.3135822012866236,12.757553779919306,9.781791767144432,31.494557894292498,27.918892312262123,27.73766696512808,3.8584212191736578,25.317110804566322,1.8359011422053317,46.84567213477695,22.84439456972126,31.332727445550766,38.754736528726276,19.95966723316174,42.1537010864045,38.876565506692316,4.65947470199648,7.559748140541888,12.316320344741138,9.738420042981566,30.770520966920788,40.15234295585858,6.623090727473324,13.991320430563547,41.349318802608124,41.53933271859302,37.10957819954314,22.79408172491837,21.512172672122297,21.90149109915027,15.742523586215096,8.634432450760576,5.931808606443023,45.703415781362864,47.8231033637294,9.185931932374626,18.94796715381141,49.43487751911274,17.19901586405279,15.623064122570796,30.00022735596345,13.183326077743196,6.389414613459055,1.3024306592052892,20.27914949235454,43.81429226318541,44.21471038154077,48.229648684478455,9.807551214132504,21.607170023740764,48.13764496164643,5.50692638397784,13.443669052426554,0.12669095239803418,47.85205533120062,32.14132840616143,34.005664881326304,43.2206017515988,23.395185172093257,16.08045724045687,7.7518480386274735,48.00877383169383,25.146611596810807,44.691948480106745,4.336019666138002,17.991436273267645,22.187789736841335,4.401540323210462,8.083530129527194,17.131087065778594,34.90841989117476,38.024556118440145,26.574097471777648,29.201361288533768,22.980137616642203,44.58292871558489,7.53570963562834,44.36558282592564,27.28903839547957,24.080877699689374,25.33617277318003,17.86108635824891,39.484022550654096,23.08127758690609,12.58012381937813,42.85032551736627,2.866203705991033,13.366648048961094,19.346013457540202,3.5504195527057525,4.627132493809216,13.71811234682041,6.128351390126852,7.322461614200426,40.01451791410169,47.006747369980204,14.612577684537486,18.271121876131915,33.059210517978464,14.983160878977253,31.392029945670796,10.461943712935751,3.50939655651189,41.34159416618337,29.762316263093858,20.943363835712848,17.03495228046893,31.931787830673265,33.0366438039931,44.082699116157464,33.406924212855735,10.326878757997482,24.651474145473664,1.9234098286899481,29.721372686336643,26.331309945719795,26.192085600833316,6.508823712454836,49.36651122008085,1.1325586530088416,26.6798154449878,12.033387178098698,28.619867398547484,28.772700406201302,10.615422670188579,17.57640119451771,46.91263162227794,41.856011984102906,39.60917213656606,16.705567578334445,12.92716059805189,27.615765515274514,13.300195164627826,31.03311665279196,20.546489812082303,17.577210318942317,5.9238714262395025,14.479808952523332,22.392066691918412,15.279108419590937,12.534270931116076,6.441148548066278,34.96151513012371,20.661805560793777,0.36690219490601583,21.476130024714013,30.24495744504778,35.2567310437493,32.15659380086249,32.25543415580048,24.13170372748218,8.21272371740479,44.010838148687014,18.182113259419598,24.192944175173313,21.595841476361567,46.63772074456669,10.348463949049114,3.1586017101905894,36.924629293676794,22.52433666812553,26.11657646036806,31.869709715609794,40.08260171627003,31.40242326314825,12.82573210802208,10.941907831440512,19.634289649764725,35.72171826685746,31.825312656534066,25.747499588585477,42.929150216059384,31.434600140410662,9.13865524562465,37.26261796543119,4.768070787444911,13.068425846524857,10.497213100454683,32.58936663956463,9.113581795623238,2.6385270444986286,41.51202515856465,13.89626059022271,10.428782780748925,38.27064741866566,42.5683074367185,10.465403031334686,1.7493027508074466,8.498977109664363,29.304317054569395,4.708464593654771,40.214303440672005,7.5198604688416655,31.55530038564972,15.154682357945703,34.238206121787066,32.388061768521524,39.504126052619135,9.83896539051836,49.98366407590471,23.07583858166439,25.550309418279383,27.641439696338722,45.538246400074065,30.696218584850897,41.66818301322205,6.860507381584213,5.405094212549488,24.63154161276374,25.206358284058894,20.944212746877856,6.7632576323418565,8.931256170698276,31.02810532342716,32.43887371122931,25.527808895202565,30.972986586284556,6.520834047311796,31.750321058256127,27.95157028236379,7.293193532112374,2.3824548715546623,7.356727744385971,21.958441154815887,27.057140030768135,23.229202570659357,35.61239990274488,34.425416236891294,3.2099349691549706,6.176762435010186,41.76216677527469,5.98899752019727,22.260644358467562,5.476204012053243,41.57421472619988,45.91640324622135,29.27539354173384,25.972927616536612,22.975046579541115,41.52856198659944,42.59664830096194,30.77225167013875,19.246682061310082,1.0530285902787928,31.759944107584502,18.693072361219244,36.1044990951747,16.213220854185796,0.11200580181673914,39.87440155418669,41.432419879194335,33.80031311409919,17.035551923325787,38.653816151344834,1.1555090589243533,46.86782333628036,18.45337860268398,32.63371486441634,18.917722218547528,3.1184654626312147,14.665441753477538,28.74074227279485,17.11133249009681,0.661985865077952,20.4969684380059,45.00498906353469,44.225637679757135,20.794519264931033,29.42879141447182,15.347278773451723,45.46655780385218,35.68890438127892,11.683854910233283,34.261190124400656,35.90733738852661,35.72533275748457,37.207200944594135,3.5033025295153397,45.97085651969072,30.251546243846906,11.372018575088394,28.745120922923295,24.997058721822064,7.073576905436951,22.704948346952204,0.25951273145989884,8.603137951834295,31.108066463027995,30.408210195590758,3.409231572561733,18.734044023392183,14.198558322349463,35.96020958465981,46.393119632282385,17.75928242708371,11.591000333497126,14.824850575105575,44.25207614981667,6.142133201930267,39.5627941116673,25.762859222963762,25.39124151375809,12.978589409457719,34.84622715425091,19.157629227876615,19.42264182824237,23.109470121148824,4.098460443970364,37.015994618263534,35.58437420858272,30.436690295486212,49.80161203004916,37.543191012681454,22.159240545150904,32.98801304443296,40.975356259596815,28.809440803961394,5.547850918421327,15.997500316554248,5.114635607017171,15.10338200584479,19.051312025671606,4.612575727959611,13.371274189334247,48.39221859121091,34.0867156660096,34.598033923431984,18.66163801674482,19.716309273352394,49.26340348789401,13.43833649206918,12.174297795397937,32.67166782422948,25.3290519382633],"x":[-186.92236181562828,-154.51554375340913,-195.14877043002383,-106.74016252682921,-180.37460411041872,-189.16024216631314,-129.3203193720445,-120.72046152205864,-110.00297826850264,-195.5701426522074,-191.29609295225836,-158.1247896492032,-179.58371706704375,-175.92968109235295,-173.1342933492217,-133.03604277871,-111.62137155519135,-164.77038774958424,-198.23365725957382,-176.31598874828444,-109.21390115476943,-185.39102354598526,-141.9504458264105,-120.1092975000196,-121.58205185066913,-120.40620976493427,-165.47368229087664,-106.65943684294884,-198.00841233038096,-166.3407344200756,-136.19757772611814,-199.17649942172338,-191.20907222444046,-190.8119125143533,-123.73783604504452,-174.0133678098023,-158.66674346249226,-168.60714825529175,-175.39163272262402,-110.63580893701199,-130.8712370693887,-173.2875509832133,-152.86960202794052,-174.5083421708491,-169.91773088736093,-143.58511643724222,-136.08785832647612,-177.48360050591697,-111.33682620717715,-115.14437445977322,-183.9002980307455,-196.24365372537866,-193.41437812521536,-151.64178837182936,-135.44902337105606,-195.93540088161677,-196.58082946337856,-131.023518167401,-166.12055974842627,-162.29846619573928,-181.6420231198842,-103.97337305568813,-156.32822037264043,-113.65305979534949,-149.06440394480086,-163.390051785863,-116.14019565657388,-166.56489366822274,-146.57499089350648,-185.56496978782445,-178.66342284494573,-167.12882395008137,-131.92523164908482,-184.1502771215936,-170.2611944543779,-168.08564457424498,-118.14695586458402,-183.9744031439394,-198.11778187917807,-156.00123580306985,-100.612964014836,-178.73948955837596,-140.177474458168,-153.11412157218194,-133.37542771729193,-190.49703360405047,-104.14693810983154,-116.80351480312645,-107.51949464157119,-183.95112382404432,-183.71964123492012,-134.19762071804467,-101.88749757724338,-151.7877374313214,-144.776565955583,-184.08403011450233,-172.3852780177055,-187.18894773511786,-140.71314695498472,-198.36032756644434,-177.7821357620792,-197.26943766483484,-187.23114705002965,-160.6746595431648,-154.55342857522405,-115.00822290631368,-166.09205420463365,-176.89263136130643,-137.49009620080508,-139.77472210283702,-108.25814140336773,-153.0291751065913,-126.6624955086816,-136.67859821243806,-173.66545915710103,-107.95006666251052,-144.66841308917296,-178.41971958220768,-128.71388449243653,-129.28301205966375,-116.93766293539002,-195.55571988021575,-172.0262545558585,-137.66833770477433,-161.72457178225187,-105.96744989347779,-183.02483848354208,-181.50530490115972,-196.13276878253527,-110.44133107798343,-161.08711176851455,-161.20438129048068,-126.02549207953784,-111.38996847886573,-173.08157902821847,-196.5308367676856,-113.37843002306778,-151.79154733257246,-104.53195434695087,-180.9123370413587,-152.51482353385427,-109.48075381947264,-185.572651887952,-191.6339051719532,-162.05133023385056,-180.913650945514,-110.78195905986692,-116.12431144925752,-101.79577328793874,-162.10182606847584,-169.1367289948009,-131.2336529237183,-120.55267304728359,-167.58831081631627,-170.2678526507395,-126.77648333250806,-146.99589636989185,-184.16622673329732,-170.77500331154246,-170.30935236737494,-170.97798100037505,-195.17240011613902,-165.27920215697435,-112.53817524972136,-151.68608737780235,-127.5239563036715,-138.77567146468647,-169.4927487153329,-176.22293622619367,-174.21359230021122,-151.38380301764698,-144.1648735188002,-108.43313127393506,-112.99551261095422,-187.31029820540405,-118.78159499868617,-156.7942552438167,-107.98025967587661,-171.44214437393563,-105.49469771284366,-129.73528614888772,-122.50639012033477,-138.56199953091323,-154.58631390492272,-187.3297998677471,-182.7154912598293,-180.34500919193675,-126.13899259991837,-187.11203569482277,-138.5913039244104,-192.28796101865788,-131.63198796291033,-179.41262343084202,-181.98926312669172,-182.76928699887344,-172.46537458367678,-173.59318367179006,-113.26686443422463,-199.33068426626792,-180.84614933295327,-117.17312543947101,-104.38852908656709,-109.70688863590622,-176.8871897193469,-141.56490453183704,-129.22822412134494,-151.92542112549103,-195.72396126701665,-116.58724853527067,-156.5867267888942,-145.96441055206068,-149.15740690590638,-145.50948413430905,-151.9882522908594,-148.70296838798012,-139.3840366704299,-149.09160936587998,-165.81290352130029,-185.85543033340164,-183.54397216395765,-169.7300889010198,-169.04165601372281,-122.46709210559817,-158.29899816827057,-168.19936189118266,-162.1623767088542,-108.55465531484174,-149.28629086100094,-161.07887919772946,-197.0836690644139,-138.6863098164072,-106.81395737502024,-196.18945160040178,-184.65629306608255,-136.71555908959422,-185.02762425309905,-125.13520116944579,-100.11520874442755,-116.13524173801729,-186.95764685930678,-186.38799825709393,-112.69027447654514,-151.83626315282874,-104.74093740438212,-118.75866013640027,-122.06351413081597,-150.18965415489515,-123.3937780731434,-183.78066232405607,-102.2548031053951,-141.2686812103741,-139.79329485094695,-169.8848552692071,-135.81533354151327,-109.67819320867262,-110.76348299052572,-116.57226917524575,-142.12592413969398,-146.64137325334457,-187.2430899237006,-139.24787568104483,-157.95798327486006,-180.60511473065475,-147.67717220439724,-142.59052820257418,-100.0910254989523,-122.39890145320975,-173.9354632215539,-148.37115035515296,-136.70308674660214,-107.09598316989535,-138.85529094334825,-182.27352375720645,-194.5108438063845,-122.13784426498917,-158.09255629110467,-168.83539869812356,-176.84549896696868,-144.0596157186115,-169.05047814187103,-181.37222890350196,-183.64523607040059,-185.40852535925654,-177.40316111231115,-135.6801126362097,-153.00980455033095,-148.13592324687693,-199.6893932308671,-143.97797446657847,-118.42628026573412,-146.39506226839396,-188.04162473427238,-107.37512065404115,-116.96819078222076,-144.27408338164804,-154.59662637449952,-187.58777940241706,-106.64231679366551,-136.92084988276247,-199.8872786990305,-135.93079778005097,-109.82617810083697,-199.5420383188417,-189.32920507457328,-154.2653654974653,-137.56061135806658,-134.9467358842823,-188.71711709205167,-138.93143236887093,-125.02979100849572,-114.90166282548398,-149.42571628666144,-198.6619480577246,-194.5045759436645,-127.12833772242145,-193.2392454738728,-163.77154791106966,-196.34980274075028,-186.43967222019907,-156.52220104202556,-149.5591464882375,-116.96294298377413,-110.99987229052502,-117.44309919034978,-124.78653652856107,-170.7266590715508,-195.63943201216,-137.667920329393,-124.44364466885585,-161.57149388143844,-136.40319580106237,-158.67099565098587,-171.08362894521608,-188.4235076106237,-165.00656089190676,-138.2238098701458,-137.2207588490165,-119.6895119773231,-159.84479278476365,-163.87723371307942,-137.2355178409727,-110.04933519311155,-142.7213093152973,-162.4644814840947,-152.65582275668214,-185.69920187104245,-194.07621485530893,-152.8595354054618,-156.62988076526966,-148.47204123136356,-184.6598598638745,-144.3862459284776,-142.72432154328317,-140.53861212916343,-146.39197211916718,-173.63354493110677,-107.25629241526313,-138.36770046053687,-127.11755948598089,-115.4089357868407,-136.33399526948006,-170.3327868535217,-110.79196369385977,-194.93807507166457,-124.40094233459247,-134.55504294228473,-176.32334462648447,-117.3326322857331,-129.7010372793926,-108.69802915491951,-147.8367571920705,-146.57192382554652,-152.67376895960834,-107.14544960403465,-175.67883046804354,-178.5002646136588,-185.616600764254,-101.70658279414128,-113.33941494663068,-131.64358395185843,-184.39201558342293,-195.19303518276016,-172.32837863750262,-193.70363303722493,-101.04043941703577,-149.20194579964803,-142.2827310213075,-162.32022234704027,-112.98985315647766,-134.5239803699527,-195.2471206466712,-139.18661916796856,-192.52473822181827,-113.70525968959986,-198.38575226684227,-172.0799204797314,-129.26007403565148,-191.68836404084544,-171.4575101345386,-164.89588123683825,-146.3616565365775,-106.85640700860151,-154.8241854013998,-147.49870096488326,-146.14776297597524,-152.37370153776925,-112.29053825336965,-109.6955059619563,-129.67935422735644,-183.36583389861354,-133.05678095655054,-112.82422136422687,-131.72490196806848,-141.0517282622903,-132.26516585152106,-117.59302795426845,-173.1684281770843,-198.60959875354308,-121.4211277571432,-104.86027555898099,-132.73612757899278,-124.9622877539618,-179.1283309081963,-181.9240109011157,-107.52233123415142,-178.14486825687513,-192.30987022730838,-159.72247863341678,-162.3648665098487,-129.71845944893295,-100.49248374429295,-134.79464910687688,-108.876637967906,-167.2134172028276,-193.75461458694318,-106.11138036547123,-146.90404385729704,-112.84343043971374,-173.3757454248306,-191.87830523234695,-113.45973551864574,-119.1774277517166,-108.91984709195772,-122.21391318995245,-125.6293530068495,-141.39201846680885,-158.81334066222598,-143.3980107832235,-174.3244853640204,-171.7016337297606,-167.1944618160197,-112.46908226782928,-104.14989412391971,-198.62731173535445,-112.66051250388232,-189.99204783846736,-197.572281048426,-184.88637513745934,-178.22382178922166,-178.56888614795255,-178.3386328186446,-181.07893475063992,-166.80003621744268,-141.88860111461236,-110.92402940610046,-100.93292412473627,-145.40825692000553,-126.83617409204906,-140.72007591422883,-170.13114513472254,-172.54046501457856,-107.11626129735623,-143.20589531792783,-194.74879978416882,-135.44847306902798,-105.69201701210977,-194.47541991475805,-178.29364889254126,-158.17115501781151,-116.98659658752888,-177.1734817067291,-109.85895552268339,-163.80283546075398,-172.7663695484706,-129.10958675619923,-185.98415121571293,-156.8023395320167,-166.85357755477082,-105.15556312588718,-176.40808263988828,-168.48257689699454,-169.87548473403183,-110.93325352381356,-184.92022943471574,-127.18368388259611,-113.13421970206052,-111.0320261615744,-127.23304902141055,-112.92344715384431,-169.99867643241387,-135.58612936998335,-182.5853123444217,-112.84568539780354,-192.6673391654267,-119.98500547704285,-139.89093075375808,-138.6742322799114,-121.1125061057936,-134.19572987813348,-173.83092640849645,-146.0429804008295,-135.00758998623655,-181.76551053362812,-179.16768717256008,-138.76587420927729,-105.1926761537388,-153.45855244133733,-102.1884059163937,-164.38646899520307,-128.96166641124054,-102.17711280883157,-144.15543108871077,-195.88838604710426,-146.3179360450221,-190.6504701993794,-176.42748396883462,-143.17525465667032,-107.74487885542953,-150.8318895983137,-136.11658118953315,-194.8088942189362,-195.9765732513247,-114.62241009247545,-128.88358939413666,-154.75001182207814,-158.13926841217852,-124.1976822523688,-198.6669714025486,-176.20886175107597,-146.74022815559775,-151.61169003439085,-150.57430290518803,-167.75604380138543,-122.99761665496038,-147.0500369359348,-114.52333061617051,-138.39442731418904,-129.36414463214373,-123.0556810370187,-139.0480077372007,-174.10576201429427,-131.86474486984676,-129.05392576068442,-156.75281188896042,-134.34867662695086,-111.92001397765132,-105.22734355635104,-104.37029435040044,-154.0931572543368,-155.72947432340868,-115.75663406298418,-142.91722704673575,-155.55614237224444,-178.2777519738317,-182.01175063292354,-168.2163271744133,-122.98966735319514,-160.9475453611476,-197.2416413516541,-192.84504668433928,-113.20440246758298,-138.85193102156882,-150.45350381149797,-196.86708850365645,-111.40242895439127,-113.79217141113853,-129.86128644647482,-149.08207646216033,-119.08075895218447,-139.9753048563952,-130.66692158864998,-141.95595245869853,-192.72126754946518,-112.36321231460605,-193.63770106748763,-198.95885899598025,-132.00515725251338,-183.78039031831662,-158.01650478633215,-197.49414808004252,-139.1334323610888,-106.99606212581313,-159.52203420142263,-105.50195014939696,-183.56645579544494,-133.37283493948058,-170.50320540616565,-131.13130593219836,-194.02508975108213,-181.20553543645585,-188.9873552577209,-154.98404690105968,-192.42827754564925,-160.59494202387563,-108.51363994817748,-165.59197298043097,-110.00147472290469,-182.63709175006665,-130.54818117507,-127.18744232068579,-104.81583221805548,-188.3545284769498,-111.77523225851785,-117.3908033871417,-157.3694750887726,-189.83565167356142,-197.08355005511726,-136.56759946216562,-160.75507453263077,-116.33216462992209,-126.12123497057688,-196.65032767042402,-111.36386844719904,-180.33127634847614,-115.71769055541256,-168.06943582581243,-194.34617810183934,-136.99571180017665,-134.21680641502365,-168.3930906587271,-113.72756169377118,-160.70679796300024,-123.91670447477847,-159.0111338451706,-103.09903762465377,-159.94832655002705,-187.8828743871449,-167.16818164585965,-163.7960237538316,-128.70573447107802,-167.40602786422812,-128.49496581193392,-108.29149162334197,-146.04748577256373,-163.73081488437236,-122.93233672561747,-154.53901311694165,-102.05663477117974,-194.62611758428415,-136.83523116083143,-144.92083112898877,-177.7485372508059,-118.1920575373677,-174.5573151203131,-156.85988959345954,-120.65558416212482,-169.2339504005351,-178.17925235103309,-133.11184615834782,-192.9317277547221,-123.35934938426601,-123.22713242905627,-113.70677431560618,-164.0363459133533,-123.58264104497367,-120.0911334107171,-138.4661453280177,-160.82012604177044,-181.3189852433755,-141.69881090282811,-175.56830002969852,-147.8066568500493,-193.40771655742145,-136.18370867704536,-112.19080618094954,-102.65955976483774,-107.68230028628156,-179.7025778663275,-127.32368180585243,-126.10609252139425,-137.00900180018695,-158.97644482991032,-151.2304481889009,-161.2851877389203,-169.4704591804723,-133.0265348534207,-193.25776728930202,-173.8783270093974,-131.22237992579744,-123.26791441450462,-150.45504177200095,-139.30812552116652,-119.48012347329747,-156.4386856103889,-109.09298905498821,-115.36290019673343,-138.88719235781602,-171.2149541905173,-109.1568018769016,-147.27775724243799,-158.71003865691597,-156.54829500728957,-196.59192633646003,-152.82494849508254,-136.74867023596732,-177.18769508316154,-106.5042822668955,-124.07768891139197,-178.94235579339414,-111.70505496093426,-128.0410597448542,-166.58031269651553,-104.82120395850161,-109.70220766083676,-123.1863621494838,-133.6342623910595,-116.64892907763509,-104.05503022549611,-137.64730159682549,-158.7573933519243,-160.15464116184455,-146.60255945507487,-106.38484820467538,-178.3739563854698,-184.90216101084496,-162.3306327970961,-164.4628083409424,-192.8053008311347,-127.77487126491746,-119.94173033731848,-137.26220270266398,-173.74629892692587,-154.2684499686228,-115.04679230911263,-146.69997783111177,-129.1583512757535,-176.00602901605853,-174.73067238879784,-138.57082310586452,-183.91765070097603,-184.63634409777853,-144.19446058967415,-176.3633545331895,-160.00535355017968,-147.88080212051185,-139.5836764363017,-179.25330593631196,-150.3492841846017,-156.44900498409382,-149.70557136300528,-186.03349403696697,-177.4429041938172,-149.85589800814265,-128.58247824603683,-192.8568971377237,-183.98219998495767,-176.05069141662028,-103.11871525658927,-173.732425582825,-125.43257971943578,-152.0926941332616,-118.70031714095872,-179.11860033366102,-140.80152611402758,-144.20833626484836,-172.50312049555515,-116.464466562176,-106.45782509924541,-164.82988860565814,-188.70394917162923,-121.21800930332618,-193.35682924816408,-196.92215151044473,-119.43542074194954,-175.90203063988935,-192.53258710750055,-135.43531016719618,-140.23165077672707,-113.63845311452148,-184.691380377596,-156.0166873748799,-186.86052379158335,-102.31601782176377,-100.96580018654329,-141.95217737645763,-100.6910279710034,-144.27953199835406,-100.14187062567021,-131.27693787989318,-115.41216813926545,-160.07605573844074,-159.38632941120798,-181.99351576889907,-137.91887811229364,-116.53614103261782,-126.51573779794502,-144.20094122561682,-149.1811581851681,-179.80727896729752,-194.01391304308981,-122.05720528901605,-184.35313049958714,-118.35426187971612,-146.1358231630162,-199.48441961226254,-161.7364111531796,-181.16585116907387,-137.1592359126422,-179.68288340734733,-152.99324336972978,-171.2062547459183,-156.36450514730737,-119.48640576652159,-178.5292148052328,-178.48469689735768,-103.5393575196912,-108.99440150566532,-188.92430154476224,-128.91665459130226,-134.82126464531035,-101.95655845856268,-190.45354089810172,-186.15001667483023,-133.29040986026325,-147.71787245380233,-170.31110580922586,-115.95658008300849,-124.15874654331176,-176.36130963754988,-184.07870422286302,-100.23133608934043,-172.57929105102968,-191.93601236276587,-171.69472973122163,-120.51840696441253,-108.37325316295818,-165.48853499697748,-107.83246714455652,-182.6224686129959,-199.15149497062222,-184.328885248225,-185.6192508683075,-166.39834352010007,-121.26143429633656,-190.38850629482397,-161.06464644375194,-158.50828244114834,-129.2315786551253,-155.30133214014865,-170.04884862685526,-121.69499729162045,-182.71422993183904,-108.06606105306327,-137.16631598734284,-132.4521104954361,-117.83533515776257,-139.5820751207043,-140.90567710779348,-191.4073959420764,-111.53313029830687,-154.80413445295278,-120.09663988030313,-198.5531705490687,-140.45018860496768,-119.86987895208104,-124.30868896532905,-160.8052848917173,-135.02342307366226,-145.67174125376272,-173.82872093372484,-161.7185614838204,-144.24575116165653,-138.17287131118016,-119.307380092109,-159.52234948901514,-122.5225449616066,-115.9441334881545,-137.44255052289975,-161.53906880688862,-106.36489533978842,-136.207272535781,-134.57676056074934,-175.1367695900459,-189.45231042237546,-108.7817538747336,-175.68447992334868,-190.73549024045215,-101.64706051865082,-180.55341289765917,-119.52519138999156,-184.53781618731472,-141.11057904325446,-186.20174898821864,-174.98130921143346,-172.32501976638144,-174.46457957741245,-102.01470262921914,-161.44922104388536,-126.31848593815818,-102.74622052971397,-174.8611701917663,-177.37073284387296,-166.67016556353127,-101.71234904560373,-148.58754792502052,-162.1945796714361,-137.5980229721539,-161.54609119551745,-134.38929748856665,-130.76800566408025,-114.34903800430729,-116.67206634972844,-162.96275609126766,-125.42564505136457,-102.10816198402186,-193.91449107330146,-161.8606176614389,-144.10175677860465,-148.4671698930996,-146.80628811917038,-179.78058861043203,-115.75374119742688,-173.10186694747443,-157.23263456351816,-175.91358897974004,-152.41437477222325,-193.46353979463328,-105.2898011870553,-165.99806379971199,-158.6878688434615,-143.63096815134458,-180.96620438630003,-135.58982074063312,-124.32847807811072,-147.09201562343003,-168.61541592423617,-178.43340148490927,-114.91078980870259,-149.57192154079553,-144.04196062711037,-123.9242141240287,-157.83973754506394,-177.4489434902333,-187.28730938805904,-120.53689269973174,-143.6265212568387,-154.94728738018136,-108.15925353353946,-149.32301238127525,-166.11824896014872,-131.6370824933713,-158.78031332587565,-128.2099186418444,-187.24013371667286,-176.23646546418837,-140.95711191376608,-135.69142837240847,-126.28826982615556,-151.9767700129494,-104.17426239343821,-108.80468606173599,-139.56363114512823,-149.31915955771376,-112.08728598304118,-187.44622551473907,-149.83035113827862,-149.69869701403505,-148.81261372630286,-125.07444997660848,-161.64088502619458,-155.08722861693298,-160.44194145538205,-183.18937514539022,-156.90047417311473,-106.07817306645266,-138.5717952651937,-196.13338859578425,-153.79809066188096,-165.71978766936328,-119.6391307453881,-182.03927179292876,-111.03556499892879,-155.27889769098852,-131.23349936837036,-114.75358628429156,-130.04076336494046,-134.13574842805917,-153.9702871092698,-100.8936199153877,-108.89331007462195,-170.37303031879924,-141.7907649833246,-165.2602359617274,-105.77290405199808,-121.37406699164481,-107.43049463306127,-150.43082252175276,-145.5179536284235,-119.47057308757145,-128.67367420068143],"gamma":[9.732673688662219,11.398358383268349,18.854232332947355,0.41858348676145685,14.50504714945919,12.470999745370634,4.433212120538186,6.080408168314877,14.749722428210262,19.267652575266116,2.3626456943774565,4.649819157883672,18.025399647789268,18.306665533569316,10.451328725761297,9.722489349669189,3.624464436904047,2.7269162382021728,2.6965699714922,2.0979475505751743,6.239855039167832,9.925259623372767,11.935297039478044,15.249098565206873,0.6814125326079123,0.23103633230545206,13.90263293974321,9.749799761337892,19.631289731213528,19.13442987093034,7.7413905543207395,17.97782207158031,14.761024364705694,3.230975465148158,3.06748717081764,7.095146594675916,5.415445968123498,3.434048636719975,2.3068460404490265,12.440595134717896,19.94756879666291,19.51040228651084,3.182851087389933,0.4271815352253405,5.932233282256987,13.063897235918681,3.5915996606009726,2.1988738433622634,14.43773914660721,4.276982725102867,17.223307557492035,18.819080469970867,12.146613846256177,7.782819752662178,17.810080867302105,1.080045774989471,13.45221677323087,11.551393482303771,18.170710565806335,14.853184981307631,19.18540467841357,10.882008784147379,16.117455164411624,11.933835241878196,6.78717891956476,13.953296859954548,10.725444642123385,12.742677962040702,8.14024151605112,0.3896929868518928,10.14241600653686,7.843703226672356,6.3067417195347275,10.463849575412079,7.626109513339996,15.281948916384462,11.363515133890836,7.514906323258521,11.332464844097284,6.045863317452946,5.368566089258642,16.18524353869568,4.054834775262219,7.618082365765204,18.530236806441394,6.195415287522619,5.724065028873415,19.847159111787363,1.4951136141095178,7.620487551170303,6.295149707604093,12.950876086571927,2.9571783640307325,3.884776567589423,14.508322045857742,5.883816763931633,19.736352284084454,15.896238929951725,0.5076565706179004,8.949246580291161,7.169410306903443,5.004767191579251,19.56960528696126,3.2130944963561614,16.277042744176402,19.141923594776806,5.186351441710655,2.7834209064239923,16.298701350346644,19.472044116623,0.7281672441605469,15.071820365290392,1.2886680246281035,11.809501740048507,0.8267213931794881,1.2470508942487957,2.7772123554985573,18.937824379804905,13.958611580662467,14.004794752917316,1.866678010659899,12.340774519567802,9.093409558319635,13.577109054464724,8.002299335083931,10.77167608524389,9.305026519774131,16.979180003284952,19.070128103408884,18.23570171435895,12.100969558787614,6.422453805316639,8.785424830508028,11.590635979063508,2.069650567294805,9.915429523936968,7.505146014702002,19.88573733503415,12.252054309356225,0.6081086114992118,4.26274879985475,6.69258329530849,8.089726322718885,11.138278292968531,8.481722837096148,12.265512100655052,19.273176488143502,16.81878964294263,0.590673280366909,9.342457619911144,11.114142688722929,12.361792416767244,8.56838063316259,6.206733978507226,1.8235022501242826,12.630858933707465,13.893439130353036,14.4513481709715,13.9293042884366,14.947586757408867,8.876507989072024,4.646136786225523,8.838941938781275,1.545204075123534,10.303119866314109,17.27486951953596,9.025039414775748,7.800303324233684,15.51369298991041,18.716976484403126,2.7811694828192834,10.400290133737254,3.235410635775051,18.81336922013587,15.868797149848334,13.714822862193884,16.694015584185852,8.618406526237425,6.591743573454885,15.144136084402344,10.015522450751329,0.1450239801250719,6.7540276218165785,5.737817839672483,5.585071454906658,9.760499207346696,15.89776008540143,15.214205410907521,1.1473304527917172,0.30754996196549644,16.007087208383886,1.2479915110630868,16.39655179996517,0.7403544155327557,1.673083838589231,6.6712430905511155,16.937815922261347,8.70860226765223,0.41344094686667,4.66405244329922,10.791559149877514,1.52455203113393,16.818674786627025,11.745181453650666,3.853488628655839,12.44915214300088,9.827105249899608,0.887733054960842,14.098402759810988,5.662199937697059,16.441062127955952,15.3969407861128,15.955571170713906,15.716420411353496,14.38506578693557,17.751504563607085,9.147796099751542,14.841269601593723,15.963896265415208,4.012664450673453,8.472725754341969,16.617290541294906,8.275971109563049,11.394930139370224,14.588966085539505,1.5456740833705984,4.054336409737362,6.9415899734086395,9.973711011478343,7.705043732675434,3.795852734487517,1.8190626767789642,13.528433454918197,16.368764606085506,0.5209787824002543,4.937120588203716,14.440808988872211,5.5831036325315075,15.849665012094803,11.286089882488763,14.167389056459342,19.202652979356216,11.156710814023612,18.65152175149749,5.955331977914469,1.5629421566960744,15.963248941722448,7.1849889175580195,4.428847706610366,8.197942035301761,0.4584550779830687,19.323930257228405,3.3788097018171603,5.309263999689526,4.8652757458397256,13.721323532066393,17.156376178819755,11.369261909931808,0.23756382176604696,12.641665854136015,4.043800158731723,19.098365695838492,19.311777048354312,18.311786116765937,15.00917425471265,12.969764117195819,19.387434711514725,17.930247379700823,2.987594003984375,16.535389854024846,1.4405581171971793,19.016026534682368,3.6925952524998262,0.28425062217192654,18.313736651675182,4.814767295058338,11.467542113159212,13.134146861189508,15.556547568800543,19.138198709512334,18.300951172802943,16.236292472493158,13.501873849945301,18.015692225961036,4.426378094196823,18.064718817740566,13.77714541348562,10.843150624749853,3.5562283579644616,10.565114593401583,13.37429010105172,10.640897723976671,2.1760650418925076,4.559466776283356,0.1289443492853648,4.708563510782207,18.595038538607383,1.2390162537668825,3.4069500265386754,12.050245324430321,5.530947744822927,11.913292703242316,9.162456362986324,9.044649218193324,19.32577591588544,4.210784341409992,2.237786499984926,16.304237171888115,16.3118873327538,16.477407448485756,6.640387889252293,19.2194966583287,12.194961401679599,12.974124151292035,1.63035491286748,9.418066697905815,13.97192066452494,8.220697099651746,0.9597858548175608,1.8938761715182473,19.879623981359458,4.136361493502108,11.926611817239895,6.835990838107602,14.699109003821134,1.866022711467541,15.111690691806889,2.7464089297453853,1.3983002578306358,8.37151249893508,3.148589524989762,13.881712115274286,10.869568294379777,2.640770308217242,18.874970275430574,0.819402968400702,7.148763688018849,16.495586232718328,6.821546963583263,5.211882018225817,16.98434492764561,4.398283161214658,5.40864280058623,4.968867712647125,10.19675159002655,19.07819196551847,5.828364157607808,6.0877950773129585,10.379322184814885,17.093532953207276,14.89133316900418,3.731229071736446,9.05929885957898,19.90797638928632,2.621062463181687,13.636787477350477,16.924401351285123,8.335962193297748,6.73768587258273,19.973429898078283,6.633042018920832,6.299782348506842,15.996130057339645,0.08847004552090976,3.1248407322095906,4.54348173644445,13.658372017086355,9.574111520978828,16.95147004476943,3.723677188475487,15.530823607358212,18.171143406709533,7.482913450244868,9.68769560202265,11.604853308231355,19.745272896117676,17.559838681260107,10.314516251978777,7.6174346281122585,3.1121002121619634,17.173051428707108,18.368334158071743,2.4979544340886983,6.9588115715110765,15.55588436349539,18.701785092055005,13.630700702576743,4.832359456719728,8.293116962343948,8.148148971218596,8.023383273280093,19.074540529545942,8.707149280704023,5.430356472702993,18.667226104560207,10.54224784971423,0.2067539513296035,7.460808240431529,4.309376737724637,16.09383522598708,2.436761675339487,15.482909347075879,16.447819335152435,1.1644961277492616,4.769246110342595,18.964447972694217,8.723213202960242,14.653115825381775,2.685892747388716,19.16029105811887,11.748251203967532,8.995594987518047,9.857154308631051,7.373142633555281,17.583527759683903,15.494411021163135,19.270099878069864,0.44571470533408153,17.567674341711182,4.410184750125037,2.845188223503432,18.195380656193617,18.27681291662316,16.927407504297687,14.135469592873772,3.712180114571786,10.053719594470959,1.9584524847235185,8.990645790441366,4.844357549275671,12.789933685118587,18.014193966190422,9.86180661543556,7.275845277847575,10.904211271379332,2.7098374043034035,15.066629786633964,4.774451798625803,13.642692742814209,12.481964025103046,12.378309344303648,17.63171113244756,18.976212703815065,11.746377362241255,5.976522757813947,1.7889609865823486,0.2519673784372012,3.8323399119743273,4.276235630516818,4.143342844387927,1.2776988032249648,3.0336621069822334,4.865097607312334,13.837001330483933,18.677020651780403,6.402428831938498,18.724619171091827,16.11955721685618,16.730562179245663,15.873741159005732,4.842255844414898,10.587043893554547,3.101403905135145,10.863169975015774,9.756485332383171,5.631424444984048,1.930786334159209,0.049714711812098855,1.6480708050403647,3.5182304599441894,11.993758421561061,16.105402769981232,0.23726712427057262,2.0723043662407337,9.646849543665358,19.056822856285045,16.558096394911477,18.739134753871618,14.219660865195397,18.75883745167549,5.180408082529699,17.187040476710553,10.19943340209978,7.022146868903967,0.47606443985793057,1.0815089398173239,12.620249208305413,16.80813751716139,7.245377885058901,10.991769670500307,18.993792716545997,17.32651229237223,6.909839476316582,13.072983076459682,14.499483963265195,2.262964393601159,18.528982559517658,2.501902668261855,8.203687723630328,2.588218428678064,0.6756866365833059,8.19077493007638,11.422380156815848,10.745187820665913,18.962288998902213,8.875407011138329,12.138255167969604,15.402758293921357,16.220442773678357,1.979855844791798,2.5593599469637818,18.160033660404046,16.540275802174826,14.43406390651829,9.474381860714146,10.873193522201813,19.011163762315533,8.31322676740458,7.037142713081006,3.698743162423015,2.3231585998565496,16.428670617012727,12.884865159110568,6.26723828457294,17.86056916038708,18.877654601313928,16.484239809918066,2.3260239915268155,8.510048128925195,0.658668018146682,12.377204692902053,8.324804280895833,19.878294584665014,2.854870867247583,0.36066068888848335,12.94745478777176,12.655544396262943,11.899716963311938,7.843528139884577,15.757758807231355,9.260453645012529,11.835392794644433,14.774001665142515,12.724054163592609,3.288534281115494,17.829852077247704,1.062876556841088,8.311706495291617,19.067928543692766,0.21139796024050916,18.673097346647666,3.440948684671099,9.971413008560205,19.698043923261586,5.772119595791065,15.249352628492066,0.7991109776757099,12.822987058298793,16.53828287939752,13.406439528009688,13.659622950953704,8.248132209950093,17.22012017678622,14.23609276014627,9.524204588691525,16.019038900911987,7.401920671911748,5.442610729073265,2.876739510700257,11.884845329317852,1.0253257613692934,12.314335154199227,11.379100765095096,10.111223555049026,18.815471475730575,7.93634450649729,19.287444814245454,9.381613603999511,15.707223384984301,5.622829244830649,17.97802591035712,4.486168410299847,14.94356197896014,3.3843793691160107,17.503573089648974,1.02007572047762,4.943687143328255,3.859881956443867,3.6696463768394283,15.23761768254821,0.01622204445110853,0.14141188262060567,14.395606720965596,10.451277169498505,15.09685413176081,19.50828734825921,7.635543515454222,5.642042281252331,17.737265028294473,12.534654541310504,12.113351991451019,13.700004861164818,11.499013420371105,1.4779800774336493,7.55002192723365,4.890738049478793,5.713391491201714,1.4676636950078903,16.4494688412384,17.248849362793386,15.891429051116784,13.437419282223955,19.413712631506876,15.460697782927895,19.428113991233683,18.39624111414747,0.43191083406584063,8.63241088261029,16.255177536687555,9.736665628962395,8.113843294688362,13.362676445597668,15.916918640552895,17.849618580414575,12.387382159996498,19.463731304618772,11.598268903703497,11.637913927109027,17.45321633830233,17.93077857811308,4.020417854552281,7.460369373431011,13.520007873930782,14.335355412119819,6.959297480974924,3.49134943521205,10.560499053144724,16.49568682870666,1.3659998240205429,5.873618084556673,0.974543238302541,13.985933761556195,4.317298992812235,5.601822290761556,8.10613104086415,2.3916663907019675,1.1656564633759547,5.760093540434474,18.252175183972604,10.025539707071506,10.784109948745968,17.439922817544748,3.7124074428140297,18.49548141529628,16.249574559881562,12.25089661466538,13.306567964402994,16.104497746225373,14.486164811465692,11.354785376561933,0.39065857335451426,0.4530883506018757,5.9298343806643405,14.942950400892784,5.9545284552113475,2.237062595442185,0.11979701840003187,5.205718350689219,12.705906942400684,15.794596783998095,9.41972671483843,6.305163200226751,7.936770041112187,10.470862406298362,17.564067643863485,0.7296705748819132,19.856325496959926,14.04046344025771,12.635743647975847,17.935126248042927,12.168056910068884,11.051440561126093,13.919590111416449,18.905267885521212,11.33811649167001,17.019404179832,10.905067308091368,17.58081089316327,11.30187305062616,19.137167339681525,3.853410589217847,0.8232152350746746,11.170888927101963,16.013354758970138,11.118165925533186,14.196287605340366,1.1827983917981078,3.645008027688883,18.686228752390143,6.2659788467006505,12.871452388667972,2.347051007620604,15.162343912634114,9.800782110253348,1.4845997043633785,9.52082707619628,17.245285120679004,8.037342046340687,4.74054715759753,3.306325098074301,19.518036997626098,8.163234119815886,13.999327369844492,16.499094158446383,18.18385142466034,12.146003488086755,4.402786409934758,15.146353219284624,18.84482820919361,6.45270723282064,12.426037131819667,8.808703723719757,15.058447926047315,15.929004365436183,7.521899126532885,14.068615339817917,17.86082814635047,7.875695825419711,9.673130144516634,0.4355628630501629,11.377008925444137,7.160945714255393,15.320824984976827,19.09237516850837,7.5207690875935995,7.813589524124107,16.8174806216433,18.282281863674022,10.855382178201523,14.867641612103458,1.3137048602275758,11.134099768455012,15.815438847628517,19.41692954569687,5.116903765504217,19.978771952951817,5.009611001927836,12.36070106032324,3.6536017146802147,5.66699953781908,11.114491310658927,10.384957864498489,19.57288678135346,12.741290638069533,16.21299049581821,8.35611366847132,9.771151760602109,2.9493434019303955,2.5005975522244173,13.374787193350258,3.5298276384066707,6.133721214589856,4.271954079711935,8.661351418024864,15.661810514253638,9.88414950158674,4.04801898993377,12.575184154995824,18.5288458532513,19.03020673298154,12.086158827251637,3.2346264693183446,3.9737471079733133,12.197271389797324,14.962712537168116,3.7234434970003027,19.644796934487758,17.088970337890363,10.424777190003338,16.30755669637186,2.3304294706693973,9.90204412964642,13.7127841190995,6.247423302179316,11.560652019245792,5.150671130195419,8.726114492620404,17.40891202369471,17.90574719164484,10.95325881982574,9.642471858005436,8.363117951808054,18.753921428829365,5.416197803615681,2.667546313941078,14.440223761965601,5.842365446082174,6.055748844326243,14.71193766169177,15.71016543916869,18.366027459906668,3.781347618141093,12.91090066562479,2.480578817313557,7.018401232233993,3.283821439458352,9.813485385193488,8.160336358154655,3.3773398016088407,15.772555222441355,2.6092532526495837,10.453362714812812,11.823050021608603,7.792942401626113,19.794340825258118,10.842603669944516,2.1561084747830117,7.9513703522537105,6.272876366653035,0.25476823958582084,4.779663109029055,1.9048104763821483,10.52281049472441,14.020185840376683,11.120086976816896,8.83823057721068,5.904428626486515,14.958874198035357,8.628387745723852,10.895466848396635,7.4658455557595405,10.147588327039347,6.098301737351446,17.40962730287791,1.503927309502484,15.39306203623541,9.101583410274813,0.8457704498664009,11.06663905184047,8.176960934359997,12.75682216532699,9.855532043630673,11.902944528013952,18.57580753062997,1.3562295414136027,7.31394621223854,4.394326458494593,4.795835940590711,19.229852840541565,5.409927670853869,7.092583228557863,9.332153841835616,7.667722926699092,2.2040699987654833,2.143485618542571,17.356645992385612,5.642366048171232,5.4063439742971875,6.214607584565233,18.864721268950415,6.883634289569356,1.5210194069767047,0.7354871289969678,3.3822489889091534,12.789559614579375,19.66881542258873,8.397366348212234,16.431281728992396,1.220378115017522,3.7103841653969205,3.629074617348569,19.752013682713642,17.775786229439532,6.780760596773714,10.741780771932433,15.84763551715644,13.169094296094004,7.1890213766056466,10.983978011721254,16.421779779798747,19.267888801539648,19.495984424652057,9.836980577402986,12.911987695180883,16.331019474663044,19.837244492573358,0.40938342797921745,4.585833622204807,4.253940461885621,3.4151402428754363,3.002694815746354,4.0014518902244856,1.2166227982413158,2.932051403674718,2.034401438811897,2.592118709475053,8.365039974507793,17.11898840881907,18.774937224628168,13.944478510446675,19.37001430742894,12.063557170994335,17.566949091058955,16.1186589106711,8.768726814147776,2.1755176389962294,6.474614249445745,19.263742853428674,17.24638261388722,11.004676193653967,0.8431333921673767,16.46220463984076,9.91872134703037,12.165972808423199,7.445832144124127,18.96390734905882,10.088978515088298,17.641717489828462,18.772677130720435,18.10923847188944,13.860286921861992,19.922267685181705,8.350902861792111,18.5730053674728,6.155414901922733,17.827542942479845,7.998558873683002,4.286647747052097,10.684346103401957,18.167546936923266,9.73063853831389,14.564486546996939,13.471761305057402,5.136942807905869,16.274403324058888,12.99099236390063,17.917499558081175,19.049547787540714,2.706606450477862,16.216502142724828,14.993313088881926,0.19836098064270224,3.489306187970209,15.607780299206762,1.7402604801767119,17.367127319835113,7.963440480491091,3.60455777879344,2.216284035166516,9.22919324380539,13.693210748856227,8.207061589148172,18.927304112404318,7.709971460960738,3.682306821297221,7.043062223547523,5.551375589856087,9.477913820506632,5.822048347932607,10.231091738165695,3.72089756834709,9.465846315027854,17.145136705410223,1.387323486795644,10.223902852661713,19.241626199038492,19.35709754309533,2.9528670797678247,18.703706695925778,6.280053966951309,17.313730347411965,8.837917013281334,19.555926019434256,15.954101709878659,19.868258450420644,5.333042980650222,16.195872404255603,12.21427869933784,3.4636734857097284,1.634354330436465,7.162009835492373,0.5514458657635002,16.785167687116505,11.277839415119058,9.02103531062437,16.62587802284412,16.946527650978695,18.954071957200757,2.6753244654482966,17.324311032219292,19.353147224106642,3.1249558173645164,10.68955355952086,14.063808055047682,13.062906892738319,11.761701503335416,19.37854657028153,16.402520511907966,18.877328338901172,19.609944618078007]}
},{}],118:[function(require,module,exports){
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
	var pdf = factory( 0.0, 1.0 );
	t.equal( typeof pdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, 1.0 );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.0, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `x0` and `gamma`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a valid `x0` and `gamma`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `gamma`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 0.0 );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, -1.0 );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( PINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the pdf for `x` given `x0` and `gamma` (large gamma)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var pdf;
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
		pdf = factory( x0[i], gamma[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0: '+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given `x0` and `gamma` (`x0 < 0`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var pdf;
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
		pdf = factory( x0[i], gamma[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0: '+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given `x0` and `gamma` (`x0 > 0`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var pdf;
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
		pdf = factory( x0[i], gamma[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0: '+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cauchy/pdf/test/test.factory.js")
},{"./../lib/factory.js":112,"./fixtures/julia/large_gamma.json":115,"./fixtures/julia/negative_median.json":116,"./fixtures/julia/positive_median.json":117,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/abs":66,"tape":253}],119:[function(require,module,exports){
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
var pdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `pdf` functions', function test( t ) {
	t.equal( typeof pdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cauchy/pdf/test/test.js")
},{"./../lib":113,"tape":253}],120:[function(require,module,exports){
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
var pdf = require( './../lib' );


// FIXTURES //

var largeGamma = require( './fixtures/julia/large_gamma.json' );
var negativeMedian = require( './fixtures/julia/negative_median.json' );
var positiveMedian = require( './fixtures/julia/positive_median.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, NaN, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( NaN, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( NaN, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( NaN, NaN, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `x0` and `gamma`, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `x0` and `gamma`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a nonpositive `gamma`, the function always returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 0.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the pdf for `x` given `x0` and `gamma` (large `gamma`)', function test( t ) {
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
		y = pdf( x[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0 :'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given `x0` and `gamma` (`x0 < 0`)', function test( t ) {
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
		y = pdf( x[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0 :'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given `x0` and `gamma` (`x0 > 0`)', function test( t ) {
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
		y = pdf( x[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0 :'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cauchy/pdf/test/test.pdf.js")
},{"./../lib":113,"./fixtures/julia/large_gamma.json":115,"./fixtures/julia/negative_median.json":116,"./fixtures/julia/positive_median.json":117,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/abs":66,"tape":253}],121:[function(require,module,exports){
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

},{"./is_number.js":124}],122:[function(require,module,exports){
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

},{"./is_number.js":124,"./zero_pad.js":128}],123:[function(require,module,exports){
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

},{"./main.js":126}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{"./format_double.js":121,"./format_integer.js":122,"./is_string.js":125,"./space_pad.js":127,"./zero_pad.js":128}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{"./main.js":130}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{"./main.js":133}],132:[function(require,module,exports){
arguments[4][125][0].apply(exports,arguments)
},{"dup":125}],133:[function(require,module,exports){
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

},{"./is_string.js":132,"@stdlib/string/base/format-interpolate":123,"@stdlib/string/base/format-tokenize":129}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":134}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":141}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{"./define_property.js":139}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":138,"./has_define_property_support.js":140,"./polyfill.js":142}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":131}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":144,"./polyfill.js":145,"@stdlib/assert/has-tostringtag-support":20}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":146}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":146,"./tostringtag.js":147,"@stdlib/assert/has-own-property":16}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){

},{}],150:[function(require,module,exports){
arguments[4][149][0].apply(exports,arguments)
},{"dup":149}],151:[function(require,module,exports){
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
},{"base64-js":148,"buffer":151,"ieee754":239}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
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
},{"_process":245}],154:[function(require,module,exports){
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

},{"events":152,"inherits":240,"readable-stream/lib/_stream_duplex.js":156,"readable-stream/lib/_stream_passthrough.js":157,"readable-stream/lib/_stream_readable.js":158,"readable-stream/lib/_stream_transform.js":159,"readable-stream/lib/_stream_writable.js":160,"readable-stream/lib/internal/streams/end-of-stream.js":164,"readable-stream/lib/internal/streams/pipeline.js":166}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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
},{"./_stream_readable":158,"./_stream_writable":160,"_process":245,"inherits":240}],157:[function(require,module,exports){
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
},{"./_stream_transform":159,"inherits":240}],158:[function(require,module,exports){
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
},{"../errors":155,"./_stream_duplex":156,"./internal/streams/async_iterator":161,"./internal/streams/buffer_list":162,"./internal/streams/destroy":163,"./internal/streams/from":165,"./internal/streams/state":167,"./internal/streams/stream":168,"_process":245,"buffer":151,"events":152,"inherits":240,"string_decoder/":252,"util":149}],159:[function(require,module,exports){
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
},{"../errors":155,"./_stream_duplex":156,"inherits":240}],160:[function(require,module,exports){
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
},{"../errors":155,"./_stream_duplex":156,"./internal/streams/destroy":163,"./internal/streams/state":167,"./internal/streams/stream":168,"_process":245,"buffer":151,"inherits":240,"util-deprecate":261}],161:[function(require,module,exports){
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
},{"./end-of-stream":164,"_process":245}],162:[function(require,module,exports){
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
},{"buffer":151,"util":149}],163:[function(require,module,exports){
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
},{"_process":245}],164:[function(require,module,exports){
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
},{"../../../errors":155}],165:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],166:[function(require,module,exports){
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
},{"../../../errors":155,"./end-of-stream":164}],167:[function(require,module,exports){
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
},{"../../../errors":155}],168:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":152}],169:[function(require,module,exports){
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

},{"./":170,"get-intrinsic":234}],170:[function(require,module,exports){
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

},{"function-bind":233,"get-intrinsic":234}],171:[function(require,module,exports){
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

},{"./lib/is_arguments.js":172,"./lib/keys.js":173}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],174:[function(require,module,exports){
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

},{"has-property-descriptors":235,"object-keys":243}],175:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],176:[function(require,module,exports){
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

},{"./ToNumber":206,"./ToPrimitive":208,"./Type":213}],177:[function(require,module,exports){
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

},{"../helpers/isFinite":222,"../helpers/isNaN":224,"../helpers/isPrefixOf":225,"./ToNumber":206,"./ToPrimitive":208,"./Type":213,"get-intrinsic":234}],178:[function(require,module,exports){
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

},{"get-intrinsic":234}],179:[function(require,module,exports){
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

},{"./DayWithinYear":182,"./InLeapYear":186,"./MonthFromTime":196,"get-intrinsic":234}],180:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":229,"./floor":217}],181:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":217}],182:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":180,"./DayFromYear":181,"./YearFromTime":215}],183:[function(require,module,exports){
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

},{"./modulo":218}],184:[function(require,module,exports){
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

},{"../helpers/assertRecord":221,"./IsAccessorDescriptor":187,"./IsDataDescriptor":189,"./Type":213,"get-intrinsic":234}],185:[function(require,module,exports){
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

},{"../helpers/timeConstants":229,"./floor":217,"./modulo":218}],186:[function(require,module,exports){
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

},{"./DaysInYear":183,"./YearFromTime":215,"get-intrinsic":234}],187:[function(require,module,exports){
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

},{"../helpers/assertRecord":221,"./Type":213,"has":238}],188:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":241}],189:[function(require,module,exports){
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

},{"../helpers/assertRecord":221,"./Type":213,"has":238}],190:[function(require,module,exports){
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

},{"../helpers/assertRecord":221,"./IsAccessorDescriptor":187,"./IsDataDescriptor":189,"./Type":213}],191:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":226,"./IsAccessorDescriptor":187,"./IsDataDescriptor":189,"./Type":213}],192:[function(require,module,exports){
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

},{"../helpers/isFinite":222,"../helpers/timeConstants":229}],193:[function(require,module,exports){
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

},{"../helpers/isFinite":222,"./DateFromTime":179,"./Day":180,"./MonthFromTime":196,"./ToInteger":205,"./YearFromTime":215,"./floor":217,"./modulo":218,"get-intrinsic":234}],194:[function(require,module,exports){
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

},{"../helpers/isFinite":222,"../helpers/timeConstants":229,"./ToInteger":205}],195:[function(require,module,exports){
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

},{"../helpers/timeConstants":229,"./floor":217,"./modulo":218}],196:[function(require,module,exports){
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

},{"./DayWithinYear":182,"./InLeapYear":186}],197:[function(require,module,exports){
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

},{"../helpers/isNaN":224}],198:[function(require,module,exports){
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

},{"../helpers/timeConstants":229,"./floor":217,"./modulo":218}],199:[function(require,module,exports){
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

},{"./Type":213}],200:[function(require,module,exports){
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


},{"../helpers/isFinite":222,"./ToNumber":206,"./abs":216,"get-intrinsic":234}],201:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":229,"./DayFromYear":181}],202:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":229,"./modulo":218}],203:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],204:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":206}],205:[function(require,module,exports){
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

},{"../helpers/isFinite":222,"../helpers/isNaN":224,"../helpers/sign":228,"./ToNumber":206,"./abs":216,"./floor":217}],206:[function(require,module,exports){
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

},{"./ToPrimitive":208}],207:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":178,"get-intrinsic":234}],208:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":230}],209:[function(require,module,exports){
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

},{"./IsCallable":188,"./ToBoolean":203,"./Type":213,"get-intrinsic":234,"has":238}],210:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":234}],211:[function(require,module,exports){
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

},{"../helpers/isFinite":222,"../helpers/isNaN":224,"../helpers/sign":228,"./ToNumber":206,"./abs":216,"./floor":217,"./modulo":218}],212:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":206}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":180,"./modulo":218}],215:[function(require,module,exports){
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

},{"call-bind/callBound":169,"get-intrinsic":234}],216:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":234}],217:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],218:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":227}],219:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":229,"./modulo":218}],220:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":176,"./5/AbstractRelationalComparison":177,"./5/CheckObjectCoercible":178,"./5/DateFromTime":179,"./5/Day":180,"./5/DayFromYear":181,"./5/DayWithinYear":182,"./5/DaysInYear":183,"./5/FromPropertyDescriptor":184,"./5/HourFromTime":185,"./5/InLeapYear":186,"./5/IsAccessorDescriptor":187,"./5/IsCallable":188,"./5/IsDataDescriptor":189,"./5/IsGenericDescriptor":190,"./5/IsPropertyDescriptor":191,"./5/MakeDate":192,"./5/MakeDay":193,"./5/MakeTime":194,"./5/MinFromTime":195,"./5/MonthFromTime":196,"./5/SameValue":197,"./5/SecFromTime":198,"./5/StrictEqualityComparison":199,"./5/TimeClip":200,"./5/TimeFromYear":201,"./5/TimeWithinDay":202,"./5/ToBoolean":203,"./5/ToInt32":204,"./5/ToInteger":205,"./5/ToNumber":206,"./5/ToObject":207,"./5/ToPrimitive":208,"./5/ToPropertyDescriptor":209,"./5/ToString":210,"./5/ToUint16":211,"./5/ToUint32":212,"./5/Type":213,"./5/WeekDay":214,"./5/YearFromTime":215,"./5/abs":216,"./5/floor":217,"./5/modulo":218,"./5/msFromTime":219}],221:[function(require,module,exports){
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

},{"./isMatchRecord":223,"get-intrinsic":234,"has":238}],222:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],223:[function(require,module,exports){
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

},{"has":238}],224:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],225:[function(require,module,exports){
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

},{"call-bind/callBound":169}],226:[function(require,module,exports){
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

},{"get-intrinsic":234,"has":238}],227:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],228:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],229:[function(require,module,exports){
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

},{}],230:[function(require,module,exports){
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

},{"./helpers/isPrimitive":231,"is-callable":241}],231:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":232}],234:[function(require,module,exports){
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

},{"function-bind":233,"has":238,"has-symbols":236}],235:[function(require,module,exports){
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

},{"get-intrinsic":234}],236:[function(require,module,exports){
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

},{"./shams":237}],237:[function(require,module,exports){
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

},{}],238:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":233}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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

},{}],241:[function(require,module,exports){
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

},{}],242:[function(require,module,exports){
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

},{"./isArguments":244}],243:[function(require,module,exports){
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

},{"./implementation":242,"./isArguments":244}],244:[function(require,module,exports){
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

},{}],245:[function(require,module,exports){
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

},{}],246:[function(require,module,exports){
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
},{"_process":245,"through":259,"timers":260}],247:[function(require,module,exports){
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

},{"buffer":151}],248:[function(require,module,exports){
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

},{"es-abstract/es5":220,"function-bind":233}],249:[function(require,module,exports){
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

},{"./implementation":248,"./polyfill":250,"./shim":251,"define-properties":174,"function-bind":233}],250:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":248}],251:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":250,"define-properties":174}],252:[function(require,module,exports){
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
},{"safe-buffer":247}],253:[function(require,module,exports){
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
},{"./lib/default_stream":254,"./lib/results":256,"./lib/test":257,"_process":245,"defined":175,"through":259,"timers":260}],254:[function(require,module,exports){
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
},{"_process":245,"fs":150,"through":259}],255:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":245,"timers":260}],256:[function(require,module,exports){
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
},{"_process":245,"events":152,"function-bind":233,"has":238,"inherits":240,"object-inspect":258,"resumer":246,"through":259,"timers":260}],257:[function(require,module,exports){
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
},{"./next_tick":255,"deep-equal":171,"defined":175,"events":152,"has":238,"inherits":240,"path":153,"string.prototype.trim":249}],258:[function(require,module,exports){
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

},{}],259:[function(require,module,exports){
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
},{"_process":245,"stream":154}],260:[function(require,module,exports){
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
},{"process/browser.js":245,"timers":260}],261:[function(require,module,exports){
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
},{}]},{},[118,119,120]);
