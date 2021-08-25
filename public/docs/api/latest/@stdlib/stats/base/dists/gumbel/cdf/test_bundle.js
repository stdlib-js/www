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

},{"@stdlib/utils/native-class":109}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":109}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":109}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":109}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":74}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/from-words":78,"@stdlib/number/float64/base/get-high-word":82,"@stdlib/number/float64/base/to-words":87}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./expmulti.js":65,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/trunc":72}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":67,"@stdlib/math/base/special/ldexp":70}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ldexp.js":71}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":46,"@stdlib/constants/float64/max-base2-exponent-subnormal":45,"@stdlib/constants/float64/min-base2-exponent-subnormal":47,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/copysign":63,"@stdlib/number/float64/base/exponent":76,"@stdlib/number/float64/base/from-words":78,"@stdlib/number/float64/base/normalize":84,"@stdlib/number/float64/base/to-words":87}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":60,"@stdlib/math/base/special/floor":68}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":75}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":82}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":80}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":79,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":83}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":81,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":85}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":86}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":50,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":89}],88:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":79}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":90}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":88,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Evaluates the cumulative distribution function (CDF) for a Gumbel distribution with location parameter `mu` and scale parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 10.0, 0.0, 3.0 );
* // returns ~0.965
*
* @example
* var y = cdf( -2.0, 0.0, 3.0 );
* // returns ~0.143
*
* @example
* var y = cdf( 0.0, 0.0, 1.0 );
* // returns ~0.368
*
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = cdf( 0.0, 0.0, -1.0 );
* // returns NaN
*/
function cdf( x, mu, beta ) {
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( beta ) ||
		beta <= 0.0
	) {
		return NaN;
	}
	z = ( x - mu ) / beta;
	return exp( -exp( -z ) );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/exp":66}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a Gumbel distribution with location parameter `mu` and scale parameter `beta`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 0.0, 3.0 );
