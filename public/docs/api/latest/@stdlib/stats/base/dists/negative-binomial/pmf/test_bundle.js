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

},{"@stdlib/utils/native-class":168}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":168}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":168}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":168}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/from-words":126,"@stdlib/number/float64/base/get-high-word":130,"@stdlib/number/float64/base/to-words":141}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./copysign.js":80}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

var ldexp = require( './ldexp.js' );


// EXPORTS //

module.exports = ldexp;

},{"./ldexp.js":95}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":44,"@stdlib/constants/float64/max-base2-exponent":50,"@stdlib/constants/float64/max-base2-exponent-subnormal":49,"@stdlib/constants/float64/min-base2-exponent-subnormal":52,"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/copysign":81,"@stdlib/number/float64/base/exponent":124,"@stdlib/number/float64/base/from-words":126,"@stdlib/number/float64/base/normalize":132,"@stdlib/number/float64/base/to-words":141}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
arguments[4][85][0].apply(exports,arguments)
},{"dup":85}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-odd":72,"@stdlib/math/base/special/copysign":81}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var ibetaDerivative = require( './ibeta_derivative.js' );


// MAIN //

/**
* Returns a function for evaluating the probability mass function (PMF) for a negative binomial distribution with number of successes until experiment is stopped `r` and success probability `p`.
*
* @param {PositiveNumber} r - number of successes until experiment is stopped
* @param {Probability} p - success probability
* @returns {Function} PMF
*
* @example
* var pmf = factory( 10, 0.5 );
* var y = pmf( 3.0 );
* // returns ~0.027
*
* y = pmf( 5.0 );
* // returns ~0.061
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
	return pmf;

	/**
	* Evaluates the probability mass function (PMF) for a negative binomial distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated PMF
	*
	* @example
	* var y = pmf( 2.0 );
	* // returns <number>
	*/
	function pmf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( !isNonNegativeInteger( x ) ) {
			return 0.0;
		}
		return ( p / ( r + x ) ) * ibetaDerivative( p, r, x + 1.0 );
	}
}


// EXPORTS //

module.exports = factory;

},{"./ibeta_derivative.js":148,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-nonnegative-integer":70,"@stdlib/utils/constant-function":160}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Negative binomial distribution probability mass function (PMF).
*
* @module @stdlib/stats/base/dists/negative-binomial/pmf
*
* @example
* var pmf = require( '@stdlib/stats/base/dists/negative-binomial/pmf' );
*
* var y = pmf( 5.0, 20.0, 0.8 );
* // returns ~0.157
*
* y = pmf( 21.0, 20.0, 0.5 );
* // returns ~0.06
*
* y = pmf( 5.0, 10.0, 0.4 );
* // returns ~0.016
*
* y = pmf( 0.0, 10.0, 0.9 );
* // returns ~0.349
*
* y = pmf( 21.0, 15.5, 0.5 );
* // returns ~0.037
*
* y = pmf( 5.0, 7.4, 0.4 );
* // returns ~0.051
*
* var mypmf = pmf.factory( 10, 0.5 );
* y = mypmf( 3.0 );
* // returns ~0.027
*
* y = mypmf( 5.0 );
* // returns ~0.061
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var pmf = require( './pmf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pmf, 'factory', factory );


// EXPORTS //

module.exports = pmf;

},{"./factory.js":147,"./pmf.js":151,"@stdlib/utils/define-nonenumerable-read-only-property":161}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ibetaDerivative = require( './ibeta_derivative.js' );


// MAIN //

/**
* Evaluates the probability mass function (PMF) for a negative binomial distribution with number of successes until experiment is stopped `r` and success probability `p`.
*
* @param {number} x - input value
* @param {PositiveNumber} r - number of successes until experiment is stopped
* @param {Probability} p - success probability
* @returns {Probability} evaluated PMF
*
* @example
* var y = pmf( 5.0, 20.0, 0.8 );
* // returns ~0.157
*
* @example
* var y = pmf( 21.0, 20.0, 0.5 );
* // returns ~0.06
*
* @example
* var y = pmf( 5.0, 10.0, 0.4 );
* // returns ~0.016
*
* @example
* var y = pmf( 0.0, 10.0, 0.9 );
* // returns ~0.349
*
* @example
* var y = pmf( 21.0, 15.5, 0.5 );
* // returns ~0.037
*
* @example
* var y = pmf( 5.0, 7.4, 0.4 );
* // returns ~0.051
*
* @example
* var y = pmf( 2.0, 0.0, 0.5 );
* // returns NaN
*
* @example
* var y = pmf( 2.0, -2.0, 0.5 );
* // returns NaN
*
* @example
* var y = pmf( 2.0, 20, -1.0 );
* // returns NaN
*
* @example
* var y = pmf( 2.0, 20, 1.5 );
* // returns NaN
*
* @example
* var y = pmf( NaN, 20.0, 0.5 );
* // returns NaN
*
* @example
* var y = pmf( 0.0, NaN, 0.5 );
* // returns NaN
*
* @example
* var y = pmf( 0.0, 20.0, NaN );
* // returns NaN
*/
function pmf( x, r, p ) {
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
		return 0.0;
	}
	return ( p / ( r + x ) ) * ibetaDerivative( p, r, x + 1.0 );
}


// EXPORTS //

