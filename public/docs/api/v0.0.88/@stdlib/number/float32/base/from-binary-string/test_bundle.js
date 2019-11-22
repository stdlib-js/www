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

var ctor = ( typeof Float32Array === 'function' ) ? Float32Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./float32array.js":1,"./polyfill.js":3,"@stdlib/assert/has-float32array-support":20}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./float64array.js":4,"./polyfill.js":6,"@stdlib/assert/has-float64array-support":23}],6:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./polyfill.js":8,"./uint16array.js":9,"@stdlib/assert/has-uint16array-support":33}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./polyfill.js":11,"./uint32array.js":12,"@stdlib/assert/has-uint32array-support":36}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./polyfill.js":14,"./uint8array.js":15,"@stdlib/assert/has-uint8array-support":39}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


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

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


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
* Test for `Object.defineProperty` support.
*
* @module @stdlib/assert/has-define-property-support
*
* @example
* var hasDefinePropertySupport = require( '@stdlib/assert/has-define-property-support' );
*
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/

// MODULES //

var hasDefinePropertySupport = require( './main.js' );


// EXPORTS //

module.exports = hasDefinePropertySupport;

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

var defineProperty = require( './define_property.js' );


// MAIN //

/**
* Tests for `Object.defineProperty` support.
*
* @returns {boolean} boolean indicating if an environment has `Object.defineProperty` support
*
* @example
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/
function hasDefinePropertySupport() {
	var bool;

	if ( typeof defineProperty !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		defineProperty( {}, 'x', {} );
		bool = true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasDefinePropertySupport;

},{"./define_property.js":16}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isFloat32Array = require( '@stdlib/assert/is-float32array' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
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

},{"./float32array.js":19,"@stdlib/assert/is-float32array":44,"@stdlib/constants/math/float64-pinf":91}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":24}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./float64array.js":22,"@stdlib/assert/is-float64array":46}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test whether an object has a specified property, either own or inherited.
*
* @module @stdlib/assert/has-property
*
* @example
* var hasProp = require( '@stdlib/assert/has-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasProp( beep, 'boop' );
* // returns true
*
* bool = hasProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var hasProp = require( './main.js' );


// EXPORTS //

module.exports = hasProp;

},{"./main.js":28}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Tests if an object has a specified property, either own or inherited.
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
* var bool = hasProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasProp( beep, 'bap' );
* // returns false
*/
function hasProp( value, property ) {
	if ( value === void 0 || value === null ) {
		return false;
	}
	if ( typeof property === 'symbol' ) {
		return property in Object( value );
	}
	return ( String( property ) in Object( value ) );
}


// EXPORTS //

module.exports = hasProp;

},{}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":30}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/has-symbol-support":29}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":34}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint16array.js":35,"@stdlib/assert/is-uint16array":74,"@stdlib/constants/math/uint16-max":93}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint32array.js":38,"@stdlib/assert/is-uint32array":76,"@stdlib/constants/math/uint32-max":94}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":40}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint8array.js":41,"@stdlib/assert/is-uint8array":78,"@stdlib/constants/math/uint8-max":95}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":43}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":184}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":45}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":184}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":47}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":184}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an integer.
*
* @module @stdlib/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/assert/is-integer' );
*
* var bool = isInteger( 5.0 );
* // returns true
*
* bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isInteger( -3.14 );
* // returns false
*
* bool = isInteger( null );
* // returns false
*
* @example
* // Use interface to check for integer primitives...
* var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
*
* var bool = isInteger( -3.0 );
* // returns true
*
* bool = isInteger( new Number( -3.0 ) );
* // returns false
*
* @example
* // Use interface to check for integer objects...
* var isInteger = require( '@stdlib/assert/is-integer' ).isObject;
*
* var bool = isInteger( 3.0 );
* // returns false
*
* bool = isInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isInteger = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isInteger, 'isPrimitive', isPrimitive );
setReadOnly( isInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isInteger;

},{"./main.js":50,"./object.js":51,"./primitive.js":52,"@stdlib/utils/define-nonenumerable-read-only-property":179}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var isInt = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a number primitive is an integer value.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a number primitive is an integer value
*/
function isInteger( value ) {
	return (
		value < PINF &&
		value > NINF &&
		isInt( value )
	);
}


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/constants/math/float64-ninf":90,"@stdlib/constants/math/float64-pinf":91,"@stdlib/math/base/assert/is-integer":100}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Tests if a value is an integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an integer
*
* @example
* var bool = isInteger( 5.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isInteger( -3.14 );
* // returns false
*
* @example
* var bool = isInteger( null );
* // returns false
*/
function isInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isInteger;

},{"./object.js":51,"./primitive.js":52}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number object having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having an integer value
*
* @example
* var bool = isInteger( 3.0 );
* // returns false
*
* @example
* var bool = isInteger( new Number( 3.0 ) );
* // returns true
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value.valueOf() )
	);
}


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":49,"@stdlib/assert/is-number":60}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number primitive having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having an integer value
*
* @example
* var bool = isInteger( -3.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( -3.0 ) );
* // returns false
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value )
	);
}


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":49,"@stdlib/assert/is-number":60}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/array/uint16":7,"@stdlib/array/uint8":13}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ctors.js":53}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a nonnegative integer.
*
* @module @stdlib/assert/is-nonnegative-integer
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' );
*
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* bool = isNonNegativeInteger( null );
* // returns false
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isObject;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isNonNegativeInteger = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeInteger, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./main.js":57,"./object.js":58,"./primitive.js":59,"@stdlib/utils/define-nonenumerable-read-only-property":179}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Tests if a value is a nonnegative integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a nonnegative integer
*
* @example
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( null );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./object.js":58,"./primitive.js":59}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() >= 0
	);
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":48}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value >= 0
	);
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":48}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a number.
*
* @module @stdlib/assert/is-number
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' );
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( null );
* // returns false
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns false
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' ).isObject;
*
* var bool = isNumber( 3.14 );
* // returns false
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isNumber = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNumber;

},{"./main.js":61,"./object.js":62,"./primitive.js":63,"@stdlib/utils/define-nonenumerable-read-only-property":179}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Tests if a value is a number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a number
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( null );
* // returns false
*/
function isNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNumber;

},{"./object.js":62,"./primitive.js":63}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var Number = require( '@stdlib/number/ctor' );
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a number object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object
*
* @example
* var bool = isNumber( 3.14 );
* // returns false
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*/
function isNumber( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof Number ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Number]' );
	}
	return false;
}


// EXPORTS //

module.exports = isNumber;

},{"./try2serialize.js":65,"@stdlib/assert/has-tostringtag-support":31,"@stdlib/number/ctor":133,"@stdlib/utils/native-class":184}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
	return ( typeof value === 'number' );
}


// EXPORTS //

module.exports = isNumber;

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

// MODULES //

var Number = require( '@stdlib/number/ctor' );


// MAIN //

// eslint-disable-next-line stdlib/no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{"@stdlib/number/ctor":133}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":64}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an object.
*
* @module @stdlib/assert/is-object
*
* @example
* var isObject = require( '@stdlib/assert/is-object' );
*
* var bool = isObject( {} );
* // returns true
*
* bool = isObject( true );
* // returns false
*/

// MODULES //

var isObject = require( './main.js' );


// EXPORTS //

module.exports = isObject;

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

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Tests if a value is an object; e.g., `{}`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an object
*
* @example
* var bool = isObject( {} );
* // returns true
*
* @example
* var bool = isObject( null );
* // returns false
*/
function isObject( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		!isArray( value )
	);
}


// EXPORTS //

module.exports = isObject;

},{"@stdlib/assert/is-array":42}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a string.
*
* @module @stdlib/assert/is-string
*
* @example
* var isString = require( '@stdlib/assert/is-string' );
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 5 );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isObject;
*
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 'beep' );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isString = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isString, 'isPrimitive', isPrimitive );
setReadOnly( isString, 'isObject', isObject );


// EXPORTS //

module.exports = isString;

},{"./main.js":69,"./object.js":70,"./primitive.js":71,"@stdlib/utils/define-nonenumerable-read-only-property":179}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Tests if a value is a string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a string
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* @example
* var bool = isString( 'beep' );
* // returns true
*/
function isString( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isString;

},{"./object.js":70,"./primitive.js":71}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var test = require( './try2valueof.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a string object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string object
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* @example
* var bool = isString( 'beep' );
* // returns false
*/
function isString( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof String ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object String]' );
	}
	return false;
}


// EXPORTS //

module.exports = isString;

},{"./try2valueof.js":72,"@stdlib/assert/has-tostringtag-support":31,"@stdlib/utils/native-class":184}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
	return ( typeof value === 'string' );
}


// EXPORTS //

module.exports = isString;

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

// MODULES //

var valueOf = require( './valueof.js' ); // eslint-disable-line stdlib/no-redeclare


// MAIN //

/**
* Attempts to extract a string value.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a string can be extracted
*/
function test( value ) {
	try {
		valueOf.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./valueof.js":73}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

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

},{"@stdlib/utils/native-class":184}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":184}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":184}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* The bias of a single-precision floating-point number's exponent.
*
* @module @stdlib/constants/math/float32-exponent-bias
* @type {integer32}
*
* @example
* var FLOAT32_EXPONENT_BIAS = require( '@stdlib/constants/math/float32-exponent-bias' );
* // returns 127
*/


// MAIN //

/**
* The bias of a single-precision floating-point number's exponent.
*
* ## Notes
*
* The bias can be computed via
*
* ```tex
* \mathrm{bias} = 2^{k-1} - 1
* ```
*
* where \\(k\\) is the number of bits in the exponent; here, \\(k = 8\\).
*
* @constant
* @type {integer32}
* @default 127
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_EXPONENT_BIAS = 127|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT32_EXPONENT_BIAS;

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

'use strict';

/**
* Single-precision floating-point negative infinity.
*
* @module @stdlib/constants/math/float32-ninf
* @type {number}
*
* @example
* var FLOAT32_NINF = require( '@stdlib/constants/math/float32-ninf' );
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

},{"@stdlib/array/float32":2,"@stdlib/array/uint32":10}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* @module @stdlib/constants/math/float32-pinf
* @type {number}
*
* @example
* var FLOAT32_PINF = require( '@stdlib/constants/math/float32-pinf' );
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

},{"@stdlib/array/float32":2,"@stdlib/array/uint32":10}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/math/float64-high-word-exponent-mask' );
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
*/

'use strict';

/**
* Natural logarithm of `2`.
*
* @module @stdlib/constants/math/float64-ln-two
* @type {number}
*
* @example
* var LN2 = require( '@stdlib/constants/math/float64-ln-two' );
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
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/math/float64-max-base2-exponent-subnormal' );
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
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent' );
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

},{}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum safe double-precision floating-point integer.
*
* @module @stdlib/constants/math/float64-max-safe-integer
* @type {number}
*
* @example
* var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/math/float64-max-safe-integer' );
* // returns 9007199254740991
*/


// MAIN //

/**
* Maximum safe double-precision floating-point integer.
*
* ## Notes
*
* The integer has the value
*
* ```tex
* 2^{53} - 1
* ```
*
* @constant
* @type {number}
* @default 9007199254740991
* @see [Safe Integers]{@link http://www.2ality.com/2013/10/safe-integers.html}
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_SAFE_INTEGER = 9007199254740991;


// EXPORTS //

module.exports = FLOAT64_MAX_SAFE_INTEGER;

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
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/math/float64-min-base2-exponent-subnormal' );
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

},{"@stdlib/number/ctor":133}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/constants/math/float64-smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/math/float64-smallest-normal' );
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

},{}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_even.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-integer":100}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a numeric value is infinite.
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

var isInfinite = require( './is_infinite.js' );


// EXPORTS //

module.exports = isInfinite;

},{"./is_infinite.js":99}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is infinite.
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

},{"@stdlib/constants/math/float64-ninf":90,"@stdlib/constants/math/float64-pinf":91}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_integer.js":101}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":117}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_nan.js":103}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

/**
* Test if a numeric value is negative zero.
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

var isNegativeZero = require( './is_negative_zero.js' );


// EXPORTS //

module.exports = isNegativeZero;

},{"./is_negative_zero.js":105}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is negative zero.
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

},{"@stdlib/constants/math/float64-ninf":90}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_odd.js":107}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-even":96}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a numeric value is positive zero.
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

var isPositiveZero = require( './is_positive_zero.js' );


// EXPORTS //

module.exports = isPositiveZero;

},{"./is_positive_zero.js":109}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Tests if a numeric value is positive zero.
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

},{"@stdlib/constants/math/float64-pinf":91}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./abs.js":110}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Rounds a numeric value toward positive infinity.
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

/**
* Round a numeric value toward positive infinity.
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

var ceil = require( './ceil.js' );


// EXPORTS //

module.exports = ceil;

},{"./ceil.js":112}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/from-words":149,"@stdlib/number/float64/base/get-high-word":153,"@stdlib/number/float64/base/to-words":167}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./copysign.js":114}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Rounds a numeric value toward negative infinity.
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

},{}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Round a numeric value toward negative infinity.
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

var floor = require( './floor.js' );


// EXPORTS //

module.exports = floor;

},{"./floor.js":116}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ldexp.js":119}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var MAX_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent' );
var MAX_SUBNORMAL_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent-subnormal' );
var MIN_SUBNORMAL_EXPONENT = require( '@stdlib/constants/math/float64-min-base2-exponent-subnormal' );
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

},{"@stdlib/constants/math/float64-exponent-bias":83,"@stdlib/constants/math/float64-max-base2-exponent":87,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":86,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":89,"@stdlib/constants/math/float64-ninf":90,"@stdlib/constants/math/float64-pinf":91,"@stdlib/math/base/assert/is-infinite":98,"@stdlib/math/base/assert/is-nan":102,"@stdlib/math/base/special/copysign":115,"@stdlib/number/float64/base/exponent":147,"@stdlib/number/float64/base/from-words":149,"@stdlib/number/float64/base/normalize":155,"@stdlib/number/float64/base/to-words":167}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./pow.js":126}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
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

},{"./polyval_l.js":123,"@stdlib/constants/math/float64-exponent-bias":83,"@stdlib/number/float64/base/get-high-word":153,"@stdlib/number/float64/base/set-high-word":159,"@stdlib/number/float64/base/set-low-word":161}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":125,"@stdlib/number/float64/base/set-low-word":161}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
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

},{"./log2ax.js":121,"./logx.js":122,"./pow2.js":127,"./x_is_zero.js":128,"./y_is_huge.js":129,"./y_is_infinite.js":130,"@stdlib/constants/math/float64-ninf":90,"@stdlib/constants/math/float64-pinf":91,"@stdlib/math/base/assert/is-infinite":98,"@stdlib/math/base/assert/is-integer":100,"@stdlib/math/base/assert/is-nan":102,"@stdlib/math/base/assert/is-odd":106,"@stdlib/math/base/special/abs":111,"@stdlib/math/base/special/sqrt":131,"@stdlib/number/float64/base/set-low-word":161,"@stdlib/number/float64/base/to-words":167,"@stdlib/number/uint32/base/to-int32":171}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var LN2 = require( '@stdlib/constants/math/float64-ln-two' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
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

},{"./polyval_p.js":124,"@stdlib/constants/math/float64-exponent-bias":83,"@stdlib/constants/math/float64-ln-two":85,"@stdlib/math/base/special/ldexp":118,"@stdlib/number/float64/base/get-high-word":153,"@stdlib/number/float64/base/set-high-word":159,"@stdlib/number/float64/base/set-low-word":161,"@stdlib/number/uint32/base/to-int32":171}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


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

},{"@stdlib/constants/math/float64-ninf":90,"@stdlib/constants/math/float64-pinf":91,"@stdlib/math/base/assert/is-odd":106,"@stdlib/math/base/special/copysign":115}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/number/float64/base/get-high-word":153}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var PINF = require( '@stdlib/constants/math/float64-pinf' );


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

},{"@stdlib/constants/math/float64-pinf":91,"@stdlib/math/base/special/abs":111}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":134}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Create a single-precision floating-point number from an IEEE 754 literal bit representation.
*
* @module @stdlib/number/float32/base/from-binary-string
*
* @example
* var fromBinaryStringf = require( '@stdlib/number/float32/base/from-binary-string' );
*
* var bstr = '01000000100000000000000000000000';
* var val = fromBinaryStringf( bstr );
* // returns 4.0
*
* bstr = '01000000010010010000111111011011';
* val = fromBinaryStringf( bstr );
* // returns ~3.14
*
* bstr = '11111111011011000011101000110011';
* val = fromBinaryStringf( bstr );
* // returns ~-3.14e+38
*/

// MODULES //

var fromBinaryStringf = require( './main.js' );


// EXPORTS //

module.exports = fromBinaryStringf;

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

var PINF = require( '@stdlib/constants/math/float32-pinf' );
var NINF = require( '@stdlib/constants/math/float32-ninf' );
var BIAS = require( '@stdlib/constants/math/float32-exponent-bias' );
var pow = require( '@stdlib/math/base/special/pow' );
var toFloat32 = require( '@stdlib/number/float64/base/to-float32' );
var toFrac = require( './tofrac.js' );


// MAIN //

/**
* Creates a single-precision floating-point number from an IEEE 754 literal bit representation.
*
* @param {BinaryString} bstr - string which is a literal bit representation
* @throws {Error} must provide a string with a length equal to `32`
* @returns {number} single-precision floating-point number
*
* @example
* var bstr = '01000000100000000000000000000000';
* var v = fromBinaryStringf( bstr );
* // returns 4.0
*
* @example
* var bstr = '01000000010010010000111111011011';
* var v = fromBinaryStringf( bstr );
* // returns ~3.14
*
* @example
* var bstr = '11111111011011000011101000110011';
* var v = fromBinaryStringf( bstr );
* // returns ~-3.14e+38
*
* @example
* var bstr = '00000000000000000000000000000000';
* var v =  fromBinaryStringf( bstr );
* // returns 0.0
*
* @example
* var bstr = '10000000000000000000000000000000';
* var v = fromBinaryStringf( bstr );
* // returns -0.0
*/
function fromBinaryStringf( bstr ) {
	var sign;
	var frac;
	var exp;

	if ( bstr.length !== 32 ) {
		throw new Error( 'invalid argument. Input string must have a length equal to 32. Value: `'+bstr+'`.' );
	}
	// Sign bit:
	sign = ( bstr[0] === '1' ) ? -1.0 : 1.0;

	// Exponent bits:
	exp = parseInt( bstr.substring(1, 9), 2 ) - BIAS;

	// Fraction bits:
	frac = toFrac( bstr.substring( 9 ) );

	// Detect `0` (all 0s) and subnormals (exponent bits are all 0, but fraction bits are not all 0s)...
	if ( exp === -BIAS ) {
		if ( frac === 0.0 ) {
			return ( sign === 1.0 ) ? 0.0 : -0.0;
		}
		exp = -(BIAS-1); // subnormals are special in that their exponent is constant
	}
	// Detect `+-inf` (exponent bits are all 1 and fraction is 0) and `NaN` (exponent bits are all 1 and fraction is not 0)...
	else if ( exp === BIAS+1 ) {
		if ( frac === 0.0 ) {
			return ( sign === 1.0 ) ? PINF : NINF;
		}
		return NaN;
	}
	// Normal numbers...
	else {
		// Account for hidden/implicit bit (2^0):
		frac += 1.0;
	}
	return toFloat32( sign*frac*pow(2, exp) );
}


// EXPORTS //

module.exports = fromBinaryStringf;

},{"./tofrac.js":137,"@stdlib/constants/math/float32-exponent-bias":80,"@stdlib/constants/math/float32-ninf":81,"@stdlib/constants/math/float32-pinf":82,"@stdlib/math/base/special/pow":120,"@stdlib/number/float64/base/to-float32":164}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Converts a float's fraction bit sequence to a numeric value.
*
* @private
* @param {BinaryString} frac - literal bit representation of a float's fraction bit sequence
* @returns {number} fraction value
*
* @example
* var v = toFrac( '10001100010111110011000' );
* // returns ~0.548
*
* @example
* var v = toFrac( '11110101000101011111111' );
* // returns ~0.957
*/
function toFrac( frac ) {
	var sum = 0;
	var i;
	for ( i = 0; i < frac.length; i++ ) {
		if ( frac[ i ] === '1' ) {
			sum += pow( 2.0, -(i+1) );
		}
	}
	return sum;
}


// EXPORTS //