*
* var y = cdf( 10.0 );
* // returns ~0.965
*
* y = cdf( -2.0 );
* // returns ~0.143
*/
function factory( mu, beta ) {
	if (
		isnan( mu ) ||
		isnan( beta ) ||
		beta <= 0
	) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a Gumbel distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( -2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		z = ( x - mu ) / beta;
		return exp( -exp( -z ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/exp":66,"@stdlib/utils/constant-function":101}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Gumbel distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/gumbel/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/gumbel/cdf' );
*
* var y = cdf( 10.0, 0.0, 3.0 );
* // returns ~0.965
*
* y = cdf( 0.0, 0.0, 3.0 );
* // returns ~0.368
*
* var myCDF = cdf.factory( 2.0, 3.0 );
* y = myCDF( 10.0 );
* // returns ~0.933
*
* y = myCDF( 2.0 );
* // returns ~0.368
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":91,"./factory.js":92,"@stdlib/utils/define-nonenumerable-read-only-property":102}],94:[function(require,module,exports){
module.exports={"expected":[0.35392398349809084,0.6768438778062059,0.4336362009711012,0.4019789465067807,0.42170551048953303,0.5345263915001012,0.4324796943433258,0.6225930702573588,0.5075449853301693,0.2907129255336175,0.3812919061227259,0.8252534232173474,0.870414059060735,0.6290396624346032,0.5469795581598678,0.46194870091854,0.35932260433564156,0.6192692068621776,0.7489156794831913,0.4261405472549804,0.7702375647954127,0.44642191306550916,0.4392927436667576,0.5496257325561377,0.5874472870196435,0.39413692967712455,0.5255298242082617,0.4517850428332198,0.3710251909800748,0.4624405194769701,0.3747768624625291,0.4878847679456807,0.8980802964352407,0.4015356407886006,0.3929068271073814,0.3796038383914269,0.6915617026712745,0.40867130586716083,0.4394592898561122,0.4351719865907126,0.5770648058023671,0.37164860678219847,0.35087171241893,0.5676375168309076,0.5015174029094324,0.4082430114029577,0.37508930595802825,0.3855085334869024,0.46536927658691707,0.46345695117702695,0.21629127018922306,0.47721864154021687,0.3934727002999667,0.6358861546087455,0.8939805196834665,0.9605078059726812,0.37818187984626944,0.3766219726179237,0.4016585858864983,0.46608663975330955,0.3598898478795508,0.4295396403624961,0.5341837464431471,0.47730414983452707,0.4834874039405546,0.3908627801968494,0.34959304176402445,0.4407054196779042,0.40680322181741835,0.47359636547163775,0.3433822851213711,0.9614845574532299,0.5401378977238074,0.41237510875349603,0.35583671668527045,0.3874378745479124,0.372477871366824,0.4725514194967284,0.40736107006359995,0.3685523920799891,0.3806277241995506,0.5316380011467332,0.34504332576677565,0.38689653096614884,0.42690758572063503,0.3988748543565656,0.6230250484365701,0.5090009551808461,0.5696698732864387,0.4926900141865343,0.41039243634350975,0.345007351264106,0.9978104209041654,0.432636257911971,0.878366833551467,0.5364900432413038,0.431242866420054,0.38642314036655956,0.33801462636100704,0.5015887563135054,0.5512334269658345,0.4647441792932011,0.4405164666299778,0.502867252307114,0.4322623675805136,0.3465234510322708,0.442012621554457,0.8954270290689232,0.42465800691015987,0.529241656354947,0.4783279677660121,0.4430014687452406,0.2587182071178208,0.5618113091200628,0.41925857456677906,0.6791431509032767,0.5607282144135244,0.4521008048753613,0.40416623203841645,0.3540418209300185,0.37871913446619887,0.4732998815683986,0.4452536649498218,0.45322924432824746,0.40445732010645835,0.43299218247232363,0.3895533390492295,0.4424985222142979,0.45639078600083016,0.5512651462690997,0.4324672119599112,0.342539161675118,0.44367757001743513,0.39160331900887346,0.40410701883051603,0.5302573926562213,0.3984286080449718,0.33174780470887855,0.3936732073723965,0.48362416111805984,0.41956007255831723,0.45576147063494665,0.4685840583896359,0.3990481575509494,0.3778746046392889,0.4846750851003076,0.8334697834604138,0.4346100181988912,0.44699837873192816,0.42408741110652937,0.5428534551230773,0.37304871523030747,0.38298517092001294,0.5487718809704603,0.37696100314209946,0.6500505805471457,0.5747847311700336,0.4636229032988518,0.3702459973066813,0.5203734698461394,0.991488997967444,0.45613743417473585,0.3286974239480394,0.4106236810908479,0.5178343496406124,0.3971990513469828,0.46005990724194323,0.8164881814502735,0.6057544131715411,0.4840928418123387,0.44585693558878225,0.4477817582069131,0.6639600983688356,0.468386316621238,0.35619205515366525,0.44113686956519793,0.903549355308076,0.4302701804527993,0.5002913592027465,0.40791718089046086,1.0,0.4684838078965896,0.5600187449680312,0.4116786176411906,0.42309591772750077,0.4809520611265469,0.4522440200123973,0.664471049096102,0.4999262351760461,0.3905453459086333,0.41591355491405607,0.6488921364892445,0.9939328462532572,0.9863682536001126,0.6946355031781117,0.7148834412590608,0.9936911350768137,0.9992193432200485,0.8076222097994226,0.5122355138572204,0.32802777216675566,0.4171668770074885,0.45058344575029347,0.44534039744373577,0.4102933789979622,0.42828297102585594,0.5168400371322261,0.41089823501522715,0.37861189715726984,0.7394852813399972,0.7388069851607448,0.6749206176712397,0.42913176140715764,0.36196003231458773,0.3735520322929192,0.43250474058802446,0.9992222729972149,0.5014017170317165,0.4490959562876355,0.5668592023203437,0.46244007466482806,0.8702598254275371,0.538822918941831,0.4531909670376567,0.6054003782836064,0.4829429047050683,0.40902775172753,0.7358766624581043,0.374988575037173,0.42995791197354194,0.66492780442623,0.433922229273636,0.4784713965269487,0.4425069466524746,0.4214523841672337,0.6174895709485781,0.6451275358340716,0.9045038259357466,0.9999999921441793,0.6468699042366466,0.397233833609002,0.434009960455494,0.45034782210165436,0.519721351446141,0.4445122476863783,0.6290595111089757,0.47096156292214025,0.6338832789143254,0.41420651000688735,0.3805313809325117,0.4991467078673337,0.40828371967569355,0.9558541430137152,0.3072280514914557,0.5007165657529004,0.42277510639751537,0.4275572108367071,0.372320593437226,0.44217502900713435,0.6403738698057365,0.792426577529558,0.47447158815354085,0.3786722073285924,0.4888039114453712,0.42956962421081046,0.721988223583439,0.5547451022019122,0.4356513677290123,0.3893422488290807,0.7895210067950145,0.6108302811706344,0.9863405163433342,0.4580926298529734,0.38240233449107064,0.4500989772827015,0.4689596159067236,0.4061580392848013,0.4291301523368572,0.4306327196093558,0.4989035096769392,0.41520011916293453,0.3728535428157921,0.512910621583533,0.5490627895100254,0.3808679986531329,0.9899580597804731,0.38451147236466776,0.5465792352266546,0.33305951705672465,0.4165656688248621,0.4346535395205776,0.7192793512566343,0.5433728672152061,0.5163382949814,0.3567283902217344,0.4500936823284841,0.5537305581026065,0.5986662690696558,0.9012607945638007,0.4135765835190731,0.4034397340367285,0.415279212380721,0.3825519576922472,0.3782605699029179,0.4422423785817166,0.45636557532439015,0.4795908452222225,0.01593083763956228,0.9999987490597028,0.6112597794817202,0.3309917171118765,0.38756682116933416,0.7260419720010733,0.37105749716412073,0.41085026687009935,0.44343125965390445,0.4854369100895181,0.43252583362713,0.7759404729334685,0.6135471193986566,0.5190048813698657,0.37284927203865037,0.35383050769101754,0.402515527318929,0.571012490759945,0.5384772673020051,0.3814901130649925,0.46238711975465174,0.8326640181427571,0.4621461094003865,0.43805910230616296,0.4685564157967966,0.3627615247821664,0.5004968489658747,0.40812366124561605,0.4437551178655989,0.3676775545417328,0.4974685921618738,0.4041314171987896,0.3553892370088236,0.5050973183769244,0.45260921272294197,0.3843063289630373,0.40260925600953473,0.4904159525881711,0.39038721327186415,0.46427947810863174,1.0,0.5141705752260726,0.4513683557169564,0.6002401706517032,0.47334221974648427,0.3724317810938277,0.5386216217094345,0.41045307140106074,0.5224051017658551,0.395309175884578,0.4552433244563358,0.9323811676472135,0.37508336725699554,0.38240880532968224,0.34590642444308484,0.8357982115213606,0.4797801575765039,0.43679079633234635,0.41050863624434175,0.3768629158943839,0.483723390197635,0.4558612662782441,0.4433846748501219,0.37149494289914153,0.36674058250288843,0.3149633030792161,0.4554436970477373,0.3333571372044063,0.4830224853945198,0.35219121118397045,0.8571403248312691,0.4750490094194939,0.34497149947142686,0.548340118062345,0.8211863160098061,0.39235260760281704,0.46156804161721776,0.36405425801998154,0.39730345586294685,0.3734673389962385,0.5225613493204214,0.5161297004370065,0.5129739052217367,0.7997139710580379,0.4004214362286107,0.32072966202832426,0.46535929503803597,0.5273665226326866,0.4518173482353662,0.6000204258641998,0.41364033449130394,0.42491083825790243,0.43292317571841377,0.9993583436050609,0.46359872728456897,0.42095448184700834,0.36955738663248294,0.40419981191723275,0.40707709096051037,0.37075299124553096,0.4452091309134685,0.3718835505895643,0.4936157576681937,0.30378616603959135,0.4605063250071937,0.47438216260828187,0.4255889571652395,0.4269738234465419,0.6754495032495222,0.45185195774910775,0.5916438965983039,0.39139334253420494,0.40623216450675,0.9866971171433068,0.3782890807185932,0.38134461740025793,0.443413386631268,0.40793531044908576,0.4731871709625564,0.4106275334498355,0.40788710366359787,0.30829801232053416,0.8536949288710601,0.38017828853489866,0.6976725773576374,0.6839131283531854,0.3087461782724476,0.4130499175394663,0.40436433160518304,0.4601755510818219,0.910357650860732,0.3095654533184002,0.4264735509498353,0.06454740764441994,0.3781725598793086,0.3732378908199654,0.35307840608869945,0.4453578010936399,0.45655388930929525,0.7550022079863654,0.36280299041761627,0.9999577543027494,0.42645080978901995,0.48775615996884747,0.4681231620365655,0.37734173927654,0.9120544204875154,0.5514895170796016,0.38298957967707914,0.38050809532911845,0.42463664530106604,0.34156920709540856,0.5298262574443857,0.45091527141546844,0.4644356336290881,0.36093883473325206,0.595371218630103,0.455623736538036,0.6310651408458379,0.8121620599169469,0.6198058910871819,0.40477579312991474,0.7606620365728113,0.9830323985197656,0.6090534357728046,0.3181811099693091,0.4862102082426013,0.8463848859992085,0.4873300296606149,0.6762188895870593,0.3808273773455665,0.8371594158288288,0.42750314172798465,0.4750215293750445,0.4901044647916572,0.48625834073431456,0.3522463592883164,0.48840423640022546,0.420985560739747,0.37181031175406615,0.439342558059037,0.3783745565874175,0.3491636109460663,0.3690553800435531,0.5728609798731046,0.414895347258192,0.49771327195604725,0.37106802392554483,0.9895130872043696,0.3936806978638619,0.4393209811198566,0.9960763333329248,0.3924705562534583,0.45594823190976574,0.5393227016518299,0.4157957471160331,0.5300483211453565,0.4209426294993029,0.4608474432614025,0.5922463511847372,0.458007201077696,0.47342780972958926,0.49766411339998373,0.413841903401142,0.40742280767102357,0.46997325179160176,0.4799187058223117,0.9956275542871448,0.9999999977081658,0.3873875892823969,0.4081760267906479,0.42658265826015274,0.4583181807123008,0.4000999804378379,0.3792885134424058,0.4158349707960646,0.9714452097430157,0.42137663957573546,0.40021968752612874,0.3468947034603368,0.5039214194483536,0.4130830842885995,0.45712647486445035,0.4871021893722651,0.536651914913169,0.37789169873541917,0.4607957033029867,0.4199989287405057,0.45206697824288355,0.46088628886586314,0.3710333133159377,0.34965095916356165,0.5738472351683167,0.6580108354384335,0.37080371810012036,0.41036391168041014,0.4320202247077838,0.36882139364004496,0.44746371736176804,0.9747580567479194,0.517731989312263,0.5527120265922043,0.5032258742832364,0.05890785601623076,0.3882341332928251,0.43160183534214164,0.3268284674201159,0.6229038880019045,0.41114047559646105,0.49417441585240995,0.824970914955266,0.3764677899227459,0.5606607650697888,0.4484359947128342,0.5209821266960853,0.5910818332691092,0.4729736552247041,0.5187366535904028,0.39281544994588746,0.3802700493535227,0.41369763610966764,0.4270472585127576,0.36111905546846923,0.5252049030073669,0.3527177972218026,0.39045114753735155,0.4287653380208529,0.6384419884857058,0.9606125104864425,0.37082382294535304,0.40726553119091136,0.6985951622866635,0.4634480943138035,0.4737201204687672,0.7086591350241964,0.44311524213900083,0.4883024040865523,1.0,0.41845925124957073,0.5299546505243271,0.3833951718786839,0.37458010256133034,0.4269546239538965,0.35200887279322046,0.5876585873702979,0.4237931193369795,0.4418236706274901,0.4526910442613195,0.38817977514745894,0.4452085332060966,0.3984862842549869,0.37910185668503815,0.3881966238362706,0.5707396502344045,0.5190036872777402,0.504308599258388,0.34188854599732516,0.3824683848206607,0.5297134120496656,0.4965954166879199,0.4108871946683492,0.5506899415844976,0.3660457213076499,0.4094217039652748,0.47597416868241016,0.4888241764026754,0.45493511207427834,0.3625367819080194,0.3548542684203295,0.4349780193756032,0.3772201059679552,0.4442029311870096,0.39182405359435246,0.41111720238719146,0.3648039034504999,0.37695838372974444,0.3823535175771452,0.44206354522505903,0.43443881407549456,0.43590525814466796,0.28994778348914746,0.3349449345711812,0.46533949093999205,0.4326686844849067,0.4238943792563636,0.45402900413943026,0.3445013401311835,0.625328603822654,0.9866377776023346,0.4379356225926425,0.37465498455291824,0.3631308361811827,0.345128372159466,0.9999951515972307,0.5950120470116562,0.5978172123229616,0.46042379606560185,0.5701720161488132,0.4531392180026143,0.40006645632316906,0.4940745494158301,0.6001745615164592,0.41679195324378926,0.42478255934089015,0.47476951944078655,0.3329061438157855,0.6017875099606729,0.43914910771607396,0.4815481532091596,0.47335910842924545,0.4981983484544527,0.9820081105644527,0.1534575718112804,0.4423109963034437,0.3583995172911667,0.6079491556659549,0.3641705016144921,0.5145975717255702,0.48693765464871436,0.385146006082241,0.43201618984731466,0.4245275661502469,0.4541429788091076,0.4757582788941298,0.40646432191514004,0.72396728073466,0.47406785126511897,0.453213480681419,0.398895605407963,0.3844434934056804,0.3648503051408072,0.545152449697899,0.4008824019225292,0.48889850167260945,0.515285101488921,0.405299017166842,0.44009805895196663,0.45926246296443357,0.4630931767247252,0.3461888372131118,0.356596227941669,0.9945424576801324,0.43958675003398406,0.6455643167912337,0.6261273563077712,0.7406979291645774,0.33703258461373337,0.3645636113433247,0.5192161207150492,0.4800077504074084,0.3745824432876929,0.8209126140199277,0.4057380057310815,0.41543449903725194,0.36196140305561053,0.5833571705472034,0.4168189227214675,0.39501955585596166,0.3508198951721887,0.521192928694452,0.5753296380539962,0.39545362063124573,0.5542282608625356,0.4405568800857069,0.3739659966835466,0.9898570875283464,0.4489805522027555,0.34677224525461636,0.38033304521346806,0.418593943493913,0.3688148120193623,0.44793450774104143,0.35119847006571436,0.5717443025146697,0.3797846430226489,0.37775851545836336,0.8507638588930535,0.5146414302155973,0.34672115640777323,0.40652075516421793,0.3883732107963442,0.5210784173593936,0.5308340536195209,0.4476385593020792,0.3903362869444991,0.5236312205967645,0.4712983600030142,0.38095540058137817,0.996029951502027,0.45822975457788984,0.3988134180681081,0.3927441234737249,0.41422787089513224,0.801678051229553,0.7096356048991155,0.4506736137965319,0.40451378218748096,0.4888981181200644,0.5013278951893634,0.48074722471773923,0.4213979892040074,0.6179915396345144,0.3978457598615314,0.4163987262406688,0.38825242938622945,0.4000124807131107,0.524793961898619,0.4213501982906609,0.3480523219153038,0.3743038414769721,0.5278778779476561,0.4559122654493212,0.3741017056117364,0.3527920223567639,0.40447589668676165,0.5573649146116167,0.49135611725895006,0.39302768312448977,0.5431931906122618,0.4413452452617478,0.38124807061290716,0.9358449463946936,0.4484943954825562,0.41528230569833624,0.41432221710598216,0.36087286495095766,0.38197254085219234,0.42586022193902084,0.45286803129645187,0.43569580124018326,0.5032947548001699,0.4812611807741075,0.45904686435475817,0.38487545713089494,0.5350802584062994,0.43499579436198943,0.8668067336627823,0.4469315054305221,0.4433275871687691,0.459883681371156,0.45034644903942306,0.34697427118505697,0.42924170355207114,0.3679384164999765,0.6599561902619879,0.47735824407084393,0.4569429500623263,0.41926297672149565,0.575643028424046,0.442857232025297,0.39873769874134013,0.4209283433487404,0.6753717546671578,0.4165198307535296,0.38604853305314624,0.434937635956878,0.6808677490821433,0.4574814005066709,0.8929555902785503,0.6145998317366532,0.45176849010843206,0.7619466455006315,0.5196793527918423,0.5400442102917816,0.9978664578111694,0.4311641004822343,0.3093932232535669,0.35793695951322246,0.5494938225331174,0.39146256240795946,0.5229992359308615,0.4495546319407789,0.5923767621555197,0.4004543328083421,0.37597477672217705,0.47623057944087704,0.4206403276294248,0.41631657680158096,0.4493034342078104,0.41367576692262903,0.840128699408225,0.4492889983851852,0.36723017674729863,0.37260697515646135,1.0,0.413819560158432,0.4513323077433446,0.9845583722574335,0.4939354528870043,0.7468037570613002,0.360002220423451,0.40299006003422705,0.48784064118276005,0.6456051017695507,0.3703832772386639,0.4276145400217109,0.42909707571635936,0.5013672269380549,0.4478179766333253,0.5420300290898776,0.3672127918604474,0.4600636960846489,0.42117390117109127,0.3502012030953042,0.5193899592082601,0.3725177964186601,0.4855448186733133,0.3630261268742695,0.519845322892291,0.36269149089903224,0.6403308374501261,0.4077934692935462,0.42378576012561026,0.39266626316167363,0.3966515462098376,0.48484170888027683,0.4706663080457116,0.5911437728726036,0.42201376572902605,0.9974876180820712,0.4696923247974091,0.4233062299172896,0.5915468926174684,0.6523860244082809,0.4855366076275629,0.39330500087848386,0.3605219575890516,0.41290948560359103,0.3899831718136393,0.4954684200884578,0.43047688218010993,0.4379172718969168,0.4646013179297712,0.4043333831742303,0.4540318076980269,0.49123762875363314,0.33732422999378525,0.5188023538985296,0.4174193242750822,0.47266315115027513,0.4057157224428992,0.39644899791625987,0.43774968231852873,0.37673170851660026,0.4170993106003621,0.3840085785909432,0.3599652797704142,0.45567631246583584,0.47882650794921117,0.6658030707541467,0.44478222238012294,0.44581152713407973,0.39448674286559543,0.45416274613784136,0.3846924111263139,0.7602206586560469,0.614887473290482,0.45879325897388906,0.40337050953838677,0.3524133453930583,0.8720171777383704,0.4135648042667713,0.4252063988516969,0.36505444348632765,0.38040957057879,0.7072999794801262,0.38975165727303135,0.4083077361110735,0.4089443587304507,0.37559291972115016,0.5649195975395438,0.4225473592719021,0.4528496016344704,0.4665752707806502,0.4080955066214758,0.47794577356975787,0.3759892900011076,0.4252381787231987,0.5529311131896459,0.4386341351617955,0.8796392819214776,0.45878034897379977,0.47931893570185724,0.4864486496240796,0.572509530489189,0.7457637238292252,0.968531887739451,0.45534551774380694,0.43186341295119135,0.5719800679384716,0.998851831970875,0.40314430623316383,0.4540213651000257,0.4444964821379514,0.5377369453902531,0.6916699462132504,0.3843755348721779,0.45879348113148727,0.810405861076535,0.35689177041003595,0.3910714838872797,0.5733575853898756,0.46757804462580355,0.3896115033797283,0.4009218773932068,0.5921656342558104,0.5852276336680116,0.44359408820035495,0.407681191229686,0.4302868125849154,0.8526133003057632,0.4142858786520753,0.47484334079077295,0.6003605338710621,0.44793198894121355,0.4224405104915068,0.4711706171501209,0.600050670633533,0.6285615266902898,0.5632330666514613,0.5904624764473417,0.7324231985086431,0.7663384936466584,0.41669484781500404,0.7231902999939328,0.39852141435928456,0.3995145073543006,0.5114460100273002,0.6490363652206598,0.9557666038767205,0.4612431775243068,0.3541903876028304,0.4436982672782798,0.6949288995294793,0.3341837465810309,0.896343023600676,0.3819316994501546,0.43438270012263036,0.561262981737815,0.5683311589852118,0.7575947607824803,0.37102488170678316,0.45545304803969733,0.7793825752610328,0.3516605367033414,0.44488373047979557,0.3931103690970832,0.5385549918367377,0.3803776631578998,0.3652267886958035,0.4401284480593577,0.3646747333854542,0.41813414859136894],"x":[0.5352749418639813,3.1199030402978534,2.3418290664200514,1.5585588025553354,2.607195261899128,2.8466028715603473,3.7529624025622024,4.8172752005566055,2.7990252155043405,0.006649896483930107,1.2449464688740364,2.5123431977003152,3.15023584875659,3.4251064720706004,4.143328091857052,2.1918795740956276,0.16450876150481575,3.0664663997915453,2.3522624012802815,3.2694529349414516,3.197516560284861,3.367642579226616,3.0816414637691225,1.7830112107771934,4.980459978961223,1.7165805891806285,1.3675102457153443,3.5659876354320486,0.49537319305968497,1.578593645918156,0.9955985770098097,4.145590154240408,2.085660697827679,1.384662059466204,1.5709029501145289,0.30372868137103826,3.6005247050464306,2.269277818538521,3.4465020252933467,3.2173855228416604,2.859359985775031,0.32550183387274,0.25012978480354664,4.859611674213456,3.1313788030044543,2.1292243258932153,1.0146978674894946,1.749177068483171,3.140472044397323,3.754700587380265,0.5799531161657967,1.060349897346048,1.1197534799959985,3.046211718695575,4.969909797515437,4.577819759288295,1.0551252932941424,1.2538356602812162,1.2322500844094242,3.839819701729117,0.2881567270500818,3.9156898763332917,3.9762146404037715,3.965643184560345,2.372111387101181,1.9325135472488364,0.09187069647217938,3.2350531154891318,2.4409437539057075,4.487656537075005,0.00991625837043375,4.887322925058354,3.1749378711305187,2.9165656508509197,0.23491330286452894,1.4570058389620077,0.8563276975125411,3.101074052134142,1.5393671855277657,0.7940241649125068,1.388671477438207,4.35817701173514,0.2582738642529059,1.4443376729563373,2.61645923940565,1.6292566929612584,3.2710798210183487,4.995843713415687,4.472102690608455,4.322972503621544,2.417989325359786,0.15863465482536365,3.8358152771447553,2.2512903454418187,1.7663594131264926,0.49450207554175285,2.9122579950671934,0.4330553183052477,0.3497631292442327,4.041862755816817,3.500779657779194,2.434867047541206,2.351126599543545,3.7850319672799304,3.945349452943725,0.34248817059255865,3.676471404578497,4.715755709803816,2.7629056057598445,4.879328054199119,1.3804446955891758,3.85783417314188,0.18602581992847145,4.604856171451011,2.966876343377619,2.8592284994474992,4.824416919251692,4.257543809746604,1.6281130818064449,0.2702361720586588,1.1774925775494738,4.142600541082908,4.5285477079180945,2.483463558440314,0.7603329026188665,2.446727464657136,1.0871013251115158,4.168368540201613,3.156619239043903,3.412480590904531,3.5050800764819656,0.2438251125789681,3.3352676683344806,0.9894524796411419,1.223523482323896,3.6294330906845818,1.2297126008622472,0.0002940390032490914,1.9089856142165929,4.542324340096464,1.669432210096794,4.013930936102378,3.9389933290377623,1.967736579249667,1.16546455860024,4.3804439880498,2.987833133367835,3.8517963963563187,4.221679001675537,2.6944800830061686,0.9392721061725762,0.7153588010712197,0.6059802457419439,3.782843299450102,0.9194378778487766,4.018130857276697,3.712351165708423,3.054809971671645,0.3003058526663116,3.5722764984815947,3.6455350222619565,4.1840164466975125,0.027436468910877476,2.428099571180508,1.3867811071877723,2.04693739493486,4.670348283580323,4.687428635877728,2.053118492409598,3.2128747804075495,3.9587082360783787,2.3161234412051224,4.66759171051467,2.6662598551557046,0.38510794825986294,2.3149591676396586,4.117181388810841,4.012632006152806,2.501855807510461,1.414075202608458,4.320102923164908,4.892086900495542,4.7293524704227705,1.939421486189925,0.9635421246882081,2.1966827165586422,1.3120900495033483,4.177171124172274,4.275389422438346,0.7784061805888476,0.5731930444271005,4.258470144461606,2.0060881658589147,4.3077301551665546,1.3491023058509133,3.109693289450328,3.6693100542415227,3.943987205774638,1.5301290953794622,2.0416822446938543,0.5839331812776016,2.279673094453918,3.468112105886,3.000814949102333,2.9206110302353627,2.472554438073844,4.1919613100744035,1.6010182550388319,0.6714563622574976,3.34178784604649,1.3631214166582628,1.5725692035600825,0.77832161808148,0.03996029931192413,0.9939966009827705,2.3850228507062257,4.319642095610249,3.231384270423472,4.306422750933799,2.5989917754346337,3.975604675940584,4.23762356336843,4.356677421012528,4.562357564660728,4.808024540207798,2.589138396533647,2.7509791938159713,1.6756827178567624,0.6846882619754646,2.4971053981737135,2.1963545479262514,3.6515702500804625,4.493271739407216,3.3001885210999546,2.185268089692017,2.7532443016564025,3.3724720743996137,2.626458451279692,1.5919660950741166,3.557403784496478,1.3399191670408295,2.868233861127335,4.694926881433031,2.6994688728924707,2.8073342887858277,4.258882707571593,2.1035064952951945,4.231694468632876,2.341837527152195,0.6427573843730383,3.598872269032144,1.4214589581261938,4.215756711865022,0.17972193197944186,4.311793580333036,3.6227434968683605,2.2046726199963276,0.9338635581801225,3.631025363829987,4.66995547590905,4.336791775510067,1.119804764962612,0.5348054191271434,3.764017318438068,3.1840831766533007,4.604352455540235,3.289500241153659,3.0632913366579153,1.401357650677424,4.933293108206742,4.2964374728099965,4.807781336219418,3.2514606290855417,0.6035938389059192,4.524408749599256,3.810020155309201,1.6805944001298567,3.582743320844779,4.142935485040721,4.280318341368659,3.199009753415912,1.2323126304721033,4.554554585070038,3.214799941825426,0.7913317031978195,3.9827056932469462,0.824010955375265,3.302621094801598,0.11673027637361333,1.591004760773862,3.6929567659601767,1.6418315873912614,2.975446772782102,2.503574803478783,0.009196009482392853,3.502487712937794,3.4261502895526585,3.566198008175162,4.311317713763225,1.6234156884966588,2.10060301979032,2.787489732377443,0.7559965788516376,0.8220799117402577,3.677440345179568,2.489594827750168,2.241632668639891,0.14871926342663433,1.8204820160821478,4.604427315973549,0.09836813731072258,1.2654485038764496,4.984987955549266,1.0600810235953317,1.3789702494940936,2.477063011574229,4.685924697944458,4.169230167350447,1.3626388771066822,2.6263494205717617,4.294029343450097,0.8220346273197199,0.23080000827913172,0.8191870235489884,1.9841629691768436,4.0850740873827345,0.8377030134958896,3.9263432100112503,2.8668696923210044,4.863747060284903,4.5880541380734465,4.795773805643362,0.10299676588950368,4.988303445882323,1.6790846746543586,1.5643246401968858,0.8702275265493453,2.9393016046250198,1.6971323464489774,0.6224766812851013,4.784933763203082,3.5859063895968535,0.7682411963245206,2.1777438241855385,3.1431691678158122,1.4246276348896536,4.79727868105037,2.4879671215867036,1.4421334087213022,2.226123570375551,3.192315545603198,4.021848172627013,1.1572232416772543,1.892506063521029,2.8543892687684247,2.4018543753237753,0.8415430381930145,1.8742137791743296,4.245759034653831,0.4955395474978608,1.145369682440086,0.3062019997502796,2.6939958786171845,4.5269964136681615,2.362760859426535,1.6126492917509572,1.26824151615484,2.482430527712014,2.978711071976413,3.470214182317648,0.7568311720293697,0.6585093700695066,0.16424452559370084,3.4618243378437286,0.18062492240076833,1.5127726450949819,0.3698613323932576,4.520751361948979,4.0257059569675215,0.05937639592735744,3.6956538582692646,3.0231345993605983,0.9689526179061592,2.80524861843952,0.5415400167992546,1.5068385781306892,1.1358423714930588,4.909212145382522,3.750709494200671,4.928171860143493,3.646880058625912,1.7306038608539032,0.2604796596722303,4.594031400793388,4.8602187761873425,3.428389264208146,3.528122441237871,1.4623673098359546,3.4324916103230354,1.7750089772171818,4.154953793444643,3.835242696523573,1.385977379019715,0.8387684792955863,2.5723696610162596,2.226626467646784,0.7321438904131228,2.4320763092034445,0.4733273337745414,3.4240291861377745,0.5279928565282843,4.939459386140309,4.5458709932648205,2.2291909045791725,2.392946542385692,4.83116186765267,3.0732828784219093,4.303802009113676,2.1680076547395233,1.6931815523973592,3.929022353465037,0.9836505986507793,0.6420590356502132,3.0397449217147465,2.5499995938365574,2.109744816809714,2.212945608046918,1.7209368385192247,0.17854776933531658,4.730644266374929,1.535170656451571,3.0983037916826506,4.460194342013255,0.23712992075816675,2.789966976514149,1.9668047824872226,4.728601598745922,2.708044868762005,0.2604250190392865,3.074595056224293,0.03038918041489591,0.4077298874251656,0.2514434992878578,0.022017879985447575,2.8307138601349644,4.556088324044297,4.394791912780114,0.30228626505803935,4.822551528911286,3.7163688144275198,2.9328322868146337,1.700717252406757,0.776698626747413,4.84767787415194,3.41432657778305,0.7260808783091999,1.3506453726839829,3.6194317784884857,0.23409605201156425,4.263037364107952,4.383544241588437,3.0802324942893886,0.37445485357360364,4.905434198689239,3.8210553284842383,2.313670277124377,3.433120035573488,4.183884477505474,1.8564964226529201,4.948477586646134,4.827712455411021,1.0379502770529925,0.441613586791354,4.521255541699145,2.5788523790503612,3.336129591567829,4.523321954730539,0.7538544529254176,4.924458960034597,2.162109230009671,2.1832897960624997,4.709667137578057,4.822157191298489,0.15160514507143175,2.617358671502733,2.4429460748839094,0.8939317151452897,2.3443034229222826,0.966334760368216,0.05431744445773656,0.07567830400444286,0.3919437007075144,3.134524416650526,4.12642004609311,0.3369752881324495,3.5280571843333517,2.3825698572565512,4.331345365579622,2.784555621953052,1.4381058645226341,3.6210055639308205,4.821866369284056,2.101705999356782,2.571661603497569,2.3823496784630835,1.5462781407318449,4.584765336142511,2.896968186708272,4.414753730261159,4.117297035979317,1.8852611826101162,0.8440219618362654,2.475901564901817,2.7848183439489107,3.628647069244474,4.039069260419556,1.567199299933646,2.593381606695422,3.561454882749806,1.6292616994171427,1.679343858207194,1.380949475067469,1.8046848540213223,4.838811211154065,2.5912413303374935,1.4384826685243823,0.3250203034840582,3.2550789831935214,2.7342122271647673,4.133799641412174,4.2929147996245165,4.865026405593654,0.8780614579825341,1.3870215439654476,3.0292686437788117,3.7140135196911226,4.570081605770927,0.17098821071037884,0.23707414948427874,3.389463088084086,2.0842467003443255,0.5945342680375232,0.7588893083997716,2.2106792764077596,0.36799776725373934,4.142876782113035,2.109231631784442,4.346542202702209,1.22087955514805,3.259955339126437,0.40417297590613077,1.4049788146569298,2.3383407797251534,0.4265553139419087,4.203213731519905,2.8139056267712945,2.691964374423863,4.221354478915604,1.1205300910793425,4.4304671884782,4.363057504142935,4.8443198791459245,4.083972120563723,4.308527240769212,3.2898613787984132,1.1880135298215855,1.0902715776416527,2.7716667058811684,3.2685654491696123,0.6870287149780585,2.3720196805980542,0.18077300945555486,0.5335265274171175,3.321169563935303,4.039804857873141,3.0332528834401415,0.2206105434102168,2.009215440441916,4.238283613782169,3.7980754515244164,4.718256086843946,4.347699460744831,3.885662393652259,3.658104609998545,2.875214008473579,0.6848374951596015,2.9773773753211796,0.657507908907784,0.42945814384243275,1.369189906605467,0.042725506785501466,4.339049343003505,3.373797327896675,3.0701051846634764,4.6026672218351,1.3739422407849489,3.966454829629585,1.4086934517267657,1.207361472922719,0.8715941915851055,4.624090551086924,4.214536922742372,4.3092716920162175,0.2236886828998974,1.58803460666189,4.323812535375113,4.622963909746688,3.026915166312957,2.5026657956576557,0.6659072060376525,2.549083925645601,3.869174458275105,2.787457591824106,4.241664918997847,0.16637078501778757,0.16377027848131553,1.862911040056593,0.2686128925199849,4.898481058999095,1.54807464011386,2.252334838067517,0.6731438173080073,0.9745363521505157,1.5458147559150548,1.6881058437436425,1.1784179895030766,3.6056129077085233,0.3193659182554487,0.08681445757295125,4.605561674635354,1.5037252915303034,2.43067337333178,4.844847663436348,0.653008585387922,3.811971211298877,3.997011269645342,3.8059176419164507,0.978603633439975,0.6135754543467342,0.480020235847447,3.0458790441419623,3.1098720552939896,4.2792099195728746,3.8356277119121174,3.092901698742496,3.988252956922127,2.107564522243277,3.9258179701408844,4.4626919754765035,2.019978306111172,3.1121930602047607,0.7653978661809957,0.4656388171826187,2.1500034901240617,2.2189864142530826,4.657726592560264,3.7403337883822974,4.539354343568042,3.391765110946711,0.611912171289799,2.6670611236564024,0.7046258589549348,3.706195626709039,0.35908949853549643,3.868929992804965,3.2353103409859987,0.5899787540288115,2.1593647141847128,0.899348201624246,2.072584705082512,4.653790384593798,2.9677188609592884,1.0947486486644131,3.1143648789244462,3.3251884493018724,2.122820128636781,1.522870770989302,0.1702249261973221,4.663960466669094,1.5327510581355175,4.796399674715862,4.95342019949384,2.0879984820027033,3.854994511868457,3.2672610783593137,4.872637961771641,0.07308826173239358,0.01380216084625685,4.808850427229454,2.1644137965935673,4.728406234990717,1.261490011065518,2.0434544097198093,0.02456860611615319,0.10118797823552628,4.629972586862009,2.9319046573260543,0.5113835105909847,4.265339698108702,2.294005657339333,2.0271233829079236,0.11155793247983326,1.7258606576509339,1.8326680756677127,2.1713350515749994,0.031649102402655505,1.7617653318578885,4.86463713143959,1.5196392534296455,1.6758043398068312,4.554328801599463,0.5575714507859175,4.97859126694023,4.610231844806644,0.2694356979720758,0.6710712397484275,1.995325481369663,0.4852149573972331,3.7163810910380812,0.06700183894802536,4.953102216985217,1.3776179962231727,0.36423964227508154,2.7054754468098663,4.823604764226418,0.21639302468636212,1.9940489702256126,1.2979968224535143,4.7496773758998305,2.5446694276954016,3.3717496360749166,1.2440531715552805,2.4413210290107457,2.1177811576684933,0.9194772304246102,2.2385170755454475,3.408074088397741,2.162308351963426,1.047226965586443,1.5100781759083237,2.676440245091082,4.05813618326036,3.4036422679026943,1.7512433465945698,3.7674037798239546,2.8069849639504096,3.9504608482595316,1.5861420582472552,3.6600689754980884,0.9977859732432515,1.2343703264744854,1.1656338766169005,0.6320867051766055,3.405900490924135,2.8873632086004983,0.10633467659798557,0.16106225236969474,4.60874054143722,2.0273040635090664,0.6435915799138281,0.05998173573248389,2.4045688565724,4.130411504450234,2.2382098959673558,0.7576106976962016,1.680444907200247,4.259481223969783,0.8260918721293631,3.231234341052472,4.162308005523643,2.528206691195738,1.011991715697661,0.19347920901761184,1.2404422194143472,2.074630605762108,2.9241825977858547,4.015185993471443,2.004879413562949,4.107164004239767,4.6593235685031775,1.2248564336599355,4.3280936769122444,0.7954989999948991,3.7122767657924616,4.963837544287375,2.248111317840137,4.6925211246400735,4.3362599511442435,0.32382501768666305,2.4570296196419648,0.6666691095031685,2.971048175856874,3.927939041959317,4.399579210045935,2.36113650581205,1.8851336544356345,3.851017131165131,1.7634299523849417,0.8731310620071386,1.8580783883650664,1.8575753678593054,1.0776535137584287,2.4555186225065304,4.628607540545345,4.438061539432789,3.870746126228397,1.9841197269151367,1.9652085459668833,3.780770023583532,3.165990751531388,4.099357620503589,4.290781179835767,3.055746255466223,0.20139859232913948,0.44459403515300644,1.8474706698666599,1.1951079067650028,3.6702330760751933,1.383661990170807,3.175105836977851,1.8220648194526556,0.31472120993525476,4.2244849781913985,2.322986352389995,1.14597180111363,4.648437675359936,2.745787070475197,4.616486690323109,4.438856048502043,0.9132473615285486,1.1249990833512824,2.598493378572159,2.1408844023354723,4.696686820752275,2.2471834275142175,4.047146826952334,1.1342425290976221,0.09784526594991183,0.9785032934110505,3.843341231928931,2.8122071936386983,0.4318017325801349,2.140860687943853,3.049770641921865,4.752868658411024,4.529916184047794,4.703273741718456,0.3238166465993819,4.333800432277915,2.4295302244568164,0.49038593980985534,3.43912082886742,0.2810403791386651,3.4665997649776803,0.12538872935038414,4.787826853228099,0.6846041749576248,4.98723133870993,2.685127776181174,3.1776395748310096,1.069510682759629,1.6061017686452383,3.9596605720918463,4.164408619823391,3.211323307354567,2.453271544981871,3.6820989958206463,1.6808370978988152,2.6273015175088146,3.7459505629811787,3.2480771478060144,4.566991787449944,1.3860743325341007,0.3605469091453717,2.3901986677205214,1.0297166887061127,1.4482111050573332,3.013702204267006,2.4524103875851666,4.465162713226919,1.4417157549855208,4.130315414631621,4.731493175408904,0.49487471543733563,4.570079541357802,2.749657302649334,4.321726906137414,1.1838732027068477,1.6463019393376754,4.63927620452394,1.308700112109854,1.3605326899164871,1.5203437494514238,0.017086829439284523,2.983549657462412,3.945261602789032,3.187347535566772,2.912856601426811,4.330153255548419,0.6258874080437304,3.7863515517954616,0.9674195910687855,2.093547716118205,2.9656801703034064,4.288611846772373,2.596158611284698,0.25455195322150903,3.669406891440057,2.103535767994974,1.8136299890069763,0.8991193812301768,0.7967597970266338,4.1421213784847835,1.6249217729383203,1.217739313534213,2.5049128103155427,0.6234718995571087,3.500895817523706,3.0569955028237237,2.8376256407683274,4.697520228917618,2.3979829941954245,4.910330248634224,1.1469735979199325,1.736412187847376,4.231006834747322,3.3288039710570794,4.610097171890065,2.0219633287326753,2.666199134164623,2.948497039742727,4.85943934592716,3.5638772550492215,2.57715528186778,4.465116914770069,1.3475626516846495,3.5217901835389998,3.9972017532980675,1.5262884154553436,4.313306847157399,4.254456723905839,3.805279625049416,2.3180614073638783,1.236464068169466,3.557756525924739,4.864184783961201,0.5606742862799052,0.7450603768705277,4.741549832715231,2.9558460938084465,1.2632430199893285,2.499287981138832,3.454610288524802,2.4296566570670173,4.28416210021346,2.4588963709655687,2.5847660339650727,1.8360836699129057,2.024451060071807,2.684401559788471,3.0096352723738318,0.566023054444571,2.7630353338945213,1.6549668123446404,1.8975309331950763,3.6804989909309738,3.9188046423895404,3.3780818672110846,4.69207842562639,4.004980116483297,1.7517412073970817,3.280017848981057,2.488454375754067,2.614189169562231,2.2197106859712323,3.102266905913822,1.9112084364839543,4.821066885553133,0.34374450701059156,3.1577540544940508,4.96521580957059,0.0061927122497718035,3.073138062865949,0.7844070274176229,2.4341111276638285,4.466962877841447,3.297694520609127,4.816298074778524,1.0960990649063462,2.4709492279707934,4.5572066459961125,0.4567698527894837,4.400449084949182,1.8884635778176784,3.89788741048298,1.1500935069654172,0.6079761040154041,2.9123462678738576,0.09918287901784617,1.7827532565052473],"mu":[0.8510027063763721,0.9190044365680556,0.8801742631871794,0.8116952795739827,0.9335893139679758,0.46588425541034817,0.979014454319199,0.7758255806591166,0.6189254263244341,0.24049031939218835,0.5707529390833985,0.18689619277654068,0.9754032617464403,0.592779872052452,0.04138947205118537,0.18989277316240605,0.41942429751484456,0.08844474554452098,0.6280615254977173,0.3242345556979451,0.23143896440039757,0.15411333304922725,0.10695963071265635,0.06057457920541576,0.8812415668688884,0.33417423650571454,0.9806546813173775,0.10386108174701025,0.33348548131601774,0.20981536995780115,0.7298711672845892,0.6485655993479271,0.1963621090925438,0.3181260046968062,0.31129720434548847,0.15183752952042395,0.49386342075358436,0.157315599599682,0.04177065885720577,0.5784514419871438,0.029988878614214176,0.21404884673050417,0.732355335851707,0.7337030939292482,0.5072659418388634,0.2542962170129419,0.6301416653028489,0.8511931091413509,0.8607737507002868,0.004217645615716803,0.7661855032636378,0.5205189668325687,0.04805178049449643,0.3986184210885595,0.2120185884126804,0.2071057134584715,0.670879318818506,0.7827522265482985,0.05295997676257458,0.8031529817690746,0.36812799448933164,0.6062393693620474,0.7676083818726718,0.9113621055140735,0.1355189081133401,0.8629053101646713,0.8136142090193321,0.6148544459937739,0.8842333203315502,0.3959778607562068,0.7933466472843094,0.2887520546280027,0.2430388963707495,0.5032229444267375,0.8879085310967065,0.9372551670203142,0.6613755877693595,0.929100907017641,0.3502330111612961,0.7659880974114321,0.7499605917215053,0.1484725426934057,0.9963190703552443,0.5080862412317118,0.20352099725835515,0.4064543265198408,0.5474242036964927,0.781248817078626,0.4595010821134011,0.03230003640367296,0.24537962052577944,0.5620104226529812,0.7420990469794868,0.5811230332665498,0.20845238158409374,0.15541779585804205,0.7570150745672506,0.10671260955353423,0.8582711326394796,0.753497210991624,0.40959937475627517,0.7224219134388286,0.22003904760468163,0.14056522340798394,0.7952429829194494,0.6327912817731183,0.3187027162638998,0.12742806631165982,0.8456252616383104,0.46683852029432704,0.43967230589258754,0.8591118947842804,0.9863440836368531,0.3608438852140343,0.32793190607208933,0.9241067168614692,0.5958380780920751,0.1744558419750626,0.5647766223771646,0.931970370313685,0.6662444204389504,0.6725717866134033,0.8950760564266422,0.9748510452026913,0.1056668740424187,0.5714393438497116,0.3039877078896738,0.34985633158745877,0.9449828863261522,0.18346918283490177,0.12169747207983739,0.9870619516406436,0.8060072750678737,0.19929102970174073,0.12440038847716406,0.2834529396211718,0.5171789505903999,0.4097464009031311,0.9249353124486743,0.5649056748583243,0.18958467078553398,0.14211614543004303,0.15559065017188445,0.8990518334864761,0.9120550433082468,0.9421903663680069,0.07416798198696095,0.27459389699693415,0.7635274223322688,0.7770344242804743,0.39975284623223395,0.5376036969747382,0.29052260626047954,0.2734511953242036,0.503479436078522,0.6216506008526235,0.9682173682406754,0.1387300961765403,0.18875601239948225,0.563727596127825,0.5617153931412062,0.9875479000095899,0.8352782127257095,0.20685990909792284,0.5367842549624922,0.5491302383080587,0.02161286832348419,0.3741601604502951,0.035846894893797776,0.23758565307115553,0.00316286529093901,0.04575117338362222,0.3933811336115747,0.05535627193454329,0.5865786904873813,0.9333441592705023,0.9473631009466945,0.7060887146940982,0.38275576757629937,0.004364367714289941,0.2438742252126176,0.7696404143400106,0.02209244377174624,0.14271064661543398,0.05504836634119292,0.6707176377922082,0.867477084999194,0.2530073838113067,0.1595639093123018,0.29136745195091174,0.2272552484110424,0.3551719631535395,0.6193494250801197,0.58109512178887,0.8326057694975901,0.6143852451164862,0.4981879172436652,0.639997060427022,0.2409022416689499,0.2563847806711308,0.7699892782008368,0.44432729090352296,0.676777686587513,0.8039264202681471,0.9314413174580778,0.7598495042672353,0.06027249829926218,0.6895034744855613,0.18768290259288656,0.517448941430209,0.1949181765096739,0.5656825869265354,0.3516980510084917,0.1423108785802807,0.8109391523923706,0.7434198240839711,0.41661957034576735,0.4922575213659177,0.7808597128204866,0.21918869718029765,0.4262889218701196,0.3829452327079068,0.7765727032775862,0.3075589692780816,0.7981131085179833,0.16837629522562758,0.5980089592036975,0.014913877091431882,0.5476022752799079,0.33028256383767407,0.2708989331194105,0.798512429353115,0.26428421154067316,0.12052721907876118,0.009590712565077819,0.07264320929210188,0.3407203225580304,0.3938880183681077,0.05551373950035643,0.8415541535725355,0.34740303069087597,0.11169525613150322,0.3103801034621074,0.49275244784827543,0.9787586200170961,0.9708493000681819,0.8198075197654351,0.9816772485540486,0.2822919270578099,0.38122059548696696,0.8839373769657441,0.005812634920451032,0.7845474926144773,0.9100731623910172,0.1414113068624301,0.7581770024183452,0.7637691223743206,0.7755019969951327,0.09751689592779922,0.7670517300377333,0.9861524603747176,0.3449749805668536,0.2495381416072333,0.6348464389026522,0.38015661077846596,0.9426546205379678,0.5705038115010188,0.08062971914804562,0.7363940295590796,0.2636167189841321,0.559006400664936,0.3123634771166499,0.9192834809553267,0.07715536316176608,0.4409806787600228,0.4386650105025087,0.5452138438246845,0.9816515320070125,0.7515938273060998,0.32259331803201885,0.9895300627446628,0.9915431007629272,0.9479811811310468,0.5227225634419275,0.38081923957592556,0.11935607493338707,0.0568255903273569,0.35265461779438945,0.2418199402741874,0.7344979822352162,0.859069478801163,0.17785501798404213,0.8552912994193367,0.7100512877456961,0.41356537234992974,0.04924883776236322,0.14250165146251326,0.8223878093197463,0.006854320981506623,0.8124949137096682,0.9771126632446512,0.9709492798825654,0.23249453246879814,0.6025359221590787,0.47490871293604897,0.4421831337357496,0.14416845245824494,0.5743260716479057,0.071159450577583,0.03806172926765905,0.48895514773429083,0.5172385674586333,0.8206109972967028,0.9019947709479845,0.8559218666845039,0.8938214207009478,0.22317268120399514,0.887172810541238,0.062226264652462504,0.4836110886041012,0.12892024615706044,0.6618446424909885,0.9458459333825069,0.2330038134882122,0.2992251965820323,0.04202788914165234,0.555056728227828,0.2350266660946243,0.29686254210228524,0.8849202425461882,0.9048499007767954,0.6217625474743118,0.3086471408049656,0.26029443989454193,0.6904712036230656,0.6657084413230845,0.8776787694150403,0.14842310606996656,0.9763790164063191,0.9712896368174826,0.7017684924172483,0.42600900142234965,0.612492142364057,0.5103960912865608,0.5545103976737833,0.7379609881738096,0.04813461785116657,0.40956907536789466,0.9578885472457936,0.639080302412014,0.5879044315172222,0.2125374958533266,0.9540669354295914,0.08923943572797488,0.8122989049819336,0.39174122322744065,0.041924830130641855,0.4233996753864919,0.04035546842664717,0.1202508701979319,0.4844044113649091,0.5512956795650519,0.8206933322789067,0.7109377533624013,0.9674977205431059,0.20927403016754265,0.8791478809812017,0.42606537021586655,0.5496853186463853,0.9500350454085349,0.5790082665742595,0.6994914186223695,0.8736923833106012,0.3036507071334371,0.9122845275962994,0.1507582155579743,0.9095405882500942,0.12387865616822014,0.09551591872611498,0.8585544158191092,0.740187729782126,0.9737641276145159,0.12613328006426494,0.47975486578724347,0.6678153137552114,0.03339939760288635,0.8867643981362383,0.7815730692117036,0.17956383255522113,0.5106588506534266,0.33655790428081067,0.27707419297384805,0.6710558010154382,0.7960169748939323,0.7109949322195794,0.742211570266579,0.8801256022998034,0.7408920760553714,0.7747247269383544,0.10443888903824572,0.6608600370894397,0.18204800461602266,0.378379553781905,0.8019827974507749,0.7602225708903583,0.3489656401585457,0.5840935187929532,0.6336251743413674,0.34121323104425905,0.7450593481068386,0.9751571587031622,0.48804483684095556,0.39660809942681086,0.6395599927142406,0.22989082683717288,0.9921387212872776,0.6237116672217837,0.9930177246165479,0.9748789187898121,0.05110206252332583,0.7874343227290701,0.5171653590423353,0.23587691490106466,0.27661494181800395,0.41706584814189074,0.6619479767099579,0.856962725827098,0.31374028367379747,0.48947151926537913,0.4934015373918057,0.9642816085723509,0.688167306900298,0.6636736383053283,0.6781312916664757,0.40411144877193483,0.3059557447575709,0.88795904630477,0.9130756814664751,0.9248844155485032,0.011594829425401354,0.6338568414796819,0.3008598092798178,0.1657181951121527,0.5270987179740112,0.32008237847553866,0.8658854646488012,0.9811489861098208,0.4156639839602465,0.45216243574242987,0.6605303237733684,0.732057990143731,0.6794139946388227,0.2890285544392146,0.393415271498067,0.4902772379522422,0.07419974595071133,0.7015739346977179,0.8988879601300774,0.7877269727276321,0.40998179055910366,0.7970192781322198,0.5843562190746583,0.5671554986235761,0.5851435026244147,0.2912971936900499,0.2373700457381902,0.6598568858441693,0.8313967331284282,0.009324487609299936,0.20352854531667064,0.42140452011644114,0.0801420467555296,0.968880222379034,0.411696069987896,0.8829310971724535,0.7224166326941519,0.49166402266357956,0.37636773896709963,0.7196778035507567,0.4369525955213216,0.25531849924193795,0.45526902303016725,0.8707602003019557,0.9436525738675627,0.836881298201813,0.5702331533793066,0.7842219041831444,0.36948392534064656,0.5007260569037777,0.4737618825702534,0.025667100101089968,0.037392048793336796,0.5767309182025167,0.30082353965849884,0.1980876466474173,0.6367360893737752,0.9860887838967498,0.951169423845331,0.33257792145941867,0.27982444150298913,0.7957436592541078,0.4817596428365729,0.29405713206747075,0.41185309702866557,0.2902194107620064,0.33976587966528426,0.7468276305682302,0.46102024859342894,0.09280372224260103,0.09685902227242416,0.5227202432583935,0.3247453632626791,0.7135147511685951,0.8679791662262912,0.9212877171833118,0.9200003748682228,0.9070628641656446,0.4642294623780596,0.5424419480773623,0.5921317725982365,0.4669836628436934,0.9047189717770654,0.7194008352900148,0.5326726589795037,0.828429006214231,0.33446426078243885,0.8945697698656505,0.14364005705436567,0.6474003779481254,0.33114257355994225,0.23672414280680054,0.6041804973579803,0.4084851139689174,0.2790453643435473,0.9323981802221257,0.9580436514494373,0.7476287933936816,0.028305670537803307,0.7373207140910776,0.10650191891394178,0.2528223449751492,0.48897625196182437,0.09857674446946674,0.9139788054038109,0.32317422549344843,0.43891398246862523,0.08925558921226151,0.3319902464823201,0.2720968288121115,0.6905809643181997,0.6145592736223098,0.3792142018559106,0.29953789457737146,0.9333742718497915,0.8099799527511538,0.7657555709788082,0.7013258092524659,0.9950235538343393,0.9444894472943894,0.9765073586894557,0.7669417929215161,0.7144336960640212,0.4399345955869971,0.1859900012456448,0.3323430360407913,0.08999234516292165,0.676466354382385,0.8218429533686185,0.9466926790611521,0.9261520734417021,0.3323991031353184,0.9791300097631943,0.13482246519949004,0.9298310104344019,0.7830793638922793,0.6325899361255587,0.06682663114032583,0.13393869133310599,0.9780369474084698,0.297245679060407,0.036968629520918395,0.7532115144813696,0.27619686188256765,0.9291873921567468,0.7802327076629387,0.16785670628040328,0.028656198193018678,0.40531335118850964,0.09940138801056775,0.3404398949332923,0.6790144514126049,0.9003073082794579,0.42370148919915307,0.4953074601368608,0.560256616717846,0.26997547770943475,0.7514438325854258,0.09872866873664399,0.6742138881809425,0.46114447680314585,0.9449821287226403,0.8157009608115191,0.6862045990587122,0.6434389153152169,0.8155703814778206,0.9587975394258661,0.15368541918345424,0.849592280329255,0.8210129694216146,0.7499800345372405,0.9710338726098486,0.6575648912250314,0.5769399284946517,0.1504248027227708,0.23517834160819762,0.5060376794025205,0.20736357908786562,0.1498517898191718,0.9640510848812771,0.7203866492975388,0.1450654032730323,0.7616912841059942,0.584268485766765,0.8563101751966984,0.18930237796582094,0.17184549902670687,0.23563467853866338,0.5891511530388165,0.7436487678705932,0.032341021457998886,0.2552552775506156,0.8484958221242187,0.18762426005673616,0.9800885175462797,0.12087033747815523,0.6328391348053894,0.7022107889470888,0.8904026115104204,0.8412157194430729,0.969532945066961,0.16019144165984822,0.20794131889332923,0.772829038276615,0.018974425265865458,0.27209925667726487,0.577421198682287,0.4591620165852066,0.3736216330396651,0.6434007625113636,0.3498962471067646,0.769840362138799,0.15711301961140012,0.7212637536366069,0.8541003449761551,0.4929285245160371,0.6849561413802818,0.9200272962765668,0.7780797988911836,0.9407402419643238,0.6917626020771359,0.12137187056514853,0.9955121377351321,0.3188833188453848,0.4751323013327806,0.9871005477096295,0.27043366472691543,0.06222140539883214,0.4223141894895601,0.11424797648009855,0.8204538930750058,0.26927156781793826,0.8754614500366731,0.3488638899219565,0.7453261791202503,0.10782812313312173,0.6082498179069731,0.9227575591688582,0.2671489770275084,0.30276911672130336,0.9717695502583692,0.5888108764251774,0.231435539759119,0.25662248703183765,0.7563120028021748,0.24450468705449047,0.9812286583281269,0.30918556988419477,0.4328130740478815,0.4695856377881342,0.7466434082199558,0.028787953705853075,0.8549132053690107,0.25789620025047033,0.6299444789534054,0.239174334257112,0.6154420632932427,0.0028171532644458708,0.3397531409629462,0.5032886645048844,0.2883272152679379,0.014646242621098704,0.4325821190782826,0.15637944600315734,0.38479686821226555,0.7193264081168276,0.38685819397669796,0.9620881473106169,0.961730588556323,0.2762786650512419,0.9290458730599009,0.7907720486613332,0.45451529933264534,0.5359860358334927,0.6796725106779828,0.9856077409431165,0.1027297005895953,0.4104135820932675,0.46028240373134777,0.4211182964981617,0.8888790170541854,0.5142151862331445,0.785368592317707,0.15344231869162228,0.0672866608674807,0.03431459617341903,0.5693204270747878,0.9071872503660967,0.46948232618313823,0.16915658777577636,0.23237957606888648,0.5986448054963698,0.5050626458359018,0.7835712565142205,0.9068231347930484,0.5867539113607612,0.3229939255306933,0.9380415484406561,0.8344327275315013,0.05474035453446091,0.45693645383081694,0.3805823083793878,0.12299225581309847,0.5307069097303709,0.1451285918446239,0.42370609385839386,0.4008216071714339,0.6638043444158508,0.484245507899453,0.7759615445719374,0.39241261486353385,0.01298400675319411,0.7552633721733906,0.23880192610595108,0.7839665598308627,0.36559609703586493,0.8013078787447963,0.07326487211860355,0.08930160350050231,0.48512707155203616,0.34803915104010197,0.7495745711733843,0.701624226613744,0.24726189364657358,0.049989711220818966,0.30732010790498987,0.12918118664476408,0.9606493742242439,0.1444070136922717,0.3766870923370229,0.19403795243196487,0.2182448555281591,0.36150954346652675,0.3823548422858172,0.8310427785214836,0.7389339581808274,0.6637138703870167,0.5864670821560418,0.47963207030876354,0.896865253741769,0.838718454835744,0.3317675379774485,0.05148796314924531,0.40238891915712927,0.551602887949876,0.87893019236355,0.7798608333945045,0.9835232826960776,0.09370781835675834,0.726186843141374,0.055328129482180355,0.6643507035334084,0.38128844552803054,0.2511615209886984,0.16243998657530279,0.7656654742210809,0.0006859009780890712,0.44408574703657866,0.13205654779296205,0.07154481214069941,0.4803679274045627,0.10894099360327703,0.8677999883880314,0.4861757689536448,0.7913565965192508,0.33350461397816633,0.1820668964486465,0.4613679568587792,0.5166306404218348,0.9819756946886018,0.8146801582651717,0.3613794356120512,0.9099080181804888,0.4941028664455156,0.9564771028770278,0.7480583146428788,0.9054992281271719,0.7608986728597655,0.2481685638913793,0.9217135498018214,0.6100089061674627,0.9907310690442066,0.25976605462418934,0.5418640235244627,0.6668602565227593,0.615682274329427,0.40751024275797554,0.2906305383943919,0.21610436658735743,0.7341007289216606,0.9471549025870185,0.9830356810349594,0.6722053404974353,0.29402147919889066,0.13434582741677992,0.3316054594230966,0.5123901999035423,0.6532744762788838,0.42410977852944587,0.20981289611102927,0.1939970808608309,0.6064261992351843,0.3424294971972113,0.20115392485615047,0.13306799082588516,0.4785390308580766,0.7895275675020292,0.0320861873393512,0.35959170173337207,0.044936063730611986,0.6722079710598721,0.9774968741573695,0.41131527228851517,0.2301196512531838,0.6828611386698629,0.3182454695949455,0.34468346197448874,0.7479661257359327,0.580418400955033,0.694834483325989,0.4011014190287918,0.8384000829697096,0.8844200596002965,0.32156152563290097,0.731507983712526,0.28001945448831855,0.7282315169810738,0.16816600319976072,0.4038225888160736,0.2103911191165273,0.4850313418501555,0.07304785038181483,0.9044531520450279,0.23575539328494655,0.6092284366072389,0.2830078428298315,0.12583049549629588,0.47159730104085895,0.011626527752043536,0.9209440766149213,0.533934851779952,0.2769744034667483,0.5693707473876759,0.02618017055320343,0.7608106386170101,0.29824910534502647,0.7379618967661963,0.5136141006858839,0.6675108097157296,0.9187737716042121,0.8783180975073017,0.906542656994002,0.1178441498908509,0.6583706596140704,0.30816796109873446,0.8502461724769146,0.9872774986594417,0.3549175175770749,0.46569834127181875,0.9338815416526554,0.29477705438686974,0.22065421919382766,0.5109030674006498,0.18599680745006641,0.27281476335196286,0.21053979662430944,0.919295958546124,0.5450430502586021,0.18232940610699666,0.31121338997197245,0.44871208800155404,0.9851178667803564,0.527553284065374,0.204829293945745,0.46166812950598457,0.007528676826335623,0.5471664137055563,0.2093039096751661,0.21211464235916,0.5998408702459705,0.7068528867299773,0.7652255520316611,0.3222780908531817,0.4774698739264347,0.7237751785376683,0.748662189021549,0.2666776027224349,0.17950324046252342,0.8743172252502402,0.3184937727630308,0.6868694041980539,0.7498928240516289,0.4346336877999668,0.4863954093033289,0.7447967226956307,0.07501155232491152,0.09702728621678336,0.35808393316457976,0.5808453579523001,0.6366408487220063,0.27166097714971427,0.8832210736847894,0.1171268008360431,0.8472715893612826,0.9297781043263085,0.7651256809063092,0.02347599503868736,0.8778533911302557,0.5029115375483739,0.868054320331932,0.16827165537911215,0.34568263880759353,0.9370518548999645,0.072221303962136,0.20912142064374573,0.8734175874542514,0.8313625217470564,0.012178644845100006,0.9206013383523526,0.03852271793558315,0.8913438134403258,0.3947714809056142,0.2997735741587366,0.7573148629816815,0.2174894605256521,0.3409383569331812,0.29775584091531515,0.4363714222139745,0.26964414167730366,0.6696223662077883,0.9106458844330729,0.8014709114926142,0.2719370887680179,0.9714980790402443,0.989110961785622,0.5393081584314603,0.12154396943016876,0.2074811233383127,0.4248784398546013,0.9696334449803725,0.021132588759277038,0.29616388283147455,0.12048977452998666,0.592769958463913,0.025070252535946747,0.04012642572421332,0.4175286595764178,0.15880781490058138,0.1685779502835194,0.9734245308542286,0.34254173955776057,0.18712661057489366,0.6954681583134652,0.8723743440871934,0.9675164180327489,0.6541184895876291,0.48671262154818273,0.714363870635472,0.4562887660568258,0.2658930297363804,0.28348700960497686],"beta":[8.320875237568558,2.339385320715497,8.135405826607478,8.046177150434023,11.39891258612106,5.089100332187506,15.718663346350903,5.411408076870932,5.613643162541937,1.1060981581801421,18.487837759943297,1.4094278752211409,1.1012812622052692,3.684004460493324,8.118342130658638,7.748216137295625,10.95845117284098,4.0483949029350175,1.3894954119610325,18.521980078913348,2.208514597715121,14.942282236625015,15.231478658978176,3.3556194937196393,6.494629171277806,19.351975919167632,0.8770863397895123,15.053974526482206,18.931714316179658,5.269413680744965,14.17195585242073,10.541556537110178,0.8471037995745601,11.64186283395091,18.500986154664545,4.765127360265491,3.114469510234872,19.008574269871275,17.392445765957717,14.349358552041256,4.729812495290648,10.87788421637713,10.426842439315095,7.2552335046581895,7.075098639417217,17.054930700027555,19.62052161609863,18.731812376908877,8.507011853151493,14.281570176128739,0.43715950995748987,1.791067823045207,15.392497523461813,3.341036465899676,2.173922877481349,1.3609261339867684,13.718872570580803,19.820997372512473,12.825659728922334,11.247145450004211,3.6819721038616615,19.65583934201392,6.873854057098749,10.125451487521357,7.006863458776835,17.1095540044507,14.513728460483426,13.153012228371562,14.686108745420832,14.053269124494268,11.756105900067745,1.4205738952945879,6.049884534242116,19.90560077186947,19.944012949573562,9.771572556877466,15.595976948879562,7.536237247963311,11.059286346971152,15.326358824197332,18.4277341728054,9.167588512416348,11.881811550356733,18.1035135900498,14.975790886413623,14.496402844042855,3.639773499471839,10.735352481307881,6.9782949487003165,12.419177712196019,18.75957354738144,6.483730858416328,0.5052656236803976,9.440950143812387,0.76270752609918,0.7158528685210008,12.453450382136978,6.471445795326747,6.256849861819225,8.861122409223029,5.9653281567049365,6.432369414248518,10.725918835881437,9.723850992591782,17.911019815073075,4.997925285199969,16.554578038296007,2.0826204219664834,12.374765877652209,9.76065060886107,3.089105433719559,14.587274608623627,2.653604412401962,7.707625000045297,18.835549012732685,2.037981406835634,7.726480444914414,17.686376960050065,10.763133526510607,17.588316389414352,17.34833830041854,11.952533774908423,17.153661787253714,6.446902135922108,6.573654631136763,10.541919959547545,13.284507545850769,18.701982417728708,9.107803586163975,6.23015166517412,19.175785481769168,10.781308136838534,12.192383282818003,12.2444456552855,11.143608515013895,7.352395933790921,8.570806828375485,4.162014932500702,14.02354860523543,12.445399411313684,10.50045312755547,16.060878327197614,13.657535743694854,12.598722145197758,9.325786175941072,10.658541528811671,1.711020226598161,19.616785228336518,15.960881414946368,12.502415202022625,1.0948125516900475,12.649804046993435,7.680402934283412,6.87166332910631,16.848105103513674,4.032236353027248,4.643012224851981,11.084568960074023,17.340222656397152,7.0646615984053,0.6475721819574032,13.201942061262258,7.570052870402928,19.07526591627817,2.0315481692792003,18.773780409548273,18.367966773285616,2.702859263036359,2.9210877241327404,9.27101579217982,18.527680744835564,10.374520332246524,4.787758770106709,9.443961080398227,6.340543054723207,6.894150424923624,1.3851436145834128,19.40655801724146,5.768554825621615,12.927928280909278,0.009589226723107913,14.896611210422561,8.635623200989366,15.056289276480364,6.030849969500727,4.891045438003294,1.9225702111112986,4.3864157183341845,11.236212210996257,7.899963766464602,2.6421275333252625,4.656768407872476,0.2718123220127744,0.868983536693384,0.51158994910812,2.285648421018238,0.6263775765199542,0.46177460482186294,0.8353349586703374,4.440873764972975,1.7140643949680001,13.659177740575768,12.31645033142649,10.359761210760748,17.215931752493432,10.385779244883677,9.944319058185048,7.77760928365129,16.58010467989059,2.3575691051058323,0.9776154490760458,1.0785704349538694,2.5508709427904375,6.360608536537318,11.871191123455457,9.298554770493134,0.5452103656420615,7.391858778670253,15.845555962057931,4.202666726832569,13.6639389440385,1.9531755333020495,7.448138888056133,18.19074506488874,5.816324525882806,7.620825674539988,19.20913864975605,1.4051581528540957,7.0934087303073,12.781935931099362,2.148227049982947,15.810325332891333,13.867720895761302,15.571292277501962,14.889009035841209,3.673978685039705,3.675585161719366,0.9711453862779784,0.08233048134612897,3.2681399649599996,12.425602075557848,15.254988373618023,19.40247417593838,5.205243801911883,8.717407621028471,4.276363240735073,4.5245561409213275,4.137499467968593,16.312666973739788,7.603197680577525,7.457551733967982,12.864136008120912,1.1076398421792444,4.408889646644227,11.314692244675037,19.12776379068662,8.844751580242228,13.117440762564772,17.382445371838976,4.829715291383718,2.29779639262663,2.638811403375505,9.72216188567931,9.358602626322252,16.645211488563024,3.264604535648754,5.140748617746125,16.102456993310984,11.391314253387822,3.237140959850242,5.28351659904565,1.0487502378046365,9.419703257445855,13.331783357219438,18.125519070308066,12.123825028059736,10.89243843488742,15.552880374587508,19.788206754905428,10.892302050795358,17.130876090474175,17.80652599423003,8.927478129099011,5.2621933321735614,11.624692608254428,0.8406000167019823,16.963449349251523,5.852466302261985,1.319572883267588,6.453537124700817,15.530333370051292,1.318704962658539,4.28866397523306,4.332058398949048,13.338313881599525,15.329238213608205,6.244947240962322,4.111315839879808,1.901480453710156,6.5118981398059095,11.605067146733754,14.060653119818438,13.122157453342309,7.779026438825931,15.73981340431736,8.433951149159235,6.8071405503778815,0.29960185781084725,0.12870601759668698,6.442365635801099,3.888597527179174,13.97450254152098,3.6562541614594446,18.29922461864193,4.467976994246037,7.6572828622432665,13.741994906211126,18.584477767163836,0.9480411434857006,2.9908991004019336,9.873778312853986,11.857308053709978,18.719294550500948,6.2170140123000595,2.909057298063553,8.429442920835681,7.637848343274363,14.218732221788208,1.513918690780689,15.366198229463759,19.19481071350485,15.071810140910644,14.781815539444544,12.84970680403398,9.019508903891928,4.327322467025869,13.577714025932979,7.769339674020848,7.302521878251067,10.271749298296612,10.709820039275506,13.603981246945732,3.4868466282266652,17.635899902381635,7.636759644832107,11.216357592520815,17.926820931289043,0.00019678636624220758,1.1878435223598993,6.93576456061086,3.8726684036111303,13.115789634386093,16.416859925932826,3.756281418579621,17.607372838660464,4.654741720788191,10.71447753710142,6.054529294289681,1.5815339846269127,19.16346809108091,16.731146614494893,4.100960246572227,1.0901971886551154,12.363136308669755,7.406690555648736,12.08438437141497,15.932076649091691,6.428714079856439,10.064335500702285,12.19636298603131,18.093295337877166,13.238191389479654,4.914458617986881,13.14897883573343,7.7850351493548064,4.284717535952374,12.651271621263405,2.3515133472630145,13.310902087215165,12.82559684500713,5.8019245730557945,1.2615199175777203,12.660020434085926,9.03758933870353,12.14405809160632,18.40268172106013,16.397428550387417,9.548029707103929,8.638459967885481,10.929825612379794,2.2093283216055815,16.410811069721994,3.1943741695294703,14.174303213041611,9.292635456829338,11.675434728507458,3.9416819319779073,5.785516637644825,17.077486660903993,9.401161098560289,0.4753133973478185,13.89006296617621,6.960507248734813,8.065011363917481,18.325612306128754,17.589762428631467,18.953605748535804,8.495466508014529,12.137806478801902,7.695026264941114,2.5529590793313295,17.501877660639455,14.143179384769255,10.093230311458207,13.409735351578806,4.103570157959204,10.642567822204416,5.135848669286878,18.654206215801807,15.72297470169216,0.7283852212166186,16.483528116235515,11.09476618611124,13.366968794594696,19.55144688002393,4.992418792460143,11.643675115941825,12.914609469552282,1.9109773818674602,2.297837824483042,17.07310713128951,2.359094359102385,3.922904689237079,2.7311865810808067,19.38350563995065,16.719613293603516,15.155662197268725,0.7588643420363228,4.1734427913863525,19.152339438254078,0.5986262165300893,3.819076704076738,5.885184694429579,12.550352247263842,11.836567126689355,15.168270558388222,2.68943790130892,8.215977178250302,0.4339152865395013,19.115037178282197,6.6414462234069305,3.704104022041985,18.95777687651877,1.8673316620310043,5.634318051846456,15.866625164335083,18.904114976505255,17.56595477279458,7.734347297978119,8.490540291576632,15.760892014229082,9.40573894934349,10.213283309132631,6.578990049097508,14.665370497698312,2.6764155078239593,1.7664647851868986,4.5462710813540586,18.387274879787196,3.660627542501933,1.083188464810676,1.3654042071813643,3.890631443522614,12.569084779063097,0.9468743260583823,7.916670506008594,4.296136481526509,10.723035119898384,2.4341265313476734,10.599276600605524,6.531438276678347,12.583919008984402,12.080272657055652,18.632877466795378,5.343234071506449,12.929119564093696,10.267246687958789,10.10467859744642,16.31852432572594,8.241020150207312,15.64542415780406,0.6060830048831223,19.960709439269472,10.628975984857746,16.023817950579552,0.6351256620642776,19.895248905746428,17.300837033157958,0.4426940486928199,17.315016965398563,11.694318576158054,9.001168749089995,13.840191489835195,4.752413569942311,14.45573007447399,4.725960165527772,5.935722110698922,9.848336981519834,14.868474798744003,11.174715426845708,10.87807305583186,4.821852196863121,6.273351915053391,6.202208804886924,0.49857061207173814,0.15678508424194604,12.442915677655177,19.39975077702812,18.841926151332796,4.17834094603259,13.824836462191726,15.353355178290947,8.302600438437203,1.2159148553508459,12.080808366566838,12.542673368908254,9.97916703168146,8.23463987971568,16.941472948561895,15.52838842848633,12.310037711046613,8.986030335695645,17.251483713251933,4.3424551829426505,14.752546279063132,11.942684088071305,14.966332500079025,16.64282162334716,10.091577757160266,5.582498256153636,2.1026747971525372,13.27925390369018,5.705366547924506,7.400942776517367,17.50581057665869,16.993987998824455,0.5509287270129715,9.601935005656447,1.815161135906127,6.836456391807122,0.20211848384959374,18.529767024179513,11.71364435106895,4.53215406728237,4.537059948349329,17.37779745368576,5.691661257018814,1.9575568895045459,7.539969142555694,6.3134912385009745,16.297089885394826,9.65716243315776,5.668717163957915,14.24531086416357,7.024191980630343,16.18683349691758,12.283649413969485,15.616003334372483,14.376300230116659,13.011623453563885,4.634362677877433,19.365650142239215,6.494162653870261,14.385116080281723,4.064067821185708,0.7468737251386104,19.213995073702886,17.483070134195344,3.179754801028447,13.332170367767668,16.059053084128827,3.3719154569319887,17.531331459895604,8.196670129376113,0.001768150002985358,3.7486408401296956,6.492303209316153,5.977802002105013,18.119765214419033,6.379764322052566,14.744537983178226,5.442367028186634,19.337649819570316,12.727203193498578,17.38630262772787,19.99589093690834,15.187086139460938,15.727328072049787,17.47429869377701,7.428208028080592,6.361371075173627,8.057323617195218,9.56032812829175,5.936178507095349,19.47364668490303,7.420583266191958,12.529374580103498,18.583059001130692,3.255633269574787,16.86655499639518,13.945551103160575,10.781616914636821,6.609985289236193,17.135056406815423,4.737714149473908,9.664869296124387,9.028434901144644,4.676872987553469,18.833745269337278,12.707564019298449,17.889070113749366,10.591452715934885,15.812087984899685,17.52027075704236,7.3843109925000405,5.534222694232693,18.124824194017375,1.2633876378511966,7.3268200010982065,17.070940338398714,7.053656175621352,10.352165104045227,19.71427151283683,5.143430149040018,4.881544368274779,0.7808030682660894,16.20363018064037,4.788622061382317,17.63504030020073,7.91017727456663,0.23581931012944146,4.426934968288396,5.275787185388046,15.019798977795,4.892310515540315,14.591493559491564,18.81675898082966,10.164820999663604,5.680961565539269,12.525054686071787,15.084981239302234,2.0656892677913907,2.684728976491626,1.9125817910414566,8.856083240925239,12.664833085921563,9.708967075559345,10.409856471943506,0.6114156748709121,0.12709939039730056,12.499879082581646,11.286921865467487,4.854064655420829,11.50976869405621,7.047486746732905,9.010876125231118,11.240255178688754,9.91487886719697,5.079054996987451,5.2932118127301475,14.749411668109364,19.912484867180975,0.6600312910122064,8.099632884385247,13.751644928180271,17.94329061019119,13.323764026115935,11.77100055761203,8.726961601779992,6.244968700080489,12.573726175310682,11.4910380999057,17.974300404804797,15.687361520200106,12.049705602681456,14.876016886016888,4.001928097938663,13.659330822545463,0.833188689306148,7.229392358575817,5.686990909851333,0.5357755736056902,1.483722159936831,7.2110572043834065,15.308884135873683,9.502836079934113,9.469739653352338,9.419034246841802,2.318198058820129,19.4559928433722,15.526133857115397,19.954769050840277,2.5391122960218038,10.852530126778586,19.664173622264162,7.657104175127696,1.8672237139774506,6.58454928480241,16.572967780249037,1.4161122795176517,18.93159226796851,6.228566669114364,0.9687559152813474,17.691325059863374,12.475282482737317,16.78562772750366,11.461529564385193,9.805911797978478,15.02862371110561,18.119261861806137,7.633611750416289,18.297770289574547,7.8487862164520505,1.4475633228921048,11.708490703053599,6.132920083192177,10.328747450362027,14.864902496888188,10.703813457223244,5.061910105263201,12.694857339082866,12.098449509297122,3.806901797400233,4.253930186421582,9.358893899085988,0.34657627696248916,9.961076321752863,15.773389583081588,14.673094725957277,8.337563522289027,1.5210657293294005,3.6776560643548084,12.662480192485521,16.102438257793228,9.992154383761026,6.49705669686468,10.554120158618012,7.548424003845637,3.9437819396853246,7.423760767349141,9.234643404212903,7.406410810153949,4.49696383805565,5.973966134018571,17.290639176065365,12.888449466318598,5.027273366104628,10.087526890233733,6.386030896439117,17.4731403456899,16.809711227358456,17.090957514302318,7.232020267736772,6.4045758323651825,6.581998931067314,3.1413505497980188,16.413637184679317,18.75458778606675,1.0519864697245795,17.970416085527443,17.87873277808813,5.1392540413084475,9.91628993688864,10.684174721909852,8.440905898059409,9.701632143472004,18.49832217626174,4.05614679322468,10.260815261287988,15.266907735204192,19.324143964595248,9.109586109609204,2.1432299543282696,1.6247447653894165,18.869814696111323,7.111020477150887,14.683521449330872,18.77443772032307,7.076708047959817,14.33431614772351,14.461876010022362,2.9493579788641133,12.182942022462253,17.338935333331406,11.386743026129022,3.1739529280327217,16.605307589019965,19.42619753580539,5.540121426859357,1.473110347515183,13.187953055352853,4.247310928253949,10.746236167219173,4.01342035159892,16.69359329941809,1.693269252174976,2.115124005979756,6.299951140486257,2.148952899075214,5.547931051626422,7.7176889387934455,0.5498334635601143,14.820314469316237,4.728525522948002,11.22703451271506,1.8365661207228667,6.768777292606032,7.892322015894382,2.0643767593153672,3.9645795771125325,9.376519032747467,2.4971477542647946,12.33279212605272,11.5091263493721,4.016244659171595,19.011428445220616,19.672615053162204,2.5180292088344736,16.61084131292641,19.212327541335373,11.046770769293923,0.018391207461858627,14.751945554390291,19.94729035258618,0.46015277312856817,10.126486096540726,0.3906615528489388,15.235930084232013,8.04216699050658,11.004894822833107,2.6687412946141853,13.1310332293421,11.895051516118498,17.4495393586729,11.537888466727221,17.083936155477947,9.526924948096429,19.741864076297023,16.945343113369972,12.089306531416266,10.13269888853924,7.158492782087595,4.038542358590251,8.563756865001455,14.618044611606953,10.471566119397092,4.492869523502834,5.454303963039191,18.3090192081467,18.202406037184943,3.4275280447445766,9.218168795196181,11.2614880897996,12.135291739267755,4.558565065167359,11.68186793019859,0.5870971651182266,4.558475826688824,15.982848881699523,5.060947877788289,3.7322856157820317,11.268065456639103,16.630794045207406,12.433421080028477,17.173185765929453,15.034743340207925,2.762983864199149,17.560881984188796,7.997498278559201,14.788952549394011,11.735329315254614,15.073167010502484,13.7854018719357,3.1980583686566355,10.141073594965784,14.894890431969866,13.198812114142058,5.011910039199128,9.358860165069327,19.687816385923345,16.71111599920366,9.26121853298747,19.653974511287473,13.529476282468881,8.858005289853814,9.667915739826736,3.148793559348655,11.624872068814728,15.917456532643737,4.574093630003491,15.069984991034158,9.98545886068667,1.4740452880403643,3.735438850075812,16.34206166968513,17.354999556942104,6.907617772704793,1.7539153865647172,14.396529611258675,8.724718818387057,11.198863431223609,7.902276789805529,3.712854972604327,19.553964117589256,10.990760675115915,17.502935515065374,19.751501357387756,5.8703053521426085,16.4761625887788,9.147010999683975,14.490636148646395,18.95077981315531,14.607632790225287,19.195605176775903,6.3102911180255505,7.57465656488677,16.27747533001502,1.8189373215102078,6.827303094183299,6.439869242143801,6.71047040452728,7.578179751420788,2.5093603226461214,0.5322235634531447,18.298978241261995,7.155115545732116,5.433773191670039,0.5047052297043253,9.26680992434935,17.110042767497834,16.075115670918436,7.725275556921978,1.4738593103712283,6.8371373385791845,11.190884141587718,3.1038138432775453,10.617918281142371,3.838534229369932,6.603916723866479,10.166646728681656,15.52351612445599,17.370322647796588,5.233279978247944,3.5580970257318167,16.45997756513157,15.014333115112155,15.094808980183988,0.4986205574401392,15.7025410629267,6.084775095210002,3.885940912130863,1.2143162108423189,13.47564693410539,5.056060843870376,2.316729223677245,4.409330670460907,6.274447721068754,4.850560484389321,3.447758440282116,2.3375245480731,7.140965022078616,2.6696825215682107,18.191524015359057,18.874962273221282,4.204035189701512,3.5539251850642595,0.5503457869159156,17.145604827512074,16.816211867127517,15.11600454611019,4.619391233767565,1.2460724967424275,1.1210951536613578,19.87417806010088,13.173556398210561,7.376918095944696,5.49872234984071,3.6266394708514227,14.347398979989103,8.860609571580689,3.1455585656991847,5.412413994801946,16.737212374900167,13.417508502404608,6.759724282090769,19.522587258225897,14.754112241466064,12.428720419539117,19.1369896406118,10.941968495309368]}
},{}],95:[function(require,module,exports){
module.exports={"expected":[0.00044561847256815746,3.3910519724372737e-9,0.00019855011516101712,1.688374798503548e-6,0.0,8.686586819202656e-58,6.558155231527142e-8,0.00013620185402952312,0.0009473418015483633,0.0,0.0005817714448578742,2.1285765559835974e-121,0.0,8.395735936301042e-8,0.004393591440046482,0.0,0.0,8.381830304106332e-7,1.9061669938842394e-21,1.918032419660908e-20,0.0,0.0,1.3088836192715624e-65,1.3480337880389697e-97,0.10901061370375302,9.977039130748384e-79,0.0026322111910145906,0.04044056486431846,5.5515159304185023e-11,0.006218370491774272,5.491392972558127e-44,0.0,1.3172220372414102e-12,2.5312774978713176e-6,1.309350224187183e-236,4.6422480004730135e-6,0.0,0.0002451394907032219,6.401521854042518e-14,1.674521071457238e-5,0.007691356806969058,0.0,8.695970081759257e-9,7.14817927360204e-58,0.0001982570943025964,9.999539009916197e-34,1.5867562242807872e-5,0.0,0.0,0.07978108146431304,1.17126766358504e-146,4.3110664595747515e-13,2.0265709110991297e-71,0.0,9.856163830491648e-294,3.6169285478530923e-12,0.06309395022857804,0.0,3.252593875103186e-9,0.0,8.355753394700579e-12,0.08744427166980845,1.1380259717592562e-45,0.00997429959474858,7.04620566629818e-46,1.0020909803346008e-15,8.740343031523716e-27,4.70031272664792e-118,2.8065286264885463e-7,2.4894041990538378e-142,2.318153963482633e-74,0.0,0.0,0.0,1.1223137906156933e-35,0.0,6.529324130993297e-26,8.967143648100115e-79,0.015110292478066435,4.617903757193106e-23,5.360604484861191e-90,0.019212508075738058,0.32560180596572164,5.688250120978244e-13,0.0,1.2843903658945388e-6,0.0,6.449485284628867e-48,3.9880716369317735e-6,0.01960860413265484,0.0,0.0,7.822192626466121e-6,0.0,0.01333110422355966,1.50551845520271e-17,0.0,3.718230781715968e-184,0.0,1.1490149504204164e-89,0.0,1.2120197717382044e-33,0.27668581155068883,0.0,0.026892748548336114,8.953082331275678e-9,4.716223105573162e-69,0.0,1.8696026428999381e-6,0.0,0.0,1.5205081651363867e-45,0.020298963157420746,7.61797633471756e-7,2.1125058094045076e-18,4.875625762196103e-12,2.31922423287684e-34,3.405938636118844e-24,0.0,0.0,0.004318885629894914,0.0,0.0,3.0875343728404214e-17,1.6371684267432966e-200,1.047282432812468e-288,0.01659500719649104,1.5458025361781255e-5,1.5751601815237486e-80,0.06270339022838271,6.264356256106185e-9,0.066320904504832,0.001793689509035356,0.0,0.05688301984028634,5.122811935964932e-5,0.0,0.0,0.0001705744298250127,5.224034405321248e-16,0.0,0.0,3.869038600766019e-21,0.0,3.2040846818241145e-7,3.773042756673964e-19,8.666169945518481e-7,0.005144202702795735,0.010807672045270217,1.3765901431731521e-11,0.0,0.0,5.734530792781655e-223,0.00021916074702774558,0.0,0.006689338174194005,0.0,1.5199232602009773e-135,0.0,0.0,0.0,0.0,0.0,5.064083975740385e-309,0.09986764140765221,1.3662645689327758e-11,0.0,0.15075271510913194,0.0,7.304424409554136e-33,3.687957696433973e-24,7.780722150318422e-268,0.15227374964654547,0.00170880919339197,0.0018033460564000963,1.0622438520529198e-12,1.2763647716734389e-42,0.0005355155742049393,4.815529950642035e-193,3.4730770494612895e-106,0.0,7.164136601892513e-25,3.0364740549259603e-227,0.011873724763032471,2.478404827159589e-51,1.8571297800247304e-70,1.506246074555954e-23,0.00013530033568571738,1.0303975175684601e-5,0.0,0.020063225525135713,4.748223062283811e-65,4.909965240906543e-120,7.602097230168492e-11,4.643372399562728e-45,3.817885120862646e-10,2.1800001194166773e-20,0.0,0.009863437131898791,0.0,0.003539134560962906,0.0,4.007225580542975e-5,1.1097781250545824e-26,0.0,1.2533707296161508e-5,5.742495962436414e-10,5.360562084377554e-6,8.373925098654355e-18,0.020757151705347716,0.0006788442852035752,2.0756950123587716e-154,1.9992734535528743e-13,0.0,0.0005952580997584883,0.0,2.2838166396497124e-17,0.0001598121172934726,0.15210772519697835,7.070983466089321e-44,1.4443149725328657e-126,0.0007059932337731291,0.0,5.3254792465022605e-48,2.9615098243858776e-8,0.0003355107613287027,0.0,8.322936914667682e-175,4.656360921981387e-6,6.442696826731103e-8,1.6897182148436278e-8,1.1355033302770536e-8,3.2868291610112433e-6,0.0,0.0,6.829818538188794e-31,1.9001968823457318e-5,3.3702189322055517e-43,9.383435225599051e-5,0.0,1.3385375102277345e-39,0.0,1.264396680178804e-7,0.0003030517067020927,2.7458879640989054e-19,1.970432736891147e-65,1.478998183133013e-50,7.145369642787871e-144,6.16825177624943e-12,0.0,3.805297032193029e-8,0.0,0.0,2.6977893435726537e-5,0.0,0.0,0.0394190963316212,0.0,0.0,0.0,3.2016958623715495e-6,1.5735885203522823e-77,0.003147109531291605,0.0,9.883772413512052e-81,0.00018028687590869447,0.0,0.0,1.4204897528077865e-19,6.355321307451665e-192,1.3790071978645293e-44,0.0,0.0,1.7892692961717234e-78,3.316016869610556e-117,1.0681377314226484e-235,0.0,0.010332152651303397,0.0,0.0,0.0006837756668780406,0.0,0.0,0.030369304222051415,7.139437404480937e-12,0.0,1.1241660015734848e-26,1.0813679185348497e-5,9.868870767413323e-8,0.0,9.304439671427794e-15,3.5268455440805495e-290,0.0,0.12637579387882802,0.0,0.0,0.00012499520113178511,0.0,1.1713462436222276e-12,0.0,0.006638725707310196,0.0,0.0,0.0,0.0,0.0353484837394048,0.0,5.326418156941528e-33,0.0006868071961821773,4.5317084570078025e-12,0.0,0.0,0.0,0.0,0.00024958328818150416,0.020961851873119674,9.466010541286145e-58,0.0,3.106902217527999e-8,5.288036065992645e-19,2.5683507780954014e-10,7.467931093799542e-180,0.0004097691290246976,0.0,1.7796989042685134e-7,4.407026398419756e-77,9.870407524121512e-142,7.296258093820395e-5,0.0,0.0,0.0007651274930530455,5.145803651174586e-108,3.979491069354624e-19,2.2909341823683917e-50,3.934589396344579e-54,0.15785693612672178,0.0,2.7898857355142847e-8,2.626003455230509e-13,0.0002122728489147933,0.0,0.03436321243298755,1.8379623380556924e-27,0.0,0.01249895506939712,2.0652743725879446e-9,0.0,3.830384945156207e-39,0.0,7.220110028682099e-156,0.02203355333716908,0.0,0.0,2.6690368312050143e-21,0.07883895295466692,0.004182338001010986,9.155730063073399e-85,0.03974245986174186,0.0,1.7107344138532594e-169,0.0,0.0,2.372016018401968e-10,0.0062413682563351456,0.0,0.002507284718048963,2.1697057084606308e-95,0.00020658315824508483,9.730053887661478e-19,0.0,1.2722415431112808e-126,1.2186179928404135e-12,1.0306164757611983e-6,0.0,0.0,0.0,1.3514393752182839e-6,1.1096519864901713e-17,2.6581048886203962e-5,1.1259632104282456e-13,3.5386614228240765e-237,6.140722465411425e-11,0.022015719241148354,3.8515975802529235e-14,6.988133335253798e-11,0.0,0.0,0.03831744876367013,3.8639719430834e-7,0.0,0.008072198456987553,1.4645171705847838e-5,4.510584888631057e-20,0.0,2.537880284511486e-115,8.0270766086427e-6,2.0740240176579334e-6,0.0,0.0,5.620396202580042e-137,0.2577802690949146,0.0,0.0,5.684796941227105e-13,4.678864973747574e-6,0.0,0.0,0.0,8.305425577493845e-13,0.0,0.14470411661846097,0.006558057737302489,0.29329781588023685,1.9492165743613917e-32,0.002153242086300958,5.067684021725843e-5,3.6646863849279093e-6,0.0020270659764037393,4.931829076275236e-43,0.00023406094476943095,2.676430963455289e-33,0.0,0.03901888333000743,0.00047805082919473224,0.0007618039588750147,0.011039268136366609,2.4893073176407206e-14,0.0007594061508276206,0.0,1.304138415272262e-9,0.0,5.113977239413476e-15,2.432649690474506e-36,0.0,0.0,9.733588452075639e-272,0.0,0.0,6.395218727909446e-6,4.905836532124131e-16,0.0,1.8318002071578863e-7,3.910996256934123e-22,0.0,0.21976180041349408,8.435876453648457e-9,0.0,2.523973089780263e-25,7.251889178509263e-5,0.15644763060680195,1.0003400741623173e-5,0.0,0.0,0.04074893928301429,0.0,0.0,1.859789619781469e-8,0.0,2.6537649349838396e-16,2.2349429983112858e-79,2.7269203536351833e-157,0.0,0.2732212964330979,3.4774796134630094e-21,3.3305582344724485e-208,3.7722406587897306e-32,0.0,0.0,0.0,0.0,3.273040390977584e-8,2.482383014605818e-65,0.012602317447140968,0.0001394738770422617,9.428127899922696e-51,2.839805466060254e-13,0.0,0.1550307031888042,2.495592238600197e-54,1.2360193205733247e-7,5.954699582686542e-31,0.0,3.6228092467711485e-12,1.9925599858305846e-27,1.7051022367399197e-18,4.517706195574167e-6,0.0,0.00018659362574702948,1.2832169224779791e-8,7.177926935424077e-51,4.378508157236542e-14,0.0,0.0009258074465675514,0.00025762886890242536,0.0,7.911897202824432e-12,7.037787189403682e-195,1.5719886323615453e-30,1.9889498785575904e-5,0.0,0.12729602623480163,7.004339208774303e-9,0.0,9.11586137943804e-7,4.4926459308081634e-11,0.007468400382602765,0.13518176914222185,0.020406554384112777,1.6722955059838276e-32,1.1244760992420318e-11,0.030932827231031253,0.0,9.145464559284473e-8,0.0,1.1588821015200098e-23,0.0,6.747671162825838e-104,0.0,3.1046445211765776e-16,0.01134462243224994,0.0,1.1503937672836478e-30,4.069715341646689e-16,0.0,5.350768466282226e-13,1.183443751556408e-22,0.0075736453441017475,0.0025311446115430392,0.0,0.00012069294806361244,9.134545745549305e-6,0.0004030629057739586,0.0,0.0,0.0,0.042057402764848845,0.05036481354466902,0.0,4.3200540683348813e-26,0.0,0.0,0.0,0.0,4.7491316326707344e-6,1.6738387437714578e-10,3.883303775120713e-6,0.06532916961674702,0.0,0.0,0.0,4.892551496767057e-15,4.835446186979413e-5,0.0,0.0,0.0,0.0,3.1663991220396297e-65,4.178280849644319e-5,0.0,8.736491726716192e-13,2.18859098786542e-23,0.05988593772972499,0.0,0.00037358000581057726,2.998189466361771e-20,5.503766237344318e-125,0.0028909970090260626,3.388713307831561e-26,0.0,6.665081452990115e-6,0.0,3.2554230612613636e-8,0.0,4.609140878191298e-60,0.0,5.698633815520358e-114,0.001126043153272862,0.0,4.518107055261282e-12,3.374373698504642e-11,0.0,0.015112402194239382,0.0,0.0032920201182233093,0.0,0.0,0.0,0.00023626196517341751,0.0,4.6986758579241e-111,2.9602510448956317e-48,6.925186403985328e-9,4.0473797503831774e-21,2.064873353071124e-5,2.2191048091969834e-5,0.0,0.03505219203966391,5.4660972644491344e-5,0.0,0.022123903506562535,0.0,9.711192878734246e-13,0.016136391465178073,8.712255179971307e-15,1.6679938543769732e-14,2.808479591854193e-7,8.617293741926053e-5,6.7031630256135745e-15,2.9509912719331497e-9,3.3420500985859895e-5,0.0,0.00013034398231865873,0.1759180956512673,3.906242155110376e-97,0.0,5.919784809979486e-191,0.0013995183917932929,3.9864148947333764e-8,1.2416637338995906e-236,0.0,0.0042043666549217715,0.07774344460830815,0.0,6.067684263903657e-9,3.918635055800729e-27,1.9357268894468876e-37,7.214171810802482e-32,0.0,0.0,0.004623191882921423,0.00821744706282044,0.0256718888292713,0.0,5.729331007235568e-6,3.122308181219841e-8,0.0,0.0,0.0,0.000480015629721411,8.705776942028877e-50,0.0,0.0,2.0220787174832793e-142,1.7889315455847164e-28,0.0,4.0906186418840277e-187,4.766041173622352e-12,4.408503594977157e-8,0.002479132588133163,0.0,0.04762644134569274,0.003420087812792967,7.036668445902521e-5,0.0,1.3429419591233603e-5,8.959906632120938e-78,0.0,0.0032166889918540816,6.06677730673578e-16,0.002940060344480946,0.0,7.525734050937055e-5,0.0,0.0,0.0,0.0,2.3092818538034253e-26,0.0,5.696624320968491e-9,1.0756232006833831e-66,0.002775799513912551,0.0,0.0,1.6742748560149908e-5,1.4357207657556007e-14,7.609354130722163e-16,1.8506703034297307e-13,0.0,0.01003939538209836,6.8990155346528584e-9,2.52144035558121e-117,6.621967772492569e-118,3.040399035255477e-8,1.367627624508991e-238,0.0,2.347810065431707e-5,3.634148339278866e-31,0.0,4.786843144355231e-17,0.0,3.4805782675886053e-7,5.559071762264251e-40,0.0,1.1715386978554198e-8,0.0,8.75982314115934e-16,6.431199208078314e-12,1.6942340339837313e-158,1.2760513454787904e-22,0.012043479044673825,0.0,7.089894070737925e-87,0.0,0.01298339472155117,0.0,0.0,0.01965550494911545,0.00021316391214058742,2.3231634686608867e-241,2.9961559268238736e-6,2.8001778275675638e-8,0.018109729562884504,0.007463516008274894,0.0,0.0004396085704791116,7.371345377711011e-16,2.2242542245968804e-5,8.931035985946933e-8,0.0,3.438606882342577e-42,4.547078736046086e-5,2.5723025769071064e-22,1.704350228086483e-5,3.325566519730095e-17,1.9976165635350223e-15,0.0036708577926695646,0.0144315112559712,2.665150862075679e-13,2.1007476722686447e-63,2.777712922096461e-17,0.06874929401372569,0.0007392579470862561,0.012340679395123753,0.0,0.00022030230496507196,1.123344580523315e-141,1.6643431399400625e-19,6.864665442053215e-33,4.146323260060201e-9,1.5239375984411017e-42,1.0223460968607645e-6,7.190131369340889e-35,0.10901481305580672,6.515548173506344e-6,1.9633095629761626e-22,0.0,0.0,1.4831300590910378e-19,0.0,0.0,5.416122713165627e-63,5.629809724425342e-20,0.0008246427783357084,1.5244811745212142e-6,0.0,2.031909117370877e-22,2.979945081447754e-16,8.930486734834295e-5,0.23820478871690515,0.0,1.1599829032771486e-9,0.0,9.84720808321444e-59,1.2182856712653263e-7,0.001645023678076651,0.00015517484305590243,0.0,0.0005143690853776897,0.0,0.0,0.0,1.0520132377723204e-15,2.9184145559020472e-55,6.634267632271725e-159,2.3370775904129593e-6,0.0157126913623731,0.031274718287250286,9.739019790228685e-123,0.0,3.1346920558047507e-13,4.296131015209101e-16,4.72008853635169e-169,0.0,7.074919361220047e-5,0.0,0.0,1.8901102027963952e-39,1.808738609813291e-27,5.733567040766048e-5,1.4888051296471042e-13,4.4372751462200386e-58,3.92578095648289e-21,1.8856004738416382e-20,1.91183501189859e-5,0.0,3.6194086255000885e-91,1.6110932795325995e-6,0.025854183851786332,1.0911827946947283e-66,3.7187472856703065e-29,2.0466283397814851e-10,0.0020033806249579816,2.659734150637163e-144,0.0,2.0288789978908516e-18,1.833574667120816e-8,4.7901016349591925e-9,3.165212543446985e-5,0.0,0.0,0.0,1.0307937521098772e-165,4.522186584499035e-81,1.4967919689579195e-59,0.0011542149415472765,0.0,1.343887348374399e-9,0.0,1.275201240474167e-7,6.673532176347506e-19,0.00042331945417842373,0.0,8.817327772945818e-172,1.6957231879635097e-13,2.350254190774566e-8,0.1059030970739017,0.0,1.5028030211362394e-11,1.1525502043327052e-41,0.01866903750865074,0.0,0.0,0.0021184822729262186,0.0,8.246253137820158e-155,1.897551890170922e-36,1.1632113186256748e-65,1.2647136229664075e-10,2.0281808242379232e-18,0.0017031012418883798,0.0,0.0,3.2776267369100167e-7,7.141599231436137e-16,0.0,3.586401262995478e-164,1.7808224122254062e-6,4.527182456184883e-8,3.559044768263053e-7,0.0003154377108322458,0.0,0.0,0.00019214935446688783,0.0,0.0,1.0424028735597214e-8,0.00044246457155170527,2.8939508865476194e-14,0.0,0.2852208107287328,1.7153383741223154e-8,0.0,0.07904187123868076,1.1139992680464818e-27,0.0,0.0,0.0,0.0003022107574053437,3.296178542707962e-9,3.3115671272923486e-15,8.723444671561582e-139,4.083770173613904e-12,8.145553741174087e-6,4.0805163711622294e-7,1.4960725694670427e-7,0.05037907443140525,0.0,6.645879795283098e-23,0.0,0.0014801504361466576,8.829416694001302e-56,9.116386428789756e-9,0.0,1.1558433578892532e-7,0.0005332222159863454,0.0,0.007449183694884808,0.0,0.0,0.1085793991925979,1.3106325872769806e-12,0.0,4.543555622073647e-60,0.0,9.435731629037639e-21,0.010114898888816193,4.859653205710144e-24,1.1398994974767979e-19,5.54568908076282e-8,1.2560872751544391e-6,1.6536594558803519e-28,1.4152142474317229e-8,0.0,0.0,0.0,0.0,6.898859447580794e-15,0.11594570867816234,0.0,0.0,9.518994222055589e-14,0.08333958828226562,3.648745592976559e-29,3.4480552119534406e-5,0.0,0.0,2.635191563213222e-76,3.3505197977370726e-8,0.0,0.0026218770349808905,0.0,1.7585655703967453e-18,1.3739751294196954e-34,0.0,1.1880418158906873e-74,2.86764048836387e-92,3.322157300018876e-83,0.02484983778945668,0.0,0.0,7.545034706091174e-139,4.086096795113565e-8,5.446727419659368e-182,1.599149362915146e-28,0.00816160324199946,0.0,1.6187166894059027e-73,0.0,0.0,0.0027041155969199215,0.0008999107985717565,6.801136123672545e-22,0.0,0.0,6.874285113019263e-19,1.2412609776060828e-39,0.0,1.1255289016747578e-24,0.0,3.7266409220122223e-13,0.00018730050904695997,0.0,1.0256781099136933e-28,3.6627660600939946e-7,0.0611818216593146,5.381167948254577e-192,0.09304850237801346,8.925456672586333e-56,0.09430122168393724,0.0,0.0001093555839395815,9.110623844056889e-5,0.0,0.023381854724905574,0.013473931589948751,0.00011892852730601275,0.0,1.0837055398301967e-107,0.0,9.052978620522519e-108,6.232703917006191e-6,0.018197215573116828,7.142670504177729e-74,2.1820063648842312e-39,8.776624541237407e-5,0.0,0.05786668546584314,0.0,0.13517741042954348,9.902313884646594e-48,8.432089462751739e-24,0.0,0.008820874671304577,0.00020000756968417766,4.383592858786749e-9,7.07058722149537e-178,0.0008319177411662154,4.930833304427575e-6,4.0042401900443696e-211,2.4666472902094476e-9,1.725853811723933e-7,2.055151726922809e-26,0.0,0.006775585253586331,8.568825625568085e-15,0.25331486531710534,3.65784108106043e-266,0.005502161261991238,4.77454029763185e-61,0.0],"x":[-18.54399206430641,-11.709415735785772,-14.747726965497137,-17.333816547181694,-18.225358606782645,-18.583901957889417,-18.908505415874245,-15.191163275240648,-16.48312944206319,-16.303733691246233,-12.75083434423239,-17.350910873408488,-18.778535695263667,-15.133954426404934,-12.767638461556576,-16.46180227298254,-19.09313008647658,-13.698327557191103,-16.14751024221156,-12.519908192098285,-16.72713882688013,-18.06487945987394,-18.907891778358305,-16.48809663231274,-10.666385316634111,-19.65610763960185,-11.747136721381624,-10.051620116049476,-17.29036120395997,-11.4291104138971,-11.344025971480578,-18.883837184379693,-16.177224830824652,-15.031341860080008,-14.953530256683754,-13.547148994042066,-13.869919384276292,-17.23746072563889,-18.431491701608945,-12.805293667710373,-13.233303859233592,-16.588776390100342,-14.143500675704333,-13.460659738173975,-15.440351952664939,-18.719546674325606,-18.36187023718643,-15.556492708503525,-15.597696107379166,-13.270350445192008,-16.151998183071818,-15.991035029928556,-18.264914597161454,-10.220480214984747,-19.106354672919167,-18.169683376149255,-11.681754956257016,-19.891001819289087,-17.38445576938828,-19.11737759830312,-15.81067594516016,-11.884372048228322,-14.24234133302027,-11.746279531355077,-17.487750704250054,-14.464037866516543,-15.729497252438133,-19.68251784442885,-12.250204732834156,-14.833747639477293,-17.689449615519734,-18.4343162667789,-14.35709671156741,-17.60944681535007,-11.490600624696498,-15.445794359310494,-11.585325027694989,-16.973375164925745,-10.92698953500977,-18.856790140130812,-19.65262997166761,-10.770003097500773,-10.04583565243272,-15.427566391386595,-18.466722903479212,-10.407171555417731,-16.909841921556332,-17.060296024965062,-19.560993720956393,-12.219405047471026,-14.756004604782806,-16.841613736733073,-12.585730458107992,-19.96519332079488,-16.080710308056126,-18.408291473211122,-12.352742230056057,-19.238854428106034,-19.06610879787078,-19.559741849694024,-17.048923757416322,-16.819629605451134,-10.627612492757578,-19.459953763934216,-10.014195169983658,-18.44827795933249,-19.148481845071082,-16.547285936978,-11.810455068083655,-14.785032011466122,-11.420671338619506,-13.431421124698312,-10.453550716297375,-16.79683917761082,-18.998969067131924,-11.135875020091593,-10.160945035701662,-18.786474902092117,-18.628753300751512,-16.04711282719654,-14.42147716056473,-19.859287749943853,-17.34530282034189,-13.590086751529775,-17.37550987063321,-17.400836111625804,-12.059480715499674,-10.714777958524559,-14.424657579450386,-11.373743732189732,-17.129537545424895,-10.08661291410926,-13.221050722751812,-16.20829682441315,-12.561333517251686,-16.598839659437203,-15.252869657435264,-17.634355744276387,-15.379254772467872,-12.40565894388514,-10.959342184962413,-18.92871750000068,-16.75696712536288,-18.872276783207155,-19.859128558892152,-15.243001485713119,-19.576022507265552,-16.61807894211227,-16.36497401834091,-13.074127483112342,-17.712274810779448,-16.462212465044566,-12.828453291051197,-11.764410649671497,-15.344519602041677,-10.765332546004203,-15.238906297044055,-18.203744968699567,-17.36134457665254,-13.366692104643166,-18.87380655001811,-19.951114184122304,-10.315913047166756,-19.51512139128867,-10.990593912669102,-16.955099947458407,-16.960595746463014,-11.699904001827983,-17.863676072032913,-17.783430442926775,-12.007616513311666,-10.263691653325349,-10.168558014109987,-13.459957016566213,-11.137957061638295,-17.005633666362638,-14.636384644377882,-11.140247950765911,-17.189802840990072,-19.694151559665475,-18.481899300575684,-13.510594413378227,-19.209998684639537,-10.173685780844037,-13.607646943764117,-12.898167012341418,-15.743525805459955,-17.88187458505621,-14.34400411311369,-18.91475915098553,-10.174374141516928,-19.361517029643405,-13.614887820020149,-16.073848971522075,-18.19399235824585,-11.220421924598533,-18.57778490519368,-12.024537781179706,-10.534170682535116,-18.890512192935343,-13.50521396963769,-18.834463656203518,-10.631561061974715,-13.884497068893406,-11.585887954977824,-17.770948316220473,-13.989286138198604,-12.476252754885977,-18.16843767013415,-11.915550652487145,-16.379893230170207,-19.0955515101701,-16.36523001730113,-13.010668934563363,-11.890277190813201,-17.366811897400552,-16.721839728200933,-15.181338601564452,-12.217017137102042,-15.004585871349667,-18.318341913273702,-16.073043224457667,-18.92102554417448,-15.55805079421292,-13.403258606074996,-11.72499735755082,-13.894243735351981,-18.718154235676124,-10.9874026155825,-16.682998646386235,-15.452986564561659,-11.097222520150602,-14.567097115310656,-16.259684044149807,-16.43598459842282,-15.861213434058438,-11.10314799694293,-11.014286589277127,-11.026430335838329,-18.398126099888422,-17.459612958057775,-14.866299738262443,-13.843220911750773,-13.495209642416858,-15.813933586037246,-14.37874154130025,-15.68092352727627,-10.60547132502305,-18.019587945185386,-11.686777903880126,-12.822716481025216,-15.348321750838032,-17.37660352671944,-11.625610990777993,-17.366155326693256,-14.284827478979752,-12.058605496593787,-13.25735022319359,-19.792348405831856,-10.688844616695965,-12.219646521871727,-11.624158034194767,-11.377467715928951,-12.336054725297263,-15.242849829028968,-11.335604782090831,-17.76271293406539,-18.299419111796343,-15.354491040240019,-19.970490049100793,-13.995591670609475,-18.71144576710527,-12.406868227175622,-13.797281456821622,-15.6943455779736,-19.54779781930062,-17.52618293935157,-11.234228271522653,-19.967362744864186,-14.869350561217459,-18.240118830761162,-19.49008335459969,-18.99323881019371,-10.9955265446182,-13.78564030186029,-14.59682168009923,-18.60204761645658,-18.426290738581486,-15.515907308955668,-14.985726671041288,-12.699582686626126,-17.19340854098722,-12.797188997555107,-10.553324705334168,-13.730986185794439,-15.977595054885327,-13.09158821739663,-18.295529521443783,-12.7243409711678,-19.154696280671587,-11.17366048037503,-12.635780009119,-12.115667379810791,-12.983728193431235,-12.662212054118873,-10.103750890936485,-19.177092754549804,-12.730789510862897,-12.12807807950745,-17.39950226927706,-18.088296724852327,-14.425335171481885,-16.81426126810716,-16.63118877300145,-17.22686447650043,-11.99411501811818,-15.747180449377423,-18.827750083756122,-10.348414219442372,-18.642492104582033,-14.379156582722917,-10.164479414902539,-12.406088984824715,-17.854325489474082,-14.930441803996242,-16.799324620480977,-18.930730895682977,-15.40877138730557,-12.125640408318523,-18.867091199565916,-15.538480233421051,-15.376131427403566,-16.715741244000995,-17.462190761441512,-17.205959455426353,-10.746827053406928,-19.554193352405957,-18.853051291884352,-11.255941488001472,-14.729152402333572,-17.593795018000872,-13.80074451324834,-10.656746748422721,-14.592050193986879,-11.68909903743138,-10.416333796358138,-13.14183284795389,-17.832887430838255,-18.690227479145463,-12.772194223699644,-11.692690301964054,-15.094626624001489,-15.301618271494991,-15.031040606521398,-10.187279278493879,-14.053458431221399,-19.557990778395528,-10.858231893050734,-12.357770720358845,-17.491064053642656,-10.085744502608575,-16.775208726471874,-13.712643270118592,-11.69090541652899,-15.111578968399172,-13.87820579184389,-15.882176098776286,-14.141514010973008,-12.880396215646407,-17.095823748859686,-14.315082893683837,-17.136687510291065,-14.355073319200404,-13.808818283847584,-12.279294881984665,-15.655933702611174,-12.737958680726212,-12.914993226490534,-17.76349590629151,-10.036882507438278,-14.256079407483462,-16.536746362198038,-16.178626884564494,-16.06121655113562,-18.430746786810527,-15.067556390041814,-15.94661147332927,-10.498835861669589,-14.259529969251519,-16.451664248179835,-11.45781513589369,-14.135654555645193,-16.63793662803454,-17.429742123171255,-19.46097924097723,-14.03676138560941,-17.69490381223256,-14.183062398368975,-16.100748419315735,-16.425407374689673,-10.592528480673462,-18.988762693945795,-11.178933005716257,-12.193905225141915,-18.923107549999756,-18.02298233980271,-13.493701453739124,-14.171857676892115,-17.908094705761854,-15.665358871400446,-11.710897771967828,-16.103645537601807,-10.742869950609379,-13.231648597508798,-10.651189927017228,-17.05144193501901,-17.372807935174887,-10.872001156976687,-11.24896319452647,-14.862368147210159,-13.447705773354892,-10.490693628189483,-11.874005042359183,-13.264962027481255,-11.572908954338097,-13.521364871179845,-18.86674180771291,-12.127008616825574,-17.825651335010342,-15.383560203111589,-17.999094542781695,-15.477920090536477,-16.756240574283684,-18.116939384316733,-18.172768694984537,-14.169985393713736,-16.547303533631982,-19.234015131737426,-12.202456733742132,-17.218571497016033,-12.203328228987884,-12.154902096023509,-12.236500276968519,-14.226929020896948,-10.98542692930517,-17.145411467391433,-19.93262789869031,-13.503323461499676,-16.09281468767867,-10.417063765521927,-10.64195071359952,-19.693833619418196,-12.980907968512426,-13.315009195198693,-19.161960276045836,-19.657671942659658,-14.877784312349373,-13.372178029971407,-15.342420978929042,-13.584960580096581,-19.985078880847066,-10.69357026208601,-10.511770505558168,-18.549387152453136,-16.537177895263714,-17.153013286393527,-15.146078281572592,-16.283629303673568,-19.712346528504998,-17.380475958796524,-14.940987026832516,-10.301837359892357,-11.909197562623682,-11.873146287183536,-10.852080035350616,-18.81899671395606,-18.867864729729007,-11.09667251417749,-18.269127092878456,-19.120472430396298,-18.755507889933376,-14.48652654478457,-18.934652023190747,-16.12281656481551,-16.74812871023174,-18.18026415425869,-12.53874376796727,-17.481981125765337,-16.423880718833523,-11.536645425855008,-10.468028171213987,-18.5631697231849,-12.39933711775466,-10.394978470921767,-12.450021519477872,-17.933154180607794,-13.613487046132889,-17.91653581440261,-12.754759498929857,-13.674179130702377,-12.780486461441914,-15.23519189162374,-17.900091213597488,-10.981486196445926,-10.325384666007768,-12.018328978842101,-11.926789552136608,-11.515624578041857,-16.16470776388354,-14.948137734834576,-12.93343958616293,-16.13711064544226,-11.202198888524782,-19.89282109230063,-17.982212906515844,-14.36825491185627,-13.71848479473844,-15.366516192265538,-11.79200529554743,-14.167475307809397,-14.48686148517062,-16.501018181122586,-16.245363472311514,-14.580646921490484,-16.40958421398815,-16.761864449001294,-14.727424557738164,-12.789660599390233,-11.95526441515306,-16.766518211495022,-13.342776157457967,-11.317266825857926,-19.24138627371517,-19.2528374173162,-18.46468314745524,-11.12588132003748,-14.12498977615438,-14.422974103974987,-18.603167536017217,-18.488084825676335,-16.217831295258755,-12.122213025868703,-19.39269873536678,-13.535587552125918,-15.313429660983024,-13.370749366635726,-10.85631516023314,-16.00276382384495,-10.232216789078237,-11.698375136423769,-18.442139284631622,-11.85036466816939,-18.00483652734213,-13.871707148513082,-12.770209380167074,-13.936418307936885,-11.79657299656129,-13.796594884934803,-14.71096598332251,-19.109819098510854,-17.158676402469716,-11.914400480279319,-13.389225751191901,-10.570022865535357,-18.65990636392422,-16.85638532469512,-12.953182432071646,-18.565774439950935,-17.0551671748684,-12.763387210164897,-14.474248618585332,-17.571700717161058,-17.492166569911934,-13.387643497169773,-15.878377390144058,-16.564342532326393,-11.474844311305901,-14.472326913020662,-12.671297933678865,-18.456953459888055,-17.961062138766543,-14.442609799484782,-16.777591297227445,-15.172418368128175,-10.94618967802088,-12.898978750632505,-11.5334962039657,-13.316987047042597,-17.65340817213052,-18.366093417706814,-17.844697928830392,-19.301532703944872,-16.03277980896339,-12.87377766238187,-19.20162449720461,-12.85789529527791,-13.69923764360717,-12.39531031095197,-11.518425473737912,-12.499563398713072,-15.256575809152306,-12.575393988263219,-12.65667914678751,-14.71265215150284,-19.945560651118107,-15.162191920310415,-10.787661239141455,-14.940468061701049,-11.306757106004726,-16.91153825443758,-18.28371422058914,-13.213094141283657,-10.830570223096538,-19.399629407742488,-12.127064913084677,-19.213508773288865,-10.013030212719835,-15.797627016554706,-17.586353766549983,-15.353200528751533,-13.047616206547701,-12.89212655828656,-16.05271830878172,-19.83033266095027,-16.31508442371342,-17.62627638415448,-15.998187167953473,-19.042693252443254,-18.95109415771868,-11.458260887300419,-13.491970019994483,-13.572665453002909,-18.926131859826178,-17.313358755280557,-16.985338849778152,-17.332453434577143,-10.104751771853886,-13.991082263588483,-14.6889077193989,-19.18316761690396,-14.417887163793443,-19.49707348435577,-19.0567032653076,-17.47578839511235,-13.105337069946048,-12.159069850797223,-18.277151607392447,-12.699620779547251,-11.861493454218637,-16.292040873079777,-10.91323694559991,-16.81586668779365,-12.980450912307731,-10.009169114280594,-12.62401671135273,-12.359474608168666,-11.902560003697424,-12.453807815328004,-10.253921696907103,-10.727561488817038,-11.234133745164812,-15.674144285625005,-10.346254226211089,-12.607079972378695,-10.15394859953447,-12.269815263289527,-19.702326301314063,-16.644328064392088,-19.326968484937986,-18.72170683142932,-11.845503611927393,-17.978480911280727,-17.332798360247715,-11.937960430770932,-19.838036354920106,-10.010256799833765,-14.758651517780574,-18.122006440705793,-11.643921123432257,-14.742491071366544,-10.867423374229935,-18.01757803916419,-13.554518179134208,-19.25448623299396,-18.89410346932818,-12.635299422639736,-13.629455483325486,-15.025226707831369,-13.044189008996625,-16.726570651723417,-13.6572671784802,-13.843474041875847,-17.94033513804886,-13.347740329896045,-16.764493344181155,-17.177792815005937,-14.943567363969464,-16.26070780761113,-12.458262423118391,-11.770915722390573,-19.823324959827776,-17.940561215742033,-19.26866321847603,-10.607853935333754,-19.47763869965472,-15.461215168536885,-12.868758183117643,-11.856058192585854,-11.535490537746378,-17.576153473767967,-12.387694854629988,-12.876033440980006,-15.130671772339028,-18.64922430112843,-12.113657545643552,-14.965966965969447,-18.198499614755054,-13.748013705289955,-16.322842490695958,-19.992305251812283,-12.054042747525074,-19.76668974231638,-12.297476305680748,-19.73897452356124,-17.11545238042165,-12.915278169778171,-10.505292622686177,-12.350432565192905,-16.016029753346594,-17.33372443835447,-11.112602095744343,-16.88227909126883,-10.035312012017787,-16.456192000838048,-12.90998654624731,-13.610614105104034,-18.135842118621394,-16.21715975600917,-12.93745362519326,-10.360693352566512,-13.12838858642527,-11.642679225980412,-13.052688258702418,-18.077907079920056,-16.72948131003952,-17.37493345019669,-14.865655315835477,-16.67084423271283,-19.161852584022853,-19.502707789142367,-19.912772966609246,-19.134079191871823,-17.571905569389422,-16.334145491074086,-16.400549500743494,-19.546327814573086,-19.544185035465713,-16.311015166280946,-11.185429832659699,-19.788778503688118,-12.632588040159547,-15.88445593192646,-16.101764385680408,-12.57389204642206,-10.930286747810523,-10.441351180399128,-15.384643262472505,-13.90438902916202,-13.969831690247126,-19.685484660319325,-19.157937184748583,-19.409856303400296,-17.547881518396487,-12.066502850419255,-16.686171148247993,-12.636445776245072,-15.045596071441347,-10.943649136256292,-17.012925252732888,-17.945633103958404,-16.04383654834386,-15.57237802214551,-19.19286447226904,-14.221334655834186,-19.701399361824034,-15.071604778290808,-16.906148108284828,-11.753117325942117,-18.69913080739003,-14.937183363648135,-14.573844906766112,-11.694064924763769,-18.731603377186747,-18.681200037952593,-13.174991848512295,-19.080324391280485,-13.531711839520648,-10.442124990025103,-17.879007409747615,-13.674662452488516,-11.326288360769848,-14.802283262156802,-17.911317352865595,-17.849463227941474,-18.46794256212928,-17.814461184548694,-16.166358824465437,-14.03444607209532,-15.064420333611315,-16.326419943219904,-12.818594299214425,-14.99111999924011,-13.756248433246906,-13.529922863773793,-11.465281494176754,-13.89415438777083,-14.452078305701386,-19.827515659801172,-16.119317219228215,-19.779576346960294,-14.680217802205133,-12.87755641446308,-12.528034250897873,-14.169408894842126,-12.347073710837737,-11.867941271683387,-16.316090921771064,-14.787898293727114,-18.03011267441708,-11.732239394611604,-13.936625113065205,-14.953455073986074,-12.35092606169891,-16.719385361452666,-14.495681572697405,-15.274121964580305,-15.833475710088411,-13.70680248932471,-19.45518312903008,-10.185896425759429,-18.178455785759752,-14.141178420693548,-11.112739186446802,-12.233385086487036,-13.493593698215102,-16.677788515391793,-10.738045920705492,-16.79248923082759,-13.85573363310155,-10.383280277666838,-16.78891238576679,-19.04287874450785,-13.507852765360562,-19.350478924527856,-15.647868668242918,-13.412431826950595,-10.10713981272017,-11.197433558093092,-13.123119038738801,-10.118030541046048,-16.51041900510564,-16.074159782158283,-10.776934078283556,-16.17288676216095,-11.581136270723816,-17.302627434527324,-10.528430101251363,-14.59876631117049,-15.766279667619763,-16.971586538927884,-14.171439805183756,-13.649802572770406,-11.351623340643606,-13.926529714601791,-14.885521358594957,-13.4341995737705,-19.664322968194284,-13.590825118179739,-18.869577442747836,-11.429304196212309,-18.93600944753767,-16.764766620538055,-17.07667534447949,-12.157316011154425,-15.584037962925548,-19.576635825238935,-14.759181198206786,-14.92338387170051,-13.979566030868043,-10.9355449865402,-19.96457655633812,-19.500730742165626,-14.624473831272077,-14.840167163660647,-16.342657679990804,-15.660646871981454,-13.906963986975121,-16.16024326082991,-11.67278532569455,-13.247962165343646,-18.705197820119345,-12.221562214162498,-10.538286632089605,-16.804782514716734,-14.202689619213519,-14.773669953596485,-17.739221959115422,-10.863829858789193,-15.828424825106179,-12.356837269813848,-14.043337528657993,-12.455905174624469,-18.635479837537194,-14.819482910625247,-11.599108342440449,-18.717601764272867,-17.416203514355907,-10.159787661125266,-16.923647881493746,-14.889141940459577,-16.045451407272115,-19.336283024213177,-18.56403686213086,-10.03382212867453,-10.769176507818825,-16.806463140096184,-14.970734479438237,-12.603845148185297,-17.950576414778382,-12.979081611875461,-12.294508123954715,-17.254973909375696,-19.035084729851658,-15.916821571255593,-12.647045636334958,-12.736676203422096,-12.061587963108371,-16.00222883918217,-17.83375683154452,-11.168164681957844,-11.01617313407842,-16.779955177854326,-11.258707145189126,-19.497783283126367,-16.51094685935456,-13.174899219929845,-17.996139438282476,-13.083523048783928,-10.845566681030181,-13.579758187823446,-11.109893416717728,-13.425507318386042,-16.51717616702347,-17.569062026017434,-10.568441794120787,-13.40158125669702,-10.060504834497458,-17.27648660669424,-10.395988839591638,-16.632579175760526,-11.936279993499639,-13.988093974167777,-16.842804340757034,-12.405598170108366,-13.513510284707927,-11.28518454274291,-19.365932222497587,-16.0546750266058,-16.633960540433904,-14.53097101036523,-11.163970990488927,-12.956930818989381,-12.593379362660592,-17.763484789030706,-13.462143619659106,-14.508075064833472,-12.064893171999028,-13.77872999700182,-10.95319430622686,-17.619524067442736,-15.698823071165409,-14.48731568956912,-14.290572230310215,-16.24385581598998,-18.26890975423758,-19.266548846511565,-13.105423705264162,-12.411832040975622,-12.05125354076392,-19.697252097475378,-10.356209884171621,-19.953509928803353,-19.68906903441749,-15.898621321589264,-17.951297496470065,-10.55497821087938,-10.368180599812757,-17.01499018343671,-15.520233968943753,-14.48875072295089],"mu":[-8.923142947231554,-1.132846645927188,-6.213944873368704,-8.073669380314845,-8.191753608308115,-0.3861465953489507,-5.648172057198726,-5.6460597719882255,-8.66040422444074,-2.746475339799459,-4.1626804840569775,-6.622174635420595,-5.660512123600483,-2.687470385574924,-7.722639538638365,-9.939485527725182,-0.027113941395844332,-4.383408112360321,-3.9996235033354632,-9.865423005999826,-6.224226741175243,-7.1034724980216435,-1.941423939200797,-5.717576342013806,-8.534089837117502,-4.251975961219145,-3.2508876432199085,-7.2337016660685105,-9.079804581264622,-8.01707400096152,-1.2334093127671375,-1.1865451243297653,-8.559865252217648,-4.402842448186435,-4.801165114414168,-2.6246819456498494,-2.0710439191234764,-8.629393623523214,-1.522379896922128,-1.1567214939044734,-7.853313208684285,-6.602307405096952,-2.3716083909719465,-4.6277038980712515,-6.521010575558939,-1.031956330761048,-8.645105904013317,-8.016465879296106,-7.4496426082983,-9.471636315428027,-2.4164993980353655,-1.3971289852662938,-3.3559504856336964,-1.1982795183555361,-7.76584566562043,-6.721102256868519,-7.528588331250619,-7.168654219089365,-5.9674242827695405,-5.23183308364398,-4.927149886338382,-7.566364437637025,-8.635339518772893,-7.0993127652122245,-2.5990547723968804,-1.372189008531417,-8.485442675221481,-7.36777489714509,-2.371759071925157,-4.90911080816468,-3.3505223417637375,-6.799560353874039,-1.7401449041671957,-1.446485901752006,-1.6617331944748681,-7.4664744941596055,-1.4485108062676977,-8.50307120016966,-5.029692773520475,-6.220675482759939,-7.1875566878892005,-4.6213642927458976,-9.809360250646497,-5.117616428337916,-1.6956103003167522,-4.214645291366155,-1.5401299740249286,-1.5405326436239752,-9.565299289512337,-9.405438531027295,-3.083521548597601,-2.2961600050379594,-3.010485678518411,-3.815422309662375,-9.080768847120469,-0.3382455903034032,-4.9158261362859745,-3.261083290979385,-8.048167410693775,-9.627419102244975,-0.42965897979207357,-4.803566621663771,-9.516212774248212,-3.0123892374448857,-6.447678971065978,-4.638612873095482,-8.844728899453338,-0.7112727461118795,-1.945442858937867,-6.543890155735685,-2.297714649205207,-0.3527574932108779,-4.3952418897835415,-7.397596102744027,-8.414496814107043,-6.606864087902462,-5.371355981969968,-8.25540688079652,-0.5988355058782613,-0.16665103543717086,-6.091056580927776,-3.7384207127780655,-8.95566599143616,-8.243376741051105,-0.7494035406342192,-4.308216427524796,-5.116575758809936,-3.045562048457604,-1.1293160686688464,-7.49672443000843,-9.413552680514467,-7.513201484279763,-5.230918663222082,-2.3296211123454236,-9.771241358975878,-5.941320936479604,-3.6608138968241177,-4.230535863761585,-6.187344715956884,-6.284517856232381,-4.632864919005144,-2.640740320444188,-0.6731833360714234,-1.6036330851682834,-7.121963939884384,-2.2762257137409225,-7.398244407998433,-9.230248421807676,-9.50113112001993,-0.6793723116533501,-8.297841105732711,-9.290150315833547,-4.340443507545926,-1.3248827334630064,-8.674125108008003,-4.113174693560349,-6.055910889569997,-8.066499279123834,-3.577050774025663,-0.16355676877030323,-0.567660772588332,-2.0318650522140036,-2.4744596869288316,-3.502253585392767,-7.940818921200483,-8.930553587880706,-3.8112956096434525,-9.415359146162183,-2.4764438840585834,-6.754002320442374,-3.217124639972635,-6.341871614775759,-7.109483203200895,-5.743763055243647,-4.5412858329213135,-7.3657240117574885,-3.5624948602697426,-1.6682844705565358,-0.5275557601056979,-9.884178836858124,-1.4256125117890117,-5.649659841030202,-6.17842214102194,-2.9047105671420548,-3.6477977704393227,-3.54709251526373,-2.3232678018323782,-7.774210929943653,-9.248734931437149,-7.686056522560087,-6.006975570650043,-0.27625949935456084,-0.5951160726188109,-1.5792828758507227,-5.55913222034186,-2.3154295618547938,-4.328233477816815,-0.9452951403167531,-4.5700094994807205,-6.478578271806321,-6.0162448521964045,-2.597989135433827,-2.05374391835625,-2.8346253342972094,-8.145840444428348,-9.629038901096319,-1.685350961896972,-5.938169676914251,-4.825126170444392,-5.375982308336942,-6.6558107131014355,-1.6484694865494376,-0.12586522802199962,-9.653629608094894,-2.3039715380737236,-4.19890177593067,-2.172519556877359,-5.9031962367108415,-9.583971806880385,-0.9130461566584147,-1.1906888417437655,-8.997425303842618,-1.4294298952931528,-1.0377302907688657,-1.8352699745400192,-7.719695887558851,-3.4551254519393204,-3.110775202392375,-3.4342426291226724,-6.5803866486684885,-2.789438484058935,-2.284770022686846,-3.9995269150809953,-5.665860198585424,-0.7385454779905021,-8.122647740918696,-4.421188424077693,-2.8712120654533235,-2.7249425855470832,-1.3892988121271777,-2.575911299792477,-3.926320972690227,-9.603694952712829,-4.472659616943952,-5.154374550011949,-2.4505504872262596,-8.918580035160717,-1.6901544418156877,-3.124750671074812,-8.266028358180924,-3.941822028771591,-9.747979961113174,-3.881820767978297,-2.3892632230036415,-5.072198419315928,-3.603393866186677,-7.535382694663559,-0.42705616252426637,-8.732355731222121,-0.07889734650907254,-3.366207446437708,-1.8055807842312022,-4.336366437500104,-7.44858333309571,-2.557186937911329,-2.3797412917890215,-8.549200873006217,-0.20487568168206183,-3.5749439478560197,-0.9083432755842047,-2.059129709834724,-2.393678803079795,-4.001520907810045,-3.933534902643816,-8.234349496236685,-4.684224772026195,-7.833057208004737,-4.577217510575828,-1.1955528450643316,-1.044102670669722,-8.903599261637126,-3.878508363725164,-5.3312568351120415,-9.281714971524554,-5.886660292009531,-5.9811514160332635,-4.999525013631749,-7.485271928303936,-2.672290281639431,-7.2257229043371085,-6.055061253863483,-3.1319121294179597,-1.5441392981950353,-7.222700545023604,-7.059724542112916,-3.0875911641246967,-2.3239302061854206,-2.1870417436894884,-2.524862193476236,-2.3862642719661276,-3.4455978109492436,-4.6320361689593526,-2.662139081510164,-1.47615272671761,-2.839417187112052,-5.14056037922177,-6.236194154694925,-1.688223741314352,-5.305886661422051,-1.2051562452837605,-1.915546232650922,-2.4876363249883116,-8.378429175458496,-1.6330320616765737,-9.703010688036706,-6.165554494961936,-1.5082020924879402,-6.065019528232398,-0.4476707999861218,-6.322755580958557,-8.050385556105528,-4.339893034315587,-3.7139806642045947,-4.097506753808,-5.511354388379573,-2.7679607847600796,-8.810810601180876,-5.241664229303106,-2.493542582340651,-7.199701327794781,-9.359399845499237,-4.717684128135051,-0.5684120408175186,-5.06599768659211,-3.9088379578739763,-7.9703963582430015,-4.6351710009785885,-9.266719227207664,-4.40042419382938,-8.499933149514092,-0.9431077009732491,-9.286102084152771,-8.372828088499588,-4.300882954907244,-5.337535934000368,-2.538322178565271,-5.176207283834158,-4.258555701965658,-7.853820974546792,-8.24678422941443,-6.902291592911212,-4.041507705965175,-4.576096190439003,-2.071161710841103,-8.005960793695328,-8.910276394516409,-0.812293518336189,-8.10571622239527,-3.419399926914417,-1.0358672303727179,-2.854469426533872,-8.396485225954638,-0.456167591872938,-3.6215267494351355,-2.1546994048033796,-5.833498967574517,-3.978865546468886,-5.585998157403125,-2.327683327025283,-4.119269002751298,-6.402921207676682,-1.3818350158872517,-2.471698343792106,-6.465777017729586,-8.646702383044014,-7.644346390737706,-3.974043163656009,-9.742879732453584,-9.676142825253972,-5.893746867647742,-0.21215337210203744,-1.631109419635961,-9.690200569648699,-0.443057613938469,-6.3449400438379815,-3.7826955304684007,-0.6946022772628613,-5.295160910734433,-3.2713786032362546,-6.786326531866347,-8.540478788358147,-8.280750224464366,-2.4003051734809944,-4.697860206387883,-6.507611481430109,-6.488071109639071,-8.971856034600608,-3.657964661216795,-0.10343015663907718,-5.409090770548557,-9.509603832437561,-8.144263188869516,-4.775722101545208,-1.933654975884076,-8.324953155981964,-6.66645627938837,-7.757150219486464,-9.568477590543063,-4.083018632812716,-1.1357050848608985,-8.92645227060348,-9.866719744802497,-9.739691054401614,-1.5155641950699095,-6.7219229692174665,-5.907702588048627,-5.514132233992446,-3.6660441014004075,-3.736661143711746,-5.937003863750765,-3.119587955249985,-7.903577700923519,-6.528041655170536,-9.832210126246945,-4.968473533372569,-7.8010746808337945,-5.079076686581558,-3.2018263116221846,-4.313173609527428,-0.2990699687621978,-5.463664421965488,-2.130818001350827,-0.5927073521788051,-5.103437763160761,-7.947598118367383,-2.692495322116335,-5.396415880998413,-2.32301546622665,-0.6071923571165172,-4.352927032317058,-7.9762842716667315,-0.9299270110503111,-1.4684391550800524,-6.241203545000618,-9.126294969941473,-7.792310906885895,-5.766608271144589,-1.9061203398008963,-8.979077176864148,-7.466087726178694,-1.7031628563794232,-0.19881931692794286,-0.7286755176839588,-8.137640946034272,-8.78809884005025,-7.606323678705122,-5.8419643178501275,-1.6787801078230036,-6.029549876119457,-3.3048321357571053,-3.1864196637328734,-3.120956295097206,-9.401494314895537,-8.004313729297788,-6.0575534749918365,-0.029050145635125535,-2.5423038583347313,-1.9012667409137851,-1.7183287378715795,-9.255376231048018,-8.389015043914913,-3.3016172125365673,-4.802684103969213,-3.703646642916383,-2.2822815240916916,-2.495984765147372,-7.26652204952468,-8.966245097884538,-8.089788151462272,-7.773841557243728,-3.404394956855621,-5.6327927983986985,-2.722573991920747,-8.452523597726554,-8.958293779595643,-8.311235769910594,-0.6389117992890059,-6.914486783148844,-5.005499437036997,-1.8193952547966896,-2.080436802523904,-7.528400456980879,-6.697178698177487,-0.31309188385286735,-2.9381927550517495,-2.618965277866574,-6.137026734937523,-4.21988642870764,-2.284774912690477,-8.11686221213279,-9.290798511252936,-3.973067579202194,-1.1393990443596014,-0.7999662081360848,-7.633187854310677,-9.195745978853365,-9.16280849850499,-6.2225706381142265,-5.201777506335863,-6.397118898834295,-9.436893234842518,-3.3895095254863117,-0.04414961909255277,-7.353029029103324,-4.659089537016172,-3.3703324860871375,-2.9905199459524434,-2.118922700894741,-7.252522765325162,-8.98362098448015,-1.8396228753664512,-6.4022859703857415,-7.155057899219319,-4.1291078482107535,-5.214507073636437,-3.278501529965556,-9.043678935314563,-6.259900191264993,-1.3139094159155662,-7.566963207956663,-5.74422365294653,-1.2215279317583372,-3.866631717773279,-6.9161824900285325,-9.271782297720279,-5.674736805181446,-9.054157850163678,-3.8824917042935247,-9.66640483690999,-4.084195523066811,-9.164098118868353,-8.794846008575174,-8.46371895715031,-3.42523080070819,-5.916459375251442,-1.096201428470922,-9.858490703910267,-2.526645586202856,-1.900990503065485,-4.960150302015263,-8.758217379765945,-1.161681236581158,-6.0522591848349165,-1.7293772314835554,-3.086679215593169,-2.7695305237235157,-1.1430542662103593,-2.6680136417657208,-5.3219517337946005,-9.097448123689942,-4.650849807613366,-6.951255221687276,-9.91021541730593,-0.8147626766858584,-5.699793468312548,-3.556141301883924,-6.511785433602199,-9.73042713554894,-7.650803729435191,-0.5950032358408985,-1.8792319886915276,-6.127787669721836,-6.801146461967567,-1.9621837341397619,-7.7306343565232165,-0.18181689822177383,-3.7801849908092677,-6.320007811576738,-9.212532561822401,-3.7821376571555354,-1.5095425559298281,-9.07407880821873,-1.9920595816447006,-7.234717554558612,-3.565531629657015,-0.17240822147334578,-5.975217721507344,-4.609322218234519,-5.23911136936364,-1.2099980396857424,-1.4577888903728198,-8.071691002717039,-2.100456003712614,-3.044617929720639,-8.39623635036374,-0.0052845517776045625,-8.010635867675207,-5.81397250221265,-6.620690024735989,-7.638145782312691,-1.7283674446872932,-2.77994608931617,-6.20028331543468,-6.866093377973117,-2.9589371455545477,-6.307588810044271,-3.849622734374172,-1.49753865527807,-3.515267994766089,-7.499447033410389,-4.963305750102521,-2.3047088744648803,-8.376569558835687,-5.439383615703259,-1.5171372188996668,-7.511979406337965,-1.1927746321098143,-4.310313088040996,-2.6108089257792977,-0.3076015956000311,-7.657979275220274,-8.834167081342414,-3.0934226288457056,-7.004586495206258,-2.3352354970849976,-6.006687485044832,-7.485210324633636,-4.2341964282106614,-3.569907606651641,-4.502660540403993,-9.77389114384544,-7.82532801631173,-5.25096024726624,-5.201885300240898,-3.2570335419417185,-3.859909957477623,-1.9737740036682938,-0.16545523377822446,-7.92502155536255,-9.754577792904675,-7.708438572127541,-8.92660542498345,-4.156792240298803,-4.357535383329236,-5.442565502682903,-2.5153575729127753,-8.790197589915056,-0.4038834258465962,-8.327581997929599,-0.21960494719386103,-5.63369437178638,-9.591462189920692,-3.1543049980850313,-8.565230895893169,-0.9340785267500018,-9.7844464580003,-0.8490315609558063,-4.336208805019348,-4.160007663922158,-2.906529593215037,-3.584950073043538,-5.647394402459335,-0.5908917300375593,-0.2979957890377216,-4.458067343436369,-0.7814068929077278,-9.607918704714166,-3.5304700617705875,-5.591071719984204,-4.9922961881445405,-8.059912986134545,-1.9313607170941127,-1.6965074438350225,-6.625463042920547,-3.6467282049555516,-0.03197473356119529,-6.110737260042509,-8.615044959382077,-4.215460215816,-0.18357957498904565,-3.123396796718234,-8.280105308167538,-3.829967594790784,-1.7895370694579493,-3.7052044984453336,-2.839061643002858,-8.54860311400408,-8.522594948626397,-5.990072568166904,-1.7332921475160812,-0.3682517933668872,-4.425219828943494,-9.85082857399891,-3.6243567464806614,-4.655428804512722,-4.181539949281898,-3.5804984435621368,-8.106061292080733,-5.543569337615184,-7.285816468045696,-0.3457859179292866,-7.384379588544679,-1.0755219590919252,-5.800965517491489,-4.2659219738123095,-4.155374259369915,-8.621278660831631,-2.9199125787264557,-7.059084015397716,-5.0168181311203615,-7.531770549103147,-7.78141664423549,-9.995119094148661,-1.8014649126446103,-6.316018568466102,-9.90626479908552,-9.447666218678956,-0.6155246104031153,-1.0500210501427376,-1.0966726645378677,-1.1923841814937663,-3.1922281583256895,-1.6762487903113787,-2.5251532568269486,-8.550006383798603,-5.3686839363202505,-3.3554842213102654,-1.574442997683645,-4.597467652114826,-3.1103530895137954,-7.009887376091413,-9.994133166101298,-4.67627033991056,-0.4053448709535923,-2.859064482150777,-1.604408723420283,-0.30552923906743024,-2.388091582921281,-0.9235126146821981,-8.103312258242816,-7.018423586198621,-2.103221745811261,-9.85209529813419,-7.503410068868986,-3.6714210201102593,-8.148793801762864,-0.9592089068588505,-3.7211598978282256,-1.389216517434062,-5.174924593863237,-9.402408371546962,-3.740712385698237,-8.95501946455366,-5.653280744607228,-4.01056950119298,-5.1476875342938255,-7.787465248969257,-8.621797415067826,-9.404447845584814,-1.8456856675750943,-8.911840514231999,-0.41068887218648875,-8.572178643732977,-1.5806793195620483,-5.69053633146029,-4.441207573693918,-9.12647757604175,-7.548450215913642,-5.924144317475033,-5.3479310121677255,-2.4711129921430275,-4.573490198622887,-8.434235938669518,-5.027979536392944,-9.384241632751912,-6.343222079438151,-9.399393801367168,-1.5950723120713728,-3.810987721523167,-9.150938974912808,-0.13293588663219946,-5.721521226019986,-5.547056182828996,-7.910622446967892,-1.0386382659703086,-2.640429862353695,-4.908762125898538,-1.0484490389701162,-8.20662153692467,-4.938923494720429,-7.640533353001839,-0.23447549999849882,-6.6896767032647535,-7.385762476886453,-6.471480589896295,-2.754638767424431,-4.090274882384717,-8.569370004402113,-5.430355152874775,-9.397386313635145,-9.25584749672256,-8.62380717164832,-0.5997439595562692,-3.8110305867045557,-2.3201399432585434,-7.9684447821573485,-2.5567175370555217,-8.664506986528501,-1.5467840599651228,-9.420623887534706,-0.8447012599267767,-4.232612504938764,-7.4850874848691635,-7.41472707972175,-1.9582074997338794,-9.506164740143772,-2.8719363905148754,-3.872639998519163,-5.19767580021627,-2.342208193597639,-5.619901147760153,-2.1404939313216165,-2.4750360462867516,-0.28126474503988863,-3.557174595038013,-8.745944823873248,-5.332879502054899,-3.334946298731438,-3.872585563044988,-6.741462356672699,-9.752089021626858,-0.13613259974936343,-5.64080870360322,-8.991301989218117,-6.274658577196403,-0.8889036263329064,-5.346986304001913,-4.16955337300879,-3.497659216296576,-5.341774184909134,-1.7905770144935662,-2.96193336831583,-2.959553339124319,-0.2088658196592985,-6.986010192361569,-3.4232924974107526,-2.686933405099725,-7.558554580668133,-1.9330838388196803,-0.012497099007668933,-1.184822419357654,-3.9931998682286896,-5.002433954135435,-6.00674765291078,-4.359805459603361,-2.736622226914045,-3.510103364991668,-4.288902475421041,-0.9110602018968095,-9.256021863536382,-3.5527859609697154,-5.002364907088454,-9.48782425945117,-8.580440621020886,-4.651744286148642,-2.2677606899179836,-0.6112724171619277,-7.612272332461658,-3.6112876786724835,-3.20262751954689,-2.479869421078842,-2.636774991742803,-5.110155369834015,-1.394230723016865,-2.54904580236625,-8.263600993424355,-0.38560482062062196,-3.6110314868545923,-2.4773466723675863,-3.6891715338206654,-1.9216040896113151,-5.255695184179614,-3.9591740269793063,-3.0539691185040585,-6.1995532014563,-1.0446769838705006,-8.077761649465817,-0.026121210075364942,-2.2334622681751615,-9.2209331099449,-6.350708980600793,-1.5932295910157723,-7.315130139494488,-9.277038703036606,-6.546795290582724,-8.053479658364683,-3.6331171288170117,-1.0827328350939225,-3.7459551388351064,-7.552901683082817,-0.24433590447327846,-0.48470141459596494,-0.9475720569296464,-1.7482759132994574,-9.960300280657828,-3.2650515958905135,-1.1115988752089967,-8.874399337107604,-3.6662588858884604,-6.51994745173204,-2.4281121361859226,-8.74505426831683,-6.403272363656535,-4.59960840188661,-1.4695419741060833,-0.4243663367059214,-4.978794733437921,-6.022600351934622,-3.0921694675954248,-7.857224432879189,-5.72609733107964,-7.128189389776689,-9.679072519883473,-7.117387372924629,-3.2028470298419287,-2.2959983188585276,-0.23356843457844834,-6.561947215877508,-2.603400661468964,-9.535923573889804,-5.029103050838389,-6.397547692709145,-8.62707864875224,-0.45440301688719265,-5.00766034112095,-1.2460024606901698,-1.012211399232612,-7.377421165506462,-0.26244937864110307,-3.204622718327299,-4.228966125452711,-5.361801952506577,-4.7802253934230325,-4.433386691901311,-5.536287738863576,-5.961346922215405,-2.171258019951514,-5.097052848460002,-0.6409712784205257,-6.81129946867493,-2.0101580874818348,-8.023093926472992,-6.138644927760741,-6.141602652266878,-8.64247213831968,-8.380374953551312,-7.464473186042033,-0.4570521354393464,-7.259469586045418,-1.8917655701357905,-8.272752522111455,-4.696616920016597,-8.500609813465827,-7.295844811076271,-6.4737371917178965,-4.829956868106519,-8.733675420649957,-3.07702467225339,-9.189568276620095,-0.5959610304086005,-1.6895149112602992,-8.26483004216864,-0.9347065249097564,-7.067643813859846,-4.007963280919169,-2.3727108524863305,-7.107145467175348,-3.271526106731255,-9.534911305514344,-7.7208973050119845,-2.754459316399631,-6.233309806099509,-7.978062511233379,-6.391456488163822,-8.838528046217114,-0.195591339568979,-5.515119885013076,-1.4060952213499567,-3.098313196276399,-6.958613168631194,-0.2239528306543459,-9.418098584956095,-1.1791686363133569,-9.96680363440754,-6.890618328449934,-9.231052588944358,-4.381355394073017,-9.87859043856955,-9.381784662033454,-7.95066190740487],"beta":[4.708480678326983,3.5605068287451136,3.9822762934366116,3.5792945354557,1.2053367071135301,3.730457884680348,4.726077435485574,4.3660596281802,4.031407171346184,1.8749115823898344,4.276675335185091,1.906616430458229,1.530862411584406,4.459933793737432,2.982561734373792,0.3676887544920826,2.341192012249614,3.5304007548699157,3.142948697211063,0.6957071431338291,1.449236364708304,0.30536852963313543,3.3888070458566566,1.99180928346679,2.67928938485817,2.9676096127880403,4.768625972213148,2.417520591812643,2.596752877570041,2.0992497049574323,2.1973543399902495,2.253329747064452,2.302069985923374,4.157925475982713,1.6121600224061416,4.355055318953559,1.3417664425801556,4.064429861080669,4.953203103091411,4.858311176014918,3.399435540096034,0.17986753055501903,4.030047562147745,1.8101660566826139,4.161860490294266,4.084383896270868,4.04436803842657,0.5993803532976039,0.6439639763200367,4.095145616410107,2.361200005154669,4.357774034982905,2.9276992613970765,1.0678639188555872,1.7408834275689766,3.4997107438396835,4.08629748743717,1.5150215292230373,3.8406801377907485,1.3984140207681894,3.360155351645745,4.848062500911595,1.208549774201556,3.04172964154155,3.2059599252148585,3.696151022873506,1.7692697750011677,2.199452116116708,3.6401096823815093,1.7149686018515886,2.7933967576054686,1.6290536466081351,0.01684412365471788,1.2532306480738309,2.2399691675134226,1.016833142327035,2.4965762463221686,1.6316193451438865,4.114579523498556,3.2069629356009797,2.3405481934174652,4.474110040684286,2.05301955761374,3.0875953968933203,0.10787283268319237,2.3748814511997374,1.1309256801780077,3.3103711928129123,3.966088834351228,2.0553494118309423,1.3669725397997934,0.23125231480093045,3.8851421929071894,2.1275606155490845,4.7855894084972626,4.941574327466704,0.7315822161513008,2.642760710065224,1.036911051029955,1.8662795896176143,1.115787403545443,2.7763506848918027,4.433900035419197,1.458607486970217,2.7747639450919626,4.730212988959311,2.0369876010292365,0.9235840400992701,3.824474349486875,1.105700093010713,0.3982791909843242,2.8207185516440294,4.453805004590048,3.5531942429299077,2.8558864265136386,1.3893123863715962,1.1011588823352736,2.639590250363538,0.5556390587427473,2.0598050226520046,4.915707918979599,2.0484263192405514,0.8811785736098299,1.4696749203947779,2.7116865745719556,2.0152030686457554,4.9217475748419295,3.188988609861181,2.550132030409027,3.8061901428136835,2.6257819557536113,2.5781882295180125,4.332409566945609,0.23395689052541746,2.6492024955700844,4.653056947420183,1.3079332981157898,1.6095783378999784,4.254332856072419,1.7190799065501372,0.9215351488697288,0.2961481287881451,4.177416454305437,2.004271090362242,4.708823847729658,3.4599759894262263,4.6196178949933895,4.445121932079704,4.545080544020336,3.850224962513477,0.7668718389350249,0.8098998012243463,1.3607383616854252,4.898226806853332,0.09301912224771391,4.1295052913895,0.588714496748246,1.7666987209303364,0.8579792199279068,0.4521608524376608,0.3210053823453507,0.7160952579807023,1.04671102231775,2.4390929789934104,3.654142863667289,2.4924590766467913,0.27914567008157976,3.582504222524344,2.1120660957242468,2.5625862381529196,2.2041323962393697,0.6107147084284881,4.837437160015877,4.166620918729887,3.5784954167065353,2.906431213267535,2.4236078005501827,4.690953599026911,2.7345735500175516,1.7861133206363988,0.19807728614580022,1.9563795689498942,2.0827677920634757,4.881216267099396,2.0932411830835185,1.8412412415392043,3.3874468084904343,4.621805613936755,2.087484181351834,0.7711485686521935,3.0569640533111264,3.8186117905572736,2.31843922880292,4.603709215887611,2.731409553676162,2.894356810493961,3.7373940761517233,0.7153142536460178,3.8977343171415866,0.8194579827206483,4.327456717972931,1.128521359670529,3.7053358481873233,2.7014241125472505,0.45071605198311215,3.35934540586311,4.023955666907754,2.6192011753052826,3.634027913004342,4.827993205718856,4.893345297146592,2.9727908806626058,4.810857185899215,0.2501077338869129,4.78106446200926,0.2994885933579883,3.9905732612521003,4.2794218551838,4.159927911897693,3.0642262448949764,3.0212582313367777,3.5702705619223254,2.047053121021815,3.0960268562676863,4.055064015484442,1.9261594683512628,0.9202334910576393,2.6040309863440725,3.011926899362404,3.5992661554972627,4.390077960426916,3.0319271498706026,4.167474062182879,0.5840244158218422,0.3222474207001491,1.8248173702743664,2.8003736161000017,1.77684440735012,3.727299237389147,2.3458064788112685,3.3116532038752866,0.8516553094046853,1.533126708339032,4.312753674510822,2.83867928331032,2.3837894873627463,1.4258574962234183,1.5376810467494684,4.581864860788668,0.003025450943953123,3.12910377201021,0.48462051289442365,1.0648008503193518,3.924807484898196,0.10254149000800683,0.11214156507013406,3.8542529918464883,0.8790342920889815,1.3507709060835271,0.534987564198327,3.4886250196897395,1.8972078557123262,4.020825611349304,0.4003130973548863,2.432010134892245,4.157403059734827,0.10545734910444304,2.0013221944059936,3.1242035537624444,3.1314431567964665,2.5864237026362757,1.3441953464395773,1.0105637454050587,1.9014463719281038,1.3341083627982686,2.36173546962384,0.1812595465457978,4.379442562386914,1.090043499412472,1.2939847745165234,4.7006643173389815,0.026208107951342097,0.02289882787639197,1.3698004104124073,2.434092835944437,0.019389834721735832,3.3256602480446085,4.490184354997942,4.618741465059081,0.011613085440231874,1.9119144070488214,2.162633714358304,1.0931194120474186,4.582451696398163,0.16775784437376928,0.4340732940985037,4.903739964205754,0.9717920969010707,3.078438438259913,1.3555009725907485,4.7928925480984175,0.5659975632360537,1.360797732946043,1.3510575184174256,1.3351426273681288,4.112963049902609,1.9427023642228947,2.5631025452640257,3.4358240122994266,4.963482499693206,2.155282579381593,0.6362671803528763,1.0216882666074834,0.5515727939078463,3.5561343533648646,4.311145526571796,2.919317939852192,0.355353842264321,3.4739963386289094,3.294346882439776,2.0449763310770255,0.9671976332768462,4.231562779121046,1.3458725756949175,3.4332080756578653,2.714292373393048,1.7499936708052966,4.510737074249702,0.6939503814795012,0.8511711248200227,3.1355258200120604,1.9345389162008553,4.310100790740821,2.615876765867362,2.7633605325754615,4.528829940843668,1.889164665906996,3.3563656220855744,2.036576551731372,2.9175715092552257,2.4818920902661015,3.715324483786866,0.5543450415417439,1.2442348016182558,4.298769837764242,2.629832552775342,0.27776011398130906,3.0282771607646652,1.3374595730964178,0.7698409889176849,3.577620542615685,1.0475639236821022,1.3080051437804052,3.3591843601225424,2.3397145636849426,3.024446748786067,3.560229964481363,2.350494464499384,0.815378378647803,2.7597580967916246,0.873610086603378,1.1359260515682346,4.278512678715046,4.966893090961761,1.5986951397767435,4.494625939602458,2.210718850638127,4.001125671289264,2.8328941951297457,1.7190742248674384,1.3955699601357363,4.757247884140076,4.529404143535318,0.819542057402608,0.2975300362759581,0.3281465016902063,3.3658803308832708,0.8656134823880457,3.434510080864576,1.220360174479952,2.229274535570106,4.72059714320663,4.8449931225077485,4.552923701223469,3.834254683978844,0.7597883095702129,0.8705538151421632,4.401335703416808,4.081242668053241,0.5377046084237413,1.8550628299392258,2.42965283010255,3.7501932364602864,0.27950790983469864,2.3232901606706626,3.0656086448293394,3.392143462208331,0.5440873225914067,1.060317467781644,1.9163725433330536,3.5589815278165005,0.21442885180651072,0.17644063424949397,3.072691644893929,4.226822522292468,0.058447769501492886,0.39001436242089516,0.4874316016980995,4.157121874092992,0.5419516510844913,4.2245765740461305,3.8622670082122013,4.912269993847319,2.730596219488468,2.164942783816337,4.863016144342866,4.692659720617013,3.949038028160575,1.6406042732204529,4.203237441617198,2.3921528602547637,0.14041834587925184,4.54311500110453,1.6875561812825124,3.3503377825549086,3.7996564057934212,4.002933162657617,4.526612212694205,0.48065274721662443,4.997577445587687,0.3710510958444657,3.820356985751853,3.667887541296829,0.4670983848023047,1.4017728383585804,1.7832727092456446,0.20871116712234627,1.1560278016248737,4.672562351718871,3.6114170031221384,0.17462934828791576,4.094217936178825,2.762611252718148,1.0234466824455968,4.473855820712275,3.20019553086214,0.023067551209897674,2.87294571247085,3.1551835218811863,4.775791734935972,3.6582788378377673,0.6550977161752158,1.7685832148613978,4.450769018344994,1.1408648910969243,0.26460907123486255,3.1382976215226144,0.6057427836998341,2.6015259316380277,1.9773092445424834,2.853275737108828,1.1366107489125143,4.263427566860129,2.737243633964014,1.6987405645009601,3.99944458169041,0.869988164906258,0.8841138239270263,0.6242646065444579,0.051752518743862774,2.301408555553893,1.399392952562598,4.815855457293391,3.741409992001018,1.805473061523083,4.852997010367312,0.36421996828137515,3.420749088806385,2.1138106484441432,4.10112920526676,3.618235909348604,0.9460002221451413,4.9559550334595865,1.8623010520084826,2.0988681543865138,3.9315559265200783,0.3817886486871003,4.91465596739971,3.937584657667097,2.04619723773227,2.44807524982112,1.2967980915799893,2.9335973429305593,4.773829437919837,1.3533122987527124,4.724950056766755,1.2251116469401002,3.2390046617197674,4.395666738000412,0.3814219030151911,4.824624104987975,3.84029621031916,1.2622039682261421,3.8676680796442686,0.849065279768656,1.7767314177520799,3.984320695481345,3.8951097636667398,2.5538153982236467,2.6496012967876394,2.8065229311602833,0.28649175675575456,4.005805830814715,1.2000993064423382,3.3587098055733975,0.3917732398128515,1.961086586036519,1.0934869492556842,1.2696476333401019,3.457280350812797,1.9066145287287672,2.385602684579815,2.547889396997883,0.3465414571319536,3.3504965805518214,3.4381033829371352,3.584203853208999,3.6514453547392756,1.3855784816234196,4.182195806385103,3.099802403177754,4.909838226213852,2.0566363938946273,1.5666863109042128,0.7383113331584712,4.726449059633973,4.631916018511728,0.3960309302981224,2.1971773382374837,0.1961873327557495,0.5472823210202105,0.013361117085231022,0.22025671258149582,4.03423144369739,3.0176602437377253,4.866161629156628,0.9941611673539008,0.1689565188175035,0.2540972167610711,0.11354106163745104,2.770774471707912,4.654822124150129,0.11342130254640703,0.8173496873752362,0.9075263805865719,0.450025629444778,2.1304102185150553,4.815788558999413,0.6182038277396562,3.0123122612740083,3.1628339099236746,4.794968241128229,0.07458614786538753,4.722044556629368,3.4055078782805284,2.3513606381561947,3.647896378261697,2.1700299809492662,1.4130267117741124,4.9103632918850435,0.6139395526083546,4.019282026087697,1.2273413982817072,2.3235442614182524,0.908331229602316,2.944601827479023,4.017447791234058,0.48444708072127973,1.0600561392314212,4.6107795503890445,1.953288464878642,3.745743487866533,0.628970277623907,4.553225804726971,0.6056142847221768,1.4190294366928147,0.36413939350461333,4.102880310967882,0.5346155464738511,3.0981715711412416,3.4900177091566533,3.8284981674029672,3.619522827855819,4.132640637796565,4.5559265901813575,0.7012567221669952,4.704301574911628,2.8816898568987046,0.4554244166562349,3.6335719495672905,1.0652442887740843,2.950436868354227,4.554864073783822,2.256471991475605,4.913559202470699,3.2628891968933016,3.102387001741689,3.8569015120489505,2.616678603778475,4.034745914367409,1.314007623353718,4.9784244954760934,4.440958570459248,2.5839750200102007,0.37980137646047796,1.9238803578055708,4.684744070242638,4.051342770199017,2.378027162049582,0.014720396755439902,3.171163994210644,4.327131816546279,0.773997512993031,4.3621502753167345,3.4033637041617446,2.618695060865143,1.9924657179486505,1.6039701465609357,1.6731340306324571,4.1351451562441355,2.369822022743553,4.427474536509717,1.8968158059606333,4.8626478428072755,4.817504073653614,1.907943178620054,0.6714489112234678,1.8585801084155151,3.326034061601132,1.9945905319934643,0.04388981732859065,0.10008404050602326,2.5744080668529765,3.1555692507494437,1.0052229763750165,1.5908822961172275,2.9094247508155444,4.345537207531458,1.9723416912931913,0.5075420576544032,4.742275664715504,4.160050196942391,4.3521368823686,0.0623597788116137,4.835497912540642,0.4972577922671384,1.220451287775498,4.645649180574059,1.7134830323684669,4.436454921973233,0.6270944310317661,4.454901947860229,0.5024738841629195,0.8659685556395602,0.10612116055903953,1.006746987525372,2.4753022776179643,1.4416641281897125,4.666416104927289,2.733196068653203,2.1354757381839873,1.3340776211921024,0.348529191070025,2.21568970983114,4.677126072581378,2.810814027875276,2.5599150175242746,0.6267488893202822,4.866891757748322,4.963109779461737,1.3846501696598956,1.7395379239495412,3.410676404574018,2.7696943192888246,1.0163694343320562,4.139641176242845,1.1955574769308208,0.6117050102300536,1.9452007553011619,0.8681123799239898,4.922940423642999,2.0910350055844686,0.06884822446250993,3.3473017502343003,1.7379685979966153,3.665140027394104,3.497183722643978,1.3832741916916835,1.7638393356677495,3.018305621968765,2.0371340591522946,1.9954540993246406,1.5970489402365662,3.2726304067269183,0.33522774683471535,1.17753416892457,3.1037796017055608,4.186382551288844,0.7085938595008867,4.9387238805502465,1.7002817644646895,3.6675221116804235,3.232404714721109,2.245928980958621,2.834947473175137,1.4249173636469714,3.689991572121538,4.71216680786187,0.12042546573681201,4.144825462299159,4.717477916143417,4.2430645846262705,4.432803620156766,4.7341873559744165,2.4320904964093404,4.377185298690543,4.950801282593199,3.2017218288741187,2.296556145271509,3.9066610988225503,4.166018855400928,3.486874274995185,3.619911712937119,0.32690797669082783,4.717258084365299,2.0763237995287334,4.733595679401698,3.212430822659711,4.058545597982395,0.4942445667854267,2.328323302330142,2.1856441413399965,4.021723121857846,4.2639021959873,3.338233490273944,0.68875316554461,1.4786947928006933,3.4354570061102674,2.103795376546691,0.605794097799176,2.1166980415765044,4.059948385473094,4.395980899279014,4.116263563405848,0.24336947338338688,3.6815935790251886,3.2871814642031705,3.4441672252839926,4.934791953132347,0.09485276297350964,1.2303774591759231,1.8099030113729253,1.538348381204474,3.972085895810431,2.8203159829916924,2.763201796410307,0.6834228727277514,3.1394600985673424,1.2094419037150095,0.8519919408763199,2.3309908366299226,4.190337679551997,1.8857616622146,1.1934242148214524,2.8496696553763003,4.41970917648635,4.5435074365170545,1.6580936593930584,0.6395758099967697,2.6174175036726686,4.461521699157571,1.65284625966846,1.6203486950712753,2.7958046066648103,2.7591288867620403,1.1037903318202436,2.671738323980267,2.59803686168559,4.604063446375802,2.9531744792090473,1.4198133715907557,2.976621074909488,3.155726741729461,4.734972547179426,0.9008964632122052,3.057969388496251,3.6444110836430568,1.4448335985166716,2.4782744701839885,1.022913681366776,0.6668044334627254,3.3824437101419624,2.9842955227029933,2.100108739178209,4.3558100536785656,3.4187463574774224,4.609292071726977,2.296788895993598,1.0707426303121337,0.4714798905866202,0.4286379847804156,1.8112276232203361,1.2012894487027492,1.2458134652954589,4.973193147425534,0.3690629039953952,3.838434622256596,0.30840142477401633,3.9503250191185546,4.669745991260973,4.419810341739209,1.4114785334850999,1.6822242189774272,4.107482438099259,3.06698476728256,3.8599954946958714,1.5495287179748585,3.5615569218728105,3.1142141015908686,3.6125649697527096,0.16121709158548492,1.2526835769773836,3.6917486749027972,0.0051304467787116614,1.4001503582236963,3.262106821894264,2.0941946733900574,3.0505862935969477,4.304473266755248,2.6150070014928684,1.5435074124012338,0.3449313381210728,3.015858286680433,3.385488705926659,0.09098589792197243,2.234966911148031,3.116811809512614,3.2652518160141586,4.4192238714419325,4.968978269920735,1.7987140031544047,0.6210354753399572,3.9619471962454877,0.3346348661195808,0.48331896859562407,3.6671294616507977,3.2271619099531956,2.008544650594848,0.6416838763346833,3.80191028071043,4.493338933092433,0.6834739013059277,1.3842214488991789,1.8391968533759717,0.29443066507903404,0.6143547618261092,0.22444296666592312,3.3389772490389626,4.089866826800298,3.9263615982307156,2.0291820559594784,3.3713263313914132,2.536017809588121,4.66117815429164,4.478448227884082,4.723455935682988,2.155727555162945,2.537380811328238,0.8965545104368566,4.129830448218524,3.5136682965596466,3.9435107760193544,1.7761987729778406,3.2853199230007846,4.6463193745459765,1.4136384920483969,4.204361407693855,1.1420974799978512,1.5275946526660222,2.1496319905305383,4.114068592467524,1.7182622487667776,1.486436578656286,0.7106058035519103,2.556982013517403,4.989301708484613,2.579385074105589,3.993541099024668,2.8150581595775104,2.18272559436432,4.439409621925904,4.0549660027227485,0.8881768153150549,0.2976013299095792,0.14772541530830963,1.6227897977405914,4.771827461283339,2.5916849402387108,0.3869227118832552,0.0040635991464943455,3.4156125925718483,4.076940209335205,2.9251382132800186,4.386730053744423,0.8576715633026666,2.2208571206670538,2.4107180346832067,1.4538986944797128,0.5586343740739474,3.945285600369064,1.537980701241708,3.2899787895452857,2.039554271240477,0.1709366417892555,1.4728836136538603,2.711812905682672,2.8089138332344312,4.622882837299925,0.4820270022540618,0.3503790979191179,1.2608795359389036,3.8311542122714757,1.7248972215015146,3.7178851043208128,4.864776417027018,1.211564038257802,2.1573977265623476,0.42976917414254356,2.0299015521189423,4.481074740961761,3.484557039442253,2.9379045932947934,0.6210309376038159,0.7498073583302423,2.9395832447639947,1.6047288797841608,1.3959739782510938,1.991666206971855,0.827178759676731,2.0180021811120765,4.23290801723153,0.34510708419367875,2.491339611750798,4.238720106343755,1.8745319042683617,0.8248098352865108,3.0017357980702153,3.473465809491725,3.6505288458272056,0.6646396470456606,1.6572779601990162,4.165854980076298,0.37484008328210083,3.861371901933024,4.820965787169773,2.932427054262371,0.8750898826010034,2.356772537689654,0.9298536566818238,2.5302958799808914,3.8146320159985425,3.3806837777749355,2.2742010140355573,2.3827481992707753,4.231202736029958,0.17288369356765365,4.7343645255002915,0.288755743876975,2.0444290152067857,2.1131628138813143,3.258294836600598,0.21486140986014535,4.061949107613902,4.599449257275349,3.188878788122158,3.1726592697433906,3.8747075161620725,4.396888027681588,1.447985691706013,4.2651045287661695,3.690498212383946,2.58219375816045,0.4843401551287674,3.6882000431629667,3.180302950635138,4.175275540598024,0.9331946086872989,4.327290458780494,1.2441842908239786,0.42072356755410545]}
},{}],96:[function(require,module,exports){
module.exports={"expected":[0.0,0.0,0.0,0.0,0.0,0.0,1.4373000627941236e-43,0.0,0.0,0.0,4.7367294311145915e-208,0.0,3.013893128997611e-216,0.0,0.0,9.674020917687846e-98,0.0,0.0,9.029556092089142e-9,8.222898633260438e-13,0.0,6.57065815682e-312,3.2621128598613677e-290,0.0,0.0,1.479444449513007e-16,0.0,0.0,3.839297129211916e-151,0.0,0.0,0.0,1.16095139795214e-104,3.2235928223772903e-81,0.0,0.0,6.53891623593183e-38,2.980688603853641e-19,1.1918702142681268e-105,0.0,6.284681673827213e-44,0.0,0.0,4.060650595152843e-8,0.0,1.5266139632399228e-183,0.0,0.0,0.0,2.1880050538192325e-141,0.0,0.0,0.0,3.066977178369172e-295,0.0,2.7516864304498173e-19,0.0,0.0,1.1447837164501297e-9,0.0,6.063286313031871e-144,0.0,0.0,0.0,2.496028895664481e-59,3.252912507981076e-16,0.0,0.0,0.0,0.0,0.0,0.0,0.0,3.8592430708344914e-210,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.000342825284881e-244,0.0,0.0,0.0,0.0,0.0,5.908256198918873e-8,9.885383255968894e-42,0.0,0.0,0.0,2.309494447594588e-47,8.602242169164014e-80,0.0,0.0,2.2479798365553866e-247,0.0,3.81369398851748e-17,0.0,0.0,0.0,0.0,1.39628652467416e-29,0.0,0.0,3.021483483526672e-125,0.0,0.0,6.271816088960445e-34,0.0,0.0,4.0014064281022165e-249,0.0,0.0,0.0,0.0,5.957228257875923e-42,0.0,4.273955208678985e-84,1.1951429570251489e-16,0.0,8.202092970444333e-107,0.0,0.0,3.1478083441550264e-46,0.0,6.126847843007649e-24,1.9983891226262882e-69,7.787617745170314e-37,6.554370198108367e-150,8.527604376795098e-104,7.702031868238812e-85,1.2239431036701047e-14,0.0,0.0,1.259168193583631e-203,0.0,0.0,2.0885260600835214e-25,2.6921497901361006e-136,0.0,0.0,0.0,0.0,0.0,0.0,0.0,5.797985135983558e-33,6.816926551798943e-179,0.0,0.0,0.0,3.0048824841333747e-33,4.234266101740186e-65,1.7568892107797856e-27,0.0,0.0,0.0,6.916685405070599e-25,4.2183608737894856e-51,0.0,9.93610661631364e-16,1.4631345194192475e-33,0.0,0.0,7.861431707634675e-184,0.0,1.634688799868326e-103,2.984326278083801e-71,0.0,3.374492747094141e-198,0.0,8.081027211938094e-106,0.0,0.0,0.0,0.0,2.2653395069824238e-67,8.375140880500827e-93,0.0,1.2328848831388225e-147,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,4.062544494698662e-62,0.0,1.567557581528242e-68,0.0,0.0,6.821324687858793e-43,1.7185482628787762e-20,3.928587811618035e-109,0.0,3.3153634761957245e-27,7.339209125139078e-10,3.780267618985052e-37,0.0,2.6567914732830557e-59,0.0,1.532644556588536e-29,0.0,0.0,2.034336808784709e-27,2.141452105639439e-67,0.0,0.0,3.9585289614928924e-61,0.0,1.0076502306797907e-7,0.0,9.063204479932849e-172,0.0,5.850549094450754e-60,0.0,0.0,0.0,0.0,0.0,0.0,5.001791442557669e-173,3.0849529999405135e-41,1.4324463878347836e-13,9.31630987749005e-228,0.0,1.3485143218952865e-81,0.0,0.0,0.0,0.0,0.0,1.2899214715770399e-24,0.0,1.0937776644730741e-9,0.0,0.0,0.0,0.0,0.0,0.0,6.338073699139172e-144,0.0,2.0820235006411167e-85,0.0,0.0,5.3201957939391626e-48,0.0,4.615244044153625e-47,2.1694832761179836e-26,0.0,8.35299333751939e-10,1.0539223421463095e-118,3.7776819966035226e-83,0.0,0.0,0.0,5.079253320464612e-68,9.893094845903968e-277,0.0,1.8828459474990065e-65,0.0,1.5019811318318035e-9,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,2.244808457917147e-31,7.346702013167159e-35,2.0227877712147055e-39,0.0,0.0,1.3491103274171049e-251,4.859813974097568e-86,1.2923662066362515e-13,5.28290407852625e-106,0.0,6.232035281015069e-21,2.1047071025406458e-14,2.2777427900963843e-29,2.6841011407041985e-47,2.26621296811119e-27,0.0,0.0,9.935387873578e-33,0.0,8.910641397054906e-108,2.397741496770775e-132,0.0,0.0,0.0,3.2901639637e-314,0.0,0.0,0.0,1.1679259845030324e-31,0.0,0.0,1.1896671532506137e-64,8.578508936011973e-10,0.0,0.0,1.762458309252122e-17,0.0,0.0,0.0,0.0,0.0,8.158102891741876e-92,0.0,0.0,0.0,0.0,6.077974683062789e-249,0.0,0.0,0.0,0.0,0.0,5.0457555409126914e-70,0.0,5.832247209871297e-278,0.0,1.2483521609061012e-37,0.0,1.3108822719251417e-155,0.0,0.0,0.0,0.0,2.384423970695614e-32,0.0,1.225309477279069e-159,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,4.62207260284928e-164,0.0,0.0,3.8728862824391623e-36,0.0,0.0,0.0,0.0,0.0,2.1233964224411875e-6,0.0,0.0,0.0,0.0,0.0,4.905914099517169e-70,7.540078956482724e-19,5.740223484249567e-187,0.0,0.0,0.0,0.0,1.1681092228747801e-54,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,6.641928060574541e-268,0.0,1.0330364529663336e-25,0.0,0.0,0.0,1.3201153306597695e-98,0.0,1.762581602903916e-30,1.1925878001248251e-8,0.0,0.0,5.559260199835579e-233,2.095482415745135e-8,6.427684190559265e-256,1.1826384170519509e-23,2.542220065111621e-37,0.0,0.0,0.0,3.775400571957296e-12,1.5771527058635014e-66,4.572125832078703e-34,0.0,0.0,0.0,2.7762407897219056e-180,1.0301087044726589e-41,1.905430192842863e-130,0.0,0.0,0.0,2.0021778571832413e-14,0.0,0.0,2.471282144784782e-71,4.651601244146551e-282,2.830012330399613e-222,3.444533885210764e-163,0.0,8.084801157055976e-34,0.0,0.0,0.0,3.1896681157556257e-307,0.0,0.0,0.0,0.0,0.0,7.307567394889622e-13,7.173609096328782e-47,8.240218475280373e-164,7.264240050556721e-57,7.439257806992896e-50,0.0,0.0,3.8946740021823246e-28,9.026174944848713e-14,7.884903505628002e-58,2.118617106677047e-92,0.0,1.3395803822778561e-32,0.0,0.0,0.0,0.0,0.0,7.113102876008382e-254,0.0,2.6814771638020877e-111,4.731105230527167e-8,0.0,5.6423900454258596e-24,1.1942036645936602e-12,0.0,4.3919525943009584e-14,0.0,0.0,8.485820329635232e-14,0.0,4.942742477418029e-32,4.370521839604284e-25,0.0,5.3260350994441104e-133,0.0,2.2367284894899338e-153,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,4.061439549549345e-90,1.828263579829975e-43,6.231430981663771e-78,0.0,2.1667636382169173e-46,0.0,0.0,0.0,3.650397835093226e-12,0.0,0.0,0.0,0.0,1.2400877135267625e-76,0.0,8.92336977171589e-93,3.6182403040348834e-254,1.34101317640022e-74,1.4113456432114936e-60,0.0,0.0,3.783625969690783e-41,4.3030504844273045e-12,0.0,0.0,2.5283131189729076e-108,4.7990612274617696e-18,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,2.9128993250641547e-203,4.8521685043918584e-57,9.078760304920827e-93,0.0,7.030517607282168e-122,3.4861379036213093e-9,0.0,1.6611948293802457e-19,3.0251398927017174e-66,0.0,6.101327426671753e-46,0.0,8.756167288113895e-59,0.0,0.0,0.0,0.0,0.0,1.8010186221174555e-180,0.0,0.0,1.5744244560090728e-12,0.0,2.7591132390554372e-244,6.830158477471824e-64,1.8700886835636546e-222,0.0,1.8550009561627479e-9,0.0,4.692701887100784e-27,0.0,3.8433447024805195e-34,9.137861743257977e-72,0.0,1.3911764529283208e-29,1.162345267908186e-16,0.0,0.0,1.5878951870240263e-22,1.2878518398371833e-9,8.347675515605283e-126,0.0,1.035880299851807e-99,0.0,7.466740443633968e-40,0.0,0.0,0.0,0.0,9.4e-322,3.775573562024392e-21,2.5769868877708686e-75,0.0,1.772319573135582e-294,0.0,6.26175382161789e-40,0.0,9.589442050414363e-8,0.0,0.0,7.31773373134122e-26,8.443105726382482e-92,5.330461974881702e-28,0.0,0.0,2.3191147848665765e-190,2.0714769276167575e-61,0.0,0.0,1.6622769087367807e-135,1.0243035058430277e-100,5.504241705600888e-109,0.0,0.0,0.0,0.0,0.0,0.0,0.0,6.651151663291265e-71,1.5676917373035347e-247,0.0,0.0,0.0,0.0,7.018477992818756e-19,3.943955860149549e-15,0.0,0.0,0.0,3.7382660968189025e-30,2.179299263894142e-25,3.2387364034774108e-139,0.0,0.0,1.7450060624089456e-146,1.290576271824484e-115,0.0,1.2972729962502717e-58,0.0,4.495787713283133e-296,0.0,0.0,0.0,0.0,1.2950847299847569e-81,0.0,0.0,0.0,5.043121485041153e-153,2.2449764886506948e-10,4.0043751757752696e-219,3.9001648564877e-311,0.0,0.0,1.664545268792949e-253,7.633705315595503e-36,9.710832625666993e-28,1.0729423872453378e-22,0.0,6.597736974908756e-205,4.1593451748792308e-53,0.0,3.691715531635989e-22,6.933147576143888e-90,1.803556912876727e-43,0.0,3.081805634342612e-28,1.3121867304093272e-5,0.0,0.0,0.0,0.0,0.0,4.3743903624297316e-6,0.0,0.0,1.015379643309175e-7,0.0,0.0,1.3454444017905933e-84,0.0,0.0,0.0,0.0,2.401091336291221e-29,0.0,0.0,0.0,0.0,5.398927132833185e-50,0.0,0.0,2.4211819298699443e-45,1.0298847549914691e-20,0.0,1.8443906349937207e-48,0.0,0.0,0.0,0.0,0.0,1.3286196685503118e-176,0.0,7.441816789818569e-160,0.0,0.0,2.9758126166282015e-210,0.0,0.0,6.132357788675832e-63,0.0,6.63344403356491e-110,0.0,6.871539832185588e-21,5.969968633220679e-36,7.673521884915823e-48,2.6637640504994724e-12,0.0,0.0,0.0,2.985974736220594e-209,9.97696100331999e-20,0.0,3.459940076383071e-52,0.0,0.0,0.0,1.3428757396621445e-89,1.5842282907989594e-7,1.80499917974868e-179,0.0,0.0,3.9374460085138923e-79,0.0,1.9669093363348502e-112,0.0,6.945618641244977e-90,8.532885170226933e-142,0.0,0.0,1.7456351969600563e-299,0.0,0.0,3.0156299828525866e-182,2.3582156709638243e-80,1.336268164722213e-53,0.0,0.0,0.0,0.0,0.0,0.0,0.0,4.2041208185151697e-69,0.0,0.0,1.843293437815457e-36,0.0,0.0,0.0,0.0,0.0,0.0,2.948064039666624e-93,1.262551039369715e-103,0.0,0.0,4.542554968528434e-18,0.0,0.0,0.0,1.461940504593746e-124,2.729680873705705e-32,0.0,0.0,2.5290985324171296e-110,0.0,0.0,1.7786680123924422e-87,0.0,0.0,0.0,8.943939350109109e-30,0.0,6.460181298660274e-37,3.984177153197181e-148,4.371728582391653e-53,5.521572737371066e-121,1.7816184699661048e-16,0.0,0.0,0.0,0.0,0.0,0.0,8.943984725164739e-137,1.9323172914679462e-33,1.4767038209647564e-46,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0783060610817061e-154,6.582552504548326e-172,3.1823645320372846e-123,0.0,4.399090468480849e-32,0.0,0.0,0.0,0.0,0.0,0.0,6.2221002217856125e-15,8.311595058357947e-296,3.5092097694181e-105,0.0,0.0,0.0,5.998176639933184e-44,0.0,1.2146440250687814e-13,0.0,4.426298484961573e-43,0.0,1.2077041803108835e-32,1.14764456373273e-80,1.056764201370357e-50,0.0,0.0,0.0,9.137434118759876e-36,0.0,0.0,0.0,0.0,0.0,5.435249522270178e-41,0.0,0.0,0.0,0.0,6.3326784157640955e-52,5.40664928331314e-66,0.0,0.0,0.0,3.743152429277917e-109,0.0,0.0,0.0,1.576041267520686e-10,2.9520205935034747e-80,0.0,0.0,4.0694265072771445e-144,7.13806705896658e-31,0.0,0.0,2.898621899460339e-94,0.0,0.0,5.429937191780031e-87,1.0419768687664543e-121,0.0,2.2746010251339904e-67,0.0,0.0,1.4594302094088378e-20,0.0,0.0,0.0,0.0,3.592447880048564e-174,4.393774176803656e-39,1.895108235316377e-69,2.0921559487076125e-9,2.034315599713838e-118,0.0,4.387717520038442e-59,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,2.5923264233317873e-40,1.6032273828477833e-17,1.5774606107861543e-46,0.0,1.5038306346573242e-298,1.4935488395369352e-210,7.083134544565973e-70,1.8002326629236e-70,0.0,3.0282902456110716e-224,1.49144641395367e-28,0.0,0.0,0.0,5.159038306118586e-144,2.866030747858689e-58,2.4483378542100164e-25,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.2170153385164028e-50,0.0,0.0,2.5037008346653276e-60,0.0,0.0,0.0,4.934133005466115e-27,0.0,0.0,8.546580818097393e-100,0.0,6.646289812690958e-71,1.0319771122427006e-92,9.840953190576576e-244,0.0,7.677646827431403e-126,0.0,0.0,0.0,0.0,0.0,1.0725777272359803e-23,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,2.25627738906364e-34,0.0,1.8146528709878826e-12,0.0,0.0,2.7451739345305196e-46,0.0,0.0,0.0,2.9751573585515795e-31,7.657719438166536e-167,9.240210862513018e-22,0.0,6.178287866814414e-41,2.2991516197184633e-169,0.0,0.0,5.003875658628265e-207,0.0,1.4767376604542606e-26,0.0,0.0,4.52735949526283e-264,9.637424914679248e-28,0.0,8.85072865300311e-197,1.037871159289262e-11,0.0,0.0,0.0,0.0,3.455592015244754e-19,3.3179456564722603e-20,1.510265405015055e-252,2.373728095839463e-19,0.0,0.0,0.0,0.0,0.0,8.187722270500675e-17,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.1655644058864857e-68,4.735237500628733e-82,0.0,3.816146392864837e-18,0.0,7.161248153330975e-154,2.0315341971713263e-65,1.7234406624658046e-54,0.0,0.0,1.2030309877054963e-29,3.6303774494134534e-198,2.7807108480957324e-19,0.0,8.205104568348745e-103,0.0,0.0,0.0,0.0,0.0,0.0],"x":[-14.325189609630742,-16.067954509469264,-17.38967295514216,-16.43908785404479,-19.456356611792682,-12.333772552825888,-12.943544214291103,-10.931449120546748,-19.6324942231864,-10.27390617604172,-16.780225786122255,-16.791010299049958,-15.101196347774074,-14.723084077012503,-14.66792591349298,-10.331811606896453,-14.571534536748025,-13.675552077120543,-10.850898236620871,-14.958856782288404,-14.009573959036006,-13.054040506981954,-16.406511169013946,-18.207689892767945,-16.603604900617107,-10.912056204339748,-14.62013122580036,-18.62567321485091,-14.232036604386963,-14.315742091040562,-15.89324050458793,-10.754981937728099,-15.467017081925665,-13.71395234935968,-14.710186765953498,-12.775754798205273,-17.552555532785327,-10.200892120247536,-16.907682056743884,-17.316463475980196,-15.888788604876494,-13.20923678057846,-11.9705256777141,-10.589691290404538,-19.858896694420938,-10.87369560127398,-12.059890653806455,-16.86246958911012,-14.208281601716624,-14.76975778511309,-11.557415848822165,-17.538937792249968,-14.99730861168609,-15.789061754926308,-17.358497039115473,-16.80771384849184,-16.584622702610236,-18.99781133194356,-10.786785874075214,-13.822725252799232,-14.570740888990334,-13.52679204436507,-14.626165435927112,-14.15314489717395,-14.771024862073476,-15.050593481636712,-15.968760563644878,-14.910129557389677,-12.02283569571874,-11.61966329051661,-14.728627291208102,-11.54390930236426,-14.081951713940919,-18.501925476251376,-15.277298145787963,-15.929080630696294,-19.710579909257405,-15.092209478009718,-11.282310877042796,-14.732485852750798,-12.761063906759375,-19.062453115084452,-19.18192448187613,-13.884879765202848,-10.510468781450715,-19.72130871131816,-18.719092006986447,-10.130491075521146,-12.998556387787408,-10.686742771990028,-12.685879380269105,-16.191222225630796,-17.607191779084694,-14.607039375236628,-16.35340878812366,-16.274802234953185,-19.159508613862304,-18.453817537205342,-19.831416069916045,-10.430556247317831,-16.88248345843951,-10.065913192834559,-14.19228097005371,-12.649170484980408,-19.858557946096496,-15.711976018293633,-18.48577396188418,-12.623402685234486,-19.566122644848,-17.121343303678998,-12.246722404769699,-10.670360323750208,-11.411546177827315,-15.410529722758097,-13.751323224785427,-14.187380419221551,-11.40455856069737,-17.74727145705559,-15.73835963051324,-17.081372227850757,-15.11896251198583,-15.083250911953137,-11.721657167201187,-14.734721612389263,-10.829499759278685,-15.438521517809335,-13.9845590880653,-10.437597020352689,-17.040311097021437,-15.439594545272957,-11.43124136755161,-12.952134728443808,-19.669484948021573,-18.684819075981355,-15.152033016799615,-11.61885849804811,-19.04801517779623,-17.253090242070705,-18.47947910338414,-14.560332643666074,-16.214986420405346,-14.092451657399929,-11.933583379404764,-10.17823742330757,-18.028635019389952,-14.136667867316575,-18.193363241700705,-18.71846881575966,-10.077862786741946,-10.597644249362386,-13.296554309525536,-18.65331543008898,-12.193417490754488,-16.351112542914244,-16.03882222771089,-19.842928307718736,-19.719757070296055,-15.029200718999412,-10.019021617305066,-19.503266586456117,-17.440470046687196,-15.754969795004053,-16.408491732976508,-11.546472473506192,-14.856604775875844,-14.344226377916986,-12.163460056104398,-14.15166760519697,-16.633873994645437,-12.437076804026859,-17.23782693790464,-14.185257067091134,-17.490474334530766,-18.264683180616384,-19.8266933700866,-10.956310855896383,-13.825342273885568,-19.401793784765736,-18.33484178819949,-12.676980672546554,-15.292222856261489,-14.444262090452774,-19.762463489694632,-16.986868851051323,-15.812984766079195,-12.76190991234579,-13.11119282412015,-13.477808865090351,-10.958247603621441,-14.943168138278635,-12.16278133970462,-19.531762448664256,-11.53998640767082,-19.760487946214333,-10.033918505051787,-17.646328823009497,-19.711431105706595,-18.398440047960026,-10.83815458292974,-17.668606298352568,-16.640221280745557,-12.308123950772213,-18.790004534718868,-16.361145704566724,-16.701208866079007,-19.841056651667678,-13.116251262118793,-17.207811397093884,-11.632610309773334,-18.796761168395435,-14.631442132854227,-11.998364366129914,-15.006670554101746,-15.932704503641462,-15.423466173837891,-14.523307717510354,-10.478863040185688,-18.251416693065444,-14.594316555776512,-11.11474704310946,-13.953919726863536,-13.65993837142182,-11.021264147794954,-10.390892502917747,-14.536192593441847,-18.2682760464063,-11.020359154983105,-12.730269093200787,-13.321860744836167,-10.713133793287149,-17.131086894417304,-17.610761149885036,-11.561317115570288,-15.9451552165819,-16.98680886066828,-12.427587238712128,-17.299324296747372,-10.114394130000914,-18.37936949820292,-16.053593128614075,-18.15819885336255,-17.435174535439977,-19.544015748271107,-12.739397754881237,-12.678508805905153,-16.722728850936527,-10.26373350987548,-14.27589613048877,-11.87558485722092,-19.16274154988375,-13.230534911231068,-12.881860857402645,-14.278285213957368,-16.764439652087283,-17.719277931526985,-18.495514850854423,-14.355011325149786,-18.17105822940412,-11.002131169109589,-18.427009983556964,-13.271433946530596,-12.933764977821268,-14.316241234752303,-12.894922866328482,-17.173441425966168,-11.137772402232978,-19.836942670927556,-18.828270798418295,-16.555501389078785,-18.14232715249226,-19.614878212799766,-13.115780952511615,-11.18953717512992,-18.389269335865983,-10.613557536773367,-12.398889493079375,-17.937547223433423,-18.872827309924244,-18.953611012954077,-19.088094294189396,-13.029083894933144,-10.280252263729043,-19.796126705750254,-18.63236935210361,-11.892430388900872,-19.912008841638777,-11.258758711533414,-10.686307878179647,-15.43539243853347,-16.463531346213756,-12.27620384831047,-12.059331545603841,-16.55507447014205,-17.75738058354173,-11.773685154378544,-12.18474850735284,-10.979744934079525,-15.784447917507267,-10.922233937882533,-14.722226344290343,-19.21763136407694,-14.720784074625694,-16.984906512616988,-13.883892464692584,-10.585105643335947,-12.676176416555398,-19.538965448255627,-16.75638930120367,-15.732243592716264,-18.830848603194287,-12.555473919506898,-11.591826974723894,-15.425350994462288,-16.017743207877007,-10.50763565993969,-17.928172243254103,-11.457560777603181,-11.233095882305955,-10.582325567208633,-10.015867452582771,-19.745489223925862,-15.419534754455364,-11.32350464645723,-11.935704947823286,-15.527499721559035,-13.45251156903607,-14.574576691298757,-17.58381078019675,-18.634976091317974,-15.963063162502815,-12.435887790961422,-18.707946829000633,-19.228994759917278,-19.422649157363686,-15.747082764759917,-15.120901317770263,-16.62655265121763,-19.027414926453538,-17.62003781004751,-15.492024681488928,-11.478057174015452,-11.484556593289295,-16.135238816549872,-10.374095674883483,-15.75204209457269,-17.625630210879038,-15.00486498581337,-19.074458876703467,-15.034459948194511,-15.371859618402341,-10.011384912557212,-19.604351564852042,-19.156938280875842,-13.299862795980985,-10.508551638416698,-19.301897712233746,-19.61258693098532,-15.69694783434545,-11.004935980100925,-15.674012844621005,-14.070606478194785,-11.385999688877842,-19.898401600457213,-19.119772838204337,-18.29818175279509,-12.17220674986275,-19.796641715431612,-10.300248612009646,-19.3210432546964,-17.04228826187149,-12.49754287131502,-19.52027113994277,-17.361160485833075,-15.31385710720082,-17.381492566298206,-11.9444628941454,-19.222312922281716,-16.264146581975027,-14.853693808134857,-13.292864847301217,-14.482110680602847,-17.671352458611842,-19.867680932874766,-16.27814224103802,-18.68394888208812,-19.375475674262322,-18.852315763332605,-15.33041417351736,-19.1741732325584,-12.869530029413578,-16.66590201265443,-17.521458403448825,-16.372392728511407,-13.248903346736654,-19.35392168039553,-15.380221385741699,-14.11805186854676,-16.304804182317476,-10.074208297782992,-10.714603346736167,-12.729245957571917,-14.926695851934825,-17.847807310534964,-12.237624519054718,-11.711119336188062,-15.016670163887069,-12.43908234005559,-12.929001753756582,-17.326030733733802,-16.588995602912846,-12.989801354111659,-11.86903088691912,-10.425560817252785,-12.065425617327008,-17.87932261477095,-18.235199967912884,-11.541288175514392,-14.604119337724272,-11.664490972766577,-16.007400423694012,-12.785526806420314,-13.512105304330186,-15.160235295873047,-12.321294915838745,-18.931521426394266,-19.857263119221603,-14.66319896941582,-10.36908931688497,-19.267846975420678,-18.30435325295055,-17.421888143379693,-15.113457264630746,-13.21592423051724,-18.178133277422937,-13.867373601015284,-17.808753858726448,-19.310203459691127,-19.301402548539976,-19.658367892723753,-15.271983556947824,-17.923700911364996,-12.095082865692454,-16.816380444715357,-19.92030219728784,-12.38358243107228,-14.26694679044407,-18.629189238512012,-16.372838093335197,-14.853757640478891,-12.357169461676927,-13.318300357776327,-11.999731363761834,-12.667060985458384,-15.206833545362677,-19.522028239436274,-13.193671390062713,-13.487564621989689,-17.43198959848237,-19.84527998213725,-19.957443828095563,-11.227767415978358,-18.961272403983074,-11.080589482476631,-12.590964742165704,-11.90152611802872,-14.692092098478145,-14.498290511947634,-13.04113661523439,-17.846964822966605,-10.072877469018959,-12.385427740218704,-19.000442687755882,-12.033721531076814,-14.325603450287442,-12.675637123934697,-14.180932294311493,-15.5051393500882,-11.791419911204265,-18.644871037404346,-18.941160864915364,-17.924408905832895,-11.893932546155492,-16.69807777115578,-13.996950598409484,-15.956183140187958,-18.91192744930606,-10.95325620699304,-13.768633594054172,-18.639577610113772,-18.741857445340397,-10.753480018930476,-12.861844582824883,-19.64103712272159,-16.884087013792644,-11.006950850708304,-14.561528074730417,-18.901483901383674,-18.6842680628637,-14.602755534229361,-14.381916165812424,-18.02523250804431,-11.094902850905424,-17.692773664426827,-19.257553406203986,-17.993078233798144,-18.002761344851525,-17.33895633232251,-14.802240913668058,-12.566659110646107,-14.010226913484484,-16.850850877444163,-13.351449233894321,-10.571941199659658,-17.937228306163565,-11.505652706446394,-19.40158518017342,-17.8914176717187,-14.110417634213626,-17.316065915086195,-18.948905708955866,-14.897126000447301,-15.392243686201802,-10.027885320656711,-15.775953419583617,-14.691739907227445,-19.949322964286658,-16.435371377046618,-10.772834685811398,-15.907903190228065,-13.177221878210581,-10.947353098769613,-13.119884760594998,-14.277702618567378,-11.81670417768889,-19.172723077641354,-15.937371227192823,-14.967383270507133,-18.37196162797556,-19.373908336749935,-10.023816915148787,-19.96529181734938,-11.172779662309395,-10.043099453527795,-12.240853123911947,-19.970354749322606,-18.30540866996834,-13.359368290135507,-15.291492009932703,-12.652425643280964,-10.756534065628856,-14.385257226457899,-10.384670058271537,-15.592242480797747,-17.833440080775635,-13.504001903736462,-13.943322595921469,-10.002928627939395,-15.381668207149426,-12.676476577866024,-16.579812010927863,-15.520725548290674,-11.50733796570407,-15.776227823824144,-10.815488810965423,-12.107958858399545,-16.01910217270323,-11.843886361153684,-16.39858227184176,-12.861662823933656,-19.869695949442086,-17.44593087313153,-16.018889852275457,-10.789222159994118,-11.45301804782716,-10.80519865520657,-19.341904877437486,-10.318936749321834,-14.983092680158732,-18.256023819478326,-10.071651843806546,-14.372182608171023,-14.843619108275295,-12.687735489225261,-17.052814026297398,-10.786813149910152,-16.114806685706625,-15.296003456643664,-18.97063040269406,-13.027270356825758,-11.466879157375086,-18.79476076805102,-15.401636320105736,-17.946689818248093,-14.310179513254464,-16.883287472847904,-18.9970280538829,-12.026139338969513,-16.479134440738154,-10.84997377514295,-13.171155167860206,-16.43491081531447,-17.514939467677667,-18.294703225593505,-12.355204248273346,-12.901289072559798,-18.677342780547114,-17.127649955565495,-11.957938322702793,-14.111535644608356,-12.149668202709908,-11.065528721842595,-18.919710415917027,-17.010627890831532,-12.8634092163555,-13.490724529631617,-14.88398412914501,-13.589860781610648,-19.765179335021767,-15.96309764942012,-12.925441500521782,-14.92789223035322,-18.731638262010517,-16.863926604749885,-11.763785198249524,-11.129490272634573,-19.21630186918629,-10.954410279357623,-10.415659213717426,-18.53588069397076,-17.70038829004497,-19.886451656114268,-11.449475992427447,-10.443927313250413,-19.143666093477854,-14.544366160288098,-19.351172307905255,-18.229743747090417,-16.120221597922743,-18.74354724827852,-16.764029967466982,-14.514565991204886,-17.794815622827073,-14.017807217493294,-17.425195491716163,-11.134776108965514,-12.435327798237994,-16.803552522103494,-19.177273283365153,-12.764446400237315,-10.653665917009334,-11.361025123398443,-18.36837560330752,-18.94935364814558,-10.731814359684176,-13.973202285686943,-13.151520277258964,-10.165466671221779,-10.1534213735087,-11.31001456433486,-10.237590297350128,-18.638222738529006,-18.063556020787168,-11.726190164389374,-10.251461989493082,-11.834718798457793,-10.160586948865028,-13.741633670915068,-17.984784686777783,-11.378690652192391,-18.625058089344474,-11.46535158408346,-17.135556548617238,-12.427756874182844,-14.880730608758707,-13.688227365133244,-10.025647358695682,-14.814035930429625,-15.132874453963396,-16.489957394249892,-18.38444838694015,-12.085707758817,-13.581244122261577,-16.893906757422425,-11.491628394944106,-10.420968854264324,-19.25005570851783,-18.37398633078756,-18.845481453476218,-14.995390522669222,-19.164205160376234,-19.27001699625866,-16.132718547403023,-15.208792529294639,-16.34938184593733,-16.194465661676716,-16.698615952680115,-11.437856371951902,-16.817807966813504,-18.27295521553655,-10.187915439449002,-16.875275507482247,-18.02676954815048,-14.523336171928706,-19.732870878525485,-10.47389592747795,-16.878877056637698,-13.685153933413517,-13.074514835356636,-14.929105278799774,-10.635183338236464,-17.54232530595097,-10.613974908716617,-18.856106030591555,-18.450504021772787,-15.974534368410447,-19.84935171316781,-13.782823740008542,-14.75770020513149,-13.814524084349877,-14.409415312495232,-13.256709777964137,-14.209019988979293,-19.805826957387342,-16.91151013000679,-15.06244533145945,-12.60037011149969,-16.334847876092955,-16.069078792497283,-19.117687234378987,-18.82617392474198,-11.433322532655033,-17.881804152886712,-18.073505514849117,-18.4305157944444,-14.687321695279415,-11.615621411588153,-15.572528694096391,-12.023592473349847,-12.92294980793561,-11.734553773640373,-15.537239116371476,-16.294586863514077,-17.153653247906664,-13.888615716901256,-12.56506819095151,-19.865941227094062,-11.352973391332764,-17.69810862658035,-19.240147219911815,-18.727650789613158,-13.093886070730804,-19.84337068659955,-13.27973055756048,-11.78428095263926,-17.147212502513124,-14.159432285770386,-10.153916656736264,-18.213286930495464,-13.416018461737584,-13.833751579484845,-19.60283270646421,-19.323748464258315,-11.53179463175964,-17.721324798162367,-18.548893036009837,-14.67002977832456,-17.03222412428215,-12.742548509764852,-12.72082240719309,-14.600958728898048,-11.032870402456664,-10.643866367783918,-19.637380573011278,-14.797022189839238,-13.642376481893807,-13.332127321407219,-17.444925993896895,-16.925614711482506,-14.711914734764655,-14.491592027765714,-11.979011451997174,-17.154713653675127,-10.075040293133492,-18.248485710942262,-12.669049317825332,-12.743533193901245,-18.508939757116593,-14.020323001809862,-18.947880892491707,-19.306486550464133,-17.43716472521827,-17.894700236082908,-13.521747297291288,-18.5308039202091,-11.907797145830408,-16.73731500291433,-13.073579660089951,-13.266820766327353,-16.16606445776789,-13.258521642976387,-13.227993860043519,-17.253904349717175,-18.189580188043447,-10.174332285693264,-10.206427648336135,-19.044770264327386,-16.156482083507015,-12.310718217333994,-12.948901987795669,-11.1953792170023,-18.923331788492256,-13.82815538996189,-14.012350481148353,-14.522566471123968,-13.616418383513242,-13.976280279193425,-13.180034513361615,-15.119046435506752,-10.022265384258652,-15.618738718506563,-18.25542452453246,-18.947306808895963,-13.478190973223015,-10.29526094046195,-10.617117913286855,-18.788810347399483,-16.1211079431089,-12.439330164341353,-16.42093433552409,-10.71554460182815,-17.85513684447497,-14.92926642407512,-15.272406644168527,-16.070027073533016,-15.231205697833424,-17.430416526213367,-14.510243675993408,-11.944672337503013,-15.351557524587973,-19.94812289541224,-19.3133366140939,-12.748956280920767,-19.001544353603293,-17.576834951056885,-19.18845796978357,-18.007868001166397,-15.444449369296137,-16.43250653064515,-12.033319363762292,-19.28017313655119,-16.213023252854388,-14.25969302084409,-16.371213028615788,-10.53930566260043,-12.756592639100683,-19.460708920167484,-19.900899443999734,-16.673061919643402,-13.800795439858945,-19.180403971974982,-14.52935911365778,-13.027676737690129,-10.771699388717321,-16.90806617223162,-12.694468010857028,-10.204849495292398,-14.61126508862985,-10.72434591406062,-12.656586895711797,-14.062154885932154,-11.00881589977915,-15.893881608644222,-14.486041309320736,-14.200514331504623,-18.29588711684992,-13.52691723829206,-11.429116183235703,-17.473475298701565,-14.50651566830395,-19.201698177550185,-16.736775013751885,-17.35988328724351,-13.056051030857748,-19.18526381141149,-13.5879211116033,-12.840164881431491,-18.089287348536974,-14.40342887487338,-14.406493440609434,-19.433850990667146,-14.768213028026405,-11.460478079681648,-13.999613612670183,-14.32091369725362,-17.061611564494775,-15.813456330227762,-16.07842708275227,-10.538427461872825,-19.065758139292758,-19.933406517790935,-19.43407265704003,-11.350829315548106,-13.662560346532482,-19.081890795074287,-14.755719179936662,-12.971085647440152,-11.806708816093543,-17.441361561460194,-11.122758881767165,-15.046789197255668,-15.37029570106704,-19.80856463018461,-13.093962527227355,-16.87040256048644,-18.611295467207462,-12.13990720844695,-16.26708588720887,-17.91151356966831,-19.158963224355603,-12.340510742772267,-14.642252876944186,-14.843937907431556,-11.111066202727029,-12.987065573883873,-11.262231937556184,-16.425633072754163,-18.323659178733518,-18.057839758605436,-11.457165824458013,-15.137379325175743,-15.311063592458087,-17.14844822986971,-15.889622560126524,-12.921581848550893,-18.932455702645072,-19.039802579735326,-10.158267409652575,-16.843811730749202,-15.740037734618157,-19.57720193117202,-11.368632495674099,-19.87301990473953,-13.001772414954251,-10.457788700245453,-10.090770961159121,-18.34879050357441,-16.27779259088578,-14.830731804101111,-17.278790629238422,-19.592507167897367,-15.244863557021464,-13.147395475007333,-11.482846737788499,-14.51309408460429,-15.093473975870861,-10.609251560735654,-15.992477470627172,-11.712653954299784,-10.96127191128394,-12.657797950035965,-19.484470300247377,-11.608894005719439,-12.004411369403073,-10.16806340881085,-18.143344943153192,-16.278589826494006,-18.229120877750077,-18.656827560036273,-16.117521488349702,-17.277163566900718,-19.17054717721607,-15.29038986483643,-12.609194370824762,-13.719462557907626,-19.915300138988467,-14.02912008155127,-13.762318807011393,-18.47141035235892,-15.443266844543293,-18.969807089712695,-12.326981826928261,-16.185897325536857,-12.253743616213395,-19.02101002397442,-12.631889967967812,-15.806102821307139,-13.745518386179816,-18.436247591090414,-13.958143646703213,-11.733742523679796,-10.89736638691977,-10.98738334566769,-16.75887924721498,-18.848745323153484,-10.502797231367108,-17.03088333275772,-17.364419486276915,-17.11760424443319,-18.478152722169366,-15.934553771223312],"mu":[8.716518698418621,3.623111076099581,3.327819901980691,5.392273804097489,9.116574524931778,3.193707084255508,9.994606316166813,6.833649539854607,9.293247026758578,0.32184660362786,9.201559220287155,2.3128037219694697,4.447397786103635,7.524650418558911,4.027741012751067,1.6008982109333214,8.33149080011901,2.529231239585761,0.3548406379084801,1.5806042894032157,9.6200980163425,2.003899802089042,9.150108566560963,7.925877357548887,1.8533765496228893,6.253018771082333,9.702002482067636,8.261914478706544,7.842526349220973,8.913742539914972,1.4440495784959095,9.081729818827212,3.289333430228205,1.981198694374886,3.575151921484556,4.428077810251945,2.4070124520677205,6.433911158841383,3.075808461105849,9.627297174361804,1.526230597692464,9.55253572082239,6.564806123808737,2.742698180941845,0.7215148534378257,5.105920064837511,9.614366191599423,0.48365267616641283,4.673454121175835,4.071393665569025,7.343516402963443,8.771844109880615,6.44878485237683,1.976874504241366,3.150412889951184,0.30952211624572845,2.240991049484078,6.817444399602579,2.9769661164868966,8.352307903185777,5.836886792310705,0.32107207252531245,5.921959483576207,3.9851744188256544,4.117729476506566,2.2318409704783337,7.813321136985212,6.696507072002569,5.806487283251267,9.96336851253849,0.029336717383996458,1.6253456494416119,2.5478942031694185,5.377673012604555,6.299980370015319,7.290275775283954,7.147326614394913,8.607413964231876,2.9636703724400637,0.3425107890154888,5.970709594723031,2.3657529907483155,7.659568415171902,9.677616757264648,7.3406264042491625,9.556579394588834,9.145904733829695,9.693503551385561,0.3443293593766916,1.1333130040984418,2.458182811716403,9.503185847926733,7.701245019807132,0.0720778502521191,5.180835474720773,9.600055080205472,5.5766021684721245,0.026425367101123864,2.9762431821117663,9.124634035858252,1.0724281437771621,6.529913171496644,6.993856035427417,4.300801784014244,2.595444672432854,1.7696811436532833,4.694548137046002,2.9896714647836276,6.48448360926489,1.9522034674092792,4.1353289961674555,6.593884106039085,0.6397919705207844,5.550841719045765,6.593538730536988,6.03038468130404,5.209384878413774,5.538356132759004,6.154111261395712,3.8335664207953712,6.774434802166017,9.908887549399939,2.8141831467378564,8.064224695621219,3.2067053126361644,4.730825509486838,1.2131826822405212,1.5032142753214828,9.775956678216202,1.3572370930950761,4.921298842695457,7.387205062309521,0.4184147543773764,5.502115283205466,1.3947558191871279,1.717727112080194,7.818004108943248,5.838800026842154,1.5582871119621489,0.45830682118806587,5.267686918550709,1.461773976836942,1.2989723934822628,0.5314916569442651,3.3635832557789613,4.453508068997167,4.595921535543896,9.038678897861772,4.655621986516987,1.148766361782625,0.8932215307960978,7.028375415245696,2.414159505006197,2.263035189329843,1.0242232600395451,0.5048109373427856,1.5549153875685517,3.263068657622914,8.50887482660918,3.7368860827925743,0.3033372438291426,1.5808574699165057,4.941696223391016,5.738745253450698,1.1296423284796053,4.464441622663964,0.06808979990041486,6.8457774578909785,9.48693174495229,4.325011800141518,2.7502650374738957,0.7488274868394185,3.850019183117266,6.625280934473558,6.276106986408627,6.429642496635135,1.0058101139495323,3.2090015432477803,7.44809016477626,1.8940346145120923,7.61110786858489,6.492969286455659,7.172808185679247,8.344123128822819,7.546414918910276,6.657806305217527,1.9505804114884029,0.6289416288085681,2.7395501395603716,6.0554583474832135,1.6456041945267663,6.552530994835015,3.794249259731848,8.298514895320611,4.9931535331323325,2.2889575248762117,8.068395679805231,9.13965002608801,8.144780071302467,9.533501549698455,4.492044474549257,0.15998017496426487,5.199538780337618,4.309971277420084,1.239433524961504,3.134970876364891,6.993089587741636,2.4662079967733574,0.5233551015732463,2.491182428717198,3.3413243044522556,4.788116094311432,6.838590224825585,2.9276793401037415,2.85940056375777,7.601390123624192,5.009350427599721,3.392523409509667,3.541563481391097,7.1994010020237305,3.7013400407861496,3.032691409168613,1.3611866845312304,1.510820707822793,1.0302594347951866,5.098641943119602,3.818947967713351,8.457174481699411,2.2942035214846213,2.311968595796583,0.8722256913840387,2.135664510491029,6.481157877324771,7.550833953702927,5.543829566868554,0.9962905624701768,8.991549087609425,5.308557613076452,1.4669361041840268,9.426267798392473,1.1201870908784906,2.986918891078525,5.1336780224438545,4.1418099273765225,4.678269585739933,9.975879532496652,3.652584338281064,6.591732061150335,4.085135764746132,3.1523964331570875,0.488604679583442,8.211189743185122,9.530946617090063,4.856830319263102,9.255197694309514,1.4074282567417695,5.259941912630783,4.543331966278183,6.309993701576535,5.371208470926064,8.77855147871731,7.424026184273398,6.646917931000209,1.5861645245889378,4.657269192081557,7.745757104820486,4.560817236921881,8.422783769508445,2.5839900589652465,0.551585034628923,2.0197855550188426,4.784321530917641,4.105141216071861,6.612863526523787,3.9771000117108657,9.619336584556724,3.056266757513937,6.737346809342339,1.491741862012217,5.9720342668803355,0.5547232647215439,7.5973525782001765,9.694989446067,4.777888787431868,1.6343358610299608,1.343064611538174,9.794427338946964,1.3275966779122483,9.882048768704951,5.314954993928376,2.543655164964349,3.6755205470795316,7.3363243812923855,0.12537234433811273,3.322399457207126,2.471471447683855,3.5747335923497148,3.4248101260194352,2.990257920183499,9.479457019621627,4.2331359618890385,0.3444650621589118,2.027309659882177,9.310372591946148,8.058937582120912,4.059244849760281,0.7192813311305502,3.710330247665987,5.646978963471838,6.478913333939158,4.8006717081862815,3.666780006519934,3.3122330849134185,6.901074398123086,7.289766295528455,5.216476933531173,2.603524585497703,6.70735436018012,5.917045007290611,7.4423420389891515,2.353335772039584,3.9645116115273127,8.481632611927543,6.575751124453559,2.125076845677849,9.126334063771733,1.8238918401182058,1.3849423482799694,7.895019825977112,7.506373111690571,7.661629786149115,6.716040053356494,7.703605937307348,3.8150111681886756,2.671849893130296,6.118415532896961,6.497022989425886,9.219692957991745,4.630909773855927,4.649627479353353,3.7478018781472744,2.8788290860407084,9.647189944389874,3.7528788850257833,7.424892192492331,8.261842305457064,2.7132274427503877,0.42881717544809517,4.845719395763752,5.781834423565508,8.586658161454118,2.9197776645440077,0.8356508214692027,9.671141650510195,7.1631541965284455,5.744060180127535,2.8041082863970868,4.676037778319239,8.736273692397312,0.2191464651466135,2.5230597080716555,3.411647060306955,4.395877260016823,5.668820512388821,6.178597578273434,0.09917512299100206,9.75039285945724,2.5296172083658086,6.604898797430416,2.561167163403437,6.494337638487684,3.673728576828388,7.728206452330215,5.366184726428296,0.5693374179230393,4.650733127784026,6.476725342442878,8.54795635949518,2.7223324910139723,9.168871920159742,9.470810642346777,3.791298020984404,2.366669351325148,9.632186490220908,5.826922284356706,2.557242339307668,3.627229783490169,1.1741650608933774,8.254004163641843,7.143366834109893,8.902745341950858,2.881113953176977,3.7168092339899728,4.084261166218086,9.055746348122224,7.388446163224669,9.653305555091087,8.190081902459692,3.3438621666455104,4.028611236502135,0.17451868619359656,8.996304920429495,4.370528147031472,9.795776060394292,1.8015604092364823,4.797794281035372,6.80332297867984,4.746473621585312,0.22230885592795957,8.406706499130078,8.836464287576879,2.021533444396524,7.8131342896417255,4.202097790219074,1.8384963248237796,3.293780514496334,3.640742445741234,1.2251216412759924,6.580927839172263,3.616178836514772,5.956205947822495,0.7848968698145264,7.895448973416583,0.2687528339523215,4.2266435283523185,0.4862274227036001,9.593926854650396,0.12521057732586494,5.715094315942009,3.9767602433188043,6.992104888925555,0.5130541762337093,7.828237392840274,8.247139084811508,4.873611914740518,3.6934442908914167,8.031125663905211,8.623646627077054,2.0648701604497854,3.493025217918151,2.268099494213265,3.6037423983744676,0.4047582313367726,4.921290227705009,7.495361089414276,0.6932750012712496,3.928778903537451,8.024680438448355,0.4897301191897574,0.7075517994648495,0.501664690265593,9.349942923393442,1.3981736900786013,1.1607832441458,6.104600647375815,6.770884551566613,8.941635948234016,2.115328283101019,9.865524025343134,5.518058190874933,6.70231473062816,3.781105971931773,1.6316332509584064,2.689995974974182,2.3020896452610984,0.44653643808069354,0.6934239822704336,3.0540815036699254,6.5233254900436215,2.222046032006819,0.44157696109367706,2.826648884596168,7.038876438838965,2.8831503625977284,5.254163565235947,9.210890353825512,9.56232070426795,3.8671730530646076,9.378456763032064,5.748733746768913,3.6808582435700488,1.63475802909274,5.941399228097415,6.006876187250263,2.7657553650421396,6.170415593544584,6.569053770007365,1.7159684510245676,6.4279108980400546,9.962302064579,8.562727306920731,1.722701718953874,9.10207927426265,8.510472968426901,1.3493809012760893,2.2005691998694954,6.759072428497599,2.1546680270372187,7.139632831485116,1.7065434791423106,0.5764209731067882,8.484069902088736,7.71820927947656,1.1846285755929387,2.1948447753492095,6.770202441560214,0.37757703626232875,7.135785941013082,0.9898780055164558,3.9611688567172276,1.8974787839363194,8.898551658814327,6.144323746402245,4.194296255658648,8.709921000971107,1.846041580108455,5.343029025163002,5.816760508513045,6.229051138120212,5.875777733016854,9.958305524859043,5.23375263968563,9.018105521815706,7.62501282350037,8.972305740407897,5.037678860277475,2.17730863376169,1.1676347835131584,9.307719675820724,5.043615676144018,0.8233877781100118,8.699861940806372,1.374571487223677,8.781233487983593,0.4130151167383045,7.644857678089658,1.5371336858044282,6.032463894522568,4.490814621053163,7.03372068047194,8.689113455126753,5.885325122509384,1.5477897083172376,3.7545418682979737,9.182831236063755,4.173417393470748,8.319994555288632,6.041045170414527,5.436469611612324,2.8531099564136975,1.7966966722434496,4.840277180864987,5.2428326916026435,2.8699934853060616,1.8154940856908852,4.061744860726357,8.215603786024408,0.7040150679251411,6.229571568376833,8.355105586560406,1.0005332578319526,2.9341226127913544,5.633972940737153,8.39293670400142,5.853208768996665,8.939596501092051,2.221768727770752,0.21555870048610482,2.079434662769244,9.447689156875052,6.002645025497584,8.41356301322546,4.211236876053286,9.984637812642896,3.874616740457566,9.201853584116769,5.881827867154287,2.9072043869041697,4.845712173866257,0.9441161120151809,6.93692498537676,8.058754316506544,0.15064804703451395,6.423465269524007,5.374270439368216,7.045344350449403,3.922928834729804,9.389751363407601,8.227051188652192,8.810702386279331,4.116111499651691,3.1656648899295448,2.4143363918046146,4.857389394363265,2.4507086144800794,3.258876528847574,0.32049935699025145,8.600483181614813,6.238084442478473,4.3065693137078505,3.0975026949646223,3.4491725242989824,3.648152451065667,8.36604665126988,4.319323282108525,5.41937863655813,8.540726015125081,4.969773816058476,2.423893380727118,2.5074876054363093,5.657417748215923,1.4178519072882678,1.8732529927752228,3.2390710204165196,8.571451686842247,8.112185894440715,4.754989985833782,7.136808361145839,3.085165387873261,0.6779039103215112,7.866217228215914,7.472473401908686,4.739610348883765,6.314845305432533,7.91341799770626,3.3234643506556383,7.0396137993400165,0.42636885894206333,4.466933923530476,3.0724868148499818,5.597448274451555,4.227301050592938,1.9589648616779476,6.724398101398914,9.602146567015504,0.19306780873642904,9.428608411930187,5.206575594132987,1.9544747413893182,1.6695647739835628,2.4549578944828965,4.505995060323262,4.097311717902635,0.8515981848559551,7.279985771064432,5.948198638062909,8.673092218381848,2.9407092528643486,3.013932965926276,0.052565340235875,0.5143531704195703,2.788591236992548,3.8462203079039248,7.51149955517594,8.165466892853237,2.1073683747911898,1.5765182471886474,1.8750943472780301,9.848715901167184,3.0731727966011224,0.9796970145826434,2.7556700723086736,2.2509707585441485,1.1946409115132073,1.2670392039532774,2.47731662451391,2.783715904266255,2.17316669150712,4.821246035422185,2.9891500176761143,6.638925129470077,3.933746505308253,0.401504626427438,0.3847956367617811,1.67437952572006,7.8892292569159945,1.8872162749488486,0.015339538408396525,3.0692963914149773,6.540720929835658,3.251535215002952,6.4910925528698,9.126113672413808,1.064231581597126,9.224178013085586,0.9835426998806707,8.352752457581982,3.7291311895979407,7.235984191841112,5.0997951193324536,7.418289557874882,0.2219860470890067,8.603852136584095,7.376539342085946,6.024609141611963,3.717432415144173,0.46270777198568425,2.586107198271992,4.735292371839657,0.6647424788067124,4.724141270811721,0.18633441943055384,4.298545162560272,4.065272763328663,6.925858905699734,9.570478372149775,7.2324013105250184,7.276807600356106,7.389436518999046,4.064405728107392,8.502281837377737,0.9903662708018435,2.311127057794591,2.6911585413008976,1.7269465470372913,4.620318047110519,5.0893567756353875,2.3405239097784047,2.3885158303603404,5.158600025853102,5.4025081095757255,9.52444364245002,5.2504646441403064,5.463058761352544,7.12966274918853,6.276807104107782,1.0679366989502959,3.174858450303961,1.2883715112034988,0.33063947239297287,8.302370223701123,4.152679620592526,8.42588871146917,9.012121269336301,1.3824377315892056,6.8169461617909715,8.244547029099396,6.044711711060438,9.619621296815204,7.501165221728496,6.076393198777406,5.820555021026479,0.5314322216605749,4.768896979547039,1.3644170052444915,5.6045102724470635,2.21434967225423,7.5184946688432035,2.5599754070937686,5.142447802230055,4.784891029493858,7.983372518738097,3.0558275529091317,7.430242626602313,0.6727157474559231,3.2047407508904846,2.989167804281554,3.6170274279454517,9.423358042308807,5.771694591660779,0.3891124212375985,2.096595497657434,4.93048121769418,7.298664811339865,7.9274086721890775,0.9828857066118712,7.180812248598216,4.127698002786868,5.864628764023074,9.346350795493365,6.017705627289136,5.719666196083127,3.4795347045416958,3.9538445374335573,9.24791161211369,0.27215830513710904,1.1621136729669868,5.007355093425057,9.909931503603929,0.6579774079937883,2.2665105514316775,7.602132403278441,6.955508246976432,2.40981333126683,4.274076967448863,8.56005966347,5.465738156394375,7.967323174349876,7.121696024610711,9.151566380870479,8.74879014265423,9.110186789023969,1.8576756306819564,2.8777921487862224,9.409166625782877,5.746570832245124,1.4448802769620617,9.240135170603256,3.701120363848953,1.058550890604688,7.682596414658542,8.847736325084286,1.9949944324477986,3.759504863045311,0.28972521116042094,2.3992033742017527,5.739191880551631,4.642703242459543,1.699446560909903,8.790021773248935,8.516541315616683,4.604491280920547,8.194008761864701,8.069913673707536,1.6706831268863476,5.3407002676639,5.071343090057219,2.601462979453877,6.722138984797459,9.537134419791437,2.0779006845766768,5.002704083971099,5.084125954868366,9.171903261548922,0.008496506876272125,7.300582837414254,7.110022319491611,5.507057741695,5.49302426013438,2.182698292084857,9.733168411442175,1.1113216241280566,6.472298644342674,8.97318227667866,5.2671907446009865,6.879540685194541,6.621824313104295,3.1914066484535186,9.811524868720308,9.730298958287298,5.4851811399274375,0.6151195554917654,0.9877969765718042,7.988846168896924,8.557598714469876,4.1037238565184815,2.2815492366655477,8.950604899974365,0.13176762576295742,7.7305625251021475,9.598959495494327,8.885045641369096,3.7109365085770696,5.796099856016326,3.86905500657438,6.919659825697084,5.7799994763328755,7.9184651408113815,9.792039925535613,1.4135419039308639,0.25754865719731734,7.068821118269808,0.7548600115428483,4.776562235764043,8.318560746557665,8.069309453709725,2.2066507864744866,7.127724836156926,9.957403196398424,2.33767471457492,0.8024315477742494,6.409411838158119,6.865224085294446,1.9419458839020542,4.824995995938086,9.030806341057112,3.4605965615830914,3.565431075060186,8.598353610124567,8.79402990182391,0.2618178363155055,4.740946833500434,5.385008220795124,5.72206857800746,9.106862490095043,3.291867933358017,8.095229952229165,8.833541230977243,8.636749038179243,8.175977273129412,7.519999297126445,7.426029936234302,5.667545789232502,4.3786473852190895,0.4871996406007706,6.678232461161175,4.844797947582869,4.326011819203732,4.495468161177627,1.4114803378106733,5.042290413548507,5.765986422136189,5.1331003336390175,3.056294671247821,1.3048877043613327,2.072666626523778,7.149057391242046,4.0833056891524055,2.028154610196018,4.307142952262842,8.38698900129977,5.368158282459805,9.074777435885569,0.092120290620481,6.8777008472462775,2.012126903192921,7.4332569985437,1.7682078600254858,5.018178911873552,1.0812172595029401,9.18667011031756,3.6901139249471004,5.495586401048502,7.6070678387731805,6.364455261087649,6.698185720865196,7.831947018272681,9.257001000578091,8.663609834048273,4.336255010389378,7.532239324544974,4.0489666429025135,6.721017824956217,1.954884117504041,6.0289425928345945,9.687920365418032,1.1292517293358917,3.303584741881138,8.564367784026976,6.269873578030403,8.898630198325591,8.944966750832762,5.814401924482766,6.045482137517597,3.6706240419425984,8.0057975634301,9.67263235430574,8.307978430232282,2.4362519555694684,3.6807733535314924,2.4793306355521305,6.495980341865817,9.160902512217124,8.966566024856395,5.180449768090416,6.523664478431284,6.474333986752196,2.9743070588694853,7.245767233190225,8.352218220584454,4.15375942560453,2.2333100330676614,1.9759996931520418,1.0737230047848012,2.503713185660885,1.5253925065721718,9.568734159451482,2.4348846483106357,1.251786890233455,3.0655055205507398,0.9459134125152224,0.20166892045298423,8.488062412621764,7.354305679507416,9.130132249266785,8.88119427779676,1.3230984601723228,6.205985204514297,9.633332562697909,3.783823527103991,2.838261446739212,5.630177434622667,6.203566604787875,0.8049173592745706,6.386124736742415,5.721594585609349,8.405919275088841,4.757316690285482,2.6834243462274565,7.279825795036166,2.6508074282007743,0.38935766495030943,8.76855264585249,8.096681335238557,0.5411994096406825,0.3281576446547052,7.737630838786044,3.301257606663599,1.6735625028402579,0.6879451818401172],"beta":[2.603420493767282,0.3088342893527518,1.9790616727609034,0.7205682563286764,3.1453339295904192,1.729404608057954,4.995718415276236,0.3365007663080477,2.457187079535198,0.8828949756423055,4.212134664763466,1.6498089638222713,3.149397461516709,3.2939181409869454,1.0924148581046667,2.2061284034478756,0.618369492782741,0.22468727108183817,3.8388959864185104,4.972785317664046,1.4523520165214654,2.290385985201433,3.930492939654763,0.049935837197506716,0.8165595907229151,4.773468961364254,2.4677690798036442,1.6536151924483733,3.7750844323084056,0.8692899387192632,1.1083124475820694,0.031227955172762334,3.4240663630946964,3.0054752904008675,0.952715947929641,1.1253367691180616,4.485372480369351,4.432176638052685,3.641793298428335,4.0621944234211735,3.785945608064072,2.40262475911781,0.9281983181757869,4.703861037406992,0.21275657015142335,2.6445309647836766,1.4235923051603383,2.3764655610700594,1.8931521978631127,3.259501770001356,2.7584676345430923,3.3622259943870194,0.976818607347617,2.72510577704404,1.0643848629529329,4.558442018847555,2.678943661827655,3.0893882734051727,4.550435670943073,1.7680929186543526,3.5195301650018673,0.02055325255177043,1.6299543392395588,0.44538418190692264,3.851064290495463,4.835491251270473,0.8079534168881763,2.8096361043875904,2.270172757420169,2.1636844691003154,2.1333276206073215,1.9581100292594422,1.7765689742538282,3.8650488829591567,2.512250660671862,1.6924233146248913,1.684815900676444,0.8138838748218258,0.43645090374839435,0.6909212037252399,1.810966811983702,3.033866818573089,0.10631905549213672,3.721647759900967,0.08075639898669218,4.02008546834282,4.101620334933644,0.8325536931849176,0.375800471030695,4.203329710255824,3.330029150270235,0.9542716123273942,2.7283814461476297,0.6251481713396312,4.6048611164441,4.971815470263738,3.054964304974054,0.8834728990130125,3.596290667644182,2.5758880742397547,4.942919716408735,1.5227348654488504,0.4483395579785465,1.0451740386878794,0.5828291473360758,4.1659528495281695,3.493551940659092,1.8660245325611557,4.603803121528988,2.5892869942275523,2.2864945860476062,3.9809994592170517,1.0817052579230302,2.014286432991205,3.2043876570635463,2.886159559735603,0.10135195185103973,0.6890398409297993,3.0645544226014163,4.593584105278188,0.7623089429206664,4.753787317289822,4.035748413191237,2.5890047249563155,2.5528341222985604,2.164148827488347,0.7221034905454282,2.566929081589598,3.148441865994646,4.221651583693,3.229320165313215,4.6010741248585045,3.4401746142020384,4.422201585998906,3.142074792099164,3.8469425065998095,1.783284545267222,1.3558078375350247,3.259898581237257,0.321478937841031,0.0002752577703479808,3.8500252296330473,2.3039105243823843,1.0029350905716317,0.3480314713917909,0.8429494605310617,0.24777682551618052,1.7603839097230822,0.7439516599201457,0.4376660586341308,3.2944784909845937,4.268365630374699,0.4174339098276181,1.2642701251037292,2.2413317297550783,4.714539759298405,4.256015364438678,4.439048721981461,1.5598062347526975,2.967745929492984,1.0927055927698892,4.313752236902841,4.491443654481958,1.0914019672787534,4.5129973630937865,4.348303368134417,0.40036488613807486,2.5582540516225394,4.321710638728467,0.3810784752006746,3.656344622666854,2.9340037394345675,1.80159048797502,4.067234697277559,3.4501691348352703,3.1674901577623626,0.10557196870689123,2.195806638155479,1.5664476714988051,1.916479630426009,4.550260873933877,3.908637156501953,0.12869633761948385,4.349529604273182,2.4332054832926966,1.576449574207398,1.438809405898549,1.177104801161778,1.0912281817295322,2.0947331711136363,1.7458441424974203,3.6761025095103883,1.4194107417605706,3.1231583924159114,1.5001567079922595,0.9896257296257094,3.9489014200444164,2.5065603465456054,3.833930194516131,3.000248952017367,4.18405603798564,0.0764883131894778,0.09795713570689979,4.517635315511635,4.699041022144397,4.1623889010763095,2.400132534899183,4.7863977369735675,3.9906985789277947,4.806252704925895,2.2736454175334178,3.4227727776616987,1.2981349376347961,4.496012885057803,2.583917840102975,0.4442374815320316,3.7607534017427193,4.299741634565554,0.42915304797535914,2.708308805469146,3.5775150156277036,0.7039646048109083,4.4549688896229895,0.36071409616443173,2.604851614962204,3.080451251633632,3.018875625810619,3.1880466396810094,0.8923670310746457,1.802157939223068,0.7313678244886934,2.235495217159902,0.8511400741775144,3.9269447736706207,4.96751017788104,3.963466721219052,4.200411883006783,2.1271411854277114,3.796971882250675,0.13807081318661263,1.7254524255647397,1.4023598752415023,0.4610155480250644,0.7966194931244441,4.331107522999151,1.9640092852817714,4.597514231101972,0.8417657663558342,2.263510987563373,2.9782113678955477,0.917441976279908,0.22759122614031013,3.5504954062488006,3.7289231812648502,1.853611859223635,3.774551142819933,2.4450658729040864,1.1956472239271254,3.6912889982891817,1.9598513371788284,4.721677428951654,4.990746063501941,2.141273392097931,4.763666429715665,3.895194589548895,3.599677893199693,1.2089926983564725,2.5379500857844017,0.7383009415207897,3.706824789760228,3.3518987705445715,1.995100856503812,3.0563788141717243,2.842440605017101,4.845088817803137,3.3162686361950753,3.0547402629024445,3.4367318506835707,1.3889637709451685,2.6066803979883724,1.4591499126266494,2.3042905437582784,2.0058965198273357,0.18376166130922078,3.1778136592557504,4.870187215844954,4.6891997993702645,0.796916524411474,2.7891589440347966,3.4248465018958187,2.8065981276351613,4.641033487942446,4.351304828487706,2.2271128325923484,3.9312916285874957,4.248507237000033,3.4745148961847017,4.1089191994515515,3.379588793359427,1.4276500161841021,0.4013802205670258,3.503663383468841,1.8460658436837696,4.211526812406607,3.2628975867093466,1.5460018839153988,0.45749400653830374,0.19589022865170613,3.2482448030144804,1.9351236711937203,2.067901665249,0.3959136767539351,4.392469639220566,3.1772215428404027,0.9403003731044646,4.636592908070863,4.627444743859365,2.40448067780814,0.8027762778853686,4.779584763663191,2.5876665396147382,2.4953892353406673,1.986131390467747,1.0389226152569386,0.40251115801878457,4.223610952282783,1.875833128129728,0.6045897580761062,3.049767835314082,3.155397469997032,3.1657946052791166,0.9899955033945396,0.7225123032422942,2.441810790063067,1.4148732847790135,1.1885714212681586,4.558673510683909,2.9473320499057998,3.445008433992971,0.677287437007088,3.4274386676340516,1.715653105173296,4.387229913077889,0.5477393873945668,3.133587250768578,3.075697755514871,1.5078934348455175,4.5484393776670515,1.84809319064568,3.5839252483937822,2.0173318084607725,0.0018457683267636416,0.19026241389687226,1.1597747231252131,0.13066071706970384,2.705037686815351,1.6530151889674471,1.2958955810908956,3.3291320657000503,0.33298220653861565,0.7559620161584579,3.362274559686189,3.2349106407595363,3.306505882453691,1.3326830694385394,1.265593334820282,0.23999834932424524,4.992660982659965,3.384379304774053,1.0721812485490534,1.2480018503963075,3.286369686227845,0.26063990048839414,4.076803996717937,4.811015490433656,2.7379957796556287,0.7938460502149003,0.4038825190783779,1.8895183037080998,2.9827400656075396,4.9676656311992575,2.311271242509645,1.8002365570299117,0.925257370827185,3.245756538818747,1.141495577524777,2.9703744663801412,1.636975693147662,3.6233306612439753,0.7738636539971211,1.2762127033151516,3.1770075512858478,2.7158999473396217,4.277318686840741,2.3953559142102385,1.8905050390651768,2.652527147141667,4.521213187647996,2.011100650134525,3.487874604147998,4.443649115397456,2.777490373990792,3.09412950574942,3.5074598199545584,4.704177999769884,3.10764020195628,4.851408764577139,3.986405407309843,2.5705141976487065,0.16111217105682085,0.43033330562857297,4.248314812789985,3.632710789669794,3.7475978985730207,0.040026523843510464,2.476456822212223,1.8939730416114653,2.627468102486029,4.012371729592871,3.4430891221187143,2.7260080116450993,1.3819789911584035,3.0015462900430245,3.6478949781285666,3.0415943076579675,0.22022740635784133,4.764555094834532,1.621099484323798,4.007097502920196,3.7608543287783816,0.9342559323784472,3.606117471211785,2.6581674447968084,2.949910772662397,0.9672613865938906,3.2781549036790256,1.984259910998607,1.9386275575550027,0.023375145740766046,1.0101427900211146,1.6340485928444082,4.7140400191441785,3.690925448787997,4.19034122037533,4.0887529205682585,3.16386021927788,2.543303959423082,2.3259869499586494,3.7017544447471042,3.83985600529968,2.8326028045580074,3.988900332031473,0.6839713520145807,3.810150536617912,0.1588380511866594,2.3798886788792997,0.019857559313479767,2.851599031198193,3.9665588540529697,4.000545850562988,2.1251060708735126,4.105347759731855,4.499375139176177,2.285352340590292,3.568501429245691,4.5701586644120855,0.9377434826768383,4.697826793082006,1.6571628113260128,0.8984307848683715,3.7677150572816154,1.2881424980850065,4.458461167954557,4.2733932657293705,2.6706863503107003,4.090262555018013,1.7288670370622161,2.6711199174931233,2.7924187960581524,1.2866501679672082,0.0978385451571595,1.9923523158408818,0.8624336134912136,1.8126506450516744,2.668452685311138,2.0497656700365328,3.289304613059252,3.3741985552782197,4.838814554700672,3.193624305247983,4.1492520533945285,0.7440323524926029,2.947379439765523,0.8368988514585041,3.777604363783682,2.4665680541714776,2.073371972765968,2.5676021601548014,2.88894184901297,3.1157837457370983,2.056824592752875,3.655276688638226,3.9896879760984563,3.9798858179462493,4.0983383675234455,0.005954130516669931,2.3885763085409106,4.839189956622985,4.152487566379546,0.30546284162049964,2.023520898248795,4.036334951268815,4.535281305844737,1.9433693258305906,2.671653822657195,2.93163175748698,0.07698810977432413,2.1181224898058595,3.3691495160751006,3.273232591525923,1.3294710051239556,1.9115697744300786,3.099454923579911,4.810087985314368,4.418002463040449,0.12523752475473993,3.3053442088569476,4.02157272976054,1.6735996975659284,4.83721603068438,2.3464628024307945,1.8095431009657381,3.3693759556913063,1.700472611305135,4.000788485535892,2.9841275719122495,2.47423296326739,2.735239635584912,2.2311574272285917,0.4901981529070276,4.7554689854397445,0.5669071471631204,1.0262231661418397,4.843602203581625,2.074596870928269,3.551498140196998,4.353467712132472,3.421151520074318,1.2473963845976666,4.535055260576687,2.348223317461098,3.7091612229424653,0.16583327212667642,4.76703063996772,3.005435273947814,0.7117084198921575,4.341496247719938,4.465108168617707,1.3501811713897527,3.5978784470409098,4.219014507759241,4.783564817110082,3.78073478727897,1.7418164603610509,3.308376391781475,1.8823330090186141,3.1251164830143887,0.5508317536272778,0.2718849141893809,0.8040429014192185,1.5235458053512019,3.69877120085496,3.8955199115501804,4.165867847981247,2.03191109177705,4.380049304437813,0.6427824089105438,3.973155146572699,2.378926477227119,3.958889103402312,0.8870241313068383,0.39323626766138653,3.1634735905871683,4.391619881033439,3.903701586531927,1.7976895058128717,0.4126578453523366,4.665202556733766,4.302748658366255,0.5708436818816731,1.3184874415443926,3.236034457343837,3.7434561650202225,3.47329065025642,1.4632569221333003,0.44968148123926244,1.452280515941321,3.5242909788247267,0.5539919470194743,2.3355057176313823,2.0648807024880025,4.122691672034752,3.4595831513870614,0.8927159699731957,1.6620410393960017,0.5843161736436897,2.7931425677372843,4.5347228320533866,4.722326274945474,0.07861039140023673,2.471652174267934,0.4604462716331448,4.4791453381853135,3.9864697431054505,3.8270312271826312,1.5511722827856445,1.7141877727617427,4.6255283759194405,3.41489071308939,1.9969986889771563,4.658966623873021,3.4971662830442964,3.312316368914845,1.5533574121189908,2.8064843141186735,2.0843544271868772,0.26996977748126594,2.0741979335886427,3.0068608050948873,0.7666400546583718,2.800418133647853,2.6752786530841743,3.999817168219082,4.158619371628216,3.674192906958087,0.4719525664729207,0.48115856028254855,3.3498217549106846,4.7118862353148,4.462971441527533,4.324895550479279,2.8438908053857803,2.944093763398963,3.8135637415806634,1.910088272370647,4.714989810919049,4.784836578877828,4.819511426433028,1.5347953213381138,2.5806695226223777,4.908016064098812,1.4492994905619005,2.357172361836443,1.0112501044123612,3.0409459338584774,0.7892716250059395,4.672821972750438,1.3607549360595206,2.724468826866937,4.789775448081681,0.40275481909183397,1.639610068802565,2.655581836034453,1.5040072736938148,1.3230926220585126,1.6811655744500142,1.7017003946821374,4.8131219773812015,2.3265499998761943,2.6328552110029237,0.963911150040917,0.22982045412055063,2.711571623570137,0.07431810348206835,1.6734885337050487,3.8675292772619754,4.361636625656711,1.2691671959716622,4.16182719617935,0.3974473116038324,1.0385575160838612,1.1014892745305993,1.1564389723489132,0.14999703963390343,3.272110598033373,0.08078133780383911,4.5270834286362955,2.2108113402509333,2.3804964909636417,3.9269239377440393,0.07271119819334482,0.3523942094822774,4.796501265954597,0.9707652768706454,4.020086278583133,2.4837073253996342,3.100817958924873,4.41423352513155,4.909343632490993,3.305877571357594,0.4413935520352663,0.6854017806718249,0.40960869892888163,3.8545178158520423,4.604907673891975,3.449229545983802,4.3807725475331605,1.9633760150039248,0.924265627024693,0.4611937854510173,4.89447198942201,4.218254348904189,3.5161607926261795,0.07040866959466707,0.18108682099810314,4.709403139965537,0.12994094261244538,3.0808139498044373,0.12796877932838235,3.6751271785473305,3.2264069854535538,0.0009236111973831562,1.2889873813355712,3.4245042891015585,2.637687236375351,2.7750703355730586,2.8834509126901517,3.692668154529076,4.249539243657958,0.287920977617695,0.061340344443142625,1.300279563697444,3.456132142475613,2.7677291497929324,0.33322893241967577,2.1566479133963803,4.707807388612014,0.5005142317919697,0.7982023442480912,4.361696235623072,1.951837232256446,1.0510642423955296,0.8937290802177378,1.4888500123770076,0.7348457829576394,3.7255418545688137,2.530475613838222,4.611855770922052,2.981415207229338,2.6584720089511005,4.848871014950793,2.158409114582579,1.2031119991819905,1.9735523108483888,3.1523052697794363,4.051326678266555,1.5893282941832632,2.9517470026985904,4.129456847105488,0.338975770556883,0.6238779090564583,4.0438161553025935,0.7343322365716709,3.1981170945985884,0.5259296046500583,3.7242259860863927,1.91207848328802,3.814374154362865,3.189441679221783,4.997181850468657,3.031929667405693,4.557044807059437,1.571103983082477,1.4328049495689321,0.3224653111842324,0.880556346723852,2.371000176128116,2.2833951204616665,4.28426295475723,3.5053572976374783,3.0576438038115485,0.7129416376665099,0.6804143851540523,0.02169233653295244,2.176364686639088,1.3219552912391586,0.2272455531642703,2.662056881784981,4.440570180051382,4.76145353453461,4.641154407070571,1.7923833036962245,3.5937778781740892,2.7898137415441946,2.346779703124684,2.4420180077891374,0.7326033603055493,3.2449113385478,1.3516313149086967,4.105016841024667,3.2065162372625045,4.760652134950907,2.387786621062169,0.16040057052045364,1.1434177457480221,4.661346685515158,1.5859541007782296,4.997376183197435,0.03146631695866153,4.363534777721833,2.5038262954504376,4.28945136232156,4.257916423061157,4.76074584449714,1.3636736150079931,1.5865019361946175,0.870186349429326,4.03610356305415,1.4906580865270547,1.1036786262016784,1.686560971256288,0.8112375703375063,2.465775131143413,4.297852510227389,0.8458396923427025,1.051097555033258,3.001598401596052,0.4809082783006169,4.594370789361566,2.573205224509004,1.9978492778124735,2.1895763553892733,0.39681064606950867,4.536725027251519,1.0510427986086768,0.506192201520782,3.1120345836985184,4.856501635911046,4.829613106471223,1.6079632848289038,0.6061210876508683,2.3043083780813047,4.71435766263332,2.7371470821317634,1.3962082757910943,4.115776821824161,0.14661053117243972,3.7599799070756044,2.299004395675576,4.797920622117692,3.445029799248479,4.5982462701304225,0.11211850381887656,1.23972946305567,4.350530776741027,0.6135986045121045,1.0229706519250426,1.482456233505487,0.8767236441938531,3.43811711584296,3.2999318245077314,3.9684187664764647,3.8486193927282484,3.870803567593563,1.7750249475513036,3.728944708572791,0.8857426237448163,1.0692056822734264,2.0429345785355455,0.7753094077553591,0.4274480818836035,1.6237276384628063,2.957973529697898,1.5738047089758034,1.3188440648750743,4.998924005193178,4.0736658043541185,4.516375154492702,0.1790619055936682,4.286899110085588,2.750443393283122,4.358873942726915,3.6309349646534494,0.12989084248358096,3.6349294281112843,3.8778763017342155,2.4407281906978087,1.309013347395458,0.6740327255734424,4.761230468517505,4.561125220180663,4.678084365239089,1.3096532996710064,0.8111747593327112,1.678168586049249,1.90645442786882,2.5347220329740896,2.1908476856302084,2.4382097714136086,4.499013674297997,2.609647903324502,0.3189482634370233,3.818927525590942,1.364107716614631,0.04299838328016281,0.1775597082012792,4.61900955352135,2.6905487870670153,0.9894403818856701,3.564364419654588,1.5181950140337708,4.951117106693797,4.139300952289081,2.680922131506448,1.05514692783931,2.4989183394894154,1.3558901408996749,1.4998863707715093,1.3640851631858186,0.8682895945701419,3.465406617854333,4.6706412926847385,1.2778068598202574,1.6114778768791416,2.389351754070238,3.053925582949187,2.379747733989195,1.8017614581953878,0.7924579872394222,0.24216531864020618,0.5759898422298337,4.8730309085847265,1.7980671317251506,4.511934410622053,1.323793823645929,0.09506377803669142,2.4258094084083592,0.5671834117544905,3.0983293043523084,0.011135213940715039,4.765821542074521,4.846032005204269,4.849294821521308,1.5152251751039425,3.0390923868394615,4.420583524963141,0.9985853208607054,1.7824121334288978,3.1987454031320217,0.6811130251869768,4.33821505963051,1.3254815137598797,0.32754276718673925,3.6644059893751093,4.9083899072509585,1.8380393276432616,3.675601536062456,4.5464006094354135,2.2155733620799802,2.563941425594595,1.221098102288276,1.6598252715681439,3.728389284545849,2.9557388126723048,3.2449893034770474,4.736973708737851,1.2549446127971065,1.2642362970797016,1.4485038118419002,0.4354429045049113,0.9142416282090726,4.28901268598699,0.5547590418316328,2.0728547419956267,1.8109903337703082,2.98754428896343,0.6833985339195092,1.3062140958230273,0.07722584943725797,4.503385457546747,2.8982888234158812,2.453166718486343,4.999869861162461,0.8880291220083103,3.242397330385195,4.302379203190087,4.597041372577564,0.2480114759947083,2.4100143247369408,4.528596758619291,2.2139465516703205,3.029905399107673,1.8380295240984157,4.935197925831685,1.1193627082213753,2.5302846623356814,3.1717343422415247,2.9727165149134716,2.873800352091722,2.1737355174361097]}
},{}],97:[function(require,module,exports){
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
var cdf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `mu` and `beta`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.0, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `beta`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a nonpositive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	beta = positiveMean.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	beta = negativeMean.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large variance ( = large `beta` )', function test( t ) {
	var expected;
	var delta;
	var beta;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	beta = largeVariance.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/cdf/test/test.cdf.js")
},{"./../lib":93,"./fixtures/julia/large_variance.json":94,"./fixtures/julia/negative_mean.json":95,"./fixtures/julia/positive_mean.json":96,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58,"tape":217}],98:[function(require,module,exports){
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

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `mu` and `beta`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a finite `mu` and `beta`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, -1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, 0.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var beta;
	var cdf;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	beta = positiveMean.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var beta;
	var cdf;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	beta = negativeMean.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large variance ( = large `beta`)', function test( t ) {
	var expected;
	var delta;
	var beta;
	var cdf;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	beta = largeVariance.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/cdf/test/test.factory.js")
},{"./../lib/factory.js":92,"./fixtures/julia/large_variance.json":94,"./fixtures/julia/negative_mean.json":95,"./fixtures/julia/positive_mean.json":96,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58,"tape":217}],99:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/cdf/test/test.js")
},{"./../lib":93,"tape":217}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":100}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":103}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":107}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{"./define_property.js":105}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":104,"./has_define_property_support.js":106,"./polyfill.js":108}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./native_class.js":110,"./polyfill.js":111,"@stdlib/assert/has-tostringtag-support":20}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":112}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":112,"./tostringtag.js":113,"@stdlib/assert/has-own-property":16}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){

},{}],116:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"dup":115}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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
},{"_process":209}],119:[function(require,module,exports){
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

},{"events":117,"inherits":204,"readable-stream/lib/_stream_duplex.js":121,"readable-stream/lib/_stream_passthrough.js":122,"readable-stream/lib/_stream_readable.js":123,"readable-stream/lib/_stream_transform.js":124,"readable-stream/lib/_stream_writable.js":125,"readable-stream/lib/internal/streams/end-of-stream.js":129,"readable-stream/lib/internal/streams/pipeline.js":131}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
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
},{"./_stream_readable":123,"./_stream_writable":125,"_process":209,"inherits":204}],122:[function(require,module,exports){
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
},{"./_stream_transform":124,"inherits":204}],123:[function(require,module,exports){
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
},{"../errors":120,"./_stream_duplex":121,"./internal/streams/async_iterator":126,"./internal/streams/buffer_list":127,"./internal/streams/destroy":128,"./internal/streams/from":130,"./internal/streams/state":132,"./internal/streams/stream":133,"_process":209,"buffer":134,"events":117,"inherits":204,"string_decoder/":216,"util":115}],124:[function(require,module,exports){
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
},{"../errors":120,"./_stream_duplex":121,"inherits":204}],125:[function(require,module,exports){
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
},{"../errors":120,"./_stream_duplex":121,"./internal/streams/destroy":128,"./internal/streams/state":132,"./internal/streams/stream":133,"_process":209,"buffer":134,"inherits":204,"util-deprecate":225}],126:[function(require,module,exports){
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
},{"./end-of-stream":129,"_process":209}],127:[function(require,module,exports){
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
},{"buffer":134,"util":115}],128:[function(require,module,exports){
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
},{"_process":209}],129:[function(require,module,exports){
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
},{"../../../errors":120}],130:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],131:[function(require,module,exports){
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
},{"../../../errors":120,"./end-of-stream":129}],132:[function(require,module,exports){
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
},{"../../../errors":120}],133:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":117}],134:[function(require,module,exports){
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
},{"base64-js":114,"buffer":134,"ieee754":203}],135:[function(require,module,exports){
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

},{"./":136,"get-intrinsic":199}],136:[function(require,module,exports){
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

},{"function-bind":198,"get-intrinsic":199}],137:[function(require,module,exports){
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

},{"./lib/is_arguments.js":138,"./lib/keys.js":139}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],140:[function(require,module,exports){
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

},{"object-keys":207}],141:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],142:[function(require,module,exports){
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

},{"./ToNumber":172,"./ToPrimitive":174,"./Type":179}],143:[function(require,module,exports){
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

},{"../helpers/isFinite":188,"../helpers/isNaN":189,"../helpers/isPrefixOf":190,"./ToNumber":172,"./ToPrimitive":174,"./Type":179,"get-intrinsic":199}],144:[function(require,module,exports){
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

},{"get-intrinsic":199}],145:[function(require,module,exports){
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

},{"./DayWithinYear":148,"./InLeapYear":152,"./MonthFromTime":162,"get-intrinsic":199}],146:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":194,"./floor":183}],147:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":183}],148:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":146,"./DayFromYear":147,"./YearFromTime":181}],149:[function(require,module,exports){
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

},{"./modulo":184}],150:[function(require,module,exports){
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

},{"../helpers/assertRecord":187,"./IsAccessorDescriptor":153,"./IsDataDescriptor":155,"./Type":179,"get-intrinsic":199}],151:[function(require,module,exports){
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

},{"../helpers/timeConstants":194,"./floor":183,"./modulo":184}],152:[function(require,module,exports){
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

},{"./DaysInYear":149,"./YearFromTime":181,"get-intrinsic":199}],153:[function(require,module,exports){
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

},{"../helpers/assertRecord":187,"./Type":179,"has":202}],154:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":205}],155:[function(require,module,exports){
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

},{"../helpers/assertRecord":187,"./Type":179,"has":202}],156:[function(require,module,exports){
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

},{"../helpers/assertRecord":187,"./IsAccessorDescriptor":153,"./IsDataDescriptor":155,"./Type":179}],157:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":191,"./IsAccessorDescriptor":153,"./IsDataDescriptor":155,"./Type":179}],158:[function(require,module,exports){
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

},{"../helpers/isFinite":188,"../helpers/timeConstants":194}],159:[function(require,module,exports){
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

},{"../helpers/isFinite":188,"./DateFromTime":145,"./Day":146,"./MonthFromTime":162,"./ToInteger":171,"./YearFromTime":181,"./floor":183,"./modulo":184,"get-intrinsic":199}],160:[function(require,module,exports){
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

},{"../helpers/isFinite":188,"../helpers/timeConstants":194,"./ToInteger":171}],161:[function(require,module,exports){
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

},{"../helpers/timeConstants":194,"./floor":183,"./modulo":184}],162:[function(require,module,exports){
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

},{"./DayWithinYear":148,"./InLeapYear":152}],163:[function(require,module,exports){
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

},{"../helpers/isNaN":189}],164:[function(require,module,exports){
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

},{"../helpers/timeConstants":194,"./floor":183,"./modulo":184}],165:[function(require,module,exports){
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

},{"./Type":179}],166:[function(require,module,exports){
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


},{"../helpers/isFinite":188,"./ToNumber":172,"./abs":182,"get-intrinsic":199}],167:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":194,"./DayFromYear":147}],168:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":194,"./modulo":184}],169:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],170:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":172}],171:[function(require,module,exports){
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

},{"../helpers/isFinite":188,"../helpers/isNaN":189,"../helpers/sign":193,"./ToNumber":172,"./abs":182,"./floor":183}],172:[function(require,module,exports){
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

},{"./ToPrimitive":174}],173:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":144,"get-intrinsic":199}],174:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":195}],175:[function(require,module,exports){
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

},{"./IsCallable":154,"./ToBoolean":169,"./Type":179,"get-intrinsic":199,"has":202}],176:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":199}],177:[function(require,module,exports){
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

},{"../helpers/isFinite":188,"../helpers/isNaN":189,"../helpers/sign":193,"./ToNumber":172,"./abs":182,"./floor":183,"./modulo":184}],178:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":172}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":146,"./modulo":184}],181:[function(require,module,exports){
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

},{"call-bind/callBound":135,"get-intrinsic":199}],182:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":199}],183:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],184:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":192}],185:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":194,"./modulo":184}],186:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":142,"./5/AbstractRelationalComparison":143,"./5/CheckObjectCoercible":144,"./5/DateFromTime":145,"./5/Day":146,"./5/DayFromYear":147,"./5/DayWithinYear":148,"./5/DaysInYear":149,"./5/FromPropertyDescriptor":150,"./5/HourFromTime":151,"./5/InLeapYear":152,"./5/IsAccessorDescriptor":153,"./5/IsCallable":154,"./5/IsDataDescriptor":155,"./5/IsGenericDescriptor":156,"./5/IsPropertyDescriptor":157,"./5/MakeDate":158,"./5/MakeDay":159,"./5/MakeTime":160,"./5/MinFromTime":161,"./5/MonthFromTime":162,"./5/SameValue":163,"./5/SecFromTime":164,"./5/StrictEqualityComparison":165,"./5/TimeClip":166,"./5/TimeFromYear":167,"./5/TimeWithinDay":168,"./5/ToBoolean":169,"./5/ToInt32":170,"./5/ToInteger":171,"./5/ToNumber":172,"./5/ToObject":173,"./5/ToPrimitive":174,"./5/ToPropertyDescriptor":175,"./5/ToString":176,"./5/ToUint16":177,"./5/ToUint32":178,"./5/Type":179,"./5/WeekDay":180,"./5/YearFromTime":181,"./5/abs":182,"./5/floor":183,"./5/modulo":184,"./5/msFromTime":185}],187:[function(require,module,exports){
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

},{"get-intrinsic":199,"has":202}],188:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],189:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],190:[function(require,module,exports){
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

},{"call-bind/callBound":135}],191:[function(require,module,exports){
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

},{"get-intrinsic":199,"has":202}],192:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],193:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],194:[function(require,module,exports){
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

},{}],195:[function(require,module,exports){
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

},{"./helpers/isPrimitive":196,"is-callable":205}],196:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":197}],199:[function(require,module,exports){
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

},{"function-bind":198,"has":202,"has-symbols":200}],200:[function(require,module,exports){
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

},{"./shams":201}],201:[function(require,module,exports){
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

},{}],202:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":198}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
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

},{"./isArguments":208}],207:[function(require,module,exports){
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

},{"./implementation":206,"./isArguments":208}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
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

},{}],210:[function(require,module,exports){
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
},{"_process":209,"through":223,"timers":224}],211:[function(require,module,exports){
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

},{"buffer":134}],212:[function(require,module,exports){
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

},{"es-abstract/es5":186,"function-bind":198}],213:[function(require,module,exports){
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

},{"./implementation":212,"./polyfill":214,"./shim":215,"define-properties":140,"function-bind":198}],214:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":212}],215:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":214,"define-properties":140}],216:[function(require,module,exports){
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
},{"safe-buffer":211}],217:[function(require,module,exports){
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
},{"./lib/default_stream":218,"./lib/results":220,"./lib/test":221,"_process":209,"defined":141,"through":223,"timers":224}],218:[function(require,module,exports){
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
},{"_process":209,"fs":116,"through":223}],219:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":209,"timers":224}],220:[function(require,module,exports){
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
},{"_process":209,"events":117,"function-bind":198,"has":202,"inherits":204,"object-inspect":222,"resumer":210,"through":223,"timers":224}],221:[function(require,module,exports){
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
},{"./next_tick":219,"deep-equal":137,"defined":141,"events":117,"has":202,"inherits":204,"path":118,"string.prototype.trim":213}],222:[function(require,module,exports){
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

},{}],223:[function(require,module,exports){
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
},{"_process":209,"stream":119}],224:[function(require,module,exports){
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
},{"process/browser.js":209,"timers":224}],225:[function(require,module,exports){
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
},{}]},{},[97,98,99]);
