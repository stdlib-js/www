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

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


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

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


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

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


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

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


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
var UINT16_MAX = require( '@stdlib/constants/math/uint16-max' );
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

},{"./uint16array.js":24,"@stdlib/assert/is-uint16array":36,"@stdlib/constants/math/uint16-max":47}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var UINT32_MAX = require( '@stdlib/constants/math/uint32-max' );
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

},{"./uint32array.js":27,"@stdlib/assert/is-uint32array":38,"@stdlib/constants/math/uint32-max":48}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var UINT8_MAX = require( '@stdlib/constants/math/uint8-max' );
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

},{"./uint8array.js":30,"@stdlib/assert/is-uint8array":40,"@stdlib/constants/math/uint8-max":49}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":100}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":100}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":100}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":100}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* @module @stdlib/constants/math/float64-eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/constants/math/float64-eps' );
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
* @module @stdlib/constants/math/float64-exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
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
* One half times the mathematical constant `π`.
*
* @module @stdlib/constants/math/float64-half-pi
* @type {number}
*
* @example
* var HALF_PI = require( '@stdlib/constants/math/float64-half-pi' );
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
* Double-precision floating-point negative infinity.
*
* @module @stdlib/constants/math/float64-ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/constants/math/float64-ninf' );
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

},{"@stdlib/number/ctor":92}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* @module @stdlib/constants/math/float64-pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/constants/math/float64-pinf' );
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
* Maximum unsigned 16-bit integer.
*
* @module @stdlib/constants/math/uint16-max
* @type {integer32}
*
* @example
* var UINT16_MAX = require( '@stdlib/constants/math/uint16-max' );
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
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/constants/math/uint32-max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/constants/math/uint32-max' );
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
* Maximum unsigned 8-bit integer.
*
* @module @stdlib/constants/math/uint8-max
* @type {integer32}
*
* @example
* var UINT8_MAX = require( '@stdlib/constants/math/uint8-max' );
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
* Test if a numeric value is `NaN`.
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

var isnan = require( './is_nan.js' );


// EXPORTS //

module.exports = isnan;

},{"./is_nan.js":51}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Tests if a numeric value is `NaN`.
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
* Computes the absolute value of `x`.
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
	if ( x < 0.0 ) {
		return -x;
	}
	if ( x === 0.0 ) {
		return 0.0; // handle negative zero
	}
	return x;
}


// EXPORTS //

module.exports = abs;

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
* Compute an absolute value.
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

var abs = require( './abs.js' );


// EXPORTS //

module.exports = abs;

},{"./abs.js":52}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the complete elliptic integral of the second kind.
*
* @module @stdlib/math/base/special/ellipe
*
* @example
* var ellipe = require( '@stdlib/math/base/special/ellipe' );
*
* var v = ellipe( 0.5 );
* // returns ~1.351
*
* v = ellipe( -1.0 );
* // returns ~1.910
*
* v = ellipe( 2.0 );
* // returns NaN
*
* v = ellipe( Infinity );
* // returns NaN
*
* v = ellipe( -Infinity );
* // returns NaN
*
* v = ellipe( NaN );
* // returns NaN
*/

// MODULES //

var ellipe = require( './main.js' );


// EXPORTS //

module.exports = ellipe;

},{"./main.js":55}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original Julia code and copyright notice are from the [Julia library]{@link https://github.com/JuliaMath/SpecialFunctions.jl/blob/master/src/ellip.jl}. The implementation has been modified for JavaScript.
*
* ```text
* The MIT License (MIT)
*
* Copyright (c) 2017 Jeff Bezanson, Stefan Karpinski, Viral B. Shah, and others:
*
* https://github.com/JuliaMath/SpecialFunctions.jl/graphs/contributors
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
* ```
*/

'use strict';

// MODULES //

var sqrt = require( '@stdlib/math/base/special/sqrt' );
var HALF_PI = require( '@stdlib/constants/math/float64-half-pi' );
var ellipk = require( '@stdlib/math/base/special/ellipk' );
var poly1 = require( './poly_p1.js' );
var poly2 = require( './poly_p2.js' );
var poly3 = require( './poly_p3.js' );
var poly4 = require( './poly_p4.js' );
var poly5 = require( './poly_p5.js' );
var poly6 = require( './poly_p6.js' );
var poly7 = require( './poly_p7.js' );
var poly8 = require( './poly_p8.js' );
var poly9 = require( './poly_p9.js' );
var poly10 = require( './poly_p10.js' );
var poly11 = require( './poly_p11.js' );
var poly12 = require( './poly_p12.js' );


// MAIN //

/**
* Computes the complete elliptic integral of the second kind.
*
* ## Method
*
* -   The function computes the complete elliptic integral of the second kind in terms of parameter \\( m \\), instead of the elliptic modulus \\( k \\).
*
*     ```tex
*     E(m) = \int_0^{\pi/2} \sqrt{1 - m (\sin\theta)^2} d\theta
*     ```
*
* -   The function uses a piecewise approximation polynomial as given in Fukushima (2009).
*
* -   For \\( m < 0 \\), the implementation follows Fukushima (2015).
*
* ## References
*
* -   Fukushima, Toshio. 2009. "Fast computation of complete elliptic integrals and Jacobian elliptic functions." _Celestial Mechanics and Dynamical Astronomy_ 105 (4): 305. doi:[10.1007/s10569-009-9228-z](https://doi.org/10.1007/s10569-009-9228-z).
* -   Fukushima, Toshio. 2015. "Precise and fast computation of complete elliptic integrals by piecewise minimax rational function approximation." _Journal of Computational and Applied Mathematics_ 282 (July): 71–76. doi:[10.1016/j.cam.2014.12.038](https://doi.org/10.1016/j.cam.2014.12.038).
*
* @param {number} m - input value
* @returns {number} evaluated elliptic integral
*
* @example
* var v = ellipe( 0.5 );
* // returns ~1.351
*
* v = ellipe( -1.0 );
* // returns ~1.910
*
* v = ellipe( 2.0 );
* // returns NaN
*
* v = ellipe( Infinity );
* // returns NaN
*
* v = ellipe( -Infinity );
* // returns NaN
*
* v = ellipe( NaN );
* // returns NaN
*/
function ellipe( m ) {
	var FLG;
	var kdm;
	var edm;
	var td;
	var km;
	var t;
	var x;

	x = m;
	if ( m < 0.0 ) {
		x = m / ( m - 1.0 );
		FLG = true;
	}
	if ( x === 0.0 ) {
		return HALF_PI;
	}
	if ( x === 1.0 ) {
		return 1.0;
	}
	if ( x > 1.0 ) {
		return NaN;
	}
	if ( x < 0.1 ) {
		t = poly1( x - 0.05 );
	} else if ( x < 0.2 ) {
		t = poly2( x - 0.15 );
	} else if ( x < 0.3 ) {
		t = poly3( x - 0.25 );
	} else if ( x < 0.4 ) {
		t = poly4( x - 0.35 );
	} else if ( x < 0.5 ) {
		t = poly5( x - 0.45 );
	} else if ( x < 0.6 ) {
		t = poly6( x - 0.55 );
	} else if ( x < 0.7 ) {
		t = poly7( x - 0.65 );
	} else if ( x < 0.8 ) {
		t = poly8( x - 0.75 );
	} else if ( x < 0.85 ) {
		t = poly9( x - 0.825 );
	} else if ( x < 0.9 ) {
		t = poly10( x - 0.875 );
	} else {
		td = 0.95 - x;
		kdm = poly11(td);
		edm = poly12(td);
		km = ellipk( x );

		// To avoid precision loss near 1, we use Eq. 33 from Fukushima (2009):
		t = ( HALF_PI + ( km * (kdm - edm) ) ) / kdm;
	}
	if ( FLG ) {
		// Complete the transformation mentioned above for m < 0:
		return t * sqrt( 1.0 - m );
	}
	return t;
}


// EXPORTS //

module.exports = ellipe;

},{"./poly_p1.js":56,"./poly_p10.js":57,"./poly_p11.js":58,"./poly_p12.js":59,"./poly_p2.js":60,"./poly_p3.js":61,"./poly_p4.js":62,"./poly_p5.js":63,"./poly_p6.js":64,"./poly_p7.js":65,"./poly_p8.js":66,"./poly_p9.js":67,"@stdlib/constants/math/float64-half-pi":44,"@stdlib/math/base/special/ellipk":72,"@stdlib/math/base/special/sqrt":90}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.5509733517804722;
	}
	return 1.5509733517804722 + (x * (-0.4003010201031985 + (x * (-0.07849861944294194 + (x * (-0.034318853117591995 + (x * (-0.0197180433173655 + (x * (-0.01305950773199331 + (x * (-0.009442372874146548 + (x * (-0.007246728512402157 + (x * (-0.00580742401295609 + (x * -0.004809187786009338))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.1246173251197522;
	}
	return 1.1246173251197522 + (x * (-0.7708450563609095 + (x * (-0.8447940536449113 + (x * (-2.4900973094503946 + (x * (-10.239717411543843 + (x * (-49.7490054655148 + (x * (-267.09866751957054 + (x * (-1532.66588382523 + (x * (-9222.313478526092 + (x * (-57502.51612140314 + (x * (-368596.11674161063 + (x * (-2415611.0887010912 + (x * (-16120097.815816568 + (x * (-109209938.52030899 + (x * (-749380758.1942496 + (x * (-5198725846.725541 + (x * -36409256888.1214))))))))))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.5910034537907922;
	}
	return 1.5910034537907922 + (x * (0.41600074399178694 + (x * (0.24579151426410342 + (x * (0.17948148291490615 + (x * (0.14455605708755515 + (x * (0.12320099331242772 + (x * (0.10893881157429353 + (x * (0.09885340987159291 + (x * (0.09143962920174975 + (x * (0.0858425915954139 + (x * 0.08154111871830322))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],59:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"dup":56}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.5101218320928198;
	}
	return 1.5101218320928198 + (x * (-0.41711633390586755 + (x * (-0.09012382040477457 + (x * (-0.04372994401908431 + (x * (-0.027965493064761784 + (x * (-0.020644781177568104 + (x * (-0.016650786739707237 + (x * (-0.01426196082884252 + (x * (-0.012759847429264804 + (x * (-0.011799303775587354 + (x * -0.011197445703074968))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.4674622093394272;
	}
	return 1.4674622093394272 + (x * (-0.43657629094633776 + (x * (-0.10515555766694255 + (x * (-0.05737184359324173 + (x * (-0.04139162772734022 + (x * (-0.03452772850528084 + (x * (-0.031495443512532785 + (x * (-0.030527000890325277 + (x * (-0.0309169840192389 + (x * (-0.03237139531475812 + (x * -0.03478996038640416))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.4226911334908792;
	}
	return 1.4226911334908792 + (x * (-0.4595135196210487 + (x * (-0.12525053982206188 + (x * (-0.07813854509440948 + (x * (-0.06471427847205 + (x * (-0.06208433913173031 + (x * (-0.06519703281557247 + (x * (-0.07279389536257878 + (x * (-0.084959075171781 + (x * (-0.102539850131046 + (x * (-0.12705358515769605 + (x * -0.1607911206912746))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.3754019718711163;
	}
	return 1.3754019718711163 + (x * (-0.4872021832731848 + (x * (-0.15331170134854022 + (x * (-0.11184944491702783 + (x * (-0.10884095252313576 + (x * (-0.12295422312026907 + (x * (-0.15221716396203505 + (x * (-0.20049532364269734 + (x * (-0.27617433306775174 + (x * (-0.39351311430437586 + (x * (-0.5757544060278792 + (x * (-0.8605232357272398 + (x * -1.3088332057585401))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.3250244979582302;
	}
	return 1.3250244979582302 + (x * (-0.5217276475575667 + (x * (-0.19490643048212622 + (x * (-0.17162372682201127 + (x * (-0.20275465292641914 + (x * (-0.27879895311853475 + (x * (-0.42069845728100574 + (x * (-0.675948400853106 + (x * (-1.1363431218392293 + (x * (-1.9767211439543984 + (x * (-3.5316967730957227 + (x * (-6.446753640156048 + (x * -11.97703130208884))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.2707074796501499;
	}
	return 1.2707074796501499 + (x * (-0.5668391682878666 + (x * (-0.2621607934324926 + (x * (-0.2922441735330774 + (x * (-0.4403978408504232 + (x * (-0.7749476413813975 + (x * (-1.498870837987561 + (x * (-3.089708310445187 + (x * (-6.6675959033810015 + (x * (-14.89436036517319 + (x * (-34.18120574251449 + (x * (-80.15895841905397 + (x * (-191.34894807629848 + (x * (-463.5938853480342 + (x * -1137.38082216936))))))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.2110560275684594;
	}
	return 1.2110560275684594 + (x * (-0.6303064132874558 + (x * (-0.38716640952066916 + (x * (-0.5922782353119346 + (x * (-1.23755558451305 + (x * (-3.0320566617452474 + (x * (-8.18168822157359 + (x * (-23.55507217389693 + (x * (-71.04099935893065 + (x * (-221.879685319235 + (x * (-712.1364793277636 + (x * (-2336.1253314403966 + (x * (-7801.945954775964 + (x * (-26448.19586059192 + (x * (-90799.48341621365 + (x * (-315126.04064491636 + (x * -1104011.3443115912))))))))))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.1613071521962828;
	}
	return 1.1613071521962828 + (x * (-0.7011002845552895 + (x * (-0.5805514744654373 + (x * (-1.2436930610777865 + (x * (-3.679383613496635 + (x * (-12.815909243378957 + (x * (-49.25672530759985 + (x * (-202.18187354340904 + (x * (-869.8602699308701 + (x * (-3877.0058473132895 + (x * (-17761.7071017094 + (x * (-83182.69029154233 + (x * (-396650.4505013548 + (x * -1920033.4136826345))))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],68:[function(require,module,exports){
module.exports={"x":[0.99744793371691087,0.99324955444722696,0.99892177960640072,0.99773250245566991,0.99242579130138553,0.9931153249471234,0.99129584016400063,0.99652520294682845,0.99225045372518217,0.99784901834445627,0.99349978910798531,0.99976561208303927,0.9928705590732777,0.99520186669468547,0.99927395259480389,0.99070863426277944,0.99051308620234835,0.99855009302165099,0.99592607488056428,0.99344898892622158,0.99162882611028569,0.99280894657736085,0.99838321926180529,0.99547550669000229,0.99167544175900446,0.99354487881853104,0.99502150395530742,0.99600401175410735,0.99999229544833645,0.99198235891949782,0.9935537161393776,0.9935809153399332,0.99047073004366037,0.99215066894710546,0.99213639220799477,0.99298034461301699,0.99397799339936443,0.99346540483904577,0.99333634817881022,0.9907652969133588,0.99229579571276805,0.99183800468082794,0.99936026563273317,0.99359248409176248,0.99683120465057806,0.99477465097045825,0.99962017585586449,0.99739304903011283,0.99437929374853817,0.99826731904372434,0.99940242624487863,0.9931146416458797,0.99005833735731197,0.99788439343919444,0.99610245994554969,0.9995831050481857,0.99800995649206981,0.99055867159934197,0.99232958236055679,0.9908072786782337,0.99932375433564025,0.9911327073041496,0.99763186450147467,0.99572212055608322,0.99826366891531948,0.99525487172046301,0.99573406242128504,0.99953176504668262,0.9979250241112082,0.99212654576036308,0.99329008292146559,0.99723874465141282,0.9922343962821476,0.99729929173703702,0.99312355107182193,0.99084046745576781,0.9958446502989996,0.9925073445090169,0.99829831151429049,0.99442936108997992,0.99290433445086212,0.99684625065039423,0.99402514131089559,0.998990436250078,0.99861971094787283,0.99001514686360514,0.99614678071433604,0.99741712887976508,0.99991088664878269,0.99970872613295192,0.99203678503632542,0.99223547432223957,0.99827126362455076,0.99962402784920368,0.99675794031155684,0.99938149286353117,0.99248924577845166,0.99255521552952242,0.9947573804381098,0.99813137786940742,0.99399035323293294,0.99232331650875549,0.99599378303213348,0.99869260471577781,0.99800442713101001,0.99838385122669793,0.99105058263825851,0.99766375934501084,0.99821360047269891,0.99978881374142203,0.99841002222190511,0.99270527703830902,0.99354470791231952,0.99685171134725115,0.99430026457312426,0.99154462656043374,0.99572181994125086,0.997677695170335,0.99700754654609458,0.99090318053684145,0.99742395504068138,0.99891455722598121,0.99757808361490297,0.99783453259089727,0.99389089853844437,0.99545656241241565,0.99429259557972027,0.9916141613581313,0.99956249028233579,0.99114665111011013,0.99572914071537322,0.99124085557490793,0.9984963707815816,0.99548668327317646,0.99276317680624993,0.9949693923091516,0.99622261378691601,0.99706437626854816,0.99588302850392596,0.99551026652144781,0.99963372117943428,0.99480212076533725,0.99085894104808891,0.99547526711725975,0.99500448847506284,0.99097590763097276,0.99521537516485015,0.99327791150587819,0.99090156982186806,0.99953865970650868,0.99904576014193025,0.99501716572284304,0.99884300492900913,0.99995025667126702,0.99438945764763065,0.99694053930997406,0.99781644444375461,0.99031962317627897,0.9914845018246109,0.99066925467656874,0.99619753948665457,0.99535113862566837,0.99260597621784541,0.9911130843442173,0.99445611650150456,0.99168490555048994,0.99843915108351822,0.9986318952935811,0.99196185302135398,0.9941449183698452,0.9930382123978827,0.9945828373263369,0.99483246239266199,0.99835954320487963,0.99337778268807864,0.99019403199096212,0.99798405980911942,0.99878489805331216,0.99987388823022461,0.9977006710707641,0.99159031653682184,0.9943875159108555,0.99236856096402581,0.99313702207396992,0.99702166412412507,0.99355019325881988,0.9937543411486528,0.99495597600043684,0.9997360753126654,0.99779419539351411,0.99972208320848988,0.99606221548930673,0.99643633674549659,0.99711301531355201,0.99860012868033909,0.99106706570436598,0.99401843206117957,0.99601504829201382,0.99631867600323376,0.99957665515052552,0.99985138115493022,0.99284585319997676,0.99559421462770992,0.99298915821079348,0.99933498553542111,0.99823426157885387,0.9972027117012755,0.99489607412411596,0.9948399010720721,0.99990943221273432,0.99638967193950356,0.99380994050981453,0.99887548106225976,0.99428700499032463,0.99198716881269056,0.99068374149871363,0.993953267399867,0.99018092077163722,0.99992076079816228,0.99878544747402698,0.99402311375201491,0.99882181057526653,0.99658790592406266,0.99967587064476326,0.99901257991308245,0.99210735551248774,0.99995282236203364,0.99536780768157607,0.99653097963078785,0.99601494544703417,0.99108425582738013,0.99979105189784101,0.9903611042307231,0.99162258492675237,0.99618029425115395,0.99801509547709133,0.99567087648750929,0.99701888547748163,0.99961868458503556,0.99786849642138387,0.99746030854094536,0.99953681207512479,0.99662449846859646,0.99495331499368067,0.9952326098774581,0.99629337563305675,0.99259868285446173,0.99980930196017492,0.99961897567106273,0.99745575725249691,0.99540150018672435,0.99571434287889116,0.99030267135022298,0.99560334035962705,0.99696244835670478,0.99252555382075047,0.99519664180374801,0.99920937362093687,0.99059024653297167,0.99063858212754941,0.99889947234733589,0.99061562725660923,0.99330169218177555,0.99770659772224091,0.99229678223861473,0.99897050389847575,0.99113937246015149,0.99837195954545077,0.99310891621446074,0.99183319672226444,0.9922840947985283,0.99278794905758549,0.9965193197092681,0.99446257620035461,0.99066153507084465,0.99607723564983386,0.99275403838400356,0.99024834753593383,0.99281792052819118,0.9998974082503449,0.9987997825034447,0.9986980219358601,0.99444285925376275,0.9922601371564439,0.9975583853022123,0.99871296715336988,0.99603236043169374,0.99872482962660558,0.99783187613319702,0.99538106162345341,0.99113919249074955,0.99472959954275497,0.99978466033006508,0.99368988264561076,0.99848511817050767,0.99771141262544805,0.99050641426932418,0.99848412787550989,0.99466155208377005,0.99920720708071809,0.99325620705491213,0.99679216465115195,0.99630142104104158,0.9905141726328176,0.99230276133227768,0.99522487033178353,0.99579826982063613,0.99615093800193555,0.99603095999531255,0.99958187048937708,0.99599819108818144,0.99317348612979328,0.99448383037860455,0.99276957172877989,0.99035419916440803,0.99410700129111407,0.99513763453161552,0.99771455123184827,0.99407689388894682,0.99950100776975248,0.99108035227885094,0.99553889737552359,0.99459829641487751,0.99079200509525411,0.99450837660193003,0.99792674338425391,0.99551085222053359,0.99680758070990816,0.99805323779461574,0.99550150183882591,0.99700779989637667,0.99437935895555185,0.99872148279497397,0.99617230234230048,0.99052186935125008,0.99118424938476968,0.99219659342103561,0.99500835952834066,0.99459596046307053,0.9929047159732366,0.9995843774381904,0.99484056860061709,0.99789966348583015,0.99830646079393548,0.99451829423739646,0.99366536066684386,0.99333394841683376,0.99637874071200683,0.99059089401214684,0.99603309677576646,0.99740831211348036,0.99417487401420646,0.99506743844461021,0.99581512743653755,0.99199905421512313,0.99720953437706572,0.99427150829408295,0.99844982282393102,0.99168673402881224,0.99944353369705474,0.99751619427378524,0.99134392269697735,0.99368314011841052,0.99070298400252921,0.99941723612215738,0.99666999790612842,0.99017170821421496,0.99424981031283344,0.99828973006037369,0.99461219754259267,0.99626528320420416,0.99043797663917132,0.995386926401718,0.99232296287437483,0.99650442584207788,0.99867277416385014,0.99726556867126648,0.99923790547368252,0.99094479119048706,0.99371365674702816,0.99877486177455865,0.99614733883739004,0.99014360706207061,0.99329606209428301,0.99294273191361337,0.99919641795883418,0.99179896885563779,0.99226212536855252,0.9992620164031174,0.99136937825188487,0.99068173619621669,0.99324939624298503,0.99581035113511884,0.99761695898926028,0.99637087508019384,0.99479710120350751,0.99651204140386451,0.99032977716709025,0.99864535556098166,0.99101030914162536,0.99055946934635608,0.99372826258495195,0.99816773485712562,0.99528918474336592,0.99528869575012957,0.99718686317491012,0.99694281127467799,0.99682202161778533,0.99212383658576409,0.99594963917831658,0.9954322562227913,0.99053611783453144,0.99702450015778299,0.9980229934411905,0.999563389184148,0.99256160422212747,0.9944449771442273,0.9910107317428587,0.99085389286492231,0.99827718822499478,0.99057334414821485,0.99326139759279553,0.99629387544252301,0.9913275442125925,0.99796099448272702,0.99386545315721864,0.99691122216773609,0.99309480819317231,0.99345273331832673,0.99726983857942675,0.99946721982057063,0.99898871542653533,0.99520138301644123,0.99637877709746914,0.99953717647218976,0.99178854613761835,0.99073588279288682,0.99028889162921829,0.99207011239709708,0.99693712602580942,0.99774950312936628,0.99329433363698705,0.99914096402777453,0.99332576155975272,0.99782472392324406,0.99980506759471444,0.99295504641027654,0.9935552042486826,0.99151830535558938,0.99855483465572559,0.99847825731431039,0.99852163931768012,0.99784776107296158,0.99026888893021592,0.99270804417495662,0.99889487981706337,0.9922778792820065,0.99214478684797325,0.99320991115779078,0.99832846503559591,0.99829478846843955,0.9962197446247707,0.9982209997704159,0.99161380713241987,0.99570625783545308,0.99600181389897058,0.99571772452919161,0.99577644638182805,0.99285989667775243,0.997012815807787,0.99699063643213337,0.99897871758194889,0.99796178318983131,0.9904920122798534,0.99441544897608547,0.99826198930566379,0.99446170987760441,0.99599266077493942,0.99465615845405753,0.99465726772991314,0.99279011280178786,0.99738891423636045,0.9967530777550111,0.99785073385533507,0.99903574159611341,0.99602650164123441,0.99908435042272181,0.9997248940826563,0.99747122228228136,0.9920974626500525,0.99260485457060676,0.99598549611677689,0.99689568877174217,0.99037570514709916,0.99131817485010065,0.99400811224866958,0.99123488486231004,0.99120060605510485,0.99190883761236814,0.99231169927479346,0.99145717524583588,0.9929103307606294,0.99584985106411039,0.99822190890178364,0.99073354357246446,0.99364803906587273,0.99822243990045201,0.99216513343604029,0.99722830678694652,0.99636474488524163,0.99925765451742521,0.99313213247452115,0.99492589331542702,0.99410603504744477,0.99654817406772234,0.99735895643154693,0.99890034462762645,0.99851390548277019,0.99538471726706457,0.99075119324556804,0.9928217694694258,0.99016869038361732,0.99975859923622845,0.99674300734902666,0.99036421869965618,0.99934965169140388,0.99326211947953114,0.99368448296756295,0.99972916322720839,0.99911849690687937,0.99364996118397175,0.9961435129440841,0.99309118705394006,0.99460229868071171,0.99120900292072167,0.99545419619797981,0.99915674132672783,0.99176657538296864,0.99135464650708438,0.99959991874963461,0.99332084674959487,0.99869262725385832,0.99897390149840848,0.99083588578130255,0.99499598811726198,0.99760561709656359,0.99615226713640637,0.99935125084283571,0.99583074660807547,0.99098744994287002,0.99698184102825216,0.99598950300383726,0.99029329406995281,0.99401367597442403,0.99527829895055364,0.99998714826151169,0.99032069640191478,0.99576925692502549,0.99827059607970925,0.99303702296179674,0.99339952209972615,0.99185357013206743,0.99846626290681539,0.99173628818600479,0.99246044965675873,0.99226901383337474,0.99581433097927619,0.99744650914539068,0.99937583114683071,0.99307516341686219,0.99047782507845361,0.99811114167626269,0.9905397225701571,0.99776510136453833,0.99020615967368686,0.99695342114653462,0.99681410362294076,0.99856145755020731,0.99598568659510323,0.9976062417978665,0.99114018633838763,0.9915643727476301,0.99796165720612806,0.99904895601195698,0.99617788807999086,0.99049295092188216,0.99070206503039437,0.9966433662084353,0.99069272043162138,0.99296221845076049,0.99135993785753918,0.99691732312208392,0.99788812430519191,0.99563229129123054,0.99092389223203603,0.9909323068515421,0.992378450031701,0.99825242691793314,0.99243623547958748,0.99263341061902133,0.99104811731074516,0.99226987008487855,0.99858266924577022,0.99300402605244886,0.99698129951134717,0.99306721959436917,0.99733668761828953,0.99064464383057615,0.99650465573701841,0.99408718745242686,0.99516218941071866,0.9937144101209594,0.99326355491151475,0.99937693052371723,0.99661710016962302,0.99576033767461258,0.99117553727004981,0.99237127368660893,0.99147802632046911,0.99490241160841397,0.99019762687883639,0.99260339794151298,0.99964195305913084,0.99169978622448696,0.99970275865404812,0.99220971287708493,0.99123848120290226,0.9985808809942317,0.99467363281856247,0.99838003339318282,0.99656628336075759,0.99114739476200586,0.9929015654983171,0.99451810859215095,0.99754461189261523,0.99475428106673414,0.99558062234689548,0.99809107559080024,0.99427749819000744,0.99229713716507628,0.99267167338176188,0.99302414776490211,0.99753660700475144,0.99381740885586667,0.99898286492634614,0.99231222270955077,0.99728371188666232,0.9921294760367686,0.99406789455513,0.99355223976123541,0.99938222013044498,0.99225239655149589,0.99255401913948049,0.99670507181565604,0.99533109924786634,0.99807552741153882,0.99954659396527545,0.99498801035378381,0.99267720767833778,0.99018585070030507,0.992500596103431,0.99583218397701623,0.99927579948586032,0.99838021036169788,0.99068575491920319,0.99004016946899209,0.99299370444965041,0.9964645637113948,0.99591524371599915,0.99876590330076165,0.99203278814601314,0.99394029806731621,0.99635819616085686,0.99227947369580849,0.99798290421623947,0.9910874063372207,0.9950165088126417,0.9938349605217276,0.99650747059451883,0.99241896765711668,0.99795875388183075,0.99751541012504907,0.99233350424033751,0.99925272179972513,0.99600778858326211,0.99210628661939682,0.99112451130705159,0.99911989811152468,0.99515714082479523,0.99152376341939508,0.99837756899689878,0.99954457735998115,0.99920698032867694,0.99260434729268032,0.99498178102247326,0.99717570388233867,0.99277583366708944,0.99097846641434495,0.99652454706330762,0.99606224589860415,0.99917207072527214,0.99343209044797232,0.99509788468857852,0.99095499859661906,0.999740940616338,0.99592874208930859,0.99197259215716949,0.9939050597794955,0.9911117386431747,0.99911776317257706,0.99297324552970379,0.9966691521938138,0.99396378896323567,0.99180164143990401,0.99420713605315214,0.99862035840376717,0.99311444207409794,0.99831747976419838,0.99693773779466355,0.99990739962055852,0.99091862642054862,0.99728822593291733,0.99402048403689613,0.99901719737702321,0.99295151279962757,0.99866028163008602,0.99306466131386084,0.9932020665531387,0.991055505752655,0.99132386328377387,0.99593768218063627,0.99908207684931905,0.99282699239546923,0.99873367212741582,0.99155206100042181,0.99298947063827137,0.9900065860108116,0.99866828556343956,0.99283567055290745,0.99551417609968751,0.99550755798008472,0.99197434191168288,0.99870815097903454,0.99453799967399237,0.99042249200700716,0.99748270000177641,0.99904631507552344,0.99823986102889783,0.99130960990920991,0.99298778532017928,0.99833645577575636,0.99184889250604857,0.99800388323481382,0.99614742917828636,0.99917788300082089,0.99524435905731978,0.99137289934215389,0.99082685376598845,0.99504681838937703,0.99910644191825293,0.99404917984655361,0.99135663257736528,0.99173554805182829,0.99165222215350224,0.99575126095795718,0.9964820294364185,0.99606157312258126,0.99582717881664984,0.9921442429773859,0.99057904591010948,0.9951988026145776,0.99987492890706331,0.9998908688661915,0.99939545007453945,0.99489866172438324,0.99011875624756307,0.99694803725282588,0.99653529055960499,0.99411380684857908,0.99921501822164027,0.99034773268155152,0.99043430152588052,0.99292802272784619,0.99128788713164839,0.99801361592578486,0.99168855600482508,0.99346467338392763,0.99920761614187525,0.99083307612239058,0.99820351442671584,0.99511055258215897,0.99874188447923096,0.99366796721763018,0.99556375650125395,0.99739405560532934,0.99048558523456376,0.99524687685728419,0.99594582622211569,0.99804440427085728,0.99301047208783499,0.99816829489385617,0.99429786318149627,0.99189452530494893,0.99792533962803986,0.9912368108566515,0.99748725956187045,0.99820914379948977,0.99106164038724354,0.99637833831845246,0.99254516810628046,0.99016118195046576,0.99184422602451805,0.99895865028588815,0.99512839731058156,0.99515323522988941,0.99234490348745552,0.99544467489376409,0.9941094822400014,0.99606381563016977,0.99354384705588616,0.99760360177869389,0.99447377210653964,0.99855261334291912,0.99795145158097243,0.99382830164919633,0.99257948736842072,0.99084640721895523,0.99773170133993327,0.99733799912225896,0.99802207252744235,0.99331956132004995,0.99944992844730729,0.99839665555470392,0.9965986561671174,0.99371686135198711,0.99846541845166048,0.9982813244854335,0.99838736343769419,0.99176500976976523,0.99328862730973999,0.99129506906644504,0.99478900802810832,0.99879795591551812,0.9933659476465343,0.99044074723533637,0.99475106844854588,0.9968665134720448,0.99652546100680339,0.99733699532443421,0.99168129905716862,0.99437128724499135,0.99271173526116041,0.99379800930951789,0.99433279319512236,0.9997955947074455,0.99794424435165596,0.9939895352060697,0.99669809746354232,0.9944014289862444,0.99528512453643581,0.99156792207743205,0.99398648407470713,0.99326001677741882,0.9985741564863212,0.99314030524442876,0.99517798732243568,0.99894411213204848,0.99803640414623218,0.9924699948027762,0.99101873952451791,0.99310647944542629,0.99653006323815851,0.99408828019197559,0.99887172402173063,0.99707940090828895,0.99600465833697416,0.99143623227980937,0.99664202677689495,0.99871234935480513,0.99131682569186874,0.99083147582787456,0.99531998765519492,0.9946169166199621,0.9959734208389891,0.99030385985275149,0.99711866789256365,0.99753125211651184,0.99228549249709486,0.99699972666092795,0.99607259626475209,0.9921449079869552,0.99308276758738467,0.99679836697913682,0.99147492992902753,0.99557236949591199,0.99433188400788086,0.99850593832599532,0.99563120620173162,0.99558509640615822,0.99248961047351014,0.99901683486104176,0.99358663324236218,0.99419475752282449,0.99088417354793612,0.99358092538557086,0.99843642545642308,0.99488938618325762,0.99602974870327154,0.99255936546040935,0.99019327770209797,0.99929076355843827,0.99211559162695007,0.9946671014429822,0.99131829611247058,0.99253982447194866,0.99595857093048468,0.99431175328811094,0.99265324342219619,0.99702459751782124,0.99962007687781518,0.99402289633554897,0.9978762281004977,0.99181821898156641,0.992178281657767,0.99856165491497539,0.99406631120898992,0.99584142808682008,0.99052114904760447,0.99373541426410406,0.99440257589075365,0.99221672375434544,0.99377206389300266,0.99218972213739665,0.9992455442370507,0.99522180216357836,0.999906729859391,0.99433379365448959,0.998678355142958,0.99741229862989667,0.99066763707282557,0.99070442584602747,0.99589495776260917,0.99847248704419378,0.9969159307105725,0.99679812248251864,0.99394429959049491,0.99136637857560506,0.99796889935189248,0.99858316349346865,0.99461212758398077,0.99199814139841491,0.99189664593322802,0.99607279187182451,0.99422848007176257,0.99542990677048548,0.99907798334395204,0.99162308461981497,0.99362866006477357,0.99005652496365015,0.99960118402504639,0.99771407995059591,0.99638223030111195,0.99764711078779122,0.99203243591313273,0.99421027243624205,0.99804362786529399,0.99056807505414379,0.99070726701308764,0.99585688421172303,0.99883076576647978,0.99174137827915254,0.99227197613010465,0.99728537797253836,0.9945774356042405,0.99534237621524624,0.99813738087937043,0.99253038982794484,0.99739858854855779,0.99916965047624795,0.99201938895329556,0.99758118711395327,0.99160415596593032,0.99886942030675896,0.99545765719368495,0.99068791293634451,0.99216074495909123,0.99183509844643858,0.99427643680728206,0.99736998948898326,0.99069533782657471,0.99696645176795118,0.99586441782299051,0.99776915203800698,0.99475933822928064,0.99501853230204962,0.99594187744144447,0.99425454279292258,0.99525666757781805,0.9961117600594922,0.99961669433586253,0.99855686307599345,0.99944740591669734,0.99670730027797649,0.99916202321589154,0.99523539686326123,0.99639942402332782,0.99298785528344724,0.99435909164071923,0.99703898680765035,0.99318784777840463,0.99381572715560085,0.9975524201187892,0.99567628228606253,0.99624538081025305,0.99887772170040523,0.99201762343306765,0.9984286499117464,0.99388124238754927,0.99898708678306702,0.99093468320008227,0.99938909193557246,0.99518880961704048,0.99815353612244917,0.99961328254632109,0.99001357691785674,0.99694604629591854,0.99003090386408477,0.99404057717457384,0.99087460065128119,0.99797072437768175,0.99260701277632191,0.9970603124903531,0.99022796391519996,0.99774768918287937,0.99424042406249558,0.99859330881453368,0.99341030867469748,0.99227364599211609,0.99541299796257354,0.9997232638118646,0.99926076467010982,0.99008143597748499,0.99298469595951999,0.99593488066299773,0.99338050981910941,0.99901977221479099,0.99859394158028369,0.99250466687748717,0.9934044426113362,0.99304183884279473,0.99138106586584007,0.99687758102920399,0.99507748177975486,0.99068192970336666,0.99856570816329349,0.99004886643493706,0.99384275183677484,0.99631601421191684,0.99695621355674924,0.99589112756003906,0.99627841387458405,0.9914474103901999,0.99450343116596385,0.99795149230829205,0.99473570582373505,0.99128534966877424,0.99949611389130444,0.9903440553077012,0.99083489215250331,0.9903689991869512,0.99279800932946571,0.9987103518210898,0.99446962607284795,0.99458251386379004,0.99587512508747844,0.99091530029480368,0.99877546381206506,0.99073227309380818,0.99469053609962754,0.99028754125107588,0.99437374729709005,0.99993808772110959,0.99746110325680759,0.99311208991191446,0.99467863670547263,0.99628074551945478,0.99860741269883535,0.9925922045077421,0.99466465364353496,0.99386512444486586,0.9949805467593299,0.99568158479264612,0.99487381905347716,0.9999309494749421,0.99229445826707452,0.99593563238166849,0.99085543678047971,0.99259245695705967,0.9906737657382334,0.9925767316695987,0.99888302095001369,0.99845182062071858,0.99233144369265391,0.99013598555671212,0.99861509599359544,0.9935949913455534,0.99711663918594273,0.99121379439652413,0.998727257094986,0.99895002138350319,0.99937908210140702,0.99228170266332105,0.99139675306136066,0.99592545399031784,0.9939386075669322,0.99500722504410399,0.99980464775224842,0.9916558886785295,0.99644729547685496,0.99195710573937279,0.9989632013205767,0.99955192556579475,0.99482182182049861,0.99390206932937142,0.99014091666105719,0.99532350640575007,0.99622818054847839,0.99645831102950588,0.99231072249659102,0.99588052715412967,0.99527381222424238,0.99153900998042432,0.99724919459858119,0.99871545247903559,0.99607355050720203,0.99438751867660691,0.99588307611303117,0.99586015102979286,0.99433391498902979,0.99465233973354639,0.99244148481064176,0.99005698296557065,0.9942891746222251,0.9908615176179435,0.99010176433440766,0.99956858282535355,0.99608760563465815,0.99648336949421068,0.99957879391216997,0.99240197779499417,0.9909543698025628,0.99536272257283398,0.99035587004378767,0.99555067914841577,0.99886146490442773,0.99115957831384105,0.99246916666043317,0.99967139056510224,0.99008914163804818,0.9959525555840596,0.99814838781582094,0.99334865588913879,0.99140485387982547,0.99158839738468874,0.99879778454136381,0.99558310672736328,0.99095367247001942,0.99532958937107308,0.99352524846230883,0.99772965072846787,0.99593361227495147,0.99356871382235412,0.99585123116476859,0.99983815685408606,0.99667615000126908,0.99415834213770782,0.99647962312091487,0.99065164764213332,0.99433325730357991,0.99603604460817508,0.99139744786561601,0.99114390236291594,0.99751854318364985,0.99176555976551417,0.99241762616755924,0.99095671884978376,0.99650394278077314,0.99419382927098821,0.99857288324191351,0.99491286777852306,0.99084362027040118,0.9993387628208783,0.99971991948291217,0.99698452347423805,0.99031456790645633,0.99073763565770656,0.99835321008571953,0.99721498159670452,0.99835629775386925,0.9985068078801117,0.99049852517052928,0.99554307006565801,0.99545831622243319,0.99703790202545717,0.99943075517341651,0.99996582999139527,0.99321440923346094,0.99051130070724891,0.99806386158602445,0.99112551760755552,0.99601338616153479,0.99552004918451886,0.99789541502854018,0.99811036350369153,0.99799105111659314,0.9965518289826466,0.99049559808125653,0.99224737621674564,0.99283170319420888,0.99206814949347655,0.99653391481710063,0.99260660699076442,0.99489606378281303,0.99952947508131362,0.99972754951134812,0.99931214361097198,0.99748415060814377,0.99148033673796476,0.99567784358301759,0.99982752229999305,0.99298934267337757,0.99772568363982572,0.99256084168024239,0.99932604081588305,0.99886475138075115,0.99212955636229228,0.99446756182818341,0.99671080140967061,0.99815905654603454,0.99214356037689233,0.99098327467788616,0.99217793933316789,0.9985950749679976,0.9932909185462373,0.99027626240261246,0.99702216162879853,0.99899066514161883,0.99722398362177445,0.99899845505283769,0.99227143372853166,0.99524053592743722,0.99841904417761318,0.99120187495299916,0.9949415627826671,0.99177776318978561,0.99056204037306739,0.9970603698354622,0.99058485660256812,0.99831276619970721,0.99652837958929519,0.99034830337154678,0.99254134852671017,0.99757762926805804,0.99898360028797173,0.99957016462565285,0.99972350592220738,0.9934283622918525,0.99521014721249579,0.99638179884854283,0.99589217295821097,0.99342971507955113,0.99773374901104184,0.99216449748082947,0.99972511253045893,0.9978612200506094,0.99912123855344903,0.99723017650476464,0.99509754124417593,0.99278811025805813,0.99278552982592949,0.99582373187552509,0.99076501652482984,0.99420963682325814,0.99450070284295944,0.99092059502096519,0.99640405456405801,0.99024024916194631,0.99972226144813325,0.99491096688779934,0.99931045653285622,0.99278239194588824,0.99222093217342555,0.99339723185964435,0.99644014552280535,0.99287320870041007,0.99730727594229485,0.99170886138133307,0.99942940210867715,0.99399223386010405,0.99916511763778282,0.99697579809881087,0.99018597716359136,0.99203656071479318,0.99638527371025432,0.99666259857814643,0.99391241059275159,0.99443021777916163,0.99874135857205948,0.99433251937408906,0.99098716710753576,0.99175221917273737,0.99814108025351633,0.99193182994666884,0.99328794404341747,0.99616359692079226,0.99624300333958138,0.99268983705161229,0.99596605236031044,0.99559621968110301,0.9939318717236314,0.99944689510009899,0.99823951287247426,0.99714400188245156,0.99670600257715558,0.99679151728605242,0.99959830572521213,0.99959284637398171,0.99910265356979,0.99775256773794696,0.99791499242574389,0.99607666194731137,0.99664019110249702,0.99947907560292282,0.9980828114160667,0.99059635661336798,0.99211837837063355,0.99268685476138629,0.99463992961591596,0.99986581370735117,0.99765897060236686,0.99772129515123642,0.99127952131787733,0.99475306763752147,0.99135352185663073,0.99680831464908082,0.99342627091349012,0.99416893059594347,0.99531079119174548,0.99380111192622822,0.99313302484375887,0.99213249062901598,0.99071343424303482,0.99382899694467519,0.99866386735000645,0.99029664789744554,0.99202534461722569,0.99472273835364311,0.99242100258667831,0.99333339349022487,0.99605368073421829,0.99975747222278011,0.994881989900396,0.99555387993300593,0.99785745492235267,0.99846219004913328,0.99461399902690151,0.9940802269081177,0.99098355358576029,0.99461971964852047,0.99236440107596802,0.99826224087496962,0.9970306798405959,0.99991104076958348,0.99472665613368616,0.99523895259992168,0.99075094945435616,0.99925344345598155,0.99733646365760875,0.99738947961369173,0.99195783802794124,0.99567373306874485,0.99938213780044993,0.99968680781583208,0.99857261135085318,0.99824416969715546,0.99865327356746647,0.99959513319179527,0.99194794626202876,0.99646281432937311,0.99405595482477171,0.99379535527534224,0.99824754159748363,0.99476527020738992,0.99889993839740676,0.99911798621134085,0.99820110453761923,0.99014852369511008,0.99773126364347076,0.99156678181026059,0.99167304795224032,0.99471520718918083,0.99985522211552846,0.995429373934967,0.99604939148442262,0.99059685060497837,0.99748722735762829,0.996579645003976,0.99576489196860418,0.99889546340924262,0.99168109011721861,0.99109621647780788,0.99307471904115652,0.9943772933792292,0.99769762739389323,0.99280202065616241,0.99944237003507164,0.99985147789570084,0.99577520816561582,0.99608697833755311,0.99598580735693731,0.99253723833836771,0.9903439230754485,0.99132601469151416,0.99336894136527365,0.99544950395631482,0.99248199089346845,0.99827721150340276,0.99911403740971694,0.9983692257025838,0.99018433856295229,0.99833265315387421,0.99036830510207052,0.99203695060426411,0.99749387789099986,0.99544363259658608,0.99676090056889433,0.99874855229622095,0.99215529123714286,0.9912098798152541,0.99653431629572198,0.99856265131185407,0.99524073316881734,0.99899686039225988,0.99973911141398475,0.99217843330615363,0.99945096960838531,0.99076971382772694,0.99883391879762407,0.99474167743031328,0.99422989954712959,0.99834943968204803,0.99268477451354376,0.99469346561475303,0.99381980227617062,0.99413728564317194,0.99160749206281451,0.9950269598772854,0.99294405914371997,0.99125427417677525,0.99431521449101457,0.9913227209492731,0.99826595900640447,0.99870388315915637,0.99789128027902119,0.99602889883534562,0.9943148419922534,0.99265275195188962,0.99905328805872984,0.99864716100534379,0.99463733521767383,0.9905810364409795,0.99458087118669414,0.99457708106656717,0.99441530903558106,0.99722137425867508,0.9957066881216573,0.99338965249940236,0.99921061307568426,0.99401179732378731,0.99625072230275713,0.99526927056470627,0.9904158854998355,0.99894146287275176,0.99891794669162481,0.99778282828545217,0.99123384521447977,0.99069360667104134,0.99027037546574326,0.99278756651085864,0.99033064327332954,0.99379331899316981,0.99283270960413217,0.9986458607948594,0.99639441935185691,0.99419918369594118,0.99632281509926612,0.99239853486048402,0.99490411747873997,0.99597594751822616,0.99321950450191621,0.99479356460361201,0.99844569964028174,0.99898457649346806,0.99196376948223397,0.99934615767663082,0.99253377729610115,0.99817805044418195,0.99595182249928982,0.99708838087718954,0.9950695163410983,0.99743146246112091,0.99362520822538203,0.99899619812050511,0.99868658522305354,0.99065233284075693,0.99380708804461315,0.99335877579229626,0.99227837126681739,0.99004334640246816,0.99596208323227586,0.99828012791612997,0.99421458091126957,0.99507384634149443,0.99448410232088247,0.9936612582309865,0.99258846323059935,0.99226617048956567,0.99976691221669711,0.9953477822163419,0.99924358878792185,0.99289455923529857,0.99057185271442072,0.99068364056741054,0.99516364624933895,0.99084962251675612,0.9941641729167856,0.99068332636594048,0.99145659600948244,0.99409775517451082,0.99412853035665516,0.99123369039991316,0.99810983369466866,0.99442972291917986,0.99533373480179366,0.99898849845473137,0.99104255505633332,0.99353603640385946,0.99351824139377687,0.99120166102631557,0.9916163653174771,0.99569054108503807,0.99814723243246761,0.99874945220143296,0.99458376157155837,0.99348540122664064,0.99464489945940582,0.99041916817674269,0.99034328472232191,0.99142325482926585,0.99740393441784025,0.99076585180737475,0.99278164050658624,0.99740452534810753,0.99339520161416683,0.99456479477917192,0.99363630574252038,0.99668182486692936,0.99839122007786829,0.99699176148068758,0.995803099644467,0.99571300076075386,0.99923408659253432,0.996286304717106,0.99965755664887201,0.99877676146865257,0.99745874275779256,0.99662285503022041,0.99629659971002327,0.99875326076223092,0.99046105075171353,0.99467470269875646,0.99069793125401018,0.99141321897422174,0.99607829966793859,0.99068127645755322,0.99048266375362037,0.99714170985673733,0.99098026880427448,0.99307955227328715,0.99958368640774231,0.99671096854207475,0.99398542337410734,0.99652355596745246,0.99230215206144656,0.99530995729440452,0.99539664873043354,0.99715035522791506,0.99079952439818131,0.99504760139735715,0.99892333260842947,0.99487950558744231,0.99164012823250092,0.99497788526367836,0.99749293711878384,0.99935881958939021,0.99230724479695775,0.99389242759157992,0.9901696463604821,0.99117133444300243,0.9999003974759022,0.99240399515225619,0.99171687891296456,0.996848400079272,0.99037020502198769,0.99839169686501472,0.994290426615977,0.9997004761641235,0.9945892237327737,0.99215148094658623,0.99565140572538902,0.99760267315902207,0.99456127154241891,0.99584044438492669,0.99426227657661492,0.99402911280658091,0.99235604208810879,0.99509989332720494,0.99322141050508961,0.9949559465270249,0.99981831224059381,0.9965130321225717,0.99025729816645081,0.99743631776106123,0.99030927818332493,0.99301923270331227,0.99587916430216883,0.99089602978659075,0.99344477838859446,0.99825882884796469,0.99465412475371873,0.9938954805225434,0.99195765814933412,0.99775227322266735,0.99913025699609403,0.99179351161131402,0.99442386608430233,0.99109350274949681,0.99099643075453325,0.99905067822768767,0.99618853494959325,0.9987626336936597,0.99676929423806604,0.99999692587033495,0.99471021041220753,0.99864168262909581,0.9937589745296328,0.9903687383728651,0.99255185241767208,0.99544627967680588,0.99847619713213431,0.99997516418833543,0.99388674404220512,0.99510957050060478,0.9945233265244765,0.9987342482069016,0.99634365415638337,0.9907021444759061,0.99473777717368028,0.99987439983371174,0.99568986722878905,0.99922621161350578,0.99108836113608023,0.9956420449208957,0.99627810075101209,0.99431418908168256,0.99562328368809627,0.99337810778493318,0.99965777480100926,0.9972065136130952,0.99002029812921488,0.99013654204545842,0.99132092175113251,0.99374022790083916,0.99209592136754632,0.99922592946960942,0.99940122040984214,0.99546424996056615,0.99756652948803215,0.99473839475806214,0.99987063476831295,0.99496487660763622,0.99748180616352422,0.9930894018172568,0.99538916439051572,0.99950742469257814,0.99844608503424259,0.99981895083351202,0.99070035599156026,0.99513511746266625,0.99942019402814053,0.99992490562125569,0.99271226845985838,0.99455798118985306,0.99014305428892979,0.99425998280484551,0.99068449264467828,0.99213193455932291,0.99186259580105285,0.99193230159575674,0.99200377748069701,0.99832670966809711,0.99876403703314853,0.99726564438254828,0.99589428602723518,0.99529692721775709,0.99453771189382978,0.99828997826794108,0.99915632862679171,0.99511823248957187,0.99195492868557367,0.99551906648136901,0.99946875834198157,0.99213263560747167,0.9989144522275335,0.99587761840542077,0.99936480134636929,0.99142748947875126,0.9974810462570185,0.99052218308244921,0.99252811197088653,0.99683239578848581,0.99916687337777343,0.99608498623523345,0.99545259499318706,0.99219633971688637,0.9950799279588628,0.99406239314259381,0.99787578840654811,0.99629844954842095,0.99195150090216655,0.99555252093633495,0.99731653806440412,0.99127566301313064,0.99847061965212103,0.99169181410425922,0.99656141341490623,0.99000999313722149,0.99628889788845343,0.99418120652573927,0.99818861457172037,0.9948843682510794,0.99979236054293597,0.99159852851381713,0.99905822342810569,0.99666771892693873,0.99777647663017011,0.99017918582367193,0.99218959139045493,0.99119663390523083,0.99449557675779376,0.99952030096038658,0.99728829535141605,0.99975756381152381,0.99838213052188696,0.99030911451043813,0.99142227357184975,0.99493832452773234,0.99968940367377634,0.99862635849898218,0.9993402519033181,0.99242851876998694,0.9922518888987496,0.99834186733861985,0.99912433987109428,0.9981350983521966,0.99365087328828938,0.99628910213966315,0.9900213849880497,0.99002237972501195,0.99925555354507145,0.99379685966486597,0.99457312346948124,0.99904315255515108,0.99773394876441335,0.99680283630542599,0.99725926354253547,0.9937878524551762,0.99919821517112806,0.99631891517321947,0.99469317637023213,0.99243245197817376,0.99597587769697071,0.99571355929122074,0.9922015431685941,0.99981630598125859,0.99528444584012166,0.99849597056943218,0.9909994151889151,0.99283415839693023,0.99617934030204125,0.99682389420611828,0.99178676771055041,0.99358088714230575,0.99889380758784307,0.9998682807413426,0.99766581528543674,0.99083977891170227,0.99799451752041324,0.99250280859283846,0.993724563809121,0.99811265482865552,0.99328037278254355,0.99084414665482778,0.99193205295749565,0.99531200840407774,0.99004425995950374,0.99800542915484258,0.99245804683802163,0.99738749355737932,0.9992414707787256,0.99141648818555128,0.99357869002749633,0.9943785046712702,0.99400218198169443,0.99350345337478119,0.99521077606708208,0.99478449643564293,0.99927467507054213,0.99587344659995425,0.9978405241257855,0.99145791113826232,0.99141810436218536,0.99905240076702062,0.99193179544461796,0.99640130225258317,0.9948976965190347,0.99162923282008852,0.99080052396589635,0.99565854001150322,0.9977530216028806,0.99931522978682652,0.99273188550415559,0.99783023573994123,0.99620609393957371,0.99685618568588275,0.996440802507505,0.99466172665436936,0.99180150171591042,0.99260292067012723,0.9935761249676377,0.99569211243927103,0.9954461835553029,0.99248745790173298,0.99165875008353355,0.99319269661095644,0.99160702793340427,0.99910711157000109,0.99265459620291063,0.99885131516700698,0.99682268415028441,0.99794509967891454,0.99204348537184761,0.99925717221740051,0.99877968567344222,0.99178822064499139,0.9986868330790819,0.99517489397378633,0.99062803279259082,0.99626942620907211,0.99012377406566565,0.99913091027915657,0.99716457855868923,0.99663901859383419,0.99494322642173783,0.99389153905202332,0.99455929097570406,0.99739933582526419,0.99280422923440625,0.99817553098662914,0.99203684234884149,0.99600284764047808,0.99156763125913328,0.99084988560537013,0.9988413381307425,0.99922265769507079,0.99308897710213273,0.99053592452061157,0.99997452286924304,0.9952697224810424,0.99747588815152854,0.99118841388474122,0.99753182728339262,0.9938010497922718,0.99465227316693772,0.998127512457052,0.9982569036917297,0.99244071509130583,0.99202091837892281,0.9988433421737517,0.9989516863519039,0.99712575528661929,0.99658989477871962,0.99378110628686889,0.9920611333431294,0.99248894719602754,0.99642453720241853,0.99252828460452869,0.99202285824625491,0.99767166876556024,0.99079950464680488,0.9904985689895307,0.99924745297105444,0.99685220040101741,0.99568785288638229,0.9962021609548819,0.99283185548980002,0.99746609958213472,0.99566866302729518,0.99977157917781079,0.99796043101208798,0.99383875120059217,0.99417765249090062,0.99260179581713115,0.99755343829479648,0.99877381788730646,0.99512978591569257,0.99806015372605039,0.99456678779642449,0.99461074968102414,0.99660871913956295,0.99090952591563719,0.99088225192106072,0.99564212397994722,0.99709326689606115,0.9918736415255377,0.99647537106442308,0.99531636420651359,0.99220029852689873,0.99354997814714674,0.99812635078789991,0.9931475202099338,0.99820077584156297,0.99726668794852635,0.9979137000119781,0.99515721284840841,0.99182731557531423,0.99790565831727063,0.99852519472375412,0.99204472134379695,0.99662788000947744,0.99678038269899805,0.99073060248681322,0.99052480298939394,0.99285694096714283,0.99801092248896339,0.99212666046222153,0.99678500781066059,0.99994281478144342,0.99945914345851905,0.99276831910412011,0.99091548987216549,0.99916467443775425,0.99908347531847796,0.99127012416982696,0.99509902043695908,0.99019978872565872,0.99614842071414733,0.99452152984065534,0.99316039590736427,0.99469098199323724,0.99077479733242624,0.99717370162030583,0.99850529002035404,0.99343825171106681,0.99144512455483336,0.99085488147672285,0.99370448741494866,0.99346265949083912,0.99622329196174164,0.99074822076118807,0.99997452141419707,0.99906325555222064,0.99517292401144675,0.99158350293819064,0.99990412164636,0.99855908915669467,0.99226511802801842,0.99877857942873838,0.99397965384199005,0.99853452230896522,0.99696499030112051,0.99902099525894761,0.9906463428889587,0.99869959339485637,0.99747586812311129,0.99899618831465897,0.9942035839296619,0.997302153961523,0.99811236288124106,0.99831085605954706,0.99379567323665108,0.99992822906040379,0.99319035908071551,0.99907318525874866,0.99985952457248584,0.99867935777907402,0.9971810909119625,0.99390193940423965,0.99413142037135571,0.99634597502460143,0.99098620374136537,0.99354809385791587,0.9973448566539671,0.99861416967406025,0.99637242563774531,0.9933131962504077,0.9907383448657533,0.99926678178354278,0.99120496119869594,0.99299889490837934,0.99981498042736505,0.99974072814004422,0.99496749739924883,0.99662844843425713,0.99022411409628153,0.99775056953141839,0.99053826166904835,0.99197388737626391,0.99140859710556573,0.99048846071044472,0.99893384966930376,0.99148116630508887,0.99465773491142784,0.99870342787642585,0.9956080065827414,0.99125762446326804,0.99494406897718457,0.99540924448399715,0.99067778709427123,0.99255910681375981,0.99897556781010766,0.994644061299362,0.99288536456213772,0.99137647311672872,0.99269019913690026,0.99201833739038459,0.99594134761379705,0.99217075011150069,0.99475831437510176,0.99411653835871627,0.99368274208766616,0.99727460875102758,0.99655545533443568,0.99018040771543214,0.99938106582266162,0.99875638576569703,0.99620363140109247,0.99829822648838629,0.99282811806096294,0.99483738236183095,0.99205160730826802,0.9946259481603491,0.99439090167020583,0.99718812690680914,0.99027247493881754,0.99570318690149651,0.99876096716777774,0.99881698191547252,0.99610031240473962,0.99165357285059075,0.99203572022667574,0.9972021733342542,0.99519864829821858,0.99972244510753194,0.99053818915653968,0.99545720098903723,0.99862101214546029,0.99114652462819919,0.99442890372129555,0.99530136074991449,0.99547954359058755,0.99020784541781637,0.99566804145026699,0.99934848619257077,0.99680326951569065,0.99863277803390638,0.99371341435033245,0.99979427427764189,0.9907822088781385,0.99611214248748725,0.99456305087277941,0.99299432781696717,0.99047839015313544,0.99156385770790623,0.99738183167072947,0.99149934824333297,0.990379977320475,0.99741283321379848,0.99954148901669004,0.9917239847849405,0.99742298099098115,0.99061756366442399,0.99937355826486574,0.99002790120088657,0.99513312643358853,0.99859017924804327,0.99240880707087298,0.99796429472727766,0.99259939284939736,0.99068257923823078,0.9975889826125488,0.99545984115255037,0.99993243429467915,0.99887959000275472,0.99356670083954235,0.99319379456771817,0.99752782555534336,0.99939737000424922,0.99110037495970915,0.99252251437166117,0.99596985528251414,0.99232060311335901,0.99430552142152817,0.9947468877195732,0.99730644947150859,0.99093559135831522,0.99261150051767333,0.99221792111286589,0.99094798197134493,0.99619031484101939,0.99450918386843701,0.99943518986495461,0.99640010499416987,0.99518797067709197,0.99132025615954467,0.99075041889103754,0.99452777142694548,0.99718351801250737,0.99652134379233492,0.99373293718214706,0.99826915637571056,0.99121501968959969,0.99308046102052272,0.99697355204556626,0.99402323344293519,0.99403966456739234,0.99884142895587813,0.99266177611461137,0.99700509457939557,0.99122942065006192,0.99241848107343655,0.9992076249606181,0.99759755830448349,0.99967900949328325,0.99290896647923133,0.99462780949710239,0.99277410977281766,0.99517384898768335,0.99006107194283444,0.99445257119694186,0.99374673671738611,0.99020842014934751,0.99436889091925162,0.9911855772411281,0.99304268039484178,0.99121796630675396,0.99290831240695177,0.99739600163507225,0.99242492052503051,0.99981392843376049,0.99936589936598896,0.99991936570005391,0.99860104218615708,0.99771500556705284,0.99397188534672021,0.99613297228818387,0.99479371159119534,0.99946713592145398,0.99564939592505386,0.99943974133499291,0.99489570430729557,0.99049679328398077,0.99269784652810911,0.99325417581069098,0.99989641173007826,0.99177970008882388,0.9918365732670994,0.99641593096383008,0.99861570556009183,0.99935129776981535,0.99032629304430186,0.99686856034695215,0.99331924822674289,0.99180281987118601,0.99748672122511406,0.9962075201314331,0.99644302027465537,0.99016545586524063,0.99169221039593269,0.99838371436390672,0.99952109881449214,0.99208955365088436,0.9954321591048727,0.99684304442509608,0.99251388333210466,0.99558160447035493,0.99578514449784139,0.99912172463659332,0.9991538505554034,0.99159410324864905,0.9989550696109033,0.99943698950077309,0.99482458367009108,0.99929621197936314,0.99442695696984973,0.99910128067684778,0.99311723774594374,0.99383478091084887,0.99055308240446238,0.99802409236410283,0.99753716395678438,0.99211986949945008,0.991319342788755,0.99948741625254622,0.99355886526083148,0.99168300380303498,0.9939583137834328,0.99371185872922096,0.99885432677699204,0.99249405025421711,0.99021237418680896,0.99959687572229627,0.99843996312723238,0.99380631608567038,0.99288041837187579,0.99317285847649306,0.9925031784655326,0.99914924598200616,0.99488330797651714,0.99014518652265593,0.9972896321289525,0.99031550454866979,0.99202595839753538,0.99083325768419495,0.99216254573333773,0.99914058139025275,0.9997623687878251,0.99341642006812736,0.99593176468081679,0.99229090603649284,0.99304373137107815,0.99646711104297292,0.99967606110446505,0.99361490336376079,0.99895880234867196,0.99026606673462758,0.99190006473492709,0.9975710084013284,0.99001799148087044,0.99162980254393329,0.99711692589751955,0.99184886594971289,0.99867640019669313,0.99132205597928091,0.99118296072618661,0.99862798313816381,0.99039019074002121,0.99276153458080019,0.9959813470659018,0.99105212474490278,0.99604253073298854,0.99725479527784788,0.99516380766166623,0.99795933583970231,0.99007506654968902,0.99720506420335775,0.99688864468916782,0.99804114649036924,0.99945925772735589,0.99427148800026532,0.99873449102963485,0.99511746967297421,0.99113265124879335,0.99093659375231158,0.99354533885518781,0.99393277502550281,0.99241912636887863,0.99726164001679163,0.99560277270776776,0.99769450833399898,0.99612665834303804,0.99259331213764956,0.99300779010047946,0.99710157505974539,0.99798061898850021,0.99501249134448677,0.99795562060671905,0.99441438148915118,0.99781014156394265,0.99288835098236639,0.99351063323060818,0.99902958873270842,0.99054291921543236,0.99476819182568976,0.99708633748042419,0.99514010378891715,0.99992829150632212,0.99458357887132609,0.99162460235618477,0.99695542699612882,0.99113554974932228,0.99953745302870955,0.99912784139623279,0.99609463299002354,0.99481608811743416,0.9958088687319222,0.99851720771549568,0.99575380711153005,0.99809832812442911,0.99528432942945722,0.99186740867883594,0.99714141959484826,0.99247175135759258,0.99134314974627524,0.99054183424699327,0.9917125020298222,0.9960890055937841,0.99124798016692373,0.99777154700415183,0.99779698791314819,0.995110129799336,0.99903008734321685,0.99027747311961933,0.99823243750990298,0.99990286245653259,0.9933651266280964,0.99500889828182215,0.99430659058001936,0.99331964287945251,0.99401595882752813,0.9917386575060908,0.99980759611312975,0.99625573833988346,0.99470675050371282,0.99575077319859995,0.99552869720038817,0.99750910288475525,0.99072204310536216,0.99153503444320312,0.99511249129011037,0.99356751518106501,0.99907367145131243,0.99143936405331357,0.99352784162434393,0.99850522593547186,0.99906333903461197,0.99337835948461106,0.99904044949174531,0.99275168976747619,0.99023267781958979,0.99006010376220777,0.99154832934986359,0.99801831777540961,0.99483799505260218,0.99497358537458624,0.99865901461560325,0.99537789055672288,0.99183569697786611,0.99870825436412725,0.99341384125168175,0.99722771286044853,0.99485774066243626,0.99668019123672735,0.99858075177450611,0.99178809905203502,0.99986161001193241,0.99550440305156052,0.9980574184397778,0.99959779096020107,0.99225298244846794,0.99595962070776312,0.99652697066475771,0.99808489852939819,0.99456049560247028,0.99984433897904812,0.99812180085206215,0.99885835854417504,0.99545859344245402,0.99213815618936596,0.99720098760678944,0.99034626601846054,0.9914984500143339,0.99451078678669191,0.99328847117282748,0.99013793183555898,0.99069515934713981,0.99473663379620247,0.99477749288483008,0.99951101970151224,0.99397788941130061,0.99248927386898778,0.99228243231883828,0.99386384159017027,0.99337777212793676,0.994313902314232,0.99567217008160847,0.99830803399433077,0.99208901949534822,0.99824564356330614,0.99533491667862473,0.99452953311749215,0.99530155086040517,0.99380522117635695,0.99377633429937062,0.99925775959735552,0.99246715867832347,0.99740769541842256,0.99479726061834761,0.99737559308765433,0.99212447636367174,0.99946821301169197,0.99994145251150102,0.99510048695803754,0.99516551749670157,0.99791800000583353,0.99047329072674062,0.99452128285998265,0.99144394558343829,0.9984911379053516,0.99147746274273862,0.99390391782447063,0.9987152476434793,0.99738302674540968,0.99782861365465636,0.99976340909217198,0.99699293370532549,0.99523246730390236,0.99658106018404735,0.99429872312998091,0.99027917681552446,0.99207137371943988,0.99181585958605822,0.9932336903809702,0.99385436211678102,0.99110859129020201,0.99811076777600127,0.99375172534842993,0.99003132702638375,0.99329870987758107,0.99537475965857436,0.99342070955771467,0.99948915702302354,0.99817037140979659,0.99728337895351205,0.99531632140022419,0.99887843202825544,0.99521069940361817,0.9936153168133367,0.99774232277765962,0.99908438441492453,0.99120250740678728,0.99856987815053455,0.99625387606491655,0.99367588297286791,0.99346614014945389,0.99988681925432432,0.99334585919294061,0.99712112208722903,0.99574559103712534,0.99608101687671968,0.99863851245168944,0.99316557649738924,0.99198543219084034,0.99411403899243866,0.99672383717612989,0.9953885495742133,0.99901741183450765,0.9965200519931805,0.99199137264313753,0.99431736014608496,0.99298254320848123,0.99888503002631801,0.99496470617402366,0.99580638103860564,0.99889815245066116,0.99114291910568464,0.99501364454410712,0.99038211222682959,0.99276967536996075,0.99659286350326071,0.99533904781264526,0.99587623854222618,0.99574192130866879,0.99414081203912086,0.99412763118944247,0.99907309065049343,0.99014762189019001,0.99278623088339057,0.99702694530322633,0.99234483526325856,0.99506696480967549,0.99343021459102399,0.99381227969298769,0.99494241546989026,0.99064925044569396,0.99086312966457502,0.99358544102655633,0.99626188167215513,0.99234227820033272,0.99553799197372983,0.99203483699745498,0.99617487630005641,0.99813698203845647,0.99745014137323762,0.99393395255349226,0.99268692378876866,0.99053569815270248,0.99710170484053662,0.99375014074280199,0.99718473051514656,0.99774916675066716,0.99706158554851498,0.9916528109279733,0.99117069362677401,0.99912127671290352,0.99798846485729631,0.99319173861797994,0.99798819079647139,0.99329746685622489,0.9981758347746259,0.99204215243330451,0.99616661393423611,0.99767138012401035,0.99804936995407956,0.99069966155979661,0.99073446429763878,0.9994993895118206,0.99025254923386541,0.99158193960417129,0.99877483138621381,0.99286417224778767,0.99383295914436265,0.99687060398583716,0.99622582522244285,0.99141135705545003,0.99636201394082624,0.99512035437035462,0.99766939752488726,0.99721254797755365,0.99326611302440171,0.99928752246790986,0.99766672169063031,0.99732030637280944,0.99409194283843227,0.9974977303196888,0.99688698936131992,0.99407278866871351,0.99698612751695259,0.99239467744506149,0.99256647630980654,0.99520798389433085,0.99393326782281133,0.99219055449820914,0.99530001868765106,0.99842303662363296,0.99555916574264547,0.99662866616035695,0.99869208422370559,0.99816153661025386,0.99488424861603297,0.99793798211768103,0.99795780043558191,0.99469058291020362,0.99613633653613409,0.99309494024383527,0.99485484952793224,0.99687510488313247,0.99421201958098493,0.999867535420218,0.99295120392711811,0.99769856884125063,0.99527512133728013,0.99829497888157981,0.99439727616156193,0.99706014149567479,0.99994054385971642,0.99595276886586681,0.99506507020009427,0.9975279883319218,0.99867391226824109,0.99496672527734098,0.99644512002477048,0.99865046143148417,0.99240084873516898,0.99068020889146435,0.9954707395914586,0.99968449084713729,0.99558955837573482,0.99098746436994223,0.99818325001266295,0.995469223854904,0.99812005358625944,0.99402929607719137,0.99635536296744875,0.99107029450965001,0.99462533187968838,0.99724093758965815,0.99096360175982234,0.99613620977718242,0.99456928185702231,0.99782889892748372,0.99895951399421179,0.99566563920656403,0.99213332771814589,0.99811238031618432,0.99164498139759782,0.99576718179196066,0.99526738587737473,0.99943934787425703,0.995630434624593,0.99871365001693579,0.99491620410123049,0.99507551452962095,0.9907812259771025,0.99788744282915787,0.9900174142000987,0.99472983335817133,0.99895851968561511,0.99828718814622286,0.99933566193392664,0.99322449344724995,0.99071500090619946,0.99976048925717664,0.99153272319458519,0.99278183214196514,0.99728562804256471,0.99072823524336884,0.99150320646892509,0.99751148480204743,0.99600048348405934,0.9983110550423262,0.9918753150938423,0.99922245863313719,0.99334722909430828,0.99326991590702807,0.99656863138129814,0.99803988852743664,0.99576818771531661,0.99538196504172849,0.99830761766259979,0.99463248550511008,0.99064052947498205,0.99820668170799876,0.9992505137429698,0.99951811313459094,0.99529381922319671,0.99076265256164131,0.99928508537992922,0.9970860019817368,0.99134618588251577,0.99234902947876158,0.9953886623018654,0.99398855667017161,0.99466292014595958,0.99268097615203632,0.99400667081724037,0.99832430058684196,0.9988310919249358,0.99995274271397938,0.99335336902759241,0.99649686003355242,0.99671027863375816,0.99703882438493918,0.99601869517275599,0.99932209972018282,0.99038497005591264,0.99687583784451428,0.99655235844013024,0.99568297079729895,0.99663710048700616,0.99380809449876983,0.99095644219315682,0.9963451602849781,0.99686596679380068,0.99363192298564829,0.9926777809292141,0.99407578677587161,0.99789181575690322,0.99368662858305612,0.99212549392041138,0.99468351921128106,0.99417568460520267,0.99503363501839504,0.99289292498117288,0.99910444726436465,0.99976159671247866,0.99206410373689935,0.99771387289871372,0.99338569811272992,0.99988081290590369,0.99574068210535327,0.99569807202600524,0.99486883747649635,0.99709673732046433,0.99262192764040802,0.99497785735938815,0.99579535502126393,0.99761143685454079,0.99878239866142582,0.99195930876981719,0.99060944127868533,0.99369504344933801,0.99440832378808286,0.99988375472722624,0.99084249572005467,0.99505283806834721,0.99563181291400993,0.99066572391781005,0.99539256647199015,0.99773018769166077,0.99767981096320524,0.99346829899306133,0.99233066963146066,0.99753367716369568,0.99587303003075978,0.99590595890448452,0.99458927966474209,0.99616210151297646,0.9986089542537262,0.99706402638236591,0.99660770010216837,0.9917721904567145,0.99353843776056638,0.9966154498657579,0.99347151578781356,0.9909603847718399,0.99253692732403054,0.99245096403259903,0.99952432889788856,0.99528018260189233,0.99298171173932104,0.99341485589832945,0.99158390231921778,0.99860707940716176,0.99361260933590334,0.99086988740573612,0.99741554926785503,0.99865347132567894,0.99705829421117387,0.99541273405447761,0.99700822089356722,0.99015737239790846,0.99006225166386919,0.99041378598019969,0.99374308167441794,0.99090028290934018,0.99901405467088544,0.99823331274917515,0.99318312992327384,0.99545024923320602,0.99597023218366243,0.99381451959546185,0.99297765398152427,0.99800700027859623,0.991250018786482,0.99223473771975068,0.99388316830506429,0.99503020636894457,0.99817605975965917,0.99209597037582375,0.99981077584727829,0.99792260031187185,0.9986190363932016,0.99251311006711262,0.99083812501794777,0.99353846424473169,0.99337678218680614,0.99061400636096997,0.99236105553641729,0.99224980569658172,0.99317773612128379,0.99114403102157567,0.99984349961539032,0.99315958436651408,0.99548196059427707,0.99998311486234914,0.99749176335761736,0.99731616732101047,0.99841767551710869,0.99147511188893256,0.99166873016259027,0.99298354830071489,0.99903007302556412,0.99281051504943862,0.99105113618199181,0.99594220360921271,0.99745018584177148,0.99552703539816756,0.99729299001893379,0.9936352452817121,0.99717397849111555,0.99904216063748597,0.99133418420677488,0.99707946716060769,0.99445744418558546,0.99682398369493963,0.99508736354426319,0.99209009434830742,0.99530437240878911,0.99559687982732659,0.9985963107443887,0.99312890132486698,0.99677657135848019,0.99725726877922771,0.99805757673947071,0.99230884571306943,0.99531189739454395,0.9995483591549168,0.99955800247114224,0.99663250984712948,0.99066670280990332,0.99014101628165485,0.99541463878652292,0.99315342453984101,0.9928163217748599,0.9937151261642303,0.99480852243462459,0.99541361094435399,0.99684795290522177,0.9972205313074558,0.99208237559465828,0.99781162023058112,0.99608100177683423,0.9914731474068782,0.99326143555669177,0.99784066940689087,0.99880759122084217,0.99216136462011495,0.99133381269977305,0.99932648529868007,0.99102397544121201,0.99888091087954833,0.99959020987485647,0.99624969916795303,0.99152886712478916,0.99003007059532355,0.99152522828521317,0.99678043341142542,0.99155537029186658,0.99953385192255073,0.9908956044335745,0.99759083927685832,0.99454379121804559,0.99178906569147696,0.99668828802064058,0.99157966957642463,0.99831218552460421,0.99033980285078071,0.99790156108698591,0.99662261325279222,0.997126396459043,0.99106824669420091,0.99472550242887392,0.99385137876728147,0.99708517293377308,0.99902184899147572,0.99957963675862593,0.99831315924837416,0.99505724982370414,0.99849467487075461,0.99305022614468519,0.99057228253035412,0.99789732199786418,0.99638826782709433,0.99236363327263666,0.9918155938946579,0.99234279401996128,0.99945776376760187,0.99464652926691088,0.99484183359200384,0.99619324862117575,0.99212371355173012,0.99615267873283564,0.99062083042894811,0.9912261163709597,0.99465302110947318,0.99123781152088919,0.99113170702171605,0.9928443054826751,0.99520844359574512,0.99735659228909668,0.99747189600350217,0.99411266971499468,0.99090364292485267,0.99828898999371118,0.99193020966098477,0.9993502060476348,0.99076916640915536,0.9939902675132628,0.99179044143398132,0.99052206153139821,0.99816788497829601,0.99571128979893098,0.99907532609936289,0.99747595209672624,0.99429777535957564,0.99320211534723335,0.99775306186225754,0.99492885026224376,0.99301353434738937,0.99221630590471044,0.99110692693874081,0.99939179811161261,0.99709313982049141,0.99482257061278101,0.99139999796294564,0.99539942083286215,0.99909020831221662,0.99221034993580259,0.99680423024880982,0.99095935408010893,0.99157375034684636,0.99060159397113978,0.99501314869702207,0.99819426926229471,0.99270560418386822,0.99771401161930751,0.99261594257058017,0.99195676163845348,0.99396728493126252,0.99895028641838668,0.99995578220963011,0.99684231710463667,0.99896182861620841,0.99656780795563216,0.99357813886771051,0.99990282159418475,0.9971755158834108,0.99033688421008714,0.99924855750695218,0.99424210850290395,0.99052894094699828,0.99489934673676106,0.99321118620645554,0.99583446118687002,0.99303930774953009,0.99083261425353986,0.99331461662208309,0.99660088614967002,0.99564242371942402,0.99052299989405812,0.99894251086672581,0.99556774855150121,0.99172205686062598,0.99711954046619145,0.99217504429681247,0.99487861836091918,0.99589407225420445,0.9961753888510696,0.99504782509729384,0.99213756194625002,0.99381871797588861,0.99645594095978018,0.99685326506632654,0.99380604229955816,0.99516885142847733,0.991037024668593,0.99774233851078109,0.99377473770183555,0.99342131040790349,0.9926283451964697,0.99364020340800752,0.99241261485409438,0.99729300931866394,0.99622861753720648,0.99757749047995004,0.99522875474587569,0.9914489626006836,0.99413196425358341,0.99458242457285495,0.99217770257041016,0.9918475850785361,0.99858467761201197,0.99856053993068328,0.99860922153054454,0.99547070669345039,0.99283910620985949,0.99022795051946444,0.99615331316083011,0.99012860466474506,0.99779411551730868,0.99937256218693304,0.99954751823377774,0.99725551117212208,0.99919511284542684,0.99369876289613446,0.99384777221575848,0.99429632179888294,0.99162626751548744,0.99137103178944419,0.99796671743241949,0.99343036738715085,0.9911380579622795,0.99257835359424651,0.9915880841516973,0.99519356258184921,0.99355792536397114,0.99321888458247642,0.99847673791802416,0.99405695442042363,0.99582722923573985,0.99180964421620499,0.99586119044714372,0.99432821001439353,0.99925745404933508,0.99372898782644159,0.99575020761407007,0.99513830248852608,0.99009976399769173,0.99282889329550528,0.99809296351648213,0.99397241267867265,0.99608747476432846,0.99811651086585851,0.99479865683393132,0.99816133444965416,0.99268413318746718,0.99149772411167136,0.99258070579600732,0.99264918724981765,0.99480961438495641,0.99058720008103707,0.99227318749431592,0.99459512566709307,0.99048597442328468,0.99045600595123784,0.9916922489069262,0.99830376376024021,0.99258420465782959,0.99236254718905037,0.99197890269401556,0.99273509848552333,0.9960563249462514,0.99939909219437117,0.99823621272337459,0.99828127794258592,0.99810533896909648,0.99572530273470905,0.9980215679244725,0.99608976350280265,0.9970804256448077,0.9954766757344915,0.99859291923004034,0.99098057648015414,0.9978100641019495,0.99382082431445196,0.99203776470832339,0.99321096795421115,0.9999324392185549,0.991298510729827,0.99093615169303906,0.99462693899313193,0.99650553478501902,0.99757887537178369,0.99215155010666878,0.99454359778539392,0.99243848710158422,0.99689785107719497,0.99339653834514174,0.99426390625607597,0.99197842553437732,0.99799319431321787,0.99506782696284579,0.99286608305610502,0.9995066290990321,0.99321984377208283,0.99394567759123076,0.99293059931632521,0.99584406389916358,0.99963282708975021,0.99606476597076843,0.99099083751578976,0.99714571399899898,0.99951850382259111,0.99401496202323658,0.99114994538315193,0.99858605156655589,0.99018511354839078,0.99920392933699886,0.99963725304402806,0.99750763799565634,0.99841726190922386,0.99285563141409916,0.99806823638088482,0.99796736101439942,0.99684795933070502,0.99142751553920727,0.99355985823311399,0.99504499735390606,0.99245384573840489,0.99610626880201303,0.99364838521316878,0.99703726356291111,0.99792620393235021,0.99383301598893592,0.99593101560916564,0.99728610569342646,0.99290043590536314,0.99887195949473551,0.99842465763567601,0.99055842737743649,0.99793236202460855,0.9913820251834905,0.99471788656676585,0.99862978673403546,0.99560832776843222,0.99421704310053982,0.99679708841275283,0.99411273044745085,0.99000670431652804,0.99959045429232019,0.99561941907659823,0.99750170265813687,0.9966546943515292,0.99980899010540314,0.99850406357488197,0.99233492448862504,0.9988308897713204,0.99096217136811815,0.99262149135475819,0.99384543745825327,0.99008403251057076,0.99500222523830695,0.99168253528287797,0.99570198846042179,0.99098710408658319,0.99976533936318468,0.99007751297091673,0.99492805893838476,0.99628815178276808,0.99400842775851694,0.99521209054167337,0.99994890764107924,0.99323613140572331,0.99260971904082895,0.99692554230912311,0.99665258179235316,0.9905779571143174,0.9996416018948362,0.99231217590130283,0.99671083923853865,0.99247530261969563,0.99299144938676076,0.99505302694728692,0.9953107341376457,0.9970961264944801,0.99001463029666503,0.990473039068968,0.99883700437516365,0.99029794421306272,0.99404343414692575,0.99567668088020078,0.99301175468877045,0.99482697476697757,0.99950486534348404,0.99477418799577255,0.99460602123315844,0.99899353304194816,0.99287618746826078,0.99396836236605535,0.99084618178925987,0.99157983270687022,0.9958212311729332,0.99090315507004434,0.99153053388115042,0.9979865143157467,0.99073086996850213,0.99703735022777917,0.99580506721587503,0.99303032818571435,0.99286986047891856,0.99969125647581181,0.99361883892097391,0.99445847989897129,0.99724752207325351,0.99602776782925095,0.99858225848744742,0.9935388204981952,0.99347880899288832,0.99000012140903859,0.99961649431476252,0.99060816450258993,0.99953473696534079,0.99592340187258876,0.99206016768613459,0.99601190429146702,0.99768168036673355,0.99532106456151515,0.99615470326289257,0.99423723491128924,0.9991883059772565,0.99473911151837979,0.9960247700596635,0.99234857403073784,0.99702068014286294,0.99744914456894596,0.99743600584575953,0.9985790862473678,0.99385063762039294,0.99637520216816988,0.99251478642677748,0.99166434810879645,0.99036756061439635,0.99439130119790153,0.99472075658098602,0.99518259299933975,0.99645007825350107,0.99318236488103773,0.99278942045597829,0.99580999957970784,0.99517809124298529,0.99742992439135625,0.99245642074845009,0.99078259574344196,0.99297478424434482,0.99232667106959149,0.99650409041556087,0.99917691328832181,0.99891304170826567,0.9922140661163118,0.99861020357252139,0.99527786647363214,0.99209894081149896,0.99675911868929323,0.99399054004919951,0.99074151027526491,0.99887794236220584,0.99131102108965063,0.99256502354764309,0.99925996417364082,0.99966704918741034,0.99764874596616204,0.99619095435818283,0.99191360706692233,0.9916532923200494,0.99118189915255916,0.9982611641106619,0.99524876236875381,0.99655627530524038,0.99309463028411538,0.99546397940814824,0.99292062407966164,0.99251304154026598,0.9940165935442038,0.99040152368593104,0.99699629119953415,0.99233352071611447,0.99646640833025146,0.99361076822312544,0.99854778831957602,0.99633391687677919,0.99589461301914162,0.99985999487594723,0.99060040589464871,0.9920713593319449,0.99385637669432325,0.99757008236349021,0.99540846141315897,0.99886239482316463,0.99137119762278325,0.99472182634244832,0.99835357259704494,0.99158897638125065,0.99417908099220897,0.99810839697060427,0.99437700571081411,0.99476460097469499,0.99943960184846281,0.99116275906768581,0.99372772323082736,0.99875633044834011,0.99010721048080452,0.99635122857179703,0.99707999547267911,0.99097271618428595,0.99651788349039572,0.99908348613005171,0.99841954518138121,0.99035012518459442,0.99850626314348101,0.99039745717224947,0.99632451495152174,0.99988469035439964,0.9933410678614788,0.9968611298414084,0.99140740698735419,0.99376651519263537,0.99611391656571369,0.99504273819127886,0.99385922095772128,0.9976341933130799,0.99411689282887539,0.9904886990981977,0.99180189804250485,0.99725855063517976,0.9976031607763669,0.9970125792405875,0.99607615939071814,0.99458844938755542,0.99040593879138583,0.99582236578521388,0.99284139262258819,0.99339055891390815,0.99716350683000476,0.99170608349364153,0.99361352015512439,0.99399153480944247,0.99704049042192566,0.99919685221207577,0.99317928988226456,0.9922602283726959,0.99020949072563558,0.99360970594409181,0.9955013018037574,0.99324529549498108,0.99947100203223149,0.9908357375947614,0.99397915957333893,0.99512614267838562,0.99144418635281062,0.99832781535639126,0.99513224242446319,0.9990452303631725,0.99491737823023252,0.99723523556934734,0.99334899019352441,0.99382957528937654,0.99371063727048248,0.99297987258445308,0.99159722692045704,0.99691642469752673,0.99176788767382684,0.99880368883634985,0.99320846928402762,0.99924455855862282,0.99274909425408675,0.99081244645686961,0.99903832025192185,0.99482624750704807,0.99382830402150324,0.99128252228623792,0.99361941987311764,0.99252885870049568,0.99179156154934756,0.99883873134714873,0.99833805667789954,0.99196257287800937,0.99350321993884072,0.99121341513470906,0.99823209729686657,0.99543640620955198,0.99747211697726457,0.99314589287949906,0.99007938466992551,0.99382002707262984,0.9962340784272935,0.99791460105561813,0.99482721080570435,0.99839095563897162,0.99128103379280075,0.99680168366221522,0.99221999932364391,0.99416880315952239,0.99573125565384046,0.9964282552314182,0.99317792366390933,0.99214060043384478,0.99032654158478395,0.99617209080654845,0.99113146074179348,0.99675123628138185,0.99561073067796413,0.99600963383768293,0.99578773824422295,0.99346274873754081,0.9981211812841615,0.99364364925726567,0.99728084068279643,0.99171463925726622,0.99527270652197974,0.99795282032761556,0.99584537585245114,0.9949261764417705,0.99629633154620878,0.99354587389306392,0.99834237032125051,0.9977498369658091,0.99321435322932228,0.99236781128474738,0.99183648967296045,0.99844748966581232,0.99065083127518649,0.99816445313472857,0.99873979355251485,0.9984614373922488,0.99393708028546068,0.99370149831743537,0.9905840269376649,0.9938319120932585,0.9902842770683854,0.99861248614160059,0.99931986040438314,0.99463862801324365,0.99866977882709962,0.99570491162921859,0.9979008608373664,0.99695237278705295,0.99126871255170834,0.99960821180644932,0.99201549560172875,0.99546258343002803,0.99852088033541964,0.99636512916638331,0.993839932220692,0.99570835396308566,0.99836765015781836,0.99927019435764497,0.99977791505806612,0.99863679193079635,0.99305504847211901,0.99169822265067598,0.99376471756361628,0.99178681156214488,0.99690546722099993,0.99243480016633567,0.9998036400618846,0.99751704173913924,0.99993533875274843,0.99199114460367177,0.99394866884454014,0.99982842220287693,0.99213201006806218,0.99709567736019189,0.99347574028922614,0.99175418598984943,0.99860599688785612,0.99858211556700871,0.99950832049339633,0.99909320545089619,0.99071192474338943,0.99961566909647981,0.99724949509700989,0.99570542641052628,0.99879801939975721,0.99562822945464891,0.99435981922657901,0.99176643535166931,0.9951974684118905,0.99513627693411688,0.99404747449305997,0.99548417070439343,0.99427862795989497,0.99165260914452158,0.99838046257820812,0.99493843648479197,0.99506790846870274,0.99535063752644926,0.9985414488051978,0.99198787281982093,0.9930277704383349,0.99623106596988975,0.99573654937194611,0.99026312762318269,0.99347678755218516,0.99318759079167152,0.99525951377584532,0.99532946236068942,0.99533588444019805,0.99326741061114709,0.99615642425638462,0.99602130220778173,0.99762004165205176,0.99361896535632344,0.99367986027709698,0.99134907144593953,0.99302812685243547,0.99913722123272786,0.99261819907221915,0.99640494777605848,0.99791515970714484,0.99658708264273732,0.99644037204902336,0.99675262797351849,0.99717825556508632,0.99744483255524652,0.99765547385210729,0.99842093355601302,0.99445662923177935,0.99516605502096023,0.99204806350764096,0.99151853519698419,0.99063464111798794,0.99380626210462764,0.99025696341740321,0.99820937300532053,0.99705271553918695,0.99171347242444685,0.9965545524143683,0.99329942286641937,0.99568005388403591,0.99966375339879254,0.99258580527129159,0.9980621196910876,0.99407318185939286,0.99222165716581134,0.9915122016541148,0.99999673149015733,0.9904355105410656,0.9906373232496839,0.99159328849738537,0.9942544056717153,0.99411882025498222,0.99404297718798229,0.99117184473578424,0.99400252853640325,0.99409384382460708,0.99111911448787826,0.99976704482376966,0.9942426833764475,0.99949783405367421,0.99613484527927354,0.99395162215024979,0.99987962480147574,0.99898777819531925,0.99219878787718507,0.99921175462562428,0.9935404566636693,0.99804831324146992,0.99266215254781698,0.99123068567869788,0.99291468883759315,0.99835189007264113,0.99188370707981688,0.99240520852093883,0.99022857332571546,0.99745890894034273,0.99449359244055224,0.99254798605779071,0.99243615828532283,0.99206896940607947,0.99868639675385484,0.99088268393469559,0.99528557907883886,0.99202464683536418,0.99914043753392856,0.99352870680866623,0.99973832781933014,0.99595424721821535,0.99585367421028947,0.99083871419284753,0.99118963481267885,0.99550336794580196,0.9992643993913235,0.99004322591301863,0.995935014178019,0.99312314713242666,0.99883526940624578,0.99652964300224811,0.99424433483969321,0.99061263425026036,0.99607196661163655,0.99644510626119931,0.99070756508799174,0.99265217516234139,0.99924679949476169,0.99630382153868924,0.99642015210816048,0.99430062601353575,0.99104489218614555,0.99001966848075551,0.99700155048310313,0.99479183495434231,0.99395764743289305,0.99747828897510649,0.99084896257773114,0.99745630326025581,0.99214457420638624,0.99306687182440589,0.99248774015039276,0.9975643280593024,0.99226630472628985,0.99154126487802063,0.99702934096546514,0.99136462548263415,0.99754077170028121,0.99553207871333227,0.99547231904738764,0.99561891352610243,0.99553428076598582,0.99109234342937103,0.99630509732768147,0.99440955478493886,0.99985358398050417,0.99939804061516369,0.99634214777635666,0.99324217373452151,0.99600395566848621,0.99078727191208671,0.99909096038708278,0.99706450581420392,0.9957077955303979,0.9905883502541617,0.9933538637758268,0.99755644180541347,0.9995704344377434,0.992083003767119,0.99439879124858388,0.9996701157492448,0.99601482442911204,0.99196881883642174,0.99720190333126157,0.99733836771218454,0.99678710460179409,0.99834668050042796,0.99212737733894285,0.99947486218314052,0.99081615205628426,0.99950226036414735,0.99274451957781074,0.99509139455482221,0.99867431630308734,0.99829671828314981,0.99559301130466482,0.99726756718742893,0.9946458130839555,0.99792911834991838,0.99430257872252192,0.99259073302786682,0.99773908519088195,0.99689060744844771,0.99653855030964333,0.99237087007314406,0.99657663499337756,0.99482127982401058,0.9916100479919685,0.99973770898710068,0.99432333590129041,0.99352193616066498,0.9950503557086473,0.99686545831226014,0.99375294742177989,0.99991377424228678,0.99480324197024195,0.99047978111425694,0.99342387160548795,0.99697904405035709,0.99777068722328843,0.99518836778824726,0.9938390546673147,0.99889415601199516,0.99711485264786637,0.9997446354111631,0.99480885316308909,0.99259420148039168,0.99729107304354936,0.99715621133876176,0.99937465482478327,0.99918985594114917,0.99517202676722294,0.99708311495395463,0.99902978441660728,0.99668407589526731,0.99218170820031082,0.99693058911872634,0.99873132012121335,0.99883578072337986,0.99082684663277099,0.99445373268217618,0.99465356879344513,0.99175538463113855,0.9902192762848302,0.99992630218139422,0.9980819972212126,0.99012360403713795,0.99179191579601167,0.9903221009659704,0.99165375709666403,0.99601492248757229,0.99181585301623443,0.99759344468921674,0.99691367421824573,0.99583700047029766,0.99213742138880612,0.99879972520489713,0.99298075043116762,0.99984419999771001,0.9976825830772742,0.99780826905709219,0.99501099979661711,0.99090364643325957,0.99909373864260986,0.99025364060450694,0.99057847121815568,0.9921064620863046,0.99436708256014128,0.99508329604580648,0.99572197514227778,0.9978770114786415,0.99565010657185016,0.99352670636951501,0.99823734181812074,0.99941786936749044,0.99126086218507403,0.99128163252444257,0.99300086769001605,0.99015261141754218,0.99002121816993549,0.99351837912726748,0.99951012245728843,0.99660049249803206,0.99766222731426912,0.99514215683787566,0.99751229031551514,0.99685768394093255,0.99138850944817325,0.99940052267221402,0.99349284611502309,0.99359456369472854,0.99151325430190795,0.99184199624683589,0.99496671000983428,0.998863089657685,0.99808571390458567,0.9912794279435011,0.99632805503188726,0.99577714239668169,0.99688332651697698,0.9997203412669915,0.99639506260790656,0.99536943901629749,0.99729248795822023,0.99077441888310902,0.99859759727744057,0.99369732531301092,0.99626892682564328,0.9958234378747497,0.99180573308281206,0.99768222027726772,0.99573249219383975,0.99096275801240186,0.99163549797579575,0.99887471609452205,0.99905961133945076,0.9939936182164808,0.99077335046494519,0.99897696713832573,0.99338500799023055,0.99591231515771195,0.99580559490402276,0.99048570623618948,0.99475187633199247,0.99104325143902261,0.99805239948557523,0.99972948948344353,0.99530725062714076,0.99153686756603232,0.99227287598642711,0.99263927964834842,0.99709414028451471,0.99420965955456875,0.99148617686192997,0.99597934282733447,0.99658050369297291,0.99603778489674111,0.99633919152563388,0.99169442493870108,0.99229283323677653,0.99087923749876272,0.99182209797823129,0.99187832590762615,0.99166335874269995,0.99635425237855968,0.99149592129803243,0.99929662318700407,0.99202727126575585,0.9908291548246283,0.99954863405152017,0.9913480615532182,0.99015906748226934,0.99091254172313892,0.99957418597936254,0.99607311902669604,0.99025689715111609,0.99169502685049149,0.99971013549982335,0.99837195768764797,0.99297565916234276,0.9959708496935461,0.99525020569523492,0.99726722581268379,0.9986225297933633,0.99729993462757904,0.99896315264754176,0.99511068651856149,0.99188991652239467,0.99315272597341864,0.9966065348151899,0.99845756210886127,0.99941136815676002,0.99004687895617172,0.9997560955257655,0.99600862605186802,0.99107924461169428,0.99431103569899915,0.99178881335623492,0.99926009451316966,0.99746476771450554,0.99384780970007158,0.99049463572779806,0.9970168497005012,0.99071277748648634,0.9989780392162213,0.99489076605809268,0.99943588812639939,0.99849808827365094,0.99727949364543955,0.99996941742244994,0.99319112734267745,0.99004392175093869,0.99480715731279201,0.99542553204081108,0.99021849047384947,0.99861262041091781,0.99255548937849258,0.99909048110191334,0.99300478124227742,0.99845266022416812,0.99832340395024532,0.99878784992492853,0.99776911043533167,0.99746107620226432,0.99612317198762712,0.99117477629961448,0.99674358059059054,0.99508971349710484,0.99813945326065223,0.99168814876189337,0.99772783820443389,0.99831028393313026,0.99673538534546036,0.99927918053086173,0.99750731924978664,0.99169467478057627,0.99970725277432126,0.99883648949374881,0.99245252359513914,0.99387824106764955,0.99492573925515615,0.99382531204649105,0.99753591268706343,0.99271425776616151,0.99713738644013339,0.99867796356330552,0.99600773794766118,0.99741428313105596,0.99113251599470109,0.9944782794363024,0.99270862757623379,0.99709567898984341,0.99198534273461203,0.9994423684869026,0.99270406943160849,0.99174100459772996,0.99381516020681981,0.99244571825651307,0.99510883510172998,0.99640865030707204,0.99885273039829592,0.99808531643490705,0.9991093614273181,0.99853285667473546,0.99627149821320593,0.99398077839932075,0.99046406299027845,0.99115482259957721,0.99608123224215273,0.99080272919637036,0.99948554016744673,0.99360431569474217,0.99984546882809022,0.99828822660207928,0.99599239078591528,0.99214588247898938,0.99183179841374258,0.99790961222435992,0.99031134809452059,0.99654622848496954,0.99076895889398642,0.9902614383124444,0.99854039228116209,0.99785697707826082,0.99809396901845671,0.99922470788282691,0.99873214362836182,0.99492263898514399,0.99904035366823574,0.99833928250643211,0.99475529547591834,0.99131340550030977,0.99211190169314267,0.99759707496148187,0.99274043855557448,0.99925643605724557,0.99897204307174725,0.99832624302902351,0.99724585297252211,0.99259375223901214,0.99450144874377433,0.9921300046445054,0.99629821278799136,0.99522262553104246,0.99298389371001161,0.9939731737026537,0.99277376424478925,0.99479061873144148,0.99476869256871359,0.99993804251923246,0.99355127948907485,0.99604418010096807,0.99228073857079169,0.9994481415507076,0.99677534842141502,0.99490393165190472,0.99831092257726606,0.99437902764274089,0.99238026309817606,0.99772578309513016,0.994525269185497,0.9974399216050347,0.99143527445911028,0.99442859773559722,0.99663218597251357,0.99052994751057444,0.99631715573159185,0.99087813065108798,0.9939153933672169,0.99797906163530192,0.99215372568214122,0.99655516815491596,0.99615638537988349,0.9903233231766766,0.99517149131029359,0.99557011126451422,0.99223950118184345,0.99719729578258631,0.99308466264861217,0.9911039701059996,0.99483867350214039,0.99216625706912576,0.99621437941618074,0.9981093911558131,0.99702041064971847,0.99138648013858122,0.99878827309653972,0.9988181101278788,0.99047406786564718,0.99923463706088222,0.99280672596297648,0.99012754287926297,0.99663161860700744,0.99377121543821734,0.99037604073658148,0.99167794909660612,0.99626353305391824,0.99540168776892701,0.99258657286975249,0.9910165226839408,0.99038957245954518,0.99039263819491352,0.99636939265371649,0.99933135790551963,0.99085694735103891,0.99971494728806798,0.99061271260856187,0.99360891927637995,0.99822243615923778,0.9964414097994736,0.99658829447256325,0.9906794050681782,0.99510692609068541,0.99207891204272836,0.99782772011439758,0.9903959988715989,0.99334265940942212,0.9946931237278317,0.99636482254279291,0.9915008171483588,0.99096015164320517,0.9999120778867977,0.99711945897895915],"expected":[1.0049444654104156,1.0114504084446467,1.0023203415117263,1.0044598093013379,1.0126323723036337,1.0116446073623888,1.0142184554869855,1.0064657223107452,1.0128810411017253,1.0042588735636366,1.0110866225891804,1.0005936993093894,1.0119970872179562,1.008544090711762,1.0016340818246223,1.0150282596720672,1.0152959024613926,1.0030131717865696,1.0074197307889068,1.011160662722504,1.0137549934874051,1.0120854869261573,1.0033160881904255,1.0081226569851482,1.0136898573953452,1.0110208239212477,1.0088197543928288,1.0072969328451045,1.0000260920878312,1.0132593955506402,1.0110079187417413,1.0109681809885545,1.0153537446420637,1.0130221248440312,1.013042285032359,1.011839246896447,1.0103847750876733,1.0111367474805595,1.0113244911392627,1.0149505204652587,1.0128168295449278,1.013462207706769,1.0014600268315028,1.0109512706111248,1.0059688735678967,1.0091944478088724,1.000916287696805,1.0050370082325837,1.0097886370822478,1.0035239281530577,1.0013739746441177,1.0116455942917995,1.0159145524302127,1.0041975621798946,1.007141280538959,1.0009960221533403,1.0039787374097844,1.0152335990024182,1.0127689398661557,1.0148928684024419,1.0015339869242805,1.0144443694981973,1.0046321656597965,1.0077393613957331,1.0035304418460753,1.0084627643696045,1.0077207136553026,1.0011051026218205,1.0041269608446233,1.0130561855175273,1.0113916453622074,1.0052956723872433,1.0129037654768664,1.0051944370184129,1.0116327246172543,1.0148472584278172,1.0075476315945697,1.012516374802612,1.0034685444439497,1.0097137779286891,1.0119485721753614,1.0059442609023408,1.0103150848966505,1.0021891553001729,1.0028854171387598,1.015973043146843,1.0070710075971532,1.0049964420060635,1.0002472566226113,1.0007219798740929,1.0131827649519003,1.0129022400964924,1.0035168868605913,1.0009079522303765,1.0060884706989985,1.0014167903929405,1.0125421362358418,1.0124481844327187,1.0092205535520002,1.0037652619650663,1.0103665145737355,1.0127778239142884,1.0073130705031315,1.0027507146812074,1.0039884141636564,1.0033149493841287,1.014557822141692,1.004577658220795,1.0036195989689209,1.0005404297052651,1.0032677348438306,1.0122339380935135,1.0110210734671403,1.0059353237598094,1.0099065767198518,1.0138724854591068,1.0077398307127836,1.0045538084906023,1.0056792764332982,1.0147609944331073,1.0049849321967683,1.0023340772567042,1.0047238355180172,1.0042839382189888,1.0105132741153573,1.0081519615868706,1.0099180072125493,1.0137754714575,1.0010400009693377,1.0144250882233263,1.0077284001087135,1.0142946832263466,1.003111186530302,1.0081053589544329,1.0121510723747134,1.0088990992725972,1.0069504778307967,1.0055854076688207,1.0074873970082043,1.0080688367167101,1.0008869326888401,1.0091528961814662,1.0148218582570629,1.0081230276981319,1.0088456767367726,1.0146608239995281,1.0085233782190992,1.0114092992304358,1.0147632113402452,1.0010905389611569,1.0020826025436949,1.0088263648571976,1.0024695240540169,1.000145268167133,1.0097734492189814,1.0057896135496369,1.004315202383067,1.0155597268341594,1.0139562582641564,1.0150822375640607,1.0069903723325462,1.0083146870810547,1.0123757956815642,1.0144714947753244,1.0096737288371003,1.0136766258698138,1.0032150581963835,1.0028629693471136,1.0132882439241542,1.0101376282546926,1.0117558809220728,1.0094836123276667,1.009106959069807,1.0033587086667699,1.0112642820417153,1.0157304904898028,1.0040240256543487,1.00257870557464,1.0003389690158744,1.0045144423074115,1.0138087552030739,1.0097763510954221,1.0127136458776074,1.0116132603768972,1.005655982765568,1.011013063575543,1.0107141386580887,1.0089195053290447,1.0006606900012978,1.0043536074902468,1.0006921305217591,1.0072049825780354,1.0066087384426408,1.0055048520409606,1.0029214385663283,1.0145350660769239,1.0103250075118539,1.0072795134720065,1.0067972555373728,1.0010098088952268,1.0003933658224626,1.0120325500142069,1.007938581732988,1.0118265573331553,1.0015112897245151,1.0035828504087925,1.0053557634867287,1.0090105087378507,1.0090956902649442,1.0002509256951817,1.0066836181873462,1.0106324458605711,1.0024081881680535,1.0099263382888684,1.0132526269827948,1.0150623850790497,1.0104212868171223,1.0157482949139593,1.0002221852708346,1.0025776765148402,1.010318083740579,1.0025094299842712,1.006364474981309,1.0007947657479637,1.0021465999848855,1.0130832682542559,1.0001383999204823,1.0082889972842022,1.0064564063823309,1.0072796758307623,1.0145113259802918,1.0005352584293461,1.0155032391775696,1.0137637094878615,1.007017786704103,1.0039697404242747,1.0078192883029333,1.0056605687716125,1.0009195120885972,1.0042251325584437,1.0049235596790298,1.0010944442367291,1.0063052573787843,1.0089235516475974,1.0084969386682434,1.0068376697695065,1.0123862018182745,1.0004928621321685,1.0009188828234985,1.0049312502483523,1.0082370263861755,1.0077515021591315,1.0155827988761776,1.007924398528234,1.0057535774395068,1.012490445191857,1.0085520995095592,1.0017626169567284,1.0151904128642635,1.0151242526380473,1.0023627276707374,1.0151556800855683,1.0113748018295938,1.0045042785638818,1.0128154317426059,1.0022273575033389,1.0144351536922986,1.003336368038499,1.0116538631942553,1.0134689519253246,1.0128334061459889,1.0121155839778211,1.0064752076389629,1.0096640548312108,1.0150928141401983,1.0071812194228422,1.0121641587190391,1.0156566870713484,1.0120726194347469,1.0002810428770785,1.0025508052139425,1.00274066439374,1.0096935770263535,1.0128673332558356,1.0047573370562402,1.0027129081823829,1.0072521738982185,1.0026908465448174,1.0042885320687291,1.0082685602165598,1.0144354025491811,1.0092625172156586,1.0005500105436644,1.0108086965587337,1.003131655630302,1.0044960185884142,1.0153050167952102,1.0031334560334488,1.0093651528446568,1.0017669057375496,1.0114407667845069,1.0060326541694389,1.0068248228529322,1.0152944182122958,1.0128069593418625,1.0085088136982068,1.0076203092716043,1.0070644095694332,1.0072543861781655,1.0009986629537944,1.0073061167881598,1.011560540998194,1.0096322116343317,1.012141913081684,1.0155126452953396,1.0101938690285694,1.0086424501421891,1.0044906329523349,1.0102384834072058,1.0011697681839107,1.0145167176103251,1.0080244564971526,1.0094603699169724,1.0149138484576141,1.0095954112447612,1.0041239690502382,1.0080679292854189,1.0060074826827397,1.003902859732654,1.0080824137093742,1.0056788585566918,1.0097885396581212,1.0026970736959202,1.0070304847491458,1.0152839023170734,1.0143730712464589,1.0129572318329767,1.0088397806092548,1.0094638826668447,1.0119480239314176,1.0009932994751416,1.0090946789017079,1.0041710512832445,1.0034539584753048,1.009580534812784,1.0108446268149911,1.011327976332925,1.0067011371728487,1.0151895270150852,1.0072510106410379,1.0050113016318334,1.0100931537668694,1.0087497036615847,1.0075939082460519,1.0132358986096046,1.0053443943670197,1.0099494243966853,1.0031957257554309,1.0136740691332626,1.0012893579468509,1.0048289606455227,1.0141517270656994,1.0108185782124568,1.0150360070167337,1.0013435734590768,1.0062314890272905,1.015760802592093,1.0099817315533242,1.003483893467134,1.0094394605908374,1.0068824940680707,1.0153984417666897,1.0082595139692241,1.0127783252781286,1.0064992095105998,1.0027874578506959,1.0052508633020512,1.0017059971147007,1.0147036995257859,1.0107738398229422,1.0025974925869443,1.007070121864821,1.0157989419291706,1.0113829709716213,1.0118933701960184,1.0017882414963681,1.0135169441033609,1.0128645183808784,1.0016579432662562,1.0141163738007659,1.0150651334367284,1.0114506377113681,1.0076013901961001,1.0046576022120473,1.0067137380274036,1.0091604915775179,1.006486938787291,1.0155459034346328,1.0028381395013359,1.0146133915523872,1.0152325082125861,1.0107524143477085,1.0037009661808654,1.0084100398645039,1.0084107916697003,1.0053821571662409,1.0057858784177023,1.00598388674848,1.0130600096020936,1.0073826417813692,1.008189531981625,1.0152644308450494,1.0056513013844459,1.0039559067701644,1.0010380884209495,1.012439078316133,1.0096904067320798,1.0146128086751665,1.0148288001319179,1.0035063069254222,1.0152135340449138,1.0114332429946535,1.0068368717987903,1.0141744642388759,1.0040642929144585,1.0105507583691795,1.0058377739156259,1.0116742336113023,1.0111552086565059,1.0052437245004762,1.0012402613591469,1.0021924572534422,1.0085448321603943,1.0067010788730291,1.0010936741688041,1.0135315512613217,1.0149908861515284,1.015601548262081,1.0131357960994172,1.0057952242380148,1.0044305853573066,1.0113854786956464,1.0018973439811649,1.0113398645806064,1.004300896478995,1.0005027362908578,1.0118756554960937,1.0110057453572305,1.0139091720161508,1.0030044973177799,1.0031441256948637,1.0030651452430117,1.004261049972641,1.0156287564925039,1.0122299803510271,1.0023714399264829,1.0128422098611838,1.0130304317253591,1.0115078304633587,1.0034145254708426,1.0034748471569024,1.0069550448902929,1.0036064451736213,1.0137759660235712,1.0077641190283861,1.0073004009027491,1.0077462239134847,1.0076544626266526,1.012012394577652,1.005670584207073,1.005707156052049,1.0022116269565111,1.0040629170685316,1.0153246870486055,1.0097345899337429,1.0035334384872987,1.0096653523382761,1.0073148406745356,1.0093732788798446,1.0093716077556087,1.0121124832400188,1.0050439683788877,1.0060963937867471,1.0042559036221312,1.002101955953117,1.0072614282628531,1.0020078082858495,1.0006858288417591,1.004905109880172,1.0130972253635961,1.0123773961569293,1.0073261398890214,1.0058632632910889,1.0154833457716135,1.0141874677196008,1.0103402663516852,1.0143029556380363,1.0143504297156782,1.0133627686768654,1.0127942921249118,1.0139942986043866,1.0119399549562103,1.0075394741284187,1.0036048284767265,1.014994095342181,1.0108699928652181,1.0036038841550989,1.0130016930702526,1.0053130912101513,1.0067235557699659,1.0016666509984322,1.0116203261025272,1.0089652289102893,1.0101953014328093,1.0064286632302797,1.0050943484514148,1.0023610723739669,1.0030792482169262,1.0082629217094843,1.0149698780988741,1.0120670997082031,1.0157648993751975,1.0006096847724644,1.0061127968675376,1.015498996238114,1.0014815795100724,1.0114321965277111,1.0108166103120773,1.0006762441375188,1.0019412896492788,1.010867178653797,1.0070761930961452,1.0116794609966528,1.0094543508262368,1.014338803576488,1.00815562047883,1.0018663963670291,1.0135623321171288,1.0141368358159226,1.0009599646197882,1.0113470002629925,1.002750672879051,1.0022208525290295,1.014853556573631,1.0088586213223045,1.004676941898047,1.0070622998676666,1.0014783350513603,1.0075694318408661,1.0146449131440525,1.0057216476947997,1.007319821110146,1.0155955585953169,1.0103320403875322,1.0084267733304222,1.0000418795662547,1.0155582658929239,1.0076657079286768,1.0035180786215465,1.0117575956384199,1.0112326668217595,1.0134403690000782,1.0031659078944091,1.0136047408119933,1.0125831022087179,1.0128547648513546,1.0075951559685847,1.0049468710925962,1.0014283398982724,1.0117025867456615,1.0153440587577216,1.0038009725584756,1.0152595039146337,1.0044037441992397,1.0157140178700514,1.0057684301556145,1.0059968264759358,1.0029923747491871,1.0073258395309246,1.0046758770323028,1.0144340282720949,1.0138449500693361,1.0040631368436153,1.0020764234001649,1.0070216102129619,1.0153234052119509,1.0150372669848051,1.0062746855640889,1.015050077757816,1.0118653359180301,1.0141294869704522,1.0058277573385035,1.0041910874144493,1.0078793720999353,1.0147324817075114,1.0147208944488422,1.0126996097924157,1.003550491361147,1.0126175290129638,1.0123366366493984,1.0145612250688538,1.0128535523612472,1.0029534976248278,1.0118051449013052,1.0057225397114444,1.0117140481221643,1.0051317433913782,1.0151159512942565,1.0064988391478664,1.0102232342162969,1.0086048737712574,1.010772734893417,1.0114301156296355,1.0014260982515324,1.0063172378893899,1.0076796546841247,1.0143851278723697,1.0127097958763236,1.0139652745083538,1.0090008889899462,1.0157256080559105,1.012379474554939,1.0008690320375064,1.0136558155747326,1.000735265688846,1.0129386814485779,1.0142979730332262,1.0029567781883615,1.009346947167824,1.003321828220157,1.0063994210960947,1.0144240597630807,1.0119525509829601,1.0095808133206894,1.0047807385269205,1.0092252370105521,1.0079596982186079,1.003836329852972,1.0099405022071786,1.0128149288419697,1.0122819798279978,1.0117761536170855,1.0047943302936777,1.0106214632320034,1.0022036778763703,1.0127935502131942,1.0052205184871661,1.0130520490847184,1.0102518116932275,1.0110100749097393,1.001415305885661,1.0128782910776999,1.0124498895571219,1.0061745189194859,1.0083455516433997,1.0038636903957696,1.0010737475156064,1.0088707668572932,1.0122740702718904,1.0157416008001987,1.0125259816186005,1.0075671786530949,1.0016303853881769,1.003321509414032,1.0150596254896556,1.0159391618315197,1.0118200107306736,1.0065633715308462,1.0074367672113782,1.0026142447711344,1.0131883955531549,1.0104404281078854,1.0067340409855772,1.0128399516352213,1.0040260446300486,1.0145069741532584,1.0088273657556652,1.0105956437982819,1.006494304085418,1.0126420681828199,1.0040682010777899,1.0048302901290513,1.0127633785866297,1.0016764906046309,1.0072909725837011,1.0130847764223747,1.0144557003015491,1.001938553101186,1.0086126021283883,1.0139015661921948,1.0033262672944423,1.001078018560063,1.0017673545198775,1.0123781199767579,1.0088802483673964,1.0054007282728257,1.0121329429189978,1.0146572970759469,1.006466779889414,1.0072049344822613,1.001836256922372,1.0111852704611644,1.008703214819896,1.0146896375538248,1.0006497146682172,1.0074155344273998,1.0132731373477448,1.0104924015769103,1.0144733545825466,1.001942722408689,1.0118494659833064,1.0062328615766849,1.0104057531512953,1.0135131980284255,1.0100452127560025,1.0028842249749563,1.0116458825411236,1.0034342207082041,1.0057942186937689,1.0002560435124335,1.0147397319688978,1.005212964022937,1.0103219729474149,1.0021377107396467,1.0118807392182261,1.0028105668408416,1.0117177387446219,1.0115191863953337,1.0145510262009918,1.0141795731927743,1.0074014656984962,1.0020122259023443,1.0120596087574347,1.0026743835698166,1.0138621197048603,1.0118261074593919,1.0159846312846079,1.0027957643218621,1.0120471601053154,1.0080627791993912,1.0080730328508734,1.013270675663144,1.0027218574538035,1.009550963619833,1.0154195634583387,1.0048856940883597,1.0020815297833454,1.003572880727831,1.0141993526105122,1.0118285341594682,1.0034001878046672,1.0134469325849604,1.0039893658131664,1.0070699784933932,1.0018248108776104,1.0084789056207117,1.0141114821900494,1.0148659706967451,1.0087811624815626,1.0019648101856684,1.0102795180288238,1.014134077572231,1.0136057768223594,1.0137223101059432,1.0076938429193369,1.0065352724583219,1.0072059985407846,1.0075750241042667,1.0130311997418215,1.0152057352914965,1.0085487875531807,1.0003364308247649,1.0002972717688259,1.0013882632365243,1.0090065812202902,1.0158326536345539,1.0057772852745657,1.0064494526971262,1.01018377905488,1.0017514362161786,1.0155214528828638,1.0154034553276883,1.0119145228276325,1.0142294863736172,1.0039723310599633,1.0136715213912684,1.0111378133031987,1.0017660960924315,1.0148574185630124,1.0036375167757243,1.0086838583356537,1.0026590800595041,1.0108408087335707,1.0079858860922657,1.0050353136072634,1.0153334634019957,1.0084750402858402,1.0073886454668677,1.0039183652465737,1.0117958590218092,1.0036999743888926,1.0099101562217434,1.0133828732051957,1.004126411824223,1.0143002872845703,1.0048779775114896,1.0036275179630045,1.0145425569364348,1.0067017819153175,1.012462502808029,1.0157750912908901,1.0134534798796366,1.0022500303949724,1.0086565779744419,1.0086185799109557,1.0127472115149059,1.0081703402676756,1.0101901909773778,1.0072024516940241,1.0110223304156483,1.0046803769334482,1.0096472835271155,1.0030085615257338,1.0040809338714456,1.0106054407936953,1.0124135814592006,1.0148390925708299,1.0044611856281236,1.0051295423270417,1.0039575201961584,1.0113488663979553,1.0012761281386477,1.0032918626219147,1.0063470879950924,1.0107691396629803,1.0031674405699362,1.0034989175456337,1.0033086192301541,1.0135645249828347,1.0113937569192073,1.0142195250797461,1.009172735334914,1.0025542315461577,1.0112814861729664,1.0153946619138947,1.0092300911214778,1.0059110863696334,1.0064653061938416,1.0051312269901986,1.0136816684933747,1.0098005979835607,1.0122247007150507,1.010649986789893,1.0098580652231757,1.0005247437609184,1.0040934945629056,1.0103677233254225,1.0061858545856575,1.0097555547112882,1.0084162818722811,1.0138399994552356,1.0103722315676358,1.0114352446100223,1.002969109352698,1.0116085155464956,1.0085806820077323,1.0022777923159834,1.0039323993506006,1.012569526063495,1.0146017629432411,1.0116573821227424,1.0064578843865131,1.0102216151415508,1.0024152956910233,1.0055605453975656,1.0072959125270324,1.0140234381264042,1.0062768567364571,1.0027140564073924,1.014189339976282,1.0148596181386291,1.0083626565435504,1.0094323604079039,1.0073451763971082,1.0155811815166325,1.0054954772023184,1.0048034189404604,1.012831426264462,1.0056921719663567,1.0071885608305533,1.0130302606600079,1.0116916133320182,1.0060225291552756,1.0139695853814794,1.007972514531235,1.009859421758966,1.003093766207777,1.0078810605542154,1.0079527486167208,1.0125416172402013,1.0021384088271292,1.0109598236048918,1.0100636123047206,1.0147871502775359,1.0109681663067736,1.003219992908577,1.0090206583509604,1.0072562995671188,1.0124422694854214,1.0157315148943205,1.0016003922012895,1.0130716462199381,1.0093567907906624,1.0141872994386301,1.0124701165629628,1.0073685748371191,1.0098894482640701,1.0123083123645786,1.0056511406624167,1.0009165017500856,1.0103184052985632,1.0042117271043127,1.0134899570750426,1.0129831149308852,1.0029920133759673,1.0102541563303351,1.0075526848705232,1.015284886520113,1.0107419204272377,1.0097538400127273,1.0129287661387758,1.0106881116415298,1.012966945403196,1.0016907936721089,1.0085135204314755,1.0002577274348086,1.0098565724651554,1.0027771245918113,1.0050045837469255,1.0150844539599062,1.0150340301148995,1.0074686561170263,1.0031546075962783,1.005830043669244,1.0060229283408872,1.0104345230318026,1.0141205407704688,1.0040504999822273,1.002952590824117,1.0094395658408388,1.0132371835263621,1.0133798947435066,1.00718825132733,1.0100134715834033,1.0081931618708178,1.0020201761653689,1.013763011693231,1.0108983580943434,1.0159170077787558,1.0009572441537895,1.0044914417071584,1.0066955454516866,1.0046061235265198,1.0131888917361784,1.0100405497807228,1.0039197276000493,1.0152207402584215,1.0150301344507848,1.0075284399924378,1.0024925803110951,1.013597615464239,1.0128505700092663,1.0052177304320267,1.0094917311463258,1.0083281855169905,1.003754658087288,1.012483557016669,1.0050276809523555,1.0018410200891041,1.0132072680375059,1.0047185536899854,1.0137894394738765,1.0024196522908231,1.0081502686172277,1.0150566675988739,1.0130078926894563,1.0134662844217721,1.0099420832912906,1.0050758039813394,1.0150464897277451,1.0057469883959016,1.0075166174276686,1.0043967694694069,1.0092175949027691,1.0088242826063136,1.0073948620830024,1.0099746868540935,1.0084600064191427,1.0071265450628706,1.0009238130940656,1.003000785293179,1.0012813490892867,1.0061708961509443,1.001856019437144,1.0084926617511023,1.0066679820694795,1.0118284334208916,1.0098188116050171,1.0056273781366598,1.0115397639982233,1.0106239364608816,1.0047674744525021,1.0078108637966681,1.0069142187709097,1.0024039478707194,1.0132097543265293,1.0032340639525281,1.0105275018955424,1.0021955816583779,1.0147176217802982,1.0014012684927214,1.008564102194925,1.0037260971470698,1.0009311801122776,1.0159751683895641,1.0057805592912492,1.0159517095009172,1.0102922490765565,1.0148003200518598,1.0040473144750981,1.0123743165821553,1.0055921290020373,1.0156843927272052,1.0044337050208414,1.0099957009590639,1.0029339676247115,1.0112169736043868,1.0128482052328698,1.0082192771150691,1.00068948460348,1.0016604427849265,1.0158832524344295,1.0118329822920067,1.0074058748762111,1.011260316985614,1.0021327514839578,1.0029328054909201,1.0125201867714839,1.0112255085829582,1.0117506526551456,1.0141001356472708,1.0058929527737057,1.0087343734588676,1.0150648682310131,1.0029845904231423,1.0159273823194701,1.0105841784368004,1.0068015094360372,1.0057638364338237,1.0074746743034459,1.0068615492739623,1.0140078867365763,1.009602827744565,1.004080862874412,1.0092532966328507,1.0142330054722122,1.0011800129306774,1.0155264611315633,1.0148549223804055,1.0154924831530934,1.0121011658316601,1.002717768469618,1.009653494873691,1.0094840985309088,1.0074998085999878,1.0147443111803574,1.0025963662048949,1.0149958382593318,1.0093214626104521,1.0156033853991466,1.0097969232137882,1.0001774192284576,1.0049222165957508,1.0116492797542791,1.0093394043360953,1.0068578288624999,1.0029080476741365,1.0123954436202591,1.009360479432911,1.010551242434417,1.0088821267828985,1.0078025986456016,1.0090442746882957,1.0001959917083523,1.0128187245141398,1.0074046918280413,1.0148266771294856,1.0123950835100757,1.0150760562718941,1.0124175110764626,1.0023939148696319,1.0031921046134444,1.0127663005326804,1.0158092826010745,1.0028939124931027,1.0109476050118822,1.0054988421405175,1.0143321685156965,1.0026863286048215,1.0022665141124394,1.0014217097510234,1.0128367945331165,1.0140783346156024,1.0074207075835446,1.010442922596601,1.0088415086556251,1.0005037140657744,1.0137171866622932,1.0065911319403542,1.013294920736348,1.0022413294357526,1.0010624447152268,1.0091230738274544,1.0104968099327192,1.015802592362868,1.0083572405724281,1.0069416152674064,1.0065734257396357,1.012795676578282,1.0074913255530487,1.0084336684564341,1.0138803155354663,1.0052782236221873,1.0027082882728415,1.0071870509385261,1.0097763469621939,1.0074873222311429,1.0075233137599451,1.0098563914222636,1.0093790313504607,1.0126100673214857,1.0159163873061523,1.009923105270635,1.0148183148940495,1.015855695498844,1.0010270291018586,1.007164804965023,1.006533115674165,1.0010052399989391,1.0126662029694455,1.0146905038768821,1.0082968358474822,1.0155103693248657,1.0080061806423066,1.0024346879420742,1.014407207912863,1.0125707040546761,1.0008046242402602,1.0158728079034469,1.0073780491612256,1.0037352026584851,1.0113066132259347,1.014067073903363,1.0138114333304435,1.0025545529761051,1.0079558393428567,1.0146914646166212,1.0083478762905778,1.0110494796238338,1.0044647082847553,1.007407870976389,1.0109860107646738,1.0075373091534758,1.0004249207270328,1.0062215028828247,1.0101177029411517,1.0065391450371086,1.0151063585678051,1.0098573727450475,1.0072463533946827,1.0140773688612998,1.0144288895705138,1.0048249778237233,1.0135637546432237,1.0126439741608968,1.0146872674150527,1.0064999877143705,1.0100649918046869,1.0029714432947312,1.0089850132024405,1.0148429241237289,1.0015036456029667,1.0006969765259766,1.0057172286669209,1.0155666079917818,1.0149884812914913,1.0033700948028998,1.0053353143076331,1.0033645443284009,1.0030921821944339,1.0153157923927085,1.0080179847084181,1.0081492494639255,1.0056291701514406,1.001315740176105,1.0001029960131014,1.0115013180015928,1.0152983416861441,1.0038841985831275,1.0144543092103548,1.0072821373550063,1.008053677839825,1.0041784299430812,1.0038023447136384,1.0040118073961972,1.006422763318781,1.0153197900532844,1.012885396997707,1.0120528515247624,1.0131385634008998,1.0064516719636829,1.0123748956151535,1.0090105244334648,1.0011099341191347,1.0006798690696483,1.0015574022517577,1.0048832393113027,1.0139620577090798,1.0078084303300769,1.0004500991444238,1.0118262917203198,1.0044715218722029,1.012440165274878,1.0015293699560031,1.0024284782079942,1.0130519356919623,1.0096565871204495,1.0061652036756576,1.0037163295365514,1.0130321636500659,1.0146506690818784,1.0129835986961515,1.0029307237409135,1.0113904331432255,1.0156187280531852,1.0056551615933724,1.0021887160431786,1.0053203029056712,1.0021737590026003,1.0128513381127231,1.0084847742754968,1.0032514338166245,1.0143486729491897,1.0089414179004412,1.0135466598761189,1.015228992638417,1.0055920341650937,1.0151977866816095,1.0034426660821225,1.0064605997044753,1.015520675624475,1.0124679451438072,1.0047246086857438,1.0022022679939118,1.0010236577327518,1.000688941840858,1.011190698006311,1.0085313953324371,1.0066962368567094,1.0074730318141889,1.0111887286432144,1.0044576675642523,1.0130025915239274,1.0006853388058043,1.0042377422325528,1.0019359347026606,1.0053099717205218,1.0087037394892235,1.0121153529761349,1.0121190506521476,1.0075804262294421,1.0149509053564967,1.0100414948034262,1.0096069188488697,1.0147370215776381,1.0066605553564953,1.015667695714551,1.0006917311389858,1.0089878997508761,1.0015608004959604,1.0121235468290501,1.0129228135356916,1.01123599830017,1.0066026201342844,1.0119932827031126,1.0051810624384661,1.0136431209751429,1.0013185294653184,1.0103637355745816,1.0018499362114601,1.005731600582473,1.0157414290738511,1.0131830809768141,1.0066906680116843,1.0062434959750635,1.0104815638864473,1.0097124960749999,1.0026600604727476,1.0098584737764849,1.0146453030701226,1.0135824373297693,1.0037481210240373,1.0133304583617313,1.0113947480605741,1.0070443117853174,1.0069180067506749,1.0122560166806021,1.0073567883148138,1.0079354658800106,1.0104528608051084,1.0012824059904126,1.0035735007404039,1.0054534268502606,1.006173005843618,1.0060337107922235,1.0009634313330673,1.0009751526229824,1.0019721932597012,1.0044253139554016,1.0041444104569035,1.0071821273285171,1.0062798320870856,1.0012155888055372,1.0038508764351772,1.0151820529211777,1.013067713352594,1.0122602803219733,1.0093977211668916,1.0003585910416113,1.0045858489005106,1.0044790572287354,1.0142410878810992,1.0092270705002768,1.0141383976751086,1.0060062838419337,1.0111937424617408,1.0101019808281986,1.0083768084330544,1.0106454259479947,1.0116190366460989,1.0130477933522137,1.0150216775306951,1.0106044179090945,1.0028039368643304,1.0155909952760114,1.0131988802869683,1.0092728756485336,1.0126391768598193,1.0113287822272052,1.0072184789803438,1.0006122489649449,1.0090318804387284,1.0080012142678363,1.0042442646463159,1.0031732990164959,1.0094367502511592,1.0102335462541843,1.0146502845996648,1.0094281425739207,1.0127195492949477,1.0035329896807281,1.0056410983964286,1.0002468674797156,1.0092669611899479,1.0084872045242808,1.0149702126623248,1.00167505157875,1.0051321192430127,1.0050430167683724,1.0132938908540878,1.0078148367559783,1.001415473949492,1.0007706329582673,1.0029719416526213,1.0035652062424463,1.0028235178290679,1.0009702450356994,1.0133078011467365,1.0065661847829204,1.0102694896288331,1.0106538879142781,1.0035591984730845,1.0092086292934828,1.0023618432847063,1.0019422868980563,1.0036417958478914,1.0157922704020748,1.0044619375664661,1.0138415899424402,1.0136932038110356,1.0092842430299247,1.0003841468138557,1.0081939850570196,1.0072252600503024,1.0151813769890783,1.0048780320209678,1.0063778301584982,1.0076725338538959,1.0023703330871672,1.0136819606229537,1.0144948031886571,1.011703227951414,1.0097916256925259,1.0045196605035045,1.0120954159344187,1.0012917634177354,1.0003931339340133,1.0076563995823449,1.007165798094442,1.0073256491049842,1.0124738010202987,1.0155266412135227,1.0141765871874995,1.0112771348113037,1.0081628752245511,1.0125524597262443,1.0035062653457278,1.0019499953458657,1.0033412890337756,1.0157436541229732,1.0034070119781471,1.0154934288317754,1.0131825316982537,1.0048667730384229,1.0081719513453378,1.0060836463503799,1.002646644950937,1.0130155963489682,1.0143375893325095,1.0064510243360145,1.0029901888789581,1.0084844715207046,1.0021768220586509,1.0006538437039945,1.012982900623697,1.0012739723789694,1.0149444570635475,1.0024866436599282,1.0092442777277459,1.0100113599635374,1.0033768706319039,1.0122632541794012,1.0093170445277957,1.0106179431033324,1.0101489543792652,1.0137847824428061,1.0088114395083094,1.0118914611963814,1.0142760881588144,1.0098842868619877,1.0141811586212961,1.00352635537702,1.0027297840584848,1.0041856090753003,1.0072576419865928,1.0098848423630271,1.012309014417504,1.0020680432148057,1.0028348065184471,1.00940162747575,1.0152030124864311,1.0094865675996232,1.0094922639722184,1.0097347992362828,1.0053246549130797,1.0077634476528357,1.0112470221661347,1.0017601627258705,1.0103348181127438,1.0069057069155756,1.008440646935741,1.0154285731599175,1.0022828459311235,1.002327632560567,1.0043732072753504,1.0143043959669729,1.0150488628852958,1.0156267348093004,1.0121161321671002,1.015544724218457,1.0106568808257885,1.0120514078188136,1.0028372068627907,1.0066760071812233,1.0100570339492221,1.0067906397646891,1.0126710926659015,1.0089982992970585,1.0073411938616412,1.0114939400230627,1.0091658423015628,1.0032031972841311,1.0022003961455819,1.0132855483249894,1.001488664980039,1.0124787316150374,1.0036826910576331,1.0073792036377487,1.0055456765263302,1.0087465323616678,1.0049722685232401,1.0109034090683759,1.0021780939780653,1.0027618757899457,1.0151054200212917,1.0106366399903128,1.0112919090978183,1.0128415130538688,1.0159348590820618,1.0073630418519677,1.0035010554561365,1.0100341435339462,1.0087399231933396,1.0096318040779231,1.010850635540038,1.0124007801757802,1.0128587909862106,1.000590730003998,1.0083198580874366,1.001694687432517,1.0119626173551475,1.0152155738591715,1.0150625234124704,1.0086026434071147,1.0148346718582342,1.0101090457795097,1.0150629540458904,1.0139951047075348,1.0102075743066865,1.0101619432576321,1.0143046104446285,1.0038032788827571,1.009713236531967,1.008341493585333,1.0021928735318537,1.0145689021218078,1.0110337335736377,1.0110597047634382,1.0143489691299887,1.0137723942315646,1.0077886346035996,1.0037372456296969,1.0026449660021806,1.0094822230494278,1.0111076024407615,1.0093902373588612,1.0154240965092522,1.015527510555613,1.0140414883634223,1.0050186769645988,1.0149497587523688,1.0121246234950381,1.0050176815002234,1.0112389514170013,1.0095107252157371,1.0108871687697787,1.0062122888887488,1.0033016661138499,1.0057053019211293,1.0076127469007843,1.0077535968207352,1.001713590676697,1.0068489570587038,1.000834970698933,1.0025939381040099,1.0049262056989756,1.0063079190430557,1.00683252207759,1.0026378586048157,1.0153669563893755,1.009345334533359,1.0150429343766507,1.014055443876446,1.0071795355196769,1.0150657635145464,1.0153374524365744,1.0054572335239771,1.0146548126284698,1.0116962535314926,1.0009947782722806,1.0061649319127726,1.0103737987318577,1.006468377922874,1.0128078227330575,1.0083780914484126,1.0082445135210349,1.0054428726200919,1.0149035205853618,1.0087799682778453,1.0023173863951758,1.0090356491991059,1.0137392068461808,1.0088861770386184,1.0048683659784556,1.0014629657345775,1.0128006055096754,1.0105110208009829,1.0157636016362348,1.0143909433820006,1.0002735901701658,1.0126633377176899,1.0136319037981625,1.0059407433607346,1.0154908401947349,1.0033008063574627,1.0099212395540187,1.0007403394162502,1.0094740118165106,1.0130209780288921,1.0078496181718755,1.0046819595903267,1.0095160179345675,1.0075542274511589,1.0099631724002043,1.0103092104003788,1.0127314101030276,1.0087001461666627,1.0114911798785498,1.0089195501481121,1.0004717721562346,1.0064853421708038,1.0156445179991906,1.0049640756104679,1.0155738075970986,1.0117832365272625,1.00749346584987,1.0147708358365903,1.0111667951481991,1.0035390760612817,1.009376342502819,1.0105065215181779,1.0132941438348091,1.0044258205930783,1.0019183049425484,1.0135245926866279,1.009721999270657,1.0144985523550836,1.0146325307785629,1.0020730924265471,1.0070046890480027,1.0026203548432968,1.0060699635025594,1.0000111168927095,1.0092917836050119,1.0028449181582653,1.0107073354243186,1.0154928385092148,1.0124529775025906,1.0081678596414361,1.003147868712005,1.0000768414862391,1.0105193959836232,1.0086853592401528,1.0095729847086696,1.0026733104930921,1.0067573139239421,1.0150371580609299,1.009250168465893,1.000337721493844,1.0077896853937995,1.0017292345399322,1.0145056552276337,1.0078641919754905,1.0068620488717057,1.0098858160229593,1.0078933863770136,1.0112638093882629,1.0008344932518045,1.0053494285936615,1.0159660694339037,1.0158085276192002,1.0141836556264918,1.0107348560756944,1.0130993995730817,1.0017297946549164,1.001376445880114,1.0081400721895044,1.0047434907743928,1.0092492357469462,1.0003468903906252,1.0089059685851873,1.004887206575954,1.0116820379484492,1.0082560614540257,1.0011563169716706,1.0032024990355772,1.0004702732580253,1.0150396101248071,1.0086463002910309,1.0013374904105643,1.0002115716176323,1.0122239380034117,1.0095209603012401,1.0157996919663843,1.0099665877519166,1.015061355572535,1.013048578383021,1.0134277024450953,1.0133297954027736,1.0132292495489352,1.0034176738285228,1.0026177326187298,1.0052507367357595,1.0074697116414943,1.0083981344919144,1.0095513956059279,1.003483449666658,1.0018672068198331,1.0086721195435679,1.0132979824238313,1.008055200840096,1.0012370633549068,1.0130475886774541,1.002334276857612,1.0074958934757356,1.0014508032647556,1.014035598948021,1.0048884923722818,1.0152834736392526,1.0124868015815605,1.0059669257158741,1.0018464833886529,1.0071689518030909,1.0081580962596761,1.0129575905073651,1.0087306388348232,1.0102599578025919,1.0042124896478557,1.0068295682380624,1.0133028027766351,1.0080033229720979,1.0051655398411654,1.014246437825628,1.0031579986199308,1.0136669652176173,1.0064072871951919,1.0159800195451507,1.0068448179704093,1.0100837471941633,1.0036639605977367,1.009028272147914,1.0005322320264507,1.0137972943946034,1.0020584899097202,1.0062351875770743,1.0043841528498754,1.0157506505735232,1.0129671302189207,1.0143559287982149,1.0096146044848509,1.0011292624550501,1.0052128478333753,1.0006120406301953,1.0033180499654857,1.0155740303537411,1.0140428529922159,1.0089463396648195,1.0007648913412186,1.0028731733722454,1.0015006306593894,1.0126284963583827,1.0128790096594584,1.0033904725085265,1.0019298746838925,1.0037586905692495,1.0108658431738233,1.0068444919360227,1.015964597976776,1.0159632512147696,1.0016708429369314,1.0106516766692084,1.009498211360617,1.0020876422805307,1.0044573243473374,1.0060152313464163,1.005261401745515,1.0106649146907563,1.0017846899815845,1.0067968732884904,1.0093174807631158,1.0126229065407215,1.0073413039187049,1.007752725127391,1.0129502337215552,1.0004764775881474,1.0084173251902617,1.0031119148954049,1.0146284154832881,1.0120493294491653,1.0070193026147414,1.0059808258191856,1.013534043356511,1.0109682221995953,1.0023734733136602,1.0003526090884149,1.0045741409883588,1.0148482049625551,1.0040057471491992,1.0125228321524267,1.0107578409127007,1.0037983041823972,1.0114057297397616,1.0148422004556517,1.0133301448942962,1.008374935592528,1.0159336217404937,1.0039866608367303,1.0125865192937633,1.0050463594500927,1.0016989034678079,1.014050898138245,1.010971433205851,1.0097898160076384,1.0103490328521247,1.0110812782518892,1.0085304310523961,1.0091795593549739,1.0016326359743535,1.0075024440303022,1.0042735740063313,1.0139932744746099,1.0140486507820834,1.002069760049112,1.0133305068582084,1.0066649698405454,1.0090080462682678,1.0137544254655764,1.0149021475519504,1.0078385074953311,1.0044245331789652,1.0015511831658865,1.0121958702577198,1.0042913684209476,1.0069767663547009,1.0059279991767844,1.0066015646716204,1.009364889814476,1.0135133938802923,1.0123801555365934,1.0109751817179322,1.0077861841825047,1.0081680082271356,1.0125446804913183,1.0137131879856969,1.0115327475190117,1.0137854303645339,1.0019635046927313,1.0123063799099854,1.0024538508093435,1.0059828038053034,1.0040920042346799,1.0131733247860522,1.0016676134322937,1.002588465243653,1.013532007378479,1.0027614163605518,1.0085854199359239,1.0151386974002157,1.0068758867731888,1.0158258478709024,1.0019170269664524,1.0054192319923385,1.0062817324166995,1.0089388891677764,1.0105123302233761,1.0095189929590807,1.005026422486182,1.0120922498912153,1.0036871558702054,1.0131826842095915,1.0072987697699585,1.0138404051030223,1.0148343101255599,1.0024726658718595,1.0017362879471863,1.0116826509992296,1.0152646950558883,1.0000786633476029,1.0084399525925287,1.0048972186218048,1.0143673072876687,1.00480244286972,1.0106455172885507,1.0093791316195884,1.0037720873997613,1.0035425094262234,1.0126111614991098,1.0132051141510174,1.0024688882946633,1.0022633349161105,1.0054837188380772,1.0063612589235946,1.0106748275318393,1.0131484538005875,1.0125425611437158,1.0066276865104444,1.0124865556892568,1.0132023821375402,1.0045641245969859,1.0149035477161237,1.0153157325454154,1.0016869917148929,1.0059345232454115,1.0077928263411786,1.0069830224124123,1.0120526330573036,1.0049137713097911,1.0078227373244644,1.0005800563947322,1.0040652758043536,1.0105900659012188,1.0100890267115037,1.0123817604726344,1.0047657443913345,1.0025994454734153,1.0086544544529628,1.0038907132382735,1.0095077309932217,1.0094416387965992,1.0063308049692938,1.0147522602971708,1.0147897941241417,1.0078640689094787,1.0055375834683999,1.0134121976365542,1.0065459870475313,1.0083682329830932,1.0129519935079532,1.0110133777105235,1.003774138254889,1.0115980871438817,1.0036423794284635,1.0052489921572179,1.0041466576742684,1.0086124918840051,1.0134772005877652,1.0041606359206516,1.0030586584408112,1.0131715832631418,1.0062997801133537,1.0060518795074955,1.0149981300315198,1.0152798937372869,1.0120166372241124,1.0039770464595559,1.0130560236072517,1.0060443336996989,1.0001650083245524,1.0012570309653159,1.0121437072945647,1.0147440501895235,1.0018508076593104,1.0020095088039636,1.014254117286687,1.0087014797302982,1.0157226717671932,1.007068404886978,1.009575680462143,1.011579472185032,1.0093207901716081,1.014937477950957,1.005404059248304,1.0030949471045441,1.0111762996007208,1.0140110671624976,1.0148274407220916,1.0107872861742531,1.0111407476966265,1.0069493982507891,1.0149739572394567,1.0000786674764754,1.0020487426892744,1.0085884369749796,1.0138182629213037,1.0002642736651863,1.0029967107331279,1.0128602811922385,1.0025905358651521,1.0103823222988035,1.0030416302217453,1.0057493939130147,1.0021303952553622,1.0151136243068373,1.0027377478999366,1.0048972524998852,1.0021781128097684,1.0100504933246615,1.0051896430934653,1.0037988190419354,1.0034460875815041,1.0106534205624671,1.0002030201212413,1.0115361301360786,1.0020294890807211,1.0003737898690337,1.0027752675773403,1.0053917646332784,1.0104970014529964,1.0101576561394996,1.0067536005786302,1.0146466311821145,1.0110161293278486,1.0051180308971968,1.002895617230545,1.0067112543452397,1.011358106058412,1.0149875082636419,1.0016484226855393,1.0143443999110537,1.011812535566823,1.0004795835041498,1.0006501944533996,1.0089019819423355,1.006298859322676,1.0156896242854192,1.0044287511674186,1.0152615007055041,1.0132713151462771,1.014061869925772,1.0153295369704289,1.0022973593883406,1.013960902663726,1.0093709039296619,1.0027306294468434,1.0079171444867723,1.0142714446573469,1.0089376084315347,1.0082250721892976,1.0150705455524662,1.0124426381541785,1.0022176612206302,1.0093914995763527,1.011975825401416,1.0141065170305759,1.0122554990038974,1.0132087489095702,1.0073956961253969,1.0129937574945942,1.0092191421920282,1.0101797287535983,1.0108191614997208,1.005235747361112,1.0064169085697685,1.0157489915338218,1.0014176619753301,1.0026320246770155,1.0069806835439918,1.0034686965762116,1.0120579941565992,1.0090995061368246,1.013161879867096,1.0094187689882805,1.0097712910568744,1.0053800533955111,1.0156238794391081,1.0077689102982232,1.002623468333532,1.0025185083338592,1.0071446824112142,1.0137204227458789,1.0131842650455321,1.0053566604314006,1.0085490240876229,1.0006913195822615,1.0152615998157226,1.0081509740999401,1.0028830211604636,1.0144252631445392,1.0097144622706931,1.0083913157697626,1.0081164098471045,1.0157117278922463,1.0078237058178834,1.0014839435296865,1.0060145238902773,1.002861341988365,1.0107741953273088,1.0005278025676423,1.0149273014637017,1.0071259390111909,1.009513345037713,1.0118191130229606,1.0153432872829951,1.0138456684177861,1.0050558867796857,1.0139355821475085,1.0154775240177185,1.0050036827764111,1.0010845551650436,1.0136219605252619,1.0049865748468694,1.0151530294831368,1.0014329728109348,1.0159557753192028,1.0086493455740206,1.0029397143284153,1.0126565028231347,1.0040585353578548,1.0123851888780104,1.0150639780223478,1.0047052822211142,1.0081468911494436,1.0001921443224309,1.002400411349849,1.0109889517415696,1.0115311586087681,1.0048092332020728,1.00138433284757,1.0144890576241001,1.0124947740451853,1.0073507957393641,1.0127816707187909,1.0098987400221933,1.0092364072777551,1.0051824471558006,1.0147163710395144,1.0123679124665381,1.0129270725902286,1.0146993041292109,1.0070018595356058,1.0095942005112333,1.0013065926051112,1.0066668899836346,1.0085653876692862,1.0141845793403332,1.0149709407680514,1.0095663149326009,1.0053877252763559,1.0064719445612627,1.0107455553665539,1.0035206486926322,1.0143304716724046,1.0116949421046226,1.0057352991389166,1.0103179067174137,1.0102935994602531,1.0024724946871293,1.01229612234776,1.0056833204395288,1.0143105254262299,1.0126427595238821,1.0017660786371221,1.0046906752981763,1.0007878494636984,1.0119419156562908,1.0094159674295211,1.0121354125122477,1.0085870203789071,1.0159108475861405,1.0096790374783045,1.0107253024856779,1.0157109471393424,1.00980417730664,1.0143712334525665,1.0117494393185356,1.0143263908884157,1.0119428556445647,1.0050320370851267,1.0126336096941118,1.0004820467500009,1.0014485691837369,1.0002257453687762,1.0029197597007344,1.0044898532554354,1.0103937968748957,1.0070929150071892,1.0091656199274084,1.0012404357218048,1.0078527476409136,1.0012971951243994,1.0090110700277568,1.0153181577363823,1.0122445644332423,1.0114437108479515,1.0002835225231197,1.0135439462285551,1.0134642156513103,1.0066415006091722,1.0028927906030878,1.0014782398281363,1.0155506469277469,1.0059077334045208,1.0113493209250681,1.0135115461919113,1.0048788886965223,1.0069744975140635,1.006598001551086,1.0157692900676558,1.0136664110163272,1.0033151960172875,1.0011275832595232,1.0131083814124178,1.0081896820340968,1.005949507219265,1.0125070649252541,1.0079581727717939,1.0076408535429007,1.0019349850696251,1.0018720721560714,1.0138034706310841,1.0022568726785834,1.0013028779701802,1.0091188916239076,1.0015894522292892,1.0097173750119426,1.0019748678930145,1.0116418445140516,1.0105959080773961,1.0152412408614591,1.0039539813357621,1.0047933848349335,1.0130656088579888,1.014185846904085,1.0011981912142056,1.0110003980886126,1.0136792849535978,1.0104138370746529,1.0107764767812077,1.0024481671777561,1.0125352986644069,1.0157055754939996,1.0009665033448887,1.0032135877733992,1.0106377749868161,1.0119829293468585,1.0115614488556266,1.0125223056251755,1.0018811077778662,1.0090298807663611,1.0157967987766279,1.0052106103094709,1.0155653330968348,1.0131980157983902,1.014857169005331,1.0130053488009338,1.00189809363379,1.0006010986702762,1.0112080803167618,1.0074107784160462,1.0128237572415233,1.0117479240024314,1.0065592746816767,1.0007943462971611,1.0109184851435593,1.0022497397516563,1.015632594516952,1.0133750926881384,1.0047358731051443,1.0159691922227223,1.01375362976586,1.0054983666043986,1.0134469698466009,1.0027807448668173,1.014182081506072,1.0143748547428555,1.002870179822517,1.0154636041700158,1.0121534242715848,1.007332681818464,1.014555693465568,1.0072361041377205,1.0052688678661921,1.008602396284382,1.00406718605767,1.0158918846892366,1.0053518438073104,1.0058748158735431,1.0039240811391916,1.0012567939104293,1.0099494546225254,1.0026728581619833,1.0086732856468781,1.0144444469998781,1.0147149904889026,1.0110201522007864,1.0104515281605104,1.0126418426825301,1.0052574301089638,1.0079252809082013,1.0045250069049323,1.0071029281839425,1.0123938636090433,1.0117997227532314,1.0055238174057253,1.0040300367460533,1.0088334864910478,1.0040736652636675,1.0097361865028203,1.0043260877524982,1.011971535760581,1.0110708049562849,1.0021138289388742,1.0152551344801521,1.0092042129440586,1.0055490605471396,1.0086386728154493,1.0002028590798695,1.0094824976781622,1.0137608922110266,1.0057651304483863,1.014440439443417,1.0010930896835575,1.0019230293664583,1.0071536776424936,1.0091317550829773,1.0076037120686989,1.0030732276826213,1.0076898633914988,1.0038235566483042,1.0084175041387811,1.0134209470910904,1.0054577155682896,1.0125670273782299,1.0141528002719811,1.015256617532619,1.0136380276470702,1.0071625884767199,1.0142848108195106,1.0043926447938087,1.0043487902578232,1.008684504475964,1.0021128671483439,1.0156170812633312,1.0035860971656645,1.0002674276706298,1.0112826794631353,1.0088389599577638,1.0098971460181325,1.0113487479950907,1.0103286648242318,1.0136014242233198,1.0004968428089525,1.0068977119757356,1.0092970042312335,1.0076946052231974,1.0080402727942301,1.0048409815009216,1.0150098708138842,1.0138858572841409,1.0086808952870923,1.0109877620035443,1.0020285456800644,1.0140190814490175,1.0110456950537339,1.0030950638321574,1.0020485809273043,1.0112634434431835,1.0020928646799414,1.0121675215144927,1.0156779864524579,1.015912159307925,1.0138673229015995,1.0039640973608452,1.0090985779318113,1.0088927198638502,1.0028129089729891,1.0082734507299567,1.0134654448535343,1.0027216653936508,1.0112118331746649,1.0053140820684614,1.009068654446247,1.0062149415774988,1.0029570152214093,1.0135321777675022,1.0003687579820026,1.0080779200314187,1.0038955179688462,1.0009645373259686,1.012877461731253,1.0073669211850511,1.0064628718036892,1.0038472035384531,1.0095171835010357,1.0004102043747434,1.0037821691660134,1.0024405551808857,1.008148820750709,1.01303979445643,1.005358635818524,1.0155234503854098,1.0139368332608336,1.0095917963775498,1.0113939834118253,1.015806642073658,1.015046734400209,1.0092518952271983,1.0091901506934189,1.0011487719871739,1.0103849286940429,1.0125420962604998,1.0128357610173473,1.0105531315383178,1.0112642973948818,1.0098862436621989,1.0078172724910015,1.0034511415667451,1.0131091347965955,1.0035625804291857,1.0083396736877299,1.0095636711914515,1.008391023358979,1.0106393847706483,1.0106818384223328,1.0016664413001699,1.0125735602167278,1.0050123407209344,1.0091602503757893,1.0050663810148222,1.0130591065561105,1.0012381970173059,1.000168594641293,1.0086992392215324,1.0085997784407084,1.0041391801812756,1.0153502490385178,1.0095760510218799,1.0140127074810639,1.0031207080039828,1.0139660591556852,1.0104940850261472,1.0027086690816909,1.0050538760646712,1.0042941728151678,1.0005987264967879,1.0057033699312385,1.0084971574512913,1.006375542630114,1.0099088744155242,1.0156147638726816,1.0131340178246302,1.013493265338981,1.011473393849174,1.0105670887678146,1.0144777041438202,1.0038016318683978,1.0107179790883862,1.0159511364915832,1.0113791292363139,1.0082782787689428,1.0112018374305103,1.0011945559260462,1.0036962966308722,1.0052210755925846,1.0083682988572826,1.0024026033780449,1.0085305486085581,1.0109178803428067,1.0044429321595334,1.0020077422273979,1.0143477973115642,1.0029769507091026,1.0069006804039582,1.0108292121058595,1.0111356760200676,1.0003072722736255,1.0113106761353285,1.0054914060511737,1.0077027034101218,1.0071752349723981,1.002850766961058,1.0115719807069352,1.0132550708694006,1.0101834348425212,1.0061440007756606,1.0082570099494863,1.0021372977488481,1.0064740271383079,1.013246710700404,1.0098810869666071,1.0118360816757481,1.0023901094779133,1.008906227830334,1.0076076082264214,1.0023652320669736,1.0144302493039343,1.0088317296376541,1.0154746145764137,1.012141764627543,1.0063564578441064,1.0083333118360196,1.0074980602472583,1.0077084371706926,1.0101437218997062,1.0101632770329845,1.0020296726497602,1.0157934941329061,1.0121180460817427,1.0056472646978176,1.0127473082867329,1.0087504264963576,1.0111880014464911,1.0106290061960181,1.00894012183201,1.0151096420164527,1.0148160978774825,1.0109615662708327,1.0068879180089978,1.0127509352161468,1.0080258606367964,1.0131855093040365,1.0070263955336247,1.0037553627592704,1.0049407369394241,1.010449790899602,1.012260181640102,1.0152650044418821,1.0055236023211012,1.010720305422788,1.0053857071476839,1.0044311638958618,1.0055900235621875,1.0137214874044032,1.0143918300454207,1.0019358601551231,1.004016327937175,1.0115341338449937,1.0040168069216964,1.0113809327991106,1.0036866175634247,1.0131752028853989,1.0070395203404663,1.0045646186016488,1.0039096501870304,1.0150405621883298,1.0149928322108901,1.0011731571313298,1.0156509747878697,1.0138204442131171,1.0025975494400663,1.0120062568668911,1.0105985885487594,1.0059043854104528,1.0069453653116442,1.0140580326818971,1.0067279286607238,1.008668875710355,1.0045680115438369,1.0053393712725549,1.0114264070327512,1.0016068950870123,1.0045725901989495,1.0051592221864869,1.0102161879624698,1.0048602490932634,1.0058775301064187,1.0102445637783597,1.0057145859052687,1.0126765705606899,1.0124321329898844,1.008534712390236,1.0104508011209159,1.0129657688173221,1.0083933799548728,1.0032442161186648,1.0079930115021547,1.006298506622137,1.0027516800289691,1.0037119400764658,1.0090284536575111,1.0041044032377824,1.0040698639393664,1.0093213920172515,1.0070875786664906,1.0116740429775144,1.0090730369787768,1.0058970106462293,1.0100379520560785,1.0003544175165968,1.0118811835652135,1.0045180465566781,1.0084316567417055,1.0034745065548871,1.0097617629781845,1.0055924117902069,1.0001709823457028,1.0073777132746344,1.0087533178302326,1.0048089570259442,1.0027853511092089,1.0089031564979962,1.0065946277251683,1.0028287121408204,1.0126678065155899,1.015067226606474,1.008130032969194,1.0007757531806798,1.0079458166820381,1.0146448932543595,1.0036734739989011,1.0081323779626292,1.0037852524684527,1.010308939297327,1.0067385763336654,1.0145306076108107,1.0094196965375459,1.0052920115482054,1.0146777834487017,1.0070877797435238,1.0095039837720656,1.0042936796338535,1.0022483794833186,1.0078274486024237,1.0130466115744208,1.0037987882951143,1.0137324268722707,1.0076689531630569,1.008443542533912,1.0012980078709444,1.0078822611269915,1.0027116389434019,1.0089799464937756,1.0087373766768983,1.0149286511278819,1.0041922702101367,1.0159699737372592,1.0092621641826196,1.0022502800117745,1.0034884379499056,1.0015099212855363,1.011486715093181,1.0150195290582176,1.0006053816256968,1.0138890788681834,1.0121243489207257,1.0052173119389525,1.0150013773381275,1.0139302078901862,1.0048369443899334,1.0073025000572691,1.0034457311827141,1.0134098481407239,1.001736682902477,1.0113086860426717,1.0114208934045881,1.0063956278857724,1.0039262879204744,1.0076673800629257,1.008267166839997,1.0034518870687077,1.0094089287182579,1.0151215859007783,1.0036318916347713,1.0016808925247604,1.0011338653439814,1.0084029139391613,1.0149541503024793,1.0016117824110269,1.0055496161246655,1.0141485846406038,1.0127413587739607,1.0082568360426829,1.0103691692163081,1.009363091511283,1.0122686838255626,1.010342397300271,1.0034219939171547,1.002491966305274,1.000138613649906,1.0112997655475042,1.0065113960123029,1.006166053713252,1.0056276464584344,1.0072737558109566,1.0015373267996874,1.0154707197587607,1.0058958095302113,1.0064219085678068,1.0078004379808434,1.0062848409479903,1.0106351601845551,1.0146876485937404,1.0067549041880575,1.0059119818218263,1.0108935831379815,1.0122732509296002,1.0102401232559906,1.0041846794427514,1.0108134658393721,1.0130576702494882,1.0093320433595669,1.0100919497759957,1.0088012645188198,1.0119649651556062,1.0019686980438367,1.0006028584741935,1.0131442667345045,1.0044917970164779,1.0112527728132554,1.0003220386334755,1.0077103731856807,1.0077768893249603,1.0090518296056765,1.0055318339261137,1.0123530301374395,1.0088862195014427,1.0076248725015771,1.0046670199743446,1.0025833861326749,1.0132918223703997,1.0151641469525907,1.0108011318409214,1.0097452456546014,1.000314815978939,1.0148444701196966,1.0087719807924174,1.0078801164873274,1.0150870752238843,1.0082508125966358,1.0044637859033088,1.004550185720551,1.0111325301354168,1.0127673981501131,1.004799303357429,1.0075030980687301,1.007451365728246,1.0094739277273297,1.0070466864879071,1.0029052124773921,1.0055859864218397,1.0063324542220355,1.0135544668042624,1.0110302279601764,1.0063199097803872,1.0111278422715111,1.0146822162973759,1.0124742441068111,1.0125965907712631,1.0011207817038925,1.0084238782539807,1.0118372787249477,1.0112103566257575,1.0138177056607955,1.0029086606017064,1.0109218407656293,1.014806803333312,1.0049991048037807,1.0028231524938995,1.0055954666419915,1.008219684593006,1.0056781641511159,1.0157802618290936,1.0159092492317421,1.0154314361725563,1.0107306675334078,1.0147649825320946,1.0021437614611175,1.0035845393392915,1.0115465901365797,1.0081617230202748,1.0073502017772482,1.0106257123161906,1.0118431202505025,1.0039839114555698,1.0142819856846486,1.0129032823612938,1.0105246644658021,1.0088064911214283,1.0036862188859643,1.0130993304407059,1.0004894196777523,1.0041311780211233,1.0028866591193963,1.012508165960968,1.0148504785025347,1.011030189296128,1.0112657366310314,1.0151578987324852,1.0127242966452354,1.0128819583442101,1.0115543933055298,1.0144287116481878,1.0004122059981002,1.0115806456401331,1.0081126690886593,1.0000538709294706,1.0048703532988981,1.0051661613301066,1.0032539075572557,1.0139693320599579,1.0136992394291733,1.011834634632782,1.0021128947671487,1.0120832381364455,1.0145570580545562,1.0073943486287877,1.0049406618324586,1.0080428490263553,1.0052049890889978,1.0108887208712072,1.0054035986652254,1.0020895589156331,1.0141652472805105,1.0055604357231922,1.0096717406563824,1.0059806795341011,1.0087192849610811,1.0131076187924599,1.0083866832856139,1.0079344399635963,1.0029284536695582,1.0116249948144926,1.0060580964247818,1.0052647350614516,1.0038952399299048,1.0127983365846256,1.0083751063984505,1.0010700071180469,1.0010495425879944,1.0062922795555458,1.0150857340300128,1.0158024571972075,1.0082167435751881,1.0115895517314528,1.0120749120420012,1.0107716846940831,1.0091432077086326,1.0082183306478687,1.0059414751911608,1.0053260606936116,1.0131185047581388,1.0043235344299257,1.0071752588723861,1.0139720669288088,1.0114331879616127,1.0042733226466063,1.0025361497345706,1.0130070173281789,1.0141657630011232,1.0015284722112645,1.0145945397121827,1.002397910586577,1.0009808066624735,1.0069073374619726,1.0138944533924878,1.0159528378277602,1.0138995247526674,1.0060517967797535,1.0138575050849967,1.0011006971818768,1.014771421196506,1.0047021204179685,1.0095422691556561,1.0135308231970541,1.0062017920710979,1.01382361141598,1.0034437062612565,1.0155322521666559,1.004167754868653,1.0063083106019735,1.005482654885846,1.0145334353509241,1.0092687029493519,1.0105714806006811,1.0055509889666205,1.0021287502905478,1.0010034387379081,1.0034419619751802,1.008765250491743,1.0031142728175499,1.0117385588612289,1.0152149860114945,1.00417511820929,1.006685868951658,1.0127206388463275,1.0134936378720107,1.0127502035961189,1.0012598927099259,1.0093877828767264,1.009092762272594,1.0069971952263028,1.0130601832630757,1.0070616465280327,1.015148557635537,1.0143151025717232,1.0093780049837826,1.0142989008816021,1.0144457524676087,1.0120347709116497,1.0085340075412232,1.005098320639344,1.0049039705654605,1.0101854651124147,1.014760358012665,1.0034852166691908,1.0133327358149631,1.0014804549084813,1.0149452085705313,1.0103666412380885,1.0135288952947559,1.015283639725169,1.0037007003293064,1.0077562669915225,1.002025334549969,1.0048971104581987,1.009910287123938,1.0115191157673395,1.0044244639203195,1.0089607365044209,1.0117914471539071,1.0129293571363396,1.0144800041252888,1.0013957351707643,1.0055377939783445,1.0091219399847744,1.014073824195477,1.0082402355567324,1.0019964197594113,1.0129377805358779,1.0060129549086085,1.0146836364801233,1.0138318693803976,1.0151748862873793,1.0088324850488453,1.0036539284147969,1.0122334702015963,1.0044915589668988,1.0123615728935098,1.0132954046703242,1.0104005908323439,1.0022660080820034,1.0001304330674159,1.0059506972150374,1.0022439543823261,1.0063969581691743,1.010972238677661,1.0002675299536021,1.0054010410439345,1.0155362265351591,1.0016847910681304,1.0099931943099285,1.0152742391766287,1.0090055414391887,1.0115059844800756,1.0075636086992326,1.0117543017958865,1.0148580534002998,1.0113560443475076,1.0063434802663032,1.0078636023215948,1.0152823575477121,1.0022808470195381,1.0079796889990911,1.0136246584238846,1.005494029789135,1.0129876897488588,1.0090369950705325,1.0074700475458656,1.0070255811990463,1.0087796270965554,1.0130406334826558,1.0106195378687208,1.0065772360600693,1.0059327804683937,1.0106381775236482,1.0085946735952511,1.0145765343585214,1.0044429051122128,1.0106841839052292,1.0112009629036511,1.0123438687564541,1.0108814637341692,1.0126510936839843,1.0052049567776242,1.0069409194737058,1.004724844859,1.008502854104695,1.0140057269640366,1.0101568492923449,1.0094842327451241,1.0129839332817072,1.013448767033396,1.0029498125904384,1.0029940548144236,1.0029047208640722,1.0081300838669718,1.0120422310106778,1.0156844109314458,1.007060639459753,1.0158192954508647,1.0043537452676987,1.0014350025110592,1.0010717892254284,1.0052676717840021,1.001790819935034,1.0107956792256736,1.0105767893847664,1.0099124536678952,1.0137585667791198,1.0141140766973353,1.0040543078988766,1.0111877790016097,1.0144369713243573,1.012415198247633,1.0138118704288823,1.0085568187361966,1.0110017709491095,1.0114948377200881,1.0031468862586916,1.0102680098556989,1.0075749450811082,1.0135019795246822,1.0075216825916455,1.0098649031076681,1.0016670510437131,1.0107513502654177,1.0076954891403207,1.0086414283708447,1.0158584075866703,1.0120568821720712,1.003833005486356,1.0103930180487681,1.0071650121594409,1.0037915028731887,1.0091581377883516,1.0037122979111175,1.0122641709699973,1.0139378443296323,1.0124118439058418,1.0123141062639911,1.009141554925614,1.0151945807246221,1.0128488545436638,1.0094651379534296,1.0153329319813253,1.0153738413417877,1.0136663571596831,1.0034587868300704,1.0124068540399263,1.0127221800211343,1.0132642587783061,1.0121912719441366,1.0072142980527601,1.0013808059646392,1.0035793769456967,1.0034990007076088,1.0038112025854053,1.0077343930892404,1.0039584042072998,1.0071613884640835,1.0055588490027412,1.0081208479700741,1.0029346830980796,1.0146543885136101,1.0043262215050035,1.0106164398688628,1.0131813847686886,1.0115063004643243,1.0001921315504791,1.0142147510049311,1.0147155993198964,1.0094172776731991,1.0064974229595254,1.004722488124953,1.0130208803507519,1.0095425595677296,1.0126143285410907,1.0058597162300342,1.0112370070768235,1.0099607457236806,1.0132649301573278,1.0040080606620381,1.0087491107187418,1.0120035136409691,1.0011579858287334,1.011493448724613,1.0104324893563315,1.0119108180902527,1.0075485512695128,1.0008888741354429,1.0072009484993116,1.0146402427569605,1.0054505830124527,1.0011330435713928,1.0103301387850068,1.0144205321738773,1.0029472911932735,1.0157426017816935,1.0017733914025551,1.0008792581807509,1.0048434640609545,1.0032546550614292,1.0120185168695681,1.0038765098679079,1.0040531847709238,1.005941464675536,1.0140355627023925,1.010998947667002,1.0087839397140281,1.0125924932921424,1.0071352462953109,1.0108694860745828,1.0056302248189244,1.0041249078159484,1.0105985049120145,1.0074119571228413,1.0052165125727019,1.0119541740598874,1.0024148503176136,1.0032412848743835,1.0152339329330402,1.0041141893018519,1.0140988026505844,1.0092801991360179,1.0028668559683003,1.0079166451313573,1.0100304821654462,1.0060246165985993,1.0101853750641843,1.0159844711558186,1.0009802826813843,1.0078993976460733,1.0048535205475528,1.0062563177503794,1.0004935901440399,1.0030971808991367,1.0127613645341851,1.0024923468698863,1.0146797544914012,1.012353652907408,1.0105802258327992,1.0158797331621092,1.0088491236048605,1.0136799400371057,1.0077707799588069,1.0146453899525807,1.0005943219308147,1.0158885692606432,1.0089619387819513,1.0068460089121722,1.0103397999045154,1.0085284153831251,1.000148866085329,1.0114698576478094,1.0123704547568484,1.0058142583169838,1.0062597438390808,1.0152072245889481,1.0008697966192581,1.0127936165591382,1.0061651421648352,1.0125619754302821,1.0118232581205771,1.0087716926702335,1.0083768962163489,1.0055328459717487,1.0159737424324844,1.0153505925854389,1.0024808319601959,1.0155892313942141,1.010288021396571,1.0078102425536013,1.0117940111890336,1.0091152705499384,1.001161684386711,1.009195147813579,1.0094487517481523,1.0021832112695934,1.0119890052980349,1.0103989997388312,1.0148394025037819,1.0138233838170347,1.0075843449491306,1.0147610294848672,1.0138921303484101,1.0040197367570565,1.0149977630996989,1.0056300816604182,1.0076096657531837,1.0117672460430749,1.0119980902671373,1.0007607899343758,1.010912727880622,1.0096701896418145,1.0052810169750745,1.007259428411827,1.0029542512142406,1.0110296692015932,1.0111172123803993,1.0159933807154593,1.0009242452045963,1.0151658943771851,1.0010988281344233,1.0074239358426735,1.0131498149319476,1.0072844765301225,1.0045469844333608,1.0083609990659506,1.0070584327713012,1.0100004464671359,1.0018042593555339,1.0092481532232669,1.007264163007819,1.0127420048561149,1.0056576068467018,1.0049424204827981,1.0049646020098386,1.00296007010463,1.0105725715989384,1.0067068064917797,1.012505779003094,1.0137053643210561,1.0154944431698791,1.0097706939271502,1.0092758671503457,1.0085736268172221,1.0065866597521971,1.0115476969804229,1.0121134754183851,1.0076019408453449,1.0085805228293261,1.0049748634133335,1.0125888316743628,1.0149267702351266,1.0118472511619796,1.0127730678001594,1.0064997498789181,1.0018267212301442,1.0023369579945529,1.0129325249516834,1.0029029144439652,1.0084274379993887,1.0130951401268864,1.0060865503699727,1.0103662385221535,1.0149831651856402,1.0024035302189742,1.0141973945686016,1.0124342040332386,1.0016620409766264,1.000814162971674,1.0046033290332543,1.0070008428382673,1.0133560676426101,1.013720814742032,1.0143763239204642,1.0035349105944675,1.0084721454275347,1.0064155845953635,1.0116744904471831,1.008140490674496,1.0119251596684455,1.0125082635339586,1.0103277262562107,1.0154481554334844,1.0056978356866437,1.0127633552227178,1.0065604048931363,1.0109245337337018,1.003017386676297,1.0067728894283736,1.0074691978295101,1.0003726557690404,1.0151765120756973,1.0131340381091098,1.0105641228776872,1.0047374482641529,1.0082262810935345,1.0024329311181084,1.0141138463164934,1.009274252359492,1.0033694432174136,1.0138106253668993,1.010086904737358,1.0038058119559514,1.009792055463189,1.0092096408563724,1.0012974832606361,1.0144028077357965,1.0107532056806892,1.0026321279634509,1.0158483110305647,1.006745193658459,1.0055595611398189,1.0146652227131423,1.0064775228290399,1.0020094877959906,1.0032505282202033,1.0155181943284812,1.0030931745224214,1.0154536991586143,1.006787922452997,1.0003125149843808,1.0113176360888427,1.0059199036637667,1.0140635245173437,1.0106962616004902,1.0071231274244208,1.0087873848986284,1.0105599352363845,1.0046281894012909,1.0101792031201065,1.0153292114450143,1.0135128383456797,1.0052625930786885,1.0046811285497503,1.0056709744999028,1.0071829226261053,1.0094751759671916,1.0154421360120665,1.007582567003525,1.0120389504992198,1.0112457039357805,1.0054210139284794,1.0136470070242534,1.0109205084759436,1.0103647685772521,1.0056248940663102,1.0017873834498161,1.0115521455993406,1.0128672041162354,1.0157094927766315,1.0109260874542028,1.008082723525995,1.0114565801245687,1.0012323975789423,1.0148537602672383,1.0103830524391368,1.008660025658733,1.0140123724986541,1.0034156907630756,1.0086506976035452,1.0020836266014559,1.0089781632740036,1.0053015294693095,1.0113061275449051,1.0106035670621132,1.0107782680907851,1.0118399264331417,1.0137991110562159,1.0058292325636313,1.0135604940097485,1.0025434753535034,1.0115099179012195,1.0016927565479337,1.0121712376053673,1.0148857684556249,1.0020969771002399,1.0091163719401481,1.0106054373037063,1.0142369264359761,1.010911877964783,1.0124857379634191,1.0135273255750523,1.0024775783120179,1.0033973141853867,1.0132872314224313,1.0110816187335654,1.0143326937268029,1.0035867026771461,1.0081831195511528,1.0049035968720512,1.0116004394250764,1.015886032605718,1.0106176124717308,1.0069322233377624,1.0041450909826419,1.0091149130784769,1.003302142942597,1.0142389905624138,1.0060171136054177,1.0129241330540464,1.0101021700782744,1.0077250972837728,1.0066217170240974,1.0115541220066713,1.0130363432532463,1.0155503085599764,1.0070308207944472,1.0144460929648245,1.0060993938285301,1.0079129090843624,1.0072880602443497,1.0076367945083893,1.0111406176606987,1.003783262529033,1.010876419537263,1.0052253226130441,1.0136350374485121,1.0084353675202196,1.0040785477229426,1.0075464936510758,1.0089647987827626,1.0068329502651956,1.0110193709575306,1.0033895692889887,1.0044300111788662,1.01150139909071,1.0127147098100298,1.0134643329127864,1.0031999539530903,1.0151074767653578,1.0037067770641368,1.0026629777099345,1.0031746645892368,1.0104451761414242,1.0107916688237504,1.0151989216569635,1.0106001290764723,1.0156078260045851,1.0028987150988746,1.0015418453026299,1.0093996809901586,1.0027930013503559,1.0077662194453438,1.0041689713555855,1.0057701546212952,1.0142560743213038,1.0009421154178038,1.0132127507125632,1.0081426498820187,1.0030665297231058,1.0067229404039493,1.0105883279404426,1.0077608483403393,1.0033441245423471,1.0016416000892077,1.0005655276739658,1.0028539404590762,1.0117316043440425,1.0136580025039288,1.0106989017073944,1.0135339819087625,1.0058472196858721,1.012619569092206,1.0005060599664695,1.0048275237430278,1.0001845946995147,1.013247031646727,1.010428074552338,1.0004479750188746,1.0130484717842001,1.005533590098596,1.0111216852780647,1.0135796832532713,1.0029106512315982,1.0029545134133853,1.001154437533742,1.0019905892906218,1.0150237475501018,1.0009260276690102,1.005277721720826,1.0077654162705865,1.0025541124733603,1.0078856921829049,1.0098177251678211,1.0135625282539917,1.008550832564278,1.0086445267847874,1.0102820420144447,1.0081092482575613,1.0099388191973597,1.0137217693599498,1.0033210550414748,1.0089461695118349,1.0087489863264196,1.0083154591306063,1.0030289758357629,1.0132516362322617,1.0117709325766044,1.0069370207346684,1.0077168291387839,1.0156365913288801,1.0111201588425978,1.0115401358460354,1.0084556350872798,1.008348071833725,1.0083381834378498,1.0114245257792887,1.0070557006444751,1.0072696393438385,1.0046523434857295,1.0109125429105406,1.010823384415874,1.0141445778368821,1.0117704188834471,1.0019046749396943,1.0123583522277328,1.0066591226052819,1.0041441195775904,1.0063658061764391,1.0066022562175223,1.0060971265732985,1.0053964827687756,1.0049497021080609,1.0045918282194148,1.0032480184379353,1.0096729610428814,1.0085989554332349,1.0131668738156632,1.0139088517489294,1.0151296492354138,1.0106378543532311,1.0156449731522863,1.0036271107578851,1.0056046903437135,1.0136366699829571,1.0064183664233142,1.0113780946991404,1.0078049850761148,1.0008213949262834,1.0124045712069929,1.0038872592859329,1.0102439814414461,1.012921788013285,1.0139176765237228,1.000011769725262,1.0154018060364627,1.0151259765186191,1.0138046076979721,1.0099748909841266,1.0101763449042906,1.0102886976161571,1.0143902373088478,1.0103485205923264,1.010213370929361,1.0144631602905405,1.0005904270482462,1.0099923388015524,1.0011764133341747,1.0070899441741872,1.010423715399748,1.0003249504570033,1.0021942553262801,1.0129541293352833,1.0017579019264662,1.0110272805013565,1.0039115050407634,1.0122955845100883,1.0143087730060727,1.0119336912420711,1.0033724672547939,1.0133980654971806,1.0126616143075917,1.0156835645592504,1.004925924878098,1.0096175792943385,1.0124584873375653,1.0126176387345496,1.0131374075025477,1.0027622251313009,1.0147891997521066,1.0084155831188435,1.0131998630748582,1.0018983754620638,1.0110444323106205,1.0006556115216207,1.0073753850171061,1.007533476451042,1.0148496685962718,1.0143656173472839,1.0080795233558686,1.0016531833419038,1.0159350222740797,1.0074056647539582,1.0116333081691995,1.0024841000324884,1.00645856214417,1.0099898810685541,1.0151597767947567,1.0071895570955451,1.0065946498411267,1.0150297257333529,1.012309838336565,1.0016882934927982,1.006820988899682,1.0066347257780248,1.0099060379371583,1.0145656765053459,1.015966921878019,1.0056891648081148,1.0091684589718175,1.0104148208363091,1.0048931573420641,1.0148355792307491,1.0049303277346517,1.0130307320042091,1.0117145498350626,1.0125442788415082,1.0047472341831445,1.0128586009146374,1.0138771720910742,1.0056433092207344,1.0141229759441142,1.0047872597230638,1.008035030086976,1.0081275892627852,1.0079001839502124,1.0080316156795959,1.0145001539588656,1.0068189511176118,1.0097434048577492,1.0003880817119715,1.0013829596457078,1.0067597239089872,1.0114611034738501,1.0072970213478931,1.014920348787417,1.0019949569456537,1.0055851933824087,1.0077617197141659,1.0151930071973778,1.0112990466846008,1.0047606402839366,1.0010230825241009,1.0131176188983078,1.0097594980858098,1.0008074266995179,1.0072798668778429,1.0132784456189292,1.005357110259383,1.0051289237029992,1.0060409122716103,1.0033818278286064,1.0130550116727544,1.0012243647985812,1.014880676943253,1.001167144108849,1.0121777867828674,1.0087131285952378,1.0027846031431795,1.0034713949512317,1.0079404515891155,1.0052475222154957,1.0093888614597628,1.0041198356703305,1.0099031270258811,1.0123975425933602,1.0044484974224939,1.0058715972648271,1.0064441937224331,1.0127103687151493,1.0063826951255428,1.0091238945174319,1.0137812142697176,1.0006570072152448,1.0098721740520453,1.0110543133667111,1.0087757673012876,1.0059128146871394,1.0107161849146196,1.0002399544826062,1.0091511994572901,1.0153413882225397,1.0111972349749943,1.0057262547734804,1.0043941256050657,1.0085647791961201,1.0105896193321853,1.0023728125866715,1.0055018051106841,1.0006413645957652,1.0091427071218679,1.0123925949506722,1.0052081982962575,1.0054331412975035,1.0014307379029519,1.0018012003748369,1.0085898110579739,1.0055543965766154,1.0021134514836736,1.0062086333434321,1.0129782724180676,1.0058059668518153,1.0026787640309995,1.0024831369573783,1.0148659805001952,1.0096772983636477,1.0093771799838223,1.0135780047748157,1.0156961979143955,1.0002079827210422,1.0038523091003491,1.0158260784940167,1.0135268291291719,1.0155563538696022,1.0137201652904788,1.007279712076192,1.0134932745507323,1.0046976829380458,1.0058337484852298,1.0075596275341376,1.013040831937507,1.002550912705638,1.0118386626706706,1.0004105358802871,1.0045454384399122,1.0043293207928883,1.008835758707219,1.014760353183751,1.001989551790617,1.0156494909779588,1.0152065213814323,1.0130845288475632,1.0098068782351157,1.0087254962287462,1.0077395884150488,1.0042103684671642,1.0078516411157621,1.0110473519238439,1.0035773666659586,1.0013422714809583,1.0142669568735336,1.0142381602955801,1.0118096941711463,1.0157867231947992,1.015964823827388,1.011059503792251,1.00115065568374,1.0063441171532965,1.0045802788750378,1.0086355319452156,1.0048355789976633,1.0059255461513277,1.0140897919146592,1.0013778755457263,1.0110967475653128,1.0109482302534016,1.0139162099079173,1.013456608133406,1.0089031797227093,1.0024316182972624,1.0038457684900335,1.0142412173593827,1.0067822628080179,1.0076533738034477,1.0058835352810966,1.0006960322025178,1.0066749758006501,1.008286482333077,1.0052058296209725,1.0149379975451931,1.0029260900730197,1.0107977867500515,1.0068766832537195,1.0075808869617484,1.0135074624931935,1.0045460597862441,1.0077231661032349,1.0146789461174477,1.0137456747720923,1.0024096355774081,1.0020558021964985,1.010361689821597,1.0149394644158671,1.0022149807161267,1.0112537763611344,1.0074413723469755,1.007608839373449,1.0153332981798291,1.0092288704940828,1.0145679410167974,1.003904331645604,1.000675510968386,1.008382255613375,1.0138833020367333,1.0128492956879764,1.0123282561362541,1.0055361365995863,1.0100414610070478,1.0139539258109607,1.0073358415815425,1.0063764421718531,1.0072436036792138,1.0067644530276179,1.013663313963912,1.0128210268733218,1.0147939412812625,1.0134845177174734,1.0134056210955777,1.0137067471018353,1.0067403540051261,1.0139403553015391,1.0015886261333535,1.0131961666296918,1.0148628081944697,1.0010694244635761,1.0141459801692088,1.0157779612098616,1.0147481087923731,1.0010150802724149,1.0071877336745885,1.0156450632531993,1.0136624721614897,1.0007188376706218,1.0033363713829839,1.0118459917708311,1.0073492286187502,1.0084699293391015,1.0052480929458028,1.0028802262328478,1.0051933603097691,1.0022414225182326,1.0086836536383557,1.0133893458589929,1.0115905616574143,1.0063343400785822,1.0031816942100458,1.0013556300992921,1.0159300744014248,1.0006153794664994,1.0072896508447273,1.0145182474582826,1.0098905182799385,1.0135311768019604,1.0016617807683839,1.00491602280314,1.0105767342111442,1.015321104335823,1.0056639283049944,1.015022578166795,1.0022129267587578,1.0090185644303369,1.0013051514910636,1.0031080604843607,1.0052275762303124,1.0000930306332556,1.0115350184133991,1.0159340798199223,1.009145273886412,1.0081999200089808,1.0156972656212004,1.0028984680485213,1.0124477941298498,1.0019958891911385,1.0118040570826856,1.0031905825842777,1.0034236015924607,1.002573176020672,1.0043968411130295,1.0049222623194003,1.007108456047016,1.0143861808737686,1.0061118633553943,1.0087156960916135,1.0037509962635947,1.0136720908638119,1.0044678215591962,1.0034471122868232,1.0061252067771036,1.0016236153963949,1.0048440042140501,1.0136629645493931,1.0007252629283931,1.0024818018831363,1.0125943732725917,1.0105319234057262,1.0089654629581022,1.0106098387318325,1.0047955088950131,1.0122210923251556,1.0054644127631678,1.0027778497976818,1.0072910524982006,1.0050012389948344,1.0144446340007336,1.0096405300414395,1.0122291458990449,1.0055335873986162,1.0132551967555048,1.0012917666176391,1.0122356652123485,1.0135981385867869,1.0106247702311091,1.0126040490171662,1.0086864831104567,1.0066531829990026,1.0024511801728091,1.0038464680416221,1.0019591176565452,1.0030446720433068,1.0068725818999413,1.0103806610504409,1.0153628450911052,1.0144137863318228,1.0071748940920042,1.014899118293898,1.0012021074324395,1.0109339707247009,1.0004075082472221,1.003486581491865,1.0073152665251133,1.0130288845230369,1.013470913230732,1.0041537641129481,1.0155709904172496,1.0064318034789164,1.0149454934493725,1.0156388884756959,1.003030906583211,1.0042450923087092,1.0038312347522524,1.0017322194662097,1.002677230425024,1.0089701726329248,1.002093049779013,1.0033951135644159,1.0092237041868739,1.0141940860228553,1.0130768533688754,1.0046914987746791,1.0121836286425541,1.0016690822958443,1.0022244109803993,1.0034185106969575,1.0052838043577381,1.0123932358022925,1.0096058004079969,1.0130513028638339,1.0068299463120909,1.0085122573895648,1.0118341373348745,1.0103918940587022,1.012135907492044,1.0091702988292772,1.0092034559753251,1.0001775374592876,1.0110114772892733,1.0072334974185324,1.0128381600898251,1.001279826824562,1.0060600909983681,1.0089985814088021,1.0034459684420198,1.0097890346621694,1.012697036069931,1.0044713510758581,1.0095700697674381,1.0049579929534291,1.014024770515616,1.009714920099398,1.0062928042989796,1.0152728636309132,1.0067996851929968,1.014795463990191,1.0104771656047908,1.0040327569540861,1.0130178076040073,1.0064173722557774,1.0070557623641401,1.015554690042316,1.0085906310629502,1.007976020804473,1.0128965419400924,1.005364785493724,1.0116888782920104,1.0144840900105982,1.0090975500837256,1.0130001056127642,1.0069635836522017,1.0038040591472552,1.0056580516366136,1.0140926120342515,1.0025723831737212,1.0025163876244882,1.0153491881285213,1.0017124964043322,1.0120886705789172,1.0158207357488886,1.0062937235291549,1.0106893579346083,1.0154828884755458,1.0136863520895658,1.0068852848800212,1.0082367368698266,1.012403476409885,1.0146048209711074,1.0154644468981668,1.0154602681471288,1.0067161124243946,1.0015186259535629,1.0148245999175918,1.000708096780734,1.0151596695439593,1.0109272380296161,1.0036038908085669,1.0066005890149754,1.0063638467053102,1.0150683282210862,1.0086894004218416,1.0131233889014859,1.004295717512625,1.0154556871030367,1.0113153242781996,1.0093175601573734,1.0067234314143776,1.013933536108663,1.0146825375261537,1.0002442470995669,1.005494164961807]}
},{}],69:[function(require,module,exports){
module.exports={"x":[0.80657645498402419,0.13412223406601698,0.89673401477281001,0.82665850388584661,0.12571694375015796,0.95917909338371832,0.90424209709977732,0.21882370234234258,0.62603565748315304,0.30508537985617296,0.096564997604582453,0.54174839038169009,0.27571323621086774,0.18649815622251481,0.54141270383493978,0.98295248877257113,0.94793176134349777,0.9864967120718211,0.95523964847205201,0.95801798741798849,0.15603694573743268,0.71858057354344052,0.96088685108581562,0.97129859463544566,0.94759528025519102,0.10876313311513514,0.48052189188078043,0.79012479807017366,0.79227766846306624,0.29405915487790479,0.14046748165972531,0.0047356495424173773,0.4175436728890054,0.11133987079840153,0.90657816844526673,0.63336572331609209,0.7842852518591098,0.86964633876224984,0.94989750094944614,0.49862605070695282,0.64918328904546796,0.78994932885747404,0.035354562581051144,0.35768106132745742,0.84063801239943126,0.20980508887208998,0.92465331325074662,0.67454594295937564,0.67194780659163367,0.39475113455671818,0.75016272427048536,0.73324077205499638,0.73570114639587703,0.47001109363976867,0.38830474945250898,0.41786680420394984,0.64892311460338536,0.17212652012938634,0.16947482285555451,0.29889399556908758,0.69898562287213284,0.78930711592314762,0.031514516039751472,0.31338494036346676,0.27415375236421824,0.86370453180279583,0.045709676546975969,0.14762283663265408,0.09616045816568658,0.9841278093564324,0.81522324605612084,0.81368423196952788,0.68788033605320376,0.12393093672813847,0.31392848400631918,0.75611251237336541,0.94071982496185225,0.48568314900621773,0.034101619413122536,0.65696946529671552,0.43435691651422531,0.12463766703614965,0.37774287350708619,0.208106983685866,0.75786162403877821,0.050704261350911113,0.78724790508393194,0.036076838888693598,0.18500387733802198,0.40464384930906816,0.48486675098771231,0.45340926376171409,0.4411303374124691,0.4826932374970056,0.63984988129930576,0.78603522168472406,0.70227118082810192,0.91166604307712984,0.74713981105014682,0.79945571500807999,0.27326482678530739,0.69871650908840821,0.6729056523693725,0.0027902480796910822,0.64854702376294882,0.70359683618880808,0.16098561470629646,0.63752134691923856,0.11780770253157243,0.45147249622503294,0.49338040944188832,0.76617795750964435,0.9501465149293653,0.56801711970940227,0.33698186754249038,0.86798984086140984,0.57941506935283538,0.80009373510489235,0.22157382411416621,0.017596156569197774,0.74375438957009465,0.8130335314781405,0.25254415940260516,0.81263237627455964,0.50089747490594161,0.93067328839329999,0.69208595399977635,0.40853984960122036,0.88199422196019439,0.41893346506403761,0.94969850689871238,0.57514711066614832,0.54174337810836737,0.15647700858302413,0.13723819600883871,0.75411390152061353,0.14780106611084193,0.22785450385417788,0.25493316653184595,0.80163720318814735,0.83231007751543074,0.97863638460170477,0.25173935703467576,0.32912379945628345,0.80614197905408214,0.29683338857721536,0.24108971962938086,0.013403735342435538,0.91997099019354212,0.21506546085001901,0.34648392739472911,0.8982910705078393,0.1946292918990366,0.83998311399947856,0.24857301465701312,0.94546739769866694,0.60988422479247673,0.77110873281257231,0.46855595474364237,0.97758503047982226,0.34814291679533199,0.066919427246320995,0.82252034290926535,0.78566160551737996,0.57941145092714574,0.58855852542445064,0.54422637118259443,0.72547073788242411,0.90802172782598067,0.68828055472578853,0.28298062753630804,0.67302159273996953,0.74962822761386627,0.38839726433157923,0.74619180011563002,0.5559418677608482,0.37664138766238464,0.20598737639375031,0.56214342480758206,0.52209774389164521,0.075095750370528555,0.40016643291804938,0.05341061856597662,0.34923478400800378,0.5254895779467188,0.58689563961233948,0.77137555886059994,0.35278170879464599,0.92467057165224109,0.95531670816941183,0.1286071477853693,0.15289403323084116,0.56313542227260771,0.39095912839053198,0.46469673225190489,0.38342294598463922,0.011783049206715078,0.71968517439672719,0.33375141992932184,0.38468410932691766,0.16056047988357022,0.9182179131964221,0.78634169505676255,0.43175638914573938,0.30810288825770837,0.85405140509828925,0.52324780441587793,0.61415641296654944,0.16399224846856669,0.11835170925362036,0.59596212035045026,0.46723723358474673,0.26034156964626165,0.33681750208837913,0.64753830450586969,0.52454356846399608,0.68232235328759994,0.70893970241770143,0.74067007490666581,0.97849560345523057,0.44603618342662232,0.71328852662583808,0.082983164170291279,0.90345171703258531,0.22668719875859097,0.50044352014549076,0.90420398791786283,0.55268606857862324,0.1508542369119823,0.49815812082029881,0.81755880476441234,0.4578494641673751,0.53295900825876741,0.54112604213878512,0.9861733682337217,0.44310855779796837,0.077393773386720571,0.84590647685341536,0.43825148815289139,0.59818916939198974,0.10558624548604711,0.49355874449014664,0.95227909696754065,0.97012634849175805,0.0045878834836184977,0.033974140095524491,0.76716136000351975,0.96723201408516613,0.80913019130006436,0.35955459607997908,0.86000775998225432,0.67272449666401368,0.083591491417028013,0.34277105913497508,0.3957848188304342,0.84731638496741657,0.25727170240832492,0.044608948593959211,0.79206779147498307,0.65351829924853522,0.42709968734532594,0.74244156327797095,0.90154111934825776,0.13166607077233494,0.18002855330938472,0.97253695806954055,0.26116488826693968,0.094401622528675941,0.14408359494991602,0.27984655779087914,0.13470786743564531,0.79409035451710219,0.86059928752714765,0.076781458910554642,0.57390754354884843,0.62111049445113165,0.54436160252429544,0.008012972571887076,0.14350525029469283,0.67348418880254035,0.84450080445036291,0.52859377666376528,0.61583457993110646,0.43428016338497399,0.34744286183500661,0.19755570416338741,0.5081170478300191,0.1366213127458468,0.39778995589585975,0.37850960749201479,0.075207022838294502,0.7547970719542354,0.23751699379412458,0.040066400310024619,0.12208574454300106,0.25042641433887186,0.18206871243892236,0.499723284705542,0.23755299918120726,0.8143789021647535,0.41309439622331412,0.97190589107573033,0.049157880640123039,0.81522086035693064,0.89368894958635792,0.29880903494311495,0.93533932277234266,0.047464842356275766,0.48595545363379644,0.24536912644514813,0.48436011169105769,0.53861554068513218,0.33434221309376883,0.87884887143038215,0.8910533102578484,0.34040114036528396,0.36555431398563087,0.032935882424935697,0.1100907265394926,0.16124340229667722,0.77244954139692712,0.86859027524711563,0.38584145280299709,0.20819885016186163,0.23927437196485699,0.27002550621517002,0.39987302049994466,0.48751756866462526,0.095489985414315012,0.2211857430031523,0.13065356159582733,0.48539848138578234,0.93263007805449882,0.9453939402918331,0.94657319255406036,0.64544898499036207,0.56945650768931955,0.74992859958903868,0.059181748917326332,0.43089322911808264,0.23243211085209622,0.5473523961659521,0.34962699111085382,0.052621044565457853,0.81298209995264181,0.31928563653957098,0.015249406511429697,0.40093156975228339,0.042593560628592965,0.89934927861671898,0.16730012711836026,0.8010458706482313,0.64262432268122216,0.25571293865097688,0.72440516476286576,0.12854805966373534,0.64126850240165367,0.48839358196360988,0.44641447141533719,0.37471542446175587,0.54153880106052388,0.71128525017527866,0.29335759980836884,0.28492693441221489,0.73724587717093526,0.61720122114289555,0.18706546165980398,0.80375524098984896,0.67990768295014281,0.30938289977610112,0.18167604225687684,0.38185341661563144,0.36479974914109337,0.34049045402789491,0.61936237210175027,0.80761137382825832,0.77242516231723124,0.6625922856037505,0.080314508839510385,0.37562464830698444,0.92009211133467028,0.4539119312725961,0.76795555142685767,0.30057783150812611,0.48192371235927567,0.90145933619700369,0.43149999955203383,0.48373153734952212,0.44231591189280151,0.74823199727805334,0.3032859797263518,0.10698129634140059,0.50342357191722842,0.38965395339298992,0.5056638446473517,0.86148489756044,0.80945143364835526,0.35725210615899411,0.78688309756340458,0.90794673642609269,0.63787495179567488,0.5383674480230547,0.37482329448452217,0.13874239940196276,0.80346465729642658,0.19787414129823447,0.52749733236618335,0.93943583566462618,0.34721983053954319,0.98020885518053547,0.92961154806660484,0.23767519008368254,0.867183383947704,0.01635537839261815,0.5446547798300162,0.38472902040230111,0.61625033515272665,0.7718924734904431,0.58117425443138926,0.471871690757107,0.20566487066214903,0.53473662568721925,0.29823387306416405,0.01826633496908471,0.46621410839259625,0.89118136629229405,0.22818328224588186,0.19255042981356382,0.83586570099927482,0.87713813771260907,0.19281664894893766,0.4368112295656465,0.22366256737383083,0.14635071981931105,0.16900096698431297,0.23710743885487318,0.22538765193661675,0.79165664330357688,0.43134169953642415,0.46828490958083419,0.30799126634839924,0.088924924798775465,0.91414584807353094,0.63810502816457304,0.4259053136687726,0.62673302824376154,0.18296815676148981,0.57853841087780888,0.89583215824328366,0.71938783721532673,0.96995089541422197,0.35109175163554029,0.4344812727556564,0.67360257802996781,0.11000802783295512,0.70024830845184627,0.25548405236564575,0.16070523304631934,0.40463264920050279,0.13239902072120457,0.58894711341010408,0.44506051152013243,0.25958962999284269,0.04163358408724889,0.59681465468136596,0.78939046533778312,0.70410362139344218,0.16588023179909214,0.21952926100697367,0.82290214444510634,0.11624347771285101,0.32171390029136093,0.29370911218458784,0.64922209849348289,0.31559051626827567,0.41598805203102529,0.41992508819326757,0.77409006018424409,0.50277970190159971,0.11206061057746411,0.084660632251761847,0.98359937076224013,0.25985741815762592,0.17975724929245188,0.7930044739111326,0.75530210257507857,0.028928077665623279,0.26326144763035697,0.91956560158403589,0.24169688145630061,0.72302755947690456,0.099731106483377518,0.48372288705781102,0.3408846395323053,0.57273980833590032,0.27881106753135099,0.23491073705954477,0.95895397166255858,0.45426034039584917,0.21163501119939609,0.95345765495672818,0.59986892774468292,0.5413376631075516,0.22428580650826915,0.51592447593575341,0.18800644665258004,0.22927844195393846,0.39755576344672588,0.48400876527652142,0.4091577242547646,0.6178194867284037,0.16845075583085417,0.67234418670879681,0.29606129725696517,0.39156006411882116,0.63010388266760853,0.36376228716457265,0.15005841675912962,0.97810217906953767,0.76155074710026383,0.037361474514473227,0.87512891476275401,0.87631632772972812,0.94962938915938133,0.90415395992109548,0.017885607343632728,0.7882220333162695,0.5770179206505418,0.097725155053194609,0.75918554463889454,0.25925247652921823,0.32451978749362753,0.33200327614322306,0.12777550249826164,0.6729306722455658,0.28904117616126312,0.13518760226899759,0.8386385523760691,0.7140152285783552,0.22845674860524012,0.10569424528162927,0.49695464160991831,0.64721978047164153,0.0015819248626939952,0.48923219741089269,0.012413415242917836,0.7712612071121111,0.28372071130201221,0.70788671357324351,0.097712051456328483,0.89468335718382153,0.38090765469241888,0.88201327689690512,0.35179520466132091,0.33082141828257589,0.71277122636558488,0.69175837398972362,0.06479061392135918,0.19583173131337389,0.50872059445828199,0.030235533714294435,0.41973854979733005,0.73663351567229252,0.68290324660716573,0.49502221166621896,0.25140367509797218,0.47512291792547329,0.39750436350004748,0.89567501557990903,0.26183178592706097,0.60376797689124939,0.92490808033850047,0.61148972382070499,0.46779998890589924,0.85084788108011711,0.60480703233042732,0.79743453083094207,0.48351786675397307,0.5709543024259619,0.50937437123386187,0.18109324475750327,0.24256905643036589,0.23753269469132646,0.32967518824618308,0.87764681395841759,0.49733875231817365,0.028387409769929945,0.59009735418716447,0.4850023762579076,0.30705443777376784,0.16624787242384628,0.9533675458305515,0.9688938458100893,0.230076350918971,0.70556752329692241,0.73943516416708011,0.49546691106632351,0.31930762945907193,0.46637749536428602,0.31504981955979017,0.05902267280034721,0.94294731357134876,0.67515218116343023,0.52937383506679903,0.04200682361377403,0.86308710109675302,0.070731004904955624,0.92525662338361148,0.51643333981046458,0.66044294212711974,0.095762728226836763,0.28679251153254881,0.80996707383077593,0.064869216831866652,0.80937162290560083,0.22956972983200102,0.7152151942416094,0.69767648300388829,0.14836679329862817,0.1931563271046616,0.65300920394947748,0.41799620475852861,0.5134089905605651,0.92669451332883912,0.96324481369927528,0.14079503216547892,0.64250157488510007,0.63674919451586898,0.79232727187452834,0.4680048178927973,0.44925973026081917,0.43256358136190098,0.42806759201455863,0.24187644369900227,0.81706066086189821,0.50086022088769822,0.082635114400181925,0.89787465213099493,0.13183929811930284,0.075738933719694618,0.17165472333552315,0.7067648812872358,0.38702842689352107,0.61103286749683317,0.82306594516849141,0.18719335242407395,0.79533075144281606,0.39301198796834796,0.059866469479165969,0.27488741663983091,0.39526518773054703,0.84951830833218989,0.52160706849535932,0.8998472088435665,0.41263147008139639,0.61110629401635375,0.65029129257425666,0.17901051553431899,0.62169362433487552,0.50987348232418295,0.28906423492357136,0.81638538928236815,0.42733466119738295,0.35573119319044055,0.015332251586951316,0.80795585058163855,0.97422308842884375,0.2904543610964902,0.1654967310000211,0.17039663281990214,0.10515418245457113,0.48786169136641544,0.36868564121425151,0.193371521551162,0.19613721444737167,0.85566441735019905,0.48479076635325324,0.20215519505320118,0.33609848185675217,0.61010955327423289,0.94211415526689957,0.86927004507975647,0.91112871677381913,0.38854439558694137,0.05215022394899279,0.9371114825969562,0.73047951909480613,0.16503128569805994,0.26642822727095333,0.96215862652519712,0.41860725585138425,0.55832524556200946,0.54239219009410589,0.59238522265339266,0.93330961531028156,0.12990963166812436,0.41356665932340547,0.56110962136415765,0.97322194117354233,0.5488364679459482,0.29844040085328744,0.30738506087567657,0.69408777090953666,0.11944244147278368,0.65967546177562331,0.73041291175642986,0.53373519929358737,0.24029641587054357,0.69112446190556509,0.8146305556269362,0.65986263751052321,0.18362121137324722,0.17635113146854564,0.30955016909865662,0.12673425014130771,0.87290816050954168,0.98908958607120434,0.6674708163994364,0.1694098507007584,0.73190458112396295,0.03227481670444831,0.061917807972058654,0.55558779934421176,0.13024594587273897,0.87304784146836023,0.089053379371762276,0.66248355580726637,0.0082313006976619356,0.18852893344592303,0.45194530769018454,0.36522738260915505,0.62796028745826338,0.45611867467174305,0.52446536224801088,0.97182156917173412,0.4928907339647412,0.15484090529847891,0.33243991948664187,0.84696757615311069,0.25029511559754608,0.63831689415732396,0.23133868682663888,0.37250949035631492,0.17143140137661247,0.18901445941999553,0.59002121995668855,0.42397046298952773,0.71962421229109164,0.47720184063306076,0.86879736177390443,0.11940549701917916,0.70008812938118348,0.58361240972997619,0.23241794717498124,0.22392580288695171,0.47321578884031623,0.38077293714042754,0.018029645257629453,0.57715651732636619,0.73985788655234497,0.24928805641829968,0.64817634557839487,0.28753625982441006,0.077286272859200839,0.6109199764416553,0.46804140967782587,0.26262809543637561,0.9865103163197636,0.81613250171067198,0.52677654671715568,0.97283676323946566,0.89044164602877574,0.72294630025746298,0.76517191784223537,0.34043823856394739,0.20172209891024978,0.57822863463778051,0.8980375359160826,0.10669132324866951,0.37106443570693953,0.89724506934173409,0.83960799887543547,0.87085718989837912,0.32343225326389075,0.80958295597694818,0.32346929337596519,0.25812071904307232,0.65261851355200629,0.58841268452117224,0.58089733238099139,0.022287468526046721,0.048493370292708275,0.42100672686472534,0.7622660087607801,0.30959170031826944,0.48683464924804865,0.15986989649478345,0.48330217488342897,0.17697852379409595,0.42483530499273908,0.41865683482959865,0.39078043813817204,0.093287042307201778,0.76868926341645416,0.5925384251098148,0.96500684248516333,0.46621501011773941,0.74102010768838222,0.68898981756297872,0.62815698363119732,0.69288897366262969,0.071458455990068614,0.63214544647838922,0.62702966377604752,0.033267797492444517,0.52363142622867598,0.068118041935376822,0.29320597467944026,0.31640374003909527,0.32207459034863861,0.52555563668953253,0.62480872489046302,0.64790124887600542,0.98456036819843573,0.40354300771839918,0.51088734846794981,0.81178140659350906,0.71720937437843535,0.71117535910801966,0.2431190006621182,0.95896283931797366,0.32901572428643705,0.526020568201784,0.7411230242159218,0.32189422687981278,0.67613682053284718,0.10457291018916294,0.67445865679532291,0.60484907203819605,0.078053948446176941,0.7710142183257267,0.45434692444978281,0.41921839061658828,0.69116539059206838,0.089915054272860284,0.067205983141902834,0.26380677927983925,0.068448652359656983,0.15212014675838872,0.52177238961216066,0.27819525333819911,0.25942831062711774,0.43568428865633907,0.47854141072835771,0.52187131660524755,0.12949740958632902,0.45285012525273488,0.093496360788121818,0.8666178821912035,0.11917786489706486,0.51287158381193876,0.96013883366016672,0.93418639410752802,0.74871882881736385,0.63133200995391237,0.26549461466493085,0.94811699717072773,0.71765692347893495,0.23829996666871012,0.41160488551016894,0.66936107893707231,0.46997121765743943,0.2861739255487919,0.054887012082617731,0.66509008407359937,0.6076067015016452,0.68818909255089233,0.48571299283532426,0.067312835957854991,0.89543011837173248,0.25224225343437867,0.92586212743772189,0.22179962581722065,0.9090938534354791,0.66115439888555561,0.30078701837221161,0.8359482342051342,0.78220075883204121,0.34101778897689655,0.22396513373125343,0.77271446003811428,0.44446234366390852,0.66857874478446322,0.5050078237010166,0.0066481640841811896,0.22832560614449904,0.59614877837710079,0.7047619720268995,0.38290347646689044,0.97460808357456696,0.90683132939273492,0.64866111550480132,0.0011395468516275287,0.26994031301233917,0.4578246655734256,0.46432540750829504,0.42010555654065684,0.0029711931059136988,0.4563072036858648,0.44195969358086584,0.76245812854031103,0.96123470861697569,0.31924709309125321,0.30161686504958196,0.77689190160948784,0.21295795400859788,0.46664358288282526,0.24510922122979537,0.035405103906523433,0.79838651631725954,0.17411567485425622,0.48150738756638017,0.71454045143444089,0.40342689631506801,0.46875113697722554,0.21347300110850484,0.15119398744544013,0.53484956606989731,0.33771335933357477,0.71579399506095798,0.60131532391766085,0.28085697677219285,0.1898278005165048,0.53743347629439087,0.73104257176397369,0.74836543784709642,0.2404211031133309,0.32865751351229844,0.90825009870808571,0.79374534345930436,0.26637096818536521,0.84850170750869436,0.75784502141643317,0.014742783119436354,0.18677535326220096,0.876093238578178,0.28462319272337483,0.58715607129503045,0.090202333023771647,0.085355056731496001,0.57044728625798602,0.91562718286877498,0.67652960481354962,0.9045823761750944,0.54112718058982867,0.97094920726027334,0.42147154819685967,0.89102188817923889,0.63799835145240646,0.94021743797231461,0.64114144720835609,0.92517673496156927,0.67222658741287888,0.0082410281267948447,0.629428841129411,0.77001609065104271,0.93572237247833978,0.025699288747273386,0.20684557601111009,0.58199827908072621,0.70218888112111022,0.64328296282561492,0.23386827156879009,0.32495409031631423,0.11820228496100753,0.10996856836834923,0.6012309026671574,0.12302993098273873,0.44563631304306911,0.964175908297766,0.45413823869777842,0.52789717578096318,0.6553253024979494,0.6556772788753733,0.76258265835000205,0.70117505600675945,0.34671583464369177,0.068051193952560429,0.65538950500544157,0.20389602246461436,0.41199700110359117,0.42909537980798629,0.83350986292585727,0.011080660410225391,0.82458765429211778,0.068569900277070703,0.25387658507796002,0.33963119179476053,0.60732612714171408,0.30910777956247332,0.57642667224397881,0.98281518867239359,0.53533194568706677,0.26637369272299111,0.86124161594314497,0.84849557868205006,0.26213123612338679,0.35205480584409088,0.31489333290606736,0.73930059690261263,0.11802239010343328,0.83640770696103572,0.93043117726687341,0.21496723688906058,0.63909635187126701,0.95530265720793972,0.47466859297826886,0.70507072645006696,0.63292379086604345,0.97284118911484252,0.53926894704345618,0.75230001477990294,0.64083836567820984,0.19132777096470818,0.53844707298092542,0.34906361596891655,0.71383615776663645,0.19433733809972181,0.51727035096148033,0.82374724784167486,0.98376757338875909,0.94306881919037555,0.21648986594751476,0.75969635118730361,0.10474028969183564,0.85334912118036299,0.10860048997448757,0.45110710000153631,0.062955459421500562,0.32935700097586962,0.40053419663105161,0.82987736368551845,0.44388917908770964,0.54876570165390148,0.36215801671380177,0.1196569169824943,0.75586959702428425,0.21006189221749083,0.62161741864867504,0.48632686274126169,0.76426058351760728,0.40555824954528363,0.9235250338143669,0.75191637452691795,0.96301344421226531,0.35349358345381915,0.19010806093225255,0.76406819520285352,0.13748545448295771,0.97172500113956628,0.68930366770131513,0.83770010475302115,0.0928818228864111,0.82627540923189369,0.52015035918680952,0.36352253661258144,0.52504078205907712,0.050119684603996573,0.85252841069363061,0.96580598394619299,0.48000479423208164,0.83416340044001114,0.389521793955937,0.8607657844363712,0.66471683140844107,0.074743448062799867,0.73384536608587947,0.032052307496778669,0.51485194487264374,0.60779248799895869,0.34423554536188022,0.72832348275231196,0.14849728343775495,0.60937252620002258,0.58023114466806869,0.65600377852097158,0.25952386006945743,0.94175178208155552,0.044009551238268614,0.26322863954119385,0.7473839314654469,0.91019186906749383,0.24035750613547863,0.1172125821467489,0.43797828894574192,0.30993504876270889,0.68091811921913181,0.86339424569159751,0.35563592818798495,0.23130725921597331,0.72897667428245772,0.79997790952445935,0.39076039941748603,0.55096644899575042,0.67658170525683092,0.93415638731326911,0.69700695946114133,0.49866642803186551,0.43788236032705752,0.659752656777855,0.019381852643564342,0.15143607529113068,0.3275493002263829,0.96349648698465895,0.42006640156963837,0.62742923819459973,0.26756771834101528,0.17686328507261351,0.1950832627946511,0.073401376095134765,0.81350396946072578,0.49002503232797606,0.42562219018349423,0.77812010818859556,0.87889324750984088,0.46003294135211037,0.38727116314228621,0.87420134431449692,0.76142324473243206,0.6408952103205956,0.39282359656412152,0.89420855971053237,0.80042896156897769,0.0059138783742673697,0.74752632290124887,0.68662619012407955,0.37362159037264064,0.57923874797299502,0.21385872717713936,0.10430767944781109,0.78250314263161269,0.98041669752448801,0.93981087172636757,0.22769210481550545,0.32428978073643522,0.32957875528838487,0.66455172350630165,0.68248902261257172,0.43425852566957474,0.95180653836345297,0.82516559234121811,0.22433310213033109,0.76116570769809189,0.91499899162212384,0.16558100772555917,0.86748372918460515,0.85336067787604408,0.42742708364501597,0.97997343000490222,0.46617853427538647,0.50927921871654691,0.55648145506158475,0.87543820717837662,0.82923925784183661,0.58214579758001495,0.14682579020736738,0.15320482552517206,0.63288540093228218,0.19786419212585316,0.98563775018323208,0.40288528451230377,0.63300016228342426,0.7412186589441262,0.43512314131949098,0.8173279776494019,0.028104466306976973,0.78206340041477229,0.082319392352364962,0.31533900617854671,0.52506351327756418,0.52872348332544783,0.77418149838689709,0.089051171850878741,0.72927877295063803,0.11058869157219306,0.18825935773551464,0.13492962359217928,0.2592089908802882,0.67186578325694424,0.44772232047049326,0.49022524919360877,0.45542661583749577,0.18781330390367657,0.66690077167237172,0.49005576566560194,0.17518354147206991,0.14613214021548629,0.1859525269945152,0.054424408413469794,0.095521944332867856,0.84220554746221754,0.32063586091389878,0.55495393151650207,0.16862322989618406,0.92031278044218201,0.024486731893848628,0.68970052403630688,0.82233655463671307,0.57696305786725133,0.24238010029541329,0.80724324108101431,0.14061465717153623,0.87022376532666379,0.15388754786225037,0.97902249975828448,0.2999806172400713,0.00051715135574340824,0.033236594391055405,0.85678420346695927,0.40519648788264023,0.60644080223981289,0.77529240878066052,0.98005070199491451,0.43893819241784515,0.52240327473962678,0.017313328818418086,0.47472814994165674,0.282926521722693,0.79333412244915957,0.94188273391686383,0.22556450992589816,0.16960187389981002,0.49311335450503974,0.093208332674112174,0.89184396669734267,0.2711726303701289,0.56891460614511746,0.19935029647545888,0.83672640225850048,0.74558519149431957,0.7312538887001574,0.79287062650546436,0.58012716782977802,0.58022334516048435,0.24426717729074882,0.49202457441017033,0.65975205516675484,0.58506351229967546,0.082647984728682788,0.56310360764851797,0.61970019033411516,0.18324702586513011,0.65433510871371259,0.89264007359510289,0.722454337736126,0.024217524987179787,0.88184459989657626,0.26173270933795723,0.97248019156744703,0.77469011078355832,0.76133879052009434,0.59370509770698843,0.57563202465651553,0.55065328206634145,0.91902993097901342,0.095567418755963446,0.5742894614883699,0.91751916956389323,0.016813108550850303,0.3944074039394036,0.11965097924228757,0.039503910988569257,0.85408361388137566,0.57926560979336494,0.47945354812312868,0.40908278633141892,0.83640712286811325,0.12823808012064547,0.20731103491270914,0.60284958527656274,0.54676842863671482,0.054852351676672698,0.6235845458786935,0.83981280020205307,0.031671109185554089,0.44754327939357608,0.60856628457549955,0.48016423454275353,0.35878735199337825,0.066772385656367991,0.04903725876705721,0.21879582492867483,0.48467428545467556,0.63792107900138939,0.19058528513414785,0.96607350680278614,0.12185290583409369,0.93984892005566512,0.20343922722386196,0.72910776603268457,0.14504975955700503,0.41664507612353191,0.18718145251041279,0.6788764961692505,0.042225882892962543,0.67935392275219786,0.62884594313101838,0.22895360284717753,0.27904818597715347,0.98482700546504931,0.53321071012644095,0.43123714137123897,0.68821141024818644,0.73635470696026462,0.49412485454231503,0.33467003282625229,0.53044304666575048,0.35928661083569752,0.44073133072117343,0.97998441920382906,0.1226929527008906,0.71782749520847577,0.48545371458632869,0.82913158512907104,0.84446817085146908,0.39405507028335707,0.8651881317445077,0.84317878434201698,0.26759139461908488,0.16988688589073717,0.20637674532132222,0.93792031460674474,0.55932977405609563,0.34738767934497444,0.63390870891278606,0.38102984697790815,0.41285866632359103,0.3957327271462418,0.20391575830522923,0.71118276284309101,0.93845378990750761,0.8275583541230298,0.081250491009559486,0.94136550142429765,0.1046523336879909,0.06334164465079084,0.14062071223743261,0.65788041744846848,0.16479584046872334,0.17454842040315272,0.61474905821727588,0.36724848749348893,0.56797266871668395,0.16671590765006841,0.051557116541080174,0.11207066462840885,0.92188937055878339,0.15104770812671631,0.72137506240513172,0.39156161724356936,0.73046323617920283,0.39251037661917509,0.06277045893715695,0.027684852706734091,0.85183615524088963,0.4455319448118098,0.92506107119377701,0.097558346274308858,0.97455432927701624,0.90685763293644417,0.85034942599944774,0.46165384715655816,0.77770339868729932,0.7416375070461072,0.50824364271014932,0.72203598590567708,0.17582643093075603,0.72894387702690433,0.3946036019967869,0.64998280553380028,0.13259193965233862,0.21364523268537597,0.030580653338693083,0.050977719873189928,0.92975028857588771,0.058111555378418417,0.29829300382873042,0.41719275566982106,0.29257849061395974,0.80230631136568265,0.32960692175198347,0.31365093591157345,0.4623975004814565,0.87525073363445693,0.6417164207668975,0.40501704089110718,0.024975898421835153,0.19955131917726249,0.83378454702906313,0.025244664838537573,0.55344222342828286,0.065776037920732056,0.84555894917109975,0.66963282782351596,0.34440040247747672,0.080264729324262582,0.44156638559885325,0.32611741901608182,0.053697089636698364,0.3658839784283191,0.17533645925810559,0.788888901011087,0.65617998073110362,0.17472036546561867,0.32752070825546981,0.091783342792186889,0.88950128316180777,0.059018385456874968,0.11697364803403616,0.28403756765183064,0.97853374767350032,0.70882604079321021,0.53458227993920449,0.48860642759129402,0.6998482437548228,0.89607328097568828,0.98949670298723502,0.40050752935465422,0.2849708513310179,0.066702539760153737,0.41037731073796746,0.37127440305193887,0.46019154032925141,0.84009278217097738,0.75631750755244864,0.36106101252604278,0.81002200461225582,0.14118506793631241,0.099219328598119313,0.41748255957383662,0.1763357788603753,0.86027293217601253,0.35603856390807775,0.98707098559476436,0.056137645386625079,0.52835556379286575,0.51666681885486465,0.39062069125939158,0.3324904831708409,0.32894368239445609,0.17391234090551733,0.04260146317072213,0.20685720277950168,0.84795017765136438,0.89610202600015332,0.1788861747365445,0.66863726886687802,0.32998299807077275,0.46378351725870742,0.42705071136122569,0.9030111542274244,0.32418611023575067,0.10297145809046925,0.2500643866765313,0.73809061591280622,0.13024940087227152,0.72890478152548899,0.089616499117109921,0.55624280700227247,0.94262170781381427,0.18235215816646813,0.2767489754129201,0.59123923694947733,0.57237733257701617,0.29693761827657,0.3494798840582371,0.13278170485049487,0.31379274256294593,0.21047551875002682,0.76897271306253967,0.88599226264050235,0.36647772063966838,0.070738287395797669,0.18957160846330226,0.2400616981065832,0.010914334994740784,0.053216846545692531,0.38835173458792271,0.43730483326362446,0.89760659404797483,0.013150366251356899,0.97741034197853882,0.8882194338482805,0.70183420878835023,0.19469161028042437,0.63157324908999724,0.092436809311620891,0.61484397470019758,0.30429322630399835,0.91584382325643676,0.45149708644486963,0.87194044047268104,0.10065270208055153,0.019257797668687997,0.98543582506477834,0.71320113558322196,0.32877190559869635,0.58516605564393098,0.29437334846472368,0.055946040549315512,0.061424767852295191,0.63239048314047974,0.29526153113460168,0.29350683301454411,0.04588775297161192,0.45991437924792988,0.50037385911215093,0.93845389686059211,0.75381163043668498,0.54641313233412803,0.62475929666077723,0.49837620991514997,0.088992739508394147,0.13200311175081877,0.080053797096479681,0.70599409806774927,0.7694681271258742,0.91584912573220212,0.89608339034719386,0.89451332920929416,0.52843423216603691,0.62992943780729549,0.10806266970466823,0.33854934497969225,0.81755076553439721,0.65701683537103239,0.33471674343338237,0.65301428883103652,0.29103332372847945,0.26773384137544781,0.73885029099415989,0.63585731528000911,0.010233249454759062,0.42496125031728299,0.047962864323053508,0.79419056471670046,0.6612369639007375,0.32886172682745379,0.59743330128723759,0.70340155714424324,0.52084144161315638,0.64773516963701694,0.72241235473193233,0.23824871954508126,0.7001809485233389,0.90992606990737834,0.77356328189838675,0.59779893077909951,0.28509720879374073,0.37941302682738753,0.68560666468692943,0.77232424101792274,0.55110313964774826,0.4900546933687292,0.39255558250704781,0.8762100025336258,0.060974758369848128,0.39400772602530199,0.77237377527868378,0.27515839265193792,0.33420803030719981,0.24010111423674971,0.60178725348087025,0.0014763799170032144,0.73384151208680126,0.39103736457182092,0.10376511336537078,0.19997739260550587,0.12660949443932623,0.76435401095543054,0.54404470652807502,0.60237217690330003,0.48037711197976024,0.77126637289999056,0.88157092493260281,0.49439828356029464,0.79097067987313496,0.38066609147004782,0.72699766765348617,0.82242360522737723,0.050818567459937188,0.12667762401513755,0.072156449798494574,0.2471683859685436,0.087642186668235811,0.49812107471516354,0.79036735591012985,0.12692931205267086,0.93357805372215807,0.96889975957805285,0.67687841431936246,0.71960062175989148,0.13076212727464737,0.22116503190714865,0.71549728945596147,0.67575124820927157,0.109249945753254,0.4442209452507086,0.11631792282219976,0.66533833624329419,0.63431074071675542,0.90027189764427018,0.32552607195451855,0.8303745173499919,0.6472739079524763,0.20977051121648402,0.74164014537585898,0.94155947121558714,0.57735386766493324,0.86911270164884624,0.73263200247427451,0.70197963501792404,0.23247864028438925,0.96100627503823488,0.72760796592570842,0.41868031057063487,0.96089253365993499,0.82890364044578746,0.85826099068159234,0.092386105482000852,0.085372183746658267,0.66669237036025153,0.36277225565398113,0.097386901171412313,0.36550681529100987,0.69051668578991665,0.67817819302668791,0.21379180382005869,0.59196221997728571,0.77005171663127836,0.78147030683699992,0.079929240548517549,0.3639763864944689,0.40124815295683219,0.20396758030168713,0.20541553536197171,0.085799882446881387,0.084182343359570949,0.76421457870863374,0.5139907088479958,0.20361777156824246,0.96870243551675228,0.38438891927478835,0.16442931040422989,0.5462607417069375,0.90928973478265107,0.22666371748549863,0.30170438033295793,0.63552121682558205,0.57508048119954769,0.47963556406321006,0.83543891831533978,0.15032706953817979,0.38419152813730761,0.7741126533318311,0.0059534067590720947,0.099600263214670123,0.0098206205363385382,0.29112567541189494,0.19638909380184486,0.23499929029494523,0.3894482577173039,0.5255635341606103,0.19455538662616162,0.090583744319155807,0.82690573377767573,0.40126226523192599,0.77194160506362097,0.1037977893766947,0.076431367120239888,0.11116112683899701,0.288505684195552,0.77658361418405542,0.27272540844278409,0.28865461175562812,0.61548893176484853,0.59749810448382046,0.91195947992848236,0.95477844164706771,0.22316418213536962,0.42816014630952848,0.28194760088576004,0.68780467665754264,0.083787419556174428,0.7505182844982482,0.32451910382369531,0.42831590595887975,0.051577850226312873,0.64894305489957327,0.60477551528485496,0.10865750150056555,0.53912702260538936,0.92442225148435686,0.34442475297488273,0.18558619608404114,0.5216969125438482,0.26351705005858095,0.98986268353415652,0.78985195429762822,0.8466968709812499,0.48272773101925848,0.89393381982576103,0.76126868139021098,0.12751742493594065,0.39204667875543237,0.60965989161981271,0.27020940074929967,0.82203809168189768,0.036862286436371502,0.97795251966454089,0.66656196112744515,0.63916239493992177,0.42526881534839051,0.74282897685421634,0.44722183927427978,0.74979819796280933,0.60375859498511997,0.65997773654758929,0.058809264516457918,0.53462722720345479,0.31265332225710152,0.7229521593963727,0.76499490702990447,0.77194437316618858,0.68946866081329061,0.48376056335633622,0.12407885952852667,0.58782108137151223,0.12884992990409955,0.95750142430420959,0.091428817750420416,0.077593892980366938,0.0077420945232734087,0.034817456637974829,0.41887828948907552,0.36848922832868991,0.64901744860690092,0.077134274546988305,0.71569329527439551,0.7763455356960185,0.52589720358140768,0.47234871649648996,0.10772975771455094,0.43624587832717227,0.62544871278572822,0.27897519487654793,0.12523486862657593,0.51163695958675814,0.13296027247561143,0.36418198973871768,0.097608152527827771,0.11671257324982434,0.14060697176260872,0.59263874548953022,0.16656878584530205,0.016416869040112941,0.19428643373306839,0.46309940868057309,0.31430497891735287,0.10544299842556938,0.31326471057487654,0.33534182543400676,0.21538767591817304,0.086023062646854664,0.24853142880834639,0.20310637954389676,0.88399317948846146,0.5126012349966913,0.69619098902447152,0.47201141320634632,0.55018056464614351,0.034838315255474296,0.18258932801429181,0.84460768193006519,0.20991053170524537,0.94110772259300579,0.076573337889276449,0.84440610763616863,0.90466240312904123,0.97049731549574059,0.69964805939001962,0.85368434672243887,0.5522110742563382,0.81309395213378588,0.31029469349188732,0.90943792081670838,0.16454152977559716,0.59224943303503097,0.61627228081924845,0.81850670459680264,0.97805538455955687,0.53223007273860279,0.16872769747395069,0.90400712071219458,0.25521432705922054,0.16610448222141713,0.39283132692100481,0.018699730304069816,0.073254821556620303,0.84793513506883755,0.67725510239135478,0.83296294772531831,0.39836444816552102,0.78030510300071909,0.97300684883957733,0.72222334880847483,0.39816213995218275,0.72720200082985686,0.61446522893384103,0.58059875210048628,0.15282610880210995,0.5575975999329239,0.37753175157587976,0.91499020325951275,0.15952262881910428,0.59918480556691067,0.7505313074192963,0.10030893089482561,0.8624000132759102,0.61282440911047165,0.34726897340733559,0.72648192628053943,0.67868035135790705,0.28805453695356847,0.29120714830700306,0.31543861476704477,0.5253230137308128,0.56815389103721825,0.82409915161086245,0.63485110550187529,0.5915152932330966,0.054867456033825875,0.33195821708533912,0.9701156354346312,0.29623276909813284,0.78459139837883407,0.448066613052506,0.63278844035463411,0.41841919590951876,0.32108309837523846,0.35601025107549505,0.96295225275680418,0.55273600575746973,0.50018261132296171,0.73511990732280541,0.91222896666498854,0.4200914378114976,0.56391569066327063,0.42506222785916181,0.44188313960563391,0.12362402885919437,0.95482082779984923,0.024189675233792514,0.11899477274157107,0.28728340521454809,0.97507459886837755,0.31434537537395951,0.22767011811956764,0.64715323444688688,0.59102597019402314,0.94736656315857548,0.56464426337275653,0.92637355933897192,0.75699725064681844,0.45330747439060359,0.40806078483816238,0.23807361729210241,0.055325952842831608,0.75625896134180948,0.50094169101677832,0.75173410826129838,0.170320858634077,0.73324158503673975,0.52373571378411721,0.73625145551282911,0.52917187191545967,0.10486120960442349,0.67585810171673077,0.67474482314195483,0.4677034699707292,0.45862797313369807,0.32750627973116936,0.21004157067043708,0.37076980946352706,0.097533555517438794,0.13654662722256034,0.81533872957108544,0.72209583238000052,0.17325963965384289,0.32600640793796626,0.16193420719821006,0.65390170139260595,0.65932734884787347,0.063106141565367577,0.88544547698227682,0.89831181894522161,0.51139262849232181,0.10361156584694982,0.69567528914194554,0.098258894279133521,0.15205447549000381,0.38859502865234391,0.94392249427735808,0.65901269471738488,0.53547523977002132,0.4906424185470678,0.67293656273279334,0.45776821877807378,0.036197386540006843,0.20917348572984337,0.8011118148313835,0.40540778868366034,0.74113268733490256,0.10664725973038003,0.11898514811648056,0.48442789136432113,0.51979471805272626,0.11070478246081621,0.32257529144408181,0.35501276765484363,0.54098494981415568,0.28775576973566785,0.39489194543799383,0.3245255288458429,0.4109424512973055,0.25643844936741517,0.1789303820882924,0.53975514147430659,0.25283287694910539,0.068935469607822597,0.020330423929262906,0.017168096902314574,0.91443886103108529,0.13356999841053038,0.64716288557974622,0.88757448669522998,0.92328743108315392,0.7348993576155044,0.16187724684365093,0.59762657196493818,0.91188628206728028,0.94335651468951254,0.78671130670700218,0.90502121989382434,0.57162025387398896,0.23992795880651102,0.43563523868098852,0.89304700910579415,0.25503759976476431,0.43870224584592504,0.74442692900542173,0.55705545889679342,0.22638279114849866,0.34762569375336172,0.063545219935476779,0.036311305866111067,0.75965621335431932,0.55814550237497318,0.66449016370810565,0.34371718686539682,0.70806038625072687,0.76400465147104113,0.63564021757571021,0.62388755457010114,0.41485780871473255,0.88368261101190004,0.38685445871204138,0.85337360997917133,0.80797870258335025,0.33423595912288873,0.31425358358072114,0.65714409271487961,0.80639437012374404,0.67751778331585233,0.78118278167909005,0.39608023408334703,0.84374125614529472,0.018208184991963208,0.50058025344042112,0.0040451396838761863,0.62930477762594816,0.38639553639572111,0.94138546638423581,0.98994216166203841,0.43952451775548979,0.19806388690369203,0.05941863386426121,0.62176230158424006,0.85808239147765564,0.91028775250772009,0.62487684732070192,0.84425460490398108,0.35152291271137076,0.81956362696364526,0.98703323576599356,0.91437505821464582,0.22192978380247949,0.27311094780452549,0.64592656024731698,0.63855962671805178,0.59894073839765039,0.41400628306204451,0.3833729730779305,0.98212558284401896,0.14076528583886103,0.46603809772990645,0.02488363617332652,0.66858257849933578,0.41690112687880171,0.92399684536037963,0.18225928370375186,0.56539195141056553,0.71851751801557839,0.43395889337640253,0.36665905982488767,0.31684567686868831,0.83314448122400786,0.90630925957811992,0.72688738818978893,0.97228702369378883,0.56531561572104694,0.27690803447272627,0.17508651128271593,0.019579439016524702,0.9478101870347746,0.33293567077489572,0.26266880998620762,0.87728602478513495,0.91533508915454154,0.11015261457301675,0.22153270457172766,0.30895660229958594,0.36982817145762964,0.51957659737905482,0.086625350501853979,0.11818135327426717,0.63371538037899877,0.75326771545456717,0.17881071864394471,0.30952670580474662,0.04460059841629118,0.28609709174372255,0.71594174314057457,0.32255223982734604,0.34396326724207027,0.40754055166617037,0.65401065569836647,0.26072093569440769,0.38002991838846356,0.48155418438138442,0.62107303597731511,0.22444151890464126,0.021433315607719123,0.92198789209825915,0.90146429245825854,0.04410150023410097,0.7925530685065314,0.96671021626330911,0.73838901063892992,0.77516566061647607,0.80498168699210504,0.44601855115033684,0.37947325662709774,0.21182300176005811,0.61110644107684498,0.10206701762974262,0.5697399073163979,0.53954054241534322,0.52475118537666277,0.53072631029644979,0.27231905425898728,0.66125555921578782,0.24614267338765786,0.080024992141406986,0.44712237843777985,0.64030954975169152,0.22543570060981438,0.14428506620926781,0.79640508803073318,0.39906137198209762,0.97624319754308087,0.90925513292429971,0.02969202879583463,0.41921204650076105,0.53030754655832424,0.63589230253826823,0.08620644316077232,0.60949762765550985,0.79407052232651043,0.79165059791877868,0.97925345733761782,0.43831734497565777,0.066276797794271258,0.69324448341038081,0.93000437522074209,0.81087343253195288,0.017995756343007086,0.2627072741417214,0.67700022812001404,0.055148333504330363,0.77589911144692447,0.70041199669009069,0.52879618998616928,0.79265891610179096,0.87650584974791856,0.95763228163355962,0.8900148483621888,0.98213129930198195,0.61967824973864483,0.041815325960051268,0.13649029821390285,0.91403018269222225,0.21562358422670513,0.062192248203791677,0.18031966231763363,0.37767469667829573,0.041401669462211431,0.12644180053146556,0.10587224333547056,0.43476895027561113,0.61027905362891033,0.0085165323573164649,0.93026439407374706,0.86526327274041248,0.35091117011150347,0.8781439812225289,0.40652279602596536,0.51331040517194193,0.97450592263368885,0.30271992614725607,0.93612339998362581,0.39243151185801251,0.66987823144532743,0.39861382495611908,0.97841924217995258,0.22269981627585367,0.75916307204402977,0.54578654284821826,0.3333322754013352,0.28303627679357307,0.65575804113177583,0.36751923231175171,0.24172363793710247,0.048965113149024547,0.2925521783111617,0.80600161373382428,0.67337658524047583,0.61508556811837478,0.52256836397107687,0.30770421763882039,0.40747757981065658,0.22680586251430213,0.59661183521384376,0.42650571232661605,0.743014851633925,0.71727157082408666,0.57769783984869716,0.8534474922018126,0.54627458659932016,0.67529051783261818,0.57773491107858721,0.57144247410586102,0.5067017183010466,0.79394872350851076,0.081766800801269704,0.16541879193624481,0.71237443526275457,0.6311193796154112,0.98619454909348858,0.9816651424393058,0.35098895773524419,0.90028342322213573,0.96154622929869216,0.46914974651299418,0.34298427310539409,0.60404712052317333,0.87767842113040384,0.88883625741116701,0.45014791431371121,0.7053558089747094,0.40929301552707331,0.42131744263228027,0.21555474839173258,0.52238098078407347,0.12439804302994162,0.22630332777276635,0.30582544126315042,0.88563555474160238,0.71884338908130307,0.1076971460133791,0.77504334570374334,0.9404090264439583,0.68684973636176438,0.39409930713940411,0.0097042313776910302,0.027750755168963224,0.83478120225481689,0.44259597223252056,0.91310868160100656,0.20385797159979119,0.76324467212660241,0.88195613098796455,0.042233254357706758,0.931005469460506,0.37440427995985376,0.075217235013842587,0.69729622721672058,0.13714548197574913,0.72221791448537265,0.50885438608238476,0.22203429701970889,0.85841572252102194,0.26636418173555282,0.79820777304936197,0.66630085015436635,0.83164550055284048,0.47271727452054618,0.90745982259744773,0.61747924476396288,0.81628921333467586,0.23408048101002349,0.64961428185459225,0.17535251397639512,0.89455788992112506,0.82134695439599459,0.27577192464144901,0.75925245116930451,0.81599928841693325,0.92513348557753483,0.67646464395336803,0.10681001074612141,0.70966261813882736,0.18040522755123675,0.77307216393761335,0.098104325865861028,0.65563811076572165,0.48486615974921732,0.74329901883378624,0.19131288097472862,0.20011957313166931,0.88693265593377868,0.56309502281947066,0.098098750936333093,0.64212299461942168,0.04372391320299357,0.69082727777771646,0.55172220069682221,0.6311459450097755,0.76477011354407298,0.80103896341519432,0.30882065156009048,0.78144518853630873,0.17719265424180775,0.71812329171225431,0.33556612264830621,0.026836688700132071,0.20804417687002569,0.94356722263852133,0.50505099494475869,0.13500331334536894,0.8973006837931462,0.20682552807033061,0.62263470475561922,0.12941823802655564,0.10051854787627235,0.86267923735314977,0.38694620394380763,0.88004379485500972,0.054070456170011313,0.006305839300621301,0.49627008401323108,0.68840319902636116,0.42740396057255564,0.8116031376994215,0.98758474418660624,0.64786780759692186,0.80348655386595058,0.45552694267127664,0.4807951487135142,0.72578675382072111,0.88550327659584582,0.56128532707225531,0.13617113130865618,0.43933440104126931,0.38610486787743864,0.52042379535036165,0.91808265972649683,0.56024608630919825,0.90831889190012594,0.63449493674794211,0.70643827422754835,0.5900743837072514,0.6121540045877919,0.75952920195646578,0.3398550118692219,0.67132569807115938,0.9266670591174625,0.13287251885281876,0.12352630186127499,0.24832262480864301,0.7232795112091116,0.3280411223717965,0.6400126625108532,0.18163160440279172,0.82482046626275407,0.58926913508679712,0.39429940114729106,0.76655852216994391,0.74232399164233354,0.34088164922548458,0.82686830434715375,0.29242112251929936,0.31923579156165943,0.89490025665611028,0.54673900363035499,0.47157155458582567,0.96933784102555365,0.56814923996105793,0.54381544705945994,0.27000228010816502,0.32711937787011264,0.15736763342516497,0.61327684025047347,0.68962237452389674,0.35703020501649008,0.19169007638236507,0.74894445072859528,0.1377566533908248,0.40976174640934915,0.10562927635386586,0.4874216550285928,0.29944449369795623,0.68779580370057369,0.29148892542812971,0.96300654896534976,0.0039815120492130516,0.32447741494048388,0.13677328017074614,0.82942514967871828,0.7365347260585986,0.73168150418903677,0.17082705213921145,0.9446327120857313,0.6443884209170937,0.031603404195047917,0.79577164962887759,0.35330029525794088,0.51389334857929503,0.65602730174548929,0.087633249631617213,0.27868654094869272,0.69039434967096891,0.22807923556538298,0.85637082910398021,0.70401726461481307,0.45080142278457058,0.61832718333927916,0.88028272873722013,0.58470256361877548,0.52669397386489436,0.65383358541643244,0.32018378958804533,0.047079132192302496,0.17931454304605723,0.34529695630073548,0.55354382493998855,0.44682717639952896,0.24705379749415443,0.23849594505736604,0.37353473155992106,0.70789456701837483,0.10131918368395418,0.84762046710820871,0.97704736902611333,0.2786926220613532,0.25079563183011488,0.72374031972605735,0.41385509565705431,0.13638526198687032,0.43231091345893219,0.82835554876131934,0.72496408268110824,0.13721570105524733,0.3800029908749275,0.58232729097129776,0.29230169971939174,0.36249523172155024,0.84032301804749299,0.79869195173727348,0.12546085403999313,0.49874297509202731,0.47216107514686884,0.48469839392462744,0.77725992486812179,0.86827822878956795,0.98806066489778455,0.34961039332905786,0.78652294826461,0.44494912656722591,0.027026533191092311,0.95389498197007927,0.94971992978593334,0.04187481769127771,0.33213815066730601,0.96322875275742259,0.04655061868485063,0.18731477367924526,0.59987836958141993,0.66044909123796969,0.96431660208385439,0.58057521573733539,0.68448581664590169,0.66836129325907678,0.66773966303095222,0.35741182722151277,0.1988035004446283,0.61407564241206269,0.20680584708927199,0.80303937011165538,0.85471584122395139,0.0190649031708017,0.85688200491713362,0.083034769494552171,0.71390880288323388,0.96505365451332181,0.019966466501355171,0.6448360384767875,0.37090456643141806,0.22892543707508595,0.31012843284755948,0.39945623147534204,0.49332223549252374,0.12080031068762764,0.72189152847742666,0.26575443436391649,0.70779171964153642,0.25526771278353405,0.12475515753496438,0.32834858298534525,0.79260715173091734,0.15071167720947415,0.32747957810992373,0.34452758490806445,0.40955694462172687,0.12044187425170094,0.32588307650992648,0.87531152493786069,0.60925806104438374,0.093335604309104384,0.31076839746208862,0.92074021890526636,0.77600623210659248,0.39502976485993713,0.66374391423538326,0.046927450590301303,0.53205657870043066,0.33894976856885478,0.71441896379459646,0.72860649236943575,0.722484836652875,0.78673533334862444,0.63308706327807163,0.53945684148464357,0.62983701098011802,0.67936122990678993,0.10098997632740066,0.8846963722771034,0.11357562476070597,0.054243869762867686,0.5505189964757301,0.30062476455001158,0.46229353609029206,0.04572963804937899,0.73616833060747011,0.19352199555141852,0.090804231329821045,0.71296414183918388,0.78909411655040462,0.71453573858365416,0.54018184947548431,0.86902108042733739,0.96076365450164303,0.57660863493802028,0.20374686417169868,0.069977490229066464,0.89177830257453028,0.9135171245969832,0.72776531949872147,0.79236836882773787,0.78207206061808388,0.28308738953433932,0.39350854048272593,0.53822659519035365,0.90001156069803978,0.97492847997928034,0.11343900072388351,0.70852128835162143,0.14767496934626251,0.83057990507455537,0.21256043313536793,0.42892795835388825,0.12918729819590224,0.465918469321914,0.068662492835428565,0.55510628318879751,0.08863513218937441,0.26640062438556922,0.5907761515304446,0.74152828236110513,0.94737410381203513,0.49884889737004412,0.11963704145746305,0.64034156652633101,0.84701511956518516,0.30466812060680243,0.81400819608941677,0.13733739130664616,0.46731503964867444,0.47081720549147577,0.66587727836798871,0.3588346872618422,0.16236601391108707,0.78023229307495057,0.7582842562976293,0.77249286592472344,0.23917552956612781,0.66182708906941112,0.53198641701601446,0.13216881711501627,0.71574247479205955,0.021340328429359942,0.20342286962550132,0.55424230026779697,0.57828327245078981,0.29781082912813872,0.14303299434017389,0.93001561728073279,0.4526533965789713,0.97109459799248721,0.41297685086494312,0.28375418254639956,0.39190528262872248,0.79281208605738351,0.44643359780777248,0.88715024022851141,0.61805070016533137,0.59155131037579844,0.55450550143606958,0.87517656282288958,0.77499925544718284,0.93429422863293443,0.2982251543132588,0.54366650497773661,0.79826147848041729,0.72110295301303262,0.69516719606705013,0.57099071395816281,0.34021286075469104,0.025598900138866156,0.020398654234595595,0.44206566979642958,0.38313507576473055,0.639838941427879,0.31438230922445654,0.51599092538002878,0.1332376753538847,0.36858953326474875,0.43110621650470421,0.92776331716915594,0.73893854411551729,0.82123749943915758,0.0092777951387688525,0.84059461779892442,0.9873037514649331,0.36880889888154345,0.27870791035937142,0.58725272830110042,0.9607661775802262,0.86382703826297069,0.77969275763724,0.92416658981703226,0.9683874626015313,0.66177963440073651,0.15241295733489096,0.20470869579585269,0.38405800343491137,0.64731208282755692,0.90891445968998597,0.071331033837050195,0.49867414271458982,0.40265964600490406,0.45514588865451516,0.66026221792213613,0.11748035394586623,0.92438840567367153,0.59356063797371461,0.80284052657894789,0.84006123608211059,0.47970279283588751,0.15049862343817949,0.74918171439087022,0.63437991631217305,0.41287697973428295,0.70244389692088594,0.96206813292112203,0.080434516423847524,0.9780949551262893,0.71347427024971688,0.85550605486845599,0.0033482608152553437,0.38499493181705474,0.85043701319955289,0.45019440271658823,0.97611652360064904,0.24422032792121171,0.19173326606629415,0.77657886399189013,0.33307332515716553,0.87400923052802681,0.60817424620036031,0.90457456445088613,0.90110691333655268,0.55270207419991491,0.024982940037734807,0.59287942404393101,0.12104359138291329,0.14738795774756,0.15423926746007055,0.89071634557563806,0.73789646079763771,0.44588964433176442,0.099902603910304602,0.2036156207509339,0.11414494594093412,0.89065447482978921,0.92968761637341235,0.75495968397706747,0.49532578462734816,0.87366144514409827,0.16867380925454198,0.28210071413777771,0.84783219410805033,0.66649372966960074,0.3288590140454471,0.6576371028693393,0.52177746435161676,0.12158684574533254,0.44107294233050198,0.40324523719260469,0.31207596576539798,0.2725340841268189,0.15210214959690346,0.70950304252328356,0.3117855176073499,0.28055053313495593,0.84439157699933276,0.88723686600336804,0.39851115737110376,0.81831310268724333,0.92969189380528405,0.38612624627770853,0.40556108195800333,0.49292390970513222,0.76147504944121469,0.68785714198602366,0.35947334124008196,0.82602531304350124,0.6348505216394551,0.60353339304914699,0.86092565002385524,0.56898978632641961,0.91804444889305159,0.32278175261802972,0.40931026931852099,0.45186035259626806,0.92033206634223463,0.7066576301632449,0.43360635826131327,0.87556099462090065,0.80059436543611806,0.71364711772883316,0.34943481485825034,0.018426647961605341,0.33219585393089801,0.66802870074519882,0.32256695117801426,0.43412373550934719,0.096006327015347781,0.43344197736354545,0.71304720496991647,0.11586645241593942,0.0063315204880200326,0.80653487028786908,0.40628167859511449,0.32160687943920491,0.89241605298360804,0.24376583378529176,0.061675062272697687,0.33928608876653016,0.88578091527801006,0.37193521521985529,0.45494938979158178,0.54108825266361238,0.33400309644173831,0.55630095052532846,0.41875902757979927,0.39186400473117827,0.21563187770079822,0.39414957439759746,0.096364239058457313,0.51021354564931243,0.24577265559229999,0.65095523634692654,0.44621432416141033,0.94140604793792593,0.42747445418033747,0.71512502910336484,0.4130401020892896,0.39607894718879832,0.43693798579741266,0.8235526296473108,0.15163249416975305,0.13299495823681354,0.010013663708232343,0.059862104917410758,0.74176534525584426,0.083404576380271461,0.94284704505465922,0.16225933535490186,0.9001418560626917,0.32097772284876552,0.073466273797675966,0.29870951094897463,0.50803821741370481,0.011564184471499175,0.089399321659002454,0.53450604497920717,0.031802254181820901,0.094418967829551545,0.11657108169514686,0.14504970884649082,0.14842326106969267,0.624829790268559,0.84419768696185205,0.8507272117235698,0.2435368375503458,0.96447941187769171,0.9041807901626453,0.56513003921136262,0.78250516160158434,0.98688170698704192,0.9469964672229253,0.54800615611486136,0.34463425401365383,0.51030386799015104,0.68018855120055377,0.32737524698954074,0.58168412260478364,0.42570178125752134,0.41211296152789145,0.48688818871742112,0.96513757833978164,0.070326718788128351,0.0064764562086202203,0.87886182612273844,0.55965043899603184,0.063987253115046772,0.73589541422668847,0.43182310389820489,0.7385950285568833,0.8183632113598287,0.2733871324779466,0.39058933464344592,0.92560562812490388,0.60734013246372343,0.79947354321135211,0.81045432626735414,0.50587417388102041,0.87737268605735153,0.41280456235399471,0.92180051536532115,0.15415993892820551,0.18887680134968832,0.98313347413670271,0.2559964318620041,0.28368687862996012,0.88888702993048352,0.26574471661588178,0.58742824315326292,0.77504798225825655,0.49880168449832124,0.060209794873371719,0.60668149278033523,0.70302168906200679,0.81122802211437373,0.61877776124048978,0.52657027616864072,0.86837593896081666,0.20005434673279524,0.3406700197281316,0.4493545328755863,0.710508779080119,0.42363181333523242,0.44020697363186628,0.9563922276953235,0.17926464459160343,0.61385450515430418,0.59470473448047412,0.68843605482950809,0.41625905616441738,0.71296296881278975,0.010944153468590229,0.34342623782576992,0.29158586479956283,0.51182051366893577,0.63426499038236217,0.55112768676364798,0.69147579218493771,0.15493026644457131,0.74482574945082891,0.55643548413645472,0.43952624652301892,0.6878552534803748,0.86235350343631578,0.42219098494620994,0.095090432662982491,0.82790771268540997,0.8482113091391511,0.7240731966798194,0.30575193199329076,0.35643073343904691,0.47344240675214677,0.4496702503133565,0.57385776933515442,0.38252600053790958,0.30807985415915029,0.76779909589095041,0.022492484680842608,0.72692839686060329,0.53580252289306374,0.42597506137099117,0.76684326954418791,0.68681504691252482,0.29146138039883224,0.93576135272858663,0.71548082813154901,0.77639027135912331,0.55261906777275727,0.69851613709470262,0.73169948129681872,0.10824089641682803,0.21934984213672579,0.38603134662145749,0.87227945962222297,0.58499568145489322,0.37566221673041583,0.45478624576935545,0.32330550002865494,0.049836583246942609,0.64117603431455794,0.22640070371562615,0.93951312793884423,0.82584717253921558,0.49253523274557665,0.015488248192705214,0.10789620345225558,0.85507375303655864,0.9471457647392526,0.077288359135854995,0.91587360438890753,0.66235216302098709,0.37222188890213148,0.49520921314135191,0.46023198634386064,0.21581386183155701,0.38247151255141942,0.56589956734562297,0.94328063769964499,0.12096726237796247,0.22095860853558405,0.66445456815417858,0.89303510504309092,0.59358969325432553,0.010571965032722801,0.055416396658401937,0.66009206340182569,0.055779581672977654,0.92817571742925797,0.15097563350340351,0.016854057982563973,0.019424857003614307,0.0021908753877505661,0.43082379098050294,0.024359003864228724,0.82389926182804629,0.59921527405735109,0.61121626944746821,0.10107667678501457,0.51492812405107546,0.38508644516346974,0.8552295438037254,0.17181124963564798,0.096720941655803472,0.59989925078814854,0.89897167798597366,0.61095129410270599,0.10693653140449896,0.27037565102102235,0.51182679554913191,0.25258617882616818,0.14172446737764402,0.033239662146661429,0.55377686879597599,0.33461078012594953,0.0045338269975036382,0.71409111870685593,0.75901517183287071,0.94394042851170523,0.84022213893011211,0.10678947068285197,0.90765305408975105,0.86677541117649526,0.97709859425202006,0.4450468680867925,0.50008177046896884,0.25842036816291508,0.26870740441605451,0.75179432446137073,0.099743002017494295,0.79685612186556676,0.50277034258469944,0.23898279688088223,0.57975303579820314,0.34429480336373669,0.75525822507217522,0.7263211603509262,0.082133021070621912,0.26975364392157641,0.65498023104853931,0.88012112009106203,0.51180922020692377,0.76977104592137036,0.16933754188707098,0.28825801381375643,0.92917228667763996,0.14568061471916735,0.58457834798377006,0.45371453183703125,0.43622833295026792,0.7224280332704075,0.93249974189093332,0.77870502239093187,0.64935467951931058,0.71152675093151629,0.4474262519739568,0.27351478075375779,0.83130044639110567,0.016289561446756123,0.52729726878460492,0.37769405887462199,0.5483481978415512,0.5337005441891961,0.67326487550977621,0.33551528005627917,0.3635180044756271,0.82786985613405706,0.23689770085969938,0.49008998604258525,0.57313425200292845,0.83524783764034505,0.85821818040451037,0.90164823977742348,0.4027089921757579,0.55369548879330976,0.11148898783139885,0.36311356184771282,0.43940737762022763,0.77987365909852091,0.29718255789717657,0.30885041333036495,0.39737298754043876,0.56236887522507462,0.82502993157366289,0.083816899191588162,0.39959238159935923,0.072420218463521452,0.38627417184412477,0.92679699812550098,0.35684440146200358,0.52414183516055346,0.13885280471993611,0.65435888041974977,0.25752888746559621,0.63159098693635318,0.085946950083598497,0.588360009896569,0.42510335777420549,0.98297786316135893,0.25470995360054077,0.81707037330837917,0.29457982946187256,0.60878101409878582,0.42060982235474509,0.73327664766926315,0.11801518990192562,0.51542543284362186,0.49011625109240414,0.71324228900950404,0.69934315965743732,0.12164171037264168,0.24113763737725094,0.67570915295043965,0.77721937743248415,0.71077657992253085,0.07334867611527443,0.66800743344705549,0.38994459378998725,0.65967385402182122,0.0033601805521175265,0.46809375191805885,0.21847012397367507,0.056778492133598771,0.0012875655409879982,0.37234091477701442,0.18728786990744992,0.61845386511879041,0.14105921780923381,0.11315526156686247,0.26539523588726299,0.52833283510990436,0.1731431421590969,0.64805037881713357,0.13726248127408325,0.94712773415492846,0.59289675413165244,0.94591341511113569,0.89204732208279891,0.88820198320783672,0.92998596522957089,0.89709282254800204,0.21897261745529248,0.14360854784259572,0.47784466462908315,0.37257834901101888,0.37225100342184303,0.6753435326786712,0.51854223519796505,0.52798187179025258,0.2622238630265929,0.70840359685476872,0.06767364679835737,0.81574988373555246,0.43196381036192177,0.0042167555890046064,0.17211450796108693,0.67421926190843806,0.0258460380602628,0.7337896011164412,0.94513148641213773,0.90885883970651771,0.42629055176395925,0.57443549739662558,0.95194298837101088,0.020686636017635464,0.7547903362149373,0.8288023247569799,0.0072751772333867846,0.59109542999882247,0.67323825318133457,0.27202101542847229,0.69889125083573167,0.31201977644115686,0.63867750307777893,0.0057813215511851009,0.54678674850147213,0.47704218019265682,0.21592764124274252,0.16679300146177412,0.7646425496321172,0.37135419950354842,0.22574804234085605,0.50816820044768973,0.36715606804238632,0.96620926023228093,0.88201953273033717,0.16610953252762556,0.84781313502229749,0.85828327403403815,0.39840921010589225,0.71966594520024951,0.31483892743941394,0.40686707316432147,0.60254907776601607,0.67332860387396065,0.90109327428275721,0.35974450810812414,0.90000720881391316,0.29259621785720807,0.58567846349207686,0.4564486883254722,0.32924569231923667,0.68343680765479797,0.8445329943322577,0.1504698929353617,0.43797391769941896,0.075212472144048664,0.89531192414928229,0.58485823659924785,0.032847613398917022,0.47845137789845466,0.5271022140188143,0.80011756443651394,0.70933237006422134,0.95618840277660633,0.17750882669119164,0.10293169966433197,0.33316759738605467,0.6912290857639164,0.18583582227816806,0.46921368693932891,0.31870791654568165,0.10716932608745992,0.39981814780505376,0.21668173332698643,0.543080635573715,0.41992670747218652,0.048251206611748781,0.18726151473121716,0.54720481404801835,0.10679237939184531,0.27206329416716474,0.38191978607559574,0.23908672554418445,0.08275937129510566,0.24071372721344234,0.54855862204218286,0.15261786169605329,0.017165497296955438,0.9468521907390095,0.98655953778885308,0.92630475830985237,0.98920097886119041,0.81052729316521432,0.63646025730064137,0.72097922811750326,0.59782391677144919,0.17405360610689968,0.71764601311180742,0.35676726777339351,0.7680205074464902,0.18690207860665395,0.19516700936481357,0.0011864183493889868,0.10010188309242948,0.31325532198417932,0.2257662759977393,0.69262081784661855,0.38057550658704714,0.61900262618204582,0.69682284387527038,0.53763155663385986,0.33401549447095019,0.43464682990685105,0.93670520286541437,0.28455299208406359,0.79868760930374261,0.49664251217152922,0.53266973312711341,0.75393072338774803,0.7995697083254345,0.75478396743535991,0.11616100973915308,0.57029534695437178,0.2968611000292003,0.74018620970193294,0.37452101187547671,0.63907916146796195,0.73103124096058314,0.12198732142802328,0.78682189412182191,0.49935388235142453,0.78181588124250989,0.3437886967579834,0.41163722199155017,0.091226202507968993,0.88605122974840922,0.14637097498169169,0.67847997682867567,0.1961880037933588,0.035215907818637787,0.6655475325579755,0.86482100721448663,0.42719606751808897,0.56992739376844836,0.68745987604837866,0.071456307708285746,0.25421671386575329,0.66091558670857919,0.0096610603644512599,0.80777423802064729,0.52696024232776839,0.44614848877536134,0.2765980454790406,0.78973077714443207,0.93676785524468864,0.3668304127268493,0.89737882800400259,0.78395227832486847,0.38875773195410146,0.60180975327501074,0.024606688076164573,0.015411763137672096,0.66472243261523545,0.32823820786317809,0.82879892715252934,0.62233843871857975,0.9617846452421509,0.20488993932260199,0.056363555886782706,0.52628724949434402,0.44582057684194298,0.0092877249489538363,0.57664560036733747,0.5212537243170664,0.6797714383201674,0.41637349803932011,0.71223842251813041,0.49719876502174881,0.64354033919982612,0.82252921379171307,0.71964540882501749,0.46890011570882051,0.37010918976506219,0.32387409489601848,0.57576625930611047,0.8457944043120369,0.11495732676470652,0.95435019089374695,0.057077820855192841,0.3678359685698524,0.96996756949229168,0.3321133642899804,0.28197548590600491,0.49472745357546954,0.58902455412782728,0.59857095387065784,0.95253942261915658,0.54694415071047842,0.18392048408277334,0.42222006857860833,0.19110941725317387,0.5088348699104972,0.33822766075842081,0.50496452752500776,0.92356892145937308,0.032356635583564636,0.38676086416002364,0.16648887368151918,0.27048453917261212,0.79140057410812004,0.15042760705109687,0.82494524778099731,0.39313775350106878,0.63531802233075718,0.37097524628508838,0.14330335698556154,0.12980356256011874,0.085830803182907409,0.43069031076505782,0.73600558650679881,0.090598038921598345,0.38150711428374051,0.60848068799357857,0.86332850481150669,0.010869299448095261,0.81454732008045538,0.56752778376219792,0.19207887435564772,0.78183255877811464,0.27520051557105035,0.23301310144364834,0.5336110873846337,0.44353952225530519,0.039952367576770481,0.56366459847427908,0.77092405756702642,0.060787432577926667,0.079398602731525894,0.49132599212927741,0.6556147956848144,0.63589207964250816,0.4413675314630382,0.21905307429609819,0.57610192188061771,0.82868587912525982,0.32377432772191239,0.9613644823548384,0.27847545220982284,0.83790916391881187,0.026707138780038803,0.50093946275068446,0.33547695650719106,0.2760868491511792,0.91329909197520465,0.73915104975225399,0.19745867051649837,0.23456107584759592,0.84129876463674003,0.94777182453079145,0.60433450415264811,0.61405743457144124,0.80344087199075143,0.59425952382618563,0.37069481783313679,0.1708784571569413,0.053185125505551697,0.0894432685431093,0.91653660379350188,0.25270958032691854,0.87426710916683081,0.84998483031056815,0.033030498102307321,0.90195637898985292,0.95307953523471955,0.69263742922805249,0.66243148970883337,0.71793053090572356,0.076159177974332123,0.22758722187252714,0.20105119143147021,0.57029292760184036,0.11285943878581747,0.80252182390540838,0.50203990603331472,0.39980493771610781,0.3686525689694099,0.978554875056725,0.70243936086539183,0.089098825904075057,0.46553018467733637,0.31773162458790466,0.22171680079540237,0.50629484479548414,0.83872906234581024,0.060000300519168374,0.8148933960590512,0.7184310452942736,0.33200727512827144,0.55099019465502352,0.076556544872000809,0.52406630184967073,0.40128247844288123,0.82168261236045503,0.3043358063092455,0.85017144684679802,0.44806620045332235,0.78113863149192186,0.40934963289415466,0.31465472403215244,0.35089196189073846,0.44768538200994951,0.028445141615811735,0.74470569668803366,0.077373766705859451,0.1087630913942121,0.53466097666416312,0.10864494327222929,0.37423217884730547,0.26718483183067293,0.16505354323424398,0.51939097223337738,0.51781367839314041,0.96292456735158338,0.6817860451131128,0.70330459771910681,0.6826079394598491,0.30874134723097085,0.2889874324668199,0.28854255765443665,0.47746112257009371,0.84185375963570552,0.80244566708570342,0.90253094801679257,0.97751286826562134,0.632883391182404,0.051466811257414521,0.25281659518601374,0.1868984080874361,0.087779182274825868,0.59434103682870043,0.82987303116358813,0.43812604394042864,0.57887143281754105,0.59085170005448162,0.93862764952238653,0.35818920695688578,0.060418640593998131,0.21630655688932166,0.57879489382496108,0.42696890539024024,0.28225700140697879,0.48661697436589746,0.81945484691765158,0.70560054575325926,0.18907658233540131,0.14771935741184281,0.43810466369614004,0.097808957865927373,0.38947738883318378,0.54817651186371219,0.81830823816591869,0.48612914843950422,0.67010238413466139,0.30707850083475935,0.20552700352622197,0.59438300899928431,0.31492368107428775,0.60385101858526469,0.13247287828009577,0.43158110226038843,0.66474826086312533,0.45743583048926667,0.56528116553323338,0.84827224243199451,0.16806939593749121,0.88238827377324924,0.14617921524681152,0.9260266348812729,0.47131892056670038,0.13141070760553702,0.89902139180805529,0.13352379352552815,0.54665327520109708,0.53869726044824351,0.032610494953114542,0.55979760574875403,0.053324296132195741,0.60351537168491631,0.79701259791618217,0.42918536054436118,0.44686110657406969,0.46988067219033836,0.37881976521341132,0.55371103709796443,0.78174726254073901,0.83034815548919139,0.36064400014467535,0.95484990474767983,0.52702643038239327,0.76873642212012783,0.70454014349263161,0.19084190984023736,0.8627617546543479,0.2482461279979907,0.32540271079167721,0.88689036774449048,0.64361684546107423,0.29772859050426631,0.96508778222836555,0.94762983924010769,0.075207688759546726,0.62870349499164147,0.58114897316554559,0.88931900675408537,0.4097476309072226,0.37720728380838409,0.3060450606630184,0.79431803158717229,0.26119570158887656,0.61655627007130531,0.75117860800120984,0.18028960942290723,0.98526381938019769,0.8479609255143441,0.18470572786638514,0.3389101477526128,0.77333381820470093,0.17887913127662614,0.19384000556543468,0.1587911278079264,0.9824353812122717,0.73321645382791756,0.79423895499436181,0.15392157692229375,0.41998444485012443,0.15853548135375603,0.72157522740773861,0.387235738390591,0.49337004536530005,0.5811018983647227,0.80090036212932314,0.63119303802028293,0.35294385013170543,0.062893847990781071,0.072511004344560204,0.36445741628995165,0.58508154380600896,0.39045985940610989,0.90108595099300148,0.68664391782833267,0.19182827152311802,0.70891472472343597,0.42804411074146625,0.63372324096970256,0.74166813020361588,0.73715771832503374,0.038792640015017241,0.7629780867230147,0.93686173930764194,0.080501904473640029,0.75603659089654685,0.43199507523793729,0.55323234620969741,0.64261140302522113,0.18200451361946762,0.31187618915922938,0.4929693269636482,0.60601398428902031,0.51266714345198128,0.90902845900040119,0.98430057685123751,0.95883900793036447,0.84630316538270567,0.67459236128954214,0.95277990593807771,0.20432580744149162,0.67215159486047926,0.66421576150925832,0.39946637565270066,0.64366427293047312,0.92562929587438703,0.66759096920024608,0.47468970468733457,0.32264495939249171,0.22947369771776721,0.4820130465365946,0.39232734739081931,0.7757020739000291,0.69802669534692541,0.76587892313953487,0.55297344114398583,0.56686461309436709,0.74906439469428732,0.60299869793001559,0.98552624375559383,0.93685846156440677,0.95280709069222214,0.44543950899504126,0.52971643576165661,0.19306807375280186,0.95423142272047701,0.92254954377422105,0.11446961931651459,0.79369400897528974,0.050933811021968721,0.026567582061979921,0.30130545823602006,0.0025110405986197293,0.57438991141039875,0.64208426907425742,0.52565480663208286,0.43719234996708112,0.89219601199496534,0.64460723978234458,0.53514492047019302,0.92642637042095888,0.42766081070993095,0.12794373048003763,0.53724031879333778,0.11316720735048875,0.70529065472306685,0.62036454232642424,0.016507970017846672,0.085031302138231693,0.7929116739006713,0.096584752115886657,0.14108423146186397,0.80198409053497011,0.47368972423486411,0.65242967082420367,0.25426699772011491,0.70098507482791317,0.36540076785022391,0.88877822475973511,0.65514726595021788,0.14060252606403081,0.16791272096335888,0.58470778864575546,0.27599617806030435,0.81777036465005948,0.1962395738507621,0.89073303440585727,0.1931208170671016,0.98494097619317467,0.32357125401031228,0.02163417234783992,0.87153448528843003,0.48755262000253424,0.46639084098860623,0.96918668888742099,0.39992967774393035,0.31122644225601109,0.17743915989529341,0.54612418751232328,0.95923574532615019,0.57944528820924457,0.40338118193903938,0.38454708974808455,0.83604252164717763,0.67383717524120579,0.60917184348916631,0.51309912649914624,0.37284496991196647,0.23085285220993682,0.86840993044897918,0.43469978505279866,0.77700390015961607,0.5991605355148204,0.46030474048806352,0.52504165174439554,0.80583715792279687,0.75470474355155603,0.88945969500811772,0.8189637328754179,0.42494616370880978,0.026633154214359821,0.3309861285681836,0.10420042486628517,0.59068063274491578,0.76865546716377142,0.89297090046107763,0.021262625399976968,0.69504578195745126,0.73070191904436799,0.37368055471451955,0.2197399901621975,0.72760636693099512,0.48644042110070584,0.94456176023930305,0.27584908091928811,0.53738497698912402,0.76167202152544633,0.53470477164722974,0.69183473872253676,0.30799853800563143,0.97668248613132158,0.070522228335030371,0.39478251491440458,0.1801606622664258,0.83536662240978332,0.092059036495629701,0.48880314520094542,0.45885435547213999,0.77920659455470742,0.0092391841532662514,0.55529089527670294,0.90587565102847289,0.92496318906778474,0.6363143152068369,0.90804176839068529,0.0014048626483418047,0.76014803319470958,0.030081420312635599,0.2365394762554206,0.20638551731826738,0.72041574579197909,0.4504164836509153,0.29610905180918051,0.12599337114254014,0.83602698901668193,0.0085612120083533218,0.019255936362314967,0.7198088087048381,0.13988850542809814,0.3505753028509207,0.51628911265404898,0.77264148576417935,0.70470072617288682,0.43229007282061505,0.35283499747747554,0.43218923934269698,0.037164892901200799,0.048721048515290022,0.25255082207266238,0.049135582766029987,0.057669789581559598,0.090189171570818877,0.55869814440608023,0.58809665821027013,0.70121157587505878,0.2386732163373381,0.1403946793405339,0.83295541168190534,0.27334042578935625,0.84864063887391239,0.60275265420321378,0.95397607776336368,0.28192257939605042,0.48401079000905156,0.51298049340024587,0.21810700257774443,0.15223569665802641,0.2239465538598597,0.81940854821819809,0.5314199245604686,0.53442144508939238,0.75448860865551981,0.65049027694389228,0.34409148393664507,0.25805999228032306,0.45661944169085472,0.81869998956564816,0.63293052245629955,0.8106218039640225,0.90816268461523575,0.21548648212803528,0.15995684635592625,0.7669256165041588,0.7084790543303825,0.023482835898175836,0.5719614853849635,0.3364202806376852,0.42896599147003145,0.263074405817315,0.87540035638958213,0.28229183976072819,0.38912123667541892,0.58717002060497181,0.17718540148576722,0.35060596772935243,0.62700024845078584,0.21450551788788288,0.61776054981630291,0.66383799768285823,0.32466218722751367,0.061816720480564982,0.79493566075572741,0.36700954277766867,0.98948307730257512,0.36869047530926763,0.97116837902460251,0.96815172924427317,0.12576657159486784,0.745926440062467,0.22991774203022941,0.73396639295155186,0.023396141433622689,0.9720837024226785,0.60135828286875037,0.87243371501332145,0.10970122922211885,0.34093948571942745,0.40338491538539528,0.39544244126183914,0.87523604095447805,0.36398712652036919,0.54265145036391915,0.034884782682638615,0.36531304741976783,0.57543055316666136,0.20626252449816093,0.44662311383290215,0.43653384028701109,0.7444507435848936,0.94663419499760493,0.066714694609399883,0.12278565682237967,0.738161562688183,0.46605561659904199,0.28330665580462666,0.8483273677574471,0.24400456736097112,0.042956564929336312,0.50545941996155308,0.68470889265881851,0.6104234460555017,0.96919561301590873,0.081321954340673977,0.28043521788669751,0.743439755954314,0.13244269584305585,0.7523559295758605,0.67842689190991223,0.28356363271828738,0.90036000923719262,0.19001377694774418,0.60476029244950036,0.91193943429272617,0.89098297270014881,0.17454204332549125,0.19149941084207966,0.69674271826632317,0.74688033917918806,0.27195675022434446,0.34279810881474987,0.67953386255772785,0.41443915884476157,0.98086115512764083,0.15416263188701124,0.82643128828145562,0.81081057846313342,0.59928057583048944,0.61867429496487603,0.080459351898171008,0.73117481671739371,0.77151021440746259,0.79706129153491934,0.88294885246083143,0.066550432189833378,0.36456933623878285,0.9412824182398617,0.084920213380828502,0.49260123732034117,0.91518111751182007,0.74759444740600878,0.63103450104827064,0.73498101537348703,0.83351917337626213,0.82281827801372853,0.32216122787911444,0.15493682815460488,0.29563007671153174,0.4527356310538016,0.46232699995860455,0.61191949174040927,0.25884607947198673,0.92286151670152317,0.98389414360513905,0.82673735135933379,0.64974190085660666,0.88646928077330811,0.95162870304426173,0.57669333578785886,0.88986641822615642,0.57691933941096063,0.34564423757605256,0.84637668041512371,0.13544588036835192,0.03451704732142389,0.045107143898494538,0.87656589261023332,0.53609822719590738,0.40365350385429338,0.13443852084456012,0.036018213154748083,0.46206749489530918,0.7386864651460201,0.61986962614813823,0.15328048238530756,0.83085381007986148,0.1424692432489246,0.90586785152088845,0.59989946238929404,0.39416274991119282,0.2519360352284275,0.70101603152230385,0.32091266195056961,0.90835239149630065,0.3977730112080462,0.12321422428591176,0.40230958763742819,0.90909034518990661,0.38232923244824635,0.18946506336797028,0.60370380596257744,0.32252867234637961,0.1652218170859851,0.61433620939962563,0.18621114762034266,0.71188517722534017,0.093682579477317632,0.90694645954761655,0.31995441256323831,0.24829715775791555,0.76190096220932901,0.31948240877827627,0.23177682036766784,0.37020574304508047,0.73296181812649597,0.22039529931731522,0.68589023142820227,0.4168478937470354,0.81583742760121825,0.4874114624457434,0.81969777286984025,0.47570519840810449,0.29043425391661004,0.56495370815042401,0.30627554986160249,0.82275196456583211,0.5177995034214109,0.22095043077366427,0.32204600298777225,0.68635802163043991,0.82352407985832543,0.80314366803970183,0.80219183745095501,0.81563497693743559,0.55142828370910135,0.127477623866871,0.2603343943390064,0.15144730144646018,0.67376054105116057,0.42262275339569894,0.23131661599734799,0.31811716464115308,0.45186111417599023,0.43554404481081294,0.38072122140554709,0.83689888900145892,0.533215422516223,0.3955839724629186,0.98178668724372986,0.27389295764034616,0.7476681959372945,0.44792130898917093,0.97065030404599384,0.29415566551499067,0.23243481579702346,0.5975717670377344,0.52327349344035612,0.96949663270264863,0.050921697432640939,0.24456630109576508,0.74930672018788758,0.093541070173960184,0.59595996999414635,0.52615531525807457,0.84859701884211969,0.64456498570740217,0.97839437028625975,0.26290807049022985,0.92018963387701658,0.099242582134902474,0.40541978102875875,0.93874672818230465,0.0003380487347021699,0.28028528372291478,0.53546954152174298,0.5996492869080976,0.20565331650199367,0.11913454290479422,0.21709074520273133,0.98359812097856769,0.32254820004338397,0.34883475088980048,0.094989920505322512,0.69299550884636119,0.74005832331720744,0.67521522309165449,0.74102386372396722,0.64248668420361355,0.53786643482744689,0.52704763475339855,0.33475099262315777,0.28436292446684092,0.8240103305317461,0.00062182016205042595,0.54704645709833133,0.28774898559087886,0.94796768444124613,0.61447389674372965,0.88390498837223275,0.59554507938679302,0.35293858177028598,0.50942274837289003,0.54093787247780711,0.64574753853259603,0.34321492803515868,0.98257541299564766,0.6165747593552805,0.54878482804633677,0.78865843716775996,0.32749983534682542,0.73841615182813258,0.65043965010205285,0.12428086993284523,0.74658501405268907,0.81417006658622992,0.10693224982358515,0.024898996157571674,0.15819638452492654,0.41028459002031015,0.80705401133978738,0.72409339467762035,0.5876248058653436,0.77356026646681131,0.034957993221469225,0.36361305741593242,0.054779836332891137],"expected":[1.174034228876063,1.5167221603708141,1.1074365914215818,1.1601427720630417,1.5201981650775407,1.0513407033111155,1.1012827988103433,1.4809725349556464,1.2841447339949039,1.4430841652682256,1.5321595665303003,1.329316415333424,1.4561659004310743,1.4947756225026017,1.3294904626520319,1.0250366131164352,1.0624756053911106,1.0206008838668186,1.0553128379564589,1.0525201769254571,1.5076004292234448,1.2304949405611203,1.0495920203728484,1.0385238170719013,1.0627995028493373,1.5271721371153382,1.3603855383486998,1.1850999487534142,1.1836669469638115,1.4480178291421422,1.5140898493928396,1.5689349870233176,1.3910569723383488,1.5261153699345544,1.0993425583072693,1.2800652118869551,1.1889649695215285,1.12872032908792,1.0605733902927124,1.3513352453041967,1.2711702487017065,1.1852165514014479,1.5568192051483234,1.419154156709274,1.1501963759102574,1.4848440831756058,1.0838717868747618,1.2566314358889272,1.2581371226994662,1.4018692732569311,1.21095345116277,1.2215134265024941,1.2199912092718155,1.3655902164861637,1.4049012726591876,1.390902633257084,1.2713175968138901,1.5008478955228206,1.5019640571541883,1.4458579101455695,1.2422743017389262,1.1856430663680813,1.5583465003673054,1.4393520530205366,1.456855082745482,1.1332200262626682,1.5526893304245364,1.5111128770670326,1.5323245414845295,1.023587313974498,1.1681072749341661,1.1691680467321375,1.2488423847099162,1.5209351784660663,1.4391070739828224,1.2071886691754121,1.0693148103393122,1.3578165881840432,1.5573177852156876,1.2667440796989877,1.3829862217463582,1.520643605539904,1.4098447989684908,1.4855712513722945,1.2060765740450641,1.5506913962972275,1.1870080451492717,1.5565316819670416,1.4954087983175728,1.3971941956209015,1.3582235266538314,1.3737391847220548,1.3797113070567746,1.3593058507050686,1.2764342564119968,1.1878100407286958,1.2403164687315018,1.095072371770921,1.2128556694979959,1.1788567319349916,1.4572476870782654,1.242434363989299,1.2575824725924656,1.5697000250152011,1.2715305309282614,1.2395245932818346,1.5055286178948357,1.2777406035689083,1.5234577955027055,1.3746842357204505,1.3539688941940315,1.2007550294506721,1.0603311842735104,1.3155601729354143,1.4286520854782969,1.1299803903975172,1.3095046746915131,1.1784267240015074,1.4797887245029664,1.5638633654911043,1.2149777158656681,1.1696157725155816,1.466350808072014,1.1698915668358885,1.3501919259902937,1.0785169133055617,1.2463638880038481,1.3953455774040953,1.1191836597395082,1.3903929455105166,1.0607667411193002,1.3117784874540515,1.3293190144212697,1.5074163732441022,1.5154304012490376,1.2084564149850439,1.5110386080228413,1.4770794505250235,1.4653059398004522,1.177384784087703,1.1561505350994146,1.0302016333048496,1.4667025288605939,1.4322301425888746,1.1743299613183336,1.4467791169552724,1.471343918196319,1.565519389239965,1.0879626587083535,1.4825878528417373,1.4243052713324831,1.1061703743226319,1.4913227172624948,1.1506677775490433,1.4680849833473273,1.0648365751496833,1.293042584097267,1.1975727149187065,1.3663079535773532,1.031426526736863,1.4235440568713607,1.5441778483718018,1.163042089676017,1.188056853386936,1.3095066057023399,1.3046073579971866,1.3280302953817671,1.22629234528869,1.0981372761214678,1.2486069828229476,1.4529471608006228,1.2575153008822029,1.2112903046060413,1.4048578387206729,1.2134507779942585,1.3219175436848296,1.4103586464260121,1.48647812085251,1.318659884247642,1.3394337445449056,1.5408775087659821,1.3993134690502951,1.5496071632041266,1.4230426872784772,1.3376976269996614,1.3055006830492337,1.1973999163850344,1.4214119298296746,1.0838565919425405,1.0552359269237035,1.5190043170149679,1.5089139276738439,1.3181373608623923,1.4036541747346876,1.3682082172136421,1.4071899205399188,1.5661588607181476,1.2298233819148052,1.430124838281186,1.4065992843299617,1.5057067806411575,1.0894785592087595,1.1876074865410331,1.3842399396151159,1.4417291169437223,1.1404158138458309,1.3388455531308243,1.2907009882483427,1.5042676711161262,1.5232339405908879,1.3006154157385406,1.3669578190776659,1.4629360151060826,1.4287270807561891,1.2721012807402274,1.3381822658236509,1.25210163692967,1.2363216559288497,1.2169035091699836,1.0303663516433574,1.3773307500896652,1.2337009484891777,1.5376835044343724,1.101936440487443,1.477583589909002,1.3504205655229802,1.1013143473287983,1.3236216921379251,1.5097654501313149,1.3515705574608952,1.1664925317945882,1.3715681951191454,1.3338594871546765,1.3296390574843056,1.0210140519080642,1.3787522528456733,1.5399479727126582,1.1463837441998852,1.3811048905883001,1.2994098879939615,1.5284734837601139,1.3538795121086946,1.0582451370579791,1.0398089921116871,1.5689931163571715,1.5573684991559966,1.2001219814497843,1.0429368621006487,1.172292016827494,1.4182891645574336,1.1359920457910591,1.2576874124694202,1.5374367400671154,1.426006413602694,1.4013820368941363,1.1453571888401339,1.4642819739172188,1.5531291190787615,1.1838068403038235,1.2687099118959637,1.3864799678827322,1.2157982916928027,1.1035107328182943,1.5177391862260123,1.4975139587740574,1.037153932733071,1.4625746951965226,1.5330414934667771,1.5125865156188594,1.4543366764023198,1.516479509840118,1.1824569437060779,1.1355498740357008,1.5401957340404218,1.3124374550004472,1.2868711370131032,1.327960039997117,1.5676448962858944,1.5128271086276697,1.2572472132470356,1.1474045655869574,1.3361050473117317,1.2897788525892075,1.3830232531933859,1.4238653553453098,1.4900769006588013,1.3465461099209013,1.5156862737060413,1.4004360630625794,1.40948692542888,1.5408325195124835,1.2080234268716756,1.4728957185804747,1.5549420693572815,1.5216960335322758,1.4672760278241568,1.4966512922926529,1.3507831748896668,1.4728800929198036,1.1686895611859425,1.3931790768496977,1.0378536258778761,1.5513103973712903,1.1681089212827647,1.1098983439566286,1.4458959114530814,1.0742867610677842,1.5519876740172063,1.3576808070719115,1.4694816895585561,1.3584759528343942,1.3309390739855016,1.4298556871743464,1.1216377827188611,1.1120139595667335,1.4270904674813973,1.4155131153326435,1.557781446772722,1.5266278079993159,1.5054205698198995,1.1967037789066299,1.1295241607370594,1.4060568950160646,1.4855319265343101,1.4721327374909843,1.4586769110326259,1.3994521546808052,1.3569014020367645,1.5325979063338306,1.4799558688475036,1.5181581283781804,1.3579585075921998,1.0767517397704607,1.0649065570961884,1.0637803705353341,1.2732817707668596,1.314798423104145,1.2111010297318339,1.5472912438286885,1.3846556290392815,1.475099786170724,1.3264044629972249,1.4228625186956219,1.5499236050726246,1.1696511413880224,1.4366888490015881,1.5647906666556146,1.3989517041745736,1.5539338648315082,1.1053068983418939,1.5028784639747215,1.1777842540793737,1.2748741567122657,1.4649646329989132,1.2269444161887322,1.5190287389702373,1.2756370396171142,1.356463965817887,1.3771468833860367,1.4112563478091158,1.3294250885915588,1.2349097121373169,1.4483308012469833,1.452083151673047,1.2190332505661363,1.2890269195523565,1.4945351250368182,1.1759510598656255,1.2535119486763788,1.4411536746008005,1.496817391095342,1.4079243795351373,1.415862758279842,1.4270496385125113,1.2878360424145292,1.1733290065847533,1.1967195920303153,1.2635275144037341,1.5387653120831386,1.4108326754788463,1.0878576141743144,1.3734937175322219,1.1996101419679743,1.4451044211845134,1.3596886697464972,1.103577940253381,1.3843634372477771,1.3587890133005702,1.3791366744226605,1.2121692040662064,1.4438912060611715,1.5279022406517826,1.3489183292794786,1.4042676187815464,1.3477869880422131,1.1348868930762614,1.1720723745477817,1.4193520753748696,1.1872494503967423,1.0982000099468467,1.2775424014803889,1.3310674144201406,1.4112060948175071,1.5148062014139791,1.1761480289793558,1.4899412374492227,1.3366679721919228,1.0705109176949184,1.423967692515764,1.0283464509392621,1.0794695108067429,1.4728270623746638,1.1305922608939003,1.5643537530860658,1.3278077044038854,1.4065782434368612,1.2895501950013279,1.1970649848084167,1.3085652111495107,1.3646715007368335,1.4866160269624242,1.3329430143660677,1.4461531273186559,1.5635983972817362,1.367461633190703,1.11191148816682,1.4769374067975649,1.4922067165291399,1.153619015444304,1.1229652655894855,1.492093557952948,1.3818011553714118,1.4788885943973931,1.5116428083823692,1.5021633767061247,1.4730734389196434,1.4781445176244192,1.1840807688443329,1.3844396774617842,1.3664415698901788,1.4417792796790458,1.5352706570175856,1.0929681450096602,1.2774134055861674,1.387053478814571,1.2837577462960168,1.4962707190449185,1.3099723511879413,1.1081676754092709,1.230004233814336,1.0400004090972443,1.4221893094636797,1.3829262192926324,1.2571785837593488,1.5266617242137801,1.2415226822307706,1.4650648300626605,1.5056461221396351,1.3971995038615617,1.5174358039775466,1.3043984306324847,1.3778047742753481,1.4632658830875191,1.5543169619455861,1.300154189187146,1.1855877332029432,1.2392215718266468,1.503475023514258,1.4806689665084052,1.1627754157287817,1.5241011792387076,1.4355904934173338,1.4481740012996089,1.2711482661889628,1.4383575538866238,1.3917995747552747,1.3899188205684496,1.1956385001877952,1.3492431623935057,1.5258195788581637,1.5370029021148099,1.0242414296685911,1.4631484211071264,1.4976286185696361,1.1831821694259823,1.2077031049039104,1.5593739256349575,1.4616539473344865,1.0883139461299487,1.4710799370715424,1.227786268896355,1.5308674519305445,1.358793320652524,1.4268694165588545,1.3130576513043144,1.4547952917683091,1.4740260763421609,1.0515699745343257,1.3733235333596452,1.4840598310888229,1.057083015123679,1.2984991531567729,1.3295293640180426,1.4786198433880027,1.3425828564241449,1.4941360786326965,1.4764641012515372,1.4005466061451242,1.3586509564898628,1.3950520104414206,1.2886864572463343,1.5023947616132163,1.257907657888633,1.4471240359703261,1.4033715743180557,1.2818838354900999,1.4163432479296652,1.510097465200855,1.0308255142700011,1.2037229265122271,1.5560200964411524,1.1245179377672077,1.1236011708958742,1.0608338567660258,1.1013557577964872,1.5637489337350532,1.1863628243523556,1.3107827292870453,1.5316862917635465,1.2052331849623199,1.4634137495140831,1.434319583808064,1.4309207537896493,1.5193479916336425,1.2575679776152493,1.4502539645019301,1.5162806921105061,1.1516338819752989,1.2332618065537928,1.4768192430779945,1.5284292719523296,1.3521754179529142,1.2722813968259412,1.570174921971681,1.3560449637140124,1.5659101849174912,1.1974739789008477,1.452618720419157,1.2369543563144039,1.5316916385037302,1.1090965130739152,1.4083666306232707,1.1191687385875657,1.4218658085733689,1.4314584242843371,1.2340133373173643,1.2465573252298947,1.5450353694083545,1.4908110212914634,1.3462405013331027,1.558854685551385,1.3900080317796686,1.2194132122505976,1.2517618508590824,1.3531456106320841,1.4668491907242356,1.3630634488590643,1.4005708658355316,1.1082948897921605,1.4622819154289513,1.2963802755641129,1.0836473915697056,1.2921636005052544,1.3666805612421504,1.1427740370432431,1.2958144576547037,1.1802162857301099,1.3588954018262784,1.314004859681136,1.3459093141744525,1.4970638597296109,1.4707005999606,1.4728889047193015,1.4319795637608175,1.1225710766732451,1.3519824202900537,1.5595885688916038,1.3037796103475758,1.3581559387528725,1.4422001752491882,1.5033205974787518,1.0571721064809803,1.0411486085596937,1.4761191077928832,1.2383453419441826,1.2176725808639437,1.3529224581573345,1.4366789074091477,1.3673811994359519,1.4386014609565529,1.5473551508503403,1.0672248286813903,1.2562795521632082,1.3357042880708658,1.5541680305430148,1.1336844484319477,1.5426406631972018,1.0833400896203089,1.3423237922748446,1.2647590829046869,1.5324867128120059,1.4512541875103202,1.1717195894002104,1.5450037197751449,1.1721269535153043,1.4763381715581563,1.2325359068480635,1.2430525212540895,1.5108028290818651,1.491949155259656,1.2689993630396372,1.3908408185384897,1.3438621406458831,1.0820685115046647,1.0471490367130887,1.5139537721169944,1.2749432621922561,1.2781731906841962,1.183633877694479,1.3665796211927257,1.3757625489348944,1.3838510050101274,1.3860148967706785,1.4710018525529778,1.1668374393313388,1.3502106920778585,1.5378246614675115,1.1065095108039629,1.5176674925699098,1.5406174315884087,1.5010465814822427,1.2376276326913258,1.40550024592044,1.2924138430731189,1.1626609559429937,1.4944808999143617,1.1816271269577849,1.4026883772943863,1.5470161192103375,1.4565309210781665,1.4016270061985407,1.1437485761656703,1.3396845513279403,1.1048997685496615,1.393399548517106,1.2923736302986328,1.2705423413577024,1.4979441351661194,1.286548944381084,1.3456563756689031,1.4502437019164787,1.1673045500377184,1.3863670898236722,1.4200534439052204,1.5647579451203564,1.1730940230295506,1.0352674772266544,1.4496247884374294,1.5036360849814814,1.5015761938551828,1.5286503373888616,1.3567295953429197,1.4140605792837915,1.4918576611341832,1.490680979046358,1.139222915968966,1.3582613903957876,1.4881154774921082,1.4290550716118,1.2929192924682607,1.0680088116327167,1.1290069536582279,1.0955262973144357,1.404788758699169,1.5501122516631729,1.072660696249907,1.223216616428042,1.5038315248155423,1.460261397299526,1.0482786093798182,1.3905488542688718,1.3206673782512539,1.3289824966777319,1.302547041181997,1.0761357970045482,1.5184658269542737,1.3929540957842406,1.3192040068029669,1.0363905966509415,1.3256312812039597,1.4460607755331334,1.4420516571175077,1.2451803851910517,1.5227849583894935,1.2651982382462237,1.2232576338747783,1.3334594574668184,1.4716887147638535,1.2469314674657002,1.1685160942096868,1.26509116499534,1.4959943023724516,1.4990669504582153,1.4410784488129393,1.5197781154588583,1.1262261352051273,1.0172158912002789,1.2607227166659303,1.5019913890683032,1.2223382930578583,1.5580442870679712,1.5461914331137205,1.3221030727476204,1.518326735267824,1.1261189358058932,1.5352184295012605,1.2635898768639009,1.5675588965591478,1.4939144331447443,1.3744536327268666,1.4156646236481276,1.283076136302826,1.3724151747260769,1.3382223160840394,1.0379468634582329,1.3542142657433618,1.508100494451218,1.4307220231336535,1.1456114061482332,1.4673333597066394,1.2772945960188467,1.4755730442723318,1.4122833486104402,1.5011406137495067,1.4937084201935427,1.3038205877332589,1.3879816688457967,1.2298604662979886,1.362033421482175,1.1293666761103862,1.5228001693304327,1.2416180849302103,1.3072609815336307,1.4751059180848773,1.4787750924518157,1.3640071260093769,1.4084296070226119,1.5636919849413911,1.3107089014334041,1.2174094469400161,1.4677729737488503,1.2717403283011286,1.4509234880509354,1.5399914751591648,1.2924756641277302,1.3665615872935748,1.4619321966435972,1.0205834597814973,1.1674793526656042,1.3370377894035057,1.036820334633169,1.112502973864582,1.2278358854281464,1.2014018131655666,1.427073508598885,1.4883003439395917,1.3101375319971977,1.1063768998180283,1.5280210054967949,1.4129554221998573,1.1070215568060238,1.1509375405517044,1.1277964648061953,1.4348123986814858,1.171982417697361,1.4347956186422977,1.4639099304376462,1.2692214008032259,1.3046857536003895,1.3087131837140265,1.5620071396645028,1.5515762791198735,1.3894013340313305,1.203265310546451,1.4410597700292538,1.3572422393489236,1.5059961153392643,1.3590027814508618,1.4988021795643494,1.3875669197356253,1.3905251604093365,1.4037381880266464,1.5334955615068442,1.1991368075497777,1.3024644229072511,1.0453006836287841,1.3674611893038178,1.216685311786688,1.2481895701290104,1.2829668245357018,1.2458894253517079,1.5423470207233887,1.2807461869581558,1.2835930645009379,1.557649451757789,1.3386492451189977,1.5436947066226796,1.4483984283923572,1.4379905809458571,1.4354272261204883,1.3376637730095806,1.2848250158237999,1.2718959819304509,1.0230487441456662,1.3977157674963772,1.3451423004909233,1.1704760364790259,1.2313274351732721,1.2349759433168459,1.4704613301866791,1.0515609488251665,1.432279248795528,1.3374254582660878,1.2166211401362723,1.4355088719848621,1.2557075817676717,1.528888216085299,1.2566820828132519,1.2957915546004612,1.5396807771246441,1.1976339085722618,1.373281234622556,1.3902567429224415,1.2469073182493233,1.5348680160733634,1.5440623634258173,1.4614142988255094,1.5435614023962785,1.5092370787237208,1.3396000578468183,1.4550679217097635,1.4633366364449663,1.3823455217069094,1.3613689695195572,1.3395494928035026,1.5186362853476969,1.3740121366448663,1.5334103031731443,1.1310207019567891,1.5228938858835575,1.344135154338957,1.0503600395798294,1.0753387834969494,1.211862923728791,1.281199715634086,1.4606721660287731,1.0622970862465011,1.2310558544062482,1.4725558627889697,1.3938882498007783,1.2596324053913752,1.3656098940719963,1.4515291406737723,1.549015197068037,1.2620931044814818,1.2942874499195445,1.248660787803836,1.3578017081548865,1.5440192972766047,1.1084930441519711,1.4664827653132155,1.0828053745435027,1.4796914590600809,1.0972389322185701,1.2643516987144257,1.4450107681743039,1.1535600678924247,1.1903370133050419,1.4268085318723929,1.478758132570086,1.1965319103524099,1.3780952476192712,1.2600839010721958,1.3481184603236602,1.5681823354636768,1.4768759111056702,1.3005144600979706,1.238827680461928,1.4074330782934328,1.0348331554578778,1.09913153748633,1.2714659425713417,1.5703487321323926,1.4587144683706408,1.3715803371562985,1.3683908063666845,1.3898325028097798,1.5696288911703227,1.3723229613629291,1.379309373329709,1.2031423231420975,1.0492337385715604,1.4367062717534294,1.444639146777706,1.1938136891260704,1.4834924434376926,1.367250189069833,1.4695948987917029,1.5567990883130385,1.179576434434352,1.5000097543424675,1.359895699315042,1.232944199324973,1.3977707606978573,1.366211720644704,1.483271454726351,1.5096236718712952,1.332884746605917,1.428318246448125,1.2321854279235551,1.2977139304944347,1.4538889365525911,1.4933632114798063,1.3315503572817082,1.2228697571344564,1.2120852707254874,1.4716345301166598,1.4324419892056193,1.0979461511633808,1.1826874889709666,1.4602865954393973,1.144492074677335,1.2060871416065724,1.5649907466049913,1.4946581181765999,1.1237735946250518,1.4522180449487128,1.3053608545116706,1.5347511624009473,1.5367210165919978,1.3142735910219099,1.0917037149938502,1.2554792608351881,1.1010009543489823,1.3296384674152617,1.0389080174116441,1.3891788468162078,1.1120390988227691,1.277473218861128,1.0697835500525346,1.275708482039468,1.0834105570332759,1.2579757455058054,1.5675550647474019,1.2822595468874223,1.1982796827894848,1.0739362220618534,1.5606550816348559,1.4861110482570801,1.3081247031234431,1.2403655934297035,1.2745032187729162,1.474477812675004,1.4341227010240802,1.5232954327054287,1.5266779068335909,1.2977597871107789,1.5213067770946276,1.3775250596129962,1.0461748324497151,1.3733831795182241,1.3364627400864675,1.2676814105414977,1.267480871840803,1.2030625879491836,1.2409703944815278,1.4241989037130864,1.5437216580181174,1.2676448360673529,1.4873720388335157,1.3937016200095409,1.3855207522541133,1.1552980563039241,1.5664358791330619,1.1615961492659275,1.5435125100580038,1.4657682005844122,1.4274423614506051,1.2944406435179998,1.4412773898544609,1.3110975857616094,1.0252046259269236,1.3326358253762738,1.4602853964617979,1.1350691348078221,1.144496552752166,1.4621504205191851,1.4217463929100302,1.4386720389114169,1.2177563178621906,1.5233694591751721,1.1532317438549693,1.0787344530112244,1.4826300324348858,1.2768572990468303,1.0552499530494015,1.3632883627632688,1.2386428572146586,1.2803119173883386,1.0368154040785538,1.3306009498586999,1.2096042581241844,1.2758788698989718,1.492726242746919,1.3310262262923118,1.4231213048552653,1.2333700505257628,1.4914469156378871,1.3418974657634091,1.1621845484166067,1.0240336733455202,1.0671102660174554,1.4819759652353237,1.2049074029903639,1.5288197238886265,1.1409340262415177,1.5272388021304748,1.3748624022717131,1.5457740174549639,1.4321241730239798,1.3991396066280657,1.1578736741582745,1.3783734775476668,1.3256681689145162,1.4170857043750165,1.5226966488906712,1.2073429229368846,1.4847340645295226,1.2865910590080274,1.3574955690596502,1.2019869838131643,1.3967607017789745,1.0848632775095608,1.2098466983634548,1.0473902641448904,1.4210842526219156,1.4932442304394313,1.2021104289219695,1.5153278238298344,1.0380535691801727,1.2480047676614436,1.1523068186525063,1.5336605923089566,1.1604120154659305,1.3404286288791096,1.4164542465029115,1.3379275850463888,1.5509254407868971,1.1415387409714592,1.0444556534011782,1.3606424332706941,1.154832958110819,1.4043297092098186,1.1354253218357624,1.2623076703239722,1.5410199370181581,1.2211397731637381,1.55813274183471,1.3431285823521222,1.2941859906351441,1.4253358312841244,1.2245427299274259,1.5107484363506705,1.2933224801202798,1.3090690261660378,1.2672947893250841,1.4632947299104964,1.0683489494991321,1.5533685249225522,1.4616683629613405,1.2127023131947581,1.0963160396367049,1.471662167506645,1.5237026249791286,1.3812370109846737,1.4409053327123365,1.2529222081041487,1.1334534918183257,1.4200973558201586,1.4755866432284415,1.22414131812086,1.1785048174193187,1.403747608923632,1.3245200925948755,1.2554489687939934,1.0753661033685782,1.2434501079383216,1.3513149368765451,1.3812833972171674,1.2651540814049178,1.5631572053157938,1.5095226356390812,1.4329452711555588,1.0468862567068198,1.3898512313734928,1.2833711668958057,1.4597597913586127,1.4988508179197442,1.491129563508689,1.5415623234898765,1.1692921252844828,1.3556486184633583,1.3871893672979283,1.1930115936328323,1.121603280320187,1.3704983545234128,1.4053863645112596,1.1252324273183696,1.2038044570606441,1.2758469162609343,1.4027770564872204,1.1094796117968191,1.1782006277168626,1.5684713706517459,1.2126128419256292,1.2495794312035839,1.4117657556112364,1.3095987640158826,1.483105918690844,1.5289967396092627,1.1901382251336028,1.0280990645013515,1.0701621901919647,1.4771496044774495,1.4344238346580802,1.4320233930429458,1.2624025587774197,1.2520041661378576,1.383033692529255,1.0587092270557066,1.1611910394338851,1.478599445536011,1.203969096921933,1.0922406132820703,1.5036006930311889,1.1303645050763682,1.1409255042619402,1.3863226869908893,1.0286260402220775,1.367479144844056,1.345957525428624,1.3216347086904014,1.1242793728506995,1.1583244780913404,1.3080458120492777,1.511444940188045,1.5087841199232137,1.2803333437096034,1.4899454763746312,1.0216944749066539,1.3980272318021356,1.2802692905383921,1.2165615018510254,1.3826164418407234,1.1666523872360277,1.5597008786641986,1.190427285825868,1.5379526903042284,1.438471018073689,1.3379159395924105,1.3360384253782607,1.1955790556825596,1.5352193270659873,1.2239555648697993,1.526423559034477,1.4940287970656601,1.5163876119159683,1.4634328193806703,1.2581845949827772,1.3765108682752725,1.3555484949033365,1.3727535800709365,1.494217999039622,1.2610511298737948,1.3556332503470918,1.499559498200294,1.5117338338274346,1.4950068730074886,1.5492007169582147,1.5325848777611397,1.1490657990883701,1.43607828639632,1.322435090649605,1.5023222356844239,1.087666130848254,1.5611358038969645,1.2477710041891323,1.1631703994156353,1.3108119514377121,1.4707827965007545,1.1735799901262398,1.5140287092960614,1.1282800563173618,1.5084989077611239,1.0297487305891209,1.4453717390070611,1.5705932222358503,1.5576618612366362,1.1383925806537976,1.3969322316442088,1.294923794652977,1.1948562644368699,1.0285343456138873,1.3807726986920261,1.339277529534542,1.5639751667094639,1.3632588828545356,1.4529711675413013,1.1829621274973889,1.0682260917679602,1.4780681999052792,1.5019106081766307,1.354102722841134,1.5335276191510223,1.111380753816021,1.4581710487408877,1.3150853067992845,1.4893120970494664,1.1530038594893446,1.213831214101555,1.2227395206085121,1.1832714833872384,1.3091245481675322,1.3090731911395685,1.4699615786151128,1.35464809132674,1.2651544255490839,1.3064835459040354,1.5378194420580462,1.3181541250153568,1.2876496914158091,1.4961526927481124,1.2682452194347185,1.1107419313533065,1.2281361786880789,1.5612425015774001,1.1193008000286988,1.4623254178187979,1.0372170107918524,1.1952482709800056,1.20385845343732,1.3018349274482808,1.3115205274571997,1.3246835794130085,1.0887774393500875,1.5325663390794797,1.312234491430293,1.0900804553949075,1.5641728732605136,1.4020312290752641,1.5226990938401059,1.5551663383383183,1.1403920303182447,1.3095844307507603,1.3609161966191354,1.395087620952044,1.1532321613961212,1.5191568478978152,1.4859118998341654,1.2968799785471148,1.3267084684350878,1.5490290982476371,1.2855030458523258,1.1507902806055583,1.5582842631195379,1.3765979678596345,1.2937632446072813,1.3605632324316927,1.4186435014986938,1.5442371025125319,1.5513586653506528,1.4809845272394655,1.3583194300275971,1.2775165416832357,1.4930415963098207,1.0441718024150843,1.5217920013935202,1.0701267816016877,1.48756717529597,1.2240607208512146,1.5121844550528414,1.3914860173104531,1.4944859455569568,1.2541131877050238,1.5540806106286962,1.2538348983339043,1.2825837936772748,1.4766045154730598,1.4546902936587747,1.0227153147807193,1.3337297908676622,1.3844900305593688,1.248647659306372,1.2195861184759671,1.353595704613854,1.4297063037815478,1.3351546093559075,1.4184129454451138,1.3799046053085875,1.0286130042553476,1.5214457196812969,1.2309523129708251,1.3579309735021232,1.1584004978748006,1.1474282334076387,1.4021972049217435,1.1321016861812458,1.1483622468340953,1.4597493660405263,1.5017906958703551,1.4863115963146243,1.071914839428892,1.3201397903859742,1.423890676802283,1.2797619614280487,1.4083095052373202,1.3932913523776809,1.4014065977701931,1.4873636070429088,1.2349714813457509,1.0714216069387648,1.1595096685966322,1.5383860205519093,1.0687109679305582,1.5288557163406504,1.545618622972379,1.514026193799767,1.2662241251946711,1.5039303727335656,1.4998273168466869,1.2903754864809824,1.4147275501657752,1.3155836836828614,1.5031239649727213,1.5503498459822862,1.5258154520559375,1.0862941201085756,1.5096847169414491,1.2287943852238383,1.4033708438073489,1.2232266438967703,1.4029244733255488,1.5458484501195051,1.5598674149169049,1.1420480709335716,1.3775757674066038,1.0835125474473408,1.5317543536165685,1.034893879158485,1.0991096037553889,1.1431396768274364,1.3697031914382749,1.1932838805664066,1.2163002258959241,1.3464820186161439,1.2283914093338111,1.4992883269170802,1.2241614804925744,1.4019387902382843,1.2707172260695634,1.5173559353870547,1.4831975444372303,1.5587175819208534,1.5505818944460974,1.0793452359293885,1.5477211044858084,1.4461266871657994,1.3912245491216819,1.4486782406908285,1.1769323482664327,1.4320105914703274,1.4392321755633082,1.3693381031311262,1.1244239951879078,1.2753851120141506,1.3970173031710313,1.5609418990678261,1.4892263880633987,1.1551026379342666,1.5608353450110974,1.3232262783708608,1.5446385147228496,1.1466363694371176,1.2594754952028357,1.4252603106206989,1.5387854804087342,1.3795000093421239,1.4335951060522323,1.5494923283333772,1.4153603125233523,1.4994950043680599,1.1859206079784752,1.2671943423981289,1.499754818283094,1.4329582519520971,1.5341078251155589,1.1132533524879671,1.5473568731862013,1.5238009041081426,1.4524780660856749,1.0303217434032694,1.2363899854529141,1.3330226360926489,1.3563576428645239,1.2417609307602255,1.1079723760279667,1.0166716598954557,1.3991522149937321,1.4520636462373575,1.5442652474733014,1.394472240610759,1.4128578033304426,1.3704205874811675,1.1505888758824312,1.20705845854383,1.4175930180704819,1.1716819908832901,1.5137917111301102,1.5310764264363004,1.3910861588847616,1.4990734286112657,1.135793892001439,1.4199117472765053,1.0198624458951706,1.5485134810110108,1.3362273857143687,1.3422048963822388,1.4038132875462443,1.4306990069621428,1.4323119809675349,1.5000954640834359,1.5539307105755988,1.4861060742165673,1.1448948492795614,1.1079490857303749,1.4979966625545611,1.2600501378759448,1.4318396475772717,1.3686571883053931,1.3865034932110731,1.1023001752162276,1.4344708193089328,1.5295432959255408,1.467434099207048,1.2185086518516781,1.5183253062580391,1.2241855137690867,1.5349894420599111,1.3217598148623229,1.0675315411226161,1.4965313771326567,1.4557078815368649,1.3031647168037999,1.3132500508903049,1.4467325436724257,1.4229300999260288,1.5172773660619545,1.4391682601188598,1.4845568329701058,1.1989538257685137,1.1160384521605506,1.4150850362136507,1.5426377239745666,1.4934719614562046,1.4717907060362623,1.566501466204014,1.5496848313704883,1.4048792143393234,1.3815626020573075,1.1067276270580781,1.5656193865895762,1.031628900910714,1.1142734724182168,1.24057724833776,1.4912962046341398,1.2810652476886362,1.533841798332811,1.2903233397075806,1.4434395424452013,1.0915183208592898,1.3746722440981998,1.1269679338524159,1.5304910254753359,1.563206278859492,1.0219497325712661,1.2337537348653753,1.4323900225620398,1.3064285736392118,1.4478776274908578,1.5485903630936433,1.5463897079817885,1.280609503524109,1.4474811753804064,1.4482642358574078,1.5526181633849376,1.370556484830423,1.3504556448246561,1.071421507949841,1.2086478744391624,1.3268933662822144,1.2848524064072691,1.3514608943447117,1.5352430850122813,1.517599690123824,1.5388709357635477,1.2380897540848854,1.1986338461378756,1.0915137816328337,1.1079641852308144,1.1092337558919727,1.3361869865038398,1.281980948615155,1.5274592146924992,1.4279365579587922,1.1664981002199828,1.2667170527354934,1.4296850162067569,1.2689964726592629,1.449366893818488,1.4596866402438073,1.2180364320083703,1.2786724805596488,1.5667699954672765,1.3875065024806437,1.5517884937967041,1.1823899591282201,1.2643044036793163,1.4323492158887317,1.2998192953962291,1.2396413126050421,1.3400757242154788,1.2719899328505722,1.2281617973571231,1.4725781108900919,1.2415628037859727,1.0965397134342632,1.1959808203248412,1.2996212880883136,1.4520075229303324,1.40906505433669,1.2501779025040349,1.1967850476634545,1.3244487220892247,1.3556337865513699,1.4029031988407659,1.1236833593469022,1.5465706443653897,1.4022195050729871,1.1967529217821899,1.4564111634138361,1.4299168250649021,1.4717735794489146,1.2974575248977098,1.5702163931649544,1.221142155859271,1.4036173883633445,1.5292187024402946,1.4890446994522897,1.5198296372554938,1.2019270254559069,1.328124662749155,1.2971395889637956,1.3604574740768298,1.1974706334024101,1.1195149582061916,1.3534585877638352,1.1845374351884752,1.4084795507275527,1.225356572966904,1.1631096308225886,1.5506456257741932,1.5198015013374726,1.5420651886014811,1.4686975830493272,1.5357920476281939,1.3515891839700083,1.1849387164882601,1.5196975530609997,1.0758920551010678,1.0411422084994797,1.2552764275789501,1.2298748161802751,1.5181132161674982,1.4799647881495204,1.2323651187945039,1.2559316243310652,1.5269725729497423,1.3782124412056795,1.5240705686371927,1.2619503531112255,1.2795373373699828,1.1045521019585218,1.4338633353597439,1.157522110863838,1.2722507930271147,1.4848588958006521,1.2162985797009001,1.0685292533319266,1.3106037626905855,1.1291267353066525,1.2218893950010001,1.2404904731371282,1.4750796417851746,1.0494690986016804,1.2249820985179753,1.3905139410755878,1.0495861732737151,1.1585613872406866,1.137294736214457,1.5338624424441609,1.5367140632745757,1.2611711486048311,1.4168015126081335,1.5318243023447742,1.415535129147554,1.247289955054764,1.2545199868906398,1.4831346412602004,1.3027751026047216,1.1982566479254575,1.190816873320641,1.5389213941687274,1.416244112746498,1.3988019729083108,1.4873414666444691,1.4867226308213803,1.5365404082041048,1.5371970062867224,1.2020165053824585,1.3435665001740695,1.487490908531466,1.0413556169135432,1.4067375677880216,1.5040842342050695,1.3269726561326032,1.0970745048965642,1.4775937282413811,1.4445999465320105,1.2788605311053203,1.311813924701396,1.3608258137195319,1.1539237002143963,1.5099853964036425,1.4068300237783893,1.1956238129280197,1.5684558132227404,1.5309208834062749,1.5669326475945224,1.449325749461978,1.4905737420375755,1.4739876928920934,1.4043642555611382,1.3376597255821425,1.4913541584288263,1.5345959981914428,1.1599689245864875,1.3987952977177467,1.1970331383666557,1.5292053361480111,1.5403373645692755,1.5261887126079381,1.4504922582083697,1.1940148108286008,1.4574858432418827,1.4504259919651366,1.2899688907553712,1.2997842054461268,1.0948241795053295,1.0557725206871433,1.4791034499998235,1.3859704107630992,1.45340540226115,1.2488868755003322,1.5373572500367039,1.2107292454425747,1.4343198937010506,1.3858955395902157,1.5503415411593215,1.2713063050078603,1.2958316274803128,1.5272154344618278,1.3306744065355995,1.0840751379851175,1.4252491551431223,1.4951621009038139,1.3396386344277202,1.4615416296315229,1.0161791550804804,1.1852812461089344,1.1458085871261896,1.3592886864873133,1.109701081334806,1.2039032737629674,1.5194546167633605,1.4031426635560673,1.293165307847822,1.458595835932295,1.1633786858768738,1.5562189203357755,1.0309997383482918,1.2612462392766743,1.2768202329783005,1.3873589410267395,1.2155562751591118,1.376754316947171,1.2111832089245917,1.2963853822523352,1.2650253135472769,1.5474408788879921,1.3329994502472577,1.4396816892853168,1.2278323080149776,1.2015155263378785,1.1970313440570712,1.2479075919763831,1.3587745598235945,1.520874157720739,1.3050036706303019,1.5189039653306757,1.0530425216274575,1.5342521228944741,1.5398669849175182,1.5677515856385456,1.5570329637580491,1.3904193183253049,1.414151764433784,1.271264175449488,1.5400529813997375,1.2322464203249697,1.1941700720837511,1.3374887002594376,1.3644357781861265,1.5275956259641532,1.3820742942964976,1.2844702607580873,1.4547226160748019,1.5203971527759108,1.344761981112832,1.5172034271353376,1.4161489004389431,1.531734031996923,1.523908278985648,1.5140319020872151,1.3024103170454091,1.5031857786310763,1.5643294558468839,1.4914685688890341,1.3689933492497481,1.438937344394664,1.5285321216732293,1.4394062321006027,1.4294000944352514,1.4824494729230244,1.5364497801785844,1.468103126095657,1.4877093374481383,1.1176147713152491,1.3442724583691399,1.243934284089564,1.3646024643962475,1.3249302860345054,1.5570246632283238,1.4964310278716595,1.1473270418180335,1.4847989113595597,1.0689522362218058,1.5402799323345431,1.1474732414368711,1.1009346318806916,1.0394034751454417,1.241880107868149,1.1406867519941648,1.3238699646596701,1.1695742182792708,1.4407435359244822,1.0969500529039766,1.5040371295439128,1.302620260546175,1.2895381230362293,1.1658354598228635,1.0308800155101385,1.3342349579226496,1.5022783040343217,1.101477270665034,1.4651828905114057,1.5033808309509678,1.402773417860443,1.5634270098799801,1.5416215345303566,1.1449058288692626,1.2550573042402833,1.1556868721799489,1.4001648284396939,1.1915813407733,1.0366307319691148,1.2282771166707387,1.4002603544244607,1.2252312247174124,1.2905313960909186,1.3088726928574119,1.5089422951520857,1.3210492933819165,1.4099433129797945,1.092248117226948,1.5061415776080811,1.2988702241449763,1.210721031713454,1.530631455772745,1.1342005812039924,1.2914319730073414,1.4239451445387621,1.2256728247886095,1.2542274811420235,1.4506929686147567,1.4492894502079858,1.4384260832560363,1.3377829812581337,1.3154878276089383,1.1619382670313787,1.2792352967837466,1.3030159775642278,1.5490230403966982,1.4309412590092332,1.039820686822396,1.447047445474825,1.1887631250757835,1.3763433499430089,1.2803874564261006,1.3906387219575163,1.4358759531899798,1.4199248003758274,1.0474540065704356,1.323595585567825,1.3505519431510808,1.2203512129657226,1.0945960563464761,1.389839256115998,1.3177260842363752,1.3874580591959276,1.3793464826221484,1.5210617712184462,1.0557303197863737,1.561253538942752,1.5229692587675496,1.4510359309513277,1.0343050206783531,1.4389191310864331,1.4771591019895407,1.2723190200114973,1.3032796022243782,1.0630193860139094,1.3173418338213752,1.0823528804116944,1.2066264534250959,1.3737888819309036,1.3955731186725717,1.4726541245826223,1.5488391355497571,1.2070956498552092,1.3501696522446844,1.2099618406499502,1.5016080827610849,1.2215129242371856,1.338595869538552,1.2196501366011163,1.3358080692926941,1.5287702401500485,1.2558695440445307,1.2565160214057796,1.36672812128688,1.3711869192576087,1.4329648024486017,1.4847427710782084,1.4130923816474958,1.531764468423221,1.5157172473962126,1.1680275734106134,1.2283549051877751,1.5003705398951623,1.4336454659923774,1.5051309685243834,1.268491834071233,1.2653973246079615,1.5457133883127083,1.1164703406648511,1.1061534669286164,1.3448859656643231,1.5292815094377057,1.2442400749068576,1.5314684824722495,1.5092644960277308,1.4047649844713694,1.0663037111771394,1.2655772193994852,1.3325618648494562,1.3553398354434867,1.2575645649776277,1.371607974261418,1.5564836866232348,1.4851146167027445,1.1777397234356659,1.3968320474711422,1.2166151144769675,1.5280390514304714,1.5229732207421534,1.3584421874585091,1.3406101715548571,1.5263759362773703,1.4352005311349265,1.4203845418238983,1.329712183038076,1.4508258617229317,1.4018029179688025,1.4343169813712506,1.3942034406680635,1.4646469605316579,1.4979779876277084,1.3303492494170184,1.4662245972277739,1.5433650825726977,1.5627818936310702,1.5640325719034132,1.0927184838173625,1.5169509175889064,1.2723135636844831,1.1147855435911096,1.0850716030828877,1.2204877513672425,1.5051548509244825,1.299714636726224,1.0948861110676942,1.0668387758741196,1.1873630872677079,1.1006370825973757,1.3136517274997812,1.4718488143120962,1.3823692066095659,1.1104149044987832,1.4652602367817504,1.3808868533107819,1.2145568462523963,1.3213337068563027,1.4777150130304213,1.4237814542760983,1.5455366980885386,1.5564383282490712,1.2049330097262565,1.3207617386221511,1.2624379336999678,1.4255732462387338,1.2368500525946404,1.2021511947459156,1.2787939554222147,1.2853352872090764,1.3923386828314099,1.1178589995406809,1.4055818545592491,1.1409159678242236,1.1730784302346413,1.4299041001805985,1.4389605161483783,1.266644440178917,1.1741581914222257,1.2549044516409937,1.191005626611237,1.4012427365521838,1.1479550698056078,1.5636213906994163,1.3503517056946033,1.5692065972837257,1.2823285732387735,1.4057970964093747,1.0686922710641449,1.016071780308428,1.3804889531997553,1.4898603911297654,1.5471960705412957,1.2865109879197036,1.1374276766206499,1.0962353102766098,1.2847872639405524,1.1475830892691237,1.4219910437455063,1.1651016338394056,1.0199111731417969,1.0927728655847859,1.4796353880687432,1.4573156319759875,1.2730121344732677,1.2771584493538695,1.2990025566260699,1.3927446068761107,1.4072133154193469,1.026044560923751,1.5139661306907721,1.3675482719669692,1.5609784744577033,1.2600816894178914,1.3913637865565009,1.084449117828383,1.496570670476052,1.3169472781928644,1.2305332512050866,1.3831782389145468,1.4150009438892226,1.4377910885217768,1.1555578560570088,1.0995665424568777,1.225424211796589,1.0374314499837065,1.3169875710049244,1.4556375224303177,1.4996004188937577,1.5630790394993335,1.0625926899454987,1.4304963344717794,1.4619143121963303,1.1228507093674103,1.0919534867433138,1.5266024258511413,1.4798064358907255,1.4413453633102313,1.4135299582554719,1.3407214921448194,1.536205164840786,1.5233040463502983,1.2798699497219677,1.2089922106032096,1.4980285373312681,1.4410890013183937,1.5531324546154235,1.4515632862969585,1.2320959267913201,1.4352109691834407,1.4254605465138463,1.3958201407524613,1.2684298469910271,1.4627695453323135,1.4087768593099887,1.3598724310895236,1.2868918281229424,1.4785526853966799,1.5623453526102098,1.086208151252936,1.1035738677344882,1.5533318031255836,1.1834833153499444,1.0434942477764042,1.2183232180016572,1.194938784999235,1.1751187754011971,1.3773393191881482,1.4090369210500977,1.4839792262552305,1.2923735497569644,1.5299130694722516,1.3146483427783335,1.3304603573369287,1.3380759320934037,1.3350089133738199,1.4576652088774158,1.2642937513664207,1.4691446653621827,1.5388826050028179,1.3768026885075528,1.276176050363431,1.4781237842975121,1.5125026889705453,1.1809071941105349,1.3998356683884179,1.0329729236654914,1.0971035571902299,1.5590705635849764,1.3902597758454909,1.3352242930026956,1.2786529015801702,1.5363753076922062,1.2932540615357653,1.1824701991995143,1.1840847953945277,1.0294770178791399,1.3810730385883576,1.5444367866630764,1.2456792474066578,1.0791174831791943,1.1710988042711541,1.5637053840059079,1.4618974159398754,1.255205576174752,1.5489103832974336,1.1944610702683502,1.2414251728218941,1.3360010779484877,1.1834127188216379,1.1234546240890948,1.0529103370790827,1.1128437575073447,1.0260376248229854,1.287661796175376,1.5542444453409694,1.5157406075933046,1.0930666371897992,1.4823481455920025,1.546081050857069,1.4973909134724965,1.4098766130226785,1.554409490470726,1.5198988874630435,1.5283564006938977,1.3827873960016575,1.2928265325242567,1.5674465327593925,1.0788842004855526,1.1320449541207591,1.4222723344599362,1.1221853738697167,1.3963031818897651,1.3439122317310002,1.0349485389321826,1.4441449299735716,1.073568683101257,1.4029615867879439,1.2593337614093212,1.400047062095986,1.0304556050396332,1.4793035947054582,1.205247512676805,1.3272193276034834,1.4303157389568995,1.4529224685555804,1.2674348481722215,1.4146019406995221,1.471068302160333,1.5513875340093253,1.4486899721219963,1.1744254612804028,1.2573095834386478,1.2901905901039414,1.339193106878843,1.4419082657029523,1.3958500365010571,1.4775323536448721,1.3002639450457762,1.3867652330920883,1.2154401196070255,1.2312897013193891,1.3104204717996308,1.1408614807916591,1.3269654529138568,1.2561992268517423,1.31040071485433,1.3137460161914989,1.347262267944956,1.182551599093119,1.5381767330658314,1.5036688142696171,1.2342528330221911,1.2813182130817327,1.0209870433010007,1.0266018160903541,1.4222365714658476,1.1045426612408469,1.0489122698935516,1.3660151517798882,1.4259088167911003,1.2962283159572683,1.1225465685501341,1.1137829869942073,1.3753299043399247,1.2384721500128792,1.3949877160120949,1.3892526165091608,1.4823777131025311,1.3392889293677177,1.5207424759902883,1.4777493169850229,1.4427520268400689,1.1163202675370683,1.2303352327962311,1.5276089876541454,1.1950184059356699,1.0696049057966512,1.2494481246026909,1.4021763678703101,1.5669785218637484,1.5598412613245805,1.1543928073381624,1.3790008709478887,1.0938501074965732,1.4873882951810617,1.2026384930722005,1.1192134852831819,1.5540776687710032,1.078218138070018,1.4114012823838735,1.5408283904644928,1.2432783647030385,1.5154688617170433,1.2282804319842919,1.3461727380230486,1.4795903621677442,1.1371795235909878,1.4602895819212964,1.1796966401294731,1.2613965606897466,1.1566219788106598,1.3642536048028442,1.0986070133950723,1.2888738417321766,1.1673710376985922,1.474385873049745,1.270926080815761,1.4994882329574626,1.1091977931692834,1.1638606161807152,1.4561399538532505,1.2051905253591211,1.1675714049937023,1.0834486982616776,1.2555170279452195,1.5279723961500968,1.2358868667824741,1.4973547439140389,1.1962997502845716,1.5315315639437874,1.267503191161663,1.3582238212800242,1.2152624897406425,1.4927325679613548,1.4889840621919845,1.1152943561952675,1.318158648569036,1.5315338390735775,1.2751563496428044,1.5534825921781217,1.2471067850115722,1.3241253992739654,1.2813034095860942,1.2016598979504389,1.1777889181278007,1.4414064859646336,1.1908333658501113,1.4987117957506535,1.2307727104017681,1.4292978331764294,1.5602039522774724,1.4855981358266226,1.0666397272866424,1.3480966514935666,1.5163570722404449,1.1069763585506887,1.4861196248917494,1.2860286324910628,1.5186690202591731,1.5305458297398959,1.1339909178889347,1.4055388177984878,1.1207075230355366,1.5493426410900977,1.5683170939354625,1.3525192513135409,1.2485348262730422,1.3863337963217419,1.1705983782525968,1.0191966103710171,1.271914900795281,1.1761331896171783,1.372704531121723,1.3602497484707901,1.2260988096606322,1.1164247129385951,1.3191115577887975,1.5158729586752426,1.3805809693083295,1.4059333952867579,1.3402890179834748,1.0895951682950382,1.3196581828541427,1.0978885534977392,1.2794343960907455,1.2378234959053849,1.3037919739118755,1.2917995686607835,1.2050140305980661,1.4273400827175029,1.258497082774457,1.0820928484189649,1.51723976369855,1.5211020780259614,1.4681942159850649,1.2276323993507834,1.4327219524155141,1.2763428308260563,1.4968361863951565,1.1614330046452006,1.3042252435136481,1.4020821101736614,1.2005101437756176,1.2158717162500332,1.4268707838737398,1.1599952488806633,1.4487484014703842,1.4367113803045197,1.1089213509911244,1.3267237831976073,1.3648197756495244,1.0406673683809968,1.3154902879259383,1.3282437356021204,1.4586871503950463,1.4331404358033371,1.5070437621739541,1.2911837780705631,1.2478170447331158,1.4194544415755284,1.4925723236017572,1.2117209163640779,1.5152153020598831,1.3947649213478956,1.5284558684776219,1.3569492808319255,1.4456116426103014,1.2488920929338696,1.4491638963146054,1.0473974480160471,1.5692316214966655,1.4343387901707982,1.5156232465069674,1.1581932009647742,1.2194744841752454,1.2224758799692141,1.5013950353968621,1.0656304572305606,1.2738801382834752,1.5583111726274632,1.1813318091486582,1.4211732361621281,1.3436159889245081,1.2672813804905465,1.5357956792844203,1.4548504282529373,1.2473620861273838,1.4769823609640778,1.1386993141814254,1.2392732185944109,1.3750114184143243,1.2884067471653755,1.1205212086413039,1.306677010299641,1.3370801432989095,1.2685305839064973,1.4362827582229332,1.5521419092887307,1.4978156874236068,1.4248494833817911,1.3231731310680905,1.3769462386582039,1.4687475402041617,1.4724707769753562,1.4118061930515808,1.2369496401416962,1.5302187115995292,1.1451354347480673,1.0320483786560422,1.454847735805485,1.4671147887505407,1.2273508656205891,1.3928166566844011,1.5157841656577022,1.3839727702793343,1.1589479917032681,1.2266024880437079,1.5154397329474938,1.4087894412214412,1.3079487389135707,1.4488016410377316,1.4169296960786164,1.1504231805050811,1.1793709544757489,1.5203038770855282,1.3512764347628037,1.3645285100159892,1.3583074177257761,1.1935734869671051,1.1297613355754037,1.0185752327817921,1.4228701440159313,1.1874876518419106,1.3778588715926192,1.5601286346678609,1.0566500589461283,1.0607459343856551,1.5542207065027986,1.4308593729185584,1.0471657928488198,1.5523532100506217,1.4944294149520845,1.2984940303956001,1.2647555630677703,1.0460271394181115,1.3088852649715323,1.2508351384438019,1.2602093345189902,1.2605677664473631,1.4192783860038256,1.4895451919106566,1.290745337574422,1.4861280444619984,1.1764361504270227,1.1399248832626283,1.5632825792610998,1.1383199733810725,1.5376625733956681,1.2333261408736604,1.0452513015600291,1.5629259130804691,1.2736276643276707,1.4130297415634279,1.4766166893356105,1.4408183369237568,1.3996491152094099,1.3539980488315819,1.5222257267227337,1.228479512934018,1.4605578700537121,1.2370113991735152,1.465159524472087,1.5205951245367888,1.4325823160573681,1.1834472451314777,1.5098249342421961,1.4329769247536164,1.4252020440396742,1.3948622742485952,1.5223733779195254,1.4337014115695317,1.1243771056006966,1.2933850753423755,1.5334757821763554,1.4405303802232505,1.0872948422746975,1.1943912604592246,1.4017379671206331,1.2628665950092517,1.5522025563662942,1.3343242946142415,1.4277536746626798,1.2330176803353068,1.2243688463321287,1.228117567025365,1.187347195681651,1.2802207830665655,1.3305036884683135,1.2820323963979299,1.2538306380050683,1.5303532298703348,1.1170611321455866,1.5251975288521709,1.5492731099617378,1.3247536706243719,1.4450834101225742,1.3693891537624809,1.5526813531914005,1.2197016701954602,1.4917936788813762,1.5345062895539681,1.2338968596117654,1.1857844405313724,1.2329470500450341,1.3301282708900208,1.1291964659517031,1.0497187369363414,1.3110007010955602,1.4874357616278895,1.5429447364468318,1.1114333886702419,1.0935031099715242,1.2248855051981973,1.1836064776702169,1.1904215948093089,1.4528997886110933,1.4024545948726448,1.3311402684236755,1.1047652700167934,1.0344706595617315,1.5252536414454889,1.2365731509093523,1.5110911537157097,1.1573767837855407,1.4836629697986381,1.3856012670016142,1.518764500238114,1.3676071517515276,1.5434751711913113,1.3223553038380327,1.5353884719034139,1.4602735446543778,1.3034141526688132,1.2163683724636454,1.0630121402138326,1.3512231540079607,1.5227048328984016,1.276158061829995,1.1455767654409663,1.4432713748185584,1.1689449668816345,1.5153892504802953,1.3669194916626086,1.365192315396955,1.261640330311494,1.4186216449559879,1.5049499007709335,1.1916290694110774,1.2058074942056805,1.1966756758379649,1.4721756677057285,1.2639662589759852,1.334360419549633,1.51753109989474,1.2322166338499341,1.5623821654267382,1.4875741622745755,1.3228076516971232,1.3101084006185417,1.4463422669444399,1.513023524139421,1.079107401525087,1.3741081497767618,1.0387482604364604,1.3932350643646736,1.4526038633991498,1.4032091850249842,1.1833105409677245,1.3771375858557997,1.1151219531640306,1.2885590877741415,1.3029965690563965,1.3226698810007069,1.1244811961909011,1.1950471032985015,1.0752405796215394,1.4461570258157896,1.3283210823830298,1.1796605262932309,1.2289602079667916,1.2445411946566056,1.3139855565724294,1.4271765314479117,1.5606948895256965,1.5627548923915451,1.379257998786902,1.4073246782036442,1.2764404002765197,1.4389024786074716,1.3425490320646924,1.5170885526875442,1.4141051988790507,1.3845530767876906,1.081119283704842,1.2179815456638705,1.1639368894007682,1.5671465825598214,1.1502276288094855,1.0195614022643731,1.4140033515051846,1.4548409667879554,1.3053089508884088,1.0497161426661061,1.1331278092432771,1.1919825996223272,1.084299956670596,1.0416956620232307,1.2639934577638725,1.5091148228264957,1.4870247754581061,1.4068925594737698,1.2722292079519026,1.0973894388054763,1.5423984620467377,1.3513110565887085,1.3981340550589438,1.372890808646015,1.2648625227920047,1.5235924725742451,1.084104911616667,1.3019129052789733,1.1765707988755973,1.15061157355771,1.3607924274615102,1.509913825699799,1.2115715393164861,1.2794986793208862,1.3932826304682242,1.2402133605466696,1.048372388645826,1.5387166889712838,1.0308339294945961,1.2335887379167287,1.1393401975762552,1.5694806412267241,1.406453652550079,1.1430754525083571,1.3753072526483188,1.0331179657770568,1.4699819754888301,1.4925539735376712,1.1940179091216749,1.4304336573214738,1.1253802280109315,1.2939774601542295,1.1010074275481141,1.1038673851934024,1.3236133246938715,1.5609391075170709,1.3022804937077193,1.5221254991313771,1.5112107434655691,1.5083519414005813,1.1122834473242547,1.2186292721335974,1.3774019636582902,1.530797414471976,1.487491827308778,1.5249636696601938,1.1123329043048658,1.0794013812241712,1.2079203102340454,1.3529932834210212,1.1256476358104097,1.5023009658479374,1.4533374975343429,1.1449809572849718,1.2612855237313256,1.432350448360914,1.2663630482992321,1.3395974640564865,1.5219016504402809,1.3797391149742142,1.3978567913850364,1.4399417333365934,1.4575702987091397,1.5092445924927329,1.2359828709164706,1.4400725230722751,1.4540247526304328,1.1474837782672596,1.115053290276643,1.4000955481758623,1.1659697433577196,1.0793975496547445,1.4059233714036234,1.3967593586418816,1.3541976442679087,1.2037713324835013,1.2488560241258349,1.4183266976486841,1.1605876932705836,1.2792356232162068,1.2965079504996027,1.1353056912526509,1.3150455134707835,1.0896281029559467,1.4351070373949861,1.394979516127965,1.374495072704832,1.0876493893177948,1.2376919577666103,1.3833482722393466,1.124184618879603,1.1780890282647751,1.2334842975947098,1.422950803709391,1.5635350043582468,1.430833111041254,1.2604011341397872,1.4352043077220391,1.3830987202887322,1.5323873904120908,1.3834275431998102,1.2338467005303411,1.5242561912085419,1.5683069849655387,1.1740625425769675,1.3964175771365577,1.4356389307324116,1.1109218204606095,1.470179825488299,1.5462890575414006,1.4276000385578913,1.1162054548116813,1.4125505007898578,1.3729868491383446,1.3296586438167128,1.430010190915,1.3217293364367397,1.3904763201340762,1.4032286036727235,1.4823445831776791,1.4021526896480756,1.5322414411545329,1.3454839888365486,1.4693058928262872,1.2701657748030857,1.3772441702884848,1.0686729951622886,1.3862999276353383,1.2325904840677786,1.3932049379377187,1.4012433434272809,1.3817399023907317,1.1623206915310893,1.5094406517358214,1.5171890642624934,1.5668565560339176,1.547017873152166,1.2162204548322679,1.5375125675158792,1.0673193237200134,1.5049946370384106,1.1046586004091765,1.4359236300575944,1.541536102375364,1.4459404245876557,1.3465860166285522,1.566245187713869,1.5350777614830733,1.3330619598262572,1.5582321372329584,1.533034425542088,1.523966466758937,1.5121844761599399,1.5107792917688627,1.2848133421155528,1.1476243500643828,1.1428625851843563,1.4702794956397645,1.045856069258007,1.1013335498789487,1.3170855153090593,1.1901368975768052,1.0201064994051874,1.0633747096893322,1.3260639679615323,1.4251531722153346,1.3454381952749224,1.2533480797940011,1.4330242885369389,1.3082926792840115,1.3871511689731901,1.3936464196117682,1.357215524026685,1.0451627336847196,1.542803820169055,1.5682499316076624,1.1216277108024859,1.3199712892675612,1.5453587876893342,1.2198708303675401,1.3842078013040404,1.2181951524354693,1.165934991662557,1.4571936795988452,1.4038280279726756,1.0830320199604861,1.2944329974675703,1.1788447217289053,1.171385967762157,1.3476806817824472,1.122783562327031,1.3933171192741631,1.0863716306944293,1.508385090860384,1.4937668342986137,1.0248147381210388,1.4648405158352928,1.4526337376142227,1.1137425812034729,1.4605621452015787,1.3052146912559288,1.1950153880072487,1.3512469033816821,1.5468781410483088,1.2947924773298698,1.2398682923369058,1.1708557004510733,1.2881584037872684,1.3371435865793304,1.1296870864448065,1.489011880484391,1.4269675456630557,1.3757163810195032,1.2353775205305895,1.3881440147015274,1.3801585566475134,1.0541592740568795,1.4978367700768931,1.2908667435509289,1.3012950823200875,1.2485154943555721,1.3916702559733432,1.2338975679310331,1.5664897081944971,1.4257064755417246,1.4491206980531415,1.3446688236570017,1.2795629031505793,1.3244359044912943,1.2467241384242176,1.5080631414837704,1.2143071064901469,1.3216588097266171,1.3804881164300391,1.2488571346591719,1.1342354929219189,1.3888343647492267,1.5327607761246882,1.1592636147217641,1.1447042002150423,1.2271474012796881,1.4427850233495982,1.4197309239906575,1.3638950535329852,1.3755626099720661,1.312463902161018,1.4076097252957205,1.4417394686733345,1.1997110162393891,1.5619259444135474,1.2253990605233942,1.332392910387532,1.3870199989928222,1.2003268352673491,1.2494685024481036,1.4491761705833639,1.0739005215825932,1.2323750863825929,1.1941409018328824,1.3236567178336904,1.2425535109455026,1.2224647935650903,1.5273861782507439,1.4807461713911729,1.4059678669237508,1.1267082371987065,1.3065199067315982,1.4108151649914931,1.3730665780743208,1.4348698183924278,1.5510387655772646,1.2756890347180943,1.4777072800853557,1.0704390902867178,1.1607127818673297,1.3543923531096338,1.5646963279377277,1.5275274268831998,1.1396601722690609,1.0632314421811786,1.5399906309194562,1.0914928255345608,1.2636652291531949,1.412417151271907,1.3530517805079147,1.3704007540170999,1.4822664094895714,1.4076352208415119,1.3166792794132323,1.0669104108470491,1.5221569465107618,1.4800536803509734,1.2624583874921902,1.110424475707888,1.3018972222843668,1.5666364598892639,1.5488028542607488,1.2649598967741655,1.5486571505596898,1.0807520863173365,1.5097147935966826,1.5641566898634114,1.5631401931517144,1.56993561829461,1.3846890602337452,1.561186429098443,1.1620781782847664,1.2988537023520943,1.2923133964713722,1.5303178047397823,1.3430898343531958,1.406410770246638,1.1395448923241476,1.5009806687597955,1.5320959637895966,1.2984827009501489,1.1056152867541915,1.2924585146374437,1.5279205760446861,1.4585225334737173,1.3446656352632484,1.4663324406714309,1.5135675444953589,1.5576606411963276,1.3230512115091457,1.4297333064402933,1.5690143807000412,1.2332159263923159,1.2053417983269321,1.066286735499328,1.1504957892369267,1.5279808086565192,1.0984455611551678,1.1309014039106864,1.0319892620423368,1.3778114008047768,1.3506027141259629,1.463778585973978,1.4592578183713256,1.2099238033973805,1.5308625940987759,1.1806046117085156,1.3492478831204524,1.472259371478587,1.3093242909654905,1.4253086861060056,1.207730942779264,1.225771368221334,1.5380282582829969,1.4587967557365897,1.2678779509566138,1.1206472378970329,1.3446745556643087,1.1984380932702523,1.5020218063829525,1.4506024496661394,1.0798625724131505,1.5119218403120993,1.3067435755483283,1.3735901227409102,1.3820827694961204,1.2281522302155436,1.0768697030251861,1.1926291380766334,1.2710731634793095,1.2347641321597287,1.3766548938666177,1.4571373094652342,1.1568665451092008,1.5643797591766571,1.336770638989949,1.4098675779668597,1.3258857577920438,1.333477322649824,1.2573743267236057,1.4293210143320836,1.4164563446279006,1.1592902841305563,1.4731644382592386,1.3556161381737499,1.3128482214900665,1.1540600412922384,1.1373266063351373,1.1034226815909676,1.3981106944796784,1.3230937888175636,1.5260541796867173,1.4166435576123759,1.3805456500712563,1.1918640931292508,1.4466230867997258,1.4413931056147484,1.400632869219177,1.3185411656378283,1.1612861666413217,1.5373452893044217,1.3995847804925057,1.5419586650291801,1.4058540088479634,1.0819776432237074,1.419540145823057,1.3383879741354736,1.5147603706830732,1.268231690122317,1.4641692903033767,1.2810553593873792,1.536480688552486,1.3047140661550183,1.3874383265512322,1.025005533795313,1.4654036165156374,1.1668307171983323,1.4477854779202002,1.2936458832847675,1.3895912634996843,1.221491261867053,1.5233724219315319,1.3428368309122691,1.3556030038586835,1.2337288777953095,1.242061577638921,1.5218790405579794,1.4713230873510332,1.2559560792482709,1.1935999574111795,1.2352162204510744,1.5415836157634821,1.2604133964766731,1.4041310550749793,1.2651991578741497,1.5694759544568797,1.3665357901955573,1.48112462550315,1.5482562968828568,1.5702905788563468,1.4123617787262372,1.4944408229142694,1.2883369341538964,1.5138440051782831,1.5253701652024461,1.4607158793948587,1.33623905733531,1.5004196284885372,1.2718116069801306,1.5154203267657822,1.063248749602991,1.3022711447818833,1.0644111774086005,1.1112176945760917,1.1142873382114009,1.0791339920223817,1.1071452556895185,1.4809084721364094,1.5127841409386669,1.3617146417826487,1.4122513098503136,1.412403607121445,1.2561684408310312,1.3412491582894159,1.336419259664805,1.4621097421927616,1.2366438709350125,1.5438738618788468,1.1677436949193829,1.3841400148701057,1.5691390992054899,1.5008529546749365,1.2568209669951467,1.5605968872075293,1.2211742482431871,1.0651564109164733,1.0974360868594122,1.3868685417211399,1.312156867169328,1.0585753315037103,1.5626409196646709,1.2080276977326496,1.158632878654821,1.5679354623546848,1.3032421868582245,1.257389755103026,1.4577967409657846,1.2423304370529458,1.4399670371074869,1.2770923227585438,1.5685235401621136,1.326698933369961,1.3621125770237068,1.4822175306901422,1.5030915721847897,1.2017418060734089,1.4128207010252773,1.4779889953528291,1.3465202135153189,1.4147704229412372,1.0440275756685859,1.1191638397543084,1.5033787095491697,1.1449948654158748,1.1372781463016433,1.4001436912049059,1.2298350796651352,1.4386965752890792,1.3961398155784315,1.2970434038559351,1.2573373927290923,1.103878581486619,1.4182014341630971,1.1047688321641684,1.4486703368499512,1.3061538102349228,1.3722537510989576,1.4321747546468799,1.2514495762772331,1.1473812181931626,1.5099258121704722,1.3812391247582825,1.5408303162186454,1.1085886348299667,1.3065935782028419,1.5578165464934184,1.3614136458645651,1.3368707212432147,1.1784106558196947,1.236085532795824,1.0543637770851131,1.4985783245857183,1.5295595537501885,1.4303907303916945,1.2468697340667394,1.4950563278621507,1.3659836156988101,1.4369499582572516,1.5278252213229266,1.3994780884174511,1.4818935130853299,1.328625246425603,1.3899180461112475,1.5516731556704766,1.4944519981226667,1.326481304668685,1.5279796173532847,1.4577780834666558,1.4078933353385181,1.4722142362309916,1.5377742694189092,1.4715073534322225,1.3257761002706341,1.509029260797073,1.5640335994093095,1.0635130682455347,1.0205203901136026,1.0824137984854663,1.0170673540371633,1.1713359856717145,1.2783349865516422,1.2290355888687798,1.2996077547070868,1.5000359185062355,1.2310624766137088,1.4195757221424918,1.1995682556917477,1.4946043942021643,1.4910939270066768,1.5703303177050547,1.5307160250804013,1.4394104627332422,1.4779811261330744,1.2460479084417633,1.4085218911503758,1.2880344297874191,1.2435593934893023,1.3314479604117224,1.4300045427853361,1.3828463300958675,1.073034460571304,1.4522492184950206,1.1793738764711208,1.3523322113083156,1.3340085149155472,1.2085724491917242,1.1787799333635025,1.2080317358862078,1.5241350875984672,1.3143541020516931,1.4467667348017543,1.2172049829430629,1.4113469103358922,1.2768669466416533,1.2228767395121043,1.5217366011963345,1.1872899386259343,1.3509690848478773,1.1905899133122522,1.4255404977320467,1.3938728607013076,1.5343345814094052,1.1159918425803808,1.5116343728745585,1.254344216216972,1.4906593565949022,1.5568743915306276,1.2618300334243091,1.1323787421208451,1.3864336701839926,1.3145490371762363,1.2490895888170328,1.5423478880233412,1.4656194179884077,1.2644884746261662,1.5669955370131761,1.1732179248199761,1.3369435578740678,1.3772761686681598,1.4557746396147939,1.185361742526021,1.0729768606349464,1.4149214746865062,1.1069128392395682,1.1891844036852013,1.4046885841495971,1.297445297955927,1.561088256822682,1.5647265392670251,1.262304451014935,1.4326324466567029,1.1586352758955216,1.2861924801605855,1.0486658462045368,1.486947310682204,1.5484228262020607,1.3372887269414482,1.3774355261069011,1.5671426694791473,1.3109810174357153,1.3398651077556076,1.2535914222730578,1.3916156398712078,1.2343349038956264,1.352052763192753,1.2743582071794273,1.1630358955917872,1.229847572338012,1.3661382597587308,1.4133993939794147,1.4346122127216663,1.3114491012065721,1.1464652297534539,1.5246298731054868,1.0561983902944423,1.5481361482226077,1.4144549698512003,1.0399822282423927,1.4308706534330722,1.4533930358242457,1.3532934847486293,1.3043567861973484,1.2992030019775835,1.0579890204821525,1.3266170038210916,1.4958676030215936,1.3888204357259304,1.4928189943641312,1.3461826230424321,1.4280834505660625,1.3481403316145184,1.0848247798163158,1.5580117594484426,1.4056257564851686,1.5032193522859425,1.4584745196517237,1.1842512941433083,1.5099434537249525,1.1613455372524293,1.4026291718385555,1.2789741931181886,1.4129968850288466,1.5129110827478847,1.5185096905469222,1.536527852538357,1.384753320689587,1.2198025494454727,1.5345901824500223,1.4080863428113348,1.2938100218682809,1.1335029376483157,1.5665192243523729,1.1685734768365719,1.3158189449962963,1.492407121549884,1.1905789574156482,1.4563925457724418,1.474848221191424,1.3335234367889159,1.3785431618158952,1.5549875390794414,1.3178584608712287,1.197692276265081,1.5466459533827457,1.539136329485373,1.3549977995884381,1.2675164764983855,1.2786530263152762,1.3795963760287873,1.4808738580070901,1.3112704621907325,1.1587150311254861,1.4346574184823253,1.0490998913331562,1.4549438839447508,1.1521570042888651,1.5602553458778845,1.3501707747437883,1.4293384871425054,1.4560007105429724,1.0936883945103997,1.2178493606980987,1.4901182358303187,1.4741776214716613,1.1497202000504239,1.0626296223512046,1.296071833754435,1.2907553346759466,1.1761641477895575,1.3015355688378358,1.4131272385155376,1.5013733973247176,1.5496975453100421,1.535059890260797,1.0909246381840638,1.4662784976329706,1.1251818176092905,1.1434069068297412,1.5577438220105002,1.1031692554450552,1.0574565971957552,1.2460380922042744,1.2636197373169198,1.2308897581536051,1.5404474656123841,1.4771949094942929,1.4885866476783565,1.3143553839641111,1.5254916367066478,1.1767865271902096,1.3496162130862612,1.3994843315983081,1.4140759338531623,1.0302970287892734,1.2402160687261052,1.535199951035175,1.3677982298600673,1.4373910287132148,1.4797271376266603,1.3474680166869994,1.1515689204957544,1.5469623364270855,1.1683348423748772,1.2305857850651456,1.4309189339305284,1.3245076947605006,1.5402867258793274,1.3384266445369892,1.3987857366520025,1.1636266295743831,1.4434204438175926,1.1432701493934594,1.3763435507181245,1.1910346035332424,1.3949608082301055,1.4387796442117999,1.4222811652387766,1.3765288388324199,1.5595656516800631,1.2143822956945938,1.5399560689974172,1.5271721542167032,1.332982040241403,1.5272205818283884,1.4114814380855984,1.4599283699980357,1.5038221798161542,1.3408162147265767,1.3416205908450791,1.0474828384317609,1.2524151676002173,1.2396992567597074,1.2519346117567951,1.4414421387415277,1.4502778833299803,1.450475851597246,1.3619048584623519,1.1493198018939075,1.1768380621373888,1.1026961465466179,1.0315101646433049,1.280334465377958,1.5503860167368844,1.4662317151544979,1.4946059503260043,1.535736376412016,1.3014915450298778,1.1578767366070837,1.3811655587573146,1.3097947300662902,1.3033734656774447,1.071260638410807,1.4189196392818604,1.5467941994028855,1.4820547327205693,1.3098355571651943,1.3865427866708071,1.4532681797866922,1.3573508457302377,1.1651772180285032,1.2383255602764338,1.4936820576441461,1.511072657122341,1.3811758983449731,1.53165209651336,1.4043505703234107,1.3259752150871713,1.1659731168835981,1.357594183566748,1.2592042716292298,1.4421893668143793,1.4866749738667668,1.3014688754209807,1.4386583518574978,1.2963350731976904,1.5174052276623415,1.3843243738238487,1.2622896059345172,1.3717706958556435,1.3170057543184106,1.1446597001703427,1.502555105183752,1.1188749604707786,1.5117142305916786,1.08265991062487,1.3649445608236148,1.5178448638533473,1.1055747026457836,1.5169700549926375,1.326768400160107,1.330896794561554,1.5579108294918083,1.3198939431845906,1.5496417639005491,1.2965177578018736,1.1804995909369307,1.3854774761719837,1.3769297405230347,1.3656545736164774,1.4093421149655234,1.3230856542815066,1.1906349880325269,1.157540760164633,1.4177857862271008,1.0557013646489364,1.336909601920905,1.1991063688233248,1.2389604314480376,1.4929326128862823,1.1339289347230195,1.4682275851164499,1.4339192802301539,1.1153278528886379,1.2743150952908702,1.4463790304504034,1.0452152909990773,1.0627662589676312,1.5408322502637299,1.2826630075463492,1.3085787214767675,1.1133986045298898,1.3947716315563041,1.4100946936444001,1.4426534376315525,1.1823047410529135,1.4625611697079739,1.289381884575719,1.2103126045950861,1.4974036169019285,1.0221666367994768,1.1448870042197696,1.495535083432681,1.427771772217046,1.1961298590942004,1.4979996379555416,1.4916584451985833,1.5064479140890084,1.0256680311715405,1.2215284502387487,1.1823576096207253,1.5084846896668147,1.3898904313960905,1.5065549501390354,1.2286723728977931,1.4054029852693621,1.3539740883707543,1.3086038775624937,1.1778824973012294,1.2812771662755882,1.4213373071043245,1.5457988066616726,1.5419219983428476,1.4160213367795171,1.3064738797554152,1.4038888901453148,1.1038845930041803,1.2495690193922444,1.492513607171261,1.2363366723933995,1.3860261825917102,1.2798655593627544,1.2162811181507884,1.21908796876893,1.5554498576043199,1.2028093146206396,1.072890521546491,1.5386893845256377,1.2072368851466226,1.3841249519799594,1.3233360513614132,1.2748814306805987,1.4966784502739323,1.4400316954987873,1.3541748890300551,1.2951565953694812,1.3442389873484375,1.0972938053352073,1.0233725486807796,1.0516869473866011,1.1460951852157106,1.2566045003455872,1.0577521353796688,1.487188403540318,1.2580191605908162,1.2625955916849338,1.3996443219799768,1.2742883680248778,1.0830111151107729,1.2606534713673543,1.3632779128781614,1.4351689838829966,1.4763796901079789,1.3596442382983938,1.4030106036058092,1.1945894520137319,1.2428444418185181,1.2009473670728819,1.3234714437408506,1.3161694887014104,1.2116454071681408,1.2967988713107734,1.0218355163172752,1.0728935364017833,1.0577253397830384,1.3776206750187945,1.3355282040584306,1.4919866753231767,1.0563163346318392,1.0857175343493748,1.5248302792225941,1.182721782177883,1.5505994777968006,1.5603107064033159,1.4447786192873489,1.5698097787034266,1.31218109900226,1.2751781425496918,1.3376129470900038,1.3816169704060923,1.1110984165410209,1.2737567287066096,1.3327323459203417,1.0823061105495144,1.3862103855622923,1.5192784817323233,1.3316501950548993,1.5253652596799998,1.2385111689182147,1.2872830558878638,1.5642934574212453,1.5368524471364973,1.1832440950288128,1.5321515097561624,1.5138336115700761,1.1771502831493852,1.363772725276422,1.2693286952399567,1.4655974202347097,1.241083656287479,1.4155842759503781,1.1138291644735367,1.2677828217546916,1.5140337489831155,1.5026209717041272,1.3066742101430642,1.4560408028365921,1.1663459677054484,1.4906374012629395,1.11227010566189,1.491964252190513,1.0225724522615285,1.4347494263936702,1.5622658307056119,1.1272786563874768,1.3568839041149479,1.3673746291450406,1.0408313678682308,1.3994253766649911,1.4403242210155143,1.4986077358072862,1.3270436985673104,1.0512829621125448,1.3094885478658507,1.3977924111165869,1.406663474831203,1.1534927147249858,1.2570425656798814,1.2934322193902303,1.3440195704802036,1.4121272439863164,1.4757832459325,1.1296612530299737,1.3828207750042232,1.1937406023428139,1.298883384486017,1.3703650763624355,1.3379271395004817,1.1745373257146585,1.2080819654649457,1.1132864988268865,1.1655182962732251,1.3875137399233799,1.5602846950632705,1.4313835118037765,1.5290406212123515,1.3034655911684936,1.1991586202843987,1.11047609314022,1.5624129263781363,1.2446131267934326,1.2230796375469022,1.4117383034181084,1.4805782804129004,1.2249830799902879,1.3574389233614146,1.0656978085922357,1.4561058413566901,1.3315754265550934,1.2036453660493074,1.3329594475136524,1.2465122374037123,1.4417760118941656,1.0324686926799331,1.5427249220491177,1.4018544861424107,1.4974581212364599,1.1539752905797651,1.5339955986213463,1.3562593628732562,1.3710760126567088,1.1923009345288997,1.5671617980082551,1.3222586099052613,1.0999273581436775,1.0835988274212036,1.2784166936746444,1.0981205089963069,1.5702444931166781,1.2046191533358264,1.5589159033833464,1.473319840764592,1.4863078443816855,1.2293787653104871,1.3751990335257713,1.4471027063476558,1.5200840450074593,1.1535038110477389,1.5674289306171958,1.5632070151355355,1.2297481651187105,1.5143303320890875,1.4224267325835258,1.3423972281628971,1.1965792591689797,1.2388643355503828,1.3839828129215932,1.4213874053722937,1.3840314005320897,1.5560983984197627,1.5514851890346881,1.4663478957311427,1.5513193202476661,1.5478984939003593,1.5347565162600532,1.320471575246652,1.3048555993812105,1.2409486196854986,1.4723938061956021,1.5141200917291426,1.1556922271850671,1.4572143046218939,1.1443905496390512,1.2969326971300514,1.0565696695210169,1.4534164986339164,1.3586499480991872,1.3440798343059051,1.4812807949360325,1.5091888355402705,1.4787661444487028,1.1652093839627997,1.3346520288317816,1.3331055958344344,1.2082189741987603,1.2704295084245987,1.4254018199753258,1.4639365463180705,1.3721702151153743,1.1657013544514554,1.2803081602548365,1.1712712376759982,1.0980193231369948,1.4824070350300085,1.5059596906339776,1.2002738110492539,1.2365985300810634,1.5615336328535687,1.313470712640348,1.4289082943351552,1.3855829771950541,1.4617361289956829,1.1243085768079877,1.4532527272696305,1.4045178680175257,1.3053533641529074,1.4987148572577749,1.4224126371177839,1.2836093967848523,1.482828279331871,1.2887189200150944,1.2628125683820641,1.434255034612927,1.5462320883577845,1.1818916017905425,1.4148383905177826,1.0166899357209385,1.4140583349174336,1.0386671234156029,1.0419496796936976,1.5201776777364275,1.2136172336233244,1.4761876961474889,1.2210649440950487,1.5615679813979961,1.0376568186987554,1.2976905944736528,1.1265900112012146,1.5267875376236646,1.4268443378024951,1.3977906429708054,1.4015434519986307,1.1244353270161334,1.4162391394431457,1.3288479818154018,1.5570061716248964,1.4156249270610413,1.3116277162956338,1.48636044913387,1.3770454542088222,1.3819351827312851,1.2145419370316572,1.0637219536819595,1.5442603496361622,1.5214074979629317,1.2184645687483044,1.3675396489908991,1.4528024883380064,1.1446194373700393,1.4700759055555492,1.5537889636530875,1.3478902952048544,1.2507043918681076,1.2927475025508173,1.0408216900515164,1.5383570553113097,1.4540758550631221,1.2151744940221985,1.5174177230152557,1.2095689133342975,1.2543751387670798,1.4526884402115181,1.1044799215492846,1.4932842591983713,1.2958399204001196,1.0948411411246346,1.1120702304895844,1.4998300055583609,1.4926533276726044,1.2436069471115172,1.2130186196438679,1.4578251002890128,1.4259940324730949,1.2537299780586708,1.392538279853955,1.0275682725171906,1.5083839655572542,1.1603024826029942,1.1711418825603015,1.2988182905231243,1.2882154394290775,1.5387066261628337,1.2227882571058042,1.1973126892711179,1.180466904728382,1.1184353206521931,1.5443265377222657,1.4159694955354878,1.0687887575507327,1.5368975404559955,1.3543592915257316,1.0920850602142542,1.2125700305899796,1.2813655091068803,1.2204372026081445,1.1552914340929707,1.162834007561202,1.4353880048050438,1.508060398631228,1.4473166176280585,1.3740680168178194,1.369372722050221,1.2919281072137467,1.4635919520533929,1.0854446300558782,1.0238770641216806,1.1600873357776074,1.270853762895064,1.1156612142370055,1.0588836007466997,1.3109555980339564,1.1129621908702461,1.3108352367624581,1.4246902953104501,1.1460416857528066,1.516173636446114,1.5571525019559844,1.552930091817649,1.1234081834677139,1.3322402233637762,1.3976634303420206,1.5165911180459066,1.5565550226510849,1.3695001371863176,1.218138303306193,1.2875562049369182,1.5087525178864447,1.1571828965857454,1.513257941198495,1.0999338443162696,1.298482586141434,1.4021464832528616,1.4666165876958766,1.2410652022674222,1.4359530653654111,1.0978605016182568,1.4004440617682414,1.5212307811143562,1.3982997540153426,1.097241876282139,1.4077017915811678,1.4935171846780386,1.2964152038022718,1.4352216406906144,1.5037515257786458,1.2906022550465044,1.4948972705605716,1.2345479972539453,1.5333344475774315,1.0990355219912169,1.4363864868947616,1.4682053252558849,1.203498915363419,1.4365998967837175,1.4753834397021726,1.4133545294929057,1.221685737987027,1.480296214979073,1.2500115081885144,1.3913891999583317,1.1676832269737383,1.3569543686515289,1.1650084062821522,1.3627750925743738,1.4496337436757172,1.3171785670599905,1.4425499568704736,1.162880330603306,1.3416278156328099,1.4800572017686038,1.4354401673935386,1.2497369087026811,1.1623406595701125,1.1763655082114932,1.1770097850131054,1.1678230501358546,1.3242789247497142,1.5194710595997831,1.4629391634089239,1.5095179501060223,1.2570870011761004,1.3886275527722269,1.4755825945020387,1.4372168758378254,1.3744947012261268,1.3824132397551778,1.4084537812906019,1.152880468993184,1.3337273624542336,1.4014767305069336,1.0264549859242147,1.4569702836918836,1.2125236809528133,1.3764140532193747,1.0392359203050501,1.4479747658731272,1.4750986151078707,1.2997443160192614,1.338832409146002,1.0404948921608121,1.5506043286444431,1.469831337894776,1.2114928203908457,1.5333920914723564,1.3006165786877966,1.3373563747755712,1.1444224281119189,1.2737805611022746,1.0304846622027697,1.4618092064105566,1.0877730065758489,1.5310669322616168,1.3968263611598783,1.071150325163736,1.5706635669516895,1.454142294612627,1.332564806119038,1.2986183101796458,1.4866209672383115,1.5229117206131859,1.4817177218187871,1.0242429717917958,1.435212798433033,1.4232264112683819,1.5328017437292056,1.2458264496798659,1.2172846339719965,1.2562429481688198,1.2166829699203727,1.2749516449362284,1.3313265218405737,1.3368987232636935,1.429669407376057,1.4523336150880017,1.1620004423254995,1.5705521101106832,1.3265637471049834,1.4508288791111901,1.0624409965959833,1.2905266353545668,1.1176841419748096,1.3008409202836311,1.421339731879953,1.3458848015417351,1.3297365806681585,1.2731132229359006,1.42580322387751,1.0254974086104929,1.2893717112638012,1.3256581992633165,1.1860734813779681,1.4329677281590221,1.2183063481871015,1.2704582180534731,1.5207908187533439,1.2132040233488743,1.1688334611642277,1.5279223297313178,1.5609723854111004,1.5066969074390235,1.394516333114947,1.1737089472219728,1.2271350531962666,1.3051091121436738,1.1959827791712108,1.55697703698865,1.4164123393468826,1.5490581812173689]}
},{}],70:[function(require,module,exports){
module.exports={
  "x": [
    0.0,
    -0.1,
    -0.35994668285242115,
    -0.5983549717741088,
    -0.0416988401353211,
    -0.7844638799533743,
    -0.5060363363656264,
    -0.5235004646833386,
    -0.8214885962770104,
    -0.9087145433170154,
    -0.027799239163119216,
    -0.5728486203173755,
    -0.7021283139740602,
    -0.7289990781666442
  ],
  "expected": [
    1.5707963267948966192313216916397514420985846996876,
    1.6093590249375295947017355096028473902681868205642,
    1.7038077359581120795439801440807059407234191894531,
    1.7844070800480780203400854588835500180721282958984,
    1.5870455688164706309351004165364429354667663574219,
    1.8440562536272977478546408747206442058086395263672,
    1.7537980872355556360986383879208005964756011962891,
    1.7596440540891107318088870670180767774581909179688,
    1.8556206229492655523927169269882142543792724609375,
    1.8824973355294434274043169352808035910129547119141,
    1.5816568098068428671609808588982559740543365478516,
    1.7760217315406023885770991910248994827270507812500,
    1.8179891687639506692164559353841468691825866699219,
    1.8265506649610800948835276358295232057571411132813
  ]
}

},{}],71:[function(require,module,exports){
(function (__filename){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var HALF_PI = require( '@stdlib/constants/math/float64-half-pi' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var ellipe = require( './../lib' );


// FIXTURES //

var mediumPositive = require( './fixtures/cpp/medium_positive.json' );
var closeToUnity = require( './fixtures/cpp/close_to_unity.json' );
var negativeSpotChecks = require( './fixtures/wolframalpha/negative_spot_checks.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof ellipe, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function evaluates the complete elliptic integral of the second kind (medium positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumPositive.expected;
	x = mediumPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = ellipe( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 5.0 * EPS * abs( expected[i] );
			t.equal( delta <= tol, true, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the complete elliptic integral of the second kind (values close to positive unity)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = closeToUnity.expected;
	x = closeToUnity.x;
	for ( i = 0; i < x.length; i++ ) {
		y = ellipe( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 4.0 * EPS * abs( expected[i] );
			t.equal( delta <= tol, true, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the complete elliptic integral of the second kind (spot checked negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	// The spot checked values are derived from Wolfram Alpha and cross-checked against Maxima. For example, to compute E(-0.1): https://www.wolframalpha.com/input/?i=EllipticE(-0.1)
	expected = negativeSpotChecks.expected;
	x = negativeSpotChecks.x;
	for ( i = 0; i < x.length; i++ ) {
		y = ellipe( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 2.2 * EPS * abs( expected[i] );
			t.equal( delta <= tol, true, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided values larger than `1.0`', function test( t ) {
	var v = ellipe( 1.01 );
	t.equal( isnan( v ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `1.0` if provided `1.0`', function test( t ) {
	var v = ellipe( 1.0 );
	t.equal( v, 1.0, 'return expected value' );
	t.end();
});

tape( 'the function returns `NaN` if provided `+infinity`', function test( t ) {
	var v = ellipe( PINF );
	t.equal( isnan( v ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `NaN` if provided `-infinity`', function test( t ) {
	var v = ellipe( NINF );
	t.equal( isnan( v ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `π/2` if provided `0`', function test( t ) {
	var v = ellipe( 0 );
	t.equal( v, HALF_PI, 'returns expected value' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/ellipe/test/test.js")
},{"./../lib":54,"./fixtures/cpp/close_to_unity.json":68,"./fixtures/cpp/medium_positive.json":69,"./fixtures/wolframalpha/negative_spot_checks.json":70,"@stdlib/constants/math/float64-eps":42,"@stdlib/constants/math/float64-half-pi":44,"@stdlib/constants/math/float64-ninf":45,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/abs":53,"tape":167}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the complete elliptic integral of the first kind.
*
* @module @stdlib/math/base/special/ellipk
*
* @example
* var ellipk = require( '@stdlib/math/base/special/ellipk' );
*
* var v = ellipk( 0.5 );
* // returns ~1.854
*
* v = ellipk( -1.0 );
* // returns ~1.311
*
* v = ellipk( 2.0 );
* // returns NaN
*
* v = ellipk( Infinity );
* // returns NaN
*
* v = ellipk( -Infinity );
* // returns NaN
*
* v = ellipk( NaN );
* // returns NaN
*/

// MODULES //

var ellipk = require( './main.js' );


// EXPORTS //

module.exports = ellipk;

},{"./main.js":73}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original Julia code and copyright notice are from the [Julia library]{@link https://github.com/JuliaMath/SpecialFunctions.jl/blob/master/src/ellip.jl}. The implementation has been modified for JavaScript.
*
* ```text
* The MIT License (MIT)
*
* Copyright (c) 2017 Jeff Bezanson, Stefan Karpinski, Viral B. Shah, and others:
*
* https://github.com/JuliaMath/SpecialFunctions.jl/graphs/contributors
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
* ```
*/

'use strict';

// MODULES //

var sqrt = require( '@stdlib/math/base/special/sqrt' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var HALF_PI = require( '@stdlib/constants/math/float64-half-pi' );
var poly1 = require( './poly_p1.js' );
var poly2 = require( './poly_p2.js' );
var poly3 = require( './poly_p3.js' );
var poly4 = require( './poly_p4.js' );
var poly5 = require( './poly_p5.js' );
var poly6 = require( './poly_p6.js' );
var poly7 = require( './poly_p7.js' );
var poly8 = require( './poly_p8.js' );
var poly9 = require( './poly_p9.js' );
var poly10 = require( './poly_p10.js' );
var poly11 = require( './poly_p11.js' );
var poly12 = require( './poly_p12.js' );


// VARIABLES //

var ONE_DIV_PI = 0.3183098861837907;


// MAIN //

/**
* Computes the complete elliptic integral of the first kind.
*
* ## Method
*
* -   The function computes the complete elliptic integral of the first kind in terms of parameter \\( m \\), instead of the elliptic modulus \\( k \\).
*
*     ```tex
*     K(m) = \int_0^{\pi/2} \frac{1}{\sqrt{1 - m sin^2\theta}} d\theta
*     ```
*
* -   The function uses a piecewise approximation polynomial as given in Fukushima (2009).
*
* -   For \\( m < 0 \\), the implementation follows Fukushima (2015). Namely, we use Equation 17.4.17 from the _Handbook of Mathematical Functions_ (Abramowitz and Stegun) to compute the function for \\( m < 0 \\) in terms of the piecewise polynomial representation of \\( m > 0 )).
*
*     ```tex
*     F(\phi|-m) = (1+m)^(-1/2) K(m/(1+m)) - (1+m)^(-1/2) F(\pi/2-\phi|m/(1+m))
*     ```
*
*     Since \\( K(m) \\) is equivalent to \\( F(\phi|m) \\), the above reduces to
*
*     ```tex
*     F(\phi|-m) = (1+m)^(-1/2) K(m/(1+m))
*     ```
*
* ## References
*
* -   Fukushima, Toshio. 2009. "Fast computation of complete elliptic integrals and Jacobian elliptic functions." _Celestial Mechanics and Dynamical Astronomy_ 105 (4): 305. doi:[10.1007/s10569-009-9228-z](https://doi.org/10.1007/s10569-009-9228-z).
* -   Fukushima, Toshio. 2015. "Precise and fast computation of complete elliptic integrals by piecewise minimax rational function approximation." _Journal of Computational and Applied Mathematics_ 282 (July): 71–76. doi:[10.1016/j.cam.2014.12.038](https://doi.org/10.1016/j.cam.2014.12.038).
*
* @param {number} m - input value
* @returns {number} evaluated elliptic integral
*
* @example
* var v = ellipk( 0.5 );
* // returns ~1.854
*
* v = ellipk( 2.0 );
* // returns NaN
*
* v = ellipk( -1.0 );
* // returns ~1.311
*
* v = ellipk( Infinity );
* // returns NaN
*
* v = ellipk( -Infinity );
* // returns NaN
*
* v = ellipk( NaN );
* // returns NaN
*/
function ellipk( m ) {
	var FLG;
	var kdm;
	var td;
	var qd;
	var t;
	var x;

	x = m;
	if ( m < 0.0 ) {
		x = m / ( m - 1.0 );
		FLG = true;
	}
	if ( x === 0.0 ) {
		return HALF_PI;
	}
	if ( x === 1.0 ) {
		return PINF;
	}
	if ( x > 1.0 ) {
		return NaN;
	}
	if ( x < 0.1 ) {
		t = poly1( x - 0.05 );
	} else if ( x < 0.2 ) {
		t = poly2( x - 0.15 );
	} else if ( x < 0.3 ) {
		t = poly3( x - 0.25 );
	} else if ( x < 0.4 ) {
		t = poly4( x - 0.35 );
	} else if ( x < 0.5 ) {
		t = poly5( x - 0.45 );
	} else if ( x < 0.6 ) {
		t = poly6( x - 0.55 );
	} else if ( x < 0.7 ) {
		t = poly7( x - 0.65 );
	} else if ( x < 0.8 ) {
		t = poly8( x - 0.75 );
	} else if ( x < 0.85 ) {
		t = poly9( x - 0.825 );
	} else if ( x < 0.9 ) {
		t = poly10( x - 0.875 );
	} else {
		td = 1.0 - x;
		qd = poly11( td );
		kdm = poly12( td - 0.05 );
		t = -ln( qd ) * ( kdm * ONE_DIV_PI );
	}
	if ( FLG ) {
		// Complete the transformation mentioned above for m < 0:
		return t / sqrt( 1.0 - m );
	}
	return t;
}


// EXPORTS //

module.exports = ellipk;

},{"./poly_p1.js":74,"./poly_p10.js":75,"./poly_p11.js":76,"./poly_p12.js":77,"./poly_p2.js":78,"./poly_p3.js":79,"./poly_p4.js":80,"./poly_p5.js":81,"./poly_p6.js":82,"./poly_p7.js":83,"./poly_p8.js":84,"./poly_p9.js":85,"@stdlib/constants/math/float64-half-pi":44,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/special/ln":86,"@stdlib/math/base/special/sqrt":90}],74:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"dup":58}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 2.473596173751344;
	}
	return 2.473596173751344 + (x * (3.727624244118099 + (x * (15.607393035549306 + (x * (84.12850842805888 + (x * (506.98181970406137 + (x * (3252.2770581451236 + (x * (21713.242419574344 + (x * (149037.04518909327 + (x * (1043999.3310899908 + (x * (7427974.817042039 + (x * (53503839.67558661 + (x * (389249886.99487084 + (x * (2855288351.1008105 + (x * (21090077038.76684 + (x * (156699833947.7902 + (x * (1170222242422.44 + (x * (8777948323668.9375 + (x * (66101242752484.95 + (x * (499488053713388.8 + (x * 37859743397240296.0))))))))))))))))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.0;
	}
	return 0.0 + (x * (0.0625 + (x * (0.03125 + (x * (0.0205078125 + (x * (0.01513671875 + (x * (0.011934280395507812 + (x * (0.009816169738769531 + (x * (0.008315593004226685 + (x * (0.007199153304100037 + (x * (0.00633745662344154 + (x * (0.00565311038371874 + (x * (0.005097046040418718 + (x * (0.004636680381850056 + (x * (0.004249547423822886 + (x * 0.003919665602267974))))))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],77:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"dup":58}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.63525673226458;
	}
	return 1.63525673226458 + (x * (0.4711906261487323 + (x * (0.3097284108314996 + (x * (0.2522083117731357 + (x * (0.22672562321968465 + (x * (0.21577444672958598 + (x * (0.21310877187734892 + (x * (0.21602912460518828 + (x * (0.2232558316330579 + (x * (0.23418050129420992 + (x * (0.24855768297226408 + (x * 0.26636380989261754))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.685750354812596;
	}
	return 1.685750354812596 + (x * (0.5417318486132803 + (x * (0.40152443839069024 + (x * (0.3696424734208891 + (x * (0.37606071535458363 + (x * (0.4052358870851259 + (x * (0.45329438175399905 + (x * (0.5205189476511842 + (x * (0.609426039204995 + (x * (0.7242635222829089 + (x * (0.8710138477098124 + (x * 1.057652872753547))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.7443505972256133;
	}
	return 1.7443505972256133 + (x * (0.6348642753719353 + (x * (0.5398425641644455 + (x * (0.5718927051937874 + (x * (0.6702951362654062 + (x * (0.8325865900109772 + (x * (1.0738574482479333 + (x * (1.4220914606754977 + (x * (1.9203871834023047 + (x * (2.6325525483316543 + (x * (3.6521097473190394 + (x * (5.115867135558866 + (x * 7.224080007363877))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.8138839368169826;
	}
	return 1.8138839368169826 + (x * (0.7631632457005573 + (x * (0.7619286053215958 + (x * (0.9510746536684279 + (x * (1.315180671703161 + (x * (1.9285606934774109 + (x * (2.9375093425313787 + (x * (4.594894405442878 + (x * (7.33007122188172 + (x * (11.871512597425301 + (x * (19.45851374822938 + (x * (32.20638657246427 + (x * (53.73749198700555 + (x * 90.27388602941))))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.8989249102715535;
	}
	return 1.8989249102715535 + (x * (0.9505217946182445 + (x * (1.1510775899590158 + (x * (1.7502391069863006 + (x * (2.952676812636875 + (x * (5.285800396121451 + (x * (9.83248571665998 + (x * (18.787148683275596 + (x * (36.61468615273698 + (x * (72.45292395127771 + (x * (145.1079577347069 + (x * (293.4786396308497 + (x * (598.385181505501 + (x * (1228.4200130758634 + (x * 2536.5297553827645))))))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 2.0075983984243764;
	}
	return 2.0075983984243764 + (x * (1.2484572312123474 + (x * (1.9262346570764797 + (x * (3.7512896400875877 + (x * (8.119944554932045 + (x * (18.665721308735552 + (x * (44.603924842914374 + (x * (109.50920543094983 + (x * (274.2779548232414 + (x * (697.5598008606327 + (x * (1795.7160145002472 + (x * (4668.38171679039 + (x * (12235.762468136643 + (x * (32290.17809718321 + (x * (85713.07608195965 + (x * (228672.1890493117 + (x * 612757.2711915852))))))))))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 2.1565156474996434;
	}
	return 2.1565156474996434 + (x * (1.7918056418494632 + (x * (3.8267512874657132 + (x * (10.386724683637972 + (x * (31.403314054680703 + (x * (100.92370394986955 + (x * (337.3268282632273 + (x * (1158.7079305678278 + (x * (4060.9907421936323 + (x * (14454.001840343448 + (x * (52076.661075994045 + (x * (189493.65914621568 + (x * (695184.5762413896 + (x * (2567994.048255285 + (x * (9541921.966748387 + (x * (35634927.44218076 + (x * (133669298.46120408 + (x * (503352186.68662846 + (x * (1901975729.53866 + (x * 7208915015.330104))))))))))))))))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 2.3181226217125106;
	}
	return 2.3181226217125106 + (x * (2.6169201502912327 + (x * (7.897935075731356 + (x * (30.502397154466724 + (x * (131.48693655235286 + (x * (602.9847637356492 + (x * (2877.024617809973 + (x * (14110.519919151804 + (x * (70621.4408815654 + (x * (358977.266582531 + (x * (1847238.2637239718 + (x * (9600515.416049214 + (x * (50307677.08502367 + (x * (265444188.6527128 + (x * (1408862325.0287027 + (x * 7515687935.373775))))))))))))))))))))))))))))); // eslint-disable-line max-len
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

},{"./ln.js":87}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
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

},{"./polyval_p.js":88,"./polyval_q.js":89,"@stdlib/constants/math/float64-exponent-bias":43,"@stdlib/constants/math/float64-ninf":45,"@stdlib/math/base/assert/is-nan":50,"@stdlib/number/float64/base/get-high-word":95,"@stdlib/number/float64/base/set-high-word":98}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
* Compute the principal square root.
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
* Computes the principal square root.
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

},{"./number.js":93}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
arguments[4][94][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":34,"dup":94}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var PINF = require( '@stdlib/constants/math/float64-pinf' ); //  => 0 11111111111 00000000000000000000 00000000000000000000000000000000
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
* var PINF = require( '@stdlib/constants/math/float64-pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
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

},{"./native_class.js":101,"./polyfill.js":102,"@stdlib/assert/has-tostringtag-support":20}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":103}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":103,"./tostringtag.js":104,"@stdlib/assert/has-own-property":16}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],105:[function(require,module,exports){
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
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
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

},{}],106:[function(require,module,exports){

},{}],107:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106}],108:[function(require,module,exports){
(function (Buffer){
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
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol.for === 'function')
    ? Symbol.for('nodejs.util.inspect.custom')
    : null

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
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
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
  Object.setPrototypeOf(buf, Buffer.prototype)
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
    throw new TypeError(
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
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

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
  Object.setPrototypeOf(buf, Buffer.prototype)

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
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
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
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
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
    out += hexSliceLookupTable[buf[i]]
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
  Object.setPrototypeOf(newBuf, Buffer.prototype)

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
  } else if (typeof val === 'boolean') {
    val = Number(val)
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

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

}).call(this,require("buffer").Buffer)
},{"base64-js":105,"buffer":108,"ieee754":134}],109:[function(require,module,exports){
(function (Buffer){
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

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../insert-module-globals/node_modules/is-buffer/index.js")})
},{"../../insert-module-globals/node_modules/is-buffer/index.js":136}],110:[function(require,module,exports){
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

},{"./lib/is_arguments.js":111,"./lib/keys.js":112}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],113:[function(require,module,exports){
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

},{"object-keys":141}],114:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],115:[function(require,module,exports){
'use strict';

/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined; // eslint-disable-line no-shadow-restricted-names

var $TypeError = TypeError;

var ThrowTypeError = Object.getOwnPropertyDescriptor
	? (function () { return Object.getOwnPropertyDescriptor(arguments, 'callee').get; }())
	: function () { throw new $TypeError(); };

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'$ %Array%': Array,
	'$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'$ %ArrayPrototype%': Array.prototype,
	'$ %ArrayProto_entries%': Array.prototype.entries,
	'$ %ArrayProto_forEach%': Array.prototype.forEach,
	'$ %ArrayProto_keys%': Array.prototype.keys,
	'$ %ArrayProto_values%': Array.prototype.values,
	'$ %AsyncFromSyncIteratorPrototype%': undefined,
	'$ %AsyncFunction%': asyncFunction,
	'$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'$ %AsyncGeneratorFunction%': asyncGenFunction,
	'$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'$ %Boolean%': Boolean,
	'$ %BooleanPrototype%': Boolean.prototype,
	'$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'$ %Date%': Date,
	'$ %DatePrototype%': Date.prototype,
	'$ %decodeURI%': decodeURI,
	'$ %decodeURIComponent%': decodeURIComponent,
	'$ %encodeURI%': encodeURI,
	'$ %encodeURIComponent%': encodeURIComponent,
	'$ %Error%': Error,
	'$ %ErrorPrototype%': Error.prototype,
	'$ %eval%': eval, // eslint-disable-line no-eval
	'$ %EvalError%': EvalError,
	'$ %EvalErrorPrototype%': EvalError.prototype,
	'$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'$ %Function%': Function,
	'$ %FunctionPrototype%': Function.prototype,
	'$ %Generator%': generator ? getProto(generator()) : undefined,
	'$ %GeneratorFunction%': generatorFunction,
	'$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'$ %isFinite%': isFinite,
	'$ %isNaN%': isNaN,
	'$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'$ %JSON%': JSON,
	'$ %JSONParse%': JSON.parse,
	'$ %Map%': typeof Map === 'undefined' ? undefined : Map,
	'$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'$ %Math%': Math,
	'$ %Number%': Number,
	'$ %NumberPrototype%': Number.prototype,
	'$ %Object%': Object,
	'$ %ObjectPrototype%': Object.prototype,
	'$ %ObjProto_toString%': Object.prototype.toString,
	'$ %ObjProto_valueOf%': Object.prototype.valueOf,
	'$ %parseFloat%': parseFloat,
	'$ %parseInt%': parseInt,
	'$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'$ %RangeError%': RangeError,
	'$ %RangeErrorPrototype%': RangeError.prototype,
	'$ %ReferenceError%': ReferenceError,
	'$ %ReferenceErrorPrototype%': ReferenceError.prototype,
	'$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'$ %RegExp%': RegExp,
	'$ %RegExpPrototype%': RegExp.prototype,
	'$ %Set%': typeof Set === 'undefined' ? undefined : Set,
	'$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'$ %String%': String,
	'$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'$ %StringPrototype%': String.prototype,
	'$ %Symbol%': hasSymbols ? Symbol : undefined,
	'$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'$ %SyntaxError%': SyntaxError,
	'$ %SyntaxErrorPrototype%': SyntaxError.prototype,
	'$ %ThrowTypeError%': ThrowTypeError,
	'$ %TypedArray%': TypedArray,
	'$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'$ %TypeError%': $TypeError,
	'$ %TypeErrorPrototype%': $TypeError.prototype,
	'$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'$ %URIError%': URIError,
	'$ %URIErrorPrototype%': URIError.prototype,
	'$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

var bind = require('function-bind');
var $replace = bind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var key = '$ ' + name;
	if (!(key in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {
		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}

	return INTRINSICS[key];
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);

	if (parts.length === 0) {
		return getBaseIntrinsic(name, allowMissing);
	}

	var value = getBaseIntrinsic('%' + parts[0] + '%', allowMissing);
	for (var i = 1; i < parts.length; i += 1) {
		if (value != null) {
			value = value[parts[i]];
		}
	}
	return value;
};

},{"function-bind":130,"has-symbols":131}],116:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('./GetIntrinsic');

var $Object = GetIntrinsic('%Object%');
var $EvalError = GetIntrinsic('%EvalError%');
var $TypeError = GetIntrinsic('%TypeError%');
var $String = GetIntrinsic('%String%');
var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');
var $floor = GetIntrinsic('%Math.floor%');
var $DateUTC = GetIntrinsic('%Date.UTC%');
var $abs = GetIntrinsic('%Math.abs%');

var assertRecord = require('./helpers/assertRecord');
var isPropertyDescriptor = require('./helpers/isPropertyDescriptor');
var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');
var sign = require('./helpers/sign');
var mod = require('./helpers/mod');
var isPrefixOf = require('./helpers/isPrefixOf');
var callBound = require('./helpers/callBound');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;
var msPerSecond = 1e3;
var msPerMinute = msPerSecond * SecondsPerMinute;
var msPerHour = msPerMinute * MinutesPerHour;
var msPerDay = 86400000;

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return +value; // eslint-disable-line no-implicit-coercion
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return $String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return $Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new $TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
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
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		return isPropertyDescriptor(this, Desc);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new $TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new $TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-11.9.3
	'Abstract Equality Comparison': function AbstractEqualityComparison(x, y) {
		var xType = this.Type(x);
		var yType = this.Type(y);
		if (xType === yType) {
			return x === y; // ES6+ specified this shortcut anyways.
		}
		if (x == null && y == null) {
			return true;
		}
		if (xType === 'Number' && yType === 'String') {
			return this['Abstract Equality Comparison'](x, this.ToNumber(y));
		}
		if (xType === 'String' && yType === 'Number') {
			return this['Abstract Equality Comparison'](this.ToNumber(x), y);
		}
		if (xType === 'Boolean') {
			return this['Abstract Equality Comparison'](this.ToNumber(x), y);
		}
		if (yType === 'Boolean') {
			return this['Abstract Equality Comparison'](x, this.ToNumber(y));
		}
		if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
			return this['Abstract Equality Comparison'](x, this.ToPrimitive(y));
		}
		if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
			return this['Abstract Equality Comparison'](this.ToPrimitive(x), y);
		}
		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-11.9.6
	'Strict Equality Comparison': function StrictEqualityComparison(x, y) {
		var xType = this.Type(x);
		var yType = this.Type(y);
		if (xType !== yType) {
			return false;
		}
		if (xType === 'Undefined' || xType === 'Null') {
			return true;
		}
		return x === y; // shortcut for steps 4-7
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-11.8.5
	// eslint-disable-next-line max-statements
	'Abstract Relational Comparison': function AbstractRelationalComparison(x, y, LeftFirst) {
		if (this.Type(LeftFirst) !== 'Boolean') {
			throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
		}
		var px;
		var py;
		if (LeftFirst) {
			px = this.ToPrimitive(x, $Number);
			py = this.ToPrimitive(y, $Number);
		} else {
			py = this.ToPrimitive(y, $Number);
			px = this.ToPrimitive(x, $Number);
		}
		var bothStrings = this.Type(px) === 'String' && this.Type(py) === 'String';
		if (!bothStrings) {
			var nx = this.ToNumber(px);
			var ny = this.ToNumber(py);
			if ($isNaN(nx) || $isNaN(ny)) {
				return undefined;
			}
			if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
				return false;
			}
			if (nx === 0 && ny === 0) {
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
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	msFromTime: function msFromTime(t) {
		return mod(t, msPerSecond);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	SecFromTime: function SecFromTime(t) {
		return mod($floor(t / msPerSecond), SecondsPerMinute);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	MinFromTime: function MinFromTime(t) {
		return mod($floor(t / msPerMinute), MinutesPerHour);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	HourFromTime: function HourFromTime(t) {
		return mod($floor(t / msPerHour), HoursPerDay);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.2
	Day: function Day(t) {
		return $floor(t / msPerDay);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.2
	TimeWithinDay: function TimeWithinDay(t) {
		return mod(t, msPerDay);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	DayFromYear: function DayFromYear(y) {
		return (365 * (y - 1970)) + $floor((y - 1969) / 4) - $floor((y - 1901) / 100) + $floor((y - 1601) / 400);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	TimeFromYear: function TimeFromYear(y) {
		return msPerDay * this.DayFromYear(y);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	YearFromTime: function YearFromTime(t) {
		// largest y such that this.TimeFromYear(y) <= t
		return $getUTCFullYear(new $Date(t));
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.6
	WeekDay: function WeekDay(t) {
		return mod(this.Day(t) + 4, 7);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	DaysInYear: function DaysInYear(y) {
		if (mod(y, 4) !== 0) {
			return 365;
		}
		if (mod(y, 100) !== 0) {
			return 366;
		}
		if (mod(y, 400) !== 0) {
			return 365;
		}
		return 366;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	InLeapYear: function InLeapYear(t) {
		var days = this.DaysInYear(this.YearFromTime(t));
		if (days === 365) {
			return 0;
		}
		if (days === 366) {
			return 1;
		}
		throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.4
	DayWithinYear: function DayWithinYear(t) {
		return this.Day(t) - this.DayFromYear(this.YearFromTime(t));
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.4
	MonthFromTime: function MonthFromTime(t) {
		var day = this.DayWithinYear(t);
		if (0 <= day && day < 31) {
			return 0;
		}
		var leap = this.InLeapYear(t);
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
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.5
	DateFromTime: function DateFromTime(t) {
		var m = this.MonthFromTime(t);
		var d = this.DayWithinYear(t);
		if (m === 0) {
			return d + 1;
		}
		if (m === 1) {
			return d - 30;
		}
		var leap = this.InLeapYear(t);
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
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.12
	MakeDay: function MakeDay(year, month, date) {
		if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
			return NaN;
		}
		var y = this.ToInteger(year);
		var m = this.ToInteger(month);
		var dt = this.ToInteger(date);
		var ym = y + $floor(m / 12);
		var mn = mod(m, 12);
		var t = $DateUTC(ym, mn, 1);
		if (this.YearFromTime(t) !== ym || this.MonthFromTime(t) !== mn || this.DateFromTime(t) !== 1) {
			return NaN;
		}
		return this.Day(t) + dt - 1;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.13
	MakeDate: function MakeDate(day, time) {
		if (!$isFinite(day) || !$isFinite(time)) {
			return NaN;
		}
		return (day * msPerDay) + time;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.11
	MakeTime: function MakeTime(hour, min, sec, ms) {
		if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
			return NaN;
		}
		var h = this.ToInteger(hour);
		var m = this.ToInteger(min);
		var s = this.ToInteger(sec);
		var milli = this.ToInteger(ms);
		var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
		return t;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.14
	TimeClip: function TimeClip(time) {
		if (!$isFinite(time) || $abs(time) > 8.64e15) {
			return NaN;
		}
		return $Number(new $Date(this.ToNumber(time)));
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-5.2
	modulo: function modulo(x, y) {
		return mod(x, y);
	}
};

module.exports = ES5;

},{"./GetIntrinsic":115,"./helpers/assertRecord":117,"./helpers/callBound":119,"./helpers/isFinite":120,"./helpers/isNaN":121,"./helpers/isPrefixOf":122,"./helpers/isPropertyDescriptor":123,"./helpers/mod":124,"./helpers/sign":125,"es-to-primitive/es5":126,"has":133,"is-callable":137}],117:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var predicates = {
	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(ES, Desc) {
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

module.exports = function assertRecord(ES, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (!predicate(ES, value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"../GetIntrinsic":115,"has":133}],118:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

var GetIntrinsic = require('../GetIntrinsic');

var $Function = GetIntrinsic('%Function%');
var $apply = $Function.apply;
var $call = $Function.call;

module.exports = function callBind() {
	return bind.apply($call, arguments);
};

module.exports.apply = function applyBind() {
	return bind.apply($apply, arguments);
};

},{"../GetIntrinsic":115,"function-bind":130}],119:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var callBind = require('./callBind');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"../GetIntrinsic":115,"./callBind":118}],120:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],121:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],122:[function(require,module,exports){
'use strict';

var $strSlice = require('../helpers/callBound')('String.prototype.slice');

module.exports = function isPrefixOf(prefix, string) {
	if (prefix === string) {
		return true;
	}
	if (prefix.length > string.length) {
		return false;
	}
	return $strSlice(string, 0, prefix.length) === prefix;
};

},{"../helpers/callBound":119}],123:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

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

    for (var key in Desc) { // eslint-disable-line
		if (has(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"../GetIntrinsic":115,"has":133}],124:[function(require,module,exports){
'use strict';

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],125:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],126:[function(require,module,exports){
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

},{"./helpers/isPrimitive":127,"is-callable":137}],127:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],128:[function(require,module,exports){
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

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
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
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
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
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
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

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":129}],131:[function(require,module,exports){
(function (global){
'use strict';

var origSymbol = global.Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./shams":132}],132:[function(require,module,exports){
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
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
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

},{}],133:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":130}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],137:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

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
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],138:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{"./isArguments":142}],141:[function(require,module,exports){
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

},{"./implementation":140,"./isArguments":142}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

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

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
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
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

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

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
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
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":145}],144:[function(require,module,exports){
(function (process){
'use strict';

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


}).call(this,require('_process'))
},{"_process":145}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":147}],147:[function(require,module,exports){
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

var pna = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
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

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};
},{"./_stream_readable":149,"./_stream_writable":151,"core-util-is":109,"inherits":135,"process-nextick-args":144}],148:[function(require,module,exports){
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

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":150,"core-util-is":109,"inherits":135}],149:[function(require,module,exports){
(function (process,global){
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

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
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

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
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
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
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
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
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
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
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
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
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
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
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
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

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
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
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
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
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
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
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
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
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

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
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
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
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
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":147,"./internal/streams/BufferList":152,"./internal/streams/destroy":153,"./internal/streams/stream":154,"_process":145,"core-util-is":109,"events":128,"inherits":135,"isarray":138,"process-nextick-args":144,"safe-buffer":160,"string_decoder/":166,"util":106}],150:[function(require,module,exports){
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

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
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
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
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
};

// This is the part where you do stuff!
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
  throw new Error('_transform() is not implemented');
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
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":147,"core-util-is":109,"inherits":135}],151:[function(require,module,exports){
(function (process,global,setImmediate){
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

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
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
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
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
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
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

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

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
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
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

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
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
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
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

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
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
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
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

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
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
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
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
  cb(new Error('_write() is not implemented'));
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

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
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
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
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
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"./_stream_duplex":147,"./internal/streams/destroy":153,"./internal/streams/stream":154,"_process":145,"core-util-is":109,"inherits":135,"process-nextick-args":144,"safe-buffer":160,"timers":173,"util-deprecate":174}],152:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
var util = require('util');

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}
},{"safe-buffer":160,"util":106}],153:[function(require,module,exports){
'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
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
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":144}],154:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":128}],155:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":156}],156:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":147,"./lib/_stream_passthrough.js":148,"./lib/_stream_readable.js":149,"./lib/_stream_transform.js":150,"./lib/_stream_writable.js":151}],157:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":156}],158:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":151}],159:[function(require,module,exports){
(function (process,setImmediate){
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

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":145,"through":172,"timers":173}],160:[function(require,module,exports){
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

},{"buffer":108}],161:[function(require,module,exports){
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
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

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

},{"events":128,"inherits":135,"readable-stream/duplex.js":146,"readable-stream/passthrough.js":155,"readable-stream/readable.js":156,"readable-stream/transform.js":157,"readable-stream/writable.js":158}],162:[function(require,module,exports){
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

},{"es-abstract/es5":116,"function-bind":130}],163:[function(require,module,exports){
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

},{"./implementation":162,"./polyfill":164,"./shim":165,"define-properties":113,"function-bind":130}],164:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":162}],165:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":164,"define-properties":113}],166:[function(require,module,exports){
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
},{"safe-buffer":160}],167:[function(require,module,exports){
(function (process,setImmediate){
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

}).call(this,require('_process'),require("timers").setImmediate)
},{"./lib/default_stream":168,"./lib/results":170,"./lib/test":171,"_process":145,"defined":114,"through":172,"timers":173}],168:[function(require,module,exports){
(function (process){
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

}).call(this,require('_process'))
},{"_process":145,"fs":107,"through":172}],169:[function(require,module,exports){
(function (process,setImmediate){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":145,"timers":173}],170:[function(require,module,exports){
(function (process,setImmediate){
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

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":145,"events":128,"function-bind":130,"has":133,"inherits":135,"object-inspect":139,"resumer":159,"through":172,"timers":173}],171:[function(require,module,exports){
(function (__dirname){
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


}).call(this,"/node_modules/tape/lib")
},{"./next_tick":169,"deep-equal":110,"defined":114,"events":128,"has":133,"inherits":135,"path":143,"string.prototype.trim":163}],172:[function(require,module,exports){
(function (process){
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


}).call(this,require('_process'))
},{"_process":145,"stream":161}],173:[function(require,module,exports){
(function (setImmediate,clearImmediate){
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
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":145,"timers":173}],174:[function(require,module,exports){
(function (global){

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[71]);
