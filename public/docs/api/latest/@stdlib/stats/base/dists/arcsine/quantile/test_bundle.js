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
* Create a filled "generic" array.
*
* @module @stdlib/array/base/filled
*
* @example
* var filled = require( '@stdlib/array/base/filled' );
*
* var out = filled( 0.0, 3 );
* // returns [ 0.0, 0.0, 0.0 ]
*
* @example
* var filled = require( '@stdlib/array/base/filled' );
*
* var out = filled( 'beep', 3 );
* // returns [ 'beep', 'beep', 'beep' ]
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":2}],2:[function(require,module,exports){
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
* Returns a filled "generic" array.
*
* @param {*} value - fill value
* @param {NonNegativeInteger} len - array length
* @returns {Array} filled array
*
* @example
* var out = filled( 0.0, 3 );
* // returns [ 0.0, 0.0, 0.0 ]
*
* @example
* var out = filled( 'beep', 3 );
* // returns [ 'beep', 'beep', 'beep' ]
*/
function filled( value, len ) {
	var arr;
	var i;

	// Manually push elements in order to ensure "fast" elements...
	arr = [];
	for ( i = 0; i < len; i++ ) {
		arr.push( value );
	}
	return arr;
}


// EXPORTS //

module.exports = filled;

},{}],3:[function(require,module,exports){
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
* Create a zero-filled "generic" array.
*
* @module @stdlib/array/base/zeros
*
* @example
* var zeros = require( '@stdlib/array/base/zeros' );
*
* var out = zeros( 3 );
* // returns [ 0.0, 0.0, 0.0 ]
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":4}],4:[function(require,module,exports){
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

var filled = require( '@stdlib/array/base/filled' );


// MAIN //

/**
* Returns a zero-filled "generic" array.
*
* @param {NonNegativeInteger} len - array length
* @returns {Array} output array
*
* @example
* var out = zeros( 3 );
* // returns [ 0.0, 0.0, 0.0 ]
*/
function zeros( len ) {
	return filled( 0.0, len );
}


// EXPORTS //

module.exports = zeros;

},{"@stdlib/array/base/filled":1}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var builtin = require( './main.js' );
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

},{"./main.js":6,"./polyfill.js":7,"@stdlib/assert/has-float64array-support":18}],6:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var builtin = require( './main.js' );
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

},{"./main.js":9,"./polyfill.js":10,"@stdlib/assert/has-uint16array-support":26}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var builtin = require( './main.js' );
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

},{"./main.js":12,"./polyfill.js":13,"@stdlib/assert/has-uint32array-support":29}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var builtin = require( './main.js' );
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

},{"./main.js":15,"./polyfill.js":16,"@stdlib/assert/has-uint8array-support":32}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var main = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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

},{"./float64array.js":17,"@stdlib/assert/is-float64array":35}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/assert/has-symbol-support":22}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint16array.js":28,"@stdlib/assert/is-uint16array":40,"@stdlib/constants/uint16/max":61}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":31,"@stdlib/assert/is-uint32array":42,"@stdlib/constants/uint32/max":62}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":33}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint8array.js":34,"@stdlib/assert/is-uint8array":44,"@stdlib/constants/uint8/max":63}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":36}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":170}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/array/uint16":8,"@stdlib/array/uint8":14}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ctors.js":37}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":170}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":170}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":170}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* One half times the mathematical constant `π`.
*
* @module @stdlib/constants/float64/half-pi
* @type {number}
*
* @example
* var HALF_PI = require( '@stdlib/constants/float64/half-pi' );
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

},{}],49:[function(require,module,exports){
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
* High word mask for excluding the sign bit of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/high-word-abs-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
* // returns 2147483647
*/


// MAIN //

/**
* High word mask for excluding the sign bit of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for excluding the sign bit of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2147483647 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 11111111111 11111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 0x7fffffff
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_ABS_MASK = 0x7fffffff>>>0; // eslint-disable-line id-length


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_ABS_MASK;

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

},{}],51:[function(require,module,exports){
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
* High word mask for the sign bit of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/high-word-sign-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_SIGN_MASK = require( '@stdlib/constants/float64/high-word-sign-mask' );
* // returns 2147483648
*/


// MAIN //

/**
* High word mask for the sign bit of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the sign bit of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2147483648 \\), which corresponds to the bit sequence
*
* ```binarystring
* 1 00000000000 00000000000000000000
* ```
*
* @constant
* @type {uinteger32}
* @default 0x80000000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_SIGN_MASK = 0x80000000>>>0; // eslint-disable-line id-length


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_SIGN_MASK;

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
* High word mask for the significand of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/high-word-significand-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = require( '@stdlib/constants/float64/high-word-significand-mask' );
* // returns 1048575
*/


// MAIN //

/**
* High word mask for the significand of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the significand of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 1048575 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 00000000000 11111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 0x000fffff
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = 0x000fffff;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_SIGNIFICAND_MASK;

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

},{"@stdlib/number/ctor":109}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Number of significand bits in the high word of a double-precision floating-point number.
*
* @module @stdlib/constants/float64/num-high-word-significand-bits
* @type {integer32}
*
* @example
* var FLOAT64_NUM_HIGH_WORD_SIGNIFICAND_BITS = require( '@stdlib/constants/float64/num-high-word-significand-bits' );
* // returns 20
*/


// MAIN //

/**
* Number of significand bits in the high word of a double-precision floating-point number.
*
* @constant
* @type {integer32}
* @default 20
*/
var FLOAT64_NUM_HIGH_WORD_SIGNIFICAND_BITS = 20|0; // eslint-disable-line id-length


// EXPORTS //

module.exports = FLOAT64_NUM_HIGH_WORD_SIGNIFICAND_BITS;

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

},{}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/math/base/assert/is-integer":68}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/constants/float64/ninf":57,"@stdlib/constants/float64/pinf":59}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/math/base/special/floor":78}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

/**
* Test if a finite double-precision floating-point number is an odd number.
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var isEven = require( '@stdlib/math/base/assert/is-even' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is an odd number.
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

},{"@stdlib/math/base/assert/is-even":64}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":75}],75:[function(require,module,exports){
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

var SIGN_MASK = require( '@stdlib/constants/float64/high-word-sign-mask' );
var ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

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
	toWords.assign( x, WORDS, 1, 0 );
	hx = WORDS[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= ABS_MASK;

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

},{"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/constants/float64/high-word-sign-mask":51,"@stdlib/number/float64/base/from-words":113,"@stdlib/number/float64/base/get-high-word":117,"@stdlib/number/float64/base/to-words":132}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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
* Compute the cosine of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-cos
*
* @example
* var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
*
* var v = kernelCos( 0.0, 0.0 );
* // returns ~1.0
*
* v = kernelCos( 3.141592653589793/6.0, 0.0 );
* // returns ~0.866
*
* v = kernelCos( 0.785, -1.144e-17 );
* // returns ~0.707
*
* v = kernelCos( NaN, 0.0 );
* // returns NaN
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
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/12.2.0/lib/msun/src/k_cos.c}. The implementation follows the original, but has been modified for JavaScript.
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

var polyval13 = require( './polyval_c13.js' );
var polyval46 = require( './polyval_c46.js' );


// MAIN //

/**
* Computes the cosine on \\( \[-\pi/4, \pi/4] \\), where \\( \pi/4 \approx 0.785398164 \\).
*
* ## Method
*
* -   Since \\( \cos(-x) = \cos(x) \\), we need only to consider positive \\(x\\).
*
* -   If \\( x < 2^{-27} \\), return \\(1\\) which is inexact if \\( x \ne 0 \\).
*
* -   \\( cos(x) \\) is approximated by a polynomial of degree \\(14\\) on \\( \[0,\pi/4] \\).
*
*     ```tex
*     \cos(x) \approx 1 - \frac{x \cdot x}{2} + C_1 \cdot x^4 + \ldots + C_6 \cdot x^{14}
*     ```
*
*     where the Remez error is
*
*     ```tex
*     \left| \cos(x) - \left( 1 - \frac{x^2}{2} + C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{15} \right) \right| \le 2^{-58}
*     ```
*
* -   Let \\( C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{14} \\), then
*
*     ```tex
*     \cos(x) \approx 1 - \frac{x \cdot x}{2} + r
*     ```
*
*     Since
*
*     ```tex
*     \cos(x+y) \approx \cos(x) - \sin(x) \cdot y \approx \cos(x) - x \cdot y
*     ```
*
*     a correction term is necessary in \\( \cos(x) \\). Hence,
*
*     ```tex
*     \cos(x+y) = 1 - \left( \frac{x \cdot x}{2} - (r - x \cdot y) \right)
*     ```
*
*     For better accuracy, rearrange to
*
*     ```tex
*     \cos(x+y) \approx w + \left( t + ( r - x \cdot y ) \right)
*     ```
*
*     where \\( w = 1 - \frac{x \cdot x}{2} \\) and \\( t \\) is a tiny correction term (\\( 1 - \frac{x \cdot x}{2} = w + t \\) exactly in infinite precision). The exactness of \\(w + t\\) in infinite precision depends on \\(w\\) and \\(t\\) having the same precision as \\(x\\).
*
* @param {number} x - input value (in radians, assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of `x`
* @returns {number} cosine
*
* @example
* var v = kernelCos( 0.0, 0.0 );
* // returns ~1.0
*
* @example
* var v = kernelCos( 3.141592653589793/6.0, 0.0 );
* // returns ~0.866
*
* @example
* var v = kernelCos( 0.785, -1.144e-17 );
* // returns ~0.707
*
* @example
* var v = kernelCos( NaN, 0.0 );
* // returns NaN
*/
function kernelCos( x, y ) {
	var hz;
	var r;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = z * polyval13( z );
	r += w * w * polyval46( z );
	hz = 0.5 * z;
	w = 1.0 - hz;
	return w + ( ((1.0-w) - hz) + ((z*r) - (x*y)) );
}


// EXPORTS //

module.exports = kernelCos;

},{"./polyval_c13.js":82,"./polyval_c46.js":83}],82:[function(require,module,exports){
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
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.0416666666666666;
	}
	return 0.0416666666666666 + (x * (-0.001388888888887411 + (x * 0.00002480158728947673))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],83:[function(require,module,exports){
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
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -2.7557314351390663e-7;
	}
	return -2.7557314351390663e-7 + (x * (2.087572321298175e-9 + (x * -1.1359647557788195e-11))); // eslint-disable-line max-len
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
* Compute the sine of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-sin
*
* @example
* var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
*
* var v = kernelSin( 0.0, 0.0 );
* // returns ~0.0
*
* v = kernelSin( 3.141592653589793/6.0, 0.0 );
* // returns ~0.5
*
* v = kernelSin( 0.619, 9.279e-18 );
* // returns ~0.581
*
* v = kernelSin( NaN, 0.0 );
* // returns NaN
*
* v = kernelSin( 3.0, NaN );
* // returns NaN
*
* v = kernelSin( NaN, NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_sin.c}. The implementation follows the original, but has been modified for JavaScript.
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

// VARIABLES //

var S1 = -1.66666666666666324348e-01; // 0xBFC55555, 0x55555549
var S2 = 8.33333333332248946124e-03;  // 0x3F811111, 0x1110F8A6
var S3 = -1.98412698298579493134e-04; // 0xBF2A01A0, 0x19C161D5
var S4 = 2.75573137070700676789e-06;  // 0x3EC71DE3, 0x57B1FE7D
var S5 = -2.50507602534068634195e-08; // 0xBE5AE5E6, 0x8A2B9CEB
var S6 = 1.58969099521155010221e-10;  // 0x3DE5D93A, 0x5ACFD57C


// MAIN //

/**
* Computes the sine on \\( \approx \[-\pi/4, \pi/4] \\) (except on \\(-0\\)), where \\( \pi/4 \approx 0.7854 \\).
*
* ## Method
*
* -   Since \\( \sin(-x) = -\sin(x) \\), we need only to consider positive \\(x\\).
*
* -   Callers must return \\( \sin(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\(-0\\). Callers may do the optimization \\( \sin(x) \approx x \\) for tiny \\(x\\).
*
* -   \\( \sin(x) \\) is approximated by a polynomial of degree \\(13\\) on \\( \left\[0,\tfrac{pi}{4}\right] \\)
*
*     ```tex
*     \sin(x) \approx x + S_1 \cdot x^3 + \ldots + S_6 \cdot x^{13}
*     ```
*
*     where
*
*     ```tex
*     \left| \frac{\sin(x)}{x} \left( 1 + S_1 \cdot x + S_2 \cdot x + S_3 \cdot x + S_4 \cdot x + S_5 \cdot x + S_6 \cdot x \right) \right| \le 2^{-58}
*     ```
*
* -   We have
*
*     ```tex
*     \sin(x+y) = \sin(x) + \sin'(x') \cdot y \approx \sin(x) + (1-x*x/2) \cdot y
*     ```
*
*     For better accuracy, let
*
*     ```tex
*     r = x^3 * \left( S_2 + x^2 \cdot \left( S_3 + x^2 * \left( S_4 + x^2 \cdot ( S_5+x^2 \cdot S_6 ) \right) \right) \right)
*     ```
*
*     then
*
*     ```tex
*     \sin(x) = x + \left( S_1 \cdot x + ( x \cdot (r-y/2) + y ) \right)
*     ```
*
* @param {number} x - input value (in radians, assumed to be bounded by `~pi/4` in magnitude)
* @param {number} y - tail of `x`
* @returns {number} sine
*
* @example
* var v = kernelSin( 0.0, 0.0 );
* // returns ~0.0
*
* @example
* var v = kernelSin( 3.141592653589793/6.0, 0.0 );
* // returns ~0.5
*
* @example
* var v = kernelSin( 0.619, 9.279e-18 );
* // returns ~0.58
*
* @example
* var v = kernelSin( NaN, 0.0 );
* // returns NaN
*
* @example
* var v = kernelSin( 3.0, NaN );
* // returns NaN
*
* @example
* var v = kernelSin( NaN, NaN );
* // returns NaN
*/
function kernelSin( x, y ) {
	var r;
	var v;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = S2 + (z * (S3 + (z*S4))) + (z * w * (S5 + (z*S6)));
	v = z * x;
	if ( y === 0.0 ) {
		return x + (v * (S1 + (z*r)));
	}
	return x - (((z*((0.5*y) - (v*r))) - y) - (v*S1));
}


// EXPORTS //

module.exports = kernelSin;

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

},{"./main.js":87}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var normalize = require( '@stdlib/number/float64/base/normalize' ).assign;
var floatExp = require( '@stdlib/number/float64/base/exponent' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111 => 2148532223
var CLEAR_EXP_MASK = 0x800fffff>>>0; // asm type annotation

// Normalization workspace:
var FRAC = [ 0.0, 0.0 ];

// High/low words workspace:
var WORDS = [ 0, 0 ];


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
	normalize( frac, FRAC, 1, 0 );
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
	toWords.assign( frac, WORDS, 1, 0 );
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

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/max-base2-exponent":55,"@stdlib/constants/float64/max-base2-exponent-subnormal":54,"@stdlib/constants/float64/min-base2-exponent-subnormal":56,"@stdlib/constants/float64/ninf":57,"@stdlib/constants/float64/pinf":59,"@stdlib/math/base/assert/is-infinite":66,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/special/copysign":76,"@stdlib/number/float64/base/exponent":111,"@stdlib/number/float64/base/from-words":113,"@stdlib/number/float64/base/normalize":123,"@stdlib/number/float64/base/to-words":132}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":91}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var HIGH_NUM_SIGNIFICAND_BITS = require( '@stdlib/constants/float64/num-high-word-significand-bits' );
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

},{"./polyval_l.js":92,"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/num-high-word-significand-bits":58,"@stdlib/number/float64/base/get-high-word":117,"@stdlib/number/float64/base/set-high-word":126,"@stdlib/number/float64/base/set-low-word":128}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":94,"@stdlib/number/float64/base/set-low-word":128}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
var xIsZero = require( './x_is_zero.js' );
var yIsHuge = require( './y_is_huge.js' );
var yIsInfinite = require( './y_is_infinite.js' );
var log2ax = require( './log2ax.js' );
var logx = require( './logx.js' );
var pow2 = require( './pow2.js' );


// VARIABLES //

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
var WORDS = [ 0|0, 0|0 ];

// Log workspace:
var LOG_WORKSPACE = [ 0.0, 0.0 ];


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
	toWords.assign( y, WORDS, 1, 0 );
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
	toWords.assign( x, WORDS, 1, 0 );
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
	toWords.assign( z, WORDS, 1, 0 );
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
			// Signal underflow...
			return sx * TINY * TINY;
		}
		if ( lp <= (z-hp) ) {
			// Signal underflow...
			return sx * TINY * TINY;
		}
	}
	// Compute `2^(hp+lp)`...
	z = pow2( j, hp, lp );

	return sx * z;
}


// EXPORTS //

module.exports = pow;

},{"./log2ax.js":89,"./logx.js":90,"./pow2.js":95,"./x_is_zero.js":96,"./y_is_huge.js":97,"./y_is_infinite.js":98,"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/constants/float64/ninf":57,"@stdlib/constants/float64/pinf":59,"@stdlib/math/base/assert/is-infinite":66,"@stdlib/math/base/assert/is-integer":68,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/assert/is-odd":72,"@stdlib/math/base/special/abs":74,"@stdlib/math/base/special/sqrt":107,"@stdlib/number/float64/base/set-low-word":128,"@stdlib/number/float64/base/to-words":132,"@stdlib/number/uint32/base/to-int32":135}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
var ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
var HIGH_SIGNIFICAND_MASK = require( '@stdlib/constants/float64/high-word-significand-mask' );
var HIGH_NUM_SIGNIFICAND_BITS = require( '@stdlib/constants/float64/num-high-word-significand-bits' );
var polyvalP = require( './polyval_p.js' );


// VARIABLES //

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3fe00000 = 1071644672 => 0 01111111110 00000000000000000000 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_BIASED_EXP_NEG_1 = 0x3fe00000|0; // asm type annotation

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

},{"./polyval_p.js":93,"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/constants/float64/high-word-significand-mask":52,"@stdlib/constants/float64/ln-two":53,"@stdlib/constants/float64/num-high-word-significand-bits":58,"@stdlib/math/base/special/ldexp":86,"@stdlib/number/float64/base/get-high-word":117,"@stdlib/number/float64/base/set-high-word":126,"@stdlib/number/float64/base/set-low-word":128,"@stdlib/number/uint32/base/to-int32":135}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":57,"@stdlib/constants/float64/pinf":59,"@stdlib/math/base/assert/is-odd":72,"@stdlib/math/base/special/copysign":76}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

var ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// VARIABLES //

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
			// Signal overflow...
			return HUGE * HUGE;
		}
		// Signal underflow...
		return TINY * TINY;
	}
	// `x` has a biased exponent greater than or equal to `0`...

	if ( y > 0 ) {
		// Signal overflow...
		return HUGE * HUGE;
	}
	// Signal underflow...
	return TINY * TINY;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/number/float64/base/get-high-word":117}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":59,"@stdlib/math/base/special/abs":74}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute `x - nπ/2 = r`.
*
* @module @stdlib/math/base/special/rempio2
*
* @example
* var rempio2 = require( '@stdlib/math/base/special/rempio2' );
*
* var y = [ 0.0, 0.0 ];
* var n = rempio2( 128.0, y );
* // returns 81
*
* var y1 = y[ 0 ];
* // returns ~0.765
*
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*/

// MODULES //

var rempio2 = require( './main.js' );


// EXPORTS //

module.exports = rempio2;

},{"./main.js":101}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
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

/* eslint-disable array-element-newline */

'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var zeros = require( '@stdlib/array/base/zeros' );


// VARIABLES //

/*
* Table of constants for `2/π` (`396` hex digits, `476` decimal).
*
* Integer array which contains the (`24*i`)-th to (`24*i+23`)-th bit of `2/π` after binary point. The corresponding floating value is
*
* ```tex
* \operatorname{ipio2}[i] \cdot 2^{-24(i+1)}
* ```
*
* This table must have at least `(e0-3)/24 + jk` terms. For quad precision (`e0 <= 16360`, `jk = 6`), this is `686`.
*/
var IPIO2 = [
	0xA2F983, 0x6E4E44, 0x1529FC, 0x2757D1, 0xF534DD, 0xC0DB62,
	0x95993C, 0x439041, 0xFE5163, 0xABDEBB, 0xC561B7, 0x246E3A,
	0x424DD2, 0xE00649, 0x2EEA09, 0xD1921C, 0xFE1DEB, 0x1CB129,
	0xA73EE8, 0x8235F5, 0x2EBB44, 0x84E99C, 0x7026B4, 0x5F7E41,
	0x3991D6, 0x398353, 0x39F49C, 0x845F8B, 0xBDF928, 0x3B1FF8,
	0x97FFDE, 0x05980F, 0xEF2F11, 0x8B5A0A, 0x6D1F6D, 0x367ECF,
	0x27CB09, 0xB74F46, 0x3F669E, 0x5FEA2D, 0x7527BA, 0xC7EBE5,
	0xF17B3D, 0x0739F7, 0x8A5292, 0xEA6BFB, 0x5FB11F, 0x8D5D08,
	0x560330, 0x46FC7B, 0x6BABF0, 0xCFBC20, 0x9AF436, 0x1DA9E3,
	0x91615E, 0xE61B08, 0x659985, 0x5F14A0, 0x68408D, 0xFFD880,
	0x4D7327, 0x310606, 0x1556CA, 0x73A8C9, 0x60E27B, 0xC08C6B
];

// Double precision array, obtained by cutting `π/2` into `24` bits chunks...
var PIO2 = [
	1.57079625129699707031e+00, // 0x3FF921FB, 0x40000000
	7.54978941586159635335e-08, // 0x3E74442D, 0x00000000
	5.39030252995776476554e-15, // 0x3CF84698, 0x80000000
	3.28200341580791294123e-22, // 0x3B78CC51, 0x60000000
	1.27065575308067607349e-29, // 0x39F01B83, 0x80000000
	1.22933308981111328932e-36, // 0x387A2520, 0x40000000
	2.73370053816464559624e-44, // 0x36E38222, 0x80000000
	2.16741683877804819444e-51  // 0x3569F31D, 0x00000000
];
var TWO24 = 1.67772160000000000000e+07;  // 0x41700000, 0x00000000
var TWON24 = 5.96046447753906250000e-08; // 0x3E700000, 0x00000000

// Arrays for storing temporary values (note that, in C, this is not thread safe):
var F = zeros( 20 );
var Q = zeros( 20 );
var FQ = zeros( 20 );
var IQ = zeros( 20 );


// FUNCTIONS //

/**
* Performs the computation for `kernelRempio2()`.
*
* @private
* @param {PositiveNumber} x - input value
* @param {(Array|TypedArray|Object)} y - output object for storing double precision numbers
* @param {integer} jz - number of terms of `ipio2[]` used
* @param {Array<integer>} q - array with integral values, representing the 24-bits chunk of the product of `x` and `2/π`
* @param {integer} q0 - the corresponding exponent of `q[0]` (the exponent for `q[i]` would be `q0-24*i`)
* @param {integer} jk - `jk+1` is the initial number of terms of `IPIO2[]` needed in the computation
* @param {integer} jv - index for pointing to the suitable `ipio2[]` for the computation
* @param {integer} jx - `nx - 1`
* @param {Array<number>} f - `IPIO2[]` in floating point
* @returns {number} last three binary digits of `N`
*/
function compute( x, y, jz, q, q0, jk, jv, jx, f ) {
	var carry;
	var fw;
	var ih;
	var jp;
	var i;
	var k;
	var n;
	var j;
	var z;

	// `jp+1` is the number of terms in `PIO2[]` needed:
	jp = jk;

	// Distill `q[]` into `IQ[]` in reverse order...
	z = q[ jz ];
	j = jz;
	for ( i = 0; j > 0; i++ ) {
		fw = ( TWON24 * z )|0;
		IQ[ i ] = ( z - (TWO24*fw) )|0;
		z = q[ j-1 ] + fw;
		j -= 1;
	}
	// Compute `n`...
	z = ldexp( z, q0 );
	z -= 8.0 * floor( z*0.125 ); // Trim off integer >= 8
	n = z|0;
	z -= n;
	ih = 0;
	if ( q0 > 0 ) {
		// Need `IQ[jz-1]` to determine `n`...
		i = ( IQ[ jz-1 ] >> (24-q0) );
		n += i;
		IQ[ jz-1 ] -= ( i << (24-q0) );
		ih = ( IQ[ jz-1 ] >> (23-q0) );
	}
	else if ( q0 === 0 ) {
		ih = ( IQ[ jz-1 ] >> 23 );
	}
	else if ( z >= 0.5 ) {
		ih = 2;
	}
	// Case: q > 0.5
	if ( ih > 0 ) {
		n += 1;
		carry = 0;

		// Compute `1-q`:
		for ( i = 0; i < jz; i++ ) {
			j = IQ[ i ];
			if ( carry === 0 ) {
				if ( j !== 0 ) {
					carry = 1;
					IQ[ i ] = 0x1000000 - j;
				}
			} else {
				IQ[ i ] = 0xffffff - j;
			}
		}
		if ( q0 > 0 ) {
			// Rare case: chance is 1 in 12...
			switch ( q0 ) { // eslint-disable-line default-case
			case 1:
				IQ[ jz-1 ] &= 0x7fffff;
				break;
			case 2:
				IQ[ jz-1 ] &= 0x3fffff;
				break;
			}
		}
		if ( ih === 2 ) {
			z = 1.0 - z;
			if ( carry !== 0 ) {
				z -= ldexp( 1.0, q0 );
			}
		}
	}
	// Check if re-computation is needed...
	if ( z === 0.0 ) {
		j = 0;
		for ( i = jz-1; i >= jk; i-- ) {
			j |= IQ[ i ];
		}
		if ( j === 0 ) {
			// Need re-computation...
			for ( k = 1; IQ[ jk-k ] === 0; k++ ) {
				// `k` is the number of terms needed...
			}
			for ( i = jz+1; i <= jz+k; i++ ) {
				// Add `q[jz+1]` to `q[jz+k]`...
				f[ jx+i ] = IPIO2[ jv+i ];
				fw = 0.0;
				for ( j = 0; j <= jx; j++ ) {
					fw += x[ j ] * f[ jx + (i-j) ];
				}
				q[ i ] = fw;
			}
			jz += k;
			return compute( x, y, jz, q, q0, jk, jv, jx, f );
		}
		// Chop off zero terms...
		jz -= 1;
		q0 -= 24;
		while ( IQ[ jz ] === 0 ) {
			jz -= 1;
			q0 -= 24;
		}
	} else {
		// Break `z` into 24-bit if necessary...
		z = ldexp( z, -q0 );
		if ( z >= TWO24 ) {
			fw = (TWON24*z)|0;
			IQ[ jz ] = ( z - (TWO24*fw) )|0;
			jz += 1;
			q0 += 24;
			IQ[ jz ] = fw;
		} else {
			IQ[ jz ] = z|0;
		}
	}
	// Convert integer "bit" chunk to floating-point value...
	fw = ldexp( 1.0, q0 );
	for ( i = jz; i >= 0; i-- ) {
		q[ i ] = fw * IQ[i];
		fw *= TWON24;
	}
	// Compute `PIO2[0,...,jp]*q[jz,...,0]`...
	for ( i = jz; i >= 0; i-- ) {
		fw = 0.0;
		for ( k = 0; k <= jp && k <= jz-i; k++ ) {
			fw += PIO2[ k ] * q[ i+k ];
		}
		FQ[ jz-i ] = fw;
	}
	// Compress `FQ[]` into `y[]`...
	fw = 0.0;
	for ( i = jz; i >= 0; i-- ) {
		fw += FQ[ i ];
	}
	if ( ih === 0 ) {
		y[ 0 ] = fw;
	} else {
		y[ 0 ] = -fw;
	}
	fw = FQ[ 0 ] - fw;
	for ( i = 1; i <= jz; i++ ) {
		fw += FQ[i];
	}
	if ( ih === 0 ) {
		y[ 1 ] = fw;
	} else {
		y[ 1 ] = -fw;
	}
	return ( n & 7 );
}


// MAIN //

/**
* Returns the last three binary digits of `N` with `y = x - Nπ/2` so that `|y| < π/2`.
*
* ## Method
*
* -   The method is to compute the integer (mod 8) and fraction parts of (2/π) * x without doing the full multiplication. In general, we skip the part of the product that are known to be a huge integer (more accurately, = 0 mod 8 ). Thus the number of operations are independent of the exponent of the input.
*
* -   (2/π) is represented by an array of 24-bit integers in `ipio2[]`.
*
* -   Input parameters:
*
*     -   `x[]` The input value (must be positive) is broken into `nx` pieces of 24-bit integers in double precision format. `x[i]` will be the i-th 24 bit of x. The scaled exponent of `x[0]` is given in input parameter `e0` (i.e., `x[0]*2^e0` match x's up to 24 bits).
*
*         Example of breaking a double positive `z` into `x[0]+x[1]+x[2]`:
*
*         ```tex
*         e0 = \mathrm{ilogb}(z) - 23
*         z = \mathrm{scalbn}(z, -e0)
*         ```
*
*         for `i = 0,1,2`
*
*         ```tex
*         x[i] = \lfloor z \rfloor
*         z = (z - x[i]) \times 2^{24}
*         ```
*
*     -   `y[]` output result in an array of double precision numbers.
*
*         The dimension of `y[]` is:
*         24-bit precision     1
*         53-bit precision     2
*         64-bit precision     2
*         113-bit precision    3
*
*         The actual value is the sum of them. Thus, for 113-bit precision, one may have to do something like:
*
*         ```tex
*         \mathrm{long\ double} \: t, w, r_{\text{head}}, r_{\text{tail}}; \\
*         t &= (\mathrm{long\ double}) y[2] + (\mathrm{long\ double}) y[1]; \\
*         w &= (\mathrm{long\ double}) y[0]; \\
*         r_{\text{head}} &= t + w; \\
*         r_{\text{tail}} &= w - (r_{\text{head}} - t);
*         ```
*
*     -   `e0` The exponent of `x[0]`. Must be <= 16360 or you need to expand the `ipio2` table.
*
*     -   `nx` dimension of `x[]`
*
*     -   `prec` an integer indicating the precision:
*         0 24 bits (single)
*         1 53 bits (double)
*         2 64 bits (extended)
*         3 113 bits (quad)
*
* -   External function:
*
*     -   double `scalbn()`, `floor()`;
*
* -   Here is the description of some local variables:
*
*     -   `jk` `jk+1` is the initial number of terms of `ipio2[]` needed in the computation. The minimum and recommended value for `jk` is 3,4,4,6 for single, double, extended, and quad. `jk+1` must be 2 larger than you might expect so that our recomputation test works. (Up to 24 bits in the integer part (the 24 bits of it that we compute) and 23 bits in the fraction part may be lost to cancellation before we recompute.)
*
*     -   `jz` local integer variable indicating the number of terms of `ipio2[]` used.
*
*     -   `jx` `nx - 1`
*
*     -   `jv` index for pointing to the suitable `ipio2[]` for the computation. In general, we want
*
*         ```tex
*         \frac{{2^{e0} \cdot x[0] \cdot \mathrm{ipio2}[jv-1] \cdot 2^{-24jv}}}{{8}}
*         ```
*
*         to be an integer. Thus
*
*         ```tex
*         e0 - 3 - 24 \cdot jv \geq 0 \quad \text{or} \quad \frac{{e0 - 3}}{{24}} \geq jv
*         ```
*
*         Hence
*
*         ```tex
*         jv = \max(0, \frac{{e0 - 3}}{{24}})
*         ```
*
*     -   `jp` `jp+1` is the number of terms in `PIo2[]` needed, `jp = jk`.
*
*     -   `q[]` double array with integral value, representing the 24-bits chunk of the product of `x` and `2/π`.
*
*     -   `q0` the corresponding exponent of `q[0]`. Note that the exponent for `q[i]` would be `q0-24*i`.
*
*     -   `PIo2[]` double precision array, obtained by cutting `π/2` into 24 bits chunks.
*
*     -   `f[]` `ipso2[]` in floating point
*
*     -   `iq[]` integer array by breaking up `q[]` in 24-bits chunk.
*
*     -   `fq[]` final product of `x*(2/π)` in `fq[0],..,fq[jk]`
*
*     -   `ih` integer. If >0 it indicates `q[]` is >= 0.5, hence it also indicates the _sign_ of the result.
*
* -   Constants:
*
*     -   The hexadecimal values are the intended ones for the following constants. The decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the hexadecimal values shown.
*
* @private
* @param {PositiveNumber} x - input value
* @param {(Array|TypedArray|Object)} y - remainder elements
* @param {PositiveInteger} e0 - the exponent of `x[0]` (must be <= 16360)
* @param {PositiveInteger} nx - dimension of `x[]`
* @returns {number} last three binary digits of `N`
*/
function kernelRempio2( x, y, e0, nx ) {
	var fw;
	var jk;
	var jv;
	var jx;
	var jz;
	var q0;
	var i;
	var j;
	var m;

	// Initialize `jk` for double-precision floating-point numbers:
	jk = 4;

	// Determine `jx`, `jv`, `q0` (note that `q0 < 3`):
	jx = nx - 1;
	jv = ( (e0 - 3) / 24 )|0;
	if ( jv < 0 ) {
		jv = 0;
	}
	q0 = e0 - (24 * (jv + 1));

	// Set up `F[0]` to `F[jx+jk]` where `F[jx+jk] = IPIO2[jv+jk]`:
	j = jv - jx;
	m = jx + jk;
	for ( i = 0; i <= m; i++ ) {
		if ( j < 0 ) {
			F[ i ] = 0.0;
		} else {
			F[ i ] = IPIO2[ j ];
		}
		j += 1;
	}
	// Compute `Q[0],Q[1],...,Q[jk]`:
	for ( i = 0; i <= jk; i++ ) {
		fw = 0.0;
		for ( j = 0; j <= jx; j++ ) {
			fw += x[ j ] * F[ jx + (i-j) ];
		}
		Q[ i ] = fw;
	}
	jz = jk;
	return compute( x, y, jz, Q, q0, jk, jv, jx, F );
}


// EXPORTS //

module.exports = kernelRempio2;

},{"@stdlib/array/base/zeros":3,"@stdlib/math/base/special/floor":78,"@stdlib/math/base/special/ldexp":86}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
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

var ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
var EXPONENT_MASK = require( '@stdlib/constants/float64/high-word-exponent-mask' );
var SIGNIFICAND_MASK = require( '@stdlib/constants/float64/high-word-significand-mask' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var getLowWord = require( '@stdlib/number/float64/base/get-low-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var rempio2Kernel = require( './kernel_rempio2.js' );
var rempio2Medium = require( './rempio2_medium.js' );


// VARIABLES //

var ZERO = 0.00000000000000000000e+00;    // 0x00000000, 0x00000000
var TWO24 = 1.67772160000000000000e+07;   // 0x41700000, 0x00000000

// 33 bits of π/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = π/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331
var TWO_PIO2_1T = 2.0 * PIO2_1T;
var THREE_PIO2_1T = 3.0 * PIO2_1T;
var FOUR_PIO2_1T = 4.0 * PIO2_1T;

// High word significand for π and π/2: 0x921fb = 598523 => 00000000000010010010000111111011
var PI_HIGH_WORD_SIGNIFICAND = 0x921fb|0; // asm type annotation

// High word for π/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// High word for 3π/4: 0x4002d97c = 1073928572 => 01000000000000101101100101111100
var THREE_PIO4_HIGH_WORD = 0x4002d97c|0; // asm type annotation

// High word for 5π/4: 0x400f6a7a = 1074752122 => 01000000000011110110101001111010
var FIVE_PIO4_HIGH_WORD = 0x400f6a7a|0; // asm type annotation

// High word for 6π/4: 0x4012d97c = 1074977148 => 01000000000100101101100101111100
var THREE_PIO2_HIGH_WORD = 0x4012d97c|0; // asm type annotation

// High word for 7π/4: 0x4015fdbc = 1075183036 => 01000000000101011111110110111100
var SEVEN_PIO4_HIGH_WORD = 0x4015fdbc|0; // asm type annotation

// High word for 8π/4: 0x401921fb = 1075388923 => 01000000000110010010000111111011
var TWO_PI_HIGH_WORD = 0x401921fb|0; // asm type annotation

// High word for 9π/4: 0x401c463b = 1075594811 => 01000000000111000100011000111011
var NINE_PIO4_HIGH_WORD = 0x401c463b|0; // asm type annotation

// 2^20*π/2 = 1647099.3291652855 => 0100000100111001001000011111101101010100010001000010110100011000 => high word => 0x413921fb = 1094263291 => 01000001001110010010000111111011
var MEDIUM = 0x413921fb|0; // asm type annotation

// Arrays for storing temporary values:
var TX = [ 0.0, 0.0, 0.0 ];
var TY = [ 0.0, 0.0 ];


// MAIN //

/**
* Computes `x - nπ/2 = r`.
*
* ## Notes
*
* -   Returns `n` and stores the remainder `r` as two numbers `y[0]` and `y[1]`, such that `y[0]+y[1] = r`.
*
* @param {number} x - input value
* @param {(Array|TypedArray|Object)} y - remainder elements
* @returns {integer} factor of `π/2`
*
* @example
* var y = [ 0.0, 0.0 ];
* var n = rempio2( 128.0, y );
* // returns 81
*
* var y1 = y[ 0 ];
* // returns ~0.765
*
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*
* @example
* var y = [ 0.0, 0.0 ];
* var n = rempio2( NaN, y );
* // returns 0
*
* var y1 = y[ 0 ];
* // returns NaN
*
* var y2 = y[ 1 ];
* // returns NaN
*/
function rempio2( x, y ) {
	var low;
	var e0;
	var hx;
	var ix;
	var nx;
	var i;
	var n;
	var z;

	hx = getHighWord( x );
	ix = (hx & ABS_MASK)|0; // asm type annotation

	// Case: |x| ~<= π/4 (no need for reduction)
	if ( ix <= PIO4_HIGH_WORD ) {
		y[ 0 ] = x;
		y[ 1 ] = 0.0;
		return 0;
	}
	// Case: |x| ~<= 5π/4
	if ( ix <= FIVE_PIO4_HIGH_WORD ) {
		// Case: |x| ~= π/2 or π
		if ( (ix & SIGNIFICAND_MASK) === PI_HIGH_WORD_SIGNIFICAND ) {
			// Cancellation => use medium case
			return rempio2Medium( x, ix, y );
		}
		// Case: |x| ~<= 3π/4
		if ( ix <= THREE_PIO4_HIGH_WORD ) {
			if ( x > 0.0 ) {
				z = x - PIO2_1;
				y[ 0 ] = z - PIO2_1T;
				y[ 1 ] = (z - y[0]) - PIO2_1T;
				return 1;
			}
			z = x + PIO2_1;
			y[ 0 ] = z + PIO2_1T;
			y[ 1 ] = (z - y[0]) + PIO2_1T;
			return -1;
		}
		if ( x > 0.0 ) {
			z = x - ( 2.0*PIO2_1 );
			y[ 0 ] = z - TWO_PIO2_1T;
			y[ 1 ] = (z - y[0]) - TWO_PIO2_1T;
			return 2;
		}
		z = x + ( 2.0*PIO2_1 );
		y[ 0 ] = z + TWO_PIO2_1T;
		y[ 1 ] = (z - y[0]) + TWO_PIO2_1T;
		return -2;
	}
	// Case: |x| ~<= 9π/4
	if ( ix <= NINE_PIO4_HIGH_WORD ) {
		// Case: |x| ~<= 7π/4
		if ( ix <= SEVEN_PIO4_HIGH_WORD ) {
			// Case: |x| ~= 3π/2
			if ( ix === THREE_PIO2_HIGH_WORD ) {
				return rempio2Medium( x, ix, y );
			}
			if ( x > 0.0 ) {
				z = x - ( 3.0*PIO2_1 );
				y[ 0 ] = z - THREE_PIO2_1T;
				y[ 1 ] = (z - y[0]) - THREE_PIO2_1T;
				return 3;
			}
			z = x + ( 3.0*PIO2_1 );
			y[ 0 ] = z + THREE_PIO2_1T;
			y[ 1 ] = (z - y[0]) + THREE_PIO2_1T;
			return -3;
		}
		// Case: |x| ~= 4π/2
		if ( ix === TWO_PI_HIGH_WORD ) {
			return rempio2Medium( x, ix, y );
		}
		if ( x > 0.0 ) {
			z = x - ( 4.0*PIO2_1 );
			y[ 0 ] = z - FOUR_PIO2_1T;
			y[ 1 ] = (z - y[0]) - FOUR_PIO2_1T;
			return 4;
		}
		z = x + ( 4.0*PIO2_1 );
		y[ 0 ] = z + FOUR_PIO2_1T;
		y[ 1 ] = (z - y[0]) + FOUR_PIO2_1T;
		return -4;
	}
	// Case: |x| ~< 2^20*π/2 (medium size)
	if ( ix < MEDIUM ) {
		return rempio2Medium( x, ix, y );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		y[ 0 ] = NaN;
		y[ 1 ] = NaN;
		return 0.0;
	}
	// Set z = scalbn(|x|, ilogb(x)-23)...
	low = getLowWord( x );
	e0 = (ix >> 20) - 1046; // `e0 = ilogb(z) - 23` => unbiased exponent minus 23
	z = fromWords( ix - ((e0 << 20)|0), low );
	for ( i = 0; i < 2; i++ ) {
		TX[ i ] = z|0;
		z = (z - TX[i]) * TWO24;
	}
	TX[ 2 ] = z;
	nx = 3;
	while ( TX[ nx-1 ] === ZERO ) {
		// Skip zero term...
		nx -= 1;
	}
	n = rempio2Kernel( TX, TY, e0, nx, 1 );
	if ( x < 0.0 ) {
		y[ 0 ] = -TY[ 0 ];
		y[ 1 ] = -TY[ 1 ];
		return -n;
	}
	y[ 0 ] = TY[ 0 ];
	y[ 1 ] = TY[ 1 ];
	return n;
}


// EXPORTS //

module.exports = rempio2;

},{"./kernel_rempio2.js":100,"./rempio2_medium.js":102,"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/constants/float64/high-word-exponent-mask":50,"@stdlib/constants/float64/high-word-significand-mask":52,"@stdlib/number/float64/base/from-words":113,"@stdlib/number/float64/base/get-high-word":117,"@stdlib/number/float64/base/get-low-word":119}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
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

var round = require( '@stdlib/math/base/special/round' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// VARIABLES //

// 53 bits of 2/π:
var INVPIO2 = 6.36619772367581382433e-01; // 0x3FE45F30, 0x6DC9C883

// First 33 bits of π/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = π/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331

// Another 33 bits of π/2:
var PIO2_2 = 6.07710050630396597660e-11;  // 0x3DD0B461, 0x1A600000

// PIO2_2T = π/2 - ( PIO2_1 + PIO2_2 ):
var PIO2_2T = 2.02226624879595063154e-21; // 0x3BA3198A, 0x2E037073

// Another 33 bits of π/2:
var PIO2_3 = 2.02226624871116645580e-21;  // 0x3BA3198A, 0x2E000000

// PIO2_3T = π/2 - ( PIO2_1 + PIO2_2 + PIO2_3 ):
var PIO2_3T = 8.47842766036889956997e-32; // 0x397B839A, 0x252049C1

// Exponent mask (2047 => 0x7ff):
var EXPONENT_MASK = 0x7ff|0; // asm type annotation


// MAIN //

/**
* Computes `x - nπ/2 = r` for medium-sized inputs.
*
* @private
* @param {number} x - input value
* @param {uint32} ix - high word of `x`
* @param {(Array|TypedArray|Object)} y - remainder elements
* @returns {integer} factor of `π/2`
*/
function rempio2Medium( x, ix, y ) {
	var high;
	var n;
	var t;
	var r;
	var w;
	var i;
	var j;

	n = round( x * INVPIO2 );
	r = x - ( n * PIO2_1 );
	w = n * PIO2_1T;

	// First rounding (good to 85 bits)...
	j = (ix >> 20)|0; // asm type annotation
	y[ 0 ] = r - w;
	high = getHighWord( y[0] );
	i = j - ( (high >> 20) & EXPONENT_MASK );

	// Check if a second iteration is needed (good to 118 bits)...
	if ( i > 16 ) {
		t = r;
		w = n * PIO2_2;
		r = t - w;
		w = (n * PIO2_2T) - ((t-r) - w);
		y[ 0 ] = r - w;
		high = getHighWord( y[0] );
		i = j - ( (high >> 20) & EXPONENT_MASK );

		// Check if a third iteration is needed (151 bits accumulated)...
		if ( i > 49 ) {
			t = r;
			w = n * PIO2_3;
			r = t - w;
			w = (n * PIO2_3T) - ((t-r) - w);
			y[ 0 ] = r - w;
		}
	}
	y[ 1 ] = (r - y[0]) - w;
	return n;
}


// EXPORTS //

module.exports = rempio2Medium;

},{"@stdlib/math/base/special/round":103,"@stdlib/number/float64/base/get-high-word":117}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: implementation

/**
* Round a numeric value to the nearest integer.
*
* @module @stdlib/math/base/special/round
*
* @example
* var round = require( '@stdlib/math/base/special/round' );
*
* var v = round( -4.2 );
* // returns -4.0
*
* v = round( -4.5 );
* // returns -4.0
*
* v = round( -4.6 );
* // returns -5.0
*
* v = round( 9.99999 );
* // returns 10.0
*
* v = round( 9.5 );
* // returns 10.0
*
* v = round( 9.2 );
* // returns 9.0
*
* v = round( 0.0 );
* // returns 0.0
*
* v = round( -0.0 );
* // returns -0.0
*
* v = round( Infinity );
* // returns Infinity
*
* v = round( -Infinity );
* // returns -Infinity
*
* v = round( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":104}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Rounds a numeric value to the nearest integer.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = round( -4.2 );
* // returns -4.0
*
* @example
* var v = round( -4.5 );
* // returns -4.0
*
* @example
* var v = round( -4.6 );
* // returns -5.0
*
* @example
* var v = round( 9.99999 );
* // returns 10.0
*
* @example
* var v = round( 9.5 );
* // returns 10.0
*
* @example
* var v = round( 9.2 );
* // returns 9.0
*
* @example
* var v = round( 0.0 );
* // returns 0.0
*
* @example
* var v = round( -0.0 );
* // returns -0.0
*
* @example
* var v = round( Infinity );
* // returns Infinity
*
* @example
* var v = round( -Infinity );
* // returns -Infinity
*
* @example
* var v = round( NaN );
* // returns NaN
*/
var round = Math.round; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = round;

},{}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the sine of a number.
*
* @module @stdlib/math/base/special/sin
*
* @example
* var sin = require( '@stdlib/math/base/special/sin' );
*
* var v = sin( 0.0 );
* // returns ~0.0
*
* v = sin( 3.141592653589793/2.0 );
* // returns ~1.0
*
* v = sin( -3.141592653589793/6.0 );
* // returns ~-0.5
*
* v = sin( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":106}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_sin.c}. The implementation follows the original, but has been modified for JavaScript.
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

var HIGH_WORD_ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
var HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/float64/high-word-exponent-mask' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// 2^-26 = 1.4901161193847656e-8 => 0011111001010000000000000000000000000000000000000000000000000000 => high word => 00111110010100000000000000000000 => 0x3e500000 = 1045430272
var SMALL_HIGH_WORD = 0x3e500000|0; // asm type annotation

// Array for storing remainder elements:
var Y = [ 0.0, 0.0 ];


// MAIN //

/**
* Computes the sine of a number.
*
* ## Method
*
* -   Let \\(S\\), \\(C\\), and \\(T\\) denote the \\(\sin\\), \\(\cos\\), and \\(\tan\\), respectively, on \\(\[-\pi/4, +\pi/4\]\\).
*
* -   Reduce the argument \\(x\\) to \\(y1+y2 = x-k\pi/2\\) in \\(\[-\pi/4, +\pi/4\]\\), and let \\(n = k \mod 4\\).
*
* -   We have
*
*     | n | sin(x) | cos(x) | tan(x) |
*     | - | ------ | ------ | ------ |
*     | 0 |   S    |   C    |    T   |
*     | 1 |   C    |  -S    |  -1/T  |
*     | 2 |  -S    |  -C    |    T   |
*     | 3 |  -C    |   S    |  -1/T  |
*
* @param {number} x - input value (in radians)
* @returns {number} sine
*
* @example
* var v = sin( 0.0 );
* // returns ~0.0
*
* @example
* var v = sin( 3.141592653589793/2.0 );
* // returns ~1.0
*
* @example
* var v = sin( -3.141592653589793/6.0 );
* // returns ~-0.5
*
* @example
* var v = sin( NaN );
* // returns NaN
*/
function sin( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= HIGH_WORD_ABS_MASK;

	// Case: |x| ~< π/4
	if ( ix <= PIO4_HIGH_WORD ) {
		// Case: |x| ~< 2^-26
		if ( ix < SMALL_HIGH_WORD ) {
			return x;
		}
		return kernelSin( x, 0.0 );
	}
	// Case: x is NaN or infinity
	if ( ix >= HIGH_WORD_EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction...
	n = rempio2( x, Y );
	switch ( n & 3 ) {
	case 0:
		return kernelSin( Y[ 0 ], Y[ 1 ] );
	case 1:
		return kernelCos( Y[ 0 ], Y[ 1 ] );
	case 2:
		return -kernelSin( Y[ 0 ], Y[ 1 ] );
	default:
		return -kernelCos( Y[ 0 ], Y[ 1 ] );
	}
}


// EXPORTS //

module.exports = sin;

},{"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/constants/float64/high-word-exponent-mask":50,"@stdlib/math/base/special/kernel-cos":80,"@stdlib/math/base/special/kernel-sin":84,"@stdlib/math/base/special/rempio2":99,"@stdlib/number/float64/base/get-high-word":117}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":112}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/high-word-exponent-mask":50,"@stdlib/number/float64/base/get-high-word":117}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":115}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
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

},{"./indices.js":114,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"./high.js":116,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return an unsigned 32-bit integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-low-word
*
* @example
* var getLowWord = require( '@stdlib/number/float64/base/get-low-word' );
*
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":121}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Returns a 32-bit unsigned integer corresponding to the less significant 32 bits of a double-precision floating-point number.
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
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - input value
* @returns {uinteger32} lower order word
*
* @example
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/
function getLowWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ LOW ];
}


// EXPORTS //

module.exports = getLowWord;

},{"./low.js":120,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\) and assigns results to a provided output array.
*
* @param {number} x - input value
* @param {Collection} out - output array
* @param {integer} stride - output array stride
* @param {NonNegativeInteger} offset - output array index offset
* @returns {Collection} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319, [ 0.0, 0 ], 1, 0 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( 0.0, [ 0.0, 0 ], 1, 0 );
* // returns [ 0.0, 0 ];
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' );
*
* var out = normalize( PINF, [ 0.0, 0 ], 1, 0 );
* // returns [ Infinity, 0 ]
*
* @example
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var out = normalize( NINF, [ 0.0, 0 ], 1, 0 );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( NaN, [ 0.0, 0 ], 1, 0 );
* // returns [ NaN, 0 ]
*/
function normalize( x, out, stride, offset ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		out[ offset ] = x;
		out[ offset + stride ] = 0;
		return out;
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		out[ offset ] = x * SCALAR;
		out[ offset + stride ] = -52;
		return out;
	}
	out[ offset ] = x;
	out[ offset + stride ] = 0;
	return out;
}


// EXPORTS //

module.exports = normalize;

},{"@stdlib/constants/float64/smallest-normal":60,"@stdlib/math/base/assert/is-infinite":66,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/special/abs":74}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var bool = ( y*pow(2.0, exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var normalize = require( '@stdlib/number/float64/base/normalize' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize.assign( 3.14e-319, out, 1, 0 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var assign = require( './assign.js' );


// MAIN //

setReadOnly( main, 'assign', assign );


// EXPORTS //

module.exports = main;

},{"./assign.js":122,"./main.js":124,"@stdlib/utils/define-nonenumerable-read-only-property":163}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var fcn = require( './assign.js' );


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @param {number} x - input value
* @returns {NumberArray} output array
*
* @example
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
* var out = normalize( 0.0 );
* // returns [ 0.0, 0 ]
*
* @example
* var PINF = require( '@stdlib/constants/float64/pinf' );
*
* var out = normalize( PINF );
* // returns [ Infinity, 0 ]
*
* @example
* var NINF = require( '@stdlib/constants/float64/ninf' );
*
* var out = normalize( NINF );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( NaN );
* // returns [ NaN, 0 ]
*/
function normalize( x ) {
	return fcn( x, [ 0.0, 0 ], 1, 0 );
}


// EXPORTS //

module.exports = normalize;

},{"./assign.js":122}],125:[function(require,module,exports){
arguments[4][116][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":116}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var PINF = require( '@stdlib/constants/float64/pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); // => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
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

},{"./high.js":125,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":130}],129:[function(require,module,exports){
arguments[4][120][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":120}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":129,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @private
* @param {number} x - input value
* @param {Collection} out - output array
* @param {integer} stride - output array stride
* @param {NonNegativeInteger} offset - output array index offset
* @returns {Collection} output array
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( 3.14e201, out, 1, 0 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( x, out, stride, offset ) {
	FLOAT64_VIEW[ 0 ] = x;
	out[ offset ] = UINT32_VIEW[ HIGH ];
	out[ offset + stride ] = UINT32_VIEW[ LOW ];
	return out;
}


// EXPORTS //

module.exports = toWords;

},{"./indices.js":133,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var w = toWords.assign( 3.14e201, out, 1, 0 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var assign = require( './assign.js' );


// MAIN //

setReadOnly( main, 'assign', assign );


// EXPORTS //

module.exports = main;

},{"./assign.js":131,"./main.js":134,"@stdlib/utils/define-nonenumerable-read-only-property":163}],133:[function(require,module,exports){
arguments[4][114][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":114}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var fcn = require( './assign.js' );


// MAIN //

/**
* Splits a double-precision floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @param {number} x - input value
* @returns {Array<number>} output array
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*/
function toWords( x ) {
	return fcn( x, [ 0>>>0, 0>>>0 ], 1, 0 );
}


// EXPORTS //

module.exports = toWords;

},{"./assign.js":131}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var pow = require( '@stdlib/math/base/special/pow' );
var sin = require( '@stdlib/math/base/special/sin' );
var HALF_PI = require( '@stdlib/constants/float64/half-pi' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for an arcsine distribution with minimum support `a` an maximum support `b`.
*
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 2.0, 4.0 );
* var y = quantile( 0.4 );
* // returns ~2.691
*
* y = quantile( 0.8 );
* // returns ~3.809
*/
function factory( a, b ) {
	if (
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return constantFunction( NaN );
	}
	return quantile;

	/**
	* Evaluates the quantile function for an arcsine distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.3 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return a + ( pow( sin( HALF_PI*p ), 2.0 ) * ( b-a ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/half-pi":48,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/special/pow":88,"@stdlib/math/base/special/sin":105,"@stdlib/utils/constant-function":161}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Arcsine distribution quantile function.
*
* @module @stdlib/stats/base/dists/arcsine/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/arcsine/quantile' );
*
* var y = quantile( 0.5, 0.0, 10.0 );
* // returns ~5.0
*
* var myQuantile = quantile.factory( 0.0, 4.0 );
* y = myQuantile( 0.8 );
* // returns ~3.618
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":137,"./main.js":139,"@stdlib/utils/define-nonenumerable-read-only-property":163}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var sin = require( '@stdlib/math/base/special/sin' );
var HALF_PI = require( '@stdlib/constants/float64/half-pi' );


// MAIN //

/**
* Evaluates the quantile function for an arcsine distribution with minimum support `a` and maximum support `b` at a probability `p`.
*
* @param {Probability} p - input value
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~0.905
*
* @example
* var y = quantile( 0.5, 0.0, 10.0 );
* // returns ~5.0
*
* @example
* var y = quantile( 1.1, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( -0.2, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = quantile( 0.5, 2.0, 1.0 );
* // returns NaN
*/
function quantile( p, a, b ) {
	if (
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return NaN;
	}
	if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
		return NaN;
	}
	return a + ( pow( sin( HALF_PI*p ), 2.0 ) * ( b-a ) );
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/constants/float64/half-pi":48,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/special/pow":88,"@stdlib/math/base/special/sin":105}],140:[function(require,module,exports){
module.exports={"expected":[60.799637189068136,20.36821894267212,7.295582564750139,16.91360598167073,48.8726820484833,12.476271698869224,16.379087270527105,10.710479083678521,22.0715524559323,86.89673931482253,18.966999345070626,66.86971256156878,18.2720024024822,19.16537888730802,15.773761837174803,67.42714350416404,41.43736190925323,44.716031882890356,25.00304351684352,42.64590641638085,15.528226211126206,18.125719088981143,52.458956690405,63.17202106793543,6.0324925248749,51.002697019538786,34.94200421338867,18.856421764795794,27.72813799922298,12.08777028866007,76.84174716064312,22.471553086348205,10.66153396135421,43.36086988685534,62.88233738829142,25.991370934423156,11.066989692717584,9.302905490382878,8.238400871932194,38.574768242483465,32.50389200531265,15.553311868182286,8.542410681586226,22.74406639929461,18.574602226953136,54.29948467426469,5.743698276403213,9.052633731148706,65.8639981547413,64.06812252096208,3.6562685974586513,18.401907053166926,28.579315231138082,8.523303241897327,50.92240199017602,14.41406108324028,4.011359676822693,0.6211509507260713,64.53747661845233,8.889846420124485,20.907800224242735,9.628908901615205,25.2103171068231,62.855457520280495,26.55806309021035,41.108946505213794,39.84007827130622,27.747147421678484,25.136516595081474,8.784413277035696,50.95481935355825,6.185773367213944,8.889224018942883,15.69141224149899,23.338848867369762,3.413292421228289,16.158106001819117,19.07557701034837,2.124357579390698,54.42572184930476,8.309468709130094,11.434751678227872,27.962813863910036,29.657946114468135,34.88931730877833,19.973067237040087,30.996697813362566,25.921513196289588,4.754195470905324,9.06739911523799,28.283573839564454,21.343817215297726,18.33792122636102,65.9091523239459,19.42881760505406,22.556933925665977,30.878221790542618,84.12454746214695,20.9407181325651,45.92641869583984,13.203945260153263,14.501779404635855,26.846052060452497,21.10313606715456,24.54290060599937,19.92850321811799,11.715389727321003,34.561894966142624,77.80166470277226,5.746649380209028,66.10495552846697,13.341284025441059,22.450566623876494,26.755989568953797,17.7482658829051,25.730737558684794,29.179503920455105,58.7900015252938,23.363650504187543,12.455983656924685,27.37430198611911,58.0480124511314,19.205580078766342,37.540145197378465,60.945013276981406,9.065135883370488,10.493152274536833,8.890288321753808,11.610370075323361,4.928012335110326,29.19402733721987,17.836490000417037,14.706835490589922,38.875196532422756,68.16712838515885,35.802085962265394,44.97625009664134,88.2865303745584,38.84284702770187,76.27676444946233,1.589241370161198,11.338678830077047,8.371444746011033,17.383914167242402,16.44495943651887,31.62726389668331,45.30202980768277,54.86628059498168,77.64245710967299,5.660630066191017,16.116809695655654,54.12050940672068,17.107459714625428,10.579773836785959,17.712856800369085,7.782674005752785,27.72354845241422,45.03300819398787,92.41971840928441,7.049598643215313,21.254611240319072,0.27387867893494044,49.04559096000186,11.101657449281259,94.3968241289284,68.07077346607595,11.263490373867436,18.585084279894378,19.83293402730373,69.25657422617118,35.76527172720901,60.92740167045261,22.59432065031641,4.7207502161283745,37.204691956565405,38.40546272222139,16.777469433893295,24.13736059361452,3.6540196954351036,14.967348941847714,58.5951712050956,17.432746413654513,59.467994918942615,11.880647445813135,47.26566450882543,42.07425230986038,10.81780643568602,10.503437225027957,31.67739612125537,8.57447116805702,15.699113975409993,42.43903241498555,32.73754538191031,52.761967647955586,27.475258090671502,23.33835517769233,22.185105325155916,72.10180292076323,28.348255733265034,8.22133994158956,10.172280661736822,47.11789015712446,6.9753293289256595,27.65027104037269,32.216504378144776,45.88407973740047,5.457606784347052,23.371664497752754,46.44970428079943,14.311454222255522,33.849575482111334,30.230046135662494,5.34553370800949,39.76287230044056,10.774745604362858,54.693808336951065,19.179335399092885,72.50678666018723,16.62851556232014,39.234150320521394,26.590144555070527,17.385290990374266,54.87509547826639,46.1686220715447,58.97921573480296,4.417915709612924,7.208481287987374,26.147257436221714,21.508517373158913,6.570774353601663,17.888789122650394,14.148157700155569,71.34721553609788,75.91772026979261,20.607163100624298,23.353643098397164,19.295540899564582,43.358921308764835,12.092792191148682,50.70418614097887,26.077037906587478,3.9117344590554985,20.564380246043246,57.770588932977844,9.04953439642928,17.34884207673475,36.06879044664614,32.84296872024487,10.683574225388137,63.309984196428424,79.34470106986672,74.19482382755145,7.17285520277971,6.2366800125222195,50.72994925475751,20.65573686020144,61.83505360753557,49.53918945266361,53.32459784412351,44.77575828718389,17.250371762476654,53.28523251778208,32.180362846400264,11.77038963645646,37.85933826336973,3.2075403748347835,22.86480226551133,4.866255288429717,25.38656326321471,17.67679371060094,18.206819660469552,36.17773226614843,7.760346188077539,43.78986202531336,41.9035777039081,16.247055946187995,22.2109131661986,48.85626214763082,37.30249555805656,13.353939161755406,22.110220758903374,28.014964505868573,13.342309461131963,20.876835336527833,20.301840921790735,21.211681828237083,32.93857991620252,4.068691198625877,14.280708689451403,44.16862571876747,14.078800856955052,80.03830670787633,25.58349377816447,36.08164141105067,31.754585744527162,3.92496112483366,38.62852967506221,13.773892794015445,57.10064988669162,44.18195601338561,70.0961692252307,46.33341058857462,64.78492309202426,66.87169915659064,17.000962249930765,4.6041462832066395,3.93560674842787,9.532120862971404,14.693769481277414,28.676897847651464,70.42773047301037,47.37656561936661,18.828916691195687,48.171473970029496,34.17521719707508,28.874472204365276,63.92054631731756,32.78546014163379,86.8525736366189,23.762511731059483,50.32574517371188,41.018695827985965,30.705949263328208,28.631201513897217,49.501587659419954,2.2465556929549297,10.241760797228505,29.26441105232737,1.0697193179984552,17.748507476415078,12.713888099038414,22.970583487468964,7.6115446618998455,10.080162339023756,8.56861055285129,59.379793642447844,66.97019112483744,18.05643733478613,13.959041117214634,6.3690275840440105,30.044680170639676,45.80181577606528,21.26849695980602,6.216352021175661,30.25319003423707,36.643836320347276,67.79257829711224,28.736544541151755,7.450158451565522,43.426499295927286,48.81676262359735,43.53520126484642,46.42937763425831,66.4986465858535,54.97684057687986,35.646229629340766,28.99992549700015,9.064087759809068,38.83580500389036,17.80612202511088,44.40492105097437,7.958328382176914,21.42272811449331,28.986628826307204,78.39811008656129,1.0872873045280174,52.843275606100114,18.82074225044281,14.403629815507237,20.27966499722679,51.45135856334214,11.142182646739252,10.846534982397564,16.622530444997242,56.5682667434457,16.127436218991477,66.49474350553582,23.7110761549896,23.880853295678378,32.15727999024723,20.085864941413536,10.014759072113126,37.899964235195,13.134215647095896,53.37388293185297,11.710346643229327,4.251137308966477,12.944850630684341,23.503658640731928,1.6230146994680732,16.810069873233893,16.905422726141992,15.240302716070827,35.950182997590815,47.61006032609349,42.83718064333408,26.466939391568978,14.008624126506492,60.172060871172675,41.80863110301961,60.68527555823063,26.22326801360998,16.176328777895517,30.59307576999526,34.53430785033892,19.398246748367697,25.49245607109072,10.311977022742038,63.97253725702391,21.096559140552134,58.64014700381588,57.13176086407345,40.45608764801643,31.175740900169178,10.24361989180558,5.398322198730953,10.724040161523716,36.39981423270595,36.58296393463775,18.31913189914421,17.87581547468775,3.169009053543267,12.386665945666554,30.261227559599018,13.184368260257552,8.290011159494178,0.24249418331465936,8.6857954814456,43.63892389537997,14.316621641103989,17.35101785280084,25.98786252439133,35.039192688289006,29.27493882603951,11.32817813583504,55.617963300469086,77.7354267298343,50.535426857886776,13.11844112107882,23.436469002594468,86.99192985328268,47.073738614925915,29.69076998822136,6.34998603605147,11.711913449233855,43.336759600014105,12.048247832094932,27.75123760751882,8.289831476661153,20.570552678101215,37.99293343641938,19.363302046887735,14.571236990073709,39.89470596522017,9.355395606331374,26.789928010896354,33.280485171077274,6.6750594212420475,72.07970339748964,2.604585303764774,33.49102709064451,41.02446854791438,29.854435896236662,32.523748473978436,2.799794807642173,49.92157312995221,32.97556727627514,24.969822338539345,19.414589111338586,18.36883817496304,4.5816329823701585,18.309029485978012,53.1947335519349,13.960336018576097,62.68769497868772,7.486193856502581,7.399246400116754,16.120250735913267,31.4189967874988,56.825576015181774,46.768823244581455,23.64976077159515,77.3619120385479,41.01495766294023,19.592546250072825,26.054272701138746,41.20586149772611,42.83525274196856,41.412049112467024,8.150961212559737,25.885959665004286,17.6232488410775,37.82539928738837,36.82526286484595,8.733397723393274,30.782595080707353,28.794828719873404,42.73746953066619,16.906781885833713,14.520231321930524,46.982353094032675,34.22537593247358,11.106767908106784,32.621705473644525,13.597528100350765,25.58563754703899,16.640938155132165,59.4070404754293,22.827321868240595,6.329305893615835,50.16193458739225,15.55981328608825,11.98915842142127,43.243453846036374,17.1231527117271,12.979802228595561,11.360543695671472,18.30878858631732,6.091372139912674,4.126108840838845,18.622580873697963,78.26137775668327,91.63857657253529,8.59688514952386,26.08592390283283,73.42127215805483,10.884132508014343,58.363035145063364,12.143773415064864,8.689684977624303,72.17023652688559,61.854731107602596,44.6783806604346,19.722877250515772,27.377161699090465,7.757367174992271,24.4174125832346,43.442968201470585,28.023669617658044,17.227044775288363,58.03347222693438,45.714774114816315,27.066923533120033,13.357414433067332,24.515646569777395,35.99923649777204,35.81301580227107,62.66454239193208,33.8038963674059,16.74741661694421,49.70382836308928,52.67204482268164,30.442741636113187,82.31517720238746,15.89002303747833,67.62646999585355,5.693589259115213,66.95026118022571,15.02525102777299,13.586642425238892,76.43910026616295,57.007400685023285,14.673822137165866,11.388842227553253,28.344591647548,19.041448776482564,14.42199386588636,27.076328648724605,17.2231167945481,14.615444078927139,49.158761635529494,28.729446200049715,20.732852681108046,52.9342144772682,20.70162249147105,46.02915722765921,50.50463770514002,32.967407249427616,53.0990898890126,44.15183703860355,11.602736062602853,21.987281971082908,17.304934125797423,14.419466552604652,9.020538357296273,50.00100390507398,50.14387011076582,36.059696144944375,40.704235177955766,2.164686835700837,35.04739547056266,17.976027446069235,46.75617816987416,2.5788221126345943,80.88552729594565,19.31227393582933,60.23770723720102,68.06525021404588,43.36732733664741,65.53672716725603,67.48803785236464,4.70589523407517,48.98983088709884,5.151005188843583,3.046615475394603,7.466209214466902,10.30262415147589,9.363039499058708,19.429962833730073,12.807111611243311,3.7125131424205504,15.179778641892476,23.597862192493753,36.6733653065422,19.39116974095606,14.687675877420517,13.837407377344315,15.899166281822765,33.753686776254966,22.30065910086659,3.7020503698682616,39.11948003035218,58.97216400069037,40.64939435052063,11.540069190791723,32.23906517829765,29.06508639765094,4.606768811482708,21.308732650439666,10.994092906261471,28.037104328289264,33.06848822662401,17.196112359918736,28.391970526372077,18.655259906511112,81.4843915371606,5.464108703482973,50.18386149098569,7.023133081275875,13.147927881658491,33.85392616222228,12.799654708458062,3.9689045357562844,72.0403784593406,8.03292714045092,30.522555136232754,61.57014219472378,29.18889726614967,1.3136465208698815,46.75266486039753,9.6294183856814,46.013294257146825,17.53020691785188,20.415781031835362,34.92281553796403,21.413599086333843,8.99402845279447,11.531150091362983,21.86766372075164,7.952458431953852,39.38722107639232,21.663029426968112,21.40425289565348,18.372291407554076,76.95695308452555,65.1326902224074,8.100727871526272,24.025016386959546,34.051377090288156,49.99305950801627,28.47584477649153,89.70465617871997,15.914920898944327,26.14592966678557,18.348850295234886,10.325714848152911,54.673652008410706,8.34182113975314,19.28484937523139,56.881079476352966,14.75645768754497,14.351388521930822,33.63593602453314,26.247202907850678,5.037125476131538,40.39142690332042,2.8312574638436923,6.042960712892537,10.982471323071511,53.513433414907496,13.228484321558541,26.570408761242916,16.000603157362622,13.39407779336451,26.65053091865466,23.170015767584726,1.1883190788735194,24.286863576258348,66.14211032137302,50.501188452146266,56.91025649018417,24.297263954582434,46.92134680403811,9.817230102871854,31.447092917232094,17.268563220683856,15.248514047515549,52.29850137639123,48.29072620851163,43.18287924807363,16.698837318685616,34.275963413685645,26.850513637577688,9.436524323002976,30.18048487762197,27.68052965798268,17.513281785054545,19.4211959358457,12.89272666220015,18.45833155617408,71.0388864699255,6.916616826392722,37.57922394438478,21.883639970042957,18.6330229069934,12.629813864846712,12.173750470037463,68.96065209119294,54.934249891439705,15.690348779835986,1.6098787205673302,76.67759202503069,4.856324589386233,9.447339852688744,24.406045207912175,13.188801121107943,27.464004683127524,45.7544430382641,42.070036195859615,62.616772191014995,12.50601985634625,3.527397254056623,16.50859205018891,13.305880136993103,9.645533573168803,12.271501935074948,24.70045703646297,24.41406560661226,36.535590645707664,37.12760374814496,42.278526007138964,47.14676833650766,16.970544642818904,36.9914526012864,45.574845638361786,75.6373652921653,34.441849018523115,28.885527247743926,47.01335610375351,6.505128817510925,25.276631394584953,22.089542911528675,14.160390224295542,19.380417839189647,6.654760845699415,65.90153260124518,35.22860095161748,5.75928609451182,63.615300931829566,44.595461707750175,17.093596076435645,4.74148684537443,74.46528346532014,17.064131326970003,79.54226572187837,15.744044153687074,39.671074538709235,24.40863960925195,30.322510264708118,15.697670745519014,28.990669359714197,10.975267582249629,22.48599029545856,22.65169454463618,37.58714954855078,81.18402216690548,29.644450877992,33.04033001030371,75.67496235378955,2.0971054502432045,39.849680791313126,30.158485573416755,25.079643275593504,30.37618469098051,17.285396612111104,47.431723702761474,39.744021161554,71.50207723978127,12.724574367008271,19.479724923297148,17.13162647965962,80.52424409005616,52.0635343920081,11.305331318874352,6.9241665130999195,15.473817848977356,53.20708298746952,68.44293640882432,50.08673689953666,19.789943204301757,41.97338052206766,72.35560486359876,17.48028028346112,5.875366684685478,31.653340604892897,6.382539380927753,14.445503081703578,5.65438731305298,14.169735659349698,24.24847798300293,23.428029546043682,44.95503560407556,17.149774688716562,8.136989164315409,31.94809633190571,20.084159608102528,47.19266461685779,38.27030008946644,51.08895055995566,10.93819677655189,19.46842758566109,12.891454052589001,47.60426287958223,9.343463361270828,29.248063719510824,16.065704208734513,0.8675883118611845,59.90828149737595,17.803516544612172,73.81738502565472,20.40920866873512,3.9980342274974134,46.31855762382256,17.648118545873807,16.034504614653734,25.118939509691934,63.499808075102635,18.288537807151013,34.330095579129605,53.62307960636703,18.801137050647377,78.94940688732663,66.47340095260809,59.58185094765577,20.66266122984156,51.89016604651038,18.25550026049787,34.44358477928617,21.02187995527305,17.23717234245408,71.84492477435016,3.409571184263789,16.206003757086023,12.981977430023628,16.91067862760481,23.582737883659597,15.04989144164173,7.807031860159627,14.19329033234668,20.186212127452432,21.894020223271,16.521429944278257,21.86239262024203,6.8206560701467405,14.634544592989366,27.29331128916846,21.724773062512224,80.97666601403353,4.204660318783071,79.65283467198626,7.756366627923056,29.141443950745042,12.613558185994062,51.63608412882283,38.56395632884004,85.94858351068746,20.648320618200437,62.29958611643365,20.12215700652134,80.84731962352456,64.34347880301223,25.239644106345096,6.49985898518207,53.783293172167205,58.744482568508964,32.11584325296379,16.979360398204744,23.172886667312707,69.17639576736161,43.694288257402874,12.861439696467091,21.12067012444906,50.25961893850393,48.6847278619909,12.83004271815686,22.758546411362893,27.71562778793696,2.868371654663359,11.533246204404193,11.456873112887886,55.73441604655549,22.39035990325954,17.711539872408174,39.4735939020135,40.487588126594005,92.41220521125531,46.684442458453844,7.9506086390391495,21.32262604390555,38.468868796938274,47.39950198253074,57.1971779491843,22.739798683809443,6.972057196902906,50.42398602356132,5.397582311401898,32.94118716778347,49.81732230918907,1.2766705162621357,29.528390145712077,18.873904823053657,13.743743424394037,26.284955759612103,15.913017255902002,9.959353186377669,35.04389187799599,24.86316363067172,13.427411409888093,42.921095444856526,30.189592858380767,39.91639948627555,76.24857189573113,21.128038239251385,27.726614157646594,19.390668762430707,45.87000805588799,14.851390335686176,28.936985341544137,22.502072139128806,13.155292716093959,6.644725563353887,60.4474320710993,20.282926899380612,45.717748836335545,78.11078799241402,64.25380849966928,73.70632977300163,9.232853806306291,25.313815334198004,37.03078490051594,44.05053997071068,44.13975730111972,2.5274345719741635,14.663826110945728,27.07864289800098,29.748935963650894,5.173598724531757,19.721426857411725,49.63847183770086,19.68155552634815,22.804836475704978,8.83629866211061,33.66349278290089,1.7763137444451587,29.96472362792378,62.83724722733304,15.53410529824598,52.513614149794215,38.13623516996491,17.48080075284078,59.036285161435636,21.66446816547456,56.64615544856658,3.831010633080558,9.151274289101302,5.762103653353959,24.30119067183367,71.96127363024883,38.36954381726541,24.79624194030952,62.7655658851366,30.202122261797072,47.134148082549096,10.947182691385471,33.72477877696228,15.294233605584095,25.904073016785603,27.88801056884091,5.216431740399591,28.116742338799472],"b":[61.85739028743298,69.79183215349701,22.6291883957682,17.06817661264605,58.23203449911839,30.54730765688268,16.85906324274429,62.74803480283307,22.143374794385227,93.5674369754459,43.72025000138799,78.93394551415727,82.57207361364563,34.66409638011321,74.68509922498032,74.02308536642748,49.75588816792379,47.23919222425637,32.18838080061492,55.619329752985536,80.40976101030299,74.66670536265221,52.466826405984776,72.30015826746167,8.094340450633926,79.54223240252168,39.474087419938314,23.008133412105593,28.4469921352269,49.44805378924807,80.30493645475025,70.13232944776149,34.79360926564905,69.05086413394488,64.75644745279165,60.48365233027218,13.122904366987154,10.901952484115917,65.26063420228238,42.243176385669315,32.50622328136408,35.09125469016401,45.19626985991294,80.93343802902265,30.721712054986195,55.61660318192966,68.04819820145956,50.468267404913306,84.18088586102189,91.27256965197249,23.963885733903034,90.02520366383506,40.7407848692517,21.545808055266235,52.460288404890754,81.42151404392388,68.78771856696893,2.8735061372736004,66.95102709347664,31.120406431409414,78.10900956727238,15.75231629530515,97.22467533468365,82.18964268242459,29.987463523603445,50.46870269572455,41.23288752990383,30.161979339359938,26.878027474779284,15.779648070742361,71.08156498947164,14.433976300208142,33.65333891032412,19.367526895616585,23.363610875412615,6.0952139235998,19.71207252299368,25.827753546606385,45.748580278534085,54.57303107804252,82.73016832425755,83.15302078036653,60.94841505845181,39.8768226463185,49.27335517652281,52.00353598303004,95.91521097455401,28.667975672297104,11.529867181785193,9.89244917702116,35.36876997133571,31.086267565709274,52.86193602064654,79.15757049290795,19.937512803849664,26.466007440459315,31.034764283784526,84.83268015429638,22.62276148485418,46.44617554999023,16.440203181816642,28.523570460978544,29.039588989614117,27.660354277471985,52.78253548131612,33.40923722192552,11.754535540450345,40.72537575882258,78.36543531618528,8.836809353381678,75.28900539347879,14.141385042987222,48.493813353102354,63.33924071123774,17.75463243386978,41.3855810256872,37.42563881115011,90.19641826513711,23.364342080814353,39.83867391746743,88.84523937169465,58.05768696977036,87.05816700717065,62.16747779933102,78.8496836462183,10.930130829207293,30.202521695736486,63.39620540183583,34.09476827761996,35.83788996882816,41.671215319736326,25.060443276488968,67.08352264732963,58.003847239191984,72.45531609634615,36.19235773429543,79.75712464308762,90.28540205735865,40.35602628616144,81.40069575385907,10.89386709570698,54.79572144511796,14.840744756489652,37.81792027247229,55.766381574022,72.23674409629396,53.05576742915797,69.1584133153261,78.15332616403686,5.941853297684512,17.16651270815912,83.97700125775407,19.332998312595578,13.495817093912613,59.37046195104075,22.314928249881504,39.18200133080352,45.35934620965934,93.6097976989218,48.78851523170206,30.291888484431084,1.3923152589142829,49.765833237161786,30.969345087173078,94.51420755924892,71.36912496255152,27.878902116224936,25.93011820345154,23.818031854134905,72.65479717868605,36.18747535619342,80.17248522961978,34.634189163375986,5.719049409618822,44.62164056278601,84.55217134360109,39.23541624608515,99.22849102810181,9.173939521376164,57.479139892043634,59.108544759865666,62.790919476276045,62.032693027231694,18.436558677458684,75.9446778774234,68.33720326570712,47.38693393467326,14.946434430221363,37.355350136273266,12.197214511707394,36.62200324373062,76.89587966993538,70.94271050817449,53.15090701974304,28.246722954234112,24.802589770924357,74.84652631713934,74.28526004541462,87.67735178457104,29.322738489505966,84.46273652726396,80.85840485179064,82.6838230962095,99.0410685283502,38.73670732605097,60.773219687099896,24.111340152194764,52.361896293144234,86.64324648678155,20.146783260931045,36.88698187123493,45.429828805602185,11.938559711774523,60.941876727866266,75.5783691730089,71.4396539419212,62.457062402452294,74.09523202298251,18.73712608959068,45.13804848727414,79.60993852602427,43.37498168683938,69.44747536189817,74.61562179463631,81.14829214917627,73.41904094189576,36.83687987388636,65.57006509645853,28.107853127878194,10.039401089178215,21.62768724939571,57.92183251345641,76.57206637202415,76.5111925138701,21.54032269767405,46.47555349754708,30.507086865420195,51.20088888419235,16.037237641179015,66.76702670874097,31.234004680110065,4.928359428552653,34.691398751230196,77.8256307135077,24.637599401730164,28.210592493390166,54.12785313279836,50.945023372462785,51.22986761883417,71.89758648572938,80.9402589173276,85.91683659894254,58.46399836463615,58.426374511358944,61.51048327433819,86.83909665027969,62.20477179166514,50.542261066171,58.12618242656042,75.42247891304118,26.202398218753547,60.20265546357343,61.90947860344535,51.71432927478912,53.8141518414988,4.92049201472295,43.63779754638071,13.12126329050022,33.06721360141526,70.05877569906063,18.225043829704024,71.85444587241753,35.303897369079664,43.789912036587,97.323696993123,16.549299951095982,38.95652370619699,49.65005482511469,49.26896824842517,75.62905353501296,37.122764023658554,33.0846547842941,41.87117566321015,27.72058313243989,30.560651022217073,62.33507943666215,32.962959783067845,41.898938691242044,38.196583486316925,45.298486773369945,51.69763061905126,80.29413603150809,25.58452567715284,44.723159867701476,56.84111758342927,9.459752083818994,51.90164372866591,27.74483427292759,57.53612996351627,51.86537286463172,71.9921737659198,46.35144768145473,67.610910694522,97.03453217038637,45.0105535096111,20.094915948859423,70.5931644555085,73.69923387862639,63.12859847109982,30.22598847959271,80.53547117404571,47.82193827875328,20.789150118243466,93.07208664638345,34.5346099003574,48.54100628246074,77.02522928560305,37.45616737285842,89.99480360157946,24.419738925025364,52.72476706385211,42.75468365182118,74.63530142956252,57.06985951250529,78.75422680384547,65.63637905301434,24.965754990331416,80.5400463915997,16.109994455232346,28.932117082391493,34.95641981867151,27.584098224263094,7.845995345370884,16.207176046063047,13.840975241463958,77.32668694016786,82.11949796825917,47.13950438323975,68.93816117227492,6.57513744827503,82.26093647922009,83.25882609084334,52.281092604564336,7.748103614702213,33.02742650379811,50.24804123245634,81.49538172535361,46.31252581215668,24.013560406141004,68.82616540140484,50.53885179781793,45.606831414707756,57.69672042858241,69.00700879013634,55.0764358369764,63.459190459937176,31.821768296191028,48.482245407706856,40.15457897111611,17.92402902431305,96.21539821119862,10.084395764039797,45.78591235228902,32.54004855463041,97.7754443292885,15.279619051775718,76.55830053331627,45.8687364896701,26.089129552282856,24.7571732773008,53.411638539370614,12.37536486404393,13.827469429941859,22.808928039977793,63.20946557665529,56.36704501273641,75.14148837202679,42.394850848433705,42.590735478998596,32.229176413385424,23.71983899574642,81.3993022012927,83.25821011247966,28.427041412997056,65.34063917546979,54.387753938442174,9.945775633738032,53.748288641537386,73.20587613432473,73.24549101974237,27.71196418772191,48.13714825097544,26.084431945753245,52.95230488386076,51.40526626913816,42.91482717444058,68.15726215688937,81.0219655954163,63.16709758728703,76.76917257835618,65.24815779428428,27.73787572683116,37.019071747071166,76.72623389472346,34.60779706998092,52.217092526334135,84.29773171768637,68.82942935144243,67.86356819839774,23.993917502909877,62.98379689579819,60.52479451843534,47.81270894070954,34.45379870727186,10.320318780843888,35.09373347279886,19.34829163354399,36.41691495236671,79.10990795582816,50.83299254614013,28.067926558818908,82.0233593607198,73.54005784976422,43.46819745498996,13.31540844034091,18.482200182249503,7.897314957960866,20.85467535700832,61.32527444111964,16.871744357222454,54.642968370269244,52.30599767496746,56.16067025029855,64.31174186693087,47.296427820997295,55.62627538079662,78.32690731027766,75.163763830014,28.750743834206645,29.801690492446923,92.13375670635114,74.9006703145569,64.75210917508382,10.589395117624356,14.0584395147749,44.21063649971786,52.661279876573964,59.32584846126437,13.351436935181095,45.8168107157008,74.96015464182159,19.55532110311587,33.72248605070582,65.013794423036,52.884289108697395,40.52744431667901,70.65800549259696,12.737120554218615,90.612078437941,5.816113995233985,63.1816305167814,41.27413655370519,81.47047343814049,50.45624915846784,41.80077250480928,50.76737028708074,34.049885607690626,75.47783355913377,42.16915952719262,28.699091362986024,69.0681323373572,52.943027425251955,74.7019366042592,47.418994410742386,87.83124432504384,22.484665504548,43.62210960413071,81.50121356279601,42.297054966990856,68.47532615565942,47.816995938107766,30.64941388353528,92.04250945837535,54.921040937736116,29.482725308971084,47.71881675195492,64.9335502725457,51.15932787470694,79.10003129771503,33.2907176748336,31.945227206093108,58.08240501859598,38.994815133362835,38.763736278307775,19.733299586767966,30.84223551419982,29.982669312860125,61.059028376169564,58.085482028961394,46.99136649156404,71.07087357733477,93.95345792886404,16.386776234415077,76.76315139845079,13.604074189746559,25.973163081454093,52.72957120240747,67.18780794293625,22.860450369880667,17.73032578744907,50.16356525201844,38.188605565869615,15.878369728427138,53.9629216312599,19.063178070515892,79.98897105813307,19.887049097936686,21.103739957383446,25.9130485244369,4.833759660033223,35.80640776943669,78.40776020263607,95.12173997095823,9.606459428297924,34.88437766344579,74.40722526147373,56.16357725291929,58.37057276557495,52.98998650932485,75.67893894107247,92.95377917878008,79.30230504729943,76.47444547644794,27.529683571465178,92.16793468816515,61.32948749069593,57.45977489873472,65.54581142034732,54.81991576421941,74.96404750427075,58.71581542206677,76.48811663041946,28.697403041742007,20.925642663123245,65.75952257306778,39.1232957094504,51.475317196927094,64.82855883675009,46.957243751352706,91.19755060172623,55.8078948793157,53.81175929187192,57.262391808262464,99.0493667491564,32.855224637694846,85.8537808894319,52.235918153227644,74.67304213567583,80.16009181236804,23.751450580589246,88.87576746820923,73.82759727565566,87.50753003650189,43.02251927964234,41.24557679440579,56.1075953897601,23.016764665147853,32.77721833414952,20.886390760997273,20.52461029794372,55.96762350381252,68.42531504838774,37.00878228188015,54.861167318231715,26.156216794844322,54.90695360094672,54.0711335170071,48.080142547195635,59.182204692626854,74.18420571669081,70.10703233166687,63.91854060982324,58.777207600762274,16.04184439917686,9.020580133815113,62.82025839921991,64.65670580046803,37.73820903120844,43.99626831243192,58.86770098833071,64.37236526923567,22.7510755228588,57.3394696141105,79.11449370575906,85.22199188948677,64.22000123711179,71.19317148386075,71.53266327320846,57.63987264315541,65.56977422817043,78.43269709965577,61.05735655049879,69.23434042926587,54.06103224155183,9.45290028464127,30.172406160320616,73.51889790087964,11.505697443685264,20.047788128613355,48.30916893449421,57.21466016780918,69.09269563751938,25.739967944327677,80.48788377468242,71.73605405005735,83.494940861055,58.93962157724931,18.578517299861893,64.39609644632107,57.164215451450886,66.06620762475974,43.244143086322474,61.30747746105804,47.14376882025948,20.390942733208202,69.81175853559284,62.41134900337961,78.76611500390405,48.240947944155934,57.345359819537975,31.497774079847698,34.463698754324156,50.41353418998371,63.15371569830502,25.56236047632645,83.33462257152503,13.955585457689654,53.92667839217595,77.04572995864339,63.256390253741586,68.53321412618978,50.92165710998969,6.2017826086841055,72.17228631789733,20.69676048635939,52.69101340673897,61.57399198889366,34.76675285416215,16.61459365472352,70.14458587573277,24.60306697602304,49.52090062490181,64.92947002282011,76.60092070688373,36.97466717412167,29.666871192598563,9.440920038259254,34.253614976316044,23.61701761616747,51.699112721255815,41.84284654466142,88.05155237501265,24.935733562250036,86.82712987559117,78.39987534619293,85.16391696707856,15.839627056981644,37.27738159282049,50.904292489003566,82.46415146257507,41.43591040399457,89.71787073592593,15.928678206230709,60.32350412888563,18.349338424064378,56.09682260854865,73.86255830447533,75.26970407057371,22.077508215773726,63.162812950342015,29.576294397520122,79.77940370884494,33.637184150331954,39.0414930404058,47.853851271545444,86.7284357612117,24.382626074749062,11.110033426026845,12.101722609964302,53.68003140304738,55.51027671224162,90.12466343397881,45.59134789241592,62.30737679903804,26.653391653774538,71.30075976791689,63.63182583701896,83.18300556667843,71.9567800998929,51.01986177336996,64.98606301574478,48.17785147805334,60.83992540328984,50.88278480837757,43.3244134827474,75.83909496347698,58.156299900080015,66.20898000361234,63.980576734658015,49.79643211073745,61.38261238379547,71.55464805024909,43.51311392793815,41.356525855592665,62.45955407951522,29.738501153707606,37.8214609049965,39.51749398791516,13.374459821103443,67.10428701441836,71.52175254552267,9.633663438155695,77.3287755737721,68.91409118615869,78.75636225030348,12.630679672079124,46.46721955757399,73.6300376194277,79.93526028504884,28.47531634407077,6.446903038738054,83.68100616711929,38.05304252525237,12.708222007182322,66.48390144284285,44.35936463243961,27.465362110928243,99.03208602834053,80.05423616832107,78.96579208576394,29.248510069578963,17.29978053102121,25.182869240012053,37.6630821786934,13.409510662618874,61.02379847760267,28.93053460373061,31.137429715559144,36.803051361795525,82.07338834315948,52.39539702986163,52.90343177561674,21.75613264758518,64.93776044106686,55.45884497908105,79.54552269608833,57.706430116883126,87.50099136836592,57.22792002323396,25.503859517205917,61.52710910220242,72.13886259285913,91.46205604370388,20.067457796850864,17.571071158097116,70.77155972142992,42.66411619520929,48.36379852428992,67.06028014820042,53.40883833770449,24.92127172643325,31.23780169554638,77.89172837992855,91.74449003067886,80.84098547785794,16.136255008209286,70.58856691774109,62.351269917823956,31.38110361614256,19.210151872929764,42.89759600653052,61.67508582185085,53.49013608194571,87.04024449046769,46.246888078615164,82.71787525303907,31.716304410987682,43.70672433908221,75.6754738287426,34.891093855684026,83.14416560929071,31.651167526552605,53.83430005868764,46.59028591752604,52.96338793459611,62.409741290206874,79.80650063738544,72.83648256769597,12.740993573435091,52.58879249185974,54.64632066376721,91.88447741949625,53.98030714520544,44.57057063592153,75.35178711926864,40.824265681102084,56.06443382074514,92.78908318025739,87.80339351642355,52.1051068428154,41.9881981063459,79.49386176874029,22.216965000403967,63.33230355982317,32.4581821679799,11.657042688006069,49.556699353953846,60.696062759070244,19.45736207622435,83.67425685823079,39.03102590355386,47.34570883797355,68.45145538198683,12.9414072415369,38.64428191478284,34.40876584306904,51.21792293133125,83.72197414296652,52.4792640585203,75.05546153485787,35.48305793935219,20.276346927951877,56.33627388869073,64.67143864568692,85.09479783814128,50.216424105153905,68.2431207699714,60.60299711034691,37.24699158645863,81.938176598474,28.745747228139507,70.0544362263759,69.62037877140341,38.82623198724354,68.30119811888692,35.011342769647314,68.11336188468186,29.874430294171944,78.34070439754416,55.65749617676702,20.81647971884255,79.45519805223476,75.153506080267,63.95195872296402,21.930584886842936,53.5632178539419,19.220620332647425,59.593817083182465,85.72260501744793,17.92143935578709,81.35852632066513,26.887889258319134,27.659107157227755,19.121662373628176,38.587954392088406,26.50843806318292,25.74877961096428,7.989606777645042,25.105469701147168,32.09237191682984,77.31629369800218,17.287516713639302,36.00843198418028,68.5058197350364,74.07863794745626,28.50884177690034,56.904242264505385,83.82792228306798,64.28404325773128,84.71903695149787,60.16377611134387,29.52124681999889,16.642827551287517,52.268744369188674,38.708496309566996,86.07811679616967,32.11664572731182,68.57893704907679,24.881973656599886,85.9563259173108,64.51487144568618,50.87321922060143,10.857541190765541,91.34865374438844,62.77947732571492,35.94876135589976,26.615232800096315,23.35787838062581,69.39140571533062,45.85188694538117,48.499792820312734,45.08819266980644,76.55249115660091,64.53005910880104,79.33924505436761,37.85604060410927,56.489672526101195,3.4371926115163154,13.094426714024134,11.480655258568504,76.16112828878408,22.532318684980535,19.40427844216179,40.9718723538789,45.51087827633714,94.96430832255606,93.03137609487861,78.50271276412407,22.775313868667023,38.57557169373931,47.87249794987796,59.92870751599784,26.522864179402863,56.418017915252264,51.901861124876255,6.987652540583129,66.95933749191319,57.890159111807,73.36044821188199,35.8009618555312,19.584178779160787,63.591931323615384,88.79039914400414,23.5253656852409,27.391962834693015,87.3836064457917,29.386440093959315,85.13635477431868,45.98650439083609,49.00296803977531,85.02790411489778,83.64578090746976,40.67274087911959,78.43562093782074,40.91727756689584,51.17772515630182,73.53914619224787,77.14586561598125,26.773193449199567,18.68036962396237,15.893993938770187,66.42390197288807,23.665123482303585,50.01652114113454,86.65085230235506,80.8336712271095,73.85511408786002,22.466598173823957,75.59115584870264,46.44592983586843,60.86392985457888,80.41590327529232,2.8051285788889846,93.10095064206114,47.527855112466725,30.781058880945338,5.173600131067122,94.83531226716745,50.15701362716015,27.221262216819984,23.46915073621759,78.44028951226892,53.63740109208807,47.97355770676085,33.75008050455473,88.32856125594263,20.979327795498314,66.01980681970932,42.786290523256525,22.498173301008144,65.25054977330436,21.667129681953412,57.8277612907706,11.031787934839192,23.985372077006012,49.503892172148205,35.04885118849157,85.64938134963728,54.524813163417384,55.98430047718189,69.65441399154264,32.659032003381874,70.22501015178159,18.90259123821119,53.1450643076478,19.300108579329862,74.37238184252237,81.82027493749315,5.925120944447313,65.88331386268433],"a":[0.4812082066336565,2.1382448642921803,0.00891505782995683,16.82349948758212,19.178518342935227,11.317846365680587,15.115483487445921,9.379645189144462,19.29784002529304,16.43313176854133,10.992095505645544,8.031956507492687,16.79104287415537,18.018624152490247,1.0317106082616823,14.908448770879875,16.83381707590801,19.639001418561147,13.096553856550845,13.28832687755677,11.93466988610059,8.106603633081368,16.548083188473196,14.77128563657148,5.8897483783577975,19.775067767085325,19.97038702569011,7.907222491828145,16.348213504564043,1.0330638916675428,3.6978249296523558,18.972652123740758,4.3762895321277195,15.35269912378145,8.477072667109713,2.5656720627031326,6.529377580346303,8.66578819498779,7.995582815135793,16.321817905240504,9.003063650284089,14.85999687719775,1.2384975948291643,12.023378681049731,4.321196491170336,4.25594165813163,4.028233904818204,5.789121498569623,8.787457830123536,13.049383600301244,2.323304264212913,17.34283686000332,19.27029130718263,2.9943299051546024,4.3428846838520885,4.585369505812591,2.5971469738007036,0.6210434316139724,8.705419388587714,8.88983920661779,10.36416799180933,9.271510511274222,17.424598464185618,10.94955442789383,15.054881832913608,8.968689606425464,8.711319963025495,13.706349536277592,18.213637532468002,4.939265264409651,0.8815399857649053,6.178603986877453,2.001863522376177,13.224328582998384,16.453114796934294,3.3918129247073736,12.6564035945976,15.901269664119742,2.04074642512857,1.5933277680871383,7.591729958422628,11.430132748292845,6.064602465428814,10.61153979734691,10.279040266083985,4.358710353331046,17.977143080128197,12.293430557261082,0.3003924358775434,7.251998884384743,10.229275435513214,9.180167248313232,9.745974783601913,2.1413905888778118,9.7781339500958,15.523794467058455,1.356147322751804,8.165574164859017,3.3506875672294045,14.648035015141584,12.95409416936205,12.615854622238242,11.305276715594403,19.122682059457524,15.715492542241511,17.823506786714482,10.926143552756177,9.66885632725818,15.853038786204348,4.273185801023054,0.6622428353664844,6.395713629435749,11.476296886267292,5.723578918110124,17.27955989484975,0.9265978338813685,3.3997060078329033,19.10614165214602,18.049024407007348,10.018105237771483,11.174068454498073,17.28411596014585,12.438691301405091,0.7695518824976633,18.794250923237264,3.5175411661970424,5.043971909617628,6.139490739920439,4.650055585598953,4.5173342279641515,3.7506692339284298,15.467435258622304,14.461554094041249,18.078788721349763,6.169669947710168,16.762198745189608,13.295552807859004,16.147050573222742,12.279286417038344,14.97302444703557,1.4564996338708758,5.385298655122273,0.6975042998314329,8.292980998358615,14.933841667210066,14.101359718544977,17.840233564523462,17.472223586266132,3.2353820166557457,3.200990719127441,6.047672121867627,15.781191451726805,7.7488537151428805,8.41466968058635,17.40255972623389,5.026695423720615,0.7718186430733098,18.633507881252513,19.5872819858627,2.3932269176845766,0.11214339663131234,0.04123935855607552,17.638750149002572,11.072018704258152,15.806893724202705,16.941268063643406,8.457447993942262,7.141953794405871,9.08631664763318,7.85272536377843,5.40483553934326,2.65616800112797,6.841783254439271,2.5600936740813784,8.485656477553905,7.304659403861473,11.700774392205297,19.450267335714784,0.42923518520971093,11.949362045233691,1.9207454789338074,10.02180457229722,6.786331384576405,3.2984369137488345,18.998430430150268,8.723641080189557,2.4474055870410893,4.140520712396736,12.221860852898265,6.409802479837867,9.536570435314431,8.262087007119963,7.243331368628851,16.82864208779852,16.046125941769077,15.370486917277537,8.664283731233922,7.901550063268199,13.309116332294998,8.19750799428669,10.05426601786883,9.169926823280479,3.507392920802226,19.085235943683017,12.588599709223725,11.236945878328104,4.901451981084706,0.07102764175137999,15.757992873156525,13.366403642583471,7.832745894518163,10.57693551643263,4.83963187561816,16.566894309354957,10.699918202664271,19.582591258259328,7.451410403763101,2.51100779975852,5.25061006002411,19.397037011031593,9.003133339940032,0.584900773688215,14.04105180411111,7.7487156968264825,14.252585735426413,0.7598234833891926,3.366894496972961,15.328250230268466,12.048880750961445,6.191318960055456,9.690419130182658,8.828321496055779,16.486826258534517,6.125486390863473,13.991182776668056,17.329367463899693,18.452494559633813,19.143612861179086,9.842199775235937,11.21486630857345,18.98348988290421,2.029715967341925,18.80398228774036,1.3416711822158867,7.683093934333236,17.31584953911241,10.23946256213673,11.015781960706592,7.592244123397269,15.838220138820054,16.497877006397598,6.784085657243155,2.6400083986931477,6.2156041238201265,18.307394214523597,18.787469739087484,17.468343723842494,18.326818097913012,16.465429582640184,16.548437076317928,9.101751144470477,19.134503868613002,19.4771615284277,8.006785971636464,16.923894334400643,2.967453200405701,5.337284125134127,3.4747252249037786,18.49646019934624,12.041317693166974,2.7699088359827684,9.726096492888821,7.749046634548167,5.253959211478816,17.733454163268178,10.82703291504461,17.255461267061534,2.7074548707632573,2.5078186145737824,0.7993941036811503,18.97618290218924,9.329727447382442,0.7846192765096127,1.8080622702363858,17.977657106562454,4.454163886603411,4.176740469724889,0.22319952719278113,12.19484735883906,18.636974216073483,5.328682915870693,12.8923070060894,7.2669046071460786,9.918336098016587,4.440337310580911,3.3445373472346818,16.524630967372524,7.109546114685563,17.060356963982557,9.505297936346366,17.098221927432142,11.65995737122611,0.6626488028505451,18.338696195232835,7.131557570147038,0.032743163884991766,2.7329528380079093,8.639099204007476,5.268581192951189,10.521574560053732,16.261586780567484,18.236353971523723,15.871130002608979,14.415299469064013,6.903994365796731,10.796804980273222,9.989837211961149,14.191813216677325,13.348413526989305,12.776734333916654,3.8941760039172824,11.31498106015866,18.61094755266608,16.50134119290639,19.243895341598503,2.1850532217737806,3.1454608328951705,17.319722982011175,0.9741213594441067,3.07465730183611,5.209915914520105,18.1112950483302,5.148739441221668,7.071451136550406,7.522035716023452,8.105644370704574,14.870386668324876,17.66930191055213,9.518735143944115,3.559414112101007,6.078728783718339,16.782578588048022,18.01139411294763,5.899280929782584,10.113641738330479,16.37921176930748,1.794323375854403,2.7278462153563687,5.956250055179506,0.5704701829830761,10.066542199584653,12.869259384131322,5.413684769037728,19.200653986557853,4.416862798487715,16.46242939152964,14.353450137247478,3.554294737674355,17.57778185903488,14.214263916178949,19.23745565047177,6.320926630728643,8.695080043312334,15.483057277009689,19.620353385695655,0.20550270937592874,7.309422804078842,17.90716571597629,3.4701982400746045,14.036158306550854,6.612154369891683,6.5320970294673275,8.706086154156933,1.4407688570242616,14.327413895210256,9.61014640671074,13.454334771546637,8.98147629412026,18.68019425146752,18.140232342686428,17.333903432418275,3.646104893203219,11.361297828453289,7.6081753075859915,1.469278932958873,8.588643976555442,3.462728224584941,12.221026377163543,11.23802278707656,0.9148817035117807,3.7980579914297063,8.421726566722212,11.329178259592222,10.0836878866388,13.646779635557188,4.394457743003102,9.5673896223315,3.4785102083496966,19.02593922208224,7.497236982733515,5.8184722160936975,10.681937558800868,16.14209830218636,14.220447303706498,18.951450397163182,2.572955802129755,13.16864373679152,4.586946554131606,15.932755406668676,8.367845092672837,14.626215290156,10.743406403882565,1.5923522809398438,8.981376869239934,10.010197611645207,3.5061155275974887,10.023132853928907,17.937636677284946,19.305494259325805,3.415806614248096,17.873154028362297,2.658411078680203,0.3119176478405361,14.04013161852971,6.340277631373787,2.0693556570802807,0.1488674875625584,3.798768026610153,15.758267180943326,12.913740687182331,14.060363899291763,18.61093555394764,1.8535551224801416,3.51188806029588,6.658592759662683,11.24394362153546,19.973066079832805,8.197314090077942,10.91243279022362,16.56061793924094,17.250613806104795,8.501690592373432,1.1391522676556853,1.3233079674578896,9.149734309673988,9.441510385749673,5.3502367365831915,12.67510346291742,0.7238729585991921,12.353628207846299,3.300774388618506,19.348772545063074,14.459257670144305,3.848988202114114,4.499084109712075,2.188723546126057,5.91780873606198,2.7579138879216547,17.685917072440386,2.5865463494590957,8.433163288052196,19.65467283545301,19.664458637071935,17.917629597972923,1.4574856187157303,13.440363865721782,14.27915024239704,9.896743291538597,14.314738154762665,18.361872890007902,4.579741693776498,8.126950860118637,18.359855178329774,11.592339590660284,10.308246510409433,6.785040091097758,4.262781356785976,5.691685735707748,4.936346295901677,1.9332758364579217,18.63551208899429,16.195714560568035,18.544678853008868,2.29400731094084,7.761999892778895,16.266810041986663,3.967315550694037,13.22779501690244,3.7855722627742816,8.042131262486642,0.29526778638214957,17.409879736753723,12.742073950905915,12.956353729520828,4.690130231396172,4.574905953791548,2.8375616265545878,5.368360760099979,15.16351392401091,11.384474711505025,14.876374743884643,19.96497249645195,4.727101052599956,16.381671273182906,13.118347359925174,3.664856822940359,5.255809650734036,5.749452390355669,11.16074476731609,3.5818047322998225,13.926323946169097,1.7855539541800836,11.83282539059364,13.443001530371287,11.766961088684088,8.501103318183517,10.73534934443613,14.57778046272264,4.183611743432127,3.5864255809580925,6.757544306879488,17.381936162670804,19.55105325592865,3.0916681242272226,19.888849084015014,16.37807694139407,0.15693941425630076,13.478694102257162,2.92265372399791,7.953648273086662,16.165271859796317,14.73409564323051,18.82583004685197,19.353324114410828,15.263329401223613,0.1902422956959393,18.8821117018438,12.94068286883967,6.919820421495624,14.632150466390858,16.333923593221357,6.004312025147911,17.426863269664885,8.322747462016178,13.435344797969325,17.280356895542027,7.1915301824192746,10.573126572982936,1.6307151016220445,11.514921462774907,17.02522833727734,5.364221789851671,10.749012988620365,19.712189296827948,9.40459093427207,10.397168218057363,4.703312318712096,9.8916620542675,14.763550019201347,9.568585668729348,17.442436313948054,3.5771557611031124,11.563165793596081,10.618446605212855,0.9379372774754025,14.77180792095627,1.0451320283943044,17.510545936755662,8.104414780793538,13.749920437255799,14.385677474978431,19.70036448171255,5.131521963768679,14.397606782198352,9.031669389033077,15.170590067036418,17.53535180655598,14.786615684238766,10.732955962201398,14.507749301166362,11.434661413824987,17.939078236267644,2.116362775797773,14.24186917805812,0.1112835921941091,8.79260669368989,9.084044854994477,5.447771169240196,3.5672859508678734,2.0220574021483584,10.81727961720869,17.78066556642309,15.443469701981666,2.3871043268159076,13.84953482500201,11.577956582885243,17.701780396345704,10.243548630238536,3.7407774886051115,15.609938175405805,9.616171423393464,1.7246582585706038,14.890010168563919,1.3241661393088,2.458596084840785,7.463096773830862,10.077026959650519,9.362920785511704,16.686187967042017,10.036999748125552,2.9108959111902033,14.633778195861717,19.440612173872545,14.062395817944594,10.799471267795798,13.591818501421407,7.07576200313643,13.476635736978103,0.19440699691772423,9.87800621367802,2.08103104157344,10.596246517946405,11.573670988090047,15.502287201836245,11.497522595347661,0.881293791086919,2.0329184775007114,3.508323039813739,9.742950101589042,3.8252336068701176,0.6921320408909892,15.610732163735808,8.982040413309731,15.540816683098505,17.6469470106286,16.520700606422448,5.341953682900833,4.425473371834139,5.815477700242462,13.087180596866336,6.468570812461105,2.9483049021437413,3.6560446622575427,0.46562866105411604,2.823921647145191,19.384954105096064,9.211854126710799,6.860660305656725,1.3062676976246168,2.9901566125480095,7.736749846735762,16.986599960867956,17.513820227005873,10.87311067086227,19.642656133805897,19.73887566820548,0.7420751244353374,8.688889660373835,17.833783920569125,5.069848861085493,1.75677562806682,19.69869738309566,13.418155998335566,8.087193194232064,1.980814374095825,8.007574582705423,4.311348059619053,15.046511676106139,15.712661092676651,19.29197908168198,9.989188207649207,19.278459443061156,7.199764296266258,16.262904757028195,1.1788574590174727,10.313122502863607,13.996620639405961,4.987167803491932,19.275445171362712,14.253559692281211,6.968528435247778,14.32974590509071,8.845460381495208,12.290838594439318,3.5916320860988327,19.331993037975536,1.175917937279718,5.948095853759967,2.042056992593211,2.1245670900690383,8.59261700406762,14.02493590922019,2.6254822475111794,6.824035078517867,11.465610273348602,9.341339356451837,1.1881613723609519,15.62996378870408,16.689445284009963,13.959659406489342,19.146182806838553,0.27754549748163715,2.05405452618173,5.539459068790573,13.45847647261074,8.382715384915311,11.860598400147605,2.45727146757051,18.81248300167142,4.108782871933969,6.8715054693487465,9.887659808673455,10.689870382351817,9.387038657810267,15.309509136844696,19.296049678338694,1.9458790840659823,5.216049814640011,3.388029045372627,10.966369596429333,0.016136152153403138,2.3958580804348006,6.574695837084663,1.537264546548509,16.60953592559523,7.160146353107146,6.643275484975777,3.4708247103102696,3.4846805416282,9.814213374261778,0.3896173210301379,8.242587278123663,4.5779946626944,9.42597129923163,8.790635477557824,12.447231023900315,7.005072456766457,19.319512930702842,7.903511445728912,2.038697172485926,8.07828529514499,2.0220552209710263,15.4419723227464,6.196799302553115,5.457687881574569,2.6829772942614927,14.625297882987422,14.375968620818265,14.741624144588501,14.44056141908348,17.285566793979097,9.588250687729666,16.334738491629967,16.20696412071123,19.668787051256,14.41792998105825,15.17202333582615,16.24518335662374,18.6994599828289,6.411078814922702,4.77821432256317,8.723282229256224,14.054077886233877,6.526019984041418,6.614985327515406,17.721617010504588,0.6510902132154506,1.7008453776201327,13.16186648228916,2.8619143984192608,12.505846563301418,0.9345962319928436,5.963331317865501,16.217662060551756,13.102058793823659,12.369281916210646,12.991997550036597,10.045482056215324,5.9287403907887,5.604727963495275,2.469037635619129,4.845446013708403,18.613524386861926,19.154205197852715,2.199309925797599,19.510137703370766,17.158799031832036,2.8203876662484006,10.182189500871157,1.5154681411501159,9.255250071751808,13.459038969317362,12.775432231521293,11.430338866335754,14.654832294610841,11.643870906314667,19.72318395719512,17.0195985434584,12.17071805368425,14.198119281188584,16.898287236472598,17.881834659413812,7.142121485397679,8.175266097823709,2.290681017317233,15.132928897223001,14.69653937769122,17.307922239686675,10.125730893391914,19.121082926750816,5.227619122323621,18.291689341964464,8.945352841143993,5.707094386767517,7.239844572333132,6.237164698600055,0.0961633049954358,5.222568976189383,8.443803148630202,19.821504579469902,8.100037546446593,2.033722890468894,16.11105619929194,6.43417830369859,9.644338562267372,10.480250545488051,13.456629779531566,9.181849340169288,16.35566112515045,10.912669522117117,13.474964279510466,9.947568707271909,1.4153168567393104,8.855926856682323,16.459969053600293,2.919963075248604,0.8595006871572908,2.5129112921041985,3.9432589815447683,14.00771003096315,9.201909955858634,0.5651300729365527,6.836590951618016,5.6634260851995055,16.011239379899447,16.22512825501626,8.259326629791527,10.820766621037908,19.912142194880964,9.201812490780119,18.2124261146215,2.54114366899425,17.51910432816792,9.59083651974077,17.27311257257302,9.024933897370566,12.893903346736817,10.435051862288255,5.816221629931495,16.075152086939983,3.9575893987411037,2.793155850273501,16.12708966661444,12.305748945522152,16.420529278074486,9.527776064032093,1.4229059542288702,2.740963150873297,11.661192385716369,19.348589338326665,19.80106303607307,15.992281446921407,4.534725095919203,6.632395674984202,14.545705065319453,3.808946942384992,18.41282508040182,18.170485688579706,3.9026148409950423,13.384147541860596,2.468072745595249,19.41098065196556,11.504634953756758,15.043393328886898,19.726286766814383,19.244428498376614,18.789522454580645,11.22972194370174,12.427882885757558,15.590964559949834,3.082750989761851,19.38425702907928,6.382648303749252,15.605608025826609,2.3597331020718126,6.646578138337493,15.593396107638204,5.117741764047299,2.3388094307929874,15.762484375801641,3.250342060493492,5.116522453729533,6.217433475045895,4.153239275411265,11.237189974028974,16.628336163830816,15.048193653833813,1.4640404502119564,10.591246008220967,11.104397625985225,17.3184150104057,1.296094101349805,11.675755457806126,2.8541961061863574,18.931487151392655,18.151760175537703,14.829243611869526,6.768563296519301,14.93184086798362,18.809283112969034,9.532886769432295,16.148785475020986,19.9494656923872,6.971612349378815,16.819211692209763,4.493526287541814,1.2598728952631255,18.523613824308107,0.16810748097066508,19.420964939221797,8.387840571454536,12.008472520684602,19.329762527778623,7.986991492025881,4.196146794283728,18.626710203233586,11.290698822321058,13.165059921082985,12.930282233353495,8.324107377922392,18.58410590818394,15.343055243217375,5.048287498873809,16.827335594330208,4.120734337629166,5.004753908484187,7.737537108994705,9.377589728379562,17.3117612082568,9.832622379723631,5.191217636105745,14.029971569903733,19.43563735628917,6.377669807503001,7.343190569654818,13.878209477925992,15.446176176612546,8.486924256516577,18.412675542406454,8.3075880976528,18.60872715518532,1.4501120602260542,1.962825029692743,14.457632909903824,11.767684037473627,15.814367487009164,2.482976146703759,19.14527865867207,19.83772314417528,11.610442771610963,16.481808830427166,8.828917297354586,7.50419231312998,1.712526763944373,7.515440724927003,11.322279365369372,8.569784045208099,3.5470108329926475,8.817958771782447,14.571174342211677,19.76583684837955,9.001646589147416,18.56584153504926,3.8291419154330253,6.2196592187996425,5.665376753793407,19.405213215135106,17.37048633736311,4.929660072186648,12.290404641457965,0.9161282371318302,0.2156096675603525,15.619240327185452,3.6115693232449786,11.355206973336038,1.578906871595791,17.81563968728937,4.306773267683486,4.853691546646308,0.03783553256677674],"p":[0.9161838451146447,0.3474625193229317,0.38422883178398637,0.4151342761289414,0.6743256025576736,0.15786676591595805,0.6483750838185884,0.10095357819265116,0.898428456714008,0.8099752187666696,0.32866092453573903,0.729313549923633,0.09588365532871745,0.16907715981892935,0.2952901005033026,0.7831798096293938,0.6647050338766307,0.8044547487301159,0.5795389066834329,0.626505444740383,0.14714650062514156,0.2536530718893777,0.9905764414071614,0.7391765094549594,0.1637937126611395,0.5143211677498147,0.6797860424333975,0.64862506570543,0.843242884646981,0.31716120661073344,0.8636008921097575,0.16844629042972215,0.30041400203067914,0.5137458681843059,0.88317296269613,0.4388031649547144,0.6228326289125028,0.35845378775897485,0.041484244280545424,0.7544663804838123,0.9936595361780167,0.11853490499485653,0.26728531079305906,0.25811592668791805,0.5254225384493283,0.89761150475101,0.10468203240130669,0.17422278581518325,0.6718734463988303,0.5984694188441724,0.15966790199402525,0.07703504583419307,0.4575857878862244,0.36764331166287034,0.8855720328218903,0.2328476680958831,0.09338953018671736,0.004398429226187606,0.8694963343406881,0.0003626419939770642,0.2581706718493215,0.1509095987758453,0.20223531132434158,0.6511514085630357,0.6818338327063849,0.684963721197211,0.8672941672870458,0.7497287054996014,0.7040406213873664,0.40614905022779957,0.640284784060623,0.01876357041823229,0.3089532971684601,0.43694241484817664,0.961869004286094,0.05682163471359147,0.49764213195475504,0.38262767621369864,0.027852946968376147,0.966415274459159,0.062319804881526775,0.005108890416083867,0.4352508092656515,0.5975334946405668,0.5844643380685377,0.3880308877016243,0.2680477385392912,0.7313745528092723,0.43370626095351494,0.6223808715648282,0.6437217788409872,0.5352536320066159,0.29459015084704854,0.7277349739187118,0.856329336077517,0.5921616040912512,0.9537238793322695,0.9387221183506886,0.8090742830940343,0.9183850617509295,0.17253608052328961,0.223778878822273,0.7712113373279155,0.3199094407786738,0.32454910141243665,0.23957518056645877,0.8604961670470712,0.7060599338296749,0.9394515236398047,0.3847337482507862,0.7718137763633632,0.7916946894211907,0.36654808914778725,0.41300721128364226,0.9261369760268126,0.5726098919310736,0.6723205872068163,0.5371468807200726,0.9927381866540173,0.1845998670608957,0.3019372037781236,0.9901933063838579,0.1947342894426516,0.5633730519343343,0.6322859734976847,0.6654929958191675,0.30817626059586556,0.1406813886035012,0.3232312889770592,0.07305834845983461,0.6110805569741917,0.3310913915621194,0.04349775568077541,0.5133003707568882,0.8362787379240226,0.9094704820621344,0.4851466756353706,0.8949920374985414,0.8508468451212685,0.8208340422366227,0.07568012266011404,0.22567683240273784,0.5271447065632509,0.37448208252323245,0.12323722081488642,0.37002845281089924,0.6890609896111459,0.6474951980354409,0.9473695827084394,0.7924201664185737,0.8011769575543657,0.5396971528593895,0.7111514177255343,0.4527842579409451,0.054808379475546065,0.261470191183369,0.6321590804437478,0.9295086051912476,0.9190611958109254,0.20521764163138378,0.6313731076864502,0.2724058204475852,0.9043202583459327,0.024576528915419837,0.9754085585763985,0.8416546784942927,0.24822589892549374,0.5699928038593716,0.651783998272969,0.8529102135128299,0.9252715497906896,0.6679388505446624,0.5426491531393014,0.6199423663749644,0.7006743668283977,0.437602244295328,0.28254205548802447,0.15586084018737578,0.41546621381422977,0.1657715663502346,0.9395916321065279,0.24454596794355532,0.8617499434223412,0.5427353437905191,0.4976982757062436,0.5379346833585736,0.2840857657275717,0.5568569386281224,0.6846776892835928,0.4189317752604935,0.3165466785669018,0.49870186727848065,0.4360532953284071,0.9340047391926687,0.8381791434410124,0.7421789415816706,0.2985729353314761,0.8839001376478921,0.2969344100103144,0.021386555848599942,0.025360146166460762,0.5186925794094646,0.1342271183317565,0.212274231384326,0.6671398439925007,0.6305937503850378,0.10885132924684782,0.46529705824074985,0.45720325360919634,0.2435726594290577,0.7903948709191819,0.5407835339640275,0.17203448468783122,0.5144731076576019,0.02162438360089669,0.615231036312677,0.3055565717368596,0.9048131424213106,0.7412046212006962,0.682061863470175,0.33265941625317463,0.4311053342880429,0.6571839334167218,0.5476523203560704,0.6094814825011787,0.14407062784820956,0.22003364483671195,0.3072055455941798,0.556999039989809,0.20335223386635826,0.6218683463197003,0.2135464438911605,0.8094371500465827,0.941460326375281,0.7712862625034431,0.30045959260382804,0.17038319240784405,0.6706332274996112,0.41184481017034935,0.6385672985579967,0.5505309122788629,0.596503368906403,0.2160362013475403,0.6577600512697894,0.18325128204778007,0.03505088020834668,0.5566541461171715,0.5297394380639797,0.17150964664023505,0.7439873638804608,0.8994089706636574,0.7484871138684144,0.18395679725676173,0.012791522626765417,0.6670111302577988,0.1059711938652439,0.9420458031427223,0.8870739999979167,0.779490128503705,0.48691552931220805,0.4850399701620005,0.7307700990171373,0.3685762917661015,0.18960217619948638,0.5431073241290281,0.22805404771183269,0.47299493706752704,0.2480177535116963,0.48272137153404215,0.20177233152674456,0.9781348239107677,0.45256059139759075,0.01289262706048211,0.999274761044858,0.3715632239934006,0.852370092472482,0.3171751217750174,0.9169801901879777,0.6623417465401484,0.268665850684805,0.27284279509838516,0.6942854753257082,0.3729172647525032,0.6563885717927826,0.28281570465837014,0.3616912739966709,0.9814704533156311,0.19648592916934038,0.18281294924182534,0.8680022648316146,0.28608160948408523,0.96075407585498,0.9952217567097474,0.6679287611002176,0.5135364013091168,0.1993744295947366,0.5803054701304424,0.38479319702518877,0.9338471517451832,0.7199211426206891,0.8809937185517225,0.9854825761684549,0.8682655420896965,0.5749958065013476,0.34103626314653135,0.31680429419412404,0.0850029639083767,0.07475705882940042,0.26448546904220027,0.8190749292074164,0.7404071974798787,0.9216935542368285,0.5650159467683933,0.4547481898168979,0.9272361826928202,0.4865965764702376,0.7084378785678029,0.7042230947575439,0.8702025030011216,0.8472861198446362,0.8577103859020805,0.8489939261130472,0.30763092929652514,0.3683130081386847,0.5053761013196194,0.019823313060575165,0.38632809006670543,0.28626953355120266,0.05064760598482532,0.543097026862932,0.3349951176740289,0.5082595381184543,0.8094771234329494,0.38912243099027144,0.2668297183014279,0.6598938225387678,0.6851653977284151,0.07312661738124149,0.17627307511979118,0.8316125942872772,0.37907479590406457,0.459487916465914,0.19951397312027952,0.2718242253566683,0.7737522606590315,0.5630073633233315,0.7278140420891499,0.5619771135679783,0.18573523378157963,0.5823222430712383,0.8677310167554964,0.83811616041424,0.6926644054363731,0.8559054813736917,0.9717634846392254,0.44122106146817197,0.736685178201328,0.22776903208584565,0.8445982915864549,0.8858950406476547,0.38750161834147967,0.45855219693736204,0.3984300947638151,0.6982573792651026,0.6681872151259616,0.15551541102169164,0.602030826554175,0.11570858470177248,0.4894144043145767,0.5526730385726168,0.8687805603823626,0.6961329065268438,0.4475238264446699,0.6383104023520951,0.7596783811284151,0.2435786453990405,0.7557014736337553,0.46224238191645983,0.3088799131692903,0.9544839457811205,0.455894685052195,0.18478219623192516,0.4156978281620385,0.34456703526319465,0.715017553537241,0.16815475998562035,0.2267722643831671,0.08429461128015858,0.2935211308000325,0.06309394379039146,0.5281236342718991,0.30586659412988815,0.3443019182207412,0.5662984403341915,0.7946239037758824,0.9714081707623681,0.36093351391612916,0.2402608483118811,0.8322364729453255,0.4970170741834987,0.8212612054631805,0.8073627361100748,0.025785263425517124,0.3420411979176876,0.9563497165857002,0.3955897419404404,0.27330819795207906,0.19298789340818656,0.8234861493745855,0.7166024446387955,0.8062229722562522,0.8318478828082552,0.738746791796359,0.7664166704354489,0.668640956382172,0.15741294175882192,0.17679877647567732,0.9806307939421357,0.3612576968104406,0.3788793621714581,0.010286534970721073,0.05111779077906364,0.2662016173940871,0.532659692338044,0.9124662604521361,0.4222040920656609,0.07012149117811761,0.35959148091845705,0.571820512918521,0.40597313843287175,0.18382440135504297,0.30997973897539555,0.5713064726620669,0.45125819327182026,0.22016369986095774,0.9912874860196195,0.9357974820121924,0.5851928679684735,0.22876741056420902,0.5122783675768432,0.8312098796219449,0.5517385018709264,0.4673691885498823,0.5270770146022501,0.5139887411137676,0.8986451337773689,0.24558226458232446,0.38493718124176524,0.5635499277968747,0.3300531783647356,0.4898925097477138,0.17089240256331606,0.048585442878056107,0.5571705271203176,0.20522258302084273,0.591449371209444,0.4505612138098516,0.43104489666310286,0.6636424625365376,0.04762321781097456,0.4730328096252647,0.9314545603097937,0.2661828559215391,0.4674026374059854,0.11677745818961616,0.9038043188625342,0.8502216028391743,0.31830228446559516,0.28148555013284016,0.016527094238767415,0.003447627831810518,0.31629953431560387,0.576016452780771,0.16552822571473413,0.6142693533191594,0.13555921008237815,0.18218846000619648,0.24189770347423578,0.6371545386146471,0.7251695472313004,0.8786114551715334,0.510008624656854,0.705038192094642,0.6562956442791705,0.5284733836379836,0.37674065990096706,0.5711318824537428,0.6896216852897044,0.4997400531214422,0.041826188531694175,0.7116956011907063,0.046150432317475065,0.8646196865741651,0.8232614861220264,0.34697236536591336,0.9696536096618602,0.8658369636684251,0.611112448076019,0.12918347682436004,0.19181171833181643,0.5455698424565376,0.2893482202580522,0.5300654334607371,0.3471012847079107,0.925927775199181,0.9158483854190673,0.3257973076116505,0.7683691497878138,0.9661078810691472,0.29051814794886877,0.9957294074183827,0.4217910488306378,0.12596636741247313,0.656072113560022,0.6551011469754717,0.16105809155862416,0.16834889881993997,0.5458150834776072,0.19150837959947054,0.4570053791198263,0.4413874173627379,0.9688081184524526,0.8622522753847817,0.7424189768846476,0.444499779664566,0.9167809578897155,0.28837560390808004,0.9917505399953177,0.2823774766472211,0.06648814617349763,0.6516778967052268,0.6519934104408442,0.4671241531146155,0.13638471904339222,0.25981760062341874,0.22886584106341346,0.24732196472716472,0.5510428981476041,0.4620827792828448,0.1329933587406953,0.9190039807424399,0.5404696083750653,0.7516059232533843,0.4355710954157175,0.3044278629146906,0.7530967608337746,0.5945335769928568,0.8719973424015022,0.6378360097370843,0.16497745530856767,0.7402925404720522,0.9019697846169945,0.4510416296441795,0.6962252031935852,0.3525328110633763,0.6729065518190944,0.09221090545119948,0.7755731115963069,0.04029911532313801,0.3573162852946159,0.7259843845582701,0.6744916479613126,0.1297384437329867,0.09855378208718535,0.6171803040179136,0.20830018033024733,0.5698386143837149,0.5814695274170336,0.6403613935433923,0.23269596521786862,0.7347832632993379,0.2833065825566252,0.49326330046286415,0.8599469959078261,0.6182305113480424,0.6865801467485935,0.7977097536703874,0.5293744831772789,0.7694114995632491,0.49792892303774017,0.034089605630248876,0.1917867092293999,0.34645770784839525,0.20341372551457848,0.9986214425193813,0.6761051792542523,0.6585289445132807,0.853566008426736,0.8157769116950919,0.031901998282207966,0.46967237415327734,0.127054728683051,0.664752355734288,0.031835900697516406,0.8414442772436597,0.25042844685020915,0.7010236904393203,0.8471118058965552,0.6558894897166274,0.9836249010954023,0.7388537864152829,0.14392531265604336,0.582060371478899,0.17363652968758259,0.1872775632924717,0.007453128667617381,0.03798539984883198,0.004738553849914284,0.7179390724908603,0.17340878136641802,0.0775395002281587,0.06385141150176055,0.6036482713063092,0.3965831305136931,0.2450523641277187,0.07991902140735196,0.235178268047467,0.4839700199849546,0.5144667268718015,0.3426013792148248,0.10176198425248306,0.7686618868318349,0.8609452743520198,0.700676179988015,0.04406816993477114,0.47126145506871087,0.46665166425278537,0.07710026575035855,0.3693056573720468,0.23853754153049622,0.7824125909214565,0.8246045269898568,0.2937776958571843,0.34778421263009673,0.23234063691803986,0.8935649360776665,0.07599316109528975,0.8226615976292828,0.08312933045392623,0.02215708439361408,0.4625050820253631,0.2994039724375559,0.22802059691419108,0.9726870280437867,0.3630451733547069,0.3925476279530775,0.9945412209616904,0.7049286731640769,0.013977989875659791,0.5981016041047873,0.21746344182246258,0.7870161028011939,0.011835590160267806,0.24886181736531587,0.7763875863733205,0.26944188382743195,0.8544403284456834,0.21641564187804918,0.6292643141463881,0.15996443970402208,0.8407785393978133,0.10844552883191416,0.6264081508737775,0.2354127549125391,0.9122439621575469,0.6596401378393904,0.3886944753661843,0.43842190470044784,0.5134431289991839,0.4910801561629201,0.5562332826914296,0.9912800870019494,0.9747197780860497,0.3140978489064241,0.9966056378214703,0.010558394890086475,0.616860853019034,0.140215887112221,0.03690161867771935,0.7666581838275852,0.3993228627040679,0.011577245859529794,0.9954829012492212,0.5138320406547128,0.11568158769264025,0.37762279102680196,0.17211572710760548,0.08656966052871695,0.7835010481559299,0.9637913923919845,0.20356526034160827,0.2661703054279867,0.37681574329631795,0.22364157947408203,0.9912625357266824,0.31324544510978636,0.0010117213832305794,0.23306879388122614,0.7897016731778541,0.9245096487003845,0.7242487119015542,0.5009245622342926,0.6764829469137996,0.19875140510888567,0.565597253831303,0.23645578075743146,0.17438983854030043,0.6905857939521163,0.5987461862050103,0.7515259138471013,0.279167309100782,0.4329686788821676,0.4951319827679781,0.025053251536127474,0.3796295786186268,0.707164900649196,0.4578135693098193,0.4450590109991619,0.8590278450366358,0.2380786645619224,0.9476262833101954,0.5801699698011433,0.46055684861854806,0.37038334591130107,0.11550645639518553,0.9919908329807936,0.24310626960630022,0.8338856876963627,0.6124454567011237,0.3792801225458975,0.29632232338026454,0.8028940883213502,0.05813037740998617,0.05142261666924708,0.34832429461046965,0.09742599237093352,0.9948145385952696,0.39067438323957826,0.48314955911084834,0.6949776034281645,0.30238711068400614,0.20326985181905122,0.214708968395519,0.3153337637545006,0.5169754213508926,0.26573933014673123,0.6339819551511836,0.5633664041057063,0.9297615734506954,0.39325079406385965,0.6392694503272061,0.7624409148181623,0.22251864726020765,0.45304888368064034,0.6477453084302316,0.8424472469938851,0.47006078046158106,0.27676893818055714,0.6556614466226667,0.044717975566903156,0.4104693790669376,0.3036558434200487,0.02359818252398327,0.8553623261150411,0.03838163440504916,0.8040326017693398,0.7235750979092002,0.1905811475692114,0.8372862511273089,0.7257674073249707,0.4159610144352994,0.23065596074206152,0.8599246419052915,0.06752268137349215,0.911566605067925,0.7908367203942295,0.47655502498662217,0.3511386019014413,0.8692510805374576,0.6606945354764002,0.6010071400467816,0.21303576673408386,0.21626809041147066,0.14577053466806267,0.7075473902518816,0.9004229588262258,0.7537354411604333,0.658725680529965,0.9982209240495268,0.08428709590154493,0.44501574591559767,0.8150525813287635,0.3687825568447216,0.5247559680315008,0.16879405342045017,0.6344426269298558,0.3917486104595178,0.9011704042279007,0.8914524038930944,0.24190926104723087,0.05010433460723962,0.7437015491967385,0.8703199978627052,0.18948085085977717,0.16206602769310963,0.07349509534213006,0.8306982506328133,0.6154878091051161,0.5091982432266793,0.09096510753907872,0.9872177639036785,0.7781184306906885,0.592389856381093,0.03441848658157265,0.8856556546841541,0.10473470561418807,0.36211210271826233,0.056240990399472945,0.5126711100251844,0.16962692639119048,0.49716990100138014,0.8524535702991074,0.08998239918192397,0.34185444301458423,0.6808929241527268,0.4367881093123791,0.7882662989290605,0.4295501121040435,0.8742908287646327,0.012700974881672655,0.34951768070357025,0.3585260856499344,0.7388962778688715,0.059585490198616364,0.28413610461879757,0.3535188319770841,0.006974645465424478,0.9302407012464335,0.4463836355920172,0.7752465168390299,0.5469257732542399,0.1426902829786172,0.5829686275731345,0.4105866351140983,0.013429409074455778,0.4830720773942003,0.8209001655429453,0.4306555916514836,0.33094793689024704,0.8657845174379033,0.3154463108942669,0.9483179142083908,0.7462766365590368,0.8169876580647875,0.6505507347889206,0.8758275295217763,0.7445542666680993,0.4926066719041191,0.2873705880687434,0.5833152945317794,0.7719622358600915,0.10226456023302455,0.05272314613929385,0.20399646299148766,0.09501678132257996,0.7275032975748676,0.5384079866667435,0.8805660723756645,0.28578357872977067,0.1650561597251312,0.12219085326016144,0.4414416080094201,0.5322325086008683,0.035134033626723404,0.02459872955554432,0.8575889601665363,0.18952842515339152,0.8663555682702111,0.04506375160797571,0.8282683475934298,0.19581032623582018,0.8758246707800923,0.3075778718550277,0.9167692322575451,0.9443771242392074,0.9719641655771574,0.24365962344438885,0.7852970424494143,0.5757127162640825,0.8263118728033108,0.9663580928538329,0.2838332522408944,0.10348723457236342,0.5025733199233011,0.8335939973455615,0.7644121186770982,0.23077163120712463,0.9357787039801286,0.9639310105635164,0.8274197584430238,0.3049261906519871,0.43615738655633063,0.5812046492215992,0.6575948896526023,0.09774521453819762,0.36117615712590245,0.37293836404378866,0.6391773255388584,0.42043781858599916,0.838211388402341,0.5988965453569035,0.9478916107762574,0.689948788267102,0.872942528358692,0.7136861953648015,0.8833061675370475,0.44067067007065,0.08194721801225402,0.716773202897637,0.9531836906150921,0.9291431177367435,0.8392804494922927,0.4517433378460147,0.0019094970848663184,0.8684017341023171,0.41130495524162014,0.4886757836967428,0.7008182922174009,0.07854706050316196,0.5752202364797183,0.8379094973595897,0.11742865554394477,0.20497218103602188,0.5064262437198987,0.3321992766709536,0.32501545626451156,0.6666934320367359,0.03845974805178809,0.803007073710921,0.5239050625826085,0.3834981235234327,0.7865159707195046,0.46899110687046974,0.2763676476678629,0.44561214892734635,0.7797908226962,0.21328962316682554,0.36106252918898907,0.5309730449943215,0.4199234338625162,0.2402704467997534,0.7806754113313576,0.29542911812394124,0.7967556765605168,0.7871494063202169,0.668415141546072,0.9678557280056554,0.14839544331100551,0.22587853738224273,0.668973693800976,0.5654585995093111,0.5258812241192585,0.6106410170694423,0.032611917918891065,0.45410431137104346,0.8308368510258488,0.9995397127084886,0.05561352115850782,0.9165054248935363,0.5108376430724035,0.8004526770667362,0.0065556541588918105,0.542806878025534,0.02364494709286591,0.7519489579605863,0.609730759213462,0.5390634853683671,0.6921332453259919,0.7587210683293735,0.4143326875197657,0.7589718427916823,0.9907711192461597,0.8889973108624345,0.010254741377038634,0.266307235434841,0.02991477040366264,0.37796488243735205,0.7044561480006442,0.613313683233274,0.3593695722556991,0.794935508716281,0.8225190529538366,0.5493026418245492,0.4870943226794613,0.522483159681141,0.6845726877721849,0.24689480692900112,0.3719362567191844,0.3953471256124439,0.4529973139151562]}

},{}],141:[function(require,module,exports){
module.exports={"expected":[32.62177335047086,13.848470747110307,30.838534721838876,20.553226488981103,25.399931243060152,23.90973678481105,8.555884658304713,16.44509093608634,25.070219927921418,10.410351898868262,4.158421792438176,37.04748520727788,8.36537495608036,16.19625116689123,20.296475003645423,26.449685212994396,22.071364434887663,33.77600497428047,24.519719908090842,16.918547279874268,18.103640668091106,24.88201059107576,21.96170148528052,16.283512886826205,9.619415163214839,17.745051896350905,5.968260544798766,13.364892121306045,16.76138491272799,11.403289769161788,4.622748161131506,12.413377796491174,18.724962738875426,11.23592797995991,9.03657241386867,10.010674096907042,15.400426749330673,1.4197953135773467,9.056887414246702,16.014716354817907,18.09325542449227,15.005696318447841,21.42172129255059,21.438736410988785,10.570280752272383,12.735311166675348,19.133345581658613,18.49195704669998,27.624248353246838,15.744143142381805,15.61248788034485,19.556093738630288,20.49514672136109,17.000524892034235,18.491383760259932,22.221303718819605,17.41107414838644,12.318329098964893,25.522116277428673,16.3391102868002,18.778840485001044,19.43467650292442,24.28693884603756,16.09165612922167,39.64519364751813,4.1211027132619735,14.515865962281076,17.63323141466558,39.318401002434804,9.084447694957014,17.505581969499517,44.921935897178145,8.093266260526924,17.033616744220883,7.004750755171999,29.79811007606306,28.242912031545178,9.470122778586848,20.082644913433946,14.43264248921179,23.718443625507284,19.09728973172586,11.297178339870928,11.155210636591915,8.082561611448636,7.762752364749813,6.769165946272191,43.73295243079548,14.260269508247708,1.7230732119777903,27.51693259064601,15.80797980198577,7.600906837149832,18.847534201312648,52.55811651352058,15.11635998596656,17.372505000066518,15.75288146905098,24.11747053012857,26.002441004357745,17.35703010082573,12.958068821304472,26.781983797969506,8.357459851543133,19.34050059862945,6.245035372883427,18.06562456811686,7.816545128713806,10.511290137078607,29.599740643508756,17.790235041583305,41.105737421607024,16.28376473038086,6.1831646082905145,16.418368332700897,21.15651665717387,7.687456922019745,29.550602206069392,28.202255127878544,14.058012835310048,31.983059504419913,18.940044851449265,21.610247353883125,2.3743328483841033,36.77922285434184,28.549951346605873,24.067591165170228,5.007947274277994,17.6932038898224,20.83164363123476,5.608094305833839,27.590604503509034,23.284962658490596,47.948551526224385,17.829251715274587,10.454355367187876,28.248941559327758,24.985781236284144,25.431521421468354,8.451759007541387,20.527255743319156,22.155202327024572,55.56380684663426,5.725104532417027,6.7455442723994326,37.30966907666461,25.09109124773956,25.895714972852623,20.348558715726657,24.933533949962982,12.060896338051894,43.80912014097424,1.1860072285290717,18.168303866105067,8.26602814681333,13.457330203896525,22.01561462192675,23.78857042941015,16.38448821169401,46.42044389807732,22.582961677775465,10.731204307145118,6.673316190047747,28.183311824136087,44.2062119535566,13.186848831541965,11.65181510002659,0.7719962398441911,36.20690669727331,4.526003840659792,20.376454209973296,16.258667530340908,14.043075562538789,40.72284374604607,19.874524083827936,5.753900442871611,19.488379187439026,0.5551130694199599,45.49733750500913,20.424898190786557,10.148653851732192,18.473725283778037,7.7771794108739325,5.946449609618891,25.90455051471126,39.78534803413945,21.663383286193493,14.8975676878009,9.69303563485588,51.36613256596933,42.942205836421955,36.31448476159426,22.25781225729915,2.9626202768814203,10.487839492320093,15.867711848952087,31.681087151074458,13.737436055259863,4.231754366136416,18.19881592128266,41.51069571145004,7.49241828246073,39.50208942847681,6.054276969600288,3.2005112855129063,17.815918514080014,18.517243538296988,11.020279834445246,10.75757034960576,15.087051954669935,7.365598209474953,44.10537015038052,10.100438768368333,40.145794370695924,22.523844150559334,16.364774865221257,23.445664927561694,21.926303991117354,16.67881804787817,17.91868632012921,5.343050984887743,20.259800917593097,10.69216207108154,15.445427815426461,4.30035386417431,2.7646234137672785,35.064535720282194,40.427558078529295,17.992760803637402,33.511817960013644,15.89351559088852,18.90283482597907,3.244824020220597,36.71382522543278,12.471487726112066,42.63927679861398,23.84597278877117,17.9498151751049,25.41085251044332,23.94842638407011,16.348070117761644,19.390525489179637,3.074038622466447,34.38729376412582,21.526256658501318,15.40198196512478,3.2492324701790967,12.490846366110041,7.679188745957202,43.602355126978274,22.386375744084678,21.820912845369328,24.24756164696902,28.115380131887,42.22640949669699,7.714770649427605,10.58928039326741,2.525920835546656,29.01825447996907,29.576655004997736,8.59655577176141,15.09324142416077,16.574181741077435,22.17473486951512,31.80441807383774,25.969613071970677,44.023546601038134,4.0870518325220315,16.160684021851708,33.753114904557876,12.390244773127524,19.318941811372564,37.94864589509845,17.342703870168712,13.083288876118733,14.945631115140849,34.08627117333003,19.243092506720615,47.85960221914597,45.367705790454934,32.63715252036592,6.138090312433935,9.063801054859315,21.09661942216598,20.714755721138356,40.69630565882191,5.108009471868309,24.34702780598137,9.087128387787233,2.5978206999046325,18.548306062687445,19.20008043375895,5.242790141528423,2.712245419079507,2.9379597535577653,22.25437264905764,21.04535832419125,12.392120860472588,15.940471306376397,14.52150124811508,32.07644428999225,30.982901059796518,5.9117962912263975,14.026034315303182,1.6415409805695977,20.473238580719503,17.070297572280587,14.295159456881313,11.498180269412176,5.054838277979772,11.514066858209127,10.580767276688553,14.431436699458015,11.882371306598978,21.336068196093446,22.243507439432623,17.088685774711184,55.466412245642374,9.477457353083595,27.85067001397332,19.306880885438915,4.310422588342752,18.584652679430626,18.469247338589938,23.224366521278238,9.968669184873264,20.538681879646894,13.841762401467086,34.53400398107446,46.83378428471837,23.058075501638577,38.582404848299106,8.913780689614725,12.77195565309696,15.651280712171019,25.160079336596908,49.872864594437644,7.250399720881317,19.35149277010631,17.211134379424188,14.42042647012359,33.82809875147393,37.124105911402225,9.694049269392426,12.149631064171201,16.55671894308526,10.127258953196575,24.311926782659363,10.446444504478091,2.9264868084022173,26.28562976124091,14.254848028052507,44.124336485063495,17.971243481522205,26.460873715582363,15.870779694672294,7.505096187522315,16.316572487972934,23.418147088166574,8.835861854128236,16.150692506811335,21.2709551960626,14.585834018385418,17.069650240116935,17.374044203897085,23.837274747903468,14.803348951901743,8.101416711826213,1.397343191153791,0.6379476641425961,9.403612059171932,44.92355135499503,5.239833324544187,31.876929871580174,16.546301372928454,43.8774087532284,20.23191293813371,22.494142043113442,14.896969984748416,29.280885320706915,19.84880882461797,28.229048579176904,6.30727793926925,8.40051883912777,15.550225936942486,15.031456463555195,32.848774470963214,29.266903772321953,20.603468490948153,4.681157101239619,20.557020574879314,9.44803629707581,40.228596200632765,35.91559611566289,18.56800781588963,26.248994740774375,9.885726396533492,8.406156044495157,3.559339059025331,4.819567078015006,21.100355996391546,10.96482433064918,29.078810802830315,23.634723970075775,13.461944930526542,34.21087434824805,17.523458325626656,38.606210548773795,37.4527772119734,19.880725553468363,38.36842920332583,20.587831328496353,35.330990579465166,20.58551540208396,27.364076966569037,20.00526103438238,13.59113777934588,18.911812882112077,27.858398112535788,46.235745532236095,6.1268807256167435,30.731018772499215,19.643102055395254,48.51236167334472,8.995229821110238,31.112928043661395,33.16389380177009,28.22652641179382,13.861192477565252,16.658870100517085,13.79036289307085,41.88469095192117,5.123099693415432,9.142481315120941,41.227345193411125,6.146201385984393,7.797169901507584,12.583943247529081,42.932434111052075,17.848595706133445,20.753565681471585,44.649545916520516,37.13276731494193,19.736987137511317,25.06095967489268,34.83514199515306,44.97357640940576,7.884043533013605,35.16413489476042,8.968332300103086,7.514605432665063,19.40931499455039,16.25155333777005,27.820635328245718,22.156398766074723,18.926882429624435,11.202727876552217,30.011028553119168,12.663882121912856,13.659141665161549,11.764296174765212,15.081005330288905,23.836855020860504,4.391212730300116,52.58225242814723,7.344488939981222,16.582740662350897,13.715669642627951,26.998412305346285,11.440419517693883,6.617136963791493,32.64817631131443,24.131387574518925,17.029086876167423,14.235559077272399,20.81853717421407,17.30327786441606,49.971481292545505,18.200690600481398,37.013672837369356,38.128631698158465,25.742409837338613,27.22191718363609,31.619386224358713,14.603540336031234,6.50842430704282,4.275538842368653,35.516732767503235,44.49587736108022,13.188810557786777,1.4597930460261277,18.258304440032116,17.402742134636668,17.967978557180047,8.50034077527783,19.994202280692253,7.958182313443187,15.27763945331096,17.739219797436498,27.044211304787652,37.895758330812285,18.36345355490819,13.818699783537017,28.844881249202942,35.094548437330545,57.77030319505406,13.310094033144274,19.281202994084833,23.30544346587464,27.24385254102213,0.9256875409965665,16.093746518145092,32.31454704225677,20.412766810281312,12.46057260094631,6.592141009665682,35.37077658355632,13.576804411768094,19.302002576506624,7.724524990407035,19.596210543374028,21.506967624756875,13.484881554908263,8.179850209793749,29.59550400961968,34.137126010746904,9.708302544569888,12.779762304962523,19.769998713306702,20.77127100074852,9.962143907727544,30.77685774202864,35.989643532298814,19.33597383534223,21.874265034471485,47.14912539163453,39.51898422960121,24.978814681720177,19.581567138951996,36.8086319088575,13.708058144763053,9.996463620484695,19.72137890459945,17.913283123294544,39.338079885054306,30.512881597072763,13.89290363325426,41.35661719301172,25.076883487207425,5.875079859962155,10.290403830322827,1.6373688073420407,15.731898791777825,11.685999882708899,7.391568262138447,34.448337786545984,24.472566096892677,27.83389846628726,13.324462076983211,17.812296861414534,17.676186913276204,21.81885501645722,32.0020230714911,2.053200692608281,11.47211643489371,43.52951781803205,41.41686989687907,41.15929584087203,36.99819471317329,43.3966012267942,18.84644149921158,27.142935470665844,14.414723050346788,10.548727769024325,28.69579088394004,22.30344766153621,3.9754708052021193,18.81133587492023,24.907413593949187,24.042279689101022,17.048041975924193,24.699705535745178,5.3504377005288015,29.814018170128183,31.044493430001324,35.77043294619849,30.03658994056999,18.481783321924965,13.042443179318962,12.421224202501742,18.919353625463447,28.803789075736738,15.262602675381839,13.189475835461584,16.01961971465774,7.777691027776566,21.2710394231555,16.18564507212435,12.883391876088975,10.14812146008898,4.1491976188498505,29.73311730995634,7.172181233670522,4.960424538718645,23.892889882241214,6.251294952324264,7.662405531204442,29.59257654784119,18.567620309994215,7.0315773358074525,11.385633672044492,17.22868463681577,6.5644642862003995,26.590816428278597,6.140600240146953,20.654493152220837,12.361452683833235,32.861479268151015,9.802380119913,13.01539228173966,23.790723154708044,16.178877066449743,12.736537214528989,11.769759106990588,28.34098354403552,25.237132541118953,23.62202822063103,18.898158128926177,9.352190161441879,5.553319853762158,16.9130354790166,8.834859124169379,22.743096576926913,45.39424463045812,41.14244035129347,27.885587106632563,19.37642342433994,21.443073957302797,10.486799539644435,18.45492978381698,11.481988684924021,17.299900853372876,4.374839640461956,4.566340670316871,18.437150915872973,4.011033089469201,14.904375409676005,45.6737328902393,12.87431795358701,7.623103811077744,23.399485894888194,16.936218573874907,16.65886105521217,11.279417084209804,4.968133648685165,19.23836169088263,27.10690137641121,11.1232155448796,18.806884991787697,22.402332249871208,9.219468563776308,15.691579616773584,44.06240667116673,20.34428634950277,34.038425240252295,11.515122534976268,22.278378101687284,17.51073512916842,2.072867295358015,18.66891521723871,12.774617899804879,3.096886749454879,25.371710243932384,20.273774008732737,12.609918272777593,20.737448430702113,10.17314525483297,23.11477965244837,8.699164968462211,6.999760002675345,30.789266967618133,32.22251676518757,25.227387284917764,14.446658248814199,14.282823516119509,28.916785415535557,10.362127429785552,35.75043357100964,15.41306849496684,16.189231066786668,28.419773990434496,8.594949600658481,28.91407511920538,22.935774616870134,28.64584917164713,44.14295113337987,35.34582867096093,20.57690900047673,26.370887930186328,29.714771615371205,12.92085950626976,29.93785582080117,34.269691528798134,13.42179216222064,28.040165858870733,9.414448178223843,25.08151597086468,0.7128849222605241,18.38798101829601,14.490980499147549,21.843729602050352,16.534417788069103,30.759399096626765,27.47871093532404,6.143018005205316,6.687183737489532,11.410673103786056,11.026304435679643,7.943541702309837,17.028113426462177,11.565950367708492,46.8970333288727,5.999500017758039,43.86407672961185,20.00848850375169,28.41476766174783,5.281086915840525,2.618058970986006,12.934821839498,22.341433860346342,18.919144490991847,9.158902014030303,22.194546158847768,5.530892782686047,5.766929198834029,26.302617154947697,15.473580170348974,19.851610093542067,30.380272966706336,20.281538107137123,15.222207648035287,33.91327723147855,14.3302725110562,8.077526104203955,6.845954424760789,15.104171820885252,11.01264799512406,13.065063699034633,14.72192225823077,12.72871746249016,20.283766987137824,14.024490454876048,28.703837790802254,46.468048051647386,21.849514188602498,22.107404249969974,39.576603369895466,42.613896994326886,33.338395004966706,16.0100028533627,33.54257298663843,53.21545941060444,15.432351810355714,5.00056583353574,15.659352526126323,20.52910298797105,30.940394861137182,18.312216433446103,30.721049225693022,19.800846642620815,2.7557611868111778,12.161015876386513,27.968909425933596,52.28066718120537,29.81761107110068,14.62542998263493,8.370724442025812,18.45507456668001,5.128079437648794,13.313260985006401,19.87930250741878,13.388049969160427,16.23445715900538,19.414145359623603,27.81498311732537,18.694141749048708,17.251262397839344,43.708743190977124,18.160580332835142,35.81375407527591,23.880068745278017,6.931710635166571,14.974450962181415,13.857754121176956,1.5146569635610876,32.918866074539814,22.95570923027196,14.385660251354594,11.789962879892922,14.904059773834923,29.70716225427983,30.156073087762152,5.339265015067266,16.440140975529882,10.335922649810081,12.066967995591664,31.25569657800915,14.529889833716904,12.723607706745684,14.338801535892271,21.85538160047817,25.37054240917205,41.174669834561875,7.581010161913989,9.121980416601847,35.21743679905214,5.75080293491963,18.207302497472224,0.5063310464311669,13.306366799749078,29.71459923592038,20.94716063025868,38.14276984032751,17.64404670299162,36.49980048357928,3.5060699695274704,34.4607427689374,15.705723127771424,35.751653543446885,17.38472220944098,23.53513226453031,26.15914860441628,36.02893032509927,4.5872152656447,15.209278818983694,8.326269646288683,17.284643977490916,24.610590540434295,3.181956641562127,26.36263344246103,20.284630928827866,3.54668480694934,43.08380109576946,50.131203563324874,32.21677536467239,17.930894495124704,5.588870829914455,10.472432178318739,17.058688058908764,24.695149082802992,33.04959944307035,25.361078217046135,17.560089956672293,44.26095115755881,2.33213191259613,16.53165143422943,31.610796556770612,19.462075563531403,18.973407157906593,22.85772615845489,0.8639406382352515,23.86225844505564,11.787072915525862,32.3972136677195,0.4567222930196255,44.27289783411558,16.721425029207023,15.832350739388936,10.940068411205438,53.64368583330099,14.248783729139333,46.44766816299404,32.44776410105079,13.885133718224676,33.61390883687045,5.624858377961522,22.96586549207033,30.517348228723158,16.249558251179238,4.067437972947102,21.011778210302545,14.909221428675824,31.33670936445606,29.135702254084812,19.095665047302955,19.228276273153284,23.473161313329843,5.186952922793077,12.817278801819917,18.471951191949284,18.463439186620924,31.185724831280627,14.6789591553725,16.83766825041765,8.040800570986026,12.737262692983743,14.3722610148399,15.993667510586558,40.08128285754543,2.4797181764551395,32.264511269642554,14.821990890134181,9.176752802456793,16.209713240740104,11.101658606451494,11.864788403875714,15.777167845898262,10.33093423818248,20.307186526610344,18.85898074061304,23.574390286053426,20.948944165294,7.311742299607034,13.543694259475304,40.15122839349651,13.41674625663215,19.069968860195434,37.88046702510045,20.22155232415073,7.653997556467699,37.30321449789247,13.153057441662408,16.5114957720077,15.56444157351245,43.434015735866005,21.39777808316617,14.961759959403594,13.760207683951185,36.96346046413832,42.67686611251892,18.011740681734324,11.805979274919084,28.393284733068263,33.238308448936365,20.939456856990766,49.79274277536685,29.636486137719203,17.85607011390485,11.76937349050064,23.513424706207076,9.478162518087553,28.73755484108275,7.048966319577414,39.94692770586683,15.253648174846695,6.1175844088170255,7.702028647387747,21.10684207242392,15.452238138117522,12.289676421198068,16.40477584997759,11.080943089494543,18.60379592126401,15.881210171442163,33.907769693387976,8.578649951064143,1.7080713368524156,20.54582816867738,26.221096960999837,16.415696170898677,24.821007987688695,9.564872639433991,24.171857371821392,30.331684392042277,31.938248911630975,13.688602638052757,16.069554705488223,23.224128509875356,17.066036048733988,27.297996800805947,28.40366022278401,23.84161467943555,19.886670312986396,19.616216977434767,15.869524508032848,35.5874649230606,39.4381885540851,18.945519934914188,11.9263274700064,2.4552963228095095,20.83715827247574,15.750396746382037,26.55733346229005,13.899692432189578,4.772251418327861,17.868647214370142,21.337982975698576,10.06980274543402,30.690860073907498,20.012174146792997,5.3910014795217105,12.067429454848252,23.807874755833474,24.586544639185593,29.006728287433475,7.020588014860261,38.149980251247825,2.118029786832416,16.1426962846412,42.734523727927396],"b":[33.87108718360041,16.532919327152086,41.704502153809955,20.604720285869824,27.283764649359092,26.41789016302097,14.274856585008546,32.59925858955164,27.572625527896708,25.555915423546963,4.515873727856365,43.08947352636688,31.01396621571051,27.35617422047075,52.37132105320757,29.56372649330315,29.144660510537047,35.810817509932356,30.04938273129212,31.45854056672165,24.262991291076865,43.71743583001091,34.728549355596144,40.92048337698407,28.552742574586876,26.360144692442784,22.00192962606146,46.94110638753566,18.045835184421087,11.894484291862405,10.622623908690487,28.90922130343023,51.81393627249072,20.6788771981758,37.16702990208374,48.83442372783996,28.49226146455043,34.10660656837475,9.958521539419994,26.38256094288794,19.109713721938867,30.665134103393697,27.7127186167574,27.42814375348667,12.065467755191177,21.86924712612835,37.53242703004909,28.550678178748207,34.98497247436944,52.42891909266295,18.937459589908823,28.917580493217745,27.552079995220204,34.27699447306968,18.763871202426998,22.30597813076443,18.187610829507435,39.3637324366176,31.478813864091858,16.4389894669364,25.961652472343317,27.72136990828013,57.14682063600567,54.46541222513498,44.43773391453645,14.810240912247323,44.83606877909911,20.05250893225653,42.32894357606794,22.204607572763337,17.519161560599095,49.21483214046198,8.957691347810787,35.69920552632196,7.085180023635229,33.36872691395381,28.39057176928938,9.773524884309879,20.168240500352077,19.57180573520133,25.357973068101952,19.098138343060338,22.37195548682616,13.390315283905677,36.767340609822824,30.099181190278326,25.182123805997705,45.882034389725874,36.3264204743012,1.7635697408810147,37.28160200320427,15.885661799238733,16.61409792022289,34.05384214337961,54.52234149536953,17.55866777552365,21.309027601817093,23.34288164242318,36.47333957473153,44.31524341375193,20.555114451883973,13.632168008958935,27.181534243589955,11.604316013291367,38.509242681941785,6.463065000378689,32.45802986195334,12.851722689396766,11.637499449697426,33.72593321680779,52.76007355144027,51.35836156014646,52.12064968045944,28.658988291604224,36.12226659223472,23.22191366959345,7.93392986944808,29.61137067622321,28.80798581498556,33.308541598258316,37.8459074005324,55.01496652383455,23.74325223436744,35.8902245078032,55.46628997707249,40.4948985649591,26.847605530239743,10.42010709571179,28.713564201397066,25.073431100790344,5.809466435341433,28.01701007805365,24.331275088048578,48.11410745283437,20.38485047461073,20.15428966139983,35.931130624962364,39.70330054189374,35.83787120237913,15.353505937294901,27.332609059409798,27.174166378994688,56.027736696930795,13.501044045145196,12.307659414929542,40.66449422843845,34.513559565303765,28.93837528018869,37.38772881760023,26.01242914410459,30.57167187224416,43.83608395612578,35.40735283700774,19.441242418582267,32.63851238899899,18.500709001609735,22.997155598465095,24.532797126482514,35.12321738806432,56.27409423311353,39.16680384279714,16.98202133902668,28.00051208192206,29.849986857855793,51.848105480265616,25.085279164412782,29.475351109214266,9.034792455402929,39.01327132425134,4.767764201017282,34.38956872551798,16.856676675350247,18.627758672734537,46.25321430560334,52.870507937936026,26.57014098443011,20.481012802571858,15.720783355755783,46.890777117265245,27.31698142830292,10.732427938686143,18.66964043319272,17.031902365738183,14.371981544812606,30.222739222596367,43.66187266548596,28.550090085063236,28.632485804164993,13.729677791571286,52.07476455405184,48.92573970497964,39.96838985769955,24.16347236140957,12.464256788487917,43.514778203993195,15.921957603350453,33.102614253108555,13.740299009996217,15.989445186044735,19.004371360385832,42.09394421514712,31.29457121629311,39.52118459680804,19.15490906487556,17.443131132318758,20.966660280741486,54.4194950985908,11.034379701151824,30.804574287500337,17.477986370368225,36.08473116339923,49.2556175917188,18.077375845219642,41.486725705297545,25.512413797741985,29.852824412230888,24.4833884185436,24.458139512183926,39.49342893178881,39.114152577868985,33.79584679897857,21.900403273970106,19.916375262006277,25.77288074333195,18.57355533523735,2.961727092652322,35.95730556346291,43.51219173848052,43.411578812477174,38.241866568523115,42.33833936296308,19.588172101098685,28.182332570588862,36.96282364102758,34.703039622454675,45.49293195893746,26.30073730407866,24.19585999104855,26.705476914518673,23.96715522823369,42.13192015546919,34.380914945128154,12.316888429776704,35.350363927677854,23.28871337057538,23.996772943214623,4.171825501742776,39.0641586250186,26.927142670464274,53.39995375602131,51.78432343339584,37.45098170058661,25.727351268987654,39.928548923563795,42.23694705482626,11.90988528307416,13.945643577710637,34.79073219737636,33.9580439368038,31.98407283343864,13.950082356543598,21.68036710813059,19.284343231625208,22.249985626145822,33.128784385712876,28.547144096251486,48.919603534900574,6.471986911658392,16.295681251176116,34.492285415409015,32.37169787764911,34.48711814059119,48.90888270762739,20.658227906750078,13.193203251364713,17.553856050503057,34.78186970546794,27.61776536867461,50.40687751983788,45.37278341837411,32.95829655959474,37.2447980778516,14.618006606539558,22.408893858667767,30.612941258973688,40.745226320182475,6.57082022809274,47.81124364208508,17.804574112862888,3.235516325003247,39.32164053607576,42.985140668783735,5.256084664965535,2.7579488559762044,6.07008983594993,39.33262815890392,25.67968672981121,16.196971126665133,16.50196923976462,15.67388062818812,32.71658353686117,32.00998617775198,22.594506184023693,40.07843204515204,4.868634027970926,35.83647224781785,20.06325743032722,17.59263947865454,15.361287586846869,5.063515984239637,21.452193623818417,27.133095389836086,20.107401570923386,30.54315951106657,35.17286595038994,24.51061414834601,20.940981526506036,57.01504309666478,39.68180890455323,28.92323321916908,19.49995732945252,33.38966794341677,23.516875713155564,23.32395716449362,23.343468875149274,19.335134425701366,35.53121297165631,18.412553570290818,48.59048472596887,50.553209016408495,43.700044250673095,42.68788784428243,33.17334993900096,26.125578666393963,33.71002522990822,25.825189051976146,53.555399369854285,34.06698628313447,19.387647397207147,25.311611519686956,47.86829219652029,33.85716581697661,42.29370780112948,32.15260514875511,19.818223150469283,21.753216173948474,38.779587350510184,47.28215304548712,10.63930881670971,6.076012009389626,52.278646330917454,15.283513351393792,44.980292230079414,19.94454766888645,27.390042014831735,15.962003961980793,7.569448636922469,38.55543928496804,24.735431835013127,19.99991321528016,42.03580726106901,23.17411547603936,21.53205784304638,18.338408882637587,32.11116707442404,26.779859436460953,26.608827061410413,12.151557177542598,3.9325950822175404,13.959483087122466,17.65454103916744,56.58134125722029,6.629852039509863,39.063967655073164,29.499602798684567,44.432660511079305,41.01717745147252,31.385186283933976,18.753776144227913,30.039570127373143,20.68959518622179,29.357383463958463,8.734978507509501,29.926041823786505,15.972781478884187,28.088340795755094,32.86141153486767,48.647805675419875,22.630721625275356,40.749008657473496,22.78932533757214,19.99292109589366,40.34797894188179,50.12606701697499,29.137650255514657,26.84655658309701,27.022328980168766,14.976607419882807,17.150177270860077,24.74654369405618,22.73740653959415,43.59227508360554,47.428116690246526,24.73626512781843,44.90986239581025,46.21987142128582,17.523458432188228,46.15064047259541,37.45622140488659,20.47921917443697,39.56690211872642,21.683193429998738,39.591406185130744,44.3877794727936,27.53272463830433,20.706660306438323,15.206624535996216,20.481378140009298,37.63821906317985,46.416845514191166,6.474251288699904,44.84864825662403,25.94800504157635,51.32699861744032,11.78978562505581,46.11300404323261,33.41221644496931,28.22781673397572,14.416328398978916,31.609476991923756,33.56930828542835,51.425667148587465,23.935502585393323,20.646951402377127,49.6062280896483,6.153062947444532,9.890916425676384,12.629597118389931,42.94085292499916,34.72114139587147,22.971863437897134,48.541866075490454,43.83309789836513,35.24026455335682,38.83412986405973,34.87883903792947,47.37718434367801,11.231168201330068,36.70164563187672,25.307982003593114,19.894213882981155,19.466795401075654,41.94947265058838,35.220654548525374,33.35729759087459,20.80566238867183,24.926913208083292,30.25072109380163,20.67848135481572,13.821682627739259,12.80826573128856,39.49325790867645,37.64935460781453,31.31902559697252,54.73160538123051,13.660835973323234,22.843787591580124,32.4974933284857,46.29342421795513,46.506629031719555,22.268227893888387,33.67989962429172,27.700915229074617,40.973454076915225,18.591498793240127,23.99535563510939,20.125794971884435,49.97243704124371,45.91486933348209,53.48018985053041,38.170006480543336,25.956820858066877,30.300189054538805,40.44942891974823,18.855329005703588,22.058843794222604,13.766415320723752,37.398926066694045,45.76847530425317,20.067509205566562,10.112088847374153,20.32115767373486,24.904156753166966,33.851675070398755,16.67722194381488,40.397871164967924,15.918215802172062,36.05367692270556,18.581462973567902,27.756216733973165,39.34939744562944,23.86527429642758,13.82343059749589,32.537360093138304,35.41777478107676,57.77217731801427,36.854072874745455,33.21651989947382,27.76731712683987,41.04549781832072,3.983398973654335,16.108063489771347,40.030527668221666,23.753986883616122,36.24562393872996,21.26608149127714,37.4807523824239,21.72422158340666,26.86383354306271,7.929296811998965,20.06200143441516,34.14015676293834,20.21759597208666,10.978162406345806,29.956152831107577,38.75774843842092,20.213227586462718,16.642777878897178,43.355982941107754,24.608022852730453,14.468883675000939,30.904765601212645,36.04233040953642,32.50390512312291,22.069322278892216,47.36418537974012,48.05806409189965,30.67507951371852,25.002384302516433,36.90738563314337,22.036836284581504,24.481661818000987,42.68819996594967,19.070698535464707,54.9528870537777,32.787909214140235,20.301008431529336,42.49659231643801,39.21909112993667,24.357613154692025,23.303704973039736,30.34584257765932,19.023414307907778,37.42862350270763,36.144970190219325,35.15234717947276,37.25000750706562,38.26162556028645,40.24038592765518,27.288168018603763,18.11052107037451,28.648206211034072,32.00346584677936,3.0039606030250843,28.903347463705998,52.462677647695365,42.325323982021686,45.558906520332684,43.18830151553901,51.79243678065242,19.174418234986156,37.45903267168723,53.39853560484242,43.501184591734,28.752030208065598,29.04986156542599,30.985210617104084,44.951783583920914,33.346729310925944,24.118998814064376,18.753600573214882,48.94536853805871,7.396559381627137,29.928142693481625,35.312458674859656,38.73015256309,37.25735424870803,45.244368368949026,29.671889034241033,17.533593061208585,31.069453352606047,28.806472868826525,15.495006229908288,29.691272253662216,16.11805966278616,8.104273440086388,43.45081382069755,25.134236734530067,26.954125379184106,32.68530063190803,8.996086713884349,29.776148550264775,28.874264660606254,9.756646164418132,23.904125550115573,21.124081228991294,9.693314988177576,30.471715498439664,37.337890591917585,25.741457560294712,40.77854192705748,27.542751127248867,40.6446849707455,28.385761167895684,45.51752766196273,49.70665642305967,36.98426582376026,36.063557207369115,28.87671118374699,28.633531659141774,29.36091483165913,16.18402218078299,50.729880876298466,12.170153515582074,42.97382173728626,25.257614170935675,23.95514643729981,28.20302433612234,26.56469748528781,34.72702070980319,35.759182456873795,8.860247016781422,22.743519709744923,50.26349008571121,41.56984693151547,38.930941141324624,23.31548685938904,31.90771673627994,41.39459089795934,44.180244522309096,38.75551012633437,17.321239157541427,30.26859952161083,27.497950451250283,23.708722478533637,37.31362463316778,16.17412891145108,46.84601908853779,14.634906160353363,27.92746679028327,26.73920314604424,19.546189956094388,19.377590903106583,12.259774304045159,23.87728871033743,19.452474289774692,40.23746107294002,23.118232105968275,47.31213838261044,27.458527396817686,23.002272267174135,30.988566854434282,46.03823193564967,44.20788726813812,36.25347411913879,27.27839589219986,29.31806855505568,50.15021388891279,35.18766219830986,36.74795096671848,21.11497022953551,14.969477753978474,25.469313001708453,21.698804739111257,35.08576132201483,52.57957904016203,14.020786166858663,29.49197975733349,24.34247587414687,20.070709723133078,40.17977685151105,39.01198943274691,26.041446680157293,18.005588865278565,15.680836921211831,28.952167706908472,18.24108237369512,37.57685873368929,42.237631517252424,46.85034873719863,28.64506203835013,8.769488530316183,29.962328230722235,23.295281040974757,29.56403048832072,53.690737755768055,40.87063541389502,23.83064005179754,26.372664671946765,32.773645175572625,33.36711699469406,40.53152444225929,56.63910494415731,41.16680553742948,36.79099369395559,24.08802077332571,25.682564865555392,39.94816918147765,26.919707245796488,14.806680229726803,22.779510406351246,33.344514162343366,30.759596190489784,27.931602547873815,35.58213296893336,6.838928059452365,11.987473775121105,38.77960082155731,22.438838078683343,22.248213106279824,25.69578549156062,47.903264789807835,29.688505075972323,43.90030895630841,22.28825951487783,45.7712991554035,10.400661721765431,40.53367839405222,17.92149880802593,24.144043055878825,18.9522555239984,28.154858102575602,22.208682268327696,15.198320360909845,25.918421543081095,35.707007747096,32.69312429945192,28.19875715791953,49.01373083699045,22.571127001236032,38.55520704555318,35.37059600160567,20.546351125973747,16.007829371121577,43.51094491813307,16.20434262830743,21.78188334553174,38.143293235348295,32.06335393092145,36.91447407194802,20.287433029587415,15.311570817615294,39.28643751886949,55.21716916035662,25.858928563689176,26.511649875582535,40.930854853036436,42.95424415897351,39.8228305720228,44.711110029920924,40.11595995203507,56.930109478426495,31.51522641574684,5.255986207160541,24.87275523852492,48.4577867340837,42.41213333760238,22.218154358093134,32.45583802033386,20.195011180243053,2.8459935955933346,35.87016203509083,28.01509221641922,52.38889227415648,36.35699794954881,25.955901132458752,37.00576984168178,18.75357090883915,7.312342356138779,37.1297437956804,35.29542036679592,16.18475307583955,16.59915759709383,21.926025529955304,34.87937824016207,23.286465993089372,17.677887815835305,43.77099691405011,24.152033726812032,47.278659164561,31.41515365254194,43.07746856266714,21.130723358684904,13.859090642951335,3.487181042884271,43.499043771450886,48.241297166608604,14.406009797659367,15.99883549795961,27.452114530711707,31.265912139016798,30.32425437523492,5.34564009401282,55.28251617288994,11.314607564071405,17.040555381738805,33.515206027912264,30.51331853892477,18.02663246523203,23.268397358212304,30.298521118996355,40.21818729962291,45.098657455616234,9.590972888121932,9.319697719034995,52.110366041720845,16.1911267914935,46.397438952318616,8.62455383107768,18.63124862310925,41.57545053780487,20.956043273912655,43.10961931573624,35.09015309419307,48.26289619733113,18.655523590361938,38.920045019791516,20.52449168042354,35.76664591361885,20.756188221871284,35.334851721907924,30.97461171013331,37.24368685567225,25.825702022776483,15.79222555198999,8.486282418757343,20.54644299485174,38.69477426204412,3.2105921899578993,35.959610272662744,25.577544282100124,3.690648228114144,48.800636514546625,50.13318432055847,32.251126328854625,39.799035116226214,16.3807488935597,22.984931393830156,48.079591117385164,26.730969811926194,34.173040983243865,35.01395296089751,41.18375014019019,44.96562235604414,2.9533424515113538,19.576570723017326,37.68547090531299,19.589273775900487,43.90626530546329,23.954764037558768,6.8715331111205025,31.34014491467911,15.879837132437974,45.62403085363139,5.60095595029134,52.82650583970034,22.594068278513493,25.5021076345612,47.13941975708069,54.067089257577805,25.280459865158864,47.827420288569,45.37219882796224,25.55364126111604,33.662228111523355,5.94721017838546,23.443025576927525,39.74596640623998,25.71379735537314,24.968205342842676,36.53469698660907,29.601945788006645,36.03842418553826,29.80382772650625,31.52544216992762,35.3494558585326,42.16560007355301,25.7608628787714,24.749759872297766,18.596377935683563,18.464004641435587,34.106561517299845,31.287375058059357,34.84567976771275,8.074294029627804,13.802231426627177,27.09028321576455,31.744803067501863,40.15502426524617,4.1615334079769495,41.695555039936686,46.86914622094339,13.06698394175319,16.528220239739483,41.207653620997654,43.004848260522145,29.826323694472933,13.382104763927213,22.80318210695475,48.4784012427842,28.957428004132023,33.310363244733715,8.266406306020016,19.458157366541883,41.170507272337794,22.571982415336585,40.49074773236917,37.96208836853339,38.61395198413716,14.987757220720823,41.896527619433584,45.161785848540816,17.44509060991664,29.44765810668553,54.08486540946595,21.593742392025604,14.962845924761924,31.576840730517425,39.28767457052544,48.841314196385966,26.58613259520645,17.820568236969258,30.696193549317385,45.94620393239383,44.64875292769997,51.45899413806954,44.40404547533813,17.88415400287557,34.31036779187956,23.78677448907265,15.185778895930108,29.936483275149495,7.182660548402664,43.94353541802131,35.49420381045279,17.020506832278347,16.92022932027158,25.51262038925444,18.69839506024133,17.33460781889953,21.640663967486766,28.68619474365366,24.37026653639397,27.2664500782841,37.73167763709903,19.550384352529434,9.249298192260493,20.55961699694813,27.972086710006995,18.82650829190215,27.520414124902302,14.757069397010603,47.38648176878919,39.299008166996984,37.11193240827053,17.729078048819918,25.97955231948476,24.78463458448667,53.951110372270264,31.39123613033061,28.43736246216973,36.45848060602204,25.88770140774989,28.11573829151635,15.883945381570532,55.45164181940911,43.08304960141858,37.23243004157646,28.942125593864873,21.964766550003095,31.610155897259283,23.398829744508735,55.9683361842085,16.08482017252298,37.81361718944867,22.189807523017805,40.04169028387938,10.66783662069593,41.134979629698464,28.919266684772893,10.468439840878322,17.570535355404008,47.645908987608934,31.180983222082826,40.56344600446686,12.95878535983935,50.14319572765375,10.484943805019945,47.864070517116915,56.255190986563996],"a":[13.554644227519312,6.856811468227546,11.676034315679264,19.685950508732173,10.621754966783188,16.615705477769435,8.192795859135016,14.43094311893304,8.238597694558436,10.38842061502191,2.921633520254834,13.960139767146371,7.129688849057514,14.70211446874063,16.771449162439282,7.615654820852336,5.7161585797944925,9.38542646633067,1.909345955482209,12.396321101111386,11.760607345037872,15.614404024957441,18.18257025916527,10.544646204545693,5.524399043436592,16.66659305798298,3.8687603886239064,13.344137344257994,15.261045482685889,4.228072426484464,1.0262741347365978,10.350360825174075,16.87329943696325,2.3152978218058484,9.033717740154987,9.978234097382135,14.28363104905634,1.3476617378406086,5.464884543114672,2.0431982097134993,15.522952653926719,13.503406670477208,15.93347446863024,2.7486326918363346,2.568382671185443,10.222034803071418,16.735860564485115,16.911438611300152,3.8584730756274466,15.607236752093998,6.862191529949442,19.36482989457744,2.0720844335917565,15.555077965653123,0.48987130504368537,19.47422536263394,4.9057395554816186,6.0996097322995935,13.538826283609783,10.395624233230132,16.472864785240784,16.548966179299534,18.20012629680347,14.661449525350122,11.309586081061816,0.8960609428591226,12.68575145228044,15.998268683223799,15.174275080357639,0.0942418780252341,12.773787539124397,13.98077833084663,0.8455820829947536,11.364816594468365,6.672120416726988,9.044193032991137,16.437985406332135,2.5776793503025264,18.45659026479888,10.80878535574664,1.7871241640915292,4.278161818282786,2.606223334356028,8.404187767854584,5.625379804597639,2.4877901240713562,5.778255532390526,17.611051414199107,13.980502877298303,0.8972204198480815,14.084036480247848,8.08507016508404,3.730904123134171,9.490543977941375,18.51161242069601,6.276521573322329,17.0555700486796,9.456855955254163,14.156322366476699,5.062699583385526,10.504472296583298,4.015357113402378,18.20749882457934,3.3817228166290914,18.668489571101084,0.5824889273149214,13.685823640306204,1.9567314186642326,4.238168593748801,15.01057589450216,13.458718870686566,13.321792203798122,12.452596179407006,0.9847120757850902,7.411410065911688,17.46230898512938,7.222545609950761,19.689318219819807,11.34376575517322,6.034307163065655,7.567531806229448,17.890337711191272,16.30034803027096,2.169473877584367,18.579821688671,17.447653672205057,14.996185504749725,1.3424008725147107,15.45035462594079,15.623372374453615,5.569088744249866,6.027107714771445,1.433529674507703,8.613078570302278,7.235153204234059,10.362412883991503,4.3610863119771714,5.929783204683932,7.681737357385265,8.449883061713631,19.025414364302655,4.26151955641473,17.51321434192284,5.080556652747266,2.4221431063131993,1.9534060581619483,10.17473681262139,11.566029835691829,17.43918313549392,4.254247107685782,0.377891265191983,19.543533422717235,0.7260136012969909,14.359850561044091,4.12634765833618,12.4196042734185,19.92205533139595,16.365356021113058,4.313523510409625,16.796250836940352,2.3993744009904283,10.226265416843319,4.695382188935051,4.043313946884122,13.989990586125533,12.268408687023022,9.883046553154538,0.7718454097917427,11.402201077247955,4.4555194876149296,17.077058924251375,15.930314376852778,13.794455673039309,12.725300155257466,19.6408858066348,5.540473552073286,19.43157908065388,0.16334062356037293,18.425785012003058,17.654234430367246,7.747673391189074,8.930369417025563,3.9472757265741354,5.773487954264751,9.80345695695795,19.10246354825771,12.579229128538314,5.187825093521763,9.586658184335505,13.045011756195223,19.34048835041432,11.294889732587908,11.284583401590314,2.2033660518649523,7.877119139910351,7.6200376001461345,15.994922110902348,6.561875843698459,2.6647351006776,6.715655868352419,13.213183542509945,2.93827185212884,2.1012427512648957,0.9721669580360759,2.6444196459411584,15.118278261215469,18.38595025713419,10.577172119032756,5.520829957944127,2.1582748835581755,2.998245870458627,17.895420224382637,3.7685849179132047,15.837842362663688,8.264011996323939,0.10959724286042416,14.116301568895562,0.7854924025395027,16.65692934556228,14.151991831762567,5.240037851818924,14.815447788260157,10.592660425605676,13.032667112358727,2.836338887053187,2.0870379118090954,15.074421145769046,14.824366219650171,11.508729327312036,1.1558174866656357,2.439839727206614,7.6779456369456645,0.36269324483707344,12.19647919701317,6.064927069408341,11.78054745490794,10.48514981941075,9.327838001188283,16.484623678980963,10.090011544736281,4.815034460034555,17.86465208796356,2.944003107846389,15.056385080030225,12.484822903916788,15.243278997982156,2.7247481917619476,6.498464453287993,7.232214174660694,18.410653992736975,14.379858966724708,18.407020972503258,11.601460897713803,12.675773884514058,16.212086757098515,7.581981597210663,5.504285877330353,2.061305294456206,1.5843143557159367,9.08111882837835,7.3906936885629815,5.130958413075151,16.0478571987067,15.18563219576684,17.460792053487122,11.937678180679207,10.612660620207354,3.2754454568204716,7.054425869359755,13.265616583637776,0.8830210331012722,1.8716432162081587,15.669528600405954,15.320899705194586,8.985741763022158,11.761883746000382,10.972807177679865,18.05688522393375,15.124597260213744,6.62939740119501,4.802835098735279,5.981522685132088,6.446787552033095,18.728783211118234,18.381525769664822,2.837440670977287,5.007887755847169,10.150240722070457,1.7125168188142226,2.180472680847214,11.427512260311076,19.094223537296017,3.45806443645734,1.746521545944466,2.621114879661346,18.340652619980368,18.524726860778863,3.708032719781138,6.62556337225972,11.952272607610603,3.0256491541697583,8.19884164070135,3.1407797956455408,0.5042532739351069,1.044246344359876,19.23508719127078,7.267971229728216,14.17881070469965,9.585737899537992,4.572643708303272,3.4028396188625853,8.49404132134656,0.3899786353420964,10.258589407741297,17.79658094970039,12.339940483852057,17.08421758185989,19.78035491927155,0.7976913734477709,15.97327530536576,16.41251305387042,2.2520330358521656,11.388644494215953,8.42923037220296,9.487782986421793,7.46339130422113,4.0600406916770515,0.26254958381598303,14.63244242786564,14.850113827466354,6.011783687379126,13.25958567062937,7.8128099680162855,12.42377739315108,11.182355220569056,17.06711964664646,19.618797164542954,1.1490870000486941,14.482134871497863,9.208233338432116,9.409133015358577,15.807570776621986,6.739243387719114,6.550372828855471,11.162506249786341,16.478545782485284,9.360583287817814,14.125142324132813,6.2799082746792845,2.4220697742201525,17.290404851809495,8.336452793984437,19.536511994177587,17.89575934513609,17.82965997186917,13.144730394218236,6.570869519234033,5.3725919415376655,13.088682344583354,8.735894398144804,11.115632934767108,19.513376747699787,13.730531567382043,10.132239113630908,11.8060659151688,3.839717466335757,4.046173739651393,1.993056208835693,1.231158395734564,0.21397392716399288,8.01134312489729,17.25101967479983,5.045186066735261,10.465726809998914,4.498488304329524,7.755393534288286,19.400725413133134,8.103882014364622,8.802927663458181,2.713327888749273,13.164393880411268,10.146063326567049,0.7017567908896449,8.339591849902037,12.174548942916076,4.17772171466527,0.6014042763675631,11.065575392096632,3.8273107523560235,4.436824420929639,18.825102076689774,9.128324891307344,12.66830874985471,13.232936821715775,15.953611690673615,1.129923134614308,9.388456447235605,4.840707734779959,3.517929654821197,1.2782928723485876,19.58137012288804,7.798520121944574,13.935718739584612,17.942023662858606,11.768558323828184,10.631106684997187,15.340062979474594,11.619623048675809,12.485611919188404,18.743031093884937,2.0796930421309945,15.92076693701706,10.339599078455443,19.70768397004204,13.536285107739602,8.939855114797579,4.459170373716574,17.101950090272663,18.664151188591003,7.5001442097670346,2.3869490401730697,16.606592071594427,14.400264399640061,11.47568625958649,5.847964477439631,7.783550263828882,7.308584161315865,5.665771701842344,13.47138921708703,16.524491340895345,13.224725432586371,18.119732007286697,5.094462706560634,8.182962159786014,16.383314071458077,4.526232946769957,6.278579089681342,6.521099663500709,13.923415966361015,8.220748823560026,19.59995518242478,13.86997072461083,16.528290167529526,19.07806388666713,16.38096194200078,4.789410607636224,15.929123404151735,2.67737577477543,4.7226526473637165,4.982226799152283,6.8805309058180875,19.137541694557143,16.0639471234245,15.375254344821002,19.767059175654666,16.861536651433973,3.8520345081580487,15.949905826667216,7.625218184577256,13.10795894818854,11.353769700892723,4.178813879101542,17.51168151493119,4.323924940581647,17.484099054277724,0.7171456814102184,11.256232756726998,6.89543220870815,15.901705228889087,8.190556354505144,2.4189489651761154,8.444948715021745,6.9483550413860184,16.22994387979285,11.174187704843504,16.835200840658658,8.595897524878811,19.686295275494242,16.760729840970825,19.079721734127514,10.945078633683742,14.620063775130753,2.9832329923338774,13.887663189320154,13.666279584541932,5.608366887842586,1.0602040368197452,8.53337202063397,19.31477270487559,1.2422960489856694,0.3565824459231903,18.251120862328698,17.329703453824177,12.74395114457299,4.4210459311527295,11.046340497290025,0.5584169305990017,13.741379330117084,9.51575465968931,4.932794262699143,15.834426610362367,17.121267634578786,13.123877178611068,19.009460265652937,3.41564071871435,18.961385228984156,11.87831461894918,17.327673056561377,12.100071996265278,8.664978673603265,0.8915992559757857,11.989434511808357,16.320481364278358,1.665825184843155,3.201369282104527,0.20818900536582863,12.887875574069948,10.802057120537754,8.883291608967689,0.48904505920771335,17.67421680174146,8.896672861993608,3.985943689073732,1.922885293170733,12.53194687030346,3.5932800337418547,0.565195639817393,12.776715549010419,9.37761342949429,13.969543727341911,2.434402442191228,12.67667291705819,15.379396936947352,11.733035073105057,5.011804133732376,13.392562969944928,13.617095825621588,5.391681158114534,18.618078311062792,0.17145460747964414,13.707913380837784,5.503929262861216,19.013740158784394,11.371828655481915,17.254100842951367,3.6654289390510497,4.499453233593678,19.85493278446667,5.681806007183368,5.874942836008912,9.632134476204097,0.8425219543993023,4.829410377965182,1.5412120606955382,6.773966761475352,8.539029951578012,10.936128793198012,19.392570441442558,11.973717484422583,14.684549515382162,17.09776973463636,12.613717314072046,18.084750333327825,1.8960781774063973,9.832137604587125,19.747440292205248,13.600555537689925,16.59531947584242,11.766667417958786,16.385636327432866,2.2117575175607262,14.55686022816045,14.352909124770932,10.434776481491612,5.074242930402675,12.192345629427809,3.915896439668143,18.26170448457041,10.038339065984099,6.424648941466078,14.05156510578324,15.83561383182083,4.992667769614743,15.2279360087402,12.82034726339559,11.536216346923439,0.7111153138122939,17.16962939055831,6.682786279958188,12.239921156230707,8.79081015714462,1.2443965330785378,0.2379777360234847,11.965598196309571,12.633145025517436,7.110354814802329,9.048756715094353,11.088423676799772,1.7718081905646699,2.3742148256536932,3.226724453927736,9.784486307441146,5.979538540020659,4.954652843189349,15.932803174622418,2.5427556302050203,7.620715656566968,10.172367495538115,7.02976304557438,6.524649080491836,5.341663269624628,15.615147525851555,5.0264111995175975,5.792781302591297,6.137637112487542,14.169969071547781,1.568731551219078,14.661127408500816,1.136572344424609,12.279017734425516,7.365093722761196,8.49309163592749,12.664698070275765,11.535146392313855,12.74906838460279,14.503401570473592,4.196235650787257,17.394139058951268,8.775917050942565,2.924563147539585,7.981185131061506,8.587641055989454,14.116831961778358,14.11320327786392,5.166076147726226,19.653467259041264,13.092735953959668,19.168007861125016,9.836930230805798,16.797069820851714,11.20219580297983,16.96158851865889,4.11411205822426,4.479010543095461,17.36808862414129,2.357334645341793,14.402420932595582,13.110305185932782,12.867984096346824,2.154083992324436,17.13398833500422,0.4271024034843274,10.162338093484111,7.241101800676528,4.783118028363882,19.152558909558245,19.13219218679217,2.1530211376943864,16.856007736896924,10.035234135706341,8.986920130700788,12.301976673337428,9.560132128281658,9.60701169798364,5.4502459995151575,7.359533062068815,1.8203627115499854,17.427714191410097,1.6639615718864365,9.114054262528146,12.72171198912076,0.9758176207000302,12.451153923410798,17.360360622062274,11.201792884678392,18.337608553128398,0.02125222021628126,19.428535901875886,6.957383688331964,0.43105434660257735,12.795341995424504,0.8620361607218952,3.6559813436468014,13.955296845116528,2.0236162442003724,18.46004006505392,3.9036955364556647,14.31026498985776,8.609594912973142,14.253121954418884,0.33619250841316006,1.4833369587555012,17.898808025068057,3.76706932804022,4.302157924801402,13.907897791069637,13.104860051071178,9.637598109754567,17.684193717963574,8.611729835681722,7.398793940115369,2.8290162851272793,19.177865780951105,13.11145671605983,0.7939577111373941,3.3536743019381765,11.624525142656715,0.7012067930214494,18.37805943784486,14.430794818424593,19.71365567502317,14.315548410818524,13.811674907269342,14.39676105880717,1.248647324452583,3.7789964071697435,7.1220142469458025,9.959250883113885,4.247530782024267,16.73381392595452,7.935782745604714,17.802704416152082,0.37089832969039005,15.637779597325911,17.43594819842024,10.8740232234314,5.194433202448399,2.540603013373177,4.440321008219961,9.460924832850658,4.019407134705744,8.174459941790095,0.49233691412881697,4.313050682922874,2.2164706993739625,10.927284495833355,2.7731861971147342,18.085176832421446,19.113333623813624,13.378920058065574,11.852152550717934,2.343350924837968,6.71172712259867,5.906908089454688,6.774388617744025,10.022914556516746,8.659952972617027,12.636934849007847,14.704172962819335,5.185898918948659,16.889717226003626,13.08490038623491,12.421546794167867,19.221622738986444,6.7299560725810625,15.426930072204517,10.773628390410007,7.793043598804705,11.183136416745638,10.43577391832303,16.439492688597742,19.5557012805518,10.375107936751679,4.440503591582958,10.888326365635358,14.389211195188967,11.153655662423617,7.953372100378973,2.4313480928836917,15.244078340444162,2.2079951756253102,12.083794726010497,0.5532432569244516,15.302820572279515,0.9333119967438819,8.43785023956318,8.321132126862047,11.912035502109152,3.859626783457144,1.6833118294614113,19.379160734066154,8.531520940385198,16.06892941548876,15.367843556721885,18.269647390396617,18.02342102185984,12.649408783259762,6.529735438179847,15.57368192759701,12.65527235836425,4.591910968881847,6.644840570265238,13.704822215561379,13.069515227012056,0.1175459496127429,18.013903939197785,9.12373497394492,3.729882249915848,11.13535320917955,1.3020330540427372,4.214419053839622,19.84412345425867,3.315109087936552,15.892920011663744,3.8121585642790867,0.4332258435690495,17.819855055107837,12.355897419359522,6.119942474897235,11.912186923342748,17.072094442015768,9.151106525770555,18.805229033430912,5.0149972458950165,2.3950317593290427,13.29742063679162,5.714815472707371,16.201642377066822,0.43433296662921617,6.865970199432185,16.93348762910224,8.857281623880887,11.08652272872666,16.636254563724655,11.709287603805304,1.1698324546468264,13.174031440393481,13.604133232348069,1.2089110551228188,14.380990165442476,5.702996794020536,14.820872888743807,16.263861230898904,0.17989556978834198,3.7826086400799186,8.306005218289334,6.007961660585002,9.450506306383627,1.46012092899785,5.558976779161111,16.85994933312827,2.9267166375006326,18.66257815892115,11.946405502639973,8.17261777373302,15.562773507332285,3.5009662227779215,9.130737668139691,10.710261965644277,12.12074156755246,13.594032422384256,19.813752159221487,15.918536158401011,18.104066412957835,2.0124713740770606,16.47852470215701,18.276175191970943,14.630718262039949,16.7968635902644,4.168488130701795,0.37474778928867636,13.217336772901117,1.939598262119726,16.533488289039177,0.4112645509649049,15.847676452136348,1.6565053924355588,10.772569564498863,9.159781834727747,19.282963695573088,8.302376923543449,13.47985018013289,11.80832076508469,3.666649283687584,0.9248141989663505,5.294638646300931,3.031184320896001,12.21529669805272,9.727089569170975,3.8049807449101225,16.836773901247014,2.2512248964614034,5.072920985697071,19.013731374142935,2.9909957001474075,9.085264485221876,19.51667806325714,2.5028753073041,12.47115688062963,18.152052334845532,17.76620186801725,17.64051986732671,4.990667623884337,14.74335887306982,1.0864543999223564,10.302807681022013,5.790162744106637,15.988056757258104,9.957303065540701,0.6421398631656183,3.2015091743225943,10.702170050933248,9.01576095355579,10.7368107571819,5.861207120334275,4.801607510770531,10.178867199195336,9.349059723251031,8.18270069663576,18.659843362294236,10.401533247933695,16.750547478809693,3.731938543237958,10.511106865304093,15.354066667328773,13.33927121489841,16.362687999322375,17.99738103668503,19.838363654301965,3.963168467969709,4.348346938524319,10.291966222955358,0.8160822186600747,14.783244696329332,15.73261325276398,19.906355899880257,14.147612736754432,13.727493754025012,19.618331891689994,10.950789207040224,14.05310809056826,10.064193166040276,19.681098896810745,8.361012651920475,10.22982460716137,11.518155058150885,5.398726618518475,16.803544877832294,5.106568788130295,9.97374812920305,9.084929485030443,1.7510555795109362,2.584062086373633,12.891676110705408,6.4422264270849405,1.0605260074754908,7.004571189058666,19.641864299914825,8.99430684305544,12.261768295096282,15.426686561800187,9.843159647360299,17.15344659286593,14.525970048532502,13.89972205405794,3.8942159693985667,0.9714264270288986,16.8965550108717,11.308118478136503,10.003100640600522,17.713873427906815,7.766945093456399,15.16259537181658,5.935543070664391,9.722898275749433,1.42501490874142,10.356850227195121,10.369591656910933,16.982782204752912,15.005663153822892,15.358262617569087,19.446922098596836,7.313967403856605,9.133093214990504,14.413348480026515,15.695895680242122,11.214062442173574,4.500131588329466,8.530115936174361,2.275006244316611,10.130967832918358,7.243603264721572,17.55108766470027,12.040406458036884,0.22714467338752264,17.29535797706516,6.2740210516753026,7.098924416150663,6.883798102218481,19.95806164526117,3.3009893864116124,4.7801180126706155,17.150026836864782,8.293882445047483,17.6500164550826,6.4280634878264875,18.880052792887806,2.0282593923776693,12.858093090528598,17.516188280922044],"p":[0.8404683132892825,0.646845651267411,0.5891046675596796,0.8478412082479951,0.7816850600875695,0.6623631356433164,0.15713759686095718,0.21609289743501936,0.765714421321197,0.024213632102246585,0.685971349222849,0.6989687879747095,0.1460817934944303,0.22330738566973474,0.20378847668529643,0.7541363800337721,0.6296644647465157,0.8209931632007921,0.7076230669497103,0.32386707996985775,0.5046767179115801,0.389418890726019,0.3172138922740382,0.28626238084986877,0.27712804377105105,0.21649288069722772,0.22103558251201383,0.015824639840165577,0.5247015689467296,0.8370848824965003,0.41942157057441,0.21639717469046205,0.14787964176168233,0.4909450253103136,0.006412911894828621,0.018397164270430366,0.18090542027052692,0.0298843223666152,0.7043183264011961,0.5473027093899059,0.6426214901460623,0.19121695512906545,0.4782904894109956,0.6720688937365569,0.7402533866332948,0.3075498625830908,0.22053812422211516,0.24025708258422473,0.6766999003528498,0.03884272244054099,0.6483238112274883,0.09038416124978843,0.6471804956658755,0.1792502235090936,0.9220669237640238,0.8893587581346558,0.8445262253444563,0.28464996033188816,0.6090507925414519,0.9179305028524545,0.3281787933453102,0.33939376601953875,0.2587394518340549,0.12140934288989014,0.7516065303880302,0.31976948186682197,0.15336833346175394,0.43803051024860884,0.7839009972752122,0.44019220730851405,0.965928159349922,0.7730052570519017,0.7883051130710095,0.3206538025947323,0.709058891671418,0.7496903053670136,0.9290947325407184,0.8683415588339658,0.8564225506030507,0.44467962025171737,0.8300894176540936,0.9951825754225967,0.4615169439677411,0.5329948085791238,0.18126324948194217,0.28797796039255474,0.14511783556171665,0.8221726327773007,0.0713821107891508,0.8612651817052426,0.5505464473247363,0.9363644198150192,0.36928205175006146,0.4234647741427293,0.8499315680439705,0.6919150244688592,0.17601157834311443,0.4702950737021636,0.4657779631959962,0.52131851906614,0.6184545369188603,0.8294169465742316,0.8646529914564043,0.5674309896238625,0.11783434282072847,0.8766472436941579,0.32092389634266616,0.5241157711986946,0.7448576507863607,0.688837135227697,0.2154355191692845,0.652475833699812,0.2011767040358956,0.28537957119175705,0.3784750208451242,0.591262951485898,0.5993455659572182,0.9501273062225979,0.8807417631780217,0.36496050759331666,0.709931484188177,0.10756013112499763,0.6403716054538469,0.04967063556275075,0.4957915890335476,0.48835941230955915,0.6781293031631628,0.4383706541762087,0.2697953950336691,0.5326114578266592,0.2639432093550462,0.9110607296815505,0.8628553646535084,0.9587568222177698,0.7093558631638495,0.06178559975490305,0.6715861362710758,0.5410027528813988,0.5839899982749726,0.010494733399897482,0.2795866858643383,0.6899311514894118,0.929988434591071,0.1784604725318133,0.46000875480167114,0.8097696990717251,0.5724751519712015,0.7251105929227746,0.24945699224903772,0.8570399528191521,0.4273920323177369,0.9787863885203185,0.07348062529150323,0.6662920235680614,0.2488666114777618,0.27110462195501595,0.6177762791472532,0.8047830835541598,0.4305626856285909,0.6669611482388369,0.5312143924949326,0.1762898279610159,0.18819326755636556,0.8364204255080723,0.703358239261211,0.17252153576008622,0.1942831835043577,0.0027199310854162384,0.7934343653265654,0.31518714350782173,0.2876018504694273,0.40598166146086334,0.14565372802421317,0.7337503023948364,0.053444086571005744,0.06424300343662526,0.14947721893730348,0.10145367569853136,0.8579708928984378,0.3597370215051263,0.7083606127712259,0.9094021665858849,0.3639232943019386,0.0905963519544617,0.6957954304562286,0.7398984474986172,0.543935966437725,0.44507778427669265,0.10245252818486184,0.9139569837690849,0.7030482522332724,0.7676159985271771,0.7486334298195529,0.17538347808358856,0.17448445196679674,0.9484833255567888,0.8138476313155898,0.9872854290947204,0.22284023822655552,0.8351694176394859,0.9092231018560446,0.262504137250853,0.9856177359569782,0.3546251855347533,0.12419369316228601,0.47531430667264774,0.03845138329859443,0.8876200585613725,0.30079522573155004,0.7414504481109017,0.23671050857265596,0.7343678920077308,0.46332277289028134,0.8531384724488014,0.7266862037825972,0.5296564927868119,0.7950633962435087,0.7879009444768441,0.01971263885234631,0.25398122015407565,0.03825961961769564,0.6803961416142554,0.06588343905243454,0.28663042286077967,0.19731713936814343,0.6851121307290344,0.8674136669372643,0.7873122992544137,0.29774017764609173,0.767509961472272,0.39443206613415316,0.8457844787103277,0.20862309946855495,0.93605922676847,0.31364146830789563,0.8120628428211012,0.7422033304136686,0.5510854184321674,0.7683485556676113,0.9766071408725188,0.3752745275134881,0.19661172777910774,0.07515948799797023,0.8601952760791602,0.7353117834624208,0.08598111074340031,0.41128496640226353,0.2822416789912703,0.09627219693277311,0.6450095126215329,0.3062084186290459,0.2783238472365903,0.7901716824294738,0.5424824591510762,0.9871889353312358,0.11209047852395138,0.5656482822982105,0.07603099865495033,0.7445191985910262,0.7898013132730417,0.2821008038352393,0.5653761416306562,0.2642490501447796,0.9341776461718128,0.8122003630255821,0.7422272916897128,0.7672536925265736,0.33619389608022865,0.9228670140403066,0.8805008309008096,0.41326721045471104,0.5222611770252847,0.6106052985369452,0.42206834869689147,0.8966509310069155,0.5316813134063485,0.890648175786102,0.2291557955294805,0.8268152469359633,0.9927117835932822,0.9318795031828131,0.04508966733576569,0.38296234246743843,0.5926010926784744,0.28774646395056847,0.9771252935398853,0.16290106197968446,0.4208590678288837,0.47340706595831694,0.4330274194297139,0.33720071224912607,0.04240768135298212,0.9451904957134702,0.8636316621633833,0.19603969237359875,0.28423262794694315,0.4045414135699614,0.6277617429395363,0.8467295496425569,0.6243199993167439,0.9061836624602322,0.8668117281744114,0.2463733280083209,0.3974465743367459,0.25864716344855077,0.17609507594260543,0.6786261907067086,0.11820570826457333,0.3903357393319409,0.9151041803787299,0.46772639519932824,0.21719971337189237,0.6394689350153657,0.18261366715926775,0.298098679669329,0.7159003485526567,0.021672970586574802,0.8692512124705423,0.31327000084830137,0.8141582785575732,0.8390914077276201,0.16554132210811257,0.5597643915008021,0.6131833575647665,0.9408914311185419,0.3038557036291789,0.5150366027301003,0.6653200002601085,0.5550638027015464,0.7907760398998163,0.46958514494597225,0.7563099135866178,0.13362334237476303,0.10191751285818107,0.29387208469230996,0.822262409772806,0.7862990830847034,0.2833411896888254,0.9452789033391582,0.49807123531667474,0.23511087715329704,0.974445721718513,0.7509441175029741,0.22791742129504455,0.2192996761211421,0.07769443544606136,0.10322302773312009,0.37401426214801115,0.865088741051343,0.24234523274491382,0.33852309061147356,0.7485399553639052,0.8825695872256101,0.12295975999550057,0.7981682248157682,0.8848158011325906,0.836600641112065,0.3894431835352301,0.7816432342011252,0.060063031683503576,0.26443736516306404,0.48733797654067623,0.21484509702113463,0.7427323976192779,0.3508646471889616,0.7668144506373036,0.4852054037018618,0.5649425657578879,0.15956407516594262,0.1123899490163085,0.248132416408837,0.6334897926233385,0.22795870896691994,0.6657041608680097,0.4884689562142155,0.9214712776917588,0.12564949250381274,0.5759044673925322,0.5721822462985908,0.8934260017013089,0.7830276084761776,0.8441645055214944,0.6294580715581604,0.03383754741933287,0.7835118891134649,0.47062893205384526,0.9873991645143294,0.4900077354409045,0.7870156007038724,0.05227968466321098,0.45971369281595975,0.10975030748552927,0.958160824079451,0.573755320659072,0.29381232860544415,0.9025771305456189,0.10741501267565012,0.4041900987333733,0.03510475897155252,0.2539814098205124,0.4880895155834142,0.19225346222259954,0.46948158806382967,0.7361769588772191,0.14515872520669437,0.6054061280844152,0.99985935825883,0.6903662301474665,0.9925231396320968,0.6005185467441703,0.8855556453660427,0.7127968658703789,0.7507214072064547,0.1207872365834799,0.9299775099943854,0.842983383218026,0.7465373982520198,0.5226528519649287,0.49017482153841807,0.956538098239345,0.8116736542925029,0.5000766099078024,0.47068306838202556,0.828754149293057,0.5189061517866815,0.5697276406781748,0.937808819921282,0.9951855784607495,0.4440182992705244,0.06017552576876173,0.10664931824680934,0.64045439204757,0.02482569559659331,0.17898431402513126,0.6650503817840825,0.9586261172263302,0.4491021395070387,0.9448945961154132,0.9891558115379948,0.41185808737481033,0.3977431892311132,0.7824905161169624,0.6700659427273472,0.1294325214995904,0.42716206937316814,0.9757336559970979,0.8216762527739134,0.5697556423040917,0.8592657199510134,0.29206110364133386,0.14169080143080004,0.7255849316046179,0.05426267923941741,0.5818231103908373,0.2754492702051585,0.5150623780419425,0.40220505836686726,0.9173490796837351,0.42678660526711276,0.6832907815704627,0.3565691432900624,0.3750408924403996,0.3787383468713408,0.03179701587942918,0.8455622428209408,0.507648722885532,0.474300320849697,0.345258538122301,0.4130574312713937,0.18813163305934477,0.30422582748076543,0.870382023654279,0.7277493339597734,0.11503437695138286,0.4441583077002551,0.5359305927035467,0.670502765964216,0.9964237136151044,0.1426746992618142,0.5135823894119351,0.9751758332837761,0.9121710258782629,0.7820616480919338,0.6087806961661724,0.27945001384136003,0.15030318678556998,0.33557249783029297,0.8356161688370722,0.8592243073135362,0.5867604675312588,0.2183394078542884,0.037524333922846376,0.06261543251304635,0.33148779535406847,0.3914905745910211,0.37237241407328114,0.48838666773016026,0.16902653702480808,0.802819388948921,0.8869642724178393,0.8400384028884138,0.2823912007634066,0.9475882900290207,0.6500370818238346,0.9359118369699624,0.9955760887504237,0.15392117606568956,0.22807314828159408,0.6416345894278714,0.5471335950699097,0.06696969369968153,0.9624438294038669,0.6135256567810163,0.7456887749063654,0.3551245668764871,0.3712031675198648,0.8107527906678544,0.3363006429596549,0.5507906545599699,0.8938954668230092,0.7087724054902653,0.499711311360141,0.5545129452557478,0.6247469529967036,0.9080915234566915,0.7638521510719594,0.4779200277827298,0.0178739932966705,0.3730644877243272,0.5899044857387834,0.5807688953633203,0.9466090868696384,0.9678396994385496,0.413662739677066,0.9317921360573989,0.9492937985641126,0.6681876507002971,0.6851462237115733,0.2539981428098099,0.9669777919014857,0.0026540991032013572,0.32348650140040625,0.11061996956388787,0.746517519656742,0.5548941793671567,0.8196637396180413,0.5605010606069036,0.8559254595372605,0.5500622955364822,0.0017333910412993259,0.14083839828458022,0.1049677787122496,0.6801446490660565,0.35687826456554106,0.09264218790712797,0.8959951854281081,0.5091825842878583,0.466428408828359,0.140297693406368,0.3319810240124281,0.5454397734926408,0.5473374017010835,0.9935183228583058,0.24580901427577895,0.189470052220152,0.6499618987476035,0.8861797482093439,0.7451260476430654,0.707225720671742,0.676215301338136,0.9111895207419431,0.5316015777477345,0.025336798897968693,0.037393488734675406,0.9689614314371513,0.5639628843296913,0.02987656322352228,0.09167331141662638,0.5889612856203221,0.958050288945079,0.5885270830035241,0.3462113762506338,0.2521381691897513,0.9438342664187247,0.7130671690750243,0.7859663817606481,0.7067638499691962,0.13872577810415332,0.35259051874981817,0.11849906463722482,0.47107688911238,0.9937178873352988,0.9212273770029389,0.16926882931810838,0.892493216049201,0.6113884422756974,0.40652938057718835,0.41158677562107604,0.4625090907237097,0.3380698379295035,0.26188571907625713,0.9704536712704603,0.14659268932941583,0.02207537506705526,0.9760934746225185,0.2948362366414803,0.0905950680979859,0.8665392279080986,0.4233018563040174,0.10385822342637585,0.2710270641580359,0.23977846351292165,0.13326178888017304,0.8180949606093875,0.005522344533724022,0.28097871948512787,0.3722989605035967,0.7471620200432858,0.3775687912406389,0.13612094084297244,0.6642910266332016,0.9835321604131917,0.02766517602162466,0.41592445810835366,0.5101021480875743,0.9722085618930518,0.917105496665183,0.24335785523399478,0.11521112708224668,0.18565134667914074,0.3838296483018706,0.8025716324616488,0.99554138483117,0.7607646544914055,0.9308836104692473,0.45338136269440366,0.573661191779814,0.27775658736165787,0.09167326444500379,0.15826870857833764,0.06426126893381712,0.8433570854984656,0.06366851479094371,0.03923688302366046,0.26937216939465447,0.13958246052962142,0.3573255434072822,0.8806287073591363,0.038138654818723694,0.3047657684717662,0.5985238900615324,0.7590755262553306,0.6344538636068904,0.7085559471746463,0.06276792697741396,0.3592816924410802,0.4214444275099771,0.4539139915107824,0.16289476281226878,0.6378314402411895,0.08223244393072826,0.2800861339301537,0.8504662816910951,0.3761428200111103,0.827169014683782,0.3019773442960232,0.6622660323025675,0.032080011707747325,0.07045350464709244,0.40018370259267155,0.050596938509790856,0.2545830582753683,0.9448074371878685,0.6114662347589943,0.15613862772943787,0.17056912676498537,0.648689634129662,0.41383577953950135,0.2050323790860895,0.3925879098731009,0.6017267707233209,0.7227529257055918,0.8778500903390227,0.2264840087448181,0.7926715324438012,0.9630098823147106,0.46841058940585656,0.8192127988970781,0.2970058919808434,0.1567294732501936,0.943132300669572,0.9010703385373198,0.809508157608058,0.9133549351318129,0.8778824144394015,0.6740698430771592,0.7056460156300712,0.6821446529790478,0.9908959338609227,0.768411760353781,0.3051158003395438,0.6443268427789868,0.4377662730002745,0.06707982278802538,0.6717637250703128,0.3636458161880842,0.8674080892277765,0.010982097044712757,0.021701204211351355,0.26208141629920334,0.627368261929524,0.22185259971311933,0.9978290026342376,0.8828875811242196,0.24647570617889847,0.857032574637631,0.7762250590686774,0.12326524898391855,0.2976860248232227,0.1484112013664829,0.2986554129351384,0.8829445423676479,0.2887416797877287,0.9772010440621213,0.5192172328552023,0.501680276531733,0.08236150417781674,0.028754312452389685,0.5837890219821538,0.7721036154523429,0.9700114279683771,0.14249698754054885,0.9837557811733386,0.21712432136654725,0.2530014454661116,0.5774625266079039,0.45173731329177036,0.2744835532898058,0.4207626265182145,0.6673438605793294,0.23121071968763962,0.8652688393124819,0.5323237704229935,0.3068603345348462,0.028107666740625037,0.722742945979646,0.27834968296537466,0.08271145119789236,0.02036010921532494,0.3242369570353567,0.979084730155179,0.45012124157786193,0.5680502364002793,0.6717914455112965,0.6972609135257226,0.565832721827402,0.8640624616864847,0.9372646278992094,0.6842954349725543,0.2642565420212477,0.646701235403573,0.795815128193994,0.32535396592006305,0.621867284614066,0.39710095231993936,0.27911785969905867,0.5857047141114433,0.6494200184855803,0.845460559200645,0.8178982745964647,0.7545487791246279,0.036292715295289435,0.9738857761632087,0.9655927356893408,0.7172691249983332,0.4051543937685571,0.02647816291849381,0.8660376804129299,0.41454766440930446,0.38828529348316465,0.1134507434724985,0.5867409473331884,0.3774243585157533,0.5751719427709803,0.5477234856050657,0.232391870361347,0.8118402514066745,0.9739641556199863,0.3700937681199614,0.6096612264156467,0.6443723222532636,0.05656516783327459,0.2713798610117628,0.9738004439734158,0.4453763631043335,0.5542793165917779,0.4054130585752056,0.9721971910888787,0.2391443211121469,0.5128328699299056,0.8456756209592933,0.9191362146115662,0.9643100771995066,0.0752110165490758,0.7647501246526629,0.6313501483659241,0.7522462939197005,0.22493453533961505,0.5348404579206727,0.30592063287336346,0.4107566669395446,0.5140597906810602,0.7474963791112341,0.5387752890434487,0.8919084516037012,0.5413439266823297,0.03733365352226059,0.16594527608878096,0.059776588919608686,0.5302256813179471,0.5118901276780765,0.9827482189282359,0.7422997061551149,0.15016062511518036,0.6159932602369251,0.2382210684615782,0.7267390802799041,0.3715633892181307,0.9867390681160946,0.4816290624774271,0.5652572951087083,0.6323093919493303,0.8452941404265204,0.27212346557639977,0.8585810252180486,0.2176561653429845,0.6858632613215498,0.5117133064687507,0.9183517958525278,0.620174121281365,0.4312510703484598,0.7141264978802631,0.7131204482301896,0.9954149614658103,0.9759487244555249,0.20239029995130164,0.26380446029266946,0.20146018084171935,0.2704573834231636,0.7564622937891445,0.8498669951862339,0.41294379171931483,0.16408365336991282,0.8964320989701167,0.3961487879210357,0.08360685138577861,0.622029393100713,0.8975958573309888,0.1828918312179415,0.8486765350717524,0.17696125486800574,0.5559130507526391,0.6354536650151923,0.5288928142080147,0.0596690807266953,0.6805851835433216,0.644678804506553,0.3986744243096403,0.13893205193791247,0.9296195917617704,0.4031735887629042,0.8715352212367833,0.5738269825758167,0.47889636923102774,0.9755361371594569,0.503837894934579,0.9022812651475338,0.6069056120007259,0.44109097730671776,0.07104282732490685,0.304575042892163,0.4762977766043188,0.7451830401338089,0.8399027794231995,0.5411086494814334,0.4269066906714254,0.2745069840371417,0.22065951291110997,0.10739449260767175,0.6449967112553125,0.9818752759960809,0.7232380578716355,0.41523675705712115,0.20923014107044824,0.955890086667958,0.6279905084516313,0.437797447269354,0.012013877993973798,0.9685279043678969,0.514092521659155,0.6703545609750159,0.21916747656430458,0.127763928678005,0.8493007637490171,0.2516281455167082,0.2829600489127575,0.3584696081666179,0.3285024580250582,0.7288348773382325,0.05208321415117734,0.6379008188653426,0.3359216126854583,0.6965295820223698,0.39561011330675955,0.8726559860889869,0.05839903510938971,0.21745213626813875,0.9592669544811725,0.09125950311734177,0.39280392376273543,0.7725271186325477,0.18494703251854183,0.847708297169407,0.14827282472728998,0.6466462105036375,0.778613967917533,0.9767595972351459,0.027262649920566373,0.7766052127425362,0.7356916107562188,0.3799441292979735,0.3142936192956236,0.6976760527388766,0.6049543673278281,0.3767187166405668,0.8690490297658844,0.5780634264289255,0.8969201540137643,0.31702184762729924,0.9101458845466563,0.16341418807270292,0.8677509496514124,0.8909185585361468,0.7664004613051836,0.37129773382953535,0.38063033152749326,0.17088587476631178,0.3329937402416785,0.6073763224661055,0.04726274215058979,0.2597160889605592,0.16500633817613175,0.2959367885259552,0.21150182158594277,0.7376271717696183,0.3684590331866664,0.1928467323547296,0.9609164039711755,0.7898401937054471,0.649839692143539,0.648386504554775,0.33860820533107905,0.3546829917953609,0.6530282692963632,0.7137640563622709,0.6682714263096232,0.4134171239067679,0.7865620274352982,0.030222508420042704,0.6668081787558582,0.9676698837303617,0.33942762768785073,0.6151158673156081,0.5333228076347527,0.9368546402768863,0.5002193206322061,0.7803730155597035,0.4625562810635935,0.2674781117618088,0.0610113775986052,0.4990099522500897,0.5169204278662698,0.32176558445019277,0.47432725834911826,0.22610249241290692,0.2223734183126589,0.4656232665248814,0.7315108982401335,0.6275752757626407,0.049520357994692565,0.3631499344356086,0.5445480751156997,0.30950809128126533,0.6392836436315297,0.49722151331740116,0.1947825087320345,0.5747746446013837,0.06570796217078212,0.1981931505293444,0.5976412431453422]}

},{}],142:[function(require,module,exports){
module.exports={"expected":[10.969475682709668,2.3189498506378663,24.92740978224834,13.54110619483962,17.843994511122286,16.766233621727174,7.608049090743918,23.209323013170206,21.62066269480589,8.774757790870968,15.775819934739259,16.50833877570583,23.347086915311458,23.824949344244548,9.38651313802173,17.412331723297996,1.3782744956853512,21.062485371937857,23.32898048675551,11.84605012647586,7.381513983091337,15.155117079870648,23.523650950925724,13.650403836564294,21.83608010336817,8.227969289490435,22.039006399057207,13.45369874009075,20.034474451701776,2.3950142502591314,11.317505762227057,6.184082149082196,17.73112788373384,8.832113214479081,22.33514079393025,30.67180571565016,10.684894940685897,24.73818906809948,4.258557936581918,16.95710440073393,22.868167663147002,21.418824399278762,14.014658445560027,19.8004380873531,24.54429021795744,31.487869618208958,21.772769984896605,9.178609042730216,1.8324076643897333,10.701102461100525,17.35218111409674,0.4302562172364813,20.466919399137396,14.268714595108861,26.177451341961454,12.587998645825794,13.573377531895071,9.53072526245766,26.0670351552731,16.48004854651964,5.337123001920068,4.065882595153135,4.5081994794145634,15.538224249836915,12.701428236024597,2.517409132821898,15.020949671792241,18.312428381656243,9.276707592876619,5.6120294643181055,14.437570468306117,5.310837294812923,12.935219247879381,15.923905189397296,9.735967211547145,22.118997412131286,19.17905321825379,6.912393348488489,13.372979074673541,11.266570372781679,14.805331558479708,28.09554660976267,9.687638854095859,7.023828990861579,14.142270646794406,27.088787989203862,27.15091099769194,23.01418530132703,28.19661825353765,10.848400697719745,14.508193589428538,14.741607180340482,25.830746394824686,19.5337135784396,18.71988736727609,16.163674023369868,15.4937547386623,22.613721440267035,18.10831444474304,21.034176881581054,17.944614329506535,19.82286285032552,10.912227807298269,12.109401614941282,13.100054064914215,24.831878026803714,19.677740832792203,18.293908924518973,7.565811813622024,11.1277921692602,16.657708080364763,16.32219281351154,8.991843077784626,24.364607472621557,28.458998980821832,12.650844935883168,18.36701600635124,32.54922211508529,15.040699956434334,11.260844363996046,10.324536543306522,13.60016181119129,6.9858537069260676,15.28617734026105,17.137625402362488,9.942059717246346,5.720600229365857,24.550052966829192,10.97319207152797,14.277244382150911,15.0086427824686,2.018209354729441,17.280445732726296,17.65258039456146,0.7078584337717863,28.392593626187782,2.9715013247138455,6.586447827770607,7.988329448256172,17.889334435362027,27.936973053364135,6.02120604096082,20.300948074104685,15.250282222644419,21.504229645705216,23.448459188787552,0.8830124334294926,1.5232568306079077,10.391987325518164,8.12714437378813,2.685874861037479,4.816801570477037,26.612514818469677,6.442841328758974,15.819862806749152,22.009954655197056,11.842410827832508,8.742631181656561,10.2161389770082,19.47311930547023,25.64201391686121,16.777595040395678,9.908553358217599,21.6779922828484,20.372927084142077,15.888879507640858,14.327619365210783,12.183862856905481,11.98136184955503,9.680934539663834,11.163738358051404,26.36215942816618,25.3988163633781,16.50659742115616,7.571803683099429,9.49512079852122,10.683773645985228,6.289055769984793,16.9853538638736,1.8841333399427462,5.884466666767159,14.238296274900385,25.671762556659658,4.956584423892776,4.841878534498126,18.132974347204854,18.517650469940467,20.44917166896695,31.069687039186,15.086361168667665,22.764106415320366,6.13844847269517,11.372504238641334,2.935450970781886,21.46518263878045,15.051283816417657,3.470342947459784,24.419249308147542,19.327190389272594,6.876383509554406,9.395700567427834,20.945728065543776,4.411741470898399,3.7124896014065367,2.6600196068060455,16.964857967909197,12.302478675544473,15.208518669555275,14.521207438780184,17.63962279078741,18.345422162285796,25.557149211686095,19.286426523900488,14.754772467632781,14.317893906715598,29.494446670378025,37.16703046962293,22.412863554910057,14.095170253200003,12.51305897140955,32.970852215353965,20.136774059092758,22.068565074531133,24.59475670361458,6.211982635238771,8.593895403687291,6.486581796374343,13.558962844131042,13.24802802952656,16.60863251218769,1.8033359321592592,18.41479615429221,14.281801920886815,27.853421714429253,15.671228585236312,18.785939883560484,22.528958949678987,6.819764106594459,18.97045214686725,11.129242979631986,10.061708063147364,17.679721576628193,16.771034470711662,10.525113058582546,19.77685103137211,7.567846226555749,10.627206964349845,13.939063548095419,12.46338356659415,16.94449650490097,2.0396707661307407,16.521925980430307,14.947604986718698,29.273518146309947,8.073644743271778,12.052223873127101,15.798147716617795,13.32450046160397,15.6998352947017,5.555314013654343,20.17719072572245,12.903665909687177,31.03380049980545,8.418572977792053,7.119208784778356,21.15471850533196,13.765753679114363,13.792003524504151,25.084456877565586,13.59457596089129,19.992677697164847,20.022168111774363,14.136519746031034,18.19873032845321,11.69208422527931,8.999502963257097,15.481049978362869,13.434736180860938,19.78759525781638,22.152330828861057,15.571123256248516,2.8962160043508414,5.287402140619994,24.40005881456973,8.705818142425853,17.084427642005817,3.5427074793361073,17.946858999286558,14.782052382781677,19.21302855675482,23.397267155029702,9.147566625748787,11.006165614976585,14.53908478380498,25.193230580709304,23.236623288054822,22.42204525997109,11.883305411607843,22.136165989932515,4.712836043146863,15.865977452720816,6.579316811231501,14.149269978399683,23.80469978447087,4.956064795571833,12.25221437871224,13.798054284772101,15.12441064761105,9.960435551507585,12.180631953234549,2.5027131885906324,9.278346891437044,15.7854007728217,6.161466754360253,21.60264309514074,18.249732960881985,1.0179067721383173,6.829221566797008,17.450339366018554,3.504299915591889,17.974892612551816,21.533440718131914,18.141641746625744,6.300795836257378,21.002316234143358,17.998082655484538,20.0548596225813,18.380223193792645,16.99529115938672,5.36178330177234,13.074541889423172,9.692148114014175,17.641863174371206,18.10647488122841,12.076310627550084,26.465474497305802,7.104678312671919,5.5059882889236915,10.360881682359409,7.735621126028934,4.346651923995996,18.687004978725085,32.67918513821315,24.102397998739235,20.011112035027516,8.81269201073272,15.984590777806218,11.163005689522988,27.079806913281605,22.68603131644071,27.806491144251574,13.911525518519475,12.202048541878463,11.396846556555412,0.8737090374761618,32.02211837422557,9.142265911636171,6.462371198824536,9.482821785388762,5.118722179368157,12.535279486268983,9.85600904021663,3.3705405727099964,23.220387931781076,16.166548801161195,10.422955335618632,18.085863540005434,24.31429245674523,14.831380301502808,29.700509276743787,26.608772251004773,21.410387500934085,14.715562254052186,10.947308061525872,28.50517008729144,14.019074254492391,18.423794406211336,20.895394727365577,0.4127437423780576,27.419758741400717,26.172750572145496,11.858882257996092,3.9817492358416526,3.4771730709094193,14.578698400227648,19.233823499458953,8.071651773068792,16.26474579024496,25.177996774527692,11.280477016449169,15.447665312151189,6.590474793190205,3.8391486986829473,17.345044354880095,20.176594507295842,11.439978540599487,11.659162440647126,8.89521503826989,9.493205928835387,4.045006765176779,20.391917127429643,0.516995840725616,4.4823672065985924,32.3628302132969,0.7392114185903313,1.6749926923110723,6.17293371541355,22.92519243010303,15.997638503744163,20.85559279768917,20.23491047662837,16.649526601578675,13.622106326528938,3.8697304936976753,28.054551365607065,28.60700004441216,19.27160865072799,5.777718579733267,12.168826492964305,16.62430332107012,16.053788535645207,15.908309296062784,6.632016121088503,21.418391197641956,6.9932829492966455,3.2843675325910944,20.688698074905254,18.380078765794078,25.035250929541988,28.980442779627147,5.121882942914139,22.64784043858012,16.008180105511826,22.65325700582402,9.865430197291102,30.11174399959173,7.2971673652517515,15.13357419751036,19.701848353712865,3.012449156665457,17.729354252416325,8.376714949616103,17.715879938195297,8.62706856361851,17.71128236059274,4.4568586713860965,11.29538749972992,7.732126194924897,14.961376837964085,16.222653935013266,22.14648705285649,23.326899408802056,10.653567276350932,15.533454026175667,19.68484563730218,12.726951290619214,12.902896552567654,13.327217809478075,7.077534794822241,4.710772330965425,6.988853497807867,6.240175697607265,15.329610911698145,2.870124517132352,3.046561999751822,12.224670660119635,18.70616684570343,15.764215351230416,13.082601859161176,10.38046687333356,18.27830567717461,21.880948383223497,9.542969010110628,23.58713371954205,14.58529038415072,12.899421827069062,15.227277773403657,28.058692233708996,14.38479611295127,10.89801975903386,26.603168581231344,27.95371728898983,3.8222303459343916,13.631408906118974,17.769965657823803,37.85273269484591,8.621563163264703,1.206913410792915,33.46191445908492,10.344632425992401,13.041871857889486,18.608385304157487,8.569811195250509,9.693597155629995,23.54722510746049,17.133049658043713,4.09073969793757,26.59785291559252,2.991768062367989,18.20421685076181,19.515787774188496,28.644150941677722,24.38532377625877,19.194860113171146,13.114700497498209,7.190941460341757,4.092105554867753,6.095440175302162,20.843031356214684,9.259943694479027,19.073849077786573,19.160702292798902,16.178529162519595,22.916506926516934,20.08428902737438,6.175190324420207,6.3624618651542635,4.57115594082139,16.64075519937704,18.586841771303423,18.37256340104165,13.282867954973234,26.629191739195644,15.95408247823207,14.183429134087604,13.551473681972944,10.811418300848148,6.567160986368681,10.365070248477554,17.63047170421979,11.678993278561663,15.284522022642186,20.92176993831795,28.47957906760052,16.824954708317136,16.19854367841542,3.912799468773189,3.213522158209609,28.319154137462725,22.315861226389238,5.113798144354764,16.240562667498207,16.95748376369975,10.677225062243185,10.950612538922563,23.230901417057783,16.783263214597763,21.726434163191684,1.8549995740454408,1.0422198473921624,19.726887269236332,0.3662303275600433,25.72325254291016,18.83107720565768,8.751958570260546,9.855398807576,16.087485464221874,18.00516210814529,19.12137577096866,22.077238064907817,22.07303067143617,4.152348359774662,12.356702229327038,13.604925139513632,9.078790719088309,19.955010238904617,12.178261897906165,1.8356314026346596,10.529461215489125,2.766356824736039,2.3112618287146143,12.090583062155826,21.398688713909817,28.437466816816737,11.760546606283055,12.211722380871368,16.73472874049831,13.186692870004928,25.816921368848526,4.3716104126414,10.776937427226784,14.454949568759604,11.833995762948529,14.02508113237469,12.317813025132423,25.429812951997587,20.73175587669181,21.605138418388965,24.377390293292034,11.10981417000705,19.485585566392388,23.504550972115744,9.805974152387487,15.60757467722524,15.64837169826098,16.440131457270475,9.087209412306699,17.125187518466863,28.613865293904965,16.034321130449715,24.128653549337077,15.742908201818398,10.389128163780406,12.327190190796003,3.855215227727424,16.11523296881838,22.339125248451815,8.558984527476408,18.751040455763725,5.24735698872391,12.544342868866522,20.926405772787124,12.300337381020716,2.10589729913367,24.181674143813183,17.06402005605404,29.668176488436494,16.992425329374196,6.126051881645903,16.40991116529598,14.322838652653033,13.737782336695961,16.635224164360448,22.102997896712193,26.977250324271054,20.807267073006308,25.599905149929675,20.449865527901096,3.6309107697006526,26.427609139977296,9.042930038145972,14.211659866657026,6.677492171807927,9.892116126871516,18.562222451964814,7.86565535980246,7.1062611553610315,11.525474556776809,10.227346286930347,13.403709676091793,14.105181741729979,1.6488463814741607,5.673235252832919,14.725254693320618,29.2541206280764,1.9439069177516433,6.2362025801643,12.203573916922874,3.9255817548411502,19.494770839790483,20.05997476216938,18.6864685989901,12.557711979759937,23.106995329861483,3.0767337387728713,10.856715738567356,20.681765459145456,16.26883183851592,13.68983002779553,5.3969242065190715,9.974189910275753,16.560296732308267,26.497961911865154,10.801957616558537,15.450565639980347,21.745325148549977,20.125970056045226,2.5422975381424253,0.9241740380378601,20.761498806959203,13.665016244020995,22.187462024276677,22.44832160664144,21.893518635588364,3.2463523701439585,18.598097210501344,18.99010063161446,16.763997398831986,32.21560116723105,20.35362404673637,8.19528863602457,8.470152050484455,2.867722926969749,18.749768874803046,20.059655532972997,10.04708385213482,7.713040472715493,5.8121562833436045,22.13130487398117,13.280158318670338,3.7091192417753964,15.024659202966872,10.645738920256033,18.727574037882107,19.132392619155418,10.520883724888064,27.705055781645306,15.21803153271892,23.27506313082909,14.923660239338059,24.02313896435023,12.389940933540528,8.370096992680441,15.087369298459283,7.770055886519092,8.633006482558228,15.55467826436211,14.599559471010785,14.156173530197984,11.42083353052821,34.99273854768427,20.87410075887101,22.63269023048698,14.987131106544375,6.316270875848295,0.8237846168006699,1.6294764922898504,30.377399480735164,15.942424351381291,10.664001178544348,8.46784713037625,20.957291976115833,13.90570920790315,16.84177295959822,10.069771383471434,10.470525281330339,24.091288671437443,15.108403993015303,7.704962032254629,18.598181684917325,6.844363075646159,15.504927416315658,9.48390716262646,19.91853443042985,21.259638676910196,1.983306062126289,16.56214792240179,9.894139341629673,8.79820950532291,23.748821052348088,27.779890945360535,17.781816063425296,4.448657014978864,19.99313399056748,12.891633257398647,25.590006114043398,32.877878991487876,16.498237391001428,19.15181089099845,10.421773511523073,16.16612501668388,13.489547161686037,8.828519618595514,12.824594257526195,18.36916413134891,19.260104330704674,22.358476763465674,25.780326124850795,15.805971529469145,7.491255233474378,17.929322493593126,17.04181549541672,4.091536535379994,12.266818649407043,2.272501154425109,14.302655410020384,25.782952012180303,13.739133113516916,23.753691665358655,1.3998131281008073,17.391487661230997,13.559585369495892,17.935505907775944,13.822625123052495,5.921384943159308,14.904580864644517,21.946633339191663,5.2167649244915415,17.457002585623677,29.071899191395865,25.77730554435942,6.433919149011455,32.490666414386126,28.75911130192833,10.469768622313929,10.985788429588466,8.077428571399048,15.26077140909182,10.9706369761017,15.39969285695766,19.434374261988776,12.954488067643744,5.917587882696132,7.264112545458521,34.69374431837162,0.7395416152178408,8.247268777311573,18.74141146968112,27.419138516916206,5.4769651276395255,15.979345653807876,11.819295629848346,11.602927836319353,11.727554731124064,7.876796557645105,23.36743621620719,6.1264895775851755,20.631333448889624,21.846109754355673,6.620183029788102,7.462750476374609,21.25516806687902,6.018541201524115,15.919361525874322,10.109991505477005,26.640155623517273,22.417251478762573,10.425719005042422,3.5109442791898147,5.0144906814038075,8.13894878981041,21.619903872703922,17.554291998921155,18.399636650250766,14.139967994862412,16.46556675478739,3.2332384984784706,25.516381682560507,13.347769761407429,24.650747699614726,9.289721141130387,5.238629255662003,9.042928733307768,7.848045536999511,7.917023110183623,19.313938614887608,17.71497826833985,8.43588051605674,27.564647377234728,1.5050865307652992,15.874431777620726,19.404233869979045,9.596058029955135,16.069908158014197,29.275584003807065,18.63274862120317,31.596617186627043,20.209037345987905,12.539547445480803,13.08428122731132,25.175505057684923,13.13401819404233,10.521086541281008,4.610171455077619,11.345897179355992,9.48371691694587,19.587109558821275,6.962326588647659,8.662475892756966,8.292167233189462,19.2922607972202,19.984817543090717,14.804373905929602,8.120554124598677,2.146718216607814,24.14635970782185,19.95390447066232,24.223671320425137,18.594123509224943,25.515324980175222,22.524707908920583,25.030147079502335,20.16448342429886,16.21344600384523,3.2234927401818565,15.3846877119767,26.63762846296374,8.662652838319351,14.596167503786955,21.249703957650766,13.028499647556353,32.380635610786804,24.331019615313412,3.3549333493384226,2.951155676676447,21.791188223132416,30.2071955944666,5.444261208442788,7.65511367775377,19.676153896382377,14.834644982023862,3.005032202273017,13.026070197623497,6.629501965804785,19.386584139185032,12.801570736567125,11.3232573027179,9.126438443286471,16.194643834641624,3.8694626925716427,10.22368584187203,17.893891365043,4.568016405875946,17.67500084534149,11.443173556931892,20.807810441256002,19.318432707502467,20.047538247389046,17.893091542902997,8.020959767585481,14.859915027833335,9.694581809920216,16.68427724606738,30.954729601269975,1.905685728848078,19.72219787995055,12.30692818702948,32.68349572831747,13.503503026917695,12.999181717476793,9.584055532729694,14.904188170004641,4.712503882569897,11.75978214969412,8.479923993911216,8.202115200917905,19.7831637973787,29.397717616123145,14.73026004358158,0.41111970462799385,18.580025987926263,12.925689996767524,4.179281510060575,18.88444062718193,20.12525492886369,18.127915112907985,5.214475564760814,22.243597842918334,22.005335198428874,27.965168733529694,15.489008060067215,15.255683752885304,22.37593754380427,17.564272852799796,0.2603002722285074,8.632394307434954,9.595487084615979,10.031999581661942,7.541804213205404,12.972395582489296,15.512612706118365,10.167248987395743,20.0831371602939,8.041649790888826,8.574147296027792,24.11241556754095,22.076948426697772,16.399216288670083,21.970966543617262,29.185956618991334,19.566863262029315,6.358205550207538,18.051524608121145,6.972249569907049,11.314357778433173,15.187508128936145,1.9139747869468497,10.836303885750555,21.99978934483197,27.06241885628348,1.3572517041770833,29.880184658741094,26.226386564914712,23.13592742594801,20.024673153935122,35.495525929175045,12.949709001512385,18.991824333456368,7.258773573518325,17.15696148934425,19.21030365539642,30.8189006520744,29.385854388238585,5.685802606150652,9.54712173718368,17.585902075982798,13.117467742170248,4.661652942345803,19.312634146681955,15.187359961453282,25.009626713398934,14.187326204196001,29.763713229329987,8.351902203971452,31.340329419105124,13.54033839249307,10.36472783028286,6.303563215894695,19.903500088340714,9.606579120196075],"b":[24.586183013502275,4.008832953888102,29.15936151206294,16.919508621630534,27.38264224626574,20.36143243103025,8.389505251053588,34.586797448133645,34.277019888245114,11.332301989063701,20.258657197486635,25.979103229633086,29.335668237236227,31.884031266624817,16.328530177698823,17.430098178816635,6.044105975609684,21.207868598569277,23.645121755444443,22.62268660055539,9.227550696437575,17.945987693290927,23.931739812105178,22.110393566994237,23.063456037884716,9.256739957205603,24.321981085133572,20.07456540796667,26.261450843308154,4.65146986699605,17.513357880811327,20.123971229457265,17.757530023594626,9.551008695306491,23.172928604933407,30.69700914916909,17.636998287057814,27.285817850282616,4.368393166767146,24.8380897708122,22.883185619823628,25.935626587191926,14.01569000934018,21.821489219452513,24.697094233271972,34.268151724160845,35.76703282887267,23.74269315890914,3.872884421362124,20.450307525045396,19.34779613955564,15.883511279319071,26.40904849099982,22.382007750030695,33.00997996894672,28.902801335003932,19.371814940015373,17.416251055757478,28.246048889707517,22.278613750422974,7.886957814347304,20.399838621580365,7.901009071728429,20.739844033329128,30.822188722522384,17.171601947872265,19.538611207361782,19.57451523426681,9.291683138139192,14.806346766047293,19.12873078490614,12.987694257614478,13.823977658611831,20.01620018411191,13.747071246641994,24.767525723787735,23.28652270541946,12.511678471802185,17.061553542190428,19.11090422254552,15.86310849917468,28.175330178367442,23.493673346301726,7.116826535334053,17.517834554317876,29.915464334906314,27.164829577684554,36.55392719692304,28.689028451604354,13.6037491773173,21.427856649759338,15.531758653512206,26.37251883692675,30.5845256002057,24.600926303767697,17.067244217854885,20.616360945216243,24.429500874557853,22.73309426851177,21.234492951689305,23.293780642177158,21.119054055266098,11.958626681072987,26.387582505623637,13.446609423265073,29.65562764896248,22.604161982715063,25.689885760782524,22.595503273409264,14.462762508522765,18.29498909295516,18.18407251819533,14.481323370304029,29.51441298831297,28.63711490577729,26.08887795318188,18.62276758728245,32.660680420726734,15.119232639560103,12.172394929697482,13.003766039796382,21.884581543796315,7.414123438823643,15.900332460770965,21.399200954827748,19.404412545447613,21.504962600294,24.706143816586113,22.119703405135517,21.83926893561441,29.270189038550466,2.1160799372198724,18.03336452280878,26.23271031989827,2.53812712183469,28.46373109768715,3.4670090748718208,10.517425421869696,8.165192035524772,26.261878413700774,29.270590626889728,15.914094239528403,20.316620853982275,16.304640997770864,29.12318170720512,34.27459090433608,1.3815271937394025,20.011972343786976,13.193611284369474,16.568340871208854,4.519928777638089,4.962791887598117,30.4936984385471,7.524460900919276,16.59344548870523,32.395413398826776,13.103322286262514,12.011331437912665,10.267714995339109,21.812202980120027,28.55581461972109,19.26475891054026,19.455167419377737,23.153361661619698,29.663527751650424,17.567617776071117,22.053749229751922,26.066582646451376,14.918965707701268,11.593339963100998,15.317685614698165,27.376353721156562,26.330601140862044,32.25938227682158,15.44312427451747,11.537011764875459,11.196780451094837,15.341884569828675,18.308693363153946,11.059633428809036,7.436631881148998,23.82177922017383,26.562838972169192,8.782609666258008,18.495323169547255,30.83562756702651,23.388195445395517,24.7257359881161,32.35400464023698,15.325547274149105,32.72725602680623,19.12730249865224,21.326476629859926,13.246776900366589,22.15995377087484,26.970949064313142,5.610882304434872,32.534335988284,20.719210178182184,15.657739425396002,18.827582006751804,27.257337563126313,4.417783617950066,15.830338231357604,4.916518367965468,21.333015236975115,13.551448824228451,15.81684431496425,30.94124059441955,21.68186587208975,19.009520233568036,33.7048264056167,19.28667973543156,19.593754296541587,20.578694971256684,31.32304789667242,37.27299842347111,22.491743884238222,17.470961969466753,12.630988732578288,34.00407651952347,23.63177481313653,22.59413340251629,28.63276304401638,15.126621731671612,16.2048174342672,7.274395067430737,21.304848319925817,28.583020838734907,28.736251371458614,6.631149807654495,19.249155450465206,14.310818368920447,28.520767755327533,22.620224903459885,22.614073058097173,35.369170840756965,12.281986057406584,36.46549538856364,11.353748149061685,10.70436194248158,17.74915005345198,17.51915029278727,10.550201818939522,24.557723953987797,13.994647175646397,11.947231265031233,14.067616835034702,23.978090929207617,19.01854534016518,12.831828542961592,28.549698459358144,16.803724891052617,34.80078646817999,18.991466011428937,14.05701603933411,16.24833858024087,15.758894326836927,19.318792274499827,7.78012800727657,34.84008438659042,14.177571827229944,33.77707239829137,9.70032549567399,17.018614895028783,29.073807312922867,24.09658761184929,33.2805859352584,26.507043642451094,17.702624668521572,38.496629701364014,26.71794704081165,16.789358640877815,18.257210086710593,11.709057881449816,10.021803135768842,15.486733860630308,16.566107030429915,27.606866859660833,24.94921485024873,22.45638939455735,5.045295441092099,21.39959761571535,24.457642158991053,10.065830846209503,21.049553021492798,18.060769144349504,23.06576981675448,14.93964797675702,27.995498931030983,25.492860814362622,15.409383338084751,24.65874777545462,15.855896378950622,25.33259608006535,24.24321507222231,25.89674232226227,22.550354975298106,29.68653560895939,19.470694061565155,15.9473095737864,18.39626710885152,17.6157603486366,24.385237174066443,13.08211599975126,12.284116063368703,14.337924816032771,15.148751172667936,25.1784177104826,12.185357036660012,13.202258562992387,21.127457522814733,23.892244271627565,10.949837565327565,24.967805151775664,22.93529078466213,10.02304743871245,12.817927950756353,18.56807234086162,5.549615595385995,21.589754770764586,21.541771596171966,18.66983647923851,12.886606242929085,21.004987862097234,19.89002481857858,37.63119298653911,19.062053910654324,17.077766999416948,5.409322397133942,18.45928279930461,9.717474476265506,31.62682584374242,33.671848269403185,20.23816710551194,30.63172480244696,12.833293948181845,11.124286679453547,10.500072612294176,19.282879887291777,4.440126437880041,36.59638491566456,32.80685257283453,30.068688675405312,22.27890789522926,17.539622281053013,16.414424584012423,14.462023392849854,28.310311804531832,33.3360946557646,27.901057750068574,14.125470089938345,17.03585910826177,15.420706368905606,2.529518357056615,32.17508231294456,15.534177133862421,14.587179968039369,14.468683910732327,9.28105700703445,13.776094352281977,10.033549401656558,8.953822505324043,23.304989342753693,16.8582761495835,13.664408142447972,19.905954353101777,26.659528238022045,27.507761141588354,39.17453360264804,28.790205892472365,25.386726520980567,15.376150739605144,18.955570168935996,30.27174903452604,27.225399390985796,28.701166149816785,22.062237891888046,18.988962978778275,31.74493500134212,34.90268837022227,12.152641446329083,4.483364414071409,15.26559434270748,19.480263165694932,19.29762762091555,13.577209022551454,16.566490023548422,29.82375107686028,11.754006185149741,26.19793508466741,14.129372568655407,11.301695266842673,23.267899776704823,21.54530400255632,21.314300081791536,12.454752774467517,9.27583470349652,9.517593506660617,13.121754680630886,20.525618478832914,14.888034371332623,6.992986581568821,32.52724003869976,0.7729349642589334,9.9674399547985,6.229255131728908,24.227168612469022,16.969456106690846,23.56331815432612,23.52782137650159,20.161925780154423,14.73345169625727,18.471576545697015,28.335801359444083,29.793446840294063,34.11181237522183,6.691437497765977,26.241017884085814,18.288208445869092,23.974599311909845,17.414352731366183,6.639023301076681,31.767452501897186,23.673944616050196,13.677218652089778,35.5260559019042,25.933297511094317,25.532536004134805,28.994937229244368,23.72297108614651,28.84736569094497,24.74553801776695,22.785696071025665,17.08177529364018,30.128617209502785,17.480776554182178,17.646560834212615,20.761772122879457,12.665096704700186,27.486909036449674,18.328719473663753,23.995011759714224,18.132253775725324,21.379570626770334,6.991075874517962,11.296235733069867,23.180346238690284,14.961440363215157,18.651832841354373,22.19069382768407,34.29372779007882,19.483857531247622,24.245897078165363,20.798620387309903,12.727247104928114,12.907011930433127,20.184587340140965,21.511938631187146,9.804396442019447,12.785060123107016,8.371757927125284,15.437948464093946,2.894320387687559,3.563307643965512,19.762414370617474,23.581630534920002,31.255817299193556,24.979708870301113,16.39226322249555,19.27923323798827,21.957417590742722,12.322916364368508,27.71433262761637,18.238338492892257,13.958483119512213,27.01397052911582,38.381485395102914,30.95425390863159,19.533540830599943,27.873310524327117,28.02917500481593,16.95689361444748,24.10185872808506,20.62608783412728,38.03359760685379,10.60804078842851,19.43486830615683,35.15860268072822,19.98837053469336,13.666817621074605,24.900265519208006,10.939906734734045,15.222048255853684,24.400871958533518,17.15083474653881,12.897538729296919,28.480063709554862,3.05775678592493,18.83037033237239,24.055740388693764,29.28892916330517,27.79321684759032,19.306870032190204,20.459141996357168,12.192489269298902,4.100916973420263,13.92753979837871,21.05957690072115,15.643855512584603,19.079122405340314,19.35975433637826,24.638149351835004,26.13701423938695,26.770035448233454,12.169797847758788,19.075646310728708,7.1486203569163065,16.946327816001094,22.22858691826835,20.288760384785984,17.72636618883236,26.820707871815006,17.258842443718102,19.45107904934856,21.352574550155126,17.864207726209116,21.620607280284148,10.447848733290321,18.200314986767278,14.973027606566113,31.266470893561333,22.483160495347175,32.02044684166655,18.138578587300486,19.465126763026422,4.108764236622724,4.661960786969757,30.306637287456347,25.181302010847002,19.1878861851711,18.922091553254134,17.304290730096863,11.334317401571372,11.407937921267497,24.316810236234225,18.400941935868843,22.409487990778537,4.772413042078996,6.916374464435173,26.09559500470219,1.9331864252955144,32.510143000286035,18.842118072374987,20.956090492082645,9.859813204992628,21.6932395170211,33.423078233064416,26.064435285153994,24.44884501431965,22.934852897771872,4.664593512362507,14.363004803671586,15.292847983446217,9.10165823089644,26.09035806745099,16.307051776035546,6.200121597260444,21.456996793124386,2.9129430543909374,2.402525271445719,12.49812720471109,28.139133855684587,33.319504388446745,11.978287997239484,12.890704157857206,22.777159972977714,15.3483708875756,31.775268484978813,10.915124701809997,13.097872525916404,15.00350265996305,17.220524511029343,14.106464938472572,21.252798165178255,27.092200232879094,37.30881513763175,36.909041060032465,26.470630412422537,13.13169385414266,24.400797970214676,23.50851312805867,13.935365585619905,16.444445439282532,27.17730417288277,19.5163402320862,18.30996505275167,29.058632759914733,32.32709628917965,16.066894510784802,29.937949349243116,17.62389339367991,12.483165098936954,19.349954027949455,8.053153804339818,22.451222161962548,35.18501323922345,22.535556696998032,28.96326412256458,5.253458850415984,24.811109528861756,21.085900913098442,20.186144859159473,3.794854479805312,25.80320900525004,18.338422124813093,32.64787981777124,17.108038260417864,7.4487263398128745,19.08191509178459,19.422679833780208,16.63126216299377,16.924537380392874,23.492945817048785,32.378864286476926,33.33584776599986,33.51208376009084,22.148368750427395,16.20789386447133,26.953268722859352,9.109197196605813,16.505356575820134,6.906192853703508,22.212853349739337,19.08621251687417,12.017809378776807,11.281919026157103,24.937218982046215,18.88081883225859,24.115788394856466,32.871376248795194,2.388930474436819,6.534819114220518,15.494749605407335,34.92951360369332,16.770008714716006,7.3737935976014235,13.01582966862357,3.9896223334427727,30.02835866694761,28.172590377939557,26.219067962047987,16.785855734898476,26.650361101963604,5.374336446241559,14.669200282290813,31.053774903397855,21.05731263628467,23.469156705098413,13.493498703583864,10.174186592382659,23.872679473911514,27.962521247717437,12.680088740144928,18.022581673608432,26.37138845687854,38.1793942095962,6.82972515969428,7.828054146771417,21.914900391973084,25.893659368165842,30.519785800597646,24.774871663858953,29.93972245357275,7.875633763417755,19.63138600756688,20.242213056614755,17.429821631663355,32.49329882581698,33.51403995844796,10.119318717266562,11.608351063438382,10.050701517992477,21.44856361198851,22.33092334865401,11.149145194659077,12.199768813139409,14.536947208959905,29.187183141001142,21.00980039635219,5.347186374136363,29.327859158133194,12.305796803090248,24.026092815583883,24.83483866833113,18.192008993572777,34.4694090856801,16.933636022786054,27.753304271305176,14.925571697936228,29.10078386479765,13.91124616903129,20.483432284652576,15.600583135396597,19.72487059740321,8.643677802324138,15.590708471791293,21.282376038358976,30.322037239929877,21.602122393321395,35.07536080286193,25.08581004213284,35.716156937675095,23.606538829315777,14.902879645286093,8.90468308987682,8.621971974017,34.889712210879864,25.981815268686617,16.57129179628057,21.589123945981733,22.735926424762305,20.241181091452503,20.106713963549957,17.537079215167488,14.068170871640287,25.138801296480437,25.612967404793267,12.257713606785,22.898965041770005,7.600946951929828,21.88044613548017,25.42896708001463,27.955685339475792,23.1467454127859,2.007800756354121,16.60034750053797,23.549274884232336,15.146428081886572,24.12678164734214,35.626563900022994,17.83351202236181,14.262145185806933,25.16510396270041,13.953242930661022,26.859401751036298,35.695088729107525,22.890280793333886,22.558936398935042,20.67125501627439,16.702386896733728,18.508907985872355,11.204827656201669,19.303917706739533,18.493410970108968,37.64143452256187,23.18802906680037,25.841992895513727,23.32794376690678,10.29945747952473,18.318256793942396,18.36462713297067,11.48654691838499,14.271269933848565,2.7315242697634057,14.345867079878687,26.412364491949102,13.758787793264258,25.336330789172283,11.857722763255506,20.75136502206352,17.46772012146686,30.812809036018557,16.36070431407184,12.48825280699279,17.486958698073273,22.166058820998227,5.2187087315956315,20.09233665479077,31.697904143051645,30.350094700913473,8.917300091766771,33.52884875187995,32.773613628139756,10.47166316569396,19.82218484292607,8.932975557771247,16.68280953778884,11.155412744832393,23.85319097724055,22.826685325830294,13.709860060695828,7.723224363105161,9.480761257641523,34.73586952600429,13.809420162342002,9.097623496389868,24.492427194788732,31.20591013393501,24.22881541803111,29.651471680988408,19.14282389170257,12.905059462026092,13.045104564171599,16.145673973712565,23.416802366050913,6.824851940342254,21.852554843491898,21.92794353732214,12.68812823311471,19.437073688470466,22.95212931178449,12.71776432437735,16.049401151475507,14.480660372286508,27.0268109289447,30.24582175210972,13.035336779180518,3.56709313779362,9.094442907085538,20.027081844368155,21.620927268431302,17.933979943198743,23.764341971062148,24.82516403352347,16.624116681838142,17.647033373269494,26.421976851531674,22.11820206454697,29.167715167813483,9.72142437772639,20.389625129212366,10.997240337339917,10.965928268597128,11.839864008274894,31.939242465074663,35.09742644278056,8.478077700777181,29.975944917485407,12.64761274527325,22.120417141410417,27.525620503910122,10.33031479308967,18.84767806291137,29.399519674133693,29.502931770464972,32.12958602232983,20.513339535379647,14.866770879696087,26.143341244317533,28.746784942436253,14.004451917993368,14.257176639892979,11.289422901229237,12.756032083820688,9.565105295938242,27.765426715117584,9.560009435654791,8.670071877161893,20.49324194188374,24.752594948831472,26.016290133420476,31.52392459011439,21.348322548449048,8.146100437326997,25.528192363610085,38.795324510809166,24.322840329110747,19.343379515650643,35.15089388045123,24.527132041498326,26.11719212065952,20.169062585791934,25.87657047195588,22.275288705686016,15.43682616848975,32.880120206573565,11.000617922740354,24.689909959868892,23.500837492911977,16.020393080118204,38.89106659324824,33.918939710274046,3.8847998325344735,3.2709500142235104,23.616096707484598,30.212194319130514,18.147975864235942,15.444801723496294,24.193155274601487,25.326420042724965,9.749956148504815,17.814719362029248,18.51256966819877,29.205321651679608,14.90350231132246,14.012030904450757,9.173651713230454,17.497611841906956,18.90794953183917,11.227760333946225,18.702625575887808,11.19010293829065,28.922545347504194,14.284191588688042,31.840167501724025,23.36063000555722,20.56915702901869,19.5747925475869,16.886161780724514,17.366058768664622,15.408169627626677,23.417217861291764,31.42918994503664,6.959252765860904,19.824208871865633,13.316094410873418,32.86349281008013,13.783282002076703,19.28760505172496,10.418081859199262,22.867093175723426,4.720484945875381,12.20528677390802,9.720734625612998,8.376626996725616,24.563403952930944,29.404353962012074,15.433354247309222,14.5882694779718,21.551693320161167,19.8068425134426,8.784362054821004,19.79174548689618,27.748075155799693,19.082016716598297,11.155167995667629,32.54825026326105,26.153519208445353,31.180533348768606,34.598845902754555,20.531691374287217,25.95135454264147,18.962248121836097,0.8021580094788394,9.014821772898397,9.825429822583857,14.28726949345133,7.549152227063227,20.317886286450765,19.044068199535484,11.342725315608625,30.10378405593474,11.84375633920736,25.901107275197628,25.01981799712066,27.82468769668973,19.85450562702688,21.98260112655714,29.479364047622454,20.128959591124413,6.986252880387789,19.308012385696223,17.054458273155717,15.54062051303398,15.24641866569263,18.089719302063788,11.118159880116423,23.12786660330533,32.27672896490916,7.941023721139557,36.7442382424461,26.232847211354233,25.533090293146167,21.403682029673888,35.49557441951734,19.045934470545305,23.366605718676638,9.318652003636153,24.013368655314057,28.494842542003926,32.53451962850936,30.68726868462717,11.394645302280676,9.767452866296193,19.445132922777763,20.463603275183296,21.521346612366486,24.960359085639098,15.749180811782303,37.33774773627243,16.017314974168766,34.57608584556802,13.63026166509278,36.179115678537926,14.807393314271206,12.009715600021131,10.69481503875048,34.31600428681258,25.803392991369236],"a":[5.067194631466112,2.133539094331973,16.648661927242475,13.319144843927484,7.660411284933413,16.49259524086773,2.769139323570897,17.693195438848882,18.812202626306433,0.03149192658473243,12.589788166269713,11.235595692568271,19.280155143869063,18.777653358099087,9.368209520712165,16.205747056767045,0.0016781562915380022,12.71474477353948,17.905306060193027,11.522442465351759,6.544757423184824,12.340947805348673,7.113406727182379,4.818138034697359,16.34406676367866,1.9900089918997832,17.986771223446322,9.357368583337294,18.61658117445478,2.3753977438981355,10.317375876654978,3.539709462966787,0.3237307480407381,0.6552310682096341,17.425090748545053,19.34643552564288,5.4359773134110245,11.656501886062912,2.0652265933089176,16.25684332238537,9.751591141352932,16.60366091797279,9.287394879167795,17.498451709783545,16.528749469925206,17.300020300007446,18.79463230842356,7.336191243218773,1.752395123542243,1.8223536917091954,15.34301281998748,0.3806439464721745,18.601059134493983,4.537020035097297,13.970167463143532,9.924698743855064,11.11285051413418,9.076872952114226,8.60994570431744,16.446752754855453,4.893826874765184,3.2128846334991223,4.162876482051576,9.305319118290836,12.654554236568716,1.7587416905952002,11.525074341737142,17.043047594104642,4.353713983136105,4.81757846854884,13.517060345010652,4.32565522812443,7.738720508180124,3.3439975248219778,9.046967869172434,15.729616976259898,10.574493238449296,3.5304552422878954,2.861817809101006,9.695998422059219,12.142522740657311,11.186877648216512,3.8744174398349784,1.276819720918816,13.703183066197147,17.503624223421586,14.113130200072291,17.483202241433553,11.658775762753567,9.80898405412649,14.495135729883955,14.381739442603184,8.991019344132996,15.955216613879607,15.86090977178577,9.866785074675338,9.650905510557743,10.12677928793118,17.5127114152769,19.139492397133353,8.733981552903586,13.95210351997559,8.400201307417174,8.723707802241542,6.692270141947763,16.817710793716124,13.702518497230415,7.432263168040647,7.433437184729215,11.037780991498188,15.555559259096077,14.027342016468953,4.516540890751037,12.020129635599911,13.360801232986708,12.342105313335923,13.7164674142014,17.501906341405782,5.090216439343602,10.75940502399451,10.078703409091387,11.939826868001798,1.0339570192157899,14.354313707125348,9.731941394693596,9.57148986371303,5.325336325907211,8.602692727368662,10.682189240078447,7.626769797622637,14.95262172176341,1.058688327693944,1.2294227035265282,17.433453842009907,0.6407595905228503,18.65105490251199,2.871167547622453,0.6013183684625822,1.0916084883799293,17.885713058457288,16.27356286633725,5.745127548337465,19.51890188473086,9.833746433184118,19.745735903132513,16.656207949038656,0.20034117670016727,0.7335806668883516,2.9367466615132054,7.985280374138766,2.6770219025322017,0.47195712678365087,14.05296187069439,5.9123707553829075,15.812032362500798,15.977963052603709,8.497284585669114,5.750558450307381,9.504244469696763,18.250776007010128,16.45370837072685,8.86003577204339,8.552784307527288,13.862936286828344,9.830475971092941,12.272578970253996,12.484435530261933,7.568011141572026,10.948639730892697,2.1239127438170824,11.161049540141669,14.617214030078639,17.655699917810455,13.93875686867628,5.506316587861142,9.35491982644567,6.055902067499699,6.01596058810248,4.3329580290481,1.8334564183200674,2.426445794329921,9.549516685195542,16.88386757526476,1.9937538215962514,4.598483945224596,18.128104821719013,14.649850359856256,12.53059709875508,13.266474841825602,8.72291375490326,16.025615093096985,4.8694264933984055,11.368508854510356,0.5724125263780788,4.315506775118632,10.712848873223408,2.032233602959508,18.759414562066567,18.750199477952137,6.829697846965965,5.218638927738444,15.610789209681567,4.194562058918612,3.689145884442624,2.6523859729780774,14.498915176737004,11.529991713764268,0.8245168856580554,11.37701455804837,13.164762240336398,14.443166572931133,13.931015937285807,14.151164910588951,14.729510034442539,14.30995622795006,14.180987876759609,19.66349656922574,5.910283632349418,6.040425296190102,1.1187960801365593,17.018305226940143,15.95522874060344,6.207155254331598,16.823393954505505,1.0225953361301965,7.2847142746548865,6.483490787209729,9.974570839037433,11.493522647617812,13.19153582448143,0.6633643427706781,18.407829966605366,13.20213842269958,11.259584102170592,13.275534308187789,16.77292582734442,18.572677034488166,3.0889295666646976,18.46265039371072,9.276682927494427,3.0994046092416694,17.644821214035527,6.527239198428827,9.526084762978426,10.269787287094069,7.567220120928906,5.140110408806238,7.091409972221117,9.830160020767483,16.243773518798967,1.9859653550171252,16.039618796980584,14.74773972966676,14.989315369815927,3.531264742210074,0.48856002443119273,12.128684186844772,10.466843784216945,15.228404250420816,5.5400203605551335,19.364671965651045,1.0078138501672962,15.32398312659804,3.6644157177806136,4.555122468974222,14.64136177626541,6.124724256969993,13.785874862652673,8.401781230232546,11.124832238508468,19.32425861521302,18.36693219802642,14.045471495181685,18.194829869109924,0.22849488892411784,8.127530793389571,12.774112164661421,11.284883359392172,15.729300599288138,14.703210465895564,6.700118238389163,2.428959282479597,3.5022283916990293,8.158356315294494,3.2485845058768614,1.7702305391172635,3.5329176632424497,11.892202541528217,10.82564599540579,19.156885660877737,14.708480531542381,2.7544477220715002,10.477986463597277,0.6157499487809526,18.855065564780528,12.489492230536442,18.213177100485765,5.2754785280690575,17.035824075624284,4.498096333041293,10.390559660887146,5.712146432671736,3.8001801893189313,9.510160838577866,4.712032911754345,11.597832276768258,13.237337355321346,6.790947374835912,5.510084679898943,11.903414208823197,2.237034279766199,8.821834413472235,8.533681027980965,6.006504365846395,17.47345770178093,4.833183315908789,1.0171889229593356,6.585781033342157,5.672504096461051,0.1720087741865095,10.978327784281037,8.615407085058479,6.563194445666425,2.2588303163688384,8.419594095175746,7.725823323024179,19.227034052144166,4.9236964354425705,16.991406037994672,5.313377459356126,12.636217493793481,7.201351490641712,13.858687111351333,15.15350405765374,6.379553926875756,17.87462572575037,6.722224315455749,2.8541809350269665,0.9409734177656759,7.725655724677547,1.9190892364171974,18.27688929161726,15.493774972119487,11.098618523186104,15.220438079251203,8.730667042376847,4.6990849381246536,11.161447351298822,19.59903298018267,13.380329273407408,8.657842875698272,13.190164764614408,12.064292066149305,10.650145937590478,0.8406340092780651,19.20997958010149,5.161898057132612,1.4957231166975093,2.5308731680835628,4.57941524313779,7.036532891720881,4.326307920937462,0.5271218871675032,8.089113233978074,8.924883118354462,8.896061192423925,12.107965002546578,9.3553189366094,8.418946690357355,19.735609491195078,17.478209294004703,12.6543996470157,6.213778417999993,1.24421669182329,12.23495867813896,11.850795232662854,17.71134177231697,17.73466367057667,0.36525511684098344,16.00578796747993,15.654559420851669,9.696240241743862,0.46412552767432835,3.3820520979330304,14.464555902593617,19.181643219012955,1.5433759419660475,3.918413309201836,19.594777417692324,8.57752936395654,10.677201671638773,6.021482306682886,1.7046787720563294,10.630179675362088,16.783268230436402,9.901581476491703,6.304398309078367,3.0923515909417842,8.655564640946412,3.205771611104695,12.135186027023966,0.5169642697841725,0.5683070862205319,13.019627971192996,0.07356145682202886,1.61984714456473,3.818994953558459,9.48729635602303,13.689591696058269,13.7797362647433,16.336157239235433,7.106274774377739,12.099700665772897,1.1299635106733996,16.79533090620386,15.767235928607906,15.135455232916929,0.24687187180296277,12.07869434953794,11.27500081571669,14.234468363674871,4.274671957169849,2.932949005628389,19.774119278529078,6.993194946987207,3.228431574590225,18.414737531734016,7.048059167763272,19.150014961508614,13.084841816471208,4.458505295039363,12.552976259981294,12.97416651222704,16.567607331741616,9.788052483268874,15.046268143430236,6.178561412287262,15.10444158659132,9.344821768225092,1.5601763505589084,10.101145527948647,6.746558215771472,15.260501765255663,8.625754599589808,12.561076727044668,4.439950298588422,11.294463104383542,3.349731470602544,9.944401735618227,12.276034107062488,15.66774366967817,19.22904668558647,8.930541996858764,15.257514054030711,18.86491329889801,12.72552723639668,0.9278620653187541,9.04343115625494,4.851342968030661,4.539895300951984,1.9835844892894494,4.466572486950584,13.055356446538253,0.3644969091464656,2.8931633696555004,12.211722749579618,14.490055985391379,12.798723802053441,7.6265395173091965,9.850773507114852,4.317799896378811,19.396575916820428,3.9218796112769905,12.269488878483603,8.473785696785754,5.217702204025247,10.886070096774457,19.757417420491347,14.152037727936651,10.519347548528163,15.919192060975194,13.20591609833464,2.2923158443693037,10.815230882093921,16.130400685765387,18.077172733058838,8.588910692717864,1.134206706776526,19.245018313241296,3.5394114640715246,10.543595921187885,18.304741325881558,0.24869944920544285,1.486935007466199,10.724421067726464,15.220401099967846,1.5251727977209084,9.48669521448461,2.6397964608068847,18.11467660213548,12.21618435107752,18.624247135342202,17.55852928167681,19.034328180947956,12.821164824686754,2.331267991079704,0.7943789126171774,3.402527422548034,14.418486886979673,6.790642356246659,11.572839912309355,17.996701427263776,10.287618011859285,18.49225752584595,16.79420027142726,1.17132914539261,0.8988514819079052,1.705375973620571,16.560821584548783,15.676045238532076,17.96603014902404,8.931747140981185,14.598988507316445,12.943502502384945,10.982553712078706,3.1106512934012054,8.4779158299735,6.218470863219556,1.443430001679391,0.4651312380490502,10.737273857920684,14.20051081369001,2.7504439094187383,17.041348637606454,10.883699087828047,16.184390557497697,1.4902600051706028,3.136474710042707,12.170787934319405,14.456444947345535,2.5679769254459295,11.127715312523815,15.361516381235774,1.4277277121035903,2.897437548551234,12.860334475903322,14.288982404974577,7.959964772340218,1.7173005203348302,0.7266020985942578,15.91593340237123,0.24088315746817468,13.961962092319196,18.793698766358663,8.672210717248392,8.712555430565295,1.845415697465409,14.88215918227715,13.91797099378186,7.256508255731942,18.773648248606168,4.148774007611902,6.892210541024317,10.282508934394748,1.9377836092596912,19.492433506520655,10.126310499759125,0.28528365026208036,4.959181804666444,0.21797915586580618,2.3027881423432373,11.999003391783273,19.722909284928217,18.06753988394309,11.660328853932619,11.963229299192285,16.6947903843198,13.163920467217354,19.61694820253397,3.0812921756677936,8.627251627238124,12.16082832899962,9.529494781381299,11.545078848024799,12.317620105113463,8.602659937742665,19.534274869972435,19.576980142235286,13.080229601597924,8.779514983825457,12.775302987125304,9.459061609241438,9.796424374091956,6.1060072720724134,13.573200383847395,10.227262326052276,3.5555885648623864,17.119417755258187,14.608157513034886,12.52945309816071,11.403956323352308,12.283761077584469,4.1225223473709915,6.140294062756131,1.9267435703980773,15.747907403047755,18.822924409376416,7.726784125666573,15.831206364461474,3.6816068406776337,10.406693410847033,18.078811090825752,1.626350659428546,2.1043779290206333,18.03481061706001,8.315469833361838,19.780343922527027,14.918443329641743,6.102793936452384,5.55660078610813,0.03726328826156866,13.282519138677236,15.950456264506823,15.301115356291245,18.725927993080095,19.391533701455053,17.30513971260099,18.767842902767672,0.40124198091097796,19.198046622168476,6.860347395448474,3.574422792704879,6.208101651743525,5.4978301167557975,0.522748560181312,4.646430871934402,4.150241040942904,10.866594510374327,5.471015833562687,13.340587090802236,13.54745100562023,1.2600338459748306,5.673093725413891,7.372636750433674,15.943520556468002,1.149851928758303,6.224974948128641,6.595521214270095,3.031886585394439,11.132256682115504,19.189463245938192,15.94689379598822,11.195847592847787,14.038203819812178,2.0656313855212227,10.71740436921992,17.250619223172365,8.446993256355517,9.693878977554476,4.275926458141619,2.968692198773266,9.695253927235449,16.587964826435453,8.950905363897794,4.251708436894721,7.632862939091711,19.821432722377065,1.7477515600557814,0.8729308538643066,13.70160993014557,13.661928905115616,17.66175624653521,16.682348479850184,12.777089541780784,3.0508577659294867,15.151458309517768,1.7476995906358228,15.950361153516397,13.930534230335908,18.7862432836824,4.9193795301242815,1.664294875807979,2.6659262709775255,17.867615718434486,19.78138765090009,6.003787983253117,6.131252718652349,0.5238835273646858,15.363856803544373,2.674369420264102,2.6021805662416586,11.164369718101268,6.909642635989823,18.727403755793596,9.9805069557979,9.168458114215268,18.563136902985335,4.968010040922959,12.742009892658706,13.052225466061342,15.290449802075155,12.238449679843434,0.785680178107806,12.765521076800361,5.255651338846867,7.573446994966191,4.057888016387823,5.712991919583947,13.744407161487317,3.751070607767941,17.49858178401167,5.962976719185038,18.3507724807121,14.319153465544856,2.143109490049735,0.1785777652428422,1.6233160304278238,15.780094271704076,15.902166319271283,10.554566544690719,3.8329686346213254,17.58237893881519,13.265315520267054,5.954409364004234,8.952916417473249,7.148568557124917,11.322368006279738,12.96257796017606,7.695565398168989,18.515851915507678,1.7124140981731228,2.1615421939004253,9.433265822088547,10.319913752787393,16.975992636770023,1.2120570479273152,15.679256985292485,8.42747622466312,8.788096994927965,10.099999832507564,16.371534738782252,16.17696675347787,1.5251680946586044,12.292487174070331,12.818863396956989,9.823599562318392,19.194553247181446,13.724895133033197,11.696564657986777,6.007636501986764,12.439715365819843,12.881324013801683,8.55171184350661,12.649828825239249,11.074549150068599,18.120130366991916,19.765850359351678,10.208383496750134,14.229327929091582,2.6123249602774257,12.13714225538681,7.159270447914872,4.010446719794891,12.092309269433672,1.3818952830749742,0.2520863508161142,19.84958028777016,9.265516434749564,6.732315264355981,1.1696725735775937,8.776398543727364,2.8491388061885914,17.07555002414678,10.004709437171222,1.8829451787417684,13.054593054978882,17.87074173361895,0.31340729404695455,16.13142833775958,13.276577393135526,11.23850657768279,4.206774888328413,14.32474939445556,18.551618664538402,9.408174206150687,10.379274003920163,7.997965278207593,8.768790817661332,8.978687321103159,10.100384027102457,15.280495730350093,6.312891373243565,4.537203746053202,5.374949075662547,15.169764700154884,0.7282835750915506,8.18636595667552,9.475632804650003,19.767982870823868,5.45928608888917,15.538920027921366,9.368986763244118,0.018404826995657153,11.595912332246133,6.362565150925215,18.320392900114086,4.102491333126057,19.10168964018881,15.480870966981515,6.620172083648965,6.681670743227248,18.525730696440554,4.629476225134015,15.748644874373085,2.7731526381003313,12.724100821487884,19.191857800112466,10.350286630765165,3.498091277547344,4.9636265918624956,7.7333680007117245,14.471670581736804,17.11502400829231,17.664190943845462,10.949273863767539,12.67442728500377,3.233028797895341,17.425960276758744,8.867014766436503,13.969005893286939,9.06032436306397,5.23470676839104,2.807125034761566,7.1642272500964355,4.94103658124168,17.994085694410007,17.658258663577154,7.974720756867288,12.516400492672508,0.23156756695958958,8.332312474173303,19.35598459452568,9.3917644505531,15.158282861416996,16.393446081856208,11.507059027779935,17.40002566061896,12.10738443253813,4.888443759667354,11.80044056929589,17.102324330488415,10.302340124852233,10.510661910738882,3.8402744575554015,11.321216723476386,3.432882835732709,16.422775630451735,6.881269581222966,4.383280773229883,4.636699418815651,15.427367602795643,17.272168056965477,14.636811345736751,6.032099909286024,2.1363199089733342,18.13804716314626,19.90887811517424,16.88420930744536,11.223342119163128,19.081869928896257,11.099174651099153,9.274770779873972,16.8736868722864,15.27026433868902,3.064774566328534,15.139362610382596,18.637211649193127,5.394344898815899,5.5715367032893015,6.247767003563389,12.341495751657622,19.917380463493117,14.308178660242135,2.4281946827716716,1.2486891273674905,19.43358909559346,16.610319340788354,4.136637632735347,4.052780404401735,19.455073375836967,7.799308909291405,2.967156125807011,11.173069031740539,4.5409601794366905,14.908775771188015,6.6414165417310045,11.01696770306682,0.12171136675056538,8.820451727589926,3.510728152099296,4.044771636839011,13.121974919868528,3.99362674546881,17.58417923431134,2.63319903024668,13.56098218291442,18.92016331302282,6.5757075467034065,4.256344937696213,7.1117734931541365,13.902764837038122,9.621373106201027,11.872336438986085,16.749477644061685,1.589645602564702,19.688027004006475,3.060449084146417,14.552250665372322,6.0293769884259785,12.961053715536725,7.931731595072695,14.844175166725812,0.7196628933196125,8.308574924614494,6.477641881647713,1.6992284740499786,19.77147986892333,18.70101526005703,14.17227769510497,0.27046218256352006,3.420341019116182,11.383122917588743,4.05167407751335,17.21382959539885,19.33608352308163,15.33188735251667,2.546879171683094,19.094777384441826,10.422150169136515,19.74719252446823,15.433846980668196,14.50766979279579,13.385581413276997,10.189024483089533,0.2531039335423779,1.8144148135793303,8.90984509080328,7.647561484955925,4.0943901314068665,12.599214294638452,6.8869169998349555,3.1286212694558513,11.504124518817962,7.304395458155173,6.726751370094406,18.260774125043163,15.49544405440856,13.721382872796726,18.59761920217608,17.706974899447324,2.66351272783389,3.8841502199434563,16.35414309105719,3.974425421297232,6.877870398491277,13.994558401166204,0.6896502102269642,4.628818412376514,17.848706832788622,17.318895614764646,0.4706148409242594,18.25775120789546,19.152343651620125,7.36023896277179,17.558098525951777,17.607729540294027,4.760148763620049,14.624152036939124,7.252579639648533,16.065333517925513,10.667242650790381,18.334930159124422,12.305806855334097,3.8233498205969374,5.085967463163694,6.129709744235239,7.910796538408054,2.2272937350087973,17.464839522659553,1.9683803732589,17.49151266825994,1.7859337048256396,15.611368018968022,3.116082796166575,17.897512694057664,7.502566063448612,8.033779892562602,5.831039415836803,19.186516920410746,7.219416824747191],"p":[0.3706660198408436,0.2036310259070131,0.6048484065443323,0.15973953226710158,0.5104108885305252,0.17137052382090312,0.7567400741917967,0.3872151095835754,0.28026032237641285,0.6843708545394522,0.44591392596958035,0.40809374733714465,0.4387932006184059,0.4261942832856114,0.032660624991156295,0.9231252889628583,0.3167738709045711,0.9164684726949177,0.8491860480540012,0.10923362855413354,0.37722885158145125,0.5013231334064805,0.9004277818428175,0.5068532592058788,0.7188665749549648,0.7544188806067476,0.5900938323383682,0.42430777728038205,0.2834398969829084,0.0591866499804814,0.2432087729399588,0.26150252109863037,0.9752193128763298,0.8164932807823344,0.7506214409498371,0.9699902812193959,0.45542035344224785,0.735422463925824,0.8598470940807934,0.18442794841941068,0.978466747640838,0.510178727634991,0.9905964536393221,0.520700150665947,0.9126538216590692,0.7346907695018259,0.27516193807695943,0.21754627762795486,0.12445458888696215,0.4851204388676691,0.5010772487029835,0.03603301237030254,0.32516227101687445,0.5289079487060104,0.5910941520167523,0.2444493154419063,0.36756527040820597,0.14989628614004347,0.7837963082762456,0.048148785151629125,0.2514891378464106,0.1430257598486524,0.19660332935329516,0.5287475869182741,0.032350713680106,0.1424272910145341,0.45930230547899953,0.5009171497105338,0.9649234380039331,0.18200790749554896,0.2654655278154847,0.21899154407976518,0.7503562963509192,0.6700171024849062,0.2501312129910658,0.6358360720192278,0.6150992582616432,0.4205923586948699,0.6595349218325448,0.2678493603465457,0.6419774921105303,0.9563383181490419,0.36643676864290553,0.9194494314883108,0.2203614724497962,0.6832879195515915,0.9792068025783738,0.3620474614274063,0.8912201390965682,0.35064505725584594,0.02763762296516048,0.3779333064014887,0.8870133016789308,0.3293577695886576,0.38761673925704754,0.7694773828156456,0.520922582201164,0.7680726613560904,0.21934846627090332,0.7998649417545165,0.5854426947087343,0.7203565006986128,0.6351260815483688,0.28848804257697735,0.8545342513185712,0.5799425965748375,0.6112732264454206,0.5607905675954306,0.05957132859792624,0.1036621223330334,0.4374175480740239,0.5332158693932461,0.46754742478160494,0.634910638238444,0.9311237018968284,0.09576683374393236,0.8533575926829453,0.9453439867673272,0.9435914933117722,0.4062636756345799,0.18724606063168592,0.2679673807149412,0.83315787785389,0.5658824052602975,0.5868522469157431,0.12437703556959745,0.09991341351661776,0.9372211325956905,0.10198162960847945,0.47957047083756277,0.0398478405909688,0.8031988589620589,0.8642166822507384,0.10088436266924727,0.12043577347726031,0.9457297600760444,0.2691894033832358,0.5664198107204381,0.898910747235173,0.013238100220187121,0.7924143843796385,0.1053763076770764,0.9104716389502745,0.7354781167340494,0.2851183216419826,0.42646795255998793,0.5498303793029524,0.12974173766954133,0.6498989176401053,0.0820727180957661,0.04415917661419977,0.8845855420029414,0.6770045663315041,0.38893475849249737,0.06383531237009987,0.4145708773561745,0.6494664103441885,0.485931137953856,0.8326123152414042,0.3984764902725717,0.6734959291315716,0.674782701361287,0.22943225212766394,0.7390590698564345,0.5201048958578693,0.6192457302771821,0.2892480301504121,0.3329838751024625,0.34071659017122724,0.7032792529666239,0.01619334807990569,0.8180471097179789,0.787427990193152,0.2442896026821535,0.30137874764758577,0.16314859882519328,0.795390455615183,0.10947978761710808,0.8008715097707118,0.04722508246068302,0.6242123623980771,0.38857311991905474,0.8037435937250357,0.4594174374065989,0.08449937962015408,0.01246294669584791,0.46339257713331317,0.5965344576691158,0.8329538015768643,0.8780878030819006,0.43815414576267675,0.1928638707263779,0.012752727528582808,0.2842354894626171,0.8735529280147714,0.3455850012279995,0.4371126829275278,0.44295942471266514,0.3641564856540913,0.04633650021157498,0.3738116465349488,0.4732753907426168,0.894782813861704,0.02792374893938465,0.03698615783798931,0.41021526511126893,0.4242575563603006,0.8708794609803929,0.2625968310944984,0.516175181910957,0.7509139693700235,0.5562875084382255,0.9955297332626223,0.04591839081133697,0.022658361053150555,0.7881880283720277,0.9505654712111509,0.9560561575540418,0.6342403166011585,0.9354558200623708,0.8413502609063042,0.5285058274547851,0.8853709895632851,0.6023853001992496,0.4149162476545678,0.25028876085062657,0.03982461603854781,0.38028578442062044,0.2076446426883467,0.3106656240957919,0.2879600656422703,0.05800919543600025,0.8965544066638647,0.8740032501106774,0.33799608472640985,0.39942080344948794,0.32259874954035506,0.43969046741661266,0.10742856459077244,0.7867338966021062,0.8122258443845307,0.39262928378058226,0.8319718301462975,0.8999460377388115,0.6073124468429907,0.006283366601566254,0.7097006508792663,0.9133128021780803,0.2839725482929183,0.33519263653614617,0.04483489458220369,0.12581802208512438,0.20185539016497533,0.6457356149414983,0.36469843330107277,0.7488251986519281,0.7855157314807699,0.5254859233645881,0.22050886623099308,0.05266192216340615,0.1471808871250131,0.798662859722135,0.7480117060190385,0.6951111979114544,0.29970117392283524,0.4689471230120337,0.45217966501466855,0.011288267938600827,0.8191261679951789,0.41987636338860734,0.11957022296934272,0.29373860370373106,0.11661767571131776,0.16089698972609012,0.975515383643724,0.4747125807563499,0.9708485724432774,0.44049598843921167,0.3974434731119971,0.6500225834495019,0.5402230721192678,0.2777659853843608,0.20456208668510456,0.962138281053504,0.7052341034786613,0.7003464670395945,0.016527816485184532,0.5266885545296072,0.874589914968313,0.05079211646511883,0.7093792723581485,0.5033027062935365,0.12363873084099786,0.8100629625910094,0.9062820492289836,0.8109301285603299,0.5304612485742455,0.4244980609552469,0.4379618065213178,0.07642427905365357,0.9227913580535103,0.1684145625287301,0.6659968953692741,0.8734005430427847,0.10923750738952664,0.8616565504406575,0.5060295176075134,0.9656275860159351,0.3155947107995847,0.9173534138006569,0.09949917156053045,0.1233892060893147,0.4822681868631167,0.11331278096704334,0.5325070896835571,0.6602054146664555,0.005683815038647566,0.1266562206491073,0.8097554594787986,0.576924900512108,0.6032412124269697,0.9838365534040701,0.8660400395951244,0.4230629914884514,0.9907242277897343,0.7419204918221074,0.1360512102292859,0.8590474200643408,0.13606143246488034,0.5028755858873706,0.17693247809554813,0.9360218207806228,0.30532803333904046,0.2615122529100544,0.4430777522941891,0.6127433525314234,0.1609714168077876,0.38321994168500284,0.9229918399681696,0.018696623575594762,0.8766446087990707,0.0956115676804048,0.9452646056584697,0.6209776589757736,0.6163454428994923,0.061527215674258784,0.8772998393317946,0.013834080355118905,0.7547098084297161,0.4785401450895794,0.9553350800994065,0.682527436417262,0.10646719521956705,0.2589470417954447,0.08938365368437107,0.9307141792092624,0.4253097966813195,0.4224464618777528,0.552663678491337,0.2199627542941769,0.7176760957961728,0.887126147853327,0.3945883398911205,0.9524857674449798,0.809172339460428,0.3829230885749817,0.6790068082457779,0.759986887863286,0.3935756869682763,0.5080388771358566,0.7105675812246943,0.6224928539979042,0.8269370928717743,0.5305062879675106,0.7973597721022483,0.24508511722980497,0.163896954883904,0.6524160485342618,0.03216078113589482,0.6487159562299301,0.529615386438189,0.775203735394451,0.7701357111976641,0.057033023519554193,0.09640484150781203,0.46804565709290014,0.5270848530141039,0.9012744649593227,0.5292134602940812,0.7476434842674211,0.3741053558639058,0.17068489612044857,0.31264916838793555,0.5199616460033811,0.6397814097942727,0.23933062328788512,0.7657839345810733,0.8403868367351419,0.8924097549974281,0.1879228645195099,0.9194220786352598,0.0009435816672009878,0.5700985094080451,0.9414733207270007,0.8590562548535718,0.05180051226995497,0.9023007991663292,0.807891706363747,0.6335658289263846,0.6473210541593988,0.5268469758894541,0.65284440648125,0.5498838619975261,0.26022835264352784,0.9002082544007202,0.812130612430344,0.30923365519779544,0.7542284601885889,0.05084104319267335,0.6761194111358584,0.28451625176450457,0.7801252879100304,0.9723094457072421,0.24146869717048758,0.0014622436940223693,0.046620934486286236,0.23755011779179713,0.5641243763224539,0.8199078898850616,0.9807818951078422,0.11882467830499754,0.576839307666831,0.338998011911938,0.9067575718211256,0.06568774287883561,0.9787026536366719,0.203739811343159,0.0682817865899168,0.802892379625537,0.23556035905737382,0.46091641437562836,0.2448264560529998,0.35576650481185745,0.007484651069571413,0.5537458889419471,0.05188550151074778,0.5136805778626086,0.3115622851434612,0.9977346750297011,0.5764918686965148,0.9475320282489359,0.34929401742234933,0.26480617813102536,0.1121228694458507,0.4514421272157827,0.7277543920667902,0.9881995966463315,0.4258009714000619,0.2382319682269627,0.11532440980397873,0.4766708916505289,0.4707802734140154,0.863198032236266,0.9376408245438137,0.31759445526726204,0.026370040729742916,0.47689476765982697,0.26256055035724923,0.37895535024177374,0.18369503040674595,0.8334438652279754,0.8894350370327853,0.6098144680251099,0.6541457643010782,0.5810138297704326,0.7736640470583316,0.3472567227136225,0.4653813793776038,0.07510300958381122,0.13141260693281298,0.7886235020499714,0.9545400184510731,0.20938090995730452,0.3045784044769966,0.4127761408392199,0.9393020386110089,0.0811771003976276,0.04015336479190301,0.7882442370923453,0.4447944660124321,0.7047559711525686,0.1376663688030666,0.6879047882990597,0.5624674723140382,0.8392475648933417,0.9388002254210357,0.3150822489912952,0.7961258801178828,0.7398635297325653,0.23015904810872878,0.5748828094918113,0.8418431850600223,0.6084155738921817,0.5569740570348476,0.1256154831636065,0.49542028702879537,0.9671217001178325,0.33762330809986785,0.8844090135272544,0.35420938226723697,0.9831243345109741,0.7503717125828626,0.44271460179114674,0.5503304792517985,0.3894414794423571,0.4712876008137932,0.3694140043819374,0.5168680020436249,0.300974496891139,0.46441786238977967,0.27478888076020414,0.496656457024679,0.9200980335231446,0.6293566447379662,0.4215226993614367,0.5462237389022111,0.33230873834055386,0.09615279410144018,0.9388665802008545,0.8852656171809592,0.3125852922248278,0.16219605682268745,0.8184719774391538,0.6767676917954428,0.7201821184618693,0.04184401308136243,0.8235935079475605,0.14430473641822528,0.7851997992133168,0.6541776104020041,0.2560050034449963,0.6009762466808353,0.7223011819504641,0.834173664266548,0.8510694460980601,0.8007658299220146,0.5683832297956184,0.8604713564175084,0.13619140125400508,0.14500577479468246,0.4191546925118472,0.17547345962974492,0.5864248452851586,0.6830710326025673,0.0513502874188414,0.9604847950985196,0.643296381558021,0.2692305473951846,0.4542533412079781,0.7577486856745339,0.6992126554964786,0.05305578724295468,0.6531891033814268,0.605776407710376,0.9640128950353957,0.17059989942843212,0.3909198013660815,0.34216701702648367,0.39472818463859305,0.8501460248543136,0.1882949119535755,0.2818075689908559,0.2944607667666679,0.6171602782734482,0.3794883212635156,0.34635937872354083,0.05164344940793253,0.0651134829538258,0.5063262870491603,0.2660461455203813,0.4878040018554788,0.7104640903192414,0.368756478850236,0.8859123322180129,0.0029581400270657365,0.8061271969107102,0.16715402454954242,0.22226177900400645,0.7412270616085104,0.522576124584561,0.5493470418884587,0.9893085493595151,0.030591395447992387,0.8163363844932177,0.25543984946671006,0.6096394192065153,0.419512765587027,0.01399607358863153,0.697289234759018,0.9388163077202234,0.621711989404722,0.5954957690097804,0.6663259548407565,0.47984483856313465,0.3792069396373794,0.15042134540466967,0.30686513182657604,0.15236622129934752,0.31259883932760335,0.9603094733484248,0.25175596664557376,0.8520562181174447,0.5480004029072514,0.019088526915013615,0.6979373280632903,0.7678863270094682,0.6803915417143378,0.8523955227217428,0.0839291745744648,0.7067823083157216,0.6571352638192514,0.2404040728700476,0.6330687524418557,0.7297193408724709,0.5669313399825351,0.20644818807559862,0.5075148333034101,0.49844818288716985,0.2985939172749221,0.8323250531550774,0.8901739406018612,0.7232421289238093,0.6120474307955337,0.3427333127284278,0.8925325964491169,0.45960603117302745,0.44529471425420275,0.1388595600792799,0.406138823208571,0.04877359361221312,0.10868167420149577,0.3992812810571744,0.008158829558160718,0.8008145827130952,0.6317367852960112,0.14478143341385374,0.06303887097080763,0.7684935788054985,0.8334870148031392,0.46334673744210253,0.20152609498626495,0.345477790497682,0.3286265986103363,0.6443495370061096,0.37288179062396654,0.12024345933910485,0.3322862401647737,0.577326381983271,0.3620871278276989,0.22677656454735406,0.8934411689804871,0.48995470920506246,0.7663529643358578,0.4976886231646285,0.7154950405123308,0.6689690974125024,0.08222356028835631,0.2587922335281163,0.05471173639052829,0.7554629888084567,0.010114550706026293,0.4043305392043375,0.6397302843409571,0.5198620137802328,0.12902871187748954,0.6810854674488942,0.8324258013813282,0.5318552972205057,0.921939068685816,0.2115539894423799,0.5837159006843449,0.6202412685581791,0.10572227766994069,0.33064085077391137,0.2143472499562058,0.6936882630600492,0.34111162835036346,0.42113430423206366,0.4933578326969186,0.55013804364201,0.4380196151189413,0.305025517982803,0.6257039076623123,0.003608965378534501,0.5745981983622839,0.2530739289027055,0.5477578564875987,0.7527750791277616,0.6321544336568057,0.979661101550515,0.5852597572203992,0.19459722502582033,0.4261533573724534,0.7202183178361921,0.2737421656891794,0.9363241358853878,0.9643981856336026,0.5452066310279386,0.10075319393650983,0.4550668067162056,0.9563182698810666,0.6890106196966375,0.33081184089532223,0.17284758846722004,0.38757781730548313,0.17531643909766315,0.018890487760847785,0.676962080412933,0.04025994799134014,0.08611976124531395,0.3413831934321432,0.6002432338821628,0.19596797590396497,0.681046355032475,0.23492620802880326,0.4873146287069632,0.8224139586332118,0.2702385987161393,0.028902192154816042,0.08752583899252153,0.766612737986778,0.6149608291657394,0.03583938114681939,0.5282200844521805,0.6269619710659251,0.8877249656980126,0.8694409973925628,0.20161733764294953,0.025395293178528178,0.8950229617145944,0.5592201505891914,0.8869444434927061,0.3180668528050481,0.5629375883027063,0.16301713121093497,0.823987094763821,0.7288219064235983,0.3708060620892426,0.6215589371170243,0.3697227527787752,0.7691736048421498,0.21325710937371523,0.20938703318715146,0.10362946302731335,0.9173821501423118,0.15537945116884577,0.6722788437931457,0.9599906013615518,0.2733284538959879,0.5868173944230146,0.8385833790811636,0.7767162479821583,0.06642230806580196,0.18265853486567307,0.6036086055198482,0.9647313312162371,0.7995511546480261,0.9578644261688556,0.8115800484736857,0.09375587403938712,0.6446139858920126,0.654060585110174,0.16099302894004186,0.5645357686316079,0.42337328218534775,0.4471611535807134,0.8548573795967278,0.9873263256973404,0.392724761810443,0.7535255868536594,0.6746140071458753,0.4826764653342135,0.8506129483229361,0.643411292729501,0.9731221245928812,0.163121188452938,0.18832498660284513,0.7213259352187362,0.8117886296215673,0.4263403674011934,0.5321788695167529,0.7929292420722149,0.45738658963209033,0.47458416699177786,0.9704501743721068,0.018678891230767825,0.16647114580954225,0.5751997377348688,0.6097020325892311,0.019541187701626495,0.1130573650746598,0.33384826078719954,0.7940610487054462,0.1949040161421851,0.2574171152342124,0.937242414362379,0.6618882544822335,0.5357635694112217,0.9281232840408593,0.0008550460770548884,0.15919011167445984,0.5749374273470043,0.27202591049213587,0.54318347954873,0.5815344764321,0.8948499709084532,0.36328190724955034,0.10721055922088163,0.2840948891198323,0.07078856987820115,0.11627722156225917,0.9923830371141307,0.5231779102305298,0.22574872931292855,0.3183827657960794,0.8715804879139446,0.0024282235529400342,0.7944613749973255,0.3950663438210693,0.6329414734377095,0.40100425850923616,0.010242425885505169,0.6750988589349973,0.2788279911159226,0.4561740811359214,0.19908239916940174,0.03632616427986357,0.8129975066086095,0.7575990800656554,0.20754469415225274,0.5299665774279811,0.04897253485207442,0.3090067550441977,0.3311925224612493,0.9377560222789805,0.4332801459095317,0.8781597857561472,0.8781305305203193,0.6791402660646222,0.19342828020807512,0.6263551062845447,0.6777193812566533,0.03359683340353126,0.20836508336516135,0.08373589967593387,0.9264948516207037,0.3542524912672633,0.11130767154539467,0.9731938566135785,0.3188277643405242,0.4452715334284907,0.37607915718126494,0.06352018458718045,0.24078018161047354,0.026488506099001663,0.7153227668077631,0.03109647134668414,0.9263298884604938,0.8035132202457183,0.43614212554122767,0.7475989757944712,0.8364735509142378,0.9762632494119758,0.19277612146433354,0.05794604572121398,0.7249993214520665,0.5393877034130086,0.5530679900203641,0.4821906174136503,0.7647231487882189,0.28448014186786064,0.6015823817594574,0.5070599483721439,0.5878385023772883,0.7396416177874461,0.540650848457916,0.9877950235465691,0.19764265645212742,0.3801901448381708,0.13860879399667114,0.4368134487602362,0.04761712082560998,0.3542670580208034,0.25272361921948483,0.3781295241701099,0.66343654313939,0.20722386168616547,0.953982864702265,0.7466735092083456,0.09755433001721858,0.7560554658823968,0.7513796328338618,0.18233819015161745,0.05705332864570978,0.6712112752113206,0.43359906187507424,0.1936292855784547,0.8763112738854266,0.7850021034932495,0.1973043894310449,0.352399795075639,0.07175668422397163,0.4467876199482286,0.8849228761467454,0.15600382583477956,0.3340098722500551,0.7968698581687303,0.9367780277003526,0.8783325499603749,0.04947158445611821,0.6067507113759287,0.0551289286124641,0.9715566738450505,0.7804148349167568,0.5754428447796522,0.896628943679227,0.031448232934294884,0.9841463274222035,0.4632908203941517,0.06320289982888228,0.7346534063326331,0.2815122048179264,0.10501114775381093,0.5956842628168804,0.19817706795349044,0.6634281937786335,0.37584617690473676,0.32148018380270216,0.6566926237788662,0.6441522528224222,0.03417044652829526,0.22925525277934433,0.6418135877214333,0.7385888329411632,0.07304351333464898,0.8519536699774581,0.6658270463266422,0.4090804214862791,0.9706295834954874,0.14113412668187175,0.6376306319863454,0.7530232401150454,0.4753034646754104,0.2640691266911568,0.20092496587337472,0.7611792918857816,0.5215421466146037,0.45954108125967763,0.9626555165175439,0.8990737586692945,0.8851705877981393,0.7028807577586238,0.5476890522043454,0.3178118417143163,0.5077253934217416,0.8607916672569678,0.17091600074633218,0.8663439618839266,0.6940768219691855,0.597920999472433,0.22390925171385923,0.5828650484380284,0.9807667752977323,0.7633732560213542,0.5912662686711305,0.998951836737032,0.5468113589425607,0.49974116037125316,0.03487449093616668,0.24169702342670796,0.4867571719415156,0.7739973743106701,0.8285406902114312,0.3303766013306737,0.8607826989110139,0.7561979502725482,0.445482024612462,0.23117872768814607,0.33076909217958694,0.8705691298535787,0.4220772778068984,0.7665138268459375,0.6639139346383567,0.4987121242046242,0.6559764781368447,0.7265281242933979,0.5551935220775923,0.20179114325371938,0.13970562558161248,0.2333572443899543]}

},{}],143:[function(require,module,exports){
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

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var quantile = factory( 0.0, 1.0 );
	t.equal( typeof quantile, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, 1.0 );
	y = quantile( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, NaN );
	y = quantile( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `a >= b`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 1.0, 0.5 );

	y = quantile( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NINF );
	y = quantile( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( PINF, NINF );
	y = quantile( 0.3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the quantile for `p` given a small range `b - a`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var a;
	var b;
	var i;
	var p;
	var y;

	expected = smallRange.expected;
	p = smallRange.p;
	a = smallRange.a;
	b = smallRange.b;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( a[i], b[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `p` given a medium range `b - a`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var a;
	var b;
	var i;
	var p;
	var y;

	expected = mediumRange.expected;
	p = mediumRange.p;
	a = mediumRange.a;
	b = mediumRange.b;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( a[i], b[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `p` given a large range `b - a`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var a;
	var b;
	var i;
	var p;
	var y;

	expected = largeRange.expected;
	p = largeRange.p;
	a = largeRange.a;
	b = largeRange.b;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( a[i], b[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/quantile/test/test.factory.js")
},{"./../lib/factory.js":137,"./fixtures/julia/large_range.json":140,"./fixtures/julia/medium_range.json":141,"./fixtures/julia/small_range.json":142,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":57,"@stdlib/constants/float64/pinf":59,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/special/abs":74,"tape":298}],144:[function(require,module,exports){
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
var quantile = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `quantile` functions', function test( t ) {
	t.equal( typeof quantile.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/quantile/test/test.js")
},{"./../lib":138,"tape":298}],145:[function(require,module,exports){
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
var quantile = require( './../lib' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = quantile( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.2, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.2, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside `[0,1]` for `p` and a valid `a` and `b`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided `a >= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 0.5, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, 2.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, -2.0, -3.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the quantile for `p` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var a;
	var b;
	var i;
	var p;
	var y;

	expected = smallRange.expected;
	p = smallRange.p;
	a = smallRange.a;
	b = smallRange.b;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile for `p` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var a;
	var b;
	var i;
	var p;
	var y;

	expected = mediumRange.expected;
	p = mediumRange.p;
	a = mediumRange.a;
	b = mediumRange.b;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile for `p` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var a;
	var b;
	var i;
	var p;
	var y;

	expected = largeRange.expected;
	p = largeRange.p;
	a = largeRange.a;
	b = largeRange.b;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/quantile/test/test.quantile.js")
},{"./../lib":138,"./fixtures/julia/large_range.json":140,"./fixtures/julia/medium_range.json":141,"./fixtures/julia/small_range.json":142,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":57,"@stdlib/constants/float64/pinf":59,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/special/abs":74,"tape":298}],146:[function(require,module,exports){
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
			out = replace.call( out, RE_PERIOD_ZERO_EXP, 'e' );
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

},{"./is_number.js":149}],147:[function(require,module,exports){
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

},{"./is_number.js":149,"./zero_pad.js":153}],148:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":151}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
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
var isArray = Array.isArray; // NOTE: We use the global `Array.isArray` function here instead of `@stdlib/assert/is-array` to avoid circular dependencies.


// FUNCTIONS //

/**
* Returns a boolean indicating whether a value is `NaN`.
*
* @private
* @param {*} value - input value
* @returns {boolean} boolean indicating whether a value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 4 );
* // returns false
*/
function isnan( value ) { // explicitly define a function here instead of `@stdlib/math/base/assert/is-nan` in order to avoid circular dependencies
	return ( value !== value );
}

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
				token.arg = String( token.arg );
				break;
			case 'c':
				// Case: %c (character)
				if ( !isnan( token.arg ) ) {
					num = parseInt( token.arg, 10 );
					if ( num < 0 || num > 127 ) {
						throw new Error( 'invalid character code. Value: ' + token.arg );
					}
					token.arg = ( isnan( num ) ) ? String( token.arg ) : fromCharCode( num ); // eslint-disable-line max-len
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

},{"./format_double.js":146,"./format_integer.js":147,"./is_string.js":150,"./space_pad.js":152,"./zero_pad.js":153}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":155}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":158}],157:[function(require,module,exports){
arguments[4][150][0].apply(exports,arguments)
},{"dup":150}],158:[function(require,module,exports){
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
	var args;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	args = [ tokenize( str ) ];
	for ( i = 1; i < arguments.length; i++ ) {
		args.push( arguments[ i ] );
	}
	return interpolate.apply( null, args );
}


// EXPORTS //

module.exports = format;

},{"./is_string.js":157,"@stdlib/string/base/format-interpolate":148,"@stdlib/string/base/format-tokenize":154}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Symbol factory.
*
* @module @stdlib/symbol/ctor
*
* @example
* var Symbol = require( '@stdlib/symbol/ctor' );
*
* var s = Symbol( 'beep' );
* // returns <symbol>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

},{}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":164}],164:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":168}],165:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{"./define_property.js":166}],168:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":165,"./has_define_property_support.js":167,"./polyfill.js":169}],169:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":156}],170:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main;
if ( hasToStringTag() ) {
	main = polyfill;
} else {
	main = builtin;
}


// EXPORTS //

module.exports = main;

},{"./main.js":171,"./polyfill.js":172,"@stdlib/assert/has-tostringtag-support":24}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":173}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":173,"./tostringtag.js":174,"@stdlib/assert/has-own-property":20}],173:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],174:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":159}],175:[function(require,module,exports){
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

},{}],176:[function(require,module,exports){

},{}],177:[function(require,module,exports){
arguments[4][176][0].apply(exports,arguments)
},{"dup":176}],178:[function(require,module,exports){
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
},{"base64-js":175,"buffer":178,"ieee754":281}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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
},{"_process":288}],181:[function(require,module,exports){
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

},{"events":179,"inherits":282,"readable-stream/lib/_stream_duplex.js":183,"readable-stream/lib/_stream_passthrough.js":184,"readable-stream/lib/_stream_readable.js":185,"readable-stream/lib/_stream_transform.js":186,"readable-stream/lib/_stream_writable.js":187,"readable-stream/lib/internal/streams/end-of-stream.js":191,"readable-stream/lib/internal/streams/pipeline.js":193}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
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
},{"./_stream_readable":185,"./_stream_writable":187,"_process":288,"inherits":282}],184:[function(require,module,exports){
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
},{"./_stream_transform":186,"inherits":282}],185:[function(require,module,exports){
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
},{"../errors":182,"./_stream_duplex":183,"./internal/streams/async_iterator":188,"./internal/streams/buffer_list":189,"./internal/streams/destroy":190,"./internal/streams/from":192,"./internal/streams/state":194,"./internal/streams/stream":195,"_process":288,"buffer":178,"events":179,"inherits":282,"string_decoder/":297,"util":176}],186:[function(require,module,exports){
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
},{"../errors":182,"./_stream_duplex":183,"inherits":282}],187:[function(require,module,exports){
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
},{"../errors":182,"./_stream_duplex":183,"./internal/streams/destroy":190,"./internal/streams/state":194,"./internal/streams/stream":195,"_process":288,"buffer":178,"inherits":282,"util-deprecate":306}],188:[function(require,module,exports){
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
},{"./end-of-stream":191,"_process":288}],189:[function(require,module,exports){
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
},{"buffer":178,"util":176}],190:[function(require,module,exports){
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
},{"_process":288}],191:[function(require,module,exports){
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
},{"../../../errors":182}],192:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],193:[function(require,module,exports){
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
},{"../../../errors":182,"./end-of-stream":191}],194:[function(require,module,exports){
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
},{"../../../errors":182}],195:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":179}],196:[function(require,module,exports){
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

},{"./":197,"get-intrinsic":272}],197:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');
var setFunctionLength = require('set-function-length');

var $TypeError = require('es-errors/type');
var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $defineProperty = require('es-define-property');
var $max = GetIntrinsic('%Math.max%');

module.exports = function callBind(originalFunction) {
	if (typeof originalFunction !== 'function') {
		throw new $TypeError('a function is required');
	}
	var func = $reflectApply(bind, $call, arguments);
	return setFunctionLength(
		func,
		1 + $max(0, originalFunction.length - (arguments.length - 1)),
		true
	);
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"es-define-property":257,"es-errors/type":263,"function-bind":271,"get-intrinsic":272,"set-function-length":292}],198:[function(require,module,exports){
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

},{"./lib/is_arguments.js":199,"./lib/keys.js":200}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],201:[function(require,module,exports){
'use strict';

var $defineProperty = require('es-define-property');

var $SyntaxError = require('es-errors/syntax');
var $TypeError = require('es-errors/type');

var gopd = require('gopd');

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};

},{"es-define-property":257,"es-errors/syntax":262,"es-errors/type":263,"gopd":273}],202:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var defineDataProperty = require('define-data-property');

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var supportsDescriptors = require('has-property-descriptors')();

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}

	if (supportsDescriptors) {
		defineDataProperty(object, name, value, true);
	} else {
		defineDataProperty(object, name, value);
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

},{"define-data-property":201,"has-property-descriptors":274,"object-keys":286}],203:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],204:[function(require,module,exports){
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

},{"./ToNumber":235,"./ToPrimitive":237,"./Type":242}],205:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = require('es-errors/type');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (typeof LeftFirst !== 'boolean') {
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
	var bothStrings = typeof px === 'string' && typeof py === 'string';
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

},{"../helpers/isFinite":250,"../helpers/isNaN":251,"../helpers/isPrefixOf":252,"./ToNumber":235,"./ToPrimitive":237,"es-errors/type":263,"get-intrinsic":272}],206:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var callBound = require('call-bind/callBound');

var $charCodeAt = callBound('String.prototype.charCodeAt');
var $toUpperCase = callBound('String.prototype.toUpperCase');

// https://262.ecma-international.org/5.1/#sec-15.10.2.8

module.exports = function Canonicalize(ch, IgnoreCase) {
	if (typeof ch !== 'string' || ch.length !== 1) {
		throw new $TypeError('Assertion failed: `ch` must be a character');
	}

	if (typeof IgnoreCase !== 'boolean') {
		throw new $TypeError('Assertion failed: `IgnoreCase` must be a Boolean');
	}

	if (!IgnoreCase) {
		return ch; // step 1
	}

	var u = $toUpperCase(ch); // step 2

	if (u.length !== 1) {
		return ch; // step 3
	}

	var cu = u; // step 4

	if ($charCodeAt(ch, 0) >= 128 && $charCodeAt(cu, 0) < 128) {
		return ch; // step 5
	}

	return cu;
};

},{"call-bind/callBound":196,"es-errors/type":263}],207:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":265}],208:[function(require,module,exports){
'use strict';

var $EvalError = require('es-errors/eval');

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

},{"./DayWithinYear":211,"./InLeapYear":215,"./MonthFromTime":225,"es-errors/eval":258}],209:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":256,"./floor":246}],210:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":246}],211:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":209,"./DayFromYear":210,"./YearFromTime":244}],212:[function(require,module,exports){
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

},{"./modulo":247}],213:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.4

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

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

},{"../helpers/records/property-descriptor":254,"./IsAccessorDescriptor":216,"./IsDataDescriptor":218,"es-errors/type":263}],214:[function(require,module,exports){
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

},{"../helpers/timeConstants":256,"./floor":246,"./modulo":247}],215:[function(require,module,exports){
'use strict';

var $EvalError = require('es-errors/eval');

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

},{"./DaysInYear":212,"./YearFromTime":244,"es-errors/eval":258}],216:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var hasOwn = require('hasown');

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.1

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (!hasOwn(Desc, '[[Get]]') && !hasOwn(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

},{"../helpers/records/property-descriptor":254,"es-errors/type":263,"hasown":280}],217:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":283}],218:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var hasOwn = require('hasown');

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.2

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (!hasOwn(Desc, '[[Value]]') && !hasOwn(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

},{"../helpers/records/property-descriptor":254,"es-errors/type":263,"hasown":280}],219:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');

var isPropertyDescriptor = require('./IsPropertyDescriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.3

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

},{"./IsAccessorDescriptor":216,"./IsDataDescriptor":218,"./IsPropertyDescriptor":220,"es-errors/type":263}],220:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":254}],221:[function(require,module,exports){
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

},{"../helpers/isFinite":250,"../helpers/timeConstants":256}],222:[function(require,module,exports){
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

},{"../helpers/isFinite":250,"./DateFromTime":208,"./Day":209,"./MonthFromTime":225,"./ToInteger":234,"./YearFromTime":244,"./floor":246,"./modulo":247,"get-intrinsic":272}],223:[function(require,module,exports){
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

},{"../helpers/isFinite":250,"../helpers/timeConstants":256,"./ToInteger":234}],224:[function(require,module,exports){
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

},{"../helpers/timeConstants":256,"./floor":246,"./modulo":247}],225:[function(require,module,exports){
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

},{"./DayWithinYear":211,"./InLeapYear":215}],226:[function(require,module,exports){
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

},{"../helpers/isNaN":251}],227:[function(require,module,exports){
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

},{"../helpers/timeConstants":256,"./floor":246,"./modulo":247}],228:[function(require,module,exports){
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

},{"./Type":242}],229:[function(require,module,exports){
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


},{"../helpers/isFinite":250,"./ToNumber":235,"./abs":245,"get-intrinsic":272}],230:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":256,"./DayFromYear":210}],231:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":256,"./modulo":247}],232:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],233:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":235}],234:[function(require,module,exports){
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

},{"../helpers/isFinite":250,"../helpers/isNaN":251,"../helpers/sign":255,"./ToNumber":235,"./abs":245,"./floor":246}],235:[function(require,module,exports){
'use strict';

var ToPrimitive = require('./ToPrimitive');

var callBound = require('call-bind/callBound');

var $replace = callBound('String.prototype.replace');

var safeRegexTester = require('safe-regex-test');

var isNonDecimal = safeRegexTester(/^0[ob]|^[+-]0x/);

// http://262.ecma-international.org/5.1/#sec-9.3

module.exports = function ToNumber(value) {
	var prim = ToPrimitive(value, Number);
	if (typeof prim !== 'string') {
		return +prim; // eslint-disable-line no-implicit-coercion
	}

	var trimmed = $replace(
		prim,
		// eslint-disable-next-line no-control-regex
		/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g,
		''
	);
	if (isNonDecimal(trimmed)) {
		return NaN;
	}

	return +trimmed; // eslint-disable-line no-implicit-coercion
};

},{"./ToPrimitive":237,"call-bind/callBound":196,"safe-regex-test":291}],236:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":266}],237:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":268}],238:[function(require,module,exports){
'use strict';

var hasOwn = require('hasown');

var $TypeError = require('es-errors/type');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (hasOwn(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (hasOwn(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (hasOwn(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (hasOwn(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (hasOwn(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (hasOwn(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((hasOwn(desc, '[[Get]]') || hasOwn(desc, '[[Set]]')) && (hasOwn(desc, '[[Value]]') || hasOwn(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

},{"./IsCallable":217,"./ToBoolean":232,"./Type":242,"es-errors/type":263,"hasown":280}],239:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":272}],240:[function(require,module,exports){
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

},{"../helpers/isFinite":250,"../helpers/isNaN":251,"../helpers/sign":255,"./ToNumber":235,"./abs":245,"./floor":246,"./modulo":247}],241:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":235}],242:[function(require,module,exports){
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

},{}],243:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":209,"./modulo":247}],244:[function(require,module,exports){
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

},{"call-bind/callBound":196,"get-intrinsic":272}],245:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":272}],246:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],247:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":253}],248:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":256,"./modulo":247}],249:[function(require,module,exports){
'use strict';

/* eslint global-require: 0 */

// https://es5.github.io/#x9
module.exports = {
	'Abstract Equality Comparison': require('./5/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./5/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./5/StrictEqualityComparison'),
	abs: require('./5/abs'),
	Canonicalize: require('./5/Canonicalize'),
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

},{"./5/AbstractEqualityComparison":204,"./5/AbstractRelationalComparison":205,"./5/Canonicalize":206,"./5/CheckObjectCoercible":207,"./5/DateFromTime":208,"./5/Day":209,"./5/DayFromYear":210,"./5/DayWithinYear":211,"./5/DaysInYear":212,"./5/FromPropertyDescriptor":213,"./5/HourFromTime":214,"./5/InLeapYear":215,"./5/IsAccessorDescriptor":216,"./5/IsCallable":217,"./5/IsDataDescriptor":218,"./5/IsGenericDescriptor":219,"./5/IsPropertyDescriptor":220,"./5/MakeDate":221,"./5/MakeDay":222,"./5/MakeTime":223,"./5/MinFromTime":224,"./5/MonthFromTime":225,"./5/SameValue":226,"./5/SecFromTime":227,"./5/StrictEqualityComparison":228,"./5/TimeClip":229,"./5/TimeFromYear":230,"./5/TimeWithinDay":231,"./5/ToBoolean":232,"./5/ToInt32":233,"./5/ToInteger":234,"./5/ToNumber":235,"./5/ToObject":236,"./5/ToPrimitive":237,"./5/ToPropertyDescriptor":238,"./5/ToString":239,"./5/ToUint16":240,"./5/ToUint32":241,"./5/Type":242,"./5/WeekDay":243,"./5/YearFromTime":244,"./5/abs":245,"./5/floor":246,"./5/modulo":247,"./5/msFromTime":248}],250:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":251}],251:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],252:[function(require,module,exports){
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

},{"call-bind/callBound":196}],253:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],254:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var hasOwn = require('hasown');

var allowed = {
	__proto__: null,
	'[[Configurable]]': true,
	'[[Enumerable]]': true,
	'[[Get]]': true,
	'[[Set]]': true,
	'[[Value]]': true,
	'[[Writable]]': true
};

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function isPropertyDescriptor(Desc) {
	if (!Desc || typeof Desc !== 'object') {
		return false;
	}

	for (var key in Desc) { // eslint-disable-line
		if (hasOwn(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	var isData = hasOwn(Desc, '[[Value]]') || hasOwn(Desc, '[[Writable]]');
	var IsAccessor = hasOwn(Desc, '[[Get]]') || hasOwn(Desc, '[[Set]]');
	if (isData && IsAccessor) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"es-errors/type":263,"hasown":280}],255:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],256:[function(require,module,exports){
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

},{}],257:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

/** @type {import('.')} */
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true) || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;

},{"get-intrinsic":272}],258:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],259:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],260:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],261:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],262:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],263:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],264:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],265:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":263}],266:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":267,"./RequireObjectCoercible":265}],267:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

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

},{"./helpers/isPrimitive":269,"is-callable":283}],269:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],270:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

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

var $Error = require('es-errors');
var $EvalError = require('es-errors/eval');
var $RangeError = require('es-errors/range');
var $ReferenceError = require('es-errors/ref');
var $SyntaxError = require('es-errors/syntax');
var $TypeError = require('es-errors/type');
var $URIError = require('es-errors/uri');

var $Function = Function;

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
var hasProto = require('has-proto')();

var getProto = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
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
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

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
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
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
var hasOwn = require('hasown');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

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

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
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

},{"es-errors":259,"es-errors/eval":258,"es-errors/range":260,"es-errors/ref":261,"es-errors/syntax":262,"es-errors/type":263,"es-errors/uri":264,"function-bind":271,"has-proto":275,"has-symbols":276,"hasown":280}],273:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;

},{"get-intrinsic":272}],274:[function(require,module,exports){
'use strict';

var $defineProperty = require('es-define-property');

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
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

},{"es-define-property":257}],275:[function(require,module,exports){
'use strict';

var test = {
	__proto__: null,
	foo: {}
};

var $Object = Object;

/** @type {import('.')} */
module.exports = function hasProto() {
	// @ts-expect-error: TS errors on an inherited property for some reason
	return { __proto__: test }.foo === test.foo
		&& !(test instanceof $Object);
};

},{}],276:[function(require,module,exports){
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

},{"./shams":277}],277:[function(require,module,exports){
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

},{}],278:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":277}],279:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":271}],280:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":271}],281:[function(require,module,exports){
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

},{}],282:[function(require,module,exports){
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

},{}],283:[function(require,module,exports){
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
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};

},{}],284:[function(require,module,exports){
'use strict';

var callBound = require('call-bind/callBound');
var hasToStringTag = require('has-tostringtag/shams')();
var has;
var $exec;
var isRegexMarker;
var badStringifier;

if (hasToStringTag) {
	has = callBound('Object.prototype.hasOwnProperty');
	$exec = callBound('RegExp.prototype.exec');
	isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}
}

var $toString = callBound('Object.prototype.toString');
var gOPD = Object.getOwnPropertyDescriptor;
var regexClass = '[object RegExp]';

module.exports = hasToStringTag
	// eslint-disable-next-line consistent-return
	? function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		var descriptor = gOPD(value, 'lastIndex');
		var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
		if (!hasLastIndexDataProperty) {
			return false;
		}

		try {
			$exec(value, badStringifier);
		} catch (e) {
			return e === isRegexMarker;
		}
	}
	: function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return $toString(value) === regexClass;
	};

},{"call-bind/callBound":196,"has-tostringtag/shams":278}],285:[function(require,module,exports){
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

},{"./isArguments":287}],286:[function(require,module,exports){
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

},{"./implementation":285,"./isArguments":287}],287:[function(require,module,exports){
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

},{}],288:[function(require,module,exports){
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

},{}],289:[function(require,module,exports){
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
},{"_process":288,"through":304,"timers":305}],290:[function(require,module,exports){
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

},{"buffer":178}],291:[function(require,module,exports){
'use strict';

var callBound = require('call-bind/callBound');
var isRegex = require('is-regex');

var $exec = callBound('RegExp.prototype.exec');
var $TypeError = require('es-errors/type');

module.exports = function regexTester(regex) {
	if (!isRegex(regex)) {
		throw new $TypeError('`regex` must be a RegExp');
	}
	return function test(s) {
		return $exec(regex, s) !== null;
	};
};

},{"call-bind/callBound":196,"es-errors/type":263,"is-regex":284}],292:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');
var define = require('define-data-property');
var hasDescriptors = require('has-property-descriptors')();
var gOPD = require('gopd');

var $TypeError = require('es-errors/type');
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
};

},{"define-data-property":201,"es-errors/type":263,"get-intrinsic":272,"gopd":273,"has-property-descriptors":274}],293:[function(require,module,exports){
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

},{"es-abstract/es5":249,"function-bind":271}],294:[function(require,module,exports){
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

},{"./implementation":293,"./polyfill":295,"./shim":296,"define-properties":202,"function-bind":271}],295:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":293}],296:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":295,"define-properties":202}],297:[function(require,module,exports){
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
},{"safe-buffer":290}],298:[function(require,module,exports){
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
},{"./lib/default_stream":299,"./lib/results":301,"./lib/test":302,"_process":288,"defined":203,"through":304,"timers":305}],299:[function(require,module,exports){
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
},{"_process":288,"fs":177,"through":304}],300:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":288,"timers":305}],301:[function(require,module,exports){
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
},{"_process":288,"events":179,"function-bind":271,"has":279,"inherits":282,"object-inspect":303,"resumer":289,"through":304,"timers":305}],302:[function(require,module,exports){
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
},{"./next_tick":300,"deep-equal":198,"defined":203,"events":179,"has":279,"inherits":282,"path":180,"string.prototype.trim":294}],303:[function(require,module,exports){
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

},{}],304:[function(require,module,exports){
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
},{"_process":288,"stream":181}],305:[function(require,module,exports){
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
},{"process/browser.js":288,"timers":305}],306:[function(require,module,exports){
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
},{}]},{},[143,144,145]);
