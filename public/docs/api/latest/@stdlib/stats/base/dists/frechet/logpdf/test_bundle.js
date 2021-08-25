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

},{"@stdlib/utils/native-class":133}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":133}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":133}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":133}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":90}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":69}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_odd.js":64}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-even":55}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":66}],66:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":94,"@stdlib/number/float64/base/get-high-word":98,"@stdlib/number/float64/base/to-words":109}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./copysign.js":67}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ldexp.js":72}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":47,"@stdlib/constants/float64/max-base2-exponent-subnormal":46,"@stdlib/constants/float64/min-base2-exponent-subnormal":48,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-infinite":57,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/copysign":68,"@stdlib/number/float64/base/exponent":92,"@stdlib/number/float64/base/from-words":94,"@stdlib/number/float64/base/normalize":100,"@stdlib/number/float64/base/to-words":109}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ln.js":74}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":75,"./polyval_q.js":76,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":49,"@stdlib/math/base/assert/is-nan":61,"@stdlib/number/float64/base/get-high-word":98,"@stdlib/number/float64/base/set-high-word":104}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./pow.js":83}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":80,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/number/float64/base/get-high-word":98,"@stdlib/number/float64/base/set-high-word":104,"@stdlib/number/float64/base/set-low-word":106}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":82,"@stdlib/number/float64/base/set-low-word":106}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./log2ax.js":78,"./logx.js":79,"./pow2.js":84,"./x_is_zero.js":85,"./y_is_huge.js":86,"./y_is_infinite.js":87,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-infinite":57,"@stdlib/math/base/assert/is-integer":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/assert/is-odd":63,"@stdlib/math/base/special/abs":65,"@stdlib/math/base/special/sqrt":88,"@stdlib/number/float64/base/set-low-word":106,"@stdlib/number/float64/base/to-words":109,"@stdlib/number/uint32/base/to-int32":113}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":81,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ln-two":45,"@stdlib/math/base/special/ldexp":71,"@stdlib/number/float64/base/get-high-word":98,"@stdlib/number/float64/base/set-high-word":104,"@stdlib/number/float64/base/set-low-word":106,"@stdlib/number/uint32/base/to-int32":113}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-odd":63,"@stdlib/math/base/special/copysign":68}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/number/float64/base/get-high-word":98}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/special/abs":65}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":91}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":98}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":96}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":95,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":97,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":101}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":102}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":51,"@stdlib/math/base/assert/is-infinite":57,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65}],103:[function(require,module,exports){
arguments[4][97][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":97}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":108}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":107,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":111}],110:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":95}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":112}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":110,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":114}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the probability density function (PDF) for a Fréchet distribution with shape `alpha`, scale `s`, and location `m`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} s - scale parameter
* @param {number} m - location parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 3.0, 3.0, 5.0 );
*
* var y = logpdf( 10.0 );
* // returns ~-2.259
*
* y = logpdf( 7.0 );
* // returns ~-1.753
*/
function factory( alpha, s, m ) {
	if (
		isnan( alpha ) ||
		isnan( s ) ||
		isnan( m ) ||
		alpha <= 0.0 ||
		s <= 0.0
	) {
		return constantFunction( NaN );
	}
	return logpdf;

	/**
	* Evaluates the logarithm of the probability density function (PDF) for a Fréchet distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( -2.0 );
	* // returns <number>
	*/
	function logpdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= m ) {
			return NINF;
		}
		z = ( x - m ) / s;
		return ln( alpha/s ) - ( ( 1.0+alpha ) * ln( z ) ) - pow( z, -alpha );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":49,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/ln":73,"@stdlib/math/base/special/pow":77,"@stdlib/utils/constant-function":125}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Fréchet distribution logarithm of probability density function (logpdf).
