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

},{"@stdlib/utils/native-class":153}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":153}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":153}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":153}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":94}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":75}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":68}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/number/float64/base/from-words":98,"@stdlib/number/float64/base/get-high-word":102,"@stdlib/number/float64/base/to-words":113}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./expmulti.js":72,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/trunc":92}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":74,"@stdlib/math/base/special/ldexp":77}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./exp.js":71}],74:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":47,"@stdlib/constants/float64/max-base2-exponent-subnormal":46,"@stdlib/constants/float64/min-base2-exponent-subnormal":48,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-infinite":57,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/copysign":69,"@stdlib/number/float64/base/exponent":96,"@stdlib/number/float64/base/from-words":98,"@stdlib/number/float64/base/normalize":104,"@stdlib/number/float64/base/to-words":113}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./pow.js":85}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":82,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/number/float64/base/get-high-word":102,"@stdlib/number/float64/base/set-high-word":108,"@stdlib/number/float64/base/set-low-word":110}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":84,"@stdlib/number/float64/base/set-low-word":110}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./log2ax.js":80,"./logx.js":81,"./pow2.js":86,"./x_is_zero.js":87,"./y_is_huge.js":88,"./y_is_infinite.js":89,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-infinite":57,"@stdlib/math/base/assert/is-integer":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/assert/is-odd":63,"@stdlib/math/base/special/abs":65,"@stdlib/math/base/special/sqrt":90,"@stdlib/number/float64/base/set-low-word":110,"@stdlib/number/float64/base/to-words":113,"@stdlib/number/uint32/base/to-int32":117}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":83,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ln-two":45,"@stdlib/math/base/special/ldexp":77,"@stdlib/number/float64/base/get-high-word":102,"@stdlib/number/float64/base/set-high-word":108,"@stdlib/number/float64/base/set-low-word":110,"@stdlib/number/uint32/base/to-int32":117}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-odd":63,"@stdlib/math/base/special/copysign":69}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/number/float64/base/get-high-word":102}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/special/abs":65}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":67,"@stdlib/math/base/special/floor":75}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":95}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":102}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":100}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":99,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":101,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":106}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":51,"@stdlib/math/base/assert/is-infinite":57,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65}],107:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":101}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":109}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":107,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":112}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":111,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":115}],114:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":99}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":116}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":114,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":118}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the probability density function
*
* @example
* var pdf = factory( 5.0 );
*
* var y = pdf( 0.0 );
* // returns 0.0
*
* y = pdf( 5.0 );
* // returns Infinity
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return pdf;

	/**
	* Evaluates the probability density function (PDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated probability density function
	*
	* @example
	* var y = pdf( 10.0 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x === mu ) ? PINF : 0.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/utils/constant-function":145}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution probability density function (PDF).
*
* @module @stdlib/stats/base/dists/degenerate/pdf
*
* @example
* var pdf = require( '@stdlib/stats/base/dists/degenerate/pdf' );
*
* var y = pdf( 2.0, 0.0 );
* // returns 0.0
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/pdf' ).factory;
*
* var pdf = factory( 10.0 );
*
* var y = pdf( 10.0 );
* // returns Infinity
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":119,"./pdf.js":121,"@stdlib/utils/define-nonenumerable-read-only-property":146}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a degenerate distribution centered at `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of the distribution
* @returns {number} evaluated probability density function
*
* @example
* var y = pdf( 2.0, 3.0 );
* // returns 0.0
*
* @example
* var y = pdf( 3.0, 3.0 );
* // returns Infinity
*
* @example
* var y = pdf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, NaN );
* // returns NaN
*/
function pdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x === mu ) ? PINF : 0.0;
}


// EXPORTS //