module.exports = toFrac;

},{"@stdlib/math/base/special/pow":120}],138:[function(require,module,exports){
module.exports={"expected":[-1000.0,-998.0119018554688,-996.0238647460938,-994.0357666015625,-992.0477294921875,-990.0596313476562,-988.0715942382812,-986.08349609375,-984.0953979492188,-982.1073608398438,-980.1192626953125,-978.1312255859375,-976.1431274414062,-974.1550903320312,-972.1669921875,-970.178955078125,-968.1908569335938,-966.2027587890625,-964.2147216796875,-962.2266235351562,-960.2385864257812,-958.25048828125,-956.262451171875,-954.2743530273438,-952.2862548828125,-950.2982177734375,-948.3101196289062,-946.3220825195312,-944.333984375,-942.345947265625,-940.3578491210938,-938.3697509765625,-936.3817138671875,-934.3936157226562,-932.4055786132812,-930.41748046875,-928.429443359375,-926.4413452148438,-924.4533081054688,-922.4652099609375,-920.4771118164062,-918.4890747070312,-916.5009765625,-914.512939453125,-912.5248413085938,-910.5368041992188,-908.5487060546875,-906.5606079101562,-904.5725708007812,-902.58447265625,-900.596435546875,-898.6083374023438,-896.6203002929688,-894.6322021484375,-892.6441650390625,-890.6560668945312,-888.66796875,-886.679931640625,-884.6918334960938,-882.7037963867188,-880.7156982421875,-878.7276611328125,-876.7395629882812,-874.75146484375,-872.763427734375,-870.7753295898438,-868.7872924804688,-866.7991943359375,-864.8111572265625,-862.8230590820312,-860.8349609375,-858.846923828125,-856.8588256835938,-854.8707885742188,-852.8826904296875,-850.8946533203125,-848.9065551757812,-846.9185180664062,-844.930419921875,-842.9423217773438,-840.9542846679688,-838.9661865234375,-836.9781494140625,-834.9900512695312,-833.0020141601562,-831.013916015625,-829.0258178710938,-827.0377807617188,-825.0496826171875,-823.0616455078125,-821.0735473632812,-819.0855102539062,-817.097412109375,-815.1093139648438,-813.1212768554688,-811.1331787109375,-809.1451416015625,-807.1570434570312,-805.1690063476562,-803.180908203125,-801.19287109375,-799.2047729492188,-797.2166748046875,-795.2286376953125,-793.2405395507812,-791.2525024414062,-789.264404296875,-787.2763671875,-785.2882690429688,-783.3001708984375,-781.3121337890625,-779.3240356445312,-777.3359985351562,-775.347900390625,-773.35986328125,-771.3717651367188,-769.3837280273438,-767.3956298828125,-765.4075317382812,-763.4194946289062,-761.431396484375,-759.443359375,-757.4552612304688,-755.4672241210938,-753.4791259765625,-751.4910278320312,-749.5029907226562,-747.514892578125,-745.52685546875,-743.5387573242188,-741.5507202148438,-739.5626220703125,-737.5745239257812,-735.5864868164062,-733.598388671875,-731.6103515625,-729.6222534179688,-727.6342163085938,-725.6461181640625,-723.6580810546875,-721.6699829101562,-719.681884765625,-717.69384765625,-715.7057495117188,-713.7177124023438,-711.7296142578125,-709.7415771484375,-707.7534790039062,-705.765380859375,-703.77734375,-701.7892456054688,-699.8012084960938,-697.8131103515625,-695.8250732421875,-693.8369750976562,-691.848876953125,-689.86083984375,-687.8727416992188,-685.8847045898438,-683.8966064453125,-681.9085693359375,-679.9204711914062,-677.9324340820312,-675.9443359375,-673.9562377929688,-671.9682006835938,-669.9801025390625,-667.9920654296875,-666.0039672851562,-664.0159301757812,-662.02783203125,-660.0397338867188,-658.0516967773438,-656.0635986328125,-654.0755615234375,-652.0874633789062,-650.0994262695312,-648.111328125,-646.1232299804688,-644.1351928710938,-642.1470947265625,-640.1590576171875,-638.1709594726562,-636.1829223632812,-634.19482421875,-632.206787109375,-630.2186889648438,-628.2305908203125,-626.2425537109375,-624.2544555664062,-622.2664184570312,-620.2783203125,-618.290283203125,-616.3021850585938,-614.3140869140625,-612.3260498046875,-610.3379516601562,-608.3499145507812,-606.36181640625,-604.373779296875,-602.3856811523438,-600.3976440429688,-598.4095458984375,-596.4214477539062,-594.4334106445312,-592.4453125,-590.457275390625,-588.4691772460938,-586.4811401367188,-584.4930419921875,-582.5049438476562,-580.5169067382812,-578.52880859375,-576.540771484375,-574.5526733398438,-572.5646362304688,-570.5765380859375,-568.5884399414062,-566.6004028320312,-564.6123046875,-562.624267578125,-560.6361694335938,-558.6481323242188,-556.6600341796875,-554.6719970703125,-552.6838989257812,-550.69580078125,-548.707763671875,-546.7196655273438,-544.7316284179688,-542.7435302734375,-540.7554931640625,-538.7673950195312,-536.779296875,-534.791259765625,-532.8031616210938,-530.8151245117188,-528.8270263671875,-526.8389892578125,-524.8508911132812,-522.86279296875,-520.874755859375,-518.8866577148438,-516.8986206054688,-514.9105224609375,-512.9224853515625,-510.93438720703125,-508.9463195800781,-506.958251953125,-504.9701843261719,-502.98211669921875,-500.9940490722656,-499.0059509277344,-497.01788330078125,-495.0298156738281,-493.041748046875,-491.0536804199219,-489.06561279296875,-487.0775451660156,-485.0894775390625,-483.10137939453125,-481.1133117675781,-479.125244140625,-477.1371765136719,-475.14910888671875,-473.1610412597656,-471.1729736328125,-469.18487548828125,-467.1968078613281,-465.208740234375,-463.2206726074219,-461.23260498046875,-459.2445373535156,-457.2564697265625,-455.2684020996094,-453.2803039550781,-451.292236328125,-449.3041687011719,-447.31610107421875,-445.3280334472656,-443.3399658203125,-441.3518981933594,-439.36383056640625,-437.375732421875,-435.3876647949219,-433.39959716796875,-431.4115295410156,-429.4234619140625,-427.4353942871094,-425.44732666015625,-423.4592590332031,-421.4711608886719,-419.48309326171875,-417.4950256347656,-415.5069580078125,-413.5188903808594,-411.53082275390625,-409.5427551269531,-407.5546569824219,-405.56658935546875,-403.5785217285156,-401.5904541015625,-399.6023864746094,-397.61431884765625,-395.6262512207031,-393.63818359375,-391.65008544921875,-389.6620178222656,-387.6739501953125,-385.6858825683594,-383.69781494140625,-381.7097473144531,-379.7216796875,-377.7336120605469,-375.7455139160156,-373.7574462890625,-371.7693786621094,-369.78131103515625,-367.7932434082031,-365.80517578125,-363.8171081542969,-361.82904052734375,-359.8409423828125,-357.8528747558594,-355.86480712890625,-353.8767395019531,-351.888671875,-349.9006042480469,-347.91253662109375,-345.9244384765625,-343.9363708496094,-341.94830322265625,-339.9602355957031,-337.97216796875,-335.9841003417969,-333.99603271484375,-332.0079650878906,-330.0198669433594,-328.03179931640625,-326.0437316894531,-324.0556640625,-322.0675964355469,-320.07952880859375,-318.0914611816406,-316.1033935546875,-314.11529541015625,-312.1272277832031,-310.13916015625,-308.1510925292969,-306.16302490234375,-304.1749572753906,-302.1868896484375,-300.1988220214844,-298.2107238769531,-296.22265625,-294.2345886230469,-292.24652099609375,-290.2584533691406,-288.2703857421875,-286.2823181152344,-284.2942199707031,-282.30615234375,-280.3180847167969,-278.33001708984375,-276.3419494628906,-274.3538818359375,-272.3658142089844,-270.37774658203125,-268.3896484375,-266.4015808105469,-264.41351318359375,-262.4254455566406,-260.4373779296875,-258.4493103027344,-256.46124267578125,-254.47315979003906,-252.48509216308594,-250.4970245361328,-248.50894165039062,-246.5208740234375,-244.53280639648438,-242.54473876953125,-240.55665588378906,-238.56858825683594,-236.5805206298828,-234.59243774414062,-232.6043701171875,-230.61630249023438,-228.62823486328125,-226.64015197753906,-224.65208435058594,-222.6640167236328,-220.6759490966797,-218.6878662109375,-216.69979858398438,-214.71173095703125,-212.72366333007812,-210.73558044433594,-208.7475128173828,-206.7594451904297,-204.77137756347656,-202.78329467773438,-200.79522705078125,-198.80715942382812,-196.819091796875,-194.8310089111328,-192.8429412841797,-190.85487365722656,-188.86680603027344,-186.87872314453125,-184.89065551757812,-182.902587890625,-180.91452026367188,-178.9264373779297,-176.93836975097656,-174.95030212402344,-172.96221923828125,-170.97415161132812,-168.986083984375,-166.99801635742188,-165.0099334716797,-163.02186584472656,-161.03379821777344,-159.0457305908203,-157.05764770507812,-155.069580078125,-153.08151245117188,-151.09344482421875,-149.10536193847656,-147.11729431152344,-145.1292266845703,-143.1411590576172,-141.153076171875,-139.16500854492188,-137.17694091796875,-135.18887329101562,-133.20079040527344,-131.2127227783203,-129.2246551513672,-127.23657989501953,-125.2485122680664,-123.26043701171875,-121.27236938476562,-119.28429412841797,-117.29621887207031,-115.30815124511719,-113.32007598876953,-111.3320083618164,-109.34393310546875,-107.35586547851562,-105.36779022216797,-103.37972259521484,-101.39164733886719,-99.40357971191406,-97.4155044555664,-95.42743682861328,-93.43936157226562,-91.4512939453125,-89.46321868896484,-87.47515106201172,-85.48707580566406,-83.49900817871094,-81.51093292236328,-79.52286529541016,-77.5347900390625,-75.54672241210938,-73.55864715576172,-71.5705795288086,-69.58250427246094,-67.59443664550781,-65.60636138916016,-63.618289947509766,-61.630218505859375,-59.642147064208984,-57.654075622558594,-55.6660041809082,-53.67793273925781,-51.68986129760742,-49.70178985595703,-47.71371841430664,-45.72564697265625,-43.73757553100586,-41.74950408935547,-39.76143264770508,-37.77336120605469,-35.7852897644043,-33.797218322753906,-31.809144973754883,-29.821073532104492,-27.8330020904541,-25.84493064880371,-23.85685920715332,-21.86878776550293,-19.88071632385254,-17.89264488220215,-15.904572486877441,-13.91650104522705,-11.92842960357666,-9.94035816192627,-7.952286243438721,-5.96421480178833,-3.9761431217193604,-1.9880715608596802,0.0,1.9880715608596802,3.9761431217193604,5.96421480178833,7.952286243438721,9.94035816192627,11.92842960357666,13.91650104522705,15.904572486877441,17.89264488220215,19.88071632385254,21.86878776550293,23.85685920715332,25.84493064880371,27.8330020904541,29.821073532104492,31.809144973754883,33.797218322753906,35.7852897644043,37.77336120605469,39.76143264770508,41.74950408935547,43.73757553100586,45.72564697265625,47.71371841430664,49.70178985595703,51.68986129760742,53.67793273925781,55.6660041809082,57.654075622558594,59.642147064208984,61.630218505859375,63.618289947509766,65.60636138916016,67.59443664550781,69.58250427246094,71.5705795288086,73.55864715576172,75.54672241210938,77.5347900390625,79.52286529541016,81.51093292236328,83.49900817871094,85.48707580566406,87.47515106201172,89.46321868896484,91.4512939453125,93.43936157226562,95.42743682861328,97.4155044555664,99.40357971191406,101.39164733886719,103.37972259521484,105.36779022216797,107.35586547851562,109.34393310546875,111.3320083618164,113.32007598876953,115.30815124511719,117.29621887207031,119.28429412841797,121.27236938476562,123.26043701171875,125.2485122680664,127.23657989501953,129.2246551513672,131.2127227783203,133.20079040527344,135.18887329101562,137.17694091796875,139.16500854492188,141.153076171875,143.1411590576172,145.1292266845703,147.11729431152344,149.10536193847656,151.09344482421875,153.08151245117188,155.069580078125,157.05764770507812,159.0457305908203,161.03379821777344,163.02186584472656,165.0099334716797,166.99801635742188,168.986083984375,170.97415161132812,172.96221923828125,174.95030212402344,176.93836975097656,178.9264373779297,180.91452026367188,182.902587890625,184.89065551757812,186.87872314453125,188.86680603027344,190.85487365722656,192.8429412841797,194.8310089111328,196.819091796875,198.80715942382812,200.79522705078125,202.78329467773438,204.77137756347656,206.7594451904297,208.7475128173828,210.73558044433594,212.72366333007812,214.71173095703125,216.69979858398438,218.6878662109375,220.6759490966797,222.6640167236328,224.65208435058594,226.64015197753906,228.62823486328125,230.61630249023438,232.6043701171875,234.59243774414062,236.5805206298828,238.56858825683594,240.55665588378906,242.54473876953125,244.53280639648438,246.5208740234375,248.50894165039062,250.4970245361328,252.48509216308594,254.47315979003906,256.46124267578125,258.4493103027344,260.4373779296875,262.4254455566406,264.41351318359375,266.4015808105469,268.3896484375,270.37774658203125,272.3658142089844,274.3538818359375,276.3419494628906,278.33001708984375,280.3180847167969,282.30615234375,284.2942199707031,286.2823181152344,288.2703857421875,290.2584533691406,292.24652099609375,294.2345886230469,296.22265625,298.2107238769531,300.1988220214844,302.1868896484375,304.1749572753906,306.16302490234375,308.1510925292969,310.13916015625,312.1272277832031,314.11529541015625,316.1033935546875,318.0914611816406,320.07952880859375,322.0675964355469,324.0556640625,326.0437316894531,328.03179931640625,330.0198669433594,332.0079650878906,333.99603271484375,335.9841003417969,337.97216796875,339.9602355957031,341.94830322265625,343.9363708496094,345.9244384765625,347.91253662109375,349.9006042480469,351.888671875,353.8767395019531,355.86480712890625,357.8528747558594,359.8409423828125,361.82904052734375,363.8171081542969,365.80517578125,367.7932434082031,369.78131103515625,371.7693786621094,373.7574462890625,375.7455139160156,377.7336120605469,379.7216796875,381.7097473144531,383.69781494140625,385.6858825683594,387.6739501953125,389.6620178222656,391.65008544921875,393.63818359375,395.6262512207031,397.61431884765625,399.6023864746094,401.5904541015625,403.5785217285156,405.56658935546875,407.5546569824219,409.5427551269531,411.53082275390625,413.5188903808594,415.5069580078125,417.4950256347656,419.48309326171875,421.4711608886719,423.4592590332031,425.44732666015625,427.4353942871094,429.4234619140625,431.4115295410156,433.39959716796875,435.3876647949219,437.375732421875,439.36383056640625,441.3518981933594,443.3399658203125,445.3280334472656,447.31610107421875,449.3041687011719,451.292236328125,453.2803039550781,455.2684020996094,457.2564697265625,459.2445373535156,461.23260498046875,463.2206726074219,465.208740234375,467.1968078613281,469.18487548828125,471.1729736328125,473.1610412597656,475.14910888671875,477.1371765136719,479.125244140625,481.1133117675781,483.10137939453125,485.0894775390625,487.0775451660156,489.06561279296875,491.0536804199219,493.041748046875,495.0298156738281,497.01788330078125,499.0059509277344,500.9940490722656,502.98211669921875,504.9701843261719,506.958251953125,508.9463195800781,510.93438720703125,512.9224853515625,514.9105224609375,516.8986206054688,518.8866577148438,520.874755859375,522.86279296875,524.8508911132812,526.8389892578125,528.8270263671875,530.8151245117188,532.8031616210938,534.791259765625,536.779296875,538.7673950195312,540.7554931640625,542.7435302734375,544.7316284179688,546.7196655273438,548.707763671875,550.69580078125,552.6838989257812,554.6719970703125,556.6600341796875,558.6481323242188,560.6361694335938,562.624267578125,564.6123046875,566.6004028320312,568.5884399414062,570.5765380859375,572.5646362304688,574.5526733398438,576.540771484375,578.52880859375,580.5169067382812,582.5049438476562,584.4930419921875,586.4811401367188,588.4691772460938,590.457275390625,592.4453125,594.4334106445312,596.4214477539062,598.4095458984375,600.3976440429688,602.3856811523438,604.373779296875,606.36181640625,608.3499145507812,610.3379516601562,612.3260498046875,614.3140869140625,616.3021850585938,618.290283203125,620.2783203125,622.2664184570312,624.2544555664062,626.2425537109375,628.2305908203125,630.2186889648438,632.206787109375,634.19482421875,636.1829223632812,638.1709594726562,640.1590576171875,642.1470947265625,644.1351928710938,646.1232299804688,648.111328125,650.0994262695312,652.0874633789062,654.0755615234375,656.0635986328125,658.0516967773438,660.0397338867188,662.02783203125,664.0159301757812,666.0039672851562,667.9920654296875,669.9801025390625,671.9682006835938,673.9562377929688,675.9443359375,677.9324340820312,679.9204711914062,681.9085693359375,683.8966064453125,685.8847045898438,687.8727416992188,689.86083984375,691.848876953125,693.8369750976562,695.8250732421875,697.8131103515625,699.8012084960938,701.7892456054688,703.77734375,705.765380859375,707.7534790039062,709.7415771484375,711.7296142578125,713.7177124023438,715.7057495117188,717.69384765625,719.681884765625,721.6699829101562,723.6580810546875,725.6461181640625,727.6342163085938,729.6222534179688,731.6103515625,733.598388671875,735.5864868164062,737.5745239257812,739.5626220703125,741.5507202148438,743.5387573242188,745.52685546875,747.514892578125,749.5029907226562,751.4910278320312,753.4791259765625,755.4672241210938,757.4552612304688,759.443359375,761.431396484375,763.4194946289062,765.4075317382812,767.3956298828125,769.3837280273438,771.3717651367188,773.35986328125,775.347900390625,777.3359985351562,779.3240356445312,781.3121337890625,783.3001708984375,785.2882690429688,787.2763671875,789.264404296875,791.2525024414062,793.2405395507812,795.2286376953125,797.2166748046875,799.2047729492188,801.19287109375,803.180908203125,805.1690063476562,807.1570434570312,809.1451416015625,811.1331787109375,813.1212768554688,815.1093139648438,817.097412109375,819.0855102539062,821.0735473632812,823.0616455078125,825.0496826171875,827.0377807617188,829.0258178710938,831.013916015625,833.0020141601562,834.9900512695312,836.9781494140625,838.9661865234375,840.9542846679688,842.9423217773438,844.930419921875,846.9185180664062,848.9065551757812,850.8946533203125,852.8826904296875,854.8707885742188,856.8588256835938,858.846923828125,860.8349609375,862.8230590820312,864.8111572265625,866.7991943359375,868.7872924804688,870.7753295898438,872.763427734375,874.75146484375,876.7395629882812,878.7276611328125,880.7156982421875,882.7037963867188,884.6918334960938,886.679931640625,888.66796875,890.6560668945312,892.6441650390625,894.6322021484375,896.6203002929688,898.6083374023438,900.596435546875,902.58447265625,904.5725708007812,906.5606079101562,908.5487060546875,910.5368041992188,912.5248413085938,914.512939453125,916.5009765625,918.4890747070312,920.4771118164062,922.4652099609375,924.4533081054688,926.4413452148438,928.429443359375,930.41748046875,932.4055786132812,934.3936157226562,936.3817138671875,938.3697509765625,940.3578491210938,942.345947265625,944.333984375,946.3220825195312,948.3101196289062,950.2982177734375,952.2862548828125,954.2743530273438,956.262451171875,958.25048828125,960.2385864257812,962.2266235351562,964.2147216796875,966.2027587890625,968.1908569335938,970.178955078125,972.1669921875,974.1550903320312,976.1431274414062,978.1312255859375,980.1192626953125,982.1073608398438,984.0953979492188,986.08349609375,988.0715942382812,990.0596313476562,992.0477294921875,994.0357666015625,996.0238647460938,998.0119018554688,1000.0],"x":["11000100011110100000000000000000","11000100011110011000000011000011","11000100011110010000000110000111","11000100011110001000001001001010","11000100011110000000001100001110","11000100011101111000001111010001","11000100011101110000010010010101","11000100011101101000010101011000","11000100011101100000011000011011","11000100011101011000011011011111","11000100011101010000011110100010","11000100011101001000100001100110","11000100011101000000100100101001","11000100011100111000100111101101","11000100011100110000101010110000","11000100011100101000101101110100","11000100011100100000110000110111","11000100011100011000110011111010","11000100011100010000110110111110","11000100011100001000111010000001","11000100011100000000111101000101","11000100011011111001000000001000","11000100011011110001000011001100","11000100011011101001000110001111","11000100011011100001001001010010","11000100011011011001001100010110","11000100011011010001001111011001","11000100011011001001010010011101","11000100011011000001010101100000","11000100011010111001011000100100","11000100011010110001011011100111","11000100011010101001011110101010","11000100011010100001100001101110","11000100011010011001100100110001","11000100011010010001100111110101","11000100011010001001101010111000","11000100011010000001101101111100","11000100011001111001110000111111","11000100011001110001110100000011","11000100011001101001110111000110","11000100011001100001111010001001","11000100011001011001111101001101","11000100011001010010000000010000","11000100011001001010000011010100","11000100011001000010000110010111","11000100011000111010001001011011","11000100011000110010001100011110","11000100011000101010001111100001","11000100011000100010010010100101","11000100011000011010010101101000","11000100011000010010011000101100","11000100011000001010011011101111","11000100011000000010011110110011","11000100010111111010100001110110","11000100010111110010100100111010","11000100010111101010100111111101","11000100010111100010101011000000","11000100010111011010101110000100","11000100010111010010110001000111","11000100010111001010110100001011","11000100010111000010110111001110","11000100010110111010111010010010","11000100010110110010111101010101","11000100010110101011000000011000","11000100010110100011000011011100","11000100010110011011000110011111","11000100010110010011001001100011","11000100010110001011001100100110","11000100010110000011001111101010","11000100010101111011010010101101","11000100010101110011010101110000","11000100010101101011011000110100","11000100010101100011011011110111","11000100010101011011011110111011","11000100010101010011100001111110","11000100010101001011100101000010","11000100010101000011101000000101","11000100010100111011101011001001","11000100010100110011101110001100","11000100010100101011110001001111","11000100010100100011110100010011","11000100010100011011110111010110","11000100010100010011111010011010","11000100010100001011111101011101","11000100010100000100000000100001","11000100010011111100000011100100","11000100010011110100000110100111","11000100010011101100001001101011","11000100010011100100001100101110","11000100010011011100001111110010","11000100010011010100010010110101","11000100010011001100010101111001","11000100010011000100011000111100","11000100010010111100011011111111","11000100010010110100011111000011","11000100010010101100100010000110","11000100010010100100100101001010","11000100010010011100101000001101","11000100010010010100101011010001","11000100010010001100101110010100","11000100010010000100110001011000","11000100010001111100110100011011","11000100010001110100110111011110","11000100010001101100111010100010","11000100010001100100111101100101","11000100010001011101000000101001","11000100010001010101000011101100","11000100010001001101000110110000","11000100010001000101001001110011","11000100010000111101001100110110","11000100010000110101001111111010","11000100010000101101010010111101","11000100010000100101010110000001","11000100010000011101011001000100","11000100010000010101011100001000","11000100010000001101011111001011","11000100010000000101100010001111","11000100001111111101100101010010","11000100001111110101101000010101","11000100001111101101101011011001","11000100001111100101101110011100","11000100001111011101110001100000","11000100001111010101110100100011","11000100001111001101110111100111","11000100001111000101111010101010","11000100001110111101111101101101","11000100001110110110000000110001","11000100001110101110000011110100","11000100001110100110000110111000","11000100001110011110001001111011","11000100001110010110001100111111","11000100001110001110010000000010","11000100001110000110010011000101","11000100001101111110010110001001","11000100001101110110011001001100","11000100001101101110011100010000","11000100001101100110011111010011","11000100001101011110100010010111","11000100001101010110100101011010","11000100001101001110101000011110","11000100001101000110101011100001","11000100001100111110101110100100","11000100001100110110110001101000","11000100001100101110110100101011","11000100001100100110110111101111","11000100001100011110111010110010","11000100001100010110111101110110","11000100001100001111000000111001","11000100001100000111000011111100","11000100001011111111000111000000","11000100001011110111001010000011","11000100001011101111001101000111","11000100001011100111010000001010","11000100001011011111010011001110","11000100001011010111010110010001","11000100001011001111011001010100","11000100001011000111011100011000","11000100001010111111011111011011","11000100001010110111100010011111","11000100001010101111100101100010","11000100001010100111101000100110","11000100001010011111101011101001","11000100001010010111101110101101","11000100001010001111110001110000","11000100001010000111110100110011","11000100001001111111110111110111","11000100001001110111111010111010","11000100001001101111111101111110","11000100001001101000000001000001","11000100001001100000000100000101","11000100001001011000000111001000","11000100001001010000001010001011","11000100001001001000001101001111","11000100001001000000010000010010","11000100001000111000010011010110","11000100001000110000010110011001","11000100001000101000011001011101","11000100001000100000011100100000","11000100001000011000011111100011","11000100001000010000100010100111","11000100001000001000100101101010","11000100001000000000101000101110","11000100000111111000101011110001","11000100000111110000101110110101","11000100000111101000110001111000","11000100000111100000110100111100","11000100000111011000110111111111","11000100000111010000111011000010","11000100000111001000111110000110","11000100000111000001000001001001","11000100000110111001000100001101","11000100000110110001000111010000","11000100000110101001001010010100","11000100000110100001001101010111","11000100000110011001010000011010","11000100000110010001010011011110","11000100000110001001010110100001","11000100000110000001011001100101","11000100000101111001011100101000","11000100000101110001011111101100","11000100000101101001100010101111","11000100000101100001100101110011","11000100000101011001101000110110","11000100000101010001101011111001","11000100000101001001101110111101","11000100000101000001110010000000","11000100000100111001110101000100","11000100000100110001111000000111","11000100000100101001111011001011","11000100000100100001111110001110","11000100000100011010000001010001","11000100000100010010000100010101","11000100000100001010000111011000","11000100000100000010001010011100","11000100000011111010001101011111","11000100000011110010010000100011","11000100000011101010010011100110","11000100000011100010010110101001","11000100000011011010011001101101","11000100000011010010011100110000","11000100000011001010011111110100","11000100000011000010100010110111","11000100000010111010100101111011","11000100000010110010101000111110","11000100000010101010101100000010","11000100000010100010101111000101","11000100000010011010110010001000","11000100000010010010110101001100","11000100000010001010111000001111","11000100000010000010111011010011","11000100000001111010111110010110","11000100000001110011000001011010","11000100000001101011000100011101","11000100000001100011000111100000","11000100000001011011001010100100","11000100000001010011001101100111","11000100000001001011010000101011","11000100000001000011010011101110","11000100000000111011010110110010","11000100000000110011011001110101","11000100000000101011011100111000","11000100000000100011011111111100","11000100000000011011100010111111","11000100000000010011100110000011","11000100000000001011101001000110","11000100000000000011101100001010","11000011111111110111011110011010","11000011111111100111100100100001","11000011111111010111101010101000","11000011111111000111110000101111","11000011111110110111110110110110","11000011111110100111111100111101","11000011111110011000000011000011","11000011111110001000001001001010","11000011111101111000001111010001","11000011111101101000010101011000","11000011111101011000011011011111","11000011111101001000100001100110","11000011111100111000100111101101","11000011111100101000101101110100","11000011111100011000110011111010","11000011111100001000111010000001","11000011111011111001000000001000","11000011111011101001000110001111","11000011111011011001001100010110","11000011111011001001010010011101","11000011111010111001011000100100","11000011111010101001011110101010","11000011111010011001100100110001","11000011111010001001101010111000","11000011111001111001110000111111","11000011111001101001110111000110","11000011111001011001111101001101","11000011111001001010000011010100","11000011111000111010001001011011","11000011111000101010001111100001","11000011111000011010010101101000","11000011111000001010011011101111","11000011110111111010100001110110","11000011110111101010100111111101","11000011110111011010101110000100","11000011110111001010110100001011","11000011110110111010111010010010","11000011110110101011000000011000","11000011110110011011000110011111","11000011110110001011001100100110","11000011110101111011010010101101","11000011110101101011011000110100","11000011110101011011011110111011","11000011110101001011100101000010","11000011110100111011101011001001","11000011110100101011110001001111","11000011110100011011110111010110","11000011110100001011111101011101","11000011110011111100000011100100","11000011110011101100001001101011","11000011110011011100001111110010","11000011110011001100010101111001","11000011110010111100011011111111","11000011110010101100100010000110","11000011110010011100101000001101","11000011110010001100101110010100","11000011110001111100110100011011","11000011110001101100111010100010","11000011110001011101000000101001","11000011110001001101000110110000","11000011110000111101001100110110","11000011110000101101010010111101","11000011110000011101011001000100","11000011110000001101011111001011","11000011101111111101100101010010","11000011101111101101101011011001","11000011101111011101110001100000","11000011101111001101110111100111","11000011101110111101111101101101","11000011101110101110000011110100","11000011101110011110001001111011","11000011101110001110010000000010","11000011101101111110010110001001","11000011101101101110011100010000","11000011101101011110100010010111","11000011101101001110101000011110","11000011101100111110101110100100","11000011101100101110110100101011","11000011101100011110111010110010","11000011101100001111000000111001","11000011101011111111000111000000","11000011101011101111001101000111","11000011101011011111010011001110","11000011101011001111011001010100","11000011101010111111011111011011","11000011101010101111100101100010","11000011101010011111101011101001","11000011101010001111110001110000","11000011101001111111110111110111","11000011101001101111111101111110","11000011101001100000000100000101","11000011101001010000001010001011","11000011101001000000010000010010","11000011101000110000010110011001","11000011101000100000011100100000","11000011101000010000100010100111","11000011101000000000101000101110","11000011100111110000101110110101","11000011100111100000110100111100","11000011100111010000111011000010","11000011100111000001000001001001","11000011100110110001000111010000","11000011100110100001001101010111","11000011100110010001010011011110","11000011100110000001011001100101","11000011100101110001011111101100","11000011100101100001100101110011","11000011100101010001101011111001","11000011100101000001110010000000","11000011100100110001111000000111","11000011100100100001111110001110","11000011100100010010000100010101","11000011100100000010001010011100","11000011100011110010010000100011","11000011100011100010010110101001","11000011100011010010011100110000","11000011100011000010100010110111","11000011100010110010101000111110","11000011100010100010101111000101","11000011100010010010110101001100","11000011100010000010111011010011","11000011100001110011000001011010","11000011100001100011000111100000","11000011100001010011001101100111","11000011100001000011010011101110","11000011100000110011011001110101","11000011100000100011011111111100","11000011100000010011100110000011","11000011100000000011101100001010","11000011011111100111100100100001","11000011011111000111110000101111","11000011011110100111111100111101","11000011011110001000001001001010","11000011011101101000010101011000","11000011011101001000100001100110","11000011011100101000101101110100","11000011011100001000111010000001","11000011011011101001000110001111","11000011011011001001010010011101","11000011011010101001011110101010","11000011011010001001101010111000","11000011011001101001110111000110","11000011011001001010000011010100","11000011011000101010001111100001","11000011011000001010011011101111","11000011010111101010100111111101","11000011010111001010110100001011","11000011010110101011000000011000","11000011010110001011001100100110","11000011010101101011011000110100","11000011010101001011100101000010","11000011010100101011110001001111","11000011010100001011111101011101","11000011010011101100001001101011","11000011010011001100010101111001","11000011010010101100100010000110","11000011010010001100101110010100","11000011010001101100111010100010","11000011010001001101000110110000","11000011010000101101010010111101","11000011010000001101011111001011","11000011001111101101101011011001","11000011001111001101110111100111","11000011001110101110000011110100","11000011001110001110010000000010","11000011001101101110011100010000","11000011001101001110101000011110","11000011001100101110110100101011","11000011001100001111000000111001","11000011001011101111001101000111","11000011001011001111011001010100","11000011001010101111100101100010","11000011001010001111110001110000","11000011001001101111111101111110","11000011001001010000001010001011","11000011001000110000010110011001","11000011001000010000100010100111","11000011000111110000101110110101","11000011000111010000111011000010","11000011000110110001000111010000","11000011000110010001010011011110","11000011000101110001011111101100","11000011000101010001101011111001","11000011000100110001111000000111","11000011000100010010000100010101","11000011000011110010010000100011","11000011000011010010011100110000","11000011000010110010101000111110","11000011000010010010110101001100","11000011000001110011000001011010","11000011000001010011001101100111","11000011000000110011011001110101","11000011000000010011100110000011","11000010111111100111100100100001","11000010111110100111111100111101","11000010111101101000010101011000","11000010111100101000101101110100","11000010111011101001000110001111","11000010111010101001011110101010","11000010111001101001110111000110","11000010111000101010001111100001","11000010110111101010100111111101","11000010110110101011000000011000","11000010110101101011011000110100","11000010110100101011110001001111","11000010110011101100001001101011","11000010110010101100100010000110","11000010110001101100111010100010","11000010110000101101010010111101","11000010101111101101101011011001","11000010101110101110000011110100","11000010101101101110011100010000","11000010101100101110110100101011","11000010101011101111001101000111","11000010101010101111100101100010","11000010101001101111111101111110","11000010101000110000010110011001","11000010100111110000101110110101","11000010100110110001000111010000","11000010100101110001011111101100","11000010100100110001111000000111","11000010100011110010010000100011","11000010100010110010101000111110","11000010100001110011000001011010","11000010100000110011011001110101","11000010011111100111100100100001","11000010011101101000010101011000","11000010011011101001000110001111","11000010011001101001110111000110","11000010010111101010100111111101","11000010010101101011011000110100","11000010010011101100001001101011","11000010010001101100111010100010","11000010001111101101101011011001","11000010001101101110011100010000","11000010001011101111001101000111","11000010001001101111111101111110","11000010000111110000101110110101","11000010000101110001011111101100","11000010000011110010010000100011","11000010000001110011000001011010","11000001111111100111100100100001","11000001111011101001000110001111","11000001110111101010100111111101","11000001110011101100001001101011","11000001101111101101101011011001","11000001101011101111001101000111","11000001100111110000101110110101","11000001100011110010010000100011","11000001011111100111100100100001","11000001010111101010100111111101","11000001001111101101101011011001","11000001000111110000101110110101","11000000111111100111100100100001","11000000101111101101101011011001","11000000011111100111100100100001","10111111111111100111100100100001","00000000000000000000000000000000","00111111111111100111100100100001","01000000011111100111100100100001","01000000101111101101101011011001","01000000111111100111100100100001","01000001000111110000101110110101","01000001001111101101101011011001","01000001010111101010100111111101","01000001011111100111100100100001","01000001100011110010010000100011","01000001100111110000101110110101","01000001101011101111001101000111","01000001101111101101101011011001","01000001110011101100001001101011","01000001110111101010100111111101","01000001111011101001000110001111","01000001111111100111100100100001","01000010000001110011000001011010","01000010000011110010010000100011","01000010000101110001011111101100","01000010000111110000101110110101","01000010001001101111111101111110","01000010001011101111001101000111","01000010001101101110011100010000","01000010001111101101101011011001","01000010010001101100111010100010","01000010010011101100001001101011","01000010010101101011011000110100","01000010010111101010100111111101","01000010011001101001110111000110","01000010011011101001000110001111","01000010011101101000010101011000","01000010011111100111100100100001","01000010100000110011011001110101","01000010100001110011000001011010","01000010100010110010101000111110","01000010100011110010010000100011","01000010100100110001111000000111","01000010100101110001011111101100","01000010100110110001000111010000","01000010100111110000101110110101","01000010101000110000010110011001","01000010101001101111111101111110","01000010101010101111100101100010","01000010101011101111001101000111","01000010101100101110110100101011","01000010101101101110011100010000","01000010101110101110000011110100","01000010101111101101101011011001","01000010110000101101010010111101","01000010110001101100111010100010","01000010110010101100100010000110","01000010110011101100001001101011","01000010110100101011110001001111","01000010110101101011011000110100","01000010110110101011000000011000","01000010110111101010100111111101","01000010111000101010001111100001","01000010111001101001110111000110","01000010111010101001011110101010","01000010111011101001000110001111","01000010111100101000101101110100","01000010111101101000010101011000","01000010111110100111111100111101","01000010111111100111100100100001","01000011000000010011100110000011","01000011000000110011011001110101","01000011000001010011001101100111","01000011000001110011000001011010","01000011000010010010110101001100","01000011000010110010101000111110","01000011000011010010011100110000","01000011000011110010010000100011","01000011000100010010000100010101","01000011000100110001111000000111","01000011000101010001101011111001","01000011000101110001011111101100","01000011000110010001010011011110","01000011000110110001000111010000","01000011000111010000111011000010","01000011000111110000101110110101","01000011001000010000100010100111","01000011001000110000010110011001","01000011001001010000001010001011","01000011001001101111111101111110","01000011001010001111110001110000","01000011001010101111100101100010","01000011001011001111011001010100","01000011001011101111001101000111","01000011001100001111000000111001","01000011001100101110110100101011","01000011001101001110101000011110","01000011001101101110011100010000","01000011001110001110010000000010","01000011001110101110000011110100","01000011001111001101110111100111","01000011001111101101101011011001","01000011010000001101011111001011","01000011010000101101010010111101","01000011010001001101000110110000","01000011010001101100111010100010","01000011010010001100101110010100","01000011010010101100100010000110","01000011010011001100010101111001","01000011010011101100001001101011","01000011010100001011111101011101","01000011010100101011110001001111","01000011010101001011100101000010","01000011010101101011011000110100","01000011010110001011001100100110","01000011010110101011000000011000","01000011010111001010110100001011","01000011010111101010100111111101","01000011011000001010011011101111","01000011011000101010001111100001","01000011011001001010000011010100","01000011011001101001110111000110","01000011011010001001101010111000","01000011011010101001011110101010","01000011011011001001010010011101","01000011011011101001000110001111","01000011011100001000111010000001","01000011011100101000101101110100","01000011011101001000100001100110","01000011011101101000010101011000","01000011011110001000001001001010","01000011011110100111111100111101","01000011011111000111110000101111","01000011011111100111100100100001","01000011100000000011101100001010","01000011100000010011100110000011","01000011100000100011011111111100","01000011100000110011011001110101","01000011100001000011010011101110","01000011100001010011001101100111","01000011100001100011000111100000","01000011100001110011000001011010","01000011100010000010111011010011","01000011100010010010110101001100","01000011100010100010101111000101","01000011100010110010101000111110","01000011100011000010100010110111","01000011100011010010011100110000","01000011100011100010010110101001","01000011100011110010010000100011","01000011100100000010001010011100","01000011100100010010000100010101","01000011100100100001111110001110","01000011100100110001111000000111","01000011100101000001110010000000","01000011100101010001101011111001","01000011100101100001100101110011","01000011100101110001011111101100","01000011100110000001011001100101","01000011100110010001010011011110","01000011100110100001001101010111","01000011100110110001000111010000","01000011100111000001000001001001","01000011100111010000111011000010","01000011100111100000110100111100","01000011100111110000101110110101","01000011101000000000101000101110","01000011101000010000100010100111","01000011101000100000011100100000","01000011101000110000010110011001","01000011101001000000010000010010","01000011101001010000001010001011","01000011101001100000000100000101","01000011101001101111111101111110","01000011101001111111110111110111","01000011101010001111110001110000","01000011101010011111101011101001","01000011101010101111100101100010","01000011101010111111011111011011","01000011101011001111011001010100","01000011101011011111010011001110","01000011101011101111001101000111","01000011101011111111000111000000","01000011101100001111000000111001","01000011101100011110111010110010","01000011101100101110110100101011","01000011101100111110101110100100","01000011101101001110101000011110","01000011101101011110100010010111","01000011101101101110011100010000","01000011101101111110010110001001","01000011101110001110010000000010","01000011101110011110001001111011","01000011101110101110000011110100","01000011101110111101111101101101","01000011101111001101110111100111","01000011101111011101110001100000","01000011101111101101101011011001","01000011101111111101100101010010","01000011110000001101011111001011","01000011110000011101011001000100","01000011110000101101010010111101","01000011110000111101001100110110","01000011110001001101000110110000","01000011110001011101000000101001","01000011110001101100111010100010","01000011110001111100110100011011","01000011110010001100101110010100","01000011110010011100101000001101","01000011110010101100100010000110","01000011110010111100011011111111","01000011110011001100010101111001","01000011110011011100001111110010","01000011110011101100001001101011","01000011110011111100000011100100","01000011110100001011111101011101","01000011110100011011110111010110","01000011110100101011110001001111","01000011110100111011101011001001","01000011110101001011100101000010","01000011110101011011011110111011","01000011110101101011011000110100","01000011110101111011010010101101","01000011110110001011001100100110","01000011110110011011000110011111","01000011110110101011000000011000","01000011110110111010111010010010","01000011110111001010110100001011","01000011110111011010101110000100","01000011110111101010100111111101","01000011110111111010100001110110","01000011111000001010011011101111","01000011111000011010010101101000","01000011111000101010001111100001","01000011111000111010001001011011","01000011111001001010000011010100","01000011111001011001111101001101","01000011111001101001110111000110","01000011111001111001110000111111","01000011111010001001101010111000","01000011111010011001100100110001","01000011111010101001011110101010","01000011111010111001011000100100","01000011111011001001010010011101","01000011111011011001001100010110","01000011111011101001000110001111","01000011111011111001000000001000","01000011111100001000111010000001","01000011111100011000110011111010","01000011111100101000101101110100","01000011111100111000100111101101","01000011111101001000100001100110","01000011111101011000011011011111","01000011111101101000010101011000","01000011111101111000001111010001","01000011111110001000001001001010","01000011111110011000000011000011","01000011111110100111111100111101","01000011111110110111110110110110","01000011111111000111110000101111","01000011111111010111101010101000","01000011111111100111100100100001","01000011111111110111011110011010","01000100000000000011101100001010","01000100000000001011101001000110","01000100000000010011100110000011","01000100000000011011100010111111","01000100000000100011011111111100","01000100000000101011011100111000","01000100000000110011011001110101","01000100000000111011010110110010","01000100000001000011010011101110","01000100000001001011010000101011","01000100000001010011001101100111","01000100000001011011001010100100","01000100000001100011000111100000","01000100000001101011000100011101","01000100000001110011000001011010","01000100000001111010111110010110","01000100000010000010111011010011","01000100000010001010111000001111","01000100000010010010110101001100","01000100000010011010110010001000","01000100000010100010101111000101","01000100000010101010101100000010","01000100000010110010101000111110","01000100000010111010100101111011","01000100000011000010100010110111","01000100000011001010011111110100","01000100000011010010011100110000","01000100000011011010011001101101","01000100000011100010010110101001","01000100000011101010010011100110","01000100000011110010010000100011","01000100000011111010001101011111","01000100000100000010001010011100","01000100000100001010000111011000","01000100000100010010000100010101","01000100000100011010000001010001","01000100000100100001111110001110","01000100000100101001111011001011","01000100000100110001111000000111","01000100000100111001110101000100","01000100000101000001110010000000","01000100000101001001101110111101","01000100000101010001101011111001","01000100000101011001101000110110","01000100000101100001100101110011","01000100000101101001100010101111","01000100000101110001011111101100","01000100000101111001011100101000","01000100000110000001011001100101","01000100000110001001010110100001","01000100000110010001010011011110","01000100000110011001010000011010","01000100000110100001001101010111","01000100000110101001001010010100","01000100000110110001000111010000","01000100000110111001000100001101","01000100000111000001000001001001","01000100000111001000111110000110","01000100000111010000111011000010","01000100000111011000110111111111","01000100000111100000110100111100","01000100000111101000110001111000","01000100000111110000101110110101","01000100000111111000101011110001","01000100001000000000101000101110","01000100001000001000100101101010","01000100001000010000100010100111","01000100001000011000011111100011","01000100001000100000011100100000","01000100001000101000011001011101","01000100001000110000010110011001","01000100001000111000010011010110","01000100001001000000010000010010","01000100001001001000001101001111","01000100001001010000001010001011","01000100001001011000000111001000","01000100001001100000000100000101","01000100001001101000000001000001","01000100001001101111111101111110","01000100001001110111111010111010","01000100001001111111110111110111","01000100001010000111110100110011","01000100001010001111110001110000","01000100001010010111101110101101","01000100001010011111101011101001","01000100001010100111101000100110","01000100001010101111100101100010","01000100001010110111100010011111","01000100001010111111011111011011","01000100001011000111011100011000","01000100001011001111011001010100","01000100001011010111010110010001","01000100001011011111010011001110","01000100001011100111010000001010","01000100001011101111001101000111","01000100001011110111001010000011","01000100001011111111000111000000","01000100001100000111000011111100","01000100001100001111000000111001","01000100001100010110111101110110","01000100001100011110111010110010","01000100001100100110110111101111","01000100001100101110110100101011","01000100001100110110110001101000","01000100001100111110101110100100","01000100001101000110101011100001","01000100001101001110101000011110","01000100001101010110100101011010","01000100001101011110100010010111","01000100001101100110011111010011","01000100001101101110011100010000","01000100001101110110011001001100","01000100001101111110010110001001","01000100001110000110010011000101","01000100001110001110010000000010","01000100001110010110001100111111","01000100001110011110001001111011","01000100001110100110000110111000","01000100001110101110000011110100","01000100001110110110000000110001","01000100001110111101111101101101","01000100001111000101111010101010","01000100001111001101110111100111","01000100001111010101110100100011","01000100001111011101110001100000","01000100001111100101101110011100","01000100001111101101101011011001","01000100001111110101101000010101","01000100001111111101100101010010","01000100010000000101100010001111","01000100010000001101011111001011","01000100010000010101011100001000","01000100010000011101011001000100","01000100010000100101010110000001","01000100010000101101010010111101","01000100010000110101001111111010","01000100010000111101001100110110","01000100010001000101001001110011","01000100010001001101000110110000","01000100010001010101000011101100","01000100010001011101000000101001","01000100010001100100111101100101","01000100010001101100111010100010","01000100010001110100110111011110","01000100010001111100110100011011","01000100010010000100110001011000","01000100010010001100101110010100","01000100010010010100101011010001","01000100010010011100101000001101","01000100010010100100100101001010","01000100010010101100100010000110","01000100010010110100011111000011","01000100010010111100011011111111","01000100010011000100011000111100","01000100010011001100010101111001","01000100010011010100010010110101","01000100010011011100001111110010","01000100010011100100001100101110","01000100010011101100001001101011","01000100010011110100000110100111","01000100010011111100000011100100","01000100010100000100000000100001","01000100010100001011111101011101","01000100010100010011111010011010","01000100010100011011110111010110","01000100010100100011110100010011","01000100010100101011110001001111","01000100010100110011101110001100","01000100010100111011101011001001","01000100010101000011101000000101","01000100010101001011100101000010","01000100010101010011100001111110","01000100010101011011011110111011","01000100010101100011011011110111","01000100010101101011011000110100","01000100010101110011010101110000","01000100010101111011010010101101","01000100010110000011001111101010","01000100010110001011001100100110","01000100010110010011001001100011","01000100010110011011000110011111","01000100010110100011000011011100","01000100010110101011000000011000","01000100010110110010111101010101","01000100010110111010111010010010","01000100010111000010110111001110","01000100010111001010110100001011","01000100010111010010110001000111","01000100010111011010101110000100","01000100010111100010101011000000","01000100010111101010100111111101","01000100010111110010100100111010","01000100010111111010100001110110","01000100011000000010011110110011","01000100011000001010011011101111","01000100011000010010011000101100","01000100011000011010010101101000","01000100011000100010010010100101","01000100011000101010001111100001","01000100011000110010001100011110","01000100011000111010001001011011","01000100011001000010000110010111","01000100011001001010000011010100","01000100011001010010000000010000","01000100011001011001111101001101","01000100011001100001111010001001","01000100011001101001110111000110","01000100011001110001110100000011","01000100011001111001110000111111","01000100011010000001101101111100","01000100011010001001101010111000","01000100011010010001100111110101","01000100011010011001100100110001","01000100011010100001100001101110","01000100011010101001011110101010","01000100011010110001011011100111","01000100011010111001011000100100","01000100011011000001010101100000","01000100011011001001010010011101","01000100011011010001001111011001","01000100011011011001001100010110","01000100011011100001001001010010","01000100011011101001000110001111","01000100011011110001000011001100","01000100011011111001000000001000","01000100011100000000111101000101","01000100011100001000111010000001","01000100011100010000110110111110","01000100011100011000110011111010","01000100011100100000110000110111","01000100011100101000101101110100","01000100011100110000101010110000","01000100011100111000100111101101","01000100011101000000100100101001","01000100011101001000100001100110","01000100011101010000011110100010","01000100011101011000011011011111","01000100011101100000011000011011","01000100011101101000010101011000","01000100011101110000010010010101","01000100011101111000001111010001","01000100011110000000001100001110","01000100011110001000001001001010","01000100011110010000000110000111","01000100011110011000000011000011","01000100011110100000000000000000"]}
},{}],139:[function(require,module,exports){
module.exports={"expected":[1.0000000359391298e-36,9.990159432639915e-37,9.980318505888532e-37,9.970477579137149e-37,9.960635755554748e-37,9.950794828803365e-37,9.940953902051982e-37,9.931112975300599e-37,9.921272048549216e-37,9.911431121797832e-37,9.90159019504645e-37,9.891749268295066e-37,9.881908341543683e-37,9.8720674147923e-37,9.862226488040917e-37,9.852385561289533e-37,9.84254463453815e-37,9.832703707786767e-37,9.822862781035384e-37,9.813021854284e-37,9.803180927532617e-37,9.793340000781234e-37,9.783499074029851e-37,9.773658147278468e-37,9.763817220527085e-37,9.753976293775702e-37,9.744135367024318e-37,9.734294440272935e-37,9.724453513521552e-37,9.714612586770169e-37,9.704771660018786e-37,9.694930733267403e-37,9.68508980651602e-37,9.675248879764636e-37,9.665407953013253e-37,9.65556702626187e-37,9.64572520267947e-37,9.635884275928086e-37,9.626043349176703e-37,9.61620242242532e-37,9.606361495673937e-37,9.596520568922554e-37,9.58667964217117e-37,9.576838715419787e-37,9.566997788668404e-37,9.55715686191702e-37,9.547315935165638e-37,9.537475008414254e-37,9.527634081662871e-37,9.517793154911488e-37,9.507952228160105e-37,9.498111301408722e-37,9.488270374657339e-37,9.478429447905955e-37,9.468588521154572e-37,9.458747594403189e-37,9.448906667651806e-37,9.439065740900423e-37,9.42922481414904e-37,9.419383887397656e-37,9.409542960646273e-37,9.39970203389489e-37,9.389861107143507e-37,9.380020180392124e-37,9.37017925364074e-37,9.360338326889357e-37,9.350497400137974e-37,9.340656473386591e-37,9.330815546635208e-37,9.320973723052807e-37,9.311132796301424e-37,9.301291869550041e-37,9.291450942798658e-37,9.281610016047275e-37,9.271769089295891e-37,9.261928162544508e-37,9.252087235793125e-37,9.242246309041742e-37,9.232405382290359e-37,9.222564455538976e-37,9.212723528787592e-37,9.20288260203621e-37,9.193041675284826e-37,9.183200748533443e-37,9.17335982178206e-37,9.163518895030676e-37,9.153677968279293e-37,9.14383704152791e-37,9.133996114776527e-37,9.124155188025144e-37,9.11431426127376e-37,9.104473334522377e-37,9.094632407770994e-37,9.084791481019611e-37,9.074950554268228e-37,9.065109627516845e-37,9.055268700765462e-37,9.045427774014078e-37,9.035586847262695e-37,9.025745920511312e-37,9.015904993759929e-37,9.006063170177528e-37,8.996222243426145e-37,8.986381316674762e-37,8.976540389923379e-37,8.966699463171996e-37,8.956858536420613e-37,8.94701760966923e-37,8.937176682917846e-37,8.927335756166463e-37,8.91749482941508e-37,8.907653902663697e-37,8.897812975912313e-37,8.88797204916093e-37,8.878131122409547e-37,8.868290195658164e-37,8.85844926890678e-37,8.848608342155398e-37,8.838767415404014e-37,8.828926488652631e-37,8.819085561901248e-37,8.809244635149865e-37,8.799403708398482e-37,8.789562781647099e-37,8.779721854895715e-37,8.769880928144332e-37,8.760040001392949e-37,8.750199074641566e-37,8.740358147890183e-37,8.7305172211388e-37,8.720676294387416e-37,8.710835367636033e-37,8.70099444088465e-37,8.691153514133267e-37,8.681311690550866e-37,8.671470763799483e-37,8.6616298370481e-37,8.651788910296717e-37,8.641947983545334e-37,8.63210705679395e-37,8.622266130042567e-37,8.612425203291184e-37,8.602584276539801e-37,8.592743349788418e-37,8.582902423037035e-37,8.573061496285651e-37,8.563220569534268e-37,8.553379642782885e-37,8.543538716031502e-37,8.533697789280119e-37,8.523856862528735e-37,8.514015935777352e-37,8.504175009025969e-37,8.494334082274586e-37,8.484493155523203e-37,8.47465222877182e-37,8.464811302020436e-37,8.454970375269053e-37,8.44512944851767e-37,8.435288521766287e-37,8.425447595014904e-37,8.41560666826352e-37,8.405765741512137e-37,8.395924814760754e-37,8.386083888009371e-37,8.376242961257988e-37,8.366402034506605e-37,8.356560210924204e-37,8.346719284172821e-37,8.336878357421438e-37,8.327037430670055e-37,8.317196503918672e-37,8.307355577167288e-37,8.297514650415905e-37,8.287673723664522e-37,8.277832796913139e-37,8.267991870161756e-37,8.258150943410372e-37,8.24831001665899e-37,8.238469089907606e-37,8.228628163156223e-37,8.21878723640484e-37,8.208946309653457e-37,8.199105382902073e-37,8.18926445615069e-37,8.179423529399307e-37,8.169582602647924e-37,8.15974167589654e-37,8.149900749145158e-37,8.140059822393774e-37,8.130218895642391e-37,8.120377968891008e-37,8.110537042139625e-37,8.100696115388242e-37,8.090855188636858e-37,8.081014261885475e-37,8.071173335134092e-37,8.061332408382709e-37,8.051491481631326e-37,8.041649658048925e-37,8.031808731297542e-37,8.021967804546159e-37,8.012126877794776e-37,8.002285951043393e-37,7.99244502429201e-37,7.982604097540626e-37,7.972763170789243e-37,7.96292224403786e-37,7.953081317286477e-37,7.943240390535094e-37,7.93339946378371e-37,7.923558537032327e-37,7.913717610280944e-37,7.903876683529561e-37,7.894035756778178e-37,7.884194830026795e-37,7.874353903275411e-37,7.864512976524028e-37,7.854672049772645e-37,7.844831123021262e-37,7.834990196269879e-37,7.825149269518495e-37,7.815308342767112e-37,7.805467416015729e-37,7.795626489264346e-37,7.785785562512963e-37,7.77594463576158e-37,7.766103709010196e-37,7.756262782258813e-37,7.74642185550743e-37,7.736580928756047e-37,7.726740002004664e-37,7.716898178422263e-37,7.70705725167088e-37,7.697216324919497e-37,7.687375398168114e-37,7.67753447141673e-37,7.667693544665347e-37,7.657852617913964e-37,7.648011691162581e-37,7.638170764411198e-37,7.628329837659815e-37,7.618488910908431e-37,7.608647984157048e-37,7.598807057405665e-37,7.588966130654282e-37,7.579125203902899e-37,7.569284277151516e-37,7.559443350400132e-37,7.54960242364875e-37,7.539761496897366e-37,7.529920570145983e-37,7.5200796433946e-37,7.5102387166432165e-37,7.500397789891833e-37,7.49055686314045e-37,7.480715487973558e-37,7.470874561222175e-37,7.461033634470792e-37,7.451192707719409e-37,7.441351780968026e-37,7.4315108542166425e-37,7.421669927465259e-37,7.411829000713876e-37,7.401988073962493e-37,7.39214714721111e-37,7.382306220459727e-37,7.3724652937083434e-37,7.36262436695696e-37,7.352783440205577e-37,7.342942513454194e-37,7.333101586702811e-37,7.3232606599514275e-37,7.313419284784536e-37,7.303578358033153e-37,7.293737431281769e-37,7.283896504530386e-37,7.274055577779003e-37,7.26421465102762e-37,7.254373724276237e-37,7.2445327975248535e-37,7.23469187077347e-37,7.224850944022087e-37,7.215010017270704e-37,7.205169090519321e-37,7.195328163767938e-37,7.1854872370165544e-37,7.175646310265171e-37,7.165805383513788e-37,7.155964008346896e-37,7.146123081595513e-37,7.13628215484413e-37,7.126441228092747e-37,7.116600301341364e-37,7.10675937458998e-37,7.096918447838597e-37,7.087077521087214e-37,7.077236594335831e-37,7.067395667584448e-37,7.0575547408330645e-37,7.047713814081681e-37,7.037872887330298e-37,7.028031960578915e-37,7.018191033827532e-37,7.008350107076149e-37,6.998508731909257e-37,6.988667805157874e-37,6.9788268784064905e-37,6.968985951655107e-37,6.959145024903724e-37,6.949304098152341e-37,6.939463171400958e-37,6.929622244649575e-37,6.9197813178981914e-37,6.909940391146808e-37,6.900099464395425e-37,6.890258537644042e-37,6.880417610892659e-37,6.8705766841412755e-37,6.860735757389892e-37,6.850894830638509e-37,6.841053455471617e-37,6.831212528720234e-37,6.821371601968851e-37,6.811530675217468e-37,6.801689748466085e-37,6.7918488217147015e-37,6.782007894963318e-37,6.772166968211935e-37,6.762326041460552e-37,6.752485114709169e-37,6.742644187957786e-37,6.7328032612064024e-37,6.722962334455019e-37,6.713121407703636e-37,6.703280480952253e-37,6.69343955420087e-37,6.6835986274494865e-37,6.673757252282595e-37,6.663916325531212e-37,6.654075398779828e-37,6.644234472028445e-37,6.634393545277062e-37,6.624552618525679e-37,6.614711691774296e-37,6.6048707650229125e-37,6.595029838271529e-37,6.585188911520146e-37,6.575347984768763e-37,6.56550705801738e-37,6.555666131265997e-37,6.5458252045146134e-37,6.53598427776323e-37,6.526143351011847e-37,6.516301975844955e-37,6.506461049093572e-37,6.496620122342189e-37,6.486779195590806e-37,6.476938268839423e-37,6.4670973420880394e-37,6.457256415336656e-37,6.447415488585273e-37,6.43757456183389e-37,6.427733635082507e-37,6.4178927083311235e-37,6.40805178157974e-37,6.398210854828357e-37,6.388369928076974e-37,6.378529001325591e-37,6.368688074574208e-37,6.358846699407316e-37,6.349005772655933e-37,6.3391648459045495e-37,6.329323919153166e-37,6.319482992401783e-37,6.3096420656504e-37,6.299801138899017e-37,6.289960212147634e-37,6.2801192853962504e-37,6.270278358644867e-37,6.260437431893484e-37,6.250596505142101e-37,6.240755578390718e-37,6.2309146516393345e-37,6.221073724887951e-37,6.211232798136568e-37,6.201391871385185e-37,6.191550496218293e-37,6.18170956946691e-37,6.171868642715527e-37,6.162027715964144e-37,6.1521867892127605e-37,6.142345862461377e-37,6.132504935709994e-37,6.122664008958611e-37,6.112823082207228e-37,6.102982155455845e-37,6.0931412287044614e-37,6.083300301953078e-37,6.073459375201695e-37,6.063618448450312e-37,6.053777521698929e-37,6.0439365949475455e-37,6.034095219780654e-37,6.024254293029271e-37,6.0144133662778874e-37,6.004572439526504e-37,5.994731512775121e-37,5.984890586023738e-37,5.975049659272355e-37,5.9652087325209715e-37,5.955367805769588e-37,5.945526879018205e-37,5.935685952266822e-37,5.925845025515439e-37,5.916004098764056e-37,5.9061631720126725e-37,5.896322245261289e-37,5.886481318509906e-37,5.876639943343014e-37,5.866799016591631e-37,5.856958089840248e-37,5.847117163088865e-37,5.837276236337482e-37,5.8274353095860984e-37,5.817594382834715e-37,5.807753456083332e-37,5.797912529331949e-37,5.788071602580566e-37,5.7782306758291825e-37,5.768389749077799e-37,5.758548822326416e-37,5.748707895575033e-37,5.73886696882365e-37,5.729026042072267e-37,5.719184666905375e-37,5.709343740153992e-37,5.6995028134026085e-37,5.689661886651225e-37,5.679820959899842e-37,5.669980033148459e-37,5.660139106397076e-37,5.650298179645693e-37,5.6404572528943094e-37,5.630616326142926e-37,5.620775399391543e-37,5.61093447264016e-37,5.601093545888777e-37,5.5912526191373935e-37,5.58141169238601e-37,5.571570765634627e-37,5.561729838883244e-37,5.551888463716352e-37,5.542047536964969e-37,5.532206610213586e-37,5.522365683462203e-37,5.5125247567108195e-37,5.502683829959436e-37,5.492842903208053e-37,5.48300197645667e-37,5.473161049705287e-37,5.463320122953904e-37,5.4534791962025204e-37,5.443638269451137e-37,5.433797342699754e-37,5.423956415948371e-37,5.414115489196988e-37,5.4042745624456046e-37,5.394433187278713e-37,5.38459226052733e-37,5.3747513337759464e-37,5.364910407024563e-37,5.35506948027318e-37,5.345228553521797e-37,5.335387626770414e-37,5.3255467000190305e-37,5.315705773267647e-37,5.305864846516264e-37,5.296023919764881e-37,5.286182993013498e-37,5.276342066262115e-37,5.2665011395107315e-37,5.256660212759348e-37,5.246819286007965e-37,5.236977910841073e-37,5.22713698408969e-37,5.217296057338307e-37,5.207455130586924e-37,5.197614203835541e-37,5.1877732770841574e-37,5.177932350332774e-37,5.168091423581391e-37,5.158250496830008e-37,5.148409570078625e-37,5.1385686433272415e-37,5.128727716575858e-37,5.118886789824475e-37,5.109045863073092e-37,5.099204936321709e-37,5.089364009570326e-37,5.0795230828189425e-37,5.069681707652051e-37,5.0598407809006675e-37,5.049999854149284e-37,5.040158927397901e-37,5.030318000646518e-37,5.020477073895135e-37,5.010636147143752e-37,5.0007952203923684e-37,4.990954293640985e-37,4.981113366889602e-37,4.971272440138219e-37,4.961431513386836e-37,4.9515905866354526e-37,4.941749659884069e-37,4.931908733132686e-37,4.922067806381303e-37,4.912226431214411e-37,4.902385504463028e-37,4.892544577711645e-37,4.882703650960262e-37,4.8728627242088785e-37,4.863021797457495e-37,4.853180870706112e-37,4.843339943954729e-37,4.833499017203346e-37,4.823658090451963e-37,4.8138171637005795e-37,4.803976236949196e-37,4.794135310197813e-37,4.78429438344643e-37,4.774453456695047e-37,4.7646125299436636e-37,4.754771154776772e-37,4.744930228025389e-37,4.7350893012740054e-37,4.725248374522622e-37,4.715407447771239e-37,4.705566521019856e-37,4.695725594268473e-37,4.6858846675170895e-37,4.676043740765706e-37,4.666202814014323e-37,4.65636188726294e-37,4.646520960511557e-37,4.636680033760174e-37,4.6268391070087905e-37,4.616998180257407e-37,4.607157253506024e-37,4.597316326754641e-37,4.587474951587749e-37,4.577634024836366e-37,4.567793098084983e-37,4.5579521713336e-37,4.5481112445822164e-37,4.538270317830833e-37,4.52842939107945e-37,4.518588464328067e-37,4.508747537576684e-37,4.4989066108253005e-37,4.489065684073917e-37,4.479224757322534e-37,4.469383830571151e-37,4.459542903819768e-37,4.449701977068385e-37,4.4398610503170015e-37,4.43001967515011e-37,4.4201787483987265e-37,4.410337821647343e-37,4.40049689489596e-37,4.390655968144577e-37,4.380815041393194e-37,4.370974114641811e-37,4.3611331878904275e-37,4.351292261139044e-37,4.341451334387661e-37,4.331610407636278e-37,4.321769480884895e-37,4.3119285541335116e-37,4.302087627382128e-37,4.292246700630745e-37,4.282405773879362e-37,4.27256439871247e-37,4.262723471961087e-37,4.252882545209704e-37,4.243041618458321e-37,4.2332006917069375e-37,4.223359764955554e-37,4.213518838204171e-37,4.203677911452788e-37,4.193836984701405e-37,4.183996057950022e-37,4.1741551311986385e-37,4.164314204447255e-37,4.154473277695872e-37,4.144632350944489e-37,4.134791424193106e-37,4.1249504974417226e-37,4.115109122274831e-37,4.105268195523448e-37,4.0954272687720644e-37,4.085586342020681e-37,4.075745415269298e-37,4.065904488517915e-37,4.056063561766532e-37,4.0462226350151485e-37,4.036381708263765e-37,4.026540781512382e-37,4.016699854760999e-37,4.006858928009616e-37,3.997018001258233e-37,3.9871770745068495e-37,3.977336147755466e-37,3.967495221004083e-37,3.9576542942527e-37,3.947812919085808e-37,3.937971992334425e-37,3.928131065583042e-37,3.918290138831659e-37,3.9084492120802755e-37,3.898608285328892e-37,3.888767358577509e-37,3.878926431826126e-37,3.869085505074743e-37,3.8592445783233596e-37,3.849403651571976e-37,3.839562724820593e-37,3.82972179806921e-37,3.819880871317827e-37,3.810039944566444e-37,3.8001990178150605e-37,3.790357642648169e-37,3.7805167158967855e-37,3.770675789145402e-37,3.7608350866017735e-37,3.750993935642636e-37,3.741153008891253e-37,3.7313120821398696e-37,3.7214711553884865e-37,3.7116302286371033e-37,3.70178930188572e-37,3.691948375134337e-37,3.6821074483829537e-37,3.6722662974238163e-37,3.662425370672433e-37,3.65258444392105e-37,3.6427435171696667e-37,3.6329025904182836e-37,3.6230616636669004e-37,3.613220736915517e-37,3.603379810164134e-37,3.5935386592049965e-37,3.5836977324536134e-37,3.57385680570223e-37,3.564015878950847e-37,3.554174952199464e-37,3.5443340254480806e-37,3.5344930986966975e-37,3.5246521719453143e-37,3.514811245193931e-37,3.5049700942347936e-37,3.4951291674834105e-37,3.4852882407320273e-37,3.475447313980644e-37,3.465606387229261e-37,3.4557654604778777e-37,3.4459245337264946e-37,3.4360836069751114e-37,3.426242456015974e-37,3.4164015292645907e-37,3.4065606025132076e-37,3.3967196757618244e-37,3.386878749010441e-37,3.377037822259058e-37,3.367196895507675e-37,3.3573559687562917e-37,3.347514817797154e-37,3.337673891045771e-37,3.327832964294388e-37,3.3179920375430046e-37,3.3081511107916215e-37,3.2983101840402383e-37,3.288469257288855e-37,3.278628330537472e-37,3.2687871795783345e-37,3.2589462528269513e-37,3.249105326075568e-37,3.239264399324185e-37,3.2294234725728017e-37,3.2195825458214186e-37,3.2097416190700354e-37,3.199900692318652e-37,3.1900595413595147e-37,3.1802186146081316e-37,3.1703776878567484e-37,3.160536761105365e-37,3.150695834353982e-37,3.140854907602599e-37,3.1310139808512157e-37,3.1211730540998325e-37,3.111331903140695e-37,3.101490976389312e-37,3.0916500496379286e-37,3.0818091228865455e-37,3.0719681961351623e-37,3.062127269383779e-37,3.052286342632396e-37,3.0424454158810128e-37,3.0326042649218753e-37,3.022763338170492e-37,3.012922411419109e-37,3.0030814846677257e-37,2.9932405579163426e-37,2.9833996311649594e-37,2.973558704413576e-37,2.963717777662193e-37,2.95387685091081e-37,2.9440356999516724e-37,2.934194773200289e-37,2.924353846448906e-37,2.914512919697523e-37,2.9046719929461397e-37,2.8948310661947565e-37,2.8849901394433733e-37,2.87514921269199e-37,2.8653080617328526e-37,2.8554671349814695e-37,2.8456262082300863e-37,2.835785281478703e-37,2.82594435472732e-37,2.8161034279759368e-37,2.8062625012245536e-37,2.7964215744731704e-37,2.786580423514033e-37,2.7767394967626497e-37,2.7668985700112666e-37,2.7570576432598834e-37,2.7472167165085e-37,2.737375789757117e-37,2.727534863005734e-37,2.7176939362543507e-37,2.707852785295213e-37,2.69801185854383e-37,2.688170931792447e-37,2.6783300050410637e-37,2.6684890782896805e-37,2.6586481515382973e-37,2.648807224786914e-37,2.638966298035531e-37,2.6291251470763935e-37,2.6192842203250103e-37,2.609443293573627e-37,2.599602366822244e-37,2.5897614400708607e-37,2.5799205133194776e-37,2.5700795865680944e-37,2.5602386598167112e-37,2.5503975088575737e-37,2.5405565821061906e-37,2.5307156553548074e-37,2.520874728603424e-37,2.511033801852041e-37,2.501192875100658e-37,2.4913519483492747e-37,2.4815110215978915e-37,2.471669870638754e-37,2.461828943887371e-37,2.4519880171359877e-37,2.4421470903846045e-37,2.4323061636332213e-37,2.422465236881838e-37,2.412624310130455e-37,2.4027833833790718e-37,2.3929424566276886e-37,2.383101305668551e-37,2.373260378917168e-37,2.3634194521657847e-37,2.3535785254144016e-37,2.3437375986630184e-37,2.3338966719116352e-37,2.324055745160252e-37,2.314214818408869e-37,2.3043736674497314e-37,2.294532740698348e-37,2.284691813946965e-37,2.274850887195582e-37,2.2650099604441987e-37,2.2551690336928155e-37,2.2453281069414323e-37,2.235487180190049e-37,2.2256460292309117e-37,2.2158051024795285e-37,2.2059641757281453e-37,2.196123248976762e-37,2.186282322225379e-37,2.1764413954739958e-37,2.1666004687226126e-37,2.1567595419712294e-37,2.146918391012092e-37,2.1370774642607087e-37,2.1272365375093256e-37,2.1173956107579424e-37,2.1075546840065592e-37,2.097713757255176e-37,2.087872830503793e-37,2.0780319037524097e-37,2.068190752793272e-37,2.058349826041889e-37,2.048508899290506e-37,2.0386679725391227e-37,2.0288270457877395e-37,2.0189861190363563e-37,2.009145192284973e-37,1.99930426553359e-37,1.9894631145744525e-37,1.9796221878230693e-37,1.969781261071686e-37,1.959940334320303e-37,1.9500994075689198e-37,1.9402584808175366e-37,1.9304175540661534e-37,1.9205766273147702e-37,1.9107354763556327e-37,1.9008945496042496e-37,1.8910536228528664e-37,1.8812126961014832e-37,1.8713717693501e-37,1.8615308425987169e-37,1.8516899158473337e-37,1.8418488769920733e-37,1.8320079502406902e-37,1.822167023489307e-37,1.8123260967379238e-37,1.8024850578826635e-37,1.7926441311312803e-37,1.7828032043798971e-37,1.772962277628514e-37,1.7631212387732536e-37,1.7532803120218704e-37,1.7434393852704873e-37,1.733598458519104e-37,1.7237574196638438e-37,1.7139164929124606e-37,1.7040755661610774e-37,1.6942346394096942e-37,1.6843936005544339e-37,1.6745526738030507e-37,1.6647117470516675e-37,1.6548708203002844e-37,1.645029781445024e-37,1.6351888546936409e-37,1.6253479279422577e-37,1.6155070011908745e-37,1.6056659623356142e-37,1.595825035584231e-37,1.5859841088328478e-37,1.5761431820814646e-37,1.5663021432262043e-37,1.5564612164748211e-37,1.546620289723438e-37,1.5367793629720548e-37,1.5269383241167944e-37,1.5170973973654113e-37,1.507256470614028e-37,1.497415543862645e-37,1.4875745050073846e-37,1.4777335782560014e-37,1.4678926515046182e-37,1.458051724753235e-37,1.4482106858979747e-37,1.4383697591465915e-37,1.4285288323952084e-37,1.4186879056438252e-37,1.4088468667885648e-37,1.3990059400371817e-37,1.3891650132857985e-37,1.3793240865344153e-37,1.369483047679155e-37,1.3596421209277718e-37,1.3498011941763886e-37,1.3399602674250054e-37,1.3301192285697451e-37,1.320278301818362e-37,1.3104373750669788e-37,1.3005964483155956e-37,1.2907555215642124e-37,1.280914482708952e-37,1.271073555957569e-37,1.2612326292061857e-37,1.2513917024548025e-37,1.2415506635995422e-37,1.231709736848159e-37,1.2218688100967759e-37,1.2120278833453927e-37,1.2021868444901324e-37,1.1923459177387492e-37,1.182504990987366e-37,1.1726640642359828e-37,1.1628230253807225e-37,1.1529820986293393e-37,1.1431411718779561e-37,1.133300245126573e-37,1.1234592062713126e-37,1.1136182795199294e-37,1.1037773527685463e-37,1.093936426017163e-37,1.0840953871619028e-37,1.0742544604105196e-37,1.0644135336591364e-37,1.0545726069077532e-37,1.044731568052493e-37,1.0348906413011097e-37,1.0250497145497265e-37,1.0152087877983434e-37,1.005367748943083e-37,9.955268221916999e-38,9.856858954403167e-38,9.758449686889335e-38,9.660039298336732e-38,9.5616300308229e-38,9.463220763309068e-38,9.364810935275851e-38,9.266401667762019e-38,9.167991839728801e-38,9.06958257221497e-38,8.971172744181752e-38,8.87276347666792e-38,8.774353648634703e-38,8.675944381120871e-38,8.577534553087653e-38,8.479125285573822e-38,8.380715457540604e-38,8.282306190026772e-38,8.183896361993555e-38,8.085487094479723e-38,7.987077266446505e-38,7.888667998932674e-38,7.790258170899456e-38,7.691848903385624e-38,7.593439635871793e-38,7.495029807838575e-38,7.396620540324743e-38,7.298210712291526e-38,7.199801444777694e-38,7.101391616744476e-38,7.002982349230645e-38,6.904572521197427e-38,6.806163253683595e-38,6.707753425650378e-38,6.609344158136546e-38,6.510934330103328e-38,6.412525062589497e-38,6.314115234556279e-38,6.215705967042447e-38,6.11729613900923e-38,6.018886871495398e-38,5.92047704346218e-38,5.822067775948349e-38,5.723657947915131e-38,5.625248680401299e-38,5.526838852368082e-38,5.42842958485425e-38,5.330019756821032e-38,5.231610489307201e-38,5.133200661273983e-38,5.034791393760151e-38,4.936381565726934e-38,4.837972298213102e-38,4.739562470179885e-38,4.641153202666053e-38,4.542743654892528e-38,4.4443341071190034e-38,4.345924559345479e-38,4.247515011571954e-38,4.1491054637984295e-38,4.050695916024905e-38,3.95228636825138e-38,3.8538768204778555e-38,3.755467272704331e-38,3.657057724930806e-38,3.5586481771572815e-38,3.460238629383757e-38,3.361829081610232e-38,3.2634195338367075e-38,3.165009986063183e-38,3.066600438289658e-38,2.9681908905161336e-38,2.869781342742609e-38,2.771371794969084e-38,2.6729622471955596e-38,2.574552699422035e-38,2.4761431516485103e-38,2.3777336038749856e-38,2.279324056101461e-38,2.1809145083279363e-38,2.0825049605544116e-38,1.984095412780887e-38,1.8856858650073623e-38,1.7872763172338377e-38,1.688866769460313e-38,1.5904572216867883e-38,1.4920476739132637e-38,1.393638126139739e-38,1.2952285783662144e-38,1.1968190305926897e-38,1.098409482819165e-38,9.999999350456404e-39],"x":["00000011101010100010010000100101","00000011101010011111100101001000","00000011101010011100111001101011","00000011101010011010001110001110","00000011101010010111100010110000","00000011101010010100110111010011","00000011101010010010001011110110","00000011101010001111100000011001","00000011101010001100110100111100","00000011101010001010001001011111","00000011101010000111011110000010","00000011101010000100110010100101","00000011101010000010000111001000","00000011101001111111011011101011","00000011101001111100110000001110","00000011101001111010000100110001","00000011101001110111011001010100","00000011101001110100101101110111","00000011101001110010000010011010","00000011101001101111010110111101","00000011101001101100101011100000","00000011101001101010000000000011","00000011101001100111010100100110","00000011101001100100101001001001","00000011101001100001111101101100","00000011101001011111010010001111","00000011101001011100100110110010","00000011101001011001111011010101","00000011101001010111001111111000","00000011101001010100100100011011","00000011101001010001111000111110","00000011101001001111001101100001","00000011101001001100100010000100","00000011101001001001110110100111","00000011101001000111001011001010","00000011101001000100011111101101","00000011101001000001110100001111","00000011101000111111001000110010","00000011101000111100011101010101","00000011101000111001110001111000","00000011101000110111000110011011","00000011101000110100011010111110","00000011101000110001101111100001","00000011101000101111000100000100","00000011101000101100011000100111","00000011101000101001101101001010","00000011101000100111000001101101","00000011101000100100010110010000","00000011101000100001101010110011","00000011101000011110111111010110","00000011101000011100010011111001","00000011101000011001101000011100","00000011101000010110111100111111","00000011101000010100010001100010","00000011101000010001100110000101","00000011101000001110111010101000","00000011101000001100001111001011","00000011101000001001100011101110","00000011101000000110111000010001","00000011101000000100001100110100","00000011101000000001100001010111","00000011100111111110110101111010","00000011100111111100001010011101","00000011100111111001011111000000","00000011100111110110110011100011","00000011100111110100001000000110","00000011100111110001011100101001","00000011100111101110110001001100","00000011100111101100000101101111","00000011100111101001011010010001","00000011100111100110101110110100","00000011100111100100000011010111","00000011100111100001010111111010","00000011100111011110101100011101","00000011100111011100000001000000","00000011100111011001010101100011","00000011100111010110101010000110","00000011100111010011111110101001","00000011100111010001010011001100","00000011100111001110100111101111","00000011100111001011111100010010","00000011100111001001010000110101","00000011100111000110100101011000","00000011100111000011111001111011","00000011100111000001001110011110","00000011100110111110100011000001","00000011100110111011110111100100","00000011100110111001001100000111","00000011100110110110100000101010","00000011100110110011110101001101","00000011100110110001001001110000","00000011100110101110011110010011","00000011100110101011110010110110","00000011100110101001000111011001","00000011100110100110011011111100","00000011100110100011110000011111","00000011100110100001000101000010","00000011100110011110011001100101","00000011100110011011101110001000","00000011100110011001000010101011","00000011100110010110010111001110","00000011100110010011101011110000","00000011100110010001000000010011","00000011100110001110010100110110","00000011100110001011101001011001","00000011100110001000111101111100","00000011100110000110010010011111","00000011100110000011100111000010","00000011100110000000111011100101","00000011100101111110010000001000","00000011100101111011100100101011","00000011100101111000111001001110","00000011100101110110001101110001","00000011100101110011100010010100","00000011100101110000110110110111","00000011100101101110001011011010","00000011100101101011011111111101","00000011100101101000110100100000","00000011100101100110001001000011","00000011100101100011011101100110","00000011100101100000110010001001","00000011100101011110000110101100","00000011100101011011011011001111","00000011100101011000101111110010","00000011100101010110000100010101","00000011100101010011011000111000","00000011100101010000101101011011","00000011100101001110000001111110","00000011100101001011010110100001","00000011100101001000101011000100","00000011100101000101111111100111","00000011100101000011010100001010","00000011100101000000101000101101","00000011100100111101111101010000","00000011100100111011010001110010","00000011100100111000100110010101","00000011100100110101111010111000","00000011100100110011001111011011","00000011100100110000100011111110","00000011100100101101111000100001","00000011100100101011001101000100","00000011100100101000100001100111","00000011100100100101110110001010","00000011100100100011001010101101","00000011100100100000011111010000","00000011100100011101110011110011","00000011100100011011001000010110","00000011100100011000011100111001","00000011100100010101110001011100","00000011100100010011000101111111","00000011100100010000011010100010","00000011100100001101101111000101","00000011100100001011000011101000","00000011100100001000011000001011","00000011100100000101101100101110","00000011100100000011000001010001","00000011100100000000010101110100","00000011100011111101101010010111","00000011100011111010111110111010","00000011100011111000010011011101","00000011100011110101101000000000","00000011100011110010111100100011","00000011100011110000010001000110","00000011100011101101100101101001","00000011100011101010111010001100","00000011100011101000001110101111","00000011100011100101100011010010","00000011100011100010110111110100","00000011100011100000001100010111","00000011100011011101100000111010","00000011100011011010110101011101","00000011100011011000001010000000","00000011100011010101011110100011","00000011100011010010110011000110","00000011100011010000000111101001","00000011100011001101011100001100","00000011100011001010110000101111","00000011100011001000000101010010","00000011100011000101011001110101","00000011100011000010101110011000","00000011100011000000000010111011","00000011100010111101010111011110","00000011100010111010101100000001","00000011100010111000000000100100","00000011100010110101010101000111","00000011100010110010101001101010","00000011100010101111111110001101","00000011100010101101010010110000","00000011100010101010100111010011","00000011100010100111111011110110","00000011100010100101010000011001","00000011100010100010100100111100","00000011100010011111111001011111","00000011100010011101001110000010","00000011100010011010100010100101","00000011100010010111110111001000","00000011100010010101001011101011","00000011100010010010100000001110","00000011100010001111110100110001","00000011100010001101001001010011","00000011100010001010011101110110","00000011100010000111110010011001","00000011100010000101000110111100","00000011100010000010011011011111","00000011100001111111110000000010","00000011100001111101000100100101","00000011100001111010011001001000","00000011100001110111101101101011","00000011100001110101000010001110","00000011100001110010010110110001","00000011100001101111101011010100","00000011100001101100111111110111","00000011100001101010010100011010","00000011100001100111101000111101","00000011100001100100111101100000","00000011100001100010010010000011","00000011100001011111100110100110","00000011100001011100111011001001","00000011100001011010001111101100","00000011100001010111100100001111","00000011100001010100111000110010","00000011100001010010001101010101","00000011100001001111100001111000","00000011100001001100110110011011","00000011100001001010001010111110","00000011100001000111011111100001","00000011100001000100110100000100","00000011100001000010001000100111","00000011100000111111011101001010","00000011100000111100110001101101","00000011100000111010000110010000","00000011100000110111011010110011","00000011100000110100101111010101","00000011100000110010000011111000","00000011100000101111011000011011","00000011100000101100101100111110","00000011100000101010000001100001","00000011100000100111010110000100","00000011100000100100101010100111","00000011100000100001111111001010","00000011100000011111010011101101","00000011100000011100101000010000","00000011100000011001111100110011","00000011100000010111010001010110","00000011100000010100100101111001","00000011100000010001111010011100","00000011100000001111001110111111","00000011100000001100100011100010","00000011100000001001111000000101","00000011100000000111001100101000","00000011100000000100100001001011","00000011100000000001110101101110","00000011011111111110010100100010","00000011011111111000111101101000","00000011011111110011100110101110","00000011011111101110001111110100","00000011011111101000111000111001","00000011011111100011100001111111","00000011011111011110001011000101","00000011011111011000110100001011","00000011011111010011011101010001","00000011011111001110000110010111","00000011011111001000101111011101","00000011011111000011011000100011","00000011011110111110000001101001","00000011011110111000101010101111","00000011011110110011010011110101","00000011011110101101111100111011","00000011011110101000100110000001","00000011011110100011001111000111","00000011011110011101111000001101","00000011011110011000100001010011","00000011011110010011001010011001","00000011011110001101110011011110","00000011011110001000011100100100","00000011011110000011000101101010","00000011011101111101101110110000","00000011011101111000010111110110","00000011011101110011000000111100","00000011011101101101101010000010","00000011011101101000010011001000","00000011011101100010111100001110","00000011011101011101100101010100","00000011011101011000001110011010","00000011011101010010110111100000","00000011011101001101100000100110","00000011011101001000001001101100","00000011011101000010110010110010","00000011011100111101011011111000","00000011011100111000000100111101","00000011011100110010101110000011","00000011011100101101010111001001","00000011011100101000000000001111","00000011011100100010101001010101","00000011011100011101010010011011","00000011011100010111111011100001","00000011011100010010100100100111","00000011011100001101001101101101","00000011011100000111110110110011","00000011011100000010011111111001","00000011011011111101001000111111","00000011011011110111110010000101","00000011011011110010011011001011","00000011011011101101000100010001","00000011011011100111101101010111","00000011011011100010010110011100","00000011011011011100111111100010","00000011011011010111101000101000","00000011011011010010010001101110","00000011011011001100111010110100","00000011011011000111100011111010","00000011011011000010001101000000","00000011011010111100110110000110","00000011011010110111011111001100","00000011011010110010001000010010","00000011011010101100110001011000","00000011011010100111011010011110","00000011011010100010000011100100","00000011011010011100101100101010","00000011011010010111010101110000","00000011011010010001111110110110","00000011011010001100100111111011","00000011011010000111010001000001","00000011011010000001111010000111","00000011011001111100100011001101","00000011011001110111001100010011","00000011011001110001110101011001","00000011011001101100011110011111","00000011011001100111000111100101","00000011011001100001110000101011","00000011011001011100011001110001","00000011011001010111000010110111","00000011011001010001101011111101","00000011011001001100010101000011","00000011011001000110111110001001","00000011011001000001100111001111","00000011011000111100010000010101","00000011011000110110111001011011","00000011011000110001100010100000","00000011011000101100001011100110","00000011011000100110110100101100","00000011011000100001011101110010","00000011011000011100000110111000","00000011011000010110101111111110","00000011011000010001011001000100","00000011011000001100000010001010","00000011011000000110101011010000","00000011011000000001010100010110","00000011010111111011111101011100","00000011010111110110100110100010","00000011010111110001001111101000","00000011010111101011111000101110","00000011010111100110100001110100","00000011010111100001001010111010","00000011010111011011110011111111","00000011010111010110011101000101","00000011010111010001000110001011","00000011010111001011101111010001","00000011010111000110011000010111","00000011010111000001000001011101","00000011010110111011101010100011","00000011010110110110010011101001","00000011010110110000111100101111","00000011010110101011100101110101","00000011010110100110001110111011","00000011010110100000111000000001","00000011010110011011100001000111","00000011010110010110001010001101","00000011010110010000110011010011","00000011010110001011011100011001","00000011010110000110000101011110","00000011010110000000101110100100","00000011010101111011010111101010","00000011010101110110000000110000","00000011010101110000101001110110","00000011010101101011010010111100","00000011010101100101111100000010","00000011010101100000100101001000","00000011010101011011001110001110","00000011010101010101110111010100","00000011010101010000100000011010","00000011010101001011001001100000","00000011010101000101110010100110","00000011010101000000011011101100","00000011010100111011000100110010","00000011010100110101101101111000","00000011010100110000010110111110","00000011010100101011000000000011","00000011010100100101101001001001","00000011010100100000010010001111","00000011010100011010111011010101","00000011010100010101100100011011","00000011010100010000001101100001","00000011010100001010110110100111","00000011010100000101011111101101","00000011010100000000001000110011","00000011010011111010110001111001","00000011010011110101011010111111","00000011010011110000000100000101","00000011010011101010101101001011","00000011010011100101010110010001","00000011010011011111111111010111","00000011010011011010101000011101","00000011010011010101010001100010","00000011010011001111111010101000","00000011010011001010100011101110","00000011010011000101001100110100","00000011010010111111110101111010","00000011010010111010011111000000","00000011010010110101001000000110","00000011010010101111110001001100","00000011010010101010011010010010","00000011010010100101000011011000","00000011010010011111101100011110","00000011010010011010010101100100","00000011010010010100111110101010","00000011010010001111100111110000","00000011010010001010010000110110","00000011010010000100111001111100","00000011010001111111100011000001","00000011010001111010001100000111","00000011010001110100110101001101","00000011010001101111011110010011","00000011010001101010000111011001","00000011010001100100110000011111","00000011010001011111011001100101","00000011010001011010000010101011","00000011010001010100101011110001","00000011010001001111010100110111","00000011010001001001111101111101","00000011010001000100100111000011","00000011010000111111010000001001","00000011010000111001111001001111","00000011010000110100100010010101","00000011010000101111001011011011","00000011010000101001110100100000","00000011010000100100011101100110","00000011010000011111000110101100","00000011010000011001101111110010","00000011010000010100011000111000","00000011010000001111000001111110","00000011010000001001101011000100","00000011010000000100010100001010","00000011001111111110111101010000","00000011001111111001100110010110","00000011001111110100001111011100","00000011001111101110111000100010","00000011001111101001100001101000","00000011001111100100001010101110","00000011001111011110110011110100","00000011001111011001011100111010","00000011001111010100000110000000","00000011001111001110101111000101","00000011001111001001011000001011","00000011001111000100000001010001","00000011001110111110101010010111","00000011001110111001010011011101","00000011001110110011111100100011","00000011001110101110100101101001","00000011001110101001001110101111","00000011001110100011110111110101","00000011001110011110100000111011","00000011001110011001001010000001","00000011001110010011110011000111","00000011001110001110011100001101","00000011001110001001000101010011","00000011001110000011101110011001","00000011001101111110010111011111","00000011001101111001000000100100","00000011001101110011101001101010","00000011001101101110010010110000","00000011001101101000111011110110","00000011001101100011100100111100","00000011001101011110001110000010","00000011001101011000110111001000","00000011001101010011100000001110","00000011001101001110001001010100","00000011001101001000110010011010","00000011001101000011011011100000","00000011001100111110000100100110","00000011001100111000101101101100","00000011001100110011010110110010","00000011001100101101111111111000","00000011001100101000101000111110","00000011001100100011010010000011","00000011001100011101111011001001","00000011001100011000100100001111","00000011001100010011001101010101","00000011001100001101110110011011","00000011001100001000011111100001","00000011001100000011001000100111","00000011001011111101110001101101","00000011001011111000011010110011","00000011001011110011000011111001","00000011001011101101101100111111","00000011001011101000010110000101","00000011001011100010111111001011","00000011001011011101101000010001","00000011001011011000010001010111","00000011001011010010111010011101","00000011001011001101100011100011","00000011001011001000001100101000","00000011001011000010110101101110","00000011001010111101011110110100","00000011001010111000000111111010","00000011001010110010110001000000","00000011001010101101011010000110","00000011001010101000000011001100","00000011001010100010101100010010","00000011001010011101010101011000","00000011001010010111111110011110","00000011001010010010100111100100","00000011001010001101010000101010","00000011001010000111111001110000","00000011001010000010100010110110","00000011001001111101001011111100","00000011001001110111110101000010","00000011001001110010011110000111","00000011001001101101000111001101","00000011001001100111110000010011","00000011001001100010011001011001","00000011001001011101000010011111","00000011001001010111101011100101","00000011001001010010010100101011","00000011001001001100111101110001","00000011001001000111100110110111","00000011001001000010001111111101","00000011001000111100111001000011","00000011001000110111100010001001","00000011001000110010001011001111","00000011001000101100110100010101","00000011001000100111011101011011","00000011001000100010000110100001","00000011001000011100101111100110","00000011001000010111011000101100","00000011001000010010000001110010","00000011001000001100101010111000","00000011001000000111010011111110","00000011001000000001111101000100","00000011000111111100100110001010","00000011000111110111001111010000","00000011000111110001111000010110","00000011000111101100100001011100","00000011000111100111001010100010","00000011000111100001110011101000","00000011000111011100011100101110","00000011000111010111000101110100","00000011000111010001101110111010","00000011000111001100011000000000","00000011000111000111000001000110","00000011000111000001101010001011","00000011000110111100010011010001","00000011000110110110111100010111","00000011000110110001100101011101","00000011000110101100001110100011","00000011000110100110110111101001","00000011000110100001100000101111","00000011000110011100001001110101","00000011000110010110110010111011","00000011000110010001011100000001","00000011000110001100000101000111","00000011000110000110101110001101","00000011000110000001010111010011","00000011000101111100000000011001","00000011000101110110101001011111","00000011000101110001010010100101","00000011000101101011111011101010","00000011000101100110100100110000","00000011000101100001001101110110","00000011000101011011110110111100","00000011000101010110100000000010","00000011000101010001001001001000","00000011000101001011110010001110","00000011000101000110011011010100","00000011000101000001000100011010","00000011000100111011101101100000","00000011000100110110010110100110","00000011000100110000111111101100","00000011000100101011101000110010","00000011000100100110010001111000","00000011000100100000111010111110","00000011000100011011100100000100","00000011000100010110001101001001","00000011000100010000110110001111","00000011000100001011011111010101","00000011000100000110001000011011","00000011000100000000110001100001","00000011000011111011011010100111","00000011000011110110000011101101","00000011000011110000101100110011","00000011000011101011010101111001","00000011000011100101111110111111","00000011000011100000101000000101","00000011000011011011010001001011","00000011000011010101111010010001","00000011000011010000100011010111","00000011000011001011001100011101","00000011000011000101110101100011","00000011000011000000011110101000","00000011000010111011000111101110","00000011000010110101110000110100","00000011000010110000011001111010","00000011000010101011000011000000","00000011000010100101101100000110","00000011000010100000010101001100","00000011000010011010111110010010","00000011000010010101100111011000","00000011000010010000010000011110","00000011000010001010111001100100","00000011000010000101100010101010","00000011000010000000001011110000","00000011000001111010110100110110","00000011000001110101011101111100","00000011000001110000000111000010","00000011000001101010110000001000","00000011000001100101011001001101","00000011000001100000000010010011","00000011000001011010101011011001","00000011000001010101010100011111","00000011000001001111111101100101","00000011000001001010100110101011","00000011000001000101001111110001","00000011000000111111111000110111","00000011000000111010100001111101","00000011000000110101001011000011","00000011000000101111110100001001","00000011000000101010011101001111","00000011000000100101000110010101","00000011000000011111101111011011","00000011000000011010011000100001","00000011000000010101000001100111","00000011000000001111101010101100","00000011000000001010010011110010","00000011000000000100111100111000","00000010111111111111001011111101","00000010111111110100011110001000","00000010111111101001110000010100","00000010111111011111000010100000","00000010111111010100010100101100","00000010111111001001100110111000","00000010111110111110111001000100","00000010111110110100001011010000","00000010111110101001011101011100","00000010111110011110101111100111","00000010111110010100000001110011","00000010111110001001010011111111","00000010111101111110100110001011","00000010111101110011111000010111","00000010111101101001001010100011","00000010111101011110011100101111","00000010111101010011101110111011","00000010111101001001000001000110","00000010111100111110010011010010","00000010111100110011100101011110","00000010111100101000110111101010","00000010111100011110001001110110","00000010111100010011011100000010","00000010111100001000101110001110","00000010111011111110000000011010","00000010111011110011010010100110","00000010111011101000100100110001","00000010111011011101110110111101","00000010111011010011001001001001","00000010111011001000011011010101","00000010111010111101101101100001","00000010111010110010111111101101","00000010111010101000010001111001","00000010111010011101100100000101","00000010111010010010110110010000","00000010111010001000001000011100","00000010111001111101011010101000","00000010111001110010101100110100","00000010111001100111111111000000","00000010111001011101010001001100","00000010111001010010100011011000","00000010111001000111110101100100","00000010111000111101000111101111","00000010111000110010011001111011","00000010111000100111101100000111","00000010111000011100111110010011","00000010111000010010010000011111","00000010111000000111100010101011","00000010110111111100110100110111","00000010110111110010000111000011","00000010110111100111011001001110","00000010110111011100101011011010","00000010110111010001111101100110","00000010110111000111001111110010","00000010110110111100100001111110","00000010110110110001110100001010","00000010110110100111000110010110","00000010110110011100011000100010","00000010110110010001101010101101","00000010110110000110111100111001","00000010110101111100001111000101","00000010110101110001100001010001","00000010110101100110110011011101","00000010110101011100000101101001","00000010110101010001010111110101","00000010110101000110101010000001","00000010110100111011111100001100","00000010110100110001001110011000","00000010110100100110100000100100","00000010110100011011110010110000","00000010110100010001000100111100","00000010110100000110010111001000","00000010110011111011101001010100","00000010110011110000111011100000","00000010110011100110001101101011","00000010110011011011011111110111","00000010110011010000110010000011","00000010110011000110000100001111","00000010110010111011010110011011","00000010110010110000101000100111","00000010110010100101111010110011","00000010110010011011001100111111","00000010110010010000011111001011","00000010110010000101110001010110","00000010110001111011000011100010","00000010110001110000010101101110","00000010110001100101100111111010","00000010110001011010111010000110","00000010110001010000001100010010","00000010110001000101011110011110","00000010110000111010110000101010","00000010110000110000000010110101","00000010110000100101010101000001","00000010110000011010100111001101","00000010110000001111111001011001","00000010110000000101001011100101","00000010101111111010011101110001","00000010101111101111101111111101","00000010101111100101000010001001","00000010101111011010010100010100","00000010101111001111100110100000","00000010101111000100111000101100","00000010101110111010001010111000","00000010101110101111011101000100","00000010101110100100101111010000","00000010101110011010000001011100","00000010101110001111010011101000","00000010101110000100100101110011","00000010101101111001110111111111","00000010101101101111001010001011","00000010101101100100011100010111","00000010101101011001101110100011","00000010101101001111000000101111","00000010101101000100010010111011","00000010101100111001100101000111","00000010101100101110110111010010","00000010101100100100001001011110","00000010101100011001011011101010","00000010101100001110101101110110","00000010101100000100000000000010","00000010101011111001010010001110","00000010101011101110100100011010","00000010101011100011110110100110","00000010101011011001001000110001","00000010101011001110011010111101","00000010101011000011101101001001","00000010101010111000111111010101","00000010101010101110010001100001","00000010101010100011100011101101","00000010101010011000110101111001","00000010101010001110001000000101","00000010101010000011011010010000","00000010101001111000101100011100","00000010101001101101111110101000","00000010101001100011010000110100","00000010101001011000100011000000","00000010101001001101110101001100","00000010101001000011000111011000","00000010101000111000011001100100","00000010101000101101101011110000","00000010101000100010111101111011","00000010101000011000010000000111","00000010101000001101100010010011","00000010101000000010110100011111","00000010100111111000000110101011","00000010100111101101011000110111","00000010100111100010101011000011","00000010100111010111111101001111","00000010100111001101001111011010","00000010100111000010100001100110","00000010100110110111110011110010","00000010100110101101000101111110","00000010100110100010011000001010","00000010100110010111101010010110","00000010100110001100111100100010","00000010100110000010001110101110","00000010100101110111100000111001","00000010100101101100110011000101","00000010100101100010000101010001","00000010100101010111010111011101","00000010100101001100101001101001","00000010100101000001111011110101","00000010100100110111001110000001","00000010100100101100100000001101","00000010100100100001110010011000","00000010100100010111000100100100","00000010100100001100010110110000","00000010100100000001101000111100","00000010100011110110111011001000","00000010100011101100001101010100","00000010100011100001011111100000","00000010100011010110110001101100","00000010100011001100000011110111","00000010100011000001010110000011","00000010100010110110101000001111","00000010100010101011111010011011","00000010100010100001001100100111","00000010100010010110011110110011","00000010100010001011110000111111","00000010100010000001000011001011","00000010100001110110010101010110","00000010100001101011100111100010","00000010100001100000111001101110","00000010100001010110001011111010","00000010100001001011011110000110","00000010100001000000110000010010","00000010100000110110000010011110","00000010100000101011010100101010","00000010100000100000100110110101","00000010100000010101111001000001","00000010100000001011001011001101","00000010100000000000011101011001","00000010011111101011011111001010","00000010011111010110000011100010","00000010011111000000100111111010","00000010011110101011001100010001","00000010011110010101110000101001","00000010011110000000010101000001","00000010011101101010111001011001","00000010011101010101011101110000","00000010011101000000000010001000","00000010011100101010100110100000","00000010011100010101001010111000","00000010011011111111101111001111","00000010011011101010010011100111","00000010011011010100110111111111","00000010011010111111011100010111","00000010011010101010000000101110","00000010011010010100100101000110","00000010011001111111001001011110","00000010011001101001101101110110","00000010011001010100010010001101","00000010011000111110110110100101","00000010011000101001011010111101","00000010011000010011111111010101","00000010010111111110100011101100","00000010010111101001001000000100","00000010010111010011101100011100","00000010010110111110010000110100","00000010010110101000110101001011","00000010010110010011011001100011","00000010010101111101111101111011","00000010010101101000100010010011","00000010010101010011000110101010","00000010010100111101101011000010","00000010010100101000001111011010","00000010010100010010110011110010","00000010010011111101011000001001","00000010010011100111111100100001","00000010010011010010100000111001","00000010010010111101000101010001","00000010010010100111101001101000","00000010010010010010001110000000","00000010010001111100110010011000","00000010010001100111010110110000","00000010010001010001111011000111","00000010010000111100011111011111","00000010010000100111000011110111","00000010010000010001101000001111","00000010001111111100001100100110","00000010001111100110110000111110","00000010001111010001010101010110","00000010001110111011111001101110","00000010001110100110011110000101","00000010001110010001000010011101","00000010001101111011100110110101","00000010001101100110001011001101","00000010001101010000101111100100","00000010001100111011010011111100","00000010001100100101111000010100","00000010001100010000011100101100","00000010001011111011000001000100","00000010001011100101100101011011","00000010001011010000001001110011","00000010001010111010101110001011","00000010001010100101010010100011","00000010001010001111110110111010","00000010001001111010011011010010","00000010001001100100111111101010","00000010001001001111100100000010","00000010001000111010001000011001","00000010001000100100101100110001","00000010001000001111010001001001","00000010000111111001110101100001","00000010000111100100011001111000","00000010000111001110111110010000","00000010000110111001100010101000","00000010000110100100000111000000","00000010000110001110101011010111","00000010000101111001001111101111","00000010000101100011110100000111","00000010000101001110011000011111","00000010000100111000111100110110","00000010000100100011100001001110","00000010000100001110000101100110","00000010000011111000101001111110","00000010000011100011001110010101","00000010000011001101110010101101","00000010000010111000010111000101","00000010000010100010111011011101","00000010000010001101011111110100","00000010000001111000000100001100","00000010000001100010101000100100","00000010000001001101001100111100","00000010000000110111110001010011","00000010000000100010010101101011","00000010000000001100111010000011","00000001111111101110111100110101","00000001111111000100000101100101","00000001111110011001001110010100","00000001111101101110010111000100","00000001111101000011011111110011","00000001111100011000101000100011","00000001111011101101110001010010","00000001111011000010111010000010","00000001111010011000000010110001","00000001111001101101001011100001","00000001111001000010010100010000","00000001111000010111011101000000","00000001110111101100100101101111","00000001110111000001101110011111","00000001110110010110110111001110","00000001110101101011111111111110","00000001110101000001001000101101","00000001110100010110010001011101","00000001110011101011011010001101","00000001110011000000100010111100","00000001110010010101101011101100","00000001110001101010110100011011","00000001110000111111111101001011","00000001110000010101000101111010","00000001101111101010001110101010","00000001101110111111010111011001","00000001101110010100100000001001","00000001101101101001101000111000","00000001101100111110110001101000","00000001101100010011111010010111","00000001101011101001000011000111","00000001101010111110001011110110","00000001101010010011010100100110","00000001101001101000011101010101","00000001101000111101100110000101","00000001101000010010101110110100","00000001100111100111110111100100","00000001100110111101000000010011","00000001100110010010001001000011","00000001100101100111010001110010","00000001100100111100011010100010","00000001100100010001100011010001","00000001100011100110101100000001","00000001100010111011110100110000","00000001100010010000111101100000","00000001100001100110000110001111","00000001100000111011001110111111","00000001100000010000010111101110","00000001011111001011000000111100","00000001011101110101010010011011","00000001011100011111100011111010","00000001011011001001110101011001","00000001011001110100000110111000","00000001011000011110011000010111","00000001010111001000101001110110","00000001010101110010111011010101","00000001010100011101001100110100","00000001010011000111011110010011","00000001010001110001101111110010","00000001010000011100000001010001","00000001001111000110010010110000","00000001001101110000100100001111","00000001001100011010110101101110","00000001001011000101000111001101","00000001001001101111011000101100","00000001001000011001101010001011","00000001000111000011111011101010","00000001000101101110001101001001","00000001000100011000011110101000","00000001000011000010110000000111","00000001000001101101000001100110","00000001000000010111010011000101","00000000111110000011001001001000","00000000111011010111101100000110","00000000111000101100001111000100","00000000110110000000110010000010","00000000110011010101010101000000","00000000110000101001110111111110","00000000101101111110011010111100","00000000101011010010111101111010","00000000101000100111100000111000","00000000100101111100000011110110","00000000100011010000100110110100","00000000100000100101001001110010","00000000011101111001101100110000","00000000011011001110001111101110"]}
},{}],140:[function(require,module,exports){
module.exports={"expected":[1.0000002153053333e-39,9.990052933956626e-40,9.980117727844563e-40,9.9701825217325e-40,9.960233302635794e-40,9.950298096523731e-40,9.940362890411668e-40,9.930413671314962e-40,9.9204784652029e-40,9.910543259090836e-40,9.90059403999413e-40,9.890658833882067e-40,9.880709614785361e-40,9.870774408673298e-40,9.860839202561235e-40,9.850889983464529e-40,9.840954777352466e-40,9.831019571240403e-40,9.821070352143697e-40,9.811135146031634e-40,9.80119993991957e-40,9.791250720822865e-40,9.781315514710802e-40,9.771366295614095e-40,9.761431089502032e-40,9.75149588338997e-40,9.741546664293263e-40,9.7316114581812e-40,9.721676252069137e-40,9.711727032972431e-40,9.701791826860368e-40,9.691842607763662e-40,9.681907401651599e-40,9.671972195539536e-40,9.66202297644283e-40,9.652087770330767e-40,9.642152564218704e-40,9.632203345121998e-40,9.622268139009935e-40,9.612332932897872e-40,9.602383713801166e-40,9.592448507689103e-40,9.582499288592397e-40,9.572564082480334e-40,9.56262887636827e-40,9.552679657271564e-40,9.542744451159502e-40,9.532809245047439e-40,9.522860025950732e-40,9.51292481983867e-40,9.502975600741963e-40,9.4930403946299e-40,9.483105188517837e-40,9.473155969421131e-40,9.463220763309068e-40,9.453285557197005e-40,9.443336338100299e-40,9.433401131988236e-40,9.423465925876173e-40,9.413516706779467e-40,9.403581500667404e-40,9.393632281570698e-40,9.383697075458635e-40,9.373761869346572e-40,9.363812650249866e-40,9.353877444137803e-40,9.34394223802574e-40,9.333993018929034e-40,9.32405781281697e-40,9.314122606704908e-40,9.304173387608201e-40,9.294238181496138e-40,9.284288962399432e-40,9.27435375628737e-40,9.264418550175306e-40,9.2544693310786e-40,9.244534124966537e-40,9.234598918854474e-40,9.224649699757768e-40,9.214714493645705e-40,9.204765274548999e-40,9.194830068436936e-40,9.184894862324873e-40,9.174945643228167e-40,9.165010437116104e-40,9.155075231004041e-40,9.145126011907335e-40,9.135190805795272e-40,9.125255599683209e-40,9.115306380586503e-40,9.10537117447444e-40,9.095421955377733e-40,9.08548674926567e-40,9.075551543153608e-40,9.065602324056901e-40,9.055667117944838e-40,9.045731911832775e-40,9.03578269273607e-40,9.025847486624006e-40,9.015912280511943e-40,9.005963061415237e-40,8.996027855303174e-40,8.986078636206468e-40,8.976143430094405e-40,8.966208223982342e-40,8.956259004885636e-40,8.946323798773573e-40,8.93638859266151e-40,8.926439373564804e-40,8.91650416745274e-40,8.906554948356035e-40,8.896619742243972e-40,8.886684536131909e-40,8.876735317035202e-40,8.86680011092314e-40,8.856864904811077e-40,8.84691568571437e-40,8.836980479602307e-40,8.827045273490244e-40,8.817096054393538e-40,8.807160848281475e-40,8.797211629184769e-40,8.787276423072706e-40,8.777341216960643e-40,8.767391997863937e-40,8.757456791751874e-40,8.747521585639811e-40,8.737572366543105e-40,8.727637160431042e-40,8.717701954318979e-40,8.707752735222273e-40,8.69781752911021e-40,8.687868310013504e-40,8.67793310390144e-40,8.667997897789378e-40,8.658048678692672e-40,8.648113472580609e-40,8.638178266468546e-40,8.62822904737184e-40,8.618293841259776e-40,8.60834462216307e-40,8.598409416051007e-40,8.588474209938944e-40,8.578524990842238e-40,8.568589784730175e-40,8.558654578618112e-40,8.548705359521406e-40,8.538770153409343e-40,8.52883494729728e-40,8.518885728200574e-40,8.508950522088511e-40,8.499001302991805e-40,8.489066096879742e-40,8.479130890767679e-40,8.469181671670973e-40,8.45924646555891e-40,8.449311259446847e-40,8.43936204035014e-40,8.429426834238078e-40,8.419491628126015e-40,8.409542409029308e-40,8.399607202917245e-40,8.38965798382054e-40,8.379722777708476e-40,8.369787571596413e-40,8.359838352499707e-40,8.349903146387644e-40,8.339967940275581e-40,8.330018721178875e-40,8.320083515066812e-40,8.310134295970106e-40,8.300199089858043e-40,8.29026388374598e-40,8.280314664649274e-40,8.270379458537211e-40,8.260444252425148e-40,8.250495033328442e-40,8.240559827216379e-40,8.230624621104316e-40,8.22067540200761e-40,8.210740195895547e-40,8.20079097679884e-40,8.190855770686777e-40,8.180920564574715e-40,8.170971345478008e-40,8.161036139365945e-40,8.151100933253882e-40,8.141151714157176e-40,8.131216508045113e-40,8.121267288948407e-40,8.111332082836344e-40,8.101396876724281e-40,8.091447657627575e-40,8.081512451515512e-40,8.071577245403449e-40,8.061628026306743e-40,8.05169282019468e-40,8.041757614082617e-40,8.03180839498591e-40,8.021873188873848e-40,8.011923969777142e-40,8.001988763665079e-40,7.992053557553016e-40,7.98210433845631e-40,7.972169132344247e-40,7.962233926232184e-40,7.952284707135477e-40,7.942349501023414e-40,7.932414294911351e-40,7.922465075814645e-40,7.912529869702582e-40,7.902580650605876e-40,7.892645444493813e-40,7.88271023838175e-40,7.872761019285044e-40,7.862825813172981e-40,7.852890607060918e-40,7.842941387964212e-40,7.833006181852149e-40,7.823056962755443e-40,7.81312175664338e-40,7.803186550531317e-40,7.79323733143461e-40,7.783302125322548e-40,7.773366919210485e-40,7.763417700113779e-40,7.753482494001716e-40,7.743547287889653e-40,7.733598068792946e-40,7.723662862680883e-40,7.713713643584177e-40,7.703778437472114e-40,7.693843231360051e-40,7.683894012263345e-40,7.673958806151282e-40,7.66402360003922e-40,7.654074380942513e-40,7.64413917483045e-40,7.634203968718387e-40,7.624254749621681e-40,7.614319543509618e-40,7.604370324412912e-40,7.594435118300849e-40,7.584499912188786e-40,7.57455069309208e-40,7.564615486980017e-40,7.554680280867954e-40,7.544731061771248e-40,7.534795855659185e-40,7.524846636562478e-40,7.514911430450415e-40,7.504976224338353e-40,7.495027005241646e-40,7.485091799129583e-40,7.47515659301752e-40,7.465207373920814e-40,7.455272167808751e-40,7.445336961696688e-40,7.435387742599982e-40,7.425452536487919e-40,7.415503317391213e-40,7.40556811127915e-40,7.395632905167087e-40,7.385683686070381e-40,7.375748479958318e-40,7.365813273846255e-40,7.355864054749549e-40,7.345928848637486e-40,7.335993642525423e-40,7.326044423428717e-40,7.316109217316654e-40,7.3061599982199475e-40,7.2962247921078845e-40,7.2862895859958216e-40,7.276340366899115e-40,7.2664051607870524e-40,7.2564699546749895e-40,7.246520735578283e-40,7.23658552946622e-40,7.226636310369514e-40,7.216701104257451e-40,7.206765898145388e-40,7.196816679048682e-40,7.186881472936619e-40,7.176946266824556e-40,7.16699704772785e-40,7.157061841615787e-40,7.147126635503724e-40,7.137177416407018e-40,7.127242210294955e-40,7.117292991198249e-40,7.107357785086186e-40,7.097422578974123e-40,7.0874733598774165e-40,7.0775381537653536e-40,7.067602947653291e-40,7.0576537285565844e-40,7.0477185224445215e-40,7.0377833163324585e-40,7.027834097235752e-40,7.017898891123689e-40,7.007949672026983e-40,6.99801446591492e-40,6.988079259802857e-40,6.978130040706151e-40,6.968194834594088e-40,6.958259628482025e-40,6.948310409385319e-40,6.938375203273256e-40,6.92842598417655e-40,6.918490778064487e-40,6.908555571952424e-40,6.898606352855718e-40,6.888671146743655e-40,6.878735940631592e-40,6.8687867215348856e-40,6.858851515422823e-40,6.84891630931076e-40,6.8389670902140535e-40,6.8290318841019905e-40,6.819082665005284e-40,6.809147458893221e-40,6.7992122527811584e-40,6.789263033684452e-40,6.779327827572389e-40,6.769392621460326e-40,6.75944340236362e-40,6.749508196251557e-40,6.739558977154851e-40,6.729623771042788e-40,6.719688564930725e-40,6.709739345834019e-40,6.699804139721956e-40,6.689868933609893e-40,6.679919714513187e-40,6.669984508401124e-40,6.660049302289061e-40,6.650100083192355e-40,6.640164877080292e-40,6.6302156579835855e-40,6.6202804518715225e-40,6.6103452457594596e-40,6.600396026662753e-40,6.5904608205506904e-40,6.5805256144386275e-40,6.570576395341921e-40,6.560641189229858e-40,6.550705983117795e-40,6.540756764021089e-40,6.530821557909026e-40,6.52087233881232e-40,6.510937132700257e-40,6.501001926588194e-40,6.491052707491488e-40,6.481117501379425e-40,6.471182295267362e-40,6.461233076170656e-40,6.451297870058593e-40,6.441348650961887e-40,6.431413444849824e-40,6.421478238737761e-40,6.4115290196410545e-40,6.4015938135289916e-40,6.391658607416929e-40,6.3817093883202224e-40,6.3717741822081595e-40,6.3618389760960965e-40,6.35188975699939e-40,6.341954550887327e-40,6.332005331790621e-40,6.322070125678558e-40,6.312134919566495e-40,6.302185700469789e-40,6.292250494357726e-40,6.282315288245663e-40,6.272366069148957e-40,6.262430863036894e-40,6.252495656924831e-40,6.242546437828125e-40,6.232611231716062e-40,6.222662012619356e-40,6.212726806507293e-40,6.20279160039523e-40,6.1928423812985236e-40,6.182907175186461e-40,6.172971969074398e-40,6.1630227499776915e-40,6.1530875438656285e-40,6.143138324768922e-40,6.133203118656859e-40,6.123267912544796e-40,6.11331869344809e-40,6.103383487336027e-40,6.093448281223964e-40,6.083499062127258e-40,6.073563856015195e-40,6.063628649903132e-40,6.053679430806426e-40,6.043744224694363e-40,6.033795005597657e-40,6.023859799485594e-40,6.013924593373531e-40,6.003975374276825e-40,5.994040168164762e-40,5.984104962052699e-40,5.974155742955993e-40,5.96422053684393e-40,5.954285330731867e-40,5.9443361116351605e-40,5.9344009055230976e-40,5.924451686426391e-40,5.914516480314328e-40,5.9045812742022655e-40,5.894632055105559e-40,5.884696848993496e-40,5.874761642881433e-40,5.864812423784727e-40,5.854877217672664e-40,5.844927998575958e-40,5.834992792463895e-40,5.825057586351832e-40,5.815108367255126e-40,5.805173161143063e-40,5.795237955031e-40,5.785288735934294e-40,5.775353529822231e-40,5.765418323710168e-40,5.755469104613462e-40,5.745533898501399e-40,5.7355846794046925e-40,5.7256494732926296e-40,5.715714267180567e-40,5.70576504808386e-40,5.6958298419717975e-40,5.6858946358597345e-40,5.675945416763028e-40,5.666010210650965e-40,5.656060991554259e-40,5.646125785442196e-40,5.636190579330133e-40,5.626241360233427e-40,5.616306154121364e-40,5.606370948009301e-40,5.596421728912595e-40,5.586486522800532e-40,5.576551316688469e-40,5.566602097591763e-40,5.5566668914797e-40,5.546717672382994e-40,5.536782466270931e-40,5.526847260158868e-40,5.5168980410621616e-40,5.506962834950099e-40,5.497027628838036e-40,5.4870784097413295e-40,5.4771432036292665e-40,5.4672079975172035e-40,5.457258778420497e-40,5.447323572308434e-40,5.437374353211728e-40,5.427439147099665e-40,5.417503940987602e-40,5.407554721890896e-40,5.397619515778833e-40,5.38768430966677e-40,5.377735090570064e-40,5.367799884458001e-40,5.357850665361295e-40,5.347915459249232e-40,5.337980253137169e-40,5.328031034040463e-40,5.3180958279284e-40,5.308160621816337e-40,5.298211402719631e-40,5.288276196607568e-40,5.278340990495505e-40,5.2683917713987985e-40,5.2584565652867355e-40,5.248507346190029e-40,5.238572140077966e-40,5.2286369339659034e-40,5.218687714869197e-40,5.208752508757134e-40,5.198817302645071e-40,5.188868083548365e-40,5.178932877436302e-40,5.168997671324239e-40,5.159048452227533e-40,5.14911324611547e-40,5.139164027018764e-40,5.129228820906701e-40,5.119293614794638e-40,5.109344395697932e-40,5.099409189585869e-40,5.089473983473806e-40,5.0795247643771e-40,5.069589558265037e-40,5.0596403391683305e-40,5.0497051330562675e-40,5.039769926944205e-40,5.029820707847498e-40,5.0198855017354354e-40,5.0099502956233725e-40,5.000001076526666e-40,4.990065870414603e-40,4.98013066430254e-40,4.970181445205834e-40,4.960246239093771e-40,4.950297019997065e-40,4.940361813885002e-40,4.930426607772939e-40,4.920477388676233e-40,4.91054218256417e-40,4.900606976452107e-40,4.890657757355401e-40,4.880722551243338e-40,4.870787345131275e-40,4.860838126034569e-40,4.850902919922506e-40,4.8409537008257995e-40,4.831018494713737e-40,4.821083288601674e-40,4.8111340695049674e-40,4.8011988633929045e-40,4.7912636572808415e-40,4.781314438184135e-40,4.771379232072072e-40,4.761430012975366e-40,4.751494806863303e-40,4.74155960075124e-40,4.731610381654534e-40,4.721675175542471e-40,4.711739969430408e-40,4.701790750333702e-40,4.691855544221639e-40,4.681920338109576e-40,4.67197111901287e-40,4.662035912900807e-40,4.652086693804101e-40,4.642151487692038e-40,4.632216281579975e-40,4.622267062483269e-40,4.612331856371206e-40,4.602396650259143e-40,4.5924474311624365e-40,4.5825122250503735e-40,4.5725770189383106e-40,4.562627799841604e-40,4.5526925937295414e-40,4.542743374632835e-40,4.532808168520772e-40,4.522872962408709e-40,4.512923743312003e-40,4.50298853719994e-40,4.493053331087877e-40,4.483104111991171e-40,4.473168905879108e-40,4.463219686782402e-40,4.453284480670339e-40,4.443349274558276e-40,4.43340005546157e-40,4.423464849349507e-40,4.413529643237444e-40,4.403580424140738e-40,4.393645218028675e-40,4.383710011916612e-40,4.3737607928199055e-40,4.3638255867078426e-40,4.353876367611136e-40,4.3439411614990734e-40,4.3340059553870105e-40,4.324056736290304e-40,4.314121530178241e-40,4.304186324066178e-40,4.294237104969472e-40,4.284301898857409e-40,4.274352679760703e-40,4.26441747364864e-40,4.254482267536577e-40,4.244533048439871e-40,4.234597842327808e-40,4.224662636215745e-40,4.214713417119039e-40,4.204778211006976e-40,4.194843004894913e-40,4.184893785798207e-40,4.174958579686144e-40,4.1650093605894375e-40,4.1550741544773746e-40,4.145138948365312e-40,4.1351897292686054e-40,4.1252545231565425e-40,4.1153193170444795e-40,4.105370097947773e-40,4.09543489183571e-40,4.0854996857236474e-40,4.075550466626941e-40,4.065615260514878e-40,4.055666041418172e-40,4.045730835306109e-40,4.035795629194046e-40,4.02584641009734e-40,4.015911203985277e-40,4.005975997873214e-40,3.996026778776508e-40,3.986091572664445e-40,3.976142353567739e-40,3.966207147455676e-40,3.956271941343613e-40,3.9463227222469066e-40,3.936387516134844e-40,3.926452310022781e-40,3.9165030909260745e-40,3.9065678848140115e-40,3.8966326787019486e-40,3.886683459605242e-40,3.8767482534931794e-40,3.866799034396473e-40,3.85686382828441e-40,3.846928622172347e-40,3.836979403075641e-40,3.827044196963578e-40,3.817108990851515e-40,3.807159771754809e-40,3.797224565642746e-40,3.787289359530683e-40,3.777340140433977e-40,3.767404934321914e-40,3.757455715225208e-40,3.747520509113145e-40,3.737585303001082e-40,3.727636083904376e-40,3.717700877792313e-40,3.70776567168025e-40,3.6978164525835435e-40,3.6878812464714806e-40,3.677932027374774e-40,3.6679968212627114e-40,3.6580616151506485e-40,3.6481123960539423e-40,3.6381771899418793e-40,3.6282419838298164e-40,3.61829276473311e-40,3.6083575586210472e-40,3.5984223525089843e-40,3.588473133412278e-40,3.578537927300215e-40,3.568588708203509e-40,3.558653502091446e-40,3.548718295979383e-40,3.5387690768826768e-40,3.528833870770614e-40,3.518898664658551e-40,3.5089494455618447e-40,3.4990142394497817e-40,3.4890790333377188e-40,3.4791298142410126e-40,3.4691946081289496e-40,3.4592453890322434e-40,3.4493101829201805e-40,3.4393749768081175e-40,3.4294257577114113e-40,3.4194905515993484e-40,3.4095553454872854e-40,3.3996061263905792e-40,3.3896709202785163e-40,3.37972170118181e-40,3.369786495069747e-40,3.359851288957684e-40,3.349902069860978e-40,3.339966863748915e-40,3.330031657636852e-40,3.320082438540146e-40,3.310147232428083e-40,3.30021202631602e-40,3.2902628072193137e-40,3.2803276011072508e-40,3.2703783820105446e-40,3.2604431758984816e-40,3.2505079697864187e-40,3.2405587506897125e-40,3.2306235445776495e-40,3.2206883384655866e-40,3.2107391193688804e-40,3.2008039132568174e-40,3.1908546941601112e-40,3.1809194880480483e-40,3.1709842819359853e-40,3.161035062839279e-40,3.151099856727216e-40,3.141164650615153e-40,3.131215431518447e-40,3.121280225406384e-40,3.111345019294321e-40,3.101395800197615e-40,3.091460594085552e-40,3.0815113749888457e-40,3.0715761688767828e-40,3.06164096276472e-40,3.0516917436680136e-40,3.0417565375559507e-40,3.0318213314438877e-40,3.0218721123471815e-40,3.0119369062351186e-40,3.0020017001230556e-40,2.9920524810263494e-40,2.9821172749142865e-40,2.9721680558175803e-40,2.9622328497055173e-40,2.9522976435934543e-40,2.942348424496748e-40,2.932413218384685e-40,2.9224780122726222e-40,2.912528793175916e-40,2.902593587063853e-40,2.892644367967147e-40,2.882709161855084e-40,2.872773955743021e-40,2.8628247366463148e-40,2.852889530534252e-40,2.842954324422189e-40,2.8330051053254827e-40,2.8230698992134197e-40,2.8131346931013568e-40,2.8031854740046506e-40,2.7932502678925876e-40,2.7833010487958814e-40,2.7733658426838185e-40,2.7634306365717555e-40,2.7534814174750493e-40,2.7435462113629864e-40,2.7336110052509234e-40,2.723661786154217e-40,2.7137265800421542e-40,2.7037913739300913e-40,2.693842154833385e-40,2.683906948721322e-40,2.673957729624616e-40,2.664022523512553e-40,2.65408731740049e-40,2.644138098303784e-40,2.634202892191721e-40,2.624267686079658e-40,2.6143184669829517e-40,2.6043832608708888e-40,2.5944340417741826e-40,2.5844988356621196e-40,2.5745636295500567e-40,2.5646144104533505e-40,2.5546792043412875e-40,2.5447439982292246e-40,2.5347947791325184e-40,2.5248595730204554e-40,2.5149243669083924e-40,2.5049751478116862e-40,2.4950399416996233e-40,2.485090722602917e-40,2.475155516490854e-40,2.465220310378791e-40,2.455271091282085e-40,2.445335885170022e-40,2.435400679057959e-40,2.425451459961253e-40,2.41551625384919e-40,2.405581047737127e-40,2.3956318286404208e-40,2.385696622528358e-40,2.3757474034316516e-40,2.3658121973195887e-40,2.3558769912075257e-40,2.3459277721108195e-40,2.3359925659987566e-40,2.3260573598866936e-40,2.3161081407899874e-40,2.3061729346779244e-40,2.2962237155812182e-40,2.2862885094691553e-40,2.2763533033570923e-40,2.266404084260386e-40,2.256468878148323e-40,2.2465336720362602e-40,2.236584452939554e-40,2.226649246827491e-40,2.216714040715428e-40,2.206764821618722e-40,2.196829615506659e-40,2.1868803964099528e-40,2.17694519029789e-40,2.167009984185827e-40,2.1570607650891207e-40,2.1471255589770577e-40,2.1371903528649948e-40,2.1272411337682886e-40,2.1173059276562256e-40,2.1073707215441626e-40,2.0974215024474564e-40,2.0874862963353935e-40,2.0775370772386873e-40,2.0676018711266243e-40,2.0576666650145614e-40,2.047717445917855e-40,2.0377822398057922e-40,2.0278470336937293e-40,2.017897814597023e-40,2.00796260848496e-40,1.998013389388254e-40,1.988078183276191e-40,1.978142977164128e-40,1.968193758067422e-40,1.958258551955359e-40,1.948323345843296e-40,1.9383741267465897e-40,1.9284389206345268e-40,1.918503714522464e-40,1.9085544954257576e-40,1.8986192893136946e-40,1.8886700702169884e-40,1.8787348641049255e-40,1.8687996579928625e-40,1.8588504388961563e-40,1.8489152327840934e-40,1.8389800266720304e-40,1.8290308075753242e-40,1.8190956014632613e-40,1.809146382366555e-40,1.7992111762544921e-40,1.7892759701424292e-40,1.779326751045723e-40,1.76939154493366e-40,1.759456338821597e-40,1.7495071197248909e-40,1.739571913612828e-40,1.729636707500765e-40,1.7196874884040588e-40,1.7097522822919958e-40,1.6998030631952896e-40,1.6898678570832267e-40,1.6799326509711637e-40,1.6699834318744575e-40,1.6600482257623945e-40,1.6501130196503316e-40,1.6401638005536254e-40,1.6302285944415624e-40,1.6202933883294995e-40,1.6103441692327933e-40,1.6004089631207303e-40,1.5904597440240241e-40,1.5805245379119612e-40,1.5705893317998982e-40,1.560640112703192e-40,1.550704906591129e-40,1.5407697004790661e-40,1.53082048138236e-40,1.520885275270297e-40,1.5109360561735908e-40,1.5010008500615278e-40,1.4910656439494649e-40,1.4811164248527587e-40,1.4711812187406957e-40,1.4612460126286327e-40,1.4512967935319265e-40,1.4413615874198636e-40,1.4314263813078006e-40,1.4214771622110944e-40,1.4115419560990315e-40,1.4015927370023253e-40,1.3916575308902623e-40,1.3817223247781994e-40,1.3717731056814932e-40,1.3618378995694302e-40,1.3519026934573673e-40,1.341953474360661e-40,1.3320182682485981e-40,1.3220830621365352e-40,1.312133843039829e-40,1.302198636927766e-40,1.2922494178310598e-40,1.2823142117189969e-40,1.272379005606934e-40,1.2624297865102277e-40,1.2524945803981647e-40,1.2425593742861018e-40,1.2326101551893956e-40,1.2226749490773326e-40,1.2127257299806264e-40,1.2027905238685635e-40,1.1928553177565005e-40,1.1829060986597943e-40,1.1729708925477314e-40,1.1630356864356684e-40,1.1530864673389622e-40,1.1431512612268993e-40,1.1332160551148363e-40,1.1232668360181301e-40,1.1133316299060672e-40,1.103382410809361e-40,1.093447204697298e-40,1.083511998585235e-40,1.0735627794885289e-40,1.063627573376466e-40,1.053692367264403e-40,1.0437431481676967e-40,1.0338079420556338e-40,1.0238727359435708e-40,1.0139235168468646e-40,1.0039883107348017e-40,9.940390916380955e-41,9.841038855260325e-41,9.741686794139696e-41,9.642194603172634e-41,9.542842542052004e-41,9.443490480931375e-41,9.343998289964313e-41,9.244646228843683e-41,9.145154037876621e-41,9.045801976755992e-41,8.946449915635362e-41,8.8469577246683e-41,8.747605663547671e-41,8.648253602427041e-41,8.548761411459979e-41,8.44940935033935e-41,8.35005728921872e-41,8.250565098251658e-41,8.151213037131028e-41,8.051720846163966e-41,7.952368785043337e-41,7.853016723922707e-41,7.753524532955645e-41,7.654172471835016e-41,7.554820410714386e-41,7.455328219747324e-41,7.355976158626695e-41,7.256483967659633e-41,7.157131906539003e-41,7.057779845418374e-41,6.958287654451312e-41,6.858935593330682e-41,6.759583532210053e-41,6.660091341242991e-41,6.560739280122361e-41,6.461387219001732e-41,6.36189502803467e-41,6.26254296691404e-41,6.163050775946978e-41,6.063698714826348e-41,5.964346653705719e-41,5.864854462738657e-41,5.765502401618027e-41,5.666150340497398e-41,5.566658149530336e-41,5.467306088409706e-41,5.367954027289077e-41,5.268461836322015e-41,5.169109775201385e-41,5.069617584234323e-41,4.970265523113694e-41,4.870913461993064e-41,4.771421271026002e-41,4.672069209905373e-41,4.572717148784743e-41,4.473224957817681e-41,4.3738728966970515e-41,4.2743807057299895e-41,4.17502864460936e-41,4.0756765834887305e-41,3.9761843925216684e-41,3.876832331401039e-41,3.7774802702804094e-41,3.6779880793133474e-41,3.578636018192718e-41,3.4792839570720883e-41,3.3797917661050263e-41,3.280439704984397e-41,3.180947514017335e-41,3.081595452896705e-41,2.9822433917760757e-41,2.8827512008090137e-41,2.783399139688384e-41,2.6840470785677546e-41,2.5845548876006926e-41,2.485202826480063e-41,2.3858507653594335e-41,2.2863585743923715e-41,2.187006513271742e-41,2.08751432230468e-41,1.9881622611840505e-41,1.888810200063421e-41,1.789318009096359e-41,1.6899659479757294e-41,1.5906138868550999e-41,1.4911216958880378e-41,1.3917696347674083e-41,1.2922774438003463e-41,1.1929253826797168e-41,1.0935733215590872e-41,9.940811305920252e-42,8.947290694713957e-42,7.953770083507662e-42,6.958848173837042e-42,5.965327562630746e-42,4.971806951424451e-42,3.976885041753831e-42,2.9833644305475355e-42,1.9884425208769154e-42,9.949219096706201e-43,1.401298464324817e-45],"x":["00000000000010101110001110011000","00000000000010101110000011010010","00000000000010101101111000001101","00000000000010101101101101001000","00000000000010101101100010000010","00000000000010101101010110111101","00000000000010101101001011111000","00000000000010101101000000110010","00000000000010101100110101101101","00000000000010101100101010101000","00000000000010101100011111100010","00000000000010101100010100011101","00000000000010101100001001010111","00000000000010101011111110010010","00000000000010101011110011001101","00000000000010101011101000000111","00000000000010101011011101000010","00000000000010101011010001111101","00000000000010101011000110110111","00000000000010101010111011110010","00000000000010101010110000101101","00000000000010101010100101100111","00000000000010101010011010100010","00000000000010101010001111011100","00000000000010101010000100010111","00000000000010101001111001010010","00000000000010101001101110001100","00000000000010101001100011000111","00000000000010101001011000000010","00000000000010101001001100111100","00000000000010101001000001110111","00000000000010101000110110110001","00000000000010101000101011101100","00000000000010101000100000100111","00000000000010101000010101100001","00000000000010101000001010011100","00000000000010100111111111010111","00000000000010100111110100010001","00000000000010100111101001001100","00000000000010100111011110000111","00000000000010100111010011000001","00000000000010100111000111111100","00000000000010100110111100110110","00000000000010100110110001110001","00000000000010100110100110101100","00000000000010100110011011100110","00000000000010100110010000100001","00000000000010100110000101011100","00000000000010100101111010010110","00000000000010100101101111010001","00000000000010100101100100001011","00000000000010100101011001000110","00000000000010100101001110000001","00000000000010100101000010111011","00000000000010100100110111110110","00000000000010100100101100110001","00000000000010100100100001101011","00000000000010100100010110100110","00000000000010100100001011100001","00000000000010100100000000011011","00000000000010100011110101010110","00000000000010100011101010010000","00000000000010100011011111001011","00000000000010100011010100000110","00000000000010100011001001000000","00000000000010100010111101111011","00000000000010100010110010110110","00000000000010100010100111110000","00000000000010100010011100101011","00000000000010100010010001100110","00000000000010100010000110100000","00000000000010100001111011011011","00000000000010100001110000010101","00000000000010100001100101010000","00000000000010100001011010001011","00000000000010100001001111000101","00000000000010100001000100000000","00000000000010100000111000111011","00000000000010100000101101110101","00000000000010100000100010110000","00000000000010100000010111101010","00000000000010100000001100100101","00000000000010100000000001100000","00000000000010011111110110011010","00000000000010011111101011010101","00000000000010011111100000010000","00000000000010011111010101001010","00000000000010011111001010000101","00000000000010011110111111000000","00000000000010011110110011111010","00000000000010011110101000110101","00000000000010011110011101101111","00000000000010011110010010101010","00000000000010011110000111100101","00000000000010011101111100011111","00000000000010011101110001011010","00000000000010011101100110010101","00000000000010011101011011001111","00000000000010011101010000001010","00000000000010011101000101000101","00000000000010011100111001111111","00000000000010011100101110111010","00000000000010011100100011110100","00000000000010011100011000101111","00000000000010011100001101101010","00000000000010011100000010100100","00000000000010011011110111011111","00000000000010011011101100011010","00000000000010011011100001010100","00000000000010011011010110001111","00000000000010011011001011001001","00000000000010011011000000000100","00000000000010011010110100111111","00000000000010011010101001111001","00000000000010011010011110110100","00000000000010011010010011101111","00000000000010011010001000101001","00000000000010011001111101100100","00000000000010011001110010011111","00000000000010011001100111011001","00000000000010011001011100010100","00000000000010011001010001001110","00000000000010011001000110001001","00000000000010011000111011000100","00000000000010011000101111111110","00000000000010011000100100111001","00000000000010011000011001110100","00000000000010011000001110101110","00000000000010011000000011101001","00000000000010010111111000100100","00000000000010010111101101011110","00000000000010010111100010011001","00000000000010010111010111010011","00000000000010010111001100001110","00000000000010010111000001001001","00000000000010010110110110000011","00000000000010010110101010111110","00000000000010010110011111111001","00000000000010010110010100110011","00000000000010010110001001101110","00000000000010010101111110101000","00000000000010010101110011100011","00000000000010010101101000011110","00000000000010010101011101011000","00000000000010010101010010010011","00000000000010010101000111001110","00000000000010010100111100001000","00000000000010010100110001000011","00000000000010010100100101111110","00000000000010010100011010111000","00000000000010010100001111110011","00000000000010010100000100101101","00000000000010010011111001101000","00000000000010010011101110100011","00000000000010010011100011011101","00000000000010010011011000011000","00000000000010010011001101010011","00000000000010010011000010001101","00000000000010010010110111001000","00000000000010010010101100000011","00000000000010010010100000111101","00000000000010010010010101111000","00000000000010010010001010110010","00000000000010010001111111101101","00000000000010010001110100101000","00000000000010010001101001100010","00000000000010010001011110011101","00000000000010010001010011011000","00000000000010010001001000010010","00000000000010010000111101001101","00000000000010010000110010000111","00000000000010010000100111000010","00000000000010010000011011111101","00000000000010010000010000110111","00000000000010010000000101110010","00000000000010001111111010101101","00000000000010001111101111100111","00000000000010001111100100100010","00000000000010001111011001011101","00000000000010001111001110010111","00000000000010001111000011010010","00000000000010001110111000001100","00000000000010001110101101000111","00000000000010001110100010000010","00000000000010001110010110111100","00000000000010001110001011110111","00000000000010001110000000110010","00000000000010001101110101101100","00000000000010001101101010100111","00000000000010001101011111100001","00000000000010001101010100011100","00000000000010001101001001010111","00000000000010001100111110010001","00000000000010001100110011001100","00000000000010001100101000000111","00000000000010001100011101000001","00000000000010001100010001111100","00000000000010001100000110110111","00000000000010001011111011110001","00000000000010001011110000101100","00000000000010001011100101100110","00000000000010001011011010100001","00000000000010001011001111011100","00000000000010001011000100010110","00000000000010001010111001010001","00000000000010001010101110001100","00000000000010001010100011000110","00000000000010001010011000000001","00000000000010001010001100111100","00000000000010001010000001110110","00000000000010001001110110110001","00000000000010001001101011101011","00000000000010001001100000100110","00000000000010001001010101100001","00000000000010001001001010011011","00000000000010001000111111010110","00000000000010001000110100010001","00000000000010001000101001001011","00000000000010001000011110000110","00000000000010001000010011000000","00000000000010001000000111111011","00000000000010000111111100110110","00000000000010000111110001110000","00000000000010000111100110101011","00000000000010000111011011100110","00000000000010000111010000100000","00000000000010000111000101011011","00000000000010000110111010010110","00000000000010000110101111010000","00000000000010000110100100001011","00000000000010000110011001000101","00000000000010000110001110000000","00000000000010000110000010111011","00000000000010000101110111110101","00000000000010000101101100110000","00000000000010000101100001101011","00000000000010000101010110100101","00000000000010000101001011100000","00000000000010000101000000011011","00000000000010000100110101010101","00000000000010000100101010010000","00000000000010000100011111001010","00000000000010000100010100000101","00000000000010000100001001000000","00000000000010000011111101111010","00000000000010000011110010110101","00000000000010000011100111110000","00000000000010000011011100101010","00000000000010000011010001100101","00000000000010000011000110011111","00000000000010000010111011011010","00000000000010000010110000010101","00000000000010000010100101001111","00000000000010000010011010001010","00000000000010000010001111000101","00000000000010000010000011111111","00000000000010000001111000111010","00000000000010000001101101110101","00000000000010000001100010101111","00000000000010000001010111101010","00000000000010000001001100100100","00000000000010000001000001011111","00000000000010000000110110011010","00000000000010000000101011010100","00000000000010000000100000001111","00000000000010000000010101001010","00000000000010000000001010000100","00000000000001111111111110111111","00000000000001111111110011111010","00000000000001111111101000110100","00000000000001111111011101101111","00000000000001111111010010101001","00000000000001111111000111100100","00000000000001111110111100011111","00000000000001111110110001011001","00000000000001111110100110010100","00000000000001111110011011001111","00000000000001111110010000001001","00000000000001111110000101000100","00000000000001111101111001111110","00000000000001111101101110111001","00000000000001111101100011110100","00000000000001111101011000101110","00000000000001111101001101101001","00000000000001111101000010100100","00000000000001111100110111011110","00000000000001111100101100011001","00000000000001111100100001010100","00000000000001111100010110001110","00000000000001111100001011001001","00000000000001111100000000000011","00000000000001111011110100111110","00000000000001111011101001111001","00000000000001111011011110110011","00000000000001111011010011101110","00000000000001111011001000101001","00000000000001111010111101100011","00000000000001111010110010011110","00000000000001111010100111011001","00000000000001111010011100010011","00000000000001111010010001001110","00000000000001111010000110001000","00000000000001111001111011000011","00000000000001111001101111111110","00000000000001111001100100111000","00000000000001111001011001110011","00000000000001111001001110101110","00000000000001111001000011101000","00000000000001111000111000100011","00000000000001111000101101011101","00000000000001111000100010011000","00000000000001111000010111010011","00000000000001111000001100001101","00000000000001111000000001001000","00000000000001110111110110000011","00000000000001110111101010111101","00000000000001110111011111111000","00000000000001110111010100110011","00000000000001110111001001101101","00000000000001110110111110101000","00000000000001110110110011100010","00000000000001110110101000011101","00000000000001110110011101011000","00000000000001110110010010010010","00000000000001110110000111001101","00000000000001110101111100001000","00000000000001110101110001000010","00000000000001110101100101111101","00000000000001110101011010110111","00000000000001110101001111110010","00000000000001110101000100101101","00000000000001110100111001100111","00000000000001110100101110100010","00000000000001110100100011011101","00000000000001110100011000010111","00000000000001110100001101010010","00000000000001110100000010001101","00000000000001110011110111000111","00000000000001110011101100000010","00000000000001110011100000111100","00000000000001110011010101110111","00000000000001110011001010110010","00000000000001110010111111101100","00000000000001110010110100100111","00000000000001110010101001100010","00000000000001110010011110011100","00000000000001110010010011010111","00000000000001110010001000010010","00000000000001110001111101001100","00000000000001110001110010000111","00000000000001110001100111000001","00000000000001110001011011111100","00000000000001110001010000110111","00000000000001110001000101110001","00000000000001110000111010101100","00000000000001110000101111100111","00000000000001110000100100100001","00000000000001110000011001011100","00000000000001110000001110010110","00000000000001110000000011010001","00000000000001101111111000001100","00000000000001101111101101000110","00000000000001101111100010000001","00000000000001101111010110111100","00000000000001101111001011110110","00000000000001101111000000110001","00000000000001101110110101101100","00000000000001101110101010100110","00000000000001101110011111100001","00000000000001101110010100011011","00000000000001101110001001010110","00000000000001101101111110010001","00000000000001101101110011001011","00000000000001101101101000000110","00000000000001101101011101000001","00000000000001101101010001111011","00000000000001101101000110110110","00000000000001101100111011110001","00000000000001101100110000101011","00000000000001101100100101100110","00000000000001101100011010100000","00000000000001101100001111011011","00000000000001101100000100010110","00000000000001101011111001010000","00000000000001101011101110001011","00000000000001101011100011000110","00000000000001101011011000000000","00000000000001101011001100111011","00000000000001101011000001110101","00000000000001101010110110110000","00000000000001101010101011101011","00000000000001101010100000100101","00000000000001101010010101100000","00000000000001101010001010011011","00000000000001101001111111010101","00000000000001101001110100010000","00000000000001101001101001001011","00000000000001101001011110000101","00000000000001101001010011000000","00000000000001101001000111111010","00000000000001101000111100110101","00000000000001101000110001110000","00000000000001101000100110101010","00000000000001101000011011100101","00000000000001101000010000100000","00000000000001101000000101011010","00000000000001100111111010010101","00000000000001100111101111010000","00000000000001100111100100001010","00000000000001100111011001000101","00000000000001100111001101111111","00000000000001100111000010111010","00000000000001100110110111110101","00000000000001100110101100101111","00000000000001100110100001101010","00000000000001100110010110100101","00000000000001100110001011011111","00000000000001100110000000011010","00000000000001100101110101010100","00000000000001100101101010001111","00000000000001100101011111001010","00000000000001100101010100000100","00000000000001100101001000111111","00000000000001100100111101111010","00000000000001100100110010110100","00000000000001100100100111101111","00000000000001100100011100101010","00000000000001100100010001100100","00000000000001100100000110011111","00000000000001100011111011011001","00000000000001100011110000010100","00000000000001100011100101001111","00000000000001100011011010001001","00000000000001100011001111000100","00000000000001100011000011111111","00000000000001100010111000111001","00000000000001100010101101110100","00000000000001100010100010101110","00000000000001100010010111101001","00000000000001100010001100100100","00000000000001100010000001011110","00000000000001100001110110011001","00000000000001100001101011010100","00000000000001100001100000001110","00000000000001100001010101001001","00000000000001100001001010000100","00000000000001100000111110111110","00000000000001100000110011111001","00000000000001100000101000110011","00000000000001100000011101101110","00000000000001100000010010101001","00000000000001100000000111100011","00000000000001011111111100011110","00000000000001011111110001011001","00000000000001011111100110010011","00000000000001011111011011001110","00000000000001011111010000001001","00000000000001011111000101000011","00000000000001011110111001111110","00000000000001011110101110111000","00000000000001011110100011110011","00000000000001011110011000101110","00000000000001011110001101101000","00000000000001011110000010100011","00000000000001011101110111011110","00000000000001011101101100011000","00000000000001011101100001010011","00000000000001011101010110001101","00000000000001011101001011001000","00000000000001011101000000000011","00000000000001011100110100111101","00000000000001011100101001111000","00000000000001011100011110110011","00000000000001011100010011101101","00000000000001011100001000101000","00000000000001011011111101100011","00000000000001011011110010011101","00000000000001011011100111011000","00000000000001011011011100010010","00000000000001011011010001001101","00000000000001011011000110001000","00000000000001011010111011000010","00000000000001011010101111111101","00000000000001011010100100111000","00000000000001011010011001110010","00000000000001011010001110101101","00000000000001011010000011101000","00000000000001011001111000100010","00000000000001011001101101011101","00000000000001011001100010010111","00000000000001011001010111010010","00000000000001011001001100001101","00000000000001011001000001000111","00000000000001011000110110000010","00000000000001011000101010111101","00000000000001011000011111110111","00000000000001011000010100110010","00000000000001011000001001101100","00000000000001010111111110100111","00000000000001010111110011100010","00000000000001010111101000011100","00000000000001010111011101010111","00000000000001010111010010010010","00000000000001010111000111001100","00000000000001010110111100000111","00000000000001010110110001000010","00000000000001010110100101111100","00000000000001010110011010110111","00000000000001010110001111110001","00000000000001010110000100101100","00000000000001010101111001100111","00000000000001010101101110100001","00000000000001010101100011011100","00000000000001010101011000010111","00000000000001010101001101010001","00000000000001010101000010001100","00000000000001010100110111000111","00000000000001010100101100000001","00000000000001010100100000111100","00000000000001010100010101110110","00000000000001010100001010110001","00000000000001010011111111101100","00000000000001010011110100100110","00000000000001010011101001100001","00000000000001010011011110011100","00000000000001010011010011010110","00000000000001010011001000010001","00000000000001010010111101001011","00000000000001010010110010000110","00000000000001010010100111000001","00000000000001010010011011111011","00000000000001010010010000110110","00000000000001010010000101110001","00000000000001010001111010101011","00000000000001010001101111100110","00000000000001010001100100100001","00000000000001010001011001011011","00000000000001010001001110010110","00000000000001010001000011010000","00000000000001010000111000001011","00000000000001010000101101000110","00000000000001010000100010000000","00000000000001010000010110111011","00000000000001010000001011110110","00000000000001010000000000110000","00000000000001001111110101101011","00000000000001001111101010100110","00000000000001001111011111100000","00000000000001001111010100011011","00000000000001001111001001010101","00000000000001001110111110010000","00000000000001001110110011001011","00000000000001001110101000000101","00000000000001001110011101000000","00000000000001001110010001111011","00000000000001001110000110110101","00000000000001001101111011110000","00000000000001001101110000101010","00000000000001001101100101100101","00000000000001001101011010100000","00000000000001001101001111011010","00000000000001001101000100010101","00000000000001001100111001010000","00000000000001001100101110001010","00000000000001001100100011000101","00000000000001001100011000000000","00000000000001001100001100111010","00000000000001001100000001110101","00000000000001001011110110101111","00000000000001001011101011101010","00000000000001001011100000100101","00000000000001001011010101011111","00000000000001001011001010011010","00000000000001001010111111010101","00000000000001001010110100001111","00000000000001001010101001001010","00000000000001001010011110000100","00000000000001001010010010111111","00000000000001001010000111111010","00000000000001001001111100110100","00000000000001001001110001101111","00000000000001001001100110101010","00000000000001001001011011100100","00000000000001001001010000011111","00000000000001001001000101011010","00000000000001001000111010010100","00000000000001001000101111001111","00000000000001001000100100001001","00000000000001001000011001000100","00000000000001001000001101111111","00000000000001001000000010111001","00000000000001000111110111110100","00000000000001000111101100101111","00000000000001000111100001101001","00000000000001000111010110100100","00000000000001000111001011011111","00000000000001000111000000011001","00000000000001000110110101010100","00000000000001000110101010001110","00000000000001000110011111001001","00000000000001000110010100000100","00000000000001000110001000111110","00000000000001000101111101111001","00000000000001000101110010110100","00000000000001000101100111101110","00000000000001000101011100101001","00000000000001000101010001100011","00000000000001000101000110011110","00000000000001000100111011011001","00000000000001000100110000010011","00000000000001000100100101001110","00000000000001000100011010001001","00000000000001000100001111000011","00000000000001000100000011111110","00000000000001000011111000111001","00000000000001000011101101110011","00000000000001000011100010101110","00000000000001000011010111101000","00000000000001000011001100100011","00000000000001000011000001011110","00000000000001000010110110011000","00000000000001000010101011010011","00000000000001000010100000001110","00000000000001000010010101001000","00000000000001000010001010000011","00000000000001000001111110111110","00000000000001000001110011111000","00000000000001000001101000110011","00000000000001000001011101101101","00000000000001000001010010101000","00000000000001000001000111100011","00000000000001000000111100011101","00000000000001000000110001011000","00000000000001000000100110010011","00000000000001000000011011001101","00000000000001000000010000001000","00000000000001000000000101000010","00000000000000111111111001111101","00000000000000111111101110111000","00000000000000111111100011110010","00000000000000111111011000101101","00000000000000111111001101101000","00000000000000111111000010100010","00000000000000111110110111011101","00000000000000111110101100011000","00000000000000111110100001010010","00000000000000111110010110001101","00000000000000111110001011000111","00000000000000111110000000000010","00000000000000111101110100111101","00000000000000111101101001110111","00000000000000111101011110110010","00000000000000111101010011101101","00000000000000111101001000100111","00000000000000111100111101100010","00000000000000111100110010011101","00000000000000111100100111010111","00000000000000111100011100010010","00000000000000111100010001001100","00000000000000111100000110000111","00000000000000111011111011000010","00000000000000111011101111111100","00000000000000111011100100110111","00000000000000111011011001110010","00000000000000111011001110101100","00000000000000111011000011100111","00000000000000111010111000100001","00000000000000111010101101011100","00000000000000111010100010010111","00000000000000111010010111010001","00000000000000111010001100001100","00000000000000111010000001000111","00000000000000111001110110000001","00000000000000111001101010111100","00000000000000111001011111110111","00000000000000111001010100110001","00000000000000111001001001101100","00000000000000111000111110100110","00000000000000111000110011100001","00000000000000111000101000011100","00000000000000111000011101010110","00000000000000111000010010010001","00000000000000111000000111001100","00000000000000110111111100000110","00000000000000110111110001000001","00000000000000110111100101111011","00000000000000110111011010110110","00000000000000110111001111110001","00000000000000110111000100101011","00000000000000110110111001100110","00000000000000110110101110100001","00000000000000110110100011011011","00000000000000110110011000010110","00000000000000110110001101010001","00000000000000110110000010001011","00000000000000110101110111000110","00000000000000110101101100000000","00000000000000110101100000111011","00000000000000110101010101110110","00000000000000110101001010110000","00000000000000110100111111101011","00000000000000110100110100100110","00000000000000110100101001100000","00000000000000110100011110011011","00000000000000110100010011010110","00000000000000110100001000010000","00000000000000110011111101001011","00000000000000110011110010000101","00000000000000110011100111000000","00000000000000110011011011111011","00000000000000110011010000110101","00000000000000110011000101110000","00000000000000110010111010101011","00000000000000110010101111100101","00000000000000110010100100100000","00000000000000110010011001011010","00000000000000110010001110010101","00000000000000110010000011010000","00000000000000110001111000001010","00000000000000110001101101000101","00000000000000110001100010000000","00000000000000110001010110111010","00000000000000110001001011110101","00000000000000110001000000110000","00000000000000110000110101101010","00000000000000110000101010100101","00000000000000110000011111011111","00000000000000110000010100011010","00000000000000110000001001010101","00000000000000101111111110001111","00000000000000101111110011001010","00000000000000101111101000000101","00000000000000101111011100111111","00000000000000101111010001111010","00000000000000101111000110110101","00000000000000101110111011101111","00000000000000101110110000101010","00000000000000101110100101100100","00000000000000101110011010011111","00000000000000101110001111011010","00000000000000101110000100010100","00000000000000101101111001001111","00000000000000101101101110001010","00000000000000101101100011000100","00000000000000101101010111111111","00000000000000101101001100111001","00000000000000101101000001110100","00000000000000101100110110101111","00000000000000101100101011101001","00000000000000101100100000100100","00000000000000101100010101011111","00000000000000101100001010011001","00000000000000101011111111010100","00000000000000101011110100001111","00000000000000101011101001001001","00000000000000101011011110000100","00000000000000101011010010111110","00000000000000101011000111111001","00000000000000101010111100110100","00000000000000101010110001101110","00000000000000101010100110101001","00000000000000101010011011100100","00000000000000101010010000011110","00000000000000101010000101011001","00000000000000101001111010010100","00000000000000101001101111001110","00000000000000101001100100001001","00000000000000101001011001000011","00000000000000101001001101111110","00000000000000101001000010111001","00000000000000101000110111110011","00000000000000101000101100101110","00000000000000101000100001101001","00000000000000101000010110100011","00000000000000101000001011011110","00000000000000101000000000011000","00000000000000100111110101010011","00000000000000100111101010001110","00000000000000100111011111001000","00000000000000100111010100000011","00000000000000100111001000111110","00000000000000100110111101111000","00000000000000100110110010110011","00000000000000100110100111101110","00000000000000100110011100101000","00000000000000100110010001100011","00000000000000100110000110011101","00000000000000100101111011011000","00000000000000100101110000010011","00000000000000100101100101001101","00000000000000100101011010001000","00000000000000100101001111000011","00000000000000100101000011111101","00000000000000100100111000111000","00000000000000100100101101110011","00000000000000100100100010101101","00000000000000100100010111101000","00000000000000100100001100100010","00000000000000100100000001011101","00000000000000100011110110011000","00000000000000100011101011010010","00000000000000100011100000001101","00000000000000100011010101001000","00000000000000100011001010000010","00000000000000100010111110111101","00000000000000100010110011110111","00000000000000100010101000110010","00000000000000100010011101101101","00000000000000100010010010100111","00000000000000100010000111100010","00000000000000100001111100011101","00000000000000100001110001010111","00000000000000100001100110010010","00000000000000100001011011001101","00000000000000100001010000000111","00000000000000100001000101000010","00000000000000100000111001111100","00000000000000100000101110110111","00000000000000100000100011110010","00000000000000100000011000101100","00000000000000100000001101100111","00000000000000100000000010100010","00000000000000011111110111011100","00000000000000011111101100010111","00000000000000011111100001010001","00000000000000011111010110001100","00000000000000011111001011000111","00000000000000011111000000000001","00000000000000011110110100111100","00000000000000011110101001110111","00000000000000011110011110110001","00000000000000011110010011101100","00000000000000011110001000100111","00000000000000011101111101100001","00000000000000011101110010011100","00000000000000011101100111010110","00000000000000011101011100010001","00000000000000011101010001001100","00000000000000011101000110000110","00000000000000011100111011000001","00000000000000011100101111111100","00000000000000011100100100110110","00000000000000011100011001110001","00000000000000011100001110101100","00000000000000011100000011100110","00000000000000011011111000100001","00000000000000011011101101011011","00000000000000011011100010010110","00000000000000011011010111010001","00000000000000011011001100001011","00000000000000011011000001000110","00000000000000011010110110000001","00000000000000011010101010111011","00000000000000011010011111110110","00000000000000011010010100110000","00000000000000011010001001101011","00000000000000011001111110100110","00000000000000011001110011100000","00000000000000011001101000011011","00000000000000011001011101010110","00000000000000011001010010010000","00000000000000011001000111001011","00000000000000011000111100000110","00000000000000011000110001000000","00000000000000011000100101111011","00000000000000011000011010110101","00000000000000011000001111110000","00000000000000011000000100101011","00000000000000010111111001100101","00000000000000010111101110100000","00000000000000010111100011011011","00000000000000010111011000010101","00000000000000010111001101010000","00000000000000010111000010001011","00000000000000010110110111000101","00000000000000010110101100000000","00000000000000010110100000111010","00000000000000010110010101110101","00000000000000010110001010110000","00000000000000010101111111101010","00000000000000010101110100100101","00000000000000010101101001100000","00000000000000010101011110011010","00000000000000010101010011010101","00000000000000010101001000001111","00000000000000010100111101001010","00000000000000010100110010000101","00000000000000010100100110111111","00000000000000010100011011111010","00000000000000010100010000110101","00000000000000010100000101101111","00000000000000010011111010101010","00000000000000010011101111100101","00000000000000010011100100011111","00000000000000010011011001011010","00000000000000010011001110010100","00000000000000010011000011001111","00000000000000010010111000001010","00000000000000010010101101000100","00000000000000010010100001111111","00000000000000010010010110111010","00000000000000010010001011110100","00000000000000010010000000101111","00000000000000010001110101101010","00000000000000010001101010100100","00000000000000010001011111011111","00000000000000010001010100011001","00000000000000010001001001010100","00000000000000010000111110001111","00000000000000010000110011001001","00000000000000010000101000000100","00000000000000010000011100111111","00000000000000010000010001111001","00000000000000010000000110110100","00000000000000001111111011101110","00000000000000001111110000101001","00000000000000001111100101100100","00000000000000001111011010011110","00000000000000001111001111011001","00000000000000001111000100010100","00000000000000001110111001001110","00000000000000001110101110001001","00000000000000001110100011000100","00000000000000001110010111111110","00000000000000001110001100111001","00000000000000001110000001110011","00000000000000001101110110101110","00000000000000001101101011101001","00000000000000001101100000100011","00000000000000001101010101011110","00000000000000001101001010011001","00000000000000001100111111010011","00000000000000001100110100001110","00000000000000001100101001001000","00000000000000001100011110000011","00000000000000001100010010111110","00000000000000001100000111111000","00000000000000001011111100110011","00000000000000001011110001101110","00000000000000001011100110101000","00000000000000001011011011100011","00000000000000001011010000011110","00000000000000001011000101011000","00000000000000001010111010010011","00000000000000001010101111001101","00000000000000001010100100001000","00000000000000001010011001000011","00000000000000001010001101111101","00000000000000001010000010111000","00000000000000001001110111110011","00000000000000001001101100101101","00000000000000001001100001101000","00000000000000001001010110100011","00000000000000001001001011011101","00000000000000001001000000011000","00000000000000001000110101010010","00000000000000001000101010001101","00000000000000001000011111001000","00000000000000001000010100000010","00000000000000001000001000111101","00000000000000000111111101111000","00000000000000000111110010110010","00000000000000000111100111101101","00000000000000000111011100100111","00000000000000000111010001100010","00000000000000000111000110011101","00000000000000000110111011010111","00000000000000000110110000010010","00000000000000000110100101001101","00000000000000000110011010000111","00000000000000000110001111000010","00000000000000000110000011111101","00000000000000000101111000110111","00000000000000000101101101110010","00000000000000000101100010101100","00000000000000000101010111100111","00000000000000000101001100100010","00000000000000000101000001011100","00000000000000000100110110010111","00000000000000000100101011010010","00000000000000000100100000001100","00000000000000000100010101000111","00000000000000000100001010000010","00000000000000000011111110111100","00000000000000000011110011110111","00000000000000000011101000110001","00000000000000000011011101101100","00000000000000000011010010100111","00000000000000000011000111100001","00000000000000000010111100011100","00000000000000000010110001010111","00000000000000000010100110010001","00000000000000000010011011001100","00000000000000000010010000000110","00000000000000000010000101000001","00000000000000000001111001111100","00000000000000000001101110110110","00000000000000000001100011110001","00000000000000000001011000101100","00000000000000000001001101100110","00000000000000000001000010100001","00000000000000000000110111011100","00000000000000000000101100010110","00000000000000000000100001010001","00000000000000000000010110001011","00000000000000000000001011000110","00000000000000000000000000000001"]}
},{}],141:[function(require,module,exports){
module.exports={"expected":[9.999999616903162e35,1.098409579261934e36,1.1968191176053893e36,1.2952286559488446e36,1.3936381150641374e36,1.492047732635755e36,1.590457191751048e36,1.6888668093226657e36,1.7872762684379585e36,1.8856858860095762e36,1.984095503581194e36,2.0825049626964868e36,2.1809145802681046e36,2.2793240393833974e36,2.377733656955015e36,2.476143116070308e36,2.5745527336419257e36,2.6729623512135435e36,2.771371651872511e36,2.869781269444129e36,2.968190887015747e36,3.0666005045873646e36,3.1650098052463323e36,3.26341942281795e36,3.361829040389568e36,3.4602386579611857e36,3.5586479586201534e36,3.657057576191771e36,3.755467193763389e36,3.853876811335007e36,3.9522864289066246e36,4.0506957295655923e36,4.14910534713721e36,4.247514964708828e36,4.3459245822804457e36,4.4443338829394134e36,4.542743500511031e36,4.641153118082649e36,4.739562735654267e36,4.8379720363132345e36,4.9363816538848523e36,5.03479127145647e36,5.133200889028088e36,5.2316101896870556e36,5.330020124171323e36,5.428429107917641e36,5.526838725489259e36,5.625248343060877e36,5.723657960632495e36,5.822067578204112e36,5.92047719577573e36,6.018886813347348e36,6.117296430918966e36,6.215706048490584e36,6.314115032236901e36,6.412524649808519e36,6.510934267380137e36,6.609343884951755e36,6.707753502523372e36,6.80616312009499e36,6.904572737666608e36,7.002982355238226e36,7.101391338984543e36,7.199800956556161e36,7.298210574127779e36,7.396620191699397e36,7.495029809271015e36,7.593439426842632e36,7.69184904441425e36,7.790258661985868e36,7.888668279557486e36,7.987077263303803e36,8.085486880875421e36,8.183896498447039e36,8.282306116018657e36,8.380715733590275e36,8.479125351161892e36,8.57753496873351e36,8.675944586305128e36,8.774353570051446e36,8.872763187623063e36,8.971172805194681e36,9.069582422766299e36,9.167992040337917e36,9.266401657909535e36,9.364811275481152e36,9.46322089305277e36,9.561630510624388e36,9.660039494370706e36,9.758449111942323e36,9.856858729513941e36,9.955268347085559e36,1.0053677964657177e37,1.0152087582228795e37,1.0250497199800412e37,1.034890681737203e37,1.0447315801118348e37,1.0545725418689966e37,1.0644135036261583e37,1.0742545287658501e37,1.084095427140482e37,1.0939363255151137e37,1.1037773506548055e37,1.1136182490294372e37,1.123459274169129e37,1.1333001725437608e37,1.1431411976834526e37,1.1529820960580843e37,1.1628231211977761e37,1.172664019572408e37,1.1825049179470397e37,1.1923459430867315e37,1.2021868414613632e37,1.212027866601055e37,1.2218687649756868e37,1.2317097901153786e37,1.2415506884900103e37,1.251391586864642e37,1.261232612004334e37,1.2710735103789657e37,1.2809145355186575e37,1.2907554338932892e37,1.300596459032981e37,1.3104373574076128e37,1.3202783825473046e37,1.3301192809219363e37,1.339960179296568e37,1.34980120443626e37,1.3596421028108917e37,1.3694831279505835e37,1.3793240263252152e37,1.389165051464907e37,1.3990059498395388e37,1.4088469749792306e37,1.4186878733538623e37,1.428528771728494e37,1.438369796868186e37,1.4482106952428177e37,1.4580517203825095e37,1.4678926187571412e37,1.477733643896833e37,1.4875745422714648e37,1.4974155674111566e37,1.5072564657857883e37,1.51709736416042e37,1.526938389300112e37,1.5367792876747437e37,1.5466203128144355e37,1.5564612111890672e37,1.566302236328759e37,1.5761431347033908e37,1.5859840330780226e37,1.5958250582177143e37,1.605665956592346e37,1.615506981732038e37,1.6253478801066697e37,1.6351889052463615e37,1.6450298036209932e37,1.654870828760685e37,1.6647117271353168e37,1.6745526255099486e37,1.6843936506496403e37,1.694234549024272e37,1.704075574163964e37,1.7139164725385957e37,1.7237574976782875e37,1.7335983960529192e37,1.743439421192611e37,1.7532803195672428e37,1.7631212179418746e37,1.7729622430815663e37,1.782803141456198e37,1.79264416659589e37,1.8024850649705217e37,1.8123260901102135e37,1.8221669884848452e37,1.832008013624537e37,1.8418489119991688e37,1.8516898103738006e37,1.8615308355134923e37,1.871371733888124e37,1.881212759027816e37,1.8910536574024477e37,1.9008946825421395e37,1.9107355809167712e37,1.920576479291403e37,1.9304175044310948e37,1.9402584028057266e37,1.9500994279454183e37,1.95994032632005e37,1.969781351459742e37,1.9796222498343737e37,1.9894632749740655e37,1.9993041733486972e37,2.009145071723329e37,2.0189860968630208e37,2.0288269952376526e37,2.0386680203773443e37,2.048508918751976e37,2.058349943891668e37,2.0681908422662997e37,2.0780318674059915e37,2.0878727657806232e37,2.097713664155255e37,2.1075546892949468e37,2.1173955876695786e37,2.1272366128092703e37,2.137077637948962e37,2.146918409558534e37,2.1567594346982257e37,2.1666004598379175e37,2.176441231447489e37,2.186282256587181e37,2.196123281726873e37,2.2059643068665646e37,2.2158050784761363e37,2.225646103615828e37,2.23548712875552e37,2.2453281538952117e37,2.2551689255047834e37,2.265009950644475e37,2.274850975784167e37,2.2846917473937388e37,2.2945327725334306e37,2.3043737976731223e37,2.314214822812814e37,2.324055594422386e37,2.3338966195620777e37,2.3437376447017695e37,2.353578416311341e37,2.363419441451033e37,2.373260466590725e37,2.3831014917304166e37,2.3929422633399883e37,2.40278328847968e37,2.412624313619372e37,2.4224650852289436e37,2.4323061103686354e37,2.442147135508327e37,2.451988160648019e37,2.4618289322575908e37,2.4716699573972826e37,2.4815109825369743e37,2.491352007676666e37,2.501192779286238e37,2.5110338044259297e37,2.5208748295656215e37,2.530715601175193e37,2.540556626314885e37,2.550397651454577e37,2.5602386765942686e37,2.5700794482038403e37,2.579920473343532e37,2.589761498483224e37,2.5996022700927956e37,2.6094432952324874e37,2.619284320372179e37,2.629125345511871e37,2.638966117121443e37,2.6488071422611346e37,2.6586481674008263e37,2.668488939010398e37,2.67832996415009e37,2.6881709892897817e37,2.6980120144294735e37,2.707852786039045e37,2.717693811178737e37,2.727534836318429e37,2.7373758614581206e37,2.7472166330676923e37,2.757057658207384e37,2.766898683347076e37,2.7767394549566476e37,2.7865804800963394e37,2.796421505236031e37,2.806262530375723e37,2.816103301985295e37,2.8259443271249866e37,2.8357853522646783e37,2.84562612387425e37,2.855467149013942e37,2.8653081741536337e37,2.8751491992933255e37,2.884989970902897e37,2.894830996042589e37,2.904672021182281e37,2.9145130463219726e37,2.9243538179315443e37,2.934194843071236e37,2.944035868210928e37,2.9538766398204996e37,2.9637176649601914e37,2.973558690099883e37,2.983399715239575e37,2.993240486849147e37,3.0030815119888386e37,3.0129225371285303e37,3.022763308738102e37,3.032604333877794e37,3.0424453590174857e37,3.0522863841571775e37,3.062127155766749e37,3.071968180906441e37,3.081809206046133e37,3.0916499776557045e37,3.1014910027953963e37,3.111332027935088e37,3.12117305307478e37,3.1310138246843516e37,3.1408548498240434e37,3.150695874963735e37,3.160536900103427e37,3.170377671712999e37,3.1802186968526906e37,3.1900597219923823e37,3.199900493601954e37,3.209741518741646e37,3.2195825438813377e37,3.2294235690210295e37,3.239264340630601e37,3.249105365770293e37,3.258946390909985e37,3.2687871625195565e37,3.2786281876592483e37,3.28846921279894e37,3.298310237938632e37,3.3081510095482037e37,3.3179920346878954e37,3.327833059827587e37,3.337673831437159e37,3.347514856576851e37,3.3573558817165426e37,3.3671969068562343e37,3.377037678465806e37,3.386878703605498e37,3.3967197287451897e37,3.4065607538848815e37,3.416401525494453e37,3.426242550634145e37,3.436083575773837e37,3.4459243473834085e37,3.4557653725231003e37,3.465606397662792e37,3.475447422802484e37,3.4852881944120557e37,3.4951292195517474e37,3.504970244691439e37,3.514811016301011e37,3.524652041440703e37,3.5344930665803946e37,3.5443340917200863e37,3.554174863329658e37,3.56401588846935e37,3.5738569136090417e37,3.5836979387487335e37,3.593538710358305e37,3.603379735497997e37,3.613220760637689e37,3.6230615322472605e37,3.6329025573869523e37,3.642743582526644e37,3.652584607666336e37,3.6624253792759077e37,3.6722664044155994e37,3.682107429555291e37,3.691948201164863e37,3.701789226304555e37,3.7116302514442466e37,3.7214712765839383e37,3.73131204819351e37,3.741153073333202e37,3.7509940984728937e37,3.7608348700824654e37,3.770675895222157e37,3.780516920361849e37,3.790357945501541e37,3.8001987171111125e37,3.8100397422508043e37,3.819880767390496e37,3.829721792530188e37,3.8395625641397597e37,3.8494035892794514e37,3.859244614419143e37,3.869085386028715e37,3.878926411168407e37,3.8887674363080986e37,3.8986084614477903e37,3.908449233057362e37,3.918290258197054e37,3.9281312833367457e37,3.9379720549463174e37,3.947813080086009e37,3.957654105225701e37,3.967495130365393e37,3.9773359019749645e37,3.9871769271146563e37,3.997017952254348e37,4.00685872386392e37,4.0166997490036117e37,4.0265407741433034e37,4.036381799282995e37,4.046222570892567e37,4.056063596032259e37,4.0659046211719506e37,4.0757456463116424e37,4.085586417921214e37,4.095427443060906e37,4.1052684682005977e37,4.1151092398101694e37,4.124950264949861e37,4.134791290089553e37,4.144632315229245e37,4.1544730868388165e37,4.1643141119785083e37,4.1741551371182e37,4.183995908727772e37,4.1938369338674637e37,4.2036779590071554e37,4.213518984146847e37,4.223359755756419e37,4.233200780896111e37,4.2430418060358026e37,4.2528825776453743e37,4.262723602785066e37,4.272564627924758e37,4.28240565306445e37,4.292246678204141e37,4.302087703343833e37,4.311928221423285e37,4.321769246562977e37,4.331610271702669e37,4.34145129684236e37,4.351292321982052e37,4.361133347121744e37,4.370974372261436e37,4.380814890340887e37,4.390655915480579e37,4.400496940620271e37,4.410337965759963e37,4.420178990899655e37,4.430020016039346e37,4.439861041179038e37,4.44970155925849e37,4.459542584398182e37,4.469383609537873e37,4.479224634677565e37,4.489065659817257e37,4.498906684956949e37,4.508747710096641e37,4.518588228176092e37,4.528429253315784e37,4.538270278455476e37,4.548111303595168e37,4.557952328734859e37,4.567793353874551e37,4.577634379014243e37,4.587474897093695e37,4.5973159222333865e37,4.607156947373078e37,4.61699797251277e37,4.626838997652462e37,4.636680022792154e37,4.646521047931845e37,4.656362073071537e37,4.666202591150989e37,4.676043616290681e37,4.685884641430373e37,4.695725666570064e37,4.705566691709756e37,4.715407716849448e37,4.72524874198914e37,4.735089260068591e37,4.744930285208283e37,4.754771310347975e37,4.764612335487667e37,4.774453360627359e37,4.78429438576705e37,4.794135410906742e37,4.803975928986194e37,4.813816954125886e37,4.823657979265577e37,4.833499004405269e37,4.843340029544961e37,4.853181054684653e37,4.863022079824345e37,4.872862597903796e37,4.882703623043488e37,4.89254464818318e37,4.902385673322872e37,4.912226698462563e37,4.922067723602255e37,4.931908748741947e37,4.941749266821399e37,4.9515902919610905e37,4.961431317100782e37,4.971272342240474e37,4.981113367380166e37,4.990954392519858e37,5.000795417659549e37,5.010635935739001e37,5.020476960878693e37,5.030317986018385e37,5.040159011158077e37,5.050000036297768e37,5.05984106143746e37,5.069682086577152e37,5.079523111716844e37,5.089363629796295e37,5.099204654935987e37,5.109045680075679e37,5.118886705215371e37,5.128727730355063e37,5.138568755494754e37,5.148409780634446e37,5.158250298713898e37,5.16809132385359e37,5.177932348993281e37,5.187773374132973e37,5.197614399272665e37,5.207455424412357e37,5.217296449552049e37,5.2271369676315e37,5.236977992771192e37,5.246819017910884e37,5.256660043050576e37,5.266501068190267e37,5.276342093329959e37,5.286183118469651e37,5.296023636549103e37,5.3058646616887945e37,5.315705686828486e37,5.325546711968178e37,5.33538773710787e37,5.345228762247562e37,5.355069787387253e37,5.364910305466705e37,5.374751330606397e37,5.384592355746089e37,5.394433380885781e37,5.404274406025472e37,5.414115431165164e37,5.423956456304856e37,5.433796974384308e37,5.443637999523999e37,5.453479024663691e37,5.463320049803383e37,5.473161074943075e37,5.483002100082767e37,5.492843125222458e37,5.50268364330191e37,5.512524668441602e37,5.522365693581294e37,5.532206718720985e37,5.542047743860677e37,5.551888769000369e37,5.561729794140061e37,5.571570819279753e37,5.581411337359204e37,5.591252362498896e37,5.601093387638588e37,5.61093441277828e37,5.620775437917971e37,5.630616463057663e37,5.640457488197355e37,5.650298006276807e37,5.6601390314164985e37,5.66998005655619e37,5.679821081695882e37,5.689662106835574e37,5.699503131975266e37,5.709344157114957e37,5.719184675194409e37,5.729025700334101e37,5.738866725473793e37,5.748707750613485e37,5.758548775753176e37,5.768389800892868e37,5.77823082603256e37,5.788071344112012e37,5.797912369251703e37,5.807753394391395e37,5.817594419531087e37,5.827435444670779e37,5.837276469810471e37,5.847117494950162e37,5.856958013029614e37,5.866799038169306e37,5.876640063308998e37,5.886481088448689e37,5.896322113588381e37,5.906163138728073e37,5.916004163867765e37,5.9258446819472165e37,5.935685707086908e37,5.9455267322266e37,5.955367757366292e37,5.965208782505984e37,5.975049807645675e37,5.984890832785367e37,5.994731857925059e37,6.004572376004511e37,6.0144134011442025e37,6.024254426283894e37,6.034095451423586e37,6.043936476563278e37,6.05377750170297e37,6.0636185268426615e37,6.073459044922113e37,6.083300070061805e37,6.093141095201497e37,6.102982120341189e37,6.11282314548088e37,6.122664170620572e37,6.132505195760264e37,6.142345713839716e37,6.152186738979407e37,6.162027764119099e37,6.171868789258791e37,6.181709814398483e37,6.191550839538175e37,6.201391864677866e37,6.211232382757318e37,6.22107340789701e37,6.230914433036702e37,6.240755458176393e37,6.250596483316085e37,6.260437508455777e37,6.270278533595469e37,6.2801190516749205e37,6.289960076814612e37,6.299801101954304e37,6.309642127093996e37,6.319483152233688e37,6.329324177373379e37,6.339165202513071e37,6.349005720592523e37,6.358846745732215e37,6.3686877708719065e37,6.378528796011598e37,6.38836982115129e37,6.398210846290982e37,6.408051871430674e37,6.4178928965703655e37,6.427733414649817e37,6.437574439789509e37,6.447415464929201e37,6.457256490068893e37,6.467097515208584e37,6.476938540348276e37,6.486779565487968e37,6.49662008356742e37,6.506461108707111e37,6.516302133846803e37,6.526143158986495e37,6.535984184126187e37,6.545825209265879e37,6.55566623440557e37,6.565506752485022e37,6.575347777624714e37,6.585188802764406e37,6.595029827904097e37,6.604870853043789e37,6.614711878183481e37,6.624552903323173e37,6.6343934214026245e37,6.644234446542316e37,6.654075471682008e37,6.6639164968217e37,6.673757521961392e37,6.683598547101083e37,6.693439572240775e37,6.703280090320227e37,6.713121115459919e37,6.7229621405996105e37,6.732803165739302e37,6.742644190878994e37,6.752485216018686e37,6.762326241158378e37,6.772166759237829e37,6.782007784377521e37,6.791848809517213e37,6.801689834656905e37,6.811530859796597e37,6.821371884936288e37,6.83121291007598e37,6.841053428155432e37,6.850894453295124e37,6.860735478434815e37,6.870576503574507e37,6.880417528714199e37,6.890258553853891e37,6.900099578993583e37,6.909940604133274e37,6.919781122212726e37,6.929622147352418e37,6.93946317249211e37,6.949304197631801e37,6.959145222771493e37,6.968986247911185e37,6.978827273050877e37,6.9886677911303285e37,6.99850881627002e37,7.008349841409712e37,7.018190866549404e37,7.028031891689096e37,7.037872916828787e37,7.047713941968479e37,7.057554460047931e37,7.067395485187623e37,7.0772365103273145e37,7.087077535467006e37,7.096918560606698e37,7.10675958574639e37,7.116600610886082e37,7.126441128965533e37,7.136282154105225e37,7.146123179244917e37,7.155964204384609e37,7.165805229524301e37,7.175646254663992e37,7.185487279803684e37,7.195327797883136e37,7.205168823022828e37,7.215009848162519e37,7.224850873302211e37,7.234691898441903e37,7.244532923581595e37,7.254373948721287e37,7.264214466800738e37,7.27405549194043e37,7.283896517080122e37,7.293737542219814e37,7.303578567359505e37,7.313419592499197e37,7.323260617638889e37,7.333101642778581e37,7.3429421608580325e37,7.352783185997724e37,7.362624211137416e37,7.372465236277108e37,7.3823062614168e37,7.392147286556491e37,7.401988311696183e37,7.411828829775635e37,7.421669854915327e37,7.4315108800550185e37,7.44135190519471e37,7.451192930334402e37,7.461033955474094e37,7.470874980613786e37,7.480715498693237e37,7.490556523832929e37,7.500397548972621e37,7.510238574112313e37,7.520079599252005e37,7.529920624391696e37,7.539761649531388e37,7.54960216761084e37,7.559443192750532e37,7.569284217890223e37,7.579125243029915e37,7.588966268169607e37,7.598807293309299e37,7.608648318448991e37,7.618488836528442e37,7.628329861668134e37,7.638170886807826e37,7.648011911947518e37,7.657852937087209e37,7.667693962226901e37,7.677534987366593e37,7.687375505446045e37,7.6972165305857365e37,7.707057555725428e37,7.71689858086512e37,7.726739606004812e37,7.736580631144504e37,7.746421656284195e37,7.756262174363647e37,7.766103199503339e37,7.775944224643031e37,7.7857852497827225e37,7.795626274922414e37,7.805467300062106e37,7.815308325201798e37,7.82514935034149e37,7.834989868420941e37,7.844830893560633e37,7.854671918700325e37,7.864512943840017e37,7.874353968979709e37,7.8841949941194e37,7.894036019259092e37,7.903876537338544e37,7.913717562478236e37,7.923558587617927e37,7.933399612757619e37,7.943240637897311e37,7.953081663037003e37,7.962922688176695e37,7.972763206256146e37,7.982604231395838e37,7.99244525653553e37,8.002286281675222e37,8.012127306814913e37,8.021968331954605e37,8.031809357094297e37,8.041649875173749e37,8.0514909003134405e37,8.061331925453132e37,8.071172950592824e37,8.081013975732516e37,8.090855000872208e37,8.100696026011899e37,8.110536544091351e37,8.120377569231043e37,8.130218594370735e37,8.1400596195104265e37,8.149900644650118e37,8.15974166978981e37,8.169582694929502e37,8.179423213008954e37,8.189264238148645e37,8.199105263288337e37,8.208946288428029e37,8.218787313567721e37,8.228628338707413e37,8.238469363847104e37,8.248310388986796e37,8.258150907066248e37,8.26799193220594e37,8.277832957345631e37,8.287673982485323e37,8.297515007625015e37,8.307356032764707e37,8.317197057904399e37,8.32703757598385e37,8.336878601123542e37,8.346719626263234e37,8.356560651402926e37,8.366401676542617e37,8.376242701682309e37,8.386083726822001e37,8.395924244901453e37,8.4057652700411445e37,8.415606295180836e37,8.425447320320528e37,8.43528834546022e37,8.445129370599912e37,8.454970395739603e37,8.464810913819055e37,8.474651938958747e37,8.484492964098439e37,8.494333989238131e37,8.504175014377822e37,8.514016039517514e37,8.523857064657206e37,8.533698089796898e37,8.54353911493659e37,8.553380140076281e37,8.563221165215973e37,8.573061176235185e37,8.582902201374876e37,8.592743226514568e37,8.60258425165426e37,8.612425276793952e37,8.622266301933644e37,8.632107327073335e37,8.641948352213027e37,8.651789377352719e37,8.66163040249241e37,8.671471427632103e37,8.681312452771794e37,8.691153477911486e37,8.700994503051178e37,8.71083451407039e37,8.720675539210081e37,8.730516564349773e37,8.740357589489465e37,8.750198614629157e37,8.760039639768849e37,8.76988066490854e37,8.779721690048232e37,8.789562715187924e37,8.799403740327616e37,8.809244765467307e37,8.819085790607e37,8.828926815746691e37,8.838767840886383e37,8.848607851905594e37,8.858448877045286e37,8.868289902184978e37,8.87813092732467e37,8.887971952464362e37,8.897812977604053e37,8.907654002743745e37,8.917495027883437e37,8.927336053023129e37,8.93717707816282e37,8.947018103302512e37,8.956859128442204e37,8.966700153581896e37,8.976541178721588e37,8.98638220386128e37,8.996222214880491e37,9.006063240020183e37,9.015904265159875e37,9.025745290299566e37,9.035586315439258e37,9.04542734057895e37,9.055268365718642e37,9.065109390858334e37,9.074950415998025e37,9.084791441137717e37,9.094632466277409e37,9.1044734914171e37,9.114314516556793e37,9.124155541696484e37,9.133995552715696e37,9.143836577855388e37,9.15367760299508e37,9.163518628134771e37,9.173359653274463e37,9.183200678414155e37,9.193041703553847e37,9.202882728693539e37,9.21272375383323e37,9.222564778972922e37,9.232405804112614e37,9.242246829252306e37,9.252087854391997e37,9.26192887953169e37,9.2717688905509e37,9.281609915690593e37,9.291450940830284e37,9.301291965969976e37,9.311132991109668e37,9.32097401624936e37,9.330815041389052e37,9.340656066528743e37,9.350497091668435e37,9.360338116808127e37,9.370179141947819e37,9.38002016708751e37,9.389861192227202e37,9.399702217366894e37,9.409543242506586e37,9.419383253525798e37,9.42922427866549e37,9.439065303805181e37,9.448906328944873e37,9.458747354084565e37,9.468588379224257e37,9.478429404363948e37,9.48827042950364e37,9.498111454643332e37,9.507952479783024e37,9.517793504922715e37,9.527634530062407e37,9.537475555202099e37,9.54731658034179e37,9.557156591361002e37,9.566997616500694e37,9.576838641640386e37,9.586679666780078e37,9.59652069191977e37,9.606361717059461e37,9.616202742199153e37,9.626043767338845e37,9.635884792478537e37,9.645725817618229e37,9.65556684275792e37,9.665407867897612e37,9.675248893037304e37,9.685089918176996e37,9.694929929196207e37,9.7047709543359e37,9.71461197947559e37,9.724453004615283e37,9.734294029754974e37,9.744135054894666e37,9.753976080034358e37,9.76381710517405e37,9.773658130313742e37,9.783499155453433e37,9.793340180593125e37,9.803181205732817e37,9.813022230872509e37,9.8228632560122e37,9.832704281151892e37,9.842544292171104e37,9.852385317310796e37,9.862226342450488e37,9.87206736759018e37,9.881908392729871e37,9.891749417869563e37,9.901590443009255e37,9.911431468148947e37,9.921272493288638e37,9.93111351842833e37,9.940954543568022e37,9.950795568707714e37,9.960636593847405e37,9.970477618987097e37,9.980317630006309e37,9.990158655146e37,9.999999680285692e37],"x":["01111011010000001001011111001110","01111011010100111000101111000110","01111011011001100111111110111101","01111011011110010111001110110100","01111011100001100011001111010101","01111011100011111010110111010001","01111011100110010010011111001100","01111011101000101010000111001000","01111011101011000001101111000011","01111011101101011001010110111111","01111011101111110000111110111011","01111011110010001000100110110110","01111011110100100000001110110010","01111011110110110111110110101101","01111011111001001111011110101001","01111011111011100111000110100100","01111011111101111110101110100000","01111100000000001011001011001110","01111100000001010110111111001011","01111100000010100010110011001001","01111100000011101110100111000111","01111100000100111010011011000101","01111100000110000110001111000010","01111100000111010010000011000000","01111100001000011101110110111110","01111100001001101001101010111100","01111100001010110101011110111001","01111100001100000001010010110111","01111100001101001101000110110101","01111100001110011000111010110011","01111100001111100100101110110001","01111100010000110000100010101110","01111100010001111100010110101100","01111100010011001000001010101010","01111100010100010011111110101000","01111100010101011111110010100101","01111100010110101011100110100011","01111100010111110111011010100001","01111100011001000011001110011111","01111100011010001111000010011100","01111100011011011010110110011010","01111100011100100110101010011000","01111100011101110010011110010110","01111100011110111110010010010011","01111100100000000101000011001001","01111100100000101010111101000111","01111100100001010000110111000110","01111100100001110110110001000101","01111100100010011100101011000100","01111100100011000010100101000011","01111100100011101000011111000010","01111100100100001110011001000001","01111100100100110100010011000000","01111100100101011010001100111111","01111100100110000000000110111101","01111100100110100110000000111100","01111100100111001011111010111011","01111100100111110001110100111010","01111100101000010111101110111001","01111100101000111101101000111000","01111100101001100011100010110111","01111100101010001001011100110110","01111100101010101111010110110100","01111100101011010101010000110011","01111100101011111011001010110010","01111100101100100001000100110001","01111100101101000110111110110000","01111100101101101100111000101111","01111100101110010010110010101110","01111100101110111000101100101101","01111100101111011110100110101100","01111100110000000100100000101010","01111100110000101010011010101001","01111100110001010000010100101000","01111100110001110110001110100111","01111100110010011100001000100110","01111100110011000010000010100101","01111100110011100111111100100100","01111100110100001101110110100011","01111100110100110011110000100001","01111100110101011001101010100000","01111100110101111111100100011111","01111100110110100101011110011110","01111100110111001011011000011101","01111100110111110001010010011100","01111100111000010111001100011011","01111100111000111101000110011010","01111100111001100011000000011001","01111100111010001000111010010111","01111100111010101110110100010110","01111100111011010100101110010101","01111100111011111010101000010100","01111100111100100000100010010011","01111100111101000110011100010010","01111100111101101100010110010001","01111100111110010010010000010000","01111100111110111000001010001110","01111100111111011110000100001101","01111101000000000001111111000110","01111101000000010100111100000110","01111101000000100111111001000101","01111101000000111010110110000100","01111101000001001101110011000100","01111101000001100000110000000011","01111101000001110011101101000011","01111101000010000110101010000010","01111101000010011001100111000010","01111101000010101100100100000001","01111101000010111111100001000001","01111101000011010010011110000000","01111101000011100101011010111111","01111101000011111000010111111111","01111101000100001011010100111110","01111101000100011110010001111110","01111101000100110001001110111101","01111101000101000100001011111101","01111101000101010111001000111100","01111101000101101010000101111011","01111101000101111101000010111011","01111101000110001111111111111010","01111101000110100010111100111010","01111101000110110101111001111001","01111101000111001000110110111001","01111101000111011011110011111000","01111101000111101110110000111000","01111101001000000001101101110111","01111101001000010100101010110110","01111101001000100111100111110110","01111101001000111010100100110101","01111101001001001101100001110101","01111101001001100000011110110100","01111101001001110011011011110100","01111101001010000110011000110011","01111101001010011001010101110011","01111101001010101100010010110010","01111101001010111111001111110001","01111101001011010010001100110001","01111101001011100101001001110000","01111101001011111000000110110000","01111101001100001011000011101111","01111101001100011110000000101111","01111101001100110000111101101110","01111101001101000011111010101110","01111101001101010110110111101101","01111101001101101001110100101100","01111101001101111100110001101100","01111101001110001111101110101011","01111101001110100010101011101011","01111101001110110101101000101010","01111101001111001000100101101010","01111101001111011011100010101001","01111101001111101110011111101000","01111101010000000001011100101000","01111101010000010100011001100111","01111101010000100111010110100111","01111101010000111010010011100110","01111101010001001101010000100110","01111101010001100000001101100101","01111101010001110011001010100101","01111101010010000110000111100100","01111101010010011001000100100011","01111101010010101100000001100011","01111101010010111110111110100010","01111101010011010001111011100010","01111101010011100100111000100001","01111101010011110111110101100001","01111101010100001010110010100000","01111101010100011101101111100000","01111101010100110000101100011111","01111101010101000011101001011110","01111101010101010110100110011110","01111101010101101001100011011101","01111101010101111100100000011101","01111101010110001111011101011100","01111101010110100010011010011100","01111101010110110101010111011011","01111101010111001000010100011011","01111101010111011011010001011010","01111101010111101110001110011001","01111101011000000001001011011001","01111101011000010100001000011000","01111101011000100111000101011000","01111101011000111010000010010111","01111101011001001100111111010111","01111101011001011111111100010110","01111101011001110010111001010101","01111101011010000101110110010101","01111101011010011000110011010100","01111101011010101011110000010100","01111101011010111110101101010011","01111101011011010001101010010011","01111101011011100100100111010010","01111101011011110111100100010010","01111101011100001010100001010001","01111101011100011101011110010000","01111101011100110000011011010000","01111101011101000011011000001111","01111101011101010110010101001111","01111101011101101001010010001110","01111101011101111100001111001110","01111101011110001111001100001101","01111101011110100010001001001101","01111101011110110101000110001100","01111101011111001000000011001011","01111101011111011011000000001011","01111101011111101101111101001010","01111101100000000000011101000101","01111101100000001001111011100101","01111101100000010011011010000100","01111101100000011100111000100100","01111101100000100110010111000100","01111101100000101111110101100011","01111101100000111001010100000011","01111101100001000010110010100011","01111101100001001100010001000011","01111101100001010101101111100010","01111101100001011111001110000010","01111101100001101000101100100010","01111101100001110010001011000010","01111101100001111011101001100001","01111101100010000101001000000001","01111101100010001110100110100001","01111101100010011000000101000000","01111101100010100001100011100000","01111101100010101011000010000000","01111101100010110100100000100000","01111101100010111101111110111111","01111101100011000111011101011111","01111101100011010000111011111111","01111101100011011010011010011110","01111101100011100011111000111110","01111101100011101101010111011110","01111101100011110110110101111110","01111101100100000000010100011101","01111101100100001001110010111101","01111101100100010011010001011101","01111101100100011100101111111100","01111101100100100110001110011100","01111101100100101111101100111100","01111101100100111001001011011100","01111101100101000010101001111011","01111101100101001100001000011011","01111101100101010101100110111011","01111101100101011111000101011011","01111101100101101000100011111010","01111101100101110010000010011010","01111101100101111011100000111010","01111101100110000100111111011001","01111101100110001110011101111001","01111101100110010111111100011001","01111101100110100001011010111001","01111101100110101010111001011000","01111101100110110100010111111000","01111101100110111101110110011000","01111101100111000111010100110111","01111101100111010000110011010111","01111101100111011010010001110111","01111101100111100011110000010111","01111101100111101101001110110110","01111101100111110110101101010110","01111101101000000000001011110110","01111101101000001001101010010101","01111101101000010011001000110101","01111101101000011100100111010101","01111101101000100110000101110101","01111101101000101111100100010100","01111101101000111001000010110100","01111101101001000010100001010100","01111101101001001011111111110100","01111101101001010101011110010011","01111101101001011110111100110011","01111101101001101000011011010011","01111101101001110001111001110010","01111101101001111011011000010010","01111101101010000100110110110010","01111101101010001110010101010010","01111101101010010111110011110001","01111101101010100001010010010001","01111101101010101010110000110001","01111101101010110100001111010000","01111101101010111101101101110000","01111101101011000111001100010000","01111101101011010000101010110000","01111101101011011010001001001111","01111101101011100011100111101111","01111101101011101101000110001111","01111101101011110110100100101111","01111101101100000000000011001110","01111101101100001001100001101110","01111101101100010011000000001110","01111101101100011100011110101101","01111101101100100101111101001101","01111101101100101111011011101101","01111101101100111000111010001101","01111101101101000010011000101100","01111101101101001011110111001100","01111101101101010101010101101100","01111101101101011110110100001011","01111101101101101000010010101011","01111101101101110001110001001011","01111101101101111011001111101011","01111101101110000100101110001010","01111101101110001110001100101010","01111101101110010111101011001010","01111101101110100001001001101001","01111101101110101010101000001001","01111101101110110100000110101001","01111101101110111101100101001001","01111101101111000111000011101000","01111101101111010000100010001000","01111101101111011010000000101000","01111101101111100011011111001000","01111101101111101100111101100111","01111101101111110110011100000111","01111101101111111111111010100111","01111101110000001001011001000110","01111101110000010010110111100110","01111101110000011100010110000110","01111101110000100101110100100110","01111101110000101111010011000101","01111101110000111000110001100101","01111101110001000010010000000101","01111101110001001011101110100100","01111101110001010101001101000100","01111101110001011110101011100100","01111101110001101000001010000100","01111101110001110001101000100011","01111101110001111011000111000011","01111101110010000100100101100011","01111101110010001110000100000010","01111101110010010111100010100010","01111101110010100001000001000010","01111101110010101010011111100010","01111101110010110011111110000001","01111101110010111101011100100001","01111101110011000110111011000001","01111101110011010000011001100001","01111101110011011001111000000000","01111101110011100011010110100000","01111101110011101100110101000000","01111101110011110110010011011111","01111101110011111111110001111111","01111101110100001001010000011111","01111101110100010010101110111111","01111101110100011100001101011110","01111101110100100101101011111110","01111101110100101111001010011110","01111101110100111000101000111101","01111101110101000010000111011101","01111101110101001011100101111101","01111101110101010101000100011101","01111101110101011110100010111100","01111101110101101000000001011100","01111101110101110001011111111100","01111101110101111010111110011100","01111101110110000100011100111011","01111101110110001101111011011011","01111101110110010111011001111011","01111101110110100000111000011010","01111101110110101010010110111010","01111101110110110011110101011010","01111101110110111101010011111010","01111101110111000110110010011001","01111101110111010000010000111001","01111101110111011001101111011001","01111101110111100011001101111000","01111101110111101100101100011000","01111101110111110110001010111000","01111101110111111111101001011000","01111101111000001001000111110111","01111101111000010010100110010111","01111101111000011100000100110111","01111101111000100101100011010110","01111101111000101111000001110110","01111101111000111000100000010110","01111101111001000001111110110110","01111101111001001011011101010101","01111101111001010100111011110101","01111101111001011110011010010101","01111101111001100111111000110101","01111101111001110001010111010100","01111101111001111010110101110100","01111101111010000100010100010100","01111101111010001101110010110011","01111101111010010111010001010011","01111101111010100000101111110011","01111101111010101010001110010011","01111101111010110011101100110010","01111101111010111101001011010010","01111101111011000110101001110010","01111101111011010000001000010001","01111101111011011001100110110001","01111101111011100011000101010001","01111101111011101100100011110001","01111101111011110110000010010000","01111101111011111111100000110000","01111101111100001000111111010000","01111101111100010010011101101111","01111101111100011011111100001111","01111101111100100101011010101111","01111101111100101110111001001111","01111101111100111000010111101110","01111101111101000001110110001110","01111101111101001011010100101110","01111101111101010100110011001110","01111101111101011110010001101101","01111101111101100111110000001101","01111101111101110001001110101101","01111101111101111010101101001100","01111101111110000100001011101100","01111101111110001101101010001100","01111101111110010111001000101100","01111101111110100000100111001011","01111101111110101010000101101011","01111101111110110011100100001011","01111101111110111101000010101010","01111101111111000110100001001010","01111101111111001111111111101010","01111101111111011001011110001010","01111101111111100010111100101001","01111101111111101100011011001001","01111101111111110101111001101001","01111101111111111111011000001000","01111110000000000100011011010100","01111110000000001001001010100100","01111110000000001101111001110100","01111110000000010010101001000100","01111110000000010111011000010100","01111110000000011100000111100011","01111110000000100000110110110011","01111110000000100101100110000011","01111110000000101010010101010011","01111110000000101111000100100011","01111110000000110011110011110011","01111110000000111000100011000011","01111110000000111101010010010010","01111110000001000010000001100010","01111110000001000110110000110010","01111110000001001011100000000010","01111110000001010000001111010010","01111110000001010100111110100010","01111110000001011001101101110010","01111110000001011110011101000001","01111110000001100011001100010001","01111110000001100111111011100001","01111110000001101100101010110001","01111110000001110001011010000001","01111110000001110110001001010001","01111110000001111010111000100001","01111110000001111111100111110000","01111110000010000100010111000000","01111110000010001001000110010000","01111110000010001101110101100000","01111110000010010010100100110000","01111110000010010111010100000000","01111110000010011100000011010000","01111110000010100000110010011111","01111110000010100101100001101111","01111110000010101010010000111111","01111110000010101111000000001111","01111110000010110011101111011111","01111110000010111000011110101111","01111110000010111101001101111111","01111110000011000001111101001111","01111110000011000110101100011110","01111110000011001011011011101110","01111110000011010000001010111110","01111110000011010100111010001110","01111110000011011001101001011110","01111110000011011110011000101110","01111110000011100011000111111110","01111110000011100111110111001101","01111110000011101100100110011101","01111110000011110001010101101101","01111110000011110110000100111101","01111110000011111010110100001101","01111110000011111111100011011101","01111110000100000100010010101101","01111110000100001001000001111100","01111110000100001101110001001100","01111110000100010010100000011100","01111110000100010111001111101100","01111110000100011011111110111100","01111110000100100000101110001100","01111110000100100101011101011100","01111110000100101010001100101011","01111110000100101110111011111011","01111110000100110011101011001011","01111110000100111000011010011011","01111110000100111101001001101011","01111110000101000001111000111011","01111110000101000110101000001011","01111110000101001011010111011010","01111110000101010000000110101010","01111110000101010100110101111010","01111110000101011001100101001010","01111110000101011110010100011010","01111110000101100011000011101010","01111110000101100111110010111010","01111110000101101100100010001001","01111110000101110001010001011001","01111110000101110110000000101001","01111110000101111010101111111001","01111110000101111111011111001001","01111110000110000100001110011001","01111110000110001000111101101001","01111110000110001101101100111001","01111110000110010010011100001000","01111110000110010111001011011000","01111110000110011011111010101000","01111110000110100000101001111000","01111110000110100101011001001000","01111110000110101010001000011000","01111110000110101110110111101000","01111110000110110011100110110111","01111110000110111000010110000111","01111110000110111101000101010111","01111110000111000001110100100111","01111110000111000110100011110111","01111110000111001011010011000111","01111110000111010000000010010111","01111110000111010100110001100110","01111110000111011001100000110110","01111110000111011110010000000110","01111110000111100010111111010110","01111110000111100111101110100110","01111110000111101100011101110110","01111110000111110001001101000110","01111110000111110101111100010101","01111110000111111010101011100101","01111110000111111111011010110101","01111110001000000100001010000101","01111110001000001000111001010101","01111110001000001101101000100101","01111110001000010010010111110101","01111110001000010111000111000100","01111110001000011011110110010100","01111110001000100000100101100100","01111110001000100101010100110100","01111110001000101010000100000100","01111110001000101110110011010100","01111110001000110011100010100100","01111110001000111000010001110011","01111110001000111101000001000011","01111110001001000001110000010011","01111110001001000110011111100011","01111110001001001011001110110011","01111110001001001111111110000011","01111110001001010100101101010011","01111110001001011001011100100010","01111110001001011110001011110010","01111110001001100010111011000010","01111110001001100111101010010010","01111110001001101100011001100010","01111110001001110001001000110010","01111110001001110101111000000010","01111110001001111010100111010010","01111110001001111111010110100001","01111110001010000100000101110001","01111110001010001000110101000001","01111110001010001101100100010001","01111110001010010010010011100001","01111110001010010111000010110001","01111110001010011011110010000001","01111110001010100000100001010000","01111110001010100101010000100000","01111110001010101001111111110000","01111110001010101110101111000000","01111110001010110011011110010000","01111110001010111000001101100000","01111110001010111100111100110000","01111110001011000001101011111111","01111110001011000110011011001111","01111110001011001011001010011111","01111110001011001111111001101111","01111110001011010100101000111111","01111110001011011001011000001111","01111110001011011110000111011111","01111110001011100010110110101110","01111110001011100111100101111110","01111110001011101100010101001110","01111110001011110001000100011110","01111110001011110101110011101110","01111110001011111010100010111110","01111110001011111111010010001110","01111110001100000100000001011101","01111110001100001000110000101101","01111110001100001101011111111101","01111110001100010010001111001101","01111110001100010110111110011101","01111110001100011011101101101101","01111110001100100000011100111101","01111110001100100101001100001100","01111110001100101001111011011100","01111110001100101110101010101100","01111110001100110011011001111100","01111110001100111000001001001100","01111110001100111100111000011100","01111110001101000001100111101100","01111110001101000110010110111100","01111110001101001011000110001011","01111110001101001111110101011011","01111110001101010100100100101011","01111110001101011001010011111011","01111110001101011110000011001011","01111110001101100010110010011011","01111110001101100111100001101011","01111110001101101100010000111010","01111110001101110001000000001010","01111110001101110101101111011010","01111110001101111010011110101010","01111110001101111111001101111010","01111110001110000011111101001010","01111110001110001000101100011010","01111110001110001101011011101001","01111110001110010010001010111001","01111110001110010110111010001001","01111110001110011011101001011001","01111110001110100000011000101001","01111110001110100101000111111001","01111110001110101001110111001001","01111110001110101110100110011000","01111110001110110011010101101000","01111110001110111000000100111000","01111110001110111100110100001000","01111110001111000001100011011000","01111110001111000110010010101000","01111110001111001011000001111000","01111110001111001111110001000111","01111110001111010100100000010111","01111110001111011001001111100111","01111110001111011101111110110111","01111110001111100010101110000111","01111110001111100111011101010111","01111110001111101100001100100111","01111110001111110000111011110110","01111110001111110101101011000110","01111110001111111010011010010110","01111110001111111111001001100110","01111110010000000011111000110110","01111110010000001000101000000110","01111110010000001101010111010110","01111110010000010010000110100110","01111110010000010110110101110101","01111110010000011011100101000101","01111110010000100000010100010101","01111110010000100101000011100101","01111110010000101001110010110101","01111110010000101110100010000101","01111110010000110011010001010101","01111110010000111000000000100100","01111110010000111100101111110100","01111110010001000001011111000100","01111110010001000110001110010100","01111110010001001010111101100100","01111110010001001111101100110100","01111110010001010100011100000100","01111110010001011001001011010011","01111110010001011101111010100011","01111110010001100010101001110011","01111110010001100111011001000011","01111110010001101100001000010011","01111110010001110000110111100011","01111110010001110101100110110011","01111110010001111010010110000010","01111110010001111111000101010010","01111110010010000011110100100010","01111110010010001000100011110010","01111110010010001101010011000010","01111110010010010010000010010010","01111110010010010110110001100010","01111110010010011011100000110001","01111110010010100000010000000001","01111110010010100100111111010001","01111110010010101001101110100001","01111110010010101110011101110001","01111110010010110011001101000001","01111110010010110111111100010001","01111110010010111100101011100000","01111110010011000001011010110000","01111110010011000110001010000000","01111110010011001010111001010000","01111110010011001111101000100000","01111110010011010100010111110000","01111110010011011001000111000000","01111110010011011101110110001111","01111110010011100010100101011111","01111110010011100111010100101111","01111110010011101100000011111111","01111110010011110000110011001111","01111110010011110101100010011111","01111110010011111010010001101111","01111110010011111111000000111111","01111110010100000011110000001110","01111110010100001000011111011110","01111110010100001101001110101110","01111110010100010001111101111110","01111110010100010110101101001110","01111110010100011011011100011110","01111110010100100000001011101110","01111110010100100100111010111101","01111110010100101001101010001101","01111110010100101110011001011101","01111110010100110011001000101101","01111110010100110111110111111101","01111110010100111100100111001101","01111110010101000001010110011101","01111110010101000110000101101100","01111110010101001010110100111100","01111110010101001111100100001100","01111110010101010100010011011100","01111110010101011001000010101100","01111110010101011101110001111100","01111110010101100010100001001100","01111110010101100111010000011011","01111110010101101011111111101011","01111110010101110000101110111011","01111110010101110101011110001011","01111110010101111010001101011011","01111110010101111110111100101011","01111110010110000011101011111011","01111110010110001000011011001010","01111110010110001101001010011010","01111110010110010001111001101010","01111110010110010110101000111010","01111110010110011011011000001010","01111110010110100000000111011010","01111110010110100100110110101010","01111110010110101001100101111001","01111110010110101110010101001001","01111110010110110011000100011001","01111110010110110111110011101001","01111110010110111100100010111001","01111110010111000001010010001001","01111110010111000110000001011001","01111110010111001010110000101001","01111110010111001111011111111000","01111110010111010100001111001000","01111110010111011000111110011000","01111110010111011101101101101000","01111110010111100010011100111000","01111110010111100111001100001000","01111110010111101011111011011000","01111110010111110000101010100111","01111110010111110101011001110111","01111110010111111010001001000111","01111110010111111110111000010111","01111110011000000011100111100111","01111110011000001000010110110111","01111110011000001101000110000111","01111110011000010001110101010110","01111110011000010110100100100110","01111110011000011011010011110110","01111110011000100000000011000110","01111110011000100100110010010110","01111110011000101001100001100110","01111110011000101110010000110110","01111110011000110011000000000101","01111110011000110111101111010101","01111110011000111100011110100101","01111110011001000001001101110101","01111110011001000101111101000101","01111110011001001010101100010101","01111110011001001111011011100101","01111110011001010100001010110100","01111110011001011000111010000100","01111110011001011101101001010100","01111110011001100010011000100100","01111110011001100111000111110100","01111110011001101011110111000100","01111110011001110000100110010100","01111110011001110101010101100011","01111110011001111010000100110011","01111110011001111110110100000011","01111110011010000011100011010011","01111110011010001000010010100011","01111110011010001101000001110011","01111110011010010001110001000011","01111110011010010110100000010010","01111110011010011011001111100010","01111110011010011111111110110010","01111110011010100100101110000010","01111110011010101001011101010010","01111110011010101110001100100010","01111110011010110010111011110010","01111110011010110111101011000010","01111110011010111100011010010001","01111110011011000001001001100001","01111110011011000101111000110001","01111110011011001010101000000001","01111110011011001111010111010001","01111110011011010100000110100001","01111110011011011000110101110001","01111110011011011101100101000000","01111110011011100010010100010000","01111110011011100111000011100000","01111110011011101011110010110000","01111110011011110000100010000000","01111110011011110101010001010000","01111110011011111010000000100000","01111110011011111110101111101111","01111110011100000011011110111111","01111110011100001000001110001111","01111110011100001100111101011111","01111110011100010001101100101111","01111110011100010110011011111111","01111110011100011011001011001111","01111110011100011111111010011110","01111110011100100100101001101110","01111110011100101001011000111110","01111110011100101110001000001110","01111110011100110010110111011110","01111110011100110111100110101110","01111110011100111100010101111110","01111110011101000001000101001101","01111110011101000101110100011101","01111110011101001010100011101101","01111110011101001111010010111101","01111110011101010100000010001101","01111110011101011000110001011101","01111110011101011101100000101101","01111110011101100010001111111100","01111110011101100110111111001100","01111110011101101011101110011100","01111110011101110000011101101100","01111110011101110101001100111100","01111110011101111001111100001100","01111110011101111110101011011100","01111110011110000011011010101100","01111110011110001000001001111011","01111110011110001100111001001011","01111110011110010001101000011011","01111110011110010110010111101011","01111110011110011011000110111011","01111110011110011111110110001011","01111110011110100100100101011011","01111110011110101001010100101010","01111110011110101110000011111010","01111110011110110010110011001010","01111110011110110111100010011010","01111110011110111100010001101010","01111110011111000001000000111010","01111110011111000101110000001010","01111110011111001010011111011001","01111110011111001111001110101001","01111110011111010011111101111001","01111110011111011000101101001001","01111110011111011101011100011001","01111110011111100010001011101001","01111110011111100110111010111001","01111110011111101011101010001000","01111110011111110000011001011000","01111110011111110101001000101000","01111110011111111001110111111000","01111110011111111110100111001000","01111110100000000001101011001100","01111110100000000100000010110100","01111110100000000110011010011100","01111110100000001000110010000100","01111110100000001011001001101100","01111110100000001101100001010100","01111110100000001111111000111011","01111110100000010010010000100011","01111110100000010100101000001011","01111110100000010110111111110011","01111110100000011001010111011011","01111110100000011011101111000011","01111110100000011110000110101011","01111110100000100000011110010011","01111110100000100010110101111011","01111110100000100101001101100011","01111110100000100111100101001011","01111110100000101001111100110011","01111110100000101100010100011011","01111110100000101110101100000011","01111110100000110001000011101010","01111110100000110011011011010010","01111110100000110101110010111010","01111110100000111000001010100010","01111110100000111010100010001010","01111110100000111100111001110010","01111110100000111111010001011010","01111110100001000001101001000010","01111110100001000100000000101010","01111110100001000110011000010010","01111110100001001000101111111010","01111110100001001011000111100010","01111110100001001101011111001010","01111110100001001111110110110010","01111110100001010010001110011001","01111110100001010100100110000001","01111110100001010110111101101001","01111110100001011001010101010001","01111110100001011011101100111001","01111110100001011110000100100001","01111110100001100000011100001001","01111110100001100010110011110001","01111110100001100101001011011001","01111110100001100111100011000001","01111110100001101001111010101001","01111110100001101100010010010001","01111110100001101110101001111001","01111110100001110001000001100001","01111110100001110011011001001001","01111110100001110101110000110000","01111110100001111000001000011000","01111110100001111010100000000000","01111110100001111100110111101000","01111110100001111111001111010000","01111110100010000001100110111000","01111110100010000011111110100000","01111110100010000110010110001000","01111110100010001000101101110000","01111110100010001011000101011000","01111110100010001101011101000000","01111110100010001111110100101000","01111110100010010010001100010000","01111110100010010100100011111000","01111110100010010110111011011111","01111110100010011001010011000111","01111110100010011011101010101111","01111110100010011110000010010111","01111110100010100000011001111111","01111110100010100010110001100111","01111110100010100101001001001111","01111110100010100111100000110111","01111110100010101001111000011111","01111110100010101100010000000111","01111110100010101110100111101111","01111110100010110000111111010111","01111110100010110011010110111111","01111110100010110101101110100111","01111110100010111000000110001110","01111110100010111010011101110110","01111110100010111100110101011110","01111110100010111111001101000110","01111110100011000001100100101110","01111110100011000011111100010110","01111110100011000110010011111110","01111110100011001000101011100110","01111110100011001011000011001110","01111110100011001101011010110110","01111110100011001111110010011110","01111110100011010010001010000110","01111110100011010100100001101110","01111110100011010110111001010110","01111110100011011001010000111110","01111110100011011011101000100101","01111110100011011110000000001101","01111110100011100000010111110101","01111110100011100010101111011101","01111110100011100101000111000101","01111110100011100111011110101101","01111110100011101001110110010101","01111110100011101100001101111101","01111110100011101110100101100101","01111110100011110000111101001101","01111110100011110011010100110101","01111110100011110101101100011101","01111110100011111000000100000101","01111110100011111010011011101101","01111110100011111100110011010100","01111110100011111111001010111100","01111110100100000001100010100100","01111110100100000011111010001100","01111110100100000110010001110100","01111110100100001000101001011100","01111110100100001011000001000100","01111110100100001101011000101100","01111110100100001111110000010100","01111110100100010010000111111100","01111110100100010100011111100100","01111110100100010110110111001100","01111110100100011001001110110100","01111110100100011011100110011100","01111110100100011101111110000011","01111110100100100000010101101011","01111110100100100010101101010011","01111110100100100101000100111011","01111110100100100111011100100011","01111110100100101001110100001011","01111110100100101100001011110011","01111110100100101110100011011011","01111110100100110000111011000011","01111110100100110011010010101011","01111110100100110101101010010011","01111110100100111000000001111011","01111110100100111010011001100011","01111110100100111100110001001011","01111110100100111111001000110011","01111110100101000001100000011010","01111110100101000011111000000010","01111110100101000110001111101010","01111110100101001000100111010010","01111110100101001010111110111010","01111110100101001101010110100010","01111110100101001111101110001010","01111110100101010010000101110010","01111110100101010100011101011010","01111110100101010110110101000010","01111110100101011001001100101010","01111110100101011011100100010010","01111110100101011101111011111010","01111110100101100000010011100010","01111110100101100010101011001001","01111110100101100101000010110001","01111110100101100111011010011001"]}
},{}],142:[function(require,module,exports){
(function (__filename){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var PINF = require( '@stdlib/constants/math/float32-pinf' );
var NINF = require( '@stdlib/constants/math/float32-ninf' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var toBinaryStringf = require( '@stdlib/number/float32/base/to-binary-string' );
var fromBinaryStringf = require( './../lib' );


// FIXTURES //

var small = require( './fixtures/julia/bits_1e-36_1e-38.json' );
var medium = require( './fixtures/julia/bits_-1e3_1e3.json' );
var large = require( './fixtures/julia/bits_1e36_1e38.json' );
var subnormal = require( './fixtures/julia/bits_1e-39_1e-45.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof fromBinaryStringf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided a string with a length other than `32`, the function throws an error', function test( t ) {
	var values;
	var i;

	values = [
		'beep',
		'1010101',
		'',
		'101',
		'111111111',
		'1111111111111111111111111111111',
		'111111111111111111111111111111111'
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), Error, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			fromBinaryStringf( value );
		};
	}
});

tape( 'if provided all zeros, the function returns `+0`', function test( t ) {
	var v = fromBinaryStringf( toBinaryStringf( 0.0 ) );
	t.strictEqual( isPositiveZero( v ), true, 'returns +0' );
	t.end();
});

tape( 'if provided a sign bit of 1 and all zeros, the function returns `-0`', function test( t ) {
	var v = fromBinaryStringf( toBinaryStringf( -0.0 ) );
	t.strictEqual( isNegativeZero( v ), true, 'returns -0' );
	t.end();
});

tape( 'if provided a bit sequence where all exponent bits are 1s and everything else is 0, the function returns positive infinity', function test( t ) {
	t.strictEqual( fromBinaryStringf( toBinaryStringf( PINF ) ), PINF, 'returns +infinity' );
	t.end();
});

tape( 'if provided a bit sequence where the sign bit is 1, all exponent bits are 1s, and everything else is 0, the function returns negative infinity', function test( t ) {
	t.strictEqual( fromBinaryStringf( toBinaryStringf( NINF ) ), NINF, 'returns -infinity' );
	t.end();
});

tape( 'if provided a bit sequence where the sign bit may be either 1 or 0, all exponent bits are 1s, and the fraction is not all 0s, the function returns `NaN`', function test( t ) {
	var v = fromBinaryStringf( toBinaryStringf( NaN ) );
	t.strictEqual( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function creates single-precision floating-point numbers from literal bit representations for small values', function test( t ) {
	var expected;
	var val;
	var x;
	var i;

	x = small.x;
	expected = small.expected;
	for ( i = 0; i < x.length; i++ ) {
		val = fromBinaryStringf( x[ i ] );
		t.strictEqual( val, expected[ i ], 'returns a float equal to ' + expected[ i ] + ' from ' + x[ i ] );
	}
	t.end();
});

tape( 'the function creates single-precision floating-point numbers from literal bit representations for medium values', function test( t ) {
	var expected;
	var val;
	var x;
	var i;

	x = medium.x;
	expected = medium.expected;
	for ( i = 0; i < x.length; i++ ) {
		val = fromBinaryStringf( x[ i ] );
		t.strictEqual( val, expected[ i ], 'returns a float equal to ' + expected[ i ] + ' from ' + x[ i ] );
	}
	t.end();
});

tape( 'the function creates single-precision floating-point numbers from literal bit representations for large values', function test( t ) {
	var expected;
	var val;
	var x;
	var i;

	x = large.x;
	expected = large.expected;
	for ( i = 0; i < x.length; i++ ) {
		val = fromBinaryStringf( x[ i ] );
		t.strictEqual( val, expected[ i ], 'returns a float equal to ' + expected[ i ] + ' from ' + x[ i ] );
	}
	t.end();
});

tape( 'the function creates single-precision floating-point numbers from literal bit representations for subnormal values', function test( t ) {
	var expected;
	var val;
	var x;
	var i;

	x = subnormal.x;
	expected = subnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		val = fromBinaryStringf( x[ i ] );
		t.strictEqual( val, expected[ i ], 'returns a float equal to ' + expected[ i ] + ' from ' + x[ i ] );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/number/float32/base/from-binary-string/test/test.js")
},{"./../lib":135,"./fixtures/julia/bits_-1e3_1e3.json":138,"./fixtures/julia/bits_1e-36_1e-38.json":139,"./fixtures/julia/bits_1e-39_1e-45.json":140,"./fixtures/julia/bits_1e36_1e38.json":141,"@stdlib/constants/math/float32-ninf":81,"@stdlib/constants/math/float32-pinf":82,"@stdlib/math/base/assert/is-nan":102,"@stdlib/math/base/assert/is-negative-zero":104,"@stdlib/math/base/assert/is-positive-zero":108,"@stdlib/number/float32/base/to-binary-string":144,"tape":251}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Converts a nonnegative integer to a literal bit representation using the divide-by-2 algorithm.
*
* @private
* @param {NonNegativeInteger} x - nonnegative integer
* @returns {BinaryString} bit representation
*
* @example
* var v = div2( 3 );
* // returns '11'
*
* @example
* var v = div2( 0 );
* // returns ''
*
* @example
* var v = div2( 12 );
* // returns '1100'
*
* @example
* var v = div2( 188 );
* // returns '10111100'
*/
function div2( x ) {
	var str = '';
	var y;

	// We repeatedly divide by 2 and check for a remainder. If a remainder exists, the number is odd and we add a '1' bit...
	while ( x > 0 ) {
		y = x / 2.0;
		x = floor( y );
		if ( y === x ) {
			str = '0' + str;
		} else {
			str = '1' + str;
		}
	}
	return str;
}


// EXPORTS //

module.exports = div2;

},{"@stdlib/math/base/special/floor":117}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a string giving the literal bit representation of a single-precision floating-point number.
*
* @module @stdlib/number/float32/base/to-binary-string
*
* @example
* var toBinaryStringf = require( '@stdlib/number/float32/base/to-binary-string' );
* var toFloat32 = require( '@stdlib/number/float64/base/to-float32' );
*
* var str = toBinaryStringf( toFloat32( 4.0 ) );
* // returns '01000000100000000000000000000000'
*
* str = toBinaryStringf( toFloat32( 3.141592653589793 ) );
* // returns '01000000010010010000111111011011'
*
* str = toBinaryStringf( toFloat32( -1.0e38 ) );
* // returns '11111110100101100111011010011001'
*
* str = toBinaryStringf( toFloat32( -3.14e-39 ) );
* // returns '10000000001000100011000100001011'
*
* str = toBinaryStringf( toFloat32( 1.4e-45 ) );
* // returns '00000000000000000000000000000001'
*
* str = toBinaryStringf( 0.0 );
* // returns '00000000000000000000000000000000'
*
* str = toBinaryStringf( -0.0 );
* // returns '10000000000000000000000000000000'
*
* str = toBinaryStringf( NaN );
* // returns '01111111110000000000000000000000'
*
* var PINF = require( '@stdlib/constants/math/float32-pinf' );
* str = toBinaryStringf( PINF );
* // returns '01111111100000000000000000000000'
*
* var NINF = require( '@stdlib/constants/math/float32-ninf' );
* str = toBinaryStringf( NINF );
* // returns '11111111100000000000000000000000'
*/

// MODULES //

var totoBinaryStringf = require( './main.js' );


// EXPORTS //

module.exports = totoBinaryStringf;

},{"./main.js":145}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float32-pinf' );
var NINF = require( '@stdlib/constants/math/float32-ninf' );
var BIAS = require( '@stdlib/constants/math/float32-exponent-bias' );
var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var rpad = require( '@stdlib/string/right-pad' );
var lpad = require( '@stdlib/string/left-pad' );
var repeat = require( '@stdlib/string/repeat' );
var div2 = require( './div2.js' );
var mult2 = require( './mult2.js' );


// VARIABLES //

// TODO: consider placing in external modules
var NUM_SIGNIFICAND_BITS = 23;
var NUM_EXPONENT_BITS = 8;


// MAIN //

/**
* Returns a string giving the literal bit representation of a single-precision floating-point number.
*
* @param {number} x - input value
* @returns {BinaryString} bit representation
*
* @example
* var toFloat32 = require( '@stdlib/number/float64/base/to-float32' );
* var str = toBinaryStringf( toFloat32( 4.0 ) );
* // returns '01000000100000000000000000000000'
*
* @example
* var toFloat32 = require( '@stdlib/number/float64/base/to-float32' );
* var str = toBinaryStringf( toFloat32( 3.141592653589793 ) );
* // returns '01000000010010010000111111011011'
*
* @example
* var str = toBinaryStringf( toFloat32( -1e38 ) );
* // returns '11111110100101100111011010011001'
*
* @example
* var toFloat32 = require( '@stdlib/number/float64/base/to-float32' );
* var str = toBinaryStringf( toFloat32( -3.14e-39 ) );
* // returns '10000000001000100011000100001011'
*
* @example
* var toFloat32 = require( '@stdlib/number/float64/base/to-float32' );
* var str = toBinaryStringf( toFloat32( 1.4e-45 ) );
* // returns '00000000000000000000000000000001'
*
* @example
* var str = toBinaryStringf( 0.0 );
* // returns '00000000000000000000000000000000'
*
* @example
* var str = toBinaryStringf( -0.0 );
* // returns '10000000000000000000000000000000'
*
* @example
* var str = toBinaryStringf( NaN );
* // returns '01111111110000000000000000000000'
*
* @example
* var PINF = require( '@stdlib/constants/math/float32-pinf' );
* var str = toBinaryStringf( PINF );
* // returns '01111111100000000000000000000000'
*
* @example
* var NINF = require( '@stdlib/constants/math/float32-ninf' );
* var str = toBinaryStringf( NINF );
* // returns '11111111100000000000000000000000'
*/
function toBinaryStringf( x ) {
	var nbits;
	var sign;
	var str;
	var exp;
	var n;
	var f;
	var i;

	// Check for a negative value or negative zero...
	if ( x < 0.0 || 1.0/x === NINF ) {
		sign = '1';
	} else {
		sign = '0';
	}
	// Special case: +-infinity
	if ( x === PINF || x === NINF ) {
		// Based on IEEE 754-2008...
		exp = repeat( '1', NUM_EXPONENT_BITS ); // all 1s
		str = repeat( '0', NUM_SIGNIFICAND_BITS ); // all 0s
		return sign + exp + str;
	}
	// Special case: NaN
	if ( x !== x ) {
		// Based on IEEE 754-2008...
		exp = repeat( '1', NUM_EXPONENT_BITS ); // all 1s
		str = '1' + repeat( '0', NUM_SIGNIFICAND_BITS-1 ); // can't be all 0s
		return sign + exp + str;
	}
	// Special case: +-0
	if ( x === 0.0 ) {
		// Based on IEEE 754-2008...
		exp = repeat( '0', NUM_EXPONENT_BITS ); // all 0s
		str = repeat( '0', NUM_SIGNIFICAND_BITS ); // all 0s
		return sign + exp + str;
	}
	x = abs( x );

	// Isolate the integer part (digits before the decimal):
	n = floor( x );

	// Isolate the fractional part (digits after the decimal):
	f = x - n;

	// Convert the integer and fractional parts to bit strings:
	n = div2( n );
	f = mult2( f );

	// Determine the exponent needed to normalize the integer+fractional parts...
	if ( n ) {
		// Move the decimal `d` digits to the left:
		exp = n.length - 1;
	} else {
		// Find the first '1' bit...
		for ( i = 0; i < f.length; i++ ) {
			if ( f[ i ] === '1' ) {
				nbits = i + 1;
				break;
			}
		}
		// Move the decimal `d` digits to the right:
		exp = -nbits;
	}
	// Normalize the combined integer+fractional string...
	str = n + f;
	if ( exp < 0 ) {
		// Handle subnormals...
		if ( exp <= -BIAS ) {
			// Cap the number of bits removed:
			nbits = BIAS - 1;
		}
		// Remove all leading zeros and the first '1' for normal values, and, for subnormals, remove at most BIAS-1 leading bits:
		str = str.substring( nbits );
	} else {
		// Remove the leading '1' (implicit/hidden bit):
		str = str.substring( 1 );
	}
	// Convert the exponent to a bit string:
	exp = div2( exp + BIAS );
	exp = lpad( exp, NUM_EXPONENT_BITS, '0' );

	// Fill in any trailing zeros and ensure we have only 23 fraction bits:
	str = rpad( str, NUM_SIGNIFICAND_BITS, '0' ).substring( 0, NUM_SIGNIFICAND_BITS );

	// Return a bit representation:
	return sign + exp + str;
}


// EXPORTS //

module.exports = toBinaryStringf;

},{"./div2.js":143,"./mult2.js":146,"@stdlib/constants/math/float32-exponent-bias":80,"@stdlib/constants/math/float32-ninf":81,"@stdlib/constants/math/float32-pinf":82,"@stdlib/math/base/special/abs":111,"@stdlib/math/base/special/floor":117,"@stdlib/string/left-pad":173,"@stdlib/string/repeat":175,"@stdlib/string/right-pad":177}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var MAX_ITER = 149; // 127+22 (subnormals) => BIAS+NUM_SIGNFICAND_BITS-1
var MAX_BITS = 24; // only 23 bits for fraction


// MAIN //

/**
* Converts a fraction to a literal bit representation using the multiply-by-2 algorithm.
*
* @private
* @param {number} x - number less than 1
* @returns {BinaryString} bit representation
*
* @example
* var v = mult2( 0.234375 );
* // returns '001111'
*
* @example
* var v = mult2( 0.0 );
* // returns ''
*/
function mult2( x ) {
	var str;
	var y;
	var i;
	var j;

	str = '';
	if ( x === 0.0 ) {
		return str;
	}
	j = MAX_ITER;

	// Each time we multiply by 2 and find a ones digit, add a '1'; otherwise, add a '0'..
	for ( i = 0; i < MAX_ITER; i++ ) {
		y = x * 2.0;
		if ( y >= 1.0 ) {
			x = y - 1.0;
			str += '1';
			if ( j === MAX_ITER ) {
				j = i; // first '1'
			}
		} else {
			x = y;
			str += '0';
		}
		// Stop when we have no more decimals to process or in the event we found a fraction which cannot be represented in a finite number of bits...
		if ( y === 1.0 || i-j > MAX_BITS ) {
			break;
		}
	}

	return str;
}


// EXPORTS //

module.exports = mult2;

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

},{"./main.js":148}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var EXP_MASK = require( '@stdlib/constants/math/float64-high-word-exponent-mask' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );


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

},{"@stdlib/constants/math/float64-exponent-bias":83,"@stdlib/constants/math/float64-high-word-exponent-mask":84,"@stdlib/number/float64/base/get-high-word":153}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":151}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":54}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":150,"@stdlib/array/float64":5,"@stdlib/array/uint32":10}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":54}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":154}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":152,"@stdlib/array/float64":5,"@stdlib/array/uint32":10}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":156}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var out = normalize( new Array( 2 ), 3.14e-319 );
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
* var out = normalize( new Array( 2 ), 0.0 );
* // returns [ 0.0, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), NaN );
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

},{"./normalize.js":157}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/math/float64-smallest-normal' );
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
* var out = normalize( new Array( 2 ), 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( new Array( 2 ), 0.0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( new Array( 2 ), Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), NaN );
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

},{"@stdlib/constants/math/float64-smallest-normal":92,"@stdlib/math/base/assert/is-infinite":98,"@stdlib/math/base/assert/is-nan":102,"@stdlib/math/base/special/abs":111}],158:[function(require,module,exports){
arguments[4][152][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":54,"dup":152}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":160}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":158,"@stdlib/array/float64":5,"@stdlib/array/uint32":10}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var PINF = require( '@stdlib/constants/math/float64-pinf' );
* var NINF = require( '@stdlib/constants/math/float64-ninf' );
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

},{"./main.js":163}],162:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":54}],163:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var PINF = require( '@stdlib/constants/math/float64-pinf' );
* var NINF = require( '@stdlib/constants/math/float64-ninf' );
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

},{"./low.js":162,"@stdlib/array/float64":5,"@stdlib/array/uint32":10}],164:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":165,"./polyfill.js":166}],165:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],166:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/array/float32":2}],167:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Split a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
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

},{"./main.js":169}],168:[function(require,module,exports){
arguments[4][150][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":54,"dup":150}],169:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Splits a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
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

},{"./to_words.js":170}],170:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Splits a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
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

},{"./indices.js":168,"@stdlib/array/float64":5,"@stdlib/array/uint32":10}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":172}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Left pad a string such that the padded string has a length of at least `len`.
*
* @module @stdlib/string/left-pad
*
* @example
* var lpad = require( '@stdlib/string/left-pad' );
*
* var str = lpad( 'a', 5 );
* // returns '    a'
*
* str = lpad( 'beep', 10, 'b' );
* // returns 'bbbbbbbeep'
*
* str = lpad( 'boop', 12, 'beep' );
* // returns 'beepbeepboop'
*/

