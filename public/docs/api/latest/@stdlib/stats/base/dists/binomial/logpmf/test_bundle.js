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

},{"./uint16array.js":28,"@stdlib/assert/is-uint16array":40,"@stdlib/constants/uint16/max":64}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":31,"@stdlib/assert/is-uint32array":42,"@stdlib/constants/uint32/max":65}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":34,"@stdlib/assert/is-uint8array":44,"@stdlib/constants/uint8/max":66}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":230}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":230}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":230}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":230}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* The Euler-Mascheroni constant.
*
* @module @stdlib/constants/float64/eulergamma
* @type {number}
*
* @example
* var GAMMA = require( '@stdlib/constants/float64/eulergamma' );
* // returns 0.5772156649015329
*/


// MAIN //

/**
* The Euler-Mascheroni constant.
*
* @constant
* @type {number}
* @default 0.5772156649015329
* @see [OEIS]{@link http://oeis.org/A001620}
* @see [Mathworld]{@link http://mathworld.wolfram.com/Euler-MascheroniConstant.html}
*/
var GAMMA = 0.577215664901532860606512090082402431042;


// EXPORTS //

module.exports = GAMMA;

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
* Natural logarithm of the square root of `2π`.
*
* @module @stdlib/constants/float64/ln-sqrt-two-pi
* @type {number}
*
* @example
* var LN_SQRT_TWO_PI = require( '@stdlib/constants/float64/ln-sqrt-two-pi' );
* // returns 0.9189385332046728
*/


// MAIN //

/**
* Natural logarithm of the square root of `2π`.
*
* ```tex
* \ln \sqrt{2\pi}
* ```
*
* @constant
* @type {number}
* @default 0.9189385332046728
*/
var LN_SQRT_TWO_PI = 9.18938533204672741780329736405617639861397473637783412817151540482765695927260397694743298635954197622005646625e-01; // eslint-disable-line max-len


// EXPORTS //

module.exports = LN_SQRT_TWO_PI;

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

},{"@stdlib/number/ctor":165}],59:[function(require,module,exports){
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
* Square root of the mathematical constant `π` times `2`.
*
* @module @stdlib/constants/float64/sqrt-two-pi
* @type {number}
*
* @example
* var SQRT_TWO_PI = require( '@stdlib/constants/float64/sqrt-two-pi' );
* // returns 2.5066282746310007
*/


// MAIN //

/**
* Square root of the mathematical constant `π` times `2`.
*
* @constant
* @type {number}
* @default 2.5066282746310007
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var SQRT_TWO_PI = 2.506628274631000502415765284811045253e+00;


// EXPORTS //

module.exports = SQRT_TWO_PI;

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

},{}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-integer":71}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":58,"@stdlib/constants/float64/pinf":61}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":72}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":101}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":74}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/constants/float64/ninf":58}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":101}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-even":67}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":82}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":61}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":84}],84:[function(require,module,exports){
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
* The code is adapted from the Fortran routine from the FNLIB library of the [SLATEC Common Mathematical Library]{@link https://netlib.org/slatec/fnlib/dcsevl.f}.
*
* The original code was developed by W. Fullerton of Los Alamos Scientific Laboratory, a governmental institution, and is therefore public domain.
*/

'use strict';

// VARIABLES //

var ALGMCS = [
	+0.1276642195630062933333333333333e-30,
	-0.3401102254316748799999999999999e-29,
	+0.1025680058010470912000000000000e-27,
	-0.3547598158101070547199999999999e-26,
	+0.1429227355942498147573333333333e-24,
	-0.6831888753985766870111999999999e-23,
	+0.3962837061046434803679306666666e-21,
	-0.2868042435334643284144622399999e-19,
	+0.2683181998482698748957538846666e-17,
	-0.3399615005417721944303330599666e-15,
	+0.6221098041892605227126015543416e-13,
	-0.1809129475572494194263306266719e-10,
	+0.9810825646924729426157171547487e-8,
	-0.1384948176067563840732986059135e-4,
	+0.1666389480451863247205729650822e+0
];
var LEN = ALGMCS.length;


// MAIN //

/**
* Evaluates the n-term Chebyshev series at `x`.
*
* ## References
*
* -   Broucke, Roger. 1973. "Algorithm: Ten Subroutines for the Manipulation of Chebyshev Series." _Communications of the ACM_ 16 (4). New York, NY, USA: ACM: 254–56. doi:[10.1145/362003.362037](https://doi.org/10.1145/362003.362037).
* -   Fox, Leslie, and Ian Bax Parker. 1968. _Chebyshev polynomials in numerical analysis_. Oxford Mathematical Handbooks. London, United Kingdom: Oxford University Press. <https://books.google.com/books?id=F8NzsEtJCD0C>.
*
* @private
* @param {number} x - value at which the series is to be evaluated
* @returns {number} series value
*/
function dcseval( x ) {
	var twox;
	var b2;
	var b1;
	var b0;
	var i;

	if ( x < -1.1 || x > 1.1 ) {
		return NaN;
	}
	b1 = 0.0;
	b0 = 0.0;
	twox = 2.0 * x;
	for ( i = 0; i < LEN; i++ ) {
		b2 = b1;
		b1 = b0;
		b0 = (twox*b1) - b2 + ALGMCS[ i ];
	}
	return ( b0-b2 ) * 0.5;
}


// EXPORTS //

module.exports = dcseval;

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
* The code is adapted from the Fortran routine from the FNLIB library of the [SLATEC Common Mathematical Library]{@link https://netlib.org/fn/d9lgmc.f}.
*
* The original code was developed by W. Fullerton of Los Alamos Scientific Laboratory, a governmental institution, and is therefore public domain.
*/

'use strict';

// MODULES //

var pow = require( '@stdlib/math/base/special/pow' );
var dceval = require( './dceval.js' );


// VARIABLES //

var XBIG = 94906265.62425156;
var XMAX = 3.745194030963158e306;


// MAIN //

/**
* Computes the log gamma correction factor for `x >= 10`.
*
* ```tex
* \log(\gamma(x)) = \log(\sqrt{2*\Pi}) + (x-0.5) \cdot \log(x) - x \operatorname{R9LGMC}(x).
* ```
*
* @private
* @param {number} x - input value
* @returns {number} correction value
*/
function gammaCorrection( x ) {
	if ( x < 10.0 ) {
		return NaN;
	}
	// Check for underflow...
	if ( x >= XMAX ) {
		return 0.0;
	}
	if ( x < XBIG ) {
		return dceval( (2.0*pow( 10.0/x, 2.0 )) - 1.0 ) / x;
	}
	return 1.0 / (x * 12.0);
}


// EXPORTS //

module.exports = gammaCorrection;

},{"./dceval.js":85,"@stdlib/math/base/special/pow":140}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the natural logarithm of the beta function.
*
* @module @stdlib/math/base/special/betaln
*
* @example
* var betaln = require( '@stdlib/math/base/special/betaln' );
*
* var v = betaln( 0.0, 0.0 );
* // returns Infinity
*
* v = betaln( 1.0, 1.0 );
* // returns 0.0
*
* v = betaln( -1.0, 2.0 );
* // returns NaN
*
* v = betaln( 5.0, 0.2 );
* // returns ~1.218
*
* v = betaln( 4.0, 1.0 );
* // returns ~-1.386
*
* v = betaln( NaN, 2.0 );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":88}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The code is adapted from the Fortran routine from the FNLIB library of the [SLATEC Common Mathematical Library]{@link https://www.netlib.org/slatec/fnlib/albeta.f}.
*
* The original code was developed by W. Fullerton of Los Alamos Scientific Laboratory, a governmental institution, and is therefore public domain.
*/

'use strict';

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var LN_SQRT_TWO_PI = require( '@stdlib/constants/float64/ln-sqrt-two-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var correction = require( './gamma_correction.js' );


// MAIN //

/**
* Evaluates the natural logarithm of the beta function.
*
* @param {NonNegativeNumber} a - first input value
* @param {NonNegativeNumber} b - second input value
* @returns {number} natural logarithm of beta function
*
* @example
* var v = betaln( 0.0, 0.0 );
* // returns Infinity
*
* @example
* var v = betaln( 1.0, 1.0 );
* // returns 0.0
*
* @example
* var v = betaln( -1.0, 2.0 );
* // returns NaN
*
* @example
* var v = betaln( 5.0, 0.2 );
* // returns ~1.218
*
* @example
* var v = betaln( 4.0, 1.0 );
* // returns ~-1.386
*
* @example
* var v = betaln( NaN, 2.0 );
* // returns NaN
*/
function betaln( a, b ) {
	var corr;
	var p;
	var q;

	p = min( a, b );
	q = max( a, b );

	if ( p < 0.0 ) {
		return NaN;
	}
	if ( p === 0.0 ) {
		return PINF;
	}
	if ( q === PINF ) {
		return NINF;
	}
	// Case: p and q are big
	if ( p >= 10.0 ) {
		corr = correction( p ) + correction( q ) - correction( p+q );
		return ( -0.5*ln( q ) ) + LN_SQRT_TWO_PI + corr + ( (p-0.5) * ln( p/(p+q) ) ) + ( q*log1p( -p/(p+q) ) ); // eslint-disable-line max-len
	}
	// Case: p is small, but q is big
	if ( q >= 10.0 ) {
		corr = correction( q ) - correction( p+q );
		return gammaln( p ) + corr + p - (p*ln( p+q )) + ( (q-0.5)*log1p( -p/(p+q) ) ); // eslint-disable-line max-len
	}
	// Case: p and q are small
	return ln( gamma( p ) * ( gamma( q ) / gamma( p+q ) ) );
}


// EXPORTS //

module.exports = betaln;

},{"./gamma_correction.js":86,"@stdlib/constants/float64/ln-sqrt-two-pi":53,"@stdlib/constants/float64/ninf":58,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/special/gamma":103,"@stdlib/math/base/special/gammaln":109,"@stdlib/math/base/special/ln":129,"@stdlib/math/base/special/log1p":133,"@stdlib/math/base/special/max":136,"@stdlib/math/base/special/min":138}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the natural logarithm of the binomial coefficient.
*
* @module @stdlib/math/base/special/binomcoefln
*
* @example
* var binomcoefln = require( '@stdlib/math/base/special/binomcoefln' );
*
* var v = binomcoefln( 8, 2 );
* // returns ~3.332
*
* v = binomcoefln( 0, 0 );
* // returns 0.0
*
* v = binomcoefln( -4, 2 );
* // returns ~2.302
*
* v = binomcoefln( 88, 3 );
* // returns ~11.606
*
* v = binomcoefln( NaN, 3 );
* // returns NaN
*
* v = binomcoefln( 5, NaN );
* // returns NaN
*
* v = binomcoefln( NaN, NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var betaln = require( '@stdlib/math/base/special/betaln' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Computes the natural logarithm of the binomial coefficient of two integers.
*
* @param {integer} n - input value
* @param {integer} k - second input value
* @returns {number} function value
*
* @example
* var v = binomcoefln( 8, 2 );
* // returns ~3.332
*
* @example
* var v = binomcoefln( 0, 0 );
* // returns 0.0
*
* @example
* var v = binomcoefln( -4, 2 );
* // returns ~2.303
*
* @example
* var v = binomcoefln( 88, 3 );
* // returns ~11.606
*
* @example
* var v = binomcoefln( NaN, 3 );
* // returns NaN
*
* @example
* var v = binomcoefln( 5, NaN );
* // returns NaN
*
* @example
* var v = binomcoefln( NaN, NaN );
* // returns NaN
*/
function binomcoefln( n, k ) {
	if ( isnan( n ) || isnan( k ) ) {
		return NaN;
	}
	if ( !isInteger( n ) || !isInteger( k ) ) {
		return NaN;
	}
	if ( n < 0.0 ) {
		return binomcoefln( -n + k - 1, k );
	}
	if ( k < 0 ) {
		return NINF;
	}
	if ( k === 0 ) {
		return 0.0;
	}
	if ( k === 1 ) {
		return ln( abs( n ) );
	}
	if ( n < k ) {
		return NINF;
	}
	if ( n - k < 2 ) {
		return binomcoefln( n, n - k );
	}
	// Case: n - k >= 2
	return -ln( n + 1 ) - betaln( n - k + 1, k + 1 );
}


// EXPORTS //

module.exports = binomcoefln;

},{"@stdlib/constants/float64/ninf":58,"@stdlib/math/base/assert/is-integer":71,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/special/abs":83,"@stdlib/math/base/special/betaln":87,"@stdlib/math/base/special/ln":129}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":92}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":94}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/constants/float64/high-word-sign-mask":51,"@stdlib/number/float64/base/from-words":169,"@stdlib/number/float64/base/get-high-word":173,"@stdlib/number/float64/base/to-words":188}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the cosine of a number.
*
* @module @stdlib/math/base/special/cos
*
* @example
* var cos = require( '@stdlib/math/base/special/cos' );
*
* var v = cos( 0.0 );
* // returns 1.0
*
* v = cos( 3.141592653589793/4.0 );
* // returns ~0.707
*
* v = cos( -3.141592653589793/6.0 );
* // returns ~0.866
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_cos.c}. The implementation follows the original, but has been modified for JavaScript.
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
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );
var ABS_MASK = require( '@stdlib/constants/float64/high-word-abs-mask' );
var EXPONENT_MASK = require( '@stdlib/constants/float64/high-word-exponent-mask' );


// VARIABLES //

// Scratch array for storing temporary values:
var buffer = [ 0.0, 0.0 ]; // WARNING: not thread safe

// High word of π/4: 0x3fe921fb => 00111111111010010010000111111011
var HIGH_WORD_PIO4 = 0x3fe921fb|0; // asm type annotation

// High word of 2^-27: 0x3e400000 => 00111110010000000000000000000000
var HIGH_WORD_TWO_NEG_27 = 0x3e400000|0; // asm type annotation


// MAIN //

/**
* Computes the cosine of a number.
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
* @returns {number} cosine
*
* @example
* var v = cos( 0.0 );
* // returns 1.0
*
* @example
* var v = cos( 3.141592653589793/4.0 );
* // returns ~0.707
*
* @example
* var v = cos( -3.141592653589793/6.0 );
* // returns ~0.866
*
* @example
* var v = cos( NaN );
* // returns NaN
*/
function cos( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= ABS_MASK;

	// Case: |x| ~< pi/4
	if ( ix <= HIGH_WORD_PIO4 ) {
		// Case: x < 2**-27
		if ( ix < HIGH_WORD_TWO_NEG_27 ) {
			return 1.0;
		}
		return kernelCos( x, 0.0 );
	}
	// Case: cos(Inf or NaN) is NaN */
	if ( ix >= EXPONENT_MASK ) {
		return NaN;
	}
	// Case: Argument reduction needed...
	n = rempio2( x, buffer );
	switch ( n & 3 ) {
	case 0:
		return kernelCos( buffer[ 0 ], buffer[ 1 ] );
	case 1:
		return -kernelSin( buffer[ 0 ], buffer[ 1 ] );
	case 2:
		return -kernelCos( buffer[ 0 ], buffer[ 1 ] );
	default:
		return kernelSin( buffer[ 0 ], buffer[ 1 ] );
	}
}


// EXPORTS //

module.exports = cos;

},{"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/constants/float64/high-word-exponent-mask":50,"@stdlib/math/base/special/kernel-cos":121,"@stdlib/math/base/special/kernel-sin":125,"@stdlib/math/base/special/rempio2":151,"@stdlib/number/float64/base/get-high-word":173}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyrights, licenses, and long comment were part of the original implementation available as part of [Go]{@link https://github.com/golang/go/blob/cb07765045aed5104a3df31507564ac99e6ddce8/src/math/exp.go}, which in turn was based on an implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (c) 2009 The Go Authors. All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are
* met:
*
*    * Redistributions of source code must retain the above copyright
* notice, this list of conditions and the following disclaimer.
*    * Redistributions in binary form must reproduce the above
* copyright notice, this list of conditions and the following disclaimer
* in the documentation and/or other materials provided with the
* distribution.
*    * Neither the name of Google Inc. nor the names of its
* contributors may be used to endorse or promote products derived from
* this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
* A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
* OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* ```
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
	y = 1.0 - ( lo - ( (r*c)/(2.0-c) ) - hi );

	return ldexp( y, k );
}


// EXPORTS //

module.exports = expmulti;

},{"./polyval_p.js":100,"@stdlib/math/base/special/ldexp":127}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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
*
*
* ## Notice
*
* The following copyrights, licenses, and long comment were part of the original implementation available as part of [Go]{@link https://github.com/golang/go/blob/cb07765045aed5104a3df31507564ac99e6ddce8/src/math/exp.go}, which in turn was based on an implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright (c) 2009 The Go Authors. All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are
* met:
*
*    * Redistributions of source code must retain the above copyright
* notice, this list of conditions and the following disclaimer.
*    * Redistributions in binary form must reproduce the above
* copyright notice, this list of conditions and the following disclaimer
* in the documentation and/or other materials provided with the
* distribution.
*    * Neither the name of Google Inc. nor the names of its
* contributors may be used to endorse or promote products derived from
* this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
* A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
* OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* ```
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
var NEARZERO = 1.0 / (1 << 28); // 2^-28
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
	// Reduce and compute `r = hi - lo` for extra precision...
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

},{"./expmulti.js":97,"@stdlib/constants/float64/ninf":58,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/special/trunc":163}],100:[function(require,module,exports){
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
		return 0.16666666666666602;
	}
	return 0.16666666666666602 + (x * (-0.0027777777777015593 + (x * (0.00006613756321437934 + (x * (-0.0000016533902205465252 + (x * 4.1381367970572385e-8))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
* Evaluate the gamma function.
*
* @module @stdlib/math/base/special/gamma
*
* @example
* var gamma = require( '@stdlib/math/base/special/gamma' );
*
* var v = gamma( 4.0 );
* // returns 6.0
*
* v = gamma( -1.5 );
* // returns ~2.363
*
* v = gamma( -0.5 );
* // returns ~-3.545
*
* v = gamma( 0.5 );
* // returns ~1.772
*
* v = gamma( 0.0 );
* // returns Infinity
*
* v = gamma( -0.0 );
* // returns -Infinity
*
* v = gamma( NaN );
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
*
*
* ## Notice
*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var sin = require( '@stdlib/math/base/special/sin' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PI = require( '@stdlib/constants/float64/pi' );
var stirlingApprox = require( './stirling_approximation.js' );
var smallApprox = require( './small_approximation.js' );
var rateval = require( './rational_pq.js' );


// MAIN //

/**
* Evaluates the gamma function.
*
* ## Method
*
* 1.  Arguments \\(|x| \leq 34\\) are reduced by recurrence and the function approximated by a rational function of degree \\(6/7\\) in the interval \\((2,3)\\).
* 2.  Large negative arguments are made positive using a reflection formula.
* 3.  Large arguments are handled by Stirling's formula.
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain    | # trials | peak    | rms     |
*     |:----------:|:---------:|:--------:|:-------:|:-------:|
*     | DEC        | -34,34    | 10000    | 1.3e-16 | 2.5e-17 |
*     | IEEE       | -170,-33  | 20000    | 2.3e-15 | 3.3e-16 |
*     | IEEE       | -33, 33   | 20000    | 9.4e-16 | 2.2e-16 |
*     | IEEE       | 33, 171.6 | 20000    | 2.3e-15 | 3.2e-16 |
*
* -   Error for arguments outside the test range will be larger owing to error amplification by the exponential function.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gamma( 4.0 );
* // returns 6.0
*
* @example
* var v = gamma( -1.5 );
* // returns ~2.363
*
* @example
* var v = gamma( -0.5 );
* // returns ~-3.545
*
* @example
* var v = gamma( 0.5 );
* // returns ~1.772
*
* @example
* var v = gamma( 0.0 );
* // returns Infinity
*
* @example
* var v = gamma( -0.0 );
* // returns -Infinity
*
* @example
* var v = gamma( NaN );
* // returns NaN
*/
function gamma( x ) {
	var sign;
	var q;
	var p;
	var z;
	if (
		(isInteger( x ) && x < 0) ||
		x === NINF ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		if ( isNegativeZero( x ) ) {
			return NINF;
		}
		return PINF;
	}
	if ( x > 171.61447887182298 ) {
		return PINF;
	}
	if ( x < -170.5674972726612 ) {
		return 0.0;
	}
	q = abs( x );
	if ( q > 33.0 ) {
		if ( x >= 0.0 ) {
			return stirlingApprox( x );
		}
		p = floor( q );

		// Check whether `x` is even...
		if ( (p&1) === 0 ) {
			sign = -1.0;
		} else {
			sign = 1.0;
		}
		z = q - p;
		if ( z > 0.5 ) {
			p += 1.0;
			z = q - p;
		}
		z = q * sin( PI * z );
		return sign * PI / ( abs(z)*stirlingApprox(q) );
	}
	// Reduce `x`...
	z = 1.0;
	while ( x >= 3.0 ) {
		x -= 1.0;
		z *= x;
	}
	while ( x < 0.0 ) {
		if ( x > -1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	while ( x < 2.0 ) {
		if ( x < 1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	if ( x === 2.0 ) {
		return z;
	}
	x -= 2.0;
	return z * rateval( x );
}


// EXPORTS //

module.exports = gamma;

},{"./rational_pq.js":106,"./small_approximation.js":107,"./stirling_approximation.js":108,"@stdlib/constants/float64/ninf":58,"@stdlib/constants/float64/pi":60,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-integer":71,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/assert/is-negative-zero":75,"@stdlib/math/base/special/abs":83,"@stdlib/math/base/special/floor":101,"@stdlib/math/base/special/sin":157}],105:[function(require,module,exports){
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
		return 0.08333333333334822;
	}
	return 0.08333333333334822 + (x * (0.0034722222160545866 + (x * (-0.0026813261780578124 + (x * (-0.00022954996161337813 + (x * 0.0007873113957930937))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],106:[function(require,module,exports){
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
* Evaluates a rational function (i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\)).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
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
		return 1.0;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 1.0 + (x * (0.4942148268014971 + (x * (0.20744822764843598 + (x * (0.04763678004571372 + (x * (0.010421379756176158 + (x * (0.0011913514700658638 + (x * (0.00016011952247675185 + (x * 0.0))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.0714304917030273 + (x * (-0.23459179571824335 + (x * (0.035823639860549865 + (x * (0.011813978522206043 + (x * (-0.004456419138517973 + (x * (0.0005396055804933034 + (x * -0.000023158187332412014))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.00016011952247675185 + (x * (0.0011913514700658638 + (x * (0.010421379756176158 + (x * (0.04763678004571372 + (x * (0.20744822764843598 + (x * (0.4942148268014971 + (x * 1.0))))))))))))); // eslint-disable-line max-len
		s2 = -0.000023158187332412014 + (x * (0.0005396055804933034 + (x * (-0.004456419138517973 + (x * (0.011813978522206043 + (x * (0.035823639860549865 + (x * (-0.23459179571824335 + (x * (0.0714304917030273 + (x * 1.0))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original C code, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var EULER = require( '@stdlib/constants/float64/eulergamma' );


// MAIN //

/**
* Evaluates the gamma function using a small-value approximation.
*
* @private
* @param {number} x - input value
* @param {number} z - scale factor
* @returns {number} function value
*/
function gamma( x, z ) {
	return z / ( (1.0+( EULER*x )) * x );
}


// EXPORTS //

module.exports = gamma;

},{"@stdlib/constants/float64/eulergamma":47}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original C code, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var SQRT_TWO_PI = require( '@stdlib/constants/float64/sqrt-two-pi' );
var pow = require( '@stdlib/math/base/special/pow' );
var exp = require( '@stdlib/math/base/special/exp' );
var polyval = require( './polyval_s.js' );


// VARIABLES //

var MAX_STIRLING = 143.01608;


// MAIN //

/**
* Evaluates the gamma function using Stirling's formula. The polynomial is valid for \\(33 \leq x \leq 172\\).
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function gamma( x ) {
	var w;
	var y;
	var v;

	w = 1.0 / x;
	w = 1.0 + ( w * polyval( w ) );
	y = exp( x );

	// Check `x` to avoid `pow()` overflow...
	if ( x > MAX_STIRLING ) {
		v = pow( x, ( 0.5*x ) - 0.25 );
		y = v * (v/y);
	} else {
		y = pow( x, x-0.5 ) / y;
	}
	return SQRT_TWO_PI * y * w;
}


// EXPORTS //

module.exports = gamma;

},{"./polyval_s.js":105,"@stdlib/constants/float64/sqrt-two-pi":63,"@stdlib/math/base/special/exp":98,"@stdlib/math/base/special/pow":140}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the natural logarithm of the gamma function.
*
* @module @stdlib/math/base/special/gammaln
*
* @example
* var gammaln = require( '@stdlib/math/base/special/gammaln' );
*
* var v = gammaln( 1.0 );
* // returns 0.0
*
* v = gammaln( 2.0 );
* // returns 0.0
*
* v = gammaln( 4.0 );
* // returns ~1.792
*
* v = gammaln( -0.5 );
* // returns ~1.266
*
* v = gammaln( 0.5 );
* // returns ~0.572
*
* v = gammaln( 0.0 );
* // returns Infinity
*
* v = gammaln( NaN );
* // returns NaN
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
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/12.2.0/lib/msun/src/e_lgamma_r.c}. The implementation follows the original, but has been modified for JavaScript.
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
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var PI = require( '@stdlib/constants/float64/pi' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var polyvalA1 = require( './polyval_a1.js' );
var polyvalA2 = require( './polyval_a2.js' );
var polyvalR = require( './polyval_r.js' );
var polyvalS = require( './polyval_s.js' );
var polyvalT1 = require( './polyval_t1.js' );
var polyvalT2 = require( './polyval_t2.js' );
var polyvalT3 = require( './polyval_t3.js' );
var polyvalU = require( './polyval_u.js' );
var polyvalV = require( './polyval_v.js' );
var polyvalW = require( './polyval_w.js' );


// VARIABLES //

var A1C = 7.72156649015328655494e-02; // 0x3FB3C467E37DB0C8
var A2C = 3.22467033424113591611e-01; // 0x3FD4A34CC4A60FAD
var RC = 1.0;
var SC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var T1C = 4.83836122723810047042e-01; // 0x3FDEF72BC8EE38A2
var T2C = -1.47587722994593911752e-01; // 0xBFC2E4278DC6C509
var T3C = 6.46249402391333854778e-02; // 0x3FB08B4294D5419B
var UC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var VC = 1.0;
var WC = 4.18938533204672725052e-01; // 0x3FDACFE390C97D69
var YMIN = 1.461632144968362245;
var TWO52 = 4503599627370496; // 2**52
var TWO56 = 72057594037927936; // 2**56
var TINY = 1.3877787807814457e-17;
var TC = 1.46163214496836224576e+00; // 0x3FF762D86356BE3F
var TF = -1.21486290535849611461e-01; // 0xBFBF19B9BCC38A42
var TT = -3.63867699703950536541e-18; // 0xBC50C7CAA48A971F => TT = -(tail of TF)


// MAIN //

/**
* Evaluates the natural logarithm of the gamma function.
*
* ## Method
*
* 1.  Argument reduction for \\(0 < x \leq 8\\). Since \\(\Gamma(1+s) = s \Gamma(s)\\), for \\(x \in \[0,8]\\), we may reduce \\(x\\) to a number in \\(\[1.5,2.5]\\) by
*
*     ```tex
*     \operatorname{lgamma}(1+s) = \ln(s) + \operatorname{lgamma}(s)
*     ```
*
*     For example,
*
*     ```tex
*     \begin{align*}
*     \operatorname{lgamma}(7.3) &= \ln(6.3) + \operatorname{lgamma}(6.3) \\
*     &= \ln(6.3 \cdot 5.3) + \operatorname{lgamma}(5.3) \\
*     &= \ln(6.3 \cdot 5.3 \cdot 4.3 \cdot 3.3 \cdot2.3) + \operatorname{lgamma}(2.3)
*     \end{align*}
*     ```
*
* 2.  Compute a polynomial approximation of \\(\mathrm{lgamma}\\) around its minimum (\\(\mathrm{ymin} = 1.461632144968362245\\)) to maintain monotonicity. On the interval \\(\[\mathrm{ymin} - 0.23, \mathrm{ymin} + 0.27]\\) (i.e., \\(\[1.23164,1.73163]\\)), we let \\(z = x - \mathrm{ymin}\\) and use
*
*     ```tex
*     \operatorname{lgamma}(x) = -1.214862905358496078218 + z^2 \cdot \operatorname{poly}(z)
*     ```
*
*     where \\(\operatorname{poly}(z)\\) is a \\(14\\) degree polynomial.
*
* 3.  Compute a rational approximation in the primary interval \\(\[2,3]\\). Let \\( s = x - 2.0 \\). We can thus use the approximation
*
*     ```tex
*     \operatorname{lgamma}(x) = \frac{s}{2} + s\frac{\operatorname{P}(s)}{\operatorname{Q}(s)}
*     ```
*
*     with accuracy
*
*     ```tex
*     \biggl|\frac{\mathrm{P}}{\mathrm{Q}} - \biggr(\operatorname{lgamma}(x)-\frac{s}{2}\biggl)\biggl| < 2^{-61.71}
*     ```
*
*     The algorithms are based on the observation
*
*     ```tex
*     \operatorname{lgamma}(2+s) = s(1 - \gamma) + \frac{\zeta(2) - 1}{2} s^2 - \frac{\zeta(3) - 1}{3} s^3 + \ldots
*     ```
*
*     where \\(\zeta\\) is the zeta function and \\(\gamma = 0.5772156649...\\) is the Euler-Mascheroni constant, which is very close to \\(0.5\\).
*
* 4.  For \\(x \geq 8\\),
*
*     ```tex
*     \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr) \ln(x) - x + \frac{\ln(2\pi)}{2} + \frac{1}{12x} - \frac{1}{360x^3} + \ldots
*     ```
*
*     which can be expressed
*
*     ```tex
*     \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)-\frac{\ln(2\pi)-1}{2} + \ldots
*     ```
*
*     Let \\(z = \frac{1}{x}\\). We can then use the approximation
*
*     ```tex
*     f(z) = \operatorname{lgamma}(x) - \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)
*     ```
*
*     by
*
*     ```tex
*     w = w_0 + w_1 z + w_2 z^3 + w_3 z^5 + \ldots + w_6 z^{11}
*     ```
*
*     where
*
*     ```tex
*     |w - f(z)| < 2^{-58.74}
*     ```
*
* 5.  For negative \\(x\\), since
*
*     ```tex
*     -x \Gamma(-x) \Gamma(x) = \frac{\pi}{\sin(\pi x)}
*     ```
*
*     where \\(\Gamma\\) is the gamma function, we have
*
*     ```tex
*     \Gamma(x) = \frac{\pi}{\sin(\pi x)(-x)\Gamma(-x)}
*     ```
*
*     Since \\(\Gamma(-x)\\) is positive,
*
*     ```tex
*     \operatorname{sign}(\Gamma(x)) = \operatorname{sign}(\sin(\pi x))
*     ```
*
*     for \\(x < 0\\). Hence, for \\(x < 0\\),
*
*     ```tex
*     \mathrm{signgam} = \operatorname{sign}(\sin(\pi x))
*     ```
*
*     and
*
*     ```tex
*     \begin{align*}
*     \operatorname{lgamma}(x) &= \ln(|\Gamma(x)|) \\
*     &= \ln\biggl(\frac{\pi}{|x \sin(\pi x)|}\biggr) - \operatorname{lgamma}(-x)
*     \end{align*}
*     ```
*
*     <!-- <note> -->
*
*     Note that one should avoid computing \\(\pi (-x)\\) directly in the computation of \\(\sin(\pi (-x))\\).
*
*     <!-- </note> -->
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{lgamma}(2+s) &\approx s (1-\gamma) & \mathrm{for\ tiny\ s} \\
* \operatorname{lgamma}(x) &\approx -\ln(x) & \mathrm{for\ tiny\ x} \\
* \operatorname{lgamma}(1) &= 0 & \\
* \operatorname{lgamma}(2) &= 0 & \\
* \operatorname{lgamma}(0) &= \infty & \\
* \operatorname{lgamma}(\infty) &= \infty & \\
* \operatorname{lgamma}(-\mathrm{integer}) &= \pm \infty
* \end{align*}
* ```
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gammaln( 1.0 );
* // returns 0.0
*
* @example
* var v = gammaln( 2.0 );
* // returns 0.0
*
* @example
* var v = gammaln( 4.0 );
* // returns ~1.792
*
* @example
* var v = gammaln( -0.5 );
* // returns ~1.266
*
* @example
* var v = gammaln( 0.5 );
* // returns ~0.572
*
* @example
* var v = gammaln( 0.0 );
* // returns Infinity
*
* @example
* var v = gammaln( NaN );
* // returns NaN
*/
function gammaln( x ) {
	var isNegative;
	var nadj;
	var flg;
	var p3;
	var p2;
	var p1;
	var p;
	var q;
	var t;
	var w;
	var y;
	var z;
	var r;

	// Special cases: NaN, +-infinity
	if ( isnan( x ) || isInfinite( x ) ) {
		return x;
	}
	// Special case: 0
	if ( x === 0.0 ) {
		return PINF;
	}
	if ( x < 0.0 ) {
		isNegative = true;
		x = -x;
	} else {
		isNegative = false;
	}
	// If |x| < 2**-56, return -ln(|x|)
	if ( x < TINY ) {
		return -ln( x );
	}
	if ( isNegative ) {
		// If |x| >= 2**52, must be -integer
		if ( x >= TWO52 ) {
			return PINF;
		}
		t = sinpi( x );
		if ( t === 0.0 ) {
			return PINF;
		}
		nadj = ln( PI / abs( t*x ) );
	}
	// If x equals 1 or 2, return 0
	if ( x === 1.0 || x === 2.0 ) {
		return 0.0;
	}
	// If x < 2, use lgamma(x) = lgamma(x+1) - log(x)
	if ( x < 2.0 ) {
		if ( x <= 0.9 ) {
			r = -ln( x );

			// 0.7316 <= x <=  0.9
			if ( x >= ( YMIN - 1.0 + 0.27 ) ) {
				y = 1.0 - x;
				flg = 0;
			}
			// 0.2316 <= x < 0.7316
			else if ( x >= (YMIN - 1.0 - 0.27) ) {
				y = x - (TC - 1.0);
				flg = 1;
			}
			// 0 < x < 0.2316
			else {
				y = x;
				flg = 2;
			}
		} else {
			r = 0.0;

			// 1.7316 <= x < 2
			if ( x >= (YMIN + 0.27) ) {
				y = 2.0 - x;
				flg = 0;
			}
			// 1.2316 <= x < 1.7316
			else if ( x >= (YMIN - 0.27) ) {
				y = x - TC;
				flg = 1;
			}
			// 0.9 < x < 1.2316
			else {
				y = x - 1.0;
				flg = 2;
			}
		}
		switch ( flg ) { // eslint-disable-line default-case
		case 0:
			z = y * y;
			p1 = A1C + (z*polyvalA1( z ));
			p2 = z * (A2C + (z*polyvalA2( z )));
			p = (y*p1) + p2;
			r += ( p - (0.5*y) );
			break;
		case 1:
			z = y * y;
			w = z * y;
			p1 = T1C + (w*polyvalT1( w ));
			p2 = T2C + (w*polyvalT2( w ));
			p3 = T3C + (w*polyvalT3( w ));
			p = (z*p1) - (TT - (w*(p2+(y*p3))));
			r += ( TF + p );
			break;
		case 2:
			p1 = y * (UC + (y*polyvalU( y )));
			p2 = VC + (y*polyvalV( y ));
			r += (-0.5*y) + (p1/p2);
			break;
		}
	}
	// 2 <= x < 8
	else if ( x < 8.0 ) {
		flg = trunc( x );
		y = x - flg;
		p = y * (SC + (y*polyvalS( y )));
		q = RC + (y*polyvalR( y ));
		r = (0.5*y) + (p/q);
		z = 1.0; // gammaln(1+s) = ln(s) + gammaln(s)
		switch ( flg ) { // eslint-disable-line default-case
		case 7:
			z *= y + 6.0;

			/* Falls through */
		case 6:
			z *= y + 5.0;

			/* Falls through */
		case 5:
			z *= y + 4.0;

			/* Falls through */
		case 4:
			z *= y + 3.0;

			/* Falls through */
		case 3:
			z *= y + 2.0;
			r += ln( z );
		}
	}
	// 8 <= x < 2**56
	else if ( x < TWO56 ) {
		t = ln( x );
		z = 1.0 / x;
		y = z * z;
		w = WC + (z*polyvalW( y ));
		r = ((x-0.5)*(t-1.0)) + w;
	}
	// 2**56 <= x <= Inf
	else {
		r = x * ( ln(x)-1.0 );
	}
	if ( isNegative ) {
		r = nadj - r;
	}
	return r;
}


// EXPORTS //

module.exports = gammaln;

},{"./polyval_a1.js":111,"./polyval_a2.js":112,"./polyval_r.js":113,"./polyval_s.js":114,"./polyval_t1.js":115,"./polyval_t2.js":116,"./polyval_t3.js":117,"./polyval_u.js":118,"./polyval_v.js":119,"./polyval_w.js":120,"@stdlib/constants/float64/pi":60,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-infinite":69,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/special/abs":83,"@stdlib/math/base/special/ln":129,"@stdlib/math/base/special/sinpi":159,"@stdlib/math/base/special/trunc":163}],111:[function(require,module,exports){
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
		return 0.06735230105312927;
	}
	return 0.06735230105312927 + (x * (0.007385550860814029 + (x * (0.0011927076318336207 + (x * (0.00022086279071390839 + (x * 0.000025214456545125733))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],112:[function(require,module,exports){
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
		return 0.020580808432516733;
	}
	return 0.020580808432516733 + (x * (0.0028905138367341563 + (x * (0.0005100697921535113 + (x * (0.00010801156724758394 + (x * 0.000044864094961891516))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],113:[function(require,module,exports){
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
		return 1.3920053346762105;
	}
	return 1.3920053346762105 + (x * (0.7219355475671381 + (x * (0.17193386563280308 + (x * (0.01864591917156529 + (x * (0.0007779424963818936 + (x * 0.000007326684307446256))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],114:[function(require,module,exports){
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
		return 0.21498241596060885;
	}
	return 0.21498241596060885 + (x * (0.325778796408931 + (x * (0.14635047265246445 + (x * (0.02664227030336386 + (x * (0.0018402845140733772 + (x * 0.00003194753265841009))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],115:[function(require,module,exports){
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
		return -0.032788541075985965;
	}
	return -0.032788541075985965 + (x * (0.006100538702462913 + (x * (-0.0014034646998923284 + (x * 0.00031563207090362595))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],116:[function(require,module,exports){
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
		return 0.01797067508118204;
	}
	return 0.01797067508118204 + (x * (-0.0036845201678113826 + (x * (0.000881081882437654 + (x * -0.00031275416837512086))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],117:[function(require,module,exports){
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
		return -0.010314224129834144;
	}
	return -0.010314224129834144 + (x * (0.0022596478090061247 + (x * (-0.0005385953053567405 + (x * 0.0003355291926355191))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],118:[function(require,module,exports){
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
		return 0.6328270640250934;
	}
	return 0.6328270640250934 + (x * (1.4549225013723477 + (x * (0.9777175279633727 + (x * (0.22896372806469245 + (x * 0.013381091853678766))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],119:[function(require,module,exports){
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
		return 2.4559779371304113;
	}
	return 2.4559779371304113 + (x * (2.128489763798934 + (x * (0.7692851504566728 + (x * (0.10422264559336913 + (x * 0.003217092422824239))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],120:[function(require,module,exports){
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
		return 0.08333333333333297;
	}
	return 0.08333333333333297 + (x * (-0.0027777777772877554 + (x * (0.0007936505586430196 + (x * (-0.00059518755745034 + (x * (0.0008363399189962821 + (x * -0.0016309293409657527))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":122}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_c13.js":123,"./polyval_c46.js":124}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{"./main.js":126}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":128}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":48,"@stdlib/constants/float64/max-base2-exponent":56,"@stdlib/constants/float64/max-base2-exponent-subnormal":55,"@stdlib/constants/float64/min-base2-exponent-subnormal":57,"@stdlib/constants/float64/ninf":58,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-infinite":69,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/special/copysign":93,"@stdlib/number/float64/base/exponent":167,"@stdlib/number/float64/base/from-words":169,"@stdlib/number/float64/base/normalize":179,"@stdlib/number/float64/base/to-words":188}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the natural logarithm of a double-precision floating-point number.
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":130}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* Evaluates the natural logarithm of a double-precision floating-point number.
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

},{"./polyval_p.js":131,"./polyval_q.js":132,"@stdlib/constants/float64/exponent-bias":48,"@stdlib/constants/float64/ninf":58,"@stdlib/math/base/assert/is-nan":73,"@stdlib/number/float64/base/get-high-word":173,"@stdlib/number/float64/base/set-high-word":182}],131:[function(require,module,exports){
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
		return 0.3999999999940942;
	}
	return 0.3999999999940942 + (x * (0.22222198432149784 + (x * 0.15313837699209373))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],132:[function(require,module,exports){
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
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.2857142874366239 + (x * (0.1818357216161805 + (x * 0.14798198605116586))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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

var log1p = require( './main.js' );


// EXPORTS //

module.exports = log1p;

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
* ## Special Cases
*
* -   \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* -   \\(\operatorname{log1p}(+\infty) = +\infty\\)
* -   \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* -   \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
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

},{"./polyval_lp.js":135,"@stdlib/constants/float64/exponent-bias":48,"@stdlib/constants/float64/ninf":58,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-nan":73,"@stdlib/number/float64/base/get-high-word":173,"@stdlib/number/float64/base/set-high-word":182}],135:[function(require,module,exports){
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
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.3999999999940942 + (x * (0.2857142874366239 + (x * (0.22222198432149784 + (x * (0.1818357216161805 + (x * (0.15313837699209373 + (x * 0.14798198605116586))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* v = max( 3.14, NaN );
* // returns NaN
*
* v = max( +0.0, -0.0 );
* // returns +0.0
*/

// MODULES //

var max = require( './main.js' );


// EXPORTS //

module.exports = max;

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

var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Returns the maximum value.
*
* @param {number} x - first number
* @param {number} y - second number
* @returns {number} maximum value
*
* @example
* var v = max( 3.14, 4.2 );
* // returns 4.2
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


// EXPORTS //

module.exports = max;

},{"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/assert/is-positive-zero":81}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* v = min( 3.14, NaN );
* // returns NaN
*
* v = min( +0.0, -0.0 );
* // returns -0.0
*/

// MODULES //

var min = require( './main.js' );


// EXPORTS //

module.exports = min;

},{"./main.js":139}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Returns the minimum value.
*
* @param {number} x - first number
* @param {number} y - second number
* @returns {number} minimum value
*
* @example
* var v = min( 3.14, 4.2 );
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


// EXPORTS //

module.exports = min;

},{"@stdlib/constants/float64/ninf":58,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/assert/is-negative-zero":75}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":143}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":144,"@stdlib/constants/float64/exponent-bias":48,"@stdlib/constants/float64/num-high-word-significand-bits":59,"@stdlib/number/float64/base/get-high-word":173,"@stdlib/number/float64/base/set-high-word":182,"@stdlib/number/float64/base/set-low-word":184}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":146,"@stdlib/number/float64/base/set-low-word":184}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./log2ax.js":141,"./logx.js":142,"./pow2.js":147,"./x_is_zero.js":148,"./y_is_huge.js":149,"./y_is_infinite.js":150,"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/constants/float64/ninf":58,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-infinite":69,"@stdlib/math/base/assert/is-integer":71,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/assert/is-odd":79,"@stdlib/math/base/special/abs":83,"@stdlib/math/base/special/sqrt":161,"@stdlib/number/float64/base/set-low-word":184,"@stdlib/number/float64/base/to-words":188,"@stdlib/number/uint32/base/to-int32":191}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
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

},{"./polyval_p.js":145,"@stdlib/constants/float64/exponent-bias":48,"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/constants/float64/high-word-significand-mask":52,"@stdlib/constants/float64/ln-two":54,"@stdlib/constants/float64/num-high-word-significand-bits":59,"@stdlib/math/base/special/ldexp":127,"@stdlib/number/float64/base/get-high-word":173,"@stdlib/number/float64/base/set-high-word":182,"@stdlib/number/float64/base/set-low-word":184,"@stdlib/number/uint32/base/to-int32":191}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":58,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-odd":79,"@stdlib/math/base/special/copysign":93}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/number/float64/base/get-high-word":173}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/special/abs":83}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":153}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/array/base/zeros":3,"@stdlib/math/base/special/floor":101,"@stdlib/math/base/special/ldexp":127}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./kernel_rempio2.js":152,"./rempio2_medium.js":154,"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/constants/float64/high-word-exponent-mask":50,"@stdlib/constants/float64/high-word-significand-mask":52,"@stdlib/number/float64/base/from-words":169,"@stdlib/number/float64/base/get-high-word":173,"@stdlib/number/float64/base/get-low-word":175}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/math/base/special/round":155,"@stdlib/number/float64/base/get-high-word":173}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":158}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/high-word-abs-mask":49,"@stdlib/constants/float64/high-word-exponent-mask":50,"@stdlib/math/base/special/kernel-cos":121,"@stdlib/math/base/special/kernel-sin":125,"@stdlib/math/base/special/rempio2":151,"@stdlib/number/float64/base/get-high-word":173}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the value of `sin(πx)`.
*
* @module @stdlib/math/base/special/sinpi
*
* @example
* var sinpi = require( '@stdlib/math/base/special/sinpi' );
*
* var y = sinpi( 0.0 );
* // returns 0.0
*
* y = sinpi( 0.5 );
* // returns 1.0
*
* y = sinpi( 0.9 );
* // returns ~0.309
*
* y = sinpi( NaN );
* // returns NaN
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

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var cos = require( '@stdlib/math/base/special/cos' );
var sin = require( '@stdlib/math/base/special/sin' );
var abs = require( '@stdlib/math/base/special/abs' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Computes the value of `sin(πx)`.
*
* ## Notes
*
* -   `sin(-x) = -sin(x)`
* -   `sin(+n) = +0`, where `n` is a positive integer
* -   `sin(-n) = -sin(+n) = -0`, where `n` is a positive integer
* -   `cos(-x) = cos(x)`
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = sinpi( 0.0 );
* // returns 0.0
*
* @example
* var y = sinpi( 0.5 );
* // returns 1.0
*
* @example
* var y = sinpi( 0.9 );
* // returns ~0.309
*
* @example
* var y = sinpi( NaN );
* // returns NaN
*/
function sinpi( x ) {
	var ar;
	var r;
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInfinite( x ) ) {
		return NaN;
	}
	// Argument reduction (reduce to [0,2))...
	r = x % 2.0; // sign preserving
	ar = abs( r );

	// If `x` is an integer, the mod is an integer...
	if ( ar === 0.0 || ar === 1.0 ) {
		return copysign( 0.0, r );
	}
	if ( ar < 0.25 ) {
		return sin( PI*r );
	}
	// In each of the following, we further reduce to [-π/4,π/4)...
	if ( ar < 0.75 ) {
		ar = 0.5 - ar;
		return copysign( cos( PI*ar ), r );
	}
	if ( ar < 1.25 ) {
		r = copysign( 1.0, r ) - r;
		return sin( PI*r );
	}
	if ( ar < 1.75 ) {
		ar -= 1.5;
		return -copysign( cos( PI*ar ), r );
	}
	r -= copysign( 2.0, r );
	return sin( PI*r );
}


// EXPORTS //

module.exports = sinpi;

},{"@stdlib/constants/float64/pi":60,"@stdlib/math/base/assert/is-infinite":69,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/special/abs":83,"@stdlib/math/base/special/copysign":93,"@stdlib/math/base/special/cos":95,"@stdlib/math/base/special/sin":157}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":91,"@stdlib/math/base/special/floor":101}],165:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":166}],166:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],167:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":168}],168:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":48,"@stdlib/constants/float64/high-word-exponent-mask":50,"@stdlib/number/float64/base/get-high-word":173}],169:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":171}],170:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":170,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],173:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":174}],174:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":172,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],175:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":177}],176:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],177:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":176,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],178:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":62,"@stdlib/math/base/assert/is-infinite":69,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/special/abs":83}],179:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":178,"./main.js":180,"@stdlib/utils/define-nonenumerable-read-only-property":223}],180:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":178}],181:[function(require,module,exports){
arguments[4][172][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":172}],182:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":183}],183:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":181,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],184:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":186}],185:[function(require,module,exports){
arguments[4][176][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":176}],186:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":185,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],187:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":189,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],188:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":187,"./main.js":190,"@stdlib/utils/define-nonenumerable-read-only-property":223}],189:[function(require,module,exports){
arguments[4][170][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":170}],190:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":187}],191:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":192}],192:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],193:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var binomcoefln = require( '@stdlib/math/base/special/binomcoefln' );
var degenerate = require( '@stdlib/stats/base/dists/degenerate/logpmf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability mass function (PMF) for a binomial distribution with number of trials `n` and success probability `p`.
*
* @param {NonNegativeInteger} n - number of trials
* @param {Probability} p - success probability
* @returns {Function} logPMF
*
* @example
* var logpmf = factory( 10, 0.5 );
* var y = logpmf( 3.0 );
* // returns ~-2.144
*
* y = logpmf( 5.0 );
* // returns ~-1.402
*/
function factory( n, p ) {
	if (
		isnan( n ) ||
		isnan( p ) ||
		!isNonNegativeInteger( n ) ||
		n === PINF ||
		p < 0.0 ||
		p > 1.0
	) {
		return constantFunction( NaN );
	}
	if ( p === 0.0 || n === 0 ) {
		return degenerate( 0.0 );
	}
	if ( p === 1.0 ) {
		return degenerate( n );
	}
	return logpmf;

	/**
	* Evaluates the natural logarithm of the probability mass function (PMF) for a binomial distribution.
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
		var out;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( isNonNegativeInteger( x ) ) {
			if ( x > n ) {
				return NINF;
			}
			out = binomcoefln( n, x );
			out += (x * ln( p )) + ((n - x) * log1p( -p ));
			return out;
		}
		return NINF;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":58,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/assert/is-nonnegative-integer":77,"@stdlib/math/base/special/binomcoefln":89,"@stdlib/math/base/special/ln":129,"@stdlib/math/base/special/log1p":133,"@stdlib/stats/base/dists/degenerate/logpmf":204,"@stdlib/utils/constant-function":221}],194:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Natural logarithm of the probability mass function (PMF) for a binomial distribution.
*
* @module @stdlib/stats/base/dists/binomial/logpmf
*
* @example
* var logpmf = require( '@stdlib/stats/base/dists/binomial/logpmf' );
*
* var y = logpmf( 3.0, 20, 0.2 );
* // returns ~-1.583
*
* y = logpmf( 21.0, 20, 0.2 );
* // returns -Infinity
*
* y = logpmf( 5.0, 10, 0.4 );
* // returns ~-1.606
*
* y = logpmf( 0.0, 10, 0.4 );
* // returns ~-5.108
*
* @example
* var factory = require( '@stdlib/stats/base/dists/binomial/logpmf' ).factory;
*
* var logpmf = factory( 10, 0.5 );
*
* var y = logpmf( 3.0 );
* // returns ~-2.146
*
* y = logpmf( 5.0 );
* // returns ~-1.402
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":193,"./main.js":195,"@stdlib/utils/define-nonenumerable-read-only-property":223}],195:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var binomcoefln = require( '@stdlib/math/base/special/binomcoefln' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability mass function (PMF) for a binomial distribution with number of trials `n` and success probability `p` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeInteger} n - number of trials
* @param {Probability} p - success probability
* @returns {number} evaluated logPMF
*
* @example
* var y = logpmf( 3.0, 20, 0.2 );
* // returns ~-1.583
*
* @example
* var y = logpmf( 21.0, 20, 0.2 );
* // returns -Infinity
*
* @example
* var y = logpmf( 5.0, 10, 0.4 );
* // returns ~-1.606
*
* @example
* var y = logpmf( 0.0, 10, 0.4 );
* // returns ~-5.108
*
* @example
* var y = logpmf( NaN, 20, 0.5 );
* // returns NaN
*
* @example
* var y = logpmf( 0.0, NaN, 0.5 );
* // returns NaN
*
* @example
* var y = logpmf( 0.0, 20, NaN );
* // returns NaN
*
* @example
* var y = logpmf( 2.0, 1.5, 0.5 );
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
*/
function logpmf( x, n, p ) {
	var out;
	if (
		isnan( x ) ||
		isnan( n ) ||
		isnan( p ) ||
		p < 0.0 ||
		p > 1.0 ||
		!isNonNegativeInteger( n ) ||
		n === PINF
	) {
		return NaN;
	}
	if ( isNonNegativeInteger( x ) ) {
		if ( x > n ) {
			return NINF;
		}
		if ( p === 0.0 ) {
			return ( x === 0 ) ? 0.0 : NINF;
		}
		if ( p === 1.0 ) {
			return ( x === n ) ? 0.0 : NINF;
		}
		out = binomcoefln( n, x );
		out += (x * ln( p )) + (( n - x ) * log1p( -p ));
		return out;
	}
	return NINF;
}


// EXPORTS //

module.exports = logpmf;

},{"@stdlib/constants/float64/ninf":58,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/assert/is-nonnegative-integer":77,"@stdlib/math/base/special/binomcoefln":89,"@stdlib/math/base/special/ln":129,"@stdlib/math/base/special/log1p":133}],196:[function(require,module,exports){
module.exports={"expected":[-3.87674553095907,-3.618894635684316,-132.82589024687317,-101.33021717721265,-2.1862061606905465,-8.817476712569103,-223.37760506976647,-1.694784434099867,-74.6948755104548,-2.102472337316293,-8.441073183289308,-89.81765460569186,-129.73992061331,-3.6345366080077355,-1.8891200239259156,-86.88381940357735,-10.796102455614697,-1.9016027484193003,-28.37449007162588,-41.586991537127446,-50.19210496413881,-2.1777217652330636,-19.74472685409614,-3.9280723659542307,-61.23930097313676,-93.90208858436566,-4.23023684120146,-2.7606465019202697,-1.7797112736203862,-4.130284145891068,-4.841477032263067,-2.0317767944234175,-21.892038686689812,-21.628237198298898,-103.2125318574607,-46.91821112247224,-118.91475654801383,-85.98874992851442,-126.84408486272116,-39.72496633504761,-3.8913946569160967,-1.4866476617091435,-14.752226902088225,-153.54891168032466,-35.320294274401974,-12.929668381320909,-10.71458711565169,-2.8710140304579177,-36.55596999780666,-200.6489168565992,-1.4745720983185495,-5.863087594231756,-35.0636540690385,-57.747497497363014,-2.1929795758351154,-1.8629369773974411,-27.514280902190983,-1.7588077529855253,-3.452758858527279,-122.67863551176066,-21.398836949068613,-42.33508965665776,-85.83837221799462,-2.5602722263080153,-1.7980042141586454,-94.48761412190238,-99.97636693934612,-2.503274768698966,-2.760041776265468,-61.27192757877761,-6.934850272406711,-244.04201605538947,-19.7968348296424,-70.71977622380989,-33.91257887305123,-22.48854960065085,-30.61118912568941,-2.4203011484919816,-1.7435347861852135,-3.344881405293809,-45.40441886067333,-4.195191898809617,-30.39240164704062,-74.28042126881971,-33.73445554984194,-4.803043115361719,-4.985813450941455,-0.12117972350811952,-16.897254011055242,-5.286727237866818,-15.727064181610618,-6.56696963450393,-32.01406834834441,-11.14251249994182,-3.136507495916936,-67.77695951371119,-2.1403751196537923,-4.032699484955737,-101.1015525771096,-110.01716671306656,-1.6097782401554785,-6.376819612502864,-1.4486345253961486,-14.9598663924779,-8.979689632733812,-16.076020127302368,-8.00249832347042,-24.724908760952385,-23.269301580674117,-22.635285796531633,-21.035209384822146,-40.08786491140616,-24.348654402421857,-5.672043452486531,-106.34693817854925,-9.018641896370456,-4.393997334764215,-2.2750280476281013,-70.42624011184343,-23.59052378116742,-2.8951315023011253,-5.7768525442931296,-89.85335545436921,-27.062362268919824,-37.768530000997956,-125.28806280639746,-7.376886037429955,-43.78307598248812,-2.2049939634509563,-7.759542770232079,-0.912901619628793,-2.7433567169530457,-14.56250088843885,-12.575762235584765,-53.741464029042426,-28.288268542529156,-172.66905867527583,-87.86097708813503,-5.54506118331784,-148.99755771227078,-42.81832700060629,-0.2574824981724862,-135.39463329762043,-82.22153615490615,-89.83887284480787,-78.59904636444915,-40.211730989692555,-35.83513720071024,-4.672862530565376,-16.2086117114248,-3.3940295935420863,-32.41955254253926,-5.138208260704411,-1.3235657176634494,-11.496866447276574,-31.973035714309628,-63.72594762489345,-9.931036808293014,-59.23421390860919,-43.13191593336652,-25.227261596705397,-3.557139112052143,-4.932686905311786,-27.84790325018796,-3.9159978827265705,-12.499402678360104,-9.544380488995984,-3.847464424539706,-3.0485312291674136,-8.106162781161533,-9.41092113636869,-3.373282431703209,0.0,-11.636488751238423,-1.3490015563694486,-2.7852944866391827,-3.6001404865703193,-5.940327224926105,-24.22157240872704,-40.019164831281834,-98.17304897433998,-70.53430381318822,-5.238513931311861,-63.365638471839176,-1.4872685921291857,-5.660795549095026,-52.593893968287375,-4.792695685482904,-74.805169093717,-166.55122600916064,-4.778066926199845,-4.060300259212545,-1.692647806599078,-37.010093522494195,-32.28651424403515,-43.02161318693382,-70.58078272461562,-109.25607644556351,-2.3387666280978943,-5.013499792144201,-7.5702922845063085,-101.74354295573943,-310.1261403525036,0.0,-1.074029418461689,-11.449042204715997,-11.12108258414516,-1.413227695475913,-2.1161814200042905,-263.91882018428413,-1.9141825412400284,0.0,-26.089134574917697,-20.622353913653026,-57.41215902152576,-2.4487174068617463,-112.5760180068442,-18.078042633132963,-4.203772144212552,-3.4062705071812314,-83.81262559880133,-7.2287420398247155,-9.110693951919425,-20.996401134171656,-160.37430672656933,-24.338698776897076,-44.374832974555915,-47.28384666554638,-27.053041101386224,-19.81800381210043,-7.3515712879376025,-172.05752674398437,-40.27449360786987,-65.36800355815092,-13.808554435031414,-17.90888344890986,-2.525522568229395,-76.34197381552114,-8.493364917826426,-1.4217868954900685,-130.28133612720836,-67.85905625304481,-1.924739470366047,-0.6498959102125563,-215.5043636417002,-14.17011767679899,-2.0055816310827845,-12.754538518368006,-33.90836502750598,-66.19452234907436,-114.85771573746855,-11.572048971769712,-90.75861196916804,-29.023045376522905,-12.285513525079068,-43.932535423708046,-15.21949286902138,-4.286254225105271,-31.18669661193012,-34.23388337633014,-46.29352459025559,-82.4329037268268,-75.4262823145494,-144.4253232924439,-11.164839456851473,-95.74299980228542,-3.102284718465522,-4.722534598336262,-8.136959691629412,-3.3581294302102007,-11.338153643821414,-64.08548904232455,-1.7542053786484884,-33.75003363963663,-7.8757214736505405,-107.15192795179281,-63.29693122900496,-27.549917998194843,-245.33976284920098,-28.697583974303534,-48.454754499713054,-9.861089345516552,-9.777998359375323,-4.282119805794313,-122.53037966526585,-31.688600098799753,-5.565025576393053,-3.184347412867239,-13.184737272007883,-4.516059442838727,-3.0205313719244318,-4.013725198262412,-85.50192654197261,-44.3794303089619,-2.4162216382380834,-16.903008021745936,-3.502089294132784,-215.01813963497122,-7.2679124313573045,-11.16923588443074,-37.952268862998096,-12.021475647979218,-56.13357158678947,-86.2186987251202,-14.213324064339513,-1.6379911361769575,-75.88013317621191,-14.219820254571372,-2.743607421477086,-52.60744233894972,-79.77411892488648,-173.01359570105336,-2.6390608153284743,-32.985202391825375,-2.61592144628049,-46.57552340823102,-1.8259089958069152,-107.27152785187398,-3.744732286163006,-26.508116780817033,-1.5070064134110395,-106.54160488416483,-222.05676630625663,-6.514110486602403,-137.72040019073197,-63.02040927564328,-26.76888653981666,-29.511931290348713,-369.03755262655545,-52.5980804436962,-6.221832713996184,-21.796300142844814,-152.24741494697065,-55.99898060357587,-6.617638960132102,-32.17488015903973,-273.816313978415,-2.294925296559448,-4.143617513276951,-6.016431443979686,-11.043695539033255,-5.269198386691109,-7.200612412568642,-2.004965309014657,-0.2622214761394469,-8.667621401401778,-4.137697000874993,-28.39621440286531,-0.9269148950686444,-67.01961530147625,-8.884445038138947,-109.06442313190914,-5.101247202589537,-231.66295897701943,-86.15380204087765,-30.089708872454512,-2.6026293144886727,-1.9677503449834186,-6.186990992314909,-76.2356891622858,-1.7814198370488685,-38.350869990595214,-27.014716033476407,-5.727148810517643,-53.08429140819949,-6.201903453795504,-2.153110447695739,-1.7037733792449434,-72.95203477908646,-5.0830682838029455,-319.3497123759044,-5.749759113333823,-2.26925713188405,-32.423324402386115,-1.092028605280236,-23.857129864670302,-16.544465661666287,-10.753220033049933,-41.926799732932,-31.310897439210635,-39.29059863481605,-107.05586608394222,-271.0533151362067,-21.55848959583863,-2.1209219148653267,-60.29390303413039,-70.64456427792256,-1.5865194663327882,-88.58837212977174,-1.8408178131343669,-23.432261796277224,-45.334443447301815,-1.9852595985230963,-12.8796272803691,-1.9334682406200898,-16.93633624888302,-2.52196207772839,-1.9535576809566104,-1.9433210313950484,-129.74862664842405,-67.91611146457745,-3.4487814239377412,-11.164730021566672,-9.660514190793148,-368.52662101779066,-2.0918966607671887,-34.04758737018378,-324.54743298980577,-20.815797716961942,-2.893974431540884,-8.379524997827012,-77.49301753080427,-20.990501120479735,-46.59333684312148,-6.82269456265316,-3.524296802326095,-0.78429692101201,-8.005107268042938,-1.8466472089900197,-5.495863573144556,-162.42318926772205,-2.0208946644740933,-63.177749743986475,-13.12382722442906,-49.65885071056965,-4.914689986874436,-1.8494180069953305,-3.8607719219474794,-13.183950855162541,-17.63661964642101,-40.687793061083624,-11.880855058685725,-5.845783829972611,-5.13010128832173,-3.186898117199068,-62.83759027235357,-35.09354556366777,-2.847254517464457,-2.9881340205461746,-72.91132062374007,-47.94307108180458,-30.76402856836862,-19.822395097035905,-37.086778972399365,-3.271834241307857,-23.84264798643722,-85.0308623576417,-1.5595788353943723,-46.29268812548046,-1.556195000122628,-103.14314760138156,-42.418307453805355,-3.0726802615064406,-30.2575829647487,-3.8268500274844315,-5.8870275240069105,-27.87900389562452,-105.15787192996662,-96.30429590427202,-4.570230761860836,-73.8675540465183,-0.901547022935623,-30.675892111455465,-125.71373852577786,-20.85328054643482,-2.579681283070487,-48.33940147957547,-49.20012241929845,-168.97435999356907,-22.99496521148433,-83.17055005816307,-28.800749958643667,-6.152312025008665,-2.060096347920344,-23.503739655092538,-20.14260249221722,-13.56774840197668,-1.6806551058641186,-28.21396246757158,-48.52719616986234,-94.5551574317521,-13.302245290443652,-17.942472274932484,-218.0924686961369,-8.482841873854138,-6.647173244479065,-222.97877279577835,-5.92863161254931,-2.26499915473135,-1.4120400128363775,-7.055986796321058,-4.439190901353749,-14.774110938761503,-34.705694037426056,-8.426584341480122,-29.351453688828098,-2.812177642628199,-9.442950589728612,-55.48047796788988,-36.94184161521877,-53.08628269366238,-8.109623245778812,-87.69158099388403,-158.8936831000195,-21.097330972031887,-50.99618663889374,-14.495157014203592,-14.834808754602449,-89.4692654874759,-4.4923870940321775,-284.25681555757257,-171.75443908528646,-57.43952240780932,-2.3414593901820666,-3.5834470803001888,-1.8620995529344349,-86.41369336522237,-2.905536403876825,-64.69658242735541,-14.771676738375447,-130.65805431229936,-30.162697399492444,-8.818730012232091,-3.9321141677967666,-1.7592855117313082,-35.14674128196341,-2.560093928246606,-77.64511636801878,-4.3650681696641715,-0.07450033830664013,-14.363132698017635,-18.13362117467069,-5.734354857401165,-3.7802019935133577,-6.396846324223594,-247.92671817095368,-5.216567798101291,-62.0284309809196,-2.218570544552538,-11.337782583584893,-118.70062961659639,-4.157474267523834,-9.115960693092143,-37.840393074472146,-24.244609893443755,-2.380689538961266,-0.11385328650082359,-68.93002881379189,-31.298877309136138,-6.745314354117385,-48.44861144990864,-114.03035819250357,-113.52553438906493,-1.5466093747971357,-153.0299073842292,-36.83327680300097,-323.8352878317683,-21.296859605500263,-2.3969781267828965,-0.6753385513684911,-19.028851443737047,-70.83862984843161,-24.302296165437856,-1.7205921019738655,-70.13127232200186,-41.708441745876755,-2.6748354966636656,-60.78390032335285,-77.87147496588804,-31.653243232905776,-6.4412202341992195,-4.8945303616339455,-4.745970172478144,-3.9817136777728868,-43.8304824402161,-18.52146021591864,-6.321018901746718,-100.39544974930756,-126.35180178721585,-1.996092078961153,-35.31396245806844,-13.664709528693022,-112.20294945525127,-60.43259132012875,-15.213749084656513,-3.227760309638127,-10.083521432996168,-1.6473488574775446,-9.708037403986493,-39.349767241099116,-17.81409354667612,-86.10240860355579,-2.141895760953593,-21.34410911258252,0.0,-64.78523338222926,-3.237384313802881,-8.225728191751053,-13.19329418575333,-61.69714635773704,-65.55375755450044,-0.4413389334329871,-9.066237157539966,-7.42319778651484,-40.007971736360034,-20.528978652959317,-10.76762549834296,-137.51560079862122,-5.614696662246508,-22.7844055826757,-18.2498097290917,-90.03788402492027,-25.198615703750704,-122.62927873206183,-11.164761291035205,-33.62803804318761,-26.973752645576827,-9.754005391195292,-6.873582548699111,-32.70834358892644,-14.104556033952974,-87.63179177129074,-3.8053658642067587,-2.2572845358115288,-37.47786303321366,-50.471599357153096,-17.226005274177968,-8.111376826107115,-5.620649362889812,-1.8079836824016766,-16.265615304589392,-4.262944324820122,-1.9663558579847558,-17.491139506401225,-45.984049115669215,-117.98426365944836,-17.791311874782323,-65.3240752986076,-25.795006551126065,-4.346639105474719,-1.962543863456225,-23.360307234910344,-96.65455078432524,-47.29180002884982,-4.766485283204246,-7.873165584407565,-184.89650316715128,-165.05698619767765,-0.9851780864096118,-149.4780566526382,-4.864908108243256,-2.5474931217310717,-54.33498663338527,-119.7257663651428,-44.50079194030874,-25.580582609898613,-2.895801479131352,-19.366445281603184,-22.51548172061609,-5.895712450196648,-70.1230187908371,-18.058087739275283,-27.83601509892515,-2.6043916418262736,-0.9725841981971396,-1.0612724276719123,-2.090808317043792,-12.125462379495332,-5.335608286538805,-57.00427012217859,-59.0203184668066,-10.366111698277873,-0.915815005936286,-24.36194127335693,-319.518253830652,-24.164339631857892,-3.136173520211185,-49.04457553721295,-6.134381975505542,-2.9408380955407996,-8.682045635554555,-11.020490062537995,-157.15162830232953,-30.140001294685764,-1.5373284526107598,-90.04170645555158,-12.841826359146607,-188.6983881391723,-0.26615268206077286,0.0,-30.080088803192773,-68.64822644302147,-183.86733454846245,-17.221116789359648,-1.871267465206775,-56.33660209941169,-40.35231005258986,-0.03830005480341119,-272.8893253488189,-2.4462814763037066,-0.9931751106324478,-56.48129459825262,-9.502578365964748,-42.21200660999164,-12.219604265205508,-33.41246072568058,-10.996930265925018,-3.018833317091582,-2.7014199094973432,-5.509063991245343,-35.197810333145654,-76.81857901137496,-41.18775586804506,-0.4771634242684959,-5.750775788445726,-47.64423942225075,-96.97779857988894,-61.21457576018153,-12.362865880585058,-2.7743241305456765,-200.20770827660084,-3.5073278883316705,-48.50185836724715,-111.30255474852373,-13.202450921216357,-103.68977286384593,-120.75072218061032,-19.11035645764526,-3.1539825333467117,-100.16707323889646,-12.918950195439434,-5.070532695705948,-2.4899328362472484,-2.923771710072888,-49.899360167119774,-94.0681897742595,-32.05948289754207,-105.35242434291946,-10.863729965948593,-33.80655748501164,-142.53200360443128,-2.347739193158599,-7.283643223771825,-6.089504789072504,-41.04894992116054,-1.08457276783948,-51.07683379180999,-70.8040819012679,-0.912357891152448,-91.13786047297536,-22.901264371199048,-4.658424235352023,-1.0355444138038874,-60.465798861651024,-47.00142422945577,-84.55525379730331,-35.87692450023859,-1.879281183442661,-251.49121799810436,-7.38030039194849,-32.00762668232446,-111.80156006269694,-103.5804007189715,-118.35029195822177,-2.856071884022904,-3.6382022456560543,-93.59176436779707,-7.248395651078639,-21.354680437689062,-26.549118796082187,-17.724510640397025,-50.071530034325406,-9.838855982474907,-9.795243033270024,-8.574282124991718,-87.69086102230722,-4.548565755948261,-52.60309320653422,-30.12102847746419,-20.353107294068543,-44.63778913622228,-91.32200662646078,-4.391400470866392,-13.54921507968725,-8.539072250419965,-44.30959953455539,-58.86777793465606,-54.9875440449901,-88.106955701866,-49.17319424765608,-1.711075791539617,-64.29702775220673,-3.2051335596424906,-95.49744060606452,-26.163809334038877,-49.79416813831748,-66.60138376154323,-3.761167034744376,-3.566946144742764,-46.80618919804328,-11.831067847474415,-120.96136297145507,-6.178662189441624,-2.6711287406795607,-31.458558164390347,-4.003004329943643,-1.4510745783437242,-49.04327082342728,-24.652868875953914,-36.97147016893964,-29.49377705754195,-95.86576968670764,-62.80282945240408,-55.202559408960816,-5.0119935468237475,-1.3454343676915634,-56.64164596788253,-25.191246430597236,-20.59964692667133,-10.719650598887927,-121.41472744738914,-7.429888023011787,-17.926537318891725,-47.98093557241641,-21.60450031130426,-37.31859712216132,-25.49220871526593,-19.606916922879112,-54.34775731730315,-135.87153672088766,-1.6312634424349828,-21.68986345402763,-79.3729296041181,-4.418824819842796,-103.7483388662482,-81.06058198551386,-32.73313755614248,-30.782419249870713,-140.21550834255498,-3.823002775263852,-6.107435690403586,-5.001785253183294,-65.34740972706169,-7.330841765950657,-36.377984223269195,-15.986926702718815,-47.58475654070033,-82.61365141720383,-49.85308051317551,-93.62587880023202,-64.99673917895926,-171.21561524558282,-2.227643070633597,-16.771100131577356,-1.7212415322604788,-42.176881468221005,-33.672701847611506,-2.1590252189076535,-14.007904552588789,-29.176809687720276,-112.37158164057618,-7.656437262120327,-50.29864104292782,-21.696817922384962,-15.100439525593835,-7.005836743789825,-0.641690498727805,-28.705874562970152,-60.47539503404986,-3.5322802003249336,-52.14523708482648,-1.7305017948873636,-9.060299685733712,-51.92898168166471,-36.16738975545578,-11.58847624255148,-3.461885083374439,-27.495529374181793,-3.84877291769556,-37.12394461269914,-31.397320809690513,-3.4200601118558245,-2.720621942614697,-21.084431401547377,-8.130787084456427,-3.8256032429902054,-50.82574236653038,-11.639483004283424,-55.74837460176444,-3.4173256562478445,-32.91157940284267,-0.9202065052198998,-4.711426011111901,-2.8212076239010653,-15.592023671439085,-4.956512001219309,-2.3737346546933242,-3.0135557979267316,-217.82909715597398,-12.089014331184908,-8.334853375163377,-76.7421501020243,-124.16107822915265,-1.8940476179152004,-3.2579503157415517,-5.1849301682839695,-19.61299909645316,-11.327900189065517,-1.2624577878887067,-16.33516296933962,-9.685491570573163,-240.6392391150033,-7.213288128232148,-1.0820798752233127,-154.6095832362356,-14.811475114489115,-8.031899522081249,-10.25948986742701,-2.527583494935723,-0.9482461237578285,-2.983888602639924,-2.9338517063733476,-32.81526586317751,-51.331578088689064,-8.75467174221236,-20.976860412322555,-3.866110627471133,-1.8283370220174517,-2.110477057124614,-2.6932447837520783,-16.99829996773022,-12.30111408761445,-21.39188489945429,-33.12218644230974,-118.46177556265958,-2.512731829020515,-65.96758543953021,-0.958038539354338,-11.711607894470232,-2.1207422530798743,-19.959286840077205,-1.2118100702832348,-13.048912912380947,-32.51209610064488,-3.020777265152523,-68.59205201970119,-32.77872141458446,-3.5291746895941696,-143.2030386724495,-153.3735135807007,-28.467978370517937,-83.2851368493683,-377.29658447384816,-35.320077755383785,-155.83556724204757,-119.65236503933714,-7.127580294041807,-79.96550818509043,-7.025786762052901,-11.377741100133536,-135.59695589480754,-10.069293012528197,-144.44316419048448,-5.389110878429951,-192.23119836016477,-12.547666551586072,-2.4473934577133414,-8.34344140049277,-3.222860005727794,-18.863942284178115,-33.94416093779772,-61.16754557994057,-9.743642266223764,-4.386673863430943,-110.08396300456039,-173.31352597438294,-20.51433084956344,-71.11229096228517,-7.24537822244194,-5.417812991430539,-15.256454551113718,-19.58928805693067,-0.11403223720932551,-80.21702335435633,-3.146900018551441,-2.668043396661645,-6.674412696273588,-3.955266312637171,-47.87654453554177,-173.54533941978056,-0.9085907992729685,-16.72766894786841,-4.3803235517254535,-16.875241314324853,-35.67418564951083,-16.842216382131674,-17.140525737267247,-76.29473231778934,-3.846654423790254,-1.8785796006402768],"x":[78.0,17.0,27.0,17.0,83.0,3.0,2.0,22.0,29.0,21.0,8.0,0.0,15.0,64.0,28.0,7.0,14.0,15.0,3.0,40.0,2.0,77.0,1.0,68.0,10.0,13.0,69.0,62.0,83.0,14.0,38.0,2.0,36.0,24.0,22.0,31.0,7.0,16.0,47.0,5.0,6.0,14.0,32.0,11.0,24.0,33.0,18.0,35.0,67.0,7.0,12.0,39.0,3.0,10.0,54.0,25.0,20.0,55.0,0.0,6.0,24.0,14.0,14.0,67.0,4.0,9.0,22.0,48.0,40.0,20.0,23.0,1.0,20.0,25.0,22.0,38.0,0.0,60.0,1.0,56.0,32.0,56.0,7.0,21.0,51.0,13.0,65.0,1.0,25.0,26.0,36.0,0.0,14.0,34.0,57.0,15.0,33.0,37.0,18.0,12.0,68.0,27.0,1.0,29.0,80.0,28.0,75.0,0.0,37.0,55.0,29.0,26.0,11.0,69.0,4.0,85.0,48.0,49.0,50.0,47.0,5.0,28.0,1.0,0.0,2.0,10.0,81.0,0.0,36.0,3.0,5.0,70.0,13.0,63.0,18.0,1.0,3.0,22.0,48.0,5.0,47.0,1.0,2.0,2.0,10.0,8.0,63.0,37.0,78.0,17.0,12.0,20.0,68.0,5.0,54.0,33.0,12.0,39.0,52.0,26.0,14.0,87.0,36.0,73.0,45.0,64.0,9.0,3.0,32.0,8.0,19.0,25.0,0.0,1.0,16.0,2.0,47.0,37.0,52.0,17.0,6.0,3.0,81.0,0.0,69.0,17.0,16.0,50.0,21.0,2.0,33.0,39.0,19.0,16.0,18.0,1.0,14.0,1.0,66.0,40.0,54.0,17.0,24.0,0.0,1.0,54.0,53.0,15.0,62.0,7.0,42.0,0.0,15.0,5.0,2.0,44.0,34.0,4.0,16.0,43.0,1.0,22.0,71.0,48.0,46.0,35.0,7.0,4.0,3.0,47.0,6.0,35.0,4.0,37.0,94.0,99.0,57.0,34.0,36.0,28.0,3.0,1.0,76.0,25.0,6.0,43.0,48.0,63.0,3.0,30.0,8.0,9.0,17.0,19.0,8.0,60.0,4.0,16.0,16.0,27.0,16.0,11.0,40.0,28.0,62.0,10.0,76.0,36.0,3.0,61.0,17.0,15.0,5.0,22.0,67.0,3.0,5.0,26.0,18.0,32.0,45.0,9.0,57.0,46.0,8.0,49.0,42.0,64.0,50.0,37.0,35.0,86.0,16.0,1.0,80.0,16.0,71.0,21.0,63.0,79.0,11.0,24.0,2.0,12.0,5.0,9.0,2.0,28.0,74.0,16.0,23.0,35.0,2.0,2.0,9.0,39.0,21.0,16.0,73.0,38.0,12.0,10.0,33.0,22.0,0.0,3.0,42.0,38.0,2.0,4.0,41.0,12.0,14.0,12.0,60.0,28.0,20.0,25.0,80.0,41.0,92.0,26.0,5.0,37.0,1.0,5.0,13.0,23.0,6.0,5.0,6.0,3.0,68.0,0.0,38.0,49.0,67.0,32.0,45.0,44.0,7.0,48.0,1.0,2.0,42.0,72.0,43.0,2.0,32.0,63.0,14.0,23.0,9.0,1.0,9.0,29.0,30.0,5.0,2.0,5.0,47.0,27.0,15.0,24.0,53.0,5.0,12.0,15.0,3.0,9.0,45.0,6.0,65.0,68.0,41.0,35.0,16.0,55.0,37.0,6.0,2.0,24.0,42.0,41.0,1.0,69.0,2.0,7.0,4.0,44.0,53.0,17.0,6.0,33.0,23.0,46.0,6.0,71.0,31.0,39.0,8.0,32.0,27.0,12.0,33.0,85.0,39.0,57.0,5.0,21.0,38.0,22.0,44.0,75.0,8.0,11.0,20.0,15.0,1.0,18.0,1.0,53.0,1.0,10.0,66.0,22.0,13.0,15.0,11.0,59.0,9.0,16.0,49.0,30.0,25.0,8.0,22.0,9.0,4.0,4.0,14.0,4.0,22.0,13.0,84.0,3.0,8.0,3.0,1.0,1.0,6.0,6.0,55.0,54.0,5.0,41.0,26.0,9.0,22.0,26.0,12.0,32.0,9.0,10.0,6.0,4.0,3.0,41.0,27.0,10.0,1.0,88.0,38.0,2.0,8.0,28.0,73.0,4.0,2.0,18.0,10.0,4.0,2.0,15.0,14.0,17.0,0.0,20.0,6.0,36.0,0.0,6.0,1.0,68.0,34.0,5.0,5.0,63.0,3.0,47.0,38.0,19.0,57.0,50.0,37.0,22.0,56.0,31.0,96.0,1.0,32.0,72.0,38.0,21.0,36.0,0.0,7.0,13.0,26.0,30.0,28.0,84.0,5.0,51.0,19.0,67.0,1.0,20.0,2.0,74.0,8.0,15.0,35.0,17.0,10.0,17.0,2.0,57.0,2.0,3.0,30.0,15.0,53.0,22.0,23.0,52.0,43.0,52.0,12.0,19.0,9.0,40.0,48.0,56.0,25.0,1.0,4.0,11.0,25.0,41.0,26.0,15.0,1.0,26.0,16.0,59.0,0.0,50.0,1.0,14.0,17.0,33.0,46.0,5.0,0.0,51.0,37.0,14.0,13.0,42.0,5.0,6.0,40.0,87.0,0.0,84.0,2.0,8.0,58.0,1.0,30.0,8.0,33.0,10.0,53.0,0.0,19.0,66.0,24.0,6.0,73.0,2.0,63.0,85.0,32.0,3.0,50.0,13.0,44.0,59.0,6.0,64.0,11.0,18.0,4.0,0.0,8.0,35.0,43.0,11.0,53.0,69.0,17.0,25.0,1.0,6.0,32.0,15.0,1.0,9.0,38.0,12.0,35.0,12.0,11.0,70.0,8.0,12.0,15.0,1.0,1.0,18.0,43.0,68.0,3.0,3.0,48.0,25.0,6.0,26.0,21.0,36.0,5.0,0.0,9.0,3.0,74.0,23.0,18.0,34.0,10.0,8.0,5.0,16.0,0.0,13.0,7.0,1.0,1.0,0.0,8.0,12.0,20.0,38.0,37.0,18.0,27.0,1.0,5.0,55.0,5.0,7.0,10.0,14.0,36.0,18.0,7.0,50.0,58.0,20.0,32.0,2.0,32.0,3.0,8.0,37.0,16.0,6.0,1.0,1.0,20.0,29.0,24.0,3.0,41.0,11.0,13.0,32.0,0.0,6.0,9.0,59.0,20.0,78.0,5.0,2.0,2.0,43.0,17.0,5.0,35.0,80.0,21.0,0.0,20.0,9.0,3.0,37.0,5.0,11.0,21.0,0.0,7.0,6.0,6.0,17.0,0.0,0.0,31.0,4.0,37.0,6.0,7.0,2.0,41.0,69.0,10.0,64.0,30.0,1.0,7.0,26.0,22.0,1.0,54.0,5.0,22.0,42.0,25.0,8.0,26.0,14.0,66.0,6.0,21.0,53.0,21.0,22.0,0.0,14.0,19.0,0.0,10.0,12.0,32.0,34.0,9.0,5.0,27.0,7.0,77.0,4.0,46.0,44.0,47.0,16.0,5.0,45.0,70.0,20.0,11.0,27.0,32.0,9.0,50.0,11.0,31.0,56.0,1.0,13.0,14.0,62.0,59.0,17.0,62.0,17.0,43.0,6.0,23.0,8.0,46.0,29.0,24.0,11.0,48.0,26.0,33.0,9.0,20.0,46.0,59.0,12.0,16.0,17.0,38.0,3.0,24.0,12.0,26.0,7.0,23.0,31.0,57.0,5.0,40.0,4.0,10.0,57.0,26.0,30.0,6.0,13.0,2.0,47.0,44.0,37.0,6.0,41.0,14.0,91.0,18.0,16.0,16.0,8.0,7.0,33.0,80.0,15.0,39.0,6.0,23.0,27.0,15.0,34.0,46.0,52.0,9.0,59.0,15.0,54.0,51.0,4.0,3.0,56.0,13.0,24.0,1.0,70.0,0.0,53.0,7.0,9.0,16.0,2.0,65.0,64.0,0.0,28.0,18.0,36.0,17.0,7.0,23.0,20.0,6.0,10.0,64.0,55.0,44.0,9.0,77.0,25.0,58.0,14.0,35.0,87.0,64.0,24.0,86.0,47.0,48.0,26.0,22.0,46.0,2.0,54.0,14.0,4.0,62.0,60.0,33.0,8.0,2.0,28.0,69.0,32.0,4.0,53.0,21.0,2.0,28.0,17.0,13.0,38.0,2.0,37.0,16.0,4.0,52.0,34.0,18.0,31.0,6.0,17.0,4.0,46.0,0.0,6.0,66.0,32.0,3.0,38.0,13.0,23.0,29.0,7.0,19.0,8.0,2.0,8.0,13.0,20.0,4.0,11.0,92.0,13.0,9.0,91.0,26.0,34.0,2.0,23.0,35.0,47.0,2.0,17.0,3.0,1.0,19.0,17.0],"p":[0.9002646149983704,0.8116854738507278,0.970664323921913,0.9067364374781028,0.9475689143453054,0.9801121858724722,0.9800135348088597,0.8816152061750193,0.9505854163987673,0.9391088303529702,0.8040595855466459,0.8222296248201886,0.9655313850834292,0.8356330069712284,0.759816917692981,0.8490073902578193,0.7658599460233749,0.8213677256839234,0.8870372153342742,0.8764151936461522,0.8456885663496804,0.8438550573215364,0.9554538034902323,0.8380588665190015,0.9385044704136483,0.8820271303083771,0.8627463208803405,0.8101513462773391,0.951864410934006,0.9407006933199653,0.7502883369367503,0.9517566502862358,0.7978040396447816,0.9553486523451509,0.9654663626279341,0.8162197956332666,0.8008913693376583,0.8210002010812458,0.9763888372024003,0.889361896923571,0.9274464218007503,0.9251853262997006,0.8853886789705749,0.9239795486242037,0.8946952783868398,0.7945600395839265,0.7700441900102424,0.7616001210809127,0.9480688136161748,0.990644734674829,0.9139524848379428,0.8204639804079412,0.8418048805629131,0.9628139976997867,0.7791227224200878,0.8585936507050591,0.9082661670430876,0.9360498236356978,0.8220725559105504,0.8221841083295619,0.888477277888945,0.8826805308483352,0.8716715021687659,0.751979013951751,0.9611914846952634,0.7592061543991449,0.867763167610929,0.7678324989383758,0.8504216673693326,0.863636268274659,0.9285582820745801,0.9187912453110837,0.9806950762944734,0.8185894536391665,0.8149497002168247,0.8142144989770419,0.8523926129576318,0.8084155484881828,0.9031742372862182,0.7670761174096423,0.8569515179697251,0.8090588535338685,0.9877924338353062,0.8571266778426005,0.9959056029289495,0.8692095191902525,0.8776102596969857,0.8858747327701747,0.880583104269181,0.8348462950055533,0.7927034488003712,0.8063576559184904,0.8318932649307552,0.7880522445537574,0.777513549106515,0.8505029099775263,0.8058530409655145,0.9045257417433672,0.8627446277875861,0.850709588477491,0.9472087550442092,0.845245451953784,0.8640804810442482,0.7565896453131091,0.9969804036393395,0.9382347163051914,0.9433963576356003,0.8943600831085603,0.7512487640902871,0.8245224230285888,0.8451812231071083,0.953449155050146,0.957827504030919,0.8245674397953316,0.7971941213798454,0.7774963953096714,0.8793610879050235,0.8060802846846348,0.9639903222864425,0.7801112650251398,0.9401231955667003,0.8672689171015506,0.8691867976275935,0.8752845048424173,0.907352218733477,0.9528520559316476,0.7544082223382953,0.802416778114322,0.8388408703459567,0.8185198109561382,0.8254985491887303,0.8083799682783339,0.7565645480412757,0.9735237229676466,0.7681026786634066,0.8385696229770679,0.8676782007390759,0.893944873292647,0.9008686223640671,0.9024106215486832,0.9638055145747775,0.7729951550229666,0.9073646577200546,0.85534711444887,0.8572449144705878,0.7803965108499762,0.9709968658597063,0.7985721758341362,0.9561165013935716,0.9120905280885627,0.8456507019929669,0.9280218400879254,0.8274850764065012,0.8083778636025614,0.7780873932259842,0.7611137377992199,0.791432458980984,0.7751939914187606,0.9239547696939339,0.9798279192780313,0.7760378287461358,0.9132150761119999,0.7933242921125747,0.9912522358341214,0.8561490499140574,0.9521080482962117,0.881582373038645,0.8171861480923946,0.8159955617421448,0.8985926212322728,0.9805312365429482,0.9119326633645015,0.868382540126502,0.930838838196512,0.8783254333938799,0.7843309920600303,0.7693319254347089,0.9762725055588213,0.8263015536805125,0.9918003371851898,0.953478918511957,0.9618646219540423,0.7786476963720068,0.9643866105532759,0.9544914124928023,0.7534233136936719,0.8645136495919656,0.7961537817854352,0.8047286037758274,0.8378796993704303,0.8384356709712097,0.9753357422380862,0.7586782343637151,0.9338244780116565,0.9225907419366977,0.841864487618752,0.9503230108701894,0.8769345119358185,0.793003888148466,0.8190041499331491,0.7533055331302299,0.8968578706597177,0.9990479092352567,0.8022848766421085,0.7813990285968597,0.7719337097681278,0.84363644705769,0.8320886588254202,0.8302000791710556,0.9866832638927903,0.9427277825648182,0.7789928764423466,0.8260153715757093,0.968339811152983,0.788750189624996,0.9103578265366883,0.9949871209855079,0.9148270728457419,0.872873055915699,0.9238407292031874,0.9115980065744984,0.9721602103373473,0.7549710545652351,0.896039653335049,0.9932537357715623,0.7507014424245262,0.7570821395779304,0.7992809441473401,0.9072043095585951,0.9430700722253568,0.7720844060352827,0.9892909591395747,0.8737166866722206,0.9553187753351096,0.7702251174147148,0.8100689138229116,0.7643530661235358,0.9542960897200554,0.7630389158680129,0.9553732705120573,0.7992856252800636,0.921201947988757,0.9749924814504232,0.9743391463504897,0.9208161929828957,0.8971119424300229,0.8242589524492372,0.8802583929688409,0.8961842203236738,0.8965994758274021,0.9594583879517351,0.8296465638317072,0.8717741071414954,0.8880422556122809,0.8694945241793443,0.9467286947118867,0.9816166780123439,0.7649912454562824,0.8135750509428212,0.7996613021722794,0.8722479399350033,0.8796299018309521,0.9058950421188626,0.961855648341009,0.8352050163081922,0.8002438815054315,0.7967377307779006,0.9785279483877427,0.974915183048811,0.8006373946194141,0.9526893164617434,0.9740509355167513,0.7792872059505785,0.7690983274510055,0.9435465544804046,0.9251912083361891,0.8523406291545796,0.7761218476055801,0.9764871861909192,0.830735343741662,0.9639745901227232,0.8862833991730227,0.8002503356255616,0.8549581382155377,0.8317110281180169,0.9114539888723332,0.7851560795259709,0.8872298852697338,0.8537859286984182,0.7544733847859066,0.8269270798576689,0.9544011309291867,0.9554366295528889,0.8839999701644213,0.9169613327281371,0.784589460323018,0.9518715294766418,0.9899550067034693,0.8544208082997251,0.9908350123273353,0.8726051208733928,0.8559854485026029,0.7819667075321581,0.8301105612032986,0.7785041700692112,0.8336021614044473,0.9107082961851973,0.803915634037639,0.8078650518941349,0.7845546312295901,0.9971898769498017,0.9951141209762122,0.9749514119352216,0.8649648065574284,0.8111559612557553,0.9773403586738449,0.7569611568363586,0.9577473000239201,0.8276573366678657,0.9029185755105519,0.8474924726081472,0.8660685095079221,0.9935762444650782,0.9043203919436451,0.968031684418412,0.7643761269333134,0.778499042536575,0.8571174022279555,0.997221884766066,0.8034463188871002,0.9073275975331607,0.8131781062921914,0.9405920857303897,0.8719062375270511,0.7836748982785142,0.923912555119818,0.9939783096415507,0.7728521031312183,0.911668278905782,0.9270707890325973,0.8428869569026313,0.914284465450004,0.9142535848024677,0.8048725509144015,0.7693406142482944,0.9971167971479153,0.7953554720420298,0.8976157227578334,0.8486192949326998,0.789729776455143,0.8100221791268433,0.9589469465950974,0.828181134477213,0.9893522956104044,0.9410622607043335,0.9490496092823573,0.7765913958157337,0.7693066202246971,0.8019009857121209,0.9899683003661609,0.7753129318074543,0.9645291797166091,0.8258551331496868,0.8119417613562343,0.9028095151582259,0.8305447173391819,0.7719613353412661,0.7753860662619494,0.9172989132975915,0.8337341600454697,0.9999160059621299,0.8791268826388994,0.7771361790796278,0.8138780987621737,0.8416164448661154,0.9831630829457494,0.8076012829655713,0.7814846542711744,0.85021010944515,0.7804153117418151,0.98149273034168,0.9482547962851018,0.9870252712065112,0.9623458446239396,0.8474553872590448,0.8335458125564099,0.9672782866426577,0.7529303060482005,0.9131359541527753,0.7961389313086827,0.9910180166946863,0.7841196282801122,0.9260331689354431,0.91100996824978,0.8294212823201388,0.9587578724402203,0.8060980043420529,0.9049895704058017,0.817187399697493,0.8901902016424691,0.8020285413965551,0.755203672559652,0.9706245378131062,0.7575595335790353,0.9958378106968162,0.887948561278729,0.9693659372711372,0.9913026029768477,0.9193829576873198,0.8111470920131858,0.8941659048922737,0.8613677386905131,0.8431231258113437,0.9430246068299621,0.864993921704794,0.9627161596706371,0.877466804925837,0.7713018335958944,0.8339820445510685,0.8937805464272952,0.9372099885063189,0.7632553217979468,0.9089232254800435,0.858498731859106,0.9363875191218585,0.9270577586767139,0.8565750529829883,0.7534544657381206,0.871296687497606,0.9420759178837411,0.7853862849781013,0.982681317612889,0.8868974181416598,0.9721728729838568,0.7869594609453562,0.8663673363267976,0.8327342927534298,0.7583126161438841,0.8602814621189354,0.7955619110266313,0.9312473973834368,0.8949493047924296,0.9356967094362088,0.9926568456497109,0.9117715176070245,0.8960407055093897,0.8183443748861066,0.8162211703861985,0.987604193145942,0.9395445353129462,0.8831107845324031,0.8430375989315145,0.7559440325622976,0.9563172535882873,0.7611223615786726,0.9455774913832937,0.8156646497308286,0.9969444340879141,0.8182046443579091,0.8737838338109214,0.9847313015875061,0.7753353949765606,0.98508892140139,0.9896780106656392,0.7801622720560797,0.8067396176668228,0.8933434405864975,0.9065458778941977,0.9037121912144026,0.9720688060510911,0.9528057645006133,0.8061536125163327,0.7711676817456694,0.8414068536691961,0.7967711229658045,0.7667058499015803,0.9193655281654534,0.8296598709574967,0.8553767139646457,0.8257144981095826,0.9431301276960661,0.8200349630032086,0.8566539552634955,0.9382480337986212,0.8285807932496887,0.9905199064193555,0.9808791075110366,0.8241802878682852,0.8804937784295435,0.8031335774428907,0.9387646241634353,0.9656826928621052,0.8911959824856894,0.9864098051960626,0.952108053036494,0.7830209000503836,0.7906970242489983,0.7852954620319603,0.9656055905743293,0.9508866586802303,0.9048585020967079,0.8848135181504126,0.9726457889119617,0.9219650050465757,0.865539447684549,0.84507294782811,0.8366556331648951,0.8101489441656664,0.9952205055658616,0.8826835435943582,0.9575067084652005,0.9754273416479298,0.8679263255332669,0.9055455661794428,0.7582991975381996,0.7933269985221338,0.8977515041533322,0.7639961506604027,0.9325350601407061,0.9004723635353852,0.959251302721138,0.9721841054619651,0.8223083966379268,0.7956448623303447,0.9277240796326625,0.8748174550641923,0.853726182296741,0.8850649732012084,0.9378301800871097,0.9282071600402846,0.8915042355542424,0.992359607771933,0.8712501991418998,0.8646307266807207,0.9111379566659521,0.9907011320031389,0.7526424615703231,0.9693168791410653,0.9004381815799741,0.7640828652748459,0.9481546998255008,0.8378621518338498,0.9433437771498401,0.8705742416629387,0.8702564934662889,0.7506076609361901,0.8923888717726132,0.9891682093053776,0.9801281644149099,0.8134206131314163,0.7814613068350709,0.8582963654053093,0.9894542601863081,0.7927044241753127,0.9103188374232785,0.8278942890061632,0.9906436188747696,0.8417480164004606,0.8561629537740242,0.7984261109242867,0.9390565516594291,0.9397942068131974,0.9368508042800339,0.7973990043381656,0.9846158396437872,0.9244854071496285,0.8053337835791443,0.9541970801577697,0.8290551382911654,0.8695911065824526,0.8756153622886216,0.7639732118635971,0.780010426955992,0.903427956877373,0.7772870665493566,0.874891003812729,0.9607886026985277,0.9384047761581549,0.9846181219275139,0.8394677493168883,0.819097973936888,0.8405547143380776,0.9366761736507706,0.8735606796840091,0.7888817955966724,0.8195792791000842,0.9196111953588013,0.9137852787247078,0.8086367697805252,0.8035612951921685,0.8551732849967983,0.9075733095853439,0.779840745877594,0.8190304581130571,0.8916796867274908,0.9353276744642098,0.7749265875869842,0.8378738427036512,0.850730445166207,0.920847684086798,0.7774274051647448,0.9290836613899922,0.7617776506575504,0.7571237773235238,0.8782374841807677,0.755392177487459,0.8658796800224171,0.8797612565484756,0.8071895755021732,0.8155181473672962,0.8616432518989737,0.7984351120461287,0.8145971492297069,0.8611096247688093,0.7540973251014668,0.7831495175256682,0.9431200749549771,0.8318438683536945,0.8404268860061341,0.835625944157629,0.9061323583586495,0.8209746138667504,0.8428293488283445,0.9255829763013501,0.9190764079868331,0.9114275259867132,0.9944359027142842,0.8279782927404511,0.8731231365519161,0.9053152680114039,0.9651685985423593,0.9158643242844018,0.7850046463519298,0.8035938782090939,0.9360425034311278,0.8554555572902949,0.9390347935366155,0.9184970095000061,0.9197711144911698,0.7806658967005465,0.8837461423309689,0.9740406178624077,0.8875578345625302,0.9569994241776981,0.7841547528830148,0.9610499381570222,0.9871008108955728,0.9894995713398639,0.7516220097617203,0.9723010666170087,0.7977376786950927,0.8087292474900916,0.8517424005439345,0.9262640584053301,0.790443404060341,0.9526913491766988,0.9935335395267335,0.949588424334826,0.9509720057175904,0.969240022667377,0.7647668206121894,0.7885620715124488,0.97094973175052,0.9092366012712387,0.8411968228243529,0.8674938499224305,0.8317938573196979,0.8174296961613954,0.7706426593225691,0.9414563371952689,0.8018334128297083,0.8781870992882336,0.8190686687103582,0.9692011314407079,0.9861566597867475,0.85191784279117,0.9639841943634541,0.7570563685966779,0.8077386533958527,0.8475153469502836,0.9205670070881774,0.7508716354014215,0.870976212362318,0.7989707047359311,0.7850454035827744,0.915135887515488,0.7502647555242075,0.8606618512743478,0.766322114928663,0.8018467327749053,0.8788135536217135,0.9997260183020271,0.9727031580361009,0.9207678204582737,0.9097177244074885,0.9310388594956536,0.9503027114108429,0.9624241175825565,0.9930998422392314,0.8721166639968816,0.7661621546824893,0.8122344477826254,0.825755809796241,0.7909941820046785,0.8760133553947418,0.8144248731843686,0.839768684785593,0.8944965324339157,0.8294915100617666,0.7734654277772024,0.8327648314498654,0.958395922504474,0.8779131455511454,0.8529498934660767,0.787467816078671,0.9493222811375592,0.9004441232924258,0.8448281437964889,0.9988056361109823,0.8429245985693853,0.9654249098376089,0.7868399257330853,0.9535272151844106,0.9318150635821645,0.8628318297702122,0.9915662021858277,0.8379213220063215,0.9274592068017615,0.7934042444246383,0.9523206650282445,0.9221931774809677,0.7703800137366995,0.8280353346227933,0.9081812531323741,0.9760354369836951,0.9386759196675646,0.7631989083444888,0.9528152148882707,0.8187621108776202,0.9624614834397305,0.9975010378360755,0.8519981427921934,0.9576695309889259,0.7818071986669094,0.9933460608271729,0.8433365708913787,0.7513703023059255,0.8711634566741989,0.8391705146732691,0.8049097164183139,0.896425386181877,0.9026275651046198,0.8624872470131062,0.9531753976173605,0.9547320081187329,0.9341674839598726,0.9616706206090804,0.8473001705177212,0.9914037871692087,0.9729102043567104,0.7803250755153432,0.860000152995208,0.8505649213606596,0.8301027422264451,0.8082138673820427,0.9121157290264785,0.9296056250455365,0.8281045267199045,0.8207436047262564,0.7861170539112166,0.7725292651140039,0.9071889508914838,0.8208251378916684,0.8110876646270437,0.9596094596035267,0.9968365629614706,0.9076956263399414,0.8816751086365306,0.8337381016193044,0.786969442183017,0.8052264281405472,0.9897922896350169,0.843218621901961,0.8660058137696731,0.8812846386134292,0.9928804051580675,0.941795755640149,0.8153274421401397,0.786845082396733,0.7930078009472419,0.8020161633444961,0.8076890599050153,0.7798485871455236,0.7859500738845095,0.7797573189336318,0.8756045272962742,0.874689329288965,0.7579157418602012,0.7623946291624804,0.9572538316259,0.961906201448769,0.8374089645151246,0.7793727368859811,0.8147401387477281,0.9177914113664831,0.8672149068285467,0.8334116750885224,0.9290355556223371,0.950494642379157,0.7958934798815533,0.9729232990243099,0.9442003146158753,0.9607040291642321,0.8673513253697864,0.7780634161211585,0.828816456133058,0.947065597998132,0.8685226102434558,0.9606054634294163,0.8178514270407429,0.9985270932276387,0.8261286254707446,0.897637006226384,0.8820635812186471,0.9018497363132136,0.9728956852743955,0.9614686997808031,0.9980414785459706,0.9539360375710932,0.959207718437751,0.9087101304096328,0.7903905286562882,0.8579648899494943,0.9631538921525834,0.9876131759481279,0.8520519981117003,0.882122725353381,0.9196700165663013,0.9877042258845263,0.8565467810814889,0.773590240088889,0.813561274125933,0.9267499478527659,0.8079777770955403,0.848553561309682,0.834195658489501,0.9607856944187756,0.824489135415887,0.7503388607884725,0.9459346964680635,0.9858748869684407,0.9701354044123741,0.7739787600854495,0.948081194305378,0.9299965518412057,0.9316619327429647,0.881053830483189,0.8572426832245551,0.8509445106022118,0.8267606318201738,0.9966220334684963,0.942047749779719,0.9380019666336121,0.8858346642175136,0.9599473006892724,0.7720492834638482,0.8985720233255676,0.8715516526594578,0.7899558501080876,0.9304182722653119,0.956686435202844,0.7679666039872798,0.8149564656614747,0.8198236323519761,0.7791466775644685,0.7976978255564415,0.9451305408296762,0.80870289968432,0.8912754312979407,0.9035509892278779,0.9375610603460367,0.7583617842064188,0.8736431449837653,0.9109779957541464,0.7661600674581879,0.9589974950395989,0.8570932932411857,0.8219563531581713,0.9883739207382717,0.8227808277703179,0.8760792870527441,0.7558311202518235,0.9164035576433818,0.7976827350332234,0.7947503663332665,0.9711351319634525,0.9510364402395072,0.9377396451708242,0.896589946804794,0.7583896999933258,0.8392889034562077,0.9457311556684513,0.9754972290150613,0.8027260120915307,0.7660045241825395,0.9015808885181809,0.8318669952493014,0.8855351563424735,0.9776159266041315,0.769690440008842,0.9798296435971423,0.9919625170940779,0.8862000234999381,0.9278642486994837,0.9563011478578418,0.9692573181381048,0.784983486716076,0.8613286279252721,0.7548978558614243,0.9001632949409062,0.84230418865461,0.8001330572439435,0.9607842148835088,0.942762332633924,0.9425411887446005,0.758631837138627,0.7882408072295154,0.9665563276755128,0.9532605890277764,0.9169213489283168,0.8686883871834699,0.8343279827971999,0.9350204856998181,0.8438450365301262,0.9527803555517357,0.8190972487638266,0.7568778606807849,0.8592193663338981,0.7675483976183022,0.8152953984546274,0.9970016885350561,0.8209132086789697,0.9043772901136244,0.836996379786527,0.8167703558094368,0.8554338674234893,0.7677721041863061,0.8094098256537273,0.9851931978924151,0.9882253998611417,0.9169777690169375,0.7782120595046793,0.9980094696195827,0.9831718332518269,0.9312005462987303,0.9521598432072584,0.7625425234102708,0.951051008232524,0.844920975527913,0.9807298431358455,0.914136572513941,0.7805292118719205,0.9242652049163143,0.9044423959538112,0.9405931656418207,0.7905575108034889,0.9134811922214714,0.9854291147178922,0.8909809642830389,0.7540453420635498,0.8091228070591947,0.8687451958339147,0.9751383542243482,0.9642199432796486,0.9216882818202148,0.8863863252185722,0.835129790924527,0.8494343269476468,0.8164630458003446,0.9377824464690703,0.8309231572824247,0.7860335899151928,0.9718944613232751,0.7852638175747148,0.9707414057668705,0.8566533792870803,0.88055837118139,0.910675433870188,0.9314174392410248,0.9825109488098169,0.7780349914227149,0.8231834157220934,0.8043941584670415,0.9314660107459249,0.9325574689517764,0.7697104361530687,0.8941889478430987,0.9905087629714004,0.8167228292311275,0.8740182451486049],"n":[93.0,26.0,78.0,75.0,85.0,6.0,61.0,26.0,68.0,24.0,19.0,52.0,63.0,70.0,37.0,63.0,33.0,16.0,19.0,84.0,32.0,90.0,8.0,89.0,39.0,71.0,73.0,81.0,88.0,18.0,42.0,3.0,76.0,38.0,64.0,87.0,94.0,87.0,98.0,28.0,9.0,16.0,52.0,82.0,54.0,62.0,39.0,51.0,98.0,54.0,14.0,58.0,26.0,33.0,70.0,27.0,42.0,57.0,2.0,88.0,46.0,45.0,71.0,85.0,5.0,93.0,94.0,66.0,43.0,69.0,31.0,100.0,29.0,94.0,62.0,77.0,16.0,77.0,2.0,66.0,79.0,78.0,16.0,80.0,62.0,20.0,67.0,1.0,45.0,39.0,70.0,4.0,45.0,62.0,67.0,67.0,43.0,46.0,89.0,86.0,72.0,41.0,2.0,63.0,84.0,42.0,89.0,11.0,87.0,100.0,58.0,49.0,23.0,96.0,79.0,92.0,49.0,63.0,88.0,98.0,7.0,40.0,47.0,13.0,20.0,59.0,91.0,27.0,40.0,10.0,6.0,91.0,36.0,74.0,79.0,18.0,94.0,80.0,61.0,76.0,73.0,1.0,62.0,48.0,69.0,74.0,88.0,91.0,87.0,31.0,18.0,42.0,73.0,7.0,93.0,88.0,70.0,39.0,99.0,44.0,46.0,90.0,38.0,86.0,59.0,79.0,18.0,7.0,44.0,15.0,24.0,31.0,0.0,6.0,17.0,5.0,54.0,42.0,97.0,29.0,43.0,27.0,92.0,19.0,72.0,32.0,57.0,73.0,93.0,98.0,47.0,43.0,25.0,38.0,40.0,26.0,46.0,55.0,85.0,58.0,90.0,78.0,75.0,0.0,2.0,55.0,81.0,17.0,75.0,73.0,46.0,0.0,43.0,13.0,43.0,51.0,63.0,14.0,23.0,43.0,37.0,27.0,77.0,76.0,90.0,85.0,50.0,40.0,17.0,66.0,16.0,85.0,28.0,73.0,99.0,100.0,78.0,74.0,64.0,30.0,91.0,29.0,76.0,25.0,99.0,64.0,57.0,90.0,21.0,80.0,50.0,22.0,79.0,44.0,19.0,94.0,9.0,16.0,50.0,73.0,52.0,62.0,97.0,88.0,62.0,86.0,89.0,40.0,6.0,83.0,25.0,39.0,8.0,69.0,80.0,48.0,45.0,69.0,95.0,71.0,73.0,18.0,91.0,61.0,90.0,82.0,65.0,77.0,78.0,41.0,47.0,86.0,53.0,23.0,84.0,41.0,71.0,77.0,87.0,86.0,39.0,42.0,43.0,77.0,20.0,9.0,36.0,55.0,96.0,71.0,41.0,77.0,3.0,21.0,14.0,61.0,26.0,60.0,96.0,66.0,15.0,76.0,88.0,31.0,40.0,53.0,94.0,76.0,66.0,43.0,53.0,36.0,80.0,51.0,92.0,53.0,82.0,29.0,82.0,51.0,94.0,34.0,10.0,47.0,1.0,7.0,22.0,48.0,7.0,57.0,16.0,40.0,73.0,51.0,88.0,73.0,90.0,40.0,47.0,70.0,7.0,72.0,18.0,7.0,88.0,100.0,57.0,4.0,81.0,67.0,51.0,33.0,9.0,22.0,10.0,40.0,60.0,17.0,27.0,33.0,66.0,79.0,86.0,37.0,64.0,46.0,39.0,19.0,43.0,13.0,55.0,45.0,68.0,91.0,48.0,48.0,23.0,62.0,46.0,73.0,48.0,38.0,51.0,74.0,69.0,79.0,13.0,80.0,15.0,59.0,71.0,74.0,23.0,63.0,35.0,51.0,6.0,77.0,38.0,51.0,75.0,43.0,71.0,26.0,66.0,99.0,44.0,85.0,15.0,34.0,100.0,28.0,58.0,82.0,14.0,54.0,57.0,24.0,3.0,88.0,20.0,90.0,9.0,20.0,77.0,44.0,81.0,19.0,25.0,62.0,68.0,54.0,71.0,49.0,27.0,12.0,57.0,30.0,68.0,8.0,37.0,5.0,34.0,46.0,84.0,6.0,37.0,27.0,75.0,8.0,38.0,31.0,60.0,65.0,26.0,87.0,40.0,9.0,52.0,78.0,54.0,58.0,25.0,99.0,15.0,6.0,62.0,42.0,33.0,13.0,4.0,96.0,59.0,11.0,13.0,73.0,87.0,14.0,20.0,38.0,41.0,10.0,28.0,92.0,34.0,61.0,8.0,43.0,25.0,36.0,90.0,57.0,31.0,72.0,52.0,8.0,49.0,88.0,30.0,69.0,98.0,33.0,58.0,71.0,41.0,54.0,69.0,91.0,97.0,1.0,51.0,81.0,52.0,29.0,47.0,53.0,16.0,37.0,31.0,59.0,85.0,92.0,10.0,98.0,43.0,87.0,1.0,41.0,11.0,79.0,52.0,92.0,70.0,21.0,85.0,54.0,73.0,98.0,4.0,3.0,46.0,50.0,77.0,28.0,47.0,89.0,49.0,90.0,72.0,48.0,16.0,63.0,72.0,57.0,82.0,11.0,7.0,56.0,65.0,50.0,69.0,32.0,43.0,76.0,39.0,78.0,4.0,54.0,8.0,54.0,37.0,92.0,60.0,23.0,0.0,97.0,42.0,26.0,28.0,88.0,58.0,6.0,71.0,98.0,19.0,85.0,9.0,84.0,84.0,16.0,55.0,78.0,72.0,86.0,95.0,22.0,36.0,98.0,38.0,31.0,99.0,57.0,82.0,89.0,62.0,27.0,57.0,25.0,59.0,64.0,13.0,76.0,16.0,43.0,24.0,61.0,18.0,81.0,69.0,20.0,61.0,86.0,78.0,50.0,5.0,10.0,87.0,58.0,2.0,57.0,57.0,12.0,91.0,69.0,54.0,94.0,9.0,23.0,28.0,3.0,52.0,45.0,60.0,78.0,4.0,4.0,59.0,47.0,14.0,59.0,82.0,54.0,6.0,7.0,90.0,19.0,80.0,87.0,31.0,36.0,17.0,24.0,90.0,51.0,1.0,61.0,24.0,99.0,1.0,0.0,29.0,22.0,83.0,57.0,42.0,50.0,51.0,1.0,63.0,66.0,6.0,51.0,22.0,58.0,56.0,55.0,18.0,60.0,74.0,35.0,76.0,28.0,72.0,3.0,17.0,67.0,73.0,47.0,3.0,3.0,93.0,43.0,50.0,48.0,65.0,37.0,98.0,50.0,2.0,44.0,18.0,89.0,21.0,90.0,21.0,38.0,28.0,98.0,34.0,18.0,66.0,96.0,27.0,4.0,32.0,10.0,46.0,100.0,6.0,84.0,42.0,2.0,7.0,30.0,25.0,60.0,11.0,1.0,96.0,7.0,91.0,72.0,72.0,73.0,46.0,81.0,54.0,92.0,63.0,20.0,27.0,63.0,40.0,8.0,64.0,22.0,29.0,93.0,61.0,30.0,79.0,39.0,87.0,17.0,33.0,69.0,53.0,78.0,57.0,63.0,22.0,39.0,17.0,94.0,77.0,81.0,51.0,11.0,42.0,26.0,91.0,78.0,49.0,58.0,78.0,23.0,7.0,83.0,94.0,64.0,23.0,76.0,64.0,46.0,55.0,12.0,64.0,95.0,8.0,28.0,36.0,90.0,87.0,53.0,93.0,33.0,61.0,10.0,51.0,57.0,50.0,66.0,88.0,14.0,84.0,94.0,67.0,27.0,60.0,60.0,91.0,21.0,52.0,31.0,83.0,15.0,48.0,76.0,95.0,45.0,45.0,96.0,72.0,13.0,44.0,23.0,34.0,64.0,47.0,69.0,28.0,19.0,22.0,77.0,57.0,62.0,6.0,77.0,72.0,93.0,43.0,19.0,31.0,49.0,41.0,60.0,89.0,46.0,49.0,27.0,44.0,30.0,20.0,56.0,48.0,58.0,45.0,93.0,32.0,72.0,93.0,5.0,6.0,75.0,34.0,28.0,2.0,71.0,96.0,54.0,16.0,42.0,58.0,4.0,92.0,79.0,11.0,44.0,19.0,74.0,22.0,61.0,34.0,21.0,61.0,17.0,68.0,80.0,62.0,10.0,86.0,27.0,82.0,40.0,45.0,88.0,90.0,26.0,92.0,48.0,77.0,47.0,38.0,93.0,43.0,62.0,83.0,5.0,64.0,73.0,39.0,10.0,9.0,67.0,90.0,95.0,33.0,59.0,64.0,38.0,52.0,98.0,79.0,54.0,63.0,96.0,32.0,34.0,74.0,41.0,90.0,57.0,69.0,24.0,77.0,81.0,1.0,9.0,79.0,73.0,28.0,96.0,18.0,27.0,93.0,97.0,44.0,56.0,8.0,12.0,31.0,50.0,4.0,81.0,98.0,18.0,16.0,94.0,57.0,91.0,3.0,48.0,37.0,66.0,17.0,44.0,13.0,18.0,19.0,21.0]}

},{}],197:[function(require,module,exports){
module.exports={"expected":[-3.3260522492787965,-12.354017190576478,-0.6371703614380433,-22.680001448111188,-66.16429177331005,-157.77875324017387,-119.86729342176152,-2.111817784979568,-27.984338781950402,-4.2366007815999716,-6.046476009680232,-2.5183490184597495,-14.34597285634823,-23.511059071045324,-5.218383611315884,-1.6771572822875656,-156.03078131985825,-312.5238228993728,-1.1453380517494165,-15.407329243496573,-122.5850678484988,-3.0631699384711863,-69.92650494812393,-65.01586510741018,-53.35825322277148,-10.30232197473527,-0.986152751167909,-185.48130603216993,-52.312926422452115,-173.00856817089885,-1.5760380524204927,-74.45071961176764,-2.3705740270771023,-2.975175211037608,-9.943686184949751,-121.78272231624342,-4.462221410138509,-13.776678303504994,-16.360885139802292,-17.22434848600414,-119.1132488004345,-11.083569277117803,-2.1022885294467506,-11.31911278750483,-125.64246414804755,-139.22894856447337,-25.819155280785203,-17.90800237467328,-4.4506432187566904,-18.956260701305297,-34.24971092688382,-262.80941793714805,-29.443936940595528,-27.130678654313414,-25.36442063023064,-1.8341127627621743,-12.018019990501534,-53.66758983493209,-0.1315324863792774,-53.32709795761396,-50.52438004170459,-2.475792884628807,-11.242670953379115,-80.6721445254348,-31.287374225396917,-10.538221537637277,-1.8873717730425852,-32.017643417175805,-0.8597014050333114,-2.103036365661384,-23.520525896280844,-74.28998726960756,-47.92785451878951,-7.00704610188792,-23.641070866599648,-111.65279499969284,-143.73774763026563,-1.3533846411487804,-239.64064434964286,-26.62367470201927,-43.47029100532134,-53.88656558141444,-14.139058279971163,-1.5243492581461444,-100.18630048484815,-5.497562567644725,-31.864580734797475,-12.813705166038533,-120.96431924985829,-1.9516895922435569,-1.5290787978712823,-84.29057014950787,-51.0503824889943,-7.080047176702331,-15.192895180824811,-15.568170371211858,-105.59509635175415,-90.17205398116874,-73.12756522639106,-27.006751871217137,-0.42695632786129156,-58.346893663607744,-18.464354062611896,-21.51471934191943,-1.3239796436575157,-3.2376380677287555,-12.35235532135428,-39.283289351261026,-1.4413485171757996,-1.3293522281973849,-63.37215480155435,-10.101203820697055,-21.145897564014653,-13.079917723185064,-10.913729224370343,-55.42136200565442,-9.738473051498481,-42.682449740775446,-152.8778120892639,-2.2999121910423184,-39.61661793571628,-74.75172762387025,-2.221761389680657,-56.35031388561343,-21.598326627571666,-15.03443554028466,-229.79756030536436,-14.712140379269849,-12.716211144014755,-1.524799839394689,-31.918722527837005,-2.7031613474718905,-1.0770103163489924,-6.045820147546728,-72.29168466934807,-26.4294919838977,-30.2908107964291,-62.99535872573117,-2.3657289016131857,-123.12951263174925,-17.005560184955595,-25.721259471435385,-129.18716813228622,-4.837053364127817,-6.267972153647483,-8.288693283656766,-88.9959508544643,-62.99952173151379,-7.580804935570093,-24.84357049348923,-4.588288544781448,-2.240947659897039,-56.109555658247324,-4.327523791921438,-15.053947462117627,-57.2571070835994,-20.36801966804079,-21.932190471993678,-144.6070101732088,-6.097999241167639,-2.7930640366830306,-5.566410099167131,-2.4242436497076296,-6.99459258182638,-3.0711425284135974,-1.3790110791517312,-1.0461896576942276,-91.7990608911681,-2.065350832531522,-8.296797084259193,-5.873435115623885,-281.8383913013081,-0.9520164715251682,-4.847767440467529,-2.7728405702610015,-6.640807758712041,-106.29520637244977,-1.2858409529594832,-44.36815048744307,-12.033895188768351,-245.34445889995507,-37.197008582592694,-40.105912188001476,-12.79834607936997,-4.4575640079457735,-19.12696863914617,-9.136518647976708,-2.6438757736732077,-77.49657060832156,-18.89018965177897,-1.3730002053673147,-77.29019822096001,-1.8733251877090744,-23.752530102855385,-8.061054916054928,-16.943533126357732,-23.663837681219892,-42.74901660613539,-33.55853494609991,-25.149668172332113,-3.03246491166833,-5.744314041691988,-135.93546069786197,-17.321499688168586,-36.667960822097264,-2.017784448892087,-3.7262697585646434,-13.985171451279305,-83.9584263277334,-22.54550633285622,-1.7918584506175326,-3.386555795123623,-64.68402164797173,-5.708958949022274,-173.51337543964857,-92.2749533239906,-2.327658849450565,-2.3876141455835587,-14.86284916739099,-57.219546598894674,-73.19916487444618,-35.290022928866655,-7.156579946537325,-39.02815457291311,-32.79624182930604,-49.311199071278615,-36.160188546162054,-104.00144647034294,-90.64121596326957,-1.8618502658991398,-62.5629149117774,-53.400389592071015,-9.143658741411507,-3.1686537868054723,-6.491466778715298,-319.7389314901837,-36.5956602141797,-0.9675771895242289,-1.6708943856323804,-5.982290489019375,-72.19381147345635,-178.9979928904449,-106.25126004052524,-71.565478733187,-29.005664658370335,-57.459438191842196,-0.17028565058983688,-1.4662046916490676,-2.3640725274126155,-22.02045222346147,-53.121540841155536,-11.720356365140262,-5.152912781101696,-46.01185059403434,-2.9348350560514884,-69.25900015763911,-7.091465750306072,-1.4089664944549545,-39.83983235443218,-48.36027227667023,-56.47660059995582,-2.7018928312800097,-12.941401678287638,-73.85310665926356,-10.40671326884911,-89.57879225810912,-16.61644139393783,-188.70723485997752,-1.3865535666064446,-176.50979211790278,-242.03614610406322,-98.11222000757095,-10.77517878992115,-37.77876679095461,-12.730277907125169,-84.20156000947905,-53.88140761029933,-52.48050334416777,-26.255329239480172,-2.051423492572456,-7.230658946205074,-30.148643101946767,-55.83477929972024,-190.22276640465827,-72.92470808578813,-35.9606035265795,-110.72152025942812,-5.770114375223648,-70.820342934766,-39.37598995446936,-50.19796274320255,-44.559114806958995,-4.63764720460826,-33.88216732940951,-16.532336403743738,-71.6497735675496,-16.140320199836616,-58.89567039021073,-8.057796355374444,-74.48424073542763,-27.47938260955574,-59.105140007792436,-0.018436787173016462,-23.842707789660842,-1.9170029499838686,-184.21547664832,-90.38617756822484,-1.9147132282079946,-7.912118298969991,-27.56082050608512,-22.413256336833577,-42.49944661787415,-11.234081769903465,-9.257809784834343,-23.313045113375424,-175.07450314483577,-1.9181826432390348,-16.3056526915651,-36.18836786060305,-20.155199154625205,-1.2645650178603445,-85.55830479299408,-2.321672668269298,-14.735968614962978,-4.450316947532141,-16.027954872949476,-1.149417151223853,-104.24402554112903,-99.92326843063542,-61.29811085689512,-50.441996614754,-173.80270112117992,-115.93551773199864,-18.626028639041813,-4.522408363604653,-60.46911719409239,-8.519600600395428,-166.35991520929366,-50.51911105221652,-56.981504607242634,-8.844546621345735,-68.65654745484376,-2.006524020300402,-54.11002740802226,-2.876291339348232,-41.798492284406244,-49.44659731690652,-203.17189405797728,-23.775361147440286,-54.1467143015822,-3.0766253610094463,-2.0087924409868463,-2.7672978018135987,-197.14710559537966,0.0,-6.300188500886547,-195.26752242009792,-2.432491465242652,-121.1647668316256,-37.840668726128705,-9.875776580290065,-11.803167207842717,-15.111564184244775,-204.9773608400497,-8.2897472854461,-11.649407490854738,-15.279714863454702,-99.41357920974495,-22.08586205060553,-18.194940555852465,-5.367885933813073,-34.48993608138015,-2.7064965047651,-1.0226174754584596,-97.22932744907285,-11.632747345185937,-0.4481961117694023,-4.827823708605896,-53.98337025951598,-1.4378473161396241,-15.300431090900812,-1.024578203027111,-1.3817385547673031,-23.643795928198,-42.19949766845837,-3.9950285967459855,-1.4296534132195162,-1.558908090456689,-2.0374726442599314,-47.43161566490815,-4.885128549712954,-48.58844859653335,-67.10250502634865,-91.37049834841936,-4.175288767289148,-14.957369764232983,-7.674155463143026,-13.256211966814995,-90.92244505163139,-73.7643306654966,-18.830388722176473,-2.279523445232675,-32.64331842255605,-10.34244724766818,-48.836896017820415,-0.35288233725078616,-66.14543227786176,-3.4150296035286893,-2.308022703588251,-11.175245320454037,-19.585159717137138,-22.221553702375612,-8.252431039069062,-228.0438834980457,-0.27160615340398087,-3.1056208211232548,-17.614294641448865,-8.195894592287281,-211.3417504616196,-46.445233738852124,-4.606189732148428,-50.837804803058525,-1.7593703245885823,-162.65390145294433,-5.635087564926888,-7.802324890556164,-13.994680324063,-101.6871942423005,-40.46459234126896,-49.99762310462305,-200.8166033986062,-14.97877958940155,-1.6879010251073703,-82.37905342329759,-48.97946094767373,-36.033249446394464,-5.766558623689112,-0.06227948243962178,-18.80258424334493,-129.87741820848862,-37.011416915529274,-1.1536408634352284,0.0,-1.7058209188362534,-25.37062095250313,-62.35697675844432,-5.42793257781719,-25.816939298368208,-10.268665455560559,-150.374055032048,-26.53637720080186,-37.80616965033203,-31.540913771924753,-37.815636693424025,-23.925665019832877,-3.366808694854573,-121.96567751897798,-44.83490335155848,-11.410612492948811,0.0,-3.411382881823593,-10.306487118357126,-3.9803913979265113,-2.7936661864065058,-41.05354123057775,-64.12702280811064,-7.450460030692219,-69.14676705914157,-18.84809431152341,-61.393260658475334,-1.5272880280660597,-12.733216866321321,-31.829374291234796,-32.93740997409432,-4.279265182549493,-42.94410937986375,-47.63503769204314,-5.590918791694209,-59.126961360332366,-32.55048428163088,-41.205058383441944,-23.083220241587465,-51.804964797657625,-3.395241731524348,-40.29368741980535,-3.836373440721089,-26.55265352648266,-12.246432449963855,-5.835726187033711,-3.101388686338748,-1.8225541908323515,-1.0073225993375505,-177.08977625759113,-18.702773576666914,-155.37732240902392,-7.525719739852545,-2.029441305960038,-2.775047614435153,-8.910890219706035,-11.096626039711508,-46.6152428423598,-133.56165987935051,-15.080327847070686,-88.46880053506754,-8.594525966108549,-11.214888995042392,-9.993481417835438,-5.917852239818475,-3.1674162368519885,-1.1264150335587133,-31.58363095954276,-104.95803813476232,-42.997681261224656,-25.0910445314856,-10.967963443278585,-20.653081907076817,-59.10108766308489,-90.91731967479438,-45.581925413705335,-4.270105640269086,-11.653504280703888,-35.98846710385697,-190.37312926447666,-17.18978737401512,-17.99980876878949,-43.535578147562035,-5.512633401964287,-5.779039031038691,-48.63017148143574,-60.24685247626556,-47.72328090057267,-162.3796910586186,-2.072795205640404,-193.34429966897778,-69.34739952657351,-2.3058593397517724,-19.049696956608948,-44.472241146186136,-3.5323981482805014,-88.43813209121383,-13.448436843753623,-8.495113352183104,-21.744378321157296,-4.55921597226015,-72.89673735749454,-1.9475864960278448,-32.90155590691592,-60.26108442919486,-2.0487445768836587,-11.064461469732969,-92.72214991379931,-159.75235724114705,-7.518833886255745,-2.127543060845749,-7.7337234061257565,0.0,-6.685709242874595,-4.2530120553087745,-166.083862289215,-7.386667818179209,-24.4403708094959,-33.36865218664664,-109.82696498438872,-6.455681277860354,-88.60606740994312,-28.99946426799189,-33.97454384404942,-14.498906248422934,-146.82722493414903,-23.498904430326064,-3.277373739336444,-3.075455685984685,-13.901388981706488,-0.981203970106494,-24.61442112296927,-70.47221756687286,-14.400191785494219,-1.088886142226261,-19.548738499472634,-51.420316109234776,-12.779693825470025,-41.59035294769219,-210.12670324015787,-141.9067545983407,-99.21174257660937,-0.30073730992415976,-7.823791465670156,-1.7741781386959916,-121.50272232802871,-108.36449485815314,-1.6790000026303076,-38.70068372461476,-7.4043166815410135,-87.81945190691128,-46.737566499900474,-10.334079498653749,-15.761909026189358,-2.035481464446719,-1.435071600226963,-4.174411733182132,-106.54916001314288,-3.487106589427517,-1.042486442290883,-8.431174422759852,-170.02086810023738,-99.46643541800304,-1.7116338152572554,-13.565742966130934,-45.514062307085354,-4.8399342617004315,-35.82369922985003,-3.702781512190879,-283.7413443491603,-85.51759673587473,-18.521413000354638,-42.51525690781648,-61.091671538105714,-29.901358111636448,-8.649503718690225,-49.192458317330384,-37.471088752049006,-71.30459698012999,-120.81039221394782,-8.263263139212091,-23.498547102866894,-74.77109305859814,-9.676509940384513,-117.67272287862491,-33.90496382411699,-52.17982666766418,-46.774565465292014,-10.1245795398696,-36.24799160708289,-25.053087823065464,-6.523516331854005,-6.6614318911654955,-43.232911111695586,-39.58998616424569,-43.05354923130815,-78.80674144263067,-9.289387358653332,-29.39279923156743,-3.2016889114861553,-151.9053561198279,-7.051171300764607,-2.7826054484629212,-39.54433633117719,-19.129077432439015,-7.4500367143434545,-85.40071453377361,-3.403002672979172,-2.4570297314506835,-9.771917462710087,-79.41813623832117,-30.59971128149411,-1.1084149003382393,-2.032076674944012,-27.403791399322472,-20.952118418092628,-7.000103087618869,-1.2086798553094769,-26.916064073461385,-14.231551464923951,-58.527649188458284,-11.979290850948363,-3.222633719370892,-159.87959339401843,-1.7696798495684003,0.0,-39.655831029086144,-6.589807710399841,-1.567308580274533,-77.46612254720442,-2.0822899545175173,-32.94452831155541,-95.09344345977446,-2.700972072079075,-2.453649665306222,-2.66610951473727,-24.952779200653676,-3.7982479483265976,-1.782348410915883,-1.2881297708042687,-38.47174829887982,-43.47613404280226,-57.57291640561234,-1.8348723671301699,-5.64410075964967,-6.996977893260188,-25.920356895991674,-152.1496616847962,-28.599728795516626,-1.427153608691785,-3.5271283532912623,-110.4930066156035,-85.03126025348773,-19.031117180018104,-3.163593468943268,-0.14062389221961677,-1.3389496211087928,-228.95205016615947,-8.884430680524071,-84.7422039964052,-11.290752566715936,-19.894765974620523,-50.74394883417591,-1.468955933366094,-39.20703733894299,-3.6290813013914436,-6.595836432523985,-18.654568339067474,-164.59166815932014,-0.044412173519654076,-128.95849396135773,-73.87277550551929,-92.51212405441629,-12.245792441733801,-149.06563616460883,-24.49310411980609,-2.0891162779283294,-92.59495932488186,-165.70062617723326,-19.55997476164854,-1.72677781088042,-140.16641062846455,-105.19946710759552,-5.318829066029091,-1.0780170515924716,-20.005613875416906,-33.402955497359365,-61.05855223416336,-10.698140123598115,-32.48870984657733,-166.68352742735593,-2.596490579751079,-4.388925892109305,-193.59309428704879,-81.87672872801929,-2.4779712639703755,-112.37577193794344,-0.32949495339761875,-1.4599561127291294,-2.0256651968651687,-25.482113352156958,-10.897143428463288,-28.16500568146705,-62.96906215488579,-23.928433518203953,-7.435498100499703,-12.644487867453787,-404.5321146654944,-15.705056469707444,-32.17493304378802,-9.900316014182199,-2.8756510657165557,-29.39363167490425,-208.2774949450008,-90.94296461985368,-96.05408767808487,-31.028876016292035,-93.82512445514311,-79.3978528518638,-114.78676942450258,-173.238231442509,-195.32065435394932,-19.00322956690412,-14.598567492914306,-57.71423272146768,-28.988772257956168,-173.69131886188165,-105.94365804829938,-1.3523509678035102,-22.27914602735358,-113.0892334571873,-8.190873027763217,-2.1029778073702903,-17.88276625637431,-25.757197416301853,-1.602272671051872,-1.7940995814363865,-1.4120445775961348,-7.004186087113824,-145.91308721355702,-16.378436488568415,-67.76259539921996,-308.6843424072131,-37.116600171153834,-1.944000481832548,-4.945331911102523,-2.095479198363882,-35.758430921168014,-42.46966249665436,-2.3160166792024306,-74.06945952435666,-2.3698789074533786,-151.12426899191695,-34.61339126080955,-22.672926261910806,-52.36255587727514,-124.83624945988527,-133.08736723923437,-2.071641319002616,-1.5225099366082233,-2.8722809846569186,-39.110486631692,-31.506844812812187,-4.415935162453695,-23.904015638973043,-1.5421633564485115,-24.649191329258876,-24.309992259174436,-1.3011337095936106,-256.3292999872773,-4.0655870961770875,-0.07170621378867854,-36.71596943213822,-12.12031330066084,-202.78258579889962,-2.080665802824469,-15.20915817869549,-6.671372481557245,-135.06267992767883,-1.457700004945815,-22.16236378230066,-1.4932776164578252,-8.078851122525565,-5.350305813754203,-1.28899357953495,-74.50417505384391,-3.0343637324338433,-7.33342265833271,-2.140396130539228,-70.88512140757464,-0.08798968189851307,-7.344998819268804,-2.1214043981495783,-58.782090211956046,-4.854725865886792,-54.35226943317062,-61.14824461890561,-43.8181013032457,-17.495498952127484,-13.593245693709395,-30.853149485498474,-6.948682094356749,-105.29120155196917,-3.8980614256221315,-24.9220881774761,-22.10109451902747,-21.900482137070604,-70.75459423189032,-66.12047869240683,-102.91750732947308,-1.4803949954877709,-2.06510484013185,-90.04092770357636,-8.990203757703789,-1.3128622864114385,-2.249827713922623,-74.19907123746883,-25.19623119687979,-9.394077511947156,-2.605017688559126,-2.8112570137375825,-26.4968222024892,-133.39328068649002,-2.508090299840525,-2.865296562820107,-8.7347035156322,-3.481698577065653,-64.16036874546656,-74.85349781438168,-40.30650734256563,-38.439919546434965,-22.654229843422907,-31.235169033086617,-274.55690414206254,-35.94150580826163,-70.18809112169471,-1.001967604369437,-6.25586948992118,-61.19071133449523,-181.18375915257508,-11.374589579727433,-5.546839299586181,-34.28161545464118,-127.80904268687499,-15.630754517791013,-25.676120215932972,-1.8428006375412775,-72.598078396416,-121.41989677474939,-45.742628424269945,-143.6130784269266,-27.98139560609131,-2.1348082178033256,-2.2291885960764395,-24.90450393111291,-3.6193284655226545,-148.7599893570138,-57.566539171627284,-15.839613663604194,-2.905377664290333,-2.510357817749569,-10.567913939979556,-51.38393418004714,-281.00844095866654,-197.29263553307405,-27.938655970451645,-6.4158582517952505,-117.11612642788614,-37.03514609557519,-6.728340677501075,-1.6860414595095357,-28.2486123179002,-2.94462918899981,-276.8237509721149,-1.7764960501317262,-26.860881055119414,-44.232666839487685,-51.97813507625197,-31.365829416649653,-2.397551690437338,-8.117013183433007,0.0,-12.509888977108728,-0.14111889209926595,-43.394725835404394,-138.02603678660023,-9.422948321915687,-1.0429393147014534,-1.1318333290196636,-13.428936350685293,-2.3830838314935536,-100.19867667843909,-2.9028175000197094,-9.672433988547358,-12.484676710008847,-1.4519939094171581,-9.8050390479832,-136.96731927000607,-13.986986375234212,-61.76463133139878,-4.318251336830205,-5.355457374788443,-9.71218236478699,-1.227472059550361,-40.30010264078392,-1.468093715171979,-4.81337753062779,-1.8281088273140822,-195.47932564148624,-72.68197086197213,-94.02464378322158,-2.599911848637039,-1.983553654867906,-19.903726040089087,-26.434117550754344,-37.073473165739365,-1.6361483440826294,-42.11400986179426,-42.6527150148516,-13.25743239060691,-27.38472118321104,-59.064023236611845,-300.9359041854501,-10.108183844338107,-62.04725974961976,-5.420713521629041,-105.46088739682611,-5.795582491314134,-68.0712268417806,-19.82488836993902,-7.878752190615663,-2.3047944296874605,-60.07316022574058,-63.86349474090774,-32.589137822259374,-23.922181802597734,-4.926518107571586,-15.072249937736297,-21.378716288274667,-2.2607231394485297,-117.06675821874971,-2.0099498320711864,-35.14483083093239,-157.1542802092523,-94.04334348803076,-0.8280028928907341,-7.205465423403247,-22.19270317556861,-89.15921054608826,-9.39921361272922,-115.19981294298745,-13.132434186149489,-26.27168248534224,-80.10314164075729,-23.478202689451717,-70.7445970640418,-80.31361816302679],"x":[3.0,29.0,0.0,25.0,51.0,75.0,70.0,10.0,17.0,13.0,19.0,0.0,17.0,31.0,4.0,5.0,68.0,79.0,1.0,16.0,70.0,18.0,27.0,19.0,22.0,9.0,1.0,56.0,9.0,59.0,3.0,26.0,1.0,2.0,14.0,25.0,11.0,10.0,16.0,7.0,61.0,5.0,7.0,27.0,27.0,82.0,34.0,13.0,1.0,10.0,23.0,56.0,35.0,18.0,8.0,5.0,27.0,51.0,0.0,28.0,30.0,13.0,21.0,44.0,21.0,31.0,8.0,13.0,0.0,1.0,9.0,21.0,41.0,11.0,10.0,46.0,74.0,2.0,86.0,13.0,32.0,29.0,5.0,2.0,42.0,2.0,16.0,19.0,57.0,4.0,3.0,29.0,25.0,1.0,15.0,7.0,59.0,42.0,41.0,23.0,0.0,43.0,16.0,28.0,2.0,4.0,6.0,21.0,2.0,2.0,49.0,21.0,22.0,13.0,6.0,48.0,10.0,48.0,53.0,4.0,18.0,57.0,0.0,39.0,28.0,22.0,73.0,4.0,15.0,4.0,21.0,11.0,1.0,8.0,23.0,30.0,32.0,48.0,1.0,66.0,12.0,20.0,54.0,3.0,20.0,20.0,49.0,55.0,9.0,20.0,12.0,10.0,42.0,4.0,22.0,31.0,3.0,15.0,90.0,19.0,5.0,2.0,7.0,12.0,4.0,1.0,1.0,56.0,8.0,6.0,23.0,96.0,1.0,11.0,7.0,11.0,75.0,2.0,32.0,31.0,86.0,57.0,26.0,12.0,13.0,21.0,8.0,8.0,50.0,8.0,2.0,21.0,7.0,29.0,21.0,11.0,8.0,39.0,22.0,7.0,4.0,5.0,58.0,26.0,26.0,2.0,10.0,21.0,45.0,25.0,3.0,8.0,41.0,4.0,76.0,47.0,10.0,9.0,12.0,20.0,29.0,31.0,6.0,37.0,15.0,18.0,18.0,63.0,39.0,7.0,28.0,40.0,6.0,1.0,17.0,76.0,32.0,1.0,3.0,25.0,13.0,81.0,52.0,56.0,20.0,34.0,0.0,1.0,6.0,17.0,42.0,11.0,7.0,28.0,9.0,35.0,3.0,3.0,9.0,38.0,30.0,0.0,11.0,33.0,11.0,51.0,18.0,52.0,1.0,39.0,80.0,67.0,10.0,18.0,28.0,54.0,38.0,30.0,15.0,10.0,10.0,39.0,30.0,90.0,50.0,14.0,74.0,5.0,41.0,11.0,30.0,28.0,17.0,19.0,23.0,46.0,11.0,29.0,9.0,33.0,11.0,50.0,0.0,15.0,9.0,58.0,50.0,1.0,18.0,22.0,14.0,38.0,23.0,5.0,24.0,73.0,6.0,14.0,30.0,31.0,1.0,56.0,2.0,16.0,16.0,4.0,1.0,70.0,54.0,44.0,54.0,81.0,42.0,14.0,6.0,43.0,11.0,49.0,38.0,31.0,5.0,24.0,1.0,60.0,2.0,37.0,44.0,48.0,15.0,42.0,2.0,2.0,3.0,77.0,0.0,8.0,48.0,2.0,55.0,35.0,11.0,20.0,9.0,95.0,7.0,26.0,5.0,45.0,30.0,13.0,9.0,24.0,1.0,0.0,39.0,8.0,0.0,10.0,47.0,3.0,35.0,1.0,2.0,19.0,39.0,6.0,2.0,3.0,6.0,27.0,1.0,30.0,42.0,27.0,4.0,8.0,6.0,15.0,42.0,23.0,5.0,5.0,23.0,6.0,33.0,0.0,52.0,1.0,11.0,8.0,8.0,10.0,5.0,67.0,0.0,3.0,15.0,4.0,71.0,30.0,10.0,16.0,3.0,59.0,7.0,10.0,13.0,64.0,36.0,18.0,39.0,16.0,1.0,67.0,15.0,28.0,6.0,0.0,13.0,56.0,18.0,1.0,0.0,2.0,18.0,15.0,8.0,28.0,20.0,90.0,30.0,34.0,25.0,18.0,18.0,5.0,42.0,50.0,7.0,0.0,22.0,4.0,8.0,13.0,42.0,41.0,3.0,47.0,8.0,20.0,2.0,35.0,31.0,19.0,2.0,58.0,32.0,7.0,41.0,38.0,37.0,44.0,29.0,7.0,16.0,8.0,15.0,28.0,9.0,5.0,3.0,1.0,70.0,31.0,84.0,4.0,5.0,8.0,4.0,5.0,44.0,36.0,24.0,35.0,13.0,9.0,2.0,8.0,4.0,1.0,33.0,56.0,24.0,5.0,7.0,28.0,36.0,44.0,29.0,10.0,16.0,24.0,70.0,33.0,25.0,32.0,4.0,2.0,31.0,33.0,18.0,84.0,11.0,57.0,25.0,9.0,39.0,25.0,6.0,71.0,14.0,18.0,16.0,7.0,8.0,4.0,26.0,38.0,2.0,8.0,56.0,60.0,15.0,10.0,1.0,0.0,0.0,9.0,29.0,15.0,15.0,28.0,50.0,9.0,60.0,19.0,18.0,35.0,56.0,27.0,2.0,2.0,11.0,1.0,28.0,51.0,23.0,1.0,22.0,38.0,13.0,27.0,82.0,87.0,66.0,0.0,25.0,2.0,60.0,55.0,5.0,35.0,10.0,71.0,29.0,6.0,4.0,3.0,3.0,4.0,52.0,3.0,1.0,10.0,55.0,72.0,5.0,17.0,58.0,12.0,25.0,13.0,89.0,39.0,23.0,32.0,62.0,20.0,11.0,36.0,21.0,31.0,89.0,10.0,15.0,40.0,15.0,45.0,35.0,43.0,35.0,9.0,28.0,9.0,3.0,1.0,53.0,42.0,45.0,45.0,11.0,15.0,8.0,48.0,2.0,2.0,39.0,9.0,18.0,51.0,13.0,7.0,10.0,54.0,36.0,1.0,1.0,8.0,34.0,6.0,1.0,20.0,6.0,35.0,11.0,0.0,70.0,5.0,0.0,21.0,5.0,1.0,35.0,11.0,24.0,47.0,9.0,12.0,4.0,12.0,4.0,6.0,1.0,19.0,42.0,32.0,5.0,15.0,5.0,29.0,51.0,29.0,0.0,4.0,44.0,44.0,24.0,3.0,0.0,1.0,47.0,2.0,29.0,9.0,22.0,21.0,2.0,13.0,4.0,13.0,39.0,68.0,0.0,57.0,62.0,55.0,7.0,35.0,9.0,9.0,67.0,62.0,35.0,5.0,62.0,49.0,8.0,1.0,16.0,31.0,35.0,17.0,18.0,68.0,7.0,8.0,70.0,50.0,11.0,42.0,0.0,3.0,5.0,14.0,5.0,51.0,43.0,17.0,15.0,19.0,95.0,12.0,18.0,3.0,15.0,18.0,87.0,77.0,45.0,44.0,77.0,49.0,46.0,46.0,51.0,19.0,9.0,23.0,14.0,70.0,51.0,1.0,7.0,71.0,5.0,4.0,21.0,12.0,1.0,6.0,1.0,7.0,49.0,20.0,55.0,87.0,23.0,8.0,7.0,1.0,36.0,47.0,16.0,50.0,15.0,89.0,33.0,27.0,45.0,67.0,38.0,6.0,2.0,4.0,11.0,27.0,2.0,12.0,2.0,26.0,39.0,2.0,42.0,3.0,0.0,17.0,23.0,61.0,2.0,10.0,8.0,58.0,3.0,18.0,1.0,6.0,3.0,2.0,27.0,3.0,2.0,11.0,45.0,0.0,3.0,7.0,33.0,6.0,27.0,35.0,35.0,26.0,5.0,20.0,14.0,67.0,4.0,20.0,12.0,14.0,40.0,39.0,70.0,3.0,1.0,24.0,10.0,1.0,9.0,22.0,14.0,18.0,8.0,10.0,27.0,71.0,13.0,4.0,8.0,12.0,59.0,44.0,42.0,28.0,18.0,27.0,90.0,29.0,18.0,1.0,22.0,27.0,69.0,23.0,4.0,16.0,74.0,8.0,15.0,6.0,65.0,31.0,32.0,77.0,31.0,1.0,8.0,29.0,2.0,74.0,25.0,31.0,15.0,6.0,8.0,27.0,60.0,65.0,29.0,15.0,39.0,35.0,14.0,2.0,8.0,3.0,77.0,5.0,19.0,33.0,30.0,41.0,2.0,3.0,0.0,9.0,0.0,36.0,55.0,27.0,1.0,1.0,21.0,5.0,33.0,5.0,3.0,4.0,3.0,16.0,70.0,0.0,44.0,11.0,4.0,15.0,0.0,24.0,3.0,9.0,2.0,50.0,26.0,51.0,7.0,7.0,31.0,38.0,10.0,3.0,18.0,36.0,15.0,32.0,27.0,36.0,20.0,47.0,16.0,28.0,5.0,33.0,14.0,7.0,8.0,52.0,35.0,18.0,20.0,5.0,13.0,8.0,10.0,51.0,3.0,25.0,73.0,37.0,0.0,3.0,20.0,62.0,6.0,60.0,21.0,7.0,58.0,21.0,51.0,51.0],"p":[0.10591715048418343,0.13960062837754192,0.11964854652151624,0.190232584888978,0.14550779439581576,0.11534522197609275,0.10587180618157999,0.14833722258032409,0.018990403103519207,0.17597944504647348,0.10931769371195195,0.18930422472221142,0.08659902748133114,0.08356367546153663,0.08087290023448253,0.13039512484171603,0.09014438598365185,0.013238094232967734,0.14089481289001343,0.09079472077032245,0.1559123979550482,0.14533686096494938,0.024503123519436176,0.002983995568832354,0.012298024908510376,0.13621094885344878,0.1446429427847292,0.03195796561677335,0.0010594112110756894,0.05327177631708078,0.18767259830530003,0.01712286854316636,0.093427081208322,0.1407076858822367,0.050765401859278296,0.0019869618065464947,0.07561594444184322,0.04185268799058144,0.08464548852347718,0.08538189420756215,0.06124250532726792,0.0607774020923749,0.09866167445879125,0.1564955256086143,0.0056980899336685825,0.11082068602081115,0.1768517534363832,0.06331478755836355,0.002356342526710398,0.018870033873679803,0.10671528304580424,0.004826305688908051,0.16683474757356964,0.11993738530896945,0.04198039401818732,0.19089998507531517,0.14836793888547958,0.16085211288944623,0.1232492077836219,0.07855772672045097,0.04574535491880077,0.11547636370812038,0.08861208434120034,0.10245552275545165,0.07368975585143862,0.17750183143790263,0.15274916920507337,0.021865602058153445,0.11557227931622771,0.12208516968284107,0.07328555427483173,0.013347262754941358,0.11963408702648724,0.18260771715152588,0.00997195768973489,0.0716548417223311,0.11918986853359864,0.1077319905180298,0.04063801734154859,0.017538010710842,0.1392830596286123,0.12738329545212787,0.02687561324991621,0.1552698469732625,0.02501821000188427,0.06400581861969315,0.1152142871862064,0.14322927413297112,0.0957431772222987,0.1203955469632959,0.026272276678627107,0.008066282237364409,0.0653028687522709,0.13652335003598007,0.06991504912414026,0.10817290728039182,0.08027336608804908,0.027553943887151225,0.03806108725590476,0.0819980953353252,0.10123985486931614,0.19838731932688322,0.15642069066276845,0.12719690126606104,0.04350138197706124,0.0969401505464635,0.06299747046161555,0.10897183320491761,0.17236129506792408,0.08028393311624749,0.16113619844672328,0.16629065944752527,0.14012431473793904,0.04393058556860923,0.09627177584791302,0.16123103948721307,0.05206549319503902,0.15247142894027765,0.02562870535859978,0.10522155117367715,0.051312240316176407,0.17590991319757976,0.1296502066834019,0.14751231404777485,0.08020194649619819,0.15790821306268887,0.040506000588470675,0.008814961219646556,0.17070385272719105,0.19378339962967692,0.08298628625309959,0.09755441617856447,0.12876318749800794,0.09234909281039952,0.011985368225736393,0.15900769057992237,0.12324334566575001,0.12079129206840085,0.15800701435889555,0.07783649284497388,0.07249108874979297,0.036014346151704624,0.04942140753086299,0.19941820606673996,0.17990565988100637,0.132610591300671,0.13377431583761173,0.12096018203687811,0.05465979407928288,0.113965033846798,0.12608409931077366,0.1709105971767879,0.1834852362614369,0.11843645823599257,0.18810041255855117,0.07941726383312715,0.0004148878397455036,0.10958000841979386,0.1613089384517799,0.1296816090329824,0.12399997899054185,0.03637088092444323,0.07959078338263544,0.1141288133426071,0.06083156609992311,0.13232856240021343,0.11401939967482169,0.11420169836778551,0.10459920368786763,0.15210771229453465,0.13970792665723578,0.04693792886590767,0.14331320101893535,0.09051831635710812,0.15865416439725394,0.06413339934506675,0.15013193572552389,0.05032941845251653,0.04917436529054067,0.1489191503353467,0.050469491477926766,0.19553370383698107,0.10605650282607071,0.08588008829874388,0.17487975429915711,0.1925447095822227,0.03860631880514305,0.12904811420799037,0.11080269982701446,0.0943000361046813,0.08667196899440328,0.012239996989162762,0.11481255617330294,0.13528696118843278,0.1965225818527141,0.07662212327312706,0.009785579436669379,0.10964834418228252,0.14457959113202348,0.010687897991627171,0.16413466109565622,0.05754769778168378,0.0657582735932115,0.14096045672965998,0.1494913038939086,0.12217492457834936,0.14489541358680672,0.09407339631790812,0.11919565546587824,0.1413423847167284,0.060477967689674464,0.19726387507271337,0.12077201085088346,0.13078933115811095,0.05824311751959597,0.06861128018637279,0.14535724413876827,0.1687188426590348,0.1646114727808058,0.02449000362675622,0.024435217852340332,0.16714605063785123,0.09066308325098037,0.15676921341701938,0.07293173118043761,0.026378425637233516,0.03197213512158013,0.11425506219517155,0.028742721026347784,0.08565620382617492,0.03222328378910331,0.06399011733491777,0.11036754635277712,0.0033691138590522755,0.1132716927216349,0.010799092622895624,0.06190791100089008,0.07046131263182653,0.16029975868491314,0.1707219846580663,0.0019319497787457784,0.08624366037292114,0.07822989354145285,0.10745256766569358,0.11040288480516357,0.086829088724227,0.00941570593126766,0.01415133472897785,0.15126192832115054,0.1877448574491521,0.18173666292675728,0.02947677350011877,0.07349581420356875,0.04852997744600032,0.15107928347144042,0.11560691562026637,0.06049965151315395,0.1874358778689303,0.0016664510754482277,0.061905059644744714,0.08641172328610379,0.16483518364431415,0.03717822226429575,0.022231872344751304,0.05881530141466227,0.07966838521772189,0.06552108400143056,0.024603711162098564,0.10370641026932503,0.005402300707288754,0.035689510352127043,0.1773275434422603,0.03679430289218928,0.12260096587170942,0.13769860564982586,0.16061463227437375,0.11366529787165676,0.06360907747270464,0.14592259525451615,0.10513169179138422,0.1649489846504087,0.13873532237672404,0.05830706929214551,0.10283208701924358,0.1617586825245225,0.054885058301047174,0.18058149380659339,0.1345722348610824,0.1517852851254886,0.009412953758024445,0.04013830958746021,0.14313342561811618,0.13690903979053318,0.14475505760634913,0.10887648271591877,0.09353834395044146,0.16015186044625757,0.06138864087394032,0.03251249302615396,0.0943300780722085,0.06601869567688637,0.19400178317006933,0.00459859074708966,0.05078761457990284,0.19905561027964278,0.02363502175062351,0.1521239473014322,0.16060654003028102,0.1868449275980547,0.12857137465175433,0.051871602374482295,0.19060981935846835,0.13383742802504212,0.011396597980983136,0.18964964831681796,0.06779526136405734,0.06493676510129519,0.03838866539981396,0.052307874091748155,0.13191117293589447,0.09534484356143134,0.1444708243106533,0.17514905728482405,0.10796369151025981,0.11868042400259733,0.007520186964674336,0.19736273736185825,0.16875639212425542,0.05659319659669744,0.13147754721423013,0.18056130921033595,0.06711039781870753,0.023101128110301208,0.051675090928542305,0.15512162834229415,0.06381752352950057,0.10792132286545703,0.010031500194058386,0.06404798533410556,0.08731329154596118,0.12231347509860574,0.035435522122416074,0.11321127332440106,0.15630816549790316,0.027829135335351876,0.08343169810682745,0.12505105610042172,0.010183061454205467,0.17252060742828967,0.17716631241378283,0.07190607735985464,0.06770594457121067,0.010462787408745157,0.06212860645732246,0.039907844400979324,0.04867071813286215,0.0067817845158971496,0.19011624029137253,0.06988333608483757,0.1027931711235258,0.05432127517143917,0.12252515966969275,0.03356543766209126,0.09899886125861315,0.05984448716450852,0.14010549431741856,0.012612261653079005,0.05713063225766164,0.19354288379300916,0.10300532362290049,0.07686905672623623,0.05733923790202629,0.17574680974614482,0.03351282425670084,0.043250198335002966,0.03215497689537248,0.0059581276944623346,0.17294418429605268,0.12112454653483794,0.14919843584451092,0.18918339385016011,0.012879538576926608,0.1303741785795367,0.14244257600599639,0.1341796357633089,0.050858440289481034,0.01597784685169885,0.06921883636489148,0.17823093175198973,0.0790097974273289,0.0075581521013064375,0.17771772382191398,0.11506513562161547,0.011655711786156476,0.11019961409440625,0.15417434284209675,0.08214220328121034,0.061754745987290964,0.08699283748154657,0.009547794944958544,0.012652646415802061,0.15751963628938342,0.16312999301075554,0.13206606990750527,0.0562957595029991,0.16175190700785788,0.09038156036040484,0.032875433458270244,0.1765357246097508,0.04255879604537349,0.066256022488122,0.033342463817355665,0.05465521202367225,0.014681512973412759,0.029727638154024127,0.15480359052176637,0.0802294972814559,0.05529060794460072,0.025933106653809147,0.06872120769616448,0.07691576317485055,0.010593733957506936,0.12134864262034838,0.03729032920281683,0.09552930238328372,0.19948108524449856,0.1296695668319169,0.09837642287033939,0.16724181737187627,0.006062407925837299,0.0028942727086816336,0.10964355260571575,0.05473012727901758,0.176231366027872,0.022144567380309035,0.18403540077120853,0.022693414251467425,0.008857607120431066,0.10512923218735937,0.06245246974450147,0.03860708986565529,0.19094253977976094,0.18408138081081013,0.1527804592997915,0.11688699667777068,0.01565238802943596,0.1925374099504571,0.08846566780369503,0.09433996787418844,0.13625321547920582,0.1775651700432401,0.13774158629501718,0.06980506895303665,0.07595377488342986,0.16820130363321506,0.1385429293477863,0.02091101760716496,0.13253592992218755,0.19591243123653937,0.049323407595874974,0.1801453969038761,0.032031286187315815,0.1833566495315433,0.10302369294649272,0.1956885101014724,0.15126405564677137,0.1914488327011156,0.19945549575971275,0.0181721230536124,0.039961048621756895,0.10191772040313621,0.19389120598599213,0.1584723436073141,0.13538098530165238,0.050611570341868806,0.17757722204123316,0.10820210268444437,0.16927477766823135,0.05412050950661667,0.09368523297859395,0.15564394771114554,0.16815262253362545,0.024842593538638137,0.038196104260118435,0.03312297641601108,0.1168197960522761,0.14302636791908224,0.14921723946379598,0.0587945512630883,0.15343295542237292,0.051442084967236124,0.18186879052486404,0.03753497843694245,0.17251602389037904,0.13298958485640996,0.17798051749232072,0.17652151291669538,0.1681912919586361,0.016275300914209322,0.07718015989301792,0.11791878253812471,0.010056106953199962,0.147104796481963,0.016922895618496536,0.12053434891208813,0.07494174629789989,0.15057504889285978,0.1231801809606492,0.11545238370364502,0.09619282171441307,0.12390544331946995,0.08277788895433025,0.1666982391029165,0.004627988039293873,0.08574954867365468,0.17700464521088577,0.19365116064305676,0.10236083146778517,0.1305570919435791,0.10746786265088151,0.05827756559864952,0.1416251684299253,0.03989986315248344,0.17887071424388232,0.16174919790601053,0.11191433883902945,0.021276396628756578,0.16920815631486308,0.03734894910870743,0.14547402716851132,0.021776623782998075,0.11137510984559316,0.13611745194503166,0.01587433941839298,0.01886870955734801,0.16919861419430615,0.16201887504931656,0.021353780321248596,0.1737625467589727,0.15290785154085637,0.03257856311630727,0.12360161712582635,0.06554919522534619,0.031805132878371105,2.7094586939835352e-5,0.14547028466104434,0.11640125443682936,0.1869750052406554,0.13393049857298595,0.07245063685404789,0.13574110496428968,0.03315958102547874,0.12948440855575935,0.13319489509124877,0.17733031195601995,0.050212381050665306,0.15046494994703086,0.19293035218265722,0.002635606055049866,0.14088011991267288,0.018023721059328368,0.08451486821860038,0.09144502170688683,0.17927862358944582,0.13120580463891823,0.045784757028754175,0.018023898282821717,0.16229547882875295,0.03144113175032048,0.10385302673631536,0.06829867267705465,0.13324950573580782,0.049068858717813725,0.13219102993867946,0.17307507511028547,0.08173544932315041,0.1351488437869656,0.08979633324045536,0.16358374271041076,0.1487394083374379,0.12312753664269352,0.11864360893898739,0.052742111605819236,0.1863356682441354,0.159250874555263,0.042052661570495836,0.13516915308387842,0.030440897380566368,0.11687502178967724,0.1163135329813243,0.115189343836159,0.06620177709063323,0.08000778521929974,0.17421507983547616,0.17868424186727128,0.060957999163266365,0.0022311521442055504,0.1381693924808842,0.1158878143672137,0.06622547722743831,0.05226682203470859,0.07630706517855708,0.0225346914497508,0.15070190498297645,0.03773612722171023,0.12840566507858756,0.18477757119195354,0.07100806467933789,0.1685417996395429,0.11892733202491952,0.09906227310039642,0.090281818611146,0.04124996590747703,0.043602597416840805,0.09421824278636581,0.12372750731211646,0.14678592048818873,0.024182512058373497,0.05549015160394553,0.11378066972554408,0.03994449302348917,0.020602334790559153,0.19177257722001628,0.08314591407199674,0.1538455109203698,0.08548897407087064,0.08739135443652901,0.02412102099819742,0.18959537251504588,0.09814408354012341,0.08228075591597768,0.02646170689670542,0.10918639190144708,0.02696690587371773,0.024412325872463916,0.192173895597275,0.14457708846864414,0.1590401127503631,0.14658588335064407,0.13385268019390906,0.04250799742182472,0.04376801599274685,0.19622476726633106,0.020446301873863607,0.004041955848835421,0.11471074062379767,0.15537561076872827,0.09344375341817633,0.15453880406908174,0.18739739418178153,0.12256559797218505,0.05774423329685439,0.04940906832093237,0.11006800260918698,0.16750031168782603,0.06708860256850264,0.021305932034537234,0.003504395404462235,0.12035105918337008,0.09343871637897397,0.08531355249867519,0.11152801349452585,0.027868962221864503,0.05626765061686365,0.0735656468320196,0.14226385366389013,0.08735604726862643,0.17272225626426835,0.027922497781318792,0.15131781693275276,0.019814585514041607,0.11829715317650882,0.09130059169753398,0.1534211825360441,0.18647941648616745,0.10793163617761259,0.16155271590221557,0.1567580942049879,0.0970903781629101,0.02846601248181706,0.13569175998373986,0.09263999695936853,0.09214228913922624,0.02509306186397238,0.18919204612444288,0.033913231078416706,0.17974945797403208,0.10890719210710023,0.14274550974366243,0.1499412910182307,0.025184518280611502,0.17203562035470435,0.020181480544773714,0.013725700651902484,0.018761901249460335,0.10555630322062265,0.17782532092847175,0.14746453999991044,0.045792981680271266,0.1551238267439745,0.007058409869432758,0.19725012924838936,0.02584323729031737,0.06694448364699822,0.103788405105318,0.0626841644010924,0.18776226715157396,0.015124886649734215,0.16405092736594382,0.13719657266513896,0.1958123150687118,0.06532722502269227,0.007374701371880699,0.0686925023414771,0.13259984922400236,0.07710637511675614,0.05767205817232242,0.004501599694238534,0.007204297581729602,0.11717144890864253,0.16177371378857705,0.03638389420550841,0.12326429168877905,0.09755732278055587,0.06435439130966794,0.033624974885224555,0.18262520661421858,0.16121206341273756,0.11158494753910216,0.1936525609225274,0.12845518713216034,0.18352439374639662,0.05675570641673793,0.0518303094471873,0.11127805990361735,0.07211081902123158,0.03394505826365148,0.08358898015663355,0.10722105821620205,0.029892332350234075,0.019195431699569013,0.0815231696273993,0.10978957822059976,0.035475545980883094,0.08037740322315484,0.19287963297342028,0.063523497309802,0.12193390648955443,0.1555332078788222,0.058469286138650434,0.013485562135831143,0.020912857942789787,0.031801948073854815,0.16880992230395353,0.19287517334249707,0.16756726384614465,0.0685053526317128,0.19358574613196433,0.10892962240766352,0.16150348996859704,0.17852469016593964,0.10801238055927818,0.07100896820649276,0.005967504507950761,0.016157182073965482,0.07887245459881945,0.04688837866512805,0.00921315488115253,0.08058140113920356,0.07878539325720371,0.09837143277401764,0.08417522393515192,0.030952342899743846,0.09381991534806673,0.19433445575676328,0.17737411406540154,0.1554193346650441,0.035270173000009876,0.0493216219343017,0.12323818245266507,0.16635394965852252,0.11285932682909677,0.021467328599412073,0.19144062940937429,0.19522999228389004,0.021504962578752274,0.0854068191695673,0.1246716988840364,0.18876290191901296,0.19348655553103922,0.07779929100085994,0.1535489530661987,0.187927960926626,0.1579982460547182,0.18296442532267998,0.17439509254330746,0.11914656341418128,0.17259665788942422,0.17413936991589707,0.07697901417478828,0.008389574190772287,0.15898062557880605,0.048358785695414054,0.07152046214583248,0.02856712251852325,0.06399034247534399,0.017592123413812246,0.039270324198424425,0.06284987774488818,0.15446055335997283,0.16686519174640113,0.1670522629051744,0.0006824171431262017,0.10631230730367616,0.035217997100508436,0.11535246696948312,0.11891722846453573,0.028941787711160405,0.17480658201023386,0.02569749285570593,0.05823335538443186,0.0747362380818926,0.08047779079789096,0.18642822289361166,0.1899424848522859,0.0504632406137894,0.06631090434393783,0.1767103738279605,0.04680213389362456,0.04769665863392865,0.0011679920842885495,0.12234226650071651,0.13978941880717383,0.08422967431426298,0.05549855057627631,0.14279299923638483,0.02993095989882333,0.17238336345306704,0.024810405638786028,0.17427989095924118,0.1548683234642919,0.09708592204448876,0.006831354936099432,0.08626922818107202,0.16823591078315048,0.11287336107803099,0.07238579302380646,0.05525901926445265,0.1585384899117108,0.17481491678230024,0.04527294631949244,0.124561676490899,0.14583355580052362,0.11760902362701504,0.06803066984948179,0.008378400262356324,0.09448009795915585,0.18171438710615712,0.13923838053456788,0.014513262026340802,0.10629759486824959,0.11692103416018088,0.14935100986522318,0.15900451200999252,0.10728011629031592,0.09631851422053904,0.17665038654431672,0.1896611726392089,0.05409145341544735,0.13962510998324112,0.12963683704936813,0.11286779601208496,0.15601621143261607,0.1305152894690927,0.06953569194332264,0.05128383677982034,0.03888919108670019,0.1592000077035911,0.0032627993961687365,0.19983121731727196,0.1562414158811042,0.04674332047915808,0.05160180722285817,0.15252332487825482,0.11234661846249719,0.010035260254951562,0.1299725394650336,0.1417281752492567,0.07393542023819824,0.11332991317760724,0.16315432731888813,0.011777772806429089,0.1410139574896841,0.0877717214186077,0.10513840538665434,0.11826726975860402,0.09416326175465972,0.12371984914975945,0.05648735251668407,0.09474936488778117,0.023104340777315404,0.13057087679667362,0.1763586240375138,0.1996681382356369,0.11794204160385365,0.033885834623787095,0.0033504766052539826,0.03612405168462853,0.13144502700671798,0.16785681641657965,0.014387701917373753,0.12450549674959932,0.08368967488025413,0.10631051839477337,0.008362823357557003,0.07961752716908732,0.020610148245568994,0.05987845639592298,0.04937933968453674,0.08842966420061736,0.028320612649420786,0.19271481518630834,0.06849874760446686,0.04271445047158378,0.07822775411425709,0.017675438361741104,0.034664648036886674,0.11249563403222013,0.0644673402587113,0.1504516235554239,0.13714728186726863,0.09143085053251215,0.06590191748901564,0.1252501821814104,0.020235158892664362,0.03330683219342747,0.012367693068344421,0.044105571020951785,0.14680506088939657,0.06820088176502188,0.10172008646518141,0.14695504187747918,0.1898757358410395,0.12612624156039512,0.0877629777370065,0.13331003296783295,0.08394289603885952,0.026774389911603302,0.05503760989219608,0.1921932409145943,0.0675897571033461,0.020048789265173728,0.012404260370263476,0.1056031277206056,0.11663267959382528,0.09141842020824696,0.1743685353294088,0.1933133493265627,0.019347673197315274,0.18026279295746472,0.012309645825132566,0.13826352544064544,0.0629273862529545,0.10779997810274052,0.09044696953183623,4.190183292709371e-5,0.16329905868452352,0.16482537625230345,0.170769471555563,0.006463126150745424,0.04626697581995001,0.04126785751409981,0.17725709660651912,0.03030954130022159,0.12734308074979933,0.10737688314934442,0.06545966806827015,0.14005713116239127,0.044840659064987555,0.16373379498682264,0.03068758290930598,0.020001660834640368,0.18425396174742611,0.02873987117041428,0.1277177683515896,0.10603293612611951,0.07350257442434245,0.028240040589967742,0.12890172825298937,0.18740947062391156,0.0702261160764318,0.1416215701704606,0.05092194741919745,0.06652161719593082,0.0735202607561262,0.0062195509425535984,0.1878337093173521,0.0894076256804858,0.1817983240086706,0.09411109883919688],"n":[70.0,89.0,5.0,37.0,67.0,76.0,86.0,58.0,87.0,42.0,91.0,12.0,51.0,100.0,10.0,36.0,70.0,89.0,12.0,41.0,72.0,93.0,48.0,97.0,78.0,15.0,9.0,58.0,16.0,59.0,11.0,49.0,1.0,3.0,82.0,52.0,72.0,35.0,41.0,7.0,89.0,7.0,54.0,76.0,33.0,99.0,59.0,31.0,5.0,43.0,33.0,72.0,59.0,24.0,8.0,33.0,77.0,74.0,1.0,37.0,67.0,90.0,87.0,52.0,39.0,86.0,51.0,29.0,7.0,1.0,9.0,30.0,67.0,23.0,49.0,49.0,78.0,13.0,99.0,50.0,42.0,31.0,8.0,7.0,84.0,2.0,17.0,44.0,61.0,21.0,95.0,95.0,34.0,64.0,46.0,7.0,81.0,94.0,96.0,51.0,4.0,47.0,23.0,63.0,55.0,88.0,9.0,24.0,17.0,31.0,61.0,53.0,39.0,62.0,8.0,65.0,44.0,82.0,74.0,20.0,26.0,67.0,16.0,47.0,93.0,46.0,74.0,8.0,26.0,20.0,35.0,80.0,4.0,28.0,46.0,51.0,62.0,70.0,22.0,88.0,25.0,81.0,69.0,3.0,60.0,68.0,52.0,90.0,45.0,33.0,49.0,71.0,48.0,9.0,40.0,42.0,6.0,22.0,96.0,77.0,71.0,3.0,58.0,40.0,25.0,16.0,5.0,69.0,91.0,8.0,95.0,99.0,5.0,57.0,26.0,62.0,90.0,42.0,87.0,94.0,89.0,99.0,36.0,30.0,41.0,31.0,40.0,40.0,66.0,8.0,16.0,29.0,66.0,59.0,52.0,20.0,24.0,72.0,26.0,12.0,49.0,19.0,66.0,60.0,32.0,6.0,38.0,70.0,49.0,46.0,30.0,22.0,51.0,6.0,94.0,64.0,86.0,39.0,16.0,30.0,54.0,42.0,14.0,55.0,18.0,28.0,42.0,77.0,74.0,79.0,53.0,91.0,9.0,13.0,72.0,84.0,90.0,15.0,12.0,87.0,18.0,87.0,63.0,90.0,29.0,48.0,18.0,22.0,25.0,20.0,50.0,73.0,32.0,62.0,89.0,37.0,4.0,14.0,34.0,94.0,38.0,15.0,52.0,82.0,44.0,72.0,63.0,53.0,3.0,52.0,88.0,73.0,54.0,18.0,84.0,59.0,54.0,50.0,16.0,88.0,21.0,80.0,49.0,94.0,57.0,16.0,79.0,9.0,43.0,20.0,75.0,32.0,73.0,20.0,63.0,67.0,13.0,41.0,69.0,34.0,12.0,60.0,4.0,35.0,44.0,72.0,51.0,18.0,44.0,33.0,32.0,48.0,69.0,41.0,34.0,80.0,75.0,63.0,92.0,76.0,4.0,65.0,26.0,37.0,79.0,7.0,2.0,77.0,89.0,58.0,79.0,100.0,68.0,41.0,14.0,92.0,31.0,90.0,87.0,40.0,6.0,29.0,27.0,99.0,15.0,82.0,72.0,54.0,16.0,50.0,81.0,11.0,97.0,82.0,0.0,49.0,73.0,3.0,65.0,69.0,50.0,58.0,29.0,99.0,23.0,78.0,12.0,59.0,50.0,21.0,45.0,56.0,22.0,30.0,51.0,34.0,75.0,27.0,77.0,22.0,80.0,98.0,21.0,27.0,63.0,45.0,85.0,33.0,44.0,39.0,1.0,31.0,53.0,46.0,10.0,8.0,14.0,59.0,46.0,52.0,7.0,19.0,27.0,7.0,74.0,2.0,95.0,1.0,50.0,28.0,9.0,20.0,12.0,95.0,9.0,6.0,35.0,7.0,93.0,55.0,60.0,35.0,15.0,72.0,23.0,17.0,23.0,88.0,49.0,88.0,52.0,36.0,4.0,82.0,19.0,33.0,66.0,7.0,20.0,66.0,35.0,9.0,0.0,23.0,26.0,15.0,16.0,73.0,81.0,100.0,47.0,53.0,58.0,22.0,22.0,15.0,66.0,94.0,7.0,0.0,91.0,7.0,21.0,92.0,57.0,46.0,65.0,49.0,24.0,21.0,11.0,86.0,47.0,21.0,4.0,100.0,45.0,14.0,97.0,99.0,53.0,99.0,98.0,89.0,25.0,33.0,16.0,80.0,54.0,61.0,90.0,3.0,96.0,64.0,88.0,80.0,19.0,71.0,17.0,6.0,79.0,54.0,56.0,85.0,37.0,22.0,91.0,22.0,13.0,17.0,63.0,72.0,24.0,6.0,12.0,50.0,36.0,47.0,35.0,46.0,79.0,29.0,84.0,72.0,49.0,48.0,32.0,53.0,90.0,34.0,34.0,91.0,85.0,78.0,47.0,68.0,95.0,98.0,65.0,93.0,92.0,61.0,37.0,81.0,19.0,40.0,41.0,39.0,31.0,18.0,63.0,82.0,48.0,86.0,52.0,0.0,41.0,84.0,31.0,45.0,83.0,59.0,53.0,18.0,75.0,50.0,76.0,94.0,81.0,65.0,5.0,3.0,37.0,5.0,45.0,92.0,58.0,6.0,37.0,48.0,26.0,35.0,93.0,88.0,74.0,7.0,95.0,30.0,62.0,58.0,43.0,96.0,39.0,87.0,30.0,12.0,21.0,37.0,26.0,16.0,79.0,10.0,31.0,20.0,58.0,96.0,31.0,64.0,100.0,50.0,39.0,87.0,89.0,61.0,65.0,46.0,100.0,94.0,56.0,53.0,49.0,78.0,98.0,34.0,17.0,51.0,57.0,78.0,49.0,78.0,66.0,64.0,45.0,14.0,10.0,42.0,100.0,67.0,75.0,49.0,67.0,29.0,23.0,65.0,11.0,4.0,60.0,10.0,54.0,51.0,68.0,79.0,46.0,75.0,60.0,8.0,7.0,39.0,93.0,14.0,5.0,31.0,13.0,67.0,31.0,21.0,73.0,23.0,0.0,21.0,43.0,2.0,37.0,77.0,27.0,50.0,37.0,60.0,77.0,30.0,69.0,66.0,4.0,53.0,56.0,82.0,35.0,68.0,7.0,51.0,68.0,43.0,70.0,92.0,99.0,49.0,41.0,48.0,3.0,2.0,48.0,62.0,40.0,24.0,52.0,24.0,6.0,25.0,55.0,40.0,82.0,75.0,6.0,66.0,92.0,83.0,14.0,62.0,43.0,89.0,79.0,80.0,100.0,45.0,74.0,94.0,17.0,3.0,27.0,40.0,39.0,34.0,32.0,82.0,39.0,47.0,89.0,74.0,78.0,61.0,17.0,34.0,63.0,36.0,6.0,99.0,88.0,24.0,41.0,99.0,96.0,83.0,51.0,91.0,58.0,19.0,95.0,92.0,46.0,85.0,94.0,63.0,48.0,94.0,56.0,52.0,23.0,97.0,17.0,71.0,55.0,4.0,8.0,100.0,5.0,13.0,38.0,24.0,5.0,53.0,13.0,16.0,72.0,32.0,64.0,95.0,35.0,70.0,79.0,16.0,96.0,79.0,76.0,57.0,94.0,90.0,60.0,45.0,58.0,90.0,74.0,27.0,64.0,23.0,11.0,73.0,10.0,25.0,18.0,43.0,80.0,15.0,76.0,6.0,2.0,17.0,73.0,65.0,4.0,47.0,39.0,63.0,35.0,22.0,12.0,20.0,6.0,14.0,30.0,19.0,32.0,100.0,52.0,1.0,4.0,63.0,95.0,12.0,75.0,35.0,46.0,82.0,28.0,32.0,36.0,86.0,16.0,58.0,12.0,15.0,83.0,45.0,83.0,21.0,2.0,40.0,28.0,11.0,50.0,33.0,17.0,60.0,35.0,89.0,57.0,84.0,91.0,9.0,31.0,53.0,96.0,53.0,67.0,38.0,43.0,89.0,95.0,38.0,56.0,7.0,78.0,39.0,77.0,61.0,7.0,91.0,82.0,8.0,24.0,45.0,89.0,38.0,40.0,96.0,71.0,1.0,64.0,61.0,5.0,83.0,58.0,90.0,63.0,18.0,13.0,64.0,96.0,71.0,53.0,42.0,74.0,61.0,70.0,9.0,17.0,12.0,84.0,97.0,52.0,59.0,95.0,66.0,70.0,4.0,0.0,70.0,4.0,60.0,59.0,87.0,4.0,18.0,100.0,63.0,49.0,70.0,7.0,4.0,23.0,79.0,78.0,88.0,48.0,45.0,9.0,39.0,14.0,85.0,55.0,21.0,56.0,50.0,66.0,59.0,90.0,63.0,61.0,65.0,11.0,23.0,70.0,53.0,58.0,75.0,29.0,98.0,50.0,57.0,50.0,55.0,23.0,59.0,16.0,46.0,83.0,92.0,54.0,19.0,73.0,9.0,73.0,17.0,43.0,98.0,12.0,38.0,86.0,61.0,6.0,65.0,54.0,76.0,16.0,85.0,92.0,16.0,64.0,46.0,57.0,73.0]}

},{}],198:[function(require,module,exports){
module.exports={"expected":[-6.265284768884075,-21.594287642358694,-3.649253072241167,-0.0890778693941373,0.0,-0.3979811013873139,-1.4970558447847016,-14.168424526083324,-2.374282094799132,-2.626977423028771,-11.895098568986128,0.0,-2.8246950126163646,-1.4813167806397751,-34.20004463567277,-3.395957885071754,-3.117265903058237,-8.225703921237628,-12.056522169218852,-73.75767174802631,-3.023999641111256,-0.9518400676313683,-7.069486694224637,-32.92047776946042,-8.905023053013318,-10.276832117529974,-42.96884453080176,-2.1473438962066718,-41.2417040451801,-1.7555696836875458,-12.308112640502555,-1.121804746834714,-16.217827782861928,-0.38975021698083695,-15.798250803735797,-11.388117891094424,-15.066915960212683,-26.0195529502164,-6.373659851232018,-0.12012216143211545,-3.049198197544853,-14.653813007903526,-0.9585090003721752,-2.66190726621765,-22.833923124434722,-7.039693180129397,-2.7633160663675973,-6.378238037593398,-9.670797307247204,-4.490669289650871,-0.3671676655601127,-5.28382703520063,-13.945239950249979,-9.006509227668136,-7.0774091465157785,-36.734244385663786,-7.7075301767145525,-2.83901899576588,-0.830907869917195,-1.6135956560443623,-1.504081139185593,-22.20829633076384,-1.2894995284160438,-2.3778521277406974,-11.125898305091551,-11.047792989675665,-5.248355311350911,-2.338063876708274,-1.2393463572778087,-3.5180782221867437,-6.3733782366513845,-32.221863094787416,-1.220040125213602,-4.459387617022578,-6.68595754331932,-2.4426250064557626,-1.2441086523635774,-6.4990422367698155,-5.621872361057397,-20.91769781913393,-0.12447154348982156,-26.26695793599822,-10.719346233536328,-20.87983482914251,-1.0542051026680672,-6.267170368823889,-15.83513498996156,-73.12953170596273,-10.866903113908684,-4.360978872230174,-1.1216313462867045,-4.242701513512987,-1.7106918787840482,-1.6101706528229465,-7.744290263160416,-7.740713623026018,-0.4824836319811518,-1.6860675198652213,-21.05395573207115,-46.63396404223416,-14.197670104351678,-6.91656142663758,-1.9382137570966012,-9.26581871743502,-0.23601891438777697,-32.04520536698641,-9.539668588517838,-6.8769801943122655,-5.199512698754142,-19.43623985629747,-0.12845967580475862,-1.619457328613302,-4.7469815818445795,-2.01422484713477,-45.185529786609195,-8.978812449046453,-21.363875546732686,-3.287430535885101,-0.9349734413397754,-35.873695140659045,-2.2344332869837444,-1.199661575382748,-1.344973356128833,-0.33118536813164257,0.0,-1.5223174413371807,-16.383616350716267,-9.811538501621705,-1.6289142855240648,-11.853318279943165,-9.217323508360215,-0.17113765633668052,-43.54155942995714,-0.05035601168445287,-10.375725808116155,-1.0984215435965612,0.0,-9.747232489687352,-14.962731114042414,-4.766414190537552,-33.28850110250849,-0.5660723662778647,-7.2267342745783125,-42.84084080939681,-5.383487283086932,-33.25917913398647,-32.838502646339215,-5.085604596927811,-1.5159275558394107,-1.7267463543507586,-0.3100688233982986,-17.284615321348145,-8.440335303569558,-10.548986134121408,-26.90860025297435,-2.793944026496289,-0.9069243105168547,-6.602838516132735,-0.08303908299392705,-11.587863442824421,-22.237063162240077,-2.719748556754678,-4.014581678015341,-6.4907283235578515,-2.125418564317555,-0.979438304302867,-0.56779594050427,-1.1571044756689692,-1.431967180029328,-2.0564180427366225,-9.163860333172398,-11.856906608452631,-1.8153085456690516,-1.8826639228473796,-29.905662529073744,-1.5264074378621273,-5.597648821520865,-4.7506857427069775,-0.9648429192828918,-1.1941433389073979,-6.328848415034383,-1.169313140495301,-2.9471424484813724,-17.753581792613076,-1.5972230768449922,-30.89212056820917,-3.5459067030187708,-1.038488123874048,-1.3396245743160993,-4.555501220613866,-0.7003826988345747,-2.8096365791743123,-0.2816408422100522,-0.9674287833352646,-11.01178927043893,-5.975297516118731,-8.375539722572958,-15.616737447124637,-0.09266715101908887,-1.6001974345138488,-3.9775627060860055,-1.1733695040164906,-8.92211024949448,-1.543102797934279,-10.81330075627409,-1.127836594716454,-4.503223669844868,-1.8293947818258027,-1.5184136795989922,-0.3041675424376877,-5.222433939168343,-7.323117615525156,-4.040974531448393,-22.154811454641987,-21.825847574577953,-19.69475281208401,-4.369339753908414,-2.8508718680544898,-22.846476680924525,-13.64170236141636,-0.907183340471966,-1.7700265011601755,-6.167171545298124,-29.920679120585227,-26.046830937669057,-38.16351758965574,-6.3022123120696545,-3.835269203344362,-49.49025022985673,-0.9859744704151832,-13.84900732067775,-1.6247324825602592,-3.7154682881136503,-1.8053396048019201,-15.356353251357568,-1.1137105350675818,-13.365051236642715,-11.599825784432266,-23.957823223291722,-7.781480534308621,-6.731819468555356,-1.9785625434840148,-8.611160427270914,-2.30676674433058,-19.722136792796196,-1.7570962104935315,-3.080869921009889,-1.2202387257033322,-3.4871040959204613,-1.258035938214525,-2.8619716235865322,-3.514699375137795,-4.1302657961849265,-7.1101696638960075,-0.987742471255767,-16.47135178000857,-0.6984469697300444,-3.42048079639446,-17.108064043462107,-1.782833936516863,-11.978480193649023,-1.0686578118685042,-2.458313660146536,-2.858367490660884,-31.137361954608277,-33.474509513311126,-4.754544363036205,-1.8810004742178832,-1.2244669573571232,-13.907746373656629,-19.528613610775786,-14.83548225548378,-3.053325228472683,-5.09866891195956,-0.13348836614275153,-2.069359191171337,-5.8137517981493945,-5.37810054499281,-9.202672195809628,-18.996274940013016,-8.989906127820625,-2.175120221854624,-11.316838958978716,-17.92266891332699,-0.8714677828720742,-3.007911304770684,-9.0146182826911,-17.166388064651095,-5.431894877951647,-3.319685620475792,-34.5518490753643,-26.898481040141316,-26.287204767371662,-0.047664814831796756,-26.581025830695566,-0.38929123242008024,-12.882538220479134,-10.412388651647703,-2.081855468679165,-1.4931820696993277,-10.45770657110756,-6.600274928932469,-7.295583275929175,-2.7856142480567296,-10.133354442161757,-23.415716761913156,-0.2464169645744143,-3.217057771396365,-4.101948865763612,-18.009121178719518,-0.8738692446746161,-7.596545961178133,-15.832565438631791,-7.720072824847998,-8.324493438850773,-0.26829357290649136,-3.4866321768576336,-0.9686563354801744,-7.242166882037592,-3.8217902050315375,0.0,-9.778848660130532,-2.7731598693890813,-2.014870345583216,-13.164311330259887,-1.7007848172189477,-24.733245915056933,-4.993375582146996,-0.11407055707949273,-0.9363844024571366,-1.131211323259291,-14.854816295505357,-3.529782497897018,-1.7182388717746713,-4.160950954146257,-1.7375340508853787,-1.0120586889034309,-29.068822141488297,-11.727089013757764,-2.333795425556787,-1.3546972621141224,-3.0898588364983035,-13.250197892752452,-2.086418327473095,-8.92823234550172,-2.598314172232676,-1.7182584413441597,-10.380665087940876,-2.4270496948198312,-2.9752451719414115,-23.76177456859763,-3.5742171819335313,-15.985089664196183,-0.9667033350708415,-0.0580560724536063,-50.87984196450838,-0.059491000817433415,-16.538777279840485,-1.5179367407605646,-3.6425508844294328,-19.660031291301596,-1.6923298799543804,-1.0632622441103625,-43.71295011847485,-8.024034834358593,-5.216595932712034,-20.78426130575397,-15.299978819731457,-1.8399754955634078,-3.673272875992456,-2.4951349017946085,0.0,-1.8338704759183408,-1.378264801031998,-1.7504111398245736,-1.9535660862567665,-1.4085110724406107,-13.679800142821295,-4.625910402345882,-39.51088731372457,0.0,-1.5823685545990784,-1.184597947119424,-8.355724546192045,-2.6083585265619025,-1.2926773493004833,-6.193167273998742,-21.795921988193896,-4.618098983069995,-49.36001039675523,-2.8458965551562985,-26.5360701754876,-1.2518850052633863,-0.590062391045754,-1.6522995625806298,-14.170049291421464,-4.448787406175388,-3.674339881173854,-7.971470041317697,-6.2362359702933805,-0.33929165162907016,-1.6601352998061167,-13.214382073113192,-4.0754099613308865,-5.045575587737598,-0.97608760438686,-1.4979296535533584,-38.80347763464111,-23.45782848636923,-0.07015507657649271,-1.194063594552717,-19.20379643125556,0.0,-0.532909827701219,-9.494371264679856,-1.6525910357057305,-1.768939445088468,-6.321699363108818,-7.725833103439884,-29.54091601170071,-15.967298407387256,-5.505903386303387,-23.0864877163098,-0.6192127922250868,-18.280446647347876,-8.598976570359103,-16.903663514606396,-11.721410839299272,-14.138294267526515,-0.09505693509575824,-21.966846583288373,-1.0041526829200997,-31.139962044193506,-0.05065036134503192,-2.845721445433589,-1.0170020553109222,-14.63074924060868,-13.40804640696927,-0.09642228688450073,-1.4106660430796287,-1.5479059285382435,-2.0462021244739312,-9.896640626130115,-36.36930834559105,-19.075298773019355,-3.637586791847585,-1.5785698606555814,-4.378625845631661,-0.9100651230378628,-1.5032041647099543,-4.590907117896974,-14.694427224195092,-2.2938708303087516,-53.61393430293417,-1.1152878261779489,-1.2671042811179003,-1.527306737204662,-21.709770310803602,-28.95468895793254,-1.3911831550039062,-2.091258568002184,-6.628271703011031,-1.6566760466418413,-10.235174358561062,-1.5612849005352176,-7.259606758675298,-2.528453786194651,-21.096385172161835,-3.276214092342611,-6.781626302027853,-19.80141171918165,-0.9988352006529797,-30.990229025094617,-34.43375654286127,-0.8670485901098286,0.0,-25.46438271702853,-22.68278306721246,-3.0647657770587244,-0.9795601780630988,-47.54681484944713,-3.2381888932377274,-11.9218783242656,-2.9078009447060778,-10.226269519794526,-23.675976639076893,-33.22812147972691,-27.877080161670342,-1.5848384307171628,-32.44912655117173,-12.173814579285862,-0.9545557293325438,-29.723780553631133,-15.296440737700637,-0.7466887973335031,-14.696180132973309,-14.788715521730724,-8.53022770286823,-4.392966523946458,-2.5499606550348686,-8.546075564309247,-54.11625403422233,-15.181905979688686,-6.327338737116957,-3.594699435983226,-0.027695838327048652,-5.4818523941253305,-2.3465753527716697,-4.706755603552523,-0.13299712214677706,-1.6074112280714548,-0.35303347100452614,-19.25171118452386,-7.586071116846175,-13.66379840020241,-13.239573615530505,-3.4673207443713614,-7.737880742279792,-1.3976181306282824,-6.359924501022398,-1.6589028804168058,-3.206091559307742,-6.263653875843593,-0.8980215331224687,0.0,-0.9185157650433488,-10.933022474954594,-0.9520184454414173,-9.14968556459758,-10.035060028782599,-78.58048472133204,-3.2364176824561715,-26.521647681862884,-14.12852365854693,-3.9698933630570106,-1.3226639510490779,-5.092895439853914,-3.485010445906653,-32.46242122257656,-2.651025950987186,-1.5608282210434659,-22.236251132506677,-5.126430970107363,-7.886621611389451,-14.07248039389354,-19.109265291115875,-2.2777393160695487,-34.61688771647856,-3.3748753059286396,-10.888156998544524,-1.3301646833752385,-29.82882050494557,-8.414529173508438,-21.3018918867926,-27.034076958532296,-0.008084109561617689,-1.2247916710231668,-1.6896206963085785,-0.8982839723957297,-6.5140712612118055,-2.712437576768238,-10.985073995671307,-54.15523341008263,-1.1662239484315176,-1.5688337889239135,-2.3679686019240584,-1.7413930262829194,-23.853233925370304,-1.6958948584121183,-1.3811716703857,-3.291994640470044,-1.066083912612447,-3.1629601291789182,-1.5997565859643426,-1.6173836934687413,-1.4986241978663914,-48.0931520574419,-4.061473285152492,-64.75848736347689,-37.96475974692911,-3.4968603005727616,-3.4685513491706415,-0.039033799256080005,-5.5417623658366395,-12.710650469381935,-1.3627209562304032,-2.268133316846682,-3.772058592407112,-7.379429117265145,-4.399110032740289,-19.804317760368704,-0.020554334128230177,-12.516626071677566,-3.381854916080414,-1.4424222026741227,-4.045076113233819,-2.19913957357211,-1.2817616197376427,-2.51154218828849,-38.206506612109216,-2.53248199297005,-20.433362235432313,-0.39730170567523443,0.0,-14.139447862120544,-5.090014523149593,-1.0438518458524537,-2.686385186075281,-0.9874983576217163,-4.216331045997199,-2.2329451450866493,-1.333033771885869,-5.934915755127155,-61.89134100979441,-0.98762462074857,-29.740596277102355,-5.362876129762916,-57.62596550883718,-20.33095147111834,-4.196512926392661,-47.32361287469915,-3.6008792249684687,-0.2653400102005738,-1.5266460430395754,-25.299293566567723,-4.727618936487355,-14.258750719236115,-1.3180789743214854,-1.3904781146831253,-0.6039550087374654,-0.21824846875299397,-6.610853348592197,-3.104635292583465,-23.288540507037702,-6.354386607786882,-14.664646887251745,-1.6591631439156653,-2.099199112765098,-5.158540266771085,-12.126107159327043,-4.731608692941251,-5.390454154330571,-12.984462421925329,-0.9165475119009331,-0.9408562986423379,-3.7391821729133206,-1.3745677976614978,-5.899631306706574,-20.577446690301304,-21.777997535834366,-1.2166834867777558,-21.626060580392103,-4.392765857948238,-2.955310734430435,-26.20468500590613,-1.3323310051824016,-4.240180782299557,-6.769267985970837,-10.116084750291666,-4.805053619683406,-4.304879840476916,-2.443399488029174,-0.5255707281460805,-8.812452581274112,-0.414516734725462,-0.20754597378857817,-1.5558497682748178,-4.591672751714711,-0.9827586224451422,-2.7714624127590195,-7.809174936976722,-2.7573545839538083,-0.0014526426228089159,-7.4824960218318814,-6.09526585951401,-5.057933108144624,-1.9021247466643407,-3.9163072220514756,-4.4988048243579275,-54.197998102267086,-1.9020725846510897,0.0,-2.6206884449461603,-35.026122120594586,-1.2074967445207863,-11.036441761220367,-3.7330478580681863,-43.98846436021777,-3.653168646997065,-14.708404420018178,-38.858028517969586,-4.309488565154909,-5.621232741664649,-44.71489417764081,-15.785910073686138,-4.729853127175206,-2.2168434326601507,-29.519499306180503,-14.354989403479705,-1.2119701615849416,-1.059571067146108,-2.37269264004049,-7.570716764312435,-0.38035398962698697,-0.14951652780584068,-12.858693987330174,-31.272767218967523,-3.1273634508962838,-0.9262761104619697,-0.21887441549421927,-2.443984087638391,-1.6175380573409681,-5.698473577523329,-15.301055145644936,-1.191336782557889,-23.6398902407824,-16.107100388582445,-42.529378671664645,-8.165739246632494,-1.3264145629300996,-12.813548541847457,-3.7902173477286976,-2.2634966589444563,-6.031468532709358,-4.0376766576325736,-6.718670978412698,-1.2332788100594818,-0.3404197874451555,-4.108072121623757,-14.74885314695198,-1.8004638289768145,-1.3342585158584324,-10.024501541038738,-1.0577254420491717,-0.9562728969264009,-1.4823563563195754,-16.347315846516796,-15.75653879346505,-3.1110847644513244,0.0,-20.278497891802346,-3.7216016061746835,-5.119054351269742,-1.4202950714885916,-0.22354899214809246,-1.5585859709581382,-28.82415780811988,-6.203410934244003,-0.9731744645951123,-8.485201676972798,-3.990634774355471,-2.932877295908921,-5.98685484728998,-20.953701752701985,-7.505764797111915,-1.2078929726117267,-14.7455391204824,-4.415632742882202,0.0,-15.114513199505243,-0.21157846489563625,-1.0270019968678163,-7.094405040963051,-4.961410464571542,-2.8824385393313676,-4.701238437645046,-17.65250662448187,-75.43390358056493,-13.30950268509135,-2.1135165061522914,-13.563655312763775,-12.168573243178729,0.0,-1.4428209880679912,-8.49301178472458,-0.18883824133322918,0.0,-4.2774960364514705,-0.9494971018860804,-3.9259943541774143,-6.595207277988037,-1.5930335269344018,-18.09387951895046,-1.5053785031321085,-4.182903542402908,-17.0188722962145,-23.672629496415748,-14.849305836088858,-4.679589568688804,-1.1977719764267294,-1.3052100327260965,-7.424292945115382,-0.04544787343663253,-0.4311849670367948,-4.51798808178714,-1.4814653655134815,-11.348374955385184,-3.9405396611195616,-5.871585661549142,-8.060150750142551,-0.913387713737968,-4.085020587676565,-2.84009929108201,-7.748320953063331,-1.5620435239019692,-10.060555898783488,-4.137652685215971,-6.067839317645721,-31.6150634954016,-1.1793154374947312,-3.4356172246529866,-44.80403103199391,-2.1533394183194163,-4.015946594501204,-17.254365762694796,-3.017836619141585,-1.0055415983655753,-5.441983553693332,-23.60262234399952,-6.228331473854764,-0.8721110537801315,-54.42639066857444,-0.9207241991310033,-1.229088457346209,-6.693147924591563,-1.221998176024741,-8.157487266161255,-5.952210236064685,-9.169597326119582,-13.969685557195774,-1.5509358687997583,-2.67141688491977,-9.454264290084124,-26.39276764104296,-12.011719483647758,-0.7126064301759139,0.0,-0.14092235723530744,-20.63022101519341,-4.712468605951064,-1.9137175456528537,-1.9872541240013326,-3.604341075756308,-0.25749809463681494,-4.873846329448773,-26.24516999634042,-1.835007938113998,-1.225563363529905,-2.941643065802231,-1.2110352857784328,-8.67097557291311,-11.648603285425946,-12.235464077912871,-4.512545560698407,-3.555076903533107,-1.1183868056679787,-7.811392764032679,0.0,-13.46249140931978,-0.32408801021220307,-1.9115960361869502,-5.103190990160275,-0.9790328592637026,-24.130707975898467,-1.0341764983032802,-13.586714446247186,-2.5696799230582528,-16.380324499119773,-20.442490437864866,-22.332966184201503,-0.9355612360951281,-30.065321802143096,-0.8973431589357849,-3.216136444754495,-1.218216456100194,-2.031513815356983,-4.6524317507637,-24.181219967872124,-6.373462431778988,-3.304255161455492,-3.0634789103803577,-1.019194937583141,-2.0291390650162215,-11.631032049540407,-0.4250763722165896,-7.791968729660628,-28.174153849438355,-13.498236675561461,-2.1410147626273237,-16.871932578370334,-10.845733723740974,-1.2515302817320306,-42.15330285820427,-4.097357995062172,-4.862989194149934,-9.297224775251697,-1.8282721716286667,-0.8979380610582101,-25.475879201506903,-5.805717355217087,-1.7415971015735987,-26.40370660048981,-0.6733298421764711,-10.34627627849528,-7.314529676029885,-35.73302576058344,-3.061193338771259,-12.96996539171888,-6.161047120374894,0.0,-2.0094904574181713,-27.02048456107737,-2.5554422112903543,-5.2413229572019375,-0.4626523300247414,-0.4486305114407245,-1.7454411767272608,-2.748911710978069,-0.36879837311447977,-5.040169864087354,-18.635138031145445,-1.870739569884016,-15.963447592735223,-0.7132864155303412,-4.150563470497822,-7.95994919036753,-0.2009797620263682,-8.489555174575703,-22.566082514926574,-9.44746748487,-4.621094843170359,-2.555215229731332,-5.277725810311154,-2.241442617724194,-9.177005384879909,-31.144214293700045,-1.5876034251824744,-38.04800207004668,-1.4233637095779168,-25.986824563369723,-48.07377335879969,-5.046910006259874,-1.442834900622057,-6.923558857754351,-11.451210636628993,-7.842336540482345,-71.68839118441123,-1.4717524704284943,-43.94124998992809,-12.959376379075348,-30.61358517026427,-1.5525415133474902,-6.833038191028251,-1.737377895397367,-2.4741758130960294,-2.84204746747199,-1.5798354818833684,-27.775612545206567,-1.457457161775101,-15.282110448890705,-1.02528171778968,-20.929485802563494,-12.737110113052024,-30.785788512159783,-1.5521359080884145,-1.7345436753570131,-33.80542493631323,-25.204804152106,-11.73431553835921,-4.118067789326728,-10.635557460810647,-11.971811728060956,-17.975042904153998,-4.258453705305803,-1.4271189121039225,-0.9068005417687093,-2.0018106568915313,-1.6036678475255575,-3.7628476086892664,-3.8818737828790666,-11.816124794705921,-10.655404623843168,-25.061246803995083,-1.5799865940517404,-5.331384432893255,-10.130801616112763,-6.182787601034516,-15.85624367221346,-1.5174565206755437,-18.82604892680344,-4.557599954005816,-11.324228607764734,-15.00850114074385,-41.60510906394033,-1.1551791812732177,-16.003906512087276,-25.626140272541036,-4.833151836676322,-5.136139638959413,-1.7927740765266693],"x":[3.0,5.0,8.0,1.0,0.0,6.0,13.0,1.0,4.0,1.0,10.0,0.0,20.0,6.0,2.0,1.0,12.0,10.0,6.0,3.0,0.0,9.0,11.0,1.0,0.0,8.0,1.0,9.0,3.0,0.0,3.0,12.0,4.0,7.0,14.0,6.0,2.0,4.0,2.0,3.0,12.0,1.0,4.0,2.0,1.0,15.0,6.0,3.0,6.0,2.0,2.0,1.0,6.0,13.0,1.0,1.0,8.0,1.0,16.0,12.0,0.0,3.0,5.0,4.0,5.0,2.0,3.0,1.0,8.0,6.0,4.0,2.0,12.0,11.0,3.0,5.0,4.0,8.0,3.0,6.0,14.0,3.0,5.0,0.0,2.0,3.0,5.0,2.0,3.0,8.0,5.0,1.0,8.0,11.0,11.0,7.0,2.0,0.0,8.0,0.0,1.0,4.0,2.0,1.0,2.0,2.0,0.0,2.0,9.0,2.0,3.0,3.0,9.0,12.0,4.0,7.0,9.0,4.0,5.0,2.0,6.0,7.0,12.0,14.0,0.0,1.0,6.0,4.0,12.0,0.0,3.0,1.0,0.0,5.0,6.0,2.0,0.0,3.0,5.0,7.0,1.0,2.0,7.0,8.0,9.0,0.0,3.0,0.0,13.0,7.0,3.0,5.0,2.0,4.0,3.0,11.0,3.0,7.0,1.0,0.0,1.0,17.0,7.0,8.0,5.0,2.0,3.0,13.0,11.0,0.0,3.0,5.0,12.0,5.0,0.0,5.0,2.0,4.0,9.0,1.0,5.0,1.0,16.0,7.0,0.0,4.0,8.0,1.0,8.0,2.0,3.0,13.0,1.0,4.0,6.0,6.0,2.0,1.0,1.0,14.0,18.0,1.0,1.0,12.0,1.0,10.0,1.0,0.0,13.0,6.0,9.0,4.0,6.0,3.0,1.0,6.0,1.0,7.0,2.0,2.0,2.0,7.0,1.0,0.0,5.0,0.0,8.0,8.0,9.0,10.0,1.0,5.0,12.0,11.0,2.0,4.0,3.0,1.0,10.0,0.0,5.0,2.0,0.0,5.0,3.0,0.0,7.0,5.0,13.0,11.0,4.0,8.0,1.0,1.0,10.0,0.0,4.0,4.0,3.0,18.0,0.0,4.0,1.0,10.0,6.0,1.0,0.0,1.0,10.0,2.0,6.0,4.0,10.0,3.0,1.0,4.0,6.0,12.0,14.0,6.0,3.0,5.0,8.0,2.0,6.0,2.0,3.0,1.0,4.0,17.0,1.0,2.0,10.0,1.0,0.0,2.0,6.0,4.0,16.0,10.0,5.0,13.0,8.0,2.0,1.0,1.0,6.0,5.0,14.0,5.0,3.0,8.0,1.0,7.0,6.0,1.0,6.0,8.0,1.0,16.0,0.0,9.0,16.0,0.0,1.0,9.0,0.0,4.0,1.0,5.0,7.0,1.0,1.0,7.0,5.0,2.0,2.0,5.0,5.0,3.0,9.0,8.0,2.0,10.0,8.0,1.0,14.0,4.0,5.0,9.0,4.0,12.0,0.0,4.0,1.0,2.0,1.0,1.0,14.0,12.0,0.0,4.0,9.0,0.0,1.0,1.0,0.0,1.0,2.0,11.0,2.0,0.0,2.0,11.0,2.0,6.0,10.0,7.0,13.0,3.0,0.0,17.0,6.0,7.0,8.0,1.0,9.0,1.0,9.0,3.0,6.0,2.0,5.0,4.0,0.0,5.0,18.0,1.0,3.0,14.0,4.0,3.0,0.0,9.0,7.0,14.0,17.0,3.0,2.0,3.0,6.0,6.0,0.0,2.0,2.0,5.0,12.0,3.0,2.0,2.0,6.0,0.0,2.0,5.0,1.0,1.0,1.0,2.0,2.0,3.0,3.0,4.0,2.0,1.0,4.0,2.0,2.0,9.0,2.0,15.0,14.0,9.0,0.0,2.0,2.0,8.0,7.0,2.0,2.0,4.0,8.0,10.0,9.0,2.0,1.0,9.0,2.0,10.0,2.0,14.0,6.0,2.0,0.0,3.0,16.0,0.0,1.0,1.0,8.0,12.0,1.0,8.0,1.0,1.0,2.0,0.0,0.0,4.0,13.0,13.0,5.0,2.0,6.0,5.0,3.0,2.0,1.0,0.0,3.0,11.0,3.0,2.0,4.0,1.0,4.0,1.0,4.0,8.0,5.0,14.0,4.0,4.0,1.0,3.0,9.0,2.0,5.0,17.0,8.0,17.0,14.0,6.0,2.0,11.0,3.0,4.0,7.0,13.0,11.0,17.0,0.0,14.0,4.0,4.0,0.0,4.0,3.0,6.0,8.0,1.0,0.0,6.0,2.0,5.0,15.0,1.0,2.0,5.0,5.0,7.0,14.0,1.0,0.0,4.0,3.0,6.0,1.0,4.0,7.0,1.0,4.0,4.0,0.0,4.0,0.0,1.0,11.0,10.0,3.0,7.0,10.0,7.0,0.0,7.0,4.0,6.0,14.0,6.0,2.0,8.0,5.0,17.0,1.0,16.0,6.0,13.0,3.0,3.0,0.0,10.0,7.0,7.0,1.0,3.0,3.0,2.0,6.0,5.0,4.0,9.0,3.0,1.0,4.0,4.0,8.0,6.0,0.0,12.0,8.0,1.0,5.0,0.0,5.0,0.0,3.0,11.0,10.0,4.0,12.0,1.0,2.0,5.0,6.0,5.0,10.0,1.0,11.0,5.0,7.0,9.0,1.0,1.0,1.0,1.0,2.0,1.0,6.0,12.0,7.0,7.0,1.0,8.0,9.0,2.0,9.0,13.0,15.0,12.0,10.0,5.0,9.0,13.0,0.0,5.0,5.0,2.0,11.0,10.0,4.0,0.0,8.0,1.0,0.0,2.0,0.0,10.0,8.0,5.0,3.0,6.0,12.0,9.0,3.0,4.0,2.0,3.0,0.0,3.0,8.0,7.0,10.0,12.0,2.0,2.0,1.0,8.0,13.0,0.0,2.0,2.0,13.0,0.0,4.0,1.0,5.0,3.0,5.0,3.0,10.0,6.0,1.0,12.0,4.0,0.0,2.0,7.0,1.0,4.0,4.0,1.0,13.0,1.0,3.0,2.0,2.0,0.0,1.0,2.0,6.0,1.0,6.0,0.0,11.0,2.0,5.0,1.0,2.0,3.0,4.0,2.0,0.0,7.0,10.0,2.0,1.0,3.0,4.0,3.0,13.0,4.0,6.0,6.0,0.0,8.0,5.0,15.0,5.0,4.0,1.0,0.0,1.0,1.0,2.0,4.0,2.0,4.0,3.0,6.0,4.0,5.0,2.0,9.0,3.0,3.0,1.0,5.0,12.0,14.0,0.0,2.0,4.0,4.0,1.0,4.0,7.0,1.0,1.0,3.0,2.0,0.0,1.0,0.0,0.0,9.0,3.0,4.0,0.0,3.0,9.0,3.0,9.0,15.0,3.0,13.0,0.0,3.0,7.0,11.0,10.0,8.0,4.0,1.0,1.0,4.0,11.0,6.0,1.0,0.0,7.0,4.0,3.0,8.0,0.0,3.0,10.0,1.0,5.0,0.0,1.0,6.0,2.0,0.0,3.0,6.0,0.0,11.0,1.0,4.0,14.0,7.0,2.0,0.0,4.0,2.0,2.0,1.0,0.0,10.0,6.0,11.0,11.0,5.0,6.0,2.0,2.0,7.0,0.0,1.0,2.0,2.0,11.0,6.0,5.0,1.0,9.0,2.0,0.0,10.0,1.0,16.0,8.0,6.0,6.0,13.0,0.0,13.0,6.0,0.0,2.0,4.0,10.0,13.0,8.0,3.0,4.0,5.0,2.0,0.0,3.0,2.0,5.0,1.0,4.0,11.0,1.0,10.0,10.0,2.0,10.0,11.0,8.0,2.0,9.0,6.0,6.0,4.0,0.0,6.0,1.0,6.0,7.0,8.0,1.0,7.0,1.0,0.0,13.0,4.0,1.0,6.0,6.0,1.0,14.0,6.0,6.0,1.0,7.0,2.0,5.0,0.0,9.0,12.0,2.0,1.0,5.0,2.0,2.0,18.0,2.0,1.0,1.0,3.0,5.0,6.0,4.0,0.0,3.0,3.0,3.0,5.0,11.0,1.0,2.0,7.0,1.0,2.0,17.0,2.0,8.0,4.0,5.0,9.0,8.0,9.0,7.0,7.0,0.0,17.0,0.0,4.0,1.0,15.0,7.0,6.0,10.0,12.0,15.0,3.0,10.0,4.0,5.0,10.0,7.0,3.0,8.0,13.0,3.0,3.0,7.0,8.0,5.0,2.0,0.0,0.0,0.0,3.0,9.0,11.0,1.0,8.0,0.0,5.0,2.0,13.0,5.0,3.0,10.0,6.0,5.0,2.0,1.0,1.0,4.0,6.0,8.0,3.0,3.0,15.0,2.0,15.0],"p":[0.9076816183089923,0.9015120021732876,0.7719865675729951,0.9147743378774849,0.8820217884544659,0.9358218202893924,0.7951282729832312,0.93101101448625,0.9034994526250358,0.9624409937904388,0.9353769374194851,0.9748267091219374,0.8682854572123087,0.756477690102026,0.9255176447417537,0.7793032616456561,0.7712272833002797,0.8683371281825165,0.7788005050032645,0.9967645085710158,0.7795313609091311,0.8917638695445212,0.9693959603125193,0.8476581100073617,0.8315311833322643,0.8840233959844188,0.9426704285829453,0.7877348218576601,0.9587449543765723,0.8271912320913877,0.7701698664283254,0.8741413478244552,0.9174148472820705,0.9458430787155776,0.9933504323699962,0.9843958055099421,0.8493819017506533,0.9503704111098701,0.890571226976302,0.9607503161442663,0.8661509259648006,0.907128690580395,0.8594111389527435,0.7731057313625707,0.816135423805355,0.9891870410237542,0.8239889910282796,0.8636854147848276,0.8526139504318553,0.81707265836206,0.8322821002909422,0.9579862672529,0.9123854753530825,0.9989117203356657,0.9392099460161808,0.8889563612376781,0.9669879805599568,0.8484173634597796,0.9493936684678554,0.8633095922129559,0.7777786094227369,0.9205366628584313,0.9361638055351866,0.8195752065314141,0.8388580542265243,0.8713743788942552,0.9762313225201409,0.7993882468176441,0.7617288980236605,0.9636294553209843,0.8825812255105134,0.9527828849968181,0.9653108438824438,0.9351109646796465,0.87260998323702,0.8474188234483726,0.7600582015049464,0.9778188779579349,0.9398233921525971,0.9609976064132246,0.9911485819735425,0.9800405472578904,0.8056864406409111,0.8501569405061292,0.8323320526361739,0.7693521625643842,0.8425747649214536,0.9899783044987666,0.9722482028310215,0.9985651811229839,0.9156507707096178,0.9927632686867437,0.8312535576605535,0.78872268940139,0.9353502744417499,0.8828367138104547,0.7856516202912068,0.8147534280305136,0.9446318014958217,0.9457755167818743,0.9588064132933012,0.7804557011703781,0.8083856620058655,0.8878278062327218,0.8886876480834816,0.95207671594779,0.9079033902683299,0.7570327987935775,0.9894949607894378,0.7565736237710536,0.9580839331717501,0.8052741050667392,0.8633728177744662,0.7724021641240169,0.9714322528073345,0.9295251191299805,0.9710884476771788,0.8130754149719508,0.8644557391652943,0.8969353355414356,0.7832201712820339,0.7743036148116998,0.9717230979024516,0.9766215143745016,0.9987238454840808,0.8753627433357666,0.8430353118870676,0.9440621167178873,0.9810087477968227,0.948353330623913,0.8553948602223655,0.8427055617263997,0.886627675726247,0.9899793423969713,0.8152003278219339,0.8439824245834904,0.9408459388401145,0.9630202383795312,0.969516962905997,0.9170816473249601,0.8506078407654178,0.7534925236418003,0.9022945146401876,0.992630621475888,0.7902523406731127,0.9751640815300273,0.9979918636240943,0.9938148535609084,0.7825897649779658,0.9730893211261653,0.9018056259230494,0.951415855570533,0.9363406068549434,0.8970330182972513,0.920948245205189,0.7756957491645149,0.8102075567771809,0.7972378312820563,0.9203151778447272,0.7650735823737101,0.9140950452344989,0.7874914354703422,0.8957226083476995,0.866923066908724,0.9025802502072988,0.8085123426897041,0.8275669128901002,0.9636676918521727,0.8205380152437318,0.8720886768109939,0.8900278655464449,0.9478763174063009,0.7908701339029245,0.8842038690169876,0.8457381673171942,0.9542172180928676,0.9242964070685127,0.8802357062871703,0.8818339397225574,0.8138762654403813,0.8958205440374256,0.8077497416914949,0.8317724251585212,0.9337922131000018,0.7975420517260183,0.9367854307097228,0.805452108325553,0.7701948687376887,0.8614758143154383,0.8901275458280253,0.7917885543750623,0.8281506914087899,0.7545446364569761,0.7851682948498904,0.9459503204484423,0.8628185428420214,0.7669347667995826,0.7755169587351356,0.9114968406045827,0.8177672752311808,0.8017361575170652,0.8087693973522092,0.8796223533301196,0.7838852246524528,0.9182388009386162,0.8493311977543392,0.7682899255995095,0.8394893176334284,0.7839278847417197,0.9505689390782569,0.967967947925112,0.8292608478238358,0.8386446161415568,0.9664526872534507,0.8031436439524051,0.9104918748660378,0.9327380500627053,0.8996881384584228,0.9488031877364959,0.7970883674455772,0.7773042343732443,0.776575873701721,0.7864176371803947,0.9931723849475613,0.9042646715555407,0.9688646263563054,0.8624865211147602,0.818559402476718,0.9962643090036118,0.8852428607551794,0.8956228727581077,0.7594157329746382,0.9546276802212634,0.7755363412582837,0.8275559187832091,0.7569730450557008,0.9470701022249087,0.9303221059649345,0.986615909295919,0.9252665013382166,0.7970299132360155,0.8133614271832735,0.9998179374825268,0.7660422442129265,0.9694403330236019,0.827454828063563,0.909386888582935,0.7834502274285586,0.8577427547687273,0.8708648431928185,0.8548524931342583,0.9710824080912223,0.9238330064876686,0.9398845622402412,0.9301887702170655,0.8073991137264775,0.8397830095898209,0.9480555928961568,0.8938322002884268,0.8566684093964104,0.9815525057590243,0.8910095875458647,0.9552037209449125,0.8378714471923854,0.9665209577266172,0.9375259687974131,0.9913875320418324,0.916870771563479,0.8199857490509552,0.9423598432226248,0.8767030645327152,0.812780578271298,0.93018127495046,0.7666966083674387,0.8750376489814955,0.7899864099609093,0.8583394681773802,0.8761080596991575,0.9736987670080794,0.9048309969569118,0.9222689532005359,0.9789417766844566,0.9189699141200202,0.8877952023979985,0.8648107081742269,0.899082838677518,0.9226724843356486,0.9100653261543599,0.9461726757100475,0.8226078957244618,0.9750891492443068,0.8288130595559873,0.9900401380806272,0.9534533169340893,0.9775685077707279,0.823126308995781,0.8138419933888058,0.8359433922007293,0.7707375650072757,0.8612950012162738,0.7752931518188122,0.96960464020141,0.8025407840773513,0.7843591370641634,0.7791172270610163,0.9422120623377142,0.9597624298080122,0.8917331007890932,0.9659399596893272,0.9557482717420305,0.7809166594939398,0.8896857896148265,0.779615161377673,0.8257343300611637,0.7971387571378538,0.7646832578609507,0.8128355547245907,0.8859612706341478,0.8872979405740627,0.9866852162535598,0.9685028746032738,0.8414181908438757,0.914221380491266,0.8666623099342825,0.8504222879265051,0.776984098764715,0.9928928160533501,0.791427653770865,0.8921950029877994,0.797679718783902,0.7900124963246298,0.7887612970127922,0.7898779377066871,0.9728035417133238,0.7785284638094088,0.9325588805321212,0.8196691262908078,0.9828354011630839,0.9466801906107192,0.8809271426943558,0.7530690526020705,0.781447111591546,0.9071695641029152,0.8337422002146879,0.8142583723002537,0.9613031019419218,0.7858836040279207,0.9233195781335675,0.9201636847657084,0.7904676573258536,0.9760956346445864,0.7901817452239055,0.8307064474910665,0.8626248217789603,0.9435970361523469,0.9756741630292686,0.9422440129789713,0.81937191822816,0.7757288981462713,0.9809632402324602,0.9143515294555833,0.8447604017501763,0.8484723153535187,0.8998094679367791,0.9559200119624207,0.9972797163551925,0.8488493565177744,0.8560912965569591,0.9400980062560498,0.8472392386997046,0.8643487845451956,0.8354488914977973,0.7946284054676409,0.7912724643303131,0.9335652168512674,0.9766651607965041,0.8046547750860373,0.8779505769438936,0.9193577038469117,0.9838131001479146,0.8100632565987953,0.9111201492454142,0.7783630154856727,0.8133470429127034,0.898256793996602,0.8357567774675461,0.787181151391841,0.9307224771883233,0.7940604524471835,0.9760738893112069,0.829211906986687,0.8416770889821441,0.7888943401973314,0.8628489797038706,0.8083912147729109,0.9912667552124672,0.781019738652851,0.8006661765773454,0.9413627110782328,0.9488184155204229,0.9186749554745897,0.9433923131100694,0.9632492085785749,0.9146713053720296,0.9859483829625958,0.9237467430819013,0.8716446432827966,0.9926151058686539,0.8827274674835026,0.9768862851995874,0.7847605305349596,0.9380113088255576,0.8172113445509495,0.7660905430202356,0.9156280885093008,0.7640380730447459,0.8244184420934471,0.9090795027585503,0.8777793288113176,0.9758179197793331,0.9480146966852543,0.8404345552129601,0.9777087255288268,0.8835189325276549,0.8717936156451103,0.82178569921092,0.9070238899754794,0.9906125109147421,0.9958202371640477,0.9688110847933559,0.9187296198097348,0.8750068487862047,0.9600270789096259,0.950610982779855,0.8538313877261763,0.8212474132104435,0.842407405653667,0.9730393546740641,0.9529325603733731,0.8419749660351179,0.8044398088863153,0.7646144180728285,0.7567841124028322,0.9240446630153984,0.8126639263336674,0.7714117203872631,0.7960106718976798,0.8828118940185732,0.7787935428800159,0.9439795864335856,0.8838167231315864,0.9800291655215466,0.7876386645902491,0.9683312736585246,0.79341019931168,0.8557588719130091,0.9132181785639771,0.9648406189286778,0.8785045735501393,0.915580896884355,0.7691082094396766,0.8977298492413222,0.809227955241234,0.8433514747761852,0.8241644326093387,0.9734786014487771,0.8199007206538766,0.8814334112207498,0.879047984458188,0.9856320090953099,0.8192892820460447,0.8504433750367978,0.9093027934259531,0.8879202275796456,0.752938095803576,0.7636054650261204,0.7963849178749399,0.9008136340891062,0.9751767789494128,0.9155381486906785,0.9827273933949284,0.8199632236951084,0.8883264036087009,0.8764740315739988,0.9399867895990217,0.8847189285643606,0.9609541287721457,0.769433221118207,0.7998586397964774,0.9957224215521248,0.9075869371896481,0.7989712657787151,0.9311653736985097,0.797271941706097,0.8297156731632118,0.9368862194602274,0.7693438053804009,0.8801407039392064,0.8838645077538607,0.7607881269371818,0.8595379827201479,0.9977607273326512,0.8242426797080065,0.7716136720913401,0.8603412200586757,0.9862475222063365,0.9853952171193614,0.99412322554494,0.8510169623491064,0.9922071627066478,0.8192293385080167,0.9428586402935294,0.9232023460876764,0.8879724624591209,0.8217800462213583,0.8095615619527449,0.9230662736925698,0.9230895496164071,0.8219498625021362,0.9967299602750848,0.8096523002255971,0.9188965032299699,0.8374676971186918,0.8182285068789067,0.8609142507509464,0.8385988620222533,0.7961809724205529,0.8245357727535145,0.8661402009510121,0.9041736060131472,0.9926369445894444,0.7513235894733366,0.9772978996252706,0.8399441780654956,0.9870047434971919,0.8417421442859494,0.7834330903586508,0.7918523443606156,0.9753203417689088,0.8900492554914009,0.8083551863050902,0.788168432543665,0.8189189075328692,0.8440500308020209,0.9727579742913017,0.921881023713218,0.7923257342457724,0.9775167632146602,0.7799251460935677,0.761988272386952,0.928993969558245,0.9192975641751915,0.8141668098299568,0.872000462367364,0.7589729607464637,0.9919484789765189,0.848599245991464,0.7897743810934543,0.8043413558855731,0.8560242730118888,0.961386452092152,0.7956540155184129,0.9506404530710367,0.7817478438995347,0.8282048473732427,0.7949678975495295,0.8395526828757718,0.9500745085386324,0.7741351143296327,0.7670763214692383,0.836059075378391,0.9178523424272369,0.75941519248798,0.940807855144028,0.8738435176087167,0.854448028603068,0.9796910213993302,0.9555708568321675,0.9954677674018513,0.9932782765406563,0.8303489017916672,0.9669000918327686,0.961718203237204,0.979579709259065,0.9146949103495102,0.8930097661680507,0.8524756665260605,0.9636965890338844,0.8308093058715291,0.9228685419347974,0.8613395751091182,0.979655466302696,0.7727139392634621,0.7590213912458533,0.7851177158183977,0.7531039572554525,0.8891014626444986,0.8255755606652309,0.8933846449936347,0.9226916832515311,0.853745630768149,0.8178236648090704,0.9236146487508972,0.961815405886616,0.8809348566600195,0.9185236242545008,0.8677071991535883,0.9204560560798042,0.9390796390743859,0.9925684357490515,0.8410661775038297,0.7659742282596582,0.7913960490009706,0.9972163182780384,0.9301557612815365,0.900768090210703,0.8404680856802081,0.9985878284781552,0.9072187634353193,0.7778067148323382,0.964468473191758,0.8994137487047928,0.766945136469062,0.875989934775425,0.9611280071750748,0.8631565968857136,0.8546767767363529,0.8453004410481575,0.8576754364338159,0.9173379948979081,0.8039256664407964,0.9786804930666078,0.8387478951647818,0.8439306840537704,0.8181144706127563,0.9962940249036605,0.8952870586045372,0.9501121517809856,0.7691753165093459,0.8077759092089489,0.7679463551341269,0.9085573330242784,0.8851441103954159,0.8178491032880583,0.7944334393323962,0.8514296711211996,0.8825315775589837,0.8177474737971838,0.9499030013521762,0.7889312253823215,0.8240756527024751,0.9660056007696667,0.8887953330391699,0.8960418591315213,0.945613083922144,0.7775999856130473,0.8347795210196323,0.8691852351124005,0.7772267188130354,0.7866192168723138,0.8469528655140399,0.7622437961567488,0.8392973353761211,0.8001803985439714,0.8128096193784509,0.933156838232369,0.7889900031673964,0.9126403343385926,0.8567727786246195,0.7895125984743547,0.9883120832186842,0.8526563122406817,0.9992739423960699,0.778978644807554,0.7831429869495545,0.896576847618505,0.8478278006151133,0.8588812593918902,0.9549123271946187,0.9951183178872689,0.8478230379411102,0.9618414068142926,0.8386247601097234,0.9321379573570665,0.9273539663609757,0.9208695878691064,0.8052125692881208,0.9790497849638321,0.8013771445038906,0.8804941187788171,0.9682297299843625,0.986841666683257,0.8159299447788786,0.9828368456139653,0.7845367979213138,0.7665529410087377,0.7848940524664628,0.9301314338518663,0.8051679784082824,0.8181113319600701,0.921727671028186,0.8033142084200752,0.8130180579197077,0.8268127794180613,0.9279677825271806,0.7603902633277205,0.9759564993186525,0.9056199873996391,0.8501216161775098,0.8034226092496304,0.8011524621001807,0.8016134854264563,0.903027417551016,0.7759709676950426,0.7650619736898092,0.8458825657749447,0.7664777861062777,0.9539957824063812,0.8859865419038241,0.8877304485197399,0.8818253215937285,0.7610109636624938,0.7552074514577228,0.9795746221785893,0.9200606142923223,0.918289505220238,0.7564457613567833,0.8927280654250542,0.8780791765783613,0.85639627581374,0.9720144281570644,0.8309993483324083,0.8653262791090912,0.9325373907776795,0.875406016019881,0.9290134993794663,0.9451507266941053,0.9527215237011589,0.7547113874921423,0.7889982409369686,0.7813516266466036,0.804058166948454,0.7847026513536035,0.8033165784767988,0.8942458907240873,0.9478604776384942,0.8902419944017463,0.799889603675362,0.7840412727929753,0.9624676624301183,0.7890680932829441,0.9199597379304616,0.8513037324869053,0.8546936922494672,0.9474519184648927,0.7727533591206559,0.9613019966183223,0.9699019116371523,0.8603581150972905,0.9732429831139203,0.9484799616155988,0.8812627169195699,0.8242286804417363,0.8376142091690915,0.9926281453327377,0.7803372391140978,0.8633519872157591,0.9941615363587712,0.981594388172403,0.8791876188961987,0.7925585545095053,0.7815223712774327,0.7682699000334037,0.7999580685338591,0.9136629605144679,0.9538874796654929,0.948466365907895,0.9018328179642496,0.8951851872693599,0.8214363130233187,0.7980825228195159,0.9370233337323628,0.840964973317638,0.7541834897532442,0.7519937126202875,0.8928455369419648,0.9415678875399878,0.9819026108448573,0.752477541745626,0.7963604734588602,0.7777382901102385,0.7814177608045678,0.9555694118232481,0.8978105140852352,0.9058016828048623,0.756511546051652,0.9266707343052554,0.980562277868475,0.9691929644004162,0.780319400491197,0.8141704741623756,0.7918919534303597,0.758297982828232,0.9378231044100533,0.7847397709149171,0.7770230558887938,0.824571768859808,0.8676907251830482,0.9132887965924189,0.7739808192652633,0.9204000209115424,0.9681419099828097,0.8663903297690182,0.7931328748596322,0.7625655784815544,0.7829977335394349,0.7589918538254612,0.9463681619776809,0.999631440331995,0.9454532451920037,0.7564859964414248,0.9513784470709826,0.8401121017367674,0.8716448605366292,0.8994727315939858,0.8204365506038925,0.9830712790173074,0.8191550020755511,0.8978765844096895,0.9399988488513428,0.9150254794024545,0.8627975148557554,0.8221360668270387,0.8903620604226488,0.7927190459479247,0.9032093459556273,0.9589349570972585,0.8685567462268018,0.9522791163094033,0.7639460681405972,0.8834078641296041,0.757611550778831,0.9953590765594179,0.7729830991256199,0.7731107669095936,0.9518586949178052,0.8403877652570257,0.8190089151844544,0.9728747518169223,0.9271038372823028,0.8825528899774218,0.7713161232089671,0.8924857687053365,0.88905348425637,0.9714208230079158,0.8839339320039412,0.9961521192175073,0.7794929926039,0.9100234121631783,0.92217340105221,0.9330848305586836,0.8766728807022317,0.9151660289824592,0.868327507584909,0.7721749584049714,0.8542015994083598,0.8701888648305769,0.9833456048560372,0.8301011659809634,0.8525681958837672,0.7983055083192245,0.8870948443543271,0.8170828216099867,0.793380610768394,0.819564396691498,0.7783306833135032,0.9871769832595962,0.8175307342777756,0.9947807094365269,0.9053206651389525,0.9624453790102083,0.8219389822899124,0.9333056196176457,0.99522507442821,0.9316052905116627,0.9140281163437354,0.8281072624490926,0.9280816471625141,0.7751874464701324,0.8851436843066389,0.8148662877207014,0.7562911919113704,0.9497942363242393,0.8983881095257212,0.9478709167675362,0.9021486896498669,0.8038499848233999,0.8180917404183492,0.8838871981900633,0.8581120545585537,0.8864125753972365,0.9098410343144446,0.953043254412373,0.9150700532111411,0.7710554951746247,0.9689292390710454,0.7615859779988958,0.8729413856279085,0.778854022816726,0.9818277734825762,0.8722473462773813,0.9978391442518422,0.7627953776088199,0.8098543662184698,0.9116214370781712,0.7990631854171439,0.7818305041630409,0.796174753206346,0.8316037725129252,0.7993970212568915,0.901219734797334,0.9559221312683772,0.9043249983270251,0.8879133946841185,0.8570920773152177,0.796479763762624,0.9352015101766646,0.8013894679836688,0.8886840796371056,0.920168748331755,0.9382543743890905,0.8225846762731244,0.7922217964885323,0.8654455251794269,0.8857643787396601,0.879897590892998,0.9431254981059798,0.9906345135596584,0.7797731266440904,0.9621499872730312,0.9833693279540567,0.9365351921296216,0.7852270154988733,0.8855733754578174,0.8252740867951496,0.8847788208350601,0.9992297836576134,0.8420642848918367,0.9358369721505725,0.9041642657929021,0.8911804605887883,0.763412363745166,0.8035708164975552,0.8001358493569383,0.7808145718734809,0.9336520582954838,0.7547626059197925,0.911971118483397,0.7504316593685543,0.81956558282761,0.752913604987955,0.9930895670410754,0.8866216852896094,0.9819364446402801,0.8083059935243125,0.812470674195098,0.9431877568939979,0.8615327414649945,0.8733303178568373,0.7586034136377322,0.7550365510609032,0.9197645783187287,0.8342880585426895,0.8810707918820553,0.7600006135505222,0.8101284652756044,0.8716614397226716,0.9193602484885738,0.9076609122580136,0.7829725374785264,0.9058837876719541,0.8302186941348266,0.8269700179999617,0.8040593382830518,0.8266648514506723,0.9072910642429979,0.8251522738684818,0.8552600359172057,0.8437336751598788,0.8531392298100726,0.7716691538224012,0.7736271946617822,0.7729848326100945,0.990280667964035,0.8655437146585994,0.94750782367598,0.8652400178347105,0.9918655356797115,0.7855271957747609,0.9006714977939982],"n":[7.0,18.0,15.0,1.0,0.0,6.0,15.0,7.0,6.0,2.0,18.0,0.0,20.0,9.0,17.0,4.0,12.0,19.0,20.0,17.0,2.0,10.0,15.0,20.0,5.0,17.0,17.0,9.0,18.0,1.0,15.0,13.0,13.0,7.0,19.0,10.0,12.0,15.0,6.0,3.0,17.0,8.0,5.0,5.0,16.0,18.0,10.0,8.0,15.0,6.0,2.0,3.0,15.0,15.0,4.0,19.0,12.0,3.0,16.0,15.0,1.0,14.0,6.0,7.0,15.0,9.0,5.0,3.0,10.0,8.0,9.0,14.0,13.0,15.0,8.0,8.0,6.0,11.0,6.0,15.0,14.0,11.0,16.0,11.0,3.0,10.0,18.0,19.0,7.0,9.0,6.0,2.0,11.0,15.0,17.0,14.0,2.0,1.0,19.0,16.0,6.0,12.0,4.0,6.0,2.0,14.0,4.0,9.0,11.0,19.0,3.0,5.0,15.0,13.0,19.0,13.0,18.0,8.0,6.0,20.0,10.0,8.0,13.0,14.0,0.0,2.0,20.0,9.0,13.0,4.0,10.0,1.0,20.0,5.0,17.0,3.0,0.0,7.0,11.0,11.0,20.0,2.0,13.0,19.0,18.0,9.0,9.0,1.0,17.0,8.0,3.0,13.0,6.0,11.0,16.0,11.0,4.0,16.0,1.0,8.0,11.0,18.0,11.0,15.0,7.0,3.0,3.0,14.0,14.0,1.0,9.0,11.0,13.0,7.0,16.0,6.0,5.0,8.0,10.0,2.0,10.0,2.0,16.0,17.0,1.0,18.0,14.0,2.0,10.0,5.0,3.0,19.0,1.0,4.0,12.0,12.0,10.0,13.0,1.0,18.0,18.0,2.0,6.0,16.0,6.0,11.0,5.0,1.0,17.0,6.0,12.0,11.0,11.0,11.0,16.0,18.0,3.0,10.0,11.0,13.0,3.0,7.0,6.0,6.0,20.0,11.0,15.0,14.0,20.0,11.0,8.0,8.0,15.0,12.0,13.0,4.0,9.0,6.0,18.0,3.0,13.0,4.0,1.0,9.0,10.0,1.0,10.0,5.0,19.0,13.0,7.0,10.0,3.0,4.0,11.0,10.0,4.0,6.0,13.0,19.0,3.0,5.0,2.0,15.0,18.0,14.0,1.0,2.0,12.0,8.0,20.0,17.0,13.0,9.0,1.0,7.0,12.0,19.0,19.0,18.0,8.0,6.0,16.0,12.0,6.0,4.0,8.0,9.0,7.0,17.0,11.0,20.0,18.0,1.0,7.0,2.0,19.0,13.0,18.0,10.0,17.0,17.0,18.0,5.0,9.0,10.0,6.0,8.0,17.0,13.0,4.0,15.0,13.0,16.0,16.0,1.0,11.0,8.0,5.0,18.0,0.0,20.0,20.0,1.0,9.0,13.0,5.0,10.0,1.0,6.0,8.0,12.0,4.0,8.0,11.0,3.0,3.0,14.0,11.0,5.0,12.0,14.0,9.0,14.0,19.0,2.0,19.0,10.0,7.0,15.0,12.0,20.0,9.0,5.0,1.0,17.0,1.0,12.0,17.0,14.0,8.0,6.0,10.0,19.0,4.0,2.0,11.0,10.0,3.0,17.0,4.0,0.0,4.0,14.0,3.0,7.0,11.0,18.0,18.0,14.0,0.0,17.0,8.0,17.0,11.0,2.0,19.0,10.0,17.0,18.0,10.0,19.0,7.0,4.0,1.0,9.0,18.0,4.0,7.0,19.0,4.0,4.0,4.0,13.0,9.0,15.0,18.0,12.0,15.0,3.0,8.0,16.0,0.0,2.0,7.0,8.0,16.0,7.0,7.0,11.0,14.0,3.0,9.0,5.0,11.0,7.0,9.0,5.0,5.0,3.0,14.0,5.0,13.0,1.0,7.0,3.0,12.0,15.0,2.0,18.0,18.0,14.0,7.0,18.0,16.0,15.0,10.0,5.0,3.0,5.0,13.0,16.0,14.0,19.0,2.0,11.0,3.0,20.0,18.0,16.0,10.0,6.0,1.0,11.0,20.0,2.0,3.0,12.0,12.0,15.0,14.0,9.0,15.0,18.0,3.0,0.0,16.0,17.0,15.0,14.0,19.0,5.0,15.0,8.0,8.0,15.0,12.0,19.0,5.0,19.0,10.0,3.0,18.0,12.0,4.0,7.0,19.0,16.0,9.0,15.0,11.0,14.0,11.0,10.0,14.0,2.0,7.0,18.0,14.0,17.0,18.0,6.0,11.0,19.0,14.0,16.0,10.0,20.0,12.0,19.0,1.0,18.0,10.0,5.0,0.0,5.0,13.0,7.0,17.0,6.0,16.0,12.0,10.0,17.0,17.0,2.0,7.0,10.0,16.0,10.0,18.0,17.0,3.0,11.0,8.0,17.0,3.0,15.0,13.0,10.0,5.0,19.0,5.0,18.0,19.0,1.0,13.0,14.0,4.0,14.0,12.0,20.0,18.0,8.0,6.0,10.0,18.0,17.0,4.0,9.0,9.0,18.0,4.0,18.0,8.0,16.0,17.0,5.0,12.0,20.0,12.0,9.0,1.0,5.0,10.0,3.0,9.0,7.0,11.0,13.0,16.0,1.0,17.0,9.0,11.0,13.0,1.0,14.0,11.0,17.0,8.0,12.0,5.0,0.0,12.0,16.0,11.0,6.0,13.0,2.0,4.0,5.0,14.0,17.0,11.0,15.0,19.0,15.0,20.0,17.0,16.0,3.0,1.0,2.0,11.0,4.0,18.0,13.0,9.0,7.0,1.0,11.0,14.0,17.0,18.0,17.0,15.0,14.0,20.0,17.0,18.0,19.0,6.0,6.0,6.0,5.0,11.0,19.0,13.0,14.0,10.0,8.0,2.0,4.0,9.0,12.0,14.0,11.0,13.0,13.0,19.0,9.0,3.0,13.0,2.0,3.0,1.0,6.0,9.0,12.0,13.0,17.0,2.0,9.0,6.0,13.0,17.0,2.0,4.0,13.0,17.0,0.0,7.0,15.0,6.0,9.0,10.0,16.0,17.0,17.0,13.0,14.0,10.0,11.0,15.0,15.0,3.0,18.0,17.0,2.0,13.0,3.0,10.0,2.0,2.0,9.0,10.0,4.0,7.0,1.0,10.0,1.0,17.0,15.0,7.0,15.0,16.0,19.0,10.0,3.0,6.0,14.0,16.0,4.0,3.0,7.0,6.0,3.0,19.0,15.0,7.0,8.0,5.0,9.0,6.0,17.0,13.0,11.0,4.0,0.0,16.0,4.0,7.0,6.0,2.0,5.0,19.0,14.0,4.0,9.0,6.0,12.0,8.0,17.0,4.0,7.0,20.0,17.0,0.0,7.0,4.0,5.0,6.0,9.0,8.0,5.0,11.0,19.0,6.0,1.0,11.0,8.0,0.0,12.0,8.0,4.0,0.0,6.0,10.0,7.0,19.0,17.0,16.0,17.0,3.0,13.0,19.0,17.0,20.0,10.0,6.0,7.0,1.0,4.0,16.0,9.0,6.0,1.0,10.0,13.0,4.0,15.0,2.0,7.0,11.0,9.0,10.0,3.0,15.0,8.0,4.0,13.0,5.0,12.0,12.0,18.0,2.0,7.0,18.0,11.0,3.0,18.0,5.0,3.0,6.0,2.0,2.0,19.0,13.0,20.0,13.0,8.0,16.0,16.0,12.0,7.0,0.0,1.0,10.0,7.0,14.0,10.0,6.0,1.0,18.0,12.0,1.0,12.0,2.0,16.0,16.0,20.0,15.0,19.0,1.0,14.0,8.0,0.0,9.0,4.0,12.0,20.0,9.0,18.0,4.0,16.0,4.0,4.0,18.0,16.0,6.0,16.0,5.0,18.0,2.0,15.0,12.0,19.0,12.0,15.0,10.0,3.0,11.0,9.0,6.0,9.0,16.0,14.0,3.0,18.0,19.0,10.0,16.0,11.0,3.0,4.0,14.0,5.0,14.0,12.0,8.0,13.0,14.0,13.0,16.0,12.0,13.0,10.0,13.0,0.0,12.0,18.0,5.0,5.0,5.0,2.0,4.0,19.0,2.0,5.0,10.0,4.0,15.0,6.0,8.0,5.0,3.0,11.0,16.0,11.0,15.0,3.0,7.0,10.0,6.0,19.0,19.0,11.0,11.0,14.0,19.0,13.0,11.0,16.0,19.0,14.0,10.0,19.0,16.0,12.0,16.0,19.0,16.0,9.0,10.0,15.0,19.0,17.0,12.0,17.0,6.0,16.0,17.0,12.0,11.0,14.0,17.0,19.0,17.0,16.0,18.0,8.0,10.0,2.0,1.0,4.0,12.0,13.0,3.0,15.0,5.0,15.0,19.0,17.0,11.0,9.0,19.0,19.0,7.0,14.0,5.0,10.0,19.0,17.0,8.0,10.0,19.0,17.0,7.0,18.0]}

},{}],199:[function(require,module,exports){
module.exports={"expected":[-10.802887849573592,-1.5848404020795421,-12.231204878744265,-3.519753626143855,-9.22301207126073,0.0,-8.014802779534637,-4.052439205819312,0.0,-6.6272245020245,-4.760028401740064,-12.976107428050472,-36.7769442191347,-11.309373995687967,-1.6482591022028334,0.0,-42.63714276376174,-17.057408550979993,-0.9486428567085626,-4.404639200265905,-9.378190713048756,-1.4223544969066158,-2.165474306721183,-1.906952686807804,-4.036479893592945,0.0,-7.2155197670907185,-11.892707299432061,-14.585270718595329,-1.2813584360522912,-28.782220744046487,-7.549035431143805,-12.617070812053392,-7.083322156096363,-6.662132019978417,-8.052946120852637,-28.929923602755196,-1.1050815845625448,-9.811167231819155,-4.418467794462555,-2.147316324610447,-1.3938975645997074,-1.1878786486994575,-11.00941199628823,-1.2449856833082802,-1.2568234956196256,-9.78076372934709,-15.879390620097134,-4.810422484462663,-18.735053628894082,-3.3296529270955615,-2.177262225809929,-11.074139061156327,-16.127637500756617,-14.957021499746466,-2.088272742752382,-1.0113253074550337,-40.345205382839055,-2.8989535153139077,-16.380503306915493,-1.3871568190155286,-10.283337197303165,-13.037069048673905,-3.354922216316119,-10.200289339873143,-2.216833118851455,-1.8893639304931993,-2.9896505373960394,-55.915148198188795,-26.279943857992624,-8.595219879586935,-11.264631965848103,-13.826171215867845,-13.256759799911462,-1.8923117634763194,-28.066368684617558,-3.8321940636114746,-4.49400085052686,-16.22765223992978,-11.660220086922077,-10.141145779151067,-1.2068820293354814,-13.754119912127996,0.0,-1.5831654970615896,-8.274423645178416,-1.43336342789762,0.0,-16.285929073207285,-38.94262997828712,-5.598407337257976,-3.4431716509149206,-4.407552967314933,-8.863653706642328,-10.948430278755827,-57.098620962655716,-0.12524952780446624,-10.014747105792948,-4.039353191814744,-16.618350990920796,-8.839119351501425,-0.939813058629711,-12.745186688657483,-4.358161337703797,-0.27667835744592495,-0.09996741380206003,-12.678953349858212,-2.232804693522035,-1.6320046553860403,-1.4371973942047866,-22.955037328365073,-1.182529273476261,-1.4816545078800685,-17.477144720271536,-4.92855487189258,-14.714622059500947,-7.0435587243051465,-2.1668945918495446,-2.458741908266047,-0.92809535496646,-27.081187066572515,-6.935772242648975,-16.522439264703266,-12.68253510689664,-0.9151595753235257,-0.08350478760337378,-1.2674597135334276,-1.248382818024477,-30.723443309055064,-23.488782587549522,-0.1654459734266682,-3.770669516685098,-5.369867192649471,-1.4820726521127676,-1.3101466565671775,-0.31841939338164715,-1.066756177105307,-1.0456953075862,-2.7419140390227525,-1.2258010936293176,-29.001722640622692,-11.82616448795333,-3.9809231488650774,-15.000753376492202,-1.1451330914275926,-42.46748507492684,-1.429280798807182,-4.352385348966141,-1.3422009358270008,-3.379604438845677,-3.3285473899798084,-16.177205497331368,-23.59499551890189,-2.3788187716238194,-1.4458692945728844,-3.7576431758655944,-1.4159162301794372,-7.002827281024217,-2.4282298456909945,-9.666443833212028,-19.909871552442546,-1.7933304535415864,-1.1537659199643273,-40.05570263011998,-4.435246113208633,-5.6873626037204374,-0.09110121871273914,-6.778374449952644,-25.202900146230153,-10.947679847702258,-1.8163041111365437,-35.922791661172155,-2.8652342984421004,-17.81408937334234,-1.381303928985956,-6.316600028381272,-6.947715331474552,-10.84901423241928,-0.7386347913018421,-3.0959239503626352,-3.4603884079568896,-8.787619938852146,-8.09030474755151,-52.92656066893889,-29.81181114619786,-1.7296682457849781,-9.5400191212243,-0.07518148503300812,-1.3088873447454148,-48.49492959774246,0.0,-4.458586965854884,-29.860829330363178,-16.302820001490897,-11.521452878948855,-1.7880637758279279,-1.0910929387164323,-18.26908823100166,-1.0949125499310333,-4.093628737728821,-17.20101108265093,-3.0485350012907055,-1.632141117338778,-23.74323531410093,-11.811085673886968,-6.0870866594094535,-6.364898947143413,-13.198265975595245,-14.583790939075723,-13.166957441768027,-0.42035394622843497,-6.3981588391327495,-5.707851675274879,-24.73370671702053,-5.144919632943514,-0.48724841036881317,0.0,-29.917210825239756,-3.44617268895109,-1.8846594537563188,-1.0229358398266553,-8.466806157171419,-2.1050138617391054,-21.246222029204205,-1.57295692004796,-0.889617100704426,-0.6177219179365403,-8.941375518878804,-0.1450366470936591,-10.84187951956482,-11.021781567108777,-1.45996876351247,-21.61281547622133,-1.258188514712605,-9.701951065318001,-3.466993047713584,-5.60767177281174,-7.802315107750933,-7.66569906145949,-3.8352166067931743,-17.655272772970278,-2.189104277418931,-9.253820591215087,-12.125262711575257,-6.757969849174608,-4.526897672538797,-20.71827739255374,-4.131650395681382,-0.9759397408676233,-12.122008815026566,-12.778702687635613,-30.613893082637414,-1.9689856997302992,-12.698700757063998,-34.10793265643196,-24.879828974399082,-13.186372689932616,-5.841436303984478,-1.55525860052351,-2.584028226793089,-6.310640890799625,-62.78982745391937,-6.195933948009489,0.0,0.0,-45.192895954827556,-36.92491348017715,-51.16121604723726,-11.114994549318117,-36.92152415638427,-19.81589984938603,-2.1803108893399434,-8.394694097298448,-15.765073126724804,-1.446909239574099,-22.623741956338783,-1.190898037380736,-0.20553018523969568,-0.029409824965894935,-0.8883461899065674,-7.070832772776777,-2.847919510712967,-0.9483896315376215,-22.3744222715195,-0.3872798722453188,-1.8111199257874966,-6.035835000955794,-49.62169400081468,-1.3058191533243788,-2.5814324726747953,-1.028654829652431,0.0,-5.503175413169693,-2.8116127460138203,-12.240523388053372,-0.44437078216108555,-0.9320148720566757,-2.7602167038337844,-10.439139232031023,-0.007401634661971675,-5.843389824053668,-6.984150955246754,-5.486161479025969,-16.702596596354983,-11.177079035392318,-0.07988350034634636,-10.978736375940667,-15.273359681346315,-1.8370416493801862,-3.303487134994934,-11.160400481505386,-54.91695296436963,-11.726837253885405,-3.0716547043008213,-1.0103695721546024,-8.298477830317205,-25.451330952538143,-16.701763137680853,-1.3614784827174933,-0.1079698792294808,-12.0185168178217,-9.075961975721857,-1.2863207046085663,-38.87163496454135,-2.415965350019075,0.0,-16.169140512470403,-27.138225070798875,-1.076543667395131,-8.49845023307834,-6.314819188483683,-2.9837953211837704,-0.9563326914136391,-21.0742808781527,-3.9487262681045703,-13.205357624309489,-1.2397220000664706,-12.675886445511097,-9.935207350611623,-7.431599957809761,-9.531893616493457,-6.9369864195019435,-4.464206037313582,-5.23240386674388,-18.67392450204055,-0.9324115144479794,-7.405130777840757,-5.96343276364575,-1.7711979816994103,-5.975084873667003,-1.9822590166779126,-0.16757898555807427,-1.1176393136463758,-18.97891428728443,-0.9772819343972823,-3.558815868985761,-1.4296462069752982,-1.693456969791428,-3.8696423289156217,-3.32908411443432,-13.77872683632298,-1.4661152980746222,-1.687091713391366,-13.039366019427103,-0.9007869039644992,-3.3115072077524688,-6.559848996004947,-21.70080316331589,-0.0832625448782749,-6.377198092936565,-0.0382126542341747,-19.675106598737674,-1.9571735923732967,-4.730793099266444,-4.81911635191954,-1.2213875642998289,-36.4566948270977,-20.08122663579146,-2.833419624743713,-0.11560890870928704,-0.09664370440963273,-35.94731899985253,-2.636143268964272,-6.193514372988837,-2.6176607532891705,-10.356680782900934,-3.2798712931908085,-1.2328486891009436,-4.140174359576875,-7.366140527411689,-14.3543030856687,-19.243336078876478,-6.105129582335393,-2.0308581453813614,-2.3076898520303115,-0.21862236545873157,-27.39160344110729,-4.4313131543726385,-1.8812653414740783,-15.380193157142646,-5.169066616430609,-5.807881730602313,-12.892421699747718,-5.8958306957100906,-2.3699908796388565,-0.008304594161258757,-10.548732043701929,-40.11439929777297,-17.532449109010305,-3.4431145042868434,-1.070313568551637,-5.4249837093206725,-18.342512629702515,-15.684305927032081,-2.4057437019485386,-1.3461209708436586,-24.85089584020812,-2.0161193053167885,-4.013272113740126,0.0,-56.26738032503483,-0.13872660926848193,-16.3711604522125,-24.974261482540236,-9.400453215354792,-1.509732834935802,-1.6261434805019124,-10.474107571793628,-0.5888331199180704,-6.902138861280827,-8.811314643168977,-9.847511594425502,0.0,-18.795409333256416,-3.6659291140189705,-16.087426459470613,-14.80462610752212,-4.6458909990600175,-11.330361943437874,-1.5860006074159925,-3.824290560212564,-5.107324179774292,-1.089240690452982,-5.702004747486612,-31.813087573321248,-18.453637370251233,-5.335407277255397,-4.494357784872538,-4.3678743634544785,-1.3181505650435072,-9.663721455941147,-0.9354947143746027,-2.333721739394096,-0.20124746833250753,-4.587932044812964,-1.481278677930658,-0.08607159095943344,-51.82096212277454,-2.6856499470144715,-21.669408244049727,-28.334585261305033,-4.755316762507304,-7.3299595577387455,-0.07110715360381002,-1.2434827976967384,-0.07504998574708271,-14.169012864046827,0.0,-9.610666991389827,-20.761298160102424,-21.962907211900802,-3.8495297285602246,-28.140697650149747,-15.904241100093278,-2.5185296794533296,-2.15280680048998,-5.793011024628193,-5.935085198965798,-2.621600308260083,-2.240580923799399,-0.04952088667501579,-6.5999265436246235,-6.298334124883246,-2.1130511806343333,-18.425753484585275,-17.264787961634163,-13.40533186700009,-1.0058793618199755,-6.941561355211669,-0.05967275706525616,-0.27754730384932463,-13.72943960633541,0.0,-4.640851332293595,-0.546657817026055,-6.799835216650495,-15.594455606912796,-1.962491534857942,-7.188433537818624,-2.1249440996834994,-1.297659226649052,-4.052580227076586,-2.054267445875431,-12.63810512002754,-0.18077577291348862,-1.245209206216693,-1.697605683950962,-14.506777082111919,-14.647680155325306,-1.8630125684162429,-8.643265837930667,-3.207857775118755,-3.359463358885578,-2.641553905557942,-2.8935798204564875,-6.004979618222228,-36.19556467817321,-6.059795427048673,-4.532986924194126,-9.58079876664585,-10.377682472230235,-11.375772279339676,-49.513305522248395,-1.1982081816218764,-11.002999838172954,-14.900089867252044,-1.806749280503607,-0.008999108744812504,-20.423301916562647,-13.73624627449026,-44.41672834696535,-26.88968770890084,-10.250037948177926,-16.825175980977765,-0.094399382514819,-1.795113153118069,0.0,-2.6807435058335933,-7.2744518468248085,-47.715099720671844,-1.6429693308949278,-7.354605433475768,-0.9120861290519402,0.0,-5.79890279086696,-5.390460286725314,-11.679538743115044,-18.371032328713785,-1.2501580678508748,-3.9736350728219856,0.0,-1.1961092083890787,-0.9709080008054716,-20.366840184606716,-3.8343002793857632,-2.114268072240955,-9.215854598628038,-3.281739181539458,-3.2989650419314653,-4.453899039670922,-1.793649368643796,-30.862417966399487,-9.230156235476871,-6.676944566614705,-1.2552170849995088,-1.5941600891940595,-20.2121430935533,-0.008817570347844942,-8.558627751621854,-2.307350154484186,-7.089927623190649,-55.25542271258032,-3.203553702331473,-10.430524938334925,-40.07977859677343,-12.621265217658584,-16.91401900021919,-1.1428607235177135,-3.790318547718943,-8.065866311936968,-13.699960800010622,-21.4354167120628,-7.589483424026165,-2.438740277270295,-0.2341886733009036,-53.13923408082502,-5.309878957067584,-1.5788759975894786,-12.131319992975374,-18.387325012506967,-2.2842852025215317,-1.4118485543586516,-17.31498607038335,-19.349528385417244,-32.796984147384464,-0.9600760951889022,-1.3102876723782233,-13.407565348530492,-7.174525575727572,-0.1448938288841595,-1.3341069926056,-3.8332360325179438,-3.2255320565090884,-4.535636333926034,-14.02008451412616,-15.323157010215317,-5.404529575124226,-12.626077110958896,-7.166372489586309,-0.29413138194123567,-11.44080403013286,-0.05038441291015167,-4.328285365653312,-37.44528485538784,-0.26947100093551635,-17.67899071250453,-18.031294138895678,-0.10851116257363087,-0.5962559158100168,-1.3652382613349303,-15.723939457081283,-0.6863028742399585,-1.970961183952432,-25.821762141804438,-24.361508805547757,-1.3706465922495195,-34.27164876970733,0.0,-1.5590512279633333,-37.928256533782836,-3.85676369335384,-1.2647689361706347,-1.8295925586976398,0.0,-0.9543931731039473,-2.880670889511868,-11.467326148249626,-7.624650049594486,-1.1526210434918487,-8.958325707583594,-0.14681140785827584,-37.064742285280445,-1.9235402382484237,-3.5616209210207908,-2.1559360563913836,-14.511867942828282,-6.431177410659338,-4.082186389762104,-1.3306737881344495,-8.719593113715371,-52.01585784594377,-6.97230321183738,-11.127668898067956,-8.245566283514005,-0.5612748259300807,-14.957194798679273,-0.08611399785711665,-1.9010942526284045,-36.00975965095533,-6.890582638512119,-8.00407658031736,-1.0698336528098396,-3.9983065161644693,-16.968682799283236,-32.04546290403354,-2.3490002073616245,-35.08220228949124,-1.6867473934223467,-0.35147239285509024,-20.68159009966772,-16.24752192401616,-2.05609716064824,-10.187814773515475,-25.54324995194675,-6.024052857511705,-2.605876461978185,-8.068190463365795,-4.716389446681686,-8.512252527237678,-1.2360541052310028,-3.2701849297845054,-6.474919002036255,-21.33430389018488,-10.425508466488735,-0.19650674216735403,-10.8159848893741,-2.217331124499947,-21.841411125889692,-20.071966350839727,-25.566486890867974,-1.6431160973620216,-5.116793404045958,-1.273696844252285,-1.6382778599219445,-5.485895361858965,-7.393999332617564,-6.476001204468236,-0.15339056601712575,-3.947372636765183,-6.398610763824646,-1.531272920642572,-1.4663699304067437,-3.334643427756684,-2.2939348479252097,-5.920859121792214,-6.628531120308553,-18.145208770622375,-1.2101625599059609,-18.376553310296174,-1.6879327825041497,-25.46187933426845,-16.60327908244545,-38.59979875530412,-4.909339073382149,-4.181767208145378,-1.0195029350976428,-11.012569697780634,-25.69923467521263,-8.226808241428891,-1.3510410011112393,-0.16385299826657274,-23.276469051274457,-14.161509388683376,-4.422964324036766,-8.003612277127818,-0.3465239801220929,-17.241427128466356,0.0,-6.165257822455262,-2.765268140137388,-0.08582862577890796,-2.8356056633803606,-2.378962371935561,-24.527353351130834,-1.9372752147831511,-0.10351640422038887,-11.377429407762046,-22.50700345311846,-17.95586755164731,-17.117421126154277,-0.331060344673897,-17.686479128833778,-12.966063369209031,-0.029197218369232874,-1.2625112121743778,-16.591344188762804,-3.93974571270678,-5.190429008105577,-8.862031982528789,-11.544148367538186,-86.21754320404587,-0.3383110815404247,-15.041518371277146,-15.87892989620747,-19.499454071674503,-1.3062005453592866,0.0,-17.28428619846126,-4.793451614657212,-20.072608640788598,-9.441490404497978,-1.8228155355826563,-17.263463132615232,0.0,-26.762742975008475,-2.4339918776399285,-2.0601424950367493,-10.838940141169473,-11.078942729803602,-8.863698049849383,-0.41706716523932547,-4.119894735557091,-2.627103363437411,-41.77287619924217,-1.224370618708138,-1.2330700942565582,-39.69263788346087,-3.6185741073125506,-19.41131305635285,-16.390465889496994,-0.9437152770503059,-2.1927454037210348,-29.7994791905399,-18.433697573363645,-2.1004171746823745,-61.539187841671605,-5.281839659850506,-5.945394542448691,-9.180955674891532,-1.2616713782323208,-3.1191066493798205,-15.030618345238958,-5.640544039965511,-0.6079194418205238,-28.747701144567685,-15.999822158606982,-36.4658356117922,-2.0405917812301233,-6.484419275588899,-0.880890542761678,-34.89531713013325,-9.761853067136627,-0.6555939729997708,-2.7314838902298293,-0.04998400764339346,-2.9792951338104876,-0.9028372252573429,-7.428723573694203,-22.902924168237483,-0.03691551303566687,-11.596253971244261,-44.1382284309116,-4.7814450158847155,-19.483944276667174,-3.24075160997313,-6.565497579448037,-3.7553799771661267,-2.1031006707243316,-1.424681187433733,-59.16226914813754,-2.276999286405493,-21.104471213941917,-39.918383687941585,-11.347433005687357,-4.6766073831983945,-11.607186888493015,-20.427081551473847,-1.717733912097819,-2.7489417495185986,-3.2508359887312572,-1.3022231431864963,-31.798213836488348,-1.0038463619242854,-0.34663300141039016,-13.37461440511648,-3.433174518916704,-4.248055588157964,-1.2692741739043025,-17.747296751268454,-2.3195152084789177,-1.730396872032823,-19.25515246324781,-4.861689195112019,-4.713161658411867,-14.9667939526521,-1.0385752234365537,-2.2495714476246915,-5.184119172490512,-1.7497993801669185,-8.720243928361226,-1.071238120027855,0.0,-0.12796753519491108,-1.2748009913644007,-1.2795147948260701,-2.5430260707877004,-1.6363868609239245,0.0,-20.051611474845373,-1.6014822925181076,-16.11177772517688,-9.966738343571764,-4.104847902660481,-0.9712329223245375,-4.651933807876585,-0.0020399119995153595,-31.137754018875686,-4.514977079274859,-28.78457915503003,-42.927653701614815,-1.691476654629773,-0.15675237672092365,-20.329226950762425,-1.4744919652258013,-5.05423989500735,-4.877103858774394,-3.6613189606479555,-4.061783853694567,-1.6895612180738773,-9.336630679612956,-25.354703359892632,-19.02245961185809,-6.720722812710791,-17.491072928947407,-16.256172350735994,-4.614029632641746,-2.085862876955635,-6.782007056881559,-23.887572776088398,-1.4788586271517867,-38.89156305214603,-0.9586468144411452,-5.877827584471062,-1.6875509564343132,-1.163678454814277,-3.4535030100914827,-17.099967427754727,-17.777539490953302,-31.341096198109177,-0.9906111615551098,-13.237901919018071,-1.3741552539381248,-2.920805608743998,-4.487902793212401,-28.066757785914078,-7.360282528129298,-17.172170052586367,-0.9219095451411135,-0.07859616627322351,-11.954935060691158,-29.078422038194834,-2.5339592016350165,-1.0535864842611937,-23.61347555264144,-1.6254008080390034,-2.3615374629857717,-0.9677662697483741,-0.9257359200048151,-6.238506188454552,-2.462937448388549,0.0,-1.0315014492723749,-1.4976581973210181,-1.153432574240887,-6.993702250319738,-42.05734307259573,-14.449396416115437,-36.90313672668563,-3.991017738256232,-32.27860369391752,-15.5026986722887,-1.0233429566007004,-10.525345885872326,-7.5666567361931065,-6.28010373614085,-7.8063995277291145,-10.900875377476765,-10.260306226533427,-5.155065266221583,-1.6064397476548113,-3.8560861135452207,-8.227388007193282,-5.3318884103738435,-1.0112828170132488,-20.498996244182653,-3.446805606512058,-1.1616347009654986,-2.5924688227691033,-21.67351374177737,-2.444661393599748,-1.540861817672081,-23.518427481822147,-9.251132863497737,-8.886545805791783,-1.2085168239141089,-4.01998400558643,-1.8630613636249582,-10.747989675164584,-0.21654151324904725,-8.210345806401723,-4.028726776239351,-1.0794517663579815,-12.000366767074208,-9.362391769955135,-17.81556299797041,-3.3412656002088483,-34.41472568486082,-34.05141083086349,-1.064891954370661,-19.228271968804496,-13.813426655972995,-0.34442117499116826,-0.1809880180958088,-1.7653273598746106,-9.450739267404566,-0.9439935424705289,-4.630766004865764,-2.3842612032788013,-2.4812645326006852,-1.2454126388586086,-1.2702159166430553,-17.19537328124011,-2.510620742073826,-0.10697191874571445,-21.16979943507367,-11.359923224816663,-4.724013672846733,-9.03667108622426,0.0,-2.378071025313655,-2.0729838357412422,-2.3510198125070065,-4.967070222288036,-1.9492884471348535,-6.953423390225705,-2.4207914117652276,-1.5626620052143225,-10.462956857979833,-34.27097938940955,-34.951460339068944],"x":[4.0,1.0,5.0,3.0,4.0,0.0,7.0,2.0,0.0,7.0,2.0,8.0,13.0,5.0,1.0,0.0,10.0,4.0,1.0,2.0,2.0,3.0,2.0,2.0,5.0,0.0,4.0,9.0,4.0,1.0,14.0,5.0,8.0,2.0,6.0,7.0,10.0,1.0,5.0,5.0,2.0,3.0,1.0,6.0,2.0,1.0,6.0,8.0,3.0,14.0,3.0,1.0,4.0,10.0,10.0,1.0,1.0,12.0,5.0,9.0,3.0,6.0,9.0,2.0,7.0,1.0,3.0,1.0,14.0,11.0,5.0,5.0,8.0,12.0,1.0,9.0,1.0,6.0,5.0,9.0,3.0,1.0,9.0,0.0,1.0,6.0,1.0,0.0,13.0,17.0,5.0,2.0,7.0,2.0,9.0,13.0,0.0,8.0,2.0,4.0,5.0,1.0,5.0,1.0,0.0,0.0,8.0,2.0,2.0,1.0,14.0,1.0,2.0,6.0,3.0,6.0,9.0,1.0,0.0,1.0,12.0,8.0,14.0,13.0,1.0,0.0,2.0,1.0,12.0,15.0,0.0,3.0,4.0,1.0,1.0,0.0,1.0,1.0,2.0,2.0,8.0,9.0,2.0,5.0,1.0,19.0,2.0,4.0,2.0,4.0,1.0,7.0,15.0,2.0,1.0,2.0,1.0,3.0,0.0,5.0,11.0,1.0,1.0,16.0,7.0,7.0,0.0,5.0,7.0,7.0,1.0,8.0,5.0,4.0,2.0,3.0,8.0,10.0,0.0,2.0,1.0,4.0,2.0,13.0,16.0,3.0,6.0,0.0,1.0,11.0,0.0,4.0,12.0,14.0,4.0,1.0,0.0,14.0,1.0,6.0,9.0,7.0,1.0,13.0,9.0,4.0,5.0,6.0,4.0,7.0,0.0,5.0,7.0,12.0,3.0,0.0,0.0,18.0,3.0,2.0,1.0,6.0,1.0,10.0,3.0,0.0,0.0,6.0,0.0,5.0,7.0,1.0,12.0,2.0,4.0,3.0,5.0,4.0,3.0,4.0,6.0,2.0,5.0,9.0,4.0,1.0,12.0,2.0,1.0,5.0,9.0,5.0,1.0,9.0,8.0,11.0,6.0,2.0,1.0,3.0,6.0,19.0,2.0,0.0,0.0,10.0,15.0,19.0,6.0,10.0,12.0,4.0,7.0,8.0,2.0,13.0,1.0,0.0,0.0,0.0,6.0,1.0,1.0,8.0,0.0,3.0,3.0,12.0,1.0,1.0,1.0,0.0,9.0,4.0,11.0,0.0,1.0,4.0,5.0,0.0,5.0,3.0,6.0,11.0,5.0,0.0,8.0,8.0,3.0,6.0,5.0,15.0,4.0,0.0,1.0,4.0,13.0,9.0,2.0,0.0,8.0,8.0,1.0,16.0,2.0,0.0,6.0,10.0,1.0,6.0,3.0,6.0,1.0,13.0,4.0,7.0,2.0,6.0,10.0,7.0,8.0,2.0,7.0,4.0,5.0,1.0,6.0,2.0,1.0,5.0,1.0,0.0,1.0,14.0,1.0,2.0,2.0,3.0,6.0,2.0,9.0,1.0,4.0,5.0,0.0,2.0,4.0,12.0,0.0,4.0,0.0,12.0,2.0,3.0,2.0,2.0,10.0,8.0,4.0,0.0,0.0,13.0,4.0,4.0,1.0,5.0,1.0,1.0,3.0,4.0,10.0,13.0,4.0,3.0,4.0,0.0,12.0,5.0,1.0,8.0,3.0,7.0,6.0,5.0,1.0,0.0,3.0,10.0,12.0,6.0,1.0,4.0,8.0,10.0,2.0,0.0,11.0,1.0,0.0,0.0,17.0,0.0,7.0,15.0,4.0,1.0,2.0,5.0,0.0,7.0,6.0,6.0,0.0,13.0,6.0,9.0,9.0,6.0,13.0,0.0,2.0,3.0,1.0,9.0,12.0,6.0,4.0,2.0,4.0,1.0,8.0,1.0,3.0,0.0,5.0,1.0,0.0,17.0,1.0,12.0,18.0,4.0,8.0,0.0,1.0,0.0,13.0,0.0,2.0,8.0,12.0,3.0,13.0,4.0,3.0,1.0,2.0,6.0,3.0,1.0,0.0,4.0,4.0,1.0,13.0,14.0,7.0,1.0,5.0,0.0,0.0,7.0,0.0,5.0,0.0,5.0,5.0,4.0,3.0,3.0,2.0,5.0,0.0,8.0,0.0,1.0,1.0,5.0,6.0,2.0,4.0,3.0,2.0,1.0,1.0,8.0,10.0,4.0,2.0,6.0,7.0,12.0,14.0,1.0,9.0,7.0,2.0,0.0,8.0,11.0,12.0,15.0,6.0,6.0,0.0,1.0,0.0,2.0,4.0,14.0,3.0,10.0,1.0,0.0,5.0,6.0,5.0,10.0,1.0,3.0,0.0,1.0,1.0,6.0,3.0,3.0,6.0,3.0,2.0,4.0,2.0,17.0,7.0,5.0,2.0,3.0,13.0,0.0,5.0,1.0,5.0,20.0,4.0,12.0,8.0,4.0,8.0,0.0,5.0,5.0,9.0,12.0,8.0,2.0,0.0,16.0,2.0,0.0,10.0,14.0,3.0,3.0,5.0,14.0,9.0,1.0,0.0,10.0,8.0,0.0,1.0,4.0,6.0,4.0,9.0,10.0,3.0,5.0,4.0,0.0,7.0,0.0,3.0,16.0,0.0,8.0,8.0,0.0,0.0,1.0,8.0,0.0,2.0,15.0,10.0,2.0,10.0,0.0,1.0,10.0,8.0,0.0,1.0,0.0,1.0,3.0,10.0,6.0,1.0,8.0,0.0,15.0,2.0,2.0,2.0,8.0,4.0,2.0,1.0,3.0,14.0,10.0,8.0,7.0,0.0,8.0,0.0,3.0,16.0,6.0,4.0,1.0,3.0,9.0,16.0,5.0,11.0,1.0,0.0,6.0,13.0,0.0,9.0,5.0,4.0,2.0,3.0,4.0,3.0,1.0,2.0,9.0,13.0,11.0,0.0,11.0,3.0,15.0,4.0,16.0,3.0,3.0,1.0,3.0,5.0,2.0,3.0,0.0,4.0,7.0,2.0,1.0,0.0,1.0,3.0,7.0,13.0,2.0,7.0,2.0,17.0,12.0,12.0,6.0,2.0,1.0,12.0,10.0,4.0,1.0,0.0,15.0,8.0,3.0,8.0,0.0,8.0,0.0,5.0,1.0,0.0,1.0,2.0,9.0,1.0,0.0,5.0,15.0,9.0,5.0,0.0,15.0,5.0,0.0,2.0,7.0,5.0,7.0,5.0,3.0,16.0,0.0,11.0,6.0,13.0,1.0,0.0,12.0,6.0,10.0,5.0,4.0,10.0,0.0,9.0,1.0,2.0,7.0,9.0,9.0,0.0,6.0,1.0,10.0,2.0,1.0,10.0,3.0,10.0,10.0,1.0,3.0,10.0,8.0,4.0,13.0,5.0,3.0,6.0,2.0,4.0,10.0,4.0,0.0,19.0,7.0,12.0,3.0,5.0,0.0,14.0,5.0,0.0,1.0,0.0,4.0,0.0,6.0,10.0,0.0,7.0,17.0,2.0,6.0,2.0,4.0,4.0,3.0,1.0,16.0,2.0,11.0,14.0,5.0,2.0,6.0,12.0,3.0,2.0,2.0,2.0,8.0,1.0,0.0,8.0,3.0,3.0,2.0,3.0,1.0,1.0,12.0,3.0,4.0,9.0,1.0,3.0,2.0,1.0,6.0,1.0,0.0,0.0,1.0,1.0,2.0,3.0,0.0,15.0,2.0,8.0,7.0,3.0,1.0,3.0,0.0,17.0,4.0,10.0,13.0,1.0,0.0,11.0,3.0,6.0,3.0,2.0,4.0,3.0,7.0,9.0,12.0,5.0,12.0,9.0,2.0,4.0,3.0,13.0,2.0,11.0,1.0,4.0,2.0,1.0,2.0,12.0,13.0,15.0,1.0,6.0,0.0,1.0,5.0,6.0,3.0,12.0,1.0,0.0,7.0,16.0,1.0,1.0,11.0,1.0,2.0,1.0,1.0,4.0,0.0,0.0,1.0,1.0,1.0,6.0,9.0,6.0,17.0,3.0,11.0,7.0,1.0,5.0,3.0,9.0,3.0,8.0,9.0,6.0,1.0,3.0,9.0,6.0,1.0,8.0,1.0,1.0,1.0,5.0,0.0,1.0,7.0,5.0,7.0,1.0,3.0,1.0,9.0,0.0,5.0,0.0,1.0,10.0,4.0,9.0,4.0,12.0,14.0,1.0,7.0,11.0,0.0,0.0,1.0,5.0,1.0,7.0,4.0,3.0,0.0,1.0,8.0,1.0,0.0,14.0,10.0,5.0,4.0,0.0,2.0,5.0,3.0,2.0,3.0,2.0,4.0,3.0,2.0,17.0,14.0],"p":[0.04543573527209484,0.13559447872041108,0.02357049789690535,0.16148104500058036,0.05202387199838752,0.09352770120379411,0.12287887887573024,0.13183296123861007,0.07588433993792583,0.15462869724700445,0.09254926322095272,0.12695742291181808,0.04840347618742294,0.07391279564858406,0.1923845390778164,0.03554105606664191,0.009271437757187152,0.004885034441586367,0.10636459018962273,0.019757214197435237,0.009195000592171576,0.17087530951712063,0.11052485899185589,0.15763871589099854,0.1236840535470051,0.14421282399487398,0.11348025174727012,0.1785355623097885,0.007863528179663338,0.07627240132723304,0.12798107081080898,0.07942552148596077,0.06790503724339213,0.011968220953006049,0.08548115034075653,0.10229698799834536,0.022869968078361058,0.08701713561768175,0.0790071657735171,0.13276368172757672,0.1341345146216669,0.18415420075161865,0.18764388051696354,0.0686544028149934,0.1167850883999027,0.11903659809730405,0.14540120115893948,0.13739107913868334,0.10019708558441778,0.15515282267236602,0.09110166770867414,0.01806474668032152,0.032417066653601494,0.06767331380670383,0.17984397509736502,0.015613775935501506,0.14600037293797433,0.03466237589011212,0.1719520810915628,0.09188478097648894,0.19890965384338763,0.13340797075691127,0.08945736278918148,0.02244502295050692,0.07903742478066876,0.0076397914020251536,0.16407035070449907,0.0503050133731878,0.015202778642589943,0.07367964768279377,0.1287569167436521,0.07458804568699132,0.1137308526008821,0.1901427435229208,0.05642998365730772,0.04422409912533172,0.021662035568104268,0.10540269340639981,0.027369331740907745,0.12683263752710974,0.0057359588059492156,0.07271950684409814,0.11006736253612691,0.04410237309869025,0.11615375182387835,0.11177893948777413,0.04487994952941432,0.09357943323953358,0.18404197096779434,0.07547442395227795,0.16226587151472316,0.10937463552573551,0.15903970234326176,0.011892743517327053,0.0991453077082066,0.0076183064945502645,0.017733664204661225,0.12722422977877454,0.014212824160294346,0.010521833170734896,0.06010112630365736,0.1210444125193821,0.026569418900989607,0.012801904402171216,0.0387545385050617,0.09513309627242213,0.11326394516100123,0.15894758503145498,0.1928248604129446,0.1377795596241287,0.1940488158547379,0.14719023233633624,0.15923985897724707,0.03953962071986679,0.0960321412190556,0.050256435327206896,0.19085971984374772,0.11453273612265394,0.16106699105927982,0.15363924311525465,0.0851710932510259,0.17908587618627936,0.16811749733523534,0.18939187484549502,0.15410889030466401,0.04089276793045249,0.13490755482737865,0.1249141565114965,0.07728256161607781,0.13761873098049393,0.15248434966551674,0.1468177143713227,0.07743224412719402,0.13065352530670596,0.16635474841156334,0.14718249279166226,0.10694125108347459,0.0694610477114133,0.09292590143349232,0.15901585825808404,0.01414895140178456,0.12431660855179327,0.13663234489139864,0.02737977911414844,0.12978939585868746,0.09183784694272373,0.12373168537757606,0.11755580036278426,0.1549826138019914,0.18144324453307928,0.018255843975303467,0.09915912888853372,0.15283515404309297,0.05750814992728821,0.09609480905832118,0.15277002576797907,0.16681510120762288,0.04641562107242834,0.1831930367578624,0.05041618075172503,0.11255168248172187,0.09159152892359335,0.09338028238131844,0.05377840778807337,0.18034189680472879,0.16637848252062304,0.08707469890126003,0.10729989536455219,0.013865413219254564,0.159420775050937,0.16212098923886686,0.008532004478093302,0.17382124415683392,0.007797713316417099,0.1991075120178366,0.05885840783520933,0.12352735604887499,0.1661642151522471,0.13733337321519987,0.07568278271563189,0.031417556819168316,0.017968078043671423,0.0029481480524409243,0.017055647513908402,0.10304239935235936,0.18204245171737743,0.15153575801042268,0.07242486995115192,0.11494699852902057,0.004398007146219784,0.18695986027232803,0.11388290622458959,0.06745270411016323,0.18660243641146101,0.03789007571241054,0.16948683507428886,0.10336758428531848,0.13573223804653406,0.12474428822289352,0.15825381551592943,0.11609405264944384,0.19281369065266457,0.047506362912150206,0.1328624156065695,0.1564660165568665,0.03301432869110932,0.13671695241006007,0.11083518555355926,0.01752922056956514,0.09397480361932486,0.18955919295536688,0.06918576369688707,0.19997809114428838,0.1273084717150312,0.0888819332413243,0.11468529878716259,0.11932683219584912,0.14424225665387153,0.16610137783139844,0.1342529015007284,0.17689308366968054,0.10794102577298244,0.022788159027221734,0.06934498870575619,0.1618332166763477,0.11934396703336932,0.18609148276028234,0.1357463780246497,0.13500940686139207,0.11436320299571237,0.12912564734490226,0.09439383390479246,0.13496611671292455,0.11342677324575456,0.060062977415700707,0.16477836671483637,0.09056823846005085,0.02707493355800992,0.07767413029471287,0.15726456693181037,0.030575322569506947,0.07262748939019233,0.11244869314065294,0.11991886819899059,0.0988174264410998,0.010814173192825738,0.1779018801041363,0.1267136835551348,0.19276954658666934,0.030209077946518906,0.12349877288712374,0.0008339245895318204,0.13959837910313996,0.10167758025519431,0.004330886264409451,0.0837641322288239,0.05457733149537716,0.053894968619985266,0.11995709190738442,0.14279807893119517,0.09166997672977512,0.031407192386109894,0.007730636418212811,0.025808624865552687,0.17270333165603563,0.008580892664755035,0.06199898126968165,0.06769820716731521,0.04800774831789121,0.014215014811108118,0.0885630842781625,0.15884749957694752,0.11556215768561891,0.05337483123076106,0.13349009372586185,0.0832908142516621,0.10444867361233628,0.1857844830943275,0.014597323266321773,0.04567888212628,0.07890432483743903,0.057964790639307665,0.10162322746092892,0.06100479667158294,0.12110803076871327,0.13412358793853346,0.06491148946034948,0.007754918765709374,0.16158493984253253,0.03938385695831706,0.1595312189887703,0.17375695925733017,0.18224753317112832,0.14289333902309026,0.15273457722029504,0.13767546982872553,0.12757225545432666,0.10178473021885326,0.12395609527890583,0.0073743100213676804,0.18330846845290388,0.02665422143204972,0.18902720749511343,0.10767482942140175,0.04207578424887584,0.07677610461413922,0.19801511160798488,0.14820335023993336,0.12268423860757359,0.17913387929677838,0.02103160051132749,0.013570831925509765,0.007354703240377525,0.17467532038411548,0.05223659921809514,0.08590407650554566,0.1003059748210322,0.15633541874974713,0.1344688059749271,0.1023453659275261,0.09694714129523595,0.09591873804990692,0.03983212461943589,0.08808287156789213,0.14220727174299672,0.10618645134214809,0.019988616169931417,0.04399010404759865,0.04629930808641119,0.18134048266014635,0.07889445767267644,0.18328935741990723,0.09435318759771234,0.16359503264177652,0.06678675602857238,0.1516045700748693,0.14462431806569653,0.08879109489120891,0.18404823204835635,0.08590988204291601,0.19955345539270342,0.006919614186651702,0.1928936299178622,0.10434827980113592,0.023878306730420597,0.1528273891703453,0.11601706185163217,0.021147754600419778,0.028997321421039057,0.178088932979996,0.13775768863042354,0.08037517661334684,0.08497799175785854,0.16829929432492874,0.12440031637678906,0.0744262800403979,0.1046969225769599,0.12769205983115373,0.17997407447065725,0.18927731631915123,0.08936494418647484,0.12561212606629618,0.16754739460873547,0.04075676459697766,0.048812159379503145,0.19094810224032488,0.10414330555916873,0.16391614980076363,0.07989045454275186,0.14104896768869257,0.018924958183983476,0.136555208407785,0.18925379941467102,0.08300493006564631,0.008721298085754147,0.1732567716487231,0.009790602889905476,0.06223897391856963,0.08825656252751922,0.10917645148906119,0.09212057805133766,0.05160653523858283,0.12156101349571675,0.06141625872533294,0.007125725920037818,0.034854190417056154,0.01918459890084794,0.17709220500011896,0.058739727003015975,0.15857380745852165,0.191285362786232,0.14502285301921197,0.11756550818612443,0.1509096295280107,0.17489403986817306,0.10354858610778371,0.07091456169899013,0.09634774752778746,0.08310501878242929,0.1462373715984988,0.050908652015742864,0.12158791734121813,0.049484916502369816,0.08460711608745074,0.04915722189433374,0.004143688214751285,0.009195485066418919,0.018107303210886893,0.11810259947899944,0.16193451648130142,0.16325174853945434,0.09883507286588077,0.07750733757314779,0.12311762901782086,0.051334457874891375,0.08069061625738892,0.07123286880975468,0.17706828341648695,0.19985279490651733,0.01888312787145563,0.03652180127592608,0.06701234024237546,0.024373161134197477,0.1391101430514377,0.06484786644306358,0.019372344516217766,0.16374270567155086,0.12309221188577678,0.07096060939905824,0.1828536790871198,0.13888963430818024,0.11583577005824158,0.19200615850691893,0.1135589219686311,0.1530404629400826,0.13164441185912149,0.0620385154654763,0.1076383222911459,0.19816204973701948,0.10033550980024382,0.050504046844562424,0.04569146144001235,0.15831867201264516,0.19998335441478368,0.0382489153388578,0.022308327632107883,0.08826466928072954,0.04519302360103934,0.06675672331987026,0.15914065105184136,0.07772553482626475,0.13521920177408556,0.10677477983134734,0.09572678400223872,0.08144098762434422,0.13077567733962223,0.08247145787983175,0.03153417200778073,0.03533714816074065,0.13432278451980598,0.17784474197700317,0.1043331389935482,0.11647301858658916,0.03492897257439043,0.1747140521890408,0.07230288646371337,0.1978692606497731,0.15709982758669006,0.004737407149033146,0.02802196537024635,0.16037470946297844,0.05951457338599023,0.09441601268406803,0.003363320676515791,0.08317363466305672,0.17699924570779688,0.023074188146503395,0.12571582175210008,0.1897539906690439,0.029059653585802182,0.0483147196122959,0.19205343547568243,0.07762176321519659,0.04409203202516348,0.13957158153943147,0.1913701790285464,0.04433372727365046,0.18234260210573253,0.18147945855627057,0.05792723019463142,0.08836516376117878,0.08651602120547808,0.003928244402544446,0.15475210665733236,0.127737138876598,0.05835657494408353,0.024283398090603116,0.17730370941937257,0.03475800044694819,0.11950895275564766,0.11096196040644779,0.16086942244538147,0.09761441487248677,0.11387309410811813,0.16537751731649875,0.035843219108641834,0.17227071233755958,0.05494869120055799,0.023661322131206666,0.1625640761564533,0.01548418227981534,0.1821845196234989,0.019538821260737207,0.07125046699365516,0.01160491428246755,0.18959445890671095,0.013500956061392344,0.08286230657707971,0.024042963654676088,0.042976190429174776,0.14218320891015584,0.16412754319007888,0.018342004361630606,0.1851463681600991,0.19814797449198496,0.08961479509039005,0.06260593005721714,0.0044894465435557866,0.032474903308486305,0.17697706385672932,0.017001715917115457,0.13981366896833275,0.03373851734446287,0.04411325173455412,0.0900807161897169,0.06307568719724976,0.15102190108903302,0.16542055540823972,0.025242241014158975,0.02359373253231243,0.125365371445651,0.19601507520901565,0.16199630684744926,0.056339115686458774,0.06413444322822759,0.10343338095113111,0.017609038124704313,0.10716363477198053,0.17324283729482032,0.13607326154532493,0.06078379866190575,0.03159880761871819,0.0671562480111895,0.02436321406975397,0.1433480949007473,0.13105533749158083,0.10896141394658461,0.0831421281308613,0.04733453821867215,0.18483224815923213,0.12387742255561417,0.12214321209455342,0.0781650862916235,0.19183029765057544,0.09772746154362243,0.14829594323074136,0.1208487125400029,0.008778809583344005,0.05677262396516523,0.02173361849927238,0.050809211135727006,0.0631166210758376,0.11398941225424744,0.19269691623171467,0.006671087928749531,0.005515372114401585,0.057248973411157644,0.08415886554225467,0.10103438858772185,0.14363001856996258,0.1725593185318653,0.1675816261693137,0.1625896927932213,0.09264826742531942,0.11049872336573881,0.036109397460611085,0.07030309338276677,0.08397839944984892,0.09801291167105286,0.19711240742129196,0.14631769936011763,0.1624809281728594,0.004885327136291595,0.16370927074725572,0.02614468525878033,0.15289464809877878,0.15107629312549375,0.10535993667096695,0.1464102091308512,0.13488586163160177,0.1276248063544539,0.18359733068029752,0.16144212227198695,0.12749979771505912,0.10668211349738664,0.08567747492886024,0.020692987998360793,0.01973549029359263,0.08873089349084369,0.13676273134033862,0.1482978613787981,0.024877530818019047,0.09632216141685342,0.07096764504352877,0.03776430899203205,0.05188082470641007,0.066365562059491,0.10283111995260708,0.09459777451325194,0.18931974293842552,0.05366219376337433,0.1576635149003992,0.18756228540352382,0.11724732051199771,0.030814989068116375,0.1969156805343651,0.021455105813769082,0.10266130021255147,0.11943169932182772,0.012848279409072162,0.198122042665819,0.19005976881211845,0.0879799399331101,0.05580969717122511,0.1422958764025097,0.05409884813724202,0.1923903572758955,0.14501647297258363,0.12147342967439366,0.10457422702106545,0.13654319677019022,0.04937468971662105,0.06629674651306745,0.023340855637533454,0.13338425638108517,0.06967937636087998,0.08827306022602938,0.12988664182603285,0.07095398996845943,0.014643951727141991,0.01532956682354616,0.19237638245086106,0.07706823980508291,0.09911936206323438,0.07705175439936168,0.08416964058761689,0.0047726853608276,0.14854789888959014,0.08875488120278296,0.19569336845155846,0.13519742720821962,0.16338031889983098,0.17731903874431532,0.05620575987386487,0.11390861026408663,0.17110252091678457,0.027869666798150707,0.17129093024921313,0.11055487370494946,0.010309522167947628,0.1400980042950247,0.10794511679306118,0.1381632998619097,0.0008798316281076968,0.08368072604984028,0.10077102542267823,0.043426045856195916,0.05246146575028568,0.02770294367428985,0.1270969984725847,0.19493434588254785,0.16763441757745756,0.19376672357554803,0.15823445686176418,0.17840420805974655,0.19240711459626142,0.13626955052770948,0.15419107935595855,0.0027263787199628188,0.17149120864327172,0.1938208787394139,0.18166375487096934,0.1075425910549655,0.10709261041246282,0.11299570028842286,0.014421392058688776,0.11547894405932504,0.14220536905441925,0.08887838751478463,0.16076242552883815,0.16546200365011116,0.07224411729453513,0.1993325301362594,0.053272329408099096,0.03879526028762675,0.17092052396046414,0.11977118856157017,0.18918055559575087,0.07242368432895967,0.09596882132388723,0.16890092784731117,0.11764195638928064,0.024220765064636485,0.14261130861102306,0.05329032226063793,0.05408101912807726,0.1964297467013022,0.034984341666365326,0.0874952259176045,0.152847678723679,0.15113320240044545,0.1784404292901862,0.08183336775426397,0.1153049451870269,0.14023580605862804,0.08298458354596039,0.11588251636415099,0.016427580228707717,0.1429013814366061,0.06295921519184487,0.08224850330795613,0.020383495698635335,0.09621393396438016,0.03203116193294769,0.14409604612222982,0.09833876842902184,0.04728839335403001,0.1472581407067576,0.10662778153723124,0.017860207914390403,0.15255570655559203,0.18738237205397015,0.07477941190183467,0.028775097813942052,0.09913258379510244,0.033199629265891865,0.15035620379594256,0.12838510492341326,0.07985503890431667,0.02132128401089899,0.003337340805662503,0.15562244196420624,0.13959620252863067,0.07089975393555892,0.1279791591483578,0.16150862304973962,0.15473904274519312,0.14803144631224874,0.1258326802905305,0.05663669320034646,0.046998254981452804,0.1438701779127549,0.12006397258070273,0.06703243934136012,0.051117002440665575,0.1768242307523382,0.1420550197653676,0.08746176231760812,0.13609892149101635,0.1293204473379872,0.18822622724508015,0.1845278212938425,0.07228755002733274,0.012084140694884261,0.18449958885807338,0.1693027360390588,0.009501357909325492,0.03698299227492657,0.0606641970046554,0.15536928067242894,0.1470721890405677,0.0987109943563786,0.02910967840708332,0.047091453676293596,0.12891772181383887,0.004388836364818883,0.08344424569861603,0.044787846933942,0.13015261848646845,0.1709198178734932,0.14009854133795382,0.10561116194198195,0.17108656896357513,0.11448323431988482,0.1902145759388666,0.03286805623989273,0.038802622069784534,0.08898067442755134,0.19975402948931845,0.16153136839709537,0.0430469841505877,0.10133187967457383,0.10350777820616447,0.013767140390472133,0.04875536297747303,0.18224492571177942,0.13969893109498707,0.07935733281180357,0.051825063778673464,0.03624244314019092,0.050087400740191294,0.05545936781985383,0.09156350461354844,0.012616549036501647,0.19782434173846997,0.1342999322605011,0.09457325077843813,0.144923959880812,0.09872668126105091,0.018137817580553994,0.15469087889662322,0.06464670345103576,0.03654543323943438,0.04061689598493637,0.019335113136796124,0.07166004245187874,0.11277420575318553,0.18356365394175894,0.159291068538658,0.0423541674637618,0.15997470017157123,0.018783494825678426,0.18301420424350648,0.1591285636785741,0.08093692565474725,0.16693370889662493,0.05632755674232773,0.1686491500295266,0.0008252858318140267,0.09832123935554282,0.09826256379673959,0.10151758481046157,0.04023430400774406,0.14194556711631331,0.18957375801196866,0.08771375832408475,0.07051291450997886,0.00890429966580828,0.09614904323950296,0.14113671757423055,0.15349096559627157,0.1564574421398696,0.12011805612322367,0.16795074381265165,0.0973330144632874,0.17863205884045452,0.16477444463673724,0.15667433557214558,0.1948777304034112,0.09475972368530582,0.046490589211276225,0.06038042491404863,0.17067397659633718,0.15929999303965592,0.03132138502527857,0.00203783279307217,0.12014880396688313,0.18168050509354103,0.04443614456383447,0.01691558172986305,0.18424725345784865,0.14508427035439994,0.08438914640032431,0.1923129129525568,0.18339018661619783,0.06587783493612652,0.07040180473995376,0.11412602230867411,0.18727714172189314,0.16633393705606664,0.02152404550027356,0.14440745535664742,0.05527328485483203,0.10870342107718063,0.06676041157082767,0.05926269327047909,0.15540411151357994,0.10428069564964498,0.13137813410910112,0.1588739672176549,0.019682077387844377,0.11083080601102724,0.10257908668952807,0.09600067404424971,0.14114229813046847,0.021203424392174777,0.1504286752984465,0.13416367328148282,0.103627516715627,0.08859693228635597,0.11010542242095167,0.1283920243721429,0.02771314614272842,0.07468381364839889,0.005346177053093548,0.055210924513059784,0.12192251102165118,0.1892556144220995,0.02585851306046423,0.18125545922968644,0.0980821561108857,0.04138483326323583,0.08473113730446694,0.07984935262673304,0.19683276723632886,0.0484462344645189,0.0861396861757533,0.1932671567179466,0.09299011168421956,0.18555207455396433,0.050994394602703746,0.1742731939021244,0.128283239051854,0.1963157506759925,0.19207087944877288,0.004024100905355966,0.052570549047492726,0.09682947872156321,0.10936104590864311,0.03601521076378598,0.029877382387077225,0.044373959902977766,0.12183724562115202,0.05147278277748142,0.18382984922228607,0.04745249389484654,0.08580009239657516,0.10105752899086645,0.11636478246439008,0.07879491124416355,0.03544710074782307,0.19420271738692996,0.1948911391769307,0.12334215487926588,0.03216259339275598,0.03184720657340012,0.08549445592333318,0.0263113816470828,0.009175567282624142,0.11505790870494606,0.12518237653237865,0.025910990377674237,0.048941795539186164,0.10681620070418757,0.06306611951211623,0.09089491285005132,0.03593206457928453,0.15750424923345668,0.10261540928846524,0.19357908126779308,0.19106624585855914,0.08010995993024338,0.13361381882201148,0.05019389954059675,0.07794524178699747,0.07306179076633797,0.05681847130598583,0.06298150628480124,0.1316266615192141,0.047981745889610794,0.15726695578750519,0.08250238062900546,0.16555464311979035,0.09449460914283364,0.0705583359518502,0.1304027796152228,0.1620709658476252,0.11248137071907634,0.13277229069991817,0.09135515636061049,0.19263972651477804,0.04914733201847837,0.017426970883734995,0.10144909492751651,0.11814024789936216,0.11414639086007337,0.17183412316522173,0.04442636421620523,0.08053574782080375,0.09626843336000031,0.17278916624325713,0.07041001993628626,0.027516357811629668,0.1324885727626494,0.0028791080374765965,0.1246052054687643,0.17563975819748634,0.005345616343512028,0.11316625496136812,0.0590243366761162],"n":[5.0,18.0,12.0,5.0,6.0,0.0,13.0,2.0,0.0,13.0,2.0,10.0,14.0,6.0,1.0,0.0,12.0,8.0,8.0,9.0,2.0,19.0,6.0,5.0,14.0,0.0,5.0,11.0,9.0,5.0,14.0,10.0,16.0,4.0,16.0,15.0,16.0,6.0,7.0,12.0,5.0,16.0,2.0,10.0,17.0,16.0,7.0,8.0,5.0,18.0,9.0,7.0,6.0,19.0,11.0,9.0,4.0,12.0,14.0,12.0,14.0,7.0,16.0,14.0,14.0,16.0,10.0,1.0,15.0,12.0,6.0,6.0,10.0,16.0,3.0,9.0,1.0,20.0,6.0,14.0,12.0,6.0,13.0,0.0,2.0,10.0,7.0,0.0,16.0,19.0,8.0,3.0,18.0,2.0,18.0,16.0,7.0,13.0,15.0,5.0,10.0,7.0,10.0,1.0,7.0,1.0,11.0,4.0,5.0,2.0,14.0,12.0,19.0,7.0,5.0,8.0,16.0,1.0,14.0,7.0,13.0,14.0,19.0,19.0,6.0,2.0,17.0,3.0,12.0,18.0,1.0,5.0,10.0,2.0,12.0,2.0,14.0,9.0,5.0,13.0,11.0,14.0,2.0,7.0,13.0,20.0,10.0,9.0,17.0,8.0,2.0,7.0,17.0,10.0,3.0,2.0,13.0,5.0,12.0,10.0,13.0,2.0,5.0,19.0,16.0,14.0,1.0,9.0,10.0,8.0,17.0,9.0,14.0,5.0,14.0,5.0,19.0,15.0,5.0,5.0,1.0,16.0,9.0,13.0,19.0,10.0,7.0,1.0,3.0,19.0,0.0,9.0,13.0,18.0,5.0,16.0,10.0,20.0,4.0,15.0,10.0,20.0,5.0,14.0,12.0,18.0,8.0,6.0,5.0,9.0,2.0,14.0,12.0,12.0,5.0,4.0,0.0,20.0,5.0,6.0,3.0,10.0,6.0,13.0,13.0,7.0,3.0,8.0,1.0,5.0,9.0,3.0,13.0,19.0,5.0,5.0,13.0,14.0,3.0,8.0,8.0,9.0,6.0,14.0,6.0,1.0,12.0,2.0,3.0,10.0,13.0,9.0,1.0,15.0,16.0,12.0,9.0,2.0,2.0,8.0,16.0,20.0,9.0,0.0,0.0,11.0,17.0,19.0,13.0,13.0,18.0,14.0,13.0,14.0,9.0,19.0,17.0,1.0,2.0,19.0,16.0,1.0,10.0,8.0,3.0,13.0,5.0,17.0,2.0,2.0,9.0,0.0,20.0,12.0,17.0,3.0,7.0,17.0,5.0,1.0,7.0,8.0,10.0,16.0,9.0,1.0,9.0,8.0,14.0,16.0,16.0,20.0,18.0,16.0,14.0,5.0,15.0,9.0,10.0,1.0,13.0,18.0,10.0,16.0,4.0,0.0,13.0,12.0,13.0,7.0,4.0,17.0,9.0,14.0,17.0,7.0,12.0,7.0,15.0,19.0,10.0,7.0,15.0,8.0,5.0,5.0,11.0,4.0,7.0,7.0,1.0,2.0,6.0,17.0,10.0,4.0,12.0,15.0,14.0,2.0,15.0,18.0,18.0,7.0,18.0,2.0,6.0,12.0,1.0,5.0,2.0,14.0,4.0,6.0,16.0,10.0,17.0,9.0,19.0,1.0,1.0,14.0,15.0,10.0,11.0,12.0,2.0,2.0,10.0,4.0,11.0,16.0,6.0,10.0,12.0,2.0,14.0,16.0,2.0,8.0,8.0,18.0,10.0,13.0,2.0,2.0,7.0,10.0,17.0,17.0,3.0,8.0,9.0,13.0,11.0,16.0,13.0,17.0,18.0,0.0,17.0,2.0,17.0,17.0,5.0,15.0,6.0,5.0,8.0,11.0,8.0,8.0,0.0,19.0,17.0,10.0,18.0,19.0,20.0,15.0,5.0,9.0,3.0,18.0,16.0,9.0,9.0,4.0,15.0,2.0,20.0,6.0,12.0,2.0,18.0,2.0,1.0,20.0,2.0,13.0,19.0,9.0,19.0,2.0,2.0,1.0,17.0,0.0,3.0,14.0,12.0,11.0,14.0,14.0,14.0,18.0,4.0,13.0,6.0,4.0,1.0,4.0,8.0,3.0,17.0,17.0,15.0,3.0,6.0,1.0,3.0,9.0,0.0,10.0,4.0,15.0,7.0,14.0,6.0,12.0,14.0,11.0,20.0,11.0,1.0,12.0,15.0,5.0,14.0,5.0,19.0,5.0,16.0,1.0,5.0,15.0,14.0,8.0,7.0,18.0,9.0,20.0,17.0,2.0,11.0,8.0,14.0,2.0,13.0,14.0,14.0,16.0,20.0,7.0,1.0,3.0,0.0,3.0,17.0,16.0,16.0,18.0,6.0,0.0,17.0,17.0,17.0,12.0,2.0,5.0,0.0,15.0,16.0,7.0,5.0,11.0,9.0,10.0,7.0,6.0,7.0,19.0,16.0,6.0,20.0,14.0,17.0,1.0,11.0,5.0,16.0,20.0,13.0,19.0,8.0,19.0,12.0,13.0,18.0,6.0,10.0,12.0,14.0,6.0,2.0,16.0,2.0,18.0,20.0,16.0,9.0,17.0,19.0,17.0,9.0,8.0,8.0,17.0,16.0,1.0,16.0,7.0,18.0,8.0,13.0,17.0,17.0,13.0,6.0,2.0,8.0,2.0,6.0,18.0,7.0,12.0,10.0,1.0,6.0,11.0,14.0,4.0,4.0,18.0,18.0,14.0,12.0,0.0,2.0,13.0,20.0,6.0,2.0,0.0,5.0,18.0,13.0,9.0,14.0,17.0,1.0,19.0,12.0,12.0,5.0,13.0,7.0,2.0,5.0,8.0,17.0,19.0,17.0,15.0,7.0,11.0,18.0,11.0,17.0,8.0,4.0,3.0,4.0,16.0,17.0,17.0,13.0,15.0,3.0,12.0,19.0,18.0,15.0,20.0,8.0,5.0,4.0,17.0,5.0,3.0,2.0,19.0,13.0,19.0,1.0,16.0,10.0,18.0,7.0,17.0,10.0,3.0,18.0,19.0,11.0,3.0,3.0,1.0,13.0,13.0,19.0,4.0,15.0,2.0,8.0,12.0,19.0,11.0,7.0,10.0,19.0,18.0,15.0,14.0,4.0,13.0,18.0,15.0,5.0,2.0,1.0,16.0,12.0,5.0,15.0,4.0,8.0,0.0,8.0,1.0,1.0,3.0,6.0,13.0,1.0,1.0,8.0,18.0,10.0,7.0,2.0,19.0,5.0,1.0,18.0,13.0,12.0,19.0,8.0,3.0,18.0,2.0,15.0,6.0,17.0,2.0,0.0,15.0,16.0,16.0,11.0,19.0,12.0,0.0,9.0,20.0,5.0,12.0,14.0,18.0,2.0,13.0,1.0,11.0,9.0,11.0,14.0,19.0,16.0,11.0,5.0,14.0,13.0,12.0,18.0,18.0,15.0,7.0,8.0,9.0,11.0,15.0,5.0,5.0,20.0,14.0,13.0,17.0,6.0,5.0,19.0,6.0,6.0,5.0,1.0,9.0,6.0,15.0,14.0,1.0,17.0,19.0,2.0,12.0,2.0,5.0,13.0,10.0,3.0,18.0,4.0,17.0,17.0,9.0,8.0,9.0,15.0,10.0,3.0,8.0,9.0,8.0,3.0,2.0,13.0,5.0,10.0,9.0,7.0,1.0,2.0,17.0,11.0,7.0,9.0,7.0,19.0,13.0,2.0,8.0,10.0,0.0,1.0,2.0,20.0,3.0,12.0,0.0,17.0,11.0,15.0,18.0,4.0,4.0,15.0,1.0,19.0,6.0,11.0,19.0,1.0,1.0,15.0,12.0,11.0,7.0,4.0,10.0,10.0,9.0,16.0,14.0,16.0,18.0,15.0,3.0,15.0,3.0,14.0,19.0,13.0,7.0,7.0,10.0,3.0,14.0,15.0,18.0,16.0,14.0,6.0,10.0,2.0,20.0,8.0,4.0,17.0,6.0,3.0,7.0,20.0,2.0,7.0,13.0,1.0,12.0,13.0,6.0,7.0,12.0,0.0,3.0,2.0,2.0,8.0,14.0,8.0,18.0,6.0,13.0,16.0,16.0,5.0,4.0,18.0,4.0,16.0,19.0,16.0,3.0,18.0,14.0,10.0,11.0,13.0,1.0,20.0,3.0,6.0,20.0,19.0,8.0,11.0,13.0,7.0,7.0,5.0,13.0,2.0,5.0,19.0,7.0,16.0,6.0,12.0,19.0,12.0,16.0,4.0,8.0,15.0,4.0,1.0,2.0,8.0,6.0,17.0,18.0,9.0,13.0,10.0,13.0,5.0,1.0,19.0,19.0,9.0,7.0,0.0,6.0,19.0,18.0,5.0,12.0,16.0,16.0,12.0,2.0,18.0,16.0]}

},{}],200:[function(require,module,exports){
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
	t.strictEqual( typeof factory, 'function', 'main export is a function' );
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

	logpmf = factory( 20, 0.5 );
	y = logpmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( NaN, 0.5 );
	y = logpmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( 20, NaN );
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

tape( 'if provided a valid `n` and `p`, the function returns a function which returns `0` when provided a negative integer for `x`', function test( t ) {
	var logpmf;
	var y;

	logpmf = factory( 20, 0.5 );
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

tape( 'if provided a valid `n` and `p`, the function returns a function which returns `0` when provided a non-integer for `x`', function test( t ) {
	var logpmf;
	var y;

	logpmf = factory( 20, 0.5 );
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

tape( 'if provided a valid `n` and `p`, the function returns a function which returns `0` for all `x` larger than `n`', function test( t ) {
	var logpmf;
	var y;

	logpmf = factory( 20, 0.5 );
	y = logpmf( 21.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( 22.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( 50.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a success probability `p` outside `[0,1]`, the created function always returns `NaN`', function test( t ) {
	var logpmf;
	var y;

	logpmf = factory( 20, 1.2 );

	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpmf( 0.0 );
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

tape( 'if provided a `n` which is not a nonnegative integer, the created function always returns `NaN`', function test( t ) {
	var logpmf;
	var y;

	logpmf = factory( -1.0, 0.5 );

	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( 1.5, 0.5 );
	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( NINF, 0.5 );
	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( PINF, 0.5 );
	y = logpmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `p` or `n` equals `0`, the created function evaluates a degenerate distribution centered at `0.0`', function test( t ) {
	var logpmf;
	var y;

	logpmf = factory( 8, 0.0 );

	y = logpmf( 0.0 );
	t.equal( y, 0.0, 'returns 0 for x equal to 0' );

	y = logpmf( 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpmf = factory( 0.0, 0.5 );

	y = logpmf( 0.0 );
	t.equal( y, 0.0, 'returns 0 for x equal to 0' );

	y = logpmf( 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `p` equals `1.0`, the created function evaluates a degenerate distribution centered at `n`', function test( t ) {
	var logpmf;
	var y;

	logpmf = factory( 8, 1.0 );

	y = logpmf( 8.0 );
	t.equal( y, 0.0, 'returns 0 for x equal to 8' );

	y = logpmf( 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logpmf for `x` given large `n` and `p`', function test( t ) {
	var expected;
	var logpmf;
	var delta;
	var tol;
	var x;
	var n;
	var p;
	var y;
	var i;

	expected = highHigh.expected;
	x = highHigh.x;
	n = highHigh.n;
	p = highHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		logpmf = factory( n[i], p[i] );
		y = logpmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 30.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpmf for `x` given a large `n` and small `p`', function test( t ) {
	var expected;
	var logpmf;
	var delta;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = highSmall.expected;
	x = highSmall.x;
	n = highSmall.n;
	p = highSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		logpmf = factory( n[i], p[i] );
		y = logpmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 20.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpmf for `x` given small `n` and large `p`', function test( t ) {
	var expected;
	var logpmf;
	var delta;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = smallHigh.expected;
	x = smallHigh.x;
	n = smallHigh.n;
	p = smallHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		logpmf = factory( n[i], p[i] );
		y = logpmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 20.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpmf for `x` given small `n` and `p`', function test( t ) {
	var expected;
	var logpmf;
	var delta;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = smallSmall.expected;
	x = smallSmall.x;
	n = smallSmall.n;
	p = smallSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		logpmf = factory( n[i], p[i] );
		y = logpmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 10.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/binomial/logpmf/test/test.factory.js")
},{"./../lib/factory.js":193,"./fixtures/julia/high_high.json":196,"./fixtures/julia/high_small.json":197,"./fixtures/julia/small_high.json":198,"./fixtures/julia/small_small.json":199,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":58,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/special/abs":83,"tape":358}],201:[function(require,module,exports){
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
	t.strictEqual( typeof logpmf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logpmf` functions', function test( t ) {
	t.equal( typeof logpmf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/binomial/logpmf/test/test.js")
},{"./../lib":194,"tape":358}],202:[function(require,module,exports){
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
	t.strictEqual( typeof logpmf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpmf( NaN, 20, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpmf( 0.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpmf( 0.0, 20, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a negative integer for `x` and a valid `n` and `p`, the function returns `-Infinity`', function test( t ) {
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

tape( 'if provided a non-integer for `x` and a valid `n` and `p`, the function returns `-Infinity`', function test( t ) {
	var y = logpmf( -1.5, 20, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( -0.5, 20, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( 1.5, 20, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( 2.5, 20, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided `n` which is not a nonnegative integer, the function returns `NaN`', function test( t ) {
	var y;

	y = logpmf( 2.0, 1.5, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpmf( 0.0, -1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpmf( 2.0, NINF, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpmf( 2.0, PINF, 0.5 );
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

tape( 'if `p` or `n` equals `0`, the function evaluates a degenerate distribution centered at `0.0`', function test( t ) {
	var y;

	// Case: n = 8, p = 0.0
	y = logpmf( 0.0, 8, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x equal to 0' );

	y = logpmf( 1.0, 8, 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( PINF, 8, 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( NINF, 8, 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( NaN, 8, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	// Case: n = 0, p = 0.5
	y = logpmf( 0.0, 0, 0.5 );
	t.equal( y, 0.0, 'returns 0 for x equal to 0' );

	y = logpmf( 1.0, 0, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( PINF, 0, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( NINF, 0, 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( NaN, 0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `p` equals `1.0`, the function evaluates a degenerate distribution centered at `n`', function test( t ) {
	var y;

	y = logpmf( 8.0, 8, 1.0 );
	t.equal( y, 0.0, 'returns 0 for x equal to 8' );

	y = logpmf( 1.0, 8, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( PINF, 8, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( NINF, 8, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpmf( NaN, 8, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logpmf for `x` given large `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = highHigh.expected;
	x = highHigh.x;
	n = highHigh.n;
	p = highHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		y = logpmf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 30.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpmf for `x` given large `n` and small `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var n;
	var p;
	var i;
	var x;
	var y;

	expected = highSmall.expected;
	x = highSmall.x;
	n = highSmall.n;
	p = highSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		y = logpmf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 20.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpmf for `x` given small `n` and large `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = smallHigh.expected;
	x = smallHigh.x;
	n = smallHigh.n;
	p = smallHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		y = logpmf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 20.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpmf for `x` given small `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = smallSmall.expected;
	x = smallSmall.x;
	n = smallSmall.n;
	p = smallSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		y = logpmf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 10.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/binomial/logpmf/test/test.logpmf.js")
},{"./../lib":194,"./fixtures/julia/high_high.json":196,"./fixtures/julia/high_small.json":197,"./fixtures/julia/small_high.json":198,"./fixtures/julia/small_small.json":199,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":58,"@stdlib/constants/float64/pinf":61,"@stdlib/math/base/assert/is-nan":73,"@stdlib/math/base/special/abs":83,"tape":358}],203:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability mass function (PMF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} logPMF
*
* @example
* var logpmf = factory( 5.0 );
*
* var y = logpmf( 0.0 );
* // returns -Infinity
*
* y = logpmf( 5.0 );
* // returns 0.0
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return logpmf;

	/**
	* Evaluates the natural logarithm of the probability mass function (PMF) for a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPMF
	*
	* @example
	* var y = logpmf( 10.0 );
	* // returns <number>
	*/
	function logpmf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x === mu ) ? 0.0 : NINF;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":58,"@stdlib/math/base/assert/is-nan":73,"@stdlib/utils/constant-function":221}],204:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Natural logarithm of the probability mass function (PDF) for a degenerate distribution.
*
* @module @stdlib/stats/base/dists/degenerate/logpmf
*
* @example
* var logpmf = require( '@stdlib/stats/base/dists/degenerate/logpmf' );
*
* var y = logpmf( 2.0, 0.0 );
* // returns -Infinity
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/logpmf' ).factory;
*
* var logpmf = factory( 10.0 );
*
* var y = logpmf( 10.0 );
* // returns 0.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":203,"./main.js":205,"@stdlib/utils/define-nonenumerable-read-only-property":223}],205:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability mass function (PMF) for a degenerate distribution centered at `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of the distribution
* @returns {number} logarithm of probability mass function
*
* @example
* var y = logpmf( 2.0, 3.0 );
* // returns -Infinity
*
* @example
* var y = logpmf( 3.0, 3.0 );
* // returns 0.0
*
* @example
* var y = logpmf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = logpmf( 0.0, NaN );
* // returns NaN
*/
function logpmf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x === mu ) ? 0.0 : NINF;
}


// EXPORTS //

module.exports = logpmf;

},{"@stdlib/constants/float64/ninf":58,"@stdlib/math/base/assert/is-nan":73}],206:[function(require,module,exports){
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

},{"./is_number.js":209}],207:[function(require,module,exports){
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

},{"./is_number.js":209,"./zero_pad.js":213}],208:[function(require,module,exports){
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

},{"./main.js":211}],209:[function(require,module,exports){
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

},{}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{"./format_double.js":206,"./format_integer.js":207,"./is_string.js":210,"./space_pad.js":212,"./zero_pad.js":213}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
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

},{"./main.js":215}],215:[function(require,module,exports){
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

},{}],216:[function(require,module,exports){
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

},{"./main.js":218}],217:[function(require,module,exports){
arguments[4][210][0].apply(exports,arguments)
},{"dup":210}],218:[function(require,module,exports){
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

},{"./is_string.js":217,"@stdlib/string/base/format-interpolate":208,"@stdlib/string/base/format-tokenize":214}],219:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":220}],220:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],221:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":222}],222:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],223:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":224}],224:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":228}],225:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],226:[function(require,module,exports){
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

},{}],227:[function(require,module,exports){
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

},{"./define_property.js":226}],228:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":225,"./has_define_property_support.js":227,"./polyfill.js":229}],229:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":216}],230:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":231,"./polyfill.js":232,"@stdlib/assert/has-tostringtag-support":24}],231:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":233}],232:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":233,"./tostringtag.js":234,"@stdlib/assert/has-own-property":20}],233:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],234:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":219}],235:[function(require,module,exports){
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

},{}],236:[function(require,module,exports){

},{}],237:[function(require,module,exports){
arguments[4][236][0].apply(exports,arguments)
},{"dup":236}],238:[function(require,module,exports){
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
},{"base64-js":235,"buffer":238,"ieee754":341}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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
},{"_process":348}],241:[function(require,module,exports){
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

},{"events":239,"inherits":342,"readable-stream/lib/_stream_duplex.js":243,"readable-stream/lib/_stream_passthrough.js":244,"readable-stream/lib/_stream_readable.js":245,"readable-stream/lib/_stream_transform.js":246,"readable-stream/lib/_stream_writable.js":247,"readable-stream/lib/internal/streams/end-of-stream.js":251,"readable-stream/lib/internal/streams/pipeline.js":253}],242:[function(require,module,exports){
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

},{}],243:[function(require,module,exports){
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
},{"./_stream_readable":245,"./_stream_writable":247,"_process":348,"inherits":342}],244:[function(require,module,exports){
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
},{"./_stream_transform":246,"inherits":342}],245:[function(require,module,exports){
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
},{"../errors":242,"./_stream_duplex":243,"./internal/streams/async_iterator":248,"./internal/streams/buffer_list":249,"./internal/streams/destroy":250,"./internal/streams/from":252,"./internal/streams/state":254,"./internal/streams/stream":255,"_process":348,"buffer":238,"events":239,"inherits":342,"string_decoder/":357,"util":236}],246:[function(require,module,exports){
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
},{"../errors":242,"./_stream_duplex":243,"inherits":342}],247:[function(require,module,exports){
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
},{"../errors":242,"./_stream_duplex":243,"./internal/streams/destroy":250,"./internal/streams/state":254,"./internal/streams/stream":255,"_process":348,"buffer":238,"inherits":342,"util-deprecate":366}],248:[function(require,module,exports){
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
},{"./end-of-stream":251,"_process":348}],249:[function(require,module,exports){
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
},{"buffer":238,"util":236}],250:[function(require,module,exports){
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
},{"_process":348}],251:[function(require,module,exports){
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
},{"../../../errors":242}],252:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],253:[function(require,module,exports){
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
},{"../../../errors":242,"./end-of-stream":251}],254:[function(require,module,exports){
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
},{"../../../errors":242}],255:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":239}],256:[function(require,module,exports){
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

},{"./":257,"get-intrinsic":332}],257:[function(require,module,exports){
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

},{"es-define-property":317,"es-errors/type":323,"function-bind":331,"get-intrinsic":332,"set-function-length":352}],258:[function(require,module,exports){
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

},{"./lib/is_arguments.js":259,"./lib/keys.js":260}],259:[function(require,module,exports){
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

},{}],260:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],261:[function(require,module,exports){
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

},{"es-define-property":317,"es-errors/syntax":322,"es-errors/type":323,"gopd":333}],262:[function(require,module,exports){
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

},{"define-data-property":261,"has-property-descriptors":334,"object-keys":346}],263:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],264:[function(require,module,exports){
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

},{"./ToNumber":295,"./ToPrimitive":297,"./Type":302}],265:[function(require,module,exports){
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

},{"../helpers/isFinite":310,"../helpers/isNaN":311,"../helpers/isPrefixOf":312,"./ToNumber":295,"./ToPrimitive":297,"es-errors/type":323,"get-intrinsic":332}],266:[function(require,module,exports){
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

},{"call-bind/callBound":256,"es-errors/type":323}],267:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":325}],268:[function(require,module,exports){
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

},{"./DayWithinYear":271,"./InLeapYear":275,"./MonthFromTime":285,"es-errors/eval":318}],269:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":316,"./floor":306}],270:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":306}],271:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":269,"./DayFromYear":270,"./YearFromTime":304}],272:[function(require,module,exports){
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

},{"./modulo":307}],273:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":314,"./IsAccessorDescriptor":276,"./IsDataDescriptor":278,"es-errors/type":323}],274:[function(require,module,exports){
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

},{"../helpers/timeConstants":316,"./floor":306,"./modulo":307}],275:[function(require,module,exports){
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

},{"./DaysInYear":272,"./YearFromTime":304,"es-errors/eval":318}],276:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":314,"es-errors/type":323,"hasown":340}],277:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":343}],278:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":314,"es-errors/type":323,"hasown":340}],279:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":276,"./IsDataDescriptor":278,"./IsPropertyDescriptor":280,"es-errors/type":323}],280:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":314}],281:[function(require,module,exports){
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

},{"../helpers/isFinite":310,"../helpers/timeConstants":316}],282:[function(require,module,exports){
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

},{"../helpers/isFinite":310,"./DateFromTime":268,"./Day":269,"./MonthFromTime":285,"./ToInteger":294,"./YearFromTime":304,"./floor":306,"./modulo":307,"get-intrinsic":332}],283:[function(require,module,exports){
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

},{"../helpers/isFinite":310,"../helpers/timeConstants":316,"./ToInteger":294}],284:[function(require,module,exports){
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

},{"../helpers/timeConstants":316,"./floor":306,"./modulo":307}],285:[function(require,module,exports){
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

},{"./DayWithinYear":271,"./InLeapYear":275}],286:[function(require,module,exports){
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

},{"../helpers/isNaN":311}],287:[function(require,module,exports){
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

},{"../helpers/timeConstants":316,"./floor":306,"./modulo":307}],288:[function(require,module,exports){
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

},{"./Type":302}],289:[function(require,module,exports){
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


},{"../helpers/isFinite":310,"./ToNumber":295,"./abs":305,"get-intrinsic":332}],290:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":316,"./DayFromYear":270}],291:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":316,"./modulo":307}],292:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],293:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":295}],294:[function(require,module,exports){
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

},{"../helpers/isFinite":310,"../helpers/isNaN":311,"../helpers/sign":315,"./ToNumber":295,"./abs":305,"./floor":306}],295:[function(require,module,exports){
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

},{"./ToPrimitive":297,"call-bind/callBound":256,"safe-regex-test":351}],296:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":326}],297:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":328}],298:[function(require,module,exports){
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

},{"./IsCallable":277,"./ToBoolean":292,"./Type":302,"es-errors/type":323,"hasown":340}],299:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":332}],300:[function(require,module,exports){
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

},{"../helpers/isFinite":310,"../helpers/isNaN":311,"../helpers/sign":315,"./ToNumber":295,"./abs":305,"./floor":306,"./modulo":307}],301:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":295}],302:[function(require,module,exports){
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

},{}],303:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":269,"./modulo":307}],304:[function(require,module,exports){
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

},{"call-bind/callBound":256,"get-intrinsic":332}],305:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":332}],306:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],307:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":313}],308:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":316,"./modulo":307}],309:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":264,"./5/AbstractRelationalComparison":265,"./5/Canonicalize":266,"./5/CheckObjectCoercible":267,"./5/DateFromTime":268,"./5/Day":269,"./5/DayFromYear":270,"./5/DayWithinYear":271,"./5/DaysInYear":272,"./5/FromPropertyDescriptor":273,"./5/HourFromTime":274,"./5/InLeapYear":275,"./5/IsAccessorDescriptor":276,"./5/IsCallable":277,"./5/IsDataDescriptor":278,"./5/IsGenericDescriptor":279,"./5/IsPropertyDescriptor":280,"./5/MakeDate":281,"./5/MakeDay":282,"./5/MakeTime":283,"./5/MinFromTime":284,"./5/MonthFromTime":285,"./5/SameValue":286,"./5/SecFromTime":287,"./5/StrictEqualityComparison":288,"./5/TimeClip":289,"./5/TimeFromYear":290,"./5/TimeWithinDay":291,"./5/ToBoolean":292,"./5/ToInt32":293,"./5/ToInteger":294,"./5/ToNumber":295,"./5/ToObject":296,"./5/ToPrimitive":297,"./5/ToPropertyDescriptor":298,"./5/ToString":299,"./5/ToUint16":300,"./5/ToUint32":301,"./5/Type":302,"./5/WeekDay":303,"./5/YearFromTime":304,"./5/abs":305,"./5/floor":306,"./5/modulo":307,"./5/msFromTime":308}],310:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":311}],311:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],312:[function(require,module,exports){
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

},{"call-bind/callBound":256}],313:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],314:[function(require,module,exports){
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

},{"es-errors/type":323,"hasown":340}],315:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],316:[function(require,module,exports){
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

},{}],317:[function(require,module,exports){
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

},{"get-intrinsic":332}],318:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],319:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],320:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],321:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],322:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],323:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],324:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],325:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":323}],326:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":327,"./RequireObjectCoercible":325}],327:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],328:[function(require,module,exports){
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

},{"./helpers/isPrimitive":329,"is-callable":343}],329:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],330:[function(require,module,exports){
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

},{}],331:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":330}],332:[function(require,module,exports){
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

},{"es-errors":319,"es-errors/eval":318,"es-errors/range":320,"es-errors/ref":321,"es-errors/syntax":322,"es-errors/type":323,"es-errors/uri":324,"function-bind":331,"has-proto":335,"has-symbols":336,"hasown":340}],333:[function(require,module,exports){
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

},{"get-intrinsic":332}],334:[function(require,module,exports){
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

},{"es-define-property":317}],335:[function(require,module,exports){
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

},{}],336:[function(require,module,exports){
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

},{"./shams":337}],337:[function(require,module,exports){
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

},{}],338:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":337}],339:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":331}],340:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":331}],341:[function(require,module,exports){
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

},{}],342:[function(require,module,exports){
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

},{}],343:[function(require,module,exports){
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

},{}],344:[function(require,module,exports){
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

},{"call-bind/callBound":256,"has-tostringtag/shams":338}],345:[function(require,module,exports){
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

},{"./isArguments":347}],346:[function(require,module,exports){
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

},{"./implementation":345,"./isArguments":347}],347:[function(require,module,exports){
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

},{}],348:[function(require,module,exports){
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

},{}],349:[function(require,module,exports){
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
},{"_process":348,"through":364,"timers":365}],350:[function(require,module,exports){
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

},{"buffer":238}],351:[function(require,module,exports){
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

},{"call-bind/callBound":256,"es-errors/type":323,"is-regex":344}],352:[function(require,module,exports){
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

},{"define-data-property":261,"es-errors/type":323,"get-intrinsic":332,"gopd":333,"has-property-descriptors":334}],353:[function(require,module,exports){
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

},{"es-abstract/es5":309,"function-bind":331}],354:[function(require,module,exports){
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

},{"./implementation":353,"./polyfill":355,"./shim":356,"define-properties":262,"function-bind":331}],355:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":353}],356:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":355,"define-properties":262}],357:[function(require,module,exports){
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
},{"safe-buffer":350}],358:[function(require,module,exports){
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
},{"./lib/default_stream":359,"./lib/results":361,"./lib/test":362,"_process":348,"defined":263,"through":364,"timers":365}],359:[function(require,module,exports){
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
},{"_process":348,"fs":237,"through":364}],360:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":348,"timers":365}],361:[function(require,module,exports){
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
},{"_process":348,"events":239,"function-bind":331,"has":339,"inherits":342,"object-inspect":363,"resumer":349,"through":364,"timers":365}],362:[function(require,module,exports){
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
},{"./next_tick":360,"deep-equal":258,"defined":263,"events":239,"has":339,"inherits":342,"path":240,"string.prototype.trim":354}],363:[function(require,module,exports){
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

},{}],364:[function(require,module,exports){
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
},{"_process":348,"stream":241}],365:[function(require,module,exports){
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
},{"process/browser.js":348,"timers":365}],366:[function(require,module,exports){
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
},{}]},{},[200,201,202]);