module.exports = pdf;

},{"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/pdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a logistic distribution.
*
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {Function} PDF
*
* @example
* var pdf = factory( 10.0, 2.0 );
* var y = pdf( 10.0 );
* // returns 0.125
*
* y = pdf( 5.0 );
* // returns ~0.035
*/
function factory( mu, s ) {
	if ( isnan( mu ) || isnan( s ) || s < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( s === 0.0 ) {
		return degenerate( mu );
	}
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a logistic distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( -1.2 );
	* // returns <number>
	*/
	function pdf( x ) {
		var ez;
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x === NINF ) {
			return 0.0;
		}
		z = abs( ( x - mu ) / s );
		ez = exp( -z );
		return ez / ( s * pow( 1.0 + ez, 2.0 ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":49,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/pow":79,"@stdlib/stats/base/dists/degenerate/pdf":120,"@stdlib/utils/constant-function":145}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Logistic distribution probability density function (PDF).
*
* @module @stdlib/stats/base/dists/logistic/pdf
*
* @example
* var pdf = require( '@stdlib/stats/base/dists/logistic/pdf' );
*
* var y = pdf( 2.0, 0.0, 1.0 );
* // returns ~0.105
*
* var myPDF = pdf.factory( 10.0, 2.0 );
* y = myPDF( 10.0 );
* // returns 0.125
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":122,"./pdf.js":124,"@stdlib/utils/define-nonenumerable-read-only-property":146}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a logistic distribution with location parameter `mu` and scale parameter `s` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 2.0, 0.0, 1.0 );
* // returns ~0.105
*
* @example
* var y = pdf( -1.0, 4.0, 2.0 );
* // returns ~0.035
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
*
* @example
* var y = pdf( 2.0, 8.0, 0.0 );
* // returns 0.0
*
* @example
* var y = pdf( 8.0, 8.0, 0.0 );
* // returns Infinity
*/
function pdf( x, mu, s ) {
	var ez;
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( s ) ||
		s < 0.0
	) {
		return NaN;
	}
	if ( x === NINF ) {
		return 0.0;
	}
	if ( s === 0.0 ) {
		return ( x === mu ) ? PINF : 0.0;
	}
	z = abs( ( x - mu ) / s );
	ez = exp( -z );
	return ez / ( s * pow( 1.0 + ez, 2.0 ) );
}


// EXPORTS //

module.exports = pdf;

},{"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65,"@stdlib/math/base/special/exp":73,"@stdlib/math/base/special/pow":79}],125:[function(require,module,exports){
module.exports={"expected":[0.014249965891097172,0.019245578501450068,0.03044558368814782,0.012718863652555814,0.06916581526352394,0.022483113176480805,0.02180012789236144,0.030335625986375753,0.02264590118893237,0.03263105956402003,0.020040589470863436,0.020061510683761507,0.012846169214780505,0.03634554453569526,0.014741431237040964,0.04550993439320657,0.022699778022736993,0.026581613455408253,0.044944190322786494,0.016690489546818576,0.015000932534226706,0.013828479081713894,0.014634546591388886,0.022203714922405183,0.033142044397720456,0.030512101104261006,0.03522952592735156,0.025382834338645143,0.012898405491743592,0.051075262534316386,0.024996834933719334,0.023538474440023625,0.01347818032296456,0.014479399946385267,0.024556562513403563,0.017800186253391356,0.06158276264765663,0.014422803895136047,0.048608284327842824,2.1874855310001885e-5,0.017333899114454376,0.038889900625266406,0.03420588046883585,0.03187777563430977,0.014495366967417876,0.05462124804185223,0.013091371344250695,0.018356419683140595,0.0935021232326897,0.04505620211222242,0.023602791226351148,0.044102380606604805,0.016519094822951413,0.015068708244318687,0.019067666244292434,0.0133299782761758,0.012823162607264989,0.0654627210463622,0.018251725236961516,0.03266783066415845,0.021542909288095283,0.016345346260315374,0.12106601840297568,0.013763699796771863,0.033433371808886926,0.08964368303528875,0.0681251455591311,4.807630304287715e-7,0.01770524898566885,0.027248929309982673,0.020561961257533855,0.049600653415554335,0.017354002907715143,0.013074374945232817,0.014618636435844663,0.018571341749662244,0.11387266795961955,0.019989524813434432,0.022067144117043788,1.9500322144245796,0.013444328286189931,0.027632188600859375,0.022641301662992965,0.017365472661310995,0.019492075928801332,0.013359371369534415,0.08247826902110382,0.11113135597090716,0.012678217007756804,0.03357912453755514,3.9248551661587845e-6,0.013912425346965478,0.03361440535081218,0.05363482203126834,0.03143572380600057,0.025997511521398488,0.013759731472020191,0.04071053534535356,0.03414638420390602,0.0165920017783513,0.05640611635880934,0.027167465936374417,0.06668238952623967,0.013135418751922093,0.02164617881785862,0.08752341326141169,0.0126286117022351,0.013673975407451345,0.050272802684359734,0.037061328131119814,0.013452101688170235,0.018234319335323143,0.022849833609168,0.13883764615370264,0.1817952908458081,0.03561702793675777,0.013255517049710003,0.019152889684070563,0.014660295266414108,0.030329016190422876,0.013401443590141483,0.0952845640176007,0.030982202196366996,0.015248540712339926,0.04776821154156483,0.030108471576962323,0.012863684938024866,0.05463327023343479,0.03317994395766412,0.026646009415591938,0.01700083979218711,0.015481701544072496,0.038644266120444214,0.01469323685170448,0.07632644475517615,0.019205274931476175,0.025099350701578486,0.01838126963385057,0.024850766031203734,0.014040617656200498,0.41453900818768696,0.01974676054061182,0.02614348494944002,0.014045400672680005,0.03940171675501823,0.0407422021118562,0.04883750018250096,0.012935444587894888,0.016552948340615038,0.013249057970747642,0.03420853413706958,0.05990293297840011,0.02900061448536036,0.02462973310150883,0.014575251449904677,0.03087934218770436,0.02178526128751496,0.03261418682060401,0.013897941444033099,0.012842019558563537,0.02566528882745833,0.02355516207836698,0.023801959263413195,0.015223981800728785,0.03670055922542646,0.08401284147125415,0.013668898227735477,0.0853363526341906,0.04040571941250889,0.16923930051173636,0.01616947293475904,0.052953880247511645,0.025055329014914182,0.02493868074171499,0.10189956601780768,0.043276215141936164,0.02380806778559462,0.027204492790521468,0.01602420671814402,0.12955326127403166,0.028400799661564925,0.015718160191755565,0.014605786093121997,0.03252387702400633,0.0350896174406201,0.018340448282887573,0.013338893933398897,0.02077265221294758,0.04158068946295714,0.01954730515946394,0.01513431953219094,0.04939559823641107,0.012549260197579393,0.017800516090697452,0.06443794464204948,0.012762973914561555,0.06577122810480576,0.01584977845924201,0.002837192519857923,0.024928706826893448,0.01624118143842905,0.0721047372719049,0.012426111280276956,0.12421688383522295,0.02531943338236273,0.02167030448340967,0.015766638038500286,0.012821024761580788,0.014446878384888734,0.012448960728810602,0.02760533521636936,0.014581045177377678,0.02241245319737025,0.028814880514444547,0.06898755112596437,0.08944830622044495,0.028444858682470712,0.029174599428380178,0.15138941997858052,0.031187533849761452,0.021028593381511654,0.033229047498411254,0.022549838851895418,0.06914483336219276,0.022228695187113328,0.05970059642608286,0.017012608989988454,0.01774488860253163,0.014757138844186078,0.01250261601271158,0.03323668773317255,0.02367179403898571,0.015523514729004616,0.09663538432281733,0.023720208895574107,0.021957345552579954,0.01396878123958485,0.016329917194328143,0.013553338540884205,0.07915896571338842,0.04354280514992786,0.06528550418038623,0.016861499176346766,0.013144027958745383,0.027663321984845005,0.07214456960508957,0.01370905048524601,0.043387263713288625,0.01902944358210692,0.018588730826565432,0.01808940821197749,0.0663203838810352,0.026862831510777303,0.033292502196548945,0.055772388321895836,0.15588749632137106,0.01909607814396675,7.998220752289659e-13,0.014180503529426645,0.014257932611859965,0.022154527103407807,0.0461210242234152,0.016603527694882575,0.15679517776697732,0.051546847475839735,0.014379684361813978,0.013224367952172654,0.02471099621765006,0.019829097638741553,0.014838845519435177,0.04096283977683762,0.01575685010987179,0.07506495873628974,0.025847550073893256,0.014936709620871838,0.024563030215567168,0.021596791249644236,0.023851923951753916,0.013568178748532401,0.07577582786418788,0.056887503342241984,0.013461909973448491,0.01857673926943227,0.013458903852775348,0.019905270775507584,0.01464335349129164,0.04338869049503253,0.03509552280923437,0.020937529029554414,0.013324539465340257,0.023723768747908183,0.03538539793998849,0.024426504007830814,0.013125913410986904,0.01723556409806441,0.017150087719469145,0.015164363824129114,0.015877553297049738,0.02911170641722001,0.018383109894735322,0.05458540427192802,0.054580214491175415,0.06121695603750243,0.012954901255796285,0.013040926273178441,0.01994064030362195,0.04363991541446289,0.012707537821534854,0.013136208701395176,0.0603649036921278,0.020819891851678624,0.021538556551137393,0.01831796115994042,0.019382771266044218,0.029738862124682783,0.04151014398204199,0.015344732370061738,0.020626330862532884,0.018815968642736842,0.03544929198079534,3.154256773596052e-7,0.013077985864249483,0.31805818199368674,0.022792340407553565,0.026543626034024256,0.020794783868169704,0.013098823136622683,0.014026663389415852,0.031151187510898664,0.08058921118766957,0.01876094085611174,0.018710108775029793,0.03544371702798987,0.013833534776543931,0.013810250228628404,0.01352745297054147,0.014711466023727155,0.044459976825158926,0.060186700148788894,0.02374109775604283,0.01692314049961564,0.016864296132382234,0.01800097384721547,0.016069871401707674,0.021535919033628295,0.039500107398671935,0.05191363113480317,0.012950070402510675,0.0827537073405913,0.07299872108897867,0.013630396518050895,0.017695264040336972,0.016369033707010282,0.018987711819981178,0.012593301935252212,0.01619644658819323,0.055268263791572576,0.12398423133495554,0.014649461377118608,0.013032236929649343,0.015437860144783192,0.0404596780091289,0.014747501432108593,0.017776089940658112,0.24781933687140803,0.013856183520093823,0.015626105910723696,0.01488561752752835,0.3477738921855976,0.018797598248696683,0.016397218151222887,0.022111845475584428,0.01519658024448199,0.014473219500935927,0.03123605564296204,0.0441919791740004,0.0762252291691438,0.04150106873565948,0.03472681110011151,0.038681188198592974,0.06707761868373185,0.01847160006233096,0.038329093705525306,0.012528568278412977,0.013817198620664915,0.01737467675092199,0.012414306634102739,0.013811338884542211,0.012877199891860917,1.8123827034365224e-17,0.019365421414924453,0.02129215067902663,0.12268620078052538,2.218529856624893,0.026845101530515277,0.054007791922085775,0.02754385625561658,0.031568489554439694,0.032270071195949636,0.013167374636641648,0.101237938479482,0.01380129212869558,0.01578554583247801,0.012793813945676098,0.013437901208778828,0.21244073026777086,0.013981184692359717,0.02310432471770389,0.015034762757079734,0.025184089936195347,0.025143960888653588,9.168638191109894e-17,0.02901490305220042,0.08914691844879999,0.012638574910254052,0.04178896534302756,0.042784485928857086,0.028093117112780133,0.06806435884580693,0.024513142930180542,0.01502348353599846,0.013960761311154262,0.04574123984524423,0.04764005001168831,0.053037497398310395,0.027683980666352605,0.02104497983130701,0.08619573947868246,0.03367367289568062,0.015389697028064558,0.08539372563205175,0.08381849855941582,0.04381834673962656,0.05279478112845668,8.501159448980377e-18,0.0013739186333403908,0.01756999218635051,0.016267449863368956,0.014527529762491009,0.015180057728439835,0.01880813160564603,0.017728477582117843,0.05123963047694765,0.014297554766963077,0.051582462980212726,0.024866473277189504,0.012444870635850347,0.013944966909983338,0.058663795406930695,0.06473406256071919,0.017239640279404705,0.07034461516417258,0.0308710145666496,0.018677190756554878,0.03285211041825479,0.08525347968231911,0.017522380379041858,0.03425502992346783,0.05319639919903236,0.01378121750943244,0.051698616333622285,0.03522966022490912,0.029338262416664394,0.054451555658455886,0.013863198179876439,0.02762540742561876,0.023207133033197797,0.02026201052316928,0.01879281611982011,0.012403430470136664,0.013672930130026358,0.053661061360678886,0.04493762887666929,0.014135913499583562,0.0131058905732342,0.017872967241251148,0.09596666789311001,0.019796580070758508,0.01668239055113179,0.060377398618266076,0.01686990532680655,0.08534188213382582,0.012638408377410032,0.03779388104869536,0.06953522737147465,0.022877439854844958,0.02041939858608946,0.0447181229864132,0.04186095216596384,0.025812869152040317,0.014957374061620277,0.013295699363662272,0.013317135030950606,0.022802942564600134,0.038537699489785644,0.03558145666983747,0.042104847226816844,0.05823278694647824,0.07298511897961599,0.01548308816534454,0.01987875258681224,0.040059703980399666,0.1571066270994146,0.07432835377167331,0.06831894368346787,0.01971649537745357,0.013971024056948517,0.02321826704219532,0.02615081937298766,0.051224039385527345,0.013327877243172262,0.029366871389979125,0.018620469655238052,0.026180892659024436,0.014907714488443174,0.017446304022878955,0.0647306910127198,0.03828178416150487,0.01467607607856602,0.024939061420057213,0.01591621182081914,0.018484089479025804,0.022666074111129777,0.01945016131759482,0.02138246986887691,0.014727721300291619,0.02620368988647293,0.020777761513418706,0.014738096357525198,0.0729895598646719,6.5181153587089916e-15,0.033530610360536554,0.023457102151168845,0.07243379206686737,0.014348278566332593,0.06561245772980366,0.013190308875728422,0.032905413995631225,0.014773342636384334,0.01833490610385271,0.018798670549791927,0.019994241344770725,0.012603652013570409,0.020093491792733183,0.020319189740749706,0.014827349081453334,0.0409195570993179,0.025454164072609,0.04233718616824118,0.0004606098396651285,0.09948889564050328,0.01993209425547637,0.1601889627761118,0.012741912712740815,0.017989255802911434,0.018384713689910084,0.07302833921259198,0.04823620854427831,0.0205879240988967,0.012608907464293521,0.035451434113225835,0.024514492479073818,0.031146456759767786,0.014723458140189088,0.014950497274601177,0.01639859800900356,0.031855694695365935,0.039058180272788984,0.028965760856340752,0.02461672917221685,0.033551312794651345,0.013981953928553139,0.04575168167624579,0.013863586215695821,0.06751512729222084,0.015931215345034194,0.013009957194016182,0.02817730465951633,0.05170049228103348,0.26635794751717506,0.03944293259511335,0.02155833757453094,0.01412208826333727,0.026693291213584148,0.03386666256189749,0.03263337336728336,0.017520364431538964,0.014212993020454721,0.041876774330613424,0.1109217520926445,0.03434427125444392,0.04035815926023898,0.013311646749572522,0.09869890593434746,0.026003651817542352,0.015124231721108517,0.024976146391079656,0.061181557564272473,0.02034447780084265,0.03804058776407648,0.01384548181020698,0.015504425065399162,0.015529952284206923,0.019169900802596587,0.020003723010548098,0.04001448387068118,0.016491966971461953,0.06883353113186678,0.013411713138501683,0.016563851200632643,0.03471441360383994,0.03985634902191643,0.0630677716176781,0.02908407956494799,0.12264521571873163,0.08927331052662285,0.013978813026282785,0.014533198119356749,0.044740624039958626,0.02865092972350721,0.023429824127109474,0.023922502607907195,0.025162124026382963,0.05666557404444055,0.06307444473789245,0.01582300446566055,0.05098346587756186,0.025653438764255836,0.025710880724212574,0.48528568861446214,0.018154853675775198,0.019905794512396026,0.017133680050563226,0.02075909214160506,0.0171390848720188,0.08132490753957605,0.03273126436251563,0.016315216890714083,0.030267597277240207,0.513184847819044,0.02353086526462373,0.02066255951072702,0.015965232026963466,0.018114588136967466,0.01259536747663684,0.14017708073811774,0.02026847249872002,0.014433623535732552,0.018955345999426346,0.014271385093051057,0.07629138535558772,0.01313176641093906,0.023298042904137613,0.032986972609199965,0.04053794341997274,0.012856215675932623,0.05027226591103481,0.3176532030323714,0.032942771518964326,0.03708032897205323,0.05851313944056336,0.04124566652487153,0.03099309441901405,0.013140904090704087,0.040727797818541814,0.020240801823430753,0.015895020447609595,0.016949802538334554,0.021912441613991515,0.0277337534716477,0.05794952529370752,0.017226314591380867,0.10611866399910846,0.018748121400198155,0.021112020947972668,0.015369904162625857,0.026647760913895514,0.025656927954795065,0.012801548716719343,0.034062500421147064,0.03034252290722737,0.020775867179959724,0.03231303150819407,0.013828675899325118,0.08968362277539126,0.03149865009593247,0.03975395262685144,0.024897878898608325,0.01023214651277159,0.05875979139198622,0.014137034515193709,0.01806586736093701,0.012931011940232781,0.023419378202154933,0.055194624429895554,0.01617870601391254,0.024799482354163762,0.028676091111897655,0.01666428935719843,0.023483708551263246,0.07949582199262516,0.23149555736266456,0.023322169825053748,0.03414615346685676,0.06313194696321896,0.02994614468607837,0.018544945303215585,0.01413348944930088,0.036508906585195434,0.01358864260794714,0.017300046697587237,0.21279047770594947,0.03894746099215049,0.015150251340758277,0.021508535117220763,0.013681857875684383,0.014067244119286419,0.04303191797817771,0.01615332646407401,1.1798261637678968e-6,0.013072460119012265,0.0259482714361157,2.288863115192056,0.0173218742670937,0.023986713575137025,5.934160962537592e-5,0.05551490844277553,0.026060783301279672,0.0035099592843204712,0.04091545007285637,0.03003180772367755,0.027781818763749713,0.11042008987389315,0.10371957147036942,0.024065537264734486,0.0664044997808322,0.022441128402115124,0.026337067590725363,0.015179698182076906,0.038761256800087546,0.02296052888071502,0.0881113293754925,0.028624796739454866,0.13614870592445724,0.03448268473786884,0.019457182132713448,0.040080351880856735,0.019284680028181938,0.01737072225128194,0.017971103483087354,0.0363966418044174,0.012704981306236268,0.015319118000375602,0.14293306868931913,0.03337945340865323,0.000904378106666648,0.01663075950866087,0.024702056654668434,0.05668842638018885,0.0737141600721068,0.06997946001492103,0.013812013806742076,0.05006969965527208,0.01780398987866646,0.030920748763671572,0.04864236811966031,0.01330007106753408,0.06661494112054024,0.01504450370645958,0.01366112761005057,0.04392409713398,0.01973145763868711,0.025810873673849925,0.028120480059622865,0.05033891972518417,0.026073386411548043,0.042102486646326404,0.041557074125444744,1.0139635935324767,0.045987773212157856,0.10484918896656029,0.01788308654628465,0.024705333183789653,0.019928807173917443,0.1280753332947099,0.014446363466683132,0.02077651731622534,0.03613310593793209,0.039720555518878535,0.06920324502997978,0.013094375230060561,0.018961204357391112,0.025738771423530846,0.01715094244007431,0.1617349004507223,0.030504624054268428,0.025108900957461742,0.01310786075871884,0.021958417245612816,0.05613163999027613,0.030384604456914814,0.05316370641293577,0.015773898371934915,0.013620927754339391,0.08906687511591235,0.012629777007732325,0.01853956202908661,0.034273862839302345,0.013585720098510862,0.016010070698131866,0.018711163667661797,0.021178160991378803,0.013343604864351313,0.01779655098379273,0.0139522027378186,0.017072411584747153,0.02567083106245346,0.015039134571172163,0.013314841358134506,0.02013268668636645,0.027383831018171642,0.03284953449636398,0.012530215288165003,0.07550933204220765,0.014410282761864047,0.05055088834952641,0.021794819112453526,0.4218346972281472,0.04061205394706173,0.05172478863009532,0.028524547131101374,0.019719137396888353,0.05146538825237266,0.10413882983984107,0.027340507391318627,0.0174915274412729,0.032511192784469296,0.07780880014435994,0.01338115681955836,0.020030450136321563,0.013947435747647409,0.020927584739163726,0.016852668662927273,0.04342987538797588,0.3214904450742761,0.03809563629649708,0.01584373382528057,0.01938935056688102,0.03433185467835846,0.01384223319657641,0.04328202065184141,0.020616363851883982,0.01460319834238504,0.02185476673406711,0.03242779537373021,0.15936172925707476,0.2463038649251239,0.012901118342908765,0.013902097426800871,0.014412671553854287,0.01468636449765155,0.10355834462972963,0.34291473014076834,0.05400494084044412,0.04671350949945335,0.021689547116550394,0.04743921226074125,0.05989799982647972,0.02031732686067739,0.014816756810818617,0.017594359843095233,0.013985365599665452,0.01776036098646458,0.004179901909824691,0.012573618364984102,0.015168643797388099,0.013010699289492656,0.019189257235550455,0.15139777289224612,0.045542567714209066,0.03226735552445121,0.0295229844452745,0.01318826346006122,0.023020631569783127,0.16293996940110475,0.020325848678561433,0.04612339783170402,0.02451069241309712,0.01257074414125093,0.24541820871809888,0.01878072503003137,0.04337517888976657,0.05486077607106162,0.02165291841605828,7.530440526983374e-11,0.02664284159899235,0.03267019288249233,0.013215995151789424,0.06825245557188503,0.0217465014540441,0.012591443776049864,0.10031660413709266,0.012607008264712278,0.0433082403462861,0.014320502753802151,0.07034424237466809,0.01920125162155445,0.024032259732493226,0.05966333319065239,0.014557442789331462,0.1497196645507283,0.015191950834984029,0.05844947880353574,0.012967838384363311,0.013867667227020914,0.01750716354792777,0.03296244991666363,0.09496276429388774,0.05315556382776908,0.019565063334736486,0.023099414976930552,0.022806827662650818,0.012896128456337457,0.01974232372920626,0.2000047532255807,0.03293232255466759,0.04168339633561856,0.023300831923867466,0.055292664153295756,0.013500944289539126,0.047394097174544354,0.015871870784561006,0.013396384521097012,0.026634575481987974,0.023404714976081525,0.01615455816446458,0.013429762311407268,0.013306505148531052,0.016632122496151074,1.739658414760152e-7,0.019419127147001794,0.1681034114452345,0.01483763590132147,0.04276609234034418,0.031182751822787784,0.023510466358332274,0.11134658393781569,0.05298182075894031,0.015316753438621102,0.01611040285666262,0.028531993791988935,0.025977184043870366,0.03680708027790297,0.018859178768135088,0.01301270412220897,0.01485169708783717,0.014342166543890809,0.03685871378818517,0.01513390922242474,0.022479883687589117,0.015705324358123628,0.018455985798547323,0.19222406128305464,0.04855326234857326,0.017421579379310076,0.03549234920981585,0.015087025700594845,0.035893284122943764,0.042072249595782235,0.01877765605179291,0.01488288570524337,0.030186120494256313,0.04442676696326767,0.01585152266260423,0.02888056775036836,0.02438881445398586,0.018353246061889695,0.014829880309753603,0.044333903151364575,0.030711766602080377,0.01408224067385128,0.02124623483833166,0.016588774170923973,0.04491925714232012,0.027956185718740496,0.017134736342619663,0.014050234769423325,0.050988985015151825,0.04126374563160529,0.0001578459711617528,0.014767726097246145,0.021257501391961184,0.09054856383874303,0.012690893929437655,0.013092881112520513,0.014926737734050432,0.016344386534745407,0.027029671512464,0.02612554686610221,0.01653462657120946],"x":[1.0296161846961571,3.5762695421113677,1.6361947185911274,2.3354205671681783,1.7099227415057405,0.9191983170755624,3.3033055049986126,0.02209179191992372,1.4808670838726379,4.542569785531894,4.6360300395334395,3.348938732859159,0.1389032918191957,4.830108126895672,2.383398279540372,1.8616903596387135,2.2667730313882686,4.680008686943802,4.021690604179859,3.2988435911182767,2.8454834918179763,0.8390593248451139,1.2156850997589363,3.3706522308520013,4.304181150957474,4.4887926430841905,0.699795850578091,4.4166201368653955,3.22064663527592,2.9498589786680585,4.430694259038059,1.7762526549000135,4.993303044822767,0.7010003341869375,3.583125211932774,4.4233295517366065,3.6926546774996503,2.8296772760992828,0.014517136995044755,4.983668509407178,0.7992652483856932,0.15530751024447786,0.8406379282781551,1.7954645080796805,0.2624810535694866,0.861636365026347,0.7448617945137248,0.7340897441318484,1.7424774902595896,0.9487771977847848,3.7882513151448585,3.5161410891602687,3.1296086572065516,2.5817748516002292,3.7494130501936507,3.7162448938318193,0.8414893293744419,3.738657650749774,4.070447236193589,2.02379571905285,3.2951641612057347,0.21547437766764266,0.851550037183324,4.497723785907782,2.5580524032865903,1.5701461704390496,3.240648293200449,4.940022360844029,0.07592923656748463,2.323345970593863,0.7321219449605298,2.2708083170546045,4.001614793945695,3.5110224810985224,1.501797528318951,3.0817797184137308,1.9458383159315285,3.4956894938145098,3.2425470734529394,0.6856194168250529,0.7570701559516546,1.369455932190805,0.1635325942247945,2.5822140183462183,0.6359288700991761,1.473446067995342,2.991255210874285,1.8584788912647388,0.746433429177793,2.299095817137254,3.4524751432305942,4.463595315646931,2.165668706889586,3.7207002660055464,2.3577439507159506,3.1129811627593384,0.6652171710721178,3.040924822950064,1.354316093336193,1.9522261291492826,4.364950777506267,4.8805780392747415,3.4830155003695094,4.920704302588636,4.868710631017802,0.25078010401728856,0.9056978727212994,0.4127247959018576,1.36336691556585,3.3232647055715048,4.8947268983806484,0.838271067720977,0.48391769589309463,1.5240102406336997,0.42085062270735274,1.8662876264710804,2.6694977873232126,1.418964081508266,1.1157424860961795,0.910279373099806,4.459281726109355,0.3358662866459128,0.6110007049536981,3.38424827209052,0.5127105785281816,3.118233118690208,3.521643037189466,1.4710363902297796,3.184268730180464,1.2720958806491711,1.2230888110534,2.9579485829087537,4.598370333810386,0.0296600803487046,1.2171399861090948,0.83210804491055,3.27219228664686,1.3288541593842074,0.20418515710237006,1.4986114433657238,0.44839074612401886,3.080069794355591,3.532144687092215,4.574345975291614,2.3987962979421598,3.6876185494984695,1.6911951323377183,4.5934067955166835,1.9497527976062445,3.1876655787282804,4.494498401525532,4.08587997590356,4.186004586321939,4.888294448713478,0.30621363705328863,0.3391157279241863,0.9944327853774659,0.41628533180051996,4.612090132022297,1.103622994637109,0.06279029829230232,3.1194873084615917,4.920233681629381,0.3308444228517049,1.2662243648328642,0.043211053051999126,3.858009659302988,0.7627822367771797,3.7323250938256014,1.1344644759781697,0.4852955663376335,2.8379093066758965,1.1763009188016738,3.1199449779412114,1.4071007615295472,3.0082762506959657,3.3698609409763036,3.3959970754901967,4.771663283718874,1.1112164855792306,1.0565646785704497,4.8392535631078015,1.9746211640879363,0.3648341698867541,4.005293612084353,1.3180866490285248,1.983049982024796,3.7956765562078942,0.6647631834931433,2.2168937715898753,1.5445020152794275,3.595686929470271,0.5621915660460552,3.2100537605602053,0.38359845958628735,0.4532250236382096,4.13120816820633,4.724423262622724,4.091418340132869,2.44475915883525,1.700581907983687,0.06425310158777897,4.607304836230815,2.1538392530250396,0.9500176889367995,1.3310626910048518,1.6236109875290572,3.7722180966080723,0.42261019750017614,4.382986800622728,4.981810327731405,4.157686062132935,4.124566916606486,4.342150371980441,3.972278216949502,1.300478149228621,2.8297107023784185,4.856037097395955,1.4035241217047845,2.2740023427042457,1.2951918191452438,3.0850752068252474,3.7617143375568975,2.7215952346913683,1.2030707316898703,3.235407573164734,3.2376518974622517,1.0499861847620762,2.090166267445406,0.12324160713474974,0.15602654083403777,4.408383159846098,1.7383449907076742,2.3100828406275897,0.8312372734573115,3.469149888443046,4.715779016242506,3.824487648299193,0.10010057838916175,0.1503009118746057,4.6006278439264205,0.8107957220200368,2.0677827465373735,1.7096864028515057,1.7423743342121956,0.7337237831974897,4.531215051886296,3.1297609419734904,4.04238607489288,2.382104494881987,0.6972440394691282,1.9178894281876235,2.334360534361574,0.8773465041700579,0.19950604599591082,1.7878219877014212,3.859437572690422,4.5618737022834965,0.5962970680438795,4.859605815307976,1.4848464640974812,4.458444092230792,0.02725488838884016,1.7902619691573463,4.572193798318379,4.43704328341261,2.9984440440095037,1.849541069516334,2.9869686896081458,1.9242425615514103,4.9515132282751235,3.238194660883468,3.3931808621126436,1.2453192684168246,4.913332105756757,4.158161550891686,1.966990354943885,0.12418747125480079,2.2052442306254525,1.3775756848762766,3.3311719259947035,1.0179011484007239,2.173211039938999,4.039238965891613,4.012876442010005,0.7485637459895367,1.9823672317071928,3.4984769883230102,2.1263263847259606,3.840653383928214,1.7340892774035777,2.8615635941161877,1.6217564726498201,0.7396362165481507,4.660626521885694,3.763846510821789,2.6751424191108377,0.747659848990404,0.676564660583393,4.075253526360582,0.8647832683562828,4.457789368441979,0.5019058282757849,3.973257801533493,2.6696831909263805,1.876708296006292,0.11319428674429144,2.9009873135480344,4.291678359053944,3.8150123628086496,1.8018712319742503,0.5466114456042448,2.342166917342261,3.6362083492708974,4.846399491065629,3.184417792808081,2.9800066119011226,3.960046698611138,1.4338803227775787,4.82950812987129,3.0120570696650963,0.21894379665205688,0.2847748377594894,4.084536378876331,2.0446164484413543,0.7700447715840675,0.09815721999341998,3.5318978744414684,4.41221343641613,1.9580034064864227,2.001302826828577,4.959706012579473,1.4122673082505055,3.3242589855275395,0.14085615405623475,1.212591024500963,4.368406332487718,4.9572982878475935,4.223215481226643,4.452548631334411,2.051615081560655,3.232771627942914,0.2973641376582503,0.5726006312847531,3.1430529927574424,2.771734886031214,0.9329306896669254,4.07226500332577,0.5444041308602299,3.37526134535848,2.5313277838980905,4.710535197480612,3.650082475537102,0.5011303765772412,2.3531037633234275,3.9930192833277447,3.643940260385582,1.8771391718879649,4.1295553574150325,4.76436426759051,4.241960323601673,4.216995050462316,1.7828344161180387,3.3664872111199906,0.4750302998175304,3.363113461199312,2.9378295503895133,4.875268604689207,0.056663552463415146,3.322296158540162,3.7414955912078995,0.9494825565458831,0.32735658313449156,2.110287865367982,1.712905777319561,3.7337276180472045,0.07447840580806053,3.803645795460654,3.37084724865269,1.3743228239968064,1.5032591950536245,4.069975652098986,2.3113521180874708,3.237254746891385,1.3810119329085546,3.1500273464053254,4.0347641654507544,1.2412750224461744,3.282850468630768,3.7555235403739906,2.206546858981999,3.126958775069857,0.8703677824138212,0.3516083689260985,0.38188675573214814,4.566061170985403,4.398436150971912,3.239733375440299,1.1879880015826638,3.3199539886651417,1.8133616167452637,2.9943537030660208,0.8422062478706249,2.880102075009593,4.217232850963686,1.247782534856654,1.5721826173713072,0.15866097764681286,0.19343709899343753,0.12399904675070128,4.4506181837556555,4.773089912118175,0.602203521877126,1.550385371173908,1.4362647805865492,4.2602197459272775,3.5205333857706256,1.2734180121371208,2.42702822053134,3.0934424767516076,2.3184895812860984,1.7928169030559593,4.7230109604983825,0.24778588196875284,2.851291569722564,3.883209475915214,3.7763766793491502,0.6144782964198792,3.687619289475108,0.6334466059063137,2.323787282346663,0.714498854000869,4.89630900152835,1.3893432408374362,4.4573862582029955,3.181318947864912,4.2647532501128085,2.0938159138308587,2.859801297325567,0.20754388734756102,2.4972973840672372,0.13008030736936904,2.1197534522461092,0.9339980898743283,3.7481045080507434,3.4693743288462207,3.810695105103672,2.5032354641130548,2.461576103858315,1.5425032534919114,3.648633027413805,2.019176104718147,1.2373693065792846,2.72828635410571,4.638112507828197,1.967805162106826,3.0520711542223813,4.950227083162084,1.9189753061299086,4.153793763079427,2.915276243890288,0.5617191359953144,1.0959626331446803,2.294021180455492,0.9211918305701683,4.063520029102249,4.852665369911032,4.094089487032311,0.03335671786316885,3.8333219621202064,1.7779863785205041,2.143269455997676,2.7294234286455055,2.70714154263895,2.801607465964857,1.169395010352705,1.1529350600413868,1.5460306335908625,4.864718440474184,3.827227827383445,4.037349057873186,1.928041787024789,1.9767483929169727,1.859098570265626,1.14923349317689,3.038437514695139,3.9396049378095013,0.9308240260120804,0.4656416794003748,4.573211852382936,2.04259661438945,1.6846775135896763,0.4188098598862988,2.5795390318988023,4.276492640875123,3.145527752628481,4.94408730680365,1.2401637437483903,3.319800918391458,2.6671018379170697,0.1636532677374669,4.504854293366057,2.2028410065057025,2.4882426759343046,0.5780237886058692,1.189646242159792,2.5280045492308547,1.3100121383105867,1.9462709017597568,3.226519160323255,1.6747232932589007,1.5208069396633472,0.2610863940579744,3.4392038768038535,2.7935520686292503,2.169439616729992,1.1146755244151263,2.2636150460918802,0.1910060848667272,1.86019009223786,1.2329103951899212,2.006471412629333,4.83818687804221,0.7943420471971074,1.5955762037560828,1.4821685810618268,0.0018872308883755018,4.711536476909601,4.98045823912045,0.3289802753214721,3.952862044190202,2.5821411679062334,4.845762841162219,1.8919387681957867,1.4886409053230953,0.712314820308918,0.9914072811549224,2.766734650815076,2.4188134162493666,1.2174125995443785,2.040875519265274,3.7942424628225115,2.513952661207047,4.1277182405774315,0.625087784912165,1.2574745530655462,1.426554183080917,1.9847665867130038,1.2236236753567054,3.520475385823205,1.1746838522991976,4.3134067650964685,1.4111189371968536,2.981564903786056,3.7009714563664287,4.691569985012196,1.2958593991629974,4.87182183127659,2.9492358345776273,4.8144193425240385,0.1234640683678856,2.3470426542442935,1.287771258395155,2.0271142884468585,2.9359848749766524,2.1357989510900612,1.7432345622846457,2.6683458882600943,2.7910015937803534,0.8524831203852268,0.15742081546424314,4.157266208750752,4.617866702225438,0.2630297577850982,4.167868213990272,1.6181768220915782,4.507557742769304,0.8078488430576558,1.067400838553798,0.21525082919428562,0.2960256948908868,3.7306586847047396,0.0562514121411839,4.89720856122389,1.3224664990570034,3.1409363442438263,0.31491588688593586,0.14974879777239325,3.2058954794085173,1.0571800511772877,4.740988461755129,3.0484559696091793,2.3470801821245155,2.297028030252247,3.355122432433136,4.539171288304761,3.8703854545875416,1.8430348975854927,4.183472588482367,4.923834833646294,1.5955730496510612,1.9061772182568837,2.615970441134976,3.2161331973563447,1.0464912812028904,2.4840700785571777,3.0528560716472986,2.2154439376373225,4.750484762115821,4.589540779808418,3.4274081350293395,0.060617930977903134,2.46656272574594,0.9637823253330569,0.17234363260942742,0.3856735612726758,1.3044826601876747,3.8025231835128803,3.6315294394816333,3.3910430294478475,1.1016802616969945,4.035497884109828,3.752824329948996,0.3047175007417513,3.7964510414104238,3.3130724775045284,4.548748084661407,2.4615810944722085,4.957314530742777,0.3038246728189298,2.125944153417251,4.823853381768322,1.599808094547216,0.5293067174080113,3.763063660327508,1.6780400740684098,1.8409587836158803,1.791738158875864,0.7663209311193087,1.0300908766063044,3.5853317864556757,4.492184359745664,4.620809063642811,2.326939303613742,4.016149679020616,2.1854043771978207,1.5249276323281147,4.337044679048915,3.858084478708148,3.47114132503767,3.28431687191179,3.762016329438953,4.913380510327902,4.020413088996531,3.9367937396899197,1.391310366176819,3.23053171493489,0.48729459783491524,4.2595931370325175,1.2387203631056887,0.6709430988810794,2.153878002547691,3.962340523495198,3.2262067995383914,4.542644677278492,0.8270850559405041,3.435351673986713,2.23793803576402,2.949089645742,3.7708223674477734,2.81406761650718,3.7186030579784,0.03895291071331686,4.3478081133569235,3.1579546117383686,0.2854982480321122,4.4388833516824615,4.2372729369637,0.8945476442380307,1.3029552714221992,4.447259245014137,3.589354878020857,4.291228109234333,0.13162271038081763,1.4276258391174712,2.0400795467182418,3.077284297073757,0.8055486925145683,3.2637472340058435,4.1939765724670774,4.53483405346457,0.6110698435144934,4.01368504344639,4.1831724600408275,1.4599881413992233,4.676955383926695,4.47776783443307,2.015067882461609,4.157929394294172,1.6002125659846878,0.8789916981304102,0.9049765102108365,0.4330890086369077,1.8326781587316388,4.018676715623454,0.44493271504968956,1.0923515880367896,4.785310584801446,4.869870698373714,1.289007568959618,4.019989000767906,1.6642429720302276,2.94608281054583,1.416430121883917,4.30842096003277,1.5542787096897404,4.981587346287362,0.21103801063152683,4.593472039397285,2.370105675390578,2.4641089617591314,4.317176664266133,0.2849365377308333,1.9593052211641526,2.7096823076250756,4.020999089914441,0.9278098117573808,3.889940259855389,4.893902947592221,3.061657474604905,4.438211926040023,2.2498637963562986,0.5819647306524911,0.07674719555709641,1.8376709289821769,3.943032863307452,0.5620363053470934,3.6069480159516276,1.81828732665674,0.6375364517343662,2.23584970593256,2.096892783629926,2.2092275090502813,1.3304342486138487,1.4561386976658786,0.7732480372660744,0.5780247820750373,3.848212819221748,2.68379840991832,4.5278380965350395,1.1149437641055282,4.161725052799076,3.1966580987387605,0.1185103907566376,0.35977484861843934,4.907800207826417,3.253588697791935,1.4562131096570552,0.4880273324886053,0.9299922803805571,3.0392772381630015,3.18544301983416,3.82257629665826,4.470723929068856,2.839423074808277,1.6341934072485098,2.4628689204532996,3.291577422894987,3.2518386884526427,4.643628443593241,3.2606669841841427,3.503746264903663,2.6303727897744054,1.2550863597218687,1.1860906036153962,2.362064073489738,2.8233686497522137,3.702815252797542,0.7647594215134956,2.218291355340072,1.5838994986273702,2.7619478922902108,2.103870524864251,1.3440615997919514,2.206678407707777,4.793884984561782,3.5271278483843735,1.5271293900865934,0.9655079595280969,2.2291570163147147,4.93294954832892,3.3486227418281644,4.964009297345257,0.2619120339427561,1.1795821952736363,1.3223176386384539,1.8907525804234349,0.05548877020698839,4.823184676392275,0.3467287115497997,1.9780617660538802,1.9571989507030485,0.8452421388854425,4.560612719463161,2.375218147205056,2.2980046006925523,3.6914989996666616,4.900253002153731,3.7206589972442616,3.7386119009409704,2.244257243799299,3.7470811524886214,3.765496490194379,1.7791357131155205,2.1538127987542177,0.10971562213557884,3.633969546477205,3.230993712720891,0.5274456268931405,1.362609052212328,2.1272084081727716,1.5881734781408352,0.737935352445378,2.216037947407574,0.24119756630866407,2.0836154051584375,3.746052628097707,0.3673430490998497,0.2785043929825526,4.158326701475695,0.04816029757887086,3.105575849003918,0.9279537934950577,1.8972678536396503,2.7754417082480853,1.6933680621614011,2.7181318624038076,2.802809969473199,0.001149521505311446,3.8349969876360146,1.0664012519234234,3.6378349228528806,1.7185120503196194,1.0193010239294709,1.3686878538395353,3.07354976102054,1.852139045222101,0.18877866605675253,1.4532661466348296,0.4247757373016581,3.203079274680828,2.101903551015586,3.2458117124356214,3.8408154519126327,3.6089830895056076,0.7128298554324097,0.687835647208711,4.806628900361389,0.022802222954310114,3.924737268239029,3.409946756624178,2.657254998867705,0.5907513349628357,2.548384404360695,2.0512046793943695,4.522429958863463,4.0503939944942156,3.69692699258985,2.4935464033950314,0.9330815671841808,0.9801811428843488,2.2941204975903995,3.455164637936589,3.8942815829982456,2.5893374102997777,3.9329571568353217,4.906779178045159,3.423689301169844,1.6779848144867937,0.8966621910644201,1.40229531462429,0.3889816045599659,0.21234946057784865,4.561630899312591,0.4247740165960201,1.5264540879654453,4.990892705678998,4.979458641701311,0.09746938789461645,1.0899426557287217,1.5855114697949924,2.35286708406923,0.28338655902423127,4.573287787556791,2.0352460174852407,3.323371543839231,4.722581619611485,0.859967442405537,1.9871603155310535,2.45300523707661,2.57192539048361,0.6183328629726437,1.7901819749074876,1.5975742510482394,1.6929235505249263,3.8076669755252435,2.9245934888581857,2.3895831841817836,3.5681859283923756,2.6802704520368192,2.295608283121763,4.947232884338205,2.666274925987148,4.9482987284523645,4.173128405079107,2.463450954053459,3.1167060736716365,2.120643592778757,0.7966521468807641,3.7462971139798205,1.6765054140764912,0.5182258530459416,0.4016297176788908,0.4773598774849752,1.2707671444409874,3.9889926747874127,4.370341894983003,2.343376638166559,3.1189585211179374,0.8641479270053298,0.437513799084408,0.4064569989923139,3.7569317203889807,0.6084666470657807,0.19103635965624588,3.7251538487812286,2.2845240229606647,1.1941656106671994,1.792658055734383,4.970750558260199,1.9566591954267054,0.4614641852918966,2.681361472955123,0.4744048145523827,3.7566698972116006,3.7635300529721394,0.13818710027010073,4.117809400051257,1.5816343719424542,2.0638050587077084,0.5396323996173014,4.850926146960653,3.075091112367516,0.2874303480931706,3.8822533440406137,4.926642436316589,2.530540269670034,1.453764400846862,3.321768400809214,1.6310984091269354,0.7915527076483997,0.13395201358947229,0.49553248665424654,1.1813958403567937,4.538534041102757,3.8808012155627503,2.3095666739145635,0.18523149404694572,4.46423250545434,1.1183674823765477,1.6772143591805044,3.5312745980401514,2.638213757308092,2.566503320353213,0.69052297343277,4.850010427287731,2.3913643940107177,2.995140746765869,1.0562740282580985,3.236898211826041,2.4912496866483433,1.7486523554652156,3.5878261904710484,3.7654431807217104,4.636019778873443,1.501289571451102,1.1745305740963174,0.3177465901027521,1.6288794745966373,0.2966610535377012,2.668984170198001,1.4092319568902556,0.6503508452232554,0.8571034478108752,0.24369532647581016,2.68201540223152,4.657046955300682,1.5327380507412058,1.419825920443164,3.076708115217617],"s":[17.534315056434288,12.783440109279045,8.166265197512935,0.3564516014778363,3.4157123329518724,11.111044087086675,11.259872557418959,8.228376854410717,11.01599787158877,6.99761221930935,12.049333827278774,12.294838353919474,19.460909579866332,6.140474327451484,16.914027388225623,5.352860727575446,10.951026341427497,8.845783344776539,5.019933668135801,14.84849419822796,16.58201581530818,18.078565328497657,17.06889844834809,11.115916905461303,7.0949225159773555,7.586541640861948,7.095158531998589,1.1680725207004494,19.271100906366208,4.599537356235612,9.523891449676029,10.602462537346117,18.25017980713866,17.263834022392217,9.963392860512661,13.793100287300994,3.3856310947168167,17.246998276301902,5.139727050824785,0.36222753283901454,14.421060563111174,6.420492591653981,7.304887013793966,7.770851518794517,17.246885537283788,4.5767671494404505,19.09640426113059,13.618510000813426,2.3688807918965304,5.524117849912082,10.38695156504643,5.359616831607621,15.002261411746357,16.534728502497206,12.881428042562689,18.650768858407826,19.49386474791494,2.006919832856995,13.429003507106533,7.578130739903601,11.433538083262507,15.28978650123761,2.057822623184289,17.985379605655424,7.3753216488400675,2.6801071218434425,2.666994571191843,0.2758419355178132,14.120085292221187,9.114080021230277,12.158360834680675,4.837187091539055,14.242064260475992,18.995233422040823,17.07479821108074,13.357474244415801,0.5840042745178042,12.343096783474365,11.120404584062161,0.07512333002170912,18.594220580958854,9.025112741441559,11.041404654229702,14.317917969677772,12.824848821097682,18.704539841110687,1.408982046728342,1.8522163567118355,19.71830074569962,7.334481984975967,0.20102547244684743,17.731443609384776,7.384686473263624,4.1084148808688425,7.873115402719049,9.372924597247057,18.168949872210412,5.930318599219082,7.288375769803972,15.044421352079578,1.6599487753134623,8.525351117678191,2.0330809404221784,18.737245137983876,11.03980476345213,2.8525734148464377,19.79099237863187,18.28162123792499,4.940411177895232,6.510258817207566,18.31846018212711,13.698758676170893,10.940640298091274,1.3455812464081074,1.3717113011193316,6.961241358578163,18.82215276148854,13.033262512192758,17.042225257627518,8.24139456447381,18.41079356817414,2.613668073102655,8.067368224941106,16.261087699293295,5.226151436971573,8.06815545245302,19.282990971468582,4.459398093143929,7.320191453208302,9.35253469306295,14.698445557644192,16.03307636238501,5.820007081056384,17.01359221826589,3.245641219938422,13.006483481241196,0.6265104904955487,13.59225648126364,10.057911411128785,17.787921757565798,0.5576105214247384,12.488883167546208,9.251053252669532,17.50631706659791,6.134349778137569,5.500133435053125,5.079929107851684,19.079538232083067,15.065250192079564,18.75323550001843,6.763475216575867,3.196118256161191,8.250222615711493,9.668412246352363,17.15227828156977,8.093326777784306,11.46936183571965,7.662918476351668,17.71274762733954,19.464805628425417,9.734349574634397,10.484243947346709,9.906034454026123,16.421158444421955,6.799012079834181,2.962128647918618,18.162168380904035,2.8925713099226114,1.3115886091033246,1.271574745220665,15.460563737079687,4.459167051248407,9.957197194493652,9.857431458466156,2.3306722169147642,5.450249871535249,10.243820606978788,8.964690260582046,15.334962583218452,1.887572440461267,8.791833242693144,15.547753433173419,17.081060946840513,7.686568989850957,6.766024075564725,13.616717603556644,18.690520379031888,11.825464699457552,6.012401617385685,12.700244725869094,16.487863958112577,4.441278853584869,19.921370534093306,13.864544410030494,3.8775774069309055,19.58740094506146,2.7811677721759898,15.470721749980264,0.49903166834013746,9.897554235856632,15.355921739824868,3.4649253924817014,19.906925816002975,1.1608707745505997,9.873838447921601,11.520782061859824,15.847453082692734,19.330800094007046,17.30467931061056,19.90414742293298,8.511168320582856,16.93982109577462,10.85487145659259,0.9652095455146137,2.0904815628919016,2.7231167083713492,8.6220942087084,1.353823746472309,0.41947639002775094,7.908536542856428,11.867180503436611,7.191796668023507,10.863673418805408,3.169791963717885,11.239016619314036,3.600264274340077,14.595017318677064,14.081179338233918,16.9161604598169,19.995772513878556,7.499485405353625,10.162459095141818,16.084955753234457,2.1446759354761857,10.531675173520387,11.186416638761113,17.67997883622897,15.152658196278527,18.44446874282201,3.157009787962499,4.889518495003777,3.7862871769481465,14.764769433894669,18.986409974610044,8.972445259731776,3.44727720131357,17.95541520566543,5.416838980901311,12.870980251248675,13.35231203355773,13.81856454304694,3.5111412957809573,9.256262096857402,7.492996951357522,4.468690767787482,1.4668514539085775,12.819522017229414,0.12078894444114585,17.62983373818181,17.29176957765741,11.25307358159169,4.400518323561848,15.053766965541197,1.2112709872030125,2.838819859970143,17.115723101939025,18.799383893979996,10.045344658013295,12.470847211262273,16.82202117296518,2.3344212387711627,15.70421047489312,2.4150015667601332,9.660022562953916,16.453005092243217,9.835220731680462,11.496526329333033,10.481325811840811,18.37954958719276,3.2571536669333856,3.6185990217268937,18.56888531038436,13.393869894519739,18.40054636096901,12.239073968280918,17.069102186091108,5.584956695079519,6.810578318469185,11.851369300605459,18.571899342473838,10.521950198114546,6.887441011364217,10.178093766259856,19.045247637024396,14.118099201499215,14.426749831864804,16.428419829222083,15.745402275708713,8.587202312454835,13.339889602209603,4.57863460499873,1.973198791208537,4.083259953011789,19.15588817348535,0.5181435235749987,12.506282188226635,5.706615034904319,19.61561967966313,18.844394547283336,2.3205397877324296,11.987542328136618,11.606596414499615,13.609546308851295,12.654396726392347,7.6484711627021,5.766768681683319,16.185174662518378,11.897154932633338,13.27984106539185,6.4491714473463135,0.16417001264318554,19.11600843167126,0.6512667365076252,10.669846670491317,9.366093874441844,12.021036042090492,19.08086393814521,17.71089888175805,7.50448273242605,2.834903356491738,13.285353815532922,13.03750145936954,6.993342567958294,17.991493313001033,18.09737959701398,18.47036631022274,16.820605977331773,3.8608750958466898,2.8810609952151145,10.094977018373882,14.7534614271482,14.698796377740702,13.888134605402783,15.554069363223464,11.453120765694408,6.191929830868634,4.815624977814887,19.098500692788313,3.019262584815241,1.8357242151797815,18.26649104814813,13.872141851522422,15.128315342700374,13.166383413604228,19.803976533822283,15.219678146948494,3.6526503092972584,0.8069354036696774,16.853323913878143,18.983208830017265,15.961393356531506,5.659936616139896,16.93098286208217,13.947490541651328,0.9893839404618232,17.910234307018666,15.876950618952907,16.540880178014355,0.5755645914039897,13.191087852556569,15.085469267546987,11.306157124581645,16.444251215304234,17.250473538881806,7.980381193205113,5.018054421656819,3.2677439309441514,5.5656739776542175,6.958871745315376,6.4431805353816785,3.699141439975202,13.337146012625162,6.322807890537359,19.83215426974035,18.085585360107714,14.267725874928296,19.960909444350705,18.095914147093836,19.277372320452322,0.07862350346676372,12.841799573489467,11.542703303064501,2.028019474461127,0.0992368226750795,9.310186860198266,2.128887097007013,8.687448395167596,7.663438657699517,7.744360015904603,18.894799637828147,2.3364448762074774,18.023277621549898,15.827558817876284,19.479974501021896,18.37863002262454,0.4105164842657505,17.86170924050004,10.811148842169587,16.61966890458634,9.923076245895937,9.571148413867515,0.11662214443040941,8.611041549805464,2.6967400945837072,19.771393529767618,5.037975512946642,5.328657683658444,8.894120565281849,3.2809519397907927,9.985902989411851,16.5744844158861,17.862808794101742,4.183463485212493,5.246208852996208,0.9203016208953363,8.640484139869846,11.651100705143387,2.8996344944770014,6.926215971511693,16.240551436971636,2.4838423659745867,2.980716207012155,4.144899245731413,4.642828453086842,0.09856475712236357,0.3157492931829564,14.022590095016767,15.328158869341507,17.115986270378592,16.468864583227937,13.21012883852099,14.101181046228852,4.7980914304213895,17.484098423844117,4.0906037783561455,9.863650586305347,19.95108916961518,17.853059557321778,4.072869145212317,3.7632637071931674,14.338392677590498,3.4121753682966283,8.082332726424749,13.316711774270114,6.839077481360301,2.6572279224949735,14.148984736834276,6.634401542504196,4.567617918692162,17.99912616013723,4.500443154304774,7.092076370273257,8.49705087491136,4.477904047545391,18.03152218199461,8.559055236141347,10.316288561571675,12.072346070065274,13.302615092710415,19.97450606403447,18.26461020972407,4.4701939620122655,5.266417990431638,17.601773448645595,19.03089071669357,13.964505608044643,2.516188682726752,12.622159522870193,14.634584003356759,2.628536356157074,14.558435669433942,2.8274549944251426,19.761693189029476,6.583310732607379,3.536683565074936,10.781950974771405,11.917992616311741,5.5865357785843495,5.960875611677814,9.260152765138141,16.675703696103806,18.76779159562309,18.77274226075339,10.825121876167781,5.990070392943059,6.8563412538654855,5.109087784077251,4.202265279766464,1.4792266289335165,16.064980996018935,12.57623909677208,5.540122568028938,0.6116333770188254,3.017016362475058,3.6501458418314314,12.667902197465608,17.8237720203903,10.72838252995188,9.527255072231187,1.0926177439926565,18.73918705212396,8.447704843295764,13.425078643040438,9.346833970691414,16.71582170259695,14.280270051739127,3.849148382073415,0.4736796429059176,17.02872332455067,9.995963586781457,15.686550223804637,13.467754487737285,10.59836353394699,12.848577999223094,11.681331296253802,16.952070303224424,9.526224760408176,11.619306226814071,16.71787846624997,3.4250005654819393,0.09947721672801446,7.282823415625264,10.127592705183645,3.309146737151152,17.398149648401606,3.790923228460854,18.951720465747087,7.379709687161857,16.88339505574524,13.624886138293743,13.269721633344744,12.25205549674817,19.80634382510307,12.117574682086033,12.300312890028447,16.83798146346416,6.081064874748914,9.763599619368,5.901570329393135,0.3366737659106045,2.4725398795348985,12.210863817673175,1.2941285536713876,19.524916281831107,13.72362787042913,13.304096678301015,3.3692983789507025,3.5194996692988267,12.00726473535104,19.580451496785578,7.044916869591873,10.149133539618,7.991209022628154,16.95300143041078,16.63651210231724,15.199051982583395,7.827414630334015,6.217524549864004,8.453809426065817,10.150074413507536,7.45014684414528,17.649464563010717,4.131800408400048,18.03269613085664,1.9860196815689601,15.652434304243187,19.008474898896125,8.862069534152957,4.823155480214476,0.9263430132936357,6.329552696087202,11.409014121492177,17.694670063740826,8.740678616271346,7.355230806449788,7.334184391538492,14.268581427045376,17.586513536536337,5.663411923417763,2.2532132944975913,6.723606849842332,5.846324434313632,18.713352760103184,1.5719073511423165,9.369377604590472,16.27105207393321,9.791712653860177,3.988864390992699,11.967400956510868,5.540721649851039,18.045122109271983,16.109572484823154,15.99347056152816,12.895820533046184,12.490758697895185,6.055051082540168,15.055758139021332,3.344788994355641,18.386636427814786,14.835689426824295,6.874956241815657,6.242448294108138,3.559474092409558,8.595750357192369,2.025257487859946,2.7988688138482143,17.87979501579055,17.025506284504917,5.245067503299183,8.53275915890654,10.669633716483059,10.206085041285672,0.9465281527175406,4.410723200398574,3.189571749083675,15.691750336955561,2.5440853512291373,9.643513666501256,9.18791127068216,0.4012630380954185,13.716108651600774,12.108194519416632,14.575416292593282,12.041471853609465,14.342317372496343,2.9550216736759127,7.550862851989555,15.311373694833343,8.259627650239715,0.4470107204081941,10.417922515713776,11.762485903692337,15.435555688818802,13.744373251328295,19.69050008801997,1.4317129587001576,12.301314203684068,17.136587898912467,13.028605672827851,17.42233234561045,2.5509402142659043,18.875461632230444,10.317340542433353,7.2253773420345,5.483212348454369,19.44164931241682,4.3981938094077355,0.7543988170945104,6.9607606983325265,6.702443860750376,4.2651125972531645,5.988348698466646,7.756395000307483,18.954304149529303,5.533442350216298,12.349030192779749,15.617741240971462,14.718756056266269,11.238550565036366,8.676942899891902,3.9659322605630676,14.355043655027373,2.3188621707113866,12.973974314054054,11.734695891167979,16.264369289482048,8.936717537826905,9.333739800202423,19.528831922908047,7.283040782974122,7.820949669248614,11.878367851541597,7.320433869102563,18.075687659656666,2.7702195331689916,7.8312843736150395,5.8866565863878995,10.026107968662096,0.450812047757867,2.0978566854136327,17.422733814064813,13.834337203338665,19.144821587349206,10.356049398900202,4.469968573741174,15.126412009945689,9.646815253473694,8.60071051460229,14.77691864232607,10.615939876834716,3.1329784787175363,0.4461621151215578,10.718407225116277,7.276278509875707,1.402462189543221,8.348177885404006,13.470345443963335,17.481003122225207,5.920415963432211,18.385761400982766,14.188936552012471,0.6993550489916389,6.266187977850204,16.481308144597794,11.208404629930575,18.26588379835783,17.504499416140145,5.785715585887163,15.179320768906944,0.10032526954600218,19.090202946049452,9.237111497623927,0.07873559370845218,14.41305023771918,10.310205596989327,0.33313107112690865,4.487630193416887,9.308643975828392,0.7025569193474324,5.696918173872629,7.884939038645009,8.915018170198309,2.25356881960435,2.4054767542201683,10.33746446157432,2.6960486240721337,11.138226620264007,9.231408338132479,16.42223663074151,6.448574991819918,10.8361156178767,2.3513568222434467,8.633245693049695,0.24531974349339514,7.1834156685945905,12.838373053414148,6.228944431936401,12.744858780024932,14.268497832788025,13.657003320347538,6.866321933267274,19.54107340425532,16.165808597667265,1.7111143414070629,7.489315112169237,0.65104961934499,14.864448495034331,10.10836741460476,4.404157623738776,3.3275308188227104,3.161465265769161,18.002968386107597,4.041743166009515,13.772596807874017,7.884290256247373,5.111989911586008,18.75728683280014,3.0495761418069023,16.49018035299421,18.10207060681013,5.232187158931172,12.43167361520841,9.609443547935005,8.887784115931998,4.963719553358827,9.498252892880084,5.67705660957726,5.43880647147903,0.1888943229298734,5.288437966490367,2.1923738752157185,13.847718563986584,10.015332509063581,12.50855535688007,1.0312360681675647,17.086650089907423,11.846588972981241,6.903860366941572,6.291417103976409,3.5004091752486577,18.878268603045104,13.064022175427432,9.070625457139423,14.576411442154274,1.5057928435300871,8.177372777105226,9.910011120196893,19.07245018029856,11.047886752635488,4.449145301769484,8.139488148871447,4.5722684813129,15.848702884315319,18.17117505886734,2.381501578041507,19.763809489229377,13.2908829163138,6.477586989489379,18.262697098066162,15.478583634279097,13.319595543050564,11.605291774485483,18.597120548374914,14.015754739646425,17.853889222734832,14.637114286074308,0.8915608928666119,16.51108490849633,18.774708695742497,12.40193402069449,9.074007090172387,7.58035221285116,19.948013348994156,3.126705837210393,17.34525834817031,4.86092177248846,11.294321638420879,0.5848990261280962,6.150503944552184,3.557819402042255,8.749539011064273,12.54658783060206,4.813588058418499,2.195185577349097,8.975499017442692,14.274560240465055,7.501516757560784,2.6879539754408555,18.670945849165864,12.265562741070699,17.922918298766582,11.741549984475355,14.808445239279987,5.739240249306499,0.6683161362582002,6.242086643814719,15.765257874655084,0.1291175115627219,7.265981706004716,18.057526406489075,5.430347471037833,12.093168246592555,17.03159724546586,11.149661939594866,7.46290866349931,1.560278870953109,0.9426588136529768,19.12532523724632,17.971186394187527,17.13723713104626,16.876959986210842,1.3080906150197036,0.7256339957735536,0.7091608602600541,5.236595417130445,11.115350989580882,4.330622888479012,2.6994432964404957,12.18139539012296,16.872787965099892,14.209098847752761,17.827057862595595,13.93215232017084,0.5893427108053473,19.809862361088694,16.310208367317472,18.995194146079058,12.894372076276351,0.38296146678521215,5.4832907801763975,7.730021578835546,8.460308210537054,18.9544725774481,10.429217756376726,1.4913200691838213,12.252052963315837,3.0858149135254953,9.579193971778533,19.88592822648723,0.9690031225184104,13.301066896553454,5.611541383768137,4.534313408451305,11.146309795004829,0.0714474584827629,9.163587993869697,7.067887869412202,18.913097878866623,3.471963067702659,11.402498005442382,19.82144930134092,2.4838363841527666,19.791889936503424,5.748130936220481,17.420020453039218,2.697918875885801,12.860693388531574,10.311616809279691,1.7920852771104556,17.13100392276942,1.0594799327626658,16.159288902255643,4.042542210110871,18.991282090977716,17.862381621924275,14.217498095320904,7.2804331978680725,2.2730900996602132,4.669741300209811,12.529643056305474,10.77585845792148,10.960441406612492,19.38361053295797,12.659292283768991,0.6362408652691132,7.265093206351962,5.387027576459569,10.664568909183249,4.2277485917805935,18.517023350293897,5.2688816780120895,15.750424815479388,18.511604645014188,9.385885263068609,10.677830023789546,15.310342519134078,18.58995829212035,18.786010188451243,14.996138469203576,0.25075348250914065,12.842693034205993,1.4612919381803646,16.774736278726884,5.841561806329851,7.566444765953295,10.401364784269092,2.200995050815351,3.7772122911000894,16.29849143651926,15.497823067250343,8.761672782493935,9.214322832185369,6.6120854541759355,13.255773376425042,19.085287307481813,16.50273337111851,17.37450898227944,6.7479631536539175,16.376323400184766,11.105239512929629,15.91033281604397,13.544631192280434,1.2731510861247264,5.146369775878146,14.082596240169977,6.560315316904983,16.53766010931374,6.9441313603655,5.051869148693995,13.30947614311118,16.783988902826387,8.001339346479416,5.445639268912723,15.696239692458018,8.649003546462964,9.81977752219331,13.576881332069366,16.76104691060321,5.629790151530374,7.979153535522414,17.66558637822502,11.730358001866623,14.956314466784008,4.842317199536881,8.364097746233066,14.578920332041356,17.79225578623302,4.892726601513213,6.003217036785715,0.025005776733850738,16.881958754728196,11.741822857609673,2.760317125189098,19.695681927264616,19.09387752491606,16.680517305694398,15.007061200765417,9.237824919357141,9.549193358513456,15.046191608030263],"mu":[0.2097049890842695,0.3350337108472763,0.4234716540994443,0.41518147813112427,0.07746311154738783,0.30781421805399956,0.2522615992691075,0.6699423345988551,0.46303757546639623,0.29750454424319117,0.134485113846059,0.4909659380512086,0.24513840602159997,0.6536820230706084,0.6397558308524944,0.13507516414902376,0.6164049583645104,0.27736293247532795,0.7778672265278894,0.523155214016068,0.4924623245245321,0.7690402289981968,0.2392679894086589,0.8504312173550401,0.7735826386949349,0.2524322009249953,0.5182196543399062,0.3795238548912958,0.29648411448189904,0.6436142503998525,0.2010510320627139,0.8920199975613652,0.3392935989050554,0.32248518431106965,0.6516696151136707,0.708084121417367,0.7637622593775992,0.3865784746392218,0.2800060253754595,0.729074450608322,0.5006803893360483,0.6059758435820799,0.5075440660572219,0.30588163525886225,0.24488016542230073,0.8001871979705248,0.6401135475860391,0.9298586429923499,0.07736255959074612,0.21342859304542094,0.8792124581344303,0.9663981486312114,0.32202195611673656,0.6593039047183067,0.318746848123016,0.9340419883984568,0.436283661604252,0.3440521198848634,0.2864386756089652,0.5219058285883551,0.5038749554195563,0.7732103491979705,0.6088147226534049,0.9216994214703065,0.8253406819206244,0.4977601784942145,0.14649037087955552,0.5718395744764957,0.04137901956495926,0.8387256050673197,0.7567076948178069,0.3022177610243775,0.9523910183623572,0.4186023288925991,0.15275746984721006,0.7261256472984028,0.44969876346176507,0.6611307939941877,0.20546695274924187,0.570824984038522,0.4868992865323616,0.4724504220184498,0.0368563847190746,0.4642778877318594,0.423957552031593,0.6567832895914028,0.36479014042979485,0.19873440219158,0.5362062848747875,0.5021066628441642,0.6275640523861408,0.36326504115873837,0.9206401886493134,0.7706086669384449,0.7769122153905845,0.10518433750691414,0.6391519944879074,0.8188511586539833,0.3735585008660498,0.7740250119223993,0.8002118528067581,0.13771637852140395,0.13769968086389794,0.2287335768508023,0.16078012500786532,0.4591028911019954,0.2564852251525225,0.10627677482963427,0.5633694784331169,0.8624806707106902,0.4905284248148949,0.039352225723018996,0.3586788357152979,0.03594871369814867,0.5586134181782019,0.5986000736435944,0.9804335724283546,0.4084202942180626,0.2642842361353248,0.6852023959998892,0.2303609685142094,0.6598313639104056,0.8506970360873016,0.4368467691414397,0.11804451115930559,0.3766137280498436,0.10697245237648034,0.035269718170524156,0.690323229116732,0.21798567875049657,0.5950220528834329,0.2452210059063027,0.7794813318969414,0.29551201120861736,0.5964697060532835,0.08354346243831956,0.6907910255709082,0.647320462177067,0.4976399405707719,0.3809319453256701,0.13410837841908596,0.1603875203053935,0.15548470405917292,0.0564760660349084,0.13863394723967715,0.015535563951407427,0.8011228477914663,0.25921568924326066,0.4411347847880598,0.24048006129224198,0.7056530580931184,0.7102532106708463,0.7159680124841683,0.6062436541368585,0.2300880795797433,0.6347808806612745,0.45743996465920045,0.6907202873249447,0.20515974354186572,0.6591549236122531,0.5632219913355199,0.7970560950522914,0.10290719917603686,0.19023095319023953,0.6747177608208601,0.44442851852473364,0.8177556281575775,0.10976510655067706,0.031058268820160828,0.13752098400565127,0.6888440677678653,0.6970889757327967,0.26818001050622553,0.5598638661291109,0.34663822858492255,0.3658787511188504,0.13929608396141768,0.5674829245082278,0.740630574086955,0.5492571562168955,0.4422390201616353,0.142468596116071,0.4189974972788655,0.3117983040510861,0.9169015623743535,0.43397671843791996,0.01864134091294667,0.6562561172457984,0.6753946603233907,0.09015869571956459,0.11778154071686098,0.3498792783497384,0.46337894705509086,0.05741359334678742,0.5650967151097022,0.6531746436388375,0.9406924473858289,0.41271339016234165,0.8191737451113923,0.1720191533199531,0.19268848272621142,0.2409495284475338,0.5059129226710224,0.3516277315651719,0.9528629001665161,0.4795149305810036,0.8762697904882197,0.16871622065466196,0.3406359650397941,0.6256135855726193,0.7188293119856257,0.43158983704406495,0.5339821349020881,0.9405847595556138,0.7272672042971489,0.4200050786771008,0.43861991949704904,0.5950253425937486,0.3063902426985956,0.434176278425656,0.28775043566043523,0.01912782047889361,0.6601539698289509,0.3965760529711724,0.6145003868398178,0.4009629726317565,0.8246189427290678,0.40510614668113476,0.7952609786878184,0.06477280821088693,0.9739404985674158,0.4087809835486653,0.6143287048219779,0.4234439898893738,0.25584508667133843,0.49171518263640723,0.8056696726375214,0.7482737110267454,0.3940254979942328,0.2729907404727916,0.6287456601815464,0.004883503075648443,0.15699808424880435,0.11190427264415415,0.21928883774235763,0.2361340000467156,0.052703771675069566,0.42304620643746893,0.3505529951995172,0.11228738142610784,0.3927459170638181,0.03535248882774544,0.9712174358562127,0.1807574988967955,0.6961639355723153,0.9050634072047645,0.13670184919228134,0.9420588244416652,0.616299281051055,0.7750629176750723,0.29839760890813305,0.3698644311275141,0.47126153355662415,0.4909365567729793,0.22941040854816075,0.1495164241036817,0.18963271674349613,0.15527683485961807,0.3786038947689314,0.610808658558111,0.0007215876780866104,0.05455092928299954,0.5810211733100847,0.5624240644496774,0.6002807128576046,0.5074798818740389,0.05993755382947219,0.14357412948852177,0.36872663163040365,0.6389752252867993,0.08917238798668858,0.6295342556302588,0.32556910151577245,0.46090515081446215,0.06936859462354228,0.26044770522998406,0.0046980363140562975,0.6010589955302128,0.07585130583317756,0.0854126282151848,0.9135697058743126,0.658861471598656,0.10395071205976736,0.4573640243681709,0.008044868050726128,0.8225628344994935,0.7307451295033875,0.8257212340608073,0.5581349106141609,0.36572616699927707,0.7078826758900414,0.5775818137824973,0.59888926985626,0.6807501991928211,0.08750847302129205,0.6333633949098993,0.8227583988471117,0.7734962611246134,0.5437303751280984,0.11003080974253843,0.8178551740489193,0.39498068453668655,0.8996351185847875,0.13550711046389874,0.10685987811898934,0.7726621877517734,0.35017926230594876,0.7105017973280914,0.8353264071061761,0.943998730303989,0.2579088627186812,0.13831309754717513,0.8585264975243532,0.5302107868777306,0.6452929694301852,0.5288783613734573,0.7046699675300023,0.7142888096577729,0.5023291878440126,0.24342316865563762,0.5403647783434422,0.86437083273355,0.11757393721724796,0.9186435477158807,0.7494130955402756,0.3289645752238666,0.9630753870279385,0.07290487833658044,0.6307961497324672,0.2896380960025646,0.9871035574156004,0.5210746590220432,0.2846741158182997,0.14105222487565117,0.48092082355667,0.9352935468075141,0.9685598031105325,0.10839287960145416,0.39903555493491605,0.32328338968330095,0.19405074521871413,0.9535652583624459,0.698480930605694,0.5385944838110643,0.4070445620014562,0.37689140997334647,0.20551104082968563,0.21257106085675903,0.3556825886357444,0.8742714199436725,0.39794909549020097,0.8393271141481615,0.5893492476139295,0.8222982167179933,0.1987333887897289,0.28879719592998865,0.15881106821041602,0.787396939263308,0.609529693720358,0.9330618145646383,0.6299307125089182,0.9507116124562924,0.9970087676959616,0.8560451125646991,0.8529353140517735,0.22411039470843575,0.47044725421417444,0.6518313184817224,0.7998725428967615,0.6583667979011463,0.8617322589788747,0.834862187941354,0.07591264323674807,0.12641430492510675,0.6295356842717648,0.5255451993631137,0.2794523168920515,0.6304546980242498,0.038985379399051334,0.5246959680003538,0.341870610616817,0.10660137472366982,0.5900857305761253,0.2800965664041597,0.6869438892876005,0.5666373225157175,0.7487629450927227,0.4545900327586079,0.8957933497820767,0.6920341420166845,0.708843624167451,0.43560684860522714,0.05805946610089752,0.7060899279399762,0.15427077129111666,0.3296989905556189,0.3931109591289008,0.79397506754819,0.9433922746710568,0.513671860873095,0.7028128599487591,0.21584941597365392,0.1782107226592775,0.47998205627608126,0.577908314393017,0.023514324102796413,0.25982945409000924,0.85779850885222,0.20165333485420645,0.18884932334865923,0.22600813834345312,0.009936941644370645,0.3000682121337439,0.07176192131694159,0.16939412029467027,0.23884327438363084,0.5256558145019734,0.5217832569884613,0.016381657720707876,0.11846244704494002,0.28198912757084704,0.5632560478726096,0.08462204786537098,0.08307396141033774,0.3547888416360585,0.7367794360986031,0.8720504045124688,0.5293548228918095,0.34254436471581573,0.1220347939732902,0.41795064082036126,0.2848400252449783,0.8768299339559675,0.620091047470166,0.33120178250063304,0.7398035258855202,0.5018187160749485,0.19741964021631753,0.7214863338461104,0.32891803338635905,0.5961906901347069,0.6376613780029177,0.5211229253884029,0.8183681319441378,0.12833713031626548,0.28573352641094685,0.46614140746244415,0.820149388391014,0.3736938424464651,0.9661044955751283,0.4880617711413613,0.21588393386789173,0.18863433060352097,0.8751910405905758,0.5574286273753668,0.0034286146857211985,0.5449400198479983,0.5230339531477213,0.16797770195913486,0.034032159775011506,0.5787275724878838,0.31918642171481015,0.2516769010429343,0.2818264284335239,0.9617819531895944,0.03380839190281071,0.21259414216160666,0.9827945652327825,0.3479976934947091,0.14780562080067372,0.1514014795660401,0.8606538015820449,0.7424799881860886,0.9488155978931911,0.24110937321769788,0.536073546771554,0.019518673648356577,0.630442472165472,0.9840206354928496,0.6355791663723236,0.4415260361217592,0.05773993795910748,0.4883010351110557,0.13692423723728275,0.8713995939101293,0.9964289151229271,0.9331631745314877,0.008821302879527204,0.4157686250030359,0.3781824277357042,0.1753995214525932,0.6433434532096514,0.9094976516002258,0.4807721249879595,0.21244359376082111,0.4153313172558091,0.2890205692507499,0.017080603161873764,0.8310199442681294,0.21060788173224232,0.4976937839085156,0.03739401191468961,0.028672303071009875,0.7001014000851835,0.894074159345847,0.49037699041153426,0.6674155522317473,0.38182302643177723,0.8196601032453705,0.7937392573020052,0.0933561358358157,0.24939098833403883,0.5904785048377352,0.29842468127546495,0.8956006304002384,0.24119916996094015,0.742869862096228,0.35696511273718845,0.9429227603058374,0.28413186735116214,0.47394305457857167,0.3456814653927207,0.25094486101400926,0.5292482271091064,0.15569117642053398,0.17139045882178183,0.6443930410744854,0.24331762285528602,0.7970148776294594,0.4679947508327629,0.7987007485468232,0.2950562821433411,0.9939486737763032,0.18069618813747002,0.22049697956287528,0.019820199315538245,0.5948373136554732,0.4815186032283283,0.9401775095399747,0.5674121979083819,0.5450334772704264,0.30618676455769034,0.27350213812200996,0.2545847407181969,0.6208104782668284,0.7494967504663574,0.44479187333084513,0.35021737478841675,0.40036192176467633,0.42701959358956065,0.5670207734250652,0.9389860338932225,0.22501663786963033,0.6817578384100857,0.5549479786472304,0.46154211087509545,0.9429030364729429,0.544261500282045,0.3524913795095923,0.3748155524570824,0.34063184860978657,0.13007494824564492,0.14649462719276296,0.1569582350017955,0.8677758860366678,0.03576606261480064,0.5419938805685205,0.2031543327117844,0.578728433083946,0.42777979773897745,0.7657418479537894,0.8139803094010896,0.81309504070465,0.27672452889149834,0.4373610679074622,0.0676886301198465,0.1412963376111327,0.6110965618306006,0.5941452709967439,0.9819637717166689,0.9266881957117583,0.2224569720349634,0.1057261705336221,0.0382491928527775,0.3400922337995942,0.4465378681926797,0.9601460150806285,0.6018487363609,0.2811472613932666,0.2802896784443636,0.6921469571999506,0.9278983722134311,0.033756362885273505,0.4820672531074419,0.45876401851511317,0.3350636135913092,0.5634587671567755,0.28236190276355444,0.44005060576975863,0.6923107806123863,0.45345378486323074,0.9265509612314426,0.10995406369949778,0.9391632394386633,0.4982851451567527,0.25522614593989146,0.7427101952981103,0.3416086266966507,0.9785136225977349,0.834304933146969,0.9516427240592431,0.8897261937201704,0.262086367662272,0.16374121778446282,0.7689545059679881,0.7120657839900002,0.19841011180748946,0.4837305378623922,0.562647078410349,0.7133788765081361,0.4008479698003722,0.17891273226075977,0.642391696919373,0.7930283306719967,0.030472448792977724,0.4995330198762995,0.22216257878091672,0.9437252352771075,0.7979521748665346,0.7660332752486174,0.6620289838279236,0.5308091249458031,0.9151996155459161,0.5632349228297484,0.4924408249274237,0.8186077945449874,0.2490446910789912,0.7911894047378438,0.9737879903389155,0.8972238314546146,0.6775352915758914,0.26599047670470966,0.8111164283060581,0.8501288855029656,0.14026223088927936,0.819997804349273,0.11621601537884985,0.7988324472502868,0.13798556203803014,0.20838245612952533,0.3149651016226398,0.8351579694231732,0.8817593040247225,0.9195848358410303,0.9472528230459427,0.4930389433578677,0.8116098615386786,0.8944602540513067,0.18758132651795933,0.3708546271598314,0.4970082063716925,0.7155053531104212,0.6231616193359801,0.041109588913004425,0.9213170867495395,0.5630706744597178,0.4831500720666688,0.351892284120354,0.9602184155787807,0.02268914273496825,0.8612413765169395,0.8829744090430725,0.8317468983076302,0.5724761414673871,0.9895218615042947,0.22568027181577532,0.03452525025095521,0.03251479500930943,0.8430508033835826,0.45477144223809574,0.2779667223570277,0.1457344288385216,0.22006880139246476,0.5671539057494062,0.4311920033467591,0.2515026690749924,0.41536732509291774,0.010306972163192984,0.518531713919058,0.47699572969633275,0.4940211377950712,0.003066237640520386,0.22530483868009532,0.687009365363562,0.9085489224140018,0.37603337138710846,0.343264523728956,0.9838834105316647,0.29832380259257407,0.35142844413112906,0.1763855790922253,0.6127707967648277,0.9974723822021891,0.2664439982688591,0.021714597187015627,0.8657933053255507,0.6664828565414618,0.9546398494830564,0.3580657164176848,0.7699697061278117,0.8539820165309866,0.5120562740705736,0.19236939736173397,0.8974044628388809,0.5621724093709846,0.4127300222332593,0.39784588830533885,0.6526180252864866,0.678400220759519,0.0289072031682589,0.7485450238885478,0.5251935009084208,0.8895528869494365,0.29311454241008494,0.3890267143552588,0.7398375643582031,0.2610755853320983,0.5174367520131451,0.05962322752754723,0.4642452473155625,0.733796995518637,0.02650860914608022,0.3504237692550609,0.5138184753055637,0.07491710870248491,0.04419937357304837,0.11723306419942126,0.5178949678260791,0.03231488937534133,0.8127194150773462,0.8558932711034348,0.9021138353495246,0.04937435057378048,0.6263392646445769,0.26152846535758445,0.06642999321300369,0.09957105904643426,0.7526478038975215,0.8107218698574719,0.010342199809524777,0.8061680417393715,0.5419304657077781,0.040411223479879244,0.6321464593407655,0.33291479068766994,0.8841356017165358,0.7396579767475551,0.4647928305201241,0.3591460461467044,0.8638167543275421,0.20342557565463926,0.07121559521572651,0.9190074352216213,0.9549843690356876,0.9581775723861765,0.5151209586548036,0.4078883306565917,0.2196100771687577,0.9641097542647612,0.458288977060328,0.3045279623093522,0.06252394924971605,0.06680133200598348,0.0007611231578967814,0.4703321243642218,0.9355198603466248,0.5642338632290647,0.8837032972328402,0.7120394950202171,0.9827091964001395,0.9215288669918598,0.8400615819378348,0.1916181489570674,0.20955452156627996,0.691210793598716,0.5530306401910194,0.5324350730222229,0.13096215858043392,0.9819358159188336,0.6349899876033183,0.28496854025354734,0.42137634026843007,0.71576419619068,0.9202616763721467,0.4177882214491666,0.7410093168423011,0.48945704243334864,0.3919681452766399,0.5384012067452606,0.834823089064052,0.7596412466241416,0.7138908003053326,0.560289878809527,0.4420970654206291,0.010062576409586077,0.7215183738478117,0.3086696772410573,0.5117580275561873,0.21120007747789793,0.48074287164543295,0.7097547072802097,0.6333742537450191,0.19030323078546996,0.7129732622214187,0.731448447059265,0.8048334360573584,0.9311989651144335,0.5017036598081657,0.6396816020691898,0.11844726691140361,0.7686810356069846,0.5415631705089632,0.008446025737540053,0.5742320059746084,0.3239187579548388,0.6777179190030971,0.3519438068176959,0.49808884342259563,0.9494127421333307,0.5933293228395176,0.7359203542177997,0.5483427562016365,0.47786243767432524,0.3918588274844035,0.8418610872613415,0.269039611859506,0.9176880574491191,0.9615518447661804,0.774036237786154,0.901240339421491,0.49099209889137874,0.8367113965590574,0.8002521986953925,0.26301575469332716,0.9109104525131917,0.48299486915844025,0.1719967483101541,0.4182431106468758,0.9402459118033419,0.15083246762031344,0.27894118766946563,0.5033421669426577,0.6901636810228209,0.29258685909919424,0.5036173058193973,0.2738912786604042,0.14988849162626083,0.0022350620852769065,0.04584699431228145,0.928812727675234,0.9826102110633579,0.43009353696219765,0.6258415576014313,0.357476960680686,0.18509428002171657,0.5971287224348403,0.828348878395422,0.8017041916183749,0.6362973340823761,0.5315801466719283,0.6618115334885952,0.8983895599967668,0.579290544636194,0.3519269742027613,0.9287628628059321,0.0007909731961031063,0.13857888171347277,0.15484600535357407,0.44496914001968135,0.6548508505603592,0.8398486786420376,0.5132544410246056,0.9241709684497446,0.37781181456146906,0.18130768630732952,0.49620695867784037,0.7120716054132787,0.3547622084265578,0.3734394495293385,0.38959824207633664,0.9474271637899327,0.3317863489028292,0.04830807408876514,0.8484406508962612,0.07773070252316283,0.9096110773927417,0.06788721121459074,0.4543344781156238,0.026980122102518767,0.9776099074449949,0.8116744362037887,0.5805867918866485,0.7367156453096877,0.2892545452659667,0.7431608766055562,0.5814701959924466,0.16185092217336927,0.35719251829181764,0.007316651000385477,0.23063263391608424,0.2553220362091779,0.746471371982536,0.8005403742402557,0.9192950850829982,0.1653685837102461,0.9325487874908038,0.8083937427025598,0.6842198105723725,0.9155596121571017,0.74245607781279,0.08088983454891996,0.19474066427196646,0.42707987179623963,0.732592283152997,0.5927330658303576,0.5504385090923047,0.9101948256626178,0.8271100454875138,0.34394216335462935,0.7210578322135157,0.6909220045899565,0.8493220754766739,0.4500581899618674,0.1615115809030483,0.09861362371658333,0.6668180447913992,0.7602517381351641,0.48775161593156446,0.3440281511765526,0.94777773262014,0.6610728350440567,0.9941296959092503,0.9024539733525967,0.427719421553556,0.7755441960022047,0.272249645327425,0.5481269063589929,0.4868925691669552,0.26697444007665716,0.7931481364834612,0.08544108523633875,0.379137148377088,0.8678502376924593,0.9494082422524375,0.669471688807669,0.361346887620432,0.8354999172021713,0.9478642544938527,0.33833708230702464,0.6444260231397612,0.7138086986538117,0.5516711776109384,0.6602138150878636,0.396562702578247,0.18681298888910924,0.7658327201850901,0.8343813449674236,0.4499317695824643,0.6003646037702695,0.9772691386405652,0.010001210807247585,0.44185826354574775,0.978258763933959,0.11008366762239974,0.2859610017783838,0.6887438485557598,0.9023176985028112,0.766416762308942,0.47756371802001074,0.607796215324347,0.891146341931085,0.47152250963233167,0.5668031519113408,0.3333612236861512,0.43281826248116406,0.5541724455422479,0.5072572704945741,0.8875439873543769,0.5464389668332599,0.9738522287818747]}
},{}],126:[function(require,module,exports){
module.exports={"expected":[0.006994619564804162,0.018210867785754977,0.04913572820339026,0.002191321648472564,2.575658687984836e-7,0.016412715957112814,0.011422340320562562,0.011037896345652212,0.04568052662118964,0.05592040181534915,0.007299717933131623,0.01714799995334853,4.037719125833704e-6,0.018497709071741038,9.795372943467849e-8,6.555560490513526e-7,0.09865408953437468,0.06242703319594358,0.00019284171599398545,0.0025288919051877643,0.04830063230208727,0.03405887801002481,0.011378300043230864,0.007753062236238727,0.02135489414957741,0.05197045874237004,0.032016467627990514,0.0028057042410026645,0.024071247359663872,0.011328197589472224,0.002536338115406948,0.004622622424248652,0.03314512187710183,0.0004898955466360527,6.104032826481757e-9,0.008537731431682448,0.018947825070223037,0.03255250068472774,0.00010566828083845378,0.03392830123816332,0.00012258860925216236,0.0032123685505317063,0.002022098970033929,0.5705732907733478,5.663219754650266e-7,0.02982682316445882,0.0006697059203917734,0.027940007492927306,0.010574847832274702,0.003368801967639649,0.014066421320252953,0.04654441259174236,0.06086682049852965,0.00988434201597656,0.011069259414778106,0.0612298550052357,0.017287867238773364,0.0,4.973906492629307e-7,0.0010089983312810856,0.007902140051552901,0.05116660386313627,2.419058095300113e-10,0.0004222075989427955,0.006616306476833497,0.009281008012426983,0.0015213175140351115,0.0002603742035111033,0.05567656955632125,1.2343946679510112e-12,0.01385917598546318,0.017528737746730968,0.00554096889788638,0.029435940784089662,0.007547767043263766,0.01123801978568507,0.00012025728989055993,4.3573322576502056e-15,9.21256487589095e-7,0.01886510144682006,0.0064584727275747034,0.040416478882105235,2.4788464121870067e-5,0.013853099559782088,0.06599332961014097,0.0,0.010451976085039635,0.015393784710837691,0.0020520759362198785,0.0005918280378901043,0.000826234021790259,3.309831184599911e-57,0.004784713460302745,6.535217157238246e-5,0.011021139591933665,0.009872138193668155,1.253187256991504e-9,0.0005726496742452017,0.0004240322676769865,0.008162384964095375,0.04274752667511095,0.004056089799208161,0.0021088992504213235,0.005049079282820319,0.07329026023287857,0.018835842341510825,0.0013486445364191775,3.544181869700811e-5,0.04654004354666101,0.0003589020336338579,0.013790957467482488,0.028239562399239197,0.0005453683351333633,4.688600999037516e-16,0.015551850150452405,0.027797633690660985,0.010501875235397683,0.00018229225581089763,2.5432780585724754e-5,8.38857539756134e-39,0.04990033339507725,0.036690290178262856,4.970672625475888e-18,0.00017189474708467165,4.0698228015660683e-16,0.023562357912080754,0.04563961246766636,0.051301361674036594,0.01872949869964214,0.015228791493693649,0.020496779338127897,0.01673095304974484,0.006356882187783738,2.6721802098617214e-7,4.997914717382639e-10,9.257194575852166e-15,0.007751861731642848,0.019755211401995904,0.018444473028214385,0.024088326124964372,0.009307854292345,3.1165145074775863e-6,0.039576438697205965,0.0008469851193232817,1.6368269698809565e-10,0.0011104197872293677,0.0005106021281566581,0.033115111866432755,0.007255269459505116,0.05523114565617185,0.03247266117108104,0.04170154788550112,0.03822513953288962,0.024003947184237706,0.030713922069474254,0.004095504645005056,0.005340942572650617,5.764795362155181e-19,0.013120710601555969,0.0009545515191745992,0.015787022415672196,null,0.04372791400079985,0.025578050137494836,0.001225294437100325,5.026295386264608e-9,0.02700864771487535,0.005274784720103161,0.03151735528168046,0.0014510034047677362,0.0074388222019937215,null,1.5950390447136265e-6,4.16594223230169e-9,0.04744976035382635,0.04932526796554706,0.04584442060154528,0.06114760551599684,0.009375806163317355,0.034489425761748925,8.089334316879815e-6,0.013261673271436427,0.022208980710501775,0.03715098562203861,0.0009792254396680633,0.01157506348021225,2.063901593151754e-6,0.0007336997972238333,0.08122559126251419,0.04125847645186203,0.0022989066337102296,0.03713766947820232,2.2187099089185052e-10,0.010231690136261443,1.1886082944556197e-12,0.013573428786027675,0.03776810950248775,0.015296565616689134,0.04384474885088869,0.01323022662451401,0.00022220162031337868,0.0040872930511874125,1.4450918933632037e-68,0.02223946204536805,0.006296998761599964,0.1622989378734002,0.006868737955471024,0.001435734741515627,0.0093757713568681,0.00017361722865172206,0.01898719097143905,0.012981738608813503,0.00036229691906425804,0.005098137078227027,0.0310540599614567,0.0020607954515389046,0.07571155098537317,0.00037016887490654975,0.03160865441051921,0.023655291676983124,0.00013027961026421987,0.03813153018240598,0.0282879224866556,0.0068591957396596,0.000414517469048295,0.029006921491506712,0.0077811933550388295,0.016347827951176837,0.017093900204088863,8.622068329587548e-20,0.005784455174458587,0.02137632362931675,0.05366355874972428,4.226240333828979e-5,0.009594936664490216,0.01996638273753926,0.08400591628774198,0.01597094915823318,0.010062488443780498,0.0004002940537441404,0.02783561250042631,0.003425156804658902,0.006586785453950691,5.7017807677459336e-8,0.016026539215607583,1.6815609751235935e-15,0.00868930638209382,0.014950143517205772,1.7545898204290374e-13,0.014747077806667792,2.524564615337024e-5,0.03155373256025165,4.2256209656060624e-23,0.01572866161298978,0.12197301235579405,0.003038570127888413,0.00016250573759899476,0.03367421191462719,0.02641973709020048,0.03169028347072907,0.006741692739877802,0.03292414987327104,0.01336436805514483,0.0040334522667904325,0.0047078527170968595,0.008769964937206165,0.005302996858685506,0.007513712748557041,0.0007211547466274982,0.00011926510869298543,0.010275802586889484,0.0074780607877993266,0.025758810163247964,5.435186769135123e-10,5.169539511196349e-12,0.00013424013911759035,0.0022494963243917462,2.3837586702322913e-5,0.002150260372208618,2.6066633004892326e-5,0.043959661212298114,0.003622170620623987,0.016423204555018202,5.014982890397871e-10,0.006759725231355844,0.027768159608831985,0.01137121484137394,0.010135263402612027,0.0003146624279468535,6.62425412185763e-24,0.026617429298036704,0.0074202761004792004,4.044946945371174e-43,0.00867326283143632,0.0013339543596649175,0.0007031621898470809,0.024347001179432243,0.002870129130303194,0.029504919156890276,0.007411180235757913,0.011400924595422834,0.01975195930999248,2.1967425698392323e-12,0.0026200010027812156,1.956802346538495e-5,0.048478224554678255,0.009833716550333708,0.006510572490613913,0.031767877433302394,0.008284848959377708,0.007771933447714711,0.033482730756638,0.019185864019823737,0.0052942420846529,0.006822584042289634,2.1840303701545823e-13,0.10411045616028577,0.010446151547162599,0.00021502932762148288,0.03461858126427709,0.004439637615167742,7.006090430282979e-5,0.0004742124379508419,0.01915046561137789,0.046086027984029325,0.00563178242702642,2.7688427618747664e-7,0.012340193781617045,4.5452876450264786e-24,3.521833132575357e-5,0.011350376364542619,5.371244983327142e-10,0.007436212648387705,0.010573585437082814,0.014915101559257498,0.017716387083472642,7.611235292029077e-45,0.021000777915479007,0.0034655338586037127,0.020226400833785647,5.949637104332779e-7,1.4485809387452568e-21,5.318011299491903e-5,0.04208111312818614,7.713232148236904e-5,0.001225617946287495,0.004093903542164072,0.0008262463272120852,0.018493657842150468,5.668794017491299e-5,0.0076129198113356455,0.0030196960137897615,0.009443909137339527,0.0001493068607979385,0.0014164741946373427,1.9393226898414403e-5,0.007514574532725635,1.1692764005905188e-8,0.004347847060638308,0.02531489113886351,0.012017446863869906,7.686031911436546e-11,1.5641598244799423e-15,1.882456914446154e-6,0.03747996299887643,6.520850911205465e-12,3.183914152090046e-5,0.009355574413393434,0.011327916941147735,0.031123390349861644,0.0004566276168570801,0.0005003986130381837,0.027870021079714948,0.011597338388530871,2.863655585678201e-18,0.005504724354269939,0.01819147925253079,6.024778295177078e-8,0.04251948188125519,0.021349145378954007,5.810812477970912e-7,0.006144884894933541,0.015800508712988246,2.4815869015711127e-6,0.03967444999349674,0.0009341665322824366,0.14416330429259264,0.003124245419903687,0.043449266760580287,6.695099274794374e-14,0.0232856948268461,1.7573642871752016e-6,4.3826296700546366e-12,0.02122693534966543,0.0018568794591377674,0.023815048603434703,0.05710192877896955,3.1028624977091773e-6,0.0018876212770660404,0.005466741363114724,1.1724295025021373e-51,0.00023290773063218732,0.028330645458892523,0.005248938914323148,0.001455886609095016,0.000571909695137389,0.00865128580524788,3.241173681845175e-30,0.017515675841026403,0.018238936178304837,0.021936511217949387,2.5769432824350136e-6,0.041436998677187246,0.05631945851172471,7.350539807532994e-5,0.0022525013348237495,4.052133622534924e-5,1.309025071085365e-5,0.001149178466285054,0.0075023192339758946,0.010883560770098576,9.432618637134839e-53,2.382810901873678e-6,0.017327636851034098,1.6895945288954463e-7,0.0018048627547896578,0.01600173594617504,0.0023313476264140284,0.00695192710166141,0.055312564308260724,0.004999802657358745,0.06687742701326266,0.00024405121347966682,0.05386450473488427,0.02740820994481961,1.560225097121136e-5,0.030466952299894337,0.00018529644777109892,0.062377260400947175,0.0025142112697101983,2.876733820648121e-6,0.02211226920041497,0.0006636682113512168,0.040566457328821616,0.030934457566970372,0.000606594847975359,0.000468080514127368,0.006444261048871254,3.843323478926843e-7,0.0015339832502828772,0.040730870960248966,0.027718846462317284,0.03469997338928782,0.00010876512504361626,0.0007243219751428076,1.5354971809859733e-5,0.07494189076844177,0.027774416449882263,0.016558913449350385,0.0024039777029550716,0.0017332467346588781,0.1219653552829236,0.021525079668605673,0.012580537664037734,0.002869641021637935,0.016770781673235872,0.0555070076121917,0.028639298750979994,3.579997855949576e-5,0.0788728673533817,0.0023495833994541106,0.025891263518881578,0.0012481640395079205,0.0012868352541902874,2.230157421489836e-8,2.5492773815160433e-5,5.439349493723636e-111,0.03831066255727595,0.009437638077398919,1.3671539071383364e-6,0.0016059123647516492,0.015476610988961876,0.0009072273816674291,0.014123403007527227,5.7149873497841915e-8,1.786354475507819e-8,5.015810596321062e-101,0.007486948690286723,0.0031579802957203114,0.0014048282661693768,3.5229486469425524e-5,0.006986064198610109,0.0043454978123521806,0.02123942870189038,0.05077034366195789,4.077766513175225e-13,0.036686105811770425,7.777039550508887e-9,0.011548027172861453,0.059628808557942795,0.06632736782295541,0.027598737229130886,2.7921711354210162e-5,0.025594636935037315,0.05908931629830974,0.023130571610340645,0.026306891639063745,0.0685571446980003,5.494441076849063e-6,0.05018652994681973,0.0011198343108112473,0.008434156861732673,0.05124258570619352,6.385554462424698e-5,0.02024397842488978,1.1998584849017672e-25,0.055053231331984406,1.1283888058655794e-6,0.006552508435492057,0.02883609959519693,0.028616249619173268,2.8818007662686613e-25,0.008002654358217003,2.2566227999822367e-23,0.003467280612519644,5.100477744290781e-6,0.0003742344272992862,0.03749835908635893,0.004839974147268836,0.01970867832663824,0.04997047396033909,0.006164111197453749,0.0018649698499118685,0.001548558357176069,1.2887954477746208e-5,0.027991603366506124,1.6244017772162474e-5,0.0001256040891330539,0.0107594646654278,0.025589542411684735,0.006693743172466371,2.8532646974572466e-6,0.001838677339180697,9.585326453317319e-26,0.011134729772652043,0.000369866623663421,0.014738113322644825,0.00040353229301743054,8.305059006898055e-7,0.02472772467399977,3.584214314920528e-27,0.008276766484529127,0.004184839071484705,0.008638801331816959,0.01139364355251719,0.02119372836814858,0.005060521805508299,0.008895203581005756,1.7398424665335968e-7,0.003794949330179842,0.0004447867196937861,0.0010156616138408635,0.01704034940109782,0.0005374385156029529,0.00546213929174643,0.002992873756361427,0.02096114558791713,0.005231141643188505,0.022690752783804044,0.00341167273670693,0.006558319288481224,0.0011139780536824995,0.004821956888899028,0.014549565881692107,0.0035745347085085325,0.0005880555237947747,0.0025156637813508764,0.022504214855244224,0.055089422580401226,0.0012145448048656014,0.00027655592050512096,0.04199464162138842,0.00831817748738777,null,0.00012238249393257413,0.006496637293709997,0.00028999729879179166,0.01895863463639876,0.01204517678087647,0.03671688325573862,0.00865238455365677,0.039575295369612185,5.97615053775994e-6,0.006747852186753198,0.04394046843189531,0.0346938013799466,0.01783890087454258,2.9858568192224686e-7,3.497066373037995e-5,0.0011412408424211643,0.00515966326872833,1.1368711730290714e-5,1.293821937795696e-7,2.3242199662146753e-31,0.0074629952915074085,0.0010134645209368095,0.027367066414736144,0.00018043991032975498,0.0014933176127112108,0.00027490383543178376,0.005561444033946477,0.0068217283781720275,0.014646859066463519,0.00021421655101611274,0.019048383722526523,0.04074822338256764,0.010271951307066771,2.523287427646737e-10,0.03135132802024273,0.03520427721622151,2.1906998386139567e-112,0.004357904000067955,0.0026055941585324278,2.1226703642215532e-11,0.00012985795437744427,0.021038036149839102,0.01774000917896335,0.013323165533589126,4.314669466841158e-32,0.06999299213714656,0.007186747444143654,0.03599557408551722,0.03108458025186942,0.019942126189188458,1.5400056401495075e-12,0.017820951259265534,3.914592060959929e-5,2.2172999277213983e-47,5.496118060460347e-6,0.04852209570621916,0.015898237046272818,0.0076086701089944225,0.017400773740596783,0.04662720283152663,0.0006543928575130484,0.010967100893401551,0.001085623001725318,0.04066523653610754,0.02644633350932964,0.01232196935762833,9.456208028235138e-41,0.07957169052461226,0.0035388312107589547,0.004544995392654545,0.0010453980773921432,0.029466379945471674,0.011149116356821486,0.012530774798044406,0.00037297457351191004,0.031132740540640306,0.011247466496339172,8.615329003335851e-5,0.04709295380643644,0.02166075146082611,0.0023909322154208232,0.0013109216693838407,0.0526584034844553,0.022077370007510387,0.01858159608990733,0.03543334042040147,0.07572238930305321,0.03357087839134634,0.018216323256073145,6.860962842606662e-5,0.1175177630808531,3.4984242751359377e-38,2.4120192814798895e-8,0.03371120097407803,0.009492205989808837,0.012723135509841886,0.0038053244425141886,0.006325502822824865,1.0998262585018601e-5,0.07992302116740634,1.5516741842169764e-6,0.06819462740220192,0.02312900675841208,0.01586396822150911,0.00024965036682550776,1.0280987218910995e-10,0.0022096935005746867,0.0022197930545376364,0.03754395357911583,0.02077963330811681,8.144645274374515e-14,0.02232150936025861,0.0098882036644975,0.009738091468735163,0.0004989850962298495,0.023296565197838716,0.002971568492950416,0.024733600687812045,0.041692095387989125,0.007904584651715679,0.04713748782504176,4.0643283233628716e-8,3.378225900925409e-5,0.11079216011569784,0.06030229119674697,1.5689337236592957e-6,0.005903201816935356,0.0003067320573706237,0.01856119868597021,0.00047248096087832,0.010679326824030885,0.0008378942836785181,0.0038139975236045577,0.00011725188002855523,7.775268120928591e-10,0.016532135131733596,0.01236939063645421,1.3522311093551629e-5,0.03389685758689435,0.029535501106831404,0.002794985555921778,0.0012929621976551068,1.983104316856967e-15,4.136879150165993e-6,3.24335270689803e-5,1.311752061987715e-25,0.0025386373389284017,0.029955938477888706,0.047052964849557566,0.019299521500486607,6.460177447261667e-12,0.02139711373320964,0.009068117302652988,0.004742185831799162,0.05878359612100946,0.0002794359063532085,0.050214704328577754,0.04670901323313694,0.0009259966400591269,0.04143096553013898,3.221052413506862e-6,7.89469702831625e-9,0.008134712624899105,0.058522486006254336,0.009514278994040073,0.0020432419366190595,0.017357139311550383,1.8633460775154506e-16,0.0019565641614691736,0.004412667634237033,1.9576825241063903e-17,7.58604573954077e-44,0.0004067431871810992,0.005310866966383855,0.022924730312161565,0.01583673916477899,0.05086222081237292,0.020578280721359275,0.01737818968562272,1.0487888551903303e-5,0.01222867218821965,0.02724231230742731,0.02112192595586038,0.0017737522766356354,3.940985873609323e-5,0.04647495387342218,1.9931471543809485e-5,0.024789465194377688,0.00041878365483946254,0.013309676183257277,0.005300161900984516,6.941136655270692e-5,3.564126463222373e-5,0.003049244545556742,0.007598799823821031,1.1770352050525966e-5,0.06573346737996022,0.024721466850806666,0.0001834056875597354,0.021047296523301846,0.0001623226170135086,0.06619770408827082,0.02408619435964739,0.012324224389834668,0.026426089242866997,0.06324052801029226,0.003213698556606115,1.767569772199089e-8,0.020305295011301495,0.0014285343580040127,5.486458829878396e-5,0.020722667933108202,0.009159448013638043,0.02520317000697968,4.158877765539108e-23,0.00025152692916345415,0.015352237829271751,4.944134876813256e-10,0.004326220917817021,0.02029845383348947,0.029602620891239297,0.0001566460229356848,1.6253260917189756e-9,1.711173524058272e-15,0.0010788508518705313,1.837838453066931e-58,8.432724783624374e-5,0.009785728216876378,0.01705481173233325,0.03061800196270395,0.022832456840256043,0.0036468204424224045,0.0001616040905407992,0.01811847789670143,1.268693799160446e-13,0.014536463810470121,0.00022009008848304895,2.084280705176987e-9,0.00607562891689142,3.028267590325852e-13,1.345802832460012e-5,8.380399297495356e-45,0.006793167941628406,0.005243461179161318,0.0030002786218837497,0.0026935625231200903,0.08171117479461647,0.028151658264622015,9.737379169580787e-15,0.0205493489617775,0.03036794935208166,0.0007531335389815935,0.054108434109969517,0.052760938565420204,3.91108072861596e-7,0.011532464876646406,0.00772388640298417,0.0032636369208074523,0.001550840121682063,0.01514202606534418,0.030258785330587613,0.0029750947817352145,0.025104275029279484,0.0005547487118442525,5.324920708217007e-39,0.009259686806335451,0.011978634671441009,0.009665461608863187,3.0403946168882274e-5,0.027630367418101952,0.0,2.8986781252825436e-5,0.004827609055685183,0.03142413341677224,0.035531726165777294,0.03882119952516027,0.00020480547486102126,0.00011316538496003082,0.000822654013696226,0.0025444572379102214,0.020765040480977364,0.016394745809756996,0.04071879701187497,5.97336901616796e-14,0.054134899365146094,2.859855620917929e-8,2.390595960038898e-5,0.030517351419107018,9.099442867231862e-17,1.9447125905262594e-5,0.04288052918210243,0.0016862028893908196,0.03374458897674277,0.006391636955528873,0.05166293666424333,0.03843401103946207,7.3840979932960016e-6,2.149732828562895e-6,0.011780750354220233,0.0011538791857787216,0.0010510864786532897,0.01530142398134133,0.05248026713923838,0.006083005530075534,0.002575996519869287,0.01747908896711783,0.009802824174591256,0.04716108806316952,0.0007410341075387325,0.00983075030752276,9.86449728455335e-6,0.006518162521581908,3.437575803990099e-5,0.0004747627815852204,0.03123072726094188,6.883654951682819e-7,1.0502486784676575e-9,0.004518638361915941,0.07834000421790756,1.1522269853938341e-5,0.038443178583129074,0.03300385738199548,0.0009563542303280388,0.009464293045017858,1.914557467179843e-6,1.831422674996846e-5,0.00176898440686842,0.02402384251231435,1.1878877088782275e-9,5.051973402807252e-10,0.023330452851912056,0.016132855454810805,0.08965790099156472,0.005016088457789781,0.0041681378014168085,0.022851647243916022,1.4866773896717818e-8,0.11064805881508434,0.008853854187735086,0.014343670563904435,0.0507780278743131,7.989784437553523e-9,1.2273262408433959e-13,0.056541327708177234,0.04193943479200337,0.011986540755036435,8.984003272842167e-21,0.009493874291536475,0.0128366585647533,0.017648461321453274,0.003193046332898688,0.007734954338229608,0.012791674844803964,0.02513398058685028,0.006463410887905975,0.0011556236872063313,0.011303973700505081,0.023043620558463918,0.01371203447330812,1.6958801294049934e-7,0.0035199669586282152,5.930879171895433e-12,0.023300718544344685,0.02394403380730659,8.125420170149904e-12,0.0020446478182137326,0.031421501805367846,7.4194966017970315e-6,0.0062685930493106765,0.004657567619650055,2.6091960056824876e-8,0.018232327855980387,0.022181495099751248,1.9197803569454024e-6,0.00725307245663672,0.018132759803144126,1.1889173830056914e-7,0.001447446444392986,0.00987009051555887,0.029901762249929215,4.269179439065764e-13,1.2393733239566414e-9,0.005141111429015568,0.05766195683671729,0.021702262612549126,0.001160528758756616,0.016091907298338048,0.01580964835256739,0.01824146370421315,0.007684248452983983,0.0037305765279570754,0.03247410177678591,0.02450240820741392,0.0018789890851786167,0.010506780386085525,0.0034916977202415133,0.010270186184734178,0.0008166134653100433,0.0003557222615272008,3.1793345301080203e-6,3.3594529201964745e-8,1.6780239976297018e-17,0.0013000753023393657,0.012064878376777307,5.145775457754323e-10,3.3946012332792267e-35,0.08096618528383899,2.3518569263183227e-13,1.066113847939371e-45,0.04995836932436217,1.8109453501909405e-5,0.0072788454025169,2.5676227018673804e-9,0.06023020299994284,0.036306451291436156,0.0008289123724561805],"x":[-13.345241153779558,-14.963303660833862,-10.998181458823522,-16.472330961520623,-16.199846860915066,-14.492147635771813,-12.729144389609244,-11.51933644896591,-11.613567660025847,-13.687194918763861,-17.629136987497965,-11.650892671696447,-18.40697695211618,-10.312203225951235,-18.781657545008763,-15.257824715730003,-10.423131748461238,-11.09777143367928,-19.758421688072588,-19.925190951029222,-13.159091960277625,-13.973676530937812,-14.91455251891687,-13.24297375382937,-15.40422398704292,-11.538553846126543,-10.697488323910662,-12.187443515770646,-11.049590322587552,-14.247302764748607,-14.575436969525818,-14.406556251693994,-11.852552682712057,-16.008441407003673,-19.821952608479698,-12.843679003420936,-14.611008218399949,-10.62131479794438,-12.436264034546486,-14.277764475155106,-13.707921183789427,-11.17899183837557,-18.442483072427915,-10.297544860854217,-14.787240348004378,-12.543391008139658,-15.176062688670907,-15.735312198775489,-14.657271882989447,-18.049153581473327,-18.418403742995977,-12.60830762229427,-10.332888697619499,-16.435298670085167,-10.246532600420096,-11.098198125972502,-16.74557657081668,-17.128088297004652,-18.417800576625538,-17.820476614888797,-15.028850907366929,-12.719017679523033,-19.65662074437285,-13.618583950839893,-13.839383364833806,-14.845823692828654,-18.83209758421372,-17.49128482455192,-12.963554309853443,-19.350526326101672,-11.492636389741309,-11.598209242281577,-17.706766705312738,-10.02395993584608,-16.17405448978188,-16.1309740778145,-17.628987032903364,-15.519333303525524,-12.8230365038077,-15.498106117005,-17.942180671364397,-10.915013928943997,-19.728801346904586,-19.436181975932552,-10.82220481981061,-19.356941907454907,-17.517735329849682,-14.523504513660065,-14.155892160692353,-11.783403920403295,-17.80241800245671,-18.482818771603483,-18.29260457107046,-18.109881493951253,-17.58765731425095,-13.273390386201061,-14.161713030213816,-19.65195948316673,-14.637470174259505,-12.71152479556041,-11.55657665970945,-15.768320618891096,-19.30850506488355,-13.946267495204474,-10.971750583808507,-11.972834385594734,-10.238055290894367,-18.20670724525538,-11.166308824938689,-10.32070868266613,-19.65979342879199,-11.008309622284946,-12.038888727880991,-13.235899420411712,-14.879919652169937,-11.163531516794233,-13.253151071461971,-19.108449386460673,-16.34781392162893,-17.468148840938255,-12.632918442209055,-13.071424469289179,-13.502210855311583,-12.240496377236902,-17.440661532882345,-14.780681883175426,-12.752989071842487,-12.770314116097577,-17.847220589041903,-13.041911740122181,-14.55488064040669,-19.161720420157167,-15.945845567938557,-14.561152594822804,-18.61139738862078,-18.796522208562358,-15.8670623897554,-15.9313417460438,-11.742257620382768,-10.178942259416171,-13.370050405711487,-13.244804209532626,-14.925567847276815,-12.38533465016505,-11.749284293790822,-17.458000012532814,-12.580048611971757,-10.190847709901705,-10.01889757727601,-11.126192780418434,-16.12364145814925,-14.169335235318561,-10.058666001457166,-15.842654659371691,-11.195904509828836,-17.109111883751105,-19.838176659401164,-17.47996077386338,-13.231498734532032,-13.001230244960293,-15.275190368719452,-14.443195505243448,-12.526015766156,-12.118533391058167,-12.544676839715521,-17.168089901221556,-14.776954933515746,-17.455730094575184,-15.956473243497143,-18.542687466867495,-17.806815471405763,-19.59371989820417,-12.536212702036005,-17.51685021137681,-12.449491033850219,-11.240405327059602,-11.888421650166803,-10.880326886562845,-15.364695101761319,-14.87024966243947,-19.876466401954698,-17.76044855532959,-10.323687360740351,-13.59114051522073,-18.693189742270107,-18.537167491413484,-17.41799577814001,-18.78778148965879,-10.508066537408949,-15.160944903041369,-16.634048785956928,-14.710467783697194,-10.144219975254924,-13.323570119063898,-14.966386712606843,-18.874872140570897,-11.343373578231958,-12.703061985193852,-12.780295580207223,-11.314828338938472,-16.683518642692576,-17.954819198432045,-16.601937735641595,-12.2128512492638,-11.112985134731698,-11.224098053295666,-19.693615465987946,-18.93588197703214,-11.947415666836918,-16.577582993331415,-10.705593909888423,-18.221045848413986,-14.859385921483879,-18.36002608068831,-12.166771176242484,-18.746152275042352,-10.857720146720126,-19.243509660145403,-10.444335316607841,-12.071565300919481,-19.754560030744518,-12.398051728273211,-11.989200408684304,-17.74346629351363,-16.210575930880417,-15.27273756453538,-13.561356817583778,-12.679332219020091,-13.408958949858977,-19.4142954180457,-14.241328388475443,-12.61930953839734,-11.072166835826547,-14.339147214810204,-16.996532044152897,-10.167773211765066,-10.31851897141653,-13.111472933231092,-16.147965391292104,-16.129119882763426,-10.19233874606921,-11.639832498570959,-15.19344615282902,-10.81844674584946,-13.098656115961367,-13.799649198686957,-15.708478059431275,-17.848714141358375,-18.074655450096436,-11.47245200671919,-14.247023205130544,-12.394553773640363,-18.99862952798504,-11.69783658633483,-11.130384602384435,-19.297739092054197,-15.862515853968036,-14.01598109434527,-10.318274530270264,-12.633439450276372,-18.680815331037646,-16.379854969593854,-19.14712882061214,-18.508308784072508,-19.646631539193486,-15.479716793196086,-13.984027232998113,-17.360026896776436,-16.062318596354586,-13.724240840277016,-19.170959322988082,-16.50072034767875,-12.102233626028799,-16.30046014337536,-11.888339855812408,-13.692538400889301,-12.911267429455195,-18.212335077242425,-17.700990223377783,-15.190481238437407,-11.361695715825892,-10.744667692080373,-12.04665866872769,-16.887929247891464,-18.10456221292848,-17.47703794275972,-12.306642923927866,-14.780975484389423,-14.50410321716478,-10.640911333053387,-11.781790867249232,-19.72898629642919,-14.857240989461662,-13.008493675192181,-18.399325726979793,-17.708800445905062,-14.634569048768416,-18.128690962197755,-10.61889495207855,-11.623350842931924,-15.994193034717867,-17.196826840638924,-19.989220488950107,-13.642765742939567,-19.51080811672577,-13.12776590001585,-18.590040693922237,-17.886874433168074,-15.697589006336623,-14.14769349345738,-19.07197143759751,-12.498500960985439,-17.612796776348986,-14.122978249257716,-18.471643202908368,-14.926111463762052,-11.961443970387158,-16.197807550053508,-15.931624480062123,-10.851544766176382,-15.051268097457783,-10.413934331396533,-17.493623878173004,-19.290632927945563,-11.974467359284455,-19.711531035453575,-18.224158401419103,-11.274368430866463,-11.845974270497974,-13.629384451967884,-13.625185221005129,-14.996456154130701,-17.348921289373674,-16.745279587716773,-13.597068343862658,-17.73825082042852,-10.383994927435474,-12.895913692200583,-18.446012334668996,-17.144344085062922,-16.143896817652468,-12.694305144784506,-18.43549453494916,-12.04754473449338,-19.73400360033183,-17.393893703518426,-17.517540046075922,-19.170836635092403,-19.111994149546852,-10.28511044038476,-15.472587889137836,-17.60824516271222,-13.429616613275941,-18.456643797691548,-11.596007074624133,-14.164123546921257,-16.921649027112238,-18.65339308427366,-15.68245177471935,-15.222288198477656,-13.080510457451995,-13.460126951173145,-17.2577256484917,-19.616142156748705,-12.611852361564402,-14.212869473342796,-17.66326409177846,-18.49937637315759,-17.321444960771014,-17.14325053124882,-11.24624868536791,-15.066433523313929,-16.001582381465663,-18.549419903416677,-17.769898455593513,-13.415865205035189,-13.606416709838062,-16.976220166352864,-14.395966744764454,-13.799283044009165,-17.47883298434517,-14.16938939931272,-14.804575649590795,-15.967039232970988,-14.388794327318152,-16.315525639562992,-10.264718119889418,-18.65399000223437,-14.322508971334669,-12.955244136221772,-15.119908543548728,-16.532130265034905,-19.48394688869268,-13.070778141889491,-15.894148402778011,-11.588211841281089,-12.184144234974594,-13.591599385635483,-12.195011417428583,-18.262259870875326,-12.856147810641318,-18.483188895134592,-13.139867332899524,-14.759726238722335,-18.786731678634997,-18.975259898049803,-15.128504834378676,-10.914638708648672,-13.882865861872215,-18.021036392906414,-17.877960407403066,-19.99929605691489,-12.65316743850649,-11.957930955272735,-13.955907896990755,-13.724555189072579,-13.688172919650071,-18.973838026332565,-11.73280580430253,-17.523086661342564,-16.14716215923494,-18.122658340136248,-10.3198753850631,-12.77135839109973,-11.697244879995157,-19.935070026483157,-18.159988075383463,-14.92174224331146,-14.975959230775453,-10.810039294682808,-13.778168294900619,-10.59339021150554,-19.77060030285646,-12.376946826821522,-10.94989749882295,-18.85696107206308,-13.832279254547208,-12.143919754472872,-10.245322288062255,-15.499151456118884,-14.285292123365343,-14.30089579291867,-19.28984660805302,-10.658999744652748,-13.290469137348085,-19.01502179859405,-19.608657060097222,-18.068381143689752,-14.119704649362323,-19.95383725512128,-12.982543494365348,-12.424610086921064,-10.238419039329932,-13.35942428596088,-18.863161111849184,-12.415554052296153,-10.33020340556761,-11.235597786809318,-12.860658056043857,-16.33893649590958,-19.99985262413244,-10.294579216991501,-14.79056670271672,-14.244185001839867,-12.643267401853738,-13.306205821840216,-11.132834902354865,-11.37464613984166,-19.712618692819103,-11.290436846942857,-12.557738079645437,-11.568254034015348,-14.64439092531885,-15.03206641845673,-17.171909512496264,-18.34720169558021,-19.3175183649086,-14.756213314770703,-12.775477192290838,-10.960325594713463,-19.304901288456588,-12.837698349681723,-11.206976629663266,-16.969313762220626,-19.641125356630052,-19.326215056490103,-15.988382912429419,-18.174566403321137,-17.943164567791186,-13.037897385545193,-12.78834819182548,-18.30696041117118,-17.045982960630845,-16.000203170179127,-11.446223824380024,-14.301524944321747,-10.278309218603445,-17.583016451271305,-11.840884484605048,-10.432887651140067,-11.458938676859965,-15.302919467594245,-16.628151906771723,-17.265739384943434,-12.912596768705715,-14.810534771932218,-15.552088657175991,-10.642412777214123,-18.30209173833749,-13.098277450115482,-18.46100000161859,-18.27884334624293,-12.438747151118317,-16.391231194195278,-12.919386024337618,-16.981083952096164,-11.493300322595545,-18.24369981985033,-17.290486627341945,-14.529123826350748,-13.739960068645187,-15.58053015763571,-16.55477676723987,-12.42929427752371,-16.405224942167674,-18.861710703517538,-18.952456338553105,-12.632789153558218,-13.820157271027604,-11.740573166638415,-11.389492117402755,-17.2790575597242,-14.96576000591923,-19.477374953085345,-18.49513125503821,-11.233676960121908,-16.600573474904635,-17.26309598937105,-18.920006713179777,-11.812286045838967,-17.718314021506345,-14.252694381163021,-11.741957169227872,-13.670146800644705,-10.211460215231384,-16.980162254622076,-19.49236661210552,-16.43021874719575,-11.268885443481526,-16.635816133748577,-16.361792923114255,-17.022197904949795,-11.637126723701956,-19.475630188665622,-15.306854589956087,-10.21700985826353,-16.88978614352896,-17.698833182342952,-12.20729609138628,-13.965163147772328,-12.290216621138164,-18.4561451190589,-13.443147413913511,-13.381705967906822,-14.133028510510801,-18.269760426338745,-13.302185239133186,-16.746752165800643,-13.125625044565352,-19.030303615385975,-15.674204458721206,-13.332439950267334,-12.108148838952982,-10.289852898554646,-17.227282725541222,-19.272808460015156,-15.021582412416222,-14.973018858603549,-10.37859853035144,-11.649113260607507,-18.303210461628947,-11.994628070192665,-15.881644779724176,-18.23628692313728,-18.4266762184348,-14.415565556741763,-12.456750061172052,-12.857122384189525,-11.07886693211338,-14.69295908938289,-14.721935427104837,-11.306419950666921,-11.028073705183433,-10.978975447050377,-12.960801022561654,-14.086043612435855,-12.884457519604041,-13.649141463145986,-10.540494157774027,-19.64460151805136,-17.80967983184999,-12.723837769372885,-19.25925414763758,-18.628917465927177,-19.43693538267102,-17.15890564122256,-11.773740569915386,-15.846312783696408,-15.400008462252487,-12.10519418607599,-19.219647812723036,-16.466136532792767,-16.493723870475506,-19.934119764273433,-13.610141371457312,-10.289879015599466,-12.990028330117447,-10.976209329278275,-14.19322746734819,-10.540342738053017,-11.097702449720972,-19.414639352509123,-11.820116198858084,-17.875846086994294,-17.41799646166464,-14.587014476943953,-13.582189132720321,-15.679190514837826,-16.6204483265826,-11.446276503801576,-15.3238454196916,-11.850385532811902,-10.202966855160174,-19.413153850763504,-16.4907089667078,-16.574635362673995,-18.421451704857958,-19.638127887801648,-18.201546156870382,-13.39275275326809,-14.703496041443394,-12.105024926158965,-18.76603927982147,-11.502713518827035,-11.068465917651118,-15.781118551337501,-15.863616504264886,-13.834008275009214,-16.479286500082683,-11.505088073589707,-18.67321402281929,-11.72529597159283,-19.653830516355704,-18.496154065327854,-15.871180733057868,-11.375204631409117,-15.524669093979998,-12.83156931395725,-15.637943517611767,-15.521063151432866,-19.93524370017868,-16.81164319741172,-11.130077312672139,-14.97471256513419,-16.41212780208003,-10.038849440939133,-10.43631966859241,-15.551599585846054,-13.061362077188555,-12.29384154496138,-10.236809262115663,-15.177396798598892,-19.871988069469307,-13.610535538034075,-10.885474344149447,-18.38260442501689,-16.358933812269495,-15.119131148948826,-15.368262934114686,-16.75671550407897,-19.679701906477607,-18.229271511153133,-15.590186606494827,-11.88979565989413,-15.939415407995874,-10.214698311555592,-14.087823118666885,-15.54461941482498,-18.865032122663308,-15.631445811396183,-17.046644480474857,-11.530933789822772,-14.580812739706229,-10.352755601113532,-18.10168309033027,-18.838011444622374,-12.035586020594,-10.269511772381133,-16.710773873017015,-14.517610559565954,-19.622993703022598,-16.309566927411595,-14.376286018769209,-15.996095559840938,-10.35443347267024,-13.303800542231803,-14.344067998146448,-11.284728748334004,-12.290523397726208,-11.954474430474928,-18.341359769560526,-15.046262019548436,-12.632803702735849,-17.52161927473978,-18.209533487116826,-18.816236435762054,-19.98864494015593,-12.664649233824981,-17.57077015362285,-16.93316923981793,-12.439079996540013,-14.2418311267284,-11.039133640473377,-13.869108135186101,-17.8153866970506,-19.496464748205437,-19.733772926008754,-16.665030025823203,-13.53411915089028,-16.75125923955496,-18.87934207773356,-14.51875697888367,-11.310007428499677,-10.287382740888978,-13.520228136921146,-13.74927196735226,-15.35965033800295,-19.39053216412826,-10.565008954781032,-19.88115165406566,-10.547569622229265,-11.00602064167565,-19.0859833999627,-13.293362637586037,-15.763283306862988,-12.065778331461441,-15.963111714780563,-13.243950431793632,-15.641603938079447,-13.02752610996638,-14.73327905950483,-16.593787606277843,-19.352925018861495,-19.040804673279954,-14.746458035100666,-13.58617042698727,-17.812609688800567,-16.74431058012074,-12.520823505062133,-17.413239193943095,-10.670061585188353,-10.252145491351284,-15.224171277743183,-18.125297917398203,-15.948243963960138,-12.382982289361678,-14.511373323565433,-11.701648913735125,-14.62366932754595,-14.055420141277413,-13.157693219990321,-13.533163437276205,-15.692570048900015,-15.170973759092776,-12.422813019579554,-11.721744474354646,-15.448653675528021,-16.256729544289144,-18.470581591055822,-19.18365252705918,-10.44694934938481,-16.96688398582698,-17.888829205173938,-16.817156287498307,-11.393039479222331,-10.536073572936772,-17.5495989898942,-18.367109517282444,-11.309664704255677,-10.817154862106303,-16.55282779263,-15.76858283237129,-19.113712636158848,-19.42616784166747,-15.858759131121714,-12.382545946074618,-17.68126628410154,-13.722252859263925,-19.69710838628939,-12.09045235569588,-10.403745279497848,-17.254989304782878,-16.451936369507838,-12.110484251799623,-11.632514172202413,-17.08139844278595,-16.115418738647893,-14.2119293820586,-18.883639077449413,-18.032692663635878,-19.016657243263126,-18.250401000472493,-11.962024421131572,-11.922119908535425,-15.737986752719255,-16.67355398594678,-19.16253002715701,-10.962009017250393,-16.281138626201198,-15.825409653577784,-17.72437898886518,-12.265534443897755,-19.42177412463879,-12.213555611150248,-13.567628347999172,-14.93827949315407,-19.448471491089904,-14.068927855354627,-19.16258795815319,-13.89373470988247,-10.158870372831622,-12.58135879070138,-13.450868339908386,-17.81566616895294,-10.126522070548843,-14.505093725009155,-10.707064606625575,-11.889980412919535,-10.78863742910235,-16.119423487588953,-17.595573700723502,-19.60577853827139,-14.820363240671233,-19.72965319621097,-11.354909109829679,-16.80183657660937,-11.15124165756958,-19.90075876605549,-16.828439754896493,-17.38094760840085,-19.088714097124477,-16.92256760445514,-15.555322525593802,-15.84443407334382,-14.82108391640897,-17.553764887955627,-13.661880106229995,-14.155999492775958,-11.078710930550155,-11.13491478116387,-14.762734465202518,-15.345417503508509,-19.56839494341931,-18.11085256560731,-18.816033374840302,-18.678571394087612,-11.214088169047136,-10.669639950997695,-12.602856793156702,-11.944514492922103,-16.041928767423425,-13.755269408215621,-13.577196256828035,-18.5592785029585,-10.048371523520688,-13.608509844882235,-13.376034323293997,-15.278769952834324,-12.973733542393763,-11.023519530400314,-17.359698671317968,-16.10147183275686,-16.73242495885286,-18.333080634597234,-18.744356021129565,-10.395474539684589,-11.166019738885218,-15.494083143474668,-17.51857067569295,-13.27757577848013,-17.47562110332524,-12.717207210361464,-16.74036087290699,-18.862342584468294,-11.769941139201405,-15.036038321056486,-16.162589252656304,-18.565450468149617,-10.005056384408299,-14.522111824033246,-17.008346304267267,-14.045434282272012,-12.097703522013186,-11.87986011005762,-14.93835346595054,-15.008791851101243,-19.805616672721133,-18.726358970130825,-17.78825820468082,-14.138064434686182,-19.255856980758438,-11.629308113612819,-15.343836711065785,-17.375883563206017,-12.004012485078103,-18.849601673802958,-12.200373173007408,-16.838328890771354,-17.023772390870317,-15.28300963041842,-15.885051314573893,-10.095169141627336,-16.808197171771234,-12.166634854961485,-12.554188857887231,-13.712178552192526,-14.350506596079269,-11.941914993727014,-11.699028158584351,-17.51751878680152,-17.936036389577158,-13.55868501072929,-11.277859493408712,-15.545411036896496,-15.624832231652444,-18.389839490545164,-12.493706992237767,-12.865849602939992,-15.984596682568403,-19.32248953311999,-14.151349446762186,-12.58113412491138,-13.846422531357252,-18.70288000863445,-13.749250257631296,-14.524878936523155,-12.601715397173997,-17.073464614356748,-18.46854398631862,-13.915754959346096,-12.668151905910452,-13.483409179655709,-14.904362987118498,-14.008222641257868,-16.389200171185784,-11.15916933981227,-16.43606813070103,-19.621464909649422,-13.979784459484643,-17.46882388188506,-16.72877632731803,-15.91000379250196,-16.085214019815844,-14.99586882619744,-13.790006625773,-18.57000327069382,-11.033115279574869,-10.506501562216318,-17.266317365990037,-15.415845209841255,-18.174849624604075,-19.908324778752682,-12.954320806999942,-15.988484977299242,-17.549973610424896,-11.781196621861266,-13.549363202879263,-18.00340162392593,-17.456229295932413,-15.70903647711787,-15.989864797901006,-19.718685005968076,-17.23544194696788,-19.3753133895238,-19.375575468882765,-19.690275100137615,-16.011302641031723,-14.30042173894953,-18.18418477534493,-18.921307389953878,-11.414404013056034,-16.747923637764462,-12.321982035033884,-13.815827636586825,-15.980796391967987,-15.525291731490888,-19.43220342612924,-12.810447861344905,-11.050055302401038,-13.927191152920184],"s":[3.180234343489581,3.7066820298235506,3.3959793242768765,3.324812681062723,0.9724446821488608,3.389365311665844,2.138898855535661,0.6907321667166333,4.424324381385812,2.448003643942931,4.802159474468227,0.5408899927699673,1.3129961829682224,1.392404489002368,1.1696204035195956,0.8411951043796073,1.5382465376139765,3.724752183771838,2.5945784646186363,3.036607640396487,4.151736903996079,3.538710872651948,1.9781564556307685,2.184713074584881,4.6705564526556556,3.4250215848389165,2.8179987128364647,2.4388192803348585,4.6418475464543585,3.1931923550764285,2.995482042117499,2.4026263415882223,4.115850544523678,1.3322545217697868,0.6660081542380991,2.549334138786751,3.0312737738939344,3.462977027119505,0.8147993139900678,1.9679210711105344,1.5710560459771339,1.4076267210486493,2.467827151221793,0.3104392374238707,1.028423784953596,2.060266730075292,1.6689410307874408,3.641630117973728,3.9805903044045463,3.5398359727334707,4.835473234142525,3.1627025149839962,3.6264071674143428,3.4847945311201913,3.0971957273044284,3.6458006528620626,3.3408886667878326,0.04422258189633599,0.7009988816312007,2.289187565784246,3.1294651967844644,3.7335884285986634,0.5808223978438665,1.27228933322719,1.9131506259178221,4.899828784253075,2.8412595034705723,2.227899948504295,3.586202952312998,0.6831335635025748,3.7406878000992902,3.270603711698149,4.57472082450119,4.174122564370336,3.723014621552795,4.404160947107583,1.7580942329973603,0.39762425941148316,0.7568682640976365,2.9512303598145517,3.292509458657553,1.5720564333245601,1.049647689549903,4.297373024016054,3.3660022011265953,0.02924817188995954,4.388038692040544,3.2548628941136237,1.8564970734979747,0.9804839775887375,2.205044157016416,0.1306477036431375,3.602143580336412,1.2629350187937483,3.2726368830854224,2.343019575203086,0.46339715210971577,1.9897405297310333,1.3396022896324211,3.3157478258325037,3.816401949644257,2.28358770041949,2.912941889405137,2.1672927934830852,2.747256080721617,1.2269443904812283,1.1001872029006743,1.7016995199891194,4.781706142422342,0.6898189539743627,4.70246463922694,3.581279673732274,1.6310551423744524,0.34444233753247455,4.248002714087775,4.072803017188852,3.0316730827272487,1.8873647784598135,0.6270464003529796,0.18826605607250357,2.949242799105576,4.109497803947799,0.3029927340354177,1.1344726298004537,0.2678818366266311,4.136672255451385,0.9210937632199201,4.237207432716095,4.928663268319084,3.9776309184304957,4.142171997721402,3.4146722906161395,4.084713811544155,0.954946691758074,0.7845286233844495,0.3369325149684077,4.496884677969294,3.8578895106663236,4.865839938862637,2.3240054506982686,2.8915684682968443,0.6141317708210359,2.5969620078420217,1.2565025011895148,0.3926671222565792,1.8889201428311553,1.5285515708081676,3.9848637464801415,2.219159388256211,4.085998790510952,3.4973910275879483,3.266825663385877,2.289485021348965,3.4771775721513443,2.683961228359065,3.9813405345322694,4.92759016728491,0.37311328229004737,2.2218636055576955,0.7424710281203528,3.167305742052285,0.004875687103819137,2.3718954238341428,2.1707416131711277,0.49498951806913993,0.8396913226933156,4.158958539555405,2.6914286893371897,3.2346018453169414,3.277920190145026,4.245605179124771,0.007365011376185837,0.36604801247352436,0.3976153890939593,3.516809405878912,4.385935204413647,4.499262575318163,2.9276353124141896,4.128129844394516,4.754094549765306,1.7529008299588955,3.612510338621344,4.938018530720453,3.8324784607549334,2.9591745766296684,4.809260985864572,1.3037345555398094,2.4934074017503125,1.7547152809222044,4.256929318394658,2.0686484990183973,4.25443289212355,0.21220591557885138,1.8057329093887153,0.44991259017871044,4.771358351927866,2.1578038995195934,3.160213683386136,1.9754244840953883,2.619123960386295,1.6367101863176592,4.105094149075452,0.09030860279599873,2.3562632831264327,1.9386079880516938,1.1334854164647357,3.7429221258796863,3.0414145352253366,2.1807479675190145,1.8627831159707198,4.054735721247388,4.826930494232165,1.9713832713409896,4.26039253685178,3.6676692867417304,3.4358046670399176,2.9106211624520673,1.4779054342607734,2.0857241089134924,3.0209392164591953,2.181161997429456,4.406068888353644,2.065225929144571,2.952459765623524,1.2050650626186366,2.4655482987888666,1.9275632542931354,0.9946323959401249,4.639772620611263,0.42465336940561094,1.8912348196534756,4.876055291180848,4.057325654658033,1.25523548293903,4.687474864910516,3.3588195108062435,2.886335409813684,4.997595484941569,3.440418465167119,1.5643333167054374,4.728688849893301,1.7066394833508902,3.148410272869061,0.46845686154847743,1.191801382196368,0.35792132862031645,3.7621104011727837,3.504065839828482,0.3764092424465526,2.613852390684994,0.7040088126488819,4.156154591625226,0.3410570184599826,1.3934099135210498,1.266653982063859,2.6603901891026926,0.8434173395151412,4.592744803689918,4.291650499875836,2.3492859340512364,4.619344165271504,3.494557283175279,4.097304707335133,2.610276548771754,2.1403870969906236,4.2466961688416704,2.0279886914735554,2.2158663871058017,1.7723073670305622,0.8085676414219234,4.647294249479668,4.45489119273684,2.239092520134819,0.5325927705597255,0.3613125486973745,0.8434113801075871,2.162605158657851,1.0021679055107746,2.898242308881324,1.20903562751973,4.885751584985511,2.196133838948706,4.651028666821894,0.7049634355815548,4.134935504101622,4.951970200116037,3.935418478382493,3.54249324679759,1.689051424354251,0.15519713146369907,4.678694131589095,4.666642559979718,0.11488859037195431,3.5124122642443045,3.3428748551429566,2.6850408083421087,4.926746921508992,2.2459134507594936,2.4403808275338923,2.6924147993292236,3.5113699116264163,4.950850763088301,0.4140999569302761,2.3664401841555227,1.045176898160517,1.6253013210748612,3.353715224959818,4.788466647995562,4.949465889753727,3.3941715522572613,3.9060925946292677,3.5677289660260456,4.527887344319095,3.0831831410902355,4.748116161867499,0.4690597840411148,1.7838099255840534,2.22753218482635,1.787837495644068,4.504182158844424,3.4447636571356908,0.7157078651305959,1.9367509428223828,4.485726184863691,4.5051310115047105,3.4765467401506456,0.7301178785758944,2.397980457237167,0.20190996266899908,1.3643633783579023,2.906649722143216,0.36326042570920536,4.080475837033434,2.8433563994593145,1.4776127914791382,4.226728698385964,0.05908070089409301,3.2045572078114404,3.4644436489078076,3.8254439050053444,0.8418846424273596,0.24262858130892573,2.008366680312502,1.744452559766796,1.4728004029432196,2.7845181897916502,1.530864770516982,3.0985259912649155,3.789589382785784,0.9935949027740987,4.135005234984047,3.372516236225022,2.5718802679081563,1.4216012984111848,0.9697396919219792,0.5040479386927255,4.263060329538902,1.0102174757983096,2.588896968993292,3.9948253706096617,4.400557668767058,0.2518420250430975,0.4776796525247462,0.9104779265841512,2.9355432429862005,0.3287845557479818,1.5556129068320135,2.539765908542737,2.939657709688186,4.7601203969485395,1.25034579780956,1.5132154358953154,4.964542015612057,4.045448513483371,0.31549815087157373,2.7413334241271836,4.683998925217692,0.7506377038705436,4.610701213815571,4.9281008874964085,0.5628013241663388,3.565198086884992,4.473714132113495,1.0903661725320113,2.0085893038574887,2.518587567713694,1.6323903809234563,3.3362042499116984,3.2852244317008994,0.3949264399158281,4.423077080670048,0.8098107071518668,0.5865104370398488,3.3577075638738862,2.0648503811321617,4.656639163746208,4.042137503958124,0.8559238495884458,2.1768306814450176,4.152212064949454,0.0785367561557504,2.1003158717934323,2.96298653832444,2.6984534276711014,3.1334075336206713,1.7168940697157997,3.879487961757172,0.15246128224584377,2.655601350992619,3.5194486052544525,4.7717527232229155,1.1293560950330717,4.946768470391062,2.9071279506736545,1.5316090410707717,2.360788485355104,1.3829300274444656,1.3799332603641123,1.3740599092015293,4.394704988604259,3.7001565237218537,0.14828195944967204,0.19321106857672743,3.328553204522531,0.7095032842458071,3.6010303827898618,3.114196328714015,2.1457376628436697,3.807533410083781,4.297437307653292,1.769999341833688,1.4532686547583085,2.2234606675798307,3.1350430064872237,2.912221497647102,1.317106667877791,2.3817385349283517,1.0141359795009863,3.2578081003987167,2.3990429421758708,0.4462194223742544,4.536335199498387,1.6315585559867918,2.9507657685393687,3.2858571458670474,3.0181553777040513,2.597681763708314,4.769285505103175,0.8020866748183297,3.7228340084250178,2.3668966554031625,2.999276316962638,4.87137486888016,0.7647949212478178,2.761071876060198,0.6593392994531722,0.8866785633176721,2.1901561814999204,4.795584288471489,2.3913270974130274,4.003605994853409,1.5101500771632537,4.450879297910852,3.8957490124838245,2.00553781417406,1.9764809121791638,4.340693961032507,3.888752499444524,1.219579111401199,2.258244262251071,1.7381881442726432,1.3610451105256915,2.177340913675746,1.6788704239690833,0.9360247639722619,1.5724896148807987,0.05822183587707919,4.435010524398251,3.8825254175185875,0.4424498087396378,2.7249415841181523,3.7712659463897213,1.221626532286051,3.369534884783235,0.853949071967145,0.889638942377623,0.058786833733984745,2.882184669498362,3.986513990435061,2.0364135353174406,0.9289792693873278,3.971271781081497,3.6163686613502977,3.878214629751139,4.320881786073478,0.40778877327432017,4.3112931795473495,0.4201870987218159,2.4346534840651266,4.156399443086801,3.6065815412150304,3.974362692847736,1.421347715078719,3.4140126968281184,1.8700264390499022,3.303295004184265,3.9478242000410635,1.6556680698378856,1.4542790267205241,3.08175256796825,3.1471157348219503,4.892366439958776,2.912782835119787,0.7718017935881538,4.205464097266879,0.1674920671312563,3.2314863892124235,1.0084171132040554,3.4399511949676276,3.2338213826698525,3.1555384613023274,0.2690792820570065,4.128551306890707,0.20293122939066488,3.550122578183715,0.8313991273356391,2.1055729969165062,4.2958317948787,2.9700840633537373,4.543362125312602,3.4779984176226044,3.350186640956635,0.985280470047214,2.2126113230842073,1.652786786033077,2.894087571448809,0.8832429174391554,1.2090478728812137,4.278395351123451,1.6530803583141218,4.647848561797606,0.728996278117271,1.3913715071779265,0.19424454978042904,2.676275900044259,2.00096463292617,4.651760751577792,2.0165731211447757,0.33383159687961905,3.7780878573163337,0.1790712861984145,3.087353091135591,0.8387519244688812,3.486167209582711,2.8715383832264694,3.973398567030928,3.2791437737206417,4.690919476513931,0.7535625961979497,0.9580992298618052,1.4092857036656037,1.5131570351075196,4.102177019938225,0.797089867954589,2.2867885933077248,3.982464001840278,2.3838875955764784,4.07543135962209,3.3872293659056387,3.7804143349767996,4.241117551300128,2.189356882663404,0.5467145755909708,2.370869497954623,3.112048695017098,2.901386257646804,2.728788777429718,4.2578185091163725,4.412669664971089,0.8581091726996026,2.4861347932323663,0.7535820009664573,2.4397163770621875,0.006172882711313887,1.5122816469432365,3.3995118269637734,1.3133523737548158,4.238790096128974,2.7337225248855535,4.4510997420510545,1.8307008872484076,4.525913527269392,0.8740660052786386,1.2052780165893018,3.270217106183061,3.4330202872708284,4.0645406441066445,0.8111374956333628,0.6021042823959688,2.5964592592339253,3.226776427723369,0.92174879308768,0.9191482292391417,0.24496537273513863,3.0946970729312695,1.7433624952228555,1.040972354040417,1.916288527878649,1.9291231561199063,0.41193641298978956,3.355260518237402,3.2940064882035203,3.6142585280576887,1.5661156541199561,3.462633512648945,4.708593880947371,3.5617984591775764,0.3466202975776833,3.922151323293596,4.228953167826727,0.03485817205414854,3.424734148328581,2.1812112328038333,0.6343581725452219,1.0049087686833413,4.000581304252574,3.6986005115313514,4.818034383053417,0.2113899186670798,2.3287644490324935,2.934869964625584,3.318905432156918,3.707326924623804,4.04384522917992,0.5794207658575146,3.919766903941757,1.6425228359958122,0.17217076469766446,0.8922363716505766,3.1766083227075734,4.581409657176491,2.8770774696831025,3.649514642375631,4.707369996375185,0.4791329670656608,4.489542965671713,2.678813471864221,4.4455476553094275,4.281774387503237,2.91053450089981,0.12250973780205121,2.8354056192939026,2.822123954927056,3.882451636813143,2.65434441601768,3.256288456942844,4.336757958510153,2.764978105852757,1.9886392290380084,3.9503990994106166,3.7795245192007987,0.8158138213720079,3.1204504731740923,1.5064027945311254,3.188210399677379,0.38513624692631865,4.651979629623844,3.386547522207496,4.769104092904177,2.2121577566919557,3.1834880338708658,2.4092349368147437,4.502258810712467,0.9467725790067627,1.3507993625672,0.09789821512938057,0.3810900266731443,2.58673732938016,2.5720315474499946,3.6438823105139684,3.4521183335970784,3.23233506329324,0.9875390276682061,2.529492664071329,0.7594625339456074,1.2654713790956074,3.6103800887894155,4.032272543900602,2.1981657919605277,0.6308052167707656,1.4450675898440024,0.5440800922956623,3.9840825682407557,4.195849933680261,0.5221530175885292,4.363237279497651,1.8884713239037065,2.881809259458051,2.4732535563467506,4.809961908144173,3.5855083792292786,4.034710340556891,4.160595106012436,3.086147539900118,4.678587515972552,0.2618594304790045,0.9269271112270805,1.8824623655846096,2.2813251723805283,0.48428201557640604,2.500424918503615,0.7624746734708809,1.1921563579932648,1.3891211822601923,4.787456041555364,2.152380091113005,4.0964596347850035,1.1496648243701124,0.7719828064302658,4.904456834985771,4.076113336706355,1.2894803495684437,2.2361486784226345,4.996012069634298,2.647798221315231,3.154468415379509,0.4804796503826003,1.309909618709988,1.2687126591476716,0.20581361742414428,2.716096154840544,3.0550937638604148,4.81148267399214,4.1268413330630525,0.27761869959940455,4.397412145284635,4.320011316098271,2.5457400101564454,4.177247065602415,2.5759667236297688,4.815975669133569,3.301249314060634,3.049032385054826,4.874272924902473,0.9730363103461681,0.5218579173830062,3.4884122545407004,2.2691404824730013,2.7571877089321117,0.6227248335116542,1.5004235744990702,0.35026773764538444,3.149395827252431,4.289923410501354,0.2187482219835668,0.07314042822458511,2.5082840186634736,3.1092848425313937,2.0686643899455737,3.502546543512862,4.746317178872538,4.856636739516931,4.7446746856813675,0.9275018006212143,2.905565301872093,3.1223228696904606,2.3006783010718324,1.6561775869733641,0.6876050550153412,2.170480154682534,1.0402003312540253,3.9096898067597605,1.4782325776032768,3.517340560404741,1.9551239676882226,1.1846723688049388,1.5408366588132716,2.8679910917887974,4.28045711617688,1.435242366688767,3.0902648734732816,3.3390944098393485,2.1269966214692273,4.596622300747615,0.9514817858115066,3.6916287018112257,3.607386958549499,3.99392264436473,3.555665504670369,3.218470684213207,2.9267158816484073,0.6315359708816703,4.238771156571097,1.882711643907835,1.507971407473161,4.689108798438396,3.364916206138794,3.4556674903666273,0.26561792890081093,1.3723503717527752,3.4939234434241784,0.7725512277434099,1.259368603319827,2.4523050952385264,3.775947916078588,0.8230412805441745,0.37263675478524716,0.36741127259862894,3.174490631388255,0.09795042526328901,1.5834256262135304,4.918973726564422,4.903518330205937,4.685128549472904,1.9457032249682171,3.6865168640154655,1.6599479108788795,4.55430966119546,0.21673420898256635,2.085134589009001,1.7621413458647128,0.5510436146447695,2.5538919816494374,0.3493705002719516,0.36538580137882803,0.0619213895621884,2.5459959766391904,1.3906815155922692,3.5117917915214125,2.864401393147118,2.869181239800034,4.29681439999615,0.3001337876196364,3.009558288808365,1.994981662967238,0.8051341016076208,4.495255832384571,2.3511727422263693,0.6166990617168044,1.7254566195000287,4.376195144962743,2.3330752432655313,1.693756439950751,4.082779951164963,3.711741040702665,3.0080732259720913,4.9679146890031545,2.8885602556230405,0.1367667155453267,3.758174968760547,3.569115252467483,4.757224323869113,0.6537469385118777,4.520627922185456,0.012529914438645928,1.550099347082643,1.0213227778791523,2.77273082518799,4.743263000268393,4.792550886659605,1.7640732270574877,1.4447780915703445,1.4485822063011233,3.6515996444508634,4.617124593976943,3.0269944200667656,2.1699380392025636,0.328596456181639,3.375826515092568,0.41283418118056914,1.0522980662179815,2.968132640382656,0.1298339977699592,0.9705711105947579,4.390751840814876,1.452439387038259,2.6898961554477197,2.7439197110392533,2.7573752154393825,4.88666142201633,1.1379635417218092,1.2004705034104057,4.88834731399891,2.9465976785658885,2.6935376591700564,3.2223866606377136,2.5399063022925725,3.851405398811468,3.2292329725690125,3.9701200724879815,2.8069094992162347,4.094230206899747,1.8988710726259084,2.600242062370296,0.4141407945611164,1.7108677998668287,1.1646011944480417,2.31507680296967,0.5894873366118214,0.45453187055853106,0.734490465330474,2.714657856533451,2.35670132589589,0.9913383597591197,2.172449722588159,3.795354964927893,3.2284323386581013,4.239267927551538,0.8035722659677369,0.5682786608195234,3.5364288859267914,4.819581409200805,0.29622192338015774,0.34589378640300206,4.440543925338898,4.319100928124379,1.9403475822746097,4.188923073069432,3.481946429431125,4.891578735623287,0.7916870433441014,1.7712597416690001,4.786252480315612,3.919485253213817,4.501403277972836,0.5787607902629954,0.17668464918872306,2.732059976591615,4.433845969742265,3.454268008343969,0.23733583064145636,4.098584720740613,2.185950830049428,2.123925589893921,3.3538263261270043,4.560469489331743,4.483897220443836,2.7522942462208224,4.2424146629133155,2.065886131835536,2.4632056851921003,4.280450959321032,3.5291050149869863,1.0955672636451097,2.064690473397286,0.2689232831111532,4.289081571839385,3.4227461107436996,0.589010792668051,2.379206229443669,4.738861940218696,1.048722278970038,2.9292893046138238,2.18808778829102,0.7775854084709477,4.017306939546014,4.278296106478395,0.8836624839968521,2.9977607661422843,4.853233913293452,0.7567547658560536,1.5184227698488317,2.1873149468342588,4.519258943211703,0.4284449686753877,0.6448463342076249,2.4944968278648485,4.100622496672516,3.0558550228045736,0.9819971465805011,4.584234788774787,4.566017185922547,4.328865573121799,3.4831982202176857,2.5064085976790826,4.459212372918959,4.747788683581299,3.287452419568997,3.0522769904466482,1.8057651464369506,4.776621616339262,3.140261104880774,2.358731523670683,0.8421450363692384,1.054024854875889,0.42343244431288785,2.7697389824469254,2.7897876914994404,0.7212673936765035,0.1757805287192482,2.498190341855052,0.25593924045721583,0.07012387652544527,3.2717523595292874,1.2450611157381453,3.047351597914515,0.8869540903964646,2.861855255512861,3.9353545232647535,1.8367518847384812],"mu":[-1.3888076390299542,-5.5319357995945895,-6.532781046087337,-0.1571301984629847,-1.4187538820164791,-5.113205957495952,-4.898344836350351,-8.161688715759045,-7.460209054092877,-9.694380407610637,-1.8936992178714163,-9.129480318681136,-2.457344912551822,-5.29195663627995,-0.08867766315222791,-3.135603839722716,-8.158017032026164,-9.080323308841255,-0.041661244610984305,-5.186424933223536,-9.188067144972532,-7.554971921186866,-7.501875795445249,-4.409279067402454,-5.751087945745994,-7.432310442760503,-4.514407678402312,-0.06466103211451024,-2.1496558778970143,-3.892359804282317,-0.003742350203583822,-3.6484644600109273,-5.1182412600371325,-6.238833665539339,-6.95416256073935,-3.2010710916325658,-6.333137530468365,-4.022954562845125,-4.809867108295043,-9.245394208539699,-0.26825450056500166,-3.592255366032504,-5.387121642338524,-9.92252963925586,-0.023111801503334917,-7.076618545263211,-3.8368711081606044,-8.30270638788148,-2.4058789097777034,-2.45678000213865,-6.158034249784512,-7.799359715463641,-7.746812267364776,-4.950651835163669,-0.023626659408129136,-8.621159620256817,-7.643413394247096,-0.766892336425713,-7.99455119092332,-3.9343459908650558,-3.6114412654907713,-8.758747217163982,-6.480209903386527,-4.040636775007624,-5.5293153030974596,-0.18202309872736855,-3.3891998813193047,-0.8908233054894987,-9.498786342349073,-0.3583849413006468,-0.8439766252494807,-2.659856171934416,-1.135757959055057,-2.5649743080379817,-3.0942099000216583,-3.364919807457547,-2.753358536149637,-2.004417066937436,-2.093602344105503,-7.334358227959483,-5.4083914691747665,-6.80426211855274,-8.64806372371242,-7.8767908136046465,-8.48504941243987,-3.06837256682857,-4.426848662172729,-5.13344362258767,-3.8290368354705784,-4.477972867846711,-3.901309814153757,-1.2261248628199173,-3.792526199858264,-6.235619435453605,-6.964812112048526,-4.560534406704506,-4.306763250439705,-6.171568034273731,-4.627705743436006,-0.9304503665953279,-6.39070231833198,-5.119950184683026,-4.510688506582627,-4.209018354681917,-8.369245808470499,-7.409146159410214,-3.075615749735714,-1.6732159078141917,-7.8724931613409215,-4.592940579975895,-7.475072081177878,-3.670787041678314,-0.58392226633599,-0.7112679138395661,-3.9643819077426956,-3.426860811051584,-3.005688868927512,-4.058547269113335,-9.42134997421832,-0.6477351237903428,-8.147354800114117,-6.977887079505982,-1.0682910720884564,-2.549751566968763,-7.594672307600019,-6.108629011191288,-9.916723293923846,-9.564244732341374,-7.174632068408712,-2.4218109610551797,-5.154016859738251,-9.816126784661527,-1.253597832863227,-0.06382018881117224,-1.6188978020210887,-7.542555725353828,-1.1048589942214893,-6.669883250379844,-1.033856983501955,-3.764695951387409,-3.0790856209243556,-5.158938192119004,-9.659211039763074,-3.78663132119881,-2.53421766895374,-5.816956181193147,-1.6447348976494647,-3.476196157351026,-0.9294629731186976,-8.489205664194232,-9.494844836422146,-8.81748415183014,-4.948361676540019,-7.878237734808906,-5.00752575161952,-0.8540639338429967,-2.184303376803214,-1.442350360616993,-5.512336629033106,-7.617853914620241,-6.1304852928983555,-0.7968337200975095,-7.744240712260824,-6.107061492771535,-8.878498029126208,-0.9760672398317349,-6.832498671668105,-6.082486196028885,-9.36282325119504,-1.0428231972704927,-3.419426359647828,-6.9979101246466735,-7.282105237345813,-9.477626306903522,-7.825496950077298,-7.864193581825489,-7.878923104736795,-7.401617388388826,-2.2807351778631224,-8.475860341216755,-0.30767099821230603,-7.1579739300570004,-0.7323917784980849,-7.566866625565427,-1.4174766457554688,-5.232940754814315,-0.6967212212555807,-3.079086729600191,-7.752598000292819,-9.952067462526522,-5.589852365710781,-8.723857605692505,-5.098149364765964,-6.185003599440291,-2.253233667921133,-6.5041276224506,-6.338003786116488,-3.459652450624977,-8.345594080361158,-2.7000046640207453,-3.723213665227314,-1.3160157760743063,-2.2778973502376276,-5.533662427085055,-2.620258475511419,-9.93626612669109,-6.191452306555345,-2.436315372382609,-3.5564388644473555,-1.6083720387333766,-1.0208099644455282,-5.521744281199938,-0.5808914533341691,-2.2361832429405593,-5.229495112621143,-1.7866827574688604,-8.76823670749766,-8.144690573447356,-5.079862066116039,-4.587646475118518,-1.9444971442599868,-6.656963505266327,-6.389495560917999,-6.353660172631512,-7.051042580903488,-9.167032433324708,-5.525166095166294,-8.615563607521908,-2.493219004363265,-0.40941844106843206,-5.743814423557714,-2.82065822103307,-8.02063480173138,-1.9823789365080113,-2.911062688529553,-1.5959138997909572,-9.30636955990812,-1.3922843836254506,-4.828268472565334,-4.592790777438314,-2.2069235902329187,-2.8842822706817284,-3.1257051145862658,-2.6493960215207557,-8.428345237566235,-1.2557608046982538,-3.0984824722280613,-7.914719256524634,-6.6512185957685865,-3.1763225220291647,-6.546725678401122,-5.353770085195837,-1.0610778856851089,-6.437479653377672,-9.301653455531309,-6.52380051732671,-8.360473427689275,-7.3928764543115655,-2.174590352170198,-6.927803745025971,-2.9575926157931276,-9.818080964130703,-7.735967119244731,-6.677807047394033,-9.849926120973773,-1.842509218199797,-4.8366335157784075,-8.360907038391138,-4.259082260945939,-6.247852661652851,-5.514905437985915,-1.659021163052592,-5.998324936381103,-4.603148970524464,-2.1306430506803475,-6.029341190885256,-1.4150010590034867,-7.547230543346881,-3.020002399198798,-2.65886514451263,-7.505380772777725,-0.16395720660152158,-0.8936799087053204,-1.5457886661151221,-3.5541448309469725,-9.433109262846315,-0.45919944650408606,-3.264729589917068,-1.7707173758567585,-2.068696543187969,-3.5097889329375387,-4.376005011535298,-3.3939466208678737,-0.9704388668194253,-0.3351064882468613,-0.8777824948971524,-5.665580375207564,-6.828899965424197,-4.595059388033613,-1.1951739673650819,-4.994116158834688,-6.838680529801704,-8.508012048086167,-1.6433126507073958,-8.225628953471775,-9.29107696815386,-7.3806310594072695,-1.5934923262353884,-8.693411898963678,-2.2256850528789363,-5.6701077139092675,-5.983158957112824,-7.4647381771959065,-1.5383587777704988,-2.510451373902307,-0.8967869471207557,-9.96780978560629,-7.9283723516150095,-1.8739297182267634,-4.416065426013846,-0.7588964908617624,-3.32804818366333,-3.953790368323007,-9.174954530200818,-8.030952942368925,-6.1775824366623695,-6.96996439488567,-2.9815065672068664,-0.6706849513888846,-0.0633013609745059,-3.9111837425445506,-6.874887892089207,-3.3466510499436386,-6.960227490966028,-8.02743911153348,-7.5021869621002075,-4.215050773929974,-4.7308314537613345,-3.209805318535106,-8.030291994583132,-3.9307801137326726,-0.708471178876322,-0.07040596285114775,-7.7815773328128675,-6.357153603510175,-1.5962790975225283,-9.77171695770158,-0.6957172847525883,-9.636723919173537,-0.5635174866034309,-1.4455699271487554,-2.2084805422893194,-3.9977628423708644,-6.4337374889667,-5.20778948561349,-8.349602423638132,-2.5400650086190613,-0.21275195921382606,-4.1257699381306985,-7.037204211397439,-0.6517521535166382,-7.247691742765737,-0.6200275029388558,-7.527986247795189,-6.922733849621936,-5.3789647641875815,-2.242713730177417,-9.1266245382043,-7.5265206917625775,-9.953009223755,-1.9098174273408453,-4.194960284621716,-7.983183916307217,-6.582318699725482,-4.661570194561255,-2.0041970541107856,-2.996710362934414,-4.28171145244429,-9.756511389368036,-3.956455866511557,-9.074406451913626,-0.708677628992942,-3.6640210662624417,-1.9884431338236563,-9.674856082707874,-1.0845302118708355,-9.457843986351326,-3.4991192109185554,-9.17112712533704,-0.6083147638260589,-6.162488996594224,-5.629934300291424,-3.8317798020584637,-4.742138777768692,-4.421659418988709,-2.612907789994394,-9.88448868761413,-2.6026036020158028,-0.2522682120394193,-2.739611504523629,-3.4461132109143167,-2.474998523155878,-6.3739136748929965,-3.3503927126803768,-1.9263912621823853,-7.087406632594899,-2.234781993855879,-0.2755150921198757,-6.0018321374006085,-8.85984163493357,-8.31546126628821,-5.603107991988907,-8.171394679639917,-8.040565998173037,-0.031119397087076006,-1.3870814098819872,-0.15016561397759975,-3.9027981737183226,-2.873179988069363,-2.8329996766576038,-4.57961371672676,-0.07652503100394226,-7.500693874453184,-3.697484362973331,-0.39003507649428615,-1.8473703043295187,-9.15678169940158,-3.5756295769418567,-1.3580093679128602,-8.871567288884965,-5.44246491870074,-7.5414526637088475,-3.054664224713397,-8.319938603254275,-4.120946490322566,-4.641933458222793,-7.9751234922480485,-3.443504538791753,-7.227956737954546,-3.2675057398715635,-8.23197006675791,-4.958511647375761,-8.152789832904556,-5.278711857336793,-6.579764249582554,-0.0026592829614391356,-2.178694232473257,-1.7676537038753892,-2.094583677340276,-0.7667913450802732,-7.987417651233983,-5.540289029512473,-3.9430119891087334,-6.17471060173566,-1.7151274053692478,-4.832777605063194,-8.057832170069139,-5.398582774050203,-1.5855058042619907,-4.030335366452986,-0.15582637971464752,-8.582347129710632,-5.361949679473128,-2.90915894670817,-2.32267941703191,-6.7108026262786264,-9.459665103185795,-3.9015929115894465,-7.4693004255155016,-8.585738964080623,-3.0108171571678866,-7.116178475736774,-1.7925935968760531,-4.735363999147455,-0.6185718961129516,-2.426726771431964,-4.3698316580210195,-9.064921553855346,-0.23923428362338406,-4.625237886411853,-4.5280711906015085,-2.608171142185838,-2.8966007539076055,-7.0549565881823995,-5.264489423337457,-3.3505741413026624,-2.2450595540267315,-7.2469941620822524,-0.604868255189619,-1.1230379136222068,-3.1945651104597172,-4.301072415665899,-2.1431199032272263,-7.0545741927795,-8.288013236277163,-2.302314704084072,-4.21910215610485,-9.372919685031217,-3.2887409012995428,-9.658169655897852,-9.93863742238486,-7.584288771345173,-2.223615642949859,-9.63884508430979,-9.299227484232087,-6.890524300840532,-7.600030094362474,-7.503116298772725,-1.2328589468967288,-8.654318659498689,-0.7081135455366327,-3.114319896521598,-8.073018573272266,-8.736642961334214,-3.389134690345621,-7.070705132521757,-7.61583213723388,-4.44216476801234,-4.405241080292002,-7.567855446026719,-6.819651620741332,-0.022645595653045802,-2.7636054955696854,-1.5236734334099689,-0.8829650679312717,-8.57662743125399,-3.909268628394149,-6.726109764341597,-1.3075944694778263,-1.7289376480402296,-7.067086222889434,-4.423212356321351,-8.762774953600701,-6.933264344838291,-0.7165797732651447,-4.499309128562734,-6.750726034720202,-6.632858385108651,-6.173696804962317,-6.733376579187363,-1.8931703082834117,-4.715141885468626,-3.4448157629735165,-2.162008729957172,-0.9761533700315783,-2.558696122962114,-7.740977612984432,-2.0878970811361586,-6.228579532450265,-8.51176722839943,-5.149561378977476,-5.865109016758197,-6.902313405942644,-7.484828847695077,-5.68447219644209,-1.159324758866287,-3.561191386659077,-3.21612105271736,-0.2654057552382616,-8.590632427957702,-1.898738778095026,-8.658550156569287,-3.1738106404239907,-7.200571581072637,-4.168797082941631,-0.7256339805116108,-6.417603718997431,-1.2434899114594877,-5.028347310050183,-2.6822419292595923,-0.7281283504476943,-0.17152768966034904,-8.864430898258934,-2.480028110847561,-3.2977214457446924,-0.7907475566589062,-1.4663576089256658,-5.954130714287307,-8.897769601371362,-5.758775437868531,-0.20168349349043435,-9.442545173383907,-6.475201408621354,-3.5884437513109857,-5.4295690619477455,-1.6091680561348443,-2.1176542537526144,-2.9523159371554852,-1.9371434643794716,-8.681324657060179,-7.192699817771797,-5.933163145507181,-0.3974007496552989,-5.199242400338198,-7.866292233027703,-7.802663346086327,-2.8851498485201343,-1.2926572363850442,-4.056864526768829,-4.544795147524095,-4.704971442542321,-2.1549673391073365,-4.603616972909352,-1.00527767470592,-7.923952700489334,-6.114666214582945,-8.131709820046261,-0.5753509112790289,-4.126400195863315,-8.362443347919445,-5.9899974342086315,-4.116903087321986,-6.289916863593337,-7.4063638367841715,-4.706138236466407,-5.337679314015203,-1.4835596427828524,-2.9485478179133606,-7.188774956360411,-4.184891945241144,-2.0184810121809083,-5.119115470078041,-0.5677941352232319,-1.9972884157512882,-8.43018130701079,-5.464635946459968,-4.048853068231639,-3.1377921532920694,-1.0252092584611439,-8.290564665632129,-4.126529336450256,-5.789772524045748,-3.2497989428021334,-9.981031176200425,-0.4147021887989899,-6.758732949470305,-2.568063798940876,-0.8397528793186582,-7.293525647827083,-8.7944837468663,-3.4572791024877447,-1.240033704269612,-9.22079738656268,-8.069302709876798,-7.203323061412852,-2.741505338588719,-0.23438629820511814,-8.633864626708354,-8.346828314144034,-2.0397117374609652,-7.125583089686862,-9.8931363357079,-6.711036921874818,-2.962473746022025,-0.25942340104242234,-4.483468841269341,-2.8410068083833817,-3.7366336496283825,-1.3096693447131713,-8.46715962837761,-8.343459534615029,-9.010169868449502,-6.376945805978251,-9.92250644597829,-0.9136336472603279,-7.115598924876345,-9.10708091368944,-7.343953069734717,-2.490488729428768,-7.057962706415624,-9.018218372196463,-9.566545935653805,-9.463083650060423,-4.48209127582746,-8.995172450920359,-9.711784197517234,-9.30688722260607,-9.33381480319332,-5.9498234598238735,-5.92944982498985,-4.816400125154612,-5.792040413630806,-4.302328360711014,-9.516914518715145,-5.571750831106826,-7.368120028013603,-5.82034913495445,-5.032250358626486,-2.364000699286335,-0.8334506437882672,-8.75148217915709,-7.876576191598774,-8.622840642329345,-0.9677873736213316,-2.0253095300177537,-9.686651196866432,-4.5908427412162345,-0.14097997649117566,-0.15252185643705118,-5.313884204884356,-3.416111971002105,-7.973401941316722,-9.191108581397993,-4.692430239236128,-7.0062044800186385,-8.496485696931293,-4.7305431184477165,-9.657673042808515,-8.586296786786253,-5.130843649273659,-7.8755743334415085,-8.671780050337016,-8.144195657596946,-7.342795136878975,-4.506305095795959,-5.22518809906199,-3.0827702113851174,-2.419473212277814,-1.1787219347446687,-5.526018782772812,-0.708290220252934,-0.11312984034128837,-5.656278265088153,-6.291287367301857,-4.864392023959267,-2.1664718944869077,-3.115383213336338,-0.7815900797103592,-0.7223633000712071,-4.634178464971832,-5.399365042814173,-7.8700644828262645,-8.254324840024822,-0.5994029180967941,-6.011510975882668,-4.33314144776028,-1.7242574944601485,-8.209026887076245,-9.444155091206136,-1.2438481635364451,-8.787302237759494,-6.229487089228927,-1.2060159667430925,-8.708820243838813,-3.431867625393401,-1.9900407868819903,-3.7437854413779226,-9.44126511830348,-5.75407717895525,-8.877489506590688,-9.341121920380811,-3.5399937618607913,-3.3637094625306596,-2.1898811055316503,-5.998274968968764,-6.132955439609495,-0.5413532480004979,-4.090354488998922,-6.426066535186199,-7.709683073806004,-8.889697422539598,-0.22709593833233788,-4.28575628253382,-7.421435074794025,-6.469813480807947,-5.303866659236958,-7.7954929708519245,-2.0556658773056413,-7.392827629365888,-9.601161429244184,-1.940426861230018,-5.308621739177259,-4.7742412453731164,-4.757629083328759,-3.529912895860896,-0.5789185312910772,-0.3337069561544115,-2.715437387628006,-4.1001130032990485,-3.4124068039673627,-7.581973901352182,-9.27352721477728,-1.1954825361892807,-7.137092251272246,-3.043453305378372,-9.42040095752862,-9.46546106028558,-6.76561378831642,-3.6897526878632303,-7.848119896346808,-2.9512973065710635,-4.204732598977127,-9.565025920189537,-8.293708358604823,-1.6842627370947705,-2.533944952784677,-6.190540217868776,-5.988229721387515,-5.656569040575756,-1.1517976202914482,-0.5915592361104305,-0.5016705975593405,-9.901376371460191,-5.017817950507688,-4.3947404434736725,-9.710230077590571,-8.206312223367199,-1.3514802190211994,-0.8848277174174424,-4.783463744689172,-4.890999890937633,-3.8395054227844327,-0.7422931092307605,-4.611107541746476,-9.864852770902338,-0.8887352843739671,-5.51271502599479,-0.46673303679610534,-9.513677567446344,-8.667804318942158,-3.8842252632457575,-0.9224210244574582,-8.863805761351003,-1.7753300873019673,-9.101617671956808,-8.481592345799882,-9.209006052519836,-7.24591972877807,-3.248868480170586,-0.0044854739684652145,-8.696609395328629,-4.809238692693882,-3.4064915578307153,-9.852133305625316,-4.800348314269824,-8.541625993176146,-9.214150637458012,-7.720140558331671,-1.391589548638661,-9.431455955137832,-3.0843506723380276,-8.26161945900436,-4.764979490444087,-8.924546527367959,-4.264058082054634,-2.669800685445698,-2.3780868009245637,-1.3185797544890687,-4.503310639847584,-5.03680839878732,-8.164596506586435,-2.7437108426555312,-8.477901746590748,-7.870932670993962,-6.20122407626406,-2.036864675613499,-8.246448347446192,-7.951890494382261,-4.924200834196711,-5.7959049110681775,-0.7822751082330237,-2.749296830903818,-9.819433917697511,-1.0950356429107178,-9.039495292433305,-9.913475419478377,-6.396408812921875,-0.2985426551542236,-8.724073157261023,-4.4083838697068085,-4.897717572222103,-7.257451685455241,-8.516626407198757,-8.001751365441468,-5.261102233610204,-4.883538977466468,-7.494386672659584,-4.28294888385838,-8.641591369115742,-5.671347145952687,-4.060404463914821,-0.6544797402995517,-3.3979739340207438,-1.604834113923952,-2.9564840599678233,-1.0413391321115828,-6.923511785179722,-1.2237634261894215,-2.1072963061580396,-3.3047053583985053,-7.551656983884245,-8.465324797213771,-4.2773405676747185,-9.466547062657977,-6.631236816779438,-7.3825122768619345,-4.370186738660225,-2.7973453012158123,-7.672470257717809,-7.714391405958356,-1.5966671885200912,-2.166413414400856,-9.436566253187802,-0.5985233455841832,-9.963984322728162,-8.32975717990318,-1.1640618778536305,-5.456245971421653,-7.032677158509593,-7.6182289616732435,-1.3558635566633237,-2.621039605457327,-8.895756232043341,-9.604447289230777,-3.0451978453607143,-8.020958426527704,-9.79238064889769,-0.839796364718004,-2.3890996668819042,-5.906941439215543,-1.430646086360281,-8.311731872678452,-2.1122863117285906,-1.3677831607257218,-9.839066800761966,-2.6046199412539406,-8.791626428760843,-7.996837827544572,-6.754932030438601,-6.823532964586089,-6.639534258364861,-0.5921418019310387,-3.594772417628347,-8.739785214812667,-0.48261606166468685,-3.4772215295532605,-0.2419045614334414,-5.941951575999083,-0.969754809299892,-6.85948630940848,-5.473554425061808,-3.6730318066427636,-3.528157901757394,-1.7230980507595062,-3.612390155641325,-7.219799062617673,-3.7480695364149486,-9.157248871134133,-3.115780682194842,-1.2679856336444595,-5.547635659167758,-1.1464382484064428,-3.305362934259357,-4.018436147565751,-2.6156740307130777,-1.324390347392439,-7.321330852870343,-7.880262270563907,-2.63779380387666,-6.669444469562567,-4.451362290556324,-6.623524536878493,-7.793269006234558,-7.538151743665673,-1.223811003818307,-5.0621471063301176,-0.2313402786095331,-8.56151007114303,-9.427797477778451,-8.763047030078955,-6.991083335485837,-8.651374549323167,-2.7470775327132513,-3.571532969634994,-5.886719443532311,-4.8873622969533255,-4.705875560398827,-1.3214274779605883,-7.162786114474993,-6.583328799424182,-2.0968791456424896,-0.999933553467518,-0.5319523639603885,-8.57005669686634,-1.2924230779098211,-2.9707524586810696,-0.4472002069896064,-5.036941488942501,-2.522281515342024,-4.664309266874273,-9.07383292503324,-8.956821880842432,-4.874139063792002,-9.397725369728091,-2.658833260205955,-4.059343546634963,-1.781597562326731,-9.211234215190949,-4.885054340142498,-2.0170575382802713]}
},{}],127:[function(require,module,exports){
module.exports={"expected":[0.0020608848049674406,0.0035706857846541876,1.0314539001088195e-12,3.9544275677663925e-10,3.879753679641874e-6,2.7637552668734262e-9,0.0004648192274109581,0.009503811052212168,0.00028506019170366446,9.103953756351327e-19,0.00017083787629038985,0.0030909489798090503,null,0.001286217206154959,0.0004633560361569667,2.7333162776203598e-11,0.00016812746345597391,0.0012433443968488667,0.0003290558483514236,0.014398323428384851,0.00610392296371736,4.099644937576012e-6,9.489781576947576e-15,9.73878028581271e-6,0.001549498153167409,2.9584578435755896e-6,0.00014848239750682186,0.00014537612036637904,0.00023663937023093596,0.005971809732914727,8.251734394123422e-13,0.0028766514484465607,0.00018987757542327535,0.0,1.4160477188748638e-27,2.960131628781489e-27,0.002113542507755518,0.0002859944701538123,2.396073451028732e-8,8.763239102041046e-6,0.0027334579664544368,1.2643135633785797e-13,8.375397242405626e-32,0.0006461090556411315,0.005683887301746986,2.1432141690301596e-5,3.48473607377838e-5,0.002000602456918211,4.0406710490812534e-11,2.4524892665843965e-5,0.0001619424586149795,0.0007589127841815113,1.1282305798009778e-6,0.0005954077036298004,0.001449035406330703,1.8536237740573333e-6,8.546705190444223e-11,6.914881563386476e-6,6.124825426156922e-13,4.1687662080905175e-12,0.0006856005614362509,0.0007846515046175281,0.00041524506570273195,8.739188904679914e-6,3.9658066686791e-5,0.0038207024817365604,9.551153339054928e-7,2.7286771366940066e-6,6.927294960642422e-16,0.0008549682161190188,0.002292027533838045,8.185422809540821e-7,1.4485052397180752e-9,1.0003603641658542e-44,0.0020572886103607476,1.4149024075992152e-5,8.234485791802324e-7,0.004618267279002529,0.00018341018605457646,0.00041470815749507033,0.0009259447627055367,5.381427934824624e-5,0.0010021255102958344,1.3361882878178172e-39,0.0038972844609812575,0.002620908314254071,3.206236460588118e-6,0.00016879770007159365,4.6827165482621876e-11,4.203469925437691e-7,0.004811569782976367,0.0005271546112746287,0.0003343187634905208,3.103782192308036e-71,0.0062391786265121344,0.003175437486141599,0.00015705684239532023,4.5602993224513636e-5,null,0.002419099471859567,3.160793568457051e-6,3.388982527212923e-7,1.842494629216317e-10,1.833750559413692e-5,0.00025203943597849285,0.000552720310472049,0.00014562019112119982,0.00027049553792952226,1.3324552106939622e-23,6.012392314890477e-14,8.815638031399139e-19,0.0018686680085020049,5.724404570441982e-9,0.006285333751453288,9.979874739125447e-6,5.7452161960507456e-5,0.00021247188987290688,7.08298569936428e-5,0.0,2.2019661727872716e-13,2.1410970021215886e-7,0.004547671626406197,0.0003042727913406806,1.2134866405818924e-9,0.00019472147215491968,0.009628597856390203,0.0004328223379944083,7.185390132247082e-11,0.000271702158665002,2.001543909417038e-10,0.0006557916410242107,0.0003646611415087713,0.004441748492948272,0.0009638431595526943,3.4775250175406956e-6,0.0016327012612401678,2.6648924859482747e-13,0.0013808031792036121,2.6719279003192324e-5,0.001238615336633862,8.130179123508647e-20,0.007219846464375119,0.006411916610267243,1.5839795957701916e-6,0.0017242811525950464,3.3626621433273864e-7,2.2869862375369472e-7,0.0002804529403292483,3.8636189960744624e-5,0.0003538696549796832,3.885251008598971e-5,9.11846890645994e-16,5.860424407986047e-14,5.661794653195651e-5,9.27037751139512e-12,1.6030622744461766e-6,0.004461184281422118,0.0009480362515533606,4.5450866993557256e-5,0.0026578193452863,1.1916559497521312e-5,2.4028764875201463e-12,3.0443769749841693e-5,2.69272862612287e-15,2.841674967522567e-14,0.0004111454615049343,2.1342805950195346e-16,0.0031321258867210286,0.001541521387760497,2.9062492266502876e-7,0.003768905273706365,0.0005978281184479161,1.2586041685167527e-21,2.3098195946080208e-8,6.236104037298841e-6,0.00019544919138529736,1.867108311836499e-7,0.0005951965112910436,0.000720635624105643,0.0022324891587527803,0.0003099705368565668,7.69398387370812e-9,2.0455459648473705e-6,0.006179371841477702,4.407715432660973e-6,4.159929814536491e-5,0.001235713540451524,1.2581201995682523e-9,2.7834975005440342e-5,0.0002678130927383588,0.007428907965992949,1.510056115895766e-10,1.3684281318910856e-6,0.00022163982805637082,0.0010396728366057614,7.833933132047839e-6,3.43740065086312e-142,0.0008678292274995433,0.0011211728663199415,0.003798497241196579,3.302982007389598e-18,0.0,0.0016287355832812786,0.00017752504536595144,2.9638485047370956e-8,6.662298470143454e-5,1.186002944074981e-44,1.7140082702613448e-17,1.091341797812266e-6,0.0003347983676695685,0.0065843091446292626,0.0004061645137788483,8.367370937196337e-6,0.0002328760683254568,2.2120673106678636e-6,null,0.00014662955182065016,0.002489284085982432,1.1601616913696833e-8,0.0010728501265946505,0.00031548343776137584,6.0212292963182094e-5,0.0007734631707446012,7.680952817854318e-10,0.0011806168681403016,6.449449319332541e-16,0.0003119959821259556,0.001055872499271815,4.2534891769245856e-7,0.0001356182544346807,0.0015393591778919474,6.680972904948641e-13,5.359004087463308e-21,1.3236187608810743e-6,0.0005033405646180643,0.0,0.0006969247093774587,0.0019511860824737409,6.495202129946406e-10,4.3966913514113266e-8,0.0022459779683810014,2.482060539776405e-16,0.0004889699978120577,9.040715353540787e-57,1.562939254985972e-5,0.0004597134278359106,0.0004725342395757833,2.7725678735925132e-17,0.0002543851574930153,2.497517585348375e-16,0.0005152847934053069,9.637486706923102e-6,0.0005183127525481366,4.593301018004358e-13,0.0006708092330562,0.0010440653313542778,2.271912885513716e-38,0.000511169165293696,6.7893766152034846e-6,1.1080707061900048e-6,3.689136633779366e-45,2.0350595798457343e-5,1.568041110214726e-9,3.55207356547288e-5,0.0037812908360337623,0.0008822783617465099,0.002916589377089778,0.0014384617221366385,1.1765623365663839e-7,1.1563784683379576e-7,1.4059644390269822e-9,0.0033899047046156245,3.834021730765833e-5,4.963329839398951e-9,8.969137392630071e-6,0.0023523703665143557,5.156488452722869e-9,7.328549572497564e-5,2.4439055285826423e-26,8.550338943824604e-8,8.790461370896818e-5,0.0014095673694080888,0.0023575016226547504,0.0009470562482047678,5.892241712822193e-5,0.0039241804258398705,3.43506150744867e-8,0.001966696433477702,7.175744245622973e-5,3.7801595963934665e-6,1.6082669633108516e-8,0.0029161615851171826,2.4929094824243162e-5,3.347695210021375e-5,0.0036942429678711477,1.4315019194915206e-8,0.004756456608111436,0.0003435292782423661,0.0002843534057637603,null,3.216390005111149e-8,0.0029103562486577587,0.0008687163954043054,1.3225612735293288e-35,6.789937420103506e-17,0.0001698517661797269,0.00019690295789889735,2.6432122161711832e-8,2.409840740722102e-46,0.0016250778797515428,7.924834762846619e-62,0.0006452165238264376,0.0003590646435927872,5.903121965054107e-7,0.002478877052680174,0.006395930247761816,0.012042677955306143,0.000348158564306511,0.008920284586100849,0.006115509886938289,0.008298296617832417,0.0014136584670267176,2.1659097498826512e-141,4.249730786455028e-7,0.0004034884267061186,8.625440486250732e-123,1.173713564956959e-24,0.0006461489222933077,1.722354361355697e-43,0.0023585271043742514,4.4958060614700105e-8,5.074919707724818e-13,0.00022478570784070478,1.6662497295937334e-7,8.198776838193334e-5,0.00158826131358118,0.0013414381807935543,0.00011339133622494025,5.696694716533123e-7,0.0004625390749176758,5.732508253327759e-13,1.9881437706013043e-31,0.001339048231733108,0.00012331592738405462,0.00017694746908390914,1.0733187444751935e-6,0.00027065802401641143,7.561007571098058e-20,5.861636192370121e-9,0.0009119832261593744,0.0031223089236188683,0.000574116643904075,1.659413685173053e-8,4.01686424925946e-6,0.0011446824565126692,0.0028224484512049757,0.0009892121418422835,0.00012451491350703151,0.00030252581154049425,0.0071094334793574705,0.0038709508970055065,6.536518344784918e-5,0.0003521739717073991,0.0008795358243016971,0.002047545557015629,2.0835136847455733e-22,0.0047719128866375365,0.00018731435359282915,1.673476821410055e-5,0.001044098538907383,0.0004915322565547061,0.002631002292210783,0.004227279207456525,0.0022316375633977064,8.187150997286072e-11,1.564133919959273e-37,6.301193469963833e-6,6.807062963731298e-6,9.611691572912949e-12,0.0001721177351007115,2.397897418072705e-5,0.0020678203445736805,5.707639831952426e-5,3.2527756113972163e-6,7.614273266009105e-5,null,2.127428898866724e-48,0.0014114826296737193,0.0015524552188992014,0.000404760246833791,0.0012450491191373608,0.00020025495943157273,7.214190895632397e-24,0.00016831787221245105,0.0013076840937902357,0.002081390428929043,9.466676397869075e-6,0.007259418177528769,5.427131303038019e-9,6.968985417710499e-5,0.0012119767715281355,2.9491192417415465e-6,0.003367231056915115,0.0002500237594823108,2.131200623940895e-5,4.3329541806085434e-7,7.115795194786031e-5,6.725270528582591e-12,0.0025830712915131436,7.704303572928903e-34,0.0011645418633985402,2.126749327201233e-9,0.0008470544411507769,0.00015977169400530772,0.0013792003427971938,1.3118828642252333e-7,0.00023417282651717034,2.0167438404376265e-7,0.0033357116883401877,0.00011743150636003925,9.053854735837783e-9,5.318166984679218e-8,0.0014179434491409582,6.740261698707964e-9,0.0012423154215998502,0.003162389462087057,2.936525850232498e-5,2.703455538174266e-20,4.681868778696594e-13,2.6675080476366828e-9,3.4278033628528985e-8,7.437604300602559e-5,3.271902173833828e-7,0.0002875891074174548,0.0002022782116885071,9.79554632075686e-24,7.46740683769807e-5,9.373475120173725e-8,6.632837419611402e-6,0.0003130773926361929,0.0009052806420558601,4.966462388940243e-5,1.6217513473715175e-10,1.1815741293831423e-9,0.002304834821630046,0.003079628592664089,0.0037503921951279533,0.0009382169607009298,6.330329878861705e-6,0.0014205457921039838,2.760742681300999e-5,0.0028141747527370927,0.0009152451071685183,3.0262818113088765e-5,5.043026035775364e-54,1.2581180023363587e-14,0.01095935973182308,0.011582582890618236,0.005420016471558652,5.494082249868771e-6,1.1504475031799253e-6,9.8627484373399e-8,3.546206898658548e-7,1.138291555025785e-7,4.2114168650594224e-49,3.703672438824885e-19,0.0001032960852052003,0.005154440565070492,0.0002997270262339945,1.6690772358628586e-26,0.0011108593247815982,0.0014823430640627734,6.040644193310719e-15,0.00010623602236689557,3.2883451169065355e-21,3.2795876371436984e-35,2.874412231814609e-6,0.0028979142758883553,0.0010911332705940946,0.0018126370879896672,0.001453275314294516,2.5964027754340944e-5,1.4755899765554139e-6,0.002648258069557321,0.004008085022613587,0.00026478733184533647,3.4559044367990214e-15,7.648008986589203e-14,0.008325398466472999,1.327305509658186e-88,2.8832585790884053e-5,5.610881837211417e-9,0.006019889874205358,0.0012216006147508095,5.969734155165721e-5,7.483643192256063e-58,0.0021431011994481994,2.109088114793238e-5,1.1246677984078705e-5,0.004783361479115083,0.001909912341596629,1.1263164392877707e-5,1.9319551506592818e-6,3.567030318927958e-5,6.229762849663164e-8,6.478224852037275e-8,0.00012137911587969233,2.9314058756423346e-29,0.0018403870937319536,0.0004088494542989451,0.0005008953277720492,1.499914635923889e-6,0.0030103671019293616,0.006605658593691559,0.012322378539831445,0.00042053880872450385,1.489777232150912e-14,0.0012337252368728702,8.567659034050346e-12,4.051219754335755e-8,3.1911900751125035e-5,0.0009596280372255466,0.00048150488696847924,5.027932349989258e-7,3.524401649984728e-5,0.002096726972033991,1.8508082822008623e-5,0.0010513455074735508,2.386485011123675e-53,8.582626963423246e-5,3.0857700829693735e-142,2.4001597629236094e-28,0.00040379890814062355,0.0005152997090415898,0.0005706367814930347,9.371408332762341e-5,0.0017020531816430058,0.0001401375201015274,0.0007284070316305654,8.654895027413912e-5,0.005415034997932548,1.2006769114553137e-6,0.0014755865073939208,1.3009881388831231e-8,5.897246471796795e-7,0.00018298772578089983,5.962354439175933e-6,2.8344836233588602e-5,0.0002659206048692183,0.0029557944476752756,5.426971852833975e-5,0.007830868893921629,0.00048542099095442385,0.0006043783325652914,3.6237229322101863e-63,0.00027854386007331136,1.9493926481281649e-81,5.7622766711755013e-11,0.0018113037143855288,7.435231924821133e-5,2.666564389369026e-5,0.00010445410878338077,0.0009164965149366787,0.0009097809049998211,1.994816285677498e-19,0.004995700497406479,1.387774349728329e-18,5.3974161030182354e-5,0.014027046636112631,2.274313097175084e-7,7.700419375483121e-5,0.0005227906266607295,0.0002366860352964214,1.531901292582895e-5,2.817235548993002e-25,0.001439691240251476,0.001337836086709511,1.848387571944457e-14,1.8712301872193623e-11,5.404832238929929e-5,0.000611820796475301,1.5586447180221587e-11,0.00046086114380794626,0.0037460237050664833,0.007831924357874467,1.888830918715023e-17,0.0017911326926725853,3.001075556925185e-9,1.6867496178586445e-6,3.046149492433844e-20,0.0005235990915459569,1.4411594285672135e-8,0.0021147349321503457,0.0023024618662082475,0.0008920360901129316,0.0004202501172767142,7.661098545481298e-7,4.020442287609586e-12,0.0009446793088771498,0.003817931885487644,2.400952382255256e-6,5.890108218516532e-6,0.001305977514083116,6.037658311142658e-6,0.001593428588191276,0.0010320883598279311,1.9919710682777075e-8,3.5614249856705697e-31,0.002857370650663057,0.001979435523862027,0.006035907760764876,0.0003786687906990636,5.278240396735527e-5,0.0002543862726571865,3.523886711167004e-20,0.0008289776258849088,0.002802781004964267,2.1901203370566534e-5,6.411476761454403e-6,1.6581685601509601e-12,0.0007512771376337469,8.974184730609448e-7,0.0049517319922920315,4.116227536014457e-6,2.9179758862305355e-6,0.0015073890597188493,0.0016198466854069223,0.00038725113462462636,3.148137895591544e-5,6.382760280653704e-5,null,0.001534999703800712,0.00534620922389692,0.00012404226478980444,0.0006564534993455176,0.0010740600208177574,0.0014240801943081755,0.002080928219342046,0.000995005495904726,4.933359347297504e-10,0.0019226503957706226,5.8064806156328716e-5,1.6055143280985595e-6,0.000428481030582133,0.00014225676531660789,0.0006696803558162833,0.0019065792555752205,0.0032189965310479283,0.00010772095641431933,0.0047445113093817605,5.288177354117968e-12,9.774068245605213e-21,0.0001145628241815857,3.604363613101243e-5,0.0013802341115101552,5.614951127588183e-5,0.00895930997088825,2.1406361908466413e-5,0.0006970520826207619,0.0009263912092663288,7.872385797829256e-5,0.004989133001611536,0.0036120782733030645,0.0002428170323103361,1.1225443982168168e-10,4.268291290154381e-7,6.378297883061276e-5,3.7079004161721425e-5,0.009946964892452214,0.0015012562634731115,0.00022800844016846803,0.0014329833334218907,1.4463240647009296e-9,5.790692459614166e-6,4.823094827440688e-5,1.0478839348870573e-7,0.0009684243929997946,0.001425234626344842,0.006592675867568143,0.0003350436366254505,2.1501806114156793e-12,9.705341428357096e-10,5.803106045347724e-16,2.5531707316458662e-5,0.00021410807950803624,1.5407186721193792e-24,0.0033856520253155143,9.494334408103714e-5,7.565125691449535e-7,0.0005495480952164175,4.813980548928231e-7,0.00016323197108026254,0.003601891494444211,3.9883293729403376e-11,9.49493393199003e-5,2.972753202744915e-9,0.005172139501185752,1.3584313254256022e-8,0.0001531289168899132,9.076938109565296e-5,2.0417607690079317e-152,5.8928359809673425e-5,7.23180096516026e-6,0.002705053007712973,6.551782963529236e-7,0.0014233656092321068,0.00010226191933477086,2.6619389637363634e-5,0.0015457574315372886,3.0430179955211117e-7,2.057624167963161e-18,1.527916873759024e-8,5.29640303283968e-21,0.00020911864312985116,1.0684487084702974e-15,0.0009796615940255442,1.6696382031340692e-18,1.1365478476164835e-19,0.0002850562586167128,5.576747148316216e-5,4.560564841344063e-16,0.0005663122409919773,0.0013825088118784004,0.0059185875267971115,1.2199186766260289e-36,1.3460020677879264e-6,4.740407319781389e-5,1.2041327328210749e-5,0.008885457287254764,5.675394425268279e-20,3.911653488564434e-40,7.615670932561615e-6,2.4687938290770757e-6,0.0009070108806537909,0.00030460252260026353,0.0007305808088544316,0.00016552894172280707,1.73422874380915e-5,0.0,2.503787642676382e-9,9.894724264263462e-10,0.007428391727302796,0.0010077654521906598,0.0006633147156609547,1.5420649988554697e-5,1.0410334958757435e-6,0.002659744824507451,6.192711956846103e-40,4.4442366385778e-10,0.0002458164104576176,6.858627258658836e-91,0.0023865519544918716,9.678806671861301e-5,8.639893270490739e-5,4.0591202854586715e-8,0.000628688392113303,null,0.000997171977973471,3.516742237339269e-5,0.000675066137752559,6.67754744285633e-10,0.006266147465979088,0.002163037490795766,4.5612286480101165e-9,0.00225230935516019,8.232889891081777e-18,0.008114801209345494,0.00016074679754298602,0.0036296834369555202,0.0003698204284072634,2.3628359362051624e-6,0.00040442873200966905,0.0028875526182461104,0.0002430972998344109,0.007131287027560078,4.704177355697269e-5,0.00834248826611363,0.002872783567206499,0.00015673164213585853,6.660080801567751e-11,4.130951828234105e-6,0.013503166018031518,0.007083980968364303,8.795351955341445e-5,0.005567690109327398,3.410753708837843e-5,1.5120098681738461e-5,0.0002470485068975548,0.0003163414192199472,0.001591106508853487,2.269969995669679e-13,8.676384286360952e-6,0.0013256768133907732,0.0017891034414283418,4.908026456025169e-9,0.001406419755740453,0.014592839363596146,6.444628423733308e-5,0.0020065498550866224,0.001415094544487018,0.0003518593613037372,3.983978966392729e-9,4.541665993361788e-7,0.0002459862162165934,0.00042201873588316416,0.00010928169501010693,0.0015519272864331448,1.7360589848334954e-9,0.0031656322362717815,5.395144366861613e-38,2.8031956743970195e-5,2.1591905123252352e-8,0.0004343605363926482,5.372816486853285e-7,8.119986275306804e-5,0.0022062546580564092,0.0007259486455230632,8.806739962332754e-6,0.0004949119302296593,6.315477354531777e-117,5.494560831988412e-7,0.0004570875769542933,1.3253823073851714e-6,0.00013318304693684418,2.56250299539574e-7,2.7817634665470025e-6,0.004822583788586923,0.0011835786168751805,1.7297152356530158e-6,3.5467387571479705e-35,4.942857538160477e-5,0.0027756873441240185,0.0007669793454506153,0.00012604161310579922,2.9001411661545818e-12,3.65460984543919e-5,0.00037796657009334274,2.908256648592052e-18,0.0006027054936385603,0.000656084150853313,1.9392734168090682e-8,0.0014563242046521584,0.0006443169343961529,0.006123834995925855,0.0005927794616131333,1.5579595537469628e-44,1.6379558040760264e-11,1.8918609398944202e-12,3.6339092998145994e-5,0.0016296878668723275,0.0015803326563019354,1.0435856857951226e-11,9.14120330004183e-25,0.00040732710605253787,1.3696726862276747e-5,0.0021473877912549827,8.096308886342822e-5,0.004492174206225999,0.0023497084460932507,2.8017714568102283e-23,0.0010330083034726589,0.003487116828786432,0.0,0.0004909014262215541,0.0018550335274977003,0.007428954227007816,0.008341731008610513,0.001213216885095177,0.005928626309610826,0.00018818355493794547,2.255927679840477e-6,0.0022625169594151892,3.0217219621005534e-14,0.0034880009378532345,6.0309825323210884e-5,0.0010972067293375286,0.0012234917798898957,0.0036328484942272053,0.0005390031336877743,1.9055652500970446e-7,2.874561669931652e-22,5.971951575286493e-9,0.0007127638747079949,0.001529738753992047,0.006089023344371875,3.6637566847652498e-6,3.323121487116743e-6,0.004195405108314183,0.003821488751506449,0.00012274322683255838,1.3667824342585495e-5,0.00018157265315773934,4.2957252373947914e-5,0.0005387746007813078,6.008749291963463e-9,1.781412579706204e-13,0.0004267817124575501,6.654309631494766e-41,0.011882158189142794,0.0004911021029258227,0.002054878877942881,null,0.0012239782518103756,3.4168087429396495e-5,0.0010483271051025802,0.009933322390983938,0.0016852662859944436,5.730628680606135e-7,0.00042033009124157664,1.1326461867471976e-9,0.0011151104852077723,2.229707658208532e-8,0.0002761893217231315,0.0016164178003560798,1.2567737905503398e-8,6.468178388824962e-21,0.002765884640043216,9.943291042664384e-5,4.290066090336899e-28,0.005141755736563297,6.217377234748673e-8,0.0014131333290489923,0.0006343775307101418,0.0022819699700309926,6.555620365673033e-7,7.816245597937806e-7,1.8608107882507156e-5,0.0009434823969078403,3.7738946179511555e-5,4.443740302040929e-7,0.0031296594189752724,0.0010039231973351284,2.9692977603922373e-153,6.681927002847649e-8,0.00010047736764315165,9.807560027835662e-17,0.00018612640874576743,4.267440588829372e-5,0.0009139195734406742,0.00015913897510205874,5.714010894043507e-6,0.00025476172275839626,0.00013685543251784404,3.0692183093428625e-7,0.0015405135995331717,0.0007317054565099564,0.0062361108230527245,0.00047682625213488975,0.0009056384327999249,0.002819978393481065,0.0014730749150382784,1.5827730935226885e-5,2.979765307051017e-8,2.4323312283972814e-5,0.0036968219260580344,1.8441344849611522e-16,0.00022510640970123717,5.858128306599964e-5,0.000427639570610532,2.109429627602026e-11,1.2206359215334119e-5,1.6573092291792473e-8,6.915099745546897e-5,0.0005529113591166594,0.0014548109122229556,0.0011169451405522108,0.002536002095223756,1.2955201487017728e-9,0.009941231894891768,2.066622972852392e-9,0.00018883450803206344,0.00013931046572824595,3.0093550991259096e-5,9.767348863085078e-12,2.0208111461450227e-53,1.0227595909542557e-8,0.001968121518344341,3.7362140872122594e-5,0.0012059981460208061,0.0030595637702720445,8.69600533311939e-19,0.006245717687312351,6.036100622357808e-56,0.00031387956383050413,1.569428286953386e-63,5.6093983997234485e-8,0.0014095375861259923,2.565205100588315e-7,2.899091653276286e-11,1.40066126433334e-51,0.0010962282228848812,2.926332211352909e-7,0.00012189882213076966,1.2483268093791712e-9,0.00010939549809381162,0.002242464840825245,7.0305275176335125e-25,2.7355080054111656e-8,0.0037261685257149665,0.005396852775845089],"x":[-12.179626096639595,-15.090210533081983,-16.212720542624286,-15.566020077359948,-11.797057958328148,-13.69397726299038,-17.02887670881402,-11.329387611964961,-18.186534280851383,-10.940751493498741,-18.265443748246444,-13.293800495524245,-12.759563256596163,-17.537001720778015,-13.879998355687352,-11.386883627788736,-17.79830362579841,-11.649766906694914,-12.765142187464454,-10.325908885004312,-13.752705068485671,-12.307632269514466,-16.780601676981114,-18.61927774954635,-18.38910322833437,-15.18558296565886,-15.992169998086357,-19.50947182646743,-18.084502282684205,-10.674259398203654,-16.790933657721293,-12.913510397077236,-18.109014921080245,-12.65494692273455,-19.949343100514042,-10.447890393446011,-13.31069957264477,-19.560447556561307,-18.179426622022408,-19.351415933337066,-15.16788806990525,-16.53235248283099,-15.874259984482169,-15.289334791190283,-12.812516358881354,-16.90197547086586,-12.676094457867542,-16.68906334622665,-11.14354286974051,-14.01170847299963,-19.760274979651467,-17.600215147389772,-17.395131782311044,-17.360254935186042,-14.368778339048205,-17.761006867611613,-18.7263669633155,-18.45435349209154,-13.441133142752529,-19.637672334406474,-15.815557019301389,-16.602521396380325,-10.22471325910047,-17.983625031474922,-19.067250941872015,-18.793261463439087,-18.05419050160539,-11.25158470983856,-19.077236999016623,-18.196812303338547,-12.758907837953107,-11.959566735978624,-19.10287174566996,-16.101879102191383,-10.528666706169055,-10.366985775593855,-14.07027604081405,-13.295881860183806,-10.842198496718238,-13.953346055784863,-10.635196438968435,-19.273984474207523,-16.290132980125893,-16.489228335007407,-12.983837374122233,-12.044497105329203,-16.781609858459895,-13.439813040446488,-12.55030783309143,-18.005502497142324,-10.603774764150018,-15.110400381592843,-17.358722167102975,-19.38362915971466,-15.760522258380497,-14.939288080688344,-18.681708436074626,-12.72308702327566,-11.781496316013447,-11.487151558193926,-19.247316417014517,-11.406495120237405,-15.541300967163423,-11.741894762675587,-19.12395878782617,-10.805605075913869,-12.20877466063376,-15.511772083198787,-11.999509530503339,-18.80993573632851,-18.175752037962415,-10.031276299671854,-15.058033134020723,-11.870761710501496,-13.773773918199712,-19.42864408671504,-15.172816056577933,-17.199652102972525,-18.332862351881115,-14.664871567692144,-14.234833739540552,-10.123774648000214,-13.436474752142878,-19.580268768109427,-12.171894265041763,-13.149294450611768,-17.957259052504785,-15.208309458880416,-14.684817637734831,-18.986358549237078,-18.652379509468457,-13.404498721918259,-10.8164332175294,-16.393976552394403,-18.956030486207524,-19.079708836795113,-17.45731683652913,-11.648573089408751,-18.70580266353519,-13.285206912121858,-16.256342437213423,-14.88021949564587,-10.792939387491874,-18.038335365953067,-16.196493799503397,-17.750478193881648,-11.054256776488959,-15.622467247230622,-18.068662568094737,-18.53753971177803,-11.228385959050788,-11.014738305009155,-19.048616439310425,-14.687444458476055,-18.299076255122387,-13.74190622318066,-10.179565395814485,-10.470631906736783,-19.478627687122014,-10.451228246722689,-12.870943941078938,-17.981870255520413,-10.471139188042095,-10.8602215812999,-14.218274123630435,-10.443017078291394,-15.926599182246308,-13.864863067926672,-17.66649873603939,-14.277625958018758,-13.806447681886356,-18.479138096272607,-18.499036822159308,-14.118595402846603,-18.587176212050984,-11.335662756818742,-13.761431968230557,-17.91110735242923,-14.612377460310675,-17.356984581594503,-17.836641166438444,-19.679414078546316,-15.404098511266621,-11.780227224620086,-16.290930751616802,-16.249353394355314,-15.319559051406095,-14.18055823867589,-19.577336343872943,-19.74912892825202,-12.081851732092787,-11.534489335264617,-10.743266041535142,-13.525300761011174,-11.244547248961803,-10.757291483269501,-14.187048594851568,-16.39013860101138,-18.181575708193613,-11.985534554687202,-10.230185566053272,-15.903104812375554,-15.924854853971373,-18.92643568383871,-12.016611103651037,-17.774634034980174,-12.91374711844411,-13.603502488348127,-12.386281483331945,-19.359065294223477,-13.463949953282327,-18.252138805149155,-14.354321405171945,-18.6508509742286,-13.374542162833444,-17.269616123124546,-11.129167720553081,-13.951846194566413,-17.79763839479383,-14.865619787256417,-11.328874770960287,-18.623585119261538,-18.021421968190914,-18.505878243407057,-13.669940455835786,-16.63364932651597,-12.781096342841554,-13.673393709589467,-16.900354577796996,-14.64599578571879,-17.298350513465277,-14.487306446488086,-15.155494442027749,-15.050953230571931,-11.126749666044374,-17.793131358455664,-17.637155193077504,-17.693073101127,-13.337216380520985,-19.11908051010173,-19.561374414438504,-12.905922488165618,-12.117567923940989,-10.500729083559888,-15.418892619467144,-16.944676149347686,-18.493249874998966,-13.310884346956362,-10.694160949192451,-19.457364592210457,-15.104421607503404,-17.168289840739444,-12.569362618003563,-19.78404902332125,-16.382067424146193,-11.858918532929392,-18.73613537369327,-17.906240961907038,-15.17084447860901,-14.345798063491117,-14.629693609557794,-14.040928097481455,-13.301652664631122,-14.172433355203706,-15.670365587407444,-16.81008495175306,-16.346518812380957,-11.812189119707316,-14.140417099468136,-18.91450577776579,-16.49279912763374,-14.706710114073454,-13.205825128654695,-13.474464427087563,-14.32171147797578,-17.28013448464941,-18.81877724479186,-13.896339600564309,-19.939182110531007,-19.821558805173225,-15.280957603665907,-18.62263441983941,-19.014333106435405,-19.620788402431323,-12.692650555235133,-13.004936097742677,-19.377058627185125,-14.05995438638448,-16.045510736361216,-10.962412178399967,-14.962114031548104,-10.189226425633569,-12.334882187384753,-18.222138612941247,-10.742433586105323,-14.203584073455385,-14.15051827046084,-15.181981197135405,-16.064766913730804,-19.47380834974135,-12.820303654286429,-11.457905400028247,-16.482301921163344,-11.62039563568702,-15.592714852056577,-15.178782276345624,-15.674895499214296,-19.71860206313092,-18.608390076470013,-16.504176468817025,-19.58216322338987,-11.049807525173707,-12.743066299635624,-13.445786452489552,-13.623469005143388,-15.06630292918517,-10.950265356456722,-15.027509728461572,-12.472696306630528,-13.172558480780337,-10.16967831738163,-12.301329678574675,-11.368706856612466,-17.731857741008223,-15.425477294735977,-15.59938127333584,-18.29287118222783,-14.031155805490334,-18.288153077043674,-10.33319515028107,-19.558574854962377,-17.692816484003334,-18.83247572896502,-19.225317345590298,-16.896737814877802,-13.373616204707957,-12.397421433357376,-12.38817596079086,-17.283431053734514,-10.396545620576532,-11.459870414241575,-15.715672950412522,-18.503918343830346,-10.733365875655478,-11.984363247964186,-19.47987494508289,-13.103020720207656,-12.541017525785936,-14.131200908259094,-12.60753451474818,-11.315415932712616,-16.910931559472782,-17.208528688626068,-17.64556198692952,-13.520206278412171,-11.595207342464882,-18.41459517070025,-16.185915010379958,-18.334194708912136,-12.123680115918829,-16.597133888875685,-19.293817894501466,-13.805761611855187,-19.46276500957338,-10.217317068657305,-17.798101402955023,-10.511137247033947,-15.705930062867928,-18.59064573828662,-19.359878596938692,-16.11780054867948,-11.179240669857728,-10.667005651363493,-14.305586068322908,-14.579315117494616,-13.15260713972682,-13.328038425638564,-14.444784097302716,-13.162080661823595,-13.582003703468883,-13.48471646635341,-15.777669089911965,-18.182427186605672,-13.732827125279767,-17.732698033056675,-18.873098723159984,-10.098019585723911,-11.386003544179054,-12.769858412675894,-11.232885787585074,-14.238206065744873,-11.561398313969846,-10.949299296152898,-19.557573026901853,-16.47188138611299,-13.239049543522214,-18.429714357492834,-10.669402669007749,-12.510198759461595,-15.723215794763707,-12.16797480716606,-14.77250282943502,-19.02920533592422,-18.296664867698908,-18.90662753121218,-13.649971640850382,-16.847986868699163,-12.481132339331358,-11.55112896959929,-14.572885284399737,-14.895774177016396,-12.699012090354971,-16.082320600393512,-15.469302066558006,-13.484406981075203,-11.756902952618766,-14.979591319462426,-18.49665173395557,-12.48576107277669,-19.822607368986876,-18.964057975981518,-11.934638836110835,-15.36027557744915,-16.849377015143585,-12.68902131802327,-13.569953521905475,-18.974595819905293,-13.315650248694435,-18.85828587375383,-15.580313720143458,-15.901649622289726,-13.908302758953337,-15.036204570016938,-16.10813479416999,-12.73297690197159,-18.208004306640017,-13.803472310889045,-10.053469851212917,-13.145757652423073,-18.800125839098495,-16.60271588685365,-19.876721652263072,-14.956734070557221,-17.817277817700734,-13.344299220496307,-10.144452883837227,-16.470401990495027,-16.08333326752871,-13.831518768183555,-12.184982269108334,-15.34082663624446,-15.545408907296325,-12.039898513441248,-15.979737295235623,-17.302842074675777,-11.036416584821588,-10.341411340660855,-11.360227778613785,-16.46542490046909,-16.041419113427388,-17.031727419133812,-14.664864559190004,-17.13270382017931,-10.620680386995268,-16.047134631520183,-13.33195482755453,-16.177665229564692,-10.59193284851628,-18.133725535200863,-15.665321683234614,-16.59095142387499,-11.491990076096567,-17.6947661259304,-17.660796660616022,-14.150297954974153,-16.258149877869023,-13.57914502076933,-12.078435889762995,-16.549644584800554,-13.485786575348818,-16.842187963982468,-10.212162843544599,-18.52036267494194,-12.20146082168353,-12.246422637554844,-16.334786584951722,-16.725430172825963,-14.702581092016038,-14.082610735257594,-17.913466251474283,-16.002278502015045,-15.125803508994142,-11.013835429181754,-14.65457844837733,-18.478527343073317,-19.178113259204604,-11.717342248678182,-12.94621732111163,-19.357465676964615,-15.206912477591104,-11.935590201598675,-18.507482713925477,-19.4946618937447,-11.123887497218625,-16.067377262527796,-14.703683378259065,-12.4930508154116,-17.15617422292288,-11.509185685191806,-12.707156969717486,-19.094726514330453,-16.706167239605207,-18.164362187217773,-16.425147292383635,-11.755761800978785,-16.247694739374896,-10.554838179587948,-13.949110709794816,-16.037021367499545,-17.89267067801432,-18.341236230726402,-17.456138780950035,-10.434311983685793,-19.607689369208167,-19.43278899621627,-12.913343477476907,-16.585278474087925,-14.96135238889835,-10.647331482316948,-18.811071498245134,-11.882803485158748,-17.603998839552744,-18.7111465501938,-11.325291137611345,-13.91529095957004,-12.30953619458904,-18.265858992570767,-12.717573721270778,-15.371841971259649,-16.456526738637564,-13.840372934418623,-14.662173627108855,-17.225568496438918,-18.931940485781425,-15.272861804276195,-15.673733927881857,-13.52369648878965,-17.89341239106583,-10.280102009641155,-11.749140504040646,-15.346517021669872,-10.251527561027538,-10.642948186530024,-18.41644125780408,-11.558415529267966,-15.460836267914274,-13.600995922652475,-13.051402714113705,-13.907720629959204,-13.425805427255392,-16.756303428198084,-11.91511588305801,-19.09532212036819,-15.81536044687643,-16.320705501522873,-15.153279463617551,-10.864523066773476,-19.2699648547529,-11.279838713407969,-16.129961255832722,-18.384719711997683,-18.228864475693126,-12.929703937936445,-13.982680500581733,-18.057716420053872,-18.776580750825435,-13.29862715033241,-14.541257002737227,-13.249151114083764,-19.973656456904575,-18.026502158780772,-14.01902324132257,-12.63534169514191,-13.108888441535672,-12.72723007144484,-15.43928641732694,-10.436424942263695,-14.452105871852503,-18.00458609125939,-17.46442640163299,-14.75036010513257,-11.095440299704453,-16.11172271707477,-13.780745148127968,-17.18989726537974,-18.577371903948162,-10.970709805661532,-19.79524602045649,-18.948090947579903,-10.389758458722422,-17.75174365192584,-19.789025299732792,-11.082366845838918,-12.73958424591828,-19.291839368095204,-15.352048644820645,-18.924910271639586,-18.46523218621246,-17.047117594601534,-13.007999704399237,-10.403979504182574,-12.274657840392745,-18.233116158584508,-13.825267136981827,-17.182163336568102,-10.29089445113315,-12.415768327382402,-10.013816703075374,-17.489962580899594,-14.894467394706348,-17.433931866728933,-16.69987103869892,-13.733661306984871,-16.782669482793033,-19.319913189083977,-17.408723690457443,-15.39786295216694,-10.715488146592607,-15.910668996995373,-15.793465376254353,-15.129921742803745,-12.8384254540211,-10.792174460310138,-11.119941943058917,-18.491455268096537,-15.973975693047755,-15.197544029065,-15.928229370517425,-17.6721339761944,-16.76458689220326,-15.7672069713894,-10.554862525441083,-18.83928960331458,-10.015137155607508,-10.493922071351587,-18.902304085999894,-11.994881943417681,-17.421832025888182,-10.124960530222225,-11.724526403099023,-12.72459711188576,-17.215671515922185,-17.04044868852295,-17.24919691501094,-11.55570488291798,-16.92691539343153,-12.139571683729766,-16.459462457169444,-19.375780767648376,-12.793225708467755,-17.34208550737138,-11.944880252740449,-12.156399262508828,-12.447594450364136,-17.286624839328606,-10.375757949006928,-14.146861708278688,-19.249930668426124,-12.02278926573933,-17.710832293128178,-18.039475250090288,-15.460906283266176,-12.664093601074217,-15.722344937033753,-11.727245095186998,-19.95176653746087,-17.02206869135869,-17.201819330934455,-10.022123347905964,-10.234514600697617,-17.244556234457914,-19.205168827539318,-18.650055996410543,-14.283586787111274,-11.48301838528792,-18.476634690816343,-13.260932692683037,-19.941957040343254,-11.91036756336732,-19.623841117094656,-13.514963813288084,-16.223510905678012,-12.654815541405661,-15.730587435890737,-19.36145072948122,-14.460167439789743,-13.058527353196506,-17.57258764076527,-13.86528556189771,-12.61369230399338,-14.338759432663618,-16.457962927973387,-18.617114943541136,-18.341844884703033,-15.67254264233776,-10.362007936257333,-19.684250741323424,-17.15251308878087,-13.32931883335284,-12.329443281920692,-17.861562114024846,-13.762646555110187,-13.33694989213025,-13.32419078527459,-19.885237881430598,-18.133187852657397,-11.384443835419205,-12.294015744604526,-10.173215258980552,-12.951464709063753,-15.443993824677305,-19.51826469115573,-17.223887756827608,-12.107900899163958,-19.630792905273758,-17.337753355275183,-15.508470188793737,-18.64920890769359,-12.80182090150493,-14.032419573307365,-19.302672153897586,-13.751643143374432,-17.978972752482814,-16.18027540831176,-19.085092433262616,-19.012488816404037,-16.15858604582829,-12.47618142007573,-18.913538528689475,-17.85932889274961,-15.794500831354092,-12.38523163391129,-10.448647277036166,-13.246078367723129,-10.209768330446229,-15.275498285616537,-14.368449480032375,-17.983636717396823,-19.11167912454693,-19.368849222507507,-16.55424936408466,-12.753330257621462,-14.391592225003286,-10.292618854622734,-16.712938419893334,-17.466749312297438,-17.80983865152393,-13.299154080798793,-12.111330105708591,-15.65714471046813,-17.776475614231636,-13.015005295322112,-18.58385153468397,-12.39171562610661,-12.254300790554826,-15.966653436988295,-10.445246021468325,-18.89741047699618,-13.96700571817105,-13.030505181870645,-13.174619828762356,-18.04940971544715,-11.945556660772416,-10.210216602022719,-15.449473059285028,-19.49740369523868,-14.37723357061284,-10.71012751632984,-13.28542682687727,-10.220931446274314,-15.484927668261268,-11.379413389273035,-14.973044713991609,-18.950245220340246,-10.960266617051825,-17.7978419342254,-17.88879514726571,-10.703073339411585,-15.735521318881105,-16.835245288781316,-15.724332705951689,-16.85726109686032,-15.39091473488849,-18.965672574842397,-19.891263857713078,-18.042022414289146,-10.479266472434025,-16.759402219639043,-12.717992276057386,-13.209323075616453,-16.216197098864555,-14.267364995964959,-16.073214186202698,-15.968673157748848,-14.351977556540977,-14.785660959987093,-12.58169397024676,-15.963969568823419,-10.578826435370264,-16.377805920766466,-18.55163546111734,-18.970532951764607,-18.903136843300423,-18.718561913455975,-19.406127561917,-18.384960890065095,-17.816215430758934,-14.066143584101539,-17.681563520398527,-16.162887603691527,-17.948135328431405,-15.060326630523404,-16.733386842472193,-11.661705144437779,-17.837363092339473,-18.502706579207885,-13.313061028797941,-14.560611736636782,-12.327474919130747,-13.971486937369663,-19.294264779648785,-14.428792742464045,-11.49161468049721,-19.8858564879366,-16.95586825901225,-19.007672091276206,-13.923536177004943,-15.016234415123456,-19.15344542585534,-16.827877313809207,-12.156272283865002,-14.962017079584907,-18.40673537752512,-10.203470297226584,-18.393445842201256,-18.04973636236858,-14.867295306121829,-16.289278209687165,-10.873866759178226,-19.062011140901312,-14.422885527470989,-15.06916582930179,-10.021481396114034,-14.24416285107924,-18.01787092984111,-12.367224301584068,-14.812709856007482,-16.856698302306356,-11.255827768002733,-17.661636172707027,-15.020719944430441,-16.648971312171586,-13.449713225829223,-17.323422228951422,-10.17382725416283,-12.74205348839428,-12.063546623040411,-17.163632255114702,-12.913715913608442,-10.477098277146181,-19.69225520261824,-14.950431343999021,-12.37605133759663,-11.346629964273891,-18.680619811610878,-10.922692275235327,-13.81140709229406,-15.736929705293697,-17.33354422857327,-10.10034853445853,-19.4531388973474,-17.062783800866978,-10.475549810115252,-12.590197676992554,-10.28105100263848,-17.871997135508376,-10.343588521796033,-12.636215803705031,-15.78942984442612,-15.093827529705752,-15.679446246567162,-10.733331572506744,-19.687481248858152,-15.298832351820462,-14.126991314822735,-16.48866596038229,-15.10143331702838,-10.348473528819422,-10.592040051579259,-18.456332692953325,-14.48482112326399,-11.811248833207282,-14.607677589411168,-13.003737264835147,-15.958830448323237,-13.559725086894957,-18.523531165978408,-11.230845268871835,-16.333508059843908,-12.362184394797493,-15.383432619424172,-15.398889789017261,-18.080737005740858,-17.874684270941977,-15.382967414639479,-14.829270034328816,-11.083004901670607,-14.432775421931378,-15.751028249100008,-13.5793329871796,-14.971136417871037,-12.56859554513979,-11.63620786638729,-15.367728534861694,-19.68218165588268,-17.53146378641667,-14.3579927032283,-18.91320951831508,-13.107537783552662,-12.270674208915057,-12.339144414278518,-10.672141947701126,-15.094881657203977,-15.8874535545407,-19.003307423020644,-16.851139127074198,-17.20876468578027,-17.305872422388568,-17.08213198651665,-16.116830160407208,-14.950618788449408,-16.761813730740336,-17.487720105629403,-13.955066621992106,-10.885161184490883,-18.401701114722453,-10.457897482090093,-10.898195902542893,-17.262813622034262,-13.839420430327763,-15.589316299510728,-17.410131330537066,-14.807983295110503,-17.714826769179325,-12.464257886838885,-12.40043377953845,-14.377510640755226,-10.606568073018053,-11.194931438621474,-13.669529308101453,-13.000272137747942,-13.444644016451479,-17.170087114438857,-19.77137973721356,-14.087615495764735,-16.764006816408312,-14.084171037647595,-11.948809808185752,-10.382401630531376,-11.068086573480054,-19.538980448742333,-19.143913245984216,-16.9104502644673,-10.85593676409965,-16.50726010649492,-14.200779118962323,-14.55000435752147,-17.082069358885107,-10.695700926820946,-13.088036803706922,-16.087108620617713,-14.27817750861864,-13.827582264421963,-11.619192025656242,-18.017054142406465,-18.802507018185427,-15.256210122571039,-16.626122025355098,-17.717880718963347,-19.016835891957587,-10.475140313078278,-12.511905666598649,-17.39006276576979,-18.15235113055458,-18.010958876074987,-14.253098343413457,-19.847624854674255,-11.02835977647743,-19.015729425375454,-12.671605512149764],"s":[3.174387805636493,3.7922657779939617,0.840309347233883,1.0693659539076183,1.8357586210344012,0.994267092884209,4.317486328391059,4.618624513326175,4.009994007320403,0.2730746764704761,3.0185928389886674,4.9496498021442665,0.0025028230141066476,4.1800594842296555,3.0110371323588394,0.5757561740092909,3.355827979990562,2.1073737761447475,3.2617509876305695,4.5794847664271146,3.927911757783038,1.864705060326558,0.5956572535399995,2.115080070533377,3.9061640559214617,1.8810569314746883,3.1546501875285626,3.765052373138711,2.7786630600459272,4.827854087738615,0.8377861251074425,2.8452194971896185,3.060780601655356,0.033254032356774266,0.3902914084818032,0.23432238632823177,4.930484973546399,3.9797037384722778,1.3508844654240915,2.3419580758969074,3.9810460973534756,0.6818289021868806,0.29335874769244596,3.5694328850391113,4.833747836865739,2.3920310077395,1.8465982786189017,4.375980545010161,0.7721253957612106,2.021770721737516,3.5390738822270373,4.398509784804654,1.8594467610606003,3.57940698800969,4.902421411445933,1.9278378010521613,1.217054094889144,2.4998587008947,0.7209029614636431,0.853135620470119,4.089885232828308,4.463425550012866,2.207819503889694,1.971739280183502,2.978259851509648,4.737903513843737,2.0934850043817144,1.7182195748764262,0.6774579823259308,3.886774280973806,4.289989750335808,1.307881245844753,1.2376730196968422,0.1975216399779678,3.9219688193954427,1.612037514865654,1.6044181807441338,3.3677344783297967,1.3576955840922678,3.0910630012434073,1.7901366629109716,2.3786737848952164,3.4343133920284217,0.28385529938246723,4.571725133101371,4.385132623719682,1.6943621828063515,3.00818129153952,0.8270687110147512,1.4348069406409636,4.118671731647677,4.0218702939857955,3.956681270841873,0.12499161435157946,4.947694103012566,4.610015199972855,3.055342200807761,2.075235661666218,0.0160869728007329,3.262071116374703,1.6418507773652724,1.2791203899003556,1.0358935771670208,1.9811926723167106,2.9727272252641135,3.12131414461589,1.5326372055082427,2.984861272450461,0.34826474670468066,0.7954575683327914,0.5430915691551208,3.785266267882336,0.9770100888105071,4.589429559044201,1.416538558997471,2.703248151310469,2.929188187681441,2.937753444209025,0.04640158020236984,0.6172525306014853,1.407746344378542,4.208391356428933,2.645556391655801,1.3995880776595282,2.331192780968643,4.66034388810911,4.258747351636618,1.0396346850498273,2.6325288616487006,1.0485575411629156,4.044640015502146,2.6992467662620214,2.9067240283821514,4.64871413718997,1.9451326624543341,4.454445277803004,0.6299251973389863,3.6008939346928557,1.9993311429160243,4.479282624304124,0.5437121647457499,4.631431128301003,3.0542975721069885,1.5043980219029551,4.575145948099394,1.657990849140566,1.2481386604064948,2.220598175227708,1.9379650158046346,3.436660124542702,1.942040235161543,0.5701510744471117,0.8982572899139929,1.6804471492346507,0.933217352299508,1.5648506962082775,4.512476991779305,2.421833885600945,3.235735990768871,2.989146957989235,1.8822546412445684,0.8470007513428945,1.86103119951046,0.5948901722222544,0.6239333117736612,2.5978145242793813,0.6958290589052019,3.7353323787187365,3.402269717161648,1.2272753470694986,3.3851640805400294,3.949837944700849,0.4714148419570441,1.3653957391772364,1.8386335952693134,1.7443599128464204,1.0120387849168877,4.276337174692061,3.2340091876700416,4.117320956392981,3.964872949527687,1.1672899450865848,1.5048278796537584,4.72745065633479,2.1965765757507807,1.7174395905150774,4.0375704623209625,0.7229030639074607,3.1239814091302422,3.5909654712992567,4.550407233154777,0.8572391526392886,1.4185963692503867,1.8123843595728095,1.923858680210574,1.2812603079634566,0.0703405393025558,4.483337625363674,4.497860337057556,3.8927692831820124,0.4579248656841306,0.05423142156920191,3.767521754251524,2.7910459332441997,0.8503119162188577,2.4596631827573887,0.1922561798653799,0.5391511627413137,1.111351310465194,3.965688984689698,4.78768307863536,2.8969008732066293,1.4751475434491401,3.9867488058660205,1.2322064928785081,0.011798578596896592,2.020410658666071,3.011742593316724,1.3601192601578849,2.7988896956657614,2.469626742124108,3.0111381452082853,4.689408737033598,1.2666735616449598,3.5954811250573737,0.564877562616658,2.6462937753947777,4.365023046794681,1.4447881950648722,2.6447081165723274,4.578995470441947,0.5299044354167082,0.4892600933816371,1.6885484113265115,1.9897797547192542,0.07133703059295282,3.2111902385389013,3.6629668228322254,0.7894543081999772,1.6524772303350843,4.594503606021285,0.5515533884898027,2.898240123689165,0.14088421679020802,1.7148425174533477,4.0479956555574725,4.3921791465538265,0.5250274515508235,2.555194419556522,0.6654105367921748,3.6290758527954914,2.160034183172325,2.8220710347958167,0.8759253718737048,4.421291310157592,2.642663139605408,0.27449459652768127,3.106433896694748,1.6175664859264915,1.1010813590357171,0.18140347336676577,1.4270336570291964,0.8142694220296609,1.6242513281852455,4.7364607958522615,4.394838266484862,4.651419283314589,3.7117926452780967,1.5268736341274702,1.4975841755319996,1.192294302656114,4.354511823604028,2.443248503626422,1.046817223226677,2.050314941857528,4.282096910379222,1.023531432544419,1.6571783736760592,0.48960592927340674,1.8695687276229167,2.7854554077650406,4.522477580748183,4.32772188109157,3.8834971798221343,2.543107678558126,3.342754732247939,1.6167662320619869,4.220614314567088,2.963319072234688,0.9311947588120506,1.0168047771370414,4.251834069879834,1.9894069740415599,3.0028748200797373,3.9126299554968735,1.2596138559755121,4.805938289944839,3.717033828424443,3.314987424545678,0.000899726123193556,0.8490017987480303,3.168290673195574,4.147857782992839,0.18607199054609058,0.5103070145356792,3.2498985999088603,2.7011839900932957,1.649025499579031,0.21013933631414794,3.7512428802232654,0.15609337869173734,1.7244428363232478,2.955551257840343,0.9885731704558454,2.954492075490467,4.841451759169334,3.8345119780868817,2.4490554410946364,3.7864467543022338,4.648100129685485,3.3738213978817013,2.151420812547645,0.042697503051898344,1.40765441333361,2.38768493079486,0.0805229326533341,0.3946123363948184,2.3446120997021316,0.2050038341911642,4.0555066243433915,1.171419877453882,0.6891818180558218,3.7891692727278325,1.5154486788218957,2.0966399435051053,3.3870158708983955,2.8006100036630635,1.9003744058750227,1.5178811438981765,1.8980744810964978,0.5379342525628472,0.35538904739629174,3.582466080082778,2.489209540113324,1.601439622862919,1.6326869313038794,1.8485594150954532,0.3452086157563494,1.1414071411853577,2.9429306584946424,4.614453035391977,2.9157771533409904,1.2040044430531038,2.362947798025732,3.65823982416954,4.411785668570562,4.544377495346036,3.3662960194798943,2.6715938449689625,4.68969097333277,4.356202507872466,2.588895336011544,3.1618719633837333,4.096205318269677,3.887190925598266,0.4638966076649753,2.4657476923202504,3.184679327903334,2.619743935028014,4.807192633913893,4.202384495352147,4.129594111763268,4.3250224151310395,3.6808182463344483,0.9160531559924967,0.2398947212652025,1.637885509790702,1.8649493722999366,0.6279492892970018,1.8449197136511297,2.01369252146867,4.727806011967087,2.552350604630207,1.8176403357086057,2.589978835768317,0.014239797726784964,0.09270946573800454,3.8523512486376466,3.6987968990038023,3.0746854960361136,3.321261711744685,1.8542945613829909,0.2522438782414227,3.9755561809570708,3.7340735140031023,4.1738490696400365,1.9891819934262023,4.980347416092946,0.6799285222330986,2.352936222809081,3.9686789357331884,1.8060505020625206,4.754589453378102,3.602521093057315,2.6658769950285865,1.0060748223125016,3.0068966095635785,0.782239240110737,3.8456238342860027,0.2719391821388728,4.558030659380136,0.8237351298329765,2.7827541812738357,3.1633051505894736,4.06438595528337,1.2909945496506636,2.2041236112865414,1.9202847746585294,2.7354150744472228,3.3029358791607177,1.2441522995823662,1.3212951340879298,4.818219457527549,1.1593312529258437,3.2891383940461596,4.702522639991829,2.7872829797628498,0.3781033383824528,0.9234010856741304,0.8479372926920492,1.1958491580628716,2.7535456897629054,1.2124487624774505,2.841101713450651,2.784244077326851,0.39337294741676465,2.1833669281842627,0.6067043476138412,2.003016698885205,3.700744000026498,3.46927920517883,2.976765524138938,0.8721903295777045,0.9703264089677976,4.604402114240875,4.638757452353625,4.095454200433874,4.7204730323380675,1.9835549754572723,3.935907793481288,2.582730376188037,4.696687441961255,3.917314483866371,1.8557973434693564,0.20885415252859363,0.5748919804969277,4.4245628024400325,4.800407751310264,4.833716427167309,1.9321563235725037,1.6260983250649685,1.343188457998622,1.8843269953210728,1.2076560358450883,0.19033957562674453,0.32330166786751047,2.8425794640995186,4.666580397654868,2.8183816060381783,0.32763173808912915,4.793316323894345,2.3875927217142525,0.8040237464233058,3.1482695780793977,0.4550832383092507,0.21921687159389025,1.934607702203287,4.582991329918146,3.288747323581144,3.7132407813113124,4.620215568912758,1.6397319757434003,2.0481997569039514,3.5106645183609695,4.1189775168412055,2.3838126618212865,0.6988328040721914,0.548292936995517,4.710560287480413,0.12255102591569256,2.155826029248391,1.084342015672346,3.0992290302130563,2.8923358752184667,2.824220909548912,0.20605574996857667,2.8683037170559853,2.28779064486376,2.7221481509691348,4.367072763383206,3.582794912780959,1.7101280493562254,1.539204642523616,1.1775932580084658,1.5520427892878308,1.0690531122103497,2.495443645253027,0.3883527075967297,4.2280428439104965,1.975451807730778,4.387702082175603,1.9570077593759028,4.995320487013447,4.925582439192936,4.993018753228382,3.196689382556336,0.5550165340438429,4.651000561048756,0.8479936781474751,1.4913099387659767,2.741667513504016,3.3381603115169733,3.0920549143380684,1.9235525516624352,2.7500421655117147,4.638473507664056,2.5083814213245303,4.481329573835571,0.10152239672528651,3.3131638715242495,0.06444209387177158,0.3297183222529909,4.274853409525695,2.673905163437337,3.1247522104513226,1.8035385190416509,3.6830542893591267,1.63099954384483,4.136960898514523,2.6209814100640108,3.747169313195109,1.8493513600631206,4.176279485921559,1.5797726442469606,1.4824541074821496,2.3233300042371487,1.8740280573241919,2.5058141051506633,1.7511429713017268,4.637278338922661,1.9493853636452352,4.320088671534331,2.7280796500944424,4.695108642636669,0.1071548453637261,3.1940646540600017,0.10325388917582612,0.9004960144553198,4.918514734100603,2.6267457517815496,2.046645094174405,2.151641872633049,4.948534693461245,3.1221593456536603,0.4980352544801325,4.719971582872301,0.3302130386753743,2.2889849572551455,4.363397166087131,1.704915607129981,2.924846934963654,4.477932411482115,1.9964690126667095,1.5143722668628745,0.40021035494966717,3.946187618286255,4.560964580962549,0.678515371898345,0.6075391787449136,3.0535585867372337,3.3948216003384912,0.8813102125352579,1.8266000398244542,4.452207413839899,4.610002306372096,0.4695694777093773,2.0515655903643673,0.9715780565147003,1.8520178647500651,0.4715495790692448,3.790342921003708,1.1619499458943272,3.8663745346694722,3.318089844474713,4.380611583546275,3.609491671242897,0.8796385040121713,0.9848550721464089,4.093528539235198,4.88082019334041,2.1090285868646195,1.940712022638793,3.0374778194928584,1.2823035036043762,4.4056094195709194,4.701426460705966,1.1859264632932964,0.3895922361703774,4.9950178733774635,4.288412003759805,3.102023788054983,2.2101420020096008,2.7534731968877004,1.8870160303762473,0.5320945579883496,2.3894215207590297,4.849306643587491,1.0690989496116288,2.1888600256955337,0.6473353490889822,3.15001181433057,1.4041341342721103,4.579726200210503,1.7956360484125844,1.6775779345214659,3.457981122819561,4.746129413158159,2.6633567134780787,2.284940385703976,2.493727225489807,0.002966815789187116,2.5352583166752374,4.021309958300895,1.8519669809587624,3.910480911913068,4.547545848070773,3.2294864146060656,3.301569380210302,3.6212020931862208,1.2221817977669913,4.18478560837999,1.9124950727618695,1.8521289602917124,1.8149478506828665,1.8441552877562417,4.7065649296515595,3.496206635326514,4.065259768619534,1.1470905322382474,4.334097319420772,0.6248895309185309,0.5531838087872976,3.117302170185363,2.2534646026775453,3.0625925524685496,2.782503834511636,4.545335567228703,2.0760661881995635,3.412759800086306,2.9967222951840125,2.727523249501006,4.735099186536679,4.755266698982145,2.180544273083933,0.8876484238063531,1.41874287293569,2.7367090493889448,2.2005879795322536,4.4249219072256505,4.865867234594955,3.1705168064227394,4.353957135309901,1.0253841700170818,1.8007096779509502,1.8964465829251942,1.522407685867293,4.61465559893742,4.60191506287477,3.0913014311569533,2.2252951742510296,0.7220544919691707,1.3111157036124088,0.616731575327566,1.468172623434666,2.1599464264387636,0.5071680290540903,4.261366149474405,2.4338826455811913,1.0736843988790379,4.1659412158717135,1.488031193864947,2.5032680032115717,3.2740911420331074,0.8624749074660365,2.711668789046354,0.8959216311024598,4.361863077286294,1.4197394359185567,2.979613872563868,2.279166528815458,0.060699055142965364,1.868375111452515,2.550727656073289,4.490324805948372,1.218329746672332,3.0764258851439994,3.3501448777250555,2.848776921911238,3.7829282142614518,0.9732640503979928,0.5879711213824146,1.2747868818502406,0.4887065128374679,1.9399898919227476,0.7117657621525453,3.907503822980286,0.4633818335524331,0.36928231396132993,2.7578957507999236,1.4100580785452665,0.570121368014298,4.718523981563353,4.381757742180063,3.1318383988321505,0.2690636092064058,2.037250922791667,2.343641859670891,2.104828316479672,4.678682776157722,0.4599784730316825,0.2462433132650399,1.8637897416117766,2.1517468552482977,2.703711034937921,3.077269965024547,3.4252170568924645,2.3737330715534712,1.229585725837431,0.06655136775178594,1.27643844090775,1.0218343008479835,4.670147132656494,2.574402907875558,3.6014669394184495,0.9213262941417433,1.2861895904201115,4.101165684009517,0.3006270473986661,0.9834147842294527,3.844279745220719,0.12218826840162955,4.344113070187968,1.7579538739783196,1.6907264493873886,1.4114281522733219,3.4601160841191723,0.020214617550778913,2.9677299235174424,1.826004722301593,3.537612684747139,0.8458379409630057,4.240367002950329,4.895399376307124,1.0938446780451572,4.6630305321040035,0.47447762477864863,4.801306130403117,3.4994475645809042,4.630052369680122,3.3522841763894506,1.3420548106198082,2.6738959192325,3.3721146082723195,1.7585939190259947,4.8513834477506705,2.4653876708568423,4.845700530464851,3.7444701268390803,2.548535285046386,0.6859468622560938,1.6776023705203247,4.9259955095547365,4.677002349950815,2.81914847005471,3.5004858657899076,2.817232398691163,1.9197006930797078,2.396017538587688,3.0618773263886325,4.728183897586212,0.758258018106116,1.8346940420528113,4.074629882441391,4.091120115624275,1.2434471399732239,3.5041356729711537,4.934300137208707,1.957375607514782,4.030510146271283,4.014075205354675,3.37311431473184,1.1292030794555397,1.2645318352596235,3.4374318783475277,3.6747984987298024,2.916963817109356,4.436988586811548,1.254906529932438,4.318944351595776,0.29934243091422785,2.6978584998237984,1.254310290710976,2.8332387405664083,1.4607464271423387,3.319594832354966,4.818317425953294,3.6530600217873586,1.8508594604583817,3.417614439414207,0.06784785938789506,1.994462896751461,3.1211176203538935,1.8925143057555371,1.4851650220680346,1.5808645455035197,1.851629334634849,4.315162249301183,3.2287695348656262,1.708931593385976,0.27206170030274257,2.3049157019435906,4.8283431039832525,2.9413925021633824,3.3999784572261724,0.713501422258378,3.1837137499117474,3.0682565736695064,0.4612665928847748,4.9777979677516,2.7061178841220945,0.9555279983624676,4.2307894412982785,4.221029612797565,2.765662564151058,4.631435734158975,0.2645287691114906,0.98074765892468,0.6022366674635105,1.8945580112993898,3.949041272022699,4.947711244770647,0.8094536712745515,0.19114418292282886,3.125377829473237,1.7999872459869937,2.924361726074042,2.6291303461737736,4.334348852446296,3.952335447347055,0.5059578761426753,4.64144061348298,4.756509722071184,0.050426906190987886,4.214281093603428,2.261223790862261,3.8514397671139546,4.555961434653318,3.268684571552706,3.360535069115995,1.3993970133418754,1.87802523937176,4.359670426014324,0.5201604000037319,4.605667067482914,2.2170152662369014,3.5206800534676432,3.6132646610587837,3.881136034232301,2.852800708066412,0.917366115278816,0.5219005799598664,0.9494930681013025,2.134359338470465,3.79282890966389,4.365131678939259,2.1419830886756897,0.8243170272246214,3.9971576714908155,4.760341261414992,1.8164995430600428,1.9720795736529217,1.808145309980218,2.420814913400214,3.920141218520964,1.2522102884892794,0.6027234056070541,3.3849784648093406,0.18230410913519957,4.451584043396089,3.6825469558285793,4.736645725222326,0.013586119680829567,3.82112536636492,1.5975733328909114,3.9978800645809742,4.799346571822073,4.488861116454163,0.8048562087304201,3.3962846189706375,1.0495848365487015,3.8487636627132735,1.4088666471209,3.686210963660501,3.869525481101083,1.124037540164602,0.43982622789366266,4.669171760401093,2.118460888089655,0.3178298568607396,4.4498238132414505,1.4434972926586798,2.2663645135124613,3.1305908787223435,4.01273754417349,2.180976750198406,1.3779240047795926,2.1494732413980913,4.883286407633744,1.970733962866007,0.9565762575863201,4.666888934465717,1.895169333197978,0.04730249594430025,1.0869581242707183,3.3982447798713746,0.5559455941250346,2.570241925212046,2.159878539851986,3.508335257389643,2.512296485339359,1.6058980817523605,3.1286453953030646,2.450719572096882,1.1061793199475556,2.509761281441374,4.906234710577361,4.991265882723899,2.9019319463239146,4.627450842219756,4.95918881675672,4.304660373886949,1.728635225177827,1.2165209276641586,1.9401669911086905,3.000339272182906,0.5423828462619229,3.2340985994451654,2.264144347750361,2.947549072106547,0.5837281961066099,1.5429713404883405,1.1931642339959136,2.2170626158092333,4.699217469640255,4.708387894984744,4.8682509267231575,4.680516871427379,0.9293841190975227,4.813108478377228,0.9399039788086216,3.627945186597122,2.846595140148187,2.1334710139250666,0.4530542183240871,0.18572418163332327,0.8731111811290593,4.243969187932956,2.108001512680824,3.325123541345575,3.482743217537958,0.5490083957964587,4.565822052409343,0.15880127994491344,2.465798122781341,0.14066254775949583,1.680293818331755,3.055515628661781,1.395453812007943,0.9019306982777564,0.1954748105821269,3.34442570236933,1.2764893620917128,3.5129157714631853,1.018669042384922,2.298290839716721,3.262440085559999,0.5254304607841831,1.07738568648028,4.913470015958234,4.4899250380024505],"mu":[3.744025883920461,1.1193923442503317,7.126062308401149,7.515120314089739,9.9608430586147,5.905438112039345,9.770463748796141,2.673163847322839,8.968063821310832,0.7573356287100785,4.5822027071243525,7.240489911910637,7.7493719153597045,4.261521892143816,5.908339006684011,2.935046257326923,7.2998004607479094,0.8664460910694505,9.52849801859995,1.4516987640755885,0.7057092989424807,9.661375486993597,2.7609177494100945,4.202987840080333,1.5130047738701213,7.57332010343452,8.188946258280057,8.763544661693745,2.2711134091628504,6.155516755245221,6.667224652886334,0.7120011510765134,4.6916509430414965,1.710839727011575,4.5464343879302405,4.205605588869017,9.087395918769959,7.406225794375874,5.118048186541593,5.927484099808464,2.740907713189993,3.97846096299203,5.477499592862662,6.368224224251624,4.285103214016715,6.727400187128206,5.145534971312944,3.9674578474600763,7.53465963827667,6.027575520902888,6.652743520512978,7.452148524818214,6.916347723163083,4.641611459146883,9.813721970776424,6.417861240776701,9.249394545381456,8.958011924508146,7.067479582401135,2.8528917245956475,8.196431861619523,8.603838830856347,5.214127441628998,3.6438757550418477,7.86706115521053,0.03752377329290235,9.417774964236795,9.831649254308687,4.833845613016643,3.958528592796704,6.9839339482065625,6.020308594001751,5.823244849169895,4.230068372651714,8.310261334502105,6.862987633375896,7.648734319274634,0.6183758264439065,0.42327844530682057,6.623402102923079,0.8200323578299629,2.046479097786198,3.1648951144275195,9.276399027542277,5.261725947887208,7.436988243201295,3.759304710586473,9.37561043174669,7.278189052400814,2.5425883498144386,5.3780459536770415,9.632209159537727,8.855712401247049,1.168795584749731,1.1268169420689222,4.395744674903169,4.664316374702604,6.50453830074807,7.767511542731889,4.255684909410968,0.7321242177610099,7.334399640036466,7.641444211343824,8.511422712198362,2.2646501742968606,9.04265973450908,0.6762171753626234,5.74069371705842,6.711789292282299,5.587707483957185,4.7335159625538665,8.657014213571948,3.506903090448563,4.125322694855695,2.0442808105043486,4.27828307688441,6.446730026564413,7.704178829529775,8.485406329975438,3.6223040930782346,6.90217727054544,6.358956625265096,5.408068485397877,8.682439227655095,5.770484902976161,0.8664972393377002,8.840957011113149,9.033389795907006,4.378448210904433,4.380239427631456,5.31999467332316,5.278601548178623,1.7503337631518856,8.704288009087842,4.198529194265896,2.786762277200965,1.0723087171249834,7.414158107716984,0.9620289458882647,9.93140122744746,7.974437130714969,0.5311056723408414,1.0964521357247015,1.4393654037209047,5.884710237280959,6.124183881681711,7.754202828305821,0.7657278164086789,0.34109991166336284,4.521230069597957,7.205164495242402,9.050539135012613,8.41584094508379,0.8733857617889385,5.473062537488811,6.4380944486090925,7.256463379516811,4.234706854615117,9.074568185157442,3.954006745238212,7.278716925646201,4.81973576465175,7.72674061037679,9.406258749501024,5.537644180387562,7.3253935722848755,9.43350536293014,2.661688421892532,0.1612919194649165,3.9430377904207625,0.8700968612365245,5.392865840181573,4.541976631276099,9.46461121956272,2.3293205430204145,2.5898070045699084,1.9066868408639115,7.611834865344724,4.975941349211301,1.8741688116817823,8.724427174508522,1.9483001699928226,3.693914606752804,4.633419814102169,9.069061208550288,0.14609741851001612,6.040842043456854,0.868929752439096,9.631686831212892,5.1896735940190775,3.006568085911576,7.982910917019717,7.9143631265051635,0.645750141151169,0.7035845373966532,3.9889660450710096,8.911854232381259,8.453471985859123,5.565396185815137,4.300944971046821,8.559733774298127,6.046795401162615,3.218476001937791,2.3106069991082823,2.860738805231824,3.664057583438438,6.848665855558362,7.543554142787176,2.753127875993031,6.900306540810908,2.7699488214784496,1.2809493262404903,2.3183686760119726,9.177328057413535,2.4134376209837027,9.08059972081195,5.284057809665446,0.7396619516660374,6.636290619475358,1.3740445190009964,6.34322414301721,7.317229026560672,8.295690107544019,7.778501428495616,5.938001655263689,3.446908058485918,6.001521107174675,9.768884729454697,3.7635726316052787,6.332855506220698,5.324911781480357,0.7047364031136039,8.03072233237569,6.919201642099464,2.61111458621758,8.601811122360164,1.9437211255602027,0.35287885582302225,3.5501589957750435,8.043601201847414,1.3564274730185688,7.240827559101084,6.884063452409519,7.955868159578776,2.6332244195757704,8.488690779182452,8.621477023080475,7.0436305371160435,8.053891984648153,4.719272783032114,7.679142446758869,6.116197196269222,5.843321217950401,5.216158905566763,9.326130906882614,3.699244945506599,5.411273709763931,2.1058757259194505,3.3004814365252333,0.6471808278548652,4.2395271367104925,0.8669277111275586,3.3736915819777002,1.680635689250296,3.2071649491088627,7.5582902434613075,3.5265120085315327,7.570424369825002,9.575405771874621,4.401305774029152,7.5994899195014565,3.5192828576959156,9.456514807677458,6.494029081746342,8.034288815075154,2.320870433838964,0.6894771787794873,1.044430163721537,9.284303726655505,9.435325433168044,7.87831305327007,4.182136645424974,0.7390635129628054,2.1191037290174153,9.700944408498719,1.3924274603844,7.632990177390142,6.09182218947568,9.01078512984558,0.7306228667755477,3.268034831292672,8.369451898783991,7.383202986448034,9.41897026281766,5.718836930069047,8.25678118582179,3.7805775492805327,9.576264875051976,7.023957896835242,4.58064733234475,1.9660093496311437,3.3303619595708644,6.82308388563942,3.636117570613051,3.748557658362419,9.19823832969289,4.68675034052988,8.229908634212803,3.7923240785844725,2.5814239690197294,2.668569408531223,0.6743199375854458,7.491220094746332,0.744297371565894,0.8588946477801396,1.4423473201328019,0.4603034108314352,2.276150956329941,0.0859721521200707,3.100570061220309,1.6965762769896364,0.15396639604485785,2.5953096627059047,2.438864401003278,1.1524792171586773,7.235510349885075,3.8179371321851607,1.1837911371957333,2.2229301944806834,8.444740777314939,0.07362464706809124,2.0739832994088703,7.943728839026951,3.7970882638755032,1.277483526708576,4.287366066555265,3.2205144498638982,3.6551335605008783,3.9075442891234813,2.9586507256848016,4.036655486471281,9.775487355380687,0.5909153560889102,9.399812857362628,1.0964961543513518,2.1606139748027875,0.9446377417519258,3.025234237613237,7.353020851498712,4.800175512954777,8.113877921292643,1.7185085297574476,4.136740327950892,9.682118586144913,6.4801874392405034,7.642333160847821,6.105316389589019,9.991861084405036,0.685016258137956,3.4961706081049626,1.0369594684410077,3.188022341656074,7.68861311603909,3.5530363446733104,8.508505470330007,5.717239732496207,0.383901420085313,7.934506919569655,7.698112143373239,6.043122045483608,9.845315937140022,7.404421749283847,6.4781081104397265,3.3080488916778594,6.777136793399716,7.520529482939818,5.477089813589256,6.581196925586294,3.0599447914951727,1.2774605642629133,6.527896452543858,6.0078403407481495,4.364562562526773,8.148746857138484,4.362040220920638,4.101802574263306,0.29911105147636396,8.659575581997856,6.272751430242591,9.326058279062492,3.962020858119135,3.0832115437978036,2.8391963770702366,9.496395637772785,3.364112880044847,6.496055745087168,3.2125290689852903,5.483742607828783,0.6923967761554994,4.783714626977367,8.974682917193824,7.158099177634394,0.4728704245312154,6.958869893580665,7.153901622690418,1.0847876894810704,8.558100129859753,7.834202411583959,6.1067087522044865,6.515533523634625,8.932859361517878,3.909611223685139,0.7410240436707327,8.537449915565684,7.539369372251579,8.371275819395589,1.7014102963307942,9.854696008924206,0.31128192432642976,6.118873632073852,3.8059456229356137,9.828333370406943,8.597536087540124,4.792234801262129,5.374696096615493,6.076713875102914,7.255039428695058,4.088355224181301,7.430574099887906,1.299633070551054,4.439630352032761,9.47777425590055,2.8353887028457736,4.086841658255251,8.095292550736225,2.999955287418732,5.238071012550525,0.067881739698743,9.345710072857552,6.210260693377208,3.369950752100259,6.375625367280815,4.8237505654003465,2.1583866200141877,7.486764624380493,9.427837881119,0.5034749202956434,9.45774544307483,8.553379981339017,8.184502948124061,9.320209037601881,4.646843938219229,9.989914052343343,2.1832555683288546,8.655161812052976,7.6821510750729205,2.5848714743321533,1.926003432149943,0.8753163422147048,6.0879172184387915,4.415163626685721,6.607035588376002,9.659872858080945,8.460146767001833,5.470338687644743,0.7539630356964167,6.939929677303052,6.569547737365182,1.8057154256377839,4.1468337699307085,8.45251295419522,1.966223829553373,8.804563854051706,7.532679993938338,7.6714791615565865,1.4809789658112216,9.829118054371293,7.602324504343548,1.9423758945100578,5.033883084581654,6.212354479621207,6.290395852072834,7.511202189589996,4.155387816090805,4.517689386621296,1.2258526022794602,6.79521063975703,2.1863171140280047,0.7798670810112251,7.141302384378223,4.8784187625410524,5.387328266070721,1.2068247745557836,1.6536391754455182,6.0573246037648225,8.251373780299486,2.85183779383553,9.792103484284148,8.936420252431796,1.4987428048988916,5.873503194476967,0.06000371685006556,0.09280427934849067,0.7434678881402568,9.000861354283598,2.9201497538368093,7.723833613081215,8.725718919565198,8.955779780320741,1.3575643221362843,7.740010286872286,8.223528045226484,2.6482118781318498,0.10946885231692294,1.485880065805425,4.879749592039742,7.442306711028161,9.99916326140259,5.712243048361385,6.89589464627181,7.2763298957891305,1.6952446731047766,9.684990340020917,7.031418947614205,5.981463515044765,8.485099657550217,8.442278918998614,9.0060285981298,1.8860819141199348,8.239960251851894,9.291726014708377,3.7308748910489764,8.470006168235447,6.280931570585587,5.851350627291545,3.354508538937493,0.3686298884229289,0.9554803736335238,8.616883926802505,5.535598133866124,0.6075844012604925,9.412285997361483,3.976728084939205,9.030470828547841,5.407238781050685,2.3605091938067058,7.843845132985361,6.042900606097827,3.153112007551717,8.014314019868149,2.4978026138535614,4.069690950975553,7.428512356580987,9.092619888820739,4.087139063873401,6.970629366498249,5.8223450117389035,8.27406547701289,9.222288542117914,9.008072286957773,3.333203571889345,6.158852010038405,7.561087360234231,2.4744880635132405,5.471150392951953,2.3033208417619377,3.0793326121678355,1.3278085281893626,0.31824534443385843,9.039539392458547,6.178021772145015,8.873684919366795,2.3561615751842635,2.1777438831940055,4.932221825590515,1.5822589146773591,9.902319254209592,7.177833982365636,2.060944677522869,6.619767659189712,2.928553154839706,8.023395595049003,0.29382964085325813,4.96456863279501,2.231538452693156,2.997855518091712,1.0501138931502618,4.642442768101018,5.472379754769006,4.0804638185156445,8.819306117901078,9.709428230530431,2.4080239761962097,2.341619148200511,7.065347924498155,4.841200823071691,1.5291144537918955,6.062015546036788,3.76066990257095,8.862035082451731,7.964501315452878,2.2946442090097996,5.689961699203437,2.351615849025568,2.4930110521256,9.652624563094026,1.901182023486414,9.216321513296373,4.033036362885076,7.369802748595449,1.816224462070768,3.3822443491970877,6.097065474010637,0.5928546841352822,6.9872057438513036,4.572006841557849,8.29345156595447,1.3850295718530048,6.9683855889734225,2.946223130965009,1.5971158552949105,2.37433664508385,3.391757584094335,4.4331284329000065,1.1922676045645209,0.7324807936267308,7.632910071423272,7.594513772923297,5.886818031220338,6.014747613471592,0.40986243767524355,1.209695637513597,4.469925203383105,4.396171324523788,4.814402322298726,8.182045121390466,2.1533362178005855,0.46953936629318127,2.674353198017543,9.181346548676984,4.346151704115551,6.859017070250881,4.730393626510708,2.9756246843857004,4.711748136475937,8.17653087806222,5.476708495504994,0.09743193208835876,0.19712269181821007,4.92619702774374,3.79481247651021,8.599546591878571,7.700657869687088,3.974268293429868,5.159104640483374,7.458471994366955,2.0147598961823143,4.345333808694479,1.2248466167336458,4.8308555535604425,5.693868758606497,5.558292414159918,7.002313139705654,3.9993091173803297,3.1554146829732566,9.93653937077238,9.533659663261414,1.4654624437852415,1.3791951316649742,6.153499664331264,4.88585305483616,6.588903797349395,8.181118871649547,4.933698365128356,5.908465549596369,3.875480936853797,7.904475752923621,5.8707916748904765,1.8829057533533322,5.787315567002016,2.388916949048425,7.649491200915701,3.2847978088057217,0.6792885816314431,5.101094860265201,9.67560641080044,4.675663218620323,0.4351902510781347,3.1463908113718886,5.683741257359928,7.539362189558063,3.3067943696031366,1.8043616165283072,5.0490315549399885,3.048017964481151,3.2286222263806708,3.275956156337503,7.647488715432884,9.052484628053275,6.720397219225465,7.032221488752571,0.570218621192915,9.187364516586795,1.3525429711177983,1.4338742250400172,6.31882458775511,7.044156770406698,9.873347110424005,6.076890911461506,2.3009978262882136,6.39580805392129,8.869915161856651,9.829328179721653,1.8254117569245198,4.8931611037863165,3.583562533874589,7.940028353651418,4.182369637316978,9.536864038264877,0.37433375332301955,5.015279546313918,8.413052500059443,5.09756727805401,0.26251550716172023,2.9724570173713927,8.752840446744234,5.830093872754851,3.6259392914042077,1.6621167729661268,6.7089929267935595,3.3864031047383913,7.053212097838573,8.15504764960244,0.05769420929834679,2.365272277975705,1.4890868429252135,2.454126394548801,0.7488033468595945,6.9187464596169175,7.109578014243397,5.369986532551323,2.970001477051425,4.866972732563286,8.478419408854814,0.07381378187300003,2.118427957776192,4.070686190641297,9.518301410996802,2.081860536063802,7.396743518508315,9.070088028924639,7.003778730988925,0.8648032680623818,4.638329673379948,6.822784511298108,3.7306406662007197,1.71509188830814,3.9636704735764905,5.515333766665618,5.683342238318616,0.23524381110293202,2.1339164539252686,3.5747995117316878,8.518191982603923,8.891561632158664,3.052277022042027,4.7377347214691135,7.285277726575748,4.791883040640689,9.39750601718888,3.817726324104449,0.20616586709079288,3.6067737737930528,3.4306312793272475,0.5160015855378597,2.843676799203967,0.7513127801165376,6.178645699186543,6.6559885317557725,6.110955414468395,4.444356434480636,1.239071587716658,0.636166905345652,4.453680071970516,2.683585645516031,8.261684471518791,2.166813892613131,7.101572309536306,5.506926968554575,6.212597476869258,6.561303527728704,3.4124315283527396,5.83856030909216,1.0907148401483457,3.6279250706908472,0.5398268423989139,1.700379531234557,0.8135666801478414,6.632772721078348,7.500468312323605,6.498572588033127,7.435322675725324,2.098233014505535,8.347091377354353,9.408731686652729,8.697066065219829,9.445139446503177,9.064623079783749,7.839176289546474,9.670643524784284,7.049843331139449,2.8850229225118307,0.0731859508486199,1.8163108374287584,7.875016299374613,3.4055231729440227,3.8359864433733937,6.338305835986018,4.118703515003695,2.1729923236014104,9.423793701094192,5.381698607140979,7.672285221559534,1.003580888438591,5.431601022479402,4.043378818469545,3.211107490356626,3.3894883827506095,9.430094378813624,7.96380763016063,1.6337010265898377,6.260628920181461,6.420407510926984,6.478500305764195,2.2400545302170416,9.832492440044556,6.809507609807461,3.966157581446068,9.733048637788011,0.30224406589987707,4.855813034579168,6.517755090859703,6.504848759072019,0.9795392676602233,8.896398254778674,8.98514943783102,9.50862588650465,0.2725703626668641,7.282617011581833,0.8131047365648514,9.5011294517608,5.5696113897401585,0.8749914232233769,6.582691910738867,1.0809383470856937,2.4234587655099205,7.4151102136354226,0.04169941444646774,7.163318132491301,8.95706427275622,9.72092599404971,2.6868861726832383,8.079296096688491,8.70666525818078,2.1848998934675334,0.7151616150015272,2.4667753073026044,0.8864145749398111,0.10758238429726452,1.0560663272064752,3.54214718933779,5.099059973403284,4.156717713483342,7.528346007552493,1.0942390531268886,8.612021098649866,5.745510300630212,0.6911249149909615,1.1366443724130915,4.173469394970233,6.773017629169534,0.966208715281931,3.366078451393404,6.896749514705343,5.31210036587302,7.307600435191734,0.2140996043413934,3.567325637463674,3.1061626353198224,0.17940702979244882,5.069441030253987,3.7696141270642336,2.5137949585478236,8.832961072447642,9.295776162152901,1.510159605852952,7.0261531975381875,6.826907620420791,1.9797963974562482,4.786530167368572,7.362730672850066,1.7551913919891948,5.8570609602663986,2.6774410423333284,5.895021293050018,0.552216145079274,3.3324112741106915,0.5114926152932742,5.90851162216226,9.207114079254477,5.563118896251977,8.940725085073375,7.309093740232473,1.7120115619792031,4.9342422399301755,5.9783669405321005,9.102147072111169,3.499818377234205,4.6416725880725584,3.0188698374196554,8.451431113212989,0.43429115896351567,7.828744016605422,3.3905025523710974,9.66939736686341,1.4030186878701167,7.408885283882814,7.314118389304647,5.6267778361320016,1.763249500428583,7.245293003331148,1.1929739772390135,1.6624242080944773,1.9798457181311502,8.120244609085232,3.967843602443808,2.438491017107345,2.7630166941147394,3.042319704107226,3.538712592502129,3.676012948328937,5.554769174712173,2.1168910434458854,2.5223150907027914,3.038175954197573,9.183146820339108,6.534024822493363,8.197121312767962,8.032820129009439,7.1935338643502345,6.140180993222117,0.7515328282641098,6.034476385004394,1.6115780066056073,0.9742452257452183,7.581565665847975,8.984742692561785,9.606881885969665,8.476215474332985,0.9939204257680156,3.78695644240457,7.72074905231702,2.301771258106806,8.178155956630457,9.311618380206177,8.567733514823864,6.554961660213696,7.138497125179992,3.7504228021760966,7.785755185329255,6.889154677273208,3.1503021078897864,3.6846302872785053,0.9885856448315278,6.339972203078899,1.981348826050573,5.686336557581056,2.8363415612951615,7.628629382157777,2.6539708596438594,7.073301670683931,1.691333605349561,6.655735688231601,6.041929059201319,2.6003535672925393,8.380057086610993,1.3623583804512074,4.086371199929893,4.259695636431284,4.191344760810976,8.257696145920841,6.38043233070591,9.852654532378779,2.713011025220522,1.0369815396914328,1.7423491381357792,9.711991047050685,7.653320646090219,0.45502042024941014,3.8054205821582987]}
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

tape( 'if provided a finite `mu` and `s`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `mu` and `s`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a negative `s`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

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

tape( 'if `s` equals `0`, the created function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 2.0, 0.0 );

	y = pdf( 2.0 );
	t.equal( y, PINF, 'returns +infinity for x equal to mu' );

	y = pdf( 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the pdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var mu;
	var s;
	var x;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	s = positiveMean.s;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( mu[i], s[i] );
		y = pdf( x[i] );
		if ( expected[i] !== null && !(expected[i] === 0.0 && y < EPS ) ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var mu;
	var s;
	var x;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( mu[i], s[i] );
		y = pdf( x[i] );
		if ( expected[i] !== null && !(expected[i] === 0.0 && y < EPS ) ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given large variance ( = large `s`)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var mu;
	var s;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	s = largeVariance.s;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( mu[i], s[i] );
		y = pdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/pdf/test/test.factory.js")
},{"./../lib/factory.js":122,"./fixtures/julia/large_variance.json":125,"./fixtures/julia/negative_mean.json":126,"./fixtures/julia/positive_mean.json":127,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65,"tape":263}],129:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/pdf/test/test.js")
},{"./../lib":123,"tape":263}],130:[function(require,module,exports){
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

tape( 'if provided `+infinity` for `x` and a finite `mu` and `s`, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `s`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a negative `s`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, -1.0 );
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

tape( 'if provided `s` equal to `0`, the function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var y;

	y = pdf( 2.0, 2.0, 0.0 );
	t.equal( y, PINF, 'returns +infinity for x equal to mu' );

	y = pdf( 1.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( PINF, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( NINF, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( NaN, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the pdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	s = positiveMean.s;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], mu[i], s[i] );
		if ( expected[i] !== null && !(expected[i] === 0.0 && y < EPS ) ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], mu[i], s[i] );
		if ( expected[i] !== null && !(expected[i] === 0.0 && y < EPS ) ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large variance ( = large `s` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var x;
	var s;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	s = largeVariance.s;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], mu[i], s[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/pdf/test/test.pdf.js")
},{"./../lib":123,"./fixtures/julia/large_variance.json":125,"./fixtures/julia/negative_mean.json":126,"./fixtures/julia/positive_mean.json":127,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":50,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":65,"tape":263}],131:[function(require,module,exports){
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

},{"./is_number.js":134}],132:[function(require,module,exports){
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

},{"./is_number.js":134,"./zero_pad.js":138}],133:[function(require,module,exports){
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

},{"./main.js":136}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{"./format_double.js":131,"./format_integer.js":132,"./is_string.js":135,"./space_pad.js":137,"./zero_pad.js":138}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{"./main.js":140}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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

},{"./main.js":143}],142:[function(require,module,exports){
arguments[4][135][0].apply(exports,arguments)
},{"dup":135}],143:[function(require,module,exports){
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

},{"./is_string.js":142,"@stdlib/string/base/format-interpolate":133,"@stdlib/string/base/format-tokenize":139}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":144}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":147}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":151}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{"./define_property.js":149}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":148,"./has_define_property_support.js":150,"./polyfill.js":152}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":141}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":154,"./polyfill.js":155,"@stdlib/assert/has-tostringtag-support":20}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":156}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":156,"./tostringtag.js":157,"@stdlib/assert/has-own-property":16}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){

},{}],160:[function(require,module,exports){
arguments[4][159][0].apply(exports,arguments)
},{"dup":159}],161:[function(require,module,exports){
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
},{"base64-js":158,"buffer":161,"ieee754":249}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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
},{"_process":255}],164:[function(require,module,exports){
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

},{"events":162,"inherits":250,"readable-stream/lib/_stream_duplex.js":166,"readable-stream/lib/_stream_passthrough.js":167,"readable-stream/lib/_stream_readable.js":168,"readable-stream/lib/_stream_transform.js":169,"readable-stream/lib/_stream_writable.js":170,"readable-stream/lib/internal/streams/end-of-stream.js":174,"readable-stream/lib/internal/streams/pipeline.js":176}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
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
},{"./_stream_readable":168,"./_stream_writable":170,"_process":255,"inherits":250}],167:[function(require,module,exports){
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
},{"./_stream_transform":169,"inherits":250}],168:[function(require,module,exports){
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
},{"../errors":165,"./_stream_duplex":166,"./internal/streams/async_iterator":171,"./internal/streams/buffer_list":172,"./internal/streams/destroy":173,"./internal/streams/from":175,"./internal/streams/state":177,"./internal/streams/stream":178,"_process":255,"buffer":161,"events":162,"inherits":250,"string_decoder/":262,"util":159}],169:[function(require,module,exports){
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
},{"../errors":165,"./_stream_duplex":166,"inherits":250}],170:[function(require,module,exports){
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
},{"../errors":165,"./_stream_duplex":166,"./internal/streams/destroy":173,"./internal/streams/state":177,"./internal/streams/stream":178,"_process":255,"buffer":161,"inherits":250,"util-deprecate":271}],171:[function(require,module,exports){
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
},{"./end-of-stream":174,"_process":255}],172:[function(require,module,exports){
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
},{"buffer":161,"util":159}],173:[function(require,module,exports){
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
},{"_process":255}],174:[function(require,module,exports){
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
},{"../../../errors":165}],175:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],176:[function(require,module,exports){
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
},{"../../../errors":165,"./end-of-stream":174}],177:[function(require,module,exports){
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
},{"../../../errors":165}],178:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":162}],179:[function(require,module,exports){
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

},{"./":180,"get-intrinsic":244}],180:[function(require,module,exports){
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

},{"function-bind":243,"get-intrinsic":244}],181:[function(require,module,exports){
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

},{"./lib/is_arguments.js":182,"./lib/keys.js":183}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],184:[function(require,module,exports){
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

},{"has-property-descriptors":245,"object-keys":253}],185:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],186:[function(require,module,exports){
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

},{"./ToNumber":216,"./ToPrimitive":218,"./Type":223}],187:[function(require,module,exports){
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

},{"../helpers/isFinite":232,"../helpers/isNaN":234,"../helpers/isPrefixOf":235,"./ToNumber":216,"./ToPrimitive":218,"./Type":223,"get-intrinsic":244}],188:[function(require,module,exports){
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

},{"get-intrinsic":244}],189:[function(require,module,exports){
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

},{"./DayWithinYear":192,"./InLeapYear":196,"./MonthFromTime":206,"get-intrinsic":244}],190:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":239,"./floor":227}],191:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":227}],192:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":190,"./DayFromYear":191,"./YearFromTime":225}],193:[function(require,module,exports){
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

},{"./modulo":228}],194:[function(require,module,exports){
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

},{"../helpers/assertRecord":231,"./IsAccessorDescriptor":197,"./IsDataDescriptor":199,"./Type":223,"get-intrinsic":244}],195:[function(require,module,exports){
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

},{"../helpers/timeConstants":239,"./floor":227,"./modulo":228}],196:[function(require,module,exports){
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

},{"./DaysInYear":193,"./YearFromTime":225,"get-intrinsic":244}],197:[function(require,module,exports){
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

},{"../helpers/assertRecord":231,"./Type":223,"has":248}],198:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":251}],199:[function(require,module,exports){
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

},{"../helpers/assertRecord":231,"./Type":223,"has":248}],200:[function(require,module,exports){
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

},{"../helpers/assertRecord":231,"./IsAccessorDescriptor":197,"./IsDataDescriptor":199,"./Type":223}],201:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":236,"./IsAccessorDescriptor":197,"./IsDataDescriptor":199,"./Type":223}],202:[function(require,module,exports){
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

},{"../helpers/isFinite":232,"../helpers/timeConstants":239}],203:[function(require,module,exports){
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

},{"../helpers/isFinite":232,"./DateFromTime":189,"./Day":190,"./MonthFromTime":206,"./ToInteger":215,"./YearFromTime":225,"./floor":227,"./modulo":228,"get-intrinsic":244}],204:[function(require,module,exports){
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

},{"../helpers/isFinite":232,"../helpers/timeConstants":239,"./ToInteger":215}],205:[function(require,module,exports){
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

},{"../helpers/timeConstants":239,"./floor":227,"./modulo":228}],206:[function(require,module,exports){
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

},{"./DayWithinYear":192,"./InLeapYear":196}],207:[function(require,module,exports){
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

},{"../helpers/isNaN":234}],208:[function(require,module,exports){
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

},{"../helpers/timeConstants":239,"./floor":227,"./modulo":228}],209:[function(require,module,exports){
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

},{"./Type":223}],210:[function(require,module,exports){
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


},{"../helpers/isFinite":232,"./ToNumber":216,"./abs":226,"get-intrinsic":244}],211:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":239,"./DayFromYear":191}],212:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":239,"./modulo":228}],213:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],214:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":216}],215:[function(require,module,exports){
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

},{"../helpers/isFinite":232,"../helpers/isNaN":234,"../helpers/sign":238,"./ToNumber":216,"./abs":226,"./floor":227}],216:[function(require,module,exports){
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

},{"./ToPrimitive":218}],217:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":188,"get-intrinsic":244}],218:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":240}],219:[function(require,module,exports){
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

},{"./IsCallable":198,"./ToBoolean":213,"./Type":223,"get-intrinsic":244,"has":248}],220:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":244}],221:[function(require,module,exports){
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

},{"../helpers/isFinite":232,"../helpers/isNaN":234,"../helpers/sign":238,"./ToNumber":216,"./abs":226,"./floor":227,"./modulo":228}],222:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":216}],223:[function(require,module,exports){
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

},{}],224:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":190,"./modulo":228}],225:[function(require,module,exports){
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

},{"call-bind/callBound":179,"get-intrinsic":244}],226:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":244}],227:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],228:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":237}],229:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":239,"./modulo":228}],230:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":186,"./5/AbstractRelationalComparison":187,"./5/CheckObjectCoercible":188,"./5/DateFromTime":189,"./5/Day":190,"./5/DayFromYear":191,"./5/DayWithinYear":192,"./5/DaysInYear":193,"./5/FromPropertyDescriptor":194,"./5/HourFromTime":195,"./5/InLeapYear":196,"./5/IsAccessorDescriptor":197,"./5/IsCallable":198,"./5/IsDataDescriptor":199,"./5/IsGenericDescriptor":200,"./5/IsPropertyDescriptor":201,"./5/MakeDate":202,"./5/MakeDay":203,"./5/MakeTime":204,"./5/MinFromTime":205,"./5/MonthFromTime":206,"./5/SameValue":207,"./5/SecFromTime":208,"./5/StrictEqualityComparison":209,"./5/TimeClip":210,"./5/TimeFromYear":211,"./5/TimeWithinDay":212,"./5/ToBoolean":213,"./5/ToInt32":214,"./5/ToInteger":215,"./5/ToNumber":216,"./5/ToObject":217,"./5/ToPrimitive":218,"./5/ToPropertyDescriptor":219,"./5/ToString":220,"./5/ToUint16":221,"./5/ToUint32":222,"./5/Type":223,"./5/WeekDay":224,"./5/YearFromTime":225,"./5/abs":226,"./5/floor":227,"./5/modulo":228,"./5/msFromTime":229}],231:[function(require,module,exports){
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

},{"./isMatchRecord":233,"get-intrinsic":244,"has":248}],232:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],233:[function(require,module,exports){
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

},{"has":248}],234:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],235:[function(require,module,exports){
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

},{"call-bind/callBound":179}],236:[function(require,module,exports){
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

},{"get-intrinsic":244,"has":248}],237:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],238:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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

},{"./helpers/isPrimitive":241,"is-callable":251}],241:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],242:[function(require,module,exports){
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

},{}],243:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":242}],244:[function(require,module,exports){
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

},{"function-bind":243,"has":248,"has-symbols":246}],245:[function(require,module,exports){
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

},{"get-intrinsic":244}],246:[function(require,module,exports){
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

},{"./shams":247}],247:[function(require,module,exports){
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

},{}],248:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":243}],249:[function(require,module,exports){
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

},{}],250:[function(require,module,exports){
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

},{}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
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

},{"./isArguments":254}],253:[function(require,module,exports){
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

},{"./implementation":252,"./isArguments":254}],254:[function(require,module,exports){
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

},{}],255:[function(require,module,exports){
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

},{}],256:[function(require,module,exports){
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
},{"_process":255,"through":269,"timers":270}],257:[function(require,module,exports){
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

},{"buffer":161}],258:[function(require,module,exports){
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

},{"es-abstract/es5":230,"function-bind":243}],259:[function(require,module,exports){
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

},{"./implementation":258,"./polyfill":260,"./shim":261,"define-properties":184,"function-bind":243}],260:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":258}],261:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":260,"define-properties":184}],262:[function(require,module,exports){
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
},{"safe-buffer":257}],263:[function(require,module,exports){
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
},{"./lib/default_stream":264,"./lib/results":266,"./lib/test":267,"_process":255,"defined":185,"through":269,"timers":270}],264:[function(require,module,exports){
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
},{"_process":255,"fs":160,"through":269}],265:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":255,"timers":270}],266:[function(require,module,exports){
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
},{"_process":255,"events":162,"function-bind":243,"has":248,"inherits":250,"object-inspect":268,"resumer":256,"through":269,"timers":270}],267:[function(require,module,exports){
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
},{"./next_tick":265,"deep-equal":181,"defined":185,"events":162,"has":248,"inherits":250,"path":163,"string.prototype.trim":259}],268:[function(require,module,exports){
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

},{}],269:[function(require,module,exports){
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
},{"_process":255,"stream":164}],270:[function(require,module,exports){
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
},{"process/browser.js":255,"timers":270}],271:[function(require,module,exports){
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
