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

var ctor = ( typeof Float32Array === 'function' ) ? Float32Array : void 0; // eslint-disable-line stdlib/require-globals


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
* Typed array constructor which returns a typed array representing an array of single-precision floating-point numbers in the platform byte order.
*
* @module @stdlib/array/float32
*
* @example
* var ctor = require( '@stdlib/array/float32' );
*
* var arr = new ctor( 10 );
* // returns <Float32Array>
*/

// MODULES //

var hasFloat32ArraySupport = require( '@stdlib/assert/has-float32array-support' );
var builtin = require( './float32array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasFloat32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./float32array.js":1,"./polyfill.js":3,"@stdlib/assert/has-float32array-support":17}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Typed array which represents an array of single-precision floating-point numbers in the platform byte order.
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

// MAIN //

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./float64array.js":4,"./polyfill.js":6,"@stdlib/assert/has-float64array-support":20}],6:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./polyfill.js":8,"./uint16array.js":9,"@stdlib/assert/has-uint16array-support":28}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : void 0; // eslint-disable-line stdlib/require-globals


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

},{"./polyfill.js":11,"./uint32array.js":12,"@stdlib/assert/has-uint32array-support":31}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : void 0; // eslint-disable-line stdlib/require-globals


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

},{"./polyfill.js":14,"./uint8array.js":15,"@stdlib/assert/has-uint8array-support":34}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Float32Array === 'function' ) ? Float32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Float32Array` support.
*
* @module @stdlib/assert/has-float32array-support
*
* @example
* var hasFloat32ArraySupport = require( '@stdlib/assert/has-float32array-support' );
*
* var bool = hasFloat32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat32ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasFloat32ArraySupport;

},{"./main.js":18}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isFloat32Array = require( '@stdlib/assert/is-float32array' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var GlobalFloat32Array = require( './float32array.js' );


// MAIN //

/**
* Tests for native `Float32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Float32Array` support
*
* @example
* var bool = hasFloat32ArraySupport();
* // returns <boolean>
*/
function hasFloat32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalFloat32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalFloat32Array( [ 1.0, 3.14, -3.14, 5.0e40 ] );
		bool = (
			isFloat32Array( arr ) &&
			arr[ 0 ] === 1.0 &&
			arr[ 1 ] === 3.140000104904175 &&
			arr[ 2 ] === -3.140000104904175 &&
			arr[ 3 ] === PINF
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat32ArraySupport;

},{"./float32array.js":16,"@stdlib/assert/is-float32array":49,"@stdlib/constants/float64/pinf":72}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./float64array.js":19,"@stdlib/assert/is-float64array":51}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":25}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":27}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/has-symbol-support":24}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint16array.js":30,"@stdlib/assert/is-uint16array":60,"@stdlib/constants/uint16/max":74}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":33,"@stdlib/assert/is-uint32array":62,"@stdlib/constants/uint32/max":75}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint8array.js":36,"@stdlib/assert/is-uint8array":64,"@stdlib/constants/uint8/max":76}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an array.
*
* @module @stdlib/assert/is-array
*
* @example
* var isArray = require( '@stdlib/assert/is-array' );
*
* var bool = isArray( [] );
* // returns true
*
* bool = isArray( {} );
* // returns false
*/

// MODULES //

var isArray = require( './main.js' );


// EXPORTS //

module.exports = isArray;

},{"./main.js":38}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var f;


// FUNCTIONS //

/**
* Tests if a value is an array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an array
*
* @example
* var bool = isArray( [] );
* // returns true
*
* @example
* var bool = isArray( {} );
* // returns false
*/
function isArray( value ) {
	return ( nativeClass( value ) === '[object Array]' );
}


// MAIN //

if ( Array.isArray ) {
	f = Array.isArray;
} else {
	f = isArray;
}


// EXPORTS //

module.exports = f;

},{"@stdlib/utils/native-class":152}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a boolean.
*
* @module @stdlib/assert/is-boolean
*
* @example
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* // Use interface to check for boolean primitives...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* // Use interface to check for boolean objects...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isObject;
*
* var bool = isBoolean( true );
* // returns false
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isBoolean = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isBoolean, 'isPrimitive', isPrimitive );
setReadOnly( isBoolean, 'isObject', isObject );


// EXPORTS //

module.exports = isBoolean;

},{"./main.js":40,"./object.js":41,"./primitive.js":42,"@stdlib/utils/define-nonenumerable-read-only-property":133}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a boolean.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a boolean
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns true
*/
function isBoolean( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":41,"./primitive.js":42}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a boolean object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean object
*
* @example
* var bool = isBoolean( true );
* // returns false
*
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*/
function isBoolean( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof Boolean ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Boolean]' );
	}
	return false;
}


// EXPORTS //

module.exports = isBoolean;

},{"./try2serialize.js":44,"@stdlib/assert/has-tostringtag-support":26,"@stdlib/utils/native-class":152}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is a boolean primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean primitive
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns false
*/
function isBoolean( value ) {
	return ( typeof value === 'boolean' );
}


// EXPORTS //

module.exports = isBoolean;

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

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

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

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line stdlib/no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value can be serialized
*/
function test( value ) {
	try {
		toString.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./tostring.js":43}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Buffer instance.
*
* @module @stdlib/assert/is-buffer
*
* @example
* var isBuffer = require( '@stdlib/assert/is-buffer' );
*
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* v = isBuffer( {} );
* // returns false
*/

// MODULES //

var isBuffer = require( './main.js' );


// EXPORTS //

module.exports = isBuffer;

},{"./main.js":46}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isObjectLike = require( '@stdlib/assert/is-object-like' );


// MAIN //

/**
* Tests if a value is a Buffer instance.
*
* @param {*} value - value to validate
* @returns {boolean} boolean indicating if a value is a Buffer instance
*
* @example
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* @example
* var v = isBuffer( new Buffer( [1,2,3,4] ) );
* // returns true
*
* @example
* var v = isBuffer( {} );
* // returns false
*
* @example
* var v = isBuffer( [] );
* // returns false
*/
function isBuffer( value ) {
	return (
		isObjectLike( value ) &&
		(
			// eslint-disable-next-line no-underscore-dangle
			value._isBuffer || // for envs missing Object.prototype.constructor (e.g., Safari 5-7)
			(
				value.constructor &&

				// WARNING: `typeof` is not a foolproof check, as certain envs consider RegExp and NodeList instances to be functions
				typeof value.constructor.isBuffer === 'function' &&
				value.constructor.isBuffer( value )
			)
		)
	);
}


// EXPORTS //

module.exports = isBuffer;

},{"@stdlib/assert/is-object-like":58}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an `Error` object.
*
* @module @stdlib/assert/is-error
*
* @example
* var isError = require( '@stdlib/assert/is-error' );
*
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* bool = isError( {} );
* // returns false
*/

// MODULES //

var isError = require( './main.js' );


// EXPORTS //

module.exports = isError;

},{"./main.js":48}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an `Error` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `Error` object
*
* @example
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* @example
* var bool = isError( {} );
* // returns false
*/
function isError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `Error` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof Error ) {
		return true;
	}
	// Walk the prototype tree until we find an object having the desired native class...
	while ( value ) {
		if ( nativeClass( value ) === '[object Error]' ) {
			return true;
		}
		value = getPrototypeOf( value );
	}
	return false;
}


// EXPORTS //

module.exports = isError;

},{"@stdlib/utils/get-prototype-of":142,"@stdlib/utils/native-class":152}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Float32Array.
*
* @module @stdlib/assert/is-float32array
*
* @example
* var isFloat32Array = require( '@stdlib/assert/is-float32array' );
*
* var bool = isFloat32Array( new Float32Array( 10 ) );
* // returns true
*
* bool = isFloat32Array( [] );
* // returns false
*/

// MODULES //

var isFloat32Array = require( './main.js' );


// EXPORTS //

module.exports = isFloat32Array;

},{"./main.js":50}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var hasFloat32Array = ( typeof Float32Array === 'function' );// eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Float32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Float32Array
*
* @example
* var bool = isFloat32Array( new Float32Array( 10 ) );
* // returns true
*
* @example
* var bool = isFloat32Array( [] );
* // returns false
*/
function isFloat32Array( value ) {
	return (
		( hasFloat32Array && value instanceof Float32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Float32Array]'
	);
}


// EXPORTS //

module.exports = isFloat32Array;

},{"@stdlib/utils/native-class":152}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":52}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":152}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a function.
*
* @module @stdlib/assert/is-function
*
* @example
* var isFunction = require( '@stdlib/assert/is-function' );
*
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/

// MODULES //

var isFunction = require( './main.js' );


// EXPORTS //

module.exports = isFunction;

},{"./main.js":54}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var typeOf = require( '@stdlib/utils/type-of' );


// MAIN //

/**
* Tests if a value is a function.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a function
*
* @example
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/
function isFunction( value ) {
	// Note: cannot use `typeof` directly, as various browser engines incorrectly return `'function'` when operating on non-function objects, such as regular expressions and NodeLists.
	return ( typeOf( value ) === 'function' );
}


// EXPORTS //

module.exports = isFunction;

},{"@stdlib/utils/type-of":163}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/array/uint16":7,"@stdlib/array/uint8":13}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ctors.js":55}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is object-like.
*
* @module @stdlib/assert/is-object-like
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' );
*
* var bool = isObjectLike( {} );
* // returns true
*
* bool = isObjectLike( [] );
* // returns true
*
* bool = isObjectLike( null );
* // returns false
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' ).isObjectLikeArray;
*
* var bool = isObjectLike( [ {}, [] ] );
* // returns true
*
* bool = isObjectLike( [ {}, '3.0' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isObjectLike = require( './main.js' );


// MAIN //

setReadOnly( isObjectLike, 'isObjectLikeArray', arrayfun( isObjectLike ) );


// EXPORTS //

module.exports = isObjectLike;

},{"./main.js":59,"@stdlib/assert/tools/array-function":67,"@stdlib/utils/define-nonenumerable-read-only-property":133}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is object-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is object-like
*
* @example
* var bool = isObjectLike( {} );
* // returns true
*
* @example
* var bool = isObjectLike( [] );
* // returns true
*
* @example
* var bool = isObjectLike( null );
* // returns false
*/
function isObjectLike( value ) {
	return (
		value !== null &&
		typeof value === 'object'
	);
}


// EXPORTS //

module.exports = isObjectLike;

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

},{"@stdlib/utils/native-class":152}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":152}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":65}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":152}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Returns a function which tests if every element in an array passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arrayfcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( 'invalid argument. Must provide a function. Value: `' + predicate + '`.' );
	}
	return every;

	/**
	* Tests if every element in an array passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArray( value ) ) {
			return false;
		}
		len = value.length;
		if ( len === 0 ) {
			return false;
		}
		for ( i = 0; i < len; i++ ) {
			if ( predicate( value[ i ] ) === false ) {
				return false;
			}
		}
		return true;
	}
}


// EXPORTS //

module.exports = arrayfcn;

},{"@stdlib/assert/is-array":37}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a function which tests if every element in an array passes a test condition.
*
* @module @stdlib/assert/tools/array-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arrayfcn = require( '@stdlib/assert/tools/array-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var arrayfcn = require( './arrayfcn.js' );


// EXPORTS //

module.exports = arrayfcn;

},{"./arrayfcn.js":66}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Difference between one and the smallest value greater than one that can be represented as a single-precision floating-point number.
*
* @module @stdlib/constants/float32/eps
* @type {number}
*
* @example
* var FLOAT32_EPSILON = require( '@stdlib/constants/float32/eps' );
* // returns 1.1920928955078125e-7
*/

// MODULES //

var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );


// MAIN //

/**
* Difference between one and the smallest value greater than one that can be represented as a single-precision floating-point number.
*
* ## Notes
*
* The difference is equal to
*
* ```tex
* \frac{1}{2^{23}}
* ```
*
* @constant
* @type {number}
* @default 1.1920928955078125e-7
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT32_EPSILON = float64ToFloat32( 1.1920928955078125e-7 );


// EXPORTS //

module.exports = FLOAT32_EPSILON;

},{"@stdlib/number/float64/base/to-float32":121}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Single-precision floating-point negative infinity.
*
* @module @stdlib/constants/float32/ninf
* @type {number}
*
* @example
* var FLOAT32_NINF = require( '@stdlib/constants/float32/ninf' );
* // returns -infinity
*/

// MODULES //

var Float32Array = require( '@stdlib/array/float32' );
var Uint32Array = require( '@stdlib/array/uint32' );


// VARIABLES //

var FLOAT32_VIEW = new Float32Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT32_VIEW.buffer );
var v;


// MAIN //

/**
* Single-precision floating-point negative infinity.
*
* ## Notes
*
* Single-precision floating-point negative infinity has the bit sequence
*
* ```binarystring
* 1 11111111 00000000000000000000000
* ```
*
* This bit sequence corresponds to the unsigned 32-bit integer `4286578688` and to the HEX value `0xff800000`.
*
* @constant
* @type {number}
* @default 0xff800000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_NINF = 0xff800000;

// Set the ArrayBuffer bit sequence:
UINT32_VIEW[ 0 ] = FLOAT32_NINF;

v = FLOAT32_VIEW[ 0 ];


// EXPORTS //

module.exports = v;

},{"@stdlib/array/float32":2,"@stdlib/array/uint32":10}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Single-precision floating-point positive infinity.
*
* @module @stdlib/constants/float32/pinf
* @type {number}
*
* @example
* var FLOAT32_PINF = require( '@stdlib/constants/float32/pinf' );
* // returns +infinity
*/

// MODULES //

var Float32Array = require( '@stdlib/array/float32' );
var Uint32Array = require( '@stdlib/array/uint32' );


// VARIABLES //

var FLOAT32_VIEW = new Float32Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT32_VIEW.buffer );
var v;


// MAIN //

/**
* Single-precision floating-point positive infinity.
*
* ## Notes
*
* Single-precision floating-point positive infinity has the bit sequence
*
* ```binarystring
* 0 11111111 00000000000000000000000
* ```
*
* This bit sequence corresponds to the unsigned 32-bit integer `2139095040` and to the HEX value `0x7f800000`.
*
* @constant
* @type {number}
* @default 0x7f800000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_PINF = 0x7f800000;

// Set the ArrayBuffer bit sequence:
UINT32_VIEW[ 0 ] = FLOAT32_PINF;

v = FLOAT32_VIEW[ 0 ];


// EXPORTS //

module.exports = v;

},{"@stdlib/array/float32":2,"@stdlib/array/uint32":10}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":110}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":71,"@stdlib/constants/float64/pinf":72}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a single-precision floating-point numeric value is `NaN`.
*
* @module @stdlib/math/base/assert/is-nanf
*
* @example
* var isnanf = require( '@stdlib/math/base/assert/is-nanf' );
*
* var bool = isnanf( NaN );
* // returns true
*
* bool = isnanf( 7.0 );
* // returns false
*/

// MODULES //

var isnanf = require( './main.js' );


// EXPORTS //

module.exports = isnanf;

},{"./main.js":82}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Tests if a single-precision floating-point numeric value is `NaN`.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is `NaN`
*
* @example
* var bool = isnanf( NaN );
* // returns true
*
* @example
* var bool = isnanf( 7.0 );
* // returns false
*/
function isnanf( x ) {
	return ( x !== x );
}


// EXPORTS //

module.exports = isnanf;

},{}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a single-precision floating-point numeric value is negative zero.
*
* @module @stdlib/math/base/assert/is-negative-zerof
*
* @example
* var isNegativeZerof = require( '@stdlib/math/base/assert/is-negative-zerof' );
*
* var bool = isNegativeZerof( -0.0 );
* // returns true
*
* bool = isNegativeZerof( 0.0 );
* // returns false
*/

// MODULES //

var isNegativeZerof = require( './main.js' );


// EXPORTS //

module.exports = isNegativeZerof;

},{"./main.js":84}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var NINF = require( '@stdlib/constants/float32/ninf' );


// MAIN //

/**
* Tests if a single-precision floating-point numeric value is negative zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is negative zero
*
* @example
* var bool = isNegativeZerof( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZerof( 0.0 );
* // returns false
*/
function isNegativeZerof( x ) {
	return (x === 0.0 && 1.0/x === NINF);
}


// EXPORTS //

module.exports = isNegativeZerof;

},{"@stdlib/constants/float32/ninf":69}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a single-precision floating-point numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zerof
*
* @example
* var isPositiveZerof = require( '@stdlib/math/base/assert/is-positive-zerof' );
*
* var bool = isPositiveZerof( 0.0 );
* // returns true
*
* bool = isPositiveZerof( -0.0 );
* // returns false
*/

// MODULES //

var isPositiveZerof = require( './main.js' );


// EXPORTS //

module.exports = isPositiveZerof;

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

// MODULES //

var PINF = require( '@stdlib/constants/float32/pinf' );


// MAIN //

/**
* Tests if a single-precision floating-point numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZerof( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZerof( -0.0 );
* // returns false
*/
function isPositiveZerof( x ) {
	return (x === 0.0 && 1.0/x === PINF);
}


// EXPORTS //

module.exports = isPositiveZerof;

},{"@stdlib/constants/float32/pinf":70}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":88}],88:[function(require,module,exports){
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
* Compute the cube root of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/cbrt
*
* @example
* var cbrt = require( '@stdlib/math/base/special/cbrt' );
*
* var v = cbrt( 64.0 );
* // returns 4.0
*
* v = cbrt( 27.0 );
* // returns 3.0
*
* v = cbrt( 0.0 );
* // returns 0.0
*
* v = cbrt( -0.0 );
* // returns -0.0
*
* v = cbrt( -9.0 );
* // returns ~-2.08
*
* v = cbrt( NaN );
* // returns NaN
*/

// MODULES //

var cbrt = require( './main.js' );


// EXPORTS //

module.exports = cbrt;

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
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_cbrt.c?view=markup}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
*
* Optimized by Bruce D. Evans.
* ```
*/

'use strict';

// MODULES //

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/float64/smallest-normal' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var isinfinite = require( '@stdlib/math/base/assert/is-infinite' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var polyval = require( './polyval_p.js' );


// VARIABLES //

// 0x80000000 = 2147483648 => 1 00000000000 00000000000000000000
var SIGN_MASK = 0x80000000>>>0; // asm type annotation

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff>>>0; // asm type annotation

// 2**32 - 1 = 4294967295 => 11111111111111111111111111111111
var HIGH_WORD_MASK = 4294967295>>>0; // asm type annotation

// 2**31 + 2**30 = 3221225472 => 11000000000000000000000000000000
var LOW_WORD_MASK = 3221225472>>>0; // asm type annotation

// 2**54
var TWO_54 = 18014398509481984.0;

// 2**31 = 0x80000000 = 2147483648 => 1 00000000000 00000000000000000000
var TWO_31 = 0x80000000>>>0; // asm type annotation

// 0x00000001 = 1 => 0 00000000000 00000000000000000001
var ONE = 0x00000001>>>0; // asm type annotation

// B1 = (1023-1023/3-0.03306235651)*2**20
var B1 = 715094163>>>0; // asm type annotation

// B2 = (1023-1023/3-54/3-0.03306235651)*2**20
var B2 = 696219795>>>0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000
var FLOAT64_SMALLEST_NORMAL_HIGH_WORD = getHighWord( FLOAT64_SMALLEST_NORMAL ); // eslint-disable-line id-length

// Words workspace:
var WORDS = [ 0>>>0, 0>>>0 ]; // asm type annotations


// MAIN //

/**
* Computes the cube root of a double-precision floating-point number.
*
* ## Method
*
* 1.  Rough cube root to \\( 5 \\) bits:
*
*     ```tex
*     \sqrt\[3\]{2^e (1+m)} \approx 2^(e/3) \biggl(1 + \frac{(e \mathrm{mod}\ 3) + m}{3}\biggr)
*     ```
*
*     where \\( e \\) is a nonnegative integer, \\( m \\) is real and in \\( \[0, 1) \\), and \\( / \\) and \\( \mathrm{mod} \\) are integer division and modulus with rounding toward \\( -\infty \\).
*
*     The RHS is always greater than or equal to the LHS and has a maximum relative error of about \\( 1 \\) in \\( 16 \\).
*
*     Adding a bias of \\( -0.03306235651 \\) to the \\( (e \mathrm{mod} 3+ m )/ 3 \\) term reduces the error to about \\( 1 \\) in \\( 32 \\).
*
*     With the IEEE floating point representation, for finite positive normal values, ordinary integer division of the value in bits magically gives almost exactly the RHS of the above provided we first subtract the exponent bias (\\( 1023 \\) for doubles) and later add it back.
*
*     We do the subtraction virtually to keep \\( e \geq 0 \\) so that ordinary integer division rounds toward \\( -\infty \\); this is also efficient.
*
* 2.  New cube root to \\( 23 \\) bits:
*
*     ```tex
*     \sqrt[3]{x} = t \cdot \sqrt\[3\]{x/t^3} \approx t \mathrm{P}(t^3/x)
*     ```
*
*     where \\( \mathrm{P}(r) \\) is a polynomial of degree \\( 4 \\) that approximates \\( 1 / \sqrt\[3\]{r} \\) to within \\( 2^{-23.5} \\) when \\( |r - 1| < 1/10 \\).
*
*     The rough approximation has produced \\( t \\) such than \\( |t/sqrt\[3\]{x} - 1| \lesssim 1/32 \\), and cubing this gives us bounds for \\( r = t^3/x \\).
*
* 3.  Round \\( t \\) away from \\( 0 \\) to \\( 23 \\) bits (sloppily except for ensuring that the result is larger in magnitude than \\( \sqrt\[3\]{x} \\) but not much more than \\( 2 \\) 23-bit ulps larger).
*
*     With rounding toward zero, the error bound would be \\( \approx 5/6 \\) instead of \\( \approx 4/6 \\).
*
*     With a maximum error of \\( 2 \\) 23-bit ulps in the rounded \\( t \\), the infinite-precision error in the Newton approximation barely affects the third digit in the final error \\( 0.667 \\); the error in the rounded \\( t \\) can be up to about \\( 3 \\) 23-bit ulps before the final error is larger than \\( 0.667 \\) ulps.
*
* 4.  Perform one step of a Newton iteration to get \\( 53 \\) bits with an error of \\( < 0.667 \\) ulps.
*
*
* @param {number} x - input value
* @returns {number} cube root
*
* @example
* var v = cbrt( 64.0 );
* // returns 4.0
*
* @example
* var v = cbrt( 27.0 );
* // returns 3.0
*
* @example
* var v = cbrt( 0.0 );
* // returns 0.0
*
* @example
* var v = cbrt( -9.0 );
* // returns ~-2.08
*
* @example
* var v = cbrt( NaN );
* // returns NaN
*/
function cbrt( x ) {
	var sgn;
	var hx;
	var hw;
	var r;
	var s;
	var t;
	var w;
	if (
		x === 0.0 || // handles +-0
		isnan( x ) ||
		isinfinite( x )
	) {
		return x;
	}
	hx = getHighWord( x )>>>0;
	sgn = (hx & SIGN_MASK)>>>0;
	hx &= ABS_MASK;

	// Rough cbrt...
	if ( hx < FLOAT64_SMALLEST_NORMAL_HIGH_WORD ) {
		t = TWO_54 * x;
		hw = ( getHighWord( t )&ABS_MASK )>>>0;
		hw = ( ( (hw/3)>>>0 ) + B2 )>>>0;
		t = fromWords( sgn|hw, 0 );
	} else {
		t = 0.0;
		hw = ( ( (hx/3)>>>0 ) + B1 )>>>0;
		t = setHighWord( t, sgn|hw );
	}
	// New cbrt...
	r = ( t*t ) * ( t/x );
	t *= polyval( r );

	// Round `t` away from `0` to `23` bits...
	toWords( WORDS, t );
	if ( WORDS[ 1 ]&TWO_31 ) {
		// Perform manual addition, since we are split across two words...
		WORDS[ 0 ] += ONE;  // carry the one
		WORDS[ 1 ] &= ~TWO_31; // clear the bit
	} else {
		WORDS[ 1 ] |= TWO_31;
	}
	t = fromWords( WORDS[0]&HIGH_WORD_MASK, WORDS[1]&LOW_WORD_MASK );

	// Newton iteration...
	s = t * t; // `t*t` is exact
	r = x / s; // error `<= 0.5` ulps; `|r| < |t|`
	w = t + t; // `t+t` is exact
	r = ( r-t ) / ( w+r ); // `r-t` is exact; `w+r ~= 3*t`
	t += t * r; // error `<= 0.5 + 0.5/3 + eps`

	return t;
}


// EXPORTS //

module.exports = cbrt;

},{"./polyval_p.js":91,"@stdlib/constants/float64/smallest-normal":73,"@stdlib/math/base/assert/is-infinite":77,"@stdlib/math/base/assert/is-nan":79,"@stdlib/number/float64/base/from-words":112,"@stdlib/number/float64/base/get-high-word":116,"@stdlib/number/float64/base/set-high-word":119,"@stdlib/number/float64/base/to-words":124}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 1.87595182427177;
	}
	return 1.87595182427177 + (x * (-1.8849797954337717 + (x * (1.6214297201053545 + (x * (-0.758397934778766 + (x * 0.14599619288661245))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the cube root of a single-precision floating-point number.
*
* @module @stdlib/math/base/special/cbrtf
*
* @example
* var cbrtf = require( '@stdlib/math/base/special/cbrtf' );
*
* var v = cbrtf( 64.0 );
* // returns 4.0
*
* v = cbrtf( 27.0 );
* // returns 3.0
*
* v = cbrtf( 0.0 );
* // returns 0.0
*
* v = cbrtf( -0.0 );
* // returns -0.0
*
* v = cbrtf( -9.0 );
* // returns ~-2.08
*
* v = cbrtf( NaN );
* // returns NaN
*/

// MODULES //

var cbrtf = require( './main.js' );


// EXPORTS //

module.exports = cbrtf;

},{"./main.js":93}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
*/

'use strict';

// MODULES //

var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );
var cbrt = require( '@stdlib/math/base/special/cbrt' );


// MAIN //

/**
* Computes the cube root of a single-precision floating-point number.
*
* @param {number} x - input value
* @returns {number} cube root
*
* @example
* var v = cbrtf( 64.0 );
* // returns 4.0
*
* @example
* var v = cbrtf( 27.0 );
* // returns 3.0
*
* @example
* var v = cbrtf( 0.0 );
* // returns 0.0
*
* @example
* var v = cbrtf( -9.0 );
* // returns ~-2.08
*
* @example
* var v = cbrtf( NaN );
* // returns NaN
*/
function cbrtf( x ) {
	return float64ToFloat32( cbrt( float64ToFloat32( x ) ) );
}


// EXPORTS //

module.exports = cbrtf;

},{"@stdlib/math/base/special/cbrt":89,"@stdlib/number/float64/base/to-float32":121}],94:[function(require,module,exports){
module.exports={"expected":[-4.641589e6,-2.7108125e8,-3.415407e8,-3.9096637e8,-4.3031414e8,-4.635418e8,-4.9258662e8,-5.1855904e8,-5.421617e8,-5.638709e8,-5.84026e8,-6.028784e8,-6.206202e8,-6.374018e8,-6.5334336e8,-6.6854285e8,-6.830809e8,-6.9702515e8,-7.104327e8,-7.233525e8,-7.3582656e8,-7.4789146e8,-7.5957914e8,-7.709178e8,-7.819324e8,-7.926451e8,-8.0307584e8,-8.1324243e8,-8.23161e8,-8.3284614e8,-8.423111e8,-8.51568e8,-8.606279e8,-8.69501e8,-8.781966e8,-8.867233e8,-8.9508915e8,-9.0330144e8,-9.1136704e8,-9.1929235e8,-9.270833e8,-9.3474554e8,-9.422841e8,-9.49704e8,-9.5700966e8,-9.642055e8,-9.7129555e8,-9.782835e8,-9.8517306e8,-9.9196755e8,-9.986702e8,-1.00528416e9,-1.01181216e9,-1.01825696e9,-1.02462125e9,-1.03090746e9,-1.0371179e9,-1.0432548e9,-1.0493204e9,-1.0553166e9,-1.0612455e9,-1.0671088e9,-1.0729085e9,-1.078646e9,-1.0843232e9,-1.0899416e9,-1.0955026e9,-1.1010077e9,-1.1064584e9,-1.1118557e9,-1.1172014e9,-1.1224963e9,-1.1277416e9,-1.1329386e9,-1.1380884e9,-1.143192e9,-1.1482505e9,-1.1532648e9,-1.1582358e9,-1.1631645e9,-1.1680518e9,-1.1728986e9,-1.1777056e9,-1.1824736e9,-1.1872036e9,-1.1918962e9,-1.1965521e9,-1.201172e9,-1.2057567e9,-1.2103067e9,-1.2148228e9,-1.2193056e9,-1.2237556e9,-1.2281736e9,-1.23256e9,-1.2369153e9,-1.2412402e9,-1.2455352e9,-1.2498008e9,-1.2540374e9,-1.2582456e9,-1.2624259e9,-1.2665787e9,-1.2707044e9,-1.2748035e9,-1.2788763e9,-1.2829234e9,-1.2869452e9,-1.2909418e9,-1.294914e9,-1.298862e9,-1.302786e9,-1.3066866e9,-1.3105641e9,-1.3144187e9,-1.3182508e9,-1.3220608e9,-1.325849e9,-1.3296156e9,-1.333361e9,-1.3370854e9,-1.3407894e9,-1.3444728e9,-1.3481363e9,-1.35178e9,-1.355404e9,-1.3590089e9,-1.3625947e9,-1.3661617e9,-1.3697101e9,-1.3732403e9,-1.3767524e9,-1.3802468e9,-1.3837235e9,-1.3871828e9,-1.390625e9,-1.3940502e9,-1.3974586e9,-1.4008506e9,-1.404226e9,-1.4075854e9,-1.4109289e9,-1.4142566e9,-1.4175686e9,-1.4208654e9,-1.4241468e9,-1.4274132e9,-1.4306647e9,-1.4339016e9,-1.4371238e9,-1.4403316e9,-1.4435254e9,-1.4467049e9,-1.4498706e9,-1.4530225e9,-1.4561608e9,-1.4592856e9,-1.462397e9,-1.4654954e9,-1.4685806e9,-1.471653e9,-1.4747126e9,-1.4777595e9,-1.480794e9,-1.483816e9,-1.4868257e9,-1.4898234e9,-1.492809e9,-1.4957828e9,-1.4987447e9,-1.501695e9,-1.5046337e9,-1.5075611e9,-1.510477e9,-1.5133818e9,-1.5162755e9,-1.5191581e9,-1.52203e9,-1.5248909e9,-1.5277412e9,-1.5305809e9,-1.53341e9,-1.5362287e9,-1.5390372e9,-1.5418355e9,-1.5446236e9,-1.5474017e9,-1.5501699e9,-1.5529283e9,-1.5556768e9,-1.5584156e9,-1.561145e9,-1.5638647e9,-1.5665751e9,-1.569276e9,-1.5719677e9,-1.5746504e9,-1.5773238e9,-1.5799881e9,-1.5826436e9,-1.5852901e9,-1.5879279e9,-1.5905569e9,-1.5931773e9,-1.595789e9,-1.5983923e9,-1.6009871e9,-1.6035735e9,-1.6061517e9,-1.6087214e9,-1.6112832e9,-1.6138367e9,-1.6163822e9,-1.6189197e9,-1.6214492e9,-1.623971e9,-1.6264849e9,-1.628991e9,-1.6314894e9,-1.6339803e9,-1.6364635e9,-1.6389393e9,-1.6414075e9,-1.6438684e9,-1.6463219e9,-1.6487683e9,-1.6512072e9,-1.653639e9,-1.6560637e9,-1.6584813e9,-1.6608919e9,-1.6632955e9,-1.6656922e9,-1.668082e9,-1.670465e9,-1.6728412e9,-1.6752106e9,-1.6775735e9,-1.6799296e9,-1.6822792e9,-1.6846222e9,-1.6869587e9,-1.6892887e9,-1.6916124e9,-1.6939296e9,-1.6962406e9,-1.6985453e9,-1.7008438e9,-1.703136e9,-1.7054221e9,-1.707702e9,-1.7099759e9,-1.7122438e9,-1.7145057e9,-1.7167617e9,-1.7190117e9,-1.7212558e9,-1.7234941e9,-1.7257266e9,-1.7279534e9,-1.7301745e9,-1.7323898e9,-1.7345994e9,-1.7368035e9,-1.739002e9,-1.7411949e9,-1.7433824e9,-1.7455643e9,-1.7477408e9,-1.7499119e9,-1.7520777e9,-1.7542381e9,-1.7563932e9,-1.758543e9,-1.7606875e9,-1.7628269e9,-1.764961e9,-1.76709e9,-1.769214e9,-1.7713329e9,-1.7734465e9,-1.7755553e9,-1.777659e9,-1.7797578e9,-1.7818516e9,-1.7839406e9,-1.7860246e9,-1.7881038e9,-1.7901782e9,-1.7922477e9,-1.7943126e9,-1.7963726e9,-1.7984279e9,-1.8004786e9,-1.8025247e9,-1.804566e9,-1.8066028e9,-1.8086349e9,-1.8106625e9,-1.8126857e9,-1.8147043e9,-1.8167183e9,-1.818728e9,-1.8207332e9,-1.822734e9,-1.8247304e9,-1.8267224e9,-1.8287101e9,-1.8306936e9,-1.8326728e9,-1.8346476e9,-1.8366182e9,-1.8385847e9,-1.8405468e9,-1.8425048e9,-1.8444588e9,-1.8464084e9,-1.848354e9,-1.8502957e9,-1.8522332e9,-1.8541665e9,-1.856096e9,-1.8580214e9,-1.8599428e9,-1.8618604e9,-1.8637738e9,-1.8656835e9,-1.8675891e9,-1.869491e9,-1.8713889e9,-1.8732831e9,-1.8751734e9,-1.8770598e9,-1.8789426e9,-1.8808215e9,-1.8826967e9,-1.8845682e9,-1.886436e9,-1.8883e9,-1.8901604e9,-1.8920172e9,-1.8938702e9,-1.8957197e9,-1.8975656e9,-1.8994079e9,-1.9012466e9,-1.9030819e9,-1.9049134e9,-1.9067416e9,-1.9085663e9,-1.9103873e9,-1.912205e9,-1.9140193e9,-1.9158301e9,-1.9176375e9,-1.9194415e9,-1.9212421e9,-1.9230394e9,-1.9248332e9,-1.9266237e9,-1.928411e9,-1.930195e9,-1.9319756e9,-1.9337528e9,-1.9355269e9,-1.9372978e9,-1.9390655e9,-1.9408298e9,-1.942591e9,-1.944349e9,-1.9461038e9,-1.9478555e9,-1.949604e9,-1.9513494e9,-1.9530917e9,-1.9548308e9,-1.9565669e9,-1.9582999e9,-1.96003e9,-1.9617568e9,-1.9634806e9,-1.9652015e9,-1.9669193e9,-1.9686341e9,-1.970346e9,-1.9720549e9,-1.9737608e9,-1.9754638e9,-1.9771639e9,-1.978861e9,-1.9805553e9,-1.9822465e9,-1.983935e9,-1.9856206e9,-1.9873034e9,-1.9889833e9,-1.9906604e9,-1.9923346e9,-1.9940059e9,-1.9956746e9,-1.9973404e9,-1.9990035e9,-2.0006638e9,-2.0023213e9,-2.0039762e9,-2.0056283e9,-2.0072776e9,-2.0089243e9,-2.0105682e9,-2.0122095e9,-2.013848e9,-2.015484e9,-2.0171173e9,-2.018748e9,-2.020376e9,-2.0220014e9,-2.0236242e9,-2.0252444e9,-2.0268621e9,-2.028477e9,-2.0300896e9,-2.0316995e9,-2.0333068e9,-2.0349116e9,-2.0365139e9,-2.0381137e9,-2.039711e9,-2.0413057e9,-2.042898e9,-2.0444878e9,-2.0460751e9,-2.04766e9,-2.0492425e9,-2.0508224e9,-2.0524e9,-2.0539752e9,-2.0555479e9,-2.0571182e9,-2.0586861e9,-2.0602516e9,-2.0618148e9,-2.0633756e9,-2.064934e9,-2.0664901e9,-2.0680439e9,-2.0695953e9,-2.0711444e9,-2.0726912e9,-2.0742356e9,-2.0757778e9,-2.0773178e9,-2.0788554e9,-2.0803907e9,-2.0819238e9,-2.0834546e9,-2.0849832e9,-2.0865096e9,-2.0880337e9,-2.0895556e9,-2.0910752e9,-2.0925926e9,-2.0941079e9,-2.0956211e9,-2.0971319e9,-2.0986406e9,-2.1001472e9,-2.1016517e9,-2.1031539e9,-2.1046541e9,-2.106152e9,-2.1076479e9,-2.1091416e9,-2.1106332e9,-2.1121226e9,-2.1136101e9,-2.1150954e9,-2.1165787e9,-2.1180598e9,-2.119539e9,-2.1210159e9,-2.1224909e9,-2.1239639e9,-2.1254348e9,-2.1269036e9,-2.1283704e9,-2.1298353e9,-2.131298e9,-2.1327588e9,-2.1342176e9,-2.1356745e9,-2.1371292e9,-2.138582e9,-2.140033e9,-2.1414819e9,-2.1429288e9,-2.1443739e9,-2.1458168e9,-2.147258e9,-2.148697e9,-2.1501345e9,-2.1515697e9,-2.1530033e9,-2.1544346e9],"x":[-1.0e20,-1.9920418525896414e25,-3.984073705179283e25,-5.976105557768924e25,-7.968137410358566e25,-9.960169262948207e25,-1.1952201115537847e26,-1.394423296812749e26,-1.593626482071713e26,-1.7928296673306773e26,-1.9920328525896412e26,-2.1912360378486055e26,-2.3904392231075697e26,-2.5896424083665336e26,-2.788845593625498e26,-2.988048778884462e26,-3.187251964143426e26,-3.3864551494023906e26,-3.5856583346613545e26,-3.7848615199203184e26,-3.984064705179283e26,-4.183267890438247e26,-4.382471075697211e26,-4.5816742609561754e26,-4.780877446215139e26,-4.980080631474103e26,-5.179283816733068e26,-5.378487001992032e26,-5.5776901872509956e26,-5.77689337250996e26,-5.976096557768924e26,-6.175299743027888e26,-6.374502928286853e26,-6.573706113545816e26,-6.77290929880478e26,-6.972112484063744e26,-7.171315669322708e26,-7.370518854581673e26,-7.569722039840637e26,-7.768925225099601e26,-7.968128410358565e26,-8.167331595617529e26,-8.366534780876493e26,-8.565737966135458e26,-8.764941151394422e26,-8.964144336653386e26,-9.16334752191235e26,-9.362550707171314e26,-9.561753892430279e26,-9.760957077689243e26,-9.960160262948207e26,-1.0159363448207171e27,-1.0358566633466135e27,-1.0557769818725099e27,-1.0756973003984064e27,-1.0956176189243028e27,-1.1155379374501992e27,-1.1354582559760956e27,-1.155378574501992e27,-1.1752988930278883e27,-1.1952192115537849e27,-1.2151395300796813e27,-1.2350598486055777e27,-1.2549801671314742e27,-1.2749004856573704e27,-1.294820804183267e27,-1.3147411227091632e27,-1.3346614412350597e27,-1.354581759760956e27,-1.3745020782868525e27,-1.394422396812749e27,-1.4143427153386453e27,-1.4342630338645418e27,-1.454183352390438e27,-1.4741036709163346e27,-1.4940239894422311e27,-1.5139443079681274e27,-1.533864626494024e27,-1.5537849450199202e27,-1.5737052635458167e27,-1.593625582071713e27,-1.6135459005976095e27,-1.633466219123506e27,-1.6533865376494023e27,-1.6733068561752988e27,-1.693227174701195e27,-1.7131474932270916e27,-1.733067811752988e27,-1.7529881302788844e27,-1.772908448804781e27,-1.792828767330677e27,-1.8127490858565737e27,-1.83266940438247e27,-1.8525897229083664e27,-1.872510041434263e27,-1.8924303599601592e27,-1.9123506784860558e27,-1.932270997011952e27,-1.9521913155378485e27,-1.972111634063745e27,-1.9920319525896413e27,-2.0119522711155378e27,-2.031872589641434e27,-2.0517929081673306e27,-2.071713226693227e27,-2.0916335452191234e27,-2.11155386374502e27,-2.1314741822709162e27,-2.1513945007968127e27,-2.171314819322709e27,-2.1912351378486055e27,-2.211155456374502e27,-2.2310757749003983e27,-2.2509960934262948e27,-2.270916411952191e27,-2.2908367304780876e27,-2.3107570490039838e27,-2.3306773675298804e27,-2.350597686055777e27,-2.3705180045816731e27,-2.3904383231075697e27,-2.410358641633466e27,-2.4302789601593625e27,-2.450199278685259e27,-2.4701195972111552e27,-2.4900399157370515e27,-2.509960234262948e27,-2.5298805527888445e27,-2.549800871314741e27,-2.5697211898406376e27,-2.5896415083665336e27,-2.60956182689243e27,-2.6294821454183266e27,-2.649402463944223e27,-2.669322782470119e27,-2.6892431009960157e27,-2.709163419521912e27,-2.7290837380478087e27,-2.749004056573705e27,-2.768924375099601e27,-2.788844693625498e27,-2.8087650121513943e27,-2.828685330677291e27,-2.8486056492031873e27,-2.8685259677290833e27,-2.88844628625498e27,-2.9083666047808764e27,-2.928286923306773e27,-2.9482072418326694e27,-2.9681275603585654e27,-2.988047878884462e27,-3.0079681974103585e27,-3.027888515936255e27,-3.0478088344621515e27,-3.0677291529880475e27,-3.087649471513944e27,-3.1075697900398405e27,-3.127490108565737e27,-3.1474104270916336e27,-3.1673307456175296e27,-3.187251064143426e27,-3.2071713826693226e27,-3.227091701195219e27,-3.247012019721115e27,-3.2669323382470117e27,-3.286852656772908e27,-3.306772975298805e27,-3.326693293824701e27,-3.346613612350597e27,-3.366533930876494e27,-3.3864542494023903e27,-3.406374567928287e27,-3.4262948864541833e27,-3.4462152049800793e27,-3.466135523505976e27,-3.4860558420318724e27,-3.505976160557769e27,-3.5258964790836654e27,-3.5458167976095614e27,-3.565737116135458e27,-3.5856574346613545e27,-3.605577753187251e27,-3.6254980717131475e27,-3.6454183902390435e27,-3.66533870876494e27,-3.6852590272908366e27,-3.705179345816733e27,-3.725099664342629e27,-3.7450199828685256e27,-3.764940301394422e27,-3.7848606199203186e27,-3.804780938446215e27,-3.824701256972111e27,-3.8446215754980077e27,-3.864541894023904e27,-3.884462212549801e27,-3.904382531075697e27,-3.924302849601593e27,-3.94422316812749e27,-3.9641434866533863e27,-3.984063805179283e27,-4.0039841237051794e27,-4.0239044422310753e27,-4.043824760756972e27,-4.0637450792828684e27,-4.083665397808765e27,-4.1035857163346614e27,-4.1235060348605574e27,-4.143426353386454e27,-4.1633466719123505e27,-4.183266990438247e27,-4.203187308964143e27,-4.2231076274900395e27,-4.243027946015936e27,-4.2629482645418326e27,-4.282868583067729e27,-4.302788901593625e27,-4.3227092201195216e27,-4.342629538645418e27,-4.3625498571713147e27,-4.382470175697211e27,-4.402390494223107e27,-4.4223108127490037e27,-4.4422311312749e27,-4.462151449800797e27,-4.482071768326693e27,-4.501992086852589e27,-4.521912405378486e27,-4.5418327239043823e27,-4.561753042430279e27,-4.5816733609561754e27,-4.6015936794820713e27,-4.621513998007968e27,-4.6414343165338644e27,-4.661354635059761e27,-4.6812749535856574e27,-4.7011952721115534e27,-4.72111559063745e27,-4.7410359091633465e27,-4.760956227689243e27,-4.780876546215139e27,-4.8007968647410355e27,-4.820717183266932e27,-4.8406375017928286e27,-4.860557820318725e27,-4.880478138844621e27,-4.9003984573705176e27,-4.920318775896414e27,-4.9402390944223107e27,-4.960159412948207e27,-4.980079731474103e27,-5.00000005e27,-5.019920368525896e27,-5.039840687051793e27,-5.059761005577689e27,-5.079681324103586e27,-5.099601642629482e27,-5.119521961155378e27,-5.139442279681274e27,-5.159362598207171e27,-5.179282916733067e27,-5.199203235258964e27,-5.21912355378486e27,-5.239043872310757e27,-5.258964190836653e27,-5.27888450936255e27,-5.298804827888447e27,-5.318725146414342e27,-5.338645464940238e27,-5.358565783466135e27,-5.378486101992032e27,-5.398406420517928e27,-5.418326739043825e27,-5.438247057569721e27,-5.458167376095618e27,-5.478087694621514e27,-5.49800801314741e27,-5.517928331673306e27,-5.537848650199203e27,-5.557768968725099e27,-5.577689287250996e27,-5.597609605776892e27,-5.617529924302789e27,-5.637450242828685e27,-5.657370561354582e27,-5.677290879880478e27,-5.697211198406374e27,-5.71713151693227e27,-5.737051835458167e27,-5.756972153984063e27,-5.77689247250996e27,-5.796812791035856e27,-5.816733109561753e27,-5.83665342808765e27,-5.856573746613546e27,-5.876494065139443e27,-5.896414383665338e27,-5.916334702191234e27,-5.936255020717131e27,-5.956175339243028e27,-5.976095657768924e27,-5.996015976294821e27,-6.015936294820717e27,-6.035856613346614e27,-6.05577693187251e27,-6.075697250398406e27,-6.095617568924302e27,-6.115537887450199e27,-6.135458205976095e27,-6.155378524501992e27,-6.175298843027888e27,-6.195219161553785e27,-6.215139480079681e27,-6.235059798605578e27,-6.254980117131474e27,-6.27490043565737e27,-6.294820754183266e27,-6.314741072709163e27,-6.334661391235059e27,-6.354581709760956e27,-6.374502028286852e27,-6.394422346812749e27,-6.414342665338645e27,-6.434262983864542e27,-6.454183302390439e27,-6.474103620916334e27,-6.49402393944223e27,-6.513944257968127e27,-6.533864576494024e27,-6.55378489501992e27,-6.573705213545817e27,-6.593625532071713e27,-6.61354585059761e27,-6.633466169123506e27,-6.653386487649402e27,-6.673306806175298e27,-6.693227124701195e27,-6.713147443227091e27,-6.733067761752988e27,-6.752988080278884e27,-6.772908398804781e27,-6.792828717330677e27,-6.812749035856574e27,-6.83266935438247e27,-6.852589672908366e27,-6.872509991434262e27,-6.892430309960159e27,-6.912350628486055e27,-6.932270947011952e27,-6.952191265537848e27,-6.972111584063745e27,-6.992031902589641e27,-7.011952221115538e27,-7.031872539641433e27,-7.05179285816733e27,-7.071713176693226e27,-7.091633495219123e27,-7.11155381374502e27,-7.131474132270916e27,-7.151394450796813e27,-7.171314769322709e27,-7.191235087848606e27,-7.211155406374502e27,-7.231075724900398e27,-7.250996043426294e27,-7.270916361952191e27,-7.290836680478087e27,-7.310756999003984e27,-7.33067731752988e27,-7.350597636055777e27,-7.370517954581673e27,-7.39043827310757e27,-7.410358591633466e27,-7.430278910159362e27,-7.450199228685258e27,-7.470119547211155e27,-7.490039865737051e27,-7.509960184262948e27,-7.529880502788844e27,-7.549800821314741e27,-7.569721139840637e27,-7.589641458366534e27,-7.609561776892429e27,-7.629482095418326e27,-7.649402413944222e27,-7.669322732470119e27,-7.689243050996016e27,-7.709163369521912e27,-7.729083688047809e27,-7.749004006573705e27,-7.768924325099602e27,-7.788844643625498e27,-7.808764962151394e27,-7.82868528067729e27,-7.848605599203187e27,-7.868525917729083e27,-7.88844623625498e27,-7.908366554780876e27,-7.928286873306773e27,-7.948207191832669e27,-7.968127510358566e27,-7.988047828884461e27,-8.007968147410358e27,-8.027888465936254e27,-8.047808784462151e27,-8.067729102988047e27,-8.087649421513944e27,-8.10756974003984e27,-8.127490058565737e27,-8.147410377091633e27,-8.16733069561753e27,-8.187251014143425e27,-8.207171332669322e27,-8.227091651195219e27,-8.247011969721115e27,-8.266932288247012e27,-8.286852606772908e27,-8.306772925298805e27,-8.326693243824701e27,-8.346613562350598e27,-8.366533880876494e27,-8.38645419940239e27,-8.406374517928286e27,-8.426294836454183e27,-8.446215154980079e27,-8.466135473505976e27,-8.486055792031872e27,-8.505976110557769e27,-8.525896429083665e27,-8.545816747609562e27,-8.565737066135457e27,-8.585657384661354e27,-8.60557770318725e27,-8.625498021713147e27,-8.645418340239043e27,-8.66533865876494e27,-8.685258977290836e27,-8.705179295816733e27,-8.72509961434263e27,-8.745019932868526e27,-8.764940251394421e27,-8.784860569920318e27,-8.804780888446215e27,-8.824701206972111e27,-8.844621525498008e27,-8.864541844023904e27,-8.884462162549801e27,-8.904382481075697e27,-8.924302799601594e27,-8.94422311812749e27,-8.964143436653386e27,-8.984063755179282e27,-9.003984073705179e27,-9.023904392231075e27,-9.043824710756972e27,-9.063745029282868e27,-9.083665347808765e27,-9.103585666334661e27,-9.123505984860558e27,-9.143426303386453e27,-9.16334662191235e27,-9.183266940438246e27,-9.203187258964143e27,-9.223107577490039e27,-9.243027896015936e27,-9.262948214541832e27,-9.282868533067729e27,-9.302788851593626e27,-9.322709170119522e27,-9.342629488645417e27,-9.362549807171314e27,-9.38247012569721e27,-9.402390444223107e27,-9.422310762749004e27,-9.4422310812749e27,-9.462151399800797e27,-9.482071718326693e27,-9.50199203685259e27,-9.521912355378485e27,-9.541832673904382e27,-9.561752992430278e27,-9.581673310956175e27,-9.601593629482071e27,-9.621513948007968e27,-9.641434266533864e27,-9.661354585059761e27,-9.681274903585657e27,-9.701195222111554e27,-9.721115540637449e27,-9.741035859163346e27,-9.760956177689242e27,-9.780876496215139e27,-9.800796814741035e27,-9.820717133266932e27,-9.840637451792828e27,-9.860557770318725e27,-9.880478088844622e27,-9.900398407370518e27,-9.920318725896413e27,-9.94023904442231e27,-9.960159362948207e27,-9.980079681474103e27,-1.0e28]}
},{}],95:[function(require,module,exports){
module.exports={"expected":[1.0e10,5.840269e11,7.358271e11,8.423115e11,9.2708366e11,9.986705e11,1.06124575e12,1.1172016e12,1.168052e12,1.214823e12,1.2582458e12,1.2988622e12,1.3370857e12,1.3732404e12,1.4075856e12,1.4403319e12,1.4716532e12,1.5016952e12,1.530581e12,1.5584158e12,1.5852903e12,1.6112833e12,1.6364635e12,1.6608921e12,1.6846223e12,1.7077022e12,1.7301745e12,1.7520777e12,1.7734466e12,1.7943126e12,1.8147043e12,1.8346477e12,1.8541667e12,1.8732831e12,1.8920172e12,1.9103875e12,1.9284111e12,1.9461038e12,1.9634807e12,1.9805553e12,1.9973405e12,2.0138481e12,2.0300895e12,2.0460752e12,2.0618149e12,2.0773178e12,2.0925928e12,2.1076479e12,2.122491e12,2.1371294e12,2.1515698e12,2.165819e12,2.1798832e12,2.1937682e12,2.2074795e12,2.2210226e12,2.2344027e12,2.2476242e12,2.260692e12,2.2736106e12,2.286384e12,2.2990162e12,2.311511e12,2.3238725e12,2.3361036e12,2.3482078e12,2.3601889e12,2.3720493e12,2.3837923e12,2.3954208e12,2.4069373e12,2.4183447e12,2.4296455e12,2.4408422e12,2.4519372e12,2.4629325e12,2.4738306e12,2.4846336e12,2.4953432e12,2.505962e12,2.5164912e12,2.5269334e12,2.5372897e12,2.5475623e12,2.5577526e12,2.5678625e12,2.5778932e12,2.5878465e12,2.5977238e12,2.6075267e12,2.6172564e12,2.6269144e12,2.6365015e12,2.6460197e12,2.65547e12,2.6648531e12,2.674171e12,2.6834242e12,2.6926142e12,2.7017418e12,2.710808e12,2.7198143e12,2.728761e12,2.7376495e12,2.7464806e12,2.7552553e12,2.7639748e12,2.7726392e12,2.7812498e12,2.7898078e12,2.7983133e12,2.8067674e12,2.815171e12,2.8235247e12,2.8318292e12,2.8400854e12,2.8482937e12,2.856455e12,2.86457e12,2.8726392e12,2.8806635e12,2.888643e12,2.896579e12,2.9044716e12,2.9123215e12,2.9201295e12,2.9278958e12,2.9356212e12,2.943306e12,2.950951e12,2.9585567e12,2.9661234e12,2.9736514e12,2.981142e12,2.9885947e12,2.9960107e12,3.00339e12,3.0107333e12,3.0180408e12,3.0253135e12,3.032551e12,3.0397542e12,3.0469236e12,3.054059e12,3.0611617e12,3.0682314e12,3.0752687e12,3.0822737e12,3.0892472e12,3.0961893e12,3.1031005e12,3.109981e12,3.1168313e12,3.1236515e12,3.130442e12,3.1372033e12,3.1439355e12,3.150639e12,3.1573142e12,3.1639612e12,3.1705803e12,3.177172e12,3.1837363e12,3.1902739e12,3.1967847e12,3.2032691e12,3.2097273e12,3.2161595e12,3.2225663e12,3.2289477e12,3.235304e12,3.2416352e12,3.247942e12,3.2542242e12,3.2604823e12,3.2667166e12,3.272927e12,3.279114e12,3.2852777e12,3.2914185e12,3.2975364e12,3.3036317e12,3.3097046e12,3.315755e12,3.321784e12,3.3277907e12,3.333776e12,3.3397397e12,3.3456823e12,3.351604e12,3.3575047e12,3.3633849e12,3.3692443e12,3.3750836e12,3.3809026e12,3.3867018e12,3.3924813e12,3.3982408e12,3.4039813e12,3.4097023e12,3.4154042e12,3.421087e12,3.426751e12,3.4323964e12,3.4380233e12,3.4436318e12,3.449222e12,3.4547945e12,3.4603488e12,3.4658853e12,3.4714042e12,3.4769058e12,3.4823898e12,3.4878566e12,3.4933066e12,3.4987392e12,3.5041554e12,3.5095548e12,3.5149374e12,3.5203037e12,3.5256536e12,3.5309874e12,3.5363053e12,3.541607e12,3.546893e12,3.5521634e12,3.557418e12,3.5626573e12,3.5678813e12,3.5730898e12,3.5782832e12,3.5834616e12,3.588625e12,3.5937738e12,3.5989079e12,3.604027e12,3.609132e12,3.6142226e12,3.6192987e12,3.6243607e12,3.6294083e12,3.6344423e12,3.6394623e12,3.6444682e12,3.6494608e12,3.6544397e12,3.659405e12,3.6643568e12,3.6692954e12,3.6742205e12,3.6791326e12,3.6840315e12,3.6889174e12,3.6937906e12,3.6986508e12,3.7034983e12,3.7083333e12,3.7131555e12,3.7179653e12,3.7227628e12,3.7275477e12,3.7323206e12,3.737081e12,3.7418296e12,3.7465662e12,3.7512906e12,3.7560034e12,3.7607042e12,3.7653934e12,3.7700709e12,3.774737e12,3.779391e12,3.7840342e12,3.7886658e12,3.7932863e12,3.7978953e12,3.8024934e12,3.80708e12,3.811656e12,3.8162208e12,3.8207748e12,3.825318e12,3.8298502e12,3.834372e12,3.838883e12,3.8433834e12,3.8478734e12,3.852353e12,3.856822e12,3.8612807e12,3.8657293e12,3.8701674e12,3.8745955e12,3.8790134e12,3.8834217e12,3.8878197e12,3.8922077e12,3.8965857e12,3.900954e12,3.9053128e12,3.9096618e12,3.914001e12,3.9183306e12,3.9226507e12,3.9269614e12,3.9312624e12,3.9355542e12,3.9398366e12,3.9441098e12,3.9483739e12,3.9526285e12,3.956874e12,3.9611104e12,3.965338e12,3.9695564e12,3.973766e12,3.9779665e12,3.9821582e12,3.9863412e12,3.9905154e12,3.9946808e12,3.9988376e12,4.0029858e12,4.0071253e12,4.0112564e12,4.015379e12,4.0194933e12,4.023599e12,4.0276963e12,4.0317852e12,4.035866e12,4.0399387e12,4.044003e12,4.048059e12,4.0521071e12,4.056147e12,4.060179e12,4.064203e12,4.068219e12,4.0722272e12,4.0762275e12,4.0802197e12,4.0842043e12,4.088181e12,4.0921502e12,4.0961117e12,4.1000656e12,4.1040116e12,4.1079504e12,4.1118815e12,4.115805e12,4.119721e12,4.1236295e12,4.127531e12,4.1314248e12,4.1353114e12,4.1391906e12,4.1430627e12,4.1469275e12,4.150785e12,4.1546356e12,4.158479e12,4.162315e12,4.1661442e12,4.1699663e12,4.1737815e12,4.1775897e12,4.181391e12,4.1851853e12,4.188973e12,4.1927537e12,4.1965275e12,4.2002945e12,4.2040547e12,4.2078083e12,4.2115554e12,4.2152957e12,4.2190294e12,4.2227563e12,4.226477e12,4.230191e12,4.2338982e12,4.2375992e12,4.2412938e12,4.2449817e12,4.2486635e12,4.2523387e12,4.2560077e12,4.2596704e12,4.2633268e12,4.266977e12,4.270621e12,4.2742584e12,4.27789e12,4.2815154e12,4.2851345e12,4.2887477e12,4.2923548e12,4.2959556e12,4.2995506e12,4.3031396e12,4.3067226e12,4.3102996e12,4.3138705e12,4.3174357e12,4.320995e12,4.3245484e12,4.328096e12,4.3316378e12,4.335174e12,4.3387042e12,4.3422287e12,4.3457477e12,4.3492607e12,4.3527682e12,4.35627e12,4.3597661e12,4.3632569e12,4.3667418e12,4.3702215e12,4.3736954e12,4.3771639e12,4.3806268e12,4.3840842e12,4.387536e12,4.3909828e12,4.394424e12,4.3978599e12,4.4012903e12,4.4047155e12,4.4081354e12,4.41155e12,4.414959e12,4.418363e12,4.4217616e12,4.4251553e12,4.428544e12,4.431927e12,4.4353045e12,4.438678e12,4.4420453e12,4.445408e12,4.4487656e12,4.452118e12,4.4554655e12,4.458808e12,4.4621454e12,4.465478e12,4.4688055e12,4.472128e12,4.4754456e12,4.478758e12,4.482066e12,4.485369e12,4.488667e12,4.49196e12,4.4952485e12,4.498532e12,4.501811e12,4.505085e12,4.508354e12,4.511619e12,4.514879e12,4.5181336e12,4.521384e12,4.52463e12,4.527871e12,4.5311077e12,4.5343394e12,4.537567e12,4.5407897e12,4.544008e12,4.547221e12,4.5504303e12,4.553635e12,4.556835e12,4.5600305e12,4.563222e12,4.566408e12,4.5695904e12,4.572768e12,4.575941e12,4.5791104e12,4.582275e12,4.585435e12,4.588591e12,4.5917426e12,4.5948894e12,4.5980325e12,4.601171e12,4.6043056e12,4.6074356e12,4.6105614e12,4.613683e12,4.6168004e12,4.619913e12,4.623022e12,4.626127e12,4.6292276e12,4.632324e12,4.6354163e12,4.638505e12,4.641589e12],"x":[1.0e30,1.9920418525896412e35,3.9840737051792825e35,5.976105557768924e35,7.968137410358565e35,9.960169262948207e35,1.1952201115537848e36,1.394423296812749e36,1.593626482071713e36,1.792829667330677e36,1.9920328525896415e36,2.1912360378486056e36,2.3904392231075697e36,2.5896424083665338e36,2.788845593625498e36,2.988048778884462e36,3.1872519641434263e36,3.38645514940239e36,3.5856583346613545e36,3.784861519920319e36,3.984064705179283e36,4.183267890438247e36,4.382471075697211e36,4.581674260956175e36,4.780877446215139e36,4.9800806314741035e36,5.179283816733068e36,5.378487001992032e36,5.577690187250995e36,5.77689337250996e36,5.976096557768924e36,6.175299743027889e36,6.374502928286853e36,6.573706113545816e36,6.77290929880478e36,6.972112484063745e36,7.171315669322709e36,7.370518854581673e36,7.569722039840637e36,7.768925225099601e36,7.968128410358566e36,8.16733159561753e36,8.366534780876493e36,8.565737966135458e36,8.764941151394422e36,8.964144336653386e36,9.163347521912351e36,9.362550707171314e36,9.561753892430278e36,9.760957077689243e36,9.960160262948207e36,1.0159363448207172e37,1.0358566633466135e37,1.0557769818725099e37,1.0756973003984064e37,1.0956176189243027e37,1.1155379374501992e37,1.1354582559760956e37,1.155378574501992e37,1.1752988930278884e37,1.1952192115537848e37,1.2151395300796813e37,1.2350598486055776e37,1.2549801671314742e37,1.2749004856573705e37,1.2948208041832668e37,1.3147411227091634e37,1.3346614412350597e37,1.354581759760956e37,1.3745020782868526e37,1.394422396812749e37,1.4143427153386455e37,1.4342630338645418e37,1.454183352390438e37,1.4741036709163347e37,1.494023989442231e37,1.5139443079681275e37,1.5338646264940239e37,1.5537849450199202e37,1.5737052635458167e37,1.593625582071713e37,1.6135459005976096e37,1.633466219123506e37,1.6533865376494023e37,1.6733068561752988e37,1.6932271747011951e37,1.7131474932270917e37,1.733067811752988e37,1.7529881302788843e37,1.772908448804781e37,1.7928287673306772e37,1.8127490858565738e37,1.83266940438247e37,1.8525897229083664e37,1.872510041434263e37,1.8924303599601593e37,1.9123506784860558e37,1.9322709970119522e37,1.9521913155378485e37,1.972111634063745e37,1.9920319525896414e37,2.011952271115538e37,2.0318725896414342e37,2.0517929081673306e37,2.071713226693227e37,2.0916335452191234e37,2.11155386374502e37,2.1314741822709163e37,2.1513945007968126e37,2.171314819322709e37,2.1912351378486057e37,2.211155456374502e37,2.2310757749003984e37,2.2509960934262947e37,2.270916411952191e37,2.290836730478088e37,2.310757049003984e37,2.3306773675298805e37,2.350597686055777e37,2.370518004581673e37,2.39043832310757e37,2.410358641633466e37,2.4302789601593625e37,2.450199278685259e37,2.470119597211155e37,2.490039915737052e37,2.5099602342629483e37,2.5298805527888446e37,2.549800871314741e37,2.5697211898406372e37,2.5896415083665336e37,2.6095618268924304e37,2.6294821454183267e37,2.649402463944223e37,2.6693227824701193e37,2.6892431009960156e37,2.7091634195219124e37,2.7290837380478088e37,2.749004056573705e37,2.7689243750996014e37,2.7888446936254977e37,2.8087650121513945e37,2.828685330677291e37,2.848605649203187e37,2.8685259677290835e37,2.88844628625498e37,2.9083666047808766e37,2.928286923306773e37,2.948207241832669e37,2.9681275603585656e37,2.988047878884462e37,3.0079681974103587e37,3.027888515936255e37,3.0478088344621513e37,3.0677291529880476e37,3.087649471513944e37,3.1075697900398407e37,3.127490108565737e37,3.1474104270916334e37,3.1673307456175297e37,3.187251064143426e37,3.207171382669323e37,3.227091701195219e37,3.2470120197211155e37,3.266932338247012e37,3.286852656772908e37,3.306772975298805e37,3.326693293824701e37,3.3466136123505975e37,3.366533930876494e37,3.38645424940239e37,3.406374567928287e37,3.4262948864541833e37,3.4462152049800796e37,3.466135523505976e37,3.4860558420318722e37,3.505976160557769e37,3.5258964790836654e37,3.5458167976095617e37,3.565737116135458e37,3.5856574346613543e37,3.605577753187251e37,3.6254980717131474e37,3.6454183902390438e37,3.66533870876494e37,3.6852590272908364e37,3.705179345816733e37,3.7250996643426295e37,3.745019982868526e37,3.764940301394422e37,3.7848606199203185e37,3.8047809384462153e37,3.8247012569721116e37,3.844621575498008e37,3.864541894023904e37,3.8844622125498005e37,3.9043825310756973e37,3.9243028496015937e37,3.94422316812749e37,3.9641434866533863e37,3.9840638051792826e37,4.0039841237051794e37,4.0239044422310757e37,4.043824760756972e37,4.0637450792828684e37,4.0836653978087647e37,4.1035857163346615e37,4.123506034860558e37,4.143426353386454e37,4.1633466719123505e37,4.183266990438247e37,4.2031873089641436e37,4.22310762749004e37,4.243027946015936e37,4.262948264541833e37,4.282868583067729e37,4.302788901593626e37,4.322709220119522e37,4.342629538645418e37,4.362549857171315e37,4.382470175697211e37,4.402390494223107e37,4.422310812749004e37,4.4422311312749e37,4.462151449800797e37,4.482071768326693e37,4.50199208685259e37,4.521912405378486e37,4.541832723904382e37,4.561753042430279e37,4.581673360956175e37,4.601593679482071e37,4.621513998007968e37,4.641434316533864e37,4.661354635059761e37,4.681274953585658e37,4.701195272111554e37,4.72111559063745e37,4.741035909163347e37,4.760956227689243e37,4.780876546215139e37,4.800796864741036e37,4.820717183266932e37,4.840637501792828e37,4.860557820318725e37,4.880478138844622e37,4.900398457370518e37,4.920318775896414e37,4.940239094422311e37,4.960159412948207e37,4.980079731474103e37,5.00000005e37,5.019920368525896e37,5.039840687051792e37,5.059761005577689e37,5.079681324103586e37,5.099601642629482e37,5.119521961155379e37,5.139442279681275e37,5.159362598207171e37,5.1792829167330675e37,5.199203235258964e37,5.21912355378486e37,5.2390438723107565e37,5.258964190836653e37,5.27888450936255e37,5.298804827888446e37,5.318725146414343e37,5.338645464940239e37,5.358565783466135e37,5.378486101992032e37,5.398406420517928e37,5.418326739043824e37,5.438247057569721e37,5.458167376095617e37,5.478087694621514e37,5.498008013147411e37,5.517928331673307e37,5.537848650199203e37,5.5577689687250995e37,5.577689287250996e37,5.597609605776892e37,5.617529924302788e37,5.637450242828685e37,5.657370561354581e37,5.677290879880478e37,5.697211198406375e37,5.717131516932271e37,5.737051835458167e37,5.756972153984064e37,5.77689247250996e37,5.796812791035856e37,5.816733109561753e37,5.836653428087649e37,5.856573746613545e37,5.8764940651394425e37,5.896414383665339e37,5.916334702191235e37,5.9362550207171315e37,5.956175339243028e37,5.976095657768924e37,5.99601597629482e37,6.015936294820717e37,6.035856613346613e37,6.055776931872509e37,6.075697250398407e37,6.095617568924303e37,6.115537887450199e37,6.135458205976096e37,6.155378524501992e37,6.175298843027888e37,6.195219161553785e37,6.215139480079681e37,6.235059798605577e37,6.254980117131474e37,6.274900435657371e37,6.294820754183267e37,6.314741072709163e37,6.33466139123506e37,6.354581709760956e37,6.374502028286852e37,6.394422346812749e37,6.414342665338645e37,6.434262983864541e37,6.454183302390438e37,6.474103620916335e37,6.494023939442231e37,6.513944257968128e37,6.533864576494024e37,6.55378489501992e37,6.573705213545817e37,6.593625532071713e37,6.613545850597609e37,6.633466169123506e37,6.653386487649402e37,6.673306806175299e37,6.693227124701195e37,6.713147443227092e37,6.733067761752988e37,6.752988080278884e37,6.772908398804781e37,6.792828717330677e37,6.812749035856573e37,6.83266935438247e37,6.852589672908366e37,6.872509991434262e37,6.89243030996016e37,6.912350628486056e37,6.932270947011952e37,6.952191265537849e37,6.972111584063745e37,6.992031902589641e37,7.0119522211155375e37,7.031872539641434e37,7.05179285816733e37,7.0717131766932265e37,7.091633495219124e37,7.11155381374502e37,7.131474132270916e37,7.151394450796813e37,7.171314769322709e37,7.191235087848605e37,7.211155406374502e37,7.231075724900398e37,7.250996043426294e37,7.270916361952191e37,7.290836680478088e37,7.310756999003984e37,7.330677317529881e37,7.350597636055777e37,7.370517954581673e37,7.3904382731075695e37,7.410358591633466e37,7.430278910159362e37,7.450199228685258e37,7.470119547211155e37,7.490039865737052e37,7.509960184262948e37,7.529880502788845e37,7.549800821314741e37,7.569721139840637e37,7.589641458366534e37,7.60956177689243e37,7.629482095418326e37,7.649402413944223e37,7.669322732470119e37,7.689243050996016e37,7.7091633695219125e37,7.729083688047809e37,7.749004006573705e37,7.7689243250996015e37,7.788844643625498e37,7.808764962151394e37,7.82868528067729e37,7.848605599203187e37,7.868525917729083e37,7.88844623625498e37,7.908366554780877e37,7.928286873306773e37,7.948207191832669e37,7.968127510358566e37,7.988047828884462e37,8.007968147410358e37,8.027888465936255e37,8.047808784462151e37,8.067729102988047e37,8.0876494215139445e37,8.107569740039841e37,8.127490058565737e37,8.147410377091633e37,8.16733069561753e37,8.187251014143426e37,8.207171332669322e37,8.227091651195219e37,8.247011969721115e37,8.266932288247011e37,8.286852606772909e37,8.306772925298805e37,8.326693243824701e37,8.346613562350598e37,8.366533880876494e37,8.38645419940239e37,8.406374517928287e37,8.426294836454183e37,8.446215154980079e37,8.466135473505976e37,8.486055792031872e37,8.505976110557769e37,8.525896429083664e37,8.545816747609562e37,8.565737066135457e37,8.585657384661354e37,8.605577703187252e37,8.625498021713147e37,8.645418340239044e37,8.66533865876494e37,8.685258977290837e37,8.705179295816732e37,8.72509961434263e37,8.745019932868525e37,8.764940251394422e37,8.784860569920318e37,8.804780888446215e37,8.824701206972112e37,8.844621525498008e37,8.864541844023905e37,8.8844621625498e37,8.904382481075697e37,8.924302799601593e37,8.94422311812749e37,8.964143436653385e37,8.984063755179283e37,9.00398407370518e37,9.023904392231075e37,9.043824710756973e37,9.063745029282868e37,9.083665347808765e37,9.10358566633466e37,9.123505984860558e37,9.143426303386453e37,9.16334662191235e37,9.183266940438246e37,9.203187258964143e37,9.22310757749004e37,9.243027896015936e37,9.262948214541833e37,9.282868533067728e37,9.302788851593626e37,9.322709170119521e37,9.342629488645418e37,9.362549807171314e37,9.382470125697211e37,9.402390444223108e37,9.422310762749004e37,9.4422310812749e37,9.462151399800796e37,9.482071718326694e37,9.501992036852589e37,9.521912355378486e37,9.541832673904382e37,9.561752992430279e37,9.581673310956174e37,9.601593629482071e37,9.621513948007969e37,9.641434266533864e37,9.661354585059761e37,9.681274903585657e37,9.701195222111554e37,9.72111554063745e37,9.741035859163347e37,9.760956177689242e37,9.78087649621514e37,9.800796814741037e37,9.820717133266932e37,9.84063745179283e37,9.860557770318725e37,9.880478088844622e37,9.900398407370517e37,9.920318725896414e37,9.94023904442231e37,9.960159362948207e37,9.980079681474103e37,1.0e38]}
},{}],96:[function(require,module,exports){
module.exports={"expected":[-3.6840315,-3.682563,-3.6810937,-3.679623,-3.6781511,-3.6766782,-3.6752038,-3.6737285,-3.672252,-3.6707742,-3.6692953,-3.667815,-3.6663337,-3.6648512,-3.6633675,-3.6618824,-3.6603963,-3.6589088,-3.6574204,-3.6559305,-3.6544394,-3.6529474,-3.651454,-3.6499593,-3.6484635,-3.6469662,-3.645468,-3.6439683,-3.6424675,-3.6409655,-3.6394622,-3.6379578,-3.636452,-3.634945,-3.6334367,-3.631927,-3.6304164,-3.6289043,-3.6273909,-3.6258764,-3.6243606,-3.6228435,-3.621325,-3.6198053,-3.6182845,-3.6167622,-3.615239,-3.613714,-3.6121879,-3.6106606,-3.609132,-3.6076021,-3.6060708,-3.6045382,-3.6030045,-3.6014693,-3.5999327,-3.5983949,-3.5968559,-3.5953155,-3.5937738,-3.5922306,-3.5906863,-3.5891407,-3.5875936,-3.5860453,-3.5844955,-3.5829444,-3.581392,-3.5798383,-3.5782833,-3.5767267,-3.5751688,-3.5736098,-3.5720491,-3.5704873,-3.5689242,-3.5673594,-3.5657935,-3.5642262,-3.5626574,-3.5610871,-3.5595157,-3.5579426,-3.5563684,-3.5547926,-3.5532155,-3.5516372,-3.5500572,-3.5484757,-3.5468931,-3.545309,-3.5437233,-3.5421364,-3.540548,-3.538958,-3.5373669,-3.5357742,-3.5341802,-3.5325844,-3.5309875,-3.5293891,-3.527789,-3.526188,-3.524585,-3.5229807,-3.521375,-3.5197678,-3.5181592,-3.516549,-3.5149374,-3.5133243,-3.5117097,-3.5100937,-3.508476,-3.5068572,-3.5052366,-3.5036144,-3.501991,-3.500366,-3.4987392,-3.4971113,-3.4954817,-3.4938505,-3.4922178,-3.4905837,-3.4889479,-3.4873106,-3.485672,-3.4840317,-3.4823897,-3.4807463,-3.4791014,-3.477455,-3.4758067,-3.474157,-3.4725058,-3.470853,-3.4691987,-3.467543,-3.4658854,-3.4642262,-3.4625654,-3.4609032,-3.4592392,-3.457574,-3.4559066,-3.454238,-3.4525678,-3.4508958,-3.449222,-3.447547,-3.4458702,-3.4441917,-3.4425116,-3.44083,-3.4391465,-3.4374614,-3.4357748,-3.4340866,-3.4323964,-3.4307048,-3.4290113,-3.4273164,-3.4256196,-3.4239213,-3.4222212,-3.4205196,-3.418816,-3.417111,-3.415404,-3.4136956,-3.4119852,-3.4102733,-3.4085596,-3.4068441,-3.405127,-3.403408,-3.4016874,-3.399965,-3.3982408,-3.3965151,-3.3947873,-3.393058,-3.391327,-3.3895938,-3.3878593,-3.3861227,-3.3843846,-3.3826447,-3.3809028,-3.3791592,-3.3774137,-3.3756664,-3.3739173,-3.3721664,-3.3704138,-3.3686593,-3.366903,-3.3651447,-3.3633847,-3.3616228,-3.3598592,-3.3580937,-3.356326,-3.354557,-3.3527858,-3.3510127,-3.349238,-3.347461,-3.3456824,-3.3439019,-3.3421195,-3.340335,-3.3385487,-3.3367605,-3.3349705,-3.3331783,-3.3313844,-3.3295884,-3.3277907,-3.325991,-3.3241892,-3.3223855,-3.3205798,-3.3187723,-3.3169627,-3.315151,-3.3133376,-3.311522,-3.3097045,-3.3078852,-3.3060637,-3.30424,-3.3024144,-3.300587,-3.2987573,-3.2969255,-3.295092,-3.2932563,-3.2914186,-3.2895787,-3.287737,-3.285893,-3.284047,-3.282199,-3.2803485,-3.2784963,-3.276642,-3.2747855,-3.272927,-3.2710664,-3.2692034,-3.2673385,-3.2654715,-3.2636023,-3.261731,-3.2598574,-3.2579818,-3.256104,-3.254224,-3.252342,-3.2504575,-3.2485712,-3.2466824,-3.2447915,-3.2428985,-3.241003,-3.2391055,-3.2372057,-3.2353036,-3.2333994,-3.2314932,-3.2295845,-3.2276733,-3.2257602,-3.2238445,-3.2219267,-3.2200067,-3.2180843,-3.2161596,-3.2142327,-3.2123032,-3.2103717,-3.2084377,-3.2065015,-3.2045627,-3.2026217,-3.2006783,-3.1987326,-3.1967847,-3.1948342,-3.1928813,-3.190926,-3.1889684,-3.1870084,-3.185046,-3.1830812,-3.1811137,-3.1791441,-3.177172,-3.1751974,-3.1732202,-3.1712406,-3.1692586,-3.1672742,-3.1652873,-3.1632977,-3.1613057,-3.159311,-3.157314,-3.1553144,-3.1533124,-3.1513078,-3.1493006,-3.1472907,-3.1452785,-3.1432636,-3.141246,-3.139226,-3.1372032,-3.1351779,-3.13315,-3.1311195,-3.1290863,-3.1270504,-3.125012,-3.1229708,-3.120927,-3.1188805,-3.1168313,-3.1147795,-3.1127248,-3.1106675,-3.1086073,-3.1065445,-3.104479,-3.1024108,-3.1003397,-3.098266,-3.0961893,-3.09411,-3.092028,-3.089943,-3.087855,-3.0857644,-3.083671,-3.0815747,-3.0794754,-3.0773735,-3.0752685,-3.073161,-3.0710502,-3.0689366,-3.06682,-3.0647006,-3.0625782,-3.060453,-3.0583246,-3.0561934,-3.054059,-3.0519218,-3.0497818,-3.0476384,-3.0454922,-3.043343,-3.0411906,-3.0390353,-3.036877,-3.0347157,-3.032551,-3.0303833,-3.0282125,-3.0260386,-3.0238616,-3.0216815,-3.019498,-3.0173118,-3.0151222,-3.0129292,-3.0107334,-3.008534,-3.0063317,-3.0041258,-3.001917,-2.9997048,-2.9974895,-2.9952707,-2.9930487,-2.9908235,-2.9885948,-2.9863627,-2.9841275,-2.9818888,-2.979647,-2.9774015,-2.9751525,-2.9729004,-2.9706447,-2.9683857,-2.9661233,-2.9638572,-2.961588,-2.959315,-2.9570386,-2.9547586,-2.9524753,-2.9501882,-2.947898,-2.9456036,-2.943306,-2.9410048,-2.9387,-2.9363914,-2.9340794,-2.9317634,-2.929444,-2.927121,-2.9247942,-2.9224637,-2.9201293,-2.9177914,-2.9154496,-2.9131043,-2.910755,-2.9084017,-2.906045,-2.9036841,-2.9013197,-2.8989513,-2.896579,-2.8942027,-2.8918226,-2.8894386,-2.8870506,-2.8846588,-2.882263,-2.879863,-2.877459,-2.8750513,-2.8726392,-2.8702233,-2.867803,-2.8653789,-2.8629506,-2.8605182,-2.8580816,-2.855641,-2.853196,-2.8507469,-2.8482935,-2.8458362,-2.8433743,-2.8409083,-2.8384378,-2.8359632,-2.8334842,-2.8310008,-2.8285131,-2.8260212,-2.8235247,-2.8210237,-2.8185184,-2.8160086,-2.8134942,-2.8109753,-2.8084521,-2.8059242,-2.8033917,-2.8008547,-2.7983131,-2.795767,-2.7932162,-2.7906606,-2.7881002,-2.7855353,-2.7829657,-2.7803912,-2.777812,-2.775228,-2.7726393,-2.7700455,-2.767447,-2.7648435,-2.7622352,-2.7596219,-2.7570035,-2.7543805,-2.7517521,-2.7491188,-2.7464807,-2.743837,-2.7411888,-2.7385352,-2.7358763,-2.7332125,-2.7305434,-2.7278688,-2.7251892,-2.7225044,-2.719814,-2.7171185,-2.7144177],"x":[-50.0,-49.940239043824704,-49.8804780876494,-49.820717131474105,-49.7609561752988,-49.701195219123505,-49.64143426294821,-49.581673306772906,-49.52191235059761,-49.462151394422314,-49.40239043824701,-49.342629482071715,-49.28286852589641,-49.223107569721115,-49.16334661354582,-49.103585657370516,-49.04382470119522,-48.98406374501992,-48.92430278884462,-48.864541832669325,-48.80478087649402,-48.745019920318725,-48.68525896414343,-48.625498007968126,-48.56573705179283,-48.50597609561753,-48.44621513944223,-48.386454183266935,-48.32669322709163,-48.266932270916335,-48.20717131474104,-48.147410358565736,-48.08764940239044,-48.02788844621514,-47.96812749003984,-47.908366533864545,-47.84860557768924,-47.788844621513945,-47.72908366533864,-47.669322709163346,-47.60956175298805,-47.54980079681275,-47.49003984063745,-47.430278884462155,-47.37051792828685,-47.310756972111555,-47.25099601593625,-47.191235059760956,-47.13147410358566,-47.07171314741036,-47.01195219123506,-46.95219123505976,-46.89243027888446,-46.832669322709165,-46.77290836653386,-46.713147410358566,-46.65338645418327,-46.59362549800797,-46.53386454183267,-46.47410358565737,-46.41434262948207,-46.354581673306775,-46.29482071713147,-46.235059760956176,-46.17529880478088,-46.11553784860558,-46.05577689243028,-45.99601593625498,-45.93625498007968,-45.876494023904385,-45.81673306772908,-45.756972111553786,-45.69721115537848,-45.63745019920319,-45.57768924302789,-45.51792828685259,-45.45816733067729,-45.398406374501995,-45.33864541832669,-45.278884462151396,-45.21912350597609,-45.1593625498008,-45.0996015936255,-45.0398406374502,-44.9800796812749,-44.9203187250996,-44.8605577689243,-44.800796812749006,-44.7410358565737,-44.68127490039841,-44.62151394422311,-44.56175298804781,-44.50199203187251,-44.44223107569721,-44.38247011952191,-44.322709163346616,-44.26294820717131,-44.20318725099602,-44.14342629482072,-44.08366533864542,-44.02390438247012,-43.96414342629482,-43.90438247011952,-43.844621513944226,-43.78486055776892,-43.72509960159363,-43.66533864541832,-43.60557768924303,-43.54581673306773,-43.48605577689243,-43.42629482071713,-43.366533864541836,-43.30677290836653,-43.24701195219124,-43.18725099601593,-43.12749003984064,-43.06772908366534,-43.00796812749004,-42.94820717131474,-42.88844621513944,-42.82868525896414,-42.76892430278885,-42.70916334661354,-42.64940239043825,-42.58964143426295,-42.52988047808765,-42.47011952191235,-42.41035856573705,-42.35059760956175,-42.29083665338646,-42.23107569721115,-42.17131474103586,-42.11155378486056,-42.05179282868526,-41.99203187250996,-41.93227091633466,-41.87250996015936,-41.81274900398407,-41.75298804780876,-41.69322709163347,-41.633466135458164,-41.57370517928287,-41.51394422310757,-41.45418326693227,-41.39442231075697,-41.33466135458168,-41.27490039840637,-41.21513944223108,-41.155378486055774,-41.09561752988048,-41.03585657370518,-40.97609561752988,-40.91633466135458,-40.85657370517928,-40.79681274900398,-40.73705179282869,-40.677290836653384,-40.61752988047809,-40.55776892430279,-40.49800796812749,-40.43824701195219,-40.37848605577689,-40.31872509960159,-40.2589641434263,-40.199203187250994,-40.1394422310757,-40.0796812749004,-40.0199203187251,-39.9601593625498,-39.9003984063745,-39.8406374501992,-39.78087649402391,-39.721115537848604,-39.66135458167331,-39.601593625498005,-39.54183266932271,-39.48207171314741,-39.42231075697211,-39.36254980079681,-39.30278884462152,-39.243027888446214,-39.18326693227092,-39.123505976095615,-39.06374501992032,-39.00398406374502,-38.94422310756972,-38.88446215139442,-38.82470119521912,-38.764940239043824,-38.70517928286853,-38.645418326693225,-38.58565737051793,-38.52589641434263,-38.46613545816733,-38.40637450199203,-38.34661354581673,-38.286852589641434,-38.22709163346614,-38.167330677290835,-38.10756972111554,-38.04780876494024,-37.98804780876494,-37.92828685258964,-37.86852589641434,-37.808764940239044,-37.74900398406375,-37.689243027888445,-37.62948207171315,-37.569721115537845,-37.50996015936255,-37.45019920318725,-37.39043824701195,-37.330677290836654,-37.27091633466136,-37.211155378486055,-37.15139442231076,-37.091633466135455,-37.03187250996016,-36.97211155378486,-36.91235059760956,-36.852589641434264,-36.79282868525896,-36.733067729083665,-36.67330677290837,-36.613545816733065,-36.55378486055777,-36.49402390438247,-36.43426294820717,-36.374501992031874,-36.31474103585657,-36.254980079681275,-36.19521912350598,-36.135458167330675,-36.07569721115538,-36.01593625498008,-35.95617529880478,-35.896414342629484,-35.83665338645418,-35.776892430278885,-35.71713147410359,-35.657370517928285,-35.59760956175299,-35.537848605577686,-35.47808764940239,-35.418326693227094,-35.35856573705179,-35.298804780876495,-35.2390438247012,-35.179282868525895,-35.1195219123506,-35.059760956175296,-35.0,-34.940239043824704,-34.8804780876494,-34.820717131474105,-34.7609561752988,-34.701195219123505,-34.64143426294821,-34.581673306772906,-34.52191235059761,-34.462151394422314,-34.40239043824701,-34.342629482071715,-34.28286852589641,-34.223107569721115,-34.16334661354582,-34.103585657370516,-34.04382470119522,-33.98406374501992,-33.92430278884462,-33.864541832669325,-33.80478087649402,-33.745019920318725,-33.68525896414343,-33.625498007968126,-33.56573705179283,-33.50597609561753,-33.44621513944223,-33.386454183266935,-33.32669322709163,-33.266932270916335,-33.20717131474104,-33.147410358565736,-33.08764940239044,-33.02788844621514,-32.96812749003984,-32.908366533864545,-32.84860557768924,-32.788844621513945,-32.72908366533864,-32.669322709163346,-32.60956175298805,-32.54980079681275,-32.49003984063745,-32.430278884462155,-32.37051792828685,-32.310756972111555,-32.25099601593625,-32.191235059760956,-32.13147410358566,-32.07171314741036,-32.01195219123506,-31.95219123505976,-31.89243027888446,-31.83266932270916,-31.772908366533866,-31.713147410358566,-31.653386454183266,-31.593625498007967,-31.53386454183267,-31.47410358565737,-31.41434262948207,-31.35458167330677,-31.294820717131476,-31.235059760956176,-31.175298804780876,-31.115537848605577,-31.05577689243028,-30.99601593625498,-30.93625498007968,-30.87649402390438,-30.816733067729082,-30.756972111553786,-30.697211155378486,-30.637450199203187,-30.577689243027887,-30.51792828685259,-30.45816733067729,-30.39840637450199,-30.338645418326692,-30.278884462151396,-30.219123505976096,-30.159362549800797,-30.099601593625497,-30.0398406374502,-29.9800796812749,-29.9203187250996,-29.860557768924302,-29.800796812749002,-29.741035856573706,-29.681274900398407,-29.621513944223107,-29.561752988047807,-29.50199203187251,-29.44223107569721,-29.382470119521912,-29.322709163346612,-29.262948207171316,-29.203187250996017,-29.143426294820717,-29.083665338645417,-29.02390438247012,-28.96414342629482,-28.904382470119522,-28.844621513944222,-28.784860557768923,-28.725099601593627,-28.665338645418327,-28.605577689243027,-28.545816733067728,-28.48605577689243,-28.426294820717132,-28.366533864541832,-28.306772908366533,-28.247011952191237,-28.187250996015937,-28.127490039840637,-28.067729083665338,-28.00796812749004,-27.948207171314742,-27.888446215139442,-27.828685258964143,-27.768924302788843,-27.709163346613547,-27.649402390438247,-27.589641434262948,-27.529880478087648,-27.470119521912352,-27.410358565737052,-27.350597609561753,-27.290836653386453,-27.231075697211157,-27.171314741035857,-27.111553784860558,-27.051792828685258,-26.99203187250996,-26.932270916334662,-26.872509960159363,-26.812749003984063,-26.752988047808763,-26.693227091633467,-26.633466135458168,-26.573705179282868,-26.51394422310757,-26.454183266932272,-26.394422310756973,-26.334661354581673,-26.274900398406373,-26.215139442231077,-26.155378486055778,-26.095617529880478,-26.03585657370518,-25.97609561752988,-25.916334661354583,-25.856573705179283,-25.796812749003983,-25.737051792828684,-25.677290836653388,-25.617529880478088,-25.55776892430279,-25.49800796812749,-25.438247011952193,-25.378486055776893,-25.318725099601593,-25.258964143426294,-25.199203187250998,-25.139442231075698,-25.0796812749004,-25.0199203187251,-24.9601593625498,-24.900398406374503,-24.840637450199203,-24.780876494023904,-24.721115537848604,-24.661354581673308,-24.60159362549801,-24.54183266932271,-24.48207171314741,-24.422310756972113,-24.362549800796813,-24.302788844621514,-24.243027888446214,-24.183266932270918,-24.12350597609562,-24.06374501992032,-24.00398406374502,-23.94422310756972,-23.884462151394423,-23.824701195219124,-23.764940239043824,-23.705179282868524,-23.64541832669323,-23.58565737051793,-23.52589641434263,-23.46613545816733,-23.406374501992033,-23.346613545816734,-23.286852589641434,-23.227091633466134,-23.16733067729084,-23.10756972111554,-23.04780876494024,-22.98804780876494,-22.92828685258964,-22.868525896414344,-22.808764940239044,-22.749003984063744,-22.689243027888445,-22.62948207171315,-22.56972111553785,-22.50996015936255,-22.45019920318725,-22.390438247011954,-22.330677290836654,-22.270916334661354,-22.211155378486055,-22.15139442231076,-22.09163346613546,-22.03187250996016,-21.97211155378486,-21.91235059760956,-21.852589641434264,-21.792828685258964,-21.733067729083665,-21.673306772908365,-21.61354581673307,-21.55378486055777,-21.49402390438247,-21.43426294820717,-21.374501992031874,-21.314741035856574,-21.254980079681275,-21.195219123505975,-21.13545816733068,-21.07569721115538,-21.01593625498008,-20.95617529880478,-20.89641434262948,-20.836653386454184,-20.776892430278885,-20.717131474103585,-20.657370517928285,-20.59760956175299,-20.53784860557769,-20.47808764940239,-20.41832669322709,-20.358565737051794,-20.298804780876495,-20.239043824701195,-20.179282868525895,-20.1195219123506,-20.0597609561753,-20.0]}
},{}],97:[function(require,module,exports){
module.exports={"expected":[2.7144177,2.7171185,2.719814,2.7225044,2.7251892,2.7278688,2.7305434,2.7332125,2.7358763,2.7385352,2.7411888,2.743837,2.7464807,2.7491188,2.7517521,2.7543805,2.7570035,2.7596219,2.7622352,2.7648435,2.767447,2.7700455,2.7726393,2.775228,2.777812,2.7803912,2.7829657,2.7855353,2.7881002,2.7906606,2.7932162,2.795767,2.7983131,2.8008547,2.8033917,2.8059242,2.8084521,2.8109753,2.8134942,2.8160086,2.8185184,2.8210237,2.8235247,2.8260212,2.8285131,2.8310008,2.8334842,2.8359632,2.8384378,2.8409083,2.8433743,2.8458362,2.8482935,2.8507469,2.853196,2.855641,2.8580816,2.8605182,2.8629506,2.8653789,2.867803,2.8702233,2.8726392,2.8750513,2.877459,2.879863,2.882263,2.8846588,2.8870506,2.8894386,2.8918226,2.8942027,2.896579,2.8989513,2.9013197,2.9036841,2.906045,2.9084017,2.910755,2.9131043,2.9154496,2.9177914,2.9201293,2.9224637,2.9247942,2.927121,2.929444,2.9317634,2.9340794,2.9363914,2.9387,2.9410048,2.943306,2.9456036,2.947898,2.9501882,2.9524753,2.9547586,2.9570386,2.959315,2.961588,2.9638572,2.9661233,2.9683857,2.9706447,2.9729004,2.9751525,2.9774015,2.979647,2.9818888,2.9841275,2.9863627,2.9885948,2.9908235,2.9930487,2.9952707,2.9974895,2.9997048,3.001917,3.0041258,3.0063317,3.008534,3.0107334,3.0129292,3.0151222,3.0173118,3.019498,3.0216815,3.0238616,3.0260386,3.0282125,3.0303833,3.032551,3.0347157,3.036877,3.0390353,3.0411906,3.043343,3.0454922,3.0476384,3.0497818,3.0519218,3.054059,3.0561934,3.0583246,3.060453,3.0625782,3.0647006,3.06682,3.0689366,3.0710502,3.073161,3.0752685,3.0773735,3.0794754,3.0815747,3.083671,3.0857644,3.087855,3.089943,3.092028,3.09411,3.0961893,3.098266,3.1003397,3.1024108,3.104479,3.1065445,3.1086073,3.1106675,3.1127248,3.1147795,3.1168313,3.1188805,3.120927,3.1229708,3.125012,3.1270504,3.1290863,3.1311195,3.13315,3.1351779,3.1372032,3.139226,3.141246,3.1432636,3.1452785,3.1472907,3.1493006,3.1513078,3.1533124,3.1553144,3.157314,3.159311,3.1613057,3.1632977,3.1652873,3.1672742,3.1692586,3.1712406,3.1732202,3.1751974,3.177172,3.1791441,3.1811137,3.1830812,3.185046,3.1870084,3.1889684,3.190926,3.1928813,3.1948342,3.1967847,3.1987326,3.2006783,3.2026217,3.2045627,3.2065015,3.2084377,3.2103717,3.2123032,3.2142327,3.2161596,3.2180843,3.2200067,3.2219267,3.2238445,3.2257602,3.2276733,3.2295845,3.2314932,3.2333994,3.2353036,3.2372057,3.2391055,3.241003,3.2428985,3.2447915,3.2466824,3.2485712,3.2504575,3.252342,3.254224,3.256104,3.2579818,3.2598574,3.261731,3.2636023,3.2654715,3.2673385,3.2692034,3.2710664,3.272927,3.2747855,3.276642,3.2784963,3.2803485,3.282199,3.284047,3.285893,3.287737,3.2895787,3.2914186,3.2932563,3.295092,3.2969255,3.2987573,3.300587,3.3024144,3.30424,3.3060637,3.3078852,3.3097045,3.311522,3.3133376,3.315151,3.3169627,3.3187723,3.3205798,3.3223855,3.3241892,3.325991,3.3277907,3.3295884,3.3313844,3.3331783,3.3349705,3.3367605,3.3385487,3.340335,3.3421195,3.3439019,3.3456824,3.347461,3.349238,3.3510127,3.3527858,3.354557,3.356326,3.3580937,3.3598592,3.3616228,3.3633847,3.3651447,3.366903,3.3686593,3.3704138,3.3721664,3.3739173,3.3756664,3.3774137,3.3791592,3.3809028,3.3826447,3.3843846,3.3861227,3.3878593,3.3895938,3.391327,3.393058,3.3947873,3.3965151,3.3982408,3.399965,3.4016874,3.403408,3.405127,3.4068441,3.4085596,3.4102733,3.4119852,3.4136956,3.415404,3.417111,3.418816,3.4205196,3.4222212,3.4239213,3.4256196,3.4273164,3.4290113,3.4307048,3.4323964,3.4340866,3.4357748,3.4374614,3.4391465,3.44083,3.4425116,3.4441917,3.4458702,3.447547,3.449222,3.4508958,3.4525678,3.454238,3.4559066,3.457574,3.4592392,3.4609032,3.4625654,3.4642262,3.4658854,3.467543,3.4691987,3.470853,3.4725058,3.474157,3.4758067,3.477455,3.4791014,3.4807463,3.4823897,3.4840317,3.485672,3.4873106,3.4889479,3.4905837,3.4922178,3.4938505,3.4954817,3.4971113,3.4987392,3.500366,3.501991,3.5036144,3.5052366,3.5068572,3.508476,3.5100937,3.5117097,3.5133243,3.5149374,3.516549,3.5181592,3.5197678,3.521375,3.5229807,3.524585,3.526188,3.527789,3.5293891,3.5309875,3.5325844,3.5341802,3.5357742,3.5373669,3.538958,3.540548,3.5421364,3.5437233,3.545309,3.5468931,3.5484757,3.5500572,3.5516372,3.5532155,3.5547926,3.5563684,3.5579426,3.5595157,3.5610871,3.5626574,3.5642262,3.5657935,3.5673594,3.5689242,3.5704873,3.5720491,3.5736098,3.5751688,3.5767267,3.5782833,3.5798383,3.581392,3.5829444,3.5844955,3.5860453,3.5875936,3.5891407,3.5906863,3.5922306,3.5937738,3.5953155,3.5968559,3.5983949,3.5999327,3.6014693,3.6030045,3.6045382,3.6060708,3.6076021,3.609132,3.6106606,3.6121879,3.613714,3.615239,3.6167622,3.6182845,3.6198053,3.621325,3.6228435,3.6243606,3.6258764,3.6273909,3.6289043,3.6304164,3.631927,3.6334367,3.634945,3.636452,3.6379578,3.6394622,3.6409655,3.6424675,3.6439683,3.645468,3.6469662,3.6484635,3.6499593,3.651454,3.6529474,3.6544394,3.6559305,3.6574204,3.6589088,3.6603963,3.6618824,3.6633675,3.6648512,3.6663337,3.667815,3.6692953,3.6707742,3.672252,3.6737285,3.6752038,3.6766782,3.6781511,3.679623,3.6810937,3.682563,3.6840315],"x":[20.0,20.0597609561753,20.1195219123506,20.179282868525895,20.239043824701195,20.298804780876495,20.358565737051794,20.41832669322709,20.47808764940239,20.53784860557769,20.59760956175299,20.657370517928285,20.717131474103585,20.776892430278885,20.836653386454184,20.89641434262948,20.95617529880478,21.01593625498008,21.07569721115538,21.13545816733068,21.195219123505975,21.254980079681275,21.314741035856574,21.374501992031874,21.43426294820717,21.49402390438247,21.55378486055777,21.61354581673307,21.673306772908365,21.733067729083665,21.792828685258964,21.852589641434264,21.91235059760956,21.97211155378486,22.03187250996016,22.09163346613546,22.15139442231076,22.211155378486055,22.270916334661354,22.330677290836654,22.390438247011954,22.45019920318725,22.50996015936255,22.56972111553785,22.62948207171315,22.689243027888445,22.749003984063744,22.808764940239044,22.868525896414344,22.92828685258964,22.98804780876494,23.04780876494024,23.10756972111554,23.16733067729084,23.227091633466134,23.286852589641434,23.346613545816734,23.406374501992033,23.46613545816733,23.52589641434263,23.58565737051793,23.64541832669323,23.705179282868524,23.764940239043824,23.824701195219124,23.884462151394423,23.94422310756972,24.00398406374502,24.06374501992032,24.12350597609562,24.183266932270918,24.243027888446214,24.302788844621514,24.362549800796813,24.422310756972113,24.48207171314741,24.54183266932271,24.60159362549801,24.661354581673308,24.721115537848604,24.780876494023904,24.840637450199203,24.900398406374503,24.9601593625498,25.0199203187251,25.0796812749004,25.139442231075698,25.199203187250998,25.258964143426294,25.318725099601593,25.378486055776893,25.438247011952193,25.49800796812749,25.55776892430279,25.617529880478088,25.677290836653388,25.737051792828684,25.796812749003983,25.856573705179283,25.916334661354583,25.97609561752988,26.03585657370518,26.095617529880478,26.155378486055778,26.215139442231077,26.274900398406373,26.334661354581673,26.394422310756973,26.454183266932272,26.51394422310757,26.573705179282868,26.633466135458168,26.693227091633467,26.752988047808763,26.812749003984063,26.872509960159363,26.932270916334662,26.99203187250996,27.051792828685258,27.111553784860558,27.171314741035857,27.231075697211157,27.290836653386453,27.350597609561753,27.410358565737052,27.470119521912352,27.529880478087648,27.589641434262948,27.649402390438247,27.709163346613547,27.768924302788843,27.828685258964143,27.888446215139442,27.948207171314742,28.00796812749004,28.067729083665338,28.127490039840637,28.187250996015937,28.247011952191237,28.306772908366533,28.366533864541832,28.426294820717132,28.48605577689243,28.545816733067728,28.605577689243027,28.665338645418327,28.725099601593627,28.784860557768923,28.844621513944222,28.904382470119522,28.96414342629482,29.02390438247012,29.083665338645417,29.143426294820717,29.203187250996017,29.262948207171316,29.322709163346612,29.382470119521912,29.44223107569721,29.50199203187251,29.561752988047807,29.621513944223107,29.681274900398407,29.741035856573706,29.800796812749002,29.860557768924302,29.9203187250996,29.9800796812749,30.0398406374502,30.099601593625497,30.159362549800797,30.219123505976096,30.278884462151396,30.338645418326692,30.39840637450199,30.45816733067729,30.51792828685259,30.577689243027887,30.637450199203187,30.697211155378486,30.756972111553786,30.816733067729082,30.87649402390438,30.93625498007968,30.99601593625498,31.05577689243028,31.115537848605577,31.175298804780876,31.235059760956176,31.294820717131476,31.35458167330677,31.41434262948207,31.47410358565737,31.53386454183267,31.593625498007967,31.653386454183266,31.713147410358566,31.772908366533866,31.83266932270916,31.89243027888446,31.95219123505976,32.01195219123506,32.07171314741036,32.13147410358566,32.191235059760956,32.25099601593625,32.310756972111555,32.37051792828685,32.430278884462155,32.49003984063745,32.54980079681275,32.60956175298805,32.669322709163346,32.72908366533864,32.788844621513945,32.84860557768924,32.908366533864545,32.96812749003984,33.02788844621514,33.08764940239044,33.147410358565736,33.20717131474104,33.266932270916335,33.32669322709163,33.386454183266935,33.44621513944223,33.50597609561753,33.56573705179283,33.625498007968126,33.68525896414343,33.745019920318725,33.80478087649402,33.864541832669325,33.92430278884462,33.98406374501992,34.04382470119522,34.103585657370516,34.16334661354582,34.223107569721115,34.28286852589641,34.342629482071715,34.40239043824701,34.462151394422314,34.52191235059761,34.581673306772906,34.64143426294821,34.701195219123505,34.7609561752988,34.820717131474105,34.8804780876494,34.940239043824704,35.0,35.059760956175296,35.1195219123506,35.179282868525895,35.2390438247012,35.298804780876495,35.35856573705179,35.418326693227094,35.47808764940239,35.537848605577686,35.59760956175299,35.657370517928285,35.71713147410359,35.776892430278885,35.83665338645418,35.896414342629484,35.95617529880478,36.01593625498008,36.07569721115538,36.135458167330675,36.19521912350598,36.254980079681275,36.31474103585657,36.374501992031874,36.43426294820717,36.49402390438247,36.55378486055777,36.613545816733065,36.67330677290837,36.733067729083665,36.79282868525896,36.852589641434264,36.91235059760956,36.97211155378486,37.03187250996016,37.091633466135455,37.15139442231076,37.211155378486055,37.27091633466136,37.330677290836654,37.39043824701195,37.45019920318725,37.50996015936255,37.569721115537845,37.62948207171315,37.689243027888445,37.74900398406375,37.808764940239044,37.86852589641434,37.92828685258964,37.98804780876494,38.04780876494024,38.10756972111554,38.167330677290835,38.22709163346614,38.286852589641434,38.34661354581673,38.40637450199203,38.46613545816733,38.52589641434263,38.58565737051793,38.645418326693225,38.70517928286853,38.764940239043824,38.82470119521912,38.88446215139442,38.94422310756972,39.00398406374502,39.06374501992032,39.123505976095615,39.18326693227092,39.243027888446214,39.30278884462152,39.36254980079681,39.42231075697211,39.48207171314741,39.54183266932271,39.601593625498005,39.66135458167331,39.721115537848604,39.78087649402391,39.8406374501992,39.9003984063745,39.9601593625498,40.0199203187251,40.0796812749004,40.1394422310757,40.199203187250994,40.2589641434263,40.31872509960159,40.37848605577689,40.43824701195219,40.49800796812749,40.55776892430279,40.61752988047809,40.677290836653384,40.73705179282869,40.79681274900398,40.85657370517928,40.91633466135458,40.97609561752988,41.03585657370518,41.09561752988048,41.155378486055774,41.21513944223108,41.27490039840637,41.33466135458168,41.39442231075697,41.45418326693227,41.51394422310757,41.57370517928287,41.633466135458164,41.69322709163347,41.75298804780876,41.81274900398407,41.87250996015936,41.93227091633466,41.99203187250996,42.05179282868526,42.11155378486056,42.17131474103586,42.23107569721115,42.29083665338646,42.35059760956175,42.41035856573705,42.47011952191235,42.52988047808765,42.58964143426295,42.64940239043825,42.70916334661354,42.76892430278885,42.82868525896414,42.88844621513944,42.94820717131474,43.00796812749004,43.06772908366534,43.12749003984064,43.18725099601593,43.24701195219124,43.30677290836653,43.366533864541836,43.42629482071713,43.48605577689243,43.54581673306773,43.60557768924303,43.66533864541832,43.72509960159363,43.78486055776892,43.844621513944226,43.90438247011952,43.96414342629482,44.02390438247012,44.08366533864542,44.14342629482072,44.20318725099602,44.26294820717131,44.322709163346616,44.38247011952191,44.44223107569721,44.50199203187251,44.56175298804781,44.62151394422311,44.68127490039841,44.7410358565737,44.800796812749006,44.8605577689243,44.9203187250996,44.9800796812749,45.0398406374502,45.0996015936255,45.1593625498008,45.21912350597609,45.278884462151396,45.33864541832669,45.398406374501995,45.45816733067729,45.51792828685259,45.57768924302789,45.63745019920319,45.69721115537848,45.756972111553786,45.81673306772908,45.876494023904385,45.93625498007968,45.99601593625498,46.05577689243028,46.11553784860558,46.17529880478088,46.235059760956176,46.29482071713147,46.354581673306775,46.41434262948207,46.47410358565737,46.53386454183267,46.59362549800797,46.65338645418327,46.713147410358566,46.77290836653386,46.832669322709165,46.89243027888446,46.95219123505976,47.01195219123506,47.07171314741036,47.13147410358566,47.191235059760956,47.25099601593625,47.310756972111555,47.37051792828685,47.430278884462155,47.49003984063745,47.54980079681275,47.60956175298805,47.669322709163346,47.72908366533864,47.788844621513945,47.84860557768924,47.908366533864545,47.96812749003984,48.02788844621514,48.08764940239044,48.147410358565736,48.20717131474104,48.266932270916335,48.32669322709163,48.386454183266935,48.44621513944223,48.50597609561753,48.56573705179283,48.625498007968126,48.68525896414343,48.745019920318725,48.80478087649402,48.864541832669325,48.92430278884462,48.98406374501992,49.04382470119522,49.103585657370516,49.16334661354582,49.223107569721115,49.28286852589641,49.342629482071715,49.40239043824701,49.462151394422314,49.52191235059761,49.581673306772906,49.64143426294821,49.701195219123505,49.7609561752988,49.820717131474105,49.8804780876494,49.940239043824704,50.0]}
},{}],98:[function(require,module,exports){
module.exports={"expected":[-1.4422495,-1.447656,-1.4530225,-1.4583496,-1.463638,-1.4688885,-1.4741017,-1.4792783,-1.4844189,-1.4895242,-1.4945947,-1.499631,-1.5046338,-1.5096034,-1.5145407,-1.5194458,-1.5243195,-1.5291623,-1.5339745,-1.5387568,-1.5435096,-1.5482333,-1.5529282,-1.557595,-1.5622339,-1.5668455,-1.5714302,-1.5759882,-1.5805199,-1.5850259,-1.5895064,-1.5939617,-1.5983924,-1.6027985,-1.6071805,-1.6115389,-1.6158737,-1.6201854,-1.6244743,-1.6287407,-1.6329849,-1.637207,-1.6414075,-1.6455866,-1.6497446,-1.6538818,-1.6579983,-1.6620946,-1.6661707,-1.6702269,-1.6742637,-1.678281,-1.6822791,-1.6862584,-1.6902189,-1.694161,-1.6980848,-1.7019906,-1.7058785,-1.7097489,-1.7136016,-1.7174373,-1.7212558,-1.7250575,-1.7288425,-1.732611,-1.736363,-1.7400991,-1.7438191,-1.7475234,-1.751212,-1.7548852,-1.758543,-1.7621856,-1.7658132,-1.7694261,-1.7730242,-1.7766078,-1.780177,-1.7837319,-1.7872727,-1.7907995,-1.7943126,-1.7978119,-1.8012975,-1.8047699,-1.8082289,-1.8116746,-1.8151073,-1.8185272,-1.8219342,-1.8253285,-1.8287102,-1.8320795,-1.8354363,-1.838781,-1.8421136,-1.8454342,-1.8487427,-1.8520396,-1.8553247,-1.8585982,-1.8618603,-1.865111,-1.8683504,-1.8715786,-1.8747957,-1.8780017,-1.8811969,-1.8843812,-1.8875548,-1.8907177,-1.8938702,-1.8970122,-1.9001439,-1.9032651,-1.9063762,-1.9094772,-1.9125682,-1.9156492,-1.9187202,-1.9217817,-1.9248332,-1.9278752,-1.9309075,-1.9339304,-1.9369439,-1.939948,-1.9429429,-1.9459285,-1.948905,-1.9518723,-1.9548309,-1.9577804,-1.960721,-1.9636528,-1.966576,-1.9694905,-1.9723964,-1.9752936,-1.9781826,-1.981063,-1.983935,-1.9867989,-1.9896544,-1.9925017,-1.9953411,-1.9981723,-2.0009956,-2.003811,-2.0066183,-2.0094178,-2.0122094,-2.0149937,-2.0177698,-2.0205388,-2.0233,-2.0260537,-2.0287998,-2.0315385,-2.03427,-2.0369942,-2.039711,-2.0424206,-2.045123,-2.0478184,-2.0505066,-2.0531878,-2.0558622,-2.0585294,-2.06119,-2.0638433,-2.0664902,-2.0691302,-2.0717635,-2.07439,-2.07701,-2.0796235,-2.08223,-2.0848305,-2.0874243,-2.0900116,-2.0925927,-2.0951674,-2.0977356,-2.1002977,-2.1028538,-2.1054032,-2.1079469,-2.1104841,-2.1130154,-2.1155405,-2.1180599,-2.120573,-2.1230803,-2.1255817,-2.1280773,-2.1305668,-2.1330507,-2.1355288,-2.1380012,-2.140468,-2.1429288,-2.145384,-2.1478338,-2.150278,-2.1527166,-2.1551497,-2.1575773,-2.1599996,-2.1624162,-2.1648276,-2.1672337,-2.1696343,-2.1720297,-2.1744196,-2.1768045,-2.1791842,-2.1815586,-2.183928,-2.1862922,-2.1886513,-2.1910052,-2.1933541,-2.195698,-2.198037,-2.2003708,-2.2027,-2.205024,-2.2073433,-2.2096577,-2.211967,-2.2142718,-2.2165718,-2.2188668,-2.2211573,-2.223443,-2.225724,-2.2280004,-2.230272,-2.2325392,-2.2348015,-2.2370596,-2.239313,-2.2415617,-2.2438061,-2.2460458,-2.2482812,-2.2505121,-2.2527387,-2.254961,-2.2571788,-2.2593923,-2.2616012,-2.263806,-2.2660065,-2.2682028,-2.2703948,-2.2725825,-2.2747662,-2.2769456,-2.2791207,-2.2812917,-2.2834587,-2.2856216,-2.2877805,-2.289935,-2.292086,-2.2942324,-2.296375,-2.2985137,-2.3006482,-2.302779,-2.3049057,-2.3070285,-2.3091476,-2.3112626,-2.3133738,-2.3154812,-2.3175845,-2.3196843,-2.3217802,-2.3238723,-2.3259606,-2.3280454,-2.3301263,-2.3322036,-2.3342772,-2.3363469,-2.338413,-2.3404756,-2.3425345,-2.3445897,-2.3466413,-2.3486896,-2.350734,-2.352775,-2.3548124,-2.3568463,-2.3588767,-2.3609037,-2.3629272,-2.3649473,-2.3669639,-2.3689768,-2.3709867,-2.372993,-2.374996,-2.3769953,-2.3789916,-2.3809845,-2.382974,-2.3849602,-2.386943,-2.3889227,-2.390899,-2.392872,-2.394842,-2.3968086,-2.3987718,-2.400732,-2.402689,-2.4046428,-2.4065933,-2.408541,-2.410485,-2.4124262,-2.4143643,-2.4162993,-2.4182312,-2.42016,-2.4220858,-2.4240084,-2.4259279,-2.4278445,-2.429758,-2.4316685,-2.433576,-2.4354806,-2.4373822,-2.439281,-2.4411767,-2.4430692,-2.4449592,-2.446846,-2.44873,-2.450611,-2.4524891,-2.4543645,-2.456237,-2.4581068,-2.4599736,-2.4618373,-2.4636986,-2.4655569,-2.4674125,-2.4692652,-2.471115,-2.4729624,-2.4748068,-2.4766483,-2.4784875,-2.4803236,-2.4821572,-2.483988,-2.485816,-2.4876416,-2.4894643,-2.4912844,-2.4931018,-2.4949167,-2.4967287,-2.4985383,-2.5003452,-2.5021496,-2.5039513,-2.5057504,-2.507547,-2.5093408,-2.5111322,-2.512921,-2.5147076,-2.5164912,-2.5182724,-2.5200512,-2.5218275,-2.523601,-2.5253725,-2.527141,-2.5289075,-2.5306714,-2.5324326,-2.5341916,-2.535948,-2.537702,-2.5394537,-2.541203,-2.54295,-2.5446942,-2.5464363,-2.5481758,-2.5499132,-2.5516481,-2.5533805,-2.555111,-2.5568388,-2.5585642,-2.5602875,-2.5620084,-2.563727,-2.5654433,-2.5671573,-2.5688689,-2.5705783,-2.5722854,-2.5739903,-2.5756931,-2.5773935,-2.5790915,-2.5807874,-2.5824811,-2.5841727,-2.585862,-2.587549,-2.5892339,-2.5909164,-2.592597,-2.5942752,-2.5959516,-2.5976255,-2.5992973,-2.600967,-2.6026344,-2.6043,-2.6059632,-2.6076243,-2.6092834,-2.6109405,-2.6125953,-2.6142478,-2.6158986,-2.617547,-2.6191936,-2.620838,-2.6224804,-2.6241207,-2.6257591,-2.6273952,-2.6290295,-2.6306615,-2.6322918,-2.63392,-2.635546,-2.63717,-2.6387923,-2.6404123,-2.6420305,-2.6436465,-2.6452608,-2.646873,-2.6484833,-2.6500914,-2.6516979,-2.6533022,-2.6549048,-2.6565053,-2.658104,-2.6597006,-2.6612954,-2.662888,-2.6644793,-2.6660683,-2.6676555,-2.6692407,-2.670824,-2.6724055,-2.6739852,-2.675563,-2.677139,-2.678713,-2.6802852,-2.6818557,-2.6834242,-2.684991,-2.6865559,-2.688119,-2.6896803,-2.6912396,-2.6927972,-2.694353,-2.695907,-2.6974595,-2.69901,-2.7005587,-2.7021055,-2.7036507,-2.705194,-2.7067356,-2.7082756,-2.7098138,-2.71135,-2.7128847,-2.7144177],"x":[-3.0,-3.0338645418326693,-3.0677290836653386,-3.101593625498008,-3.135458167330677,-3.1693227091633465,-3.2031872509960158,-3.237051792828685,-3.270916334661355,-3.304780876494024,-3.3386454183266934,-3.3725099601593627,-3.406374501992032,-3.4402390438247012,-3.4741035856573705,-3.50796812749004,-3.541832669322709,-3.5756972111553784,-3.6095617529880477,-3.643426294820717,-3.6772908366533863,-3.7111553784860556,-3.745019920318725,-3.7788844621513946,-3.812749003984064,-3.846613545816733,-3.8804780876494025,-3.914342629482072,-3.948207171314741,-3.9820717131474104,-4.01593625498008,-4.049800796812749,-4.083665338645418,-4.117529880478088,-4.151394422310757,-4.185258964143427,-4.219123505976095,-4.252988047808765,-4.286852589641434,-4.320717131474104,-4.354581673306773,-4.388446215139442,-4.422310756972111,-4.456175298804781,-4.49003984063745,-4.5239043824701195,-4.557768924302789,-4.591633466135458,-4.625498007968128,-4.659362549800797,-4.693227091633466,-4.727091633466135,-4.760956175298805,-4.794820717131474,-4.828685258964144,-4.862549800796812,-4.896414342629482,-4.930278884462151,-4.964143426294821,-4.99800796812749,-5.031872509960159,-5.065737051792829,-5.099601593625498,-5.133466135458168,-5.1673306772908365,-5.201195219123506,-5.235059760956175,-5.268924302788845,-5.302788844621514,-5.336653386454183,-5.370517928286852,-5.404382470119522,-5.438247011952191,-5.472111553784861,-5.50597609561753,-5.539840637450199,-5.573705179282869,-5.607569721115538,-5.6414342629482075,-5.675298804780876,-5.709163346613546,-5.743027888446215,-5.776892430278885,-5.8107569721115535,-5.844621513944223,-5.878486055776892,-5.912350597609562,-5.946215139442231,-5.9800796812749,-6.01394422310757,-6.047808764940239,-6.081673306772909,-6.115537848605578,-6.149402390438247,-6.183266932270916,-6.217131474103586,-6.250996015936255,-6.2848605577689245,-6.318725099601593,-6.352589641434263,-6.386454183266932,-6.420318725099602,-6.4541832669322705,-6.48804780876494,-6.52191235059761,-6.555776892430279,-6.589641434262949,-6.623505976095617,-6.657370517928287,-6.691235059760956,-6.725099601593626,-6.758964143426295,-6.792828685258964,-6.826693227091633,-6.860557768924303,-6.894422310756972,-6.9282868525896415,-6.96215139442231,-6.99601593625498,-7.02988047808765,-7.063745019920319,-7.097609561752988,-7.131474103585657,-7.165338645418327,-7.199203187250996,-7.233067729083666,-7.266932270916334,-7.300796812749004,-7.334661354581673,-7.368525896414343,-7.402390438247012,-7.436254980079681,-7.47011952191235,-7.50398406374502,-7.53784860557769,-7.5717131474103585,-7.605577689243028,-7.639442231075697,-7.673306772908367,-7.707171314741036,-7.741035856573705,-7.774900398406374,-7.808764940239044,-7.842629482071713,-7.876494023904383,-7.910358565737051,-7.944223107569721,-7.97808764940239,-8.01195219123506,-8.04581673306773,-8.079681274900398,-8.113545816733067,-8.147410358565738,-8.181274900398407,-8.215139442231076,-8.249003984063744,-8.282868525896415,-8.316733067729084,-8.350597609561753,-8.384462151394422,-8.418326693227092,-8.452191235059761,-8.48605577689243,-8.5199203187251,-8.55378486055777,-8.587649402390438,-8.621513944223107,-8.655378486055778,-8.689243027888446,-8.723107569721115,-8.756972111553784,-8.790836653386455,-8.824701195219124,-8.858565737051793,-8.892430278884461,-8.926294820717132,-8.9601593625498,-8.99402390438247,-9.02788844621514,-9.06175298804781,-9.095617529880478,-9.129482071713147,-9.163346613545817,-9.197211155378486,-9.231075697211155,-9.264940239043824,-9.298804780876495,-9.332669322709163,-9.366533864541832,-9.400398406374501,-9.434262948207172,-9.46812749003984,-9.50199203187251,-9.53585657370518,-9.569721115537849,-9.603585657370518,-9.637450199203187,-9.671314741035857,-9.705179282868526,-9.739043824701195,-9.772908366533864,-9.806772908366534,-9.840637450199203,-9.874501992031872,-9.908366533864541,-9.942231075697212,-9.97609561752988,-10.00996015936255,-10.04382470119522,-10.077689243027889,-10.111553784860558,-10.145418326693227,-10.179282868525897,-10.213147410358566,-10.247011952191235,-10.280876494023904,-10.314741035856574,-10.348605577689243,-10.382470119521912,-10.41633466135458,-10.450199203187251,-10.48406374501992,-10.51792828685259,-10.55179282868526,-10.585657370517929,-10.619521912350598,-10.653386454183266,-10.687250996015937,-10.721115537848606,-10.754980079681275,-10.788844621513944,-10.822709163346614,-10.856573705179283,-10.890438247011952,-10.92430278884462,-10.958167330677291,-10.99203187250996,-11.025896414342629,-11.0597609561753,-11.093625498007968,-11.127490039840637,-11.161354581673306,-11.195219123505977,-11.229083665338646,-11.262948207171315,-11.296812749003983,-11.330677290836654,-11.364541832669323,-11.398406374501992,-11.43227091633466,-11.466135458167331,-11.5,-11.533864541832669,-11.56772908366534,-11.601593625498008,-11.635458167330677,-11.669322709163346,-11.703187250996017,-11.737051792828685,-11.770916334661354,-11.804780876494023,-11.838645418326694,-11.872509960159363,-11.906374501992032,-11.9402390438247,-11.974103585657371,-12.00796812749004,-12.041832669322709,-12.07569721115538,-12.109561752988048,-12.143426294820717,-12.177290836653386,-12.211155378486056,-12.245019920318725,-12.278884462151394,-12.312749003984063,-12.346613545816734,-12.380478087649402,-12.414342629482071,-12.44820717131474,-12.48207171314741,-12.51593625498008,-12.549800796812749,-12.58366533864542,-12.617529880478088,-12.651394422310757,-12.685258964143426,-12.719123505976096,-12.752988047808765,-12.786852589641434,-12.820717131474103,-12.854581673306773,-12.888446215139442,-12.922310756972111,-12.95617529880478,-12.99003984063745,-13.02390438247012,-13.057768924302788,-13.091633466135459,-13.125498007968128,-13.159362549800797,-13.193227091633466,-13.227091633466136,-13.260956175298805,-13.294820717131474,-13.328685258964143,-13.362549800796813,-13.396414342629482,-13.430278884462151,-13.46414342629482,-13.49800796812749,-13.53187250996016,-13.565737051792828,-13.599601593625499,-13.633466135458168,-13.667330677290837,-13.701195219123505,-13.735059760956176,-13.768924302788845,-13.802788844621514,-13.836653386454183,-13.870517928286853,-13.904382470119522,-13.93824701195219,-13.97211155378486,-14.00597609561753,-14.0398406374502,-14.073705179282868,-14.107569721115539,-14.141434262948207,-14.175298804780876,-14.209163346613545,-14.243027888446216,-14.276892430278885,-14.310756972111554,-14.344621513944222,-14.378486055776893,-14.412350597609562,-14.44621513944223,-14.4800796812749,-14.51394422310757,-14.547808764940239,-14.581673306772908,-14.615537848605578,-14.649402390438247,-14.683266932270916,-14.717131474103585,-14.750996015936256,-14.784860557768924,-14.818725099601593,-14.852589641434262,-14.886454183266933,-14.920318725099602,-14.95418326693227,-14.98804780876494,-15.02191235059761,-15.055776892430279,-15.089641434262948,-15.123505976095618,-15.157370517928287,-15.191235059760956,-15.225099601593625,-15.258964143426295,-15.292828685258964,-15.326693227091633,-15.360557768924302,-15.394422310756973,-15.428286852589641,-15.46215139442231,-15.49601593625498,-15.52988047808765,-15.563745019920319,-15.597609561752988,-15.631474103585658,-15.665338645418327,-15.699203187250996,-15.733067729083665,-15.766932270916335,-15.800796812749004,-15.834661354581673,-15.868525896414342,-15.902390438247012,-15.936254980079681,-15.97011952191235,-16.00398406374502,-16.03784860557769,-16.07171314741036,-16.105577689243027,-16.139442231075698,-16.173306772908365,-16.207171314741036,-16.241035856573706,-16.274900398406373,-16.308764940239044,-16.342629482071715,-16.37649402390438,-16.410358565737052,-16.44422310756972,-16.47808764940239,-16.51195219123506,-16.545816733067728,-16.5796812749004,-16.61354581673307,-16.647410358565736,-16.681274900398407,-16.715139442231077,-16.749003984063744,-16.782868525896415,-16.816733067729082,-16.850597609561753,-16.884462151394423,-16.91832669322709,-16.95219123505976,-16.98605577689243,-17.0199203187251,-17.05378486055777,-17.08764940239044,-17.121513944223107,-17.155378486055778,-17.189243027888445,-17.223107569721115,-17.256972111553786,-17.290836653386453,-17.324701195219124,-17.358565737051794,-17.39243027888446,-17.426294820717132,-17.4601593625498,-17.49402390438247,-17.52788844621514,-17.561752988047807,-17.595617529880478,-17.62948207171315,-17.663346613545816,-17.697211155378486,-17.731075697211157,-17.764940239043824,-17.798804780876495,-17.83266932270916,-17.866533864541832,-17.900398406374503,-17.93426294820717,-17.96812749003984,-18.00199203187251,-18.03585657370518,-18.06972111553785,-18.10358565737052,-18.137450199203187,-18.171314741035857,-18.205179282868524,-18.239043824701195,-18.272908366533866,-18.306772908366533,-18.340637450199203,-18.374501992031874,-18.40836653386454,-18.44223107569721,-18.47609561752988,-18.50996015936255,-18.54382470119522,-18.577689243027887,-18.611553784860558,-18.64541832669323,-18.679282868525895,-18.713147410358566,-18.747011952191237,-18.780876494023904,-18.814741035856574,-18.84860557768924,-18.882470119521912,-18.916334661354583,-18.95019920318725,-18.98406374501992,-19.01792828685259,-19.051792828685258,-19.08565737051793,-19.1195219123506,-19.153386454183266,-19.187250996015937,-19.221115537848604,-19.254980079681275,-19.288844621513945,-19.322709163346612,-19.356573705179283,-19.390438247011954,-19.42430278884462,-19.45816733067729,-19.49203187250996,-19.52589641434263,-19.5597609561753,-19.593625498007967,-19.627490039840637,-19.661354581673308,-19.695219123505975,-19.729083665338646,-19.762948207171316,-19.796812749003983,-19.830677290836654,-19.86454183266932,-19.89840637450199,-19.932270916334662,-19.96613545816733,-20.0]}
},{}],99:[function(require,module,exports){
module.exports={"expected":[1.4422495,1.447656,1.4530225,1.4583496,1.463638,1.4688885,1.4741017,1.4792783,1.4844189,1.4895242,1.4945947,1.499631,1.5046338,1.5096034,1.5145407,1.5194458,1.5243195,1.5291623,1.5339745,1.5387568,1.5435096,1.5482333,1.5529282,1.557595,1.5622339,1.5668455,1.5714302,1.5759882,1.5805199,1.5850259,1.5895064,1.5939617,1.5983924,1.6027985,1.6071805,1.6115389,1.6158737,1.6201854,1.6244743,1.6287407,1.6329849,1.637207,1.6414075,1.6455866,1.6497446,1.6538818,1.6579983,1.6620946,1.6661707,1.6702269,1.6742637,1.678281,1.6822791,1.6862584,1.6902189,1.694161,1.6980848,1.7019906,1.7058785,1.7097489,1.7136016,1.7174373,1.7212558,1.7250575,1.7288425,1.732611,1.736363,1.7400991,1.7438191,1.7475234,1.751212,1.7548852,1.758543,1.7621856,1.7658132,1.7694261,1.7730242,1.7766078,1.780177,1.7837319,1.7872727,1.7907995,1.7943126,1.7978119,1.8012975,1.8047699,1.8082289,1.8116746,1.8151073,1.8185272,1.8219342,1.8253285,1.8287102,1.8320795,1.8354363,1.838781,1.8421136,1.8454342,1.8487427,1.8520396,1.8553247,1.8585982,1.8618603,1.865111,1.8683504,1.8715786,1.8747957,1.8780017,1.8811969,1.8843812,1.8875548,1.8907177,1.8938702,1.8970122,1.9001439,1.9032651,1.9063762,1.9094772,1.9125682,1.9156492,1.9187202,1.9217817,1.9248332,1.9278752,1.9309075,1.9339304,1.9369439,1.939948,1.9429429,1.9459285,1.948905,1.9518723,1.9548309,1.9577804,1.960721,1.9636528,1.966576,1.9694905,1.9723964,1.9752936,1.9781826,1.981063,1.983935,1.9867989,1.9896544,1.9925017,1.9953411,1.9981723,2.0009956,2.003811,2.0066183,2.0094178,2.0122094,2.0149937,2.0177698,2.0205388,2.0233,2.0260537,2.0287998,2.0315385,2.03427,2.0369942,2.039711,2.0424206,2.045123,2.0478184,2.0505066,2.0531878,2.0558622,2.0585294,2.06119,2.0638433,2.0664902,2.0691302,2.0717635,2.07439,2.07701,2.0796235,2.08223,2.0848305,2.0874243,2.0900116,2.0925927,2.0951674,2.0977356,2.1002977,2.1028538,2.1054032,2.1079469,2.1104841,2.1130154,2.1155405,2.1180599,2.120573,2.1230803,2.1255817,2.1280773,2.1305668,2.1330507,2.1355288,2.1380012,2.140468,2.1429288,2.145384,2.1478338,2.150278,2.1527166,2.1551497,2.1575773,2.1599996,2.1624162,2.1648276,2.1672337,2.1696343,2.1720297,2.1744196,2.1768045,2.1791842,2.1815586,2.183928,2.1862922,2.1886513,2.1910052,2.1933541,2.195698,2.198037,2.2003708,2.2027,2.205024,2.2073433,2.2096577,2.211967,2.2142718,2.2165718,2.2188668,2.2211573,2.223443,2.225724,2.2280004,2.230272,2.2325392,2.2348015,2.2370596,2.239313,2.2415617,2.2438061,2.2460458,2.2482812,2.2505121,2.2527387,2.254961,2.2571788,2.2593923,2.2616012,2.263806,2.2660065,2.2682028,2.2703948,2.2725825,2.2747662,2.2769456,2.2791207,2.2812917,2.2834587,2.2856216,2.2877805,2.289935,2.292086,2.2942324,2.296375,2.2985137,2.3006482,2.302779,2.3049057,2.3070285,2.3091476,2.3112626,2.3133738,2.3154812,2.3175845,2.3196843,2.3217802,2.3238723,2.3259606,2.3280454,2.3301263,2.3322036,2.3342772,2.3363469,2.338413,2.3404756,2.3425345,2.3445897,2.3466413,2.3486896,2.350734,2.352775,2.3548124,2.3568463,2.3588767,2.3609037,2.3629272,2.3649473,2.3669639,2.3689768,2.3709867,2.372993,2.374996,2.3769953,2.3789916,2.3809845,2.382974,2.3849602,2.386943,2.3889227,2.390899,2.392872,2.394842,2.3968086,2.3987718,2.400732,2.402689,2.4046428,2.4065933,2.408541,2.410485,2.4124262,2.4143643,2.4162993,2.4182312,2.42016,2.4220858,2.4240084,2.4259279,2.4278445,2.429758,2.4316685,2.433576,2.4354806,2.4373822,2.439281,2.4411767,2.4430692,2.4449592,2.446846,2.44873,2.450611,2.4524891,2.4543645,2.456237,2.4581068,2.4599736,2.4618373,2.4636986,2.4655569,2.4674125,2.4692652,2.471115,2.4729624,2.4748068,2.4766483,2.4784875,2.4803236,2.4821572,2.483988,2.485816,2.4876416,2.4894643,2.4912844,2.4931018,2.4949167,2.4967287,2.4985383,2.5003452,2.5021496,2.5039513,2.5057504,2.507547,2.5093408,2.5111322,2.512921,2.5147076,2.5164912,2.5182724,2.5200512,2.5218275,2.523601,2.5253725,2.527141,2.5289075,2.5306714,2.5324326,2.5341916,2.535948,2.537702,2.5394537,2.541203,2.54295,2.5446942,2.5464363,2.5481758,2.5499132,2.5516481,2.5533805,2.555111,2.5568388,2.5585642,2.5602875,2.5620084,2.563727,2.5654433,2.5671573,2.5688689,2.5705783,2.5722854,2.5739903,2.5756931,2.5773935,2.5790915,2.5807874,2.5824811,2.5841727,2.585862,2.587549,2.5892339,2.5909164,2.592597,2.5942752,2.5959516,2.5976255,2.5992973,2.600967,2.6026344,2.6043,2.6059632,2.6076243,2.6092834,2.6109405,2.6125953,2.6142478,2.6158986,2.617547,2.6191936,2.620838,2.6224804,2.6241207,2.6257591,2.6273952,2.6290295,2.6306615,2.6322918,2.63392,2.635546,2.63717,2.6387923,2.6404123,2.6420305,2.6436465,2.6452608,2.646873,2.6484833,2.6500914,2.6516979,2.6533022,2.6549048,2.6565053,2.658104,2.6597006,2.6612954,2.662888,2.6644793,2.6660683,2.6676555,2.6692407,2.670824,2.6724055,2.6739852,2.675563,2.677139,2.678713,2.6802852,2.6818557,2.6834242,2.684991,2.6865559,2.688119,2.6896803,2.6912396,2.6927972,2.694353,2.695907,2.6974595,2.69901,2.7005587,2.7021055,2.7036507,2.705194,2.7067356,2.7082756,2.7098138,2.71135,2.7128847,2.7144177],"x":[3.0,3.0338645418326693,3.0677290836653386,3.101593625498008,3.135458167330677,3.1693227091633465,3.2031872509960158,3.237051792828685,3.270916334661355,3.304780876494024,3.3386454183266934,3.3725099601593627,3.406374501992032,3.4402390438247012,3.4741035856573705,3.50796812749004,3.541832669322709,3.5756972111553784,3.6095617529880477,3.643426294820717,3.6772908366533863,3.7111553784860556,3.745019920318725,3.7788844621513946,3.812749003984064,3.846613545816733,3.8804780876494025,3.914342629482072,3.948207171314741,3.9820717131474104,4.01593625498008,4.049800796812749,4.083665338645418,4.117529880478088,4.151394422310757,4.185258964143427,4.219123505976095,4.252988047808765,4.286852589641434,4.320717131474104,4.354581673306773,4.388446215139442,4.422310756972111,4.456175298804781,4.49003984063745,4.5239043824701195,4.557768924302789,4.591633466135458,4.625498007968128,4.659362549800797,4.693227091633466,4.727091633466135,4.760956175298805,4.794820717131474,4.828685258964144,4.862549800796812,4.896414342629482,4.930278884462151,4.964143426294821,4.99800796812749,5.031872509960159,5.065737051792829,5.099601593625498,5.133466135458168,5.1673306772908365,5.201195219123506,5.235059760956175,5.268924302788845,5.302788844621514,5.336653386454183,5.370517928286852,5.404382470119522,5.438247011952191,5.472111553784861,5.50597609561753,5.539840637450199,5.573705179282869,5.607569721115538,5.6414342629482075,5.675298804780876,5.709163346613546,5.743027888446215,5.776892430278885,5.8107569721115535,5.844621513944223,5.878486055776892,5.912350597609562,5.946215139442231,5.9800796812749,6.01394422310757,6.047808764940239,6.081673306772909,6.115537848605578,6.149402390438247,6.183266932270916,6.217131474103586,6.250996015936255,6.2848605577689245,6.318725099601593,6.352589641434263,6.386454183266932,6.420318725099602,6.4541832669322705,6.48804780876494,6.52191235059761,6.555776892430279,6.589641434262949,6.623505976095617,6.657370517928287,6.691235059760956,6.725099601593626,6.758964143426295,6.792828685258964,6.826693227091633,6.860557768924303,6.894422310756972,6.9282868525896415,6.96215139442231,6.99601593625498,7.02988047808765,7.063745019920319,7.097609561752988,7.131474103585657,7.165338645418327,7.199203187250996,7.233067729083666,7.266932270916334,7.300796812749004,7.334661354581673,7.368525896414343,7.402390438247012,7.436254980079681,7.47011952191235,7.50398406374502,7.53784860557769,7.5717131474103585,7.605577689243028,7.639442231075697,7.673306772908367,7.707171314741036,7.741035856573705,7.774900398406374,7.808764940239044,7.842629482071713,7.876494023904383,7.910358565737051,7.944223107569721,7.97808764940239,8.01195219123506,8.04581673306773,8.079681274900398,8.113545816733067,8.147410358565738,8.181274900398407,8.215139442231076,8.249003984063744,8.282868525896415,8.316733067729084,8.350597609561753,8.384462151394422,8.418326693227092,8.452191235059761,8.48605577689243,8.5199203187251,8.55378486055777,8.587649402390438,8.621513944223107,8.655378486055778,8.689243027888446,8.723107569721115,8.756972111553784,8.790836653386455,8.824701195219124,8.858565737051793,8.892430278884461,8.926294820717132,8.9601593625498,8.99402390438247,9.02788844621514,9.06175298804781,9.095617529880478,9.129482071713147,9.163346613545817,9.197211155378486,9.231075697211155,9.264940239043824,9.298804780876495,9.332669322709163,9.366533864541832,9.400398406374501,9.434262948207172,9.46812749003984,9.50199203187251,9.53585657370518,9.569721115537849,9.603585657370518,9.637450199203187,9.671314741035857,9.705179282868526,9.739043824701195,9.772908366533864,9.806772908366534,9.840637450199203,9.874501992031872,9.908366533864541,9.942231075697212,9.97609561752988,10.00996015936255,10.04382470119522,10.077689243027889,10.111553784860558,10.145418326693227,10.179282868525897,10.213147410358566,10.247011952191235,10.280876494023904,10.314741035856574,10.348605577689243,10.382470119521912,10.41633466135458,10.450199203187251,10.48406374501992,10.51792828685259,10.55179282868526,10.585657370517929,10.619521912350598,10.653386454183266,10.687250996015937,10.721115537848606,10.754980079681275,10.788844621513944,10.822709163346614,10.856573705179283,10.890438247011952,10.92430278884462,10.958167330677291,10.99203187250996,11.025896414342629,11.0597609561753,11.093625498007968,11.127490039840637,11.161354581673306,11.195219123505977,11.229083665338646,11.262948207171315,11.296812749003983,11.330677290836654,11.364541832669323,11.398406374501992,11.43227091633466,11.466135458167331,11.5,11.533864541832669,11.56772908366534,11.601593625498008,11.635458167330677,11.669322709163346,11.703187250996017,11.737051792828685,11.770916334661354,11.804780876494023,11.838645418326694,11.872509960159363,11.906374501992032,11.9402390438247,11.974103585657371,12.00796812749004,12.041832669322709,12.07569721115538,12.109561752988048,12.143426294820717,12.177290836653386,12.211155378486056,12.245019920318725,12.278884462151394,12.312749003984063,12.346613545816734,12.380478087649402,12.414342629482071,12.44820717131474,12.48207171314741,12.51593625498008,12.549800796812749,12.58366533864542,12.617529880478088,12.651394422310757,12.685258964143426,12.719123505976096,12.752988047808765,12.786852589641434,12.820717131474103,12.854581673306773,12.888446215139442,12.922310756972111,12.95617529880478,12.99003984063745,13.02390438247012,13.057768924302788,13.091633466135459,13.125498007968128,13.159362549800797,13.193227091633466,13.227091633466136,13.260956175298805,13.294820717131474,13.328685258964143,13.362549800796813,13.396414342629482,13.430278884462151,13.46414342629482,13.49800796812749,13.53187250996016,13.565737051792828,13.599601593625499,13.633466135458168,13.667330677290837,13.701195219123505,13.735059760956176,13.768924302788845,13.802788844621514,13.836653386454183,13.870517928286853,13.904382470119522,13.93824701195219,13.97211155378486,14.00597609561753,14.0398406374502,14.073705179282868,14.107569721115539,14.141434262948207,14.175298804780876,14.209163346613545,14.243027888446216,14.276892430278885,14.310756972111554,14.344621513944222,14.378486055776893,14.412350597609562,14.44621513944223,14.4800796812749,14.51394422310757,14.547808764940239,14.581673306772908,14.615537848605578,14.649402390438247,14.683266932270916,14.717131474103585,14.750996015936256,14.784860557768924,14.818725099601593,14.852589641434262,14.886454183266933,14.920318725099602,14.95418326693227,14.98804780876494,15.02191235059761,15.055776892430279,15.089641434262948,15.123505976095618,15.157370517928287,15.191235059760956,15.225099601593625,15.258964143426295,15.292828685258964,15.326693227091633,15.360557768924302,15.394422310756973,15.428286852589641,15.46215139442231,15.49601593625498,15.52988047808765,15.563745019920319,15.597609561752988,15.631474103585658,15.665338645418327,15.699203187250996,15.733067729083665,15.766932270916335,15.800796812749004,15.834661354581673,15.868525896414342,15.902390438247012,15.936254980079681,15.97011952191235,16.00398406374502,16.03784860557769,16.07171314741036,16.105577689243027,16.139442231075698,16.173306772908365,16.207171314741036,16.241035856573706,16.274900398406373,16.308764940239044,16.342629482071715,16.37649402390438,16.410358565737052,16.44422310756972,16.47808764940239,16.51195219123506,16.545816733067728,16.5796812749004,16.61354581673307,16.647410358565736,16.681274900398407,16.715139442231077,16.749003984063744,16.782868525896415,16.816733067729082,16.850597609561753,16.884462151394423,16.91832669322709,16.95219123505976,16.98605577689243,17.0199203187251,17.05378486055777,17.08764940239044,17.121513944223107,17.155378486055778,17.189243027888445,17.223107569721115,17.256972111553786,17.290836653386453,17.324701195219124,17.358565737051794,17.39243027888446,17.426294820717132,17.4601593625498,17.49402390438247,17.52788844621514,17.561752988047807,17.595617529880478,17.62948207171315,17.663346613545816,17.697211155378486,17.731075697211157,17.764940239043824,17.798804780876495,17.83266932270916,17.866533864541832,17.900398406374503,17.93426294820717,17.96812749003984,18.00199203187251,18.03585657370518,18.06972111553785,18.10358565737052,18.137450199203187,18.171314741035857,18.205179282868524,18.239043824701195,18.272908366533866,18.306772908366533,18.340637450199203,18.374501992031874,18.40836653386454,18.44223107569721,18.47609561752988,18.50996015936255,18.54382470119522,18.577689243027887,18.611553784860558,18.64541832669323,18.679282868525895,18.713147410358566,18.747011952191237,18.780876494023904,18.814741035856574,18.84860557768924,18.882470119521912,18.916334661354583,18.95019920318725,18.98406374501992,19.01792828685259,19.051792828685258,19.08565737051793,19.1195219123506,19.153386454183266,19.187250996015937,19.221115537848604,19.254980079681275,19.288844621513945,19.322709163346612,19.356573705179283,19.390438247011954,19.42430278884462,19.45816733067729,19.49203187250996,19.52589641434263,19.5597609561753,19.593625498007967,19.627490039840637,19.661354581673308,19.695219123505975,19.729083665338646,19.762948207171316,19.796812749003983,19.830677290836654,19.86454183266932,19.89840637450199,19.932270916334662,19.96613545816733,20.0]}
},{}],100:[function(require,module,exports){
module.exports={"expected":[-0.9283178,-0.9300098,-0.9316957,-0.9333756,-0.93504936,-0.9367172,-0.93837917,-0.94003516,-0.94168544,-0.94332993,-0.94496864,-0.94660175,-0.94822925,-0.94985116,-0.9514676,-0.9530785,-0.95468396,-0.9562841,-0.9578789,-0.95946836,-0.9610526,-0.96263164,-0.9642055,-0.96577424,-0.9673379,-0.9688965,-0.97045016,-0.9719988,-0.9735426,-0.97508144,-0.9766154,-0.9781447,-0.97966915,-0.98118883,-0.9827039,-0.98421425,-0.98572004,-0.9872212,-0.9887178,-0.99020994,-0.99169755,-0.9931807,-0.9946594,-0.9961338,-0.99760383,-0.9990695,-1.000531,-1.001988,-1.003441,-1.0048897,-1.0063343,-1.0077747,-1.0092111,-1.0106432,-1.0120715,-1.0134957,-1.0149158,-1.016332,-1.0177443,-1.0191528,-1.0205573,-1.0219579,-1.0233546,-1.0247477,-1.0261369,-1.0275224,-1.0289042,-1.0302823,-1.0316566,-1.0330273,-1.0343944,-1.0357579,-1.0371178,-1.0384742,-1.039827,-1.0411763,-1.0425222,-1.0438645,-1.0452034,-1.046539,-1.047871,-1.0491997,-1.0505251,-1.0518471,-1.0531658,-1.0544811,-1.0557933,-1.0571022,-1.0584079,-1.0597104,-1.0610096,-1.0623057,-1.0635985,-1.0648884,-1.066175,-1.0674586,-1.068739,-1.0700165,-1.0712909,-1.0725622,-1.0738306,-1.0750959,-1.0763583,-1.0776178,-1.0788742,-1.0801278,-1.0813785,-1.0826263,-1.0838712,-1.0851133,-1.0863525,-1.0875889,-1.0888225,-1.0900533,-1.0912814,-1.0925066,-1.0937293,-1.094949,-1.0961661,-1.0973805,-1.0985923,-1.0998013,-1.1010077,-1.1022115,-1.1034126,-1.1046112,-1.1058071,-1.1070005,-1.1081913,-1.1093795,-1.1105652,-1.1117483,-1.112929,-1.1141071,-1.1152828,-1.116456,-1.1176268,-1.118795,-1.1199609,-1.1211244,-1.1222854,-1.123444,-1.1246002,-1.1257541,-1.1269056,-1.1280547,-1.1292015,-1.1303461,-1.1314882,-1.1326281,-1.1337657,-1.134901,-1.1360341,-1.1371648,-1.1382934,-1.1394198,-1.1405438,-1.1416657,-1.1427854,-1.1439029,-1.1450182,-1.1461314,-1.1472423,-1.1483512,-1.1494579,-1.1505624,-1.1516649,-1.1527653,-1.1538635,-1.1549597,-1.1560538,-1.1571457,-1.1582358,-1.1593237,-1.1604096,-1.1614934,-1.1625752,-1.163655,-1.1647328,-1.1658087,-1.1668825,-1.1679544,-1.1690243,-1.1700922,-1.1711583,-1.1722224,-1.1732845,-1.1743448,-1.175403,-1.1764594,-1.177514,-1.1785667,-1.1796174,-1.1806662,-1.1817133,-1.1827585,-1.1838018,-1.1848433,-1.185883,-1.1869208,-1.1879568,-1.1889911,-1.1900235,-1.1910542,-1.192083,-1.1931101,-1.1941354,-1.1951591,-1.1961808,-1.1972009,-1.1982193,-1.1992359,-1.2002507,-1.201264,-1.2022755,-1.2032852,-1.2042933,-1.2052997,-1.2063044,-1.2073075,-1.2083089,-1.2093086,-1.2103066,-1.2113031,-1.2122979,-1.213291,-1.2142826,-1.2152725,-1.2162609,-1.2172476,-1.2182328,-1.2192162,-1.2201982,-1.2211785,-1.2221574,-1.2231345,-1.2241102,-1.2250844,-1.2260569,-1.2270279,-1.2279974,-1.2289654,-1.2299318,-1.2308968,-1.2318602,-1.2328221,-1.2337825,-1.2347414,-1.2356989,-1.2366549,-1.2376093,-1.2385623,-1.2395139,-1.240464,-1.2414126,-1.2423598,-1.2433054,-1.2442498,-1.2451926,-1.2461342,-1.2470741,-1.2480128,-1.24895,-1.2498858,-1.2508202,-1.2517532,-1.2526848,-1.253615,-1.2545439,-1.2554713,-1.2563975,-1.2573222,-1.2582456,-1.2591677,-1.2600883,-1.2610077,-1.2619257,-1.2628424,-1.2637577,-1.2646717,-1.2655845,-1.2664958,-1.2674059,-1.2683147,-1.2692221,-1.2701284,-1.2710332,-1.2719368,-1.2728392,-1.2737402,-1.27464,-1.2755384,-1.2764356,-1.2773316,-1.2782264,-1.2791198,-1.280012,-1.280903,-1.2817928,-1.2826812,-1.2835685,-1.2844546,-1.2853395,-1.286223,-1.2871054,-1.2879866,-1.2888666,-1.2897455,-1.2906231,-1.2914994,-1.2923746,-1.2932487,-1.2941215,-1.2949932,-1.2958637,-1.296733,-1.2976012,-1.2984682,-1.299334,-1.3001988,-1.3010623,-1.3019247,-1.302786,-1.3036461,-1.3045051,-1.305363,-1.3062197,-1.3070754,-1.3079299,-1.3087833,-1.3096355,-1.3104867,-1.3113368,-1.3121858,-1.3130336,-1.3138803,-1.3147261,-1.3155706,-1.3164141,-1.3172566,-1.318098,-1.3189383,-1.3197774,-1.3206155,-1.3214526,-1.3222886,-1.3231237,-1.3239576,-1.3247905,-1.3256223,-1.3264531,-1.3272828,-1.3281115,-1.3289392,-1.3297658,-1.3305914,-1.331416,-1.3322396,-1.3330622,-1.3338836,-1.3347043,-1.3355237,-1.3363422,-1.3371598,-1.3379763,-1.3387918,-1.3396063,-1.3404199,-1.3412324,-1.342044,-1.3428546,-1.3436642,-1.3444729,-1.3452805,-1.3460872,-1.346893,-1.3476977,-1.3485016,-1.3493044,-1.3501062,-1.3509072,-1.3517072,-1.3525063,-1.3533044,-1.3541015,-1.3548979,-1.3556931,-1.3564875,-1.3572809,-1.3580734,-1.358865,-1.3596556,-1.3604454,-1.3612342,-1.3620222,-1.3628092,-1.3635952,-1.3643805,-1.3651648,-1.3659482,-1.3667306,-1.3675122,-1.3682929,-1.3690728,-1.3698517,-1.3706297,-1.3714069,-1.3721832,-1.3729585,-1.3737332,-1.3745067,-1.3752795,-1.3760514,-1.3768225,-1.3775927,-1.378362,-1.3791305,-1.3798981,-1.3806648,-1.3814309,-1.3821958,-1.3829601,-1.3837235,-1.384486,-1.3852477,-1.3860085,-1.3867686,-1.3875278,-1.3882861,-1.3890437,-1.3898004,-1.3905563,-1.3913113,-1.3920656,-1.392819,-1.3935716,-1.3943235,-1.3950744,-1.3958247,-1.396574,-1.3973225,-1.3980703,-1.3988173,-1.3995636,-1.4003088,-1.4010535,-1.4017973,-1.4025403,-1.4032825,-1.404024,-1.4047647,-1.4055045,-1.4062436,-1.406982,-1.4077195,-1.4084563,-1.4091923,-1.4099275,-1.410662,-1.4113957,-1.4121287,-1.4128609,-1.4135923,-1.414323,-1.4150529,-1.4157821,-1.4165105,-1.4172381,-1.417965,-1.4186913,-1.4194167,-1.4201413,-1.4208654,-1.4215885,-1.4223111,-1.4230328,-1.4237539,-1.4244741,-1.4251937,-1.4259125,-1.4266306,-1.427348,-1.4280647,-1.4287807,-1.4294959,-1.4302105,-1.4309242,-1.4316373,-1.4323497,-1.4330614,-1.4337723,-1.4344826,-1.4351922,-1.435901,-1.4366093,-1.4373167,-1.4380234,-1.4387295,-1.4394349,-1.4401397,-1.4408436,-1.4415469,-1.4422495],"x":[-0.8,-0.8043824701195219,-0.8087649402390438,-0.8131474103585657,-0.8175298804780876,-0.8219123505976096,-0.8262948207171315,-0.8306772908366534,-0.8350597609561753,-0.8394422310756973,-0.8438247011952191,-0.848207171314741,-0.852589641434263,-0.8569721115537848,-0.8613545816733068,-0.8657370517928287,-0.8701195219123506,-0.8745019920318725,-0.8788844621513944,-0.8832669322709163,-0.8876494023904382,-0.8920318725099602,-0.896414342629482,-0.900796812749004,-0.9051792828685259,-0.9095617529880478,-0.9139442231075697,-0.9183266932270916,-0.9227091633466136,-0.9270916334661354,-0.9314741035856574,-0.9358565737051793,-0.9402390438247012,-0.9446215139442231,-0.949003984063745,-0.953386454183267,-0.9577689243027888,-0.9621513944223108,-0.9665338645418327,-0.9709163346613546,-0.9752988047808765,-0.9796812749003984,-0.9840637450199203,-0.9884462151394422,-0.9928286852589642,-0.997211155378486,-1.001593625498008,-1.0059760956175299,-1.0103585657370517,-1.0147410358565736,-1.0191235059760957,-1.0235059760956176,-1.0278884462151394,-1.0322709163346613,-1.0366533864541834,-1.0410358565737052,-1.045418326693227,-1.049800796812749,-1.0541832669322708,-1.058565737051793,-1.0629482071713148,-1.0673306772908366,-1.0717131474103585,-1.0760956175298806,-1.0804780876494025,-1.0848605577689243,-1.0892430278884462,-1.093625498007968,-1.0980079681274901,-1.102390438247012,-1.1067729083665339,-1.1111553784860557,-1.1155378486055776,-1.1199203187250997,-1.1243027888446215,-1.1286852589641434,-1.1330677290836653,-1.1374501992031874,-1.1418326693227092,-1.146215139442231,-1.150597609561753,-1.1549800796812748,-1.159362549800797,-1.1637450199203188,-1.1681274900398406,-1.1725099601593625,-1.1768924302788846,-1.1812749003984064,-1.1856573705179283,-1.1900398406374502,-1.194422310756972,-1.1988047808764941,-1.203187250996016,-1.2075697211155378,-1.2119521912350597,-1.2163346613545816,-1.2207171314741037,-1.2250996015936255,-1.2294820717131474,-1.2338645418326692,-1.2382470119521913,-1.2426294820717132,-1.247011952191235,-1.251394422310757,-1.2557768924302788,-1.2601593625498009,-1.2645418326693227,-1.2689243027888446,-1.2733067729083665,-1.2776892430278886,-1.2820717131474104,-1.2864541832669323,-1.2908366533864541,-1.295219123505976,-1.299601593625498,-1.30398406374502,-1.3083665338645418,-1.3127490039840637,-1.3171314741035856,-1.3215139442231076,-1.3258964143426295,-1.3302788844621514,-1.3346613545816732,-1.3390438247011953,-1.3434262948207172,-1.347808764940239,-1.352191235059761,-1.3565737051792828,-1.3609561752988049,-1.3653386454183267,-1.3697211155378486,-1.3741035856573705,-1.3784860557768925,-1.3828685258964144,-1.3872509960159363,-1.3916334661354581,-1.39601593625498,-1.400398406374502,-1.404780876494024,-1.4091633466135458,-1.4135458167330677,-1.4179282868525895,-1.4223107569721116,-1.4266932270916335,-1.4310756972111554,-1.4354581673306772,-1.4398406374501993,-1.4442231075697212,-1.448605577689243,-1.452988047808765,-1.4573705179282868,-1.4617529880478088,-1.4661354581673307,-1.4705179282868526,-1.4749003984063744,-1.4792828685258965,-1.4836653386454184,-1.4880478087649402,-1.4924302788844621,-1.496812749003984,-1.501195219123506,-1.505577689243028,-1.5099601593625498,-1.5143426294820717,-1.5187250996015935,-1.5231075697211156,-1.5274900398406375,-1.5318725099601593,-1.5362549800796812,-1.5406374501992033,-1.5450199203187251,-1.549402390438247,-1.5537848605577689,-1.5581673306772907,-1.5625498007968128,-1.5669322709163347,-1.5713147410358566,-1.5756972111553784,-1.5800796812749005,-1.5844621513944224,-1.5888446215139442,-1.593227091633466,-1.597609561752988,-1.60199203187251,-1.606374501992032,-1.6107569721115538,-1.6151394422310756,-1.6195219123505975,-1.6239043824701196,-1.6282868525896415,-1.6326693227091633,-1.6370517928286852,-1.6414342629482073,-1.6458167330677291,-1.650199203187251,-1.6545816733067729,-1.6589641434262947,-1.6633466135458168,-1.6677290836653387,-1.6721115537848605,-1.6764940239043824,-1.6808764940239045,-1.6852589641434264,-1.6896414342629482,-1.69402390438247,-1.698406374501992,-1.702788844621514,-1.707171314741036,-1.7115537848605578,-1.7159362549800796,-1.7203187250996015,-1.7247011952191236,-1.7290836653386454,-1.7334661354581673,-1.7378486055776892,-1.7422310756972113,-1.7466135458167331,-1.750996015936255,-1.7553784860557768,-1.7597609561752987,-1.7641434262948208,-1.7685258964143427,-1.7729083665338645,-1.7772908366533864,-1.7816733067729085,-1.7860557768924303,-1.7904382470119522,-1.794820717131474,-1.799203187250996,-1.803585657370518,-1.8079681274900399,-1.8123505976095617,-1.8167330677290836,-1.8211155378486055,-1.8254980079681276,-1.8298804780876494,-1.8342629482071713,-1.8386454183266931,-1.8430278884462152,-1.847410358565737,-1.851792828685259,-1.8561752988047808,-1.8605577689243027,-1.8649402390438248,-1.8693227091633466,-1.8737051792828685,-1.8780876494023904,-1.8824701195219125,-1.8868525896414343,-1.8912350597609562,-1.895617529880478,-1.9,-1.904382470119522,-1.9087649402390439,-1.9131474103585657,-1.9175298804780876,-1.9219123505976095,-1.9262948207171315,-1.9306772908366534,-1.9350597609561753,-1.9394422310756971,-1.9438247011952192,-1.948207171314741,-1.952589641434263,-1.9569721115537848,-1.9613545816733067,-1.9657370517928288,-1.9701195219123506,-1.9745019920318725,-1.9788844621513944,-1.9832669322709164,-1.9876494023904383,-1.9920318725099602,-1.996414342629482,-2.000796812749004,-2.005179282868526,-2.0095617529880476,-2.0139442231075697,-2.018326693227092,-2.0227091633466134,-2.0270916334661355,-2.031474103585657,-2.0358565737051793,-2.0402390438247013,-2.044621513944223,-2.049003984063745,-2.053386454183267,-2.057768924302789,-2.062151394422311,-2.0665338645418325,-2.0709163346613546,-2.0752988047808767,-2.0796812749003983,-2.0840637450199204,-2.088446215139442,-2.092828685258964,-2.0972111553784862,-2.101593625498008,-2.10597609561753,-2.1103585657370516,-2.1147410358565737,-2.119123505976096,-2.1235059760956174,-2.1278884462151395,-2.132270916334661,-2.1366533864541832,-2.1410358565737053,-2.145418326693227,-2.149800796812749,-2.154183266932271,-2.1585657370517928,-2.162948207171315,-2.1673306772908365,-2.1717131474103586,-2.1760956175298807,-2.1804780876494023,-2.1848605577689244,-2.189243027888446,-2.193625498007968,-2.19800796812749,-2.202390438247012,-2.206772908366534,-2.2111553784860556,-2.2155378486055777,-2.2199203187250998,-2.2243027888446214,-2.2286852589641435,-2.233067729083665,-2.237450199203187,-2.2418326693227093,-2.246215139442231,-2.250597609561753,-2.254980079681275,-2.2593625498007968,-2.263745019920319,-2.2681274900398405,-2.2725099601593626,-2.2768924302788847,-2.2812749003984063,-2.2856573705179284,-2.29003984063745,-2.294422310756972,-2.298804780876494,-2.303187250996016,-2.307569721115538,-2.3119521912350596,-2.3163346613545817,-2.3207171314741037,-2.3250996015936254,-2.3294820717131475,-2.333864541832669,-2.338247011952191,-2.3426294820717133,-2.347011952191235,-2.351394422310757,-2.355776892430279,-2.3601593625498007,-2.364541832669323,-2.3689243027888445,-2.3733067729083666,-2.3776892430278886,-2.3820717131474103,-2.3864541832669324,-2.390836653386454,-2.395219123505976,-2.399601593625498,-2.40398406374502,-2.408366533864542,-2.4127490039840636,-2.4171314741035856,-2.4215139442231077,-2.4258964143426294,-2.4302788844621515,-2.434661354581673,-2.439043824701195,-2.4434262948207173,-2.447808764940239,-2.452191235059761,-2.456573705179283,-2.4609561752988047,-2.465338645418327,-2.4697211155378485,-2.4741035856573705,-2.4784860557768926,-2.4828685258964143,-2.4872509960159364,-2.491633466135458,-2.49601593625498,-2.500398406374502,-2.504780876494024,-2.509163346613546,-2.5135458167330675,-2.5179282868525896,-2.5223107569721117,-2.5266932270916334,-2.5310756972111554,-2.535458167330677,-2.539840637450199,-2.5442231075697213,-2.548605577689243,-2.552988047808765,-2.557370517928287,-2.5617529880478087,-2.566135458167331,-2.5705179282868524,-2.5749003984063745,-2.5792828685258966,-2.5836653386454183,-2.5880478087649403,-2.592430278884462,-2.596812749003984,-2.601195219123506,-2.605577689243028,-2.60996015936255,-2.6143426294820715,-2.6187250996015936,-2.6231075697211157,-2.6274900398406373,-2.6318725099601594,-2.636254980079681,-2.640637450199203,-2.6450199203187252,-2.649402390438247,-2.653784860557769,-2.658167330677291,-2.6625498007968127,-2.666932270916335,-2.6713147410358564,-2.6756972111553785,-2.6800796812749006,-2.6844621513944222,-2.6888446215139443,-2.693227091633466,-2.697609561752988,-2.70199203187251,-2.706374501992032,-2.710756972111554,-2.7151394422310755,-2.7195219123505976,-2.7239043824701197,-2.7282868525896413,-2.7326693227091634,-2.737051792828685,-2.741434262948207,-2.745816733067729,-2.750199203187251,-2.754581673306773,-2.758964143426295,-2.7633466135458167,-2.7677290836653388,-2.7721115537848604,-2.7764940239043825,-2.7808764940239046,-2.785258964143426,-2.7896414342629483,-2.79402390438247,-2.798406374501992,-2.802788844621514,-2.8071713147410358,-2.811553784860558,-2.8159362549800795,-2.8203187250996016,-2.8247011952191237,-2.8290836653386453,-2.8334661354581674,-2.837848605577689,-2.842231075697211,-2.846613545816733,-2.850996015936255,-2.855378486055777,-2.859760956175299,-2.8641434262948207,-2.8685258964143427,-2.8729083665338644,-2.8772908366533865,-2.8816733067729086,-2.88605577689243,-2.8904382470119523,-2.894820717131474,-2.899203187250996,-2.903585657370518,-2.9079681274900397,-2.912350597609562,-2.9167330677290835,-2.9211155378486056,-2.9254980079681276,-2.9298804780876493,-2.9342629482071714,-2.938645418326693,-2.943027888446215,-2.947410358565737,-2.951792828685259,-2.956175298804781,-2.960557768924303,-2.9649402390438246,-2.9693227091633467,-2.9737051792828684,-2.9780876494023905,-2.9824701195219125,-2.986852589641434,-2.9912350597609563,-2.995617529880478,-3.0]}
},{}],101:[function(require,module,exports){
module.exports={"expected":[0.9283178,0.9300098,0.9316957,0.9333756,0.93504936,0.9367172,0.93837917,0.94003516,0.94168544,0.94332993,0.94496864,0.94660175,0.94822925,0.94985116,0.9514676,0.9530785,0.95468396,0.9562841,0.9578789,0.95946836,0.9610526,0.96263164,0.9642055,0.96577424,0.9673379,0.9688965,0.97045016,0.9719988,0.9735426,0.97508144,0.9766154,0.9781447,0.97966915,0.98118883,0.9827039,0.98421425,0.98572004,0.9872212,0.9887178,0.99020994,0.99169755,0.9931807,0.9946594,0.9961338,0.99760383,0.9990695,1.000531,1.001988,1.003441,1.0048897,1.0063343,1.0077747,1.0092111,1.0106432,1.0120715,1.0134957,1.0149158,1.016332,1.0177443,1.0191528,1.0205573,1.0219579,1.0233546,1.0247477,1.0261369,1.0275224,1.0289042,1.0302823,1.0316566,1.0330273,1.0343944,1.0357579,1.0371178,1.0384742,1.039827,1.0411763,1.0425222,1.0438645,1.0452034,1.046539,1.047871,1.0491997,1.0505251,1.0518471,1.0531658,1.0544811,1.0557933,1.0571022,1.0584079,1.0597104,1.0610096,1.0623057,1.0635985,1.0648884,1.066175,1.0674586,1.068739,1.0700165,1.0712909,1.0725622,1.0738306,1.0750959,1.0763583,1.0776178,1.0788742,1.0801278,1.0813785,1.0826263,1.0838712,1.0851133,1.0863525,1.0875889,1.0888225,1.0900533,1.0912814,1.0925066,1.0937293,1.094949,1.0961661,1.0973805,1.0985923,1.0998013,1.1010077,1.1022115,1.1034126,1.1046112,1.1058071,1.1070005,1.1081913,1.1093795,1.1105652,1.1117483,1.112929,1.1141071,1.1152828,1.116456,1.1176268,1.118795,1.1199609,1.1211244,1.1222854,1.123444,1.1246002,1.1257541,1.1269056,1.1280547,1.1292015,1.1303461,1.1314882,1.1326281,1.1337657,1.134901,1.1360341,1.1371648,1.1382934,1.1394198,1.1405438,1.1416657,1.1427854,1.1439029,1.1450182,1.1461314,1.1472423,1.1483512,1.1494579,1.1505624,1.1516649,1.1527653,1.1538635,1.1549597,1.1560538,1.1571457,1.1582358,1.1593237,1.1604096,1.1614934,1.1625752,1.163655,1.1647328,1.1658087,1.1668825,1.1679544,1.1690243,1.1700922,1.1711583,1.1722224,1.1732845,1.1743448,1.175403,1.1764594,1.177514,1.1785667,1.1796174,1.1806662,1.1817133,1.1827585,1.1838018,1.1848433,1.185883,1.1869208,1.1879568,1.1889911,1.1900235,1.1910542,1.192083,1.1931101,1.1941354,1.1951591,1.1961808,1.1972009,1.1982193,1.1992359,1.2002507,1.201264,1.2022755,1.2032852,1.2042933,1.2052997,1.2063044,1.2073075,1.2083089,1.2093086,1.2103066,1.2113031,1.2122979,1.213291,1.2142826,1.2152725,1.2162609,1.2172476,1.2182328,1.2192162,1.2201982,1.2211785,1.2221574,1.2231345,1.2241102,1.2250844,1.2260569,1.2270279,1.2279974,1.2289654,1.2299318,1.2308968,1.2318602,1.2328221,1.2337825,1.2347414,1.2356989,1.2366549,1.2376093,1.2385623,1.2395139,1.240464,1.2414126,1.2423598,1.2433054,1.2442498,1.2451926,1.2461342,1.2470741,1.2480128,1.24895,1.2498858,1.2508202,1.2517532,1.2526848,1.253615,1.2545439,1.2554713,1.2563975,1.2573222,1.2582456,1.2591677,1.2600883,1.2610077,1.2619257,1.2628424,1.2637577,1.2646717,1.2655845,1.2664958,1.2674059,1.2683147,1.2692221,1.2701284,1.2710332,1.2719368,1.2728392,1.2737402,1.27464,1.2755384,1.2764356,1.2773316,1.2782264,1.2791198,1.280012,1.280903,1.2817928,1.2826812,1.2835685,1.2844546,1.2853395,1.286223,1.2871054,1.2879866,1.2888666,1.2897455,1.2906231,1.2914994,1.2923746,1.2932487,1.2941215,1.2949932,1.2958637,1.296733,1.2976012,1.2984682,1.299334,1.3001988,1.3010623,1.3019247,1.302786,1.3036461,1.3045051,1.305363,1.3062197,1.3070754,1.3079299,1.3087833,1.3096355,1.3104867,1.3113368,1.3121858,1.3130336,1.3138803,1.3147261,1.3155706,1.3164141,1.3172566,1.318098,1.3189383,1.3197774,1.3206155,1.3214526,1.3222886,1.3231237,1.3239576,1.3247905,1.3256223,1.3264531,1.3272828,1.3281115,1.3289392,1.3297658,1.3305914,1.331416,1.3322396,1.3330622,1.3338836,1.3347043,1.3355237,1.3363422,1.3371598,1.3379763,1.3387918,1.3396063,1.3404199,1.3412324,1.342044,1.3428546,1.3436642,1.3444729,1.3452805,1.3460872,1.346893,1.3476977,1.3485016,1.3493044,1.3501062,1.3509072,1.3517072,1.3525063,1.3533044,1.3541015,1.3548979,1.3556931,1.3564875,1.3572809,1.3580734,1.358865,1.3596556,1.3604454,1.3612342,1.3620222,1.3628092,1.3635952,1.3643805,1.3651648,1.3659482,1.3667306,1.3675122,1.3682929,1.3690728,1.3698517,1.3706297,1.3714069,1.3721832,1.3729585,1.3737332,1.3745067,1.3752795,1.3760514,1.3768225,1.3775927,1.378362,1.3791305,1.3798981,1.3806648,1.3814309,1.3821958,1.3829601,1.3837235,1.384486,1.3852477,1.3860085,1.3867686,1.3875278,1.3882861,1.3890437,1.3898004,1.3905563,1.3913113,1.3920656,1.392819,1.3935716,1.3943235,1.3950744,1.3958247,1.396574,1.3973225,1.3980703,1.3988173,1.3995636,1.4003088,1.4010535,1.4017973,1.4025403,1.4032825,1.404024,1.4047647,1.4055045,1.4062436,1.406982,1.4077195,1.4084563,1.4091923,1.4099275,1.410662,1.4113957,1.4121287,1.4128609,1.4135923,1.414323,1.4150529,1.4157821,1.4165105,1.4172381,1.417965,1.4186913,1.4194167,1.4201413,1.4208654,1.4215885,1.4223111,1.4230328,1.4237539,1.4244741,1.4251937,1.4259125,1.4266306,1.427348,1.4280647,1.4287807,1.4294959,1.4302105,1.4309242,1.4316373,1.4323497,1.4330614,1.4337723,1.4344826,1.4351922,1.435901,1.4366093,1.4373167,1.4380234,1.4387295,1.4394349,1.4401397,1.4408436,1.4415469,1.4422495],"x":[0.8,0.8043824701195219,0.8087649402390438,0.8131474103585657,0.8175298804780876,0.8219123505976096,0.8262948207171315,0.8306772908366534,0.8350597609561753,0.8394422310756973,0.8438247011952191,0.848207171314741,0.852589641434263,0.8569721115537848,0.8613545816733068,0.8657370517928287,0.8701195219123506,0.8745019920318725,0.8788844621513944,0.8832669322709163,0.8876494023904382,0.8920318725099602,0.896414342629482,0.900796812749004,0.9051792828685259,0.9095617529880478,0.9139442231075697,0.9183266932270916,0.9227091633466136,0.9270916334661354,0.9314741035856574,0.9358565737051793,0.9402390438247012,0.9446215139442231,0.949003984063745,0.953386454183267,0.9577689243027888,0.9621513944223108,0.9665338645418327,0.9709163346613546,0.9752988047808765,0.9796812749003984,0.9840637450199203,0.9884462151394422,0.9928286852589642,0.997211155378486,1.001593625498008,1.0059760956175299,1.0103585657370517,1.0147410358565736,1.0191235059760957,1.0235059760956176,1.0278884462151394,1.0322709163346613,1.0366533864541834,1.0410358565737052,1.045418326693227,1.049800796812749,1.0541832669322708,1.058565737051793,1.0629482071713148,1.0673306772908366,1.0717131474103585,1.0760956175298806,1.0804780876494025,1.0848605577689243,1.0892430278884462,1.093625498007968,1.0980079681274901,1.102390438247012,1.1067729083665339,1.1111553784860557,1.1155378486055776,1.1199203187250997,1.1243027888446215,1.1286852589641434,1.1330677290836653,1.1374501992031874,1.1418326693227092,1.146215139442231,1.150597609561753,1.1549800796812748,1.159362549800797,1.1637450199203188,1.1681274900398406,1.1725099601593625,1.1768924302788846,1.1812749003984064,1.1856573705179283,1.1900398406374502,1.194422310756972,1.1988047808764941,1.203187250996016,1.2075697211155378,1.2119521912350597,1.2163346613545816,1.2207171314741037,1.2250996015936255,1.2294820717131474,1.2338645418326692,1.2382470119521913,1.2426294820717132,1.247011952191235,1.251394422310757,1.2557768924302788,1.2601593625498009,1.2645418326693227,1.2689243027888446,1.2733067729083665,1.2776892430278886,1.2820717131474104,1.2864541832669323,1.2908366533864541,1.295219123505976,1.299601593625498,1.30398406374502,1.3083665338645418,1.3127490039840637,1.3171314741035856,1.3215139442231076,1.3258964143426295,1.3302788844621514,1.3346613545816732,1.3390438247011953,1.3434262948207172,1.347808764940239,1.352191235059761,1.3565737051792828,1.3609561752988049,1.3653386454183267,1.3697211155378486,1.3741035856573705,1.3784860557768925,1.3828685258964144,1.3872509960159363,1.3916334661354581,1.39601593625498,1.400398406374502,1.404780876494024,1.4091633466135458,1.4135458167330677,1.4179282868525895,1.4223107569721116,1.4266932270916335,1.4310756972111554,1.4354581673306772,1.4398406374501993,1.4442231075697212,1.448605577689243,1.452988047808765,1.4573705179282868,1.4617529880478088,1.4661354581673307,1.4705179282868526,1.4749003984063744,1.4792828685258965,1.4836653386454184,1.4880478087649402,1.4924302788844621,1.496812749003984,1.501195219123506,1.505577689243028,1.5099601593625498,1.5143426294820717,1.5187250996015935,1.5231075697211156,1.5274900398406375,1.5318725099601593,1.5362549800796812,1.5406374501992033,1.5450199203187251,1.549402390438247,1.5537848605577689,1.5581673306772907,1.5625498007968128,1.5669322709163347,1.5713147410358566,1.5756972111553784,1.5800796812749005,1.5844621513944224,1.5888446215139442,1.593227091633466,1.597609561752988,1.60199203187251,1.606374501992032,1.6107569721115538,1.6151394422310756,1.6195219123505975,1.6239043824701196,1.6282868525896415,1.6326693227091633,1.6370517928286852,1.6414342629482073,1.6458167330677291,1.650199203187251,1.6545816733067729,1.6589641434262947,1.6633466135458168,1.6677290836653387,1.6721115537848605,1.6764940239043824,1.6808764940239045,1.6852589641434264,1.6896414342629482,1.69402390438247,1.698406374501992,1.702788844621514,1.707171314741036,1.7115537848605578,1.7159362549800796,1.7203187250996015,1.7247011952191236,1.7290836653386454,1.7334661354581673,1.7378486055776892,1.7422310756972113,1.7466135458167331,1.750996015936255,1.7553784860557768,1.7597609561752987,1.7641434262948208,1.7685258964143427,1.7729083665338645,1.7772908366533864,1.7816733067729085,1.7860557768924303,1.7904382470119522,1.794820717131474,1.799203187250996,1.803585657370518,1.8079681274900399,1.8123505976095617,1.8167330677290836,1.8211155378486055,1.8254980079681276,1.8298804780876494,1.8342629482071713,1.8386454183266931,1.8430278884462152,1.847410358565737,1.851792828685259,1.8561752988047808,1.8605577689243027,1.8649402390438248,1.8693227091633466,1.8737051792828685,1.8780876494023904,1.8824701195219125,1.8868525896414343,1.8912350597609562,1.895617529880478,1.9,1.904382470119522,1.9087649402390439,1.9131474103585657,1.9175298804780876,1.9219123505976095,1.9262948207171315,1.9306772908366534,1.9350597609561753,1.9394422310756971,1.9438247011952192,1.948207171314741,1.952589641434263,1.9569721115537848,1.9613545816733067,1.9657370517928288,1.9701195219123506,1.9745019920318725,1.9788844621513944,1.9832669322709164,1.9876494023904383,1.9920318725099602,1.996414342629482,2.000796812749004,2.005179282868526,2.0095617529880476,2.0139442231075697,2.018326693227092,2.0227091633466134,2.0270916334661355,2.031474103585657,2.0358565737051793,2.0402390438247013,2.044621513944223,2.049003984063745,2.053386454183267,2.057768924302789,2.062151394422311,2.0665338645418325,2.0709163346613546,2.0752988047808767,2.0796812749003983,2.0840637450199204,2.088446215139442,2.092828685258964,2.0972111553784862,2.101593625498008,2.10597609561753,2.1103585657370516,2.1147410358565737,2.119123505976096,2.1235059760956174,2.1278884462151395,2.132270916334661,2.1366533864541832,2.1410358565737053,2.145418326693227,2.149800796812749,2.154183266932271,2.1585657370517928,2.162948207171315,2.1673306772908365,2.1717131474103586,2.1760956175298807,2.1804780876494023,2.1848605577689244,2.189243027888446,2.193625498007968,2.19800796812749,2.202390438247012,2.206772908366534,2.2111553784860556,2.2155378486055777,2.2199203187250998,2.2243027888446214,2.2286852589641435,2.233067729083665,2.237450199203187,2.2418326693227093,2.246215139442231,2.250597609561753,2.254980079681275,2.2593625498007968,2.263745019920319,2.2681274900398405,2.2725099601593626,2.2768924302788847,2.2812749003984063,2.2856573705179284,2.29003984063745,2.294422310756972,2.298804780876494,2.303187250996016,2.307569721115538,2.3119521912350596,2.3163346613545817,2.3207171314741037,2.3250996015936254,2.3294820717131475,2.333864541832669,2.338247011952191,2.3426294820717133,2.347011952191235,2.351394422310757,2.355776892430279,2.3601593625498007,2.364541832669323,2.3689243027888445,2.3733067729083666,2.3776892430278886,2.3820717131474103,2.3864541832669324,2.390836653386454,2.395219123505976,2.399601593625498,2.40398406374502,2.408366533864542,2.4127490039840636,2.4171314741035856,2.4215139442231077,2.4258964143426294,2.4302788844621515,2.434661354581673,2.439043824701195,2.4434262948207173,2.447808764940239,2.452191235059761,2.456573705179283,2.4609561752988047,2.465338645418327,2.4697211155378485,2.4741035856573705,2.4784860557768926,2.4828685258964143,2.4872509960159364,2.491633466135458,2.49601593625498,2.500398406374502,2.504780876494024,2.509163346613546,2.5135458167330675,2.5179282868525896,2.5223107569721117,2.5266932270916334,2.5310756972111554,2.535458167330677,2.539840637450199,2.5442231075697213,2.548605577689243,2.552988047808765,2.557370517928287,2.5617529880478087,2.566135458167331,2.5705179282868524,2.5749003984063745,2.5792828685258966,2.5836653386454183,2.5880478087649403,2.592430278884462,2.596812749003984,2.601195219123506,2.605577689243028,2.60996015936255,2.6143426294820715,2.6187250996015936,2.6231075697211157,2.6274900398406373,2.6318725099601594,2.636254980079681,2.640637450199203,2.6450199203187252,2.649402390438247,2.653784860557769,2.658167330677291,2.6625498007968127,2.666932270916335,2.6713147410358564,2.6756972111553785,2.6800796812749006,2.6844621513944222,2.6888446215139443,2.693227091633466,2.697609561752988,2.70199203187251,2.706374501992032,2.710756972111554,2.7151394422310755,2.7195219123505976,2.7239043824701197,2.7282868525896413,2.7326693227091634,2.737051792828685,2.741434262948207,2.745816733067729,2.750199203187251,2.754581673306773,2.758964143426295,2.7633466135458167,2.7677290836653388,2.7721115537848604,2.7764940239043825,2.7808764940239046,2.785258964143426,2.7896414342629483,2.79402390438247,2.798406374501992,2.802788844621514,2.8071713147410358,2.811553784860558,2.8159362549800795,2.8203187250996016,2.8247011952191237,2.8290836653386453,2.8334661354581674,2.837848605577689,2.842231075697211,2.846613545816733,2.850996015936255,2.855378486055777,2.859760956175299,2.8641434262948207,2.8685258964143427,2.8729083665338644,2.8772908366533865,2.8816733067729086,2.88605577689243,2.8904382470119523,2.894820717131474,2.899203187250996,2.903585657370518,2.9079681274900397,2.912350597609562,2.9167330677290835,2.9211155378486056,2.9254980079681276,2.9298804780876493,2.9342629482071714,2.938645418326693,2.943027888446215,2.947410358565737,2.951792828685259,2.956175298804781,2.960557768924303,2.9649402390438246,2.9693227091633467,2.9737051792828684,2.9780876494023905,2.9824701195219125,2.986852589641434,2.9912350597609563,2.995617529880478,3.0]}
},{}],102:[function(require,module,exports){
module.exports={"expected":[-0.9283178,-0.9270833,-0.9258455,-0.9246045,-0.92336005,-0.9221122,-0.92086107,-0.9196065,-0.9183485,-0.917087,-0.9158221,-0.91455364,-0.9132816,-0.9120061,-0.91072696,-0.9094443,-0.90815794,-0.9068679,-0.90557426,-0.90427685,-0.90297574,-0.9016709,-0.9003622,-0.8990497,-0.8977334,-0.8964132,-0.8950891,-0.89376104,-0.89242905,-0.8910931,-0.8897531,-0.8884091,-0.88706094,-0.8857087,-0.8843523,-0.8829918,-0.8816271,-0.880258,-0.8788848,-0.8775072,-0.87612534,-0.87473905,-0.87334836,-0.87195325,-0.8705536,-0.8691495,-0.86774087,-0.8663276,-0.8649097,-0.8634871,-0.8620599,-0.8606279,-0.8591911,-0.8577495,-0.85630304,-0.8548517,-0.8533954,-0.8519341,-0.85046774,-0.84899634,-0.8475199,-0.84603816,-0.84455127,-0.8430591,-0.8415617,-0.8400589,-0.83855075,-0.8370371,-0.83551794,-0.83399326,-0.832463,-0.83092713,-0.8293855,-0.8278381,-0.82628495,-0.8247259,-0.823161,-0.82159007,-0.8200131,-0.81843007,-0.8168409,-0.8152455,-0.8136438,-0.8120358,-0.8104214,-0.8088006,-0.8071732,-0.80553925,-0.80389863,-0.8022513,-0.8005972,-0.7989362,-0.7972683,-0.79559326,-0.7939113,-0.7922221,-0.7905257,-0.78882194,-0.78711087,-0.7853923,-0.78366613,-0.78193235,-0.7801908,-0.77844155,-0.7766843,-0.7749191,-0.77314585,-0.7713644,-0.7695747,-0.7677766,-0.76597005,-0.764155,-0.7623312,-0.76049864,-0.7586572,-0.75680685,-0.75494736,-0.7530787,-0.7512007,-0.74931324,-0.7474162,-0.74550956,-0.74359304,-0.7416666,-0.7397302,-0.7377835,-0.7358265,-0.73385906,-0.73188096,-0.72989213,-0.72789246,-0.7258817,-0.7238597,-0.7218264,-0.7197815,-0.71772504,-0.71565664,-0.7135762,-0.7114836,-0.7093786,-0.7072611,-0.70513076,-0.7029875,-0.70083106,-0.69866127,-0.69647795,-0.69428086,-0.69206977,-0.6898444,-0.68760467,-0.6853502,-0.68308085,-0.68079627,-0.67849624,-0.67618054,-0.67384887,-0.6715009,-0.66913646,-0.6667552,-0.66435677,-0.6619409,-0.6595073,-0.65705556,-0.6545854,-0.65209645,-0.64958835,-0.64706075,-0.64451325,-0.6419454,-0.6393569,-0.6367473,-0.63411605,-0.6314628,-0.6287871,-0.6260884,-0.62336624,-0.62062013,-0.61784947,-0.6150537,-0.6122323,-0.60938466,-0.6065102,-0.6036082,-0.600678,-0.59771895,-0.5947303,-0.59171134,-0.5886612,-0.58557916,-0.5824643,-0.5793158,-0.57613266,-0.572914,-0.5696587,-0.56636584,-0.5630342,-0.55966264,-0.55625,-0.55279493,-0.54929614,-0.54575217,-0.5421616,-0.53852284,-0.5348342,-0.53109396,-0.5273003,-0.52345127,-0.5195448,-0.5155786,-0.5115505,-0.5074579,-0.5032983,-0.49906865,-0.49476612,-0.49038744,-0.4859291,-0.48138747,-0.47675845,-0.47203776,-0.4672207,-0.46230224,-0.45727682,-0.45213842,-0.44688052,-0.4414959,-0.43597662,-0.43031394,-0.42449817,-0.41851854,-0.41236296,-0.4060179,-0.3994681,-0.39269614,-0.3856822,-0.37840343,-0.3708333,-0.36294085,-0.3546893,-0.34603488,-0.33692443,-0.3272927,-0.31705803,-0.30611616,-0.2943306,-0.2815171,-0.2674171,-0.25164914,-0.23361035,-0.21224909,-0.18541665,-0.1471653,0.0,0.1471653,0.18541665,0.21224909,0.23361035,0.25164914,0.2674171,0.2815171,0.2943306,0.30611616,0.31705803,0.3272927,0.33692443,0.34603488,0.3546893,0.36294085,0.3708333,0.37840343,0.3856822,0.39269614,0.3994681,0.4060179,0.41236296,0.41851854,0.42449817,0.43031394,0.43597662,0.4414959,0.44688052,0.45213842,0.45727682,0.46230224,0.4672207,0.47203776,0.47675845,0.48138747,0.4859291,0.49038744,0.49476612,0.49906865,0.5032983,0.5074579,0.5115505,0.5155786,0.5195448,0.52345127,0.5273003,0.53109396,0.5348342,0.53852284,0.5421616,0.54575217,0.54929614,0.55279493,0.55625,0.55966264,0.5630342,0.56636584,0.5696587,0.572914,0.57613266,0.5793158,0.5824643,0.58557916,0.5886612,0.59171134,0.5947303,0.59771895,0.600678,0.6036082,0.6065102,0.60938466,0.6122323,0.6150537,0.61784947,0.62062013,0.62336624,0.6260884,0.6287871,0.6314628,0.63411605,0.6367473,0.6393569,0.6419454,0.64451325,0.64706075,0.64958835,0.65209645,0.6545854,0.65705556,0.6595073,0.6619409,0.66435677,0.6667552,0.66913646,0.6715009,0.67384887,0.67618054,0.67849624,0.68079627,0.68308085,0.6853502,0.68760467,0.6898444,0.69206977,0.69428086,0.69647795,0.69866127,0.70083106,0.7029875,0.70513076,0.7072611,0.7093786,0.7114836,0.7135762,0.71565664,0.71772504,0.7197815,0.7218264,0.7238597,0.7258817,0.72789246,0.72989213,0.73188096,0.73385906,0.7358265,0.7377835,0.7397302,0.7416666,0.74359304,0.74550956,0.7474162,0.74931324,0.7512007,0.7530787,0.75494736,0.75680685,0.7586572,0.76049864,0.7623312,0.764155,0.76597005,0.7677766,0.7695747,0.7713644,0.77314585,0.7749191,0.7766843,0.77844155,0.7801908,0.78193235,0.78366613,0.7853923,0.78711087,0.78882194,0.7905257,0.7922221,0.7939113,0.79559326,0.7972683,0.7989362,0.8005972,0.8022513,0.80389863,0.80553925,0.8071732,0.8088006,0.8104214,0.8120358,0.8136438,0.8152455,0.8168409,0.81843007,0.8200131,0.82159007,0.823161,0.8247259,0.82628495,0.8278381,0.8293855,0.83092713,0.832463,0.83399326,0.83551794,0.8370371,0.83855075,0.8400589,0.8415617,0.8430591,0.84455127,0.84603816,0.8475199,0.84899634,0.85046774,0.8519341,0.8533954,0.8548517,0.85630304,0.8577495,0.8591911,0.8606279,0.8620599,0.8634871,0.8649097,0.8663276,0.86774087,0.8691495,0.8705536,0.87195325,0.87334836,0.87473905,0.87612534,0.8775072,0.8788848,0.880258,0.8816271,0.8829918,0.8843523,0.8857087,0.88706094,0.8884091,0.8897531,0.8910931,0.89242905,0.89376104,0.8950891,0.8964132,0.8977334,0.8990497,0.9003622,0.9016709,0.90297574,0.90427685,0.90557426,0.9068679,0.90815794,0.9094443,0.91072696,0.9120061,0.9132816,0.91455364,0.9158221,0.917087,0.9183485,0.9196065,0.92086107,0.9221122,0.92336005,0.9246045,0.9258455,0.9270833,0.9283178],"x":[-0.8,-0.796812749003984,-0.7936254980079681,-0.7904382470119522,-0.7872509960159363,-0.7840637450199203,-0.7808764940239044,-0.7776892430278884,-0.7745019920318725,-0.7713147410358566,-0.7681274900398406,-0.7649402390438247,-0.7617529880478088,-0.7585657370517929,-0.7553784860557768,-0.7521912350597609,-0.749003984063745,-0.7458167330677291,-0.7426294820717132,-0.7394422310756972,-0.7362549800796813,-0.7330677290836654,-0.7298804780876494,-0.7266932270916334,-0.7235059760956175,-0.7203187250996016,-0.7171314741035857,-0.7139442231075698,-0.7107569721115538,-0.7075697211155378,-0.7043824701195219,-0.701195219123506,-0.69800796812749,-0.6948207171314741,-0.6916334661354582,-0.6884462151394423,-0.6852589641434262,-0.6820717131474103,-0.6788844621513944,-0.6756972111553785,-0.6725099601593626,-0.6693227091633466,-0.6661354581673307,-0.6629482071713148,-0.6597609561752988,-0.6565737051792828,-0.6533864541832669,-0.650199203187251,-0.6470119521912351,-0.6438247011952192,-0.6406374501992032,-0.6374501992031872,-0.6342629482071713,-0.6310756972111554,-0.6278884462151394,-0.6247011952191235,-0.6215139442231076,-0.6183266932270917,-0.6151394422310758,-0.6119521912350597,-0.6087649402390438,-0.6055776892430279,-0.602390438247012,-0.599203187250996,-0.5960159362549801,-0.5928286852589641,-0.5896414342629482,-0.5864541832669322,-0.5832669322709163,-0.5800796812749004,-0.5768924302788845,-0.5737051792828686,-0.5705179282868525,-0.5673306772908366,-0.5641434262948207,-0.5609561752988048,-0.5577689243027888,-0.5545816733067729,-0.551394422310757,-0.5482071713147411,-0.5450199203187251,-0.5418326693227091,-0.5386454183266932,-0.5354581673306773,-0.5322709163346614,-0.5290836653386454,-0.5258964143426295,-0.5227091633466135,-0.5195219123505976,-0.5163346613545817,-0.5131474103585657,-0.5099601593625498,-0.5067729083665339,-0.503585657370518,-0.500398406374502,-0.49721115537848604,-0.4940239043824701,-0.49083665338645416,-0.48764940239043825,-0.48446215139442234,-0.48127490039840637,-0.47808764940239046,-0.4749003984063745,-0.4717131474103586,-0.4685258964143426,-0.4653386454183267,-0.46215139442231074,-0.4589641434262948,-0.45577689243027886,-0.45258964143426295,-0.44940239043824703,-0.44621513944223107,-0.44302788844621516,-0.4398406374501992,-0.4366533864541833,-0.4334661354581673,-0.4302788844621514,-0.42709163346613543,-0.4239043824701195,-0.4207171314741036,-0.41752988047808764,-0.41434262948207173,-0.41115537848605577,-0.40796812749003986,-0.4047808764940239,-0.401593625498008,-0.398406374501992,-0.3952191235059761,-0.39203187250996013,-0.3888446215139442,-0.3856573705179283,-0.38247011952191234,-0.37928286852589643,-0.37609561752988047,-0.37290836653386455,-0.3697211155378486,-0.3665338645418327,-0.3633466135458167,-0.3601593625498008,-0.3569721115537849,-0.3537848605577689,-0.350597609561753,-0.34741035856573704,-0.34422310756972113,-0.34103585657370517,-0.33784860557768925,-0.3346613545816733,-0.3314741035856574,-0.3282868525896414,-0.3250996015936255,-0.3219123505976096,-0.3187250996015936,-0.3155378486055777,-0.31235059760956174,-0.30916334661354583,-0.30597609561752986,-0.30278884462151395,-0.299601593625498,-0.2964143426294821,-0.2932270916334661,-0.2900398406374502,-0.2868525896414343,-0.2836653386454183,-0.2804780876494024,-0.27729083665338644,-0.27410358565737053,-0.27091633466135456,-0.26772908366533865,-0.2645418326693227,-0.2613545816733068,-0.25816733067729086,-0.2549800796812749,-0.251792828685259,-0.24860557768924302,-0.24541832669322708,-0.24223107569721117,-0.23904382470119523,-0.2358565737051793,-0.23266932270916335,-0.2294820717131474,-0.22629482071713147,-0.22310756972111553,-0.2199203187250996,-0.21673306772908366,-0.21354581673306772,-0.2103585657370518,-0.20717131474103587,-0.20398406374501993,-0.200796812749004,-0.19760956175298805,-0.1944223107569721,-0.19123505976095617,-0.18804780876494023,-0.1848605577689243,-0.18167330677290836,-0.17848605577689244,-0.1752988047808765,-0.17211155378486057,-0.16892430278884463,-0.1657370517928287,-0.16254980079681275,-0.1593625498007968,-0.15617529880478087,-0.15298804780876493,-0.149800796812749,-0.14661354581673305,-0.14342629482071714,-0.1402390438247012,-0.13705179282868526,-0.13386454183266933,-0.1306772908366534,-0.12749003984063745,-0.12430278884462151,-0.12111553784860558,-0.11792828685258964,-0.1147410358565737,-0.11155378486055777,-0.10836653386454183,-0.1051792828685259,-0.10199203187250996,-0.09880478087649402,-0.09561752988047809,-0.09243027888446215,-0.08924302788844622,-0.08605577689243028,-0.08286852589641434,-0.0796812749003984,-0.07649402390438247,-0.07330677290836653,-0.0701195219123506,-0.06693227091633466,-0.06374501992031872,-0.06055776892430279,-0.05737051792828685,-0.054183266932270914,-0.05099601593625498,-0.04780876494023904,-0.04462151394422311,-0.04143426294820717,-0.03824701195219123,-0.0350597609561753,-0.03187250996015936,-0.028685258964143426,-0.02549800796812749,-0.022310756972111555,-0.019123505976095617,-0.01593625498007968,-0.012749003984063745,-0.009561752988047808,-0.006374501992031873,-0.0031872509960159364,0.0,0.0031872509960159364,0.006374501992031873,0.009561752988047808,0.012749003984063745,0.01593625498007968,0.019123505976095617,0.022310756972111555,0.02549800796812749,0.028685258964143426,0.03187250996015936,0.0350597609561753,0.03824701195219123,0.04143426294820717,0.04462151394422311,0.04780876494023904,0.05099601593625498,0.054183266932270914,0.05737051792828685,0.06055776892430279,0.06374501992031872,0.06693227091633466,0.0701195219123506,0.07330677290836653,0.07649402390438247,0.0796812749003984,0.08286852589641434,0.08605577689243028,0.08924302788844622,0.09243027888446215,0.09561752988047809,0.09880478087649402,0.10199203187250996,0.1051792828685259,0.10836653386454183,0.11155378486055777,0.1147410358565737,0.11792828685258964,0.12111553784860558,0.12430278884462151,0.12749003984063745,0.1306772908366534,0.13386454183266933,0.13705179282868526,0.1402390438247012,0.14342629482071714,0.14661354581673305,0.149800796812749,0.15298804780876493,0.15617529880478087,0.1593625498007968,0.16254980079681275,0.1657370517928287,0.16892430278884463,0.17211155378486057,0.1752988047808765,0.17848605577689244,0.18167330677290836,0.1848605577689243,0.18804780876494023,0.19123505976095617,0.1944223107569721,0.19760956175298805,0.200796812749004,0.20398406374501993,0.20717131474103587,0.2103585657370518,0.21354581673306772,0.21673306772908366,0.2199203187250996,0.22310756972111553,0.22629482071713147,0.2294820717131474,0.23266932270916335,0.2358565737051793,0.23904382470119523,0.24223107569721117,0.24541832669322708,0.24860557768924302,0.251792828685259,0.2549800796812749,0.25816733067729086,0.2613545816733068,0.2645418326693227,0.26772908366533865,0.27091633466135456,0.27410358565737053,0.27729083665338644,0.2804780876494024,0.2836653386454183,0.2868525896414343,0.2900398406374502,0.2932270916334661,0.2964143426294821,0.299601593625498,0.30278884462151395,0.30597609561752986,0.30916334661354583,0.31235059760956174,0.3155378486055777,0.3187250996015936,0.3219123505976096,0.3250996015936255,0.3282868525896414,0.3314741035856574,0.3346613545816733,0.33784860557768925,0.34103585657370517,0.34422310756972113,0.34741035856573704,0.350597609561753,0.3537848605577689,0.3569721115537849,0.3601593625498008,0.3633466135458167,0.3665338645418327,0.3697211155378486,0.37290836653386455,0.37609561752988047,0.37928286852589643,0.38247011952191234,0.3856573705179283,0.3888446215139442,0.39203187250996013,0.3952191235059761,0.398406374501992,0.401593625498008,0.4047808764940239,0.40796812749003986,0.41115537848605577,0.41434262948207173,0.41752988047808764,0.4207171314741036,0.4239043824701195,0.42709163346613543,0.4302788844621514,0.4334661354581673,0.4366533864541833,0.4398406374501992,0.44302788844621516,0.44621513944223107,0.44940239043824703,0.45258964143426295,0.45577689243027886,0.4589641434262948,0.46215139442231074,0.4653386454183267,0.4685258964143426,0.4717131474103586,0.4749003984063745,0.47808764940239046,0.48127490039840637,0.48446215139442234,0.48764940239043825,0.49083665338645416,0.4940239043824701,0.49721115537848604,0.500398406374502,0.503585657370518,0.5067729083665339,0.5099601593625498,0.5131474103585657,0.5163346613545817,0.5195219123505976,0.5227091633466135,0.5258964143426295,0.5290836653386454,0.5322709163346614,0.5354581673306773,0.5386454183266932,0.5418326693227091,0.5450199203187251,0.5482071713147411,0.551394422310757,0.5545816733067729,0.5577689243027888,0.5609561752988048,0.5641434262948207,0.5673306772908366,0.5705179282868525,0.5737051792828686,0.5768924302788845,0.5800796812749004,0.5832669322709163,0.5864541832669322,0.5896414342629482,0.5928286852589641,0.5960159362549801,0.599203187250996,0.602390438247012,0.6055776892430279,0.6087649402390438,0.6119521912350597,0.6151394422310758,0.6183266932270917,0.6215139442231076,0.6247011952191235,0.6278884462151394,0.6310756972111554,0.6342629482071713,0.6374501992031872,0.6406374501992032,0.6438247011952192,0.6470119521912351,0.650199203187251,0.6533864541832669,0.6565737051792828,0.6597609561752988,0.6629482071713148,0.6661354581673307,0.6693227091633466,0.6725099601593626,0.6756972111553785,0.6788844621513944,0.6820717131474103,0.6852589641434262,0.6884462151394423,0.6916334661354582,0.6948207171314741,0.69800796812749,0.701195219123506,0.7043824701195219,0.7075697211155378,0.7107569721115538,0.7139442231075698,0.7171314741035857,0.7203187250996016,0.7235059760956175,0.7266932270916334,0.7298804780876494,0.7330677290836654,0.7362549800796813,0.7394422310756972,0.7426294820717132,0.7458167330677291,0.749003984063745,0.7521912350597609,0.7553784860557768,0.7585657370517929,0.7617529880478088,0.7649402390438247,0.7681274900398406,0.7713147410358566,0.7745019920318725,0.7776892430278884,0.7808764940239044,0.7840637450199203,0.7872509960159363,0.7904382470119522,0.7936254980079681,0.796812749003984,0.8]}
},{}],103:[function(require,module,exports){
module.exports={"expected":[1.00000005e-13,9.9933543e-14,9.9867034e-14,9.980039e-14,9.9733705e-14,9.9666884e-14,9.9599975e-14,9.953302e-14,9.946593e-14,9.9398795e-14,9.933152e-14,9.9264204e-14,9.919675e-14,9.912925e-14,9.906161e-14,9.899387e-14,9.8926096e-14,9.885818e-14,9.879022e-14,9.872211e-14,9.865396e-14,9.858566e-14,9.8517325e-14,9.8448844e-14,9.838026e-14,9.831164e-14,9.8242866e-14,9.8174046e-14,9.8105084e-14,9.8036074e-14,9.7966916e-14,9.7897656e-14,9.7828355e-14,9.77589e-14,9.76894e-14,9.761975e-14,9.755005e-14,9.74802e-14,9.741029e-14,9.734025e-14,9.727009e-14,9.719989e-14,9.712953e-14,9.705913e-14,9.698857e-14,9.691796e-14,9.684719e-14,9.6776374e-14,9.67054e-14,9.663432e-14,9.656319e-14,9.6491906e-14,9.6420566e-14,9.634907e-14,9.627751e-14,9.6205806e-14,9.6133984e-14,9.6062115e-14,9.5990077e-14,9.591799e-14,9.584574e-14,9.577343e-14,9.570096e-14,9.5628434e-14,9.5555745e-14,9.548295e-14,9.541009e-14,9.533707e-14,9.5263986e-14,9.519074e-14,9.511743e-14,9.504396e-14,9.4970425e-14,9.4896726e-14,9.482291e-14,9.474903e-14,9.467499e-14,9.4600875e-14,9.45266e-14,9.445226e-14,9.4377746e-14,9.430311e-14,9.422842e-14,9.415355e-14,9.407862e-14,9.400351e-14,9.392834e-14,9.385299e-14,9.377758e-14,9.370199e-14,9.362628e-14,9.35505e-14,9.347454e-14,9.3398515e-14,9.332231e-14,9.324603e-14,9.316958e-14,9.309305e-14,9.301634e-14,9.293951e-14,9.28626e-14,9.2785514e-14,9.270835e-14,9.263101e-14,9.255359e-14,9.247598e-14,9.239825e-14,9.232044e-14,9.224244e-14,9.216437e-14,9.20861e-14,9.200776e-14,9.192923e-14,9.1850626e-14,9.1771825e-14,9.1692895e-14,9.161388e-14,9.153467e-14,9.145538e-14,9.13759e-14,9.1296335e-14,9.121658e-14,9.1136734e-14,9.10567e-14,9.0976516e-14,9.089625e-14,9.081579e-14,9.073523e-14,9.065449e-14,9.0573646e-14,9.049261e-14,9.041142e-14,9.0330155e-14,9.024868e-14,9.016711e-14,9.0085335e-14,9.000347e-14,8.9921404e-14,8.983924e-14,8.975687e-14,8.967435e-14,8.959173e-14,8.95089e-14,8.942598e-14,8.9342847e-14,8.9259614e-14,8.9176164e-14,8.909262e-14,8.9008865e-14,8.892495e-14,8.884093e-14,8.875669e-14,8.8672356e-14,8.85878e-14,8.850314e-14,8.841826e-14,8.833322e-14,8.824807e-14,8.81627e-14,8.807722e-14,8.799152e-14,8.79057e-14,8.7819664e-14,8.773352e-14,8.7647134e-14,8.756059e-14,8.7473926e-14,8.7387034e-14,8.7300033e-14,8.721279e-14,8.7125436e-14,8.7037846e-14,8.695014e-14,8.68622e-14,8.6774073e-14,8.668583e-14,8.6597355e-14,8.650875e-14,8.6419905e-14,8.633094e-14,8.624173e-14,8.615233e-14,8.606281e-14,8.5973045e-14,8.5883144e-14,8.5793e-14,8.5702726e-14,8.56122e-14,8.552154e-14,8.543063e-14,8.5339525e-14,8.524829e-14,8.5156796e-14,8.506517e-14,8.4973275e-14,8.4881246e-14,8.478896e-14,8.469653e-14,8.460384e-14,8.451094e-14,8.4417906e-14,8.4324596e-14,8.4231145e-14,8.413742e-14,8.404356e-14,8.3949415e-14,8.3855056e-14,8.376056e-14,8.3665774e-14,8.3570846e-14,8.347563e-14,8.338027e-14,8.328462e-14,8.318882e-14,8.309273e-14,8.2996415e-14,8.289995e-14,8.280318e-14,8.270626e-14,8.260905e-14,8.251167e-14,8.2413995e-14,8.231615e-14,8.221801e-14,8.2119634e-14,8.202109e-14,8.1922235e-14,8.182321e-14,8.172389e-14,8.1624384e-14,8.152457e-14,8.1424505e-14,8.132427e-14,8.122371e-14,8.112298e-14,8.102193e-14,8.092069e-14,8.081912e-14,8.0717375e-14,8.06153e-14,8.051296e-14,8.0410444e-14,8.030758e-14,8.020453e-14,8.010114e-14,7.999756e-14,7.989364e-14,7.9789514e-14,7.9685045e-14,7.9580304e-14,7.947535e-14,7.937006e-14,7.926456e-14,7.915869e-14,7.905262e-14,7.8946195e-14,7.883948e-14,7.8732546e-14,7.862525e-14,7.851773e-14,7.840985e-14,7.830174e-14,7.819325e-14,7.8084545e-14,7.7975454e-14,7.786606e-14,7.775643e-14,7.764641e-14,7.753616e-14,7.742552e-14,7.731464e-14,7.720337e-14,7.709184e-14,7.697992e-14,7.686767e-14,7.675517e-14,7.664226e-14,7.6529095e-14,7.641551e-14,7.6301677e-14,7.6187415e-14,7.6072815e-14,7.5957944e-14,7.5842646e-14,7.5727077e-14,7.5611074e-14,7.54948e-14,7.537808e-14,7.526107e-14,7.514363e-14,7.5025815e-14,7.4907704e-14,7.478915e-14,7.467029e-14,7.4550975e-14,7.443135e-14,7.4311264e-14,7.419088e-14,7.407001e-14,7.394874e-14,7.382716e-14,7.3705094e-14,7.3582714e-14,7.3459834e-14,7.333663e-14,7.321291e-14,7.3088786e-14,7.2964326e-14,7.2839345e-14,7.2714024e-14,7.258819e-14,7.2461995e-14,7.233527e-14,7.22082e-14,7.208058e-14,7.1952515e-14,7.182408e-14,7.169509e-14,7.1565726e-14,7.1435804e-14,7.13055e-14,7.117462e-14,7.104336e-14,7.091151e-14,7.077917e-14,7.064643e-14,7.0513094e-14,7.0379344e-14,7.024499e-14,7.011022e-14,6.997483e-14,6.983891e-14,6.970256e-14,6.9565576e-14,6.942815e-14,6.929008e-14,6.915155e-14,6.9012375e-14,6.887273e-14,6.8732414e-14,6.859153e-14,6.8450155e-14,6.83081e-14,6.8165546e-14,6.80223e-14,6.7878544e-14,6.773408e-14,6.7589096e-14,6.7443386e-14,6.729704e-14,6.715016e-14,6.7002536e-14,6.685436e-14,6.670542e-14,6.655591e-14,6.640562e-14,6.625465e-14,6.61031e-14,6.5950744e-14,6.5797784e-14,6.5644e-14,6.548961e-14,6.5334375e-14,6.517851e-14,6.502178e-14,6.486429e-14,6.470615e-14,6.4547116e-14,6.4387406e-14,6.422679e-14,6.406548e-14,6.390324e-14,6.3740286e-14,6.3576375e-14,6.3411624e-14,6.324612e-14,6.3079635e-14,6.2912376e-14,6.274411e-14,6.2575054e-14,6.240496e-14,6.2233937e-14,6.2062084e-14,6.188916e-14,6.171538e-14,6.1540494e-14,6.136473e-14,6.118784e-14,6.1010035e-14,6.083107e-14,6.0651035e-14,6.0470055e-14,6.028786e-14,6.0104685e-14,5.992026e-14,5.9734823e-14,5.954809e-14,5.936032e-14,5.9171214e-14,5.898089e-14,5.8789474e-14,5.8596655e-14,5.8402705e-14,5.820732e-14,5.8010745e-14,5.7812696e-14,5.7613284e-14,5.741262e-14,5.7210394e-14,5.700688e-14,5.6801755e-14,5.6595282e-14,5.638715e-14,5.6177614e-14,5.5966354e-14,5.5753487e-14,5.5539134e-14,5.5322957e-14,5.5105236e-14,5.4885624e-14,5.46644e-14,5.444121e-14,5.4216333e-14,5.3989416e-14,5.3760575e-14,5.352993e-14,5.329712e-14,5.306242e-14,5.282546e-14,5.2586523e-14,5.2345227e-14,5.210168e-14,5.1856014e-14,5.160782e-14,5.1357393e-14,5.110432e-14,5.0848896e-14,5.05907e-14,5.033002e-14,5.006643e-14,4.9800035e-14,4.9530946e-14,4.925871e-14,4.8983627e-14,4.870522e-14,4.8423796e-14,4.8138858e-14,4.785071e-14,4.7558847e-14,4.726335e-14,4.6964328e-14,4.6661232e-14,4.6354366e-14,4.6043163e-14,4.5727914e-14,4.5408034e-14,4.5083583e-14,4.4754626e-14,4.4420522e-14,4.408156e-14,4.3737054e-14,4.3387287e-14,4.303153e-14,4.2670054e-14,4.2302082e-14,4.1927596e-14,4.154657e-14,4.1158144e-14,4.076253e-14,4.0358796e-14,3.994711e-14,3.9526464e-14,3.909697e-14,3.8657516e-14,3.8207837e-14,3.7747644e-14,3.7275613e-14,3.679166e-14,3.629427e-14,3.578323e-14,3.525678e-14,3.4714124e-14,3.415435e-14,3.3575183e-14,3.2975748e-14,3.235324e-14,3.1706276e-14,3.1031286e-14,3.0326087e-14,2.958594e-14,2.880678e-14,2.7983624e-14,2.7108326e-14,2.617321e-14,2.5165288e-14,2.4070235e-14,2.2864404e-14,2.15169e-14,1.9974287e-14,1.814749e-14,1.5854532e-14,1.258375e-14,1.1190347e-15],"x":[1.0e-39,9.980079701195219e-40,9.960159402390438e-40,9.940239103585657e-40,9.920318804780877e-40,9.900398505976094e-40,9.880478207171314e-40,9.860557908366533e-40,9.840637609561752e-40,9.820717310756971e-40,9.80079701195219e-40,9.78087671314741e-40,9.76095641434263e-40,9.741036115537849e-40,9.721115816733066e-40,9.701195517928286e-40,9.681275219123505e-40,9.661354920318724e-40,9.641434621513944e-40,9.621514322709163e-40,9.601594023904382e-40,9.581673725099602e-40,9.56175342629482e-40,9.541833127490039e-40,9.521912828685258e-40,9.501992529880477e-40,9.482072231075697e-40,9.462151932270916e-40,9.442231633466135e-40,9.422311334661354e-40,9.402391035856574e-40,9.382470737051791e-40,9.36255043824701e-40,9.34263013944223e-40,9.32270984063745e-40,9.302789541832669e-40,9.282869243027888e-40,9.262948944223107e-40,9.243028645418327e-40,9.223108346613546e-40,9.203188047808764e-40,9.183267749003983e-40,9.163347450199202e-40,9.143427151394422e-40,9.123506852589641e-40,9.10358655378486e-40,9.08366625498008e-40,9.063745956175299e-40,9.043825657370516e-40,9.023905358565736e-40,9.003985059760955e-40,8.984064760956174e-40,8.964144462151394e-40,8.944224163346613e-40,8.924303864541832e-40,8.904383565737052e-40,8.884463266932271e-40,8.864542968127489e-40,8.844622669322708e-40,8.824702370517927e-40,8.804782071713147e-40,8.784861772908366e-40,8.764941474103585e-40,8.745021175298805e-40,8.725100876494024e-40,8.705180577689243e-40,8.685260278884461e-40,8.66533998007968e-40,8.6454196812749e-40,8.625499382470119e-40,8.605579083665338e-40,8.585658784860557e-40,8.565738486055777e-40,8.545818187250996e-40,8.525897888446215e-40,8.505977589641433e-40,8.486057290836652e-40,8.466136992031872e-40,8.446216693227091e-40,8.42629639442231e-40,8.40637609561753e-40,8.386455796812749e-40,8.366535498007968e-40,8.346615199203186e-40,8.326694900398405e-40,8.306774601593624e-40,8.286854302788844e-40,8.266934003984063e-40,8.247013705179282e-40,8.227093406374502e-40,8.207173107569721e-40,8.18725280876494e-40,8.167332509960158e-40,8.147412211155377e-40,8.127491912350597e-40,8.107571613545816e-40,8.087651314741035e-40,8.067731015936255e-40,8.047810717131474e-40,8.027890418326693e-40,8.007970119521913e-40,7.98804982071713e-40,7.96812952191235e-40,7.948209223107569e-40,7.928288924302788e-40,7.908368625498007e-40,7.888448326693227e-40,7.868528027888446e-40,7.848607729083665e-40,7.828687430278885e-40,7.808767131474102e-40,7.788846832669322e-40,7.768926533864541e-40,7.74900623505976e-40,7.72908593625498e-40,7.709165637450199e-40,7.689245338645418e-40,7.669325039840638e-40,7.649404741035855e-40,7.629484442231075e-40,7.609564143426294e-40,7.589643844621513e-40,7.569723545816733e-40,7.549803247011952e-40,7.529882948207171e-40,7.50996264940239e-40,7.49004235059761e-40,7.470122051792827e-40,7.450201752988047e-40,7.430281454183266e-40,7.410361155378485e-40,7.390440856573705e-40,7.370520557768924e-40,7.350600258964143e-40,7.330679960159362e-40,7.310759661354581e-40,7.2908393625498004e-40,7.27091906374502e-40,7.250998764940238e-40,7.2310784661354575e-40,7.211158167330677e-40,7.191237868525896e-40,7.171317569721115e-40,7.151397270916334e-40,7.131476972111553e-40,7.111556673306773e-40,7.091636374501992e-40,7.0717160756972104e-40,7.05179577689243e-40,7.031875478087649e-40,7.011955179282868e-40,6.992034880478087e-40,6.972114581673306e-40,6.9521942828685255e-40,6.932273984063745e-40,6.912353685258963e-40,6.8924333864541826e-40,6.872513087649402e-40,6.852592788844621e-40,6.8326724900398405e-40,6.812752191235059e-40,6.792831892430278e-40,6.772911593625498e-40,6.752991294820717e-40,6.7330709960159354e-40,6.713150697211155e-40,6.693230398406374e-40,6.673310099601593e-40,6.653389800796812e-40,6.633469501992031e-40,6.6135492031872505e-40,6.59362890438247e-40,6.573708605577689e-40,6.553788306772908e-40,6.533868007968127e-40,6.513947709163346e-40,6.4940274103585656e-40,6.474107111553784e-40,6.454186812749003e-40,6.434266513944223e-40,6.414346215139442e-40,6.394425916334661e-40,6.37450561752988e-40,6.354585318725099e-40,6.3346650199203184e-40,6.314744721115538e-40,6.294824422310756e-40,6.2749041235059755e-40,6.254983824701195e-40,6.235063525896414e-40,6.215143227091633e-40,6.195222928286852e-40,6.175302629482071e-40,6.155382330677291e-40,6.13546203187251e-40,6.115541733067728e-40,6.095621434262948e-40,6.075701135458167e-40,6.055780836653386e-40,6.035860537848605e-40,6.015940239043824e-40,5.9960199402390435e-40,5.976099641434263e-40,5.956179342629481e-40,5.9362590438247006e-40,5.91633874501992e-40,5.896418446215139e-40,5.8764981474103585e-40,5.856577848605577e-40,5.836657549800796e-40,5.816737250996016e-40,5.796816952191235e-40,5.7768966533864534e-40,5.756976354581673e-40,5.737056055776892e-40,5.717135756972111e-40,5.69721545816733e-40,5.677295159362549e-40,5.6573748605577685e-40,5.637454561752988e-40,5.617534262948207e-40,5.597613964143426e-40,5.577693665338645e-40,5.557773366533864e-40,5.5378530677290836e-40,5.517932768924302e-40,5.498012470119521e-40,5.478092171314741e-40,5.45817187250996e-40,5.438251573705179e-40,5.418331274900398e-40,5.398410976095617e-40,5.3784906772908364e-40,5.358570378486056e-40,5.338650079681274e-40,5.3187297808764935e-40,5.298809482071713e-40,5.278889183266932e-40,5.258968884462151e-40,5.23904858565737e-40,5.219128286852589e-40,5.199207988047809e-40,5.179287689243028e-40,5.159367390438246e-40,5.139447091633466e-40,5.119526792828685e-40,5.099606494023904e-40,5.079686195219123e-40,5.059765896414342e-40,5.0398455976095615e-40,5.019925298804781e-40,5.000004999999999e-40,4.9800847011952186e-40,4.960164402390438e-40,4.940244103585657e-40,4.9203238047808765e-40,4.900403505976095e-40,4.880483207171314e-40,4.860562908366534e-40,4.840642609561753e-40,4.8207223107569714e-40,4.800802011952191e-40,4.78088171314741e-40,4.760961414342629e-40,4.741041115537848e-40,4.721120816733067e-40,4.7012005179282865e-40,4.681280219123506e-40,4.661359920318725e-40,4.641439621513944e-40,4.621519322709163e-40,4.601599023904382e-40,4.5816787250996016e-40,4.56175842629482e-40,4.541838127490039e-40,4.521917828685259e-40,4.501997529880478e-40,4.482077231075697e-40,4.462156932270916e-40,4.442236633466135e-40,4.4223163346613544e-40,4.402396035856574e-40,4.382475737051792e-40,4.3625554382470115e-40,4.342635139442231e-40,4.32271484063745e-40,4.302794541832669e-40,4.282874243027888e-40,4.262953944223107e-40,4.243033645418327e-40,4.223113346613546e-40,4.203193047808764e-40,4.183272749003984e-40,4.163352450199203e-40,4.143432151394422e-40,4.123511852589641e-40,4.10359155378486e-40,4.0836712549800795e-40,4.063750956175299e-40,4.043830657370517e-40,4.0239103585657366e-40,4.003990059760956e-40,3.984069760956175e-40,3.9641494621513945e-40,3.944229163346613e-40,3.924308864541832e-40,3.904388565737052e-40,3.884468266932271e-40,3.8645479681274894e-40,3.844627669322709e-40,3.824707370517928e-40,3.804787071713147e-40,3.784866772908366e-40,3.764946474103585e-40,3.7450261752988045e-40,3.725105876494024e-40,3.705185577689243e-40,3.685265278884462e-40,3.665344980079681e-40,3.6454246812749002e-40,3.625504382470119e-40,3.6055840836653385e-40,3.5856637848605574e-40,3.5657434860557767e-40,3.5458231872509956e-40,3.525902888446215e-40,3.505982589641434e-40,3.486062290836653e-40,3.4661419920318724e-40,3.4462216932270913e-40,3.4263013944223106e-40,3.4063810956175295e-40,3.386460796812749e-40,3.3665404980079678e-40,3.346620199203187e-40,3.326699900398406e-40,3.3067796015936253e-40,3.286859302788844e-40,3.2669390039840635e-40,3.247018705179283e-40,3.2270984063745017e-40,3.207178107569721e-40,3.18725780876494e-40,3.1673375099601592e-40,3.147417211155378e-40,3.1274969123505975e-40,3.1075766135458164e-40,3.0876563147410357e-40,3.0677360159362546e-40,3.047815717131474e-40,3.027895418326693e-40,3.007975119521912e-40,2.9880548207171314e-40,2.9681345219123503e-40,2.9482142231075696e-40,2.9282939243027885e-40,2.908373625498008e-40,2.8884533266932268e-40,2.868533027888446e-40,2.848612729083665e-40,2.8286924302788843e-40,2.808772131474103e-40,2.7888518326693225e-40,2.768931533864542e-40,2.7490112350597607e-40,2.72909093625498e-40,2.709170637450199e-40,2.6892503386454182e-40,2.669330039840637e-40,2.6494097410358565e-40,2.6294894422310754e-40,2.6095691434262947e-40,2.5896488446215136e-40,2.569728545816733e-40,2.549808247011952e-40,2.529887948207171e-40,2.5099676494023904e-40,2.4900473505976093e-40,2.4701270517928286e-40,2.4502067529880475e-40,2.430286454183267e-40,2.4103661553784858e-40,2.390445856573705e-40,2.370525557768924e-40,2.3506052589641433e-40,2.330684960159362e-40,2.3107646613545815e-40,2.290844362549801e-40,2.2709240637450197e-40,2.251003764940239e-40,2.231083466135458e-40,2.2111631673306772e-40,2.191242868525896e-40,2.1713225697211155e-40,2.1514022709163344e-40,2.1314819721115537e-40,2.1115616733067726e-40,2.091641374501992e-40,2.071721075697211e-40,2.05180077689243e-40,2.0318804780876494e-40,2.0119601792828683e-40,1.9920398804780876e-40,1.9721195816733065e-40,1.952199282868526e-40,1.9322789840637448e-40,1.912358685258964e-40,1.892438386454183e-40,1.8725180876494023e-40,1.852597788844621e-40,1.8326774900398405e-40,1.8127571912350596e-40,1.7928368924302787e-40,1.7729165936254978e-40,1.752996294820717e-40,1.733075996015936e-40,1.7131556972111553e-40,1.6932353984063745e-40,1.6733150996015936e-40,1.6533948007968127e-40,1.6334745019920318e-40,1.6135542031872509e-40,1.59363390438247e-40,1.5737136055776891e-40,1.5537933067729082e-40,1.5338730079681273e-40,1.5139527091633464e-40,1.4940324103585655e-40,1.4741121115537848e-40,1.454191812749004e-40,1.434271513944223e-40,1.4143512151394422e-40,1.3944309163346613e-40,1.3745106175298804e-40,1.3545903187250995e-40,1.3346700199203186e-40,1.3147497211155377e-40,1.2948294223107568e-40,1.274909123505976e-40,1.254988824701195e-40,1.2350685258964143e-40,1.2151482270916335e-40,1.1952279282868526e-40,1.1753076294820717e-40,1.1553873306772908e-40,1.1354670318725099e-40,1.115546733067729e-40,1.095626434262948e-40,1.0757061354581672e-40,1.0557858366533863e-40,1.0358655378486054e-40,1.0159452390438245e-40,9.960249402390438e-41,9.76104641434263e-41,9.56184342629482e-41,9.362640438247012e-41,9.163437450199203e-41,8.964234462151394e-41,8.765031474103585e-41,8.565828486055776e-41,8.366625498007967e-41,8.167422509960159e-41,7.96821952191235e-41,7.769016533864541e-41,7.569813545816732e-41,7.370610557768924e-41,7.171407569721115e-41,6.972204581673307e-41,6.773001593625498e-41,6.573798605577689e-41,6.37459561752988e-41,6.175392629482071e-41,5.976189641434262e-41,5.776986653386454e-41,5.577783665338645e-41,5.378580677290836e-41,5.179377689243027e-41,4.980174701195219e-41,4.78097171314741e-41,4.581768725099601e-41,4.382565737051793e-41,4.183362749003984e-41,3.984159760956175e-41,3.7849567729083665e-41,3.5857537848605576e-41,3.3865507968127487e-41,3.1873478087649403e-41,2.9881448207171313e-41,2.7889418326693224e-41,2.589738844621514e-41,2.390535856573705e-41,2.1913328685258962e-41,1.9921298804780875e-41,1.7929268924302788e-41,1.59372390438247e-41,1.3945209163346613e-41,1.1953179282868526e-41,9.961149402390438e-42,7.96911952191235e-42,5.977089641434262e-42,3.985059760956175e-42,1.9930298804780875e-42,1.0e-45]}
},{}],104:[function(require,module,exports){
module.exports={"expected":[-1.0e-10,-9.9933554e-11,-9.986702e-11,-9.98004e-11,-9.973369e-11,-9.9666886e-11,-9.9599995e-11,-9.9533014e-11,-9.946594e-11,-9.939878e-11,-9.933153e-11,-9.926419e-11,-9.9196755e-11,-9.9129226e-11,-9.9061606e-11,-9.8993896e-11,-9.892609e-11,-9.885819e-11,-9.8790205e-11,-9.872212e-11,-9.865394e-11,-9.858567e-11,-9.85173e-11,-9.844884e-11,-9.838028e-11,-9.831163e-11,-9.824288e-11,-9.817403e-11,-9.810509e-11,-9.803605e-11,-9.796691e-11,-9.789768e-11,-9.782835e-11,-9.775892e-11,-9.7689384e-11,-9.761976e-11,-9.755003e-11,-9.74802e-11,-9.7410274e-11,-9.734024e-11,-9.727011e-11,-9.719988e-11,-9.712955e-11,-9.705912e-11,-9.698858e-11,-9.691794e-11,-9.68472e-11,-9.677635e-11,-9.6705394e-11,-9.663434e-11,-9.656318e-11,-9.649192e-11,-9.6420545e-11,-9.6349075e-11,-9.627749e-11,-9.620581e-11,-9.613401e-11,-9.60621e-11,-9.59901e-11,-9.5917975e-11,-9.584575e-11,-9.577341e-11,-9.570097e-11,-9.562841e-11,-9.5555744e-11,-9.548297e-11,-9.541008e-11,-9.533708e-11,-9.526397e-11,-9.5190744e-11,-9.511741e-11,-9.504396e-11,-9.497039e-11,-9.4896715e-11,-9.482293e-11,-9.4749014e-11,-9.4675e-11,-9.4600855e-11,-9.45266e-11,-9.445223e-11,-9.437774e-11,-9.4303135e-11,-9.422841e-11,-9.415357e-11,-9.40786e-11,-9.400352e-11,-9.3928317e-11,-9.3852995e-11,-9.377755e-11,-9.3701984e-11,-9.3626294e-11,-9.355049e-11,-9.347455e-11,-9.339849e-11,-9.332231e-11,-9.3246e-11,-9.3169576e-11,-9.309302e-11,-9.301633e-11,-9.2939524e-11,-9.2862586e-11,-9.278552e-11,-9.2708334e-11,-9.263101e-11,-9.255356e-11,-9.247598e-11,-9.239827e-11,-9.232042e-11,-9.224245e-11,-9.2164346e-11,-9.208611e-11,-9.2007735e-11,-9.1929235e-11,-9.185059e-11,-9.177182e-11,-9.169291e-11,-9.161386e-11,-9.153468e-11,-9.1455364e-11,-9.137591e-11,-9.129631e-11,-9.1216576e-11,-9.1136695e-11,-9.105668e-11,-9.097653e-11,-9.0896235e-11,-9.081579e-11,-9.073521e-11,-9.0654484e-11,-9.057362e-11,-9.04926e-11,-9.041144e-11,-9.033014e-11,-9.0248684e-11,-9.016708e-11,-9.008534e-11,-9.000344e-11,-8.99214e-11,-8.9839206e-11,-8.9756855e-11,-8.967436e-11,-8.959171e-11,-8.950891e-11,-8.942595e-11,-8.9342846e-11,-8.925958e-11,-8.917616e-11,-8.909258e-11,-8.900885e-11,-8.892496e-11,-8.884091e-11,-8.8756696e-11,-8.8672326e-11,-8.85878e-11,-8.850311e-11,-8.841825e-11,-8.833324e-11,-8.8248055e-11,-8.8162706e-11,-8.807719e-11,-8.799152e-11,-8.790567e-11,-8.7819654e-11,-8.773347e-11,-8.764712e-11,-8.75606e-11,-8.747391e-11,-8.738704e-11,-8.73e-11,-8.7212786e-11,-8.71254e-11,-8.7037835e-11,-8.69501e-11,-8.686218e-11,-8.677409e-11,-8.668581e-11,-8.6597354e-11,-8.650872e-11,-8.64199e-11,-8.63309e-11,-8.6241715e-11,-8.615234e-11,-8.606279e-11,-8.597305e-11,-8.588312e-11,-8.5793e-11,-8.570269e-11,-8.561219e-11,-8.55215e-11,-8.5430614e-11,-8.533954e-11,-8.524827e-11,-8.51568e-11,-8.5065135e-11,-8.497327e-11,-8.4881206e-11,-8.478895e-11,-8.4696486e-11,-8.460382e-11,-8.451095e-11,-8.4417875e-11,-8.4324596e-11,-8.423111e-11,-8.413741e-11,-8.404351e-11,-8.3949396e-11,-8.3855076e-11,-8.376053e-11,-8.366578e-11,-8.357082e-11,-8.347563e-11,-8.3380226e-11,-8.3284615e-11,-8.3188775e-11,-8.309271e-11,-8.299643e-11,-8.2899916e-11,-8.280319e-11,-8.270623e-11,-8.260904e-11,-8.251162e-11,-8.241398e-11,-8.23161e-11,-8.221798e-11,-8.211964e-11,-8.202106e-11,-8.192223e-11,-8.182317e-11,-8.172388e-11,-8.162433e-11,-8.152455e-11,-8.142452e-11,-8.132424e-11,-8.1223715e-11,-8.112294e-11,-8.102192e-11,-8.092064e-11,-8.081911e-11,-8.071732e-11,-8.061528e-11,-8.051297e-11,-8.041041e-11,-8.030758e-11,-8.020449e-11,-8.0101134e-11,-7.999751e-11,-7.989362e-11,-7.978945e-11,-7.9685016e-11,-7.958031e-11,-7.9475315e-11,-7.937005e-11,-7.9264505e-11,-7.915868e-11,-7.905257e-11,-7.8946176e-11,-7.883949e-11,-7.8732514e-11,-7.862525e-11,-7.851769e-11,-7.840984e-11,-7.8301685e-11,-7.819324e-11,-7.808448e-11,-7.7975425e-11,-7.786606e-11,-7.775639e-11,-7.764641e-11,-7.7536116e-11,-7.742551e-11,-7.7314585e-11,-7.720334e-11,-7.709178e-11,-7.697989e-11,-7.686767e-11,-7.675512e-11,-7.664225e-11,-7.652904e-11,-7.64155e-11,-7.630161e-11,-7.618739e-11,-7.607282e-11,-7.595791e-11,-7.5842645e-11,-7.572703e-11,-7.5611066e-11,-7.5494735e-11,-7.537805e-11,-7.5261006e-11,-7.514359e-11,-7.502581e-11,-7.490766e-11,-7.478914e-11,-7.4670235e-11,-7.4550956e-11,-7.443129e-11,-7.431124e-11,-7.41908e-11,-7.4069965e-11,-7.3948736e-11,-7.382711e-11,-7.3705084e-11,-7.3582654e-11,-7.345981e-11,-7.333655e-11,-7.321288e-11,-7.308879e-11,-7.296428e-11,-7.283934e-11,-7.2713974e-11,-7.258817e-11,-7.2461925e-11,-7.233525e-11,-7.220812e-11,-7.208054e-11,-7.195251e-11,-7.1824026e-11,-7.169508e-11,-7.156566e-11,-7.143578e-11,-7.130542e-11,-7.117459e-11,-7.104327e-11,-7.0911464e-11,-7.077917e-11,-7.064637e-11,-7.0513075e-11,-7.037927e-11,-7.024496e-11,-7.011013e-11,-6.997479e-11,-6.983891e-11,-6.970251e-11,-6.956557e-11,-6.942809e-11,-6.929006e-11,-6.9151476e-11,-6.901234e-11,-6.887264e-11,-6.873237e-11,-6.859152e-11,-6.845009e-11,-6.830808e-11,-6.816547e-11,-6.802227e-11,-6.787846e-11,-6.773404e-11,-6.7589e-11,-6.744333e-11,-6.729703e-11,-6.715009e-11,-6.7002515e-11,-6.685427e-11,-6.670538e-11,-6.6555816e-11,-6.6405575e-11,-6.6254655e-11,-6.610304e-11,-6.595073e-11,-6.579771e-11,-6.5643976e-11,-6.548952e-11,-6.533433e-11,-6.5178404e-11,-6.5021724e-11,-6.486428e-11,-6.4706074e-11,-6.454709e-11,-6.438732e-11,-6.4226756e-11,-6.406538e-11,-6.390319e-11,-6.374017e-11,-6.357631e-11,-6.34116e-11,-6.324604e-11,-6.3079604e-11,-6.291228e-11,-6.274407e-11,-6.2574945e-11,-6.24049e-11,-6.2233926e-11,-6.206201e-11,-6.188913e-11,-6.171529e-11,-6.154046e-11,-6.136463e-11,-6.1187784e-11,-6.100991e-11,-6.083099e-11,-6.065102e-11,-6.046997e-11,-6.028783e-11,-6.010459e-11,-5.9920215e-11,-5.9734696e-11,-5.9548026e-11,-5.9360176e-11,-5.917113e-11,-5.898087e-11,-5.878937e-11,-5.859662e-11,-5.840259e-11,-5.8207262e-11,-5.8010614e-11,-5.7812623e-11,-5.761327e-11,-5.7412523e-11,-5.7210365e-11,-5.7006767e-11,-5.6801706e-11,-5.6595152e-11,-5.638708e-11,-5.6177462e-11,-5.5966266e-11,-5.5753464e-11,-5.5539025e-11,-5.5322916e-11,-5.5105108e-11,-5.4885565e-11,-5.466425e-11,-5.4441125e-11,-5.421616e-11,-5.3989313e-11,-5.376054e-11,-5.3529806e-11,-5.3297065e-11,-5.3062273e-11,-5.2825386e-11,-5.2586355e-11,-5.2345128e-11,-5.210166e-11,-5.1855895e-11,-5.1607777e-11,-5.135725e-11,-5.1104253e-11,-5.0848728e-11,-5.0590608e-11,-5.0329827e-11,-5.0066316e-11,-4.9799997e-11,-4.9530803e-11,-4.9258653e-11,-4.8983456e-11,-4.8705137e-11,-4.84236e-11,-4.8138746e-11,-4.7850484e-11,-4.7558707e-11,-4.72633e-11,-4.6964158e-11,-4.6661158e-11,-4.6354167e-11,-4.6043055e-11,-4.5727682e-11,-4.54079e-11,-4.5083545e-11,-4.4754457e-11,-4.4420457e-11,-4.4081353e-11,-4.3736955e-11,-4.3387044e-11,-4.3031398e-11,-4.266977e-11,-4.2301912e-11,-4.1927538e-11,-4.1546357e-11,-4.115805e-11,-4.0762275e-11,-4.035866e-11,-3.994681e-11,-3.9526285e-11,-3.909662e-11,-3.8657293e-11,-3.820775e-11,-3.774737e-11,-3.727548e-11,-3.6791327e-11,-3.6294086e-11,-3.5782835e-11,-3.525654e-11,-3.4714044e-11,-3.4154044e-11,-3.357505e-11,-3.2975365e-11,-3.235304e-11,-3.1705805e-11,-3.1031008e-11,-3.0325513e-11,-2.958557e-11,-2.8806638e-11,-2.7983137e-11,-2.7108085e-11,-2.6172568e-11,-2.5164917e-11,-2.4069378e-11,-2.2863846e-11,-2.1515704e-11,-1.9973414e-11,-1.8147052e-11,-1.5852914e-11,-1.2582477e-11,-2.1544347e-13],"x":[-1.0e-30,-9.980079681474105e-31,-9.960159362948208e-31,-9.940239044422312e-31,-9.920318725896414e-31,-9.900398407370519e-31,-9.880478088844623e-31,-9.860557770318725e-31,-9.84063745179283e-31,-9.820717133266934e-31,-9.800796814741036e-31,-9.78087649621514e-31,-9.760956177689243e-31,-9.741035859163347e-31,-9.721115540637452e-31,-9.701195222111554e-31,-9.681274903585658e-31,-9.661354585059763e-31,-9.641434266533865e-31,-9.62151394800797e-31,-9.601593629482072e-31,-9.581673310956176e-31,-9.56175299243028e-31,-9.541832673904383e-31,-9.521912355378487e-31,-9.501992036852591e-31,-9.482071718326694e-31,-9.462151399800798e-31,-9.4422310812749e-31,-9.422310762749005e-31,-9.402390444223109e-31,-9.382470125697212e-31,-9.362549807171316e-31,-9.342629488645418e-31,-9.322709170119522e-31,-9.302788851593627e-31,-9.28286853306773e-31,-9.262948214541833e-31,-9.243027896015938e-31,-9.22310757749004e-31,-9.203187258964144e-31,-9.183266940438247e-31,-9.163346621912351e-31,-9.143426303386455e-31,-9.123505984860558e-31,-9.103585666334662e-31,-9.083665347808766e-31,-9.063745029282869e-31,-9.043824710756973e-31,-9.023904392231076e-31,-9.00398407370518e-31,-8.984063755179284e-31,-8.964143436653387e-31,-8.944223118127491e-31,-8.924302799601595e-31,-8.904382481075698e-31,-8.884462162549802e-31,-8.864541844023904e-31,-8.844621525498009e-31,-8.824701206972113e-31,-8.804780888446215e-31,-8.78486056992032e-31,-8.764940251394422e-31,-8.745019932868526e-31,-8.72509961434263e-31,-8.705179295816733e-31,-8.685258977290837e-31,-8.665338658764942e-31,-8.645418340239044e-31,-8.625498021713148e-31,-8.605577703187251e-31,-8.585657384661355e-31,-8.56573706613546e-31,-8.545816747609562e-31,-8.525896429083666e-31,-8.50597611055777e-31,-8.486055792031873e-31,-8.466135473505977e-31,-8.44621515498008e-31,-8.426294836454184e-31,-8.406374517928288e-31,-8.38645419940239e-31,-8.366533880876495e-31,-8.346613562350599e-31,-8.326693243824702e-31,-8.306772925298806e-31,-8.286852606772908e-31,-8.266932288247013e-31,-8.247011969721117e-31,-8.22709165119522e-31,-8.207171332669324e-31,-8.187251014143428e-31,-8.16733069561753e-31,-8.147410377091635e-31,-8.127490058565737e-31,-8.107569740039841e-31,-8.087649421513946e-31,-8.067729102988048e-31,-8.047808784462152e-31,-8.027888465936255e-31,-8.007968147410359e-31,-7.988047828884463e-31,-7.968127510358566e-31,-7.94820719183267e-31,-7.928286873306774e-31,-7.908366554780877e-31,-7.888446236254981e-31,-7.868525917729084e-31,-7.848605599203188e-31,-7.828685280677291e-31,-7.808764962151395e-31,-7.788844643625499e-31,-7.768924325099602e-31,-7.7490040065737055e-31,-7.72908368804781e-31,-7.709163369521913e-31,-7.6892430509960165e-31,-7.66932273247012e-31,-7.649402413944224e-31,-7.6294820954183275e-31,-7.609561776892431e-31,-7.589641458366534e-31,-7.5697211398406385e-31,-7.549800821314742e-31,-7.529880502788845e-31,-7.509960184262949e-31,-7.490039865737052e-31,-7.470119547211156e-31,-7.45019922868526e-31,-7.430278910159363e-31,-7.410358591633466e-31,-7.390438273107571e-31,-7.370517954581674e-31,-7.350597636055777e-31,-7.330677317529881e-31,-7.310756999003985e-31,-7.290836680478088e-31,-7.270916361952192e-31,-7.250996043426295e-31,-7.231075724900399e-31,-7.211155406374503e-31,-7.191235087848606e-31,-7.1713147693227095e-31,-7.151394450796814e-31,-7.131474132270917e-31,-7.1115538137450205e-31,-7.091633495219124e-31,-7.071713176693228e-31,-7.0517928581673314e-31,-7.031872539641435e-31,-7.011952221115538e-31,-6.992031902589642e-31,-6.972111584063746e-31,-6.952191265537849e-31,-6.9322709470119526e-31,-6.912350628486056e-31,-6.89243030996016e-31,-6.8725099914342635e-31,-6.852589672908367e-31,-6.83266935438247e-31,-6.8127490358565745e-31,-6.792828717330678e-31,-6.772908398804781e-31,-6.752988080278885e-31,-6.733067761752989e-31,-6.713147443227092e-31,-6.693227124701196e-31,-6.673306806175299e-31,-6.653386487649403e-31,-6.633466169123507e-31,-6.61354585059761e-31,-6.593625532071713e-31,-6.573705213545818e-31,-6.553784895019921e-31,-6.533864576494024e-31,-6.513944257968128e-31,-6.494023939442232e-31,-6.474103620916335e-31,-6.454183302390439e-31,-6.434262983864542e-31,-6.414342665338646e-31,-6.39442234681275e-31,-6.374502028286853e-31,-6.3545817097609565e-31,-6.334661391235061e-31,-6.314741072709164e-31,-6.2948207541832675e-31,-6.274900435657371e-31,-6.254980117131474e-31,-6.2350597986055785e-31,-6.215139480079682e-31,-6.195219161553785e-31,-6.175298843027889e-31,-6.155378524501993e-31,-6.135458205976096e-31,-6.1155378874502e-31,-6.095617568924303e-31,-6.075697250398407e-31,-6.0557769318725106e-31,-6.035856613346614e-31,-6.015936294820717e-31,-5.9960159762948216e-31,-5.976095657768925e-31,-5.956175339243028e-31,-5.936255020717132e-31,-5.916334702191236e-31,-5.896414383665339e-31,-5.876494065139443e-31,-5.856573746613546e-31,-5.83665342808765e-31,-5.816733109561754e-31,-5.796812791035857e-31,-5.77689247250996e-31,-5.756972153984065e-31,-5.737051835458168e-31,-5.717131516932271e-31,-5.697211198406375e-31,-5.677290879880478e-31,-5.657370561354582e-31,-5.637450242828686e-31,-5.617529924302789e-31,-5.5976096057768925e-31,-5.577689287250997e-31,-5.5577689687251e-31,-5.5378486501992035e-31,-5.517928331673307e-31,-5.498008013147411e-31,-5.4780876946215145e-31,-5.458167376095618e-31,-5.438247057569721e-31,-5.4183267390438255e-31,-5.398406420517929e-31,-5.378486101992032e-31,-5.358565783466136e-31,-5.33864546494024e-31,-5.318725146414343e-31,-5.298804827888447e-31,-5.27888450936255e-31,-5.258964190836654e-31,-5.239043872310758e-31,-5.219123553784861e-31,-5.199203235258964e-31,-5.179282916733069e-31,-5.159362598207172e-31,-5.139442279681275e-31,-5.119521961155379e-31,-5.099601642629482e-31,-5.079681324103586e-31,-5.05976100557769e-31,-5.039840687051793e-31,-5.019920368525896e-31,-5.000000050000001e-31,-4.980079731474104e-31,-4.960159412948207e-31,-4.940239094422311e-31,-4.920318775896415e-31,-4.900398457370518e-31,-4.880478138844622e-31,-4.860557820318725e-31,-4.840637501792829e-31,-4.820717183266933e-31,-4.800796864741036e-31,-4.7808765462151395e-31,-4.760956227689244e-31,-4.741035909163347e-31,-4.7211155906374505e-31,-4.701195272111554e-31,-4.681274953585658e-31,-4.6613546350597615e-31,-4.641434316533865e-31,-4.621513998007968e-31,-4.6015936794820725e-31,-4.581673360956176e-31,-4.561753042430279e-31,-4.541832723904383e-31,-4.521912405378487e-31,-4.50199208685259e-31,-4.482071768326694e-31,-4.462151449800797e-31,-4.4422311312749e-31,-4.422310812749005e-31,-4.402390494223108e-31,-4.382470175697211e-31,-4.362549857171315e-31,-4.342629538645419e-31,-4.322709220119522e-31,-4.302788901593626e-31,-4.282868583067729e-31,-4.262948264541833e-31,-4.243027946015937e-31,-4.22310762749004e-31,-4.2031873089641434e-31,-4.183266990438248e-31,-4.163346671912351e-31,-4.143426353386454e-31,-4.123506034860558e-31,-4.103585716334662e-31,-4.083665397808765e-31,-4.063745079282869e-31,-4.043824760756972e-31,-4.023904442231076e-31,-4.00398412370518e-31,-3.984063805179283e-31,-3.9641434866533865e-31,-3.9442231681274903e-31,-3.924302849601594e-31,-3.9043825310756975e-31,-3.8844622125498013e-31,-3.8645418940239047e-31,-3.844621575498008e-31,-3.824701256972112e-31,-3.8047809384462153e-31,-3.784860619920319e-31,-3.7649403013944224e-31,-3.7450199828685263e-31,-3.7250996643426296e-31,-3.7051793458167334e-31,-3.685259027290837e-31,-3.6653387087649406e-31,-3.645418390239044e-31,-3.625498071713148e-31,-3.605577753187251e-31,-3.585657434661355e-31,-3.5657371161354584e-31,-3.545816797609562e-31,-3.5258964790836655e-31,-3.5059761605577693e-31,-3.4860558420318727e-31,-3.4661355235059765e-31,-3.44621520498008e-31,-3.4262948864541837e-31,-3.406374567928287e-31,-3.386454249402391e-31,-3.3665339308764943e-31,-3.346613612350598e-31,-3.3266932938247015e-31,-3.3067729752988053e-31,-3.2868526567729086e-31,-3.2669323382470124e-31,-3.247012019721116e-31,-3.227091701195219e-31,-3.207171382669323e-31,-3.1872510641434264e-31,-3.16733074561753e-31,-3.1474104270916336e-31,-3.1274901085657374e-31,-3.1075697900398407e-31,-3.0876494715139445e-31,-3.067729152988048e-31,-3.0478088344621517e-31,-3.027888515936255e-31,-3.007968197410359e-31,-2.9880478788844623e-31,-2.968127560358566e-31,-2.9482072418326695e-31,-2.9282869233067733e-31,-2.9083666047808766e-31,-2.8884462862549805e-31,-2.868525967729084e-31,-2.8486056492031876e-31,-2.828685330677291e-31,-2.808765012151395e-31,-2.788844693625498e-31,-2.768924375099602e-31,-2.7490040565737054e-31,-2.729083738047809e-31,-2.7091634195219126e-31,-2.6892431009960164e-31,-2.6693227824701197e-31,-2.649402463944223e-31,-2.629482145418327e-31,-2.6095618268924303e-31,-2.589641508366534e-31,-2.5697211898406375e-31,-2.5498008713147413e-31,-2.5298805527888447e-31,-2.5099602342629485e-31,-2.490039915737052e-31,-2.4701195972111556e-31,-2.450199278685259e-31,-2.430278960159363e-31,-2.410358641633466e-31,-2.39043832310757e-31,-2.3705180045816734e-31,-2.350597686055777e-31,-2.3306773675298806e-31,-2.3107570490039844e-31,-2.2908367304780878e-31,-2.2709164119521916e-31,-2.250996093426295e-31,-2.2310757749003987e-31,-2.211155456374502e-31,-2.191235137848606e-31,-2.1713148193227093e-31,-2.151394500796813e-31,-2.1314741822709165e-31,-2.1115538637450203e-31,-2.0916335452191237e-31,-2.0717132266932275e-31,-2.051792908167331e-31,-2.031872589641434e-31,-2.011952271115538e-31,-1.9920319525896414e-31,-1.9721116340637452e-31,-1.9521913155378488e-31,-1.9322709970119524e-31,-1.912350678486056e-31,-1.8924303599601596e-31,-1.8725100414342632e-31,-1.8525897229083668e-31,-1.8326694043824703e-31,-1.812749085856574e-31,-1.7928287673306775e-31,-1.7729084488047811e-31,-1.7529881302788847e-31,-1.733067811752988e-31,-1.7131474932270917e-31,-1.6932271747011953e-31,-1.6733068561752989e-31,-1.6533865376494024e-31,-1.633466219123506e-31,-1.6135459005976096e-31,-1.5936255820717132e-31,-1.5737052635458168e-31,-1.5537849450199204e-31,-1.533864626494024e-31,-1.5139443079681276e-31,-1.4940239894422312e-31,-1.4741036709163348e-31,-1.4541833523904384e-31,-1.434263033864542e-31,-1.4143427153386455e-31,-1.3944223968127491e-31,-1.3745020782868527e-31,-1.3545817597609563e-31,-1.33466144123506e-31,-1.3147411227091635e-31,-1.294820804183267e-31,-1.2749004856573707e-31,-1.2549801671314743e-31,-1.2350598486055779e-31,-1.2151395300796815e-31,-1.195219211553785e-31,-1.1752988930278886e-31,-1.1553785745019922e-31,-1.1354582559760958e-31,-1.1155379374501992e-31,-1.0956176189243028e-31,-1.0756973003984064e-31,-1.05577698187251e-31,-1.0358566633466136e-31,-1.0159363448207171e-31,-9.960160262948207e-32,-9.760957077689244e-32,-9.561753892430279e-32,-9.362550707171315e-32,-9.163347521912351e-32,-8.964144336653387e-32,-8.764941151394423e-32,-8.565737966135459e-32,-8.366534780876495e-32,-8.167331595617531e-32,-7.968128410358566e-32,-7.768925225099602e-32,-7.569722039840638e-32,-7.370518854581674e-32,-7.17131566932271e-32,-6.972112484063746e-32,-6.772909298804782e-32,-6.573706113545817e-32,-6.374502928286853e-32,-6.175299743027889e-32,-5.976096557768924e-32,-5.77689337250996e-32,-5.577690187250996e-32,-5.378487001992032e-32,-5.179283816733068e-32,-4.980080631474104e-32,-4.78087744621514e-32,-4.581674260956176e-32,-4.382471075697212e-32,-4.183267890438247e-32,-3.984064705179283e-32,-3.784861519920319e-32,-3.585658334661355e-32,-3.386455149402391e-32,-3.1872519641434267e-32,-2.9880487788844626e-32,-2.788845593625498e-32,-2.589642408366534e-32,-2.3904392231075698e-32,-2.1912360378486057e-32,-1.9920328525896416e-32,-1.7928296673306775e-32,-1.5936264820717132e-32,-1.394423296812749e-32,-1.195220111553785e-32,-9.960169262948208e-33,-7.968137410358567e-33,-5.9761055577689245e-33,-3.984073705179283e-33,-1.9920418525896417e-33,-1.0e-38]}
},{}],105:[function(require,module,exports){
module.exports={"expected":[1.0e-10,9.9933554e-11,9.986702e-11,9.98004e-11,9.973369e-11,9.9666886e-11,9.9599995e-11,9.9533014e-11,9.946594e-11,9.939878e-11,9.933153e-11,9.926419e-11,9.9196755e-11,9.9129226e-11,9.9061606e-11,9.8993896e-11,9.892609e-11,9.885819e-11,9.8790205e-11,9.872212e-11,9.865394e-11,9.858567e-11,9.85173e-11,9.844884e-11,9.838028e-11,9.831163e-11,9.824288e-11,9.817403e-11,9.810509e-11,9.803605e-11,9.796691e-11,9.789768e-11,9.782835e-11,9.775892e-11,9.7689384e-11,9.761976e-11,9.755003e-11,9.74802e-11,9.7410274e-11,9.734024e-11,9.727011e-11,9.719988e-11,9.712955e-11,9.705912e-11,9.698858e-11,9.691794e-11,9.68472e-11,9.677635e-11,9.6705394e-11,9.663434e-11,9.656318e-11,9.649192e-11,9.6420545e-11,9.6349075e-11,9.627749e-11,9.620581e-11,9.613401e-11,9.60621e-11,9.59901e-11,9.5917975e-11,9.584575e-11,9.577341e-11,9.570097e-11,9.562841e-11,9.5555744e-11,9.548297e-11,9.541008e-11,9.533708e-11,9.526397e-11,9.5190744e-11,9.511741e-11,9.504396e-11,9.497039e-11,9.4896715e-11,9.482293e-11,9.4749014e-11,9.4675e-11,9.4600855e-11,9.45266e-11,9.445223e-11,9.437774e-11,9.4303135e-11,9.422841e-11,9.415357e-11,9.40786e-11,9.400352e-11,9.3928317e-11,9.3852995e-11,9.377755e-11,9.3701984e-11,9.3626294e-11,9.355049e-11,9.347455e-11,9.339849e-11,9.332231e-11,9.3246e-11,9.3169576e-11,9.309302e-11,9.301633e-11,9.2939524e-11,9.2862586e-11,9.278552e-11,9.2708334e-11,9.263101e-11,9.255356e-11,9.247598e-11,9.239827e-11,9.232042e-11,9.224245e-11,9.2164346e-11,9.208611e-11,9.2007735e-11,9.1929235e-11,9.185059e-11,9.177182e-11,9.169291e-11,9.161386e-11,9.153468e-11,9.1455364e-11,9.137591e-11,9.129631e-11,9.1216576e-11,9.1136695e-11,9.105668e-11,9.097653e-11,9.0896235e-11,9.081579e-11,9.073521e-11,9.0654484e-11,9.057362e-11,9.04926e-11,9.041144e-11,9.033014e-11,9.0248684e-11,9.016708e-11,9.008534e-11,9.000344e-11,8.99214e-11,8.9839206e-11,8.9756855e-11,8.967436e-11,8.959171e-11,8.950891e-11,8.942595e-11,8.9342846e-11,8.925958e-11,8.917616e-11,8.909258e-11,8.900885e-11,8.892496e-11,8.884091e-11,8.8756696e-11,8.8672326e-11,8.85878e-11,8.850311e-11,8.841825e-11,8.833324e-11,8.8248055e-11,8.8162706e-11,8.807719e-11,8.799152e-11,8.790567e-11,8.7819654e-11,8.773347e-11,8.764712e-11,8.75606e-11,8.747391e-11,8.738704e-11,8.73e-11,8.7212786e-11,8.71254e-11,8.7037835e-11,8.69501e-11,8.686218e-11,8.677409e-11,8.668581e-11,8.6597354e-11,8.650872e-11,8.64199e-11,8.63309e-11,8.6241715e-11,8.615234e-11,8.606279e-11,8.597305e-11,8.588312e-11,8.5793e-11,8.570269e-11,8.561219e-11,8.55215e-11,8.5430614e-11,8.533954e-11,8.524827e-11,8.51568e-11,8.5065135e-11,8.497327e-11,8.4881206e-11,8.478895e-11,8.4696486e-11,8.460382e-11,8.451095e-11,8.4417875e-11,8.4324596e-11,8.423111e-11,8.413741e-11,8.404351e-11,8.3949396e-11,8.3855076e-11,8.376053e-11,8.366578e-11,8.357082e-11,8.347563e-11,8.3380226e-11,8.3284615e-11,8.3188775e-11,8.309271e-11,8.299643e-11,8.2899916e-11,8.280319e-11,8.270623e-11,8.260904e-11,8.251162e-11,8.241398e-11,8.23161e-11,8.221798e-11,8.211964e-11,8.202106e-11,8.192223e-11,8.182317e-11,8.172388e-11,8.162433e-11,8.152455e-11,8.142452e-11,8.132424e-11,8.1223715e-11,8.112294e-11,8.102192e-11,8.092064e-11,8.081911e-11,8.071732e-11,8.061528e-11,8.051297e-11,8.041041e-11,8.030758e-11,8.020449e-11,8.0101134e-11,7.999751e-11,7.989362e-11,7.978945e-11,7.9685016e-11,7.958031e-11,7.9475315e-11,7.937005e-11,7.9264505e-11,7.915868e-11,7.905257e-11,7.8946176e-11,7.883949e-11,7.8732514e-11,7.862525e-11,7.851769e-11,7.840984e-11,7.8301685e-11,7.819324e-11,7.808448e-11,7.7975425e-11,7.786606e-11,7.775639e-11,7.764641e-11,7.7536116e-11,7.742551e-11,7.7314585e-11,7.720334e-11,7.709178e-11,7.697989e-11,7.686767e-11,7.675512e-11,7.664225e-11,7.652904e-11,7.64155e-11,7.630161e-11,7.618739e-11,7.607282e-11,7.595791e-11,7.5842645e-11,7.572703e-11,7.5611066e-11,7.5494735e-11,7.537805e-11,7.5261006e-11,7.514359e-11,7.502581e-11,7.490766e-11,7.478914e-11,7.4670235e-11,7.4550956e-11,7.443129e-11,7.431124e-11,7.41908e-11,7.4069965e-11,7.3948736e-11,7.382711e-11,7.3705084e-11,7.3582654e-11,7.345981e-11,7.333655e-11,7.321288e-11,7.308879e-11,7.296428e-11,7.283934e-11,7.2713974e-11,7.258817e-11,7.2461925e-11,7.233525e-11,7.220812e-11,7.208054e-11,7.195251e-11,7.1824026e-11,7.169508e-11,7.156566e-11,7.143578e-11,7.130542e-11,7.117459e-11,7.104327e-11,7.0911464e-11,7.077917e-11,7.064637e-11,7.0513075e-11,7.037927e-11,7.024496e-11,7.011013e-11,6.997479e-11,6.983891e-11,6.970251e-11,6.956557e-11,6.942809e-11,6.929006e-11,6.9151476e-11,6.901234e-11,6.887264e-11,6.873237e-11,6.859152e-11,6.845009e-11,6.830808e-11,6.816547e-11,6.802227e-11,6.787846e-11,6.773404e-11,6.7589e-11,6.744333e-11,6.729703e-11,6.715009e-11,6.7002515e-11,6.685427e-11,6.670538e-11,6.6555816e-11,6.6405575e-11,6.6254655e-11,6.610304e-11,6.595073e-11,6.579771e-11,6.5643976e-11,6.548952e-11,6.533433e-11,6.5178404e-11,6.5021724e-11,6.486428e-11,6.4706074e-11,6.454709e-11,6.438732e-11,6.4226756e-11,6.406538e-11,6.390319e-11,6.374017e-11,6.357631e-11,6.34116e-11,6.324604e-11,6.3079604e-11,6.291228e-11,6.274407e-11,6.2574945e-11,6.24049e-11,6.2233926e-11,6.206201e-11,6.188913e-11,6.171529e-11,6.154046e-11,6.136463e-11,6.1187784e-11,6.100991e-11,6.083099e-11,6.065102e-11,6.046997e-11,6.028783e-11,6.010459e-11,5.9920215e-11,5.9734696e-11,5.9548026e-11,5.9360176e-11,5.917113e-11,5.898087e-11,5.878937e-11,5.859662e-11,5.840259e-11,5.8207262e-11,5.8010614e-11,5.7812623e-11,5.761327e-11,5.7412523e-11,5.7210365e-11,5.7006767e-11,5.6801706e-11,5.6595152e-11,5.638708e-11,5.6177462e-11,5.5966266e-11,5.5753464e-11,5.5539025e-11,5.5322916e-11,5.5105108e-11,5.4885565e-11,5.466425e-11,5.4441125e-11,5.421616e-11,5.3989313e-11,5.376054e-11,5.3529806e-11,5.3297065e-11,5.3062273e-11,5.2825386e-11,5.2586355e-11,5.2345128e-11,5.210166e-11,5.1855895e-11,5.1607777e-11,5.135725e-11,5.1104253e-11,5.0848728e-11,5.0590608e-11,5.0329827e-11,5.0066316e-11,4.9799997e-11,4.9530803e-11,4.9258653e-11,4.8983456e-11,4.8705137e-11,4.84236e-11,4.8138746e-11,4.7850484e-11,4.7558707e-11,4.72633e-11,4.6964158e-11,4.6661158e-11,4.6354167e-11,4.6043055e-11,4.5727682e-11,4.54079e-11,4.5083545e-11,4.4754457e-11,4.4420457e-11,4.4081353e-11,4.3736955e-11,4.3387044e-11,4.3031398e-11,4.266977e-11,4.2301912e-11,4.1927538e-11,4.1546357e-11,4.115805e-11,4.0762275e-11,4.035866e-11,3.994681e-11,3.9526285e-11,3.909662e-11,3.8657293e-11,3.820775e-11,3.774737e-11,3.727548e-11,3.6791327e-11,3.6294086e-11,3.5782835e-11,3.525654e-11,3.4714044e-11,3.4154044e-11,3.357505e-11,3.2975365e-11,3.235304e-11,3.1705805e-11,3.1031008e-11,3.0325513e-11,2.958557e-11,2.8806638e-11,2.7983137e-11,2.7108085e-11,2.6172568e-11,2.5164917e-11,2.4069378e-11,2.2863846e-11,2.1515704e-11,1.9973414e-11,1.8147052e-11,1.5852914e-11,1.2582477e-11,2.1544347e-13],"x":[1.0e-30,9.980079681474105e-31,9.960159362948208e-31,9.940239044422312e-31,9.920318725896414e-31,9.900398407370519e-31,9.880478088844623e-31,9.860557770318725e-31,9.84063745179283e-31,9.820717133266934e-31,9.800796814741036e-31,9.78087649621514e-31,9.760956177689243e-31,9.741035859163347e-31,9.721115540637452e-31,9.701195222111554e-31,9.681274903585658e-31,9.661354585059763e-31,9.641434266533865e-31,9.62151394800797e-31,9.601593629482072e-31,9.581673310956176e-31,9.56175299243028e-31,9.541832673904383e-31,9.521912355378487e-31,9.501992036852591e-31,9.482071718326694e-31,9.462151399800798e-31,9.4422310812749e-31,9.422310762749005e-31,9.402390444223109e-31,9.382470125697212e-31,9.362549807171316e-31,9.342629488645418e-31,9.322709170119522e-31,9.302788851593627e-31,9.28286853306773e-31,9.262948214541833e-31,9.243027896015938e-31,9.22310757749004e-31,9.203187258964144e-31,9.183266940438247e-31,9.163346621912351e-31,9.143426303386455e-31,9.123505984860558e-31,9.103585666334662e-31,9.083665347808766e-31,9.063745029282869e-31,9.043824710756973e-31,9.023904392231076e-31,9.00398407370518e-31,8.984063755179284e-31,8.964143436653387e-31,8.944223118127491e-31,8.924302799601595e-31,8.904382481075698e-31,8.884462162549802e-31,8.864541844023904e-31,8.844621525498009e-31,8.824701206972113e-31,8.804780888446215e-31,8.78486056992032e-31,8.764940251394422e-31,8.745019932868526e-31,8.72509961434263e-31,8.705179295816733e-31,8.685258977290837e-31,8.665338658764942e-31,8.645418340239044e-31,8.625498021713148e-31,8.605577703187251e-31,8.585657384661355e-31,8.56573706613546e-31,8.545816747609562e-31,8.525896429083666e-31,8.50597611055777e-31,8.486055792031873e-31,8.466135473505977e-31,8.44621515498008e-31,8.426294836454184e-31,8.406374517928288e-31,8.38645419940239e-31,8.366533880876495e-31,8.346613562350599e-31,8.326693243824702e-31,8.306772925298806e-31,8.286852606772908e-31,8.266932288247013e-31,8.247011969721117e-31,8.22709165119522e-31,8.207171332669324e-31,8.187251014143428e-31,8.16733069561753e-31,8.147410377091635e-31,8.127490058565737e-31,8.107569740039841e-31,8.087649421513946e-31,8.067729102988048e-31,8.047808784462152e-31,8.027888465936255e-31,8.007968147410359e-31,7.988047828884463e-31,7.968127510358566e-31,7.94820719183267e-31,7.928286873306774e-31,7.908366554780877e-31,7.888446236254981e-31,7.868525917729084e-31,7.848605599203188e-31,7.828685280677291e-31,7.808764962151395e-31,7.788844643625499e-31,7.768924325099602e-31,7.7490040065737055e-31,7.72908368804781e-31,7.709163369521913e-31,7.6892430509960165e-31,7.66932273247012e-31,7.649402413944224e-31,7.6294820954183275e-31,7.609561776892431e-31,7.589641458366534e-31,7.5697211398406385e-31,7.549800821314742e-31,7.529880502788845e-31,7.509960184262949e-31,7.490039865737052e-31,7.470119547211156e-31,7.45019922868526e-31,7.430278910159363e-31,7.410358591633466e-31,7.390438273107571e-31,7.370517954581674e-31,7.350597636055777e-31,7.330677317529881e-31,7.310756999003985e-31,7.290836680478088e-31,7.270916361952192e-31,7.250996043426295e-31,7.231075724900399e-31,7.211155406374503e-31,7.191235087848606e-31,7.1713147693227095e-31,7.151394450796814e-31,7.131474132270917e-31,7.1115538137450205e-31,7.091633495219124e-31,7.071713176693228e-31,7.0517928581673314e-31,7.031872539641435e-31,7.011952221115538e-31,6.992031902589642e-31,6.972111584063746e-31,6.952191265537849e-31,6.9322709470119526e-31,6.912350628486056e-31,6.89243030996016e-31,6.8725099914342635e-31,6.852589672908367e-31,6.83266935438247e-31,6.8127490358565745e-31,6.792828717330678e-31,6.772908398804781e-31,6.752988080278885e-31,6.733067761752989e-31,6.713147443227092e-31,6.693227124701196e-31,6.673306806175299e-31,6.653386487649403e-31,6.633466169123507e-31,6.61354585059761e-31,6.593625532071713e-31,6.573705213545818e-31,6.553784895019921e-31,6.533864576494024e-31,6.513944257968128e-31,6.494023939442232e-31,6.474103620916335e-31,6.454183302390439e-31,6.434262983864542e-31,6.414342665338646e-31,6.39442234681275e-31,6.374502028286853e-31,6.3545817097609565e-31,6.334661391235061e-31,6.314741072709164e-31,6.2948207541832675e-31,6.274900435657371e-31,6.254980117131474e-31,6.2350597986055785e-31,6.215139480079682e-31,6.195219161553785e-31,6.175298843027889e-31,6.155378524501993e-31,6.135458205976096e-31,6.1155378874502e-31,6.095617568924303e-31,6.075697250398407e-31,6.0557769318725106e-31,6.035856613346614e-31,6.015936294820717e-31,5.9960159762948216e-31,5.976095657768925e-31,5.956175339243028e-31,5.936255020717132e-31,5.916334702191236e-31,5.896414383665339e-31,5.876494065139443e-31,5.856573746613546e-31,5.83665342808765e-31,5.816733109561754e-31,5.796812791035857e-31,5.77689247250996e-31,5.756972153984065e-31,5.737051835458168e-31,5.717131516932271e-31,5.697211198406375e-31,5.677290879880478e-31,5.657370561354582e-31,5.637450242828686e-31,5.617529924302789e-31,5.5976096057768925e-31,5.577689287250997e-31,5.5577689687251e-31,5.5378486501992035e-31,5.517928331673307e-31,5.498008013147411e-31,5.4780876946215145e-31,5.458167376095618e-31,5.438247057569721e-31,5.4183267390438255e-31,5.398406420517929e-31,5.378486101992032e-31,5.358565783466136e-31,5.33864546494024e-31,5.318725146414343e-31,5.298804827888447e-31,5.27888450936255e-31,5.258964190836654e-31,5.239043872310758e-31,5.219123553784861e-31,5.199203235258964e-31,5.179282916733069e-31,5.159362598207172e-31,5.139442279681275e-31,5.119521961155379e-31,5.099601642629482e-31,5.079681324103586e-31,5.05976100557769e-31,5.039840687051793e-31,5.019920368525896e-31,5.000000050000001e-31,4.980079731474104e-31,4.960159412948207e-31,4.940239094422311e-31,4.920318775896415e-31,4.900398457370518e-31,4.880478138844622e-31,4.860557820318725e-31,4.840637501792829e-31,4.820717183266933e-31,4.800796864741036e-31,4.7808765462151395e-31,4.760956227689244e-31,4.741035909163347e-31,4.7211155906374505e-31,4.701195272111554e-31,4.681274953585658e-31,4.6613546350597615e-31,4.641434316533865e-31,4.621513998007968e-31,4.6015936794820725e-31,4.581673360956176e-31,4.561753042430279e-31,4.541832723904383e-31,4.521912405378487e-31,4.50199208685259e-31,4.482071768326694e-31,4.462151449800797e-31,4.4422311312749e-31,4.422310812749005e-31,4.402390494223108e-31,4.382470175697211e-31,4.362549857171315e-31,4.342629538645419e-31,4.322709220119522e-31,4.302788901593626e-31,4.282868583067729e-31,4.262948264541833e-31,4.243027946015937e-31,4.22310762749004e-31,4.2031873089641434e-31,4.183266990438248e-31,4.163346671912351e-31,4.143426353386454e-31,4.123506034860558e-31,4.103585716334662e-31,4.083665397808765e-31,4.063745079282869e-31,4.043824760756972e-31,4.023904442231076e-31,4.00398412370518e-31,3.984063805179283e-31,3.9641434866533865e-31,3.9442231681274903e-31,3.924302849601594e-31,3.9043825310756975e-31,3.8844622125498013e-31,3.8645418940239047e-31,3.844621575498008e-31,3.824701256972112e-31,3.8047809384462153e-31,3.784860619920319e-31,3.7649403013944224e-31,3.7450199828685263e-31,3.7250996643426296e-31,3.7051793458167334e-31,3.685259027290837e-31,3.6653387087649406e-31,3.645418390239044e-31,3.625498071713148e-31,3.605577753187251e-31,3.585657434661355e-31,3.5657371161354584e-31,3.545816797609562e-31,3.5258964790836655e-31,3.5059761605577693e-31,3.4860558420318727e-31,3.4661355235059765e-31,3.44621520498008e-31,3.4262948864541837e-31,3.406374567928287e-31,3.386454249402391e-31,3.3665339308764943e-31,3.346613612350598e-31,3.3266932938247015e-31,3.3067729752988053e-31,3.2868526567729086e-31,3.2669323382470124e-31,3.247012019721116e-31,3.227091701195219e-31,3.207171382669323e-31,3.1872510641434264e-31,3.16733074561753e-31,3.1474104270916336e-31,3.1274901085657374e-31,3.1075697900398407e-31,3.0876494715139445e-31,3.067729152988048e-31,3.0478088344621517e-31,3.027888515936255e-31,3.007968197410359e-31,2.9880478788844623e-31,2.968127560358566e-31,2.9482072418326695e-31,2.9282869233067733e-31,2.9083666047808766e-31,2.8884462862549805e-31,2.868525967729084e-31,2.8486056492031876e-31,2.828685330677291e-31,2.808765012151395e-31,2.788844693625498e-31,2.768924375099602e-31,2.7490040565737054e-31,2.729083738047809e-31,2.7091634195219126e-31,2.6892431009960164e-31,2.6693227824701197e-31,2.649402463944223e-31,2.629482145418327e-31,2.6095618268924303e-31,2.589641508366534e-31,2.5697211898406375e-31,2.5498008713147413e-31,2.5298805527888447e-31,2.5099602342629485e-31,2.490039915737052e-31,2.4701195972111556e-31,2.450199278685259e-31,2.430278960159363e-31,2.410358641633466e-31,2.39043832310757e-31,2.3705180045816734e-31,2.350597686055777e-31,2.3306773675298806e-31,2.3107570490039844e-31,2.2908367304780878e-31,2.2709164119521916e-31,2.250996093426295e-31,2.2310757749003987e-31,2.211155456374502e-31,2.191235137848606e-31,2.1713148193227093e-31,2.151394500796813e-31,2.1314741822709165e-31,2.1115538637450203e-31,2.0916335452191237e-31,2.0717132266932275e-31,2.051792908167331e-31,2.031872589641434e-31,2.011952271115538e-31,1.9920319525896414e-31,1.9721116340637452e-31,1.9521913155378488e-31,1.9322709970119524e-31,1.912350678486056e-31,1.8924303599601596e-31,1.8725100414342632e-31,1.8525897229083668e-31,1.8326694043824703e-31,1.812749085856574e-31,1.7928287673306775e-31,1.7729084488047811e-31,1.7529881302788847e-31,1.733067811752988e-31,1.7131474932270917e-31,1.6932271747011953e-31,1.6733068561752989e-31,1.6533865376494024e-31,1.633466219123506e-31,1.6135459005976096e-31,1.5936255820717132e-31,1.5737052635458168e-31,1.5537849450199204e-31,1.533864626494024e-31,1.5139443079681276e-31,1.4940239894422312e-31,1.4741036709163348e-31,1.4541833523904384e-31,1.434263033864542e-31,1.4143427153386455e-31,1.3944223968127491e-31,1.3745020782868527e-31,1.3545817597609563e-31,1.33466144123506e-31,1.3147411227091635e-31,1.294820804183267e-31,1.2749004856573707e-31,1.2549801671314743e-31,1.2350598486055779e-31,1.2151395300796815e-31,1.195219211553785e-31,1.1752988930278886e-31,1.1553785745019922e-31,1.1354582559760958e-31,1.1155379374501992e-31,1.0956176189243028e-31,1.0756973003984064e-31,1.05577698187251e-31,1.0358566633466136e-31,1.0159363448207171e-31,9.960160262948207e-32,9.760957077689244e-32,9.561753892430279e-32,9.362550707171315e-32,9.163347521912351e-32,8.964144336653387e-32,8.764941151394423e-32,8.565737966135459e-32,8.366534780876495e-32,8.167331595617531e-32,7.968128410358566e-32,7.768925225099602e-32,7.569722039840638e-32,7.370518854581674e-32,7.17131566932271e-32,6.972112484063746e-32,6.772909298804782e-32,6.573706113545817e-32,6.374502928286853e-32,6.175299743027889e-32,5.976096557768924e-32,5.77689337250996e-32,5.577690187250996e-32,5.378487001992032e-32,5.179283816733068e-32,4.980080631474104e-32,4.78087744621514e-32,4.581674260956176e-32,4.382471075697212e-32,4.183267890438247e-32,3.984064705179283e-32,3.784861519920319e-32,3.585658334661355e-32,3.386455149402391e-32,3.1872519641434267e-32,2.9880487788844626e-32,2.788845593625498e-32,2.589642408366534e-32,2.3904392231075698e-32,2.1912360378486057e-32,1.9920328525896416e-32,1.7928296673306775e-32,1.5936264820717132e-32,1.394423296812749e-32,1.195220111553785e-32,9.960169262948208e-33,7.968137410358567e-33,5.9761055577689245e-33,3.984073705179283e-33,1.9920418525896417e-33,1.0e-38]}
},{}],106:[function(require,module,exports){
module.exports={"expected":[-3.6840315,-3.7059174,-3.7275476,-3.74893,-3.770071,-3.7909775,-3.811656,-3.8321123,-3.8523529,-3.8723829,-3.8922076,-3.9118326,-3.9312625,-3.9505022,-3.9695563,-3.9884293,-4.0071254,-4.0256486,-4.044003,-4.062192,-4.0802197,-4.0980897,-4.1158047,-4.133369,-4.150785,-4.1680565,-4.1851854,-4.2021756,-4.2190294,-4.2357497,-4.252339,-4.2688,-4.2851343,-4.301346,-4.3174357,-4.333407,-4.349261,-4.3650002,-4.3806267,-4.3961425,-4.4115496,-4.4268503,-4.442045,-4.457137,-4.472128,-4.4870186,-4.501811,-4.5165067,-4.531108,-4.545615,-4.5600305,-4.574355,-4.588591,-4.602739,-4.6168003,-4.6307764,-4.644669,-4.6584787,-4.672207,-4.6858554,-4.6994243,-4.7129154,-4.7263303,-4.739669,-4.752933,-4.7661233,-4.779241,-4.7922873,-4.805263,-4.818169,-4.831006,-4.8437753,-4.8564773,-4.8691134,-4.881685,-4.8941913,-4.906634,-4.919014,-4.931332,-4.943589,-4.9557853,-4.967922,-4.9799995,-4.992019,-5.003981,-5.015886,-5.0277343,-5.0395274,-5.0512652,-5.062949,-5.0745792,-5.0861564,-5.097681,-5.1091537,-5.120575,-5.1319456,-5.143266,-5.154537,-5.1657586,-5.1769323,-5.1880574,-5.199135,-5.210166,-5.22115,-5.232088,-5.242981,-5.2538285,-5.2646313,-5.27539,-5.286105,-5.2967772,-5.3074064,-5.3179927,-5.3285375,-5.3390408,-5.3495026,-5.3599234,-5.370304,-5.380645,-5.3909464,-5.4012084,-5.4114313,-5.421616,-5.4317627,-5.441871,-5.4519424,-5.461977,-5.4719744,-5.4819355,-5.491861,-5.50175,-5.511604,-5.521423,-5.5312066,-5.540956,-5.5506716,-5.560353,-5.5700006,-5.579615,-5.5891967,-5.5987453,-5.608262,-5.617746,-5.627198,-5.6366186,-5.646008,-5.655366,-5.664693,-5.67399,-5.6832557,-5.692492,-5.7016983,-5.7108746,-5.7200217,-5.72914,-5.738229,-5.747289,-5.756321,-5.765325,-5.7743006,-5.7832484,-5.7921686,-5.801061,-5.809927,-5.8187656,-5.8275776,-5.836363,-5.845122,-5.8538547,-5.862561,-5.871242,-5.8798976,-5.888528,-5.8971324,-5.905712,-5.914267,-5.922797,-5.931303,-5.9397845,-5.948241,-5.9566746,-5.965084,-5.97347,-5.9818325,-5.9901714,-5.998487,-6.00678,-6.01505,-6.0232973,-6.0315223,-6.039725,-6.047905,-6.056063,-6.064199,-6.072314,-6.0804067,-6.0884776,-6.096528,-6.1045566,-6.1125646,-6.120551,-6.128517,-6.1364627,-6.1443872,-6.152292,-6.1601763,-6.1680403,-6.1758842,-6.183708,-6.191513,-6.1992974,-6.207063,-6.214809,-6.2225356,-6.230243,-6.2379317,-6.245601,-6.253252,-6.260884,-6.2684975,-6.2760925,-6.2836695,-6.2912283,-6.2987685,-6.306291,-6.3137956,-6.3212824,-6.328751,-6.3362026,-6.3436365,-6.351053,-6.3584523,-6.3658347,-6.3731995,-6.3805475,-6.387879,-6.395193,-6.402491,-6.409772,-6.4170365,-6.4242845,-6.4315166,-6.438732,-6.4459314,-6.453115,-6.460283,-6.467434,-6.47457,-6.4816904,-6.488795,-6.4958835,-6.5029573,-6.5100155,-6.5170584,-6.524086,-6.531099,-6.5380964,-6.5450788,-6.552047,-6.559,-6.565938,-6.5728617,-6.579771,-6.5866656,-6.593546,-6.600412,-6.6072636,-6.614101,-6.620924,-6.6277337,-6.6345286,-6.64131,-6.648078,-6.654832,-6.661572,-6.6682987,-6.6750116,-6.681711,-6.6883974,-6.6950703,-6.70173,-6.708376,-6.715009,-6.7216296,-6.7282367,-6.734831,-6.741412,-6.7479806,-6.754536,-6.7610793,-6.7676096,-6.774127,-6.7806325,-6.7871256,-6.793606,-6.8000736,-6.8065295,-6.812973,-6.8194046,-6.825824,-6.832231,-6.838626,-6.8450093,-6.851381,-6.8577404,-6.864088,-6.8704243,-6.8767486,-6.8830614,-6.889363,-6.895653,-6.901931,-6.908198,-6.9144535,-6.920697,-6.9269304,-6.933152,-6.939363,-6.9455624,-6.951751,-6.9579287,-6.964095,-6.9702506,-6.9763956,-6.9825296,-6.9886527,-6.9947653,-7.0008674,-7.0069585,-7.013039,-7.0191092,-7.025169,-7.031218,-7.037257,-7.0432854,-7.0493035,-7.0553117,-7.0613093,-7.067297,-7.073274,-7.0792418,-7.085199,-7.091146,-7.0970836,-7.103011,-7.108928,-7.114836,-7.120734,-7.126622,-7.1325006,-7.1383696,-7.1442285,-7.150078,-7.155918,-7.1617484,-7.1675696,-7.173381,-7.179183,-7.184976,-7.190759,-7.1965337,-7.2022986,-7.208054,-7.213801,-7.219538,-7.2252665,-7.2309856,-7.236696,-7.242397,-7.2480893,-7.2537723,-7.259447,-7.2651124,-7.270769,-7.2764173,-7.2820563,-7.287687,-7.2933087,-7.2989216,-7.304526,-7.310122,-7.3157096,-7.321288,-7.3268585,-7.3324203,-7.3379736,-7.3435187,-7.349056,-7.354584,-7.360104,-7.365616,-7.3711195,-7.376615,-7.382102,-7.3875813,-7.393052,-7.3985147,-7.40397,-7.4094167,-7.414855,-7.420286,-7.425709,-7.4311237,-7.436531,-7.4419303,-7.447322,-7.452705,-7.4580812,-7.463449,-7.4688096,-7.474162,-7.4795074,-7.4848447,-7.4901743,-7.4954967,-7.5008116,-7.506119,-7.5114183,-7.5167108,-7.521995,-7.5272727,-7.5325427,-7.5378056,-7.5430603,-7.5483084,-7.5535493,-7.5587826,-7.5640087,-7.5692277,-7.5744395,-7.579644,-7.5848417,-7.590032,-7.5952153,-7.6003914,-7.605561,-7.6107225,-7.6158776,-7.621026,-7.6261673,-7.6313014,-7.636429,-7.6415496,-7.646663,-7.65177,-7.6568704,-7.6619635,-7.66705,-7.6721296,-7.6772027,-7.682269,-7.687329,-7.692382,-7.697428,-7.702468,-7.707501,-7.7125278,-7.717548,-7.7225614,-7.7275686,-7.732569,-7.737563,-7.742551,-7.747532,-7.752507,-7.7574754,-7.762438,-7.7673936,-7.772343,-7.777286,-7.7822227,-7.7871537,-7.792078,-7.7969966,-7.8019085,-7.806814,-7.8117137,-7.8166075,-7.8214946,-7.826376,-7.831251,-7.8361206,-7.840984,-7.845841,-7.850692,-7.855537,-7.8603764,-7.865209,-7.8700366,-7.874858,-7.8796735,-7.884483,-7.8892865,-7.8940845,-7.8988767,-7.9036627,-7.9084435,-7.913218,-7.917987,-7.92275,-7.9275074,-7.932259,-7.937005],"x":[-50.0,-50.896414342629484,-51.79282868525896,-52.689243027888445,-53.58565737051793,-54.48207171314741,-55.37848605577689,-56.27490039840637,-57.17131474103586,-58.06772908366534,-58.96414342629482,-59.8605577689243,-60.756972111553786,-61.65338645418327,-62.54980079681275,-63.44621513944223,-64.34262948207171,-65.2390438247012,-66.13545816733068,-67.03187250996017,-67.92828685258964,-68.82470119521912,-69.7211155378486,-70.61752988047809,-71.51394422310757,-72.41035856573706,-73.30677290836654,-74.20318725099601,-75.0996015936255,-75.99601593625498,-76.89243027888446,-77.78884462151395,-78.68525896414343,-79.58167330677291,-80.4780876494024,-81.37450199203187,-82.27091633466135,-83.16733067729083,-84.06374501992032,-84.9601593625498,-85.85657370517929,-86.75298804780877,-87.64940239043824,-88.54581673306772,-89.44223107569721,-90.33864541832669,-91.23505976095618,-92.13147410358566,-93.02788844621514,-93.92430278884463,-94.8207171314741,-95.71713147410358,-96.61354581673307,-97.50996015936255,-98.40637450199203,-99.30278884462152,-100.199203187251,-101.09561752988049,-101.99203187250995,-102.88844621513944,-103.78486055776892,-104.6812749003984,-105.57768924302789,-106.47410358565737,-107.37051792828686,-108.26693227091633,-109.16334661354581,-110.0597609561753,-110.95617529880478,-111.85258964143426,-112.74900398406375,-113.64541832669323,-114.54183266932272,-115.43824701195219,-116.33466135458167,-117.23107569721115,-118.12749003984064,-119.02390438247012,-119.9203187250996,-120.81673306772909,-121.71314741035856,-122.60956175298804,-123.50597609561753,-124.40239043824701,-125.2988047808765,-126.19521912350598,-127.09163346613546,-127.98804780876495,-128.88446215139442,-129.78087649402391,-130.67729083665338,-131.57370517928288,-132.47011952191235,-133.36653386454182,-134.26294820717132,-135.1593625498008,-136.0557768924303,-136.95219123505976,-137.84860557768926,-138.74501992031873,-139.6414342629482,-140.5378486055777,-141.43426294820716,-142.33067729083666,-143.22709163346613,-144.12350597609563,-145.0199203187251,-145.91633466135457,-146.81274900398407,-147.70916334661354,-148.60557768924303,-149.5019920318725,-150.398406374502,-151.29482071713147,-152.19123505976097,-153.08764940239044,-153.9840637450199,-154.8804780876494,-155.77689243027888,-156.67330677290838,-157.56972111553785,-158.46613545816734,-159.3625498007968,-160.25896414342628,-161.15537848605578,-162.05179282868525,-162.94820717131475,-163.84462151394422,-164.74103585657372,-165.6374501992032,-166.53386454183266,-167.43027888446215,-168.32669322709162,-169.22310756972112,-170.1195219123506,-171.0159362549801,-171.91235059760956,-172.80876494023903,-173.70517928286853,-174.601593625498,-175.4980079681275,-176.39442231075697,-177.29083665338646,-178.18725099601593,-179.08366533864543,-179.9800796812749,-180.87649402390437,-181.77290836653387,-182.66932270916334,-183.56573705179284,-184.4621513944223,-185.3585657370518,-186.25498007968127,-187.15139442231074,-188.04780876494024,-188.9442231075697,-189.8406374501992,-190.73705179282868,-191.63346613545818,-192.52988047808765,-193.42629482071712,-194.32270916334662,-195.21912350597609,-196.11553784860558,-197.01195219123505,-197.90836653386455,-198.80478087649402,-199.70119521912352,-200.597609561753,-201.49402390438246,-202.39043824701196,-203.28685258964143,-204.18326693227093,-205.0796812749004,-205.9760956175299,-206.87250996015936,-207.76892430278883,-208.66533864541833,-209.5617529880478,-210.4581673306773,-211.35458167330677,-212.25099601593627,-213.14741035856574,-214.0438247011952,-214.9402390438247,-215.83665338645417,-216.73306772908367,-217.62948207171314,-218.52589641434264,-219.4223107569721,-220.3187250996016,-221.21513944223108,-222.11155378486055,-223.00796812749005,-223.90438247011951,-224.800796812749,-225.69721115537848,-226.59362549800798,-227.49003984063745,-228.38645418326692,-229.28286852589642,-230.1792828685259,-231.0756972111554,-231.97211155378486,-232.86852589641435,-233.76494023904382,-234.6613545816733,-235.5577689243028,-236.45418326693226,-237.35059760956176,-238.24701195219123,-239.14342629482073,-240.0398406374502,-240.93625498007967,-241.83266932270917,-242.72908366533864,-243.62549800796813,-244.5219123505976,-245.4183266932271,-246.31474103585657,-247.21115537848607,-248.10756972111554,-249.003984063745,-249.9003984063745,-250.79681274900398,-251.69322709163347,-252.58964143426294,-253.48605577689244,-254.3824701195219,-255.27888446215138,-256.1752988047809,-257.0717131474104,-257.9681274900398,-258.8645418326693,-259.7609561752988,-260.6573705179283,-261.55378486055776,-262.45019920318725,-263.34661354581675,-264.2430278884462,-265.1394422310757,-266.0358565737052,-266.9322709163347,-267.82868525896413,-268.7250996015936,-269.6215139442231,-270.51792828685257,-271.41434262948206,-272.31075697211156,-273.20717131474106,-274.1035856573705,-275.0,-275.8964143426295,-276.79282868525894,-277.68924302788844,-278.58565737051794,-279.48207171314743,-280.3784860557769,-281.2749003984064,-282.17131474103587,-283.0677290836653,-283.9641434262948,-284.8605577689243,-285.7569721115538,-286.65338645418325,-287.54980079681275,-288.44621513944224,-289.3426294820717,-290.2390438247012,-291.1354581673307,-292.0318725099602,-292.9282868525896,-293.8247011952191,-294.7211155378486,-295.61752988047806,-296.51394422310756,-297.41035856573706,-298.30677290836655,-299.203187250996,-300.0996015936255,-300.996015936255,-301.8924302788845,-302.78884462151393,-303.68525896414343,-304.5816733067729,-305.47808764940237,-306.37450199203187,-307.27091633466136,-308.16733067729086,-309.0637450199203,-309.9601593625498,-310.8565737051793,-311.75298804780874,-312.64940239043824,-313.54581673306774,-314.44223107569724,-315.3386454183267,-316.2350597609562,-317.1314741035857,-318.0278884462151,-318.9243027888446,-319.8207171314741,-320.7171314741036,-321.61354581673305,-322.50996015936255,-323.40637450199205,-324.3027888446215,-325.199203187251,-326.0956175298805,-326.99203187251,-327.8884462151394,-328.7848605577689,-329.6812749003984,-330.57768924302786,-331.47410358565736,-332.37051792828686,-333.26693227091636,-334.1633466135458,-335.0597609561753,-335.9561752988048,-336.85258964143424,-337.74900398406373,-338.64541832669323,-339.54183266932273,-340.43824701195217,-341.33466135458167,-342.23107569721117,-343.12749003984067,-344.0239043824701,-344.9203187250996,-345.8167330677291,-346.71314741035854,-347.60956175298804,-348.50597609561754,-349.40239043824704,-350.2988047808765,-351.195219123506,-352.0916334661355,-352.9880478087649,-353.8844621513944,-354.7808764940239,-355.6772908366534,-356.57370517928285,-357.47011952191235,-358.36653386454185,-359.2629482071713,-360.1593625498008,-361.0557768924303,-361.9521912350598,-362.8486055776892,-363.7450199203187,-364.6414342629482,-365.53784860557766,-366.43426294820716,-367.33067729083666,-368.22709163346616,-369.1235059760956,-370.0199203187251,-370.9163346613546,-371.81274900398404,-372.70916334661354,-373.60557768924303,-374.50199203187253,-375.398406374502,-376.2948207171315,-377.19123505976097,-378.0876494023904,-378.9840637450199,-379.8804780876494,-380.7768924302789,-381.67330677290835,-382.56972111553785,-383.46613545816734,-384.3625498007968,-385.2589641434263,-386.1553784860558,-387.0517928286853,-387.9482071713147,-388.8446215139442,-389.7410358565737,-390.6374501992032,-391.53386454183266,-392.43027888446215,-393.32669322709165,-394.2231075697211,-395.1195219123506,-396.0159362549801,-396.9123505976096,-397.80876494023903,-398.7051792828685,-399.601593625498,-400.49800796812747,-401.39442231075697,-402.29083665338646,-403.18725099601596,-404.0836653386454,-404.9800796812749,-405.8764940239044,-406.77290836653384,-407.66932270916334,-408.56573705179284,-409.46215139442234,-410.3585657370518,-411.2549800796813,-412.1513944223108,-413.0478087649402,-413.9442231075697,-414.8406374501992,-415.7370517928287,-416.63346613545815,-417.52988047808765,-418.42629482071715,-419.3227091633466,-420.2191235059761,-421.1155378486056,-422.0119521912351,-422.9083665338645,-423.804780876494,-424.7011952191235,-425.59760956175296,-426.49402390438246,-427.39043824701196,-428.28685258964146,-429.1832669322709,-430.0796812749004,-430.9760956175299,-431.87250996015933,-432.76892430278883,-433.66533864541833,-434.56175298804783,-435.45816733067727,-436.35458167330677,-437.25099601593627,-438.14741035856576,-439.0438247011952,-439.9402390438247,-440.8366533864542,-441.73306772908364,-442.62948207171314,-443.52589641434264,-444.42231075697214,-445.3187250996016,-446.2151394422311,-447.1115537848606,-448.00796812749,-448.9043824701195,-449.800796812749,-450.6972111553785,-451.59362549800795,-452.49003984063745,-453.38645418326695,-454.2828685258964,-455.1792828685259,-456.0756972111554,-456.9721115537849,-457.8685258964143,-458.7649402390438,-459.6613545816733,-460.55776892430276,-461.45418326693226,-462.35059760956176,-463.24701195219126,-464.1434262948207,-465.0398406374502,-465.9362549800797,-466.83266932270914,-467.72908366533864,-468.62549800796813,-469.52191235059763,-470.4183266932271,-471.31474103585657,-472.21115537848607,-473.1075697211155,-474.003984063745,-474.9003984063745,-475.796812749004,-476.69322709163345,-477.58964143426294,-478.48605577689244,-479.38247011952194,-480.2788844621514,-481.1752988047809,-482.0717131474104,-482.9681274900398,-483.8645418326693,-484.7609561752988,-485.6573705179283,-486.55378486055776,-487.45019920318725,-488.34661354581675,-489.2430278884462,-490.1394422310757,-491.0358565737052,-491.9322709163347,-492.82868525896413,-493.7250996015936,-494.6215139442231,-495.51792828685257,-496.41434262948206,-497.31075697211156,-498.20717131474106,-499.1035856573705,-500.0]}
},{}],107:[function(require,module,exports){
module.exports={"expected":[3.6840315,3.7059174,3.7275476,3.74893,3.770071,3.7909775,3.811656,3.8321123,3.8523529,3.8723829,3.8922076,3.9118326,3.9312625,3.9505022,3.9695563,3.9884293,4.0071254,4.0256486,4.044003,4.062192,4.0802197,4.0980897,4.1158047,4.133369,4.150785,4.1680565,4.1851854,4.2021756,4.2190294,4.2357497,4.252339,4.2688,4.2851343,4.301346,4.3174357,4.333407,4.349261,4.3650002,4.3806267,4.3961425,4.4115496,4.4268503,4.442045,4.457137,4.472128,4.4870186,4.501811,4.5165067,4.531108,4.545615,4.5600305,4.574355,4.588591,4.602739,4.6168003,4.6307764,4.644669,4.6584787,4.672207,4.6858554,4.6994243,4.7129154,4.7263303,4.739669,4.752933,4.7661233,4.779241,4.7922873,4.805263,4.818169,4.831006,4.8437753,4.8564773,4.8691134,4.881685,4.8941913,4.906634,4.919014,4.931332,4.943589,4.9557853,4.967922,4.9799995,4.992019,5.003981,5.015886,5.0277343,5.0395274,5.0512652,5.062949,5.0745792,5.0861564,5.097681,5.1091537,5.120575,5.1319456,5.143266,5.154537,5.1657586,5.1769323,5.1880574,5.199135,5.210166,5.22115,5.232088,5.242981,5.2538285,5.2646313,5.27539,5.286105,5.2967772,5.3074064,5.3179927,5.3285375,5.3390408,5.3495026,5.3599234,5.370304,5.380645,5.3909464,5.4012084,5.4114313,5.421616,5.4317627,5.441871,5.4519424,5.461977,5.4719744,5.4819355,5.491861,5.50175,5.511604,5.521423,5.5312066,5.540956,5.5506716,5.560353,5.5700006,5.579615,5.5891967,5.5987453,5.608262,5.617746,5.627198,5.6366186,5.646008,5.655366,5.664693,5.67399,5.6832557,5.692492,5.7016983,5.7108746,5.7200217,5.72914,5.738229,5.747289,5.756321,5.765325,5.7743006,5.7832484,5.7921686,5.801061,5.809927,5.8187656,5.8275776,5.836363,5.845122,5.8538547,5.862561,5.871242,5.8798976,5.888528,5.8971324,5.905712,5.914267,5.922797,5.931303,5.9397845,5.948241,5.9566746,5.965084,5.97347,5.9818325,5.9901714,5.998487,6.00678,6.01505,6.0232973,6.0315223,6.039725,6.047905,6.056063,6.064199,6.072314,6.0804067,6.0884776,6.096528,6.1045566,6.1125646,6.120551,6.128517,6.1364627,6.1443872,6.152292,6.1601763,6.1680403,6.1758842,6.183708,6.191513,6.1992974,6.207063,6.214809,6.2225356,6.230243,6.2379317,6.245601,6.253252,6.260884,6.2684975,6.2760925,6.2836695,6.2912283,6.2987685,6.306291,6.3137956,6.3212824,6.328751,6.3362026,6.3436365,6.351053,6.3584523,6.3658347,6.3731995,6.3805475,6.387879,6.395193,6.402491,6.409772,6.4170365,6.4242845,6.4315166,6.438732,6.4459314,6.453115,6.460283,6.467434,6.47457,6.4816904,6.488795,6.4958835,6.5029573,6.5100155,6.5170584,6.524086,6.531099,6.5380964,6.5450788,6.552047,6.559,6.565938,6.5728617,6.579771,6.5866656,6.593546,6.600412,6.6072636,6.614101,6.620924,6.6277337,6.6345286,6.64131,6.648078,6.654832,6.661572,6.6682987,6.6750116,6.681711,6.6883974,6.6950703,6.70173,6.708376,6.715009,6.7216296,6.7282367,6.734831,6.741412,6.7479806,6.754536,6.7610793,6.7676096,6.774127,6.7806325,6.7871256,6.793606,6.8000736,6.8065295,6.812973,6.8194046,6.825824,6.832231,6.838626,6.8450093,6.851381,6.8577404,6.864088,6.8704243,6.8767486,6.8830614,6.889363,6.895653,6.901931,6.908198,6.9144535,6.920697,6.9269304,6.933152,6.939363,6.9455624,6.951751,6.9579287,6.964095,6.9702506,6.9763956,6.9825296,6.9886527,6.9947653,7.0008674,7.0069585,7.013039,7.0191092,7.025169,7.031218,7.037257,7.0432854,7.0493035,7.0553117,7.0613093,7.067297,7.073274,7.0792418,7.085199,7.091146,7.0970836,7.103011,7.108928,7.114836,7.120734,7.126622,7.1325006,7.1383696,7.1442285,7.150078,7.155918,7.1617484,7.1675696,7.173381,7.179183,7.184976,7.190759,7.1965337,7.2022986,7.208054,7.213801,7.219538,7.2252665,7.2309856,7.236696,7.242397,7.2480893,7.2537723,7.259447,7.2651124,7.270769,7.2764173,7.2820563,7.287687,7.2933087,7.2989216,7.304526,7.310122,7.3157096,7.321288,7.3268585,7.3324203,7.3379736,7.3435187,7.349056,7.354584,7.360104,7.365616,7.3711195,7.376615,7.382102,7.3875813,7.393052,7.3985147,7.40397,7.4094167,7.414855,7.420286,7.425709,7.4311237,7.436531,7.4419303,7.447322,7.452705,7.4580812,7.463449,7.4688096,7.474162,7.4795074,7.4848447,7.4901743,7.4954967,7.5008116,7.506119,7.5114183,7.5167108,7.521995,7.5272727,7.5325427,7.5378056,7.5430603,7.5483084,7.5535493,7.5587826,7.5640087,7.5692277,7.5744395,7.579644,7.5848417,7.590032,7.5952153,7.6003914,7.605561,7.6107225,7.6158776,7.621026,7.6261673,7.6313014,7.636429,7.6415496,7.646663,7.65177,7.6568704,7.6619635,7.66705,7.6721296,7.6772027,7.682269,7.687329,7.692382,7.697428,7.702468,7.707501,7.7125278,7.717548,7.7225614,7.7275686,7.732569,7.737563,7.742551,7.747532,7.752507,7.7574754,7.762438,7.7673936,7.772343,7.777286,7.7822227,7.7871537,7.792078,7.7969966,7.8019085,7.806814,7.8117137,7.8166075,7.8214946,7.826376,7.831251,7.8361206,7.840984,7.845841,7.850692,7.855537,7.8603764,7.865209,7.8700366,7.874858,7.8796735,7.884483,7.8892865,7.8940845,7.8988767,7.9036627,7.9084435,7.913218,7.917987,7.92275,7.9275074,7.932259,7.937005],"x":[50.0,50.896414342629484,51.79282868525896,52.689243027888445,53.58565737051793,54.48207171314741,55.37848605577689,56.27490039840637,57.17131474103586,58.06772908366534,58.96414342629482,59.8605577689243,60.756972111553786,61.65338645418327,62.54980079681275,63.44621513944223,64.34262948207171,65.2390438247012,66.13545816733068,67.03187250996017,67.92828685258964,68.82470119521912,69.7211155378486,70.61752988047809,71.51394422310757,72.41035856573706,73.30677290836654,74.20318725099601,75.0996015936255,75.99601593625498,76.89243027888446,77.78884462151395,78.68525896414343,79.58167330677291,80.4780876494024,81.37450199203187,82.27091633466135,83.16733067729083,84.06374501992032,84.9601593625498,85.85657370517929,86.75298804780877,87.64940239043824,88.54581673306772,89.44223107569721,90.33864541832669,91.23505976095618,92.13147410358566,93.02788844621514,93.92430278884463,94.8207171314741,95.71713147410358,96.61354581673307,97.50996015936255,98.40637450199203,99.30278884462152,100.199203187251,101.09561752988049,101.99203187250995,102.88844621513944,103.78486055776892,104.6812749003984,105.57768924302789,106.47410358565737,107.37051792828686,108.26693227091633,109.16334661354581,110.0597609561753,110.95617529880478,111.85258964143426,112.74900398406375,113.64541832669323,114.54183266932272,115.43824701195219,116.33466135458167,117.23107569721115,118.12749003984064,119.02390438247012,119.9203187250996,120.81673306772909,121.71314741035856,122.60956175298804,123.50597609561753,124.40239043824701,125.2988047808765,126.19521912350598,127.09163346613546,127.98804780876495,128.88446215139442,129.78087649402391,130.67729083665338,131.57370517928288,132.47011952191235,133.36653386454182,134.26294820717132,135.1593625498008,136.0557768924303,136.95219123505976,137.84860557768926,138.74501992031873,139.6414342629482,140.5378486055777,141.43426294820716,142.33067729083666,143.22709163346613,144.12350597609563,145.0199203187251,145.91633466135457,146.81274900398407,147.70916334661354,148.60557768924303,149.5019920318725,150.398406374502,151.29482071713147,152.19123505976097,153.08764940239044,153.9840637450199,154.8804780876494,155.77689243027888,156.67330677290838,157.56972111553785,158.46613545816734,159.3625498007968,160.25896414342628,161.15537848605578,162.05179282868525,162.94820717131475,163.84462151394422,164.74103585657372,165.6374501992032,166.53386454183266,167.43027888446215,168.32669322709162,169.22310756972112,170.1195219123506,171.0159362549801,171.91235059760956,172.80876494023903,173.70517928286853,174.601593625498,175.4980079681275,176.39442231075697,177.29083665338646,178.18725099601593,179.08366533864543,179.9800796812749,180.87649402390437,181.77290836653387,182.66932270916334,183.56573705179284,184.4621513944223,185.3585657370518,186.25498007968127,187.15139442231074,188.04780876494024,188.9442231075697,189.8406374501992,190.73705179282868,191.63346613545818,192.52988047808765,193.42629482071712,194.32270916334662,195.21912350597609,196.11553784860558,197.01195219123505,197.90836653386455,198.80478087649402,199.70119521912352,200.597609561753,201.49402390438246,202.39043824701196,203.28685258964143,204.18326693227093,205.0796812749004,205.9760956175299,206.87250996015936,207.76892430278883,208.66533864541833,209.5617529880478,210.4581673306773,211.35458167330677,212.25099601593627,213.14741035856574,214.0438247011952,214.9402390438247,215.83665338645417,216.73306772908367,217.62948207171314,218.52589641434264,219.4223107569721,220.3187250996016,221.21513944223108,222.11155378486055,223.00796812749005,223.90438247011951,224.800796812749,225.69721115537848,226.59362549800798,227.49003984063745,228.38645418326692,229.28286852589642,230.1792828685259,231.0756972111554,231.97211155378486,232.86852589641435,233.76494023904382,234.6613545816733,235.5577689243028,236.45418326693226,237.35059760956176,238.24701195219123,239.14342629482073,240.0398406374502,240.93625498007967,241.83266932270917,242.72908366533864,243.62549800796813,244.5219123505976,245.4183266932271,246.31474103585657,247.21115537848607,248.10756972111554,249.003984063745,249.9003984063745,250.79681274900398,251.69322709163347,252.58964143426294,253.48605577689244,254.3824701195219,255.27888446215138,256.1752988047809,257.0717131474104,257.9681274900398,258.8645418326693,259.7609561752988,260.6573705179283,261.55378486055776,262.45019920318725,263.34661354581675,264.2430278884462,265.1394422310757,266.0358565737052,266.9322709163347,267.82868525896413,268.7250996015936,269.6215139442231,270.51792828685257,271.41434262948206,272.31075697211156,273.20717131474106,274.1035856573705,275.0,275.8964143426295,276.79282868525894,277.68924302788844,278.58565737051794,279.48207171314743,280.3784860557769,281.2749003984064,282.17131474103587,283.0677290836653,283.9641434262948,284.8605577689243,285.7569721115538,286.65338645418325,287.54980079681275,288.44621513944224,289.3426294820717,290.2390438247012,291.1354581673307,292.0318725099602,292.9282868525896,293.8247011952191,294.7211155378486,295.61752988047806,296.51394422310756,297.41035856573706,298.30677290836655,299.203187250996,300.0996015936255,300.996015936255,301.8924302788845,302.78884462151393,303.68525896414343,304.5816733067729,305.47808764940237,306.37450199203187,307.27091633466136,308.16733067729086,309.0637450199203,309.9601593625498,310.8565737051793,311.75298804780874,312.64940239043824,313.54581673306774,314.44223107569724,315.3386454183267,316.2350597609562,317.1314741035857,318.0278884462151,318.9243027888446,319.8207171314741,320.7171314741036,321.61354581673305,322.50996015936255,323.40637450199205,324.3027888446215,325.199203187251,326.0956175298805,326.99203187251,327.8884462151394,328.7848605577689,329.6812749003984,330.57768924302786,331.47410358565736,332.37051792828686,333.26693227091636,334.1633466135458,335.0597609561753,335.9561752988048,336.85258964143424,337.74900398406373,338.64541832669323,339.54183266932273,340.43824701195217,341.33466135458167,342.23107569721117,343.12749003984067,344.0239043824701,344.9203187250996,345.8167330677291,346.71314741035854,347.60956175298804,348.50597609561754,349.40239043824704,350.2988047808765,351.195219123506,352.0916334661355,352.9880478087649,353.8844621513944,354.7808764940239,355.6772908366534,356.57370517928285,357.47011952191235,358.36653386454185,359.2629482071713,360.1593625498008,361.0557768924303,361.9521912350598,362.8486055776892,363.7450199203187,364.6414342629482,365.53784860557766,366.43426294820716,367.33067729083666,368.22709163346616,369.1235059760956,370.0199203187251,370.9163346613546,371.81274900398404,372.70916334661354,373.60557768924303,374.50199203187253,375.398406374502,376.2948207171315,377.19123505976097,378.0876494023904,378.9840637450199,379.8804780876494,380.7768924302789,381.67330677290835,382.56972111553785,383.46613545816734,384.3625498007968,385.2589641434263,386.1553784860558,387.0517928286853,387.9482071713147,388.8446215139442,389.7410358565737,390.6374501992032,391.53386454183266,392.43027888446215,393.32669322709165,394.2231075697211,395.1195219123506,396.0159362549801,396.9123505976096,397.80876494023903,398.7051792828685,399.601593625498,400.49800796812747,401.39442231075697,402.29083665338646,403.18725099601596,404.0836653386454,404.9800796812749,405.8764940239044,406.77290836653384,407.66932270916334,408.56573705179284,409.46215139442234,410.3585657370518,411.2549800796813,412.1513944223108,413.0478087649402,413.9442231075697,414.8406374501992,415.7370517928287,416.63346613545815,417.52988047808765,418.42629482071715,419.3227091633466,420.2191235059761,421.1155378486056,422.0119521912351,422.9083665338645,423.804780876494,424.7011952191235,425.59760956175296,426.49402390438246,427.39043824701196,428.28685258964146,429.1832669322709,430.0796812749004,430.9760956175299,431.87250996015933,432.76892430278883,433.66533864541833,434.56175298804783,435.45816733067727,436.35458167330677,437.25099601593627,438.14741035856576,439.0438247011952,439.9402390438247,440.8366533864542,441.73306772908364,442.62948207171314,443.52589641434264,444.42231075697214,445.3187250996016,446.2151394422311,447.1115537848606,448.00796812749,448.9043824701195,449.800796812749,450.6972111553785,451.59362549800795,452.49003984063745,453.38645418326695,454.2828685258964,455.1792828685259,456.0756972111554,456.9721115537849,457.8685258964143,458.7649402390438,459.6613545816733,460.55776892430276,461.45418326693226,462.35059760956176,463.24701195219126,464.1434262948207,465.0398406374502,465.9362549800797,466.83266932270914,467.72908366533864,468.62549800796813,469.52191235059763,470.4183266932271,471.31474103585657,472.21115537848607,473.1075697211155,474.003984063745,474.9003984063745,475.796812749004,476.69322709163345,477.58964143426294,478.48605577689244,479.38247011952194,480.2788844621514,481.1752988047809,482.0717131474104,482.9681274900398,483.8645418326693,484.7609561752988,485.6573705179283,486.55378486055776,487.45019920318725,488.34661354581675,489.2430278884462,490.1394422310757,491.0358565737052,491.9322709163347,492.82868525896413,493.7250996015936,494.6215139442231,495.51792828685257,496.41434262948206,497.31075697211156,498.20717131474106,499.1035856573705,500.0]}
},{}],108:[function(require,module,exports){
(function (__filename){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var isnanf = require( '@stdlib/math/base/assert/is-nanf' );
var isNegativeZerof = require( '@stdlib/math/base/assert/is-negative-zerof' );
var isPositiveZerof = require( '@stdlib/math/base/assert/is-positive-zerof' );
var PINF = require( '@stdlib/constants/float32/pinf' );
var NINF = require( '@stdlib/constants/float32/ninf' );
var EPS = require( '@stdlib/constants/float32/eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var cbrtf = require( './../lib' );


// FIXTURES //

var hugeNegative = require( './fixtures/julia/huge_negative.json' );
var hugePositive = require( './fixtures/julia/huge_positive.json' );
var veryLargeNegative = require( './fixtures/julia/very_large_negative.json' );
var veryLargePositive = require( './fixtures/julia/very_large_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var smaller = require( './fixtures/julia/smaller.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );
var subnormal = require( './fixtures/julia/subnormal.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cbrtf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-50,-500]', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = veryLargeNegative.expected;
	x = veryLargeNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[50,500]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = veryLargePositive.expected;
	x = veryLargePositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-20,-50]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeNegative.expected;
	x = largeNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[20,50]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largePositive.expected;
	x = largePositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-20,-3]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumNegative.expected;
	x = mediumNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[3,20]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumPositive.expected;
	x = mediumPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-3,-0.8]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallNegative.expected;
	x = smallNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[0.8,3]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallPositive.expected;
	x = smallPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates cubic root of `x` on the interval `[-0.8,0.8]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smaller.expected;
	x = smaller.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-1e-300,-1e-308]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = tinyNegative.expected;
	x = tinyNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[1e-300,1e-308]`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = tinyPositive.expected;
	x = tinyPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of subnormal `x`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = subnormal.expected;
	x = subnormal.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` (huge negative)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = hugeNegative.expected;
	x = hugeNegative.x;

	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` (huge positive)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = hugePositive.expected;
	x = hugePositive.x;

	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v = cbrtf( NaN );
	t.equal( isnanf( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `-infinity` if provided `-infinity`', function test( t ) {
	var v = cbrtf( NINF );
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', function test( t ) {
	var v = cbrtf( PINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `+0` if provided `+0`', function test( t ) {
	var v = cbrtf( +0.0 );
	t.equal( isPositiveZerof( v ), true, 'returns 0' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0`', function test( t ) {
	var v = cbrtf( -0.0 );
	t.equal( isNegativeZerof( v ), true, 'returns -0' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/cbrtf/test/test.js")
},{"./../lib":92,"./fixtures/julia/huge_negative.json":94,"./fixtures/julia/huge_positive.json":95,"./fixtures/julia/large_negative.json":96,"./fixtures/julia/large_positive.json":97,"./fixtures/julia/medium_negative.json":98,"./fixtures/julia/medium_positive.json":99,"./fixtures/julia/small_negative.json":100,"./fixtures/julia/small_positive.json":101,"./fixtures/julia/smaller.json":102,"./fixtures/julia/subnormal.json":103,"./fixtures/julia/tiny_negative.json":104,"./fixtures/julia/tiny_positive.json":105,"./fixtures/julia/very_large_negative.json":106,"./fixtures/julia/very_large_positive.json":107,"@stdlib/constants/float32/eps":68,"@stdlib/constants/float32/ninf":69,"@stdlib/constants/float32/pinf":70,"@stdlib/math/base/assert/is-nanf":81,"@stdlib/math/base/assert/is-negative-zerof":83,"@stdlib/math/base/assert/is-positive-zerof":85,"@stdlib/math/base/special/abs":87,"tape":269}],109:[function(require,module,exports){
(function (__filename,__dirname){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var isnanf = require( '@stdlib/math/base/assert/is-nanf' );
var isNegativeZerof = require( '@stdlib/math/base/assert/is-negative-zerof' );
var isPositiveZerof = require( '@stdlib/math/base/assert/is-positive-zerof' );
var PINF = require( '@stdlib/constants/float32/pinf' );
var NINF = require( '@stdlib/constants/float32/ninf' );
var EPS = require( '@stdlib/constants/float32/eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var tryRequire = require( '@stdlib/utils/try-require' );


// FIXTURES //

var hugeNegative = require( './fixtures/julia/huge_negative.json' );
var hugePositive = require( './fixtures/julia/huge_positive.json' );
var veryLargeNegative = require( './fixtures/julia/very_large_negative.json' );
var veryLargePositive = require( './fixtures/julia/very_large_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var smaller = require( './fixtures/julia/smaller.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );
var subnormal = require( './fixtures/julia/subnormal.json' );


// VARIABLES //

var cbrtf = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( cbrtf instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cbrtf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-50,-500]', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = veryLargeNegative.expected;
	x = veryLargeNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[50,500]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = veryLargePositive.expected;
	x = veryLargePositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-20,-50]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeNegative.expected;
	x = largeNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[20,50]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largePositive.expected;
	x = largePositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-20,-3]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumNegative.expected;
	x = mediumNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[3,20]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = mediumPositive.expected;
	x = mediumPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-3,-0.8]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallNegative.expected;
	x = smallNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[0.8,3]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallPositive.expected;
	x = smallPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates cubic root of `x` on the interval `[-0.8,0.8]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smaller.expected;
	x = smaller.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[-1e-300,-1e-308]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = tinyNegative.expected;
	x = tinyNegative.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` on the interval `[1e-300,1e-308]`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = tinyPositive.expected;
	x = tinyPositive.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of subnormal `x`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = subnormal.expected;
	x = subnormal.x;
	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` (huge negative)', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = hugeNegative.expected;
	x = hugeNegative.x;

	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function evaluates the cubic root of `x` (huge positive)', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = hugePositive.expected;
	x = hugePositive.x;

	for ( i = 0; i < x.length; i++ ) {
		y = cbrtf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. Δ: '+delta+'. tol: '+tol );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', opts, function test( t ) {
	var v = cbrtf( NaN );
	t.equal( isnanf( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `-infinity` if provided `-infinity`', opts, function test( t ) {
	var v = cbrtf( NINF );
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', opts, function test( t ) {
	var v = cbrtf( PINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `+0` if provided `+0`', opts, function test( t ) {
	var v = cbrtf( +0.0 );
	t.equal( isPositiveZerof( v ), true, 'returns 0' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0`', opts, function test( t ) {
	var v = cbrtf( -0.0 );
	t.equal( isNegativeZerof( v ), true, 'returns -0' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/cbrtf/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/cbrtf/test")
},{"./fixtures/julia/huge_negative.json":94,"./fixtures/julia/huge_positive.json":95,"./fixtures/julia/large_negative.json":96,"./fixtures/julia/large_positive.json":97,"./fixtures/julia/medium_negative.json":98,"./fixtures/julia/medium_positive.json":99,"./fixtures/julia/small_negative.json":100,"./fixtures/julia/small_positive.json":101,"./fixtures/julia/smaller.json":102,"./fixtures/julia/subnormal.json":103,"./fixtures/julia/tiny_negative.json":104,"./fixtures/julia/tiny_positive.json":105,"./fixtures/julia/very_large_negative.json":106,"./fixtures/julia/very_large_positive.json":107,"@stdlib/constants/float32/eps":68,"@stdlib/constants/float32/ninf":69,"@stdlib/constants/float32/pinf":70,"@stdlib/math/base/assert/is-nanf":81,"@stdlib/math/base/assert/is-negative-zerof":83,"@stdlib/math/base/assert/is-positive-zerof":85,"@stdlib/math/base/special/abs":87,"@stdlib/utils/try-require":157,"path":170,"tape":269}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":111}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":114}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":56}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":113,"@stdlib/array/float64":5,"@stdlib/array/uint32":10}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":56}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":117}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":115,"@stdlib/array/float64":5,"@stdlib/array/uint32":10}],118:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":56,"dup":115}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":120}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":118,"@stdlib/array/float64":5,"@stdlib/array/uint32":10}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Convert a double-precision floating-point number to the nearest single-precision floating-point number.
*
* @module @stdlib/number/float64/base/to-float32
*
* @example
* var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );
*
* var y = float64ToFloat32( 1.337 );
* // returns 1.3370000123977661
*/

// MODULES //

var float64ToFloat32 = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

if ( typeof float64ToFloat32 !== 'function' ) {
	float64ToFloat32 = polyfill;
}


// EXPORTS //

module.exports = float64ToFloat32;

},{"./main.js":122,"./polyfill.js":123}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var fround = ( typeof Math.fround === 'function' ) ? Math.fround : null; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = fround;

},{}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Float32Array = require( '@stdlib/array/float32' );


// VARIABLES //

var FLOAT32_VIEW = new Float32Array( 1 );


// MAIN //

/**
* Converts a double-precision floating-point number to the nearest single-precision floating-point number.
*
* @param {number} x - double-precision floating-point number
* @returns {number} nearest single-precision floating-point number
*
* @example
* var y = float64ToFloat32( 1.337 );
* // returns 1.3370000123977661
*/
function float64ToFloat32( x ) {
	FLOAT32_VIEW[ 0 ] = x;
	return FLOAT32_VIEW[ 0 ];
}


// EXPORTS //

module.exports = float64ToFloat32;

},{"@stdlib/array/float32":2}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":126}],125:[function(require,module,exports){
arguments[4][113][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":56,"dup":113}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":127}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":125,"@stdlib/array/float64":5,"@stdlib/array/uint32":10}],128:[function(require,module,exports){
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

/**
* Regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @module @stdlib/regexp/function-name
*
* @example
* var reFunctionName = require( '@stdlib/regexp/function-name' );
* var RE_FUNCTION_NAME = reFunctionName();
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var reFunctionName = require( './main.js' );
var REGEXP = require( './regexp.js' );


// MAIN //

setReadOnly( reFunctionName, 'REGEXP', REGEXP );


// EXPORTS //

module.exports = reFunctionName;

},{"./main.js":129,"./regexp.js":130,"@stdlib/utils/define-nonenumerable-read-only-property":133}],129:[function(require,module,exports){
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
* Returns a regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @returns {RegExp} regular expression
*
* @example
* var RE_FUNCTION_NAME = reFunctionName();
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/
function reFunctionName() {
	return /^\s*function\s*([^(]*)/i;
}


// EXPORTS //

module.exports = reFunctionName;

},{}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var reFunctionName = require( './main.js' );


// MAIN //

/**
* Captures everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* Regular expression: `/^\s*function\s*([^(]*)/i`
*
* -   `/^\s*`
*     -   Match zero or more spaces at beginning
*
* -   `function`
*     -   Match the word `function`
*
* -   `\s*`
*     -   Match zero or more spaces after the word `function`
*
* -   `()`
*     -   Capture
*
* -   `[^(]*`
*     -   Match anything except a left parenthesis `(` zero or more times
*
* -   `/i`
*     -   ignore case
*
* @constant
* @type {RegExp}
* @default /^\s*function\s*([^(]*)/i
*/
var RE_FUNCTION_NAME = reFunctionName();


// EXPORTS //

module.exports = RE_FUNCTION_NAME;

},{"./main.js":129}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Determine the name of a value's constructor.
*
* @module @stdlib/utils/constructor-name
*
* @example
* var constructorName = require( '@stdlib/utils/constructor-name' );
*
* var v = constructorName( 'a' );
* // returns 'String'
*
* v = constructorName( {} );
* // returns 'Object'
*
* v = constructorName( true );
* // returns 'Boolean'
*/

// MODULES //

var constructorName = require( './main.js' );


// EXPORTS //

module.exports = constructorName;

},{"./main.js":132}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var RE = require( '@stdlib/regexp/function-name' ).REGEXP;
var isBuffer = require( '@stdlib/assert/is-buffer' );


// MAIN //

/**
* Determines the name of a value's constructor.
*
* @param {*} v - input value
* @returns {string} name of a value's constructor
*
* @example
* var v = constructorName( 'a' );
* // returns 'String'
*
* @example
* var v = constructorName( 5 );
* // returns 'Number'
*
* @example
* var v = constructorName( null );
* // returns 'Null'
*
* @example
* var v = constructorName( undefined );
* // returns 'Undefined'
*
* @example
* var v = constructorName( function noop() {} );
* // returns 'Function'
*/
function constructorName( v ) {
	var match;
	var name;
	var ctor;
	name = nativeClass( v ).slice( 8, -1 );
	if ( (name === 'Object' || name === 'Error') && v.constructor ) {
		ctor = v.constructor;
		if ( typeof ctor.name === 'string' ) {
			return ctor.name;
		}
		match = RE.exec( ctor.toString() );
		if ( match ) {
			return match[ 1 ];
		}
	}
	if ( isBuffer( v ) ) {
		return 'Buffer';
	}
	return name;
}


// EXPORTS //

module.exports = constructorName;

},{"@stdlib/assert/is-buffer":45,"@stdlib/regexp/function-name":128,"@stdlib/utils/native-class":152}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":134}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":138}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{"./define_property.js":136}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":135,"./has_define_property_support.js":137,"./polyfill.js":139}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );
var builtin = require( './native.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var getProto;
if ( isFunction( Object.getPrototypeOf ) ) {
	getProto = builtin;
} else {
	getProto = polyfill;
}


// EXPORTS //

module.exports = getProto;

},{"./native.js":143,"./polyfill.js":144,"@stdlib/assert/is-function":53}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var getProto = require( './detect.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @param {*} value - input value
* @returns {(Object|null)} prototype
*
* @example
* var proto = getPrototypeOf( {} );
* // returns {}
*/
function getPrototypeOf( value ) {
	if (
		value === null ||
		value === void 0
	) {
		return null;
	}
	// In order to ensure consistent ES5/ES6 behavior, cast input value to an object (strings, numbers, booleans); ES5 `Object.getPrototypeOf` throws when provided primitives and ES6 `Object.getPrototypeOf` casts:
	value = Object( value );

	return getProto( value );
}


// EXPORTS //

module.exports = getPrototypeOf;

},{"./detect.js":140}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return the prototype of a provided object.
*
* @module @stdlib/utils/get-prototype-of
*
* @example
* var getPrototype = require( '@stdlib/utils/get-prototype-of' );
*
* var proto = getPrototype( {} );
* // returns {}
*/

// MODULES //

var getPrototype = require( './get_prototype_of.js' );


// EXPORTS //

module.exports = getPrototype;

},{"./get_prototype_of.js":141}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var getProto = Object.getPrototypeOf;


// EXPORTS //

module.exports = getProto;

},{}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var getProto = require( './proto.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @private
* @param {Object} obj - input object
* @returns {(Object|null)} prototype
*/
function getPrototypeOf( obj ) {
	var proto = getProto( obj );
	if ( proto || proto === null ) {
		return proto;
	}
	if ( nativeClass( obj.constructor ) === '[object Function]' ) {
		// May break if the constructor has been tampered with...
		return obj.constructor.prototype;
	}
	if ( obj instanceof Object ) {
		return Object.prototype;
	}
	// Return `null` for objects created via `Object.create( null )`. Also return `null` for cross-realm objects on browsers that lack `__proto__` support, such as IE < 11.
	return null;
}


// EXPORTS //

module.exports = getPrototypeOf;

},{"./proto.js":145,"@stdlib/utils/native-class":152}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Returns the value of the `__proto__` property.
*
* @private
* @param {Object} obj - input object
* @returns {*} value of `__proto__` property
*/
function getProto( obj ) {
	// eslint-disable-next-line no-proto
	return obj.__proto__;
}


// EXPORTS //

module.exports = getProto;

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

/**
* Returns the global object using code generation.
*
* @private
* @returns {Object} global object
*/
function getGlobal() {
	return new Function( 'return this;' )(); // eslint-disable-line no-new-func
}


// EXPORTS //

module.exports = getGlobal;

},{}],147:[function(require,module,exports){
(function (global){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var obj = ( typeof global === 'object' ) ? global : null;


// EXPORTS //

module.exports = obj;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return the global object.
*
* @module @stdlib/utils/global
*
* @example
* var getGlobal = require( '@stdlib/utils/global' );
*
* var g = getGlobal();
* // returns {...}
*/

// MODULES //

var getGlobal = require( './main.js' );


// EXPORTS //

module.exports = getGlobal;

},{"./main.js":149}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var getThis = require( './codegen.js' );
var Self = require( './self.js' );
var Win = require( './window.js' );
var Global = require( './global.js' );


// MAIN //

/**
* Returns the global object.
*
* ## Notes
*
* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
*
* @param {boolean} [codegen=false] - boolean indicating whether to use code generation to resolve the global object
* @throws {TypeError} must provide a boolean
* @throws {Error} unable to resolve global object
* @returns {Object} global object
*
* @example
* var g = getGlobal();
* // returns {...}
*/
function getGlobal( codegen ) {
	if ( arguments.length ) {
		if ( !isBoolean( codegen ) ) {
			throw new TypeError( 'invalid argument. Must provide a boolean primitive. Value: `'+codegen+'`.' );
		}
		if ( codegen ) {
			return getThis();
		}
		// Fall through...
	}
	// Case: browsers and web workers
	if ( Self ) {
		return Self;
	}
	// Case: browsers
	if ( Win ) {
		return Win;
	}
	// Case: Node.js
	if ( Global ) {
		return Global;
	}
	// Case: unknown
	throw new Error( 'unexpected error. Unable to resolve global object.' );
}


// EXPORTS //

module.exports = getGlobal;

},{"./codegen.js":146,"./global.js":147,"./self.js":150,"./window.js":151,"@stdlib/assert/is-boolean":39}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

},{}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":153,"./polyfill.js":154,"@stdlib/assert/has-tostringtag-support":26}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":155}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":155,"./tostringtag.js":156,"@stdlib/assert/has-own-property":22}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

/**
* Wrap `require` in a try/catch block.
*
* @module @stdlib/utils/try-require
*
* @example
* var tryRequire = require( '@stdlib/utils/try-require' );
*
* var out = tryRequire( 'beepboop' );
*
* if ( out instanceof Error ) {
*     console.log( out.message );
* }
*/

// MODULES //

var tryRequire = require( './try_require.js' );


// EXPORTS //

module.exports = tryRequire;

},{"./try_require.js":158}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isError = require( '@stdlib/assert/is-error' );


// MAIN //

/**
* Wraps `require` in a try/catch block.
*
* @param {string} id - module id
* @returns {*|Error} `module.exports` of the resolved module or an error
*
* @example
* var out = tryRequire( 'beepboop' );
*
* if ( out instanceof Error ) {
*     console.error( out.message );
* }
*/
function tryRequire( id ) {
	try {
		return require( id ); // eslint-disable-line stdlib/no-dynamic-require
	} catch ( error ) {
		if ( isError( error ) ) {
			return error;
		}
		// Handle case where a literal is thrown...
		if ( typeof error === 'object' ) {
			return new Error( JSON.stringify( error ) );
		}
		return new Error( error.toString() );
	}
}


// EXPORTS //

module.exports = tryRequire;

},{"@stdlib/assert/is-error":47}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var RE = require( './fixtures/re.js' );
var nodeList = require( './fixtures/nodelist.js' );
var typedarray = require( './fixtures/typedarray.js' );


// MAIN //

/**
* Checks whether a polyfill is needed when using the `typeof` operator.
*
* @private
* @returns {boolean} boolean indicating whether a polyfill is needed
*/
function check() {
	if (
		// Chrome 1-12 returns 'function' for regular expression instances (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof):
		typeof RE === 'function' ||

		// Safari 8 returns 'object' for typed array and weak map constructors (underscore #1929):
		typeof typedarray === 'object' ||

		// PhantomJS 1.9 returns 'function' for `NodeList` instances (underscore #2236):
		typeof nodeList === 'function'
	) {
		return true;
	}
	return false;
}


// EXPORTS //

module.exports = check;

},{"./fixtures/nodelist.js":160,"./fixtures/re.js":161,"./fixtures/typedarray.js":162}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var getGlobal = require( '@stdlib/utils/global' );


// MAIN //

var root = getGlobal();
var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"@stdlib/utils/global":148}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],162:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

},{}],163:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Determine a value's type.
*
* @module @stdlib/utils/type-of
*
* @example
* var typeOf = require( '@stdlib/utils/type-of' );
*
* var str = typeOf( 'a' );
* // returns 'string'
*
* str = typeOf( 5 );
* // returns 'number'
*/

// MODULES //

var usePolyfill = require( './check.js' );
var typeOf = require( './typeof.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main = ( usePolyfill() ) ? polyfill : typeOf;


// EXPORTS //

module.exports = main;

},{"./check.js":159,"./polyfill.js":164,"./typeof.js":165}],164:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var ctorName = require( '@stdlib/utils/constructor-name' );


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	return ctorName( v ).toLowerCase();
}


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":131}],165:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var ctorName = require( '@stdlib/utils/constructor-name' );


// NOTES //

/*
* Built-in `typeof` operator behavior:
*
* ```text
* typeof null => 'object'
* typeof undefined => 'undefined'
* typeof 'a' => 'string'
* typeof 5 => 'number'
* typeof NaN => 'number'
* typeof true => 'boolean'
* typeof false => 'boolean'
* typeof {} => 'object'
* typeof [] => 'object'
* typeof function foo(){} => 'function'
* typeof function* foo(){} => 'object'
* typeof Symbol() => 'symbol'
* ```
*
*/


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	var type;

	// Address `typeof null` => `object` (see http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null):
	if ( v === null ) {
		return 'null';
	}
	type = typeof v;

	// If the `typeof` operator returned something other than `object`, we are done. Otherwise, we need to check for an internal class name or search for a constructor.
	if ( type === 'object' ) {
		return ctorName( v ).toLowerCase();
	}
	return type;
}


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":131}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){

},{}],168:[function(require,module,exports){
arguments[4][167][0].apply(exports,arguments)
},{"dup":167}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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
},{"_process":261}],171:[function(require,module,exports){
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

},{"events":169,"inherits":256,"readable-stream/lib/_stream_duplex.js":173,"readable-stream/lib/_stream_passthrough.js":174,"readable-stream/lib/_stream_readable.js":175,"readable-stream/lib/_stream_transform.js":176,"readable-stream/lib/_stream_writable.js":177,"readable-stream/lib/internal/streams/end-of-stream.js":181,"readable-stream/lib/internal/streams/pipeline.js":183}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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
},{"./_stream_readable":175,"./_stream_writable":177,"_process":261,"inherits":256}],174:[function(require,module,exports){
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
},{"./_stream_transform":176,"inherits":256}],175:[function(require,module,exports){
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
},{"../errors":172,"./_stream_duplex":173,"./internal/streams/async_iterator":178,"./internal/streams/buffer_list":179,"./internal/streams/destroy":180,"./internal/streams/from":182,"./internal/streams/state":184,"./internal/streams/stream":185,"_process":261,"buffer":186,"events":169,"inherits":256,"string_decoder/":268,"util":167}],176:[function(require,module,exports){
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
},{"../errors":172,"./_stream_duplex":173,"inherits":256}],177:[function(require,module,exports){
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
},{"../errors":172,"./_stream_duplex":173,"./internal/streams/destroy":180,"./internal/streams/state":184,"./internal/streams/stream":185,"_process":261,"buffer":186,"inherits":256,"util-deprecate":277}],178:[function(require,module,exports){
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
},{"./end-of-stream":181,"_process":261}],179:[function(require,module,exports){
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
},{"buffer":186,"util":167}],180:[function(require,module,exports){
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
},{"_process":261}],181:[function(require,module,exports){
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
},{"../../../errors":172}],182:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],183:[function(require,module,exports){
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
},{"../../../errors":172,"./end-of-stream":181}],184:[function(require,module,exports){
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
},{"../../../errors":172}],185:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":169}],186:[function(require,module,exports){
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
},{"base64-js":166,"buffer":186,"ieee754":255}],187:[function(require,module,exports){
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

},{"./":188,"get-intrinsic":251}],188:[function(require,module,exports){
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

},{"function-bind":250,"get-intrinsic":251}],189:[function(require,module,exports){
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

},{"./lib/is_arguments.js":190,"./lib/keys.js":191}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],192:[function(require,module,exports){
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

},{"object-keys":259}],193:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],194:[function(require,module,exports){
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

},{"./ToNumber":224,"./ToPrimitive":226,"./Type":231}],195:[function(require,module,exports){
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

},{"../helpers/isFinite":240,"../helpers/isNaN":241,"../helpers/isPrefixOf":242,"./ToNumber":224,"./ToPrimitive":226,"./Type":231,"get-intrinsic":251}],196:[function(require,module,exports){
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

},{"get-intrinsic":251}],197:[function(require,module,exports){
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

},{"./DayWithinYear":200,"./InLeapYear":204,"./MonthFromTime":214,"get-intrinsic":251}],198:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":246,"./floor":235}],199:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":235}],200:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":198,"./DayFromYear":199,"./YearFromTime":233}],201:[function(require,module,exports){
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

},{"./modulo":236}],202:[function(require,module,exports){
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

},{"../helpers/assertRecord":239,"./IsAccessorDescriptor":205,"./IsDataDescriptor":207,"./Type":231,"get-intrinsic":251}],203:[function(require,module,exports){
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

},{"../helpers/timeConstants":246,"./floor":235,"./modulo":236}],204:[function(require,module,exports){
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

},{"./DaysInYear":201,"./YearFromTime":233,"get-intrinsic":251}],205:[function(require,module,exports){
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

},{"../helpers/assertRecord":239,"./Type":231,"has":254}],206:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":257}],207:[function(require,module,exports){
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

},{"../helpers/assertRecord":239,"./Type":231,"has":254}],208:[function(require,module,exports){
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

},{"../helpers/assertRecord":239,"./IsAccessorDescriptor":205,"./IsDataDescriptor":207,"./Type":231}],209:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":243,"./IsAccessorDescriptor":205,"./IsDataDescriptor":207,"./Type":231}],210:[function(require,module,exports){
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

},{"../helpers/isFinite":240,"../helpers/timeConstants":246}],211:[function(require,module,exports){
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

},{"../helpers/isFinite":240,"./DateFromTime":197,"./Day":198,"./MonthFromTime":214,"./ToInteger":223,"./YearFromTime":233,"./floor":235,"./modulo":236,"get-intrinsic":251}],212:[function(require,module,exports){
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

},{"../helpers/isFinite":240,"../helpers/timeConstants":246,"./ToInteger":223}],213:[function(require,module,exports){
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

},{"../helpers/timeConstants":246,"./floor":235,"./modulo":236}],214:[function(require,module,exports){
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

},{"./DayWithinYear":200,"./InLeapYear":204}],215:[function(require,module,exports){
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

},{"../helpers/isNaN":241}],216:[function(require,module,exports){
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

},{"../helpers/timeConstants":246,"./floor":235,"./modulo":236}],217:[function(require,module,exports){
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

},{"./Type":231}],218:[function(require,module,exports){
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


},{"../helpers/isFinite":240,"./ToNumber":224,"./abs":234,"get-intrinsic":251}],219:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":246,"./DayFromYear":199}],220:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":246,"./modulo":236}],221:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],222:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":224}],223:[function(require,module,exports){
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

},{"../helpers/isFinite":240,"../helpers/isNaN":241,"../helpers/sign":245,"./ToNumber":224,"./abs":234,"./floor":235}],224:[function(require,module,exports){
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

},{"./ToPrimitive":226}],225:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":196,"get-intrinsic":251}],226:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":247}],227:[function(require,module,exports){
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

},{"./IsCallable":206,"./ToBoolean":221,"./Type":231,"get-intrinsic":251,"has":254}],228:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":251}],229:[function(require,module,exports){
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

},{"../helpers/isFinite":240,"../helpers/isNaN":241,"../helpers/sign":245,"./ToNumber":224,"./abs":234,"./floor":235,"./modulo":236}],230:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":224}],231:[function(require,module,exports){
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

},{}],232:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":198,"./modulo":236}],233:[function(require,module,exports){
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

},{"call-bind/callBound":187,"get-intrinsic":251}],234:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":251}],235:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],236:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":244}],237:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":246,"./modulo":236}],238:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":194,"./5/AbstractRelationalComparison":195,"./5/CheckObjectCoercible":196,"./5/DateFromTime":197,"./5/Day":198,"./5/DayFromYear":199,"./5/DayWithinYear":200,"./5/DaysInYear":201,"./5/FromPropertyDescriptor":202,"./5/HourFromTime":203,"./5/InLeapYear":204,"./5/IsAccessorDescriptor":205,"./5/IsCallable":206,"./5/IsDataDescriptor":207,"./5/IsGenericDescriptor":208,"./5/IsPropertyDescriptor":209,"./5/MakeDate":210,"./5/MakeDay":211,"./5/MakeTime":212,"./5/MinFromTime":213,"./5/MonthFromTime":214,"./5/SameValue":215,"./5/SecFromTime":216,"./5/StrictEqualityComparison":217,"./5/TimeClip":218,"./5/TimeFromYear":219,"./5/TimeWithinDay":220,"./5/ToBoolean":221,"./5/ToInt32":222,"./5/ToInteger":223,"./5/ToNumber":224,"./5/ToObject":225,"./5/ToPrimitive":226,"./5/ToPropertyDescriptor":227,"./5/ToString":228,"./5/ToUint16":229,"./5/ToUint32":230,"./5/Type":231,"./5/WeekDay":232,"./5/YearFromTime":233,"./5/abs":234,"./5/floor":235,"./5/modulo":236,"./5/msFromTime":237}],239:[function(require,module,exports){
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

},{"get-intrinsic":251,"has":254}],240:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],241:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],242:[function(require,module,exports){
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

},{"call-bind/callBound":187}],243:[function(require,module,exports){
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

},{"get-intrinsic":251,"has":254}],244:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],245:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],246:[function(require,module,exports){
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

},{}],247:[function(require,module,exports){
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

},{"./helpers/isPrimitive":248,"is-callable":257}],248:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],249:[function(require,module,exports){
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

},{}],250:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":249}],251:[function(require,module,exports){
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

},{"function-bind":250,"has":254,"has-symbols":252}],252:[function(require,module,exports){
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

},{"./shams":253}],253:[function(require,module,exports){
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

},{}],254:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":250}],255:[function(require,module,exports){
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

},{}],256:[function(require,module,exports){
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

},{}],257:[function(require,module,exports){
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

},{}],258:[function(require,module,exports){
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

},{"./isArguments":260}],259:[function(require,module,exports){
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

},{"./implementation":258,"./isArguments":260}],260:[function(require,module,exports){
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

},{}],261:[function(require,module,exports){
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

},{}],262:[function(require,module,exports){
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
},{"_process":261,"through":275,"timers":276}],263:[function(require,module,exports){
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

},{"buffer":186}],264:[function(require,module,exports){
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

},{"es-abstract/es5":238,"function-bind":250}],265:[function(require,module,exports){
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

},{"./implementation":264,"./polyfill":266,"./shim":267,"define-properties":192,"function-bind":250}],266:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":264}],267:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":266,"define-properties":192}],268:[function(require,module,exports){
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
},{"safe-buffer":263}],269:[function(require,module,exports){
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
},{"./lib/default_stream":270,"./lib/results":272,"./lib/test":273,"_process":261,"defined":193,"through":275,"timers":276}],270:[function(require,module,exports){
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
},{"_process":261,"fs":168,"through":275}],271:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":261,"timers":276}],272:[function(require,module,exports){
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
},{"_process":261,"events":169,"function-bind":250,"has":254,"inherits":256,"object-inspect":274,"resumer":262,"through":275,"timers":276}],273:[function(require,module,exports){
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
},{"./next_tick":271,"deep-equal":189,"defined":193,"events":169,"has":254,"inherits":256,"path":170,"string.prototype.trim":265}],274:[function(require,module,exports){
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

},{}],275:[function(require,module,exports){
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
},{"_process":261,"stream":171}],276:[function(require,module,exports){
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
},{"process/browser.js":261,"timers":276}],277:[function(require,module,exports){
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
},{}]},{},[108,109]);
