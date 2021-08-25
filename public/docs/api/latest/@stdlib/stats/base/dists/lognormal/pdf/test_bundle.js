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

},{"@stdlib/utils/native-class":142}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":142}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":142}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":142}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":99}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":76}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/from-words":103,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/to-words":118}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./copysign.js":70}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./expmulti.js":73,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/trunc":97}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":75,"@stdlib/math/base/special/ldexp":78}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./exp.js":72}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./ldexp.js":79}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/max-base2-exponent":47,"@stdlib/constants/float64/max-base2-exponent-subnormal":46,"@stdlib/constants/float64/min-base2-exponent-subnormal":48,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-infinite":58,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/copysign":71,"@stdlib/number/float64/base/exponent":101,"@stdlib/number/float64/base/from-words":103,"@stdlib/number/float64/base/normalize":109,"@stdlib/number/float64/base/to-words":118}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ln.js":81}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":82,"./polyval_q.js":83,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ninf":49,"@stdlib/math/base/assert/is-nan":62,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/set-high-word":113}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.2857142874366239 + (x * (0.1818357216161805 + (x * 0.14798198605116586))))); // eslint-disable-line max-len
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

},{"./pow.js":90}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":87,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/set-high-word":113,"@stdlib/number/float64/base/set-low-word":115}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":89,"@stdlib/number/float64/base/set-low-word":115}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],88:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"dup":75}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./log2ax.js":85,"./logx.js":86,"./pow2.js":91,"./x_is_zero.js":92,"./y_is_huge.js":93,"./y_is_infinite.js":94,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-infinite":58,"@stdlib/math/base/assert/is-integer":60,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/assert/is-odd":64,"@stdlib/math/base/special/abs":66,"@stdlib/math/base/special/sqrt":95,"@stdlib/number/float64/base/set-low-word":115,"@stdlib/number/float64/base/to-words":118,"@stdlib/number/uint32/base/to-int32":122}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":88,"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/ln-two":45,"@stdlib/math/base/special/ldexp":78,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/set-high-word":113,"@stdlib/number/float64/base/set-low-word":115,"@stdlib/number/uint32/base/to-int32":122}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-odd":64,"@stdlib/math/base/special/copysign":71}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/number/float64/base/get-high-word":107}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/special/abs":66}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":68,"@stdlib/math/base/special/floor":76}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":100}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":43,"@stdlib/constants/float64/high-word-exponent-mask":44,"@stdlib/number/float64/base/get-high-word":107}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":104,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":108}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":106,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":110}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":111}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":52,"@stdlib/math/base/assert/is-infinite":58,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/abs":66}],112:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":106}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":112,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":117}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":116,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":120}],119:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":104}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":121}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":119,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":123}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a lognormal distribution with location parameter `mu` and scale parameter `sigma`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} sigma - scale parameter
* @returns {Function} PDF
*
* @example
* var pdf = factory( 4.0, 2.0 );
* var y = pdf( 10.0 );
* // returns ~0.014
*
* y = pdf( 2.0 );
* // returns ~0.025
*/
function factory( mu, sigma ) {
	var s2;
	var A;
	var B;
	if (
		isnan( mu ) ||
		isnan( sigma ) ||
		sigma <= 0.0
	) {
		return constantFunction( NaN );
	}
	s2 = pow( sigma, 2.0 );
	A = 1.0 / ( sqrt( 2.0 * s2 * PI ) );
	B = -1.0 / ( 2.0 * s2 );
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a lognormal distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( 2.5 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= 0.0 ) {
			return 0.0;
		}
		return (1.0/x) * A * exp( B * pow( ln(x) - mu, 2.0 ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/pi":50,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/exp":74,"@stdlib/math/base/special/ln":80,"@stdlib/math/base/special/pow":84,"@stdlib/math/base/special/sqrt":95,"@stdlib/utils/constant-function":134}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the probability density function (PDF) for a lognormal distribution.
*
* @module @stdlib/stats/base/dists/lognormal/pdf
*
* @example
* var pdf = require( '@stdlib/stats/base/dists/lognormal/pdf' );
*
* var y = pdf( 2.0, 0.0, 1.0 );
* // returns ~0.157
*
* y = pdf( 1.0, 0.0, 1.0 );
* // returns ~0.399
*
* y = pdf( 1.0, 3.0, 1.0 );
* // returns ~0.004
*
* var mypdf = pdf.factory( 4.0, 2.0 );
* y = mypdf( 10.0 );
* // returns ~0.014
*
* y = mypdf( 2.0 );
* // returns ~0.025
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":124,"./pdf.js":126,"@stdlib/utils/define-nonenumerable-read-only-property":135}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a lognormal distribution with location parameter `mu` and scale parameter `sigma` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} sigma - scale parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 2.0, 0.0, 1.0 );
* // returns ~0.157
*
* @example
* var y = pdf( 1.0, 0.0, 1.0 );
* // returns ~0.399
*
* @example
* var y = pdf( 1.0, 3.0, 1.0 );
* // returns ~0.004
*
* @example
* var y = pdf( -1.0, 4.0, 2.0 );
* // returns 0.0
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
function pdf( x, mu, sigma ) {
	var s2;
	var A;
	var B;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( sigma ) ||
		sigma <= 0.0
	) {
		return NaN;
	}
	if ( x <= 0.0 ) {
		return 0.0;
	}
	s2 = pow( sigma, 2.0 );
	A = 1.0 / ( sqrt( 2.0 * s2 * PI ) );
	B = -1.0 / ( 2.0 * s2 );
	return (1.0/x) * A * exp( B * pow( ln(x) - mu, 2.0 ) );
}


// EXPORTS //

module.exports = pdf;

},{"@stdlib/constants/float64/pi":50,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/exp":74,"@stdlib/math/base/special/ln":80,"@stdlib/math/base/special/pow":84,"@stdlib/math/base/special/sqrt":95}],127:[function(require,module,exports){
module.exports={"sigma":[13.92071436567453,16.313906140141185,9.48740974160199,5.233350888210109,18.489896830421152,17.31117905067776,16.546315377915555,2.1174787459213062,7.882856137299856,0.45466758036032395,6.893822478652285,10.50725236188184,2.498685545803019,3.1428414149123984,9.59341147804437,1.4484567089422962,16.536202821802263,19.906623284064807,2.590525342501926,14.573823997506604,16.880570741293376,0.6486083888661165,2.9110656088214615,13.73472142475518,15.327042565540982,10.649052240407384,1.2942578564126928,2.0060132244265194,14.435557534719322,4.3351679004340005,4.679905497927788,14.826539135235969,10.830130253159256,19.78527059670061,0.7576730973888779,9.91463568078835,15.10480541490072,5.283708199176407,2.021741668767434,10.317909780446888,7.8232242739812285,12.92581349892484,19.126026803074335,2.1347353792553436,1.663633479130353,18.03380652525034,12.860366719537573,12.081832126466526,9.59117447228406,11.33760446378,16.537860535845503,4.853980753074354,4.92593600857151,3.6942779714706786,5.242642132820081,7.699622902417396,11.275816083398723,0.5798286944897768,10.43305155058662,18.944526211307704,8.144473525619187,15.227493495819267,0.23483045690680715,5.0001473077068725,6.588418033803105,1.862865052661653,17.60692879886408,5.409635566812461,10.431150949053176,9.956772546507096,14.966605595369401,18.51888267695066,10.613734865715525,10.794066997624569,1.4622892007586819,19.03613403418109,18.939107167522714,18.103260434496754,6.809354421345186,14.525161081553382,11.958251516283323,3.276224227998892,5.345915910819774,16.49205466443221,1.9952945314944648,9.009091605354126,1.9197210174707902,11.612297110387978,3.3230663981263353,18.031277349464876,18.351278200019653,9.218434100681371,2.2751914221319947,11.844739133591391,18.504069339631872,16.378200431272795,11.536322530382996,9.977959995443149,14.34672319369637,7.325072245937774,7.506461295404905,5.239552986430147,17.661061427358426,17.243865842354648,19.611215901730603,12.424536678740846,2.567374109813003,17.1829374963323,4.078161006562215,10.061510857694852,15.757674255658358,14.329521919921895,14.515064492545214,14.680779830788646,6.143890963176686,5.116485652721132,15.62537544004603,17.467977295979033,2.0142977378336058,6.5778808732989935,2.1907645646277008,14.107377486437631,6.793947655180372,16.117077174957046,19.957576522075517,7.495623001830913,4.654676327637466,6.680653974525859,4.3488355204216855,6.201952885780608,16.212065000332384,4.128382248811242,19.239697451053388,19.532462761565668,12.337291418879385,13.329532544992775,9.780723539645674,16.625359336369936,9.49575462574698,14.582181790080337,10.097962488322775,18.09521921011015,8.881717838619746,19.590620717589168,2.4872530575669316,13.166509592096878,17.717079701226673,18.355045379984677,2.072394490835938,19.754322006191728,11.528485276345792,1.997533122375832,7.018912853394701,4.015271391016948,8.466473181296482,10.343945156350642,10.653080750322953,5.483144831119384,13.862820229139254,18.118592323233,14.51154353437461,13.607790601915637,13.73714105104471,17.183527431616245,3.4852169595893923,19.34430367059553,17.623412010244355,3.4130532655282364,9.744011056486702,16.192765928522405,12.67861428607934,2.108764166286554,15.422715183299651,3.9584346462635134,9.783413548999444,19.080601543653408,3.1373106748638024,19.25957191998764,8.439649830742226,6.235511799410913,17.21416229218773,10.768731310223089,0.946862956530139,10.900215449658784,2.635098065692434,14.30646194753698,16.351583537909438,3.041931378580638,17.787853939844776,12.002193047424555,14.329253813001298,16.332637003136266,16.207074059809877,16.673076538771802,0.552066125187336,0.6747854818271604,0.6635705424140337,7.14299010059404,9.640562421494302,0.15035022306460366,1.9163508653613182,8.50978392493602,16.036677772886048,1.48896313907934,5.460960805939741,13.585998963779442,5.812067810724453,11.009185707013632,16.458546952157413,0.3187598596363239,15.228733706440005,9.839905560715057,1.7726423490958876,13.424022574661914,19.794000756634112,4.63557197754028,12.938447440490544,7.856157568178439,14.00128391989698,16.88736566735381,17.836293430180472,0.08836470597662238,0.8959925047668138,2.093811636727163,2.9623658253475105,10.328463701565482,2.7922845474362346,5.314201358406785,12.921830709942817,12.023754545106907,8.29743439707022,14.016645159127537,12.566369894897056,13.50035067510477,9.82868331878283,5.074164777170909,19.858549128434326,1.5979756776515197,17.119557597018588,8.139723439770773,16.906126485126475,11.441401131703298,8.68819814992522,19.68193522076656,12.335784508188127,7.55852240157612,1.8357271329327407,2.8372717463982378,0.15992734861739244,14.51409482783864,6.637278190301732,16.25458608953242,0.027104345344421965,16.095453827381423,15.150597945359486,6.6961204231488525,14.624053354939765,7.498561360447753,8.520186131416786,1.6273606513045102,15.975368553355814,0.29739397282541713,1.7643561032280086,9.439310327613256,8.494544686415072,5.788943120944459,3.3494645304848847,3.9428257071891615,17.568809032039173,13.372951740614738,17.73692534912972,0.3014581329061139,10.63927451138927,8.535468140079484,1.359504970368559,15.855421245311895,14.22671220110666,10.256900752255959,18.172450404759637,1.175195166694638,7.338704946818533,7.797020003683186,3.7828351933557514,3.402134905434715,12.685522443738183,19.886723007770456,3.106670936197018,0.7987784459407843,10.504807405637791,14.976276208858476,11.583438963378473,6.118130705510905,14.088591582253503,17.407463462762923,7.388112281585095,17.756465540210993,17.13111479940232,12.138974865078712,1.5318064828262212,6.849823564150452,0.986189311971648,19.421178376055252,10.951386724930533,17.796800695146672,11.285702911380815,11.260117640353355,17.6566449845299,9.689996112187934,0.9186036305901668,1.8314121500979086,3.202820143608278,8.519322740501192,18.142752900597344,12.09935891175328,15.598261297626133,17.446363731986914,4.273544049719491,11.0782749990463,6.6822828817650315,0.3875702449999441,18.257783111681594,11.121256052889898,17.485412520947854,16.812201795099835,16.913823956738515,3.9286617045085404,1.0518409894563785,3.28919393948345,3.492475859227979,5.971329714751059,13.100201804152967,12.55352530218056,12.15625746360053,7.706353528049048,14.114634107511904,12.020983068473242,16.937635618690553,16.360896494530085,2.0669655321702285,5.56992145664859,6.56510840594581,0.1846816528532491,3.2919574935713936,14.701088229962123,3.1760343693750714,8.016624129722079,15.111078287520705,16.307303178478673,9.36344934519143,6.316453994437667,11.14313520618345,18.062968305041554,17.254090858691562,3.7865921322872653,11.336911391485778,13.949023477032538,17.96175733428798,5.078227326917042,15.555336001058002,18.334583237329763,19.731332401199676,0.4282831820376565,9.826584051128124,3.764760035784218,4.2339471579541765,15.766751861001191,2.1459174101434586,1.3379278866590072,16.423202412752012,18.01625769453658,0.43148962572507443,16.576161208798787,13.054542687050802,18.89131941249914,9.415092195150873,7.235490358565655,9.830593855650527,10.488764840733644,6.3486990234062946,18.87367380873745,0.2017845340305202,8.887582552557092,19.926875027305183,10.715563384592528,6.992853384112125,7.5029523934284015,6.485639826799008,16.951949489744933,19.329994322363756,11.210906594541878,9.560762449448909,8.919254099198476,3.598036832258593,10.314270252468978,4.04841381949157,3.249117280041305,16.816589248646597,7.879184257461267,8.377075140698063,3.9556820327460063,7.022487078393791,14.815395148993073,1.5588812417350573,0.7539394161950952,0.7024534164926788,6.485432659245949,18.476517788193902,17.22046473709286,17.942970645211574,10.008453353328232,15.289978709900197,17.512675710392095,4.151331031356538,13.904321809050305,13.182386625753857,0.995165158083049,11.152918809200205,15.229327589362605,6.866757175064739,2.533351968676354,16.7754063065469,12.835119530790253,19.11982968687655,17.377556091207595,16.251703143710937,1.173969229971017,4.9598837051797195,11.346673691007677,16.100884744709433,7.699576125980441,1.4092748338019367,0.6769105037073997,14.941915541127827,13.531593853885933,4.457722615863808,15.835429854969858,9.935518625011808,16.65690272625263,4.350364755041114,9.354408972270697,10.168872467070699,11.34282795930147,6.8631779977200225,10.387185271735234,4.338177414247237,13.09082295306155,11.728349822854266,4.705464867546074,4.169042633871336,8.033838135745107,15.169692362068542,1.8830951179854294,3.225829200769077,13.5529474447788,13.115233633666206,18.393804907007013,14.330709681989834,15.225991209565827,10.516740141613479,8.597325094484326,17.32384346503716,0.33360319213409984,7.705107129495299,0.5641327224883952,17.55960925821682,18.386105295742354,15.65640590560784,10.005163009841471,17.244901307857923,2.7574833635992535,11.538288485809503,16.717834096965927,9.954549494974705,15.83543202718877,1.9982371676963062,17.086318931207757,10.589541659591868,9.915417817964439,1.8729904572014577,13.990615649538537,11.917477366809145,8.96255162593867,16.308257372708127,16.59698509257317,3.863339874882077,18.682989652067032,3.5329852730597056,5.1469759569170215,18.68744214701906,11.968307848435815,1.2903410120957393,13.400977807383224,6.098692867552251,8.095360159779874,9.541549072862656,14.416479368784763,5.544271005509844,14.602423753780478,13.936979406550915,18.518100438271432,7.146365625592397,12.343323238032582,15.054409492560236,3.7197641021382966,6.36175801137965,8.786395394767933,18.058904966883908,9.904103407125007,19.924360294830635,3.7601270543489917,10.307224991730166,10.02846116909879,15.533792915029645,18.42436850276874,3.55737926055526,7.601628092964892,4.721645710529492,9.950660047922536,6.102764050047602,5.910809232406682,3.226704911163325,4.050850803914163,14.021673181165015,3.5706921704425687,10.948417462411314,4.671183729845292,10.937730498045447,5.214736622100071,12.708294973948856,14.763135433315927,5.2359083978908005,5.491134787227887,14.142268205923525,4.937604211386986,1.0223843279954936,19.324189579902523,11.57701033186655,0.4291321688144345,15.975226859217084,0.22574137165452424,5.314634594364893,15.851321324844072,18.419045178325643,12.552842740720894,12.561110945284106,3.0670610376047502,11.818937387029305,5.648127642336593,6.073259149706409,16.950140916564255,10.162292234522447,19.842226160272062,1.3697897103056222,19.28404169425947,14.791935174668955,15.987327143338522,10.388577493353758,5.970427587190401,15.036359310586453,18.781815231828492,2.2045860913091797,3.7018167999423524,0.1208903869815714,0.9418801754527406,12.562485341277814,7.9033742967139675,16.28766495100574,3.7557619064977343,13.513898874546953,14.953060010755653,11.779648683761677,3.4074789931011296,2.3522176487593205,0.20975397329983547,6.548997882679903,17.56392330076023,16.724747898338514,19.359677775160108,4.1634925327593875,11.340843155862807,10.753005468429745,12.476097561251205,1.3197792333628255,16.067754753413656,7.391340792899483,15.219364660554104,14.542091977399236,12.504355255700892,2.828336017194273,15.051211980536863,19.516393507854097,1.7073094467827454,8.139805847829473,5.866655336798101,14.470465449111058,0.12404155015266483,1.3908020726302217,14.11911665423776,3.2116464075845963,19.836050957380657,18.813586999393962,15.869337874936576,6.26784973143808,18.20321473413197,11.300627285050155,2.423742843482346,18.053083226236552,7.296158709573084,0.1884837337383738,7.867360520176332,12.69699313098021,16.454022029645547,11.475751081825042,16.072297482013337,0.3014639626051352,10.011718697195452,2.1171206250124452,8.717119631931816,2.4773611461551637,13.391049613071853,13.573308852114877,19.076069978104915,18.458909759990338,17.197930886942263,8.49338368060987,8.242486219966864,13.35850028632063,6.579255126497663,9.800738428006547,2.7788139106792142,16.5432210143792,15.235342663321045,19.561317196979036,19.4699609510741,2.8187769077901415,8.520096629341655,5.027034514828745,11.760341495906532,14.438621908469727,3.0712371985561093,17.896706477371183,1.9713660836399294,11.934438883731314,14.049889144091875,5.114605442027567,13.814809177981026,6.815098807470852,8.577636456307713,1.382719613796226,12.386031795529973,2.0779741541502483,2.5359533396090095,1.9977593966677798,10.37836036749701,16.591357261211076,7.267953260399698,10.520593099417933,14.13609077214462,7.553820234056983,7.991572218423109,4.844944812057923,14.687641414893289,10.36857033470385,16.52063621415921,3.747869880395629,17.851925936357738,11.914049134035206,1.7799550992790003,4.496580073527752,13.035059867411075,10.805832799395251,1.459067515704846,4.286347804233461,6.48614950354502,8.498497865470021,4.329165340524388,10.578954612161485,11.329294176380342,5.42026614910295,11.202361665280186,7.192769520226423,11.405616912908133,1.956822591034224,5.683471908874762,13.063963119970907,16.0478784623853,8.580681078120174,3.527429648639755,10.400068725807285,6.399288797638145,1.5998538009781171,10.83231082458945,8.5899570127428,2.544978395512789,1.7820644400731611,5.860639168110353,5.911156059301761,5.302975517278945,0.6999523996151957,6.182537370143,0.2253167029126324,11.095615365552916,1.1701906315976274,2.7837690920913616,10.423900615215477,6.05015460073135,2.7449152146088363,1.7162413288191658,0.5096400981174298,18.337102650916822,1.86785791019211,13.538963499067496,9.98874551727194,14.101848007812254,4.836559057452812,11.342468947283688,19.50408345363124,11.266788343940298,4.158208252444253,12.870408032621814,4.943979761056894,19.78537039523483,15.889596552726633,15.737277919725422,7.3214920888770285,14.492246341396271,15.74437327185191,4.702604733755815,19.243148313306946,14.316754342507615,5.836150840281458,14.822124587813281,13.629926031063096,0.707244249584682,12.052609127534701,8.1581113452717,18.974178177266033,19.494750180889106,4.856429685539632,10.947607416356773,2.0936982336608967,1.6566062416549832,9.150188011112238,12.304171792056039,18.548312715950956,15.917880148309287,13.128715969083494,1.5198073298142445,16.91039103127465,1.767610494839249,4.720681290622459,16.68551908794001,3.383041717976485,18.87807865221724,13.951958870541468,12.437793868864876,8.41801178691449,4.203673899213758,12.578659485737301,12.835629251242086,7.182657667831864,13.911849736967747,8.12138710551768,9.703484780837623,15.427201112841171,4.179524288086123,6.136316853051729,5.713789051174452,4.959444115597091,16.43785726729533,9.464446400625594,14.635308470184626,17.9021572708662,15.311091892337894,0.8787673982903677,10.608392016686805,12.17483277224925,14.017995611227061,2.604033442503999,13.409446783000934,9.308696367342142,8.840880682895582,18.981165043469748,10.390425539491561,1.7822391710280572,12.310941899351441,14.210015355238411,6.13718504468848,13.676156753688815,3.906584969787348,13.057548391354254,4.103657741472424,5.917150883607518,16.49060981521377,12.654627041062758,3.430827317145413,13.97839970273826,16.984118427926415,5.635669260472889,12.530191885241644,14.179245905553778,16.90884544836606,18.356986550736934,11.638065707936477,16.572618025878644,1.5791817830296884,7.980158353381159,3.9308179426280443,15.559042520836176,17.07395799550888,12.941559116315794,8.864654555840241,8.324586390508646,14.482912912167407,17.926610085705814,7.527634848088343,18.509457234937926,9.850439288281216,19.911620920148504,2.7980428864715012,13.761571982033631,15.409038750112884,0.8955356999499298,4.520124118709421,18.46874433058013,10.198160280437927,12.72309921060315,9.927926644830123,14.364828606269139,4.487588977911523,19.194198197156517,16.452751656918334,16.124518260788744,15.753935790010694,3.3611665298196414,11.626578425093076,6.6138031757367655,6.73075039644742,1.7551278178146923,18.205356336242886,3.3992234121294596,10.743108095184946,0.9510860791769771,6.177978362538505,14.610648761131483,17.708836205080758,3.334114418750569,4.026352654515617,5.630506877704833,12.57103029985239,17.109913799066238,9.666356709459603,9.66054805712838,8.457291681198305,6.415028592072716,7.29349245915476,17.105921090802436,17.165462242280793,5.958281045103044,14.45279699084459,2.4812315467653123,4.895961943275684,18.933886374011625,15.787546310988926,6.361423912194413,8.916085483291418,3.1465508443832313,15.941298934596965,16.431165654344543,15.792778487162424,4.594348924355689,13.972453711046583,10.96972306887718,18.812870548181337,16.45859856915497,11.342590990987134,3.12141672255712,3.885457339117231,13.21922333347561,10.294581869799494,4.324130654397806,0.0937530652224261,19.712692965492337,2.271012933134906,9.932255849118174,4.605701177024222,13.241679849551339,4.695596517339795,7.721371954506324,15.086565177370677,4.057054627899115,8.913926939041605,13.26017770604727,9.026961202135073,6.8445484698189185,2.82343177035286,7.6183432609647195,17.87114410636843,19.488114027191365,5.377737309023032,19.956932112414076,17.542514985388806,13.30054364434238,18.95822815234692,9.779542474223435,14.993593359138027,17.967377535415828,14.737907972140318,19.96696844752529,18.39138576245061,18.52214461184053,3.9511705500225514,8.813572866797937,6.527944677362494,17.980756634198876,0.3696157675013323,19.359056654601112,9.40633976395143,17.891242557965825,5.678178326937848,16.11863047571916,14.490099237998436,8.636131628478815,15.793388847364733,12.138162042975393,10.694690925537698,16.491626353559372,8.220633315514906,5.020628746993956,12.983784072156794,18.758960910244728,19.391031941918406,3.7352372693220115,2.0381657934324737,14.142106968964452,4.4957593677186924,1.3729687674604918,12.621844512125602,6.520764337527671,1.9528980802064133,4.170408712286147,17.333716028320183,18.809031291866084,12.416822154754632,11.7292866022443,8.914031417257613,16.299261322663916,13.716302612941536,13.605106759971232,9.210944949739543,4.012613374982288,17.02098953591761,2.4863225900392205,8.851234689975618,19.60403501867254,12.025443594565148,14.208964428619772,17.447175511113535,15.203037378884797,18.10477073833019,3.10915410095427,2.6978818882246935,4.013274201070298,2.7147174016376407,12.5826217381465,19.884781791196964,14.989251536575017,6.375802028304451,3.1672230759408126,10.969073406455244,4.5839726878697284,10.146310182405735,7.414188372638959,12.193029906386723,11.295578863313654,11.637233615028277,12.472372288231277,12.59494079467013,16.193957187004724,3.3409996991926283,17.401996761483748,10.23938798631043,4.555033795038943,5.880662873554767,16.043050010946,8.209213519157368,3.1292936139872918,7.382356124768985,16.91703161741448,1.0870248128514648,1.6131110117652447,2.31471231316585,5.765314388279328,10.766323255336934,19.510319375826597,1.1052195170137669,10.846890227358825,4.820613238152891,0.16757648120493407,5.064574305418006],"expected":[0.008371946012896623,0.0053722381401626555,0.0035828411256413036,0.005946073480743559,0.0019864214212855355,0.0017734247286900796,0.004185077228593068,0.00817549522651025,0.002451670898939321,0.25237792191865915,0.00360443108344947,0.013131847831378775,0.009400803967382168,0.009092109126842638,0.0030060847932255287,0.03721868742233485,0.002630493412121089,0.0011819745309922585,0.04722438899145809,0.001379078481819739,0.01295087000040408,0.18374588498685482,0.03417615074664211,0.002496245696467274,0.027076755243206865,0.006570749628192693,0.0014158558367400452,0.009351824251837733,0.002041391421626972,0.016415944435139218,0.028467543633783798,0.0016303195608622155,0.005013229333177578,0.00318951532147546,0.0015568849017505147,0.006798767631982948,0.0019040197644847336,0.010098033998924325,0.005063829993942968,0.0031054525413648612,0.004629049026214833,0.02063771256729243,0.0035124833618121777,0.0059429736744694905,0.009496783373737517,0.0014311624543458718,0.0017751298145723838,0.006825399631614058,0.0035325175197131195,0.007219377045447981,0.011781041475525328,0.0035317371280387273,0.005043847193513622,0.007958406503630805,0.028109562271728575,0.004346545614244703,0.00292880063449455,0.00018051695950101554,0.0031711698617888674,0.03260842652865859,0.011509248872735366,0.0027104902133337004,0.7340850823658052,0.012797822017041483,0.03581787226212296,0.043325900074299824,0.003006123943580911,0.045531158427594365,0.02973351040657257,0.0019863634135767376,0.0013551894814126495,0.0026311983933801925,0.0018684347347615977,0.002428060186926024,0.17037855475710242,0.001143650276953928,0.004742007154869236,0.0014009518766049938,0.003408305212982832,0.016891448805028148,0.0020976464409583426,0.20419862551739595,0.027243764579839822,0.0016106456495539195,0.01622997977523629,0.003162203574650646,0.011377578677023945,0.0024966466579820277,0.007129127714346054,0.001872505262417244,0.0036588296930967577,0.005107605880099264,0.008496694682700087,0.001733169829507211,0.00364382446827566,0.0017054507691800602,0.0021258644969870235,0.0037906961911977665,0.0020168542171355537,0.018916921858328946,0.004063368997797668,0.003907412695076403,0.0012994681209162339,0.002947391957535033,0.0010543837476558234,0.0025010273019976047,0.012767526573130458,0.006879138613362586,0.008278444115319031,0.002757974464104095,0.0048740129580337275,0.005108441779093535,0.002110143157195536,0.0013663522292320712,0.003051693444506073,0.00857902132815837,0.0018139191834662396,0.0013887673773333015,0.1956877375383049,0.0030940572554536425,0.011501614623914878,0.0015994616276687199,0.003698267810349687,0.0015956163804803467,0.003366205306358185,0.0037484074770661974,0.015151083680128718,0.07555961818804242,0.24914909341112276,0.007598072284743859,0.00742971735375622,0.09633037904399319,0.0029157269148015127,0.0018719365969755385,0.03475251771941224,0.0015499180238351838,0.025161856368463725,0.0018307007464319956,0.0028603091226170724,0.001861588213761759,0.00788930914749049,0.008448810383007583,0.0053657646017741395,0.0028358365758918425,0.25899523798963386,0.0035125600789130173,0.005953402277841089,0.0021064221791082987,0.02553793584920693,0.002381401071502417,0.001972086482209663,0.2383878887537681,0.00361072016276711,0.01455736557978427,0.006932776049401231,0.002738013693175362,0.0020507676372272083,0.031208566034118104,0.003419874506803081,0.001176935763402243,0.0019491785835650253,0.002990065101271402,0.003524852517390466,0.001741764089157605,0.010850269708965887,0.0012568018734463843,0.00112876704867106,0.005473656612176442,0.002648891847994708,0.0015085682086847835,0.00238698464094249,0.007720513449933594,0.005426873685291639,0.010821748301236079,0.0030809495763522176,0.0031421936533353955,0.020015674058239386,0.0013436539879969583,0.007733278520769517,0.0030149916970169006,0.0016809164607507745,0.05542100095006166,0.14627506798440218,0.0030319568672416337,0.030208204534652536,0.0027996021045696147,0.0020537800362852854,0.5253820354835679,0.0011210974940827534,0.0021936031041222847,0.004340518256676984,0.0028805943326358227,0.0023084958425220853,0.0063700542598692225,0.06569014432725942,0.0009987268198453517,0.0001869279109846852,0.9321433455340652,0.002198025260449386,1.7645305006922562e-59,0.005541688320322209,0.006428135872940958,0.0037873736961304056,0.017322700621770073,0.004840517612779897,0.0030295554108364336,0.007271573392957487,0.001986668429911546,0.0019631730037397736,2.6254862314916857e-11,0.002377773858012813,0.0037594287289523347,0.03414533672696393,0.005252511311212994,0.003672374861991879,0.021554558104023496,0.004646667722548041,0.003174565319820938,0.0014779349032319387,0.0040819252031895036,0.0013992667472512935,5.264616243553371e-145,0.013368152199614248,0.006135129437486599,0.021018033279503485,0.005521463748436158,0.013165162662051182,0.008215084903481227,0.002116244631307736,0.0028067361133030694,0.005237075702231585,0.004747357350409953,0.0017566646735890494,0.003941635416811683,0.059607159790552894,0.03317148578350793,0.0017959382962081359,0.04207123456247754,0.005169001931292602,0.004374989600856215,0.005774997479733138,0.0033961526143541725,0.004784089442339447,0.0033992469613535626,0.006966281792804555,0.03547975007306892,0.011728341013010504,0.03854332118006484,2.470456583142932e-38,0.00417937470044279,0.005214810195271875,0.0015776741248472693,0.0,0.0036092821472928824,0.0015014633093658563,0.0037732687046522803,0.0016729865840538374,0.012273179639897387,0.007827558315780388,0.008530106357389234,0.005478534816242401,0.5542827744345288,0.007034981837876455,0.013031957400102438,0.0037917429449147366,0.014305819658002955,0.010607960328820486,0.004907758281932124,0.007821453821695145,0.0024539375651039396,0.0025655532571377876,3.956662781680817e-9,0.04144205831782454,0.010090575299768438,0.054089486004268314,0.002556658974706012,0.0018433645488589417,0.002330465701096503,0.002206486764084266,0.003100756121398161,0.0031189422847575587,0.016259237831449818,0.008350011164978023,0.009495820980179731,0.002846039999039336,0.008131031172901655,0.031669977653408427,0.00012260165543675003,0.003557832890394291,0.0030838335458083,0.00186963067856168,0.006023307571884912,0.0025398435246399113,0.0021497436243358968,0.012995524564998211,0.009988137134620118,0.009886052027689319,0.0021471412522725097,0.028399312926589274,0.003762024279182357,0.008421200575969751,0.004102094202476472,0.009297482469001094,0.005700458806434936,0.001947045594230521,0.001859292920433486,0.003535690253898062,0.002247482615661409,0.0009203542220666114,0.06878578981254022,0.005193623593286893,0.0033633847723075253,0.001331364283799084,0.040462808367618584,0.030875802855001796,0.031683930264552004,0.01647996634396436,0.004547688016899902,0.005456728096494907,0.06943337714183272,0.003264804556177867,0.003128496994366277,0.002134702327440224,0.015270605659764657,0.006205067123585721,0.006115736419521807,0.0012720071651504093,0.004762290160653141,0.02449464639741773,0.0038472887278379457,0.004330088009203647,0.015969114609297005,0.003714006420292958,0.003736140329784664,0.005195433770887635,0.006062393334656068,0.002188625481150395,0.0013492953117180072,0.010007088024331565,0.4873264628310753,0.010306784296808045,1.9392157871197504e-23,0.005554526778004817,0.016544174020553824,0.22202413409227406,0.007864217679211433,0.0015581849120188329,0.004321567090821481,0.017496563172927762,0.004397855282444577,0.003228111969412634,0.022167909948026265,0.003956831970084768,0.005788007747328864,0.025546450298152373,0.002711684877376362,0.0012530717197860091,0.005933839816888753,0.0028323667379637927,0.010242428669463184,0.0021639808121104854,8.292798918354905e-7,0.007768762488050098,0.006960469528544273,0.003992351988382523,0.001551191152429586,0.07735106504969204,0.012769114829100668,0.004091173026007597,0.0020250504706241608,0.8077714637695671,0.0017589595716591918,0.0016152327655230652,0.0017675311560763412,0.0020666205765843444,0.0031520035129758896,0.0022320512393252333,0.0019592916753831684,0.01607671870547413,0.001173896493980893,4.2956330070844905e-17,0.005488276560204482,0.002448598183184533,0.0018242034342079215,0.00424428040461468,0.003102804744448987,0.008585253846663834,0.009007280759911078,0.002031798583525116,0.002368919831906731,0.00288162065182142,0.009069389613893529,0.011989500033107751,0.01014329357548605,0.008181385948780156,0.03815681947908953,0.0033516102243975796,0.005617268948873103,0.0034675770740323648,0.014304068031924827,0.05324961344482654,0.0015370262077004306,0.0059023908142458925,0.008689342966742059,0.0012262045781087944,0.0029504207802084196,0.0014474354524124525,0.0013129419764527767,0.019854934640992063,0.027011778283393132,0.0015051584183472775,0.0013929937032275378,0.07988934299750122,0.009781773623935362,0.001900043794023835,0.1537687613826516,0.007300279043133473,0.008234466551827663,0.005215071593858198,0.022864211892458783,0.003668531341237602,0.00642905113001601,0.0019522286419250722,0.0014294379827170115,0.0013461688759809553,0.00372450660363598,0.006010185117346893,0.005925868725298302,0.0035228142155851894,0.0633482176823883,0.0038493435631628504,0.005939887010298283,0.001460050809097353,0.00480677529961682,0.014487699935819115,0.0013000866339352563,0.00426334850052813,0.00765737908801033,0.007539431360789383,0.003501760464689211,0.09219233006611628,0.008417949385349835,0.007998988065912193,0.01168945465705399,0.00575743658548896,0.01605983420517243,0.008032365259136316,0.01274004580946969,0.04710904968331364,0.007547920361637698,0.0025200882967843425,0.011605517149372802,0.05087844464811199,0.011025918520363246,0.00557354782638672,0.0018749408246398276,0.003329624863992244,0.02241032934422819,0.002191355443456767,0.006265759638066004,0.004956322476245273,3.8902737205265083e-10,0.005094412152930672,3.6930515018769494e-5,0.0019857293248756974,0.011712662654694382,0.017350596016428056,0.002507921022487978,0.004063570083501086,0.006689255568673353,0.01227598091044041,0.005695430678446983,0.0021376934981527005,0.0061810039306660226,0.053219375626446554,0.0018749687248275175,0.008078771368368157,0.007705724242892809,0.22551074357530235,0.0016992291636575595,0.005408994723228823,0.003287314713879344,0.0026786201030561184,0.035346913678453246,0.029662505398873253,0.0017101911299520932,0.004769932755848223,0.003474303574921641,0.026753587628756494,0.0017253849409039988,0.0011005510950028788,0.005459167774394163,0.0032408963743975065,0.005581908548139758,0.004559472456702627,0.001783939614975896,0.008678746578929817,0.001950145217633882,0.009006428861037504,0.001533762050586231,0.004654081387450582,0.012426195375995415,0.0013479104528982464,0.005122602807906278,0.03036981500528882,0.002334584147072636,0.001559809575159245,0.007077644729634272,0.0012591919956756502,0.021692131580864547,0.0021020296264547007,0.00508726292978519,0.027452455571727298,0.001831683281483687,0.00484799947334475,0.01452032565972411,0.011374612113004966,0.0021162616843425374,0.0030866693780041135,0.026924652382693454,0.0128237886188949,0.004994164807086808,0.0022607622330149844,0.035283472180698786,0.002252792022958713,0.008228216271395724,0.0018827353293571956,0.010405070173038738,0.00405730222660726,0.0015607302554863547,0.004905715653187632,0.008938358926698404,0.0033984808913959225,0.008148227070748608,0.0008310850952962984,0.002918435405048041,0.003797857843783484,0.0004492250158095264,0.013998429360643055,8.73071013391657e-21,0.0033877863144040495,0.006902684077879917,0.0021147826542293586,0.004173084574042488,0.0035206232960326143,0.04358415841653751,0.003951449913653164,0.010039613219328402,0.0036096182774860504,0.0021541318025306766,0.0021904173820107777,0.0012433571312460564,0.03081401976621785,0.0021502719896820035,0.003339757236190888,0.006063032310436711,0.09151795759595432,0.004223022064757954,0.009635802338621097,0.05836641547745286,0.006091678146781048,0.004402503950652058,0.0031351844800382753,0.027267871650752354,0.001967200500376465,0.005646295190194411,0.01255854831609471,0.0062004722198389095,0.003387030844837114,0.0035625167576111673,0.010032240276586201,0.005064845122719601,0.3295424227739789,1.2181558495883014e-28,0.2158935762909102,0.0016540017884412613,0.0012520766770601952,0.001907079676801232,0.011558429114990113,0.003528248700667244,0.0022608512815036484,0.004631474192876055,0.001806095035227585,0.0018876269455205094,0.006180342672641876,0.003695892283643512,0.0021512801322035803,0.0015654162612908954,0.1233430613526496,0.0016160257514918838,0.0013967437666567008,0.008166788942593975,0.0046229839763142246,0.016547098675673114,0.0032272107361667655,4.344045933265106e-81,0.009507106210672604,0.008116390224698036,0.0180772970594109,0.0017513356666647838,0.009092441847215131,0.0018602952407543569,0.044192689450686995,0.0035330061548375746,0.012677239154526015,0.03647126417721711,0.0017476966450541377,0.00413014835476995,9.371077529357369e-26,0.006017196940462298,0.002296922662089993,0.0014154950460993302,0.010319044141654323,0.0015539388646711248,6.161822383930557e-13,0.001972919331637327,0.0747975184215131,0.005265741680009655,0.01777156748021421,0.00995289699434392,0.014238291985419128,0.0012580944439200457,0.002793036628331211,0.460548908235676,0.004896934977931136,0.0027914772905994847,0.0016044565503951337,0.005802547928263107,0.0027237831360225457,0.017523682980169413,0.0017542818507354158,0.0019578478519011546,0.0027907110627505794,0.009948089274523593,0.19180547902649758,0.009258289980141507,0.017708649755955725,0.011099419772613427,0.002115851871589288,0.19332331479086726,0.0013890822513343705,0.013824501318664183,0.0023255333363499777,0.04008022892594804,0.005627305929329255,0.0017064362276916873,0.003701727205898008,0.01060453854245873,0.00945698319180642,0.0020615222615542337,0.00836756871243577,0.006291582383638356,0.008330418208638654,0.002972485634597229,0.0013507534899506878,0.003818669145672052,0.0026730134961083438,0.002209380164217231,0.00502542923471009,0.012247960753467112,0.014081642792775366,0.0013734167927093705,0.011606709625067418,0.002397377349193887,0.011148289213237742,0.0021860585365513423,0.0018255500621359973,0.004999730539612811,0.010792502328694095,0.0021247496613588258,0.003664948445285301,0.019884565982680836,0.03826985407114008,0.023688427087758045,0.003562825028235173,0.012079608108237222,0.01080990643372774,0.004327316814125689,0.024403291316320266,0.003045116978805095,0.007779332000446646,0.009958516047450976,0.02165344616959134,0.0035595616471635213,0.003068367173588634,0.004428735778281958,0.005070625066959555,1.1423025511922016,0.003026875506193798,0.0035613149584958243,0.00751652281436348,0.0020378004608783916,0.002598131167745534,0.009100892246850607,0.01403488200578603,0.018964287266769155,0.016993244091173636,0.004053908413737884,0.00011341889342254996,0.007402892660179451,1.0749975303531528e-13,0.02044806980370014,0.030273367024603506,0.010428945698444665,0.003326472176969055,0.015863366998297653,0.010091542333065116,0.006537443236258372,0.0011303715677088587,0.0141989985926309,0.03090826807899298,0.0076393316426304645,0.00220232089842452,0.0015981270627180902,0.00849570246712858,0.0035327790399557685,0.001595425265081846,0.003846908058250234,0.19317830729701024,0.02738572882328185,0.005464871265793772,0.003232436630132774,0.0013324638294700268,0.0025964957816874486,0.005148984294831072,0.003958704821250552,0.001256501063513427,0.062455682765389285,0.0012904213856891418,0.002227892859549472,2.94910342699918,0.002326568341040587,0.00352208515903529,0.08525165128236407,0.0016144055807985327,0.003388453371367781,0.00415001092206276,0.0010799897881873135,0.011022816209205217,0.00413910412219178,0.005770067827107481,0.003289283200526686,0.003148535485569037,0.05483440813577392,0.0029846755529686388,0.0043526979182172765,0.0038512049212919134,0.01738195903877761,0.00956684515057334,0.004570182068803076,0.004611492774960561,0.06717360698515655,0.0052999770462140074,0.005964535878615107,0.0015990867320340365,0.011808441323479245,0.0033447541105388083,0.0058183999574403225,0.0029303675448712338,0.002438900497132318,0.004008260648924503,0.003170193162145601,0.004408227704324082,0.003159564002305567,0.0014271636030830463,1.4773297222547213,0.007714958276264565,0.003400633139821374,0.006501410463733632,0.0015979839883611866,0.0541344318791145,0.014490166087664652,0.002904412657569147,0.00145732546651099,0.0012583921988808184,0.0077226368494060105,0.001668493441139893,0.002903899718265971,0.022170286468052153,0.014732262228984463,0.0028401892772067588,0.003505029602319068,0.002370562688570826,0.0038187750981432773,0.059851109254389696,0.017782689479467876,0.004449141254329144,0.004544462288720915,0.004109869563863853,0.008970605261895082,0.002377369545211325,0.008048119016720688,0.010589237006376363,0.005046588909944383,0.004009256992369773,0.005397615513159419,0.0019005083221628,0.0012719691827743566,0.0037383554456611626,0.0018038293597109486,0.012471691771589298,0.0013747151314381033,0.002961332586280848,0.0025313328639566014,0.0012851656410020806,0.01828486783041744,0.0035464409570489185,0.02162106324326691,0.005813181105669688,0.0030709918865000968,0.0038056595498078454,0.0025533253060109526,0.002933016429867803,0.0014170665577930535,0.04678779335681372,0.005979829067354916,0.0013429873648936087,0.02546789804749562,0.0013094643733606167,0.007061438859382414,0.00224482622875976,0.003248233002599653,0.001742923393865809,0.004771706781624995,0.0011061422071001624,0.002177428355284993,0.030939466162257886,0.006805010728800014,0.005022586476919934,0.004140700229445085,0.001076565783487085,0.002431182060111271,0.0041722661082439095,0.0029810993109194773,0.03865242202380993,0.004507511345410907,0.004829926457807826,0.004947271704607988,0.10263958999882153,0.001181477720836618,0.025213795583050425,0.0076076309382044046,0.0409681910219758,0.014813849422274183,0.02291167159709675,0.016706688070197106,0.01557807234790954,0.019055322405223174,0.007471279039969143,0.0038214570813732015,0.0015588552517243595,0.004556624422082246,0.010130332281579602,0.0318036462245097,0.006428693151273921,0.017172934518980262,0.1507937891687578,0.0031438433464922675,0.008142193520862602,0.0030300780811878506,0.08800551513448855,0.02865413912854505,0.0016645441281895228,0.001898379098204583,0.0067537264852743015,0.00333450043437897,0.005597092008862925,0.002220584639181753,0.1885002158690442,0.002588052650159002,0.004547065923578434,0.0032712948292200126,0.00248439723893164,0.0014315113588249347,0.0015460347622902458,0.0035145900614641772,0.0065567342997723994,0.011943606710060194,0.0037033734738809382,0.002320693511461076,0.008619871149474037,3.3650569946406406e-132,0.0019996826724057075,0.015326007677361681,0.0019493342308488087,0.0048663370520458955,0.002871707950326864,0.00398744502880405,0.004953081197628903,0.0032641532103935807,0.013012548234633948,0.0032371107227708454,0.007101938665565587,0.003274408954847156,0.00296280934847482,0.010684871382823988,0.0061611218699528375,0.0021212637912448105,0.02174526774925479,0.004346984324604492,0.1702556487459246,0.005197968040299991,0.008947180370980592,0.007643805667526339,0.003837124530993237,0.002151615904428682,0.0019263841923431416,0.0017247104303573489,0.0021040206599413653,0.0014731687950195037,0.0013744753169083524,0.019880896469907552,0.002164699620095477,0.002956605097135455,0.0017702231603500497,6.259044861685348e-9,0.0014845789446533634,0.002288214253782376,0.0032177802310801827,0.010497005525240409,0.0016449167735370313,0.01757757056675516,0.005052969175673492,0.005279734583862623,0.003787278356200457,0.0036397060356645676,0.001351048170452867,0.006526917925582272,0.010311589139136613,0.0026822832034369987,0.0011646439006730918,0.01799456718161267,0.006787840534668241,0.007139808964612369,0.05656190656018211,0.03191878956932478,0.007093078466997118,0.0016185016021774009,0.00915356595346527,0.006664531342832186,0.01830318921968749,0.0017792938147577217,0.0020940018400243503,0.0028096174180291433,0.007538068316246058,0.004591585800687087,0.0012756513940019823,0.0039406742531446,0.002063952767566405,0.019066865641903918,0.008396816240679363,0.0011648320891733236,0.009593583431943059,0.014358566898384311,0.0011611752054989178,0.003332065977564436,0.003223710509613973,0.0013631166389608384,0.002863998806610399,0.004090131600621915,0.005065696126710192,0.006022400377576869,0.028861828524312853,0.007836629408809663,0.0018838842384603337,0.003175866372746648,0.0015737151055132258,0.011221206224060237,0.01991130997492524,0.002649689556542924,0.005296288452848102,0.05777764976687303,0.008661301974112117,0.006499787356495856,0.0023356654849273997,0.004004411713459697,0.001707454333969534,0.002074434733465516,0.002574782199100809,0.005729912149708616,0.002674277443376832,0.003193409211880857,0.08025567657008818,0.004652804717096323,0.0016716680284839997,0.007113701538756767,0.005117557852806685,0.010119343312706648,0.013700071347046682,0.12367470389491883,0.04465809115490026,0.36935963062195987,0.007000615679548277,0.00300117387777512,0.0015854837604962722,0.002300584452283913,0.003227864553212257,0.14559722365079325,4.5251657776665955e-61,0.019198420716517638],"x":[3.422434024597405,4.540545927829993,11.532076087401798,11.996997825476958,10.78822344018259,12.93180662835216,5.75182807480441,14.721291842679198,19.56767395844754,2.975940901916312,15.329905330731272,2.8907349295099927,13.450460531265556,12.163997451362164,13.627110390888703,5.6407657941282086,9.101055798731936,16.866296471186452,3.1892527639038004,19.454542494038623,1.824783039103215,3.11542681825681,3.7785621306222295,11.538278963875094,0.9611660143731227,5.6562984041833575,18.892509477448133,12.25683596328254,13.45316636265621,5.375102905409257,2.9897081217190014,16.3556695462584,7.2973508485966665,6.306139718509964,15.915850700097973,5.899175494704694,13.680566624299676,7.212071745809099,16.916994035210546,12.12439995470859,10.670229658582961,1.4947216714424005,5.9287719749522205,17.38779675044871,13.44076966502377,15.341035041790484,17.265585169817072,4.818060670234328,11.495173845291035,4.841724364637114,2.046356239722096,19.987762093223196,14.942636762857259,12.300380380315241,2.7048291486825438,11.683960489485749,11.94574979275465,9.770902870404692,11.852597095357522,0.64479299059363,4.240883027896776,9.60206316773232,1.48000733641108,5.993862961769247,1.6902804023270246,3.9040369628583216,7.519077563633383,1.6172284669779602,1.2862432814804015,19.61152650759714,19.35642681984988,8.145290475849611,19.71276052621393,14.845452269848206,1.537220286600638,18.16068659760859,4.439391026674473,15.635619595211217,16.019161285464794,1.6260040747933147,15.572257114410629,0.5846840871326187,2.726494048512298,14.917066646258919,8.961683160570747,13.657075257590897,11.059133014113197,13.553517924521937,13.193778754677034,11.772219052300574,5.920050870905742,8.260344976321562,12.674657017053882,19.136201682308723,5.889935327039377,14.123015810149017,15.968870455071457,10.300488142011016,13.686373778963233,2.8773689024857685,12.660799604903001,17.68984669264038,17.197619796074356,7.813717873032555,19.163673994515346,12.728906085395394,9.094704043538982,3.3727725110335083,10.510733225435306,14.070068341595569,5.172933854993214,5.416311298305532,12.944350862251328,19.66188489476131,19.934959486474114,8.34144228823535,13.964543768778967,16.356136755122094,0.9985794395982683,18.055580214482635,10.46086724766619,17.472269437758445,15.209738721573324,15.371027675461107,5.924852991281355,13.70717827788443,5.434887034418452,0.7872586901842293,0.34412017934010386,8.299998756892695,3.310387080953361,1.0030710812752863,7.076890659415445,10.852670709676913,0.9304157696543536,18.927630432459388,1.620907710222732,13.035063375480544,14.29293056891261,14.580414976383796,4.976123376618209,2.609445964257424,8.197885887471067,7.167836721748944,0.573103893420841,8.559286219826806,3.775944577918917,10.268753441371828,5.474225708404794,8.461571910276295,17.119238563574406,0.8223681022126828,14.887058301960856,6.5952798617092245,6.6479487064749465,13.715878683371319,17.75932958609198,2.3187773975471027,8.337767851795913,18.46899537983557,14.009125174188384,9.713787871537143,8.19468531641277,13.202041594792298,8.902129916809463,16.315053285066625,19.921795323645277,16.11855385702522,15.00585693187805,16.127011381465355,12.960364443730356,12.41893939870376,4.757010169099853,8.348207854172163,12.840911490016156,6.6219306408845835,5.659750387275135,15.30887096733506,6.080106544515891,19.27659652811951,13.677138492069712,0.6670187713060471,2.8144346699924228,11.926274445214506,4.571059939652269,9.886823125001015,11.80788830668769,0.16476248504539104,19.855574835966184,14.777047890980008,6.364444546211394,8.426237131154938,10.58536166660248,3.7553212170270323,4.3634041215091735,13.532240782450362,16.88937805307042,0.05245343447626727,18.233948029032568,19.449922673781728,19.65975689036878,7.211533925871638,6.554476557941142,7.006056086318551,14.22051243934511,9.633311771377926,8.902667425971472,17.762870474050686,12.284792036370607,11.155006560241162,10.963461606109739,10.492818364147292,4.768512224244832,5.642856737502191,5.475270747442389,3.8330848084985325,6.583545479896622,15.349719735231574,18.867680878861755,5.767713638759324,15.8123475439118,11.037741820718141,8.330740040113195,18.50646608490724,5.548748602182112,6.948474221961813,9.20392145192585,8.873570431415922,14.379687365976643,11.608757275345617,8.888768839079923,5.952529637067903,17.864394496898445,7.4194203359969135,0.6798338959544603,2.343668860020154,11.11266388553554,4.597346535540843,4.503750721962221,10.822296634384916,4.08458361550625,10.174132492491768,9.46147233444484,5.942985501202385,4.636503817849826,1.4864238593737955,12.241244027844736,3.4988991670705083,14.311238016588067,6.553493878668966,11.199151674872558,15.339260653153254,8.96772788919006,6.83562052583035,17.34112867392173,14.906751135501404,16.11492515814378,4.3164197072702315,5.946266989416826,15.828456795216121,4.553686835316175,1.7187664234110844,14.684520273601267,3.2292174735924384,12.057927792635725,4.730700219594595,9.592913121824903,16.376657388560073,2.9001086556537237,12.07210358775714,8.727429458713987,6.387269279237802,0.9047419202475249,4.606581506810303,3.5523784312682727,9.807508229395845,15.006741216460057,16.104667047170334,9.872804059372857,16.811319518240246,16.247056292836,3.128325292687957,10.814263421308542,10.24418284644379,10.896137815541032,2.4668418209472254,3.87233187673945,16.22547863004694,10.445331329556584,8.568600242011142,18.12691063879498,10.489719796503593,11.07195490859333,10.61324643677342,4.114156718114481,2.2493746081198918,2.3555923702154002,14.963425007646332,6.787944399444261,14.99412733262612,9.598950206333075,4.991602697254511,3.9017053474385044,3.9270830222701614,17.851845255364797,18.573656943319932,6.374583173711801,17.53963282227283,17.18946228727601,3.0416324626663105,17.278714922237505,13.630041303380573,16.36846936830658,0.8141329488726745,0.8281752907667883,0.7209665057829895,5.424543327831164,7.8671394728981126,10.313203337756583,3.6540944375175988,6.667788428095922,11.317908788099817,10.604119286417607,1.5538370820458924,3.7998468927472517,14.058902865740865,13.744515617138916,18.974094501938662,4.50652312380631,15.795362471677352,6.980643529773336,1.9871930510329472,8.760428831263894,13.217095198441617,5.426886049376938,5.431343633550076,10.672536812720379,17.90362718190734,10.282546483109826,0.13382022481351896,5.715552613499741,7.716482555140209,17.099468363902353,1.6402329409363237,0.5210564202336165,6.239349813796493,16.72245809332255,5.639084963531902,2.428102882155798,13.263058333282057,10.929140949582003,0.9957648521878948,5.8287536627907555,16.076415690640356,1.3771359999019106,10.484022549903669,17.567233719972428,11.782113305422302,8.982642004667323,2.124387071722693,9.30143121744809,18.492880207796702,5.18386485234597,13.693309698471241,19.298141810211,16.154288083851014,2.300405792308271,11.687707338056024,5.927788838222483,10.891049159323591,0.7896501206824302,13.599007086901658,18.509228236941063,11.88426576710408,19.621851419565353,16.838628962788974,17.543385284654406,18.671609199986875,3.854159601691225,17.877934819703782,6.874196177639553,8.030275168086082,8.139965217459038,19.75878966535946,12.953063445078904,16.5452196825224,6.957617084233632,2.610408619183233,10.13127521752538,14.831438816104203,14.113968810358957,4.913501655439019,8.001952142267005,3.8041742635783393,11.310552982089233,3.0394211735130616,7.056092308926876,8.868630192957529,13.29940707128034,6.737028663676119,1.062961806769569,17.31059703932305,16.397570662577955,9.999544798241233,15.575552303073419,19.065662724002475,14.776520885878451,17.4868022336374,1.1197099491924245,1.4742000257188348,17.14379752305375,16.215429758460264,1.2025044022205433,2.9324535212538683,15.709726639401476,2.0992661877597785,4.860008975189012,3.1769283929167536,10.741364178224032,6.447512400774036,6.4672972975996945,4.805378351142968,10.630121302757729,15.937341603069498,18.10752170936883,11.532716410031636,12.295158157718564,5.883313521883773,7.010168094899223,0.817419738421199,14.693116932550328,5.722533690548048,18.033105123058363,6.098280046301481,5.949037814197542,19.11084247487596,9.304861660064741,3.1243235357505705,10.981981010191513,11.957922296614992,0.42153361036885606,4.159599755005421,7.192813439785022,3.282524563985878,14.438639676695683,1.897583717145963,4.230369556601756,6.429909381772383,2.0231109673701875,6.437005132681457,10.382688814731388,10.513328761772701,2.430672140333252,2.669386991987288,5.431542596626935,11.498376942923398,8.318409251928438,1.1691259262156573,16.78521353152729,7.349636165792068,4.62829190091079,18.16961880242932,9.994590603333124,12.858040005954031,11.376845429645769,1.852484307913489,1.468066809204407,15.592251928561511,5.684958712995223,15.953027017123684,2.808777927006023,4.1754421514139795,18.349241241088396,4.0720751825744905,3.636873270484342,12.3232201808537,4.647085460651121,5.207555047525854,0.9089398518633374,16.593483225910624,6.118597774817842,13.272347136310461,9.104298110969502,0.6788434685138567,3.449449576986261,12.425956649669484,18.929763053420405,19.973208772460588,0.7978012412860869,18.847858390630154,19.94447526366261,5.438858778781852,18.700401808760784,8.62865042955718,8.97550986076511,15.392660089551576,7.818496635332379,13.859846202750274,3.1778553503029583,13.970143357829254,11.469296927877632,2.60097981622454,19.485718395257233,16.8577684285709,2.0645168400314384,18.79008980597453,14.07991996919479,5.60885170562766,15.80614027321877,4.664349420045504,18.025261844268886,7.680280911362187,0.9342186724331247,11.752641147928081,17.647798136165974,3.569167042876251,7.1282533743862375,18.27252893587024,19.10895430521026,2.4858473308086815,8.19004389250015,16.13982506509608,12.398605442382209,3.0690557872165414,15.868224690442393,9.558919730613521,18.847534025348615,6.871227288775441,7.698486034146841,17.17056411636427,14.733720558518083,7.953902451982087,8.22231944794099,9.277144777081997,17.57931892250189,7.064899956678343,9.020793708414647,10.213144432665388,1.7829513541290254,9.507003068016257,19.94391116519455,3.6392447499515823,10.177514936284911,7.551478598373613,8.965982813710083,2.954175428885395,8.447973208504823,6.808125525101696,16.555427402397594,10.84858840738304,17.33690859670414,16.060213933513268,5.822674916440809,9.579358892216572,8.02750558805728,4.1008892021921595,0.41686249004664777,14.623211723523713,2.753429473326845,0.3622901336772877,18.587613610476836,18.86791880357677,1.7366218606740658,5.83483440656007,15.955388422602198,8.822033056461422,1.950311251093102,15.047121774607625,8.678929581192808,7.4561220085306745,3.3602539310555724,19.270264471205174,0.48450341310475764,17.15224569072857,0.26618757578014574,13.659672250782764,18.850413273793343,10.771653950659354,7.608972675142653,9.779014225152878,16.097729820958378,6.855112203092255,19.816214883783672,13.030167202735171,8.613105937985086,7.071644646022164,12.63162439461103,19.85806927014331,1.1435409492068116,16.212186380226655,14.539097011826172,15.913514797317783,10.348928542404096,4.0939115452627695,8.50242077058514,14.855559158436744,12.375383888048578,3.4701040608638367,6.135812771191564,11.44212811552363,2.330900217644709,13.37044667529723,1.440169484335816,6.190558646973945,2.7764728747752487,4.152683645740094,12.581524901696671,12.60440597755386,15.050245470090694,8.329296902076226,13.556443957572393,16.988469722125284,3.367742019501727,15.861794935030327,8.944260324271212,19.760166280360124,2.453490987710758,8.486271351479996,7.884292411315421,2.9834051125775396,2.064233580473065,16.542898219599394,7.699643990268075,0.0491241525438868,9.478247534173967,16.835108568988062,18.378257524654124,10.011852384234743,14.564394358533601,7.172089089499805,13.667747846445092,13.276733436141853,7.29213528589197,2.0595313095207812,0.6901337652723472,5.022454437056401,4.376050183740978,3.0553446350310454,12.94617335653578,0.6394313770869653,15.956613822781192,10.552426837859654,14.227657576953243,0.7075456735472807,12.87543247497467,16.64644969064196,15.22493128963411,4.357587207187814,14.303100986976638,15.284413095355692,12.904402144364937,16.467693332571688,15.84307776989359,12.715843773585496,17.565202233910746,13.580303288375472,13.876348747235436,12.646289657887188,10.175134821353549,4.063689702738618,5.5803699519556815,19.5029352490717,3.293794812331594,10.000119813597328,8.224597027833337,10.180900673785569,17.941877222451144,16.467445014084923,7.842023391343522,14.183267140218149,9.895083306576051,8.195621835181903,2.406001986053612,2.5779538272649383,12.929963661453701,7.1465841055622015,3.4757366181509264,8.03920433016402,2.995616912425638,11.513852869611423,7.058406619798805,3.5113944127322716,6.828932661190472,17.91981381018111,9.848607953072136,5.599241072532752,8.883466635936216,0.07530264447046964,12.375117077436135,16.27834566295247,16.278675331445328,17.472397804177188,17.089628526555774,13.104758238051089,9.713100620365447,3.581345531981195,3.960893179881415,16.776891060460613,12.408787051888277,8.382822472197358,12.905110092491622,1.7582765971135261,5.21481384752855,10.868140179910156,11.370661568629608,4.14029298015028,11.740849485897606,13.667692996639062,7.606495422477151,1.5320489749594257,5.891464179554409,3.854327862241136,17.571469469694545,17.523845582751584,9.0293952615292,9.82630979281575,12.717074842078366,9.054576235844834,0.4646018646878458,1.1312461111631755,13.697910593524728,6.215893419292913,18.546440394434704,9.713413129158566,10.158794616108203,6.9320981476928,19.92693720220025,1.357280724388139,15.90998595885884,12.367542583503743,0.018247212064674834,11.476018161041592,8.218932847371692,3.10431161710786,19.973358955091577,13.750678213611508,5.062476664232163,18.771235072682163,7.0427223374066195,8.733955671232017,17.32384064649887,17.413643845407325,13.383852516060486,0.5886863284860366,7.167852851051415,5.738043912415045,7.823422441612595,9.490257562325425,2.465699130466481,17.69354570235198,16.922444033799295,0.35518150566415496,18.12902131526303,3.5419549014030105,17.71892290523101,2.711927109145038,13.691891522255922,14.150534487101417,10.73401210691095,12.557935831026095,13.463133222511257,8.979761940971978,10.978650895365952,12.745240855531051,17.906550062859857,0.04455891130880296,8.038463643927848,18.07666875388353,11.529667971374803,15.072940579895967,0.7774839338568729,1.881046637374162,7.646858115042039,17.683519790604997,19.482257827575104,4.859616336624,19.26947587662625,9.697891670915869,6.210875743360926,2.01899001724565,14.620810377583272,12.577527305454375,8.815923693019286,9.952772356261143,3.5705943357785452,1.8213986313461872,6.27405756139535,13.574655087042204,7.044671793469299,10.287673621367649,12.727308551547157,11.267059795834221,6.161989053837833,4.786244526378662,7.816486067203519,16.94065990832035,14.900052446404555,18.30459476307558,17.320642236938347,17.325843820650107,2.254872197064617,17.00748859434901,7.302282333174146,13.397477376404044,18.602691135436622,9.8244642635773,13.687263025954056,4.422490919783857,4.402549085821663,7.579127093514173,8.048145305585388,16.841056809137154,15.558132771941121,19.124629525373095,0.475037084252965,8.574021331233702,15.941871678233998,1.5901448573973065,15.236247072869244,13.87922844947736,12.753349586253107,7.940785293016388,18.784796443351844,16.037069719559547,19.335294893804793,17.443641213381543,1.0128210819921746,5.8578172045827825,5.493503465431848,17.532230577363144,19.167133631664477,9.887850895952415,5.898802742452931,8.458716900930327,2.9781191468335244,7.567241736394088,11.693328639503303,11.341992576209252,2.1081130493678346,18.407460314278957,4.421748512324464,4.868967242178859,4.708309435848159,4.284614927104893,1.1909378038196472,1.3481122311950466,7.083785661160249,5.003526705643018,9.115299417949036,8.212390713243828,14.87753258411081,8.978219903720328,4.0376679013329,1.4831722470879782,9.323896724878459,3.16983956102999,0.15332301772608137,7.377871633560638,8.02197873092049,9.059440637600332,1.8053105743757047,2.8110260544927357,12.610196051231654,13.231968970160661,8.906772623930493,13.132824148370347,17.939467721560128,11.141852518543418,0.12724484766882593,9.726916870533927,17.32102093859206,8.675619057273574,14.361676542517285,14.703106148683172,15.583445473285797,9.826940039932248,16.33917359244124,7.570916947445201,8.119701520652796,16.428780884270754,9.75112700975398,14.356127768190689,10.07365710490452,8.326083784293278,19.838314436774258,15.94827743266233,10.379385049251999,19.20433555369275,10.245700015428882,8.046304403250929,7.049925439493179,13.416842693895973,4.2304299689757885,13.250930988972613,18.70107651436877,11.554569080486452,8.330469124620059,10.46647881295173,0.941358991749004,15.803030383667176,0.116301004227366,4.3699587479317215,3.3459881666336333,2.752280833115859,10.461540445016153,12.206019369564064,11.480658803143747,15.49801182774691,9.468579878464887,14.602448292677526,15.58580653179427,4.850055650053919,19.85624757450021,19.120822722557307,12.48424222768795,16.710185684001935,13.766053385321818,18.137048737758818,6.90329755244218,6.603886284016194,14.90575117102427,1.566222319454198,8.945695054659053,4.76568002396442,8.583761589033877,10.14687224666238,17.76693340956424,7.244930860252259,7.36170437624049,11.369636221901494,18.135747499900987,1.1423058725247826,12.92636698789841,16.128594677765243,0.4977633666790915,2.77719724407393,13.030720597785548,19.019712836750706,6.528082912875122,15.463158008117311,4.868470614628402,12.851801680995361,10.059378545207988,11.279540501648665,4.5016637406572935,9.446027791106474,18.97136809164024,7.320953902376313,14.099186702131327,2.2714414904385594,10.999421730627343,19.92692725617763,11.705356914048913,3.1370466802628716,17.42940963654291,9.861032127365865,8.661670312427052,16.604570598007456,9.108271805139413,5.369488768856976,19.425222515607253,15.740134664706078,3.307012108592824,13.482895310790761,16.50245874615132,6.309807564089165,16.73806944065106,5.470885734094426,5.554328275761091,13.444676427003103,13.940930973644562,0.6779690053436349,6.168895585072667,5.023668880814984,14.79504304841145,8.446467554696028,18.339285344879134,15.01893530300146,9.523095099131421,16.306267404677772,8.509194789176533,12.035000533250336,1.0907323550580772,13.932820758276968,14.719239342501837,6.722643390837337,18.9419016946391,5.308841357799827,1.7213257261215542,2.359832775891708,5.031162462347827,0.4172485928051817,9.220345456064472,12.138226414212587,12.840766459656493,13.144998802833857,11.132705380675239,0.5425599952210414,19.985345080224107,4.07195942646164],"mu":[0.9516484867833934,0.35786523035855033,0.6670266243243321,0.5778565064674879,0.2217968424415382,0.8526626069204923,0.8104748278323655,0.684601635148312,0.39586568524894106,0.8369897785258817,0.6337758786349093,0.8514480690289168,0.89241523696782,0.8485518125200624,0.9481936541058313,0.6626983398785888,0.15592966997682156,0.7834506960285323,0.6132050185795874,0.046502932663245344,0.7308610426913067,0.8905393211561012,0.32575655917536506,0.6620893793166129,0.20801079028206382,0.3901240735413034,0.07709168246274523,0.40022427145420836,0.9818947799640874,0.4249438069963076,0.8305689364557822,0.8001606719838172,0.715905763800694,0.446330055705469,0.8940639620498909,0.9753745389832487,0.1011133107753015,0.5561864045041058,0.21656709302704824,0.11734358053753535,0.3910775382186644,0.8228778613347902,0.6890378301543665,0.5319529121195017,0.7300285835061522,0.5144526396483571,0.8499533894410409,0.4794485738034011,0.33906062087275024,0.26954639434060224,0.13744213538659245,0.31787316010949684,0.8360654989071219,0.8726636577182876,0.7798234838471716,0.9164851902211169,0.793675190917623,0.27646184006208974,0.5380456445905419,0.6183164008713797,0.7580544646012859,0.5115881848748338,0.1700021508596281,0.38822794909151415,0.6435056877685885,0.08234529178684746,0.7901885222048124,0.7793987081309568,0.31710489027139244,0.6140003640024192,0.28324658061935026,0.2186101871926336,0.8426245220633615,0.2824319365804715,0.8477662163924049,0.34622240324373044,0.8289528500347709,0.7629461541813463,0.2165365460925579,0.462435716792442,0.28963245400928095,0.1138851379103274,0.48788364987121313,0.7796535878637545,0.6012009876933717,0.597522292622173,0.4802065397221076,0.5848068349495494,0.2583773004780989,0.9169028588221593,0.2148991072085118,0.033146690010169344,0.29310015958297764,0.8729053674505338,0.008603218538371094,0.19322908722405874,0.5517991214021609,0.15996830084904934,0.8763051214796551,0.8072709784391272,0.6238601226035914,0.5686085490884059,0.2577521331841055,0.4093524410046083,0.6757287146225059,0.917597234583768,0.24794013813838678,0.5861226004966158,0.37864619428836654,0.5550727056511096,0.21102898450962337,0.09562259871974699,0.9424482541565731,0.756976474024986,0.774081321696015,0.0018378483451593208,0.6712997417199695,0.9746324807959654,0.3289169421954059,0.2269201207920939,0.3531133037567693,0.6900265088008435,0.7299277230232906,0.5471113219909218,0.435628245481658,0.6277855676429838,0.3757450422440072,0.34909786324758296,0.5325369648396827,0.88200165811284,0.6802660948239565,0.05561732542913478,0.054685688791706655,0.36316443535343,0.06520787341138146,0.2740594562285197,0.612568151884981,0.8167122162773344,0.4418537132065421,0.8458925382345677,0.4690585013590076,0.8996628160990014,0.287719314392092,0.7860482220405456,0.4226479895345232,0.5048038839166031,0.3034519901456627,0.527735833700528,0.04240422043289782,0.8190961296510424,0.2778280651195446,0.18941094538238534,0.35552620810834457,0.8352961355636137,0.11296342774057067,0.2314330113206471,0.36303426587132037,0.2709373381857634,0.23964611571643424,0.009147943588800667,0.9529522158603372,0.41442007221423816,0.6773155469199337,0.19989773753694196,0.15523753212445812,0.7157929869850435,0.9596591407449835,0.21999190832402937,0.3383440993174749,0.2104261903138922,0.2259071742933656,0.06070548181152935,0.5859740543719343,0.27075711293449256,0.1460696127074943,0.013799168030197206,0.2251500192793734,0.4523218922786649,0.9344032633502795,0.22567033538821857,0.43564345009925276,0.3009777120937398,0.8309443943559909,0.7843268085962327,0.389182552287328,0.5477796570745919,0.6712569492564522,0.969579009209731,0.8087711057833211,0.0035791882461559954,0.061822984487891475,0.2973725551180868,0.4010706933989996,0.9581151683732514,0.7224820519144584,0.7501202821085442,0.6766171866487478,0.7365707181771277,0.4646681355766398,0.5130089071060049,0.7977681399210184,0.7001260700987653,0.8366044623458013,0.07287592291002598,0.7710912315952416,0.7604253080793897,0.19735468978017034,0.34177701316092457,0.8546735486232799,0.2890501673433259,0.8870066266017966,0.04670023805554524,0.13577843199154205,0.7486627330923787,0.3410507028245522,0.019486808260041455,0.25929898532101525,0.474555298269431,0.029259940639861703,0.35837654513166317,0.13431770876401727,0.12665484671972838,0.6282862167450274,0.7876131389559793,0.12448854604171045,0.7386319974898203,0.6167860005772261,0.8947877684997163,0.469954373816279,0.16089694034189628,0.07526264734909671,0.10570265831795522,0.9715627158776439,0.056637575284963715,0.17748334586389558,0.09070874405887785,0.1318445746876804,0.38376938958016993,0.7373685983614924,0.2419946131153925,0.9392756668885431,0.7774546655741994,0.7765106189605899,0.17117994063209108,0.9122127698399083,0.09294384362395403,0.833276857963648,0.4326528245430912,0.5777265573408128,0.6593387486002857,0.8236089887602385,0.003288507978996824,0.11223069810905728,0.37434851514116363,0.5799344901322201,0.4304063502901081,0.533840840303125,0.7700438261473006,0.8522041606468005,0.984412572231959,0.8037220470283908,0.7876479871282478,0.4783980126055656,0.29795537187055143,0.5214630291444964,0.45181975514263817,0.38181708634648603,0.12027958933407668,0.25088241677214573,0.9095606606761506,0.47948993832095566,0.056961787777091155,0.029090127460478232,0.6323885683306254,0.01651977691223072,0.9650079632228143,0.3618740148309665,0.03881554371310969,0.03105006723825321,0.547095515676689,0.03714657478638572,0.29237012977152155,0.2732180485748126,0.2469408133577864,0.2643188225112456,0.5726111033089718,0.41115757134762365,0.13114707084441402,0.15888325148314308,0.24529024839030455,0.8187062992671399,0.8140774986297525,0.7453578831131218,0.7168956065959711,0.37454206018259817,0.9133100898426487,0.8131427392650312,0.12201930797611671,0.7269245926112151,0.975369437441121,0.49182577960093865,0.05456249201250629,0.3585072075351068,0.44162169220067815,0.8097108292607191,0.3734163683980931,0.6094866845281934,0.008003543962721293,0.479925203432942,0.5922097094197574,0.25587128861426267,0.85573393564446,0.3633514149382966,0.3112915443147031,0.13487548319269438,0.46793170276734974,0.43340642716425126,0.7979006348231366,0.0363761293124607,0.6472129540293443,0.3188294036503687,0.6317936772201724,0.1661395238154877,0.2649852807329476,0.8820858731040069,0.37687857294353,0.01129444731615492,0.41929200014087753,0.5917866961588163,0.1601358075006023,0.3429703858808377,0.014064190982761238,0.5744247985169082,0.2135789925490601,0.7015300591124622,0.18386954017610324,0.1813223966857802,0.6492612154172499,0.012138895061631017,0.4007112768540302,0.1070587640657068,0.17772658594456514,0.540922576542997,0.3952615215201669,0.636604525157227,0.48464151462699534,0.36946959532845014,0.296201387273914,0.17545281627725773,0.06537160559520805,0.48319080095173894,0.5955168417256238,0.5377423063914715,0.8900585057021029,0.0672701455233562,0.8237709240012216,0.46446299540503877,0.014262372108955423,0.22690772058319308,0.692207516517775,0.36013766220314136,0.9072493372989534,0.39764418831474546,0.8836589621720465,0.273585431782539,0.5856009735233134,0.19788164045118406,0.8844068298934902,0.8394660580599917,0.7752512267063412,0.13562488269966666,0.7743202127691657,0.18415641125956572,0.5274565363900974,0.185445248299414,0.8262415664870828,0.2371511121394585,0.0004728473042696635,0.2852326778679437,0.626146187896446,0.20514003857077379,0.3815967329860237,0.21777063511288275,0.25680091010940376,0.6584677109635506,0.8177023687215406,0.36867382792734293,0.24273285848999615,0.9190038238356317,0.9067649730394376,0.4824849582106263,0.8234179331372349,0.14401144072107153,0.6249918225878046,0.9899030979410997,0.01404427056097135,0.625786213071309,0.7631111107654152,0.4637594339415265,0.7143298099796818,0.6610271474487381,0.5578959136142643,0.6232257653278712,0.8694107592523836,0.9159855210468786,0.20521088020970946,0.14846714208895628,0.550896676070898,0.3617782245735264,0.835300468796349,0.5650703943152673,0.5061675748955774,0.29248204506848263,0.7607533964195554,0.5659906368333694,0.0865521206358828,0.15602644513807107,0.3644787172659836,0.5195726015500044,0.9432389499168727,0.715924610121212,0.15567137381107998,0.3716422759403073,0.6134247702613871,0.9694305785865762,0.05749266997538216,0.46692124385984424,0.2975162824109425,0.6352277064757681,0.06672637978195106,0.15816487069299434,0.12747912776487658,0.3949971000502752,0.35611103466556626,0.5600052177459187,0.31184571515056425,0.6843735359400174,0.3563517539517529,0.4298673905617105,0.6913442533915013,0.5351856850010681,0.35582146990165153,0.9904866756727966,0.7372898360538442,0.720504815556614,0.6109314474647964,0.9075535635308429,0.627060796279854,0.33040633159277566,0.18382208304145875,0.8105698720961896,0.3744517215096934,0.8680006058180787,0.7762071797731278,0.40889463316830676,0.4239370743320545,0.6737967699126097,0.029874781161058683,0.2090483769457403,0.9336570426688311,0.005909378847781754,0.8461808575816105,0.8919848358086933,0.3975310619351893,0.5651403102192645,0.49082453922071645,0.805968135374294,0.7715596441468267,0.8206157347939684,0.6182915240234306,0.17677673655077975,0.03928321431661019,0.8467425079030806,0.7199835963222054,0.7935310416191443,0.03999979211192284,0.6540831699804059,0.9279958395228403,0.4235074504459382,0.7108659034689733,0.010686828842502383,0.7928122836332117,0.9252998115170983,0.594334605803525,0.7145588090836645,0.6872193936853306,0.5780905940428085,0.5734353787569539,0.14048557361782565,0.27603380021878987,0.025085387275211923,0.7228611481628879,0.5454099262037879,0.42234799502351117,0.21802928092758211,0.941390790441184,0.15710891226483925,0.4899045195508458,0.9350886540447589,0.7085343857620594,0.30066152642165256,0.9115336453628893,0.9602231959825471,0.3760750989151507,0.8410148804192823,0.627044710324572,0.6889745313933962,0.0330690239140119,0.5769038784887677,0.3814137601643832,0.7646833796399748,0.13623278601181088,0.750404941607139,0.47472079483522145,0.2535040365601462,0.06692331398474938,0.6085469742133693,0.23061754168824344,0.18263221269256036,0.14548423188117887,0.2598289620706751,0.21719536990086863,0.09491646841176271,0.22837294669839237,0.6226327155331262,0.3616386469133668,0.37169283207908843,0.008599919683532908,0.767673989591239,0.9373028384432533,0.9896913744947815,0.930579837830739,0.1607804596141762,0.4257366148380959,0.24615478483730202,0.9802414664235743,0.9498612051563524,0.9250255395032654,0.042513924604838715,0.12227308027625239,0.5545328112455865,0.32046960044762884,0.2528713170375778,0.3878724578566455,0.8020020153806651,0.645506976463502,0.3725873498380634,0.47066958676810455,0.164946180633754,0.3616535741470097,0.23408257490891393,0.45483339619578467,0.4134663842590913,0.46425957401775153,0.4675470457973363,0.053408888162777224,0.31616123244054983,0.3118603356215466,0.9369589998696184,0.765872899202863,0.7876683605837671,0.2662155464555225,0.9846907870193198,0.4457930724030672,0.8486269112508997,0.8894634797430934,0.7660556058371579,0.7982286074044913,0.9155409629330018,0.6066180256199452,0.07934214325618583,0.9029903273441862,0.09280385732304186,0.5049804059178533,0.9122006575803927,0.8020038927807744,0.5026546426118494,0.84440629963011,0.3054276376154217,0.048322439357153746,0.6708818661245024,0.4349256549789986,0.2601518088113346,0.36245585667320346,0.9231701964893435,0.7904342838290088,0.5314202500813006,0.1384108879505983,0.11256994330904058,0.4907492774258062,0.43850116129002625,0.9178231522923075,0.5488269442747673,0.896686559912522,0.7317412728760861,0.3220124810220959,0.6589106748187206,0.11166038777176657,0.28576564425909834,0.7459996121374131,0.2283379876330851,0.27743601063829515,0.4352360882859718,0.6591320712403679,0.15038102523204167,0.4349133531788778,0.7319683797871905,0.24744893924200007,0.7225917696728061,0.9166360185220068,0.9015575485602163,0.7212061930203317,0.9119665608078049,0.860405700652761,0.008596655481468263,0.889422264415769,0.41045299730433893,0.23435654238670844,0.7579594859875594,0.004967922358510846,0.6444540213684964,0.9316521654067902,0.2015542812615918,0.8331748612638123,0.9375846230267109,0.8221450353548081,0.7812999001838778,0.37820562426422843,0.45411733299648693,0.5367905764173129,0.8422295744363433,0.7400995071102545,0.6981499748130118,0.9763277648396531,0.660215365186122,0.6093452716648908,0.3796823073884239,0.8295285888388402,0.6614442135906862,0.519637074328571,0.8618185323637335,0.7613960457284732,0.9463270113350983,0.36274285049267174,0.5908245428898589,0.3047790431487192,0.8455667108271461,0.49710069036817783,0.9585123499746919,0.13054004663866792,0.3282374486338566,0.48371666264886937,0.944564910643116,0.6378291276953687,0.1546202841362978,0.15856333345513485,0.41886762255947985,0.5372476417620073,0.3998655011349401,0.7852969266858314,0.23771883295342167,0.5177990838831863,0.01769611538101401,0.3154421372651808,0.05972355764640436,0.7055902507866465,0.38350803033830383,0.2823128724809112,0.6786576823898618,0.3601733590456657,0.24871148162824053,0.6192539663130285,0.2493834005560014,0.17054816641667947,0.9104813811746,0.40226870603795395,0.33814407863386875,0.31847299363377024,0.46487563683867283,0.46469870755744225,0.9344353072342559,0.9912143899219519,0.35287132112777075,0.3992984052885986,0.3956666660267876,0.5890426890321347,0.025421748866741423,0.023514559553572845,0.24734428923063456,0.3502995660372774,0.8808008309462314,0.04464042525424383,0.2626632221066898,0.6912508605334728,0.4985127133317593,0.8815562011505449,0.9429021657290948,0.43820708756620985,0.09292644446383647,0.39877689588689913,0.8752761909571425,0.6685532877900495,0.19944973849977976,0.4790444799973075,0.8319535614411744,0.8827531351982651,0.7084969322607053,0.24177766353490515,0.49816070389293854,0.15119284935742927,0.7185493978494111,0.8289489606538625,0.35635927199915707,0.8577287971875709,0.35792298221382834,0.4481111195675871,0.05940805776634184,0.16168490267763413,0.7520916027513767,0.5479302356877305,0.701653780045097,0.1650780842390791,0.0917024636672783,0.6819450300005236,0.22528064601048525,0.7907179638629951,0.5600556781165735,0.12217431776518373,0.08035262252434738,0.36713080001717535,0.03318430684586704,0.560485742382687,0.07971470946476167,0.2626823665607647,0.23704139404270763,0.08439234910866733,0.8767983842114873,0.2601502324830345,0.3187450120625053,0.7826108223383135,0.4738833419763049,0.04968815642080493,0.20600920665753897,0.6272897599687564,0.052617750124143825,0.423061413672132,0.34467460103190994,0.7853502932888143,0.6521354489327662,0.34059570166500897,0.9442525720128359,0.051725503363365455,0.7322352334946358,0.7981918170863647,0.9892084131867502,0.29343840238426555,0.41372484191553727,0.40891293380749927,0.7557215299045663,0.33011614306589476,0.875075729872874,0.512861338436519,0.9944310867056168,0.5688989894310297,0.5122908186421666,0.4920440694476804,0.19902019800550774,0.010990541144478172,0.581592334182897,0.6882065257511949,0.2660602800629379,0.8183189980560148,0.5646866895806386,0.601299272179767,0.8463349778611293,0.9006976520166934,0.585058015586629,0.239369881642026,0.6233606255564252,0.9839467004767142,0.34408689297444206,0.6226249304074676,0.1530166597063336,0.8173611591482062,0.7300750175096726,0.9881805478974932,0.31451302589714203,0.6226244727311581,0.2772953723247813,0.5729522156022175,0.7245049080752293,0.890650055809598,0.30462750372377134,0.6425673061847343,0.6754550621208708,0.45107982628215515,0.9535208386566529,0.6514331651715983,0.4721238170009827,0.437765132641057,0.372535010354035,0.5550870612950933,0.156127958257821,0.8907296541925187,0.9805514087900329,0.98081098640619,0.6797931193348727,0.1295956127886928,0.5324168331378041,0.5244943754105953,0.6164756465530565,0.148853581913309,0.1388817863068974,0.33752164836745324,0.15932458571774433,0.21171942887492534,0.6280286715918559,0.5688304707278011,0.8948893544790621,0.2076878026540192,0.3686269156577753,0.7394829133509095,0.8867778567435041,0.3603751572434095,0.35970134410460175,0.3822832408897425,0.46270944859034957,0.5097218369982426,0.06286086977034655,0.007484728423230669,0.6442183020204157,0.1285860509011012,0.11979965789794389,0.6849972683869929,0.2594148450310918,0.7556040825934534,0.05959902011150775,0.2006059746957889,0.1949063204104866,0.671367493952221,0.39726308505889296,0.8204025878179404,0.36382950848221385,0.30810581488429145,0.7129966844080371,0.6855702319990995,0.6163763138073131,0.493363572973085,0.6254529577652852,0.22873406967094345,0.9292013958830541,0.913759910953593,0.059506826813915614,0.3360708970066488,0.49172175538637775,0.43767735082080983,0.3795527984406457,0.9166137108749193,0.7554808167027831,0.6834418776889031,0.20747122601338286,0.28915374866982124,0.8824738091243807,0.859099068986249,0.3506152440082104,0.7252853729646858,0.7378398660297791,0.001033709713512243,0.5028656303452159,0.9609093309460173,0.8222097451761963,0.6265495500854814,0.5214298624387288,0.3861209739588525,0.9333563768138062,0.1210099641015625,0.9391623478442697,0.06559869739563529,0.9714974302636044,0.9404008462859268,0.4109543862275278,0.36192622703720345,0.4105997025454069,0.303587093429285,0.2521455200294094,0.6107604477926274,0.401035581303824,0.8145945145866391,0.8635927564335859,0.3259822335972966,0.44121765017117687,0.41269505810624163,0.7456896229468646,0.8525957905263228,0.7502237359153328,0.980233503272151,0.593238576613244,0.48413945151549687,0.12761875966080694,0.6516764277879745,0.6011304995655085,0.6268759159642101,0.3854206164448939,0.5858569887332665,0.5930987714020994,0.08006880082033185,0.8435984241353613,0.39901805172444615,0.7251483482757941,0.30742816558293895,0.8184571018080711,0.37981941313097844,0.15379260191504485,0.3740172708666605,0.9279642751898705,0.7154056760430045,0.12503194831769915,0.938167055427932,0.3693163751118127,0.956785208650131,0.4911948715352865,0.2887532031650879,0.3914743520310675,0.1649521719258895,0.3542045391359616,0.8046413603564537,0.8249142349752259,0.10813996131945935,0.47840551353831606,0.8406728597512236,0.7030342703109165,0.9498942969377384,0.21704385735136444,0.6812104165234161,0.18663945997598064,0.8159047515436102,0.48925696165041943,0.04459283814461834,0.46039235909384124,0.453916154342223,0.011830141994832344,0.5828188589294514,0.0993889735253739,0.3657112736833352,0.706356035695459,0.012798355654565885,0.49162699358484474,0.24072363019944,0.9653001343927241,0.9192830367709337,0.8575145614877255,0.6188073481994654,0.35952062088825687,0.8287917290485947,0.8039884508293129,0.6215438469421655,0.6682424806659497,0.31928046625797335,0.5549573085005428,0.20290931328830686,0.7013572462014046,0.21203806926746882,0.05181391008655645,0.39631523180785,0.3087846991789638,0.8775833178920007,0.6602225941474893,0.45457684088012984,0.09900721553832281,0.3661014417770918,0.006207584568333369,0.49101716280188956,0.9399861459028689,0.8387192935088066,0.33482462648455535,0.22424891769151967,0.33769736885340196,0.4198661273064537,0.6847055944170437,0.45143294303572334,0.023353374753029454,0.7949590394407429,0.23331252480962683,0.8616435604226971,0.35726328343848746,0.4344295502458648,0.6250412398187772,0.8673413880313874,0.5477427433511115,0.12273551330831456,0.908948035474463,0.22063484271806733,0.07122916781030164,0.5093668214294684,0.7310131399946616,0.11481492220055722,0.07186899048013662,0.8590776043816233,0.22293358623947257,0.77995497309135]}
},{}],128:[function(require,module,exports){
module.exports={"sigma":[2.1817865306024418,2.556649268819479,4.646473406964061,3.0423699633044112,3.200705036158915,1.0892221925745527,2.421998954421313,4.791930127590245,4.631569389030128,2.4751711628228055,1.241715229164787,1.1006850395961076,0.9438424742236207,3.6448424367756993,0.9041862948264234,0.72812597017201,0.958498085582512,4.0338244825300515,4.5079458601798175,1.3966195819583493,1.9139067826786982,2.9042714943695502,2.927174863993778,0.5356165636317012,0.5053137519247941,3.519515402217437,3.0875335168920848,1.6728061432193253,3.4959607841956295,4.53515722329114,4.867287499239143,2.670552223629209,2.3870856669629203,1.3596939085906912,1.951116862479494,2.0484830129480534,4.764466676906527,4.850617671732966,4.572727569088507,2.2692382128252775,3.9603786740326696,3.41559546357878,4.992680941947745,3.9890147243166743,1.6577686744902687,2.2490841656797844,1.0919974629331153,4.880088196218102,1.59150463944711,2.361768233206546,1.917709669935428,2.9494666964941896,4.808879248966925,4.536527930879806,0.55612441901701,3.02978644094941,0.56992846931886,2.2259937962828555,0.9428093997798515,1.1211344924382505,4.691534427614781,0.38240165206115506,4.361269309701683,0.48325149097602105,3.7790474755837353,4.910686339962355,3.890664128108888,1.33332709486791,1.9128100206258858,3.373053084034021,2.0252339434595976,2.7687644273324166,0.4777511887601149,3.0470333838424155,1.787664043198205,1.2214872366198704,3.4115212210494974,0.2644145421054811,2.224678227995142,2.0730342665970625,4.89164986927509,0.358600687226045,3.5439749990046954,0.8948241562526105,2.311883760613388,3.909656518267007,2.234730016420655,4.778941689909464,3.8009802402474833,4.671688008411038,2.118427887991412,3.6863011615672594,3.6532734569640555,1.3779541035016896,2.1743511558899287,3.242938754689445,0.19962305877489483,1.75446363191885,2.113138321878175,1.9427214269495907,3.841055394143844,4.329838877323301,3.910209598316794,4.707905224812937,4.744202379411274,4.100005919549376,1.3328280535894887,4.930950369126391,4.177861840034084,1.9587605512118056,2.927114565534529,3.7562447510280705,4.491696389336887,3.8803762446995127,1.847734579473691,1.0038028791108955,1.094615532705151,4.964205144882772,0.6269042900621091,3.8318210998023563,2.7136173805877206,4.153663146174008,3.089910815423843,0.929250866245811,4.922913428271696,0.41431983014765805,4.199397755702018,0.42574694046879524,2.3182771180055695,2.215052103298122,3.6187103399331044,3.133669952772701,0.17159963483205587,2.4033973148733723,3.9897269257000465,1.6770668454135829,2.3187373373971276,3.7702478702161213,1.6449504592954967,3.4366497955989384,4.817475577109617,3.6365500249098757,2.6034581774976786,4.614641035626697,2.699209331393455,2.984818584693809,2.3361440068818884,4.845494495171775,0.17053416013638745,4.249936259095754,2.933014680651312,4.112720818529729,0.34284045241158356,0.1183703078513787,3.418663510858939,0.3450231282570837,1.254139960912446,4.654282318303479,0.1808341462312657,0.3522869695407149,2.8383165384745466,2.798140773412804,0.4542385261718507,4.670478094690282,4.606547670757547,3.301263966980393,4.071247149977086,2.5546249789187803,1.6700843220207318,1.212570800486441,0.6051561042705089,1.010832938300138,2.3097423464870106,0.7401510434568548,4.108522864540284,1.2711405148403987,4.246927917793308,3.0681168012788707,0.4155003555424053,0.12315267517971074,0.9500411426131927,0.32535455972298455,0.7443042238033526,0.5363839932380288,4.4201314477844855,4.78095619287441,3.215069093618408,3.42117030971521,0.8149623632195224,1.4776683500411547,1.51407696592059,0.41525051797984824,1.126066221655907,4.028481456432072,0.2849439143686072,4.993761871792058,0.10197422209725526,1.9868885000904979,2.640462203202849,3.6493449497713693,3.5325936965382043,3.289283184558358,0.040903700843654134,3.625319135131128,4.380281717520969,0.9569423827969459,1.9574137856117746,0.7775402681044596,0.3575415603843235,4.804559445016507,3.0538530521101714,1.7123065559932482,1.616131634432626,2.4419682961456166,4.099879895058441,3.6496472630938204,2.0433509839823327,0.5494017070612267,1.7286195228017276,1.1306208330426049,4.124441432158857,3.2984050806879384,3.7132523677171303,4.898718142927628,3.467135706986179,4.649236686840553,4.2219239400404565,0.6345106387379651,4.768540187267098,3.9083157898699508,4.277434895826837,3.9987268450570435,0.5922418437094912,1.6074205993074142,4.613834566769812,4.253972429459135,0.9058145300884568,3.291781395235891,2.3118981747841785,3.901434719051279,4.124340437852841,2.249557651561126,0.0568399555167276,3.269391806682634,4.446515595652164,1.057141669834547,2.34943545254494,4.349048429964207,4.324022661668528,2.6609713378220734,0.24021388509140595,1.5397608270410157,0.0970739513450225,3.1059094106451433,1.1140065501153507,1.556085291494964,4.68185696599264,3.7915814201820774,3.060346729254201,0.8539588965219691,1.4306662966949746,4.042159794365123,3.925456648232417,2.2342415675546556,1.3627831372967525,1.1820873525644293,1.8906356001475821,4.678537957061426,0.0878491687195404,2.364558166125883,0.016116741047714767,4.54422530595664,2.687253376590497,1.3802603258440282,1.5805136632156802,2.0556525684668223,3.1550445714119157,1.688559949269136,0.5396871730919284,4.418970857280091,1.5006588746413563,1.9360593194271503,1.7032044618855524,2.5886032060506423,3.1087375057762765,0.9926419857095614,1.5422628240877134,4.184614113703028,1.476331573245283,4.117754654888916,1.8267203420912592,1.037009997246563,4.6855405437832385,1.4938442247525208,0.7384366706427314,4.5832379363305495,0.02254364737850567,3.8766382640882058,1.8741625238374027,2.063468374340559,1.5392010965882486,4.897600431515773,4.499587869746398,1.091643124659969,2.552052900822337,2.0484053815906855,0.523911819847459,4.721712001477835,4.949463431323499,3.6686114514911705,4.802039664335239,0.604184531821631,1.6143131490958307,4.34641637816783,1.163862278059269,2.8844076102334295,0.817223948663256,4.763879894026224,1.6787462233491346,3.8042274021038236,0.49152470233663426,3.5283329692055663,3.929640012377501,1.6443261815044907,2.910338496614888,2.4184661014791176,3.205484815274109,4.377556543780666,4.962616298801263,0.9887650291720951,1.5888024972045978,4.066437357478707,4.576666845831849,4.40109742486559,1.2150868395329428,3.1647230250671465,0.8632124152373233,4.740035914674917,3.9467519350842615,1.8968524501698636,3.8732707548962306,4.612097257118231,4.056437134121516,2.6800670800925,2.369981595359371,3.835892459650828,0.13155276968567886,1.0091834824976642,0.26039274267336765,2.8714353154729846,4.585312881194148,4.105975044310193,0.981141714471776,2.593291523621728,4.382749160569242,0.24680554643528696,2.0645707418457304,2.1578383693542316,1.8701101429817168,2.6244200760692493,4.812488489581184,0.38008756568743474,3.6591329879898717,2.8558570167728448,0.16747104417539904,3.754027698160727,0.23283287639862982,2.8940491607258845,2.487751572143184,4.35554484016642,1.691130928352561,2.445195291776958,2.5286222005606005,0.635516820830917,3.8441945872248784,1.889800667901631,1.653411021492317,3.690240771567175,2.57882260472254,0.572070269456969,2.2360266305273724,2.581456542657846,3.0160653300868487,1.913718787450015,3.659340237357368,1.4610066549113998,3.41576734055842,0.49407263411029745,2.5789080852990445,0.2527086567706116,0.7373819451230368,0.4109367969112354,1.5291737063614563,4.478302446183347,1.8812701182998937,4.043261220409297,2.1346681185515126,4.999066747472044,0.05992463446658047,3.0848831286421396,4.436526325434863,0.8619822277011624,3.681464519891672,0.04192868554178997,0.1606606503881569,0.8694475855475847,2.492524597644773,2.6259160801831194,4.992733938160971,4.436353024409771,0.45605303124235275,2.388316365258639,4.324748827667115,3.608809225401004,4.881736012595047,0.7033358781766108,4.764663294078316,2.36819140828173,0.6455630108575283,3.8387145199187342,2.797309309377659,0.5490435919292502,0.8906662211247007,1.197199686419601,0.5151953719679547,2.751093531086428,0.5290707303592224,0.4364293413456177,4.215980723248945,2.672684802571025,4.595591025905305,2.8430119338693913,3.0506878458127398,0.6068493886723236,4.553201400790572,4.023471818883584,4.441909569527548,2.627992746260237,2.743114197862316,0.6261266143155708,0.0031180393960372754,0.45063077754917136,3.529192678227142,2.0364359289017386,2.9248239987733307,0.5756535245877636,3.1516331935203823,1.3509065658702757,1.785029658245889,1.755474160523831,3.3763316073512595,3.304530798936028,1.625970727034537,1.9402715318604902,3.832762081375848,1.8633487291679107,4.310292727861888,0.324358824719283,1.9283004017278704,0.4122487135787434,0.5657736841143512,1.3711471046292045,4.131073920455345,1.0747774805852217,1.81881971430905,1.7002114966570536,0.5906965248675711,3.291365146232504,4.511898655757768,2.5827536764509116,1.1751172556539902,0.3709201537447637,4.228257603060226,3.018968835179363,2.2981856008556587,2.174454277424024,2.0247181424016905,2.254544356067769,4.330466668019249,2.0047243745215337,3.1899064816256972,3.957890961897015,1.4722078115644055,4.191641752790062,4.171363393836378,1.650344813251522,3.672211310073968,4.746717960775689,2.15741240743475,3.2370953665426185,2.263803375448439,2.9177678009896524,3.984039990861449,3.576839628695031,0.9615773707237596,0.7180045379842803,3.464514844150407,3.1534677199721517,1.9426446620334892,4.133382513315411,4.215576122605435,0.723278466786762,3.3845986918503232,0.9820637645238628,2.60123376260072,1.5883895925868563,3.904160347072967,3.669313176093485,2.550272462515668,3.9096851426375756,3.112612282301541,3.2157116628936,1.755101023173019,0.08698623604728617,4.569810993046469,3.5720540392746,0.9295216382616989,1.459797621889497,4.460699133432188,2.416297203649287,0.45100801799667356,4.63271873507934,2.018286014105861,3.3346639422563684,0.8735116842837509,0.5532427516013749,2.3042289926468396,3.329248372862436,0.34800175455367066,0.7728837211502726,0.8778164694266466,0.2459007707596672,2.560955751653103,1.7811439486025715,4.159869490671911,3.4991228488924584,1.8422876495283713,0.24972907183957282,4.688558401035508,4.32464011487107,3.989512105037254,4.730244842349487,3.717309297720867,4.945735918613819,3.2138469493020336,2.5091472728903916,2.3865432425086244,3.16725470216514,2.425388427740054,4.560132478832104,0.3269844084371909,3.237901720724048,4.35069932358865,3.4835256740577925,1.9233142258162528,3.3856109064513475,1.418705068424413,1.5407515428036778,3.1170387516579288,4.308645754663058,4.798009138499077,2.253132147626189,2.42705374963061,0.8070764836186806,1.1423049792831197,1.8779910591183169,3.8165782613499024,2.638770028596167,4.783847072134187,4.22313052415605,1.7946364049907093,4.085083229178399,0.8470134118480377,4.1364508572943866,1.2342857023623233,4.724570004786783,3.529072561016784,2.018593770334538,3.6722421880313028,0.3188956474211413,3.327668084313463,3.4319805623756827,0.3100435450714456,1.1453017318091463,2.81905444645445,2.872782848255028,3.9113326760010247,0.7702036690313752,3.859426711721312,1.649637763788454,2.0552869061154713,3.2706146009895845,3.497601037883904,0.49188726868497623,1.3449564762989008,0.5319375593581821,4.8098096422071945,4.096927441527086,0.9738838848741393,2.8290227939069847,0.0448333902818876,2.745485573035479,1.8965862240029163,4.508763565623167,2.504614351520853,1.4059027703785831,3.1641212047832523,4.702022520554485,0.906854268941133,1.702031549224765,4.137235121295891,3.046292181663249,1.3918380118483231,2.710048067720623,4.5706608648371105,2.459009138011763,2.8152491620454345,4.008142908042669,2.4605964619511997,0.3816862819218858,2.0721834113295587,2.613247726226522,2.126198232443268,1.9488748554429147,2.2068796405476654,4.01217349973075,0.6293139665514369,1.6397054622735086,2.3127900816297595,1.5942671385960894,3.982096302826438,2.4547234527477446,4.39141576468833,0.4318849149683346,2.314740765098877,2.5214845983460776,4.0408099262261175,4.597093682709604,0.29832749778920253,0.8024398704099323,2.1266238901351597,2.913646749875205,4.5789967312479405,0.5924739581825877,3.9212063721211687,0.3935055200993842,2.511689123941819,3.1821785692134363,0.7769153312085997,1.5396698380612972,3.0256915286495225,2.608099613923336,0.6470707892341221,3.230066542014196,3.8767160461822936,4.618704271889546,0.19145707616336605,3.253065935764714,3.3452470599506254,1.9588591455861548,2.1632110966537588,4.380509582968418,1.7882801738154341,3.227233856345171,2.6942740220955184,1.3646267150918034,3.206436561447099,0.7195319568973368,3.5007192816679247,4.853737470817475,4.775599161639167,3.8196735032717255,3.3457142872824153,2.0193560514558264,3.484492639871053,2.658594246862387,0.7491552412205227,1.7273822871888178,1.0691693046705286,0.22022187277269678,0.14114220687628798,1.5896142523852919,1.801478147731691,1.3370871165350995,3.47895026354202,2.24290944325658,0.40204314998900426,1.6366685200446462,4.553769420695746,3.7889034542940268,3.3325764604856642,1.2152995636683361,2.4870628426403165,1.738274856014993,1.6367086449759871,3.841082160721039,2.118464515516474,0.4506881761960424,2.8041589133801867,3.69486980038367,3.8191982025433413,3.582468542991637,2.0142759269126453,0.9263611704355679,0.12355153418756148,1.5603329771437724,3.870324130826809,4.473996465877316,3.97386121154903,1.6761583142602943,2.5804381629797746,2.248431288359014,4.5958432776252645,3.215368838012483,2.284667795089671,2.5740537013709766,4.715128822378979,4.681218776046484,3.51106755109556,3.7481125309658383,1.5160815940618355,3.805863639292787,0.0032252949199207404,4.919447663704322,1.8629910569314656,1.186190758550113,0.41509937346649206,0.26236505972275115,4.734966474007591,2.9686978274094846,0.32566626000631205,3.823424274013983,0.595285552919006,0.9325396876769498,1.1396427335027703,3.2978616675007744,1.479349115261277,4.865472713944136,3.732351214794324,4.144817162762779,3.5068698268382645,1.6216744479833356,2.1411245121742173,4.216249042458394,0.7146225270562756,2.433140555910489,0.4241117313100107,3.429293011983482,4.716419633878841,3.018162650406533,4.928126139160984,4.011056728977508,3.802438846881863,4.4067384240816025,2.4499597663843984,0.2809868972788432,2.596288728148547,0.9321910428740565,3.9814288794172716,1.707496297905542,3.012480530959736,2.571096276677549,3.1731927855996647,2.1634028768088855,4.642084763067816,1.2363130449960835,0.6332344160287973,0.9488770712301164,4.0554384284031295,0.6472152788853214,0.25849890898274275,4.286440440463576,3.2719358757351626,3.0219278267874805,3.9488324503679992,3.769168433969081,4.548586716185338,1.942286502395727,1.4122043420486807,1.0366818163087066,2.1288762253432445,2.5812647489076515,2.061290753623214,4.562762741248907,3.0640696713324713,2.7355536740454554,2.1997266350822264,3.747637495377253,0.1413405477711982,0.35693573651189303,3.102114866414387,1.561768473755849,3.9615989777021454,4.432597699414792,4.7404532813403755,2.018195921550795,1.3964998538346118,3.7143177232613747,2.5443488481683962,4.196012508645424,0.7063434977365546,4.522371793394634,1.2260467530580665,4.841016443452241,0.30428486829202184,4.613520840762183,2.7642094025656183,2.269384653544736,0.3789672597549232,0.4993554486509433,0.8520443641849729,3.079932125999818,2.3297254282498336,4.656048636674734,1.581139847529478,3.5975344075259885,3.5572933812040928,0.44642741000854747,0.3518240193683897,1.9639891098373408,1.4084238932949533,3.2333513314827123,3.497541114394477,4.774743910570651,4.33467249197877,0.48783669015108,2.2738263979617046,2.665030450216963,2.7114539741775534,0.504017310603948,4.471423618397749,3.3195075494722692,3.8392682602949026,1.1480892785920394,3.5356693413730444,4.550656610892926,1.6785995674482812,0.8138287385776188,1.362230051993395,3.743178076193697,2.2060767534575874,2.3481790907696687,0.14941717349600037,1.7074826832400236,0.8952947178157933,3.6136822175598002,1.1443603004031866,3.90401558709668,1.030031263355049,3.942802417272968,3.9611960761461096,0.41234404314798523,4.4490635508785426,0.19986879552058467,3.149485239906664,2.3801800740323564,1.2690823373843019,3.029098405732349,4.732380188416585,1.3037299346560949,4.887642452060001,2.463123989521038,1.9783782764200597,4.706187845495073,2.750764004678692,1.873447656085111,2.9766122297964714,3.6736065791071004,2.1675183604564765,1.3681123657808636,0.5484731016707878,3.8838175172858005,0.3814129561930757,0.9313748965612134,3.2338672036582414,1.0592225894159613,4.954581485976534,1.8138780611370098,0.49655777876476126,2.983950772164814,3.0330316396389847,4.945726620864601,2.959999182245091,3.9681752081051878,4.213123649084722,4.127253533004966,4.733837929068057,3.2575198592788093,3.4360067866893007,2.195637563366075,1.1528103192325267,1.2597219039825103,1.7062743337933073,4.583614126300298,4.843293015629416,1.66652691715237,1.6893683175553298,0.9192624765463497,4.3515055410249035,1.2041236538452915,3.161778331567011,1.3408050536057436,2.6395649166905386,4.1167963276262824,3.800814587132504,0.877175118025636,4.712125004833846,4.912435810159467,4.136676398716563,2.8546181723916075,2.0762250005273186,2.3652787407800613,2.4847844559557295,1.941018380363273,0.7283332050879854,0.5411878363291778,2.194690842403956,0.3218344718342103,2.406046735264651,2.3942923856529976,1.2012774071589305,1.7219478624532936,2.4482740595217956,4.770058521315885,0.9545152034544724,0.45019198485750866,2.9569465146806606,2.2206655189314284,0.37598911491328546,3.545179087965371,3.499935534638161,0.45594892324918423,0.5457530513902886,4.945019994749859,2.7115993079064182,1.7937617667023942,1.3728571932062617,3.6958333720836523,2.071039708890451,1.7731570496102922,1.0959318173988453,4.637030041973581,0.5689157305263537,4.4313352811417515,1.2116730737436832,2.0174195020196595,0.3180312480207359,1.241686970190654,1.6263804917199531,2.6314100519530337,1.4028504318741253,4.081392087775084,1.0152451507923388,1.9286577911367442,1.668387898717698,3.5776578328547193,2.7391572106361606,4.972400808003123,3.4397906178759987,1.1052537415391128,3.5296596388138757,2.362944030424161,0.7599593710652441,0.6588282752630981,3.534973689944575,0.10927207851465504,4.5156114469122555,0.26686490976573607,2.0936430586267987,0.9821922847510001,3.6039971036412632,2.9742874282239917,2.221100987236184,1.7131221624982151,2.6605576197023484,1.342714666814191,0.8629608260695842,1.7515201816337167,3.0417932413268023,2.26203314960034,1.294011861436164,1.8165405930257594,0.33251788840725993,0.8875078811858528,1.8974861506621432,2.666747482739582,1.1751808450637835,3.753271975791411,1.5954835489237218,3.3740875966163775,3.2571671454530495,2.872304173243224,3.575593058007743,0.05588832725738513,3.0442530436163495,4.914308346824974,2.8927470013775745,1.8644300811487857,2.8133876624781395,0.17674033560351243],"expected":[0.0004495386917198657,0.005656112314316238,0.0006444655944266431,0.036061469190000174,1.0947423023354114e-5,4.591009029424345e-6,3.542223129275647e-6,0.0062822338970339635,0.0014233984167138813,0.00028771904725935634,3.7594656215864396e-11,3.3098543850166385e-11,1.173529546256729e-6,0.004365778928766913,1.2973611536966027e-20,7.596517005204723e-55,1.382299690006298e-7,0.018000650049763513,0.00027871462831711996,2.069372486857315e-7,0.0004028921937821057,0.24689388299074969,0.003861812916457268,2.4026656734492606,8.318641201532313e-26,0.004908555774954157,0.0004410973357279046,0.0012002193375772452,0.0012832596389272936,0.00031031956687302257,0.0011712253409267917,0.0028693109945764684,0.0028895880766597526,7.997494761034524e-20,0.00080026146212246,5.95772398744844e-5,0.0031650708212716573,0.016974961359526298,0.0013729530779580173,4.870842900438047e-7,0.0006238415642224604,0.0001659042994524182,0.012902563198789846,0.0004716574534783662,2.2775692919882505e-8,0.008978636358834526,0.002527630379653572,0.0014829460336456292,1.9199926621108464e-8,1.1575497471458148e-7,0.0005275815478736502,9.732810628641374e-6,0.10224342376926929,0.0029078337635548433,1.1551963450511518e-47,0.005448000409389626,1.6302920450911208e-47,7.920336394351689e-9,4.1674951578220995e-23,0.04436324169830536,0.004193832343466488,9.272985314505899e-108,0.00236889679465689,6.80461874197268e-115,0.0005436633547022826,0.00493789573048383,0.0003975154356124337,4.023516856054032e-6,0.014871047689885017,0.38934570914170075,2.3987231029073305e-7,0.006789191921710208,3.43911904348225e-135,2.4057903502686868e-5,1.069789195854395e-9,3.9216019495904725e-8,0.014562210184593449,5.578888744489192e-272,1.0577996239147844e-6,1.0813448384948086e-7,0.0005865036487660345,1.45208411037544e-88,0.0067388999592837085,4.3275634851446593e-16,3.6220230907139054e-5,0.0011465806105999319,4.285037055371499e-8,0.001550322102769577,0.001678918513003767,0.0019054157373471932,0.016140010793785752,0.0009491972036992072,0.0006349464471853564,1.1909975164739364e-8,1.8748809270008133e-9,0.0010974280250811842,1.561967613309289e-238,4.370733660688833e-5,0.0010795392903748952,0.0003887513332472257,2.5220357335632634e-5,0.0007921950798656689,0.0025902875127669285,0.005993885020213165,0.016196144693908548,0.025917237885392623,2.4782932658832805e-5,0.018750757691135392,0.0015953606094133237,0.002311728387906855,0.0008473623852845056,0.0007692496149005801,0.0011781790565075648,0.00048506685983390924,2.1902253876767985e-9,0.0353731052161693,2.127360184957707e-9,0.0015537148242390955,4.980186270745259e-11,0.08320963287069898,0.009392008854064448,0.013921607638337836,0.02622589060129895,3.1121921731202283e-18,0.00327636344584089,3.3943826466907394e-27,0.0336271822289798,2.314898136547194e-35,3.322788380534455e-5,0.009136307681869666,0.001112979636790673,2.524404057703125e-6,6.714976891962481e-107,7.123650574191207e-7,0.018177633554863657,2.3845867136805117e-12,8.633205528913655e-9,0.003077341947060405,0.0049118190495959745,0.01354200601206463,0.0009541025771313486,0.0021381209705979842,3.246897843979504e-6,0.0025009802088607922,0.0004127156831890676,5.7561458291919944e-5,2.340521073794741e-5,0.002612709238629432,0.0,0.0044279569081714714,0.003341638715440853,0.0250716459936374,3.492681701277246e-180,0.0,0.6327582206867481,6.137389114007514e-227,1.7006305542005257e-16,0.016440476863739825,3.035988722064895e-134,4.915764539865743e-62,0.0017493916371960883,3.0867153449460454e-6,1.0053213401655964e-154,0.001376028001592872,0.000188385531702292,0.00011968738932199116,5.8341091125698576e-5,0.002602656927081996,0.008195950171320793,0.0015527626911331445,1.2342746347448748e-88,7.003203525458695e-10,0.0006279427076933025,0.00014689559000414135,0.05344054469901629,2.45763137455759e-5,0.005340416177752458,0.0006421890733637362,2.9231545407280206e-32,2.1299892118329258e-165,7.988216056579666e-31,1.1877103298424343e-171,1.6279402911551155e-61,2.8621491389315687e-44,0.00255012598688902,0.011225652294074795,0.0030228789150024095,0.0015060794667837458,3.661461802846662e-19,9.090333025599605e-7,0.002669460704069297,7.116665603502358e-74,0.0004723695611340948,0.0024270373941700204,2.5409551173834833e-213,0.010751586527238417,0.0,8.785572586091675e-7,7.664201242540562e-7,0.012702403808395315,0.0009867306222247102,0.00838334858293778,0.0,0.004012921684132071,0.0034063852945007324,2.6343612164193835e-13,3.1727791432201643e-9,0.01584905157909587,3.609988805631987e-65,0.006669507590806384,5.24232332265158e-6,7.00654177134915e-10,1.595969753397637e-11,0.03211699755138308,0.0005704372306651492,0.00038352604867926366,7.18276420396646e-10,3.6461847747299794e-7,5.033038099293084e-7,2.6698260147470732e-5,0.0004866006843644722,0.00020415417054550966,0.003912878020114667,0.006179676032831894,0.0001213240979984632,0.005829406478092964,0.01732908515050966,1.6739362978929223e-8,0.004107905262471872,0.05135285199925377,0.0033078241095255917,0.00038145595929545416,3.360891750341116e-38,0.0002479076803253057,0.0008376930920919184,0.0001146267875150059,2.97739653190453e-11,0.0014833363102835738,2.818653753156023e-7,0.004065390745132976,0.02036177537193703,0.0055814325306002225,0.0,0.0006287181281652959,0.000578546340035621,2.672306520344706e-23,1.7221770206138624e-7,0.05361579718356099,0.0015980633836261491,0.005741726757643979,3.310837412046986e-94,0.031631301906912906,1.0488513362902577e-234,0.001205232109828458,9.126077912767376e-22,0.006748283704079192,0.0002677674644364183,0.017257221757022777,1.7154068507175453e-5,6.700337341337888e-14,1.0584395073812573e-6,0.0024501533191040674,0.03570568925260434,0.006883607511845838,1.6569629089119045e-6,3.600430886448764e-19,4.918282056477527e-9,0.0016938317341589821,0.0,0.01700117202184882,0.0,0.004122324203796877,0.00965142302340708,0.001004891604278649,6.83962993542499e-10,1.6554584117767393e-10,1.4004220681772395e-5,3.024638453785117e-6,2.929337651700906e-18,0.009283502509917968,1.642859248324723e-9,0.012763839062726474,0.0020576518445308213,0.00047585776070968816,0.043888199066664975,5.287181661832335e-16,4.6617296111367665e-9,0.0033937178195709134,0.00167489771534354,0.00037391396697594937,2.589764209060601e-9,4.879690735930642e-6,0.0005074580960545203,8.208513659281744e-5,8.93815800232877e-25,0.0006105350236949438,0.0,0.0036618909683349245,3.7649094130549215e-7,4.139294125931374e-7,3.735108398649322e-5,0.002748247299402916,0.004370065939091546,5.1353666592355386e-21,0.0024905720254016724,0.004975929529230362,1.1872690635371317e-44,0.0023323677024935604,0.0019227058525280946,7.253552103842032e-5,0.0186235560558749,7.19402386195354e-47,0.00011402842380582694,0.006379142604200225,1.794309759687324e-19,0.00010121549695466757,1.0035086230901525e-32,0.0008226675248219941,9.813676186901705e-10,0.004007985075406667,7.790232188622343e-89,0.009465549947257651,0.004330774281595264,5.031158646445185e-7,6.108392501319069e-5,2.2677730749518877e-7,0.0027286380962377945,0.001096196479110252,0.005569929175315019,9.13237868622186e-8,2.826246996529115e-7,0.003782836848069998,0.0031180657756147397,0.006718952622170282,9.701378026526887e-11,1.711478704752261e-5,4.37096071530137e-15,0.0031429168581418323,0.0002158972103766796,0.00015007244189040774,0.0023385166870895373,0.0013431091173778764,0.0007309149879974535,0.0004304102716316966,0.0009886815551406948,0.002874430724744491,5.976779065816847e-105,2.8635448722705585e-9,1.5109551737262627e-55,0.04891345950086735,0.0002095885336244551,0.016514337272628198,4.66405919102343e-13,0.0028926748400971186,0.0014582093509038002,6.918891193483221e-277,0.008308973520861416,1.0648948944632632e-7,0.0003557591166359636,9.86164031758268e-8,0.0008155192985185104,4.055868446217952e-15,0.0038916744549006834,8.452206833381999e-7,0.0,0.0011295102638696933,1.0249257731407914e-73,0.011425739031593276,4.245215306230843e-6,0.0022235560046767197,1.1291686748905728e-6,0.035325766559846705,0.005492173916626034,8.465266591549069e-11,0.006853529036802828,1.0658988407943047e-10,2.464963733906936e-6,0.04373614699412272,5.626208067948648e-6,1.3576685052666866e-108,0.0016920044302715256,9.726684981709144e-7,0.0020225628680122665,0.00556701799449247,0.0032652901768774768,6.626147299720484e-9,4.183463585103853e-5,1.935390311707881e-41,0.36570628557558754,0.0,7.919716270294068e-6,1.1851209740650153e-101,6.74549989568469e-11,0.00034521987655171415,9.237758276334332e-13,0.0008720559087179097,9.608565929457805e-9,0.04316422798092119,0.0,0.0004064740524323986,0.00524377165131755,6.085472875531698e-9,0.00154905561713127,0.0,2.252767260754433e-144,3.3489204025332296e-39,0.010562289564132368,0.003983409703806793,0.00299605288831099,0.014777667498605407,1.1613595246815606e-70,6.551211957230027e-7,0.00345213464150565,5.787666680004243e-5,0.001032387958804109,2.5064322083589305e-14,0.005339410551519971,0.006382490405749067,3.634905890770035e-25,0.00012869940605445343,0.009201537444585359,1.4243641250646197e-9,1.5562693169931016e-22,5.575766227936191e-13,2.738047932986889e-118,0.02865140755127099,0.4419613209957758,0.021042958080111827,0.00022857160163106295,0.006267341973600542,0.0037739107418859694,0.0013452570988521568,2.9784278503462057e-5,1.0275739047373262e-53,0.008647201147233202,0.0029941870316600285,0.11123691932198389,0.0018699882707636669,0.007518679075240217,1.7520314312731637e-54,0.0,1.2898276504600772e-30,0.013384161434093265,4.6565852924308816e-5,5.1949978821586115e-5,2.79853450633185e-5,0.001275500852445553,0.0019499994676327303,8.525367557496856e-6,5.553116733801131e-5,0.014084380614852425,0.0012506393386956388,2.584665250698641e-7,3.511742268222197e-6,0.01507573109550763,0.00023280070687429217,7.292123059942136e-5,2.6361219980616925e-9,4.383520376063032e-6,1.484623288184641e-6,3.815679189903471e-22,7.482863646770148e-16,0.0001923333222679795,8.661109298190177e-10,7.309752496411453e-10,0.04065387778702987,8.06170257207642e-11,0.48515443127733926,0.0011013622564245073,7.435016456992123e-6,3.912320351206042e-10,3.53792983458957e-29,0.042633138852319556,0.015147553787918825,2.731333886555498e-5,5.996480038389314e-6,1.0853706787116889e-10,1.5028629239791715e-5,0.0009767332986254185,0.001767865961353337,0.0020722155727304356,0.002695756970567745,4.305082318834534e-9,0.011807788830988984,0.00014292827458303948,7.153595812300765e-8,0.000660199311470365,0.03529035375938891,1.1081857395495955e-7,0.0004731311910320857,0.004382161583106486,0.0012055028354746515,0.0016444103334995529,0.0010554459002963138,1.9421886283362438e-26,4.131242673471588e-30,1.1826849100263648e-5,1.1083341131012849e-5,0.0002710545765651708,0.0010478912777482923,0.05985723634270495,2.470720620405397e-30,2.351172207689108e-5,9.404860223082976e-5,0.005048502617912633,0.000284156328617062,0.004101332445772119,0.0002796978061027915,9.851559642408934e-5,0.029251446304158126,0.016158777406670596,0.00015079513221106502,1.2419104707199615e-7,0.0,0.0003161908983177403,1.742090040693569e-5,4.08978714025914e-5,1.6236373060320886e-8,0.00018892224675466182,1.4849612502277577e-8,2.3322455138806822e-68,0.061447940993664914,1.4703475294610965e-10,0.0015752644173662807,1.317065637321098e-18,1.8411189681685578e-97,4.0354570173472766e-7,3.432056631527879e-5,1.233864093190738e-89,4.3499997563303704e-24,1.1195464266366452e-17,0.0,0.004576356516466744,7.192498894339404e-7,0.008188540650321029,0.0002860765096441305,0.0007662582017445081,5.056196064782004e-70,0.008495511713245479,0.00010438723804599084,0.009721455950206676,0.009973091394392895,0.008155400139673754,0.029646874984544037,0.003309215665655942,0.0009009823561356751,4.2487434459974136e-7,6.1383188593636305e-6,0.0018806655660546674,0.0017603149536531057,5.471037904673373e-164,0.001869504969997489,0.0002868720387887951,0.0001688907739062528,3.310903466054768e-8,7.204879100457467,4.926618129128891e-9,2.3003803973661824e-15,0.0012076749963535896,0.00010730570428255373,0.00210320051843411,0.00010117798536407298,0.0027276794910259462,9.865829942272913e-20,5.907313922326017e-7,4.915632254202535e-10,0.004123306031193183,0.0019011331924173834,0.087904559445034,0.0008893103194876586,0.0008671714154261992,0.0013562749861212053,1.7855985664518532e-5,0.0019163675751783134,5.253677689519678e-6,0.00016199922520617293,0.006790153946178093,1.7082331498551269e-6,0.005343794271003061,7.844329589250225e-113,0.010022143388522104,0.0034793119364794887,5.925109392952992e-45,2.011332687985638e-17,0.0017703947288063462,0.000769333918690782,0.002035067200203569,8.727987871320408e-11,0.0009701791182267747,0.002264083880378721,4.7686942729701964e-5,0.0005395146836830539,0.00019529562921967398,1.0447349036324736e-26,0.00042300041031962017,2.739561616744249e-10,0.006523007303865197,0.0007530758457268237,2.306049183469138e-6,0.002592020536838581,0.0,0.00012799096973111507,1.4969814052221657e-6,0.003994784323018439,0.016304146686506683,1.8698951488343642e-11,0.0026921870543423904,0.0024994477256205464,2.1291584305762813e-10,5.614263153138141e-13,0.0016821640608581424,0.002160239354978812,5.4464641098011856e-17,0.00010329743775771865,0.007131633134368571,3.46231102585903e-8,9.351432311530674e-6,0.0023962091475725478,2.966280718968682e-6,3.706495252134392e-21,7.745173740471191e-6,0.05036576368395965,5.558878716572501e-9,0.00021864600894444758,0.0017459583651653016,0.019035786683137317,4.7057326520294245e-32,0.021904832913918957,0.007453248022107663,3.0036192927487733e-13,0.0030528031226607364,0.00031300191108778945,0.0017309151426522958,7.653174980093419e-89,0.0010090381584859803,1.2132097761769433e-7,0.00018197245099048787,0.020937378608906067,0.0,0.00020689261294066805,0.00896783723301758,0.005788704619011219,0.005670446552606698,1.5010122070566468e-34,0.0003234896057688105,3.1032160087168906e-48,6.965204734503696e-7,0.0028649451047149293,5.238107533042665e-6,0.004804929044799749,6.716216346999616e-5,3.655441929136339e-6,0.0064383192185442474,0.034063134120425,0.00037456292171146913,0.006738490435467095,0.0,0.01542948370941452,0.015230575462433399,5.322832743390045e-9,0.0003886997510281403,0.001275831080958345,0.005982744990804589,1.5087703009422651e-5,0.007394255682532062,1.3350510983258123e-16,0.00011489481906701726,0.007420195623112715,3.316467185108141e-5,0.0021303754383532924,0.009158484234445416,0.004943701522661462,0.0019727425204917105,1.8357985936246855e-6,0.005736983434172488,0.004149602735332141,1.2219059918992107e-10,1.9171998780970643e-6,2.8246210336212008e-16,3.8455895929458383e-113,0.0,1.1493043481714937e-8,0.0008731311412564752,9.958167046371541e-13,0.0015155890979472138,4.693258878483881e-7,8.290408036057535e-14,1.5203189397125804e-9,0.006617278640238925,0.0006450335971723461,0.0015938091384506568,2.752501928559237e-10,0.0076616250065544645,0.0001608295964422928,6.922544859288286e-12,0.00014724948828702782,1.5325691316486295e-5,3.082817686151121e-119,0.005502832664541825,0.0012532197186804683,0.005324066312346332,0.0029532838920594646,0.0005203806388964056,1.058811445649404e-7,2.3147610969349776e-244,0.0005066366990874188,0.0032960159428936137,0.005306087676605259,0.003340089232769099,0.02251184773272718,0.0005942022135856208,1.3500918388056407e-9,0.0003676801799259965,0.006372501062370722,0.00019357227997167224,0.0013654295941531525,0.002001288752570433,0.00428392165910413,6.767056603643782e-5,0.0021921718114335342,2.1973164534451633e-5,0.004253417935754098,0.0,0.004941157810595446,0.008318599807953365,0.13315431048894263,4.753403305525752e-181,1.0183063709784472e-71,0.008302822504883232,1.0362128887442301e-6,9.945668603898238e-84,0.0002067699289648098,3.8430717143032155e-42,2.7743060160297485e-25,6.851185832394264e-7,0.0005776380477841383,8.39428761234827e-9,0.009978535974653705,9.192838873323605e-5,0.8899383622734609,0.013893478157768376,0.0005896274209192702,0.000345328252601886,0.00032543435706090394,0.011084394882587353,0.004441543349083866,2.3098273715670505e-120,0.006284660029975526,0.02511916020411972,0.014367327791353223,0.00040817062178408566,0.0002493833320847334,0.009532812233608459,0.0016869213986943864,0.0022816429825970367,0.07809569754896063,0.0001245749689032697,0.00821896934092723,0.0005119913897141053,1.292698381731816e-13,0.0003155878578797607,0.022859626067394646,0.0004521634904089067,1.855988182131843e-8,0.001682999386035122,7.727459007726864e-19,2.37713517421794e-59,2.197638987895875e-36,0.003945613068720892,0.04026132707921159,1.7846269404639757e-34,0.002067385023310279,7.091858035897025e-6,2.9619194353921253e-6,0.002214635465850614,0.0033173574988292873,0.0027515428262867934,1.9244720213943574e-11,5.128889821048779e-6,6.851387884937423e-8,0.0002651599036510388,2.988296708535099e-6,6.604443404540457e-9,0.006939729794699062,0.0009062946891291542,0.0004095707918451584,1.147006795531539e-6,0.0028972713666264196,0.0,1.1569050018070104e-16,0.03226118616142636,7.36640015747129e-12,0.0032665602838377796,0.001057647691630456,0.02029298766715185,0.0023375374741678016,2.9048445774641802e-15,0.006971649570845366,5.611197611499084e-7,0.002412716514232999,1.1216996576101338e-25,0.012107718059628687,2.4043770830366683e-9,0.0025861548660041102,1.017791491823893e-288,0.007122215787103835,0.21719712273748373,0.0005840486415727982,2.013998330620843,6.176841462809112e-19,2.0959937656430873e-14,5.0646851890059745e-6,0.00010213323862210861,0.00331819274771327,9.49812462117372e-10,0.003958643297407484,0.002909541141399628,2.33275235098411e-19,0.0016273802245798346,0.00023364728478441048,2.6185811702494322e-8,0.002443939343223582,0.0017944213772770603,0.003873126861865883,0.00023472415439561726,5.381287731564901e-97,0.00013013939665463696,1.5632893557060787e-7,0.00027569800695967714,7.3838494477288e-23,0.004483030450219576,6.665324035310298e-5,4.905135211908597e-5,1.3119144499973418e-16,0.0007427737989750881,0.00029677550483365263,3.768532317246126e-5,1.0591428430852305e-53,2.4846658068473556e-5,7.107266250867174e-5,1.0650124337686582e-5,4.132853588227204e-8,0.0,1.600760157528243e-7,3.7673545939049625e-14,8.760397222283312e-5,3.002714638488288e-26,0.0005927370812458496,2.506423775152674e-5,0.0051934157396284755,0.01238119759363533,1.1667571939978588e-181,0.00038250391887061243,0.0,0.0026411359764856794,6.117984661207545e-5,0.014465048158596184,5.3978389387186324e-5,0.03872802276183222,0.0026652244149310347,0.001956316563428346,1.1555353236892054e-6,3.48352911463387e-11,0.007328579414714255,0.0005270940897318052,3.467251152654106e-5,0.0015265482824385265,0.0005672311141947938,9.421679652921669e-7,2.032396228470164e-9,2.8804336712746027e-10,0.0003959991412418169,5.594855153035605e-217,0.001467759285855674,0.004680652766816472,7.040008574699074e-22,0.0006260124128917896,1.5690260522548208e-9,1.7788116550918734e-72,0.0031326050333791815,0.009596884119003186,0.0043795919465331856,0.007337112916909233,0.00018031299132146973,0.0008253034618175628,0.00262864283724992,0.00011033644219014933,0.00010296371563849163,0.0296006659017256,0.0001312133376090889,0.017388689315266003,1.2904451545302454e-17,1.2938308440755702e-6,0.0024113710898672693,0.0037734236990020196,0.0007089471146477442,0.01215725497415003,6.6921700034690095e-6,0.008517389024714094,0.00015429485045913692,0.002094249479691378,0.0009221619864377314,1.477461625031824e-5,8.942435075152158e-5,0.0011918829101595604,1.1020214369827996e-7,0.001951236310425296,0.0013437640350572972,0.0004508692549300856,0.002019202819052903,4.0730570637458445e-6,0.35048854169078075,1.535194021798202e-5,0.0004504810981562151,9.176870670782419e-42,5.1088692370243246e-11,2.655890214213241e-9,3.542165729997568e-141,0.002323600428168769,0.0011737643658846313,4.406761149128063e-17,1.2441273426268725e-8,8.219725086686187e-5,0.019141650554650662,4.706432327632126e-37,1.7084483064438086e-19,0.0008561021499618991,0.043420699492746496,3.0166110404241053e-230,0.00577750902715021,0.002348146364681207,3.4686654004532857e-16,8.487595137493624e-82,0.0037088660744620866,0.02026591766799208,2.899005573501577e-11,1.3981141901520847e-5,0.0011127146133992727,0.00012370709927891625,8.769646100346987e-13,0.00011034100390378476,0.0009345983707238683,1.1883521354649312e-20,0.007623979418705022,3.188015156629612e-22,6.779166761017677e-10,9.197746570594859e-25,2.7407375927645752e-11,4.9935700269453036e-9,2.1325490319254077e-5,4.4879089695883606e-11,0.0027091538769868045,3.6501575269409017e-6,1.7812065616950426e-6,0.00019913303073453936,0.00017916079952879746,0.0013836911287029654,0.1308002427661912,0.005661856811252761,4.687145932563452e-14,0.00035578225459469165,2.773827270978707e-5,2.8119447289740327e-8,5.629178548926472e-41,0.008795467699278857,2.865689545226129e-35,0.021363162720086207,1.0669177050956705e-257,0.00014228065675865337,2.27064946477544,0.0029765950964533525,0.0008830770252666097,0.00010826444002592256,0.6245281662127945,0.00027488475031661605,8.292973849747746e-12,1.3842725404139365e-38,0.001846954356336005,1.0009490360368777e-5,6.0742756956299715e-6,0.5168721373863445,2.3617650695658044e-11,1.0203144074994848e-253,0.000375396738159627,7.359783591945574e-11,0.0023466140744164074,6.731546760949201e-14,0.0009738298456396787,1.0363431710975004e-12,0.09585475086783536,6.194578510473425e-5,0.00024414582352673197,0.0007034431377196339,0.0,0.00790091735218491,0.00036666784288194484,0.0034791142029743636,5.813584426543352e-5,0.002037631326751129,1.3855941401596943e-66],"x":[17.99063452495821,1.171694801232639,12.03622848018008,2.2259376242129214,9.146261339979871,17.69965517895349,6.545552190341564,6.978009432775831,18.407402854334517,11.844056276203187,4.6632714224590455,15.054694004590829,8.150210339071315,12.84618864438869,6.270488828012923,8.433128621385029,13.83447371111821,3.58578051096921,17.434811183830362,9.922005726493573,4.186962075835696,0.4154241157604499,11.974595049889661,0.3051550268328729,14.733717727799668,3.991657345915116,4.5797215470925545,2.1763826039813416,8.560669994222017,12.239100314500387,15.992187337658926,3.7850922727194947,17.67339609165877,15.10465978068038,14.326175853704171,16.04028296253148,14.926003534694674,4.2872135295033775,11.456446351796178,17.61441446459863,11.239138721161673,13.351380333093964,3.566379017943886,18.30712470605704,4.682325904614291,8.840931728373103,0.40347542696709926,6.565867750358887,12.867354529575268,18.71438796086624,18.742433604714694,11.210090983574554,0.7953488576602252,7.440806638413182,12.703881599795315,13.341160345594618,6.721763767163376,10.429144150435224,13.331078868056562,2.847542663145224,15.186988289453467,3.3023708039452293,5.216313633121956,9.450814256729764,18.702963756519132,14.17715100534988,11.719872575232912,8.994334432343184,1.2273531727359988,0.2957220632944191,9.097303281888216,13.582082719108545,8.032818947179203,19.290442261961253,11.927187699840944,12.682354218799352,3.0060096726667407,9.756343124507563,15.919891904491127,9.081108560428227,11.155332528189806,0.9346072215371537,8.018669968653303,8.939341072908533,1.0847864348512726,6.05428867681554,18.667319277663083,3.9838534297791206,9.101980750135139,12.032071165327402,0.7435137692837612,17.94759415992067,13.078169081445958,17.607346492408933,13.850533026631645,7.697213507474054,13.316976454972504,12.980458057234884,12.240205266155888,12.85060895647046,17.939174631782336,13.861337612702883,10.365459342024913,10.682463485406757,4.13296136809719,2.4944213933115122,11.733253892279008,2.611083702505126,2.777176657211804,6.571459164996591,1.0633295916035834,11.974481953429157,17.225163278566576,17.31721145881636,6.680766582631623,3.8730405892454423,10.428359340685173,9.52735611886629,0.2302232113248559,0.45090924006141453,1.0076723994545,3.2073418055845204,0.6321681934808243,6.963957436232531,18.82293197938157,2.3119742868239346,2.668198303735765,3.929008223913799,15.039856385564399,8.531619573612375,8.083982270289702,17.128945299342796,16.44434907193906,12.862273633389725,2.259244141551622,11.303654780362521,18.239797447896088,18.014851829631212,0.6481110640807053,2.6242610869052507,5.2003362746730675,9.478344232400083,15.582004074199812,15.863793035419214,7.768897686152942,18.32370096874172,11.426388991771525,2.912819274114602,13.26386420286183,2.6019750701816147,15.274211546168011,1.3490925882449956,10.499887485059553,14.878271772500483,0.18001344768125982,6.731466219078874,7.300110652536991,2.3734354616191755,9.04924029926773,7.915057732620605,12.867377801779902,14.288004264450942,17.68197999769193,19.783463316534828,13.333749596281015,5.186403090652751,16.655055981888168,8.590562121081792,5.3218681952482205,10.416351806237355,8.964188642266397,18.390667827193603,11.068794738022657,8.778365962363734,0.8897894450780486,11.847825597864613,13.738946897106157,1.534472411942951,5.00850295460753,1.0296183934646708,11.056697758561885,5.190154670817444,14.468022458381649,14.952648244826893,15.163650946165635,6.816601170549261,13.70448868912343,10.482825899673905,14.874985099113388,15.29657010153809,14.192688479468348,12.249740445429955,0.5075287486332414,9.20676585511345,6.600737976469189,4.19909109359506,9.110416777211388,17.159181700955912,11.59138802659195,4.291661448803237,1.5798657331241817,4.419588597779609,2.4933705632222347,12.697638724443227,6.422836498354156,2.494275731509532,8.823155238113518,3.597414219066035,17.377398564725862,3.2181747713073117,15.523324726218437,8.82695617568908,14.950307340523219,3.8100098878558697,4.553477464853204,18.772822302239188,15.654616595879386,11.297405010931246,15.476849237296374,7.388056577816768,13.085308168105438,6.7319155297822375,7.970316183597013,7.777917238953829,9.177520731624327,11.477272444689518,1.6358765467419367,4.201604541876849,12.219003020701802,1.5723182720784434,3.1871595867101643,14.322259340730232,8.702141758171805,4.336616276622434,17.493169304432115,19.397970315066992,14.651539210265891,9.49171248150078,7.511481270606963,16.678220769969307,4.2994442832322965,8.647250475763553,14.765871244288192,16.929102456654142,7.565059759579751,10.417433040269529,18.904320784092256,1.1332993221594112,12.102861671704161,8.011987397353323,14.775592167201772,3.5082547566839306,0.2037608235404642,19.6927807146388,4.826739183866047,3.9429737552013533,14.006772716874224,4.109638497415147,17.19930234796022,7.387420687767574,19.081774670020167,9.602384527785075,1.793079327147744,6.6924962913292285,1.825216500592548,2.210556419156644,5.592107403626594,13.455074607123434,5.250240078396091,4.369419767179044,11.692309021753404,7.1648956933085906,2.5125743333106776,17.275633166267163,11.907426015845338,13.492659001785338,19.831638044030868,11.29877824873538,7.500078333484854,3.983509827832039,8.184353659366899,3.7946125372718598,16.610621565184648,16.737260199018728,2.702980262972341,8.397551384322885,10.939875347979374,11.619115480213061,7.458807867677448,16.109318555890887,12.843797573097993,6.231458165243753,14.997749335754671,1.2115342248002348,17.47602365475158,19.384688581657702,17.304710248499905,11.329826730974592,9.563780848135988,19.481149136214285,17.134630746803122,19.282498067597405,15.879390706679203,2.111722265940519,19.689749280062117,5.27939035968942,4.617871730460816,18.515816953101268,10.54012985828579,12.309188782612717,1.8538073134272404,6.5694437947376105,13.44055377324231,1.819727647315248,5.65345602033696,14.96288342960835,7.880035444026792,18.54417544356011,5.1068572428581716,9.915905432464665,17.608982367535514,9.08496064352736,13.652218772944602,7.032147703483398,6.0669461933216295,7.215130926822053,5.132222085259821,7.012418564490264,6.357723050895165,7.971649713240416,14.961056677589477,9.137110820225711,3.268852135977096,2.1132066730717103,3.8887807587120404,14.836448188729868,10.801937864712553,10.825791107836821,13.351623160950226,3.5084322970861104,19.147895412147268,17.094333057981643,10.857375647968354,6.158436213682794,18.81498803190468,5.065585704164701,10.530162192936658,4.952036596171072,18.79522407036252,2.607231855611216,16.003238963800147,3.540609831487669,17.624108388034458,13.098578759058196,4.078053142541913,14.929360443247916,10.754206586613183,15.146682319972262,7.484699615789525,16.3188409966134,10.148247109472948,10.088832732486726,12.507897999449744,12.3736967245013,10.632714990703654,15.522032013213725,2.790425065362583,5.767977261332775,11.198237663277105,8.007028152176158,1.3354850594141254,2.2554111431228385,11.57049147680073,11.584246399400513,7.33468478301436,9.253248526723992,6.4950279535554944,1.3940465638734656,15.072928874102232,15.345931227566275,14.236606821042429,6.1066552812609665,18.866776950139027,4.90436150089923,14.628256749343027,2.4037204480404206,15.473554970417016,3.2803069477721314,0.08140320816375723,14.174724526606838,19.49880070213023,3.1743774208561115,17.103945200396925,12.497063589916507,17.52302144015953,9.70037901808707,6.784139652955572,1.5934621928540205,5.840145086479391,12.058261116244484,2.698946239593223,10.084452473103575,5.207126654606493,5.761061252260702,19.103735806940985,13.600749902992222,5.658358965623043,4.436277999949483,17.510102073403786,0.8536587000747353,9.738039377906809,16.016559767046957,16.02412261865528,17.48083503484917,8.983538366036615,11.081511746960846,6.876828656594025,1.7132131119709904,18.92206050381699,18.79220106505805,2.9671292204831357,3.964340594235294,7.562779597995917,8.721077377043475,12.025556908988037,0.573365037458391,0.3314244092661722,1.1779942832213885,15.291431399557961,12.325186798139217,14.726294122227586,2.19415974328089,9.471293471653226,7.706941392389064,2.341707973844356,5.885050259291349,0.6769854903450767,2.7189924455047665,3.3679687727521435,13.361869702530345,1.9448461169095488,10.533312011290779,3.186920787718881,18.74142586017684,14.433591638908432,5.936434329375695,17.637064502531842,1.4951187997350779,14.466187995526543,6.6074152314844925,3.205024649517716,3.8502969435662537,7.60016688169904,7.1311113697967565,3.956005972608563,17.708912962347178,16.193431521099374,0.1006600640939892,13.210025993984544,6.696309778877119,3.6109551185901934,7.974580445021111,7.524165309820017,0.5524199507470628,14.225756477568655,2.389442254204459,6.32545471876838,0.20758707717829505,17.88025861031686,3.0934398623291415,1.0076687887053382,13.738817666534455,1.9327532548407955,1.9204418569800508,16.59771841152717,1.2200423757682133,13.29982139338314,4.207628553999414,5.927600837768843,7.109203889726934,4.0541917637089675,8.611717542666518,1.9813200231512118,6.092969999209319,14.098703918214,3.3132291182750295,9.141312408397134,2.2882574212562545,12.482880056771348,16.192498834549088,5.27025177381045,19.500337067842036,5.516299652611716,19.98360994166175,19.978334797914307,8.152173672742048,18.021011749080337,13.962478509055245,18.949310608137914,8.546689355127683,1.2027086871495918,19.199103453549164,11.068224936040544,8.37091304580734,7.484498799594865,10.652432337865836,17.27882857654822,7.992572041999022,16.764453851012014,1.8231225419740449,1.7791233764251402,18.28838810374785,12.371341940959653,19.480590340424662,10.578619135081802,17.84732072112162,2.3588930055461432,8.005870346982956,17.143343184474226,14.916110219157348,15.880389465681652,0.46230357752753637,13.84639649050781,12.419256297059649,11.958674440984689,7.6842337342577105,19.10303733090074,17.067796592251728,14.285821954427739,17.484719444677815,15.07732084425668,14.10208697214534,13.100735116878027,11.67052455746369,7.8426228484779115,5.47851344448282,9.277912236041503,17.928612230688504,8.305132977038792,18.507861381723263,8.122432586459208,3.269220387334033,8.529090807921836,2.587377359081393,1.1305145344402945,17.202801440992932,5.594367235929951,18.602488290076806,9.614436795939746,3.973258791062615,9.639072299130081,11.644153184070714,17.849676904424634,8.31043621471688,13.116853180946046,0.016328793722744095,0.496379587887148,8.778806512705,18.969879613860805,19.708336153213956,14.231847903267006,1.4204655867065208,17.803304878444713,17.15020535780715,14.91715684200436,10.585829662910236,15.743304689853366,14.888603485602303,0.9443334134490344,15.474441567933521,0.4000159701630013,3.4277543399137844,17.69604607268869,6.3089030565466375,8.744216883115538,17.736465403766935,6.654160983631137,3.7152034682232005,14.408691961025525,4.736651345338516,8.246816320162731,5.937563851640997,12.497610199057338,3.6409249947099864,7.838939070645106,18.31421048711078,1.5136307063397636,19.235139619012287,14.533827173506335,17.617781931190173,12.55812266755707,18.59333712647153,6.141762355313487,14.279887723384155,15.44004070018094,12.200690653696684,7.7456674845518325,11.749553739789809,4.224209132585637,6.171375660470413,11.79773132584469,5.628319235824915,15.120551981554406,17.096986449128053,5.103954454840789,2.3322220078145373,8.034885581535342,3.6179313420264148,3.4734546787457443,18.798029148353162,16.30383399112368,5.563883360087325,9.26970017673813,18.65782887743425,3.8285805933551442,14.91054153111103,11.436642773488845,17.198391377249514,14.99670016571461,19.4591034305597,12.36206301330907,1.0620735754155897,17.75291667557006,16.077342720856365,10.144784926242544,1.5701792866618014,8.06035076103206,3.4521273414077713,6.708452706005827,10.18761617523018,9.750899806879083,16.958196946861715,6.595822994770475,4.758273509468212,3.9931135198020273,15.042115042358319,16.579975627316195,3.955990886519256,9.10021206628771,7.843390892227484,4.4367161279517475,11.801519698323556,10.858819105078584,10.458510835892113,13.4706052704786,8.587586254188482,15.374172013884731,15.59076166058199,11.859124137060274,0.46561551834525705,15.670135746489763,18.786135105554763,0.6775445076670206,2.8017612884323384,13.678566308523447,9.908574918132143,13.640793995749267,4.994883377887196,3.5896477297278073,9.036707132059263,8.940460373979406,13.990793333820651,0.8447544463368706,19.702860590918423,5.324175557127568,17.763711320297357,15.25303664582053,4.041223007820456,18.47037110569965,14.205296564329775,7.297155442101411,5.225423492711028,9.602306705007875,1.0335866162211893,12.572235210456899,2.3581666048252403,4.093995134925996,4.223294026542743,4.853182949370964,13.58251535954253,6.67647391188011,2.132999705846057,19.34567351359689,14.74356197427516,3.3443846506503405,7.9688126359915845,2.765488622941348,18.681880820722206,5.260525869325665,17.662895076156676,8.661583179071748,3.6307321890643074,6.043364196592136,3.4193273777284716,4.477022585657999,7.471142354961318,11.985644763898936,16.047906463486818,10.373494658099833,6.180566104161143,14.907402417612339,17.71707491045271,12.414711481677854,1.8281616301614934,8.993666691697735,10.294864903080283,3.840119250640308,2.3503431847423384,15.12412252801633,2.741099735775845,13.64523586724857,18.900372435749986,9.714171485622067,12.221882108625305,12.77375263214585,13.78542646125184,7.965791044695409,15.283911644389967,7.009481740643251,11.881243997810863,19.716750510981193,14.784142071127174,0.7048007916781929,11.572455480672538,3.116185336917132,2.0091740716535877,17.743038307044046,11.048723231717439,2.249346323832566,15.52800435619989,16.534065412038075,8.864513453494109,6.653229213961538,4.208125741020008,2.3748159758120346,9.083044840902863,14.115002696614551,4.234590178086681,17.70638773478918,0.062948267794396,1.880537303900991,4.139420874606885,13.955033982700794,9.266549860676943,0.878116622878018,16.601601432510837,13.469308783514515,10.871869720407377,2.6574929955226123,7.003144636193359,10.71452092158685,8.615978862337336,4.040076784297617,4.689511675915443,7.433821545080113,1.773848769154669,13.859449282263498,5.946293800301103,8.776757820127195,10.126781684202895,7.920428949415896,0.5991321650549786,6.552187810198626,10.356602202892695,10.623787413827102,7.353550876523021,3.5093692750613226,12.529863427529676,3.1271160237066287,2.9093314974294637,14.997837087661887,4.771115946730502,18.88484107055227,19.916879536563627,4.558619702616493,6.098245693683029,2.5085678683100054,15.084628903713874,1.6351940603314663,9.018492229606485,17.099593206203707,4.685966487555651,6.5829594320527285,8.255810004693211,7.712070594373466,8.167819244445527,17.638013201362472,14.857805012891525,9.088047964880946,17.911277803032746,1.5573661381124904,2.4902542563318075,3.303780203941842,13.498060080467024,1.8854510221426946,18.3245605618249,16.50875911566178,3.5588951931534085,18.802193052817827,4.409085461439983,11.929449518405875,6.492443941549655,14.767188901271933,4.844444419308518,9.652713815526383,8.953926121264209,0.6398890144857994,5.979152356909498,0.1949730169599473,17.538528307975376,17.084215638641084,14.735761050455313,14.11716653249325,11.788312775624515,17.875953193590007,17.20689818483159,9.713222922890763,7.528314745085014,2.3321158164485745,7.503087342167349,3.2945867608861246,8.169042964614075,7.853781574764245,10.655973805830833,15.955303629988947,17.936754486360037,4.582386354799239,13.930486057895589,17.457166401411758,4.129789412283134,1.9664553676413021,10.614885409253837,15.784107389804216,14.94054238972527,11.419055425753669,11.20642784613317,9.330220213953453,17.397613587938658,6.884218529471822,17.51472118005555,2.9164866205399687,13.577239529101668,3.3956959208141146,5.956972442447359,12.479739591602943,8.133712711876617,12.991763327332716,5.532911844483519,9.572961746764674,14.899754790881712,6.965061193655719,9.46078758459208,17.83967639998307,19.3186453311678,11.872158072745167,12.43766887791665,3.0613528407069923,14.798288902252459,0.45049667730252096,14.074395086760223,12.371716320715556,11.661707055498333,17.58049201823559,5.260813185958817,9.648031556283962,7.387103051207964,8.219579622697882,14.360336542467905,7.555173500936236,2.189090517401957,13.334097651018745,13.608684193902342,13.423151960425862,4.714513073957867,17.529015756519133,10.33067948155626,7.926152450485602,10.923177290528914,9.636525049837129,19.814083206622314,7.322472184014952,7.978819880776529,4.732296034268635,9.624499695680214,10.970300318371864,9.409665012423556,18.956862159432234,9.38089911591442,3.5006578953305523,15.352677932108453,1.2597939174248873,2.745504378151158,8.450706154637304,11.252839867961546,6.645579557931418,17.318669744877177,6.331136015667642,9.045783461175244,7.938030781988772,14.090802514110848,12.857295014548985,13.521191661114349,4.60155439714939,18.20756413131874,13.287739892105188,14.655418349683792,5.694827558338669,7.503472571058669,12.336310164186205,6.087643463046439,14.327777242762272,0.40858473955109,16.670206437408996,14.526758139459744,18.096708381926092,18.07185215182638,11.571591625746,17.696165918375378,3.6625538813214886,2.6162191475210594,18.731620783919844,6.736130745441629,15.773388501175013,3.764433839000838,11.282970083613364,0.261155684063632,9.693258865671112,3.100037929413433,15.185478179518439,13.638963272533058,17.45150412331176,6.3513788706027485,3.167685823971902,11.600035308487646,4.647847011790263,6.706816671208524,0.34476032031157455,4.768527988216862,16.631822410996847,14.739671035849886,10.027732461486485,16.115476100436222,3.7731013793720614,3.8553899304968686,18.229777206796204,7.683106116424638,2.3300380337099735,8.625737673190566,7.3193307136820485,14.184340277548477,3.230443948566073,9.806106992932984,7.700847717688184,15.47575661669586,7.035992755505327,16.778882312802814,19.46327783270226,0.6040739286996866,2.664676071094303,12.313698108100105,8.379147411697918,1.9486259161412356,11.363752932355759,12.350005155570765,7.277550258024532,3.7067524951963193,3.616403416642946,0.5820403394841822,11.403123953556026,0.10056387597567884,8.112664069822442,14.40336300492287,15.57490350621574,0.3698848581814085,6.939208033434081,17.45758098531357,9.435800524776653,13.64511924477426,11.158357454130773,1.6510169113786821,0.5394510444069667,18.634988316967778,19.746658603051515,11.886904593808922,9.111105510654184,14.5660113607443,4.057486691935703,17.886855278483882,14.129421619765674,0.5544637915144435,12.244233608345105,6.627017122209606,13.445026438503662,14.910624340892058,7.688301260326602,19.480126486521314,7.778833067260464,3.6050262754003937,14.818717885899314,17.146242984970975],"mu":[-2.558812496131555,-6.2677782982176105,-7.700728012864298,-2.214000581470743,-9.870536442784704,-1.5945136271841531,-8.321504463047315,-3.4845880378832272,-4.232846984365819,-4.402247639459911,-6.570310745889172,-4.319778886349363,-2.2674309349462485,-1.6619411135231887,-6.562600303597906,-9.235959435771058,-2.1250217414045602,-2.4495344651947115,-8.001982343992564,-4.502379310849283,-4.508404600724916,-3.0983937314428878,-1.8209659772774134,-1.2820121468549361,-2.6010640374451466,-5.210180466094229,-7.382345644698951,-4.2486357918050155,-5.416753607219591,-8.864911807027555,-5.590939677209286,-4.783723754077151,-0.8036935215289809,-9.451236942150434,-2.0215214335225085,-3.9050219334836256,-2.3944327714759406,-0.9436719126685866,-6.025788130798326,-7.242885866752655,-6.7237282751094885,-7.027013972246598,-3.9736968194566846,-5.921841113187993,-7.423298116910937,-0.672697178272319,-4.652782067728172,-8.185154395830825,-5.815485499987176,-8.280600086881847,-1.8027659979987942,-8.715326803840446,-1.190044609200216,-5.590227850892074,-5.524893106071986,-0.7120911147587927,-6.37218877153261,-9.679919213058701,-6.655396503898496,-0.5670489513146593,-0.8463804379726336,-7.275358094973081,-7.074755393455079,-8.783088551425074,-5.2468010650553065,-0.027571289229890716,-7.213055970623561,-3.4665598022962407,-4.017182086620872,-2.000214935806861,-7.4668582385686255,-0.007202528531642383,-9.761417896914164,-7.276182460295022,-7.845503657162503,-3.782082025010627,-3.6818844554829333,-7.053462500565959,-6.813125332542893,-8.027852162272108,-8.576225973013635,-7.2830583724480675,-2.211847841182908,-5.010297073625392,-9.38747208312118,-7.2639320643029475,-8.164205894594367,-9.52355372464897,-5.253280120455443,-5.088687819727607,-5.2674197577540305,-4.2011310416172325,-5.722007960930009,-4.458988866428735,-9.583219590230705,-5.464999048395233,-4.00561106540443,-3.510875933734876,-2.36868784746467,-2.7429043578088197,-9.778233276975485,-6.301561590692617,-4.050803009583306,-1.1559195896838603,-1.7855451106743314,-2.7935059448035338,-2.5019546572886897,-3.9824418357597002,-9.33171234483414,-2.5802934380302056,-9.212533973160788,-5.8234656954223185,-4.871625614628002,-5.833153786433889,-8.717487345812957,-0.11098241661851915,-3.9653411103404146,-6.877130400123635,-5.878450511536255,-6.271040994104058,-6.3482858571248,-3.9755156205389652,-6.719047643759335,-6.109471399983106,-0.703261638483188,-3.703257519643113,-0.4381847500330749,-3.9600088977673265,-5.213365854265324,-0.7229899265439332,-6.011136041248033,-9.684185999712124,-0.979232214127006,-8.08846749429712,-4.507545754631428,-8.924759845182589,-9.323895632378294,-1.3956706714248868,-5.276196769856265,-4.323006214633485,-9.781649940965,-4.434419791666211,-7.6780692147234,-2.995434139918054,-5.42110167643262,-6.380284306760973,-5.9606753369743615,-9.505293695842767,-9.202296624610163,-7.748743408125243,-1.3803872232781833,-5.6705674946498075,-7.4782345583188325,-7.112391767231081,-0.9625806485298072,-9.210351517850896,-8.22809233018554,-4.974677714729923,-2.27108741288655,-3.8097495654186986,-2.8777599845489776,-8.589724351649144,-9.17275049384167,-4.078262544284925,-9.667454696852062,-9.07299943268317,-9.554234194246707,-2.886178310680696,-1.4080918980251544,-0.6330640632049289,-9.904046268580961,-3.0233776841179294,-3.4508344086837384,-0.39923362494707515,-5.026253711482969,-2.278157239988663,-0.3652236396483022,-9.159311372598882,-3.338665359764741,-3.367310862844617,-8.514705277990597,-7.46464164299087,-9.633855003071524,-4.776130078280831,-3.036114608488447,-0.07050090261674136,-2.1445630217148937,-4.4918938941068065,-4.501308060367362,-3.8388912874156422,-0.32920323355436043,-5.058059452668459,-4.980388568769443,-4.731538006579459,-7.014453910422922,-3.900310667345299,-7.806927335503424,-5.816719197812478,-9.204547781341713,-2.8483278152168046,-9.881521757128047,-3.57956277778394,-1.9193857692029836,-1.9573078915454523,-5.537999400125127,-6.140950612877337,-8.826251519870336,-0.3496958989837551,-3.2469385182160493,-6.734331067417953,-8.991018687097297,-7.9362315065811835,-7.70828624107984,-0.5188910859597984,-9.520814864674447,-5.580150499562977,-9.047660610958443,-0.27587221388905236,-5.105032143182333,-2.3758984972632047,-7.049528767050532,-7.963473834537746,-3.7646240024500632,-2.979333530164061,-8.342957441298257,-0.8394344633676121,-6.059182701802708,-2.15454054550015,-2.3171075616505465,-2.2236527794090444,-7.772503283946324,-6.976337344718306,-5.500294736636908,-3.8358299946900742,-5.83144346535591,-8.672177596632798,-3.1483408432575932,-4.579809226846963,-8.978288152549123,-0.7224937969959422,-0.3838111414936263,-1.47200875489512,-7.149444350731057,-4.39217955229873,-8.905109282489821,-8.08515920083556,-8.011097192953123,-3.8221299021243538,-5.1501684570913575,-2.0093933711993905,-2.2656815941970487,-0.75003038212335,-4.786182590961083,-2.7275034148661126,-9.092947783853266,-1.9403122205572365,-9.061762410671214,-1.9544250545583708,-7.836521322380781,-4.341771920203545,-3.298185944216081,-4.583157994521462,-3.1897733872976564,-1.776747215764387,-5.928395872010284,-9.857172371770691,-8.924483213679737,-5.0008749338032965,-3.6242831517916163,-1.55405968992826,-3.002250770209687,-4.738270379781218,-4.194200489477337,-0.42420090792983256,-6.806056205981328,-9.8273623251041,-8.05170987138867,-4.6757792116782415,-2.6933533720273917,-4.5217792835212105,-6.5963590372739915,-1.961092052949962,-0.5316235383113055,-3.4835750017853773,-0.23820840041685054,-5.8301248912670856,-6.17770452346303,-3.1077687607742877,-1.6512570037159735,-6.92635224014915,-7.682439793423286,-2.677635998080441,-7.5891579798567355,-5.744362518644948,-4.66236854109291,-6.191323567811606,-2.1414468053515456,-2.7979185620887126,-6.527537575989983,-6.297706719828962,-2.492555558708389,-1.582175440808331,-0.38488709703923485,-9.604589891623656,-0.9059135202147273,-2.4364116602827024,-5.8547940412292165,-2.551783297426866,-5.869306034498829,-8.859196809732401,-5.746529061482921,-6.829180886142952,-2.5487948928071558,-8.240142830796024,-8.72457362980498,-5.96151102066707,-7.667002902036375,-5.871240167907306,-8.350406818033235,-3.00528689450942,-6.957170846946856,-0.4039262985809855,-1.4722453512336786,-5.80950241923574,-8.205661620559342,-9.63298343500712,-5.064786532077745,-7.787430185955362,-4.504924595582525,-3.0093460420372553,-4.743907484085579,-3.66145814613011,-8.297535693902239,-7.726218247321725,-6.4382405346275355,-8.453770395506313,-4.2969001187861355,-3.9975631390067834,-7.93552467713228,-5.3102909203828474,-2.047201453616734,-4.67316846245228,-6.716638244608166,-5.789195634207118,-2.0396702638782016,-5.983999958764851,-0.5203496605798152,-4.3094553704592276,-1.1624745478345533,-0.23024279304204587,-8.92789289823078,-2.8737644929906137,-4.016159725702324,-1.7687676868997282,-8.832226499573917,-6.082800020876307,-0.1888655428086672,-7.6978485955406555,-3.5243454210317804,-9.769805367227509,-8.01382764947935,-0.6753722524059569,-2.120567791836452,-9.932678006226038,-9.887221723379687,-4.384349303428574,-3.2363191062517127,-1.7636089560601231,-7.6118537566863615,-5.8029509209421555,-7.981839325237765,-2.1142657253737474,-0.9616400482289977,-1.5974731666247521,-2.636008138307988,-9.480093659964728,-5.381585060324385,-3.617344883457989,-7.2807629837797645,-9.939753877385174,-1.8189032392437943,-9.830986844029674,-1.8182269722350797,-2.268554769732196,-2.018208314248844,-7.5557021808487494,-8.271420538258258,-5.5265038084638825,-7.190263867579101,-8.560855404740018,-0.008800224038874038,-7.681587501247556,-6.645657538601535,-8.494502591243592,-9.977694685831864,-6.689843573740846,-9.726215440209833,-2.259790711885017,-7.014631659134107,-5.402714938452277,-7.53875888844739,-2.540050658846853,-6.741502451406419,-1.338220003826216,-1.169548734234358,-8.739614302692427,-1.7654627371177645,-3.957214127214106,-1.7172732875212837,-8.950916189856509,-5.846865982599539,-7.732414769873337,-1.5995694655827508,-8.195964437563855,-7.988725350056289,-2.890335248363103,-4.189629314036267,-5.0001210248658605,-3.6968887696609065,-7.594036526868275,-3.998884665168889,-1.9779268798103966,-6.647678314105865,-6.291354085860091,-9.439600356969795,-6.29784912800292,-0.14658170005425797,-1.0084795776009425,-8.101374266433844,-0.5560944120788425,-1.6505743333958,-7.115082301969409,-8.441301862011805,-7.341435264359477,-6.942598700366476,-5.706446226643105,-3.026785559810654,-5.849079147000065,-3.9146867461264123,-7.137194648177358,-5.628318327236855,-2.836390060705558,-3.768234728289235,-3.770200530613612,-6.7658878610420325,-0.5693674541400506,-2.9882288764915033,-3.703308550099065,-4.242625352388982,-4.406447293337406,-3.5191192670138727,-7.040044415688477,-5.84907850370552,-6.2734262219815395,-2.669772440948608,-2.363198932284416,-9.94584322484549,-0.1319259960785235,-5.219043041019884,-0.07431349801169551,-4.241201170293214,-8.809975580874863,-9.955845899668159,-7.470242737637786,-7.90803350391442,-1.3869718280970522,-1.9839558617886865,-3.575623774390828,-4.935967594839228,-9.713503452996946,-7.53030933028265,-1.542154418203956,-1.5417750095498883,-4.599942213235739,-5.117184329817599,-9.588446914354163,-9.805049394529512,-7.545567645272873,-8.407684374490662,-2.7504769443039967,-6.013546617305144,-4.629326369520273,-7.969514184954754,-1.3286451383282127,-8.943858395286723,-7.483335816406516,-6.61645103619912,-0.5141643279577957,-7.9577205329345695,-4.845629403712879,-2.901774382026754,-2.5048267405809366,-7.023489243517109,-3.533111621800573,-7.120577893899249,-6.086528180829052,-9.398545381898348,-8.91259864056921,-2.334531175338106,-6.86749883668613,-2.9331943935867044,-5.267842544942636,-9.433077536771586,-1.3462723042908697,-2.3412694163669423,-2.3560527085122795,-0.49070975702261377,-8.14873297367173,-4.874701279747988,-3.8533346273430324,-4.805675452808124,-5.966225195418402,-6.048574154216597,-0.6589164390978364,-9.313287448401308,-9.371809390489044,-2.951800249279446,-5.7969449659195575,-8.649900850904208,-9.863082092867806,-5.120237917146979,-7.67106885271303,-9.612556011900846,-3.8267381974200587,-5.124213262450801,-9.57561324329371,-7.364991512437364,-8.023391618763458,-4.338895670232459,-4.888290087195402,-4.686463813820405,-7.416536373748357,-0.966392215406171,-5.5844765146491575,-1.6658866210083767,-8.545045583932918,-2.588040079345648,-1.5408187133656104,-0.7525840703982256,-9.107010562218537,-0.6473159585854837,-5.337005413720151,-1.3184223592285016,-0.6178552569870543,-8.382752319818149,-2.569189835681398,-9.553704508892015,-8.932446455297985,-2.8334368270986454,-8.870848152005411,-6.675361138637006,-3.5739799492791646,-7.56914015937703,-8.218364900235272,-7.261959381470334,-3.9236718235416146,-9.344123253278568,-9.798446835606025,-2.839038273513532,-8.864560763260421,-4.203063857845142,-8.149258948884611,-0.9107124168486114,-4.3961668012591915,-2.5539296124056055,-8.758689811556648,-0.9689719302414157,-2.1298058712933043,-0.5159271798487453,-5.550115982214807,-7.368353668536731,-8.848946758944276,-0.3646284756238227,-6.58784752960107,-3.0269852222441584,-9.409315390449592,-2.884184273636521,-7.869962074607613,-0.3792299876499783,-5.671733568716388,-0.7601615980996024,-4.598024134932812,-1.8495647158392114,-8.439229315039958,-4.016085306033348,-3.2377799470682067,-9.933752363460886,-1.8590145859012353,-5.0271028122781996,-0.26295546342147924,-4.458291614395071,-4.3877641352001735,-8.74146696859508,-2.5910008031778586,-0.9785608104673993,-0.7972796108391877,-2.741901192973011,-6.5090236430379615,-3.0531260676464567,-4.082542492375674,-5.616810456155445,-7.216611608207401,-5.391495604461558,-0.40554073517063083,-1.224029255054706,-8.604383102935397,-3.8573362290520885,-8.663852335469045,-4.51944970463817,-8.814897902602027,-3.769236226229842,-4.941613751470482,-9.24602460433495,-5.054103081421526,-5.625701490237905,-9.670427655821483,-8.23825878829881,-2.477976513933895,-7.25745131403138,-0.6171031056064513,-5.56755608461589,-3.724366038228324,-8.556801401130617,-2.779073398678389,-2.4398501630940705,-5.769550594062986,-5.33741006628752,-1.2677775789612178,-1.7363841045309503,-8.980654813347176,-3.926507648392905,-3.5906826033440664,-7.057570281455816,-7.104887417136034,-4.959634683468641,-9.313315788542948,-7.864555455514988,-0.028582029686656796,-9.878078065073215,-0.6555650267303625,-2.2552652333332746,-0.9675886588738369,-1.4301340399372897,-4.9155920058309555,-7.242414431704464,-3.6130283974038835,-8.275609613963084,-1.825089916923961,-0.8267241151438087,-5.51097593248675,-6.652806687633978,-7.307526216477777,-2.4254728783069113,-1.2893356832708847,-6.880136116229883,-1.0209249854554292,-7.614565718347648,-1.5271249145202948,-2.8999363194427685,-8.619931205155176,-3.9061262700894117,-5.269977951640663,-5.090472308848613,-8.22689735970247,-2.71325001864686,-8.115571582890835,-6.637374962440601,-0.3414517366166936,-8.401447455791153,-4.207704368244995,-1.202758652676268,-4.731152343132132,-4.155680993506639,-9.673864433277735,-0.818228375122263,-5.354496796461394,-3.420733817010433,-6.383676561603759,-7.137542222423903,-2.382345973041373,-7.644261363010775,-8.274379864510733,-1.124473277239888,-6.521515042029131,-7.481738368992725,-8.333942558753735,-2.0497227693755327,-6.320764352624629,-4.526685148381926,-5.118947435787349,-4.767807412053973,-6.321480880475163,-2.121662197718206,-4.809098627318376,-9.54989284262548,-9.573036434740626,-5.404628557834088,-7.697162830716109,-1.4504008743655028,-6.660301247710003,-0.1288919697345592,-1.528609330442794,-2.7513425192882135,-4.405072634975484,-1.9381830816437162,-2.0217863467650687,-6.581125662302725,-8.019570970339071,-1.9410676245793002,-1.7457595201138587,-3.6523498697942136,-9.68200655634433,-9.336028266158348,-0.5997435281220653,-4.119225796321855,-2.6619848803127044,-6.539715487757607,-0.6720905486443263,-9.675098330954196,-3.814078266695815,-2.4465068863671346,-1.153929449872062,-9.91933100339735,-1.663707191095718,-2.6918527915813195,-0.10475374482362243,-9.04384163600513,-2.312702289607913,-7.408604600677561,-9.87360874012115,-3.5181661967379974,-8.688528620714637,-6.226433034404353,-8.277353297557577,-4.782720006320737,-6.055297870793215,-5.357102846958357,-4.159110091584597,-7.923603763341651,-7.077836577236798,-5.383753338474806,-3.5052070652517875,-3.1530454152970644,-8.842433927536966,-2.163640203558579,-0.2665387419476306,-7.306230766378525,-1.15172231592223,-2.268066554829493,-0.2832132020333411,-9.534344886913814,-8.954774992483612,-3.9870299334929915,-8.184383246326181,-3.2047303844202135,-0.03304819896068123,-5.15003895438614,-0.15915442600221041,-7.748789858918355,-9.975878191198603,-6.419044540546903,-6.177309154160455,-6.808019131399849,-9.017260505254203,-5.862647299503967,-8.864414999566783,-9.082749763576796,-9.377256516579205,-7.123519912744774,-0.1115644449371378,-0.46720787101320216,-7.519203266240828,-9.140255134836151,-8.87754930658951,-6.958335753312839,-5.048970256745726,-9.336572129970996,-9.685751660414581,-5.956546466283957,-3.1558620346276633,-2.9689863559403418,-9.593228834704174,-9.521279347017146,-2.084385748656079,-5.367799678539294,-5.416277695562879,-6.51482753789562,-2.344509371638046,-6.240474753622975,-0.05453466058483514,-3.810119510485286,-9.761922777241294,-7.1776278441816395,-5.90351011056772,-5.317854912619014,-0.6213192518009092,-7.907471778777236,-5.089131386758838,-8.218604166275114,-7.298460563709927,-4.88862915103407,-0.30102274878415214,-4.2498396069604905,-7.818447676241542,-8.797443118685477,-1.4083135570731486,-1.205660331146765,-4.565025734038548,-2.1671074640548826,-1.5366984656107885,-3.5264723271601883,-9.205675177682117,-4.553798306489812,-3.363635324863774,-6.203412370699919,-0.7064466362755817,-3.63276147490063,-2.012592360241554,-0.3410867389416494,-4.039678260363773,-6.523095052077474,-4.070750790447115,-5.091589825768215,-3.3047540356836813,-8.19911207727458,-7.3130144093649125,-6.144508995672842,-9.944225884654116,-4.23165387558363,-3.586954366213646,-8.944247086135045,-8.27571009572849,-9.259094490938262,-6.595977303839553,-5.60864688221552,-9.224367798532198,-3.826501091030261,-9.667657486567872,-3.327456545888885,-8.303797060024554,-8.115701174715465,-9.189067764729796,-6.340570302563977,-6.7217509830460065,-4.1249111659239945,-9.380483038525163,-9.45414790029844,-8.528084802487568,-1.7000768707655922,-0.18627623522887715,-0.2659124160437165,-9.622817469687918,-7.216507638015757,-6.875046112639238,-2.7886920359510348,-5.29760818239841,-1.3937533529738633,-6.984594688571864,-9.197158376054437,-0.026820927531137073,-5.1056437787707765,-8.220283421894912,-9.523730013414415,-4.247325216123352,-4.854017640685244,-4.8700253857430065,-4.371977031173997,-5.696776880041181,-7.748601841324079,-7.424776139808749,-0.7959596430590854,-6.819266835725248,-9.408588717797649,-1.1246961458140126,-0.05682019598918897,-7.75740810695863,-9.626677656959883,-7.987133085838105,-6.6924776624976605,-0.7101203098010811,-1.4051471812631444,-4.320413775852807,-3.3206494154984445,-9.04221578693803,-6.733637008108888,-4.5726057816982095,-9.928538679691652,-7.8990209887372025,-0.3859846094604169,-3.857075475022651,-2.4774672320942193,-9.786838924185705,-5.485139882525292,-4.577502808189948,-5.575678651902603,-1.2100741773610535,-0.6841272821839683,-1.671172442071851,-1.3242926583868453,-1.1723026096017408,-3.0032241812068716,-0.7730392682677434,-8.83648067465744,-8.867113178376036,-4.805181137540679,-1.7095219627934921,-7.756645117410736,-8.019013253473926,-7.368751280568802,-4.4880455396026075,-5.694148586712462,-2.2482302419213585,-6.105002633402384,-2.420466105571757,-6.929709777429906,-0.5707812138003376,-9.807553680527924,-5.277915385251388,-4.565442962619755,-5.8050863737125935,-6.921473078990308,-7.471161808500639,-4.853991421281076,-1.278295979785502,-9.676934522117108,-5.586653218906048,-4.711715752282211,-0.5558799624394584,-9.47271963723528,-0.37985906448093854,-2.1468771496483963,-1.8898509822483556,-9.35064027293501,-3.0940392910321,-1.0243952753283936,-9.682324543299183,-7.50618860298985,-7.51011600408016,-3.428863772721513,-9.486300772271667,-1.425979331472349,-5.876950219748725,-4.020898283833065,-5.280804096816216,-8.653469108574875,-9.879884729438185,-2.481350097580741,-5.898056021603151,-7.128618522349257,-6.626715176372184,-8.004421121253804,-4.304965564189649,-2.394568586625634,-5.408331862874642,-3.398064827584324,-6.79767039805885,-2.0641935945203427,-1.373912169413587,-5.967224630805208,-5.635486394248903,-7.391652992723365,-8.81221425821617,-1.63545014602126,-6.308874430936475,-1.7798449070936817,-0.06790719943852386,-1.0533109394351015,-9.728835153070769,-4.029997812793544,-3.3510937623687043,-4.195660871401801,-3.788446005301631,-4.0411249194828684,-0.7769727309833874,-5.9233952520042426,-5.933153012945882,-8.951187355943123,-1.0618173218508709,-9.024632130569852,-9.500199778347643,-1.197281774118255,-8.571842473498538,-8.339560412446316,-0.22015922266691357,-9.659564077799024,-1.9036053465326996,-7.369854608645198,-4.254340165248078,-8.303999849170683,-4.856638180789696,-7.881580073833778,-6.680194526320163,-5.345075369866477,-3.820559248543116,-1.735376331802001,-7.865668495290549,-3.1690621639909233,-5.658012922509068,-2.2523904080730617,-0.21554105456274453]}
},{}],129:[function(require,module,exports){
module.exports={"sigma":[0.31787592863806613,3.133949857150885,1.5842322208891024,0.22598073349880066,3.702267711304126,1.4160843522471256,1.0752315965918358,2.045499392323898,2.170773423641439,3.2679713674539768,1.3061868534137744,3.54408736660613,4.213105236910183,2.6999816445513733,3.0071995688508366,4.941346072812389,2.073197545384835,3.6942423283369266,2.19784699981012,4.60641339059864,0.21241305172236102,1.198229990488453,1.008445374732484,1.7624186200845926,4.485729730332903,4.118008929684475,4.656829623162726,3.350004019880447,0.10854848039869691,3.8912226953347275,3.8267578675117795,3.857704899849801,3.9143498223001494,0.7295692294077816,2.3036740048678084,0.6622540615771233,2.468787279850001,3.9308601260717504,1.3711649034779794,2.437005621974242,1.2126054933848718,2.6086760666960607,0.5619254303997878,2.2233776318457,3.3032265350319454,2.3792579022686065,2.2955152198984328,2.9836266346215123,1.3039211848185461,2.4781575584971884,4.808984359242423,1.3001650947093923,3.2140066013210156,0.5369972094128495,3.6448386813451394,2.6522063646823346,2.402987171543749,0.7949936057091667,1.2137992976676126,0.04736606691683187,2.9490914542187174,4.145730726255197,0.3448758345170977,2.801409198460485,2.277065247944172,0.25965159505473956,0.5058304671256375,0.06679889984314791,3.519808176291528,3.2470375843492083,3.00636757023635,2.697360649229752,2.83312356455066,4.730665984560163,4.313980470341372,0.453666247526584,0.17417754738282776,3.821348063226968,2.7655417543351324,3.465670915605499,1.6463021355355478,4.096379736456939,0.9190715543551564,3.0959985076698935,1.829909364580643,0.1711634703907583,1.7814792307626037,0.5495317006141565,4.454393307143903,1.1459691094485713,0.5007023434580304,4.697200003890791,2.6799803896414467,4.129799526183921,4.812744611712184,3.756107791161436,4.731454990606561,4.722385433099512,1.428807551786786,2.9484469547660197,4.8863361150181674,2.512441795008038,4.070763348228335,2.1643703217664556,4.366681508482708,2.9161847038952504,3.178647797230052,2.733023116896458,4.823831523327412,0.25519821645716867,2.7150548490998228,3.064097578109417,2.390181058758815,1.6628502675745849,3.0003331869498195,2.310235512453742,2.949140459077922,4.01679493661835,4.193995796584228,3.6404104571360008,4.078373729905273,1.6023811153655831,0.13945480511371233,3.0291772273562345,3.920247787427927,2.340267601778805,3.36580942029944,2.702240718206319,3.534109226323973,0.37209688754395454,4.121221746988094,4.94777634306799,1.3289574016572536,0.5937178661656783,3.048817345654904,4.38517946345984,1.8768367954982168,0.9666529394107215,1.0799828593060523,3.6224098380263747,3.3790519202072264,2.6438351513527625,4.190486280663181,3.1715978999014114,1.2979158858100315,0.7059065347489035,3.4700649114033943,4.194306884594244,3.6849398972372613,2.27830819537869,3.957207954559443,2.986776604211002,0.4782542283685032,2.432592445283026,3.521992050418725,2.861388113924488,2.5031319720910905,4.141591817348997,1.096068809613795,3.6266928800257823,3.857944194568547,0.637286421830533,4.464467992597796,3.1928122070039553,4.144268250162155,3.521544609100552,2.7838294576964806,1.8607224124290211,1.1339967739104784,4.582716856869245,0.332844906158436,3.2511951772658056,4.796555412643235,0.779310052788933,2.3801940809621778,3.5178221750238237,2.4444549134060587,4.870171899206412,1.8830973120035388,0.9879337485806572,0.8245738947020409,3.540943387813593,2.573800387450873,0.16154028896354533,0.18543884434937152,4.195709960721134,1.6383921194515527,0.9270088057402825,3.4800118984417194,3.8202108415432425,4.010770828869425,3.5252232834410724,4.660318024430276,4.021466368542491,4.1347168667298115,4.9156178925067096,0.4701634714298053,3.889959897012986,1.7552572889575957,1.2989166182189193,0.40097374378758266,0.06941202071551578,0.651171310102906,4.001464467360487,4.14284030079214,1.5041576373485077,3.9703100903680633,0.9540013987869445,0.8402065322290297,4.317297730678934,1.8200589374838205,3.894538643656472,3.627502346808088,4.282302788691116,3.6883667190747693,3.380364586500483,3.591035826266833,1.999393781658747,4.299358308393567,1.4165578664489586,0.4057010355334989,1.717874749033843,1.0349605923761718,1.567307959456451,3.499154989655504,0.028720101921191343,3.016904290960567,4.423883191983863,4.8115763229130595,2.955908938906741,4.530971462913556,2.7201168333968506,2.365670630834459,2.0863439520044134,2.6525571451089522,1.6165373217070589,1.956359043393694,0.3556300133985191,3.243875248643163,2.7526905960400683,3.452901806645005,2.534167020427528,0.06704097045074797,3.2484522219651177,4.326220997007443,1.1955226378917827,2.4162599461704026,2.435885942716265,1.1999651868757044,3.7494294597564615,2.970678618149609,2.171080994421203,2.7005441181719947,0.8054181656906312,0.3401038074870577,0.18556361096311091,0.6263442674247932,2.0120100675606647,0.5875260930280235,4.912255840593169,0.9306399004739785,4.760913620355156,4.551882328960387,4.749402978873528,0.2201902438228609,1.2669234023684928,2.337656863863903,0.4182531161945602,3.1732633896193874,2.9445825186393018,4.482218730127667,2.743853182366337,2.3504538615808377,4.645784139627123,0.20291663666234694,3.609289367086684,3.077031764092725,1.1330142520167852,4.537919296331342,3.849571014208694,2.8746603552271086,0.14644876281844854,1.4476873624357012,2.3011696767643652,0.919695146404349,2.8762780289670378,3.6428872642900814,0.34103792638468966,3.5927598225402524,0.36104430614353533,2.5542688567899683,0.12598488492527316,3.867470355444672,0.9410140996093552,1.3697452789132025,0.15700855372325906,4.901231065855392,0.9660469210524214,4.783611425766308,2.8309595009159816,2.1446597206843734,0.46061174606619626,4.750248157715575,2.646891943396273,3.094569556356761,0.8120948001911166,4.236378312256617,1.4219841599482497,1.1066624801014235,2.2259267826035813,3.2781225202723485,1.1526969418502697,3.7012801238394886,2.5542135167015223,0.09571191876436513,1.2921362118158652,3.8442876245633784,1.6491618750434645,0.7521262074100621,2.659991828457944,2.2383266713448737,2.4062002319972953,4.417488730950999,3.597933008622957,4.1592353442103915,1.6983507852632462,2.0558035213169887,3.3175736145493806,2.824633196868831,0.42312740702139306,3.9151409137945126,2.464806747642465,2.6052824207446434,4.822525893954265,0.01984752585833305,4.845337005058537,1.6761491732006961,1.489884235052471,4.1621648012403565,1.6109006277208893,2.584005515658295,1.1875117321052908,2.259066722460825,1.2530817802572725,3.922817148448398,1.966653849017136,2.288560307104439,0.4767666090761513,1.2583984361064282,0.024832605912378236,3.7204910632015844,0.9657056940415432,1.8108835404409296,3.359907300230507,1.5879060605847217,2.5858704285581546,2.54822615521456,2.646109239946149,3.901063261943827,2.705151482481062,3.3004674400982847,4.49185154313346,2.561666295738012,4.901679993205961,4.559179646664885,3.3545317156604137,4.59821953539026,4.0431732593869345,0.4701080855487172,2.7882217883701275,4.677549066054757,1.8199274889590866,4.462935669897772,2.204419018555941,4.310144927067495,1.3157722002165517,2.751187467738619,3.8754417867002866,0.9012243296552069,4.320989712972295,1.7944719717419977,4.014000607712659,1.8744011653863846,1.2307465298943232,0.34151173996010753,1.5733997236414499,3.135570082009922,3.946394508899819,1.4605509655047855,4.281302951445516,4.654107072176023,3.104305303038192,3.6565795583957295,1.4429560129232522,2.1677913629854384,2.033951653763102,1.6091945104457273,2.034613116439937,0.8943945357483507,1.0557061646944699,4.109256147850845,1.7547071634330125,4.946403104994489,0.7048425221262666,4.110205040489464,1.0519539398536293,2.413710761989506,4.648824751737809,1.2850679818287747,0.9318385291314368,0.4165135631888828,0.9523808734349593,0.6780735711005315,0.3066975985147835,1.4827410974220112,0.2925142070909803,4.965617537138919,0.5663707206198543,3.6652851450741366,1.5892396100101491,3.720831730088856,2.316938641092171,4.8492382395234905,1.0161823693254834,1.066096701512188,0.7721051434915782,2.546710531244668,0.3659932196581561,4.335914045212989,0.7240290987945741,2.4015664539806902,4.953191432810517,0.5225644268773477,1.4100989588801116,2.4715044209827264,4.975925921071916,2.847384817456655,4.670646327983774,0.492662473612806,1.4847158562085305,2.3750962392898556,0.04701473996572836,2.505179877815138,1.918823731815611,3.4963651846333246,4.163713524849943,0.8774839172841897,4.760829062231408,4.105949975722626,2.0010911113141083,4.009664931941696,4.291331536135355,1.6622501778743037,1.8588356461771005,1.746806564834995,1.373580037285046,4.2638741601713654,1.1965034671233687,1.2637020460012494,0.7347973768858118,0.15553800552417396,1.5538531776565156,1.345218477383009,2.6363346368755938,3.4869817225423585,1.3110068190186774,2.2486167259991263,3.3819663412201653,3.385714374216052,0.6579559921947842,1.3237043097556878,3.7167848997583364,0.04987597006946065,3.992999745901221,0.6181282910586394,0.76902358171001,3.456523983547124,1.1682632457476094,3.5721036451324775,2.3782778153541706,0.6785971208411157,3.002973307872515,1.0490418633956666,3.9001861185969733,2.8933504065888993,2.7693952226527694,3.7445247960143213,0.09635815703040729,0.34983409319434333,4.485252505087336,3.9451591949521445,3.4766961430321963,0.28039799796248266,2.3691396151195776,1.6675594682438544,0.5037276142877667,1.1322213779094614,2.031077980539399,0.6734818963141442,2.8557322553640843,1.7273726400805112,4.424674223710861,0.09466343569578095,2.379480597218757,1.1956058003908232,4.086037037203312,1.9330314881413768,4.078833744093329,0.9443984821228069,1.896129314783238,3.0190712334013305,2.6952308390412796,0.5739151764162032,4.533733726412912,2.5971139964893664,1.0687095187384488,1.413765300596087,0.70888445933175,1.3646998759473838,1.1759620815787775,0.6660730771185241,0.5090756459101808,3.8190140681452345,3.930364773057481,1.2938080393540707,3.4077358011136685,3.6944010101195843,3.936847524017417,1.3506296614320523,1.6646340717332941,4.841674456952282,4.204474134862903,1.4839373883330254,4.472167402746972,2.7659939595327785,4.236401125979803,2.1277509216452795,0.318097942683937,4.11881902335057,1.1291936630827504,1.637839302458547,2.2347557168813106,3.0960695302994203,1.055491553819422,2.826696456637321,1.2161352027509131,4.285665223196405,1.1332064976838796,1.7677801814476979,2.4480407677002827,3.897078456955044,2.7120218675720165,1.285223136879634,0.5244290024994036,0.27557599582129444,4.723464151543362,0.6439261337086932,0.061177584762027726,0.4822760622181699,4.654803251057769,1.3378701045149621,0.019865386247155392,4.646216919147227,4.832254021822654,4.964298486898219,0.2470693436812199,4.124884225913546,0.5262487035115371,2.211729233049957,1.6127555382145131,4.614432565212634,3.2617313869228415,1.1586332539520694,1.2090467345945677,3.709567883574688,3.842543716127552,1.1543840109665626,2.0126590483519227,2.6209761287849496,3.494700978744447,1.8520514307628588,4.300812533949348,1.6035158048446474,0.806063077982514,4.65644253916078,3.331747625701371,0.1412337521866991,2.949190466626721,1.0132286320124317,2.9350740378089366,4.732224358189846,2.235083532181048,2.493933160891765,4.0251398627786825,3.0102791528035757,0.039133006930507364,1.9607431821225085,0.8624148512715768,1.3801933670494326,1.307300702275478,0.2156160971197818,2.78108314737719,3.6670251966205503,1.7223965896364535,3.204113262937317,0.5546726892154774,2.6404180928544942,0.7418933546126061,3.547897044057059,2.8804462990706914,0.9245718629319599,1.0303127651725819,3.3537961120561324,3.6412332969969805,2.783175988408857,1.8345833724516014,4.82055664102441,1.5136327963708052,0.330730114999509,2.836955466909595,1.0039270965454983,0.39425841696906994,0.02401122866362515,2.9057013756598984,0.3058026168839634,0.47238675206397684,1.2321542124714424,4.604224586959821,3.152916100622196,4.384988571687597,4.664334890966031,1.1883521806648278,4.1898654402396405,0.27473457416217983,2.073169749646586,3.8173625663692845,3.666664862436747,4.239379191518873,1.4477124017266862,0.5678825315814284,2.1729071151807267,0.7865002513757979,4.207093793622069,3.349624621640076,0.5594961968588485,1.7022429256174187,1.820256976894773,0.6917010001369273,4.247907358185032,2.3425436286899193,4.9089228327920456,2.2675959225542464,1.4659787027229454,2.918277629004291,0.08248360350630701,1.238525831827042,1.2586344618022594,0.9552115369259029,1.0942104714225842,1.158765227299604,3.5337374207620256,3.495502412720576,0.16273842555127205,4.680886272729216,0.3338061919492441,1.0145526573128238,3.5204958707250666,2.015752863211456,2.7077444684140053,3.9717868022407,0.988729314774609,3.9453497621262157,2.2892630176082074,2.833379220288025,0.9229181272817355,0.880872679056075,2.3796816333802626,3.1276185727149155,2.885413610405018,2.037668931576506,3.7105608722124273,1.7478786941863822,3.0563765101944016,3.630833136091879,4.468192338740425,2.7566811848948536,4.131986504892684,3.9685355683296453,4.063868280072499,2.4510509399860645,4.135956255120971,3.004119420028315,0.3891214850782254,4.637790326283039,2.935572267381905,2.7640131480316574,4.682500134825746,4.425682205282712,0.6036588866382453,1.7650550421736588,2.9357703152097523,0.37427242795092797,4.146479433155276,3.105986658273303,0.0230980729549235,4.774332498336244,1.0183248352001562,2.1322113634147977,3.836847522908149,2.576665566272615,3.0019148750251947,0.03392861884884746,0.7346233365834787,4.594838913526777,0.7733702302781975,0.16826511955793655,3.4778176125132387,2.017247133208121,4.828880117384666,3.9711381603641938,1.6678640045897608,1.0428482851934195,0.3964594710166136,3.2637178586990165,2.2497450936762196,0.7261454532295353,0.4916565852070576,0.07282172734279224,4.916328518971608,3.4235732781114336,1.0672307564762662,2.748046435240977,1.8057352414265615,1.9506983508746167,1.5406584443177307,4.7920159451675435,2.5406131055416594,0.9102568826773727,3.4815760115930883,0.07883737397924362,3.1170243892720406,3.844118197232839,4.703956356570628,2.539594764903991,2.176099152389871,0.08433462289695659,3.5836491772153534,4.290780131719906,1.7092068337597621,0.15908133361283383,1.0829823825988194,4.77231805150777,1.8444070207659224,1.8348951050565787,3.4584072199884996,0.9660281423143302,4.132367402155774,2.7034989210049467,0.788462515387055,2.608099724635423,0.2793391596377437,0.042847856652138416,0.3219823980225689,1.895082468180237,1.561652791475172,2.4233181429582586,1.4408039498289227,3.808108154440105,3.837931094239887,3.3554959774523594,0.7875443165302864,1.5283254844760663,4.075573043713088,1.4353151869149083,3.7528749383642266,4.572397062701951,2.5515495098840493,0.5438631283363526,1.8466751453510666,3.7228733339885878,2.8938612433874757,3.823041705165109,3.007875994793754,4.670479833066111,3.1652693492868513,1.9393270536631757,1.839667079644095,3.784725628839417,2.9547575952126115,0.7282790966385966,0.6545075557912194,0.14384954240307612,4.504542032153399,0.18913301002306704,0.7142563271080038,1.9780948234081686,3.354576531349418,0.9172547295563627,2.1578838664604696,4.399568320194471,4.613028629007978,3.891014509430165,3.1393184041413424,1.6626975558005375,1.2554936230181435,0.7716505901308957,4.443434918258438,0.46271592588615573,4.064720976945898,3.6301481074819284,3.4954379231973096,4.727118522497744,3.8020783435668557,2.92360609653867,4.622437723357238,0.9092741774570701,1.0518343674002761,2.829932172484142,0.44381527470591653,2.6696346937400497,1.908409659903767,1.4173016520806048,0.8018248136690032,3.8920123196280407,0.07189911016824202,2.387074312280176,0.8494477940131462,2.004253273249834,0.208326493211074,0.14840148075487614,3.6909059404332134,4.019208828961891,0.4983842111667658,3.193279494047554,0.3309606789482966,3.246338672646867,4.011039824851359,1.2911554649859014,4.398213072031885,3.9897466863445064,0.9774368062981686,1.6674369103741127,4.767607803201795,4.582162824902888,3.3562553507850756,0.0444887044503095,2.3447107750970297,1.579364703344187,1.7591857128898558,1.5583290894464064,2.856067567629339,4.909576224849275,1.2607471382086732,4.937771368169107,0.2584478374964272,2.096715349533671,3.29148243056809,1.107843962055759,1.6735006290346466,3.5047383386183615,4.483195734305402,4.657748895145405,2.795333038737896,0.15770343379559515,3.8036627426867664,4.128240517202424,2.7228057484215085,1.6251181650994784,3.260134065881213,1.98922637499918,1.3033130516784752,1.8022661191601541,2.6001178783171253,4.341825560672968,1.2163923601406634,3.763048033260742,1.587470761452413,4.08341411197318,4.983172450736576,0.35414750206344325,2.040822097398424,0.8631274663388677,4.539760663434781,0.1770769973505848,2.3148960475387295,1.4460716216869707,4.618167794241149,4.991422064886546,4.643890587182094,0.5433350215758437,0.596164356752058,4.2953130313838965,2.7578069932267657,0.8125229189774574,1.3670205276812464,4.361899411405256,2.0448882496074305,2.376502205127297,0.7029868105088966,4.150689760945273,0.8207389278996602,4.46297873198743,2.6194420427699483,3.0619809004196408,1.7429728666502642,3.019272198979394,4.803004914960889,4.740301356583049,0.26117283767808197,2.0627358625579593,0.31394453892735097,0.26395705621025334,0.13837560368932023,3.1709635521999235,4.8163291983834995,3.6476282028058593,0.3252845251148784,1.698976661848628,1.068057478065152,3.2613331605416738,1.5103771175690894,0.5429248662848263,4.618901626867087,3.9390614595541873,2.403426128608145,2.3900775694861007,3.8307628925671944,2.452195764419536,2.4548824369097044,2.6551583844218154,1.032418411942223,3.9404740582800404,0.4699373882123181,2.8039424327799987,0.4615059227223861,4.447121081279609,3.2219060893618634,0.8717451271950571,1.689661786875989,1.3137694134950706,0.5019906706406085,3.457390889182992,2.979184140990009,2.5274665431753496,1.1305363764433995,0.1672155115001417,4.745207230142919,3.9612684281298827,3.9725790524859828,1.431603426937984,2.7499482962661492,4.46193626460837,1.0778863926647375,2.403814619134752,0.02410752547401862,1.1707814497228541,1.9395604704914304,2.6378239778402737,4.677629166191503,0.7581188491942825,2.282261138638627,0.5091777802715869,4.7745347591844345,0.8477344987304147,1.5886973809887184,0.27873755447519244,0.32280526815975263,3.2622733303063054,2.1859571970531775,0.6387575399663303,3.7715406709432067,2.982198534000199,1.406677779531953,3.086289156554274,4.324882614624121,4.573220240375684,4.720845920822913,2.363074350465163,0.6071571193092851,2.243217296387151,4.780172562831266,2.1718555691208783,4.848519128087256,2.38696786210049,2.9046490641594467,3.276738504664203,3.9508173302158625,2.6062751231354495,2.7303271032467293,4.247508724114447,4.472610031804706,0.9065079281684973,3.0116706327292855,2.0951831370957477,1.9564835657873747,0.1725756283813351,2.622831207929359,2.1252934760007545,1.519856109962402,2.593907826510784],"expected":[2.3355649168984623e-172,0.0849951504634509,1.9540127720380466e-6,1.4027805403298822e-5,0.0062744338585401455,0.0002550511942248593,0.01892622510807953,0.03303498975789041,0.009555322762605163,0.006524478207579944,0.00326337661502909,0.07154378226545241,0.004137603997740759,0.007652722571743295,0.049683082124024294,0.003428749740562814,0.00502949499929994,0.010882083308828772,0.00383446379700017,0.011597670172345005,2.5722825385125356e-169,0.019980772228423056,5.832831926685621e-11,6.225782010875743e-7,0.004454075736190463,0.001597961433785998,0.004718609176495842,0.0035206407416659116,0.0,0.005979826160022906,0.002407951070205236,0.006288549400520696,0.003245833508254181,3.4157212479603747e-26,0.013939548723628084,1.8984820085549957e-44,0.004864888232170924,0.027829823433123724,0.0010605619036414891,0.05316853587135503,0.11479918771650102,0.0003037820404805751,0.06081805907431375,0.055170186492946686,0.007243404092382818,0.01460944001449114,0.0021923462238560986,0.00862101850286741,0.015828708038760894,0.009450650040056416,0.0033344079743294584,1.543193530995523e-5,0.012838364378426106,5.6951178663852224e-5,0.0013934944772323508,0.0028298570004557425,0.07958647444727579,6.191679284889895e-7,1.0853520661461771e-6,0.0,0.017121710639036062,0.007339799752769956,2.4350797242011995e-90,0.007458492596021921,0.008083343237577966,2.4573900696281972e-239,0.04086992686996889,5.8867129148776264e-238,0.007533777936379631,0.009242466419913137,0.015757250784080436,0.019175570726181628,0.0012602195567367898,0.211036487379483,0.00517679380236556,0.0015499802296364408,4.707355328178587e-282,0.005076482326012289,0.009223856426651427,0.006845859430230385,6.641088075055724e-5,0.004781369931453949,0.008051147105409062,0.0009115292181911702,0.0060152850890328605,0.07973024867890505,0.0002952960781577489,2.8882451845580255e-6,0.005188116380070227,6.075984595602999e-7,2.424359763959677e-39,0.0028918045316874245,0.17311313910920373,0.005575030480174377,0.00830162363057663,0.024989275023402296,0.011232827293294318,0.005744647201558061,0.010466143673502246,0.0021080508299972513,0.004454127354209122,0.011115876279785997,0.0017959359526532536,0.009804043353276429,0.0018316459865348677,0.007421075999631993,0.007073325104517056,0.006531032003270257,0.0031316497516698074,2.0676220653707375e-8,0.0066442894037976145,0.0009122229004393336,0.010790249816808206,0.0011384653847994447,0.0016123335257439116,0.018117948869058233,0.000962763493562195,0.005023249838780848,0.01070848564719915,0.00986889320879529,0.01802472709016841,7.272156524169565e-5,0.0,0.005569945222454673,0.0036644366422300834,0.027584358333410313,0.008478533651091783,0.008495837270953224,0.0025371061767686235,2.420577907691603e-7,0.0059429003028254514,0.003506702512692236,0.012959517395477058,2.4219670420112207e-14,0.0009333130401544127,0.003289588369734015,9.057343244997984e-5,0.03058540975414918,5.12540230108959e-9,0.004514290716227941,0.00791937912422776,0.02171969810729584,0.13540831702381764,0.004256521064507923,0.009253332162254133,2.5001652918511677e-31,0.07947230915929047,0.004274696774558955,0.0037703317497714338,0.12318500736776192,0.005415867912626024,0.0020972722686277137,4.841888550479246e-28,0.009599517431348768,0.003801918931152191,0.009401094054733482,0.0005172374338071051,0.004797188067142262,0.028553634129431738,0.01678425563851355,0.0020468480644145423,0.03186044107450902,0.0049994677394920375,0.004270998099939361,0.012706939679907835,0.008315814479222874,0.0038567276433735752,1.3477693005560592e-5,0.0028180501707311006,0.009873492382893296,0.0603915843837419,0.01779369681443207,0.010316671423349924,0.012572882359037585,0.002520540876101392,0.0019883038791681366,0.008815267987522286,0.007586029024757824,0.00015223628330304575,3.549480343600644e-11,3.2241304417301444e-15,0.2868362403232342,0.0007223987233600725,0.2218984568623128,3.03413136660584e-29,0.010377025289855393,4.812992581581487e-6,2.500845038455321e-7,0.04304918749035901,0.0013110856561976737,0.003203072030857668,0.027623583395593704,0.0038127671265264134,0.008853300188778833,0.010336917101923151,0.0038954102694223705,1.6457473558431378e-13,0.020624532116896632,0.026026324930798116,0.0020274514595615255,1.4682887402119015e-71,1.3989787402856118e-36,0.0011166729881506153,0.021341148422465327,0.01149810727265719,7.909490271916171e-5,0.009181288861663231,0.02175699543913135,0.00072332351968563,0.004697956287739726,0.00032328294028620706,0.0038491308219082134,0.001569700124853576,0.14508394796234494,0.012621732399365688,0.014641465219850144,0.0928873585810846,0.006499597862070731,0.0043366049403682745,1.8357022766248527e-7,0.0307977756098862,0.001296593313810561,6.002877404135181e-13,0.009763088277532786,0.009247670666875887,0.0,0.004747445906418231,0.0016886825848925564,0.0066032962285289655,0.00362341206318491,0.01316353286318952,0.03273162135055723,0.0002435056820621625,0.0043242032605555775,0.0006152192809388225,0.030863399919985598,0.022738989889656797,1.9075134572274142e-125,0.0020065135798782103,0.002760976792986709,0.01791791034439397,0.00813373886403968,4.8735609483085356e-29,0.006019852920403324,0.0046072349300081885,3.2024141395280317e-10,0.00037595554104222906,0.006825544843715688,1.5179026637524815e-6,0.002987521004137473,0.0009048835534122036,0.006307333328353663,0.10494766187405562,0.005379399787215247,2.0964882840090968e-102,2.468985386128204e-23,1.5949378836371792e-29,0.00012185548718768563,0.004048715147530023,0.0034378420801611477,0.006699695223881233,0.004394423796171944,0.012923130542260396,0.00197800021745489,1.0475307659049786e-39,0.1061050214499345,0.0005778737780590684,2.1961977995396583e-9,0.002319051155375455,0.001338465731560339,0.009473376807998937,0.006986288601640399,0.0014242937563474078,0.012745097638507747,1.875517845875003e-15,0.0055229618204187475,0.004149536037672969,1.1847926835085619e-6,0.007848740314302093,0.10644413244916774,0.014932573187032906,1.8310883663303946e-243,0.02409390380136999,0.009110572858000276,0.007013528396504357,0.0004977722999087847,0.0012964799594942665,2.5292035995107385e-92,0.012003752587114724,4.197250120133151e-71,0.003037445741831657,3.4626471848232677e-121,0.0031459759079527478,0.02563856984396121,0.055769490532594404,1.1556730863166117e-5,0.0035135131169036072,0.0014397550130112622,0.003581521541506152,0.001912583240480804,0.00835818767628592,6.178014359671638e-40,0.019586556940111844,0.0013820234132639812,0.0005583170081981125,0.015599484775486023,0.020722814895475193,0.00256567143534039,4.3197402497479574e-11,0.0008654083487878528,0.006841582419372779,9.800794138575948e-6,0.007768461291318035,0.0004242888262392495,1.8425279313435778e-5,0.009465886674956847,0.0018976484421389748,0.006135913581295972,9.303210432947958e-5,0.021148667237579043,0.1219970419459959,0.013671129145354698,0.03563369494541844,0.0027238134863860728,0.006491049378446759,0.030298422749592987,5.439378853063261e-5,0.010019342641583627,0.0037743401401818693,0.03222692742536501,0.0029023801021853934,0.01435593768772213,0.006763002897362604,0.004773529035307924,0.0,0.004054082629329016,0.012587795648277144,0.05819623329402782,0.006519017557428028,0.02715972344364088,0.027966931274844117,2.3339379376779057e-12,0.014105433436563761,0.00011256840035302947,0.012771160084165884,3.267363732730738e-5,0.003957526277503266,4.093459100949457e-88,0.01695080531983822,0.0,0.002358062380117963,0.0075728994985448635,0.019358120739351354,0.04118313006805613,0.011564944401883858,0.008452542644524505,0.008602089732215825,0.02311895539173971,0.019469167391745777,0.02377706015189947,0.0016902201662957392,0.007063975166659479,0.0096603520359812,0.004509672817056606,0.007725956818325133,0.0012357890976111615,0.006525435799251614,0.00319345523883909,1.1846935530950202e-19,0.00080121033842293,0.00811369634978713,0.0013052928784276995,0.0121388935454901,0.014356099698572617,0.10915297413222773,6.703792308338954e-6,0.000513670987875907,0.007141620632210336,4.2932355562270984e-13,0.002378256006990792,7.018493748021946e-9,0.01575300480301943,0.05295614180937698,1.6350325979724595e-5,2.477502868586587e-21,0.0025904417666739008,0.0012498391280209868,0.0032486699277720576,0.000134049804407889,0.0027183041562151536,0.06480603862289121,0.15351597676965908,0.013025191531598104,0.0031711697281556744,0.03407802066985634,0.004176381420254021,0.0036357934674815695,0.003156963110286972,0.12888410661335178,0.0003194256921791076,0.005304792567521776,5.6986760733199354e-6,0.005010543274873243,0.023279316766068498,0.0050233619547209235,0.01933461290468031,0.003293108031301976,0.007757320546794302,1.1291755272475576e-8,0.05228910438441545,7.315602626213278e-8,2.995623989314387e-13,0.0084576416831485,7.781413761815083e-105,0.021774384720183875,0.01290081238568748,0.003794433281092612,0.012822871430330967,0.005634241858183174,0.00013739336589337525,0.0014936761242380708,0.0012752039095481546,0.0074774468512307435,0.01731137245771891,7.113157834024509e-6,0.015476413410843333,0.041429436069974054,3.3085650727001185e-16,0.006326237915785708,0.012273606012931811,0.08229678034647289,0.01929026546861722,1.6544064052549907e-15,0.009569763792388013,0.011159996024660904,0.023988500789626784,0.003612768196619415,0.008858869262265921,0.0015651878515534064,0.0055775375357957095,0.0002302583843983952,1.5444927522747932e-52,0.0027586114381425134,0.010488903920357047,0.03358934486986572,0.011644404678891395,2.606186678154382e-9,0.0092676251076607,0.007799512674315544,0.009559709059285682,0.016209443929978726,0.011224839342644222,0.01645703122857222,0.002708098220296821,0.009921389857318628,8.289788862572734e-5,0.002568906244243801,0.0327573047499602,0.004218892285314737,1.8640344670763353e-8,0.0,5.099224058934318e-7,0.006866008822769041,0.0034556479974942864,0.005313966294243857,3.5419688766482263e-7,0.0026586835102573713,0.015204656931182592,0.032884857255139475,2.6186747405494005e-8,0.030906914641716427,0.006228407226704754,0.0,0.0319818648946028,1.042991219724057e-31,1.1687873453467517e-13,0.0015473658821747018,0.060993005175616254,0.010403924905143785,0.04219893060059888,0.032892217914066484,0.008076225124076087,0.10078460680624066,0.005242024856185467,0.006296578012251409,0.04865685339590842,0.008518610917901818,1.9970999139378902e-18,4.1010546658922416e-37,0.005507808594247893,0.06101157854296758,0.004205995782379043,1.777504984909107e-19,0.00032137908592510514,0.04893422508328315,4.066667495827169e-27,5.3876815750016734e-5,0.010090186516438142,7.078140561625254e-5,0.0028048786748331362,0.00037328540344292203,0.01694774691389707,3.4986150057827786e-10,0.0013877754036872145,0.0002711013436170271,0.0068733936729872495,0.00944574106769706,0.026501386437967813,9.87424325702849e-7,0.0375434573326989,0.004789474403941576,0.017988546795420602,0.05122283047322629,0.005818667095918999,0.0024636272511182776,0.028725812813451955,0.12828713222973304,4.055353457934838e-11,0.017741999803896787,0.011671046241405678,0.0005729734579385331,2.0995271720065282e-16,0.006553101089082111,0.004603759618438893,0.00010648893663293902,0.0069173246569742015,0.006971123905406299,0.011747502821913145,0.015529016620042923,0.00010061115195570513,0.004412239256089066,0.0033940682166040312,0.009813283836699414,0.007483772455539837,0.011436707042155388,0.0027074252865523355,0.026432741014053365,1.7098032303312895e-39,0.0034864750842018497,0.013741870623678352,0.05677900149842632,0.026686080055700886,0.006657597761706298,0.035096399323226286,0.0005211782015830215,0.0006360314281581684,0.005612126499632489,0.00016118458722640317,0.0025744748984850344,0.0016910960427974704,0.0017790578639247713,0.0005349479605173758,0.01753847863027003,0.10880823631683686,8.151095529203069e-11,0.008087782787624377,0.07905263754536367,0.0,0.04382302614844313,0.013045783907807704,5.342263347161012e-10,0.0,0.013601575421486933,0.003966292817383751,0.016371311342158523,8.628362477173344e-6,0.0033826340560345804,4.149215146293745e-21,0.008491607423058066,0.032224927745705824,0.024066412790076687,0.0012206639530226765,0.01339626705750938,1.4833913231167852e-8,0.013504818315489626,0.011775629827368262,2.4750506751271335e-7,0.0012246098647537913,0.002521876987798432,0.008176891519185764,3.228394310192062e-5,0.001905878360295484,3.6114734988512415e-5,1.5737773484399606e-8,0.0063176747760535475,0.005193053797457454,0.0,0.007274940201973698,0.020567449033066718,0.008541162253665295,0.026505810653108114,0.01113628498281128,0.015197694782914037,0.010635843050798342,0.024355143211818052,0.0,0.005642157277308994,7.572831818401754e-8,5.881428360542652e-6,0.01785388335372257,0.0010893853222232524,0.009103796356635203,0.016776596136193048,0.005367112037477767,0.05357552354256836,4.5303485598825536e-9,0.00686159122521603,0.03231850708471662,0.005270925378410864,0.002455336998833898,1.5950555831450868e-10,4.3593166695738766e-10,0.0030453252056450862,0.0026883758514278174,0.00562134251954353,0.0139464677523624,0.006197395860510402,2.02067793503494e-9,7.8903869293775335e-25,0.01243613855128871,2.412266073715967e-8,4.017022353871257e-12,0.0,0.07929116103362371,2.141854915180684e-6,2.286070620095799e-32,0.03755982195122557,0.006090474916563668,0.015691089550146926,0.012070419960916432,0.00857551815140113,6.879929390337592e-5,0.006074527724704727,0.14053146894355692,0.006120571908214147,0.003857299797250844,0.0033393313004746353,0.005287761481397484,0.016316035428109135,0.012111225942394398,0.014890004199979785,0.00022298473936113546,0.03224796609720864,0.005198831910935523,0.009777408473425002,0.013959032307644602,5.700672867280357e-5,0.0014564968430522958,0.01371180607853892,0.021475300919773267,0.1462663458313855,0.031174770260038984,0.00010059569671673573,0.0008402815888846227,0.0,5.018357414184016e-7,0.012284938631640159,8.788613554766812e-21,5.479798330197125e-7,5.639693601513237e-6,0.233634745614175,0.009766187917463842,6.0182078085086864e-9,0.003977247613797281,1.710981202016879e-28,0.0005684429465349849,0.01449439339509864,0.00011752012399037114,0.0027915379025737837,0.02160619067565284,0.0018627563083854375,0.0188370600483124,0.030844948665643423,0.045444511431302625,0.002413926472773825,5.567162068087918e-6,0.008403432698139179,0.011663139997160524,0.0008542311895340046,0.015598181783015794,0.003842835006077238,0.015583538801575769,0.0027400375770650393,0.013432518063787004,0.0037495521027756003,0.011332173808357028,0.013936417080738376,0.006367517009531384,0.0042642250958458226,0.013587282280331663,0.06127622937638971,0.053009802752553084,5.200694054588322e-13,0.009178246849931185,0.0005909820533949774,0.014339651350208553,0.0052114717129217135,0.0026643021801673063,1.527082080755789e-10,0.01270768522284119,0.07680595336611004,4.779209519023753e-30,0.005021451214180095,0.006725603275828,0.0,0.005428910913261627,0.005804776124379723,0.0011058345216197604,0.005884550225533945,0.012631002410999773,0.0029674322036243386,0.0,2.390030937066213e-27,0.004759203897328256,8.765492553837394e-9,8.771155226100508e-160,0.041899153981062275,0.0003995088474191081,0.004185609143210953,0.008217063358741797,5.3518379543769804e-5,1.2664916561163885e-8,1.0364542704627786e-5,0.0013246103398045258,0.026373922828715955,1.8330598287228525e-12,2.1982123263413725e-67,0.0,0.003055067310142843,0.040683737758999576,0.0003444831835333664,0.0003565307467288403,0.015393876888244042,0.0003162558110836857,0.005460477714342273,0.008370136978270985,0.002176021897690726,3.131305073386412e-11,0.007362977990768217,0.0,0.007570448761429344,0.005737577666258519,0.004382604888178385,0.016836051211552516,0.013623708828050292,5.196299404723715e-156,0.014434367148761508,0.0046432735869878896,0.0001832755078479294,5.4275149051711125e-30,0.0010834093951047627,0.004908173874626939,0.03713865946733236,0.01070947617760348,0.007485397657584041,0.007332216168476974,0.0069765670519418765,0.002618772893778768,0.39216683925757817,0.003043038554455221,1.117571648635269e-25,0.0,0.12585825893609434,4.6566365750347045e-6,5.156461422276818e-6,0.0005432883167476747,0.00021121708393082104,0.012877097061882095,0.005031120659671531,0.005012716517386082,5.6629428568713834e-11,0.0077120981458116186,0.019576650931975074,0.013177160185986523,0.0035334093456397438,0.007182728488619055,0.006616228752080631,1.352090336714625e-28,0.026849511706190834,0.004059561780921308,0.0034326956674176857,0.004439369177064943,0.0034346220021096874,0.005264543806722051,0.007925240367255117,1.86134227707125e-5,2.0927827115190573e-6,0.00440818296701797,0.007739279432202118,4.033835841797536e-6,0.003030258430767303,2.13605946548347e-289,0.002548112623989464,0.0,0.0001071421806709611,0.010227917451122538,0.008026096060228884,2.495373796387306e-5,0.008219811974610096,0.009123885812694868,0.007870255172986793,0.009028431150992819,0.004326214377839002,0.0007121278123630586,3.7230607410909847e-5,0.13332411502093314,0.007375649094344139,1.7419501483310684e-54,0.006007275806348336,0.00550988221225255,0.001140434938948493,0.23924650624073113,0.00840795801448264,0.07937336502515882,0.008069801967020094,0.00944806657880057,4.521287535018888e-12,0.007023860717007478,7.085955917028405e-33,0.0010287108388086416,3.143662020904097e-5,0.012554711373301814,0.02987064725461656,0.008361948919788505,0.0,0.018666645255087436,0.008610414079211119,0.002711557704521252,1.108707582038054e-189,5.2865091511058456e-138,0.12340848543058704,0.009382025622835908,0.4822509273430517,0.00952157369659086,4.3789154946152216e-33,0.0009281609151222613,0.03345763653081173,2.150867309524179e-5,0.011409419854235303,0.016640088850676027,0.012841475147854846,0.11996222203236105,0.0028745461404379724,0.013174598008693713,0.00423378697972084,0.0,0.008001478568583121,0.013648622427176177,1.6471705111786864e-7,0.031130387699030128,0.0073245436098998305,0.009531155412418354,5.306788645590776e-5,0.010071868700019738,1.140485395658704e-41,0.010293873500410148,0.006335591762912118,0.025308858055259707,5.148191737418105e-5,0.006672715598382191,0.01870435767591114,0.00405677952536834,0.03599004623623888,6.252621290714726e-40,0.013822301058149312,0.001283543830252192,0.003561669022165682,0.03409412948618111,0.001686144264200222,0.061074258158242585,0.005942876025025491,0.011655224826730056,0.001491627811251445,0.010722622814058684,0.09338129910120083,0.01290855488358616,1.6985944766368987e-6,0.008760452613738121,0.006312787759880704,0.07335508557202458,0.0008796932543968731,0.008093457404093495,0.002824219172094874,1.9701210256649896e-27,0.025682789664813518,0.018323252304562842,0.0035155647385853813,0.01937147265048459,0.0094965519001785,2.1235403587166264e-10,2.0711281162931936e-6,0.004993115411140807,0.026647094982471503,9.403113861441417e-5,1.8114072221670727e-9,0.0020131447374353044,0.0019355752356228328,0.012055668618659223,9.920322885855159e-12,0.003895476348344712,3.013629650702865e-15,0.013712261644343122,0.0007429988811101903,0.0077483012121007284,0.0053639903389759965,0.006282234194614473,0.0017772070013689918,0.0031468916794760798,2.2534866029258903e-165,6.945095301946839e-5,8.309983555824109e-53,0.0008774192301360427,7.622427588950073e-75,0.000785240977365816,0.08717255176707922,0.004034057023015252,0.04073776697065628,0.00950348845422887,0.01067400374303327,0.006651208710298536,0.1766769971580645,4.424367499023585e-6,0.06572500416195151,0.0064374931336169715,0.00972828106500837,0.0008060073108304193,0.009755465313861001,0.04595455224000083,0.008921018570139237,0.00046281778289448863,0.02120505244762323,0.0064712733310236656,0.03702208844169629,0.011885850143856512,1.3574375157330208e-46,0.0023880625966021703,0.004930082606233168,7.610279184594622e-5,0.015073430569490398,0.00026570270262427624,3.1655804305084043e-29,0.0024172391998967774,0.004206149125180656,0.006650120989846725,1.0262528884704622e-17,2.7902807224149504e-66,0.00889092822423346,0.004629509437341547,0.0057412944787277815,0.00027979371330077107,0.07622936475889593,0.021277315788682298,6.341469603365681e-7,0.008200388955695881,0.0,2.1019727217637115e-20,0.0048049996212374615,0.009752148713394207,0.006476185040118603,2.204222718952525e-23,0.0012013164053653682,1.495569204507246e-24,0.009183046328043095,5.040613282421622e-19,0.0018482025441530611,2.2111330141364726e-113,2.185167586068524e-57,0.005127908329053716,0.005460429984863569,0.021626587514641964,0.002584243004137667,0.035405683547245784,4.3066786871359416e-5,0.012168028379324299,0.00503450918026983,0.006229798603019278,0.00655065688629754,0.00028164822403256253,0.029514241256211857,0.0062657254444289925,0.02736767524407851,0.04612005178204488,0.004412695399200331,0.0244125030402115,0.001872179281306393,0.006526955863824264,0.002992315675664071,0.006488344156094279,0.014314418598720487,0.008472749442613944,0.04186685257021026,0.00024325954111340293,0.0012489072099707756,0.013826110233801517,4.6248500375039805e-5,1.5303284779566863e-23,0.030080321606632113,0.0011057153147724884,0.06525775422625617,0.00027146697779578005],"x":[1.2289445130094112,1.4654217769207234,17.125489933719116,19.39869114619573,16.369356181537714,18.01609143830175,18.247552990048035,4.7117751600245095,13.441152307356505,8.995097165168522,18.57780151011979,1.2071290818538838,2.673087805905996,12.93623276786574,2.635692123110198,9.195183110667099,18.64381906356726,9.08651111624943,9.457506789358439,7.424235814953333,11.9088782984407,8.052238438720195,11.304716829681496,1.733267576544164,12.293266746261482,19.136786570352683,16.750838943812624,3.797024018360804,13.252697838209407,5.922874484320726,14.510231696573985,13.73528294968455,16.355631474495436,8.924657204502964,12.393705197674244,0.8226650977770023,18.556501730670526,2.74998594150615,0.9650498226561677,3.0257899008191913,2.8540473056687565,14.121620901918007,10.880585463662321,0.01893413506870445,14.993459352983859,11.476621310197373,3.864032377412472,10.971789344005899,15.985621566613762,15.04884420750578,9.035540409782751,13.184910471069124,9.635328875537827,12.287208760746843,17.330803204802532,19.19985990209167,2.063441138806059,14.398805942414157,2.450072504277987,13.647929213072295,7.644288998900777,13.087766551277177,3.8150403673328315,13.426265068737768,12.285159094890092,2.2564952827257745,19.270567903876525,10.526274690034736,13.446563472657921,11.384301293973795,8.37372775442255,7.297309232166844,7.008024285114942,0.3785586860679935,5.840091947967521,16.181344773865728,4.310990347120334,18.893780248893304,15.233437940989463,9.271510596817446,13.359181589974852,1.8823582671379135,6.6529874373560105,3.089525631261192,15.363660179551353,9.62202034145184,10.304347241412932,12.642262754007172,15.171268552007255,6.2016788019602,12.908695433613357,19.265946264074714,0.841662985870375,17.231483056711383,9.907492330815678,3.7360754498281246,2.2608149284526613,14.506896250207127,18.00756450477545,4.149051760967448,6.531891138389754,10.687326464723101,16.82197612318427,14.133935453909956,17.381825321779075,10.458455955592179,17.29663282186257,6.066544890732564,9.849771256606745,5.983772440666035,13.606547846483569,9.071611258911133,13.668867539737812,16.465561589262766,0.017512202951346367,8.190334193075461,6.412022282197269,16.715636576504117,8.474367741554811,8.438126762737838,2.7984536445267905,15.89824759852787,8.789156017142812,19.008538950780537,13.200031979209843,2.29095996080404,5.006240997650253,16.07948393547762,14.786200361465905,9.857463513459837,15.452873734424056,17.14512175948968,6.186958020610516,5.542257129393104,4.237758423895701,5.596135325944718,14.025725880943224,12.022253653710928,17.86509742018775,7.08677630029924,12.748188833749655,6.579625270816374,0.49005917195617865,14.035001367198232,9.555447542588533,1.1742965453399234,0.49856350738302524,18.40153079083183,14.61234722259006,0.967503787540207,16.45158242115784,3.990983702768278,1.4976381891152135,15.915270675715671,0.16647823126115568,14.637980968671101,5.33482567601093,7.92093306345012,2.0950846746496143,4.857047266123793,4.458824872914073,8.246760716090073,17.868165900725117,13.481623332849498,3.0677369308002644,2.0994787613647947,16.446190881345274,12.235978629154598,14.832894799018813,8.668350961355603,18.509690595538032,5.0735805041487625,7.798642334960748,7.366505757810353,6.2213491044452995,18.220639604375414,3.6811907562276946,10.764536826641375,6.567352440985332,15.633362272534836,19.033488449921986,0.006283957111006266,9.87366921798245,9.750331268953563,1.9905292274210984,8.705739283604315,5.003637395892899,8.812472249994073,2.2024108468730574,11.899755143243006,10.56739945622489,0.7941845485504295,19.013636531413987,10.830564599874698,0.24045315992665905,16.896144785391847,7.456402611156863,2.108873330630585,7.295064780289757,9.143582722854205,13.0015079687547,2.619665149196244,7.8890272471336464,1.8124286909553167,8.259357664231985,16.547393142304678,10.593155515014455,17.428654480284024,8.253157018214786,19.38403452754731,1.198805639950531,18.505635441624513,9.808092777752115,0.5441143292464456,2.197435362229778,2.1829087285613946,1.1743217510382564,7.258081576135336,17.803808514185377,8.025538369564046,9.197160052450881,8.087527654157736,15.80183289951696,3.402806464021042,7.117072354652727,6.465796668437891,7.6809157874168,15.357005762957616,12.45869859633733,3.5183733068259393,6.506155232739688,3.3793159633582537,6.458974315811545,18.79372098602004,1.7773260946347458,0.646090153299772,6.641685265554762,3.3266465909596388,18.488270487091917,3.136199121054175,5.3431301693778055,19.249085169309268,13.686756829656272,19.46393002788362,14.755500648054106,8.288863389568464,2.59085541165029,16.557589757392247,7.4529183513810215,9.207353330430056,14.54212088069664,11.088692611576514,0.9427475846245592,2.659403693667124,5.04523259494003,9.119135017288764,0.3780352830352962,2.0796451480686162,12.19867112396531,13.156038307153013,9.731519121646999,9.939062637330887,6.624385307475986,12.859258253227903,7.372677131900329,0.8097431921754383,14.26976014368213,17.507108501985,13.559612522039597,6.361739003752476,9.39141004586939,10.627641622307342,10.436413537570957,6.400871326764799,15.693726005637764,19.86030733755181,14.674762027778009,10.451172656596132,9.25036211901567,0.31907199899829486,8.850398339418103,15.129698595682699,9.899857457363002,16.296860590667123,11.305173139959699,19.472658587214156,12.036333144031639,7.682942031955551,7.959637530323627,0.44278980717074923,13.239601122871235,9.702017645810187,3.5630612647243076,9.370043075263968,5.0518132264396565,5.701092232535014,19.867241483530652,10.594328876405136,19.926163273364534,19.45499101754463,18.577991845899973,18.435771683919157,2.9274726556636033,16.112650436627153,13.311078865782168,11.565178101144058,4.395199223233015,5.170369341964887,0.2358751152712335,11.858225190989554,14.965307092204249,13.114484954378508,13.414413011846523,4.912832077527423,8.636972510868732,16.79640331535774,10.758466867163072,14.870186344896034,16.626198173312588,5.24960283115965,1.1900140625474487,11.19045959621182,1.4204415950323002,8.976436360804364,14.391016904483998,5.379477279747791,8.987491864412917,11.981408503547772,1.3516087569008173,18.371697702932735,6.8285966695987055,10.755806712935264,10.947511086466832,13.64979036344813,0.4726492189539311,17.705063555654274,17.798632271509355,2.8250701505597364,5.535727531023369,8.836727776149731,4.790085094752583,3.1971399834812075,4.2638542464963525,2.881168351561638,1.8686958979765445,8.161848077863016,6.603267577450556,0.5546373229362844,8.703629534355759,6.0539087475872355,6.1480916274889585,8.205249605456144,11.376693287843768,2.718500565205346,18.567686094331982,17.437120215089962,8.188728909484073,5.928074215458059,3.785243976113999,5.473768262176857,6.0074055434211315,12.407155286125437,15.667186857016556,17.624753064737725,9.922936265013806,13.594068737853462,8.761411409644886,15.82752654159905,13.629123724546496,11.520565553660877,3.9130669357103898,0.12281881158386465,0.600364755265641,11.99123048148763,0.5879975249383085,13.827093281295376,18.43112341955169,12.892047874515349,9.861364957529233,17.912403252151684,0.42958240454948005,6.084357740295432,3.886116443619554,15.302589403873913,2.2466319777349675,18.64473055412049,8.53275776708761,11.80442732821855,5.714908624069728,18.649840848124658,0.5356746183252259,0.13656916681212383,7.39564893820714,11.925819625160763,3.3553425700848294,18.308022524043686,9.52101527389782,17.35458186309831,2.5461064750162476,6.025447386012113,5.4974277726602105,14.432765281243928,12.427846076771157,18.484465731816528,19.221777593302516,9.784078660595497,5.166739738331181,9.9302721922506,15.960121379029486,7.650968149799309,12.870452799616352,13.81457277520806,4.967530966859726,5.928389545108708,11.460806805184514,14.351619605135589,8.171485116929741,6.496050824606252,8.48002465861458,18.484752019498877,12.036409491986895,13.039056564909664,8.77158524343554,18.629749884673092,1.7439037815581981,13.95248401239829,3.588952496102551,8.901244756281068,10.99253938854654,15.644555211448088,2.0043337604814537,3.869388609619806,12.068238992892706,12.991512170254147,13.49685877551757,0.41603629531300257,0.7028095388378075,6.10402329444693,14.16344246238381,1.2198273085702427,11.491639151437534,3.7285365904274625,17.19029899919036,13.393343288814282,3.3150060796516145,8.202077004770892,0.2898473058123274,8.701188822376622,12.456229507989637,18.534480798390828,6.126222979723925,8.238925217608157,14.01956852649485,9.143631465495456,17.6411648709402,8.419110842163736,14.61482245634306,6.320150789972772,7.03816902942485,16.46333408351447,14.313880916080146,15.059178753576417,8.879772120020416,13.669565282443173,17.35297211904188,9.796982064993474,15.212437015874002,2.554018923766388,3.4548247527027343,10.286676227195745,9.630532891497108,15.58803624214459,19.219154251077168,2.3712483028823916,11.945054308487336,12.429198901023653,12.085011797116332,4.368320771591234,9.068179349438923,0.6458443544270143,17.26213635119159,16.22215844674828,3.165988462798923,17.141493518475922,17.502340793836368,2.5688155458824857,11.194310236652605,11.175690169969892,9.708295036390142,3.2736416244806543,1.2618735751464616,1.9424853005690057,14.41363202018307,3.7303139328614465,0.14056570711135308,18.23382105882985,8.766254396537189,13.691084955487746,14.74619036548142,19.583458337016634,0.9914383951268002,4.05397144418417,17.622642475869846,10.06146018755703,3.362909021846372,6.687493428192357,18.512432842555654,3.090983149167217,13.444209120376986,4.788920544889823,6.3864138368200685,7.563661235045074,9.312550988631973,14.555922472126884,11.482500227578289,4.6205394890332485,1.7788209785839726,17.249935327599776,11.51014613806408,17.727184395261737,12.351194628059044,17.72738192835948,12.452454330568505,7.769157167436278,3.1887442551678946,16.378828175209897,4.66759252353667,8.263883051599654,12.143344691966188,0.20460691856763802,18.631200446708295,8.888098700064223,17.341659843970298,11.83335114311065,12.608392698043097,15.358251570556689,6.803861889761591,12.684543192759929,9.318177058043124,14.826395024518098,4.092915435719471,6.554919077344699,19.34615049271022,9.023187628638777,12.802670807112495,14.32186498634971,3.1531488249232975,6.649596295023872,14.71814855426054,2.1243569680495566,18.24762822532344,5.400750180716183,15.925229656242275,3.738524689758531,5.955060670570171,7.047528938698813,7.719482017820507,6.63584658572931,16.327610295823213,6.568991432982512,3.785544746669842,19.027923668677765,6.017409609093924,15.436992386930104,4.848351144228351,11.094048678614046,17.08033044275642,12.52200979932887,19.300772303587834,7.221417375543768,3.5122122950273393,16.44968080884567,1.2512626233708257,5.912976897380657,7.087705937328059,8.796862198739785,9.969738856094086,9.815540430461581,14.44855409338016,10.112058095576861,4.762867409511573,13.65905327021542,16.262429168857796,8.954204203556703,10.212268601504544,16.091728354644776,7.5010515028754154,15.168910134052037,7.614757972573254,15.664442885921822,2.151997596850297,13.204192063939608,10.524206385863586,1.740362255120731,4.856891937565915,5.517771109577292,19.448758220442063,17.129641784731106,19.954457439828435,15.700192367903036,2.8554926361369715,14.461537785827844,6.2848055563005545,14.012028214108,2.2884551963234845,6.901724916520009,6.580378321091467,9.01670388159701,6.535678686397035,13.213941356614093,16.815065157444934,9.047389736052299,1.777099814121339,19.753365972912814,19.36598509487338,15.002959276151465,11.612669644998741,1.0455989032352964,8.822803780100653,2.507466574896453,18.60576822563327,9.903636238360152,17.438870785865618,0.6836359723078722,1.7768253431210246,13.697318611904645,4.714547615284803,13.150630706472825,8.02783374422253,6.015719774123465,9.512737833412746,2.696205126665454,15.674413388241488,10.332876197250007,10.848053064322176,14.051030003584813,18.721077881460317,9.801552092531791,16.423831801639807,6.094805195606958,2.4439757639036097,16.641069350366156,1.5107815966744775,16.852413967154185,17.85379441413765,16.698235510594333,10.41292799962342,9.055596230866097,6.719531801372711,5.835575753857629,0.24582869781724082,1.5622976434854197,14.386499904853709,6.623601998998088,7.569284995298542,19.50069630466757,19.033254530053355,1.1068710678296823,3.4664316052756483,9.003924392298558,0.3214822380799509,8.389049266725133,7.631494356918176,15.36173103980575,5.2927460975697915,0.33370124909287036,7.024231336779954,18.928531828801276,19.289341834390747,4.459807799213076,18.149768407484565,3.3313712156737596,5.5811086499583284,2.4788363013391024,14.088180482032623,4.7437459426633355,10.18796764225652,8.833966752077483,7.449286325054203,11.706034003601737,13.581189897655275,13.718736985539262,12.403120316651407,7.704513782612157,15.50169170031352,9.697163773612232,6.921158324256966,13.472258455248625,14.549050188125321,11.9653933261871,1.2209840982945286,2.379116828202177,19.43151699576742,6.900816211071863,9.292100847143136,9.994444842214643,12.058239946892805,7.423717717673952,10.016024333186383,11.45486105498438,1.2718004876340316,16.930038086807638,19.053397864517898,15.509607712829908,17.416353586734918,15.242365330890824,13.302082538862114,16.424401362403497,14.214580271755057,4.982796287332785,14.708752959716978,13.272930505350775,5.871918313230107,16.790160261604292,14.665156233398005,16.865838917931878,2.265754091237402,10.846004662326735,16.747960401245518,12.2120083359396,17.813837940251194,1.5363395918399858,6.923715926318534,3.92333169117971,4.731679682437799,16.420050038104815,2.7375792624208106,14.403544271414365,14.71441977547733,2.283033340558629,9.578230826389543,8.818062353673337,0.3223875240489438,7.4207415459647175,15.388467022366363,7.293810831960852,15.113601056591598,12.953038282798307,13.062826703116087,0.10284860209098134,16.794983022606225,17.01792948825206,16.046578717985298,8.597865301624111,12.895730992079555,18.38879857666958,7.671821041058449,19.899099141035492,7.819815153590928,8.553261327808851,15.991061694519683,16.878664088596032,5.6987401091715695,17.56869003425844,9.110367949993506,11.637991188893825,12.648509653157575,3.3277211927993378,1.256461219010414,19.324191406429406,14.785219061743312,11.536382613328225,7.4124978499545024,7.511283908437436,14.125266774623375,12.279336660398638,4.893290755329036,5.625251309977983,18.321589229116512,1.6335866691100431,13.561013257858097,3.39062265440508,2.8303311504268214,9.802736236619847,5.608605993463427,6.62813930844937,8.821287140237999,12.056307854130415,6.468223099261814,13.168820103256103,2.2753684592644285,18.595245084326145,13.080915027110924,16.10465804673399,7.6999814598343885,3.6969729691078657,2.048898039385043,16.7938385111092,17.41251541062948,1.8275863117630475,17.586968763336003,13.690424543175181,11.051487689073527,2.4522136211320644,15.165437176062252,19.683896113857738,12.734689657588817,4.011228408688834,12.028885330879358,9.936898225763372,10.927568598375963,11.351758107675423,9.69961843068182,5.2955747164957945,9.1790408335067,0.7495701253093845,9.060640188466827,12.194397884781152,8.099255577313969,18.60511591836602,18.846333384427226,0.1961222420134634,10.39419770995664,0.16610540289255127,10.202753220923672,18.892862022926064,7.401277876557746,11.689389979155035,14.949361682521562,11.563408955758806,11.28738607405567,18.78585347527034,14.601156711310743,6.270536079156228,6.71091142932422,8.948167941366684,18.721850475101483,10.609598221100471,16.353621687364402,6.8935000911334665,0.7266430139052904,9.508568641244723,1.5709932072445554,10.521482142060021,4.4580929521998325,13.101942809434401,2.954420386128671,0.3613852474718726,6.823373375438209,2.478004790936983,6.916823190976684,1.90542130068998,9.541426349588216,3.425167000040248,9.231440257664566,0.39149275938664907,16.950757430469416,17.961250877174308,0.43684884057752615,3.0202149375048304,17.81720808690784,5.09749717339917,19.35745841987552,7.083713676865067,8.379576030376796,15.569768991552309,16.657697499453988,11.670772024662872,14.93644809552868,17.040345589009856,3.409754540264953,15.371987236582028,3.896558408443762,4.287006392514292,7.45955980407528,19.82654825120354,13.056796414758951,6.866870297124654,9.599689221981102,1.9292172724895051,11.8169218290942,4.554025617391142,13.25693296920813,5.471144186133841,2.795210790079583,4.428165081712394,9.158764513401522,11.044797515215162,9.262987429216087,10.316888338915655,7.740648751892563,16.864641110122285,14.951390978561783,4.936740215206217,6.699008462275309,7.230248796464083,11.726710978464894,3.4935421913424225,8.535807043724066,4.931458891695595,6.077316455134452,18.48416673978173,1.7449846357684873,14.293209985047692,2.8238112761569045,16.28851855443257,8.764267030840621,13.909618648204493,5.973238202391151,16.434627760877692,6.438709732693684,2.7482430865832574,10.6533429132155,16.714863164315187,14.194378090108488,18.916545008035122,17.15077373870669,17.908429861086645,8.749329405911613,9.626041619308747,15.607732538589563,5.7018997580280395,19.97695981763997,4.142320784260649,0.4621415296153719,17.06034623277183,15.646187823342323,7.439947283269461,16.815830217152822,18.3861428870377,1.0138799112232277,16.71368418096008,1.1441618532632791,12.992490271171624,13.30471625913261,0.155604960522564,8.682501126108836,3.5180652336465323,15.641116390079631,19.19738406701148,7.794694452697177,14.460869080691676,10.4308772116493,11.68971239421461,5.12751896746614,9.5200179736832,6.454688316426389,16.779795715127026,14.56924820769872,9.202372925604534,4.402066334281729,15.988891970172885,12.485908543381203,9.014737298071944,0.3588577828663553,19.87141832039661,3.1378389831239817,18.159881951888302,7.2283787509398145,5.093932875715161,1.8014958747993726,3.7533482742561386,17.65054531475037,19.7456041617691,2.7486217973519667,0.034115355071482334,14.758281294985371,14.509857188590196,10.000451534681716,9.037400952452792,8.952134738417637,0.29441883499045307,9.092820152170882,2.872108137064018,3.7276404857098733,8.414966183860448,12.493213303773363,19.08149455386892,17.16674189822195,19.92132160510833,11.887998256061621,0.9887281052429131,10.2450896748519,6.565760511287206,17.984615886584905,2.3013884836435627,5.388418478430812,7.80830176730321,17.04349942556506,19.35003710668778,2.091641094421557,3.9807463445082147,11.653032509334897,6.214375822761262,12.81865588507619,16.605425999823787,19.828323473669734,15.966168198126244,6.3428621712779165,9.787101286555483,1.95842019811598,18.81231614720573,19.446315483712734,13.396276167164828,3.4804762382529253,19.714445800574268,0.5716156993451627,10.485688347168104,0.48218827068130743,12.828466445982771],"mu":[9.14313305329307,1.03631032833575,9.534214055288865,3.912042245197569,3.9422406804856958,6.954192151619676,3.3112050190724562,0.1762480068484562,4.435964562296899,6.15188822643955,0.5730273402578567,2.768289750720989,9.714157940658888,0.14365208397895124,0.48430190178149646,8.995005866309537,5.41143391601306,3.757779344205976,6.19131671220611,1.508059259262231,8.381794614582557,0.6408522189345889,8.836960618464065,9.274875111823444,6.927184847672983,9.205309770645908,0.9496789874138001,8.340444223589877,7.983974072886479,7.452219069262737,8.333200675559812,0.30504936671494676,7.2652432305670445,9.899254592907482,2.6765514477156427,9.187373448584548,0.25675799433724444,3.9650006810170746,4.573632650368236,1.5618901629124604,1.158850398680582,9.621915221294284,2.597737372883624,3.1661693183972495,4.230051641590034,2.4636675188972723,6.994362105698695,4.877828761586025,3.5753237079249534,1.4776034519941805,9.045720567310347,7.55331120272662,1.9994656089409268,4.513160265307786,9.1890657147294,6.739845301791709,1.0789263890190748,6.385510924596862,6.773913522219923,6.002063788739647,2.791748931825384,2.8168149865856784,8.324698124138523,0.24627142776052047,0.0819937231908141,9.417919223737838,2.985316250919967,0.14713198629609403,4.266756538686424,0.6241888600316181,2.445651827501798,2.8853678312669717,8.614347458737392,0.5847659098206481,8.215621074321195,3.993899938578198,7.7274331122489,1.3654566494504694,3.357690192304996,6.008564009398157,8.106689726032117,9.57251291993205,0.014973776631939106,9.689245975097158,0.33455613871846257,2.5192256011261893,7.556027994731616,0.09208425898786787,4.983285131917503,7.304839608448887,9.129518023775876,7.2717415698698495,0.3825486720400595,2.4115593207157238,2.894666127173051,3.2255397474451897,8.145719308709939,1.8955007845166838,1.6239963281007719,8.323624783652141,8.896191097482188,0.45521552962803913,9.067756593408717,4.283541517820262,9.195910618897194,5.452307345092374,2.1324141361207882,6.21652286652322,9.062278879727614,3.248464037592891,5.286487225617867,9.398649577862932,3.8039032018432595,6.556023278789382,8.294698732256942,3.375093281743069,9.186151742554792,5.144081495947546,0.8500934492029333,4.830460516451245,5.722943473422115,8.018614955287111,8.754741702286813,4.94621958589488,7.361533262415676,4.125894958240533,6.434315158064359,1.7128823074837185,7.93952445152573,0.38976715975692855,1.4001449756917572,6.6324251123678675,3.9818648028579973,6.252819924840902,9.50934424256957,9.561000071216396,8.646729945393172,2.9512560163388457,8.83948540658826,7.6540564704695635,4.435965310120817,1.0120027692420241,2.8471275307153943,6.511877805252295,4.305979082625249,8.497090469731619,4.368984713666128,0.3272867163800197,6.965069133771586,1.965475924718283,4.76730303502478,8.41400727585384,5.742794577213466,1.8514649726425048,9.551177002360783,3.1461428768620814,8.803808022951813,7.718487208398095,2.8225334376543088,4.387891988922723,9.995497322863127,1.2700678976896373,2.994997205623655,6.575678747057423,6.6934080473006885,7.5521576785746225,6.3544158011829355,9.550693771411593,5.037486909559101,3.0045039379761906,2.7939767575567775,4.171220765654729,3.290082151563194,0.5558825433212045,7.009133447183786,8.216999870158412,5.696831148937973,1.991412537274806,8.045399105500348,9.060661555671967,9.300863437674087,5.1134800434442,8.676569018563978,2.3603952707399056,2.814774231510042,3.506313706013968,8.646242898772034,6.751903133024357,2.934127126018613,9.925709089081767,8.246779678582941,6.155261991621139,5.6321958660590905,1.3335839937782823,9.759780911407043,6.009087629982681,5.480782231227799,5.841207845379164,3.040044375021047,5.290938942001661,9.749756246184324,0.06688903033960747,0.16879228718442274,6.101158346897579,1.4204513793436369,7.708703599133844,1.3464663045542125,2.4360718878282217,4.5963087823914766,2.22646411887216,6.661272097422368,6.237898721121622,9.476609852864954,1.8559369648621216,6.872362667289993,6.244560050559529,0.8476540264058552,5.377692387938788,0.2723785190418493,9.068678358998987,2.8589820358254325,6.3661857666064385,9.994187981129263,4.387494760531143,5.630529241056898,3.8175701109957894,6.881297699531332,9.715924872779517,1.9212999450780743,7.6793265813399785,2.938853557737171,3.2609391013966937,9.099086083691425,5.662812859462885,8.899203827098214,3.1892579157474676,0.37725733446710263,9.70874020357423,7.93941157405174,7.677555602110797,3.793030804706723,3.2224631546266225,1.8558269514396053,3.9646495402471693,6.069829568814793,9.416319355237125,8.693748436363917,0.7086163357584785,7.451831951203252,8.387253566605754,9.080120910429086,5.423576454889534,2.3590737787289084,3.1225515561891948,8.95498881088146,4.077308928145664,6.268477250674776,8.076670497121805,3.846473050530388,7.891926492074173,4.081515287482693,7.7312929291332155,2.8775726009808245,9.895379679060257,4.924753272668488,1.830898174758151,8.412696878762429,0.42188154426346935,7.889988214383785,8.777301746020697,2.1102445986627294,5.544543469180985,7.532546828361526,0.36868387174288086,1.1341781954102892,3.435705091062191,6.469065706629687,7.478007639206599,5.031815286883587,4.607774521663098,1.281701842064642,7.6055428807598275,3.0704288608945873,1.5097721459464486,0.7297114670793547,9.604330820810915,9.679209764457362,9.012002212109135,0.10462487100576734,5.703436425906263,6.790894725731784,5.233654529946852,9.41891641353537,3.2404801299207264,1.26669416044342,1.0190979399270939,0.27216558549830516,4.841599710956737,5.662296997029612,7.58810914681866,4.210975517588313,8.998009002020693,5.224219810521804,7.955990559785797,9.981185398239102,3.597460499762055,0.38624902079944956,5.155906544118897,6.26881898308879,7.796827601331104,4.63282562541375,7.155100251211781,1.634906031459613,9.096686852922566,2.5877799015870617,1.3325019589635767,9.308042509223979,5.002325630862552,0.2410624948761919,3.721196483388094,1.6076347911907596,3.380065301060593,5.104587541499665,8.450913655498052,1.7098515846420281,3.1346011288044995,9.307738330347654,2.677337675684708,7.580871385324186,2.5026369802561454,9.005934453779538,1.618995500846958,5.533955998275058,5.9458688435239075,4.120267052846565,5.4122231720630225,3.4620186376238626,2.510075035341117,7.528835869946868,2.582424327280952,2.943146952321831,9.479995874879064,4.765897698092667,5.709546726458807,7.304581771676746,9.26316717806846,6.346100714121277,8.984653013619646,3.7202131075809475,6.91195390826056,9.258944988607533,3.98448634956432,2.4775970086563093,2.1522317031076144,2.0316304548521513,3.6402529923838123,5.323328245813499,0.6240181849494797,4.48892503300887,3.0523823318581744,9.138888770648192,3.25005828824942,3.36380350154994,1.8019124318575441,4.6395219211185506,9.246456145780549,6.370033647349689,7.438333111719451,6.858993659426071,8.972278262365913,7.9401219633582265,4.818984791747784,9.482798803078616,1.7870614183868971,3.157239976680075,7.920171358610664,9.341365470777996,0.7256403937113598,8.708607104535846,8.259774366112012,9.956530394716236,0.7245302638127127,0.871125895393019,7.38755794528466,4.113213248775764,5.790867494653915,9.12586094348972,7.963165590232181,6.75022048112808,7.649702147472972,5.6334128610886935,3.9205506790535805,3.8256052379842953,5.3568996794132495,3.3254594093185985,5.699195185281891,5.446651206304727,6.102929189623185,1.6353348364566545,5.226580583182083,8.07742724801441,9.655146533235747,6.077721491522469,2.3950599769404457,3.37522526894674,1.040062434010589,6.789253285975729,0.13523519295876474,9.656750725800302,2.377951949724848,4.745703281248925,9.405790472765165,0.04502829864857727,8.473955847508151,3.014178954337443,2.079287124267446,8.952819075335386,3.0415137931209157,6.84110304797247,7.733953238157425,9.519605409115798,7.577591353662179,5.43593141755907,2.287490246624737,5.39824666305808,3.6555827817132935,2.100429637650796,5.183979802750627,5.641696232941591,3.801420373884563,0.410104497394046,3.2853179104401,6.623452288561806,0.7560103747094482,3.52189068471515,9.280766344908427,7.711625986083881,6.274985056272719,1.3290650228091527,4.224527586070728,9.284792790040775,0.5872962424349937,6.74371791531377,4.293818845384248,0.4256998156076408,2.4372866848254815,4.34111851508521,0.8439608358764494,2.579556307198889,1.94777787679131,1.5630349269284527,1.6703698141877776,2.1736155853058525,6.076183405361677,4.144564517444911,6.901016196964425,8.444176216596016,0.6756416804133902,4.699050459257455,6.742558144083086,8.74717979926089,9.804554996375337,4.576527034265904,6.638058431803162,0.5635949000984386,8.536993456598598,6.588893522239512,5.979156946974101,0.3254056552974638,5.8895146214007355,2.0559428815449032,1.0815386073366606,0.30033390598610543,3.8284087193214456,9.711089420584642,8.129313640734829,9.086653679246961,2.297420990277683,4.2797144112312875,4.096828818988907,2.669507576670598,2.285481507202598,1.7739525630278252,0.8559849123061514,0.925471927440018,2.4190424912087427,0.6521908321541048,3.2730248807863638,6.743274045224434,9.199210777610457,3.1459644878202697,8.656218891238144,5.2028959741380625,8.766998721386702,2.4806804896387646,8.31128040804958,6.289077734571569,4.3207741921444835,5.089428659765323,6.876587342758178,6.188903390096909,4.6619045454296675,2.2653715252715934,7.613961793956385,5.320758953854801,6.915736286844907,1.8055778577992676,3.5574981218946555,6.899013154122519,0.5031259089945173,7.018945143055273,3.129663157861018,1.7333170904835282,1.4248202196050608,7.21832389646107,3.067416303271835,1.4972625363108971,7.387516202606539,1.287305415926563,4.044599053611993,0.529271754643601,7.009654671921659,5.205944784103716,7.726918958437114,5.934923123186817,1.9238482447924143,7.262979443365478,3.265077676764714,3.776326305161466,5.616554672982383,2.5938869073753534,8.549806809247215,4.272223199086829,3.010727909719342,2.475567452117262,8.14845668938036,1.3033297388340292,6.735190696001538,8.319999619299585,3.8812087078618607,1.9114884487995942,1.4296259781172282,2.871577503691216,1.5719550376103109,9.533044442468652,5.917696677608186,8.957748412168318,5.752259522756081,6.028609651838728,7.515277453643527,8.810315725974196,9.290043410435375,3.358499340261405,1.9054818310566213,3.604545301014659,6.141634087344632,2.155748994752813,7.506688467802711,3.052605537990054,1.819294004759393,9.536816102651022,7.342016273751182,0.3562654299433965,6.472978073047488,2.359646956204311,1.3163207934922738,7.025026564454762,7.471253325525129,1.9919297082753418,1.4133662484349352,2.236517329631562,9.000783803027318,3.0728110139659592,8.430297439305171,3.748919768633765,2.4324444789091815,7.919347822192108,7.0491434704646405,7.102558995853374,5.120512112188351,8.610750370731573,9.470570200874405,8.366149624044702,6.617656655212842,5.830629715781937,5.604179202540351,8.061958392370025,0.8372923943619637,0.6542767108295244,2.2297486421105694,4.949323554201954,1.1890441952099207,2.3945004760222255,7.927758602395148,0.1452677872836161,8.894815030177433,0.7888982277817336,7.201660123914799,8.447957253020974,3.292554501205438,1.8199453841452562,3.823493641165252,2.755862504059343,5.223389251837094,1.3904165557088644,5.161389398141889,5.987964319976447,1.3778544163686912,7.334535970547462,7.488753372631159,8.50612210187668,8.453046538265756,8.912567691206196,7.365629971143908,0.8989518216907455,3.2174929144702147,5.000174232679053,9.286874776641161,5.598731366968743,5.843177919372621,8.177336778553197,5.0220923889651985,5.158789053608432,3.5811228477102053,2.1187461102826766,8.209337812081651,2.904301908728717,0.7504236421908139,1.784426735042719,4.739155506815276,0.8175870492425008,5.594609760370988,2.7743730988066373,2.3345101208486385,5.40839407491037,7.017179619738205,6.789635165521879,6.912844028748384,2.45644659988278,3.0129239096557026,4.802968694234133,5.278466195349751,5.267994477020572,5.449371341041442,3.8208515203962112,2.637744112143865,8.601861860269384,0.3020225282294575,1.0744559829115197,3.598658643548671,4.865915469106746,4.080442325157366,7.410560293123654,9.27474914132425,6.400411494029008,8.61945391461343,3.92796722373677,9.184205315656502,6.640352558878804,7.064950870269087,2.05540899096305,4.9730743248461495,1.0614875128688683,6.551091573133892,5.396828178968123,2.8674925516397165,3.578615302464001,8.980061955785906,6.801412520668563,0.35063647236581064,5.100412289374601,5.057200882053454,1.3614068889144781,2.800288894042471,0.5641852113081836,5.446596025365523,5.080001306178595,4.222388760225398,9.167879708619793,1.6990331468715358,7.0698157363064595,1.9864451077735135,7.532021009178942,3.2981980145448575,6.880951868009248,0.22627239145488476,1.7525909205839096,0.36569270406273224,6.5707677727552944,2.3646219313552352,3.1478079941462056,1.8320391261030111,5.737203176927618,5.5604123923269615,9.665751217170332,1.973236416691757,6.1431429209904636,9.71291789428702,6.110983183988601,0.7826199398292877,2.6259384264672447,7.088172231504974,2.5087105536555354,0.7376577008514107,4.884894121245155,2.0575407677625224,4.4231985745965385,7.403839927754616,5.185233545197832,5.063287048497043,7.168093641598434,5.883618886964001,9.744670385481713,4.692981268309346,6.950248683021966,7.367078005684389,2.9574778804291446,7.960166664694361,5.5861426628449085,2.6913186489293817,8.424226239506048,6.473270076554957,3.6674768911722433,9.569061213644499,3.440162072022388,7.790202324957347,9.586996177527157,7.15860777433142,8.032156307551686,3.1312682394758973,5.5419750205176355,9.784930495591963,3.8433682121933788,7.835238542314857,5.045070458299148,5.761292572458185,7.2079822104359215,8.432416096180315,4.630067493634966,1.7361736715437126,3.179344464344791,4.176607235879772,5.654331398194861,1.1244635568885109,3.1918920108977966,0.6607888155308794,1.6696697923769754,2.5107938280009656,7.511623998897942,3.976220467097271,0.09421271937017028,2.1846288942881897,2.124973918281443,1.8794219868976003,5.7553899186071416,0.7387511694811688,4.289486938900897,7.633293245237944,0.04677950443169321,6.567673300107253,5.62645585570216,4.99819510209565,1.7606092087226521,9.922607721405035,8.957742651124123,8.644108034963832,6.405677020103009,4.998553729700719,1.026629015187348,8.252731667475237,7.626172706346212,4.499505224166529,5.388379194820365,4.0595396486778785,8.60288098570278,6.924184292493374,5.759206343141101,8.515005449098876,0.6467510988485436,6.968298870940783,7.756231136254554,5.54023623592628,6.996968405933033,3.349285431245228,5.8535165261074145,9.06619630405989,9.279639469335187,6.002742944840122,2.674934584318829,4.052292180089793,4.312088792419915,7.855235955494928,9.221592283538683,9.812590608725733,5.160043588378724,3.097185161339042,0.6980126012312771,5.143532387496581,0.07312098459194782,2.374860119409332,2.8774251964368935,2.319928329250962,6.945416435263629,6.458788823103112,6.858851015840822,1.1107590193022276,5.618541560201383,9.70317097244836,6.907147862371126,1.5694014771170983,9.32375654908649,3.4929793872587878,0.04205882743491873,4.5254964786809,3.7414972890437137,4.158250045427499,9.158934954032532,5.401183457396536,8.001374109632094,8.453898433627241,9.240017812933567,3.7760395759672094,2.2695765979280402,6.342324888302615,9.438996613659238,2.2714211285170727,1.6874501878176806,6.303838261738983,8.924635818971947,5.656312735460682,1.9364541041211103,0.39513944680601654,0.6170456385317236,4.475396331240935,5.49922503338416,9.555149148368276,1.5293650258217473,4.924419738455885,4.351934314135497,6.217926494361978,0.22693568689867494,0.14087739116408482,9.376586086678305,6.484494754046464,7.228453754384743,8.854316722536161,1.2514468064250428,3.274685426272128,8.79553136680768,3.310999738643816,3.933240340094777,6.608103245554893,7.231118487501222,4.420336666206246,5.642642076246078,3.9735292426152213,4.544724322111618,1.7596579110811206,8.37231412315913,2.671933437207299,4.885783832439818,6.4432745848594974,0.8366959739715552,3.568378193295767,1.3066406192388857,9.730901024245046,6.694365461603418,2.4270894785315744,8.819177837610148,2.7087506136792627,4.705906460135267,4.5617941574698655,7.847908511776829,5.812451659374835,0.20591292929978966,5.670598925510248,9.203159873544383,2.9700162515918405,6.1759320672950135,2.017909428102971,7.334665150305386,4.173320649170391,8.201126105222896,3.5478853168787894,2.035797103034247,3.7297781442698086,8.07916104319515,4.130220196060335,0.5617241321983601,5.063476505802242,4.58567528441479,3.399740970061975,4.711718685451283,5.451075222919393,9.208137389191899,9.038036325225365,6.690196948403626,2.742591688220939,6.553376467986373,6.541166315051495,8.309378954472557,6.876844280454682,8.736066415648764,2.481358157718505,5.2388802054170895,4.3304655141190596,9.64296487392585,7.13057753461829,9.344043951904133,9.209153239456247,7.558630009478787,0.8487372907457713,0.45263028780911707,9.9949337862161,5.010918013080142,6.347625737378777,3.1223871605134845,4.63920091869777,4.115370265034115,2.83375956100401,1.344888178197361,0.48683319231063615,2.56570709333539,5.00126953114729,0.8928402667375357,7.205232571060325,4.623840500926133,1.5324868225258315,4.1053211849605376,9.26931931458654,3.3989423311227385,1.1081504667767428,2.934607305067962,1.8478291995982588,8.285209385920568,9.621890320406285,7.175933253768532,5.810037581342618,2.0357676644335276,6.29927375300912,7.157490637422736,7.88551965042787,6.60079319683593,5.715771236457472,8.972747765800131,5.87417140595657,8.191775292663275,0.5185836416171119,7.259309492367414,6.278304558194123,1.4995978395193443,3.4433038750619316,7.788168472617032,2.4492259436172414,5.322717079333799,8.046590624000277,5.5223588461598645,1.7124991829155944,5.77331445023292,9.731265662106722,7.581450695582035,4.158094069128837,2.03191360485258,8.66794678452742,5.576277551999123,8.457135043423342,7.693140425150757,5.127251426290941,5.366332712368401,3.542259541320254,8.406260430284858,4.871861893784937,7.385283280778219,4.909475739776266,3.7236471670674898,9.524418084483042,7.92224376744011,9.017850597226715,3.279569284951618,4.926289713440129,4.888881648932443,1.3115842231517894,7.15683655789356,0.7764250201833511,7.976455495126487,4.390041819452386,7.061380398339949,0.4674467694376805,4.510757945899884,0.16102033666657967,2.507675435477741,0.19509136199741928,8.515013067454815,2.102362194850691,8.642689998582057,1.2488676089401984,4.917318322230459,7.365346443983802,2.401096940295837,9.691182316597775]}
},{}],130:[function(require,module,exports){
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

var positiveLocation = require( './fixtures/julia/positive_location.json' );
var negativeLocation = require( './fixtures/julia/negative_location.json' );
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

tape( 'if provided a finite `mu` and `sigma`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `mu` and `sigma`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `sigma`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 0.0 );
	y = pdf( 2.0 );
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

tape( 'the created function evaluates the pdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var pdf;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = positiveLocation.expected;
	x = positiveLocation.x;
	mu = positiveLocation.mu;
	sigma = positiveLocation.sigma;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( mu[i], sigma[i] );
		y = pdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 550.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var pdf;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = negativeLocation.expected;
	x = negativeLocation.x;
	mu = negativeLocation.mu;
	sigma = negativeLocation.sigma;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( mu[i], sigma[i] );
		y = pdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1050.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given large variance ( = large `sigma`)', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var pdf;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	sigma = largeVariance.sigma;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( mu[i], sigma[i] );
		y = pdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 300.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/lognormal/pdf/test/test.factory.js")
},{"./../lib/factory.js":124,"./fixtures/julia/large_variance.json":127,"./fixtures/julia/negative_location.json":128,"./fixtures/julia/positive_location.json":129,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/abs":66,"tape":250}],131:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/lognormal/pdf/test/test.js")
},{"./../lib":125,"tape":250}],132:[function(require,module,exports){
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

var positiveLocation = require( './fixtures/julia/positive_location.json' );
var negativeLocation = require( './fixtures/julia/negative_location.json' );
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

tape( 'if provided `+infinity` for `x` and a finite `mu` and `sigma`, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `sigma`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a nonpositive `sigma`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

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

tape( 'the function evaluates the pdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = positiveLocation.expected;
	x = positiveLocation.x;
	mu = positiveLocation.mu;
	sigma = positiveLocation.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], mu[i], sigma[i] );
		if ( expected[i] !== null) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 550.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = negativeLocation.expected;
	x = negativeLocation.x;
	mu = negativeLocation.mu;
	sigma = negativeLocation.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], mu[i], sigma[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1050.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large variance ( = large `sigma` )', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var mu;
	var x;
	var y;
	var i;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	sigma = largeVariance.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], mu[i], sigma[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 300.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/lognormal/pdf/test/test.pdf.js")
},{"./../lib":125,"./fixtures/julia/large_variance.json":127,"./fixtures/julia/negative_location.json":128,"./fixtures/julia/positive_location.json":129,"@stdlib/constants/float64/eps":42,"@stdlib/constants/float64/ninf":49,"@stdlib/constants/float64/pinf":51,"@stdlib/math/base/assert/is-nan":62,"@stdlib/math/base/special/abs":66,"tape":250}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":133}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":136}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":140}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],138:[function(require,module,exports){
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

},{"./define_property.js":138}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":137,"./has_define_property_support.js":139,"./polyfill.js":141}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./native_class.js":143,"./polyfill.js":144,"@stdlib/assert/has-tostringtag-support":20}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":145}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":145,"./tostringtag.js":146,"@stdlib/assert/has-own-property":16}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){

},{}],149:[function(require,module,exports){
arguments[4][148][0].apply(exports,arguments)
},{"dup":148}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
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
},{"_process":242}],152:[function(require,module,exports){
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

},{"events":150,"inherits":237,"readable-stream/lib/_stream_duplex.js":154,"readable-stream/lib/_stream_passthrough.js":155,"readable-stream/lib/_stream_readable.js":156,"readable-stream/lib/_stream_transform.js":157,"readable-stream/lib/_stream_writable.js":158,"readable-stream/lib/internal/streams/end-of-stream.js":162,"readable-stream/lib/internal/streams/pipeline.js":164}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
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
},{"./_stream_readable":156,"./_stream_writable":158,"_process":242,"inherits":237}],155:[function(require,module,exports){
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
},{"./_stream_transform":157,"inherits":237}],156:[function(require,module,exports){
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
},{"../errors":153,"./_stream_duplex":154,"./internal/streams/async_iterator":159,"./internal/streams/buffer_list":160,"./internal/streams/destroy":161,"./internal/streams/from":163,"./internal/streams/state":165,"./internal/streams/stream":166,"_process":242,"buffer":167,"events":150,"inherits":237,"string_decoder/":249,"util":148}],157:[function(require,module,exports){
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
},{"../errors":153,"./_stream_duplex":154,"inherits":237}],158:[function(require,module,exports){
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
},{"../errors":153,"./_stream_duplex":154,"./internal/streams/destroy":161,"./internal/streams/state":165,"./internal/streams/stream":166,"_process":242,"buffer":167,"inherits":237,"util-deprecate":258}],159:[function(require,module,exports){
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
},{"./end-of-stream":162,"_process":242}],160:[function(require,module,exports){
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
},{"buffer":167,"util":148}],161:[function(require,module,exports){
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
},{"_process":242}],162:[function(require,module,exports){
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
},{"../../../errors":153}],163:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],164:[function(require,module,exports){
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
},{"../../../errors":153,"./end-of-stream":162}],165:[function(require,module,exports){
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
},{"../../../errors":153}],166:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":150}],167:[function(require,module,exports){
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
},{"base64-js":147,"buffer":167,"ieee754":236}],168:[function(require,module,exports){
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

},{"./":169,"get-intrinsic":232}],169:[function(require,module,exports){
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

},{"function-bind":231,"get-intrinsic":232}],170:[function(require,module,exports){
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

},{"./lib/is_arguments.js":171,"./lib/keys.js":172}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],173:[function(require,module,exports){
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

},{"object-keys":240}],174:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],175:[function(require,module,exports){
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

},{"./ToNumber":205,"./ToPrimitive":207,"./Type":212}],176:[function(require,module,exports){
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

},{"../helpers/isFinite":221,"../helpers/isNaN":222,"../helpers/isPrefixOf":223,"./ToNumber":205,"./ToPrimitive":207,"./Type":212,"get-intrinsic":232}],177:[function(require,module,exports){
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

},{"get-intrinsic":232}],178:[function(require,module,exports){
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

},{"./DayWithinYear":181,"./InLeapYear":185,"./MonthFromTime":195,"get-intrinsic":232}],179:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":227,"./floor":216}],180:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":216}],181:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":179,"./DayFromYear":180,"./YearFromTime":214}],182:[function(require,module,exports){
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

},{"./modulo":217}],183:[function(require,module,exports){
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

},{"../helpers/assertRecord":220,"./IsAccessorDescriptor":186,"./IsDataDescriptor":188,"./Type":212,"get-intrinsic":232}],184:[function(require,module,exports){
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

},{"../helpers/timeConstants":227,"./floor":216,"./modulo":217}],185:[function(require,module,exports){
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

},{"./DaysInYear":182,"./YearFromTime":214,"get-intrinsic":232}],186:[function(require,module,exports){
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

},{"../helpers/assertRecord":220,"./Type":212,"has":235}],187:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":238}],188:[function(require,module,exports){
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

},{"../helpers/assertRecord":220,"./Type":212,"has":235}],189:[function(require,module,exports){
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

},{"../helpers/assertRecord":220,"./IsAccessorDescriptor":186,"./IsDataDescriptor":188,"./Type":212}],190:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":224,"./IsAccessorDescriptor":186,"./IsDataDescriptor":188,"./Type":212}],191:[function(require,module,exports){
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

},{"../helpers/isFinite":221,"../helpers/timeConstants":227}],192:[function(require,module,exports){
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

},{"../helpers/isFinite":221,"./DateFromTime":178,"./Day":179,"./MonthFromTime":195,"./ToInteger":204,"./YearFromTime":214,"./floor":216,"./modulo":217,"get-intrinsic":232}],193:[function(require,module,exports){
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

},{"../helpers/isFinite":221,"../helpers/timeConstants":227,"./ToInteger":204}],194:[function(require,module,exports){
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

},{"../helpers/timeConstants":227,"./floor":216,"./modulo":217}],195:[function(require,module,exports){
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

},{"./DayWithinYear":181,"./InLeapYear":185}],196:[function(require,module,exports){
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

},{"../helpers/isNaN":222}],197:[function(require,module,exports){
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

},{"../helpers/timeConstants":227,"./floor":216,"./modulo":217}],198:[function(require,module,exports){
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

},{"./Type":212}],199:[function(require,module,exports){
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


},{"../helpers/isFinite":221,"./ToNumber":205,"./abs":215,"get-intrinsic":232}],200:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":227,"./DayFromYear":180}],201:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":227,"./modulo":217}],202:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],203:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":205}],204:[function(require,module,exports){
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

},{"../helpers/isFinite":221,"../helpers/isNaN":222,"../helpers/sign":226,"./ToNumber":205,"./abs":215,"./floor":216}],205:[function(require,module,exports){
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

},{"./ToPrimitive":207}],206:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":177,"get-intrinsic":232}],207:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":228}],208:[function(require,module,exports){
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

},{"./IsCallable":187,"./ToBoolean":202,"./Type":212,"get-intrinsic":232,"has":235}],209:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":232}],210:[function(require,module,exports){
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

},{"../helpers/isFinite":221,"../helpers/isNaN":222,"../helpers/sign":226,"./ToNumber":205,"./abs":215,"./floor":216,"./modulo":217}],211:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":205}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":179,"./modulo":217}],214:[function(require,module,exports){
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

},{"call-bind/callBound":168,"get-intrinsic":232}],215:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":232}],216:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],217:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":225}],218:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":227,"./modulo":217}],219:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":175,"./5/AbstractRelationalComparison":176,"./5/CheckObjectCoercible":177,"./5/DateFromTime":178,"./5/Day":179,"./5/DayFromYear":180,"./5/DayWithinYear":181,"./5/DaysInYear":182,"./5/FromPropertyDescriptor":183,"./5/HourFromTime":184,"./5/InLeapYear":185,"./5/IsAccessorDescriptor":186,"./5/IsCallable":187,"./5/IsDataDescriptor":188,"./5/IsGenericDescriptor":189,"./5/IsPropertyDescriptor":190,"./5/MakeDate":191,"./5/MakeDay":192,"./5/MakeTime":193,"./5/MinFromTime":194,"./5/MonthFromTime":195,"./5/SameValue":196,"./5/SecFromTime":197,"./5/StrictEqualityComparison":198,"./5/TimeClip":199,"./5/TimeFromYear":200,"./5/TimeWithinDay":201,"./5/ToBoolean":202,"./5/ToInt32":203,"./5/ToInteger":204,"./5/ToNumber":205,"./5/ToObject":206,"./5/ToPrimitive":207,"./5/ToPropertyDescriptor":208,"./5/ToString":209,"./5/ToUint16":210,"./5/ToUint32":211,"./5/Type":212,"./5/WeekDay":213,"./5/YearFromTime":214,"./5/abs":215,"./5/floor":216,"./5/modulo":217,"./5/msFromTime":218}],220:[function(require,module,exports){
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

},{"get-intrinsic":232,"has":235}],221:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],222:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],223:[function(require,module,exports){
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

},{"call-bind/callBound":168}],224:[function(require,module,exports){
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

},{"get-intrinsic":232,"has":235}],225:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],226:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],227:[function(require,module,exports){
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

},{}],228:[function(require,module,exports){
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

},{"./helpers/isPrimitive":229,"is-callable":238}],229:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],230:[function(require,module,exports){
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

},{}],231:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":230}],232:[function(require,module,exports){
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

},{"function-bind":231,"has":235,"has-symbols":233}],233:[function(require,module,exports){
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

},{"./shams":234}],234:[function(require,module,exports){
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

},{}],235:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":231}],236:[function(require,module,exports){
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

},{}],237:[function(require,module,exports){
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

},{}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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

},{"./isArguments":241}],240:[function(require,module,exports){
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

},{"./implementation":239,"./isArguments":241}],241:[function(require,module,exports){
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

},{}],242:[function(require,module,exports){
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

},{}],243:[function(require,module,exports){
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
},{"_process":242,"through":256,"timers":257}],244:[function(require,module,exports){
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

},{"buffer":167}],245:[function(require,module,exports){
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

},{"es-abstract/es5":219,"function-bind":231}],246:[function(require,module,exports){
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

},{"./implementation":245,"./polyfill":247,"./shim":248,"define-properties":173,"function-bind":231}],247:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":245}],248:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":247,"define-properties":173}],249:[function(require,module,exports){
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
},{"safe-buffer":244}],250:[function(require,module,exports){
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
},{"./lib/default_stream":251,"./lib/results":253,"./lib/test":254,"_process":242,"defined":174,"through":256,"timers":257}],251:[function(require,module,exports){
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
},{"_process":242,"fs":149,"through":256}],252:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":242,"timers":257}],253:[function(require,module,exports){
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
},{"_process":242,"events":150,"function-bind":231,"has":235,"inherits":237,"object-inspect":255,"resumer":243,"through":256,"timers":257}],254:[function(require,module,exports){
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
},{"./next_tick":252,"deep-equal":170,"defined":174,"events":150,"has":235,"inherits":237,"path":151,"string.prototype.trim":246}],255:[function(require,module,exports){
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

},{}],256:[function(require,module,exports){
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
},{"_process":242,"stream":152}],257:[function(require,module,exports){
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
},{"process/browser.js":242,"timers":257}],258:[function(require,module,exports){
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
},{}]},{},[130,131,132]);