module.exports = pmf;

},{"./ibeta_derivative.js":148,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-nonnegative-integer":70}],152:[function(require,module,exports){
module.exports={"expected":[1.770145903071019e-5,4.2641679641092456e-10,2.7996410138381366e-22,7.45772604913309e-14,0.02672122150611832,1.477759778463009e-118,8.839583545751535e-16,3.176209366291998e-33,3.413184157840988e-17,6.977016658542974e-20,3.1531519352581216e-10,7.631753908881297e-26,5.340696666686725e-8,7.459685310819085e-12,1.471491972350788e-50,0.006860230641415225,9.286357841140146e-36,1.7669736759110473e-6,1.0663264492705299e-10,2.064102586057684e-102,1.6735475597029174e-8,3.159999104293548e-36,0.0016885979465414518,2.148112845698494e-50,1.8942719023975104e-53,0.0879436220488133,6.6578317835020205e-121,0.0008920579055138189,0.025708207754173835,0.0016570960846792047,1.1471175534085028e-28,2.3302117621975945e-10,9.900644992575192e-9,5.502934145251936e-52,6.914737481989445e-16,2.0850788927235346e-11,0.00022699858257716835,0.003139812354855223,1.459903664108736e-13,6.1711017601223975e-19,2.9369504660564395e-5,1.8496160608589694e-26,4.8921945707996644e-17,2.1993829404185926e-38,1.648840409914634e-17,0.010485612549344544,9.09169367560386e-23,5.24193646098691e-61,1.8635988208273294e-10,1.226161639607206e-5,0.007098302560971316,0.0023421123630059312,0.004969770766499276,1.6060982432114222e-17,4.078536288527633e-19,9.711765105738758e-12,1.8947615734335564e-27,2.762843780342093e-11,9.515687267790695e-10,1.2385540709038314e-47,0.0117356648440854,1.9188606447778958e-70,0.00014900125112840058,4.0752892820337465e-20,0.016538610744603874,2.6793875888895666e-25,6.755113534886028e-17,1.055176037153427e-33,7.052704579074154e-20,1.4095752784099625e-41,1.7993553689085022e-15,0.0003515909158376408,0.02710509681338736,1.7486865142802561e-25,0.03333435973100197,1.7966249078627217e-52,0.06406737428063661,9.089451438296475e-20,2.3334764036966762e-83,0.009628904308458032,1.5962665992745174e-16,1.1091616910187099e-44,2.0473302127036508e-15,0.08454193475429388,0.01553324149955754,1.3142779230688245e-10,5.210347305953643e-31,0.00583385261428443,1.7840867587929755e-25,1.7716938388459995e-19,1.2869809025840136e-32,4.645109256731311e-15,0.2420620929891498,0.0001035034543188136,1.1438986157175933e-22,1.717052197063313e-88,0.19584577733991673,1.4626524250299444e-16,0.004864810549129459,1.9513719085901092e-5,0.03496802761848664,4.201732222065737e-20,2.7540976174853338e-45,0.00046968469258616837,2.0552319776327517e-20,9.716231819422743e-58,2.207570634716481e-62,1.7551377532916088e-45,0.0011563932483141858,1.882752782058126e-87,8.956018034320837e-8,1.2849524230673883e-6,3.410603151728314e-10,5.36395635927402e-23,5.242140478735419e-23,4.757687542621941e-108,1.809647717417627e-23,6.213596346464874e-30,3.819616135806171e-39,2.2163744538583274e-26,2.1005440239650416e-57,2.3129388374517923e-17,0.004374769080932482,5.048191212619062e-6,1.7375860818751663e-7,0.09000808654441018,6.207508265943563e-14,0.011545549388947307,0.1261844706501742,1.3721177265133427e-24,3.3186723044020775e-29,0.013676413664947255,0.00011638880678826754,4.124115323415147e-13,2.1985559829253866e-14,4.461330082790318e-30,0.08849587280520806,3.2417777314637176e-21,0.10708505546928884,5.72377600465766e-13,3.8287115800089616e-19,2.54238293194957e-16,1.8650346761551937e-69,1.83526197616046e-27,0.000840451592084772,1.8114040227689325e-26,1.5625627197269615e-22,0.08405983880904273,8.215611470631876e-18,2.5712778418901807e-8,9.512144578371037e-47,7.938159542890537e-24,6.569399788235721e-15,1.1597377767968812e-17,2.325776485827365e-19,1.50040882582968e-39,0.0009785266784653585,8.979051731631609e-42,3.057189110885585e-26,0.10474725432451201,1.8032664819505976e-51,5.7579474671158135e-12,0.06553267157911902,5.7438824998189094e-12,6.504229129010241e-38,2.390513907049936e-31,1.4420280256582396e-21,6.850447956365559e-9,1.0965091582060502e-23,2.1097654524397122e-39,2.4329775240743043e-23,1.4914658509638091e-21,1.78190920605125e-15,1.5418630297291266e-6,0.029046146745876238,0.002086508478871966,1.3722058971562015e-25,3.047372640616817e-50,3.767583624945997e-36,3.745246463565009e-52,9.074424746888242e-51,1.1443658452561793e-33,1.3909509657103708e-12,2.1970435975021633e-111,3.00964421849578e-54,0.11551431272336565,6.86830508828258e-16,2.2450900402821953e-23,8.415160734518598e-36,0.11837279049527542,5.560115000020636e-80,1.5200814159024754e-26,4.914129152810616e-18,1.1015247546246006e-77,1.4905552482629054e-25,0.006340737295034412,8.898343253200209e-14,0.09849669355889647,3.427750225377772e-63,8.167427238631171e-17,9.022039664571084e-127,4.0357571634115053e-50,0.09012099481663412,2.54048509239692e-15,0.02610705186392689,0.0002912604855432663,1.7079076720931308e-33,0.009738749972367716,7.665726969696249e-100,7.20216136599556e-36,1.7698100663071708e-41,1.6677556974089545e-79,4.418148958953903e-20,0.010622659931733029,1.3854685744848862e-27,2.377109265022779e-46,0.122956785285573,4.4191147649576163e-5,4.7627613285248737e-35,1.1508372936609708e-27,4.2827515117103064e-6,1.3418330052842782e-23,9.604509351307557e-23,6.724100097187343e-17,0.005110215431980063,1.3651750997967704e-8,3.0650754183321073e-6,0.005254295873870856,1.3104363204962684e-29,3.267239607570447e-23,3.4610812434582515e-13,1.6721645792909736e-5,5.651161072083322e-19,5.675057994583049e-18,2.636521617653191e-13,0.08226693320392012,0.0030768418512633843,0.0014397546924910275,0.051674461510113755,0.013836579931185712,5.380241150772922e-72,9.843802843190419e-27,6.908842993507764e-26,6.919640617807531e-36,1.0517022162316407e-19,2.4735247964978507e-20,0.014574917350322661,2.074235137954878e-16,0.0007939213487380678,3.365502977377704e-11,0.03044787403848305,4.719088903217959e-38,1.0058854240777234e-18,0.11552282857517981,1.1479739686987451e-17,0.04855048051408486,4.535395721555125e-6,7.727140798225625e-56,5.733053176852695e-17,3.6753741027507494e-41,1.612628914271763e-7,2.492353661935346e-21,9.087124573631869e-54,0.05395497713239691,7.901802847099665e-17,5.249674132494805e-26,3.5699802208462015e-74,5.744286571041401e-82,0.00012855600317255374,6.033037043005165e-5,1.2571282972706617e-20,2.7139039731553316e-43,1.5280972241228953e-21,5.524983018887875e-48,9.061629112949979e-12,5.223854621831516e-60,0.0012559793858861028,6.992742935531121e-40,0.13044112697348043,4.965267032272452e-30,8.171710994104825e-9,0.0710235765357741,0.0019205682242421336,1.0328697435208655e-49,5.262261198249062e-12,9.026164665023118e-92,3.686688761910559e-22,1.7182916259932602e-7,9.002784257307346e-46,0.005097314920675076,2.087999288312056e-25,1.372814044047591e-11,1.6753225611960213e-23,3.3962645699162976e-14,9.811685801535095e-24,5.952877530009543e-41,0.021249685351469927,1.6223352004973562e-111,3.258171702117818e-58,3.505293475168407e-16,6.169661083822612e-7,3.1109828316428674e-34,2.932130549129758e-13,3.0701258499169275e-8,0.14034780514641074,5.297357825572961e-35,0.11522733363470697,8.30643544633264e-8,8.952264712707753e-13,0.0023516683828010768,9.619678397858865e-90,0.027942321942998512,3.6795966298417875e-32,2.015721491289482e-6,2.218232478100973e-5,3.9042862139655907e-31,5.747683159278802e-110,1.558140929231804e-24,2.192285455417294e-96,9.326154916382063e-16,4.530607741994898e-62,1.6297669034070517e-13,0.08232495983058477,3.8254845593437874e-6,4.503649062364151e-20,0.05397927059420104,1.0647597168375582e-9,2.493819752547445e-41,0.0024227143709392406,3.577263401805411e-6,5.422145561763417e-46,3.55554712635369e-19,1.1503121864534138e-16,9.082194353803436e-23,3.010348277287428e-9,2.3877522806662045e-13,7.044717981637315e-103,1.7335444198384213e-83,8.652759991298073e-7,4.8602589320378035e-39,7.059231183562947e-25,4.887489969355822e-22,9.974480890573095e-25,2.6999199800339676e-9,8.779831533518688e-31,5.726844595513734e-16,0.26424508649888256,2.4759560887145415e-25,2.4661219765239738e-21,1.477103833813596e-15,0.10897071996027691,4.034858869734583e-51,0.08888196253790315,0.005796519869425777,1.383199405542963e-16,2.9044293520204906e-24,7.525600475787038e-7,0.05780846522997866,5.808254558654487e-6,2.2616674089004338e-10,2.6640616144137937e-6,0.06397103868234039,0.029630355187966792,2.4738703413397145e-8,0.03316644649745999,4.700827011934321e-6,0.00022808844637996092,0.0005853417725219912,0.004589803136323546,4.5053818981771874e-116,1.1269244239437473e-17,6.907451595001968e-38,4.3907295495323416e-38,1.457266360179014e-8,2.066169175794095e-35,4.03480057066333e-74,8.783448873550511e-70,3.6086355090333744e-27,1.5657703944006776e-23,1.076756551771965e-12,1.8814411253007928e-7,3.472046556874648e-12,1.271754034459774e-13,7.433943430365791e-79,5.985183615466624e-26,0.15396290822130643,0.006836881905827267,0.00030438406232326964,1.0451393459721756e-147,0.08849856787798786,7.62516627714442e-29,3.117405430380521e-57,1.2489502350021695e-13,1.5270078594609998e-5,7.506411321539596e-5,3.2315271411916727e-25,3.318583932669325e-34,0.06288226401898313,0.07403871326295607,5.547102535795289e-9,1.0116348057158967e-10,1.5164811438453176e-13,4.5661150452262767e-23,7.395638644798677e-178,2.2519141071361403e-27,1.9455321318980747e-5,1.5674325714067346e-32,6.1108094358978274e-33,0.003995513341496877,6.37379643550198e-17,3.6132642238188203e-33,1.6929439825376678e-51,3.056625145133208e-23,1.5098996788431702e-22,6.813977979400525e-15,5.909410410266397e-51,6.491893506592554e-15,3.6501656736166756e-9,3.514495652886293e-22,1.2857556956771519e-17,1.019308368170585e-59,2.5103490211864946e-36,4.400436365528815e-34,0.0031361832117269184,0.04167050613491778,1.4383391478131902e-8,8.724547669006897e-35,6.842050663522522e-12,0.00048028105748161766,0.004109793543226898,1.1772598818443127e-33,0.1336782973471637,5.3113725535047024e-5,0.05398128955826313,1.52836155147567e-39,2.8208725867718058e-52,0.22234926105694297,0.0018350205618885632,0.0007352642861536842,1.9747796371965022e-9,5.196599841565441e-47,0.02795958419955307,0.06176690518573624,0.002897799718264701,5.558727667986832e-80,8.51276469278676e-8,6.584336869926913e-45,1.2500709266342964e-8,3.825281445741671e-76,5.600703382323524e-7,1.229003010219642e-65,2.3892552649603415e-6,1.3216284622504327e-64,3.2945844123875832e-21,1.7334584943355956e-43,0.0007927491195334845,0.08641693169419588,6.83144820816199e-10,3.7630023989295375e-10,0.002535003777927549,4.213253656893878e-5,3.035433911279042e-76,5.119777262326378e-53,2.0407750848599699e-22,1.0514471252087397e-11,0.3234735277558753,0.0014390892423834752,0.07872728018699676,7.669602064227536e-27,1.0932905643092858e-49,1.4266749466213083e-9,3.073048922099854e-36,3.714786800782949e-16,1.4230290930260487e-12,5.873027703035332e-18,1.3753722487907586e-40,3.455785303087276e-20,4.483121910870879e-18,0.0027277575848078796,4.9019104553021175e-5,0.08967530055483598,7.494391771763483e-69,6.154545573581024e-66,2.7355130222788096e-34,6.021788961188044e-30,1.9127350157037759e-143,0.0029734306061329875,0.009110126003334374,2.3526924559320542e-17,0.03512131695426086,5.168616705504491e-97,0.015583113013520958,1.7180491390138024e-12,8.674157438922884e-35,6.621276261088389e-13,0.005251143176768312,3.6550927867459412e-9,4.1723704291616715e-31,1.142752632345912e-16,1.6155262530631192e-12,1.3205185207423535e-20,1.2541053726157963e-76,1.482264399907832e-48,0.19290247384390619,0.00010948945851647846,7.171114538498018e-35,1.2644815895289462e-48,6.527744409909963e-17,5.245680183853817e-57,0.0005506991462468613,0.023641514907549097,3.6123718282089314e-41,0.0009799227764539363,3.279258204307492e-9,9.380627028104251e-10,2.373078695409129e-23,4.0843433793851527e-8,1.4570184480664422e-16,6.888917388014654e-26,0.026920361971949865,5.7026129141172576e-15,2.1519539826506185e-16,2.8849281546195848e-8,2.78767972012968e-17,0.0005581237934883113,0.189698997999765,1.694723770948126e-5,5.878692772713505e-5,5.843307388471701e-13,5.233928239757287e-92,5.0257151107614746e-17,1.1109457671591517e-19,4.111149709581435e-18,1.4563944796160915e-15,1.4814077806991762e-76,5.997836604709251e-45,6.030950858317133e-17,3.7303202540223465e-53,0.0002506672676530721,5.109504821146676e-11,2.2744188242276304e-152,0.010478124936272875,3.862330717992118e-52,2.983902463706162e-121,1.5194386662571402e-40,4.1165289598620733e-23,0.0026062244422166694,0.018220511655623103,9.357705049414645e-7,6.962512257128498e-10,3.5600199980674144e-33,2.5442646028314467e-17,1.2810891662743366e-36,2.366222262294508e-59,1.0301171005363899e-17,5.015038618903686e-30,2.997389245071382e-29,0.08345378001429662,2.3062154409432838e-26,4.074819719443247e-6,2.741347128854401e-69,7.088968892336866e-5,0.06459028693485037,9.919040579172711e-13,1.7378343303149363e-11,2.392224528125366e-8,0.06969748643927832,4.7751523547177805e-8,5.85588813364521e-10,0.00011046328127116752,4.3124145071607455e-6,0.00010605158944795986,2.648819387677865e-18,3.257609747834331e-5,1.3243352182548074e-38,1.3260939665641303e-14,1.0259586274970907e-16,0.001678334865724589,5.786284234852265e-16,1.2118149909855479e-60,2.815354113872969e-11,8.361256012696063e-11,0.012230459622124533,3.315925648900571e-5,1.1428262329909024e-41,1.0024219189669951e-46,7.508280112464695e-24,0.013842098964216652,9.33865416660596e-11,6.690345687862473e-41,0.0027211062893359845,0.07906700373281682,1.3926793971131773e-56,4.035987390665396e-10,8.993898506477837e-5,1.0842265986067883e-60,6.079370813385982e-6,7.611544373209934e-24,1.0596875217019069e-28,7.208069733828417e-16,6.2777429284637845e-9,1.8183917713158484e-11,3.297652641856441e-35,5.756742160524939e-13,0.04631854693124494,7.01265942781473e-43,3.577617961516249e-5,5.521616825713805e-26,3.7692377923391144e-19,0.0007154755677810387,6.565758451893077e-19,5.842548109006919e-9,9.428687839283226e-18,2.2374703949652244e-22,1.752022436518605e-21,2.4574255328636573e-22,2.29217796340097e-103,1.6113573787996597e-39,2.768059123813798e-24,4.956639026129861e-25,1.2116692767522501e-26,6.645793671480625e-28,0.006911360289049508,3.701464254290076e-21,0.026122850956415034,0.13755268685429595,1.2032709131006776e-62,2.0955734398201977e-13,0.0056867424584149655,2.3134576955864264e-41,8.310794531547201e-22,1.1294272245137707e-31,1.0306461237603315e-28,3.812628867533543e-13,1.5994635839829485e-6,0.00183330003734452,0.07078260667479752,2.0673590483450028e-19,1.2162951665394836e-20,3.490126909882247e-11,9.083385802534086e-33,2.588799244889314e-39,9.296642147651785e-24,1.6262951397869184e-27,1.7548335170078984e-68,1.5342196725908181e-27,5.284322455321254e-13,1.4210834044151112e-42,6.950198068480139e-23,2.3806918122613064e-16,4.274180260726385e-42,1.1605401595872989e-136,1.126141706079338e-22,0.0018116332132397392,1.7003420094360454e-28,0.0010302182681780785,0.2645103841391621,5.306362163111773e-37,3.1474559197548037e-18,0.07055715027083294,1.7277834725187897e-8,1.7755173120570126e-73,2.5155013531337347e-43,6.7225504561579684e-18,2.057933752221055e-5,0.1834169080276843,0.072456986478765,0.009785634776990912,8.097889801829274e-13,4.3195613874434055e-18,0.08633249841491962,5.088240536300082e-14,1.6143582988301518e-12,6.105428200401363e-44,2.478080860458887e-14,2.1442123064691715e-8,6.770390556107516e-67,1.7909090853884387e-5,0.011732707743339989,4.581076591438074e-60,7.575064859060939e-36,4.816225145581844e-20,3.972925253817831e-9,8.178867834590483e-47,2.6111483643330156e-22,6.675936145895317e-7,1.6059546111669317e-26,2.6393166340639653e-9,2.257209741332794e-46,6.172893359119408e-29,0.0017991962126952747,6.370685733909954e-64,7.120211845177301e-23,0.00892755886924238,3.9603240483025063e-38,3.2673285583109838e-25,3.525280113508854e-20,1.3276996282298939e-63,1.3499882202437245e-16,0.001108021458544193,4.064136799889926e-6,1.512482255701004e-6,7.044437393922444e-32,3.5614944593222785e-11,4.505776356494606e-50,8.621195844004325e-22,0.0014210515035656957,0.0017937525003657987,8.841312767752492e-44,1.283685383347981e-27,7.674851830457238e-29,0.13894897709932066,1.5236179869653704e-43,7.218676419658504e-18,1.119828678599203e-11,2.5599473390478474e-14,2.8504502309022488e-5,0.0079765136758097,8.902183067577457e-13,0.08814190126882468,5.27848628220827e-6,9.870979618176921e-86,1.0109884856250062e-20,0.0025256708202347736,9.064833049383162e-37,2.0086892292944225e-51,1.9691462384431186e-62,0.0022427098273080526,0.007382747085488589,5.6159083547917665e-21,0.12912299874869826,7.738991211241095e-23,4.565961329987017e-29,2.0669108223238833e-31,5.453384691308825e-16,1.858982043029494e-18,0.00044162836015746153,3.967145659647271e-19,1.5200550071730928e-37,0.0010520237076815126,4.5221881461919585e-6,0.00838159414239021,1.9828697303274264e-15,0.06854686172274509,0.16355677655394235,5.385305090611391e-26,4.2463307833468093e-50,1.1460326914072405e-6,6.210876236447416e-16,1.5393562957648088e-50,4.766359163750206e-46,8.012326138749241e-46,0.2364895858674439,0.12427563935412472,3.858146130450449e-5,8.734311449485604e-11,3.58495465695683e-13,5.802508983664412e-66,3.1986104758273936e-72,3.975250904823298e-6,4.529616227978985e-30,3.3201214197147394e-5,3.227855792064574e-17,0.00013878559171898628,0.00021428295819253404,2.1307530005587634e-12,2.56919300027685e-46,6.420901676078446e-10,8.319936886231033e-22,0.061112800844847985,6.806619694327705e-16,8.365734648406765e-29,8.33629110349902e-21,0.028692914089437988,5.265069254664445e-8,8.174360823169817e-9,0.4419407645159588,2.1923377239498814e-16,1.431632428890808e-9,0.0048906857787156905,1.0897644058564452e-39,9.94338593943069e-7,1.4121209974189331e-18,2.307695972021664e-56,1.158629588312804e-59,2.666698248260118e-14,0.014880308980977091,0.05680470587453989,1.2893899418814925e-25,6.992915390352058e-5,1.0425420344848291e-24,2.2310943347128443e-31,6.840693210159513e-13,0.0004234787053930431,1.798008459119089e-20,3.9196378097950333e-45,2.586582956443986e-22,1.816488460523137e-8,7.113685370007044e-39,0.0035360910760126882,1.6467790159884491e-18,5.870384267927773e-13,0.12365040493275135,4.074261892543336e-11,0.015418442442990142,0.08878626923268607,1.5847764486082013e-39,3.3952301705162367e-71,0.004144278893764409,0.0002431688854280697,0.006594653014199676,1.057532809366908e-12,7.614309335939415e-146,4.870876280705866e-102,6.919113835066147e-13,2.3198934207901985e-9,7.13457716053749e-24,1.5759909960089839e-46,0.0034924175315258696,2.6082280097345925e-13,9.742523872503584e-14,4.711690827560439e-28,2.2435495070169262e-11,0.002188531493506251,1.9486024608225321e-38,1.4196033792703101e-30,0.017252653892690928,1.177527823397402e-36,2.5652135893584793e-32,0.008121020069549765,0.0017983879995101962,1.0609643119677103e-63,1.0937699518625831e-23,0.011663361148191562,1.3953385816103827e-23,0.1253260985551938,2.7221904840029596e-15,1.6365228129833405e-22,2.4521418374786892e-21,8.763062713231613e-10,6.18766089531057e-18,0.05329578122742053,0.0017001890173254928,6.881796521284973e-37,0.14076952233148118,7.287651702402995e-91,7.679171262807572e-6,1.1011173446441582e-8,1.1937875284261117e-36,4.5241711296188104e-10,0.0734707144108507,0.005378749608415255,0.006869854793780459,0.03791728665203668,7.274339869736702e-39,1.3407209595415154e-6,0.038648545836415006,4.716244211894544e-6,1.1928941751489224e-21,3.2593342675053217e-15,2.0491022205817476e-66,5.2888489364627e-97,0.013972407998998942,1.92696659512988e-21,1.8891172343236128e-25,9.232848444946721e-11,1.906271871814486e-22,2.9775299542775976e-8,8.930695976617497e-12,0.169182698566337,0.14180492282060492,1.2888412421313144e-21,0.013807112068924609,0.0007445127967458276,2.2303526512893147e-9,0.17772101957603123,0.07649633458849925,2.3195354236062717e-10,4.4764985397385467e-63,7.90730097961013e-50,0.06801340508946031,2.5069262349718752e-5,0.13056794096666066,0.10922399247599159,1.2601823990395116e-8,7.624815920342348e-84,1.0196100637522629e-19,3.038073825004946e-51,0.0015963982662582216,0.02194603143367952,0.020153844873708762,1.451220936227917e-37,6.835091118109212e-64,3.399142581653598e-17,0.0005306676301216626,1.498697837288419e-13,7.963404232237624e-25,1.572037766958778e-16,2.6346427023477524e-36,0.00020144150796353553,7.187097685193442e-13,8.221151167373792e-12,0.00011228349618252414,3.8613522855062814e-22,2.6510224142627458e-5,9.171663186301407e-12,2.9901576453139593e-18,0.0017411111223378107,1.018505488642212e-18,8.46122016407257e-5,9.20067177306193e-6,3.3305345583959724e-5,1.43529332512097e-26,1.4998767371726696e-5,1.6015761646958837e-166,1.3618373230589704e-182,0.007825481161669505,2.2339323992167224e-18,8.84182451591128e-5,0.36434352554330557,6.400655803502133e-10,2.84832031379666e-47,8.283746578557605e-5,1.36919580941284e-24,3.872880500446514e-12,1.026001303313606e-21,3.2146931091972067e-44,1.014008041833546e-8,3.400241458850921e-21,3.855441650906182e-35,4.1839522710017325e-6,1.3208453541361538e-14,2.0990559406764935e-49,1.0000690404147451e-17,7.895078665232235e-37,3.9328738837449686e-13,1.2882126709353722e-160,1.6487851978909607e-129,4.9264439737120035e-67,1.0009496419069876e-27,8.442504033586833e-27,4.53612134507108e-69,8.062706787043365e-13,1.95027733903191e-6,1.4184751071810128e-106,9.532471784916713e-18,2.924162353894038e-11,0.1536461869285606,0.09567538622939566,1.4179145005322019e-7,2.6219924329763827e-24,5.898154340321779e-21,0.0473758372916538,1.704650257015485e-62,2.4942891137730433e-65,6.757331266606136e-7,1.7561403768127767e-32,1.812078769313978e-8,5.551466796387193e-14,8.435418413655219e-12,0.012982403051351621,1.2756860326916829e-11,4.291934757785217e-42,5.689379401574758e-44,1.63742590468974e-6,6.466376856132119e-21,5.67977864174703e-66,5.906409416059036e-7,5.031287035902607e-15,0.004825344727351041,0.10747487289862807,4.109849251839962e-18,3.2809089366930413e-40,7.99475369383235e-97,9.845273298740523e-42,8.615924693981196e-56,0.07999048503880406,0.00032356331656218274,0.07880288223347288,5.39964913572647e-59,5.1664752430570275e-18,0.0007005586617202125,4.848676416603006e-7,1.7142229000280017e-37,1.4933869552181674e-9,2.4913413745933104e-5,1.1810837029273931e-11,1.8580031496601697e-30,7.028216784602722e-12,0.10211760080272202,9.134740721052451e-6,1.4272664728901994e-9,1.2637548943200742e-6,3.555350409511757e-19,5.78521904985351e-22,2.0938118323519e-11,1.271849139095085e-20,0.00040388442132272814,3.1732303917179186e-9,6.097599728182756e-18],"x":[8.0,33.0,80.0,48.0,12.0,65.0,72.0,25.0,29.0,27.0,26.0,39.0,32.0,43.0,74.0,23.0,61.0,9.0,36.0,63.0,0.0,48.0,27.0,66.0,69.0,13.0,75.0,7.0,15.0,12.0,55.0,23.0,52.0,49.0,62.0,29.0,46.0,14.0,18.0,56.0,13.0,62.0,76.0,58.0,30.0,22.0,60.0,80.0,26.0,34.0,10.0,12.0,15.0,34.0,33.0,47.0,66.0,24.0,26.0,58.0,5.0,73.0,0.0,41.0,19.0,25.0,43.0,57.0,67.0,59.0,29.0,1.0,6.0,49.0,23.0,71.0,18.0,72.0,80.0,0.0,54.0,46.0,67.0,18.0,20.0,9.0,55.0,9.0,63.0,40.0,65.0,36.0,2.0,34.0,54.0,30.0,3.0,54.0,10.0,21.0,8.0,56.0,61.0,28.0,28.0,65.0,39.0,53.0,5.0,73.0,44.0,24.0,31.0,43.0,51.0,71.0,66.0,61.0,61.0,52.0,71.0,63.0,23.0,34.0,36.0,15.0,27.0,15.0,5.0,46.0,56.0,18.0,25.0,44.0,36.0,51.0,7.0,32.0,3.0,45.0,52.0,67.0,73.0,25.0,2.0,64.0,27.0,13.0,71.0,31.0,59.0,46.0,76.0,53.0,31.0,41.0,44.0,48.0,44.0,5.0,38.0,33.0,28.0,32.0,47.0,67.0,75.0,41.0,11.0,67.0,71.0,40.0,67.0,20.0,24.0,10.0,79.0,62.0,32.0,74.0,17.0,44.0,22.0,36.0,78.0,9.0,22.0,47.0,69.0,10.0,53.0,60.0,33.0,76.0,45.0,5.0,22.0,4.0,60.0,54.0,58.0,65.0,11.0,39.0,0.0,10.0,57.0,26.0,42.0,65.0,77.0,77.0,71.0,4.0,74.0,65.0,6.0,22.0,70.0,46.0,51.0,16.0,73.0,35.0,9.0,34.0,17.0,0.0,32.0,39.0,62.0,51.0,47.0,74.0,56.0,13.0,35.0,14.0,1.0,20.0,79.0,20.0,53.0,62.0,36.0,18.0,1.0,45.0,19.0,20.0,12.0,61.0,49.0,9.0,45.0,15.0,25.0,53.0,60.0,36.0,13.0,79.0,67.0,17.0,24.0,36.0,59.0,75.0,30.0,29.0,25.0,46.0,75.0,74.0,19.0,67.0,42.0,49.0,8.0,56.0,29.0,12.0,14.0,63.0,44.0,57.0,63.0,27.0,72.0,4.0,58.0,39.0,51.0,34.0,42.0,53.0,35.0,59.0,70.0,69.0,33.0,25.0,55.0,69.0,7.0,68.0,9.0,26.0,40.0,18.0,62.0,10.0,35.0,41.0,36.0,47.0,79.0,70.0,79.0,49.0,57.0,15.0,11.0,42.0,19.0,18.0,38.0,60.0,7.0,33.0,52.0,73.0,54.0,18.0,43.0,70.0,65.0,51.0,42.0,40.0,76.0,41.0,28.0,34.0,58.0,66.0,1.0,12.0,32.0,51.0,9.0,39.0,0.0,8.0,46.0,49.0,34.0,20.0,52.0,7.0,20.0,9.0,30.0,47.0,28.0,46.0,25.0,32.0,8.0,59.0,69.0,62.0,27.0,65.0,71.0,66.0,70.0,76.0,40.0,59.0,10.0,21.0,48.0,72.0,46.0,2.0,31.0,24.0,75.0,5.0,71.0,52.0,76.0,30.0,12.0,46.0,34.0,30.0,21.0,34.0,25.0,24.0,49.0,70.0,72.0,59.0,50.0,34.0,28.0,31.0,34.0,60.0,39.0,29.0,28.0,54.0,23.0,67.0,25.0,17.0,54.0,77.0,33.0,16.0,1.0,1.0,51.0,70.0,26.0,13.0,33.0,7.0,18.0,30.0,69.0,65.0,2.0,25.0,9.0,32.0,62.0,5.0,25.0,10.0,76.0,42.0,54.0,25.0,68.0,50.0,63.0,34.0,68.0,62.0,73.0,7.0,16.0,39.0,48.0,21.0,33.0,78.0,43.0,36.0,52.0,1.0,23.0,14.0,75.0,59.0,22.0,60.0,50.0,13.0,13.0,49.0,43.0,47.0,17.0,8.0,16.0,79.0,71.0,42.0,38.0,70.0,9.0,8.0,29.0,14.0,61.0,17.0,60.0,61.0,50.0,16.0,46.0,70.0,16.0,79.0,33.0,62.0,41.0,3.0,32.0,65.0,70.0,26.0,72.0,7.0,12.0,69.0,41.0,60.0,34.0,29.0,17.0,53.0,52.0,11.0,47.0,62.0,0.0,57.0,41.0,2.0,3.0,31.0,27.0,77.0,47.0,35.0,25.0,37.0,70.0,43.0,66.0,71.0,6.0,19.0,79.0,26.0,46.0,68.0,72.0,28.0,31.0,1.0,41.0,67.0,47.0,18.0,32.0,69.0,31.0,68.0,66.0,7.0,61.0,19.0,39.0,2.0,19.0,48.0,37.0,22.0,16.0,51.0,39.0,16.0,23.0,5.0,56.0,26.0,65.0,46.0,70.0,15.0,34.0,44.0,58.0,34.0,26.0,32.0,56.0,60.0,40.0,15.0,63.0,68.0,25.0,20.0,78.0,19.0,37.0,66.0,36.0,54.0,62.0,58.0,28.0,19.0,49.0,28.0,4.0,55.0,32.0,67.0,63.0,0.0,35.0,62.0,71.0,44.0,58.0,74.0,75.0,56.0,48.0,20.0,42.0,65.0,24.0,27.0,20.0,7.0,69.0,20.0,2.0,53.0,72.0,52.0,68.0,32.0,16.0,1.0,15.0,73.0,59.0,34.0,65.0,79.0,25.0,53.0,50.0,65.0,12.0,76.0,22.0,49.0,72.0,69.0,62.0,8.0,38.0,5.0,2.0,63.0,38.0,21.0,12.0,69.0,76.0,63.0,35.0,1.0,7.0,26.0,36.0,54.0,7.0,47.0,24.0,69.0,40.0,74.0,54.0,17.0,17.0,78.0,37.0,49.0,47.0,73.0,76.0,47.0,28.0,51.0,71.0,24.0,1.0,40.0,26.0,27.0,79.0,67.0,32.0,57.0,76.0,15.0,16.0,24.0,30.0,34.0,76.0,64.0,8.0,37.0,51.0,43.0,51.0,5.0,47.0,74.0,12.0,60.0,26.0,28.0,37.0,16.0,40.0,60.0,62.0,4.0,60.0,40.0,73.0,13.0,3.0,64.0,8.0,50.0,42.0,46.0,15.0,59.0,25.0,25.0,52.0,24.0,21.0,16.0,32.0,9.0,5.0,47.0,48.0,23.0,20.0,67.0,79.0,72.0,0.0,7.0,4.0,47.0,71.0,47.0,64.0,1.0,63.0,24.0,39.0,15.0,29.0,56.0,43.0,23.0,79.0,26.0,13.0,72.0,59.0,7.0,19.0,8.0,0.0,39.0,45.0,33.0,58.0,13.0,51.0,54.0,62.0,10.0,24.0,34.0,43.0,30.0,57.0,54.0,40.0,35.0,34.0,78.0,32.0,32.0,41.0,2.0,24.0,39.0,5.0,25.0,18.0,11.0,69.0,66.0,35.0,5.0,26.0,71.0,64.0,68.0,51.0,67.0,27.0,17.0,6.0,30.0,35.0,76.0,58.0,2.0,72.0,59.0,4.0,28.0,39.0,41.0,10.0,67.0,36.0,11.0,16.0,9.0,80.0,37.0,41.0,18.0,21.0,5.0,13.0,67.0,6.0,58.0,26.0,51.0,63.0,61.0,21.0,5.0,14.0,31.0,58.0,24.0,17.0,6.0,66.0,73.0,62.0,59.0,16.0,45.0,75.0,48.0,26.0,3.0,36.0,3.0,0.0,75.0,11.0,23.0,2.0,1.0,20.0,25.0,79.0,30.0,7.0,29.0,7.0,0.0,29.0,74.0,19.0,63.0,37.0,3.0,19.0,43.0,76.0,67.0,8.0,54.0,36.0,47.0,53.0,13.0,73.0,41.0,3.0,58.0,47.0,34.0,40.0,14.0,45.0,15.0,6.0,26.0,36.0,29.0,74.0,72.0,23.0,23.0,15.0,1.0,51.0,68.0,30.0,61.0,45.0,56.0,26.0,62.0,53.0,48.0,7.0,52.0,36.0,67.0,73.0,51.0,76.0,80.0,74.0,68.0,44.0,51.0,54.0,32.0,78.0,37.0,27.0,5.0,5.0,10.0,50.0,73.0,19.0,77.0,47.0,42.0,57.0,27.0,34.0,29.0,43.0,77.0,62.0,79.0,32.0,78.0,53.0,46.0,71.0,40.0,8.0,56.0,51.0,50.0,74.0,70.0,7.0,18.0,10.0,62.0,31.0,16.0,19.0,47.0,52.0,45.0,43.0,28.0,44.0,11.0,15.0,30.0,24.0,55.0,66.0,47.0,37.0,34.0,65.0,24.0],"r":[99.0,47.0,50.0,72.0,98.0,30.0,85.0,98.0,22.0,90.0,10.0,71.0,81.0,35.0,25.0,82.0,19.0,11.0,26.0,59.0,95.0,33.0,49.0,2.0,30.0,99.0,26.0,17.0,33.0,91.0,7.0,23.0,63.0,10.0,43.0,31.0,98.0,96.0,31.0,24.0,46.0,31.0,65.0,19.0,36.0,63.0,25.0,4.0,83.0,78.0,55.0,66.0,35.0,21.0,22.0,43.0,99.0,57.0,39.0,4.0,98.0,27.0,86.0,15.0,64.0,14.0,24.0,71.0,51.0,12.0,79.0,52.0,65.0,14.0,100.0,7.0,86.0,78.0,31.0,28.0,37.0,2.0,58.0,83.0,67.0,55.0,29.0,35.0,99.0,35.0,7.0,28.0,12.0,52.0,33.0,2.0,16.0,58.0,92.0,59.0,73.0,82.0,38.0,64.0,20.0,61.0,16.0,49.0,64.0,7.0,68.0,54.0,50.0,34.0,24.0,44.0,97.0,30.0,20.0,10.0,18.0,45.0,39.0,60.0,59.0,51.0,29.0,86.0,76.0,60.0,46.0,40.0,88.0,39.0,33.0,63.0,72.0,20.0,47.0,41.0,30.0,46.0,16.0,17.0,57.0,20.0,26.0,83.0,100.0,70.0,13.0,73.0,74.0,94.0,48.0,9.0,81.0,7.0,98.0,51.0,72.0,61.0,89.0,33.0,25.0,32.0,57.0,57.0,58.0,25.0,35.0,57.0,75.0,19.0,59.0,12.0,60.0,39.0,83.0,17.0,7.0,2.0,25.0,37.0,68.0,34.0,84.0,70.0,18.0,88.0,54.0,69.0,34.0,3.0,37.0,27.0,4.0,11.0,3.0,82.0,14.0,35.0,48.0,20.0,15.0,16.0,6.0,83.0,24.0,69.0,9.0,74.0,87.0,51.0,41.0,4.0,54.0,23.0,41.0,4.0,88.0,61.0,91.0,41.0,77.0,63.0,16.0,28.0,5.0,80.0,78.0,73.0,45.0,63.0,55.0,72.0,90.0,47.0,30.0,67.0,98.0,14.0,18.0,8.0,89.0,49.0,41.0,16.0,43.0,59.0,41.0,90.0,77.0,34.0,45.0,67.0,89.0,25.0,81.0,35.0,44.0,63.0,89.0,41.0,35.0,11.0,69.0,4.0,71.0,85.0,74.0,55.0,66.0,94.0,75.0,16.0,77.0,21.0,59.0,19.0,58.0,66.0,20.0,57.0,66.0,12.0,35.0,93.0,31.0,64.0,86.0,81.0,22.0,80.0,54.0,45.0,91.0,48.0,14.0,79.0,50.0,9.0,82.0,88.0,72.0,30.0,83.0,20.0,91.0,58.0,29.0,22.0,27.0,69.0,80.0,8.0,9.0,53.0,45.0,44.0,23.0,31.0,53.0,84.0,13.0,47.0,29.0,17.0,61.0,70.0,25.0,80.0,33.0,1.0,55.0,59.0,83.0,69.0,73.0,65.0,30.0,30.0,4.0,32.0,16.0,52.0,58.0,2.0,38.0,50.0,40.0,50.0,56.0,9.0,70.0,51.0,58.0,70.0,93.0,84.0,16.0,98.0,74.0,76.0,75.0,93.0,61.0,85.0,70.0,13.0,96.0,36.0,57.0,98.0,35.0,6.0,22.0,79.0,87.0,87.0,12.0,72.0,69.0,33.0,7.0,63.0,70.0,79.0,51.0,86.0,77.0,68.0,76.0,78.0,58.0,6.0,15.0,91.0,68.0,27.0,73.0,56.0,22.0,17.0,64.0,93.0,27.0,44.0,68.0,4.0,7.0,80.0,57.0,25.0,4.0,46.0,24.0,91.0,56.0,1.0,38.0,71.0,9.0,44.0,30.0,79.0,20.0,85.0,98.0,79.0,19.0,100.0,48.0,81.0,3.0,4.0,83.0,54.0,8.0,44.0,66.0,45.0,69.0,11.0,8.0,84.0,65.0,15.0,83.0,64.0,90.0,55.0,7.0,70.0,82.0,3.0,70.0,45.0,58.0,98.0,58.0,91.0,32.0,27.0,54.0,8.0,83.0,51.0,25.0,75.0,52.0,50.0,47.0,6.0,2.0,100.0,43.0,34.0,25.0,85.0,79.0,12.0,44.0,63.0,22.0,15.0,73.0,17.0,22.0,64.0,70.0,55.0,75.0,16.0,49.0,83.0,63.0,72.0,1.0,91.0,14.0,22.0,40.0,19.0,59.0,17.0,11.0,27.0,45.0,30.0,78.0,20.0,96.0,71.0,69.0,22.0,40.0,50.0,44.0,48.0,80.0,93.0,75.0,30.0,87.0,79.0,48.0,62.0,68.0,10.0,35.0,87.0,22.0,23.0,11.0,26.0,69.0,7.0,71.0,12.0,10.0,60.0,39.0,42.0,96.0,7.0,77.0,20.0,58.0,73.0,1.0,9.0,90.0,62.0,19.0,41.0,49.0,94.0,30.0,98.0,19.0,59.0,91.0,70.0,88.0,24.0,81.0,54.0,62.0,24.0,67.0,92.0,98.0,54.0,63.0,24.0,82.0,95.0,50.0,30.0,88.0,37.0,98.0,71.0,42.0,10.0,89.0,88.0,88.0,41.0,48.0,92.0,30.0,14.0,57.0,52.0,44.0,27.0,50.0,97.0,80.0,21.0,6.0,71.0,44.0,99.0,44.0,79.0,42.0,78.0,16.0,70.0,43.0,98.0,25.0,52.0,4.0,82.0,16.0,11.0,36.0,36.0,83.0,59.0,41.0,88.0,55.0,15.0,53.0,22.0,60.0,24.0,41.0,36.0,36.0,58.0,95.0,91.0,58.0,41.0,30.0,92.0,12.0,98.0,28.0,33.0,12.0,25.0,9.0,56.0,7.0,60.0,52.0,75.0,2.0,91.0,75.0,24.0,11.0,64.0,19.0,62.0,46.0,69.0,87.0,13.0,79.0,96.0,60.0,30.0,17.0,56.0,34.0,6.0,82.0,97.0,83.0,17.0,93.0,51.0,15.0,57.0,44.0,27.0,39.0,87.0,13.0,87.0,22.0,8.0,56.0,49.0,4.0,55.0,100.0,48.0,17.0,35.0,59.0,29.0,29.0,25.0,7.0,23.0,9.0,26.0,81.0,75.0,30.0,3.0,55.0,52.0,5.0,66.0,87.0,61.0,71.0,66.0,36.0,61.0,64.0,5.0,88.0,78.0,98.0,6.0,3.0,22.0,86.0,31.0,60.0,42.0,34.0,4.0,5.0,37.0,67.0,25.0,26.0,68.0,59.0,95.0,41.0,37.0,45.0,6.0,9.0,51.0,13.0,92.0,36.0,18.0,7.0,70.0,90.0,64.0,87.0,27.0,3.0,64.0,55.0,34.0,17.0,15.0,39.0,63.0,62.0,34.0,55.0,82.0,7.0,25.0,29.0,75.0,39.0,46.0,10.0,74.0,89.0,70.0,51.0,13.0,50.0,48.0,44.0,4.0,50.0,99.0,26.0,52.0,90.0,41.0,96.0,59.0,46.0,50.0,84.0,38.0,53.0,66.0,17.0,65.0,83.0,48.0,49.0,54.0,28.0,28.0,69.0,68.0,100.0,94.0,23.0,51.0,57.0,77.0,50.0,81.0,94.0,18.0,36.0,45.0,59.0,61.0,18.0,9.0,7.0,33.0,56.0,85.0,79.0,8.0,29.0,100.0,1.0,86.0,99.0,42.0,47.0,28.0,14.0,39.0,22.0,41.0,21.0,65.0,37.0,75.0,36.0,80.0,93.0,59.0,80.0,99.0,49.0,52.0,71.0,1.0,32.0,99.0,61.0,29.0,39.0,80.0,28.0,73.0,65.0,89.0,17.0,9.0,20.0,73.0,20.0,64.0,89.0,23.0,65.0,14.0,77.0,5.0,18.0,41.0,26.0,11.0,50.0,2.0,52.0,99.0,92.0,42.0,38.0,9.0,4.0,44.0,17.0,80.0,13.0,53.0,97.0,35.0,71.0,67.0,58.0,75.0,68.0,43.0,34.0,15.0,87.0,58.0,1.0,94.0,4.0,37.0,65.0,36.0,41.0,5.0,63.0,88.0,79.0,34.0,80.0,56.0,74.0,74.0,54.0,77.0,87.0,56.0,2.0,67.0,50.0,96.0,49.0,88.0,47.0,41.0,48.0,25.0,88.0,13.0,64.0,56.0,74.0,7.0,68.0,42.0,77.0,43.0,26.0,55.0,94.0,27.0,36.0,91.0,25.0,83.0,13.0,15.0,100.0,86.0,37.0,29.0,62.0,84.0,2.0,90.0,68.0,94.0,74.0,81.0,29.0,20.0,88.0,18.0,99.0,76.0,29.0,26.0,7.0,59.0,28.0,10.0,76.0,65.0,36.0,2.0,36.0,42.0,43.0,57.0,47.0,90.0,40.0,34.0,74.0,85.0,92.0,10.0],"p":[0.7727676861954726,0.8647977655342001,0.7769707050999985,0.8697158640320664,0.8347799897998045,0.9934439385117737,0.8174362427992052,0.995264927631283,0.9024663047848464,0.977607146251497,0.7610553069451125,0.9576551048303207,0.8957343391179355,0.7943895561478936,0.8910384065951751,0.8596840195822757,0.8551314051404499,0.9295553186120651,0.7875653177165938,0.9932494122737596,0.8282158899481951,0.9346637177827557,0.7797784155924248,0.8332026655944389,0.9220365684292162,0.8659971808660725,0.987762248014391,0.9246577064549069,0.7835914790904462,0.7727180389300444,0.767840863353848,0.8770567543067943,0.7801947996013505,0.943188691610575,0.7707919019370832,0.8685425151284121,0.7968655086348816,0.774566202400451,0.9599286643307828,0.7637115063417792,0.9387621246388268,0.8277705199659924,0.7806227762923591,0.881453240475705,0.9268501809422218,0.8265917046241211,0.7865480289966167,0.8457980049286875,0.9436601768111563,0.8501260630204088,0.9312647645778168,0.93548500355579,0.8360455644756708,0.8690772182250732,0.8929527713091843,0.7955021343886333,0.9116559485557261,0.9394042680308261,0.8888353863181282,0.8691107403151328,0.886548845792422,0.9464242907266204,0.9026142971025966,0.8222059539100721,0.8455539490911956,0.9564892272743228,0.8157781396134541,0.9350952541097033,0.8077142887630264,0.8709540433974894,0.9557969851173364,0.822250912017757,0.8407251228603292,0.8198062755402034,0.8548462455682054,0.8554838912587048,0.7978087017674538,0.8364931992315269,0.9565444580918976,0.8471979344332022,0.7969341460241818,0.8976363961738085,0.7837631151347328,0.8186113041316254,0.8439280902022188,0.9941805431427075,0.880196763620746,0.9149922438418282,0.911616696771603,0.8883799269981901,0.7503484206545539,0.8542178679415617,0.8802434472341807,0.7747786740161644,0.8405095844367598,0.9989412061787342,0.8667949359428897,0.846192789673347,0.8113406538247551,0.8980933922168963,0.9465690901468478,0.893409290827666,0.9301204305888198,0.8287114519558596,0.927286952196103,0.9621539887042467,0.9877099368179227,0.9582357032587776,0.7894304511360419,0.9500603066809594,0.8153253819092633,0.888373150445871,0.8833812344839551,0.8956129806142892,0.8300651477868863,0.9889079258360505,0.8942231186159122,0.852156905339839,0.8761516406073238,0.7862916929784607,0.9084268433240377,0.7870911943262413,0.7615455033085397,0.8249707211070356,0.835988739007038,0.7722035155400021,0.9043674263607415,0.9140039024005687,0.9154761673461046,0.925980639101432,0.8973314917570487,0.7938925967746957,0.8950862723041303,0.8175138690894368,0.8616788713062562,0.9338009255665097,0.8769725638762701,0.90924550029546,0.9718995418073092,0.8159853282372992,0.810744652098891,0.762530645927499,0.930933544913757,0.968413611347676,0.8242933926948526,0.7791869010342233,0.9533697796790201,0.885421492753028,0.8531315480297024,0.8917035656650558,0.8981184438280093,0.9331669939638823,0.7788622522057128,0.900055714984989,0.9455879220155208,0.9293708112582292,0.7594933514683657,0.9006732303211129,0.9579562617545755,0.8692646422099848,0.9921567077274134,0.9055291208761085,0.7599007139120263,0.8602227027211526,0.93294418094906,0.842231938604205,0.8043048069797398,0.824630888789548,0.9993596503884665,0.8679689030646904,0.7781956595598603,0.9303003002695628,0.816552861989918,0.8148217009764314,0.7727858741747493,0.8048671063975105,0.8237549874784514,0.9410740457363758,0.989523086849412,0.8787361492231511,0.9994217877427118,0.8350637151779416,0.9173163118841792,0.9997746981129456,0.937468448495427,0.8008134313583326,0.9786736771148817,0.9262056316514418,0.8183178876324574,0.8995939193888184,0.991541386843378,0.8997020273657041,0.9118280581276348,0.9122571630504002,0.9067643602184183,0.959027075531306,0.8136788138767141,0.8381504933693211,0.9194381989423841,0.8807364479046593,0.9961103533216542,0.9294963680976884,0.7821123494250994,0.804984785332671,0.7842427673598953,0.8783465557401622,0.79286630334423,0.8352176373713869,0.9983123369444424,0.9206413795998041,0.7788391836650528,0.9738630482126331,0.8528922127993979,0.9831971696781403,0.8147418014687758,0.8298744321603029,0.9234509642323306,0.7708734868975097,0.8701373838441835,0.7858363874501957,0.7920484969853345,0.9962455629744573,0.866470428981972,0.9055965519852496,0.7932602697127555,0.8694738296645736,0.8267966113757752,0.8290673350746116,0.9098927420982845,0.9543203038533057,0.8189643692506958,0.7512437909993177,0.8712949432263131,0.7915686192816236,0.8010028163319913,0.8710239327265568,0.8092989695852613,0.8981435040965174,0.8646066689813429,0.846249454926721,0.9709189492282974,0.9814892409654541,0.8202963210405461,0.8006243355518159,0.9551725598332261,0.9889301129404855,0.99963921576359,0.7545549763594949,0.8464044416940821,0.9587432585431801,0.8535343458094855,0.9474604557831091,0.903831727116619,0.800786360345257,0.8704773023266208,0.8621349487556746,0.9154070001889321,0.9605565677014662,0.8603977985077353,0.978653747604957,0.9609405003140425,0.8007859395300433,0.9636686631144105,0.7586082093219375,0.9510589205446665,0.888702013812853,0.9863233173204123,0.9286455306886094,0.8423421502557442,0.8746945998529667,0.9798237201165385,0.9709998299085242,0.8206230474561439,0.9456051638900154,0.9722755302599515,0.923319795066741,0.7581072315356101,0.9263935989582994,0.8770160752483567,0.8411030811439125,0.8920922372053118,0.8076877004494878,0.7950880235702535,0.9506638695740186,0.8619580053236087,0.984498461266488,0.8018751055429092,0.9237173513859651,0.890848318862151,0.9892678170662146,0.9151320022629812,0.8979611980418261,0.8269088035595507,0.9333961012694734,0.9301525602224183,0.9457153370445901,0.7758433322740481,0.9959578750605463,0.9051409064051604,0.8216770746415548,0.8251245870816233,0.9761333296766204,0.8510739166344359,0.7541728031962691,0.9060758583725987,0.8542020554852221,0.9142713658937942,0.7852043496520317,0.9114396032324775,0.874702966357523,0.9843897468849307,0.8076950717025905,0.9575121938546358,0.8108878333925497,0.8380003969331045,0.8451341464019737,0.9696297889977175,0.8342970065099385,0.9766501565052492,0.8328208912521744,0.9608881866159411,0.9748119134848777,0.8612906781955394,0.8272720178603421,0.9633619667174756,0.7700593609213319,0.7692736422117199,0.8821112721756781,0.7624399708057831,0.8521109576049055,0.9417119167317767,0.8321516221064841,0.785246144864072,0.9401666023412854,0.8144699893205738,0.7527559640827517,0.9940339675758708,0.9948662755228366,0.8194154635720542,0.9784936673589357,0.753961260282046,0.8906576502175494,0.8954769072701078,0.804080818808893,0.8248422388009982,0.7790415686060221,0.9932531317646746,0.9928026468746632,0.9407519896942425,0.8350170701718329,0.7923755621191868,0.9882806760341478,0.9576985170081793,0.7902420393649405,0.8947032359878583,0.9046851575888903,0.8354842786056274,0.8106396656346846,0.7937146821105023,0.9983395096836083,0.7866632324865979,0.8811318613200783,0.7629465157000921,0.8232524921450985,0.7764128572643605,0.8209617169872899,0.8518635402410263,0.8380683648420224,0.9639554306258391,0.9933402144203664,0.8538581802562508,0.8999381504477602,0.9934162375998581,0.7892338572551338,0.8570110086841233,0.939376777473079,0.9462485338899855,0.8675708082356497,0.9557810248172931,0.8382725360820069,0.9358399570015068,0.965981265786656,0.8637225813152869,0.9645378839698736,0.7968592967995576,0.9866583937038996,0.782150208404005,0.8833997307036803,0.9962898438547463,0.9682385774965833,0.8866110072883999,0.9816049256265225,0.7703364481595688,0.8703266051830649,0.9520685208300619,0.7796051595463546,0.9520137598315104,0.7542003693568566,0.773635845586698,0.7766878662659025,0.943233391173921,0.9521452243653328,0.8338059266625426,0.9983131049851167,0.8616743621528301,0.7553889489499024,0.9036318026706063,0.9735030650362264,0.8081060979582848,0.76518790765767,0.9277437934544338,0.968078974393972,0.9407125383147871,0.9429803959479386,0.7597621437183806,0.9641032339064787,0.9283364533663516,0.778718891870613,0.9780725957183178,0.8978652878791817,0.9723613228900789,0.8943226383361509,0.9432066730251388,0.8599940295878116,0.8568312797291145,0.7668610887945342,0.894895777415726,0.7890746814308067,0.8887199589477055,0.751216890753882,0.9597299197046358,0.9249381573475663,0.8957973845190704,0.7515579572064524,0.7524774493647786,0.8624129270917602,0.965064350450916,0.8098519787799183,0.8080612973076782,0.8559220603720172,0.9523303298102679,0.8016298651193632,0.7538604012948205,0.7830364308861315,0.9317905613927633,0.8508594608634275,0.9630066499903562,0.7805742374610878,0.9818789648889573,0.7637040972764886,0.9805115095986061,0.8199165172949301,0.9122747621436889,0.8671140388466008,0.9322395655229849,0.756415085139587,0.8248812786564994,0.8214808507862699,0.8078075545299119,0.9020259091974465,0.8075316646568795,0.9740166824532264,0.9797567122032372,0.9115935676362039,0.7987388745608827,0.8462064387769157,0.8799906979776685,0.8137863599254526,0.7552869306014113,0.9655842787203373,0.9318226007406766,0.9177910935011926,0.8386457909385161,0.9370176212285901,0.961184132699668,0.9748939073011499,0.8938588421549276,0.8388214349662713,0.773096065246265,0.7545016431252989,0.8366108940291546,0.9062974955552834,0.955602634499187,0.9665962953850258,0.9315593590851007,0.9945016980049894,0.7736512150331473,0.8576609181843893,0.9038190714969805,0.8763948599918643,0.9936340539591113,0.8467984163107962,0.8149192721716221,0.8384342837517818,0.810339172394811,0.9131939364586962,0.8151821189859764,0.8936721588160643,0.898485619477869,0.7754654474955114,0.8775073579058872,0.9706484699651575,0.9809405723407203,0.8904241750480797,0.806616511462781,0.8253138648306642,0.8582069765758149,0.9300150341218838,0.9388226264684776,0.9577329127736657,0.7966757644499416,0.8558412654341908,0.8019382904014736,0.7691900358438553,0.8906075538744243,0.9421033388408234,0.9353366539974635,0.8351356515126502,0.8922248090935169,0.8876066747869586,0.8910271685456821,0.8635999842307092,0.7933566505515812,0.7655143899335484,0.7933910113070828,0.958265844182254,0.9990324484613033,0.8263287754650115,0.944944681606182,0.9536827873140725,0.8317385430006363,0.9569193030914054,0.9344124601463297,0.8354083773385322,0.944266625158577,0.9642978891277441,0.8223419377736602,0.8587007349150082,0.7682018600915765,0.8778670500034724,0.9914470215584339,0.7858973127896396,0.9766684365870697,0.9939117397804625,0.934821102649757,0.9016259530681972,0.8125539742439591,0.7561756223172844,0.7926983693232927,0.7544195406728498,0.7950135938783053,0.9442234346214664,0.9905537925626483,0.958502674136128,0.8842867552236644,0.8511099473795594,0.8682295464665852,0.9012434550285832,0.828470298114879,0.9495783096472875,0.9925527558243175,0.7899354367228493,0.8517101830729208,0.8573609691189157,0.911290478682048,0.8578146254155014,0.8065446853755216,0.7510513127998353,0.8580316052836685,0.8394141620675741,0.9052420564048349,0.8170707536872324,0.8977222611508048,0.8493515683382917,0.9240963077935651,0.7682587888454049,0.8268627488713036,0.9384378759869257,0.916652626768642,0.9847978319869924,0.8300594043657444,0.8434212185927288,0.8526829900226482,0.8423485262165592,0.9373400182041729,0.8843831097224532,0.9574662702826899,0.9134700304135553,0.8065812115994487,0.9004145866219329,0.7855679457972341,0.8282205049975064,0.9076099991307496,0.8743930585131567,0.7708608443464284,0.9606455831613533,0.7663323871903831,0.8321142889530717,0.8803620644966341,0.8766806108021012,0.9221032357749357,0.9197521514405547,0.8513396968288838,0.9430358147845375,0.9675512986743064,0.969067978796073,0.776041462314201,0.8869537398793292,0.7956392363621901,0.911327115513779,0.8559725460886041,0.7552115443396411,0.7518007065831074,0.9472252572796425,0.7842511613506911,0.803072636298503,0.9630803131633042,0.9565945144992039,0.82476262669567,0.9738665927802019,0.9225278414657903,0.8384629695362484,0.8541870169535097,0.9715342884225464,0.7536838437904102,0.9338004095963883,0.9599647942844619,0.9132130382175674,0.8494292722339664,0.9195774104680399,0.8220128607960152,0.8844870567817122,0.8434961198751515,0.8808277509625294,0.9170354488870472,0.8658709069150279,0.8371660388998508,0.8475231045590843,0.8568229903911984,0.85854748026507,0.8531094627790592,0.9156635057187512,0.9451283376051116,0.9415725389019584,0.9827704321329118,0.8284427862152878,0.9698494929185504,0.8517626440208808,0.9505437013474224,0.8619268687761786,0.7917982926145317,0.9968968057459555,0.8490538591322043,0.7823096378162071,0.8295385108081732,0.8436101676186578,0.9714026475702336,0.8683600234234223,0.7959152734862003,0.7694137520162003,0.9463422345572805,0.9744810853353625,0.893441689806478,0.8403214951133144,0.8537557271993996,0.9821744039805385,0.8798770069909012,0.8536834600891102,0.8971859943108891,0.7897841010501009,0.7835299373426404,0.8507767395792086,0.9209674649939447,0.8106864553955517,0.9141025516223478,0.7546377944982,0.9882746747456603,0.809898445815004,0.9060114543013167,0.9375718805251048,0.9458934187195145,0.8891434851106501,0.7600790636312278,0.8842343928845382,0.7620923502777225,0.820747600521375,0.9447773499204293,0.8347981385518873,0.8779653186904863,0.9634831115369122,0.8611472718748284,0.9938078646142352,0.8956465439968866,0.7667145292276625,0.917325975973452,0.8397327854945706,0.8922628256283085,0.9708076104323295,0.7636835608836456,0.8400721724857878,0.8940884082697793,0.8033520747381802,0.9427309945384803,0.7964628122975309,0.8340225465332755,0.7621942603238805,0.9744909711583749,0.7771010431041567,0.9444637240998862,0.7949294957950241,0.9225864773210082,0.9334099441531595,0.9047697593144393,0.7965055088713469,0.9926160740160674,0.8072887514308082,0.8795654678792675,0.7912141731141535,0.8460946444671131,0.7948290482267164,0.7981291219318349,0.9692636709996261,0.884203774760288,0.9928157008676494,0.949923771135474,0.9617227528381939,0.871172188306396,0.8219705007604613,0.8918732339993842,0.7737516024028049,0.8754329338962404,0.8791359490084623,0.9302905413429963,0.8231663368071946,0.9435544332594681,0.7924932801530491,0.8558599073683867,0.9455198447146779,0.9158226950402846,0.8550220850193484,0.9077652407197345,0.7732612032276297,0.9101062854112405,0.8603366379305288,0.8918936555673347,0.7814487182712775,0.9389236669604926,0.8910018686407177,0.930445871750871,0.9601377516662468,0.8800674039735622,0.8614762273772663,0.8138503871143075,0.8912054309888641,0.8162509981539271,0.8323085106208017,0.8013283188308427,0.9842144859002335,0.9320375104146659,0.7906898438417092,0.890478130141009,0.8081779734262796,0.8134647022317644,0.7919616396905558,0.7581227283963138,0.8082599823610997,0.9816034995703586,0.9016288031167129,0.7882035571079251,0.777845085251537,0.9683935379656503,0.783485516237806,0.7882835152490403,0.8487604609079253,0.9179519430390521,0.9922362605792914,0.9215871407825663,0.9229606223419686,0.8642967587967061,0.7747832930968115,0.9346993599544695,0.8806409277630407,0.8601716120276339,0.9724733167247552,0.9618505574786951,0.9748003497185422,0.7643454749048713,0.7543845295054548,0.8948232448114617,0.8077158856690709,0.917883197106363,0.9068832634119731,0.9158890545470684,0.7704390969974713,0.9371240988103978,0.8992330966394502,0.9704516691263017,0.8252964536616595,0.9727407385809967,0.8687757105563364,0.9322880786352901,0.8911274478985869,0.9212497746743934,0.9235514295684897,0.8210986817174271,0.7997832447067712,0.8685820039756309,0.9613939703784377,0.7621916607364001,0.775232525914362,0.8641020596267729,0.8071858336798976,0.9973888131006416,0.9896114363808224,0.823320853029872,0.7557919992097246,0.9745380141441897,0.9998365851321761,0.8523570585155901,0.836947289732598,0.8686984376284788,0.8198402411222605,0.7791575368406967,0.8506596944229425,0.8225278008851555,0.7790470453695915,0.8812134751512393,0.9869431579006991,0.9662115365313777,0.750727461023127,0.768074669027058,0.9155649754448496,0.9225462468332002,0.8297656936103783,0.9626254138432706,0.9058214946590187,0.8082241108792709,0.9305776841065466,0.9147980131968935,0.9260336179020903,0.9409605639005004,0.8017167894120811,0.8277921561248327,0.8878326801223619,0.7860163538248321,0.9931317177843001,0.8172939617861632,0.8083587003238168,0.8915954815454153,0.7933852377354603,0.8025938211468648,0.804597722245439,0.7541379979723084,0.7974232824124113,0.9306019277480355,0.884718794501749,0.8563273825266222,0.867393957086996,0.7746099099247659,0.8282606073671455,0.9761769337985622,0.990326994335744,0.8143294854374659,0.9315171202643886,0.7553851462683612,0.8426605917551364,0.9789237857862632,0.7568464363802072,0.7549941807994345,0.8108556691551249,0.9069525482938211,0.8320817972424244,0.7977041989837415,0.8592671319805512,0.7514465704518452,0.8914708751196492,0.7726401603712498,0.8111206873308171,0.9548158089128269,0.9838227378405422,0.8116514972345144,0.793242588553821,0.7766288005618992,0.8176630413505916,0.87674409929633,0.9288270703418084,0.9864380198123465,0.9686736098069204,0.8102212280075849,0.8249425110721749,0.7614547367481801,0.9114933000959173,0.8718957656656764,0.7656977468020165,0.9125558420989515,0.8546101888419295,0.8883234063208623,0.8669232653849978,0.9613340778392412,0.9058663917877762,0.7631771465083348,0.8750118043231181,0.7705323744661048,0.8909107258221054,0.7549685617548234,0.8696578767712039,0.8768591039647442,0.753760895150435,0.924497258147537,0.9297538611842913,0.851307576530201,0.9036361147904935,0.8486326148204856,0.7843183855147351,0.9983530639881617,0.9987936703980591,0.7565130857320315,0.8853073021695561,0.934372915820384,0.9897339915188046,0.8300666889776372,0.9121602676657528,0.860184290782464,0.8708417253432057,0.870056216958355,0.89399751538543,0.9965837472472702,0.7665254854758535,0.912060751867843,0.9512981831255063,0.8681161615147353,0.8528440740971295,0.990353476593177,0.8601012825361527,0.8813516969855767,0.8717205813733658,0.9971825532920795,0.9901899538958985,0.9545080575541747,0.7920282621377935,0.9556056973219748,0.9737440111325675,0.8230799312548962,0.8365095288400376,0.9879525535964124,0.760624702532104,0.9345633893637746,0.9103361007187001,0.9065596576538568,0.9783135428635719,0.8520507513103099,0.8026182847929553,0.7924290040128485,0.921361780522534,0.9863429228736782,0.8482802433438038,0.8705660225880621,0.9250319938882734,0.7814185663024295,0.804397698740722,0.7598330237486237,0.764350674938682,0.9165548992218593,0.8579988622549628,0.8497093056059386,0.8337870305898681,0.9454011972051035,0.8302541306220709,0.7859510481674683,0.7824952216885857,0.9222977836184312,0.8811010345261369,0.933054348422063,0.9944316904620539,0.9295376622750671,0.9063370772713943,0.9569498153777901,0.9176116203688496,0.7961561531138647,0.9473877923142431,0.819483412370251,0.9065000270108905,0.8778428082113867,0.895838016973765,0.8167569983928908,0.7587342060292275,0.7950697491409005,0.9226520120723263,0.7922057967254243,0.80780527941446,0.9257876762303523,0.8933640462436296,0.8757243643374557,0.8987307049740771,0.8017812028812735,0.7600004165329881,0.9483020296578228,0.830722307039787,0.7882037786651931,0.9033933063902031]}
},{}],153:[function(require,module,exports){
module.exports={"expected":[7.97764296138132e-18,1.5903328289163132e-26,3.3913361905115714e-14,0.0129899273224345,4.702374966365477e-66,0.027843253347021455,0.035888435170816566,1.89029308615085e-76,3.1244786209374284e-34,1.9705314710292583e-21,3.168297894164036e-25,2.6160516937355264e-6,2.261415515292751e-60,2.949226800759559e-38,8.437391713602053e-64,2.1357577057337914e-42,7.468730581936467e-65,1.1247769882251032e-16,0.0002622781202704516,3.995928985227754e-97,0.031782527079971354,6.487199685721465e-41,0.00016203686503759237,0.014871162391913715,0.00040514011467014503,5.547814821238553e-61,0.01694448474538644,0.00010973847717079272,2.196404214053787e-81,6.106033688508055e-126,1.6496627700746835e-29,2.681332200189763e-8,7.657362806015776e-14,6.417908062802726e-19,6.973281193534872e-5,9.785665776789014e-5,6.581714808597402e-49,0.0005572493861429832,2.1316561993325888e-24,0.00041054933428306387,8.51846588495079e-36,1.7804009003638464e-15,4.803359153967805e-7,1.4187070621111067e-44,3.6590095002125776e-24,0.0005905729787294868,2.2391109609590015e-53,9.006113442553508e-85,1.5250241550923808e-59,6.52562057068808e-62,2.918509856595504e-9,6.7269388003190615e-40,6.084092083647445e-14,5.811881522954953e-28,2.167910729838774e-71,0.010320315183415505,1.3928505772629346e-48,1.1730065322187044e-261,4.1275252645898517e-19,4.963367012352091e-50,8.59610781806267e-23,2.077036548848653e-159,2.391121267551936e-15,1.5260816257501363e-64,1.5228497571173711e-12,0.0008422602559781967,0.010209849331885465,2.3992431539643124e-40,3.3885013778527526e-8,6.791949191451702e-50,1.7446702799676428e-32,5.0232581083575074e-129,2.230548244522824e-30,2.5027973066535584e-47,6.726690484705295e-49,1.635201615885033e-127,5.3861519988393825e-86,3.314777098111053e-45,0.015598724749760502,1.044424780089735e-58,2.1422012355880527e-35,3.5260928582427265e-19,4.367706008062647e-8,2.3546456442496438e-68,3.074097074594878e-43,7.453397574359032e-41,3.5426231512674506e-59,8.423433176264919e-30,8.652443836103135e-51,1.6568472048216064e-41,8.642026953192668e-33,0.0015785060497685698,1.0434211410686948e-38,3.7518831136992e-40,7.714878578752136e-88,2.9570791828650644e-54,6.634757101200238e-123,8.49324541335333e-54,2.1536579667433204e-10,1.2257416016375382e-33,5.915729435205304e-109,1.2974441133602121e-131,4.0284223051809555e-74,9.751299942830994e-9,8.017216225147548e-34,8.964466432912819e-12,3.110469496583026e-13,6.884733312546032e-105,8.799536941900086e-23,3.613229122049592e-19,2.1139535530805182e-5,7.284053285901308e-9,8.056496474861221e-12,9.10615211461122e-53,3.932763967322668e-39,1.550350763079506e-14,1.9132001742977016e-85,6.25082969248511e-16,0.031607126873884166,1.0355081684195219e-46,2.412336028415337e-32,1.3795071972445361e-6,9.457852313191748e-68,8.591354358934352e-5,8.801960532699862e-29,0.0,1.5754106958144212e-13,9.877995369471763e-50,6.48393872898157e-32,7.183530373127497e-6,3.488227189589251e-19,3.917873724447934e-106,0.016280485580411258,1.6969731532639155e-80,1.6159141834209489e-37,1.1072699477604668e-55,3.5332487062185178e-34,0.010538734223002482,1.7388543488925912e-30,5.106822912006646e-49,2.964962194719308e-17,1.5349796900492138e-58,8.709493945318419e-41,4.7221780483608017e-35,2.603996857043467e-74,4.214261890334561e-38,4.605874622936085e-100,7.250798857243154e-6,5.537414581341606e-27,1.4826473869563128e-6,0.01336499645428143,0.007127311406434733,1.6483119443893414e-51,0.0003938591851629735,3.6424825617449604e-6,6.338088698683126e-7,5.092546336061676e-12,1.2384968884133963e-53,6.434996543860261e-12,1.4161577961178035e-28,0.014795515315618794,4.049148116467507e-13,1.3436056314878447e-49,2.2291131282940444e-23,2.78045252304599e-121,7.188740077446794e-135,0.0005923033575827434,3.092158785969475e-28,4.3264818372440664e-42,6.009664867058018e-20,1.4351468454012306e-19,1.3957226830110408e-16,4.248447666134756e-73,6.52896076238066e-68,1.800746324956877e-89,1.8392004657439202e-19,2.3425770530090563e-9,2.7674402338908748e-42,0.0008757267354288384,9.303422213730844e-48,2.372273973217464e-6,1.3745002384258825e-43,4.2397258853772524e-86,4.0133977120977053e-41,1.2955334776374323e-38,6.876058917405565e-117,6.891513882644116e-73,1.7573555432857067e-49,3.6963582701889965e-40,6.600544083912885e-6,1.595012475669192e-26,2.0369102127318755e-34,1.725295296059079e-6,3.0390933456870283e-100,8.841866022217683e-27,1.3509909485620613e-116,7.772922382490704e-31,5.13691732024328e-6,1.618374535779287e-40,2.2538648690138546e-37,4.594581699129281e-34,9.120195685191451e-54,3.7108078388464666e-49,2.655621566904052e-61,6.64273610496898e-20,0.0016522901954993557,4.368375564023687e-89,1.6782288948218576e-18,9.369529644594436e-44,1.9029871489144294e-81,4.787664651763848e-81,2.493536329526946e-108,1.0745323212158835e-52,4.843307564481368e-57,2.612144047669161e-11,4.3874016114466604e-36,2.9579953721780418e-15,4.5592871858328e-115,2.76690443131765e-23,2.92210443020209e-8,8.888088533072263e-33,5.7452382448800596e-18,7.481127642220285e-13,6.569264255396836e-17,3.1024371108222977e-77,9.105206378371685e-109,2.2254166557568055e-15,6.078092173181855e-40,2.9991428725313525e-102,6.975555493213278e-16,2.8065138716381143e-62,9.180268704597108e-7,1.3361474405103096e-17,3.8870385283676213e-60,1.0055819774673969e-38,1.5002353483225396e-39,2.894894158472631e-23,0.0057243484250679745,4.70403279815827e-136,3.185644693791088e-59,7.294758247339767e-30,3.0573049651474227e-6,6.961109168159699e-17,2.5143416942455437e-28,5.937543468907981e-41,1.4960485445611825e-132,0.0027091560078308765,1.5115001684387943e-62,1.0993854255439784e-7,1.1296033935694965e-68,1.050974240255329e-48,1.089215402097905e-16,1.8521819340799734e-43,3.110001633018253e-116,1.558037914294169e-7,3.7616280406971504e-59,3.6700048524138926e-23,2.2098644180081768e-42,1.1030784475664297e-35,4.665678990284224e-52,5.266384057336189e-90,9.921809130925626e-32,5.92035425501963e-83,8.69947781655284e-39,0.0006498412647474442,2.052712884700017e-20,9.744094231394748e-12,1.0423704165538678e-67,1.2000871911699553e-61,7.174720180504831e-53,3.418500695131677e-58,1.014512250370146e-42,4.48943546460585e-52,6.91536827005996e-38,4.0473345851040365e-23,1.3884138060308449e-42,3.492901623657112e-87,3.0807884688504604e-159,1.5634408203614412e-65,3.02539794426142e-42,2.0777695439966638e-20,3.9424565429215236e-53,1.8068854839756577e-14,4.132793155087146e-31,3.051512498567532e-30,2.5825882436404184e-27,5.770804364686366e-50,5.666308686256193e-74,5.022471051454918e-122,5.47417620692214e-6,5.563409792127024e-28,3.1682847828490508e-27,2.1328599268718287e-88,2.8476831457480185e-83,7.14153495956289e-27,2.1005743421079498e-18,1.157610232382876e-14,8.717407580197817e-36,0.002202139824535868,9.425787871966105e-35,0.040753758140424284,1.0129411771306413e-10,9.927101788046203e-43,3.3818556570877095e-58,2.1255999405045797e-59,4.713541259563707e-42,3.1565539715299225e-35,3.671831214297293e-25,6.43049648131916e-20,3.650747234086861e-56,9.202255328595203e-92,4.2941124340102153e-16,9.535561155384419e-48,1.3473364252325587e-57,5.66475195712437e-17,2.1258381434511077e-27,6.000524099537926e-69,7.414391089962607e-63,1.2189261241574044e-18,7.34166162218697e-44,4.3433868536408774e-24,6.2515099021607755e-25,1.6985753921780377e-25,2.429636375473226e-37,6.453993978207647e-66,1.1062409595696467e-83,0.00024516732304718624,8.883746883260319e-12,0.005278570617192845,0.024613236607510896,1.7844929849517118e-16,6.3633782188895435e-40,1.5599871439645133e-28,1.2226578768593416e-98,3.2418135429906686e-28,1.5942287770827341e-84,0.023983666251134624,4.6679691714573365e-9,6.093080186630065e-25,9.201346296709256e-68,6.407594767851187e-48,1.6797754271790376e-7,9.645284538153765e-53,9.38961191011075e-16,7.297649163679948e-36,1.0423563296795566e-46,6.440170519889704e-73,4.359754819332902e-164,2.4331804024066066e-11,0.00034893774965437597,1.6379264805083431e-96,1.84511305737176e-33,1.196329721835359e-7,1.3041751142035207e-50,4.611185531336445e-25,2.5527996195284304e-71,1.2755522877492854e-32,0.0136563350598336,1.2469807698185562e-20,1.143993372008742e-6,1.1054214464043301e-16,4.2270209902827835e-36,6.815625817262307e-68,2.853907428220739e-48,1.0713737556577535e-23,2.7505834760096787e-116,6.64850099430161e-154,6.759208877798122e-104,4.103851646308212e-20,1.1070169788088553e-15,1.9030784537355496e-150,4.206164523402189e-43,1.1855111303243555e-25,8.766590064611075e-53,1.0706029178265091e-86,2.780793911765182e-66,1.7039488785550044e-45,8.720268425921159e-87,1.0559365237785056e-22,2.780958743300598e-9,5.945384935732662e-6,7.53064471452965e-48,8.751335354319478e-69,3.898386893049957e-43,5.288022847216844e-75,2.282916164082209e-8,3.02149105887423e-39,2.1026341044159144e-67,4.021010511243422e-66,1.6793462263480843e-23,5.924433612909277e-80,1.1615399047100176e-57,1.9570259266133337e-46,9.016939682408636e-20,7.776811215480552e-67,1.0382694677155753e-5,1.0975150558765432e-13,1.2484318598290962e-9,7.968800062901437e-47,7.808751713618838e-26,1.6748418297370633e-88,5.6632213748705105e-12,5.591337337752311e-19,4.645276445854535e-74,9.84560279995643e-52,1.5628871376049085e-6,8.272267179204137e-56,0.000360964155629472,2.1755255490567917e-46,3.032117182557217e-5,4.093020138747818e-70,1.8317814646654887e-63,9.433821864619265e-34,8.343898114761758e-61,1.6842090115121584e-22,3.4921721382798834e-45,2.2471074191683466e-31,6.186153849426716e-54,1.4096647898610567e-93,2.60125585463611e-65,4.624660130701308e-28,0.005783576264174066,2.220910063093835e-24,5.515250978725584e-11,0.01993744488354011,1.5548834211523226e-34,2.2412475325530495e-39,5.017262994308959e-62,5.646266791769718e-39,6.790053368781465e-12,3.8405728038166557e-103,5.27805430741743e-44,1.1340731295576004e-55,4.923749597855489e-137,3.936956834164947e-20,6.532749307453995e-71,6.378599691163334e-59,1.1388799088179374e-12,3.0579506494577326e-47,4.20696342734322e-34,1.391753364051946e-45,8.57320651366009e-54,4.712658879843071e-6,9.13105681612392e-7,3.2641353675682015e-53,5.646817775495053e-32,0.019392314053324988,2.4843736312469282e-26,3.457550626492839e-13,0.0007985620013635741,1.8861762012505982e-14,2.1531797518451935e-32,3.0145921414494654e-33,0.0008059679011483429,1.389029015856099e-11,1.589885034734225e-25,6.556830316549724e-6,0.014358114493673666,0.013283704640910879,4.891764598335792e-67,4.969071415135675e-43,1.106860046154047e-84,1.1523896541411455e-36,7.8031949485725e-40,1.8700025165057533e-76,1.1205235042441125e-18,7.470179664232524e-64,2.586844303412886e-36,1.3075348996539214e-50,5.777059408220808e-51,9.317455981833749e-34,2.0032525094396948e-22,1.1866406724158889e-33,1.4657762989154756e-13,7.057605729085157e-23,2.055746908671435e-28,6.105689966142742e-190,4.162716268904775e-24,6.048725955197421e-6,2.8927166062279943e-84,1.257466481294252e-70,1.5696312884552694e-31,2.1842026190665974e-5,9.985722731374873e-96,0.03136907718094315,4.440002303536914e-130,1.0326199802924935e-42,1.882196624109037e-40,2.976765547475191e-42,0.00010072515638791868,1.6344208252467224e-27,4.752538053423548e-46,3.6950876780918983e-34,9.209656777385678e-57,1.3699881866567142e-65,3.84037615979814e-8,5.411190902513019e-49,3.497301900664487e-44,1.2064904647271958e-70,5.907580560132353e-26,3.1593183942188684e-14,1.8854299029470845e-35,8.284897786249951e-37,6.061334937827943e-10,6.365710170506704e-41,4.153576302338693e-71,1.290659669552787e-40,4.381955693815991e-45,2.08001253610603e-42,5.742519883631314e-76,4.5229892647964676e-89,4.6090299945539805e-45,3.940454857371415e-5,4.807245459239147e-14,1.1607021453418874e-39,6.919104410528168e-71,5.463182568015713e-54,4.744396015089557e-71,6.993247355792082e-97,3.6708225583346463e-29,9.388946632272693e-137,2.277686729649081e-27,6.218555076624673e-55,1.2456506513491218e-26,4.4322823050495424e-42,1.8392176954430224e-104,9.899997341176159e-74,2.5315984744978006e-45,3.674361711785633e-83,8.144194216357136e-89,1.6993352393369895e-106,1.7298435535839372e-41,9.430292363462234e-12,2.5943433600355155e-47,1.0678039239960602e-45,6.201261929875436e-9,8.6723139530251e-16,7.864735465126745e-31,4.002723411138863e-49,2.7878045974784484e-19,9.908016548778475e-25,9.956095677539947e-162,7.846170710258683e-5,1.6250078836637042e-57,2.0607499107819106e-14,3.439883088518375e-26,0.001852940296495081,1.4627658676512019e-16,5.376255902182726e-29,3.6681415308617614e-80,8.205901768142217e-145,6.366625553983029e-84,0.026236443006568216,8.629690362265159e-52,8.55722349937296e-35,1.3711454068922804e-26,3.871666914955113e-5,0.00206127106637916,3.4560224138637914e-10,1.188394690971016e-42,8.898835903157464e-42,2.0631124494173335e-75,0.031307868713703536,1.2516072715516124e-38,0.0007326879491776866,3.128439369249245e-50,1.425879401139039e-57,8.581268961490242e-6,8.669515688058714e-57,5.951932933440788e-66,6.3767146735845e-117,3.0825493630230937e-110,2.2133032574617997e-6,0.000498379234648392,9.737840050106044e-18,2.2250668831234664e-6,5.844332871470866e-69,2.258186097177487e-108,1.7406354237728065e-44,2.6374186463254805e-174,1.3775973647297626e-43,1.7983291544884407e-45,6.783690697191789e-38,1.0070839453149709e-41,2.1817551941582757e-67,7.914493084267626e-63,1.355450378775978e-122,5.743025790603203e-27,1.762088181727632e-28,0.02245337087200706,1.3760411673253e-94,1.9156456772527202e-62,2.7649355953852844e-23,3.013381253734445e-57,5.815065356373092e-34,2.3118510914494717e-8,1.0876755784116687e-84,2.2399054216276533e-53,2.202220014461743e-96,1.209619280970915e-50,3.467690447766444e-69,0.016804673889070875,1.7473152113492604e-55,1.3594232548442619e-43,1.3334888958451708e-85,6.187645005188927e-60,6.143428711938933e-29,9.10092513443381e-108,1.8170591659954984e-15,1.4067224236572419e-8,1.636576689883669e-73,9.518133913070983e-16,3.387603478911315e-74,1.3512780217745964e-61,0.0014761034669445597,6.3496285676254346e-83,0.00018396519815561636,2.1975872484066626e-80,6.4329575613195986e-15,1.4687923320754039e-52,2.959691498683753e-29,2.2506717436653083e-48,8.717813435566078e-62,3.108791046383714e-45,1.3508409471307352e-71,2.15108659436702e-73,4.815564891441982e-15,2.6431357023040134e-32,2.9894975721307367e-40,2.2502460485984847e-23,2.2400009946552078e-76,3.0847834526949275e-24,2.6987785813606127e-163,1.3491652754132209e-20,2.3936648798274465e-80,2.9775094040209603e-39,4.844582283784148e-30,4.586784129868481e-31,3.697595334329048e-21,1.5921150878388585e-52,4.409431071261675e-11,2.8965745186478195e-52,6.663523450246519e-10,2.0064640574451923e-92,3.8146735792223816e-47,4.012386147012851e-26,3.92844457315561e-95,1.460115284061814e-23,4.7267066868912935e-21,2.5372772444879546e-51,1.0049935326258223e-41,4.134703412270584e-7,2.0662973706525843e-7,0.00014954646079812066,1.1140433245165368e-44,5.390179606221814e-14,2.1639902659427436e-58,6.923049266523967e-20,1.3694697469863487e-55,1.3220552493064547e-41,5.639560519495859e-8,4.219561079671961e-49,4.315776697662351e-55,1.331112661405929e-64,7.215108253376572e-23,2.2493174038974776e-63,4.642143548161803e-68,6.712908126361216e-63,0.037577065580268756,7.4280531344549e-35,0.0014193336267526737,0.00542590208734191,0.012828444332177726,3.5199414968443145e-15,3.026281082416291e-12,1.352281707478211e-83,1.5503475513614226e-17,9.576379492916006e-46,8.026459406727374e-46,1.2901080720197285e-39,1.97394182883859e-5,1.4906460923623456e-39,1.7133654277389428e-35,1.1366780042759434e-128,2.0437624181855963e-56,2.521471922623401e-79,2.2499403640595718e-118,1.3454291706075825e-45,1.1615922617542778e-16,7.282491183192493e-44,0.00283827842924056,5.514487821365828e-17,2.7999714972921956e-19,9.601599830911145e-57,1.2233156673994074e-132,4.274043699198587e-61,7.623391444459324e-38,1.5414058073980437e-23,5.810589303050724e-13,1.5478980562310205e-5,1.0563241250238869e-7,7.778151825551661e-35,0.0001044455099266793,4.266081463130563e-9,6.762586952377458e-66,1.508139010596244e-62,4.850084924397938e-58,6.531386129156653e-20,3.7271439497746955e-14,0.0008033090866190594,1.1061108360276087e-239,5.414776541454815e-8,1.3848145574408096e-68,6.404734359905616e-22,5.639098149585236e-44,2.4096665422150688e-52,2.2002122326737093e-53,2.2341254338296098e-13,1.5396692666701467e-32,5.758056619795137e-54,5.135220569196585e-49,3.9897667819485486e-150,3.8184679843787976e-35,6.160818416249395e-94,2.557331143142454e-61,0.02533250051761301,5.104259673685251e-7,0.03677779341819601,8.329769455693308e-9,2.889078176227086e-169,2.290683117540954e-65,7.67607352903088e-40,1.5670975665262226e-88,1.0377682258179883e-87,0.0010881006526229323,2.0670688201994817e-37,4.098778023909762e-23,2.898425492148896e-41,5.1858163515349465e-93,7.039507272730518e-86,5.558048663453575e-71,6.077691261647256e-64,1.9463862783850592e-20,0.019451058262829137,1.2406337471806467e-90,1.2786230547291673e-50,4.3987304321036296e-32,1.5625397639446294e-74,7.028127721722542e-84,3.7147704940960216e-60,3.123880696542604e-54,9.029228482747596e-28,4.199928343494498e-69,1.3334225302621501e-65,1.8375910950932883e-13,3.231223306204738e-49,1.8897729905234676e-12,1.7226756878179238e-114,3.006145636189298e-38,3.87610344387933e-36,9.704223544836471e-58,1.835921311180152e-30,4.3388446234667395e-59,8.121309944686522e-72,4.922555215912125e-14,4.678360858291767e-29,9.173083490591518e-42,1.230201463826804e-104,8.236918683989026e-67,1.9419269292092456e-50,0.0006269436504443525,1.6305983012298038e-14,3.5526991112659877e-118,5.649242409252005e-5,2.882865626383729e-125,8.594904776312016e-36,5.575183753691738e-33,3.7626638037517785e-71,1.0709812116511812e-47,6.093136345048549e-13,8.258671893402618e-29,4.772854678554551e-33,1.6609149663161797e-36,4.037097998449078e-33,2.7415973191069584e-129,7.391033914092247e-46,6.4899986696298335e-24,1.311094785578614e-63,4.0599738483268034e-60,3.348441541284755e-86,0.027087066511293133,2.1461753060068993e-64,1.1373164692024791e-9,4.45840513332069e-50,1.514935580997498e-7,7.293471130758464e-102,0.0003270533732140392,3.8472717191372223e-94,1.6427160156046372e-162,1.0775935641007566e-18,6.668499470711975e-155,8.796634726457831e-31,2.5948009522163787e-110,8.867040702703466e-45,3.2012667132597087e-147,6.707521232114856e-51,1.6247558400822813e-35,6.43573042084446e-20,8.307219446598808e-52,1.3089968068384714e-64,0.022003448617003953,4.633815944138042e-80,1.1224171890157054e-30,5.0439810784265683e-54,0.010296042377281019,0.02412791938513515,7.480374103247308e-6,3.1680777595082865e-124,0.02174629651068979,2.329680774894274e-18,1.4270242237649643e-22,1.651325446007143e-70,3.873059423720364e-103,0.0001167560802684097,7.212787614486155e-14,1.1573059665105365e-43,8.480378721592302e-5,2.2872322816933643e-58,8.031781859994378e-18,3.5555026037450116e-107,4.611525803730734e-25,9.603133149778164e-183,1.188700555536091e-91,9.230942098094977e-19,1.3098102601872325e-36,6.014557055105365e-28,6.494461966542506e-25,3.884235540484556e-21,1.9156049860681718e-68,1.715078415369271e-105,2.0809925562943892e-31,1.8333763890505113e-59,4.5743881288715095e-61,1.390340243011858e-25,3.370890748516557e-14,1.1773369210172854e-139,2.871947111403277e-30,1.40645707820379e-134,8.96180199818852e-39,1.514658888619921e-6,4.5605711105560994e-31,1.7101092298662918e-51,6.014067848661365e-96,1.8970700025971723e-88,1.8447824674819134e-14,8.619929216812936e-7,5.763303961696153e-58,1.1294080183766918e-110,1.7102889814277188e-52,3.784059388324039e-40,2.1459793678503858e-130,1.463169206359883e-36,3.090865223406822e-136,3.4893988182919097e-82,2.7452020250524826e-30,0.009667871623357136,4.643253835258883e-46,9.665118395742404e-47,1.7547940595511624e-14,0.010333286978901509,2.093456375022928e-111,1.004489141979207e-73,2.562460446412674e-22,9.981358568097246e-96,2.8187771609778984e-29,3.8448731094625134e-74,4.2004833264996567e-81,1.5220425240593158e-18,7.625247539513877e-113,7.813457840480859e-89,9.215709969955846e-17,8.409501464921855e-93,3.940369084140379e-6,2.977320982279219e-34,0.004827356527526439,1.353788004358072e-60,0.007135868655905174,8.585632287458745e-13,0.006177686783950746,9.758213441961459e-110,0.00036782907154359447,2.2106194607992748e-11,4.063778005298649e-157,1.1867240992360972e-52,9.012093838784759e-16,1.455173959583424e-162,1.448685790282338e-22,1.9668592634764454e-54,0.02500049173466404,0.011321148828133839,8.921341222076891e-21,2.540993984859273e-33,4.148826050437358e-17,1.8758455004882686e-38,1.3635851408970183e-77,5.214986141574029e-69,3.2554412752079993e-115,2.2536498976263008e-7,2.6428034538911596e-19,0.00043041384951211727,1.795163975466188e-13,3.808252281352085e-23,5.634963553876751e-69,1.3356628502208842e-23,5.396026704375623e-18,1.125363793141108e-62,1.9106379305373662e-42,3.127774890942922e-29,2.225769145592121e-26,8.233177370109032e-51,6.884772517936503e-36,5.196807732380117e-45,1.34142036570868e-27,3.715620651946106e-70,5.889925950306323e-15,0.0020695678838311324,4.8007362756982245e-6,1.7689304798610441e-144,1.162317882444929e-14,1.8921262033731995e-14,2.4573665714832676e-28,7.763889880771295e-115,5.876837579406605e-26,7.4547625314067e-93,1.3699860621279166e-12,1.4977605675808022e-52,1.0117507461080395e-12,2.206567043846797e-59,5.381478258686823e-8,0.0249143309508967,6.173732425500366e-29,1.5402073583856924e-116,5.708876314191297e-41,2.325003392652098e-15,8.498822485744024e-39,3.564882325342885e-18,3.135792670287103e-32,1.0643088695631494e-49,3.787083417145657e-34,6.939816666564905e-71,7.36076226232708e-28,2.566010569612675e-72,0.00047243873530569523,2.1686725191475944e-41,1.452341042755591e-32,1.03747136140681e-15,6.414925797653035e-56,1.8286830654987025e-34,3.8150916237601714e-72,3.312896568157298e-55,1.3628457977603414e-48,5.895121740497234e-28,1.9204474900644095e-20,1.1671710936882924e-22,1.3786519975567583e-58,1.1922003047313916e-76,1.1347290838985625e-6,2.0092118552720347e-26,8.931194121690001e-73,7.759503822456452e-70,1.8148344167462628e-57,1.9549705002838947e-15,9.157356772093752e-53,9.55706814090021e-55,2.8970050359172883e-50,1.0306770207898375e-22,5.220372073504361e-31,2.5866071249773054e-44,5.138152561338747e-27,4.362429872730661e-113,5.905493248847289e-16,1.4933074096606863e-72,1.732200232212083e-16,2.39085129215952e-120,2.23571649230771e-62,9.99938264459174e-108,8.383381230996883e-29,2.8197473110197243e-46,8.534840044186023e-78,2.3132731001528735e-6,1.5086213341625719e-12,8.39703973519862e-28,2.7712518961869176e-88,2.0850626032892303e-70,1.1061485371780579e-18,1.6579543927607384e-96,7.538499391323316e-89,2.0269550757698816e-21,0.0361606532790018,2.684986836846484e-10],"x":[10.0,3.0,17.0,18.0,2.0,25.0,24.0,31.0,18.0,23.0,2.0,36.0,24.0,9.0,7.0,28.0,17.0,26.0,22.0,28.0,27.0,36.0,18.0,24.0,8.0,20.0,27.0,39.0,19.0,24.0,24.0,19.0,27.0,20.0,24.0,10.0,31.0,12.0,7.0,12.0,1.0,6.0,33.0,22.0,20.0,21.0,35.0,3.0,16.0,6.0,36.0,39.0,30.0,36.0,2.0,35.0,13.0,25.0,31.0,12.0,30.0,29.0,18.0,22.0,5.0,26.0,22.0,23.0,22.0,26.0,14.0,1.0,12.0,11.0,22.0,14.0,27.0,20.0,24.0,38.0,27.0,9.0,35.0,14.0,21.0,8.0,26.0,28.0,26.0,30.0,24.0,32.0,18.0,22.0,33.0,11.0,32.0,36.0,25.0,31.0,20.0,7.0,7.0,36.0,25.0,31.0,14.0,40.0,33.0,38.0,18.0,25.0,32.0,1.0,35.0,35.0,21.0,30.0,22.0,14.0,17.0,15.0,1.0,39.0,4.0,29.0,24.0,10.0,4.0,7.0,34.0,2.0,14.0,23.0,12.0,37.0,33.0,33.0,4.0,4.0,31.0,38.0,9.0,22.0,21.0,12.0,8.0,33.0,6.0,16.0,38.0,21.0,0.0,34.0,7.0,31.0,13.0,14.0,6.0,23.0,30.0,17.0,37.0,3.0,18.0,8.0,37.0,1.0,36.0,6.0,37.0,27.0,8.0,33.0,21.0,40.0,27.0,11.0,15.0,5.0,28.0,24.0,6.0,24.0,16.0,22.0,31.0,18.0,10.0,21.0,4.0,24.0,12.0,0.0,35.0,0.0,33.0,26.0,35.0,34.0,9.0,7.0,35.0,8.0,31.0,25.0,12.0,20.0,22.0,34.0,30.0,15.0,40.0,34.0,18.0,29.0,33.0,19.0,37.0,29.0,15.0,14.0,39.0,24.0,32.0,25.0,18.0,26.0,18.0,28.0,1.0,10.0,28.0,15.0,39.0,39.0,16.0,37.0,10.0,4.0,11.0,8.0,17.0,17.0,37.0,4.0,39.0,1.0,39.0,25.0,37.0,21.0,32.0,13.0,33.0,36.0,24.0,34.0,19.0,28.0,24.0,11.0,17.0,36.0,13.0,32.0,15.0,33.0,38.0,36.0,0.0,29.0,7.0,32.0,8.0,28.0,8.0,36.0,19.0,30.0,36.0,14.0,14.0,2.0,14.0,8.0,21.0,1.0,10.0,13.0,13.0,20.0,26.0,34.0,39.0,16.0,36.0,16.0,29.0,39.0,8.0,19.0,33.0,20.0,4.0,28.0,23.0,28.0,29.0,32.0,24.0,29.0,39.0,11.0,13.0,39.0,5.0,20.0,1.0,37.0,2.0,10.0,12.0,32.0,6.0,27.0,6.0,16.0,23.0,39.0,33.0,14.0,37.0,37.0,18.0,11.0,27.0,28.0,35.0,33.0,27.0,12.0,23.0,18.0,40.0,37.0,5.0,5.0,36.0,19.0,38.0,1.0,25.0,21.0,33.0,5.0,31.0,39.0,17.0,3.0,17.0,3.0,28.0,37.0,14.0,17.0,6.0,28.0,17.0,8.0,25.0,34.0,34.0,8.0,7.0,3.0,35.0,35.0,19.0,20.0,19.0,35.0,18.0,11.0,0.0,9.0,14.0,14.0,8.0,2.0,9.0,10.0,8.0,5.0,3.0,4.0,37.0,11.0,19.0,5.0,11.0,17.0,11.0,4.0,19.0,40.0,5.0,29.0,24.0,39.0,35.0,12.0,0.0,22.0,27.0,8.0,35.0,30.0,5.0,28.0,7.0,22.0,6.0,27.0,37.0,31.0,38.0,21.0,39.0,20.0,21.0,32.0,16.0,3.0,2.0,22.0,18.0,13.0,15.0,35.0,29.0,0.0,30.0,17.0,10.0,14.0,40.0,32.0,9.0,27.0,32.0,34.0,25.0,35.0,4.0,20.0,30.0,14.0,27.0,9.0,28.0,20.0,32.0,5.0,38.0,22.0,3.0,14.0,6.0,28.0,33.0,38.0,18.0,28.0,39.0,8.0,26.0,0.0,22.0,5.0,16.0,4.0,28.0,23.0,22.0,11.0,40.0,38.0,7.0,35.0,18.0,4.0,0.0,28.0,24.0,31.0,24.0,14.0,14.0,25.0,9.0,20.0,4.0,28.0,19.0,11.0,13.0,14.0,14.0,10.0,18.0,18.0,12.0,32.0,29.0,6.0,27.0,20.0,13.0,31.0,5.0,36.0,23.0,32.0,11.0,1.0,3.0,8.0,24.0,19.0,14.0,28.0,39.0,11.0,15.0,15.0,35.0,39.0,9.0,8.0,30.0,0.0,4.0,18.0,29.0,34.0,27.0,11.0,18.0,33.0,9.0,12.0,29.0,17.0,32.0,29.0,17.0,35.0,23.0,19.0,40.0,12.0,24.0,20.0,33.0,11.0,4.0,9.0,27.0,40.0,0.0,38.0,2.0,38.0,4.0,13.0,13.0,16.0,26.0,4.0,1.0,39.0,31.0,23.0,28.0,13.0,14.0,21.0,6.0,40.0,12.0,28.0,38.0,16.0,12.0,38.0,16.0,35.0,24.0,7.0,15.0,38.0,1.0,3.0,25.0,39.0,13.0,5.0,7.0,17.0,14.0,15.0,10.0,11.0,34.0,9.0,33.0,17.0,13.0,34.0,26.0,5.0,3.0,9.0,31.0,8.0,2.0,31.0,30.0,36.0,14.0,33.0,14.0,35.0,12.0,39.0,33.0,34.0,16.0,9.0,21.0,1.0,31.0,30.0,30.0,1.0,30.0,37.0,33.0,31.0,38.0,39.0,19.0,27.0,1.0,35.0,25.0,24.0,12.0,18.0,38.0,16.0,24.0,7.0,39.0,22.0,28.0,6.0,8.0,9.0,30.0,20.0,33.0,11.0,12.0,1.0,33.0,30.0,5.0,9.0,26.0,5.0,2.0,8.0,5.0,19.0,40.0,37.0,30.0,16.0,37.0,40.0,34.0,19.0,32.0,6.0,31.0,2.0,35.0,37.0,6.0,28.0,15.0,5.0,11.0,15.0,38.0,17.0,2.0,27.0,22.0,19.0,1.0,33.0,34.0,36.0,4.0,21.0,35.0,3.0,7.0,4.0,28.0,8.0,16.0,32.0,38.0,22.0,32.0,15.0,0.0,33.0,32.0,16.0,25.0,31.0,35.0,27.0,0.0,17.0,35.0,38.0,31.0,17.0,3.0,15.0,21.0,10.0,20.0,12.0,28.0,38.0,22.0,30.0,2.0,1.0,14.0,38.0,4.0,1.0,35.0,31.0,0.0,36.0,15.0,38.0,2.0,15.0,23.0,27.0,16.0,7.0,23.0,37.0,2.0,36.0,11.0,27.0,6.0,19.0,15.0,18.0,1.0,25.0,30.0,36.0,39.0,25.0,18.0,9.0,7.0,19.0,17.0,21.0,32.0,10.0,3.0,20.0,35.0,29.0,10.0,37.0,12.0,1.0,12.0,5.0,25.0,37.0,37.0,23.0,33.0,1.0,4.0,29.0,35.0,23.0,23.0,27.0,37.0,20.0,19.0,3.0,2.0,28.0,8.0,30.0,19.0,18.0,20.0,9.0,5.0,20.0,3.0,8.0,39.0,7.0,28.0,37.0,8.0,20.0,11.0,18.0,39.0,7.0,35.0,26.0,3.0,8.0,2.0,26.0,25.0,37.0,31.0,37.0,33.0,20.0,38.0,38.0,25.0,39.0,15.0,32.0,24.0,3.0,25.0,21.0,2.0,20.0,5.0,34.0,34.0,8.0,23.0,29.0,30.0,7.0,39.0,5.0,9.0,23.0,18.0,37.0,2.0,32.0,26.0,12.0,17.0,37.0,22.0,25.0,27.0,16.0,28.0,17.0,7.0,3.0,34.0,13.0,39.0,17.0,28.0,11.0,8.0,29.0,4.0,9.0,27.0,23.0,22.0,1.0,22.0,24.0,12.0,2.0,13.0,4.0,24.0,33.0,17.0,35.0,30.0,6.0,8.0,29.0,4.0,10.0,11.0,23.0,34.0,23.0,18.0,9.0,40.0,38.0,37.0,22.0,3.0,21.0,36.0,11.0,24.0,30.0,7.0,14.0,37.0,40.0,34.0,9.0,12.0,6.0,12.0,37.0,6.0,13.0,30.0,12.0,18.0,21.0,37.0,11.0,40.0,6.0,24.0,2.0,23.0,6.0,37.0,18.0,27.0,15.0,32.0,36.0,30.0,24.0,40.0,20.0,18.0,10.0,15.0,4.0,11.0,25.0,18.0,1.0,33.0,16.0,0.0,28.0,19.0,35.0,40.0,5.0,4.0,29.0,23.0,18.0,22.0,38.0,22.0,18.0],"r":[24.0,41.0,26.0,8.0,94.0,5.0,6.0,74.0,37.0,30.0,23.0,24.0,97.0,64.0,84.0,78.0,82.0,32.0,14.0,63.0,7.0,88.0,14.0,2.0,6.0,69.0,3.0,9.0,93.0,81.0,69.0,19.0,21.0,29.0,15.0,11.0,85.0,4.0,35.0,2.0,39.0,17.0,26.0,90.0,52.0,9.0,41.0,56.0,100.0,77.0,33.0,62.0,12.0,41.0,84.0,1.0,62.0,93.0,28.0,77.0,46.0,80.0,28.0,64.0,7.0,10.0,10.0,32.0,26.0,85.0,49.0,91.0,41.0,59.0,66.0,85.0,85.0,87.0,5.0,54.0,45.0,20.0,16.0,96.0,81.0,27.0,79.0,38.0,59.0,80.0,56.0,4.0,60.0,44.0,79.0,62.0,90.0,83.0,16.0,71.0,57.0,63.0,83.0,21.0,56.0,14.0,29.0,94.0,59.0,23.0,12.0,16.0,15.0,71.0,75.0,34.0,87.0,32.0,7.0,52.0,23.0,11.0,38.0,25.0,37.0,69.0,33.0,76.0,35.0,6.0,42.0,63.0,3.0,66.0,52.0,55.0,77.0,3.0,40.0,53.0,16.0,75.0,32.0,48.0,99.0,63.0,96.0,21.0,33.0,15.0,4.0,1.0,62.0,19.0,9.0,25.0,15.0,65.0,19.0,58.0,11.0,29.0,74.0,27.0,76.0,53.0,11.0,40.0,100.0,25.0,49.0,29.0,90.0,91.0,89.0,45.0,26.0,67.0,6.0,45.0,14.0,49.0,80.0,56.0,58.0,62.0,83.0,64.0,70.0,18.0,27.0,60.0,10.0,100.0,57.0,61.0,31.0,17.0,53.0,91.0,34.0,46.0,64.0,85.0,40.0,11.0,85.0,37.0,67.0,36.0,67.0,85.0,65.0,83.0,24.0,39.0,34.0,95.0,63.0,14.0,50.0,25.0,40.0,37.0,96.0,100.0,32.0,84.0,82.0,38.0,89.0,9.0,38.0,93.0,47.0,95.0,37.0,5.0,81.0,90.0,35.0,12.0,26.0,52.0,94.0,93.0,14.0,67.0,24.0,73.0,78.0,23.0,64.0,92.0,30.0,95.0,57.0,53.0,61.0,80.0,65.0,58.0,81.0,81.0,7.0,46.0,16.0,59.0,62.0,84.0,62.0,42.0,67.0,84.0,34.0,22.0,69.0,82.0,85.0,85.0,38.0,43.0,21.0,30.0,38.0,36.0,83.0,58.0,91.0,15.0,54.0,61.0,88.0,98.0,62.0,21.0,39.0,47.0,13.0,66.0,1.0,28.0,50.0,66.0,73.0,81.0,41.0,51.0,54.0,51.0,74.0,24.0,89.0,100.0,27.0,70.0,57.0,67.0,17.0,85.0,28.0,32.0,42.0,89.0,79.0,70.0,3.0,25.0,6.0,10.0,51.0,63.0,52.0,57.0,34.0,66.0,7.0,14.0,49.0,73.0,70.0,8.0,86.0,26.0,77.0,76.0,82.0,96.0,9.0,11.0,75.0,47.0,20.0,56.0,39.0,100.0,73.0,6.0,31.0,11.0,25.0,29.0,59.0,96.0,48.0,76.0,66.0,71.0,21.0,29.0,98.0,73.0,52.0,70.0,78.0,52.0,48.0,79.0,35.0,19.0,15.0,97.0,72.0,38.0,63.0,12.0,75.0,94.0,92.0,19.0,98.0,70.0,46.0,31.0,34.0,7.0,30.0,22.0,72.0,29.0,75.0,18.0,17.0,86.0,51.0,28.0,63.0,12.0,54.0,8.0,88.0,91.0,29.0,81.0,56.0,61.0,54.0,70.0,61.0,64.0,40.0,1.0,39.0,21.0,6.0,46.0,88.0,90.0,94.0,32.0,81.0,84.0,88.0,59.0,19.0,80.0,89.0,25.0,73.0,60.0,98.0,53.0,20.0,5.0,84.0,62.0,9.0,18.0,17.0,11.0,37.0,37.0,64.0,9.0,19.0,49.0,18.0,6.0,7.0,80.0,81.0,74.0,42.0,56.0,88.0,22.0,60.0,54.0,47.0,94.0,27.0,37.0,55.0,21.0,55.0,44.0,72.0,29.0,8.0,85.0,78.0,30.0,15.0,93.0,5.0,86.0,47.0,62.0,64.0,23.0,43.0,56.0,21.0,64.0,78.0,30.0,92.0,76.0,72.0,63.0,20.0,41.0,44.0,23.0,67.0,72.0,63.0,71.0,31.0,94.0,77.0,77.0,13.0,28.0,15.0,54.0,94.0,75.0,99.0,70.0,91.0,73.0,50.0,56.0,40.0,94.0,30.0,51.0,93.0,99.0,64.0,70.0,25.0,63.0,45.0,6.0,46.0,69.0,80.0,26.0,54.0,91.0,4.0,62.0,19.0,38.0,14.0,31.0,62.0,100.0,80.0,97.0,5.0,88.0,74.0,41.0,14.0,7.0,28.0,64.0,99.0,51.0,5.0,40.0,18.0,87.0,87.0,6.0,98.0,74.0,90.0,73.0,4.0,11.0,30.0,10.0,87.0,68.0,92.0,80.0,34.0,75.0,49.0,69.0,99.0,53.0,85.0,40.0,46.0,7.0,93.0,68.0,37.0,86.0,20.0,14.0,66.0,92.0,77.0,83.0,89.0,3.0,71.0,62.0,73.0,60.0,40.0,79.0,26.0,21.0,43.0,17.0,88.0,77.0,2.0,91.0,14.0,100.0,22.0,30.0,66.0,51.0,67.0,55.0,91.0,63.0,14.0,37.0,68.0,43.0,84.0,48.0,87.0,38.0,83.0,68.0,15.0,63.0,31.0,72.0,9.0,49.0,31.0,68.0,65.0,22.0,65.0,65.0,57.0,26.0,41.0,21.0,19.0,17.0,52.0,28.0,66.0,46.0,79.0,34.0,21.0,76.0,56.0,49.0,50.0,73.0,81.0,67.0,1.0,63.0,7.0,5.0,3.0,30.0,17.0,84.0,49.0,56.0,61.0,53.0,13.0,31.0,30.0,88.0,68.0,86.0,92.0,77.0,34.0,17.0,2.0,48.0,25.0,92.0,80.0,85.0,56.0,19.0,28.0,19.0,6.0,48.0,9.0,17.0,65.0,96.0,47.0,36.0,15.0,10.0,87.0,22.0,94.0,42.0,44.0,73.0,61.0,19.0,75.0,66.0,69.0,96.0,48.0,89.0,84.0,5.0,28.0,6.0,15.0,93.0,79.0,33.0,56.0,95.0,4.0,87.0,46.0,91.0,60.0,79.0,85.0,97.0,26.0,5.0,88.0,66.0,58.0,95.0,88.0,80.0,60.0,52.0,92.0,53.0,18.0,50.0,10.0,70.0,46.0,26.0,67.0,31.0,39.0,69.0,34.0,45.0,43.0,79.0,78.0,85.0,8.0,20.0,80.0,2.0,65.0,80.0,59.0,47.0,62.0,28.0,26.0,33.0,48.0,29.0,78.0,90.0,60.0,92.0,96.0,100.0,4.0,89.0,21.0,64.0,14.0,73.0,6.0,91.0,81.0,51.0,100.0,55.0,88.0,62.0,86.0,65.0,38.0,33.0,39.0,44.0,5.0,84.0,26.0,78.0,1.0,4.0,8.0,97.0,7.0,39.0,33.0,93.0,62.0,11.0,28.0,95.0,12.0,92.0,38.0,73.0,21.0,62.0,45.0,24.0,87.0,31.0,20.0,21.0,61.0,66.0,32.0,100.0,87.0,46.0,31.0,81.0,44.0,98.0,29.0,18.0,66.0,94.0,75.0,93.0,44.0,11.0,90.0,54.0,32.0,91.0,95.0,60.0,91.0,81.0,71.0,3.0,63.0,85.0,19.0,7.0,79.0,88.0,41.0,85.0,44.0,54.0,96.0,13.0,99.0,97.0,25.0,79.0,8.0,41.0,9.0,100.0,4.0,25.0,9.0,92.0,4.0,24.0,72.0,60.0,27.0,87.0,58.0,95.0,8.0,1.0,46.0,41.0,20.0,89.0,95.0,61.0,61.0,19.0,21.0,5.0,18.0,42.0,49.0,33.0,21.0,66.0,76.0,46.0,49.0,99.0,83.0,34.0,24.0,100.0,26.0,2.0,13.0,85.0,38.0,33.0,36.0,87.0,38.0,37.0,39.0,99.0,16.0,60.0,12.0,1.0,57.0,90.0,50.0,30.0,96.0,50.0,42.0,64.0,61.0,93.0,22.0,76.0,5.0,72.0,68.0,21.0,67.0,34.0,84.0,91.0,95.0,30.0,43.0,29.0,98.0,64.0,23.0,39.0,69.0,82.0,63.0,27.0,89.0,75.0,81.0,25.0,63.0,56.0,55.0,77.0,19.0,89.0,29.0,87.0,41.0,62.0,34.0,76.0,68.0,12.0,34.0,44.0,56.0,98.0,23.0,95.0,85.0,41.0,6.0,17.0],"p":[0.09408577858118959,0.1895205826838689,0.12011077071946717,0.1741617945675718,0.18539220730307715,0.1328172245966647,0.1990472935623148,0.04238292106869954,0.053462609893334005,0.07068155820168749,0.067817870232218,0.16185796677914166,0.13901908139424815,0.179852699643462,0.13706168417160752,0.14618968359519788,0.09997424139480025,0.10960711521620006,0.16219143445090967,0.012712848817049106,0.17921628222403593,0.16642844535556778,0.17486194605129973,0.13036600691189668,0.0940935818855452,0.07138696578281288,0.06128822857618613,0.05205661581119525,0.08199303548801101,0.014709257649362907,0.19901272892478034,0.13310486475527725,0.06203579895692238,0.0879540226034882,0.14717131460637578,0.16992449401668752,0.13369507865108746,0.03728326975901277,0.1336873479367963,0.005819970588965395,0.11517137566531198,0.07197757395842941,0.17243446211847324,0.1905144440426652,0.17706720119800093,0.10352101905588623,0.0157806542624082,0.026280947216587382,0.1710459227838472,0.12559198525001106,0.17577783613209116,0.0875668476718413,0.013228388371944934,0.06775253717835349,0.13119672058309578,0.030343257566829696,0.10277264261807684,0.0008359963611308086,0.06129618593342143,0.15312902303531475,0.12725146380133104,0.004891488006328615,0.11920630136661302,0.04970370273507077,0.008586578784887378,0.10920309728591066,0.18392986554584542,0.019873505691744467,0.1926371173186933,0.14015669716063492,0.1240328817550021,0.03704869922731429,0.103443390784645,0.10258733796026767,0.09464026252320301,0.020682954372191188,0.05031981158535577,0.18378768018300962,0.09807343153586263,0.02869037034172388,0.06524260593005864,0.055798354273033327,0.06844670881312691,0.13347362377023095,0.1705596288025571,0.017669822955868143,0.0924078484810424,0.05929746097596436,0.06291700887823067,0.15216750495783993,0.12416105569552723,0.02775807888034572,0.12517134037807484,0.053406769622221975,0.035169262343623185,0.08757761224696226,0.020917183798818864,0.10342177532310091,0.05952314723282966,0.1597869262664022,0.006105910360541644,0.00601645320163513,0.1002445036168739,0.09656953842440559,0.11636879535968854,0.02982893953989381,0.17332552966156106,0.0342395303670624,0.17925230942762815,0.033122714277142376,0.1153487755693623,0.07629000460918096,0.0341964486331686,0.1746356192746113,0.13679364442666656,0.11999843546499589,0.0602438593101958,0.10668213408321031,0.18674766684065447,0.07233591286388652,0.014604668709810432,0.08460209357935616,0.015660737631488255,0.19978447787693995,0.13007978550602567,4.2171588706008125e-6,0.15541118097282858,0.15872902071190698,0.09434928420990843,0.04838735546016513,0.12534221180699642,0.01882277154652088,0.07330230990231326,0.030110710924307418,0.11638692334019587,0.03509637668845036,0.1729745913303319,0.1437983781773101,0.13648848334417854,0.09709134078358757,0.017794831761318887,0.06987501847405975,0.030781644053150717,0.08560228258235383,0.108220729861945,0.16203092554762072,0.07069600400154097,0.15431063953746046,0.10419546728155793,0.13653071450996937,0.1395918792333664,0.12872464388972996,0.15167709087154946,0.1816425727657256,0.10207196304158694,0.17326236788502392,0.06080229489826294,0.09207765963152813,0.14540400568484654,0.1615141955029031,0.18185712763334216,0.1590385191286178,0.09184013051293678,0.1082975558941818,0.014691720461496605,0.0019570968764000885,0.09222051829300267,0.1881342817924786,0.19566401026688382,0.10268386798318817,0.14937346110235059,0.08996137729099499,0.11933719547511075,0.08849353271780239,0.05750336301148105,0.1252877038347478,0.15029296866790642,0.15872295549649326,0.07534145568495765,0.06585416130101072,0.08847768505226235,0.05648245276488084,0.06715768172633063,0.08656806681870202,0.12344787124119755,0.006418057875895,0.06410820657319959,0.09426770394380593,0.18878578834138038,0.1675038080234683,0.07679335674717942,0.13140106681067884,0.08363320488394597,0.1011177600027792,0.13778877972573886,0.012603828903339487,0.029096097464121853,0.13288917227668917,0.06424493956762571,0.1984349004090948,0.0591698480545039,0.04715063810488829,0.0697990855440536,0.14613532688458672,0.11637390490670443,0.13927717265825698,0.06170393220267534,0.14224507487490806,0.11746535587413703,0.0016212380908517954,0.02728197441482716,0.03410519735213624,0.05896635774046826,0.09673662088021834,0.13673048288036616,0.04194619576579531,0.11770693839542541,0.03769677928423994,0.1816350923556457,0.05936721445415101,0.12362696784730397,0.08565118923555298,0.1625990719269738,0.1442194794892687,0.07982072809318033,0.046190786217843095,0.14904730074583214,0.18333614144230054,0.033775304949128636,0.14828697428779067,0.19388975519960294,0.0706104355160118,0.13174841755576888,0.1515156667625795,0.049036410745707616,0.18715646389887902,0.11537392166084169,0.053247504078203,0.014879701877967479,0.19155914892735204,0.07811167300781646,0.15192153567927347,0.09279573140349312,0.1556869901279627,0.18173790405044454,0.03258536483914951,0.1461034188846819,0.11241460403235148,0.12819616621421287,0.05793632466249581,0.10515302589433265,0.06452263820908981,0.09071887941575874,0.0373212459397926,0.19474731094688888,0.116521386585067,0.19573349633114648,0.060023145630224664,0.14239840216406838,0.11377856342329724,0.01999497236250134,0.18725808133591093,0.057664360800844694,0.15524222799602244,0.09893688867990265,0.14017838420929843,0.06733855062483661,0.028247213287655004,0.03832830291117433,0.10880093968205151,0.11833858766928321,0.03499344693702655,0.12654976753290295,0.17841946440269277,0.13217882775413223,0.003028746697898477,0.039822579215154356,0.004998094403013198,0.10188816977959628,0.16443722634250504,0.0936286225135362,0.03082420147919467,0.08635880968233228,0.07955973292571268,0.08286939671184906,0.11120334311056138,0.14578401747848765,0.05094639682620059,0.03335694567161931,0.17099597575311665,0.18636004843101897,0.19615811718796025,0.05270260040524595,0.0703926035885218,0.14834297527208748,0.05078656184294333,0.14488774844815966,0.0914243237833524,0.15939273115145247,0.12057822200486315,0.07812574413807849,0.1778759452987183,0.05201924504773663,0.07059153820988683,0.13059390628281098,0.1574733638449383,0.05740399592683483,0.13902923249486385,0.19289856214214607,0.029832959507330916,0.029471325392327198,0.06119110812312716,0.13475636416738848,0.19747248218034433,0.11390081840013805,0.17496055289503612,0.04854806599605959,0.06215991395810652,0.07513634137085307,0.14255331522472603,0.11923774473607646,0.09424477007958726,0.1436936356458087,0.19750509702476135,0.11747754161573837,0.030277385298367057,0.021528053323958754,0.14810279365916107,0.0871109889384,0.1737527777090036,0.19916913843402637,0.14364560563712478,0.10467034351978954,0.006709908691138234,0.06477876795271108,0.03464108048256098,0.15134929422665896,0.052467691902454754,0.1160758313493599,0.05225735832051481,0.10109244263786268,0.039020643323090014,0.1386898560691094,0.10011637847325844,0.1489369356469609,0.10645492262342104,0.10731300728876617,0.01646850374338298,0.00829173573216333,0.1351583406380466,0.02122327401754731,0.18614833073335213,0.1330280723938366,0.061639658855485106,0.07683662374962218,0.16533255793569404,0.17295160091164205,0.1905449855649602,0.095642197052997,0.18212221819795557,0.08740275057354441,0.0453247883909568,0.030630164910655025,0.15497678486719085,0.1859249660202077,0.017473295207043327,0.003594997574005321,0.016063679664327736,0.04031802006719363,0.17773155209535385,0.016239634547607774,0.1157545510999813,0.12633470902316152,0.13055613442896177,0.059761586274886105,0.045285801278691286,0.03941660540914316,0.035229274183366986,0.0987300662322797,0.11223094316962264,0.13768619108646304,0.16334116091392847,0.06385952043520203,0.04138182546465044,0.06622236031304776,0.09095682493175361,0.19649925985746042,0.13122330398596507,0.1489933962185058,0.04826700331599457,0.1171682092436265,0.10466677645881028,0.06560719895948224,0.1661846537975903,0.008762035070510299,0.09578236512085066,0.10073998549766437,0.18687137036560242,0.12866305860555638,0.09035678681431168,0.04517270037929127,0.07721174880767126,0.03289905561309849,0.11900766360755131,0.04797946356509222,0.17744970707179886,0.10437709220755376,0.1151218422056659,0.06331409679431421,0.035050001419336944,0.07527469440943416,0.14226521869778047,0.07264339396184712,0.09956308429449523,0.18608983236288248,0.13104352168409342,0.10152885689075086,0.07823954455576937,0.02318977682422987,0.04309173551939534,0.13631735791114133,0.13275165907529315,0.1699565631707332,0.08797806452235526,0.17436632803056212,0.06645025065428638,0.1695788861381519,0.1214844038630476,0.1871490161944178,0.18765562799785465,0.029832072446894967,0.14885661296835706,0.15137131556990477,0.004097955051241042,0.07281391477475317,0.07193760382026766,0.13628329981468354,0.15030456597552555,0.14174867749721076,0.11014403578781451,0.1901640384540224,0.09970996241510927,0.1498479857091616,0.011310658235010563,0.17027677738257202,0.19001185906799,0.14211006399785298,0.0074379002455172046,0.08232811193102677,0.11955921029404531,0.14583083896913393,0.04164405764580521,0.1511261115410441,0.07654852585568382,0.17488811448766364,0.15053343352688417,0.13320256219886342,0.15230024200850134,0.12200675173147242,0.10707556718623096,0.1528715761666189,0.03977334034129947,0.04645923112782216,0.15410912503929208,0.06094926112753716,0.045480320162596094,0.07469287855007756,0.12500498424376735,0.06118473896632959,0.1572574624217954,0.01478484468297836,0.07490123907662959,0.1316055177568972,0.0626035020685118,0.14664187830428094,0.15266511080807238,0.0011130996210884981,0.1562325834017694,0.042169279583560475,0.0850821466970023,0.07683662766746764,0.06659671758726136,0.11957922434025053,0.05330265529223919,0.14825580557040205,0.02162510820637156,0.03938365938802755,0.08693346818215267,0.16514707823630526,0.19771432929708893,0.11237677608063193,0.12408843348749282,0.025584806154636076,0.05904280694457236,0.07654853222024949,0.19000223076053882,0.16969311575608656,0.17150481476515933,0.06580719104774468,0.1967359344861908,0.10087816319857033,0.06100414001596182,0.11627690688770964,0.11396543111912516,0.13814155043497395,0.06993626405182245,0.14350679723022639,0.148126101203455,0.02007276234103386,0.11560524752160828,0.04080692436226126,0.1568029549745877,0.17525356717279444,0.09507115373767246,0.0004769087359217661,0.03637417851639109,0.1475649703310511,0.06331621355272508,0.07356161108116348,0.1836201786485223,0.026334368914961638,0.19369018964601337,0.03558812316811904,0.1413291195420574,0.05106428024735532,0.0751280955259953,0.0027762539251168675,0.08910527082707748,0.07194359730662328,0.07934734428387823,0.013043787569377498,0.12418467837987812,0.08544711262657817,0.11770909357788516,0.05080882413897188,0.008774896206876149,0.17416485604557774,0.15063212719093386,0.18106204705098825,0.10633268071178957,0.1504472939016404,0.017011720215512095,0.040320044542803184,0.0647438618237111,0.0439733850641566,0.0663481413547586,0.17700289439289973,0.1621927741958604,0.19503284613743085,0.08059129390898155,0.011285474393866757,0.09740552040426947,0.16938445973054597,0.16495885027227072,0.16156564951879018,0.08385656427331489,0.15793546676923798,0.06475400133466817,0.1685556965267132,0.11895860713747548,0.18547001268762717,0.019759027766130144,0.14908134639133427,0.047517137372839094,0.1847694770351645,0.19131450016828194,0.18929552046684833,0.04305434584960177,0.14790046660431125,0.051885913839300996,0.05116111094999298,0.01247092902533411,0.021931870711701596,0.08835537656020583,0.19581071943352898,0.08190450061802884,0.11009519210761837,0.014883741386148452,0.185538271939543,0.005650470194355384,0.0495440507142432,0.10508645440663944,0.06487502546709259,0.13095336597000692,0.11471899161521143,0.038289871364238205,0.02364252864568832,0.09304427975151204,0.17783481710096166,0.16884806708740563,0.0677364280116004,0.05626948831214134,0.07066538915087835,0.13906074474567287,0.008570201639196019,0.047640611934281644,0.030245539247226595,0.12915544648595642,0.029125520014173435,0.1940688108227819,0.11001244521258675,0.06678153966733356,0.15986641918318717,0.1730144021330876,0.03367279959459753,0.036731931880130735,0.10353008901206305,0.03561075252326647,0.15933235277149957,0.1589134333263632,0.010278496297389772,0.04310934703760654,0.10513219660601375,0.11017754553158571,0.00736361638109,0.09255895364434541,0.1194396936919901,0.10264077651502666,0.09388887835775198,0.004770544071471284,0.181762998319279,0.08736974013627417,0.10480419950284144,0.10228732188182095,0.08265365808664278,0.04908998811012602,0.06876723007190888,0.0444114933561691,0.11896398838480896,0.09803623858013184,0.08123574390412083,0.1201094504962287,0.008723280208029083,0.0941115015210705,0.07390553400568015,0.10779997649547002,0.001899307441176923,0.13807493439174512,0.09467100401785844,0.1350858774254547,0.013367474139601355,0.08212349735648378,0.16719680544656645,0.019393124917861427,0.08442725301195889,0.06107084997794213,0.014912445662847641,0.18768108570526745,0.18457408245949633,0.002817422512151957,0.029177556157755948,0.11441513816207777,0.15140318110175635,0.17063293564038387,0.13272028297589086,0.08999732549968474,0.06349894278471054,0.16828528644311047,0.13563997417604337,0.025596838115957744,0.10312875049119996,0.1406684497500632,0.047885181708059846,0.03380716153698726,0.12564855075593684,0.0726590982466787,0.07273619326664758,0.08982736072551467,0.06352777794549032,0.1992900513654191,0.06647987517268979,0.0755118300257228,0.13188179866072078,0.17226312412243822,0.08092625671421026,0.09796931653682783,0.1779849270943654,0.06338679099400171,0.14216596289870362,0.12093547050253127,0.10120424645357425,0.03736014187377421,0.05674198631137842,0.02637417550853125,0.12023758953032147,0.0716278328148412,0.02276398931273751,0.11312343262024815,0.11203722567651626,0.0008839765464273342,0.1396332632356129,0.15975450523046755,0.043642597147551324,0.15053924188607373,0.010102474128907746,0.15541440355225236,0.08748814389205078,0.0480485989032117,0.09923045906934808,0.13234168215212527,0.02537193704332732,0.07628857540606226,0.10046535984272459,0.19111614035606667,0.06412476527738753,0.15097288405390238,0.018848945993241363,0.13363145077501365,0.09372271232190484,0.1057105904290736,0.0009833646178061706,0.1718064665940911,0.18114757863922654,0.10789684806237165,0.033938438342952675,0.08267018716427264,0.1109118481888432,0.06267270921867861,0.17063776543472686,0.1333370183314034,0.14876467967675194,0.023751883758161618,0.07511026808604204,0.06767929570344751,0.11862878123474721,0.1414354079350941,0.1733303664606194,0.18966828684327358,0.05718262085812547,0.009913288602202065,0.1519748449769472,0.018211066997917635,0.010223652990018373,0.07797602296459316,0.028821140974136218,0.1933316028829212,0.11445753875965506,0.19618764653912174,0.02896767363715798,0.04941184014888922,0.0676978081874291,0.10493339562315424,0.045764320848775464,0.12649506468782615,0.08356330216009118,0.10353904413623823,0.14484536212683782,0.12241497511758648,0.06589706692089968,0.12142833494587886,0.05513726692652137,0.10693153788451758,0.103835765653839,0.02290887317434445,0.15005426850307624,0.09933829585697179,0.017670489986450467,0.009135364553776082,0.11837999446512303,0.03839256113353802,0.057022696351514406,0.03121192910299571,0.03188030097116199,0.03731046841846757,0.1980637426749571,0.07518581739315496,0.09515969272176289,0.0297399829574168,0.07510017394150209,0.13585535624943113,0.10536020326859506,0.10895516188185682,0.017839992671721074,0.0012477705004315443,0.010786722242919256,0.16715718872458663,0.18274843353468181,0.012072906868929367,0.13162225329950245,0.14420332008637923,0.03314835893788786,0.04257569018535876,0.16642235711025224,0.023782112611014705,0.010320931396748901,0.15030946523725094,0.15996772351692867,0.1139632553456603,0.15166958518773016,0.10560573387393135,0.16973165239048607,0.11562096979123355,0.13823062367953254,0.08646938329966668,0.06337597282092151,0.02801194408445631,0.14514139410914884,0.05508557262499907,0.004345915844813586,0.18948543081629976,0.02103128541317849,0.10467854173811104,0.03863426571713333,0.18280364381101646,0.013325303514003252,0.13316889033332588,0.044219485333154784,0.07223677096771901,0.013924516913674046,0.01421264120396164,0.10645002935164248,0.10795168313231791,0.04820458895710211,0.1002432755820618,0.024768703154128338,0.10334588750272045,0.042107871419584345,0.028274986763524003,0.19321907061841084,0.15642862847195071,0.08839899332755215,0.15731512228410707,0.019742308124511387,0.09108745266616057,0.19706264311531357,0.18806855283143806,0.12911596216288765,0.14694984937395514,0.15554363768547882,0.024362619944756015,0.0417376261910698,0.0005796410355738857,0.007693358164674935,0.09452600566318932,0.17836448815014358,0.08014713959625751,0.01436322267435286,0.02119442734568926,0.05385724073243417,0.013313529950419145,0.056082581160683945,0.16540257226979108,0.08915113197423691,0.19842161529639413,0.1057096899500353,0.009604630322189013,0.1734631494642546,0.033003908411326235,0.03964998247152347,0.13165463922117246,0.17264236851062995,0.13750278532209248,0.023993277602224385,0.052111492901270796,0.18368272297392588,0.06657051318639642,0.10540108461315666,0.0030721770749986277,0.007814051945824341,0.17260533261752276,0.028020439120855833,0.10442919168724477,0.017552057253683983,0.08600567155389381,0.1981825060415297,0.04727483043838028,0.17003686295795828,0.16956127930484444,0.11256368879792666,0.09900008853197675,0.017300826099618583,0.11199613794520276,0.12345422251380783,0.037301112526929185,0.08159647955255883,0.030421796215559516,0.06620853649372331,0.02195165648022024,0.05532622652756412,0.07051945649276052,0.08395690887849838,0.028654767563985706,0.14005097047745885,0.05021636674251795,0.1283629145747782,0.18018157788245023,0.06723679946237797,0.07934613194744378,0.14942272474176818,0.035100073667906795,0.019865615993157705,0.14474542717975108,0.0030715885893608966,0.07372659394802077,0.16500471281313545,0.012074782970110443,0.1738324447282074,0.18878535947714528,0.1864913048428039,0.1360713676822868,0.14781552896162023,0.09027958661694538,0.07536859564652834,0.19948235416465465,0.13319130426791956,0.05101301735651567,0.005722609907104959,0.13539570833441128,0.03759359384284431,0.1592387307032059,0.05321654119690349,0.11991679444490827,0.023001699467012894,0.16920632559736265,0.059876534106550944,0.09419682041464382,0.149086165005858,0.0848977523865797,0.15494796903967167,0.15674125507342246,0.1914576404505203,0.032244684232995625,0.03970127638246095,0.10799344726143123,0.19917815418156448,0.014776430334785885,0.15117710021718272,0.010905965471500157,0.14423319158700104,0.14784956110231998,0.07345379155180809,0.03558636362171321,0.060637941142862584,0.000864279643404764,0.16518102643279342,0.1799969228774579,0.11987663545712329,0.0517284537506026,0.03916320210877187,0.03827093530454065,0.15156109392820044,0.025388788409087315,0.10834193252337956,0.15224688632195937,0.19852219812400956,0.15872771819461678,0.05771502098149561,0.11794552130171057,0.17896942096984758,0.14219679117531214,0.02420166940133908,0.04750063369006133,0.08225425753653215,0.17574136776034274,0.1573975032019438,0.08122754947757174,0.08279019444284118,0.03849532215947393,0.06192747846473434,0.18017424749617328,0.14566157514647746,0.07805426580987365,0.14656951066802668,0.14366707196559755,0.15028013638999904,0.048922081050937566,0.14318319142751967,0.09876140060073785,0.04181102930728562,0.09036021239466355,0.05156096994732669,0.07192945235373625,0.13234747158614635,0.09816004142912456,0.1037835545909005,0.04430351142472553,0.18452745818571759,0.10702624883296004,0.18998805469802027,0.028902118597913518,0.06589220799467133,0.08394718946403673,0.11483420744286349,0.040082215234309486,0.009827947990929476,0.010353921916421704,0.14935446559377916,0.12337952535859786,0.03944305684793044,0.05781219930578807,0.12918865830810863,0.1789356197239551,0.021682947535518783,0.10296149028182883,0.049293665912990337,0.06048208193302047,0.05064514676595482,0.0976633256981657,0.1861708113233026,0.08474551872520815]}
},{}],154:[function(require,module,exports){
module.exports={"expected":[0.022795427111009927,0.022644777778773013,6.443333579818056e-6,1.1113787028769081e-6,0.00394805693458191,6.966915154981268e-5,0.0005063753477041505,2.3352709143424252e-5,0.3096802167046754,0.050656831099967804,0.09084863465534919,0.8706546821833705,3.175959553909941e-7,0.1370228045573019,0.0026946225842804056,7.98313543349229e-6,0.0009403521915979996,1.2036508004110913e-5,0.0016495097477621462,0.0010047699350760084,0.048201840952935227,0.18792390516978955,4.523896390837546e-5,0.33660512105792695,5.507375966625177e-7,0.00023454522937166496,0.08673197386667947,0.00029775238320128427,5.150120889764191e-5,9.820410430843551e-21,5.901306185229864e-7,0.181371249130906,0.07779246299908084,2.3208928334592255e-11,1.1594750744489098e-5,0.01962729168134619,5.893567384308124e-7,0.03446267507887345,0.23512777388288997,2.2798939352130364e-14,6.567420350982336e-6,0.0002406371002091344,5.890918142591833e-6,0.4347047855957552,0.016837160971355816,4.0103575099263125e-5,5.572843842173991e-13,4.209745812423396e-6,0.2595271405647248,0.1068369328762915,6.121032884766432e-6,0.008189620712891652,9.632813990679868e-8,5.40065367416322e-22,7.058260931659764e-13,3.2104019912761714e-10,1.1095243809088376e-7,3.029961225525615e-8,1.8208776569394498e-6,0.005051744603816506,0.0016632119759899767,0.17796700716490302,0.0010336571336844172,0.016207305504988025,0.32778809401389225,0.33402649539822626,0.032708514484168165,2.3318519928679355e-13,8.449422128244479e-16,0.006458736479735917,0.004665459952948212,0.0018007104190744367,0.09445835887490701,0.09543043587366531,0.0031619655503716242,0.2449507078468357,0.43983042027574265,4.5050492662963426e-7,0.005147781771896144,0.0011227937069224424,2.616689471911113e-10,0.00034233617225012367,1.0082233115835913e-17,0.00018030284156771734,0.17201932929665154,0.008562481202442716,1.4832795037903547e-8,0.880662129183532,1.0726079277649211e-8,1.5193365846936954e-12,0.19486131588043898,0.029896970088036864,0.15584948121262407,0.3330978393889335,0.002662657232347682,0.00013936979668992472,0.03875222862319545,0.008889502545040607,0.022759380455905455,9.163924183483999e-13,0.1521905747615129,8.264801021638604e-6,3.2642612951339025e-8,1.249547904423621e-8,0.20941654543336766,0.15730794547711557,0.0034011211212094236,0.1326987122163254,2.9835912528148536e-8,0.02831510679484054,0.000980898626522302,0.1273453947483586,0.05543237899127609,0.1498096888449697,1.2533678446384862e-13,0.2550549195550725,3.076517419530937e-5,9.090805363590939e-6,3.591396495453941e-5,4.7536834305247115e-5,2.1194764278240202e-10,0.00018905599338280121,1.5861767450606984e-6,0.0001509767453774338,0.00010254485656501107,0.3944918138609112,1.6800444040301363e-15,0.15933563199915335,0.0001450254619784245,0.1290422951453594,0.004627340780117778,5.5375814337151156e-5,2.526037991509378e-14,2.772719587061831e-10,0.09482742339479884,0.16630436324454828,3.890384582904234e-10,0.08465689584195983,7.9563285963212075e-28,1.7914043315657503e-5,0.0012673133243854494,0.11710565413334847,0.0029519061558227217,0.0020086219289022155,0.2759128355462357,0.01212348696514184,0.13813111028991787,2.484235160638628e-18,0.00012329611832113686,0.004653487540208595,1.067623052845121e-6,4.958184254590791e-5,0.00018811397645767327,0.0177656849234558,0.0008239216402809842,0.008496220878986369,0.0008044024228922238,1.727819545892826e-8,9.954599967731158e-6,0.11032128113330782,0.00018250751272418474,5.362410761576458e-7,0.015768189488480914,0.0006664357761890967,0.006133350613302214,0.0006029627461699125,3.5325626324401026e-5,3.2911480157878757e-6,0.012572562182171034,0.3262190476032476,6.391953962699151e-5,4.46498025712262e-6,0.04428465041667298,1.1267289776316743e-8,0.005566236039792715,0.23475636387936474,3.426243328047591e-7,0.000467941519078547,0.0004312709628106757,0.00016452344257745808,0.020081245150717946,0.8167629169858891,0.0009506283038806182,0.0006457497158183731,1.3937432544325354e-9,1.3591420883676174e-6,0.00014569503385750693,0.00017154518709872882,0.05876812485076689,2.8575781039771235e-8,0.05515694923343143,2.4005768696920585e-5,2.2647421622899563e-5,0.03570405514953148,0.13381050247151854,2.300314170275236e-5,1.0868949895568224e-6,1.365205298806215e-11,3.8188065680027605e-11,0.0178724764402553,7.240947568336788e-10,2.5326987563196867e-8,0.0021592396165527323,9.14893886086516e-6,0.024662447627949693,1.0939783895162016e-10,0.35806021801343846,0.03342862005287177,0.0022922329949485254,5.45243596202501e-8,9.913413335242612e-24,3.81417728366451e-5,0.015051112114326342,0.0016197966417237286,0.2116510963440842,0.03565378527707584,0.1028456544575545,0.16132315286401572,3.70146051831027e-14,0.24155658643709788,0.0611886020770385,0.00023162720091856633,0.1389457329718453,0.012503094897897707,0.12204234754025763,0.04566126084619772,9.89058881931311e-7,0.0012035569540999312,0.05365015151675606,1.0432375162999348e-5,0.13643286428260892,0.004846289539397241,7.059301667630212e-8,1.7143090110951423e-10,0.1506944169593758,0.00027915927720594127,1.6272882193895297e-6,7.124728499996832e-5,0.004988125588140433,0.16449295678804166,1.3176603534226448e-6,0.010827238849735295,1.33998225715077e-5,4.569548232959391e-16,7.705642070508553e-7,0.0024951376258771025,0.24113513231159606,0.0032799041456218676,0.11914322230475688,0.02266527615698375,0.01639892646764379,0.1336068123796995,0.0011150429058220277,6.31839572359148e-5,0.00270553039568351,8.312583152092918e-7,5.751589909591763e-15,1.0153075831019787e-5,2.9091768693214172e-11,0.3150501527908208,0.0016961298714854686,0.3293491630012568,5.8451836957830264e-12,0.11855341236192657,3.931444986849231e-8,3.3483847711445586e-5,4.138531730012618e-5,0.0030841256000612603,1.6411441862335827e-12,0.012496729125421751,8.36798144986249e-7,0.012752681703121414,0.05212474600790801,1.6352225445843454e-6,0.00010713728093586711,0.002501975370226327,1.6129881749173608e-8,0.3387549458962904,2.192474564860248e-6,0.32036300381564553,7.397925536536502e-16,0.14473459855873624,0.0010559829779043088,0.00236825570935544,0.00028157580261869335,1.7917185402992574e-8,0.078226936544203,1.3345376378362633e-5,5.284502363418421e-11,0.11268047731204905,0.1283958023509229,2.4794475066076305e-7,0.16296933725180401,1.8129848251968798e-24,0.009330950166599431,0.1657595095101134,0.008388950477899093,0.03207820018841757,0.03830988129922143,8.900004759518293e-23,0.0001650245542278326,2.7121046700274066e-5,0.3448111484921887,9.705346492990644e-8,9.37962865187479e-21,5.993555515731633e-10,1.6866509553921802e-12,0.0003435801494789293,0.0036921515448931587,0.15580973249143865,2.3028578838719185e-12,4.346758751880147e-8,3.0699779209772518e-6,1.2449108345784485e-7,3.676275257052641e-18,0.00015147064390143641,0.014770039272783232,0.0017380826977463166,1.0756427450246224e-9,1.0849174812605516e-14,0.00015198661053215842,3.837094366473882e-8,0.06059095396214022,0.003845110770077452,0.18550406323945035,2.0153143572739166e-7,1.8319456544758387e-10,4.211558202339864e-6,1.5300908308511243e-10,0.002852526116315454,8.605067189452657e-7,2.4146050926825584e-5,0.010152649395085332,2.2346156442993782e-5,0.020815855534876124,8.569292615906591e-6,0.0012746469995381195,0.00014664386675870478,9.747039182843019e-5,8.489183567781172e-25,6.0642350907132465e-12,4.767751066066886e-6,6.981072886754134e-7,0.8512574768502081,0.1671377903889514,2.8749930767381574e-7,0.009354068397237385,0.34469995516468316,0.020586874408558224,0.15528380475067863,0.009044309654967282,0.006405069226088439,5.931643374889187e-8,0.34800804937365815,0.1406874898618258,0.22957272939446088,7.186444030410196e-5,4.1200203811864445e-5,0.1873089534709272,0.002071867328561088,0.0014235381698397573,0.10768457486752461,0.004375987660732822,5.177583626567648e-12,7.064979707268637e-5,0.0002751936791850172,0.006212158190744227,0.07690558016226035,0.0010559602631859727,0.144018255186367,0.03439168311180369,0.039700293468019655,1.1440939919480043e-9,3.684654949640058e-10,7.476432475188214e-10,2.3396538556995986e-13,0.6614658822405989,8.147684053307002e-5,5.410676262492408e-11,0.007259659645910083,3.082307174823261e-12,4.193314317194945e-11,0.27404615058643805,0.06593154320954406,0.08822732691996907,3.874671672149063e-15,0.0009234269823447452,0.0025676805172544794,7.989328077582848e-9,0.3042066185974632,8.836676247564968e-5,0.19790944293871487,2.7223773640157225e-9,2.559623292309933e-9,5.6687871530638884e-5,0.008004297225426817,0.011063122223597305,0.0779524083443708,1.4045335566624301e-7,8.810531173941515e-5,2.034707362795672e-12,0.00029911295828498975,1.8742097921663343e-9,8.702027096424986e-5,0.05940623715848467,0.01050469459743151,0.3497695164781491,2.00738887292985e-6,0.19335959363578245,7.404288943653358e-9,4.131985048256544e-8,7.481938148545054e-7,0.030444210640010193,1.1022863826279795e-8,1.6300257554304162e-9,4.173142948034604e-22,2.7687052116165136e-11,4.2192006366282086e-12,8.525757127397006e-6,0.0029268828098618035,0.3012563243258927,3.2499769508882746e-7,3.1420756072510175e-6,0.033714317007786564,2.254443934700845e-14,0.03429355493637953,0.6014289406099895,3.52244111988979e-8,0.0620446094348435,4.271817793113233e-8,0.005042661482906716,3.199185448617077e-7,2.1516880964854804e-7,1.748777466923968e-15,0.0028603894558642136,8.096844259948022e-6,2.615363443147044e-10,5.204497428847235e-7,0.3025761234287428,2.0776281942073577e-6,6.1411664181087616e-24,0.003887064190613945,8.272903011502952e-8,5.703575875512487e-12,0.1021394574077502,0.00012480889033162276,1.4745734516850535e-6,5.017286100867395e-9,0.1043966784412517,2.495536942080009e-6,0.014100769252537749,0.001755070740275008,0.00406012892708598,0.13871748531892267,0.0012414223361901593,5.810889762169432e-6,3.85555187611878e-7,1.7032272557781627e-11,8.909585257043821e-8,0.10215551289056728,0.06173753586722335,0.049512284096257936,0.11128322151569552,0.16609999014146218,0.17707211175682186,0.02230468320432034,0.004620717769675111,6.935755394580723e-18,0.18313375633783321,0.24314264968666036,3.699548842507156e-8,0.0005309333005997176,6.00568175169821e-26,0.010798012350340117,7.301244193212827e-7,1.5052006113894054e-7,0.09000794636131587,0.016893858503938774,0.04934364573517628,7.381479526005625e-8,1.1998853574238366e-14,0.17561442875198036,0.2363499696751544,0.19615116646464487,0.005985520572810176,0.0036794150438241332,3.0163756045242643e-14,9.47927456115896e-8,0.00038677384834025897,0.004907516670714728,2.295761529009793e-10,0.0004709828356737821,3.172985149981755e-10,0.0001242603366963924,0.0022177552241835095,4.9536368890606e-9,6.186956772104699e-6,5.22658805081456e-6,0.0008331930855022987,5.548511627098456e-5,0.0002041842086290405,3.397766504533166e-17,0.2687391765162983,0.031686654035688024,1.7003377690162402e-5,0.003975644733702041,1.729243228996988e-11,0.05380744626066356,0.0001333862185378826,0.045141228278099785,4.3805898486497994e-33,0.0034833732004300897,0.00010388538858131116,0.091196208437131,2.6772944268552537e-5,5.968328758054454e-8,3.0387277755422586e-15,0.00015600617818714433,0.13850941471362607,1.839047608423569e-5,1.5191224613959072e-10,0.33105631868187885,0.0011069899491829888,0.12560019512850715,8.411815641085793e-6,2.982518947496126e-7,9.886033851260159e-6,0.046821980313607355,1.2351254623176753e-6,0.0017281814640474835,0.009911491789186986,0.09200060787549758,0.12768087005539575,0.22929552543311693,9.409443881422641e-5,3.329735957904881e-7,0.06295761634794657,1.3955555222417961e-36,1.6769671940642023e-7,0.03159340428610758,0.17051558161957586,1.713144999424064e-26,1.6508409341461616e-13,0.0016331265894605086,8.67012050415565e-12,1.1313012900812621e-10,0.12075453662284083,0.03030385281103717,0.08506994466196147,0.00036770713926613253,0.23450208817668158,2.8160356534380403e-5,0.18668582148337137,0.0004395857118029987,0.027227313092167797,1.910161162754083e-8,0.00038459690403313764,7.098258260300331e-14,2.6205373954092025e-13,0.0009138666872495607,3.7529995898092305e-5,0.00769585901234808,0.00010954608437439191,0.17137467798525022,0.433826659235061,0.34842589238823235,0.10880488627934759,0.035991527615652434,0.00020227510767896383,0.09497290662730057,4.5894486893226e-11,0.00021574105376608705,0.26699745616526743,9.42124463990221e-13,7.093626636450933e-11,1.8073243930751367e-10,0.09354287265164496,1.5079111963265469e-5,3.8971266299027926e-6,0.18886613124045326,0.03818495399491165,0.23277204382313021,0.0002252720854089448,9.898716297728928e-6,0.00935504308352483,0.0006835691767126188,1.8618914073466197e-8,0.16891151580455674,5.246300442194755e-6,2.464031448191118e-7,4.855119305076603e-7,0.0006523160730017873,2.719961108284341e-11,1.1864421834270864e-10,0.15416295557061988,0.0004525915614821717,1.1679010711295286e-7,3.621536545269716e-9,0.02528016722566078,4.3484357060837896e-11,1.988682189724935e-7,0.07854265649579914,0.04437788256476721,0.00015199164432858008,0.0002525118935328022,4.198912530324271e-5,1.0647967560380272e-18,0.0005232808973557295,1.490496705319707e-6,1.940971325818607e-6,4.868483571189745e-5,0.17082318986592865,3.3082193008822275e-12,0.14377640467344438,0.08668378810928584,0.01098232208043935,0.00032502799029765733,0.005281920178025092,0.007277432945402716,3.723259433095238e-14,1.866066189992489e-10,1.0346389551432921e-8,8.241976594107304e-7,8.776341298982403e-15,1.2055079245026496e-5,9.98243777210658e-9,6.223173622812592e-10,0.21476468108570426,0.006717361533047529,0.036750750835730324,0.0026200324231649536,0.23830456032807668,0.25407816204435235,4.575056494663978e-10,5.575004008945787e-5,0.025971585945566047,0.0004664102886451513,0.048095421817611894,0.0033214380322102205,4.2191222456596446e-7,0.1509376729775891,1.3367890985758698e-21,0.06853128429171833,1.4918839354017686e-11,0.32845979653412627,0.0027838433021472138,0.0031998813599135416,0.036825629240802744,0.3122220995928846,8.635237291691853e-9,2.410812094771786e-6,0.24588848808809172,2.9789854491306906e-7,0.013159839549317223,0.00036931416868212917,4.059575974644628e-7,3.4578354086210783e-6,0.000530994406643635,0.3125763476931171,6.057647320270082e-14,0.07214002460857363,3.9188918683449657e-10,0.03688359575428818,0.003013191907260056,0.004628742694759469,6.166217204605892e-7,0.11599695648564819,1.7909812546092413e-7,0.33098935405384045,5.301826534811735e-5,0.0007602091646894516,0.0003810082776279034,0.00015053623053700197,0.0011475257162779546,0.009907588248395114,0.03638740587602579,1.169885760075124e-6,2.4100556744651604e-6,8.41141479745478e-13,0.2122664655561148,0.24686089126672614,6.33103423487305e-10,0.08113819453672344,0.054268160146991824,9.548515373740395e-12,0.054673058743717036,4.7713944615637113e-8,0.00011544674037083138,0.015210307708962013,4.028528267737945e-5,2.9982415338217942e-5,1.3349110700305668e-7,1.2968966631422299e-24,3.06755387089912e-11,0.08138260777121903,0.19591851495447796,2.3831412946939883e-6,0.20110808831832755,0.003548263654312909,3.024051086064184e-13,0.09313971734366602,2.720877099112357e-10,0.008803331364895955,2.813343879025338e-7,2.5428825270001982e-5,0.11953843372708818,0.015690012226654795,0.2503735505035832,0.12477936802323678,0.00011505472147293149,0.0033491306645866015,0.009146354010858367,0.15170129332047616,0.13868659850108808,4.42372678771318e-12,0.09648452010159879,0.10866146527683186,0.027972889511319807,8.711234665259919e-5,3.780966338983059e-10,1.4713767995610308e-10,0.0048447099394810875,0.31615712051711203,0.018080494082472722,0.010237473647831268,0.03221004212374407,0.014603857235960731,0.0020083702488958907,0.015791932726884433,4.472777893606286e-7,6.892144158478658e-10,0.037444912656462465,1.966453189022311e-8,0.0005185648995115567,0.009296101748338451,0.12385460871810279,7.613069505741819e-9,0.0005653662483537937,0.012490437440958034,6.72797585790459e-9,0.07234154912354822,0.32730146533662074,0.00015398534225934127,2.798707103627138e-12,8.267433206653184e-5,7.894497393742141e-15,0.001072705563796236,0.06337158870693657,0.07541049305496332,0.013292039979347319,0.000775592957822683,0.03586472125666135,0.00020859601750730322,0.9586310330278867,0.0017677778401731178,1.4515208125383514e-6,4.443781546184637e-6,0.0003748323944450741,0.09100128887880901,0.0007078173226959244,1.463407568890399e-5,0.00043498331908979653,3.361687037812318e-8,0.15970424566955377,0.15565897937068496,0.024655296522885648,4.06313034128358e-6,0.006087802812262145,0.11446838833858032,7.213397005407254e-6,1.5833782771245927e-28,1.2887572921319067e-5,2.097273501302858e-6,2.9345323029179106e-6,0.027501831162275704,0.00019112623926533727,6.2235314602561885e-6,0.07951250154401093,0.2548244047037728,0.13313043907011488,1.9178302144704135e-6,0.003990723518865329,0.14551899474723076,0.042157094553078076,2.741371132442236e-6,7.058483483998382e-7,4.073696511904822e-8,0.003302539091848353,1.0501358421094875e-10,0.0027961012592144607,0.00016961995774782127,0.0004946564510325804,1.3559041626749751e-5,0.295671407290283,1.9588051937975943e-11,0.0036252989532692243,6.952702394030094e-8,1.3487657150130437e-17,0.0002617057990921796,5.10068449193188e-5,0.21858641712003135,0.20158018567095518,0.016036030911637085,2.836954594626402e-5,2.583281223100001e-9,0.10395256967672807,0.011160205280883965,5.99331070069705e-7,0.0011156968461792597,1.508152551389705e-16,1.7680967256385027e-6,7.350301838742e-5,0.06318609459423676,0.07398809877302694,0.004653052428619983,7.0775107408078975e-6,0.0962002058348447,0.12163958668408868,0.12624978785961033,0.00016702322281524954,0.33689151384577165,0.024206668029692,2.862193399725168e-8,5.220926279736651e-9,3.832408196838724e-7,1.9883969733622595e-9,1.1751922594947228e-7,0.09949026700776005,6.631968273903477e-14,0.2502239265291598,0.0326029300445571,0.012081846209183804,0.16280835151647086,0.03244536537435691,0.0005652839880628085,6.207357988865557e-13,5.0453586990319984e-5,0.0017742599525334502,0.003515504529556278,0.02806953745804853,1.8214660928389486e-10,0.02257393523514673,0.00014038910427534448,2.7937955735509198e-11,7.423430799902685e-6,0.034962373107345686,0.08536203195079804,1.9383303347251512e-12,0.34402854580376363,0.29199404856012706,5.63211453952847e-7,0.0032258563493896726,0.025423544063846597,6.46150445916477e-6,7.210308037271238e-14,0.19806834354984498,0.013430446553039203,1.7789607946721062e-16,1.2105821076959534e-8,0.1062150604851624,0.16488116284968196,0.03189400576496323,1.3450041696588162e-10,0.0306994680454474,4.8921870343397774e-11,8.444089695969269e-5,2.5757748395138734e-7,0.1283122418529235,0.00028618711513349283,1.052427236280754e-6,8.94036151106297e-12,1.3397239301813182e-15,0.01116340090066684,0.1667614006155929,2.3761562546441077e-29,1.6307492088697718e-13,2.0044387829695937e-7,0.0009851621633185403,7.523154064190833e-5,1.581928572801606e-7,4.2655662842682625e-6,1.4803132480625558e-7,3.210731531817152e-11,0.0015023369041600003,0.0444910561214364,0.0026044087374682777,0.2196134867382999,5.857665395323299e-8,1.8551498742768422e-6,1.0291422185360219e-16,8.575014124567027e-7,4.5719269971362035e-8,0.1444954442546708,0.46392856367039026,1.1099606694699475e-13,0.0002305049622479864,1.3758154603460144e-6,0.09559396404832506,0.020164786642205425,3.404585235967456e-5,0.0004313734360281915,0.022927840049908808,0.0014285693109506801,0.14079941238519664,2.717828545310317e-5,1.4298918289403472e-6,0.12947826333009876,0.20233631856552203,0.021055983380967352,1.1027979749582485e-5,0.015486117437264616,0.00018733297333254942,1.0261803538083742e-7,0.1976580030193555,0.000863490400578664,4.91293882300567e-12,9.548318985160373e-16,4.760392444331375e-16,1.933154227818407e-9,0.32923808322225767,0.04766184938614235,0.07627760584693662,0.002242816218772292,9.769628071722242e-9,0.2012987239081429,3.5197112733662376e-11,0.17516782220660007,0.1050635175486423,0.005685346673442663,3.2063323167256935e-13,1.2592711762643226e-13,6.356463378114554e-5,0.00555637031223689,1.0415295928858677e-8,0.0019296140750702034,3.0511781041394833e-6,1.165401993566051e-10,0.21425503321827638,0.0015690498828550385,3.10375706504366e-14,2.9025996005237993e-5,2.8130240300394207e-5,8.447145732438574e-6,0.00580507476452164,0.3241697231203029,0.8462984762810958,0.0016218386789025893,0.0009182032755860675,0.21024105338513005,1.4156799299139524e-6,0.002917044224886801,0.24116215589926826,0.052760490000711806,0.0004368195072420076,2.1490435257005015e-5,5.2793458918750085e-12,2.433589412520049e-13,0.005637589051630459,0.0006183408011947144,4.22037372897339e-9,0.0013444554454242153,0.04626942931593122,2.6888209872740807e-8,0.007540242537229666,1.5701800432722808e-8,0.0009270812258551862,0.01161127031847475,9.353498275326393e-11,0.007012265008117759,4.568445729854178e-7,0.31971727336124744,2.109910539001175e-9,0.0492662621356132,0.03584112986074598,0.010783094191502791,8.70271524904487e-6,2.393128841131825e-13,4.7231887231825906e-5,0.00018463570111710794,0.04538572678671033,0.014102040203084401,8.223795039253719e-12,0.02169787962347464,0.0647434806403431,0.0003978464865955951,0.19830095548170648,5.694840321053698e-14,0.027993944130236956,0.03854779827171521,5.5964694704010124e-8,3.820642624752833e-9,0.010138351274636269,5.871276889698681e-5,2.8016170662366106e-12,0.002928600171999797,0.0001913154911586621,0.057354098083966285,7.587432125115266e-5,0.10896158532326224,0.039671470619981164],"x":[2.0,9.0,8.0,9.0,15.0,12.0,8.0,9.0,1.0,10.0,4.0,0.0,14.0,5.0,13.0,9.0,11.0,5.0,5.0,2.0,1.0,3.0,11.0,1.0,9.0,6.0,5.0,7.0,5.0,13.0,11.0,3.0,3.0,9.0,9.0,10.0,7.0,3.0,2.0,12.0,6.0,5.0,10.0,0.0,9.0,11.0,12.0,14.0,1.0,3.0,8.0,3.0,11.0,14.0,11.0,7.0,15.0,13.0,4.0,6.0,3.0,2.0,2.0,3.0,1.0,1.0,1.0,15.0,14.0,8.0,7.0,6.0,4.0,2.0,4.0,1.0,0.0,6.0,3.0,9.0,14.0,6.0,14.0,9.0,3.0,4.0,14.0,0.0,8.0,12.0,3.0,3.0,5.0,1.0,4.0,14.0,1.0,4.0,0.0,11.0,5.0,11.0,11.0,10.0,2.0,4.0,5.0,3.0,13.0,5.0,5.0,3.0,6.0,5.0,11.0,1.0,9.0,9.0,5.0,7.0,14.0,6.0,11.0,3.0,13.0,0.0,11.0,4.0,9.0,5.0,3.0,7.0,12.0,14.0,7.0,4.0,14.0,2.0,11.0,9.0,3.0,1.0,9.0,6.0,1.0,7.0,6.0,12.0,10.0,12.0,12.0,9.0,6.0,4.0,12.0,7.0,11.0,6.0,9.0,7.0,12.0,10.0,10.0,15.0,9.0,12.0,13.0,10.0,6.0,1.0,8.0,13.0,2.0,10.0,13.0,2.0,14.0,9.0,11.0,6.0,4.0,0.0,3.0,12.0,8.0,4.0,3.0,12.0,2.0,13.0,2.0,7.0,6.0,3.0,3.0,11.0,13.0,12.0,8.0,7.0,14.0,8.0,9.0,9.0,2.0,7.0,1.0,2.0,9.0,11.0,13.0,4.0,4.0,6.0,2.0,5.0,5.0,4.0,12.0,2.0,1.0,10.0,3.0,8.0,7.0,1.0,14.0,12.0,5.0,14.0,5.0,2.0,12.0,15.0,4.0,4.0,10.0,13.0,3.0,3.0,8.0,10.0,13.0,9.0,7.0,4.0,2.0,9.0,1.0,10.0,9.0,5.0,10.0,13.0,11.0,10.0,12.0,11.0,12.0,1.0,3.0,1.0,8.0,2.0,13.0,15.0,10.0,9.0,14.0,9.0,8.0,7.0,1.0,14.0,12.0,5.0,13.0,1.0,13.0,1.0,15.0,5.0,13.0,8.0,12.0,6.0,8.0,5.0,15.0,4.0,1.0,10.0,4.0,14.0,6.0,2.0,8.0,4.0,5.0,12.0,5.0,14.0,1.0,10.0,15.0,11.0,14.0,12.0,4.0,5.0,15.0,14.0,8.0,9.0,12.0,10.0,3.0,13.0,12.0,13.0,10.0,6.0,7.0,14.0,1.0,9.0,11.0,10.0,8.0,12.0,6.0,10.0,7.0,8.0,7.0,8.0,7.0,7.0,8.0,14.0,14.0,13.0,7.0,0.0,2.0,4.0,10.0,1.0,5.0,2.0,7.0,3.0,6.0,1.0,5.0,2.0,4.0,10.0,2.0,8.0,4.0,3.0,5.0,8.0,13.0,10.0,9.0,5.0,8.0,1.0,9.0,0.0,14.0,14.0,14.0,12.0,0.0,14.0,13.0,9.0,13.0,12.0,1.0,6.0,2.0,9.0,5.0,13.0,10.0,1.0,7.0,3.0,9.0,9.0,9.0,11.0,8.0,5.0,12.0,5.0,11.0,6.0,14.0,8.0,2.0,6.0,1.0,13.0,1.0,10.0,11.0,3.0,10.0,9.0,5.0,11.0,15.0,14.0,10.0,12.0,1.0,12.0,14.0,9.0,12.0,7.0,0.0,10.0,7.0,9.0,8.0,15.0,11.0,11.0,3.0,8.0,5.0,9.0,1.0,4.0,12.0,6.0,11.0,8.0,0.0,8.0,14.0,15.0,5.0,4.0,9.0,14.0,4.0,1.0,9.0,4.0,13.0,8.0,10.0,6.0,4.0,1.0,1.0,4.0,2.0,9.0,7.0,13.0,2.0,2.0,12.0,4.0,13.0,6.0,10.0,14.0,3.0,3.0,4.0,9.0,14.0,4.0,2.0,3.0,6.0,9.0,12.0,14.0,11.0,2.0,7.0,5.0,12.0,12.0,13.0,9.0,6.0,11.0,4.0,5.0,3.0,11.0,1.0,7.0,7.0,13.0,11.0,7.0,8.0,5.0,13.0,12.0,6.0,1.0,10.0,13.0,7.0,7.0,3.0,12.0,11.0,1.0,6.0,1.0,4.0,9.0,6.0,7.0,11.0,10.0,5.0,3.0,3.0,2.0,4.0,11.0,2.0,14.0,6.0,6.0,4.0,14.0,13.0,7.0,9.0,8.0,3.0,5.0,6.0,11.0,2.0,10.0,2.0,14.0,6.0,9.0,14.0,13.0,6.0,12.0,13.0,8.0,12.0,0.0,0.0,1.0,3.0,1.0,6.0,4.0,9.0,13.0,1.0,13.0,14.0,12.0,5.0,7.0,11.0,3.0,3.0,2.0,8.0,12.0,7.0,8.0,11.0,4.0,9.0,14.0,13.0,6.0,15.0,12.0,2.0,11.0,13.0,14.0,7.0,12.0,4.0,3.0,2.0,4.0,10.0,10.0,14.0,7.0,8.0,12.0,8.0,4.0,14.0,4.0,6.0,7.0,7.0,9.0,5.0,11.0,8.0,14.0,13.0,14.0,8.0,11.0,14.0,1.0,7.0,2.0,4.0,2.0,2.0,9.0,9.0,9.0,8.0,8.0,6.0,14.0,5.0,9.0,6.0,14.0,0.0,7.0,11.0,8.0,1.0,7.0,8.0,2.0,13.0,3.0,9.0,13.0,12.0,6.0,1.0,10.0,2.0,12.0,3.0,12.0,8.0,5.0,4.0,14.0,1.0,14.0,11.0,9.0,13.0,13.0,5.0,3.0,14.0,9.0,11.0,2.0,2.0,9.0,7.0,9.0,15.0,5.0,12.0,5.0,4.0,11.0,13.0,5.0,12.0,11.0,0.0,3.0,8.0,3.0,5.0,11.0,3.0,13.0,8.0,14.0,14.0,2.0,11.0,1.0,4.0,5.0,0.0,12.0,5.0,2.0,13.0,8.0,2.0,9.0,8.0,11.0,5.0,3.0,1.0,8.0,7.0,9.0,11.0,4.0,8.0,13.0,13.0,4.0,9.0,7.0,4.0,4.0,10.0,4.0,4.0,6.0,3.0,1.0,10.0,14.0,3.0,14.0,5.0,9.0,6.0,10.0,8.0,5.0,7.0,0.0,10.0,12.0,9.0,3.0,1.0,9.0,9.0,10.0,13.0,1.0,3.0,0.0,12.0,6.0,7.0,13.0,15.0,10.0,4.0,10.0,2.0,6.0,14.0,3.0,1.0,3.0,9.0,10.0,2.0,4.0,7.0,7.0,11.0,4.0,10.0,11.0,6.0,5.0,12.0,1.0,11.0,7.0,13.0,7.0,2.0,11.0,0.0,1.0,5.0,11.0,12.0,3.0,6.0,13.0,5.0,13.0,3.0,14.0,3.0,4.0,4.0,11.0,4.0,5.0,6.0,10.0,1.0,6.0,10.0,11.0,14.0,11.0,7.0,8.0,7.0,2.0,2.0,3.0,1.0,8.0,4.0,15.0,12.0,6.0,8.0,2.0,12.0,6.0,4.0,15.0,14.0,11.0,3.0,6.0,1.0,1.0,6.0,8.0,6.0,14.0,13.0,3.0,0.0,14.0,10.0,6.0,2.0,4.0,12.0,4.0,10.0,8.0,14.0,2.0,10.0,8.0,15.0,10.0,5.0,1.0,14.0,12.0,9.0,7.0,9.0,13.0,10.0,11.0,14.0,9.0,1.0,6.0,2.0,8.0,10.0,13.0,8.0,14.0,5.0,0.0,9.0,14.0,8.0,0.0,4.0,3.0,8.0,8.0,4.0,4.0,7.0,14.0,2.0,2.0,1.0,7.0,3.0,7.0,3.0,3.0,5.0,12.0,15.0,14.0,15.0,1.0,7.0,3.0,6.0,10.0,3.0,12.0,3.0,0.0,0.0,13.0,14.0,14.0,12.0,12.0,7.0,8.0,11.0,0.0,9.0,14.0,11.0,9.0,8.0,7.0,1.0,0.0,7.0,12.0,1.0,8.0,8.0,2.0,6.0,10.0,8.0,12.0,13.0,6.0,6.0,13.0,14.0,4.0,9.0,7.0,13.0,6.0,6.0,12.0,5.0,10.0,1.0,14.0,1.0,1.0,5.0,9.0,10.0,14.0,14.0,4.0,12.0,15.0,12.0,5.0,9.0,3.0,13.0,5.0,1.0,12.0,7.0,8.0,11.0,14.0,4.0,3.0,2.0,10.0,7.0,3.0],"r":[3.0,18.0,3.0,3.0,19.0,19.0,10.0,3.0,9.0,19.0,17.0,8.0,8.0,17.0,14.0,8.0,13.0,11.0,5.0,13.0,17.0,16.0,7.0,7.0,16.0,4.0,15.0,3.0,4.0,2.0,13.0,12.0,14.0,15.0,10.0,19.0,2.0,8.0,11.0,1.0,1.0,9.0,9.0,13.0,15.0,10.0,19.0,6.0,8.0,5.0,10.0,20.0,5.0,2.0,3.0,10.0,18.0,6.0,8.0,17.0,15.0,13.0,19.0,10.0,19.0,5.0,2.0,1.0,5.0,14.0,7.0,5.0,10.0,20.0,2.0,3.0,18.0,10.0,1.0,14.0,11.0,9.0,3.0,18.0,14.0,3.0,15.0,1.0,3.0,12.0,11.0,4.0,20.0,17.0,16.0,12.0,17.0,14.0,14.0,9.0,20.0,7.0,6.0,5.0,12.0,16.0,19.0,13.0,15.0,12.0,2.0,14.0,10.0,20.0,2.0,6.0,3.0,7.0,14.0,15.0,4.0,9.0,11.0,5.0,8.0,6.0,6.0,16.0,9.0,12.0,3.0,12.0,12.0,3.0,18.0,13.0,3.0,15.0,6.0,17.0,2.0,15.0,16.0,3.0,5.0,10.0,20.0,12.0,6.0,18.0,13.0,4.0,7.0,18.0,12.0,9.0,11.0,14.0,2.0,20.0,10.0,3.0,14.0,17.0,9.0,11.0,13.0,16.0,9.0,4.0,13.0,8.0,11.0,2.0,16.0,15.0,15.0,11.0,20.0,1.0,14.0,12.0,12.0,17.0,1.0,4.0,8.0,20.0,4.0,19.0,18.0,8.0,7.0,17.0,11.0,8.0,12.0,7.0,4.0,14.0,2.0,9.0,11.0,15.0,8.0,15.0,19.0,1.0,8.0,14.0,17.0,3.0,3.0,16.0,9.0,16.0,19.0,15.0,5.0,8.0,2.0,12.0,14.0,12.0,20.0,19.0,15.0,20.0,11.0,13.0,17.0,3.0,12.0,2.0,15.0,5.0,2.0,12.0,16.0,17.0,9.0,15.0,13.0,16.0,3.0,2.0,8.0,17.0,2.0,17.0,15.0,16.0,11.0,11.0,19.0,4.0,8.0,4.0,12.0,5.0,4.0,6.0,3.0,17.0,13.0,17.0,20.0,15.0,20.0,14.0,1.0,13.0,11.0,15.0,19.0,11.0,20.0,6.0,11.0,11.0,18.0,14.0,13.0,12.0,15.0,11.0,19.0,6.0,17.0,15.0,20.0,8.0,20.0,7.0,8.0,14.0,14.0,4.0,10.0,4.0,13.0,14.0,14.0,6.0,16.0,15.0,10.0,15.0,3.0,20.0,2.0,5.0,3.0,2.0,1.0,5.0,2.0,16.0,3.0,9.0,9.0,8.0,18.0,17.0,1.0,9.0,13.0,6.0,16.0,15.0,3.0,18.0,18.0,9.0,14.0,19.0,5.0,20.0,14.0,14.0,2.0,9.0,16.0,8.0,12.0,3.0,12.0,8.0,14.0,13.0,15.0,10.0,1.0,20.0,14.0,9.0,1.0,9.0,6.0,11.0,2.0,5.0,17.0,14.0,20.0,9.0,14.0,17.0,12.0,4.0,18.0,19.0,12.0,13.0,6.0,12.0,3.0,13.0,6.0,14.0,9.0,1.0,8.0,17.0,2.0,6.0,5.0,20.0,12.0,19.0,2.0,11.0,12.0,1.0,5.0,14.0,19.0,18.0,6.0,2.0,17.0,6.0,2.0,14.0,9.0,18.0,14.0,12.0,5.0,7.0,5.0,2.0,16.0,3.0,2.0,13.0,17.0,18.0,7.0,18.0,6.0,5.0,17.0,19.0,1.0,11.0,13.0,17.0,15.0,4.0,15.0,5.0,12.0,11.0,13.0,18.0,2.0,13.0,7.0,9.0,2.0,5.0,3.0,10.0,20.0,18.0,5.0,4.0,10.0,6.0,16.0,16.0,11.0,17.0,8.0,11.0,6.0,5.0,4.0,17.0,6.0,18.0,17.0,20.0,9.0,14.0,5.0,3.0,18.0,13.0,5.0,8.0,2.0,8.0,19.0,5.0,11.0,11.0,18.0,4.0,1.0,17.0,7.0,11.0,17.0,10.0,8.0,18.0,10.0,14.0,2.0,8.0,13.0,11.0,19.0,6.0,20.0,20.0,2.0,5.0,2.0,4.0,11.0,17.0,9.0,15.0,8.0,20.0,13.0,14.0,2.0,14.0,13.0,1.0,14.0,4.0,3.0,6.0,20.0,7.0,8.0,5.0,3.0,18.0,9.0,12.0,1.0,13.0,10.0,12.0,19.0,7.0,8.0,12.0,19.0,5.0,2.0,3.0,1.0,11.0,15.0,7.0,2.0,14.0,15.0,1.0,11.0,13.0,15.0,14.0,16.0,15.0,4.0,14.0,14.0,14.0,17.0,7.0,3.0,14.0,12.0,9.0,20.0,20.0,8.0,20.0,20.0,3.0,5.0,7.0,4.0,12.0,20.0,1.0,2.0,13.0,9.0,4.0,19.0,12.0,17.0,9.0,11.0,10.0,12.0,16.0,9.0,17.0,13.0,4.0,16.0,4.0,2.0,15.0,3.0,12.0,9.0,4.0,11.0,15.0,6.0,20.0,13.0,1.0,6.0,17.0,12.0,6.0,3.0,6.0,5.0,14.0,16.0,11.0,13.0,13.0,8.0,13.0,19.0,19.0,3.0,3.0,19.0,2.0,9.0,8.0,17.0,9.0,10.0,4.0,6.0,18.0,15.0,2.0,15.0,20.0,19.0,18.0,14.0,5.0,20.0,2.0,19.0,1.0,12.0,9.0,17.0,17.0,3.0,8.0,3.0,14.0,4.0,17.0,9.0,4.0,19.0,6.0,11.0,3.0,8.0,6.0,7.0,18.0,7.0,19.0,11.0,12.0,7.0,10.0,20.0,8.0,10.0,18.0,11.0,7.0,9.0,12.0,5.0,15.0,14.0,20.0,19.0,18.0,5.0,10.0,5.0,4.0,16.0,9.0,17.0,18.0,12.0,1.0,10.0,19.0,2.0,13.0,4.0,5.0,5.0,13.0,16.0,14.0,8.0,3.0,19.0,2.0,8.0,6.0,20.0,17.0,19.0,8.0,9.0,20.0,18.0,17.0,19.0,1.0,2.0,7.0,5.0,13.0,8.0,14.0,18.0,7.0,16.0,11.0,8.0,14.0,1.0,4.0,4.0,9.0,4.0,4.0,15.0,8.0,5.0,6.0,8.0,6.0,4.0,4.0,7.0,18.0,13.0,16.0,5.0,6.0,7.0,13.0,12.0,7.0,9.0,15.0,3.0,6.0,10.0,13.0,13.0,10.0,18.0,15.0,19.0,6.0,20.0,5.0,7.0,9.0,7.0,15.0,5.0,7.0,15.0,5.0,5.0,7.0,2.0,12.0,17.0,15.0,4.0,1.0,14.0,15.0,14.0,12.0,4.0,3.0,13.0,9.0,1.0,10.0,6.0,9.0,7.0,12.0,16.0,2.0,4.0,16.0,17.0,19.0,9.0,6.0,13.0,4.0,2.0,14.0,13.0,18.0,2.0,7.0,15.0,12.0,17.0,13.0,7.0,8.0,12.0,5.0,4.0,2.0,14.0,20.0,1.0,12.0,1.0,5.0,1.0,18.0,4.0,12.0,6.0,17.0,13.0,16.0,13.0,11.0,3.0,4.0,18.0,20.0,4.0,1.0,10.0,17.0,1.0,9.0,8.0,19.0,5.0,15.0,18.0,2.0,8.0,15.0,11.0,4.0,2.0,20.0,10.0,6.0,16.0,16.0,16.0,2.0,15.0,13.0,6.0,6.0,2.0,18.0,7.0,11.0,10.0,4.0,3.0,9.0,4.0,9.0,1.0,8.0,5.0,6.0,8.0,4.0,17.0,4.0,16.0,10.0,10.0,11.0,13.0,11.0,3.0,8.0,17.0,20.0,11.0,19.0,18.0,17.0,6.0,5.0,4.0,1.0,2.0,6.0,9.0,15.0,9.0,12.0,1.0,4.0,8.0,10.0,19.0,18.0,4.0,14.0,16.0,1.0,16.0,11.0,19.0,19.0,2.0,12.0,20.0,6.0,9.0,1.0,12.0,12.0,18.0,1.0,11.0,16.0,13.0,9.0,20.0,3.0,13.0,19.0,10.0,4.0,16.0,10.0,17.0,15.0,6.0,16.0,12.0,9.0,6.0,7.0,20.0,11.0,5.0,7.0,2.0,18.0,11.0,18.0,8.0,19.0,4.0,7.0,18.0,19.0,6.0,10.0,12.0,19.0,11.0,5.0,18.0,4.0,19.0,12.0,19.0,16.0,1.0,13.0,17.0,4.0,3.0,12.0,19.0,2.0,18.0,1.0,2.0,20.0,20.0,14.0],"p":[0.9314319950081615,0.8101219016853097,0.8518866944118086,0.8527285538254963,0.7509743403391562,0.87968486503274,0.869448775646019,0.7879181655857683,0.8475815281389423,0.7529203800584474,0.8941150754001881,0.9828352910911693,0.8344451233412798,0.8139730459501642,0.7507329841954069,0.8938393623743066,0.8118740258590609,0.9780308413493846,0.880085403604352,0.9966028173218184,0.7726777300619652,0.8752275156892186,0.8034491797030486,0.8499984439359416,0.9541681941584477,0.8697664811939867,0.8420486936355216,0.7923901609280464,0.934496623032109,0.9763206097762975,0.9166238264848998,0.7517013636541585,0.9257729432743521,0.9851294920503513,0.9046844118179034,0.7994886281897081,0.9013894614712952,0.9168336114345828,0.8106975968417267,0.9265621408837292,0.8596611481425519,0.9505706516607211,0.8850102643723495,0.9379264894829128,0.7947555979860706,0.844384761333269,0.9785035152241639,0.7622283832878549,0.7934109397281501,0.7809792165397047,0.9309835774272968,0.9800331663246268,0.8729513580652464,0.974970327778985,0.9463137055787088,0.9882137700097359,0.8979173562249076,0.85887158034449,0.9912280830512323,0.9188609144898341,0.9855061821637229,0.7828366787558985,0.9976140172635553,0.9503179365944123,0.9266636038956091,0.8221587211569793,0.9830778716995077,0.8546570603616064,0.9519151607214644,0.8448055244556836,0.799513444217294,0.8334838139160488,0.8283048087633731,0.7990213630353503,0.825458294850872,0.8803134111067942,0.9553940112345248,0.9780318099633064,0.8151616286832059,0.8621144977650796,0.9216714610479532,0.9212501187107787,0.9561847795947214,0.912529052167635,0.8724561071991976,0.8207451824527747,0.9128793079821855,0.880662129183532,0.935735497966748,0.9669779170035417,0.805655893170872,0.8602441114265726,0.80877850022043,0.9218375587973049,0.9670867173071226,0.7801891298632369,0.7604817011846418,0.9467603929982528,0.7632280390131263,0.9702924242647302,0.7799624932604006,0.8357673583260836,0.8966419364982463,0.9151020673103187,0.9068149929911669,0.8386504068545232,0.9518810969842214,0.8902525400506239,0.9203854930087472,0.8729509175359117,0.8097357228520536,0.9004125774361489,0.7683902582471804,0.8234346848200423,0.945876685184059,0.9373136931014773,0.7806444985797889,0.8822026470847937,0.9775018098584134,0.9490087049945144,0.8668232568765049,0.9296324786024384,0.8962417373238095,0.9832569081004077,0.7528859567746786,0.8563927840066734,0.9785688973459339,0.8363256623715265,0.8578397415353691,0.7601685457717681,0.9155152667303335,0.9373663731589952,0.9767638813358811,0.8471466643293781,0.7842766236617119,0.7873611197120001,0.8432490187046384,0.9654152777283314,0.9983935230273308,0.9325966147962786,0.9283643800048623,0.8076579982330003,0.8555354624939497,0.7672930236202636,0.913027250028124,0.8110223322068408,0.7849534383034236,0.9893669337021482,0.789686829617162,0.7946794177412375,0.8957260812696335,0.7981905404122216,0.9149162512140206,0.9469545166587765,0.7817140644029341,0.8106215469974323,0.7935635979423724,0.9905159762859788,0.7719141051477217,0.784966465615615,0.7925597308621923,0.8362101505472657,0.7594212822510342,0.7778030283436057,0.7551951551565774,0.7772706771857738,0.8341651683623982,0.9289603238223504,0.8330215702939361,0.7827374465029736,0.9212906690785604,0.8150794905447917,0.9692403430152612,0.8702479968294065,0.7501500519467499,0.8489307543743111,0.8876533209171733,0.8549679981241469,0.8753115918897254,0.7546733098238805,0.9307029809364911,0.9832742536778775,0.9853940416437177,0.8328514360002712,0.9210251313568588,0.9857594003553799,0.9890129119874893,0.8723913510192385,0.906764339334416,0.9333322088234357,0.978074175502657,0.9252657856683061,0.9422291858849516,0.9574184980678868,0.8713982466958365,0.8311879251718397,0.873070168141634,0.9432889396575044,0.9733049338026166,0.8405069244260701,0.8111543710611943,0.9641414886879809,0.8187776060419751,0.9316976128772636,0.9704951539371222,0.9927535381606686,0.9523401309777888,0.7949339847659587,0.7736146202439556,0.9378272468766907,0.995729532323292,0.9587868458235926,0.7869946584484073,0.9329874820022275,0.7505640989681351,0.8929104559200431,0.8601513901791016,0.7525469691049065,0.9586314517509387,0.8021572780014683,0.9673023896318361,0.8541546325235341,0.893997390207764,0.802434935135086,0.7664018485176642,0.7904372066580843,0.8772797685455067,0.8401864583802824,0.831425573368143,0.8347734620587588,0.8146858236724684,0.9702631654227676,0.9145006859038176,0.8090432370089436,0.8360334893313299,0.9525100691653816,0.7820481918724664,0.8129801825809111,0.979589846361081,0.8983659445340484,0.9394979184713013,0.7854566883994711,0.8487208715704502,0.9958394024907679,0.9167196808551046,0.8365916009315653,0.8077057689614777,0.859794324810477,0.9313179222450099,0.7760004891587393,0.7958062330537716,0.8078902727782008,0.8100105061704954,0.8046541730216386,0.8355833075101518,0.8505643834655089,0.9731253673363313,0.7742465090379591,0.9573423670866931,0.7758292495088168,0.9531632617641428,0.8882011599221202,0.9752669950939478,0.7871684627924664,0.9098967430001733,0.8311544829183362,0.9198099898965861,0.8472050517328645,0.9650335852454833,0.7959462920429974,0.8217687361319764,0.8432981016087401,0.9949923482790914,0.8719608749003683,0.8740064293132375,0.9283572503383226,0.9389491425809307,0.8459673356243612,0.856990386350822,0.9469605803221075,0.9735933084480625,0.7641397156054095,0.7652312669520457,0.8537910855527568,0.8337481274534169,0.9883144308470446,0.7779677354206804,0.9633348619460201,0.9397047414805448,0.8669216702636268,0.8559555577859884,0.9124227916857974,0.8638204021054421,0.9904828737829048,0.8299918935748127,0.7864211712618612,0.8370350584803505,0.7756909742251543,0.837776968550098,0.9912457059421592,0.966615921113275,0.8286699330730407,0.9479310724933767,0.9051789165469966,0.9866651787655539,0.9619717634280964,0.9431239260075122,0.8300177161364319,0.8597076568653819,0.8089563880353192,0.8578472892233171,0.8196926217210612,0.8658143579700938,0.8632674392878465,0.9646475149229692,0.7617172887694837,0.824168564129962,0.7834341559349993,0.8729003398330546,0.9662898624148888,0.8316902203956811,0.982823008015409,0.8189529675812331,0.7517105484224001,0.7539605023631621,0.9373645620608844,0.9622244579938918,0.8571593538111522,0.9881941904732652,0.781306251104789,0.9423462648128125,0.9182831584812912,0.8851413791832813,0.9107452109852947,0.8347319800438197,0.9565244307290044,0.8028400542351939,0.9518754362377062,0.9210086119118115,0.9942249441574673,0.8670732548738853,0.8263672047382074,0.9749787472986979,0.9800711775788928,0.7602455683845041,0.9881279284518221,0.7553182627435298,0.8780891336918333,0.898559616822062,0.9368981979069355,0.8699699174506224,0.9654060341463782,0.9368680161737789,0.9399257420511453,0.7725655247447318,0.8568620362838947,0.9056173139895984,0.8560799516732948,0.8415184628172838,0.8475228047916941,0.8599218891436233,0.7798901998397241,0.9434451308047738,0.9914448420866417,0.8688974848087261,0.8188834095904662,0.8196025849924806,0.8654654328781071,0.87193612350006,0.9570914537646453,0.7917707309309359,0.843824830617967,0.9170908900083753,0.9279904989216985,0.879311280258023,0.9718876983971245,0.8713028799770084,0.8012127909811924,0.9157920399580222,0.8147479540976916,0.9472183168688564,0.8617716573568449,0.9470754691916823,0.8388142124306889,0.7801948567634329,0.9891602569676947,0.8950016246102351,0.8059661161122471,0.9543033044396014,0.9170849310173866,0.7905665679716984,0.7922803318960054,0.969398255585249,0.8875106554087937,0.8182773549533523,0.760641839309707,0.8647437324043696,0.8712492046885004,0.8601328528934035,0.8866918684561342,0.9798649985454164,0.8962189430114158,0.7973853974774281,0.922313159140794,0.9553816201337448,0.908554586815641,0.9441074113786867,0.8659228647075735,0.9500300354801319,0.9343492867927801,0.8829692937155464,0.9942590335295841,0.7513791525000082,0.9138042601033374,0.9877269108556076,0.9968328392740124,0.9424376334207951,0.9593553018503094,0.8591075892055509,0.8069502857136708,0.7843316993320575,0.8338373064484843,0.8758987029692609,0.8011882138865765,0.9266312633578007,0.7751711938257808,0.9616436731723028,0.958970949423626,0.7888263816144265,0.9132174136346434,0.8593410642487105,0.7677015944149465,0.9202791860814851,0.9855306541269494,0.979841273245257,0.9548766856625995,0.9915011753986656,0.9464495550204021,0.8083712049892972,0.9918005276815126,0.9905910051790634,0.8051672363098568,0.8397381496875882,0.9887161910229223,0.8921947786709357,0.9330983347584875,0.761951850210911,0.8108214684364443,0.7575504217911542,0.9879186182000024,0.8109744139437379,0.7637356490327536,0.9480281684110844,0.8391480386437408,0.7931671409085155,0.9910528250558823,0.8251720915046417,0.9789693477995773,0.8822065808020225,0.8055436042633075,0.7868322853672293,0.7849178987182523,0.9925689708809236,0.8605564341526535,0.8984184443258486,0.7716090046113318,0.7515785529836478,0.9662676115847408,0.836091695668375,0.8423737009517451,0.8633548485538399,0.9614737592068251,0.9906166997221411,0.8241573380162176,0.9476515908633923,0.8013671411791755,0.899838229517204,0.9536528371103005,0.923242527937649,0.907523332484462,0.8979075946047002,0.8094945148597087,0.7607497250706065,0.769351686936781,0.915721121350704,0.7897925070456786,0.9690593373091997,0.9111598851301534,0.7989112309769384,0.9928092264801168,0.9685265158552007,0.9368808730082023,0.9502901914020598,0.8125185430304889,0.8022437587972195,0.9467617226661856,0.980706410231995,0.9244024156378805,0.8788011182589548,0.9432265655659255,0.9619322030711306,0.9812501601658135,0.963022503487454,0.8428994454898866,0.935133948497805,0.7501456770572913,0.9577409514980773,0.8401933751316699,0.9123281952875076,0.8701329057429756,0.9973521060953123,0.7648666021476975,0.9532599427551887,0.898501934202168,0.8997309825279836,0.8181479254770023,0.9949334151458048,0.8766737538247202,0.797515628282984,0.7971938323024804,0.9481320784787594,0.8555769803077562,0.7926942103371736,0.8403902953283584,0.9882754655953179,0.9467842005011897,0.8494619234236547,0.7838780545172472,0.8921219754773781,0.80995079638031,0.9366317632851011,0.8489550680286146,0.834731524174324,0.8150389778408049,0.9887630261309905,0.8565562574871193,0.8242452568200762,0.9980475521581332,0.9247657718163953,0.8185461071705606,0.7720534871130289,0.9931876119516571,0.9139813741922085,0.9014986633964255,0.9867060539848862,0.9424674010434811,0.8802418413165999,0.8786376378909144,0.8022405978279102,0.8407490199882938,0.8561453311764109,0.9042136044785949,0.7688786519047812,0.7770726621041462,0.8562982640941526,0.9658953191534752,0.8066541340183797,0.9544578762710091,0.9953987746467263,0.8005819636841184,0.8242204607008661,0.7792144120001774,0.8784922428166317,0.915582182504273,0.9008749885759857,0.940187001027879,0.7762139081627684,0.9875430740468376,0.8905435882622188,0.7691545878726878,0.960293837192016,0.791164235302743,0.9079942896349549,0.8799942129374851,0.8408487353241408,0.952697692778263,0.7510920984924755,0.8895361937320692,0.9237215212367471,0.7633868301580835,0.956117369491579,0.8525882390431859,0.8923629950465919,0.8458821131768365,0.8439767506009945,0.9044392025125624,0.9238029135748431,0.832649773701579,0.9288757332200173,0.7720990760400466,0.9031226103680592,0.8422085910279813,0.8317199768595108,0.9589277280925737,0.7562807647316261,0.8183302887786765,0.8744838025733491,0.8351476812860023,0.7918269043395157,0.9623933927678531,0.9936363319787976,0.7519798340075265,0.9737481879792521,0.8855402339495602,0.7707402420120447,0.9086988926905477,0.9823010950048006,0.8493672034077995,0.8780460627683782,0.8219157937248759,0.8530234847425613,0.7894425645806731,0.9564988359281441,0.7924192304055413,0.7760972782651551,0.8482757211437764,0.8860628590503768,0.8146506497028265,0.9416183193233867,0.987312210637393,0.9616663512876935,0.7995853294384845,0.910470144828863,0.9173396423354758,0.9181180662861155,0.9225961404580361,0.9378840456419838,0.7821341342296011,0.8327451085256103,0.9298919035589737,0.923967556644185,0.872193100911356,0.8817929636366337,0.9278253159065221,0.9137583958530204,0.8198663119836098,0.9217644956133302,0.8020529374992778,0.9128221051078116,0.7845678136875291,0.777295370464161,0.9962853173699396,0.8511182792280818,0.8291929971158705,0.9113954406038887,0.8475032652047666,0.8172814823866681,0.8071945026858669,0.784170273660413,0.9773893893793255,0.8700457230234344,0.8543728940107795,0.7921539937985678,0.9719710570655906,0.8386774187050038,0.7866927896616139,0.9114372420105279,0.8842565644239488,0.8723230964759424,0.9683431852536105,0.9435135423048857,0.9170256872285265,0.9037486649558893,0.8062187314219214,0.7618484226598775,0.9926761316561932,0.8223177438498683,0.876323145380691,0.9046238809752982,0.7755346467791,0.8661944489113145,0.8248048486005186,0.774510371928621,0.8097543295603138,0.8986625699992342,0.9043245478808992,0.8278812908502755,0.9313947573835382,0.9577555793275625,0.8302306994476247,0.855911770461933,0.9828314132969718,0.8073872241828184,0.765892658223342,0.8895815756087375,0.816719692276267,0.8602146539459878,0.9222001847421186,0.9439386617051873,0.8333740810902068,0.8643485938639826,0.9943791781303023,0.9968386900147475,0.8880715771377024,0.7781317931187492,0.8876885531814336,0.8428076931038742,0.8199415785978057,0.8324800643825475,0.9615767365614716,0.7982682974865538,0.9405416610407247,0.8516700531176354,0.8841276134020253,0.7614223633694874,0.8043282198459591,0.7852359118192755,0.8084751748852563,0.7560415223531665,0.9420559647378506,0.7520498077643087,0.7647598482711845,0.7716712865846933,0.909150385425449,0.9456692729000546,0.766060459054561,0.7902351211696195,0.7924659877926334,0.9393509394805488,0.8589340855462185,0.9924275746335371,0.9572132615742839,0.7776201521639282,0.799169490453367,0.7861665984004551,0.7527589698449204,0.779296456788052,0.9377719885549101,0.8333276621492319,0.8757477120378494,0.9121538450253979,0.9135869421274062,0.8583843289228372,0.8063200954703034,0.8497699395039606,0.7800814628302768,0.9089885549204403,0.931976242680564,0.9442676446698219,0.9872256358857103,0.8241790418875267,0.8182577937488619,0.8182106986506025,0.9206062432613247,0.9835931101468172,0.9371362432283963,0.9155023875467592,0.7547195664232327,0.7887947855194715,0.7878773229086731,0.7803705723160751,0.7656908615220055,0.8836296330365636,0.9967553507117316,0.8093501238573755,0.8409034629548074,0.9089088736122353,0.9914406154856588,0.9663899572914698,0.7719026670851101,0.9018444435789348,0.8506949088687966,0.9110921933842171,0.7638623964631,0.9082939896054654,0.7812571685996061,0.9100167453204362,0.8103437571055858,0.7793449167490433,0.7533737716928562,0.993201903292379,0.8742728488414158,0.9898226785074,0.9263182118373889,0.9515164484090941,0.914663134644511,0.8563884621994973,0.815213536785075,0.9245618094643966,0.808588146932018,0.8121886594055674,0.7856762512445151,0.8049213869911622,0.9149882000973896,0.9147880165101995,0.8650291145966532,0.939598477072394,0.962852206499448,0.9741658993048895,0.7713360874884909,0.8773240008617711,0.8710598800689497,0.8663944604339904,0.8369252805046091,0.8925934700980569,0.8516958914479252,0.8487337844115347,0.9988868993292721,0.9969094723858054,0.8586454819828091,0.9093403203391885,0.8654274361049965,0.755108063698527,0.8922359431715065,0.9508214878149168,0.9342046941707068,0.8376640750767831,0.8184541869133706,0.9486247970522992,0.9622690462502961,0.9923433162363235,0.8123208397952641,0.9286211453828508,0.9088297977681441,0.8053779117278685,0.8383889559501496,0.8780589875360633,0.7706454198173649,0.7763386656461317,0.8677870816796194,0.8505457650159735,0.7855408429853733,0.9476457221177289,0.9040677692660256,0.7640927287353071,0.8675454021499103,0.9786049624870412,0.762094330304252,0.9868720361850611,0.8600224642138061,0.7978532268419495,0.9192885096730358,0.7952823199643506,0.8213939794689282,0.9319789119863493,0.9441580674609888,0.7564721241156784,0.9351573977424085,0.8527149030476924,0.9836019099546907,0.9526652107807185,0.8343396448979546,0.9421615698602839,0.8685938059385532,0.8715624920222071,0.759099220474545,0.7702671672471101,0.9888128632334215,0.9248937921322731,0.9033963245144481,0.9076452529918946,0.8105432446764278,0.782753244287324,0.8779634480176026,0.9452038613541708,0.8106581581632725,0.7870548965451982,0.9376263574064344,0.9365877517269042,0.779468497930027,0.9217645638110439,0.7761445706195141,0.8757875205075645,0.9417477674560297,0.9693877011633515,0.858105235117272,0.8950905311904124,0.7833331811113726,0.8786207766990779,0.8587369229372662,0.9420043566876926,0.9913595911008788,0.8320908819489599,0.9657404403458782,0.992554793150312,0.9798297209489261,0.925732481866665,0.8912662437477047,0.8788307214429343,0.8028461078255991,0.7954194131490342,0.9065705698730099,0.8842796456792024,0.8031103908167405,0.9533309429970158,0.8711535850767358,0.7585605260873317,0.9469069373840534,0.890826870761942,0.9633750220155318,0.9652483315903653,0.7999712867311075,0.7923039073698643,0.9260727630441729,0.988902696927829,0.7569142774052876,0.9539697997421615,0.8078149030115187,0.7661829125069141,0.9933103861228179,0.9153412061249028,0.8486842839690671,0.9614954633875532,0.7681756850736821,0.9600042246699227,0.8839870472010385,0.8877789801235221,0.7918394098935411,0.9946212089333226,0.79779076140498,0.820897540700934,0.8729437856831042,0.999144220177322,0.8551387455896654,0.9341447723374745,0.963451889027643,0.8996019909105301,0.9487430434047037,0.8736478664927669,0.936654474507729,0.8393265859918798,0.9418378264233614,0.7992638336211408,0.9584118450328382,0.8247697878580909,0.8638008329044555,0.7911969447472587,0.8147813604216434,0.7617795559901865,0.9739312130602962,0.8997398970653159,0.7956403396397893,0.8050710073692187,0.8892533256821766,0.8574337704737647,0.789431131333558,0.9616466669272745,0.8795170293473964,0.8805247700784361,0.8906732648370412,0.8589990491007333,0.9250244033750689,0.9409439710424607,0.8245315115397993,0.9284385590641149,0.9458912027085602,0.8956309407080456,0.8393292460327115,0.9720996495642287,0.8963811460105692,0.8785971007660959,0.8094850774470261,0.850821141336805,0.865437838441274,0.8829470575436178,0.9701877245922962,0.9643409279846789,0.860970367853032,0.8808177446355299,0.8898321690146925,0.8030735236242124,0.8844111507774634,0.9275844103323665,0.7798742475447449,0.7874350335275262,0.945934403537095,0.8596082637290077,0.9649606829256314,0.8803269949558767,0.9503150678652432,0.758432225482377,0.8796613541016531,0.7846455460932382,0.7780766299079074,0.83361712806586,0.9080559217513247,0.9844649089300903,0.8539320224264911,0.7619896605655674,0.783539090853512,0.7585051043581552,0.8792764425758783,0.7502038666605346,0.8315654095475831,0.9064527709062677,0.8190439640776157,0.9034879644786975,0.8815811710452683,0.7601908577932568,0.8418456773670794,0.9617726845750687,0.8103622344823849,0.8973910537768133,0.8743569205343764,0.9696115155793793,0.9412029386389312,0.834263407780292,0.9136452664998687,0.7866811411504158,0.9465256329491063]}
},{}],155:[function(require,module,exports){
module.exports={"expected":[1.5551683888781035e-18,4.579120210725958e-8,0.025356027730968192,4.636085648386434e-21,1.5340136086896508e-12,0.000253085849171456,0.033385385524456336,8.283096581249547e-6,2.869598402039754e-5,1.877979408319159e-10,1.2235059842846498e-7,6.349305535847117e-7,7.398887798812168e-6,0.004075857937994878,2.894448408563827e-9,5.718771780690103e-5,0.035563166849969914,0.03825352413308406,0.0008822279786281184,5.206536068088045e-13,4.625850283248629e-12,0.030290666564797317,1.9725708707626278e-5,4.565483316991703e-13,8.487153537297479e-14,6.941678583366059e-11,9.013638426021164e-19,1.9905980157501593e-22,1.7872332308116414e-6,8.143281156305927e-14,6.527142615852551e-5,7.305803010082751e-7,0.002038835326483327,1.9359006994217736e-27,0.0002455917193024279,2.78770584149436e-9,3.863850185093363e-10,2.8150798083086562e-5,2.3659249692691231e-7,1.5808000736700495e-8,7.917653357345446e-10,0.002235539941272163,0.00014929156279704732,0.00015386180871213628,1.100170984670989e-7,1.5747669835693812e-16,5.388147986649879e-20,5.1919225055248296e-11,1.242086604509608e-13,0.01240227315769419,7.680092571384628e-7,4.721343509044914e-9,9.896258989283828e-15,0.03785611631624115,0.00013141994672465873,0.0005077459628514769,0.016565460513268015,2.1155602923301528e-6,1.8756673177219533e-14,5.300614944604997e-11,2.247090100312721e-5,1.72267747785758e-7,0.024752715477005142,2.1714444293301606e-16,0.001175697847089161,8.087292448511432e-5,2.7843987836743124e-19,0.02121068324914836,1.3836755616997307e-12,2.6959053020543617e-17,1.4470206298706635e-16,6.076724447851975e-5,0.05689766179984865,0.05600920316326169,0.0003246205273363534,0.0033973918188910978,2.0317344408368168e-7,1.013652955739113e-8,0.0010881504976856724,3.503400645986577e-10,2.3398174240262842e-11,0.020581699755353025,6.5135777450677695e-16,2.0025834282599972e-23,0.008286506801192214,0.024407530244827988,1.9426824315778752e-5,1.7518792113944669e-26,0.00011515363480929236,4.658113212069814e-13,3.3521133864269628e-6,6.195172927784892e-5,1.0845600154405355e-38,0.000819151444467886,1.2520901841422237e-13,2.078515015627655e-12,3.209190508089964e-8,3.000011922650222e-11,1.3092825631487272e-10,1.6416407394126318e-5,3.3635479782549677e-7,3.2107853107529014e-6,0.008637006417912856,7.581219243756453e-24,4.2588410725563754e-10,0.007360760482277934,1.136704654186328e-7,0.005710408006345074,0.022561255144574462,1.3682943095410003e-5,1.037350975703989e-6,7.189210079477672e-10,3.214096078766628e-15,1.4318446674490406e-10,0.015394713128864894,4.459641925502384e-6,0.0390171120697018,5.419922309722865e-25,3.981883922200631e-12,0.017296107940920694,6.114412569365822e-17,4.610318878022351e-9,1.2662782870394928e-7,1.5038024175118884e-16,5.312631842752338e-14,0.030410939872141347,1.9936682847775172e-17,4.314316863230313e-22,0.000897186060977395,3.7182078558455395e-14,0.0027829073651805545,1.011041366739468e-8,4.719385198126195e-6,5.826919751916733e-11,2.2976201084555584e-10,2.1831493511844912e-40,0.027484065067246464,1.2387062314400271e-7,2.265664603019645e-9,0.03770009458853925,2.372333718577962e-15,8.1573804169421e-7,0.0005752921747084135,3.917911331874544e-15,4.5965834172968975e-8,7.235409004534322e-9,2.2094084201752185e-6,5.498369139218818e-5,9.264461184690643e-13,0.00041430893758103956,3.097884608274464e-7,3.739885280579598e-12,6.172473669073624e-6,0.11713599803074665,7.335859514381988e-16,2.168635867167901e-5,6.266077086242286e-7,1.9599247272101273e-11,3.65316073419731e-5,2.274081368071157e-6,4.722038219425041e-15,6.96536236844622e-10,5.931368255177639e-11,2.3133938277257996e-17,1.0586452633522582e-46,3.804706606084998e-5,4.238101391160796e-5,0.008399003096869162,4.039239800088166e-5,9.750329350969051e-8,9.032492430404629e-10,0.06088759741367436,8.615296695514155e-6,0.15374523114276906,3.0903148174959717e-43,2.1250529445466657e-5,5.779785790754492e-14,0.0007183039803193457,8.580769262662766e-13,7.537380465901623e-10,2.442133166343831e-10,0.0003914444441277219,8.35930180690699e-12,4.446641386492512e-9,0.00024165641436179626,1.0182023538176232e-5,2.5971849018387957e-16,0.017247204217153988,2.43823400513081e-10,0.0008575936142386796,0.004651890681444038,1.3727132843340202e-6,8.172465746522619e-16,9.565574724466621e-5,0.0065124994474251375,0.023310305357228164,2.5150505823191612e-5,3.1412997293807e-17,0.00024623569790672387,2.1192340488587875e-6,1.747073138107959e-12,4.41475821966925e-25,9.587572140258407e-16,1.491481471379703e-60,0.0002839469333779152,3.905879514833198e-12,1.2935303185561923e-11,1.2277243013360893e-9,3.278120746075693e-7,9.37842141577024e-9,0.024353576846756656,1.5447181668645656e-35,0.0079350521001214,9.344923825729972e-12,7.464010086604433e-12,0.03776072316711827,0.03737872623848508,4.985232918108731e-21,1.5596871130376612e-10,6.943452056741625e-14,3.2526764454346447e-21,7.517844846681615e-20,0.001282570126681156,4.3353867345392196e-12,0.01913791009960399,0.02066585456997729,0.0006680660760409693,5.096526326239911e-16,0.0701738010734573,9.930865038610665e-12,0.0011678867313526082,5.119455240250797e-7,1.3425986179065416e-5,0.038497308064239656,3.9697020236985915e-12,0.05259462907373784,0.00013130548159801282,3.939003995241411e-6,0.031956835619699864,8.312922615220596e-14,1.4521289824794049e-13,7.539576093189965e-19,6.689496108286565e-7,7.702683423863687e-12,1.4591569095761721e-6,0.0422499549546309,2.044235678929609e-9,2.022416335763515e-16,6.083963436477379e-19,2.268272344201706e-12,8.765876013257477e-10,0.02359032600422427,5.2848250111160006e-5,6.220771805893056e-9,0.059050546969324914,0.022875620991723116,1.1019435786045063e-5,9.300256049318394e-15,7.065031555932468e-9,1.301068052597575e-15,0.0008110956062939602,1.5434216891102323e-9,2.1508892727466818e-8,3.496232958138527e-13,6.665580386381792e-7,4.520765611721545e-5,5.2379273945694187e-8,0.03166172168443638,7.258456346439923e-10,0.0002154151626685214,1.8256916905629528e-10,0.0016834538377439533,0.04698893254544629,3.822082350626567e-12,0.0015665303577882417,1.257832254109482e-8,9.968204714512117e-9,5.882338686698534e-13,0.00022133999106989567,1.346561530950821e-5,0.0016070981528243083,0.0023067575023989037,3.097968359577264e-6,7.256536664162625e-12,2.9794723033071884e-11,6.271777289653514e-17,4.8692369083157065e-6,8.104726168956688e-7,1.5474580724426488e-20,1.858521281435057e-12,1.2138324389023425e-7,2.0160874279617222e-14,0.001018280865388704,8.401254802368149e-23,1.1188148188267127e-9,1.6203614850626193e-18,3.4268262111544887e-9,0.0038053845266862478,8.112604963732451e-6,0.033189311002013354,0.0009199352769897701,9.352466311561374e-8,9.079952807758678e-13,0.019901003426905213,5.605183127985935e-8,5.337598924099799e-6,0.03135596172159522,0.03570984377709049,3.3516780488396694e-9,7.356233171635644e-8,9.991107671389545e-8,3.093483140981833e-16,2.438316125919844e-16,0.026519565747592684,3.591927825518921e-15,0.00040467755744459096,2.3943405803298892e-11,0.01431705667782155,2.0629165590240468e-7,3.5083229785289087e-9,2.292039139096548e-13,0.010667157751858962,1.923202480405161e-5,0.010283493583192853,0.0002880559817059174,2.8279413206587713e-12,1.3332283200820494e-11,1.0925190236516792e-18,4.20998264641041e-9,2.3689657089364513e-7,4.5939812906354065e-15,3.320393862066148e-17,0.030470879425211695,5.6188082476856035e-25,4.419301198237857e-15,5.8781810477268935e-5,4.782875688934046e-5,5.683050976173747e-5,0.03430043456702926,1.7949146195997183e-5,0.00024344040047470335,1.8930433212944897e-7,7.92250250019128e-8,1.1016219381394804e-19,0.02091437621067317,1.4867720991653184e-10,2.2650816095170977e-19,6.056284715287826e-11,2.381868116361075e-28,0.008897738713951112,1.2849672069238855e-10,0.015547437666307218,1.2706155934530774e-10,0.0014766457036894107,0.0028320311535467773,3.549409998465656e-8,0.02489724316866283,7.807604213157685e-8,8.402479566859894e-11,4.1814092772033154e-14,2.463785273451497e-7,3.5445113361877427e-10,8.865643881244009e-8,4.3646708780784656e-5,4.341879669654902e-12,3.7272560898435497e-8,0.00020647916325001385,2.581695988222566e-11,1.8597552716469365e-9,2.872562470960895e-10,8.274496263633447e-15,0.0025066411457765935,0.0014237378742107995,2.6184108428151795e-7,0.001735674511187505,0.00010418801212442742,3.871306816832297e-10,8.118245009458184e-28,2.586636372285209e-24,0.0019581471847910266,0.0006677354950803324,0.008870943675446852,3.549527819155463e-17,9.344915607678511e-6,9.235982045710374e-13,1.9654557441951504e-5,0.04115106660601918,0.0029744521941874637,0.0033390884579013267,4.4487270314361386e-10,2.2371275694703214e-18,3.23706077477831e-27,2.3165988381630945e-14,7.41486826491811e-10,2.976548495369354e-9,1.19911220769211e-6,6.057287839959173e-5,2.1408878178233803e-12,4.47645887593401e-5,0.03378400808016151,1.005445357010363e-7,2.3987493081442965e-18,1.0505856140688707e-7,0.04221524898798783,1.297916418705853e-17,0.005408422672639198,6.6249988651604125e-18,1.7801539841197617e-11,1.7009162825105907e-6,1.8044884162001988e-12,9.917025620570968e-9,3.3481455773936605e-6,0.07581605043972603,7.996516352148189e-22,0.00229152158154758,7.415883550190732e-11,4.7310864557255646e-8,4.7887525929166065e-40,7.231172561707638e-6,0.007645838064100605,8.308068535959762e-10,5.959293643901804e-6,4.2969739859171535e-5,4.2810478251108485e-14,2.206296761601397e-25,2.626314956916268e-13,2.7191386034813066e-8,0.0025927445931520944,0.031010958058458125,3.7386373859521036e-8,0.001515926071945336,0.039398483112278226,5.281095934025198e-20,0.00010422389744783398,5.908240652762484e-11,6.856172312655043e-14,2.636750812984838e-16,1.4740267302778332e-8,1.2329565986792438e-15,1.3322828758855222e-12,2.813210642281499e-6,4.0966621059185666e-12,0.0006162456420678553,1.7842929234103346e-13,1.8247516951149811e-10,4.02538815529162e-9,6.830068312635289e-15,1.3263905369325376e-6,7.239075948896148e-5,2.6772139124595495e-9,1.5550389946028724e-18,0.05725257794942981,4.3858290488582276e-27,0.022416342341727985,0.0008996877738857456,4.539605115550672e-8,5.980326628877043e-5,4.001219608267477e-16,8.164538492449366e-12,2.6208893550100277e-9,2.755626306340719e-7,6.687486153482355e-5,4.928102561069675e-7,6.39525508138603e-9,0.04229454470912141,4.5755370927335926e-8,4.127103724444759e-8,1.2578128655832797e-7,4.558309092404027e-6,1.0910579364292458e-15,0.0021732307509104653,2.1664814988604067e-51,0.04556625417259666,0.03597320031425473,0.005224900629928349,2.4483636954243177e-5,0.00015720359212519303,5.717849840060302e-9,1.1808731275391251e-7,9.488924201457447e-10,6.555712640046877e-7,2.1562884589150766e-12,5.468890581526772e-11,7.488062194313293e-6,0.019790963230937878,6.455858618848275e-12,6.041565790038333e-12,0.00010598015223431486,0.022774371438577534,0.05140386546592519,1.156297507356814e-18,1.64585035909667e-6,2.5876193012669636e-21,4.1278971809607576e-21,7.599175134163294e-11,7.64329808864352e-21,0.016420608715115498,1.2532006357533626e-8,5.671419408958891e-10,3.5227276194440093e-6,0.006144237002092677,1.2127878263117468e-19,3.4890264346209587e-7,0.000328833527853159,2.6866708054783994e-5,0.02239075672280757,1.4369004984245637e-13,0.049166028614157,1.995565700927038e-31,2.899043341939452e-6,0.022750604960102894,5.499960850774982e-13,0.013422743098610513,2.391342226824786e-12,2.3781991944974833e-7,3.105534772964329e-13,0.0006963348263308022,1.735684033787422e-9,2.83656797855856e-13,1.6279322100137946e-22,2.357734995428046e-15,1.3528554413433224e-14,1.5399639929221671e-18,0.000372781670572856,1.671581538071016e-6,0.02384176715335622,2.334385723728032e-8,2.2382311613300583e-13,5.602773927591102e-7,0.0008043112862883947,0.00012988597390676743,0.03798653079628908,0.005810570142765927,0.04876230032251903,2.4454718963596126e-16,2.7076108497186176e-17,0.004385933023599928,3.241991867567909e-9,0.01879170580268798,0.0007633633552842518,0.00013489043547069575,9.073338294606287e-17,7.212330778987975e-8,2.1235147726341053e-6,3.6579915667426242e-9,2.5247963704115757e-10,0.0200709951429404,5.077179587853296e-10,1.8192474250649537e-8,2.0787823170243797e-6,2.463118258584346e-25,0.004382224855433858,1.3986720706528358e-9,1.0381484118506772e-5,2.0725393179583698e-7,3.447674025094765e-5,0.00013713873225975853,8.432589584882009e-7,6.49947874197938e-6,6.470887977923018e-8,6.459430129118174e-11,0.0005702348991095318,1.7258343619319243e-10,0.03222643383434804,0.024370464186064953,3.587045622083415e-23,2.7082907811351973e-5,2.926827994377775e-9,3.835700133780167e-8,3.3895459168151475e-27,1.170464428361704e-8,4.418734273322505e-11,4.147526919778422e-5,0.01527293387028521,2.0695587075313137e-13,0.023577631404608168,1.0777467487868334e-17,0.028868348157799664,1.6251295133678064e-8,4.78606387185311e-6,1.2343814348210652e-9,2.628448704369003e-18,0.04287892626450353,2.809472710247634e-13,0.03072852138483985,2.971010937934645e-23,2.208837562764196e-15,7.187669025116635e-28,0.06602588337118911,2.788134078884976e-9,3.3283589603228904e-11,0.012722744246288395,1.4850700800647055e-13,0.004807099231098664,1.8702911744168961e-6,0.00026132519110444913,5.014655231725092e-12,0.0034956106520510817,0.049336756881481876,0.01665352114434126,1.413776310481077e-17,1.6418416383884197e-26,1.866267120919429e-7,1.5376392586709997e-15,1.1441179695874972e-7,1.6712098587231345e-32,5.621477080203051e-32,2.2514773291253014e-8,2.2906236007158155e-17,1.2560518085483653e-5,3.7826095464923585e-11,8.556390649533874e-12,0.0008514638169505298,5.96552085325902e-7,0.029312640396727298,2.1926635518735485e-26,1.3313827283568112e-8,1.8804846458410229e-28,3.6128758366073838e-9,1.5453515792762698e-16,6.859667053437002e-16,0.030036580281100265,2.3656286082047707e-15,0.0021378118022674863,0.0001400456100945339,8.18442786514057e-5,1.4015022567091301e-16,0.00033005035853706053,5.3405184004768315e-33,4.9127345575793235e-26,2.1271519689270647e-24,0.0010998657595731442,6.051130130210308e-7,0.0016114492549837594,3.7724007532536743e-6,0.0005365223302859969,0.042688967436207016,0.03299202654201616,0.0007695223277042176,1.557885016597202e-6,0.014951173869046286,8.589863133664243e-6,1.1630954798953532e-15,0.00022653647139343633,0.01648024396584701,0.056559674388376724,1.0587242019484915e-5,2.744088349462777e-29,6.170166803292276e-8,0.00011873837016754313,1.6449363661684466e-12,0.004019595905274228,0.012663390147058383,0.010347531856888472,2.3527932596874e-15,0.00023306335812440357,0.024069606008939523,6.5096215505302924e-9,3.727954969769375e-11,1.1257450526566545e-19,0.005600216676083819,6.1378130156916e-12,2.4771217798213205e-14,0.044468509404818356,0.016744062641677708,0.021167416212773186,7.352630987017566e-11,1.0275218375146727e-6,0.017125993346409747,3.9021961840385663e-7,1.422736743131551e-9,2.2376308517355538e-11,0.010404626095359356,1.0171244422697435e-6,0.0004894080772508178,8.439362508072737e-8,0.045580582161481045,3.7879354278571175e-5,0.001168674117547439,2.7957005069700046e-12,4.326497939973969e-7,1.6992842595426855e-14,3.8010892514877484e-13,0.04269150452801477,0.0008605055077199403,0.00021522346190308916,0.07693585271259869,0.030411939526137927,0.01209495425166049,0.0012490573248900298,0.01062417873526197,7.658733223598402e-10,0.001037676303429455,7.836561755628831e-12,1.4217388173651113e-12,2.1780118473289625e-5,0.004605666309084124,0.0014642401039187175,2.281496773902058e-5,7.362105117526345e-13,1.8790775739975337e-14,0.051930424925821554,1.1734133647431024e-11,3.854367831474926e-5,0.04622308940312622,0.002504931877568912,0.011944302761323054,0.10191764980823634,8.11423059910263e-8,8.7875699744719e-9,4.85304987286928e-10,3.676306313181801e-14,0.03126063912294476,0.013628386783614704,3.121596683132902e-5,0.011450686137868028,8.129658730693417e-6,0.0009593391273124814,8.437785724522614e-13,0.004346061494370153,0.013940935068015475,0.005736115810714592,2.54031434763832e-5,1.0809051286543564e-8,3.4867062870916355e-25,9.635961760841551e-10,6.126735849622171e-7,0.0059062856150930345,2.3788028167358976e-28,4.23141170035515e-11,7.404498684548351e-8,0.05844899742071455,0.0028718924021822047,4.740611488944401e-9,5.2867026263006686e-11,5.094378647076684e-7,6.023040687896073e-16,1.746705708432384e-14,0.003536154085103034,2.8591913446772045e-26,0.02189246966734949,0.0007448794441574216,5.934293947505724e-20,2.643640956318211e-8,5.5658347004678114e-9,0.08976003854210077,4.508488879369907e-14,1.5454010179122283e-18,1.5929256375377685e-10,3.0917095803674965e-25,3.4822921912312482e-15,3.7224053871155315e-7,0.0034104777319990546,0.023159268107709078,5.881738350178852e-8,7.250381401862828e-12,0.039614502153145145,2.842928500294128e-14,9.860187659997343e-15,1.9670509731285482e-8,7.603484194057884e-15,4.130728490997969e-24,7.654282256780456e-17,1.0007154902406031e-8,3.740971299345414e-18,3.541235152449845e-19,7.258660959009689e-7,1.692812953781143e-11,2.5069617555483633e-15,5.714768715302672e-8,9.340525921704189e-9,0.005708523689164886,3.172928151989844e-5,0.0005777585455855826,0.06264337805157567,9.237971896377575e-9,0.00024160353219679386,1.0136031000406222e-5,1.7726589032625614e-21,3.1433323520030308e-6,2.2364306099607036e-11,1.178037893308388e-13,0.02979461721634412,0.004995541200876513,0.0020036197503032226,3.823982889353076e-6,7.200040267261749e-7,5.459543864670658e-6,1.3748362205076363e-15,0.040747689531332135,6.466113468437693e-5,4.342829985314624e-12,3.715626392829019e-25,0.0052434940319043555,3.0447905156647926e-10,1.5833471591339335e-13,0.022232605986865796,0.007718551785309641,0.043268458179336354,3.481112349045344e-21,7.916407025882229e-6,0.0007207749216768147,2.638066801025851e-15,8.268026594652216e-21,5.5903484212124714e-15,0.006514127172110198,4.035721864244233e-5,0.049348649643845256,1.0323636799823348e-7,0.009910432665645064,1.3000658425184473e-22,1.6139236846708442e-21,8.12489322295878e-9,8.439900927226049e-17,4.5555201143506584e-17,2.555156470168986e-6,0.0002904125803126641,2.92209763678829e-16,1.3637110131944195e-7,9.025276557060474e-9,0.04595187744322429,0.007380364225764646,1.2087429791583647e-7,3.2933147296488484e-10,0.012928009482832943,1.70497055184523e-12,4.7946488803911676e-18,8.322972689500901e-16,1.2362724401355933e-12,0.05749358726268132,1.0147894555887848e-7,2.2425851748764566e-19,9.267983487336976e-6,5.6288214131667705e-6,0.0002649308004842222,3.3298599556945768e-12,4.5640478622248616e-12,1.1052410761519158e-7,4.686751175039042e-11,0.014921808456204807,3.976605543172046e-5,4.027947343653347e-12,6.126944357458514e-7,1.0785034700631621e-7,2.7286826516279704e-10,0.0021772872368805997,0.018208513850038334,0.028852685311886634,0.033310833213710596,5.456713430146805e-7,5.601229232156607e-13,2.0508340700971836e-15,4.9486409042990143e-8,0.0003039170746554138,3.785560069189251e-9,0.006032904021014974,4.172266105849443e-20,6.7195931956500504e-18,9.301159444164416e-6,0.00015361014508008956,4.2497743129281715e-17,0.06679051365823735,0.062150755276930286,9.358905756594509e-9,1.2210093592394914e-26,0.02276092544990811,7.569636809372254e-7,5.244801819910153e-16,9.678487873891879e-11,2.1023357129141e-6,5.856318307989712e-11,6.890734986062982e-11,1.8786936713140266e-22,9.002686027783351e-29,0.008643557520301475,6.101747569370409e-9,6.772604498794669e-12,0.0017603113894648042,2.253418919569852e-5,0.0007185375880352541,1.9801204372263897e-6,5.401012853245475e-16,3.640597437994886e-5,9.468603226259315e-6,0.002967475352727154,2.8471464082006532e-33,4.176319507886117e-20,3.1983759067925285e-12,3.746609426452465e-6,9.9878086511706e-18,1.9669053702689593e-16,1.3741571279440696e-8,6.834151049852472e-10,1.8311700682605956e-6,0.10029220220898363,1.5791862016378907e-26,2.6976850993013176e-5,0.04752048367353124,2.3918006466952943e-7,0.00012166571112706078,0.004543380794092131,0.010853175544359045,0.052942522382503146,9.500583607751259e-5,0.09293531869820716,4.831745668479626e-15,0.04810059598302143,6.842838888315389e-5,0.0006590054769575613,1.5647789198865263e-9,1.07171421971419e-15,1.7518002801853188e-12,2.238274050533095e-19,1.2078854153899974e-12,8.782681730408708e-7,5.433679695628863e-9,9.381519132238488e-11,1.1775364282717755e-13,5.131452968521202e-7,6.039506065175463e-5,1.042831571042723e-18,3.43163193487192e-5,0.0016447628253811691,9.907579535486388e-6,0.03203299327916716,0.031209223679620885,0.03456664268821803,6.777694900015359e-8,0.00035270134048704413,1.2082136599709842e-14,0.03718141876136085,0.056377087514665775,5.535204974495395e-22,0.006485918090934746,0.01603725969687059,2.694397797670226e-9,2.313581139613195e-9,3.428223278599759e-9,1.0736525477133142e-5,0.046733488453704855,1.6244328316823658e-5,2.107181537158573e-10,1.2530303077266744e-12,2.2233773342006454e-14,0.0012321187803392593,0.0014974086191478656,4.0500319607706234e-11,0.08997705567666699,4.065016795638249e-9,6.124657293966141e-7,1.219791894903917e-6,1.5248519736237145e-11,0.025192723754176083,0.0008053380854526859,1.276363439817122e-29,0.006738921627910297,1.784144778777483e-8,2.0975939144907591e-10,9.252399881885096e-6,0.01629952751743345,2.6942300042780792e-8,8.907758884184739e-6,2.3746033389655725e-5,0.0024020000726148803,5.902222392697941e-21,8.152386114388844e-12,0.0130545465545652,9.799811943587243e-9,2.629732199591139e-10,5.603415429100876e-9,0.07133631500177687,3.7903970637785094e-12,6.230136943644757e-16,0.036461007213511795,1.8478090581282234e-6,3.041800887452793e-13,0.03451007778947717,3.235725874861486e-9,0.009632719960541278,0.004559417702172623,4.430740044938207e-5,7.515847375541643e-6,0.010960912885267347,1.5409019303223977e-23,1.0849644098102286e-11,6.080408920001715e-15,0.06867214865223384,0.003038271572601208,3.0626312435649654e-19,3.7612827939548224e-5,0.0006560221061767165,6.692144420912512e-9,1.7981664611247686e-14,0.0024539371996439886,5.802308043910247e-6,0.05399563607248545,1.9982211402123935e-23,1.47929573141584e-11,0.024186035853320194,2.985443296742149e-8],"x":[2.0,4.0,11.0,4.0,7.0,14.0,15.0,5.0,14.0,6.0,11.0,3.0,11.0,10.0,10.0,11.0,12.0,9.0,12.0,10.0,6.0,14.0,12.0,4.0,7.0,2.0,8.0,7.0,13.0,6.0,6.0,10.0,13.0,7.0,10.0,8.0,2.0,5.0,5.0,14.0,15.0,15.0,10.0,4.0,14.0,3.0,5.0,3.0,3.0,1.0,9.0,9.0,0.0,6.0,2.0,9.0,12.0,14.0,1.0,11.0,9.0,6.0,15.0,10.0,3.0,15.0,2.0,14.0,5.0,8.0,9.0,15.0,4.0,5.0,15.0,4.0,7.0,8.0,1.0,5.0,1.0,4.0,15.0,0.0,7.0,7.0,12.0,11.0,14.0,2.0,2.0,12.0,1.0,14.0,1.0,4.0,13.0,3.0,10.0,8.0,6.0,6.0,8.0,11.0,10.0,12.0,8.0,2.0,9.0,5.0,5.0,15.0,7.0,8.0,12.0,14.0,14.0,5.0,2.0,4.0,2.0,11.0,11.0,11.0,7.0,10.0,5.0,9.0,1.0,12.0,4.0,4.0,6.0,2.0,15.0,9.0,2.0,6.0,2.0,8.0,3.0,6.0,11.0,2.0,4.0,14.0,0.0,14.0,12.0,12.0,11.0,15.0,14.0,2.0,12.0,8.0,6.0,4.0,6.0,5.0,7.0,5.0,1.0,13.0,6.0,2.0,10.0,9.0,13.0,7.0,5.0,2.0,1.0,1.0,3.0,13.0,2.0,4.0,14.0,7.0,11.0,10.0,8.0,8.0,11.0,1.0,9.0,12.0,7.0,5.0,6.0,10.0,12.0,9.0,10.0,5.0,14.0,10.0,15.0,3.0,1.0,4.0,0.0,4.0,3.0,1.0,2.0,14.0,10.0,14.0,1.0,7.0,9.0,1.0,13.0,9.0,13.0,11.0,2.0,9.0,3.0,2.0,3.0,10.0,8.0,12.0,0.0,5.0,6.0,9.0,11.0,7.0,15.0,5.0,3.0,4.0,12.0,6.0,6.0,2.0,4.0,2.0,1.0,3.0,6.0,14.0,9.0,3.0,11.0,7.0,4.0,11.0,3.0,6.0,8.0,3.0,12.0,5.0,10.0,13.0,1.0,9.0,14.0,1.0,8.0,15.0,9.0,14.0,9.0,3.0,5.0,3.0,7.0,15.0,15.0,1.0,11.0,13.0,2.0,2.0,3.0,3.0,11.0,0.0,11.0,1.0,11.0,6.0,9.0,14.0,5.0,2.0,0.0,1.0,13.0,4.0,2.0,14.0,9.0,11.0,1.0,6.0,11.0,13.0,4.0,4.0,3.0,11.0,4.0,9.0,7.0,11.0,3.0,15.0,14.0,2.0,9.0,12.0,14.0,9.0,5.0,7.0,14.0,12.0,0.0,2.0,2.0,0.0,7.0,12.0,9.0,9.0,4.0,3.0,6.0,13.0,10.0,1.0,10.0,5.0,13.0,14.0,3.0,1.0,9.0,7.0,13.0,11.0,5.0,2.0,14.0,13.0,3.0,9.0,8.0,4.0,14.0,13.0,6.0,13.0,15.0,6.0,5.0,14.0,0.0,8.0,12.0,5.0,7.0,5.0,5.0,11.0,14.0,14.0,9.0,11.0,8.0,3.0,1.0,9.0,11.0,12.0,10.0,12.0,0.0,9.0,13.0,13.0,6.0,4.0,8.0,13.0,2.0,11.0,6.0,12.0,6.0,13.0,7.0,14.0,8.0,14.0,3.0,8.0,6.0,3.0,3.0,12.0,4.0,14.0,4.0,2.0,2.0,1.0,9.0,7.0,11.0,1.0,13.0,13.0,8.0,9.0,13.0,5.0,4.0,12.0,12.0,11.0,15.0,9.0,12.0,2.0,1.0,5.0,4.0,12.0,6.0,3.0,5.0,1.0,6.0,5.0,4.0,9.0,14.0,0.0,9.0,5.0,3.0,7.0,10.0,5.0,4.0,4.0,6.0,4.0,7.0,4.0,12.0,13.0,3.0,7.0,8.0,1.0,14.0,2.0,6.0,7.0,5.0,3.0,6.0,1.0,4.0,14.0,11.0,10.0,12.0,7.0,13.0,1.0,13.0,10.0,1.0,15.0,1.0,13.0,8.0,1.0,5.0,11.0,4.0,15.0,8.0,3.0,14.0,0.0,13.0,5.0,5.0,12.0,13.0,3.0,12.0,14.0,7.0,2.0,1.0,8.0,8.0,4.0,15.0,3.0,9.0,7.0,15.0,8.0,10.0,13.0,0.0,13.0,13.0,12.0,2.0,15.0,12.0,12.0,11.0,5.0,9.0,5.0,13.0,9.0,9.0,10.0,1.0,13.0,11.0,11.0,12.0,1.0,2.0,3.0,12.0,12.0,3.0,13.0,13.0,5.0,13.0,7.0,1.0,11.0,9.0,5.0,6.0,11.0,14.0,8.0,14.0,14.0,12.0,11.0,1.0,4.0,11.0,5.0,7.0,0.0,6.0,0.0,5.0,9.0,7.0,11.0,14.0,7.0,4.0,5.0,3.0,2.0,7.0,9.0,8.0,4.0,13.0,2.0,2.0,0.0,5.0,13.0,10.0,4.0,9.0,7.0,11.0,10.0,13.0,11.0,10.0,8.0,12.0,9.0,11.0,11.0,3.0,2.0,5.0,8.0,15.0,2.0,11.0,2.0,8.0,3.0,12.0,13.0,8.0,0.0,10.0,6.0,5.0,15.0,8.0,3.0,6.0,11.0,8.0,13.0,0.0,5.0,4.0,15.0,0.0,3.0,9.0,15.0,8.0,9.0,12.0,10.0,11.0,10.0,2.0,11.0,9.0,10.0,10.0,5.0,8.0,6.0,8.0,10.0,9.0,10.0,8.0,8.0,14.0,13.0,10.0,2.0,13.0,14.0,2.0,1.0,14.0,13.0,1.0,4.0,10.0,3.0,7.0,0.0,13.0,4.0,10.0,11.0,15.0,3.0,0.0,12.0,8.0,2.0,2.0,14.0,11.0,1.0,4.0,9.0,13.0,13.0,12.0,2.0,3.0,4.0,4.0,14.0,3.0,15.0,4.0,2.0,11.0,11.0,4.0,7.0,8.0,15.0,6.0,2.0,11.0,3.0,1.0,4.0,3.0,1.0,8.0,3.0,9.0,9.0,1.0,7.0,4.0,12.0,9.0,4.0,10.0,8.0,9.0,15.0,0.0,3.0,11.0,8.0,3.0,10.0,13.0,0.0,3.0,10.0,5.0,3.0,13.0,14.0,6.0,3.0,7.0,3.0,12.0,12.0,7.0,8.0,3.0,2.0,13.0,6.0,15.0,8.0,8.0,1.0,4.0,13.0,2.0,7.0,0.0,15.0,6.0,0.0,5.0,8.0,10.0,8.0,2.0,12.0,6.0,10.0,7.0,14.0,10.0,5.0,7.0,14.0,5.0,14.0,11.0,8.0,12.0,1.0,7.0,2.0,0.0,12.0,9.0,4.0,1.0,14.0,9.0,5.0,13.0,6.0,8.0,0.0,6.0,9.0,11.0,0.0,5.0,2.0,5.0,10.0,12.0,0.0,6.0,2.0,10.0,4.0,1.0,5.0,10.0,0.0,14.0,9.0,4.0,10.0,10.0,3.0,8.0,9.0,3.0,13.0,10.0,5.0,4.0,8.0,2.0,6.0,12.0,3.0,6.0,12.0,6.0,4.0,7.0,6.0,6.0,12.0,4.0,3.0,6.0,10.0,10.0,10.0,2.0,15.0,14.0,8.0,9.0,15.0,5.0,12.0,6.0,15.0,15.0,5.0,5.0,6.0,9.0,7.0,13.0,7.0,7.0,12.0,6.0,3.0,5.0,5.0,4.0,11.0,3.0,9.0,1.0,8.0,6.0,8.0,13.0,6.0,1.0,5.0,10.0,6.0,11.0,0.0,1.0,8.0,8.0,7.0,3.0,3.0,6.0,7.0,14.0,4.0,6.0,2.0,2.0,9.0,2.0,4.0,5.0,7.0,6.0,10.0,13.0,1.0,11.0,0.0,14.0,14.0,7.0,12.0,0.0,1.0,5.0,6.0,10.0,6.0,10.0,15.0,10.0,5.0,6.0,12.0,2.0,10.0,7.0,9.0,6.0,1.0,12.0,11.0,12.0,9.0,15.0,10.0,7.0,14.0,3.0,0.0,8.0,2.0,2.0,10.0,11.0,2.0,11.0,4.0,5.0,13.0,11.0,11.0,11.0,13.0,8.0,4.0,13.0,7.0,1.0,12.0,12.0,8.0,15.0,13.0,5.0,6.0,2.0,13.0,1.0,1.0,13.0,5.0,9.0,11.0,4.0,11.0,5.0,9.0,3.0,5.0,3.0,9.0,4.0,1.0,11.0,14.0,4.0,7.0,3.0,9.0,12.0,8.0,12.0,14.0],"r":[20.0,8.0,1.0,18.0,18.0,9.0,6.0,11.0,8.0,9.0,13.0,11.0,14.0,3.0,15.0,11.0,4.0,1.0,6.0,17.0,18.0,3.0,15.0,19.0,17.0,13.0,18.0,20.0,15.0,20.0,10.0,5.0,5.0,15.0,8.0,20.0,16.0,9.0,13.0,13.0,13.0,3.0,2.0,4.0,18.0,20.0,8.0,15.0,13.0,2.0,16.0,16.0,18.0,3.0,4.0,6.0,1.0,15.0,14.0,18.0,7.0,2.0,4.0,16.0,6.0,13.0,20.0,6.0,9.0,19.0,13.0,11.0,1.0,2.0,12.0,4.0,12.0,18.0,5.0,14.0,10.0,2.0,20.0,13.0,3.0,2.0,13.0,16.0,6.0,10.0,3.0,10.0,17.0,4.0,17.0,15.0,16.0,14.0,18.0,10.0,11.0,4.0,1.0,15.0,7.0,4.0,17.0,3.0,4.0,10.0,12.0,14.0,18.0,12.0,4.0,15.0,3.0,17.0,11.0,2.0,14.0,16.0,12.0,19.0,10.0,5.0,20.0,17.0,2.0,12.0,3.0,7.0,9.0,6.0,7.0,18.0,3.0,8.0,13.0,1.0,20.0,11.0,10.0,15.0,14.0,20.0,5.0,15.0,20.0,11.0,16.0,10.0,13.0,1.0,19.0,8.0,10.0,16.0,7.0,7.0,13.0,18.0,16.0,18.0,19.0,5.0,4.0,3.0,9.0,16.0,11.0,1.0,4.0,1.0,17.0,8.0,13.0,7.0,18.0,10.0,19.0,4.0,19.0,12.0,8.0,7.0,19.0,1.0,15.0,6.0,6.0,10.0,17.0,8.0,3.0,3.0,11.0,13.0,11.0,10.0,15.0,20.0,5.0,20.0,6.0,10.0,16.0,20.0,17.0,18.0,1.0,19.0,6.0,14.0,20.0,1.0,2.0,17.0,13.0,12.0,18.0,20.0,4.0,18.0,3.0,4.0,4.0,20.0,2.0,20.0,9.0,11.0,9.0,1.0,17.0,2.0,12.0,10.0,2.0,12.0,10.0,17.0,7.0,20.0,3.0,3.0,14.0,19.0,14.0,19.0,7.0,3.0,7.0,14.0,2.0,2.0,15.0,10.0,18.0,13.0,5.0,19.0,16.0,15.0,9.0,4.0,7.0,2.0,16.0,4.0,11.0,3.0,3.0,14.0,5.0,10.0,5.0,16.0,4.0,3.0,4.0,5.0,8.0,15.0,16.0,20.0,15.0,4.0,18.0,18.0,15.0,16.0,4.0,12.0,19.0,15.0,6.0,7.0,13.0,2.0,4.0,15.0,14.0,1.0,9.0,7.0,2.0,4.0,16.0,16.0,16.0,16.0,14.0,6.0,13.0,3.0,14.0,1.0,20.0,7.0,15.0,3.0,15.0,5.0,4.0,5.0,17.0,8.0,16.0,18.0,19.0,20.0,1.0,11.0,13.0,9.0,9.0,6.0,2.0,8.0,8.0,14.0,11.0,15.0,1.0,11.0,15.0,16.0,16.0,4.0,18.0,4.0,15.0,7.0,6.0,15.0,5.0,10.0,18.0,14.0,20.0,18.0,13.0,8.0,6.0,18.0,2.0,18.0,17.0,15.0,16.0,9.0,10.0,15.0,8.0,11.0,16.0,20.0,10.0,4.0,2.0,2.0,16.0,13.0,12.0,9.0,3.0,8.0,4.0,16.0,12.0,20.0,20.0,19.0,16.0,11.0,6.0,12.0,11.0,2.0,13.0,20.0,13.0,1.0,18.0,5.0,16.0,17.0,8.0,15.0,13.0,5.0,1.0,13.0,3.0,18.0,20.0,20.0,12.0,3.0,20.0,5.0,9.0,20.0,17.0,19.0,17.0,8.0,6.0,7.0,5.0,1.0,18.0,4.0,18.0,8.0,19.0,11.0,20.0,18.0,12.0,15.0,4.0,20.0,13.0,7.0,18.0,7.0,6.0,19.0,19.0,1.0,15.0,2.0,6.0,13.0,10.0,9.0,17.0,9.0,11.0,9.0,16.0,11.0,3.0,11.0,9.0,12.0,7.0,16.0,5.0,17.0,1.0,2.0,3.0,9.0,4.0,15.0,17.0,10.0,14.0,20.0,14.0,14.0,1.0,17.0,17.0,4.0,4.0,3.0,16.0,16.0,19.0,16.0,19.0,20.0,6.0,9.0,17.0,10.0,7.0,19.0,8.0,7.0,6.0,3.0,10.0,3.0,20.0,9.0,2.0,16.0,1.0,16.0,17.0,16.0,5.0,17.0,7.0,15.0,17.0,15.0,18.0,9.0,12.0,2.0,13.0,17.0,11.0,6.0,12.0,1.0,7.0,2.0,18.0,19.0,3.0,11.0,1.0,5.0,5.0,11.0,9.0,10.0,13.0,11.0,1.0,17.0,19.0,14.0,15.0,8.0,17.0,6.0,15.0,10.0,9.0,10.0,16.0,19.0,12.0,8.0,10.0,3.0,5.0,17.0,10.0,10.0,15.0,12.0,16.0,15.0,11.0,5.0,18.0,2.0,20.0,1.0,7.0,7.0,14.0,20.0,1.0,15.0,2.0,13.0,16.0,19.0,1.0,11.0,18.0,3.0,15.0,6.0,9.0,8.0,15.0,3.0,2.0,3.0,19.0,19.0,8.0,18.0,11.0,17.0,16.0,8.0,10.0,7.0,14.0,18.0,4.0,8.0,1.0,20.0,17.0,20.0,16.0,17.0,13.0,2.0,14.0,5.0,3.0,12.0,18.0,7.0,17.0,20.0,15.0,8.0,3.0,4.0,13.0,7.0,3.0,1.0,11.0,11.0,6.0,9.0,18.0,3.0,1.0,3.0,11.0,16.0,17.0,7.0,19.0,6.0,6.0,7.0,16.0,5.0,1.0,19.0,17.0,16.0,4.0,12.0,14.0,1.0,1.0,1.0,14.0,10.0,2.0,6.0,10.0,12.0,6.0,8.0,7.0,17.0,4.0,7.0,4.0,12.0,15.0,14.0,19.0,3.0,9.0,4.0,1.0,1.0,1.0,11.0,4.0,13.0,4.0,20.0,20.0,16.0,3.0,5.0,9.0,15.0,12.0,3.0,13.0,4.0,3.0,10.0,2.0,1.0,11.0,15.0,14.0,20.0,2.0,2.0,10.0,4.0,14.0,9.0,12.0,4.0,4.0,5.0,13.0,13.0,16.0,17.0,10.0,9.0,11.0,18.0,12.0,2.0,3.0,20.0,16.0,6.0,20.0,14.0,3.0,17.0,2.0,3.0,11.0,14.0,12.0,1.0,10.0,20.0,7.0,14.0,17.0,6.0,3.0,1.0,20.0,11.0,1.0,20.0,12.0,11.0,13.0,18.0,18.0,14.0,12.0,12.0,9.0,15.0,14.0,12.0,11.0,6.0,10.0,10.0,2.0,15.0,10.0,9.0,18.0,14.0,6.0,11.0,1.0,6.0,7.0,7.0,12.0,7.0,20.0,4.0,4.0,14.0,15.0,6.0,17.0,12.0,1.0,5.0,1.0,13.0,6.0,5.0,17.0,20.0,18.0,3.0,9.0,2.0,18.0,2.0,19.0,14.0,19.0,19.0,19.0,9.0,4.0,7.0,19.0,11.0,3.0,4.0,17.0,11.0,5.0,19.0,12.0,20.0,10.0,1.0,10.0,19.0,9.0,8.0,11.0,19.0,8.0,14.0,10.0,4.0,11.0,14.0,12.0,8.0,18.0,3.0,2.0,1.0,1.0,13.0,13.0,11.0,14.0,7.0,15.0,7.0,19.0,13.0,7.0,14.0,17.0,1.0,1.0,10.0,13.0,2.0,13.0,16.0,13.0,5.0,19.0,15.0,11.0,20.0,4.0,19.0,10.0,8.0,6.0,9.0,9.0,19.0,6.0,11.0,3.0,20.0,20.0,20.0,13.0,18.0,12.0,15.0,17.0,14.0,1.0,19.0,9.0,1.0,5.0,4.0,4.0,3.0,1.0,11.0,1.0,14.0,2.0,6.0,8.0,19.0,20.0,11.0,20.0,9.0,11.0,11.0,13.0,19.0,7.0,7.0,19.0,9.0,4.0,10.0,1.0,3.0,1.0,12.0,9.0,20.0,2.0,3.0,13.0,6.0,2.0,10.0,13.0,20.0,9.0,2.0,10.0,13.0,14.0,18.0,5.0,4.0,17.0,1.0,10.0,9.0,7.0,9.0,5.0,6.0,19.0,7.0,16.0,5.0,13.0,5.0,18.0,5.0,13.0,2.0,13.0,20.0,4.0,15.0,19.0,8.0,2.0,19.0,20.0,3.0,7.0,12.0,4.0,17.0,5.0,8.0,9.0,15.0,3.0,13.0,15.0,14.0,2.0,4.0,19.0,6.0,3.0,18.0,9.0,5.0,10.0,2.0,18.0,7.0,2.0,15.0],"p":[0.09954784017311989,0.06043953955110962,0.14837944914158305,0.04624603982368036,0.11385118456879764,0.11857104258282716,0.19614180053404004,0.18268322336658993,0.07171255159003316,0.03492995723878254,0.1094620737928735,0.17205558996904308,0.17459890976836145,0.04629212772238649,0.11100314551516198,0.1518931983613753,0.15688940577118482,0.11578761595116688,0.08664065669081081,0.0800103291284216,0.12952840872670565,0.10738465989159827,0.1983825852640968,0.1450258048288732,0.08511078583799542,0.1192232282411328,0.046940650846221926,0.04272495627676123,0.15630165203519325,0.1260925449184825,0.18385307247317254,0.015349074323740464,0.07489752074590594,0.00763799101367666,0.12096496892015458,0.19629302608382349,0.1950386615286507,0.1546755496055912,0.1697134252782172,0.07970051610594223,0.05937903153217694,0.029538594946717914,0.003753947738906938,0.048103417243509354,0.1600924301727505,0.11439277792516336,0.0016964855572179972,0.1375218367870136,0.06448529086851172,0.08219797975939543,0.194228791287117,0.13583640514609768,0.16671344042369884,0.15478279478719403,0.06217331569355982,0.091945179564808,0.1804648840278243,0.15191332195509363,0.0871916445671185,0.11315432880678303,0.07051665429883221,0.00015694860852946137,0.11971343729341394,0.04222885062393962,0.1838512670692988,0.16557178197386177,0.09126025007349022,0.17141980205942586,0.02198836032236695,0.06520401506537712,0.023336759802187815,0.12740648223515913,0.07911888340308604,0.14147057030872845,0.17319237369542897,0.11174607060366332,0.12626654118622582,0.18170370194835694,0.19328575449175275,0.11553932786835333,0.06918819629262467,0.0749816351256115,0.06286529310057368,0.01794603494457281,0.07317476716623923,0.07165217765774848,0.16389096188860322,0.00917217899805225,0.05256269845601254,0.03947141322738106,0.008281906543863427,0.12677356469444856,0.004949109036067068,0.03793077268111773,0.14885917369624027,0.10023855912683244,0.1278111046773991,0.11574834986918808,0.12545983017592244,0.13607146523752198,0.12234173204694838,0.014287545601542152,0.009307944836777705,0.010440462761592962,0.012934760702095982,0.08197058429754245,0.1953618864601098,0.1059932205768146,0.1420523218739934,0.16718498539491522,0.17053107967907605,0.06906398410899377,0.07963773935847507,0.06189002000896973,0.10715476777558544,0.161329195585016,0.1361042856384458,0.02098228485440612,0.06359452183553459,0.0676615607044961,0.05020040822413008,0.12230266427259312,0.09496483891079942,0.061135043426400415,0.018725569378927356,0.19065796972450919,0.08780914042761606,0.02385555591296038,0.02141045891152187,0.024016054060906056,0.06212648791153122,0.03425536750492895,0.11398673255945879,0.011901541531803783,0.009018025143506003,0.002731417904158562,0.19133659748473214,0.056391343633469496,0.15693713349434604,0.17402758562971404,0.13138898361297233,0.1335342152744548,0.17623098165706208,0.08049789555075743,0.18180338384559636,0.15839362872271678,0.07393587228046652,0.19912964216870954,0.10463097168807863,0.18163992760847153,0.16458315221569647,0.018094088639893393,0.13479959220327414,0.17005655961903515,0.06364226791469511,0.09662429893315348,0.10965383624065157,0.13240732361856397,0.09544895795901143,0.06841481640756407,0.035045722477761346,0.18645974756505015,0.1956474898423226,0.043755235225263124,0.002044474231784266,0.07853335195269368,0.020671919698506437,0.06549537860931753,0.09679083710039543,0.18811338486938067,0.07535736424900624,0.07046956852520862,0.038688917137495164,0.18975047323608862,0.002108179385175557,0.0720278055498206,0.06850646997706687,0.18635230513507237,0.07742601640638624,0.049821381260173415,0.1361785142084178,0.03764792622464999,0.1307984370188819,0.08371037711105855,0.11413698979332475,0.1500343385662132,0.06974024613860656,0.17597938807887453,0.11098938609570973,0.13892460968784284,0.178983344963001,0.09090595071511212,0.048709352909486685,0.11173081293389392,0.05599570022273231,0.1307875183429666,0.12043443213771968,0.019505321157847356,0.1499454427435771,0.1667815316731093,0.13869824516858023,0.038754222549253474,0.000991611897721345,0.0006477057344399296,0.14145796670405564,0.057777204296853006,0.1568193973772731,0.14313924806983866,0.18900977034020816,0.13666983425586585,0.02497744984764845,0.007412737901648603,0.16482049226460502,0.13641665329470049,0.1122594282097142,0.12284963863814805,0.15789623892204016,0.02478896703506277,0.1270579797267287,0.03005880735224875,0.049618863253515104,0.08542237579590868,0.09656991992176077,0.10232519198310319,0.09942890475478215,0.12079078287465427,0.16076994188722435,0.10371232427683866,0.1848585575947833,0.1369863338102503,0.17029526127818462,0.11830733020846439,0.07656737194377863,0.04966442742060635,0.1464914864585066,0.13804304922788257,0.17816486074630533,0.13399411613140857,0.08952045604358326,0.05708997936814462,0.027262879210699253,0.06439485861887136,0.10087467822096344,0.1992658203038604,0.0037634811034696018,0.15471782336165055,0.10045499757033333,0.10401876514621322,0.017701788523410224,0.12887587293025793,0.024010396015825688,0.09796115583407694,0.13863889188494727,0.13296078575130874,0.17405420970558652,0.08663419124512967,0.18907520472624073,0.01865486872116633,0.16013764122353924,0.022290444346038996,0.18173633061074213,0.16700420182546538,0.11908885145543727,0.12445587553155982,0.0773034149495636,0.01631833304795598,0.028006244375465752,0.0866455070598974,0.11957357872100821,0.060009349335069476,0.0648283611262308,0.0586569029046482,0.16773271088598382,0.04629701616710307,0.06424224410092653,0.13062965825202785,0.006004139760832628,0.06087279280843103,0.07116998110966835,0.01320915111799339,0.1026946731770737,0.16213735436187915,0.06112279162679868,0.18087642247942903,0.08684859760157333,0.134260627668199,0.18527518756898323,0.010062434294697109,0.035186829240067975,0.08107206552454915,0.19959031793331491,0.10390620168005933,0.17863514043719061,0.011772232248399073,0.13641520731177148,0.038560875707392576,0.023563007569915806,0.13254587703363302,0.17621625047951395,0.08649806882230578,0.12741555605853436,0.18215192777061004,0.05017423426379186,0.13876111404047342,0.08152712760623655,0.0865957043593701,0.10447532534469435,0.16159152334195837,0.18549466553583685,0.16434142021408882,0.18843285327107157,0.04098746495961421,0.049340314209685814,0.17912953615366126,0.023039609596112332,0.04188324609187073,0.07165037547105042,0.195876885200303,0.19283791116236768,0.01880489969380692,0.07911259359550145,0.0812417220676573,0.1820382210464725,0.1218598572594246,0.13027744257990817,0.002854778793827917,0.1744092915610912,0.005685957719717427,0.1516249006606,0.18268774033910337,0.08161972646291411,0.07053260933880781,0.03516141426886037,0.0037373148764771715,0.03759393984427675,0.10171036249882787,0.11579131468219087,0.1494355214120834,0.08898861455738004,0.11997943529111908,0.10329133507145105,0.11216947060825776,0.14097239908340775,0.04561220799851547,0.026676596604235582,0.05395076037814977,0.018940141089101383,0.09107566398898759,0.010305296283564802,0.192157110083103,0.1046815361945912,0.10355300192605928,0.14627499229649002,0.14214655237746637,0.13929988801895604,0.19792711457158646,0.1525176555075377,0.05655173555069566,0.1535961986995915,0.03614153200107415,0.18790927209092712,0.16729093145581686,0.15641191379819933,0.07621833715804534,0.012772609381145151,0.19697783087709142,0.004084428548850294,0.15356830598409352,0.15859626992095982,0.12970670223127226,0.07385308630239935,0.19127089299386868,0.1738803843173288,0.1288992589312703,0.1742514945970473,0.1624228992892657,0.12139164352334264,0.030770394976578033,0.003478763319599221,0.06327435727121333,0.0077872700891299836,0.031690408035003385,0.03759570662730605,0.15309611269712187,0.09933987061185752,0.10969972157413577,0.1423843337255661,0.15577848595138627,0.0917308243088769,0.16235896071159248,0.013381553770856147,0.017929783728344483,0.16211116873384493,0.14526219242732638,0.15821577340782628,0.09575463219605447,0.07724162020211148,0.03235318791627151,0.18705357647826115,0.09675284154031112,0.12760763295424457,0.04881515375147325,0.1905048079857239,0.13621601221435164,0.06210459214800568,0.19726881461787615,0.056110712031486945,0.09048174253748714,0.09685979293029888,0.0540407102931046,0.14260059359295885,0.04766803730116323,0.09194731792395379,0.01959383026933539,0.03907017961724368,0.14307909103743618,0.19954574564449132,0.009314570442196102,0.12651252326420576,0.05283164815970154,0.1836105668023524,0.025366671430534726,0.09758174781169965,0.1304151429495935,0.02163116863440453,0.08819620391191361,0.14554551085361675,0.16714463350578113,0.19022507001096295,0.02664098333465157,0.0729600341930667,0.043020367043959645,0.07263102380881406,0.03880902340611647,0.17392032932046644,0.00589619339890386,0.08357504219346268,0.12020100119571425,0.10854273671740487,0.1886082747922307,0.17281606716353493,0.09649039482456089,0.06962469051303866,0.11053536262786207,0.05495397681614089,0.06319559737209586,0.07394054583331822,0.06308599684559546,0.11067574364349958,0.1922860009951191,0.05010005524625454,0.09356423965879018,0.010271117237626859,0.07892341940386478,0.12817811267360435,0.16139943363207393,0.16910097582230282,0.009809223534958056,0.08613635798533843,0.02990200449050815,0.15879302678344956,0.14674901510811367,0.19872214699292165,0.14678213630438847,0.1550944968719301,0.1514690451541399,0.06494771134533361,0.12088682726493105,0.07600283647187181,0.07752755548580925,0.1168843007223936,0.0008859181254823323,0.05782524380814835,0.13317010032845475,0.04878771690925876,0.10620921340320418,0.026259277228932378,0.13903424121471816,0.15392483912611765,0.10053640198615246,0.12976699220437934,0.12005300297359663,0.1550069931043433,0.14683200529449777,0.020198961267212212,0.08112914051940244,0.10409769202363456,0.07311984137106907,0.18275791176875542,0.18081201829171453,0.045681944161096416,0.15710738944411926,0.039616203902363804,0.03523084258507234,0.11191653863526106,0.09866520893008586,0.16452317533501515,0.061932567582144715,0.1683457008156417,0.09065436761988184,0.1529743900571003,0.06997958372769424,0.04302238407378134,0.08373324020907487,0.06125007801158695,0.17655630658865304,0.04145543135646062,0.16843105818449167,0.014130487480973342,0.1294342605376167,0.19881964461084434,0.11528320422933445,0.015440591698241591,0.09227194745258381,0.14912503455210846,0.07580940883410858,0.06747735199909202,0.11614272030504527,0.01612656551016478,0.011615025373468636,0.04963418767836032,0.042142247892368534,0.07767182833376803,0.1200440707382004,0.11501096937887288,0.06346972516442433,0.09506705411617228,0.10385797769783128,0.10459593782791102,0.1372211404293191,0.17012122752476624,0.08222474530071051,0.18450208695555298,0.15047675246110065,0.11639521242852405,0.050807188413887205,0.04543226359782415,0.05610760954696148,0.1660370188751048,0.17944472334918504,0.10221362122151839,0.0209321961921503,0.046485796718737496,0.08560975099107467,0.1453090329119022,0.03957604662406529,0.029703867791625038,0.16718457880362558,0.16115493408230996,0.19600065747914153,0.019124290629229535,0.1833726707438888,0.13877730536726163,0.061987274586475974,0.19311529606586905,0.12435768153749574,0.10890348435131939,0.09766116022460869,0.18146630060139557,0.16740186225014045,0.04573666207311225,0.1303321019164618,0.08463312792049785,0.16378956001048295,0.16853456920348334,0.026898595729136155,0.15430389768745778,0.14016504475497982,0.1706910932813441,0.0062255605311424935,0.1863631711211097,0.08694263911477972,0.18554058473586774,0.14397536334640157,0.07116884008357936,0.06998178211477893,0.09175415151980211,0.0343881681051136,0.04171610303860396,0.11167442699482782,0.10955375347458274,0.06187327999896555,0.12640771326718322,0.08738774795980749,0.08129432068403726,0.013101836256536537,0.09032401057909319,0.03727343108284655,0.14197998646175333,0.049863880563774866,0.11554182335664304,0.11068507735445801,0.05838541258912336,0.1671962504907937,0.07270531346539931,0.12210555268480056,0.06073614182313385,0.04149132550806903,0.16428628441301296,0.09319544066533143,0.05127182680953846,0.019766066843883847,0.0418357368633751,0.061160129194447556,0.14599518356897884,0.010064033633591719,0.006106526106370103,0.03846122164044807,0.005343693120717941,0.12889747973653926,0.06638148931966352,0.1866557739455335,0.0531644674656973,0.09513480535222084,0.0702749583463171,0.01975335055970282,0.1696813281149254,0.04108785690804351,0.12644781882113684,0.06210617011602491,0.03531091043031771,0.15952456675652954,0.038534744245300304,0.15937446435608207,0.017724353480431176,0.17782552874409785,0.0625900938701776,0.08778121991919266,0.012636376402995753,0.03211356900728557,0.015534059129364099,0.1204099318003141,0.008458217152964131,0.10277063769307465,0.16452358572882764,0.08741045488391729,0.15299129141896683,0.16215222772779136,0.19586956979945447,0.10939792221507486,0.17447072502867247,0.09301367916061741,0.1127270239632538,0.015085261495618375,0.019714758322901194,0.199069915085021,0.13350665212859197,0.008999618013248467,0.18761750046907233,0.11510113672685436,0.11941657435128379,0.13322836275465264,0.18474591456264658,0.19728904631990365,0.05526030274171401,0.0599105142574973,0.047743310842283206,0.15147576734002485,0.1045091403838169,0.04842430581365505,0.07158944065080468,0.03380671614012272,0.07740460900847812,0.04664418985174388,0.14131542251162804,0.1306412066765612,0.15836399874473656,0.13856702913291988,0.051359896679204244,0.04471504897087071,0.05322263162081425,0.12956341010610992,0.14505099506468455,0.09051262965203502,0.11010984447085477,0.16436909362624041,0.19501600807716268,0.1317469657146146,0.18489422920964327,0.03480783018853822,0.17974048283592553,0.07532438002516534,0.17178816561457483,0.15881949064569423,0.1628177174729828,0.08763244876751455,0.14189495095103918,0.046827424531210055,0.19137374967126997,0.19920801933206797,0.0932374128396612,0.14403811806648995,0.09117999572570322,0.18408476225203618,0.16838245375600902,0.19958389576912935,0.08433921219595204,0.06316133233358974,0.16590580621733678,0.1147033786045328,0.02390130093294083,0.18423097586169163,0.08317996088771379,0.02487945970879917,0.1612721031593797,0.18139399147112503,0.047854323675804535,0.13677253713570667,0.0768806196954178,0.19637203973051603,0.1815787352138437,0.13929657890992853,0.10428276408808484,0.08636146963591834,0.14652297007976847,0.17941448059761134,0.19502665366492195,0.18446365673613926,0.08071727883838138,0.09181755539206744,0.17026064564365792,0.1030557487216207,0.1955833349582378,0.14360004924445843,0.011679950901228553,0.1432687000316024,0.08834766960501744,0.18568210592517687,0.003081483584696443,0.18566574987909468,0.09039359481203967,0.16895097225413158,0.07102041718451235,0.18306907711051026,0.08215090067888814,0.08936796531170166,0.12249757893318997,0.03954309912183743,0.06136848611984807,0.021056733106299366,0.05852156047300814,0.02021590133492266,0.00792764294539401,0.19152028999211215,0.0914524084483158,0.14221648692297537,0.013353178154051903,0.05198566550231387,0.013942397476641989,0.007446861020503537,0.0958467451982405,0.051979019051652746,0.03768486206747133,0.027352117735614148,0.17246783142404004,0.03780627864339184,0.0720603404760908,0.18281881055157806,0.03776906841270655,0.060341182996905524,0.05851364721801971,0.02497051757457105,0.127251045620239,0.0849033139658979,0.016227552094085062,0.029002107894411246,0.09945801643798138,0.08626067421126754,0.034289331973523886,0.10521278321607164,0.1305160813822872,0.1305053957083771,0.16924765946114714,0.18571187835676237,0.1695466953175469,0.10004895101912692,0.16622894960457513,0.1364534473577945,0.0351114532775433,0.14183883505859504,0.006716320278767185,0.018315544497527505,0.056472731219643184,0.15756131543092683,0.12780195255309731,0.1300128986223595,0.1417803033933703,0.11387537407309725,0.18068102609068637,0.17034592207636137,0.02462757167596843,0.09100555990049904,0.01965640828717463,0.11710085572940053,0.12587797656683683,0.043448961269656784,0.03563103509858232,0.15990842716732145,0.1154596964398877,0.026686154931097897,0.0536534282323744,0.07234393859135438,0.054923903653553645,0.09905356102178904,0.09430981084804442,0.11117975203433131,0.16174426487079518,0.16702828743388737,0.17309784476876222,0.09955115602364978,0.03832783237978857,0.023548138032951017,0.1752274077216518,0.09106853288265038,0.11899152067192925,0.11553543271123755,0.034671666319880015,0.006036893744051853,0.17533274138479046,0.06964910507381346,0.19344576894724974,0.09029853522758056,0.17665878332107032,0.08415359245849091,0.16022197616430783,0.11330700798125815,0.0221686183120279,0.06905138124596592,0.020982839511844854,0.09438426955232729,0.1084287807199464,0.05034059457092082,0.1893866998631266,0.09365182030807279,0.1722464571752843,0.17569239740779544,0.015244308842321398,0.11746339939199646,0.04054449333789432,0.17395384878220704,0.18471263245231545,0.07660078351259872,0.15015966844235185,0.03679004864038484,0.19018943840544883,0.06429326591461058,0.061749211485870426,0.15444768206384352,0.121065516019718,0.13130328679725012,0.08176437646809079,0.01201328840776017,0.10060893743244553,0.11521208758254016,0.1195544177461148,0.14039991155361112,0.05602046130238758,0.015506716882549699,0.07716987393630875,0.19351970025153614,0.03565963963057044,0.15543754619658445,0.11354131082087893,0.07016805216604004,0.0038654584213952074,0.06833447793881349,0.11650295724364255,0.053510957109197094,0.07703840935579538,0.016997908026107966,0.16449493346177482,0.1402299057121655,0.0051258877315914836,0.023381148448679667,0.14695492300542032,0.1644516104058149,0.04517056932093855,0.17465470759760177,0.12754334547901106,0.18818192808378906,0.10262539635303543,0.07674685690146386,0.04440768441743548,0.17093860447571743,0.10332620101049567,0.013893704796148843,0.04748088190922522,0.1529177401261194,0.1478279906194667,0.11363866496764419,0.04005866395955642,0.13918578475889154,0.14016346160649076,0.1939907654515944,0.1858382166868956,0.030179422278182867,0.1412637729539737,0.15677532989929943,0.00978493693000515,0.04522449981886578,0.10052979309854089,0.134121093536077,0.05990469501103175,0.17907800403889423,0.12001299533942876,0.055375898662100735,0.1250311043905575,0.07260066744969072,0.18372542743119225,0.1590408958080689,0.06997494868683729,0.06908442485654867,0.04928298208538506,0.04740025057183753,0.08434887805481539,0.05074355725825961,0.07684529453986855,0.08432418978800271,0.12631732134236656,0.1949910451886761,0.06655800258633802,0.14558006299942697,0.05665802227681871,0.14843093482285125,0.058584982124749635,0.10906446941629051,0.07716095000048218,0.1333955146441575,0.196480389582925,0.08302586853641199,0.12761239687848744,0.19784543908859545,0.010127901338493084,0.15722273520700975,0.05709727606175714,0.11173569911413823,0.07446728410339057,0.17174885189958303,0.0857176573689229,0.12409759548406236,0.0941554233566495,0.06795229838104637,0.06535630918262103,0.062415990357642184,0.14089268890497825,0.19671391516033002,0.11723767885355159,0.11483822658094352,0.09906757257237833,0.06723393842293116,0.03963993348270996,0.04154717709720886,0.17057747290519015,0.15206379683055668,0.0174991828045171,0.15606132520292376,0.13436943778692778,0.0027539282253879363,0.1604948947894961,0.13528509705700595,0.19303752436182534,0.04328195924964282,0.1596634067688048,0.018497889570447956,0.02285644892496466,0.11768188327074816,0.10059336543898541,0.13579930330346232,0.11572718445574096,0.02367494200820275,0.17798227605750025,0.14118991284472004,0.1348669779110696,0.12596885685869239,0.11693322552688074,0.0740938017069721,0.15059973144881225,0.18780788044465574,0.13894051281922914,0.1846944089021339,0.17995729932063212,0.19185205177766235,0.09510733982860212,0.006708153924657978,0.12349310334148136,0.051504884409980405,0.17478824022869827,0.07214791689227976,0.06738806306310115,0.13922454603485104,0.022070580087682902,0.133783579917762,0.01500640924922876,0.1111501757168683,0.18573239684471765,0.19468096282927552,0.020718957094505577,0.009133250640623203,0.0642445971315496,0.10922692422677352]}
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
	var pmf = factory( 20, 0.5 );
	t.equal( typeof pmf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( 20.0, 0.5 );
	y = pmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( NaN, 0.5 );
	y = pmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( 20.0, NaN );
	y = pmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( NaN, NaN );
	y = pmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( NaN, NaN );
	y = pmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `r` and `p`, the function returns a function which returns `0` for negative integers `x`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( 20.0, 0.5 );
	y = pmf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -20.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -10.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -1.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a valid `r` and `p`, the function returns a function which returns `0` when provided a non-integer for `x`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( 20.0, 0.5 );
	y = pmf( -2.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -1.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( 1.2 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a success probability `p` outside `(0,1]`, the created function always returns `NaN`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( 20, 1.2 );

	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( 20, 0.0 );
	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( 20, -0.1 );
	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( 20, NINF );
	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( 20, PINF );
	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a `r` which is not a positive number, the created function always returns `NaN`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( -1.0, 0.5 );

	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( -2.0, 0.5 );
	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( NINF, 0.5 );
	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the pmf for `x` given large `r` and `p`', function test( t ) {
	var expected;
	var delta;
	var pmf;
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
		pmf = factory( r[i], p[i] );
		y = pmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 650.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. r: '+r[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pmf for `x` given a large parameter `r` and small `p`', function test( t ) {
	var expected;
	var delta;
	var pmf;
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
		pmf = factory( r[i], p[i] );
		y = pmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 450.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. r: '+r[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pmf for `x` given small `r` and large parameter `p`', function test( t ) {
	var expected;
	var delta;
	var pmf;
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
		pmf = factory( r[i], p[i] );
		y = pmf( x[i] );
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

tape( 'the created function evaluates the pmf for `x` given small `r` and `p`', function test( t ) {
	var expected;
	var delta;
	var pmf;
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
		pmf = factory( r[i], p[i] );
		y = pmf( x[i] );
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/negative-binomial/pmf/test/test.factory.js")
},{"./../lib/factory.js":147,"./fixtures/julia/high_high.json":152,"./fixtures/julia/high_small.json":153,"./fixtures/julia/small_high.json":154,"./fixtures/julia/small_small.json":155,"@stdlib/constants/float64/eps":43,"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":76,"tape":276}],157:[function(require,module,exports){
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
var pmf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pmf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `pmf` functions', function test( t ) {
	t.equal( typeof pmf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/negative-binomial/pmf/test/test.js")
},{"./../lib":150,"tape":276}],158:[function(require,module,exports){
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
var pmf = require( './../lib' );


// FIXTURES //

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallHigh = require( './fixtures/julia/small_high.json' );
var highSmall = require( './fixtures/julia/high_small.json' );
var highHigh = require( './fixtures/julia/high_high.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pmf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = pmf( NaN, 20.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pmf( 0.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pmf( 0.0, 20.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a negative integer for `x` and a valid `r` and `p`, the function returns `0`', function test( t ) {
	var y = pmf( NINF, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -20.0, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -100.0, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -1.0, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a non-integer for `x` and a valid `r` and `p`, the function returns `0`', function test( t ) {
	var y = pmf( -1.5, 20.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -0.5, 20.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( 1.5, 20.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( 2.5, 20.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `r` which is not a positive number, the function returns `NaN`', function test( t ) {
	var y;

	y = pmf( 2.0, -0.5, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 0.0, -1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 2.0, NINF, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a success probability `p` outside of `[0,1]`, the function returns `NaN`', function test( t ) {
	var y;

	y = pmf( 2.0, 20, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 0.0, 20, 1.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 2.0, 20, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 2.0, 20, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the pmf for `x` given large `r` and `p`', function test( t ) {
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
		y = pmf( x[i], r[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 650.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. r: '+r[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pmf for `x` given large parameter `r` and small `p`', function test( t ) {
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
		y = pmf( x[i], r[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', r: '+r[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 450.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. r: '+r[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pmf for `x` given small `r` and large `p`', function test( t ) {
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
		y = pmf( x[i], r[i], p[i] );
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

tape( 'the function evaluates the pmf for `x` given small `r` and `p`', function test( t ) {
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
		y = pmf( x[i], r[i], p[i] );
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/negative-binomial/pmf/test/test.pmf.js")
},{"./../lib":150,"./fixtures/julia/high_high.json":152,"./fixtures/julia/high_small.json":153,"./fixtures/julia/small_high.json":154,"./fixtures/julia/small_small.json":155,"@stdlib/constants/float64/eps":43,"@stdlib/constants/float64/ninf":54,"@stdlib/constants/float64/pinf":55,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":76,"tape":276}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":159}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":162}],162:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":166}],163:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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

},{"./define_property.js":164}],166:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":163,"./has_define_property_support.js":165,"./polyfill.js":167}],167:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],168:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":169,"./polyfill.js":170,"@stdlib/assert/has-tostringtag-support":20}],169:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":171}],170:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":171,"./tostringtag.js":172,"@stdlib/assert/has-own-property":16}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){

},{}],175:[function(require,module,exports){
arguments[4][174][0].apply(exports,arguments)
},{"dup":174}],176:[function(require,module,exports){
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

},{}],177:[function(require,module,exports){
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
},{"_process":268}],178:[function(require,module,exports){
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

},{"events":176,"inherits":263,"readable-stream/lib/_stream_duplex.js":180,"readable-stream/lib/_stream_passthrough.js":181,"readable-stream/lib/_stream_readable.js":182,"readable-stream/lib/_stream_transform.js":183,"readable-stream/lib/_stream_writable.js":184,"readable-stream/lib/internal/streams/end-of-stream.js":188,"readable-stream/lib/internal/streams/pipeline.js":190}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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
},{"./_stream_readable":182,"./_stream_writable":184,"_process":268,"inherits":263}],181:[function(require,module,exports){
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
},{"./_stream_transform":183,"inherits":263}],182:[function(require,module,exports){
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
},{"../errors":179,"./_stream_duplex":180,"./internal/streams/async_iterator":185,"./internal/streams/buffer_list":186,"./internal/streams/destroy":187,"./internal/streams/from":189,"./internal/streams/state":191,"./internal/streams/stream":192,"_process":268,"buffer":193,"events":176,"inherits":263,"string_decoder/":275,"util":174}],183:[function(require,module,exports){
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
},{"../errors":179,"./_stream_duplex":180,"inherits":263}],184:[function(require,module,exports){
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
},{"../errors":179,"./_stream_duplex":180,"./internal/streams/destroy":187,"./internal/streams/state":191,"./internal/streams/stream":192,"_process":268,"buffer":193,"inherits":263,"util-deprecate":284}],185:[function(require,module,exports){
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
},{"./end-of-stream":188,"_process":268}],186:[function(require,module,exports){
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
},{"buffer":193,"util":174}],187:[function(require,module,exports){
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
},{"_process":268}],188:[function(require,module,exports){
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
},{"../../../errors":179}],189:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],190:[function(require,module,exports){
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
},{"../../../errors":179,"./end-of-stream":188}],191:[function(require,module,exports){
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
},{"../../../errors":179}],192:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":176}],193:[function(require,module,exports){
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
},{"base64-js":173,"buffer":193,"ieee754":262}],194:[function(require,module,exports){
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

},{"./":195,"get-intrinsic":258}],195:[function(require,module,exports){
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

},{"function-bind":257,"get-intrinsic":258}],196:[function(require,module,exports){
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

},{"./lib/is_arguments.js":197,"./lib/keys.js":198}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],199:[function(require,module,exports){
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

},{"object-keys":266}],200:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],201:[function(require,module,exports){
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

},{"./ToNumber":231,"./ToPrimitive":233,"./Type":238}],202:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/isNaN":248,"../helpers/isPrefixOf":249,"./ToNumber":231,"./ToPrimitive":233,"./Type":238,"get-intrinsic":258}],203:[function(require,module,exports){
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

},{"get-intrinsic":258}],204:[function(require,module,exports){
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

},{"./DayWithinYear":207,"./InLeapYear":211,"./MonthFromTime":221,"get-intrinsic":258}],205:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":253,"./floor":242}],206:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":242}],207:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":205,"./DayFromYear":206,"./YearFromTime":240}],208:[function(require,module,exports){
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

},{"./modulo":243}],209:[function(require,module,exports){
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

},{"../helpers/assertRecord":246,"./IsAccessorDescriptor":212,"./IsDataDescriptor":214,"./Type":238,"get-intrinsic":258}],210:[function(require,module,exports){
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

},{"../helpers/timeConstants":253,"./floor":242,"./modulo":243}],211:[function(require,module,exports){
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

},{"./DaysInYear":208,"./YearFromTime":240,"get-intrinsic":258}],212:[function(require,module,exports){
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

},{"../helpers/assertRecord":246,"./Type":238,"has":261}],213:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":264}],214:[function(require,module,exports){
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

},{"../helpers/assertRecord":246,"./Type":238,"has":261}],215:[function(require,module,exports){
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

},{"../helpers/assertRecord":246,"./IsAccessorDescriptor":212,"./IsDataDescriptor":214,"./Type":238}],216:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":250,"./IsAccessorDescriptor":212,"./IsDataDescriptor":214,"./Type":238}],217:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/timeConstants":253}],218:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"./DateFromTime":204,"./Day":205,"./MonthFromTime":221,"./ToInteger":230,"./YearFromTime":240,"./floor":242,"./modulo":243,"get-intrinsic":258}],219:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/timeConstants":253,"./ToInteger":230}],220:[function(require,module,exports){
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

},{"../helpers/timeConstants":253,"./floor":242,"./modulo":243}],221:[function(require,module,exports){
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

},{"./DayWithinYear":207,"./InLeapYear":211}],222:[function(require,module,exports){
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

},{"../helpers/isNaN":248}],223:[function(require,module,exports){
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

},{"../helpers/timeConstants":253,"./floor":242,"./modulo":243}],224:[function(require,module,exports){
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

},{"./Type":238}],225:[function(require,module,exports){
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


},{"../helpers/isFinite":247,"./ToNumber":231,"./abs":241,"get-intrinsic":258}],226:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":253,"./DayFromYear":206}],227:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":253,"./modulo":243}],228:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],229:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":231}],230:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/isNaN":248,"../helpers/sign":252,"./ToNumber":231,"./abs":241,"./floor":242}],231:[function(require,module,exports){
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

},{"./ToPrimitive":233}],232:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":203,"get-intrinsic":258}],233:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":254}],234:[function(require,module,exports){
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

},{"./IsCallable":213,"./ToBoolean":228,"./Type":238,"get-intrinsic":258,"has":261}],235:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":258}],236:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/isNaN":248,"../helpers/sign":252,"./ToNumber":231,"./abs":241,"./floor":242,"./modulo":243}],237:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":231}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":205,"./modulo":243}],240:[function(require,module,exports){
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

},{"call-bind/callBound":194,"get-intrinsic":258}],241:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":258}],242:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],243:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":251}],244:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":253,"./modulo":243}],245:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":201,"./5/AbstractRelationalComparison":202,"./5/CheckObjectCoercible":203,"./5/DateFromTime":204,"./5/Day":205,"./5/DayFromYear":206,"./5/DayWithinYear":207,"./5/DaysInYear":208,"./5/FromPropertyDescriptor":209,"./5/HourFromTime":210,"./5/InLeapYear":211,"./5/IsAccessorDescriptor":212,"./5/IsCallable":213,"./5/IsDataDescriptor":214,"./5/IsGenericDescriptor":215,"./5/IsPropertyDescriptor":216,"./5/MakeDate":217,"./5/MakeDay":218,"./5/MakeTime":219,"./5/MinFromTime":220,"./5/MonthFromTime":221,"./5/SameValue":222,"./5/SecFromTime":223,"./5/StrictEqualityComparison":224,"./5/TimeClip":225,"./5/TimeFromYear":226,"./5/TimeWithinDay":227,"./5/ToBoolean":228,"./5/ToInt32":229,"./5/ToInteger":230,"./5/ToNumber":231,"./5/ToObject":232,"./5/ToPrimitive":233,"./5/ToPropertyDescriptor":234,"./5/ToString":235,"./5/ToUint16":236,"./5/ToUint32":237,"./5/Type":238,"./5/WeekDay":239,"./5/YearFromTime":240,"./5/abs":241,"./5/floor":242,"./5/modulo":243,"./5/msFromTime":244}],246:[function(require,module,exports){
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

},{"get-intrinsic":258,"has":261}],247:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],248:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],249:[function(require,module,exports){
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

},{"call-bind/callBound":194}],250:[function(require,module,exports){
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

},{"get-intrinsic":258,"has":261}],251:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],252:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],253:[function(require,module,exports){
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

},{}],254:[function(require,module,exports){
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

},{"./helpers/isPrimitive":255,"is-callable":264}],255:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],256:[function(require,module,exports){
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

},{}],257:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":256}],258:[function(require,module,exports){
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

},{"function-bind":257,"has":261,"has-symbols":259}],259:[function(require,module,exports){
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

},{"./shams":260}],260:[function(require,module,exports){
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

},{}],261:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":257}],262:[function(require,module,exports){
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

},{}],263:[function(require,module,exports){
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

},{}],264:[function(require,module,exports){
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

},{}],265:[function(require,module,exports){
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

},{"./isArguments":267}],266:[function(require,module,exports){
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

},{"./implementation":265,"./isArguments":267}],267:[function(require,module,exports){
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

},{}],268:[function(require,module,exports){
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

},{}],269:[function(require,module,exports){
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
},{"_process":268,"through":282,"timers":283}],270:[function(require,module,exports){
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

},{"buffer":193}],271:[function(require,module,exports){
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

},{"es-abstract/es5":245,"function-bind":257}],272:[function(require,module,exports){
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

},{"./implementation":271,"./polyfill":273,"./shim":274,"define-properties":199,"function-bind":257}],273:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":271}],274:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":273,"define-properties":199}],275:[function(require,module,exports){
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
},{"safe-buffer":270}],276:[function(require,module,exports){
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
},{"./lib/default_stream":277,"./lib/results":279,"./lib/test":280,"_process":268,"defined":200,"through":282,"timers":283}],277:[function(require,module,exports){
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
},{"_process":268,"fs":175,"through":282}],278:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":268,"timers":283}],279:[function(require,module,exports){
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
},{"_process":268,"events":176,"function-bind":257,"has":261,"inherits":263,"object-inspect":281,"resumer":269,"through":282,"timers":283}],280:[function(require,module,exports){
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
},{"./next_tick":278,"deep-equal":196,"defined":200,"events":176,"has":261,"inherits":263,"path":177,"string.prototype.trim":272}],281:[function(require,module,exports){
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

},{}],282:[function(require,module,exports){
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
},{"_process":268,"stream":178}],283:[function(require,module,exports){
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
},{"process/browser.js":268,"timers":283}],284:[function(require,module,exports){
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
