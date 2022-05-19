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

},{"@stdlib/utils/native-class":122}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":122}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":122}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":122}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/from-words":78,"@stdlib/number/float64/base/get-high-word":82,"@stdlib/number/float64/base/to-words":87}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":46,"@stdlib/constants/float64/max-base2-exponent-subnormal":45,"@stdlib/constants/float64/min-base2-exponent-subnormal":47,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-infinite":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/copysign":62,"@stdlib/number/float64/base/exponent":76,"@stdlib/number/float64/base/from-words":78,"@stdlib/number/float64/base/normalize":84,"@stdlib/number/float64/base/to-words":87}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a Gumbel distribution with location parameter `mu` and scale parameter `beta`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} PDF
*
* @example
* var pdf = factory( 4.0, 2.0 );
*
* var y = pdf( 10.0 );
* // returns ~0.0237
*
* y = pdf( 3.0 );
* // returns ~0.159
*/
function factory( mu, beta ) {
	if ( isnan( mu ) || isnan( beta ) || beta <= 0.0 ) {
		return constantFunction( NaN );
	}
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a Gumbel distribution.
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
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x === NINF ) {
			return 0.0;
		}
		z = ( x - mu ) / beta;
		return ( 1.0 / beta ) * exp( -z - exp( -z ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":48,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/exp":66,"@stdlib/utils/constant-function":114}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Gumbel distribution probability density function (PDF).
*
* @module @stdlib/stats/base/dists/gumbel/pdf
*
* @example
* var pdf = require( '@stdlib/stats/base/dists/gumbel/pdf' );
*
* var y = pdf( 2.0, 0.0, 1.0 );
* // returns ~0.118
*
* var myPDF = pdf.factory( 10.0, 2.0 );
* y = myPDF( 10.0 );
* // returns ~0.184
*
* y = myPDF( 12.0 );
* // returns ~0.127
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":91,"./pdf.js":93,"@stdlib/utils/define-nonenumerable-read-only-property":115}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a Gumbel distribution with location parameter `mu` and scale parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 0.0, 0.0, 2.0 );
* // returns ~0.184
*
* @example
* var y = pdf( 0.0, 0.0, 1.0 );
* // returns ~0.368
*
* @example
* var y = pdf( 1.0, 3.0, 2.0 );
* // returns ~0.09
*
* @example
* var y = pdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = pdf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function pdf( x, mu, beta ) {
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( beta ) ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x === NINF ) {
		return 0.0;
	}
	z = ( x - mu ) / beta;
	return ( 1.0 / beta ) * exp( -z - exp( -z ) );
}


// EXPORTS //