// MODULES //

var lpad = require( './left_pad.js' );


// EXPORTS //

module.exports = lpad;

},{"./left_pad.js":174}],174:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var repeat = require( '@stdlib/string/repeat' );
var ceil = require( '@stdlib/math/base/special/ceil' );
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/math/float64-max-safe-integer' );


// MAIN //

/**
* Left pads a string such that the padded string has a length of at least `len`.
*
* @param {string} str - string to pad
* @param {NonNegativeInteger} len - minimum string length
* @param {string} [pad=' '] - string used to pad
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {TypeError} third argument must be a string
* @throws {RangeError} padding must have a length greater than `0`
* @returns {string} padded string
*
* @example
* var str = lpad( 'a', 5 );
* // returns '    a'
*
* @example
* var str = lpad( 'beep', 10, 'b' );
* // returns 'bbbbbbbeep'
*
* @example
* var str = lpad( 'boop', 12, 'beep' );
* // returns 'beepbeepboop'
*/
function lpad( str, len, pad ) {
	var n;
	var p;
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. First argument must be a string. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( 'invalid argument. Second argument must be a nonnegative integer. Value: `' + len + '`.' );
	}
	if ( arguments.length > 2 ) {
		p = pad;
		if ( !isString( p ) ) {
			throw new TypeError( 'invalid argument. Third argument must be a string. Value: `' + p + '`.' );
		}
		if ( p.length === 0 ) {
			throw new RangeError( 'invalid argument. Third argument must not be an empty string.' );
		}
	} else {
		p = ' ';
	}
	if ( len > FLOAT64_MAX_SAFE_INTEGER ) {
		throw new RangeError( 'invalid argument. Output string length exceeds maximum allowed string length.' );
	}
	n = ( len - str.length ) / p.length;
	if ( n <= 0 ) {
		return str;
	}
	n = ceil( n );
	return repeat( p, n ) + str;
}