*
* @module @stdlib/stats/base/dists/frechet/logpdf
*
* @example
* var logpdf = require( '@stdlib/stats/base/dists/frechet/logpdf' );
*
* var y = logpdf( 10.0, 2.0, 3.0, 5.0 );
* // returns ~-2.298
*
* y = logpdf( 0.0, 2.0, 3.0, 2.0 );
* // returns -Infinity
*
* @example
* var factory = require( '@stdlib/stats/base/dists/frechet/logpdf' ).factory;
* var logpdf = factory( 3.0, 3.0, 5.0 );
* var y = logpdf( 10.0 );
* // returns ~-2.259
*
* y = logpdf( 7.0 );
* // returns ~-1.753
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":115,"./logpdf.js":117,"@stdlib/utils/define-nonenumerable-read-only-property":126}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Evaluates the logarithm of the probability density function (PDF) for a Fréchet distribution with shape `alpha`, scale `s`, and location `m` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} s - scale parameter
* @param {number} m - location parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 10.0, 2.0, 3.0, 2.0 );
* // returns ~-3.489
*
* @example
* var y = logpdf( -2.0, 1.0, 3.0, -3.0 );
* // returns ~-1.901
*
* @example
* var y = logpdf( 0.0, 2.0, 1.0, 1.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( NaN, 2.0, 1.0, -1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, NaN, 1.0, -1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, 2.0, NaN, -1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, 2.0, 1.0, NaN );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, -1.0, 1.0, 0.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, 1.0, -1.0, 0.0 );
* // returns NaN
*/
function logpdf( x, alpha, s, m ) {
	var z;
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( s ) ||
		isnan( m ) ||
		alpha <= 0.0 ||
		s <= 0.0
	) {
		return NaN;
	}
	if ( x <= m ) {
		return NINF;
	}
	z = ( x - m ) / s;
	return ln( alpha/s ) - ( ( 1.0+alpha ) * ln( z ) ) - pow( z, -alpha );
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/float64/ninf":49,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/ln":73,"@stdlib/math/base/special/pow":77}],118:[function(require,module,exports){
module.exports={"expected":[-5.885450993989401,-2.690353765398489,-79.13165288004676,-7.14883901062755,-10.399083932489546,-32.79945884131045,-9.908640475098197,-7071.823004714371,-0.4110474798953241,-19198.256329237207,-500.43918647637696,-13.01746665041443,-24.424249808479047,-3.3379299690329085,-6.03233550323156,-3.7458870683493783,-30.048350704905253,-63.169541319379746,-4.362966813192926,-38.89363816148262,-1140.116670142102,-4.190349133225335,-7.952452630509124,-4603.107555181808,-19.73382707453896,-20.08752594834278,-2.933060646101872,-2.7907745349381474,-5.209354537658978,-1.3416078271704197,-3.179152035442431,-37.125826471113186,-1.9554984357618053,-2242.892289811968,-13653.872805280354,-2.956225755906069,-2.14982748785948,-10.475064197834756,-2.1535972199411493,-18.852494293210096,-7.590032342711867,-549171.2142544672,-10.749373375233127,-4.566260217123395,-3.1434551215826176,-10.728036008479565,-2.018251045309642,-8.862076176261056,-673.8698796147695,-52.50300424928123,-2.3550451438041615,-231016.1557121003,-30.806484997845097,-7.146293897887517e6,-5.335291785136179,-4.6521667629246215,-5.738200409670123,-2.0136314947743594,-2.4938834447111224,-15.53911188604638,-6.9248071567395035,-2.7323158274861044,-4.055172501653415,-3.0554327191603234,-37766.62787726241,-22.74658767361879,-4.037939962877761,-364.89016053699953,-498.77809244715115,-361716.0416471177,-534850.6003876101,-1120.7695721487282,-26.003207319965647,-1.6109536031341693e9,-2.4041327596889355,-2.805573177608031,-5.0836738894108,-12.818741213333897,-609.4574777398658,-91.17508114427227,-2.3106893400908506,-10.323773948401678,-20929.648453645183,-1.200387116544316,-7.0304571766629005,-10.25440466608828,-30037.777528692914,-15.406535842248159,-1.6573929646079915,-4.3057082799916895,-4.424296208457773,-4.042459695116388,-4.262935586283049,-4.465888148806936,-10.654389195705821,-1.2661499633444033,-1.7746276671971355,-1.069424347730596e7,-1.2546171086889364,-290.0166221245452,-1.7290599981380415,-43.612707482655686,-2.3282932359807624,-7.530701391876927,-0.6881543830802286,-15.138030870666363,-4.250714579424447,-13.864451144007273,-0.5453554471511313,-73.50541118673762,-1.5321825346334816,-32.52575214990944,-4.413558279554943,-46.25589166671703,-3.433230400566857,-7.721785737319288,-22.012486339160265,-2.426604639239618,-3.2707491280089473,-7.971682083251107,-2.4170071095846843,-1955.3816197542483,-3.4498116292824,-5.8935283075459886,-87.09738983658154,-45.8238081994567,-10.561260260180328,-1.2813188090958798,-12.423801074119211,-2.985690469632093,-5.9841047859755445,-11.609675404789634,-91.3104629417308,-13.691386436994657,-25.16645763434311,-5.103717448711286,-30.438973583841303,-2.400392928103976,-14.986342627719727,-9.246141334254167,-5.791501788077347,-61877.46472681326,-8160.693845779932,-3.1630309747700722,-6.297548716376982,-4.4684619850113645,-4.029574422181526,-3.508310318660473,-12.606684389076113,-2.0238520296630704,-29.80417935872861,-4.8599433533357255,-2620.894685744172,-5.920847840957786,-3.1209928082679452,-1.357058925745984,-607.0715784095437,-3.388104009557856,-43.71347791660813,-226.75396479648848,-3.115558004256809,-9.292467709482649,-4.136228093493179,-0.9690782216689088,-25.339345286834465,-25.094180304246297,-3.577166015134141,-3.125720862311623,-2.1840049513651274,-5.219315930053692,-3.023053654887808,-1274.1527986656279,-2.659017352587912,-10.588178843777506,-7.778314296337565,-5701.71200389088,-6.757386897925464,-10.006231807682239,-145791.57341851247,-1.870245329309407,-4.031298048283194,-19.827458473172154,-2.8364746066491335,-19.82313484520897,-7.379968494104689,-676.344295998608,-20.125069491100092,-1.7966834917145467,-3.0774539422440768,-915.7885561747314,-1.1281171008010402,-13.32430476164323,-3.387750015535369,-4.793693109859888,-82.22152274336202,-1.380696130461431,-5.136842058208768,-3.7409088631652048,-832853.104622546,-3.1756726274629603,-2.0582578000611953,-96.17713578597774,-498910.4996277473,-10.345923195855857,-32.75225350239287,-1.9436682766981364,-4123.840421246954,-1.4311893693076074,-4427.920280708819,-2.8363783047999016,-7.521534481611941,-163.8942917554952,-3.7721993749455383,-7.549537527208904,-1836.62331387612,-3.2136341606116794,-4.444024626024551,-32.10992018484133,-12.728180082757344,-51.368047523224185,-1.2843455804668162,-92.1088516337655,-50.34733684043125,-3.0369588718451195,-4.254367588666437,-26.8633749960229,-8.502727099652795,-97.51481607881108,-23.30423099621751,-2.2409598243826316,-8.775763938801546,-50.39489116902218,-3.3608598717520395,-26.978028406061643,-15.018897552394659,-52.7702253485038,-1131.1580285895616,-215512.89749153837,-60.56219734916235,-2.415227425096855e6,-7.775805172320944e7,-10.705271970955955,-2.261712711012389,-1.6725779478964462,-6.904385057361188,-43.534427745133556,-10.634352106496872,-3.2939197313124042,-134.97056164461506,-17.07355097553052,-16783.31185086014,-14.535387781093885,-125.0604838888282,-8605.090948360654,-0.8046183263385301,-6.532826814296175,-4.338593918874099,-1058.82932089452,-3.6103196790610617,-103.14685046929048,-5.981096292386575,-5.7931322429852745,-72.68726557070697,-38.94415166016016,-38.5098740879099,-6.42365689593341,-10397.410768617372,-28.163909707231205,-20.078514238993304,-4.483249193879357,-2.3456546369399884,-9.272780494163545,-4.440531493103576,-208.86091191938766,-1.859590498014299,-1.0690440046996244,-11.376977290751384,-7.701501695725154e8,-58.002346026817804,-307476.10444382095,-8.244578402207857,-4.941999174683428,-9.828072692748929,-3.2882223273546654,-4.218925707051656,-369.2969618868817,-4.796509592022342,-4.292695519650189,-17.05407377476235,-4.887737703601744,-4.2491366486744795,-11.483962636023364,-82.86634953164565,-1766.9970756478183,-1.8910881396825445,-7.527303021955646,-324.48257240266497,-2.2709374327962015,-5.600503050259565,-6036.022740046932,-2.609439482702623,-9.552352723608836,-3.6395711458130005,-3.763258484609336,-1.0436622578355543,-2.944524590763988,-3.0966857438802227,-4.775792256789995,-45.20489127280977,-3.8138765358270508,-1.8103561475317145,-6.6011788078714755,-1410.1884382651804,-6.641230882211415,-11.26412252395607,-63998.353971219316,-9.71170615273514,-2.3487874575481182,-35.736301753383415,-20.858584497834418,-6.245160231756286,-5.621331675324941e7,-257.7564861615428,-3.1832957185414976,-3.007952205235176,-5.25725227808632,-11.18072686544495,-4.909882504505603,-3.5517714766308774,-3.560040867264909,-147.74213602213183,-28195.734367877663,-33.42590549236988,-4.362360646882005,-1.2499008101492939,-4.269001425377838,-4.699538846420763,-3.1225343107462673,-8.599968431140612,-116.7951072017315,-5.3622406234193285,-17.514939463730023,-4.428903239037563,-434.9124903426607,-2.0111755453536334e6,-5.292183185591071,-0.9671245974312094,-1.394270073851448e7,-2.1617611151831997,-1.8920291942235157,-605.0139248856719,-138.53927969843792,-5.897155136698899,-4.055124595382219,-3.467313833605455,-8.303748629004255e6,-1.5241720915892525,-34.11277429859694,-19.94298705965975,-1.534314445676213,-127.43541569642493,-9.82058292676551,-15.561921643978025,-132795.9641988256,-1.8762302075467177,-20.737347214046093,-4.5561036884242245,-8.325694856746042,-99.36750663071813,-1.0232530261999144,-3.0982009091612337,-7.206028230488918,-118.51601429104008,-1276.3397739300121,-5379.139270642766,-0.8760461917257113,-4.219591589897876e6,-36.743332319521905,-9.278036584045182,-3.5004230127795424,-0.09264390275176093,-27.820002834617,-42.06255751677392,-0.8844037053614774,-1.926689651256031,-16.896108817250557,-2.5304516164355144,-4.344151563426489,-2.8652889690589163,-2.447450239848788,-3.5090939422866088,-19.84935323113422,-2.754250517482104,-22.63303089564198,-101087.12032140828,-3.71039797281463,-15.448004474829009,-2.7180949774797316,-3.335475773377657,-1.9154716271480994,-794105.8193657058,-1.5985533796274751,-2.5054208968560996,-2.692007044108299,-13.136896772026631,-3.6360361613929806,-2.998110752367734,-4.716509811769673,-4.542470639124466,-3.137911628243203,-74.20178447282012,-1.6373098694107922,-394.17013791908545,-22.75179033378746,-5.596044089491057,-20.26235533827306,-3.112662923881336,-22.199074912228514,-93.10868951414227,-59.459470949083006,-23.183319081084356,-38.1860069098564,-5.562152246420745,-203205.39277083307,-8333.859404496732,-4.083845912403671,-10884.403797814251,-4.637174576993731,-33.765330439789004,-2.8418368189096155,-7.1719528749860375,-3.4225779261495246,-448647.09824745235,-1.231416743938772,-37.57843051148202,-57.65011756558214,-4.374288887636302,-3.2471441250952324,-2.5645717964011414,-1.9701009633757505,-3.9943688258774936,-8061.206374833716,-1.2135597679313879,-12.80941563596279,-116.27997225021217,-3.2463789074922387,-27.94177608598875,-29.38981099388049,-65745.43492546864,-13.208888434701317,-20.931131293457653,-1.637650982151563e6,-5.608504857853744,-2.7913750552506844,-11.183324965768897,-36774.429689290904,-2.4265201136578662,-1908.7406643301465,-3.042754709984394,-4.542039671281162,-3.474501699198388,-32.59475916169641,-4.1371508085214455,-39.81433982400473,-1.0184036141730992,-10.667663950335097,-1.143542512050304,-3.7986427014208357,-0.9718292292106507,-6.1728067991695225e7,-3.892251943664749,-10.95479409770572,-3.27700578792401,-4.892677280797758,-1107.3992221809578,-8.969273799041536,-438.8223271068367,-34.60641706975069,-43.77909168633663,-14760.69332668825,-7.2105755182432105,-13.988762945795672,-27.101724199144307,-1.357724531668065e8,-38.75356619663295,-6.579543366532155,-11.42451834258293,-18.02240068398027,-8.294752049290246,-1.702429486044219,-6.87503161432772e6,-1.854622969969101,-0.631097820759476,-436.5480395988072,-12.486938315191544,-7.261103399819742,-10.26879804515087,-1.4829249404496183,-4.548177348995536,-286.8463347174035,-3.774157848449401,-36.2456471088006,-372.5174870517225,-2.735047606930324,-19.234087691451595,-2.637554706071622,-1565.558736194478,-2.657712595932428,-0.8400297645809651,-480.95096453996314,-1.4065004227072149,-2.8424557006391797,-5045.810391806043,-6925.928676498719,-2.8875728405927815e6,-4.49732783299113,-0.8307315343974326,-176.63991884169945,-1.3409011196889111,-2.811046451262394,-4.4282114098222625,-3.7849504299171888,-1.3197184532095334,-7.743092024434282,-28526.293931241024,-14.052022157859533,-502.3702055711957,-2.671785743975476,-0.9644635397779091,-28.29191809581541,-326933.9118250882,-0.9987992333171571,-2.81099602261626,-2.3334979018609587,-5.682761824678578,-7.049162904904105,-1.643912307779369,-1.688705173412204,-38.27447593076239,-3.2038965438124927,-2.313019383510558,-35.476343590054405,-14.16458189506609,-25.121579810563617,-0.6916346071679922,-4.6137956286722295,-2.4181817502978067,-544393.173083722,-7.599836651744053,-9535.200174564048,-4953.520875993713,-1858.584514866424,-25.048329709125714,-2746.5047163779413,-29.956265264322326,-49.62428866115994,-18.609355863782945,-39.005893021970394,-3.5345281125956896,-1.7530975583510198e7,-40.29331418215879,-26.001258139329398,-4835.342405666513,-29.11689379485155,-7027.811960731724,-31.647352982890723,-1.9674664435039113,-5.066634970643131,-1.1399302068309343,-2.3456210851203894,-19.85478765834471,-1.2240279177829154,-73.77842352753589,-24.78963178704625,-4.946647835183898,-3.4969052410487587,-3007.9207409697574,-3.4522206869063417,-6.533650087941255,-22.03749843499465,-3.0583776933057874e8,-20.913512649626607,-3.1147814939439034,-65.61891294436664,-1.6527534745754178,-27.6887077969731,-1.978970711407914,-81.3683518916511,-1756.8371724349688,-6.510043658876787,-2.6815028900791673,-49.86809967752558,-2.2188717068297508,-60.6000712161393,-18.266554616482864,-2.1035052796778517,-12.921251179989191,-8.490786849290323,-64.01022206432512,-4.307419843341221,-46.785744637808946,-42.847127834908285,-35.865350641297525,-6.104582900546472,-8.982834112353743,-3.005751595504807,-13.320524108363037,-5.359967669329177,-1.5018832432161162,-12.001935320051349,-117.37578628071971,-32.97021372735263,-114.89404922879807,-12.430675859628593,-3.709356774612823,-4.59628858919814,-89.22831555808469,-24.528044188794233,-3.7549170291735847,-3.0060886202256274,-439.2334721092262,-2.78264096387501,-10.374302210897799,-1.3950225798184355,-2.5952528749410986,-7.203877296485542,-8.29237405784255,-3.4494729605763834,-160.30099584878084,-6.389791452255598,-306.8558737964756,-36.370978599674025,-308.19471956436644,-1.8747224322972922,-5.060384242928421,-23.32219143988152,-18.797403951541803,-108.38972991863636,-13.091325172561673,-1.89238293012723,-70.5578987592631,-66.8057714626033,-3.7727100332478662,-7.689409069433756,-13.854602407031233,-2.100107761776474,-1.177444962126807,-31830.02956345579,-20.22405119993624,-259216.51584705192,-34.07018246526225,-49.45901005753458,-10.706867223257703,-1.9566948303348937,-4.461471027204926,-2.5305012341471436,-3.377775226394135,-2.2458493007204847,-1.7542079166386142,-6.009989113055205e6,-0.6379468810234876,-11.971446268023268,-462669.9527781583,-12.293188140667437,-3.078447742598653,-3.8174545301590843,-1.0606792555926013e9,-2.7386053808768867,-6.2716504962309685,-0.827355879874483,-23.416105665415685,-118980.96791270672,-2.5796717237766487,-5.956792400053375,-1.7372444368237416,-2.8909851815125758,-334.37030249677736,-3175.4703857864197,-2.903557870475936,-1009.2325065034828,-3.7927370707142805,-27.180632589731896,-744.9463043067573,-6.011952472622449,-2.6076348043268363,-59.01175450811329,-3.9011083254478622,-12.099754524350441,-1.9982866133497248,-3.4035220218711637,-33.19098858528589,-0.7656222523989828,-3.9554432789813143,-48.16993884191522,-1.4443189306816897,-20.163415913741105,-7.226649685501261,-5.306402186899723,-568.4118029623637,-358.5489121487146,-296.7115847604314,-2.8469587259611286e10,-1.1893403710740214,-0.6945616892020721,-8.78120827639592,-5.488601150476099,-700.7424579503235,-319771.20084444905,-48.84363869411788,-6.153811533544446,-12.332024428054918,-7406.581996516522,-99109.23578838402,-3.5789704242696905,-25.313520803247833,-38.459786243204036,-33.13572531490956,-6.40521431854725,-3.484111099784071,-5.289764048388899,-53.9939549983152,-11.127379634210262,-99.58015429766161,-3.354605702754903,-16.131141879043483,-4.550981395839753,-6.009425263522082,-0.9445050611726019,-16.282356217589733,-338.5488743365219,-3.9122297088252163,-2.815618965078828,-3.1698691691426797,-3.62582072381443,-19.764713199684245,-7.325472035705662,-3.239988154631125,-82.59867717654805,-15.070583419962562,-930.3274027303296,-0.9214415063009939,-127.44860496794898,-274.7089574085939,-1.9383468435785132,-48.49864658527452,-51.467180616511016,-28.173195177400704,-6.030222480455855,-0.3794101646710658,-1.967574431665711,-1726.9859946704385,-1.1022986351060957,-16.55892961614448,-9.045647992781678,-27.38221809251088,-7.774927951767186,-8.196990331417156,-23.440904290678723,-11.81795201497378,-10.831110288105613,-6.626282212606788,-175.12861131284913,-36.05640473635325,-16.442310929915863,-2.0627148927528305,-4.7846400547872765,-226.4427258235645,-15.1601380340351,-8.638363734496311,-7.376636554380085,-3.4949054462192763,-3.6720273955960527,-0.2500464101436395,-5.122837417379539,-2.57862322282517,-5.407532753582059,-66.0366620574478,-11564.211416555541,-579.1577790032275,-3.3122370880792036,-509198.1031533242,-739.7045770270029,-0.9629955235163423,-2.119231502815958,-4.4015654174945045,-5.777596638421777,-14.080573667562062,-42.63988296579963,-6357.75310642706,-7.535279974531264,-234.76760508924173,-3.4806432345558456,-5.956290615117053,-12.947016734877133,-635902.5341238823,-4.553881534683709,-28.821186627251638,-2.4796626304566214,-6.395635112416768,-3.3851928740960853,-10.594801961896348,-4.721454784812632,-10.228958971006845,-1.3811727990398983,-829.608148521519,-412.1224676122536,-4.893439728703184,-5.703133811427391,-41.475666340530424,-22.819434997214543,-33.77102239254151,-1367.5411416855009,-108.59969179620498,-16.687195482122505,-3.4002862253045554,-2.144853253516132,-5.35302741615969,-3.1691271097109346,-6.009038817221758,-83.1831239328706,-21.417553478664498,-94.02823215225946,-91.27279234320396,-4.765398368103883,-1.6866116860468783,-461.92972658799624,-2.821642850064943,-35.26390439307092,-5.9922219544117326,-20.591549895972896,-3.1071948756755225,-5.547677804886916,-4.56930122078928,-13.397502024576225,-2.6467374528749983,-1.903300534007087e7,-1.9480411454501771,-12620.665350370953,-1749.6732518541892,-4.405850184198872,-5.104748564861173,-35.535133971330275,-29.38587509634667,-19.204437004308488,-10.545538194261262,-15.983542059836854,-7.889238011761385,-2.2568865047871953,-4.4801258157232215,-2.0252751964452025,-13.627384712159145,-3.9468825728711483,-7.535180934972937,-3.8178514669607653,-3.583181798327365,-9.2850041161442,-81.26677443141881,-15.474099796042486,-172238.33268577294,-2.7778196585488195,-12.57001203252769,-2.632924043755616,-2750.1193191687353,-4.804197098888342,-1902.3786399251978,-7.3841940158750035,-2.6845280430276466,-26.212411505771314,-2.0329722951378475,-1.0853005664300919,-28.562366145298995,-1.9657802529057062,-48.37675203989495,-41.44705352897973,-3.8621803023555774,-33004.133529411425,-244172.60709821724,-4.119427189302678,-28114.706727371326,-0.7408026028582204,-27.282514289261766,-1.3722725615219922,-3.8601521607963782,-5.858256146694163,-7.750782221741341,-30.302173421449634,-6.416462065066315,-22.15297526771212,-7.685909102714853,-5.830761382048162,-2.8847709004866644,-13.180182737714475,-3.218259161145875,-3.3630545558150953,-42.31583357685064,-12.135531829745942,-28.829931419922215,-0.5622318984232355,-11.29283322497486,-12.595927597430284,-1.6184625656517446,-5.295949292439639,-3.572605502528229,-171715.8053006901,-6.9016318807614265,-23.290422275197212,-34.23157587025357,-4.606240544311081,-2.2577214694155474,-6.134452244633097,-1.3119922488947933,-34.4212914076258,-19.62887800141641,-19.58110291556175,-0.4450359567066249,-191.31727053633898,-1792.968571119063,-71.21297563931562,-7.567001076080146,-32.79128919871229,-1.7605389153372633,-2.38461604107711,-28.254631190858063,-29.582521271436214,-5.333716193692635,-1556.4469523492896,-19.773847799206482,-10.29218191047766,-3.281888325572742,-37.208322508669774,-3.0759268557001995,-2.671339039728577,-2.7170567312960268,-2.978346543130853,-6.627085056728997,-1.9126918981850687,-8.791603054289705,-3.1421751292819167,-2.9867826909974204,-19680.788844573795,-1.3808189581778967,-13.120639208586375,-9.876246240454591,-2.268193164086293e6,-5.388766677348805,-1.7072967307518696,-3.7642972843182165,-8.206547096620012,-1.357334777652953,-70.56124686713827,-2666.714055202622,-1204.8167245281234,-2.470470783919622,-4.4261075709825,-2.313916663611287e6,-3.0824351149302007,-25167.225061324232,-3.9460973799433985,-9.827328536803282,-2747.4758674863833,-2.880011474954382,-46.54017678098634,-16.550314585852984,-23.37905071426741,-1.523520164526933,-4.330590359357565,-200590.34734835237,-176.92801452765133,-1.7884991210422285,-3.4823213564027196,-2.4445161158214397,-3.378404394686876,-42.62621113299086,-18.084923213959758,-7.660714795135865,-20.694941110933268,-3.1463900863199603,-81.43758274290404,-2.073164132936328,-4.750780770518564,-58.28149720346614,-3.181272828867172,-67.44125829022693,-644453.5765372408,-26.56568954888281,-1.6355302342273126,-3.31189655995235,-7.006872503282193,-6726.179524465207,-2.844898540741909,-3.5399662026463794,-15.342140960052777,-0.17883236427554317,-1.9910509687134361,-29.375229800362952,-311.63616599229005,-32.14360172143879,-84.17428093744952,-1093.3238967698633,-8.24288528390251],"alpha":[12.306114936520022,3.2562736811449877,6.377204110022512,14.19448133645755,10.994597282365373,17.385500657122268,6.744766605621559,8.061181276611391,9.761868637244252,14.463274970525926,16.624459820341478,10.519890836461286,5.401506818199544,1.4645017982972508,0.05974373743682815,2.72444155245378,8.11457312778877,19.129830685555493,0.3397747687445696,15.956669472624544,11.270406404584715,3.801944968167592,14.018625820018546,10.157262734441087,6.585012371071075,14.57555441009041,8.014426154178542,4.669812348197553,2.9239722284838887,8.371335643322034,15.811033799891185,9.917326324655612,5.216172668020098,10.627285661247669,14.928174855673477,1.9422035481846223,17.76766789811182,5.691747552474853,4.143192066394876,19.894722156475293,11.22084755721788,13.592137574407746,16.36999326476442,10.357534037797084,2.925212508790125,3.3932769461076395,8.736073228867731,7.803073549632722,11.347675175796269,7.0418787694282825,6.893480493433026,16.412536157045338,17.742425758010047,13.139601662985747,9.775954040968081,3.0653965329934563,13.721951558034196,9.958065204074988,3.307379661436438,13.192187098605519,10.097093539949915,3.142919247505205,1.1328105393197818,1.917658629284107,13.563780146703191,5.368036507118941,1.3449098672953275,16.753431985920585,18.514018042460854,19.805248976423456,10.82872208764968,11.50116284475665,19.671630572606794,19.639591709732727,8.538444194224617,1.2784173143877142,11.702847569281536,10.46471257537156,11.971136097317183,16.746635471554026,3.5835442723759314,5.275369471440632,19.9473569208402,18.809599869640184,12.460236379253292,19.479918565314698,17.659154364926263,17.32974358558653,16.12571262077942,7.479896480098063,17.00708854867831,3.5415204841226444,0.5776034633283045,6.426160602301492,8.162502341086345,11.462099438869885,6.306101835621631,17.667684703596468,11.529857767186265,8.500763143240002,7.207890822528844,16.645288561787535,4.2559811379350165,11.257986800761156,15.486208387085728,9.824150520732754,0.3686843762889902,12.984739732373324,12.114222158130152,15.722255470793867,8.530824265894793,6.6443982258359835,7.487478524597351,19.89533309569719,1.5514326550383206,4.145640987890515,7.6165741121559405,15.023193483228262,7.727562628489384,19.34946803300647,16.92824099255177,8.321257238816738,1.1655891424332587,8.874131174096815,18.91750269108425,18.98780715599182,12.495463882877015,9.551763961518889,4.7700422286622235,4.496828121137306,0.09324255730364772,8.014469611727076,13.566135316912188,7.463712869133796,12.185850194439594,4.237989190841462,16.557568011563013,8.113630079304652,18.424168402603915,5.993164982953507,11.94116971420553,12.469516754542838,10.069185862159777,19.568386728719005,6.052058587553044,10.619232714578795,14.067884693936094,1.3826567192657002,6.722612891769728,4.996172912124441,6.6176434635559955,1.5134523294053448,8.429481111332287,16.362443371764765,0.9547201095589664,9.781716638047072,13.24703843389059,1.5172301030858648,4.5917270342214955,12.045003231111885,3.0668559995820965,7.755410760221766,17.814153355029596,8.987707237226168,14.217485966111255,17.903550086362273,13.8812772746763,1.9140257622883095,15.972832511625432,1.9741871525230303,5.445793489059874,6.2633449556933485,5.231565036099219,17.991103439616943,6.742258336639826,18.936542034661045,3.0357450240795414,14.719973218649942,16.314440855251306,12.228669542769804,11.713918535370095,5.3313973779582025,1.020233951656131,19.828042497091694,13.583637167463372,14.709740073192513,19.173435850359176,4.39245133941963,0.6991002385754497,13.531716707197393,12.89814036553389,7.298035654806538,3.141677092033688,3.702846890263438,11.326609499408061,8.937721332090867,5.046578768274399,19.92164148220496,14.272684805772538,10.08760361644757,2.3094871002397444,14.323047655233353,19.44372794680795,8.665339204453527,5.031843713908959,7.481656167666819,8.636814462055318,8.586607791677316,11.271165438687692,10.006493726890845,0.015887608203608572,13.414422687067225,0.5652226076478417,10.374407012386628,11.834661036780627,5.5629786905260525,18.266620153440254,7.199447969170203,5.67139217897509,18.67769818054835,13.528762426569333,15.284761184196958,9.612414651074301,8.230809016970921,0.386755303979478,11.917635784400154,18.531673620811052,11.576492865139002,9.762867913547657,2.716444116761876,16.884504662265467,5.312743103282611,10.222466225795772,16.775723861165996,8.568744790116174,17.381505157588315,8.619787811824938,9.831853689521136,14.45914049963596,15.518057425598549,19.832389453462195,18.546504213557434,2.6350292276832077,10.790428302534526,10.710499388478848,13.252840890099638,10.724492931704589,2.8261855162825844,3.98292961426165,10.297683933142112,17.159399454132327,6.2626684867209415,6.702208917532015,14.677443347711376,13.416963960816712,17.93348272204185,6.8130924122927805,9.558508230231407,0.9665430563240829,5.1662534130365145,9.280065693626728,4.054030361189653,15.306837018641431,18.36272631094817,5.357808964783981,3.613790035458373,7.53897124892279,7.18305066996185,15.732611346815544,18.354955552111086,12.478393979471086,13.077717047136108,18.499220256816823,9.984177578443422,6.854179016997404,11.47165717838499,15.40764350498784,17.817423646980167,11.775106693365927,15.810308333662096,15.77376190122397,10.801678517256605,15.327894784452191,9.938676593384752,0.4344831562403906,18.58953873278299,7.950919372828862,0.5360557331142557,13.04127957346767,0.18369293698547118,18.005709530191766,14.412440550062966,7.105582749752242,11.178438018892244,16.941075080176702,2.896346564666108,10.596749007676802,5.597150892852931,0.14546459464447103,15.743038288030675,1.833388982517028,6.468545823093375,0.7526437482590076,4.106384616066192,14.376206512121064,5.501228744418567,1.9858714982438563,0.20748395663535035,13.384287630113123,0.6515979706364172,6.29256150285161,4.387298162262123,18.69186110526295,10.463472849440226,18.640138330515782,11.342886884441615,2.7737047809240734,3.4368436570462935,8.545385082891492,19.853332116200193,6.7285540061779825,17.39933442043265,12.14355648901356,2.5732985394775953,1.7882347648337804,3.7527234392607722,17.789404729233944,6.020457177368299,1.6465410670504532,0.9757612072356059,17.511068157356032,8.517556548790699,18.150403245522693,0.46883247943080963,9.60282609883408,12.001765529054893,0.16941177327233437,1.12221261319025,16.850399227779054,16.996217071273037,4.828598020480466,9.15385680920223,5.112267088199158,7.019561575679285,17.98704197405158,8.71205601268568,13.534859111709604,18.472672001817312,3.6542666439188665,13.955715088892727,15.007277011269725,8.248003743753198,4.511695524561912,1.256431909354978,1.2404937629474855,13.75489783926961,19.326653131083326,18.141737291190086,6.062526721864061,12.669574285059554,8.802355699084817,2.6969274280831934,10.034491731110386,17.930266482189104,2.720637461576647,14.631993543135442,9.38499951850018,1.8684941019551937,7.466001151193815,7.464532768693388,3.8904572223314915,9.755498347288194,6.641497920007189,7.373050144824105,18.89263403721507,14.780857328559671,13.67595059264739,9.89176848867773,14.848347763431367,4.40021021739089,14.37096961405302,12.316811587921288,14.634267290971934,10.750727929677435,3.047898536777227,10.055739308719044,2.9385246477452043,6.471697217179582,14.589553932831016,3.1006477184712544,5.205807432118825,3.774157047160398,5.630741987518331,7.200861952945701,12.043896144404972,3.3822321723995774,5.200543130527646,1.7362996915468276,10.708092923824108,5.947339936075946,17.380118229970833,8.253614382437643,7.763682158377585,2.269499838543081,4.549793458817257,1.9253952753324244,1.1638561128404534,0.36364792265354495,4.076843649841018,9.44195522841705,7.6042968331055505,11.564221401660713,12.118921052682236,5.054724840932305,3.4064081656414924,7.8106297827561955,16.413381860393578,10.155961309060789,14.251685823837047,18.561445065609107,14.757657921777692,19.622998069358438,7.50477386203003,19.030762998914803,10.52313759200774,1.9771118774555685,19.663202698040777,15.51897947025401,3.483941970348141,1.6342926336020192,2.2362347506836944,4.321119153975745,19.918567452164453,11.228295797063472,7.900043889221102,9.759082377908634,0.3777577362559281,1.5566957311771867,5.025786935109262,9.484880985992419,14.508250996967407,17.882649085975633,9.409987638225804,4.214821192858005,7.938850373501776,11.831609572869448,16.016369090589066,16.945329355441917,11.275368606255153,11.82970003061207,9.835631615684024,19.193528709998247,0.11558510768100216,2.9272247531929807,2.892519170778538,10.602859095013294,4.31666911010375,10.081598737836547,6.352140736536405,3.779082870871857,1.0319269194012604,8.026901520123634,0.381438924149915,13.883353575041069,16.234209577301538,6.219328983753218,13.422397484749165,13.550682218849364,8.065143321653462,19.828595854523808,8.649854943731592,16.09113046291786,1.204796325599018,4.788898020227426,16.9571609235988,18.83136767949347,8.862357030423308,5.89343855625291,7.884607706064646,10.057533038319324,19.02872521282193,16.629300755606515,10.68322765279742,19.6695908523375,17.284434844257323,0.05500635600153014,11.085730680591155,15.3261155777971,7.281817974756932,11.140113462167616,17.21986005955104,9.433155217688203,16.9950160585648,19.79459749199218,15.343070496344735,8.515907416689057,14.461211799402808,19.18171928545371,0.3079637333387142,10.498667611762453,0.47423233971930046,8.741463583509805,10.252226202666863,5.482622081825594,10.395031424125612,18.219680563284207,7.893312989260046,3.628339508107934,15.307661457291086,15.840124810275595,6.4960210932867835,2.2310977915637675,14.363760148371906,19.305021860459078,19.82154620191338,19.505234252932773,15.508317690849168,5.9868876101095525,6.982157453979871,2.853418138493957,19.08262810332383,15.614432473071602,7.220031890977796,3.832715674495182,17.34846630168501,10.864471377782383,17.298826409612744,8.883022718662033,9.85628157904376,17.12442898547352,16.17076706057115,18.789551322805412,7.297307359897731,7.222569852375957,5.9170575459654495,19.792814374743646,9.007604922129842,10.257980195272571,8.256463220644603,9.684906016025945,4.351151666020048,16.543939064109033,10.177446145189556,16.8397054054644,18.207046777903173,19.83469131936221,9.404096539353212,19.740678643823767,4.470246147335737,11.057095594574786,8.483793405275776,16.12674933774972,12.285768983136535,14.676862793656102,15.238608344532771,12.718451011764138,15.047618548335478,12.07962943942345,18.05795527158018,17.428655259446035,16.364783824858925,9.233582323896062,18.89292885420932,12.463294469836118,7.34176468015002,19.929713259775813,4.51126778666318,6.48446756983259,12.473510436351658,9.56706916972518,8.319708983581835,17.274655152129906,17.14621968231024,13.144720466324,0.26842442457886584,14.918570371190757,7.490570370927161,1.5849698505383891,15.381787480056346,5.311915125087148,19.93444415403587,12.373628966844429,6.669478552661348,7.029521134543395,5.932565921353925,11.37232859624351,11.04712932141159,5.357337062963574,15.160903171751983,9.661012137071307,4.787565763432022,8.979084608991691,12.35225990886926,12.14370425025109,15.076853039043815,4.843846057204879,3.883460516424826,11.945583612696957,13.960825881174586,10.49545314970764,17.904858020713142,14.390262784328147,5.9178527472447895,0.09064486501033642,2.0443329184374237,10.350840155726054,18.96365262076284,4.301127302568033,11.207412671316476,17.65250993664987,17.473069605020722,17.78942844593196,5.615880402013844,18.492107148992957,3.8146138708437682,0.2371745611211873,7.133342112911012,14.228258849581357,3.277696620524422,1.9494342090247452,12.032833341126699,1.7344242290383294,13.55599555002707,14.12144534440074,3.3956862200132587,15.354914309903425,15.733576926342119,5.407085574331969,8.916235695796964,12.959371065092217,9.588767815920924,10.599788620422688,17.217884562297648,6.212696671343609,2.823000485077629,6.967592127912066,14.82231871617195,9.480423822018738,14.288107537032474,7.70831137723301,12.72221782479933,15.333903878216777,3.4905377570499496,3.8707170114557377,15.461375812251514,1.7288006794193045,13.601652655744205,17.436096098118018,19.120610646883307,16.339450538882325,10.053686041750316,6.398001614570261,13.138732992822884,3.5084931660673213,19.171052316375736,2.087230830433504,4.608204293556839,15.527632400783435,16.353174413851775,12.180572891363472,17.93093266290655,2.9504429098218266,13.639240691121945,17.83128333672677,1.3424280168926517,7.98071756783334,18.150502923254184,2.6394700373914004,4.998128038841219,14.164170005383134,15.400794069920902,16.882692037351973,2.701652351303254,2.8575854434253056,6.276944672519784,7.4437755191588595,7.905606923753212,12.246125195838914,4.640646469878651,7.953594488654812,0.5395303903455373,14.669607370495076,17.268394685618432,4.539791961817108,2.4338468625581067,17.150556868653794,3.0363883640946954,10.090886285786244,8.332139032006353,4.62108257473099,15.016127868199618,8.73899781169519,4.116398043641776,5.894986519083045,11.706944320399373,10.040719437654712,7.793300211112073,13.963617928521774,12.298795779086035,5.8630527855341885,17.105017065724688,18.80571832261403,12.026012754908102,12.070680820715754,6.253523420554248,17.690181685988215,16.715051671657335,12.682935747719029,10.805766031288556,10.480913127028568,19.31655131535888,11.51967660737219,11.268306562250228,14.48067045288746,12.455861230233118,14.716193672292155,14.548219057169142,4.314602981860807,0.8759611101789933,10.822286061186265,16.71796702479002,8.353039597515352,11.312527885461886,10.213408890592754,13.701191068031594,0.17589569066063682,3.6895006633523986,13.8119538904119,19.552150639677038,11.366311535408911,0.5317123478546115,1.1945909507868313,2.626649300569972,2.182977129994761,9.598100907981525,10.957313842891168,0.5327951993871549,16.58007268886521,6.519572456305478,10.646890755057026,12.540154001111627,10.131606399866113,16.704275209249428,4.044465859439654,19.9597224301896,3.7804508485789956,15.959976713901348,3.5664799216324505,16.822490400783042,11.15621374298188,14.75810945996371,15.782608657156839,18.09579605265077,17.53107696446782,6.689888724179922,13.547551256474751,3.0528321306486372,13.057890457008039,5.650047935784968,9.68126389215843,14.01560634880203,10.58884246504416,8.850493394321258,12.015099154017918,4.690751136351579,0.2745765956618751,12.868984140260732,3.7387096239770345,14.239170075446852,12.775278460932537,0.5592955768693031,2.7149819721480606,17.43923410175693,0.15080772848408586,2.9222087591355583,5.00047000868157,7.727239958039447,19.162060723884174,12.785182969491329,0.9757904079460022,11.877645120454599,16.97345978993155,12.290324506570949,12.448307321707638,5.647312341046895,0.08355646444086595,18.814286497330226,11.595616648600373,18.8823068520399,4.379549141553403,6.82870421718254,1.5221972571011344,1.9875878192672447,11.395958243358915,17.273879649912708,2.874521540060435,19.566984465825378,3.6600780039686542,13.813128728806197,1.0292208887063614,19.472376212801166,0.24505508417691502,11.838057729737518,7.614628440797038,7.568077994081968,18.34048616639571,3.3550237862560417,3.7407500730947207,8.866457883865092,14.27198325228607,16.92294608133696,14.426266656853226,13.852900440690682,17.72539666436891,1.112958468487668,2.577780884463068,12.154244279490642,6.118252657435073,0.0863113229093182,13.966960973983902,14.664187632680834,18.99998103622602,16.749465170927525,0.37012923369757367,18.072328226750372,7.702558520647185,14.978629640330684,4.099264754934042,7.225207720063174,13.042189912121444,18.80637758403339,7.4749419022257335,2.337854884399211,7.497706153875536,4.27112587966584,19.91230582826087,5.517425086793666,11.551038571845833,12.244921671563503,0.26600669438248126,2.6909759273901734,17.278105336884227,19.020112916337272,16.84822182654058,3.41964797079247,14.91568121201646,2.3093337492187116,17.26146093185504,3.1038909240114876,4.822250993536321,18.77368151015777,19.416522994293537,7.707008247557976,1.9987882858063566,16.806811543075156,6.70435460995181,15.767682177455619,9.591577101156116,12.766492114233298,1.3854939231665986,17.34439148063977,2.8708262106162863,7.089269649057406,0.23267391718378772,13.974833827129993,19.378363641062105,3.138129914402601,12.028529236773311,4.429371877955419,10.434593434713438,13.893621017442728,14.924037115578122,17.66905116877638,18.064063006534454,6.290400882467542,8.907170718531262,13.435440466821774,0.4245714334096373,14.196023570568386,15.211953794016392,18.116322601194717,6.648587393492731,1.5162059656621096,19.53162452934434,10.491420414969465,13.80169005576989,3.5266930398660623,2.9223614246642082,10.079653340053252,0.057969312434758,2.146437696408743,3.9384407998152193,1.8757985479224537,1.9174802734906082,7.9559009166396155,7.005871183366308,18.199058298560296,19.63954872477906,9.891268703248798,8.442735162614952,7.519909607420572,2.935114880766143,4.668433147495019,18.02935598479014,12.674264863921238,12.897075044826876,11.231379643675394,3.4231466519190112,11.164587757172395,18.916404872665634,8.352765161221075,13.480372943873942,15.250608762827724,13.254603410931423,15.716126251930698,19.136269128286926,9.852946843701162,7.638713604210139,5.081048094084637,14.569416758139951,8.079519859431684,16.879105535410538,17.1634624643266,13.015174804296334,5.62710671457368,17.333375957549116,8.503563608281146,13.84986344516137,6.873214439173148,19.641201907590514,15.364490285723358,5.850972927178488,7.180063839131603,9.128109054753576,15.589227420995764,6.329775200423602,6.387985203730815,1.8796399338373915,11.897884384290553,15.877765633921953,7.169652870509604,4.940360265703707,16.76509913218733,14.001053677010793,1.7044529823696797,8.534224522886046,15.128542402345179,6.735970617785498,5.585819498878011,19.67245322375223,13.38322116067971,15.91651094442351,19.212540200470922,14.386590802393261,15.397855700024756,1.202324362606575,12.398330021794575,6.63755319748685,19.200552471751635,11.358561372895393,2.006532408196211,15.701037344837964,10.161416196414542,8.48556262828902,12.347076749377731,0.42397708949757806,16.548606140397656,13.448826370027831,4.113347994529506,6.432893216883335,2.576791024049383,2.0922945018548145,6.56786583473409,16.781965070593053,16.41387440182744,18.650388417627948,1.2229584027436013,19.018559019250475,9.861370949673205,10.489261944652416,13.709509116277045,5.493237809273972,6.628544513974153,13.252062793645782,5.863568350649029,10.58458738774689,1.9974913698643038,4.905381329217469,19.05550380065893,2.3370216255640353,13.959469269696733,6.636417713118665,17.976560295192343,7.540672025140975,17.65877742610437,10.081351305558002,15.394142875296243,5.571515334493138,10.011504217306623,18.570585404358482],"x":[6.026534559045576,13.875027760440293,5.45132505331239,8.59266630164119,12.666907286439756,12.786895312835306,12.787650889130852,5.534648188846041,5.371887920391978,6.214578772654238,12.894851878169472,10.549187116446992,10.722766962473266,8.980101442712598,9.157836589149548,11.294020322800822,10.171392032086644,14.71861101989095,8.278777343773587,11.178013725956772,10.343196920725983,11.855079940933306,11.586039929200304,8.050223504681966,11.35253161305813,14.662648635971394,10.59640455533165,11.433477028407816,14.239952733826776,6.19129048838766,6.354562963423625,11.020283645022253,13.49785695876058,9.35334925431912,8.928999891057185,10.316033866747894,5.06880042428731,8.312245041226266,6.7998425987082385,5.0979334139717425,10.669030963328122,7.407455088145682,11.038850028433735,11.211218889481652,5.407193888563273,9.067945384305379,10.637939049279584,13.642495412587296,8.75921656597182,6.982625928202855,8.25430190827241,6.658505833820034,14.447674422469385,5.665984637014361,10.334959476845277,14.875026607498572,13.852905283270742,13.164330401602076,14.457913535316022,12.401926043934772,13.698113309870973,14.11448432167038,14.038130044335837,13.587514345301281,8.551569136784513,10.584155540520126,14.094237008234824,10.862449544496226,13.881743933033583,7.341108023111813,5.634017915105892,9.487285201785946,12.051546054824058,5.026939742971159,12.994241235456164,6.896887431410947,6.9403277257530345,14.176523409939676,5.944887055695418,14.637843715849792,10.390711873749632,13.102116406419908,11.692071927036395,13.705107359123758,14.470985602480226,13.79126191038207,9.345805802121838,8.195788127313392,7.359627715275662,13.445932501406773,11.225496279855394,14.339884805965266,14.843506988396229,11.095880311942912,6.635554275995412,11.072534599829622,11.985236653933832,6.750775255592809,11.455181444288447,10.078165240033632,14.933648379747638,11.83662360969125,10.481321331326829,11.227576146059889,11.241832508669823,14.33603681936467,9.433070461751607,13.178185510231181,7.687960352624065,6.393720059663162,14.524196013825062,5.558998937084178,13.63045209161529,11.451483411949084,10.94404462799696,8.698246949987908,7.238664292921624,9.163248177212186,13.045802824463479,9.279761096144593,13.71005251334845,5.229677748285335,9.147981183451193,11.176106051930068,6.283011107334326,6.496567339255293,13.195510568882886,9.059739184916534,8.930671182959895,6.827365570779847,13.45736602430005,12.374409823972787,9.131810828171895,6.933756283180575,10.951048904723015,7.135202225362147,10.688744793381236,14.476007468721955,14.433970238494457,10.970243993238375,13.437184908184614,7.6121196344385815,7.562806123051848,12.619132944509175,5.315782380482106,10.939432444833217,6.883853108627635,8.85961785822956,7.297789768678591,10.325773034099964,8.225404228751973,9.428963481311204,7.613513862692926,13.668282140717336,6.524581408519719,12.769311523174771,9.618292896511251,7.472125151571043,7.0617803505884496,11.659679846246211,12.061962276213453,9.147593460421984,12.585297932733635,8.467719952853159,8.03491087344373,8.933369944912465,10.910380375079496,12.08544957498183,8.437176662957352,13.624934948546354,13.740234384529181,5.7825751215339345,7.315889561487625,12.347078781228687,6.255524196633497,9.93203805673697,14.893680234496621,8.9051686039288,6.520780953169423,13.061716995978038,14.642628010395576,9.250369351619415,6.264509939790511,7.565277990989861,11.758135152890542,7.328864181083034,9.349654425888623,9.720819745382641,5.548110838549965,9.947788820147721,7.51923376650395,13.60318489793446,11.251583054976823,7.218685496807451,13.050809954255197,12.575974365791517,10.482346453250976,9.648485455731716,6.849175463312673,11.06881142438311,6.488526270877966,6.793284361859668,6.909849996840805,7.007898711491833,9.686044898220596,5.477573801835178,5.113115461193203,10.704835087094262,7.422142110252632,13.883240903817423,10.796737172452547,13.488220916853543,7.589453762038405,13.390037809050138,6.094550641883831,8.02878839758206,8.69596751573189,11.200075736005942,7.484249865080805,8.142523404167436,14.860370978483665,12.07109716467045,12.882995155323542,11.296064297333238,10.01615101831704,14.643507996774769,14.90237104206349,12.973291009810804,11.298715391780778,8.975399644380786,8.695060351441866,8.980753059626295,9.438565554972275,14.605002699205151,7.4970479161815895,10.864969095134677,6.739237758500705,5.56790730012322,10.401801150863738,6.609364517569956,6.487464694040927,11.700539327129684,8.418288595151349,5.660730113042263,9.710178973264792,12.102521546475899,13.852082402294371,14.49117297910499,5.457304211825491,6.293673080041621,10.577632738906086,9.839257692452392,8.124129915289986,7.679370149058091,10.980555542703476,14.057260836895239,8.654417306035306,8.420787115345245,12.785825473220758,5.9086238097116395,9.866477534553582,13.0476103389067,14.154308944513422,9.805004798588918,8.389507179042273,11.080476394198461,5.015969480075331,9.83214358764521,12.204877041542467,5.972222005955013,8.458894421322245,7.279938160952479,12.095739879901934,7.9437814715076005,14.84319758248363,12.290753658426802,11.526820943222125,5.687506874697368,11.58423806645221,6.057925278703884,9.036968558874436,8.56792596250198,8.56509727600103,13.485978226818478,10.050195121765896,6.4118675146663895,13.859007605679587,14.416817028867,6.360159009743502,8.922209736947963,10.531181896895735,14.401082932784536,9.18741243226345,8.007656348171626,7.508903807548695,5.792640100529026,7.599603975392412,14.676750986731475,14.47040076177494,7.974580064588512,8.896170730941543,7.138009440364474,7.757134040825477,14.2627564807834,14.428912257433588,9.363356151952493,9.765366936702646,8.944958192380783,10.998790154573506,10.486581131409416,8.320768387451889,14.174876019420049,6.128042626344592,13.971997300056174,13.129352973164075,5.49320952276501,14.29620224202927,12.968051915149921,12.401068081645317,9.494931191650775,14.726433482794594,6.928681656464395,10.524177958012736,9.1772144859912,11.127422440955124,6.388034412990344,14.326078708232286,6.454347710071746,8.38164914592747,11.904523566399593,7.396204707665223,5.337593189680514,6.560192760296529,13.39225924285568,12.081970663093756,12.348813893513723,6.779588761852933,7.213259358938881,9.036533658512106,9.310949235575578,12.82977183685972,13.600007236214326,8.19612447717593,7.463495848774722,8.13737005663035,13.233504987507365,5.473697983528709,7.980547205077427,11.65107640666789,14.113936151782472,11.780741887838712,7.638837756890052,5.53803369415979,11.398769991500213,14.533955911079294,5.146477226099684,11.76752986227633,7.5270347242244995,7.9214710719805055,9.037791135135194,5.479428734515497,12.70459384744093,13.41115288395182,8.268869137778122,6.151086130183348,12.254078583757313,8.437986725805116,8.987377260588026,5.198715743266398,7.537104908703327,13.080068807744958,7.161510852519202,8.207782737154371,6.593598792057129,11.382269365670867,13.0566479896539,6.29430049908609,10.114439617266584,9.743756835762984,13.903141773161487,5.371479553001821,14.947899244534387,10.757849756070954,9.474701971321624,5.386820194146853,10.81613355730237,11.986907747842746,13.44938104508593,10.432129013985822,11.386933700265923,12.781795332618469,7.022799134782957,8.453604230743148,9.211782898698406,6.539884792071762,11.176809360064247,11.011591293205568,7.637019618317138,8.00326942601691,11.088695144846374,5.422300717426105,14.985999201450234,6.666911111283424,8.863581042632365,7.574934296002088,9.733955747850331,6.993602854973863,14.127772647532773,13.189188086504666,8.697275118765763,7.7548913115199,12.204055792721878,11.303377940299434,9.213184386869509,9.510261605900642,9.202057502050337,5.312174950255553,13.470160142803874,9.2162980051171,12.527068205739644,12.951998870043358,11.912053015014584,13.47892139813059,5.819171042905909,7.9066485749525395,7.236899320831234,10.231183586822635,14.202427339755214,6.101870232417337,10.26803401078485,8.583053875879553,6.086167174034552,7.324433679636373,6.639460185979546,6.121781432285989,12.15710736635116,10.95071595122743,11.96260394886734,9.106325945826981,11.05998010536805,7.859824000226469,10.670270256940558,10.060242214566665,5.180431645816935,5.4467556770209296,10.549860190249301,11.895094633884426,11.167700375927023,7.343312734940701,6.230743138438566,6.608789089232134,8.012503505506945,11.573596006470169,11.50150255017937,7.024201086003061,6.196912455247117,13.96130557658922,6.049481002018973,14.447342592249722,5.091509521630098,12.147250857036866,12.401090572879589,8.293410158069246,10.535039957140444,8.29601221490548,14.437199322075799,6.53004165878891,10.468058659292918,7.795941191880795,6.808632908743933,14.353700519822219,13.751742337823188,11.737714410356912,11.84430835733393,11.177718980082139,8.718964955314377,8.934488845662687,5.2915567180810115,8.772726416868009,7.316846300241182,12.40181224923625,10.929497336771497,10.901999919691445,7.056145651467451,8.211888901379803,14.557528454107176,8.273417327120256,7.572441826104819,7.896673922503734,8.64448705004625,5.031535577947985,13.84496011156336,9.925689081234403,7.7920024210299665,8.35308297492884,11.300499750190202,13.328186844868544,14.002218411882348,10.567602059323393,7.954063866363146,6.718429168335412,12.563284029082801,10.797810868917502,12.17738714602547,14.664197223385573,5.716668567693413,6.140136319820025,9.70869373159533,10.748836286856037,6.327785383367521,9.555323813146677,7.40649915239217,8.92388027834891,6.19367730592574,5.33313937081394,12.450938655618584,6.454493259358902,8.087803098540485,9.811037121885258,8.50373262625448,12.079367293926005,12.60986051514423,9.170611983947214,8.875231116741514,5.560300327158654,10.895721351447314,6.042890252157442,9.781614414369816,8.791732212725634,14.135281440401592,8.0591347828585,13.610578970853526,10.096619152192725,5.289937203710959,14.853778029360063,9.313963871153486,14.86494849303244,11.100124795829805,9.765447638709317,10.01740324817808,13.890125641696809,7.5335161908041375,14.31056961293518,14.093405756149348,12.725506959193408,9.203299267517561,13.624701040672612,6.051792477829629,11.409244348172267,6.250760475118153,6.274642662256589,9.236154298120567,10.928416217276304,7.303952965286635,9.35574007072952,14.611073005967327,5.971640192810486,9.516773858318901,13.889353463424378,6.1745217632239875,13.660163543988409,6.853975400465842,12.708661686207101,12.423475613752242,5.367370161143081,13.997829316999333,10.065529795987997,14.164614493372614,12.231281297182964,7.419579706589214,11.524263715260963,11.023489357771425,12.418868385238673,6.889365648429305,13.52757772688064,10.438314989466384,5.55159933764382,7.943300479639435,5.17109377826076,7.267774679555576,6.179464366583895,11.263551186886666,12.284923177891354,7.416583392789564,9.787479659116027,12.324038106080987,11.128338564137382,6.167056548629932,9.62610026833054,7.185353700070529,9.480929364877897,9.34493611420654,8.297748178712185,12.515316721214313,12.430591094961809,11.702360291542524,9.534983167717863,9.289487656850275,13.009878616718463,9.646163574315992,13.163727322315854,11.35403899565219,10.271543779712594,14.885031943058449,9.222315739704223,12.225826325651042,12.7242028281602,5.35911664957599,14.965541497833597,11.81271634697328,9.082410036651272,10.109067388649763,5.479247904525284,10.902848042519924,10.698432319414232,7.692298042952485,9.908657496410594,6.862234424651539,6.06978316307649,14.371953950727645,9.220964677169572,10.209464497456127,7.834656564472493,10.792591084040701,14.02098805695685,10.728897399852404,10.219005160931626,12.39718632279757,9.28108514338064,8.236902002254636,10.885090228391455,12.83204825286843,13.17365752460854,6.848034337965004,10.584622396030326,11.784119104870971,13.240813833355523,9.136722285593065,12.303106264924049,13.883209048102538,8.874310056628403,14.886280503220577,12.528546059656227,13.91041946291326,7.898203181981829,5.070305869655334,11.100052085658092,6.465517711523001,5.013699337920352,8.34546628203816,8.245139936208936,6.762606446150292,9.704124149319824,8.903464714316625,9.897601895016185,9.4787681382569,5.594942428912411,12.8780291570936,13.904221463793533,5.362465039030388,12.435957519041228,14.113003239862053,7.544672429552046,13.091741694375562,10.609979340385859,9.893542607120482,5.024397533658687,12.314762426901197,13.942217351033372,11.51911145988297,12.161356423066378,6.998229370012423,11.88415264119164,6.755579954065363,12.653768588766978,8.50277704158197,6.844774679473624,5.837118920772695,14.060580846484692,6.7990976570155,7.786271897706958,12.132906854734314,7.906335213404809,10.239447998604012,11.527085879765268,7.903971096935509,8.387812400490699,7.197825534345594,8.067239907434004,12.936774071145482,14.008884189614806,6.89222637272761,9.659431403924557,7.864729324576305,9.365585956464937,14.61096802203194,5.90808410340856,14.17792899834315,10.93698266323543,6.357020044274622,10.756052156274178,5.478178933973396,14.469183718960782,7.269569215709204,6.952995824907086,12.836229652177254,12.27158522152249,7.08288315319612,10.72695400328697,14.954519791452672,5.541707241944018,8.975591658225824,5.448132001389665,6.098086195473902,7.826617318746947,6.2099484074244256,10.881093065520648,14.877444221702875,10.201606208681886,11.8856505274385,14.910142900339205,13.708840330190856,7.099160653393439,11.371514935386916,10.177296063343269,6.003461803874364,6.695646565971409,7.923967286625957,14.408239509160563,5.475341490406289,8.927486061830962,7.336591335494809,14.468606106637289,14.74659680693804,12.651827299168001,5.5798163627751425,5.004654880218686,5.566708069401143,5.2930218478973305,5.478882083476311,11.590433384529792,11.956873972834863,9.843683295337522,5.9033646779800435,14.089888096693082,6.56803326881132,8.345250361733248,11.847237095926433,7.539997222367985,14.884138785794928,9.733154234318773,11.932093760996285,13.059274286582752,14.929266160643424,13.200318615465463,13.305569697935354,6.659241888925758,14.69192091237993,9.711926498650978,12.043070063732413,10.85080301512188,10.304719522678356,6.241542778312534,12.75536212861037,12.10456142029865,12.032477841278295,10.172116619626287,8.19705654109401,13.436579534923837,12.728987190444423,5.534031323012529,9.701060535587336,7.107225436102247,9.284835054512946,14.164947614523161,6.645456368095372,9.46895029603237,8.577109346729785,8.899502376094254,9.442898705774168,5.4371072735253705,5.975811143378675,11.393911745084726,11.622776633097036,10.667524501019649,9.921748287306194,14.507970066374432,9.17590987339441,9.375898245091165,8.795068709285928,7.8924720766538,8.976287395795557,9.548683763820367,14.143919040354035,5.54256176613092,10.936677619733786,9.257144452903137,14.991522607242718,6.296887386856794,8.71685483557737,7.8394086579721955,10.058125260773972,10.54007729527477,10.580181909030554,6.544964562963711,12.62754727155633,9.517917840718443,9.389716595387089,11.538841591352423,14.61279897412411,12.410600167108885,5.409049824055767,8.805203277894202,11.80369853864593,10.757416838894283,7.705469979188626,12.970916961354542,10.710731593664315,12.924387292487395,14.660601282147603,5.45160987573219,10.183520820710381,12.533496145335272,13.638427774363135,11.148386609491936,5.21668393731024,10.493366171943688,6.28394230437979,9.796449805574824,11.658551013686115,14.92612892085005,11.330482501690152,8.597079292101995,7.794829914102994,14.001989402741113,5.108574385694197,13.689782571280505,7.095416558392356,7.2128203109347355,8.015213053514739,14.891090450209196,7.861775084277262,5.467769793553265,12.577415718194786,11.84081546229196,6.960982069941009,13.717399823870203,14.095227734539684,5.954403205142002,9.56434866758057,8.260233929052774,11.911727704316672,11.0090319213834,5.959742021391145,12.205035330374931,7.55737112463295,13.551088111175407,14.252104224049184,7.703855268612816,5.558328402378088,11.226019915338401,7.102610950595356,6.265809117645733,10.416231129835447,8.952907847475844,13.875124997225281,9.562541808706978,14.36445096912166,11.478723780613711,7.483600781687545,13.473414018525066,6.8331613940582026,8.132175023804752,12.20362981122496,13.794912816177657,5.111174667699103,5.742069233703031,8.251367766281144,8.33818334446101,10.866214328775767,11.04107376287464,8.516956319989717,5.061541315421163,10.188561284331737,10.479333836208175,14.992368922897416,10.080146179604156,6.120861156640354,6.393839844914579,7.262002424434737,9.087236944084164,10.836357260034731,11.499110258597476,11.06234608336293,11.215819901327325,12.332678871183354,12.340546234410573,8.961961294444261,12.570205413442983,13.889073351559219,12.293999198351113,8.514302328714754,9.440183018299109,6.4121904041896,9.06328616896997,12.769026967399755,13.31141030731736,9.821624506294384,8.813448042932656,14.724373849307778,11.277072972377805,9.807042048317049,10.221560549527881,12.834733949628344,8.204314305631028,6.038632603176188,9.231680812558785,8.203827978320104,11.435255318272912,10.725098947119916,10.897430370780981,12.406262918060893,13.25131288065025,11.358922366019822,6.578776398896764,7.553853066035117,10.966246380382277,9.059437068774177,7.159474215733552,8.511858997195812,13.840727551675995,10.21653728231547,12.12390938165725,9.30803082686029,14.307885668852078,13.32816320504729,5.1542338858344605,14.351887440855462,11.358728272656593,6.381888001238547,9.80818076127899,11.670153416899229,5.8737200604638655,5.617521780289936,9.738276552483157,14.373888076248765,11.852210329391532,6.434790256145588,7.395391654885117,8.948323251221149,6.79050756462551,6.818608803760973,8.87969600709663,10.590608621746666,7.2073987744901284,8.731165869814346,8.350748229744038,13.17733602459182,13.37855236361965,6.164486541896861,10.763026166672255,9.90755873418803,7.387571673345703,10.885605406217064,12.418184097096045,11.730019479009432,6.039283628266478,7.780798871883778,9.03793316478486,13.884469950559275,9.637007134985279,14.004053690205922,14.452714391091463,10.873057062327344,5.111001090429683,14.882897041390365,10.229681788673734,13.675499982014605,9.780806523133442,14.578478592065967,8.51852738091541,9.214841418479791,6.453846977006139,6.681430618124697,8.849726424321979,11.168041575448001,12.325894266865937,11.133308366432612,11.962843153797127,8.768738968151393,14.573321850708483,13.478949858534188,6.709907960793013,13.962959603546263,7.009513131366156,7.50764504180381,5.170449430310764,6.514970767198567,9.129310378377252,13.833152166408777],"s":[3.525474195920717,16.796602847075693,10.914775570242838,10.102267766517606,15.973450143809904,15.731497089812887,3.2357282166355406,16.622630077391932,5.441963122965481,12.290678981155976,18.75533604050165,13.711668883714312,19.742701482456546,16.32596139721686,7.9655406663774375,5.0097030312455715,15.66914417471935,0.5343315582544195,1.239282985022796,0.955222941244207,19.325551069731155,5.380429450906972,6.481479845122435,18.472346800385022,18.189761519622444,3.6970921619869523,12.61822387273407,14.45666859235276,4.1588087944386,5.240583528171019,4.911236320403778,16.01486748485285,13.747851792055679,19.3380307387786,16.897962327399583,6.606565812511653,4.193142662582412,12.979055117587208,4.832187517008224,1.8455570744802063,13.091789298908996,19.586250113048127,5.588441756224252,13.398166723938925,2.3463940565922936,18.975358029303532,12.006563835463995,4.70723944413014,15.563716730272322,12.384362407980047,9.856982706644173,14.131226531130988,2.5159179595752423,18.832623830271437,6.02542180573995,5.546515204463756,9.127101542715575,14.568666283550694,13.608021066660747,3.8010092592499856,7.111948777581727,17.13676418406754,4.647632322191191,10.599032952493456,18.599699071318266,0.1734987625266582,4.7769942359759465,15.463528212751768,19.429909155045827,14.00921159965046,19.04602490572946,17.47965985709541,3.1343487923913482,14.794689013151796,14.848202188999933,9.831124102287276,8.257283373453518,18.391291294167054,10.167247791681842,19.22255089041983,12.382003464445477,2.199566756386173,19.253541443858065,12.842701706963053,8.331163999662303,8.003660559630728,16.75662026787654,3.226469437271784,6.363153991148889,8.205196557324946,8.449308105936456,6.945903215417246,10.731528667733198,14.528157517584965,1.753803236358591,10.245204628149578,10.961700313741742,16.873577944390966,10.667658558539546,19.67955563992649,14.860474551188329,0.8441654071016558,8.110819523698328,13.753132591065103,11.145713602715258,3.1910387714815514,13.381684521282642,4.535576353349344,7.6959790470209155,8.440546339378523,14.506718437671676,9.544633035290389,8.214246080204259,1.089145859248526,18.836883624343812,1.6152272804121859,11.06277689718656,7.572816443859076,15.696727385799596,5.917316708723077,11.793017354720421,13.007990547326106,17.706824025741426,14.067489186058832,7.982833736434749,0.5496140482709944,5.691841169427279,8.205592088367508,0.7530826505461885,9.260962933512173,2.4401340706002816,17.169275630646432,12.786952492841973,1.0965187782876207,1.3763677980161404,2.425711580730563,13.235465171613946,11.849478705838665,6.31501417271457,2.5942851427209046,15.945058143262049,18.44046091560605,18.501928759640833,13.736738601348986,7.581914619767152,7.21027747233292,4.916318033416602,3.205654021071749,1.1326026700582892,8.64905871630041,13.957000763308042,1.316460468050198,19.37656060971669,9.41556281851378,3.1180313470623577,12.185269477679626,15.61574723511725,14.854326146821059,16.34338837031582,18.327806951418303,16.799452833389434,2.819618690228931,9.791138652216063,8.235952188307905,1.2987348413749267,2.1155854481554437,8.300263775005234,17.138571017578794,9.240553274191834,2.628171654615916,9.593836437355868,18.125533150332032,4.791094799237361,6.71250869058396,1.9517825606354977,15.682766629481538,2.7204667813649808,4.3610768264351085,13.514965392891632,14.230727743588654,10.599210968430182,16.57170442409271,5.072513535441394,2.651756871716131,6.7575616021825935,11.422240238583354,3.1526680550676422,9.570152062566368,6.473945976352895,16.476071089812002,6.731216668822109,2.3866483286786577,6.0045380738882015,2.3792718779937116,19.349512701804006,12.169496450988415,4.389003557857638,7.715340720315682,17.801514247857725,8.19308575588694,5.8646981852549995,9.379492355009265,13.56816812336291,2.0721744953903887,19.708179562830203,6.47886607743128,13.408662374391547,11.460751410856549,15.635217560263985,10.900825649230201,4.995142639049952,19.77150458330918,19.676117074739782,6.62907095394516,11.505528758482807,4.866629352399459,6.548580610521486,0.1376899861275227,12.088838350692859,0.4977862150330248,14.123787498796446,16.28196311371291,19.510953825401206,13.424795321747851,10.553486156950122,1.5639186451603537,9.308670420094804,19.344903324933227,15.801471783822487,9.97968147522592,10.069558553428841,0.0007527593515010977,6.763006737294246,2.9006800809386224,1.2791079323732424,13.71431834509956,15.24684261085179,19.41616115355489,13.884213851452811,17.040582555565166,16.216109022001945,13.478738360468743,7.006504571359602,4.613337780980475,5.050403258224967,0.4500708445288737,5.263021975587354,8.777740086356385,18.85789881110074,1.143086046513817,18.647365732221356,15.45519309145063,16.79012249249956,14.237730557335428,11.061447596883983,9.634419696171541,4.753376364826951,17.462645479894444,9.911300289196667,14.616504359530751,5.21493042876652,4.180358295509223,0.12199506966266593,1.1364371342764779,16.83864578879353,19.199299595145092,17.109202517030955,0.20361536346553688,3.351680473807228,4.40128621871839,9.482574742867769,8.824050643026187,9.302351547363582,13.599749195126938,15.711906645941522,12.277510502238925,5.405651012813881,17.934097768207685,16.45031648512941,13.471889160267217,10.533838907654367,5.3099556380414015,10.12389105575223,10.043083915980585,3.804988438147916,8.821278527680413,17.376265959782856,13.384310430054448,8.026911230647995,5.216475870658002,8.077094804321048,6.491154482221648,17.226768059715685,15.63752060920136,6.428082154298784,0.547375062772697,13.138202083207142,16.611875542306894,18.24649245302107,13.864509734832149,7.739747235979624,10.472190031899142,19.48190173663501,7.892083097316567,14.702589307051213,6.148482674384481,5.3261264106223605,18.522462205762427,0.36996734877920545,15.50859230419249,6.830119143734383,4.117195421023365,9.035312763360675,7.6152397745683675,7.041035380980638,14.573026679885398,0.7787671543049512,13.735079725490777,0.19778375527684577,3.1994247021475752,6.543890115883655,19.322384141514974,16.65449688766826,14.092729891641875,7.6673246956529795,1.817829871000809,7.548931171314508,8.863350410478695,16.447913991534087,16.589998975597496,9.859907214691134,17.776107954396675,0.9834822750256667,18.027007570923566,11.8228437364535,14.34478944163474,2.8585107508700736,3.465513324877536,5.227491103243724,12.35351991044717,5.187465249742225,2.095777893408828,3.7942150298653754,17.768798796548474,18.235941780571,7.56978902270407,4.832095611469347,19.443968997757256,11.436392558926428,12.497365496648044,18.0655204598437,13.949465648366871,1.569469564445738,3.042086082082749,13.250156487167999,16.38894035157321,10.684772988591442,1.0938048255729482,13.267883671970022,9.84495187350566,9.548663245114085,0.5917532313426177,2.9275028255481583,15.965286970219204,6.9410445701669765,2.934325063298222,5.139516742446495,0.24201175107823936,9.68878435649982,7.700801306254159,17.312690945762025,3.3149013116262305,16.941895491179636,17.406697657195714,17.936466077607975,13.045338294492513,19.204118956569445,0.2470111796850194,5.07033453076533,18.651018303079375,5.510725460077821,19.757613361480946,13.979035723303745,9.601699079728974,3.9018001733283247,14.555939589099843,14.022032652586368,7.729121852596577,8.401584044615028,13.365296243372903,7.859934844105991,15.993177694672154,5.677383660925708,14.453767188058166,17.02598979253924,16.672783194164083,19.106189650424646,4.881436510651094,5.7185933734619,12.42888182120402,11.84801001597009,14.867850425833984,4.780613061704133,5.862024187836656,13.807934594621077,17.719499862452366,11.496491679600283,5.291961408511328,5.82364783117113,10.265884673318686,13.765536461081291,10.892315348856098,18.53273631622795,17.4697269224164,16.42334322452613,0.7020252787159942,4.106287636526558,18.50379379032482,12.714983980965151,15.673351945472058,2.6683801501974758,1.6588612614826515,6.951328259151177,11.060532853396454,18.64796402196021,15.005330687600242,16.41509764965359,16.041170967669007,17.17696078319416,10.837751424067651,0.6347091926831316,3.0173644919624643,14.07749240748593,7.2721685392834345,9.812351804018906,18.542582566234856,15.009321245734935,17.39019247772561,6.3576099646369055,9.325227041798666,5.725290640091347,17.64616942850037,9.443422574252288,9.900713123877605,9.97004952637572,12.079557832228872,2.040053623946103,1.9232742455935536,19.642192285377572,1.932304167374994,0.7556950282814645,16.886316640276156,19.970440042723677,7.9390485853476855,16.98083746788612,16.702574037334973,16.176740949252117,12.803218475513951,10.382981946924934,1.6626584652714138,10.64864107917633,19.36187343922366,19.29092630938858,0.5868727242845218,7.5840019513028345,2.974218090672358,5.76302150576947,7.769860446305663,7.690854558857989,16.824850749813947,9.743826484640472,6.8936872634819935,11.429269606332495,5.171784211207373,16.906497545201866,5.198233499590694,17.778392767318923,9.825137224823127,14.316201236096347,19.005474687484586,8.301522242638079,4.59521235839941,0.8641540582896035,18.282637931138645,0.8356192065857604,6.095284808479988,2.875114179220195,2.2313022607229005,10.916650014770601,7.3620482545035415,12.553306042731798,12.247789217634546,10.24006991344435,10.601584547793333,3.557837529236565,4.980479750925371,15.906993856836937,14.785900100676379,17.46488200154625,13.662522737599033,17.669614255958116,19.134891342610388,19.26587369068934,8.823904334574483,19.740646583833676,4.647195014667926,15.601846446809402,12.696015813919729,10.272384332837415,9.35356549732341,9.251307024952338,11.359968039546535,16.158625219629474,9.793044024735362,11.295824056667882,9.665658076074255,5.867152487827054,19.28194312158596,9.86529818602325,12.074798367605073,9.354710836826609,14.10423172980626,8.64016654863283,15.796755696380202,10.044247973206968,2.989907502239384,8.66453612518534,11.417151336030242,9.130157468409648,2.678705765046221,17.67273005423409,12.95708110305334,7.271612421854652,3.706997430054071,6.65162006121367,6.2795799755138715,15.697792079637827,9.730616101646703,15.34954363919689,7.253809666278497,12.079674658973616,9.414602495204395,3.6793083211174737,17.200834005588423,12.494720977203254,7.017935621912095,15.42639800535241,11.815380252255938,18.57830389341778,14.317334823908482,17.108271718435052,14.73418544405627,1.4092090601554075,12.529971893775356,1.2689157406814289,19.97804172150869,1.6305308833336962,12.993302619642378,11.26980522669859,16.07790912889186,1.1517107712546348,9.89525184174064,19.91398644511856,1.2009578761956874,17.939183223773423,2.8101173924273137,8.743946071828104,7.3305054828222405,11.634967039997504,8.572333905667957,16.768164971774276,10.14467819356748,16.017055102290804,8.896097431590002,5.522413581431884,8.073582023820292,16.178221352565103,2.8081997819252758,3.1502479340052902,13.316105828695699,16.467233618951163,2.062270245020139,15.03836916379413,13.567987195924704,8.835183203284384,1.0874927225545017,9.448620592254354,14.153612773502534,15.761555019561078,3.552559502601591,6.456556700474141,14.566182259572923,6.756749092686696,0.0853657254116813,3.6539053109314468,13.243202070554698,19.05440617426236,4.468514396913359,17.60650392390318,6.355410721782104,0.9486317938298638,0.5686996812759126,19.074391994964728,5.900868653285287,0.23807442123680467,9.348900263899878,6.172110231558534,1.624374599471472,14.019893691784135,5.850464981911552,11.961238891314817,1.534650669555373,12.845831769203745,5.409945002793575,5.405542430726871,0.836054680721241,18.717826828262556,1.162865015687764,2.3621077532526957,15.335464546132647,15.30803255813941,9.391487914574043,3.5002026365259242,11.55794039505501,11.541815873728961,6.556583451875881,5.869571306363031,7.74885776925978,16.45922545857286,4.858223762847453,19.815855988920003,18.167643703756973,18.396829004496375,5.319575352728458,19.274840252274,18.81537392759491,3.696954707381628,15.045726460562792,4.870244198513949,12.360244121136908,12.4631515303665,0.1904761883049222,6.291280067126768,2.6564360834854384,3.0867313347428205,4.443705752635836,10.297986493977174,11.71818093998668,1.6232928377349243,17.896850079179636,0.2728244583781736,12.592229921478157,4.197885509981791,9.472607712202361,7.579152462722751,10.33418572211005,2.830245853344726,14.023795092465354,12.499931049541665,19.315064751059023,12.496330956596463,0.41481417638722373,19.63391560727387,15.257642070864899,11.825422827505152,6.321655091845355,15.788743703608933,15.284041359200288,4.886273455899017,11.724342700132876,15.061442656436196,13.98372552777884,13.846935780502738,13.38038118171439,12.098654897662197,10.307695151258645,14.309612311909685,11.278441584674095,17.604697332870813,16.237636102735358,18.22063240439689,1.8778466523277704,11.602367143959938,3.2620502563590748,13.077776089861782,10.072483058472272,3.3073821838906126,2.09849581419681,6.439569127472544,17.14626542759958,1.5291496467990706,6.83036998392728,14.02129651570327,15.365169953581624,8.290414481007398,2.0359616551928816,7.916756553362663,9.709680984763178,18.334774171221945,17.38395204216961,15.021545757997732,19.703856134349117,14.355092704322834,7.623847996432591,1.736641502085181,9.244680034355728,18.171612710109738,19.241840123946254,15.48488555434643,8.60268165664369,6.404758049435637,19.454650949806304,15.122720476322758,4.49029066938087,0.9880401252600235,0.4291668836513418,1.093533713791146,4.497525497674948,13.295853695318822,14.25765780695858,0.5859622097458672,18.6725761054959,10.709380414849825,13.26463994708979,12.636115136502063,18.41715821490622,11.525584099960092,7.2653699552744255,6.168285130846685,9.15588581716342,18.91503384561842,7.541693320528515,19.84704299817535,7.4512671672810615,1.6608845480409373,6.905463270645664,4.9882494685789425,7.293350706264192,0.5080529149591495,10.419487835927384,11.57202819644656,19.363091180930066,13.795508819545583,7.375365191409098,17.187736372038284,18.95082369535631,1.3713917384252605,3.065339871717163,7.245425215547678,13.07817095334103,16.134075864526295,12.523304730875807,5.13665859609894,8.830286674562258,0.2438403374943432,7.485618897488573,14.011328689578688,18.888784694004567,15.47589313716438,4.023974324056798,6.641069259094037,16.830683602706635,0.10206186668331174,16.32194973116139,10.833230648962381,8.4683126731312,15.532545790707374,0.1753165922227229,7.29548848619578,7.143705341310045,15.499235829241513,4.1610708797793805,6.867868038683884,15.032844111183596,14.069834027138292,9.829270138859375,16.411448188255868,13.976565635131543,14.650489693999912,6.898887482847593,16.43772901514931,8.824548755730497,11.643178796229567,9.849748454542366,5.499284361575145,15.159998086764418,6.76989300332802,12.782760351673694,14.909690794621948,1.8461094950717483,17.61166042981376,17.234115093484807,1.0572166961856633,17.986544760812375,12.013636010113009,18.850846204130942,2.0425422445762687,16.502271369581866,3.744276491337293,16.096740160205023,4.342045993184773,16.04272698193619,13.081759079216564,11.015139586650262,15.924399324198122,17.549576425373765,15.878101523397138,2.62033944722166,17.727200627370465,2.9584162290217053,1.6564052328861267,8.926439177190794,12.392607492169457,4.4998600294950375,6.497242603853621,8.656424382017725,8.39850251404024,7.083856829457913,15.55258509512775,0.03811784308130228,1.1828173970064082,12.971465162026439,0.05296082089885967,2.544534511514267,9.958595169406902,11.591001779198592,8.512308550268974,15.309591596194077,4.460573661843004,2.383570277617202,12.522962030833042,5.707414462908793,16.88430251497417,1.3122774929896153,16.9932986024573,11.854358721108547,14.370778980651622,16.07117397863505,13.277242935638686,7.336264769594361,4.273662060558432,0.9605798403415955,1.092358124538313,3.9538974633133117,0.779557095052299,2.2651342450400547,0.97522715068322,12.290037249938873,10.337114900614779,7.844238750696091,3.8260933947813314,9.48491326200048,4.337845329883501,12.143210863196284,9.687534585558243,10.895346966585837,17.972993642926163,2.9591200310935983,19.808743127037495,9.682462756500216,5.3037897319372584,10.080137477842914,19.156009671538285,7.559107114752175,15.3727599517177,9.31688456166027,12.768356734423696,1.6492559498506676,12.497458101750457,8.074947868406884,1.7206773411663656,7.520025006210251,0.5035730090490897,15.078521076141538,8.523688640497,16.437376076335603,14.456945015461349,1.9712840611670535,17.158372982799627,11.13292020757763,2.3829165394116947,7.847279416038204,12.742193780007396,7.3015476616591,5.005627829805008,1.6786605955942546,17.75482382256027,18.318021161969575,2.8510519281519286,10.780419862937197,13.271989140843598,0.4932916330344739,17.456127660369166,18.00401291847973,18.137856351413607,2.3649998305724163,14.947203740184865,9.302095912537425,4.111816841334082,3.313945861258296,13.077885613291853,15.701352290303973,5.173035013102312,12.512886676338901,5.120699575813963,2.096732636699179,0.6414002254587947,15.89918798481242,7.106226912100748,16.490974170864646,11.066094112965633,12.854523764661705,2.748828352394521,16.246009219697477,8.419299008579483,7.9602585014021,19.755108603703086,14.448952412580631,3.0262357421099706,1.1061298077599657,9.460754257794775,10.62277035099154,2.5163680316715142,1.1579140777243424,2.6241681240151493,11.546785726066764,15.82656287209025,4.178847921951898,4.4943107654326475,1.2268950911470888,15.314925194469353,12.536518427570131,14.390950943695643,10.962526007134121,9.302473598374569,14.489395391706479,1.2585643176457273,18.07866871790335,8.840226105822083,11.896191168951823,9.28729422484572,0.9755284647087636,6.861080487129416,15.976732290842811,1.1649982026142514,13.275075991863062,9.104633792909214,1.8901386941741194,6.860931603261595,11.149455233236445,12.246071291803432,10.652285614980821,7.516704498059887,7.626563715563215,18.668336617849313,12.338758403588619,18.91010413444623,16.709299578346965,7.869645873998028,12.381602702365253,7.565430425299646,0.49649921124333307,1.4045046694065944,0.7129370827079784,13.32543307689563,16.34231068584292,12.62976911453968,11.460270241645505,8.925384544167777,9.20834459016696,11.53099711551521,8.022633088605687,0.024744547794970373,13.057447480388774,5.922987545055558,4.8476222374626765,8.550768352144749,17.28697713735867,8.036321909854989,9.57515091847121,0.11722748851972664,11.895926856813297,12.296591378885168,18.332913543824553,0.10227932300062914,9.865323494004024,6.80387402724806,3.1551610493262805,18.999427975503963,5.179490030793232,11.369397003111882,1.4859980271411777,6.477501356280673,15.437610271812684,8.556254724821697,13.294909056829788,0.596930673916094,14.566631744159304,18.375717192910443,8.735120863884616]}
},{}],119:[function(require,module,exports){
module.exports={"expected":[-3.428730668020366,-2.404991363847907,-3.7583127866819845,-3.6874477854687844,-4.111791175367577,-4.087591851429522,-3.26100865426063,-3.628052702300314,-3.081088325018662,-2.996493800429965,-3.89750511614018,-6.602783425873641,-5.308596649258904,-3.3808701558534757,-3.7267568253084296,-5.157967351286126,-3.9008682760856725,-3.6286617462944655,-3.9499514044680346,-3.327640897758612,-2.537422833905607,-2.807626835587631,-3.490130647617174,-6.526246835122798,-3.170016331419525,-3.952903805348364,-4.032161811431239,-2.4140698328465984,-3.6093228843538254,-5.777700386253327,-4.142309860420506,-3.944768067402301,-4.1185217546033925,-5.159944441743255,-2.779325978117565,-2.563528056195218,-3.1342801791865336,-2.899337253568805,-3.6937555813007528,-3.9937651666384504,-3.7599927901260903,-4.6921464550001,-3.2063516576861044,-2.612985094580046,-3.369521831578808,-3.6762164530814982,-3.2419667311960887,-3.5101987440548488,-2.4707432519692736,-3.4277812167464523,-4.500535416526422,-2.855926164583394,-3.997716150904578,-2.186544123893168,-3.752495080310061,-4.387205064691063,-3.394027195811012,-4.801252692044711,-4.076476681063599,-5.423084878553157,-4.107791846595547,-3.2748400701008418,-5.277888889262707,-5.111890172758693,-2.6193633132905445,-2.89308149948934,-3.630366954099726,-3.5284641569097404,-3.223760741842866,-3.5941457160791765,-3.729384061728407,-3.4780424593389476,-3.445661868746434,-10.175309146731985,-3.610719130681897,-7.376988651105945,-3.5962670143801687,-3.8541869196672263,-8.776629377135247,-3.186228826078636,-3.2974810013078963,-8.171664901429711,-3.4949030205967277,-4.719828030409715,-3.185614166283528,-3.136849343350681,-3.988795867639952,-3.2290026424131324,-3.7985091558171886,-3.1904720432000953,-3.342638647524936,-3.872487143526453,-8.278835155440396,-2.367828741726668,-5.020954879698222,-2.5454254357704937,-3.8320904545054075,-3.285221656102575,-4.665223200959593,-4.94247906917921,-3.288284300523976,-2.9421055788057258,-3.4143626573576853,-3.036519102084435,-3.265989285843019,-5.339679225150485,-2.8079255664116807,-3.293709186415946,-4.607368286243051,-3.1831369704553523,-3.4415987367546137,-5.096275901643057,-4.6450271980002995,-6.440361137847429,-3.1405914663719687,-3.98875879959236,-5.363748321183456,-3.3205174467367207,-3.7365454815608237,-6.026013076988607,-5.283905209667512,-5.6756306593456385,-3.8636108543269945,-3.1608619809606333,-4.196695128984592,-5.93508195330391,-3.6114563973215983,-3.39886322028621,-5.680552590474749,-3.4637530224559514,-3.608473208963413,-3.277712613105381,-2.265824898445775,-3.4342445015701193,-6.6344416397738115,-3.4625210309446053,-4.955966365518979,-4.2609778546617925,-4.183373421572182,-3.4351126490465487,-3.7514219197790966,-3.552046732768925,-4.323623612804439,-2.861141846165217,-5.080192321345498,-4.464188921447642,-4.011546851124129,-3.958252521062047,-4.0250510494309495,-4.107470945563987,-3.3552555603695575,-2.63429738743726,-5.3627901921891015,-4.415989889231862,-5.35920259928373,-3.2821015017288713,-4.451171197152015,-5.448758960394816,-3.237583820781973,-3.070593687500349,-2.8861786855492912,-4.254824300109024,-5.3139758094931056,-3.1603471727652455,-3.2698596891971636,-5.1176769042991275,-3.583447256711451,-4.328093596047813,-5.036577216128192,-4.820170223769056,-3.365963582261203,-3.613663355022603,-4.114801907437072,-3.5103748754933872,-2.479324529686039,-4.4641669195214355,-4.0426058858547504,-6.6688765495230715,-4.864073638265083,-4.089982943239591,-3.307271957177682,-4.648847193311192,-3.928479385191128,-3.9054192363979063,-5.324990341869501,-3.4061971200257557,-4.585573478669615,-3.0061591123180236,-4.43111143119566,-4.8189903732668515,-3.536640143036859,-3.7159341137502477,-3.058376891852741,-4.482430512795578,-3.5951182404798265,-3.3273323919059443,-2.9476078702371806,-3.2142557535624445,-5.909024865457921,-5.115762929688734,-2.8255477994685343,-3.8964169006818024,-5.971690702280709,-3.6406264112761697,-5.791392464376517,-6.356941304991486,-5.558805282728501,-3.9631243890370773,-3.917133325057888,-3.5104738544736973,-3.9827052190932917,-3.5573547463786523,-6.231625476168705,-2.7811349286244553,-3.672644008944706,-6.4103850031408305,-3.067868643973501,-3.4300206868292182,-3.256621801716803,-2.94079519293026,-3.620158414423507,-2.9982997486341048,-3.0513662981576646,-2.4518255541536274,-4.557959255776898,-3.6097959417684615,-4.3735437680176315,-3.324916615551949,-3.4087879449961487,-3.680340475161353,-3.522359586402149,-2.5724349130053685,-3.2121695831796564,-5.006786360728652,-2.759015939457319,-5.954655742038404,-2.9075986251201624,-6.848622120550763,-2.8402796946173847,-3.2785410029303774,-3.5480699780797575,-5.387062970874549,-4.13186204964444,-3.372291642961212,-2.8737990694938587,-4.377112852945671,-6.087024784290432,-4.94549652756593,-4.622048453571322,-3.5186868048637514,-6.229445193230177,-2.607998074573924,-9.527838267230889,-3.473681431434243,-3.399412665306249,-4.265063735224205,-4.248701594634534,-3.5296333446655437,-2.74608228880859,-5.687318825339008,-2.744375636945841,-3.8346728877844027,-4.886865308352007,-3.8901467533225924,-3.722612002521661,-3.6285731150117324,-4.159399001275163,-4.3668499194139665,-7.66170550904927,-5.9390317819192475,-3.559066530726236,-3.547523447957028,-3.1980970997058487,-3.5523334013060026,-4.611948890140002,-4.776816765618171,-3.9188729993733507,-3.7326796134530857,-3.793586619884053,-3.3376898987676586,-4.178260325263644,-4.60493733565172,-4.804297939764698,-3.901253278192197,-3.5466984502948726,-3.4809316457631514,-4.241725357675117,-3.155583872603895,-4.387663640668629,-3.145097113609602,-2.9475889211003343,-3.1760486407272115,-5.603169948731842,-6.717966780309488,-3.4451159446408415,-3.2368557422267275,-3.470066704951779,-3.5578801760020027,-5.2128098577571045,-3.2951218543160277,-3.828662268095619,-7.83989746556592,-4.634009216639257,-4.676782911591909,-5.104095283067464,-3.7525453928527153,-3.6404930291616884,-3.0914699993686847,-3.4295178211615545,-4.36716991323887,-3.603928670907151,-3.662741137087974,-2.982570324122097,-3.3565423330828623,-3.4078799013286174,-3.4644126190921134,-3.9220067157862526,-6.035683519197304,-4.364134672263679,-4.056302145875991,-4.991832878030502,-3.9392198084872616,-2.724759950867743,-6.522985125906349,-3.6142113609765047,-4.505345061728194,-6.0734318801196325,-3.485959745769459,-3.348592618891548,-3.2404941159689002,-3.6946417594298206,-2.908655372887184,-3.316842406312734,-6.193300743269785,-4.4727430727614825,-4.033375576446704,-3.8924267690834746,-6.6611412422024205,-3.1914252072193565,-3.8381008379973895,-3.6623631817604334,-3.417687492254563,-5.20948941183083,-4.514796641513345,-3.305508223201171,-4.733962811841731,-3.3601349391614024,-5.415206913658106,-2.0779646532075304,-3.0539060241061833,-3.469512503494303,-6.389142238259256,-3.5534130541703113,-3.215276163170395,-3.236658273214839,-2.730699924320052,-6.646675289107486,-4.521566442915792,-3.2055876246483628,-4.316579360832995,-2.821248867455584,-3.451662271885395,-4.271781557549562,-3.4483427881445428,-3.591637118941968,-3.503061718710551,-4.321713935837461,-7.314667626521235,-4.150340969348402,-3.5105845844378605,-8.148874573310163,-4.004535157139164,-2.5954735849080164,-2.8779406991811,-4.899644459396919,-3.668748712009595,-5.221586368531868,-3.3055322349629455,-3.3212384339174683,-3.2685051906261693,-4.357778360246998,-3.5187408324860217,-4.616920400608095,-3.617780199844299,-4.484347356979372,-4.527463162308651,-4.5184843663715855,-3.605236224032519,-2.9863178275128464,-7.081092633802925,-3.8583963875634253,-4.686611959413514,-3.5813305239174693,-4.616362015417755,-4.929039889008586,-3.8515754802908857,-3.519982248190709,-3.2189216112842294,-3.253314860184127,-3.4146067444670556,-4.995876092335917,-3.0343145098292785,-4.389719509069133,-3.8864857250256373,-5.660557745477338,-3.8864251011597255,-4.670575872530257,-5.119676232478642,-2.827443151007146,-3.161676998123268,-4.754738427369197,-4.1042225632211835,-3.415171763468498,-4.470830211485352,-3.392768518187304,-3.6104164044213873,-3.3300933023244155,-5.657636918336875,-5.379131247670685,-3.3183845887876053,-3.2406455384916137,-3.3874364123880047,-3.8984784960391807,-3.1536656073821416,-4.165535049927432,-3.2717593629133295,-6.431523788686519,-3.4814966201973614,-5.929616560056873,-3.2504498348784363,-3.720588989298529,-4.2909972604268996,-3.4621162049530065,-6.830282687811518,-3.681854796069211,-4.0744963776637375,-3.378813327698544,-2.551616597188837,-4.440048954754691,-2.8955928965655655,-6.720860643601975,-3.4746884661815782,-4.415271749383093,-3.6604197055172514,-3.274237998394838,-5.984463777047862,-3.4465044889989525,-3.607628502292753,-6.462317216698194,-4.047200305700114,-4.125834531999297,-6.130548811040825,-3.5292159848867075,-4.7122154107298995,-3.452435522359917,-2.8624643386253155,-2.2874114315285627,-5.152177243232689,-3.047147944757214,-4.172974898444592,-3.439611617490488,-3.790107034381823,-3.2525248055975764,-4.3348180740373445,-4.841851599152408,-3.3947053080993803,-5.770018794224788,-5.018962392121763,-2.940335251366755,-5.101578903794113,-4.7605212741117935,-8.173704139996438,-3.6013225433181506,-7.893668272364827,-3.6437201224676343,-3.325436220170306,-3.823906730074143,-4.123829347223888,-2.6361073811285873,-3.0175355265882082,-7.983584746083337,-3.806388368864092,-4.509392604411018,-3.108765092440281,-4.837439350673609,-3.0777714005296923,-3.3242832233721424,-4.444624986398512,-2.8410375299337547,-3.328782041080076,-3.3468343928593267,-4.113706484463922,-3.5083823341711065,-3.855689167356325,-4.871766653653888,-2.9499224590991107,-4.354020872904718,-5.417980537047884,-3.3813689801630247,-3.510334205905949,-3.864376857296256,-2.477807351230264,-4.166393172488363,-7.197117501505732,-5.119749036228292,-3.632886265117639,-3.442555209121017,-3.6260958353367077,-3.761320941342088,-3.289536844821448,-4.416427132909845,-3.4718782607304686,-5.019845517947398,-2.520794824299603,-2.8349659322737137,-5.278884748619219,-4.421482789385515,-2.688121071248301,-3.4834209073104048,-2.30515243039736,-3.3493470084323027,-2.910820771683319,-3.6081473213296027,-3.223004495682689,-3.177260693137353,-4.76960597016915,-4.892629717605777,-6.640441278566758,-2.7971952967389497,-3.147713227390203,-2.853300511946021,-4.8862446856952495,-4.129660216522504,-4.699890098609172,-4.213290213583501,-3.5147566907856023,-4.521641196753801,-4.534504570709258,-3.2779087737887727,-3.3070920805632067,-4.050722101056717,-3.4200261756120094,-3.9813011091436312,-3.3224675038836735,-3.117929758706359,-3.0965309472775857,-5.227890212438972,-3.0333695667446134,-3.8998168712355334,-3.7824951987099276,-3.2863584080105355,-3.584028724727744,-5.227573930116826,-4.362324517961227,-3.0099048357467106,-4.211542202285427,-3.8763851982415236,-3.888783978886837,-3.020770433174438,-3.5074003050182414,-4.300710879739432,-4.802272695149934,-4.26347269464689,-2.9718239756063136,-4.667383685702798,-3.508915019794977,-3.5346062830979643,-4.875926017363737,-2.8283750357769026,-5.074541189091035,-4.221087550590396,-3.1583549348947204,-3.7953129709386646,-2.7528956810297682,-3.8317462817335515,-5.69330528775507,-4.386057255394955,-3.650841466446947,-3.6408847833246796,-2.803548825186979,-3.6150892349638655,-3.665781678565136,-4.3127344892906985,-4.310764694134075,-4.648273258984401,-3.3692536433278413,-3.267143008954582,-2.5419345487483307,-3.7894111015494003,-2.9802449442642924,-2.9977297400870797,-3.1122556534674777,-2.9883561171103663,-3.0912292057102437,-2.737803017105203,-2.6510487523352495,-4.598245139485404,-3.327139832479734,-3.991232728198331,-5.4546042954411735,-4.495659096695726,-4.0598762575193446,-4.262373835186811,-3.2291077196376703,-4.134007007332659,-3.292746299250776,-4.001598540844481,-3.84843288296459,-5.765724112144974,-4.541902404305329,-3.3232328938195748,-5.935263449552814,-2.8077741777621865,-3.5416339676600983,-3.0109524635758493,-4.9453983538815365,-3.568025007032399,-3.4540023866119323,-3.7309423768783443,-5.051465952329153,-4.262961052051192,-2.8862937225123892,-2.9608602908118375,-3.1430748416039567,-4.3811789249934066,-4.173444760121042,-4.361033684842176,-3.0934533652763267,-3.2723956762122715,-4.905966553972604,-3.9785935418245977,-2.8082841488439194,-3.957623994772722,-4.807242117164135,-4.222090046921856,-3.183538019083706,-3.7825705741163373,-4.429262446709558,-3.9892026741927538,-2.994529923343834,-4.10619168602514,-5.53937185509507,-3.1675471574728755,-3.2059924239490325,-3.6830198992273644,-2.8169466429194223,-5.6916584071454634,-4.07382209382275,-2.941915540397483,-5.415623353330728,-7.454491348834329,-5.502782703814312,-3.5015368950775043,-3.503982034083031,-3.758952884322877,-3.6706373429321446,-5.136250181121909,-4.465584970177474,-2.761037749229086,-3.7019750552750765,-2.7764920406952722,-3.3174323553040233,-5.889033363750783,-4.5221339868294,-3.5659829876555285,-3.1516115827559736,-3.388123773703967,-3.2151062004590125,-3.121842495849326,-4.626020163091209,-5.867418011511027,-3.7174217047204694,-2.956052323737725,-6.780201984256742,-5.669164930547198,-2.892181963515039,-3.740029156140073,-3.5256588706567564,-3.2703510492897503,-3.4648622564411022,-4.549452356990287,-3.2109581619354355,-5.480396998839369,-3.7957125040885935,-5.185982911715196,-4.406075999470147,-3.3703912349973866,-5.697468938430131,-4.417873354889123,-2.9133317409123816,-4.804674114421614,-4.167203530188957,-3.133635428655166,-4.631673277752379,-5.17254832814533,-3.7843098824200854,-3.674272452208618,-6.595975901177522,-3.077660428544093,-5.0102521024906475,-4.440199547746259,-3.5819569012098715,-3.075835016285926,-4.642351693662866,-3.4825539492667135,-2.9718074653379087,-3.2144448350107497,-5.8371166136945645,-3.9908667283529335,-3.5377797350548548,-6.577766267324289,-4.844192217025425,-3.664177955727034,-3.488264096047537,-2.7043202083717715,-5.01237170045104,-3.108263506125715,-4.239289479755637,-4.446953972725742,-3.376445703894472,-3.8147421127032013,-2.970290856265474,-4.830292533142647,-4.472021649305074,-5.274213060478483,-4.720360612438752,-3.4830527080988576,-3.6554737314656016,-4.973174357422577,-3.5292919294651544,-2.8968252058489488,-4.144545672154225,-3.0125496932673785,-3.7133646795281523,-7.243173805735822,-3.8918891541210945,-6.48596052833791,-3.9942468477106416,-4.148717122119702,-3.4086296436427497,-3.6174244136548257,-2.934389436018723,-3.168237900120679,-4.158113226183522,-3.5856546531950446,-3.1960343246158174,-4.5356479416104465,-3.4290171071572524,-2.756764101726645,-6.407806969293618,-3.3875051502565383,-2.5900489438339607,-3.3428841112651364,-3.219985424890939,-3.125215590522784,-3.409292674574509,-3.686170749184223,-4.150352517719893,-4.040111780901908,-3.864756425254165,-3.5245610501636895,-3.525085976483635,-3.8649034163096214,-2.768393214635879,-3.572570685854183,-4.0960674847479215,-3.481776583647605,-4.600686390423043,-4.849651028105077,-2.628122329914163,-3.2616064346214966,-3.4936448136301532,-7.667357042261235,-4.146495013811858,-3.3178063641593893,-6.744191467909668,-4.3886235594116485,-3.1460271999857263,-3.509079347951871,-3.3385364532368795,-2.9139563203345107,-3.463070118775112,-3.3567579984322538,-3.9204587458853353,-6.009113033818631,-4.914453782468892,-3.273029070586397,-4.277549054573302,-3.36336608479154,-2.8818257183009273,-3.0789194243934395,-6.2091312525693745,-3.4395549718526492,-5.0397566223626304,-3.7762635965705984,-6.916149042210801,-3.208911014241804,-3.141468659137785,-3.2118731236030147,-3.2944180724351595,-3.3036694749269255,-5.136158906798372,-3.0038656697642296,-3.5806346280393093,-4.111817894652955,-4.299381116965931,-3.602661460067643,-9.35640195082152,-4.910982462046444,-3.6381145902429326,-2.7484250565855186,-3.271317107104343,-2.5149015616661803,-3.9923233624106476,-3.14341830224732,-3.381230869258739,-3.0853830616944626,-7.030819740922356,-4.355055780836265,-3.681702942617418,-5.0493701211856195,-5.767908633954692,-3.2842313561884726,-3.1291826276095644,-4.025896111154307,-2.80968768797177,-3.1252779730862414,-3.061966011121242,-3.350491400422603,-4.019072281347356,-2.992350067984824,-3.117914530699041,-3.4384444089207244,-3.5431669018715195,-3.5833435079823257,-3.0688108350942156,-3.433876884562103,-8.690238016197114,-5.2355652437517755,-2.4963274222030365,-3.432476672471137,-5.831573565691232,-3.4574013057851745,-3.9046089928596945,-3.6106812709682488,-3.3604406259377155,-5.776351286726455,-3.79384288116779,-6.742621444311892,-2.767275354792894,-4.358524595103025,-3.782889472869314,-3.501387991471792,-3.4776557683077227,-3.3830768343081044,-6.094203050901383,-3.5517529136288077,-3.7497114718888445,-3.485774850603221,-3.4022850085202565,-5.058488694632463,-2.706300965944226,-3.8773914403670746,-5.99905574619325,-3.360565938738232,-3.1833424438227373,-3.9357161073858364,-3.6153953312363356,-3.671368668682417,-3.0703203477872467,-5.603569581542255,-5.386187091448655,-3.437388461011185,-3.6963245221876684,-4.427879007461486,-4.44626000245951,-3.1037260953198778,-3.7838793692370007,-3.2925936883622793,-2.7856675080910485,-2.8214171372748478,-3.465388203749077,-3.458896194419826,-4.193191370414747,-9.116981925795436,-3.903107564483546,-3.702088192786362,-4.007842876707548,-3.138737872370207,-4.090422165583704,-4.853679576483528,-5.710057204398417,-3.714795123613908,-3.670055591431445,-4.517517721751694,-2.886093634820141,-4.414263576999465,-4.421291618232579,-4.018588771270411,-3.1160004834209554,-4.8047718631831335,-8.108588307517385,-3.100756728995334,-3.748573050929987,-5.076032120031381,-2.980238238482106,-4.929877144744863,-3.299574140685065,-4.448145991363012,-3.340540341286672,-4.520385085209967,-5.82917035810507,-4.650525192218841,-2.893382512218473,-3.1985548175200362,-6.241698816475656,-5.319207507828924,-3.722108649730242,-2.437943474378088,-3.0318705850881726,-3.9160116295922376,-5.01973848808789,-3.2398158256937197,-3.1675471663614325,-2.216151041413049,-3.888643554761186,-4.825272862003598,-2.669790875030716,-6.698838791869826,-2.924168523092833,-3.758133815423582,-3.7699136111553817,-3.5666723293079756,-3.659330845686856,-4.123369414224044,-3.7065904823435303,-5.10117842486596,-3.1982168960640416,-3.001539058202234,-3.0854568938059654,-3.4397381215620784,-3.1728618278945784,-2.842032035078035,-5.0662306089523925,-3.6041442735542333,-3.5591969946995725,-4.416096740234925,-3.962831732869584,-4.212556368652437,-3.7238536838586347,-4.436490110012294,-3.820088533313405,-3.512543908354575,-5.485226145445339,-3.8371512165359998,-3.171675411053169,-3.391968680765496,-3.301057337451117,-3.7077496599804887,-4.054261243131208,-4.383049762985797,-5.884292775282686,-3.4397902530887707,-3.582959794795374,-4.499739027432178,-3.187598740711638,-4.467080963406197,-5.191406566358773,-4.324424086892743,-4.379399465793314,-3.9599099924490586,-3.6575828036362914,-3.4090054070530607,-3.8883748234584927,-2.729404827817871,-2.943602389749019,-3.8668455796672063,-3.391759554769295,-3.222615663117257,-5.147648851446346,-2.862512921394105,-4.375446320842062,-4.361275776548517,-3.1163558680093306,-5.746986935669068,-6.190776419719382,-4.899063122891045,-3.2784912121318817,-4.752014556932208,-5.798147099803996,-4.0189975357586105,-2.966474775497174,-3.8913066043684887,-4.701944503581602,-3.4680611929219625,-3.1776004809898426,-3.202971750920237,-4.108472058617647,-4.181102910247768,-3.603957343428907],"alpha":[1.177784507572503,1.9036353861786668,0.39523332756471596,0.8467401865448618,1.3585128566692362,1.9125965842736092,1.96463446542966,0.8040425286307307,1.369321465785335,1.7259584518407558,1.5295513788396704,0.03506407065918582,0.7005897993178851,0.9518358296056029,1.2763969463900104,0.10476788425727257,0.7301948631636712,0.9256376272336997,0.7445212571003581,1.2812598305141685,1.3055659040983407,1.9029377716002318,0.975758451888137,0.033768600460680975,1.4374109330265297,0.3799397675205296,0.5489276678532202,1.3935243426961623,0.9774442706679212,0.05528596345605141,0.6600049871723206,0.6828942947548882,1.3560845669406705,0.09037067704243862,1.2355141974076296,1.7373027362836435,1.3371621198245833,1.8798965376424959,0.8930313797057852,0.3177826439308227,0.8253338810168893,0.2511929335910166,1.3065510997769034,1.839151088226104,1.7541940475399684,0.7593826232068919,1.6464737234166837,1.4822903387906683,1.7421911597888182,1.3221946484469203,0.4559643640601796,1.8670138982842897,0.778546133558295,1.8502952401284718,0.8172706418233657,0.2181462942031427,0.9440301033560816,0.27645986862854466,1.603091467429687,0.16526839406818006,0.44322557789183437,0.7040712835588923,1.6930992428796152,0.1264115584443437,1.2187052032782604,1.3162392526585776,0.36593339186230756,0.9696823000081438,1.566422139371693,1.3682173455693487,0.6113880842884369,0.7311668052037779,0.9298927468442821,0.0011654084338443838,0.5146997181112742,1.930720106319849,1.5441737634707238,0.5415764508940946,1.7876413645989397,1.4166607686751065,1.4469286847077902,0.00879058205885963,1.1938113348707318,0.27104632651766547,0.9694532339339554,0.9824909412098308,0.6923404707690044,1.5807266546275112,0.7179473250356097,0.5875645067052337,1.333532808757277,0.6369967974908128,0.00537610278941969,1.9582103743304469,0.2153030286803772,1.9741124062369177,0.6225630911568034,1.9853305902559155,1.9491249127921515,0.10486159615171031,1.2460283455969918,1.7588346813080227,1.59124311292695,1.68276292405507,1.599299661434395,1.8114149225787215,0.9981613112933618,1.2892095899816107,0.16187650083061067,1.2366584052078156,1.0783028967945727,0.22239874953440442,0.2977985328056971,0.023399106446149176,1.8201808127665533,1.6278420700807503,1.6458625264783753,0.9880753499794754,0.8926379203168557,1.845673659644815,0.8585734342146676,0.1243854182461499,0.6702069280756984,0.9988739958197548,1.693222012473245,0.09868335448016552,0.5315946627988497,1.8826662686828262,0.04914224415702906,1.2989178275552513,0.9285753690283758,1.1212710848994418,1.9168120055937874,1.2278893489958365,1.2536810924677129,1.792891932925814,0.10359504666285924,0.3733626472146532,0.4791300882175453,1.9465760543461856,0.9457795214618372,0.9078526011686199,0.4000857711276047,1.4788968914196179,1.5787493884171666,0.6583469773067714,0.6648368717205102,0.6867957853120674,0.5807243385994312,0.35434310908430433,0.9111433682863641,1.7584786044681349,0.14900376561081607,0.3695117299968218,0.1842954267000243,1.464494895051431,0.6690024462968052,0.08853277256392289,1.27898139675312,1.8438413757281071,0.9962700016087229,1.441068999137583,0.06721736531847844,1.3623277383444723,1.1309267069118412,0.18292848500554637,0.5446912069872001,0.4424935517454336,0.10382606517114423,1.3579244853887653,0.6120898072448884,1.9438705777541783,1.116440062374139,1.2078451022120724,1.5961804400385051,0.37672373270068205,1.2506411100170665,1.4341991529064098,0.300370775756849,0.7902106110704001,0.7570934782588936,0.2074869929184433,0.34617900453834594,1.7960372437574192,0.1408595502193104,1.422379403880361,0.8186698590208756,1.5821719633240146,0.1981229215891509,0.5265389169596708,1.1906542152176707,1.7261820567102353,1.4985705349504435,0.6418214543705307,1.349315075160784,1.3397577653202077,1.6307778927837595,1.1713161309667002,0.10461327181956426,0.15172680912962866,1.7767192870302613,0.61218392542591,1.3495437096519556,0.9637961458696096,1.4812736734784542,1.1226073430986623,1.9810226755870373,0.7280831417019868,0.33636810966660935,1.5574221387215146,1.5647136413092522,0.8104000411678842,1.110288461779808,1.7789946065984865,1.6229560396334017,0.05199512161091224,1.277731799374843,1.0174328417103418,1.800295318253522,1.543791969650329,0.6671336187529655,1.5186824443210338,1.2981308005908496,1.7481216847302288,0.24096164624255012,0.7773642705228054,0.48418991735059214,1.73928972783068,1.4123432265994746,1.2718197168372076,1.1723214663437291,1.825124489276995,1.8893167536657738,0.24918485694181713,1.3874226318525378,0.06532655972264267,1.0412146986037576,0.017925515053390573,1.9100945302800474,1.5027449416473218,1.3192751698962573,0.0792478287477465,0.4800541115910719,0.6406494853681619,1.5813112799880806,0.510251070750996,1.6195940243936127,0.2565063472976594,0.20987980789217353,0.9413615662299857,0.05011005256428236,1.8452959714490462,1.8774246006470783,1.437619572722257,1.159357717268299,0.8350691111108715,0.2687277560415655,0.6755605537193112,1.8737858293447203,0.11434375010939446,1.5010686864463518,0.621925919731622,0.22532303116896424,0.5089298496110222,1.0228697047424982,0.8511143153368046,0.3248476741782005,0.37729508700712344,1.6144678819610077,1.306033217963607,1.4642918635243718,0.783853651189141,1.610847337148325,0.43768844525925044,1.625248080987098,0.31826042379759034,1.784275032101939,0.8782768807951999,0.6606670254306533,1.3872635320448161,0.25986617454061056,0.15124153220865555,1.1994491340536926,1.3251518557267161,1.1473164901459652,0.7788886778869863,1.4138986360344763,0.7001090136325194,0.32270536087767354,1.9100399101705556,1.5446655484553031,1.6308923256579626,0.09977430788909336,0.04446560290214174,0.8662991511378926,1.5547636397357918,1.164614501277955,0.7693445504030088,0.21730294981158238,1.0994906104303124,0.8537594314181134,0.014537350886580036,0.5343154958492216,0.2545413895642832,0.2106799921335849,1.0729288867016078,1.19744430156006,1.894947886886877,1.4955932179623708,0.2600743685352782,0.8080483581636195,1.9135713548294482,1.94624941755515,1.6971541231866434,1.3433367430950538,0.8182482612181863,1.064801391637857,1.6369170291315602,1.8016899875646346,0.5077540298219567,0.10882417400081534,0.7300405371265013,1.7595998762169534,0.046082002522456644,1.1793242818336331,0.38183008392034523,0.09372842447602947,1.0196078551363983,1.0817433959741427,1.927084958871946,0.859980997795843,1.786730516288582,1.189215512105506,1.3561797341183701,0.26806907094058374,1.8021208106351168,1.4116412412286472,0.043968625960465246,1.8985036100653612,0.810384559614636,1.6004152377605778,1.0227721640276974,0.2207477323557101,0.27366020846577044,1.596655700521989,0.3159253491517613,1.8995938526464884,0.1140705300618663,1.8259841642122603,0.840492885058818,0.7488700837243911,0.06331616224464387,1.3737558186917735,1.0768518615132576,1.5960045428298102,1.0408603672129644,0.04132948045227902,1.2375481112776394,1.201212984513437,0.424836436707666,1.609906623411475,1.205561109375075,1.4747008806245963,1.079310243388829,1.110109022145184,0.7512993757954081,1.8027744733105595,1.9208754776284747,0.795273240507612,0.4892751389102874,0.006410281285099018,0.5908041862711371,1.4876646136717082,1.4529343384236224,0.1254908028695545,1.045264135616066,0.839728808974006,0.7809919014424924,1.7912088025115689,0.7745809429253057,0.6061864119745661,1.5211617591688538,1.5386566745339305,0.7058440942573285,1.2409209870655626,0.3647143901350236,1.4831897828356122,1.8532438725812077,1.8638383633174898,0.032537629656334666,1.5087978034344736,0.15582308569284065,1.000378937671056,0.4034223145973299,0.12332509779224443,0.30703007662148885,1.3654714054624004,1.2777001606904936,1.8352341959311076,0.888572485979453,1.003408169694504,1.5962060334401236,0.24100717170599495,0.6355643842475307,1.8332645979185873,0.5208763539750434,0.21137007492859672,0.12607121125770782,1.6357890906611448,0.6422848514358739,0.25037198312963804,0.8902691210406721,1.758643441737643,1.405573402120754,1.4797629412533957,1.3407479008917416,1.967946206437741,1.1958949940045018,1.623263053163535,1.7183818136014568,1.3411825850828216,1.4357048917239168,0.798155986312119,1.99679506185972,1.7142369683577074,1.5883689381623323,0.04420131020467721,1.4674140013297237,0.09849878326194084,1.3175972298667165,1.3864232892538877,0.5329442655893208,0.8545472894538269,0.040853373336118715,0.9591896433628873,0.5217997998145223,0.7189946937595653,1.8718364501770326,0.21832402612066648,1.2569615841642552,0.04265881609848421,1.0043766498381737,0.29880748940255764,0.399415466538128,1.1986433221182482,1.650717471873402,1.2239200776984887,1.1284941938625979,0.054957044047805326,1.4812122416063036,0.35707887301084185,1.8767811541370287,0.8382330444034221,0.2656117536438476,1.4318723179881756,1.7022451441921236,1.913666651683212,0.14550759137845004,1.8079811921585023,0.6494277663288397,1.749779775302117,0.6554473643413528,1.072273770441488,0.7108926336207912,1.8122012394019986,1.4353093351835242,0.0865928956457549,0.18372976576989908,0.8251574722732333,1.384609016704092,0.321681418527068,0.00843705496370628,1.2309188030423166,1.9708481351455083,0.8007839105097077,0.7604781958884095,1.370511789358599,0.8202301302705104,1.7888445773421409,1.6834104814434019,0.010546259530176627,0.5304025151882654,0.4263269541838173,1.248021477229524,0.14870902378948792,1.4525096115575349,0.9554392469364168,0.4490477021200592,1.7516170666127175,0.6225262358355472,1.278143144975521,0.4458449762161827,1.9262837867401656,0.8379680509899985,0.28985549175706016,1.4400995049708731,1.5902100853847823,1.867275142903754,1.1134306191948546,1.226996505611596,0.8184347785173753,1.153691045536756,0.6308404438158783,0.014643562032572,0.20726970626872232,1.772358898539721,1.637475622376892,0.591307039093194,0.7265125575609179,1.436089377858448,1.743331088803182,0.7950574626669114,1.5440480432915198,1.8735192793913678,1.2039519632805176,0.599677101890566,0.45072284452000133,1.6624071221101926,0.9429233118768585,1.963350896098068,1.684283076272179,1.953666358129634,0.723050565655877,1.2147081311574461,1.0324730413263725,0.33403123956905434,1.5382997174988868,1.8421836003292773,1.2434628212497723,1.7300386804006287,1.792464515323231,0.14295664551401277,0.9291534949965183,1.0197557541163853,0.2982267354374164,1.1242211385873828,0.3642324901045675,0.32986713778696597,0.8326939689439468,0.9126308284808045,0.5943379108510092,1.8255878944214485,0.5736323487979398,0.7673932057342125,1.2072683204896562,0.967170900732893,1.3178527191056446,0.8391740986790936,1.3647106738487254,0.8792743767512561,0.7318586226911021,1.085985822566402,1.8779188987866324,0.49477241592003995,0.9750114321498344,1.7552436344370057,0.38717027062585263,0.625906810374385,1.7490336583238135,1.185037340976974,0.4347854900299648,1.5758076186796597,0.568454668764856,1.605725281013584,0.3673762813122958,1.11558462061865,1.091699471795899,0.2704944639877094,1.6397610095419202,0.1822325671122078,0.47580187094005266,1.8787582460258379,1.396022135733002,1.9160952183293674,1.4174172535755893,0.5071954830893302,0.3239802476197049,1.3381254984259527,0.45541789697228285,1.0588821779913222,0.7907773247885057,0.727844080119743,0.4319864288894628,1.7764016906358862,0.19361640562528892,1.348556704462749,0.5921150694809865,1.2671295178831565,0.34232643688147135,1.324716495549283,1.0739901197796846,1.7651564182465305,1.5691581881501038,1.4073484025685916,1.936249274862662,1.9583779641843733,0.42071723571836106,1.801714258324112,1.7496270175331037,0.12528506846885268,0.42170375800257975,0.40830943047362656,0.6567246575885104,0.8963180924280243,0.3809194246877823,1.3332096413546837,0.7306485319731655,0.35254837916266624,0.06090568517110739,0.9911520257628905,1.1951645957746653,1.455246838685094,1.9783132686211293,1.283170060463358,0.8240196917837306,0.5441615289646573,1.8031237925468622,1.0004680792978244,1.4108173918575466,0.23029552351738936,0.571834604722115,1.266801574274008,1.763198939946228,1.9406837934941428,0.3543171791072002,0.5807420359603888,1.7894175898452223,1.6675599623844324,1.543738122407384,0.25896066138461515,1.908416466144959,1.6006370313533878,0.6264966490133377,1.6874625952169056,0.5393780102863057,1.6583287105129219,0.3815171679776874,0.25385122610316735,0.4473425193556042,1.783870307545521,0.6199673204100971,0.12473340713494885,1.742849200822441,1.2439685855378255,0.39731805517526375,1.8977632606624377,1.7042169640352656,0.5888552871655999,1.7564018646452166,0.1074342979122509,0.02342657547546434,0.10664118454879423,0.8514061503737564,0.7751632319684028,0.5826320240992389,0.5295426773620866,0.6112476724194758,1.1183341314384112,1.3870843355851665,1.3037009989255406,1.104563881675967,1.1184853900853833,0.08292332945373682,0.39111313497020506,1.0317464782019807,0.7718953108013062,1.4504745484931325,1.363739500081674,1.4658999507036605,0.2785639280249246,0.06150391259999388,1.0258446369918572,1.890295732753044,0.044454627122288315,1.1577891505816686,0.956818108898053,0.44932647964564065,0.5871941368662585,1.5909825534142676,1.0220413477072952,0.27933567369040224,1.3754988915402242,0.16691214781075825,0.6475521663419559,1.1015200785075416,0.6926115491830185,1.4354668970580322,0.07883456846621861,0.34306387878962674,1.800352793424564,1.7795060019027136,0.25392532764089637,1.8136308897724578,1.5007355616934754,0.18784612533974698,0.863341232521436,0.7435815548293503,0.04829472072997554,0.8859803304933553,0.272260904703459,0.45256426324260257,0.663385956182855,1.2035498223648577,0.8846049397078612,1.279803797365438,1.4963069820695751,1.8111867730837106,1.61780507842741,0.9962273414096492,0.8108255095138399,1.4130196129781134,0.3087274810033649,0.9060322696159453,1.2555123887122286,1.5318138984935197,1.616106112930216,1.6363517903003868,0.5718470550505654,0.4380580786145196,0.8441100298509441,1.8289430173342591,1.6257135446647357,0.19915805544249343,1.119770081327677,0.5082796003913779,0.26951409617588995,1.192050130122773,1.2933688092917395,1.949854491487387,1.1623289604450044,0.9260591109280019,0.5287596390439817,0.783184754951582,1.11221682897368,1.7112177603308942,0.8063309877232356,0.053855647219749336,0.5386149349963878,1.570411827900529,1.261786876853432,0.8897936473878003,1.3018751057471385,1.3843758864672715,0.45557328362930205,1.9410833100438891,1.4904284125965157,0.3928669739420525,1.324292962260368,1.302057257022315,0.0491982876757584,1.3006616410002203,1.8226299812656221,1.2307006622357894,1.708502048425585,1.9841980899853104,1.6693104468805782,0.7825980790240483,1.3296502355829136,1.4262090623955048,1.506957287016499,0.9714344421941967,1.5971616118871115,0.8770398423606887,1.4116339260191397,0.9430596407969469,0.5460795390515063,1.5754280778145762,0.3331484576243273,0.259021396079691,1.3921820594041923,1.1348590359435167,0.5688011271580691,0.01324710780098437,0.6042992461759429,1.516371188811172,1.6627372079397378,0.6311576467636821,1.489297564386943,1.6237031883601243,1.2731145702071314,1.8660066260490202,1.0793915358349855,0.9529767074499658,1.3021746398725682,0.0717254166372765,0.21900657662382406,1.4854156604761322,0.5517218780114339,1.0475679493482843,1.7004048525728028,1.7740657325311457,0.05070753751992507,0.8665739548999256,0.2529338346920822,1.855064605043046,1.6224719782036758,1.0502678400194694,1.567261519406773,1.7475756865163805,1.2813835554790836,1.194486152870132,0.232598670992886,1.6770153786288193,0.706559298276765,0.23611718171397644,0.26847043501346946,1.0397986062031217,0.0026632768813850127,1.4117827888465198,0.9335396454908862,1.8216870788157817,1.395517919679254,1.5272225334247698,1.5482565097422656,1.339327939744234,1.9697909625285206,1.6640377498785073,1.9231843759575749,0.38838427039278045,1.6998687611054017,1.3562311042281787,0.11863124223233745,0.9468644262263419,1.9951714020181206,1.6847795410674666,1.4656339215805096,1.5489496949560402,1.844498603708995,1.6548547359609485,1.3382526794249858,1.5845302939395558,1.7533328148326888,1.334077615706717,1.8826587585713837,1.5970147863360755,0.7354599881732304,1.583329166550918,1.9763376864074371,0.09643063163782095,1.5447082607162224,0.8286929427953811,0.052543048249463986,0.7639012068366626,1.4450530452100696,0.90409278107294,0.8764400945452726,0.11991467162886771,0.7384130805206901,1.3340616336433735,1.7768164651141727,0.3122176983353797,0.6444417558981428,1.0491552404176354,1.5302350616108913,1.3563615019978594,0.07756265489876712,0.8251001776956266,1.0356053961810976,1.1531014016617425,1.1294046677158267,0.16386728379840543,1.0446884417091935,1.028626668910368,0.6822675476009148,1.7191586019775373,1.7789728793885562,0.6374158408798141,0.8526560608673441,0.542101972302433,1.7878541276308875,1.7042325792739237,1.5739428842117023,1.4776853553527602,0.5262935578071661,0.2709009653274017,0.4597916584584083,0.9201908287935994,0.7659442796182279,1.7850568745240127,1.7546228084951663,1.6706365912926158,1.2171847360915788,1.4305311226218436,0.6888592498420376,1.7706068204578407,0.4288263111859161,0.7881482207839539,0.48407275279878714,1.692044136768681,0.43398063735124026,0.2649021435147416,0.04989753256994467,0.7672330050140279,0.7886111333726133,0.4338778356667383,0.878951887557323,0.7096464917464629,0.42458292362587624,0.9197699327234887,1.1742252842941023,0.1876542917875108,0.007556071786482654,1.4983491869185368,0.912988224176777,0.18895580673811896,1.5198022954915933,1.6849616692993568,1.4555419474528608,0.19580763549834312,1.898408625631658,0.5244569699956787,1.530576888499414,0.2091985434559751,1.6791006657222738,1.7923401283873268,0.07203926605833333,1.39853605938784,1.0257534257628538,1.731393698334804,1.772436770412464,0.7473466504793453,0.2628368447774463,1.9130485639440251,0.8721709452677828,1.8728697745394394,0.8725226949241054,0.2642582813879022,1.2897112262282429,0.01924167141362476,1.5104982580408626,0.5951939768813079,0.684773936390993,0.6350800792592528,0.8155327198032714,0.7641646968048179,1.902716156562024,0.2305581546688611,0.8366271499186841,1.114912891514248,1.8121763879523334,1.9633636717622989,0.7812238932724074,1.876066609074957,0.517854352869731,0.6013174970922828,0.9315762191612693,0.21259196084209675,0.3597515174987622,0.27522409566664496,1.140985358996239,0.36854437897313375,0.461784061116171,0.7772500528803645,0.16442832765948268,0.7177484312543494,1.5733161450624125,1.3519743705124498,1.951501644924703,1.0820988591236214,0.6643389572165859,0.2485965950088711,0.655894732979772,1.2285101317080196,1.03827337078266,1.7374225459947303,1.240949274268135,0.29291466872552707,0.07944654245997507,0.592498792430614,1.2813345566465668,1.9912822076425392,1.2463763700739565,1.3499124730827536,1.4685710845976043,1.9603225735642065,1.9735226206835321,1.4934120950472929,1.1713174005074327,1.0591878094754632,0.10572414972749655,1.0738357822430027,0.5017337714405556,0.4220229727552005,1.8376937773431505,0.12045216615086307,0.08024845301353167,0.2884242279872735,1.3686815004678428,1.5235950703471568,0.058956868133078544,0.5210883847371943,0.9919076104171598,0.7804188255016311,0.9237213855361381,1.4609599537326932,1.5966270285586863,1.592864909616349,0.24174565841886864,0.2524856041294914,1.3148444490146756],"x":[12.682589479933238,6.660065936745148,6.1881623455222945,12.401138786971613,7.485452799146177,6.06366587908497,10.4588898778694,6.630690184488099,10.669672241520479,12.42904039963758,9.106861048136244,9.493283539634838,8.238157680862026,7.498710222211504,5.893936394218395,6.693052815349347,13.071792119339225,11.268443032860507,13.80778975410649,9.72776850501983,6.023528665128632,8.41237823978657,11.69279794278377,8.482455468347878,5.376078641392256,6.980538717509757,11.115709016143601,5.596143597827979,11.424411823209521,6.569117872949066,14.7427268596049,12.907713436279955,13.801221953691403,5.743120221241183,7.241783520282028,7.365566884037829,9.033979152437261,5.462909872657306,10.622448740763675,6.3090249704152885,9.295424065710957,10.039795418810549,11.375925817084493,7.748722252477798,9.597747234852136,10.472390170581562,12.925820732032857,7.716458921534917,6.671078754728841,14.634771985078503,14.036586838032436,10.935784602682407,14.406977288716977,5.8025490394566415,12.79087883734206,6.428964820051457,6.526551872014239,12.275238820598142,12.346161789956469,13.751810347482117,8.522991738236925,6.132388045620118,14.279267559162962,7.678560458125611,5.872998384377537,8.642736904090388,5.067993757755234,10.96621208341813,14.312424937776116,13.140159273073095,9.118385055022332,8.704614956679986,7.751757587096471,11.25288730432841,5.920574990252336,9.07948709562598,14.858136216274078,6.891425614543978,5.489746013538632,9.13061215479884,13.920195671555733,11.44530430159412,14.425469026874778,11.144052632357532,6.2073871420674305,6.931075715567426,8.934620527612257,13.874551704440181,11.565113848805344,5.22959217456346,13.81037896131913,11.259804046944215,7.791480171803018,6.269205864631027,11.37901954062109,8.276212599133174,10.384119684494593,8.930277684874202,10.238148138660637,5.368144902972851,7.524632625568451,7.223188477590023,10.584178386581595,12.062087942153848,13.98381756073167,14.349344719303614,5.739854178116721,8.111851349781585,5.909795398800659,10.500434363853628,7.4218381716045645,13.313530429548466,11.307871219419985,5.393906291611012,13.695250317587684,5.181496958790024,13.482745643411905,9.690766497690808,13.105964940937485,9.184147855234945,9.188872494763913,13.343061891610784,11.715811914069258,7.791791630444457,9.757543787491072,13.701815139856926,5.460948518548641,13.037203704491336,5.287554373116952,13.42029620605108,12.593123124619588,8.057229458781903,6.330744100850079,13.893203055065142,13.933014203641378,9.963940750490037,5.384018563640507,9.733184082550794,11.301496127668457,14.275271789124805,9.888558027718044,10.906307805254103,10.74665962760089,9.44724035815935,6.126167195801262,12.615817751501307,11.003859725778062,11.089078410023426,11.94861566046421,7.7749820830652165,8.887067845543415,8.528675330589904,11.68998521596758,11.232212011666626,14.409644098822262,11.05635882173983,10.41468166320042,7.5434415442245655,7.9474048026403965,13.860720756994777,5.517761583336071,13.919211434146234,5.021689417874464,9.443112801116717,5.712249181770543,11.212984983124318,7.185364828461996,11.368643608272059,5.875067500968534,5.356370209220229,5.614232951878275,11.486341614412765,5.162693541036543,14.521549137060315,6.944717537816539,8.413075729876756,11.178898154972686,5.839590930553953,14.315297599780328,12.812945479703874,7.575719605933735,7.813751473719619,6.06813395767597,14.787402469183192,10.060833882624348,11.958257365699183,10.490600755164515,11.718190436059706,5.964096929354938,10.733922744679012,10.949623388542825,14.141919127614567,11.141947658418696,11.696893116307631,11.191736841864055,13.683064523369328,11.15622604900052,6.3461423425416825,14.175356906470562,9.292648261742702,7.2634941127088215,10.165109813026866,8.408011254227352,12.071754946685031,9.36724504368128,9.893282857325708,14.92541005083509,14.07733062801157,5.895560177493778,9.920446528265172,7.550918286628017,5.361869968082489,10.734966348116814,9.365866519437509,12.521134431365104,11.627383247908082,9.97949181162098,10.10317727560821,12.894826032667146,10.714267694256542,6.42148775150053,10.029118797344836,9.316751872043882,6.482979371772142,8.415866106433636,10.567635735598348,12.605529873734763,8.345046879693781,14.602265672405414,8.69633783344392,10.597590713473723,8.035203249622903,12.979570491895316,13.102336451843545,5.664058257309204,9.260017471598495,5.230387617473267,6.215524361963814,11.136841469517627,14.644321718917938,14.423341786341187,6.369967562003107,10.985129140656074,6.868990923632334,9.992112859106117,14.633537191821738,6.356307127391874,12.68640091212131,7.844955984814126,9.737228995666404,9.35368525146443,7.6151813388153755,11.671453109853143,11.098462128204826,9.072837931257666,13.620684135014443,6.848035425348455,5.086917391129056,10.403650328650533,12.399073137177135,7.4459586930548145,10.470054506642878,10.889292253825744,9.117421318365972,12.883701036741916,11.733430126180055,7.613860242679404,10.826830560686814,13.743909437489144,7.655951367773845,12.602874164841197,6.2962130447702735,13.389897655739942,5.615414592819001,12.626008134267012,13.890793147305631,13.51625051565328,11.618920197386071,10.624895639022,13.593644753735834,6.231585587724755,5.550446775782458,12.123618231052365,6.232401437996698,12.990279637672309,8.627011351769795,12.808294696938221,5.956880766723717,9.524515773590254,12.596676080647988,10.809019950330933,9.882357684505351,9.925906185710343,13.530109068830601,5.110201243579988,7.936719530739136,10.70730985281335,9.257568311912506,14.471397748447504,10.823813302107757,12.070644814120058,13.583555317180316,13.066350905377085,9.952014161773393,12.763654576092868,5.039845390264159,5.796467390346082,6.908840344696758,11.636872995371943,7.270830614545907,10.79407654598044,14.273208305975473,12.898106859837007,11.560920757639293,14.909647958748536,9.157331679637071,13.12847735925047,11.366580727467577,11.9754064133338,10.681807761058046,5.861092420820581,11.541059191624852,9.843916035724828,11.532935728557872,6.6766572624155724,11.712867150003293,14.969200359661283,9.48002754215954,9.524047820306905,11.68341487893013,12.684474587516823,11.366856425864523,9.562324956978532,6.412747032318402,7.910355269837847,12.28270254297113,10.690597169639036,12.637422596976132,13.904415013017415,13.652530948809234,9.410005493747963,9.617569357965902,14.116671162992326,9.031154194248462,10.264747409259536,13.186133598423488,10.293031625419511,9.429001743206427,5.0828629138832575,6.492250356115683,7.880784023389995,13.85709648266909,11.410269477104924,9.855785207210978,13.6878566838671,5.389141082065853,11.70824593862134,10.332435911807558,10.661440894627052,11.401375026229658,9.937938589695774,12.56363336828138,6.15186500932947,5.83782771037642,7.111499560640215,7.357995017745074,5.356035752283052,10.105092982732701,9.467724063848223,5.964551439250934,8.158118807437356,11.861807994726197,7.260316090647587,9.24027477319669,6.152546828001206,5.820084194044794,14.798392295044383,6.336274419913657,10.809852386495463,6.536280883810925,14.101400701644497,9.23283340445101,6.524276607986417,6.755018085966887,5.132966218808783,11.792108500136946,13.427884455103218,9.549339624871326,12.410015956936578,14.235305755492272,13.917927455657715,5.860629027111923,10.511792936015933,14.356919605155502,6.205105478082977,5.279192092138478,9.189021861296272,5.595936298395832,14.285118069088591,9.865074880828299,10.582014187774273,12.201552941328167,7.044508893070633,11.351471781993004,7.2977240887520285,8.931098794757206,8.183329749177,7.719006152085514,8.270374983384322,5.158338134580314,10.614616366813474,14.339387616323547,10.824623187755002,11.806248822225246,14.09110022638156,5.049407858574153,12.817784126702822,14.71947431552804,12.973623674021503,9.80656469426133,9.40457028712094,9.760506050843041,12.119716566994603,11.822118605112088,13.28658365962391,10.549879256354487,10.048018988027088,9.838378808891722,13.624288603738378,11.674709366484352,12.379878428670711,11.803301438888127,9.849441203287048,13.907344985612347,6.753826537091101,7.704238649923639,7.145427145313093,8.82758077983957,6.646184364247924,7.069655355197655,13.013344647521969,11.915298725124593,8.858919591717855,5.445830153948585,9.46694788834488,9.958400097553032,14.115548059740725,14.224803210415075,12.948770499308946,8.41108034141282,7.8652281790107725,7.081288246302728,10.418523528990482,10.859109774575836,13.206072416847544,9.272719717453459,6.159828637337155,9.224842384284573,12.361860243954727,14.394025452853382,12.95081877752663,9.8872083363993,6.730305923320716,11.801821689009754,6.998069653441643,14.977915426122015,10.194986443525975,10.165293852936498,5.598350700685204,13.348439219511476,12.939778597030404,11.007430097778052,13.733709297994672,12.221429275919693,11.043581794680016,5.444836447493673,5.176539983167057,11.544400228156135,8.3447177750954,11.286532803810925,11.377078669348146,8.312899977647438,14.229848018153755,10.279348693653517,6.876556729309762,9.733287876958798,6.4122825972138315,13.970091559503683,8.278150074325804,6.137539799442575,13.223652599271531,9.43618993705136,12.032132517997443,11.119442332597945,13.240657553893376,10.084706390768785,8.063797897633817,12.232176925825478,8.577760098568508,11.60133011148347,12.547124896179858,5.030617118280089,14.908511686004722,7.194322720517481,12.751079684785298,8.962532300555088,14.741566292808788,8.17103061857254,11.392559172661034,9.656386818296303,14.14112595883135,9.123254332397021,6.177901839664781,7.833457241144841,6.081025411836252,14.113682043037219,13.790740521046976,8.963084118227078,5.887330338965391,7.175069850488214,13.041984440978018,12.535993295370043,5.7820049120613355,5.46797804452666,5.90335175801626,14.01607523211841,5.758240379948081,6.114064423380274,7.144127924020287,13.05722716130932,11.391886116963963,6.768282848496979,8.005640590271291,10.345983195054684,7.3489964441274,13.093821028448263,12.30438975196523,11.298849593168478,7.120221181225618,8.975671568768238,12.095524987117095,13.547207469766162,11.249148077419864,6.954864995116525,9.408177624265122,7.660568202084708,12.417568685878113,5.916266843368215,6.453563850856878,14.060835424405266,7.175469041848586,14.37299508793406,6.6049083676482745,14.134371969426274,7.221961065650262,6.941773164684553,6.317141486918743,10.24674264321862,12.700038396827537,12.103487939895132,11.598702143375764,6.844431636638946,14.636544276796759,11.019285913594782,13.114956274278981,6.410854877368797,12.257348256118913,13.039846409882491,8.765742319790235,10.41111079239576,11.85927871188757,14.185375333607128,12.260194505380241,10.064230363788297,12.20291094639144,11.857736836854125,8.298698093679375,9.4435977820415,6.3862240409946525,6.086754545898627,10.567114652430655,10.055729764884855,11.71467939095722,13.545703321608356,7.288919277648769,10.859190184475075,5.712991531967518,5.872907891464063,5.444926469586486,9.460095927337042,6.747298160303803,14.58203399763255,10.875029150834948,11.003826261221619,10.918059206527763,9.752393916165703,9.725967671503524,14.85136710709811,14.25752859649255,10.776385691591328,13.771542691956427,8.438465196372928,13.111706976812185,8.26300567778495,8.74794501329323,7.070573631700325,14.558827627699355,5.909845366687598,7.141342361219141,10.775355276968856,6.619375926692019,11.790975231529824,11.651243967423007,12.865437516760764,5.40227179705036,13.206381323812419,9.178834651304735,7.708012147088801,13.848815777509936,12.990293066703627,14.854851539185045,8.067328314898049,12.416251967604616,11.354366068686385,10.410473822556565,9.499731832941078,14.001477113966098,10.916537872742875,10.30293211923768,12.846055238069365,13.297252787416268,8.313211481170397,11.542360646669907,6.483279824187709,13.412982590152396,14.140161614467672,5.551638576692321,7.648593884247045,8.434906308176522,11.244237741410664,13.421844194769953,11.672656954757802,10.097273415679416,10.20509717216542,5.781719518805232,11.535185657384437,9.833284575825267,12.733638767716018,11.096420374870702,8.885163025541697,14.886341861658536,9.623917859164806,8.435846347188392,5.769136275179958,7.887720173509971,6.631755957586519,12.818466874880972,11.870934612815027,7.839706143679958,13.818432587504716,6.108465755988628,9.741519109798064,11.001149958442566,13.120382420948653,8.949685810169367,5.501662665170839,12.170704688672753,11.869826458810378,12.13847317953058,10.426323499995348,7.982549040650246,11.96028413834254,13.050201775757792,14.36485824454193,14.962700760660912,6.25162663496482,6.831625914122432,7.2029709133756725,12.3836250893816,9.531214574953049,9.504025828294937,12.515016171238681,14.595360906786683,10.602998620188597,10.596180858896185,11.964434303744726,10.856307998662142,8.642337069745798,10.464677197689102,8.418063188820568,11.607072007021326,5.740163241167298,9.535850363712335,9.870434334487395,10.277818085064698,13.813611038522001,10.757977659892763,12.98847655819978,6.121704649591255,14.421298312557981,14.05394104814891,8.706341912110386,8.701270445107273,14.415468335929614,13.34447312486355,8.248177238901405,14.080832998935673,12.991428497669046,11.082082347075739,10.230324364608581,12.498171217562161,14.037362030822859,13.006401384542379,14.36798914543842,5.900284768162449,14.229613916864206,12.931930039085236,11.45746998094581,13.598154003821781,8.702146508067667,9.119118683739032,11.0164441993306,8.998242362114935,14.605958717594218,13.826647760340451,11.078197331720812,13.019718746796949,6.6099857953044445,6.383579169063602,7.420470707804041,5.588084921673393,12.167975790796353,5.709596610993,14.680349789039342,5.6391736266452375,14.533795395405404,12.966683146407478,10.128420481358848,7.71855920602007,13.921478558293392,10.182569892904912,8.314304000045247,11.151067830590984,10.705855460033888,7.048388147587823,13.389920119435931,13.318201066240604,7.582428338197216,5.947255493134871,10.975992580700478,11.323599565926264,7.11536705246238,11.358773003979746,13.53248698425569,13.219354161127928,10.304361757146204,11.228247337419283,11.682821703047788,6.545737256425981,6.909883021984278,10.837487675990838,8.631609266747258,8.078197645814132,8.195607251189571,11.919592749739095,10.492387645291084,11.612763945641147,12.188911456910462,11.851342362962157,6.942351802558234,9.318659109519613,5.70759998829828,10.414324337639194,13.898164689616586,14.530656894932868,10.752506544314667,11.399849200610912,12.734679535346071,14.463530984060347,13.0273720559388,8.041318892999247,10.771063461209438,9.354170188757573,6.808599254860805,10.727143247808986,10.737125573484459,8.119793448036122,10.446932486033596,5.695131319059343,9.611572876354007,12.111277589835584,9.27479991009956,9.880168850631732,14.348772442253697,7.957322874235102,10.119657243175924,8.749312355559134,5.350070138449992,12.084573014680302,12.597515470579745,11.821402326451945,14.516041949294664,11.77075645121662,9.239202727517444,5.201539202339374,7.2721790647540345,14.033360708136664,11.338494547633521,5.026430823166801,11.040481049892987,10.443766513028683,9.732340634147139,6.745077138851025,5.222172404034939,8.438737958904497,13.894590501467096,11.170311828835864,14.360283073685524,11.124477347968034,10.397608342451942,9.652623833670154,13.948768846860526,9.221789479558842,11.53739703919448,12.922545730212507,6.737004615471034,12.369737885946288,14.050874278032957,11.032535418400816,5.602327042473483,11.561467451402972,13.524052998737986,13.886770979606549,8.772667666551603,12.143940064316482,5.652755769796154,14.316564029982313,12.810331800146937,6.64073320221898,6.3031799704593805,8.412758512496373,6.564339626404614,7.685264930909241,13.746536883326886,12.047953659945232,9.222871936618166,14.181973780496708,11.875389238533574,13.999606489473813,10.221688538714783,8.975181610623316,7.677544747814773,12.506566601989475,5.1892196136093975,14.533173889097089,12.63975137115608,10.516877474438484,14.151649110161088,13.287605897370549,12.102713455510719,9.431711624130507,5.722012601414452,5.852530298938133,9.400330035471464,12.13905981500719,12.508200679579765,11.890378785995107,8.844277461990654,6.578937694778664,13.601180703768033,14.57685745625443,8.782728009356472,11.002612604579609,7.5397204172273735,8.341594840491817,11.3694081269293,5.570866261495291,11.737272650986876,14.256822637001324,10.298519854582043,8.838201415956267,14.18086331378171,6.872875540673311,10.188088738507133,5.2543171166826275,7.810285225409204,11.750761949993468,8.931299198695836,14.244140918541001,8.399254921262528,11.559908785392693,5.535998115984643,11.457443639105724,11.369282925959475,14.621383621480838,5.582620011218811,13.289343595823446,12.893070460208488,14.389169238649995,9.6906006427133,8.330771544497786,9.236496703571786,11.15109996910881,13.508366163580627,11.084343013909537,6.750927461785745,7.1039967557043315,14.401670991276783,6.154188677644237,6.418116909423654,13.978170360050113,8.219433238879537,7.831046702226557,10.843183488808014,14.10455333618545,13.612136142151739,5.170883075318504,10.377873433568539,7.008794758372194,9.16305921909133,13.722443980230638,14.514133095385818,6.018074536246947,7.200460646521516,6.02738843760628,14.771852187962562,11.729499399661433,6.846727168974787,5.7177249646437245,6.478924066165073,8.805330312983333,10.498193759284927,7.54033730322011,5.8329781723290575,8.597124130487027,11.184673979568133,12.9117203703156,7.532326901929984,8.227258643111687,13.991877380900082,12.02972862288173,5.9363111683029235,6.797265519949942,13.968193148948096,6.903508533856748,9.255602915639525,6.473236567744394,6.956618342211778,5.947319202194297,14.574218048028511,11.415107526042757,7.254657550860251,5.995155465629987,13.849960165400468,12.249450785168555,10.556327931526964,14.453732921751154,13.377245296395259,5.967076865966449,13.597299971864645,7.3056731348755966,14.229105309777797,9.647105399131526,13.701518923825105,11.623541687581152,6.1825424572804355,9.35754377533187,5.230879016110861,13.62385708944238,14.145910482458795,10.727159325295641,12.65628187336256,14.59598673646489,8.077326644129688,11.050602360367606,5.816457462894375,5.6213116522913005,11.5304868945192,9.744465884671962,6.666524474405843,6.646009411459584,14.591676096537089,11.876310609168751,11.764157373302883,13.755070536468107,14.40693781504484,14.215076196474612,12.990900707556737,5.332915686702284,7.054858791139065,9.899526650034908,6.831018862940241,13.630144585691625,8.902445625050639,11.068240127290956,11.201778296325887,14.331013507996275,5.224011847455707,6.071617974214753,14.415916687644705],"s":[16.45128197755028,4.83810399746015,8.366540898911401,11.252101340735443,19.682036405302416,13.188210451585821,5.33544611180794,1.4463863330798477,12.599571842034623,10.95054023198658,19.91931239278879,1.8430137077832898,0.15531908065399946,15.693966687608171,15.477657985069202,4.462411966272639,16.57865170710985,18.702598920606146,9.81583918486006,4.857683724277355,6.637759429769425,5.17477843886716,10.36845779065196,10.365956729864152,11.34020250475523,14.455950438666445,16.33861864803749,4.7564852450224215,6.156499491328855,8.30744087912434,9.62966570722302,11.035401212476552,4.25524972527223,1.3613703655425091,6.405048227184249,9.550370385871894,14.171935134836712,2.2853572127613075,4.632879097669527,4.523587009430066,2.9299763314691463,14.293413316045452,14.065037398449999,10.383248500794164,4.245328521722946,6.678800736292438,18.024183993751336,15.966322486119736,4.857492468005624,12.337432685766752,5.716030960387606,13.495048766163201,8.318382897895118,4.906017710852106,13.803045236107053,9.533689605318818,15.686758710833546,19.203631957996187,3.814423444814863,9.599778586905083,2.173665182165667,11.387375077935795,2.2875489133138727,17.0321872336295,4.508145538502268,9.65401042153136,4.233956012887585,6.611967585554153,15.725219253853577,6.599709538388381,6.137283499116095,9.270126337359276,16.652411184602194,3.9742423556839057,16.541660134943534,0.4442069737136167,8.06980663499585,1.2915381671164328,19.85139277375422,4.744997026340676,16.527757424554203,19.510528987743818,13.498980165417374,15.081502613356758,12.973872681516351,12.130241084732948,1.8308371604772589,16.97932223205125,15.059649479034473,4.449151131997349,14.872904710507463,11.666427943180878,19.915174756535087,4.3514210301276,2.282639513977842,6.378538868774735,13.942297635558099,15.046934900188681,2.248758337257306,16.085112577861796,14.888647060499554,11.906057577202361,18.30697333695417,9.569825641283533,18.088792296995095,2.411540222676569,7.941016587169836,15.359849138085945,13.780363539058587,8.15528693487619,16.582256656670452,19.990209680151963,7.288974623109596,7.662875174194261,17.60643776534885,0.9461032574455563,1.9051871874973436,12.625645286004223,18.343841870226008,0.8424284584946884,0.33009686230679236,11.085345933921031,13.004196816502539,11.970541943826717,2.435634764608343,7.525260357144465,1.08738090428123,7.093799443611037,19.85586421283201,19.234494862615836,11.93582656799097,14.93393373720668,7.617789526364285,12.493640049372576,0.48432557510215357,17.567518107095378,14.258857561859832,9.185990110729435,7.130136591708753,8.052048300430382,3.235243270694612,7.1225298271026904,19.88440106322851,10.202191569755445,0.5881611726715752,1.9946941203068569,3.7440237005651245,4.245305512775017,12.876287837932656,13.2591642869816,13.334551020593409,6.981049621615165,9.984328043925768,13.090824586643176,15.493121248346329,6.31465273079117,1.1435790485229624,19.6551451526761,14.714534096523732,16.39747833466735,2.8589738836725376,3.920628180613548,7.576741835538501,14.696529151681057,13.339090640587031,15.712679414259547,6.099693802716235,4.263536639623942,8.658013052903847,17.70695886924004,12.741256318548748,19.873733538331138,17.709213001462615,17.273021780875983,7.538347170997373,0.6165728395322745,2.958376296926315,0.14917578347272364,14.497971130547649,4.124129369362035,8.517641145055066,19.983474595584347,16.166253596289366,6.087186634828039,0.8059429919257166,6.581159778561845,1.051871443160759,11.0797120538862,18.256883618106833,0.5113677701080821,19.77835724319497,6.451837086492551,13.670824871490797,1.519823455590723,4.706565479156053,14.572567314872039,9.684845168974272,13.400251945471675,15.35362632363626,12.201676305829935,11.351992652125631,19.205100295924172,0.39524922105687477,19.062545210145366,0.6609118951275139,0.2420898180384068,2.538404777307104,15.05662580658611,14.812590955811554,18.427861976533826,17.493704884675687,17.745904129904886,0.3078496784908902,12.082953392265434,5.359389709275013,6.655688292937358,8.791985400582284,16.151782789644674,7.962357124818373,11.299163332984952,19.46485338051168,7.166523276518988,12.447412240776652,4.644683861619878,12.516332311238582,10.331335570161023,4.315300330142602,15.018119310705549,18.827267422414504,19.43312144057561,19.36668908870995,6.254699895162568,18.51218974400347,3.720752201855655,2.8045622084397026,15.642071554858923,10.046228878203923,3.7276332572382875,8.936826429735643,15.23179770850553,9.039361401688408,8.636541683101937,12.283058821308641,6.849637099063606,8.49588655456861,9.660460902044136,0.34674881581752803,3.738309171242289,9.649020999320314,17.44123350531154,13.067423366769507,10.313866216121216,0.19314926637683527,19.40882047842492,3.968934926150207,3.3971059854993912,3.921347597981053,0.8438244740078016,11.840036472507794,18.801058062903774,5.03686386677324,8.178389017954068,19.412234998311398,10.957091891339857,6.592559995950791,10.421866195814458,10.31549100775974,7.361692637315662,0.45109928913566577,0.31797109366549225,6.110235586863406,18.16565473747824,10.25566949039861,5.196235396282662,2.7486476987338815,12.335478767492756,5.172633238723936,5.846555243305271,8.046069341232144,10.543655188906795,5.221042326924326,3.568886784098635,1.6388157438733808,16.546258832711843,19.27639948362456,13.809451078153398,3.373455155529297,7.547481898175774,11.96583338940972,8.21253753502452,10.369200352761583,5.318863915313989,4.416888064749758,12.239549905354288,15.683970341975225,14.448205335887994,5.368654734374667,14.642664909462638,6.521006852428166,9.607889350988494,5.532544829098138,11.306568953202593,1.64741343484347,17.447913529266007,13.54520921542238,0.724758811505879,1.1699252633560553,11.990489816918481,19.338441883960545,19.651432546448333,12.992222765344529,6.835336619390007,10.18152580126217,6.019983105673252,15.417598407786306,13.185558711406937,4.8268351737624515,0.9395255154740845,3.2008951213455106,14.022706793963714,2.2027120149002766,4.6494655910203875,10.28063604962059,6.015205518549411,16.798129732636255,3.75961051849234,13.039344252829054,17.753130475447072,15.635815407234826,17.79060765149369,13.946293839600358,13.620689581301813,5.010090973829078,0.2110496452736088,1.4697057839980765,4.104204769646271,3.2478912130428306,19.8824390735437,9.579621090049152,11.045995256791286,3.232677592890072,5.046877110480841,3.043456744856581,17.765166827184583,17.105842448412997,16.485066735175767,17.164809332162775,12.348705477517704,6.030456870418104,5.487553850285467,14.290861102920026,7.548953991004828,5.103322537070687,10.322002151901248,17.492107548318682,7.828933111338854,7.181366582677202,1.6120979695429005,12.634319453271491,19.267019139839633,9.654885197954748,8.276253354587189,0.9329386006514184,1.3917208062804098,17.652975920258356,2.7186934028380527,12.788486772285479,0.5332348181282764,1.5574280208316438,7.902043886594012,15.714507644883437,9.996505456023073,7.976172944742346,7.8002670979820365,15.76671054304946,17.047097148853844,1.0192699054946308,13.445524333502119,17.617159986121106,12.137270183257023,4.242375371587865,3.4666423753427855,17.899901904887408,19.352055444501666,17.520073815406093,4.658995769522316,3.036180958389223,3.6144571086466337,9.707647221452191,16.264095633329568,5.552013637261237,0.5617197369677918,19.313678439444033,6.601967920671505,19.791314721354457,3.5638865054779956,18.235135189489622,1.697520472028624,19.52947262911989,8.57295678828137,0.8226765194359675,12.4133761937548,14.017699542740164,13.016651278239625,19.54241640023851,15.425179735149488,3.588950909711115,16.948357139049136,11.797754177351711,2.666730063573728,17.249889938488657,5.040925636228715,18.323400937141578,2.406104815732264,19.554882069266174,12.995627887244542,7.200993135251439,1.0996004959238803,1.7387531055396543,16.669104547458954,15.604191324650172,17.469183533803978,5.282776446291275,7.123223229215512,4.186810075973417,5.563104297295873,0.9727784763511149,4.0333721398727995,15.098057260243664,8.647559986875155,5.052070785660319,3.2132497606433486,7.856362902788989,9.835253412611117,19.29363486197227,1.0854858760042552,12.12723724497847,8.657435611545946,17.578716909020425,10.771960582192367,6.893910496719107,11.33596781450386,18.451698011394022,11.372106971396239,15.384548306880422,0.7954331083685995,14.707737608022526,9.894705838431568,17.010215485833427,19.927704691755686,15.771635847925944,19.51913056298735,8.83110758626534,13.313434095692806,7.735954120675781,12.642757195797131,4.671008641424543,15.261999221714554,9.145893720207381,7.626406089583813,6.876928826370294,5.223753193122591,14.085469328172206,2.079239454699069,17.242159677333145,18.446834855603612,19.415967271862392,17.986876563263046,7.294617595433683,1.8014165482413569,3.888124783014093,19.502420907375516,7.8705614014810354,0.5627118543057952,14.03882886402151,14.425083440922979,0.8954469810581678,2.777018771231665,10.485324286418765,14.689978201379654,11.120429661865078,14.993465618732266,12.498265813903089,10.439643887929279,12.030887071682317,14.109471857366493,14.749237089430203,18.11541987026748,12.162288336499554,3.8007023817587804,11.790931354305375,19.826559248250796,5.6995681457115355,4.093523439086324,4.1804225628368386,10.689223494874657,19.747430204594973,1.8685392467834383,3.6390100114949586,19.67406675704425,6.270533626044399,5.488831845212294,12.967931507190888,16.188996221697263,11.11989173646367,17.16611469956444,9.087375346444105,7.996751894407708,9.445761632991774,16.44831822992517,3.971664919628095,12.364428962857552,18.196219611307868,6.137610835279599,3.2977955623139943,0.5173196230487731,14.869492407214683,9.404026642799511,16.297515485329463,6.685589528970666,19.631283384260676,14.660400410553095,19.493291779695817,12.457266029014509,2.03179158036511,6.285432348612141,16.87215275722759,18.185704924387338,5.48076008337731,9.506958848890124,10.829859730358212,1.178232326121842,1.1377776437640064,1.1053317032251453,4.659900975801343,17.5103211613866,14.433126053381407,12.685423149626018,12.567730585978808,11.160848637655324,18.801910481211802,7.521656971947057,13.407255903964144,3.489829181180939,6.852408903628029,9.656811808194519,1.342708398582828,3.5463497683041423,16.623488395934444,16.508826362194178,8.034706154684228,15.021151437170568,16.70644593652055,18.702244732126733,6.354342954915455,15.922503154315368,2.0247147311939617,19.505724233723775,10.760456999589625,19.261459324166303,17.48511188214819,18.83391847118893,19.703454232889726,9.036424606674514,3.722616254827722,16.05294932077569,7.583576352447836,14.493525021319504,11.928199976527281,2.614898648727171,9.531253695665388,10.457472102946955,4.60187106652576,12.431643719102144,4.410164351670378,0.09360586485615219,1.3566289778410523,3.157704648475841,6.109740555055678,4.374128375986985,13.700350131608339,14.572390137672961,16.74145864405641,4.005262529788265,19.82644094500919,17.83373743119705,5.463694329735631,6.489070748112358,9.936687683000326,10.713469550887481,3.772686860666341,14.89353040777091,13.227084204513666,9.047438125967178,11.645660747885923,8.289919739623265,0.6522817398302383,9.841995357693234,5.355911817064181,9.71822180769044,9.837585477958477,4.449926779923139,3.681720869181131,9.476385920202333,8.600982772904855,2.5295911001717553,17.520250507739053,11.427848527368711,16.868667842700205,1.3988163939239717,14.468048268245752,0.8534429786829989,13.234293470258311,7.0254029773889215,9.567400748999724,0.7760256793531761,17.0629997126916,2.6484541330932965,6.256799691180497,5.432414906904763,12.277091280312206,9.852905292430192,11.487351797730053,16.783856209607542,11.64897872956856,1.648572036951168,4.112950000466333,7.02503353610735,5.356004848733891,16.20973241972964,4.950707566497496,11.491713999177403,18.12281471441803,17.00225728745387,16.999741455008035,16.652186020357508,16.936802389834597,17.509010689745917,16.75973716112889,14.942391459153143,8.813848211817001,8.942406856979934,5.475349303182546,14.29155076629506,4.4416863129477635,12.49951497173743,0.98620133027715,12.726011366397385,8.445805641585125,11.411896490051841,6.871354353078973,7.811387086134971,16.725047638859436,1.236920913051729,18.837866030118988,2.1885160794127723,0.5268158790485877,2.0521992876488904,6.541639931544623,6.631099528505797,8.334659571000103,15.322049483244612,19.741401982555146,18.420750851590245,19.125217456820106,11.305676208183417,18.98616583086548,14.835999114047468,13.20419097253895,14.066817007073706,19.325421094027185,5.369084860235573,11.571638450228946,3.2547001331776215,1.061482259969213,7.462659587228666,10.339136243808698,9.915506324447456,18.003877777616005,17.345724722650772,19.758076612322654,11.83885428357387,6.295087688466401,10.50052883608993,0.786118697442646,1.889349655102861,5.535575588509176,12.308496172835026,10.700226959236755,4.81748621927661,2.309893033716648,18.527082696540678,5.0284855757061875,1.6554868359851005,0.32882129507461944,16.420125991739948,9.80040444940602,4.166546813525542,10.689261673124983,4.809569780311795,11.365760536099025,10.433901039404647,12.249374532160777,2.2032822272422736,19.46837465649372,4.743412521718491,18.78762704025079,1.295319555921819,2.9674613028157992,11.19238101075409,0.5610061793818355,6.398700874030467,12.855165388407098,18.28520442903407,9.563853313040651,2.5559452234984814,15.283790211435662,2.897438737856546,19.091876902434738,6.028582716362592,17.93376838667782,8.843098591018673,3.218114405461714,3.1278485589753258,0.3953696739936774,15.514384572234746,18.224498990414602,16.174172749466912,15.288567370374157,17.162295750334394,3.3222683576888823,9.45450724572777,7.5589362258510295,8.835946359226266,19.21451370720334,14.85006687877799,3.808915534245809,18.617731562785096,18.431674151425973,12.589149445598524,18.798122660579168,11.094007431752452,14.665634742184185,11.870245887925783,13.573607929272749,13.701828323924762,8.84941094500264,2.538087428683977,3.269922686848772,7.298837700931262,17.983810635388423,9.928340997188926,16.423534108090564,18.16242291281508,9.003669496623008,17.87908820120791,14.596949655007894,2.985352779636843,16.904108977330626,16.260808699492344,17.042170948856548,3.082001733106625,1.6421674166301514,7.414418742360991,8.858473175066282,3.6195018563324366,5.506488098527735,10.652341457366742,4.714480351595309,8.013614769003802,14.62128414158181,15.167371872396442,2.2999379511590234,17.66951349365151,17.967719266624556,0.574835024739726,1.7277222460337116,12.714339491644356,8.176836109407972,11.440485597962562,12.492841623401393,17.45103091411579,13.629419165646489,17.922700049070738,5.061292923962273,3.9711812379828526,3.378335747574477,1.8683425461798109,14.395186899112606,6.745817708847084,8.537949472685721,13.031060775162477,11.16524330917342,11.561939238829048,15.876043410539786,0.44212040190831026,12.73400963074755,10.826445798416987,7.424493239264103,13.945036159632496,10.379229226669864,19.56137384904188,9.542501151832932,7.540224652747134,11.674510354560699,7.976633922356959,13.733036602016199,15.950441907095115,16.40260971788132,19.443671300280215,10.825238424517917,4.971065136993471,7.859876953240557,0.9071529372790943,14.11577508093588,7.980802510646012,15.521612025880604,1.059178298884036,11.626687748551028,3.8580196549404544,1.026840520833363,19.425159929950183,8.041020498379737,6.953830962616627,4.3670623669448405,10.64237090759466,14.950058141794106,16.011055158616905,5.571817255975358,15.681057401731646,12.29890802782879,10.680414388773713,18.85310691025215,16.14318308272604,5.46451826349954,7.76084952637107,8.813680504444893,0.4063070787538692,15.458805098123655,4.689532104987166,14.372230456232833,1.2192104641221402,14.79009256911068,5.191572298895948,9.529712421502147,8.047060580469436,7.058448164212874,9.242217486407407,0.52537538581924,9.16649343139504,8.86940261600408,1.9065154475407597,15.243022682711498,11.794936437997041,12.961528240055951,7.814116845617725,12.046891123024682,8.173477255608713,16.860203804310277,14.933717784499745,17.902747891023203,5.156583440981097,18.93927636983519,0.07026251229879765,19.150839943738962,8.113832208584576,9.512179875526115,19.21359164220568,17.77689119040966,15.852875272313721,1.954070969289332,0.8690509036184357,18.950445956439935,12.14187479817506,9.494889963350888,2.0849041278907787,11.782476706975489,7.439536872489687,19.852460405030058,11.367553158137781,6.117134149729764,15.888594993070747,14.751347716138895,1.791838544670048,0.05638720391904606,8.645393349397207,11.54026754086492,3.4247991588775095,15.348535648678222,2.3576888599385626,2.3500030923740756,13.485455907587403,13.858363226642343,12.222157004048313,14.926861652544495,7.51798876059107,2.53502109105177,9.518692469374832,5.808924362499224,10.575808564602397,18.423033264099857,3.8502437621058894,8.16939110800432,19.015871621386257,17.929161101814856,11.807246495099761,18.7370600324573,15.648663133677516,7.093616620300942,12.082501808453943,3.1691046780924115,0.5524959829569598,2.414293525789497,9.360824555751627,10.261598190263426,17.865555342779857,18.090769212542632,3.6847243074266123,5.908502691156814,5.115482996963476,11.856715096283544,8.76956745186801,11.201505696733696,10.376417370912897,7.046622401425222,9.709072930309164,4.293759844717959,7.004962435758135,0.03625730699026164,11.251010212214997,4.649031600617857,15.578128701534922,14.181684246512592,19.504646546739295,1.2493063822331774,4.425872809344815,2.122108062315702,7.216106270419624,7.680781962053853,16.284105096092723,19.461527889297713,11.172694687585727,10.962143211380955,0.6847485007183307,16.450160083423704,3.8186965339844114,6.750569554748256,7.767178116303719,0.7256427359442386,8.17809365952237,9.11102250472203,15.216663729923546,17.54975545932396,1.7555314509620645,12.39073570350456,15.985172859273584,16.823348774103664,19.727586679690514,17.21289420254502,19.956065252769044,5.486511271315555,0.21727871763119744,4.214366570932109,12.70214675418233,2.727685391784087,2.1467646523485584,7.1505428320632225,16.200038021759976,4.285960905450672,3.43115907665676,3.6245081117493783,5.883303682738372,12.148894185267395,18.62417306944755,11.093508327829475,2.4885285243142663,13.991090397128074,7.551054626563638,9.002863052394945,2.943985883049227,5.045847340232776,17.85649831482229,19.60430629390135,16.69873206827959,4.380365905262198,9.941772051697253,11.784046420695331,10.847700336519136,15.607777385229848,0.402612037438157,19.871317417148667,8.876524069027006,18.524552904905526,0.7069179139678683,5.158883151644358,16.40152227779735,15.339108661562605,14.974084836029,7.286401590149896,8.305434211386999]}
},{}],120:[function(require,module,exports){
module.exports={"expected":[-19.353608732844684,-12.74331376043363,-7.100389934235529,-45.02061796027795,-5.872359328025546,-11.382170336586618,-64.42280941086024,-53.04183826063091,-52.214467830135284,-44.5992631761009,-29.22539719131102,-12.39615002453852,-28.518238338087066,-26.971591122183387,-8.804250579463186,-20.818705260024245,-23.288435489427847,-29.07485383021145,-12.835055805405874,-4.682137377568432,-28.426138393484635,-13.726487186868509,-15.602562392876822,-5.512746806796305,-31.60395673286133,-4.438792649276515,-49.52360633876889,-26.70259781300253,-3.482522126904434,-13.749642447365492,-36.279987808071716,-11.527305119288393,-41.39530060742631,-32.26944137068795,-4.7233790076385676,-15.425790126983845,-5.437742388872135,-6.54087478904987,-39.46057120783774,-5.527958525777537,-32.58793905558734,-47.57446985912956,-12.530222965394294,-27.24597940970041,-39.26795384855283,-51.40073390613134,-38.33910458860714,-14.32389969413062,-9.138921551346307,-23.803402410014733,-29.953926377555305,-75.78207122289365,-12.529301970433579,-33.90975198492952,-48.873471516811605,-57.07510767439703,-5.413848815112373,-40.521363900384,-19.86361870964446,-17.016903051587022,-56.23341812976701,-69.0046384123873,-29.19532520623523,-48.60056492876208,-24.430553749925306,-23.16196175860827,-44.66719263490483,-32.656166928505606,-9.59948313906343,-61.91973483684626,-23.42659461523982,-6.631473173022375,-66.30589393921595,-4.953932481697831,-16.66970945142615,-30.062135827785,-53.021051876467865,-20.869707730012596,-4.913062927213222,-28.964072470896873,-32.97446864374316,-30.276249412158787,-7.64516598752868,-34.3051146586631,-13.280849807360218,-9.388107118549334,-12.528990438643875,-7.75956499626398,-41.44432888954372,-4.689179185781092,-27.50140401440128,-22.659116155787643,-14.611600757883306,-12.002220352095042,-26.306802840237555,-53.5725025220655,-26.63602571377446,-27.10393358197995,-10.041106135502455,-33.19402292142505,-42.629779478672276,-13.890082248650911,-37.938733996967265,-8.167352847230413,-23.80284227632762,-32.803632343293245,-65.5024067590996,-36.39525025902086,-31.647803596781767,-34.81850803852969,-27.27763498144271,-17.756000500868762,-25.735024621347186,-8.350428570058765,-47.50422627027976,-10.571235056173323,-42.81966043654988,-26.69997281758119,-58.01896472194984,-13.740355133776946,-8.276307831170078,-35.84916662682538,-15.457883084695508,-16.58246966424975,-29.8848945427641,-22.4833781870474,-8.85123236325376,-32.0557260151897,-39.35909430135482,-49.77653496760187,-5.6513206992983775,-103.34578156059308,-12.790825166919749,-21.68150025348144,-8.332183178233576,-9.439243898486366,-15.909358065407762,-24.14486243499849,-24.362259143636027,-6.47682706173197,-35.25448960199645,-40.76464447421135,-25.080410930419454,-25.934557529417265,-7.891251773315629,-50.3467500200602,-5.0703596191201505,-38.500767656934784,-64.06305595691131,-14.464491910693834,-38.860957316920874,-48.97776996085382,-22.228238486829202,-9.308085147618478,-8.795809236963933,-20.16211502020329,-69.56492190391377,-19.113617649460647,-19.77974980608519,-65.13266831839974,-70.66135920923458,-8.831677618129538,-31.39996510901312,-28.165420310870726,-20.716363476789553,-20.22269676411719,-21.740284875712327,-19.297559056180003,-36.94146234532699,-35.76777738650787,-38.56938846378447,-39.07221585139981,-8.736792858631848,-31.19632681406847,-9.722304916796475,-34.52238630333495,-4.5272936658811505,-11.612407451747337,-13.52269369997891,-15.64472720514327,-41.160534132426974,-7.95799871238667,-20.505026825849743,-36.36922044374393,-67.70730483220258,-8.96241611212175,-36.03922148101972,-5.954406424005272,-64.5028636343623,-39.73552523661801,-42.90299633541564,-13.31049505661918,-17.796222048134247,-14.583901268744969,-33.95785634453728,-4.643837366648697,-18.51173327990008,-15.699545715538669,-6.7136695197837115,-23.80042816848635,-7.58131496903577,-14.89669297017261,-29.095840884148583,-37.80640470991584,-10.46041250876214,-40.41949255087739,-18.87067275435079,-30.432124860843537,-19.040554742441866,-32.165883025312496,-27.12782554630851,-23.75312537980419,-20.156166528087205,-4.269975935139879,-67.70718857701844,-16.744209567914975,-90.16228651816485,-6.137114380931499,-9.605727558872497,-10.218547016210792,-19.258350710959,-38.21027912801966,-51.3762078787719,-18.495126649471107,-33.2347183075089,-12.883023525890945,-19.981543839623413,-8.980784880801515,-13.309766874920843,-17.460753777002846,-9.850622984325286,-14.862476529887442,-47.1268723339897,-76.44692451647596,-8.918400831747014,-92.626356074268,-13.956650507402308,-20.54105831387161,-13.95152424828529,-6.8982036583820125,-51.15768221938285,-19.166342708255666,-71.69090406332653,-20.46042837223514,-5.065446666149812,-36.291149011010894,-21.870406849413406,-20.776728702122714,-46.372780101018826,-26.796803411474393,-53.40372171824565,-7.944473864583288,-28.55225722716622,-44.732746689247946,-54.655443287040534,-8.117261396253012,-33.771183876977304,-22.862792477016917,-4.854522359892691,-26.997770101431176,-34.40344378673643,-78.87318011819823,-32.52324895354103,-8.172178933183789,-26.88256794447645,-4.7387958486030115,-12.741409140774838,-15.231920806351239,-50.279907832483715,-28.449929281386385,-6.683137293709661,-66.19735567994918,-4.755738751563136,-22.34513878150185,-27.99805509964272,-19.683110241233486,-22.625009886626117,-23.001009156203924,-15.16937576442475,-12.774638650580892,-22.608071949976864,-18.94413104677774,-16.329307321379613,-26.163945340302504,-5.088930903498114,-9.800731584041634,-28.454486338265017,-12.948108663563017,-9.607163815843016,-34.50613579025119,-39.2880472542245,-13.85610971857326,-34.29012859717657,-41.36324089400697,-15.739395232669604,-54.30234251444435,-24.139648936546575,-38.5750665485688,-12.34048669196105,-27.50165050175335,-48.25812893087879,-4.718184373580661,-53.05011643482486,-51.70887857224718,-37.46088914804213,-28.735901526196173,-34.48999825081089,-9.203528751355897,-37.96681792616912,-7.163939844064629,-12.665317870025358,-58.71143237392973,-5.372008055805665,-49.65498458704079,-57.68238302963534,-31.18020555450846,-30.17751263005883,-31.774027182588576,-31.6088552287064,-29.14925864910601,-35.07081065481017,-5.419944884047573,-11.14105428619342,-16.974975149437423,-27.74043330276402,-29.272377793989918,-19.855174794560575,-15.377293736541443,-38.8367919682517,-4.784814512776215,-13.674659579020727,-12.18948872052132,-12.866664375941124,-74.60723117163697,-15.158053336900126,-17.819974506794317,-42.31842615533472,-16.865451938040845,-50.694690526296654,-5.046843318131412,-97.58534960544205,-15.875911221354269,-69.29488073382232,-9.225198471405289,-4.2969189317593495,-16.256811999359112,-11.360545295294997,-46.85439112553951,-30.767275963537955,-24.953152021739356,-18.583267209242642,-76.77834942788971,-13.881759643618242,-22.625816698614656,-45.73029032426698,-25.792158727790614,-150.0058560033036,-24.176365007885224,-34.07274213811749,-8.652209576580244,-19.50567354581436,-28.0839248524383,-15.442488964341843,-20.219819479745098,-30.005659913829103,-7.51974418399028,-10.60805587755949,-26.893615717924032,-40.68837072192227,-21.485441172224707,-25.697501945876954,-4.299492220100528,-35.97063329218533,-29.853522267411837,-17.8298317957361,-10.810923621273101,-53.81655865835364,-5.373849655820353,-14.342689282397366,-17.339290020718593,-17.65404656524042,-25.136055583974933,-4.818915593137121,-34.22663863471824,-36.318973086602014,-29.457234164266218,-9.405742853467231,-11.549794202694427,-7.805049321485945,-60.28422991549865,-39.21486974435115,-11.187102159235538,-35.26946928917158,-18.99960582743145,-10.768400953438434,-19.90600013766085,-31.51342478781095,-11.67304194726848,-11.558333303225632,-80.09831933341347,-18.816443485619143,-64.04381026545443,-14.550040939497382,-25.242812310707397,-4.306806151547079,-57.978480705686614,-37.87169256678141,-43.47073685239856,-19.439647646376855,-10.54682440044935,-14.883208176061448,-15.133752795808233,-16.739045902579214,-41.52188249302124,-11.487052992184104,-13.028530674907673,-46.642737575828534,-5.652888187826124,-63.06082878707291,-56.26638267268455,-5.264448426009089,-63.138807411970724,-9.780421912740461,-10.130062590130274,-28.085031496546065,-15.945253751630434,-5.777683091921788,-10.813963474583774,-45.59658899359597,-17.907346788399362,-33.97408774143248,-60.18478123644071,-10.961166133413068,-5.610584488108818,-31.73671613121293,-12.666389545343716,-26.55244252919446,-13.933371657804406,-34.94071249787457,-7.933553395888586,-18.58848835733336,-23.780401396401817,-49.11720502101862,-4.9738166458613575,-5.592923446292662,-56.33422791461186,-8.631270540713214,-10.606095462352105,-12.134453163057044,-18.747004681533642,-5.185890256433519,-74.38822663379283,-34.446278358771494,-45.99350460328218,-7.351288042786407,-4.995937542184657,-27.548171233697254,-25.123789818036148,-72.26059068240387,-30.29671393230766,-26.91584769433554,-16.977516705858495,-14.666148177729053,-9.227530795486944,-10.359732464438844,-17.099964908127625,-15.382385436949631,-86.38612222130548,-13.931500948317298,-43.81554700744035,-51.55516873995038,-20.441311832327454,-27.725305057497255,-85.71725438950185,-24.595701738796304,-24.7336060290183,-25.674790039727817,-39.447124188360405,-25.55246175520664,-36.81374868977606,-53.99688926521737,-31.338024933683982,-16.337469450678707,-42.84372412000421,-24.044132027543174,-30.74243326836896,-4.783716060276175,-30.668484335422423,-39.74540205068438,-6.082801093400541,-16.655000703689694,-24.871551376480255,-11.881733130396642,-34.95449821895584,-30.630165667423377,-15.530807651818073,-44.92652096690878,-33.32831425163823,-18.01937578486649,-12.023454221027762,-3.9411030255766772,-13.615882062740146,-41.22110644882076,-15.620858561375142,-6.24538945859856,-19.400123168479393,-21.313426998489255,-40.52021383432091,-7.899620005990694,-17.11462835312523,-18.086422436102765,-81.14522961002412,-11.734158813687458,-20.703679967180896,-13.115415683123029,-44.351569320769116,-4.542072740735122,-33.91498184755755,-47.00203290248521,-20.699336981638524,-32.41317079530522,-8.731018427803196,-32.89170550227836,-55.54984005143457,-14.539780045082598,-29.114324396837205,-4.691743422165143,-40.67753544688978,-26.391456500220134,-41.30754748439534,-18.18213436269161,-17.463013188604315,-36.52423850334212,-13.86219174339966,-6.3906715630166016,-9.302521744831587,-37.73052125108354,-38.226839379443504,-8.330057726101401,-10.37367266826125,-43.05589394584332,-29.17950249089895,-13.537085579980037,-45.76266401464426,-41.721255520726785,-54.56797681719323,-35.00007361926833,-35.29785685039208,-57.76319383240273,-22.8283676386322,-44.65939808257611,-48.02785065665599,-15.37736700580175,-17.310892760867723,-42.445040883394874,-41.5206455651503,-8.769455416075955,-21.879063483001865,-21.24440852302732,-20.47393290608189,-12.961144636481409,-14.787369832409047,-38.985275959909835,-14.025322900462195,-21.792994423837833,-56.55671746777411,-25.954153122454702,-73.50030996753931,-17.610306713598803,-18.39259132142805,-14.118549886765246,-24.542763309791475,-18.41543735677085,-5.4727131450830155,-55.468583219592865,-16.817149588726064,-17.834147198326235,-61.50616573383899,-19.93693499935457,-11.83995382806704,-16.884301486282524,-30.98906805715226,-14.80607294585193,-29.9196008032917,-76.05649558122397,-8.377571314086198,-31.466396842404166,-33.639048585738514,-19.330193990862348,-20.98608008853346,-42.343055035163665,-15.112116079743785,-27.987919653702217,-69.1186673897426,-50.77359187334562,-7.801737037566756,-16.53826652547418,-8.743082220088464,-13.747635420413506,-25.56059836980717,-48.63338309591434,-48.26880103965189,-40.485486414150536,-18.497879282262502,-27.652861592460685,-23.140516802195783,-6.991953860031389,-90.83835894758128,-30.483635413168656,-28.14282677408249,-7.917710595840156,-26.905957198974143,-47.84529253188209,-28.420897222229655,-44.17061406765578,-39.43287132538747,-27.262230751522864,-31.397766728317364,-77.99037743632633,-26.124423811887258,-27.411046258672975,-16.929750115528066,-13.144475215938467,-12.688109894438856,-19.121124355650455,-22.228147708596186,-25.931676365371846,-55.1600273991769,-58.21389049647367,-27.262408245837918,-5.646500744595208,-10.352394741238793,-26.23722622671348,-14.028449807441131,-5.450446282057164,-8.349219660330812,-29.278174468454466,-13.72548260479748,-53.3242165866465,-13.709482767167922,-65.50700954499696,-11.3094253234989,-21.768078448399695,-77.35087982120551,-35.425409670324086,-34.633391216704176,-16.16186399042409,-24.154333608053733,-12.971947511243645,-6.668217152324498,-42.81779916574975,-26.796324140481772,-49.59079836784435,-14.898448509993498,-40.735871681419,-34.5469916453122,-9.509649539108496,-15.440178608306757,-30.28290414734631,-15.346242792624897,-32.20473308203421,-23.09049634409491,-20.8945781126031,-6.4880987287363645,-34.61226975501859,-17.41551586115855,-36.878136973418535,-9.064569368698733,-34.50983482502016,-4.784502219771878,-16.151545410684857,-43.31557702316809,-5.429504966320547,-33.81412770009342,-16.714174244722148,-18.754821434118714,-33.987131413668045,-14.385655890468607,-11.545888394547434,-12.460185791186197,-37.43968685327141,-4.728564257006218,-4.1171212269700845,-4.5034545393650856,-13.889048154552254,-32.82292297771444,-66.05391348398409,-4.647402185299306,-45.857958301415486,-14.415258289296663,-80.72073719567251,-12.308714552949624,-25.001942798704114,-20.903944292892515,-64.95189667674106,-39.485839202534194,-4.947540714442241,-11.019169311986682,-37.814232580940974,-42.57835633900664,-24.10912234317892,-30.655566162283968,-27.77773070244924,-11.76495427917116,-4.778945897982403,-14.315550005251954,-17.942896452777845,-26.071623539158097,-20.040682089154494,-16.27042891995815,-15.690939835492614,-49.13473027175771,-13.422656986119547,-26.63655092033445,-4.6387597718792035,-17.3291886780645,-15.374401427434513,-31.66184672790066,-11.104164781361744,-14.636886410420269,-5.9117081196019505,-16.153486196658267,-43.26957578507599,-10.859967231852336,-28.196691266616924,-11.52491740752599,-68.10545767253286,-18.757905049566688,-6.919215454748533,-12.914759478000565,-6.844685790608529,-69.48462540131219,-16.757509804218536,-4.779567792336718,-38.085527004375024,-6.043272348589336,-56.81803964579842,-12.997775393545387,-35.5667534763249,-26.753267634597794,-24.648705272946714,-31.433401309072128,-20.5586074088091,-50.10283102415464,-9.491673481492917,-107.61831707016412,-24.93156092040744,-14.850646578979747,-21.679799111591556,-11.598399468223718,-33.64367156862209,-7.984127169895846,-33.99815009379362,-13.21168760306953,-28.621165383425538,-17.7673964136313,-19.727001255521042,-4.424875013083289,-65.29632859504993,-4.620113808923065,-30.294382979911525,-5.442747988892541,-26.470136506429657,-12.038564340794172,-39.37353176595451,-15.468733653410343,-3.9463006692012437,-9.2399486708326,-13.182591733550675,-46.288254233600085,-11.21183555166622,-10.815357182368587,-5.007691288472184,-21.71846152812008,-3.679998092308468,-21.600508542172225,-41.23216573446673,-30.997254187059557,-11.16283339649755,-33.83477323010387,-10.36302879527869,-10.28793914142134,-8.208779661505886,-44.51290298153587,-7.5654951315773,-7.133009352452521,-26.19876045000139,-32.02652102892535,-7.640122093331789,-14.56935190766402,-34.14318474820206,-40.6020460470149,-13.470079265637327,-6.102085793916906,-30.731834737036348,-13.469999216037344,-40.42453420205877,-5.39415409420524,-21.907134399518867,-13.753924384167725,-4.231484554749217,-20.005469863145834,-42.381656431474255,-10.444264996159077,-25.393363385323678,-5.379634139946838,-22.33994484853211,-71.44392338957357,-24.500231523572296,-16.231435717954835,-13.369288487256032,-12.750265691588377,-10.906476714118487,-15.722035053044621,-8.076484781633482,-8.559327601462797,-13.380268521196768,-8.978302402696938,-7.661975819765536,-10.064730379255867,-35.995875752520206,-15.242411135385487,-52.20383641184507,-5.401008948086232,-39.1832966758649,-3.6220598579611623,-26.232111950202604,-58.234534439315425,-40.17831577595959,-41.183645801011686,-20.631687649065984,-33.22481620979708,-17.84331841074613,-4.351225328812158,-32.14501812197373,-5.561197610446244,-14.532703857466146,-12.950949139239553,-13.710336048885468,-45.80681771885283,-32.68431037302917,-5.182276640876384,-5.413969928179848,-21.598880287561194,-69.50766528646378,-5.9829789897045655,-53.7448150232401,-8.763954487884776,-12.627879149220282,-72.86561854928848,-15.948855236429239,-4.5045403555129315,-10.822208839023384,-6.288583076802175,-49.292946305053285,-32.3555240968408,-10.259793069474492,-4.660198415931695,-15.40864793619445,-7.373244293660504,-36.501475144031716,-25.713070668989726,-12.183602910939632,-12.431891973607604,-35.89493397450285,-20.398618422640272,-22.217699325857563,-46.8354034805104,-19.265616127121948,-8.95075184614949,-14.775947651626641,-83.76591349215953,-25.042981577385817,-6.937389278638104,-30.79956036142664,-85.4801311584784,-52.016766912347215,-44.16563894169119,-11.108947973782591,-5.345376334073897,-44.990579473228074,-9.855903057617228,-16.956936692930366,-9.311691042196609,-15.646278179700312,-33.90648532330083,-5.370554284016492,-5.568783903189391,-30.209108953506547,-20.573284326372676,-22.39907563033318,-63.601334414058805,-43.46554463229263,-25.15825019826457,-52.187261073200034,-66.79448125083933,-7.566859878710845,-34.28592395654216,-12.03838076884609,-17.097682326530784,-7.214998030993321,-22.05004896354978,-28.085148242997803,-28.17726941000717,-33.50060785573977,-27.946114658694604,-4.666415786365443,-33.33031442816642,-23.108772709844235,-18.790104714227528,-47.63853117580187,-22.908123674915036,-22.007860914470783,-25.714307556865926,-23.095729067289902,-6.540999184220045,-33.22006720230516,-8.298977751650574,-4.461703497237865,-10.070187971012906,-32.848922136086095,-9.253531653146776,-30.654992481989424,-20.262359151021215,-4.838851058964089,-24.923509054569053,-23.371469597442715,-8.469025366337817,-26.942561722870956,-12.186811735992329,-8.235797583996304,-9.949526453743573,-15.146710339100265,-17.515785283480167,-5.463760971941921,-31.56871033829245,-42.89175393753517,-62.600197554122474,-53.11829676976063,-30.314103412064597,-10.158879877804631,-24.941317883530314,-40.63013768789369,-8.474675611301949,-7.049796120671682,-17.851307456381107,-26.361756401772972,-45.6683358638102,-18.79041443914848,-62.718778949507644,-11.502009197570457,-6.860078058875265,-36.48885628480674,-13.626343881542095,-12.358243159103015,-42.09269833871827,-37.59206952314314,-9.262297876490655,-35.910034979126486,-5.429343337069386,-26.05726738595915,-26.991513853382298,-18.5058309110817,-25.006319606544412,-5.676113157191762,-54.82124734490177,-26.60598951358289,-8.879849624127754,-38.622424558185166,-52.18354678582887,-7.176888577475078,-37.97021697879604,-49.66414397820944,-37.674544891479954,-11.322927029143447,-19.685443117566702,-13.11541335503467,-44.8751273221403,-5.22043962639471,-36.88882932790289,-7.660879089635025,-25.402674449411975,-32.45835452411991,-32.237491960043734,-33.29058989977951,-4.767889283056194,-37.011240585480685,-5.511210478535626,-26.862395148695203,-87.53430865938412,-28.011205203345,-50.49650659691824,-40.415005377809734,-18.488696076956135,-41.56099328257218,-28.07271935154773,-15.69605685437893,-22.466366662351987,-44.14420525742404,-60.55348015215432],"alpha":[7.945624159724662,12.745961223730484,1.2134673274224772,16.19622309592764,0.818260044340553,4.030930427414932,17.567251437066844,16.430273512913285,16.40485973423768,11.789136924721664,12.492189531807032,9.824981784943283,11.237668508751234,10.979361720049958,3.2579528206569863,11.776503694989518,18.51481946781174,15.216601780422806,6.001573012305066,1.2116977221791503,9.400464018126415,6.105016568652211,15.836568762321019,0.08313019529606613,14.701177307941812,0.44801865090291493,10.658845686283742,12.84392848280335,1.0860804988498485,6.269051293328949,19.59821825543299,2.461526429958023,17.9396079566162,18.777416514723058,0.6178229655446543,10.213380462842645,2.150109949232597,2.210990318828423,19.89272454110981,0.7441173704818205,4.790210493665792,19.296239744397802,3.1946702591241483,9.50138670378934,10.082083515165682,13.193186968123198,18.22370374542576,15.387824134531547,6.942270087226219,10.317601271045005,13.150813444726053,13.527491722339251,6.600127845824368,15.801371210124092,10.56897708200136,10.503508276836243,2.203329347913825,17.65403165376959,8.223629994723783,3.4539136035502915,19.312134779221033,18.674945265170603,13.633999928457325,17.712191513493426,13.830111143690193,7.948866146675444,17.979351585327237,15.125502164187154,8.490268767316845,13.82017081542729,8.967097664591845,5.90743386738541,12.16297798181657,0.8123557822144889,7.020447151076645,15.3707004527846,17.345867576734552,9.556342288925288,1.4469605677674124,17.47313215379322,19.88832847316666,15.543096651704893,6.623108984039234,19.383826692320287,5.970837943811791,3.5332385823086865,4.797933119772013,3.052389019156214,16.02044118397311,0.6012769336514312,18.217007881764573,6.201817475847826,5.157588374147775,5.467136639680126,13.635678639105722,19.085396428204653,13.31040530708728,10.327437424227464,8.468979802975856,15.601916980594046,16.31666191538192,5.812550960578657,17.088799876668965,2.594745691068514,15.222629101090014,6.458454893902474,16.408030064592346,11.599829311459242,16.556802429528155,16.156487059135745,8.012008461718526,8.306957354678204,10.164380217418255,6.00590744814538,15.501008075419387,8.859086555195471,17.264894535855426,19.10548496850204,15.337833491731946,5.0975273950576705,4.214937900711733,16.404820882915196,6.8770343280335,4.494002345692847,11.527843277766149,10.418958011668327,9.202492197256188,9.908049891392757,19.259989941738162,16.554151891817497,0.9463547202610956,19.665689296439126,4.928019233967227,13.525554544187845,8.074765212469615,6.362610554564627,8.399792547318444,9.024156873414807,14.969660485160805,2.275580819582923,16.524965779530923,11.894985994269692,9.818223231793608,8.032251485303252,5.180154062683515,14.636908164380497,0.9288385459725657,10.497578603261463,15.151473709461548,4.546284465589192,17.996369933414307,17.093693551355166,13.819240673990674,2.4516346525194432,9.463415672799837,8.434071907057596,14.36839143048607,4.192450276732864,14.880388059078221,18.552684429173784,11.281873934988127,2.523745050185595,14.393701789283003,12.228651514361255,5.790759955683806,6.0210124882276705,11.995515376107786,5.55462399896411,16.557499033012387,14.41581765269509,8.189070491668783,17.453202729090243,5.7598171008943755,16.99630356250314,1.6831234640978154,15.281273250760051,1.4602188257142679,5.060170504387846,4.149876875994143,7.2691017454701345,17.284029984526317,2.4124253496654235,3.945913631856186,13.00048151313213,17.588399474332896,2.757615907112485,17.445053143745426,2.2832744986483755,14.343193291927697,14.459894534703768,16.90790424962252,8.283367974960335,5.914145263439852,7.13252794630288,8.521498015091677,1.1006787901948512,7.6959854877123135,4.420618585481915,2.294094942528644,8.704451401123947,7.301778905224112,6.749285158895115,14.181332347122563,12.529762336157662,4.742162867629576,19.480036965708617,14.47555929437733,15.871037586210486,10.247768149908577,10.935177470745469,9.602701174763638,7.215121312750963,5.401856362428634,0.30156569834188574,12.81025689091036,14.413743726547047,18.47449559005056,2.017281966090705,10.192744673088647,3.7686353198735656,12.19811724412649,11.991822980825976,18.081573104872582,16.918021134543988,19.51936253253821,5.628702514538881,11.652290678418012,4.927239512404182,11.117817790761224,12.150727091237723,2.321558031077897,5.0039341254015435,14.7495554923495,16.803369030000116,4.334983240615968,17.17256142932708,6.174541480450535,5.395137856616001,6.365016245646018,5.127438578022407,11.76193490903282,9.360879587983817,18.812329912166646,6.239954663940246,1.5059469850682694,11.546723529572578,8.932037195618058,12.28968486904475,17.973141095141465,10.474985660078747,14.546453874240633,4.556805303138107,11.847434459182168,19.504341949419953,16.38983841492327,4.281117655580129,16.952212572025097,12.928680109247752,3.3168375531109495,5.071224997168642,14.3524751494758,14.857531016116997,12.554803023543538,3.17694221987737,10.591024365292006,0.22140951664639363,4.644658504404027,7.554939406969083,15.180100586224317,7.356119422893768,2.751747876482886,14.207951774460916,1.8439570819956685,7.152701108644779,14.03736224861666,12.085686599885683,14.470818692423336,9.800318269829585,5.27238466390747,4.395073950659598,11.87189947006095,6.462093804407183,6.842903456142042,9.195016699154648,0.5021524912375552,2.9494517206049853,14.378514641463664,2.413192511962925,9.196377985781039,8.492458979865054,11.343784025555163,6.416007537725212,12.508984272695205,19.005251894419168,6.769842124303653,18.908475963405508,13.581743919480633,10.56551294224095,5.134635461444317,13.098087643893145,15.23867973872171,1.8025477299826376,17.62909548486438,15.846171397096711,18.08839371482433,9.447735411117932,17.079001949598243,4.027899853523076,15.624646154315428,2.6746909591914836,4.724239479014067,12.539291759766984,2.317860663069644,17.996676454880273,19.31000031611166,15.958655759024762,14.258280955615806,13.053069051883552,9.284653573538684,15.98870872257125,19.366819016645927,1.3675291024116198,4.264929103984163,5.141375515946955,5.424906884057941,12.305523675941776,10.671702564759444,7.417731907010077,16.203976504282277,0.3328722177224508,4.569310167719358,6.363480458886022,2.930224008259432,13.639897343947286,5.017581459355753,8.57831288974574,17.207611499531602,7.078643895703753,9.87448965552677,0.4178105040247049,16.044532819642797,6.329555447366553,15.473481035563852,4.186490470023556,3.416145739320049,10.62903830788025,7.900398149839845,12.844785504315146,16.058391629337926,12.477444813201322,8.759039158861661,19.285861461275925,5.667470038413063,16.533088891886905,18.912046198860125,8.139754609170904,19.86417618518776,13.973906789530716,17.11179116005942,4.560444266128818,9.682629319434577,15.080804416727108,10.852220748354053,10.080868207823489,8.677539365161305,2.679839900722687,3.8263641505302104,10.813451404543382,18.80646355578195,8.914322755982681,11.389487515607861,0.9643458940671046,12.812016471214754,13.660058179092825,9.538156713425971,6.050055799978149,14.772700828189977,0.3125379314172205,8.429272806725297,9.166764407587804,4.755532573398686,12.417746020700328,0.6222993669199672,8.268577604807756,18.240876939179888,14.752111441037457,3.4575301320613683,11.576429262559333,0.010419412334852218,17.943741821434255,15.9186981986036,6.433481262491121,8.376708617769077,7.990126050244202,5.113630911813085,12.789992054325063,13.406056131655708,7.500702148847527,3.4008921834498063,16.601324783623127,4.83825436335477,17.741689598008556,5.606685749605234,11.80233390837277,0.5159139587013639,15.832053332505836,18.827139955131326,18.49191273256678,7.512224239656544,5.975837739429428,6.49013544470912,10.132107394055648,4.375499767341808,13.563661173425793,1.3423547746096887,6.837245011819277,19.32780007929019,1.9503488111710299,16.788041052980837,17.18423929252955,0.7549716524203864,16.85346841172819,0.001043040513613036,4.4463431677779885,15.797373157403234,9.700280288216042,5.688853313299855,3.9485471532384153,16.000404941198774,9.36532073596728,13.079055664799299,16.29382563246049,3.8626822595647603,3.740046293881316,13.647078498437203,5.944706002278508,6.377310832317766,6.056653867514523,16.841606881025115,6.3008727792471575,8.780633662118035,8.033446259445602,16.946530347822314,1.6099311214069312,1.4161631258721563,17.533815882310204,6.171114600210994,2.5720690670649393,5.988302468066604,13.569972470547942,2.357602322948509,13.114123368502684,14.493899383781876,17.032314299021138,4.1096105234735925,1.9249637397424735,5.465146691574705,7.993379752353964,10.588278268543894,14.391284316662594,9.200118004003311,8.337887380974172,11.515077889967099,4.2984924707308725,8.33680636780596,6.387899021970163,10.896558312027377,18.526761728873304,6.154046715361576,11.584686463666301,16.303750778926364,7.422879868336412,9.144357831946612,18.797262587797817,4.45383927552244,15.87998438768443,16.622241718904135,19.20873145243595,19.304686367513074,14.968906556418414,19.06902711441088,10.88301287039284,3.9563139793529523,13.842987743785123,5.05788991937516,11.061410939830454,0.47337995898001584,16.724677456505482,10.44682697151725,2.7749398516660406,6.303336932074326,13.8975804860608,5.68739765051923,18.47214616680841,9.93692287601407,7.956419383174862,8.984014387440219,17.581478213485425,8.850700355015327,6.308709096729324,0.5819354970989066,4.553619822313997,16.174253185218927,9.21451057052684,2.2159308416224066,8.676822255708556,9.466681967437026,14.10889675471294,6.521539083767607,9.428312380080781,2.359298586187082,18.93933944953985,5.634559639657213,9.73109577211062,11.05582556766603,10.828908155827722,1.081667074409971,14.5042723880101,18.883875149809143,12.80952706975523,16.52814252807213,6.286039529885161,15.09967447205701,19.449900641646053,10.903671612735323,19.308847030757153,0.5307702772289824,19.77218060274048,13.10528981042026,18.774193994127167,11.166957783862067,10.604890943956523,13.243967950809514,7.42153665440576,1.7115156448018531,5.851678157049616,17.277911568511144,17.567776808677014,4.106791951812299,5.781966349109129,12.889814637757112,16.000768000888183,6.888750073518164,12.713845337158522,19.50308464516656,17.962107184995872,16.37421335670448,12.912794882131578,12.813430126573607,7.979733707430903,14.216416955079065,10.83705667254717,8.728526546384273,5.857585035805215,13.24658745625638,10.629078020444801,1.5637107383179583,10.921186348729691,11.070045111935372,8.773174349782881,5.038991343994508,8.796054693018567,10.603611482168454,3.6344649017580544,8.842360027662659,18.889782393218184,9.976119809569708,12.714688989260662,4.6811784644130805,8.337893407695006,7.799713759476892,13.046553823495337,11.570794464333446,2.2667037226284448,17.760889756550434,8.219146968069548,3.187574129581874,18.827857108971774,19.112030796410316,2.7141928208447297,9.656216192521176,14.488644123293891,6.017660791406825,10.547589962542467,12.435949741787308,4.247700036650581,12.87550482314197,14.015321505940982,7.924819030833556,9.199648096442514,16.647161464837307,9.702001666395997,10.646162267842257,11.690643300539794,10.418537110558418,4.0692448967220285,9.821289302456506,2.433690898591623,7.1069490155287385,13.523787874259202,16.935976349171405,18.9322833789306,17.764790371540634,8.177972523487131,14.111241779719496,12.495023105707412,3.823386658967598,18.793071759116877,15.377860016787036,11.061511051463185,1.958834259748925,13.962373444877851,15.754547068210742,11.034952911333459,15.576046905009257,6.7161380490306355,10.807761037135965,11.835283114140157,16.77160825539293,8.409467345252635,8.46298346991289,7.4685778034519235,6.703157992223785,8.747791884331765,10.284227136623336,10.854315241929683,17.20486950723467,19.800084875665192,19.652035470787162,19.67136434988122,2.295307301474443,4.133200877140255,12.318838272819143,9.980992614211846,2.0548752920335467,3.7310285420789935,11.610412107352133,6.915426654652812,13.403445557351734,5.5580716873594005,8.244598710680226,5.962636130897989,8.069401347487265,18.343509149494153,19.19508612680862,7.993019528133645,8.380182805331188,5.408643357095997,7.053467093059953,2.5225556686636708,9.246695060179277,15.505874096369311,17.337801521272567,9.610969379968598,17.679769573057765,18.1638701561199,5.435867286275098,5.4216131575050985,10.664866466128382,9.93770999769156,19.302664814689518,10.882494299890414,12.13627616205101,5.198303035968306,14.887906316269621,4.863602663528832,17.07075472078119,5.361948856011489,11.713093832147074,0.8691016920770611,4.086849270915396,19.11169868657999,0.12608939556926657,15.549242694118256,6.728182647210108,8.75479584442954,14.661937748349692,3.3318063771421658,4.2206521064945735,6.327904915755256,17.67073400960587,0.1772739481122665,0.3279574122085416,1.1423731006593263,6.163732416487231,19.418305214791516,16.733128534525918,0.893955147861174,15.835457526290849,3.04970075652629,17.403030378823065,9.739589383232481,8.102145929591247,7.9010102694590545,19.92287001172428,10.688968083191046,2.29757499057774,4.746279237409183,14.815935093442558,16.29315680700625,16.053058009123706,16.479487457739232,18.451679111604882,5.924444714137165,0.1870840387507089,4.605626352937833,8.867549071051739,11.207929274006299,4.187988874566062,6.0234217973192195,8.873686202934055,15.868434426690627,5.292236044441148,13.59163117985255,0.6333255924719117,12.849750819894075,5.331282450077728,11.768232862697747,5.954567524973551,4.719120994365387,0.8061588532082453,12.10239446054604,10.935682571036441,5.543222989412628,12.086967675852268,10.132239623342198,19.352879098066524,13.600699140859366,5.164820082745072,7.107116667930349,3.99573051080766,19.20541770177848,6.014587818853472,0.9851497582070934,17.25771338627137,1.2053588531244097,10.379971053995867,7.2216925228591355,11.118781358714944,14.105001190516028,10.66903844002502,9.129722650044062,8.525715393282844,17.804801429898546,2.23489744419866,18.26801613616145,10.791634722641623,9.382721754995757,7.887912815606857,5.297244323923507,8.91534034316047,1.7126406179796616,19.76199311206322,3.295168204962895,12.11775264805873,16.691876523146775,14.232356004034141,1.3300617079832877,13.457625382429192,0.2812074261140074,16.55058452206587,3.1748731265993246,9.912434538546142,7.872978727444466,14.794596615354152,6.550960894809652,0.37953914756018836,3.966035972505968,4.285613467603899,12.751336178521285,5.746096490368191,5.036303977557006,0.23080080127910296,12.084729747125365,1.1681617238237818,11.694349637602258,11.09094966820284,7.069636614431127,5.6029029312167955,16.399519631254982,6.622732757405783,5.263738219651679,2.315158822067618,13.707070901510363,3.769854720456318,3.4376680970062656,12.143934842076284,5.839413178740003,4.345311825392288,3.99202480547153,19.94003390180793,11.46451321220637,6.797909480723381,2.462273324098745,10.493932808571117,4.630531953034911,11.689780009554923,0.23074056151203948,5.305381871414161,12.142463094225109,0.3960256432570075,6.554659519760162,19.308508313060383,6.198050335996821,13.031967822251689,2.984882147578789,7.607053769341139,17.955386274235657,14.437725793540626,6.361701235575694,6.041600688391213,13.801303529448381,4.114059906823675,11.52419453793081,5.730598868176489,2.789639893761575,6.978643313257908,3.3000360449333765,3.80575202431221,1.6389373872439528,18.79945507207382,7.791092425063164,18.65072437533733,3.7493873523870835,14.413745572154921,0.4600037148664393,12.884157995600614,14.355588593952993,14.386849107484219,13.076912711642974,8.65150889658774,19.787884552243945,10.361793170107774,0.5757486353136221,15.104529669451638,1.8741327058983748,12.350380079485701,4.78696586201611,5.314647520033486,18.866971719451637,15.105413642690358,1.9127797500305022,2.221981853649795,7.876662947256778,13.300987737713195,3.4749859866864963,19.55961615187718,2.7757824317981594,4.122839803992542,19.683429914593155,10.8666800455741,1.8090837796118286,3.7585238476972638,2.2830017469094166,19.45476981718134,5.284588806795654,6.207413445705026,2.0141372555947834,7.328464680949787,3.297870698935159,12.743443107412187,15.984676591754884,4.503252139765999,5.7930267313139305,16.84640297418083,8.78072161671506,8.264643091801807,15.096119721461307,6.002287324553954,0.0017778816745428472,7.000981742388954,17.93189282403448,15.795184412958188,1.45705075523062,11.43866985459777,18.171547717089112,11.937531934049922,10.032230273109741,4.612092865785407,1.9139426401191661,14.977300916744248,4.132994131594336,6.523176733117126,3.227393185643397,9.811113875450385,17.82066075768856,1.421653220337462,2.6231924837098974,10.55296063012241,3.6101753314849283,13.899698821670654,19.23765531245772,12.59281680950323,7.864256163649661,18.01588626421445,16.110857549924525,1.9249744145447334,14.486482045540336,3.749799839651109,8.264927421845814,2.9040831671672684,15.378951179675923,12.33216777987765,12.99063277070291,12.983659066529412,18.422949465068466,1.1952141961040796,15.37983481424028,13.431584314569092,13.518994864842409,16.938344292711914,11.516195781303121,8.731938353537165,13.540504731321942,8.329773519176618,1.966510454295216,11.992978542342044,2.3194582215991133,0.7967984537697292,5.899534291527977,11.019929484445981,6.56208775538055,15.160315188200988,6.122294070957146,0.3059048383986962,15.509065923026682,8.429846251830234,4.621863732842075,19.923841851675483,6.716220063403169,3.2301957555965632,2.050112144946552,7.204833257319692,7.868327976846872,0.13510543110275552,11.325082460302124,18.736095243954402,18.87711862450097,16.2389020361274,11.437073543966392,2.6264241445630265,10.040315917281774,18.99266361279225,3.17862284519828,1.8057296647584398,6.756403319294342,12.474738746863823,19.8274063860562,12.298239152699075,14.656223059617087,6.108446661319786,5.6853818175012805,12.383542774545312,4.513776129888525,3.8623026032124574,10.264401691975266,11.711184216711313,7.2212557865916605,19.030934682319494,1.2419986450237719,10.752828418147637,12.0959297194225,9.085890446048804,6.185396130617842,2.5186862863216586,16.900866494362955,15.462932504180419,6.6290238971192395,13.040252116527423,17.691016606265308,6.910620855663332,17.522380257900814,13.353683218637823,15.188791379696776,3.834661775423296,12.47823606327302,5.101520218978162,15.700883195538996,0.13914315327186788,18.553307360277024,2.219727015247166,13.250409893065488,17.6448251440181,12.300190408457112,9.918885125352727,0.23102955323140772,19.26714537856595,3.530601319774136,6.8571321390944195,12.435587283119709,16.71149117444337,18.263640522049037,17.241808521196475,8.319680115297224,18.706712789343246,10.86730269572644,7.617496065123777,14.236985806589768,11.074705080886478,16.552519702089334],"x":[10.105441876271277,5.201563505238518,11.9999543345265,11.231777357323613,14.900221563230128,9.801907784860083,13.567119230459209,13.912516050907273,14.982547477948422,14.824038734452497,6.220379447911895,5.995212049881018,12.532310641454366,7.002490768419769,12.404967253823589,10.619716904680718,6.740437417531984,12.777408765641049,9.643739187725199,10.225361861367366,12.852911420100256,11.279625281328467,5.342685876493089,7.4493058610748575,10.831789841607574,6.8427257319733155,12.056094419760077,11.819235165146075,6.481893486294266,11.763078445758229,9.82268246938492,14.388400795710186,6.295467964999171,9.512951993570283,7.1282526202090235,8.063712970797628,9.023274846439556,10.41823518078174,7.334069532235943,8.55907836963397,14.984446906245722,9.870614349013744,8.359745545811425,12.171106405760288,9.25272162290198,5.729317865431995,14.993068728443175,5.387710952609821,6.826298931669772,11.303161067137257,11.626893757634583,12.395687025683308,11.297415035706164,8.005176060887981,9.994022873536268,6.704174319017335,8.733553182984828,13.74738877434855,8.527410138408708,10.204157592559813,14.492592330901088,11.807143482917315,12.566296147530007,11.053952717710748,10.66245254708807,13.279303872955593,9.447680272354052,6.809277060652419,6.116943248597395,11.849903671497259,13.032458529034056,5.687902909147744,12.425639071171702,12.121506022741356,5.488710287573728,12.010136086251189,12.986857865040237,11.683021712126587,11.03742718784855,5.206208265728172,9.687436434571401,12.056251108855278,5.4526485632933746,10.64950372791702,12.094571410740464,5.664168271727002,7.280490959138353,5.946545856548109,9.376756389569579,8.039082198047138,9.11985494869944,8.45224510871821,14.256647792482376,12.95354469930768,10.202542940077288,9.968417216008085,12.071020543618626,13.603920744589226,5.7128204526668185,13.530581055636713,14.810540180507417,8.798785560497128,12.270368418832355,12.647195357225021,6.1177871425632135,7.4074489971784585,14.173724465606785,13.977668369229107,5.650431641267229,14.146230625085428,9.167977598464052,13.551884326870551,7.693844361657371,6.110832078183142,14.55727553275918,6.292306579533986,11.067701324859467,6.380103808022293,6.461782723100344,6.043037221978544,9.332093859181363,13.877197385328763,7.896084004687747,13.5303207474232,9.12131555119486,14.865923936847176,5.120630544044216,13.047626773146273,14.931105105335945,13.804521047861545,14.523415889700201,7.686342844606624,5.236013740004799,5.526103444121735,5.570164500177133,6.247438437001065,10.48394951602478,10.810339945057423,6.774584486829935,11.881740160122757,14.435658047057116,11.712411082938557,8.019921335706199,11.598951602533118,5.9940374799727225,6.432028540937109,6.121728623555653,7.452458614278433,14.688509244679684,13.897137029380431,14.704400988243103,14.887168868433246,7.300899522331534,12.459170234856282,5.093893902152995,11.027410737225203,12.618472676705403,13.180145810156482,6.854515729596544,13.75570138807616,10.700208719060281,5.899816265685907,14.237369923422223,10.772024835881233,14.366212202000666,13.615705161836305,7.730944846257463,13.681293332646046,6.190859518899994,10.209657770029333,14.74796301009343,6.143368565937369,6.442525835590704,7.740260319645484,10.593225496125452,9.555495313535257,7.792857015736859,6.601007748856073,12.07045475844821,13.129902846485766,13.595653217783095,14.485002004189528,7.239498527806411,13.851301262547771,7.073006637347858,10.062631352996714,10.775518642922417,7.581529921790102,12.637590859923588,12.961557404770739,5.378182133717548,7.392010418024267,8.216655380982836,12.565207702212673,11.98330830224438,10.801298393070892,9.150875018001013,14.769695715714189,13.56810996824697,13.845997934170057,5.308265203982483,9.775369184903868,8.793684437092416,7.789021126772879,12.663923020128058,12.046338676845146,5.520469136562807,11.814246692955967,6.5468129370585775,7.422244778058371,12.095172910430051,9.983477207854023,6.912106659912467,6.897504825997645,14.039584649319002,6.440961140013377,12.156764601834473,14.509039595148787,5.162528357363938,14.57623261908941,7.754368232043403,8.735633975496636,10.313930134738056,6.0661990849806475,8.663666421078531,9.780006728667448,9.041148697393462,7.206350670116359,5.896151672247239,8.65231602826733,5.308258432261912,8.81505499966217,11.332374320588174,8.420383881965366,8.668141098819284,13.27953103818733,13.577028359567564,12.784871066369892,11.281443372020304,6.136554946857515,12.91899803309131,6.346476753527348,14.403554106161875,10.560144269815561,8.477685509789456,12.559712694250596,14.200565207460743,9.163772943445284,11.887318883026442,12.693757231665613,12.325293145346702,8.46686449009338,10.017837297000563,5.7127336662155415,10.809981192495457,8.989366030090553,9.731383305963227,7.337113728158114,6.027285129990552,10.059665562736274,9.467065112221986,9.607270109342835,7.839610531467846,12.153172323585999,12.228695120126991,8.769343657646306,10.614914488165253,5.944847489891199,11.697937077568412,10.530000765648712,12.65827346510794,10.92499754891605,9.821862509537052,12.326663521545335,10.862946801074516,5.718858207984185,6.239110865140134,12.048656082359855,12.072766431858852,7.7836229742642775,10.793061285405454,9.989103424046489,9.782304320010516,12.171632335347537,12.77963223685678,11.350958178245543,10.207442521481894,14.194026575864898,5.876933761482905,14.624672099801213,13.29977659015639,14.849693450373833,14.020459435711597,9.31691055274668,12.7537330882564,11.467995632885808,8.27113076754624,5.502516469183227,6.8236980896715105,13.039459989242692,9.44115386021883,6.440912211763356,13.735396225343626,6.087554128233363,14.045100788543152,14.924210835297739,14.462451276850345,12.627064230238851,12.406730094114902,14.57104227261933,11.806207723782665,10.892142058419747,8.30379304787931,12.373038555194618,12.029255998867786,13.520810124585898,8.634764787895987,6.588637388714389,14.793862913401414,6.1996001101479,5.856597587521096,8.416072372952183,9.967885618297634,11.016240720557452,12.248965436193162,12.848209461738696,10.877094376991788,14.050069257223686,14.2448745862295,9.874832611633128,13.476015349006529,9.729979659949453,12.165697070614392,7.620781273497091,14.227356029054265,14.789884082715957,6.8507551548305194,13.233140293750385,12.449967187459068,10.391907045735024,13.308866541197022,10.742383625038748,11.425926186573985,10.935817651621191,5.1581865241725104,8.753964345496893,6.372165473266902,13.768363692314125,7.61978918240898,12.900506211739948,7.240424605964579,9.908426373044424,10.823409321028661,5.731111970934252,14.493299870008716,10.34620337312604,13.411838928173342,6.129091777189901,8.217868769693224,10.35777940661098,12.893509400091208,10.30624736590825,8.456581785898942,9.811174843841748,11.262102065950195,8.789355443898554,13.943727772925126,13.881356722409974,7.848601773944404,9.675578914910933,7.974512952437904,9.44019881557476,5.13156503618867,9.621626504586441,5.746038191569733,10.783336300957458,12.51360800875053,13.6808319576303,10.549144587848104,11.454592627665397,7.03818535239094,13.72896559177814,14.875827260488707,13.042957677422432,13.430217929267869,7.6876430891063885,13.040221761912127,5.209318553406295,9.401032588339785,13.189117616579145,13.283717199871443,9.0291520413337,7.872441625332771,5.0764308792451445,12.370528392621088,7.659205166059337,5.386537549786652,7.60833614314715,9.352903605751798,13.430138151679733,12.173918173221388,6.942800772170255,6.582962805790067,7.53525878789538,8.817438105337969,11.493168614358773,5.607984003278299,9.216874801513077,14.659558662607104,8.644519223127343,10.667182643374819,8.278278917895808,6.702083424291445,10.335396457825803,12.43991699894643,10.196794281079487,11.256951998387578,13.049956621774925,10.934082692632757,8.723013840704832,13.986409867880305,6.195073627775399,6.785620628628841,11.510718220961476,6.9181499083717135,6.38465336820275,5.339127955666796,13.000909719028877,14.691414518203228,12.181215705824624,14.180016995029591,13.751530015656115,12.73583427162373,5.701260127483554,9.928669055364596,5.213225962685273,8.111812852795357,11.601560665639198,10.725037641208505,6.872184795748952,5.646839817720235,11.610615416788821,10.88529979877222,8.985333351974669,11.652246567272835,9.068607437575821,7.625712690564825,10.07726623628004,11.770886734760888,6.824408402829172,8.610569018946592,7.73438826355509,8.770233190721227,7.215454702115675,9.034132364618529,10.570851966173096,9.031982966805588,13.92455731056794,13.34181520046849,9.390326397408815,13.857991122988349,6.969724640010622,6.603337598700396,10.033794105295266,5.981247823313822,11.624702012026425,6.231495887581378,11.49288939009962,14.095739095377951,12.767576624824379,10.424722258357813,9.68387382163228,5.705944986130406,14.32915256662575,11.268931594093816,6.515406629585192,7.319418579055064,13.207850538772842,6.1671791086297105,11.105074330568494,13.098166881169593,13.741615429982652,10.017883967517358,14.943443303857846,14.497970497758612,6.507766333456244,14.234838072779672,10.565556486178343,11.25309474999396,9.691566802517894,12.683875152010277,10.620315027704523,10.159730052676892,7.904697839541052,8.284286425278484,12.963856500886164,13.958278622821664,10.755388826086886,6.497113808527093,10.343768212144571,7.468969616870469,14.38726563480863,6.3718167052222086,6.352947409704958,10.615979181065374,13.983166999697477,12.620064691555104,13.854259642624893,5.496782694699012,11.268106281919529,8.070096782195186,14.675939787512444,5.833604248347339,8.107599138516745,6.400323091686479,13.73557508407817,10.33958897191292,6.615323737949388,8.534211141267399,8.273331990611783,14.147906361339807,5.000340896267232,6.211747914966863,13.614867925984687,5.634319206938974,8.954933005044614,12.14905507110579,13.168289757240492,12.51720794209069,12.139204668718328,5.27290364195673,8.02294670979484,11.197441822613577,10.748975431153525,11.564976743359903,7.247621947790424,13.862267812671469,9.264855196661046,7.935845008229403,10.055894833579394,9.10764221783327,11.977494167832369,7.105080121409621,10.870610452308158,7.533849185249646,7.1015189644853844,13.998313062869478,5.483732454038854,13.993702406821328,5.648340496863355,5.114526174480978,13.498047667750422,9.760651785107875,14.549421921378041,10.206013493157633,13.807904415005483,8.599309294622746,8.16540172460741,11.080086604903856,10.44917401131838,13.402202762816035,9.750080578018224,13.254698448644346,14.866917108436473,13.38202995193187,5.812613265696651,14.763637121799448,13.882091562152791,14.992048795739844,5.711381360818766,8.42295595838048,9.82133794439276,5.160122072069107,9.370116414309555,14.056844516251385,14.392931746805322,8.644805776477217,6.008172735898856,5.435653843201078,13.461143829343929,10.259671251977151,6.621083174888649,11.161574109053504,14.646074316682927,11.808863949846284,10.91870550654363,12.066611407435877,11.10572159786178,10.755404301510508,5.727604697260293,11.719527946212363,5.0535755844898915,7.6559652261210225,12.687093043654773,8.070339566651121,8.31223713542515,8.575608663659175,6.802810703036972,11.738878190682831,7.219066531867124,14.6109058501747,5.6337364038986415,12.886019361597544,6.282942509693992,13.366500211371537,9.550381114065837,8.375892277187841,13.318012295742124,10.827481601590236,13.867221643807369,14.280561384061812,6.3391631435466955,7.320732516541342,13.493994184907923,14.667507814407198,6.886993606399868,9.186347169743865,13.161477316178233,14.973315393499412,11.241187316255123,8.503670071733753,11.813846634669588,11.876193989419892,7.085720085168267,9.72150440449428,11.22021765113474,6.459328546404793,12.207539948085554,9.674087472252449,7.530448466649733,5.780238654482601,6.704151145843693,10.184639004424165,7.293221115670574,10.687443099547888,12.446232541775633,9.888955503613417,6.7652500154858615,13.444351219781991,11.892915787479632,10.286534779324988,6.180907000918648,6.98247156770406,13.04472401078228,10.915570085257233,14.33892085163234,8.895621988934874,5.549067338807443,5.657617514589253,11.56895829601061,6.9941800200233795,9.185553431309906,14.256749373494447,6.743189431188144,10.379623845377061,10.085677851392209,7.174932586974386,6.156339188038316,5.942274392632642,5.192224940746176,6.5836402969883,11.259909791324114,10.413477124619162,6.608975793584446,14.210547589834091,12.629465799339146,8.56466850508544,8.29548361423073,9.383312086877538,10.622908500723893,11.740617159099145,10.409833977794857,10.263013594575018,13.684543680073817,10.0898830670011,13.95214566939189,13.922717071401067,11.694370396978183,8.058197317518651,10.542722285600888,5.619263620581208,6.338720619236929,6.194024647834762,10.990650468784333,5.275957780530769,8.490875336052454,12.589624877278647,10.211505976230091,13.395327734665294,5.281053420365112,10.816622187289198,5.044640890099739,12.335361720199003,12.127772870276534,7.520553869968611,8.330256968966157,6.642933690776394,10.156360656944479,9.842411598806889,14.173792142149402,6.5047854411320305,7.6265080444586175,8.350052919729807,8.779069865605937,7.103035446331873,13.138096529750833,9.958975911440305,7.744164212403115,5.45179642911916,12.775279762763734,9.33628860311071,14.464178844591615,9.320546414681061,5.436922703773011,13.817637738561627,7.4320331403503115,9.286313291180415,14.059768090004706,9.979708308137912,10.67579363894609,14.398520103732466,5.874151230281073,12.807076747401569,10.703177895536705,10.413680066584202,6.1752344459132384,10.270147265376227,6.613763020823516,5.040846033862774,6.957776480413973,5.156434758327189,14.009189843538614,10.890052648731249,14.347886566761453,9.532291607779975,8.452859259835625,12.477321987027562,9.346223795259013,12.701386411139193,8.880591628234173,13.909567381951396,9.895497692031032,7.207065965560739,7.744646762098881,11.733130310250576,12.492124413906751,11.660051266512717,6.534354890566611,6.441182403866097,13.212872122007342,11.431243514912044,11.144928591037766,7.9328341334227765,11.01236882837065,10.891271053643763,6.089878668459805,8.239479785209546,8.136975396345257,9.907373721264868,9.432331207244593,8.821681573820484,6.333328596253374,14.994157791313658,8.224740217049117,10.994838008188454,6.140893788941868,6.358623085199875,13.837399717613344,14.535263006418527,13.709047367892852,9.436205138649811,12.066152479107696,11.320697894382047,11.347707863403665,5.171714874168963,9.801011968616876,8.17512625915137,6.8779383023125025,10.309527444043232,10.403759527251724,6.982538657021342,7.642201830733136,10.937235792913317,7.813437992058825,5.7385811573640115,10.312830807027659,11.496491356133408,12.16439777979935,7.562607890481397,14.69541597407304,7.171759685874162,14.622464726549316,11.439860847113131,7.215564888499295,6.864533198356709,5.916598527330108,14.716956677181459,14.68021628811925,11.55590389840976,5.36900491173366,8.414350977369619,11.733426578879829,13.704740320800257,9.863273795018213,5.720186651686259,6.3486989657028285,10.475091820670233,12.630342118584473,8.363544901569542,10.999554358079962,7.733953096800423,5.238655225725532,7.472822830713557,6.206178251298782,7.005805466114953,6.087506170412209,12.079373433025392,11.689317585987038,9.743185975749007,5.756848170544242,11.207569660551151,7.5484795989113245,5.303718241642217,5.350420820283734,9.444201176312387,5.276458018375514,9.757691932258334,8.52125485769564,8.104930079338919,13.874445378687826,14.481913356582147,10.96310707230353,5.375968965438844,10.015351310632912,8.870769695352429,13.121988477192023,5.397959947140889,13.900409713887054,14.337071286995096,11.015923511513705,11.55666713596181,10.211824836522599,7.380725456409182,8.660229346583321,10.658598255505387,6.300490017644201,14.0537083131481,8.143606394357674,13.300411439182788,10.72852714321942,8.207637939591589,5.003781010154389,12.961150406848855,10.294812674677445,13.011245429130309,13.251451650292754,7.321346418219474,8.104410626238108,12.944601770326534,10.420876757836526,10.483768305391212,6.496368220897651,12.664253506899236,8.666922989275061,13.98316969367077,10.740528509723626,11.301582091172,14.595038860828538,14.130109362118633,5.045095781781647,14.36055505487053,11.251544712818038,8.551866961317478,8.08784745975996,10.113084383346738,5.538744039994679,8.549077918365803,12.17172029743293,5.655061918306754,9.487614899755673,13.159831193114131,11.446776409643835,13.091525778645059,11.997198635767045,5.528531454399108,12.513691946650052,8.720340496624125,7.825480896377652,13.137517078086358,7.816242601902362,8.432946634656682,14.364489117774573,10.304017763179745,10.499915838123934,10.095125350733053,11.430255425470886,13.586822355448296,6.338002939895002,13.637156740718105,7.9572602609123315,9.455265369644783,7.3342547087524945,8.069085363072974,13.548509023936347,5.8494457508661535,9.14356983889699,9.266593526186707,12.339405890427276,10.420067850081672,5.022852095683044,7.414844919471446,7.577342402990159,10.03396813377137,5.913570425145888,12.528843032669773,13.126699753179816,7.656350038422648,10.157617626428937,6.9534859705944925,7.9939691558455195,14.308118637546873,5.232553075196014,13.507058152505024,7.141860580311301,10.393373131615784,8.562525217515887,8.978373775141144,7.591034666960854,6.65858130075989,5.764461301172514,13.371447904174827,10.21112053979021,7.704882386275016,12.382298929744426,10.819089166663712,7.6342987357513925,8.288887155326474,8.83538141352124,13.051805311502548,10.266520806769964,14.401825713595848,13.954393968075705,12.678001932939875,11.476339505570639,10.013416099631861,14.964660475010305,10.971731659110533,9.944049861439403,6.371677709550571,12.738133904717802,6.261645078311946,5.838774594775145,10.345400887569918,14.280401706965325,5.812175774929642,11.482700134143345,8.26131657284236,7.047000023157239,6.837484452147022,10.57228323282293,11.304223627398411,13.113448553574054,13.17215249542858,10.273280215651939,7.644674146574486,14.103736763431844,11.008394309798312,5.657757119318174,13.53011025929483,10.981342998923758,5.261521157913716,11.363648888486397,8.70139962432679,9.878696879456479,5.919151211714753,5.9998659387378765,11.3361734987392,10.587061215694897,9.10658156344941,14.06492916366015,7.679935113719319,5.8706147008931175,5.333771484396994,5.20459837027071,5.397831156616128,9.152299707444522,10.248793304693544,5.27449804366201,13.415800980860848,7.3512011988906645,9.156808395641438,9.898477115673096,7.445618097507336,10.007664213880862,7.859526021377665,5.916110746754406,7.559105767633925,7.174382598968572,5.702279686696208,14.615507701046404],"s":[0.9117216706359472,1.783986128233122,0.22962253684015987,0.6814371128396282,0.4220561415779738,0.7256527591217767,0.3415470515817609,0.5457282766914822,0.6178508675413839,0.34390134843639064,0.5669527218699186,1.6144393912594879,1.0002769552388586,0.5762179505438794,1.2539077710854936,1.7969944512621163,1.8143423053660617,1.8691146188567123,1.229640078031979,1.338011915643491,0.6459317093546351,1.3167389147782047,1.8624482994796283,0.7411392717656748,1.236088224254329,0.24787687959955917,0.11705423641315615,1.4685117760262285,1.682225129704304,1.4507740034796264,1.4892325413594758,0.2727363357992445,0.5909503073052167,1.6452896786291875,0.2151253891016882,1.7399986551290478,1.4140802709346225,1.0935230825674056,0.9595429696297901,0.144429883766656,0.02111146692684196,0.8100522479216474,0.22364678546264471,0.7100270308042522,0.18666832807636702,0.10930296798668637,1.8095460963570105,1.9838926119317248,1.8256833651543354,1.1352549185247587,1.1808460874707536,0.04544788195940752,1.83614469271373,0.8967779246968375,0.09753501606749859,0.028045580777068757,1.4095417730676085,1.3653046807323541,0.7651102664794109,0.10122485429840689,0.7764319594128195,0.28625162970350004,1.4676689244949155,0.692300823168293,1.7886205059421045,0.7686624571587362,0.7600432811820053,0.7456546499404308,1.8999111432542182,0.13276187909687875,0.9966376863705739,1.8396624415635578,0.05340057930452291,0.8778925326857925,0.49321136673052246,1.6717857386070212,0.6008298037888817,1.3435337488511832,1.5701657050994018,0.9258169877925999,1.7801218825684204,1.6910489968987639,1.669430909497661,1.7591570936328873,1.4721015722486666,0.45415729347053846,0.5832051972286996,0.5824188540155713,0.6823818557104908,0.311509970664706,1.9402511611831303,0.2300925094908468,1.0215605737317643,1.688456021365206,1.450782311473156,0.5818173161712532,1.6198304300169646,1.0126604848568905,1.6662837651839375,1.597215993109843,1.0797724901161572,0.8661222054840882,1.306968764523626,1.0007629649104581,1.2064335049009447,0.0471009071182813,0.2593372469821582,0.616293777365442,0.782964184509682,1.6260356236291882,0.309729634381692,1.6954674787443582,0.5951991173561124,1.5259505697553584,0.6766840293639258,1.8357398133501062,0.90313718216371,1.4892523606050867,0.13901289310150933,0.4218067603757145,1.5818588331369936,1.5445995067411187,0.8510414986827395,0.43183135261913863,0.6689087592240894,1.7775875868534086,1.8363070897308345,0.5278549043523957,1.9091548054396283,0.675118093075592,0.7047635636468264,0.038255943930255665,0.395474942123506,1.0411251306966887,1.8956858440072084,1.4130689182381446,1.6196558636583895,0.7595226257754346,1.2620937891938784,1.4313778817694942,1.6957309330286492,0.37995758137177393,0.6106980509472506,0.4808781055518607,1.3440097390729662,0.19503055553385007,0.20798062856188082,0.18421021143494398,0.21370560446915254,0.7377523890720834,1.6779008255956929,0.8412726161701123,1.3956023689803687,0.5428452993948838,1.8835270425538089,1.0424951689089688,0.09872654895282995,0.18138503343309553,1.722138661088032,0.4043968503532005,0.020288661454541224,0.24959847065927487,1.6057713270553169,1.065398702360874,0.46968207890861047,0.5422961622787059,1.2168203629322236,0.4986580224853423,0.626602609780297,0.8338136099804019,0.14271346622890535,0.6168452747403368,1.4413022396242168,1.1790155841412608,0.09798295446465044,0.9677916455546125,1.1521411914179782,0.7010977600846724,0.6001743871209029,1.6553428894832796,1.239170999816971,1.1255280827576506,0.04673917622589219,0.8485100473179066,0.14298000318409798,0.6239732574299057,1.3281530072499717,0.9486561511302365,0.13956052462250668,0.8240212508943152,0.39738610524066864,1.4619357784971396,0.4285563705040456,1.760540498628413,0.23190182073519416,1.3919458794855313,0.8444861470118594,0.5565607754258557,1.5827116704816495,0.9484165051549658,1.7992406933090193,1.1360972798362043,1.092681730771326,0.3669410923125942,1.7161372448667298,1.475754183126536,1.402483885452428,1.7044526509611626,0.977491087465927,0.3781515609639876,0.7347809210218608,0.38821743679476794,0.17335255035862396,1.0067533408866098,0.07162187159197408,1.906196160099947,0.09025352419490718,1.8559373228858949,1.881901761565151,1.3866477348346389,1.5408287056449295,0.3515617661738757,0.5833838847615889,1.9134104876419702,1.5141748443687209,1.0938274149555371,1.5923254089621,1.2579442098678633,1.6821883841783376,1.9994419944447959,0.10887490071942141,0.5063440790962148,0.4559632077714131,0.08543814703616537,1.2998573759714152,0.05945087218255596,1.6090392677164163,0.3331541103432869,1.3787432163151623,1.6556389899448036,0.1681748599991595,0.7857541147524731,0.3142499925817086,0.43277473525134713,0.9471929026704724,0.5459623171594941,1.2925976340227603,1.6500296838962618,0.8801660854180686,1.0012811012837957,0.31005958303992864,1.6969512849692263,0.887109900046207,0.5413247459486192,0.3754467678611362,1.6054539871728988,1.2846345566663442,1.198115741823023,1.6771651359366855,0.056128169547382534,0.8367651035257162,0.04616850487154345,0.566191988934083,1.4160974391421957,0.979336624599326,1.6718828779050683,0.8162600688484782,0.7669347633185986,0.41896082372387244,0.23118691924705814,1.9470425412726446,0.10160972055741668,1.8940409964909635,0.5849927686972389,1.4514403283325321,1.0546690254776134,1.2327016124921335,1.1771099560408977,0.7952875919787563,0.48455830520079246,1.5944736839919065,0.5696782380965439,0.9478929362857129,0.7291757216962629,0.46624297362812506,0.6462308877148666,1.377582248571314,0.13827911279890248,1.9693061922980615,0.2680883988919205,0.4224736517817762,1.9525949596838545,0.9124670486421489,1.0180714952503083,1.3695061043970584,0.6320811157710708,1.3483678619455564,0.13431366722713234,0.6520777719889894,1.5967471003611537,0.3855218644606344,0.9703901448537549,0.6680333148384312,0.219302175565117,1.7459460767211388,0.7481239106585802,1.9010003088227783,1.7068453038208107,1.0763205157761404,1.888901094411389,0.9817501297287161,0.09972030463343806,1.4288829679971071,0.7676521320800798,0.5919431541923861,1.8965395028470806,1.0041393192753918,0.5481265818725296,0.5168343400420761,0.9437588087160425,0.900273309434156,0.6163723531331029,0.8924186511437457,0.4704568275208181,0.08560938924671735,1.194719795859338,1.6953704338365525,1.926478866663301,1.2862105023942512,0.4314029760049931,0.8563228390099087,1.5317413342384003,0.24497962869954915,0.03075882341252978,0.8537576381141103,1.9741006357074036,0.5551878045352665,1.3344596079981725,0.07511643054103967,0.2056560956242115,0.030035460317199725,0.9508005126198698,0.12719779475266613,1.5187587170035766,1.664503326186277,1.8622313026184303,1.4722013704697101,0.3606103926276316,1.0707538769111307,1.7508093201221726,0.8490232889835228,0.1786697666165722,1.0475889892214632,1.367947613767932,1.273239577174484,0.44817204371243724,0.006907051241822337,1.0242507301670063,1.0749382605472597,1.8598058972784193,1.771452924650338,1.5609243379436366,1.9916863557735645,1.3166232708855485,0.36554476616403386,0.828112305043017,1.2221881372570835,1.1812716067643838,0.8609989257665198,0.8768510992128249,0.8095373237169148,1.3676489241108616,0.2883516499357639,1.0543204729187479,0.8403485272808724,1.986988932345772,0.3238770213592894,0.19378652482548597,1.9760999312670617,1.7703157218713161,0.18664852038946833,1.8283011804259597,1.5742150778832418,0.2195903886233861,1.8033517783973347,0.9986188147463833,1.2607460060341444,1.7927880191832157,1.823846775149431,0.4505039055854798,1.118204768146681,1.6723968607905637,0.11596527227224751,0.4448371506803963,1.7900782889283033,1.5518453298693622,0.4796026890193721,1.6078297713125496,0.4208589117201438,0.10644971711907614,0.30147026955340017,0.17817865203022087,0.5056010908829371,0.854513114291473,0.9446670345956316,0.28921871128176857,0.7035021708204199,0.8458482157538785,1.2048483761327233,1.5742874521781465,1.1624479740743148,1.8222062803639663,0.16109500894572681,0.4743902747654474,0.01255335650899303,1.6080269910312528,0.9799751079185195,1.9295651925395387,0.24908755763218915,0.31733629409235764,0.7209566483225482,0.13779788861825848,1.884299670470233,1.460733799450614,1.1096573573467454,1.1817377455195661,1.9132571686962896,1.1366854598392178,0.8455350138423667,1.8512731752071665,1.062280834559782,0.33858571167240914,1.015715892957552,1.4258558389682894,0.9479870928870042,0.6055678367956023,0.1310030256975443,1.2942746681706097,1.311432094871058,1.9782236686847896,0.6465099083977326,0.629765388297558,0.5844578300787271,1.2202957540556922,1.016831916648497,0.35145486462693665,1.9487753507790972,0.27739229596120385,1.7369461701773985,1.62961963856511,1.6680044078943763,0.02555399421097393,0.7867046960018311,0.4609023822234213,1.8298203372236999,1.9495751584827383,0.06405554416890968,0.644047226755371,0.014818938729761921,1.1104891983161842,0.7770816020657465,0.8903773781448092,1.7605676135420274,1.4283637771086317,1.6588961553658752,0.878033638468402,1.4429038024292957,0.10573499330449421,1.6765654327319086,0.293201873410295,0.42937860759250546,0.639197396789569,0.261316002583841,0.14774974008327346,0.0554714453297076,1.2976238636662472,1.4867346159564434,1.6614794592568827,1.547268106493346,0.9306314468252417,0.7566319515471083,0.7884575795871602,0.20387138530526405,0.6803293740056304,0.15388077662083433,0.3851159521376508,1.652666068272508,1.642815012961889,0.2523891137358758,1.7036778874387717,1.0090545777053745,1.7398256640026473,1.3927940802731738,1.1379464039761436,0.3729151107808861,1.957245696420686,0.09870699162488705,1.5711466044522657,0.8191429742885474,1.6634802062465521,1.2656833623243404,0.9313318760225875,0.4703527505159677,1.1199872361952004,1.2907188713115976,1.5793216780440087,1.369223719495555,0.7829706809592363,1.594700487859388,1.8694520234084782,0.006367208390688273,0.1995407576313699,0.7314432405515174,0.9478731688960962,1.8600767120796529,0.23369981018621644,1.3901071674961623,0.604706353451844,0.6791053211859972,1.5887972461991513,1.9720405944730928,1.202220932600397,0.6631939599588432,0.7685701449052971,1.3977309946140424,1.905202721444434,1.0808679695824992,1.6486268339675108,1.6649568743178387,1.313879843551399,0.96770936001719,1.5057663761411764,0.7013202443114217,1.745235693388155,0.8496552259287036,1.5334734362573714,1.54138208367351,1.0139399756922582,1.2257421996563274,1.8399524538426797,0.3140712854255119,1.8989449509368148,1.0001983806329027,0.2935544887591237,0.8448660918533761,0.32325856129576147,1.6353401247639985,0.33350578585764934,0.15527841949174093,0.30951956189713625,0.2057235209994217,0.16381616118697462,1.6979584746777898,0.8847753150077784,0.4061906115863221,0.28465745655319186,0.09387747860675111,1.072421639920667,1.62603054160705,1.0332950909262095,1.242814579259543,1.8364706386714627,0.3425950730251932,0.4619719894280023,1.192629521132,0.27351459001480993,1.1386351217477118,0.043143151403508107,0.44674388216855343,0.6012045310485967,1.3919142854591282,1.4646604302774837,0.9798317806841408,1.579384832167062,0.6107094701346067,1.9913434398865166,0.04393949872588587,0.21560448131048515,1.7932516103718639,0.30961070265037227,1.7967083826257375,0.738862930461833,1.0562251591629845,0.8857384594742075,0.025960799372355403,1.8976523021742322,1.0423801657702567,0.9907385320246473,0.9750658559516943,0.555773276084405,0.9017777169488088,0.9952516980039965,0.535579386547024,0.03457153348672337,0.06022261554283537,1.4567662375719639,1.5701827771620738,0.2857532118593369,1.8205246111583109,1.0410835629139776,0.8199161761739275,0.4127968484211926,1.2957578785689696,0.6336172036543837,1.8762512884326625,1.4668156647874913,1.6524579851452814,0.10405706521454139,1.4578548298995417,1.1115466338368818,0.6923630051353156,0.8721099159086405,0.3345875678014538,1.045966691141781,0.8572483299414322,0.019487423851393793,0.7263020363988097,0.9355439324838191,0.14218362983842647,0.5207668500698484,0.33358098663030944,1.301965244356135,1.8201614880264927,1.6218341786051034,1.5062178556845685,1.4519523066495355,1.3516893961542258,0.7347536440038347,0.48246584781380575,1.7936433531812157,0.7413442647045501,0.6157399142247706,1.1919504914337842,1.7332450280802405,1.6991952613837094,1.8344523495108183,0.7833928792798854,0.92668791901374,0.25167673871476204,1.15744626857375,0.003743363799534105,0.9331223973239715,0.46202620654521676,0.18881295264835396,1.6740364865265676,0.20253103121952876,1.302259246616575,0.0640873876516741,0.8716663702846983,1.5083041778448663,0.06615726216428319,1.5773161732269467,0.8070860895470493,1.3792101374162202,1.0056418328095522,1.4575615518849978,1.312913196179934,0.36532412558721594,0.3288183926690218,1.0383102234122563,1.1740430958476025,1.3533454276393893,1.83826627311727,1.9874857261628116,1.3854135349958296,0.4280353563615029,0.9483144603587332,1.6596281287145351,0.4837135539955053,0.8781462964225031,0.29205605100886345,1.0455242673172234,1.345013015044065,1.54249865702034,0.893649468969627,1.7274233090204594,1.3660749421546683,0.22724740557601653,0.6091731603664559,1.5952340197615724,0.6329425136339424,0.2069084037440132,0.8184913812229428,1.7190478649998213,0.5404129278803067,1.500927950185671,0.23892071162177198,0.9880871699180802,0.7322997174889876,0.05598858429752296,0.10181913046345237,1.3324226329978677,0.5936343158438837,0.9084658885613801,0.2748780072467705,0.20240098153210795,1.235405626616188,1.1696973335178376,0.7458934471952325,1.0300174137657012,1.3694713693770493,1.132752043694782,1.7751160529984489,1.2877843575334307,0.311029257792665,0.737006587197099,1.3339315496569624,0.731819723463818,0.04849187364811369,0.9715529995190133,1.6022048655448353,0.6501542679063199,0.8210879667632387,0.7160718254618654,1.8390182949243616,1.8488957033549962,0.5762726402031539,0.9684921752842528,1.6861806396353467,0.5708409311437754,0.3580026493117412,1.4565923265958247,0.24850557452825806,1.6991045539292364,0.9979768076934206,1.8855621869282881,0.29445289917230166,1.579259872374211,1.314392962030873,1.127173781502711,0.9914496442249452,0.36984065011891953,0.7411213721380179,1.9618462315678737,1.013511072179805,0.28672564426446545,0.05328116947727768,1.6013680823504202,0.5245996246049067,1.2896164497319043,1.415006838878984,0.31915695222823715,0.6338071236159117,0.443188530822332,0.3525836634544479,0.03381724482532,1.1654103306722297,1.29142788483415,0.40193744231469664,1.7580822911700933,0.26996818020927327,0.3147438313072608,1.3558690128140518,0.2881626123318055,1.0173847018049198,1.9774104930115821,1.9827126944032631,1.2104176615528095,0.07566244356072538,1.5826223529618049,1.3617675407633119,1.4215620985834208,1.0822218689873857,1.7924804202505236,0.7527791875648613,0.5733898265273423,1.4859786563386237,1.845533769182774,0.8918553162698637,0.36555611573388713,1.4618078719018546,1.6760191708567582,1.1853058516091046,1.8712869554532259,0.8825594136848998,1.5224079678243254,0.19319650952555012,0.08542378464377842,1.5676478583921214,1.2856455774961422,1.4720259248275935,1.1618747036045218,0.6173790833950803,0.2915331788471569,0.8624639329159742,1.783730842933286,1.3233638023167011,0.057248524677087964,1.4809517940480696,0.5296078889207796,1.2294601263876368,0.43267865804614924,1.7026178571783408,0.9392636385853224,0.3525331026045819,0.3401863731514392,0.47264580409482226,0.4886226058133567,0.21539126189716828,1.6172418225300271,1.602654699566338,0.6060305023998871,1.4993244436690012,1.971299995661124,0.7651173866505396,1.3527112217984074,0.579445157327795,0.23166585846423482,1.47566420711606,0.9347238682524579,0.8812831237280876,1.9387258607787667,0.6097747569208085,1.5031717091767747,1.77270183550977,0.37450730123094544,1.9209134233574843,1.129069470219398,1.666343794156354,0.026676574786776985,1.606963203426551,1.062788734645924,0.30178546696585684,1.3954777420408409,0.6050777935625113,1.2265242895810244,1.2466825675056237,0.14222501601426174,0.4770541288456802,0.5976414198123128,1.4158028740311872,1.9850499962984633,0.9017493829708778,1.265220036326141,1.0195426757155248,1.9350490040352204,1.556289970142104,1.1608486699138614,1.3097661983875168,0.9445361371265331,1.3044562206635781,1.6588146012644382,1.1155549002486045,0.5647599727880936,0.05635772353603663,1.3383744865110865,0.8853619438267692,0.5106113652204978,0.8261146966355888,0.25671176293776643,1.8432965195407855,0.7408600018336489,1.012035203250726,1.2719346127184896,1.0114814564374202,0.034577539468708895,1.4398818333831858,1.6315967925290518,1.708702446363187,1.580160921986257,0.5887094954427567,1.2291312685291897,1.0649018794416603,1.0865930149837708,1.6422688511000478,1.076649889537073,0.7981383061617819,0.6544016256562935,0.6578592355054793,1.428920450469636,1.928130384593092,0.10260968609331345,1.6850969316071858,0.22517893940853817,0.6773818770169591,0.04699667140807806,0.10650556959527124,0.15198240211627567,0.5315817100443843,1.3582318694125646,0.6470147882623709,1.349233008930692,1.0824895771067804,1.006422194711079,1.0583468679112653,1.8300341299768843,0.7294309470838751,1.4269454118162912,0.7661413502583359,0.0324347149323434,1.6237123820838328,0.5186579145053347,0.32141910445403177,0.4444391525583802,0.5396510702393287,0.17711252384744736,0.7373383033448011,0.5614385720739454,0.7762413835944946,1.0007917850284858,1.1846493226075498,1.6663375796587294,0.7995191783990334,1.5534342360509714,0.4167463003447107,1.9311323615841784,1.1071234731134272,1.3928231277052547,1.830066184511475,1.1628296779051364,0.42411378079390616,0.9996052155752388,0.8199653306909656,0.832769885600074,0.8223132368913286,1.2445288391228941,0.46215957360733473,0.5365756864189448,0.44936902453526706,1.5269141882123636,0.7435327366963977,1.2339960778251036,1.7745391737115606,0.26754455978549574,0.5287091535570991,1.6521288741399838,0.5654293662647256,1.3525775869569725,1.6300635549982565,0.9179843844723314,1.6219266009632993,0.17440060176525662,0.9501543855356198,1.4159227822685945,0.4464329444686892,0.45399217637341716,0.8042302139934696,0.3080024534473349,0.488908421875768,0.7181587975441097,0.5754586486483735,1.2025736872691155,1.4613095104725367,1.1951548504252365,0.5226216349582313,1.1987215543092353,1.3123501403388267,0.959710112913883,1.310616434438026,0.17476768478770044,0.9565060310319504,1.755539659701828,0.5355078679661478,0.9005212170260792,0.26343818675161756,0.19222778662714868,0.32363394779459886,1.9475818848085282,0.9818681129992575,0.7728093728848853,1.0065541995580856,1.417452788325094,1.7899966616394063,0.1956889361708316,1.2528182057550001,0.5444605573752286,1.9271717490262592,1.4471628231949674,0.7018471693843571,0.5596312407452952,1.7905484541171877,1.269660443944157,0.20439011438630272,0.803836839232984,0.3459785491838656,1.1682102082562662,1.0137238359260619,0.5923873986618284,1.1035150467669972,1.8974194353471963,0.4262434619946993,0.8117185576068011,0.7919280902446411,0.3530044260824656,0.1769960064292464,1.2888315847120109,1.452732806478263,1.2427372810752781,0.29430746603525826,0.00618006268827731,1.6525743052375144,0.6028886798613118,0.6803905357848041,1.1087911864561302,0.8135527445578772,0.4225263111440989,0.9619581783382003,1.4110743263725731,0.09974772423424838,0.3739252899818992]}
},{}],121:[function(require,module,exports){
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

var largeScale = require( './fixtures/julia/large_scale.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logpdf = factory( 1.0, 1.0, 1.0, 0.0 );
	t.equal( typeof logpdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0, 1.0, 0.0 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, 1.0, 0.0 );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 1.0, NaN, 0.0 );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 1.0, NaN, 1.0, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN, NaN );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `alpha` and `s`, the function returns a function which returns `-Infinity` when provided `x <= m`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0, 1.0, 2.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 2.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a nonpositive `s`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0, -1.0, 1.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 1.0, 0.0, 1.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 1.0, NINF, 1.0 );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( PINF, NINF, 1.0 );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NINF, NaN );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logPDF for `x` given large `alpha`', function test( t ) {
	var expected;
	var logpdf;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	s = largeShape.s;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], s[i], 0.0 );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', m: 0, y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 5.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. m: 0. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logPDF for `x` given large `s`', function test( t ) {
	var expected;
	var logpdf;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = largeScale.expected;
	x = largeScale.x;
	alpha = largeScale.alpha;
	s = largeScale.s;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], s[i], 0.0 );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 5.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logPDF for `x` given large `alpha` and `s`', function test( t ) {
	var expected;
	var logpdf;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	s = bothLarge.s;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], s[i], 0.0 );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/frechet/logpdf/test/test.factory.js")
},{"./../lib/factory.js":115,"./fixtures/julia/both_large.json":118,"./fixtures/julia/large_scale.json":119,"./fixtures/julia/large_shape.json":120,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65,"tape":241}],122:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/frechet/logpdf/test/test.js")
},{"./../lib":116,"tape":241}],123:[function(require,module,exports){
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

var largeScale = require( './fixtures/julia/large_scale.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpdf( NaN, 1.0, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, NaN, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, 1.0, NaN, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, 1.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `x <= m` and a valid `alpha` and `s`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( NINF, 1.0, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 0.0, 1.0, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 1.0, 1.0, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 2.0, 1.0, 1.0, 3.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a nonpositive `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, -1.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, -1.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 0.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 0.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, PINF, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NaN, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `s`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, 2.0, -1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 2.0, -1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 2.0, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 2.0, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 1.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, PINF, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NaN, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logPDF for `x` given large `alpha`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	s = largeShape.s;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 5.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logPDF for `x` given large `s`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = largeScale.expected;
	x = largeScale.x;
	alpha = largeScale.alpha;
	s = largeScale.s;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 5.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logPDF for `x` given large `alpha` and `s`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	s = bothLarge.s;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', m: 0, y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. m: 0. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/frechet/logpdf/test/test.logpdf.js")
},{"./../lib":116,"./fixtures/julia/both_large.json":118,"./fixtures/julia/large_scale.json":119,"./fixtures/julia/large_shape.json":120,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65,"tape":241}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":124}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":127}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":131}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{"./define_property.js":129}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":128,"./has_define_property_support.js":130,"./polyfill.js":132}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":134,"./polyfill.js":135,"@stdlib/assert/has-tostringtag-support":20}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":136}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":136,"./tostringtag.js":137,"@stdlib/assert/has-own-property":16}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){

},{}],140:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"dup":139}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
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
},{"_process":233}],143:[function(require,module,exports){
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

},{"events":141,"inherits":228,"readable-stream/lib/_stream_duplex.js":145,"readable-stream/lib/_stream_passthrough.js":146,"readable-stream/lib/_stream_readable.js":147,"readable-stream/lib/_stream_transform.js":148,"readable-stream/lib/_stream_writable.js":149,"readable-stream/lib/internal/streams/end-of-stream.js":153,"readable-stream/lib/internal/streams/pipeline.js":155}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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
},{"./_stream_readable":147,"./_stream_writable":149,"_process":233,"inherits":228}],146:[function(require,module,exports){
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
},{"./_stream_transform":148,"inherits":228}],147:[function(require,module,exports){
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
},{"../errors":144,"./_stream_duplex":145,"./internal/streams/async_iterator":150,"./internal/streams/buffer_list":151,"./internal/streams/destroy":152,"./internal/streams/from":154,"./internal/streams/state":156,"./internal/streams/stream":157,"_process":233,"buffer":158,"events":141,"inherits":228,"string_decoder/":240,"util":139}],148:[function(require,module,exports){
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
},{"../errors":144,"./_stream_duplex":145,"inherits":228}],149:[function(require,module,exports){
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
},{"../errors":144,"./_stream_duplex":145,"./internal/streams/destroy":152,"./internal/streams/state":156,"./internal/streams/stream":157,"_process":233,"buffer":158,"inherits":228,"util-deprecate":249}],150:[function(require,module,exports){
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
},{"./end-of-stream":153,"_process":233}],151:[function(require,module,exports){
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
},{"buffer":158,"util":139}],152:[function(require,module,exports){
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
},{"_process":233}],153:[function(require,module,exports){
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
},{"../../../errors":144}],154:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],155:[function(require,module,exports){
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
},{"../../../errors":144,"./end-of-stream":153}],156:[function(require,module,exports){
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
},{"../../../errors":144}],157:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":141}],158:[function(require,module,exports){
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
},{"base64-js":138,"buffer":158,"ieee754":227}],159:[function(require,module,exports){
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

},{"./":160,"get-intrinsic":223}],160:[function(require,module,exports){
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

},{"function-bind":222,"get-intrinsic":223}],161:[function(require,module,exports){
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

},{"./lib/is_arguments.js":162,"./lib/keys.js":163}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],164:[function(require,module,exports){
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

},{"object-keys":231}],165:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],166:[function(require,module,exports){
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

},{"./ToNumber":196,"./ToPrimitive":198,"./Type":203}],167:[function(require,module,exports){
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

},{"../helpers/isFinite":212,"../helpers/isNaN":213,"../helpers/isPrefixOf":214,"./ToNumber":196,"./ToPrimitive":198,"./Type":203,"get-intrinsic":223}],168:[function(require,module,exports){
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

},{"get-intrinsic":223}],169:[function(require,module,exports){
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

},{"./DayWithinYear":172,"./InLeapYear":176,"./MonthFromTime":186,"get-intrinsic":223}],170:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":218,"./floor":207}],171:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":207}],172:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":170,"./DayFromYear":171,"./YearFromTime":205}],173:[function(require,module,exports){
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

},{"./modulo":208}],174:[function(require,module,exports){
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

},{"../helpers/assertRecord":211,"./IsAccessorDescriptor":177,"./IsDataDescriptor":179,"./Type":203,"get-intrinsic":223}],175:[function(require,module,exports){
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

},{"../helpers/timeConstants":218,"./floor":207,"./modulo":208}],176:[function(require,module,exports){
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

},{"./DaysInYear":173,"./YearFromTime":205,"get-intrinsic":223}],177:[function(require,module,exports){
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

},{"../helpers/assertRecord":211,"./Type":203,"has":226}],178:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":229}],179:[function(require,module,exports){
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

},{"../helpers/assertRecord":211,"./Type":203,"has":226}],180:[function(require,module,exports){
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

},{"../helpers/assertRecord":211,"./IsAccessorDescriptor":177,"./IsDataDescriptor":179,"./Type":203}],181:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":215,"./IsAccessorDescriptor":177,"./IsDataDescriptor":179,"./Type":203}],182:[function(require,module,exports){
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

},{"../helpers/isFinite":212,"../helpers/timeConstants":218}],183:[function(require,module,exports){
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

},{"../helpers/isFinite":212,"./DateFromTime":169,"./Day":170,"./MonthFromTime":186,"./ToInteger":195,"./YearFromTime":205,"./floor":207,"./modulo":208,"get-intrinsic":223}],184:[function(require,module,exports){
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

},{"../helpers/isFinite":212,"../helpers/timeConstants":218,"./ToInteger":195}],185:[function(require,module,exports){
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

},{"../helpers/timeConstants":218,"./floor":207,"./modulo":208}],186:[function(require,module,exports){
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

},{"./DayWithinYear":172,"./InLeapYear":176}],187:[function(require,module,exports){
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

},{"../helpers/isNaN":213}],188:[function(require,module,exports){
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

},{"../helpers/timeConstants":218,"./floor":207,"./modulo":208}],189:[function(require,module,exports){
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

},{"./Type":203}],190:[function(require,module,exports){
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


},{"../helpers/isFinite":212,"./ToNumber":196,"./abs":206,"get-intrinsic":223}],191:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":218,"./DayFromYear":171}],192:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":218,"./modulo":208}],193:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],194:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":196}],195:[function(require,module,exports){
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

},{"../helpers/isFinite":212,"../helpers/isNaN":213,"../helpers/sign":217,"./ToNumber":196,"./abs":206,"./floor":207}],196:[function(require,module,exports){
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

},{"./ToPrimitive":198}],197:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":168,"get-intrinsic":223}],198:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":219}],199:[function(require,module,exports){
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

},{"./IsCallable":178,"./ToBoolean":193,"./Type":203,"get-intrinsic":223,"has":226}],200:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":223}],201:[function(require,module,exports){
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

},{"../helpers/isFinite":212,"../helpers/isNaN":213,"../helpers/sign":217,"./ToNumber":196,"./abs":206,"./floor":207,"./modulo":208}],202:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":196}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":170,"./modulo":208}],205:[function(require,module,exports){
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

},{"call-bind/callBound":159,"get-intrinsic":223}],206:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":223}],207:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],208:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":216}],209:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":218,"./modulo":208}],210:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":166,"./5/AbstractRelationalComparison":167,"./5/CheckObjectCoercible":168,"./5/DateFromTime":169,"./5/Day":170,"./5/DayFromYear":171,"./5/DayWithinYear":172,"./5/DaysInYear":173,"./5/FromPropertyDescriptor":174,"./5/HourFromTime":175,"./5/InLeapYear":176,"./5/IsAccessorDescriptor":177,"./5/IsCallable":178,"./5/IsDataDescriptor":179,"./5/IsGenericDescriptor":180,"./5/IsPropertyDescriptor":181,"./5/MakeDate":182,"./5/MakeDay":183,"./5/MakeTime":184,"./5/MinFromTime":185,"./5/MonthFromTime":186,"./5/SameValue":187,"./5/SecFromTime":188,"./5/StrictEqualityComparison":189,"./5/TimeClip":190,"./5/TimeFromYear":191,"./5/TimeWithinDay":192,"./5/ToBoolean":193,"./5/ToInt32":194,"./5/ToInteger":195,"./5/ToNumber":196,"./5/ToObject":197,"./5/ToPrimitive":198,"./5/ToPropertyDescriptor":199,"./5/ToString":200,"./5/ToUint16":201,"./5/ToUint32":202,"./5/Type":203,"./5/WeekDay":204,"./5/YearFromTime":205,"./5/abs":206,"./5/floor":207,"./5/modulo":208,"./5/msFromTime":209}],211:[function(require,module,exports){
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

},{"get-intrinsic":223,"has":226}],212:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],213:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],214:[function(require,module,exports){
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

},{"call-bind/callBound":159}],215:[function(require,module,exports){
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

},{"get-intrinsic":223,"has":226}],216:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],217:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],218:[function(require,module,exports){
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

},{}],219:[function(require,module,exports){
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

},{"./helpers/isPrimitive":220,"is-callable":229}],220:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],221:[function(require,module,exports){
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

},{}],222:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":221}],223:[function(require,module,exports){
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

},{"function-bind":222,"has":226,"has-symbols":224}],224:[function(require,module,exports){
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

},{"./shams":225}],225:[function(require,module,exports){
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

},{}],226:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":222}],227:[function(require,module,exports){
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

},{}],228:[function(require,module,exports){
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

},{}],229:[function(require,module,exports){
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

},{}],230:[function(require,module,exports){
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

},{"./isArguments":232}],231:[function(require,module,exports){
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

},{"./implementation":230,"./isArguments":232}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
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

},{}],234:[function(require,module,exports){
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
},{"_process":233,"through":247,"timers":248}],235:[function(require,module,exports){
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

},{"buffer":158}],236:[function(require,module,exports){
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

},{"es-abstract/es5":210,"function-bind":222}],237:[function(require,module,exports){
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

},{"./implementation":236,"./polyfill":238,"./shim":239,"define-properties":164,"function-bind":222}],238:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":236}],239:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":238,"define-properties":164}],240:[function(require,module,exports){
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
},{"safe-buffer":235}],241:[function(require,module,exports){
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
},{"./lib/default_stream":242,"./lib/results":244,"./lib/test":245,"_process":233,"defined":165,"through":247,"timers":248}],242:[function(require,module,exports){
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
},{"_process":233,"fs":140,"through":247}],243:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":233,"timers":248}],244:[function(require,module,exports){
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
},{"_process":233,"events":141,"function-bind":222,"has":226,"inherits":228,"object-inspect":246,"resumer":234,"through":247,"timers":248}],245:[function(require,module,exports){
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
},{"./next_tick":243,"deep-equal":161,"defined":165,"events":141,"has":226,"inherits":228,"path":142,"string.prototype.trim":237}],246:[function(require,module,exports){
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

},{}],247:[function(require,module,exports){
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
},{"_process":233,"stream":143}],248:[function(require,module,exports){
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
},{"process/browser.js":233,"timers":248}],249:[function(require,module,exports){
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
},{}]},{},[121,122,123]);