module.exports = pdf;

},{"@stdlib/constants/float64/ninf":48,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/exp":66}],94:[function(require,module,exports){
module.exports={"expected":[0.026703293030790866,0.03603658995299311,0.03027954706652166,0.03410095460944643,0.030404019282610117,0.01938933015459827,0.09468228744277503,0.053764719450512,0.03252114898049527,0.02067924729461593,0.024080851698317085,0.02806411374110497,0.08299806501831289,0.15255942458092075,0.0237885601104536,0.04871500956094427,0.03601669814293718,0.03741491555770146,0.021300684906575974,0.16870515692707141,0.0212466198461097,0.024921029606577026,0.05338343792160192,0.2930803743388375,0.040571797147437645,0.04026629255630571,0.03500921092943505,0.04751879011588464,0.029223718867210736,0.04844839000261825,0.032945768040293685,0.022347029952146893,0.08112965580210524,0.03357801979970422,0.038542146863009295,0.03500981285663261,0.11625379011001187,0.08898667947739668,0.05632059160717056,0.02829080967789306,0.0233288652142818,0.050791789002429075,0.025833462068052787,0.04231385313794144,1.4986942348617537e-7,0.04030540766534113,0.07909928837919175,0.023916246869924208,0.0428626585863822,0.020576557752449248,0.05098678429361438,0.025973547257901956,0.023729472699059995,0.03220114317143298,0.06498484977285138,0.04942429566936753,0.04665033756274149,0.04111420243016216,0.034426399162565874,0.026492241290911593,0.06486060365019052,0.026343415267520653,0.020189197320969115,0.03179206290410231,0.01887476164725115,0.026844247287016298,0.03411545212834191,0.04726569425876869,0.22385777475671678,0.24581734643979558,0.0835520111066927,0.026197132055794783,0.06780627106258785,0.018279268051275874,0.06407634543975262,0.10435010052552472,0.02110244304558103,0.07719389127619201,0.023964574886889748,0.19762172008383785,0.03405223725845318,0.031751304991490543,0.03768126784757815,0.4828529923340701,0.03355960911030268,0.020389975621598642,0.05218140929623864,0.02478612774169147,0.05180101925254748,0.024688928593309033,0.05195438063434545,0.024806940521760013,0.019539163723350322,0.06358350877883162,0.07177951620632313,0.11215834392111751,0.02121223372728798,0.02988328006698621,0.047834283586345124,0.029924548194495297,0.040623911841740364,0.01878068181402844,0.018515173412022152,0.01994194811242385,0.024605670924492916,0.020124146733770165,0.15673837427603432,0.019211002906797163,0.048966766687347923,0.021517556251334034,0.042982632793018324,0.10899056936360714,0.03613453416803141,0.041782641161901696,0.05785622887918416,0.01944535939961251,0.020384777003862525,0.0697444204469657,0.026754937915682675,0.07834968749936634,0.023532981341305846,1.0274432815350088e-6,0.05422713498295043,0.030063553165290198,0.03141531947074117,0.056862373587390984,0.027512492314759242,0.03406372665423876,0.050101185104149785,0.03332988347359204,0.06117479819199905,0.062139296391890336,0.0203746061286236,0.04638731838008752,0.0468775488217424,0.04649558761865281,0.024608597991434607,0.023231865843737425,0.03309399043562992,0.040412156379729995,0.02218712282580616,0.08080934704963708,0.06556971514455094,0.0867868254169767,0.034417789511693116,0.018593984481774923,0.026140000104911073,0.03342266681111565,0.04878931390525393,0.019217366166064252,0.038420719567328995,0.02607242362800818,0.07032306383461022,0.03881589838698373,0.02188883685737662,0.025379396869558517,0.07301844141255555,0.037361257236679296,0.05441667937541747,0.0218038209021144,0.04151114378674354,0.019968614230805738,0.018863616801886727,0.02955450032927422,0.05952307778232679,0.04047598058073372,0.0566195045768189,0.028962701915406393,0.09232407477928135,0.06612122700385831,0.025847379258686458,0.022498889058109997,0.10585363854145295,0.03310032063392907,0.023673918566950496,0.01853481674602302,0.09183679887001199,0.020841958746751585,0.0289350376402043,0.026178306877978657,1.0439098423957742,0.04268504744877384,0.11930948113762936,0.09992448951462454,0.019110351168565447,0.051788568434669606,0.0407159596107441,0.029339332238583007,0.026028616727528188,0.02486617867982177,0.018341375061979442,0.05023339831236028,0.01976579785306422,0.019709666603073973,0.02844424703736215,0.04773314579324927,0.03531197925925654,0.07861857943035211,0.045995142400113265,0.05186619488001181,0.03546403531080048,0.0010713403936815028,0.009260641451546058,0.01983947079102881,0.11159182303041615,0.025363684966254164,0.04275328825541013,0.030041274422161098,0.0028272412757007694,0.034924290521000434,0.06286115781060495,0.03878644890476287,0.019877888699305152,0.002158613860887689,0.10473523430176512,0.11896443765509611,0.0582105817772303,0.06774280636550135,0.022278012942480857,0.0862982415446673,0.022917063349448458,0.39479485840122786,0.07294837806857239,0.020276638877984737,0.028548596376275624,0.018663227071205258,0.02728840025001281,0.02150121523239267,0.046368485833547954,0.02955997772394857,0.021410148173698473,0.07299153628109889,0.07288852177125638,0.0496104636791405,0.026074531683528142,0.029271866268895896,0.029147401121335827,0.031243251991722,0.07659696819634453,0.020099012830875656,0.020981619961373387,0.06997937408735479,0.0839585667233027,0.06964967197955706,0.018962183873360874,0.3857994455196084,0.032344761389595286,0.024060297090829817,0.09131289631895281,0.0350220201875511,0.0294781838660748,0.05670526081633972,0.021415240840994235,0.030926603175626767,0.024971798140595067,0.01850024981329704,0.23500537162598722,0.02889646529217492,0.11569222566709826,0.03551287039725706,0.15650024166529172,0.019345466741301966,0.08631870680360726,0.07894576247616708,0.022739800393815207,0.03254288985896062,0.024607772914677965,0.02193176772773994,0.05281657750307106,0.02174406540639481,0.009039094991500954,0.02032643888842333,0.01942620128978497,0.044914475568042365,0.08552196229394315,0.030785566274066777,0.025209974001071597,0.07185759600212004,0.019210416554354705,0.045036028590857466,0.019437576129259827,0.2647230549156968,0.018977009580715964,0.13584865370890137,0.03911085236957863,0.018663240793984164,0.036822920854669,0.07898141472262342,0.038490209839190194,0.028455018985622995,0.046263808174420495,0.025148168395746018,0.018247155102780934,0.01959319691406118,0.034668003437919453,0.029417563718056254,0.019267412233331338,0.04695204198920958,0.12212973951825379,0.024740123370410885,0.028701562732906808,0.01999058493602821,0.020225405826358598,0.025886649344912475,0.03143808400821189,0.02633473178860569,0.12636874695238895,0.023732583927944983,0.03764144963966902,0.05974212307370971,0.02770556435340325,0.024674842939545735,0.0009457277356834217,0.019195424623045985,0.03879528896366705,0.027116139704198045,0.056294125576907744,0.020835650871075855,0.03769109838174825,0.015933794153641417,0.02066452130139501,0.20880020810851171,0.02446931845532288,0.03222875034050991,0.02769217803335089,0.09561987506662431,0.03028762625886601,0.058403602682749314,0.043697768055923826,0.03725103197875365,0.05013319935108901,0.05201751273022049,0.019708758460801806,0.028026911840153698,0.022132961574768694,0.03488839642050122,0.2171642541543336,0.01882899893076729,0.08197537672644353,0.062195138675675395,0.06672641957139387,0.02316985729315967,0.018680629235459642,0.5646936346085756,0.02656243288328434,0.0186777497015443,0.018916315943179787,0.025332251260560757,0.01918468697701212,0.02011582003084116,0.056303859497608404,0.024344796604989477,0.1920771358534783,0.05384683289166216,0.04141096148278487,0.020305849953428753,0.029383780527017185,0.027054737143192863,0.019751600483023834,0.022774255766955978,0.06318873424482392,0.05844720750068511,0.02151023461396698,0.02022687504665531,0.0209735265205437,0.02843992414797113,0.023859972851041553,0.042013112422912766,0.03633611710106743,0.05243759667524344,0.04073650473199873,0.018947980965330076,0.0292787259324155,0.04738178388086888,0.035186651425763396,0.05752554483785971,0.027967878120514794,0.03116786591396081,0.023822302140329654,0.09774709411527278,0.08743408347904862,0.03548996798400269,0.08222407888903394,0.01855173715693382,0.021077669355935833,0.018916919492278174,0.04785340018230353,0.051236807623517296,0.06699832826517894,0.02782940876376389,0.03832681595657094,0.06647584456271143,0.03058781903199303,0.11639345905246089,0.07074281584687074,0.028013463770326832,0.029787951263589824,0.06817696070589899,0.02909701113514532,0.0249620996875482,0.03789664882819831,0.022207651295060832,0.03789820050412926,0.07760195020616929,0.03601778089940312,0.06296516243854335,0.16666917857499033,0.018428062784222335,0.03797587491326052,0.024555321444871686,0.03759344299789847,0.022398195830937346,0.05456431454165401,0.024977876586086443,0.024353299210620183,0.027539406243540582,0.07182955650284373,1.2921014229578658,0.042348705972471805,0.10046671123589852,0.028554967622171534,0.07848984889347375,0.02039994283655172,0.0263323675935403,0.019548970095245685,0.07216171900892578,0.1080026094278301,0.024383641536555423,0.0308906731035305,0.04098378955146384,0.10803279986057338,0.021294429007180475,0.031267126848171116,0.02247200493768406,0.054703239229309863,0.050585443333005346,0.020013354109055716,0.027978417745320085,0.00824784183767427,0.07713187411298182,0.02262020035955443,0.025303264654048925,0.021613759905998453,0.018341560532452013,0.07469420841404406,0.05576742738445276,0.02312901209063537,0.02654042454719023,0.03429112782147894,0.07635452636172936,0.23941221761650416,0.018714724435407008,0.06491005142683749,0.025586896573584254,0.021574041947776835,0.024222854164267258,0.033910764236791756,0.06398474210517224,0.025474105445787848,0.2731105640961345,0.01859692838147148,0.02970612183877592,0.01869501488051237,0.019293945002348222,0.021172511164490735,0.03576382834943569,0.11543549947736521,0.03460733153677657,0.06697245917508068,0.17350199184980658,0.09399595567683812,0.035731836663101015,0.018456407891533466,0.025903767464857164,0.05721258730127573,0.0471274472951321,0.0012236716698141548,0.021398995326152307,0.02009298953204997,0.032237125067732214,0.019348163240902546,0.018120833929978007,0.06251063341029153,0.022018868611381404,0.024608506936092008,0.020426369618050028,0.04891600116043251,0.038347616443023,0.042288554554838244,0.126039335623673,0.2612520652237512,0.031279370382863075,0.023943792606244435,0.026829313014578623,0.019967711134763994,0.0969649690300949,0.032395658238932874,0.04520035584218097,0.05842297662455027,0.01929293012331276,0.018931163404032503,0.10005660890172953,0.031525067815192286,0.10452125519249417,0.03060981637383502,0.03683290609081088,0.0353938838379182,0.02267891037558944,0.07455367608749829,0.1713284249733533,0.022156346926174568,0.028790135210453777,0.020473319609554768,0.02388513290394119,0.03318468130729855,0.057751202775141355,0.05145876724052998,0.023609189323314392,0.04707742902730728,0.030333766816687348,0.05135779536600118,0.10524095215878473,0.061922349931332527,0.08068952415062655,0.04416023762102654,0.10752436388371546,0.03523102046059605,0.06238318992922595,0.03691096082810271,0.03236844382091539,0.022652403543070243,0.02420850500135914,0.04527583277844054,0.021092191529688616,0.032437498320117684,0.041912731446585284,0.031787202029261157,0.02507846912060812,0.05378856524049491,0.023685096044466926,0.018203770186153857,0.021617558207898842,0.06190858190893753,0.05072345606661163,0.1294098194348316,0.02415753544421473,0.030256550228195348,0.019518950043464444,0.025947468909089267,0.035834569665344325,0.024933963156894987,0.025239856816042062,0.04727158558031098,0.020064761676964003,0.3269192363461425,0.023281470651630325,0.018457385212038904,0.019912561788810297,0.08225596490396017,0.028065100552550605,0.019764472244273048,0.027544520340363195,0.02561180828014784,0.02162373246901515,0.035192343713300996,0.046763377196286815,6.914507566701693e-18,0.021188138391427067,0.056524545195476145,0.022286437358076932,0.05545445399991834,0.06806789305018188,0.15927831902339226,0.0182295985415083,0.08625725412779336,0.07110761677390838,0.03276419008978965,0.0016784196191543992,0.057601647654891557,0.05988047683407944,0.019127914425775418,0.03639845447726629,0.02004914753649247,0.020950345808705004,0.022902201561570218,0.024567520770076234,0.029954011783476325,0.027336122953470803,0.02920384448571483,0.024589505694387292,0.019789080742004164,0.03716164943376306,0.09491009294388474,0.02972001245105827,0.01990141297425187,0.03097614630937984,0.01889546700182311,0.09016985593681824,0.031234722311029105,0.06588784031299073,0.04108408377940877,0.021124779907952758,0.020001261938406508,0.07942438213291458,0.026675985870626442,0.45671434871232985,0.018710218070841767,0.049244866081995575,0.03700469228681813,0.044918997579036085,0.02588784660447103,0.019170140328896933,0.06563064103871537,0.0028614917335099844,0.01920766626587185,0.06704935893872713,0.02155516868900131,0.041030914453638476,0.01819248635950729,0.022507279055358608,0.02459608879456151,0.03472172538242502,0.01834997029270303,0.020925835158013197,0.023505193373678793,0.050896969397293566,0.021715399746435576,0.05972224220050796,0.019058130592066735,0.046565341411566055,0.06449511855772296,0.05016608518176589,0.02498282743548966,0.038401617352854245,0.03296342124523996,0.03201811058417082,0.0325507738384547,0.04204387128461329,0.028239944317222137,0.020113159161727796,0.026589300808381615,0.02914592010942735,0.03618086388709411,0.020928494154108766,0.029324908594587435,0.005126686452575163,0.07349449817780805,0.13055617997798907,0.027958814624202875,0.02577829589061879,0.05381062477767347,0.022289222559214467,0.02006195578169392,0.03478541954205705,0.053552788668201796,0.02971894185210917,0.02767357400305013,0.04215219377687972,0.02116859399730919,0.061345035703687975,0.049399376413817635,0.16531562488277796,0.034157877230421324,0.024769687828703573,0.11856160347505713,0.024835191150235685,0.05882435403251077,0.06911518313752954,0.05970079714484272,0.019349300000033716,0.05021491847521945,0.3504006665412135,0.023617281045897002,0.02747299150334491,0.028728794083875648,0.07274242578111204,0.01823621888282295,0.0599555205093118,0.01924325962160754,0.021961205854159244,0.0352696768201254,0.0015719613726138818,0.03870877428129808,0.06809267775076497,0.018488400580707564,0.03890607775188631,0.05696798224900879,0.037810961215548375,0.09191241025481986,0.048070512998711734,0.04445353348948646,0.04459609868895967,0.03555091358581382,0.07693584047350702,0.023326951106382963,0.0237688209811429,0.044670399383904415,0.019249489737237665,0.03450290096701279,0.09476842439877783,0.048606440628392145,0.03786797541187803,0.02562880361071101,0.09729161232568598,0.028500370957237963,4.915402006191182e-93,4.3158284226112193e-7,0.06802688369981012,0.030637071348388098,0.01840010350580936,0.03734406492419941,0.020941558353962973,0.02632731939873599,0.07930516342442084,0.02260713456649633,0.026835588357194625,0.3442908279217387,0.07589482975231937,0.11897260441595577,1.621430314074203e-16,0.03866091297606765,0.0993619096660839,0.05158607733503619,0.03101771860694784,0.024706163965203202,0.034623818182078686,0.024643793966153366,0.03449705039977675,0.046639613297530046,0.02374370514463158,0.02265321492636709,0.04858192312650859,0.031199378531553225,0.03671607525272334,0.11527834110021529,0.03244888300641593,0.02171695746315663,0.019531185032799922,0.08259793892509841,0.05428910137372048,0.02126297733108519,0.08739729655641058,0.020156658152892554,0.025877933780713038,0.018589539049636936,0.02807661842245923,0.04295992555237032,0.03866740643767472,0.05211932495604013,0.06884892672110268,0.0218616268657771,0.08655734600826614,0.030358944021030575,0.16236344045480133,0.08952708301453878,0.02244122922692623,0.03518133803861063,0.11657053085909631,0.02218970324573906,0.05754498964583976,0.03337289108118403,0.02684471120600462,0.0006751696524478829,0.03079186891829038,0.04872530189401155,0.026620609148203935,0.03611356934809749,0.023222189159744125,0.02840343821935213,0.03987315333251808,0.06345946775250176,0.028784197589113908,0.03429407415462872,0.15425983739564753,0.054176114146752156,0.08216790303315114,0.057760429400989945,0.04015603840679786,0.02544818487251799,0.23551256367187565,0.05103271932420885,0.03906535390856561,0.026454169988883745,0.02769166334525204,0.023948875379527793,0.024629762573399046,0.039799037658924716,0.0,0.014890323356469497,0.023605381139353857,0.01963279662358876,0.041818228125801465,0.05159263717467788,0.035575483100099684,0.06724724900020226,0.024576029035433496,0.031248916724786784,0.06860903371880912,0.04312971419645313,0.06462535127826949,0.04108707852445547,0.029830884215278155,0.04445913951011254,0.019772035858836103,0.028216317238906802,0.05057403866829366,0.11183452645354673,0.05243020939124499,0.039355160327838215,0.06694251192531575,0.0624450905935313,0.02501939440801951,0.03264943578026182,0.034389362620313134,0.05162017639220412,0.035765356685993434,0.022934472211286493,0.028225852518739165,0.5270898999851757,0.04909962640591264,0.07937593683935962,0.04020441689795277,0.0512394889780794,0.05021068280678978,0.019110924367180097,0.026053298255187457,0.023993281672944847,0.0218679728033181,0.05297204102498241,0.03205277026116776,0.022527969749866022,0.01878770167778348,0.021267872385843743,0.043073907521550714,0.022186793776754733,0.0871797788838773,0.031413861679190185,0.02096579119860714,0.08720473302915024,0.020158398565646444,0.06375889726468555,0.14117946070203635,0.23405051725711012,1.6196721184384046e-7,0.021915240479956404,0.055381443030882826,0.14468273901609127,0.024032787579926284,0.21616625594161734,0.08278388537318701,0.07940651619904222,0.060658819817659596,0.013569483409049078,0.03033073077199763,0.02497674513500701,0.3997802071555647,0.21765859318807668,0.022148490048295125,0.02557635057631424,0.02567747420282817,2.120350178397311e-6,0.02062197306337609,0.018420995142731073,0.04735164175647861,0.03194229458372078,0.020509814665405274,0.6510612274236677,0.019894179054293217,0.019254603597934766,0.05464945237364523,0.030945045942297057,0.07309246646034966,0.02448688962298872,0.026051411516446257,0.021388343784070486,0.03593302196163511,0.026558065369462307,0.06570403409862338,0.048937741268160785,0.02086269462040604,0.03152444910816989,0.02348097506179337,0.02089390755070631,0.019457134060197983,0.043234710786737754,0.027759828625909665,0.06581014962277036,0.09409792992541288,0.06335033971829782,0.035345369317564254,0.044853462344574525,0.07449753948332304,0.03323451719321738,0.02035197533273514,0.018531282022127057,0.019855232917643698,0.02556133221908827,0.02351700020256582,0.02488387356004311,0.08631538593896419,0.02436795773139196,0.04815058477858672,0.022712972151845673,0.07356547604041347,0.02842322212304612,0.01920759782106279,0.06873471010989422,0.08264794077871485,0.038749048957728266,0.019111122576596185,0.026417054237869324,0.023252261428119883,0.04396537044482765,0.024638145645741637,0.030721106239832565,0.04264116675459578,0.02384229314910765,0.019393808187596413,0.09500857058987518,0.029823608921555094,0.07521543279895164,0.02287601069433189,0.02887406798331927,0.02706988478080593,0.027969080019648977,0.23960136835105797,0.06572804909738995,0.02418316732098889,0.029220279528119574,0.01865988007129429,0.07282828348021492,0.02194098083222735,0.1667150914591884,0.02141241036125654,0.031625450153121765,0.04609542776414895,0.03419176874675522,0.05175814226847112,0.10867833253171574,0.059149224102922955,0.27144189974074434,0.026645727932875982,0.036690403385722346,0.04068754617661589,0.028489851124161563,0.019028521987764502,0.01982383390375585,0.03459683684557236,0.04947042286159477,0.01857354891257445,0.021409981852219786,0.023593426350233624,0.021978903847111785,0.018572958899232273,6.899835934214195e-13,0.04427929878622816,0.022001158051931848,0.024199985519469048,0.05287575038453701,0.05792550833792619,0.11258146572078193,0.01845732353463071,0.023996035209311393,0.09096170947412358,0.15757765311342714,0.021833029130736068,0.06773986258053563,0.040520254545271354,0.018523116452943654,0.08920004066245633,0.019694126258495284,0.04129894937031246,0.02714342184433414,0.04687122445955868,0.038051711726155416,0.037251826402568335,0.0844520802366581,0.06777603003280593,0.02118464751240708,0.04703359814237053,0.019673875096697047,0.05771764876092625,0.0288315030361858,0.023634131489084515,0.03105380471185389,0.03519163861852737,0.02861161574703428,0.02036957654011057,0.01980568233838634,0.024402413832646613,0.08267713073175469,0.04151086775087165,0.1348095749936766,0.02862228342533419,0.021832019925492125,0.024182561102570877,0.025363696246534086,0.06835261718334029,0.12396491635752975,0.022181436206063863],"x":[2.318166485478923,1.6336007906292582,4.249114127790666,1.708039665429557,4.034138230793799,4.813851328114556,3.0665291271587956,3.483721541334037,1.8976963158131865,1.2900641528419177,3.8353066217854725,2.9939216128358828,3.7083086073908724,1.1434845929685766,1.8633391565869906,3.600497920469504,1.5635143692967568,0.849942003217572,3.4404854944321874,1.4247010921649927,4.639906952350913,3.305572244273669,0.9001690526931361,0.6740627246576114,4.55150948511844,2.07694910422072,4.6932195025643875,2.2056633828349135,4.174149599598439,2.4110586023162304,4.699865591179133,0.6001617533178671,1.7814613124409562,4.524742306413373,0.03442161074413863,1.7474528551209745,2.6898617083528844,3.6830294584020393,3.959648657701095,3.7734841596168733,1.4477093608718694,2.500368577197535,1.6500307604002984,3.519950485386633,3.704986642338224,3.9268880388557026,3.3496555618090165,0.6421266865751518,3.6917100769767783,1.527212865793044,3.1711760258204413,0.0046657209115275045,3.7850116521760424,4.370573348927584,0.7078893614720816,1.4476382202069837,2.3959257841652724,4.0602454916687805,2.91132622655361,4.487970833127241,0.15864908476600048,2.626463056105126,1.4929083402296683,0.5921454908942314,1.8085554348797372,3.9350734521596484,4.870834416173961,3.5087023437079434,0.11474238656741131,1.0221017836762358,2.5397714876879087,3.907856880294074,1.3326410442837178,4.069574803858886,1.639850907331264,2.1310437122139225,1.7483808924318223,2.0856177396504174,3.153124319913798,1.9760217059860508,4.4886887012255725,3.406536783403864,4.64717505893728,0.711074805638563,4.560082949388456,1.2538461288876823,1.0338549951125786,0.03881012840046827,2.6279499408076634,3.5826584765747405,4.248951286997354,3.721036777290223,4.6623212853768825,3.287373597491557,3.630070482666976,1.6537803696655562,4.265811209413578,2.1369177142189697,2.029691393701426,2.863805861419978,2.5774949245555168,3.771082357601464,2.084025312097358,1.3812763740256262,2.3565352685382814,3.269876375142907,2.230554400422695,0.6774186496481149,1.951920359578796,1.8823808562292377,1.685647505619996,2.302015126370266,2.333379201345165,2.2931101664325846,2.3574553031609744,0.09932474623771337,4.710711155043118,1.3373211815687314,0.3490901245736522,1.4911497987625133,2.8869166703719595,2.0417208274668175,0.6527914132692358,1.819558765210596,3.8179735089546654,0.01737929722272269,1.9831998245945404,0.852332391112911,3.8399725580129926,0.061475270567618034,0.7790841218179412,4.362179245133209,4.67457757050577,1.4528345222502137,1.0380746937402274,2.0877946342837705,2.5825429835064364,2.6566100893107247,1.5476105247584926,0.3840384401145447,2.0675047293392526,3.431328652355916,4.760761213850375,2.8724612744334777,1.6564875224386333,3.4182923515832164,0.12306703446197331,3.446091019695696,1.6146832942240485,4.164873779245941,4.56718783143428,3.9667394813508796,2.0951025796051415,4.966451515079919,0.20262877953283853,0.11708469628271767,0.8897900803160919,4.465746867613204,4.834067754556306,4.809651362385119,0.3866377589414405,2.1408895188340726,0.5141482425666388,2.4904020161389995,0.03376819183081636,0.47131404911286423,0.8498034839787749,1.6121445332924467,2.524330812726774,3.1191556192355385,0.7958064341346938,0.7715477712018126,2.2267059293458322,3.2733554518966756,1.356838611630763,0.6966693512819366,3.166565015637838,2.367691458953005,3.851178769508423,0.9341731250273932,1.0994491500209047,0.11915264506642598,0.9243612149029634,2.1284303710895403,0.2655306863696172,3.984864957611739,3.042055106987055,2.5277718032213947,1.7836640661318581,1.9851478799258016,4.0542415169193635,4.120343091667575,1.9841843268370762,0.8495735672051474,1.4192189790691068,3.3284295105745665,3.7431748782113994,3.103753946632736,3.7339635925550385,1.3148735283581126,3.9749296886060472,4.831057567551888,2.2956358082485764,3.4604175088812026,1.4268394208210922,1.0353988363490763,3.7961878110295455,4.706956227935245,4.613713767831068,0.4878068685325443,3.212257556642377,2.4358662699843823,0.684376669411475,3.860787326299625,0.8365083006263196,1.953416482233633,3.4455843703510816,3.9820835938859744,1.6618339557134665,3.7102837451774393,2.373159531798138,0.44285322407942806,4.386417975699794,4.312119483794047,3.2144610310121644,4.392644526682612,2.935348165476648,1.1840031990581945,3.861584309993006,3.651695598672532,3.393379988817421,3.9641764560397674,0.3122593714781374,1.41103585081934,1.9709065969533712,4.137120301606205,3.7763740452244585,1.2934412332834633,2.952620081759607,2.958073756061028,3.8307625659996027,3.6986953684687096,3.1939666533992983,4.213544893675081,2.3816002375157295,1.3714248195229028,2.840657339305066,3.9145888619452696,3.3966307698849207,1.137390907747401,1.88139424152303,3.9238139789531843,0.2908357289497643,2.973002159932979,0.5892331926962469,1.483262338017839,1.042783536706574,4.257201551395759,0.7910492018902071,4.073162561375315,1.2285862027408123,1.489448477261831,3.9111680022716233,1.897726667158498,2.1450185424850456,0.1764764760483606,4.780043996271423,0.9080723422739734,1.837442130013598,3.032446178421707,3.892819744793794,0.7034557983905199,2.992523979980085,4.617069935075739,2.5429639823378567,3.4025997619714623,4.910055762040803,2.5988715838041845,2.6845667348108515,1.5859678598679505,3.4657164840185075,0.6174819442044122,3.9155608299424163,0.28388624195174406,2.1989961713113804,0.9892362689639844,3.285861499374101,3.747887099190531,4.150410191371753,2.7226254461180197,3.9548297523682363,2.49855873610878,3.558717820584374,2.760675536629811,1.0094393408970859,3.08205299321034,3.8502569370839557,1.28821343717194,0.2496107617835186,3.927686406682848,2.5307458535702008,3.950311242718869,1.855351982670086,4.914156756539414,4.922658132969133,1.4693463623575187,0.8424500105386434,0.2890423172706258,2.5992129984745773,4.7157683604248115,3.162515719153387,0.336582349570298,4.54410459100238,1.6886635426328978,4.999507927571221,1.1336145440385004,2.6897617577837796,4.19202370235999,0.373626987461112,4.929964585338812,2.29569072380986,0.5499290917694799,4.705243477090083,4.971750798494203,2.3285200097487824,3.0252156611041747,4.375750382741272,3.4404228154751646,4.469775182220728,4.19486914738692,1.8303714728562182,0.0856327363757503,1.7711875287123668,0.8621331711470714,4.977453630584273,2.9514272114087947,0.661121456542132,4.416179769324592,3.7098426831248545,3.6226538435254385,0.011421858297387955,3.434831344085408,2.1561905085017106,0.15259468096388118,3.6754461227281263,2.5975530076570488,4.205366863990774,3.6399700537633315,3.6687826342883403,0.007331501355138936,4.719663519914883,4.472899362567549,2.1533246280126486,3.493949519514757,2.996106488192125,0.941005310459353,3.8685397545297118,3.7642910807303442,1.462175856775756,1.650188727778592,0.8578592921072625,0.6396513392569159,2.315231940305317,3.8143920135163647,2.1795822391903896,3.4945408526540476,0.41028034644422506,4.235382232273752,3.5061366412565,0.34117095806369013,1.805490457071811,0.03489015551425445,4.296536661456136,2.4461055627971398,1.824064881021008,4.903824399708884,2.366385851801268,3.300771495417999,0.4955478733698748,2.2358870946872345,2.304872512626641,3.9708377299820397,3.2039970080286673,0.8033211798151807,2.0393879947414573,0.2758838354817539,3.9085116245704343,4.62216488685248,1.4739898971726806,3.8319438637037195,1.074887035322406,3.1009378983372993,2.549898135184603,1.3931477021294225,1.684734464724661,0.4762986777038003,3.7601952512313197,4.32999753227866,3.3573141868961063,0.7613391581502427,0.8604716306197535,3.6276770859278438,1.8613947993749203,3.328399421990934,2.039733414552245,4.519562462874211,1.4618814645081424,3.265401613818667,3.679130356709183,4.743394482020944,0.27239124631143086,4.738824630573122,1.6733815634948623,4.293555868983384,2.7745756039710767,2.607596610659967,0.9427191442001848,0.587028618110238,0.9895070489033164,2.8047849636030664,1.5018313220366841,2.552392581675569,4.788120983359953,2.2728752431314367,3.543967806302084,3.8023625417954388,0.8734684371739265,3.707673252000536,3.7591798881444225,3.8425218782474713,0.33867259625185553,2.2359221776133955,0.779158958907008,3.456803546344859,0.27176793879190697,0.932943297562695,1.3255188752380709,4.060738109848062,4.954618614835868,1.574141150616667,3.4227680390685924,3.7559102098744592,3.269472823207015,1.7958627127959792,0.46200797119801185,2.6817566030398208,2.279745630096911,4.744458143500889,3.4426779624020165,1.3083315199808254,0.35020959116765393,2.40142624722964,3.075741123815506,2.114383718430217,3.76482042870377,1.6079390652966608,0.23069915328316037,4.3219063562014295,3.366522518613272,1.2042082061240889,2.834007316330971,0.17598449198666155,1.7021829960291113,0.30325244818421915,1.52479142317265,0.902284375898933,2.2698031748510425,2.9132764445209913,3.239694677686118,1.9576643099806323,3.088617817079855,1.3786948220343287,1.9129411052845124,0.9484652072193545,4.30775995386647,3.434575648391073,4.046272248633772,1.9538526782701648,1.9697722451434585,1.2867228520703833,4.7221289484616715,3.7114907914979858,2.8140290568014126,0.6046228938221321,1.3013280688402096,0.28683783791632944,3.851457997081681,2.363352491480115,2.6455532903922396,2.324817308939604,0.07078247971764928,3.345105192388763,4.708210478988653,1.0046486464545634,2.9697084491951733,2.0123730482018107,0.9231198893219161,0.5333156216312984,1.4828659963079194,4.084449876139212,1.37697721736603,1.8879989713197876,0.3462646984880058,1.5727375091841556,4.8815764666598005,3.041092718148314,3.855258230875531,0.1815378366769571,3.284765260049458,0.8607317201547604,1.968722554006176,3.549908675790631,1.2733092936662704,1.6693881727937288,2.584350797843742,0.6927455774106561,3.20464036544975,0.6813085711474276,1.4445772010479796,1.9007957021339306,4.548532136404145,0.9756416585761474,0.8840853349839628,1.6798321425612794,1.355355912323064,2.963676289861923,3.081125068916019,3.0941613112426527,1.8592429543306888,2.5342985250707892,4.526660764578554,2.618734159961378,4.401290383535716,0.5877807013310798,0.4094398265950494,2.392111760101577,4.743898581508757,4.879800434615441,3.996673713361596,3.533828246210542,4.739645533112046,2.6844713688683273,1.9131539894841298,3.383549042703269,2.0700714107476657,3.1812300789513692,0.36698711142478024,1.4402276980779949,1.2736161257960465,3.4502442031928107,1.3778507218549707,1.2366034173303275,3.7556604896359924,3.518442324043866,0.8759510359435341,4.484697398382462,3.1044637836280375,2.5544708604596558,1.7941628163301837,3.593949465711649,3.7101022077337653,1.8915956428051728,1.632099106849736,4.380299799099089,1.3592887376179386,1.0083334243077902,3.6181823590082085,1.6059279988217479,1.8237996486643338,3.862277096738549,4.167086183504486,1.8277139310765722,0.11752215725245874,3.266630897602638,3.383763587904517,1.2776847847238226,1.2367550266336846,3.1561599765309456,0.8810515108245398,0.7217991152433867,1.9168583884466261,0.5581535734938037,4.870445015752899,1.7145130438029554,3.0500113645131464,1.920432560651194,1.8205512508439947,4.131246951034955,2.3744502619880405,0.6211370295573804,1.762882559980864,4.657652888667028,1.3103137830699163,4.584686916750539,2.3016764808442955,2.381433058764376,0.1693495744063811,0.3649983088997344,2.1175573180727203,3.4958611452951907,1.8798163580992533,2.877932378550999,4.488344686608032,2.7089062127147945,3.0587721139047463,1.2481676410208797,4.520631799548305,4.032072241279597,3.91659668364856,3.820204132735745,2.763486118276771,4.7442376173285385,1.5273512728964223,4.874366589180923,3.0817127155116597,2.501643225975325,1.928906802761844,2.7757859769707394,4.1281643181893966,2.5736314170096666,4.427553236135089,0.732312492101711,3.442163348504689,2.2091351653994638,3.332712773348101,1.4385192849598505,1.1094714127418626,4.644671910783384,3.0135619823538153,4.254544203936634,4.607479623310811,4.520266771531777,1.008939904127888,1.4434719722639267,0.9242507538664435,4.380722367600898,0.02941659103252614,1.454577893725727,3.249772230553339,2.0443172452575196,4.112667507480431,0.5935606252031111,0.19267693882987658,1.6725047850488217,3.2614824026240576,3.887645947661982,4.16090653216282,2.1027600706594187,2.9114850594320196,3.2059245943970174,2.2847531299778256,3.4862878890906734,2.9051783571832503,4.750391253440462,2.3085197144713065,0.1887157831744246,0.7525912385961819,3.4471500846448775,1.9400141580992913,1.552777995020066,0.9702429177533012,0.5603804480157903,0.7575016301923498,3.503048979913135,1.5510224626268354,2.092523890545807,2.9036261565829147,3.6927102925547794,3.1097011505591112,3.4546411368861896,0.5188599761302171,0.026703313115337135,0.41791551918183845,0.6273866409911288,4.001463880026726,3.7164203160226594,3.1141469531239196,1.3538020602541623,3.5134195074558736,0.16674286453258302,1.5923719959088634,3.8434307397521295,2.9809401359352137,0.7448944785762524,2.6133342893345315,1.4783777685233346,1.2271989909202219,4.429409696261822,1.4638657253549636,4.256393785273653,4.029512104353161,0.13574418099085217,2.8444615884434876,2.8050486163971833,4.318018112253571,0.5433308589383601,1.2796497929767814,0.5587217072455242,1.271351548467865,1.0712774170172712,3.964303374513497,3.90227005831819,0.8014086096091544,2.382445708054547,1.1059123494860124,0.19610807315590395,3.5317749145992225,4.33867017356281,0.03197358374107284,2.392691257422305,2.865552261373666,0.35332893449703917,1.9511235387947723,0.5527346904519537,3.26842316302269,2.972137505680288,1.066381147653126,3.4560102979012806,0.4864117788872713,2.252571785789612,1.577965858888607,1.0842110659874848,2.9742432253745212,3.812582368104124,4.705255042516941,4.936361144262608,3.9963200338124008,1.101926028718978,0.9003624349883266,3.9723142756121597,3.232607920746072,3.730529217351589,0.8770507795688554,1.396496487001041,1.026048677339152,1.0237684321603557,1.770959953606246,4.0729298755664765,2.9232306043294196,0.010658753559926737,2.205124906795084,2.384154336437121,0.40288073133787017,3.895509888773956,0.8790929660348923,2.133783798783526,2.438678930984218,4.887375644260277,0.5813408621008853,2.8161432181628197,3.2080237405534637,1.6633189274859972,0.7447467317995249,2.092595126347554,2.557175828614331,4.796264997358226,0.9069565802592494,1.9848121265431184,0.9337560675513445,0.8716221609883779,0.2497051750808077,2.179113778902795,3.5485519398173504,3.723440224917467,4.825566319164198,0.3324556061035777,4.736086678333766,0.2787748503356424,2.9551968895990823,0.5763345794756369,0.4422978752646656,3.0204223752706625,2.2805720673485466,0.836072780338758,0.45351014968562975,2.7804215911949095,2.64253285525756,3.6602380713824854,0.6630658793315036,1.0718649584835005,2.231872123433909,1.8192936613769584,0.926476837987571,4.7315621442483735,4.065383097390315,2.405294145473167,2.4055988159348054,0.31740081802580145,4.771364317044492,4.837482436581455,4.224709768123959,4.6673338839158,4.661249260353738,3.7116767464459333,3.2458373525818063,0.7739919963168873,0.32233416094317624,1.1435028129896607,3.9798798702929785,4.009498634257183,2.003627942936964,3.9764350059369677,3.449976482013035,1.5846368729325033,0.7600005089915918,4.544151338534182,0.9820012469227968,4.356880831725172,2.1211016138359726,4.975572760767777,4.489706131324043,1.3595105561970078,4.311650897997543,0.6964432274190036,2.907492424295659,0.4162930906214479,4.373883965132723,1.0778472434780229,0.6469747307883511,3.9703316856456103,2.417633323959063,1.432669719736691,3.763614917467195,0.6811133369082967,2.9791374508760136,4.471297604094016,4.383108728747711,4.381135640932973,1.8994306665566463,3.3935987588394614,0.8833800467123787,2.646983508942462,1.3581935781851617,2.2866975452372884,1.4936528930802229,2.3218972207989097,1.7812168263583228,3.9067738042323494,0.2276546238935917,4.563162298230006,2.3196624070562475,2.048845610356964,0.2730248724507056,2.0367085408291272,1.5495449025280594,0.36812222214651413,1.1121603873988362,2.826075531551634,0.7326984691855298,3.302099625712236,1.9733700045000724,2.5433927085167274,3.953102577592429,0.09419472862104761,4.397644979749655,1.1412359238425407,1.5758192589608844,1.9040716518516287,0.38312445123381167,2.3601005663024965,2.4860244594564564,0.8245668359154046,4.734625511459369,3.650206405598232,2.5574519858047218,2.6047877892624474,0.34058922212583,4.882117896682351,4.118785275404808,4.797428002413577,3.0921661539091327,1.3910925077756808,3.810229457984983,4.520602895159208,4.6727405496469565,4.545197604115066,1.292597203964685,4.36736381483583,3.477055798021512,0.2695631599695103,3.7639378403025194,2.500061492074588,2.0696598477009154,0.6508763916773941,1.875022871456008,1.7423418625798637,2.3462438563311916,2.984571696252636,4.181965272753574,1.305271264723028,2.87110288856245,3.19524697979656,2.5919080319917507,2.2656427967942108,0.3919419988773265,3.422998390939184,2.736175610219864,1.0064482142295594,1.4566291984101187,3.0868907679429114,1.3177098855852376,2.9506935015713784,4.409887742164548,3.247840519030041,4.0245775721628165,1.6560025470390904,1.4382272396265172,0.12040270493353544,0.9499604177668963,2.8890241870070863,0.9744949042589857,4.517055788708638,4.137151347278978,2.860872095589706,3.080234568687086,3.2774662437035973,4.136191359956117,1.5526085979152704,3.4186004876724296,1.5915705669528124,2.7607171185681754,2.2206553362630608,3.5867770469584714,1.8972146277085367,2.1359732587728275,1.5307759943541355,4.213997765290266,4.269173823961522,3.5624233090946236,3.653488616968996,2.402581212074356,1.3968373494200548,1.776953612141774,1.8517801857194838,2.4743960266220464,0.3343014713580772,4.475357643964681,3.680967383067469,2.060816015550886,1.6253557288972642,1.4667153439688208,1.8407007891782379,4.789388856792845,1.0193346999381503,2.7929940947944276,3.0078187410262416,0.5915526680366301,4.737277783392392,4.685339002847014,0.6484329578897541,0.6799899939413512,2.1846526321222246,1.8020659870811995,4.832090782893495,3.7473901388611717,2.7030986088395292,3.988237134036755,4.9740784028039995,0.08978584344778162,4.196667218559692,0.5417862690816111,3.110293139896304,3.216295633560897,3.51322717927549,1.116726786186324,4.7706595790360575,3.317014073000978,3.3779687748523624,3.8566008782236914,2.932484599773153,0.14710394970593677,3.331473804208481,4.253728292399971,4.4622033429372685,1.540492015617424,0.3444655184900325,3.2961618834305986,0.9863642021330765,3.7017969729428724,1.3267281725634406,2.5242754764685293,3.334328682908383,3.4532062692623935,1.6854702160821156,1.2753259400793704,3.926338881337188,2.201897194034564,1.4211914593471908,1.1569147880745068,1.4873176291725099,1.9730362555781833,3.6421492017597035,2.171843061935114,0.7993221323058453,1.5581856073542766,1.6305043472015779,4.774246527759283,4.6184527593679086,1.5860815572145837,1.2155341044357937],"mu":[0.02497445966783962,0.29530938866475664,0.8788516524895884,0.9489050396405392,0.8794255601657246,0.6940532592429982,0.8241584767481782,0.041838946142707334,0.5791996538222162,0.9550387744879378,0.3666663943969486,0.5569839544587751,0.6880625797218405,0.19528226634949464,0.9320759209051799,0.5434867992163834,0.7260219634188898,0.011130761842188752,0.05394242792405857,0.3424033751498168,0.45552760369645573,0.4606983997305789,0.28334865663485087,0.8212051025275973,0.14736148290783269,0.8617937045863602,0.4626304511685644,0.742871710697409,0.3337727076817387,0.6121895175222283,0.30700930191289477,0.699553731906781,0.5511447099824469,0.09089458316372823,0.15649181145787794,0.047789406709194626,0.3713047024171625,0.6731796667601255,0.7857145753481771,0.9457232290336153,0.7126672807823209,0.7786412918242325,0.11300123150387997,0.8230323749132862,0.5246988892000575,0.833286297004771,0.5374548707716906,0.18127433426349526,0.39073617365332725,0.946026052974988,0.7329105088259529,0.3878080578832177,0.7330300162479686,0.013683393109134245,0.7948469183987594,0.4298392123799102,0.8288379178813936,0.1971200559634676,0.27255289868474475,0.3682189357507746,0.7213518535135741,0.21183867048608995,0.6632404607779694,0.6532028103640226,0.5205100612546818,0.9249575478159788,0.6020962821491962,0.8336399723083581,0.07121294069121009,0.060630119977283625,0.6474175357488134,0.8848548861709149,0.32343092885268243,0.9950657893421835,0.7476347202942668,0.07986960767115714,0.24515676125226626,0.38825048432540243,0.3986934848236854,0.7288825087459248,0.454795027939094,0.3067853522743327,0.7548339667299953,0.9587157919055036,0.8826220842183481,0.8488244787233932,0.6507975996727018,0.007475129989220841,0.6013198107831801,0.1646878544266217,0.4596582535106073,0.30020955725747256,0.9991640523166267,0.7764806584778237,0.7117908221986313,0.7507572888926648,0.7950117338992386,0.9468565334288372,0.7464680125248113,0.2772814848210514,0.1367045279369674,0.7867066510523839,0.7024616809218773,0.22541021939156347,0.6413667138446721,0.29866947168142444,0.5089002614987352,0.6881957980971167,0.19267920084842216,0.042242144524287095,0.6437750328832912,0.8595977072946226,0.7992829946532769,0.4912518396697636,0.09445514801171595,0.4815097350567037,0.8770348466573825,0.888912431891056,0.6938089997646821,0.6237094273989832,0.1095211452187086,0.6575486743455636,0.5305327345091779,0.4389222815122211,0.418970214416023,0.10026700754457263,0.7034735283377098,0.9354053212440887,0.3821786258591038,0.2396466716444332,0.027877391199693013,0.6006273029054054,0.4392551060658829,0.6528446341356322,0.09735634259722925,0.676914400059691,0.030872926576623883,0.6018579823216228,0.06380441354541566,0.011421444202461162,0.03744284319343749,0.7661979566153323,0.6858343692347673,0.6029189914236412,0.839886105105202,0.7329011012712252,0.4910005353156943,0.9075142410469013,0.08509184998315322,0.03197498768078999,0.13569481276063589,0.518500767679817,0.5680079614578137,0.6977198127969542,0.8009925558133786,0.2690641856706246,0.14290232362732813,0.26472963072048517,0.838346011854586,0.8179573274040328,0.7775310926965266,0.14960239510277118,0.339096856008297,0.49697166940258897,0.2634738117398745,0.8149121943129456,0.2913263175106855,0.9378427785500221,0.7726799254639518,0.24793565216630165,0.12609953268362406,0.8397167332213846,0.1965471064731923,0.7359619041056724,0.4499432737571063,0.8493221614478426,0.3076231794460471,0.607749326506452,0.09566485667935898,0.8919576601937016,0.8761154516062217,0.059189715852520086,0.499897477782119,0.9806696161721655,0.8700072299742074,0.4183862734840955,0.1717658233926056,0.5907005384180575,0.9289169518561287,0.9477194114812075,0.48173929819505235,0.4378254916238844,0.3760860541319895,0.18717578724379935,0.0870087865858944,0.9590300062472294,0.3159710493095973,0.2178323963229376,0.9162537347272868,0.3788224415047443,0.8055797912854652,0.7362515321832068,0.9505077244977744,0.9378533183567803,0.021385782486526672,0.9553686496201219,0.7349474232699298,0.6384038208639389,0.18584643368688658,0.15279827115855937,0.12198362503271731,0.5700667789322289,0.9028442675288437,0.8615244611159816,0.20727554022892436,0.3316730052997441,0.9635875812576793,0.7692941236646076,0.5724987153899066,0.8858510780613968,0.7495022923237875,0.017541230351719284,0.6883694297194791,0.6281103075487418,0.2461686935674683,0.5950362676957062,0.8441358164152268,0.5509745961252102,0.8365624706932799,0.14958116967216117,0.4478406337041252,0.8122987067190246,0.45571474875288254,0.2094906591788117,0.7495860556380884,0.017052228165744587,0.277861623816855,0.5102571303281529,0.03582125477371778,0.5833910766452772,0.20217169299305993,0.9710902995230932,0.0854094735484694,0.33686168840852226,0.8692131017451505,0.9011440120776031,0.08097264557082595,0.022391075665386895,0.903823296546612,0.5819223874791544,0.2148907405650733,0.18507468506062064,0.3977246335018092,0.48195579660172116,0.5616707520474389,0.07426638139741115,0.3531874108034312,0.15458513367895788,0.5443731550894342,0.3931139397889014,0.4995303757855254,0.3560636396681074,0.813124899066336,0.8717135961642877,0.9135095966664617,0.8954531459796662,0.19941967762908885,0.6050707662494552,0.7274034062089823,0.9545029902989159,0.36765361700384713,0.44643602662771054,0.3598477629037409,0.6147157921920616,0.3823372734507158,0.5041457166004952,0.8534125354934701,0.8729329379860786,0.5338460287610169,0.40789367703088564,0.04058821120289924,0.11391263568811794,0.6639940414431564,0.13049062821295476,0.13987507745044137,0.30455157875109484,0.3685325002068618,0.5268172778625926,0.5339723826637561,0.0539103107333867,0.0046056936396303705,0.5647655442382717,0.4495081323582355,0.900987446692157,0.850041383933108,0.6739753923007334,0.5325997017641495,0.26198514897889713,0.9591470233013981,0.13639367379370393,0.010771552261687578,0.8658622633572741,0.23772017952961333,0.3232163461890303,0.5827330487993647,0.4082260007722387,0.2056137530237656,0.15635332851029538,0.7832205445376739,0.19905974814027494,0.5620719502298241,0.5852701377022795,0.2262338106036923,0.5790280542157631,0.7175021528141425,0.9151672334467129,0.41963933846329704,0.48186830583517115,0.879216246705415,0.5442871676042711,0.34977618868807814,0.5127071969580108,0.6982773768570842,0.13322671055083313,0.7982657772770687,0.2845370444910589,0.3206072224721286,0.10589601491878087,0.6613801345772332,0.8770032904449918,0.7019756336565282,0.8626775418367401,0.4922220694804851,0.2920442258226488,0.35370210221094744,0.10073589549938289,0.2581382248084405,0.3771397711685742,0.9035406885402821,0.051985601786830316,0.6673584782897095,0.9222211322198999,0.8969683086809472,0.08627942146437673,0.05230889416007445,0.75867591498863,0.3867311324149989,0.3300885578537236,0.9134504908564949,0.7299076928404606,0.010235527732631589,0.10281508141793738,0.7494358602314866,0.08271914156997529,0.45591266494562466,0.12817534716950796,0.06651077604120048,0.4440926138704009,0.6623074591096441,0.1957374307044919,0.3485285991743683,0.7553128136684093,0.2861742742685167,0.18022251811034873,0.593211014238032,0.27268264147354704,0.37699458148579734,0.7056885782890219,0.10089645487461851,0.8491007779724509,0.8556400021442445,0.09224062374324848,0.2113022841032497,0.6721415005248514,0.7803674602007025,0.21185508483186544,0.3531124867282771,0.3972882212048465,0.3278325999075944,0.038576266240783585,0.09817491264873945,0.7801087608968416,0.5656589646246986,0.495277290630298,0.029078807661536032,0.992700086599827,0.7220518933608797,0.5844801174236183,0.4704227914142367,0.9261307474801537,0.8685120100188224,0.8026874842797675,0.9290859178714239,0.18668493337075542,0.6035662896705214,0.7752706895007269,0.14898235550715588,0.6889605060389237,0.6576300525153589,0.998810016674847,0.3759277955332414,0.3739677270630648,0.008320894104031584,0.6944382256681481,0.729189388818043,0.428359938711355,0.6955820901873204,0.8643943433839445,0.6863946090803814,0.7305301934023587,0.13855679861318548,0.4996723786101307,0.06353609662081183,0.15295563551593894,0.027007820891656875,0.6983160454570201,0.9916746271399186,0.46919320012245436,0.6280286692906136,0.3325859781337832,0.7568999841690154,0.23764472373966683,0.0803919225684282,0.8723305865488924,0.7306096989152857,0.23781949553130044,0.5386107979562087,0.400584327218209,0.44809108669328324,0.9070553212046577,0.31261843355411756,0.065384063624641,0.4193905388339696,0.6544582195070237,0.3317691905091531,0.7087292938441829,0.7629307671162109,0.09882971769980364,0.22952188468515344,0.19149744216586173,0.9918361486637834,0.9314378039800548,0.6802711176468614,0.024028578673216172,0.1192722085408584,0.16359879566113844,0.49321937468535393,0.8671523678975035,0.7792410933855543,0.7254198555872877,0.5222221800818259,0.06737374078638925,0.5090619401446368,0.856702603777926,0.2305651321939064,0.815705597387409,0.08335817395316059,0.2362458760634838,0.8956329332777893,0.5840591831933468,0.21326346742078872,0.3514030781130597,0.9246196932956932,0.3044374786894004,0.6356289446354912,0.7237889527222441,0.23902578628515436,0.17456848199097186,0.6087338780766027,0.8451603252939963,0.4841380809170692,0.34640309332827446,0.4604561037644437,0.6058599559947231,0.5233480610798598,0.2477899400625978,0.2616389177660521,0.7684931090154907,0.5100563441346577,0.3841973951629709,0.6875822449264883,0.19077165559068932,0.8148893303942459,0.5623771849255905,0.4829924954637346,0.18782322809076435,0.02735680075653013,0.9366172968985473,0.3555498806210027,0.6212287625650212,0.7857777992022053,0.041936669225213885,0.979602299249217,0.8507733125871317,0.6497709492292791,0.9282192398304618,0.6552561741233265,0.026737798531192736,0.824868919915285,0.8970635848202262,0.2588220210865839,0.3892754230292479,0.13457989399598413,0.8486929302296224,0.22821579884803755,0.22574073652710092,0.5831943680085885,0.3716120910168086,0.943881671855014,0.2755796005110327,0.5403737196901648,0.47372118544831676,0.08169424867901753,0.28601738839624335,0.9030179934291582,0.9942556604067085,0.3124137087815628,0.6683948679599319,0.812259038452815,0.8578339913829218,0.16936995397630983,0.20403091456492417,0.5680416658647331,0.4991708673094184,0.06475372784362654,0.5266259209698414,0.974219522741347,0.20828164063510646,0.5366376657870735,0.42291975584468333,0.8143556883467893,0.3756311228819782,0.31018719211553525,0.717724914905626,0.16355817469168943,0.7305297184968713,0.48550483818023005,0.9002472016325591,0.4988831108125329,0.2666194442125027,0.05538879558902421,0.698652584941297,0.5117911144645866,0.49698161803261565,0.02523583221902581,0.903148224408157,0.9231970656190474,0.35351794409934123,0.0641093168155169,0.4510245211832249,0.29681991643780314,0.5999403258226155,0.7389583010843508,0.33312203241425564,0.4400910587942575,0.22987273808006914,0.09578202847713335,0.14154723923283186,0.5064924635497505,0.6950621668581616,0.8273409016404705,0.8055307690930271,0.32429732570657044,0.5176877505717516,0.5335317888934623,0.28804875075406833,0.702877018392285,0.66506722521427,0.8174167436979429,0.13746101531684718,0.8597582101643595,0.8697164857595305,0.6781700441795127,0.17406174657147688,0.25535022089194825,0.5857867955312654,0.9895127107096615,0.20510129241889152,0.009417847069470797,0.6900627862984874,0.6831474640059239,0.9048954645764031,0.05522713763847942,0.8822754149779075,0.2526727788092695,0.004875303884551929,0.3915360707912987,0.12932296643233343,0.49423456177296043,0.5712207121940416,0.32361709839282327,0.733501257109378,0.7522205162268856,0.6197332012731449,0.02637200789787486,0.1784984056984158,0.3715616924626568,0.5733036297047418,0.8953779144606633,0.1510401602051823,0.9936155107192142,0.0501762987156984,0.6582204701960663,0.6952298079341368,0.6061221048200947,0.71392147933022,0.109443999423944,0.8920515659026949,0.06519986426363245,0.35985440175028227,0.08397772401009762,0.7194169871644303,0.051788504340049,0.2566602946055796,0.27858940281445155,0.3808374567526651,0.8945739892805988,0.6293793118841926,0.16377075977699995,0.2904867718280537,0.4479495712491024,0.2435010304703069,0.41375535488797066,0.30418056213572275,0.5894778570212265,0.39764141812677867,0.6896381199008841,0.16371887590354817,0.4721000154626578,0.7683557268557841,0.9520949901048126,0.964520593982584,0.5065884722044569,0.8418192433702527,0.0357310692548678,0.910800571777127,0.20233049944368386,0.5955941920239602,0.6542015427762911,0.7933214503205075,0.24572931703020573,0.8015287825794946,0.8561206860174002,0.26249284488889857,0.6114096129050852,0.04708102294743499,0.5201035403981198,0.09935645511965663,0.6548889975870886,0.16846930919370617,0.18651405468664217,0.9547973938244305,0.2863352615380601,0.9082290635825272,0.5270939865330315,0.9725178404799515,0.9690963692779939,0.832657052367441,0.14357673226697032,0.36620706771062506,0.08788144174477286,0.5811795612213067,0.8181461004674333,0.8417644118658381,0.15895002431916394,0.8064498543192733,0.1495874399458399,0.45421107285107243,0.13349262944798834,0.25378595560023864,0.6908872712513106,0.46346415951391506,0.8887197596484278,0.07242525294258795,0.6524710141457923,0.15186176478992564,0.37995685436741744,0.08527347803592566,0.8387954288881381,0.3911776236025879,0.6736378871827964,0.7304326937680465,0.9830851718367171,0.3325941063549549,0.13281346146159723,0.18685600541629843,0.5416036679128076,0.44543675699315566,0.8092252777763076,0.4796901359449699,0.048834131438564965,0.33887663637266985,0.30012025074322146,0.5865998685813976,0.9047851370290256,0.41459914879385185,0.053744018902621926,0.03442212897878005,0.8514185679729414,0.10231569550162112,0.5968826503836635,0.030280013822758578,0.060662082780857496,0.35015439091000067,0.8682151414067347,0.9271627394899544,0.5470020583689319,0.9305532420803246,0.49278247744828274,0.03060879097724767,0.7306252293129247,0.5959957633837873,0.32628006585777336,0.0583472496384041,0.5018877842457088,0.8769059917750806,0.8332739957203752,0.18723987462262848,0.48485873563009574,0.628283959692747,0.9528461458286439,0.017201045348947508,0.6878964236431293,0.6355450213761311,0.7586243272582183,0.21483087766770725,0.12169694793285801,0.1869142163123123,0.953147781218971,0.39398926946338375,0.9391940396463061,0.3404007875858792,0.3137785419873844,0.8919820100409783,0.3336000732706035,0.8811806922948136,0.8537259377955111,0.6624079029340668,0.6703112507601412,0.07099575368657729,0.5635887974041416,0.6169779198988594,0.7323502159309776,0.9660935857489328,0.22670083974995592,0.6042675939605877,0.2160583741094393,0.7665034099266466,0.6435961170064859,0.7904830436417043,0.10357138251936959,0.5053492921408638,0.8449343262342539,0.7123132405058088,0.5765978758905361,0.922745659295559,0.04268961254431636,0.43941942846006254,0.18380261431658007,0.9032910194360722,0.0758260728934681,0.699843108745722,0.8112432721541105,0.5094396625028168,0.01902977570810016,0.40987823604566187,0.7469576759010941,0.7051799502695013,0.8142068779861114,0.22275322970737754,0.5400094774147077,0.9671153359201865,0.38834395585628534,0.18461049671356133,0.33660484296312254,0.2544398568808304,0.49058727611359076,0.26110179362008457,0.2782328848294009,0.2841002174053666,0.5868883534536571,0.2637156881886613,0.785223401821302,0.5410901929111469,0.6518733963223982,0.8016531493396963,0.4193815607524378,0.9312565875867058,0.04807781576517112,0.457455434215881,0.6857034138173517,0.14482706534492573,0.5418607493476706,0.7400956309645013,0.25925118157327387,0.6006363885297468,0.844534890068598,0.1614905377398752,0.5621689701450658,0.7340379068977918,0.9304998654724477,0.5389631264263259,0.7497750858696095,0.47347258208142584,0.6113440891851707,0.6055568461415708,0.6652405478640835,0.1647952341144594,0.3527085904000462,0.9464295592369445,0.44609005014261727,0.5830826901099377,0.8645310447677574,0.24701904539922337,0.16085380525795068,0.14294701549693412,0.3580957082539151,0.6886954981808793,0.40738143265346527,0.05205172273212577,0.40051508301983363,0.5611124086752766,0.024380160646690685,0.03170236834410178,0.5482302026108021,0.9856755933732737,0.9912800192187132,0.18906399513754568,0.39018294207544857,0.5431447484237282,0.3822474039688597,0.2813254985142617,0.9745192314842992,0.4236977606698953,0.4401847626753692,0.8965914314377745,0.1618478796496452,0.21543144713846663,0.4437984396819852,0.8280141580218086,0.24541274164725757,0.30615860726980304,0.9146252628831892,0.37453262857744885,0.6511663697678065,0.29212069467833013,0.0516819299529756,0.4847840984131697,0.12504556471080108,0.050855605454113606,0.8797710262507539,0.9579382230077669,0.06488667228778033,0.8496263400829991,0.3912824487496931,0.9758119116537773,0.4351641489813707,0.9525247101021557,0.7637638792462942,0.05520697781036965,0.5781800502105621,0.48049738480480486,0.882650323625565,0.2187622579398394,0.5673339440856631,0.4781664575899367,0.3780656183851878,0.96229599107186,0.7543782971318467,0.5489616404195907,0.9353342381236145,0.13967316208556446,0.6021313465911307,0.45767365119521264,0.8737326732285071,0.9241209914777584,0.954084484670394,0.8988819373299133,0.4973688613790972,0.8733839740679881,0.13691343775847442,0.688880442939382,0.8953178407204903,0.04465819161801243,0.6955783521223118,0.04880135032773336,0.12552537351307747,0.6068320947057995,0.1768390548026657,0.852740653107052,0.5896538639305662,0.11357357056336803,0.0631970377244313,0.28256620698396206,0.5927520309588028,0.7750083483372836,0.08940876921743679,0.769571612414274,0.019741276635346194,0.2867990010157808,0.22731601499531995,0.0036152160610258832,0.6707981345585716,0.2717820582868522,0.7295506632883666,0.9770773629345395,0.3168699634210108,0.681549132769447,0.9152828860094953,0.1030234222127413,0.1693298880630809,0.5020776342583986,0.5764900902840857,0.9226962620668562,0.2621485952546061,0.5773674141363814,0.6611346615674185,0.25997488166649996,0.7263844511111419,0.24681731010009922,0.6301115797113515,0.7682770931156222,0.7002728671640126,0.2980971101341252,0.17139679098389204,0.7523506459736276,0.3177143348804421,0.14448015643331402,0.2556196171249776,0.534794564690316,0.14129299984361676,0.6234766345097547,0.5824239021157702,0.30848152085624725,0.5514552030848638,0.8636379401518897,0.7653163200937907,0.6799893233647836,0.39425168913424447,0.5352007624066355,0.6536711561756139,0.9045234779531006,0.3829385875809037,0.9342568173819943,0.8192227545904738,0.5681513372205227,0.33670736674478596,0.6186986401895056,0.9860540773587683,0.18280767673629184,0.061351349972254665,0.6008867273383911,0.36085498553008266,0.07280089746313845,0.1435551215506352,0.4309460114494539,0.9514986454506518,0.5181081602703197,0.6310012362397641,0.36085350972240504,0.09354232259677309,0.3571616333706429,0.5508286598559962,0.5446396097554447,0.5686030009694523,0.43089878556144945,0.6437978045791384,0.1737424985290048,0.9225190375179175,0.07075560298051631,0.08700445111976807,0.7548733529557579,0.532632564598861,0.027669202966096984,0.36735197189464164,0.8383723742966962,0.2023877416851656,0.1632611715087151,0.26103870024693077,0.39234667987133354,0.6343984026485123,0.7069497495815473,0.839928186299191,0.2794487369848593,0.31279251874226977,0.5775499095372043,0.15173406497393072,0.18447037066589056,0.08718210543713312,0.001336619304356912,0.28989728884016763,0.5354047077289033,0.2168256978668035,0.10417884806884659,0.6385013670216866,0.26467313091476674,0.9348921700084254,0.8230013802599037,0.8505624223555324,0.19335873785191748],"beta":[13.592309539643992,10.12345577146501,11.698968675296314,10.761763535033362,11.703734243364345,18.542800256008682,3.1857534498778017,5.954164006549276,11.237347179367143,17.786652973985284,14.897904736673633,12.890207364730482,3.1452002927487843,2.2283253735599473,15.43699453217981,6.9420981658172165,10.18055821184053,9.797460855192707,16.950957025481507,1.9060223268727805,16.82816292143082,14.497702710855421,6.864311002100534,1.246144640424891,7.979893637448252,9.057843373893192,9.669640247744535,7.608595510632656,12.022512901842454,7.388177951625341,10.317684793475053,16.4618172140402,4.373680332224956,10.072134429332799,9.544077155112994,10.375133654653869,1.8079119098073226,2.484188779677856,5.747770374639751,12.707573463418287,15.752386678353695,7.0459693889272845,14.159710773145505,8.289763833403768,0.18263039450901353,8.618496291965156,3.7063584861851684,15.375149000285603,7.96081966054023,17.869218430665082,6.8154283350106715,14.158387343771466,15.213701183419555,10.611117258814966,5.660331757650066,7.375883885536054,7.7359268106844326,8.119019910262919,10.372409007776774,1.2087796137899565,5.642759571420064,13.763351904605216,18.20296506746701,11.571262672942751,19.448776986483843,13.386059251140292,9.953110286290006,7.33672280626827,1.6427906158417072,0.4805589216096484,3.999163575024074,13.729551560277917,5.334979580879748,19.898470252494107,5.674265867875907,2.8774818544712044,17.369700839216936,4.471383254856396,15.112678367468364,1.351475319443134,10.067513687907326,11.186927622949302,8.999882755883224,0.711639660539336,10.363664398466849,18.037657758317756,7.039767008498821,14.842117563355117,6.82296072738263,14.523348696191558,6.019717423016844,14.450028864503114,18.48451285426743,5.2439065433959,4.232756602854639,3.160227790666279,17.008324126636115,12.254457358565073,7.58736301939996,12.031631366035217,8.738906465183236,19.368390167709943,19.821975857379705,18.41194936030577,14.855384288268517,18.047311308093555,1.235353593475268,19.149410610421217,7.314631705667063,17.000347555573985,8.497229523162297,3.069526881723017,10.069061554927208,8.627073147182847,5.966488635441118,18.91473621491744,17.65481187714243,5.25605124899458,13.74560473370012,0.2127512958940736,15.394554990553843,0.08517185120370918,6.7829518434546765,12.161002336782536,11.234360438461394,6.469112923933831,13.31163742374402,10.799421125519174,6.520774082704253,11.036079467281272,5.9680506024677715,1.8523861031935196,1.130164773497535,7.891292391708276,7.792914745853636,7.790824950421014,14.7390768802771,15.705859449099005,11.020228948447212,9.095655252722787,16.46012957249603,3.7024699864170785,3.4146793585570734,3.6029332259116043,10.658099355857953,19.608303356904987,14.068574902820327,10.72518151659037,7.390769463327835,18.713667309762364,8.543442402184729,13.704414603913296,5.0162460940239795,8.515486676226601,16.795925242901973,14.494400705553158,4.984623004463278,8.957547389515463,5.466906467228312,16.41786801597977,8.853423087994798,18.318170227980023,19.50127955204874,12.293304172711457,6.176123955114035,9.082248721614024,6.47394473276647,12.684212335654257,3.600953984081925,4.797781716166902,14.217218871370886,16.350862418316545,2.83007507336285,10.83534478616777,15.513419461718714,19.847432927561492,2.5963944347044254,17.56540270060301,12.178710110324662,14.052772190431853,0.27096387319403004,8.618253452245618,3.0551075115621407,3.508615362034857,19.240673204126093,6.18532161860788,8.594195525412548,12.394158705857752,14.108253012975226,14.758704434577862,19.75052582006033,6.373509782722713,18.544042883924202,18.65329776202254,12.866529422545728,7.355079976332086,9.871748343441435,3.6770496835702593,7.515395520681687,7.032984803239324,9.905590410055307,0.550770088386141,0.21662159827622762,18.376578511335843,2.9994926768711716,14.503959172560602,8.074622385237955,11.590579550627025,0.7137517386688375,10.528351592939803,5.002393347130263,9.307975689400267,18.505672864694095,0.4295470545769797,3.4581208646394,2.6504253447530557,5.841285610566209,4.388890662101197,16.47785269924251,3.1362936085684456,15.972645861071765,0.834449084181248,2.6379964487008722,17.782860427224048,12.557098622359364,19.359013163127635,13.32440545064696,17.09812557435533,1.001303300173837,11.97021108650523,16.93886249794106,3.918286107497706,5.04509245976942,7.321344811371211,14.057118321570275,11.913405708482902,12.154097782412503,11.749124290518079,3.8160196085734865,18.153990376348336,17.17191965413121,4.524169484869183,2.8846839741837815,2.8295505482703653,19.342989728752798,0.8351901784248073,11.051500943321164,14.813026186981798,3.1581525910048214,10.489771734039364,0.36965443843514745,5.323570490307881,17.17806058462933,11.644143819044412,14.731770440719556,19.8361688563809,0.24802399237711104,12.091034228573637,3.1704452621913637,9.722794462516799,0.21815878383355525,18.983112622329344,2.0500864013248865,4.55119403630754,16.131879706381767,11.281018800712888,14.2717388843875,16.7710952572302,6.879777338300057,16.794753134202782,0.6964501805873535,18.096751586330267,18.76006895209262,7.194958984695137,3.7450389073064727,11.611459687867093,14.049226688549448,4.837302121979836,19.032570187632196,8.086348548335636,18.627373455237542,1.3007422422012338,19.12231378056983,2.703735811090424,9.18915295277895,19.69967947615615,9.579574733840683,1.8218559239997667,8.888431161947818,12.663263964262509,6.948454068407814,14.504585842603998,19.929180999024,18.686116083901013,10.610306363690686,12.282059695268277,18.81527724526937,7.7700636422672,2.9169390456288102,14.404494602391104,12.57879112133477,18.153124142582698,18.118732332965383,13.49323350023148,10.915789302743528,13.929898878050295,2.844118935273263,15.500461389445842,9.610636279006833,3.23806284053485,13.0328943153463,14.90700336434732,0.5743773419111831,19.13336510837892,8.514591803522205,13.56505765463881,6.151727313580073,17.28099181947977,9.747028384869068,1.0857041002490764,17.6990082274964,1.7614824063669854,14.520070218087247,1.6999874846044039,13.198944898570915,1.6717421359464923,11.489783566980591,5.378771665014752,7.555980723016922,9.335054268028378,7.254176541409891,7.02749319805104,18.622805498154733,13.113715928417943,16.001557461670007,10.173284254978995,1.6478897431194595,19.13596599349063,3.4890280993540657,4.7189340704771965,5.472164798005443,15.685418962156552,19.653565310500674,0.6481794287857845,13.393306591137147,19.612379415377067,19.086613526176798,14.159202836716824,18.984100571638795,18.27358383225728,4.1056289308791705,14.501739706305807,1.0880109343881506,5.959931811627621,8.533434556270322,18.098928121170967,11.962231193677901,13.207498599249057,18.60834284716811,16.08937278423997,5.800151748837865,6.293148082959399,16.985622009500485,17.837984675987325,17.47014700638485,12.549140431354658,15.41823147931208,8.055802022853054,9.568819801265027,6.996649631078622,8.982077303911232,19.415146937937365,11.921578017827827,7.569134678511622,10.40432057823319,3.383382583839327,13.004696291147155,11.459477299741332,15.441741086074675,3.065768034480243,3.6061395528931994,9.891211275703577,1.1920341263270329,19.827538077632067,17.341002330171435,19.433722818398923,7.035149517231689,5.9676831954435805,5.4024607177219774,12.911716642215927,9.596283355274139,5.062393522990054,11.921169466359682,2.9352185351509608,5.092034151811857,13.128806284881316,11.84056634415414,3.881384627508635,12.365765566158222,14.73559598959342,9.695524005654477,16.25764611168933,9.536616715953308,3.963372023659333,10.132286157286178,3.958900336938327,2.0779642301820145,19.822795806013083,9.240433765050922,14.46405156580704,9.784823047505045,15.897850370712089,6.557175534124129,14.167188669684286,14.865032445744788,13.226228266546896,5.121326065307792,0.040823647670702456,8.679483950201679,1.3344911147499605,12.862023830964775,4.103378766221888,17.441710208351935,13.902213297142367,18.614971286243012,2.067076697291297,3.3901647908100685,14.738304808536146,11.465495819825495,8.51125803492387,3.4051575143081525,17.1435604603472,11.760245246461087,16.13911801433015,6.724734393515952,7.269013345357043,18.373170514811882,12.572325873110906,0.9830095360884394,4.576178541770579,16.087610039674733,14.274513396722387,16.830211644146893,19.98071568127066,4.913445658963931,6.126113233249821,15.807987380523256,1.10941883081904,10.409920552197267,4.783807127595798,1.5264948913323195,19.522630218874582,5.085313448877935,14.323916487458753,16.699325973779754,15.16693823158349,10.847460022685471,3.769663073178542,14.23733439162139,1.2035426427294604,19.61346714175434,12.382712080599592,19.66276367087639,19.067092832292786,17.352922821595584,10.284815076019761,2.438644895487836,10.290465784122777,4.854494536285654,1.816970158802449,1.3717690658766957,10.2451382922327,19.88048390528791,14.197672349712498,5.213064544066253,7.164569628622313,0.5133785829562987,17.151354859426963,18.251911210128963,11.376745932095034,18.601623174612495,0.8457979451696618,5.555497299304704,16.70741002254601,14.92723605172236,18.009753983470805,6.519975851931146,9.490666748809504,8.409035166205111,2.3779850035312533,0.7676167634926223,11.313983937577516,14.928900353161655,13.710986963547844,18.28200647035918,3.644577913989102,11.352689664993022,8.123374922967166,6.263355227797978,18.81094089032837,19.400841675155363,3.375540617120061,11.66751694301501,3.4479575435651633,11.13515329093159,9.605300568310184,9.895786214650148,16.220095147734334,4.372951997597574,2.0704068580832935,16.54376306504624,12.421637465319915,17.92994846355617,15.341368685322596,10.962545968424378,6.362812050779492,6.572702918437394,15.582039257343787,7.789324068593082,12.083899505034466,5.664945700266544,3.4136325286616875,5.93270367124072,4.412019214525613,8.233934057197017,2.2294137648443835,10.237228592634548,5.177811493197351,9.8816162805596,11.17634420373101,15.831897123115063,15.036147225181779,1.6113142899281652,17.44101388970379,11.33853079025772,8.625719317063613,10.808615088880051,14.149144461101928,5.917224673723402,15.20130826389198,19.686560102734646,16.905049119948615,5.783292308602248,6.687853803041941,1.79897639368654,15.06356306121348,12.145731771716237,18.816486496153736,14.127435930644463,0.8741580144667793,14.71534623937934,14.561613966375937,7.208958391522398,18.067663541878225,1.0425329504475656,15.249621852968938,19.71170884787519,18.32197401030664,4.293601548493373,12.799582584617433,18.39740569594138,13.312621401940428,14.305549219943279,16.590801209448912,10.421477762027997,7.83464376414682,0.0691076291511239,17.337426658519618,6.433107872952313,16.10245110612607,5.790059535166758,5.322708120466557,2.2316173814009055,19.951267026167248,2.2445972497057376,5.1287230730343,11.225391833852285,0.40458000208183353,6.328994525435698,6.143480487622499,19.193742829305087,10.100985313513547,17.740518824952893,17.540142001385014,15.828083447989677,14.8553853729474,12.200695188018615,12.88329519888999,0.431012309335177,14.960747905343501,18.535481413082557,9.135051376094712,3.837200548417208,11.763608986617133,18.349175889034246,11.679286657551708,19.468136365459866,4.074429168869451,11.716151686028189,1.536510557169719,8.911564804497045,17.1928728168858,18.008883735479586,4.196366984459319,13.580321404942346,0.5919045432889325,19.185760028696137,6.817161771654443,9.209983798988507,7.465676224944233,13.967062749162338,18.783917812873554,5.418286821001637,0.7521891654744683,18.95428437815975,5.084917524408534,17.03607706675922,8.718671630692656,19.847178977679015,16.1905039292294,14.44696455221495,10.58395777460278,19.826788936252882,17.47973697886679,15.419082435311369,7.155393407159725,16.935785404027804,2.9775410813666214,19.140837268874442,7.133243965046354,4.342488806960141,1.3626750649514108,14.71681300938501,9.561233321806565,11.125624924884976,10.98375584042136,11.30038129297497,8.708794489242129,12.777882071793378,18.248520441597567,13.314796929049253,12.620264451429586,10.145593450870898,17.522595974628853,12.275500009918755,0.6788936091860354,2.4175007643975155,1.845026001843646,12.971189060754757,13.959744904127135,6.525456204947027,16.317143317588982,18.15616292770366,1.240119244264526,6.647091866590982,12.353192069213904,13.291755349767405,8.349332084139395,17.288128284645477,5.883824859570979,7.396272746977179,2.225218102927551,10.76980268530252,14.622077462259355,2.79056522839491,14.758285507408488,5.649351952712496,4.223713617474374,5.432272827797084,18.752483545066042,7.324062065677022,0.9189701186530952,15.569513660614263,13.37922845384691,12.383589644437759,2.1092102668988932,19.993492722854647,6.009625889531747,18.936153165656112,16.749821147231682,10.390954179884586,0.42596151378873515,9.301623881186565,5.387224133457473,19.747818136451116,9.370135093159648,6.422228642329011,8.92476705678745,3.9508041204159783,6.7016359655629465,7.304445405826234,0.10149651485431566,10.046924599207948,4.263697603043308,15.415068252803486,15.476861524485841,8.147170146034908,19.103996370627748,10.654104338183137,3.7654846819919596,6.820454355301404,8.955989021046221,14.335315075753385,3.208732316472722,12.905706798857697,0.135547317306135,0.18247752005909224,4.1777985895371605,11.998690510814534,19.857798708126914,9.628421422061827,17.56527226841952,13.881503860643228,4.613141918146186,16.04576351808101,13.553849219366372,1.0440411654326764,3.4895168214813754,3.0921353414455233,0.04106863950163575,9.49538519398191,3.5541364351548044,6.776659449219258,11.45047286330438,14.386520584506947,9.577651492293286,14.44375591299968,10.625724649146271,7.887526479517786,15.096138635638447,16.08283648218913,6.813713607185283,11.777978288193225,10.007059698653386,3.118921559633576,11.336305894125914,16.91528934293074,18.537782615840296,3.868283074690013,6.776034310038277,17.22545047302026,3.8421295371868958,18.24802102913707,13.925352280326502,19.778949735833628,13.015961647721713,8.285614840541719,8.626620691048256,7.058132263228276,4.967602860061127,16.551597796376853,4.098155642747021,12.11724728524346,1.7964009391481905,3.6247335827843274,15.952635863505442,10.421739830896154,2.7703641332155815,16.562101083589432,6.392822764733288,11.021937090322327,13.626295065503138,0.32492256146141596,11.530902309996032,5.782308469837516,13.819129935302472,1.3396274527975294,15.835927258519046,12.781087706446899,9.219547259996457,5.796249014144905,12.621285684866855,10.566232132685286,2.2990794300474393,6.789435297394948,3.715133290678403,6.016302119991934,8.545415240281017,14.450939068213632,1.358071475502216,7.028084906836036,9.292979310983768,13.905578060023057,12.645639666410663,14.996030479547432,14.85260311003569,9.038024885910026,0.019671022807625782,1.1718211018104885,14.99127782834166,18.415949487564433,7.59670614807197,5.843154441674212,9.929066768598748,1.2550866733640431,14.9680350495938,11.760777462338554,5.275278014971967,7.85586173178757,4.675109287321577,8.89120246392077,11.870455696996407,7.84781617015315,18.573434112631574,13.036981880424898,6.153290199940309,3.2746260880356637,5.6359144109561665,9.18649046486225,2.8659448651959707,4.134791203027124,14.683586342000826,10.75815172547018,10.688155861098977,6.607994051592883,10.282313647733963,15.556632908748762,13.027665747722711,0.6580041507941159,6.4287872857303,4.197895173804573,9.109740933281234,6.1700127143878,7.298609308503696,19.100787355309915,13.706218523429122,14.971548141179248,16.32004649003064,6.786945118772674,11.13663745918657,16.322281064550634,19.442112703806128,17.293200247507457,8.345095835054757,16.54814510565703,3.9862166532364895,11.602301549269596,17.17287352002063,4.212927508978654,17.881395209116683,5.406635718847679,1.8958978011026106,1.3860248019107546,0.09224480821914405,16.762800100763076,6.6422149968143485,2.3239790888122647,15.134303963213767,1.5962051530442878,2.578806048485527,4.508656272817997,5.865196639852974,0.8807106821119115,12.10483999412272,14.20397471823961,0.9058665128552157,1.215510477196271,16.5828775530846,14.37849434605091,14.147851767002187,0.12605544362042753,17.835899295188753,19.61276181585913,7.013292049541091,11.35110693148967,17.814300982052423,0.5637707264649894,18.091895303664295,18.82033201622893,5.194218482405,11.699513975194225,4.883335686789407,14.693825357395124,13.55761420725031,16.796225876569174,9.614798213346356,13.847786931730637,4.385160463780049,6.936919907152013,17.622894985088344,11.124816413489258,15.565393821931398,17.568589342393164,18.89755232970636,8.42972791149811,13.147267649415983,5.156389970851274,3.1031886460693903,2.2525392367476016,10.398426757463962,7.896014640845741,1.4834678404185686,10.79124987731786,17.970044512649483,19.850788223886685,18.344938198327853,14.157420058346379,15.641343122939046,14.715770234459375,3.1653512593914845,0.20618533147473528,7.083146358353529,15.781573976032636,4.026690440424354,12.539179369583898,19.140905132104344,5.239077432133938,4.413773621572332,9.493832751511015,19.054401514994733,13.9029412556327,15.330855645059373,7.616240608992415,14.80932308411882,11.655720393743781,8.218803592906884,15.053117406177643,18.925707146350756,1.5409552183516517,12.263863937927852,4.429206099512495,16.017421980840663,12.426169572016722,13.498593184262205,13.011182402685959,1.3324588915630509,2.2363113940906842,14.673546091548841,12.171709128207109,19.476669055868648,4.545346008454421,16.749181034400053,1.8668189677853553,17.112987186224196,11.47893404288343,7.962811934434493,1.1666666317151098,6.480142083210807,2.9665017437918806,6.127354315586602,0.37405643465477034,13.77518138909728,9.061664414302424,9.041174496604514,12.766815963152819,19.183716998582465,18.555689442153135,9.851321263813038,6.495119233558788,19.801198944328355,17.171598700922214,15.514100135332821,16.677215520269115,19.25702645902579,0.11962746656872358,8.00882440005898,16.455046979379823,14.57152640797705,6.935721675341728,5.0650263412649865,3.23789390701255,19.747197616355447,15.107303342535365,2.1742500996380176,2.272672997546006,16.311655424380906,1.0355220737530058,8.528779825127849,19.650910799466928,1.6305808278012224,18.679556244990753,8.548296629970977,13.061001149487005,1.9216423152229423,9.598778237351846,9.862890126228447,2.860047741224183,5.367527919196857,17.037067917506636,7.7674293411040685,18.60583600858738,5.83910601890099,12.501965308776786,15.503604953050996,11.80827051194742,9.93449490266233,12.699796813337949,18.018705345791265,18.54414508413837,15.0041515756952,4.138184108330876,8.332679023360953,1.7493893096818702,12.834399949136301,16.82575269669671,15.152726450975491,14.014836056206219,3.5932057118562044,2.8798850101942763,16.55406677716527]}
},{}],95:[function(require,module,exports){
module.exports={"expected":[8.773359758240047e-5,3.7502150723055014e-11,0.0,0.0,0.025746342032720724,0.0,0.0,0.02130062564949993,0.0,3.383044962699688e-13,1.1280995096912222e-19,4.167892818030401e-73,1.9109854275540264e-172,0.0727126136486496,6.486460942272988e-13,7.30594645954975e-5,4.3721636095456266e-12,1.5455247920786878e-59,0.05072130469424043,0.0004258527845990539,1.979122299075779e-96,0.0,0.0,5.2173142210278696e-135,3.199303633868604e-6,1.2579884472441651e-5,0.0,8.653564462810168e-29,0.0,7.10789572867983e-5,0.0,0.00436167440434546,0.0,0.00016660865182242096,5.823445009946208e-6,0.09788709563369302,0.0,0.0,0.0001948448528496155,2.1800245565975545e-5,2.5218697406585e-13,4.174568432817981e-8,3.275567232682081e-52,0.0,3.99696119731624e-25,0.0004682769947886571,0.0,0.0,0.0,0.0,0.0022064603821327455,0.007483662021589875,0.016607174842457013,0.0,0.0,0.01924659968200161,6.961152908845057e-18,4.008770873831563e-47,3.003025714323769e-20,0.0,4.509242278698718e-5,3.1257005431023554e-77,0.0,0.0,1.5049370366189567e-5,0.0,1.559941147803216e-11,8.486646962107345e-235,0.0,0.0060012534386089935,0.0,0.015571337223327342,2.533107243454775e-12,3.7509792727187966e-5,0.00011189282525590976,0.0002691763814824048,0.02049730868128565,0.035877815503958334,4.076031409573342e-13,2.2596352926565494e-26,0.0,0.0,5.737160330160097e-9,0.0,0.0,0.0,1.678591570171974e-198,4.0110264789720393e-178,0.0,0.028666246203231712,9.61906198083052e-35,1.4557943431366174e-113,0.007780319810159921,0.025496227236300517,0.002002104153344105,0.0,3.9394381611326894e-28,4.7110638751739043e-32,1.906636738148264e-36,3.3074020404610477e-6,0.0,0.0,1.885132056444479e-34,5.447716921261316e-168,8.338435355825697e-8,0.0010612523466028488,1.0851576640504288e-14,8.177942013613222e-32,4.1934481645703036e-72,0.0,4.858402684649886e-38,0.0,5.648458048347142e-9,0.0,0.0,1.066131399632371e-21,0.023554895498986074,0.0,1.5684980142594127e-18,6.755908429912667e-24,0.00022473404816411512,6.311137591868032e-69,1.2123289031612331e-5,1.6316474600736662e-75,8.183707108722271e-68,0.0,0.017993185247153227,4.008230140244999e-11,0.0,0.01169355767145019,0.0,0.0,2.905178536841885e-26,0.0,0.0,0.05966598750797146,1.7123502251656234e-99,6.95328504464014e-38,0.014036656027415662,4.702679961422244e-5,1.1016308417814483e-38,0.0,8.051763169674886e-10,0.0,0.0,0.0011747488190460317,0.04410053235409664,0.0,6.3349208632257685e-34,5.279973202381968e-5,0.0,0.0030192827517514943,8.276259455327148e-208,0.027708752939662858,7.321514116029319e-144,9.868838704439799e-12,9.020541624884082e-68,0.0,0.02093740388543528,0.0,0.0011246035637549712,0.0,5.031473229939025e-24,3.4061689150257447e-10,0.011686056942145357,1.5585595297635766e-26,0.026334083990656672,0.00025372895924988964,7.225146099530895e-79,5.580485879567664e-7,0.0,0.006418885631517533,3.9171002332010074e-9,0.0,1.314686772785008e-12,0.0,0.054131892895968356,2.8085346325717148e-6,0.0,6.402442883013859e-5,2.8070938939811225e-6,3.14775841181104e-14,0.003174606571491988,2.4849845323323042e-26,3.500674549916271e-14,4.525216706264958e-90,0.0,0.0636737863123541,0.0,4.8675008989272186e-54,2.2419543145072486e-8,1.4005221190528314e-9,0.0,1.9104730266756027e-13,4.808751236242896e-152,4.8114672500350065e-5,4.91834528692276e-27,3.431244953561879e-22,0.0001562233465069714,0.027437965193113825,6.995597938461221e-58,2.450109076237609e-17,0.0,0.0,0.00035461548680628963,0.0,0.02508158545369061,2.935474827211975e-234,2.6655329044156845e-140,0.0,0.0,0.0,5.257601824447e-8,5.079949501379458e-7,2.6729585652240914e-24,0.004566106837874507,2.3660209638665884e-5,1.952569259953752e-67,8.09423667891716e-5,3.667335242542895e-16,1.6967649642099384e-9,0.0,1.8161560650637717e-105,0.0,0.0,0.18134199471951254,1.1803550985140563e-5,1.0739002521118833e-10,1.5631883852496175e-46,0.0,0.008891177116232383,4.0774915326905956e-26,1.5697762161822852e-49,0.0,0.17763820590130291,4.109168541132626e-96,6.0329965369551535e-5,4.50080706344469e-34,0.0,0.0,0.0,7.389402341217181e-8,2.8699453922687065e-34,0.0,0.0,4.3853001235728155e-10,0.0,1.4953139203568464e-5,0.0,3.604645284853673e-12,5.2575745855928086e-42,0.039267091764907086,6.686917041376041e-5,0.0003283922939058778,0.0,0.0,0.022984776594671293,4.462569168780516e-102,0.011101718728282821,6.510634336484325e-15,0.0,1.2164536556339866e-10,1.156775202475383e-8,0.0,0.0,0.0,2.6563192883197926e-41,0.0009890690317559422,1.336369692906243e-5,3.2951621323812316e-8,0.0,0.0,2.622151916585235e-17,4.185530672889599e-7,5.1824325447380454e-5,0.00016257801097929405,0.0,8.179972587121683e-10,0.05978224246857594,0.0,0.0,0.042930059895321525,1.869586285261884e-14,0.0,2.5147919852899764e-5,0.0,8.389480389181593e-6,2.0760534342560973e-5,6.395052479619959e-7,0.03774719373754224,0.0,5.6687464681234594e-11,2.170710041584933e-8,2.4694289030049447e-18,1.4425467669346233e-35,2.1613404362601892e-128,0.0003124452428928587,1.7344366527735083e-53,7.958112101148161e-55,0.0,6.9857658676473544e-133,0.0,1.7278650996784587e-14,4.3492024578645996e-26,3.6865487949540794e-7,1.9843682792723237e-92,2.9935218061262845e-7,0.08268917850667594,2.8383096672964014e-6,1.7609072680278024e-9,7.984816170378849e-41,0.008687372579200216,2.4196287825932277e-122,1.3946896715192732e-39,1.5624017911485905e-27,7.435895014374794e-14,0.0,1.492548788439124e-15,0.00040238934376479155,0.005333581034896905,0.0,1.152478857700526e-8,0.0,2.3958938202921347e-6,5.6537136899338116e-5,4.495056425067131e-281,2.4544547148527606e-77,0.0,0.016423437147804285,6.575753430624228e-113,9.561137978782685e-9,0.0265905194893674,0.0,0.0,0.0,7.312923534037994e-17,5.587365571569493e-9,9.451789219103213e-9,0.0,0.0,0.0,2.9407876018207355e-34,4.368383310053359e-105,0.0,4.4251153739668264e-85,8.582721057368971e-6,3.016665484859732e-157,2.7774010611697478e-182,0.0005303357883444705,0.02453456648568109,9.244431183588288e-6,0.0,0.00032208654932785324,0.0,0.0,0.0,0.0,9.836665496632274e-130,1.58166505211476e-14,6.5299522497870585e-111,1.0864339828617915e-35,7.049346073104991e-253,2.028509230529477e-18,0.0,1.6819950484235783e-239,8.585656720175156e-36,8.862853523388906e-35,5.2643388729629036e-20,2.319739396948552e-31,1.533588735553264e-53,0.0,0.0021203977877679837,0.00012210631818118008,2.1054144229928163e-22,1.6327697895730466e-9,1.2596221704199207e-293,2.6743287624290667e-7,3.1393074286716803e-7,0.0,0.0,0.004542295975244463,0.0,5.099231469071619e-7,1.2142664703543867e-23,4.355263788698677e-16,8.617079632324881e-91,1.5179894514896454e-18,0.005311913097479392,8.184647697406275e-18,0.0,8.591063766013538e-10,0.0,4.168588871869835e-25,0.0,6.423758819528022e-7,7.75696936797834e-68,0.0,0.0,5.188506035352952e-5,0.0,9.68427169933853e-6,0.0,2.589553296126181e-270,0.0,0.0,0.0,1.092939335782278e-21,0.08252095941892296,1.634624021470329e-5,0.0,6.760173624176675e-23,0.0,3.2656255794736375e-13,5.809195078451205e-56,1.5747999296067347e-69,0.00016710538040861956,0.002673159283501807,0.05208668744522451,0.018313716109752222,8.754813191962138e-53,3.077013213470107e-14,0.0,1.10973267926572e-13,0.0,7.431708829900436e-24,0.0,2.541849202050623e-6,0.0,0.0,1.5867230859574436e-7,0.0009332804588892883,0.09661594205694224,0.0,0.0003907808732666339,0.0,2.8728072235101403e-6,1.0291812690507916e-7,1.4894396303209957e-6,1.2372015650534606e-8,0.0035226139756148285,0.0033349298393300524,3.2433908514760877e-16,0.0,0.07819959711573088,4.30110671957282e-57,0.04332668687229107,0.0,0.0,0.0,0.0,0.003868695813075308,0.00015652111057699254,4.533075905044973e-85,0.001118376739582149,0.0,0.0,2.5806890823345698e-9,0.011138855021313444,0.0,1.1247445203570554e-6,0.029206347559190687,0.0,0.0,0.029886662019087427,0.0001383111030848112,0.0,1.2435582089794552e-68,0.0,3.710952339576966e-22,0.0,4.2866141345326485e-14,3.0678457983311186e-150,2.9954155986385287e-15,1.276024003909604e-13,1.4905798290845584e-6,0.0,0.0,0.031027912322449662,3.931258137645538e-9,5.049104506117381e-53,0.06759354785397359,0.02714100793015931,0.0,2.687779208339344e-13,0.0,0.009429567072548838,0.0,0.0,5.241075315005736e-22,0.011960076444974698,0.0,1.4261332905809037e-6,1.2981907329919606e-291,0.0,2.166923729266154e-26,0.0,3.372755026357698e-32,4.098528674878926e-227,0.0,0.05424688598097501,1.8705568465442787e-37,4.641959718676744e-227,4.128080272540291e-38,2.1850229450008513e-26,0.0,1.3940562587085316e-166,3.59185199380068e-18,1.0134655148963608e-5,0.0001061965051454292,0.0,0.008034006350381201,1.5634431844192032e-62,0.0006236565243925782,1.2732739216890157e-9,0.03723898988234589,1.7079273565223306e-28,1.7407657518995397e-30,0.0,0.0,0.0,1.0207759827077315e-189,3.2160565349782757e-18,0.0011905820678228503,2.159828411563095e-12,2.101884643620947e-5,3.5911353302551185e-6,5.684311177869698e-22,8.089946100629328e-24,0.059261333349119226,6.639004513164092e-8,1.6096614484817044e-5,1.0519275316390799e-19,0.0,0.00011418859440108796,2.4690334228377595e-87,3.5604479681458207e-6,0.10134180145072026,1.1996258493536487e-6,3.4411930962620404e-133,0.0,0.0,4.569748845733725e-9,0.0,0.0,0.0,0.0,1.5887683425701662e-56,0.00011104299799394986,0.0,6.385344399556404e-5,0.0028612034343068874,2.674547891770596e-69,0.0,2.328441991882732e-122,1.7472165658838235e-5,1.207658931676711e-19,8.373047539323414e-9,0.04095455069148772,0.0,9.43731724959206e-6,0.00042761359739466344,0.06399689792510482,0.05021551493076981,0.0,0.03488205960510141,1.2793635425298037e-17,6.992332993491294e-10,6.050945850306649e-202,7.242844148895444e-43,0.0,0.0,0.0,9.311312446980003e-22,0.00025759403335287194,0.0,0.009199118759055958,3.781162309223725e-11,0.0,0.002777659105394738,3.371078839482976e-7,0.0,0.0,7.496063458642497e-20,1.1086074926585258e-5,0.004105472049221654,0.0,0.0,0.0,0.0,1.7000582857736475e-151,0.0,2.615088445013015e-7,0.0,1.1329440283092185e-5,3.620760260492715e-45,8.226194991614237e-46,1.840066998347108e-72,0.0013808871224540791,1.4297815272744144e-24,8.037745551459314e-19,0.0,0.0,3.449043270358414e-6,6.195622810017369e-60,0.01597771537916252,8.952402285297377e-30,0.0014897346206045434,7.136133440182037e-5,3.3876185995528928e-12,0.00023252387246931153,2.254952198167096e-11,0.0,3.7283503798736394e-5,2.0746994063205226e-276,0.007619755735557289,0.0,0.0,6.104609427125418e-104,0.0011837561029460686,4.394758045382534e-8,4.5340949410854406e-9,0.0,2.9367823626784476e-59,6.27008503904695e-17,7.314225348948848e-16,0.0,0.09944174762298749,0.03244066695491778,0.0,9.186451170391604e-38,5.417493304987358e-22,2.8835381930256013e-10,0.06390975472628692,0.0,1.3301516583810178e-26,3.071408200082751e-9,7.595881923957455e-36,0.0,1.3307395949208476e-278,2.80379344182188e-25,9.803119820031931e-17,0.0,1.5375355460377564e-71,0.0007524593685112425,6.14752790044708e-8,0.05321294230556204,0.018702820136752576,3.1534401076009325e-172,0.00014690533733084733,0.0,0.00021198068817284202,0.0026081143912932278,0.00010372747495420217,0.05059184855182913,0.07357244632034282,7.17971401580836e-8,4.059040793007099e-17,9.543505373005446e-7,1.4783188308259305e-8,0.0,0.0,1.8315036478622517e-11,5.420151763550277e-19,0.0,0.0,1.1238786507299413e-24,7.755854627740507e-36,6.400773107658837e-14,4.60780340919031e-6,0.0080384351742558,1.8489993475720606e-9,0.0,3.477862810667412e-161,7.188774654711858e-19,0.00014427467851022195,0.0,0.0,0.035432062951265816,0.04083302373124086,0.00012349931494788058,0.0,1.5447832933832798e-21,3.0783444183517345e-6,2.3164337242566266e-43,0.0,1.3659669790318895e-10,4.958232446100416e-42,0.0,0.028503072058969715,0.00456050665630563,2.720460838028509e-35,3.466259570071388e-5,2.2168127678132403e-21,0.0,1.1060308978704214e-19,0.0,0.03910500507281904,0.000845640241977248,0.0,3.118890486608714e-5,0.0,7.696685434328128e-25,1.1324459615215075e-30,5.858853432705036e-19,2.3548759553378796e-142,0.0,5.007383816215888e-31,0.02572878378646825,0.0,2.5062052991054163e-288,0.0,3.220233434892702e-13,1.353969693733734e-33,0.0,0.0,0.0003234572802990606,0.0,0.0006983562317658082,0.0,1.5654255234446783e-6,0.02693325490637308,1.0152072531912226e-13,6.475177533312254e-97,0.0010131359591250906,1.4379384871521058e-124,0.0,0.0,0.0,0.024842638882875117,0.0,2.507004022272223e-10,1.331980944628633e-44,0.0,0.00018116790298285888,6.133391360702588e-7,0.0,0.026371167510338304,0.0,5.190431221760973e-7,2.0621699577345503e-14,0.0,4.536431183562029e-5,0.06435316573797407,1.1289660147009404e-17,1.7035052527568635e-8,0.00022634443278059656,4.8548663682399375e-31,1.1083866063515947e-14,0.033769626326729196,0.0,0.0,0.0,2.9940729931333083e-13,0.0,3.2019178692713844e-5,0.03318694439269557,2.73990007444658e-155,1.4972453947125118e-18,9.072649962777979e-55,0.0,0.002550435474439124,0.0,0.0,0.0,0.0,0.0013182793103817658,2.5560939455853466e-34,0.0,0.0,0.0,0.0,0.0948056346322414,0.018590484586734138,0.00031340071286354806,1.823624559266e-312,0.0,0.05004129729700463,0.0,0.0015665369466583586,1.1913059160620028e-8,0.0,0.0,2.5382938661072114e-48,0.0,3.3974044061613603e-96,0.0,0.0,0.0,3.495650557452994e-13,1.4028811302366035e-29,0.0,0.0,2.0916142322102314e-31,0.00021823186973175888,0.0,0.000397350245054065,3.4653652523652734e-5,0.0003597954557351789,0.015852485011765952,0.0025958451516722787,1.8807480204735523e-12,0.0005212886987225491,0.0,2.026109980039758e-6,0.038703268383421315,0.00036520280247361665,0.0,2.364101842041357e-14,0.0,3.763815363622656e-30,0.0003675466499840816,0.0,0.0,0.0,7.544533777429511e-16,3.668331085290047e-15,1.1735851314644574e-5,9.21861787852704e-25,0.0038214916777278697,3.3724903408193444e-197,0.0,1.4625181162794875e-55,7.274962481263174e-10,2.879802900112646e-78,0.024796592553557702,0.01286112580991956,2.1155346441740128e-34,0.0,0.022442356511179797,0.0,0.0,0.0,0.0,0.0,0.0,1.0515675036246704e-7,0.0,3.828460323454404e-5,0.0,6.558021564900605e-23,4.179822978663081e-8,0.0019280685651595522,0.0,0.0,8.308771382879412e-24,0.06676041136462128,2.449972039113506e-95,4.6017341709211563e-10,0.0,0.0,0.05766221384369528,1.326255887065691e-5,1.2061513964533045e-40,7.828323166527877e-21,3.4892976518717467e-209,0.0,0.06475279484352744,4.9209744588108726e-6,0.0,0.0,8.095354629748526e-9,0.0003397584171733762,1.0167167974464099e-16,4.062209165261525e-27,0.0,1.0763925191536973e-12,1.6049256646813501e-22,0.0,0.006237138333803152,0.02840977638314509,4.032988874668027e-12,0.0,1.9666001602731598e-22,0.0,0.0,0.0,0.0,9.117085165001315e-7,1.4948648382261044e-12,0.0,2.8003078893475514e-163,0.0,7.915356983306385e-22,0.0,0.0,0.002465089149043545,0.09250653772985457,0.0,0.0,1.2379187981084104e-12,0.0,1.186618334671073e-17,2.867435774289112e-75,0.0,2.00417007736515e-10,8.825333963664074e-28,1.0684377321836982e-9,0.0,0.0004336499420161858,0.0,0.006801364144453778,0.0,3.912469094010888e-13,8.496828121632382e-8,6.466391092338244e-67,8.401689249416235e-15,0.00044488070058954095,5.1479226670150206e-14,0.0,0.0,0.0003867652672702648,0.0,9.705204110924947e-145,2.7724608231443505e-72,1.567707962786197e-17,0.032268012197608435,0.00010783833529620862,0.0,0.0,3.5863784643790396e-17,2.04764900738795e-25,4.619089720793405e-25,1.5392940578673445e-32,0.004404401719004719,6.7372506454433416e-6,7.337688729550428e-9,0.0,0.0,0.11440908062541441,0.0,0.0,0.0,2.3730953162357864e-24,6.208807939959597e-5,0.0,2.7022959747735434e-7,0.000878082524142064,5.764582408463764e-18,0.0,0.0,0.0018905133748648797,1.0913945093879798e-8,2.440414716894015e-11,0.0,3.071265917142526e-11,6.504485178175452e-221,0.0,0.00012194764334259849,0.0,0.022784920217825803,0.0022043150955751685,0.0,7.577834601271298e-18,0.0,0.0,8.32502545399904e-12,1.0858215687911088e-39,0.0,3.7461073276352094e-10,0.04560095727573008,0.0057623138046689094,9.544628517139743e-19,0.0,3.2935411414264283e-44,0.0,0.0,0.0,0.034636387039417925,0.0,0.0,1.2455536851727104e-5,0.0,0.6183960327118697,0.0,0.0,0.0026127924999410847,5.9770837797726936e-6,6.174849854259577e-9,1.2551577305056904e-6,3.489987892724408e-5,0.0,3.623618489343627e-51,3.8488261628502014e-109,0.009798151234810383,0.05310102666117997,4.454939369167892e-117,1.5258238307404592e-41,0.0,0.0,8.006424456246757e-42,0.004446626400102628,0.029100522077159276,0.0,0.0,6.636277990603803e-17,0.08550478775700186,0.0,0.0,0.04643855616805488,0.0],"x":[-11.906869424584354,-11.808099649698029,-15.46785660447953,-17.65384899602628,-14.197438131125397,-14.877941522544543,-19.57131014042921,-14.617135997996069,-12.848669912281727,-13.923840050786938,-19.033929880981212,-18.79531005542696,-19.52797403911091,-10.190390672872509,-13.047259339221897,-12.055006387503454,-14.820752271949429,-12.35180092643933,-12.545752326034005,-11.258828234331792,-13.02011056034225,-19.425237321212364,-15.321059722049746,-16.70847428534396,-14.386543364215772,-16.071247524158224,-18.68935517139262,-18.90054739574755,-18.108911570036422,-11.716806846188561,-18.840823517428035,-11.538651348322224,-17.797428474125535,-10.50411753296583,-17.759163244204057,-10.077600737266899,-17.688561299046615,-18.972839586527638,-13.071715644560085,-16.211253052199268,-17.636877216045384,-15.541072474704007,-17.46267543677228,-14.041602259237232,-18.426178706536955,-10.164838345742321,-16.944609632675053,-15.951532356302458,-17.054890841104775,-17.92086872615816,-11.79078996099938,-13.659204797538639,-13.178623949583212,-14.186410074786725,-17.8992389394856,-16.28447435173183,-15.79201899786137,-18.92729373280248,-16.610233256339406,-14.468576059148056,-18.732773623897938,-15.088436160438121,-18.950223991416188,-16.38607767710557,-13.217918311837654,-19.41130698278147,-19.49214595420958,-12.777592959500703,-15.401818811190358,-11.494014667194483,-18.51803228710921,-12.043270442586048,-12.983517854268241,-13.824681443847355,-18.14503471749487,-10.603484257718002,-13.421659936430363,-12.371203422190206,-10.253181849156247,-12.79819057734683,-16.252503856965046,-10.423065322058951,-16.569347173483052,-17.28879080549726,-18.518621864861483,-15.933276253814588,-16.441852335206885,-18.41954997134333,-12.348656693184775,-15.00966227518527,-14.536096337913417,-18.138667511781755,-17.34887711923534,-10.739463928262381,-17.454576295810295,-11.721725621677408,-19.579113349952998,-17.019117805230017,-17.60307792805563,-14.572120180353075,-12.015805406211504,-19.22477455513487,-14.676077644412297,-14.009275706077469,-11.754846076735138,-11.55908458715073,-11.867875145202792,-12.119157498347356,-12.258243363495126,-13.275187847719202,-16.852903949061727,-14.445718431597893,-15.077916764546327,-18.87183327352114,-15.31114877075964,-12.413310984769407,-10.302493505023405,-16.117952682544882,-11.051447796464078,-17.30922160109388,-15.703934812004652,-14.39129874033692,-18.76742918712356,-15.35763542723034,-17.33592362981003,-10.251950292759322,-12.741148835677283,-17.048274273257977,-18.07783780400086,-12.353129971631942,-19.372129068197978,-19.15135803848142,-16.403966781816457,-12.303213245800531,-18.48099842953332,-12.669742074300927,-12.094893516615052,-19.76421565247548,-12.373947925293551,-13.205693756454679,-18.733550299832494,-13.46797261339246,-18.87813297578903,-12.279195953682043,-19.067218785024764,-15.09392571621376,-10.239003683426118,-17.4075217791554,-19.98084449982259,-15.704288264059729,-18.306360994844745,-13.741044784071093,-14.86452532067853,-10.078319028803524,-13.064338946998975,-16.87531098297685,-19.130050215462,-18.416548054070184,-15.311216371276096,-19.271057518979756,-16.488032985893856,-19.070259461394233,-11.528223331063556,-12.808411400551478,-13.08577135159776,-18.270956275962902,-13.577149990588595,-13.824484914645627,-14.85342792773885,-10.154107643719264,-12.804604444931893,-14.25175831677069,-10.21213892475516,-19.51096702778313,-17.23002748857118,-12.87093370128919,-10.928467278959397,-16.85360027218572,-13.102022127333644,-13.195939957218012,-11.377712518271059,-16.674531443347146,-12.97635114966615,-19.23115857737054,-14.465144497520539,-18.878407842071205,-16.410147903646724,-11.847006766925558,-11.913827959864946,-15.584978630917538,-13.066760520697127,-17.020472078786128,-19.34625131573277,-14.060210532046565,-18.59959173498067,-17.303236566081395,-19.573022890567835,-17.091573625127793,-11.61510687544385,-12.517694908180736,-16.1880026089362,-16.52964348332818,-19.5814209803681,-15.30845430142289,-15.22387219531214,-19.999647093304482,-13.848738212535991,-15.175596169813225,-15.99914970265531,-13.731670250744854,-13.939406149589455,-19.344986784766355,-19.41929102833502,-18.500107773849205,-16.30285843484305,-14.371440962897456,-13.56138351569829,-11.333516499188722,-10.348688270662374,-17.427807548465402,-16.573112840670753,-16.0501743062505,-11.98575553430588,-10.88334558975512,-15.25155966221301,-10.043173322029146,-10.588724989651237,-15.056860757588606,-15.777143320270625,-19.816432933682226,-14.276787799397345,-15.494662323149068,-15.081729417154229,-13.710040960409497,-10.444876596371834,-19.66181075361304,-10.375548884894833,-18.675991389593737,-18.58961436309752,-15.58598050110634,-11.091787683615264,-10.244962525184892,-13.135888360453817,-16.300349879432694,-11.610527012371163,-16.388886221062172,-16.491464234592023,-12.705072064552498,-14.239961815495377,-17.19942307404357,-19.235062345046934,-13.07705542086647,-17.428691958220494,-15.056524724707945,-19.44279264084369,-17.379452476819043,-14.36010152240412,-16.531331108347068,-12.286258190449608,-18.908286904236412,-13.823248294555935,-17.423329119157863,-11.689009390428085,-16.869371769631524,-17.735155218030588,-19.50763680335121,-12.960051200188737,-12.334573558397752,-19.24146825116861,-18.474369093424375,-18.173724558768736,-13.744468012290882,-19.193513495280047,-12.533025407220002,-17.921176506571758,-16.266805505704724,-10.72544690243646,-19.627328548373207,-12.61751019294297,-16.26869839787827,-10.285175844922144,-13.887877351632676,-17.35354210025046,-19.03377019888112,-17.179161163345437,-13.471547612186397,-10.993663192235143,-16.65789603498568,-13.030789733116476,-13.415636682252076,-18.938772824624664,-13.037142133253672,-19.101639777251755,-17.359067972726706,-16.52792187471412,-18.640689504634253,-15.382976262294374,-18.695589357105366,-17.913373715399466,-19.08638006250978,-15.23623690288339,-11.147385350002368,-12.347752178537512,-15.562596553596595,-16.99168710241931,-19.25927281699955,-15.891323724393677,-10.160422083650442,-14.663057848750814,-13.865060322509065,-16.868219380950325,-10.23840130733326,-16.312496148144003,-13.123891774099324,-19.375582597773217,-16.94605809726759,-18.555041727705458,-18.09491020030724,-12.381890182022184,-15.874142613277414,-15.274000945932896,-17.57669783498642,-15.288785485309031,-12.146136983782437,-10.06581748453496,-13.678494724280634,-18.394471775305597,-17.291339518210712,-13.966712236973795,-16.809048460579387,-16.72278859481358,-10.865217270710453,-13.105644744413878,-10.098493431261177,-17.88765769274675,-15.549790499793456,-18.44929734055046,-13.288736569150988,-13.13598072476455,-16.15105327812336,-17.642674598160472,-17.92580943846104,-17.219095263956735,-15.560779178647747,-17.55459161407414,-18.99615178460221,-19.56159750890537,-18.10979435621594,-13.239928798364557,-14.80537489717377,-18.56670318634002,-19.68080184571199,-13.400286986126059,-16.169226685288915,-13.126589982987916,-18.62350220179876,-19.200190031435643,-17.6683919069508,-10.037589926137365,-19.134705317296234,-17.320316006075718,-17.7200783004521,-15.961603663934723,-11.41145412223473,-19.93896400105256,-13.10932835737179,-17.390244177304048,-13.576236573612038,-16.569218359346745,-17.206602272489082,-18.44644969582737,-13.40859062438258,-12.667785239635847,-17.82489015950708,-15.194612111378103,-17.89721994021982,-13.137380241980171,-17.051291260670247,-11.489378455602282,-19.538260279325417,-15.167769510788405,-13.811112129177994,-11.439082514086213,-16.88486875019674,-16.226129177462255,-19.576576844576074,-13.485668700441373,-16.227111635711854,-16.694780394809875,-10.157850777744375,-15.998295398782608,-17.427111403804847,-16.25447649666071,-13.769642785695613,-13.390370217824675,-18.98848502264368,-15.222144753460947,-17.145136633513772,-12.377529423854517,-18.535873045527467,-16.9219092801396,-17.122570582758307,-17.694423798278724,-17.804415139835996,-12.792150151360321,-13.964873566386407,-17.191991946237867,-11.180663545955024,-12.864238916182682,-14.29916642700094,-15.299056956045616,-16.07938975821768,-17.417957520254912,-14.020355144125938,-19.431448259285734,-12.031715985754632,-15.030996806652793,-12.827687059836146,-10.008531376870607,-13.231626881629753,-11.58729485484675,-11.552150056729769,-14.477061705525358,-13.050646290387798,-16.63078017164342,-16.637827808634515,-12.072779000222642,-14.87745141941648,-12.287042908388987,-11.004560593042916,-19.624111246100856,-11.414310552092935,-17.940381780318827,-18.320369340468268,-15.266866160068776,-11.631726016887363,-14.844911248691732,-11.91975568784444,-16.44987001962662,-12.057666013753677,-18.52030282677432,-16.987877785952158,-18.686676573975713,-10.79819089980168,-16.111019722133086,-12.011417077727266,-15.934077991835935,-15.457763400123081,-17.345698019997975,-14.087618693418298,-10.50863794056724,-11.144109055860337,-16.1693968023399,-12.647378494367631,-14.024949259796395,-18.79757829108186,-17.376459577520503,-11.237826430239561,-18.981995180093797,-17.99812554439584,-11.742631066012624,-14.8963393383589,-15.498618878735863,-11.683089408681388,-12.034358057071781,-16.68027014520787,-17.699095091998114,-14.732857733518152,-18.42218511024357,-17.228678336399767,-14.949575526686733,-16.057912415937473,-19.482174655172884,-17.618384248450294,-13.206600986429285,-15.307679575067997,-10.782703725281262,-14.591927178632556,-16.92898024509947,-15.393068537496346,-12.67712920784315,-10.409398500803723,-17.322339942229217,-19.3710703493021,-18.61905713162564,-14.306191794426049,-11.732956034324367,-15.180200725620058,-16.79161709859185,-13.687226375595685,-16.681631900911523,-14.800088671832292,-16.964854677470328,-15.346158181195083,-13.433504680109182,-15.602252334381884,-18.62112154992344,-12.308661742872149,-18.573651754310255,-13.365476841575594,-19.28851122063069,-17.92128400718599,-18.250895460570614,-11.737625010559158,-12.402518549556627,-14.61833193778951,-13.11009813213396,-14.284109457086346,-18.04484527730191,-19.226379414202405,-10.86763650253153,-19.741926476091013,-10.147016562729467,-16.31918165749087,-13.286034890387455,-16.383018393701775,-17.94724889654851,-17.957829407961153,-19.19602817537681,-18.165880681399006,-19.134069193274716,-13.832511795881071,-17.27707996423928,-17.559061859287702,-17.82661676789018,-18.67602253777044,-12.773237518265024,-12.737967497946908,-11.199755153869246,-14.58295662159311,-14.41046750816218,-15.632324423912438,-19.60724922068898,-14.059101083084,-19.348196699983664,-18.930823087235616,-10.277569189113244,-12.416757016393218,-14.470780115118886,-14.709989633962552,-10.523456932686903,-11.522790719740357,-19.70289500271705,-10.129083735900847,-11.422616189668577,-17.950641008024903,-16.550569090381,-13.858501240822305,-16.668536853676038,-13.735519355880605,-17.909740213811837,-16.910120598077413,-19.490109130855288,-16.963635488170492,-12.32557496971009,-18.2243499056318,-14.820148190086627,-12.912816456308233,-16.73702691117175,-18.226907688670767,-10.339468558603473,-11.142905957049674,-10.81019279441743,-19.515698368459503,-14.78005316342908,-17.377665741476264,-16.34359779445186,-14.84549665458928,-17.298640097570107,-12.849266033204504,-16.770217421362283,-14.66400384097618,-17.002983355900422,-10.44317242219249,-17.308386120122524,-10.088591552846616,-14.533688744171965,-19.162338945845768,-10.430111111418356,-15.670884923364683,-18.263978709442313,-15.592156672550367,-15.224030229385816,-12.502564570210566,-10.219819108527746,-19.630497399141973,-19.374066303763293,-12.530450660330096,-18.683937326193842,-17.320662034634005,-17.436677465630446,-13.050281226189526,-13.263424979561089,-18.101505105152526,-15.06303538460533,-19.71580317524721,-15.801856811186234,-10.586133164315857,-17.842971801987613,-16.370304028827803,-16.0047315342658,-17.020984170226917,-11.999143787601236,-13.578541149180063,-11.547054231188149,-16.329378546235937,-15.98725883760797,-10.546097781748196,-11.752177591389119,-16.222152071383974,-19.144064359286297,-18.930489088370084,-19.120338719111498,-18.220430907583033,-11.104886814954458,-18.717121225774022,-19.033746975395896,-19.764654434860187,-14.090004140013173,-16.00977786699972,-19.648207854271007,-17.36524871723433,-13.354136701936746,-18.935762406133506,-18.799091532913195,-18.902815505950155,-11.182678594468541,-14.35329719031934,-14.697285009955225,-14.885418357441793,-18.712177066522813,-14.720435334764016,-12.120876992725641,-14.625500861742275,-15.54309615436281,-13.804647122768055,-17.458137747503905,-19.149387790022637,-14.356029191675892,-16.38366836569482,-17.98054484442783,-11.483943541281445,-19.016838969215474,-10.12987468471227,-17.435062239932414,-12.347887670418586,-14.042955417134486,-12.076629093378735,-11.039093425008637,-17.150728935472983,-11.871062732028282,-14.194000070311008,-12.27194892202429,-11.828505061075072,-11.856561631596081,-15.527113513039337,-15.435232088440621,-14.964498241626949,-11.766117040578557,-10.61999333488578,-18.75989041318504,-17.096034889596496,-18.798970492705724,-19.501040162338057,-16.151673527767972,-12.564197483412906,-19.159908160003564,-15.13827947800661,-18.118180073517625,-15.42012238665823,-14.58163140082691,-18.43597674942317,-17.93719967229379,-16.161638103397166,-16.321447736881417,-16.74997194004556,-18.106373488276695,-10.42528631290375,-12.509125252179903,-19.541015950201,-11.701328711968253,-18.635352033458148,-17.559587084226973,-15.039406696861889,-18.350614619746963,-19.889819742202548,-13.587390439482068,-15.07954159883357,-11.69890840134262,-12.417282231247553,-14.128098506553721,-12.553748708997022,-13.409921437059598,-19.128913736083142,-15.219922544867497,-18.402460438331392,-13.852801341331219,-13.117795723949115,-16.188042684461713,-14.987924642236031,-10.736272135708486,-18.376279128626678,-17.275778922399788,-10.81580646074828,-12.846808652765231,-19.972948714604893,-16.71707885772937,-11.204260641256258,-14.585956285363718,-16.02969025119197,-17.326607801264856,-10.906195238404557,-19.43653466701496,-15.467605606109935,-18.746537788983318,-14.017895688828588,-13.000539797907589,-13.865704161649443,-18.792991703976337,-14.758807348462422,-13.327674805114928,-18.314789751153356,-12.309327250937708,-13.065516659789633,-18.85336868417584,-19.049868319481508,-15.706983190881576,-16.304638894498893,-12.14731013726917,-14.341280569102699,-11.493204032598634,-17.670495996285105,-18.468929115739925,-13.17479136169181,-12.81725982428286,-13.625865394438312,-10.961661304147412,-18.175562675545944,-18.018819669798553,-16.068202052011287,-14.559723229260042,-19.549399013364557,-11.641239489341832,-18.208554303050967,-11.263969988952446,-12.053160545688533,-15.344429805914714,-19.964326141360672,-10.681193961130797,-10.144814444142396,-14.261064076021006,-10.027804895802193,-18.34886390867421,-18.709029278897923,-19.3273959836258,-10.18647450857016,-15.436366970085908,-13.405923970263078,-10.353351232475624,-15.10925535709131,-11.639565520008986,-17.03225204927596,-11.312321873230617,-16.325338413583662,-16.532714215522955,-12.82290780793532,-17.901610833714848,-17.527833006946796,-14.074421433092816,-17.6674102338937,-16.394473981241894,-10.05705843410776,-10.295100249563847,-15.312316750508888,-19.227026656167503,-16.98340692051141,-11.481280617853804,-12.553218552654348,-14.234473640110785,-17.777816010045278,-19.176272228777613,-16.286317015494507,-17.78652550699659,-18.417556373938645,-17.813437630419138,-13.011289997235629,-11.946536214667665,-18.75301173839071,-16.692803596228746,-15.704612102718636,-15.090052630207857,-18.166776682808653,-14.228044252465983,-17.91374842167874,-18.415747492207228,-11.226057569692989,-11.540442265729025,-13.933551099667895,-12.060230138539197,-14.155461963762153,-14.777660579193448,-11.127797439432003,-15.040919527063108,-14.764980633500006,-12.892002903787263,-13.500397928566375,-15.584512334624065,-13.69038780940945,-18.19685741670394,-17.52629960244292,-14.007539990292512,-16.51020353369227,-10.792051906806572,-11.75131493273295,-14.800229543476886,-17.820227146079915,-14.70451154478406,-17.616617355887968,-13.906950158673714,-19.252490775901602,-14.74357385557222,-15.85646585765629,-14.398662870765392,-19.687017352670395,-11.394362743161693,-10.619458511898149,-13.068555456893256,-11.040559383716815,-13.208213497833643,-17.84507658398553,-19.145118893617983,-10.328142501179158,-19.744369661640256,-14.295118620703755,-10.382708100995304,-17.103703849066473,-17.892759967085624,-10.587740863228204,-19.471037891059577,-10.207316427452213,-14.87294427363051,-11.577080728805484,-13.15575839170364,-18.525034680787403,-19.815225151640263,-10.644801737062991,-14.199315912081827,-12.828404231984836,-18.247726115840862,-13.907625726920543,-11.115742404803061,-15.080320079682831,-13.49048300782789,-11.477190405653896,-14.965554939052009,-11.583592254820429,-12.395092063750566,-14.557936417949197,-12.757900526044672,-19.153997608958896,-13.360829446140928,-19.200331478794997,-15.3691219252709,-17.000663948335077,-18.322384972883416,-15.042365475329946,-15.295252740494922,-18.481962672571743,-13.768365622241628,-13.635444211482836,-14.024912062505962,-17.516922670067235,-18.808124439262563,-15.084090854295756,-16.894457675869777,-14.071914176240004,-18.869894596765636,-19.42204783785838,-10.068019026183636,-19.628346717332676,-15.782522472305054,-13.590906548279513,-19.660693345534998,-18.635079140383777,-16.05545616600444,-10.883750253037853,-11.362370398296179,-17.16753095785234,-17.283697860405052,-14.873240801322169,-13.227116623967103,-19.20068458563283,-15.301463718535366,-15.355552759972095,-19.206014952170552,-10.226601340769175,-15.465996840893732,-13.339519871079462,-10.820277564020323,-12.908188260182962,-10.136724752517365,-14.047764516614194,-15.698403094514621,-19.83233875612328,-14.910575038434118,-14.030729854972918,-17.96098631656531,-12.263349193210589,-18.99779269840319,-16.197485035150233,-13.289009656770759,-17.410843306227974,-19.455240221194675,-18.67627778201888,-19.88582707854605,-10.383114671051386,-16.600037372269924,-19.789444021291256,-10.089160300091802,-13.299531263840647,-13.820288605212554,-18.397290142747092,-17.229527164234295,-11.081835165919628,-13.102062577840151,-16.69385474002407,-15.428879217350717,-19.794727839315954,-10.4118927111778,-12.20659190619521,-16.519158021132764,-14.061394465752507,-16.815310357708263,-10.887334319744062,-10.735816766183163,-17.037326155093524,-12.82015329379316,-15.955091188007298,-16.562734963003734,-11.339827030656837,-13.521594906268778,-14.505105214793385,-14.79458872119764,-19.68511403259939,-17.661220822091018,-10.597054925703235,-18.908341808860307,-10.330744326876157,-14.501379325591174,-11.55908938449631,-12.58224840036531,-15.416225769739018,-18.550374013604838,-18.349300368169295,-13.286240832030686,-13.20979048684868,-19.16728416858854,-13.573701861511172,-19.807889339589664,-11.384419956093552,-12.861247694849085,-13.678236268941994,-13.892250718908127,-12.188756679477674,-15.543567571217894,-15.111268452285982,-19.462551061467718,-10.58445406007314,-14.186358007951174,-16.828054945034662,-19.29145595290909,-13.848219518344314,-10.270359535069556,-12.76759397579848,-11.603489432901924,-11.360721021027526,-11.179237786211683,-11.836452952005288,-14.11347011111422,-10.852504078058727,-17.959954657323273,-18.948808071087605,-19.20109598515926,-15.296905990148936,-12.541740990982015,-15.623340096885364,-10.598353566852364,-10.01592827632852,-19.69781607116355,-15.484574642831156,-11.054660499210147,-10.010443206953603,-14.697449630397797,-17.243451701346903,-17.102287946276654,-10.891774791640874,-17.56164678945308,-19.45561597073594,-13.69627397496954,-17.114138593112337],"mu":[-5.893508063548067,-3.1288928656327286,-7.1931247572023675,-9.018210225155304,-8.978472580124022,-9.62537994860179,-2.920348353025768,-9.618872923045831,-1.508074434283888,-2.7724736332861366,-4.319055836345516,-0.9436020414304513,-4.681285055114667,-8.477229679326943,-5.24521841433846,-2.693407785119406,-4.561935128961951,-5.195036545598537,-8.756705119234741,-7.91477017413468,-0.6829393712910847,-3.5048275886876756,-8.047553923611625,-1.534748527936809,-7.912154387191395,-6.745269877101567,-6.194025088403574,-2.192321157325019,-0.2618769876537197,-6.227153193440785,-4.776056318134723,-4.892483493458741,-1.913925254843274,-1.049496946994144,-6.119559239033558,-9.819288577780421,-1.934494507765836,-6.474473309426783,-6.246382376859907,-8.940348522869701,-8.635536741904978,-1.0610292836328594,-5.040514894808609,-1.0438424170201754,-5.211592277417331,-7.901797369050934,-4.233188438968907,-6.162266688288398,-2.163427904991544,-4.154029618645421,-5.328984844728064,-8.391105561175507,-7.797476075761429,-7.730630769060001,-1.6842108523186083,-9.960454125742725,-1.563114456956256,-8.379599469948973,-1.823862658321167,-3.7200020937630374,-9.138184438928459,-2.6774538065123865,-8.043356059932833,-1.033569749479737,-3.3580656604589176,-7.6626695083883405,-5.833902534563398,-3.6929983714282177,-6.293466477988295,-4.263361020019256,-2.1951620131602256,-5.92832848121664,-3.222847587311779,-2.1386221642816117,-9.676690219601433,-0.4800742290902038,-8.767234965234358,-9.462732363494819,-4.994807596026178,-1.4126448008559156,-2.3303364219218925,-5.5925692400134,-7.283435821390148,-8.633854159342572,-1.294138784082679,-3.930760664349091,-5.437832483708607,-7.9951648772663075,-2.774645587940836,-9.425280966621957,-4.846806518978761,-6.7479822468913575,-9.686159729948168,-5.069566556776401,-9.666553525368478,-5.409605748032879,-2.1643917975815374,-0.5905071749473367,-1.4581158234737979,-2.0890884468181614,-5.732336002782512,-7.284369248335358,-0.696833786380715,-5.570586946660572,-1.360864966496036,-3.320986322441515,-3.1947296015428717,-1.8426780019286593,-4.28409846004574,-1.0410958602726628,-9.105586260288902,-5.94724033028351,-3.4139399357478806,-3.9878762152283587,-4.312922098706626,-7.016171202481056,-7.044495752206929,-6.830158933743076,-0.6128414027410245,-1.4553317782538788,-5.620956509389474,-4.682263636518407,-6.617623186133064,-8.868512676081634,-1.5930345245633637,-3.951797397614134,-6.554196364678726,-1.2619146328008357,-2.013090085825613,-7.575489451811759,-8.488630296522825,-6.21132466277068,-1.231580362112401,-2.039634776683883,-7.823526144629376,-9.511157895118146,-1.4354088552620325,-9.423248623871746,-7.069210376273107,-5.874286271532847,-5.367703643997648,-7.373796439620664,-5.17275306873326,-3.6945323374238592,-0.07103487453566704,-6.711423225888504,-6.654083569238041,-2.7656415889871733,-5.564806137955256,-4.548745119461664,-0.5512448795000013,-6.196095462724129,-5.185956810822252,-4.6204835991277164,-5.986470210298016,-3.94331564516492,-1.5611787003376154,-0.9099641652761825,-9.322535241382141,-1.608735057231594,-7.279007955477079,-2.0627199441770205,-5.7593582709729985,-8.669769874918476,-6.362200723981648,-3.8457043133591373,-7.988142740012436,-3.6709084170173334,-2.739878467613779,-0.27989775785120186,-4.508949046224561,-6.560852223329152,-1.2764817347098645,-1.071166497841054,-2.5385786611634042,-1.5417986726901245,-7.4191421549229775,-7.972960211178448,-1.1499123336105899,-3.9611408154217864,-4.737646559565782,-1.788462455134765,-4.097246901671618,-3.6082950668656544,-8.364667871308093,-4.51220641373107,-5.042425253789493,-9.147071851304766,-3.1057695297415733,-7.992866353242773,-1.5345139778712347,-5.80957884339703,-6.672432503867489,-2.4826479758046682,-3.6309703443051067,-7.352452350774509,-5.567969832328547,-2.216558460233178,-1.9182878009422866,-6.855841334910995,-8.213625108481232,-2.192928035637005,-6.250590319159066,-0.33021551577281594,-8.362149299270033,-7.623710978939247,-8.318804360422874,-8.60581900266709,-1.5786927445311894,-3.50515877568371,-4.041364891612115,-5.28261088069838,-6.862492777657883,-9.177888230151627,-1.5774460954731184,-8.335404840702946,-5.1012467763860485,-7.800610595273776,-3.6083445619844845,-1.6779020966109126,-4.132287215490997,-0.3375014748817673,-1.2196080875525372,-3.5680407674408876,-8.524892963517265,-8.985040478711069,-2.813902577593277,-0.5934545857223261,-5.401853375750134,-1.870595540974509,-7.549843849852788,-6.818590433572238,-1.440938867934236,-5.584651344403914,-9.893397748668756,-4.802062992835452,-7.344435233469515,-7.12043886247457,-1.9010261988470045,-8.407676038557199,-0.27002328129015707,-0.051198526464435457,-5.208856688929247,-8.51341346299278,-1.619222220493508,-2.7617593450139433,-5.123630192748849,-7.679155993047184,-5.002763366409004,-6.040533326432646,-3.5556818084790187,-9.281008430434374,-8.925374829749925,-8.600139330306536,-4.33156199141473,-8.634877612073577,-8.271523509898016,-1.8561240743976315,-5.134020959261402,-6.760087506069099,-4.615484114130672,-1.9230368316115487,-1.2509722190370742,-7.763287127120462,-7.406405870711668,-3.919675497165127,-1.951443800644701,-5.9839916539957105,-7.328917591863937,-7.126817465350301,-1.9470502483287744,-5.5880317969483295,-6.28101310421409,-3.489181627046405,-8.054407725086426,-9.712170775316768,-0.763203992712016,-7.957543553175988,-9.483735363463403,-2.546838565232683,-1.3889893347988291,-9.61321174816459,-2.6694348079286945,-1.158307301556929,-9.771827422548826,-1.328941752644761,-3.5379170945215943,-5.141076591765508,-7.183770772639566,-8.98949148684492,-6.950924129824168,-0.025112825871804745,-6.544968085910321,-6.256488094609985,-5.328049544335666,-5.970805538596147,-6.11109850442356,-4.209934434896844,-7.233297705813799,-2.6813189876530252,-4.922133476134003,-8.02903862278712,-7.9843348640392815,-9.748245225862206,-6.3470950528484105,-3.8576665620744777,-8.769094400120798,-9.5474092651113,-7.9765591875799196,-5.405806849398635,-5.64371799887031,-5.393566635638722,-9.996461331574872,-3.0639324615471653,-1.546214143250968,-5.83421892516294,-2.645500405894834,-5.761428472512291,-7.7925700092270915,-7.738750108873842,-1.4879364938187556,-9.480174338996509,-9.190177299918851,-3.9418878986927286,-4.288693373073416,-2.0939708906648113,-2.6245014482513085,-6.836374902598637,-8.37706827048927,-4.775000690242588,-3.40400988689908,-5.101944377834782,-4.923758214905369,-1.4410923673481801,-9.647226973489072,-7.892914353073359,-4.978797340137316,-6.042552663490531,-4.538515472683164,-3.9693182018277984,-1.29853216525873,-3.748640966970025,-1.6082219516859664,-5.722830690957952,-0.8811385226132851,-8.578957755050078,-6.986740306536781,-3.779642169514239,-7.079360819146543,-8.918452760023577,-7.383905051714832,-2.2206371083209064,-3.3125781659718556,-1.7064387584509677,-4.977394037259614,-4.856398734946454,-0.6577652311504978,-1.43951943894995,-3.7962412866413775,-0.12873076035233577,-0.9990989209542089,-0.07142552976123318,-2.7407391845046147,-3.3209392027848317,-4.355368586493027,-4.0575353699520855,-0.9680105470891331,-1.790246323861855,-6.782772275313462,-8.06659655539695,-0.22202429912022037,-8.103069877259015,-2.254622532466841,-4.839833075600167,-0.39962021272007986,-7.405297675799938,-0.26260312786238194,-4.688315997412662,-5.969447902911256,-0.07043723581087402,-6.915672692038502,-7.254732847439119,-4.932525809643574,-1.0058358985362181,-2.452847287268456,-2.029088200214655,-6.802629837394514,-9.44974072068942,-0.6513691362051932,-0.05766145731830097,-3.6198258732795585,-5.101829192482114,-0.4118629634111959,-3.195289494799891,-9.151634690209598,-1.4630887327573405,-8.44180082649979,-2.0460715908779914,-7.6299269943625365,-7.097047669691088,-6.669749318333158,-1.330905218614915,-6.957082849671297,-1.9531247126966722,-5.228568502946511,-5.8348689525522035,-1.556527953848934,-9.638147769626705,-2.2751092655878247,-1.687367813695262,-2.135576173551872,-4.492045378112137,-2.3681961944215013,-1.7169978967618649,-8.715940760598267,-5.283242210258745,-6.944840211200973,-9.3072715914133,-3.8224782976129035,-6.055750977820466,-6.534666112993768,-1.0342126796758855,-1.2184123020146531,-0.44567431619713105,-3.014708531828305,-1.7637282246011,-0.9007213142427384,-6.1319074061242285,-0.3835759824701368,-1.1293975827351677,-9.737856344216276,-9.88933395384951,-7.306956456986786,-9.707005032598843,-1.6682861930483162,-2.7854823671768147,-7.3066451108245545,-6.8087718844978955,-5.581900178705588,-5.263133563520617,-9.740305478219781,-5.870064409702184,-1.2144138417421324,-8.454910857466055,-8.185645764993339,-8.058730105471954,-0.11231685925747081,-2.43179522582208,-1.1659566373271146,-8.459236662790154,-1.84434670813997,-1.8555662537755313,-1.5458162297959155,-3.1037583073868324,-0.20310606172069035,-1.1268345167881688,-7.005787862531001,-8.170734464919796,-9.881148594166806,-4.796463399498789,-9.909895378516108,-8.356116889516478,-3.4234022239097084,-7.218852367058104,-9.719501290232442,-2.3987623977107164,-7.389581711327002,-1.69040606486893,-1.375906092252337,-9.695595936448807,-1.6786256086469376,-1.3745860068902416,-9.426337518249287,-5.885068744998283,-1.6099289368779468,-4.298702182097649,-7.3083521480146825,-9.397802757225849,-8.675198540629118,-3.507346139558789,-9.840468670402402,-5.118938493130942,-2.8524043753661465,-9.213479610315394,-0.17999638557941955,-7.848559724814468,-1.7950648200125219,-4.991744995415197,-3.2102607681955697,-6.572789525764248,-3.576463993625816,-2.792869888385441,-3.354407471234506,-8.588595053661003,-0.9984127931580744,-8.911565430817692,-4.318955392481165,-8.081974129612346,-4.316048491334561,-9.850828741086497,-3.2559934330205564,-3.062234671167139,-4.144310273217203,-5.2071245296400885,-2.6402025559575115,-8.00630733775594,-6.532576164908459,-3.5365561261374867,-7.948447752003069,-3.2195777195426367,-3.3492173039395623,-6.508735983507663,-6.1724564661429815,-5.384014577588696,-9.744300972751018,-2.9113888397677767,-5.163573651632632,-9.096393961183152,-3.1380394705899572,-3.8917811626667875,-3.103981000290532,-1.4598382693350476,-9.920069919793189,-2.3287189221864413,-7.744166081997507,-8.030235841640248,-3.058092343986256,-0.6732970933090687,-8.681579128968977,-1.3274524935441678,-7.680780068760655,-5.406189246667061,-3.4180639141396973,-3.4133099764660346,-3.647433117438079,-6.817438486125223,-9.441832683340525,-1.6566801769413475,-7.947107584981632,-6.128603331709819,-0.47902336205519536,-2.734454791624068,-5.661141313590798,-0.06993475853679376,-3.5770620196007252,-9.370477441225054,-8.122645377713535,-4.8640884043363,-8.416995795112701,-5.059266888737206,-8.92511614202103,-3.0940353768315387,-0.20138670820009974,-4.660579845284516,-6.8934755714508755,-3.490044367826648,-0.8156737017786364,-8.71347574497869,-7.426401412155206,-6.581647771973453,-7.4962740689533565,-8.243133805132285,-6.980344949008104,-8.191480826166204,-9.974680839934074,-4.658832398868236,-2.576435669448507,-6.578839325846606,-3.3300152498801183,-2.409625713618533,-7.85586474546413,-2.697338402942042,-4.410938675840024,-3.313674284018968,-0.5851734936111108,-6.365230460957716,-5.106767501687686,-8.80314318384757,-2.980198555641471,-8.09660233050873,-2.46475341308084,-4.142243537913643,-2.920117626024308,-1.0637444892500536,-3.467921025077838,-2.5907705071679166,-7.087540881469163,-0.2457431261233478,-8.300516382853848,-5.9748115001293804,-6.190095753638767,-6.944281448160023,-3.7523257808241284,-8.25408589163915,-1.2021284607073057,-4.190574568380918,-6.174983264618678,-2.5140126159026233,-1.714561449948384,-9.555077856065761,-5.409448699719852,-3.7784828971747086,-6.919704757060137,-3.9810857374398356,-5.9362539221136785,-1.2747185439887865,-6.87588673954461,-1.3613328899816257,-1.1340008373730481,-8.445080568359522,-6.09778687458981,-2.0133277923561654,-9.804972157943537,-6.801678595474934,-3.6430248463753467,-3.400813886846672,-2.280008657084216,-6.492120180305454,-6.697802438996295,-6.095914254113333,-8.177905237598868,-2.3099504086665656,-0.4812954067287323,-4.9630770933560475,-3.2327040492141634,-9.404331683207177,-9.603528050902083,-9.863206053145642,-7.193971681628009,-5.820672682167518,-0.17941216844892693,-6.013862620697323,-9.61820086820712,-7.225973259624208,-2.6854377772048865,-8.060811559095079,-9.344218724411324,-5.286944358419294,-3.745843045089423,-3.6252755659797975,-4.522445184043653,-6.991773078118156,-8.666394166281426,-0.641502896201751,-4.215613293049545,-8.786176874806316,-8.439302509182616,-0.9365647115384013,-7.737460764294548,-7.012130635458389,-1.5064976362194615,-5.2133625593396316,-1.4678029650500801,-9.11053281999012,-9.953385595203248,-1.5604296478120316,-3.3936858779990042,-9.5223218453715,-4.1522386316558935,-8.354828879764423,-6.820097589478619,-9.268018524630882,-6.742534545349557,-4.226165038576193,-3.100566245901466,-4.997133936905858,-1.712764240269684,-7.873172711633218,-8.221667432902729,-8.442884021930281,-7.964711161686444,-2.878589042509192,-5.612589334545348,-1.8148829403811995,-5.283919985328456,-0.047521673840451584,-3.7534353680234678,-8.368608191921801,-9.235422450978604,-8.396769290901426,-0.7385357977706253,-9.173743510812283,-5.716564797316888,-3.048268447518654,-9.325326991487938,-7.4525195152671,-7.100514989808826,-1.1134969134361827,-6.414272499191565,-7.391130750442178,-6.845529161834074,-2.474249113167799,-3.035033414931194,-5.59533299329976,-0.8018967170799329,-7.964639517552374,-9.19772026585977,-5.774589929234639,-4.311128795777488,-6.439240772045882,-2.9944931899038374,-2.1241076420634486,-4.284354150360546,-1.1450376441852916,-0.8079327372126399,-4.642507367805173,-5.972493661051505,-5.7235907027897515,-3.8726313589992056,-1.5808082147831137,-3.2137608754609204,-4.8691714040209515,-4.270894166368184,-1.3990950269238023,-1.1452864054600864,-3.7610984767793965,-4.434194166527479,-9.604449539070888,-1.493430882929312,-3.01068619879419,-7.947642688015777,-6.381616489178398,-0.6294512364642979,-8.118712565577756,-4.849338583134111,-9.16448978206143,-3.125077007079353,-0.19389988768446997,-6.872715910676613,-8.068903914490036,-8.681045688163223,-0.08973486767386962,-6.631642049372113,-5.905685743517715,-3.2521120602158238,-2.293017884337376,-6.959780515961791,-1.6396951784911118,-6.465268985055497,-2.22719619025028,-0.11988976643216187,-9.615790379190345,-8.734827296978873,-5.190853158048114,-8.116453192909166,-7.774656208729325,-6.608063203280674,-8.38868949093123,-5.7214858197982865,-2.303575719097426,-8.328574177996682,-0.6652256945742407,-7.102067558664298,-1.3550818865249492,-9.376194229414791,-6.99620413163254,-4.984933423428448,-7.533069208386904,-3.0006203440242607,-4.309960180904007,-2.7410772001429295,-5.947634619688706,-3.2082128939567967,-1.509643251431616,-2.6350471844140255,-4.8911187374807845,-5.113659668775645,-1.4264631977749764,-2.6221167361377673,-5.0343520914908435,-2.9702587983911943,-9.69906467177989,-3.996628117759653,-9.490382540974862,-5.322821186160009,-0.6015920745949477,-7.638161320961605,-6.826979015021147,-9.821140454201295,-7.674567005017588,-0.8893821959505144,-7.3165488209950835,-5.502103826220866,-7.0977185310214,-3.269477334728328,-7.314622082111941,-1.5584380244074048,-8.04243520888717,-2.9549820995339715,-8.957432569743922,-1.1510621843544788,-2.7318283388980857,-2.9274088508998064,-9.22307124344166,-5.787775383335325,-1.6260756757101635,-0.3638370278753844,-8.927403023722489,-8.143624196340063,-8.994718593963851,-0.03505110960479563,-1.6580235409872413,-4.203372863248647,-5.095821389703808,-8.516620444666003,-8.552074182652582,-1.639845199689458,-2.976693531567116,-2.7757655368160616,-9.38080007369123,-5.7230376730625165,-2.6223611866568186,-8.124240070950286,-1.9700854873790652,-0.9564949344172624,-2.6173987861688586,-4.4650772491865,-8.282017105290375,-7.598508756053944,-3.720568501316206,-3.322718921569403,-9.469882504236086,-6.454310459987638,-3.8256509664703353,-7.342809812576469,-5.475874589681418,-6.9376080313788835,-4.617677140434759,-8.18490716674144,-8.25658264905133,-7.084415302293381,-7.721076635020491,-2.1994743853484033,-5.7364204347282,-8.757513482913971,-7.232566844929247,-2.6244136378056004,-4.474414204523274,-7.765935463323292,-2.6044855310723403,-5.367302252288695,-5.492340007042442,-0.37103388150955263,-2.2555601562066174,-8.054786003546337,-8.59036348964808,-8.408107449230487,-2.8585046211583687,-4.851694323397517,-5.990368583318686,-7.968042745491322,-4.944201654066285,-3.2614396172701277,-3.0062803197820975,-0.2719906628561586,-2.3976869096437836,-9.520568144787369,-6.727421700290819,-5.575275167062161,-1.4806693218647982,-3.8342411222530592,-8.585061807769979,-6.536317823772477,-7.571354395984615,-7.650295041625881,-1.4771039486088777,-6.534136413087104,-1.8888103147117108,-7.3209038739564996,-9.099214885982413,-0.8645739919294915,-0.28145771279890264,-6.587505100694613,-8.806119830660235,-3.8416812774620923,-5.2787097404679635,-5.856322761783568,-8.57230362341219,-0.10827777699642827,-4.233095373937614,-0.36363795205186067,-1.3622056871123545,-4.841091258386037,-7.950355736138526,-5.252523745374393,-2.7844983626964104,-9.654232223860994,-6.430956412047662,-8.389726421874432,-0.11254760138633024,-3.93491503271187,-6.077662879014756,-8.905603269888381,-0.4018863173626075,-4.385628321469952,-6.778037365633162,-2.933851151107818,-0.8299940109110882,-6.300015189239261,-1.736572783102719,-2.554006810613325,-6.146134116463808,-3.092402804108698,-8.992711595413851,-8.162900093297349,-3.7483021858951826,-8.466087172762727,-1.2033131216840087,-0.4645624019907313,-5.299040082199515,-7.825468023236503,-6.858617591587093,-4.123708226067235,-8.058167363703127,-5.417096021282662,-9.037246783296444,-5.934227300084953,-9.479775486349329,-0.5140673487700265,-3.1534311975759977,-0.24720553218252173,-5.358909147415634,-3.165925578920661,-2.6424769621686672,-9.54657278014883,-7.80183375939661,-1.2283035282106725,-0.5403574431813918,-8.784668109545798,-2.803993872559527,-1.4579563843720234,-2.7106061009704296,-3.7354325000729283,-1.7448211142087744,-4.372868678746253,-5.9869127415461225,-3.6586600937214087,-0.4048294859589041,-1.7802622750102315,-2.578881394675283,-5.2133357996867264,-0.3073002159581062,-0.14315484889364738,-6.609436319189406,-5.157574340570116,-9.378892960177534,-7.153402004024829,-0.8013685962247719,-2.624295043585847,-6.202115483850634,-6.377014198240111,-1.6902176455200313,-1.3429977633918666,-5.276267458856239,-0.35894322837868087,-8.653458969520804,-2.338508156684549,-4.991536671747447,-8.885391845090023,-7.237119815363742,-7.1786372916062025,-1.5445147253985247,-4.686148903642526,-2.7360134165379613,-0.09568798175433102,-0.5444077950047421,-5.036120121784307,-6.397087587845396,-6.10397758744859,-0.5988077741662612,-7.220741674832,-6.795415408671872,-9.979271251867425,-4.838070930383285,-1.1649416075885766,-5.135149579132228,-5.0499558178114885,-0.46980747853406335,-2.8591405032819472,-0.49771461874344336,-0.3992132382811109,-5.584083983167729,-2.296793312993135,-8.584452576654897,-8.954091082121899,-3.4939208593667703,-0.2659592592615123,-2.500716721692451,-0.44767342408464916,-3.8267560093464104,-9.24388764700441,-5.9716578932996,-6.925430206173477,-3.7830595949576873,-0.44818698519412337,-9.963841709558475,-2.4269625572682374,-1.4638176362442534,-9.905435254470978,-1.1487693191328452],"beta":[2.5278206649548016,2.6545442120824934,0.4875566209010995,0.1454849696975402,4.195245339628074,0.5642225515257115,0.6405648726957602,3.661289271334126,1.2862652441183298,3.2482768994725255,3.8408839813363747,3.473731170689218,2.477474838031947,4.690953903531638,2.279259224893524,3.982449961832332,3.0662501129970723,1.448280633274156,4.8121602130289896,1.47595340928233,2.2779479628284816,2.2189498441748534,0.002161134006160026,2.6392227669672974,2.425085015585201,3.6920137526667074,0.7360100697551797,3.9673892455747395,0.7547960199048487,2.277425254234208,1.6675970191352718,3.749502679637733,1.0543137195168328,4.195909280866163,4.521919713924891,3.7490837374268695,1.0256555573718817,0.059308276541737426,3.0014641888026725,2.9101440994840386,2.6091038707389593,4.981983662141807,2.583997193916787,0.06499416439206263,3.2397144830968894,0.9835070849111283,1.7848127511057588,0.0042647113014715465,1.6715144765199241,1.5466171093404624,3.3649206065377024,3.10356841860036,3.7379710780544806,0.870639072287045,2.133881982026191,4.8663392066397115,3.809220559648624,2.2407934680112684,3.830586678947554,0.13185716883222898,3.998111546782719,2.3887285508988465,0.8657324703418301,1.682718066167852,3.936730933006425,1.7256655067020077,4.156027414361697,1.441859751648249,0.8634939279839349,4.324084846328383,0.7740030881893378,4.3250295750719845,2.898523772904978,4.872405686682767,3.659647870465066,4.638499966342598,3.293908207281684,2.116367871910636,1.5233393929751793,2.7569000943064728,1.9365498711112383,0.3572221317906332,3.0548627120507543,1.0479841111395682,1.65572408465135,0.13076422944884758,1.7941511451894465,1.7299753057107448,0.8744288365504727,4.984021968635675,2.199090057319204,2.0418807677488737,4.84767012014675,4.734878136465475,4.091908684091674,0.03922529068891345,4.158651995369374,3.8037718444480486,3.6301904525217488,4.773027983769369,0.2810366817808785,0.1790452063018355,3.1821031162366973,1.413966754164565,3.6028014470421397,4.103920359780263,2.44318341936408,2.379962696177156,1.5543701855091596,1.5001007528944332,1.7222424783413237,1.1977262019544244,3.851026815798967,1.416317404951627,0.1675530467134101,1.3664141265405605,2.1766068409585273,1.1250428184345984,2.762488479790494,3.9384001613010655,4.5686440423776755,1.9095955528106023,4.849722365791534,1.2534456931107696,3.108077260644466,0.9470131470428433,4.602372649415742,4.868443787338327,1.3527466818339406,2.985049408392384,0.9376231040464134,0.0763398309638863,3.6817613741345845,1.442168879845529,0.7594674238484933,3.4686439834438043,1.9567394951659522,2.3025665820279873,3.5188912116580884,3.0256317275067444,2.964311920266043,0.6077085350898248,4.397143743050437,1.142675230654343,1.499622209827881,4.218467179684222,3.1699312944146696,0.9298638630268619,3.293320455420128,4.712872085140277,0.31791282259241216,4.131476940545368,1.566340987409307,4.682593532927108,1.2172316604926614,3.911315921205827,3.4694791267692393,0.1381846239241291,4.665526343460144,1.4589840638567686,4.654921735174167,0.6377665655289677,1.4247551676857673,1.289689028841492,4.517491075306492,3.4910673408444373,4.716056070103721,4.63630618892905,2.3221296893233365,3.5700854319882893,0.5067786309387101,4.69930197836711,2.919256833625745,1.4388342761059059,4.351302600932911,1.018146507007418,4.831760487457504,3.344341359392,1.0225362509440394,3.902095179077455,2.4796725871996363,4.252155885304695,4.991069431280364,3.7891434418545398,1.7305418810369189,2.6865271406319104,0.23336032847528054,2.566275982540649,1.2958689727449635,1.5668721301868416,3.9022547705257384,3.616250345405084,1.1078832092409507,3.3550054286212774,2.551120755338405,4.164963902599224,3.3737120561688885,3.763711848966249,4.294202723551694,4.944715572806223,1.6231511654016106,3.870896153467185,0.7122600379129629,1.3983550719187632,3.1223515349931654,1.3327726970607623,4.516043225496398,1.0430003375138397,2.4915767619138673,0.6058641234632722,0.4364875700470816,1.3748106385541625,4.328042051290284,3.3579234631096346,3.641679495247142,3.383177324523409,3.4161464584855237,0.6969466728979767,2.8377005929598207,4.33909653580632,4.031560677518543,0.17380772141933232,1.955572095283733,0.5935783861798238,0.4725787007063753,1.3706902277982569,3.0515521320238648,4.512935514396583,2.209966243749503,0.24783294027469038,4.258359395273461,2.1034969618292445,2.869181383540733,1.1852876927819245,1.9849082959765652,2.745800069438664,1.2197221842724482,2.6355391557075114,1.1449797268215767,0.9592353323617164,0.32613807971889175,3.5231019276726694,1.8036777441476504,0.07822849626088701,1.3333635369815022,4.332530326839976,0.4056418482999091,1.9592713811349916,0.9590026912127236,3.3312755264952845,3.4166300403584815,3.2276463386127308,3.5866232754081717,2.9139810115471643,0.11250551892120209,0.040047911391226654,4.995420673114731,2.682042729402252,4.817884722360275,3.417109694762668,1.2789908920387183,4.849093138756383,3.482901345400473,0.8806861883910333,1.4162525427943706,0.684992455753276,2.405715742774832,3.081176800810007,4.768708762969421,3.8670838816219733,0.8282401081961144,0.799393395074578,3.485480456124417,3.2400124405047013,4.141871972904269,2.849419548513157,0.12819494318476843,3.7359104168228408,4.542123058084649,1.0271399571119144,1.1907113741413222,4.429219652833295,4.1746270821140365,1.624246098362211,2.9828115927235976,0.09559728824453217,2.888857607397697,4.682743703263823,2.0941150932649166,4.092361396093205,1.1087213413658525,4.020706397072682,4.253157697723996,2.9477270826155944,2.529604003241089,2.2227945196535783,4.264551662481505,2.9990650763503024,2.198906268654776,0.9579497786421498,1.798514791561442,0.30898926956036465,1.2268751632703079,1.407792724794289,3.816791019037853,2.8665712919010278,2.517645622191791,4.404000829863057,2.498289567547375,2.7264511689130213,2.459208471724885,2.8832797636406173,1.1169912619435773,2.2183840856257273,4.280081434713377,3.190438570977215,0.07359880344803282,3.428432903538593,2.0548879985276534,4.865098178192637,1.894065424013912,2.689315560534192,0.2422853509323375,3.0684329507019106,2.3788242163573314,1.7879677846752862,3.035222127815509,0.8924990562117374,3.912039121411804,2.1595119235592355,4.448361508909356,4.987300994785832,0.26680814795187136,1.2916363417194265,0.8816868713147596,2.0740279501920544,4.457642942235301,2.394016954187419,0.6620527074779115,0.15946247207135889,0.38048402313320406,3.231405065361553,2.838209464022159,0.9974138297451218,3.1517877821367577,4.0849929049558416,2.130828369216532,2.3694325393449835,2.8552733850527257,4.913655665174836,4.407356636539755,1.8646191416858515,4.67373825770877,0.32433185969042433,0.051174616416514995,0.5466007081233437,1.1380844879135754,2.842442140930933,1.7588635624532478,3.4225953573219217,3.6872512207093724,2.7691787469466203,3.5096402605344865,0.3110635307996079,2.466010549733475,2.0403688244829246,3.731895540670771,3.059060886990874,2.273613468523261,1.8904809618129048,0.9877474331847946,2.701726758142139,4.568368278215154,3.2753886721615166,4.804697086469566,1.6085022870250898,4.60205067505992,4.431769180631122,0.46437000836907383,1.0569639276638298,4.824795491428256,0.5592690310820148,2.323706004165751,3.9552535285578507,3.795623158767497,3.2771745525237153,1.7633830847216658,3.939182534189488,4.303003343208095,0.7767977850548813,3.9692119343193664,1.6172855290399324,3.8876960410775228,0.6227409737040135,1.506794126412896,3.4602264049761597,0.7555867541985606,1.4154723694772953,1.9326570557489087,1.545137326991497,4.034874918754595,1.5835522966293258,1.667177825333822,1.1026397679802735,0.2894927489624699,0.2782873540209263,3.9803774565115257,1.2095345921795075,4.252231421117511,1.721146285076639,3.302418475670547,0.5902631977324047,4.395301539291726,2.5231261852920692,2.1042344310634387,2.94219421223198,4.400917636782646,3.64265859212229,4.630802199159163,1.4879563254352868,1.429376041145315,0.18449344789234878,3.827311006689331,0.6589648117644475,3.3816133208135413,1.4951149033162192,4.223409474359258,0.32342149823790134,0.4693628260406102,3.4668075052227723,4.947437663718396,3.380700422482379,0.674746244613299,3.9997866385187644,0.9445295282068067,3.333220163808839,2.606919347419657,1.8630785250726412,3.633358554258641,3.742447018446043,4.959829922158089,3.0521531663800285,1.5556973397065954,3.6105149492736635,1.617627064012459,3.742194772440431,0.8063948507906726,1.3803188064987126,0.2819106609392641,0.8394230542107506,4.984926940185313,4.104227054016544,2.764016124552887,4.836965132755906,1.7298083077495907,1.9283342755886346,3.3734050007587313,1.7693565848304516,0.8958827027197191,4.898780073287352,1.1360594547172065,0.7763642729901632,0.4241561220475065,3.5764016414344524,0.9523927678244348,1.8484339710619435,2.029541946778716,1.3740222116705891,4.317715836618804,0.7918451114668346,3.797427749317459,2.507546875339026,2.806283558156654,3.387555604292798,4.321470469283718,1.6261607050265403,0.061997716811031944,4.659763361271106,2.6931666897434567,2.464378213249222,3.6999836054888147,4.401314112751972,0.7453795996346724,2.9494912524194925,1.7935252278154634,4.102403459488552,0.1650048327644782,0.4210596607424755,3.4421092119402843,4.877327476805355,0.17683339692143862,4.4732776824676455,2.088915351580453,0.5979393763230623,3.0115917444691265,0.9793213163489145,3.306545795782674,0.6742223844952167,0.9258723397175783,4.755263529447447,3.5829288200221643,2.3712427996034546,3.1393630283046448,1.5776200462434753,1.2921156779698617,1.1093312549887502,1.7446874271243562,4.243604287094131,4.390460844144282,0.41265545910946444,4.768651503243437,2.654166911197484,1.810604434475398,3.520794677954923,2.8219939583607836,3.2042129241119777,2.992092146612948,0.5063701015272615,0.47460274312956185,1.9784195005593352,2.6333108436508548,3.2927318360685334,3.665570830707876,4.536753002146425,4.080210184403187,4.060854506663786,2.459115075044116,2.995825898764952,2.1426178670539264,4.5961438054022485,2.6566595838899207,2.6625424082152325,0.5634145899855847,4.659433423119978,2.953255699277234,4.638002735943757,3.520903730369591,3.977474598877373,1.1368125299165455,1.1537324545790784,0.7512475769783822,2.8776069014602523,1.6344007279931627,1.4623291961328755,1.0442504899902716,0.45256703967965217,1.7238394227331433,3.897240500300648,0.3204384582630293,3.655253163526724,4.991990154300589,2.7156969097779102,2.5290564154533635,2.1766477927907593,2.134532644586743,3.8475126859461364,4.670489083895814,3.9930762765675984,0.9398301521331465,4.599508169660935,1.2444135621489827,3.069143358909047,4.745288614400875,1.2829351456014726,4.456205040128763,3.4162025229644666,4.407909261557764,1.343957586659299,3.029750042994288,1.5601900947474934,0.4904006622301682,0.5572493728373462,3.1994358634791773,3.191262448806497,2.17499974746307,2.1487268773297896,2.886448827628775,1.3334987841108714,4.034550237656295,2.6885166542667385,2.3105991983929863,0.4437689844560033,3.200700352896655,4.54109882618606,3.787189088139107,1.939349421261758,1.2553135714754726,0.7154669335308572,0.0057950559516462,1.9346115428847588,1.3488189526685157,2.144486295308523,0.7339021516440147,3.8914875049393274,2.972835747169953,3.3205442627242974,1.8751493941000652,4.107135020233892,3.979262774426886,1.7915351413665292,0.26259131824027837,0.4012324161254943,1.8935541407874834,1.9404396131890467,3.900884508385843,3.5451187200909318,4.721991766134835,3.899454900453252,3.165980158513505,3.478079816840225,3.985296722105324,1.1132744072576561,3.8455803312786996,1.7669179877302355,4.677616667557815,2.135003843436416,1.9002997874883687,2.417565697149308,3.682802933486059,3.38865838035629,3.771954321316462,0.14124772026589127,2.6097138638033126,3.796721829012464,4.310878901397991,0.8211186789762848,1.3895789947663706,3.765899569496376,0.8599992832053482,2.0191480197428993,4.705170026192899,2.73441016032002,4.939031667726938,0.6430318240098587,3.1083309673038317,1.8561164278045406,1.8278161844760055,1.563481656453568,1.6397774932188547,3.122732581630724,3.6675848274335388,0.03382161063149369,2.0212526983548806,4.649532358472136,4.576022709003642,4.952456264148644,4.083351203169659,1.8591144593705722,1.382711073634879,0.0016427491067783073,4.687663532574695,4.9338093452296174,4.708871131523972,2.209886216039758,4.5110668249223576,4.856083085953465,3.258625951910817,1.9647687324431173,2.5373788437794023,0.13926061632393183,1.5130638139498864,2.3708226671392274,3.1726845878987,0.046752618725128814,0.4338915488841155,1.8589255872314936,3.9387037223042665,2.0751118185658344,3.7958362390383718,4.362545480177329,2.1262492011043808,0.7020477574837591,2.0797420068312187,3.7859106955609523,4.9013249269565815,0.9057324040361325,0.7546023569811,1.3575308072530534,2.6250176855697394,4.909693035158088,1.1794504898975355,2.4067473186070156,4.510951779725526,2.5935657788755306,0.2900642643660345,3.885406791311179,1.410566621885927,2.083122381704193,4.522588724266896,2.7542333085849546,1.645761857510738,4.16206758801685,2.6452221516897545,0.19712601381423944,3.762522095895796,1.3687807161303533,4.758519566461184,3.559679513625137,1.7679576141301667,3.4910218924386927,1.0852085742014628,3.9991424961622677,3.0365556662226725,2.5426959981702604,2.074712306616396,0.9052088811327075,2.5031465328024938,4.514765259164926,1.1454380609158954,2.2214742990412093,0.3301239408702028,1.747283410208399,3.472808433535951,0.7939943153521445,0.18395002932532933,4.758485939521522,1.0767441669793087,1.963258096777648,1.5820694880674802,4.385562851563163,4.498818010374432,3.4384216560066303,2.1545062453720885,2.3603832233748467,2.4700145378137695,0.2516529049085925,0.531066399161122,0.1989164081104855,4.190065882653987,0.5066589059748183,0.8684522525973504,3.7826827868296475,0.7275233044164309,3.194954741143249,3.4637563883333513,0.6619921132281925,2.9228433415135235,0.9650311238183706,4.186103358065579,3.936281259108394,1.6302900667005205,4.146729995239041,4.234335457651518,3.494097829744822,1.0355763687986885,1.8509923703630993,2.0337310870939085,3.2693531726797262,4.595970265749733,0.9283337693110416,0.8487960136747963,1.1900091117762324,3.27243262657531,2.4135704576349393,4.093369203881836,2.332569831166098,1.774600907997298,1.5482517916026983,1.5132520407396277,0.6605882774206895,4.870505304336055,1.1570567720349079,0.26328897974796206,1.2266570319022752,1.8103831745755639,4.012714021608614,2.912723835100235,1.504096963558601,0.2198758349434493,0.8126448109742024,1.348606422195695,3.8632045686360508,4.773375947137859,2.60501698877744,2.11172193400749,0.7953459124096807,4.747782643614262,0.7605951466154515,2.157180449126961,3.3709995563059216,0.42305410266590515,0.3437160880231249,2.59677371907022,0.42985210060581425,2.6869771166443646,0.45307514076165845,0.7039218333034369,1.3628981892780945,4.011226213383649,1.5869280018002818,1.5120360187414006,0.7004902083727216,2.625732185847255,3.897200917858452,1.8761903892315224,4.494867313985861,4.63523234492612,2.2383586863783576,2.4978556030535337,2.6711883226074153,4.383353605705479,4.513640082629957,0.34527907580201633,3.615971963833693,4.096522373808042,2.2129167679279362,1.7302720765136836,3.0437083010084276,0.40324952205994413,1.90853651196906,3.8224051927059577,1.5287230833188714,0.12695479649814767,0.5249004006973468,3.83125660782229,4.263967010246334,4.057111011652607,2.2932545313222965,3.477715806617301,2.535421734312957,1.4835727520824127,1.310290530540632,2.524558313941392,3.0458673186014473,2.9125954262240583,3.323640143561456,1.3927823235257608,0.11835183604021249,3.7536876373607875,0.7956079007831518,0.03835801585969634,0.2389848441388065,0.8935972785070456,1.0253824124701283,0.11619029733502595,3.43461930106609,1.7954800206650912,2.48358943426478,1.6513606562903704,1.902150516019181,3.2432347577932665,3.1104170719038815,0.6785554083340051,2.1997622622320945,2.9202962329077664,4.999613573284157,1.0708557407809793,3.157737548220619,1.3268059917756303,0.1410804279922262,3.2027653904594713,4.032441836207373,2.2427706261597358,2.1718151223276347,2.3757587704589413,0.46118206746381785,3.0617322938013225,2.9876919020279633,0.2941247709677164,1.7167595450605233,3.153853562903927,4.9517559369384925,2.4005104546875766,2.2663294836358405,1.362881469087075,4.005943554167807,2.2027942948564707,0.3110002986523097,3.8098951623019084,3.5764636836171793,3.9408281942879175,0.22010753718431642,3.080620189755088,0.834956879973936,0.9702165090927928,0.24693612966335543,1.1175138722000288,3.9820985623369367,2.941799442554569,1.3692721456074086,2.5965308944546295,0.773523403187919,3.765431161430677,0.8268361300492499,0.0877729012895434,4.368629997067105,3.432471260317821,1.1859228618428341,0.9360869456402243,4.369247579699831,0.45030964826276776,3.5237284788272936,1.2361776960409743,0.013815778480865681,4.665364316825654,0.8210700785080238,4.032560667524574,1.1184857649325652,2.0308798534939863,1.0450405570391774,4.668903999917205,0.15572931247627264,3.6817271199666024,3.7620712548085864,1.334227763856869,2.894429889232275,4.476502373179202,3.1648083587978117,1.8825264311228507,0.1337452751447954,2.465392782660233,0.6591205661242594,2.6349834482123544,2.0694423351957205,3.894912265256405,0.8049633218621399,4.65480349620472,0.2341188485914636,1.2362502758830862,2.740098880664217,3.3186230304201283,3.1982968850662585,3.2433566278049755,4.928166745789876,1.3373745584623808,2.9353400453439313,1.8764313216497641,0.9494786927692556,2.403929845762338,0.630398253660055,0.9888498906348231,0.7694045218377188,3.2313344820952885,3.8559318341626305,0.5473257532879483,3.9366901809538444,4.532597782958644,4.160229065853139,0.7477238231877792,0.4077878124576084,4.368488166835437,4.758784496008991,4.486324660530982,1.3151889519757376,3.8320346453019316,0.1950954519729653,0.531903808373837,4.161051037104904,0.05376797600144756,4.126903030403641,3.2182695217554236,0.9338387538685067,4.614975875964301,0.4152587831973087,0.3922349350971377,1.359332100807693,3.713373156876909,0.19926058692713577,3.4538238606341776,4.602199071595894,3.2588244447763595,3.2042058671504083,0.020577278035861513,2.0350664648673753,0.677416975023577,0.7573014720275217,0.512073583937932,3.5033392519936477,0.47237582711391,1.9045653040264487,4.821794360872341,0.5200102842118526,0.4672697398883241,0.02138965290176653,1.5472296389907048,3.2851466617849634,2.334964067359251,3.7569239231169824,4.170442427996585,4.281813103479644,2.4860215326218893,2.7920574672207152,3.0526665679330787,4.332090732916193,4.873741417127753,2.1626697908683514,2.254778921492755,1.1125457956331108,1.3330828584180454,2.541015900667726,0.8959360695060292,3.0652364980165983,0.18327063144517042,1.2606552474802424,4.532806601442214,4.190194693874135,0.5631162728972583,2.5742656477756123,3.700004246557389,0.3914136099003107]}
},{}],96:[function(require,module,exports){
module.exports={"expected":[0.0,5.589278123780379e-85,1.6365979410776614e-36,0.0,0.0,0.0,9.457807774409121e-40,1.3930978886486539e-30,0.0,9.765725359899005e-59,0.0,0.0,0.0,0.0,0.0,1.1265004420305413e-69,1.455360632749198e-91,1.9751940338074418e-11,2.4494688292989126e-61,0.0,3.998927748618583e-99,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.2820436166705994e-55,0.0,0.0,0.0,4.403889972881554e-12,2.8608300477013305e-28,6.976456093032276e-107,0.0,0.0,0.0,0.0,4.4923286825898915e-7,0.0,4.830203370250307e-119,9.017882550534806e-103,0.0,4.455550777877756e-44,5.605201573717006e-51,0.0,0.0,0.0,5.0689486306869264e-43,0.0,2.474476655881408e-37,1.2805607499459963e-16,2.3327638282995028e-26,1.0426254208869857e-27,0.0,0.0,0.0,0.0,4.224154723589145e-67,0.0,3.357392129494122e-131,0.0,3.936127685500669e-18,2.6486926797331624e-58,0.0,0.0,0.0,0.0,7.960832216809169e-20,0.0,2.6495812744317255e-73,0.0,0.0,0.0,1.093745174804752e-19,6.496740728805056e-150,0.0,1.7119208628547693e-74,0.0,0.0,0.0,0.0,0.0,1.2792285912790706e-15,0.0,2.1759791383157165e-17,0.0,0.0,1.1482066757721543e-11,0.0,0.0,0.0,0.0,0.0,0.0,0.0,5.927089768193111e-10,0.0,0.0,3.1834526436944644e-20,7.291191702407195e-74,2.1537338549905255e-62,0.0,0.0,0.0,0.0,1.7170625276619343e-118,4.416621421195874e-46,0.0,1.4825906404644668e-28,0.0,0.0,2.8289402799568462e-8,0.0,0.0,0.0,0.0,8.155954918465416e-268,5.654820563837328e-54,0.0,0.0,0.0,3.2359043761530234e-5,0.0,0.0,2.955622614044513e-169,0.0,0.0,0.0,0.0,0.0,2.602079326249867e-271,2.216938551579635e-18,7.81432911962309e-270,0.0,0.0,8.563368530830768e-112,5.255573899633268e-172,1.2628262940293422e-94,1.057668209788617e-84,0.0,2.7209499242826695e-37,0.0,0.0,6.3178137164961976e-232,2.5854319985329764e-24,6.04392462484775e-14,0.0,0.0,0.0,2.5175391596519534e-35,0.0,2.573389017917045e-161,0.0,0.0,2.3186851967049913e-42,0.0,1.837648879461425e-58,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,3.640561813750535e-55,0.0,0.0,0.0,0.0,2.4720746216702908e-29,0.0,2.18296556520269e-74,0.0,2.2710089967367097e-32,4.820320557801002e-107,0.0,2.5309858631151965e-300,3.945786202691964e-7,4.542777440168834e-205,0.0,1.111111965484244e-78,1.9623195116873635e-176,0.0,0.0,2.5881606226324974e-154,0.0,0.0,4.73729554943978e-41,0.0,2.743472137185222e-19,4.5125194078631856e-29,7.417739829615528e-76,0.0,2.7428815330480703e-31,1.3090469579985886e-110,0.0,0.0,0.0,0.0,0.0,9.886907828945401e-201,6.14317971e-315,0.0,0.0,9.864935981248174e-10,2.175445667513901e-136,4.053155658118502e-71,1.4492210739798784e-296,0.0,3.3770570546633377e-64,8.19158007568321e-47,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,4.2578198485015514e-61,0.0,1.4909416718412702e-18,9.919515206626566e-44,0.0,1.4566109788700372e-182,0.0,1.630668333155481e-99,1.7810910468414142e-266,1.358839558508187e-50,0.0,0.0,0.0,2.2910913505833485e-20,0.0,2.0770031324912694e-88,0.0,0.0,4.199316945526994e-305,0.0,1.6681627195087895e-43,2.1444694537463626e-24,0.0,0.0,0.0,0.0,0.0,0.0,3.414590054395912e-48,2.653548894214028e-11,1.2350394578391472e-58,0.0,0.0,0.0,0.0,4.941944667382577e-81,4.300160157525754e-111,0.0,0.0,3.10695298452036e-258,1.975480959807927e-128,0.0,0.0,0.0,2.395805438287248e-205,0.0,0.0,3.1079981550976233e-39,0.0,0.0,0.0,0.0,0.0,5.053703906258598e-204,0.0,3.2248766194383974e-58,0.0,0.0,0.0,0.0,0.0,0.0,0.0,7.068429079666221e-36,0.0,9.082362688190998e-33,0.0,0.0,0.0,0.0,1.5651171206220325e-111,1.319143468054991e-56,1.1827625149201961e-86,1.1293341822092332e-76,0.0,0.0,9.71166725241607e-125,8.362799213963032e-186,0.0,0.0,0.0,1.6002666610724752e-52,0.0,0.0,0.0,0.0,5.915762431754155e-59,0.0,3.905217064006437e-40,3.8178071054383416e-53,2.952719468008561e-46,0.0,0.0,0.0,0.0,9.001689922007104e-80,0.0,3.10381815824488e-23,0.0,0.0,0.0,1.4976288104550655e-116,0.0,0.0,0.0,3.681450585961652e-32,0.0,0.0,0.0,0.0,2.15043747280298e-113,0.0,9.651673273379596e-186,0.0,0.0,0.0,0.0,0.0,0.0,1.5507650408367442e-16,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.9998667513616877e-38,1.0427763688945239e-254,2.4786714963034123e-96,1.0133119433946899e-34,1.8078937177602526e-133,0.0,0.0,0.0,0.0,4.4378628841484973e-32,2.581868017861207e-295,0.0,0.0,0.0,4.387392103066482e-295,0.0,0.0,0.0,0.0,0.0,2.605881660944541e-12,1.86685530568328e-16,5.233894037473373e-63,2.5718600439767253e-37,0.0,3.5212018923322078e-40,3.166212670203073e-284,0.0,0.0,1.559269822077005e-8,6.463907242922956e-131,0.0,2.880125496497584e-55,0.0,0.0,2.6487643368970674e-31,8.87708703451606e-17,0.0,0.0,0.0,2.7869115500047694e-84,0.0,0.0,0.0,0.0,5.792576570553813e-249,0.0,1.8913349990214274e-223,7.090385030795971e-247,2.0040285519376354e-34,4.629054756520417e-306,3.848353025683119e-45,0.0,2.3449080590881915e-104,0.0,0.0,0.0,0.0,6.544219689055702e-34,0.0,4.892109200595479e-197,0.0,0.0,0.0,0.0,0.0,0.0,6.496535947519005e-53,2.241192852075821e-33,3.2395587009462815e-39,0.0,0.0,0.0,8.927581208602384e-7,9.25056783798893e-75,1.6325445303987685e-66,1.493798796669067e-67,0.0,3.2415733142228055e-119,0.0,4.1435150909122574e-50,0.0,1.5659216519430306e-50,9.985645584369344e-148,0.0,0.0,0.0,0.0,0.0,0.0,7.276351365182626e-73,0.0,6.868523502082036e-132,0.0,0.0,6.764343067130751e-14,0.0,2.8322666373976827e-33,0.0,5.631894680809282e-14,0.0,0.0,0.0,0.0,0.0,0.0,8.26918111414371e-102,0.0,1.6578143015221481e-282,0.0,4.135934712150045e-18,0.0,0.0,6.436675420070062e-23,1.7528058715115824e-43,6.680200897599572e-56,6.473290757240244e-63,1.1291878232169173e-11,0.0,0.0,0.0,2.2327738679094415e-35,0.0,0.0,0.0,0.0,1.638863244746639e-48,0.0,1.7692691190932093e-180,0.0,1.6344384910275354e-49,1.9087736929238553e-81,6.311538702095227e-28,5.858043377852724e-178,5.296710738347726e-190,0.0,3.534254011957497e-72,3.009590299993587e-33,0.0,0.0,1.3704127099862756e-11,2.220386543002432e-51,1.9842640237769354e-47,7.639884437389022e-135,0.0,4.3497186947144827e-147,0.0,1.0899275656581793e-65,1.9565183406161752e-79,0.0,0.0,2.199776947317055e-5,0.0,5.1118514826320903e-169,0.0,0.0,1.874571800367808e-202,2.4615290904435065e-217,0.0,0.0,0.0,0.0,0.0,0.0,0.0,6.780501521718069e-26,0.0,2.000123937572301e-20,1.0603375534364805e-117,1.4749951199966218e-87,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,3.2438284769670273e-35,6.568268624130481e-35,3.134709346987157e-44,0.0,0.0,0.0,8.63064693608357e-27,3.742837895758671e-12,0.0,0.0,1.8560450148639186e-129,0.0,2.1059874445917579e-106,0.0,0.0,1.3229164951255598e-94,0.0,6.937718289778465e-64,0.0,9.51047707490883e-13,0.0,2.927237470784152e-48,0.0,0.0,7.091123904862913e-305,0.0,0.0,0.0,1.8821582313819547e-185,2.0428500099240525e-119,4.2103097943310674e-8,0.0,0.0,3.3498224874773044e-72,0.0,0.0,9.43763598704268e-23,0.0,5.174876574181202e-136,0.0,0.0,2.0055415464e-314,0.0,0.0,2.4635194521804966e-148,1.2885323680647995e-46,4.1527042348563674e-44,0.0,0.0,0.0,0.0,0.0,0.0,0.0,7.013072956026499e-23,0.0,5.932814337486945e-18,0.0,0.0,0.0,0.0,1.423827435232297e-99,3.953596377997973e-57,0.0,2.25213643767366e-37,1.8233341130669799e-37,0.0,1.6512016317637668e-27,1.204403453028843e-51,3.4089892982240202e-279,2.0052567566242604e-173,0.0,4.6176689964015235e-199,0.0,0.0,0.0,9.658427862505191e-144,2.1047230051130494e-247,0.0,0.0,0.0,0.0,1.4210844999922738e-27,4.811385530803073e-307,4.799613452947642e-96,1.2309988784323766e-28,7.832253806618593e-101,1.7277710461530574e-60,1.1414577381319911e-150,0.0,0.0,0.0,0.0,4.986888358819781e-33,3.132487050373609e-23,0.0,1.185467602045601e-41,0.0,0.0,2.435352752972705e-38,0.0,0.0,0.0,0.0,0.0,9.786926403732601e-31,0.0,0.0,0.0,0.0,0.0003125147637710128,2.2803671724000689e-88,0.0,0.0,0.0,2.0113835831243674e-7,1.669369176678218e-31,0.0,0.0,0.0,5.578041832189256e-64,2.628078304129989e-259,5.67259857321565e-125,5.669515469582995e-27,1.27611038100128e-11,1.878387009503175e-57,0.0,6.37912278048777e-121,9.633344416170234e-78,7.751384323015979e-104,2.4427943089722425e-32,1.6478196415435508e-293,0.0,0.0,0.0,0.0,0.0,0.0,6.262259868299768e-54,0.0,0.0,0.0,0.0,0.0,5.612801574103804e-92,0.0,0.0,1.168543094632381e-307,2.397612795783467e-30,3.675407360978889e-202,2.967142089886669e-100,2.634231490836571e-34,8.127129641661051e-107,0.0,6.8317811059884754e-12,4.2721387386306795e-170,0.0,0.0,0.0,4.90452876349431e-137,0.0,0.0,6.443416526469593e-38,0.0,7.89620415366312e-121,0.0,1.3876383327778936e-175,1.3164891649875707e-35,1.19149132447148e-55,4.905079204544085e-15,0.0,0.0,0.0,0.0,0.0,0.0,0.0,9.707794643870404e-175,0.0,0.0,0.0,5.105434039087908e-9,2.629188316043578e-139,0.0,2.765219423562522e-37,0.0,0.0,3.3284962768579095e-40,0.0,0.0,0.0,0.0,1.068805666044623e-12,1.4375568308377204e-16,0.0,0.0,0.0,0.0,9.550888400827606e-9,0.0,1.7163922055009873e-62,0.0,5.430262100845649e-33,0.0,1.9549030685233817e-190,0.0,0.0,5.935456993185064e-154,0.0,0.0,2.068373910260995e-25,0.0,8.515294194472731e-119,8.20614917217811e-62,0.0,2.3608674344326997e-102,0.0,0.0,1.4220550208712347e-137,0.0,4.1225527188822424e-14,2.9580271834730654e-20,1.2275264306592752e-16,0.0,0.0,1.4165160985933026e-41,0.0,0.0,0.0,0.0,0.0,9.296355368547456e-194,0.0,0.0,0.0,2.670610396641357e-200,0.0,3.344969152503945e-9,6.764597050666532e-51,0.0,0.0,1.3302405763063751e-37,6.280795173421358e-26,0.0,4.4884955862758773e-72,0.0,0.0,2.9588588029529494e-33,0.0,0.0,0.0,0.0,2.8184629018545507e-131,0.0,1.5441022951163218e-46,0.0,9.337448101866527e-20,1.5089563934043147e-161,0.0,0.0,0.0,0.0,0.0,0.0,3.9995892820198523e-171,0.0,0.0,5.610490459211502e-246,0.0,5.78122031540421e-22,1.5885883255340213e-149,0.0,0.0,0.0,0.0,1.8276373004786366e-8,0.0,2.2978739596441444e-108,9.367615719674321e-136,7.440406990544402e-195,0.0,5.157055632892619e-88,0.0,2.801305002107119e-30,1.549175562423556e-37,0.0,0.0,0.0,1.3718720488835988e-52,6.3342274307128954e-27,0.0,0.0,5.007169919509872e-35,0.0,0.0,0.0,0.0,0.0,1.5951660560089153e-91,0.0,5.262551592797426e-15,0.0,0.0,0.0,0.0,8.053697329312968e-54,0.0,0.0,0.0,0.0,6.629537748286896e-53,0.0,1.2353033460632798e-7,0.0,0.0,4.871679479018928e-26,0.0,4.490784205348386e-165,0.0,1.1392265973746473e-28,0.0,0.0,3.105333470554172e-32,1.38111977273845e-20,0.0,0.0,1.072981289711659e-18,1.1750560566839507e-89,0.0,0.0,4.905412642145289e-19,6.642243662023473e-52,1.1921390672340611e-182,0.0,0.0,3.3511191009563204e-32,0.0,0.0,3.7099994523245026e-32,0.0,3.431017328794648e-80,9.484258294804382e-47,0.0,7.016126830780573e-119,0.0,0.0,5.159453406319366e-116,0.0,0.0,1.9635613638534676e-15,4.6575277708983473e-256,0.0,0.0,0.0,3.007443186569098e-106,0.0,3.908826487462592e-15,0.0,0.0,0.0,1.1078058898790058e-41,0.0,6.031148264712005e-41,6.497874163064557e-35,0.0,7.064473696253416e-190,2.162068180527256e-92,1.5861260096983488e-296,1.1579692789017594e-39,0.0,1.0245141899079927e-49,1.971167044431647e-36,4.647773992655833e-29,0.0,3.694997324621701e-60,0.0,0.0,6.223445238178445e-217,4.4931993795778585e-71,8.080423032712806e-66,0.0,1.0151286737661167e-5,0.0,6.87738909150541e-27,2.637035364079083e-99,1.3501073398778567e-97,0.0,4.882109715668243e-63,8.59509702798281e-22,2.1408537403360082e-13,0.0,1.0265500484261022e-42,0.0,3.06974187535371e-113,4.275837535620895e-138,0.0,1.2810045106245115e-231,0.0,7.399471342381759e-25,0.0,0.0,0.0,0.0,0.0,3.601270483291749e-11,0.0,0.0,0.0,0.0,0.0,2.9978228050010525e-22,7.747241262053953e-59,0.0,1.027480925116659e-29,2.5999691256428e-18,0.0,0.0,0.0,0.0,7.036368507400475e-13,0.0,0.0,1.2884800155056186e-235,0.0,0.0,8.170245000963276e-202,0.0,7.306701482104039e-16,0.0,0.0,0.0,2.8107880291173406e-153,1.6472491584867756e-169,2.2766858279732012e-116,3.535609605781143e-283,4.887749193143084e-27,0.0,0.0,0.0,0.0,3.2940802414008245e-79,8.919466452301567e-153,3.1045044807249843e-19,0.0,0.0,4.809953403243406e-64,1.3601130806739837e-68,1.6724263128174525e-11,0.0,6.277532631988707e-14,0.0,0.0,3.6181614947950618e-6,0.0,9.726671702283171e-111,0.0,1.7166269331454688e-29,0.0,0.0,5.719268899331196e-56,0.0,2.7975320779903713e-59,6.529857005014734e-293,0.0],"x":[-12.757883765467186,-15.893543391243076,-16.435476247699302,-18.031625672039425,-15.328185091446763,-19.784052544041188,-18.722325433329566,-14.032346044974062,-10.196248995312363,-17.003118330611663,-15.31340818559576,-12.604176475564133,-10.839205896924858,-16.658698358472193,-18.498203329372263,-18.1736224997463,-13.675051367000517,-12.35360938238145,-12.404163407725264,-18.621831394518434,-11.207311498945193,-14.621769159939948,-16.646973870848306,-12.179743013124932,-17.514274306022976,-19.341125144688046,-15.97856475912308,-17.59183542088269,-12.43494684287734,-11.011913486828949,-19.416240327079162,-14.84553959417295,-17.786358122399864,-18.99599833353483,-11.815026459296512,-11.138976217702574,-17.66439895112444,-16.99315663156215,-12.837650997857788,-15.844735670546314,-14.294152381215364,-15.007741392894642,-12.390106080354158,-16.610714272905895,-16.20791018147958,-16.354656343567942,-16.630701102993484,-14.733126144667136,-13.220656779363068,-10.891951622624902,-16.08126180271617,-19.194431498617668,-11.71137734235531,-17.148028447684172,-15.458562104577695,-13.53357030684313,-11.130140263081445,-14.131376417422866,-17.291262210985963,-16.22353307326016,-14.502782240633767,-11.029904023041055,-11.440669724964287,-12.204195593795239,-13.220513288577898,-11.883157381659338,-11.325023108703911,-15.891321920256235,-11.631249596987203,-12.035366903403084,-14.31456829591961,-13.290647915769043,-11.058792949158205,-17.937710402439343,-12.42891851913967,-16.70854826145981,-17.886728180007243,-12.823568234288455,-15.151472205466945,-17.358014345600928,-10.395411585351784,-13.545014841939341,-12.916947314981734,-19.151988571111573,-19.057422491682427,-17.38018283508505,-13.474368998355601,-13.273466954695186,-16.95994939035178,-18.165041263910958,-10.350982167329928,-15.289812514997758,-11.929868013739783,-17.246368840028666,-19.588503093886832,-14.347238903523934,-16.215195385475514,-17.377060584880194,-18.02639361726312,-11.920451992243388,-10.333953874940212,-16.43116982545254,-18.216134763240678,-16.341966905065554,-17.129908295220048,-15.80939536586188,-19.333857514239686,-10.675259601930629,-17.387216544239674,-14.303165214731715,-17.30458628268924,-19.01779965297913,-10.236246756546324,-15.249344780722957,-14.440367481320424,-15.260180395949059,-10.636687917675491,-12.682520138249465,-19.045726369421324,-19.090246811078163,-19.158932595291326,-11.651156306875237,-14.395152741769113,-18.726615058384827,-13.543376450789523,-19.997256836000904,-10.798219827864655,-12.114619046917298,-18.708580805903775,-19.74140983345581,-15.76818507321786,-19.747615564172566,-17.879390179169995,-19.326834715587744,-15.876583721797076,-16.340203650472315,-11.410640619865106,-17.93362607846221,-18.828144055057418,-19.109816109836096,-16.458575863384176,-15.837608447111553,-16.674629510798486,-16.2075619483014,-13.611136076219747,-13.073583169411823,-10.360498737769559,-11.508904194390333,-12.399994054333298,-12.025169386075731,-11.142574656214919,-17.521533650677732,-18.635912375640387,-17.808275410414236,-11.125817558780117,-16.456740759891378,-13.750240089043,-17.454361081378508,-17.51535687330762,-14.67764135260196,-12.893758237636208,-11.89176200062249,-15.213889607280286,-18.65658424984058,-13.533538781889533,-18.15107204659577,-17.131599403555327,-19.000279373147876,-17.441303545353055,-14.684760477050183,-11.105726062729858,-19.26970470159813,-13.580553712124047,-19.61398648114204,-17.015044756668217,-13.715393816839267,-15.541387299740329,-11.590303063014687,-19.034153086994923,-13.59185104155339,-11.440329987383627,-19.496106603952637,-15.674780199740495,-13.447592341919473,-10.104432706532956,-16.23135087676936,-14.538316496006418,-11.056576570451055,-13.83283166148668,-19.103428553311183,-18.101587536940055,-18.014410027055114,-19.465759203873077,-16.482557958826344,-15.778927860755434,-11.908191258582146,-15.80804916021781,-13.274161870788024,-10.828267411781221,-18.93407784887949,-18.53954456210148,-16.510256633135107,-19.02325895641052,-12.476190898804004,-19.900975776617656,-12.57225689388347,-14.56066547828305,-17.699673063460683,-13.985401700999327,-12.342107205743513,-16.693806018933298,-12.329708445781026,-16.874937469863152,-12.663668619832873,-15.723041713073712,-19.764754567057693,-18.137403195332794,-12.739422845409647,-13.462028188150434,-15.332562685117075,-13.11877154006692,-11.377936664196934,-10.412492515500798,-14.976136009996832,-18.25709233980462,-15.206836537856194,-10.423877781526073,-19.913811393154297,-14.17680639099786,-14.939422270123288,-11.32841643607157,-14.96913953249811,-11.669916962485622,-14.712081069664888,-17.123565785954806,-18.044185489038234,-16.227995439383246,-13.615551486283994,-10.334666918339973,-16.011275544785335,-12.37751596303988,-12.120793791673668,-18.37586884325085,-17.652619611842745,-17.577753192314354,-17.018732689071665,-12.567466213291596,-12.529753825284962,-14.011101020801144,-11.342265722062479,-16.67595318266756,-12.459280973719071,-14.399857848116703,-18.645693962809727,-13.201726880883404,-13.340920454719384,-12.881164790502563,-15.942063592468255,-19.098728314800493,-19.203341336305705,-18.560190699700506,-18.46359856236456,-16.81046505479521,-10.804760536830997,-19.84436540723162,-18.4657532372807,-14.461833088731277,-17.02084533735482,-18.43558995948583,-19.38572221089978,-14.543961940874848,-17.316199964113835,-15.34135730864884,-13.893941785871029,-15.98205765543615,-19.921600143007737,-14.762000772185193,-18.83093221043596,-19.316933444202103,-11.576727496578593,-13.972321237525096,-18.18386263217343,-17.232106671314096,-16.78347738677179,-19.198033292278293,-14.645351362435946,-16.842170125166902,-11.36874287681944,-10.639935877610371,-16.136793464884086,-12.42258979268831,-14.036502799859633,-16.366472343696113,-14.140446090449137,-10.757195798994365,-14.830892424404547,-14.310467812633203,-13.666433622626668,-17.577459509658077,-17.20512855428906,-17.702396619155785,-17.577486108059805,-16.53631677444055,-18.99581089178501,-17.807117926810836,-11.710852985966888,-14.405046627295635,-13.537361731527914,-15.657142417863156,-19.951204791488543,-17.10730621261431,-10.621801796431445,-15.663200263773668,-13.975912303586476,-16.772061970314248,-18.941008941191203,-13.951321285933568,-18.09113912482926,-16.308672947433205,-16.987368366556716,-11.73517376180319,-19.067089650484256,-19.33725281133143,-10.964513001327209,-18.360500293571334,-19.474680488518892,-16.452214816828473,-19.476345067974393,-18.436742397838067,-12.761935595775395,-15.855219887438984,-19.96975143748254,-12.9898957720145,-18.764412664669557,-13.69671544932742,-13.285396330849292,-18.080031435849715,-10.361695541158225,-19.858665009811418,-18.5906094589568,-19.831659920814392,-18.22705250852158,-15.91037213959243,-15.758730928861162,-19.603058597566378,-12.861292686218249,-17.926524452029383,-10.438898583280423,-18.131884085951025,-19.517063462996656,-10.79741918393326,-15.352589935670132,-18.764910574839625,-16.31290973396862,-13.220113098910808,-16.911911309650716,-10.715784035926355,-18.62936574775223,-16.548555029408856,-14.16318738436961,-15.787923576910236,-10.879000037392203,-11.043792542196513,-19.835271212730856,-17.657735430363854,-18.626682898689104,-17.43981551792818,-13.45909424396119,-14.594398176063553,-17.027652162875636,-11.20452118874682,-11.307095720020595,-19.325681786361514,-18.20528365614541,-14.086121857264466,-19.57701362181991,-14.131517293528814,-10.778437421436228,-15.324806107550359,-15.964815824075123,-16.78262769390039,-10.455476585540726,-12.028813138707527,-17.988508384319356,-12.575155008716813,-10.322374199018,-12.142305607235764,-10.285097115257305,-14.439518184346339,-14.77094876972611,-14.693717299238457,-12.111956668720186,-12.987088483548277,-16.273937283135545,-16.092676176566737,-15.414296666619638,-14.8877930169415,-19.860117664523493,-12.69370075060224,-17.689094470172144,-18.31882102329911,-10.057427867971025,-17.47344632207451,-16.726442754088524,-17.32820479110528,-15.527771502727221,-12.53005898766591,-14.57390029606584,-13.039326153101626,-10.034180065433054,-17.562258742798896,-10.98157046227226,-17.099181373637762,-11.133712262395797,-12.471865714489624,-16.142103324092965,-12.795111763817193,-18.886743251543674,-11.663409861262064,-15.578974588342149,-19.37556075387414,-11.363598072769642,-16.103479108978647,-18.62499229976296,-19.194543794319298,-16.014887451926548,-13.345227575534903,-11.56025858147392,-14.729998601294502,-10.607408825227543,-16.47973814520542,-10.691900325370591,-16.946999978489185,-10.56553702742536,-17.258847070753994,-19.684436424466153,-17.686588662189617,-18.00874414788398,-14.44237224572978,-12.190538267994695,-11.312346778558078,-10.549316654829068,-18.62831957861897,-10.834357057641872,-13.050534697874456,-12.758716990078959,-17.51109514585094,-19.645169486834437,-18.459704567604348,-17.77998170657292,-11.165047688696891,-12.236130692154909,-13.206486107306512,-10.910613088489011,-13.17117049507377,-12.863028730064922,-16.774396323759944,-12.14209743188447,-11.769513401083607,-15.869014779816466,-15.960937021277275,-18.549389406605595,-15.120124636456602,-18.86812599022963,-19.64489597844215,-12.773370732185018,-18.898982588171677,-17.254111511366453,-13.709922449814243,-17.787362296770635,-17.61158875082778,-16.81401172679477,-17.23731980196044,-13.50911280124847,-10.676129589347198,-11.298964772187944,-14.326153146324971,-18.30142171567318,-11.564824921875843,-10.4888122248604,-13.813930739599858,-18.099732761922013,-11.013501669421595,-14.125400394802943,-11.379368047687349,-16.042944983540096,-16.27054417609999,-18.337389829591793,-11.721959136436492,-19.858543475150448,-12.243971873236347,-15.69491136563235,-11.906230990739777,-11.859193964637294,-15.480101473705805,-17.210756462212295,-11.240825320262495,-15.861582798864156,-12.047125303673049,-14.134603887979898,-15.95573168107298,-10.01742796998089,-16.051031417686502,-17.35129024115038,-13.886651939102894,-13.262303849030737,-18.648420850205085,-18.17185036867877,-19.80163702536467,-10.177102494694793,-18.518681508511396,-15.650914837181846,-19.35795826221363,-10.924040457201116,-15.126767504894188,-11.32850985924956,-19.568088018003735,-12.713059936751742,-19.30041372082984,-11.331946792460563,-15.551742164639021,-10.025966731703349,-16.32374438002772,-15.330966257559286,-18.065534425166963,-10.067655169430818,-11.732598896649353,-12.468084115984981,-10.26261657757178,-15.211172392827166,-13.930246658660902,-11.91549965566816,-18.048478909090615,-17.2711342600805,-16.289489289017638,-19.32793378517778,-17.852149973516482,-16.179089381234288,-10.799396915445769,-14.896450665080852,-18.24242797533025,-14.567477936822858,-10.776999294157099,-10.057690907643423,-11.515329859387915,-15.770032163849946,-12.885089726579242,-13.821571136235658,-18.95784297996261,-13.618178341326168,-16.4857162341506,-12.37719164609617,-15.322473020729975,-14.023216331117395,-16.73030264009587,-15.197948602531824,-12.467800530670814,-10.734691886512325,-19.237566880247932,-17.581199871733972,-13.992387010339428,-11.54888275462191,-19.210970143419473,-19.658754860696142,-18.386269506865325,-13.16712803518306,-11.046172265100669,-14.332363700789085,-17.601560250759977,-19.19665084983305,-18.789052203782283,-17.720068765791016,-18.706405664380853,-16.177491537321615,-19.122674191910697,-17.77966778875285,-10.19395995924916,-11.305955185617467,-17.637174124213093,-19.069455944536852,-14.32123748987205,-16.16834058801019,-12.561414110046034,-10.824876680200244,-13.08898285846542,-19.253919760787074,-12.330855053095249,-16.17469589127411,-17.34921255059322,-15.208100593858978,-12.443778251266348,-19.33802604341945,-10.66174468914465,-17.987852359948736,-16.672218357924418,-19.908316885124925,-10.399373861817153,-12.33431273437461,-11.219860369051633,-16.268594837834605,-18.150029944057906,-10.225928602318806,-16.35844262742234,-10.746657562271153,-10.114156852701973,-19.104067802958824,-19.537774440945704,-17.753303938595156,-15.748331714636771,-17.540583355734253,-11.497527665232399,-13.852354797017984,-14.435173292828223,-18.06616857859701,-14.45888105638371,-12.362262378953616,-16.548247797130294,-17.00470035119042,-13.358619248400101,-11.298292886172138,-15.854199963550066,-10.07988296627386,-19.15769085558924,-14.537852748413925,-17.263131613415833,-10.695225238341619,-13.661884635684592,-11.997976437021913,-10.680085948672584,-12.25140639719716,-12.566447505800053,-19.94295396991499,-17.877224834183608,-18.165433932800433,-13.877057578416371,-13.06505043864549,-14.657815437905668,-17.790016929813678,-18.417565985791157,-12.676413352460953,-16.72635716344752,-10.573721436839442,-15.176519875609015,-18.06939345691037,-19.069477805152463,-16.250381856085443,-10.292382782370119,-10.538957713632147,-16.777830317415308,-13.982151412443326,-16.81400097916904,-12.067356820645793,-10.921960394056992,-17.931091632173878,-11.155104597703309,-10.527450932975338,-19.341592335914203,-19.35185113755867,-12.501935930195236,-13.436527118404147,-14.124225085759667,-15.582517663309527,-13.918546260983259,-17.019893995377643,-10.936115873902336,-19.68765946702295,-16.861282685718425,-19.965383584878634,-16.633769751989227,-12.683063457668322,-10.690853943854254,-16.626602670806125,-11.498761926272337,-18.79947669737681,-11.698879251172423,-11.256756801634303,-13.898407266973278,-18.98990826156789,-17.897340208524003,-14.380780317546089,-18.907293575622532,-13.065003533372469,-10.453327876755322,-18.144069453499267,-13.255092515609476,-15.560422637536595,-13.342267824096579,-12.155149987814596,-13.218247238501393,-17.785495340051053,-14.310273864595677,-12.102297029329465,-11.081132769097703,-11.537085121327666,-14.52840399721296,-14.288145643308418,-18.58337336412021,-10.914273123677072,-17.359026354487376,-11.277986875007695,-16.131512781143627,-15.641900152564121,-15.844067792318729,-10.41875961137659,-16.159351613153802,-14.648820036047077,-17.806132308260587,-11.985341351929081,-17.402323638218693,-19.329884357689394,-19.215778647111033,-13.626380109898522,-19.17242771781088,-10.932811890018924,-14.861658888358683,-12.132267267535315,-14.175497951216444,-10.23703826808086,-19.86809001614836,-11.815748314356693,-13.474651152167276,-17.453902611829882,-16.50663794535703,-13.229603967524566,-18.14695519882558,-11.311318118704815,-18.08020094042256,-13.80882594067007,-13.166105742843492,-15.241491706165633,-15.958238927978627,-18.871125771426197,-17.7680574577773,-11.260819875532604,-10.0092609540098,-15.726092623767055,-17.159217839877545,-19.322060300973167,-11.486163988091349,-15.99004640676978,-19.61373618323171,-17.949031540738464,-13.444841178320363,-18.215773363365404,-18.321233019471062,-19.478692736538918,-10.47793662381266,-11.792062596780884,-17.3081098584602,-14.191046111381203,-17.876927977652045,-17.85384831341468,-10.824770242679607,-14.287580442847368,-16.520091394763778,-13.349402341907115,-10.23970488985353,-10.148588961665489,-12.99120179938831,-19.92836568485095,-13.061280264633112,-13.738293280999356,-12.96822472505407,-17.915623831574802,-16.271374538604757,-16.5877808125784,-10.43300814806283,-11.181123931282126,-19.097569293079275,-11.272018687646376,-17.42388729404623,-14.468364149959527,-11.117317035344286,-11.798113842744677,-19.014872461166618,-12.135829032636206,-16.531622950286845,-13.038523956068433,-14.657684044407095,-16.732672158185768,-12.586759604683909,-14.097677377471447,-15.119488404245892,-14.460370437464098,-10.43053932568453,-16.063767497175185,-18.343878263184145,-18.167384249022902,-15.939854768472962,-15.135080603907223,-10.242593334275762,-17.70048215492292,-15.648275236353848,-11.514316466727795,-15.633681843838414,-19.408551912412314,-13.271998047020526,-18.92357375269649,-17.712774220097987,-15.563219262081155,-13.563778625878149,-18.604115179753876,-18.228926373630266,-18.942707037580558,-11.191277618640736,-10.363029775691292,-18.94404410452865,-16.07754562435169,-12.390861500238588,-14.546854327365889,-13.133030854400992,-12.485008450256984,-19.744632496888293,-15.221448472757979,-13.014942580047666,-19.678750768587303,-19.779641237874507,-16.35646483902395,-19.647078398209725,-11.476511573790845,-10.206348371078203,-13.25473966451952,-18.29638140421938,-13.462957672412212,-15.298360405399603,-10.870176778768592,-16.435448083491316,-11.574662822551876,-14.65352626235282,-17.45776378346151,-19.816481059633038,-12.89577485662301,-12.95694619512446,-11.86694851736127,-11.87725783314484,-14.109147546585309,-14.453061571763264,-16.62116148582578,-14.907939937361581,-13.339845629860832,-13.441631966420909,-11.954339510438318,-13.944675217103688,-15.497136797202135,-14.590043087424283,-14.169129610884907,-12.791073704455783,-18.873430566588883,-12.601285398745354,-13.719367750928527,-11.363723068608742,-12.82658698123239,-12.758213942456011,-11.08225359448372,-11.377287143388624,-15.441931351352098,-19.38827980228251,-12.865816816471895,-15.228004484567814,-13.168619212873583,-17.432538934300357,-11.277411639225638,-10.078429144932397,-14.366799987600714,-19.842010810064707,-14.98404438602287,-14.584955069837175,-16.179277241670395,-15.77820969634756,-19.793459968087433,-15.891342607432303,-11.895686693241178,-12.73408624366583,-15.371888140582966,-19.43866571956616,-17.931477739356023,-11.200236307842387,-17.886694730348687,-19.47773348834548,-13.160101138452895,-13.59033617587663,-14.795931549423898,-15.861663056477322,-14.044752772488508,-13.986211666869153,-14.774017571600776,-10.070577995512958,-15.85178436682675,-13.322225274296791,-17.403051118691412,-11.221985720836607,-10.31064995044468,-12.206481576205563,-19.39462801342367,-16.153933783637047,-19.497392832167144,-12.083183684202991,-17.525369134844393,-13.176257838155765,-18.001052500127905,-11.473627979926901,-12.792407866340392,-16.06088687072143,-16.433196861399782,-18.834388992638146,-14.010206363568479,-15.156060186555644,-16.263274255383212,-12.470518399270771,-11.770874492506051,-14.863411563656939,-15.360523930395072,-13.857524059654125,-19.80429594778257,-12.731153786986837,-12.386999732354138,-10.510427746307467,-10.402247791448179,-19.099899752237505,-17.770703471184618,-11.164157037417974,-15.219423977626015,-13.55800118523749,-10.555072116169645,-13.809581469248037,-12.38382227995874,-12.500470617553274,-14.145118365228521,-19.067413955339354,-11.723240613691521,-18.623054144004378,-15.823419704697715,-11.740672871594064,-14.258364712506424,-15.815901341938146,-13.993386511819502,-16.088963328419425,-17.329320540066963,-11.94131249849502,-13.962999078734072,-10.886885581878952,-11.193845347879716,-15.378167024581892,-16.300385289709205,-13.774839504638152,-19.31440700442609,-16.148299639139534,-11.50457953998594,-11.511804386546412,-15.232937044982808,-10.420641231921199,-15.082998648285685,-10.54409481100101,-18.275196502947797,-12.350326240168052,-15.161584972083865,-17.687932222841486,-15.459036565522322,-11.468978676545964,-14.728928514063641,-18.25358608112947,-12.98244783734994,-13.810659468892311,-10.100029112088741,-18.394781563350072,-15.373156511802815,-16.91057975878921,-18.206311687350404,-18.869248006799644,-14.186903012990538,-11.40746402708272,-13.340113931916303,-13.771377028437435,-19.539597385975505,-16.796713412938782,-16.150743394778683,-14.620316555846674,-12.853545012916143,-14.87501172188437,-19.530136869012573,-19.367377060131975,-13.241144664328033,-12.981114221234744,-11.901202266175591,-12.68454725701969,-11.27054800027113,-12.839301455548032,-11.503069121875352,-10.650478800115435,-10.214861520226728,-19.701981552130633,-19.197844194023656,-10.971703302818977,-15.060767921710701,-12.637667076796149,-13.437755643296466,-15.899020862285507,-11.87563427762729,-12.657494458067063,-16.440538064086603],"mu":[9.39693374539878,1.9053146189912673,3.2811609559550914,0.15803459242051954,7.008330945708437,5.658427495041309,1.1283581586437608,1.343124310260455,6.549882726183052,4.065186236959557,7.10811940855359,4.601313378423306,7.564238036141524,4.087326782833143,2.5344616076922932,6.105860966424594,7.73489694626085,3.070647299274396,1.4491172192422663,0.33284359738192437,6.171005521502999,6.358673892958149,0.7123820747958454,0.6942281018600416,9.066531846232724,6.081456600421404,6.50812233328848,0.16966020610871047,4.108974090712641,5.295464741978179,7.53930195564134,1.8787406146222585,6.3433289806597575,9.162165466377271,3.8788664752743918,0.7900771094221515,2.467532962530108,1.4016255640734232,1.5406771140461917,6.622889005229489,2.8181352456517494,1.113361281522458,0.5794735067063139,4.928951193169871,5.94191275141956,8.108609358098413,9.99554330724684,8.039032139347226,4.214201696049004,2.550640538466322,8.77269259523022,8.805913802210622,9.666933083088804,6.679935998993316,3.7922819849316047,1.0398541559355778,2.056671306737188,5.949625458699012,5.173922759853673,2.8311932205148693,6.188098227234873,4.58767479202606,2.1611196465818905,5.482996649146028,5.324909949996098,6.249466263577674,0.4722758405048433,3.0051137675689032,4.341210133943658,6.018544336335589,3.9196214004085284,9.877121868223313,2.997906759293767,8.456485493010621,8.70788179280218,9.428959929287286,3.334176841663987,8.779194014124112,2.2461043053517926,7.749836764355806,3.634294942905998,6.833250734759524,8.764139716781775,2.084565571542505,2.9717799233694286,3.440304245028689,1.4651580783729878,0.6583422832726238,7.47349370828754,0.14014369496103463,6.857399826300766,7.426201455701298,1.9299583363968975,5.402820662465507,2.613412041200671,4.083412358173238,4.468707416756925,3.4588205618240586,9.17317968383022,3.0217841072513285,3.7449226754871234,1.6628961397774722,3.6018366560294,2.6931772046452163,8.021190177699562,7.420999463437175,6.40197184444286,5.158022526620227,3.8226964003684194,5.649717426820516,3.3168949449333263,1.2886209912783286,7.236937269379114,4.044014892908539,1.8574709298141734,7.742314789779168,2.9276732378899073,2.658082040769638,3.9074063473574405,1.8717241212701308,6.4405061613941506,3.588935223433376,2.9446934453105045,0.06678253991418082,3.8935577783584896,8.812998581179222,1.111151811792952,9.315850649962512,3.244240639113951,7.324699824695395,0.04369209783879224,4.256074660033235,8.389928297885064,4.752759387206873,3.7040526688478437,2.201080185444597,6.6958755225787,8.892744299706196,7.471251129108641,3.020975104020367,3.4415838030492463,8.718222794265762,7.955916946744679,6.630516948865369,5.638650161771366,8.310781339846391,6.122468894418764,1.0137827744200378,3.4882897649993794,6.24403973517677,1.54448902600276,2.861844738547825,4.781651710034613,2.8014485272932976,3.8933827918165065,5.083060185577706,1.858029024282799,0.7188061661888723,6.821384767117181,1.6816946749543216,1.252413192058608,8.159430176457406,0.5495375165867311,9.614291607345159,5.404700836802299,6.07815704414574,4.8739450796898804,1.6447477067566174,5.681545602277998,7.073355418897886,8.256237516110456,2.904997502038875,8.352256153971158,3.0950529572821384,8.67197886855883,8.325772380408935,0.2558749817454564,6.968708569014234,3.5791180133755063,7.234404297414678,7.458544187300086,3.554916170151059,2.8986516665944073,0.5727567241441922,0.37972045255460385,1.837543650240161,5.392289062738329,2.427468683316909,5.563768163977844,6.813026883160291,2.7741804420406413,5.719981098562467,5.495650876528531,8.00139440698046,4.908279892819197,2.220546489559767,1.722836252392208,2.1705158704841176,1.8261393048282226,1.0711581283164828,2.583443002899577,5.004122572575163,6.892848370234372,8.20658048992063,1.4279302946271155,8.473968195848391,2.2506431850067843,8.809345631563907,1.1506164308034927,9.700095829669493,3.136553817261545,2.631308611024772,0.5683640834386794,0.8198377312729233,4.308101265109004,9.354063031111256,6.88801737972817,8.665481907391976,4.6533133253072805,9.51988628887946,7.442274951319625,9.641874942194926,6.03312825229251,8.971120364206586,9.367418466616035,9.531725995112437,7.62839534333704,2.70713496984901,4.124951339711229,7.93566453648544,6.743477142259067,7.627528540666583,5.787544400619165,7.760330939260012,5.765692706999818,1.4925116017742912,0.7943491627274768,2.218358956506965,5.41284600390428,0.7806595759690071,4.7330458078713455,2.9447345663087665,4.692938666561335,3.08481953137854,4.264184358506973,7.58327501730903,0.8184008487116223,4.0230505820100255,9.447661641489614,5.645801693435484,6.828734910192726,0.8369531520613749,6.705069728154154,5.979640105117676,5.690247401921771,1.3259385614609642,6.993376089108727,1.5546463988874648,7.854829225210511,7.11110447810894,0.7865533517368273,0.5658084541112052,8.928996498588225,3.4745958769774044,7.580446730186434,0.5820528634323674,7.493118990553096,0.4314615765404439,8.806640110610038,1.9840417303760272,1.0883265196858916,4.080422214586175,8.551966043993776,0.3014651295458459,1.49795356039784,9.192147731604328,0.3900164543906337,8.495012667831883,4.655297446638988,5.952372599016796,4.504410226533846,3.6541727818428638,0.9247078338684056,6.326413902202375,2.8186450967311227,0.7568628619926776,2.477518105749652,6.897300563795003,7.163962684747758,1.1961036266922909,5.223813594655702,6.262126217321715,7.810861380420255,9.41861436371157,3.493318140351074,2.380992468892109,2.673390042479944,6.760719987422579,5.996821397079999,5.291001238882968,4.374429134893713,5.435355096042089,6.885708007840852,3.353052153176208,0.9006081575469338,3.5388448217256863,6.725744901859613,8.641453444615642,2.5141083180787693,1.2534545040611,9.30290320377033,4.369382448321137,1.6882718747016612,5.796876545933694,2.0716491019778793,5.0686359490003685,5.280784090647099,7.313768582130904,5.91154341916575,4.650474479797031,6.5676085715877175,0.11424124197532359,0.626369970137981,5.0382097873013665,0.43482665900822726,7.195926896650184,3.1346515851566115,1.8630974930176736,7.100730103211896,5.745397898474225,3.4310991818088166,0.11072134654296573,6.084057820476973,9.184679319657258,5.9376950512969096,3.055234439770693,9.498417614958656,6.417468160006299,1.9283543653741875,5.977614958175428,8.426377012228532,9.441270998492701,8.364878518432736,8.027609288151387,1.9290426791458692,0.2802998412370883,6.155916521124915,6.697531131530949,6.2290739178034755,8.312501106202157,9.651357154595217,1.8506364058379021,8.085435428331294,2.6792068888707954,2.408383978099351,3.264484902713072,5.2114329893054245,0.768202872958943,1.6641346903317533,8.811340209971096,1.6487804830527963,9.169150603425017,2.8691492051051104,2.6505529242035863,9.513602373615777,5.117514118504214,4.725909631717795,0.26799801932299916,0.37704300539025626,2.67773813690515,6.7919765134808845,2.429121596811852,2.0959660781411937,4.296960386284794,7.963649988359869,4.898982429709822,8.574241479915752,6.459354652844917,0.6700419541772806,1.1106734405916074,7.427714359319313,7.820386144432023,7.720566022929498,3.929159157372213,9.337735932365005,9.935679668844536,0.9180866895219908,3.0929062883471015,9.870155570706288,5.145575975776671,1.0059787871359616,4.432390064206755,1.6180494798998057,0.4925743696635032,1.093225636614381,6.458898875780566,9.615270961585807,2.126662774883088,9.588630310644895,5.291341659821502,7.288168653794016,5.561261508016053,4.190173406092805,5.9185162801576086,0.6913730122656392,9.196450110614913,2.857973958093236,3.4155567745826976,2.979979109678732,5.303527809979325,0.5665034601227892,9.289841923362163,3.764332915739763,5.249158111858748,1.8347432218888038,7.899749381182519,5.287925769407527,2.5848635740799097,9.50991943450655,9.528133490506455,3.515337536157659,2.381502130692066,8.283435223636388,3.4471121163363194,4.787940033139133,5.183837295719201,0.5138067157821968,8.074964026181476,8.621602436592536,8.51286988776651,0.4254946204142773,1.0669023962687518,2.6738444716102827,7.2358423581249625,6.247749103203677,8.422844855539198,9.723093429023471,4.0592144631364135,5.283905128197115,9.792829788340514,4.300085249823525,6.373031950736998,8.92028899298689,7.729813367058296,0.3492162635702911,2.7410381360260394,4.524726429869572,5.239689732500111,7.0735526088150795,0.4647651965039934,8.14707692078974,1.390318890988691,9.516629889208847,1.2212329391315269,2.3199416131776363,8.844126997827876,8.664124272476174,1.6296461086517944,9.667896296369015,3.2929136655723434,9.38537063234351,9.815467814572417,8.503635144921969,5.811933387571653,5.70434437969499,3.120006447009145,7.224122606436623,5.896744764925012,0.40824725445387067,7.664315376554882,3.82854053870602,2.610127135367466,0.03285450743551355,0.21487745533658398,7.933762868271286,3.1770167560750484,1.8457005905001123,0.5965657213934961,4.191114869021712,3.357315373826586,5.672868805517524,1.3262074843459448,5.359176098724618,8.84223894168667,9.800911954563725,8.133422172530913,4.61740896339228,2.298706247274076,2.6153856826613664,4.500464647233735,8.61402898648179,6.277294565054323,4.142756630939342,8.329559438047953,1.919553560938143,1.709294202139624,9.774527543135981,2.603832509226436,1.3887372609270288,8.455880459003978,6.4760711211542805,2.943112285325251,9.874867204453913,0.5865490983383315,2.7790107582828916,4.004124759391106,3.8429404973144243,3.542327574333277,9.655406231958194,1.8482422172649504,6.742568320965541,9.157071053691737,0.619153296767263,2.0413121414598923,5.3819742343503,8.492942729489465,7.179348617545484,3.97758453803434,4.879152737600561,7.104606786101495,9.455875508188619,4.21367634669693,6.408284309653385,2.6062589246085577,6.40863692795792,7.338362132380913,7.240667852639476,5.228071341235854,3.051705614486182,4.973671184938504,0.9319731392772801,5.572947827805175,8.17234280833296,6.851493673807876,8.388863088226161,6.958284433673294,1.5978013608928876,4.372744210624915,0.5117789054889266,4.287622796536253,6.033295905043417,8.93198753261965,7.6569948999862,1.4793962301452468,6.636538435806488,1.616091030802862,2.0908770704091495,7.059429688099932,5.371144756367294,8.277323343548717,1.4952731198605562,9.646613431587543,5.039862090626455,6.848116854371121,4.9234724177319,1.427708051676122,8.599194098796755,8.983500876195155,1.8226859217339886,7.502052038675561,2.020981565851414,1.0285501982100498,3.372074988363174,3.3948321820880567,9.636455571198848,6.539252812690119,0.13623373695701657,6.164162286318375,7.649856704094051,5.994163905947585,6.570063945548796,9.982181127608653,0.9565788583521506,9.325134842939168,7.378925341453,7.487510513397016,7.665897692283414,2.774530735459355,6.476911161358087,9.544994451469705,6.815031482298977,1.1748232818361837,0.19886467535042973,6.98375489426259,5.0170923002383905,7.642380907222817,2.353876309824927,2.2014529573921404,3.5621184011290663,5.185880159330287,6.537811351140251,5.250492162588438,4.8210417808883,8.01570507105186,8.978662091671517,3.5490137414068923,7.31346662209603,6.794344195323026,9.657473251802964,9.038356892708713,0.17580557027820243,8.871129733050298,2.3461231317404496,8.245364516481203,0.5921260288509589,0.2457852541596317,7.351946336444433,0.6292105664733372,6.03894085774958,4.681881727665436,9.620534767271899,0.15935564993456053,8.46348669490154,5.942422254489155,8.940418746074068,1.8194776664268564,3.5886338188580535,6.0470281128583885,6.615093057104948,6.396150155873823,3.9107545471077754,3.4066563109758485,6.95280182468214,7.030947393454927,9.462280181504394,6.466438817608548,3.6273665583072767,7.242931881260956,4.577020263496845,0.358690047311907,6.523336306181122,9.088259936962071,2.5538532368515554,7.887490413064815,2.862369925684629,4.223772211930788,9.471437383350017,7.973172190637429,5.2301726461133535,1.224351615983652,0.03207139987443375,4.091605728503507,0.09821731392164024,1.0896694725995726,5.190490624970662,6.128118754492425,0.0007359727387257209,4.927544857152424,9.64597314924217,6.194841828773958,6.341041423246796,0.6478700883053956,6.806689183190155,4.04684824752861,2.3558931714965237,6.616156486804807,5.398902363394753,9.35019688546948,8.494366310894051,1.579535769388316,1.6544737990838465,2.833721034915393,5.819550475716497,8.340114572690664,3.7482695290770685,3.382364786375187,1.6066698410385793,3.698591473489097,8.749618269041164,1.7046367914895733,9.05389733876832,3.405086199696221,3.740474684999453,9.424289940508414,2.648383626609081,7.877810396366729,8.839797501694184,9.395306108504622,9.502938536929959,0.46920264935828015,4.331698832015734,4.603796670165188,7.720145389069706,3.0096262863561196,5.165772590829725,5.290504101214182,2.008151835540084,8.786690768607173,0.20715414603498905,1.4064018763919894,1.9196548890319298,4.1647800352191755,7.09354423787709,3.5811477736469066,7.457902381647907,8.331777760633894,2.2323215938133756,2.8625735085125537,4.343696181849703,1.6920941916040544,2.827945149971316,4.70506003018243,1.2007115360533382,8.951626040634292,3.4823593916218387,2.936176484973767,0.8757170357192345,8.605300888703812,4.0479656558057435,2.361758246806822,3.565974656465647,8.149479894252718,4.876793951376794,8.749684539683521,3.794319670068016,9.05658025605378,8.713776828580604,4.806180982600612,2.4153912322173654,8.32321746654912,3.728539633509347,9.06478486328778,8.65482635055222,6.096247122795207,7.240645711227252,4.371483302256403,6.083240232850898,5.752833718894108,0.4640002182853764,1.5378902744121636,6.431757088092196,5.02976251403677,9.196575331320012,0.5808819383143793,1.564133683578548,8.501735734772032,2.16531141373957,2.282772156363033,5.453588152114868,4.764599624832451,3.281486560029603,6.297791833613882,1.9391122789506499,6.097621225959154,9.163393082097706,1.154536393763821,2.9721681581123027,3.5316108093647647,9.70770653926367,9.422483003882412,2.1525385035962663,7.665378299917485,6.246995317462368,8.91252442458345,8.47776703292334,6.003179682015427,5.478920472908464,3.649770804412733,3.3661031682079456,4.4462710080255174,6.2049508060028575,6.065875225538382,8.293273662741544,2.056987627590303,1.8287096923199875,9.82196627552572,4.101978297933653,2.0072916342346603,8.594077441838595,9.057314177042459,1.241655891788469,1.1003280755970746,5.75512921299175,2.434666043333935,3.6282332387255245,6.632608891184857,6.143455540634532,8.69212480538643,2.08743909886163,2.191498576605917,2.6528908271959906,4.432240458805694,6.533463937965305,1.9319557170100299,1.3800523727363556,8.217506918184815,8.269999258373282,1.9192984241645283,7.819619830934126,7.683050543888967,3.0765506803675002,5.377005742049152,3.430200542701478,6.758464088648191,0.6415519552985782,3.76926788155455,5.876020826666133,8.248822978245371,9.200066794560922,3.477666986157806,7.173650341256799,7.923338491041836,8.72395583340179,6.29789129984445,5.821180258446459,7.611901184418109,5.59612025859318,6.054167005291662,4.905661170716657,0.45125060594252364,3.2605533569147305,0.09927255525991052,9.691620378947407,6.454127569033932,7.638563141133945,4.081550998710421,2.2091910841349116,3.4495211770892475,6.471695432380646,8.4808135022722,0.000147216796690941,3.031754462233005,1.9674510787105004,6.197857581356012,8.509652357327543,0.8437353617141441,8.824267007037186,1.4577706190767459,4.584284449675515,9.84104897223419,8.420045134406271,8.464655555582265,2.2709967737197534,9.87361649358894,6.511618767840859,8.71426201902306,1.3497207637791875,1.9043312892964592,2.4497024206426143,5.657409203822024,7.486683207495302,3.669888249018991,5.484993565984495,7.994452876345369,2.9511150683286846,9.238326608685883,3.531101375566017,4.562956185456811,0.2846103003437572,8.011939433072783,4.179691880279268,3.580399719108731,7.5830615667735435,4.869811239187463,6.10785614394088,1.6116635546816283,7.025360209295295,1.0170783727825228,4.254223293646731,0.19309209793167303,7.036355368965279,6.424673690745468,6.886570296962001,6.816411123829049,0.5384081997217405,6.7678357561627545,1.8810726402374622,5.382677306788524,4.60540165296085,3.8877000679187623,7.15455259605517,8.047672269076802,5.2803018007775755,2.1047514417656332,0.47517797730388445,7.893701573130367,0.3425122054480889,3.240150402759643,6.576840480806765,8.451356943995428,6.930218309998802,8.015758166898504,3.7702984142056306,5.299507056555479,1.7748155883157168,1.761344872418813,7.2238492500317015,2.9527691397011746,2.243751639990461,3.717195394432855,1.687646737371451,9.614108769603028,3.173611323011547,2.367324529066559,7.578712851985694,3.0655437454542556,0.3905054430665267,9.907730195568028,3.282652924720302,3.0320178821835597,3.7877344438196148,9.249039373913757,7.879967506544658,9.29809274710539,3.7865986129392093,3.3119278359013804,1.9587084352345685,3.4984575006575502,3.4253088105892338,6.55001013585641,4.611135150743923,5.6983744672594145,6.28229148607465,0.4559223113717814,3.3317285396475427,2.918240072153182,1.572345120813503,0.7267797441619583,6.5570148884873785,2.907948429226228,5.5066526381741525,8.757602559575325,6.947729788031866,2.877179059376056,1.4923131262374856,1.4464790093229452,5.619434502350654,4.31439996461616,5.471700335012663,2.1120488661305736,7.448554064978801,5.585783845858765,8.780906386275824,0.21601849414734975,3.9666246167496477,5.326758693835525,2.366047984889401,3.8282774517205365,6.513252854435185,6.339748388639935,3.4891950614267597,4.087676906851312,7.51275148880681,3.756828023444936,6.845148139440735,5.796689474779568,0.1914880769562033,6.7339139868993865,7.631610455182011,1.370714058977336,5.945041384467638,0.122420608350855,1.1694847427030064,6.502237059969403,6.095466816402155,0.9587992668659928,8.432027752318177,1.867458790876606,8.4348811272535,1.9237979353646995,0.6396992161329207,1.6366626320461641,9.913956279249632,1.4118972623621162,0.42124357735660256,7.632837221038338,1.025202543853878,3.095952411949585,3.282637847040384,1.256033422460261,4.968566142972602,0.5417708001562294,5.591554467138313,0.8882772646900428,4.101867404324566,5.330419963763225,5.9502580862513454,2.3029360813870303,1.0591082158189158,1.9264666739190006,5.558868987946033,3.9966749773297705,4.469987974908487,3.778848541899593,7.833619438801682,1.8259457699269621,9.508016786686206,0.09873497257701036,0.24053362189051963,5.181505733611369,4.529514256536878,3.7035020799068663,9.78432442090263,4.5048533589902995,8.954754701063143,2.740487723531644,8.06621990145058,5.73436205782075,1.194285527080654,6.035350555950581],"beta":[3.152377686693044,3.3654883879082598,4.433839009733229,1.99231422594925,0.5210970862543995,3.654821566388823,4.380460979164813,3.598260260596434,1.29973215907902,4.2819414042588635,2.7627996972987234,2.2431265919922785,0.22417453491612838,2.0791026477834462,3.0443610324016834,4.770634898564009,3.9929503590186357,4.713715112418802,2.7894282518427094,1.1618945858403906,3.1935041958553043,0.8402411210255167,2.6121050489179067,0.6229103819517545,2.747129420674159,1.3321218967704995,3.2211790652174987,0.7631908136988086,0.46261242592585905,0.3832910362176756,3.938155430215321,3.435735400899654,0.05761230435186504,1.5251490302696824,1.1776106124796815,3.5717158670979,4.804423022372058,3.334542880061483,0.2926488177767361,3.2186420811902137,2.346988483985414,1.0097919668612032,4.695767500099643,1.1059001679542257,3.939232116046175,4.467164765761865,1.5281968635015497,4.914809255310949,3.6468792598128,0.8944725481571014,1.9082563594754476,3.168438406916796,4.637583003179481,0.7398187737601625,4.307317449514665,3.98149212021358,3.195332314294088,4.815392515068138,0.045703801556706836,0.2339066693204095,0.38851865278928366,1.2566573095622602,2.690441423813932,1.4500457404821676,3.242083139265538,1.185817422677301,3.1427200239082387,3.8456608889294666,1.787577896564163,2.7150425030643666,2.282805183659915,2.732796988561491,3.660723841558029,0.7768964033417392,4.111630318455388,3.7358530432281234,2.223902198957312,1.9560730551258565,4.5447413812753155,4.290510487604793,0.6782863550821938,3.9516011541646345,2.1884548956164407,1.2837334913729659,0.6173410703849425,1.1895814917222136,0.09857029817203933,3.871743741947812,2.1085920277094883,4.9466543177662,1.2339887053600695,0.7359862464017397,4.202786868776926,1.1436497538321022,1.122282429612842,1.7966898637438544,2.829121030957852,2.0125521111724654,3.5265265234748746,1.7440797779217931,4.498130603618775,2.7250343463918156,0.7140327618846509,4.9399232105017346,4.8862760265984395,4.665006374780816,2.3828854252697007,0.4855910801774055,2.96772678379448,2.811633294184903,3.6702661328502115,4.340060082941193,1.4631152778607903,4.592528515373462,1.539879927877451,2.527699330221825,4.624878723268124,0.20801118476957647,1.609810213019356,2.0715404943787687,2.4379163468717255,2.369923758904987,3.5843789126432157,1.8698367249481607,0.5855752223438138,2.722512948539315,4.938076679734879,2.4578968208143523,0.0914839221145769,4.531732950063682,0.9860559564463711,1.5910753447829773,2.582309738836359,0.2109417598770491,0.9229430292043572,2.877640086599913,4.818945779625153,4.167400893971998,1.4499485233109266,1.0671815948435148,3.578657770362926,4.100245106726041,4.5662743900984415,4.3220175308984885,1.5192976083572363,4.7871785683630055,0.16889796011641756,0.01921391678308626,2.5270312481680968,4.521742507450059,3.6402242165635923,1.8018723748698606,1.2611870286072346,1.3978897716254923,3.400194838376084,1.1526418841952657,2.6337725068565065,2.6798340131129006,1.2920263968044055,3.5586282117144643,2.0286956789034916,4.0787864283684865,1.9760205434542422,3.0210981481896426,1.313993186154393,0.8098305382427695,0.7929121712504883,2.5580172758541875,2.8672277254314404,2.1285911871736585,1.980389058139227,4.565139520378468,0.5776262430104007,0.9099323316851426,0.31400337563407654,1.0437889395178568,3.7337269973172162,1.6964639730464492,4.386710861772444,0.8206528345532582,4.367682818316463,4.178169561931858,1.7351327113202808,2.1422061798501435,3.7640510128310476,2.9310785450398704,0.00019269827996049038,2.5863071222709433,3.224837272361587,2.0563792496804423,0.2717445164539134,4.03584060198813,2.776934391861521,0.7785745310489556,4.533356919138597,1.7959109275374308,4.604781585606848,3.6578387957999627,2.444015379401284,1.351978235006004,4.922165636404724,3.8765395185289506,2.3607491710977815,0.16695626962252685,2.444990577927897,2.8383199326499797,1.5941106374886393,4.315682426425791,2.2961088009730024,2.556901085234463,0.13309275298526435,4.821309791473512,3.0288867882140513,2.63691754884292,3.0667299722798083,3.9531148464566335,4.997476431077368,4.560006130027462,2.6203077460676614,1.8531901434102283,1.685030515199073,1.3101277168324121,0.77716296462088,3.278272295137463,2.334138298880836,1.688575285690247,3.639139218372953,1.8404849810370483,4.8589573870704195,4.945509717391287,1.273474257318521,3.735989443165714,2.2375823378271575,4.127503464547049,3.562544800801862,4.093808636490703,1.9867321354930179,0.4972881145531649,0.2875168109738768,4.346663415708165,1.8555923701634003,2.827200854065286,2.4174592059779956,1.2675649132508227,3.329607565385345,1.9342601611198196,2.8938757241639212,4.091731761529315,3.278318189903323,1.4059904199142226,1.0147358936242812,1.6650075391712382,2.644339870538289,2.143350557340682,3.999025323652515,4.4957445690069235,4.040387355006597,0.3596574323167778,2.454781195040278,1.3546549830025534,0.1708766036724496,3.6308574602553545,4.634789604411809,1.236165426887269,1.2271886041372293,2.9790195967535817,3.8528045503104846,2.0800962827931544,0.9134979291728573,0.5519318522418526,2.535140483837246,0.9663121317342682,1.2627138375226543,3.138993398779677,0.28108774354565824,3.6094529439785616,0.5816275883020572,0.5613257347211831,1.9887925220064684,2.8458353021933624,2.2622093414907463,4.446606388439322,1.9242622037425794,1.2463027375580893,1.2389769455850896,1.0314330204996591,0.6916659245087375,1.5834733643693966,2.58177002418148,3.911851577233821,1.116193298068373,4.678979801983639,1.0622191854320717,2.5729661635313503,0.503336285878967,0.953992339792723,3.055161912743418,4.18270823952387,4.442418476034576,4.338605516185395,2.5667367244246986,1.7083764836849857,4.131457093695045,3.6843320874458185,1.746959409026767,0.6554702109286281,0.8353365007881175,4.612447571881413,2.5804771382533787,0.38982722909072787,1.8040175152225324,1.2445043413686707,3.522873242032251,1.0482574175371395,4.14894786355055,4.981704149050827,4.106687657862685,2.1926590309126857,1.5434896495169903,0.6378468195053688,2.07615285960145,3.670791434335351,2.8561604518674644,4.003645636829529,2.079450895023384,0.9519299144393445,1.9651933742316707,3.8092725613070986,1.9231332263847634,0.31156629583441786,0.5456229113683997,4.648631655585182,2.69326113283085,0.7159301588832756,2.3518590850466756,1.9604229824515707,4.947980205551658,1.2972507685913148,3.591871531073468,2.5513520108477286,2.687125489224964,0.9802979613633411,1.2064598664438497,2.1737451927470786,1.9195488786792891,3.5926132683869794,2.098569132598751,2.4985631909046626,1.001075264363146,1.0862523982985561,0.8814073414021018,1.8546503664059988,3.8441041527409614,0.8330108416079829,1.7455077322522783,0.44859014677274156,1.6902487937590849,2.2514014017087924,4.048379763647766,3.601036745755175,3.221050566439816,4.560186695456832,2.4246188972862095,1.1583178659330617,0.28866832040138735,2.0648416209268716,1.3827621398346857,3.17590152242336,2.293427910792327,0.08262157980879814,2.059883047813055,1.0580938603392676,3.2821693619259094,2.7332427713990946,2.024705410956673,2.023935503046933,2.928518003725161,0.5564950726387319,4.77682621456499,4.683417399185657,4.852560073470586,4.089026218677761,1.0145014032125688,4.826307917872056,3.376779449737989,2.2038906703729766,1.0806174543950786,4.508607700011669,4.25204933639715,2.1838115535830935,3.229104630917683,2.0382388621536975,1.9944215963729262,3.9036410209110173,4.688380713151847,0.9264434145115585,0.18929803864341954,0.6193811227797585,4.2207019200328855,3.2152839860291396,0.29856355897801556,2.0609724809107965,1.135182081211965,3.5620531097454142,0.2777278821126594,3.9562415511649474,2.4234780182673807,4.098627683254344,2.4406745732516133,3.2906688952137495,2.663229136121781,3.690911949455699,0.5297863283860449,1.547880270305818,1.7994862583340243,1.928480838150265,4.134167436385132,1.1048473108057955,3.457165315053865,1.828763785083809,2.3045637180661194,1.113180803416064,2.1426606029267257,1.2722935547435743,0.772509376290319,4.401507900150705,3.17749873218651,4.345764664060684,2.5119084203761255,2.674881633193137,1.9012796884000993,4.322553463396871,3.801939570332904,3.5284270510474416,4.64671547332832,1.5895408017499735,4.8740867505263905,0.0812565640249574,4.141918844296465,2.230190425834663,3.2710176748428643,2.8984188937892874,2.788573088409827,2.233957218482139,0.9508803582433167,0.47709866117996436,0.8821383102829816,0.6799736891123109,4.973713466771471,2.205485921935113,3.3731229424992715,0.47822619628759333,0.6230373458771166,3.4830851355935186,1.8474208350843568,4.98702314563538,1.2435548522554896,3.9518585132044306,2.7382645220524227,1.7703829613983335,3.343317762664765,2.0432122758211237,0.20186225247943335,0.7950431621311871,4.6370066206593155,0.41632538563942,4.029494021747385,2.5314372066292656,3.7665503047169624,2.528812804284258,2.060275289995589,4.881019522984074,3.7360605243815606,2.8155717777966913,3.7297836651584273,4.391013082847835,0.23503390442789707,0.8153621832973679,0.9652921034616202,3.1328757774679583,1.5905809516678826,0.4434162083601467,1.1527009070592797,0.28957765499528776,4.478152991968355,1.1656428401955143,3.4599130924345434,0.482298411678167,3.016191676531279,4.644438649563849,4.992997693530629,3.6480413712272055,2.6357702605524835,2.311116451814621,3.3940552986271335,4.345709991830247,1.8448660805219552,1.627954392287605,4.081256861276681,4.719725567149846,4.7659747214310375,2.2545557469172572,2.4782695365117813,3.0747101083616113,1.9838884561417969,3.4306897359045916,4.308428351403515,1.4068762969626514,0.8653054624514078,4.909230431107936,0.8022408053177299,4.154470172927516,1.6689629334185563,0.7179299873802558,3.333918261652445,3.1855883798690456,1.8982965646860117,1.8958620673950766,2.3813012176977466,1.0745596614067643,3.4133116141969366,1.3736635325101831,2.1042747267839945,4.370666872940399,0.5727921892574184,4.503111958179726,3.380735531183665,3.327360074348966,0.5144651556290525,2.8183045083838487,1.7398062538258807,1.707896384344736,0.15300263578967854,0.6612624881663609,2.17524160530014,1.9723204977582565,4.409552945404779,4.669337745648628,2.4358291567679546,2.507448697779383,2.4345419627759544,2.118143912146302,4.455138025846226,3.4468673590263665,2.572311910258928,0.5918934773625906,2.623847966338506,0.44313067090753777,4.4147632741628104,2.336992096993277,0.0389193553339795,4.082782739633702,0.7899854748340029,4.170950570377562,2.9969497402254817,4.913800442856308,2.974636549436902,4.173036950862245,2.2971140703960993,1.1884661905810412,2.4412071916220803,1.6514113013013032,2.8793099293980715,0.7455862839278016,4.621540687982574,3.5024725501103227,3.828136121908925,2.9843906298639356,2.6757002305797983,4.915650182592693,2.649780276050194,0.5453151186982896,4.950478807289654,1.5413381746926258,4.605045633708294,1.091252010525443,1.8210276660774738,2.136481174737378,0.2781011557575108,0.6954728794899434,3.61804013166505,3.6964801325078067,2.7502106207211954,0.5238020591064718,2.205055025069389,2.7611427034314517,0.46309145206822055,1.9149436108458506,2.438435244335919,2.4639068316665167,4.7712532460154735,2.1958610378584984,4.142841624108874,1.9329283260744057,1.4661618271047394,0.45121904959227854,1.1779025184062442,3.5125259346088713,4.267027633793768,2.7759237136656534,4.098823100573839,4.269436792937764,0.8454057993323805,4.561239993092181,2.231507694638082,2.9899257754592243,4.483996971072406,2.2666582390399004,3.551542593154667,1.878221497149114,3.110424049759067,0.37324763638856284,3.940997019811671,3.780337118832513,3.3731223792749274,0.5834617370427897,2.828880759640715,0.8863096558088723,4.7951900815713895,2.6946417997104444,3.6535253917410806,3.203985614908066,4.784765935542162,4.357890493804027,4.563163257088307,2.250880080995569,0.5538593728921415,1.58082294782242,1.8261323607593904,2.8972525561258857,4.7801633949637745,0.0578887233404668,4.46289818817862,0.562776887711498,2.097280862738887,3.8444173108891255,0.031210697895819317,1.8001002791159926,2.409048562718982,0.5272388518585536,0.05292409721408209,3.4275265497953535,2.146941248930111,1.5224885512420527,2.749492867935468,1.8188676953172378,4.765836720160098,2.902765884169638,3.0936355831270204,2.8594743804674208,2.8294590774351134,4.513481851382641,4.122262945517376,2.6494531316957293,1.3528348321061978,1.661401434080536,4.9438468663648605,4.48649735909004,3.7021168716437334,3.620228550256689,4.798015373713545,3.758974477235931,1.5087020649637284,4.498068253760906,2.8232392060170577,4.204678103181116,4.268753864923706,3.62877852090592,2.0809923140561946,0.8394884696561455,1.85896281997458,0.6889339869996536,1.609180405268995,3.874749634130236,2.9653431328942648,1.0192916324125068,2.9949147572989174,1.8496075843306092,3.9521349871882117,0.839831119046196,4.330755071312987,0.5347672504857792,1.9455282383424555,3.2205887828320447,4.321396640544303,3.3903566368497815,2.8147491731576633,4.777135320205654,2.4334215976558826,1.6659388127284769,4.900783553306985,2.720794015233825,1.717177695954104,0.5033317219494549,2.5454238192245606,3.9251163410399723,0.8975247412689313,1.587019153626591,4.840605611682799,0.8504600139258511,3.3626465234607106,3.0572921328036493,2.8359431467649943,4.38048571061703,4.0356384136247065,4.949986503218299,2.6638772172559912,0.3269138799673299,2.4749287303461376,0.955912872921526,2.370650255170348,0.8319845915066681,0.985593338364511,3.2776221139452666,2.7645420274811308,2.497596056014808,2.6647512334715007,4.979822222375293,3.8557617418432253,1.0966933371544196,3.8491475921915153,3.4086333164000884,2.313729145422503,4.2537448439911065,2.99534391608665,0.6257088259465193,1.7673367143307661,2.2693195619489326,4.024995773821056,4.59275812317708,2.2829512491337933,3.054570608630284,2.6504845438832425,1.6753302781598178,3.8556755737819537,2.172467412245902,3.87843433029642,0.772067123330964,3.896485311104593,1.405768302499325,3.7592467907273273,2.5220819395575864,2.2026815604298067,4.135980215278371,0.14400348378686312,0.9570411475008778,3.288568115723608,0.8741989196210564,4.807002921727699,4.750944721451029,1.943149924552322,4.663596768554927,0.15492504058094658,1.3116467970369317,4.3350517874731125,0.9718966807476814,4.503133177363768,3.5729445477176602,4.471232101316696,0.6548322088572378,0.05752872793853059,4.32740415952099,3.172537598407791,0.9235258754605746,0.3469699014095573,0.583590573039795,1.4053595690868903,2.1589110270633927,2.2617723640602594,0.1910050674327879,0.8082638181556578,2.535002026542873,1.8153647469416112,4.673467105578311,4.740081003701997,2.5641234963554793,2.3923309342178833,4.855879658272245,4.077763408722197,1.306252056909386,2.9730843726180134,2.3271634140772903,1.2749380696655865,3.7633121598114716,1.1228950262269022,1.754668584529796,3.186173446681031,2.2015193575445213,4.153769793732197,1.5957676062641601,2.8383444777932034,3.1446578009158745,4.981922503017095,3.082864218993926,0.17307221147337737,1.642652247394395,1.2902260205316163,0.20826490350664195,2.586291069960099,1.7469690130723636,3.465374542358044,1.331884535020158,0.7732807605060843,3.977987645337179,1.8622411605973854,4.564341334018918,4.195306004504325,0.3273818042738019,1.0162809814630758,1.319068743376136,0.34151430004537353,4.248857255378579,3.121227990705524,3.920008933928197,3.589535399904115,3.8867621780697146,2.8591175073589072,3.7208375907619704,0.12256760957500723,4.68555887759869,2.2771860718826407,1.8723716837488313,0.07989620474158521,2.384144385848707,4.95056092288089,2.822605804684968,2.072989935363352,0.03812510866988972,4.366636092268708,1.3707494399145315,0.6210692338664103,1.099792998613851,1.324359299788388,2.1263273146853923,3.42933900029362,0.7823659341734157,4.446953673126747,0.8570072266590245,2.014622460912896,0.5605809450897903,1.4887221156018249,3.231072129083153,1.8336499868629763,1.769035656851904,1.3288470014968734,1.405831652314039,3.3876004477465327,1.6018915156328428,4.5253394270678,0.3907980393707644,0.6317615168874713,3.9909471752247203,0.6196915256280522,2.6814494822247004,1.6421465242797717,4.053701926204488,2.565988012515729,2.0595660192464083,4.507312933317823,3.444718736602405,2.47390591115779,0.3057258251363171,4.492611478893709,3.9661126927840575,0.6188032940390609,0.5430070975488721,4.338664561192331,4.494972213027262,3.369696509905691,3.314651726884703,3.1995678945671524,4.6154330822303855,2.3644646871580965,2.4308780752276595,4.610048229588937,1.3371684722324761,2.205621210543258,4.501954470115958,3.9185046050490877,3.844352622910935,2.3336909057323743,2.52366263871435,3.507155315081396,0.898146800972166,1.4851037953479562,4.6173133699732025,2.7082964750025784,2.2069305910302726,1.4392999462706224,1.8568897297085762,2.342116632959297,1.2729792493047065,4.3163558002768205,1.6599199612174198,3.0986230841697404,1.2624479127826005,2.7212510444386897,1.9485833230887795,3.6068826883276994,4.778841025839743,0.9553057627966011,3.6207476944187356,4.457952260882872,3.939711465209521,4.995797240940955,1.8511049550948522,3.5985765088402575,4.44622001896338,3.7654639093762965,0.3148464897366765,3.938507037431689,2.879154180609852,1.6815864017402815,3.2570938983383932,3.1423927173057753,3.039354896662779,1.487779837967923,4.399906136586681,3.747393297481225,4.995425122931688,3.0623690591565964,4.41980724228066,2.1870545560840258,2.6898379354807656,3.8902412529848682,4.01910642767506,0.3285638650796263,4.009322855851076,0.839844416005131,2.4816882530529893,4.518407993965474,0.7747093952220296,3.264889392011546,1.3170368258654774,4.871163237650418,2.914895402988933,2.7552033227830375,1.9567326165188548,1.4756609373184815,1.6081480589374808,4.4223039665420725,0.4283700171474025,1.5178833391741287,0.7103590788933867,2.7299597943822915,2.1135368945792132,4.133485903890833,3.704727966797501,2.088795437437856,3.913050242490088,4.357260110407545,2.0136040952396836,0.5896364985691815,1.6004172906205139,2.5919521455200876,4.7480231653645,0.6224459059485987,1.956340771914643,3.1580238344936786,1.0426084830078974,2.8399633226403598,2.3774315731593267,3.379147114187784,3.180624105724622,1.6489230726115145,3.3025037470189114,1.9034502368371964,3.626223003563519,3.7076906971114343,2.7568700245016178,2.5248071374910697,3.343846770210451,0.613821756441083,0.4664202067303802,1.363806274334235,2.353668237032285,3.942259656961461,2.58105408355818,4.186071355566328,0.10386634132757422,1.8959422225780687,3.4422351464755496,3.4380610142942682,4.783169459169537,0.16448735786632973,3.76010097327931,2.8578132987043006,1.0967698950716376,4.1582814758493925,1.6659178034524469,4.365572593935391,3.1509477054933512,4.904172607659575,2.220398397205786,0.32307366456938214,3.319127212223645,2.5569547975492144,3.5714734287796945,2.1245209853537217,0.49335743248069885]}
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

tape( 'if provided a finite `mu` and `beta`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `mu` and `beta`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, -1.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, 0.0 );

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

tape( 'the created function evaluates the pdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var beta;
	var pdf;
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
		pdf = factory( mu[i], beta[i] );
		y = pdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var beta;
	var pdf;
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
		pdf = factory( mu[i], beta[i] );
		y = pdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given large variance ( = large `beta`)', function test( t ) {
	var expected;
	var delta;
	var beta;
	var pdf;
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
		pdf = factory( mu[i], beta[i] );
		y = pdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/pdf/test/test.factory.js")
},{"./../lib/factory.js":91,"./fixtures/julia/large_variance.json":94,"./fixtures/julia/negative_mean.json":95,"./fixtures/julia/positive_mean.json":96,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58,"tape":232}],98:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/pdf/test/test.js")
},{"./../lib":92,"tape":232}],99:[function(require,module,exports){
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

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = pdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `mu` and `beta`, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `beta`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a nonpositive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the pdf for `x` given positive `mu`', function test( t ) {
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
		y = pdf( x[i], mu[i], beta[i] );
		if ( expected[i] !== null) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given negative `mu`', function test( t ) {
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
		y = pdf( x[i], mu[i], beta[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large variance ( = large `beta` )', function test( t ) {
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
		y = pdf( x[i], mu[i], beta[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/gumbel/pdf/test/test.pdf.js")
},{"./../lib":92,"./fixtures/julia/large_variance.json":94,"./fixtures/julia/negative_mean.json":95,"./fixtures/julia/positive_mean.json":96,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":48,"@stdlib/constants/float64/pinf":49,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":58,"tape":232}],100:[function(require,module,exports){
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

},{"./is_number.js":103}],101:[function(require,module,exports){
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

},{"./is_number.js":103,"./zero_pad.js":107}],102:[function(require,module,exports){
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

},{"./main.js":105}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{"./format_double.js":100,"./format_integer.js":101,"./is_string.js":104,"./space_pad.js":106,"./zero_pad.js":107}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{"./main.js":109}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{"./main.js":112}],111:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"dup":104}],112:[function(require,module,exports){
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

},{"./is_string.js":111,"@stdlib/string/base/format-interpolate":102,"@stdlib/string/base/format-tokenize":108}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":113}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":116}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":120}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{"./define_property.js":118}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":117,"./has_define_property_support.js":119,"./polyfill.js":121}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":110}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":123,"./polyfill.js":124,"@stdlib/assert/has-tostringtag-support":20}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":125}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":125,"./tostringtag.js":126,"@stdlib/assert/has-own-property":16}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){

},{}],129:[function(require,module,exports){
arguments[4][128][0].apply(exports,arguments)
},{"dup":128}],130:[function(require,module,exports){
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
},{"base64-js":127,"buffer":130,"ieee754":218}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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
},{"_process":224}],133:[function(require,module,exports){
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

},{"events":131,"inherits":219,"readable-stream/lib/_stream_duplex.js":135,"readable-stream/lib/_stream_passthrough.js":136,"readable-stream/lib/_stream_readable.js":137,"readable-stream/lib/_stream_transform.js":138,"readable-stream/lib/_stream_writable.js":139,"readable-stream/lib/internal/streams/end-of-stream.js":143,"readable-stream/lib/internal/streams/pipeline.js":145}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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
},{"./_stream_readable":137,"./_stream_writable":139,"_process":224,"inherits":219}],136:[function(require,module,exports){
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
},{"./_stream_transform":138,"inherits":219}],137:[function(require,module,exports){
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
},{"../errors":134,"./_stream_duplex":135,"./internal/streams/async_iterator":140,"./internal/streams/buffer_list":141,"./internal/streams/destroy":142,"./internal/streams/from":144,"./internal/streams/state":146,"./internal/streams/stream":147,"_process":224,"buffer":130,"events":131,"inherits":219,"string_decoder/":231,"util":128}],138:[function(require,module,exports){
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
},{"../errors":134,"./_stream_duplex":135,"inherits":219}],139:[function(require,module,exports){
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
},{"../errors":134,"./_stream_duplex":135,"./internal/streams/destroy":142,"./internal/streams/state":146,"./internal/streams/stream":147,"_process":224,"buffer":130,"inherits":219,"util-deprecate":240}],140:[function(require,module,exports){
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
},{"./end-of-stream":143,"_process":224}],141:[function(require,module,exports){
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
},{"buffer":130,"util":128}],142:[function(require,module,exports){
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
},{"_process":224}],143:[function(require,module,exports){
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
},{"../../../errors":134}],144:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],145:[function(require,module,exports){
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
},{"../../../errors":134,"./end-of-stream":143}],146:[function(require,module,exports){
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
},{"../../../errors":134}],147:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":131}],148:[function(require,module,exports){
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

},{"./":149,"get-intrinsic":213}],149:[function(require,module,exports){
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

},{"function-bind":212,"get-intrinsic":213}],150:[function(require,module,exports){
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

},{"./lib/is_arguments.js":151,"./lib/keys.js":152}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],153:[function(require,module,exports){
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

},{"has-property-descriptors":214,"object-keys":222}],154:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],155:[function(require,module,exports){
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

},{"./ToNumber":185,"./ToPrimitive":187,"./Type":192}],156:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/isNaN":203,"../helpers/isPrefixOf":204,"./ToNumber":185,"./ToPrimitive":187,"./Type":192,"get-intrinsic":213}],157:[function(require,module,exports){
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

},{"get-intrinsic":213}],158:[function(require,module,exports){
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

},{"./DayWithinYear":161,"./InLeapYear":165,"./MonthFromTime":175,"get-intrinsic":213}],159:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":208,"./floor":196}],160:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":196}],161:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":159,"./DayFromYear":160,"./YearFromTime":194}],162:[function(require,module,exports){
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

},{"./modulo":197}],163:[function(require,module,exports){
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

},{"../helpers/assertRecord":200,"./IsAccessorDescriptor":166,"./IsDataDescriptor":168,"./Type":192,"get-intrinsic":213}],164:[function(require,module,exports){
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

},{"../helpers/timeConstants":208,"./floor":196,"./modulo":197}],165:[function(require,module,exports){
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

},{"./DaysInYear":162,"./YearFromTime":194,"get-intrinsic":213}],166:[function(require,module,exports){
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

},{"../helpers/assertRecord":200,"./Type":192,"has":217}],167:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":220}],168:[function(require,module,exports){
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

},{"../helpers/assertRecord":200,"./Type":192,"has":217}],169:[function(require,module,exports){
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

},{"../helpers/assertRecord":200,"./IsAccessorDescriptor":166,"./IsDataDescriptor":168,"./Type":192}],170:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":205,"./IsAccessorDescriptor":166,"./IsDataDescriptor":168,"./Type":192}],171:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/timeConstants":208}],172:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"./DateFromTime":158,"./Day":159,"./MonthFromTime":175,"./ToInteger":184,"./YearFromTime":194,"./floor":196,"./modulo":197,"get-intrinsic":213}],173:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/timeConstants":208,"./ToInteger":184}],174:[function(require,module,exports){
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

},{"../helpers/timeConstants":208,"./floor":196,"./modulo":197}],175:[function(require,module,exports){
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

},{"./DayWithinYear":161,"./InLeapYear":165}],176:[function(require,module,exports){
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

},{"../helpers/isNaN":203}],177:[function(require,module,exports){
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

},{"../helpers/timeConstants":208,"./floor":196,"./modulo":197}],178:[function(require,module,exports){
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

},{"./Type":192}],179:[function(require,module,exports){
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


},{"../helpers/isFinite":201,"./ToNumber":185,"./abs":195,"get-intrinsic":213}],180:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":208,"./DayFromYear":160}],181:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":208,"./modulo":197}],182:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],183:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":185}],184:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/isNaN":203,"../helpers/sign":207,"./ToNumber":185,"./abs":195,"./floor":196}],185:[function(require,module,exports){
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

},{"./ToPrimitive":187}],186:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":157,"get-intrinsic":213}],187:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":209}],188:[function(require,module,exports){
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

},{"./IsCallable":167,"./ToBoolean":182,"./Type":192,"get-intrinsic":213,"has":217}],189:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":213}],190:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/isNaN":203,"../helpers/sign":207,"./ToNumber":185,"./abs":195,"./floor":196,"./modulo":197}],191:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":185}],192:[function(require,module,exports){
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

},{}],193:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":159,"./modulo":197}],194:[function(require,module,exports){
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

},{"call-bind/callBound":148,"get-intrinsic":213}],195:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":213}],196:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],197:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":206}],198:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":208,"./modulo":197}],199:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":155,"./5/AbstractRelationalComparison":156,"./5/CheckObjectCoercible":157,"./5/DateFromTime":158,"./5/Day":159,"./5/DayFromYear":160,"./5/DayWithinYear":161,"./5/DaysInYear":162,"./5/FromPropertyDescriptor":163,"./5/HourFromTime":164,"./5/InLeapYear":165,"./5/IsAccessorDescriptor":166,"./5/IsCallable":167,"./5/IsDataDescriptor":168,"./5/IsGenericDescriptor":169,"./5/IsPropertyDescriptor":170,"./5/MakeDate":171,"./5/MakeDay":172,"./5/MakeTime":173,"./5/MinFromTime":174,"./5/MonthFromTime":175,"./5/SameValue":176,"./5/SecFromTime":177,"./5/StrictEqualityComparison":178,"./5/TimeClip":179,"./5/TimeFromYear":180,"./5/TimeWithinDay":181,"./5/ToBoolean":182,"./5/ToInt32":183,"./5/ToInteger":184,"./5/ToNumber":185,"./5/ToObject":186,"./5/ToPrimitive":187,"./5/ToPropertyDescriptor":188,"./5/ToString":189,"./5/ToUint16":190,"./5/ToUint32":191,"./5/Type":192,"./5/WeekDay":193,"./5/YearFromTime":194,"./5/abs":195,"./5/floor":196,"./5/modulo":197,"./5/msFromTime":198}],200:[function(require,module,exports){
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

},{"./isMatchRecord":202,"get-intrinsic":213,"has":217}],201:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],202:[function(require,module,exports){
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

},{"has":217}],203:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],204:[function(require,module,exports){
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

},{"call-bind/callBound":148}],205:[function(require,module,exports){
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

},{"get-intrinsic":213,"has":217}],206:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],207:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
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

},{"./helpers/isPrimitive":210,"is-callable":220}],210:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":211}],213:[function(require,module,exports){
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

},{"function-bind":212,"has":217,"has-symbols":215}],214:[function(require,module,exports){
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

},{"get-intrinsic":213}],215:[function(require,module,exports){
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

},{"./shams":216}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":212}],218:[function(require,module,exports){
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

},{}],219:[function(require,module,exports){
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

},{}],220:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
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

},{"./isArguments":223}],222:[function(require,module,exports){
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

},{"./implementation":221,"./isArguments":223}],223:[function(require,module,exports){
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

},{}],224:[function(require,module,exports){
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

},{}],225:[function(require,module,exports){
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
},{"_process":224,"through":238,"timers":239}],226:[function(require,module,exports){
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

},{"buffer":130}],227:[function(require,module,exports){
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

},{"es-abstract/es5":199,"function-bind":212}],228:[function(require,module,exports){
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

},{"./implementation":227,"./polyfill":229,"./shim":230,"define-properties":153,"function-bind":212}],229:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":227}],230:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":229,"define-properties":153}],231:[function(require,module,exports){
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
},{"safe-buffer":226}],232:[function(require,module,exports){
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
},{"./lib/default_stream":233,"./lib/results":235,"./lib/test":236,"_process":224,"defined":154,"through":238,"timers":239}],233:[function(require,module,exports){
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
},{"_process":224,"fs":129,"through":238}],234:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":224,"timers":239}],235:[function(require,module,exports){
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
},{"_process":224,"events":131,"function-bind":212,"has":217,"inherits":219,"object-inspect":237,"resumer":225,"through":238,"timers":239}],236:[function(require,module,exports){
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
},{"./next_tick":234,"deep-equal":150,"defined":154,"events":131,"has":217,"inherits":219,"path":132,"string.prototype.trim":228}],237:[function(require,module,exports){
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

},{}],238:[function(require,module,exports){
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
},{"_process":224,"stream":133}],239:[function(require,module,exports){
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
},{"process/browser.js":224,"timers":239}],240:[function(require,module,exports){
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