// EXPORTS //

module.exports = lpad;

},{"@stdlib/assert/is-nonnegative-integer":56,"@stdlib/assert/is-string":68,"@stdlib/constants/math/float64-max-safe-integer":88,"@stdlib/math/base/special/ceil":113,"@stdlib/string/repeat":175}],175:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Repeat a string a specified number of times and return the concatenated result.
*
* @module @stdlib/string/repeat
*
* @example
* var replace = require( '@stdlib/string/repeat' );
*
* var str = repeat( 'a', 5 );
* // returns 'aaaaa'
*
* str = repeat( '', 100 );
* // returns ''
*
* str = repeat( 'beep', 0 );
* // returns ''
*/

// MODULES //

var repeat = require( './repeat.js' );


// EXPORTS //

module.exports = repeat;

},{"./repeat.js":176}],176:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/math/float64-max-safe-integer' );


// MAIN //

/**
* Repeats a string a specified number of times and returns the concatenated result.
*
* ## Methods
*
* The algorithmic trick used in the implementation is to treat string concatenation the same as binary addition (i.e., any natural number (nonnegative integer) can be expressed as a sum of powers of two).
*
* For example,
*
* ```text
* n = 10 => 1010 => 2^3 + 2^0 + 2^1 + 2^0
* ```
*
* We can produce a 10-repeat string by "adding" the results of a 8-repeat string and a 2-repeat string.
*
* The implementation is then as follows:
*
* 1.  Let `s` be the string to be repeated and `o` be an output string.
*
* 2.  Initialize an output string `o`.
*
* 3.  Check the least significant bit to determine if the current `s` string should be "added" to the output "total".
*
*     -   if the bit is a one, add
*     -   otherwise, move on
*
* 4.  Double the string `s` by adding `s` to `s`.
*
* 5.  Right-shift the bits of `n`.
*
* 6.  Check if we have shifted off all bits.
*
*     -   if yes, done.
*     -   otherwise, move on
*
* 7.  Repeat 3-6.
*
* The result is that, as the string is repeated, we continually check to see if the doubled string is one which we want to add to our "total".
*
* The algorithm runs in `O(log_2(n))` compared to `O(n)`.
*
*
* @param {string} str - string to repeat
* @param {NonNegativeInteger} n - number of times to repeat the string
* @throws {TypeError} first argument must be a string primitive
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {RangeError} output string length must not exceed maximum allowed string length
* @returns {string} repeated string
*
* @example
* var str = repeat( 'a', 5 );
* // returns 'aaaaa'
*
* @example
* var str = repeat( '', 100 );
* // returns ''
*
* @example
* var str = repeat( 'beep', 0 );
* // returns ''
*/
function repeat( str, n ) {
	var rpt;
	var cnt;
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. First argument must be a string. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( n ) ) {
		throw new TypeError( 'invalid argument. Second argument must be a nonnegative integer. Value: `' + n + '`.' );
	}
	if ( str.length === 0 || n === 0 ) {
		return '';
	}
	// Check that output string will not exceed the maximum string length:
	if ( str.length * n > FLOAT64_MAX_SAFE_INTEGER ) {
		throw new RangeError( 'invalid argument. Output string length exceeds maximum allowed string length.' );
	}
	rpt = '';
	cnt = n;
	for ( ; ; ) {
		// If the count is odd, append the current concatenated string:
		if ( (cnt&1) === 1 ) {
			rpt += str;
		}
		// Right-shift the bits:
		cnt >>>= 1;
		if ( cnt === 0 ) {
			break;
		}
		// Double the string:
		str += str;
	}
	return rpt;
}


