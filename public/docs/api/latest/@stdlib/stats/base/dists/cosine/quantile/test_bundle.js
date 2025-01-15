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

},{"./uint16array.js":28,"@stdlib/assert/is-uint16array":40,"@stdlib/constants/uint16/max":59}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":31,"@stdlib/assert/is-uint32array":42,"@stdlib/constants/uint32/max":60}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":34,"@stdlib/assert/is-uint8array":44,"@stdlib/constants/uint8/max":61}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":155}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":155}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":155}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":155}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],50:[function(require,module,exports){
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

},{"@stdlib/number/ctor":92}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":55,"@stdlib/constants/float64/pinf":57}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":48,"@stdlib/constants/float64/high-word-sign-mask":50,"@stdlib/number/float64/base/from-words":96,"@stdlib/number/float64/base/get-high-word":100,"@stdlib/number/float64/base/to-words":109}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":48,"@stdlib/constants/float64/high-word-exponent-mask":49,"@stdlib/math/base/special/kernel-cos":74,"@stdlib/math/base/special/kernel-sin":78,"@stdlib/math/base/special/rempio2":82,"@stdlib/number/float64/base/get-high-word":100}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyval_c13.js":76,"./polyval_c46.js":77}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/max-base2-exponent":53,"@stdlib/constants/float64/max-base2-exponent-subnormal":52,"@stdlib/constants/float64/min-base2-exponent-subnormal":54,"@stdlib/constants/float64/ninf":55,"@stdlib/constants/float64/pinf":57,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/copysign":68,"@stdlib/number/float64/base/exponent":94,"@stdlib/number/float64/base/from-words":96,"@stdlib/number/float64/base/normalize":106,"@stdlib/number/float64/base/to-words":109}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":84}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/array/base/zeros":3,"@stdlib/math/base/special/floor":72,"@stdlib/math/base/special/ldexp":80}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./kernel_rempio2.js":83,"./rempio2_medium.js":85,"@stdlib/constants/float64/high-word-abs-mask":48,"@stdlib/constants/float64/high-word-exponent-mask":49,"@stdlib/constants/float64/high-word-significand-mask":51,"@stdlib/number/float64/base/from-words":96,"@stdlib/number/float64/base/get-high-word":100,"@stdlib/number/float64/base/get-low-word":102}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/math/base/special/round":86,"@stdlib/number/float64/base/get-high-word":100}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":89}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/high-word-abs-mask":48,"@stdlib/constants/float64/high-word-exponent-mask":49,"@stdlib/math/base/special/kernel-cos":74,"@stdlib/math/base/special/kernel-sin":78,"@stdlib/math/base/special/rempio2":82,"@stdlib/number/float64/base/get-high-word":100}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pi":56,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/abs":66,"@stdlib/math/base/special/copysign":68,"@stdlib/math/base/special/cos":70,"@stdlib/math/base/special/sin":88}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/high-word-exponent-mask":49,"@stdlib/number/float64/base/get-high-word":100}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":98}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":97,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":101}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":99,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":104}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":103,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":58,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/abs":66}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":105,"./main.js":107,"@stdlib/utils/define-nonenumerable-read-only-property":148}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":105}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":110,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":108,"./main.js":111,"@stdlib/utils/define-nonenumerable-read-only-property":148}],110:[function(require,module,exports){
arguments[4][97][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":97}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":108}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/cdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a raised cosine distribution with location parameter `mu` and scale parameter `s`.
*
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 3.0, 1.5 );
*
* var y = cdf( 1.9 );
* // returns ~0.015
*
* y = cdf( 4.0 );
* // returns ~0.971
*/
function factory( mu, s ) {
	if ( isnan( mu ) || isnan( s ) || s < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( s === 0.0 ) {
		return degenerate( mu );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a raised cosine distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < mu - s ) {
			return 0.0;
		}
		if ( x > mu + s ) {
			return 1.0;
		}
		z = ( x - mu ) / s;
		return ( 1.0 + z + ( sinpi( z ) / PI ) ) / 2.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/pi":56,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/sinpi":90,"@stdlib/stats/base/dists/degenerate/cdf":126,"@stdlib/utils/constant-function":146}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Raised cosine distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/cosine/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/cosine/cdf' );
*
* var y = cdf( 0.5, 0.0, 1.0 );
* // returns ~0.909
*
* var mycdf = cdf.factory( 3.0, 1.5 );
*
* y = mycdf( 4.0 );
* // returns ~0.971
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":112,"./main.js":114,"@stdlib/utils/define-nonenumerable-read-only-property":148}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a raised cosine distribution with location parameter `mu` and scale parameter `s` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 0.5, 0.0, 1.0 );
* // returns ~0.909
*
* @example
* var y = cdf( 1.2, 0.0, 1.0 );
* // returns 1.0
*
* @example
* var y = cdf( -0.9, 0.0, 1.0 );
* // returns ~0.0
*
* @example
* var y = cdf( 2.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = cdf( 2.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*/
function cdf( x, mu, s ) {
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( s ) ||
		s < 0.0
	) {
		return NaN;
	}
	if ( s === 0.0 ) {
		return ( x < mu ) ? 0.0 : 1.0;
	}
	if ( x < mu - s ) {
		return 0.0;
	}
	if ( x > mu + s ) {
		return 1.0;
	}
	z = ( x - mu ) / s;
	return ( 1.0 + z + ( sinpi( z ) / PI ) ) / 2.0;
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/constants/float64/pi":56,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/sinpi":90}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var cosineCDF = require( '@stdlib/stats/base/dists/cosine/cdf' );


// VARIABLES //

var MAX_ITERATIONS = 1e4;
var TOLERANCE = 1e-12;


// MAIN //

/**
* Bisection method to find quantile as there is no closed-form expression for the inverse of the CDF.
*
* @private
* @param {Probability} p - input value
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {number} evaluated quantile function
*/
function bisect( p, mu, s ) {
	var a;
	var b;
	var c;
	var m;
	var n;

	n = 1;
	a = mu - s;
	b = mu + s;
	while ( n < MAX_ITERATIONS ) {
		m = ( a + b ) / 2.0;
		if ( b - a < TOLERANCE ) {
			return m;
		}
		c = cosineCDF( m, mu, s );
		if ( p > c ) {
			a = m;
		} else {
			b = m;
		}
		n += 1;
	}
	return m;
}


// EXPORTS //

module.exports = bisect;

},{"@stdlib/stats/base/dists/cosine/cdf":113}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/quantile' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var bisect = require( './bisect.js' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a raised cosine distribution.
*
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 10.0, 2.0 );
* var y = quantile( 0.5 );
* // returns ~10.0
*
* y = quantile( 0.8 );
* // returns ~10.655
*/
function factory( mu, s ) {
	if ( isnan( mu ) || isnan( s ) || s < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( s === 0.0 ) {
		return degenerate( mu );
	}
	return quantile;

	/**
	* Evaluates the quantile function for a raised cosine distribution.
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
		return bisect( p, mu, s );
	}
}


// EXPORTS //

module.exports = factory;

},{"./bisect.js":115,"@stdlib/math/base/assert/is-nan":64,"@stdlib/stats/base/dists/degenerate/quantile":129,"@stdlib/utils/constant-function":146}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Raised cosine distribution quantile function.
*
* @module @stdlib/stats/base/dists/cosine/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/cosine/quantile' );
*
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~0.327
*
* var myQuantile = quantile.factory( 10.0, 2.0 );
* y = myQuantile( 0.5 );
* // returns ~10.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":116,"./main.js":118,"@stdlib/utils/define-nonenumerable-read-only-property":148}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var bisect = require( './bisect.js' );


// MAIN //

/**
* Evaluates the quantile function for a raised cosine distribution with location parameter `mu` and scale parameter `s` at a probability `p`.
*
* @param {Probability} p - input value
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 0.0, 1.0 );
* // returns ~0.327
*
* @example
* var y = quantile( 0.5, 4.0, 2.0 );
* // returns ~4.0
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
* // Negative scale parameter:
* var y = quantile( 0.5, 0.0, -1.0 );
* // returns NaN
*/
function quantile( p, mu, s ) {
	if (
		isnan( mu ) ||
		isnan( s ) ||
		isnan( p ) ||
		s < 0.0 ||
		p < 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	if ( s === 0.0 ) {
		return mu;
	}
	return bisect( p, mu, s );
}


// EXPORTS //

module.exports = quantile;

},{"./bisect.js":115,"@stdlib/math/base/assert/is-nan":64}],119:[function(require,module,exports){
module.exports={"expected":[1.19560428869601,3.889968817921289,3.7026901576021496,-5.282017166548684,-4.40693491356,6.235535691361335,0.6641283878569875,1.122063560767834,2.897332155292318,6.376119437702217,-4.630738782869125,1.0363123028247083,0.21423240072976296,6.698562539505588,3.5658933178136625,-1.9760073400584894,-4.210708895560852,-0.7211442157504311,-2.428363827601324,4.182289656968439,0.7837453197647442,-0.9675053782958107,-0.21918695459543952,-1.9243313864106368,3.3489472368970987,-0.2958811988944088,-9.096298573409436,3.5321148207811586,0.3879871781725867,2.6561218212928037,-2.4535769777272263,3.099467092157785,6.125656024692023,-5.124374825459112,0.45106292091751304,-5.669771453895804,0.6102075464410421,-0.024540908312991418,-0.8595372383911838,0.37799675286015266,3.2966491263863444,-3.1591544293180327,1.5227237949416526,0.9367516327806942,0.6315970553837247,1.2862086652365692,0.8399566507514502,2.0382809338424224,9.16060276662844,3.2712408919534095,-1.8873582365844657,10.587705245890739,0.5329389351573794,0.21291561169300793,0.4972168323042443,-1.8079358613470375,7.382981063962584,3.4965204436284028,4.1204373011473265,1.0717861210398607,2.5928561780122408,-0.8150977460719131,-0.9025730060069987,0.627088578159082,-5.607241159794649,7.50900755454484,1.5677002821537505,6.83910816102606,-1.342866497387175,10.220443730357724,-6.0010322335894095,8.652993223826627,2.0985790990322046,-5.140531302074965,-0.9380783853261631,-0.6047602203163046,-1.602556443744577,3.8793728502193927,1.4753742224753963,-1.2590154863350924,0.17451122061141694,0.8887973622101403,4.652487737254667,-2.8258388329027064,-8.940005805160572,1.212339036369333,-2.7367696322432895,9.672232662946275,1.8254302771713213,8.1771422201247,-3.973854965869259,-10.175732390554177,-1.4528960444607453,-2.1547039620436585,0.959692398827955,11.530735231198776,0.22132045579793577,4.260517235244045,7.628667445636711,0.7617927118621712,0.656336493210543,-0.24934114289255307,0.5488323367234549,2.2784381621136323,1.7367213529343812,-0.9819558299273892,1.166260835177081,5.368282484062279,1.159555076458279,11.664396295660072,0.4336679537869942,-1.5650174992639445,1.0679709983477568,12.420069977611,-8.15576176215292,9.97243000646225,6.029663800514516,1.4025201233922155,-0.07513021346500873,-4.195217527425209,-5.227522577100878,0.8841565642675322,-3.6550827049272137,0.9894995542195115,-4.15831766924164,-4.9780251997988065,-1.226905923293192,4.237925159333224,3.150305567691155,0.27727800767571986,0.7725072858288107,-1.5916382376591907,-7.81240906251829,0.24450788630018183,5.608875413892674,-3.752047584381134,0.41749087320787415,-1.1966000312970704,1.458232983473247,2.1808812579859014,0.966968543424843,0.8595248213736804,12.208327875749491,-6.976517967218069,0.6363444151554434,4.618747543793223,-1.270521082915375,-0.20126296823054268,-0.6341932143397723,-0.7213356658572416,6.706991469466951,-0.08768912940983457,-5.7663554768740095,-5.719116351800683,2.131918578875295,4.953097587585722,-1.7415068913152,5.20560599841815,-2.3734345109719177,6.001346365459869,-8.66471767864521,-0.07095134776811413,3.7068752991150635,-2.6149509666406257,4.421384063544847,-0.014070877117840698,-1.8739673209364849,1.3273560651506457,-0.07724073859720791,-1.113519425414573,0.6318896154116251,1.7694454672957276,8.393088123388674,2.6007517766821864,-7.017629009475595,2.8110345703576782,4.298034551800661,1.4586757812555091,1.8992692292264963,-0.37192539717041123,5.444057013336364,4.586115055451659,10.817158935786097,6.038820564274323,1.3231449212635997,1.239301145549855,0.5997177455254028,-5.801816531874351,-0.9474131952285294,-3.4613311346021205,-2.4434850665622587,-8.752011792820209,3.1836159005979483,1.8366985230450181,0.7349932806359787,8.065626700426794,6.673973911661436,-1.0151641048733913,-6.7958360713720545,7.176690844219235,3.614063793103324,3.0846858241371704,-5.2622799255643145,-7.317779276519106,6.834148714001088,3.9050450626487008,-8.24040032329427,-0.07787656349311961,-2.304946710360937,-0.14023553889352186,0.8346051665495666,2.579570668723303,-1.0164273809533304,2.5277759835983424,5.359410376908675,1.111661352803499,2.375373246745347,0.47523317154186645,0.05740310747914863,3.8613950341022347,-3.49273366587759,1.7072095509597118,-2.8035464163558066,4.542449458949026,-0.11487455576697925,0.4966191355212427,5.9992746503040095,4.303929216943599,6.08997682204868,10.066042461062967,-3.3670147709052936,-0.46708644259738535,2.5245931475985977,-0.4977890456883711,-2.7169314441017063,-5.460790379670098,-1.9997647499637963,-3.2359769756346477,0.2232938425896811,2.2963306226007374,2.3308002705869004,0.09197421074153528,1.9032378180114575,-11.693892019664181,-0.6110315430001102,-2.1439653479781433,0.7694684944023255,2.583059624626734,1.3583546425791715,-0.22201219829232569,0.7043782824030165,5.600513320647272,11.597893234399294,-0.5971322678672514,0.28428714251226284,6.82040079845882,6.941881491091211,1.4087873914049218,9.668076125761194,-0.19173727105934468,-5.479185525869987,-2.5573296610262553,0.2230507504412456,-0.2808087732697505,5.258301552390234,-3.4880504581003065,-0.12077776929910664,4.622544560471281,1.0576141439259639,-13.205070546666466,5.979052842569693,-0.07132873120674915,4.064513913551009,-3.3407165895114233,2.9080836020844023,2.9781407490680687,-2.975402923123378,0.37303980972288986,1.1817311754920121,0.004422256767071551,0.3273524562731432,0.7641508902140488,-0.4903646279355537,-0.23920419459270104,0.22490468175486092,3.6052309485809886,0.8032203048087095,0.3474933013883921,1.4934036742817198,0.32227474318320404,3.8420208282818393,3.2504334304434086,1.8525081336799787,0.8814607051289377,7.0302607799166905,1.6315549627387533,1.6242272893861942,-2.476472453178554,-4.162851776097912,5.699973168288363,1.703853630927056,2.3126529051016824,-2.8301387249795997,1.235209606168722,0.7744158452203468,-11.085398646525576,11.92224968732354,1.5403385891217214,10.472025307818994,0.9401163409174033,-5.341547570021082,-0.9889375476792386,7.146032041932429,2.1429765393821034,-0.2947353856349668,3.3607355068954874,2.084304590734586,-0.9226385150918253,7.927093786629035,-0.05570879431104141,-13.936276505346118,-3.2829258152992575,5.808469663015776,-0.1195904412374631,8.936800357714553,-8.628456495937947,-1.4231572071601386,2.626249542723653,0.018685618125410315,0.3453325278721908,0.716814337846692,0.4425280656393086,3.7388042478722214,-2.142461527407085,-0.3723010792666638,5.387500005272745,-10.498112017979597,-7.456234200914656,-3.009034706499314,2.342244621954279,-2.3447098636376316,1.5841776076732472,2.379539792043504,1.6396360009045425,-1.2612634209319429,6.588593505853559,6.855770132364972,6.918296758665717,1.0187125480489188,0.2226694179877315,-1.304267234287288,1.895246376498254,-2.1233335526329675,-1.5820907488385587,-1.99952020510086,-0.20662697295414653,1.4911216655564838,-0.08575227438808722,1.267931351292479,5.43285910089894,7.0741785698182476,1.4755503720190188,-0.6793226927067505,-5.704301186499042,1.4986640401527556,-0.3119883092707634,6.699120068684793,-2.5009386648072294,0.615737867902369,3.4946376146018343,6.246003504647273,-2.0621542728520597,4.059955052445155,-3.8321952421364047,-1.851079163580089,0.60771504537191,11.860970722956665,1.0449942968189314,1.6456710396180996,-4.848912331081047,-1.0674455622688113,0.3207567595574551,0.1695667362621269,-7.647921105951706,0.7957770537976148,0.3586752242547333,11.021163184177881,0.6087275989129894,-0.18474502507106075,1.1322712786903188,-7.040295685162472,2.1941103989396495,-6.913501042424142,-6.0955912940237695,-1.748763718626173,-0.35590762486820476,0.9730622599320833,-2.1737824230959313,-3.8933807845335364,-0.726975112167602,-7.114109250658692,5.527798643742948,0.6051587707898348,1.6624035762395137,-0.5976974723676161,1.4842483420586265,-1.6084544480211729,-0.7908263771640096,-1.9432883366388747,-5.632734753519013,-4.255098319236808,1.2810714247467232,-4.91113619740765,-0.5008047328550185,2.088690615389436,0.4290279992238776,0.876317240084713,0.4717547121944815,2.0133656275072886,-4.70491586795379,-3.0629467187925847,0.31344854513199844,1.9185822949180877,-1.2788205173830502,-6.849000761246807,1.1373618032729715,-4.124658571712846,0.8605863142421368,9.650450950555353,-3.7609046107333377,-0.5035832474331656,-2.768791152101408,-0.6383581486778704,0.6955314865953593,-6.9847784480218404,5.051604988184367,1.7442383401489452,-1.2771454230122057,5.510396959595882,-4.997334546499971,1.8038030484910657,-4.414686504268533,3.5984686915022825,0.6518459465523048,-4.191671679162297,5.480589898854039,5.513528837121553,-1.9440690562250744,-3.797784377073418,0.5885920361648098,-4.688296460829164,0.6516026304920888,0.641928815946179,-1.1854940898992483,0.8918050661468941,-3.8676904792993843,-0.18825690605449746,-1.5743042444629614,3.799956079687588,2.466258928037262,-2.982499542728527,-9.435624043782937,0.8172192902069795,4.64238198444973,2.934814784741449,6.6259650426321635,0.6015755379287239,-0.4151880270153796,0.8225209564692408,1.2198187665486802,11.424885749998591,-0.9800414894033331,2.308659463193025,9.209095673794543,9.216603117626718,-2.514946600511122,-3.427593545931477,-3.3748544931521955,0.15164568281061008,-7.502370444104036,-0.7238846115551565,3.6465730767142768,-2.389514120959186,2.804859705784277,1.766574455022054,-8.346863341957459,4.235264602567046,2.166954168665673,-3.381590682445627,0.6494637419897917,2.6928960878430197,0.680101407140185,-0.3597326508933209,-1.171990611897042,2.3746535933323747,-3.3479371893417103,-1.3577470167228718,1.5860403871357096,4.155581427891287,0.6725364818057887,-1.0081159417953602,1.468081926992281,2.992916664956181,-0.4299852220696324,4.166521725711299,-1.9208435325989788,-0.8950355076880427,7.141509192837744,1.974658835438236,10.099979138791374,1.738885616512878,4.897655274137517,-0.8667632057689992,0.44174789790345775,2.1714675073729355,0.7390923578308235,1.6882490709040376,0.07656234935742039,-7.165763409725267,3.3703898535411048,-2.868714264283235,-7.222946876176591,7.4466402273352745,-1.72754259949828,0.276041492794634,0.49474653897168486,11.078017802573942,1.7829531302964305,3.8084660917508515,-1.4386391134393537,3.359726183622266,5.8950572966297985,-1.8118643515190869,0.5512216551508011,0.9129938537895461,8.424307487787317,2.1584099247623016,3.6357912802331933,-0.45022377370753264,-3.6896523471835416,1.7701324196534118,0.40042679155524674,6.984133455704863,4.396142661917202,1.519974383288445,2.0717458862267346,-0.5870193972647189,1.2049110676712487,-1.3277907502163564,2.383197016750408,-0.07905846356666185,-0.9186342556760282,2.692407207382194,1.5538123469585372,-1.096300901493389,-2.0531595744020903,-8.024921571972133,-1.324297379984598,2.673461901567796,0.46983129252357464,4.057137986470824,-5.87425316477779,1.0789875002821554,-0.6955696747903299,0.59687540821578,11.964880739486258,0.735000121908751,-2.5829590428340756,-1.3598277923030375,-3.0139279422048126,2.34972474592688,-1.9033378258658638,5.130976555135878,0.440374809925675,-8.320811009532168,2.546340559942159,-4.7964932305972425,-7.797313295945276,-5.637110142873393,0.5845863484765552,2.536277670776463,8.994548763966502,-9.691613267150363,2.738625148883833,-3.1608709930028414,-2.1061764071737326,-0.11405092285851959,-3.6088404622067527,0.5684348243197845,-0.17825037705065977,1.2794444501107165,0.8302395965860925,1.6491442588255851,-1.8938222764292654,-1.817940727181821,3.0209803366309447,1.1416884770311369,7.745408443493922,5.923346754067733,-0.254960056070359,3.7796719133141163,-3.057501384346412,0.49038998021212427,3.667048570594593,0.5127037490816462,5.976759378475112,-3.8113548859167086,3.0448169082710894,-0.25228044493360413,4.2975161674544236,-6.587215228131104,1.183703558098831,-1.6310113812083342,0.9724029397407941,-0.15498083201651408,-1.589830937668088,4.70056395897152,4.204435708914219,10.769572892215278,2.6955430701268015,0.8610949574251291,-2.745306394214831,-5.3825472458725905,-11.9639843277958,7.014183925728143,-0.1640058574891632,-12.363787089533385,1.4438647056714764,1.9448520555258657,5.083439725409212,1.3429564193480263,1.776804810092877,1.9494352305739757,-9.618511997085347,3.9490923128340283,3.3132922945064776,5.8638132870116095,2.3508129581045987,1.2040285714346006,0.6532809915930058,-2.2463958740056826,-0.17390420528456496,0.0536375492842848,-0.09161961206988736,2.801422832505356,-5.665237742743063,-0.3524561627880902,1.4360317688020348,-0.015841040348049465,8.876599304412927,-8.695786793551527,-1.4104074372854942,4.706769134252282,5.1654741306654355,-3.3707800592189825,0.02402942111647336,1.1649535040845524,1.6905222099619035,-3.237247308832348,-3.879778408395315,1.7923930214719763,-0.8377165407391285,6.361568977842043,0.0611503385024916,-0.17406361491380906,-2.5913729232035894,0.25244080326119356,2.047951262492126,-0.9755161165771967,4.721663579057178,-4.2798210879665515,2.812610656591061,-3.558453778761293,-5.005576903258311,-11.955690113893315,0.019881525608092948,1.0086100326234924,4.499816055781526,2.3261158811928273,6.100616822980233,4.530144014524223,5.599462145519425,2.143352150077821,2.378711515142319,1.5894162798819955,1.4269808962837014,9.588658383373295,4.486093894670139,1.718819156178523,1.146027333302564,4.649078483453956,-1.2655836416018553,7.0667684427465565,0.0994461461819607,-0.34196108853398055,0.8008616188624229,-1.516623884482224,6.811239317320706,0.4873182235214526,-0.5934548166667868,1.6962094419179983,-4.231139937870594,4.489885712465729,-1.099247648124408,6.712206554139386,4.949337696639008,-3.0427747133614087,-7.551071317756659,1.8546163161279292,-3.587198396200977,-7.080089184621352,1.0491151188105647,0.9541745994722972,2.5535031521047777,1.8115513640761876,0.02407363070954118,0.337026568259409,-16.7034143947811,0.9124792788343231,0.844331580577126,-1.371885642099328,-9.251818943063816,9.172741206267297,-9.21988610558966,-3.0141966675356935,-0.4957262051219372,-6.583235854842709,-4.095221837450301,1.7840925035540294,3.8265705706019046,-9.10350676776622,2.6411524054238193,0.4196779596204611,8.225768652304502,1.9422831205417546,1.650218686182697,1.6653152663419584,-7.116502749650472,1.3553255481271713,0.9412903795667026,0.04721316473185132,1.338265661197131,3.253968773801366,10.404949331289526,8.406984182475863,2.0868292864480082,-1.1750379415391712,0.09421494177542256,0.5662112336279138,-7.029110443214305,1.575125996394253,-15.076170043571821,-6.538329252389998,-2.881910430522036,-0.5235205672722982,3.507887056083587,1.105609027190333,1.1394325290680913,1.3817901849875451,0.03906096430612026,-2.7609444568195016,-6.835759397419551,-2.5446345471260905,-1.6015355775405125,6.976749947857665,0.08471620868944804,0.9616657933990302,-0.9222766528389477,-6.09586370980241,0.3315049437265222,0.9850410837125079,5.940260905811863,0.21611971725533036,0.5049198980268329,-2.7597577257886847,0.8263853017943438,-0.27692342534568937,6.444315168110483,-0.03411476387863323,-5.030876914518586,-6.130172861085482,-4.445844594552694,-2.5521502991538396,2.61326954217011,6.266141767603619,1.2917319077829346,-0.08324313755449017,-3.095744677800551,-0.1352947175886018,-2.2113192237227244,-0.004606295775380987,-1.798022586931959,1.3095255342158012,5.453904031160839,0.5125933312149236,-6.97386176321254,-1.7533687571795729,-0.769616522681984,3.1785785684575645,3.011413554867822,0.38968369515441714,-5.437606782512193,0.2633164259144454,-9.761769847125809,0.5696208671320353,2.234245142302534,4.999628705137955,-8.86313398308556,0.4063374432269455,-0.5634204814733375,4.416563120601576,1.0486450574199189,2.9163666049843533,0.05931667990855767,2.8398803330093356,-2.534927032690746,-6.920640949601561,-8.904631376963959,0.36452052092001586,-1.0279688725147347,0.9372271712399616,-3.3740899316732778,5.799379561980999,3.267873493215501,-2.4437742518052996,0.5014437240909169,10.730449969959434,-9.946636240496687,6.396605812119871,-6.792518269139968,1.3445272191470532,0.9334472452293309,0.5256942976884094,-1.1280852658583198,-0.23175234573906256,-0.0950605722556665,-1.6405564800237142,1.5097726053849683,1.6442411694289807,-3.0964231149072114,8.15018945708846,0.608188255913628,-7.240499081449428,0.5099612605906645,-2.3549705010601323,5.572768393724357,-3.48645704523131,6.309283037299318,3.6680832624699695,1.0748651935702909,1.481408923059278,0.9180157924548162,9.352435783353783,-4.0898476943813,3.304683208591578,2.1814644134710024,-0.06118099179730821,2.367177471831013,1.4123960745427981,-0.15684634070516906,0.5612982962114903,6.3988517285871485,1.6914304564188747,-1.7474305960907786,3.6774162910729267,-0.5922180964850294,1.0823206225211057,2.5948510588225497,1.7623432823287217,1.846765222529003,-5.86479853755498,8.050539845555965,0.876146138415496,0.5559014372575708,-3.5009075829535825,-0.23147321354006856,-4.582948051084923,0.43066812985531,-1.7804380483808182,2.6002375701579994,2.6279156972107796,-0.3312984880080322,-4.479144009954098,-2.515554576391592,1.361391156144498,6.8087841723263285,-9.305477233223316,1.8586966159388965,-7.724739857571034,-4.176595775499617,4.8233802195607485,8.702712134416405,-2.37554944850317,0.2955376304852669,0.0013803730136512692,5.7313828606207,7.407478353218311,1.8469297455132934,0.045740523751384154,13.0028156234084,0.0466204576171656,-1.8353568910831504,-9.473736443601098,7.521492183235715,-7.125822550432796,2.5342796902394475,-6.4715282917471715,-5.3332575392690735,2.5815606455859457,-3.6328548945706114,-3.643558767348213,0.7133579451060164,-3.252917658999762,3.243969734016498,-2.741342647788813,-0.2643122811177995,0.689421125900573,4.48355659110822,1.8689822452234028,1.3466294621582569,-5.329082316511169,2.714674817728389,0.2781728603033888,3.667078431253721,0.7059255245903053,2.008021960143534,-3.517268329617499,2.3285771705255436,4.154576770961737,1.9792796005548858,0.2389055067018743,5.523870185814122,4.431993536217906,5.107788907069453,-2.1203385586295775,-4.286805852229413,-3.2910621600133414,1.3181395565777314,1.3193640100417987,2.4627009089338046,3.2047783449465084,6.152072093106327,-0.10812877248635873,0.6252592199970828,-0.9842998272193763,12.980049360856281,5.253839461001659,1.0139436893788907,-8.367024661419673,-1.4937104712030913,1.5860394413764929,0.4803344733227112,2.594705698733473,1.8078801918780925,5.965562709806173,4.3005238631039715,0.567327577634714,-3.19889649325072,0.656110378675276,-0.7235130820667806,1.457150656436713,7.913903801034579,-1.4777870030259004,3.0313631243844066,-1.004952863885018,0.22673659972465746,0.90549198271081,1.9506476037383647,0.7484384867778509,-0.05921921677169937,-6.395473971056997,-1.1899549443247572,-0.011132874030768718,-6.489102999657783,1.2798605106375192,-0.19969063821459587,-3.400994533930685,0.3958054608330088,-2.84339799996535,-6.9983598468938615,-4.051598356756044,-5.233097654636357,-1.048219491951934,5.828969569914015,4.123312126710623,-1.9584982079087645,-0.3408770770359547,-3.469899514570054,-3.1814365771605306,0.006937819592130822,1.343252412840949,-0.020433125395033655,0.027581329996838766,-3.730302035188469,2.06777584040194,-2.5524337118613802,-1.2679498483995797,0.7736026925341812,-0.228023895593709,4.213388695242804],"s":[0.6105384034903283,15.828511315158806,17.304278540581347,10.917852805213219,17.94712329184827,19.326925104605493,10.59557435585221,0.44843652333575346,2.4855845114418074,16.545309075717526,10.452648461905682,5.214179243074906,0.35496920421566713,15.884262122539049,5.079288943071418,15.171034355782385,18.053956219797158,7.632172064973113,9.048912743661198,8.769687944927274,1.3715134720995392,19.906513625806504,8.58963817370745,11.707112221919784,14.579906445096924,3.1487244015181304,10.677101722867555,12.64790191368547,1.3068908591900552,6.427506103833047,14.996811886392681,12.131009699430741,8.200241685525835,16.948939300632986,0.21518431674889094,14.413272567680387,3.500425195897252,14.476324424827709,7.541085293868095,5.998505903554356,9.353741655722052,12.444583019164423,1.457369970970408,14.732286331126163,2.3851955876248887,1.4552047092748532,2.4105647572463873,12.597153062522825,18.723923625773217,16.89411743667405,18.338195598296586,19.080720510778132,6.743138085835265,0.532874773594445,4.530992167021197,10.83407830969576,17.613924607933033,10.09222314750669,18.914628540692174,6.5867674491622275,7.729387221831332,10.230870616270472,18.497847996784564,12.485533660351486,14.043792862329902,14.600173223366188,4.977530054497552,14.75403045060212,19.650595433871413,19.14573059827593,11.357145911352703,19.00367098023721,14.725398356923494,16.68461130654783,4.790407911363985,11.652720585355972,2.96923020502998,5.955298193969094,6.3962062748478,11.583216473831639,13.699427503541033,2.407577099511382,13.425418318296472,9.701800240811597,19.668289581397566,1.5809096576125548,17.057573568125587,15.278597252113087,13.532539577316687,13.981316276737715,16.701717991640713,12.128973998179466,16.06652484521494,4.535146765722753,1.3725987616222124,18.929329335611207,12.549827477367398,7.949235499476841,9.204822438487316,6.043198780516779,0.8307480420818569,11.55765496507196,6.812240342959757,13.377166843865007,16.225856773455128,11.07717358674671,9.085136334054877,6.713932858736529,15.62249857670174,18.60191080317884,14.739327647391578,17.09742815798178,14.420779744196226,19.577177945423866,13.96869107923051,16.119360332736854,14.259055849301173,1.4703906340422757,3.877626535815697,17.041351490899252,13.98210148063329,4.855418371032996,10.263019736773394,16.374333512856957,12.381995290657578,19.433470017863968,2.6484014857639826,10.28594499219055,14.415528874810338,2.7274085350054067,5.070291956904414,4.6437882468865865,19.775573362746016,0.9850631716643088,11.051456411255355,14.36923375755191,4.105307583842546,17.717562095373943,18.373179767363133,13.576576341257711,1.059229275402287,0.26048132322496365,19.85101945358657,10.0802644272799,10.915135134100705,7.594152508621712,13.659813065117428,6.0020557723824774,14.401195441798293,5.409714788504392,17.57566576501756,1.471373215281515,14.188406989800475,19.20659493598773,3.8142597604668937,12.44740799126561,18.50913435734357,10.312428865791237,6.361364787192674,14.594150827876247,13.6738975108777,17.27154670589445,19.494024591322535,9.285283157555831,9.70584952733985,8.86366206695898,11.057602613730015,13.121321222587765,6.741911420126123,8.858872958767163,18.529367612059456,4.386375511956038,13.189944266083895,12.482210573899813,12.364986309405953,17.981125321355567,15.908966850027571,4.41138566408553,8.926356764500568,6.032207207151696,11.918503966212434,15.007867061921036,12.116573597949962,14.063790435192903,1.3795526503047029,4.701117585377652,5.273784045966239,14.82143723748662,13.820789956559608,19.34585171229812,19.123940560587357,11.480346812178329,12.79676047076018,19.49706013560702,1.8380045392320365,14.409426955635922,9.876026697816283,12.721604011385889,16.511372429540923,11.65292242987087,19.85329029873659,3.200661737717665,10.222041447720297,19.9808527357947,19.470212752503222,5.84288674348683,11.872422900791125,12.966066919633704,13.762309875519732,4.541443444804618,3.2233519393233756,11.899934518651811,6.4030719744778075,3.866758825506076,9.634723745142395,2.4873978479969905,8.10248084179313,2.6254806448758705,8.231480366624698,12.680168969069241,16.934750511476977,6.502505370993594,16.65553699025416,10.943573690667634,7.485931311918943,2.7402266889570015,9.449858218083254,8.332208262288985,12.453908706468845,16.354451976580584,7.094419162503294,7.483302594976626,10.097711504723508,8.17308692951681,13.71687629759538,15.22994194471,9.566724667595885,8.059943089905847,6.27283937019349,9.746236048859448,17.685495015504642,7.355905187953264,6.977657543349971,18.903307715994234,12.294405699809143,8.727094684880917,2.0279330875941115,4.705094414320983,5.591547096052878,1.0277792006390563,5.3939765915679105,18.842258533670876,19.054290827958855,8.69758598654538,2.8445958931159154,18.852880855206973,8.574251948845163,9.57014503924032,17.636291639361446,6.529188453658872,14.898975669669493,16.902896125695143,4.169238864273739,8.097926922450437,16.825450544866744,12.923729103702136,18.451270535070844,11.193735219466134,5.058316831853076,16.926707707984605,13.90884628539542,18.62311782670378,13.148755818771285,14.857150468939647,17.958383290463043,8.807938662859257,10.453867424007575,1.6996589172354737,10.326601112957743,5.426286525953619,0.636845067958558,10.545984220988402,16.310105608090648,15.593949392938192,0.45613894263040855,16.49881328939553,3.3955214908540787,10.519586427378083,5.14468786624283,1.5787226167527413,9.851251349159057,5.803611063670617,16.071087259561153,10.588722372995925,16.78641699718808,13.48967466295516,3.68198984546666,7.007480471367624,7.135727551738968,9.391482248905433,9.220785038575855,4.952774786295233,7.967177845447222,1.8599298733346092,1.6752566357082532,12.901207495227158,16.367414572089128,3.1727358022352004,14.207058570563902,0.7585462443907076,6.796656382678736,6.889952101206753,10.472603074857979,15.585804122475437,2.648380663352574,5.982542741662598,4.108860365833955,13.968456596056221,14.384644531585788,4.675361619502811,17.0006837035966,5.038169771918479,14.92069381583434,0.841668492135601,11.83171022187528,10.60951742081647,9.590345532773465,11.349801143767731,4.859650398317155,2.401194078739639,0.6333823780797809,0.10126162588250942,7.816733628563504,7.243611391839742,6.032882563007695,11.337889097316932,16.409500768833105,16.26520116765265,8.325143086268195,15.86628750750581,10.082791851757236,12.974537000264199,13.65962611042606,6.012328548143939,12.92971577739143,18.501507879593333,11.42237434993175,12.626502647615162,8.849777422959782,1.9596058113990766,6.31134818866919,2.1455798123107517,7.596242807110132,11.046401623941605,13.211581542377036,3.340611225192567,16.548762861601833,1.5274842222946772,1.9730235608720559,11.161952112788658,17.545883102239763,19.555037276168747,2.242994359973336,13.789253772752005,17.80707862729428,3.2282507622758327,14.658937576558163,15.690390578836645,0.06126689714325728,4.887127309539263,15.310173091346648,10.564648745060463,7.891718677771156,8.024437220393335,10.079491246654628,7.210853669646111,19.32403008747339,15.679793051768725,17.498377622440024,11.079079735887415,14.714746345843054,15.03825887721424,0.6787743337614849,12.102458763129192,18.057688327200143,0.8640676258130942,17.888510493609665,5.963748855353872,0.8234412416919445,4.3963779701613115,16.47055906353846,10.567770103051629,13.910824135444546,10.290981207439902,5.944702336506764,2.17648150893913,2.0753088734346736,13.510396054241864,14.930539349512495,7.594029545280936,15.28108062190514,13.08849371332466,0.10238485193199143,2.2218718545891614,12.767465872528621,4.349014760514893,11.6333472323916,5.968243688995525,7.659181447337389,16.83964777802226,19.143769540716676,6.2635036455711335,15.391073285273894,10.584478611966954,5.57366881904207,0.025116333679684466,1.364506740386977,1.7412304884992347,2.181592115331079,10.044025848443017,4.950140554624598,1.6311268121685885,12.540213854983286,4.820878490433014,8.481630130072553,2.3593383698194037,12.187596591565173,0.0018580552774194459,18.07624943696579,10.197616597769379,13.454697844661405,10.883059890021553,3.9213067893335074,17.83664605626253,11.948052706100803,16.730692776088812,6.451409891898816,10.869753029364295,18.09091687759322,15.798043369830278,1.61060682791478,11.414864030951154,8.352828116222874,0.09007485226339984,9.588375005892988,9.285066710390097,16.75859558544782,8.75364314908683,14.304859312849496,5.6828800563669235,9.98871423224854,6.308439247857391,0.8904160789737414,3.9401507847808404,15.88248495276735,13.13983058324773,2.7566987799796205,11.885555932488149,10.744186084072943,3.186256681217463,10.057623498922785,15.88830872129634,1.1648034700905363,8.573531180270692,14.717303906381836,13.628119529903465,4.5254661160084675,2.7950099999421862,0.10460506111933388,8.501527787311357,12.836824474987726,15.820709701825816,12.6953097868399,13.603561339476684,18.80947597728928,17.50633015991015,9.90102149882333,13.540456149470321,3.7366093166226166,17.995553018624054,5.4001095963003465,14.604908575580486,3.1970069781039667,5.295079410480308,2.5209841599714355,18.32450078871919,7.215891005948061,12.847852352284104,14.882235507896224,0.210107821955976,16.890477563590125,2.890100540639926,5.455714786051082,12.5667351949284,6.480192632373152,6.201245607354187,4.545838424730411,15.95927318344621,7.91000641291312,15.432648870370066,11.213489915604473,4.098632760878491,7.014882115094734,1.691526257243181,12.28153223223947,9.245789371104184,2.1931541387263653,13.35197177375619,6.309694496060647,16.93474227105874,6.488725082577234,14.180829266065981,8.389130332100375,0.294380903373872,6.0048779855348355,5.417052560307254,3.5969331823320383,0.08607750700525774,12.387684071153737,14.244091989488279,12.621048926006617,10.867212442768075,15.137914332144238,5.8353663495262476,5.438354626502453,9.414132993387136,18.99730267130127,1.6401201363173357,18.874801707530416,5.8998305779239235,4.799627835993241,14.591924106925429,5.736904267752143,5.128898342759665,0.6500291029933303,19.555186289156858,4.899915019591812,14.527798258426351,16.700209663648327,10.017957109974747,6.092415485468807,10.501360532257591,19.938218412388252,11.787470180231384,7.043105753266681,7.0411520408250405,14.869813472831602,19.65485599673562,5.515056742505671,10.023812689412948,9.448506237245212,4.494679864944406,3.7696856328139683,5.64697318750691,7.591865725303917,12.87761597884099,18.490761277010577,15.674690820315913,10.93109127392446,2.9059177856091045,16.29395617849369,17.701619177755013,5.9174655714862645,8.87434999685096,1.937937937290748,18.410054296587468,8.600289508577434,6.3738084302817555,5.367108562267933,6.326706677806797,11.856964192968835,12.360646969414212,11.216678020528201,3.263929221327757,15.71821713936325,4.139898779704541,16.693843454663963,13.477699439463628,12.311534226374249,2.1996868810641823,3.2644691221814037,17.264794832197808,11.86677879501444,17.752151861414085,12.733917300007317,12.093825570518742,15.883319017304771,7.69910751547215,7.16885643702847,2.618616365570454,1.9260115144084722,7.308543191017178,4.741877977004867,13.816348023210248,7.877037929712527,10.235187801245523,4.83159962255201,16.205686797399995,9.185765806052757,4.621356603983617,17.805141104927333,7.3428620296627445,1.5471416441163965,16.520405975555327,3.309152350471476,10.578695472411228,9.57141542794898,9.78028952750023,17.373539413457955,17.357907765150692,16.366757671516886,4.182208989037992,5.104744619313051,9.944106349177314,2.882119571560331,5.761993336824944,16.187627354931998,16.971122527879622,15.555659413287074,18.852168850888052,0.770828521511322,11.213339089048958,12.620962826286814,17.02431176946662,12.588489913867939,2.609198673873334,18.7061776725977,4.790897597785415,18.84993954751657,9.874884510442122,2.818962428882408,8.400404285278732,12.01144110200898,13.691163759454232,13.461084069405489,17.669510815651318,10.447399557451117,9.69744693840553,0.7567971968108411,1.0523162737044256,13.563626308016916,2.638595505631489,0.9089325355948397,1.647931691486626,14.531528520199002,19.22541630086466,17.205969683131542,9.171315520936648,4.556292806355584,17.71283722141777,15.163376722351467,11.106039404252371,17.57192652771399,19.13056333422834,12.070439497276917,5.85023802962962,9.730436586275456,6.549629492282576,12.086267025006293,6.5266492620805305,1.8168770888532881,1.8319466681912822,12.291689460947213,0.6369135645175961,2.8785077183210594,11.664827941484944,0.33179146849134256,3.7253671873967997,9.762230430623946,11.972292470758381,14.01182502561853,4.132495442102799,9.62967786992429,14.093056786737472,15.372802546451503,0.17931995219456098,8.845735137817602,10.426719624470264,8.926123661807338,6.485031706956743,6.302912936564713,18.268963006878867,9.669981219464553,13.976913746283435,9.04130820850067,4.276564018311619,15.832109153929771,18.66831700552471,3.3224272762688623,10.404720968480405,9.647436526112813,6.042161450506405,11.973928457232663,0.9011618585365744,1.4724440604519362,2.0276538882368023,9.533475985173641,15.458449174204457,1.91152536949581,2.1624535466207373,7.885101545651301,18.957208063380698,15.660563596004033,3.290524009330813,11.777299821260918,10.627116976053657,11.531369936115258,11.889591865806196,9.962185449623178,11.684442530118663,18.523267979212044,18.889622912134847,7.847054425538977,4.054813266525179,12.894940416817802,1.9923022816842284,10.511895125083814,19.990951531562537,6.614662585385354,9.097745183969032,13.007684203103707,15.291497073341018,12.530332654471238,17.875391092306465,10.898824283654903,0.858448340379101,9.69435655497627,12.218153989897523,3.750366763673152,15.26034058936164,19.692270720888857,10.201419333736483,1.5984510961088505,19.768070731885643,3.370256032522718,10.08802074028102,13.687818530857632,15.76147078490461,2.6939732526231097,3.2568446204629398,10.156359627439713,12.80602001473467,9.761767805264485,15.730854926916056,14.640611638915475,11.481198691256914,9.516372932642287,0.22247633286307078,17.09826375892216,17.694982328901382,11.302180951685617,18.242366834323356,16.38205557487691,14.474350545029676,13.445505012026313,7.379602718207172,4.735990018056366,1.6672606214467,3.1028822964894953,18.507098412836307,10.625630338188179,13.771125213601557,3.921090182974183,8.45831003948922,14.414814762686659,10.70299967497621,6.211952079968226,6.336789996391667,12.019438622812949,19.410259168353328,3.218135433638216,13.867708274159792,2.7510343020435757,15.519105178202231,11.779090949643575,7.161244314594963,12.919146353700214,15.069432237733157,0.6418092743992254,11.233023047254495,17.2026387967871,13.823796945589994,16.540620349015587,10.396699223815759,11.992987314100102,4.587397385195673,4.9727800484657925,6.024371081126176,1.574946142342748,12.942379023352132,0.6604688020476823,10.129560241953953,3.933590860019893,15.831433559987836,3.286647318402771,13.814471814224373,8.381923314268867,6.719439608928575,4.638410809285265,12.380150682223888,0.8896244343494697,16.158086479880417,1.0504803029641785,18.668461286928476,1.1085251975628907,1.7777142305522897,19.227140014931116,16.71422220845902,0.8368115587565983,3.0890224634164642,16.346725109694727,11.475612141207971,3.9508403569944006,1.2279706217669872,8.60939424660684,8.620961840613592,17.11622202803115,18.919922911796547,0.04399691560719621,2.7821714847357892,2.972513599702462,4.8536591599853995,7.880930978809015,14.823832258286561,13.068654382494103,0.48274398147436504,16.03319697738928,13.267772947702166,17.195428171539223,16.32645027666461,0.7923002772160981,7.451005228862213,12.367106610444027,2.790303568426147,15.183524359504847,6.759366726683291,16.307827064510576,2.966228953142571,3.1604873988386073,6.7360189070176,17.419090436715607,6.749550003645521,15.62416069398159,0.5767664331682587,7.680644074638381,19.81669953241932,7.991159120052891,8.154664569227755,11.744198809406061,5.376586589356798,17.977218372754752,0.6842486166997874,18.881219491498133,14.125135950313044,15.423008682289252,3.420387663996274,0.7607041834964923,4.661866375457868,6.403000184610028,9.53775356615083,12.04378655715396,13.512831197264642,15.619734767120521,10.966474807705978,10.106326354732635,8.006958762579664,6.628487581164273,3.876984576411977,18.68899318822816,18.796738295646445,11.96609713533416,13.444672647339235,2.706429566420976,1.6031855249722948,6.728076050010259,13.708365343640985,14.066075811423335,1.1503026780586278,11.816266286392825,6.567948916607622,6.840013896048744,3.9686864116127873,13.314348135784218,7.091843036303143,1.741691661314455,18.94312987017547,19.330892484582076,12.951985049816951,18.011983781637227,10.336196931069331,16.177792737432114,14.28851974881049,19.10640282091167,3.936075365970919,14.845382534564283,15.522195487630114,17.671194332334878,3.959256391255579,1.3751644067675706,19.635672640994557,0.42913219178144946,16.746771663700248,17.901994319961204,11.685682302933191,12.53639872995186,13.540410982804252,16.298698556255303,15.082235583699472,10.294340746721335,5.88804608759586,9.863783338502078,1.7256578827911806,14.730812321111983,16.652653177271723,19.312218304134632,6.061039676438367,14.809545029630078,12.010410748873554,7.5059585317332145,4.155041956070713,16.9359938468033,4.339701147002826,1.8596453529188262,15.160669616489706,13.874261269281781,18.0019012235205,9.655706568072983,2.370297330988489,17.678389448966758,2.8327655750438296,0.12610670649166877,9.760859319714994,14.184943056716573,11.597894610977004,12.785951016336767,8.39758219274255,12.850515811943808,18.975694226691814,1.2579125412878467,10.269084419147063,12.925153301485643,15.4322131066965,3.6016431894900736,13.936640066850948,4.5806399618104,18.47018570289634,18.219053725417822,13.421086940144345,17.774498015104776,7.115852642887992,7.254404176436373,0.7468364053257615,2.9760203639377547,6.460483316019507,14.3297082765742,19.445522209216648,19.027415965565257,14.168204319577494,12.656543380431247,5.871325819047226,8.530106997229275,13.520522678198148,11.271264838637292,14.792090200599372,16.43472591759954,1.188625742416991,3.917028283412902,11.279521924710668,0.38138354735532065,6.15150304524037,13.626853778471357,12.705248698664718,3.6691104982792133,13.486591064285056,2.8364416779476453,10.371366973899878,11.516528871576881,4.347741724675704,6.800402058529831,15.902106095348856,11.475780465021188,17.60517755268172,4.197875037349608,11.365492765341973,19.633272118911307,5.255165892801696,14.965464378619204,9.446184494986,7.245935262445973,0.3059050589636714,5.049889563688192,2.911447254541164,6.2396930797949235,15.497028771607857,10.124136853266776,18.821801300406808,2.3697425917828996,1.8864575216110646,0.9426584851082653,9.620553186874098],"p":[0.8766825370477205,0.7259736908245875,0.6676693317688871,0.08864596844281092,0.2252760011096604,0.7590507562209206,0.5167007550638614,0.997682972916031,0.9943722900123189,0.8111923376169967,0.11806941083898703,0.6643597580068561,0.16031344770424583,0.8272515645021334,0.942151671673326,0.3449812904754028,0.2623586571569356,0.37029080586954666,0.19151797361415568,0.8494287891077368,0.3863326946622969,0.4212609593219896,0.46349349065395806,0.300648089795571,0.7196221313392699,0.16224424015075445,0.0004200432353349548,0.7504767844473952,0.11264450894450206,0.8437349841096149,0.3239475288418463,0.7410391453440879,0.9652238765351262,0.21215652702586962,0.4156711914964497,0.1442680355278705,0.6519617514121165,0.44768880825722257,0.3598254180258469,0.45114726983817355,0.7363744460563351,0.22190438392916034,0.9566630065455368,0.501731170707598,0.6742388760660005,0.8676856567497897,0.7428225936104307,0.593431578710597,0.8741228888822987,0.6343849045482075,0.3858083125440517,0.9263482853346718,0.565644550997711,0.3441892496251431,0.526059552315874,0.3265370037886821,0.829308618227871,0.7594659752384383,0.7077160336302839,0.5485382781421451,0.7332597154759994,0.40441061245208476,0.4131407300984873,0.5122656747217602,0.14412317003718766,0.8817951999085003,0.6311748128036363,0.8818932880820249,0.3953974627832635,0.9144262673625889,0.04920617006544514,0.8551241092947435,0.5988308550025891,0.19654954481316933,0.28317575687319807,0.391443946566602,0.022751520644066714,0.9056485420373626,0.7033253487748661,0.31681278650832856,0.501887756780153,0.5837698268637235,0.7758603443623073,0.17243374989810167,0.10612893851106109,0.7243725863264854,0.32816330543989913,0.9442820783844117,0.6268580974226443,0.9375711496361809,0.23196045755459527,0.001907613339627634,0.3898051054641818,0.039561474305351174,0.9718217936355018,0.9523757983738954,0.48977844682788363,0.9063362285883405,0.9860825880747843,0.49572924561983167,0.7934102418010816,0.4628239767214293,0.4849810379925894,0.6166370870721329,0.5980407868850499,0.4039203266251563,0.5720917291940109,0.9693021965448398,0.5305786267532648,0.9421586436204048,0.514247510846648,0.37840334370456064,0.560447529512883,0.9521600093325648,0.05273967847526362,0.950631560948261,0.8637256554175479,0.932725902843182,0.2876992265575038,0.2230001207318537,0.15823680800826279,0.5411795266867863,0.17022005295851317,0.5479610277566063,0.16185131956111465,0.24619000959713566,0.011619955629132761,0.8141793870942431,0.68006834000818,0.3725095217567338,0.5680343006690143,0.08621118791033955,0.13154830596788147,0.23975943988155213,0.8639105050272546,0.21058033500957363,0.48232899098240445,0.41498897774667576,0.5485190778711664,0.6509503776878431,0.5032363475310893,0.7774971213684603,0.9458020704591406,0.010165534277679189,0.5430277726200279,0.9010072937926994,0.36980456467400424,0.37247412170766214,0.4358453631216572,0.2262181640922698,0.8273101966419696,0.18024367623044113,0.13395140856684562,0.18384380189440797,0.8131164538088982,0.844305503553477,0.3916238876005089,0.8567726573680767,0.14765739592574367,0.8532000164992111,0.02816789988259316,0.4493925028204233,0.6494949591175887,0.22398148156360342,0.8517463383903783,0.421590539595355,0.3247438217062102,0.5954207083293437,0.37388180692977735,0.35195777200941314,0.5271335984303871,0.6926509298330223,0.9431675305793046,0.684182437431784,0.04023229904363346,0.6001147496096948,0.7110204760151362,0.7597798513384046,0.6468644936777848,0.41371022428479587,0.8455972760862467,0.7438492166580886,0.9966024609460744,0.8287326588436588,0.8171485190177425,0.6549606039690308,0.5690722925486542,0.14555311969057416,0.425839758601813,0.29789451373826137,0.3379886118864457,0.009325711026189065,0.7050949133251205,0.568427114390256,0.6492037238475838,0.9194640805611092,0.9464905482468897,0.40816167509873,0.10683406986879151,0.9351611913333413,0.6648515335777012,0.9783269836865593,0.046281617429330124,0.14434946845568608,0.8164168012581323,0.9448192749566431,0.018259924721875764,0.4334936672277827,0.32207026894534696,0.3350924079040991,0.677197609854644,0.6495422476942785,0.2586328263767046,0.9072271052869496,0.9099270872187812,0.852203937878556,0.7375616159280636,0.5694113355308608,0.4433646599250509,0.774962149928611,0.2979817597660859,0.668371614313441,0.32283256728192633,0.8352783917314885,0.4404645444451405,0.3281793634559682,0.949480222478339,0.9001402880654388,0.8980314319279914,0.9514378753805939,0.09150400253880675,0.42392487668747236,0.7243844206081818,0.3828357451441189,0.2620023506391085,0.16242940276640416,0.2142475785451734,0.13516287520001935,0.4783478914938186,0.6520148490410205,0.5922014518140097,0.5048839769110565,0.650466428160241,0.029689195702565563,0.38150178084981246,0.18000611970282354,0.4940096805579455,0.8517022891877306,0.5921915070372064,0.19369148833509087,0.6188663844083169,0.758481863639205,0.9513658333228301,0.3506144497438508,0.29773278431869166,0.8210097916546228,0.9898049347236513,0.6240253233106481,0.9114733149255712,0.34195827973406945,0.16205440027690465,0.2975035064864291,0.42286241490811594,0.452445140821889,0.7404176512181018,0.19553032436329287,0.460573921122031,0.8418074979438632,0.5883049779142311,0.005114568965234545,0.8481700358719582,0.4838977364976864,0.7386013060434333,0.26701391700924515,0.6579596928674161,0.7404290187304645,0.1721540336198799,0.6423500122159691,0.6095134231588337,0.3675738148912757,0.347188694647935,0.47919701183465735,0.42681585085604334,0.45131403634791134,0.07505729426026297,0.6688672205549222,0.5943984760974237,0.5302326312878209,0.6161717738506691,0.17593107447142442,0.827939983306839,0.898814140644898,0.5611022576156823,0.5515473702905034,0.8471271138929435,0.6093361002130118,0.8328144065042851,0.17119252625586845,0.032538935117043755,0.9455492025773353,0.6480272881789522,0.8897036338985083,0.15356599025517603,0.7349218728677123,0.4733021046786561,0.0006129522745328408,0.9833267355926303,0.799159868982942,0.9745721777716001,0.7728367721465759,0.00691268832692038,0.2369932883207706,0.9572065023589933,0.592110092515219,0.3445298574385047,0.8521554088604613,0.877518836796487,0.3901485314744668,0.9162517936572994,0.41271046061262995,0.0032370082014729906,0.03008774841434647,0.8298699379273091,0.2538816162505457,0.9824314193164534,0.0037620180555222316,0.2768569402179597,0.7110193287742903,0.37281755474848066,0.5733833222882503,0.18967192873058236,0.5088911493232651,0.8957003494850286,0.13740833058252577,0.3063062759981994,0.8433770134897989,0.033629959356934025,0.09799693766017192,0.13559901114017192,0.5976430864315032,0.24326955620575963,0.5901095400239764,0.6268936703859249,0.6613806249434857,0.3896984043113245,0.8084280049387156,0.9318473882715874,0.9011744789332461,0.5333704591291684,0.5179194467696069,0.195038020475083,0.9402604031431949,0.14934358256109848,0.29301674594658356,0.3479773998076847,0.4035774156160423,0.5472050849844154,0.04416672025261126,0.9155167182922768,0.8886722058767733,0.8427392662642792,0.5592109671511596,0.05376428419933199,0.12511858339562054,0.577796478646176,0.15929802171235052,0.8754747719612515,0.29660099881699886,0.1409357682120913,0.9717201073833275,0.849205047141868,0.2588642373803578,0.9061119881072286,0.07697346694769336,0.30417457405935644,0.45186708054641156,0.9397176008733021,0.5420548184797107,0.5905594284736608,0.08754966548712506,0.3748237706328297,0.4820283571516306,0.007759992950137962,0.025713464214538462,0.525057054979748,0.24612421185463518,0.944799207626716,0.5669745523785328,0.08631465333279631,0.6170604964265418,0.09693221695995047,0.6323292116060781,0.06049936981532422,0.03257400794095067,0.20167012404787954,0.23142376581043966,0.5793885248902684,0.31789758500144805,0.20843387925699575,0.3821945948906118,0.08799596895155792,0.8176171078172607,0.11318635278256095,0.915211046222226,0.4218905147219223,0.7749340639743543,0.3445194554232667,0.30107736719169087,0.23517097628975137,0.18768107291732505,0.27937017104426176,0.576778890370035,0.18345402524496124,0.39532264418637086,0.7647901676226792,0.6528723073517251,0.6978783646884523,0.64935905579638,0.9084163579065643,0.07992042064948213,0.00489247999455622,0.48682425771093807,0.5838809393250224,0.19368753709780773,0.00432711450235046,0.7745854419454548,0.15524059264703927,0.6371918887433625,0.9154238860796828,0.1333419537620295,0.4538422986589379,0.2536337519044989,0.23631678766741238,0.5250118534286756,0.05053754617851025,0.7701553395036436,0.6274961396299787,0.3463201616720366,0.7779313024449659,0.16592816267102828,0.9362911278902433,0.1099544290564678,0.8220902225545068,0.24692768057307002,0.07215566164852172,0.946799741839897,0.7766378927846782,0.24072575326719026,0.21401013976791883,0.4482817552646028,0.10344967021392115,0.5247213386205494,0.2409128177659119,0.07973002651877548,0.5255097454875937,0.20324716640273333,0.4030275269183481,0.3240737543424741,0.7786901863884459,0.9218310884324161,0.1672026046574,0.03444756529691695,0.6976130953835451,0.919088267500491,0.6645561347200624,0.8634945867740742,0.5816876523551333,0.2335225861886958,0.2716886995376617,0.6206020309709834,0.9970711501076752,0.4094963007459118,0.6215608733398164,0.9556110920927745,0.8747642730510339,0.33957919445950857,0.1411990912824692,0.2060734602270078,0.49375480418238804,0.11721564285358754,0.3160825806275833,0.6817394137388955,0.0011239366044379917,0.8894566747393264,0.8202683397334234,0.0930212444729619,0.8855368137722357,0.6472908184620232,0.23935588072167202,0.08715141922219094,0.6317244647462887,0.4793016988056633,0.2744799342463973,0.3614273829063208,0.7762763937224959,0.02373904854832687,0.18091748969492016,0.5548005559426155,0.8782194847019271,0.4947796885774518,0.36833298073256593,0.6970337185113253,0.8631300355003904,0.0904426618621601,0.7947601313693238,0.24652890288907092,0.06314170583931689,0.9003277318355121,0.6645874013322961,0.9367896099727022,0.6178022862466392,0.8021853273119246,0.31024867946095225,0.7809705030949068,0.792971921040317,0.5559660981272396,0.8666288083818425,0.7609072199688551,0.03732646525532313,0.6956859851117707,0.2573383259363142,0.011517042528776278,0.8861111167132956,0.18903172186193062,0.37144738720267645,0.47739739381928237,0.9424739224068099,0.9395372884665345,0.6613028560453895,0.1570830363275355,0.9110611319914843,0.8302624164484906,0.15187406237131684,0.5775627768887688,0.7010525474039457,0.8412163041075233,0.8564228423984652,0.728804950104381,0.45262820941912185,0.14120125735630928,0.7351093636025012,0.499688032319497,0.7957688731201102,0.8052875354975337,0.6815963093644763,0.7583986407369585,0.40059608331924657,0.5303833903999,0.26609748746496376,0.6966318739764856,0.43439470361409493,0.2657033226717267,0.9680809644747266,0.7009125190368497,0.2807205160128623,0.27993538828548714,0.10040432624846396,0.35733851985255827,0.7248371615969722,0.3925383663571531,0.7170355613881125,0.18931388132177784,0.6248656586655548,0.3369321827502736,0.6521420605313359,0.9560532318441213,0.5411060678789104,0.06888013937612936,0.18714635964349724,0.08035725537019589,0.6402061569034037,0.32043656564682066,0.8455782637300602,0.5035348626992062,0.06085982662083422,0.8441335142745785,0.19292090863959088,0.03557930521209118,0.10264011413828444,0.3859518486120179,0.9336323376200533,0.8962199799682622,0.004767482788744948,0.6175256250225805,0.24329256900279828,0.2827507458964722,0.4859220121850172,0.10350281618067325,0.487175267974187,0.2669505363533755,0.9065588479987721,0.5016191322562282,0.7285914323300451,0.33036829765367837,0.18226550889518722,0.7621502558817812,0.7083342171872855,0.8727490548471157,0.9312324211181635,0.38260085423529344,0.6640586902454835,0.09396361274954934,0.6976280780901472,0.7047981773913379,0.5831430699451412,0.9129258441552575,0.14102421488910277,0.764323751917908,0.439119413239075,0.6959168158077504,0.11304527151424715,0.7613182385222732,0.08511180854738254,0.5107072282641898,0.16102516953924728,0.14416283444407818,0.7424010219051627,0.7054299810929052,0.9609745165156971,0.6227178607981978,0.3838908601928026,0.2153749623326051,0.10943811111800761,0.02011253600373908,0.9154603215027035,0.43533327997450666,0.01921486970851305,0.6960127490341701,0.5822369590010237,0.9010346168407324,0.728017456069991,0.6939114803375048,0.5969927704076783,0.01098875435036506,0.7186594082590394,0.6572403604714356,0.9168636512921338,0.6950575233620819,0.9246420573971261,0.43565365503108433,0.30320284732137837,0.4023019336453786,0.2541170527213774,0.3793753644777871,0.6555140547808591,0.19848253023731566,0.4390451916714191,0.629835594735279,0.3579421394676692,0.9003941871003602,0.05196983594581561,0.2974432283447075,0.7284403602766563,0.7456572533351873,0.19406154080447613,0.486734066859714,0.5385778555501031,0.6905875281440015,0.23590663528072864,0.04220261742665432,0.9381840192352013,0.08489731964924374,0.9163298734836447,0.42737132726589055,0.38411718898662817,0.22955739687460408,0.1687260528591299,0.8952960216578403,0.357514201077187,0.816038034300522,0.1969434985871743,0.9422919852369569,0.13199828627222931,0.15235124800293476,0.003826028453964625,0.5060672145522371,0.5303155109880571,0.8389441091212755,0.7102954754199899,0.9932688451802507,0.9654167575436721,0.7433599295192492,0.6907734374076382,0.6217121316151413,0.6102310644986635,0.6576432717041598,0.9330012162770907,0.7197429348574771,0.725440002569689,0.6067128739981344,0.8755038475445567,0.29681320279822465,0.9448069744598762,0.5601211900474896,0.2543321110783743,0.8053533949243152,0.2687531958798688,0.8739654737225915,0.5345064788099563,0.08984474457595248,0.6844391477198575,0.2721468482642464,0.7514506904268621,0.14445046241860182,0.9185158636125899,0.8862368280763202,0.24804718814716664,0.029977538324454933,0.6230798091302006,0.18575528829994803,0.14073164531107318,0.5403807042946769,0.5034257918439342,0.9552039025281269,0.5948453649037893,0.12936266488991732,0.4572722432307006,0.0017945021995240396,0.5649502398020976,0.571815376086698,0.3698953740590649,0.04201598250316518,0.9680231217888291,0.063578306985967,0.17200634854688146,0.023064437429973328,0.01918079330670719,0.1471181707643867,0.7293611139392651,0.7125318397748674,0.10692592562867742,0.7171994164604976,0.37078814237437174,0.8352625075361213,0.9220225414210539,0.5718210791937179,0.5880875012953881,0.11262695774219966,0.8803028813227216,0.6754206039506419,0.5018175979029811,0.5362053861208085,0.7691221714238998,0.9526122806945625,0.9294843754061,0.643992634018504,0.3231408783239267,0.7846908169492544,0.5220471069116037,0.13543225622070976,0.5859965753897576,0.0031576134099564612,0.136449203989206,0.3006702956311298,0.41199004267223915,0.8371909719184789,0.6220996727689476,0.7077716546459594,0.79162553268931,0.4801309528381754,0.23445261259928762,0.06032949149233224,0.010696832624878194,0.3019725709301402,0.8611406220970879,0.43449190986218245,0.5161193195192324,0.2412715023430443,0.05581662522039044,0.4706335164179818,0.745986772497812,0.8556823647079579,0.2574594919145634,0.5234118031746973,0.26258496378017826,0.5756177788389469,0.4487025080723577,0.8561255153250027,0.0018289802857516246,0.11064269192582943,0.17806733640102435,0.16767383641641387,0.3438632230151919,0.6656787136637468,0.9058336064952308,0.6120182831273802,0.4296630419875276,0.03227622417324216,0.16158516173827264,0.2735946979148334,0.04253574039732588,0.2963808175655218,0.7232696033358239,0.7724872567942767,0.4371732124218921,0.06673093150635734,0.22012524153737312,0.2793296153616791,0.9018616616323847,0.695388442537757,0.026582515621227154,0.1582356991609355,0.3231882113216562,0.07483818194063363,0.8251287621008383,0.9986428046306239,0.703560373621587,0.07037859913519173,0.7014413199169547,0.22021139305001203,0.7161739523554194,0.5114283497570744,0.9363809571264481,0.24450216800591207,0.7367330300800774,0.22567438540162055,0.1216803005092355,0.09588957463730985,0.20582686952181262,0.049693265150584365,0.6461331791636382,0.011275549807679752,0.9705657143830988,0.6808171516527908,0.2788964464626644,0.2634106000513712,0.9645579324394871,0.006588684119751109,0.7913761774100374,0.1212578031469409,0.9352184744722463,0.6039435018509176,0.4770076593776278,0.046487687741198824,0.47409425795595217,0.46096520410705,0.3934243615132873,0.7563579170003729,0.8208674507604801,0.10131621877982622,0.8620731608566528,0.5110280243743093,0.0831768343508017,0.009416204613983847,0.12666993070066845,0.7559125117321892,0.09509618529226271,0.9815312333898305,0.7696779156370817,0.517346293650214,0.5733549374095732,0.6242421060347259,0.9016364632229763,0.22188998829913587,0.6750512478998678,0.8875796795206499,0.1555545656540296,0.840772492734227,0.6253047754802024,0.47892707657447464,0.5454666985330614,0.8929216771450177,0.5911653285198586,0.30233555177626403,0.754064026425068,0.34057233066590475,0.6235959807046174,0.8702175957368212,0.5870467994937232,0.5927186882379953,0.07035215814852713,0.9259882167978375,0.48182267773058474,0.5198697490258453,0.0679899920935032,0.46229983631748195,0.20032177846623922,0.12127516187742904,0.30860249419676133,0.758498883058141,0.7410963522023426,0.2663145798941897,0.16424910962804184,0.15688946644531732,0.9132533185653899,0.8132309955913881,0.09643674063889018,0.6237992397626333,0.10672543503502796,0.14004414823320133,0.7548059701276497,0.9451834455400308,0.3560890440556601,0.32999511461104625,0.4613453240384171,0.8005395014883507,0.8519233535990103,0.8789981402289537,0.43455763992953167,0.95816300893768,0.5135062965180868,0.38060950117489756,0.07356200526308121,0.9567407588031172,0.048246009815451796,0.6660978254571579,0.13343937335946188,0.17059772621569969,0.6741231600264195,0.035896235595878956,0.11827154469754375,0.3526180878144993,0.2515494047036748,0.6857929013472637,0.317027471160948,0.31031762091554005,0.5202450991924894,0.8061824689100232,0.6189207140766539,0.659454588709504,0.2019219003345032,0.9525887420461538,0.5155228394092777,0.6773523328944591,0.5401279603636284,0.5759376284651212,0.15050203236731674,0.9373242591152007,0.7032983069332532,0.8754314433800106,0.9141960458552121,0.9085634868758565,0.746292986132981,0.8305548971429184,0.27717710773592974,0.056382304096965985,0.24869655349366848,0.5360475568581293,0.80433221436805,0.6696561879663434,0.6700204044317313,0.8055928761638766,0.24077173654410244,0.5363000788718915,0.24491236843879904,0.968143313025063,0.742298945945715,0.5710246571556152,0.10297911862132003,0.20860168413815416,0.5811359831290488,0.7269450890291951,0.9814596345495443,0.7167206308478082,0.8451395982574301,0.6974199520256024,0.4898649487580302,0.23886976861694054,0.5159965714710537,0.31789344957109944,0.6024089588108479,0.9199462237780349,0.359508661654637,0.6514936631366892,0.43796691172628566,0.0467143036798503,0.5943961790771572,0.663438394089864,0.9900940812393602,0.4160574943902955,0.08682751617788309,0.34302604640860324,0.3735741387145046,0.07522703568242117,0.6173930791832556,0.3971493299180908,0.18527650854371758,0.533876197876046,0.08516286171076692,0.1029544803821596,0.17147132774894835,0.19316778730578932,0.19863750468013652,0.9007705243231394,0.6680054639490216,0.12645927000260038,0.4686641030083203,0.10684942663046293,0.12178588863127593,0.10007111109069822,0.7100591223145551,0.39179689974445253,0.493377735600252,0.24217706594088573,0.6748526937789803,0.33745552949313606,0.06817874591995055,0.404519206952213,0.15719393798331582,0.8321998904483436],"mu":[0.9266106169791972,0.1454886854678703,0.7301968712503111,0.22526428698339696,0.8863503275808478,0.9082430694879391,0.4871336803979627,0.7371708508494577,0.8864702707700844,0.7121347082261422,0.06816740414519096,0.15917958103133478,0.3500093951580274,0.9076183029930984,0.6467035953490754,0.4246175555086402,0.3049336221173835,0.2829926053948686,0.6362322955842954,0.7002752456959023,0.9413418710787325,0.6080063057989566,0.0947353785476368,0.4924492925466575,0.0060431795103894625,0.8996090524816385,0.7264528384633633,0.17647608667573533,0.9878940424279901,0.1590847583874715,0.2584248008146124,0.016843030741227505,0.8423944936855863,0.15607719946105103,0.4693168097160081,0.1924423804338704,0.06768471984379154,0.7344465020429058,0.21531149078516543,0.6716180816047859,0.9709701908994142,0.5638277694610643,0.625165282810632,0.9112474673631785,0.20495201840455013,0.6667354759459974,0.22233434199068935,0.8527098369296098,0.9915352382319889,0.9659452343033481,0.22976749409824748,0.35139237596641437,0.08870633900883496,0.2976857237571311,0.379075166652731,0.12087625746753417,0.9100050537206663,0.709602479628997,0.0387940827598785,0.7514533685451621,0.6991405276594218,0.17035015027416645,0.714257772493728,0.47392612832858827,0.10785448605332992,0.9490274794504974,0.9052052676034543,0.20749995578979652,0.7315443915346502,0.4422738897893641,0.7945349506428749,0.9416627952146739,0.6313329446279448,0.39771162138941096,0.144998897904276,0.6727676150150117,0.45461611324579665,0.9430369115705721,0.12660757231253372,0.925689117530542,0.14864995765855848,0.6859346070152583,0.6737399240593702,0.7154820282272836,0.3192956175286772,0.8412626382921584,0.27001867325218165,0.8054659632323915,0.08524318940908548,0.3048504430851726,0.8135077032190545,0.3430633361664617,0.33567198398869635,0.6930564652824176,0.04099749719165735,0.11742116520029389,0.34961021011326365,0.33032278975015705,0.8133801171126236,0.7876021167057554,0.3915439684380835,0.18081624573214472,0.6511641054754187,0.700220892354273,0.1331049043373267,0.09056672998657311,0.5084688763191614,0.9413894575533781,0.6814724575554791,0.9730919963554439,0.22363414910238477,0.5400214132679984,0.19363177084681893,0.6285078242077251,0.06355361350396804,0.33489361137458395,0.050653089484802294,0.5919518602692346,0.7816798376907581,0.879492873679103,0.16349731186093708,0.6839329345176643,0.1233883462625347,0.202677148252574,0.5499213129845193,0.25559182912282896,0.7749390579328612,0.6749085327730313,0.48046980589519306,0.6298005685648547,0.42622816464911994,0.7739387109536731,0.6305951184908634,0.5174556049109935,0.9715858610103074,0.7538182498779407,0.49005444355370753,0.3186707051422646,0.565049176598805,0.09125101780494416,0.963540479843072,0.7817939478072118,0.6069024807621217,0.7521313555003277,0.1659726915336006,0.9424057878086993,0.533585385791649,0.5747352409845035,0.29286345405673075,0.867830887534591,0.2979512193167393,0.4332819789726201,0.23597280142532595,0.985984210305231,0.816202741970133,0.10679064029237417,0.2842820281163134,0.9946157787374681,0.1806259203818057,0.1226449270144736,0.4879388711806125,0.804968943822334,0.7365439877377766,0.13866881540498976,0.5333906700929973,0.6844816912875578,0.11612170693651436,0.0657616678278834,0.7845242123651102,0.22269132954405402,0.12881631250739245,0.896522969448394,0.7774025540572425,0.2329011380571222,0.7196253280066687,0.9957176073745251,0.8057639650580222,0.23881108930621608,0.5640002694051653,0.1518278271074185,0.7806585286477938,0.7226634323751684,0.6530538044706606,0.8820164210722168,0.8396552060430071,0.4956993143499455,0.23400236955835685,0.1969197940144296,0.08222719362632747,0.5917535050038027,0.7254104955885181,0.12730497914755645,0.4598156798683062,0.49738516220237305,0.4555011031961025,0.5535188953181571,0.883679300366538,0.1614091857441815,0.955983389204953,0.684560984820292,0.2638495530514313,0.8508893877782642,0.9416180127023452,0.8063746658968372,0.03004830089072641,0.5057982966493499,0.25032941941801323,0.7876137054175623,0.21187343950219195,0.6263998773825874,0.24769075706973065,0.7657650446491959,0.6131389118607489,0.6092163211877228,0.527133445119178,0.11351054734551802,0.3495434692230379,0.29226596594659293,0.5248335172900831,0.11775950026359316,0.05355950860250491,0.5853050614262014,0.22858121021829514,0.42690774766530004,0.3321121935186482,0.9795993401395342,0.38032610205690065,0.28402077849607,0.13102880224435243,0.24993639599699913,0.1708644126974428,0.10494795797114898,0.15428721820389035,0.4709197298523309,0.7196521762317738,0.3175112695114417,0.9551323067446316,0.15801934393830974,0.3591664598776556,0.7852345388987423,0.6885752673955985,0.0560474347950477,0.8328574887862199,0.8442739475377945,0.8631424729505486,0.9489241294238075,0.7816168199564602,0.6985982334127028,0.8391962143171423,0.12306618147270254,0.05554942451592093,0.41981758788972723,0.16529184608130776,0.7271226467862257,0.8807626676203795,0.11231656905320953,0.3698789060879766,0.20635609748627992,0.7675509181823756,0.8624609436993782,0.18170817645336212,0.9913212398043825,0.5462484228563538,0.10500648742298169,0.9950794209826561,0.8193558405633241,0.607616370019435,0.30588948191943,0.6080298992370659,0.591379258290124,0.48304375205824823,0.2286096007178322,0.760955459977527,0.29458419170354144,0.010107551507825052,0.7462729368902876,0.8445801981954764,0.1268909928862867,0.03940215425164162,0.733744553434879,0.4266302192380642,0.9836170296609397,0.7085909962775805,0.5214893080728897,0.4681716160359801,0.7498113374528568,0.48029677458377473,0.029219010314536664,0.8889191025982786,0.8907504875388454,0.2409280821293438,0.46499220921943607,0.8674906513957559,0.33444077497151214,0.42360354236129405,0.14179222738941122,0.2526474138360384,0.09372285578108253,0.4925441542613336,0.21778717154546978,0.3132003638719245,0.018428825746316768,0.29721059939015704,0.7759198468002668,0.8191679283672708,0.6445435105816051,0.07407343453846815,0.5052023824482683,0.7993696826290786,0.7181778724532166,0.0636604207106215,0.9434120264943482,0.6784657850031452,0.6971774941750379,0.12561028773670735,0.9604868485691174,0.26819755381934995,0.6274206336884058,0.5258339053803531,0.35499811800522596,0.3691247858971072,0.05093294672623938,0.3132971100557249,0.09934272660577093,0.43094644696459317,0.21183351013597207,0.8143804648714772,0.1348028509526762,0.6452441435820224,0.16833608138859013,0.9328999618988321,0.4416276748555026,0.03257318480472793,0.8817748874091254,0.8352412688028747,0.9888563647489741,0.1418409863200445,0.4487168995243438,0.49080972934717493,0.7806286719027602,0.40618473968219737,0.4071125873497421,0.6225039944944315,0.6474349367463808,0.17952944762587197,0.32403174199957485,0.5828767514244944,0.8017629152535495,0.7231203346295707,0.1875450862076382,0.8034146352843639,0.6726037208742834,0.906945871834614,0.7925480235270554,0.04896586835606431,0.11799278101757293,0.7084978806764115,0.8510744748845651,0.2557929363307212,0.28301237151350755,0.28370850891671284,0.31431564212113594,0.6341813373118803,0.32929564072316464,0.10635646212494598,0.9276547885075377,0.2704092082163554,0.8089830123580166,0.6409752838242524,0.22564597709730716,0.17227895658795545,0.6236425246920125,0.1616734530262598,0.4132909538113403,0.1902202797854915,0.9554588771737,0.8760585069187412,0.3846208893084482,0.05016275204797371,0.7644193443157039,0.7989931194439976,0.5910908155206378,0.7038373186350273,0.5769365920146443,0.3430706218806381,0.5914451784373524,0.6150333237282672,0.20782143365620342,0.23454595567503467,0.6116663274143233,0.9981601450154287,0.7748166921817659,0.9865613328541296,0.6169749136151519,0.18426409545862876,0.26939846054417593,0.8074417201736939,0.358393949672557,0.8298732111902254,0.17814398775336837,0.6142989694386862,0.9322450561267628,0.6520586590454791,0.5240234678738929,0.40462812497104483,0.20041765835796266,0.2380959750797227,0.4383889272915451,0.2218864774176792,0.157766678357824,0.15625738118145782,0.7978073834329915,0.47019213027534557,0.6173575925375749,0.5133351638237171,0.42511098668524006,0.5968685258391158,0.20669174649358846,0.9257847101203465,0.5446459965732049,0.9853602499203746,0.33494292123988667,0.8605241625240163,0.339822043499296,0.15003310645425083,0.4419121369678791,0.6287514021174903,0.8603273041095356,0.38104043974437074,0.5631826110639941,0.11854751940335295,0.0652930002007388,0.46465227718025015,0.24917408008560948,0.11901277416289058,0.21218055963576554,0.9103436944249428,0.4273740157358634,0.10196866850660391,0.9162413187211707,0.902040551040312,0.8799116005998331,0.6138575218332085,0.6760240915518041,0.9848316415499496,0.02891836282646265,0.5306314405868457,0.4711685489516442,0.6249332996160344,0.8831506288698394,0.0635006836871268,0.49557108374167114,0.8874033439714626,0.8754623660865921,0.4864297903324728,0.3777840498734477,0.08117384343497647,0.5734344683016006,0.5776322090227086,0.7888520428206254,0.7638246208208492,0.8195437400918615,0.5790127271936418,0.17961572877215293,0.45595808147021577,0.9165473270953055,0.22984479714317985,0.3805922260805721,0.8475490362863722,0.18188627507501276,0.5559314647861326,0.46159644038334124,0.746081974633616,0.8751120228134179,0.990055493564846,0.35610677635116295,0.6467991802334583,0.9501180447992834,0.17498228831741902,0.6139807929297796,0.29893959370034784,0.9150464128150204,0.4519967916211016,0.35441682664947183,0.8721753566220334,0.7361698735085525,0.946086632607283,0.23928731332537367,0.7493830749223653,0.7560882176645238,0.4351181668582733,0.7399426747555804,0.9280516112911652,0.5980132957637987,0.45081030478581074,0.920410960547416,0.24756132922859653,0.7092902781765009,0.6499779875000027,0.7531015207920213,0.4901362949539956,0.6325332700223949,0.05815705957796857,0.4171409554206469,0.23033262286941314,0.5653675238195364,0.335957630753124,0.6950484021833996,0.9116961336026246,0.5975716429396696,0.9655267860660488,0.21433504058461628,0.775915529854255,0.35261176577285935,0.26089191099631237,0.43513518528329964,0.1632144724050324,0.052641600109040176,0.7054391954027366,0.4878765215680225,0.36258623804948376,0.9992558389346426,0.5311164710004477,0.26831666764019735,0.9849820406560745,0.7076199774212633,0.14382857749641276,0.8513639109732016,0.6951710465792325,0.8462234725928628,0.9415033630229757,0.5127939141452884,0.4546615950097508,0.15141797014309266,0.7775722185384648,0.9003053644090819,0.16024063564233737,0.15154116480761637,0.3423617239332737,0.43282677447457685,0.264342517038455,0.4037028769048219,0.5677590765025133,0.45457924611523803,0.20381655528430165,0.13648529394629727,0.9033511502101876,0.6072756602739569,0.027538051348586112,0.34420917125516937,0.5430267482187143,0.18800113931771856,0.22432089141584854,0.37825088547972796,0.6414045580056495,0.9059487243574782,0.876963131005966,0.950894602728821,0.10184131387944073,0.7851415509694111,0.3692725988525194,0.17343331153991115,0.3303205477758602,0.7849821869532783,0.2961478647413678,0.6612951687712307,0.3809830889408006,0.9064568099683961,0.48961694307569603,0.2868166969941415,0.6593297864952763,0.3791237277985613,0.7425036647923156,0.42883714969500475,0.5913340585054414,0.9355632282057795,0.8257332341994406,0.8478709489687992,0.23825386210191368,0.8382115897983131,0.7296283078965082,0.7919889057410148,0.032008225081438635,0.6279217120922185,0.31297767022612466,0.6340004974860882,0.10959071165035716,0.05299247595047474,0.6603859280279893,0.4626751824511215,0.3263586560748424,0.8184060730442759,0.5130546793551747,0.5087351580029706,0.9490724829066173,0.16113509641849455,0.0957040127355846,0.7120579453956322,0.8920621274608089,0.2939067519310823,0.7902313533618737,0.568571480120341,0.1739681171475762,0.15616035429325725,0.23598466239273574,0.6066610286754734,0.13002849843888864,0.28608315836818665,0.808679000319507,0.7804327272207934,0.9140622438733541,0.01938303011323117,0.9809883967153092,0.8659190813262974,0.9444288369929652,0.7546468322660376,0.5611128888108179,0.5857453277385538,0.9741832299608144,0.3525043751612962,0.9516149117368187,0.7020481214200112,0.4832010476347892,0.04786115884531461,0.557913254545056,0.005307624939332012,0.9203117508350893,0.47261683636218965,0.38595081167834455,0.302477841257649,0.669441221666355,0.09335614974627937,0.7752265059147931,0.7930669937510368,0.8775011075012613,0.4754911044372119,0.47494049709933606,0.3951357463454772,0.8009228503267722,0.7212261899389061,0.5151284543329069,0.08594426156647517,0.2898132471954624,0.10961133353247998,0.4943282458005682,0.6670818514254422,0.6995591019529954,0.22818523230943977,0.6426102701072103,0.3224365305545236,0.25880316658580704,0.9219797607769273,0.49984297790775956,0.19974072263182352,0.6759085930769435,0.10164952482658252,0.7891132937463687,0.40200453827003435,0.16852442390791156,0.16300706325747383,0.7666049960918129,0.10047177145938035,0.03517514891113582,0.10761133212385943,0.1632912524759622,0.7868798966377699,0.3753028298000807,0.28438669984573006,0.43967097998436233,0.544029781413208,0.3638866977586339,0.43605366814946334,0.5457974193557296,0.5521301113369916,0.8389741079326756,0.018793520042689194,0.7402439863870418,0.5229225457879303,0.3739930258141162,0.9313491188838858,0.4649625535252899,0.9070834444615843,0.2389821935591292,0.6561950312062386,0.582576708935483,0.7383080114117773,0.8506471795795103,0.20321736136139434,0.9348890480494338,0.02506976261600813,0.41770222339445584,0.007589569858045264,0.10102837393043473,0.04510499698777326,0.04026080545819455,0.12266441025218544,0.7967919209847574,0.07092513332688699,0.4212934663479364,0.4921118962108735,0.19820587135611945,0.2945768968646285,0.31669642283313415,0.23815396605455064,0.5961699089572448,0.09214804865097048,0.037015995833067805,0.32162121984282854,0.6127205091913817,0.4612958459860155,0.5560646629842083,0.28531256420214257,0.9272919649339038,0.0744317680954818,0.5793129129507304,0.8817958372869457,0.7868531270269239,0.6874733543087781,0.4813521860633725,0.18817356700175725,0.3448580278302791,0.22917515480983686,0.9716082137990951,0.7941100996968335,0.9706627102859346,0.09779047364111948,0.3028725091129665,0.820424299383562,0.8822163296120631,0.45061943440871177,0.13839158268627494,0.3303289712589401,0.6291505239506923,0.7920600277311782,0.16660135440622903,0.9225806051437193,0.4517745453731432,0.11903286408254887,0.15181703915385758,0.35455991058133196,0.02875293661142808,0.8741175997864175,0.4428151902325317,0.909211662387928,0.44766567440164584,0.40421114706762906,0.5542232408416163,0.02579963639409799,0.18909313556466634,0.4144951622969246,0.5971773309071928,0.29809615224080077,0.3263044430414048,0.10577279439630694,0.6674739288805949,0.7121236502313744,0.5200388989478735,0.779545199074124,0.3999593885371737,0.40689886413160936,0.25218290130515775,0.9909074116155778,0.44574822240442935,0.13211326719791838,0.9917146580311653,0.7883450897305082,0.8615119433349179,0.8219246845515549,0.8763251769462546,0.9019209924559786,0.14844885046613188,0.3010080404156277,0.920058900930562,0.14142569379127123,0.18329702119259128,0.2822920407463998,0.3872381828128988,0.3060165046536143,0.5236852702135437,0.1655132179244445,0.012848990303784946,0.6939599529618135,0.08488852845932149,0.8496043024396644,0.3484992890102827,0.7724204855425278,0.2679643669042744,0.8404792741522216,0.4641900474732823,0.8568378756928485,0.4038133080279962,0.3413246320865633,0.3912024916984711,0.8287668804974715,0.7197584568972224,0.659426564566207,0.7730011487325861,0.7790755037908221,0.9255488607687021,0.5101794324253357,0.9909855467377584,0.7924249718865122,0.45414973106666223,0.20359271151577518,0.16880582657405663,0.66708916447796,0.940151782119363,0.2288046677147304,0.23164021078518005,0.3672964021596039,0.732771455696114,0.9174836567036428,0.7034575123231146,0.3925170834655576,0.6956616651265812,0.0034307242921085557,0.6679416035619354,0.3673789222817416,0.3785877436543945,0.6328650377545282,0.4948748596034711,0.30669881837671564,0.56421282892961,0.5103176426325466,0.5747554492869684,0.6215927374417183,0.4383299725783252,0.6485936226739921,0.9610834395551231,0.45764616855610796,0.9030067133593942,0.1519305919357834,0.8101667880725183,0.5636753917692354,0.16180551742084948,0.16912158557465373,0.11407177438389549,0.7018296736422389,0.5203270423198756,0.13487533764963677,0.892014875964035,0.5337466067967953,0.8172676714050127,0.9556247516409075,0.9858787553431634,0.18574373552887025,0.44206351972091973,0.48642578475962805,0.27796504218110885,0.9815782495360599,0.1567921644412087,0.8318897845115116,0.18933640833330423,0.13615271489199254,0.5323584025538628,0.6100314980570047,0.23515242954501825,0.5765435290273664,0.5993740413736677,0.04421548151499399,0.012772238584017437,0.06081895686385308,0.25755530972690766,0.4958790832452762,0.9525987260382975,0.7124298499168769,0.25245020792645456,0.9284119743895423,0.12523339244474863,0.09141992960881051,0.6450639209476099,0.8487371342170664,0.9253551587561535,0.5240361913820759,0.19657804574236182,0.28594023960161974,0.015852312207673025,0.9414545195438704,0.5547434983683162,0.7942386453964809,0.8893313972038943,0.6430050751086951,0.5370998941335641,0.23298502316728875,0.47608041998278483,0.2714600395467299,0.14745401040524486,0.23440251233961495,0.7351646903224733,0.09565173735942079,0.4471527081974602,0.3760255188633088,0.4229283110292812,0.9815755272789526,0.5759311182402314,0.6388748642288242,0.32392017236071213,0.08699778627007992,0.13605423036119513,0.8172172316622508,0.040823601078800786,0.18817287591939635,0.13384822512729366,0.32174286938939356,0.4101533730846385,0.23122556845797404,0.43702791535518815,0.211354969115928,0.7414802636953006,0.13746636012276925,0.7871853656300849,0.9724385757290848,0.6197052694849776,0.05562121932718611,0.8965932373948953,0.9220421515766841,0.3894992664670587,0.4530705319263362,0.9656852920263843,0.6694904830519695,0.17236188368004357,0.09536777651306272,0.24930016053858917,0.9040444281505906,0.1484400219619193,0.634441904324859,0.3175546382717114,0.9954178144538368,0.4272731531801275,0.737169674803096,0.17455992155430722,0.6549653929391364,0.7392923832858644,0.82503345417167,0.8580748571955323,0.5718197484694096,0.1310459983096557,0.6333792144645962,0.9003393253333578,0.6767143494353178,0.9517735221681403,0.9854610152052041,0.8854077266194669,0.11880837944816336,0.2563561013121616,0.8829354372624938,0.5971132953266454,0.056720818234354375,0.10416191359426019,0.7558340013555915,0.9942172698761744,0.30282250000970956,0.47080016734458185,0.3479720980539165,0.3685411899526865,0.32801474165897204,0.7601877088181881,0.7422643838359833,0.4536064461011675,0.37694249714287564,0.57589596988429,0.8512132221664683,0.13248885378890463,0.7461209286756019,0.017795334627285664,0.9466000016158855,0.5329809085082673,0.0643475492972021,0.45524981742648296,0.4601883200746224,0.5288637068368935,0.8469546546818256,0.4590361078181451,0.6984243653402689,0.9430013439100042,0.8764911251294936,0.5968583477506113,0.24838116957052137,0.6355164374191644,0.5811894172655561,0.1529267037579234,0.6902219711202124,0.33358317149016115,0.3320384067334301,0.7436438294800889,0.32918246337850676,0.12845864377402538,0.9646649289382032,0.02979375362493686,0.15440047454879569,0.2401991819394651,0.2977002626407803,0.06890371786818528,0.5182461714667996,0.2501157984478197,0.5771442748238271,0.03330943878457049,0.9550985903194218,0.13688985953312738,0.6381308941299748]}

},{}],120:[function(require,module,exports){
module.exports={"expected":[-9.624207128801459,-8.249305043003215,-5.250407309342561,-6.3872423634302775,-2.294923499502256,-2.1394762737403514,-9.295227614240162,-9.301184534815492,-4.450228546160762,-5.969787217361375,-7.19973146798586,-7.72565475827246,-1.524601608907195,-7.393426885653341,-3.0262008113109533,-6.835871089316183,-7.409316588939006,-10.219078762611627,-4.058681838711916,-9.533055287171447,-4.340419706270383,-2.110498998299623,-6.182350600698868,-2.594626917283013,-0.393890377241634,-0.5422313789199313,1.467940984759606,-8.915858098401877,-8.531980835753943,-6.326098580029866,-8.694002165241432,-7.700783562057464,-6.96542956614814,-7.891240227506332,-3.3186356494212426,-7.682226498258924,-0.7712110967936998,-8.497967490182095,-2.2084213753251793,-3.3307494059799367,-0.4144929558135183,-8.420015054132946,-1.8027868020145608,-5.852118693859058,-0.1909381054807541,-1.1144100351162578,-2.4459299106838857,-6.282723236031951,-5.456163240318997,2.3538104859643476,-2.421248177423969,-1.8227831522983855,-5.338767181665428,-8.451523652824825,-7.236045652275527,-7.301372734755637,-8.122895605754024,-9.852192749374606,-4.550408809651702,-6.089121004681832,-9.342597006302238,-1.3258473680820164,-4.435677443921318,-3.306024425604414,-4.099375177769656,-7.289351897628338,-10.241775997014571,-7.557539923483908,-1.1920401199040906,-4.447959260468336,-3.3126650260974224,-7.685416011872533,-5.066190589558976,-0.435566696401887,0.8468190534265871,-0.7910323462590303,-8.657247810968462,-8.200333613066096,1.1223009639145785,-8.422625512991155,-2.8913964110275687,-0.7336012362294178,-1.4677945846423592,-9.320672578065953,-3.1192662058720138,-7.704002384357609,-1.5912435587059444,-7.632072435627713,0.10339363322724451,-2.39703639485939,-4.988206095974332,-4.768638072779581,-3.542649330177247,-2.725638166067043,-8.710698069428748,-5.042149172441337,-2.5886310890698496,-5.357472103970004,-0.8602926235578958,-8.83389389377848,-8.881750859092854,-1.0958416768589005,-3.326939847562837,-9.049455439455173,-4.912641316614961,0.027190952312057204,-2.4206016251130493,-4.905192115560659,-4.111524983312712,-3.773723240361892,-8.044750644984894,-7.200076607392823,-3.069962279164982,-5.692010275170613,-0.0721174589093084,1.5338259872426216,-5.262863599406191,-6.618692792093261,-6.121620417096249,-10.24724640412855,-4.05654096323479,-5.108696310706241,-1.1938357839460956,-4.155339148423961,-5.996484015864134,2.3462843789401284,-6.8450694936715495,-4.456990641052551,-2.9248311546399077,-7.2775549797590156,-1.3539768778100147,-3.9607704796597334,-7.929191711013166,-5.652174791638759,-0.7454384842710309,-6.4514566461198894,-5.286789536965162,-0.39257593831701687,-5.650983123210022,-8.356944244638333,-6.7189119570220495,-6.433568682874994,-7.5464385689385445,1.4460691316044016,-9.921830153041507,-1.9320438239171493,-5.551898331597876,-3.8271659496848516,-9.346775746988454,-4.772902276938474,-1.7317661135255045,-5.175528647927631,-3.423164321560263,-7.928897063154851,-9.166844410601403,-2.4477881378749258,-3.7583572988219,-8.972057504195323,-1.2726762852944615,-1.4180751013962727,-6.058638097508529,-9.715209240695707,-7.5049049808451125,-7.699653704082291,-1.1022250347597558,-4.039426404228321,-6.491860509332289,-7.081619551590551,-9.009024791938856,0.4645256755701607,-6.621910028074071,-0.6194000225933965,-0.12340478275474695,-0.5619905610432689,-0.9378073786634571,-4.133413659863777,-0.38702527372268425,-5.420896392507467,-3.8215329407393774,-0.5424422314071795,-3.4660482739927785,-7.575860867456006,0.012453431672618684,-4.202763143801192,-6.69356625540792,-6.354909174162129,-5.6065415252627435,-1.0154609826911412,-3.4064224004730623,-8.302833161556416,-5.810390233786478,-4.8537296073447145,-6.437152678048984,-2.709158710004676,-8.3264499900486,-2.9834707441704706,-9.438401805449807,-7.391900091951656,-5.823699398492366,-2.5073255795041547,-5.176471985248771,-1.2146721228299504,-5.801427025777291,-0.04273645903423283,-4.615909092154171,-5.8259181703171325,-9.324276217298152,-2.545815380427517,-9.95090172717912,-4.479900027163142,-9.606719674109328,-5.387204253292518,-10.039371986493066,-1.2674959271201103,-5.467328823447971,-9.269595104577837,-4.602379898022752,-8.74333135899006,-6.205113870478577,-2.8902118848856233,-3.3064192888156207,-8.263105955437744,-6.294039038060731,-7.378272427827717,-6.707766846900832,-7.246436531348669,-5.758310656771489,-2.398017278320535,-5.176750628243894,-5.078475852382251,-3.033286611769192,-8.357235793130986,-6.447669650974481,-3.0189864158580173,-1.514482811395239,-10.343638687409904,-2.180366964119828,-5.543562748383,-4.691808091402596,-6.18320292418095,-2.3653359013711066,-2.1909413877993096,-2.4951950951053234,-5.2961815389157225,-1.0191218800481652,-8.674778250055276,0.05478160031741727,-8.238923092313136,-0.5891638495185478,-4.587498648372416,-1.1621894838234832,-6.015026382025413,-0.5936542165499316,-2.945914801301893,-6.090536978220327,-1.63397690334851,-5.385123890630538,-1.698321443510743,-0.6840639109435328,-5.861742055969805,-9.502331677208396,-5.082987906594418,-1.4978733983160568,-7.0628816900086075,-2.5958506403078783,-9.627234429743666,-9.439602333142176,-2.812518254370555,-4.702668690940258,-10.374918291209184,-1.3874181657060771,-2.95767824480456,-4.710157617676382,-7.755765231870431,-7.617215380408851,-5.5089290271330675,-8.165493271934947,-8.611294898996782,-3.125313708811994,-2.130416935823888,-3.580053287155792,-6.20951694222741,-8.777013797958586,-7.609926209066961,-1.2021736591084062,-3.132998442409101,-5.534285373634932,-11.522118778831722,-2.2061714977278646,-3.983658045383521,-3.1890350813383046,-4.824217041665516,-2.3691579340958437,-9.487226908875783,-1.6957001257806774,-8.555346432028685,-8.519540166560889,-6.787267419951263,-1.6003037254089079,-8.70578934886851,-3.47691662287649,-7.339046838301364,-3.0297880069265,-0.8317179258746005,-2.883170911866091,-4.275140713508263,-2.8690417681962934,-2.9990577826196763,-7.500865932082087,-1.3881103944688196,-5.4038291081582095,-3.4983010422703296,-8.63035330172426,-5.193639285199472,-7.561150827286049,-5.759373625992675,-6.256953133562311,-5.047969511518394,-2.871573165843576,-10.427982529782735,-8.004976462559519,-6.696189207656795,-4.651472251297616,-0.06634702759233854,-7.190010910977272,-0.7038265360028819,-3.0312852606850536,-0.5931219523825915,-4.1487595333270875,-3.5612059641760307,-7.878005541544173,2.330423717903141,-8.919630517668432,-6.738283218809705,-8.337899223160345,0.2995007178922491,-1.3397767647634962,0.3675929871970981,-4.001539489464758,-3.478896597477971,-2.0489631764760476,-3.400497014403414,0.6348446585980839,-1.3007026197103533,-9.187315297960243,-3.7301469974968504,-3.052251931937101,-4.969351167634162,-5.776141314751536,-2.7773407398457373,-1.9385944161349937,-2.513992492110508,-4.4135023639279485,-10.561591730647073,-2.832795000091333,-7.174247829551209,-8.264524772438783,-0.6084449588291643,-1.5921469261232537,-7.362036976501372,-3.5663574844822494,-7.016600112819765,-8.588950934971589,-8.015858991562117,-2.3234879339378165,-2.8921544420918757,-5.967712506384556,-2.045847146181618,-2.522656560338949,0.2661732881417982,-6.188741741828686,-9.739119337257085,-3.4736472633402675,-5.855336450763269,-3.3186524055060964,-4.274051640004906,-2.070821265766914,-1.96313208107826,-4.881189450669659,-5.637727567929964,-8.502106065775921,-9.741464749818617,-10.151080054851265,-0.8302246809533521,-5.404026530676937,-2.37053730193609,-5.506183378971573,-0.12964905122386366,-8.700597771761492,-8.82767062576055,-3.748726374300209,-6.47940623323233,-5.438622378529352,-7.199491784997428,-0.8656546707034468,-5.915150329977875,-0.4162480877590802,-5.380453464738876,0.07802358544234587,-10.191746716669838,-12.117222593209267,-7.35904940587767,-8.507597681268503,-6.253759725646005,-9.146686891601325,-7.000561021792227,-2.785449281780179,-5.209661059203153,-1.9573437145659396,0.24214130105757137,-1.0547171950052348,-5.5022435125109395,-6.154898639135985,-6.28816006360916,-6.79098902474451,-3.2727170177495024,-4.3608556876935,-6.800496404750287,-2.3556574835814423,-7.983169903499537,-6.59376345617903,0.48022762065689495,-4.697024656818034,-3.440525781558325,-8.563900640784322,-1.0509041273087898,-4.3925128509536115,-7.013660913996477,-7.331802881694813,0.32165091549103686,-4.671820102145906,-3.293929794079605,-7.048159467213285,-4.81073596402074,-1.0398463581604298,-8.583578214741491,-0.8334060921305871,-7.064638745617184,-11.762365782969278,-1.6633903500301446,-1.8132244168449438,-0.4317598947134027,-1.384323989083938,-4.484968646466619,-8.497898568940919,-5.1845542725147915,-2.6001092088235724,-6.932793927994533,-1.8382777383036775,-9.627852397671038,-8.520662650646177,-8.153623310232353,-4.146113523779756,-3.0898786935607303,-7.179666520942623,-3.814711528486745,-3.1814552761176556,-6.4944056591870964,-8.104756112400072,-2.551786770102452,-9.518776145507218,-3.928101423660473,-6.377019235165857,-8.334362079432026,-4.711233283710792,-7.549131095347387,-8.754430254634883,-2.115578073718301,-1.1239697361394962,-1.0128221271688684,-8.135971161998974,-5.827013076175938,-4.3147218384575785,-1.7063274124937724,-7.99745959116387,-1.1752916073667357,-0.3649089336700392,-2.3027140003539373,-1.164922191280525,-8.790824226695475,-0.5824412837147164,0.001386258821058554,-5.736970428193677,-0.41161763683978836,-6.2034311152779535,-7.1600464874497565,0.00011771324687392734,-0.38556872467967496,-0.8073285180417433,-0.6051770533580159,-6.817538327203945,-6.093066964547368,-2.052532590988999,-2.2997438146667495,-3.45844788693178,-5.33467672080668,-7.16658632989798,-4.6884639787007805,-8.241075637721348,-2.545450278693945,-10.207888861863646,-2.5391915566624457,-3.6180987867691883,-2.3296526007675347,-2.413149446529129,-2.227844741139065,-3.1761010479187783,-1.7151870914374674,-8.223079122140842,-7.040088392695209,-6.327200405216551,0.16107112916144845,0.3555125341331431,-4.702524165362557,-9.960810720228725,-5.287461206111368,-7.820561837265444,-8.77681683099948,-9.97854282278436,-10.450958963704444,-10.244445649382588,-2.986305185915069,-8.006032401388293,-7.982088867178297,-2.0010959738779928,-4.67089744297494,-6.883234183992994,-4.637491382407802,-9.096027645559854,-4.558596272308145,-1.3216758518094855,-8.017234658233015,-9.607475979139792,0.2844360745749107,-8.15880845105757,-2.937550655348935,-7.5770317897236374,-3.8165237836792687,-2.759208461834659,-3.371757948238617,-8.587863636816621,-2.4799878520270755,-0.7874876358581979,-1.4138546198327928,-2.290024310851856,-2.733482092067204,1.395999721696477,-8.655060107537281,-2.184797877615502,-6.221534730535023,-2.0898406086133896,-1.2876511681778404,-2.635286620023405,-3.383006610666362,0.30940642197900403,-7.0344690868325195,-3.916990157099789,-1.2462914759455739,-3.5972157646599268,-5.571677610809116,-6.023535081129943,-8.442338756209,0.1571040286926983,0.311549227386163,-5.779127174506046,-10.359942152071731,-4.6034833913988,-7.995958566921763,3.773133303731788,-2.7186226730151026,-4.607597845552179,-5.445021941418069,-6.07424523280199,-1.887542175089957,-10.212719173047931,-5.571024690096177,-1.1428530599473388,-11.164403169124846,-3.237459318315544,-5.171457261930531,-5.208081615620577,-8.88745300225162,-5.431182327611042,-8.29783233894395,-6.151030470341034,-3.3729104637622207,-7.197557678915927,-2.378701102383415,-2.9796066013357896,-8.335259421868464,-9.525830534399066,-2.808138663442461,-3.5121352266232413,-7.861555699808367,-3.907362011481407,-5.144935289970492,-3.2806920322483055,-6.7055679504488115,-0.047497321192430525,-3.1462787371807877,-3.1414548854057287,-6.665682179417152,-8.869776699674643,-8.910544871658033,-9.614945764437435,-8.783955515513227,-3.6325556027698718,-4.741210549589107,-8.960164385435366,-3.4380912346800274,-7.245526565096096,-2.5606272188178325,-8.652059709433455,-10.48689832757208,-5.091519331355964,-5.719739025568357,-2.4243055631249883,-3.485263133380583,-1.8759619253699897,-7.071992670924303,-7.560665335536052,-2.2682290430569743,-1.258396983548896,-2.4334007012834613,-6.4250818912125265,-4.300659346222936,-5.189223964334231,-2.625555456160865,-1.378910493575188,-5.579365054738843,-1.6148890368934348,-1.2088441047400171,-11.41339086616323,-6.392477385382863,-6.157540632373442,-1.3884995124829669,-8.420522691662764,-11.564410835190085,-1.4094711253607852,-3.0942068716282227,-1.9202372032620585,1.568146613696926,-7.102265288642098,-2.3980360439402837,-3.8389924022015482,-5.353384418330018,-3.7629074560216313,-4.166246998229161,-9.343411196047871,-2.8500172639111545,-6.551651794646604,-9.93040822999376,-4.8954064386594425,-6.749798819155526,-0.8531955665943425,0.1532815028095743,-3.452915965152791,-7.269035141342535,-6.629785418981072,-1.5206078387868895,-4.507713784558334,-3.6750488857188186,-6.306670039554296,-3.7022112080419527,-8.774778501882246,-3.3105324633555506,-8.50342842343843,-5.4726282521677385,-9.883417438819228,-7.23219302663649,-6.915375621480255,-2.0593935985766354,-7.98125272842617,-6.66260003438661,-6.177282768395401,-0.09361005731438052,-5.676371434531673,-7.597666195340405,-2.5886073582570397,-8.993035381417954,-10.949973236006512,-3.5607337235313117,-5.800563034075078,-4.279131864256905,-2.813160299030761,-3.162253322970174,-2.6903060730100514,-8.52441445224324,-2.194727455429175,-4.106348784024245,-8.056688327207771,-4.9685073357797,-5.047491222802144,-3.8990032782176822,-1.522883263634403,-10.246690081678324,-8.114573418417685,-9.995642834293605,0.7736993639581082,-8.250087467204702,-6.179866646455077,-6.486202409436872,-4.7237732557163685,-3.1738812796615816,-8.472878848465113,-2.8098121644601894,-5.917238867912909,-2.9125485366030297,1.9156490311455399,-6.529595191820874,-3.7592649653311945,-7.244125759939832,-4.6694054015581195,-5.632509061831982,-9.376890847986584,-0.4520510154300298,-4.368206636347195,-1.930498284652116,-6.258101875485522,-4.972595768833111,-5.046061680165719,-7.190632681186992,-6.210655870352557,-3.492781660791573,-2.044521871938075,-2.402897836047412,-8.79107813600917,-3.5286537112117893,-3.4522131008935473,-5.134069363478465,-7.262225242662686,-6.238684421103917,-3.1386814903896614,-6.44449197919697,-10.81243005723917,-2.4721851709783182,-1.3660831248918897,-2.098376274105787,-3.6531364706837266,0.1760339196485125,-9.867492769780652,-6.392166478009116,-1.3993945627733657,-7.433266326188621,-5.924372569473189,-8.866940639858052,-5.862617472090868,-0.5875661962911635,-5.747644014636363,-1.6981385742636101,-9.154966127395372,-5.207319209970018,-11.228222998128423,0.2201842708065464,-5.1443061581917675,-8.500861235593138,-1.223445131977188,-1.8549270022036977,-2.1003020766410527,-3.4754179864107457,-2.351374716389902,-9.497229188333078,-9.747716048996068,-10.119557364493495,0.24708619350951294,-3.4188656173850145,-1.3327945534120245,-9.223584659142723,-10.256901445665063,-6.949692563819958,-2.990059677630268,-6.230586808568564,-5.4974566990021625,2.1380457972328037,-9.626400169192205,-6.6237549353378675,-2.5759948603750233,-1.7212868773133818,-5.334116565893689,-0.8096438912911905,-2.5363738307295405,-1.6965650727693533,-3.101963383021687,-6.426466841324537,-8.113929596050317,-9.086567536647772,0.3592653690411908,-3.49371044029328,-5.302960680693152,-7.885004882970774,-8.386987888911841,-1.3615644240792888,-6.961239889434723,-4.115235947659555,-5.805538001985395,-6.332201124367753,-6.834619639888169,-8.631904605364602,-4.157322735426201,-1.3236666393882233,-1.6555822033564738,-1.0331800559456088,-8.931106963337665,-4.71772920951085,-5.194843333394634,-0.5798465640254313,-6.559907408050554,-6.971516268519885,-2.876758999672504,0.3002528584892524,-8.612937056665023,-10.523170323464155,-2.645018683351476,-9.42066175805708,-9.849596595761653,-1.8415353192930173,-5.122571015822366,-9.348972409167509,-8.655878670710322,-9.86396517519087,-6.28168618263812,-2.7879664377517943,-7.520513192867071,-4.144885068258668,-3.0889294765855944,-9.666383162645094,-5.363664454780798,-4.376731132408745,-4.759577723371267,-0.31265381373643675,-5.280907036626159,-1.2731304420261784,-4.565013909762586,-7.318027936245433,-8.251028689769395,-10.822033191021022,-0.9143301692971941,-4.275810639921245,-3.3979877874599262,-6.098273122453478,-3.3215734938197032,-0.6159947116804703,-3.0966006800002956,-5.630786543598566,-5.794053482083125,-5.315514764212894,-1.3026393182272127,-4.9135535725780635,-11.054533114717152,-2.7501758841985957,-5.016913381903622,-6.021112949599937,-9.93634205399212,-1.1989258792703787,-12.071197268154831,-1.4248282229119642,-0.8151180127053448,-7.487827034283893,-1.8078048281576677,-9.679923317018098,-9.41277715017451,-8.00091777890178,-3.2655517958498206,-0.9829307341841879,0.7399617626214255,0.38245974826945267,-4.054606967208595,0.06603337796530745,-5.935820056933934,-1.3137535598282541,-1.9931336062497595,-4.885826224838457,-3.3023329053288766,-0.3631055124695598,-4.715695869668369,-7.530032273867208,-7.954750640347845,-6.800703360950118,-3.7058515229365554,-1.3034539555188216,-6.453894628581401,-11.591205955191088,-2.181318179689662,-5.625346195868476,-5.873839358262438,-4.1856633743560305,-0.6504050140078289,-7.748197697048197,-9.969156808155148,-10.092547103670078,-1.855007577829114,-1.0903901995127776,-5.348792196880118,-3.969777959303198,-3.7656234346740103,-8.365391429613833,-2.9208821162859673,0.08797657733457004,-5.173376678754943,-7.965829994888651,-3.751104760660052,-10.558506892075266,-0.21035981953701913,-2.1867864795990846,-0.7106312916727927,-7.96817790482973,-7.895279906425779,-4.561456371033859,-6.512480356956155,-0.3053516427625989,-7.530272562085782,-0.7516218677122148,-2.295399532518622,-2.357599167639923,-3.769796239503732,-5.031560734535358,-3.416003956691468,-8.039388686528078,-4.7769422413912626,-2.0391336195285428,-8.818298750435135,-8.791090709188536,-6.584061328313934,-10.6584010949666,-5.673737234289872,0.19411064516318866,-8.334147144051098,-6.342463914383719,-8.269292094261028,-3.1913763368535806,-7.4089796083526265,-8.777370944544302,-6.347021512414134,-6.584532572361909,-3.3769723535868232,-2.486193814797438,-6.845201339096587,-5.642222544626229,-5.759266930960448,-1.9789545350384126,-0.6607476213414256,-8.119272614437095,-0.22689264731700437,-7.079940640031139,-8.792620689430525,-7.238250175387552,0.8181759382541882,-6.411439913341075,0.18420006486702276,-6.149158904002143,-2.108611786145043,-3.3799344505951687,-3.2402646526321974,-8.55812166294904,-5.500811338719368,-2.317855799542561,0.680920221689836,-7.5422299026335615,-0.674763658666587,-4.550010939148176,-2.3327336455192986,-0.8893487411305232,-10.218439877286574,-0.4839130308523585,-2.6247860521963564,0.09134768820276469,-5.368582427923112,-3.78042256647859,-3.6675336798975593,-4.758524740356476,-1.3319802965172207,-6.224686242253005,-9.194133355920979,-4.546709700276274,-3.2022603592048666,-1.0906966983101847,-0.9288424250313446,-7.221718873939034,-7.99044154254671,-1.3253058934595447,-4.125493974982634,-5.0033686439164935,-3.159306116260412,-1.8664632404808628,-6.084784987992571,-4.201289834522845,-9.509313956925055,-7.67774745477342,-5.593470792539386,-3.6375672079548886,-9.260479895472452,-8.616299054431657,-9.379483822788195,-7.210153062176767,-7.584622483798818,-7.682090459076933,-3.244905244253092,1.5239663908061427,-2.9236760889160287,-0.1982449634543081],"s":[2.835970006478804,0.15635674783485265,2.3335907188417337,4.452202287020858,4.269543597284678,3.540462446241879,4.430155194489566,4.405288955015221,1.7874779649486805,4.533413728613947,1.2208982174846816,0.5712100715591462,1.212502655879093,3.9215695195147093,2.7224892796852895,3.17760191453782,4.668249317284149,3.3918772754430595,1.2498370484846977,0.07672583050169823,4.235312331333082,3.696678557901306,2.279215545032016,2.287435223302001,2.571741829128069,0.3464899328540405,3.533130987961991,2.579568523854049,0.4039814015025667,0.15193174016043143,3.0234698756576153,1.7225267440438485,4.726989743910863,2.8405247756956022,0.8852480671741791,3.1862737910660357,0.5806997930662072,3.0174544259393645,0.673638498525404,3.380051110920579,0.520892939857982,3.790574685097703,3.5130374038514023,2.4025217816609787,3.843986849581351,4.2547326982890805,0.3030430193249922,2.0191106663393144,2.340097596807651,4.681842293145669,1.1931673615728011,0.9036984866905229,2.279176319059019,4.027651477574974,0.20802964581417172,3.6337791957962082,3.9394463755229534,3.6536172926667887,1.6127265225856402,1.2423454092426955,0.3782266059475359,4.505147710681304,1.6420636115806209,1.5812083642862762,3.92997444878206,0.08009682562960418,1.73500179652473,2.669568699845193,0.7811552407927225,1.804590669216981,4.897279226506775,3.7813926613423288,1.511104282632636,1.7439209314634208,4.995758393960557,0.32489177781734324,1.4615019091605452,3.041232960183792,4.555557759286167,2.6065741710774084,0.5143940448039375,4.844478289563501,1.6123045884372567,0.838851444064046,4.190687029709441,1.0608371122194737,3.5061576851143803,0.19875813688676303,4.375543370441973,3.4577540851379274,0.7188348071329609,3.7095213733132915,1.162358122818764,1.8086022043874328,0.9734456929879931,2.849145797057445,1.524628290562674,0.6098297503286787,4.359617807314102,0.9988033980381561,4.765587544279085,0.13990711801044609,0.5842898191828183,1.1185428315107027,1.5302512240763155,3.7241192137224166,2.111384372885418,1.891732633000538,4.847629237608572,1.7825876907739624,0.6233256821724942,2.4074837175726858,2.1960061785064666,1.342887867180531,0.8458995018045268,4.702590593850599,1.56531785095682,4.706869342970226,2.53290898917896,1.173776317124795,0.2381759973075126,1.9275958287139339,0.23275452059061008,1.6234549665418296,4.749388937450625,4.011477316907066,4.606244714810842,2.3402744872594825,4.190498900649548,1.6697415547220995,2.7415511067493723,1.4609669490432464,1.3222775964982125,1.3203980215702116,4.880083851744602,1.5582819126295122,1.2474168800067786,3.6090134631824276,3.595473597147605,4.478841466514646,2.763989170206469,1.7786100499410762,2.400251712825996,4.500202855030505,3.1118599787368773,2.005672022887529,3.1705609119131264,4.970501929785456,1.8958087741346963,2.844819370937499,2.646721891384657,3.1170817901018957,4.614939896573331,3.8286277348769215,2.884481228145841,0.4594612059966263,4.697566275484846,1.9749155206675106,4.6142894220876105,4.268174628445217,0.05494453854996584,2.580353520759162,2.694538751152101,1.6694079252849037,2.296359794345987,4.899899652003032,2.9277442486898986,2.8401448539770247,1.8859644285758892,3.4729553044185146,4.882471414843507,3.135929035996785,0.9721299787169313,4.123281871744186,1.004713963162035,4.3980310894855466,4.421771728796388,3.737625376235705,2.7897313080139408,1.3007659482072587,0.8384642714120472,1.8003319809152618,2.8558990262180584,1.2580437548420875,1.9026408368326453,4.03443539859132,4.172854705344901,1.2567926245905392,2.839959019406347,3.452274513897311,0.6553939737066772,0.5695052817156143,0.3566511145313722,4.69711530506528,0.0294406442299755,2.203979041489812,0.03775534098185651,0.23483108471698766,4.390439280404371,0.1762077933723083,1.9375784500548776,4.445905015877604,1.4954245627470741,3.7665827382093333,0.9819939938636901,4.064687639655141,2.3534890342599835,3.6482718543117585,4.268780234414661,0.5663056783786802,3.1975879747947578,2.096899103621502,2.666783672949462,0.4950347418561962,1.9449197212735603,4.915519065665219,0.9814832674096485,1.9271415279410609,2.238763639809336,3.6574277277998046,3.308788020415485,4.071439692387458,3.580997689839399,3.6307621476635354,4.878552984083436,4.451927484798517,2.957647842528557,4.092471771052778,4.10459275339193,4.165734151122117,2.7960301494526396,3.7403545130463822,4.869780067235517,4.096310076046209,0.2720336778763188,3.2832549758938367,0.7684762729967476,1.866635843787775,0.035141631254527184,4.374967288268602,4.028339237605817,0.843561661172606,0.7134196214565325,1.029140816620877,3.86188279156658,3.523419395160554,2.4850893140216304,2.5867369267299023,3.1139026782670767,3.5239845162803087,3.0389372395564482,2.2809090007470543,1.246547840951715,3.716398244057666,1.1755220644518638,4.950518152867871,4.678188562628276,1.993229512958009,1.5161695338097791,1.4969508195711068,4.261888269799935,4.337770295376448,3.070571263169982,2.8729984343857895,3.357062250856042,2.259765410784901,0.6262043445898424,2.831614391156755,3.2568124696082634,4.751948021225094,0.3473291601036488,1.5855777092406798,3.143022502674512,2.3228933245160044,3.375514999925562,0.1119379623400385,4.3888055544152325,1.8421199805830069,0.4935289329110737,4.417189044004086,3.9002968231638135,1.6398475961830528,3.7927172845145964,1.1641763594531984,1.3741192992593043,2.2060612346476893,4.079483311309081,2.367634432422637,0.9856861990808841,2.09290569620731,4.472225196052361,1.0986044676248796,1.0200485318413988,3.2538255544396986,0.8476718610449008,4.871600895942202,0.3766324472552651,4.99765758963663,1.2983448490385086,4.87685875641418,4.239224785066024,3.745222798806923,2.963247369505323,2.364504932135454,0.5374014893240175,1.5653680819022309,3.6552217585148994,1.7067986863783158,1.2002558512891193,0.49763239371162227,1.3803962099192468,2.8633071375481367,4.035176802754639,4.029817953921655,0.9758846200556726,3.0615181914608405,0.47994936216737893,3.361826143791866,3.002317576999128,3.9380868450861595,1.727512087747376,4.003249611192606,3.608919519555114,2.6498636636254016,3.957245974652399,0.03625575353373156,0.9536391065766481,1.0818094024437663,0.6163885949468839,1.5617850991403048,0.792343083082343,4.463012330209853,1.0735859296343353,3.0238542161938122,4.2045837698559705,1.8265303543749511,1.8825631920864072,3.8321046960891794,1.5400093434954931,0.987860460548593,3.664366632004347,3.5572781125362707,4.026103141512118,0.6471601844979591,0.621815839805544,1.3140576778921853,0.3240017289991737,1.719710530416888,1.4085803600917157,0.31520762027036464,2.3448338592670326,4.280074330129304,4.914737866493581,1.6218508030217138,1.3635313301909446,2.7450942535707226,0.9241191930164672,0.062372588033773324,1.2417773417210076,2.1652889347237734,0.07873854972136773,1.7958562953932677,4.68108815208409,2.266893480782487,4.915628076566813,0.43143331947975927,4.806769471202893,3.0266505236284513,0.13502125824791156,1.8435977420395222,1.9064534717262072,0.5145523255886186,4.36725206648023,3.443907141720961,3.926540792891985,4.739349321948594,4.739618891459575,1.712302191171171,0.3908759482611446,0.682676282495176,2.235587424707842,4.402993716009412,2.511362051238908,1.9555570504051545,0.16869306100062542,4.893226281284941,3.8350389298810628,2.4752265740233668,1.0991447339522464,2.045269303925444,4.169755716788571,2.1164315011409185,3.9064531692190374,3.9464748120856,3.6785140853961695,1.9896618734193339,3.7187581476436926,2.574988003288553,0.97061089596575,4.968214342820038,3.0028635728985553,1.7949486912406343,0.7278261585980028,1.2849758879877804,3.0803682303319913,3.569431548739519,4.370986064967676,0.7118373622862306,2.320357433304625,3.8840970819688714,4.525518639838225,2.0981641607940893,0.21332825223868368,2.9178494678137845,4.48826601852177,0.142208803346896,4.054356358439763,1.509542265057734,1.1389214006804316,3.092391097331917,2.4196971021553626,4.160352966459563,0.7318586526015347,2.654877309005644,3.9421033090379733,4.299600369903648,3.9474398667839496,3.788880196767088,3.2497118087866186,2.8113928008586386,0.04230910096213014,4.744464492127739,3.139655460215921,2.9129189071846495,0.044396555883565725,2.0421541619687797,0.8352785190532308,3.88902626881828,4.38514120956576,4.180549766549437,1.8926497273463383,4.653045200679391,3.8199314377004248,3.5839354087037956,4.569030782481417,1.6732667969310255,0.886143167393908,4.781369332569141,2.044425772219588,0.8109084361661711,1.8898938733538884,4.405775982065208,0.8800045788278121,0.6098244799929553,1.2915836908562206,4.948041455384015,0.27739665828608984,3.7327168615844397,4.980014656484046,3.666164576815303,1.1555756869587608,4.415219622434395,0.83135552049031,2.7202095726339137,2.8799324539694924,3.0537509340026956,3.0898892455935023,2.1093950015308605,0.6535467701880227,0.9322416065177963,0.7354450740929042,4.810863387025828,4.482373983044937,2.1853237504873837,1.395831752332588,1.1391163090925183,3.7086113679246377,1.808773325627897,4.270320263826939,4.899669541637813,3.478878373100327,1.1664467112097365,0.4725017555356448,1.9320678403541258,0.6466150409283633,2.022807726118254,4.162829129821128,4.484823097811913,0.8104690160188566,0.8881636968363738,2.53556458941379,3.5258197010181993,2.9880996649340377,1.3461399290234255,3.4996290353069304,4.092061985475048,3.905157875152472,3.272326300958739,0.3358761997241311,3.629383927309192,3.5089737369642426,0.6504568018026236,1.4506664561499127,1.897519575478488,1.7261945082342411,4.781647844155692,0.6920889122711582,4.5281952701135575,2.476962462446821,4.034099581895596,2.1452853830435648,0.7060411129167543,4.908173135705262,0.9118920379115891,4.316225618547255,0.5659928168444128,1.595914641005326,0.5047787000990134,4.649986631832998,2.106296019352416,1.2995618920786423,3.0855761842358618,0.09581481829585625,2.1054837838564167,2.868181739571325,2.314372519648348,1.1436386304832535,0.026390353798056987,3.847265679356835,0.33872754046046616,2.3403773187641774,4.928265316705679,1.4838537029552779,0.6486230444089114,1.7397217638503593,0.23337853789139884,3.685944746666231,1.333794246853428,1.2368990130953073,0.8706625038888993,0.6275791870647773,4.309384760115388,0.6308317281673625,3.784190661446669,1.2899229166544468,0.9330704870980955,3.312010696914255,2.047082020567487,2.8001853957274614,3.2605403303125033,3.2194462224800335,1.448541377922955,0.1746403062269397,3.223435665103742,1.290150541952526,4.384457182739671,2.165737227241913,3.376185368104696,0.6587872829236963,0.5272651512957904,3.6890840837908048,2.565349569745922,1.6247320530499354,4.524935711794024,0.5501089978913498,0.5362603580999192,2.0599485644858007,3.4510207918916613,4.950775124526868,4.394704242136735,0.39733295912212085,3.5364041957927816,0.07048511869279128,2.7351936691012635,0.8698842274945773,2.4413332913299546,2.375498068464401,2.111717454208283,3.618370921234022,4.423057661924263,2.808220087215477,0.6294753572790723,3.7786960049195484,2.5468638775427666,4.171014516143651,1.4213187009807937,1.1452644431776704,4.60866162180266,4.419840807698796,0.08510675402659929,1.4792627887074683,3.1591291373351504,4.519894849853642,2.7825230905196205,1.5364826259177422,2.5528907916515244,3.1974609105609586,1.555831157933113,1.6770534280744087,2.503565319208483,4.594151599476874,1.726510338347298,4.654125606177191,2.522309396622205,2.637169096624592,3.132815603120056,0.3725785160608319,3.8397493459119736,1.6253260542679238,4.56025332649176,4.721418320143517,4.069345240989559,0.26957864864380676,3.549011676176288,4.670652027051373,2.9389039577684772,4.159214033828951,2.9931193018875124,2.8589029377155475,0.8165798213353803,4.150175093309175,0.3129623609479004,1.1579532349512422,3.2103929980571975,2.6208496683087477,1.718935882439241,0.9587924293338734,4.683040289119554,4.620351197917473,0.5958859222999535,4.518254193432457,0.6789431268968416,4.1847459180382796,4.727656596509512,3.6988303859654525,2.163128969438053,4.916672764124291,4.6599111358287795,4.467078892310773,1.294227013850665,1.2897031551861537,3.837419721897896,0.8902296071288596,0.5370996720947174,3.6831788279318323,0.38314259465424216,2.390370316011788,4.615614502061563,3.249545110274271,3.1399136644336068,3.7436881179298642,4.6680460347327655,4.308765151680766,2.3548304529423914,0.9629137711896041,4.669702186868324,2.8484182624982592,2.2156299090408793,1.350710075829712,4.878650922951754,0.41650976713892063,3.2845846065648066,3.3721452802734273,0.31363448294491114,1.1305842813044797,1.8382413079572957,4.526987249354185,1.824058617945411,2.4539253374316794,0.5416260495636394,3.1367866538811806,4.184721292253242,3.5377857498131293,0.8252538277521371,4.743669760445006,4.278565717184866,1.2684693916873846,1.1167398549062446,3.2280709656778948,0.7268437613279255,2.7958368734265306,1.9671731801979808,0.057728106832487525,0.7558093646343866,4.574583852966728,2.9763322205466225,0.3891387102067967,3.984190190354424,0.948500654632124,1.6587179596493673,0.3889601871089199,4.0410822547289715,1.4697501300754168,1.5541066993743824,2.118676120919072,3.494316128074,0.20326436335506015,2.052367273235797,3.55778055681637,4.360702682586824,3.4812683695816196,3.078309027367089,0.5904725097057828,2.036577170963776,1.6794320043302968,0.7461337283168046,4.55200039164289,2.7755659005135334,3.416415299087584,4.143754682248495,1.4833239131581677,1.4495893559608897,3.435326973290712,2.0218092970925183,3.8673270501634907,4.650537149668979,0.5304617717270244,0.2205838837885743,3.859646374672879,3.3588703690827204,2.809775714228566,1.354192431166591,4.6649137441817325,1.1893838920992639,1.1299858363847126,3.460014977381898,1.1004713476139716,1.184989580634841,3.4135851786869598,1.9293660728457807,1.5741067712477108,1.3839050577891643,1.304623177702181,4.568756245426872,1.7426400273772058,1.143092293171537,2.494121668294138,1.5262788821894169,0.8532990448571209,3.5910103898832357,1.335384252670918,3.23898576854603,1.5492075043043085,4.759414037246319,2.8930998595942556,0.478379281328567,3.6836338480935216,0.2576267962579626,2.6168071507121504,4.71687705601145,0.3271957023744587,1.110295635162798,2.372500468710703,2.9423568221170573,3.1938863162287277,1.8293549295348477,0.15489215853576543,1.978719769234294,4.074847158534485,4.851333726454589,4.6825913025898505,3.3597108494940198,0.6970444613064108,1.3957615216342545,3.293555728498898,2.703827628761074,2.8187340818098203,3.2442406566803106,3.1721637357141708,0.6539833660837935,3.623474224130776,1.7575682568417916,3.5883680806080855,4.961591816758344,3.3177887957827124,3.1659298506160027,4.4043916921120125,0.36408388181738194,4.800350689328473,4.123520724850168,1.856826134152797,3.8977892559194727,3.6642331114733038,4.715962353320544,0.6196072745986703,1.4277682837384675,3.88466836128309,0.6622916345763419,0.6050116094344482,0.6410647497784994,1.304394589187845,3.220825446344021,1.3713827598613126,4.497421215798012,4.681819579363948,2.99850256346077,0.7766352223676021,0.43201626955218453,2.1234926620184735,4.9651317558470645,0.09915304557781002,1.1178516843177455,0.622701562626855,0.040543152169751906,2.02729294487348,2.6092404874196107,1.6070925133993907,4.666421137983548,0.35284733501090626,4.540644321712789,3.1157954219607866,1.3976075448233893,4.270379010030149,2.14001218455661,3.5300950516571405,4.304965897353571,4.8125414068879655,3.212204593225809,1.3460069161125965,4.614483334018146,1.1393688397198543,0.8723420440808227,3.839920268686039,2.252570983219261,2.649783336929131,0.8897154589347556,4.318775761335232,0.2498913860660057,4.402312352546516,2.9063630404476792,2.4210120756167566,3.0976937595313925,0.9194073779486334,0.7596106698898952,4.050123741898815,4.8470338656752485,3.4394165737276747,2.6507286138473396,4.3851416505885785,1.3320566878880469,0.5843507814470139,3.4752142286631758,2.2098350949946113,3.6378337603419575,3.572501067274989,4.628768132550337,4.790307995705213,1.0808861058820918,4.814792476682825,4.655355768685151,3.762769237261666,1.365738906268974,2.7399230658601157,3.891259680491527,4.962509528753774,2.929372909549005,0.14659177122434142,2.755998929105181,1.5963430372879905,0.14394241890738346,2.968094607942456,0.9833447589726629,1.099358526700388,0.7844011467989798,2.8157830911922876,3.8383639672091596,4.102692795313097,1.6304994011775709,2.2290569960488216,0.4891736673905589,3.7853556697516346,3.2540229069409907,1.7034638459198859,0.9024589547964479,2.9616461524667237,1.2121097192038477,2.5967816949264053,2.2483993005504366,1.3552767932615306,1.5268360463568886,4.577371150005055,4.020471160847877,1.4158628099815462,1.6121554426630302,3.553883458066612,3.489837661006383,1.6215197807227166,1.9810808282017678,2.9459933866757435,1.8287163984206722,0.8222048884678745,2.8975943122946712,0.11942995261874811,2.079740339933418,2.2378356719406978,2.7524523899730857,1.7239043286219868,4.005410892640192,2.562444322737818,1.2719076275425223,3.3583628961536127,4.202372608444959,1.2371679485054676,2.067343717566801,2.334993110382808,2.5661625157302446,2.174062648183713,0.934614406647849,3.5825161612664393,3.6752787660886312,0.24971732706044913,3.3967576960373713,2.32109855258975,3.5452950979291096,1.8858462743065907,0.5033325417246115,4.519153502296364,4.985442815967122,1.3731831048604537,0.6169288682400065,0.09824039969949294,0.941858938387935,3.571827705227819,3.029000934608068,1.4205235134865168,4.174380840125772,4.570023117760468,1.454585686744454,2.7961677507363136,0.7678731733857314,1.245181011033003,3.6168707086627605,2.969994848619427,1.2153353079620466,3.559089135134137,0.25998981315016323,0.2944551193329026,1.9213101696319057,2.258625103828198,2.723773307340096,2.0667176689686473,0.24531142920215854,3.12699793568913,1.5270832175053206,4.8564415572626665,0.7194247470982185,4.027693108347989,3.4546899226695538,4.194038799890169,3.0094336638551287,3.3600919225886896,4.609942560363015,3.2837293483062213,2.424442985445223,3.187088770801844,2.3303905619902885,2.734160904180624,1.930909872429648,0.2618640575386244,1.2139049959257242,3.068765747304818,1.170544741935522,2.0197669257936712,0.3970944672981791,4.619791549603256,2.9307700320043506,0.5208942920785486,2.917151413286109,1.3726420022583774,2.4472194214915763,1.4118887743815745,0.3002186728662193,4.826117690035751,0.4002206963333288,4.023026174743849,4.184901567997208,0.5919973817978574,2.2527826153317165,3.0410020813062744,2.6518407284697543,2.952846792781333,0.9138376472513565,3.466464482600516,1.9292960462628272,3.3657135589659584,2.34841043614616,1.220269186229811,4.366493694002368,1.0213581477213363,1.2706810445359906,4.910629761684532,4.292376494751569,2.409062836860322,2.824407763784833,2.961310954350358,1.0002659632055022,2.895948635968777,2.744980884810364,0.14319057189728146,2.7309352795879516],"p":[0.42585412648693444,0.45649612946610585,0.17944326006279177,0.9333269975700444,0.33179746423694145,0.6247662923817339,0.5041274400394653,0.37671665923696107,0.34786180557243074,0.7831415528376657,0.06082958934732585,0.8290572006706547,0.800638307248897,0.07768665931611474,0.21283027492614637,0.5132262623697961,0.3390082119697091,0.06080141284443408,0.18155569697352814,0.46266350861099337,0.12190663183088724,0.692772958589496,0.664134857724918,0.6667018478322861,0.8726457384319173,0.6217710909355987,0.995758927022677,0.11649141919818429,0.32633087789647,0.5286478395057734,0.5945367771980925,0.13715934214837455,0.30006787790457246,0.7794980767956432,0.14203515147996182,0.057141185929135085,0.3560367230226642,0.13196663157308564,0.3111811886789222,0.3033585703331949,0.40397876916259956,0.5021957713674381,0.11421395364445464,0.938886621836831,0.48951210223025554,0.8783340716166383,0.800320886022017,0.8434850362745492,0.3994714966670312,0.9163175990694332,0.01749882726829277,0.3201811398248997,0.7678947550585817,0.7045415422263734,0.24758364185457804,0.04183543327819894,0.11781484963261235,0.186682926901943,0.6380342742538931,0.5308595164490304,0.518724609232559,0.9037000294453976,0.8849802487456577,0.32976976745963316,0.3647320243694925,0.7206312689251098,0.291512521808758,0.09165085527879469,0.6903907419127526,0.3352833190513824,0.8352323265647474,0.023866711750928582,0.757937728615869,0.5580869805550825,0.8562581641913998,0.5442899530676106,0.2157538490494566,0.18643031813126232,0.974011340603099,0.6692711222161809,0.696802472148532,0.5709909320119086,0.18655231769481828,0.38314395471910245,0.35261124488893913,0.0023321754954148677,0.9744569581310416,0.7039482241950421,0.9509438713470979,0.9637639792844206,0.5975834991731903,0.6329199088834463,0.9728928162968189,0.7964398072073844,0.840200506143207,0.2672400717020673,0.7374802045593116,0.05489564717029838,0.4123920725205692,0.2180497830653545,0.08237226393739983,0.531292481145055,0.5419313426085308,0.9378893262838648,0.11685791580537885,0.9121027029807258,0.2873327918451123,0.006212543653837166,0.5034403989410199,0.4243846633439643,0.3397215906949933,0.38995331482128615,0.2952419355501976,0.16259574082418227,0.5822712352880641,0.9389019322674019,0.03995122595576506,0.1927674612068344,0.4550542756340126,0.06817081137382974,0.5432951026834536,0.9385763985084761,0.7691112813813192,0.3678727428090083,0.07277738336333117,0.9863675915166881,0.15507805995631752,0.05877162681567194,0.6033545068768034,0.6032477537515581,0.3811515102815084,0.8971780825540174,0.5370454497298476,0.9701941175539861,0.5565547038134848,0.20381799404787126,0.6265035609325813,0.4756196267451822,0.18833114601609457,0.354084678479877,0.3862412004039486,0.22332580430432003,0.43252220675524833,0.985134758719284,0.444705228210839,0.9678719895474002,0.7000177170137416,0.07260769913892484,0.20071805558700562,0.1975037778642703,0.9235993124330344,0.9748635714999794,0.9794835234902544,0.7446929872848662,0.6809175463651069,0.7800312339084907,0.36762065284495127,0.8212992929578222,0.5322113583160235,0.8418562933260492,0.4750761915986206,0.14721088901059298,0.7381823233867637,0.02926632954236097,0.37258931739882395,0.21959060411857445,0.5959913269758377,0.16757684953090646,0.8433015410071774,0.6768670517134721,0.8856604273663589,0.6702420847581152,0.4915682337007443,0.9697679464077751,0.5796102800940017,0.16778615293088817,0.848569232524335,0.7114518642270617,0.9686948470016721,0.8408083828971802,0.9378613182001352,0.5023685087635616,0.6947210807262081,0.04205145088422979,0.9253991924837435,0.8343442892659669,0.6846133954791493,0.26882595152176436,0.005301422418841906,0.7646921989183499,0.7908898544711429,0.2975258310978446,0.035609835427886205,0.911822539656828,0.08646503521240123,0.7651229034916369,0.5122006745428562,0.007971465422649704,0.19006898516467818,0.019311129970215113,0.4073547830073829,0.7174471157522404,0.9766563503115206,0.6073056519603375,0.9475141009735075,0.24378096019468476,0.019116335610031454,0.4578430610507136,0.32361459198584863,0.48351087731985043,0.5021732326757293,0.2727250079189909,0.40540220548204564,0.025007274254842615,0.8888050304498372,0.27618664825384376,0.6437106962022341,0.12160107321272995,0.09662982548893018,0.6374379032358355,0.1177117421468925,0.4371011544712333,0.17626799533826243,0.048517426397057584,0.07364737848249003,0.2527915286314013,0.3215069418381966,0.2488595381034644,0.7575186359305621,0.519780001429794,0.3802236408228634,0.07117451603888125,0.7292708474362304,0.3633005099246156,0.12526534148236723,0.15393407379593538,0.5909666226483536,0.3188917092008443,0.8585454287299692,0.5886323033556247,0.857821974570254,0.6033240321517919,0.5585298279206989,0.781472767609763,0.3344839115597529,0.29398513885793665,0.5544009059622486,0.189112864998513,0.5289508014286084,0.8314543181278982,0.513492095124201,0.985895823075843,0.1837762969448673,0.5755353313374398,0.15604093981483258,0.5580872848391047,0.917713490731952,0.801943830977329,0.40723940233738687,0.5855364977415061,0.024687782641010347,0.3144761397688345,0.886210554850734,0.8461688940310381,0.1103526031892823,0.5040745339433204,0.8859745285685188,0.42400530679500603,0.38609104885539725,0.2557144360183914,0.9781405025132508,0.1574969185618207,0.9892529718726042,0.815924311317688,0.21554240726456442,0.330349178806693,0.4817810147374497,0.20867970629276167,0.32129340065662504,0.7227365683849483,0.15058977781631966,0.016621146517802776,0.4610738487913699,0.0666264476175924,0.016547949641357862,0.7218370836676469,0.11590664839250531,0.00959027358245046,0.2814303036028629,0.1750901511068108,0.7771468814847711,0.5266608515407905,0.12722963589639047,0.6086177462399471,0.48788915228511676,0.592468973025259,0.5980094518123507,0.8679817479880763,0.9808633070061956,0.7156661017419819,0.5985405353951743,0.1510037793747374,0.05561682291847592,0.8556386573302912,0.04912973782090302,0.6497498883137294,0.6686979733521266,0.5467506779492284,0.2878067387585017,0.9322331670336099,0.6614900363778957,0.31838416936045366,0.3205764962481574,0.030509066713656052,0.17637616487976904,0.8347154949222604,0.8247943792073218,0.9908268363103121,0.6353395319849087,0.06354250317364007,0.786408540837721,0.7046767439788177,0.16972969778105407,0.5514315605634528,0.9752220169065802,0.015287888352159884,0.022074703380532412,0.8091491932143478,0.5591765099777268,0.9425606976790442,0.9149577088512229,0.9265312227487388,0.4028078598660043,0.33142904878162605,0.03546176074227514,0.6774411683519286,0.8053677793379594,0.788014053083526,0.7751974911137047,0.24741777398436904,0.7207117453431653,0.03468840993898237,0.9779125252526428,0.3063455437760687,0.14150915780114715,0.2311539350252605,0.48529252059027095,0.5903664343958424,0.1251274919231926,0.5442703721456004,0.07786939399246973,0.5018413820790202,0.7487599122374422,0.11332751058933721,0.34093811100186766,0.14927086669993472,0.9361110709828893,0.8153078213802576,0.3379285118654354,0.5031334681941155,0.0627064585607311,0.053156146571863294,0.622393463086637,0.5083504442804965,0.8033642004769441,0.9719588510183972,0.1762106478154919,0.9673563758017785,0.35318833995684806,0.939187670306008,0.3380599456841118,0.8839342287313927,0.7431998610596138,0.6906572539258102,0.14940196843838205,0.273904345521911,0.7073004112737262,0.367899475355536,0.797379734865642,0.7175566092099206,0.6796491565095677,0.5570965194840056,0.398441552147935,0.9296302665690579,0.3432303087925379,0.14801611168796924,0.6553953792125535,0.5056429550760899,0.03325885297104647,0.6025811727423316,0.2546674297650555,0.5996907177884245,0.35898303748369487,0.2781499482651397,0.817162187911658,0.9253705524048272,0.9412275022706384,0.5750457364072594,0.7517111025217691,0.2751042075769956,0.01726570545319439,0.1796174820422245,0.8223965414048791,0.5190853212413775,0.0768029006030162,0.5204384902515515,0.1270878261278383,0.8762338175235349,0.27185073148771566,0.9107653480015971,0.6303832535351501,0.1100384044773084,0.8849650553917012,0.18823112641879325,0.5831050159808637,0.4746805081180929,0.8736884013079347,0.7317812027490465,0.7174092164243864,0.6611348067884526,0.7335360885161295,0.8684599182041142,0.35498118009171287,0.525131773772566,0.5065404172483801,0.8048700089846073,0.9551266370133238,0.5058748723157469,0.8723536701252195,0.6246444367497179,0.32778132795182335,0.6300996990822267,0.8514297719010431,0.09720629925598301,0.4411436997278517,0.9724910431996139,0.8169630243251784,0.02370811968542408,0.08643646801503468,0.6386511609702592,0.16114477428582985,0.9963523739942619,0.7163224099578573,0.15861891711837162,0.39523341346761987,0.7081703508540655,0.5040417666500572,0.5326694513196442,0.20715040709992882,0.1570463650143208,0.2842181565420987,0.05245277405847393,0.8331624878732085,0.15849353138775868,0.23368628662653612,0.5940550030184044,0.46139060759170225,0.10636392461757938,0.6599117888513346,0.8580919042221471,0.30583740324230724,0.07509101586268274,0.2702685488785441,0.8613347824142352,0.9148522136315866,0.3511534155211995,0.8517711287833616,0.6192161804646994,0.3385962946630843,0.5507391784471982,0.29053245533928607,0.4241375800379654,0.853922459271242,0.07069084198343223,0.6470480936533214,0.43688736281817575,0.626198157689281,0.8172123364114827,0.3573046335563883,0.1079189006593706,0.7134236179066871,0.5200701062879167,0.2915712351172546,0.8721209006798505,0.12376144004838197,0.912645907735758,0.653544723257671,0.48212931025574024,0.2649359542427705,0.6286794868962964,0.6440754509387234,0.5491755722816944,0.1597255913527602,0.2760265741929122,0.9852829868934749,0.273815163139838,0.8353219383369128,0.9631521341664979,0.5220494483896811,0.7170029190649436,0.05214770140052716,0.9750529498742446,0.9499633070904085,0.30474314319589,0.21418244922956897,0.6435918524289297,0.029343404686163144,0.901587649324844,0.45672895491702215,0.9351987321769033,0.3503865630847527,0.7888970807431741,0.9365529630762459,0.7573173890998575,0.4834081877311587,0.1473811913178522,0.11862785986207602,0.35777912557613245,0.4197030645097708,0.23438708414641996,0.1220009711289487,0.8105814136094982,0.3611558334950611,0.24356300238434359,0.616453304179539,0.330683098205113,0.03509461987368545,0.0599558241668281,0.6046227044686896,0.6612105112871471,0.46959509325591564,0.33638663169873984,0.07757269188112459,0.9906672179283766,0.405041202533972,0.9749728563829902,0.7602226448952119,0.5595055762145524,0.49126563972118364,0.37825004031386045,0.8922332962850361,0.2717039720514325,0.5159412943131316,0.698217002223239,0.40750815440699717,0.32918925872049765,0.868522506721277,0.5455333842921692,0.3443899241560513,0.9055207718257605,0.6926463520028436,0.6791837399691683,0.7370893101244593,0.9841401463749151,0.962761342236579,0.3976943325750957,0.4745922441588408,0.4961408734056978,0.5155339439757203,0.8620268210842645,0.3043896668524295,0.7122375653567994,0.6881081364433548,0.7446116310710189,0.08514842619034302,0.021409475664022626,0.46858085336270605,0.4952833722227652,0.9971031298274626,0.2297746457566161,0.07331045384836687,0.8094442379732225,0.8558868850877319,0.7626994933266267,0.21668442032084845,0.29527295158656774,0.1347720711404401,0.05119849901188833,0.8007442699258975,0.26696176167218333,0.6930116814077929,0.1271548580402222,0.8702021277812078,0.42337741178923105,0.18644250916137217,0.3372462704602808,0.17880752405275113,0.5705169268468047,0.3298491794325995,0.5459984666314848,0.5374542353780389,0.47305783110331157,0.46444193723010474,0.283948468222498,0.48577722837261716,0.5568171332117231,0.10809743727289689,0.08983982304519356,0.5693523527782076,0.8358243691098148,0.1644934286878761,0.4839500836212347,0.4286299382457732,0.05210779826170908,0.4499070240249843,0.24142391308542832,0.25979074337728236,0.302775597817454,0.3358062394780532,0.27741251393200583,0.8366017173505647,0.48687595235565984,0.5474831990088891,0.23073885470331557,0.9356082352078006,0.2496783436039054,0.24690044471392247,0.33630597629211034,0.05199029617853945,0.35941314082162035,0.7090788000969754,0.7497022683404375,0.0730375347024157,0.3039108079585857,0.9947146930743445,0.5868862093821006,0.1654723002116134,0.4667296057427639,0.7082234240897896,0.7783252683409814,0.43443131433215654,0.6171119660018709,0.12440587890516808,0.486853441416786,0.17340549803861238,0.232814658265597,0.6576775643673622,0.1410834069827298,0.6909237680452474,0.2976800189889077,0.40626246358929796,0.8673511845350861,0.11323839721855711,0.384817078522838,0.2803981923784249,0.8355198198721625,0.8057292104789238,0.8638116575281223,0.4507227828516742,0.7596222724840751,0.5627415242046807,0.17132888317980655,0.8641549532715984,0.714169830712305,0.3120946962060329,0.9977744649003273,0.5612206036873078,0.05058096551728086,0.09919815443995317,0.525731508518128,0.5252913496900975,0.8623604401987028,0.05868655640601261,0.5527715157281352,0.4942086802390995,0.18627000293072937,0.41464808022769417,0.7660189176201664,0.014841011743393029,0.7004124199775821,0.9722186578678702,0.7565238101486953,0.6428664678792302,0.4828733809405146,0.6656149347903422,0.6319329097315132,0.792289386037657,0.43346552822008966,0.34079197033490294,0.10669294973085264,0.17147572298606173,0.6309862127905492,0.3630794715129704,0.9555872392037403,0.8150536620609714,0.8741582183916794,0.11831977206638933,0.25174876267658686,0.3418697207173742,0.5880185844787191,0.5289126003973668,0.07278190599765777,0.04455950933839592,0.6652118135719587,0.25165370282933086,0.34083716965008715,0.42678210013475026,0.3520520651680019,0.944835921418171,0.2863601295778253,0.4323258943661006,0.41180528489319546,0.31506226498693435,0.4229972965260851,0.6807263551734155,0.7826074626223869,0.7242098198185114,0.5394289418397709,0.9875894326815664,0.504327706985503,0.015132492772939932,0.7433696132255694,0.34252669015680426,0.8984658452338137,0.14071858761345135,0.7284524977812172,0.943458493506296,0.34163912656648954,0.7756701594435018,0.690295683794711,0.5411660198419252,0.5447976941921946,0.7445097153901912,0.06514181053398271,0.385781914324991,0.1888018079100271,0.04474623088910468,0.7825301313415964,0.8676776451293344,0.5557392712470839,0.04588902635385028,0.7425083512664894,0.21619754080632148,0.45091384261481915,0.04496143244707507,0.7586947045983949,0.797279492607645,0.03569751425402923,0.16886670683005045,0.8852728772895084,0.11504768556920952,0.23276623027778331,0.725164898029331,0.5362575210837728,0.622829534879257,0.2859350197871442,0.8168877141035171,0.3701645454752487,0.5502820842660314,0.43941242184106644,0.07646143995852017,0.7921898376606782,0.027101592320692758,0.65931718754319,0.13245214053839116,0.5314197292385168,0.09038036504808256,0.6966260175466912,0.25794799940907165,0.24368904445290962,0.5651102327705226,0.3901249051968847,0.12441968401727466,0.10443855027996052,0.7968537535434854,0.6542790834243983,0.8481714074151305,0.35827501064610967,0.41119204474443105,0.2023626557829883,0.2803858661758598,0.9884953244119052,0.3086838544075359,0.98198827285507,0.3475075921716775,0.44748995059071306,0.2290133677587034,0.4735328423726688,0.7606206475842658,0.48142104471278446,0.45040897847524164,0.7123450502505757,0.13894200700861425,0.6295932751123692,0.6589787032528991,0.7387418888197104,0.7035511452250989,0.354169752675062,0.5667019074621913,0.32959042728379884,0.32349747131408924,0.631859245743442,0.38555188324483436,0.6898990279356982,0.08187412371973068,0.018692742821015074,0.9570211808194142,0.7969190640230952,0.7455036868239235,0.9125565395906168,0.07392897941122789,0.9845311447489302,0.14125962901193523,0.5084553648809973,0.8306750215224765,0.5562614913595569,0.40040828084136937,0.8988817840016103,0.8001877867722822,0.9355671009082931,0.6980656715168418,0.08672918667061014,0.7320878790709768,0.7328189873253381,0.41588192973803406,0.15733477779583693,0.3124266322910614,0.4524699019085039,0.0088824601787576,0.17582947883925715,0.3606156134528862,0.026129847552040175,0.49064363770332564,0.02283203755436425,0.29741910567708896,0.3643350313971556,0.7168576533141753,0.23756633021325646,0.13401368754555198,0.958922694679591,0.15860035346330204,0.8216613152263512,0.8351332214783254,0.6141910185130877,0.6924170011623951,0.08239895591975066,0.9635078488850228,0.33190082548758726,0.8688009830574486,0.04771984957954434,0.857999974474748,0.42666584878466685,0.5791124174459721,0.735433625079184,0.4520226672464085,0.9620099175500503,0.47774074715711023,0.0854370136126874,0.012271269707639698,0.18670230822888723,0.21165442704076853,0.557630689123922,0.07771713783881595,0.7552557882888224,0.03581392198989919,0.7148884060501726,0.9291542554650758,0.6417982108364013,0.6872313332269941,0.32326726304645326,0.34222305835939326,0.43577141310121137,0.5137874810675167,0.3416161067232282,0.8183887418105855,0.8077104095568814,0.43185463849940553,0.8079896688711099,0.3195651009725282,0.6145468955071716,0.703289665319446,0.6588452516030006,0.3711489982988949,0.7860848975227335,0.888534805169723,0.8637871194918036,0.7343578788558829,0.26947901528209717,0.575239869515416,0.09766988284701994,0.1780366138895395,0.11883530950181553,0.06683262854146554,0.8541078864420462,0.024696233188555405,0.6357493832936865,0.6546905426396037,0.8734831986298077,0.18063486839011467,0.38369165894718615,0.34622583925931893,0.6813879664129858,0.04856127754736028,0.15320274420645363,0.7454617636845831,0.6505992519322987,0.6159457826642905,0.5786929783135741,0.3043115167695054,0.38406556311727735,0.7990910400991336,0.1725181551863264,0.7176421484584194,0.48362373368170486,0.36125017048540387,0.4935168746191998,0.26757920173821215,0.37099805499963256,0.507165640082528,0.5977806770537308,0.9510431004382691,0.7589499207578148,0.37087918100156037,0.8660936619290216,0.5688501466678895,0.46446834031594,0.19981841493861818,0.3664211465132303,0.9744805955123734,0.9762411093007803,0.7613077602788947,0.9544033269414582,0.4449655537338144,0.22227422027141475,0.9657782902871579,0.690422189008199,0.5967488030571242,0.5448074283032558,0.6115160349545148,0.29525250457231134,0.6076252336598433,0.07466993234665775,0.9303764831023615,0.7312380672379173,0.1857561266900014,0.840193021503157,0.6502166040946866,0.661255822746557,0.08236608762230269,0.9430068262664411,0.6475832903733867,0.43683577852163147,0.7693554414724519,0.9378937486682577,0.6012474794334848,0.7021430458592752,0.8790048499297638,0.0587144771233159,0.9061510299579068,0.291452595890497,0.176324599496805,0.6497786674126305,0.7044503697253206,0.04320692977186513,0.08506347867261965,0.5640125876298248,0.9644162555311542,0.24152047750828154,0.9907729781475769,0.5124885888193844,0.5448214690339914,0.13806393763114322,0.24564897276218622,0.8428647108658656,0.3906555720965923,0.5313627983713238,0.1311653253585452,0.8719328911608051,0.9773857328419959,0.1488799820548672,0.8220136677797554,0.08192660128563944,0.5301655999550154,0.6314688591251247,0.8108076501669248,0.6061442276505546,0.7479485168272186,0.06273202287254276,0.5780678693407069,0.6617016075101734,0.6103640264204409,0.3334406424928551,0.3587394013144043,0.6874753912540492,0.31583249424641036,0.26063952758081266,0.16131649765892897,0.33953376611700015,0.05426074400985392,0.9346276725357898,0.2117056096509271,0.16785218257683487,0.5547830188374949,0.31894194702486267,0.9294929263838594,0.5043747743198159,0.5213881028156617,0.9460887330501946,0.4147304673006844,0.8302373028118648],"mu":[-9.412970409794825,-8.242492291423886,-4.421557238524992,-8.847957028946922,-1.559058815897909,-2.5870430663602906,-9.313513070379766,-8.751084938357494,-4.1728565898700065,-7.3549490178450565,-6.507395361145109,-7.9353654302466285,-1.92255664848338,-5.324781919903552,-2.1803605487372524,-6.8779049348859616,-6.640868406062013,-8.29540142531094,-3.618419800545558,-9.530187320357548,-2.4642958926251257,-2.8466647479011,-6.565211699769606,-2.985176558724587,-1.5095988167985253,-0.5849540530739072,-1.4517580160855847,-7.749176242187459,-8.459969090385297,-6.330454038845382,-8.981970188653811,-6.980938710064477,-5.986550581955865,-8.746043837790722,-2.9555048249753413,-5.845104312505727,-0.686125074298205,-7.211747212805624,-2.0772071781552848,-2.643162502155214,-0.3640898188397679,-8.428338322497988,-0.19991998669043776,-7.212797530998227,-0.1506191163306636,-3.0008759157857567,-2.545264512288188,-7.066381172655742,-5.21892136997071,-0.055760411355096906,-1.5630200586807041,-1.6556588241093007,-5.99166081430363,-9.306315433005949,-7.180369572425141,-5.046286927275563,-6.350215122977367,-8.590891157646784,-4.776646736605228,-6.127489267980691,-9.349681195364578,-3.530085372550611,-5.182566264953787,-3.0300433937686067,-3.559472395545682,-7.307808979037067,-9.865869301732799,-6.227047005446891,-1.345548501442173,-4.1436984455740555,-5.15405419908941,-5.08484370111463,-5.48067360780693,-0.5371487995180013,-1.1891554068282062,-0.8054450934129509,-8.208639062682686,-7.149391833437524,-1.9682947645271343,-8.874875388339712,-2.9961289377003597,-1.0789551521077656,-0.9109077919129382,-9.221516052294012,-2.490069542459139,-6.793815802355354,-3.9766101998811965,-7.674123017188752,-2.5166085564785567,-4.607069976822391,-5.058912478717643,-5.269133771055348,-4.325741733201809,-3.3092559268895982,-9.083780450994755,-4.345759607422465,-2.9696821816170815,-5.002221396355553,-0.4759072922598495,-8.530225003303595,-6.4159297876944095,-1.1002232505111476,-3.351475457009232,-9.680147464009403,-4.221517555255048,-1.8570314457449921,-1.9531897300608358,-3.3870223901257734,-4.128202924170017,-3.63829114461258,-7.942619605230464,-6.932437087021834,-2.6033695097910847,-5.182839220573781,-0.14210334161163685,-1.129688582844881,-4.2819496675733255,-5.0325232303652445,-6.007587081067043,-9.60268716080926,-4.066868774242822,-6.198892945418828,-1.2608603364196602,-3.937645541850927,-3.4391496544335065,-0.6311477608977367,-5.047421773288332,-3.117583203215273,-3.3618257258477557,-7.451496238339215,-1.0242529452560367,-4.6574839642935455,-7.978231519434913,-6.527362636516523,-1.0221608278756111,-5.949140163435269,-5.446737613042658,-0.3045437766521064,-4.417814305851726,-7.691459899332664,-6.401048829775986,-5.904646756020062,-7.3838628273401845,-1.8593492312078364,-9.749325229991326,-3.243626227819072,-6.20876970918877,-1.1488527959971884,-8.72794478553665,-3.8322071823131143,-3.1354098423874754,-7.301692135577977,-6.670023015085893,-8.918319374144978,-9.703736586744142,-2.5863637152002372,-3.127209077143096,-9.675552157481784,-1.4214359140117616,-3.0643251885519196,-6.057267969839277,-8.677440723423185,-8.180569835942533,-6.589585624798795,-0.8056073151516663,-2.5592535776263503,-6.775068072348002,-6.025233839862965,-9.740491250204988,-0.16658992865670852,-8.848519510369378,-1.1667790838121173,-0.11520753060388689,-3.2881355883703423,-1.0182151747531099,-2.4988981745952477,-2.1369348789834786,-6.243185313331505,-5.654491133087354,-1.0421383751154822,-3.938758942759586,-7.580124989204579,-0.5624297881019369,-3.4228953465067424,-7.710221317235144,-7.866680718915315,-6.400092200714993,-0.7105908351894707,-1.098050002359392,-9.278177819203481,-6.017150001193839,-4.734179955063674,-6.208419285419289,-5.08298998578473,-8.31146811691196,-3.6073083232396286,-9.438862502490009,-7.207518998878375,-4.328207822424483,-2.3822800720117487,-4.995675457813711,-2.223011172748235,-6.833422928279327,-0.450829353694413,-5.194411738362472,-4.719458312427278,-7.651756472124795,-2.3917898058046583,-9.177399048062592,-4.470560054084496,-9.613668803773622,-4.8880042205029595,-9.78520984181692,-0.9295531360643894,-6.365127377557275,-8.118966107705067,-4.745928530374268,-7.888661796465537,-5.111179208330576,-3.4009962765035073,-1.816933663056175,-8.006177239087975,-5.006264203373114,-5.198582289262634,-4.090501624627909,-6.082642041484245,-5.215610637306593,-1.3089857280758799,-6.300522521612725,-5.160900615185112,-2.694320561429686,-6.32949860805065,-7.618229992129146,-2.4500834258522386,-1.3955191292203262,-9.05667998120877,-2.250756360786934,-5.1957350867921175,-4.7062552242512385,-6.5735113457759535,-4.016869873462552,-2.278883469762436,-2.5370698762189936,-5.608451334623037,-0.36467831139834317,-7.921181174904546,-0.08074050943696731,-7.3544707269307885,-0.6793760755315348,-5.893337045914649,-1.203197255070927,-7.701123354295403,-0.15836372640152696,-3.2279665471877883,-5.633463274571295,-1.9223424395983169,-7.806571826239466,-2.35596166252642,-0.5424105306126759,-5.990567838117964,-6.586908971521163,-4.2537493107396385,-2.901154806346493,-8.18947344764336,-1.041130941952435,-9.636442046341235,-9.725523532034746,-2.5962966414269095,-4.327624755293686,-9.149177685420288,-1.6295156948719725,-2.344595989076892,-7.105967157234869,-8.565957334211681,-6.580189932262068,-5.489461562006863,-8.085511844725268,-8.029128837988013,-3.034641216869478,-3.1589383381563962,-2.0315459697966953,-5.021966402412148,-8.62919336938739,-6.966360710735728,-0.20648768930094707,-3.64439531545508,-3.685068363647861,-9.696017452712447,-1.9813554465034189,-3.2275601031714807,-4.521635501296089,-4.85352391942784,-1.9264156295153478,-9.844161809583236,-1.6854328621752068,-9.009040966270573,-8.556751009278685,-8.917149622455883,-2.5228424428827534,-9.801992510301483,-3.898053843149245,-5.85445882979216,-1.3093008057325695,-1.7930748843227073,-2.5614977333192845,-4.514080863361148,-3.5009776966001116,-3.0789958387019523,-7.235800316383929,-1.6618526807150302,-5.631794451993894,-2.9631686893376408,-7.885850579767537,-2.5336110976969484,-7.210357557716045,-6.908220336475703,-6.430265117290553,-7.652374942169837,-3.2842589285021107,-8.221474392103815,-8.540006742250505,-7.5464083628319445,-3.3202736855857085,-0.20293171408795052,-9.89546485281416,-0.6772890846244017,-2.3675485160493603,-0.9604710340299549,-4.185341047910793,-4.460469908974289,-8.283546664870677,-0.06571197394732442,-8.814460238054556,-6.215915623185577,-5.639160274929549,-0.033561004402438144,-1.9694811108406918,-0.8271407448683243,-4.45665804614875,-3.214313622498839,-2.893697295283346,-1.1074985223614453,-2.1670962986389775,-1.1711950749659006,-8.93173279421771,-3.3521784785105613,-3.0474858350418255,-5.125816203301492,-5.159826862842403,-2.7913176793299677,-0.7026216285911757,-2.521873766257343,-5.707363546693829,-9.8190678422691,-2.611155033507766,-6.078875533657357,-8.781520765217014,-0.6301469032015583,-1.3863006881974504,-7.3688218953018625,-3.5220774724173065,-5.961956602261294,-9.169161455055901,-8.03478964503417,-3.9546038406016026,-3.1811576724778967,-4.2387472785520375,-4.019280078054304,-2.502466646996697,-0.7793582062934745,-5.872982194700831,-9.972221481446573,-4.594548554161895,-6.5331256813649485,-1.752633235146006,-3.1522190977026043,-3.091383345705734,-1.733572568414743,-5.007802381326451,-5.792644851810325,-8.915128319904024,-9.99353879512894,-9.893821196185081,-1.8940179361197318,-5.377018339829331,-0.4086174510259011,-6.114567777388482,-0.1436170094151179,-7.986423055313027,-9.039331316714282,-2.6679860493816854,-6.6921541087836145,-4.878363920572872,-6.284583281943972,-2.154927123752246,-6.978176413702912,-2.544593622727025,-5.5746005307185476,-0.18092531854015048,-9.022602305365293,-9.953446435040352,-6.721949841392483,-8.76797386984274,-6.27829125557448,-7.5158005371417325,-7.07353989917989,-0.887236132679281,-5.5227471628346025,-1.402603402309155,-1.712481116744844,-1.6533083405785565,-4.529360798651236,-6.251924820131192,-5.287005341841866,-7.166134587902729,-3.2691144622040325,-6.12679619990776,-7.16774213185966,-2.6139177126257085,-8.4926867176416,-7.187372799515332,-1.2960536181539206,-4.588975091600664,-3.507282261068425,-8.589684548453988,-2.4862327546093765,-6.805009482157532,-7.035920733280596,-8.740065020568665,-0.033394254634993015,-4.664344683792918,-3.920075981756894,-8.304330736232053,-3.3906237507187087,-1.0372258450908278,-9.95600202715304,-1.1259316185110713,-4.387258562627887,-9.530579774043586,-2.252558862377678,-1.0915885494897926,-4.316888169112982,-2.2458035043312297,-3.105150646968755,-8.014799240891257,-5.546488361574791,-2.6036908408475523,-7.089136048883979,-1.1881261833920553,-9.313762886774954,-8.09561048680729,-5.55773248376908,-4.474365469802885,-2.8549827698509866,-6.812193776095478,-4.283546148209716,-3.1707319898760833,-4.738748958894563,-8.91877258865657,-4.056384957606425,-9.286876729994887,-1.573719486583125,-6.1767410733820665,-9.464630371811776,-6.184624313730174,-7.0859241940070365,-9.992302984198133,-2.3700772000979176,-1.0161002367758165,-1.0602239687738857,-7.9758174559555,-5.460301908590061,-6.125262609169145,-0.5191700391666321,-8.206529174338598,-1.1031615781713189,-0.839260098176069,-2.936790966947298,-0.5449298159962068,-6.500184138425387,-1.3555635088936069,-0.022032212729166112,-5.634629089040941,-1.2481346528793424,-5.9190264610522725,-8.185731828625858,-0.6520703559314045,-0.30540077753062,-0.6070573981102467,-0.7210750741410266,-7.189357550815075,-6.26679766965977,-0.9069896627428409,-1.9843907195295407,-6.03211237800636,-4.365640530570742,-8.635442730961842,-6.773072546570469,-8.248484486855986,-3.3667660332031413,-8.137430704193257,-2.98340703700668,-4.482662543587265,-1.946562245674417,-1.8798319490062299,-2.926594078944391,-2.7161096988945133,-3.9123081882231148,-8.115732699294496,-9.287953310912991,-6.0000510072641084,-0.05985238012438332,-2.3956895304954395,-4.951963543025737,-9.889180491718253,-5.059977753584716,-7.104668397672784,-8.703782204491734,-9.60315751961177,-9.853503665695861,-9.668984483118244,-4.040042435093689,-7.992509704863561,-7.4083949941582095,-2.3389339616940386,-4.26923136184463,-6.147701684241773,-4.622467608151275,-9.502243183534114,-4.614434046942972,-1.2504626939730557,-7.192144917504068,-8.82436637586826,-0.21719475101117824,-7.992359055856926,-3.096849684302132,-8.59827705330634,-3.896124751837682,-2.748404262254218,-3.264423197817703,-8.881436050469294,-1.448989273740342,-0.7975460130089007,-2.190274666295504,-2.169863024759131,-2.5700411222629915,-0.018415805338707347,-8.748430277542488,-1.739940795572914,-7.828370723745168,-2.730518916072051,-1.5545334281696044,-2.6788546094905397,-5.731498161835642,-0.510748376668031,-6.581971021366724,-3.861934380960814,-1.2332621896074447,-3.6074513613678616,-5.7913392729375435,-5.277300885215257,-9.009001448307288,-0.15809887119808907,-0.857382033327796,-5.4976887824684795,-9.984997288960624,-4.538708914513181,-7.97968108855672,-0.42148767273574084,-1.447054550421738,-4.394132378646852,-6.6472833724052105,-6.102930122451378,-2.6536252715469666,-9.94673797737913,-5.052391271195374,-0.14105224802763772,-9.912799219449425,-4.425550068445552,-4.088939239471796,-5.768058151724736,-8.614157156413427,-7.055278247919723,-8.101731639800441,-4.7097457815959265,-3.13626327969319,-6.789767531135748,-2.7050321177860437,-2.208554921946584,-8.339181043254868,-9.581299293110302,-2.72297398569767,-3.3512489707998494,-7.234891518326336,-3.8855053327403755,-5.290370813817207,-1.786885638416973,-5.924514482126209,-0.1642694407305445,-4.089775967814358,-1.4122154132318387,-6.637965958954388,-8.536205724258284,-7.421985385271919,-9.482568118821073,-7.9222271578178205,-3.5382432454675383,-3.9576251586050604,-8.687040478125994,-2.377037488428604,-9.030183081265315,-2.5072133697673893,-8.664884009197507,-9.464258823345574,-7.6987483219557,-4.940558046888115,-1.3077415694513927,-2.9838964484549035,-0.18782620282609352,-6.955249448908383,-8.462607993914153,-2.3509719685898967,-0.6355750816626915,-1.7822928714319808,-8.555861456736988,-4.4509525794278755,-4.829693853918451,-2.4696067015921486,-2.37858621827002,-5.757805379743573,-1.3175765009337637,-1.2892785510105331,-9.577322577498002,-6.33031613308013,-4.812491061109345,-0.7707401648643142,-9.212454823405558,-9.645953628185174,-2.2899411425331606,-2.822747680135751,-1.7984544356563426,-0.06333993756083123,-6.694555716093729,-2.3354779877112097,-2.994592793255444,-5.497606722705461,-4.563624645287822,-6.10227004076995,-9.182961312857522,-3.7176851666902677,-6.787302934087749,-8.219172874975126,-6.705088874699488,-7.27511127119238,-0.6666020112753301,-3.863604393453335,-3.627839410971987,-5.95199015142339,-5.976432745417421,-1.6462113379416854,-4.518253427649805,-5.045167376493415,-4.375951913804328,-3.7188002938407694,-8.768230746165283,-2.6748997193782698,-8.114692365723599,-5.990936147701246,-8.08063613775909,-7.3446443618100865,-9.019934729962916,-3.200068791963271,-8.495529033363846,-6.648462814737879,-6.981659768370411,-0.6664653933774534,-6.078838053316156,-7.523091581255866,-2.0633853509086175,-8.651606824592108,-9.925645011683361,-3.8221711630866406,-5.792532261368333,-4.742110071022707,-4.403250468162396,-4.460973842940364,-2.515540004329162,-7.4779465651279375,-2.04149355596442,-4.253291582982559,-8.067941922333247,-2.7926061293354265,-4.147841029050127,-4.161857825261568,-0.9661621633892592,-9.678317481017391,-8.099624505395715,-9.686282835423262,-1.2962880416610334,-7.279926515132072,-5.943379398256548,-6.21294778460606,-4.611273545393746,-3.016285462782018,-8.785123523548389,-3.0372833749100336,-6.984848190013682,-3.0221265256479724,-0.647827895074069,-6.547528424155509,-2.672159517783941,-7.6164690286060726,-4.116823256832307,-6.6015520778763666,-7.782519114483504,-1.5655096259066914,-4.674894878957552,-1.894807824276299,-7.4010249325264565,-5.632310979297408,-5.161890720067735,-7.251397908647544,-7.415184661817948,-2.831022794422584,-1.9140353421141665,-1.218397368119546,-8.118094133327887,-3.889801059173792,-4.905314402249834,-5.241887321130516,-6.3050297176555725,-6.592747782497128,-2.738963803787444,-6.21978274443584,-9.747873634239795,-2.7867744512175285,-2.17365375685149,-1.119986696951305,-3.3373326227386246,-1.4591714507857434,-9.260161703812182,-5.466964285408819,-1.764441199937905,-7.606017947293355,-6.284276738091963,-8.760281279586941,-7.152292797768078,-0.5536372264530542,-5.879497515345191,-1.4114852791378518,-8.981487403818587,-5.559456382649801,-9.629790312237121,-0.25889385569306755,-3.7853997739497514,-8.558385831822804,-1.1458548876883512,-2.257414240407518,-1.059972855927549,-2.1542844630908298,-2.6573313652891173,-9.124325161670392,-9.441902112059884,-9.458128612281362,-0.8174957056855225,-3.8445842676152098,-2.446608674114019,-8.755881565121847,-9.973331658454608,-6.737632656779889,-2.15929685284048,-7.560530455650392,-4.788629891254708,-1.4169140202935182,-9.110314102459608,-6.457132731160849,-1.2974672890454486,-1.7116450522300886,-6.666448790184829,-0.7330114197229443,-2.444104765024202,-2.558025498359615,-1.5810520006482598,-7.046357994805108,-8.214590774107922,-9.445522668289756,-0.4608748358800918,-3.3953640018605635,-5.34346509232833,-7.772990615446336,-8.15046582256942,-1.7925513029584694,-6.802551653157298,-4.9966090661825895,-3.3781173366120276,-4.194661718410682,-7.31379642145116,-8.771582947927554,-4.70813228822891,-3.840380154039882,-1.6024511729418789,-1.8501868160332768,-8.674916726004733,-4.7180720368162525,-5.943810102023979,-0.7270309109118811,-6.39852242317337,-9.211757589056337,-2.992356990867091,-2.233947347178522,-9.25169528693328,-9.812709080536324,-3.685450117752065,-9.943871569716586,-9.550899119338636,-0.1759342157614796,-4.1917509143836345,-9.196011058062656,-7.609835568174774,-8.201696992532565,-6.120235971497506,-2.1966744607491018,-7.484582920402194,-2.5850772043163905,-2.532375187530078,-9.543783161254895,-6.3402731922612094,-4.306821761051733,-2.8976458328792387,-2.1233452438109257,-4.348749037576005,-2.3781377233264367,-4.910581314386522,-7.405723677863811,-9.05598822738227,-8.314343682961777,-3.10959447631898,-3.819247145588316,-5.272682156959812,-5.295491635672239,-3.5613076633798713,-0.3600034480134062,-3.272337311081699,-6.531283927999598,-5.62232843824124,-8.246256447249218,-1.1959671464132549,-4.361213904935786,-7.437187912295878,-1.1431771614075448,-3.842193902415103,-6.100037849969555,-8.491203500030643,-2.253653528609574,-8.892103237370947,-2.080696132537374,-0.8947001724107295,-7.885355707067728,-2.1159627506869705,-9.653786676504868,-8.934389256184136,-7.937542877493149,-3.2807115514177365,-0.8559953958920175,-0.2516973389476407,-0.9134953744241114,-3.7739497631423657,-0.48508776990030755,-5.522095860461449,-1.370407773639526,-2.791199700767748,-5.414009850063679,-3.0797401396201862,-0.6422337394779554,-6.08139990874391,-8.038405052671578,-8.594289709509209,-6.25699452431244,-3.8083025325280384,-0.5604481220679025,-4.819130016456681,-9.789144194379347,-1.3993172037579171,-6.276996337926937,-3.442872761425615,-4.666860912818964,-0.9064237445585976,-8.610412853278671,-8.927661879098544,-9.877420246408217,-1.7259926396982417,-1.6312100755990055,-5.2771088486904905,-3.152283660944326,-4.34598095868518,-8.788008337589003,-3.123032291270267,-0.22884643511334124,-4.65481916169254,-7.8166972359020885,-4.846499329584044,-9.025072491526586,-0.49122641777023857,-2.1529236368416838,-0.38131661383016935,-7.951540576328666,-7.364751886869367,-4.43918248245144,-6.53815246257351,-0.6676035193799601,-7.679870511040154,-1.687491839617845,-1.9914465475037946,-3.8576748117417115,-3.9001480464263816,-5.013657877182435,-1.9354996018113613,-7.3633052108304735,-5.711308834614939,-2.463713489287569,-8.845647471744336,-9.364651246124222,-6.386995137710329,-9.753639051868994,-6.591770086196602,-0.6263606082705264,-8.779759706138133,-6.407748210634205,-8.584379760791656,-3.028232849569805,-7.5442992931797175,-6.845296347363208,-7.967810232431416,-6.8794363857705365,-2.1438023330868483,-2.585834535208895,-6.890293081592585,-5.959035410020963,-4.590574512848513,-3.5504703441784646,-0.9714733225472716,-8.103726459312048,-1.1282944943812168,-7.941005631492524,-9.288554897813517,-7.389004619631043,-0.9722229373163471,-4.433710134702538,-1.887855673501413,-5.496929950094664,-0.9005441986717444,-4.083743651124509,-3.936837958627657,-7.063986273687539,-3.869719379009824,-2.4675369784423307,-1.0728472540860046,-7.011329997700191,-0.8775124393567912,-4.565172844765383,-2.470508409433798,-0.4018618757892045,-9.67318269882523,-0.6376673636044305,-2.1145492686683043,-0.0006439670260527386,-5.145865979960549,-5.042539025378099,-4.619418372338533,-3.780553864891123,-1.8363219836934475,-6.0690628954901005,-9.339825243942837,-4.600100923949917,-4.577373008671306,-1.5391102418758074,-1.0841200687219965,-5.954969849283653,-8.229050650503012,-1.7638443942259951,-4.454727721267937,-4.84748285773583,-2.661261272265425,-2.2394114043534064,-5.446370783545682,-3.609170241797186,-9.044352697992862,-6.961426554019836,-4.9967377335145,-4.343848428466066,-7.727726533506791,-7.021456855888566,-9.511787267244387,-6.68400960246013,-9.194587733840935,-7.686466465809154,-3.306867416262511,-0.0824044066682661,-2.911392212761661,-1.2054585218063574]}

},{}],121:[function(require,module,exports){
module.exports={"expected":[10.30531713319922,3.41551190483388,2.5438344128146895,6.994438938950916,8.05243552788022,3.388936447239578,9.934035473334973,3.542471035267021,-0.1515008238272646,9.907966285130955,3.5661674769860143,2.3615248090431704,1.3674291834024273,0.6441779020011009,11.699708772889565,4.409506503933945,7.232491623144842,3.6857919760409867,6.047894891126909,2.2636764572526875,5.053813270697701,-1.4097828123544804,4.698119690737579,1.5204245956418874,1.810884616766279,-1.450554040920895,4.382165761216163,4.523027592986321,2.8091686963804277,2.796858860112316,0.6192011603606087,3.6449527694617623,4.052425984406228,-0.956272327522072,4.750178014573657,1.0562944105471148,6.371639901463679,6.019987089758368,2.0579781480842225,6.057662728797237,5.9059075096401115,5.1417040397465925,5.35521724468165,0.3731461782408071,7.2331201647188985,7.4333779173122005,9.430388575064281,3.4850392885751758,7.733425174794045,1.4822963176426278,3.5028080239955584,6.441675179577778,7.56893546036191,7.759840265595546,6.1896790747145705,3.775391911374723,1.9441413006527815,1.2496272404813782,0.8792406052313673,8.46982063436128,3.2479536326175724,9.144760290106271,1.6068292044319827,8.957315442765234,6.319828840270738,4.723706719154572,0.88626973592294,4.311833058008851,7.4212025585853425,3.1912642314457504,9.675761126965416,3.313916088407382,1.1450561379241901,3.502502074841927,4.885201216865852,6.154227232502547,0.4855268520619361,4.391329094478366,7.256851068757436,1.249594703131736,3.583168884787888,4.941441790855287,8.942815335754712,9.770428508936714,2.4381661527793037,7.031683047738423,5.590589908649298,10.304796619121461,8.975639225406196,4.537010514210644,2.7943406836523828,5.5983042499727915,10.41387326119292,6.911281273835969,0.2962230815440442,5.619725150591863,8.50177163283047,7.555793115899336,1.1549388815017214,7.075401094220797,5.638887304900117,1.8840869075405169,8.108894367963678,10.214489216170433,5.0041518538130205,5.1386061427765295,-0.6055528115574033,0.8213779563517474,3.5483761065327206,1.9758831915922654,4.973208314877941,-0.39844696372414967,3.1768275647557314,2.285463045367538,2.871632703234982,9.532795704388526,5.804249236139881,9.34400886656713,0.5499584523649291,3.8479729439762904,5.207253861281421,6.89351569662594,2.762374952725993,6.5556082538212195,4.258471686762094,9.59727391738518,2.1690246272681724,5.170493291274258,8.325357368088188,7.657299429044857,6.333022527672399,10.000614671709329,7.662592722699051,8.280543902181922,2.3246215503642014,2.4277497693341137,10.708103267908285,2.057643975807026,0.30547872485480065,8.14603974324316,2.208871385725592,7.003641915138273,8.018380573527017,0.11662033061323382,2.998331653025696,0.7481323062581956,1.8710668730561297,5.693220953537221,11.001783287816504,0.9701984568044968,2.807668905182024,-0.6645522130637875,9.415082214193628,4.134362518362707,7.177505207792144,4.57841780990137,7.529521993704343,0.1554101465827448,3.263793367902715,4.194110863476763,9.571096515454435,9.134987206904942,1.2787783780726523,1.3194469580667194,-0.15434245532397123,6.254867031451946,1.0881003162336786,4.501088536315066,5.746622710076494,7.037997734425193,2.363223955923004,8.274865804920221,5.941984405706212,7.0936386425663445,8.625820078867548,9.897817711233891,2.3463665371743323,6.71710565948372,2.8561555833869203,1.7061355235631175,6.395293945549,2.346939090942366,6.492996402647377,5.590369086882614,2.286628036306939,1.679767348153844,5.115337921873412,5.068050170082791,2.3971724636932477,4.8074019515674244,5.835732889412752,0.4044495654356117,2.2725226975599595,5.339467817479066,8.800892376181553,4.556095469973126,3.170455884663145,10.431644453886449,9.752168881538699,9.232127404194367,11.805372069901793,9.071863630752253,7.16924669562476,8.97406700249132,5.878156475415776,3.9379728762269544,4.271099032889234,5.405915669549368,2.330444822393049,6.70614601934061,8.738187879179312,2.6791789282459044,-0.03371846444491994,2.07720469828368,1.224994228510163,6.810580396822164,8.684293768714792,8.810684107253191,2.976809214433092,5.38024496200584,1.8882421986952456,7.382958599645302,-1.228892822691692,3.8196739744803008,6.599465736048446,-2.4945068292034,3.728124023157229,8.358055545976399,2.1723455080531644,8.62274237701283,7.161733562444867,-0.02924981862686079,9.365259380877735,10.152596078183628,6.331644007125484,6.1557405392606945,-2.645818908639532,3.9848710122074547,2.064818408419007,1.1869766374892956,1.197623577984634,7.295884290089801,3.049110596638063,2.451339382180527,8.980983536630779,4.718071346311024,1.2864917964094096,2.5550247255456418,7.656672063836629,9.030686290144793,5.335555926441592,5.798726429649022,10.704557252180201,2.9985525299592055,8.111506896076303,7.506726480809657,7.573172572911439,8.84383564070491,5.0085252518262955,9.205636864016878,6.082734278823736,0.4702599337572859,11.120334495298113,5.147033869628126,3.0444900858505375,4.947355129088306,9.085311501233287,2.1864974784957267,8.578817945339658,1.8506277958889636,7.5310891136038,5.578951868004828,8.221864969440544,7.527771559109011,-0.09196452623883401,9.59618197896846,5.003968301460466,9.356726486216878,2.819293168242871,8.034129127541744,0.4389537569674622,8.733870424346767,8.378943850914247,6.994006643373854,9.595456089120884,7.733146663524648,7.655787072850423,6.753245930827801,3.9347135059618363,2.8015779526642834,1.4897197747354318,9.29036332803122,9.262041375115452,2.589442885743183,8.90645674772744,2.789007419219711,7.164724120949241,1.460443135884606,1.721537600003272,0.7449299907343994,1.806385727600972,6.390386893675546,5.941782023698799,5.540405536737856,1.631474470267264,6.453681021971695,4.055792314932816,1.7616093258345495,5.304501264026419,0.1666835413971492,9.483935197091967,4.831363045558204,1.189647991225947,7.13661868183413,4.567670542429209,5.749706272350574,7.912735729991914,2.603821838367219,3.959527919523171,7.885417501119084,8.657084520175461,2.623278582047521,4.511279013852938,6.7258661032565,11.222511906542994,5.167051089337061,3.6270196216550463,3.623462977181023,0.6960407572655876,5.367322429451299,4.717117735238036,0.7890240668606749,6.968570614238555,9.08475981882794,6.35021412499831,1.9190243589008158,2.8647150076711094,0.509929979018048,8.798658895432375,0.8540238247477085,0.42468219903819204,5.927315446888931,1.2766232780872846,4.24077919646273,-1.0663949494174942,7.282052948488993,8.227719604741356,2.9345046127757373,4.796709207198949,7.401487943102465,2.148702219152395,7.2184044441249515,3.538285606641197,5.181772978750517,2.9435450958112703,7.459383680352896,8.611955989527697,8.293298786846396,3.443091023437339,3.6544708865071285,7.893458687077285,10.035422844149078,2.32168923640792,8.786577213202843,2.690720087846533,7.009046218136861,9.365136187445202,3.070064817787555,3.98501570124091,6.728181824988627,2.8109513911413058,5.281552606171339,0.5190614814374324,7.104589638353005,0.7568492385107556,0.8060148657779739,5.284035131706058,5.781798451276968,-0.07802268932804415,4.2581783445846035,2.280163362392243,3.0090269157452627,8.506915294665786,4.991710396623118,8.899086509933129,0.7050727823073782,7.368334636108964,0.632540833581259,1.6838564415136938,0.3963920369642003,8.207198254219316,4.678256551833263,9.491559256378192,5.527515014063522,4.29270099234833,5.281268480143947,2.6487356160676416,4.952625267517694,8.261543023759764,2.2350899712263566,0.9381945160363385,5.965083354770236,3.708066248097457,3.596339840190904,1.3464591290327268,0.8746096491146725,3.2345629865761985,5.86055370731653,4.777046292012979,7.843415453365253,5.390584414587387,-0.5884993977808063,3.566524300369709,5.440164787491269,0.010664627125111209,0.771697242084355,3.168661051705208,3.0992500121410655,3.783251504349865,-1.1182124097485655,3.862815557415574,8.480425794676657,8.208099739036161,8.20780955539417,6.7494860383127815,6.947117247084763,6.765543383631694,3.5014967718697436,1.658225536134917,3.095155742050376,3.2455780345756438,3.34221714290675,0.7068306759049673,7.697681107793304,0.1269053179996013,6.352589341834628,8.547573237160165,2.3520407881309353,7.9608367545472465,0.22238621715503248,3.559281357618239,2.362435823602466,11.234049391825511,6.438553179734429,1.9913846268852606,1.2487242626387798,1.106350785975083,2.7393913445629057,-0.9856210837760389,4.4842458037563375,6.8641250573353485,6.349506017147419,2.640815163517104,1.3633980412613838,-0.20349512713362833,0.9507261458054006,2.545223579978795,3.2228177721381934,5.913586129789778,0.7433485262656778,4.805864585447022,9.481921063232193,3.6026103175098703,2.591169506235609,3.1754837927715336,-1.3789137909870324,4.719697274723954,7.3693130831573646,9.316763587983505,1.3194663015342099,2.817491679808719,6.095894595469776,3.0229969875546283,7.83541592415439,6.173162239191019,2.2181701618107006,3.8112946577104045,2.571511080355381,7.465873936488899,6.049844372483937,2.514380689759827,6.922258293040661,7.2084967444021455,5.318911598783895,9.73981633770325,2.3024723462026033,1.8857272398020912,1.9156478266862345,2.8233013429750637,2.4824402076633434,7.175307437657798,2.500669695479446,7.064982525112481,1.5528811195550039,5.501454025872649,0.5971380646915043,3.570977753549948,2.490463735025725,4.011759171227975,0.6085522019611338,3.418844851813554,4.1008559519886205,4.7821287637954235,6.167056989413103,5.1410743140995,6.000342571237392,8.02011819690609,6.289869080705501,2.7071525941153864,8.397434906850608,5.608719778723983,4.907311958013327,6.429035241815516,5.147837450968977,2.8737657103823286,6.19119630274151,8.940690133269056,7.5556551977385915,8.886805626946023,3.09927109730606,6.668012367914635,5.266874856686025,7.95994380227693,8.638033802695409,2.91661617209297,5.268085841865577,9.738660967752013,5.6556455385853255,1.2190042491761393,2.0077032818346296,6.824321732990903,7.112806433095031,7.728753845554651,4.118442380571482,7.243951288640445,8.964593530978405,-2.2636872789878444,3.537555720358087,7.314671414405504,0.8190927817725158,6.0823539200220615,8.921617556961692,6.806487098313329,1.6460072277525675,10.272073934341957,0.6079460816425943,9.631104389261692,-0.21062612746081938,4.605629466007405,1.9884077738569226,0.6433609777097204,2.399126323013416,5.6294014740961495,2.815242376926749,0.13798767258811015,6.426131054308144,8.549329125146151,7.331663530360965,1.7698389986179286,-1.2777770992776734,0.632082406395942,2.8719490681619284,4.338071454671034,4.654200755566796,3.5951701871879918,6.166948964447661,11.960499008703906,6.401565850242999,-0.22980334787669682,4.485430806382282,7.051166094132966,-0.003467842052324398,7.535442750194722,1.3072894726857043,2.5514957744962254,1.0215445107506946,8.571342668906357,7.267260651411606,5.135987052666323,1.7625620606560783,4.875710868187815,1.623055741364209,9.74452063457867,1.4687891354643745,9.681380351729398,8.492730420278141,8.903949992658411,0.7446386341978486,0.8746607333118703,7.087911404892456,5.261231382222547,4.706020782639387,2.9298478042539147,7.9021135260442295,5.4358973401479656,1.7972200251013337,6.914497338578478,8.446395580406826,7.755651543484378,6.212209933559753,8.532446997721673,2.872164296069932,6.035008615443589,0.7066084963391726,5.37596430642869,9.883905557099396,4.6661228898957345,5.340590717547131,5.369190936127543,5.027209260830191,5.259512597761011,6.128627256128794,6.234734290561511,5.964479820519057,0.8481846506436217,5.425044850917068,0.9708985994489621,8.349955645393035,6.469297345523161,0.10243057932410526,8.722459555273069,1.0418405395021622,6.060451380292119,7.510465807190473,7.865737730437285,3.279938805412831,5.400276956865445,2.9358672730053543,1.7196282332677217,6.420174203096737,0.24726177965026683,6.142323459920055,9.55106577201849,0.6470125807158481,7.371326386121586,8.393973346907124,2.1425378432061972,0.4211549515081377,8.839242547837568,5.935550572203326,5.971025322114935,6.289214807917898,1.1205749826013647,7.999797683218796,4.782893316237138,3.3834239468047747,9.749990315371083,8.345396401942214,3.8124965038071377,6.197013294730899,3.271145177170146,1.9469763564111249,4.186044139761422,4.038504004997461,5.703647805761369,3.50699948342331,5.195525197740369,4.318170417207636,6.912352496196384,5.7933346121173885,3.4783064416168346,0.796692557877237,10.416395969927343,2.4542674334652044,7.932774458891421,7.72686641740847,5.253236312203015,3.0829760041379735,3.5348701281512183,9.594041294760665,11.042083448038666,4.758501083784777,2.455668501929021,3.1884153178942443,1.1703698944494914,11.773988906267764,5.288614672332573,9.412143995144888,0.8048858791396599,7.342398220075706,10.028997282952659,6.674028074643466,2.3142958090528953,-0.8912048441489004,6.453050575291695,1.1976747886310193,5.1533064503930746,4.882388283516055,8.096906488818512,4.557912458293355,7.019477502325054,2.5997980435670716,6.230762905916226,10.57716047524708,3.3827517089285983,6.394320071263799,2.2176490931339794,7.539566724743223,1.4891732422301165,6.171641894191627,6.662537286176258,5.551834373376172,5.91675522436319,9.556996424461797,7.81171360436403,7.243307951299444,9.185437500306405,3.592320183253944,3.8153058385814473,0.6581865039120447,1.6967827017172048,0.4857875552233204,6.109835474428138,3.93451476001067,4.499492822041112,-0.16768322518303122,6.192907797465595,7.763403558911157,1.6641622798512055,6.295732171182555,1.4059277811066768,6.258268666309842,2.066682392357296,3.079807590359179,3.9586475482781633,2.9211483051405915,3.116408989660909,0.0887946512359356,7.07255167059529,9.885857758174472,7.657571487375883,2.5741188025205943,1.400759944734702,9.119132722938646,4.917745040997879,3.1738446425247204,0.971384553509415,-0.8243632302674743,8.925789020325622,1.2517749097843491,0.12176046819757902,-0.13894357519630585,3.761472982686782,0.20257946468204352,7.395969746023188,0.7537881000832257,5.542513503475551,3.9060670616925623,8.600882483945572,1.505244643373556,8.393314767322948,5.9305686504898105,7.071496941504764,8.744276276555667,1.3075861251425918,0.6345910040751962,7.17432817057261,2.5926725397087784,0.5262501747339549,5.567875694796628,1.7455404283787692,8.592082688275639,5.003780185913763,1.890632139612256,8.730799965136647,8.565477053669856,7.446416026293361,7.565274219114343,8.310901084945334,3.6320588765272026,1.473899209935316,5.209655368827038,1.2198763464113735,7.5892122234560375,0.08987692611256791,3.770720857974415,4.897229799817842,6.44458727812393,5.496833616004242,5.166859072284498,0.9312535741414101,1.8506314559054844,4.1039032301418645,1.75765350388349,9.312917003662662,4.014777435276517,6.223371738113576,5.775615985514292,6.129913197763425,5.4193025559683345,1.0531133510497326,10.028903053225147,2.177217454533242,8.623317904983573,-1.213783882743441,8.958116138978973,8.560131757341281,6.740800339937158,4.550743941687129,6.097537692302202,9.652248118576171,6.059875841399311,5.883310972957819,5.204132677905438,7.711958165672337,5.728416324139223,6.7761427962548195,2.496926999181035,0.6758560756592464,6.631595277486401,4.905184595869482,-0.9042991902999279,2.6795253582673664,8.548671404285518,2.534681503042293,6.9341107283611105,2.3794040417569224,3.0737922414907137,6.887161738963669,7.860439316819642,4.936149808365063,7.331779312805709,10.412603510173842,6.166615655860641,0.2428555761313205,6.961710107798432,0.4914615870304796,3.922928418479009,2.8655245700728456,2.8467967308521165,3.1067395515769776,3.542628652160322,6.82026127403341,8.249671135385817,4.432438329482499,0.6614393790775297,0.340619349761609,3.116088869556057,8.052595965971811,3.72779369688324,2.659042971426576,-0.07829977282324857,3.8963612715492926,8.301874945960254,7.180632601813635,7.851080531026543,2.7454307940926084,3.69034893610306,8.995596179005016,3.870587988877876,3.2668459270876076,8.128772817662117,0.5391180192103382,7.163529869057042,4.702294806337225,0.8069624143849627,3.164971041264627,8.303420844919703,5.20433725282048,0.7730034692965573,1.7833215827775541,1.78379793979146,2.7407667911840083,1.595399390098175,3.8105742209857523,10.043406386601891,10.459495138230054,9.730216494838544,3.5251499507192805,7.757211573347696,1.0131705184236925,1.7062050817657786,0.4149661621709142,7.279678356595882,8.886710472677446,5.44985077020116,10.536570813853007,0.71427789094116,4.493035986429619,0.10738666038773209,4.2867519236523,5.215636438878597,3.4657541963404643,6.336975017656542,7.66301573987421,0.731432684029047,6.250509145062798,10.684033063926833,6.995665075823766,7.316533773795889,9.081497850837831,6.414566433914495,8.60670055504384,8.859976584160187,3.869091467848329,7.63722133364125,8.517734235192206,8.956160288142875,5.4761005724552705,4.18630646274889,-0.1589953771314987,4.306015147184696,0.9393953102716331,9.961287230644613,6.197350604406358,9.553289742332042,-0.04694253197001062,7.619160412819646,7.040640745491258,6.10358094527137,5.778729974008092,7.825861618686194,0.4078541469455309,7.0133492002952345,4.9053429130629596,9.826308997656852,9.305424483223273,8.858127427563272,1.0109369186862494,6.095736102138526,4.0979883997527295,8.133674824846084,3.343364152516105,5.534125793087329,2.0876938501640514,2.289668467474045,2.8268755340971694,6.121494519750577,6.5146061511641955,7.455690197480196,1.7285532417924503,7.041982202417479,5.102510530104412,5.162161918241658,7.2994697790067224,9.220654186603927,1.5384902654696084,-0.38984231369631817,-0.3060912723574319,8.707645810814673,5.980620692743498,-0.3726801558032498,0.12758174962830335,0.4861815013558171,4.382971516153488,7.413195946924754,8.620983443642874,6.450515817526721,2.2357503150032194,3.1313168845764108,7.278529536187444,0.7959383600261488,4.706733579971676,9.330703637326497,5.875250362119842,5.413151942581662,3.075525000543423,7.632674380189972,8.668011740929504,7.1551598244990835,2.5210112037101235,3.746494007433218,9.731647301893819,10.115580591785704,1.8872280520617415,6.181241016393965,4.508997821913469,1.0713852960404842,9.079849477275147,6.514014344285526,2.0061857515787254,2.641699383416375,4.941069623343578,9.84521700266034,4.227262971777781,0.9154045003808786,7.9533635943470475,2.678125519365129,6.086337515898775,4.181139718803334,7.9023901456139605,3.891378656583571,5.455703960078072,6.1959962514733045,1.0585738874690898,0.5156352641583442,5.726955514068416,6.690407584494989,1.5527892220599409,1.697170005108902,3.246726015954347,4.391542867058508,7.162000543049238,3.695968909764739,4.9837750791214095,8.439016119543636,10.014577518184392,3.197083305270307,6.4418818235645805,5.216008755323893],"s":[2.0084971564457055,3.4170182356895404,3.332822618861806,2.6961248702233087,3.527137845214341,1.7140690573524187,4.765941728547838,4.633832460467483,4.111759562988782,4.166245339666204,3.3139445080394814,0.5613500111691094,3.4782099455169693,4.164380222005103,2.936223328506596,1.1990986562309736,1.1238180669590858,2.2209281523705817,3.362624239546308,4.1646766150017145,3.944227076398782,3.594521060669563,2.5195828688268582,3.600225307885384,2.513205319267028,4.757263100650943,1.6557251342438317,4.335630490349245,4.99955554560385,3.8995580335716715,3.7332325146596967,1.008573442330265,4.98079954954663,4.791088195720875,3.9920368754487354,4.776266268154368,1.116248750472535,4.4001272371388165,1.211607685542625,2.4763146242761556,3.8208514032992125,0.762055493352396,3.3844784778074946,2.417961348209894,2.7105780158350123,2.726244998018851,2.312102486507166,0.14552629656424787,0.479163570483796,0.08819495560925095,0.8769832918408416,4.981686746670489,0.08794980092923566,3.088446939162494,4.5124396377847065,4.084787855635421,1.6043358668637764,0.5388567403237854,2.3437857499213477,1.9897976685165863,0.958593915094671,1.6033876942012315,0.36971883230832003,2.516220778036703,2.038002732182015,1.0995763788690338,1.1958756182701502,4.136851701098219,3.456801689683553,4.56857666443606,4.028575885809371,0.5517965093987542,2.9390334006770735,2.148471964456351,4.963012904711514,4.118148500683615,2.1062050673300616,3.0544418649894944,0.5446947055891582,2.212126601135793,0.3371036395352156,3.6951135580724728,2.743158650615655,3.5070926274075767,3.3881347703139877,2.8202985959679183,0.06274240061370118,1.3146710127470318,1.866799651546327,0.3666914856293557,1.3527141685449617,4.589520076860536,4.17249658710992,4.086655264757736,4.068065547579868,2.1106579033365858,2.1454036778962693,2.7461193433205766,1.8046421115856903,4.165142382807757,0.83804987249815,0.9275943744341475,4.026673685344317,2.3845462617440214,3.0868856945646375,3.3850400845150563,1.8412588830889365,1.5626232288334352,0.8592795411517862,4.895196893709844,4.704662902538688,4.334855688529733,0.3858068877462173,3.0385327282207597,2.7489268564639966,4.286962198238871,1.015153448027729,1.426259901091238,3.899355031906342,3.7029407694992056,4.614307292782513,3.184218892985775,0.6927116969040803,4.708703170479706,1.9435492319781666,1.7940882787944612,3.8944221678536195,1.692677765042716,0.23509332805794592,1.9030398761683065,2.4469404964279775,3.3231776121204817,0.15329185945197388,1.410351423680709,2.246426802420957,0.856265311712946,3.322024632364602,0.22557083414561085,1.0758980815520458,4.17658156551222,2.7704984638846875,4.109101004181822,1.116419103673535,4.909242317870807,4.659778452794116,4.246859764444241,3.1813428275893574,1.2515167738409405,3.0851191215990035,2.670348883194693,3.3116996727799233,2.460988358600079,0.8504080649123213,1.8289189526383731,4.493103901893676,4.892559092929459,3.403566348172784,3.8073599293326144,2.250756705244296,0.7799921102329599,1.5465191037029025,1.1820280862248567,4.918581846358737,0.6731220578420793,1.1017833424010326,2.2916915313271358,4.58393181179416,2.6573603984560856,0.30764714138654226,4.392795010663336,1.7908158321797096,1.5172406348274736,2.666133697157982,0.853555664602933,3.178500516055313,0.5284178839081877,1.1397714762880629,2.151253843927744,0.7798918470177896,3.1870513720017346,4.4352413272752,4.050232299385708,3.4901256535439473,1.0480578493439585,2.8734470315173133,4.07414226096117,0.6181265560931914,0.18989258131913433,1.691607711053994,2.1104315953520114,4.074860517515444,1.9580339095782684,4.009555828778959,3.570394707638517,1.3547571544517645,0.5907497281256857,1.3970436799193275,0.639322741936641,2.890582452929067,0.5142401863223289,3.5300079575925847,0.6985008274648763,0.15012627650270227,1.73787964488482,4.609172391335421,0.7793784379367619,2.281814661812062,1.6284401578357233,0.20483774354785989,2.6476972790446074,4.721451422641708,3.7906496931314537,3.6273765321616533,2.739701459448872,2.4578978621580005,4.65596239433253,0.4971649672990752,0.7758127842216511,4.1327136750784526,2.5953914196304306,1.5387153055861014,2.113780037962183,4.341508211709016,4.333680489322563,4.600009448828654,4.059676995055737,0.8780420527276223,0.5275424238155024,2.5351439936767104,0.5199963488920756,3.507995538658897,4.520674517352472,4.24398154152256,4.954009387274691,4.132047544503605,3.1986247272296597,4.326876689890476,1.5049610750195341,1.1912722477586524,0.2459243748083717,4.455323103846048,1.301101927368321,4.767187172254045,2.1829494923958093,2.3237780170450364,0.04507319278409305,0.47492358155653447,4.017063261835102,3.386019292849948,0.9853576330463387,2.64978978714137,3.2940236776748364,2.8531465171863566,1.1187700476937446,1.6590699293647526,2.046299194959138,4.663871222211432,1.2652534996380937,0.4376190454911355,2.961490160391956,1.5050812662363977,3.5329043867053245,4.584677095802863,2.530995717318328,2.229012925827254,3.4915377054708974,0.5140557203614105,3.2280520882013963,0.6088930870071418,3.908547012749506,2.3888195113280952,4.286771563473479,3.264385600897901,0.15866145178923596,4.025028970915081,1.1133620390932297,0.4420612736759899,4.670917303506319,2.5430189956253146,1.696467568390937,4.751185553584174,3.0480040565233493,4.366577402022186,2.6087753496558577,0.1418269473537348,3.456705296113205,3.8230459331854605,0.4558073487883063,0.5666298471148679,2.274604745251161,2.177073271495802,4.54809261403515,0.7657861679467726,3.725932980867712,3.912991843861058,1.6787153622625817,2.76218823373223,2.4866590375157682,0.2765086624249524,0.829980220576183,1.8518999867543473,4.737248795958447,0.6515162612727887,4.930156706562067,3.539172302264848,3.9201218519464334,2.503831764066542,3.175896171994894,4.595883769729414,2.375641534256977,2.216997430329688,2.122299067323148,4.890981086150584,2.3371711139976767,4.972407738440776,2.7394829212253677,4.476963095145333,4.657834980454502,4.3601143180353255,0.5498262258883002,2.0677878393367735,1.5413749448532499,1.0234844955857347,2.2824749695636393,4.539595524967199,1.0043656698595171,2.1374143544031856,3.883516948923369,4.873934537788335,2.856511679867446,3.573364075232772,3.5175396678354764,4.778008177008827,1.8304516135490667,0.48508351338101496,4.11136883149419,3.117668522772666,0.8344826649127701,0.1542777981063037,3.0653270542447784,1.730045211361576,2.3432815060213708,0.12755796674915776,1.4844517403180235,4.358989907735479,0.1596965270349726,3.0376766808885733,3.150430998600867,0.6131878893885934,2.755729463818728,4.650342803425699,1.6467783594967644,2.1176286578084924,2.8650200783957605,1.3980662194754023,1.316002111171397,1.4554112094239657,0.28573130970295013,0.4727935273693562,4.01852768387362,2.747200535828276,0.5067253602493649,3.799670582574579,2.3356805581728146,1.896576938001775,4.534886481526353,0.42062221944487166,4.1449689590832115,4.475635752442515,3.180563972081111,2.13106154958722,1.2475276677071068,1.0546090536939234,4.794224019688552,1.7818250746961195,0.3692565359330868,4.132945910182627,2.4104747787240077,2.530253213362305,4.688363055249697,4.399842696685367,2.716406513739482,2.103859664304127,1.042881239526191,0.537382308560238,1.564996214056984,2.8132632238098876,4.006349906035043,4.16601635565911,1.2902521353529628,3.670251217471421,4.6944039883532875,1.6848344543460847,3.3508978180971107,3.98135623714429,3.874140635519787,3.2674939087809394,2.6201582741797322,2.4339981814918277,1.9058037862746635,4.715113215502468,4.73919469073548,2.08593951064564,1.0541343594256236,1.692436225678433,3.878095846910279,3.3008027503970325,2.0088124872974022,0.14991513630610687,1.064296218449673,3.0052789301036196,4.677972819273552,3.203927225221659,2.0986580656317244,1.4673204027772324,1.2378934755421844,2.6449272633164167,3.6544696309316302,0.8433613134397389,3.511821644513663,4.355286986831699,3.8880625891741714,2.804204486663171,3.4976135711512066,0.33795121567762876,3.071802333976735,0.7284408024228883,1.8594142993752294,0.2432807841978779,1.9996936618018857,2.3925754778321426,3.1008888023366934,0.6800154499536493,3.5910629910049363,4.255863037299924,3.324704883930899,2.279441227913288,4.754982505000987,3.5138715152661404,3.4849572753242586,0.10267302935328404,2.953715263069776,3.8336076823190313,0.09816789795113134,2.1411359781257455,0.8877405114500048,0.4572997064819473,1.221656825934736,3.7359494018169848,3.339968507854296,1.2404980198206816,0.9086640216008157,4.882159576641224,4.222452162990159,1.5742620188302248,3.6303133408451114,4.529607755655189,1.950452124466443,3.0213968806135707,1.3283028405237796,2.1570471328622807,1.7787768080746558,4.979502042997382,0.77764727710809,0.5509570241830675,2.9277787083125006,4.749795980443542,1.3008582432634197,3.5984555195797063,2.5119183790006394,4.527858259136819,2.149191668262529,1.6826146383948481,0.2510323832294914,1.6403564644516766,0.707247005793924,1.2484497009940554,0.8001158512823814,0.9389046635711407,2.746015707682805,3.7403307199901437,3.6527618353958227,1.6631853337245994,2.9532501855516946,3.2288241984165857,1.3794604879126693,3.8356317063424483,4.219507663132035,4.724695031103151,3.659880630932244,4.052709335762632,2.101493800974973,0.9076657778811781,2.789015031108162,2.1873187477332676,3.142013033057902,2.0533359412749075,0.8654154036618844,4.689270504083639,0.24661939152111012,1.6922391473300424,1.2017367494026798,4.079040773903979,3.1655590036207792,1.0456255933410286,3.4467552096642673,0.8602543033618992,1.1914432107924477,1.704751881055061,1.018548450836111,3.867992104370125,1.2731972412012327,2.306369535647833,4.932756624998415,0.01137576334382051,1.502429273118152,4.970040888777688,1.9086671964096846,0.2531357870397344,3.400796757479514,2.840846711245476,2.47173961842904,0.005519603591962463,4.592995158222689,2.870672363724055,0.5818227762024053,2.8905376372199045,0.3628203334898761,4.947471133374415,1.3059016828643655,4.730296327127971,3.8900288540345485,3.088783272901532,0.5950356351194763,4.145073948067842,4.990420645838835,3.950892454939857,3.010679362464396,2.7829546262911165,0.4116198244382929,3.230165215454479,2.0601357242818583,3.555367075797504,0.5568724228624444,2.9761003020510444,4.527652023146874,2.575440992790562,0.8372286063834777,0.6108520709297938,4.418585441033138,1.8659928012234328,3.2677730325005703,0.19282559798057153,1.5403041003343476,1.784034130449711,2.1895789636760545,1.8018871708997763,0.18773516556614966,3.3262242647154503,3.1774690084323143,0.38185458789747995,3.983412426901994,3.7820798673208946,4.472688395084388,0.9921554876112282,2.969925487677807,4.450212455974337,3.2627083210402477,2.527873494228042,1.6848678357234192,2.6805665058740527,3.4871722416428677,2.282175453716908,2.319668786645445,0.6515311327523576,2.389130546407471,4.286193895703393,2.6825473693146273,3.5152431082742828,1.1506397052695505,0.39271369161279157,2.512184251524774,4.573716905405406,2.46434936310873,0.844166773804923,2.759181365704977,2.1533070042050073,0.7138107809696315,4.528138348332078,0.6574223569293058,2.1000401434669325,1.8727446128443948,2.633391818377099,0.5322138449928271,4.531878112309262,3.421397542537543,3.0314552032539366,0.977255055143883,1.575018996831783,3.692400434686377,3.579101759178398,4.861028182117697,0.0038499287490967316,1.28417930194475,0.6373807687500221,3.314145029033264,1.2454000497423368,0.899923708873388,4.120030247837643,1.0607042730171123,4.437803044261422,2.34153985158726,2.385822393545184,2.1213640309325177,1.4894087565328529,2.986527983727173,1.325166192350521,0.923217606527077,1.453060071611827,1.2686370554258308,0.4669923790826769,1.4351493656781655,0.4388340688022119,3.300185599672183,3.731272738317648,1.6993776932557902,0.6561637932989717,4.244739473136149,4.671844854974535,4.344053108422454,3.2136533464802652,1.936130879034712,3.370485557849036,1.944671501419153,1.1560172886800968,0.5139191961621403,1.1680400479213293,1.859038290179229,4.673147080689715,2.902439730103538,2.1945354634990344,2.0678592914730762,0.7811267403566313,0.7935526502171619,0.45187535554601754,4.936698895052948,0.24854456845106787,3.731965863070931,3.5312567115719737,2.8860553238958597,2.2268912944177344,0.19723042415583314,3.2269374188127586,0.8767838127060279,1.6167891992585326,3.36436532335177,4.731955019667698,3.1565361637664644,1.2421135481789503,0.8537102957034093,0.6000606759329374,3.1966602344486237,2.578716732527082,4.555310158716628,1.4299026449951124,1.7320929427673737,4.831667287266108,3.5194215707536616,0.4650534096301451,4.836548919736704,3.545811025806068,4.315403926217357,0.7591854576416868,2.350956007051325,2.971318393127489,2.906628358573741,4.776000373421456,1.5101879591347456,4.35077465915165,0.42985225403670113,1.799708502620888,4.999954672485073,0.31220354589296284,3.244697596905055,1.582047093138973,1.9373416664107035,1.1235869625438577,4.706636276700134,2.100851543279388,2.072033541123617,0.7091676506615452,3.476793444908223,2.154845030551856,4.289814475424915,4.133719463601779,4.747539219269553,4.257110478540494,3.11653093978274,2.2864325273021704,4.013524336706771,1.6576045880050227,0.6011031736437256,4.0232924767019265,0.37379502307540835,1.8440028149522658,0.5448180356699506,0.3303516561620945,3.7772155207642832,3.9752796568582935,3.144018785018109,3.314924611822775,0.8991660008700708,4.566359121276863,0.46532163365860857,1.1048767467189535,3.2340476861463685,2.2561866521221408,0.4460567123675896,0.8652513826786834,4.430368486794823,3.23544338303586,0.9519922800879466,2.302525646523054,3.9789538110976554,1.5709393960317064,1.8568668164916702,3.3312199111751073,2.9700326203280634,3.9438283436801047,3.5815233407941003,1.2976054943949444,0.21589706977960366,3.366135805296613,2.6409805614671598,3.387975163643101,1.7553915836046274,2.751400890134902,3.3875060768675302,3.049119377482461,2.0867132830219037,2.1355066735386896,4.247555733908835,2.688766774968956,1.7704987493578328,0.5801347019357828,0.20905275274439528,1.5386510565440825,3.98450891458583,0.2927119309532811,2.4396038620624863,4.2422831760233475,3.3742634885423683,1.8836987984908504,4.311468707060985,4.972699274863995,3.4853563121056186,1.621626799080953,3.708947577319318,3.522722439666355,0.8040890186845995,0.04758052135111379,2.7099919727616752,2.274999390732386,3.707420506870178,1.3235861607726918,1.0473177037552972,1.6019155788918071,4.9403375936701845,1.3499237666290032,1.3737578595982214,3.2710444906479,4.331396543684538,3.142899914236219,0.07035377468851967,2.279902252987649,4.009738286135576,3.26367680736944,4.6102629308727145,0.17897086823650543,1.271020389316374,1.2017577796526624,1.77901012782685,4.674522362670016,3.9366237893087854,3.6705257069282426,3.6964866089941504,0.33239973941002865,0.11451181247748465,2.058515370619196,0.5357937034580229,4.322661916715846,0.7525203306085471,0.2486565634424065,3.18145340833727,4.305834343652703,4.984982981344253,0.49092683642898427,0.10683879842562916,3.1761752678739876,0.319900496794735,0.13151557396493763,0.7901141241003884,2.842895256056633,0.47263737003385486,1.8338999637435072,2.4513374762457163,2.6938453563412046,0.5321991408539994,3.8898059130257834,0.4690373399765635,1.4284897291559395,4.853786678920873,3.8331189051025962,4.2335314083824365,4.3117989117601905,0.7271661389544848,4.747880827363598,4.101362670749845,0.0545437722522224,0.8102650423974989,4.826372524856032,2.213316454506715,2.686813541710423,1.439948261258649,2.719456811576262,3.110760203907741,3.9131881287415293,0.37837255481068977,4.013950063361026,4.901664385722977,0.1217071151162652,3.0859430175992397,2.4811087722887706,3.2795964614955375,1.4531703753436498,4.471535416284494,4.992130050172406,2.136091809274301,4.960953478495268,0.427627723827525,3.5386621357333548,3.4688194084422372,1.6541484146991503,3.344775226109192,3.925414461264821,3.760630179383122,1.930267471919338,3.3750318053458206,4.5704084714078865,0.026320820525502775,2.1715497539241646,0.8297921143867737,1.1802879482449657,0.6678901853550989,3.4640170445241902,2.2542645489623614,4.6590661575981605,4.550580863861833,0.7465642038526998,3.0372037254806505,4.643330736971105,3.8566531681333736,2.591131785424653,1.5910587164186873,4.687565764252291,3.5123573574317692,4.731795048221029,0.8295044241080851,3.552294372594469,1.4664632914816822,1.8845881004118048,0.6530196297712831,0.920565826166424,3.656467331243125,4.492596973241282,0.7553102943083412,2.319464999032854,1.0546524940838753,4.67168752270395,0.6426878162547944,3.639068770005963,2.408636816709161,3.0171831159863816,4.019409657047572,3.2773422383331106,4.695074509501138,4.466421041584329,2.443669046883704,1.2675683597273912,0.17776988009233774,1.1741577005559511,0.14985706489049289,4.1583594496475325,1.2177561735974218,1.2591034757592134,2.9419879595374665,0.4200062432064089,4.49089739324703,4.454379858314498,3.0944669804073346,0.9308026029811345,1.8709995773801869,4.591741278504966,2.6127297195374077,3.499537013111228,2.8259485759836025,4.816652417365538,2.417109822640665,4.3133573191266406,3.246912641646056,0.04854405889654245,3.644318114452576,4.92206189061249,2.4102622133837723,3.4408767696534204,0.633236937353383,2.8841390422802404,2.7259596810424327,0.6160815657746943,0.03519675722743809,4.589665385974785,1.4269597545274526,0.32252400104625933,2.534671234312309,0.29651255023104395,3.126285786948003,4.685330029769145,4.267630812305389,0.751177261220638,1.442498513511794,1.132277775686732,0.005735470196149839,2.352092507018649,2.1148130156862077,3.2200835757410076,1.5912755811717472,1.8934360434418962,2.070388432505551,2.4183079393901785,0.5213762357310103,1.3533525933974122,4.651146622347219,0.0012454142137274804,1.925525341878641,2.9605996586420114,4.810643339513724,0.15066086444829097,4.141985349220291,1.592947613438792,3.5351591445221886,2.4215940116501358,0.3724629247135447,2.778066046504489,4.147193034408707,0.5165968542171206,2.607911426656664,1.8561113827544795,3.2773458845250913,2.041794894237837,3.4834069849021,1.5370886622455182,2.8178921288851932,1.2517357339150947,4.303007281991658,1.7440169080674706,1.2478723295246141,4.794357453712021,0.6566272104575355,1.7676055847438588,3.4833693241041406,0.11147179784303796,3.899683325991142,4.144250809528986,0.7238300103126127,3.112510807276453,4.422676485326692,2.2219698582669336,0.7894840576474682,1.5675184783102403,3.0861684897194075,0.20622176170549733,4.4576752290624855,1.9521441517290339,4.897278624755512,2.1542872937524726,0.21949954605108513,0.3641550641367175,0.3173778762156465,4.566707519475659,0.7130833513446511,0.38115423277865546,4.959483206212124,4.128049301829609,1.106539623519689,3.4821895367310853,0.9100398711163971,4.289082988030591,3.0458483307922113,3.4731072156954035,3.457681534131586],"p":[0.9963056178928751,0.14423414652530098,0.019872919674893907,0.4859272690192846,0.6893157977095239,0.16450943808204044,0.5008199630554124,0.29486657766278324,0.0858780059282136,0.4861012191071423,0.9309231337849124,0.1676820415321194,0.04330130978347424,0.34302217378379285,0.9506913873099829,0.7022050268077238,0.651047423192215,0.11084049086513503,0.5720187323741366,0.40718719843709583,0.11580279215061529,0.15179673813856387,0.797682456734276,0.5066938634610889,0.6686428301460712,0.10795135618872376,0.5348645291032101,0.625545075047258,0.6962568834406391,0.22300020631122042,0.2052009777987307,0.7936792527203671,0.2761420559261494,0.14850129649448185,0.7396708597356259,0.6307971190313051,0.10427460689932477,0.48617002560780564,0.627101681070485,0.18745043333093503,0.48174022554631435,0.5622358801466552,0.6834284413107246,0.5265805718536849,0.8610117329829838,0.35338791894902344,0.926061488722034,0.09403636162578355,0.6964015096779221,0.6353788855350591,0.9587175635157068,0.17105590821201955,0.1650258628862895,0.49565185920425536,0.36632079866195055,0.6934077031596619,0.9926631825328367,0.7158040143565085,0.8137657638931781,0.22327272413206156,0.1288458237064054,0.7560856454520308,0.9625379023386944,0.5615544495178912,0.9414884550153251,0.9883806447920045,0.24095353289171784,0.4894122257648219,0.16176539026406256,0.03907437222186183,0.559821177185915,0.15713708762918732,0.5742500952325207,0.9873014730827867,0.869397478879069,0.6528274351817007,0.47730122066792924,0.5464144683570311,0.7090315450255493,0.2381236390135526,0.36348705149068516,0.5785698368374368,0.7482704659510733,0.6158882379105479,0.36712581275626044,0.22645996764324328,0.8234634587836145,0.9451974549091462,0.7855282550582212,0.0005732318027678041,0.836991440532362,0.9610808959953872,0.7420819163601267,0.21317808549884165,0.1605941260012349,0.3260817035740107,0.1123670135914363,0.39568503173045966,0.8240580692665738,0.6843071084148127,0.5181112182320831,0.705771037127696,0.8808645278291496,0.729039388010146,0.8263082238853978,0.4124539547173143,0.16622302952311419,0.7046767207455278,0.4852502109004073,0.6324851647987564,0.45498432759610963,0.01747174377472005,0.6794572021749332,0.04505891843714438,0.6862112362317443,0.7541982091033739,0.44689845620805135,0.19109738594482129,0.16716903351189072,0.5281819021467562,0.4769839605502628,0.04408450042212042,0.551833181904066,0.05424814959871882,0.5349875705550877,0.5277282175553353,0.7683817658169527,0.058688790699195525,0.48981725780715957,0.038148803571806056,0.8020368655210885,0.8615486178196701,0.8664320668832075,0.018797531573987003,0.22754296191741474,0.9686878736599094,0.8308881278880078,0.7081268058115286,0.05851468963602424,0.2821420235383947,0.5663831314913235,0.6701990745116577,0.4993535433413343,0.5084438944863776,0.5689251852302601,0.2063053247932427,0.8364559302066568,0.10946472509010796,0.9294802618289071,0.5249334984637286,1.4960428593724373e-6,0.23902018863094887,0.47302889930547454,0.6329724271481951,0.8142693543390991,0.3508089655307354,0.7956921186762753,0.23128399331541738,0.2882460315089441,0.38564905697108154,0.8087604467021685,0.763414260878928,0.4725808502377131,0.036730625079899104,0.08173762701029319,0.4862733750880721,0.4875347383866533,0.644989122723302,0.7648555433730433,0.20259933421542686,0.6179661889311665,0.9401651134911593,0.06366909826630107,0.06931479745612212,0.836488175719269,0.6505249077935256,0.5076656485014273,0.4126382752343434,0.8976232496291328,0.24024793970700076,0.7080913714337089,0.677900933048339,0.7665248296815237,0.400725379809725,0.03835005756511567,0.5052289791295927,0.9719346361523922,0.7996335407096724,0.6295188589113769,0.027373321285699026,0.13456246596679455,0.12786919319381918,0.6567077177777527,0.43298810944843624,0.8674553956124702,0.3710104069640623,0.5551905958480743,0.989605309357475,0.9249801946150114,0.266148028781807,0.9317017693969549,0.14456383576901222,0.3874673180013941,0.4251090051673072,0.8968142798529433,0.682416911508199,0.009007875065652371,0.5705330861768636,0.6429631024081519,0.05842972984073325,0.7988644602083073,0.011772070961962422,0.345925618771145,0.2680278237304192,0.3702861710499088,0.3896430399933404,0.6925261107408753,0.8507599247323714,0.12646293363782268,0.06655394035288831,0.9115729605939036,0.5390005809084386,0.0643015398960105,0.38238508833067764,0.2076401104261505,0.030675206322960502,0.3801395374053207,0.655777565548838,0.07150424612517248,0.1727224025727363,0.38312084801508317,0.27396515282320366,0.7921143417642469,0.8338082061104983,0.3147884615883434,0.08704266376781056,0.031198620908723607,0.6433551087238232,0.697632869779834,0.5696677197214277,0.3188688809570315,0.3609768892998977,0.5936431512166,0.48083566435956393,0.3866225496313549,0.2346897700155166,0.991328100762856,0.8352260769792081,0.64927229011239,0.060142885878970764,0.4893767853842623,0.8038778937167297,0.7717693917660042,0.7324209756099478,0.8493361908573058,0.07348960490379897,0.25130424459579337,0.004934908181691844,0.14396557638889296,0.6673071369366583,0.6260630981123372,0.19232232897760349,0.7445508601160882,0.5513314301884702,0.32550112045567303,0.39026937199714706,0.20286609569160907,0.41819278017339423,0.8460675037177787,0.25547788279524375,0.38582199173973986,0.06870635205013054,0.46689074917791906,0.9006053560279774,0.393155419319442,0.775324871613372,0.12043780211280675,0.6135911702605952,0.9311031212727878,0.9523610069362654,0.22823992804490123,0.367012121846537,0.8842256754735047,0.13436419738315908,0.7746838353388499,0.7780827720000727,0.8410751242662771,0.6829713506108621,0.42316033379152196,0.5127684483752117,0.7094296223704126,0.5736447239468652,0.6411077053796972,0.013269650667304456,0.4067137020036429,0.4640595186700225,0.3521571695595942,0.5174827185951119,0.4783886328040625,0.36703643195582103,0.8208972145704083,0.34311540835829857,0.5290157660613819,0.49344767008949053,0.2987197282131857,0.18719051659273922,0.2041463431493833,0.08203464141895811,0.6866159703033798,0.2216146824266998,0.694067990214482,0.9754478651895198,0.1993424495231806,0.23866663453197567,0.45714083255635973,0.034201804951603965,0.6736453254806725,0.546219059931982,0.7282971447832185,0.33389273573555167,0.677254707576213,0.8010126843152374,0.34338494334262726,0.4334249063720135,0.7843006311003689,0.7215104885773229,0.40252238857241385,0.47985873608828666,0.31290119376356684,0.5973877268454593,0.2659056549234484,0.32681850520860056,0.6378362229854857,0.8446671298900832,0.018077091175572324,0.8054290865854805,0.3699869111983989,0.6486161088073965,0.9887863283806271,0.5964327295934473,0.6320108154023294,0.9253983639121275,0.8504129607847835,0.6809012984504372,0.04630237347935462,0.5292213015688048,0.9789778130289459,0.03385119605951448,0.24437146280849031,0.1752898314290141,0.29808702758374306,0.22518615932900032,0.29628062100068053,0.7699098071526289,0.9824101215231695,0.34817246310624905,0.8939400379198998,0.2869476105898261,0.9075240346802531,0.08654473237864035,0.09874800636191239,0.7575093432051219,0.08761765311171277,0.5707757385878371,0.43163236695838725,0.5822397162092956,0.5364651649307544,0.5397821444084718,0.238313493626217,0.7125363598211532,0.6764987994459613,0.6480876582775879,0.711685660463597,0.40014770487607576,0.8333521871392602,0.18993183928495738,0.24235193940197952,0.33113133765253844,0.1298572245506937,0.8661338309948245,0.6430752738165806,0.8198488074999191,0.7377525649742953,0.8175838469135539,0.7096449773616271,0.6992091492220924,0.7647690640098637,0.2671929656811243,0.004569771612416451,0.725488131871691,0.2097379982476859,0.1599542980833537,0.42002599622482895,0.16775851023590516,0.7496694457240469,0.8062389917927844,0.539593394039271,0.6125395613750235,0.23838960954514166,0.07990856823420134,0.04556407997506451,0.8594591291470928,0.5860301664546566,0.19902392222781828,0.7817631351155396,0.5701591339252166,0.752398528366617,0.03257722437374433,0.03382253415269387,0.7017385192703369,0.9432050420836087,0.06923151022761287,0.16130278717914415,0.34322209460968245,0.16941241961845455,0.44778186936016784,0.4609781720224919,0.6980592070803893,0.3198404231821428,0.16812894971118997,0.7351866210161411,0.8965902991427406,0.7919678202696423,0.7852139839473924,0.3965957319250102,0.9548738088485105,0.04326972599550616,0.4159199974178289,0.8978246539652233,0.990178358620198,0.2585241857203737,0.1038777792957728,0.17405193053778523,0.6802919073125562,0.4512467680167118,0.865532633246876,0.8973180616512282,0.5134406492234562,0.9747840725194235,0.055937672744458045,0.8183621474322675,0.43071824312577056,0.9406390319041023,0.9102907080761002,0.057836941585719615,0.7594598336593912,0.20380055530543273,0.15820678696771795,0.08501304570918711,0.43366220604413175,0.9016812135628556,0.87246306260529,0.7056800113792947,0.3406250031392333,0.19933376659912594,0.08968879825382459,0.38863037593929506,0.5601070474678966,0.22807468465033076,0.8423892993879081,0.9810112087285499,0.6067253228293439,0.022836169824951957,0.36373722716523704,0.04237984668944561,0.060032352827510405,0.2049292764181625,0.7865592307840146,0.3809257432758013,0.16689056525982027,0.255655512668711,0.7107912013985564,0.6892050596908887,0.12804212719445585,0.6812600786336966,0.05681834094789284,0.3296633702455596,0.5213901636929406,0.8150474111767576,0.732371623953262,0.8601968490820318,0.9105057984580924,0.9908006723892546,0.21214962009305216,0.9643482807149675,0.8257321040287475,0.5352721818808934,0.03523092190015298,0.4881077493017032,0.47791869012116694,0.15421248359414386,0.17424386959466998,0.6017541893564469,0.1388859797695543,0.21551458714863192,0.5742010617880895,0.6091101878969425,0.5450802771701786,0.32074888481397923,0.23865981109012235,0.8404533109767207,0.011264798347987215,0.10699014157032383,0.5780982532510868,0.7651837506064427,0.3902980420364215,0.614587526068171,0.8491361289041472,0.8888029293538602,0.08134704485112954,0.1696403012758254,0.6114936477963158,0.06232172194897556,0.9653732788494196,0.6537110882241415,0.5294148334320508,0.4508121869641064,0.3848585127931685,0.7422228157654183,0.5912849058654466,0.9704974455605102,0.27607049838974107,0.5689263604476293,0.8857025740161151,0.06716847287017114,0.7632224031535411,0.9889198924009992,0.3730240044158135,0.43565507272728765,0.6752586658614084,0.4825401426716278,0.46624934113488825,0.5474144674371839,0.3731642219876681,0.06538724057567546,0.5585801817398643,0.0413389172082228,0.6079917797849588,0.860635107739806,0.6625740502892328,0.5498479469330482,0.9119131421242548,0.3907819472004659,0.23224314505363952,0.9032790242804161,0.5041476226753159,0.9808551714901215,0.1749616659869453,0.24691806036413477,0.6955981176133794,0.5386031883262032,0.6897413146368025,0.5803716496800488,0.8239779592942422,0.044494149852603915,0.5441881033804779,0.7598121331251702,0.6349599324119548,0.42130444640540254,0.03678558593192194,0.5640147067652541,0.9247005812408018,0.2516701142685023,0.22932732361473263,0.2276598159987131,0.9138212828931309,0.9107704396930976,0.11418298746428768,0.034074389570266206,0.6492449104618314,0.8447311228417664,0.23323150745554155,0.5717473739935715,0.26733749157769826,0.40336666590946013,0.3426130194919925,0.9892856998097801,0.18236591407183322,0.1366136432701921,0.6978277798774473,0.9273775648611491,0.8036589528189784,0.5148377398960806,0.11514097351501618,0.9540809256135285,0.5150186656381814,0.48968270817153026,0.07792133119681188,0.18438252529655075,0.9245704027481085,0.5489970725279238,0.4113566146597021,0.20025285976132845,0.9375557815632349,0.6486034334170792,0.7895970897045876,0.6356391220916848,0.15137020876290874,0.4646588606719635,0.2796429545589074,0.5055110844056039,0.689286454907166,0.9474441033095382,0.7370810116260211,0.40648836818102496,0.8865358240449916,0.7424480801562039,0.7649905244785942,0.761060401713141,0.11245476438819879,0.2125502593142301,0.675709747103753,0.39422546622010923,0.8775289516445282,0.1718446798909723,0.20017546776773165,0.8889672574008938,0.7719292793694561,0.9267919315570687,0.2701574901228707,0.429098516494818,0.841732214966844,0.873257837264364,0.789581353467327,0.5048334233121246,0.4741341299800095,0.5138036747362289,0.2520944650610675,0.7347074718785094,0.9662400054654718,0.18521101836297094,0.2365472083490816,0.41404023584487404,0.8025345198488643,0.7533845657394009,0.24252770162222959,0.9754842676882505,0.06887651832338726,0.6870120540377247,0.5734672158402847,0.2652241858371831,0.17669951797936267,0.13929809166146523,0.3442179392052309,0.538445464421349,0.3278230784620997,0.7053033193672269,0.18681293182279934,0.4507863142907036,0.999485331896173,0.41545270801496903,0.5320850018885557,0.9469593190711194,0.20515230153460973,0.119421111407505,0.28094392074705343,0.3801004208321783,0.13300742711430202,0.7130373461163202,0.3576102570244162,0.19228447676482374,0.5503982760500101,0.9329594680472011,0.2218847422525585,0.6099921584817256,0.6137480671759312,0.9232622019869263,0.5540917189026546,0.09879641021009045,0.7391589964510346,0.9900155753907609,0.278386443548974,0.8980088440755514,0.2679700181383535,0.19945588881671306,0.9717332344248082,0.9573779581460309,0.9456443482008339,0.018360570591986924,0.8603056698636808,0.5840633341204762,0.4692057207582605,0.13067441980120287,0.2342408150134352,0.45024128130260666,0.809416836987439,0.10860405875188928,0.23440435707561136,0.19883350763474628,0.3190392282833132,0.5078722237940752,0.27286155046992544,0.08614147580464415,0.8878373264384514,0.1908754186892565,0.924351192608426,0.7744035454366822,0.9549243427186582,0.6388589760889374,0.02861423415412312,0.2717641459654676,0.95557883168869,0.48790070163170207,0.06365150240441864,0.12347371755885383,0.8664612929479398,0.8842425009447035,0.8217801695991687,0.8221013275192921,0.4225943467034543,0.4678994511765888,0.749402998511222,0.34379108518030277,0.8253665148597065,0.9442135438847712,0.019549762254009506,0.17654958159008172,6.601181128162992e-6,0.4793785712113021,0.4101614410314125,0.4913374719075658,0.48280692937576775,0.9929964668706281,0.6969366029885802,0.003052867592827191,0.3994350805582543,0.20914271783584626,0.02071256357337803,0.6050135437936346,0.9615939616014102,0.7248910527040529,0.4702670928107986,0.11335537702255927,0.3827750216456369,0.061998102588550985,0.9164160115717683,0.05515523996129135,0.08127962188482751,0.34644068072839085,0.4407751373193014,0.064110606833923,0.37168097009999257,0.950884119083585,0.15797281920029826,0.10865508421315684,0.23337600702882755,0.16768316425327345,0.7176303978855327,0.15342532421556165,0.16776048234014218,0.4470683710361645,0.44642716530257487,0.1846744690415436,0.8972519071772951,0.22206688647482298,0.5863582001115222,0.8329330939432567,0.943588866789151,0.35977806657849287,0.39306746021219174,0.9333151995131725,0.321234108440021,0.05538841710011222,0.5831015424485018,0.12220086256498552,0.025590569586853462,0.8412972305326474,0.09517401561287664,0.5990734420842003,0.3620872271523037,0.177754566796531,0.3947265847626811,0.009828247873114648,0.6953620782771845,0.09960471986051278,0.9064203930951995,0.9190975393366985,0.2994239984868745,0.49207620992119594,0.6437479593764295,0.7844949259708984,0.5609389084661554,0.0789557890178314,0.6059831866704934,0.8982305453535575,0.29578475209839494,0.7008516686529163,0.7276149239768916,0.06852115863674069,0.330998447155499,0.40461494615834237,0.6026779342113455,0.5043089594269408,0.8340491755945096,0.13580741761478898,0.4178212622731534,0.5442683000695923,0.8083993844150279,0.12448042506583357,0.560900105851752,0.07201937112559853,0.9963337216589292,0.977036816605416,0.9923986023858948,0.43413594665460997,0.9059593279246076,0.2747231961073151,0.14376028291824117,0.09028816009984086,0.8550011613605049,0.9484024461331906,0.19983368229427922,0.7294777063876088,0.9065682744572081,0.1536014075781118,0.06911855020072188,0.7822957205807206,0.5818737965427225,0.053106250490458695,0.22638729271512692,0.6677264876684981,0.851517350249509,0.9696866778628814,0.9565532548556712,0.14648662965565862,0.5876754138736544,0.6181049696002083,0.29604536256875,0.10788323035358416,0.7107535288164459,0.23425802008235475,0.8574136361018381,0.09716221315538909,0.43973677468318284,0.045863120874071406,0.07906977578769103,0.5083797362056435,0.6850560327837714,0.2057833017088806,0.3444056751078377,0.8312692210188306,0.2605177148537039,0.05607551155223556,0.7639314189497677,0.4742126737381469,0.3070814240620412,0.7264269477633369,0.2311169466251095,0.3994605747922677,0.15092583338514554,0.5477069168743689,0.07235706882805992,0.419485333767899,0.7129968973891538,0.9938382679141342,0.026160292910025973,0.016190871313943145,0.611136074142185,0.6464716237119725,0.14949739887859992,0.7134925163830061,0.03323119413072706,0.9382959385183964,0.39450755637659185,0.7554639786849997,0.6416933765262567,0.6974486836430283,0.3628450538481285,0.7673884712127197,0.5783577474987152,0.5209869281022099,0.37310986556074743,0.7120816266711876,0.23380021228175618,0.7282426598216745,0.5932071705526576,0.9246745474202198,0.3979663524200383,0.543638883101965,0.02109227493627297,0.8570383208617085,0.979543440268462,0.7806736601901334,0.3648651236027116,0.8031894426181161,0.585823514922263,0.16742264248211658,0.8042627447249169,0.14235106580525336,0.6992835835978717,0.8072022537817649,0.9844942002244668,0.2715501468047212,0.4858922131240835,0.9686237872890826,0.6184443550495979,0.5009284807954266,0.5948486927309244,0.8870343796827596,0.551599441387302,0.07570104335433347,0.9791167621532773,0.542527108071271,0.7427257092433432,0.4164563288625025,0.6155795499281518,0.4499735690277058,0.15858986071427572,0.051682261412166586,0.7922187639276741,0.35086327510742255,0.8694326717952268,0.12922013051774672,0.2820743320538066,0.06838421976275688,0.4811920363808839,0.4643542934794742,0.9942710217439501,0.22555645630836874,0.25738968073286217,0.8522396777665169,0.2407642645876371,0.9283036279569963,0.30119813729940037,0.23006344610641838,0.7104222603862367,0.6788519680959721,0.054849344038525816,0.11365356716286179,0.04282499060990186,0.7958173337445973,0.0047427118933554,0.21033305100223654,0.618347250449345,0.20749673192337514,0.8657495847794532,0.5289378091156847,0.28468290247080597,0.042124585870451536,0.13206149763822772,0.39652854316562514,0.12534223552831025,0.07941281492024466,0.6479718656384139,0.7363340090295287,0.9495460456942082,0.9781607489317501,0.7143627011019968,0.682915700023982,0.19544122286732502,0.7536378458892794,0.05872745887047914,0.0714213876393266,0.534515694799222,0.04286723930948866,0.0632673493739373,0.9620453341155759,0.5404029552694067,0.265270743281079,0.11082727888598809,0.5386312546389038,0.38741274986991026,0.8867160019998821,0.7976002967488065,0.7638850498421026,0.4989947921579341,0.5443325896217026,0.07414436990237117,0.5864473312173817,0.5998272640675237,0.715730973480323,0.19400411079127844,0.08202666649665447,0.9943149719018307,0.38119431889651256,0.6282900950657702,0.5003623736368354,0.5968287294143535,0.1463201938757961,0.2702838922351398,0.6576295667040879,0.6875262047600099,0.006500622541716572,0.7398725808688782,0.029037390812185704,0.748459029388868,0.6757166459843504,0.5072689664510543,0.17372435797104302,0.3457722744032672,0.5737352335880466,0.0790303576950413,0.9200583548289967,0.3226709089017217,0.7714624724294696,0.7054788165920798,0.704151123530113,0.6647443770330437,0.42827643137673954,0.15783737611886828],"mu":[8.629716132930703,4.805472553577614,4.899401304049675,7.03238696143104,7.363476106179241,4.034072533863993,9.930127575032344,4.5289857899769315,1.9458836326285023,9.96588121988226,1.7534399443373094,2.570232869908411,3.5099591746875025,1.311829886818987,9.943678565054462,4.158154070293234,7.059404171728401,4.712406070072519,5.80467916015154,2.652997933673551,6.842433997289488,0.010754192053494815,3.8809734709127364,1.496324290788853,1.376536438422451,0.7732295206645334,4.324381834249548,3.9714256701779993,1.7942666700325782,3.9581001258027237,1.8158786608724165,3.323127542109634,5.218590965151558,0.9611393743376029,3.7421844015797245,0.42247195531356807,6.900950511963635,6.080850313381971,1.9018665995567008,6.909947948655793,5.975694539286078,5.09412459164084,4.7159798531172115,0.3088379832683352,6.108240359685706,7.840461845692131,8.191501123327683,3.5568827291956207,7.636078853778683,1.4701697775830969,2.9570157464821145,8.26982031465077,7.6019719021130445,7.773269476554006,6.802091886363493,2.9590720668243553,0.674933244695981,1.1284205019717142,0.0686847565033033,9.061677893128133,3.6614610429659455,8.708555963985368,1.3720783929464053,8.801944548318868,5.152050180152683,3.8925661394919087,1.2158958410179,4.355637149094493,8.736081809041094,6.067354658939454,9.434052610818306,3.5275693270928943,0.9258322115543538,1.89461939402227,2.7586245974857904,5.512178584364391,0.5333554161486753,4.249306530433765,7.138503511031584,1.8669525571100132,3.629920481393687,4.649625018832606,8.222247862746881,9.359385159681782,2.8951376773635484,7.859328145648384,5.568050507292124,9.538617742244234,8.399571026885098,4.871148238907623,2.2822582334604657,2.7066673591459733,9.348466376039061,8.179128030735104,1.8505953401833408,5.99653016664125,9.487640047713716,7.844874860986328,0.5051402002832761,6.284713539369335,5.623705103329328,1.6859445927541916,6.306131463966757,9.641948929416873,3.882879185013677,5.4368499008486415,0.0828894460631946,0.489504561555294,3.561052567346299,1.3176402329647052,5.1853462683690505,2.7201972209836667,3.1056308315639103,4.140764809174553,2.344057084034872,8.376274018398613,5.85828117000061,9.827848542549315,2.0026020623627816,3.7435487551598956,5.313503260257337,8.84724442261902,2.726389737245638,9.306849750201039,4.190402992020113,9.547495541655325,1.0510869230923925,6.139624339535848,8.327751467032256,8.86120829585705,5.525384541803109,8.618682126239817,7.597648507185828,9.285163198332118,2.9808283933822954,1.8651740001509665,9.479795918941733,2.008863180176348,0.9219612018528744,9.095249933137666,2.0242845823947753,6.2865855763092915,8.019102290338395,0.07516477526315901,2.6758887243693064,2.103345959526899,0.6692209368557278,6.274818841237737,9.324598215532458,0.9035832315319858,6.07894170936275,0.01956856545491048,9.438032398257747,3.8875007848990384,5.620556905719461,5.322328442033866,6.434551928200776,1.249927059094078,3.759734918976263,4.284288547102548,9.046756796654588,8.802887683721874,1.4137252255503197,1.7485249907519584,0.41722747792295234,6.286329098232968,1.1452475300454568,4.1088465932900275,5.659643901657989,8.46103687284053,2.149481466792189,7.410646970052113,7.434986666167946,7.560057806253053,7.424898779117768,9.816725059083423,2.337629027353463,6.906240734267703,2.4835885399445545,2.587331803799897,5.436328109039998,1.6063685721112675,5.499102982000106,5.695274829514063,4.102500143816505,1.658463264197192,4.7013358420285645,5.005977366071179,2.174949959068442,6.226892605701444,7.555567309476697,1.2522410571235398,1.6308474285660668,5.579618310248911,8.224685649167762,4.633374559430021,3.0931578782160885,9.942601632112373,8.21032828332095,9.35847198417055,9.86799083834783,9.355639747401916,7.186321311464501,9.104825661625881,3.6832341820524683,3.791630735438958,6.041978812995017,5.290582116862705,2.30064736758808,8.223841529690162,7.1996036362550075,5.540312356415072,0.5366234970874872,2.7443348546811253,1.5483827071702971,7.329672600353831,8.585422645522945,8.501075865407685,4.775838393562008,6.815447935346151,1.111385863347154,7.300416507868935,1.1955610636975789,4.3353426588954775,8.05940125291607,0.1826312298070154,3.8346466947011026,8.274152354486324,3.5447854053788297,8.812337226100695,7.576480473765681,1.0405044022242005,8.019669385210683,8.3000805889173,7.120141167302054,7.779675476407871,0.19885462724087422,3.765324511830297,1.8211727183313542,1.1697745901690348,2.0279364192311955,7.47975824372173,2.5994195202988557,2.4931868050941652,9.247306058566927,4.730839702067808,0.9165502563946171,1.0446353348374404,7.1415384371445745,9.591171147807788,5.363707825368467,4.703443930700038,9.873559827351489,2.725543212704249,7.453004441400961,8.605262637223026,8.80063340789101,9.877909129698546,5.186720621838625,8.698072680742213,5.890438058848404,1.6629266515673469,9.936300208292101,5.016831212548231,3.4438263003775638,5.334370961290221,9.251659304408278,2.4520485414946624,8.340144739224314,2.8599123159631934,7.806842081880294,7.927546253975142,8.33004398942432,7.451084629093772,0.34221950748904995,9.266972989018477,5.2008948075224115,8.820372666246604,1.427187707782327,7.011328773249712,1.8227123459818184,9.145329711711733,6.398579464437972,8.095898551077251,9.553633077354222,6.699077684092359,6.1856389166099195,6.667383884873561,3.978467089626121,2.772530883762341,1.015723889994875,8.953910009264447,9.152140172239857,5.363721447324639,9.2741438106551,2.8494055197321866,7.580770534669781,1.4169586405641343,1.7275156278410098,0.8569504194186917,1.1477471832117336,7.14941282300259,5.922864668287973,5.5727106907733965,2.3696950195168354,7.8042749025565055,4.861834825960472,3.4071600074953667,4.420416212198523,0.8782580558993969,9.039263090282208,3.3782934759286753,2.7950393933294126,7.787326594504007,4.781106941926174,7.520330782584404,7.114809567717999,2.3881612420121368,2.916386922659935,7.9789416262875745,8.280449267959114,2.116621800860894,4.674972798963495,6.878380925716168,9.828765693765039,4.934600198370602,3.837029213344796,3.701708035672251,1.6361955534437689,5.08692158646781,5.59607311950213,1.4141868158757287,6.299291545622394,8.371098861365198,6.697603751670562,0.5434631568315407,3.275884386260337,0.38355548820045104,8.68159215032003,0.5561226343470849,0.1929062587233621,4.675213274702643,1.225785395797776,3.9645026017938467,1.5788662676652199,7.277383125304155,6.098111172185298,4.974723256111677,4.96318971626925,8.39626867755397,3.121980421144106,7.704286533740117,3.98576282656921,4.353924749855649,1.938633854142524,7.663160299116544,7.9266036118258505,8.35667767016293,3.2082286041295727,5.698776630418663,9.2246644384422,9.896695238908183,4.246304510622387,8.620579816292368,2.820887689904632,6.633995684192461,9.349781310330386,2.9049537539959958,5.233034906730678,6.024548989227132,2.4245408445044636,5.093324232297509,0.2867657256894818,7.5873088178760835,0.09172072621000504,0.9318611670485111,6.416217187831991,6.198978682986036,1.0092420158746562,2.2741469116394453,1.6396042596822058,2.0468768335840126,7.980425222827714,4.625587990266027,8.78195636044933,0.38224836176118604,6.573259805633638,1.6119943057495512,5.108144208855794,0.09188424985218546,9.36209152467753,6.476362277293939,9.627020106760666,6.772999513084061,3.2402414768114385,3.9808807191423057,2.519197121924255,4.654602887324588,8.94003109652851,3.23121677781121,3.8100032574736864,4.009944714474669,3.5275038841723294,3.942787457608188,0.8323045301023546,0.6014134525057724,2.351222215303881,7.170831136430175,4.874146863400504,7.6208743318583565,3.655082244962018,1.968656278163743,4.78738653955733,5.77618369225029,0.5525706970166211,0.8364834768423712,3.2720005956910847,2.3500863358211688,3.9395305366684275,0.18521762286288546,2.7859782675106737,6.630521062769161,7.3195354247172695,7.129898633142872,6.78474562131925,5.07212773238791,7.214324511888681,3.6587582657721796,1.5419147017415513,1.5565522576980406,3.8547890523017014,4.814897246881957,0.9534921872522761,7.031721440175769,0.334799927725975,4.948856319702362,7.459946292408118,2.2881212371040816,5.565239762107613,2.242804012694102,3.5231258652792063,2.5678900291553397,9.04577887770169,6.389245438053122,3.222010600991936,1.0035856926986697,1.2537730382599266,3.2104746775259874,0.926758777969714,4.706620934893082,6.262002366235628,5.955571967671284,1.598441365572918,2.0511636462117577,0.3132508986918059,2.7743086974826414,3.054960490537364,3.1052309851010262,6.79417295666177,0.22996872224724685,3.2715168367370717,9.290260906096941,7.050604501317734,2.6988143288829236,3.5164538240462506,0.2872710938401424,6.243914090441471,6.966171485422921,9.750388829133403,2.2562491334031076,3.985745374084122,5.624669170237986,2.6945351803766404,7.944036388911259,5.8672277048547805,2.626550811676718,4.029339985528464,2.5543900250874274,7.1395259312212245,5.379901867878436,0.9669730326056003,5.085966429274375,5.920389681912699,6.23902461817581,7.66952737449262,1.8025217043096387,1.750297362518689,4.627396655067837,2.879495138168029,2.563287605798368,8.76218190040398,3.262374263839507,6.971820717262753,2.7107635169003297,6.17351947185125,0.36292998590308434,3.3446910418874087,2.451385097533576,4.8760640346771655,0.6772172565706547,2.7696479615561476,5.0122911968313,6.69601018903178,5.918576991701019,4.84503129849166,6.382292659590652,7.92045071437856,5.817334146770465,1.9202248249904952,8.926671890255404,7.035974650675412,4.763870457379033,7.728270581781473,1.9671293633508191,2.8719814639395302,6.146971092745925,9.18564437716478,7.77788318684113,8.82212775195925,2.7866663044633166,4.781652073072669,5.845791545710135,7.959561855420287,6.543097154864983,4.499826996299947,5.104754949223802,7.542473883478767,5.702346190866967,1.5384419110880176,1.7726704584243325,6.906932752013038,7.244220750971722,7.582028829383134,4.194945838316113,9.547753339629665,8.671423042296308,0.1944446559146873,3.2092345523970867,6.161412988748958,0.7506380221165987,5.921006123997943,7.880084948995327,7.198699528212799,1.8054343967493969,8.818375663588313,0.5891668237377812,7.801233842283004,0.09198831631517024,4.76960315454269,1.0946686173300701,0.5712391582555165,1.7592984643318355,5.613820358991221,2.2607971531245674,1.2303707393179408,6.329221730828667,8.050989024630661,7.305932937902151,2.0329478943724943,0.7470830528157446,0.607555037078662,0.7496770270580289,5.331808497894002,5.95081233724287,3.8848458844503897,4.653850191411588,9.720940450140832,7.890394658842821,1.4052098427555682,4.229151519883376,6.00580403288923,0.9906300266630352,7.371002274198812,1.8740011724777217,2.6149480713984485,1.4056229829116607,5.303080916024447,8.209203414549226,6.60806907829995,1.5269776278787872,4.664113576254032,0.7884715787927132,9.676644719156663,2.589169409336314,9.168128672662586,8.4512835068513,8.926168234834847,1.1208105797212653,2.4521049558405283,6.737842321358438,5.158131425787849,4.873117025774796,3.7910552020852606,7.602466635671035,4.749648171064571,0.7235653077416471,6.496854454236174,8.833232382558723,7.811371830950411,7.06190931634592,8.512721773076962,1.9228116702754616,6.032741327724052,0.38625328966822137,5.436003050247287,8.36740690318463,4.34758377534491,5.086012930616559,4.223475037242467,5.514465106914493,6.639870754814323,5.706057332292573,6.489468526201094,5.026805360099891,1.3930882420114266,6.402044355820589,0.3588018595449838,8.08087911009466,5.688309902151001,0.4082154680049843,8.755708280762375,0.4885618224607846,5.8696244489935445,6.47491502755228,7.847702563254357,3.323918907366483,5.391218065322072,4.049021708563587,0.5671348725470082,3.6055313293819546,1.3631387512485782,6.686384985743665,9.842578832231446,0.003870132148233729,7.060591279008173,8.534647386019515,1.3426302880537522,1.4389229842270712,7.938263539397036,5.721359590171684,6.5125683458558274,7.031594774568615,1.4443569363174147,8.126012374859252,4.765499577527306,4.2554458238669834,9.697029358035,9.633084287687153,3.9866305097818255,3.558110383551174,3.4605456332753715,1.9406428490138494,2.2899542862611977,4.319610297783512,6.426699509894112,4.276212853217645,5.769790476463257,5.658343151684855,6.636856869579837,5.917006789756858,3.6809103482950323,0.6352481349881467,8.993415208395191,3.817168810004672,7.773892839206862,7.52769219834577,2.6944396689516026,2.8921436531672517,3.7601772426270186,8.375716244653042,8.318439916960905,5.75776951422287,2.0924454599681153,3.761042033887947,2.145215463244061,9.829595331508575,2.3365335603201154,8.530197951961602,3.914068077094135,7.164490760427709,9.876815989935977,6.828118386988655,2.4480336384478174,0.029743386970422225,6.531932304364785,0.5391138125486372,5.677198742094416,6.217335728087323,8.787893052094999,4.943680389684591,7.013894491286134,3.426955991225067,7.328765106514985,8.604323257224937,4.786298038265084,3.8686311051077538,0.9637703592082647,5.636798109115491,1.1664450569294527,8.85086854500699,7.058995559794543,5.183638374679564,5.9654401032763715,9.766333253789375,8.623666505948663,7.012462523453791,9.03560412439009,2.2442885812897595,2.3948074866718505,0.9027650172766699,1.8032839689867908,0.24838181786237312,6.838192171333215,3.7661103435022247,3.858491470456682,2.123389378103333,7.003372659181557,8.200528866538168,1.6820112453337432,6.696435146717789,1.433956630321589,6.274640318489581,0.23762722580637385,2.2690856180215024,5.285384863189813,3.1094690305324235,4.167182102246185,2.1754925697599647,6.654555753154801,7.623188611058708,7.352219712233429,2.5805427256474722,2.9416954610667467,9.432318953629018,6.829012927807268,2.270047276417262,2.572269469759465,0.9362691538586976,9.403540130147995,1.3757192358636328,1.3153024529414004,0.4137302986426916,2.1519468190861324,0.8859149977078729,7.666414277264993,0.8133461758197957,6.114576349578751,3.0015419300056023,8.715842314282543,2.412006293612492,8.618386053161158,6.111766654245057,7.726957596403401,6.687607109231646,2.794226769539132,0.33172801520571005,6.56997816180251,0.447053590996791,1.0285275969246954,5.6546864069024405,1.7192442058294333,9.090144710198363,6.326053005248957,1.5807655806490128,9.316450632031847,9.27779063185939,6.829875708728379,9.993236349830621,8.176058347029212,3.8245983101802583,2.64340900127769,5.669886085174236,3.637919773513365,7.575000294505568,1.1909280185350246,1.7875961537415108,3.198328722079593,7.4026014963677085,5.498251816835458,4.980913704596189,0.5619924634756934,1.7418869538001447,6.556809486851232,1.336495236661539,7.555273382522129,4.797935307268702,6.15419680921744,5.748309704030914,7.25860994568051,5.512108969908391,1.4685728047246793,9.950951504855905,2.1761459871274846,7.432529873247995,0.5949271439725812,9.370082022963649,8.53836409678654,6.704629121001073,5.9439017417438444,6.077995851488462,9.723290795716329,5.40038237397777,3.916453860138247,4.831414174794972,7.833180944521079,4.51826044776684,7.411252399430119,2.713804502582,2.6250990795904494,6.441358061297972,4.060121656957085,0.6857353963143997,1.7572318938489606,6.453632047611782,4.226958730868033,7.331799514675563,0.9338125153305388,2.736121869555974,6.919200852059475,8.098293190460934,4.10678852345799,6.445938569101635,8.637039650408525,5.280277200531911,1.3395969762917903,6.687221913487806,0.023841104697588378,4.0029821258732845,4.7423426449724175,1.7722806703159844,3.1412813240694337,2.2794261127244297,8.030067064376903,8.447904798563208,5.3162067885953785,3.00672563914286,0.29878420051027144,2.708833442733045,9.639052991463501,3.7957224618850804,1.348704115711239,0.7968121034060327,4.854754470441631,7.3600188399851625,7.281913981459622,8.600586712359526,2.287787952133342,4.661279267957028,9.4590008167767,3.881024542911997,3.163053182886879,8.576373387297355,0.6346617784350461,7.015425178071959,1.9204274893285134,2.33465886940337,6.550459385464622,7.792420364242658,5.092970846607403,1.9838874516873028,0.7510570785241488,4.290067711511634,1.2771166508077503,1.7648150636143312,2.5388306287477014,9.537167413394055,9.492689795218887,9.84581601258222,2.509775498677993,7.641715391976563,0.9736044631196994,1.7902004995469811,0.21178374067242656,8.319479772914388,7.812156371822095,5.378938586776522,9.300946917575434,0.8228288014980545,4.288848244156167,0.5577327565053913,2.799263378281316,3.520314259152064,2.553308688114555,6.888603813646148,6.576281316944341,0.32600765293541834,7.912774908398561,9.870245911661605,7.514998457258823,7.279849018101614,8.68586576113592,6.305072933206195,9.602306410514458,8.877159242089913,3.0421529010046977,7.284623306706939,8.517344267184768,8.526995562174038,3.4339237070945905,4.026282190394692,0.3360831664517949,2.9930507017942176,0.7438303262128643,9.292166253463517,6.491416612395908,9.222981324751592,0.19451584139545508,8.549853414291357,9.591307832981391,5.073680673118917,5.786108275969375,6.2641161568791,2.5280446153766944,7.561314485544011,6.7931078663373645,9.838222362413227,9.408339365039735,6.655942096406635,1.1924268245433334,6.104745207561269,2.255981712601809,8.527323819258166,3.1689030034764265,6.055824407747739,2.1733810401504083,1.6055097866341672,1.9653326385982584,8.608095192007177,6.858081553409907,8.346391953463845,1.3641000495840383,7.046683655023481,5.840822765787424,4.90891383026627,8.322047684751299,8.548241051190079,1.483660575274277,0.07471180036647374,1.192471004589708,8.929807236276865,6.121913923131421,1.6607254860709708,0.12823403545778822,0.19589203684251544,3.646999224390721,4.551859483097324,8.515954335144325,5.525621525590967,1.9357780104996913,4.309985564793777,6.626872681725988,1.0091522486137405,6.2112122285774385,9.18741980107973,6.194165947394723,6.8761338218620205,1.9000916977328708,7.500081566914314,9.171752245092947,8.765431414744091,2.4615584404008106,4.067145823551206,9.158475124146861,8.720501446149155,1.396228892027358,6.182495388488012,4.296106628518832,1.4229197269094618,8.926091368877058,6.163371461403058,1.9811212990646232,3.949391744789197,7.088431182407257,9.260105001629903,4.601463788842022,0.3400781259952024,7.952558410961519,2.601080118537469,6.718910515455652,4.924560010568053,7.869184412994922,3.029426071079835,7.016408836450361,4.958266767243503,2.4930204308884396,0.45792823059031207,5.661234933041042,6.6881004750931705,3.211378617685343,1.809406283570545,3.218494478316871,6.993177631197874,5.004642936937806,3.89760795350506,3.970892224616336,8.244921819112145,9.106176818865755,2.6834511877533407,6.692050266405031,6.551217099120663]}

},{}],122:[function(require,module,exports){
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
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, NaN );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `mu` and `s`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 1.0 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `s`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, -1.0 );

	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 0.0, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( PINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `s` equals `0`, the created function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 2.0, 0.0 );

	y = quantile( 0.3, 2.0, 0.0 );
	t.equal( y, 2.0, 'returns mu for p inside [0,1]' );

	y = quantile( 0.9, 2.0, 0.0 );
	t.equal( y, 2.0, 'returns mu for p inside [0,1]' );

	y = quantile( 1.1, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	y = quantile( -0.1, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given positive `mu`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var mu;
	var s;
	var p;
	var y;
	var i;

	expected = positiveMean.expected;
	p = positiveMean.p;
	mu = positiveMean.mu;
	s = positiveMean.s;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], s[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given negative `mu`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var mu;
	var s;
	var p;
	var y;
	var i;

	expected = negativeMean.expected;
	p = negativeMean.p;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], s[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given large variance ( = large `s`)', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var tol;
	var mu;
	var s;
	var p;
	var y;
	var i;

	expected = largeVariance.expected;
	p = largeVariance.p;
	mu = largeVariance.mu;
	s = largeVariance.s;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( mu[i], s[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cosine/quantile/test/test.factory.js")
},{"./../lib/factory.js":116,"./fixtures/julia/large_variance.json":119,"./fixtures/julia/negative_mean.json":120,"./fixtures/julia/positive_mean.json":121,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":55,"@stdlib/constants/float64/pinf":57,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/abs":66,"tape":283}],123:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cosine/quantile/test/test.js")
},{"./../lib":117,"tape":283}],124:[function(require,module,exports){
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

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = quantile( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside `[0,1]` for `p` and a finite `mu` and `s`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a negative `s`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 0.5, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.2, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.8, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.7, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.7, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.2, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `s` equals `0`, the function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var y;

	y = quantile( 0.3, 2.0, 0.0 );
	t.equal( y, 2.0, 'returns mu for p inside [0,1]' );

	y = quantile( 0.9, 2.0, 0.0 );
	t.equal( y, 2.0, 'returns mu for p inside [0,1]' );

	y = quantile( 1.1, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	y = quantile( -0.1, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	t.end();
});

tape( 'the function evaluates the quantile function at `p` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var p;
	var s;
	var y;
	var i;

	expected = positiveMean.expected;
	p = positiveMean.p;
	mu = positiveMean.mu;
	s = positiveMean.s;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], s[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function at `p` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var p;
	var s;
	var y;
	var i;

	expected = negativeMean.expected;
	p = negativeMean.p;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], s[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function at `p` given large variance ( = large `s` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var p;
	var s;
	var y;
	var i;

	expected = largeVariance.expected;
	p = largeVariance.p;
	mu = largeVariance.mu;
	s = largeVariance.s;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], mu[i], s[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cosine/quantile/test/test.quantile.js")
},{"./../lib":117,"./fixtures/julia/large_variance.json":119,"./fixtures/julia/negative_mean.json":120,"./fixtures/julia/positive_mean.json":121,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":55,"@stdlib/constants/float64/pinf":57,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/abs":66,"tape":283}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - constant value of distribution
* @returns {Function} function to evaluate the cumulative distribution function
*
* @example
* var cdf = factory( 5.0 );
*
* var y = cdf( 3.0 );
* // returns 0.0
*
* y = cdf( 6.0 );
* // returns 1.0
*
* y = cdf( NaN );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated cumulative distribution function
	*
	* @example
	* var y = cdf( 10.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return (x < mu) ? 0.0 : 1.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":64,"@stdlib/utils/constant-function":146}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/degenerate/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/degenerate/cdf' );
*
* var y = cdf( 2.0, 5.0 );
* // returns 0.0
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/cdf' ).factory;
*
* var cdf = factory( 5.0 );
*
* var y = cdf( 3.0 );
* // returns 0.0
*
* y = cdf( 6.0 );
* // returns 1.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":125,"./main.js":127,"@stdlib/utils/define-nonenumerable-read-only-property":148}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a degenerate distribution with mean value `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of distribution
* @returns {Probability} evaluated cumulative distribution function
*
* @example
* var y = cdf( 2.0, 3.0 );
* // returns 0.0
*
* @example
* var y = cdf( 4.0, 3.0 );
* // returns 1.0
*
* @example
* var y = cdf( 3.0, 3.0 );
* // returns 1.0
*
* @example
* var y = cdf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN );
* // returns NaN
*/
function cdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return (x < mu) ? 0.0 : 1.0;
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":64}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Returns a function for evaluating the quantile function of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the quantile function
*
* @example
* var quantile = factory( 5.0 );
*
* var y = quantile( 0.3 );
* // returns 5.0
*
* y = quantile( 0.1 );
* // returns 5.0
*
* y = quantile( 1.1 );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return quantile;

	/**
	* Evaluates the quantile function of a degenerate distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.5 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return mu;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":64,"@stdlib/utils/constant-function":146}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution quantile function.
*
* @module @stdlib/stats/base/dists/degenerate/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/degenerate/quantile' );
*
* var y = quantile( 0.5, 2.0 );
* // returns 2.0
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/quantile' ).factory;
*
* var quantile = factory( 10.0 );
*
* var y = quantile( 0.5 );
* // returns 10.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":128,"./main.js":130,"@stdlib/utils/define-nonenumerable-read-only-property":148}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Evaluates the quantile function for a degenerate distribution centered at `mu`.
*
* @param {Probability} p - input value
* @param {number} mu - constant value of the distribution
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.5, 2.0 );
* // returns 2.0
*
* @example
* var y = quantile( 0.9, 4.0 );
* // returns 4.0
*
* @example
* var y = quantile( 1.1, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( -0.2, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, NaN );
* // returns NaN
*/
function quantile( p, mu ) {
	if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
		return NaN;
	}
	return mu;
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":64}],131:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{"@stdlib/utils/define-property":153}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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

},{"./define_property.js":151}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":150,"./has_define_property_support.js":152,"./polyfill.js":154}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":141}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":156,"./polyfill.js":157,"@stdlib/assert/has-tostringtag-support":24}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":158}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":158,"./tostringtag.js":159,"@stdlib/assert/has-own-property":20}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":144}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){

},{}],162:[function(require,module,exports){
arguments[4][161][0].apply(exports,arguments)
},{"dup":161}],163:[function(require,module,exports){
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
},{"base64-js":160,"buffer":163,"ieee754":266}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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
},{"_process":273}],166:[function(require,module,exports){
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

},{"events":164,"inherits":267,"readable-stream/lib/_stream_duplex.js":168,"readable-stream/lib/_stream_passthrough.js":169,"readable-stream/lib/_stream_readable.js":170,"readable-stream/lib/_stream_transform.js":171,"readable-stream/lib/_stream_writable.js":172,"readable-stream/lib/internal/streams/end-of-stream.js":176,"readable-stream/lib/internal/streams/pipeline.js":178}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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
},{"./_stream_readable":170,"./_stream_writable":172,"_process":273,"inherits":267}],169:[function(require,module,exports){
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
},{"./_stream_transform":171,"inherits":267}],170:[function(require,module,exports){
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
},{"../errors":167,"./_stream_duplex":168,"./internal/streams/async_iterator":173,"./internal/streams/buffer_list":174,"./internal/streams/destroy":175,"./internal/streams/from":177,"./internal/streams/state":179,"./internal/streams/stream":180,"_process":273,"buffer":163,"events":164,"inherits":267,"string_decoder/":282,"util":161}],171:[function(require,module,exports){
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
},{"../errors":167,"./_stream_duplex":168,"inherits":267}],172:[function(require,module,exports){
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
},{"../errors":167,"./_stream_duplex":168,"./internal/streams/destroy":175,"./internal/streams/state":179,"./internal/streams/stream":180,"_process":273,"buffer":163,"inherits":267,"util-deprecate":291}],173:[function(require,module,exports){
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
},{"./end-of-stream":176,"_process":273}],174:[function(require,module,exports){
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
},{"buffer":163,"util":161}],175:[function(require,module,exports){
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
},{"_process":273}],176:[function(require,module,exports){
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
},{"../../../errors":167}],177:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],178:[function(require,module,exports){
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
},{"../../../errors":167,"./end-of-stream":176}],179:[function(require,module,exports){
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
},{"../../../errors":167}],180:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":164}],181:[function(require,module,exports){
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

},{"./":182,"get-intrinsic":257}],182:[function(require,module,exports){
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

},{"es-define-property":242,"es-errors/type":248,"function-bind":256,"get-intrinsic":257,"set-function-length":277}],183:[function(require,module,exports){
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

},{"./lib/is_arguments.js":184,"./lib/keys.js":185}],184:[function(require,module,exports){
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

},{}],185:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],186:[function(require,module,exports){
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

},{"es-define-property":242,"es-errors/syntax":247,"es-errors/type":248,"gopd":258}],187:[function(require,module,exports){
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

},{"define-data-property":186,"has-property-descriptors":259,"object-keys":271}],188:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],189:[function(require,module,exports){
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

},{"./ToNumber":220,"./ToPrimitive":222,"./Type":227}],190:[function(require,module,exports){
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

},{"../helpers/isFinite":235,"../helpers/isNaN":236,"../helpers/isPrefixOf":237,"./ToNumber":220,"./ToPrimitive":222,"es-errors/type":248,"get-intrinsic":257}],191:[function(require,module,exports){
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

},{"call-bind/callBound":181,"es-errors/type":248}],192:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":250}],193:[function(require,module,exports){
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

},{"./DayWithinYear":196,"./InLeapYear":200,"./MonthFromTime":210,"es-errors/eval":243}],194:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":241,"./floor":231}],195:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":231}],196:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":194,"./DayFromYear":195,"./YearFromTime":229}],197:[function(require,module,exports){
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

},{"./modulo":232}],198:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":239,"./IsAccessorDescriptor":201,"./IsDataDescriptor":203,"es-errors/type":248}],199:[function(require,module,exports){
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

},{"../helpers/timeConstants":241,"./floor":231,"./modulo":232}],200:[function(require,module,exports){
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

},{"./DaysInYear":197,"./YearFromTime":229,"es-errors/eval":243}],201:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":239,"es-errors/type":248,"hasown":265}],202:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":268}],203:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":239,"es-errors/type":248,"hasown":265}],204:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":201,"./IsDataDescriptor":203,"./IsPropertyDescriptor":205,"es-errors/type":248}],205:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":239}],206:[function(require,module,exports){
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

},{"../helpers/isFinite":235,"../helpers/timeConstants":241}],207:[function(require,module,exports){
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

},{"../helpers/isFinite":235,"./DateFromTime":193,"./Day":194,"./MonthFromTime":210,"./ToInteger":219,"./YearFromTime":229,"./floor":231,"./modulo":232,"get-intrinsic":257}],208:[function(require,module,exports){
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

},{"../helpers/isFinite":235,"../helpers/timeConstants":241,"./ToInteger":219}],209:[function(require,module,exports){
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

},{"../helpers/timeConstants":241,"./floor":231,"./modulo":232}],210:[function(require,module,exports){
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

},{"./DayWithinYear":196,"./InLeapYear":200}],211:[function(require,module,exports){
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

},{"../helpers/isNaN":236}],212:[function(require,module,exports){
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

},{"../helpers/timeConstants":241,"./floor":231,"./modulo":232}],213:[function(require,module,exports){
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

},{"./Type":227}],214:[function(require,module,exports){
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


},{"../helpers/isFinite":235,"./ToNumber":220,"./abs":230,"get-intrinsic":257}],215:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":241,"./DayFromYear":195}],216:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":241,"./modulo":232}],217:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],218:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":220}],219:[function(require,module,exports){
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

},{"../helpers/isFinite":235,"../helpers/isNaN":236,"../helpers/sign":240,"./ToNumber":220,"./abs":230,"./floor":231}],220:[function(require,module,exports){
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

},{"./ToPrimitive":222,"call-bind/callBound":181,"safe-regex-test":276}],221:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":251}],222:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":253}],223:[function(require,module,exports){
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

},{"./IsCallable":202,"./ToBoolean":217,"./Type":227,"es-errors/type":248,"hasown":265}],224:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":257}],225:[function(require,module,exports){
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

},{"../helpers/isFinite":235,"../helpers/isNaN":236,"../helpers/sign":240,"./ToNumber":220,"./abs":230,"./floor":231,"./modulo":232}],226:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":220}],227:[function(require,module,exports){
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

},{}],228:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":194,"./modulo":232}],229:[function(require,module,exports){
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

},{"call-bind/callBound":181,"get-intrinsic":257}],230:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":257}],231:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],232:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":238}],233:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":241,"./modulo":232}],234:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":189,"./5/AbstractRelationalComparison":190,"./5/Canonicalize":191,"./5/CheckObjectCoercible":192,"./5/DateFromTime":193,"./5/Day":194,"./5/DayFromYear":195,"./5/DayWithinYear":196,"./5/DaysInYear":197,"./5/FromPropertyDescriptor":198,"./5/HourFromTime":199,"./5/InLeapYear":200,"./5/IsAccessorDescriptor":201,"./5/IsCallable":202,"./5/IsDataDescriptor":203,"./5/IsGenericDescriptor":204,"./5/IsPropertyDescriptor":205,"./5/MakeDate":206,"./5/MakeDay":207,"./5/MakeTime":208,"./5/MinFromTime":209,"./5/MonthFromTime":210,"./5/SameValue":211,"./5/SecFromTime":212,"./5/StrictEqualityComparison":213,"./5/TimeClip":214,"./5/TimeFromYear":215,"./5/TimeWithinDay":216,"./5/ToBoolean":217,"./5/ToInt32":218,"./5/ToInteger":219,"./5/ToNumber":220,"./5/ToObject":221,"./5/ToPrimitive":222,"./5/ToPropertyDescriptor":223,"./5/ToString":224,"./5/ToUint16":225,"./5/ToUint32":226,"./5/Type":227,"./5/WeekDay":228,"./5/YearFromTime":229,"./5/abs":230,"./5/floor":231,"./5/modulo":232,"./5/msFromTime":233}],235:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":236}],236:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],237:[function(require,module,exports){
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

},{"call-bind/callBound":181}],238:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],239:[function(require,module,exports){
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

},{"es-errors/type":248,"hasown":265}],240:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],241:[function(require,module,exports){
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

},{}],242:[function(require,module,exports){
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

},{"get-intrinsic":257}],243:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],244:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],245:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],246:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],247:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],248:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],249:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],250:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":248}],251:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":252,"./RequireObjectCoercible":250}],252:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],253:[function(require,module,exports){
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

},{"./helpers/isPrimitive":254,"is-callable":268}],254:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],255:[function(require,module,exports){
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

},{}],256:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":255}],257:[function(require,module,exports){
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

},{"es-errors":244,"es-errors/eval":243,"es-errors/range":245,"es-errors/ref":246,"es-errors/syntax":247,"es-errors/type":248,"es-errors/uri":249,"function-bind":256,"has-proto":260,"has-symbols":261,"hasown":265}],258:[function(require,module,exports){
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

},{"get-intrinsic":257}],259:[function(require,module,exports){
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

},{"es-define-property":242}],260:[function(require,module,exports){
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

},{}],261:[function(require,module,exports){
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

},{"./shams":262}],262:[function(require,module,exports){
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

},{}],263:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":262}],264:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":256}],265:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":256}],266:[function(require,module,exports){
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

},{}],267:[function(require,module,exports){
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

},{}],268:[function(require,module,exports){
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

},{}],269:[function(require,module,exports){
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

},{"call-bind/callBound":181,"has-tostringtag/shams":263}],270:[function(require,module,exports){
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

},{"./isArguments":272}],271:[function(require,module,exports){
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

},{"./implementation":270,"./isArguments":272}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){
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

},{}],274:[function(require,module,exports){
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
},{"_process":273,"through":289,"timers":290}],275:[function(require,module,exports){
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

},{"buffer":163}],276:[function(require,module,exports){
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

},{"call-bind/callBound":181,"es-errors/type":248,"is-regex":269}],277:[function(require,module,exports){
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

},{"define-data-property":186,"es-errors/type":248,"get-intrinsic":257,"gopd":258,"has-property-descriptors":259}],278:[function(require,module,exports){
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

},{"es-abstract/es5":234,"function-bind":256}],279:[function(require,module,exports){
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

},{"./implementation":278,"./polyfill":280,"./shim":281,"define-properties":187,"function-bind":256}],280:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":278}],281:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":280,"define-properties":187}],282:[function(require,module,exports){
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
},{"safe-buffer":275}],283:[function(require,module,exports){
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
},{"./lib/default_stream":284,"./lib/results":286,"./lib/test":287,"_process":273,"defined":188,"through":289,"timers":290}],284:[function(require,module,exports){
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
},{"_process":273,"fs":162,"through":289}],285:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":273,"timers":290}],286:[function(require,module,exports){
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
},{"_process":273,"events":164,"function-bind":256,"has":264,"inherits":267,"object-inspect":288,"resumer":274,"through":289,"timers":290}],287:[function(require,module,exports){
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
},{"./next_tick":285,"deep-equal":183,"defined":188,"events":164,"has":264,"inherits":267,"path":165,"string.prototype.trim":279}],288:[function(require,module,exports){
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

},{}],289:[function(require,module,exports){
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
},{"_process":273,"stream":166}],290:[function(require,module,exports){
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
},{"process/browser.js":273,"timers":290}],291:[function(require,module,exports){
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
},{}]},{},[122,123,124]);
