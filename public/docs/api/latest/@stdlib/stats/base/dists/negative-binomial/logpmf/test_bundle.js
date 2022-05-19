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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/uint16/max":57}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/uint32/max":58}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/uint8/max":59}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":181}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":181}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":181}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":181}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Euler's number.
*
* @module @stdlib/constants/float64/e
* @type {number}
*
* @example
* var E = require( '@stdlib/constants/float64/e' );
* // returns 2.718281828459045
*/


// MAIN //

/**
* Euler's number.
*
* @constant
* @type {number}
* @default 2.718281828459045
* @see [OEIS]{@link https://oeis.org/A001113}
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/E_(mathematical_constant)}
*/
var E = 2.718281828459045235360287471352662497757247093699959574966;


// EXPORTS //

module.exports = E;

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
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @module @stdlib/constants/float64/gamma-lanczos-g
* @type {number}
*
* @example
* var FLOAT64_GAMMA_LANCZOS_G = require( '@stdlib/constants/float64/gamma-lanczos-g' );
* // returns 10.900511
*/


// MAIN //

/**
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @constant
* @type {number}
* @default 10.900511
* @see [Lanczos Approximation]{@link https://en.wikipedia.org/wiki/Lanczos_approximation}
*/
var FLOAT64_GAMMA_LANCZOS_G = 10.90051099999999983936049829935654997826;


// EXPORTS //

module.exports = FLOAT64_GAMMA_LANCZOS_G;

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
* One half times the natural logarithm of 2.
*
* @module @stdlib/constants/float64/half-ln-two
* @type {number}
*
* @example
* var HALF_LN2 = require( '@stdlib/constants/float64/half-ln-two' );
* // returns 3.46573590279972654709e-01
*/

// MAIN //

/**
* One half times the natural logarithm of 2.
*
* ```tex
* \frac{\ln 2}{2}
* ```
*
* @constant
* @type {number}
* @default 3.46573590279972654709e-01
*/
var HALF_LN2 = 3.46573590279972654709e-01; // 0x3FD62E42 0xFEFA39EF


// EXPORTS //

module.exports = HALF_LN2;

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
* Natural logarithm of the maximum double-precision floating-point number.
*
* @module @stdlib/constants/float64/max-ln
* @type {number}
*
* @example
* var FLOAT64_MAX_LN = require( '@stdlib/constants/float64/max-ln' );
* // returns 709.782712893384
*/


// MAIN //

/**
* Natural logarithm of the maximum double-precision floating-point number.
*
* ## Notes
*
* The natural logarithm of the maximum is given by
*
* ```tex
* \ln \left( 2^{1023} (2 - 2^{-52}) \right)
* ```
*
* @constant
* @type {number}
* @default 709.782712893384
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_LN = 709.782712893384;


// EXPORTS //

module.exports = FLOAT64_MAX_LN;

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
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* @module @stdlib/constants/float64/min-ln
* @type {number}
*
* @example
* var FLOAT64_MIN_LN = require( '@stdlib/constants/float64/min-ln' );
* // returns -708.3964185322641
*/


// MAIN //

/**
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* -\ln \left( 2^{1023-1} \right)
* ```
*
* @constant
* @type {number}
* @default -708.3964185322641
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_LN = -708.3964185322641;


// EXPORTS //

module.exports = FLOAT64_MIN_LN;

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

},{"@stdlib/number/ctor":122}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_even.js":61}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-integer":64}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_integer.js":65}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":89}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":67}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a double-precision floating-point numeric value is negative zero.
*
* @module @stdlib/math/base/assert/is-negative-zero
*
* @example
* var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
*
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* bool = isNegativeZero( 0.0 );
* // returns false
*/

// MODULES //

var isNegativeZero = require( './main.js' );


// EXPORTS //

module.exports = isNegativeZero;

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

var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is negative zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is negative zero
*
* @example
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZero( 0.0 );
* // returns false
*/
function isNegativeZero( x ) {
	return (x === 0.0 && 1.0/x === NINF);
}


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/constants/float64/ninf":54}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_nonnegative_integer.js":71}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":89}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_odd.js":73}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-even":60}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a double-precision floating-point numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zero
*
* @example
* var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
*
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* bool = isPositiveZero( -0.0 );
* // returns false
*/

// MODULES //

var isPositiveZero = require( './main.js' );


// EXPORTS //

module.exports = isPositiveZero;

},{"./main.js":75}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*/
function isPositiveZero( x ) {
	return (x === 0.0 && 1.0/x === PINF);
}


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/constants/float64/pinf":55}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":77}],77:[function(require,module,exports){
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

},{"./main.js":79}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":81}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/from-words":126,"@stdlib/number/float64/base/get-high-word":130,"@stdlib/number/float64/base/to-words":141}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./expmulti.js":83,"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/trunc":120}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":85,"@stdlib/math/base/special/ldexp":94}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./exp.js":82}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FDLIBM]{@link http://www.netlib.org/fdlibm/s_expm1.c}. The implementation follows the original, but has been modified for JavaScript.
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
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var HALF_LN2 = require( '@stdlib/constants/float64/half-ln-two' );
var polyval = require( './polyval_q.js' );


// VARIABLES //

var OVERFLOW_THRESHOLD = 7.09782712893383973096e+02; // 0x40862E42 0xFEFA39EF

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3FE62E42 0xFEE00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3DEA39EF 0x35793C76

// 1 / ln(2):
var LN2_INV = 1.44269504088896338700e+00; // 0x3FF71547 0x652B82FE

// ln(2) * 56:
var LN2x56 = 3.88162421113569373274e+01; // 0x4043687A 0x9F1AF2B1

// ln(2) * 1.5:
var LN2_HALFX3 = 1.03972077083991796413e+00; // 0x3FF0A2B2 0x3F3BAB73


// MAIN //

/**
* Computes `exp(x) - 1`.
*
* ## Method
*
* 1.  Given \\(x\\), we use argument reduction to find \\(r\\) and an integer \\(k\\) such that
*
*     ```tex
*     x = k \cdot \ln(2) + r
*     ```
*
*     where
*
*     ```tex
*     |r| \leq \frac{\ln(2)}{2} \approx 0.34658
*     ```
*
*     <!-- <note> -->
*
*     A correction term \\(c\\) will need to be computed to compensate for the error in \\(r\\) when rounded to a floating-point number.
*
*     <!-- </note> -->
*
* 2.  To approximate \\(\operatorname{expm1}(r)\\), we use a special rational function on the interval \\(\[0,0.34658]\\). Since
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*     ```
*
*     we define \\(\operatorname{R1}(r^2)\\) by
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} \operatorname{R1}(r^2)
*     ```
*
*     That is,
*
*     ```tex
*     \begin{align*}
*     \operatorname{R1}(r^2) &= \frac{6}{r} \biggl(\frac{e^r+1}{e^r-1} - \frac{2}{r}\biggr) \\
*     &= \frac{6}{r} \biggl( 1 + 2 \biggl(\frac{1}{e^r-1} - \frac{1}{r}\biggr)\biggr) \\
*     &= 1 - \frac{r^2}{60} + \frac{r^4}{2520} - \frac{r^6}{100800} + \ldots
*     \end{align*}
*     ```
*
*     We use a special Remes algorithm on \\(\[0,0.347]\\) to generate a polynomial of degree \\(5\\) in \\(r^2\\) to approximate \\(\mathrm{R1}\\). The maximum error of this polynomial approximation is bounded by \\(2^{-61}\\). In other words,
*
*     ```tex
*     \operatorname{R1}(z) \approx 1 + \mathrm{Q1} \cdot z + \mathrm{Q2} \cdot z^2 + \mathrm{Q3} \cdot z^3 + \mathrm{Q4} \cdot z^4 + \mathrm{Q5} \cdot z^5
*     ```
*
*     where
*
*     ```tex
*     \begin{align*}
*     \mathrm{Q1} &= -1.6666666666666567384\mbox{e-}2 \\
*     \mathrm{Q2} &= 3.9682539681370365873\mbox{e-}4 \\
*     \mathrm{Q3} &= -9.9206344733435987357\mbox{e-}6 \\
*     \mathrm{Q4} &= 2.5051361420808517002\mbox{e-}7 \\
*     \mathrm{Q5} &= -6.2843505682382617102\mbox{e-}9
*     \end{align*}
*     ```
*
*     where \\(z = r^2\\) and the values of \\(\mathrm{Q1}\\) to \\(\mathrm{Q5}\\) are listed in the source. The error is bounded by
*
*     ```tex
*     \biggl| 1 + \mathrm{Q1} \cdot z + \ldots + \mathrm{Q5} \cdot z - \operatorname{R1}(z) \biggr| \leq 2^{-61}
*     ```
*
*     \\(\operatorname{expm1}(r) = e^r - 1\\) is then computed by the following specific way which minimizes the accumulated rounding error
*
*     ```tex
*     \operatorname{expm1}(r) = r + \frac{r^2}{2} + \frac{r^3}{2} \biggl( \frac{3 - (\mathrm{R1} + \mathrm{R1} \cdot \frac{r}{2})}{6 - r ( 3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr)
*     ```
*
*     To compensate for the error in the argument reduction, we use
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &= \operatorname{expm1}(r) + c + \operatorname{expm1}(r) \cdot c \\
*     &\approx \operatorname{expm1}(r) + c + rc
*     \end{align*}
*     ```
*
*     Thus, \\(c + rc\\) will be added in as the correction terms for \\(\operatorname{expm1}(r+c)\\). Now, we can rearrange the term to avoid optimization screw up.
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &\approx r - \biggl( \biggl( r + \biggl( \frac{r^2}{2} \biggl( \frac{\mathrm{R1} - (3 - \mathrm{R1} \cdot \frac{r}{2})}{6 - r (3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr) - c \biggr) - c \biggr) - \frac{r^2}{2} \biggr) \\
*     &= r - \mathrm{E}
*     \end{align*}
*     ```
*
* 3.  To scale back to obtain \\(\operatorname{expm1}(x)\\), we have (from step 1)
*
*     ```tex
*     \operatorname{expm1}(x) = \begin{cases}
*     2^k  (\operatorname{expm1}(r) + 1) - 1 \\
*     2^k (\operatorname{expm1}(r) + (1-2^{-k}))
*     \end{cases}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{expm1}(\infty) &= \infty \\
* \operatorname{expm1}(-\infty) &= -1 \\
* \operatorname{expm1}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* ## Notes
*
* -   For finite arguments, only \\(\operatorname{expm1}(0) = 0\\) is exact.
*
* -   To save one multiplication, we scale the coefficient \\(\mathrm{Qi}\\) to \\(\mathrm{Qi} \cdot {2^i}\\) and replace \\(z\\) by \\(\frac{x^2}{2}\\).
*
* -   To achieve maximum accuracy, we compute \\(\operatorname{expm1}(x)\\) by
*
*     -   if \\(x < -56 \cdot \ln(2)\\), return \\(-1.0\\) (raise inexact if \\(x\\) does not equal \\(\infty\\))
*
*     -   if \\(k = 0\\), return \\(r-\mathrm{E}\\)
*
*     -   if \\(k = -1\\), return \\(\frac{(r-\mathrm{E})-1}{2}\\)
*
*     -   if \\(k = 1\\),
*
*         -   if \\(r < -0.25\\), return \\(2((r+0.5)- \mathrm{E})\\)
*         -   else return \\(1+2(r-\mathrm{E})\\)
*
*     -   if \\(k < -2\\) or \\(k > 56\\), return \\(2^k(1-(\mathrm{E}-r)) - 1\\) (or \\(e^x-1\\))
*
*     -   if \\(k \leq 20\\), return \\(2^k((1-2^{-k})-(\mathrm{E}-r))\\)
*
*     -   else return \\(2^k(1-((\mathrm{E}+2^{-k})-r))\\)
*
* -   For IEEE 754 double, if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(\operatorname{expm1}(x)\\) will overflow.
*
* -   The hexadecimal values listed in the source are the intended ones for the implementation constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = expm1( 0.2 );
* // returns ~0.221
*
* @example
* var v = expm1( -9.0 );
* // returns ~-0.9999
*
* @example
* var v = expm1( 0.0 );
* // returns 0.0
*
* @example
* var v = expm1( NaN );
* // returns NaN
*/
function expm1( x ) {
	var halfX;
	var sign;
	var hi;
	var lo;
	var hx;
	var r1;
	var y;
	var z;
	var c;
	var t;
	var e;
	var k;

	if ( x === PINF || isnan( x ) ) {
		return x;
	}
	if ( x === NINF ) {
		return -1.0;
	}
	if ( x === 0.0 ) {
		return x; // handles +-0 (IEEE 754-2008)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		sign = true;
		y = -x;
	} else {
		sign = false;
		y = x;
	}
	// Filter out huge and non-finite arguments...
	if ( y >= LN2x56 ) { // if |x| >= 56*ln(2)
		if ( sign ) { // if x <= -56*ln(2)
			return -1.0;
		}
		if ( y >= OVERFLOW_THRESHOLD ) { // if |x| >= 709.78...
			return PINF;
		}
	}
	// Extract the more significant bits from |x|:
	hx = getHighWord( y )|0; // asm type annotation

	// Argument reduction...
	if ( y > HALF_LN2 ) { // if |x| > 0.5*ln(2)
		if ( y < LN2_HALFX3 ) { // if |x| < 1.5*ln(2)
			if ( sign ) {
				hi = x + LN2_HI;
				lo = -LN2_LO;
				k = -1;
			} else {
				hi = x - LN2_HI;
				lo = LN2_LO;
				k = 1;
			}
		} else {
			if ( sign ) {
				k = (LN2_INV*x) - 0.5;
			} else {
				k = (LN2_INV*x) + 0.5;
			}
			k |= 0; // use a bitwise OR to cast `k` to an integer (see also asm.js type annotations: http://asmjs.org/spec/latest/#annotations)
			t = k;
			hi = x - (t*LN2_HI); // t*ln2_hi is exact here
			lo = t * LN2_LO;
		}
		x = hi - lo;
		c = (hi-x) - lo;
	}
	// if |x| < 2**-54 => high word: 0 01111001001 00000000000000000000 => 0x3c900000 = 1016070144  => exponent = 01111001001 = 969 = 1023-54
	else if ( hx < 1016070144 ) {
		return x;
	}
	else {
		k = 0;
	}
	// x is now in primary range...
	halfX = 0.5 * x;
	z = x * halfX;

	r1 = 1.0 + ( z * polyval( z ) );

	t = 3.0 - (r1*halfX);
	e = z * ( (r1-t) / (6.0 - (x*t)) );
	if ( k === 0 ) {
		return x - ( (x*e) - z );	// c is 0
	}
	e = ( x * (e-c) ) - c;
	e -= z;
	if ( k === -1 ) {
		return ( 0.5*(x-e) )- 0.5;
	}
	if ( k === 1 ) {
		if ( x < -0.25 ) {
			return -2.0 * ( e - (x+0.5) );
		}
		return 1 + ( 2.0 * (x-e) );
	}
	if ( k <= -2 || k > 56 ) { // suffice to return exp(x)-1
		y = 1.0 - (e-x);

		// Add k to y's exponent:
		hi = (getHighWord( y ) + (k<<20))|0; // asm type annotation
		y = setHighWord( y, hi );

		return y - 1.0;
	}
	t = 1.0;
	if ( k < 20 ) {
		// 0x3ff00000 - (0x200000>>k) = 1072693248 - (0x200000>>k) => 0x200000 = 0 00000000010 00000000000000000000
		hi = (1072693248 - (0x200000>>k))|0; // asm type annotation
		t = setHighWord( t, hi ); // t=1-2^-k
		y = t - (e-x);
	} else {
		hi = ( (FLOAT64_EXPONENT_BIAS-k)<<20 )|0; // asm type annotation
		t = setHighWord( t, hi ); // t=2^-k
		y = x - (e+t);
		y += 1.0;
	}
	// Add k to y's exponent:
	hi = (getHighWord( y ) + (k<<20))|0; // asm type annotation
	return setHighWord( y, hi );
}


// EXPORTS //

module.exports = expm1;

},{"./polyval_q.js":88,"@stdlib/constants/float64/exponent-bias":44,"@stdlib/constants/float64/half-ln-two":46,"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/number/float64/base/get-high-word":130,"@stdlib/number/float64/base/set-high-word":136}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute `exp(x) - 1`.
*
* @module @stdlib/math/base/special/expm1
*
* @example
* var expm1 = require( '@stdlib/math/base/special/expm1' );
*
* var v = expm1( 0.2 );
* // returns ~0.221
*
* v = expm1( -9.0 );
* // returns ~-0.999
*
* v = expm1( 0.0 );
* // returns 0.0
*
* v = expm1( NaN );
* // returns NaN
*/

// MODULES //

var expm1 = require( './expm1.js' );


// EXPORTS //

module.exports = expm1;

},{"./expm1.js":86}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return -0.03333333333333313;
	}
	return -0.03333333333333313 + (x * (0.0015873015872548146 + (x * (-0.0000793650757867488 + (x * (0.000004008217827329362 + (x * -2.0109921818362437e-7))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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

},{}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/lanczos.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* Copyright John Maddock 2006.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MAIN //

/**
* Calculates the Lanczos sum for the approximation of the gamma function (scaled by `exp(-g)`, where `g = 10.900511`.
*
* @name gammaLanczosSumExpGScaled
* @type {Function}
* @param {number} x - input value
* @returns {number} Lanczos sum approximation
*
* @example
* var v = gammaLanczosSumExpGScaled( 4.0 );
* // returns ~0.018
*
* @example
* var v = gammaLanczosSumExpGScaled( -1.5 );
* // returns ~25.337
*
* @example
* var v = gammaLanczosSumExpGScaled( -0.5 );
* // returns ~-12.911
*
* @example
* var v = gammaLanczosSumExpGScaled( 0.5 );
* // returns ~1.772
*
* @example
* var v = gammaLanczosSumExpGScaled( 0.0 );
* // returns Infinity
*
* @example
* var v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/
var gammaLanczosSumExpGScaled = require( './rational_pq.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./rational_pq.js":93}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Calculate the Lanczos sum for the approximation of the gamma function (scaled by `exp(-g)`, where `g = 10.900511`.
*
* @module @stdlib/math/base/special/gamma-lanczos-sum-expg-scaled
*
* @example
* var gammaLanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
*
* var v = gammaLanczosSumExpGScaled( 4.0 );
* // returns ~0.018
*
* v = gammaLanczosSumExpGScaled( -1.5 );
* // returns ~25.337
*
* v = gammaLanczosSumExpGScaled( -0.5 );
* // returns ~-12.911
*
* v = gammaLanczosSumExpGScaled( 0.5 );
* // returns ~1.772
*
* v = gammaLanczosSumExpGScaled( 0.0 );
* // returns Infinity
*
* v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/

// MODULES //

var gammaLanczosSumExpGScaled = require( './gamma_lanczos_sum_expg_scaled.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./gamma_lanczos_sum_expg_scaled.js":91}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return Infinity;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 709811.662581658 + (x * (679979.8474157227 + (x * (293136.7857211597 + (x * (74887.54032914672 + (x * (12555.290582413863 + (x * (1443.4299244417066 + (x * (115.24194596137347 + (x * (6.309239205732627 + (x * (0.22668404630224365 + (x * (0.004826466289237662 + (x * 0.00004624429436045379))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (362880.0 + (x * (1026576.0 + (x * (1172700.0 + (x * (723680.0 + (x * (269325.0 + (x * (63273.0 + (x * (9450.0 + (x * (870.0 + (x * (45.0 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.00004624429436045379 + (x * (0.004826466289237662 + (x * (0.22668404630224365 + (x * (6.309239205732627 + (x * (115.24194596137347 + (x * (1443.4299244417066 + (x * (12555.290582413863 + (x * (74887.54032914672 + (x * (293136.7857211597 + (x * (679979.8474157227 + (x * 709811.662581658))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (45.0 + (x * (870.0 + (x * (9450.0 + (x * (63273.0 + (x * (269325.0 + (x * (723680.0 + (x * (1172700.0 + (x * (1026576.0 + (x * (362880.0 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

},{"@stdlib/constants/float64/exponent-bias":44,"@stdlib/constants/float64/max-base2-exponent":50,"@stdlib/constants/float64/max-base2-exponent-subnormal":49,"@stdlib/constants/float64/min-base2-exponent-subnormal":52,"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/copysign":80,"@stdlib/number/float64/base/exponent":124,"@stdlib/number/float64/base/from-words":126,"@stdlib/number/float64/base/normalize":132,"@stdlib/number/float64/base/to-words":141}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ln.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":98,"./polyval_q.js":99,"@stdlib/constants/float64/exponent-bias":44,"@stdlib/constants/float64/ninf":54,"@stdlib/math/base/assert/is-nan":66,"@stdlib/number/float64/base/get-high-word":130,"@stdlib/number/float64/base/set-high-word":136}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the natural logarithm of \\(1+x\\).
*
* @module @stdlib/math/base/special/log1p
*
* @example
* var log1p = require( '@stdlib/math/base/special/log1p' );
*
* var v = log1p( 4.0 );
* // returns ~1.609
*
* v = log1p( -1.0 );
* // returns -Infinity
*
* v = log1p( 0.0 );
* // returns 0.0
*
* v = log1p( -0.0 );
* // returns -0.0
*
* v = log1p( -2.0 );
* // returns NaN
*
* v = log1p( NaN );
* // returns NaN
*/

// MODULES //

var log1p = require( './log1p.js' );


// EXPORTS //

module.exports = log1p;

},{"./log1p.js":101}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FDLIBM]{@link http://www.netlib.org/fdlibm/s_log1p.c}. The implementation follows the original, but has been modified for JavaScript.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var polyval = require( './polyval_lp.js' );


// VARIABLES //

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3fe62e42 0xfee00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3dea39ef 0x35793c76

// sqrt(2)-1:
var SQRT2M1 = 4.142135623730950488017e-01; // 0x3fda8279 0x99fcef34

// sqrt(2)/2-1:
var SQRT2HALFM1 = -2.928932188134524755992e-01; // 0xbfd2bec3 0x33018866

// 2**-29:
var SMALL = 1.862645149230957e-09; // 0x3e200000 0x00000000

// 2**-54:
var TINY = 5.551115123125783e-17;

// Max integer (unsafe) => 2**53:
var TWO53 = 9007199254740992;

// 2/3:
var TWO_THIRDS = 6.666666666666666666e-01;


// MAIN //

/**
* Evaluates the natural logarithm of \\(1+x\\).
*
* ## Method
*
* 1.  Argument Reduction: find \\(k\\) and \\(f\\) such that
*
*     ```tex
*     1+x = 2^k (1+f)
*     ```
*
*     where
*
*     ```tex
*     \frac{\sqrt{2}}{2} < 1+f < \sqrt{2}
*     ```
*
*     <!-- <note> -->
*
*     If \\(k=0\\), then \\(f=x\\) is exact. However, if \\(k \neq 0\\), then \\(f\\) may not be representable exactly. In that case, a correction term is needed. Let
*
*     ```tex
*     u = \operatorname{round}(1+x)
*     ```
*
*     and
*
*     ```tex
*     c = (1+x) - u
*     ```
*
*     then
*
*     ```tex
*     \ln (1+x) - \ln u \approx \frac{c}{u}
*     ```
*
*     We can thus proceed to compute \\(\ln(u)\\), and add back the correction term \\(c/u\\).
*
*     <!-- </note> -->
*
*     <!-- <note> -->
*
*     When \\(x > 2^{53}\\), one can simply return \\(\ln(x)\\).
*
*     <!-- </note> -->
*
* 2.  Approximation of \\(\operatorname{log1p}(f)\\). Let
*
*     ```tex
*     s = \frac{f}{2+f}
*     ```
*
*     based on
*
*     ```tex
*     \begin{align*}
*     \ln 1+f &= \ln (1+s) - \ln (1-s) \\
*             &= 2s + \frac{2}{3} s^3 + \frac{2}{5} s^5 + ... \\
*             &= 2s + sR \\
*     \end{align*}
*     ```
*
*     We use a special Reme algorithm on \\(\[0,0.1716\]\\) to generate a polynomial of degree \\(14\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-58.45}\\). In other words,
*
*     ```tex
*     R(z) \approx \mathrm{Lp}_1 s^2 + \mathrm{Lp}_2 s^4 + \mathrm{Lp}_3 s^6 + \mathrm{Lp}_4 s^8 + \mathrm{Lp}_5 s^{10} + \mathrm{Lp}_6 s^{12} + \mathrm{Lp}_7 s^{14}
*     ```
*
*     and
*
*     ```tex
*     | \mathrm{Lp}_1 s^2 + \ldots + \mathrm{Lp}_7 s^14 - R(z) | \leq 2^{-58.45}
*     ```
*
*     <!-- <note> -->
*
*     The values of \\(Lp1\\) to \\(Lp7\\) may be found in the source.
*
*     <!-- </note> -->
*
*     Note that
*
*     ```tex
*     \begin{align*}
*     2s &= f - sf \\
*        &= f - \frac{f^2}{2} + s \frac{f^2}{2} \\
*     \end{align*}
*     ```
*
*     In order to guarantee error in \\(\ln\\) below \\(1\ \mathrm{ulp}\\), we compute the log by
*
*     ```tex
*     \operatorname{log1p}(f) = f - \biggl(\frac{f^2}{2} - s\biggl(\frac{f^2}{2}+R\biggr)\biggr)
*     ```
*
* 3.  Finally,
*
*     ```tex
*     \begin{align*}
*     \operatorname{log1p}(x) &= k \cdot \mathrm{ln2} + \operatorname{log1p}(f) \\
*     &= k \cdot \mathrm{ln2}_{hi}+\biggl(f-\biggl(\frac{f^2}{2}-\biggl(s\biggl(\frac{f^2}{2}+R\biggr)+k \cdot \mathrm{ln2}_{lo}\biggr)\biggr)\biggr) \\
*     \end{align*}
*     ```
*
*     Here \\(\mathrm{ln2}\\) is split into two floating point numbers:
*
*     ```tex
*     \mathrm{ln2}_{hi} + \mathrm{ln2}_{lo}
*     ```
*
*     where \\(n \cdot \mathrm{ln2}_{hi}\\) is always exact for \\(|n| < 2000\\).
*
*
* ## Special Cases
*
* -   \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* -   \\(\operatorname{log1p}(+\infty) = +\infty\\)
* -   \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* -   \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
*
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   The hexadecimal values are the intended ones for the used constants. The decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the hexadecimal values shown.
*
* -   Assuming \\(\ln(x)\\) is accurate, the following algorithm can be used to evaluate \\(\operatorname{log1p}(x)\\) to within a few ULP:
*
*     ```javascript
*     var u = 1.0 + x;
*     if ( u === 1.0 ) {
*         return x;
*     } else {
*         return ln(u) * (x/(u-1.0));
*     }
*     ```
*
*     See HP-15C Advanced Functions Handbook, p.193.
*
*
* @param {number} x - input value
* @returns {number} the natural logarithm of `1+x`
*
* @example
* var v = log1p( 4.0 );
* // returns ~1.609
*
* @example
* var v = log1p( -1.0 );
* // returns -Infinity
*
* @example
* var v = log1p( 0.0 );
* // returns 0.0
*
* @example
* var v = log1p( -0.0 );
* // returns -0.0
*
* @example
* var v = log1p( -2.0 );
* // returns NaN
*
* @example
* var v = log1p( NaN );
* // returns NaN
*/
function log1p( x ) {
	var hfsq;
	var hu;
	var y;
	var f;
	var c;
	var s;
	var z;
	var R;
	var u;
	var k;

	if ( x < -1.0 || isnan( x ) ) {
		return NaN;
	}
	if ( x === -1.0 ) {
		return NINF;
	}
	if ( x === PINF ) {
		return x;
	}
	if ( x === 0.0 ) {
		return x; // handle +-0 (IEEE 754-2008 spec)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		y = -x;
	} else {
		y = x;
	}
	// Argument reduction...
	k = 1;

	// Check if argument reduction is needed and if we can just return a small value approximation requiring less computation but with equivalent accuracy...
	if ( y < SQRT2M1 ) { // if |x| < sqrt(2)-1 => ~0.41422
		if ( y < SMALL ) { // if |x| < 2**-29
			if ( y < TINY ) { // if |x| < 2**-54
				return x;
			}
			// Use a simple two-term Taylor series...
			return x - ( x*x*0.5 );
		}
		// Check if `f=x` can be represented exactly (no need for correction terms), allowing us to bypass argument reduction...
		if ( x > SQRT2HALFM1 ) { // if x > sqrt(2)/2-1 => ~-0.2929
			// -0.2929 < x < 0.41422
			k = 0;
			f = x; // exact
			hu = 1;
		}
	}
	// Address case where `f` cannot be represented exactly...
	if ( k !== 0 ) {
		if ( y < TWO53 ) {
			u = 1.0 + x;
			hu = getHighWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - FLOAT64_EXPONENT_BIAS;

			// Correction term...
			if ( k > 0 ) { // positive unbiased exponent
				c = 1.0 - (u-x);
			} else { // nonpositive unbiased exponent
				c = x - (u-1.0);
			}
			c /= u;
		} else {
			u = x;
			hu = getHighWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - FLOAT64_EXPONENT_BIAS;

			// Correction term is zero:
			c = 0;
		}
		// Apply a bit mask (0 00000000000 11111111111111111111) to remove the exponent:
		hu &= 0x000fffff; // max value => 1048575

		// Check if u significand is less than sqrt(2) significand => 0x6a09e => 01101010000010011110
		if ( hu < 434334 ) {
			// Normalize u by setting the exponent to 1023 (bias) => 0x3ff00000 => 0 01111111111 00000000000000000000
			u = setHighWord( u, hu|0x3ff00000 );
		} else {
			k += 1;

			// Normalize u/2 by setting the exponent to 1022 (bias-1 => 2**-1 = 1/2) => 0x3fe00000 => 0 01111111110 00000000000000000000
			u = setHighWord( u, hu|0x3fe00000 );

			// Subtract hu significand from next largest hu => 0 00000000001 00000000000000000000 => 0x00100000 => 1048576
			hu = (1048576-hu)>>2;
		}
		f = u - 1.0;
	}
	// Approximation of log1p(f)...
	hfsq = 0.5 * f * f;
	if ( hu === 0 ) { // if |f| < 2**-20
		if ( f === 0.0 ) {
			c += k * LN2_LO;
			return ( k * LN2_HI ) + c;
		}
		R = hfsq * (1.0 - ( TWO_THIRDS*f ) ); // avoid division
		return ( k*LN2_HI ) - ( (R - ( (k*LN2_LO) + c)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;

	R = z * polyval( z );

	if ( k === 0 ) {
		return f - ( hfsq - ( s*(hfsq+R) ) );
	}
	return ( k*LN2_HI ) - ( (hfsq - ( (s*(hfsq+R)) + ((k*LN2_LO) + c))) - f );
}


// EXPORTS //

module.exports = log1p;

},{"./polyval_lp.js":102,"@stdlib/constants/float64/exponent-bias":44,"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/number/float64/base/get-high-word":130,"@stdlib/number/float64/base/set-high-word":136}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
	return 0.6666666666666735 + (x * (0.3999999999940942 + (x * (0.2857142874366239 + (x * (0.22222198432149784 + (x * (0.1818357216161805 + (x * (0.15313837699209373 + (x * 0.14798198605116586))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return the maximum value.
*
* @module @stdlib/math/base/special/max
*
* @example
* var max = require( '@stdlib/math/base/special/max' );
*
* var v = max( 3.14, 4.2 );
* // returns 4.2
*
* v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* v = max( 3.14, NaN );
* // returns NaN
*
* v = max( +0.0, -0.0 );
* // returns +0.0
*/

// MODULES //

var max = require( './max.js' );


// EXPORTS //

module.exports = max;

},{"./max.js":104}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Returns the maximum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} maximum value
*
* @example
* var v = max( 3.14, 4.2 );
* // returns 4.2
*
* @example
* var v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* @example
* var v = max( 3.14, NaN );
* // returns NaN
*
* @example
* var v = max( +0.0, -0.0 );
* // returns +0.0
*/
function max( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === PINF || y === PINF ) {
			return PINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isPositiveZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x > y ) {
			return x;
		}
		return y;
	}
	m = NINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === PINF ) {
			return v;
		}
		if ( v > m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isPositiveZero( v )
		) {
			m = v;
		}
	}
	return m;
}


// EXPORTS //

module.exports = max;

},{"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-positive-zero":74}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return the minimum value.
*
* @module @stdlib/math/base/special/min
*
* @example
* var min = require( '@stdlib/math/base/special/min' );
*
* var v = min( 3.14, 4.2 );
* // returns 3.14
*
* v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* v = min( 3.14, NaN );
* // returns NaN
*
* v = min( +0.0, -0.0 );
* // returns -0.0
*/

// MODULES //

var min = require( './min.js' );


// EXPORTS //

module.exports = min;

},{"./min.js":106}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Returns the minimum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} minimum value
*
* @example
* var v = min( 3.14, 4.2 );
* // returns 3.14
*
* @example
* var v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* @example
* var v = min( 3.14, NaN );
* // returns NaN
*
* @example
* var v = min( +0.0, -0.0 );
* // returns -0.0
*/
function min( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === NINF || y === NINF ) {
			return NINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isNegativeZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x < y ) {
			return x;
		}
		return y;
	}
	m = PINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === NINF ) {
			return v;
		}
		if ( v < m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isNegativeZero( v )
		) {
			m = v;
		}
	}
	return m;
}


// EXPORTS //

module.exports = min;

},{"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-negative-zero":68}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./pow.js":113}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":110,"@stdlib/constants/float64/exponent-bias":44,"@stdlib/number/float64/base/get-high-word":130,"@stdlib/number/float64/base/set-high-word":136,"@stdlib/number/float64/base/set-low-word":138}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":112,"@stdlib/number/float64/base/set-low-word":138}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./log2ax.js":108,"./logx.js":109,"./pow2.js":114,"./x_is_zero.js":115,"./y_is_huge.js":116,"./y_is_infinite.js":117,"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-integer":64,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-odd":72,"@stdlib/math/base/special/abs":76,"@stdlib/math/base/special/sqrt":118,"@stdlib/number/float64/base/set-low-word":138,"@stdlib/number/float64/base/to-words":141,"@stdlib/number/uint32/base/to-int32":145}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":111,"@stdlib/constants/float64/exponent-bias":44,"@stdlib/constants/float64/ln-two":48,"@stdlib/math/base/special/ldexp":94,"@stdlib/number/float64/base/get-high-word":130,"@stdlib/number/float64/base/set-high-word":136,"@stdlib/number/float64/base/set-low-word":138,"@stdlib/number/uint32/base/to-int32":145}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-odd":72,"@stdlib/math/base/special/copysign":80}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/number/float64/base/get-high-word":130}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/special/abs":76}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":119}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":121}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":78,"@stdlib/math/base/special/floor":89}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":123}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":125}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":44,"@stdlib/constants/float64/high-word-exponent-mask":47,"@stdlib/number/float64/base/get-high-word":130}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":128}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":127,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":131}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":129,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":133}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":134}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":56,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":76}],135:[function(require,module,exports){
arguments[4][129][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":129}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":135,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":140}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":34}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":139,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":143}],142:[function(require,module,exports){
arguments[4][127][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":127}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":144}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":142,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":146}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var ibetaDerivative = require( './ibeta_derivative.js' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability mass function (PMF) for a negative binomial distribution with number of successes until experiment is stopped `r` and success probability `p`.
*
* @param {PositiveNumber} r - number of successes until experiment is stopped
* @param {Probability} p - success probability
* @returns {Function} logPMF
*
* @example
* var logpmf = factory( 10, 0.5 );
* var y = logpmf( 3.0 );
* // returns ~-3.617
*
* y = logpmf( 5.0 );
* // returns ~-2.795
*/
function factory( r, p ) {
	if (
		isnan( r ) ||
		isnan( p ) ||
		r <= 0.0 ||
		p <= 0.0 ||
		p > 1.0
	) {
		return constantFunction( NaN );
	}
	return logpmf;

	/**
	* Evaluates the natural logarithm of the probability mass function (PMF) for a negative binomial distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPMF
	*
	* @example
	* var y = logpmf( 2.0 );
	* // returns <number>
	*/
	function logpmf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( !isNonNegativeInteger( x ) ) {
			return NINF;
		}
		return ln( p ) - ln( r + x ) + ln( ibetaDerivative( p, r, x + 1.0 ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"./ibeta_derivative.js":148,"@stdlib/constants/float64/ninf":54,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-nonnegative-integer":70,"@stdlib/math/base/special/ln":96,"@stdlib/utils/constant-function":173}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var ibetaPowerTerms = require( './ibeta_power_terms.js' );


// MAIN //

/**
* Computes the partial derivative with respect to x of the incomplete beta function.
*
* @private
* @param {Probability} x - input value (0 < x <= 1)
* @param {PositiveNumber} a - first parameter
* @param {PositiveNumber} b - second parameter (must be greater than 1)
* @returns {number} value of the partial derivative
*/
function ibetaDerivative( x, a, b ) {
	var f1;
	var y;
	if ( x === 1.0 ) {
		return 0.0;
	}
	// Regular cases:
	f1 = ibetaPowerTerms( a, b, x, 1.0 - x, true );
	y = ( 1.0 - x ) * x;
	f1 /= y;
	return f1;
}


// EXPORTS //

module.exports = ibetaDerivative;

},{"./ibeta_power_terms.js":149}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/beta.hpp}. The implementation has been modified for JavaScript.
*
* ```text
* (C) Copyright John Maddock 2006.
*
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
* ```
*/

'use strict';

// MODULES //

var lanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/constants/float64/max-ln' );
var MIN_LN = require( '@stdlib/constants/float64/min-ln' );
var G = require( '@stdlib/constants/float64/gamma-lanczos-g' );
var E = require( '@stdlib/constants/float64/e' );


// MAIN //

/**
* Computes the leading power terms in the incomplete beta function.
*
* When normalized,
*
* ```tex
* \frac{ x^a y^b }{ \operatorname{Beta}(a,b) }
* ```
*
* and otherwise
*
* ```tex
* x^a y^b
* ```
*
* ## Notes
*
* -   Almost all of the error in the incomplete beta comes from this function, particularly when \\( a \\) and \\( b \\) are large. Computing large powers are _hard_ though, and using logarithms just leads to horrendous cancellation errors.
*
* -   For \\( l1 * l2 > 0 \\) or \\( \operatorname{min}( a, b ) < 1 \\), the two power terms both go in the same direction (towards zero or towards infinity). In this case if either term overflows or underflows, then the product of the two must do so also. Alternatively, if one exponent is less than one, then we can't productively use it to eliminate overflow or underflow from the other term.  Problems with spurious overflow/underflow can't be ruled out in this case, but it is _very_ unlikely since one of the power terms will evaluate to a number close to 1.
*
* -   If \\( \max( \abs(l1), \abs(l2) ) < 0.5 \\), both exponents are near one and both the exponents are greater than one, and, further, these two power terms tend in opposite directions (one toward zero, the other toward infinity), so we have to combine the terms to avoid any risk of overflow or underflow. We do this by moving one power term inside the other, we have:
*
*     ```tex
*     (1 + l_1)^a \cdot (1 + l_2)^b \\
*     = ((1 + l_1) \cdot (1 + l_2)^(b/a))^a \\
*     = (1 + l_1 + l_3 + l_1*l_3)^a
*     ```
*
*     and
*
*     ```tex
*     l_3 = (1 + l_2)^(b/a) - 1 \\
*     = \exp((b/a) * \ln(1 + l_2)) - 1
*     ```
*
*     The tricky bit is deciding which term to move inside. By preference we move the larger term inside, so that the size of the largest exponent is reduced.  However, that can only be done as long as l3 (see above) is also small.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {boolean} normalized - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @returns {number} power terms
*/
function ibetaPowerTerms( a, b, x, y, normalized ) {
	var result;
	var smallA;
	var ratio;
	var agh;
	var bgh;
	var cgh;
	var l1;
	var l2;
	var l3;
	var p1;
	var b1;
	var b2;
	var c;
	var l;

	if ( !normalized ) {
		// Can we do better here?
		return pow( x, a ) * pow( y, b );
	}
	c = a + b;

	// Combine power terms with Lanczos approximation:
	agh = a + G - 0.5;
	bgh = b + G - 0.5;
	cgh = c + G - 0.5;
	result = lanczosSumExpGScaled( c );
	result /= lanczosSumExpGScaled( a ) * lanczosSumExpGScaled( b );

	// Combine with the leftover terms from the Lanczos approximation:
	result *= sqrt( bgh / E );
	result *= sqrt( agh / cgh );

	// `l1` and `l2` are the base of the exponents minus one:
	l1 = ( ( x * b ) - ( y * agh ) ) / agh;
	l2 = ( ( y * a ) - ( x * bgh ) ) / bgh;
	if ( min( abs(l1), abs(l2) ) < 0.2 ) {
		// When the base of the exponent is very near 1 we get really gross errors unless extra care is taken:
		if ( l1 * l2 > 0 || min( a, b ) < 1 ) {
			if ( abs(l1) < 0.1 ) {
				result *= exp( a * log1p( l1 ) );
			} else {
				result *= pow( ( x*cgh ) / agh, a );
			}
			if ( abs(l2) < 0.1 ) {
				result *= exp( b * log1p( l2 ) );
			} else {
				result *= pow((y * cgh) / bgh, b);
			}
		}
		else if ( max( abs(l1), abs(l2) ) < 0.5 ) {
			smallA = a < b;
			ratio = b / a;
			if (
				(smallA && (ratio * l2 < 0.1)) ||
				(!smallA && (l1 / ratio > 0.1))
			) {
				l3 = expm1( ratio * log1p( l2 ) );
				l3 = l1 + l3 + ( l3 * l1 );
				l3 = a * log1p( l3 );
				result *= exp( l3 );
			}
			else {
				l3 = expm1( log1p( l1 ) / ratio );
				l3 = l2 + l3 + ( l3 * l2 );
				l3 = b * log1p( l3 );
				result *= exp( l3 );
			}
		}
		else if ( abs(l1) < abs(l2) ) {
			// First base near 1 only:
			l = ( a * log1p( l1 ) ) + ( b * ln( ( y*cgh ) / bgh ) );
			if ( l <= MIN_LN || l >= MAX_LN ) {
				l += ln(result);
				if ( l >= MAX_LN ) {
					return NaN;
				}
				result = exp( l );
			} else {
				result *= exp( l );
			}
		}
		else {
			// Second base near 1 only:
			l = ( b * log1p( l2 ) ) + ( a * ln( (x*cgh) / agh ) );
			if ( l <= MIN_LN || l >= MAX_LN ) {
				l += ln(result);
				if ( l >= MAX_LN ) {
					return NaN;
				}
				result = exp( l );
			} else {
				result *= exp( l );
			}
		}
	}
	else {
		// General case:
		b1 = (x * cgh) / agh;
		b2 = (y * cgh) / bgh;
		l1 = a * ln(b1);
		l2 = b * ln(b2);
		if (
			l1 >= MAX_LN ||
			l1 <= MIN_LN ||
			l2 >= MAX_LN ||
			l2 <= MIN_LN
		) {
			// Oops, under/overflow, sidestep if we can:
			if ( a < b ) {
				p1 = pow( b2, b / a );
				l3 = a * ( ln(b1) + ln(p1) );
				if ( l3 < MAX_LN && l3 > MIN_LN ) {
					result *= pow( p1 * b1, a );
				} else {
					l2 += l1 + ln(result);
					if ( l2 >= MAX_LN ) {
						return NaN;
					}
					result = exp( l2 );
				}
			}
			else {
				p1 = pow( b1, a / b );
				l3 = ( ln(p1) + ln(b2) ) * b;
				if ( l3 < MAX_LN && l3 > MIN_LN ) {
					result *= pow( p1 * b2, b );
				} else {
					l2 += l1 + ln( result );
					if (l2 >= MAX_LN) {
						return NaN;
					}
					result = exp( l2 );
				}
			}
		}
		else {
			// Finally the normal case:
			result *= pow( b1, a ) * pow( b2, b );
		}
	}
	return result;
}


// EXPORTS //

module.exports = ibetaPowerTerms;

},{"@stdlib/constants/float64/e":42,"@stdlib/constants/float64/gamma-lanczos-g":45,"@stdlib/constants/float64/max-ln":51,"@stdlib/constants/float64/min-ln":53,"@stdlib/math/base/special/abs":76,"@stdlib/math/base/special/exp":84,"@stdlib/math/base/special/expm1":87,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":92,"@stdlib/math/base/special/ln":96,"@stdlib/math/base/special/log1p":100,"@stdlib/math/base/special/max":103,"@stdlib/math/base/special/min":105,"@stdlib/math/base/special/pow":107,"@stdlib/math/base/special/sqrt":118}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Natural logarithm of the probability mass function (PMF) for a negative binomial distribution.
*
* @module @stdlib/stats/base/dists/negative-binomial/logpmf
*
* @example
* var logpmf = require( '@stdlib/stats/base/dists/negative-binomial/logpmf' );
*
* var y = logpmf( 5.0, 20.0, 0.8 );
* // returns ~-1.853
*
* y = logpmf( 21.0, 20.0, 0.5 );
* // returns ~-2.818
*
* y = logpmf( 5.0, 10.0, 0.4 );
* // returns ~-4.115
*
* y = logpmf( 0.0, 10.0, 0.9 );
* // returns ~-1.054
*
* y = logpmf( 21.0, 15.5, 0.5 );
* // returns ~-3.292
*
* y = logpmf( 5.0, 7.4, 0.4 );
* // returns ~-2.976
*
* var mylogpmf = logpmf.factory( 10, 0.5 );
* y = mylogpmf( 3.0 );
* // returns ~-3.612
*
* y = mylogpmf( 5.0 );
* // returns ~-2.797
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var logpmf = require( './logpmf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpmf, 'factory', factory );


// EXPORTS //

module.exports = logpmf;

},{"./factory.js":147,"./logpmf.js":151,"@stdlib/utils/define-nonenumerable-read-only-property":174}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var ibetaDerivative = require( './ibeta_derivative.js' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability mass function (PMF) for a negative binomial distribution with number of successes until experiment is stopped `r` and success probability `p`.
*
* @param {number} x - input value
* @param {PositiveNumber} r - number of successes until experiment is stopped
* @param {Probability} p - success probability
* @returns {number} evaluated logPMF
*
* @example
* var y = logpmf( 5.0, 20.0, 0.8 );
* // returns ~-1.853
*
* @example
* var y = logpmf( 21.0, 20.0, 0.5 );
* // returns ~-2.818
*
* @example
* var y = logpmf( 5.0, 10.0, 0.4 );
* // returns ~-4.115
*
* @example
* var y = logpmf( 0.0, 10.0, 0.9 );
* // returns ~-1.054
*
* @example
* var y = logpmf( 21.0, 15.5, 0.5 );
* // returns ~-3.292
*
* @example
* var y = logpmf( 5.0, 7.4, 0.4 );
* // returns ~-2.976
*
* @example
* var y = logpmf( 2.0, 0.0, 0.5 );
* // returns NaN
*
* @example
* var y = logpmf( 2.0, -2.0, 0.5 );
* // returns NaN
*
* @example
* var y = logpmf( 2.0, 20, -1.0 );
* // returns NaN
*
* @example
* var y = logpmf( 2.0, 20, 1.5 );
* // returns NaN
*
* @example
* var y = logpmf( NaN, 20.0, 0.5 );
* // returns NaN
*
* @example
* var y = logpmf( 0.0, NaN, 0.5 );
* // returns NaN
*
* @example
* var y = logpmf( 0.0, 20.0, NaN );
* // returns NaN
*/
function logpmf( x, r, p ) {
	if (
		isnan( x ) ||
		isnan( r ) ||
		isnan( p ) ||
		r <= 0.0 ||
		p <= 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	if ( !isNonNegativeInteger( x ) || p === 0.0 ) {
		return NINF;
	}
	return ln( p ) - ln( r + x ) + ln( ibetaDerivative( p, r, x + 1.0 ) );
}


// EXPORTS //

module.exports = logpmf;

},{"./ibeta_derivative.js":148,"@stdlib/constants/float64/ninf":54,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-nonnegative-integer":70,"@stdlib/math/base/special/ln":96}],152:[function(require,module,exports){
module.exports={"expected":[-20.167787730691515,-74.48205105411583,-11.099694066971542,-16.05865263727056,-21.417751999202267,-89.88189489203157,-25.77725157827624,-67.12777465401618,-50.228028778354265,-57.27427934953932,-107.69191723575024,-92.14771095236478,-50.75927362848347,-31.887184643561746,-101.23745717111154,-51.39011069422933,-75.21650237792228,-39.848907998648706,-25.052110635321856,-26.203428295404763,-29.316396000208655,-77.66838735722905,-153.95198289269365,-80.2254672715094,-137.01943331576433,-10.522002442873069,-61.7031548111517,-93.65605137724339,-7.403406198063531,-44.74558073645924,-134.62929459041848,-66.24185712501654,-42.58276284853417,-26.20797481644333,-79.0299112520183,-127.03004837953317,-138.4943487752742,-44.330179931570214,-2.2144636151775443,-54.539766835751664,-30.25492884748736,-79.8337176392437,-109.39291916134394,-2.5260927524616754,-2.7791349489531365,-67.9539704181982,-2.83897827936221,-46.430737341268376,-6.117662616551402,-111.39886408979385,-17.22040620440448,-17.878152731202682,-10.15814696207444,-21.31891123106015,-38.52433618134083,-28.9126916573309,-89.6898280894852,-40.14443507808553,-5.265313440757981,-18.567335471476117,-18.014308104783012,-4.222210081146827,-23.04446996708073,-111.77498514209486,-79.91100252901093,-106.53840406229523,-3.8554511439664134,-71.26581853573623,-151.88812171308308,-11.037960068896828,-9.14700351468971,-52.1905473041389,-8.343354162248337,-5.575571081949439,-42.10408186922207,-5.57149696929246,-50.89945481982662,-101.0608673535041,-4.8317027424930785,-5.173251093532469,-16.955298724387568,-30.85046156536571,-10.558556755984448,-106.02119656798864,-92.60578788245239,-5.899375078735907,-24.043723152416614,-10.086613179313636,-51.33217420507535,-3.4269024416380596,-20.11366864452754,-3.702068035881975,-113.53819197806033,-4.23795233902065,-79.35295406319254,-8.088299307843286,-10.876478223541376,-3.435569099535413,-79.00026038370457,-7.694346611620502,-16.426575607176133,-91.73953595232295,-11.227448262442103,-33.58406228131241,-55.108351604449226,-10.46157485611425,-34.51823195407723,-55.382991903540976,-2.8479226483675353,-90.46647156785683,-86.65686370638002,-9.406814383823058,-77.513011873546,-49.90983603334034,-75.87724729147669,-26.20035599458826,-20.284330309232015,-25.63271941136461,-31.37162532504835,-55.306235886254974,-1.5340229541660513,-15.350875076004765,-9.759722533234182,-31.135075087132282,-35.302923527852535,-33.05741138706891,-74.3410497844792,-103.97001391632013,-176.9079757427179,-14.086493353916824,-35.529959569403836,-111.8350998544413,-78.25514345423045,-44.56304768305129,-61.23173398430963,-2.014530154903689,-8.218569537210604,-74.19543495052667,-5.1344102360707655,-71.16104193061892,-54.46489846124598,-40.24193413495733,-34.321605270360664,-16.370958564263404,-3.524832432033455,-101.98775492978986,-20.53867766806504,-7.385599113227854,-206.1793316060709,-143.9684851133456,-9.693752469318632,-19.068973611154934,-2.3665921506536596,-343.53258809597247,-22.27175669208099,-3.2091609790159423,-40.70796082078691,-79.7123575538646,-14.49833698214605,-71.7570167282872,-61.881832955903135,-135.39533424136403,-12.172601468552138,-46.778751373633845,-105.28933731132221,-26.60016512609172,-14.99222465475312,-46.261186628349606,-12.768058950391895,-104.53224093999611,-67.24306612946594,-140.55474617604517,-127.88654402014578,-3.0208539009962796,-3.5614721485996346,-57.87679555972472,-43.49039523965051,-71.15788281244518,-62.91872746056795,-23.57818242608186,-102.09803652051865,-55.18170220992541,-42.430920960309976,-76.67808091986639,-65.46388633691875,-28.117536858897836,-164.7979272021729,-7.315923848079073,-3.7409397462932614,-7.672215364348251,-68.97014809199635,-3.0044545127205744,-2.0845060480226127,-8.854438355878854,-44.495221118880515,-33.69960308617579,-315.2646657978446,-55.15213451940313,-3.5068441946691453,-2.7109427770245014,-19.821882046429657,-123.97113251474212,-22.144005878231,-26.916401132694837,-52.55563995037824,-43.24294865585648,-3.3679104075679236,-646.7921662840388,-6.897006438316304,-28.509500251721644,-59.58440294096651,-53.06425675208378,-208.2535413336452,-137.30944008511474,-29.821328165786067,-26.143109878999905,-45.195193069251296,-14.529531558675387,-27.268750605643422,-42.11485631499884,-22.206034905282117,-28.23210054096931,-144.44695884898977,-3.523157514265924,-134.8001248980257,-131.3037510816453,-3.6906166760480597,-241.77913242218622,-246.7160549568226,-73.96356636099846,-49.28901919539292,-5.612552868021107,-143.96263129101868,-71.61396321983194,-261.9910114172936,-83.37683624932178,-124.6042173074603,-31.070896572034137,-92.76126030965928,-50.02019151793163,-3.9061239382503836,-93.9420784011772,-60.60607504278447,-53.231701549626564,-3.2242934409239283,-6.382122268463786,-5.4664147091589195,-217.25873579303916,-42.137667371146165,-20.746622894228057,-75.01916251507409,-47.58892362459972,-29.812295292049093,-24.085974405793497,-1.4479208596279316,-2.8131688917099833,-127.3844203569807,-2.653656010819669,-31.26216281859709,-1.8608211019156302,-32.1087774230372,-6.37725475701566,-53.92754150840759,-100.51343494938138,-378.32471371408053,-6.981367801239016,-4.147095510519941,-53.904389719453306,-5.454708329470077,-2.7805168176330795,-17.149902667221166,-316.99629961934227,-61.52284411991803,-32.527773029622374,-92.14686760190635,-4.510064713881991,-46.97389494528108,-326.31343873891177,-9.72984406433126,-4.188062087161252,-3.0785683440669844,-184.16930157361608,-71.51050162840866,-38.64064646476169,-46.78371002259525,-2.6026404630867765,-43.238436509412495,-5.096653652937334,-7.1283518097996685,-84.31992029327411,-24.14486081647618,-13.295792641494858,-41.64921954159609,-286.12074877462027,-12.578319664494147,-54.30431523268922,-29.59440209277764,-19.405163658078106,-7.159468821337138,-44.02678275353495,-4.631619206394346,-28.05144779046788,-6.8415263622235525,-60.592103717204616,-83.51714667108855,-60.86660479265807,-24.72828481232493,-3.2070763322252835,-31.31693454749599,-116.28220909136913,-5.528866096143219,-2.762680546924789,-20.673165024541124,-27.79246860527603,-85.57088205945404,-46.98344376676042,-246.70704966074476,-7.9581061373003354,-70.46053220054475,-100.98485969005381,-228.30802381142288,-62.771776500348196,-5.995366894117083,-8.30042546960502,-126.29490637624511,-21.775083438094878,-31.41205473133583,-7.079922475926727,-81.57136387216188,-9.926239459425133,-26.412653623905094,-96.13312454221696,-7.553593050543998,-120.60890090274424,-7.962297878402758,-23.96743432903124,-27.318669963442403,-158.73947176405517,-21.844601129516622,-28.57354715032786,-16.20948092092528,-35.086543236945886,-2.122534543246737,-19.43326250368329,-48.94417134771261,-14.035516376568966,-2.136332178526481,-163.457501366176,-44.5091012479409,-52.15901317400461,-40.735024787271605,-34.05516540925161,-72.39694888345102,-15.11808098442886,-2.4133515267119137,-8.009177903702877,-28.281520179131576,-16.273016945795405,-28.71997799752594,-168.86435725356924,-22.307151655185336,-2.032911633143406,-16.143619260264472,-168.78166058032798,-98.56363258052649,-3.1350494396955493,-109.90004473489593,-2.5445118286018142,-63.97116874192,-24.438070723077097,-153.6515598352818,-4.242780415839228,-43.339202918302625,-66.33749800861186,-9.984455887912288,-22.152727070474114,-25.756568267559953,-6.178045588320405,-2.994903842686324,-2.502444896981357,-3.0104574488180855,-2.8325043031737622,-90.57303323858167,-2.0384020253487276,-5.095639507789516,-44.2402549294287,-61.944787150467896,-43.635549878475544,-33.153003891751524,-99.87420801675981,-5.369902290565313,-16.93528416202141,-9.107868420416555,-41.433942682956236,-22.840477189264664,-14.740849754538699,-74.6019210311085,-55.49361759896806,-58.657479561269824,-12.796124686554576,-17.122412522650734,-5.231013857222835,-17.3540263999413,-131.7510200122295,-2.9622571168240643,-69.16215939292158,-15.845660984714009,-26.256681177487454,-28.262730495291905,-52.0754429775974,-1.6873111263130782,-105.91484265600678,-81.48581188185233,-90.86746343081639,-114.12420919511139,-28.09996653296094,-126.04546619360232,-88.6839464880363,-37.95460378656141,-2.094212139256183,-2.8662626760260212,-4.5375264125650245,-44.52410340676966,-2.891221867888498,-55.06624784370275,-3.35866339958703,-3.0247949466813697,-3.273779767979901,-4.4596679610308625,-3.4056228028332893,-117.20266677536452,-13.679628147924713,-26.987044287144066,-25.99829682637693,-8.124196471045705,-70.46463229913269,-5.646024123540905,-46.3054674775777,-3.2950714893617254,-206.41505206564133,-41.26589619079798,-263.01729163648,-12.451009693240449,-28.13094359215612,-15.452286114478362,-5.150297963245288,-72.66570015959057,-76.0926617254091,-11.787002517786537,-35.66627083256525,-49.305390934011555,-41.96474004419906,-72.14558945862692,-31.25018868329762,-108.74461191615755,-99.46709625715778,-47.699056188894176,-145.13421860329908,-1.628528214234973,-36.46883510293445,-197.4987767567482,-2.6404782553906303,-73.9429352586186,-190.95720338534605,-49.924418873111925,-9.557871906495372,-161.7524117063374,-128.81132753087655,-24.80022389369993,-94.32055562636464,-37.26641529547775,-95.01516248011212,-3.335229443479969,-136.50058180786993,-5.201945739466587,-6.635086731288924,-23.22714833384443,-60.48114514910766,-40.540339087580584,-4.954160567133189,-76.56807138436938,-2.3617525773996833,-12.671836033912797,-11.740422933100088,-108.48473849789978,-2.058611822479436,-34.25806171379134,-4.7935308382601995,-59.497763841266526,-50.30822838312241,-72.53703020121621,-2.73074305539845,-2.5884796165719797,-50.748092740329554,-55.66418653348574,-33.709238795469346,-52.14891353982232,-3.7854497859401683,-2.9349003945460432,-167.51481957561978,-135.40637572135324,-33.17891354277984,-49.4368699226748,-4.629249210255806,-38.637862886584806,-55.93653479041187,-14.913084640666717,-112.14684175242121,-64.55175663366524,-6.2641353061882405,-5.295721008892709,-3.4734895025630497,-10.21316210296175,-2.5994516311307168,-32.67967461674863,-41.0041236763029,-3.9633905519380064,-25.07254720444552,-22.338264517567826,-2.3434947396361574,-8.83495257776041,-38.552988491902475,-51.17729539106164,-62.29921516138565,-105.56461493031122,-30.708487615133844,-5.60459236395593,-108.07791288144941,-64.60422686346227,-105.66100809051039,-61.48134843752442,-102.84522625992473,-40.28889646709651,-233.87622024575938,-83.66025714273258,-144.50139502781198,-6.579052213301783,-4.159087565324687,-41.80041933256348,-54.821836159195556,-2.5006933430380913,-4.85856331006917,-557.1261853200328,-16.31258954244809,-70.60785728520389,-115.98800861594493,-4.036870150697781,-36.5990969491835,-75.8055789222339,-43.94958376748257,-418.1106325426951,-34.40770878195927,-2.964789790269414,-263.3557294113409,-7.158554914738032,-15.139845263712305,-38.54792323627193,-45.55868831610035,-40.4782114994728,-135.84022416033469,-89.50420175239654,-44.084084348373544,-25.738878646265583,-34.88651594485117,-9.270267644174396,-8.192776626179095,-3.039111407283089,-112.44431687342122,-7.334536893432584,-68.07247164320981,-14.54362469837954,-49.7704981153243,-3.0102947700108387,-7.085673116449896,-48.49943791135999,-2.7636430159661214,-72.50242546462056,-57.16058005374156,-2.3781965610705362,-13.923949632752427,-89.34304867665013,-114.26587016159226,-11.107267844472315,-22.19335474382256,-113.54775287719306,-45.052373726798685,-2.542699510531464,-121.08024569415296,-342.2524265837935,-129.31043233450336,-6.425926021317042,-27.14885340456,-24.916256349490954,-2.762831482474236,-158.30584439258004,-7.5333822174755305,-3.0661071715073365,-56.58477889298756,-2.3724486659385438,-49.88777692962238,-37.21852666799917,-209.48373926920254,-62.40816021298054,-2.3002867317411035,-178.81120828759433,-36.638874870995934,-4.903673417201249,-65.82796418983726,-102.0798705994894,-34.76386680155873,-56.221574510013426,-72.26113858874344,-30.427060694474637,-78.19233209030982,-16.34566389934283,-264.7896231444323,-8.037730707150269,-58.59308301551649,-46.140054527084075,-2.4407421639928124,-12.851780806366706,-63.33993994997212,-133.792351512746,-81.79994052962148,-41.76655649427259,-9.668235722356826,-36.542391862670776,-2.5654170925586905,-17.253298961550925,-5.11935494748998,-46.853268528086446,-85.76359350795249,-131.00192609557956,-58.31508050911567,-32.96745371397239,-103.56294764940908,-15.712739272945868,-18.46430069586542,-81.60308740459995,-175.70366362804955,-143.65704183708158,-54.66275517515253,-17.48603499958443,-32.068363540219735,-2.4710687916588974,-109.83344337143281,-8.889037941350425,-86.27481089048034,-20.293795041717228,-97.29352726218954,-253.73348997511016,-6.6356617490836305,-26.767936760844798,-54.07129726631145,-77.03238242080776,-14.812553861255244,-43.159275127036,-14.834430921661411,-61.64474800929208,-3.369922928598041,-111.61636591535698,-102.29972677827743,-6.362162817964606,-78.0285662169641,-17.661240043863764,-23.805391671977105,-2.545973473324305,-240.1625147069443,-46.3154962957781,-2.9720646275467923,-40.86252157363668,-51.82553225042325,-5.595893214863251,-24.75690842435299,-27.19058318007851,-15.124475382997556,-66.18423088739408,-34.647846192095116,-1.8995460116381369,-30.060502291590957,-58.03261632413323,-88.7817193620176,-115.25705363607881,-148.74599719724904,-79.43554944837285,-7.689102300441351,-52.23089944726054,-84.74714359459273,-30.236043844638044,-120.0334933959658,-18.039208027947204,-162.43250418909406,-2.37450343323531,-58.1638948997491,-3.657668845961033,-129.9985296466341,-17.246232728272748,-9.624274148923599,-74.19843489697,-114.29482502754321,-54.07603828165519,-8.651604134515472,-61.515824837008694,-9.592056970457064,-181.14750774889694,-226.58921004576942,-36.39959060228126,-37.89335850094643,-33.70429086437577,-143.71210342375318,-30.385951497236753,-26.926643771932106,-129.47029025390742,-16.750343963584655,-133.8317248612839,-16.282313188536243,-3.5298605611516245,-55.71319654954278,-17.38246389696508,-15.58559594395936,-9.784346385844495,-123.28575837491348,-1.5745578461758813,-90.91726941229923,-6.041084049064782,-123.91101039601257,-25.81021508815668,-9.434452975413016,-10.93312980974549,-45.158457581375735,-2.6484170075423856,-10.922366412270007,-194.96031166169374,-47.761478538313014,-28.06453633833727,-24.9301671955962,-66.41602982667919,-16.315908360268114,-67.5619921724396,-14.153620389761127,-67.59431502983128,-2.9640242968863655,-10.99432013299734,-56.26743632813947,-48.63891699802354,-55.2265817625049,-24.12118889270766,-42.082594660285274,-25.898145842010035,-2.516600855500065,-39.048133921620696,-185.83409355941242,-11.80439889619721,-123.5864057431949,-79.26654456253489,-4.318551694870959,-66.04741647614672,-56.06066261245994,-2.3724621063066884,-56.80870776307051,-2.4810484684201946,-155.17539144693265,-39.02058859559725,-12.22796195953661,-2.1777783272275446,-2.6955451657130562,-25.545925691772872,-2.9803664037486275,-123.48286157668697,-21.973711610792876,-1.9017253597503343,-15.269053111774772,-74.4475335793011,-16.661080262876958,-46.18997313541968,-53.15285660816952,-11.920269523406853,-3.1047442863861847,-28.156881174833448,-118.01695893315627,-104.44217106380403,-16.0713252770852,-193.9794769915997,-15.932497857289867,-160.47185377910102,-82.29085488514072,-108.21880371985513,-77.24684084480785,-102.26676948349673,-44.10646389552859,-12.18110630673209,-2.8684239577621287,-323.9261628883885,-16.195681052316065,-1.7196072193307939,-55.158225620192454,-17.548197074645028,-5.010927386420522,-113.48282727801781,-14.807511130892369,-31.90432998485635,-178.92395763047372,-73.25690549288316,-54.336845955827705,-46.193804863585385,-19.571624204954276,-46.37706470669102,-15.24728534927569,-3.61558821489782,-5.945187590940265,-30.974403893881295,-7.016854648800171,-252.87916954925976,-25.123513097183075,-56.704530757302514,-207.24953933429575,-14.273959096311732,-34.11134547262307,-42.49905626618751,-22.09613827021681,-26.703208525913624,-77.72268381441425,-121.4000592066328,-47.29533141004413,-135.46407979978312,-14.275777845703258,-125.02156206725313,-18.802877867811752,-56.90158598737501,-109.97089521993429,-99.28471752362091,-61.328428908846874,-2.146311889443281,-6.466444301385721,-6.735184229841645,-116.00782102996712,-76.48768989208152,-23.066773327162004,-47.748650728710324,-2.2277138062565793,-13.980379169507989,-45.64329281623341,-49.45225033403914,-4.153949906151963,-29.354147253455704,-100.48661493564713,-47.381455741701835,-86.01473869365648,-14.045895789701575,-51.82827091663545,-71.31024639994098,-67.05975763693617,-38.42739194091641,-5.955033355743688,-1.998749923328272,-57.95635206936482,-24.327606560062566,-80.27274503350401,-1.6330664462122564,-25.5993578782627,-28.073979484843438,-3.6897703826575836,-10.666088569970439,-3.6597989042194095,-27.636035974162258,-47.29101479970163,-177.12768707171918,-38.10425694640837,-5.596046311149889,-14.26065934116645,-1.9602391757975417,-4.616913837437608,-245.0157895619247,-37.92284773062929,-62.71418889849128,-107.93676765478267,-10.19188419013076,-29.703557236069813,-5.316972904593546,-10.987824935914919,-5.5251988950234265,-6.274854858063621,-155.51385386083953,-1.525347376269272,-10.687982308792856,-49.063685210320955,-28.401866550338884,-2.8044891644789693,-4.639896226438435,-7.57708629542968,-34.678598053807875,-77.82861249852952,-52.58765177076948,-19.682508649311906,-11.062165494982883,-70.39051035774935,-94.96524402648733,-3.64559367811258,-12.13002153303964,-31.4974711848876,-14.058620804543489,-1.9313642482637372,-27.206428570488946,-22.00257522421495,-41.26980580095319,-37.525135445961695,-12.708062259545674,-108.97515876776302,-65.48463897206616,-70.09019243176293,-66.61892731130301,-25.386237785604436,-35.48362320129506,-4.50857653685413,-5.492465434139144,-133.53281196466412,-58.169077747767886,-24.427199807296258,-15.344417564801486,-12.837146413851512,-49.23981633424403,-26.91814279358974,-19.429406202996994,-43.012003237944604,-146.57017442999305,-11.331536290306502,-108.86825992356017,-2.661478843816504,-35.744373541238545,-118.04444285486599,-10.476882332368163,-156.2189630527053,-6.768535988959079,-27.13814788845635,-48.803123327103215,-12.089883671433672,-6.7778872129462675,-52.23069845238619,-17.237646180691417,-7.839702461094013,-26.477120163942228,-6.368678546589597,-2.4539109578372007,-1.6275764920797788,-2.928184038204069,-11.75755360732868,-25.815182340349228,-36.73994603691605,-36.99195113236335,-89.1625076741783,-3.612846959946814,-3.1543571096185516,-5.167435932453053,-5.829884405393394,-25.558587935241416,-7.915421822019764,-39.83986543024243,-107.75203325567618,-8.022000108342027,-268.33907018670345,-245.82101251675175,-73.1539725031793,-54.03151581972781,-83.04594447072313,-2.5865992272855016,-13.780553849556675,-110.61550532634381,-290.41314064884244,-29.582439024854217,-1.4766544691480736,-51.17625185791915,-98.78410552546806,-2.336327755196306,-187.77723266233042,-133.79149454153367,-68.9757449577254,-78.34974847175307,-2.0418435716612984,-179.8187331787847,-31.851785086956205,-23.996258556480534,-5.61570236965739,-2.465637818037723,-27.457097651979257,-11.232083650591022,-76.51599129909042,-2.6718338133777153,-54.39348897466169,-2.43403710919346,-25.208269455278632,-25.756737829298952,-2.800746386231503,-56.99495340826772,-66.41342337300297,-25.040200367072824,-149.45149368959989,-20.15009441226452,-25.808519367603456,-24.66704792947867,-2.3025452857193396],"x":[14.0,35.0,34.0,47.0,30.0,59.0,35.0,77.0,60.0,72.0,68.0,43.0,56.0,18.0,56.0,55.0,46.0,36.0,70.0,24.0,63.0,42.0,51.0,73.0,41.0,20.0,54.0,41.0,41.0,47.0,79.0,54.0,41.0,59.0,65.0,78.0,57.0,50.0,11.0,46.0,45.0,61.0,75.0,10.0,28.0,49.0,27.0,65.0,15.0,44.0,31.0,19.0,46.0,19.0,68.0,71.0,41.0,18.0,4.0,50.0,65.0,15.0,40.0,59.0,41.0,53.0,5.0,56.0,80.0,35.0,47.0,44.0,51.0,19.0,45.0,9.0,74.0,46.0,3.0,43.0,24.0,30.0,49.0,58.0,61.0,8.0,18.0,22.0,27.0,23.0,12.0,17.0,70.0,22.0,37.0,1.0,23.0,8.0,68.0,10.0,18.0,64.0,11.0,56.0,61.0,6.0,40.0,65.0,12.0,80.0,38.0,27.0,45.0,63.0,56.0,45.0,21.0,9.0,29.0,62.0,1.0,39.0,18.0,71.0,40.0,35.0,33.0,47.0,66.0,37.0,68.0,46.0,54.0,25.0,78.0,4.0,8.0,53.0,20.0,54.0,59.0,16.0,73.0,44.0,22.0,52.0,3.0,24.0,64.0,72.0,9.0,54.0,14.0,69.0,10.0,20.0,60.0,70.0,0.0,45.0,40.0,76.0,37.0,67.0,57.0,61.0,0.0,51.0,2.0,53.0,54.0,44.0,80.0,17.0,26.0,37.0,63.0,64.0,56.0,43.0,69.0,63.0,67.0,30.0,79.0,67.0,53.0,7.0,15.0,5.0,68.0,6.0,2.0,3.0,54.0,10.0,50.0,40.0,28.0,25.0,70.0,73.0,31.0,68.0,40.0,23.0,36.0,69.0,1.0,58.0,66.0,57.0,71.0,47.0,70.0,30.0,77.0,26.0,63.0,24.0,23.0,21.0,76.0,1.0,40.0,67.0,5.0,73.0,47.0,55.0,53.0,13.0,61.0,37.0,65.0,27.0,48.0,23.0,72.0,42.0,24.0,75.0,29.0,49.0,28.0,22.0,7.0,77.0,63.0,8.0,77.0,73.0,56.0,22.0,2.0,5.0,60.0,20.0,46.0,2.0,54.0,9.0,37.0,56.0,49.0,39.0,21.0,65.0,4.0,14.0,35.0,73.0,78.0,27.0,71.0,10.0,26.0,57.0,30.0,25.0,31.0,51.0,49.0,17.0,53.0,20.0,25.0,23.0,19.0,76.0,72.0,30.0,66.0,72.0,49.0,48.0,39.0,40.0,1.0,61.0,2.0,43.0,28.0,69.0,64.0,32.0,38.0,8.0,77.0,74.0,20.0,28.0,32.0,38.0,58.0,49.0,79.0,8.0,64.0,62.0,75.0,62.0,28.0,26.0,73.0,60.0,63.0,29.0,70.0,47.0,70.0,39.0,43.0,71.0,1.0,18.0,25.0,73.0,66.0,66.0,39.0,28.0,9.0,41.0,73.0,63.0,8.0,68.0,48.0,60.0,31.0,76.0,63.0,2.0,16.0,22.0,36.0,14.0,79.0,59.0,34.0,8.0,21.0,76.0,51.0,5.0,60.0,19.0,58.0,34.0,70.0,26.0,52.0,44.0,4.0,54.0,19.0,42.0,26.0,15.0,15.0,28.0,46.0,7.0,11.0,29.0,61.0,57.0,28.0,54.0,8.0,0.0,38.0,52.0,23.0,10.0,46.0,58.0,79.0,45.0,8.0,6.0,39.0,52.0,25.0,27.0,53.0,50.0,37.0,65.0,4.0,66.0,16.0,61.0,65.0,33.0,58.0,72.0,37.0,8.0,12.0,0.0,23.0,9.0,55.0,0.0,8.0,6.0,14.0,18.0,73.0,50.0,67.0,19.0,34.0,54.0,16.0,68.0,19.0,76.0,66.0,76.0,37.0,52.0,25.0,11.0,66.0,74.0,22.0,36.0,73.0,54.0,63.0,41.0,70.0,39.0,71.0,73.0,3.0,69.0,61.0,6.0,60.0,74.0,49.0,25.0,60.0,76.0,12.0,78.0,32.0,37.0,12.0,62.0,32.0,14.0,28.0,72.0,29.0,11.0,74.0,15.0,46.0,6.0,47.0,3.0,44.0,34.0,60.0,46.0,44.0,25.0,9.0,25.0,71.0,40.0,48.0,3.0,26.0,66.0,43.0,22.0,56.0,5.0,46.0,46.0,11.0,49.0,65.0,11.0,13.0,6.0,53.0,21.0,58.0,18.0,19.0,49.0,33.0,11.0,29.0,43.0,47.0,73.0,64.0,51.0,21.0,68.0,35.0,60.0,47.0,60.0,79.0,47.0,43.0,66.0,16.0,3.0,76.0,34.0,13.0,33.0,76.0,48.0,42.0,50.0,11.0,63.0,49.0,38.0,78.0,31.0,17.0,64.0,39.0,20.0,48.0,55.0,33.0,53.0,25.0,18.0,27.0,56.0,6.0,54.0,4.0,78.0,27.0,36.0,51.0,62.0,2.0,33.0,63.0,10.0,58.0,19.0,5.0,45.0,68.0,69.0,17.0,17.0,57.0,56.0,9.0,52.0,60.0,47.0,13.0,59.0,32.0,26.0,71.0,26.0,21.0,28.0,3.0,49.0,19.0,73.0,40.0,6.0,71.0,66.0,14.0,38.0,71.0,37.0,39.0,74.0,68.0,37.0,28.0,67.0,3.0,51.0,44.0,15.0,24.0,39.0,44.0,49.0,59.0,47.0,71.0,12.0,42.0,19.0,49.0,80.0,69.0,31.0,37.0,49.0,13.0,31.0,19.0,80.0,65.0,49.0,41.0,39.0,14.0,53.0,10.0,65.0,27.0,56.0,50.0,28.0,42.0,79.0,27.0,9.0,30.0,17.0,70.0,14.0,70.0,53.0,13.0,61.0,48.0,20.0,6.0,50.0,31.0,15.0,52.0,34.0,16.0,65.0,14.0,32.0,67.0,16.0,6.0,24.0,48.0,71.0,43.0,67.0,60.0,3.0,41.0,51.0,51.0,37.0,23.0,55.0,4.0,64.0,4.0,51.0,37.0,30.0,53.0,50.0,75.0,26.0,55.0,9.0,67.0,78.0,55.0,63.0,38.0,33.0,15.0,58.0,68.0,9.0,46.0,66.0,15.0,55.0,40.0,39.0,10.0,64.0,3.0,67.0,31.0,58.0,15.0,6.0,28.0,11.0,16.0,29.0,67.0,45.0,47.0,27.0,47.0,21.0,77.0,22.0,47.0,30.0,29.0,59.0,39.0,73.0,53.0,42.0,48.0,18.0,67.0,51.0,45.0,55.0,74.0,2.0,45.0,24.0,2.0,72.0,9.0,48.0,70.0,22.0,11.0,27.0,31.0,5.0,77.0,60.0,2.0,12.0,52.0,41.0,69.0,60.0,23.0,1.0,19.0,57.0,64.0,26.0,47.0,21.0,70.0,67.0,60.0,67.0,47.0,78.0,37.0,4.0,63.0,44.0,2.0,47.0,34.0,6.0,65.0,15.0,30.0,52.0,63.0,15.0,27.0,25.0,60.0,39.0,23.0,6.0,67.0,45.0,76.0,55.0,67.0,51.0,15.0,27.0,21.0,44.0,19.0,36.0,62.0,21.0,50.0,1.0,70.0,31.0,77.0,64.0,63.0,66.0,3.0,4.0,19.0,54.0,21.0,74.0,31.0,6.0,29.0,61.0,71.0,17.0,52.0,80.0,27.0,74.0,9.0,43.0,67.0,56.0,49.0,47.0,6.0,64.0,15.0,56.0,0.0,19.0,41.0,2.0,19.0,26.0,64.0,54.0,76.0,80.0,5.0,50.0,7.0,9.0,60.0,37.0,46.0,61.0,25.0,66.0,6.0,38.0,32.0,33.0,49.0,3.0,29.0,55.0,39.0,16.0,3.0,4.0,32.0,46.0,37.0,65.0,17.0,75.0,65.0,18.0,9.0,20.0,13.0,3.0,21.0,43.0,44.0,33.0,0.0,30.0,59.0,70.0,20.0,36.0,53.0,16.0,24.0,76.0,34.0,64.0,8.0,28.0,21.0,13.0,42.0,56.0,46.0,8.0,42.0,24.0,58.0,71.0,13.0,51.0,7.0,38.0,43.0,47.0,15.0,46.0,36.0,25.0,61.0,7.0,17.0,3.0,29.0,18.0,37.0,41.0,27.0,77.0,3.0,17.0,6.0,9.0,25.0,2.0,27.0,61.0,3.0,56.0,69.0,28.0,47.0,64.0,8.0,14.0,62.0,74.0,68.0,2.0,60.0,43.0,6.0,76.0,75.0,74.0,20.0,8.0,65.0,75.0,63.0,10.0,7.0,76.0,61.0,56.0,8.0,70.0,11.0,37.0,55.0,5.0,78.0,78.0,11.0,42.0,58.0,25.0,74.0,13.0],"r":[89.0,1.0,99.0,58.0,17.0,19.0,82.0,50.0,79.0,37.0,69.0,36.0,95.0,30.0,14.0,56.0,16.0,45.0,73.0,8.0,53.0,39.0,17.0,97.0,17.0,98.0,68.0,6.0,75.0,40.0,61.0,29.0,10.0,67.0,21.0,13.0,43.0,73.0,66.0,75.0,84.0,33.0,25.0,51.0,94.0,9.0,92.0,43.0,29.0,29.0,80.0,36.0,73.0,9.0,44.0,69.0,30.0,16.0,23.0,84.0,97.0,39.0,26.0,14.0,62.0,70.0,41.0,47.0,26.0,44.0,78.0,11.0,86.0,60.0,80.0,83.0,34.0,28.0,5.0,96.0,43.0,33.0,88.0,75.0,9.0,67.0,15.0,91.0,76.0,71.0,22.0,41.0,13.0,50.0,63.0,70.0,35.0,56.0,11.0,72.0,55.0,5.0,15.0,52.0,99.0,47.0,64.0,53.0,43.0,48.0,79.0,74.0,69.0,57.0,88.0,32.0,25.0,51.0,25.0,35.0,41.0,60.0,42.0,77.0,54.0,33.0,8.0,40.0,32.0,52.0,86.0,38.0,79.0,17.0,89.0,22.0,6.0,33.0,52.0,14.0,82.0,1.0,64.0,82.0,48.0,31.0,100.0,87.0,54.0,12.0,31.0,76.0,54.0,16.0,16.0,51.0,37.0,63.0,51.0,13.0,13.0,27.0,79.0,32.0,96.0,73.0,61.0,18.0,77.0,72.0,6.0,3.0,52.0,99.0,73.0,5.0,44.0,17.0,17.0,47.0,66.0,28.0,85.0,3.0,56.0,79.0,78.0,65.0,100.0,72.0,24.0,36.0,41.0,67.0,64.0,76.0,28.0,6.0,80.0,100.0,80.0,9.0,97.0,88.0,49.0,46.0,91.0,8.0,48.0,91.0,86.0,60.0,1.0,56.0,92.0,28.0,64.0,30.0,61.0,3.0,14.0,19.0,75.0,76.0,31.0,19.0,35.0,68.0,53.0,4.0,65.0,71.0,58.0,18.0,76.0,91.0,96.0,73.0,15.0,24.0,78.0,95.0,72.0,81.0,74.0,45.0,58.0,12.0,71.0,37.0,65.0,69.0,40.0,33.0,73.0,10.0,34.0,95.0,29.0,30.0,51.0,65.0,22.0,86.0,2.0,86.0,55.0,21.0,2.0,37.0,94.0,67.0,38.0,9.0,94.0,94.0,19.0,3.0,82.0,84.0,85.0,61.0,37.0,47.0,45.0,82.0,62.0,64.0,79.0,30.0,94.0,44.0,58.0,8.0,95.0,89.0,20.0,80.0,93.0,80.0,53.0,69.0,42.0,41.0,54.0,33.0,24.0,29.0,98.0,55.0,73.0,90.0,99.0,44.0,90.0,25.0,15.0,93.0,18.0,43.0,69.0,62.0,89.0,46.0,18.0,63.0,89.0,52.0,81.0,89.0,94.0,67.0,98.0,99.0,41.0,91.0,14.0,99.0,82.0,73.0,43.0,25.0,94.0,78.0,84.0,99.0,29.0,16.0,67.0,32.0,22.0,69.0,42.0,95.0,85.0,25.0,19.0,76.0,79.0,51.0,62.0,67.0,12.0,62.0,52.0,7.0,75.0,89.0,34.0,41.0,79.0,84.0,34.0,19.0,95.0,83.0,70.0,82.0,98.0,67.0,90.0,78.0,5.0,24.0,86.0,23.0,63.0,53.0,80.0,65.0,27.0,92.0,99.0,87.0,66.0,96.0,12.0,23.0,51.0,94.0,83.0,6.0,87.0,7.0,73.0,10.0,69.0,34.0,58.0,91.0,54.0,66.0,98.0,19.0,58.0,11.0,6.0,54.0,19.0,51.0,74.0,16.0,48.0,36.0,98.0,22.0,100.0,68.0,75.0,71.0,65.0,88.0,63.0,79.0,67.0,4.0,91.0,56.0,58.0,9.0,35.0,28.0,95.0,35.0,32.0,95.0,71.0,34.0,20.0,14.0,89.0,63.0,11.0,53.0,21.0,70.0,85.0,46.0,12.0,62.0,87.0,75.0,98.0,26.0,79.0,80.0,36.0,45.0,42.0,6.0,55.0,45.0,78.0,72.0,65.0,20.0,22.0,100.0,42.0,13.0,19.0,83.0,90.0,61.0,49.0,81.0,41.0,91.0,46.0,73.0,68.0,89.0,51.0,17.0,96.0,23.0,8.0,49.0,91.0,8.0,23.0,23.0,44.0,44.0,88.0,47.0,5.0,7.0,83.0,26.0,81.0,22.0,86.0,64.0,53.0,13.0,99.0,80.0,79.0,74.0,41.0,86.0,83.0,38.0,74.0,77.0,39.0,41.0,11.0,27.0,18.0,34.0,62.0,17.0,47.0,62.0,20.0,78.0,56.0,53.0,61.0,68.0,30.0,82.0,46.0,74.0,58.0,67.0,18.0,40.0,100.0,54.0,65.0,58.0,72.0,75.0,70.0,40.0,45.0,20.0,92.0,22.0,85.0,49.0,83.0,96.0,31.0,82.0,85.0,21.0,68.0,54.0,20.0,66.0,84.0,39.0,68.0,1.0,48.0,95.0,82.0,58.0,34.0,15.0,30.0,24.0,46.0,26.0,41.0,3.0,27.0,55.0,77.0,99.0,15.0,97.0,73.0,30.0,95.0,32.0,9.0,43.0,21.0,64.0,23.0,56.0,85.0,81.0,1.0,46.0,19.0,31.0,63.0,65.0,93.0,5.0,57.0,48.0,49.0,44.0,45.0,7.0,81.0,1.0,25.0,99.0,96.0,51.0,40.0,40.0,11.0,65.0,81.0,96.0,35.0,74.0,91.0,95.0,7.0,13.0,31.0,24.0,55.0,66.0,43.0,20.0,78.0,55.0,24.0,33.0,69.0,57.0,92.0,88.0,5.0,24.0,22.0,75.0,81.0,79.0,4.0,5.0,26.0,12.0,88.0,23.0,75.0,90.0,48.0,56.0,47.0,57.0,83.0,91.0,30.0,42.0,65.0,8.0,47.0,5.0,74.0,67.0,7.0,4.0,7.0,6.0,5.0,45.0,53.0,34.0,39.0,6.0,71.0,82.0,6.0,7.0,42.0,62.0,72.0,6.0,80.0,78.0,73.0,93.0,5.0,17.0,69.0,63.0,63.0,8.0,7.0,56.0,59.0,33.0,11.0,89.0,53.0,22.0,50.0,38.0,100.0,24.0,21.0,9.0,67.0,17.0,11.0,86.0,44.0,53.0,79.0,96.0,63.0,13.0,57.0,51.0,14.0,38.0,66.0,19.0,3.0,84.0,56.0,38.0,4.0,77.0,67.0,84.0,53.0,96.0,60.0,2.0,87.0,51.0,44.0,36.0,94.0,26.0,9.0,38.0,53.0,7.0,94.0,37.0,100.0,97.0,49.0,10.0,2.0,66.0,19.0,57.0,89.0,42.0,45.0,91.0,44.0,68.0,47.0,54.0,7.0,67.0,96.0,19.0,12.0,16.0,47.0,35.0,23.0,77.0,89.0,99.0,21.0,92.0,48.0,66.0,36.0,52.0,2.0,100.0,31.0,38.0,79.0,40.0,78.0,58.0,96.0,51.0,49.0,26.0,56.0,81.0,7.0,79.0,74.0,98.0,20.0,63.0,35.0,59.0,71.0,19.0,42.0,32.0,35.0,93.0,26.0,32.0,63.0,29.0,33.0,45.0,23.0,4.0,54.0,59.0,11.0,84.0,94.0,90.0,70.0,26.0,94.0,61.0,59.0,34.0,21.0,25.0,4.0,10.0,14.0,63.0,89.0,91.0,60.0,50.0,74.0,35.0,24.0,2.0,68.0,56.0,24.0,69.0,91.0,36.0,91.0,79.0,62.0,93.0,59.0,64.0,26.0,11.0,93.0,90.0,28.0,53.0,71.0,54.0,67.0,90.0,82.0,92.0,42.0,42.0,81.0,61.0,67.0,18.0,70.0,72.0,10.0,99.0,13.0,59.0,2.0,66.0,13.0,82.0,28.0,18.0,23.0,44.0,23.0,25.0,47.0,14.0,46.0,80.0,39.0,67.0,95.0,58.0,93.0,12.0,2.0,76.0,21.0,98.0,14.0,24.0,41.0,35.0,47.0,94.0,2.0,80.0,84.0,33.0,11.0,55.0,70.0,19.0,62.0,69.0,48.0,78.0,31.0,72.0,59.0,81.0,75.0,65.0,91.0,17.0,27.0,43.0,13.0,36.0,81.0,82.0,6.0,75.0,65.0,43.0,2.0,81.0,61.0,15.0,1.0,36.0,70.0,3.0,52.0,9.0,15.0,65.0,56.0,13.0,43.0,13.0,73.0,9.0,88.0,60.0,5.0,67.0,28.0,64.0,80.0,90.0,45.0,71.0,96.0,84.0,92.0,45.0,81.0,71.0,49.0,57.0,62.0,78.0,6.0,69.0,58.0,53.0,99.0,65.0],"p":[0.983300186528669,0.8804980254824617,0.8746844378981999,0.7766835614372357,0.7746173231225033,0.8841623749968055,0.9172081794538562,0.8373180596040637,0.8908276415708154,0.7979842300224169,0.9433795667434972,0.9632470402984212,0.9162157560772413,0.9642152485304687,0.9037871730537387,0.8832037376370425,0.8988603996413066,0.9143127647836288,0.7641701411806037,0.8051441862626609,0.7673631424407621,0.9533556067052269,0.9750218484688515,0.9206760548365743,0.9835591332974833,0.9371776094661968,0.9203236527380526,0.9270413866090133,0.7687111487634439,0.8702253532903744,0.9407576905004145,0.875859317493715,0.7780349685618112,0.8005075745010527,0.8408867656870256,0.8688430365868249,0.971201854089402,0.903425950070716,0.8509578013515067,0.9366508492016961,0.8947136268797438,0.8875855612691459,0.8793888913632031,0.8734686427024974,0.7835591006006806,0.8324209996760943,0.7929985353235659,0.8049239068033496,0.8276985931550482,0.9713584814574041,0.9015689182747457,0.9186330608240723,0.7679675075945287,0.8357136226010982,0.76415640371128,0.7706922665632386,0.9616147666833739,0.9649815518260997,0.9713396383635093,0.8285808448573284,0.7875722038971069,0.8260027926098675,0.7588092429513733,0.9104335610270573,0.9703508258892193,0.9696731112092306,0.7762297448932589,0.9094060984164694,0.9229254426624696,0.7629904901067867,0.7636178234540761,0.8131769308056713,0.7524570107807563,0.8632216988707241,0.920847081113323,0.800801602788986,0.7584132690630457,0.9578065358563191,0.9312258917564749,0.7680799241943141,0.8896778180146461,0.8959030813595983,0.7865577142639302,0.9628914932096794,0.8455546779633094,0.7687290013167645,0.9058511713262201,0.9203386812271346,0.9805449758815005,0.8081992283219533,0.9609834214810746,0.7925834971165195,0.8718211370929153,0.7845479327139109,0.9777953038925012,0.8625236302142526,0.8279217956062166,0.7953910061446186,0.7839195932794802,0.9643599676821383,0.942597573153279,0.8038811561716179,0.8959246345026148,0.8147428660113898,0.9134646721487658,0.9884036123976432,0.905735329386282,0.8532678578309976,0.8365406784458441,0.8728943238583049,0.9835890777761748,0.8694141700662621,0.9629577919944117,0.8522194118942268,0.9466199838982498,0.7745224337213721,0.8898603349501921,0.9955122137370095,0.8844847770828369,0.826409115414585,0.9439063069154261,0.8195823145111262,0.8831632338811714,0.7951554244398675,0.8957049499232002,0.8746412246587081,0.9356839910840611,0.9663318648193975,0.9712775592856582,0.8029450967096042,0.8345713340824009,0.9725496715917099,0.9490702983963051,0.9362026689048002,0.873321668367388,0.8953144292607194,0.8321180296352779,0.9050447175849015,0.8293176188118614,0.8419366084677228,0.9050371261599498,0.9187173208363906,0.7763850037275473,0.8395962459406374,0.7553323798545507,0.9459418902857675,0.7527673586160928,0.8864875345761779,0.9880832242278292,0.9098436736418656,0.9520745590562483,0.8014493908249645,0.7997104498561861,0.995983824014915,0.9749420517311813,0.7750960319718749,0.7873797284830489,0.9007575347542963,0.7525550587234119,0.8853353644987544,0.8844996958521393,0.91631436071663,0.8421615027959828,0.7645438561071076,0.9701891541938077,0.8054904495345326,0.7820988227108299,0.7829009419166755,0.7956764352676915,0.969101952907569,0.7775278286760903,0.9649074588411335,0.9265043743853623,0.8150649942503432,0.7923539758435976,0.8431850940995922,0.8049634970748099,0.8071977527094933,0.8181649829430355,0.8182357856506315,0.9341931460389397,0.8004454216877078,0.8569497196897624,0.9364709640572855,0.8376062030151976,0.8001376845415397,0.990943259781164,0.7513519944367925,0.9159117809130111,0.7955647952590401,0.8102541876243841,0.9243869124448743,0.9032759588501902,0.8008437814470392,0.8799080178422928,0.9980348548489879,0.999293714042794,0.8171158256964843,0.7905852018541326,0.8129262603704575,0.7502653606338013,0.8662740306168717,0.9321679151830125,0.8058054495419282,0.9315214768668076,0.9731679583613695,0.7548682692276272,0.9999378192530315,0.8289917434642271,0.850299670427793,0.8987350465116087,0.8855512315815116,0.9467297604506588,0.9870879571022808,0.816299660071879,0.860640705283656,0.8020622597799243,0.8181316360845423,0.7766450414939048,0.8615365194623044,0.8333656765305157,0.9133623974381744,0.9588732223583778,0.9348080099879907,0.9888668791439951,0.922564316369382,0.7517438763106691,0.9898793477211183,0.9987078535085305,0.7801215888398567,0.896384678583012,0.9280475262302221,0.9735216350031561,0.9363561062013881,0.9957957670043706,0.995117446169306,0.9879350620624883,0.9676248904293585,0.82609802145712,0.8731802042237482,0.826721698892415,0.9309105673702952,0.9823697202302079,0.9301241279622365,0.7670952228613179,0.8117650586332648,0.7641456417557646,0.9600064716853178,0.8512212227283353,0.9928026431870067,0.8762088490997677,0.8309297624711441,0.7640842407349018,0.9202476296404312,0.9816803577814184,0.8103004670425689,0.9532623012203016,0.8070750232783546,0.78649213840258,0.8842650291938363,0.8150740747958786,0.9603334338925702,0.906044100110323,0.9661473599531563,0.9995905652524151,0.7961258542459106,0.8069296383665243,0.7577970595727503,0.8099881262362141,0.7772333087312536,0.8966914656832274,0.9963738923569098,0.7916681982758471,0.8298783564069407,0.9361857007832421,0.9546985010530903,0.9407447755014909,0.9971352015653047,0.8655458171759614,0.8355827487164974,0.7629434128186213,0.9936186722877256,0.9202544052217141,0.9859672156956006,0.8603012807991286,0.8185836437297171,0.9738233200683597,0.8303686387825253,0.9068424414869412,0.8382768912929823,0.7894514600578479,0.8217346473257183,0.8174722113479799,0.9860872192828269,0.8131110847639678,0.9391604146196764,0.7803876315130291,0.8703170486872867,0.9044052314974023,0.8742113526725293,0.8605940065528086,0.878568431825316,0.7536728048545869,0.8294341585274974,0.9134417048127352,0.9580826638830298,0.7756669206889947,0.8724975394375802,0.8080339332400219,0.9300180639779709,0.8758235060223428,0.7735331729056063,0.9253188204767395,0.8600465985009682,0.9528207898942229,0.8277268209926134,0.972371032629929,0.7963611249823304,0.8092835672819597,0.9307235159459553,0.9866326192752102,0.8926248054236476,0.8508576702539529,0.8067547923755384,0.8966889392697486,0.764573491738785,0.8410576658254594,0.7838612406328733,0.9186199984212451,0.7919044052423445,0.8057434134670078,0.9842218783596817,0.802266115748729,0.9601336204785252,0.7805244968664863,0.9774760679332557,0.8501851943488108,0.9753002657088041,0.7797269000183711,0.7952897190981307,0.7811300655047694,0.9063695990558711,0.9211477213532236,0.8634230165270821,0.8547050336572459,0.7739757405747181,0.8035805909611198,0.9469020613582542,0.9046355661696024,0.8160907270312949,0.8997384840280604,0.7749267800844788,0.8813872787045367,0.80810001969952,0.8481135501821881,0.7502798579034826,0.7888047515189365,0.9734433120862469,0.7616018546330139,0.983059165974903,0.8880129982744839,0.8975922197706124,0.7805102307905669,0.9665062897830137,0.9603575039451585,0.777111209504481,0.9621743036211803,0.8356858286395727,0.8651258919496662,0.8603985982758282,0.9723141471440555,0.8297612893219142,0.8270002678604425,0.8955421935837988,0.8267696155475913,0.8286326052464081,0.9711054000514696,0.7617717505237482,0.7598242819839087,0.837578425392671,0.8931988986379564,0.7538253432149226,0.8919286476852608,0.7659945833694366,0.7941878590878211,0.9250297446004312,0.8951834619752774,0.8492161768028612,0.9580445259812373,0.9616468828459925,0.9144580289539875,0.8318699373561033,0.8416402767777029,0.9030026942345499,0.9467236334175635,0.9884603709311413,0.8839261171155175,0.8066082782792282,0.8105922731299757,0.8302995476029917,0.9945827261168709,0.8155882249103903,0.8733791105039093,0.9428802881025415,0.7770441872431828,0.9603066919973393,0.7716877394772887,0.7533415661083533,0.8913511941785774,0.8913703905059521,0.9244327881287988,0.9440053023704241,0.9996028488674591,0.8784677713263079,0.9484417094820718,0.7547363782558185,0.9124494583339038,0.8996536036774716,0.837279280644664,0.8495988724097356,0.8153855194038324,0.7530712751219439,0.9755608633007911,0.8660748522070771,0.9277154825943157,0.8584159402090336,0.8846451900900851,0.9616653658291257,0.7528641263396912,0.8513039639078686,0.939809405965636,0.805716720786763,0.7637393250410198,0.9744061223122279,0.8009112878636662,0.7714788205696275,0.9237513508659598,0.8216908104632081,0.8101673911827392,0.9518041757382907,0.7560154794711511,0.9850499430966305,0.8649878896253216,0.7576095308651118,0.8426390254705972,0.8097843789127159,0.9077889646414332,0.8356097992330083,0.7763266847068095,0.8054310285024886,0.8611640773207394,0.8715797320619509,0.7842802373141831,0.8758888058014884,0.8852722431255398,0.9860403095635386,0.8585987465708655,0.9499569518287058,0.8199386599879812,0.7953901437688962,0.9919094204302291,0.9567649489840474,0.9408531789054817,0.9627807303636935,0.9230489544905605,0.8901249244258249,0.9748126323391637,0.9297255255116754,0.9851035237191121,0.7553590819218519,0.9360174318753627,0.9814821456637799,0.8078909581502545,0.9729117363229396,0.766958241719039,0.803577346616029,0.8357320052193519,0.8962399834127128,0.9433152086510694,0.7530479106077159,0.7894459246979693,0.8471513943724893,0.8193765812436715,0.9928289637025858,0.9734235426385567,0.9390514500366935,0.8492122467875609,0.8013661789222102,0.8696051045501437,0.9282460520167639,0.9601054699056014,0.7654456383419915,0.8012145942297777,0.9507032600776975,0.8867985308114157,0.8127637248199888,0.7630412849578191,0.8480295068794212,0.8045393756525387,0.9422876132162197,0.982655354833031,0.9345969613148049,0.8539656983504034,0.7662437498364189,0.9162639337259111,0.914275524059923,0.8565263589765988,0.9278257312472149,0.9074206723492186,0.8772368478538539,0.75987750586577,0.8982345821187346,0.7620307346423558,0.7601636928142848,0.8044510336180319,0.9618105096665686,0.7753765744693952,0.8569003685926895,0.9116994943228949,0.8498860854213504,0.7715177065363605,0.9241038344761416,0.9335937583319174,0.8123012418574596,0.9516521685775303,0.8661627137998891,0.7864437364431698,0.9219165620070187,0.9130556082576133,0.9229889145994401,0.8638174175288664,0.9285930364414254,0.7743902209895238,0.9966148879951794,0.9623578182723089,0.9682957286232289,0.7691108322389333,0.8939541757612832,0.7773192576579382,0.9580584432308658,0.8508554240000095,0.7610332460492928,0.9997002376612452,0.821507503474095,0.9502754122547614,0.979738245180562,0.9122899359590557,0.8272291072611022,0.8923551195017334,0.9090431363781587,0.9989718281968745,0.9324251998160356,0.8352883637033682,0.9953785646014512,0.7701605446080477,0.9422444117693463,0.8928925922575501,0.8369072199965113,0.9291675011364781,0.9627591957579387,0.9972380614363177,0.9776835190964509,0.9492044495479834,0.8133423498374173,0.7841496527939182,0.7564529977208206,0.7788522344550834,0.9360258809463089,0.8658901271317039,0.9396314620952673,0.7693732983004933,0.8503854740606462,0.7591986397596431,0.7922616948979102,0.8829799594398295,0.8525898754903747,0.9259158155275322,0.9504998520267354,0.9432223678536643,0.8387287079510363,0.932820169703485,0.9406165055309715,0.8859433206806173,0.9054670605490174,0.9440911292904989,0.7783382008776341,0.7869605454727491,0.9590762649697568,0.998867440838993,0.9448715353804371,0.853452173653229,0.7788533182600204,0.9225528134365504,0.7758963139957292,0.9341603949609063,0.8868641635437648,0.8172874628263784,0.9635352504423067,0.9408840128030262,0.8591565290488739,0.9324472880568994,0.9788460981793831,0.9101937395596345,0.8800285891643864,0.9587688037809832,0.7947892841532419,0.7672815471442318,0.9714134841287281,0.7616248123663888,0.8959594147711945,0.8938063881469921,0.8179552412353821,0.7761117525045372,0.9776149897514412,0.9223906313677785,0.9843405112204966,0.7847005494408998,0.9030783009332064,0.9021963670882122,0.7555190320795058,0.8659534565558771,0.8655009744289945,0.9917659313771017,0.8108295849265542,0.7517574629551336,0.8054460696270936,0.8407255407753955,0.8453092307072871,0.7600071093210744,0.8021703491135284,0.7534151830594176,0.8866152001625853,0.9633420590046092,0.9818977694361838,0.8674977306857745,0.9752701859202708,0.97986917269522,0.9191673457548939,0.9927608197033891,0.9259380681302545,0.9531732635024803,0.8520266318554832,0.8117929885884386,0.9048909351289569,0.7774063814926588,0.9385824112511263,0.9717671630078086,0.9157338605366842,0.832233623674324,0.9315941773170633,0.9986786170013484,0.7990291896523702,0.9022069849331761,0.8545976501686872,0.9604088373119415,0.9687819636616661,0.9138456150095984,0.9558193634498533,0.8874047547333728,0.8976769241094498,0.8246886308385281,0.8848811555742866,0.8479540542938253,0.8193247687543659,0.8378129106772602,0.9122147651175718,0.8872722907737596,0.998589301547175,0.9517437813734817,0.8374026917181312,0.8493101723615359,0.9563886203629843,0.916749137860188,0.8113442826502034,0.97475605120274,0.8167377716796083,0.8877826406498928,0.9456970802133506,0.8803591733846641,0.8021435451795121,0.9357876799714635,0.9149876663073311,0.952885653482062,0.9071820195609386,0.7987326293650335,0.9789810751157645,0.7845133494182024,0.9419201654569991,0.8249677227447697,0.9886479728569864,0.8952263159280875,0.9604811875852758,0.9099262042625735,0.8980789167427303,0.8463872102418523,0.9439994990193116,0.7991051382765377,0.8317452945292199,0.9431816781179535,0.9240485804654837,0.856557295552036,0.8746476538580006,0.9212410568252773,0.7648424707117334,0.9452657505270796,0.9672585985483412,0.8593490219258793,0.8248742305442982,0.9104681585445689,0.9922520733413152,0.9341731566014994,0.7845573280753668,0.9551212066338387,0.981274828840199,0.9676026820419112,0.7606315377732544,0.8482813625070674,0.8183662030549512,0.8043904329986501,0.757835463924426,0.9800690118515727,0.9291658592910332,0.8645825255907125,0.8137690214178841,0.7930789890899776,0.9357707854212907,0.9306045371172197,0.7885576170019695,0.8146284817725253,0.9985930973326754,0.8035512933879794,0.8943181386154617,0.9848378726876474,0.79865665959916,0.8419916992554919,0.9200448932450184,0.8636139854377791,0.8982123423461879,0.8629922593966901,0.7995386712927816,0.792738614975443,0.7616417084331467,0.8384614464026132,0.849069061394863,0.7677034039815502,0.8613955159634392,0.8157055717672244,0.9328816295637148,0.8188791948718546,0.8298548603110045,0.808463847649353,0.9757737707034977,0.8130548871252983,0.9695926501274064,0.8631171834504028,0.8125930148754008,0.9617696256639259,0.9735058301710731,0.9398069778245339,0.7992399407802648,0.8132743873483289,0.9722432646932947,0.8486893863498188,0.8569602428678099,0.901200481811898,0.7849378318555407,0.8981320115977354,0.8215127251802298,0.8088590712078498,0.7725195858882672,0.8243342171665224,0.9729540943881925,0.9538432429189189,0.7686431650432074,0.7931658208232518,0.9070000639411084,0.8639442636065517,0.934639559238687,0.9646680012944883,0.9640990076396854,0.8513806692084535,0.907814438092067,0.9974810788295081,0.8303703036540011,0.9335322786289653,0.8229849201230008,0.9464489999461385,0.8650909636075033,0.9512973817510064,0.8171938395933405,0.8561128162187304,0.983954899937734,0.9970676393932552,0.8519988465934305,0.9305425228310205,0.9282929284992953,0.8021250059956951,0.7697851684932859,0.835495228585357,0.9731596046901598,0.8956480969606953,0.989408527497294,0.9225015900520439,0.9962965890669615,0.9766905949965674,0.9186512188146807,0.8976059474218676,0.7972435396309756,0.7520461490518418,0.9515497709668667,0.7663796385630466,0.7554747738048742,0.9722253149891167,0.8320738300681049,0.8787304274096241,0.9971906909906467,0.8915307131084533,0.9544535843399286,0.9730770698077615,0.8318102026776537,0.9730115804067482,0.9515555767612883,0.9501870801002079,0.9772504533971471,0.9771407982632435,0.8327586644536866,0.9181173738075301,0.8198154176046022,0.8341007566698115,0.9200436327941245,0.9140004053079677,0.8507173298318568,0.8054779764096645,0.9103181593516305,0.8670640639694227,0.9699026661358147,0.988606694615634,0.7611057624592704,0.9734156964150423,0.9141040050974418,0.8838254277583764,0.7641931937865418,0.8721092455610389,0.8592326569651949,0.8288215057897631,0.8669864309667901,0.9400690561119932,0.8358438345502787,0.8777900309411419,0.8115612821095523,0.7791932872802574,0.91903186769611,0.9071030249825328,0.7512152285515483,0.8905842698364174,0.8583044789782505,0.9829214135195654,0.9088720439067466,0.9342189603935738,0.7718484209930203,0.8858915744398653,0.9955131202507936,0.8219173117878689,0.7860439114210659,0.8265090585054993,0.8374355564078619,0.9770031242653634,0.794817665622437,0.8054020096172736,0.8170766630625916,0.8931063869676261,0.7739197900198591,0.9925479707382153,0.7897140381422125,0.9560545192568526,0.9643026999929682,0.769049240145623,0.7566607603792253,0.8173708634705604,0.7740378363032506,0.7778734720504458,0.8268399440348588,0.9922871417878215,0.9654008800867491,0.7977079330177488,0.8528486864795349,0.9087483261605562,0.750215392481286,0.8689786831373381,0.98138866153256,0.9419750540798792,0.9623786085226224,0.8566065059647847,0.7992210155269194,0.7776190207302476,0.8651690219052725,0.7808167670615606,0.848226664926991,0.9286267511369157,0.9795041481162001,0.9341342365077849,0.7848321596289318,0.9197051276446997,0.800830120357393,0.8245447982361319,0.8836554947236794,0.7630861813700144,0.9881770305372326,0.8868465891139288,0.9012342643098699,0.9937574027889442,0.8970071433548503,0.8922185356859924,0.8698043671280296,0.8739432959522666,0.8829038598263195,0.8355012523570335,0.7892831454160534,0.9758267426176463,0.9109812636164056,0.9632287883828903,0.9748297020222452,0.7802231665455224,0.8094217987671805,0.9889701807756042,0.7583493514425382,0.9313178193158178,0.7611946380360785,0.8657131255812289,0.9167881549521675,0.8191752761084532,0.9880410639727342,0.7751702956040095,0.765052165822218,0.926124908319448,0.7715676176716655,0.8928387571466341,0.9349364591015815,0.7645874853110148,0.8650971652715418,0.7764143815314372,0.8074242367248665,0.8211978452451993,0.9432688319438065,0.7815086755951668,0.8072016171831687,0.8042914209665162,0.8779275549500944,0.880805757073327,0.8587976213430193,0.9068425082229499,0.8704771832981854,0.8130394929770701,0.7784405856484091,0.9446147162769896,0.7576712599280584,0.7944195594329513,0.9612631783915371,0.7972138121286512,0.9953826790776525,0.9716238471123801,0.9826441218619227,0.929471017968374,0.754447041043982,0.9079977150071739,0.8296015875871826,0.9007241702744171,0.994320497781364,0.7557017921997842,0.8248291685509456,0.8409342806257836,0.945178972598062,0.8918676151076852,0.9383052787923563,0.9587808538556408,0.8665869747347755,0.9874480913538801,0.8867955595154486,0.9719554344194684,0.7586741469643146,0.7980060171302011,0.9608177668979769,0.9075457458726568,0.7501480157370455,0.7560127650662363,0.9453999497298924,0.9475179498576435,0.8166254141968905,0.8554318259211041,0.8965265462525566,0.7741080645059735,0.8609195250807091,0.8296033096251013,0.8721326800655946,0.9507496823905532,0.9946484755517129,0.7510735973342331,0.9353427626834794,0.7925836233190222,0.8367675114628943]}
},{}],153:[function(require,module,exports){
module.exports={"expected":[-7.634781549613791,-222.4937875227261,-37.175127183921155,-103.32728479801025,-71.21794515282657,-32.42365672969685,-44.31866004132998,-122.37172300668257,-77.97553223619553,-22.18031496843357,-103.9729310847681,-290.4776337763617,-308.40742932648607,-108.34483028807026,-146.961145355899,-61.713875510732976,-11.641677659685259,-141.7371069766311,-101.83238288588748,-4.099591046958151,-5.176716549604967,-136.92154904448392,-166.12533457039078,-94.88908493075142,-21.903066452796285,-142.77061532195506,-68.0112147058398,-28.81585957822539,-122.55478544265712,-25.180914030451635,-208.45142057789607,-94.35754856000365,-99.86749261962245,-173.47483985143668,-4.385424785718678,-322.69986575045493,-12.050789093282338,-192.52553315138786,-28.117821421303216,-155.82014411448637,-65.00512053562423,-127.52019608109468,-278.15659130431027,-20.42211742823139,-45.1064974967345,-42.66166761457738,-27.63775149515306,-125.33040516906317,-61.59427727945361,-88.4692874318897,-9.835953065016394,-147.13784395549746,-154.40616597358598,-109.36180305764702,-22.028049183862876,-192.9178583480907,-15.07345220028613,-140.58925321512933,-137.6027171831304,-54.12886876081814,-135.60945975889823,-30.62124319704017,-92.53230399974285,-174.460466691075,-120.23123128617793,-91.91137041609201,-100.5383019131479,-39.741151531627416,-56.93888965800842,-223.50525173252447,-113.52860050721775,-18.31838182196994,-30.861935996448576,-41.384114210244306,-149.77850193029252,-12.494084896469523,-53.83914988262259,-401.17983779746277,-16.711798047107994,-91.89143879014189,-85.32645850102722,-61.7616412952501,-151.78502095452274,-158.13698130779642,-136.81459465075477,-73.900240114848,-150.89288520597114,-67.41826379713955,-156.42634127238665,-62.990634431097355,-26.967334659848756,-256.4848101915619,-60.17193001404061,-126.60592997740955,-64.51798675276375,-5.198490900680614,-136.03917311561167,-19.046825170033717,-179.43704765052846,-151.7716240456703,-165.4902904493849,-43.494333081787865,-114.00727800894228,-47.31451861249706,-49.608633478340074,-127.69489738374385,-42.83067895033543,-533.933368648763,-121.52991822394124,-380.4923715257974,-5.412453379187688,-80.16182355918794,-158.30389930815195,-474.6189305727156,-21.169281799091152,-110.00826196077723,-86.98503405483736,-252.09708782923602,-163.79920040801733,-107.16188289803875,-91.47066586043425,-3.3139502961077905,-65.27804937352415,-155.6782545440132,-17.83509884289094,-48.03791968704905,-150.29801084110704,-273.5871538178525,-176.84824600224343,-50.82963827097542,-110.32478162647006,-148.53526644344487,-141.83727723726,-80.16519655049996,-135.1116220985208,-42.06524785754097,-102.29517044779674,-39.13033402033808,-19.521816382201077,-51.14772849166742,-8.804797311937866,-16.952650567042234,-163.96165775584103,-53.405380304211285,-4.37256982011786,-108.75918410977367,-161.23732036963827,-269.9113697150329,-158.6238908602724,-73.4961098744772,-168.31404235512088,-244.82562759186024,-327.97970963517076,-251.67529083908343,-4.576162073260455,-111.27615905911627,-47.48259336624279,-134.41176515382503,-298.3951446294118,-23.74476244581118,-3.564201424887718,-101.19520421700538,-196.47540717559025,-3.3353865617424647,-228.3399158650299,-154.60584945079586,-22.706389197614072,-192.9917780628559,-31.830450066759123,-55.6174912667332,-67.95285293050186,-14.891846469177677,-104.99257813388795,-190.1182746775266,-11.118690514006612,-53.6981196313814,-106.46351270682864,-98.17945942370214,-9.341934947241384,-76.55365954615358,-51.92209104932687,-16.401874031643334,-159.44863425455068,-72.88297758925252,-118.64459392424538,-251.25563393482366,-207.21594274388679,-307.7204100594469,-56.72655239676459,-5.350354535905144,-23.89666941034949,-113.81226447686431,-15.267402544082735,-57.90981683048078,-8.148504991375221,-27.390368567075747,-77.66193893216031,-36.97404585530585,-174.01877511588927,-49.11849362432118,-18.02327158469086,-49.931578600083164,-279.9007541627954,-79.67026144233704,-25.86364065907241,-93.54500368092957,-125.9540829761402,-16.54890636460899,-79.45054043474505,-124.62855330378193,-143.52124342234566,-22.478165236718603,-130.50175807319724,-44.37592778169103,-10.592051520136351,-169.17042480421406,-189.1581743687277,-67.89842072195667,-107.48349722103717,-121.12412007662886,-62.18245203805767,-2.948641144628603,-197.43770909320665,-58.80374973418159,-23.834276141130157,-43.2888450639758,-166.1539828107815,-113.63522828920586,-117.99567466702878,-7.469043085197033,-6.575806127712801,-183.34120510369965,-77.01945982653973,-39.96990641904176,-28.7040731943143,-215.61728549034433,-119.99455862299706,-130.1379708388823,-63.626581904428264,-6.248250561318699,-158.93130409403668,-167.65365731844568,-14.796795269246983,-33.98289954485955,-196.530837431178,-77.41474393143532,-272.1679818217285,-17.668660474971883,-34.94246840150914,-58.57147291734097,-31.70919843358708,-113.92858879410882,-258.5011113111372,-82.24576008340016,-155.65693243357717,-123.39716341647797,-39.594187784296935,-55.826716822869585,-16.924832551221748,-15.278553020662605,-69.31280380588629,-7.51945343407818,-140.23649426657332,-96.5312593465435,-23.174525049670535,-39.171229246589576,-81.70361277683105,-53.42391357806661,-66.1775317296759,-14.769439454288337,-193.96104320744146,-80.62050115921659,-39.78301213334981,-36.442805251387696,-7.745470250991399,-11.693780110686962,-298.38303048082656,-103.67253582854674,-53.04853631072361,-132.54770396891922,-105.04177792985271,-49.48362255754728,-29.099965875862836,-115.33605337459223,-118.92039701743047,-41.56473381302819,-41.38608657279346,-89.99818625440402,-5.671620494222753,-140.84709173199852,-46.21503144121329,-77.50032137931878,-17.970612779682853,-79.2089471798164,-9.518044670955824,-413.61680403999753,-61.34554220981651,-316.6544616260504,-94.42188603389526,-72.42779049797605,-656.2770229907014,-128.8278588883038,-57.23597904627857,-62.27798701617662,-53.036603966225236,-113.20595113047764,-66.59147652625387,-86.45278588297721,-46.367489205557185,-11.390892919204944,-65.95855060426662,-13.754053256569353,-60.63818150402673,-173.30915928400836,-18.754912440510363,-180.59174528278928,-173.07880820779727,-87.02911653657262,-7.36942450689691,-116.27196407596193,-56.90896070283167,-59.78710830713304,-4.137639386267981,-153.86871575851248,-96.60942305522136,-80.62032873980816,-112.20818680995514,-26.047197551053507,-99.62849520951242,-5.524468246830848,-85.12851517118064,-72.2051100154573,-173.35739720840218,-46.65945837820741,-84.72550550305809,-102.72742387241962,-132.5708323975948,-68.83788876792524,-3.690009428886955,-99.33806175558294,-126.4844412556917,-16.60316098403275,-166.7967367055973,-121.36200618460575,-3.775123744339312,-101.96237067340246,-123.36060218248367,-192.2784745884193,-149.36555755388667,-213.70130170326982,-123.00528989004556,-90.7769976094859,-82.55953473426217,-7.5528226575588535,-221.84590446069396,-30.008245990617397,-316.6983036000416,-95.41592513507737,-5.222829991567918,-5.232126910479526,-121.24109262159644,-180.32362284331182,-106.78011634682484,-134.50313418049973,-168.7356996989006,-31.7225092523276,-225.08728520726947,-30.493165341496745,-37.589072551750235,-80.29874940614914,-93.87383726744162,-105.88496261419432,-106.82075684580472,-31.69333818993246,-24.026441649297833,-88.22864467921487,-44.93535897158214,-88.83015603469381,-91.67363430419537,-186.00260495471287,-47.420279730925195,-32.729812329577804,-22.733668329997816,-128.1271057296855,-142.77901968985924,-229.9472677870409,-11.450512632856027,-82.34649595542834,-25.872163837342747,-276.7446401747182,-19.287034971346678,-14.81331819053845,-338.7779067707645,-12.429803295163877,-52.991841237899244,-168.72418268266966,-16.8820162361945,-53.907793834332075,-91.62161918615115,-122.43699661620974,-58.77968230281386,-17.549945514636782,-102.0102263392376,-47.869767016615775,-134.81240155717015,-118.41424403173473,-66.18897101791922,-121.06154371203291,-64.6698028371201,-77.19981497205987,-210.685942733683,-17.562351324609235,-51.26522982769268,-57.694874248755646,-105.13001834119967,-47.95422902476091,-83.6346697351667,-105.86748769558804,-92.56404533454551,-61.42115190401977,-30.38446522663771,-135.17116806728268,-45.888549055909806,-8.041979411335035,-133.49930609058165,-237.45973088199293,-12.95013316305947,-297.5938454097911,-4.385521542294345,-7.7940311616586095,-401.58805255241816,-7.792922935938135,-4.5989521915486735,-124.39774858933805,-25.446073832508674,-104.48688885655476,-117.90398178842204,-24.82162136951066,-21.545625941239283,-41.613693789308236,-18.15260724319323,-50.61279128048226,-166.71212275068225,-102.28925713547447,-45.996896951976794,-172.33658523818212,-40.851319403593216,-103.9491954916646,-115.44379020445419,-43.495652553740086,-21.55624847081155,-183.7125721257791,-286.48052252737375,-129.87499532298398,-11.976010604921186,-91.16925302252967,-4.5641009774911865,-39.005588558243964,-71.42272093731293,-25.011172353833118,-7.072869780547911,-16.430146809311218,-148.1171673290089,-36.98351218588317,-40.50992089920019,-86.09314003950941,-102.5225971741713,-44.2339852287796,-106.29980896061154,-72.12033531314171,-4.46006662688973,-216.8347110302835,-145.3561320812911,-11.647722618287736,-23.882180660221014,-11.362024695544303,-112.46702412757168,-156.53026196876016,-35.475411295843664,-126.54886377776438,-48.147054704341286,-42.084061285441486,-117.99010360534956,-2.9274733034078895,-577.8349215281181,-134.6494555250062,-57.794337149206754,-193.0599839280414,-266.4942180925622,-97.6690356635141,-64.77494744195575,-71.85833573550863,-14.615709192046495,-50.970455808898784,-242.42814664415957,-38.827513801472676,-39.22720494568788,-26.483573743131014,-48.00814464866456,-99.09396117117006,-65.6911128896763,-92.55152400647547,-81.37310802773781,-66.68687222922763,-95.91283717072021,-319.7124822460214,-29.05070092087817,-66.01187035695813,-83.9389619722027,-34.68126065309214,-103.61898359790362,-97.76078699239578,-43.744807149005325,-261.4376391791415,-12.472952341992224,-3.4704983145214445,-139.82895038502596,-87.71993764811224,-109.82452636947471,-6.233981309623625,-35.33100763769225,-71.54227556864919,-39.982121349014484,-75.98173517547377,-46.985595226449206,-17.53568422819084,-13.873744293012368,-54.01271184943253,-144.07492244432163,-161.3637260714141,-108.06901366703379,-122.12562710739711,-87.86506039847029,-5.004479964446665,-111.92060744226751,-19.767930979672503,-269.4955866332998,-43.350407597357915,-154.41675830409363,-31.532334095680277,-59.14910765790516,-6.345755267507949,-113.88908410417164,-196.99507130560772,-199.49846269430515,-4.411215494856924,-72.10286296653588,-44.97073641869466,-26.63666273004482,-126.52802358416194,-192.55743788788064,-158.40966632223098,-115.17891407476259,-78.96468349138976,-8.817849060734073,-21.709635600237355,-148.19390911263062,-63.18723544683338,-105.86374386581885,-88.01443198345052,-77.3001921911884,-76.12161707284972,-89.83220466857182,-54.81848386039117,-173.57713536920954,-101.58037173748623,-164.59045001788368,-72.91642455060403,-264.8012936607976,-49.633536343817234,-46.41731002285475,-58.98914621399777,-91.34826609919499,-18.14748946409987,-135.6995798417435,-110.38072380126933,-171.64116068161027,-71.40577922620318,-469.9306884827024,-100.4072485246971,-264.7475383675159,-22.09932411075301,-5.058400029827587,-79.21837083788822,-18.844678053907987,-27.51035779945591,-109.82126942639556,-39.81324561190305,-132.1422707317152,-231.93030770678396,-6.705630074698305,-238.17473922086683,-4.265879128880117,-10.80140113026168,-62.62720427279471,-243.7769662193403,-10.25468440910667,-88.04997320310048,-125.10941377630003,-180.9765930408874,-3.358544434630939,-4.166767385748429,-201.52652952134613,-38.91085408698631,-118.34654930912028,-82.21778207974204,-29.713663310637912,-21.361297263077407,-46.08494028704951,-51.51507417914095,-6.486038419755138,-3.5452014796287843,-99.96254640305213,-136.3971862319708,-145.01496677239433,-201.91932779314666,-148.04420506048115,-74.425729721234,-47.30707339619947,-263.02024785890575,-53.896386443861644,-106.03199213608036,-168.98467835623347,-56.15056538428967,-100.4017895663409,-191.65051582361022,-203.59592359184094,-23.35259601382561,-34.218061813613495,-209.76933601582496,-75.36063080103403,-132.59055774215167,-16.740550958247653,-91.09492343024301,-47.01383210298457,-181.29331442832833,-129.81780685765202,-35.564497570299004,-80.47583224282135,-29.1174760732469,-77.5937008544332,-34.977828302051876,-81.27342505604793,-107.821644004577,-56.8305779835165,-187.15203064346474,-3.8066103974565637,-17.56952319436132,-29.009615911531757,-79.68418731274038,-14.043622735211304,-115.55772487821241,-276.4170142479144,-119.57254220675463,-11.132223152104187,-25.731348248144844,-247.84284183202655,-28.42564337848949,-77.55465035439066,-107.28554349518066,-104.75644870943943,-157.4736560263905,-181.33649429660943,-50.02426413908611,-191.51598119231235,-33.17324020977913,-15.664470472666817,-317.3382349383335,-34.43392656906428,-94.90690511655909,-30.76478691095156,-88.05150272637981,-86.29033647187538,-44.264748745994225,-115.65317273525147,-177.7847290268268,-258.50296282870255,-46.688415333495236,-92.73320607917775,-34.7410779759111,-22.307940146262276,-114.94304870308015,-294.1601854724741,-123.48443657155393,-20.808506406150546,-31.54286206676451,-258.325932109777,-105.82942179571188,-22.699668536444726,-143.774230928542,-14.45145503833247,-67.68036311724693,-53.68415187648582,-67.80235503993673,-178.59666195063002,-56.199566129882484,-8.596814769296198,-33.33271665801152,-108.3206842001465,-45.59561343630967,-56.823987945582296,-143.92738047115736,-3.874916151707375,-19.033999689194484,-158.89395721298848,-169.43335983418518,-158.35034231938016,-229.28230309730867,-17.196186723565607,-7.408703818940924,-22.062173948955408,-71.78869961280765,-113.26817025446147,-8.957732232898733,-65.75375059606883,-5.888517520770829,-5.461961484426293,-143.33048386398247,-94.06739545613598,-21.92823068067472,-30.646145787098234,-30.4552268045708,-6.141818988201987,-189.62151271148744,-290.3799109756697,-79.7084821613252,-5.387149529508597,-47.740011371996005,-15.463535596159373,-38.7589281314286,-195.37855108369672,-154.53232347739345,-42.377887531127165,-33.8065519626862,-39.032733148658195,-85.42328527297296,-106.04336075867825,-75.97219600673542,-124.08230112475167,-150.7244543648685,-184.78589073976136,-148.33765422214609,-69.5483703028325,-338.39552776178346,-53.87356039221292,-140.29230716257214,-31.597524917668633,-154.398027815847,-89.84600376369355,-33.3184180021125,-131.00241086474136,-184.24248774132818,-189.62333224532736,-124.43034732450688,-32.57449227937785,-54.008772919376035,-68.31898529447155,-182.8542242586693,-152.86742425110407,-18.08489152975477,-3.022428790156169,-41.56036364260077,-46.66092708764915,-44.09229688153268,-117.20483310118276,-9.66961675642143,-30.495886057687365,-185.7252007591841,-4.642994058601334,-111.88930451063904,-161.0073540964935,-159.7241771619494,-3.7865109435778184,-7.989446797455043,-125.49550837324364,-5.903466965765489,-17.62542765091756,-111.13491018008843,-181.72508185133125,-269.4332838147474,-56.14811929479159,-101.78980172861634,-150.64856808532178,-138.2346445817304,-34.84113710304505,-68.57853049296695,-61.25850534346097,-4.08169118778992,-391.36519874466,-4.010546412001072,-151.81484053364792,-93.66096908128209,-59.15456143150461,-88.84228876276387,-69.38339331669617,-102.6775720745694,-121.86373749852766,-280.37833518817513,-115.49516426339619,-16.694374256204053,-74.26467642319048,-139.63307134592628,-136.46541772197156,-101.67569605042304,-82.65994309779978,-159.10314303476105,-97.901392809472,-91.86753537689788,-134.36832465447662,-81.2113671366246,-220.08054648049273,-59.87138482762816,-168.7717858687685,-19.343650225788725,-79.2975617007376,-318.186978825185,-114.57783011141986,-93.27279313086548,-53.42742426249842,-53.176521360168955,-33.79551323094475,-342.05407284319307,-138.5161887320604,-231.4399279102729,-54.24951980352354,-30.42229317451318,-224.7698331422946,-110.2705026618402,-72.56295126611109,-51.76165318514404,-196.03406786256747,-40.84260112876261,-113.18461611685086,-24.805419563595365,-4.388708413177378,-11.292203899208523,-31.173368678477832,-176.04167583058643,-24.750562239671357,-64.74333657149272,-56.74228270779909,-83.44813254986565,-88.2654316181344,-59.65287147071609,-13.991298502084131,-123.67740767872633,-10.334809800163907,-23.55981120072319,-159.40598383822766,-31.659522136241534,-26.552278261811882,-227.7845322723249,-198.9338814366427,-67.01155325733495,-42.99241057146151,-8.037547884336695,-140.03211811961248,-116.42242817867067,-220.7265493916487,-135.18683263995078,-108.04501882983273,-10.92628317290057,-53.64822813286682,-93.87460534454104,-127.01501485893569,-64.8306170707122,-3.7940747861232964,-38.702075071736466,-100.16256219756276,-41.62238727197125,-17.796472204333522,-241.6425489826543,-21.215941560758353,-56.87091168079408,-79.55551179007878,-203.9903492967781,-6.124354143352007,-55.80129195891421,-26.947469084089718,-3.479670328239246,-21.441567285211626,-122.67591494297635,-38.73292025113006,-25.8625326599896,-121.22969503725875,-110.02078510262052,-85.36256101285029,-104.87294920857468,-70.29053570561194,-22.892276338453065,-4.353217630533017,-112.09684299795737,-120.33728327328035,-163.12116348434338,-28.117513231973504,-61.89191091787064,-232.0702615851796,-132.5569135081059,-110.80895433099278,-66.70207926208838,-62.70471227988608,-128.0075002652857,-77.9143601047585,-167.50620297377685,-7.045390313220438,-197.35491301896903,-3.025698830400035,-142.2546570559594,-46.86957850780897,-123.10009592081471,-13.847299716025741,-60.485924495892185,-46.61566568619496,-50.21130711986965,-11.246028784673621,-19.103149100250135,-5.872135461672043,-4.249217566254481,-33.89044304572983,-160.64401982572517,-28.506100813838327,-22.113443921047327,-47.836756102839296,-64.55925175053667,-55.314786926807194,-24.509608312676054,-263.70467893837065,-2.9092663345393364,-91.18122973869887,-92.3682890597421,-187.25404741572595,-35.708988313162706,-35.118729068307516,-38.186656318177604,-313.81396681869523,-9.765316059529312,-54.84233005065073,-112.30354536092571,-16.157078147742148,-251.63341799966935,-125.99479764587858,-114.50688563735022,-84.50908032466992,-12.77751891636315,-45.90841749421412,-8.985230285864493,-162.3258726544273,-94.15606513916246,-131.4253760429078,-49.362903253461745,-116.8211461779695,-48.41177640483233,-216.66586707641554,-206.98426951665544,-132.97120001368035,-232.19920005192571,-215.8170965095608,-67.98236311094682,-102.3052265975323,-7.420461833132943,-39.03888040293347,-153.68383592662775,-69.85098531193289,-41.43582115895155,-172.38073497599524,-98.20259799693561,-223.72583169474487,-18.487819731049886,-20.894789244236435,-33.29887787068467,-13.365715583660524,-115.14307242893857,-91.84927783057114,-163.75980132215,-136.49842154813433,-107.42305926113461,-140.4241859255794,-70.22797576962365,-56.42478316123385,-56.771941619668304,-4.310049557294918,-87.22488280211586,-231.1341873164595,-38.82915956409534,-100.81505752396261,-8.352665387602869,-63.93024985223292,-57.83821889252948,-35.05722136564091,-322.54687543085623,-3.994177354543511,-144.07822810321028,-207.8103558683146,-43.22643997920662,-90.7364857373422,-118.0847162845578,-3.438617201925255,-125.66026633967019,-123.26739471538478,-76.60427923839512],"x":[34.0,26.0,12.0,40.0,25.0,37.0,4.0,26.0,30.0,22.0,31.0,21.0,5.0,7.0,5.0,12.0,5.0,15.0,18.0,21.0,31.0,10.0,0.0,2.0,11.0,7.0,14.0,22.0,14.0,13.0,11.0,29.0,29.0,0.0,24.0,16.0,4.0,37.0,13.0,32.0,16.0,2.0,3.0,5.0,14.0,40.0,36.0,21.0,1.0,5.0,24.0,11.0,11.0,39.0,18.0,13.0,3.0,23.0,26.0,6.0,19.0,33.0,32.0,1.0,29.0,30.0,19.0,12.0,4.0,15.0,36.0,39.0,9.0,28.0,15.0,6.0,8.0,11.0,25.0,22.0,13.0,4.0,20.0,14.0,6.0,9.0,10.0,25.0,12.0,8.0,21.0,32.0,12.0,17.0,9.0,16.0,30.0,35.0,3.0,23.0,15.0,13.0,6.0,3.0,28.0,28.0,31.0,4.0,7.0,12.0,20.0,5.0,8.0,28.0,33.0,31.0,25.0,39.0,6.0,12.0,25.0,20.0,34.0,2.0,22.0,19.0,2.0,6.0,0.0,40.0,35.0,17.0,11.0,8.0,2.0,21.0,13.0,14.0,36.0,18.0,19.0,29.0,11.0,26.0,8.0,16.0,29.0,25.0,8.0,18.0,2.0,2.0,23.0,9.0,22.0,16.0,10.0,38.0,21.0,20.0,17.0,34.0,1.0,13.0,10.0,15.0,38.0,12.0,19.0,24.0,18.0,29.0,14.0,38.0,4.0,37.0,1.0,30.0,28.0,13.0,16.0,29.0,34.0,24.0,19.0,23.0,32.0,1.0,31.0,29.0,22.0,18.0,32.0,14.0,31.0,5.0,12.0,29.0,28.0,6.0,11.0,18.0,13.0,33.0,9.0,7.0,33.0,4.0,8.0,13.0,0.0,6.0,19.0,30.0,25.0,20.0,10.0,37.0,27.0,30.0,18.0,7.0,8.0,4.0,35.0,20.0,28.0,14.0,13.0,32.0,18.0,17.0,33.0,5.0,36.0,30.0,11.0,38.0,30.0,31.0,7.0,7.0,22.0,30.0,32.0,18.0,3.0,14.0,39.0,39.0,15.0,27.0,1.0,31.0,22.0,23.0,6.0,11.0,28.0,29.0,12.0,32.0,25.0,30.0,21.0,22.0,15.0,27.0,22.0,35.0,19.0,30.0,36.0,27.0,17.0,32.0,7.0,2.0,14.0,4.0,23.0,24.0,5.0,17.0,21.0,34.0,40.0,38.0,24.0,10.0,0.0,28.0,19.0,36.0,4.0,37.0,33.0,19.0,30.0,2.0,34.0,7.0,28.0,22.0,13.0,17.0,8.0,3.0,31.0,10.0,19.0,14.0,9.0,7.0,32.0,31.0,3.0,7.0,9.0,32.0,5.0,21.0,30.0,37.0,19.0,15.0,10.0,33.0,23.0,40.0,9.0,30.0,34.0,3.0,19.0,11.0,1.0,38.0,20.0,19.0,4.0,15.0,30.0,5.0,5.0,26.0,36.0,33.0,19.0,17.0,31.0,8.0,24.0,30.0,18.0,32.0,15.0,28.0,34.0,31.0,27.0,5.0,6.0,0.0,22.0,24.0,10.0,34.0,9.0,4.0,29.0,2.0,1.0,28.0,9.0,1.0,37.0,37.0,12.0,1.0,34.0,37.0,16.0,30.0,23.0,36.0,18.0,14.0,32.0,2.0,14.0,19.0,37.0,24.0,28.0,21.0,13.0,21.0,3.0,36.0,34.0,35.0,1.0,34.0,34.0,18.0,18.0,26.0,16.0,35.0,2.0,37.0,28.0,5.0,37.0,8.0,12.0,38.0,14.0,40.0,25.0,17.0,5.0,37.0,36.0,28.0,26.0,26.0,29.0,15.0,22.0,39.0,28.0,28.0,28.0,24.0,5.0,39.0,11.0,36.0,7.0,15.0,37.0,31.0,22.0,8.0,12.0,1.0,35.0,38.0,1.0,2.0,19.0,9.0,10.0,17.0,12.0,33.0,21.0,16.0,39.0,26.0,12.0,39.0,30.0,21.0,28.0,9.0,16.0,27.0,4.0,7.0,2.0,14.0,28.0,32.0,39.0,11.0,5.0,2.0,22.0,1.0,24.0,7.0,28.0,9.0,15.0,15.0,7.0,33.0,28.0,14.0,13.0,36.0,19.0,32.0,5.0,29.0,1.0,8.0,18.0,6.0,6.0,13.0,26.0,29.0,2.0,11.0,15.0,36.0,38.0,22.0,3.0,16.0,24.0,16.0,35.0,10.0,33.0,5.0,4.0,13.0,7.0,33.0,23.0,39.0,37.0,4.0,0.0,36.0,17.0,1.0,27.0,26.0,19.0,30.0,25.0,37.0,7.0,19.0,12.0,38.0,31.0,20.0,18.0,34.0,38.0,3.0,29.0,3.0,5.0,34.0,31.0,6.0,17.0,23.0,6.0,21.0,28.0,12.0,29.0,20.0,25.0,16.0,38.0,35.0,6.0,32.0,24.0,1.0,38.0,33.0,38.0,35.0,9.0,29.0,23.0,20.0,21.0,8.0,2.0,8.0,8.0,21.0,8.0,37.0,8.0,33.0,25.0,27.0,27.0,31.0,30.0,17.0,4.0,18.0,39.0,36.0,38.0,38.0,12.0,4.0,4.0,19.0,19.0,5.0,27.0,8.0,1.0,33.0,35.0,19.0,38.0,34.0,21.0,27.0,38.0,10.0,19.0,0.0,27.0,5.0,28.0,0.0,25.0,11.0,13.0,4.0,36.0,8.0,27.0,1.0,18.0,4.0,31.0,0.0,27.0,30.0,6.0,1.0,5.0,30.0,2.0,32.0,33.0,30.0,38.0,5.0,26.0,27.0,38.0,3.0,10.0,11.0,16.0,22.0,31.0,17.0,12.0,28.0,33.0,15.0,23.0,28.0,31.0,9.0,3.0,33.0,1.0,34.0,18.0,33.0,38.0,23.0,39.0,21.0,22.0,11.0,19.0,29.0,30.0,27.0,21.0,34.0,38.0,34.0,3.0,29.0,19.0,7.0,16.0,22.0,4.0,26.0,21.0,20.0,40.0,1.0,31.0,6.0,5.0,7.0,26.0,6.0,36.0,36.0,17.0,11.0,35.0,25.0,18.0,26.0,5.0,5.0,1.0,33.0,27.0,8.0,21.0,11.0,20.0,13.0,32.0,33.0,6.0,6.0,35.0,12.0,3.0,17.0,20.0,23.0,26.0,4.0,1.0,13.0,12.0,34.0,17.0,6.0,28.0,17.0,30.0,15.0,33.0,19.0,34.0,19.0,1.0,38.0,0.0,17.0,5.0,16.0,20.0,20.0,29.0,4.0,2.0,15.0,10.0,36.0,11.0,1.0,9.0,31.0,33.0,26.0,32.0,10.0,17.0,14.0,29.0,27.0,33.0,18.0,5.0,18.0,30.0,19.0,16.0,2.0,6.0,7.0,17.0,18.0,10.0,1.0,26.0,21.0,29.0,35.0,21.0,12.0,2.0,29.0,21.0,21.0,22.0,30.0,11.0,3.0,27.0,21.0,21.0,29.0,39.0,40.0,20.0,31.0,37.0,9.0,5.0,2.0,23.0,17.0,21.0,11.0,3.0,13.0,35.0,21.0,16.0,4.0,34.0,12.0,27.0,25.0,7.0,0.0,37.0,19.0,7.0,3.0,25.0,33.0,39.0,3.0,17.0,14.0,16.0,38.0,36.0,3.0,39.0,37.0,11.0,19.0,7.0,40.0,21.0,38.0,2.0,20.0,12.0,2.0,25.0,26.0,26.0,17.0,12.0,4.0,20.0,13.0,31.0,24.0,28.0,8.0,34.0,20.0,33.0,4.0,3.0,29.0,14.0,26.0,38.0,6.0,36.0,21.0,20.0,24.0,27.0,13.0,25.0,37.0,4.0,0.0,12.0,39.0,25.0,30.0,7.0,2.0,26.0,40.0,28.0,12.0,3.0,27.0,26.0,27.0,17.0,2.0,30.0,29.0,12.0,18.0,24.0,27.0,20.0,13.0,25.0,1.0,15.0,31.0,20.0,18.0,10.0,5.0,18.0,20.0,15.0,25.0,3.0,30.0,8.0,10.0,30.0,34.0,11.0,40.0,17.0,20.0,20.0,7.0,15.0,37.0,21.0,11.0,31.0,31.0,30.0,26.0,28.0,15.0,1.0,22.0,5.0,28.0,4.0,7.0,33.0,22.0,27.0,16.0,31.0,32.0,38.0,39.0,33.0,11.0,27.0,38.0,35.0,19.0,16.0,18.0,32.0,29.0,6.0,19.0,34.0,12.0,37.0,32.0,2.0,25.0,25.0,6.0,38.0,28.0,2.0,36.0,16.0,40.0,7.0,29.0,12.0,26.0,23.0,23.0,2.0,4.0,29.0,9.0,29.0,13.0,7.0,22.0],"r":[1.0,75.0,34.0,73.0,55.0,46.0,21.0,70.0,79.0,17.0,71.0,71.0,75.0,42.0,95.0,33.0,11.0,91.0,74.0,3.0,11.0,94.0,95.0,35.0,23.0,55.0,47.0,26.0,75.0,20.0,82.0,59.0,91.0,96.0,4.0,98.0,11.0,89.0,23.0,96.0,53.0,55.0,94.0,16.0,33.0,37.0,26.0,80.0,25.0,37.0,18.0,89.0,97.0,71.0,9.0,94.0,12.0,96.0,89.0,30.0,88.0,26.0,52.0,100.0,82.0,55.0,80.0,28.0,37.0,91.0,92.0,19.0,18.0,52.0,94.0,9.0,45.0,87.0,25.0,64.0,43.0,40.0,55.0,67.0,49.0,55.0,99.0,42.0,86.0,26.0,25.0,98.0,48.0,89.0,38.0,9.0,84.0,14.0,80.0,84.0,63.0,28.0,76.0,30.0,47.0,67.0,24.0,89.0,62.0,99.0,1.0,49.0,67.0,92.0,29.0,72.0,43.0,75.0,91.0,62.0,64.0,5.0,61.0,58.0,16.0,47.0,73.0,73.0,100.0,55.0,41.0,74.0,77.0,38.0,41.0,35.0,75.0,22.0,33.0,30.0,12.0,30.0,30.0,38.0,3.0,66.0,89.0,84.0,84.0,31.0,78.0,93.0,99.0,94.0,5.0,44.0,35.0,68.0,96.0,11.0,2.0,52.0,70.0,2.0,73.0,48.0,25.0,59.0,38.0,42.0,33.0,27.0,60.0,100.0,10.0,69.0,57.0,71.0,19.0,31.0,32.0,16.0,73.0,56.0,100.0,77.0,65.0,65.0,33.0,10.0,31.0,87.0,20.0,45.0,16.0,17.0,44.0,14.0,51.0,26.0,7.0,42.0,98.0,43.0,19.0,37.0,92.0,7.0,27.0,99.0,73.0,15.0,87.0,43.0,15.0,67.0,76.0,45.0,67.0,99.0,45.0,2.0,99.0,40.0,23.0,48.0,75.0,60.0,30.0,18.0,7.0,93.0,84.0,11.0,31.0,85.0,36.0,84.0,67.0,15.0,98.0,91.0,13.0,46.0,40.0,63.0,97.0,4.0,50.0,73.0,20.0,64.0,74.0,71.0,62.0,96.0,20.0,27.0,27.0,27.0,36.0,14.0,83.0,42.0,23.0,36.0,45.0,54.0,36.0,7.0,87.0,44.0,46.0,27.0,7.0,22.0,57.0,56.0,28.0,79.0,70.0,37.0,15.0,80.0,81.0,53.0,32.0,84.0,10.0,100.0,28.0,34.0,8.0,88.0,9.0,95.0,39.0,84.0,79.0,45.0,97.0,75.0,40.0,35.0,35.0,53.0,35.0,32.0,37.0,12.0,58.0,12.0,45.0,82.0,18.0,61.0,87.0,50.0,8.0,63.0,35.0,59.0,7.0,68.0,72.0,53.0,78.0,22.0,84.0,18.0,18.0,76.0,96.0,26.0,59.0,52.0,73.0,69.0,2.0,88.0,59.0,20.0,100.0,67.0,4.0,86.0,71.0,43.0,61.0,94.0,86.0,62.0,44.0,5.0,91.0,19.0,73.0,94.0,3.0,1.0,71.0,71.0,70.0,64.0,85.0,33.0,81.0,35.0,25.0,35.0,72.0,47.0,57.0,30.0,22.0,37.0,36.0,54.0,38.0,77.0,46.0,46.0,9.0,88.0,38.0,98.0,10.0,65.0,31.0,89.0,12.0,19.0,93.0,16.0,34.0,67.0,15.0,54.0,31.0,77.0,69.0,23.0,53.0,22.0,82.0,94.0,34.0,59.0,32.0,79.0,85.0,25.0,56.0,38.0,43.0,29.0,32.0,93.0,76.0,61.0,28.0,67.0,33.0,18.0,97.0,98.0,23.0,86.0,1.0,9.0,91.0,5.0,6.0,49.0,10.0,66.0,57.0,29.0,20.0,28.0,12.0,35.0,96.0,85.0,19.0,60.0,20.0,47.0,76.0,40.0,12.0,76.0,76.0,64.0,13.0,75.0,7.0,51.0,54.0,22.0,14.0,11.0,75.0,25.0,44.0,59.0,47.0,32.0,45.0,37.0,3.0,56.0,93.0,15.0,29.0,18.0,31.0,84.0,27.0,45.0,22.0,25.0,50.0,3.0,98.0,75.0,50.0,59.0,72.0,88.0,57.0,25.0,13.0,58.0,79.0,51.0,14.0,31.0,21.0,59.0,62.0,60.0,25.0,23.0,89.0,99.0,16.0,38.0,40.0,36.0,45.0,82.0,26.0,62.0,12.0,2.0,82.0,66.0,44.0,3.0,18.0,40.0,34.0,55.0,29.0,25.0,26.0,37.0,38.0,99.0,83.0,54.0,49.0,2.0,84.0,28.0,69.0,54.0,83.0,31.0,39.0,15.0,68.0,45.0,100.0,10.0,68.0,22.0,34.0,67.0,74.0,79.0,82.0,31.0,14.0,23.0,75.0,57.0,54.0,51.0,78.0,66.0,65.0,38.0,84.0,95.0,35.0,68.0,93.0,27.0,63.0,33.0,71.0,21.0,72.0,97.0,89.0,48.0,96.0,72.0,53.0,17.0,5.0,61.0,18.0,33.0,80.0,37.0,46.0,45.0,15.0,92.0,10.0,16.0,32.0,96.0,14.0,65.0,82.0,48.0,5.0,1.0,56.0,28.0,34.0,30.0,21.0,15.0,30.0,40.0,1.0,4.0,43.0,80.0,97.0,97.0,69.0,57.0,39.0,81.0,57.0,71.0,98.0,34.0,79.0,81.0,49.0,15.0,42.0,93.0,54.0,54.0,15.0,63.0,48.0,98.0,70.0,44.0,59.0,17.0,41.0,39.0,50.0,72.0,27.0,47.0,7.0,11.0,17.0,36.0,31.0,75.0,97.0,77.0,13.0,16.0,82.0,32.0,56.0,95.0,55.0,96.0,97.0,55.0,80.0,30.0,13.0,75.0,19.0,70.0,11.0,70.0,96.0,36.0,81.0,96.0,95.0,23.0,78.0,37.0,36.0,94.0,64.0,53.0,23.0,22.0,91.0,79.0,12.0,50.0,13.0,67.0,40.0,61.0,81.0,30.0,10.0,14.0,92.0,36.0,32.0,87.0,3.0,5.0,78.0,58.0,57.0,76.0,16.0,16.0,21.0,35.0,73.0,5.0,38.0,9.0,6.0,80.0,74.0,15.0,25.0,30.0,13.0,70.0,78.0,46.0,13.0,22.0,8.0,39.0,86.0,88.0,31.0,25.0,25.0,39.0,68.0,52.0,67.0,91.0,81.0,40.0,73.0,83.0,65.0,88.0,39.0,95.0,42.0,15.0,34.0,91.0,97.0,79.0,27.0,55.0,38.0,76.0,72.0,8.0,2.0,29.0,42.0,21.0,71.0,16.0,41.0,94.0,6.0,58.0,95.0,71.0,7.0,17.0,93.0,11.0,16.0,70.0,72.0,99.0,44.0,64.0,75.0,72.0,19.0,60.0,44.0,2.0,85.0,7.0,93.0,60.0,57.0,53.0,45.0,79.0,99.0,67.0,78.0,16.0,54.0,89.0,76.0,33.0,78.0,95.0,99.0,96.0,96.0,80.0,71.0,41.0,95.0,9.0,72.0,75.0,79.0,53.0,11.0,41.0,46.0,96.0,55.0,71.0,66.0,30.0,80.0,99.0,47.0,24.0,67.0,25.0,80.0,19.0,9.0,20.0,21.0,91.0,24.0,28.0,34.0,30.0,69.0,35.0,19.0,74.0,11.0,21.0,99.0,45.0,24.0,80.0,60.0,37.0,27.0,4.0,86.0,51.0,77.0,72.0,79.0,9.0,15.0,70.0,81.0,29.0,3.0,29.0,84.0,20.0,28.0,51.0,13.0,26.0,37.0,95.0,2.0,18.0,38.0,4.0,22.0,73.0,48.0,24.0,72.0,74.0,39.0,63.0,37.0,39.0,6.0,42.0,58.0,92.0,22.0,64.0,72.0,87.0,41.0,62.0,42.0,40.0,61.0,99.0,1.0,91.0,3.0,80.0,41.0,99.0,21.0,44.0,46.0,16.0,15.0,6.0,8.0,1.0,17.0,56.0,29.0,28.0,34.0,32.0,17.0,28.0,64.0,3.0,61.0,90.0,87.0,46.0,35.0,33.0,65.0,7.0,48.0,98.0,21.0,84.0,50.0,61.0,49.0,23.0,40.0,11.0,90.0,86.0,89.0,52.0,55.0,28.0,70.0,95.0,99.0,52.0,86.0,42.0,89.0,21.0,30.0,79.0,69.0,47.0,91.0,81.0,98.0,17.0,17.0,41.0,11.0,76.0,30.0,86.0,92.0,70.0,69.0,68.0,47.0,17.0,6.0,82.0,56.0,49.0,45.0,8.0,38.0,65.0,23.0,87.0,7.0,55.0,69.0,33.0,75.0,89.0,7.0,57.0,67.0,66.0],"p":[0.15630653026049268,0.024975015358458696,0.17674555710549408,0.09787173208234289,0.1238445873122033,0.17895839867710542,0.07916814057195709,0.08391603033333267,0.18529491189928407,0.07375113637449973,0.10447479802804205,0.008665208718281558,0.013076165661310047,0.04966536585150175,0.17781192109504473,0.07720695507825615,0.18378906088418026,0.13777496254865143,0.1468181040450803,0.06410540900489732,0.14713328921452976,0.17132492871139182,0.17400213106895077,0.05546409112665116,0.1856906761248419,0.052303229176657466,0.12811683756687484,0.1138993082858793,0.12308499517268467,0.11498628943165046,0.05392244861903209,0.08604251725339696,0.17646332480282398,0.16414098073857192,0.07039338611341638,0.023840059137292792,0.19288279055251698,0.051524901411566806,0.1269823912726436,0.09937371012802974,0.15996030612114215,0.0864050590300522,0.04578077069821856,0.16130395751821452,0.12174437894743267,0.0900652465799699,0.08742998201714786,0.11678957657077059,0.07506470045816577,0.0640745175567206,0.18069238570157517,0.13532598007088828,0.14693198506440597,0.085726783756258,0.018406848570969726,0.08746371430559813,0.18324203846170245,0.13377929416496195,0.11403240055371713,0.10446623153359501,0.12852302215959172,0.08140094014147846,0.06348814784189268,0.16715608230238588,0.11450860987178238,0.07578408240016765,0.1674526614324864,0.11585980533555307,0.1606244428261316,0.05525756903158632,0.1393727877815609,0.07775233484124065,0.08186627516529006,0.1980686071881199,0.13399681217876067,0.11084570275876127,0.19968278895556116,0.006868147951464865,0.1740644249233384,0.12065431897908355,0.0733474172320471,0.16211732151446717,0.0304265264454322,0.056716527271990905,0.04350003355795256,0.17436517016252845,0.16163787129613805,0.07851320004599738,0.11078034092295704,0.047825997741784046,0.11873212933404274,0.03626516351449647,0.16768050012560592,0.15132692626684802,0.10877590166085405,0.17682432494084266,0.09708494489818605,0.04497970198249593,0.09239146166944377,0.08954830850377929,0.04137764995453175,0.09680475927802323,0.1750344298396657,0.15825276100976327,0.1409639998598971,0.06753093660968733,0.041926416284387584,0.002099759223408082,0.1021058104266587,0.014948980415956426,0.16523311166055998,0.14612398640261373,0.06691938716114257,0.002917430765246909,0.14627777696989375,0.09834949504635607,0.051402166952652095,0.013689763631192564,0.13299046365618225,0.11099519553639446,0.11472196817187141,0.17025832703815014,0.14185783392514045,0.06018533281179406,0.08875183782366647,0.17699420903472152,0.11489102348896685,0.018105711272742075,0.1705916721769699,0.14506698598689743,0.02067750267934674,0.07826276444864072,0.10775698713673365,0.07439992990411737,0.03147136716795913,0.12173888358437211,0.1664255760917692,0.06618550072334908,0.17668605252331432,0.07194900002353699,0.13748800243226356,0.19876958797573518,0.002063522203501922,0.09033505010800309,0.08229993211601322,0.11126580578516797,0.08274577358269682,0.02077392512119869,0.11343729332513913,0.036713330891353646,0.10455647282841403,0.06579528851297804,0.020683933123766398,0.05104007793067318,0.08769510475708304,0.03879897934121131,0.14516409570418287,0.053972728778814406,0.026002070933358646,0.025290348435379563,0.13156535086995289,0.05156918910946611,0.05688932401682454,0.10007444739290189,0.029815642115273988,0.02055704832024743,0.0987993629949771,0.022943394375398985,0.19931337762626034,0.10821574834803399,0.05207946163301283,0.19237355453965327,0.10188963330434474,0.07018103896802881,0.18502625332676392,0.19994616053640485,0.1442830850879809,0.11569446643008151,0.18181350885538905,0.039270760608119876,0.08596368627943925,0.08160320242005553,0.04791625981472261,0.1264151524510588,0.19333276520094478,0.01977352344301524,0.016875091651161744,0.008244127593503592,0.05392166178694091,0.13428520036712605,0.18275321430812178,0.16608898995663865,0.11785212041041447,0.14925443893345255,0.15411264598216368,0.11547703211857026,0.09566790737823219,0.013233171391136623,0.012815584377113033,0.09195051709728133,0.020476909278988844,0.14457968237239852,0.03929353948632955,0.052199750136788084,0.12143793057264612,0.05050474422535239,0.12562370644944792,0.044972336837496574,0.028636872305560203,0.19930280251383717,0.14000957995791882,0.11607312351143376,0.13359050562667898,0.13336687795556906,0.13064710365117663,0.04182909280392031,0.057283786910479154,0.07173676897710472,0.09395986086336042,0.15715270629208358,0.12106820758012078,0.13383084367118384,0.10515338295523757,0.17482684965349427,0.08579509823623517,0.19920391581917687,0.05169147258413736,0.0879035673573073,0.00884329291591306,0.18410083149034256,0.09295098284088961,0.08734914577738695,0.1967867261935785,0.012833463677208857,0.11321319480906339,0.03812584659382208,0.018779241876546095,0.0933927726600604,0.18008795186864304,0.17540242343741141,0.15689098377709174,0.1239405801634359,0.0782174227136474,0.19307364106755742,0.002301422730356695,0.1620681718663374,0.05353154334165225,0.0023831374994911503,0.18249897552674207,0.19439709265714253,0.07469678919360452,0.07667874565327991,0.028695129961314382,0.14475718694655196,0.039433449447418,0.1612568899488506,0.07732091880075727,0.06057180180374436,0.17796730195397392,0.18872106186853055,0.0754144706874846,0.13716105428325612,0.09722501072097596,0.03443109336113253,0.12360313756777291,0.13633446767119511,0.0835342393913277,0.16485798619881722,0.061188014651836035,0.014630848005175202,0.06332834824367271,0.057148305210015994,0.15042157909926324,0.07836776617962747,0.0775817665104543,0.16845642682930265,0.0037443358075016867,0.13839041031049684,0.06534060570348799,0.15706041759591238,0.114619056232644,0.1003412001491641,0.07913539317858934,0.14355143128737444,0.12993450244854882,0.18314601802795122,0.07078773814517639,0.1555213461679723,0.14331528372358124,0.18228506050303542,0.1919468367570823,0.0326295139952697,0.020839790496453903,0.19658289688304104,0.19158333118656592,0.005825907742597902,0.06642356993258129,0.013257623389580387,0.14792984128372524,0.1728480277507241,0.0005478013883211564,0.13573974948609774,0.08646813364542237,0.0641661256338785,0.11020848056507973,0.06073506129461177,0.0896184412188025,0.051381310014129204,0.0947061100647261,0.15336138188417803,0.1695914832659037,0.10040248402684951,0.16444416634300568,0.0925041399035394,0.07933932990289656,0.020923668657140126,0.1201768206011574,0.12151937452920612,0.14826627343487778,0.06526135527399224,0.13754743238278447,0.18709628957177485,0.12241352472154916,0.0408113519884068,0.14774569436236198,0.12045852818439436,0.16744653458043868,0.0735640967902322,0.1709144492462106,0.19517663522397755,0.003855507077594478,0.1899123611426724,0.08006720024900066,0.12360137375518399,0.12440162250834166,0.08413886262214501,0.15373489732571627,0.15387878701950816,0.10734897013620706,0.1975725566304618,0.09429208431986008,0.17293537372133155,0.09912442287333256,0.1293094301217928,0.18320235052601747,0.16434371488281796,0.07276373965221304,0.0036617959111505897,0.04451815732124609,0.06449639243228358,0.1177424747613865,0.1637240406520471,0.06186098393319894,0.03112461313814996,0.053035707468215024,0.044645384910097445,0.007791984107155869,0.197985287808071,0.17074756862752458,0.0855979636484138,0.08653094952629044,0.06266738477957237,0.16816666911530784,0.12225925211479086,0.07624639371848896,0.1437571383122776,0.04345514273480129,0.13377800281473448,0.1155471846919634,0.0738478367344928,0.12862470843456136,0.0908674030306008,0.14337897091955185,0.1122594229779284,0.17133247143558689,0.08376114311716334,0.0839206057575912,0.06859918629921395,0.0468059475121692,0.08451006802996926,0.12866860021118984,0.17752142087695355,0.018429313665828985,0.11740029546278744,0.00870448857063515,0.04523897424745913,0.07950275828665894,0.17241775764291645,0.1360199217896279,0.04069042677707549,0.060162702860288735,0.1571529862929001,0.011774515353081405,0.12598200464076378,0.06925829323550281,0.04124310037996413,0.11793072143513933,0.18367528033925531,0.03958953183544574,0.0882533972238214,0.19166821889776495,0.11935569819428755,0.1357582514530535,0.02474098324551104,0.0883393034621065,0.17886430941835219,0.05931203564035706,0.056877012088308115,0.05681866212036368,0.174529833010461,0.07628286010949684,0.12981430513478923,0.1787204847067014,0.15641938125013516,0.026368668308877654,0.10907597299189331,0.03569012219154435,0.151329281904091,0.190079487079894,0.13936977861605446,0.11238213324829426,0.07482449828019382,0.17285574739146903,0.15871102627961814,0.12260511122783808,0.04675965689803681,0.18759828426715305,0.016083575129748253,0.03494939631796066,0.1217956996027798,0.006770189335003263,0.024479414400938905,0.09323568866985919,0.030388321722881306,0.012613741674622059,0.10077183771230698,0.09698445141023466,0.11239124736495083,0.15309582202954186,0.05695309300846412,0.09865503008638297,0.11101444958167446,0.08271786488344586,0.14898687972481248,0.023932302917268135,0.039022734917976636,0.05241735496915374,0.1011314050713835,0.09585582455932179,0.10472437249988178,0.13653198195777497,0.0804530268987283,0.012794073951415054,0.08987897119981114,0.16308575884121296,0.1780633265733098,0.1796673943461983,0.18688928395325843,0.1295205876877125,0.12245811899976444,0.12604764008592798,0.042873937914193805,0.09116553159051866,0.05069686126141115,0.15298472989077033,0.11628332033851736,0.04287380248298827,0.14283797315435143,0.04639143512091253,0.049129098154448284,0.10654854537345632,0.014587404606295973,0.19233579775191148,0.170462405803252,0.1445848294432047,0.13315757273493403,0.0062922767263081,0.10775675870259374,0.17843234066699673,0.051606264470054036,0.032933109838717334,0.16448610964715007,0.04001227935141101,0.18282492643436263,0.0014312260244058628,0.11838844167127616,0.173276825924772,0.021098945952974194,0.01830046019636473,0.16252932374035264,0.1411669225824746,0.022797394226382918,0.1112593371512583,0.16638094699432782,0.026233863305539586,0.19076320522605755,0.032157428023047045,0.1411846411204623,0.08832997951739263,0.12982429171601836,0.1930203616451474,0.16059914185527258,0.02279622946145006,0.02226697915635465,0.1867813057640605,0.0204951213055669,0.12166377133128942,0.09680306286178966,0.059596482106009055,0.11772680805636032,0.030794249522028406,0.17124094382396138,0.13853834527643777,0.00811621254129964,0.07990171208773181,0.09535141145244702,0.08173157282030874,0.17999397736225956,0.027232604792935346,0.0493679284548878,0.0884406468048245,0.08731020319445225,0.19728962409773737,0.09773916914963779,0.06720882968227308,0.12542075731540595,0.16600495194659579,0.1741489486861042,0.02256296739620907,0.09484402982889734,0.16791031774218212,0.09694928160401856,0.06671379975361669,0.020682524298406158,0.15720446466466168,0.1571255265084441,0.009538929211682624,0.17273063261599808,0.11971743039080347,0.14891194621371903,0.11857277204562942,0.15155922840454858,0.08215569544429453,0.0054676568891460775,0.08557725100006319,0.147622635059363,0.1425548064964559,0.09284021918063573,0.16097387383162706,0.12945034559901145,0.05925471640583977,0.059770243386023485,0.11855053704005547,0.04955967518798028,0.17933557274922307,0.1259084916422879,0.10784404804761004,0.1664767665107418,0.05768735035485078,0.10470208796315501,0.18628827328987324,0.17128419557904404,0.12137158898687309,0.11182937900573431,0.05463886403813456,0.17079391286875653,0.005888637065045277,0.15353116522490368,0.031773210258837906,0.14160811321993316,0.19833279144154844,0.04816921168716411,0.11384150945597056,0.10022685387774044,0.10709670595411094,0.17314139325456623,0.08074377787446947,0.10591592204840894,0.0043341892091219416,0.18170224622756723,0.005904090364085457,0.13157526780281303,0.13180194631499761,0.13956922707562566,0.176877030681393,0.12843887813184676,0.18983430399365964,0.11095750922644028,0.022327402678172882,0.0021358777818682563,0.18178279644449624,0.036856282843052,0.16460536020144537,0.1778957872485255,0.10195563855309647,0.04868634077556884,0.08962628348938756,0.10429209417651722,0.09465076712570034,0.007217927316752482,0.18719956351388684,0.016574075223687812,0.021714639033480945,0.09441446014803218,0.012104645602897125,0.04280165444701059,0.06362982568302954,0.11003721741765277,0.19352111125856197,0.09154019761227752,0.0016132079792670507,0.12220354328036165,0.029322172978663644,0.0819876378220338,0.13436151120617232,0.066903346058559,0.04569477056028051,0.17748068734454714,0.1329838231110539,0.03888434491076227,0.17728345166009338,0.18012128387676796,0.09546211868180335,0.19176450098045691,0.14769580685478792,0.06419777848491295,0.008608282706833848,0.12804416803020505,0.15212462440709085,0.07986231098755106,0.10615311775482712,0.0798416598954157,0.09789868775797733,0.19273234853077092,0.14672399825521887,0.15724789341773826,0.0738746439368478,0.17416441995494814,0.1921201081549232,0.15418500809117905,0.10856974476871413,0.14803681893220075,0.17188347995115097,0.0999729808020744,0.030741474948210935,0.0066578650832324286,0.18396948266075627,0.10270304964770723,0.04242364424459835,0.036838913255868765,0.19998512313242817,0.1860251252126811,0.042182295313882935,0.1447606959422265,0.13486855291114005,0.051258808623678535,0.022610798415793498,0.18481704787010267,0.15341412707264457,0.17583070430537992,0.05638698011264731,0.1284401692394674,0.088459826173739,0.17846686745898094,0.042257985652729646,0.18753676729722715,0.19688123391245924,0.006240419379597295,0.14095908298907855,0.11121359778027991,0.014071572739609552,0.12534801066992415,0.199301371993815,0.11393701143353688,0.10297472820461567,0.09276482874948418,0.0376123857703437,0.05898559074905596,0.17834314674432106,0.1400568663765683,0.19844982233612285,0.1608852622406389,0.005008058412309779,0.03508474372940018,0.09467624868903962,0.054517046039659615,0.05148922124387454,0.12881575816823512,0.036229518067901666,0.03857251137391984,0.09944268254879063,0.19329949382942574,0.19929702876843272,0.1549162172598317,0.0609779708517578,0.056885778775526676,0.06483766681014069,0.07702019831995602,0.1581996273038017,0.19074991083123966,0.11557817128276913,0.14875982377501626,0.07401343318346908,0.007696808272695899,0.05586332681224091,0.01951327981075908,0.03256441054658872,0.0327883536085309,0.06718784636173801,0.19024880909228192,0.1234680326524444,0.04389649634519843,0.17051395292469704,0.06799026037378968,0.1617920581073593,0.09882177572029067,0.07444585552309047,0.12389842820483331,0.15459759869237183,0.08947311404220076,0.10371307437262374,0.17740814595920473,0.14897142810341887,0.027947241399906144,0.018787717133695914,0.12511249854586337,0.1565348053935626,0.04792681072239962,0.08214791786054061,0.17816160339246792,0.05929740471868281,0.09597705928326855,0.08475384643432085,0.17948032398567718,0.1860330489807626,0.05725998884408328,0.13561117269169692,0.0857998417625959,0.08862955887248405,0.15378516776281057,0.04996012678310646,0.011007965679719511,0.18619488097056114,0.010545957385809768,0.19435896934012345,0.12165623101251466,0.1522310158360432,0.1207539376323425,0.10801760460862574,0.017298853362022106,0.021215736514225328,0.08219742261572294,0.11813818158959886,0.12716074825905382,0.10998811587895396,0.19239096263825128,0.05590593374249267,0.07509449386528196,0.10759755957466247,0.024222362867605707,0.18489934076811423,0.06158942492475031,0.19283456405154822,0.1065387995427114,0.13543968054940234,0.13385577623548836,0.17204813861049015,0.07478940812231753,0.08514253528845006,0.09399981995273197,0.11658714999035179,0.06462257895711598,0.14321109765084303,0.18357936926528773,0.12883569039937007,0.18367705831169734,0.19455719495514667,0.11561504607147675,0.03586076251784842,0.04016935730803542,0.14151414899099723,0.18203371091470763,0.1043388421084993,0.10970677555551328,0.05201364060949137,0.17446095030763456,0.1505206384867227,0.09665638134225928,0.005082265221618787,0.15394564684250012,0.10136311219221113,0.08171870175677848,0.1797405115250931,0.11155184228899762,0.18506878567571855,0.13437436935426092,0.1780341219701359,0.007707763690905978,0.12423580370036046,0.07795508104476118,0.15779005503424318,0.1838549442742227,0.08132523076482814,0.016870916418168493,0.19718529328803336,0.09783648733193213,0.18071242069085544,0.18258499465841257,0.15031979319390315,0.178008202857862,0.017833531149113836,0.14233377269604683,0.14101074420177415,0.07774890587539636,0.17675109299941327,0.008270302918859329,0.13119100655717136,0.10551383161935246,0.004654376569327168,0.14716063023015957,0.17821648295776052,0.016465450455495256,0.04284225894842595,0.03160408678139222,0.194355157817515,0.18408378461762523,0.029567327119667964,0.18944642972402767,0.14639392927323977,0.11570220935904829,0.020634200391455384,0.06884976755676235,0.18697995423225536,0.1919597306839465,0.1606486599858437,0.15049677866577268,0.04542214948850729,0.1275297874345871,0.13863129550221825,0.04251592810825762,0.0840982578957899,0.014800310368811643,0.11641270696516504,0.14268503446580236,0.10347552134227499,0.0784210544575485,0.14273939761321316,0.11030032938133645,0.15900670001383507,0.16928913695593417,0.11281047838212009,0.024090907845136435,0.032074973655747206,0.06717219755649788,0.09515095641945606,0.07854097957137657,0.10501891789627821,0.04190397333038525,0.027938602798328604,0.08851666975894311,0.17208256087709517,0.1611662418953745,0.006937137031942431,0.16713014193705447,0.09934927330718951,0.03445433195087593,0.10569246397954908,0.1521320753682391,0.14383440393082267,0.03721640066877803,0.1618812018559378,0.00683382446948051,0.12596932041952935,0.030147899534308922,0.05651860150363408,0.06303444499771423,0.008874323916483818,0.023941913456282073,0.16390634080997832,0.19469484649048818,0.12938681430444038,0.09491459368063532,0.19210678093806144,0.15153069256171103,0.09239634469820467,0.09518479916545891,0.0839203858726449,0.18925688867905863,0.07822943673250315,0.18456769158984626,0.1076602637299648,0.023579270785966156,0.08958721724502992,0.15563190551413542,0.07782723254379893,0.1493176133964636,0.01829120771405899,0.1501977545661789,0.05348209765325551,0.15932033191634265,0.08651354988985567,0.014277732260701548,0.15564734553528484,0.16962630901551595,0.1593956181760898,0.0579142723881319,0.17531493647898957,0.09946438374775149,0.13020495692305092,0.16043816306300604,0.18533787579029407,0.13905472404296956,0.155159093785711,0.036546621159093906,0.16945557387435053,0.005001852309453315,0.11886785619118445,0.020865274218824805,0.05669140925037533,0.043208347611463666,0.15454011572514492,0.1796981219143191,0.11432598824575663,0.04437651296734218,0.02589599240267937,0.12788936604530324,0.011336730215853309,0.18733836264887277,0.0958807727155834,0.17723274876038803,0.08109598459026666,0.15687768672769686,0.16862377922382488,0.12767826388768774,0.004083486741526788,0.0944381748149926,0.17321995013214414,0.15540504265161093,0.15693312708497228,0.03437556688921273,0.02955209611881733,0.0632240057651671,0.06762086234833568,0.18951754770566157,0.11759311394092338,0.1384481877662474,0.15696671803433443,0.19306214697438293,0.18928121969145006,0.16638615706082574,0.09514513721406798,0.10489526166789283,0.018908416901775117,0.06512789686673118,0.1444685058394419,0.005916590640577058,0.03879925971399985,0.06715002314872338,0.14664649775561098,0.19172350036486085,0.0769127290318747,0.09765057323223432,0.17865633609531373,0.14454271031221164,0.07045123644964227,0.17616773030253477,0.06592391747931985,0.10721249845714845,0.061916061372482026,0.17069041064068158,0.14251479897321848,0.12568538207216484,0.012030538737843478,0.1015793382955351,0.10565352752016587,0.0949097940031654,0.11713682129512258,0.17969748704414373,0.12762513048259305,0.018445048978912526,0.19717234828929375,0.17830087136088563,0.014142249941690645,0.16908111041620857,0.052525175509065526,0.04760475781142209,0.12023703338698932,0.19305611643973838,0.09569042998655322,0.012608396760103169,0.14762650616347514,0.032802202239328664,0.04401035427058018,0.1987162000485137,0.144687623990218,0.19810832122410332,0.18805539287238715,0.0646877210710589,0.11725903719178264,0.16342702778109197]}
},{}],154:[function(require,module,exports){
module.exports={"expected":[-26.296812976118797,-16.441568664717956,-9.77826096463471,-6.624727362552461,-0.7306814653766993,-3.299170428458011,-1.227698245067349,-58.895855381934545,-2.3355946765096576,-1.5832707464029097,-9.886348369674085,-30.235449567419153,-3.2399869326517248,-2.191013068183283,-18.664382128427768,-5.72643237907311,-10.063712450084186,-79.5785552856854,-10.063064892517124,-1.6563391970379735,-3.207776114688026,-5.363756047834912,-16.05880787778338,-4.209543447822598,-2.6764470600632873,-2.1602654094896,-9.748531585617615,-18.281219280202084,-5.709344732827428,-5.189742954342628,-2.0222888305880957,-7.3904085088071,-21.431195113364122,-10.173984453669318,-28.16727010338998,-2.7071650536219884,-4.414042066841924,-9.783180829701063,-7.722894896056394,-2.160004988634163,-2.7959572113509408,-27.672509400237185,-2.9030767204577774,-4.014832866341518,-2.529389083875935,-13.302844893464366,-19.647254170425434,-12.466212289089198,-12.233020530861097,-1.5117455746614497,-5.738584078492215,-28.109170035632214,-3.6764141031886473,-11.125603188579403,-0.06562621075216209,-39.12752815515264,-6.66088612441603,-7.045897199891851,-5.459460457437796,-7.807745415412379,-2.649227372759558,-7.432442918973009,-10.53642445491807,-20.175888683286598,-15.162927188536518,-41.38684435097991,-8.892458212043351,-22.59946730388061,-1.5936442202684586,-4.765745805239596,-8.181123927676223,-22.795325143497852,-2.4549984866096204,-4.779130834275122,-0.1056604550001027,-16.946474169260362,-5.298953055817687,-5.045215710673467,-2.829711073765374,-10.42848947513273,-1.9879166164121043,-12.02047756219028,-5.850022637126573,-18.859993132967258,-3.6462282970182693,-15.449631128230267,-6.0213943484472745,-11.79435303974676,-4.225751900459547,-7.532407162567261,-3.563917289642802,-27.666318734238097,-1.0414580178218575,-1.6382882997619226,-5.342141387893347,-4.22967959674045,-6.445533298017606,-5.4252639358331365,-10.016249420500348,-4.143045998655415,-1.064284135182414,-0.3026064270907514,-1.9934705119211251,-14.167122161936422,-1.7517567827682463,-20.647394005844962,-5.587205107942545,-17.645015796461212,-11.24376330162209,-21.50907607975795,-35.337203792666415,-2.651603940768294,-12.211603007367476,-16.238384500406276,-38.98503553996437,-22.256478495441236,-2.9643563516157476,-6.9028423117446795,-24.189581217298546,-20.253661931408953,-11.31755294976526,-16.860924601365188,-16.593486073772027,-5.46240901908057,-9.046960632459587,-5.715161977613733,-10.628854912741101,-1.3027880910553304,-2.623501692501133,-9.783075120136605,-3.175743597960561,-19.55744572076737,-7.589601154205864,-1.7691676152188713,-4.730410928173807,-21.406667053091528,-4.354003740626419,-27.424354854842132,-11.413312247912888,-2.3244668784214433,-6.1418121663952165,-40.57129229090702,-2.2430118073000327,-4.230028229150126,-1.8354076217700992,-9.492893625787527,-2.1446596342969206,-1.6318245201917385,-2.4581222383027157,-26.896452015014912,-11.209890273578338,-8.137159059549324,-9.02572330344025,-1.4079389003847793,-1.5581785601712625,-6.433195483793297,-15.578107427492789,-32.21214479822266,-7.968375757545733,-2.2746801903045206,-7.412779451437494,-17.596306135665586,-1.594972990406987,-8.539004755381951,-1.6163194797183897,-4.2508076323933,-6.213991315948114,-8.4318622849471,-24.75293369364675,-9.668329971336563,-13.989524534161754,-9.92835560132323,-27.356233191576585,-5.0591770467372665,-0.38986587290524727,-14.38503465247709,-2.9406488337012453,-19.40131916116319,-2.653467415516362,-4.815314154575776,-2.4730511253129226,-2.440015127990495,-11.215485233843223,-4.248111181614585,-4.240063054018311,-10.343744733452013,-8.804054731015777,-20.796590099024748,-8.636261629843538,-4.078855309485785,-17.0171949089332,-2.1691490664016184,-1.558449022451517,-2.1277575597665335,-9.5235521023317,-1.0580422834054135,-5.923185284400999,-9.394812643713001,-3.9571743722750616,-3.692873153514753,-10.551407574978935,-9.451523751733266,-8.551660977602618,-8.38445634868658,-4.442759565238587,-36.66281108772527,-1.8293382949734045,-23.170963573961455,-10.70286216825789,-4.932537516224393,-35.327387286503324,-7.025427500265945,-12.87965213097119,-13.110720375173742,-10.846454684382673,-11.900899105937063,-32.75046761428452,-5.844541164720958,-5.598020476379256,-1.4480163493331408,-2.0119475813397556,-1.6639982286937105,-4.802692559449827,-1.839863102060123,-24.768476675163175,-7.731692454341442,-1.0722605894079718,-1.6869510930465652,-23.518987090776907,-5.759870748964438,-6.294963567855324,-1.4601981688126389,-11.922902343875618,-3.360951738956958,-7.6032122562633075,-5.8504547440749635,-2.2192003774861635,-18.547282681491858,-13.025224943415967,-5.291955172681516,-2.273082149698172,-1.5195338808308316,-19.592754038644358,-22.343462267216164,-11.236286390770598,-16.606932265610922,-14.362983954327515,-5.241720234943901,-2.282048333817378,-14.273991886664042,-12.660295651368076,-3.4025203839006855,-3.138116616601274,-1.9735013479796406,-16.654437525906157,-1.8704418237107978,-1.4985475208027752,-2.5713447064627575,-10.527312163120525,-1.6663522569055562,-3.8310197801247474,-13.86038680611621,-12.266730925365325,-1.6299198934040426,-13.58927942334942,-7.955931179949775,-38.63337143358891,-19.00953934603136,-2.9132511146333178,-1.2028889306526198,-7.395300517715089,-3.084497803056707,-31.253750052209185,-6.4481353803373835,-10.46237494645617,-10.931389917230197,-3.3329669135597713,-1.568582259021278,-14.7576444916591,-7.457115400911182,-54.10533806344542,-10.594246772391411,-5.460279334830577,-6.92399307304179,-12.11744408086014,-28.6482522044233,-2.0094649572709726,-12.131458557217373,-10.596111975824794,-5.287813534012715,-2.2020565601036415,-18.71135327080003,-35.11749182052246,-13.687473416274784,-3.4736090334259133,-22.742070273393143,-16.204974795162414,-3.5974740677317545,-44.855145523498486,-16.19230178038472,-26.31023661540358,-37.16556966643582,-16.700097330980377,-5.399024945923717,-0.2759783026811074,-4.079853727575298,-17.391172531539407,-16.727903256308444,-0.8305531817448505,-6.828305392611082,-22.4988739844304,-13.36885158464175,-24.668443562446317,-26.62054534771704,-4.9828846374007645,-11.669024583640915,-30.96414483314631,-7.113710923861046,-9.445873156531295,-4.932504286791459,-3.008990900705683,-3.3722035937513386,-3.3719193766596325,-23.538724466673802,-32.344139497816656,-1.5920331026187102,-16.806663544216885,-3.6800641624493227,-9.123708591509917,-1.7958178087252719,-11.883650560648809,-20.980328009259498,-0.04659404023013902,-2.9061791666185757,-10.78441736761387,-7.053927383988472,-13.732508901225494,-1.7172895999191766,-5.237970363737573,-22.956000748203497,-1.1220166944533834,-4.847905329308482,-7.720911418419674,-21.169431672575964,-18.95123852699866,-9.776975536119679,-1.4594254561145994,-23.583376739067386,-9.316621713377002,-7.392678407422472,-16.16816355417053,-15.115363236719112,-17.95833794832691,-1.681686808843747,-19.058159634401072,-41.7547679631919,-5.5569455402121,-15.385356660724597,-30.3454074193107,-25.634546283516244,-3.2154072766382003,-10.154435284877124,-23.417193846980734,-31.942093591715544,-1.9862675731568702,-22.59008667437486,-26.12615620311571,-1.9426590294199402,-6.114122287327461,-1.6186096107291814,-5.670437661525232,-0.24601340984695033,-10.109029355409687,-14.75961300592751,-18.875853708550558,-8.800131413307627,-14.857120580135511,-6.206533624697804,-19.00611242440047,-4.018044717509255,-4.27129246594394,-1.1095938840275121,-7.546899521183245,-7.126062173160726,-17.76422083776224,-9.392340210036885,-5.170779007061721,-3.87811728936317,-14.14936593051853,-38.24965026322908,-5.319819228984998,-12.880769141112468,-14.495645883610969,-6.022914908933483,-2.7867968352116774,-2.398000045655682,-6.219222691588376,-19.955659152910364,-9.354624174037774,-5.087010677160982,-4.727828510985774,-9.181165655307359,-20.637551544947335,-9.855511178290097,-7.100557619942131,-8.6648138404173,-3.79271455509668,-1.203155573573913,-2.18163447039848,-26.564373189954306,-2.5241277868838683,-10.336876160753219,-22.71788559266927,-1.9761228136458893,-2.6142348170281817,-8.881488130195706,-1.8845637974495038,-10.456993275078547,-1.9328866944177836,-17.141590636761457,-2.268469756079426,-8.261582274580315,-7.155134828333627,-1.3429167402970317,-3.8933144331361285,-6.821784660092697,-10.853677642694063,-21.251109318238644,-25.752903223397908,-18.884508132379082,-10.20202002538364,-1.1647551271107282,-2.094527531341312,-16.486684398521348,-9.796426596790123,-11.619571909033713,-12.343260279069955,-3.643010902081604,-45.17833736032431,-18.281426330620416,-6.480118394648171,-1.6217724962377815,-8.403915297993406,-3.0686366329301116,-5.03758208629132,-8.1209343056686,-10.009515966151854,-10.881885584074084,-9.988599947955361,-22.95532612394226,-29.30165380465137,-17.34378619183667,-0.7317504031891725,-14.50730541252569,-17.54822710758732,-1.943744109861559,-1.8269371901180074,-1.519782269257407,-10.825417871621292,-20.77594334952403,-31.619652794270998,-1.8525141853864264,-30.676404259256195,-4.890097606586578,-6.747269184229148,-5.048155216657006,-2.592411228823095,-8.574715457018634,-2.1744999407486416,-5.714145517380922,-34.84669415638125,-5.617776564113257,-7.581720171020116,-1.8234626062871149,-1.4417126461759457,-1.6299978413809353,-42.12124939293115,-4.6118984129766325,-3.930944816644298,-5.686450232218034,-8.160142317348548,-13.782627660541836,-1.4918301987875255,-2.743380865912267,-13.491293053007222,-4.010419909587565,-2.3484432291236317,-2.5953877395442975,-31.743757255996112,-0.2874179106360774,-7.218719793728686,-5.329668053195231,-3.2863893089524514,-18.2100843122245,-5.829926212722299,-18.697650738717186,-9.959401399345225,-18.18974294308932,-9.08816513048784,-2.550300897120712,-15.370121096206626,-1.8702656154202277,-12.454099484776497,-8.845173586338841,-2.475047406102398,-15.455117665617262,-2.440956006702152,-1.048336787388836,-22.334104660251082,-20.169049236079,-0.3287278178271234,-3.9749228185384236,-10.231950154121256,-18.221888861130907,-23.473707014508793,-1.535851313437063,-10.407144003639365,-30.185721210174854,-5.980958368882537,-19.853766868891046,-8.08090518352487,-1.449430473565579,-8.524244294595146,-4.626556319380185,-0.6346800738718905,-26.28442961934885,-1.755646560091735,-2.822869604101067,-9.736646364973161,-27.68123931385457,-2.649342194561229,-15.839978589410315,-1.0489890768013022,-1.072621512070796,-18.31891988367563,-9.164073671599745,-44.39156858675596,-1.7615733837020247,-3.2198667408494357,-13.725454565127603,-22.267527098474115,-6.4831273126832025,-8.667265282375618,-1.5359400959526592,-2.1647966285929305,-8.884551714254586,-1.2307861717251605,-1.3166015092288479,-6.92402989128725,-10.226330486376003,-1.9332601727458487,-1.0677539076266709,-24.53529581051497,-42.94509298171888,-14.57373515556902,-18.69216704039675,-3.263128645414144,-35.0053840138516,-10.04084995163972,-6.919543181376521,-0.6247292724431494,-1.8191380293259736,-25.124904203108617,-9.98117243765897,-6.684334771857619,-1.1337401344288143,-13.322368453220168,-1.4875725194719132,-9.03909184046783,-1.8341278509018584,-7.022400129404234,-4.4000460405506585,-35.50433103876267,-8.952791497457305,-2.060174027212042,-3.200053048050489,-41.49144198018879,-6.026869367429781,-2.101146619153605,-1.693773266500433,-42.87360826020745,-2.5387967966418215,-8.96276817301549,-3.1885107211809944,-2.630011463674382,-3.717501931604435,-37.120376587834215,-15.89029736849489,-33.5096395410855,-2.7810109632117035,-45.485083377575236,-22.331123588628547,-5.095884342141989,-4.290616073787567,-41.15133898731023,-2.510771360252513,-1.364227868553075,-7.469788581754552,-2.8460972306620995,-6.777401772553402,-13.882262531333042,-17.494980011171375,-9.774506112528032,-2.653993818667887,-4.794060514566338,-1.9983774593801873,-3.4440276301257566,-3.7519542235129695,-2.6856105010720417,-4.785178989588902,-13.148127599091971,-32.18599983606061,-1.4231328191409782,-24.79235967766903,-8.422745370386853,-1.5868964699003882,-17.173042060572563,-6.604219365925793,-1.6407062294250752,-9.79851434708189,-18.529462811687537,-2.1399875385531484,-1.36897310847217,-1.152331009268091,-24.69417539098464,-4.983162058377331,-1.031388623469636,-56.16531300616535,-13.560894433323805,-20.63222566200616,-2.322050018012416,-27.77226950247211,-21.312150221310663,-8.448229393042606,-5.379171607405396,-15.952506376771023,-7.5971025942712815,-3.3460667290323407,-5.712138283605979,-15.488313898713725,-11.166427092400612,-6.163432372747613,-18.49767744753673,-3.7157603143320603,-20.63768493326423,-15.94038851393305,-9.62856868109964,-19.079724756541886,-14.355049511845253,-12.63927989330858,-23.89076082392512,-6.140060196937693,-1.2864252711534716,-16.096447832451844,-5.9113207051828045,-22.110817714699255,-1.7571614195963494,-9.257105726053528,-3.116971645373127,-3.5661565875952657,-8.84037053950412,-2.0965026971756293,-5.681974819168807,-17.529358908502743,-1.9715051342915109,-46.41080089294221,-1.3881684827681575,-5.216817148923581,-4.848826169175785,-41.48824645844055,-6.19334024952207,-36.77605460181189,-2.1589886179811066,-18.519849520085497,-16.483902211333408,-1.0510608106638872,-39.15918701045135,-13.073711868564013,-1.0840239279324149,-1.5579412033595992,-5.311496282383473,-5.918234758053584,-22.466662136675367,-7.214854067094473,-32.47368908506525,-10.104602075138708,-20.079286253086245,-3.5158978391794045,-36.043115819582844,-12.654097797506234,-29.313104315932275,-1.807190308558037,-2.853992451912445,-11.75592418508828,-11.379879768714268,-12.202558086373815,-5.985747430207814,-24.12922631124674,-22.67927458945533,-4.598802172600804,-3.691251125603442,-5.665080872226905,-1.6342693326667062,-14.478595360097673,-8.423231315854208,-2.006056766234067,-16.053794003859394,-35.82371598173592,-14.209670740359579,-3.0700275972007582,-1.7836470137593126,-1.3030359851213407,-17.805396504822323,-26.827418863498426,-26.11340654264031,-6.2373692973211154,-6.115720824672655,-9.345945220865385,-1.6725431188985986,-20.21450376143688,-14.496774678918213,-4.172698706369089,-3.72094101996558,-3.9176198461422045,-5.741231135635461,-8.627631481337286,-4.315375349473503,-3.498976363951852,-14.47931082680132,-4.558070037166087,-16.664414797227384,-14.327656177735879,-5.238837032779591,-10.850093729969853,-6.1724452709556745,-6.462890346670177,-7.610609925177207,-8.823626961350756,-7.744802316230563,-10.725806459356143,-2.971717600724577,-21.689860112178035,-5.495390425412537,-2.3299549971982327,-7.289897735110993,-27.313186743502502,-7.294562209742834,-24.073943462376167,-0.7035994164240236,-11.75029441325779,-2.2038180380301475,-22.422108068482874,-20.54575429559365,-27.985086017464802,-9.154960121978476,-6.035104007511178,-5.7475465319042724,-6.722140668586285,-9.593385746147655,-3.4102467367501625,-17.253436135720452,-8.211581743388628,-2.705769521231205,-14.039519492925102,-3.702711384056295,-26.425782483661102,-13.929669819413784,-44.51535073288226,-13.097903094348684,-2.307433259513524,-3.9354322860291506,-9.94965263851088,-0.46209324616531894,-3.370008795691163,-12.274250132284093,-1.0753671401266454,-8.64440452858631,-27.37789561658442,-11.52889942517663,-12.730867614112832,-1.3962641931422999,-2.21571046083161,-0.18641107210013372,-11.463948785372658,-18.250588609885916,-4.804262430773848,-1.5128410314026879,-1.911711130981015,-3.0722998332281852,-5.228171289379206,-9.470105949507087,-8.48350937639176,-18.19038734827315,-9.942092511748221,-6.14757551612375,-6.855420454798166,-1.0446547600091067,-1.1619587651656322,-2.539500092135269,-28.33664786680316,-6.58596542272843,-20.287672504426645,-14.729237967729633,-15.834108653408403,-4.593720620126509,-3.463286248166866,-2.073553803331643,-4.489729369556465,-1.2390799146518394,-19.87114439562297,-9.11598101748358,-17.984017531619514,-4.331674675325699,-3.7549870060078065,-2.3587040271850457,-35.24115633609663,-4.780181703097641,-9.139154437948799,-8.043222520221615,-1.4782827782312713,-11.946746587535733,-6.599242646511823,-3.2602381353843626,-15.074912050670955,-12.071615648082789,-11.33492218802801,-30.275797645621008,-16.80165786467866,-22.23283089757485,-1.5437817155254605,-1.6419993195388098,-2.8982726780677344,-1.5000689670971037,-24.08301737365562,-2.1687666653586084,-11.449785660397716,-15.022161049711357,-3.81778939168305,-2.8535256878920086,-6.558871687778858,-13.657003131510955,-12.22326867944073,-7.5979098939748315,-13.199985101091865,-17.35462746828677,-1.214248067985139,-11.460634638646747,-13.158870510569093,-4.51946148687007,-31.727842879502273,-4.440678003792363,-3.4649757296898196,-19.13980378792026,-5.826724353599227,-5.702493790202242,-13.279926478934609,-4.812998118992201,-7.45504884513965,-2.6172169035768396,-10.29373185531699,-6.711474600135556,-11.334354641962147,-11.018932109071399,-20.33191503739239,-3.883218982573421,-23.46501234962163,-14.16839421736468,-8.03565574744664,-2.2956752258378197,-14.264043642747515,-21.890658958766828,-14.524370237751967,-1.8748753045023836,-2.4349313445329543,-1.9349724824935601,-1.6111367540749102,-1.3629400664317612,-23.034939472050407,-4.944394405321693,-19.15293083079347,-15.411985374659281,-12.792130698361625,-2.2104736201076065,-9.67517422702964,-8.923601360870917,-5.143050710770252,-66.89986680464477,-12.394049792915709,-16.990112985531606,-10.857623319791939,-12.802316603874335,-10.533555517440506,-27.018328902825683,-3.6237151606183406,-8.74730584576235,-1.8322197628111276,-1.5982989958658893,-4.059850268304332,-3.03361367188771,-9.311330043873701,-2.2188136817796402,-1.399802726276767,-7.784074362125045,-1.6976581254904324,-12.007214530666582,-16.06549827710674,-7.594558701603472,-5.5776624042291285,-19.379067038092604,-3.413368626706399,-9.738004260020249,-5.684731612253494,-1.775005157672142,-2.328092853212372,-5.416464080253952,-7.8305626056749125,-1.1185723972337038,-11.604710679926846,-1.5304891184783964,-16.45816656781453,-2.1905643083336543,-11.670997284767354,-10.731394128343872,-0.8513846346142533,-4.780473355152124,-17.19463069697435,-1.7790415429154751,-4.634453568073724,-5.843137754979949,-5.991889555175613,-3.966893100293898,-1.3912847013291214,-3.7785678313088944,-9.285511007106999,-51.431204255787236,-9.456470533096214,-3.857952676495983,-1.614672866667437,-3.9867605629359746,-19.639404640124575,-1.4456045686983896,-27.779091603884318,-1.1713673237639632,-15.842556570769828,-13.464383055611755,-21.09601997479795,-1.960079582142776,-59.921496782854796,-1.2310404052344572,-1.4454346568150527,-1.6346972148574468,-11.689558476090392,-5.291998415775302,-1.8955866625903386,-3.362684914697424,-13.115648498629449,-1.945029489417539,-10.378485627523796,-4.348038620971474,-4.489358553576495,-25.763818154167218,-3.235589675464727,-5.523591289165177,-4.058185653725494,-8.673647111271556,-18.181888748916688,-8.214075869856863,-4.794738882992523,-3.697710205461725,-5.031599168438649,-1.5794264006148468,-17.30808180033717,-32.412925367050015,-1.2119641957659393,-23.325254476592356,-31.053271750296016,-1.3076086862484289,-4.899045628644845,-5.50289924488029,-0.41000942529281453,-36.51037151995483,-0.6973234353339098,-4.948811851135503,-5.528026925024752,-2.6433653869756646,-5.785676876474217,-7.1942547905769105,-10.601702912978075,-62.30111338756408,-3.3548378313088794,-14.063959821658905,-5.487645336977387,-6.598595388869641,-8.675706828347806,-5.088681541541904,-3.6362520295897487,-11.062325870693632,-20.207159677551797,-2.9861348512083388,-16.25424555314239],"x":[10.0,4.0,7.0,13.0,0.0,2.0,1.0,14.0,1.0,2.0,12.0,14.0,4.0,0.0,14.0,8.0,6.0,13.0,12.0,2.0,5.0,9.0,11.0,8.0,2.0,1.0,6.0,11.0,8.0,5.0,5.0,7.0,14.0,9.0,6.0,3.0,9.0,5.0,12.0,2.0,2.0,4.0,5.0,7.0,9.0,9.0,10.0,11.0,10.0,2.0,14.0,8.0,9.0,6.0,0.0,14.0,12.0,4.0,8.0,8.0,2.0,6.0,5.0,12.0,13.0,13.0,11.0,5.0,2.0,6.0,13.0,12.0,3.0,8.0,0.0,8.0,9.0,13.0,1.0,6.0,2.0,5.0,8.0,9.0,5.0,7.0,10.0,11.0,10.0,2.0,3.0,15.0,1.0,2.0,10.0,8.0,7.0,8.0,9.0,6.0,1.0,0.0,4.0,15.0,2.0,12.0,7.0,14.0,13.0,13.0,14.0,2.0,11.0,15.0,13.0,14.0,1.0,14.0,12.0,14.0,10.0,7.0,10.0,12.0,3.0,13.0,15.0,1.0,4.0,5.0,6.0,12.0,13.0,2.0,7.0,14.0,3.0,13.0,10.0,2.0,13.0,11.0,3.0,6.0,2.0,9.0,5.0,3.0,5.0,13.0,8.0,15.0,6.0,2.0,2.0,12.0,6.0,15.0,4.0,2.0,9.0,14.0,3.0,5.0,3.0,9.0,3.0,11.0,14.0,7.0,12.0,8.0,15.0,5.0,0.0,7.0,4.0,8.0,4.0,6.0,8.0,1.0,3.0,0.0,2.0,9.0,14.0,10.0,13.0,8.0,11.0,6.0,2.0,2.0,5.0,1.0,4.0,14.0,2.0,5.0,9.0,5.0,7.0,13.0,11.0,8.0,2.0,8.0,8.0,5.0,12.0,15.0,14.0,9.0,15.0,9.0,15.0,5.0,8.0,2.0,2.0,1.0,3.0,3.0,10.0,10.0,1.0,3.0,10.0,8.0,3.0,1.0,9.0,2.0,4.0,6.0,3.0,7.0,9.0,6.0,0.0,1.0,11.0,12.0,8.0,11.0,14.0,4.0,4.0,9.0,4.0,5.0,3.0,6.0,14.0,5.0,1.0,4.0,15.0,2.0,2.0,8.0,11.0,1.0,12.0,4.0,12.0,14.0,4.0,1.0,8.0,6.0,10.0,6.0,3.0,14.0,1.0,1.0,13.0,14.0,15.0,8.0,9.0,6.0,4.0,6.0,2.0,10.0,13.0,7.0,7.0,14.0,10.0,6.0,8.0,14.0,14.0,5.0,11.0,11.0,9.0,13.0,13.0,5.0,0.0,8.0,7.0,12.0,0.0,7.0,10.0,8.0,8.0,12.0,6.0,9.0,14.0,10.0,11.0,8.0,4.0,3.0,7.0,13.0,11.0,3.0,10.0,6.0,10.0,4.0,7.0,4.0,0.0,2.0,8.0,9.0,12.0,3.0,2.0,11.0,1.0,4.0,6.0,14.0,13.0,13.0,2.0,14.0,6.0,6.0,5.0,5.0,13.0,1.0,10.0,14.0,13.0,15.0,13.0,11.0,8.0,12.0,13.0,6.0,5.0,6.0,15.0,1.0,11.0,0.0,9.0,0.0,7.0,5.0,7.0,6.0,9.0,9.0,9.0,2.0,7.0,1.0,6.0,11.0,9.0,11.0,3.0,2.0,15.0,15.0,8.0,7.0,12.0,9.0,6.0,4.0,8.0,14.0,11.0,4.0,10.0,12.0,9.0,9.0,5.0,12.0,8.0,1.0,3.0,10.0,7.0,6.0,10.0,4.0,3.0,9.0,5.0,8.0,3.0,9.0,2.0,9.0,7.0,1.0,7.0,6.0,13.0,8.0,14.0,14.0,9.0,1.0,5.0,14.0,13.0,8.0,6.0,0.0,11.0,10.0,11.0,1.0,4.0,5.0,2.0,9.0,13.0,8.0,8.0,8.0,12.0,13.0,0.0,8.0,9.0,5.0,0.0,0.0,9.0,13.0,9.0,1.0,14.0,3.0,3.0,5.0,0.0,7.0,2.0,7.0,13.0,0.0,14.0,3.0,2.0,3.0,11.0,7.0,6.0,7.0,13.0,12.0,2.0,5.0,11.0,5.0,6.0,1.0,13.0,0.0,4.0,4.0,3.0,9.0,10.0,12.0,10.0,11.0,15.0,0.0,8.0,5.0,13.0,10.0,2.0,12.0,1.0,1.0,9.0,9.0,0.0,8.0,8.0,9.0,11.0,2.0,8.0,8.0,5.0,13.0,6.0,2.0,14.0,4.0,0.0,10.0,4.0,3.0,4.0,12.0,1.0,15.0,1.0,1.0,8.0,5.0,14.0,4.0,3.0,11.0,15.0,11.0,12.0,2.0,3.0,14.0,1.0,1.0,5.0,12.0,2.0,1.0,8.0,8.0,6.0,11.0,6.0,13.0,6.0,11.0,0.0,2.0,11.0,4.0,11.0,0.0,10.0,0.0,11.0,3.0,11.0,10.0,13.0,8.0,6.0,9.0,11.0,5.0,4.0,1.0,14.0,4.0,8.0,2.0,5.0,4.0,15.0,12.0,14.0,9.0,9.0,7.0,9.0,4.0,12.0,7.0,2.0,5.0,7.0,5.0,8.0,7.0,13.0,2.0,6.0,6.0,3.0,6.0,5.0,8.0,12.0,9.0,2.0,14.0,4.0,3.0,10.0,9.0,2.0,7.0,6.0,4.0,2.0,0.0,14.0,0.0,1.0,14.0,7.0,12.0,1.0,8.0,12.0,8.0,4.0,11.0,6.0,7.0,7.0,9.0,8.0,7.0,11.0,7.0,11.0,12.0,14.0,13.0,9.0,6.0,12.0,9.0,1.0,12.0,9.0,11.0,3.0,10.0,2.0,3.0,7.0,3.0,3.0,10.0,6.0,12.0,2.0,6.0,8.0,12.0,10.0,12.0,3.0,11.0,12.0,1.0,11.0,14.0,0.0,2.0,5.0,6.0,11.0,8.0,13.0,9.0,14.0,8.0,10.0,14.0,14.0,2.0,3.0,12.0,12.0,9.0,11.0,7.0,13.0,8.0,4.0,10.0,2.0,13.0,11.0,5.0,12.0,12.0,12.0,1.0,2.0,1.0,13.0,7.0,9.0,5.0,4.0,14.0,0.0,14.0,9.0,6.0,4.0,6.0,9.0,9.0,9.0,1.0,6.0,6.0,11.0,13.0,13.0,10.0,8.0,11.0,3.0,11.0,6.0,4.0,9.0,14.0,9.0,4.0,6.0,10.0,9.0,13.0,0.0,12.0,2.0,13.0,9.0,14.0,9.0,13.0,3.0,7.0,15.0,2.0,9.0,5.0,9.0,9.0,6.0,8.0,5.0,11.0,10.0,2.0,6.0,7.0,0.0,2.0,15.0,1.0,11.0,9.0,13.0,8.0,1.0,1.0,0.0,8.0,14.0,12.0,2.0,1.0,2.0,5.0,7.0,13.0,7.0,13.0,8.0,13.0,1.0,1.0,6.0,11.0,10.0,12.0,10.0,10.0,4.0,5.0,3.0,8.0,1.0,8.0,7.0,10.0,4.0,8.0,2.0,13.0,4.0,10.0,11.0,1.0,8.0,9.0,2.0,14.0,6.0,12.0,10.0,14.0,15.0,2.0,3.0,7.0,1.0,13.0,6.0,8.0,11.0,7.0,3.0,4.0,15.0,7.0,4.0,5.0,12.0,1.0,12.0,13.0,4.0,12.0,10.0,4.0,14.0,6.0,13.0,9.0,5.0,4.0,1.0,3.0,12.0,12.0,14.0,8.0,7.0,10.0,12.0,6.0,0.0,11.0,12.0,14.0,4.0,1.0,2.0,3.0,2.0,7.0,5.0,7.0,12.0,8.0,5.0,10.0,6.0,8.0,8.0,10.0,10.0,14.0,12.0,7.0,13.0,5.0,9.0,4.0,2.0,2.0,8.0,8.0,7.0,2.0,15.0,3.0,11.0,11.0,13.0,14.0,8.0,5.0,9.0,7.0,3.0,3.0,3.0,15.0,1.0,12.0,1.0,14.0,7.0,9.0,6.0,0.0,13.0,10.0,2.0,10.0,4.0,10.0,5.0,1.0,2.0,8.0,14.0,3.0,2.0,1.0,6.0,10.0,2.0,12.0,1.0,12.0,9.0,8.0,0.0,11.0,1.0,2.0,2.0,14.0,11.0,3.0,5.0,15.0,4.0,13.0,5.0,10.0,15.0,6.0,6.0,5.0,6.0,13.0,10.0,12.0,9.0,4.0,3.0,12.0,13.0,1.0,15.0,14.0,1.0,5.0,9.0,0.0,9.0,0.0,9.0,5.0,6.0,8.0,7.0,10.0,14.0,8.0,13.0,4.0,15.0,5.0,8.0,5.0,11.0,11.0,8.0,9.0],"r":[19.0,19.0,6.0,17.0,10.0,7.0,6.0,7.0,5.0,11.0,9.0,11.0,9.0,8.0,20.0,15.0,15.0,11.0,15.0,5.0,6.0,18.0,1.0,11.0,13.0,15.0,4.0,14.0,17.0,10.0,13.0,8.0,9.0,5.0,7.0,17.0,14.0,7.0,15.0,19.0,20.0,18.0,11.0,15.0,20.0,1.0,3.0,5.0,11.0,5.0,17.0,1.0,18.0,16.0,1.0,1.0,13.0,2.0,14.0,9.0,19.0,3.0,5.0,7.0,4.0,13.0,8.0,19.0,11.0,18.0,19.0,4.0,8.0,8.0,8.0,14.0,17.0,19.0,1.0,20.0,17.0,2.0,10.0,9.0,6.0,3.0,10.0,4.0,20.0,1.0,5.0,7.0,15.0,10.0,20.0,16.0,15.0,9.0,14.0,10.0,17.0,3.0,11.0,16.0,10.0,7.0,12.0,7.0,6.0,20.0,12.0,5.0,9.0,14.0,11.0,1.0,15.0,17.0,1.0,6.0,7.0,13.0,1.0,16.0,2.0,18.0,16.0,7.0,17.0,3.0,10.0,2.0,15.0,14.0,10.0,14.0,3.0,3.0,4.0,3.0,18.0,18.0,15.0,15.0,13.0,4.0,11.0,10.0,10.0,16.0,2.0,17.0,8.0,10.0,6.0,16.0,4.0,16.0,2.0,3.0,7.0,5.0,14.0,18.0,18.0,15.0,1.0,8.0,19.0,16.0,11.0,14.0,2.0,3.0,2.0,1.0,9.0,11.0,11.0,6.0,17.0,19.0,10.0,20.0,2.0,6.0,17.0,7.0,18.0,10.0,19.0,15.0,11.0,5.0,7.0,20.0,5.0,20.0,1.0,9.0,8.0,3.0,16.0,20.0,16.0,19.0,10.0,5.0,7.0,9.0,16.0,19.0,10.0,8.0,11.0,13.0,1.0,3.0,9.0,12.0,14.0,13.0,2.0,18.0,8.0,18.0,16.0,20.0,7.0,12.0,2.0,14.0,11.0,3.0,6.0,5.0,20.0,14.0,6.0,6.0,19.0,4.0,4.0,17.0,5.0,1.0,6.0,2.0,9.0,2.0,1.0,18.0,13.0,19.0,6.0,17.0,16.0,11.0,18.0,13.0,14.0,19.0,12.0,13.0,6.0,6.0,16.0,17.0,16.0,14.0,8.0,15.0,13.0,16.0,4.0,14.0,19.0,12.0,18.0,18.0,1.0,19.0,13.0,10.0,1.0,16.0,6.0,2.0,19.0,12.0,17.0,13.0,5.0,18.0,12.0,1.0,3.0,5.0,4.0,3.0,1.0,15.0,18.0,14.0,20.0,16.0,8.0,5.0,17.0,4.0,17.0,3.0,4.0,12.0,5.0,18.0,4.0,19.0,6.0,11.0,16.0,13.0,19.0,14.0,11.0,15.0,18.0,11.0,17.0,16.0,18.0,8.0,3.0,19.0,19.0,13.0,17.0,15.0,1.0,2.0,7.0,20.0,2.0,5.0,13.0,19.0,6.0,6.0,3.0,12.0,2.0,10.0,6.0,19.0,9.0,11.0,17.0,5.0,16.0,15.0,18.0,6.0,10.0,4.0,20.0,11.0,16.0,4.0,14.0,13.0,8.0,14.0,1.0,1.0,2.0,12.0,2.0,8.0,11.0,2.0,19.0,6.0,10.0,15.0,1.0,7.0,2.0,11.0,11.0,20.0,17.0,3.0,11.0,7.0,10.0,20.0,19.0,15.0,8.0,2.0,20.0,7.0,20.0,15.0,3.0,8.0,16.0,13.0,17.0,4.0,14.0,1.0,1.0,19.0,9.0,12.0,16.0,15.0,17.0,1.0,17.0,6.0,19.0,2.0,17.0,3.0,18.0,5.0,8.0,11.0,4.0,14.0,11.0,7.0,9.0,3.0,11.0,16.0,18.0,8.0,18.0,14.0,6.0,20.0,1.0,18.0,10.0,17.0,2.0,11.0,3.0,19.0,5.0,5.0,8.0,15.0,9.0,8.0,5.0,16.0,6.0,20.0,15.0,4.0,4.0,10.0,13.0,8.0,5.0,5.0,14.0,20.0,13.0,9.0,7.0,14.0,12.0,19.0,7.0,6.0,12.0,12.0,17.0,15.0,15.0,9.0,12.0,17.0,4.0,3.0,2.0,13.0,15.0,7.0,14.0,3.0,16.0,6.0,12.0,12.0,1.0,18.0,13.0,14.0,2.0,3.0,1.0,14.0,1.0,15.0,4.0,14.0,8.0,7.0,13.0,9.0,11.0,6.0,8.0,4.0,5.0,16.0,14.0,2.0,3.0,1.0,15.0,3.0,7.0,5.0,15.0,9.0,19.0,7.0,11.0,19.0,9.0,14.0,8.0,11.0,1.0,13.0,12.0,18.0,9.0,18.0,11.0,9.0,10.0,11.0,8.0,13.0,8.0,13.0,15.0,7.0,11.0,1.0,4.0,13.0,11.0,19.0,7.0,4.0,19.0,6.0,4.0,6.0,10.0,20.0,20.0,14.0,7.0,19.0,18.0,20.0,1.0,6.0,9.0,18.0,9.0,6.0,17.0,18.0,18.0,3.0,8.0,9.0,16.0,18.0,14.0,1.0,11.0,16.0,13.0,16.0,17.0,6.0,12.0,7.0,1.0,2.0,16.0,5.0,9.0,19.0,20.0,7.0,12.0,10.0,17.0,14.0,8.0,5.0,1.0,16.0,11.0,12.0,14.0,17.0,8.0,14.0,16.0,5.0,18.0,19.0,16.0,4.0,17.0,4.0,17.0,4.0,12.0,11.0,2.0,1.0,8.0,14.0,10.0,14.0,5.0,9.0,11.0,13.0,3.0,4.0,10.0,2.0,5.0,1.0,17.0,11.0,5.0,9.0,19.0,1.0,15.0,8.0,3.0,2.0,6.0,18.0,12.0,1.0,20.0,1.0,16.0,11.0,8.0,3.0,19.0,6.0,19.0,10.0,2.0,10.0,13.0,8.0,15.0,11.0,11.0,14.0,8.0,5.0,17.0,14.0,14.0,15.0,8.0,14.0,5.0,17.0,4.0,13.0,16.0,11.0,19.0,4.0,20.0,12.0,5.0,16.0,12.0,12.0,20.0,16.0,2.0,12.0,14.0,16.0,8.0,9.0,2.0,6.0,3.0,3.0,3.0,13.0,20.0,13.0,10.0,17.0,7.0,10.0,17.0,19.0,12.0,20.0,10.0,18.0,1.0,7.0,20.0,16.0,20.0,19.0,6.0,6.0,2.0,3.0,19.0,4.0,12.0,16.0,20.0,12.0,11.0,4.0,8.0,6.0,12.0,5.0,6.0,16.0,18.0,15.0,6.0,7.0,12.0,18.0,4.0,1.0,20.0,14.0,9.0,7.0,9.0,5.0,13.0,2.0,6.0,6.0,8.0,3.0,8.0,7.0,20.0,12.0,13.0,6.0,7.0,15.0,7.0,13.0,20.0,17.0,6.0,13.0,4.0,8.0,13.0,19.0,5.0,20.0,6.0,16.0,14.0,3.0,19.0,1.0,8.0,6.0,19.0,16.0,16.0,10.0,9.0,11.0,12.0,15.0,9.0,1.0,20.0,13.0,19.0,10.0,17.0,10.0,19.0,17.0,12.0,15.0,4.0,16.0,1.0,13.0,8.0,5.0,2.0,10.0,17.0,20.0,12.0,1.0,15.0,4.0,15.0,13.0,4.0,7.0,7.0,4.0,9.0,1.0,8.0,15.0,14.0,6.0,16.0,11.0,14.0,17.0,7.0,10.0,16.0,6.0,7.0,3.0,17.0,9.0,16.0,17.0,19.0,2.0,10.0,4.0,5.0,2.0,18.0,19.0,16.0,13.0,12.0,18.0,3.0,12.0,20.0,14.0,3.0,2.0,8.0,20.0,13.0,9.0,7.0,15.0,2.0,2.0,4.0,7.0,17.0,2.0,1.0,8.0,6.0,16.0,5.0,15.0,14.0,20.0,17.0,10.0,14.0,14.0,4.0,16.0,20.0,17.0,17.0,10.0,5.0,7.0,18.0,14.0,6.0,16.0,10.0,19.0,10.0,5.0,18.0,2.0,11.0,8.0,18.0,1.0,14.0,15.0,1.0,19.0,7.0,13.0,14.0,3.0,16.0,3.0,2.0,16.0,9.0,10.0,13.0,2.0,3.0,8.0,20.0,8.0,14.0,3.0,14.0,20.0,18.0,8.0,17.0,18.0,14.0,11.0,18.0,15.0,5.0,17.0,3.0,13.0,10.0,13.0,10.0,4.0,11.0,20.0,18.0,3.0,17.0,1.0,17.0,4.0,3.0,19.0,2.0,13.0,19.0,8.0,7.0,4.0,11.0,19.0,19.0,11.0,18.0,8.0,2.0,17.0,4.0,4.0,18.0,2.0,14.0,19.0,12.0,5.0,14.0,11.0],"p":[0.9856086449251109,0.9982113769084868,0.8951777491796868,0.7986581464067775,0.9295374831062725,0.9577723175951409,0.7754712569429212,0.9929728494460777,0.9784191026328914,0.7777171352429261,0.8062038147315606,0.957598343254377,0.8714704038498352,0.7604258805365195,0.9327748790510264,0.8697986779906911,0.9648714757568989,0.9992488280966902,0.8641746530659344,0.8075023889570008,0.7564759588042511,0.8578697601156288,0.761925799850579,0.782220099270853,0.9654391599312986,0.8064950024139925,0.898957244253745,0.9466720480975586,0.8817207026522677,0.9055760995808138,0.7713245063269134,0.8729950348752358,0.9068281253429009,0.8271378507583778,0.9970596546535231,0.9427565845578989,0.797137386494416,0.9558674987849574,0.8250982133303686,0.8037928256224482,0.9788944114565322,0.9998874230567156,0.8300639796789444,0.8486444392761279,0.7548236605014831,0.7650388595264359,0.9049868946961883,0.8168810563880413,0.9019708950725278,0.7560329327686548,0.7568679797092194,0.9700986474905133,0.8055856194708615,0.9725971745520612,0.9364808453487634,0.938597030369932,0.7818791035539914,0.8773485007373322,0.8560639609691287,0.8638750282315875,0.7705658566808758,0.8159207443694794,0.9514301477517131,0.9135017890170042,0.7945115858330759,0.9872254773111513,0.7948377588011362,0.9986389046496569,0.7757240260357892,0.9129728789125005,0.8431846493939956,0.9071867846401502,0.8705548510272476,0.7571766471891594,0.9868792801820985,0.9726115072691538,0.8497990119962782,0.7736501630346077,0.9370012511487368,0.9744154921615761,0.7994642343779514,0.9351466451688017,0.8273932128459502,0.9582029959987689,0.787389301356096,0.9320415989615091,0.7746688614328898,0.7809394084535712,0.8174457639677035,0.97658448812901,0.8859711267209918,0.9205446823953225,0.929129540472948,0.7507126150235763,0.8484406713327592,0.8361127254712242,0.9073228882889849,0.8001433313155533,0.9116547372246244,0.8369153450618305,0.9288980336124693,0.9040516285162048,0.8015602135500768,0.8719948079473692,0.9100081853092672,0.9170209020281186,0.8700621593174588,0.8558941429569619,0.7621582469218262,0.9547751047199715,0.9725054100154145,0.9141804929084713,0.8665658896396071,0.880758687340934,0.9827020738239031,0.7926084256454404,0.7518243723791583,0.7864448384932373,0.865168466812068,0.8721256756836666,0.8533264248937511,0.9801232517080326,0.805578967871097,0.7796630196138952,0.9684563749958578,0.7843682410764976,0.828950452562448,0.7810560115800718,0.9048602290783805,0.9191308994075427,0.7882782926876262,0.8369785430527181,0.8028641470790729,0.78979039131994,0.8232207066841999,0.9298657153204704,0.8758554593964971,0.9134180463409405,0.8018205237315279,0.8316228328970117,0.7952862548277015,0.9945608624333591,0.9169313901607177,0.8845934648389464,0.7688841321939457,0.7872754102721385,0.7596276982167514,0.7604124753315618,0.7804802896733749,0.9655129490102755,0.8022613655588413,0.7947496637133178,0.9291822226304909,0.8470721194700119,0.8151445093845187,0.805397110701509,0.9634846124269424,0.9655194873557935,0.9040591246296711,0.8254336136461434,0.7967670463275118,0.8284652853707621,0.8274771838594749,0.973971999482788,0.8338843822499868,0.8012248766889594,0.8678872121403278,0.7838973848850767,0.9564645202652764,0.9493806644552174,0.8857732976284269,0.9285895587886731,0.8631634269838195,0.7683800536522751,0.8228898421174906,0.8693193289120159,0.8556560676908918,0.9759468989258764,0.8624127428567554,0.798003311645602,0.7500393505124701,0.825785392120689,0.9960062788712228,0.8086366811069352,0.925090451273813,0.8480292670746326,0.8237701493772749,0.9471594925106541,0.8445103835661272,0.7608004257982495,0.952189680192618,0.7693547218588761,0.8978776876440122,0.8758957566703668,0.9533429176381518,0.9634510197724044,0.9117351133741466,0.8515377711733854,0.8500341716691522,0.8457158257566673,0.8767836034800841,0.9132534045697284,0.9391349394462535,0.8521542215465003,0.7683094487652031,0.9982731446920632,0.9164172646887441,0.9741533315156437,0.8935755352156054,0.8902099034431886,0.9866370040805625,0.7878016661495393,0.8274537342948949,0.9103238374067052,0.7872590152289796,0.9265491535123151,0.8864290539355015,0.8079186674713322,0.8060150964599321,0.8881857690841697,0.9482218027735991,0.8264849278577142,0.8594229546328929,0.7956301787118152,0.9678801153586469,0.8827567480656012,0.956219157699893,0.8325438806979454,0.9601343776560822,0.8465175404942138,0.9182041663362229,0.9770422645096699,0.9170330558385975,0.9127945985994185,0.9519757904050221,0.8169012142500456,0.7761329209369023,0.9854269083459746,0.8908283633118446,0.817987158367472,0.8872434209235387,0.9254106414620455,0.8975050745922107,0.9608878726578933,0.8773371260757474,0.7738168478429743,0.7976346464163773,0.7981106539073218,0.8045019070907078,0.8349931278901532,0.9573262436054999,0.9054556399100315,0.9403798759320421,0.7501444283610501,0.8311964341444266,0.7713923481784739,0.869745782564792,0.8571956780491645,0.840742172356107,0.9236393055745746,0.9838988538307993,0.9678605248204168,0.8906320323140553,0.8299358115341813,0.8290212134494057,0.9563291094551984,0.9898994575607156,0.9262690417608261,0.9112890501511779,0.88952008012568,0.8426721916033936,0.8419529330651414,0.9882983875905663,0.9332998948522004,0.9885606412894183,0.834936479581299,0.77786036360526,0.8247672413913576,0.9128169160918277,0.806248525503634,0.9728175923358109,0.9493919930253109,0.8211170196406854,0.9109175367955555,0.9510429554919924,0.9986231688267446,0.8845589631352659,0.7524257630843849,0.8770545745699219,0.862278868373936,0.7530712780087665,0.908983846854964,0.9849297424474421,0.9843011404906817,0.7597951494089059,0.7998078467168269,0.7634573138087044,0.7547155927902767,0.990050263328506,0.8379541402980517,0.9459140836576783,0.9839756693876003,0.9264418311102529,0.9324707062312421,0.9862958534931826,0.83092144156787,0.9731179326854698,0.8585782897119357,0.9523181874540367,0.7808617947776121,0.9766769086058428,0.8772788237078943,0.9755077873141998,0.9652451102578821,0.7801398531680441,0.9414272973523188,0.9298276531678786,0.8779036201747383,0.7723160596195406,0.810530042753922,0.9146550978648562,0.9463458080706253,0.8535009435042429,0.9501362794343545,0.9831705252461512,0.8411138343525622,0.9592626078874207,0.8294035867168098,0.8973955840420533,0.8273453117307656,0.967792385640686,0.9987596639824614,0.9845886426204757,0.9793068929754946,0.9507480709998858,0.8597823801460207,0.9139467424992975,0.7855933313822381,0.9241932657788265,0.8990841411322794,0.8333681463346346,0.9629456343864581,0.7834151174113502,0.8693725656667911,0.9232739679453932,0.8667848171308359,0.7654886001341658,0.9005697323996921,0.8697589221054396,0.9298595276896068,0.9721433567730631,0.9891282820523687,0.8662440131147902,0.874302462123108,0.946324926809591,0.9817380852233185,0.7711839294421972,0.7749772673992059,0.9738270404598098,0.9749697922675499,0.8115198361417968,0.7626601395291175,0.9367110538328253,0.9976669866702573,0.7566060743996175,0.9947704735188673,0.9471972612261969,0.9573437961919642,0.8004406498750538,0.8829308168203382,0.7590990506899409,0.9825811075643334,0.7543572830580314,0.9471908958407282,0.9491410896884154,0.946453655861277,0.8457860282712295,0.7779164873677997,0.9644923722381145,0.9154105642261563,0.8822403397802457,0.8224230688258444,0.921188624741178,0.8331657290073228,0.8587008839422301,0.7899695064669294,0.8773551074197823,0.9802404958692995,0.8367712106806691,0.9806825448869436,0.8732433284538871,0.9004505884666258,0.8910899053984185,0.7518901171721482,0.7598244454786591,0.9085858324378716,0.900983965228054,0.9251745858061403,0.8051071928267839,0.788931915061129,0.8326794994835703,0.7591076964186425,0.9817180309565317,0.9144473227087127,0.8556444299828487,0.764290539227167,0.820076711700289,0.8822058373197845,0.9231897145454269,0.959460680445396,0.7552403238230112,0.8152533722084883,0.8957305637818664,0.8767971588190131,0.8928261901826322,0.8847143958156134,0.7728262380278925,0.9373530418009728,0.9087531893785139,0.8483759265864914,0.7763514915900567,0.801054691233578,0.9329886257828905,0.7917626253660415,0.8592084942861451,0.7933161143611414,0.8752199589385743,0.9669911534978778,0.9279118112735976,0.8998311652886,0.8053685226768776,0.895496463967055,0.7510987081144511,0.8421961189278072,0.782089558636033,0.8451317909670533,0.9697714638213322,0.7963725449113674,0.9964330144558977,0.9369343434948703,0.8413796624714036,0.9817346815003762,0.961255923830453,0.9036798100243024,0.91582224179713,0.9062460767331609,0.7994767821384765,0.946733732778394,0.7670489417928559,0.9847642260113041,0.9393149763132256,0.9331778614828812,0.8638552312525949,0.9209366107013243,0.9471255131339866,0.782028278278056,0.8162839381499346,0.8269816410529325,0.8406486322759771,0.9431611670977453,0.9870839393375845,0.8685165879088849,0.966810769334207,0.9192454052105623,0.9588983441686951,0.902117866704547,0.8192088280137328,0.8958893493191658,0.8802595674255589,0.7665691749335235,0.9797863734563651,0.7551122780009726,0.7628283784125797,0.8198159486765734,0.7616375764791439,0.8473920235402935,0.9935675374377169,0.8907018804113263,0.7764373548724115,0.7908579118848673,0.7850667651902379,0.8901471138709478,0.8554767205145539,0.8606342321585334,0.918056040851811,0.8593051058394525,0.7502503632555538,0.7984210067730309,0.9455994329189756,0.9086403022509584,0.8829051107048799,0.9527192002415841,0.951154971010628,0.946442292457984,0.8161359007882949,0.8494170641055319,0.902957306302462,0.9057318559190239,0.7652322216514424,0.8085400421197136,0.8505863231215718,0.7922303105831356,0.8650091646172222,0.8770319439684631,0.7872450195625333,0.7997027221120687,0.9036365135596541,0.9222533672314213,0.91556434880176,0.9755818521321329,0.9211043444071025,0.8084718187993399,0.8962353501362313,0.9465157209522381,0.9658248259237963,0.8716916838197055,0.919664666446639,0.9905439260923459,0.9069741452098656,0.860214606164609,0.88150683724942,0.8563255083555756,0.7938147955446174,0.7584731460332903,0.8093207004240146,0.9272619790929346,0.7816849519054183,0.7624118323341382,0.975967996999771,0.9454672726454134,0.7721714189261882,0.8386066177816673,0.9597927387652285,0.8856573914565466,0.9723207742423514,0.9783887041762365,0.9828383968524288,0.7834854617093029,0.9111723851140998,0.9001172422848944,0.7693893757679604,0.799886333625471,0.8166023469973371,0.9350961853512196,0.8613540579642127,0.831947983483029,0.9568853802804133,0.9548697927104643,0.9377532907562104,0.8350102091066457,0.9058495703032081,0.9442713909533735,0.9841908263198734,0.9989238461173051,0.9842370320703913,0.918042509750464,0.8082627499600362,0.9319354943114584,0.9041294020786197,0.8106978201742415,0.9447890818379622,0.8316305381787781,0.9554785159031096,0.9648579089484701,0.8517004771360706,0.8278223596733713,0.8392208292329604,0.7804155433721156,0.8244903657077719,0.9151284277340459,0.8634560974131968,0.7697736178810005,0.9697982719951069,0.9356820642042285,0.785504924973861,0.8000136128008208,0.9769439882294106,0.8852497330301095,0.781935445009014,0.8671627820408454,0.9808480716605712,0.762255834192452,0.9296159734176677,0.9816561183779233,0.8754028560201329,0.751438044446125,0.9614910396595493,0.8909850975470023,0.9743036143491739,0.7564329341203317,0.998510097140002,0.9585852472577379,0.7861685141752208,0.9458226923667055,0.9904679360994783,0.778500953570042,0.8911871318127365,0.9176444294350767,0.7546952849409043,0.9143252222987406,0.8191982536132134,0.937837870184224,0.8492598741081812,0.914314350083144,0.8484945823913053,0.7809630497415647,0.9652114922507801,0.7660030024381683,0.8281001971965485,0.7916180010789939,0.9089476143113093,0.9934179908386251,0.7907262669712197,0.9004121866998007,0.8740711178253353,0.849694644157992,0.9430440321414492,0.8411906363692719,0.8066436795001561,0.952897110973673,0.9865869968095143,0.8547858551461447,0.8942053728776462,0.7941632757952912,0.9544698181123767,0.7693019857460565,0.9389102423902922,0.988602905585825,0.9739008603500401,0.8880614802010649,0.8156334437539197,0.9834510590449292,0.9447335711145846,0.8931662499792474,0.8058719243570157,0.7595455667137354,0.9072333628869702,0.8114780986901418,0.8542681281112825,0.9552745485168647,0.8761571663430451,0.8551562992670556,0.9378804225623847,0.8182398678969369,0.8937084735337432,0.8307869177462333,0.7711050366171887,0.8055154981426953,0.8960984983127978,0.8756194377862196,0.9658704331365165,0.8188344839851456,0.9128200001781782,0.8930255795205448,0.8753872109532697,0.8642322332978317,0.7782450918788735,0.8284131864334239,0.8992452992351467,0.77196976620579,0.878160930873018,0.9230599667766334,0.9768566580800764,0.8233344013980741,0.7570165355429288,0.9790538975897265,0.9037404585404463,0.8820363196705228,0.7602588045540932,0.9782416829281555,0.8611373892597798,0.9771925037093315,0.9297897884841968,0.9338037161848842,0.7872273971123196,0.9026507683899271,0.9920442778387077,0.8068578881342221,0.9302813033398645,0.7827867712700571,0.9153452387418148,0.9166508822632595,0.9474345517904844,0.7821262565371734,0.9788730872216541,0.9126689542254698,0.922254248059288,0.7985106727629394,0.9897824190776701,0.8579652303743712,0.928686392242934,0.9488058387055663,0.8122503928599232,0.8734731895161132,0.8866358142343526,0.9198750356858121,0.8372293850868469,0.9837817180491357,0.9589443253329556,0.8106311987136369,0.8253572681964365,0.8290898808225803,0.9144967495208128,0.8811699856648096,0.8850666142699767,0.8067820984097813,0.7790800902141691,0.9841689391170472,0.9052690524618192,0.7585512714042892,0.8921677629012075,0.9537814516122203,0.784616099677131,0.9915935938881553,0.9643731796503705,0.8245955831873548,0.8786283287073413,0.7999295524390937,0.9197741244872543,0.9190842971492263,0.9351263886824492,0.8945835670394982,0.8669731720123935,0.8274207810596159,0.860272383232966,0.9163280271140023,0.769292791769403,0.7794621629991854,0.9775175170383703,0.9086012278279876,0.7750277071159355,0.8328584409902762,0.7872856366037619,0.9127453201976479,0.9043214459209574,0.8473360099302949,0.9783981586162411,0.7562944639762501,0.7843627115964045,0.9642483688744328,0.7790312119800338,0.8608684828011878,0.811575994548801,0.8841877867041996,0.9536130402873592,0.981429223090944,0.847125370657794,0.9003722760406891,0.9158067327172306,0.7967024939947368,0.9482584625668746,0.8978593185279871,0.9548011005304669,0.9612806186712118,0.918666579168629,0.765135995132567,0.9580796557932123,0.8433799686922794,0.7753898589177168,0.9839177366420087,0.9160356200821295,0.7975098701426571,0.7699560503960519,0.9467228198307303,0.802383449259239,0.9863237481212278,0.9848611268297379,0.990895232481222,0.9212178989718048,0.76051459307745,0.7516866412898673,0.8979874964064705,0.9438748877618318,0.9132541326900312,0.7733425818527404,0.8885020008100946,0.8880390656950189,0.9872433341384548,0.8530134808995182,0.9107440381208644,0.9489852260855272,0.8023978337325595,0.9737213026860931,0.9391232931293739,0.93051826303567,0.7685160154422398,0.7998502684235522,0.9864159247545302,0.9195091626497104,0.8881733242247671,0.9380121016809196,0.8480813021428355,0.9667232043819531,0.8738173893030055,0.7693335634897024,0.7954940746407644,0.9239573260542924,0.7814747845085575,0.842712141295654,0.923373436825647,0.7598331427989047,0.906430373014779,0.9510281839466487,0.9503048030338397,0.950824936932107,0.8478609515526853,0.8526510584824847,0.793989440541166,0.9611833044601708,0.9823116715092115,0.9126220625373145,0.8313502747967664,0.9563723008000862,0.787626937105245,0.7896074551449206,0.9752919924080524,0.9560910444145216,0.8495695426541965,0.8748725079112478,0.8783664660270848,0.939415681138062,0.865306823120744,0.9280745559924208,0.8942469918258147,0.8629443778333318,0.868071829407177,0.9816907069310841,0.8175882913539765,0.8056739422053987,0.8856173646252342,0.8199501745323599,0.8389786650840882,0.8326968226458525,0.8410594356474018,0.7692960088975374,0.8641880322263593,0.9299419392695527,0.822648702419871,0.8122081602331856,0.9435758099706192,0.78180630642096,0.9069183712482819,0.9656805108198636,0.9275571163353363,0.8973361060406158,0.8943768968265952,0.8762685828899843,0.7991825133433798,0.9496564741629503,0.9761707586873278,0.7713721250474235,0.9320124681433566,0.871664403133189,0.8885076741882608,0.7658264624898818,0.894136560000671,0.8622329174653647,0.9158222843203803,0.7970871409334952,0.9939949611361254,0.8118795680037091,0.891067546948223,0.867418216861154,0.939218243984508,0.7873753530536793,0.9443798476427488,0.8217266793771609,0.7955325484536295,0.8802603944058487,0.9368451463602401,0.9573786920625894,0.8724956523203884,0.7954155797932103,0.8176681842000673,0.7706825055637443,0.7930055107194292,0.9011128239914834,0.9924320995022587,0.7617695071893411,0.9511443270695925,0.8774812700408309,0.9643849090315382,0.7991697292590294,0.8487045371671483,0.920211438646451,0.8555413345971956,0.9998225979741191,0.7592791588542218,0.8912333919349753,0.7500186810363529,0.9058279755372034,0.8257293636342882,0.8735532559852692,0.8273299171694622,0.8134225702559543,0.7610790977399762,0.7919834522529425,0.9867481440653041,0.7598616958626458,0.9415772898700137,0.7558743736824374,0.836366676898698,0.7593981163942164,0.8629124164283629,0.7856023361205718,0.9399283791403221,0.839123230978452,0.7522044123520684,0.9829989261540237,0.845460720721207,0.8173545339270833,0.8111412535567761,0.8042746898000539,0.9158465132456801,0.95265357800261,0.7800620487405341,0.938088192236036,0.9024637976834667,0.9709306891028822,0.8126527470672473,0.7627032059242965,0.7760370650030761,0.9596904486765028,0.899044200586734,0.7563046861740812,0.817183789387868,0.7885938888440229,0.7893427796618515,0.7506996891668606,0.8570133696525174,0.8270237520968773,0.8563659192626497,0.9834138526201772,0.7870559229002945,0.9930098348166696,0.9797422833859777,0.907569405589796,0.8593050833063445,0.8163304909727513,0.9530769001929693,0.8325725815206402,0.9191056294666831,0.7921768121250123,0.8822233691183489,0.957076251558636,0.9754824923936936,0.8693532935991934,0.9970989452191833,0.8854325161186508,0.8807758407254475,0.843098505163471,0.7831164129204422,0.8051567274295435,0.9109419278155204,0.8810592443056869,0.8229817403361905,0.7609018125586617,0.8513295272952932,0.8011374395595643,0.8029818349190279,0.8668831527928665,0.8305354201374366,0.8810771814257564,0.8973026824293279,0.9364461619000264,0.8398541930011192,0.8419509489440643,0.7936327337219544,0.8064704937166196,0.8345848092713897,0.8455781941196628,0.7581076930179955,0.9787712171171394,0.870318677420804,0.8424870976803978,0.9728747552856312,0.7746324351277609,0.9182553772819069,0.8668884649092853,0.9500400112572069,0.9932479179650959,0.8400189239946543,0.7808267225248517,0.949981640503798,0.8490184319690952,0.8370785170570172,0.9303418886797751,0.8535445869298074,0.9903628347050975,0.8097627606996542,0.7746350322915505,0.8817428148351176,0.7700598493653952,0.8696632197536424,0.8461222255234804,0.916212532824545,0.8757064295586743,0.9139097651756974,0.7566157514349641,0.9509524552544155]}
},{}],155:[function(require,module,exports){
module.exports={"expected":[-14.563782788887478,-29.985690136039022,-38.32692543537275,-54.58803514916791,-14.009491911167325,-3.759263166654409,-6.144641416595513,-55.95765136883326,-6.0481105920091744,-13.80666451444475,-7.0650151495059745,-30.62507310321177,-49.30918281251301,-7.3631301720588915,-21.773885475406345,-7.884118448101577,-12.611350307111962,-11.121009434796234,-34.401852124340564,-20.279351981140465,-17.72427409743847,-3.793654615788276,-19.005035814459074,-36.5795211501781,-4.383996797474124,-29.530168944556106,-4.81107443103063,-4.562563353591031,-14.233553220417443,-8.65251727213389,-20.518237809189568,-3.422518401798474,-40.07132347898167,-24.121384250430157,-34.73184988005969,-16.159165880589864,-9.142209286729274,-35.11785046211271,-3.9050665242798397,-9.609226641544552,-15.258091084086123,-74.13247537823553,-20.607185629889866,-8.949198668450709,-4.651285381707579,-5.6648079915121325,-3.3031912026355865,-13.948938557234937,-13.210843884618026,-6.576908584405215,-4.945512968279699,-3.1229930601573965,-5.827496032654456,-15.590897372828243,-15.445598184046236,-37.53849752533486,-12.177563466066657,-57.79323993749502,-14.134543668662271,-14.131151887387158,-4.1548294862123605,-69.78137270205937,-16.358267879803673,-8.673659168635595,-24.526515980266467,-47.27118158357201,-58.08769799684578,-33.46810780085854,-45.813428972948515,-10.43765595822337,-54.767591909501995,-16.729214942220004,-39.294404309322495,-30.77927318996112,-17.31971054905337,-7.808992155945915,-4.562436262775709,-21.10941304094925,-15.01096274199927,-42.10327962317588,-29.676907078502257,-15.697829191804665,-3.492159431079557,-37.3655463846134,-15.591953280689777,-31.250968345922022,-15.775895495039155,-49.28812230044546,-4.155528952629299,-3.6175462796734683,-21.604346422318773,-20.861126961739107,-23.403019442459954,-27.433869085465005,-13.615970346050583,-8.13799094337735,-3.5756919227612514,-3.146349355320589,-49.94974125455079,-9.730565094858306,-20.577529673172304,-9.93081865061071,-8.643480520100784,-6.014435682750709,-23.84323336274309,-41.26329672146087,-14.375588963508243,-16.235851685922764,-4.628711790234238,-4.447831193222279,-2.705102050789196,-12.020735545268526,-4.328712117597388,-15.858752643511309,-4.451259172187658,-19.463038690457285,-1.9586854828338462,-20.518335356244865,-26.757960774078107,-3.371458518849716,-12.770949296559575,-17.344993183588112,-11.99245137540395,-33.00366682697415,-3.845797304961338,-10.125032056819089,-12.911009520847088,-19.722711718690498,-22.785425397136443,-55.97621782174646,-4.11085532156341,-9.156895382423597,-6.540578104336057,-12.210777687871726,-36.568934636567896,-7.371263757597688,-15.165268639315013,-27.312135610629234,-19.525941567996068,-29.513569542323992,-3.41999187446451,-46.29863421089442,-6.727871484117339,-2.0723226211487007,-24.19720245286088,-25.872162674428072,-15.27375742613447,-38.0916028391105,-9.800355492872134,-8.280051369116858,-37.31606149270238,-69.8475815422022,-25.94366356783049,-25.19979957369337,-38.49461571611726,-5.68117395919142,-4.1382129157638285,-3.838983102513017,-6.002802565537168,-3.563845735156444,-18.434316000636365,-5.508163169321872,-12.622245906158632,-25.881941625616637,-15.73477163301493,-10.753533433615756,-35.872861840877064,-10.699406775826139,-43.557628659738185,-34.48277256299361,-23.706398113202553,-4.638916036526928,-31.71930861849438,-35.75109408727427,-11.299720108032194,-10.354970169235589,-9.683541787702591,-21.96511793588299,-13.792076472723723,-11.434329515783107,-9.334629536170185,-2.7283792458534384,-11.40506544779216,-28.911159468518264,-48.43428259456654,-3.1292783382022824,-34.276567379436266,-4.696654779271471,-5.6974365287861,-4.395103253072577,-8.16989714554315,-38.490981515106576,-16.006387514556092,-31.57790836677779,-36.18946351198344,-3.12217265792561,-14.516473369378183,-22.864831622332815,-11.444695153729569,-33.41828735130757,-24.870339186497944,-17.023392664061795,-3.322039698745124,-24.996791189495315,-33.52306254370512,-6.1003337202045955,-2.10022902835604,-4.255735211905288,-17.533504881608444,-7.777292348002365,-8.849684103792892,-3.363031800787567,-19.12334508374946,-8.910688137563406,-16.09168857651359,-24.213220442469634,-3.397070683376581,-34.08120979821523,-27.919783828146304,-12.144359084846355,-15.842125505142924,-12.558069664790473,-12.47748506857882,-4.016960343294851,-21.78708774588523,-21.94153126788741,-8.338729392769896,-35.977446522761035,-3.8192411043454517,-6.343254829690382,-20.056985125762473,-7.188016507709373,-25.53984842046431,-18.55203735336026,-23.206840549733315,-31.281227109235914,-11.96202242801831,-3.6838992369914667,-7.845386772535938,-32.118433711448525,-3.4350075494193737,-15.077580800508695,-31.940128047132333,-16.434028994583684,-45.71640539869313,-20.52998666182229,-14.117788813366943,-29.349800249620245,-22.42931836150775,-17.4190195794297,-3.39169584151126,-2.884476358989377,-6.102085079686905,-4.736411200895237,-19.683225178312682,-12.420277205328448,-16.566007513553508,-3.8693469126902613,-18.25988413077264,-3.0364451427067176,-3.0198550331945357,-6.892995481972434,-15.00220775271539,-3.444473472939599,-2.0681298677776554,-14.304133440675983,-3.2658699784155063,-57.00980704484605,-20.637020202467536,-5.634958614265779,-16.604493326002405,-19.643126314073655,-11.94985595685017,-3.744394062620221,-3.4406040165078613,-5.426876848356483,-3.0084632565283425,-26.08329198732102,-34.106466277377585,-11.25835802089499,-17.534667626100372,-30.877261112691713,-58.954893999182694,-33.648380720522404,-20.20772532900328,-6.370042176936324,-4.677070573300911,-13.311431369331869,-24.8361662655026,-10.475645094114052,-24.093824047018806,-14.999008141889309,-32.06256794414866,-50.86042255543764,-33.89983013518194,-18.915381438810034,-27.317643907189783,-7.870469103332722,-2.890208047839552,-22.66999973965718,-3.2818432163597793,-41.2443126469688,-2.9056949103502694,-12.791904139109876,-15.808531407348976,-13.454151635457796,-55.33337473304726,-3.253757074102451,-20.613627757015212,-13.687997681424765,-47.18648449996489,-6.14140662464277,-36.72309740882928,-3.2313947743183484,-26.661556059647257,-23.347098714731576,-17.12025741549925,-5.951310101763776,-4.824543590263793,-5.41762094892129,-75.7451957514026,-34.510634495964915,-8.109574706798155,-4.44791816117986,-6.527046504644754,-7.507447929034927,-44.8938926405596,-61.70606385069251,-6.231985357131766,-10.558104043769637,-28.66229550200218,-21.27177907198573,-18.767829628271503,-14.994086584315312,-13.2717774427546,-26.22795718181372,-40.36595326690168,-24.38395729106251,-23.41393422989256,-4.328929349792484,-25.716592463019296,-20.457354341780363,-14.790882341330157,-18.406437850073484,-46.009446701481785,-20.42976023101311,-25.88261169344201,-7.01104411072823,-13.208071988756132,-9.587651748618224,-7.170756057634561,-12.446544738633586,-31.32602298040175,-37.044858036466884,-4.79021104564099,-11.291850550469654,-3.2054611040279823,-4.526600108947125,-3.336978487587643,-51.832080453185895,-21.178501101011538,-3.6961412497073303,-7.05628816618305,-5.534637343962066,-4.0870594274570164,-31.11425326332554,-13.998291204174139,-5.217907309173268,-40.82846332701207,-14.0109557094492,-26.051160969653164,-84.77625444386602,-6.423807361430973,-9.516378736700975,-49.0212292753849,-12.267129750324699,-44.83752529308361,-12.304275149956265,-30.802935774815264,-30.35743878273911,-3.3862315332747004,-42.45845537580539,-18.338427404724087,-10.31276438811292,-49.75987526016551,-14.463219192872335,-10.89980407769812,-8.53922557408405,-14.734836189329366,-32.04142658016042,-16.815547481313008,-10.553491486725063,-18.81466021024802,-46.91099181523755,-2.5611668134654866,-23.9418781727431,-6.6216131482162774,-12.840161059999406,-5.0301796297743895,-23.011036722780567,-15.475141268117731,-28.397188835088762,-27.630880685464145,-25.58962385734675,-9.779582121060994,-13.807104774163896,-22.30458953729614,-44.0816315472601,-27.958619611372413,-33.49882328057701,-23.909433726120973,-9.457486453682533,-3.5298081639263614,-42.20463316403409,-14.346223092941026,-9.223043763250544,-5.011221857199571,-30.109220940741736,-25.25900413461845,-5.556547291237805,-44.73539011993382,-10.271304689836528,-23.05920277624814,-12.430709342602999,-23.162413805681236,-40.19050150633012,-9.752351168409948,-4.853758294932819,-5.617513676781623,-25.298276475648894,-11.56650838199662,-21.524954646882456,-3.6057828188255288,-3.4883355442550394,-2.456670029880178,-5.788393292911563,-8.103250168203811,-5.366515514270178,-2.6703534157464657,-11.165439104402127,-11.427621306750247,-3.8033381304290215,-23.380211196201085,-11.418630570878525,-2.710688998958944,-3.4467148406089176,-14.26777318286349,-6.09224742163654,-18.092556529713452,-2.807230701772132,-10.802618528983997,-26.08795956657598,-72.34717819183261,-11.092609131545933,-9.006013105669792,-18.464774714290446,-18.510228405806522,-7.046405602477423,-6.916811463325964,-15.735300811521446,-15.310942481989416,-27.59187258060848,-17.6535918443926,-24.763888248517183,-13.499310421335773,-8.131248892656604,-17.570039358837644,-5.04245034581381,-30.16605608948657,-16.87378760330867,-4.119914272009437,-23.802980354335244,-41.4046010819427,-3.723568961471087,-4.109906214024233,-9.107999186988634,-21.26706983818496,-11.989192032755254,-43.10369886739137,-11.609049281281731,-74.82154142696014,-7.09529941844329,-13.756464757013742,-2.8994479184344595,-23.251878816592207,-23.72108409912439,-26.491071675867033,-2.8717775982687526,-30.669427438056456,-4.3894031709844725,-6.740862225006568,-32.86127008329285,-3.1978464367497477,-21.395837312796754,-21.318379629254753,-6.626031137996937,-5.434557783300199,-14.465301790359455,-12.488185469391398,-8.431758264806362,-30.818628695106632,-29.96881167771368,-46.48037060512094,-39.22724135839074,-4.499206640529085,-22.873156946047676,-68.55854905449182,-2.773729228475399,-22.009131806303106,-15.865307710719808,-30.77659033639331,-26.983793686318684,-39.4737219429616,-7.631530182106557,-5.3773582049391715,-22.964788279978524,-33.016504003510576,-20.110415059743428,-45.978587491722756,-6.394372439580123,-21.15621889145133,-30.54210362088191,-6.814942951243629,-26.101710390231297,-9.437103813778107,-29.045940026887866,-28.536786617741587,-13.258389860001902,-29.159742786824264,-10.091528434663982,-9.007157234463568,-27.912216533448586,-22.717356329337637,-14.214818937162406,-8.234973278339396,-45.81130533563052,-12.88288951240279,-29.65950452954672,-6.054057101289532,-8.087084508321988,-3.5079132364423167,-3.3508258145657415,-15.017947608509782,-13.588316483134715,-11.296897941136141,-4.291897461650865,-13.306573695352123,-10.462732249783969,-15.001867575407555,-2.889542091994315,-17.31395293052778,-26.809892123499512,-6.774039504573054,-16.09254429907485,-7.1888677799736875,-4.237662935225468,-8.637280119833667,-15.49043533186854,-7.667864054756752,-18.00680354852187,-4.3592356649676,-15.38489958525586,-16.381429800650988,-34.91772767155154,-33.2952235795576,-25.08448148931113,-5.561424901805727,-3.1310837671234544,-23.3789560858976,-14.83500772018208,-2.63599595218849,-63.46307446728776,-9.316871304161436,-9.397731320197327,-3.117454008573231,-17.64740042649157,-3.371025272179785,-28.00836564221532,-21.282554819724258,-9.495112366060276,-4.843191278875542,-10.805941595142006,-13.179879392068633,-30.62905341226384,-5.02414598270014,-27.785982872235902,-38.412517262062856,-8.644201549600316,-32.5836174042566,-15.211806357053868,-5.200656841190507,-3.1434026978176974,-21.062564675426806,-3.6217837543269704,-15.64167427949427,-56.6633571852594,-24.453019998366834,-3.517558854532771,-19.13820895473845,-16.477259345873687,-12.151705912705655,-20.62328305976618,-5.050388269341255,-19.08087752500881,-32.888548455998205,-14.978889823617287,-40.017028837039334,-13.205521856198905,-19.86552390212433,-31.16472492291336,-30.737498727601032,-4.070151008966382,-2.838288778514774,-21.58122589371074,-4.72286008871715,-3.319486608590468,-13.11092691424369,-29.123015373141893,-12.320599817068357,-4.666890992124836,-24.493900847285673,-2.2181459714033895,-13.68603899107407,-28.175656138029417,-7.141838477431647,-2.6688687681117442,-14.424229199996205,-17.537875132429594,-34.319122500564546,-78.7097491267885,-16.15526921194217,-11.364070238772914,-3.335926943002055,-29.39664843982805,-13.664578379838373,-22.223803184869084,-3.8714923221774304,-16.645485690510576,-11.332052272036128,-19.460050605424648,-3.648365732978259,-9.907954333067986,-10.547586136417193,-8.955800842982761,-33.952087722978284,-33.380233035030315,-16.91006735060693,-4.138383894691881,-26.396231280122425,-4.819756768849493,-18.646610229934574,-5.04398302387798,-33.38965056197536,-18.945470723781373,-3.6764478925964865,-13.988930238340789,-4.191442085772106,-30.643214403158524,-37.974864429884335,-4.055119665831394,-4.498321408032394,-44.717517532188154,-21.327800172461213,-9.769681225061866,-8.471719648570275,-20.89452701441658,-82.21973793892802,-21.440958785097777,-44.43998982801191,-5.737470095614406,-24.348394762969768,-3.067760942877289,-10.855204632702117,-9.438901285952022,-13.336505762089322,-19.750940109521725,-7.643050784893904,-27.904621669851576,-3.045671043142396,-14.143592875850784,-9.604289274259182,-23.407726666259762,-38.10847064547182,-25.211662622033103,-66.65782571393966,-3.94578046384712,-10.751682936947706,-12.813219819741368,-19.534424672368825,-6.440285796232645,-6.607728637158635,-14.484699779857248,-15.932522568933207,-49.32417254225114,-33.56680133415407,-20.46851424996731,-3.352137038179765,-23.67601528152761,-24.850028055270403,-34.04230811684245,-4.664236454947243,-17.558607262857816,-42.39617782779394,-127.28546843567679,-4.588227142210414,-4.363847842556776,-38.55607217273314,-59.306833733047945,-11.466446301138337,-19.171052368409097,-27.01500195055522,-34.53888207510177,-22.038672185337017,-3.491943318419743,-22.594599643756727,-17.876777176832782,-8.63779139967048,-39.99648718633819,-17.493414934792067,-2.652311201130477,-4.987386912040525,-10.58241465088518,-15.371448242452338,-15.326771447524669,-10.638671996628524,-18.658974333671665,-31.132333549386612,-32.335380245546474,-15.283201038722156,-59.73804466138721,-11.421050750959559,-14.82285216019597,-81.0879935749375,-16.694901244172637,-20.388034628655966,-21.274468876629797,-21.250536220516988,-19.022385624113955,-14.349886905488743,-5.503306264209097,-10.988384982123886,-52.97778540375546,-8.115588507592017,-32.8830352185571,-25.595263432622026,-11.629143834655036,-34.961883407821226,-16.903400144509543,-2.2997050119438045,-15.093693364012573,-3.881586400571754,-8.922352598564313,-21.7022336872358,-7.343246564220113,-3.1007805048071764,-7.953179615412065,-7.374637946572367,-26.401144352150546,-26.79984820710061,-24.741846230137128,-6.024007507930195,-24.035077684170815,-41.122380172071395,-11.583147764072507,-9.999009312843816,-11.667980187530848,-6.041159073473329,-13.768302960198564,-39.20991874835139,-9.311954784512679,-22.10787798521463,-3.7540401237849803,-17.613001027260445,-3.4620514349149465,-20.700960496102635,-36.99883107125281,-13.738571814682603,-37.78709154627535,-12.638680113320529,-19.04952632272052,-42.99170431701861,-7.111194154360443,-3.413306829447145,-15.730275641969714,-11.213933205222094,-43.23069886885062,-49.36414802495713,-2.8445546808951847,-24.805866434734295,-21.24526821457771,-11.169132935110497,-7.610299542508792,-10.994776970039878,-3.945470938136806,-57.48150138252703,-22.37986846254467,-6.597150267768477,-4.939049869909315,-21.805967936758773,-16.20639962183507,-4.095938415672814,-6.862745973802839,-29.91442923562526,-33.276057449059415,-3.92711339354182,-11.819247700430127,-33.068522922065085,-20.101099340161177,-17.69641993207297,-20.157109940893434,-29.611458181065807,-14.448943223722603,-4.497344194281247,-5.4570272744073955,-14.862146153813043,-6.607312801871861,-50.57384641515969,-28.980519989116182,-29.315025953837097,-2.7172646839563797,-4.49252786671396,-29.453675341963955,-23.412169340870534,-2.350056473665429,-6.61884627809405,-9.951409583259393,-7.299947106731379,-10.320999437365794,-26.77794916177689,-13.542149229140191,-10.219655323769768,-11.976199967830034,-11.083768070707334,-3.0632842326920775,-47.700577699230415,-17.780307049729267,-16.44113484305025,-5.319855679437434,-3.791265205717086,-3.070214664791197,-16.964561160925335,-46.55156915767717,-49.78780847855352,-3.291439129620627,-25.446988135797156,-8.236308383980338,-16.75206076433688,-5.276342165671009,-4.323630917246362,-31.83583972108073,-19.088720137107966,-57.93095993556665,-24.235887077481248,-45.28355712006453,-15.512493439906489,-22.06364052789539,-19.365580110246775,-23.825432048218374,-11.698490774950889,-9.599045728403004,-8.209714476865868,-16.527181240970474,-3.878200140735948,-25.548826513263965,-30.911272245759747,-39.78260061069961,-2.9635292866600826,-29.43376541499267,-3.0126593343722847,-55.646842047975284,-11.714325872263272,-2.5781744110801244,-3.478022710384564,-6.091659096251055,-3.1770316355886514,-20.541836459920532,-8.290285531538643,-27.044835077295122,-17.24943502386301,-4.12748109371051,-31.782745153774012,-18.90742101908581,-10.33675566469623,-43.42878658781339,-14.80007342789822,-10.725848521592622,-17.184645415107767,-5.898996063013201,-10.928186097020085,-5.134837537461779,-12.104019637323201,-13.724534654722278,-16.311667973977002,-23.706715655632472,-9.319673031159686,-13.524735299428212,-11.192949256826013,-4.60453952039997,-33.01001238762661,-16.240379842469046,-3.729962744852809,-25.413653534899737,-33.063339006079126,-7.385782305032775,-9.992475915192292,-6.753665769601902,-3.137286345388678,-18.639708282086666,-47.783713090842426,-2.762011791851635,-15.296845378136892,-42.67048803690637,-7.363088495420003,-8.583062734971293,-79.6046494675011,-10.312033122806021,-25.827832811660546,-36.864361597638016,-84.46410686461091,-5.663796917102589,-31.347319434597548,-24.159318218317363,-9.012906391521556,-21.53792601788319,-15.54582437034072,-14.509296081003702,-17.727488109333304,-5.035210674020237,-4.841875881077731,-6.918354861503883,-25.626596459917483,-3.148786023737266,-10.224897816922773,-13.403402322375781,-7.068541943707178,-11.631439447554271,-112.115202476162,-3.8350986266896765,-28.649690471362877,-12.979933052502487,-54.03474008616003,-5.28818897862164,-21.376206934720358,-8.765117453803265,-20.698417797369864,-18.161194190916465,-27.212695748919604,-23.78158205512512,-21.600217041931707,-4.256581465181817,-21.462052947682377,-8.55779676376141,-20.044561411274834,-4.002393687100428,-8.80439843105691,-3.198450436924341,-11.676349984455642,-17.890319363203044,-11.177575392648569,-15.224857362613134,-3.420408449139095,-24.870548232918132,-17.329586800615424,-36.55205424124969,-16.069983911144273,-29.916545443549893,-22.7946366401278,-32.1475254173716,-8.790947682307403,-46.20193468140474,-40.461956003632814,-3.845457110475889,-14.15847088805816,-25.132161608618247,-24.21850067173419,-13.05147547309874,-3.4257565968883315,-3.8442907053585866,-9.436154755741438,-7.254447463308146,-15.185657201524007,-24.019116386789953,-30.874959363538952,-26.191738706874293,-3.680636815238876,-24.42692477286346,-24.780695938415306,-17.361776453102078,-14.41928215792643,-53.43500787690573,-10.85124583487784,-9.903191193898406,-12.991918568937116,-39.54850729840524,-3.5154728150505825,-8.847979249928962,-5.953594090440903,-26.07212590709638,-30.210327717005484,-10.7571224718626],"x":[3.0,3.0,7.0,9.0,11.0,11.0,13.0,8.0,11.0,1.0,2.0,5.0,2.0,7.0,1.0,10.0,1.0,6.0,5.0,6.0,13.0,10.0,0.0,14.0,14.0,8.0,14.0,15.0,1.0,12.0,4.0,12.0,2.0,13.0,1.0,3.0,11.0,9.0,12.0,6.0,12.0,3.0,0.0,9.0,13.0,10.0,12.0,15.0,11.0,14.0,2.0,11.0,3.0,2.0,11.0,3.0,2.0,10.0,3.0,8.0,5.0,3.0,5.0,9.0,7.0,2.0,8.0,12.0,14.0,7.0,8.0,13.0,7.0,11.0,4.0,8.0,13.0,9.0,9.0,0.0,1.0,9.0,12.0,15.0,5.0,2.0,12.0,0.0,13.0,13.0,4.0,8.0,3.0,1.0,14.0,0.0,10.0,14.0,2.0,3.0,3.0,10.0,11.0,14.0,2.0,8.0,2.0,1.0,2.0,13.0,5.0,12.0,2.0,4.0,15.0,0.0,1.0,8.0,6.0,13.0,1.0,1.0,14.0,4.0,7.0,2.0,1.0,6.0,0.0,7.0,14.0,4.0,12.0,7.0,12.0,5.0,11.0,2.0,13.0,13.0,3.0,7.0,12.0,2.0,7.0,14.0,0.0,8.0,11.0,6.0,14.0,14.0,13.0,2.0,3.0,11.0,8.0,13.0,12.0,7.0,7.0,8.0,5.0,5.0,5.0,12.0,4.0,1.0,4.0,2.0,11.0,10.0,2.0,4.0,1.0,8.0,12.0,4.0,2.0,9.0,12.0,2.0,3.0,10.0,4.0,10.0,10.0,13.0,13.0,11.0,14.0,9.0,2.0,8.0,2.0,6.0,7.0,3.0,11.0,8.0,2.0,7.0,4.0,3.0,2.0,5.0,2.0,4.0,13.0,13.0,8.0,10.0,7.0,13.0,3.0,14.0,15.0,9.0,1.0,4.0,10.0,9.0,3.0,1.0,1.0,12.0,6.0,2.0,14.0,10.0,3.0,3.0,7.0,12.0,2.0,12.0,4.0,15.0,13.0,3.0,12.0,4.0,10.0,10.0,9.0,10.0,10.0,2.0,6.0,14.0,4.0,8.0,7.0,13.0,7.0,9.0,1.0,1.0,10.0,7.0,11.0,7.0,3.0,11.0,1.0,11.0,7.0,2.0,8.0,7.0,10.0,7.0,6.0,8.0,11.0,10.0,12.0,6.0,2.0,13.0,13.0,7.0,10.0,0.0,1.0,11.0,8.0,3.0,1.0,3.0,3.0,5.0,8.0,7.0,15.0,4.0,14.0,4.0,6.0,7.0,3.0,6.0,5.0,15.0,5.0,15.0,12.0,8.0,12.0,1.0,2.0,15.0,8.0,8.0,5.0,6.0,6.0,9.0,9.0,8.0,3.0,12.0,4.0,15.0,12.0,12.0,3.0,1.0,10.0,6.0,2.0,10.0,4.0,12.0,3.0,9.0,8.0,2.0,5.0,14.0,10.0,10.0,4.0,3.0,3.0,4.0,5.0,11.0,11.0,13.0,7.0,9.0,6.0,9.0,6.0,2.0,15.0,7.0,13.0,6.0,6.0,14.0,15.0,13.0,13.0,1.0,3.0,8.0,13.0,5.0,7.0,8.0,8.0,5.0,6.0,11.0,4.0,10.0,0.0,14.0,11.0,5.0,0.0,13.0,13.0,11.0,14.0,5.0,12.0,1.0,13.0,11.0,10.0,7.0,4.0,3.0,14.0,11.0,6.0,10.0,7.0,3.0,1.0,3.0,15.0,6.0,13.0,5.0,2.0,6.0,4.0,12.0,10.0,3.0,13.0,8.0,7.0,3.0,5.0,14.0,2.0,15.0,3.0,2.0,6.0,2.0,5.0,15.0,10.0,8.0,15.0,12.0,9.0,13.0,0.0,10.0,7.0,8.0,6.0,9.0,6.0,8.0,6.0,2.0,7.0,6.0,4.0,11.0,3.0,8.0,12.0,14.0,9.0,12.0,2.0,10.0,14.0,13.0,10.0,13.0,12.0,5.0,12.0,3.0,14.0,13.0,1.0,8.0,6.0,2.0,7.0,12.0,4.0,11.0,6.0,5.0,7.0,5.0,12.0,14.0,6.0,7.0,6.0,2.0,8.0,8.0,8.0,9.0,10.0,6.0,10.0,14.0,14.0,14.0,5.0,14.0,6.0,13.0,15.0,3.0,14.0,3.0,4.0,6.0,7.0,1.0,11.0,7.0,14.0,5.0,7.0,13.0,4.0,9.0,9.0,13.0,14.0,7.0,5.0,13.0,0.0,9.0,3.0,14.0,15.0,11.0,2.0,7.0,4.0,14.0,1.0,5.0,10.0,6.0,3.0,5.0,3.0,3.0,12.0,14.0,4.0,13.0,10.0,3.0,13.0,4.0,7.0,7.0,10.0,4.0,5.0,8.0,15.0,14.0,15.0,11.0,1.0,10.0,13.0,12.0,15.0,15.0,14.0,5.0,10.0,4.0,8.0,6.0,4.0,10.0,6.0,15.0,4.0,6.0,3.0,2.0,4.0,11.0,12.0,8.0,4.0,9.0,1.0,10.0,11.0,6.0,2.0,7.0,14.0,1.0,12.0,11.0,12.0,8.0,14.0,0.0,8.0,1.0,11.0,2.0,1.0,13.0,11.0,8.0,0.0,14.0,5.0,13.0,10.0,12.0,0.0,8.0,1.0,10.0,10.0,7.0,12.0,9.0,6.0,14.0,15.0,2.0,6.0,13.0,8.0,0.0,5.0,14.0,8.0,15.0,3.0,11.0,1.0,4.0,14.0,1.0,2.0,15.0,5.0,5.0,13.0,0.0,8.0,5.0,5.0,1.0,12.0,8.0,10.0,5.0,1.0,15.0,9.0,4.0,5.0,9.0,1.0,12.0,2.0,8.0,8.0,3.0,10.0,7.0,6.0,3.0,9.0,14.0,14.0,12.0,6.0,13.0,14.0,6.0,15.0,5.0,10.0,14.0,11.0,10.0,12.0,1.0,12.0,8.0,5.0,0.0,4.0,11.0,1.0,3.0,4.0,2.0,5.0,14.0,4.0,8.0,9.0,7.0,10.0,0.0,12.0,0.0,4.0,10.0,14.0,15.0,4.0,4.0,15.0,8.0,10.0,15.0,14.0,1.0,12.0,11.0,14.0,1.0,5.0,4.0,1.0,11.0,9.0,13.0,12.0,4.0,4.0,4.0,11.0,3.0,1.0,12.0,6.0,3.0,6.0,7.0,11.0,3.0,9.0,4.0,4.0,6.0,8.0,12.0,8.0,3.0,4.0,15.0,2.0,9.0,3.0,7.0,1.0,14.0,11.0,1.0,9.0,14.0,14.0,4.0,6.0,1.0,0.0,2.0,8.0,8.0,14.0,8.0,3.0,8.0,15.0,14.0,9.0,9.0,12.0,12.0,15.0,15.0,11.0,5.0,7.0,3.0,14.0,13.0,14.0,6.0,12.0,8.0,7.0,3.0,0.0,10.0,3.0,6.0,3.0,8.0,8.0,10.0,0.0,1.0,14.0,3.0,11.0,5.0,14.0,2.0,9.0,3.0,3.0,0.0,5.0,14.0,10.0,15.0,9.0,13.0,12.0,4.0,9.0,5.0,15.0,11.0,6.0,1.0,15.0,3.0,7.0,4.0,11.0,13.0,11.0,15.0,8.0,4.0,0.0,2.0,5.0,13.0,15.0,9.0,3.0,10.0,14.0,12.0,5.0,8.0,10.0,14.0,14.0,4.0,14.0,10.0,5.0,4.0,5.0,7.0,8.0,0.0,9.0,12.0,10.0,8.0,7.0,5.0,2.0,7.0,3.0,6.0,10.0,11.0,3.0,4.0,10.0,1.0,12.0,5.0,14.0,8.0,9.0,3.0,6.0,6.0,11.0,11.0,13.0,5.0,3.0,13.0,11.0,7.0,12.0,8.0,11.0,3.0,13.0,9.0,14.0,1.0,6.0,12.0,13.0,12.0,2.0,13.0,11.0,7.0,12.0,8.0,1.0,5.0,7.0,5.0,7.0,0.0,11.0,8.0,15.0,2.0,1.0,7.0,12.0,4.0,8.0,3.0,3.0,14.0,12.0,11.0,10.0,3.0,11.0,14.0,10.0,14.0,14.0,2.0,6.0,12.0,4.0,6.0,6.0,11.0,8.0,14.0,9.0,12.0,10.0,13.0,6.0,9.0,10.0,2.0,5.0,6.0,12.0,2.0,1.0,14.0,0.0,14.0,10.0,5.0,10.0,4.0,0.0,4.0,15.0,12.0,9.0,1.0,8.0,15.0,1.0,4.0,13.0,12.0,13.0,15.0,4.0,5.0,13.0,6.0,0.0,1.0,12.0,3.0,3.0,11.0,11.0,11.0,9.0,5.0,1.0,7.0,1.0,12.0,12.0,1.0,0.0,13.0],"r":[11.0,17.0,11.0,17.0,12.0,6.0,10.0,12.0,9.0,5.0,5.0,12.0,12.0,3.0,9.0,7.0,4.0,6.0,16.0,15.0,19.0,1.0,5.0,17.0,4.0,19.0,3.0,1.0,5.0,12.0,6.0,2.0,20.0,20.0,18.0,12.0,5.0,18.0,1.0,9.0,19.0,15.0,6.0,8.0,8.0,3.0,2.0,11.0,15.0,3.0,2.0,2.0,4.0,7.0,17.0,15.0,6.0,20.0,12.0,14.0,4.0,16.0,13.0,9.0,11.0,8.0,20.0,15.0,14.0,7.0,14.0,19.0,15.0,11.0,10.0,10.0,2.0,15.0,12.0,18.0,16.0,12.0,2.0,14.0,7.0,15.0,11.0,13.0,1.0,4.0,8.0,18.0,13.0,16.0,15.0,5.0,3.0,5.0,15.0,7.0,14.0,7.0,6.0,7.0,17.0,17.0,9.0,9.0,3.0,5.0,1.0,10.0,3.0,14.0,7.0,12.0,1.0,15.0,15.0,2.0,7.0,8.0,6.0,19.0,4.0,7.0,9.0,11.0,14.0,17.0,6.0,5.0,5.0,11.0,18.0,8.0,15.0,13.0,17.0,20.0,2.0,15.0,7.0,1.0,18.0,19.0,9.0,14.0,13.0,6.0,10.0,18.0,14.0,9.0,18.0,3.0,4.0,1.0,4.0,1.0,7.0,5.0,12.0,20.0,5.0,14.0,20.0,6.0,13.0,18.0,17.0,5.0,16.0,17.0,3.0,7.0,11.0,16.0,10.0,13.0,7.0,2.0,6.0,16.0,19.0,2.0,19.0,2.0,3.0,3.0,2.0,20.0,10.0,20.0,10.0,2.0,11.0,16.0,7.0,17.0,11.0,12.0,2.0,19.0,20.0,4.0,1.0,3.0,6.0,12.0,9.0,1.0,17.0,12.0,6.0,14.0,2.0,10.0,9.0,9.0,14.0,10.0,8.0,2.0,10.0,19.0,7.0,19.0,5.0,6.0,7.0,6.0,19.0,18.0,13.0,14.0,8.0,6.0,12.0,8.0,4.0,7.0,19.0,17.0,16.0,13.0,16.0,20.0,17.0,18.0,3.0,2.0,5.0,8.0,18.0,11.0,8.0,2.0,18.0,1.0,4.0,5.0,11.0,1.0,1.0,15.0,2.0,12.0,16.0,3.0,17.0,17.0,6.0,2.0,5.0,5.0,3.0,18.0,16.0,13.0,18.0,7.0,11.0,11.0,12.0,7.0,3.0,4.0,12.0,6.0,12.0,8.0,16.0,14.0,17.0,15.0,16.0,5.0,3.0,20.0,2.0,19.0,3.0,16.0,10.0,17.0,20.0,1.0,19.0,5.0,14.0,6.0,18.0,1.0,20.0,10.0,14.0,8.0,3.0,3.0,19.0,11.0,7.0,5.0,9.0,6.0,18.0,19.0,4.0,4.0,19.0,14.0,16.0,6.0,10.0,20.0,15.0,16.0,19.0,7.0,16.0,15.0,11.0,12.0,10.0,8.0,14.0,2.0,15.0,8.0,4.0,10.0,8.0,19.0,2.0,9.0,3.0,1.0,2.0,20.0,13.0,3.0,10.0,8.0,7.0,19.0,10.0,5.0,16.0,8.0,16.0,19.0,6.0,9.0,18.0,11.0,11.0,13.0,19.0,17.0,4.0,12.0,9.0,13.0,16.0,11.0,14.0,9.0,11.0,17.0,12.0,12.0,10.0,18.0,2.0,10.0,9.0,16.0,4.0,19.0,15.0,12.0,8.0,15.0,11.0,5.0,10.0,20.0,9.0,16.0,18.0,8.0,5.0,18.0,15.0,2.0,2.0,18.0,19.0,6.0,13.0,10.0,17.0,4.0,12.0,15.0,7.0,4.0,8.0,9.0,12.0,9.0,5.0,2.0,1.0,3.0,2.0,7.0,2.0,13.0,9.0,1.0,20.0,4.0,2.0,4.0,12.0,3.0,13.0,2.0,7.0,19.0,17.0,6.0,6.0,17.0,10.0,5.0,3.0,15.0,19.0,12.0,9.0,13.0,4.0,12.0,8.0,2.0,10.0,6.0,4.0,14.0,18.0,3.0,4.0,5.0,13.0,9.0,18.0,16.0,18.0,5.0,7.0,2.0,19.0,20.0,15.0,3.0,8.0,5.0,8.0,17.0,5.0,14.0,8.0,11.0,3.0,10.0,5.0,4.0,14.0,11.0,19.0,17.0,3.0,15.0,20.0,2.0,14.0,14.0,16.0,17.0,8.0,7.0,4.0,17.0,20.0,15.0,16.0,9.0,13.0,20.0,2.0,15.0,15.0,16.0,17.0,12.0,16.0,14.0,6.0,7.0,19.0,8.0,2.0,16.0,9.0,17.0,7.0,13.0,1.0,4.0,11.0,7.0,14.0,2.0,11.0,7.0,15.0,1.0,13.0,12.0,7.0,20.0,6.0,3.0,5.0,17.0,9.0,12.0,6.0,13.0,14.0,20.0,18.0,13.0,4.0,1.0,5.0,14.0,2.0,16.0,2.0,6.0,2.0,8.0,1.0,15.0,19.0,4.0,4.0,8.0,9.0,19.0,3.0,17.0,13.0,9.0,14.0,6.0,3.0,2.0,10.0,4.0,14.0,18.0,13.0,2.0,12.0,11.0,6.0,19.0,4.0,15.0,18.0,5.0,20.0,11.0,14.0,13.0,10.0,1.0,2.0,13.0,2.0,3.0,14.0,16.0,10.0,3.0,17.0,1.0,14.0,20.0,4.0,1.0,12.0,10.0,19.0,20.0,9.0,11.0,2.0,12.0,7.0,6.0,2.0,20.0,7.0,15.0,1.0,3.0,8.0,9.0,16.0,18.0,16.0,3.0,16.0,5.0,9.0,9.0,14.0,7.0,4.0,10.0,3.0,18.0,20.0,4.0,2.0,17.0,11.0,8.0,5.0,9.0,20.0,18.0,18.0,3.0,17.0,3.0,10.0,8.0,14.0,9.0,6.0,19.0,3.0,12.0,6.0,7.0,8.0,20.0,17.0,2.0,7.0,11.0,6.0,4.0,4.0,5.0,10.0,20.0,9.0,18.0,3.0,12.0,8.0,19.0,6.0,8.0,14.0,17.0,8.0,1.0,20.0,19.0,3.0,6.0,16.0,20.0,19.0,2.0,18.0,20.0,5.0,17.0,16.0,2.0,3.0,8.0,10.0,12.0,9.0,9.0,19.0,14.0,9.0,20.0,7.0,12.0,18.0,13.0,19.0,12.0,18.0,5.0,10.0,2.0,10.0,18.0,10.0,11.0,17.0,7.0,15.0,19.0,1.0,17.0,3.0,7.0,13.0,3.0,2.0,3.0,10.0,18.0,18.0,20.0,6.0,13.0,18.0,4.0,8.0,9.0,5.0,9.0,20.0,9.0,13.0,3.0,15.0,4.0,18.0,18.0,18.0,18.0,11.0,8.0,16.0,5.0,4.0,8.0,11.0,19.0,14.0,2.0,14.0,7.0,4.0,7.0,9.0,3.0,19.0,18.0,7.0,3.0,7.0,6.0,4.0,4.0,17.0,20.0,1.0,6.0,11.0,11.0,13.0,11.0,15.0,8.0,4.0,6.0,16.0,9.0,20.0,12.0,17.0,2.0,1.0,14.0,19.0,1.0,6.0,5.0,7.0,6.0,8.0,17.0,4.0,4.0,11.0,3.0,14.0,12.0,9.0,6.0,1.0,3.0,13.0,19.0,18.0,2.0,19.0,5.0,14.0,1.0,5.0,16.0,11.0,16.0,18.0,20.0,4.0,14.0,7.0,9.0,12.0,8.0,10.0,17.0,4.0,14.0,13.0,14.0,2.0,18.0,2.0,19.0,6.0,2.0,1.0,3.0,2.0,15.0,6.0,19.0,9.0,4.0,20.0,16.0,8.0,16.0,8.0,5.0,7.0,4.0,13.0,2.0,6.0,9.0,16.0,14.0,9.0,5.0,8.0,2.0,16.0,19.0,6.0,14.0,17.0,8.0,9.0,8.0,3.0,12.0,19.0,2.0,7.0,18.0,3.0,3.0,14.0,4.0,15.0,19.0,15.0,6.0,20.0,18.0,10.0,17.0,11.0,18.0,11.0,4.0,7.0,6.0,15.0,3.0,5.0,15.0,11.0,9.0,14.0,2.0,8.0,10.0,11.0,5.0,18.0,11.0,20.0,16.0,16.0,19.0,14.0,4.0,18.0,5.0,15.0,1.0,11.0,2.0,6.0,13.0,6.0,19.0,1.0,17.0,16.0,16.0,8.0,9.0,17.0,15.0,8.0,18.0,18.0,3.0,10.0,6.0,6.0,9.0,2.0,1.0,6.0,4.0,12.0,19.0,17.0,11.0,5.0,14.0,10.0,16.0,7.0,20.0,7.0,5.0,6.0,19.0,2.0,7.0,9.0,12.0,17.0,11.0],"p":[0.16725341317863524,0.11690292015942544,0.012601130096141767,0.01730918476047121,0.11307855736011346,0.19816406972137784,0.19234162350709114,0.003709935290214661,0.18951048272470938,0.04624738792823235,0.1512181406626426,0.039405765596412894,0.011444577887430274,0.027788730924877127,0.07027349475238141,0.10524479827147536,0.030449660127983294,0.059948136023150016,0.06507989215074682,0.13560492331932045,0.16211515660862685,0.19359166520268467,0.02234825218728185,0.03980004262209489,0.09160683057738069,0.10452289542872353,0.0524353096319294,0.16964390804963989,0.04242883063135623,0.18368864361909112,0.014759918233315218,0.08584674635106287,0.10436094413765568,0.12185794534647704,0.124589484281204,0.1665462239638197,0.04164184958296864,0.06400849158948484,0.028489129992003506,0.15843613177920762,0.19657870944529418,0.004626087282157698,0.03224052948279415,0.1168360282808843,0.1945322267162365,0.043419167170155815,0.1940628384957314,0.08070387907217356,0.17144855760345412,0.02554323279674886,0.051336053731700165,0.177903150403204,0.12139004385547528,0.06835289502699507,0.17402010422104583,0.05359195068328666,0.08137208974425301,0.02428228696802788,0.19913072908215712,0.1692251565176539,0.16115606396275603,0.008406257958248542,0.15486857613912788,0.14532592891733934,0.04513648809933346,0.0017355979437426506,0.026669765479311283,0.03791130140116872,0.011541685786322598,0.08489484742523312,0.00839388249741453,0.17226165921144335,0.034011295812555846,0.01945425182680527,0.09545802251686185,0.19929892410270808,0.03424326736676982,0.10562146924163529,0.11511625648092152,0.09641715949207841,0.13276285176162259,0.10806714374622804,0.0795782187185338,0.02039462831573422,0.04642216939263362,0.09165288307255466,0.07707328268321262,0.022564125004753244,0.020530192019998728,0.13165233357924327,0.033087279964896646,0.15641563370201142,0.10590734051854703,0.15296784019572765,0.14540500313026858,0.19640072557880994,0.1113756416096729,0.19982426657315303,0.02610516898612003,0.14116357909591742,0.15158738959052492,0.07490882279073606,0.06643293777164087,0.12123309263317635,0.18749100773159927,0.040667792451678064,0.1370378573734019,0.13100529225297053,0.12898015251925554,0.12152011134359829,0.15783413297542245,0.09636772739526425,0.14423399552817615,0.19681420638966185,0.16356641650523898,0.19751911966989333,0.16991471327127983,0.11687810149905853,0.08610469984032383,0.09424831040845799,0.12450449556360468,0.08924506422048624,0.0306110151346652,0.11303223432214651,0.15516919365044238,0.15337139326055246,0.1910666779744924,0.0768044270093927,0.19641404262121834,0.01803929964944695,0.15830921587666902,0.07275573636607202,0.07208780639198738,0.1487719006194991,0.05059382671990416,0.19839012110148244,0.14737577578313651,0.08770281850660236,0.1211676557407031,0.09099399907610711,0.1072006463706078,0.021191316028464958,0.11604027484132479,0.1935959951889683,0.13586637049395495,0.09651811565354076,0.18321697761602573,0.027938924537636335,0.18981646268271293,0.10060313942398605,0.006193399702725211,0.00706602282858837,0.05193872860185947,0.04020267454586018,0.08081533136695934,0.04108394456675377,0.13144045801884535,0.12837999313913775,0.057701262493003475,0.03684379704087744,0.025433824235530936,0.1173161140128566,0.18961565996788032,0.16849747423610442,0.01661488586265816,0.18273173713779306,0.10804449305054198,0.12756666324244367,0.019804180744796174,0.11212468258510344,0.10136087670754966,0.13172467628902704,0.10269906969839014,0.07549455228090407,0.016125417638627893,0.07980758168112151,0.1459417383014964,0.1578217728109615,0.17527485362923634,0.1808680858471155,0.07381401727800245,0.17994318594127906,0.07963981691861535,0.06713791422438668,0.04944990618229666,0.11846636480618887,0.0722829707584293,0.03141848213078169,0.037435728550667506,0.07078758336129023,0.004482725476726302,0.06856396617782785,0.13926476062650944,0.10375407737848152,0.01802416441181154,0.11411715092198974,0.11793842197948617,0.16287981300644971,0.05549556075723175,0.06531056034414906,0.0722090006916222,0.10913111707873618,0.10637276569718322,0.1899618988279106,0.14546959485844477,0.0894283033711198,0.1837564539894737,0.11562127645761677,0.012217137599524941,0.193453187742212,0.15122957446112287,0.07805849859396329,0.1688529572162315,0.17081866786538621,0.03562518597026463,0.05656896865450176,0.10586470926401051,0.011367341617301463,0.03535431289615043,0.1391541361177843,0.13171220458272012,0.10721519992987859,0.12128187011498365,0.10002240620397607,0.09076769686763404,0.131660548850818,0.12893328591466954,0.11569867539433534,0.1451575454990961,0.11135838939239623,0.030656414619683672,0.16928710088589308,0.13835695536364653,0.14795361273277702,0.12095989981844024,0.036626718279884285,0.11546438703732904,0.17566378719916234,0.19197815944085478,0.00995691368836833,0.14869070389213465,0.05585654752858509,0.08220519399462747,0.17076496281179418,0.024143137384618152,0.07842585881447293,0.1840108636398302,0.17996285234642523,0.1460738990694518,0.1462740739251201,0.16703228677482312,0.1533797869468877,0.1087041722649115,0.1911777546131075,0.17802025377685637,0.12789090448556611,0.09849795315497795,0.1081750717719844,0.1652873211037846,0.10172018772387821,0.19618907854268755,0.09016344505603291,0.1603572393134395,0.08902185726243204,0.14846335411476316,0.15745055126822893,0.099786213178642,0.006018783231470737,0.13015647861253718,0.052496928444672665,0.16882952292914655,0.1633216672460095,0.051762653457070366,0.06791635177900922,0.1870746447141598,0.1061792923831376,0.1835239124441717,0.12965013649473459,0.08828888470149998,0.15074095740645146,0.15120171592039278,0.004207927787914967,0.0015639376275317308,0.04693724877202703,0.15301593462985574,0.13048351385906712,0.07222203158414967,0.017183750461722713,0.1035556474094737,0.09370165437552505,0.08396777146288877,0.06966446186327424,0.06134878447611314,0.0119018148557124,0.044967737472380434,0.17465998237208097,0.06159759000737424,0.09603724716803669,0.19292263567241552,0.17632239515779077,0.1167313741894279,0.06254057537695377,0.19929539944352817,0.16351764565962817,0.10151801320999376,0.16930565275219608,0.024978304616055658,0.16761221234647317,0.1422945118960493,0.04736927193303378,0.02474058931450576,0.09145199228643275,0.06180935664916923,0.16120644420914051,0.16172749924100507,0.042403173301962443,0.1524094958839205,0.18637738665298698,0.06426905381696782,0.053496050433061805,0.012738320053173258,0.013045282991295882,0.16177588891246023,0.11263572680800081,0.16775376712709988,0.07867615449038592,0.05638934423671565,0.033344142375358744,0.05972269449181118,0.024476071147127156,0.17119785141937316,0.08616533855916382,0.19491381317265888,0.01996568461689705,0.163146168343626,0.1305712910441792,0.029597550019967625,0.16387251716676432,0.1773640644570187,0.1749964489502597,0.0828494800983251,0.10477085784185852,0.14738398999636818,0.13690162750860888,0.005866234269879422,0.038426244330724925,0.085108153004304,0.00911712074975557,0.17148591278322642,0.08537257752915438,0.05560742073846536,0.10856538871572777,0.007900947909062551,0.06547492518216047,0.03879968040037962,0.19610512972066474,0.15574509609798937,0.011750499441306196,0.09978866260189996,0.041455877570003,0.0964855870750411,0.09350288555484854,0.15563618458737227,0.16396476317764322,0.19337462537413863,0.1681543731306767,0.1510626051459407,0.12640379312299183,0.02679321045503036,0.07933903758510646,0.09665096341465432,0.005460493967528013,0.1240020180122201,0.1743870560027555,0.03502660667032718,0.1161402732391113,0.00908720648918644,0.15832719246783677,0.1976599505832649,0.05831796162376364,0.15710660765394963,0.014543584167962599,0.13034075768277198,0.1648536472642994,0.015184895117651198,0.09265984166227687,0.1655285366074012,0.19747388529645443,0.0855846219378817,0.1296023449338004,0.0788819570278382,0.158216351581415,0.051186069403829616,0.03687812878405108,0.18888691663527,0.05410308524111569,0.1512102167866914,0.19270442228494977,0.11230200369914885,0.13574903426270865,0.17962923454653354,0.05825906198040505,0.024460524720522826,0.1206245509189675,0.12638323086485106,0.022285996372540185,0.030124574252852157,0.06588058446771083,0.029516144399929445,0.06391120235111596,0.17033772896858396,0.09147117833185106,0.18803873423398276,0.06558292054796881,0.14321650737958463,0.0033570816018231755,0.03238322905824025,0.12995376584744087,0.16007157876500902,0.10891050415299164,0.022717089363697075,0.10307243775574043,0.17793574472369977,0.02546562266833141,0.06856453713410314,0.0502037690147239,0.11254298842146429,0.07425964394903213,0.1866855009862226,0.0214276788434431,0.1192080081405595,0.025685374923938655,0.191462844918504,0.08074668977299143,0.0857199210087635,0.0413708187556114,0.006286995995007905,0.1876844846737098,0.1810752741681567,0.18535094546714778,0.12625308037077562,0.027978486691810512,0.18021202797035626,0.03292361764701517,0.19361172329274515,0.1921991142826976,0.178144547896631,0.035002211714095614,0.16173185108678367,0.1963033547110635,0.058153891021185844,0.09533621072785659,0.0060529886298518855,0.039855867062493645,0.1411843303640977,0.14927368151733017,0.04280327553437879,0.060727166010118606,0.02702978004476213,0.1286568041490785,0.1959332537031586,0.050995457487058894,0.04029458301672961,0.09511761165756663,0.006865554317682854,0.18595737767543305,0.08673972444719134,0.030294606869303478,0.021161072852414087,0.03661548202748053,0.1406288079593289,0.06405189037262274,0.06272293020580082,0.09924251286753401,0.15117289134365464,0.06582435183156594,0.0890466537982594,0.12857581118394684,0.03480608505536877,0.18625699070959076,0.008278346959315331,0.08604202377410478,0.05547518011000441,0.1615721762660247,0.1485738267899314,0.15752990995278038,0.07664535656279768,0.18990862681031367,0.006344544792727058,0.1813852381661997,0.1545600575488972,0.049966591462927305,0.1933929856374592,0.07019298972799462,0.0308212389603761,0.1925626889193222,0.061035551380937796,0.06964044401656487,0.016572426269401055,0.06018586400778765,0.03448438780731178,0.03965319580175102,0.05487193047958044,0.05241903282760743,0.08266950926449122,0.1841797565305953,0.013416085565428393,0.16853947167740047,0.06695100123267604,0.18109651670279164,0.07106151621963415,0.07514705598668053,0.0034917476959280603,0.1167830139724817,0.08208162306382727,0.0969401876823516,0.07248919995644014,0.12818762424198812,0.031216628915975476,0.16354075876070195,0.19643936837226514,0.1038108208409069,0.016993762117285982,0.05774286576312324,0.19797149632130343,0.0631805071337697,0.14133591345879556,0.1539126988014537,0.09898005755221653,0.17803458009488746,0.1705628443470437,0.007762877293174109,0.13805782326306187,0.07043668860663065,0.008244442884645764,0.031548088561901326,0.14263561893464693,0.11922297346837284,0.1317554462896596,0.19742135719363568,0.03447261732100935,0.15200972225005357,0.09261027905226552,0.07895202975579033,0.1666745735082183,0.05907928734432915,0.13311271924784718,0.08456036224174035,0.15687532043892838,0.07641545054585724,0.14313059767635955,0.04324976299360324,0.10042963202725597,0.18495627448683108,0.0730466722193837,0.07622426318901439,0.13253512766218623,0.18196047733960846,0.135318550619653,0.07428812581018392,0.14203020332193567,0.09534805639669629,0.10424342181815756,0.10530048886323332,0.06740974352169098,0.08373501540441289,0.08253217533427666,0.06562265513179955,0.003996699034866813,0.1428472053032362,0.19126122676849056,0.005859661671904304,0.0042766600073653295,0.08179419740797123,0.12953859708918652,0.07169997743787566,0.04053899879014429,0.058196719411058376,0.1368211649687711,0.02747305810696328,0.14293019339200264,0.0895147532827648,0.1852966979927213,0.08839207698047269,0.05368472337246497,0.1048329383728127,0.03703125726394276,0.16641202396893817,0.03026761104091427,0.05938437177632086,0.0477688073202549,0.18619799748187607,0.036108223078202564,0.1598336827952972,0.11069730214471628,0.04293945030545681,0.06434860370619555,0.13063375647506997,0.07065885990644892,0.15761086712569483,0.0996170735122087,0.1363163394332431,0.08193858100959783,0.1296349359381655,0.16087275294217737,0.01033814815360561,0.08105835504903927,0.09534289469333093,0.09600990894743325,0.029942421957101797,0.04624740740235973,0.020083716389219353,0.19008046603654108,0.07194474140729722,0.03375247716436141,0.1439379735405953,0.14917906641736214,0.06997556761383264,0.1358395066698153,0.05599059528152357,0.08088770610077876,0.15093478849322128,0.199624150125579,0.09776315223752419,0.05207991985401721,0.06933060996219904,0.16081992975398818,0.04750033728568379,0.08032902227503946,0.006754896060924409,0.09747383242025359,0.12775630022121157,0.14418051969987733,0.04808084295020794,0.03360704948159201,0.018324591049236984,0.09173684497337758,0.17250200138648086,0.08807954592972034,0.15484405724352543,0.09416060578175425,0.03678550326792647,0.0992504720072005,0.18721622954857772,0.06697777982417873,0.13438911643513096,0.13691601819372676,0.09137026336614991,0.07920750901748952,0.1759213115871571,0.09982905319720042,0.18864344530877752,0.03696803692708572,0.03168313812382078,0.18964635355345633,0.09147068537216888,0.1834534465991997,0.07136319392854894,0.11604659290270569,0.13544579901370032,0.04169286923935922,0.04850178436573463,0.05005443641739751,0.11909042499467373,0.0686735671584175,0.056728743350024584,0.00748384880315105,0.113618379279938,0.029506489764811496,0.03840981840627422,0.12960395917927028,0.19053660833519026,0.10038060657962587,0.13506396794713207,0.12865104674433492,0.051789471125242015,0.08547963976547278,0.08598921756785219,0.16241114307534096,0.11781720691138511,0.05244233384688655,0.026834625639121645,0.002212405070677237,0.1453812336548825,0.011094086295068008,0.1390543754687845,0.1069732473120964,0.10971810344108063,0.0287388896348471,0.10249939262427882,0.08624374455259542,0.03253893333756679,0.10019321132188247,0.031109115059663628,0.012111204286472256,0.16018317148131384,0.13115267836781386,0.06078463941743233,0.01324649646733902,0.1666765072948059,0.14764837408639306,0.11137794984313083,0.028000554704816372,0.00022528246226829476,0.18935583994626445,0.01628389228985556,0.09418864522421964,0.02777046471150979,0.004348561511426263,0.01263137915688497,0.07603936845818829,0.06430089627429632,0.12045531177121412,0.1324565791616917,0.1152624815477421,0.18826141796295978,0.040017442389892556,0.08090891974878987,0.19630208063402607,0.17404403991276976,0.13819479047023006,0.08198871736748542,0.07866257288913131,0.09054244164851566,0.09500341760450187,0.06504185950815011,0.12509159771458928,0.05796263141192486,0.05639988407656236,0.035136534647693465,0.15166692857971809,0.09958232661468132,0.005839752590958769,0.18106122186253973,0.19682941784588381,0.07491143815579769,0.13098139438454104,0.011010523470631785,0.08791856263733595,0.03035734620095485,0.18769954551844537,0.028047433527924073,0.19185577397972794,0.01516107576885073,0.10564562354952818,0.10578328573482723,0.05784543983491291,0.15775153121119018,0.13360331738181253,0.19657929150869669,0.14968138585149446,0.10816319208957942,0.15667233094500857,0.019194441396255882,0.16348498605368228,0.04977486260034128,0.19836382347912151,0.0840812688043176,0.08210131953219402,0.19227624685743658,0.15617363121024883,0.13062982066475298,0.10181715460672708,0.031574952357062,0.10724717937229725,0.1055351990949708,0.0745259269012121,0.0816330335947249,0.09908057166205012,0.1423326088586455,0.05399015563353174,0.0901481284836533,0.13615549556588227,0.16312500618762865,0.12943515081909607,0.049356944066443115,0.17940095029375522,0.04143354480998629,0.11172473190846831,0.0412042992834401,0.03253520808496107,0.12864692634868366,0.14340422246067042,0.03639492135842848,0.11250790723203266,0.05621280161348028,0.009831839663248056,0.16679701826436033,0.07928478697254754,0.02581490329819234,0.06128113490214804,0.11033970597058707,0.17844971046405927,0.11213966755891805,0.0334216844410383,0.14273540636186405,0.14934353901956238,0.05826182220116221,0.04437237105911347,0.05023197022370005,0.10282227958233832,0.09137805460802456,0.06874761286301592,0.11460780123249972,0.12223941340442171,0.08654227147123028,0.017756692107596627,0.09895036269669118,0.16697773175314917,0.16001870888046837,0.07640702053212478,0.04114911043830785,0.10393666642926368,0.10703077559993442,0.18359755338160078,0.15827575586722187,0.03182370219442512,0.04980754006113064,0.07922885698670519,0.16438506809916525,0.1638090301087959,0.044133762494600284,0.16587429826448363,0.10676187433244318,0.08238627948534334,0.07010645336765663,0.14170520495959607,0.08482904400944787,0.009757112864036889,0.18200219414714294,0.018738352627412923,0.00972044790084805,0.1563858641911396,0.1950561526752116,0.033134371503545305,0.16281630183707582,0.07588690755826973,0.12022086054592047,0.08360420256995234,0.15869193118838765,0.1771492157074646,0.037150320446460584,0.0217877453187191,0.1914450342500524,0.15841341737160822,0.06164451953567234,0.12249652853678938,0.005523169100974501,0.12161729139829941,0.08337679713908597,0.05045699210639812,0.010550829755334369,0.15486879318978813,0.06688575893993352,0.007636013260371666,0.09740298370784695,0.020512214810159125,0.0708443382673007,0.15738434709262836,0.08958817774791311,0.1687131160313205,0.18853353037282777,0.15333388793845437,0.08723411703545021,0.06625576535209454,0.02645332995510792,0.14328170216811378,0.10670058464679905,0.15740545601439204,0.021715760588952283,0.07546806038825543,0.1859288710327902,0.0534869595406156,0.09405928624122671,0.14038584056424722,0.1434270730161149,0.061131849861831095,0.12000794327965197,0.05044276924963778,0.19901659779927727,0.11573391358205401,0.16613879673464213,0.08491775043551525,0.025018549555786952,0.04121726481539292,0.04667106947828752,0.04653737244555796,0.05690858890876105,0.17062984310829976,0.030203483365529138,0.03321193933989668,0.08206533268332575,0.14967858315017077,0.1202876407814033,0.10761298848130992,0.01858047271538692,0.06455001680046034,0.07348447557215697,0.06594770336455716,0.18499362502058014,0.18487980043691393,0.05670984540548729,0.10780947266416274,0.11961289391143506,0.10888240229256621,0.18606013848162714,0.1489004874023477,0.08822966394182484,0.06952212247975242,0.15746991345747735,0.04043950281701876,0.053897496794466496,0.02778914456191637,0.05721032375485775,0.0011858738573324425,0.02215513092229551,0.05642282563799897,0.11035196206626292,0.0029936040043923476,0.15587598605745476,0.08615880339777462,0.16787892361256987,0.17202053796680086,0.19532856877514826,0.15222434998349718,0.17689213301320705,0.0635255381273142,0.08235202865649738,0.18607644362435832,0.1780056049448906,0.06877911974889384,0.16120640776867978,0.034884392705216614,0.1478799990309574,0.18190997155041666,0.18844601836496833,0.00016048078676971224,0.05853640597559356,0.013578575120878789,0.12634061094115365,0.003254946192246644,0.10449566935982896,0.15162072495173123,0.14807123239100495,0.1764020124410957,0.12536104314606084,0.07505568503050566,0.1133891752043545,0.10829158477712407,0.11919671493303335,0.13569838737454673,0.11008324215482293,0.14855888516645788,0.02071734689892959,0.16123054191913636,0.1348361414718542,0.10799860390633885,0.08019192429461985,0.15521729631591344,0.18185770087104564,0.062048658250127176,0.1348000831899114,0.14635922291040435,0.06173008146009749,0.1341565350372936,0.018219116946023385,0.09019748837481352,0.04152512745158479,0.1195896050145668,0.06563944085168148,0.04993644947916152,0.08342400469832989,0.19707797211187522,0.006804379504259339,0.003937668068792988,0.07007711375383985,0.08724468581008771,0.09384607213189727,0.09936350226573075,0.06481727566423322,0.09174486186247172,0.16032307874626608,0.16264683581402953,0.07487143350732843,0.1641076518961148,0.11408418020457455,0.049680375791446046,0.1389694276034926,0.03508469428727059,0.02882635775641953,0.0688864319459738,0.055534047414452205,0.08638961321227555,0.06420782747267344,0.13078116948800209,0.08004999496500181,0.18336071152297087,0.09333241880003956,0.16913161147761754,0.12367628201116068]}
},{}],156:[function(require,module,exports){
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
	var logpmf = factory( 20, 0.5 );
	t.equal( typeof logpmf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logpmf;
	var y;

	logpmf = factory( 20.0, 0.5 );
	y = logpmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( NaN, 0.5 );
	y = logpmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( 20.0, NaN );
	y = logpmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( NaN, NaN );
	y = logpmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( NaN, NaN );
	y = logpmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `r` and `p`, the function returns a function which returns `-Infinity` for negative integers `x`', function test( t ) {
	var logpmf;
	var y;

	logpmf = factory( 20.0, 0.5 );
	y = logpmf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( -20.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( -10.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( -1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a valid `r` and `p`, the function returns a function which returns `-Infinity` when provided a non-integer for `x`', function test( t ) {
	var logpmf;
	var y;

	logpmf = factory( 20.0, 0.5 );
	y = logpmf( -2.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( -1.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( 1.2 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a success probability `p` outside `(0,1]`, the created function always returns `NaN`', function test( t ) {
	var logpmf;
	var y;

	logpmf = factory( 20, 1.2 );

	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( 20, 0.0 );
	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( 20, -0.1 );
	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( 20, NINF );
	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( 20, PINF );
	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a `r` which is not a positive number, the created function always returns `NaN`', function test( t ) {
	var logpmf;
	var y;

	logpmf = factory( -1.0, 0.5 );

	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( -2.0, 0.5 );
	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( NINF, 0.5 );
	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logpmf for `x` given large `r` and `p`', function test( t ) {
	var expected;
	var logpmf;
	var delta;
	var tol;
	var x;
	var r;
	var p;
	var y;
	var i;

	expected = highHigh.expected;
	x = highHigh.x;
	r = highHigh.r;
	p = highHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		logpmf = factory( r[i], p[i] );
		y = logpmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 80.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. r: '+r[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpmf for `x` given a large parameter `r` and small `p`', function test( t ) {
	var expected;
	var logpmf;
	var delta;
	var tol;
	var i;
	var r;
	var p;
	var x;
	var y;

	expected = highSmall.expected;
	x = highSmall.x;
	r = highSmall.r;
	p = highSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		logpmf = factory( r[i], p[i] );
		y = logpmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 10.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. r: '+r[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpmf for `x` given small `r` and large parameter `p`', function test( t ) {
	var expected;
	var logpmf;
	var delta;
	var tol;
	var i;
	var r;
	var p;
	var x;
	var y;

	expected = smallHigh.expected;
	x = smallHigh.x;
	r = smallHigh.r;
	p = smallHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		logpmf = factory( r[i], p[i] );
		y = logpmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 40.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. r: '+r[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpmf for `x` given small `r` and `p`', function test( t ) {
	var expected;
	var logpmf;
	var delta;
	var tol;
	var i;
	var r;
	var p;
	var x;
	var y;

	expected = smallSmall.expected;
	x = smallSmall.x;
	r = smallSmall.r;
	p = smallSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		logpmf = factory( r[i], p[i] );
		y = logpmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 10.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. r: '+r[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/negative-binomial/logpmf/test/test.factory.js")
},{"./../lib/factory.js":147,"./fixtures/julia/high_high.json":152,"./fixtures/julia/high_small.json":153,"./fixtures/julia/small_high.json":154,"./fixtures/julia/small_small.json":155,"@stdlib/constants/float64/eps":43,"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":76,"tape":291}],157:[function(require,module,exports){
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
var logpmf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpmf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logpmf` functions', function test( t ) {
	t.equal( typeof logpmf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/negative-binomial/logpmf/test/test.js")
},{"./../lib":150,"tape":291}],158:[function(require,module,exports){
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
var logpmf = require( './../lib' );


// FIXTURES //

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallHigh = require( './fixtures/julia/small_high.json' );
var highSmall = require( './fixtures/julia/high_small.json' );
var highHigh = require( './fixtures/julia/high_high.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpmf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpmf( NaN, 20.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpmf( 0.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpmf( 0.0, 20.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a negative integer for `x` and a valid `r` and `p`, the function returns `-Infinity`', function test( t ) {
	var y = logpmf( NINF, 20, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( -20.0, 20, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( -100.0, 20, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( -1.0, 20, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a non-integer for `x` and a valid `r` and `p`, the function returns `-Infinity`', function test( t ) {
	var y = logpmf( -1.5, 20.0, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( -0.5, 20.0, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( 1.5, 20.0, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( 2.5, 20.0, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided `r` which is not a positive number, the function returns `NaN`', function test( t ) {
	var y;

	y = logpmf( 2.0, -0.5, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpmf( 0.0, -1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpmf( 2.0, NINF, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a success probability `p` outside of `[0,1]`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpmf( 2.0, 20, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpmf( 0.0, 20, 1.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpmf( 2.0, 20, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpmf( 2.0, 20, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logpmf for `x` given large `r` and `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var r;
	var p;
	var x;
	var y;

	expected = highHigh.expected;
	x = highHigh.x;
	r = highHigh.r;
	p = highHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		y = logpmf( x[i], r[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 80.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. r: '+r[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpmf for `x` given large parameter `r` and small `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var r;
	var p;
	var x;
	var y;

	expected = highSmall.expected;
	x = highSmall.x;
	r = highSmall.r;
	p = highSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		y = logpmf( x[i], r[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 10.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. r: '+r[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpmf for `x` given small `r` and large `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var r;
	var p;
	var x;
	var y;

	expected = smallHigh.expected;
	x = smallHigh.x;
	r = smallHigh.r;
	p = smallHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		y = logpmf( x[i], r[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 40.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. r: '+r[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpmf for `x` given small `r` and `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var r;
	var p;
	var x;
	var y;

	expected = smallSmall.expected;
	x = smallSmall.x;
	r = smallSmall.r;
	p = smallSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		y = logpmf( x[i], r[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 10.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. r: '+r[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/negative-binomial/logpmf/test/test.logpmf.js")
},{"./../lib":150,"./fixtures/julia/high_high.json":152,"./fixtures/julia/high_small.json":153,"./fixtures/julia/small_high.json":154,"./fixtures/julia/small_small.json":155,"@stdlib/constants/float64/eps":43,"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":76,"tape":291}],159:[function(require,module,exports){
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

},{"./is_number.js":162}],160:[function(require,module,exports){
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

},{"./is_number.js":162,"./zero_pad.js":166}],161:[function(require,module,exports){
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

},{"./main.js":164}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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

},{"./format_double.js":159,"./format_integer.js":160,"./is_string.js":163,"./space_pad.js":165,"./zero_pad.js":166}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{"./main.js":168}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{"./main.js":171}],170:[function(require,module,exports){
arguments[4][163][0].apply(exports,arguments)
},{"dup":163}],171:[function(require,module,exports){
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

},{"./is_string.js":170,"@stdlib/string/base/format-interpolate":161,"@stdlib/string/base/format-tokenize":167}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],173:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":172}],174:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":175}],175:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":179}],176:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
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

},{"./define_property.js":177}],179:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":176,"./has_define_property_support.js":178,"./polyfill.js":180}],180:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":169}],181:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":182,"./polyfill.js":183,"@stdlib/assert/has-tostringtag-support":20}],182:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":184}],183:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":184,"./tostringtag.js":185,"@stdlib/assert/has-own-property":16}],184:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],185:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){

},{}],188:[function(require,module,exports){
arguments[4][187][0].apply(exports,arguments)
},{"dup":187}],189:[function(require,module,exports){
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
},{"base64-js":186,"buffer":189,"ieee754":277}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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
},{"_process":283}],192:[function(require,module,exports){
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

},{"events":190,"inherits":278,"readable-stream/lib/_stream_duplex.js":194,"readable-stream/lib/_stream_passthrough.js":195,"readable-stream/lib/_stream_readable.js":196,"readable-stream/lib/_stream_transform.js":197,"readable-stream/lib/_stream_writable.js":198,"readable-stream/lib/internal/streams/end-of-stream.js":202,"readable-stream/lib/internal/streams/pipeline.js":204}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
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
},{"./_stream_readable":196,"./_stream_writable":198,"_process":283,"inherits":278}],195:[function(require,module,exports){
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
},{"./_stream_transform":197,"inherits":278}],196:[function(require,module,exports){
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
},{"../errors":193,"./_stream_duplex":194,"./internal/streams/async_iterator":199,"./internal/streams/buffer_list":200,"./internal/streams/destroy":201,"./internal/streams/from":203,"./internal/streams/state":205,"./internal/streams/stream":206,"_process":283,"buffer":189,"events":190,"inherits":278,"string_decoder/":290,"util":187}],197:[function(require,module,exports){
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
},{"../errors":193,"./_stream_duplex":194,"inherits":278}],198:[function(require,module,exports){
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
},{"../errors":193,"./_stream_duplex":194,"./internal/streams/destroy":201,"./internal/streams/state":205,"./internal/streams/stream":206,"_process":283,"buffer":189,"inherits":278,"util-deprecate":299}],199:[function(require,module,exports){
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
},{"./end-of-stream":202,"_process":283}],200:[function(require,module,exports){
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
},{"buffer":189,"util":187}],201:[function(require,module,exports){
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
},{"_process":283}],202:[function(require,module,exports){
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
},{"../../../errors":193}],203:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],204:[function(require,module,exports){
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
},{"../../../errors":193,"./end-of-stream":202}],205:[function(require,module,exports){
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
},{"../../../errors":193}],206:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":190}],207:[function(require,module,exports){
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

},{"./":208,"get-intrinsic":272}],208:[function(require,module,exports){
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

},{"function-bind":271,"get-intrinsic":272}],209:[function(require,module,exports){
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

},{"./lib/is_arguments.js":210,"./lib/keys.js":211}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],212:[function(require,module,exports){
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

},{"has-property-descriptors":273,"object-keys":281}],213:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],214:[function(require,module,exports){
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

},{"./ToNumber":244,"./ToPrimitive":246,"./Type":251}],215:[function(require,module,exports){
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

},{"../helpers/isFinite":260,"../helpers/isNaN":262,"../helpers/isPrefixOf":263,"./ToNumber":244,"./ToPrimitive":246,"./Type":251,"get-intrinsic":272}],216:[function(require,module,exports){
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

},{"get-intrinsic":272}],217:[function(require,module,exports){
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

},{"./DayWithinYear":220,"./InLeapYear":224,"./MonthFromTime":234,"get-intrinsic":272}],218:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":267,"./floor":255}],219:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":255}],220:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":218,"./DayFromYear":219,"./YearFromTime":253}],221:[function(require,module,exports){
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

},{"./modulo":256}],222:[function(require,module,exports){
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

},{"../helpers/assertRecord":259,"./IsAccessorDescriptor":225,"./IsDataDescriptor":227,"./Type":251,"get-intrinsic":272}],223:[function(require,module,exports){
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

},{"../helpers/timeConstants":267,"./floor":255,"./modulo":256}],224:[function(require,module,exports){
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

},{"./DaysInYear":221,"./YearFromTime":253,"get-intrinsic":272}],225:[function(require,module,exports){
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

},{"../helpers/assertRecord":259,"./Type":251,"has":276}],226:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":279}],227:[function(require,module,exports){
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

},{"../helpers/assertRecord":259,"./Type":251,"has":276}],228:[function(require,module,exports){
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

},{"../helpers/assertRecord":259,"./IsAccessorDescriptor":225,"./IsDataDescriptor":227,"./Type":251}],229:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":264,"./IsAccessorDescriptor":225,"./IsDataDescriptor":227,"./Type":251}],230:[function(require,module,exports){
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

},{"../helpers/isFinite":260,"../helpers/timeConstants":267}],231:[function(require,module,exports){
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

},{"../helpers/isFinite":260,"./DateFromTime":217,"./Day":218,"./MonthFromTime":234,"./ToInteger":243,"./YearFromTime":253,"./floor":255,"./modulo":256,"get-intrinsic":272}],232:[function(require,module,exports){
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

},{"../helpers/isFinite":260,"../helpers/timeConstants":267,"./ToInteger":243}],233:[function(require,module,exports){
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

},{"../helpers/timeConstants":267,"./floor":255,"./modulo":256}],234:[function(require,module,exports){
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

},{"./DayWithinYear":220,"./InLeapYear":224}],235:[function(require,module,exports){
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

},{"../helpers/isNaN":262}],236:[function(require,module,exports){
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

},{"../helpers/timeConstants":267,"./floor":255,"./modulo":256}],237:[function(require,module,exports){
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

},{"./Type":251}],238:[function(require,module,exports){
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


},{"../helpers/isFinite":260,"./ToNumber":244,"./abs":254,"get-intrinsic":272}],239:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":267,"./DayFromYear":219}],240:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":267,"./modulo":256}],241:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],242:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":244}],243:[function(require,module,exports){
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

},{"../helpers/isFinite":260,"../helpers/isNaN":262,"../helpers/sign":266,"./ToNumber":244,"./abs":254,"./floor":255}],244:[function(require,module,exports){
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

},{"./ToPrimitive":246}],245:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":216,"get-intrinsic":272}],246:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":268}],247:[function(require,module,exports){
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

},{"./IsCallable":226,"./ToBoolean":241,"./Type":251,"get-intrinsic":272,"has":276}],248:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":272}],249:[function(require,module,exports){
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

},{"../helpers/isFinite":260,"../helpers/isNaN":262,"../helpers/sign":266,"./ToNumber":244,"./abs":254,"./floor":255,"./modulo":256}],250:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":244}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":218,"./modulo":256}],253:[function(require,module,exports){
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

},{"call-bind/callBound":207,"get-intrinsic":272}],254:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":272}],255:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],256:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":265}],257:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":267,"./modulo":256}],258:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":214,"./5/AbstractRelationalComparison":215,"./5/CheckObjectCoercible":216,"./5/DateFromTime":217,"./5/Day":218,"./5/DayFromYear":219,"./5/DayWithinYear":220,"./5/DaysInYear":221,"./5/FromPropertyDescriptor":222,"./5/HourFromTime":223,"./5/InLeapYear":224,"./5/IsAccessorDescriptor":225,"./5/IsCallable":226,"./5/IsDataDescriptor":227,"./5/IsGenericDescriptor":228,"./5/IsPropertyDescriptor":229,"./5/MakeDate":230,"./5/MakeDay":231,"./5/MakeTime":232,"./5/MinFromTime":233,"./5/MonthFromTime":234,"./5/SameValue":235,"./5/SecFromTime":236,"./5/StrictEqualityComparison":237,"./5/TimeClip":238,"./5/TimeFromYear":239,"./5/TimeWithinDay":240,"./5/ToBoolean":241,"./5/ToInt32":242,"./5/ToInteger":243,"./5/ToNumber":244,"./5/ToObject":245,"./5/ToPrimitive":246,"./5/ToPropertyDescriptor":247,"./5/ToString":248,"./5/ToUint16":249,"./5/ToUint32":250,"./5/Type":251,"./5/WeekDay":252,"./5/YearFromTime":253,"./5/abs":254,"./5/floor":255,"./5/modulo":256,"./5/msFromTime":257}],259:[function(require,module,exports){
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

},{"./isMatchRecord":261,"get-intrinsic":272,"has":276}],260:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],261:[function(require,module,exports){
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

},{"has":276}],262:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],263:[function(require,module,exports){
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

},{"call-bind/callBound":207}],264:[function(require,module,exports){
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

},{"get-intrinsic":272,"has":276}],265:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],266:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],267:[function(require,module,exports){
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

},{}],268:[function(require,module,exports){
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

},{"./helpers/isPrimitive":269,"is-callable":279}],269:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],270:[function(require,module,exports){
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

},{}],271:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":270}],272:[function(require,module,exports){
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

},{"function-bind":271,"has":276,"has-symbols":274}],273:[function(require,module,exports){
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

},{"get-intrinsic":272}],274:[function(require,module,exports){
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

},{"./shams":275}],275:[function(require,module,exports){
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

},{}],276:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":271}],277:[function(require,module,exports){
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

},{}],278:[function(require,module,exports){
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

},{}],279:[function(require,module,exports){
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

},{}],280:[function(require,module,exports){
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

},{"./isArguments":282}],281:[function(require,module,exports){
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

},{"./implementation":280,"./isArguments":282}],282:[function(require,module,exports){
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

},{}],283:[function(require,module,exports){
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

},{}],284:[function(require,module,exports){
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
},{"_process":283,"through":297,"timers":298}],285:[function(require,module,exports){
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

},{"buffer":189}],286:[function(require,module,exports){
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

},{"es-abstract/es5":258,"function-bind":271}],287:[function(require,module,exports){
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

},{"./implementation":286,"./polyfill":288,"./shim":289,"define-properties":212,"function-bind":271}],288:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":286}],289:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":288,"define-properties":212}],290:[function(require,module,exports){
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
},{"safe-buffer":285}],291:[function(require,module,exports){
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
},{"./lib/default_stream":292,"./lib/results":294,"./lib/test":295,"_process":283,"defined":213,"through":297,"timers":298}],292:[function(require,module,exports){
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
},{"_process":283,"fs":188,"through":297}],293:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":283,"timers":298}],294:[function(require,module,exports){
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
},{"_process":283,"events":190,"function-bind":271,"has":276,"inherits":278,"object-inspect":296,"resumer":284,"through":297,"timers":298}],295:[function(require,module,exports){
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
},{"./next_tick":293,"deep-equal":209,"defined":213,"events":190,"has":276,"inherits":278,"path":191,"string.prototype.trim":287}],296:[function(require,module,exports){
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

},{}],297:[function(require,module,exports){
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
},{"_process":283,"stream":192}],298:[function(require,module,exports){
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
},{"process/browser.js":283,"timers":298}],299:[function(require,module,exports){
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
},{}]},{},[156,157,158]);