// EXPORTS //

module.exports = repeat;

},{"@stdlib/assert/is-nonnegative-integer":56,"@stdlib/assert/is-string":68,"@stdlib/constants/math/float64-max-safe-integer":88}],177:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Right pad a string such that the padded string has a length of at least `len`.
*
* @module @stdlib/string/right-pad
*
* @example
* var rpad = require( '@stdlib/string/right-pad' );
*
* var str = rpad( 'a', 5 );
* // returns 'a    '
*
* str = rpad( 'beep', 10, 'p' );
* // returns 'beeppppppp'
*
* str = rpad( 'beep', 12, 'boop' );
* // returns 'beepboopboop'
*/

// MODULES //

var rpad = require( './right_pad.js' );


// EXPORTS //

module.exports = rpad;

},{"./right_pad.js":178}],178:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var repeat = require( '@stdlib/string/repeat' );
var ceil = require( '@stdlib/math/base/special/ceil' );
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/math/float64-max-safe-integer' );


// MAIN //

/**
* Right pads a string such that the padded string has a length of at least `len`.
*
* @param {string} str - string to pad
* @param {NonNegativeInteger} len - minimum string length
* @param {string} [pad=' '] - string used to pad
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {TypeError} third argument must be a string
* @throws {RangeError} padding must have a length greater than `0`
* @returns {string} padded string
*
* @example
* var str = rpad( 'a', 5 );
* // returns 'a    '
*
* @example
* var str = rpad( 'beep', 10, 'p' );
* // returns 'beeppppppp'
*
* @example
* var str = rpad( 'beep', 12, 'boop' );
* // returns 'beepboopboop'
*/
function rpad( str, len, pad ) {
	var n;
	var p;
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. First argument must be a string. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( 'invalid argument. Second argument must be a nonnegative integer. Value: `' + len + '`.' );
	}
	if ( arguments.length > 2 ) {
		p = pad;
		if ( !isString( p ) ) {
			throw new TypeError( 'invalid argument. Third argument must be a string. Value: `' + p + '`.' );
		}
		if ( p.length === 0 ) {
			throw new RangeError( 'invalid argument. Pad string must not be an empty string.' );
		}
	} else {
		p = ' ';
	}
	if ( len > FLOAT64_MAX_SAFE_INTEGER ) {
		throw new RangeError( 'invalid argument. Output string length exceeds maximum allowed string length.' );
	}
	n = ( len - str.length ) / p.length;
	if ( n <= 0 ) {
		return str;
	}
	n = ceil( n );
	return str + repeat( p, n );
}


// EXPORTS //

module.exports = rpad;

},{"@stdlib/assert/is-nonnegative-integer":56,"@stdlib/assert/is-string":68,"@stdlib/constants/math/float64-max-safe-integer":88,"@stdlib/math/base/special/ceil":113,"@stdlib/string/repeat":175}],179:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":180}],180:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":182}],181:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],182:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var hasDefinePropertySupport = require( '@stdlib/assert/has-define-property-support' );
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

},{"./builtin.js":181,"./polyfill.js":183,"@stdlib/assert/has-define-property-support":17}],183:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

var hasProperty = require( '@stdlib/assert/has-property' );
var isObject = require( '@stdlib/assert/is-object' );


// VARIABLES //

var objectProtoype = Object.prototype;
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

	if ( !isObject( obj ) ) {
		throw new TypeError( 'invalid argument. First argument must be an object. Value: `' + obj + '`.' );
	}
	if ( !isObject( descriptor ) ) {
		throw new TypeError( 'invalid argument. Property descriptor must be an object. Value: `' + descriptor + '`.' );
	}
	hasValue = hasProperty( descriptor, 'value' );
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
	hasGet = hasProperty( descriptor, 'get' );
	hasSet = hasProperty( descriptor, 'set' );

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

},{"@stdlib/assert/has-property":27,"@stdlib/assert/is-object":66}],184:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":185,"./polyfill.js":186,"@stdlib/assert/has-tostringtag-support":31}],185:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":187}],186:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":187,"./tostringtag.js":188,"@stdlib/assert/has-own-property":25}],187:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],188:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){

},{}],191:[function(require,module,exports){
arguments[4][190][0].apply(exports,arguments)
},{"dup":190}],192:[function(require,module,exports){
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
},{"base64-js":189,"buffer":192,"ieee754":218}],193:[function(require,module,exports){
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
},{"../../insert-module-globals/node_modules/is-buffer/index.js":220}],194:[function(require,module,exports){
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

},{"./lib/is_arguments.js":195,"./lib/keys.js":196}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],197:[function(require,module,exports){
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

},{"object-keys":225}],198:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],199:[function(require,module,exports){
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

},{"function-bind":214,"has-symbols":215}],200:[function(require,module,exports){
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

},{"./GetIntrinsic":199,"./helpers/assertRecord":201,"./helpers/callBound":203,"./helpers/isFinite":204,"./helpers/isNaN":205,"./helpers/isPrefixOf":206,"./helpers/isPropertyDescriptor":207,"./helpers/mod":208,"./helpers/sign":209,"es-to-primitive/es5":210,"has":217,"is-callable":221}],201:[function(require,module,exports){
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

},{"../GetIntrinsic":199,"has":217}],202:[function(require,module,exports){
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

},{"../GetIntrinsic":199,"function-bind":214}],203:[function(require,module,exports){
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

},{"../GetIntrinsic":199,"./callBind":202}],204:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],205:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],206:[function(require,module,exports){
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

},{"../helpers/callBound":203}],207:[function(require,module,exports){
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

},{"../GetIntrinsic":199,"has":217}],208:[function(require,module,exports){
'use strict';

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],209:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],210:[function(require,module,exports){
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

},{"./helpers/isPrimitive":211,"is-callable":221}],211:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":213}],215:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":214}],218:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
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

},{}],222:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],223:[function(require,module,exports){
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

},{}],224:[function(require,module,exports){
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

},{"./isArguments":226}],225:[function(require,module,exports){
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

},{"./implementation":224,"./isArguments":226}],226:[function(require,module,exports){
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

},{}],227:[function(require,module,exports){
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
},{"_process":229}],228:[function(require,module,exports){
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
},{"_process":229}],229:[function(require,module,exports){
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

},{}],230:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":231}],231:[function(require,module,exports){
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
},{"./_stream_readable":233,"./_stream_writable":235,"core-util-is":193,"inherits":219,"process-nextick-args":228}],232:[function(require,module,exports){
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
},{"./_stream_transform":234,"core-util-is":193,"inherits":219}],233:[function(require,module,exports){
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
},{"./_stream_duplex":231,"./internal/streams/BufferList":236,"./internal/streams/destroy":237,"./internal/streams/stream":238,"_process":229,"core-util-is":193,"events":212,"inherits":219,"isarray":222,"process-nextick-args":228,"safe-buffer":244,"string_decoder/":250,"util":190}],234:[function(require,module,exports){
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
},{"./_stream_duplex":231,"core-util-is":193,"inherits":219}],235:[function(require,module,exports){
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
},{"./_stream_duplex":231,"./internal/streams/destroy":237,"./internal/streams/stream":238,"_process":229,"core-util-is":193,"inherits":219,"process-nextick-args":228,"safe-buffer":244,"timers":257,"util-deprecate":258}],236:[function(require,module,exports){
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
},{"safe-buffer":244,"util":190}],237:[function(require,module,exports){
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
},{"process-nextick-args":228}],238:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":212}],239:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":240}],240:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":231,"./lib/_stream_passthrough.js":232,"./lib/_stream_readable.js":233,"./lib/_stream_transform.js":234,"./lib/_stream_writable.js":235}],241:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":240}],242:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":235}],243:[function(require,module,exports){
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
},{"_process":229,"through":256,"timers":257}],244:[function(require,module,exports){
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

},{"buffer":192}],245:[function(require,module,exports){
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

},{"events":212,"inherits":219,"readable-stream/duplex.js":230,"readable-stream/passthrough.js":239,"readable-stream/readable.js":240,"readable-stream/transform.js":241,"readable-stream/writable.js":242}],246:[function(require,module,exports){
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

},{"es-abstract/es5":200,"function-bind":214}],247:[function(require,module,exports){
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

},{"./implementation":246,"./polyfill":248,"./shim":249,"define-properties":197,"function-bind":214}],248:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":246}],249:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":248,"define-properties":197}],250:[function(require,module,exports){
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
},{"safe-buffer":244}],251:[function(require,module,exports){
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
},{"./lib/default_stream":252,"./lib/results":254,"./lib/test":255,"_process":229,"defined":198,"through":256,"timers":257}],252:[function(require,module,exports){
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
},{"_process":229,"fs":191,"through":256}],253:[function(require,module,exports){
(function (process,setImmediate){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":229,"timers":257}],254:[function(require,module,exports){
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
},{"_process":229,"events":212,"function-bind":214,"has":217,"inherits":219,"object-inspect":223,"resumer":243,"through":256,"timers":257}],255:[function(require,module,exports){
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
},{"./next_tick":253,"deep-equal":194,"defined":198,"events":212,"has":217,"inherits":219,"path":227,"string.prototype.trim":247}],256:[function(require,module,exports){
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
},{"_process":229,"stream":245}],257:[function(require,module,exports){
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
},{"process/browser.js":229,"timers":257}],258:[function(require,module,exports){
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
},{}]},{},[142]);
