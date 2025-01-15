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

},{"@stdlib/utils/native-class":158}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":158}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":158}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":158}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":102}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":48,"@stdlib/constants/float64/high-word-sign-mask":50,"@stdlib/number/float64/base/from-words":106,"@stdlib/number/float64/base/get-high-word":110,"@stdlib/number/float64/base/to-words":119}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":48,"@stdlib/constants/float64/high-word-exponent-mask":49,"@stdlib/math/base/special/kernel-cos":80,"@stdlib/math/base/special/kernel-sin":84,"@stdlib/math/base/special/rempio2":88,"@stdlib/number/float64/base/get-high-word":110}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":77,"@stdlib/math/base/special/ldexp":86}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./expmulti.js":74,"@stdlib/constants/float64/ninf":55,"@stdlib/constants/float64/pinf":57,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/trunc":100}],77:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/max-base2-exponent":53,"@stdlib/constants/float64/max-base2-exponent-subnormal":52,"@stdlib/constants/float64/min-base2-exponent-subnormal":54,"@stdlib/constants/float64/ninf":55,"@stdlib/constants/float64/pinf":57,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/copysign":70,"@stdlib/number/float64/base/exponent":104,"@stdlib/number/float64/base/from-words":106,"@stdlib/number/float64/base/normalize":116,"@stdlib/number/float64/base/to-words":119}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":90}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/array/base/zeros":3,"@stdlib/math/base/special/floor":78,"@stdlib/math/base/special/ldexp":86}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./kernel_rempio2.js":89,"./rempio2_medium.js":91,"@stdlib/constants/float64/high-word-abs-mask":48,"@stdlib/constants/float64/high-word-exponent-mask":49,"@stdlib/constants/float64/high-word-significand-mask":51,"@stdlib/number/float64/base/from-words":106,"@stdlib/number/float64/base/get-high-word":110,"@stdlib/number/float64/base/get-low-word":112}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/math/base/special/round":92,"@stdlib/number/float64/base/get-high-word":110}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/high-word-abs-mask":48,"@stdlib/constants/float64/high-word-exponent-mask":49,"@stdlib/math/base/special/kernel-cos":80,"@stdlib/math/base/special/kernel-sin":84,"@stdlib/math/base/special/rempio2":88,"@stdlib/number/float64/base/get-high-word":110}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the normalized cardinal sine of a number.
*
* @module @stdlib/math/base/special/sinc
*
* @example
* var sinc = require( '@stdlib/math/base/special/sinc' );
*
* var v = sinc( 0.5 );
* // returns ~0.637
*
* v = sinc( -1.2 );
* // returns ~-0.156
*
* v = sinc( 0.0 );
* // returns 1.0
*
* v = sinc( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var sinpi = require( '@stdlib/math/base/special/sinpi' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Computes the normalized cardinal sine of a number.
*
* ## Method
*
* For \\( x \neq 0 \\), the normalized cardinal sine is calculated as
*
* ```tex
* \operatorname{sinc}(x) = \frac{\operatorname{sin}(\pi x)}{\pi x}.
* ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{sinc}(0) &= 1 & \\
* \operatorname{sinc}(\infty) &= 0 & \\
* \operatorname{sinc}(-\infty) &= 0 & \\
* \operatorname{sinc}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
* @param {number} x - input value
* @returns {number} cardinal sine
*
* @example
* var v = sinc( 0.5 );
* // returns ~0.637
*
* @example
* var v = sinc( -1.2 );
* // returns ~-0.156
*
* @example
* var v = sinc( 0.0 );
* // returns 1.0
*
* @example
* var v = sinc( NaN );
* // returns NaN
*/
function sinc( x ) {
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInfinite( x ) ) {
		return 0.0;
	}
	if ( x === 0.0 ) {
		return 1.0;
	}
	return sinpi( x ) / ( PI*x );
}


// EXPORTS //

module.exports = sinc;

},{"@stdlib/constants/float64/pi":56,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/sinpi":98}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pi":56,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/abs":66,"@stdlib/math/base/special/copysign":70,"@stdlib/math/base/special/cos":72,"@stdlib/math/base/special/sin":94}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":68,"@stdlib/math/base/special/floor":78}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/high-word-exponent-mask":49,"@stdlib/number/float64/base/get-high-word":110}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":108}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":107,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":111}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":109,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var LOW;
if ( isLittleEndian === true ) {
	LOW = 0; // first index
} else {
	LOW = 1; // second index
}


// EXPORTS //

module.exports = LOW;

},{"@stdlib/assert/is-little-endian":38}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":113,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":58,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/abs":66}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":115,"./main.js":117,"@stdlib/utils/define-nonenumerable-read-only-property":151}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":115}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":120,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":118,"./main.js":121,"@stdlib/utils/define-nonenumerable-read-only-property":151}],120:[function(require,module,exports){
arguments[4][107][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":107}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":118}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Returns a function for evaluating the moment-generating function (MGF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} MGF
*
* @example
* var mgf = factory( 2.0 );
*
* var y = mgf( 0.0 );
* // returns 1.0
*
* y = mgf( 2.0 );
* // returns ~54.598
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return mgf;

	/**
	* Evaluates the moment-generating function (MGF) of a degenerate distribution.
	*
	* @private
	* @param {number} t - input value
	* @returns {number} evaluated MGF
	*
	* @example
	* var y = mgf( 10.0 );
	* // returns <number>
	*/
	function mgf( t ) {
		if ( isnan( t ) ) {
			return NaN;
		}
		return exp( mu*t );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/exp":75,"@stdlib/utils/constant-function":149}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution moment-generating function (MGF).
*
* @module @stdlib/stats/base/dists/degenerate/mgf
*
* @example
* var mgf = require( '@stdlib/stats/base/dists/degenerate/mgf' );
*
* var y = mgf( 2.0, 0.0 );
* // returns 1.0
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/mgf' ).factory;
*
* var mgf = factory( 10.0 );
*
* var y = mymgf( 0.1 );
* // returns ~2.718
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":122,"./main.js":124,"@stdlib/utils/define-nonenumerable-read-only-property":151}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Evaluates the moment-generating function (MGF) for a degenerate distribution centered at `mu`.
*
* @param {number} t - input value
* @param {number} mu - value at which to center the distribution
* @returns {number} evaluated MGF
*
* @example
* var y = mgf( 1.0, 1.0 );
* // returns ~2.718
*
* @example
* var y = mgf( 2.0, 3.0 );
* // returns ~403.429
*
* @example
* var y = mgf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, NaN );
* // returns NaN
*/
function mgf( t, mu ) {
	if ( isnan( t ) || isnan( mu ) ) {
		return NaN;
	}
	return exp( mu*t );
}


// EXPORTS //

module.exports = mgf;

},{"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/exp":75}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/mgf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sinc = require( '@stdlib/math/base/special/sinc' );
var exp = require( '@stdlib/math/base/special/exp' );
var abs = require( '@stdlib/math/base/special/abs' );


// MAIN //

/**
* Returns a function for evaluating the moment-generating function (MGF) of a logistic distribution with mean `mu` and scale parameter `s`.
*
* @param {number} mu - mean
* @param {NonNegativeNumber} s - scale parameter
* @returns {Function} MGF
*
* @example
* var mgf = factory( 10.0, 0.5 );
*
* var y = mgf( 0.5 );
* // returns ~164.846
*
* y = mgf( 2.0 );
* // returns Infinity
*/
function factory( mu, s ) {
	if ( isnan( mu ) || isnan( s ) || s < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( s === 0.0 ) {
		return degenerate( mu );
	}
	return mgf;

	/**
	* Evaluates the moment-generating function (MGF) for a logistic distribution.
	*
	* @private
	* @param {number} t - input value
	* @returns {number} evaluated MGF
	*
	* @example
	* var y = mgf( 0.5 );
	* // returns <number>
	*/
	function mgf( t ) {
		var st = s * t;
		if ( abs( st ) > 1.0 ) {
			return NaN;
		}
		return exp( mu * t ) / sinc( st );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/abs":66,"@stdlib/math/base/special/exp":75,"@stdlib/math/base/special/sinc":96,"@stdlib/stats/base/dists/degenerate/mgf":123,"@stdlib/utils/constant-function":149}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the moment-generating function (MGF) for a logistic distribution.
*
* @module @stdlib/stats/base/dists/logistic/mgf
*
* @example
* var mgf = require( '@stdlib/stats/base/dists/logistic/mgf' );
*
* var y = mgf( 0.9, 0.0, 1.0 );
* // returns ~9.15
*
* y = mgf( 0.1, 4.0, 4.0 );
* // returns ~1.971
*
* y = mgf( -0.2, 4.0, 4.0 );
* // returns ~1.921
*
* var mymgf = mgf.factory( 10.0, 0.5 );
*
* y = mymgf( 0.5 );
* // returns ~164.846
*
* y = mymgf( 2.0 );
* // returns Infinity
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":125,"./main.js":127,"@stdlib/utils/define-nonenumerable-read-only-property":151}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var sinc = require( '@stdlib/math/base/special/sinc' );
var exp = require( '@stdlib/math/base/special/exp' );
var abs = require( '@stdlib/math/base/special/abs' );


// MAIN //

/**
* Evaluates the moment-generating function (MGF) for a logistic distribution with mean `mu` and scale parameter `s` at a value `t`.
*
* @param {number} t - input value
* @param {number} mu - mean
* @param {NonNegativeNumber} s - scale parameter
* @returns {number} evaluated MGF
*
* @example
* var y = mgf( 0.9, 0.0, 1.0 );
* // returns ~9.15
*
* @example
* var y = mgf( 0.1, 4.0, 4.0 );
* // returns ~1.971
*
* @example
* var y = mgf( -0.2, 4.0, 4.0 );
* // returns ~1.921
*
* @example
* var y = mgf( 0.5, 0.0, -1.0 );
* // returns NaN
*
* @example
* var y = mgf( 0.5, 0.0, 4.0 );
* // returns NaN
*
* @example
* var y = mgf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, 0.0, NaN );
* // returns NaN
*/
function mgf( t, mu, s ) {
	var st;
	st = s * t;
	if (
		isnan( st ) ||
		isnan( mu ) ||
		s < 0.0 ||
		abs( st ) > 1.0
	) {
		return NaN;
	}
	return exp( mu * t ) / sinc( st );
}


// EXPORTS //

module.exports = mgf;

},{"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/abs":66,"@stdlib/math/base/special/exp":75,"@stdlib/math/base/special/sinc":96}],128:[function(require,module,exports){
module.exports={"expected":[18.90435771627847,53.81945627017466,4.388048526627627,45.339123407755366,13.977301702786079,12.163663500502318,59.101162109778,21.153270764475145,5.397608069857965,10.665124766340966,333.5991012420132,4.7045552383045175,53.75461732133637,1.475508271397517,9.208755852994292,5.078956596715578,6.243556258130022,20.193019549846714,7.884052255072067,15.159476766667542,14.339903243805592,5.4726478688925395,26.629194060453393,50.392774365672736,11.877280320303143,10.103748647703492,15.928000558378999,41.11943803212747,16.626212934353582,8.31699346788708,32.67828967858741,18.91485738292241,10.935687698064223,26.91903771399144,18.42410587172599,20.77225681019588,7.05161835819146,107.36917711498891,7.4020020422541455,48.02634771955529,13.432047393962069,5.026632074949898,16.916767119070514,22.21085073950958,23.012034466018374,190.5021963705625,11.622468964875045,198.98355846293794,32.397649119036984,59.10675713221554,27.65627695683042,17.75742523526686,62.43182957730488,522.8975275792818,22.842424478972134,27.477649214770192,10.762804548367917,4.686868150201492,63.55513090074546,8.159213010050976,11.15473764463221,5.594719093521805,10.070185493787458,255.61070379289544,187.81199611598117,9.623439806920029,22.533140913780095,14.273171750810848,81.06560773091533,72.22238329695956,32.81712898127564,9.004387725541896,3.2933221152542886,9.388772348185425,15.070270906386716,41.32419675823582,46.89570460209823,3.6713006987841506,135.57318028442953,79.47667128412627,34.746634998937225,101.03944154486048,4.8647584849462975,97.97414311440151,16.47593775275125,18.183017295017798,5.772965446210364,73.43164901591825,14.568945952730632,23.77567230340901,5.047544690776592,27.2276765079953,40.4064437322881,133.19362380123366,19.35440510778592,13.539203296125061,16.63359852113077,6.913786869205734,11.26802974915842,3.981690133506669,26.484389687247585,150.88331565063976,30.7484421609392,201.36738045795553,49.50336336516623,101.47166962866847,14.02120863391812,52.6381194796507,8.293587082658552,21.11813651332451,222.1984550516761,79.13599335327208,53.56942747558095,46.76969464641796,39.22590180025804,4.133823026346081,4.890353292806463,38.811839095890065,57.486812701120215,114.51588497193173,13.03269431751974,113.62776094876514,18.95409552738029,39.29642520223649,55.76617165957448,7.0977291603772965,6.836563104954356,14.915311939793716,20.208077602388524,20.337207620252325,15.798328070321933,85.5294956238931,8.13781565717266,299.6613668055472,39.13667871792605,2.238912287347882,16.88823153870885,36.739118421500606,11.28934410794144,17.85648196786877,412.44080434428435,81.88879637504225,27.373011729189223,18.81241393925891,162.9388195125253,12.855561265443857,8.461583471738397,24.129302524487752,143.09930510919048,20.438658448384633,17.3999002077337,16.347020778642737,137.97151492631278,24.51350570278845,27.128003703304127,50.71395076634831,4.721271313118064,7.683208439041101,12.91201456359307,21.22668610525338,21.57719798768936,25.636372942157898,51.82617464985181,26.720831331604067,10.406226004000247,18.82207339518699,45.534256305158266,9.530232396405959,15.14685374386762,20.89771865597755,48.68109842389849,93.22359500435604,46.79845324329363,323.46252838980024,30.102683385570458,9.51604987687611,24.004270023174524,4.236031466355471,4.704519873930823,3.0899294729948226,56.049106625821686,5.100281555583143,13.467451242369634,35.079115117552846,2.479309806669469,94.78116872952397,16.273301449828608,78.8310091079055,2.872791498888142,3.236167301641458,143.02947024112134,11.647189535880868,587.5489056515742,27.239583198283203,24.466769112912083,5.44132689413455,25.099611117015197,54.7676133408305,14.796404739871903,33.6767962224052,7.7506521035001965,3.237292920903216,5.600819199237089,41.29170062407292,35.32169354290678,8.145528807474586,4.7004250054425505,4.384371630807408,11.612885309746712,56.37416984950371,20.20685292494563,54.219932029422374,27.797881450211634,2.978334462286327,18.68931653456877,33.65528470470295,24.372172734097173,18.30212562850112,23.594278007567116,60.234583226905755,9.791671879956501,28.60037751317334,99.32757716514682,2.488827467785449,18.494172324534077,24.44363596145851,183.42230748892266,25.164976564269537,18.339325805066224,19.75764265092369,5.251223790232499,3.180290553348747,23.331172456380152,95.38362696402278,27.312551222418072,19.185235027277724,1.1079377874640555,1.7675135944347735,35.84847826113605,51.721427278111456,792.137833657037,10.969763623968387,3.592990160096966,488.12812382754765,3.3250945106023466,2.7761973338497676,2.6512801677768345,13.43987437672844,20.909975509593522,19.579647074577135,25.46751591436311,9.411545395207627,27.2387740775254,3.1297164987379413,11.021544273650797,14.769889740745292,26.345676564694756,13.057745903838068,3.0138594439641717,11.413236311490628,17.234181497704068,14.521310379974153,114.82349943926748,19.7998827462303,17.82101605409568,91.01527929885768,46.570947351190625,168.2162167343687,4.340496049006905,72.35508675228013,47.133345316233914,97.7509895080322,37.91353604172222,40.090088279959694,10.086817047028685,21.04506796327585,36.107735842342294,58.765199404845845,29.864924723161693,23.694043612286222,25.354240722589537,9.066753367609875,4.181888789466229,19.19590658413538,89.11784465241108,3.508432957216069,18.697416762192105,1910.4229526564397,78.75737275268807,2411.7973693822346,25.325834677531645,8.86259953957826,81.99869003134505,21.747766170991444,14.371640036580356,32.138349669255355,101.38953375854011,19.559082379081286,14.626592203217395,44.36654078372718,4.035640638176925,8.945532142392809,68.79246174727145,30.814307768766806,13.598449299797567,38.87049891829421,17.971361700095226,98.24791118426779,19.785406468472523,32.76078514713461,4.864775218899724,23.702764274834735,11.260194142312477,17.601291924760616,15.751990089433253,2.630752274846128,9.649920892938619,353.54211061765676,99.19787845158804,113.93911899410685,58.44836261252229,47.56282001856913,24.56450803013409,22.558673029978415,36.18354893284702,10.380537089738308,30.677633566708753,52.38912479742937,70.4843292278914,36.47499970532271,44.339135220643776,32.232586487783784,32.040164031398305,8.946501370575149,4.3487167180188395,57.668906226409156,125.53205423466137,38.884243911960006,9.2265912192818,144.5748127766958,42.825002546401734,8.763440035484848,25.998286091438185,25.150840435787554,48.87123352807628,20.47578255961641,52.599669345994194,22.135080443335163,7.241980019607113,21.895200360165077,40.37456004394798,9.983993177899446,37.50611892165717,30.807713341479914,94.08548062970083,64.35309760981191,407.70106452711366,3.8713885445075813,9.57733713979332,150.5475777427078,5.157682531922893,70.88399797690421,24.62339515828692,93.661971391033,275.09762735612804,29.48882565764326,32.941821647040356,12.138078579247637,23.802044381281128,34.5669392387646,12.362640814925216,8.805058508720712,3.0273111424404813,5.337166870522908,22.49486349010773,4.900790624029591,7.628351943062188,54.241349127782556,18.4168135157623,130.66001339097866,15.74187454287218,2.927321295974498,25.48850222891639,25.492051726137248,16.80695735537006,15.789968880810278,3.498369567307029,29.87496583729445,24.090633882994602,11.85749006779959,9.925970110321654,19.198843771578925,45.376506376793785,19.058531193960118,19.881419799349036,17.65195435671312,20.91835178349613,16.069005959976586,12.189288569432986,133.00111742247836,24.94934136304408,8.377886501253585,46.07918552406377,15.20770323674887,10.522103981808906,42.004085392521304,5.733261037654503,18.195129837304695,18.115799470559388,27.72696862365461,18.52277175808876,6.391873759117356,88.074975033999,25.267341722358363,12.672305793570644,40.7105826182415,3.0799800379270157,504.629989844661,3.3751512096821625,107.03022329546341,2.08918004561297,32.208781449436906,51.17197758743821,32.6752931200368,32.816971731192986,18.19550880953064,5.660156188924315,22.051091115991863,111.87074864553497,8.234239545258712,18.63102634008729,11.408420927279423,5.613183252747988,52.21422989784877,23.627658437779708,12.868133820010694,40.47844473049551,51.367468026544465,17.268677668629795,10.578369078888528,68.48399767968812,4.380698215555372,12.802165714363573,92.47115907044083,23.9011886126323,40.6185953322467,249.01390804480687,23.240423431611582,11.624267492124217,89.98360567968922,16.635735861216983,1.804549520439948,14.686167467640074,18.18271333019335,6.776961855829975,106.72543279918105,12.764656892541288,24.38075025872856,5.111100602309344,14.050951740369712,14.028806472332068,15.602759838217247,2532.071818723622,46.37878718686942,2.4675080509963663,22.23629626421065,43.75092659593071,39.58970930047623,16.787665435030785,43.82618502859473,21.307118332226185,29.404188584938886,658.9403975908115,15.140647303691972,2.006955152192252,18.002524269394403,9.469825732347124,27.242924913765613,5.047439952237386,108.01271889229572,162.192141113491,24.61062677570316,56.54872569241916,27.783404495539045,1.7086157177521926,35.20137833328853,10.261766779589056,14.609825289746308,298.180451967718,21.80350034574511,24.12308994764402,14.561710555637886,191.0620330059197,140.43285472519315,3.2569993486320548,8.252425169455151,33.93820128384535,127.22274776027665,38.53890906584417,17.034511137572593,31.284019232583525,11.671289816984078,19.817020414602524,120.46892653581563,36.105407707049054,19.918654805828034,8.429035963636618,23.828654586428506,14.958573907125924,15.167347793487172,18.17170166694325,71.21064727321814,26.55221421642774,27.532329907078932,161.00417821395789,13.983993128007329,22.285572984166603,30.82371891411403,8.012482595660856,3.988257121284513,18.13209158556098,5.72369319760372,18.805113094547817,61.02375931773905,112.5908315452988,75.45363910204699,19.961175547845727,10.436834935469525,13.299383083751051,13.022319234669807,66.00786841219018,18.39642108258965,319.8904423942474,22.196257990859518,588.1580310144752,29.163077359400724,24.00614547117012,66.70795107689425,18.92684152683581,91.76201690171582,538.2498041258615,35.176714937238756,18.79900499946042,3.7487621187307227,22.60147153565492,658.0709046855015,2.1582409993592115,7.985035156753507,34.387450258115294,22.766111478246895,7.248649720063566,36.112771281913865,30.267288005247245,56.687376263512064,2.2484708666655004,53.15986764980254,7.86306545144656,4.171744056368202,93.77513271411077,3.9993059858779954,3772.3870642205093,10.037469438042585,30.83997601418661,5.433222534355627,4.316479795134381,112.74836669409741,82.08960252233672,167.96830017947153,8.29182680790755,5.109065055630245,29.854160709578867,17.126345403112722,3.970913957357628,102.11256333698917,4.062205693218798,8.209308986067125,8.359241025260415,28.481322074450173,22.254524137622546,105.72281050756128,13.28229858505131,51.19388475691869,15.938009239015539,41.96011222717174,9.6584967745361,86.40149473251826,297.1791191409676,3.6738874246845774,4.689721298946275,757.0941642507595,4.9440214379935234,62.63196758911782,55.64342536128966,2136.7772781640406,10.887466852494356,20.173201452991993,8.858567712392214,41.263108544702504,33.20653411239873,1.650115491053066,13.65396333697144,78.2524947541302,8.937375057967824,465.4406547737177,6.303375955485585,131.31101942949817,26.301014009412683,29.902676616537185,41.23755870852127,3.3812444208653623,14.369013318257752,31.189301409064722,210.70438809827567,25.367377529315245,27.981085556764175,32.71543096127761,11.552409165599176,5.471868067016664,30.801448187639537,30.848526415983002,96.88800327748024,9.291339447964816,25.341359100428953,23.51954849270307,49.80802964216468,74.93088616739803,18.953581487190903,23.635152240147644,20.698455168010657,61.081625543714644,5.35910513700862,116.45781772306881,85.25993829436356,17.891563562314705,18.920185797323295,1.9037612078223725,9.137005931397896,12.430448504235594,254.12869888550506,6.4135755720324,38.53915109561935,23.701023961868348,13.064249416184099,48.574534181974606,13.955489245173773,8.736242835410101,73.27597743773428,12.654941888613408,59.543559096193555,48.3093414517054,21.943439148150787,16.168955752165065,32.37524727969924,20.324710818690697,28.858285801839706,85.35537190790365,48.48229735263229,53.124084868912206,97.1921933556171,13.286976185943416,54.892641492547234,40.66642691100494,18.187722955162567,57.24698280404194,438.0122691309121,38.39636978964264,3.267168698535921,48.58885402465177,47.96123112655322,5.704701079797601,37.88051480615894,25.343264182066875,15.991764028422049,10.123540097551158,8844.962175053546,7.219596030765725,22.74121048944715,517.1246673697188,4.736578558375695,16.228053258203754,8.12299309881841,65.62627510828287,18.43717584466576,20.554305058485816,4.12177012515583,46.605734968069385,138.1422729441951,35.96597549906072,103.5517550507024,20.110655503823274,68.40037106521727,25.689414687004206,2.826493928434998,19.795787853601986,3.9064254198025914,43.03804400406005,3.1890449204462765,22.74925311992954,7.6049401228782925,22.70916190858047,10.978037792601933,41.68944932005119,42.54012775476973,39.09213389330617,20.493937605650164,11.291878931279243,15.7587772490876,6.683469347893537,18.091761869595743,12.469759677886664,60.123604970974306,95.71062776770692,21.226799183922623,24.16597192722532,20.513826543132065,44.70665210869781,19.695036850547446,11.878958517294663,10.349633026215951,30.311973788447084,158.43493195941915,25.01159384651175,3.5838434800596977,19.891368273562847,23.937940230051687,29.35564599809271,36.100436716669314,76.19582918496835,2.5972303335505895,8.240252229796125,7.080829014186404,6.533849787742891,155.30660911158014,7.39269832808411,2.6828950985256195,23.145816605499498,64.03705689534281,3.4945307723045422,2.8402471021252502,3.4834524726277993,32.2628553916749,9.238805349647315,33.28790041066971,15.596572682496133,32.52099785276765,4.6482910229927565,6.186061244094354,39.25194058476356,6.057842910102547,64.92806842760933,23.63745915119363,1.2113831465678688,31.10895685612209,4.255313621449753,15.440058016441238,11.109154876322421,54.936748974622795,19.785099328511393,30.097045332308845,9.400231637302454,28.854177864996426,41.13342425041432,152.87596831691016,28.828521263274435,51.48974472471211,60.9021051363513,12.851311131189638,20.25566361129336,81.7992810272291,20.079199928871073,1.2691507330580247,7.823660414869711,30.95168026435081,2.651583608795967,2.4019494164783013,2.680756134086978,12.90468507715937,4.884491756431433,17.831430020483328,654.1549561568916,7.565582450902161,28.571682351226688,30.898310323102297,24.36501631280669,24.730148690529692,22.424484237001266,37.12874033589439,7.541154449420184,336.78678289412073,36.89688506396993,25.536503320266146,11.537337734258129,57.996780372548635,2.3084487646355583,11.859577910837501,10.439878372217418,2.057873745841581,1.9384439985634476,115.2546759720496,5.935927542403628,86.44751334607635,8.109809995118823,24.55309161073175,5.678911338629789,21.424962899928232,8.992877187689768,45.45131992736405,19.525007044028065,22.542455780964303,104.10419952550245,1035.017444635664,15.871130410963461,6.720892734811733,6.604393608587425,35.10728971002412,7.1471151566950795,1.1421319038062305,15.31146474698068,29.65865262367274,1146.8685825654334,24.402739824096088,19.496113256277958,3.7723150185497514,141.94224808709453,7.792257177802949,12.568528393163344,38.0497436810028,23.121906845761732,19.151365650941266,19.571868361117925,22.03828247046038,276.4298596921747,10.889149872587288,71.45347582273452,15.877929366949871,2.0084954271246995,3.674870700394951,36.229878121467706,7.388473990831581,46.47245737053642,19.421570874604512,13.147411870891874,14.57507644558689,2.896979570130596,5.067813409966752,11.93245682622225,18.188638213774887,15.41974598976157,23.13413401500389,25.908578001837064,3.1135209912012347,2.390092150525076,4.9899156684888295,34.56171305900033,141.82733800312081,12.822372307800721,632.8793342472521,3.3214459615214675,55.39944321175988,122.64547342836599,32.078912424009204,15.144143277492129,16.079241249894068,66.18654198354551,36.06360369542997,358.7903812054502,9.245234561169822,3.778324488786726,1047.4139592804388,12.129402888092526,24.853234892430585,17.21650017823467,31.442286463622228,6.443688627750183,15.241210951466257,15.384594342826984,105.64172230234387,27.283901056949034,17.62349053556256,19.57526383472038,16.543002840950308,82.41984081357475,93.86153797220506,48.39112317585941,17.450641756881513,7.900004859485146,8.79010392992218,33.25116845378131,27.657928887566694,24.523976827314932,56.915850031893505,4.878004420096681,14.498816617252228,24.14891013821454,6.020746412330841,3.184339787335302,5.849415535505941,8.056664486603673,65.6523365417233,21.375185808706778,4.3006238446138685,4.557897992404899,21.65560440975669,3.1114934329541795,14.581953083478728,70.39939946844068,159.84962368079414,5.723768034720768,23.532565391768745,16.224446832658945,12.111449277582635,10.28550225829868,24.337421542039717,144.96147941922817,44.265285449994984,16.230916212593524,25.097842730847994,24.239422786061393,244.0624837006353,35.62039135645186,49.29533084089511,18.758797044613043,10.759197395734946,25.772626842650546,4.429734683411844,18.52744703798563,3.0413363334634727,21.948992071984144,108.73741527267633,12.705275858724622,71.85036810093466,759.1044088165912,24.86722137149354,44.60844662743532,1089.3508901852083,19.293461582670933,78.12621032504944,22.888209800513675,13.103521065256617,14.114638979462816,187.67100528544978,5.2138309448336155,16.882979779163243,20.619245719098426,35.034696766890804,48.5256411947934,8.90528087471073,97.40852536883314,7.356760853371072,56.95101118671628,5.0415980985654265,33.603396784452656,576.2001683747228,6.930413358807168,7.779354972133048,9.263792899956798,13.658860936156424,32.073076735856766,17.96474132430472,2.4342995836930523,10.533908322278712,17.424670432130448,1259.0615445154551,229.1401618809635,31.425356952086606,10.781901206182523,79.98298634768386,9.396560592800544,9.941521992510657,135.85373415980078,4.3580258927405175,39.78910713355889,14.849000548912894,8.77263809825889,35.713952664271865,1219.1595618923118,9.724135065279118,13.601673529870757,2045.1141000824102,13.358885305148124,44.63777296585026,20.5786178250263,5.069473987019045,37.43510036609994,24.169199249526944,8.593577377445923,6.308411932404089,36.86761214746731,4.3305812496898195,39.209421813217695,10.305423319712254,34.44952454836685,6.505817495527149,10.113465497940958,23.53740378041149,36.34217121914923,34.81101996467927,38.803830353284,30.549618511756876,1.5296007476955455],"x":[0.22967787259435798,0.06955507986271098,0.3257261904019824,0.3399734607879513,0.08318585396533867,0.08837382221420431,0.07806203467721967,0.1313898604223644,0.2612082258161008,0.09750954624717909,0.05589353300195304,0.27382698386559234,0.09778533715642324,1.0551192450266862,0.1339915877972273,0.18832527696425314,0.373059001921886,0.24300111546815037,0.20134000604554542,0.0724131147216788,0.6062657888449582,0.3037683713146861,0.14187490072104805,0.06245350754555142,0.08621147719364892,0.18839592360178742,0.20773939778455203,0.08010276672502903,0.07884841587663957,0.15130349522495737,0.055101756793957686,0.06963739989182738,0.0931929450595175,0.05062880161972099,0.05364018393390083,0.0483430891606054,0.2701179114221124,0.05364102505944956,0.15004786143230442,0.05858158483882743,0.07439783947474264,0.43345854078193224,0.07556848081189572,0.1297056322912199,0.0782756910034807,0.15747864942879045,0.11073195865057837,0.36851344749394466,0.07144193259274997,0.10391645270587602,0.08475938431288328,0.059705662497298376,5.006516575187705,0.14717053618509038,0.05697649939795641,0.06292389086834152,0.15199365189391106,0.44084297069383477,0.056750053507879754,0.16860577942208937,0.10567184357807512,0.24276325152419556,0.3528149926368653,0.054125330809981394,0.05125488397064058,0.6468658712592286,0.08962135865498579,0.27978962445279465,0.05705383370492339,0.057359130196162324,3.5365084456562954,0.11072469826415884,0.6625641773539701,0.10675886086865312,0.08721580558487381,0.08238819426873879,0.11489983210905196,0.26784654627750704,0.3365254464680366,0.6150732243182981,0.07280393397142926,0.0511586218487307,0.2083453234022309,0.07306170620752918,0.1338335143545451,0.05425727553206701,0.3666605412481759,0.09179027745828523,0.06979996120049445,0.059716417770333964,0.4706428322143008,0.07197175647622402,0.04887369137936809,0.05527233147660376,0.050914145237669524,0.20374740885443232,0.06530175763363567,0.8813947945859694,0.09262347739576607,0.22047491437733352,0.05434117463668552,0.0993289200854256,0.24605880899203625,0.0947902754104146,0.05055807611647554,0.07141927162083771,0.192279932358765,0.05782138105916644,0.1783429495750518,0.0909785464152637,0.7900600234165741,0.051480047273019906,0.16024639350275827,0.05525045001394729,0.12620002607981173,0.3327629184765332,0.3546053483089997,0.06380741228462088,0.10291790604483411,0.06269143120645976,0.12869802532743693,0.06210285451797353,0.06445612749080418,0.09504422756017428,0.0513192986959535,0.2294443904036177,0.43127415132989,0.1575269015609093,0.07742944283038382,0.08961262577917468,0.09263673693391278,0.06944966685837557,0.17271956508973396,0.06818072191425618,0.0905129386461613,1.3167627902447823,0.09134173387573016,0.051669139488771144,1.5362515832252375,0.07187698008526863,0.10477482035159741,0.09562906129128491,0.06737783114297517,0.1749365493023966,0.050197448657791285,0.12256537743675114,0.2548414334746354,0.055892349896812965,0.06057830033423963,1.6194600856256138,0.07812225402656606,0.05863664329029659,0.05014292351778666,0.06149599797180554,0.06626575754965343,0.1786897829225133,0.7805211017180717,0.12297128306046552,0.07462208758625771,0.06864409928090681,0.05093683436243708,0.056816735089108235,0.07380704985843813,0.05894903168220611,0.09960621102870235,0.06662878531179531,0.05584361134586198,0.11895253710062087,0.07638382642410732,0.27478778064201725,0.08060790992617607,0.1059100357755791,0.1667625202743407,0.11037888374197562,0.05990523689727353,0.1498365877408295,0.0637708046012243,0.28435554413940245,0.33616495082386044,0.5880424122402332,0.09924727495061628,0.41619262325135886,0.08097411345902437,0.04929766519194906,1.1914185743891483,0.07786021913346738,0.28630285840895087,0.11083234145810672,0.40464760930993854,0.31998631759262264,0.0838402181972212,0.10760139212334009,0.07019353491346776,0.06553498796286819,0.05530272191079044,0.23652190677546203,0.10742802746504408,1.8506661360873748,0.08697656768821888,0.0884123800845881,0.19447810660712528,0.2794027370212172,0.22469396241369463,0.05843070571803055,0.05399254688867373,0.30203234779702576,0.6385151374174898,0.34870573815078026,0.2504006626498034,0.05525645018609516,0.07265167422041759,0.09322984611383774,0.16342456302284475,0.5349836377051214,0.33867634863207285,0.053341776831247516,0.12680150347246463,0.07944626968818108,0.11637473602210752,0.07814164979857531,0.11261580800558336,0.056350554763902716,0.10212619540088143,0.7178700700515627,0.11636019429124134,0.19087956877089934,0.05122943315582614,0.09518193365750735,0.06600432257657762,0.0854530346587014,0.24924814844250093,0.6550078744326089,0.2081782528608628,0.05969903224743637,0.08264390838493552,0.3315387369779469,1.7286281624123603,6.307510429196049,0.0998157482055605,0.05785738654753908,0.05668352893142212,0.0960491750259182,0.27067251183760355,0.055749468619713693,1.11353076370842,0.5776087642185621,0.707782850056594,0.8387744920452693,0.05740218160883283,0.05487625787353824,0.6169742029039197,0.12415102534025446,0.09193490336510772,0.3403319816643372,0.09718684761911715,0.14470535243025806,0.05646942344181784,0.07511739016709519,0.4055324637690988,0.22543486183485922,0.11280893896498549,0.07670602612482937,0.11194002333531483,0.07245271244890414,0.0863568339937012,0.07625133718415036,0.06450504339312821,0.0877019063363359,0.32246198789471575,0.06980234984206267,0.05592542908669679,0.1496367703332302,0.3001616342034079,0.05673726666528507,0.27930934813603336,0.05519172521499253,0.0835446163416655,0.09125153325792602,0.06760629707620616,0.08340348854701976,0.07792563419406096,0.16259584202545288,0.6640224754197438,0.08427188313666445,0.08183846696070529,0.26406674007631686,0.06749344142433596,0.050012412224487456,0.2827968417530829,0.052666427786254986,0.09426584461814057,0.17211929126628933,0.05176081279959769,0.0643653853634123,0.09040844351343419,0.07036501729443101,0.11133333795149165,0.052785393767243345,0.10834187696972684,0.052655754535407634,0.6746761647024277,0.19012769499767096,0.05616091150352363,0.1173028603730708,0.07709784316951634,0.052283518440259365,0.07504810524544461,0.43827662353809776,0.13345034980240456,0.08540819836616449,0.26499363438370444,0.0953545505146323,0.09108268875330569,0.05969689945512086,0.07158024757530843,0.5287433105337812,0.13973982509654748,0.08736011476305265,0.12237998620048708,0.05014000779824634,0.05418325094440965,0.2065890968983639,0.1534293149067738,0.14998802156605465,0.054823424475509336,0.16327126800424535,0.07330172279739428,0.049701401616441036,0.15385601173036278,0.06712363821597332,0.04905003671651528,0.10450289747254339,0.17169440766018448,0.17598175951112288,0.7260423408519499,0.07988810758843845,0.053847037822717735,0.11104787258616715,0.13246634956268408,0.05076694210859876,0.06034192662301708,0.2339806170672375,0.11744160660513911,0.05982632847929422,0.08720618636287233,0.04819827655822307,0.08570666564991634,0.0595066234008404,0.15179088619993278,0.08746111267714943,0.07760648530321228,0.18368651059275753,0.04984942927069167,0.05027216252129984,0.33147800180154097,0.07658557779969245,0.09186783077118041,0.9655634806703001,0.11886345845602964,0.15138041469338362,0.17602022018898464,0.12266505039255739,0.08539325450249775,0.05053333784099311,0.4139706163857449,0.05680466801277713,0.056089257223986944,0.1974695197431041,0.08076379210125789,0.07109901567601566,0.16060799978549323,0.12722953239139598,0.6340225465419722,0.30761027454664414,1.4158973089734765,0.24852565054536266,0.18963608306000893,0.10096559670413216,0.06371977511312718,0.08128329706718808,0.12783099760342753,0.8292814241726595,0.09638334525350044,0.0750299161556985,0.06415758451678778,0.17248168741064382,0.2531565650040544,0.06219128175274557,0.060911086907670046,0.09400196704640926,0.12119841323015569,0.11329271249334853,0.10216199941311677,0.05250322759702151,0.2071861310415784,0.31436786288270824,0.06985313533971076,0.09060724865479892,0.08643995100227331,0.11438808566886027,0.05520137679397991,0.3227926767223524,0.10263685195371779,0.15008434338419616,0.19699650504314392,0.06242974932699189,1.119184012424567,0.06233013797880677,0.08614609749623617,0.45864806355541576,0.06939322442787466,0.1862158590631859,0.07519689898713726,0.04996428790419609,0.08537290419638631,0.09069827151906604,0.3565526286850628,0.05365674368898049,0.38248723850042143,0.06702126695493449,0.5707683201861599,0.06263781404624831,0.12648578396990107,0.07042752012316082,0.05547678355561072,0.0743207323453435,0.1982955796913892,0.08328465198536347,0.05095294185867501,0.2730975674359432,0.2099854975376142,0.44469938787364005,0.17785420276527125,0.0903009660882321,0.36354473272169946,0.10231809039964714,0.08372482143649317,0.0608888015863987,0.11479283765228279,0.1578325472777711,0.051944692274350106,0.5821769877613006,0.07990985303026914,0.0500105213350786,0.08129086118662013,0.06651530109962546,0.47523361111840084,0.08358170008654098,0.3278210244691992,0.06328084902371284,0.06026379551479396,0.5373172074592031,0.2234241299113566,0.10816583301971745,0.24313287055956811,0.2055985673401937,0.10641660158558307,0.10105211032552221,0.2813942187083219,0.14411085647064129,0.0704166120621321,0.09710568746851853,0.051132992928261206,0.07060191411793489,0.40678525784966224,0.11429780990021587,0.12082044465936086,0.09046238964609958,0.07559616280736563,0.05181302656972772,0.06293998213919384,0.10392068183729193,0.05478032407344242,0.08818192227783113,0.42553792225030435,0.09090708383478312,0.2821411618929193,0.11121752138045264,0.20188363268681553,0.049803379647040597,0.7528861624046813,0.07367150064979493,0.06685886027455468,0.048561003514003845,0.9212752401473407,0.13746542500112738,0.12827916984934015,0.08535588524486408,0.13740892228909815,0.05541069482339042,0.07910039769472398,0.06886331119880215,0.05586659147737714,0.06909821997695526,0.5626895973930504,0.3024832554919691,0.06409502588105082,0.08190667535390408,0.11420316590689589,0.06469614949096647,0.06873080545126455,0.17165650334474264,0.08894604243288377,0.10226062134168547,0.14288712222905067,0.12837888768859512,0.14481597070401966,0.050129909892700705,0.1455698125015979,0.2495572915484277,0.054725807698985045,0.06562533119973726,0.05065453271347113,0.04956993077866275,0.05268848533022121,0.10153790654469479,0.18645787276705839,0.06027129819459422,0.15374014999944738,0.3660797486839485,0.08686467647776573,0.2728013681548854,0.12120425565705693,0.07269310747605272,0.04990746185147455,0.05543519061203239,0.05903228699268341,0.1053899840614236,0.10427857070687359,0.6103947511334807,0.12442399388895135,0.06497000951422464,0.11963103842630612,0.18768048415789285,0.062031789045754265,0.05046332903174068,0.05230772621373613,0.07185221586712726,0.052494259762768974,0.07840820280725308,0.0672960920071363,0.05125661928616034,0.10079190389991148,0.33535292485689877,0.12550580835766922,0.11045809023532466,0.4564898760001269,0.3151783402901206,0.0546638349283886,0.061720300887633736,1.8266157334758588,0.06588918820835643,0.11216569001884032,0.06398207906050818,0.8482557063810918,0.07246958466262725,0.11842820665019224,0.37175661680671257,0.0651328926485877,0.2813940718435613,0.05327898851535891,0.17706423224011295,0.05125640524921999,0.659495868796911,0.24315822275929677,0.1278859551109268,0.07974960282813565,0.2065686262346776,0.2862349888129639,0.1747895220809168,0.054750741893159184,0.09528805054043511,0.25217882136003766,0.07041221453337825,0.277655977232567,0.13305090861750185,0.22362380266315018,0.05636156488457184,0.06765121164902549,0.057459462646316406,0.08453593571296904,0.06978370933707863,0.07077925655066658,0.09668186247009615,0.10726836670274734,0.49444808253263334,0.06062598614600521,0.3648952018931673,0.6401171250592574,0.07964014668531372,0.5698637434333326,0.054154336343649204,0.10222762015307113,0.05236168056383728,0.14075156896397842,0.14167428677045632,0.10965652159224586,0.0495039353052184,0.1254942519155109,0.6552371638493364,0.1962535639439648,0.09426414413117581,0.15045799650772318,0.07573564013886235,0.14948431512129423,0.139905699703101,0.08819968382004928,0.05848771931557866,0.07531240829738156,0.33794247422716656,0.09629299072583407,0.2011420035763156,0.0510562589735986,0.05586945544590386,0.04824521782852227,0.08176879529063417,0.21816704695402891,1.3936677257664114,0.14149180043096457,0.167042995153549,0.09751873511018513,0.783535112898651,0.422847179487305,0.07743173051859406,0.13129320777191333,0.08698874881440283,0.12840212764635064,0.10938344298133917,0.09596285118305145,0.058048554250172225,0.3025037828766727,0.06518637441764684,0.05057118292575857,0.10212392441801096,0.2762842345092626,0.7963409699825904,0.196949628938374,0.0796266392420884,0.04980186799318862,0.16348684177107722,0.05178191787549441,0.07360074422742759,0.131976231338907,0.06972563887643052,0.2036082748354084,0.5039572882863579,0.05295956922463586,0.12269223703555249,0.05317906062352747,0.21966570556512885,0.08035863756444506,0.37801280934551446,0.057958815287019134,0.9167065776348826,0.06835891692894143,0.06260945392957153,0.07604549110215515,0.07018860144180425,0.05051831931046849,0.2110448001859648,0.08374000426998078,0.06875705536880931,0.07537572895177501,0.050415318463712645,0.06259615465298948,0.0888832960362983,0.32759751041431495,0.0623976080586785,0.051261146069382806,0.19182795802541538,0.06655837826587076,0.11118927298343959,0.07015805427902928,0.1876870003333545,0.5718109444481164,0.777495234977427,0.06369199890575414,0.11465297031611052,0.4583746040300631,0.18680316747418393,0.11741897632023753,0.09668182053797231,0.05643848613375064,0.060276009427463244,0.2227589767559456,0.060805198695508,0.05167469386105629,0.09365962554791742,0.10052789089377628,0.04878203754528018,0.05815543268996034,0.6274265599906941,1.0526689266389078,0.3161303151772501,0.3731576732896898,0.14880406309395067,0.533237609179752,0.05052342935133133,0.5629092521059382,0.05709467133976296,0.22913490578808698,0.06625149221581583,0.052919595281214045,0.051657664754130375,0.06187135895846879,0.16992563775775432,0.3525252940123584,0.20781485544924375,0.4566621407037241,0.20865284368092615,0.28903020501376797,0.056696579727261526,0.049457397707978606,0.08702371606432492,0.07127828182740335,0.06019590815144327,0.09708521889290112,0.2201895768756708,0.14479091467486957,0.05443337333005175,0.06646177624050337,0.06501409647120206,0.2731367536160326,0.14476618975697234,0.05534631810496245,0.0484865579978238,0.06174852767786511,0.049771646683325316,0.5275403441621667,0.13613246690004896,0.1564692525300804,0.14884815273363766,0.11670643788637919,0.32941286140991466,0.5936799761122028,0.42059244100644044,0.205386345059522,0.48280048932867475,0.42124325665523543,0.6026192455664012,0.05108671546208894,1.5748785596175887,0.09953096944673778,0.06487147944529069,0.05683510745214688,0.2755309383566085,0.17309486258968002,0.049322299242490666,3.2854225802728383,0.2403636569890109,0.05261555791272197,0.8917062525895273,0.09045263038895482,0.2208873125304985,0.06575279167911428,0.13291346928763464,0.050061015293141095,0.06386424369335045,0.06674945547538282,0.1299478038359684,0.09627938658425285,0.09518884022672021,0.05344516111114505,0.04925352778367299,0.05902577313114855,0.06038900836685074,0.09474985034386195,0.11559415227081293,0.0557879088703573,0.17049968789031508,1.0646715966413212,0.12854717273764935,0.06554448683453329,1.0154521130670477,0.5493537161923367,0.384084254955295,0.08316323855892507,1.0895382438636458,0.06712430697151031,0.18762802434399467,0.7048504347427467,0.051491909562741356,0.0562542370546792,0.0522192331270878,0.2709839178442543,0.06811281281367498,0.08600183512205586,0.19539070595849956,0.06245472669351121,0.13235972342951163,0.04970065762655458,0.085859010334634,0.05322830813320243,1.5482142395221967,0.09943073854367379,0.11547132143000202,0.5956087184648752,0.7285739494858694,0.050338846987579476,0.21244775249767417,0.06870928746679596,0.1379037432816455,0.08019748247209862,0.19850298711314487,0.04966772077132095,0.1765509115567503,0.11519575831902562,0.07950280783080238,0.06115408099072704,0.05514138598933195,0.06829600961582756,0.08920855446587296,0.2549653792351597,0.21077140727742893,0.05932238003918758,0.16775568915660435,3.0699503633686978,0.0928070082840834,0.054154746597213005,0.07153823827155605,0.07052119794664079,0.07575805655368087,0.42353886653575307,0.2416062062513337,0.15798698916406023,0.08237383099732533,0.0824499385259964,0.05833365032965097,0.08413751355126035,0.1547586881694873,0.12902484460814637,0.0734070279862624,0.4455002802592638,0.09152917047252998,0.0784327120697422,0.578972576941275,0.27020500332312714,0.06398110839192284,0.1489235339887481,0.05476721178649207,0.05601324962013026,0.08340458993258415,0.2809883634537747,0.688105528102267,0.30163650813321496,0.13834580227950566,0.16067342922209332,0.08424109322193452,0.05718617856486944,0.09719250594190391,1.5825314593657342,0.6319935863755386,0.2507314635956143,0.05301755073959193,0.06281056973419887,0.10068140577831433,0.06942692913814048,0.37240661620951926,0.04995515333552965,0.06228482333390777,0.06645504457871322,0.17415548693400115,0.06356224851077881,0.18171226571502372,0.09253436487209833,0.06546388609913589,0.14074349342317,1.236177331998729,0.14477642456787837,0.2495874054088798,0.05012487594432832,0.11294531088836102,0.07556862206187284,0.18362406149104918,0.08493587037690165,0.14895337183865048,0.060517216978314275,0.0820714696048516,0.10007112390797075,0.0526271794584529,0.07045469764815819,0.04990217520862189,0.07163370988408499,0.062162772375989286,0.09063791711238081,0.12929636777804715,0.23048875642220062,0.14732921034120083,0.06389943310794202,0.2615325366073411,0.05207628439991615,0.5236274583105867,0.3779272056881805,0.058198288662990705,0.1751206261527273,0.3699727535362904,0.2151325811611143,0.13083312453291343,0.08877481217915655,0.09869624344676182,0.2518709286681397,0.8658510689034852,0.17369407927377506,1.3656635691175512,0.14779409008821545,0.06323885479612015,0.07575139727663764,0.2790469930592349,0.05100405387021809,0.07791773614767508,0.1366959840625214,0.524474565447794,0.14018839740837089,0.06499760393692944,0.06342451857741871,0.17080614304633152,0.05025811046192245,0.05292404324995292,0.06372415619016816,0.19526641047052867,0.06476464923840951,0.05668064792519744,0.09678050498147407,0.06345464594460776,0.21372589446545975,0.12488511364116839,0.6080783781157448,0.09691728832120795,0.055395675304948246,0.07886741795360862,0.0800168882940259,0.0674200777438231,0.08681069276179888,0.07513387728976705,0.13573637745501366,0.053501700119786194,0.057180864159334335,0.0728941192387057,0.19024567075903875,0.16559107741224516,0.10756134388558905,0.25869610814289956,0.06150819993157673,0.05673333608484127,1.184094187153152,0.05247020721518367,0.1257532029534537,0.05077840148963399,0.17508156904809255,0.09885769106138269,0.25357381338261364,0.30317256418486466,0.09661201173061369,0.224466064186298,0.19874298516745834,0.10137190698794306,0.11117979844679084,0.053576805146707686,0.056694748657405813,0.7710493415919618,0.14257218896402934,0.19268503895649677,0.09032910541317393,0.049992741306227904,0.0992887210185725,0.09782097347951837,0.08165295035687907,0.12697932035570259,0.11884921781708326,0.05307477461111401,0.2914670549058303,0.07798641660707942,0.11035617520819618,0.32842430191522026,0.05870035665190702,0.15708825807505733,0.31913890978406284,0.27770173536138376,4.58828403278108,0.09664868056979015,0.06409321260676029,1.0054718267955434,0.24378079205694486,0.06450948734608847,0.1044838855556558,0.7204715510657562,0.15027704403649716,0.10499697944634753,0.4766588432604927,0.09627302020827977,0.18995815589893372,0.05213852400800768,0.14928595073904374,0.1434028867430269,0.050539884623730505,0.09655285846271797,0.056990404163579186,0.06731782523128872,0.12795034545160605,0.9877423965618849],"s":[4.089437859967919,14.101240788336717,2.4494439610774332,2.8741905198929096,11.162261490480528,10.417376963046522,12.593682911430793,7.2605353821053065,3.078568544499185,9.36488610868179,17.836526523786898,2.812883006507505,10.033063356567231,0.3705062296266082,6.62509834330633,4.324827239004763,2.260490397639665,3.900274401483932,4.383501502868459,12.889601905636487,1.5123256265572005,2.609571381264968,6.7559499713627025,15.683655067040107,10.621250643425334,4.763784332047121,4.504619838148907,12.174362420547178,11.912078284385913,5.801043919204454,17.595574829092143,13.615294563680127,9.796913931333929,19.007942054641838,17.646198888441532,19.71281550054566,3.1904238581907762,18.463471212252568,5.753864530308683,16.721087911547908,12.445784331325381,1.8345260045119272,12.463271601992073,7.345023624421021,12.218618530299693,6.314895370213307,8.238993859582688,2.6947707659688636,13.568455788471919,9.451184156664262,11.372315722471193,15.817057775462393,0.19232971395505505,6.781568194789402,16.797075282981694,15.32625144236528,5.953659216662488,1.8160579099781105,17.342580427792747,5.237334196638002,8.642828422261397,3.429821382563012,2.5563960603496128,18.40155905367964,19.403158510337576,1.3441909857183232,10.671777589026883,3.275870011397757,17.30158598591554,17.195525481340155,0.03363464725509857,8.053829760686174,0.9356680421777464,8.398666685771214,10.727539243993078,11.83330326772252,8.514199007845495,2.8508120357071443,2.941283625985287,1.5997622890963248,13.342774426847495,19.351548817747812,3.852677602055934,13.541617012327269,6.988041536776848,17.460173312722596,2.207504981110504,10.744597728488849,13.38237348005389,16.05087496035302,1.5708090612610892,13.383139543875352,19.95004974417776,17.956910408742246,18.671391030179837,4.543305274569023,14.388219054201974,0.8249088919198089,9.886430938956106,3.567068191932332,17.698250155226496,9.997513220640982,3.928718672321758,10.492800806023626,19.369080145558797,13.862182376557177,4.8181236636872615,16.965807048743397,4.927453475297319,10.488213033613366,1.2594413494363188,19.180283294184306,6.12404351182561,17.70556461721133,7.723761328023597,2.350101924287844,2.1390538380079516,15.266886462198297,9.544973473040127,15.805033019977422,7.147215250714551,15.959940076656803,14.718958458539205,10.239927754595413,19.14116320961608,3.737874099989842,2.001987123780844,5.934532605188916,12.278808604542814,10.603178650211188,10.122781072402116,14.223118640215272,5.072233856392514,14.616884224885215,10.76470263027932,0.07398806822098258,10.290133821870015,18.820406324089596,0.5923586096181443,13.139348655456207,9.5195348901784,10.326888116842682,14.30118590052684,5.409845050924744,19.794025080847714,7.557583952246372,3.3978696478466697,17.167161759740097,16.392677517295287,0.5238360405667519,12.05939633573815,16.056967289136146,19.799053671054942,15.606030427992984,14.537868671594794,5.4701835753752315,0.8993297026604852,7.150746107751544,12.416128056348107,13.873751526826016,18.730641087480873,16.936726476868525,13.276300467511696,16.325132513664094,9.143432693412215,14.205046765148879,17.511150041952348,7.512508408121521,12.218712545468025,3.470326726825781,12.146942846117884,9.331147131094841,5.85585174766984,9.031079708400513,16.137486200509624,5.963268486978182,15.04282220052906,2.6201540168453397,2.4200638525412144,1.1767890673384462,9.888799625025788,1.8162785011497773,11.47927681124914,19.711153291854725,0.4296565852683365,12.706700844419805,3.284022924260719,8.90769297296583,1.506122407762005,2.252876021233936,11.841609229193581,8.546044501116192,14.221010864013678,14.68724229958359,17.349806373331983,3.4423524531783434,8.94964187535004,0.48390538413987993,10.710418282187582,10.961586717262168,4.492161731259374,2.6000115566615456,3.616348960780398,16.69917142583831,18.003109827089006,2.9045232588396974,1.109670275664576,2.210603002517635,3.636997010798617,17.767718834957197,13.104374872454802,10.523941659781446,5.891054496025667,1.0611118980173373,2.7641713285398195,18.1972202862508,7.54607354106934,11.893263195617996,8.222520747556295,12.577928639356353,7.975224136094012,17.112442152395808,9.685472840772512,0.5898277160881005,8.114598574243104,5.015353854719802,19.411857883881,10.086627957118356,14.338161598896066,11.090263951222106,3.199629637689081,0.8219279988513861,4.56475488098917,16.570659232456983,11.664066278364826,2.821868333025579,0.08792244467008992,0.04735918464482847,9.7273787335644,16.950282504677645,17.61918749140337,9.500797485747228,2.760320932196678,17.898638510588768,0.5641348838903903,0.9352405148744225,0.8175980190590737,1.1088481566889197,16.600936590694996,17.29917173478441,1.5520811780781285,7.203521501433032,10.458321207599099,1.9504476398052084,9.383230574016114,6.432346154510933,17.027156134818426,12.32655270335815,1.6343549484128728,4.025608610659406,8.336495362538106,12.18355609940241,8.848236477038466,13.09286561377708,10.946993568395932,12.971335776026267,15.161048606133267,11.331503659586879,2.3953848105355258,14.124777233456864,17.49181260485802,6.612498228281454,3.2273892778185287,17.19172946550565,3.216370701882556,17.260008900191018,11.624286451634202,10.76059762664729,14.28446355359235,11.483616506458638,12.31215112188686,5.513684375764671,1.1841102899164513,11.244086878606732,12.075612339796589,2.8517819029146363,14.049454098147782,19.98404483970689,3.48004661621117,18.979558168016105,10.174336014644677,5.171601703399862,19.078311646776108,14.812384096274105,10.315507151399355,13.772772753358655,8.884286119733552,18.001571631337583,8.58765994615716,18.570164535566835,1.0170847631267899,4.7211749385287805,17.54291181746399,8.250524890184625,12.067085148170712,18.639611868695063,12.603482935587218,2.2521297163627185,7.112241067987846,11.354461895978897,3.047083205561072,10.052918538400624,10.01206745230958,15.826023480077417,13.088418432285076,1.268565473869434,6.435369888566624,11.414198025594583,8.088266705112236,19.76258552893399,18.134759163963345,4.7303346638708055,6.252046701241691,6.348161808378681,17.723371011846925,5.521664810736038,13.186320896507922,19.7354968057028,6.406485889317537,14.483836570405728,19.93631380114312,9.261132510541348,5.619639573789508,5.053273126552398,0.9061722422435947,12.300118190337134,18.41887311133891,8.77605235374837,6.748978131501082,19.555797763941104,16.191585904637375,3.763156597491757,8.186705583391936,16.073638687279477,11.228521295261515,19.763148206817064,11.448559317321635,16.073883746130548,5.70324740405737,10.923376280445979,12.550153993756862,4.940389985440858,19.52749621591598,19.24589380305339,2.9826300317884513,12.85055417985063,10.857429235833301,0.808012430422913,7.55985094006534,6.56168825193816,4.703004543258511,8.035104375459552,11.238338948095157,19.578385878734466,2.4044392882486365,17.025333574861943,17.287832031702102,4.661919206680514,11.84331304962397,13.656692962889124,5.7389095619063735,6.965226180549058,1.1269788234212985,2.549205915086321,0.6614239271037592,3.2871537516492566,4.617701695297223,9.72455075493996,14.86720626741147,12.206993003365781,7.298017774994472,0.48086278462547316,9.980497278525249,12.798588213066688,14.663661983974205,5.438707103060634,2.9697536259747137,15.5253397797383,15.724952123082602,9.729219731308628,7.410277208084417,8.374194341123019,9.563684134758091,18.08163369191577,4.585338435085355,2.959376800151423,13.642617237306993,10.364954202516227,10.68225447778297,8.669229832894455,17.413170320211115,2.730957247210335,9.517801641497265,6.202197838538628,4.591263775735519,15.638934706813309,0.6622996768117373,15.185742228598343,10.973918407114983,2.0758394769502875,13.669374877734635,4.487361001116503,13.144212993684391,19.229301625235532,10.8053493070182,10.7547325090873,2.0297162373624156,18.599883262347564,1.8949988212637248,14.779378375426093,0.7802735509962844,15.456152369004382,7.741003152434267,13.768179938228272,17.470258593719585,12.720252196632389,4.227594798402841,11.48042744833302,19.450512436521798,3.231189469215532,4.473770119436091,1.9987702226997284,4.733749173428183,10.854322477841457,2.600791595123657,9.041059072134932,11.651400099858758,16.091784317295875,8.208143066659623,5.777780189261605,18.96743416481057,1.3776222469999455,11.559901863616474,19.77610062810642,11.796769822820522,14.653331835188181,2.0950163383122833,11.467835306887832,2.7785647481703846,15.618948582627127,15.601222472940988,0.9878629914502479,4.169664032687197,8.757507519914736,3.4529763135494607,4.811616788192894,8.636537163365459,9.487062505086508,2.7905625800079337,6.42443507663506,13.232943939995003,9.642902038356,19.548862146079546,13.857170429631882,1.6370146254516493,8.341507824855189,8.072696196534505,10.76595058823771,12.44784646013191,18.850113189050628,15.13301508484016,9.30094502263759,18.226312565375164,10.576408043521589,1.385965575347261,10.409699161679828,3.200048137275724,8.638839922180166,4.08539383168411,19.885976225473428,1.3153678123203072,13.016623070056617,14.679576444490818,19.866594137313925,0.2037049603013097,7.059732359020061,7.072466128110864,10.933568358956002,7.2531150042476655,17.231946536855162,12.115719144587844,13.568416603510101,17.806561212025684,14.366675097002112,1.3207821948275278,2.8728218843690367,15.132021902901126,12.112643382862828,8.529339996060417,14.568383045381292,14.083248852596487,5.3481604564176655,10.669565122082854,9.691424002286016,6.801172690408137,7.395880224210241,6.136689369213517,19.129823855522577,6.402051469907484,3.7445967160857485,17.286577712192255,15.01512216890978,19.007713208430715,19.44156884513843,18.857331393002106,9.145964364864106,5.102215373117915,16.060458692714334,5.760649495980403,1.9410484024540287,10.877220261832692,3.0899450421485852,7.812467259340008,13.523588917373125,19.85724188680795,17.79100957530602,16.121680005959288,8.570352572999077,8.863179315157833,1.5088273486015424,7.9159969068071545,14.578760425481768,8.331409469261605,5.076983173248881,16.092884374343704,19.12600199466366,18.329319656178225,13.711681261630524,18.055047436152446,12.605213658926155,14.832024674877378,18.95840256593523,9.38654482771839,2.299026836825684,7.593146399960395,9.039365509796738,1.3759251350779866,2.7984532833865483,17.764252652909786,15.500309934938453,0.45122262805587177,14.753229594870243,8.606788829199918,15.341355549148599,0.5022903463902173,13.53906807199456,7.465086344379395,2.0647563018796067,15.186249647890477,2.6070297446419355,18.7640566826639,5.0806497464773415,18.894390315575667,1.1575706699939836,3.190565214243297,7.747427934010931,12.385366896516441,4.810148353742876,3.0242233711547417,4.728476792811849,17.644484568716425,9.900563832458293,3.029006738560045,14.05554049598338,2.794115431792088,6.617171584518857,3.970565180849679,17.108513026486815,14.128218463161835,17.231578304700633,10.970968956200542,14.038535194267583,13.257721653636448,10.091413290668761,8.355877023853363,1.9886088607906016,16.439197667513298,1.8868920518045007,1.222467386463859,12.538836517577089,1.4109721484019477,18.171616423092644,9.593182791786084,19.08862446366486,6.479503262463764,6.680928386783811,8.137121357286397,19.698314868942987,7.716117442292907,0.6463367563128397,4.735806181597044,10.474307316094752,5.941846477884112,13.173336134694589,5.707436130694914,7.090424304787981,10.918184637061298,16.534871274555755,12.943988070227261,1.9852653938023446,9.69089567664307,4.8161879223780035,19.491048127885907,17.216500142097576,19.990957752226876,11.837632610058915,4.147285828429421,0.33295323663215637,6.831165609511891,5.785955669028686,10.139532536069469,1.078098591730452,2.2366282407123927,12.368596680278587,7.457691161522142,11.337189702616879,7.355600103230393,8.74608039573964,9.906027399280894,16.935019914765498,2.6311966435605205,15.20471300860958,19.541563252054495,9.220790125043763,3.411284819991467,0.26683562771005587,4.534017768711713,11.614383950493657,19.99968442167194,5.2559407324126495,18.813211107529074,13.003295079569908,6.997890160557212,14.04649165765241,4.517686481087089,1.7741357973795102,18.615412048751207,7.49782148844008,18.47716821742084,4.443556782620042,11.872435789074384,2.4493091964524005,16.71813425747741,0.9963334211668196,14.134274093412733,15.78572071596097,12.863739946957505,13.966606670430188,19.592613247066105,4.355510781313727,11.716232963301945,14.176114384180284,12.53507902092788,19.486943468136992,15.937181221300412,10.95940422527943,2.2432019905900358,15.686034045383813,19.096360663619745,4.342946046981888,14.613292215347965,8.647715923962371,13.379379138318836,4.828684878154941,1.7485472578399808,1.0758345096140687,15.024098943257922,8.703884444903034,1.6719813543340667,5.0114632621443755,7.551881527327025,10.172781500076757,16.789551287810557,15.772695867006487,3.518594634437866,16.085114727915382,19.210360678911897,10.382893302408075,9.850913856056005,19.504770209193257,16.944151091961686,1.5204892171329965,0.6144910711027274,2.9578654259441173,1.9556701604873616,6.545057943332044,1.1011345252089466,18.940618510506503,1.4828669041491205,16.734235906472883,3.9665469016229515,14.718672798659282,18.44619424228091,18.853163162517088,15.382584247933497,5.3489113168249425,2.6218590013851006,4.168941411207245,2.031441161824059,4.431360232454491,3.3908554967578786,17.45146276892015,19.267181775950526,10.993663618073324,13.349940740022927,16.239783111978852,9.768224108071601,4.1764987726862834,6.209389890972563,17.769317935268916,14.948385251746942,14.758015414401576,2.7691674292447344,6.561838620733749,17.324001694407944,19.940816991619464,15.74802299372144,19.824490083049522,0.9300693351608391,6.479651965690256,5.5610816736327,5.7384042833444004,8.508575518104365,2.5631509156984755,1.0701715319008276,2.237904870545102,4.783071341627232,1.456558033609534,1.5683865479342973,1.1289014674939457,18.978429665648534,0.5055033636010897,9.728918879933124,14.463563318095884,17.046516179848258,2.8570188756879267,4.881098449177745,19.758261633954156,0.03133318808814067,4.093544256172588,18.21277893852895,0.3721326503101041,10.701770037618692,3.559711530763763,14.269381892053419,6.852227536072095,19.61546866488419,14.857094154724235,14.49772531718612,6.924282565948912,10.019990828928304,10.23668295567183,18.584685314433727,19.592752659515376,16.60997362607512,16.285636629617393,9.733346205055655,8.21992647030835,17.708140576415836,5.555118395374707,0.18154094393344256,6.798532734440528,14.747409839496788,0.020670954145298737,1.0128819993831728,1.6929128837404628,11.096675561769862,0.5412647773198298,14.0734850677527,5.320399205896336,1.2124325454989249,18.740323405221496,17.213829128231765,18.39082488094729,3.506438242337633,14.016212048873236,11.318402165184644,4.4248184055215445,15.962513150561492,7.355365849289672,19.33683321205679,10.706693786085392,18.464880728517187,0.23433953569531596,9.232867115512153,7.822260584365557,0.7932586965855348,0.3817547257525611,19.686916797526763,3.893551915613598,14.384520365979325,6.411325859679398,11.97888954482703,4.170277281377874,19.216041632318532,5.031187497080882,8.48264730365273,11.927886080020391,15.637229506608922,17.960913837464744,14.62715848173409,10.515643476895207,3.3819904150190983,4.055508977598925,16.3726831112978,5.140639569433478,0.03537860973851448,10.06986532824348,17.84039322301539,13.965997523506486,13.589941085377625,12.545828343362873,1.6896612451651905,4.10610209946161,5.528368092617644,11.206914413395875,11.793395277076888,16.4199915568881,11.266264784323091,6.124532772947959,7.376109260087342,13.570980609692338,2.0217806982925834,10.763654819953352,11.976946106284206,0.7638566022399473,2.7174110694445597,15.195992599362938,5.854857862940115,17.86856511422615,16.942761552664827,11.12210367985329,3.313231372526486,0.7787053475992423,2.5821825181290015,6.660411887105728,5.850837540442582,11.136761035009147,16.724141641822442,9.886246192355795,0.24215801286230576,0.9097551969003614,3.252481695057381,18.319004493624107,15.807169926118064,9.20232052039605,14.38089060576226,1.9865272609966445,19.645057294435006,15.919654290947957,14.5651398797144,5.380380755804595,14.773944732827458,5.415679302352254,10.510012411413555,15.230937233065763,6.345297638636476,0.31805046374519197,6.899683823245386,3.672124659997782,19.169096694083635,8.362633102036966,12.814885539672932,4.687616689643823,11.0037447654477,6.284782904632786,16.364610678192655,11.749679348741093,9.407530337545218,18.036956970267802,13.35609186323829,19.789075556232426,13.81107693987991,15.748639642793329,10.41538756759557,6.827636786049558,3.834172509013598,6.581779847373159,15.092827455478513,3.645363416148424,18.862852710239085,1.426939935405076,2.434043813856337,16.49698424325004,4.833423072949157,1.8477292379880872,3.861434968095838,6.690879204858344,11.089260360324435,9.657970198350814,3.126882733611205,0.7155949030175845,5.486009416321651,0.2550265353673842,6.2736633566718325,15.587365492186747,13.114460285686267,2.9367770957403305,18.804524081966562,12.083188383511295,6.7104112983644715,1.6374554359151983,6.8209229561665286,15.278199024450533,15.405092763948428,5.4545732914790745,19.115441036559773,18.12846029461681,15.625192737057102,4.957867670684224,15.119799711518137,16.73130524052748,9.38109075628191,15.166274587119734,3.6798112140148653,7.553967180661658,1.1686389537638764,9.842903062392953,17.88346471307829,11.707661767867968,12.325695282362004,14.812337546985507,11.04802682952843,12.9971709719476,7.35955039255614,17.757158679524515,17.261637291214925,13.127586931168874,4.855043174016127,5.576829060455575,9.24692805949241,3.089738799679904,15.31930763818405,16.79551733259173,0.7886763290395882,18.653247080976037,7.113613813619901,19.493081260751733,4.996982538338122,9.932368736611075,3.090978779454412,3.1970097968694233,10.3318065672755,3.865542683810914,4.414476114561334,8.884530900194365,8.346079115110072,18.096393881164794,16.669136985179037,0.5015512862798133,6.389073029517842,4.8807263356287445,11.061462820968512,19.91540693714043,9.729787201282747,9.299454757089842,12.0927277885969,7.067853765435168,7.550241260887902,18.699649207219913,2.5614328750024073,12.50396688493607,8.44084003040782,2.627480567961271,16.55630149196186,6.360351238513875,2.7387717078241502,3.351917507860187,0.2102288064670388,9.594023121418607,15.259701234768386,0.9466983987703159,3.384292873371222,15.088875522634396,9.182542374677215,1.1549558156344553,5.670436903879987,9.263363739911465,1.6656603692520955,10.104849891377885,4.720612283519161,18.61865008442046,5.749644432126542,6.285535462801701,18.950279100996777,10.05295158043982,17.03117737283967,14.473214095663787,7.551198294129415,0.3108708243499647],"mu":[0.8487584915514406,0.7315685113321966,0.11616374665109941,0.16968797131908064,0.7755115699616555,0.4211619780199818,0.20591420169692465,0.13073832239919225,0.8025121725112152,0.016697761048340976,0.385040873203532,0.914639392740179,0.35851291403214236,0.11715273653346836,0.9835792717359866,0.46984064115343616,0.2891335061109652,0.421274444129343,0.12426806652463962,0.9883147468919051,0.4141352760024368,0.9439465433011118,0.9832896352071672,0.8418321457859195,0.9040152687421927,0.6690716301146074,0.39522785722841647,0.5451180177747648,0.8448332586312446,0.8101907735746607,0.44531561987449186,0.4263832191029666,0.30777004095973926,0.9771939884240124,0.6519350516903144,0.4342612677956501,0.338346319681019,0.7424541972837784,0.8490987122433977,0.035156655672454296,0.8424794518174736,0.43433972204475046,0.5064139640951622,0.7270928621687418,0.5656056863405383,0.37586747991734004,0.8847136444112405,0.8948391580290729,0.3124499665245657,0.6930426109358221,0.3859569365820652,0.669147747796222,0.1748570126527036,0.15581558168557752,0.38684698973718534,0.1985422698974264,0.7110248525644307,0.20065121021543408,0.35538638975422376,0.3259687534776925,0.42408338159836645,0.29204992305059996,0.21200772017005676,0.5277601346596943,0.7157457037431674,0.5246681446163899,0.2597730518603625,0.895223880412128,0.9767571097042349,0.02384483714047425,0.9805058626030818,0.6280488581067527,0.6830473411558184,0.5763016737868674,0.3398266359437352,0.727596990881429,0.3445244649128363,0.12858911130734496,0.9882220383472831,0.41921388756502975,0.2908225529474211,0.3981963308236449,0.5469734283230436,0.6950719415852724,0.9337944978233292,0.1122788140761033,0.6724256589837103,0.2527713403091745,0.2932270618758397,0.4376231308718366,0.982065934857951,0.5143083521454588,0.6765353760102775,0.0661539568121503,0.018818643486234743,0.3643884053863833,0.9397825977637109,0.939448252632171,0.26718361485008946,0.008524897126541697,0.9147224409023802,0.558936169678814,0.22682645659808442,0.9099625588592999,0.9183772726043038,0.3047980585179668,0.5126509987779189,0.33624308226982236,0.6184526244823685,0.11031324481543181,0.13076868816684972,0.1821352112105712,0.10609892676263355,0.7014507001022499,0.1219032191386662,0.18713602465169088,0.9724939616077739,0.4505252330890499,0.31002464201885416,0.9068732425818846,0.9075022363917002,0.2166891209342956,0.3061588284123107,0.7996496187934052,0.07177728353191326,0.5684687163225766,0.1102247575781845,0.2014041689597077,0.5415476446230205,0.6713195206075653,0.4462842836853693,0.7967016629831669,0.6679290504763089,0.3679863159939536,0.31990433139835206,0.6002053678806067,0.7726808174129018,0.7618726992673561,0.0629607209912415,0.6204302179997725,0.6635418023316508,0.32992653950743533,0.4713022156450424,0.3376561214937466,0.9316561650756814,0.11142864160680621,0.9435215883794716,0.27345273361514777,0.04604414525689737,0.7766316229028862,0.7861880016981129,0.16172959553573185,0.05918685816298086,0.4238569467489115,0.4374711537702427,0.8698383444838671,0.6980490251324334,0.2342860642090856,0.1993532362289807,0.8222960829982575,0.6739574574837095,0.040393429022343996,0.8303003648305849,0.7132377643270265,0.06553552241979843,0.8691874460181277,0.5100810286044501,0.9028784524690279,0.9393584650732201,0.047583304382846414,0.44350072168881005,0.9597476070740683,0.6978433367511203,0.2255028645682442,0.5649182420226819,0.7147160929168066,0.2463695218367432,0.9210845687080536,0.052006542601471306,0.2677166865928935,0.5828463455446335,0.9583438693627713,0.15669009599609462,0.39760334093468797,0.3627403621834653,0.25978272346724784,0.09817268530658052,0.15171901359290563,0.853674763241266,0.2934888789422201,0.43038167148678497,0.07371115754937096,0.6395376593961597,0.8603706643967575,0.5374613354991695,0.6726309174475571,0.0383972520226763,0.9922840812138285,0.8719018649920016,0.7724569935101244,0.45224191401215363,0.25690647592612637,0.8795795207792318,0.4302811183102082,0.27445114421900607,0.3503900554030446,0.8073134258408308,0.5076237355964532,0.4659476210302387,0.8063817505609585,0.18821750381120594,0.43437471495495505,0.43279061954485387,0.916030214513019,0.6963628659008996,0.28695492503803677,0.720256589993705,0.7622359681993198,0.4977292659388304,0.623303444484151,0.7789233505189237,0.9795442534843857,0.846344065076627,0.8319741534375025,0.7172448380796468,0.4335487249906218,0.42576891822470664,0.4526808009511085,0.5087432812458084,0.9603069847788219,0.8799376547848456,0.952920573928451,0.938208435312311,0.593936326336727,0.22594659713236864,0.8201520565618321,0.03714521551273875,0.06630582855148082,0.6893914470319424,0.2963863027735967,0.29809740555605413,0.38971692361042787,0.3253947713590395,0.9915357869786765,0.39363248617064794,0.838222970441638,0.48948391833437155,0.0028017986957671326,0.4995298932901946,0.7321041831805368,0.19013562254470062,0.7072296364698487,0.9221277118110791,0.7853875658374316,0.5110838918305751,0.5924823422586223,0.8971283791520301,0.4583625248501122,0.57430756465417,0.6078438973597768,0.7255137884958227,0.12707215841811714,0.8872741471003078,0.9068000463329708,0.2883242886653874,0.05894752652269797,0.7344865252864856,0.5598145667989034,0.4938975028871504,0.44136723108203446,0.8342347421028562,0.26078866766466446,0.6666231642309353,0.1682118911076489,0.4117966482696138,0.7642853776703822,0.8245825597153469,0.8575253438584363,0.8349600058621618,0.48824360918251464,0.8581359194101199,0.1720931402415673,0.07807207653961523,0.6638201596627185,0.7048557936676472,0.14301951479649588,0.23503295214014264,0.9900033740058123,0.8401567415837252,0.0006199471352326125,0.7892552435731459,0.4055933849076365,0.7008400821783285,0.8917040557394997,0.335160955383091,0.31485570347766134,0.9803270270818929,0.3841776847873477,0.7565082024587328,0.09997379455257294,0.6598240650799105,0.014373878828362052,0.5473299634334798,0.19512490538048133,0.12895614080960827,0.2702855533873443,0.3102890461522594,0.577578116101398,0.40756835112361234,0.2307028841419656,0.3271874017541416,0.2180285402550477,0.7806047355988182,0.39563503016036106,0.7406606226116654,0.13344129583129516,0.4364090107224501,0.1366378170763649,0.14435638821810248,0.9096703278472036,0.6256844722471555,0.49213847149267886,0.26034085688473274,0.811648706640137,0.9612706343499458,0.6712680474352566,0.7787701551787265,0.4081113553781015,0.15362138762752942,0.6039872989107951,0.046888895683877996,0.6480889296095191,0.8870124646448703,0.4976065925324915,0.8475403907820627,0.23218011677591566,0.6842936416762511,0.12411519299251794,0.537073864497595,0.9638814056874467,0.09710482546180765,0.6400598905069055,0.3306639299775844,0.020077436496680923,0.4227319208020268,0.33356836511564536,0.07283179209500035,0.05828661572087701,0.5703732041981158,0.22045726797284293,0.9641305989162763,0.019496448749160455,0.44382035893629634,0.6268815904635103,0.22483780514612572,0.44742042863298725,0.4573478558284154,0.006289276225912133,0.5112592574956676,0.08992445455010212,0.11905843365400304,0.267515410946201,0.36667847071405135,0.13764019319538523,0.5969925587335634,0.014503964612929687,0.51157169290373,0.18029884730395684,0.9394960647973623,0.43998453930411796,0.2409624712051599,0.7985513730291154,0.08256288457099314,0.9972582057053265,0.2933807105986208,0.15245283311222857,0.28555284940867476,0.023868800926257316,0.2981019317138458,0.28923029726854055,0.9120641127875264,0.9614129683603079,0.058955793909190035,0.6727763794571733,0.7867554570507698,0.20357323744760492,0.1601167705629638,0.9994180167903928,0.9207603262785,0.9597837974345833,0.8381251822666183,0.2859679885876403,0.6179058895931695,0.23949223276554377,0.19713576522864185,0.8621581461153405,0.40049310330320465,0.37970497808236114,0.020694588458358032,0.9820635344305306,0.06848832155192652,0.29546652554803265,0.8373208695345327,0.7599810888445375,0.45986675575234637,0.2730538434822547,0.519314994196606,0.36541342569489244,0.4766824542010657,0.7184475195342401,0.001079071227414019,0.9891739610160235,0.4326106847253075,0.5697228198051816,0.6199744683240915,0.2635922006105125,0.09294507778946737,0.12316621026767693,0.3141307534069664,0.3367375984297658,0.6764845893374454,0.9029123946364124,0.6821130769964354,0.29346142204141024,0.7325070760995347,0.6069004415286938,0.2236097294522701,0.09861864417693722,0.17427128615681142,0.2556370534685757,0.844665003813992,0.7530483543113466,0.06243778769742225,0.6080460095075046,0.8360335922455655,0.3154166748916112,0.1795060449990138,0.9228350972652706,0.4487127405274427,0.055050487480220456,0.4634139065110139,0.022181151343163563,0.570735181777223,0.533769444135437,0.24125532062779187,0.797250625641643,0.19076997469017187,0.04011806955746566,0.35283106069859893,0.8855351542802885,0.8425034416155903,0.13822678952319833,0.3026195185181937,0.07054790368294084,0.8886367718988442,0.7147169806674099,0.9969598186627462,0.4609516265170419,0.9163333907836657,0.7583168081790348,0.2624448362489544,0.5321736136232575,0.6527026299999492,0.3618941665607618,0.05554766189445415,0.6943078483233858,0.8246018698403477,0.6360702338293469,0.5997413693661775,0.8574487130284858,0.9149603127911383,0.14712699804973317,0.4927707831662318,0.9277956421115752,0.09300364164724684,0.179492026690943,0.010870977423873551,0.9299789574419153,0.09322634519776374,0.9422261029324215,0.6115523951713691,0.6685328496110361,0.9787811446375794,0.27248854301362546,0.5178294493606073,0.48963304971381216,0.2628860049157624,0.4302471723628787,0.03216880884026163,0.4965960369480802,0.5587614456710923,0.2254243478442639,0.004273928178077702,0.4410448824458739,0.012880231548396459,0.6285774134354862,0.7928095743708228,0.1473066620086363,0.2117107741401547,0.5056230227816398,0.4864822656323202,0.1745527852121045,0.6560864723665154,0.8217374510677606,0.31707814966212333,0.42075184423199063,0.2332795553776743,0.32717762835873865,0.5543058624709045,0.21740377238970687,0.5734103301920856,0.8408838184776677,0.44522654314654386,0.6806512417853428,0.7959083448945248,0.6225380165008916,0.680320232356469,0.29194141992551725,0.0806929925958575,0.9379424467046329,0.5960730809700021,0.08587287743886152,0.3992063073023968,0.6753930372672161,0.38836760208768184,0.9106709872026255,0.15480038483369385,0.9133421046833179,0.7370816347871345,0.16486222508834802,0.0712536405823685,0.32199053203592887,0.4923619122192817,0.48021015553638446,0.30390433376950865,0.9774807697413939,0.5573157601639693,0.010293814267091195,0.7106946571588781,0.9955324456929318,0.06619688587958139,0.41551379017073775,0.6353805294449153,0.05883244038622637,0.8387388820346124,0.06938514240819771,0.013950508699232644,0.13624832793334285,0.4220873522849642,0.4413254949325067,0.21039934786907044,0.5362160776083627,0.7115718582277026,0.9646216019319043,0.5793691031049131,0.2675804393906731,0.07056699503413877,0.38496190786455453,0.466887791526688,0.9010553359060212,0.3526888773935646,0.5471800977044201,0.0540883233510161,0.6477960555773041,0.5631213069794481,0.368379911306393,0.2441268147610629,0.36121764436117565,0.7772009109382678,0.11472929316232117,0.84277783248521,0.2283678164422145,0.4425771147209969,0.8866794144150487,0.27465615301944446,0.6404752009751842,0.14765032138839684,0.9222920774097132,0.3801137856757464,0.933345005490918,0.35163623635137875,0.8636711255717489,0.5570383152843916,0.46433965985168735,0.8678343742995267,0.7791282388982077,0.018145635553547868,0.9400779280937277,0.2904149102228155,0.7951960771970676,0.21466973406972722,0.24465153796624928,0.8883085359650085,0.7908477307456103,0.25957149433350235,0.8910898283652593,0.43677464106913066,0.9991541986544779,0.6450148071704407,0.2840939962403959,0.14280270479232926,0.02313597648225696,0.26214050409242207,0.9814038821877045,0.30549993864354485,0.41702060109701233,0.09938471953139283,0.2692451121749144,0.8122358684156756,0.949844060028918,0.22177216162668434,0.024293132461117528,0.5596202853118393,0.05400567576385207,0.5866891154150753,0.9576617795432543,0.825948582292064,0.9444895787686429,0.4376112932324292,0.3891384812818932,0.9565085715559065,0.6320941703623026,0.873079421926632,0.44688534466093444,0.4449127117961895,0.5343053436891956,0.8031497521753208,0.5931283374746918,0.7156305207610909,0.8810054358579362,0.8204521929276232,0.6148196468862555,0.2819419322307155,0.952853220675729,0.5006516467745128,0.7137926594312383,0.3652836845333316,0.015073286047021073,0.299478835038018,0.0998757435118871,0.3855845594814409,0.7963222439379845,0.5196918318788912,0.29719719209213724,0.9092341050447137,0.031267326877108426,0.9270442427481029,0.7022160498610726,0.9885241020716946,0.7608170040291278,0.6442093187680795,0.659025935831461,0.5996369344943564,0.702810379907642,0.10964519098825987,0.11404122770384495,0.9893313964239092,0.9250549301955613,0.05542570044064021,0.684171895566043,0.648931839271552,0.7665452157857473,0.7289569132275948,0.4448111380078257,0.7945476897118655,0.21683444454357081,0.14052090276745854,0.8289258356143796,0.6328308576396573,0.45506315370827877,0.9372910541303936,0.10201506456329512,0.5368359679345229,0.16687750079712038,0.6243563140952484,0.3862603045162103,0.3232155079375516,0.6277891327928571,0.6017339811249269,0.5067796304433916,0.13369067300620396,0.9759000224030936,0.27081640187843736,0.9866877802400216,0.22550743500515047,0.719303244150689,0.3307030562762723,0.18379600801732265,0.14830939462871418,0.436214215934114,0.23020568007550213,0.3357836784641748,0.20852492276539203,0.9843975774045712,0.6592589397439095,0.9432826266404324,0.9554202791826079,0.40008379956086415,0.6466401443457392,0.9504416781162299,0.3588816819701459,0.9079916039446363,0.6997570354913529,0.8714974424790674,0.5588397051819471,0.6468430776026806,0.698087081820671,0.004179711012248344,0.7340637279672526,0.03431035400462412,0.6950131224305074,0.3747571578229574,0.8951614041431022,0.991629163088757,0.5533457040531908,0.4102052341496214,0.6771122147059376,0.12218161996687815,0.9204745225568625,0.44853395980515454,0.5480632248031316,0.8008427713710637,0.16101296215333982,0.2980171369226374,0.45044211772864484,0.08901139017180437,0.36372319567775,0.5344987208028853,0.9881903044960567,0.5411974303837306,0.1745589457214145,0.4986422865863691,0.7686203684678226,0.8180268284983692,0.34111066197000706,0.8613712084525991,0.6726324134908799,0.4953705209043977,0.4283877194418806,0.5288748240915144,0.23082787317316966,0.5028536130336201,0.8377478744819451,0.2999853333004341,0.7619400696595724,0.5543989642487339,0.5044122366379695,0.5021103827189513,0.5429623867217073,0.23992321187420962,0.49262790594285244,0.004013849862685603,0.2897653822521118,0.31303918240486595,0.14803639303337324,0.5399388621728551,0.16196977891771436,0.9457159980260244,0.03548103575573025,0.22478515225659823,0.5372562399624252,0.7962463868631491,0.6809874923907189,0.856990848334501,0.46521706474979574,0.3758327237219481,0.742965282183554,0.4862627632923653,0.0294057067709661,0.6402715702792052,0.16542521278359534,0.7366071273256201,0.9918531282964835,0.9596042804591616,0.5496757278222641,0.40630099015833765,0.7968120495024382,0.8528009081018588,0.5712650776807391,0.7115972127017183,0.30867173457501895,0.6672143325818627,0.145250085896097,0.061843369121592495,0.9429583088646427,0.8671130989025919,0.1536471794322567,0.6973542673196211,0.5603126637225595,0.008467038980495945,0.6393482637104655,0.028259475618344077,0.2101660976943207,0.39388600522585326,0.46436058689888093,0.8344466463681621,0.5422626351526147,0.7291344873263632,0.8670893499097501,0.7797406544488654,0.27028221437513733,0.2799610843143192,0.03079835363524963,0.5909344947950832,0.3940369224569469,0.5817728518245946,0.5158472459724985,0.7304589067791589,0.4415026378452751,0.1809738864110586,0.8582291033399057,0.4495519783417419,0.1544683285626256,0.3803493674815823,0.6154857259139273,0.5974534711392401,0.03694414019675407,0.6756077281479544,0.6782928285563337,0.4108258112659193,0.7828518335261814,0.1619768316517769,0.6328206435363739,0.5276267225351874,0.6024326294946845,0.43018838276600935,0.9339024745604985,0.25190028783603613,0.5527805932552381,0.4526516297213006,0.8377702568556473,0.7025389425538757,0.37356974963448053,0.7785892592582757,0.23213465319600313,0.6079451741793598,0.6150700325133855,0.5001709917751243,0.36726858299549314,0.2707157914413658,0.6806762353556737,0.2000827350453127,0.2478087479675677,0.7797135647258484,0.9348769958948004,0.05069984178350562,0.8839826933838015,0.11585985546147826,0.8796792648797456,0.5260679477923147,0.5568936587285116,0.3988480419977829,0.2577870934124391,0.41871194143117574,0.3187914570775008,0.08068605103074944,0.01218630017145661,0.11151373068086823,0.9953155701349363,0.7022054404490019,0.8932872247405172,0.06400001948944989,0.5716337513220577,0.36843595532501827,0.1833119277910611,0.7749785694152866,0.588630301952314,0.8580154884357116,0.9128680982307951,0.3534482083393651,0.20119221611407645,0.05438012402701076,0.3164920136503282,0.05115414881021829,0.672942867080045,0.2791752051603391,0.4919686040775264,0.0920965303525545,0.8648570272952578,0.7903099920370196,0.4376625345976728,0.8149869976141111,0.15662125599943044,0.6048032499580449,0.3187858800573815,0.19377524509496058,0.5337298812780931,0.2520400184057032,0.28162185924468175,0.6808489610717037,0.4667737169102537,0.7517583829995373,0.5890456495132912,0.018134040818308828,0.2810982607745185,0.5875631438867388,0.5950317687427378,0.8511394951309654,0.40719172574664775,0.4515271505920413,0.29003529270406436,0.8991180928199123,0.3722364625157628,0.6787511368962535,0.855562564039615,0.29775442964453136,0.7152403293812373,0.6360655543206912,0.01157313426043416,0.03248722156479733,0.5621072203218358,0.9387185626402794,0.7503169639664933,0.2289454012315142,0.5935028446013062,0.9749323341410208,0.4704831378370269,0.41426832152595416,0.8167025993612043,0.8109549890186816,0.6783819389702674,0.3037192087729377,0.7587418247611177,0.08461421927687574,0.507183997019822,0.8079711500785118,0.11861761943100735,0.5613461934934625,0.4334898587128302,0.551978176721178,0.004842118267623263,0.39477603131182093,0.6481361320547254,0.9160739655575931,0.9362442247859608,0.19464418185344035,0.44718938465104974,0.3678288531649072,0.3692873759488966,0.888095599505768,0.15305305396120716,0.7816555928442954,0.4622082862958532,0.28368009644694436,0.7613137751578345,0.9895631280048358,0.23937631639828627,0.017727622133935972,0.1423613506837409,0.49139779208341494,0.9926566837416686,0.20643009438999527,0.53008760096216,0.11728026282296122,0.297207468083621,0.05371378982607089,0.45625528251757963,0.1091443575472768,0.6804289102310117,0.8174232130821117,0.11771508131715036,0.48072939140319626,0.46941627876772807,0.13317025189007636,0.9784070605146182,0.5587705249172972,0.24028219640322934,0.42175151965326063,0.9365517250464281,0.5443204854430983,0.9731028428413799,0.17019738982431765,0.7272626940157378,0.9156123023875615,0.5483709565996451,0.33272192455760585,0.9749314108321836,0.009903399315442263,0.9407551616711716,0.39598076266295434,0.020389219483427423,0.035536252741443786,0.08853758032168368,0.34877955560500884,0.18297835970109033,0.6988997560432282,0.36066940037948525,0.3402391135383318,0.09640040641975678,0.9329427547981417,0.8095192225481778,0.6892309681569893,0.2537880190498363,0.5951097138607508,0.6884697623398215,0.9652291392138548,0.8968837926698852,0.3267020428801912,0.509729610585899,0.2680819552701945]}

},{}],129:[function(require,module,exports){
module.exports={"expected":[0.28372894747550653,0.11875028827590334,0.6628471923046558,0.7650952575513082,2.18733537767346,0.6748824334315797,0.005624566556722498,0.09820749592559402,0.0011741396154658795,0.13372707406699583,0.016166081426168027,0.00472688458330137,0.24852006790968778,0.6809569626418438,0.19425157317353947,0.9099414007183164,0.06907534510651317,0.002031191757349212,0.2803789158871261,1.2777731032903825,0.6877071130633617,0.580069811336999,0.010457393256612862,0.11620198153155009,0.004524473442503039,0.03020947265481007,0.615104788868961,0.06062824347772427,0.4843183786580296,0.42541068344480737,0.6362222105280926,0.4985741680689518,0.0012411180860802812,0.9406775109020498,0.0006540502427744274,0.2348011790628559,0.7056218347579079,0.0010066602050635056,0.47999557765247003,0.6881902509033446,0.7928751721268482,0.3689379965706492,0.6096024942054379,0.02871981022289389,0.4553857788285116,0.7593943400455325,0.07478777768805418,0.0008784071216845231,0.9978128898616891,0.16646999918339736,0.0023048305352358213,0.8969205803367701,0.7361005532055037,0.10656140513044408,0.010969614640213376,0.007676456816603004,0.0012110513128425248,0.020267884136084824,0.0526141887509746,0.0016478453383899044,0.0945912478763309,0.046218391532995964,0.6370801479418131,0.22013992636548116,0.535074125030422,0.6742213257861012,0.04282950950769094,0.8950414226246549,0.0007096097879747852,0.7078197067957737,0.269154211167158,0.543611174196365,0.473513261424313,0.266086679218184,0.45634441950474786,0.16873885991970475,0.2280896419894857,0.45939191520117445,0.3898653040780935,0.10730045187913381,0.20331095569730961,0.8468351487345135,0.10410717964964787,0.9415289463003721,0.026466188153088866,0.8724930249709834,0.027066631317371612,0.25770170870262493,0.004394355642209217,0.2861501349347438,0.065678577989656,0.9437948725087951,0.057699168859617574,0.0032841742446842004,0.15666500463182423,0.2356688343973409,0.8969480788565354,0.009587742561311716,0.017041628012721886,0.20554147446867774,0.010816966533256457,0.5056725592561683,0.017681230055439756,0.6787652522800957,0.9863439045839963,0.8320643215318795,0.8608036018731339,0.049981745486184836,0.8177398660597249,0.0075735658597782295,0.11028837973820253,0.005574805077267801,0.4507306119879092,0.6546217627933142,0.0033436234972422023,0.23036546847594372,0.7592555344595892,0.08827022436875487,0.11563085796916038,0.2648823899491394,2.248631058516807,0.0772513934917968,0.11740446688542441,0.9001860873408282,0.9641089589413473,0.05658205492622915,0.000666991714858883,0.003658532225532276,0.017082781699792427,0.17984392331684398,0.5136994533439464,0.17569068958222536,0.9725701476073867,0.11932675666381687,0.11239217361133746,0.1586726230291834,0.011571424858614707,0.41862373174439066,0.9917274512405794,0.46196378278534,0.25711104543249547,0.017731353431462735,0.15432315318460696,0.3873491289316005,0.7616013378479148,0.4324733006939616,0.9751641626617213,0.00599104120836984,0.006711281176171328,0.3773311964192771,0.010776397226897074,0.5965135352806277,0.2749687917930584,0.4420612919714035,0.1471963091598643,0.008095369336317234,0.36422220421356166,0.15986166148990844,0.048982886143142876,0.8152698079462014,0.0013814999136750558,0.006556773978638597,0.11484427881494601,0.8556313765399447,0.026100214580761692,0.16990023325867384,0.11986706226947197,0.6360473261679573,0.2061457045585498,0.0028498671525826777,0.09494795139107459,0.07879794522974819,0.001979338605741832,0.3269364661224363,0.6340184911600201,0.0058434910677948445,0.005114574972650105,0.13841496618685417,0.011475237826751836,0.825218199358638,0.0127053379480786,0.1431476576071122,0.0006371009100061355,0.8062247428600164,0.6011384421813368,0.96073094291551,0.026420810698207287,0.017749415899441984,0.7156938074085153,0.0007062348905256219,0.0036036074423015547,0.27154416088379235,0.42163747770935744,0.3771290003835983,0.5848425866804148,0.4199230302276149,0.04942546749942485,0.052033160131345076,0.01256674750778375,0.00379449302327505,0.027874040376063548,0.0007546237690223525,0.04821312181946366,1.2328066319231838,0.04364716775313905,0.7300874890363567,0.014865287897899742,0.34466594510509774,0.2164196509066931,0.15063090778693128,0.5469933311006527,0.8298637432100288,0.50027975691195,0.004261438934011232,0.0031789194719158576,0.018461249975037643,0.2799969300287288,0.4561098398407958,0.2831262820238835,0.010809300540499611,0.028971023718192393,0.41882918084862325,0.6403045163926392,0.46712225097461724,0.972477212055331,0.07858436125547809,0.7495104969387969,0.09124241763780958,0.13549398444093,0.9080285452103657,0.692681625634839,0.22830932886138364,0.8700184482915665,0.17525339447791177,0.07636816332876382,0.015356148209208451,0.0009774528320526724,0.8344414174809726,0.00044707290301694666,0.6731965382834625,0.44873602198816015,0.043224542315512364,0.21197134508187357,0.006772389689737322,0.005008012083306955,0.007982223109260339,0.7521825334983956,0.06200169019974905,0.8984207586334279,0.0014338218744375715,0.6250737275729678,0.03491147077003451,0.6476402726776852,0.6540698346128471,0.6204073169211958,0.015038274346254682,0.14906746663744028,1.1093799401520221,0.36113549262182965,0.752702838740912,0.013351013779439098,0.014179454691448433,0.16314331577183105,0.041917146626945144,0.04349260057415708,0.02903179550231278,0.011872761472962404,0.9977181477543301,0.0005429172370273116,0.02349068366532151,0.00441997714171706,0.6770674165168281,0.9445382420963181,0.724029782224616,0.47559585245817404,0.003000484133152142,0.1269260506493831,0.20971933046204383,0.7701056338209914,0.2687917097807081,0.0007994320919207699,0.0011581275751673863,0.311720039212968,0.3491774026564651,0.42089262156940394,0.3870849288465898,1.0024783451389436,0.8175540890386508,0.44146412631651094,0.052019377822071465,0.8857624424660966,0.018978451195284615,0.0969667232906976,0.8232473509175293,0.031090168099184474,0.05781302486908899,0.017181987338071646,0.05941830665909852,0.6706871253820411,0.8882018539951391,0.05830435122970824,0.2528973655193498,0.0003959240580120652,0.8508839892421346,0.1132509338100682,0.7644511270565828,0.745960954153218,0.12610697423287306,0.059458530678302444,0.008115898226294395,0.08220262693513149,0.038547190364188764,0.17512360617707526,0.953463621728232,0.0024253481724298117,0.4908988209047537,0.015446045788252344,0.12086318534931373,0.05277395353718783,0.009853808693283013,0.03550432632504931,0.10127366622304962,0.8338252713961132,0.14725257102920514,0.009755502430940742,0.22484569307672667,0.6407003743408266,0.1673475090572604,0.17009801573674702,0.5155006428014118,0.020295617331659535,0.1473472080075395,0.04290301039754981,0.5512458101376926,0.2430739019164784,0.4933580335453301,0.05111991920228477,0.017122848516557772,0.42513099782784275,0.44824868892476466,0.3601049172145824,0.5612585889704678,0.14271457922100494,0.2594295808270723,0.0061321920485560575,0.11140889359051398,0.008044576283468424,0.3189402036417601,0.015101555405993512,0.01138442015881763,0.26626546728223444,0.8586277200095859,0.8147219631271683,0.3738288599625454,0.006919404615888903,0.6733464289004852,0.0007504648112955027,0.028236510586467495,0.0391766601663908,0.32877905032639765,0.8030419677851486,0.045113355053999195,0.05776318295492155,0.8217665401017897,0.03514469988989002,0.8090957513124583,0.4299234229140403,0.03430391190549136,0.015849779134992966,0.1776836180737502,0.23495431308660403,0.5851714939197393,0.6392127089414559,0.0007522422909324969,0.9961900995645595,0.3357935568758116,0.03793537538752926,0.17696577644426603,0.6029803403287943,0.021878331496624184,0.13513365101317176,0.826252462188342,0.04597436503742527,0.6294502624195093,0.11499452756627329,0.10129756638909304,0.46501848685739466,0.16839002006087148,0.00030776896471043874,0.049442604266857995,1.4016102266519765,0.33570455691415235,0.16008644409631506,0.015618033336244385,0.02377122961775085,0.36174367639667965,0.3115891959533748,0.5509324939223471,0.012915920497324786,0.6308182459231959,0.0036479077979030355,0.5401056141174579,0.24168169874889334,0.7783823011591927,0.8960161641420764,0.07683660309506928,0.07955153451053115,0.4333001625209845,0.07317741085331872,0.21897751971627533,0.0015866423635957846,0.015047020407611326,0.9935954810711255,0.7549125540945435,0.17420321877308217,0.4371260331528389,0.14015859712486547,0.001021995262255253,0.07735298816309745,0.01035037383315634,0.1042244086792683,0.0004272596808673583,0.011205659852702773,0.8523386506726514,0.0027561792404283783,0.2112014361249107,0.6400828646186634,0.866027300291544,0.8254505843046686,0.2190573322110557,0.49552559705746224,0.4879751834934757,0.7132604688865786,2.081497642754342,0.01841046790624937,0.04825814294529567,0.04668658784699627,0.003354987825121915,0.014815978187426417,0.024469174551894162,0.013412456610711092,1.04405589325818,0.31061688005536015,0.1991226904432409,0.0007824251870383907,0.00487479967379,0.35732552174163,0.02136754961053969,0.024391317301474844,0.9895842535813363,0.036673195851628454,0.40940632587693554,0.2168592098701548,0.08288102484374935,0.052002204951841054,0.6730494503080702,1.0761525492100297,0.7843126893229707,0.000910782647957161,0.206024733658756,0.006753709572554069,0.3653552507616861,0.6328103443476771,0.5005847027565461,0.5597401513603996,0.0001543408982325899,0.9513515924051799,0.21921704368919917,0.42113194873841175,0.4011540610962785,0.0034866719918885927,0.4321374021469426,0.17560992547073692,0.0013260199747059523,0.6033370021804437,0.08770593171545472,0.0032558072340533456,0.7350550889013873,0.037940162298941614,0.06523251084602981,0.6234473682288992,0.3866221321522396,0.8552531885501173,0.08838218247483336,0.017336888377526977,0.9321000000940617,0.4059890449711731,0.14026012066874505,0.001951565002088712,0.28399825074684365,0.16442223377844298,0.07734781533071569,0.5379133118838479,0.27149516454711714,0.8129372955271692,0.020971152368290988,0.6823869623751833,0.010575270869590333,0.35959716886767257,0.6174518908248942,0.16252211877051062,0.02792887582890123,0.30877399594553495,0.1264736256972844,0.5784399935288903,0.3807213972191865,0.012826234771899635,0.007093042564792631,0.6230542617974425,0.9791070629327283,0.010789461975671877,0.2905854058668907,0.6694647570014675,0.005998692322028557,0.65798935375832,0.020835621336111297,0.00024329784308184317,0.5518557543270923,0.4532469740100634,0.0002494661499807305,0.006374332293889949,0.029436448345138772,0.0015944546337604243,0.35700173172327315,0.059449365912059744,0.8752835632570717,0.7531442890734525,0.1229804276328599,0.9130290650253837,0.054946155289653534,0.22078988138815014,1.229945419374432,0.48997684800629177,0.03105384108795746,0.0027724983262198046,0.03911302199891404,0.0006717743575779494,0.2111451976544596,0.9614705150227039,0.14560636263848453,0.030861456391943386,0.6763805263829958,0.44321775092894206,0.13577911665490505,0.5319209211806788,0.11463359485433029,0.08138808490818755,0.1362558248041079,0.002351666493214589,0.014833411795822359,0.011694005848906622,0.14121570869516958,0.06743489335940422,0.0029063305254558637,0.12270773692804911,0.5786714293868525,0.8700432273046403,0.002561120013832822,0.21042996717705628,0.7680124889634224,0.0006501977624639056,0.32431890311110884,0.8955692226468698,0.04750385425334807,0.1867699541947952,0.0010223760708871644,0.40317263490183064,0.002858376565961327,0.9140628492072581,0.7140451496088032,0.0009397525469575083,1.4998854027987258,0.023300841679005566,0.02223618124977789,0.5107524359507152,0.09658555140865167,0.21431531882792568,0.00041065089657510494,0.005868682574817186,0.000933476027699407,0.6200875461414117,0.015681004989044074,0.4303164295652388,0.000365452006348836,0.8840100225529041,0.21394150177097931,0.24439874746825477,0.000271301106510166,0.15421894076649897,0.6735308536884277,0.9243978353628902,0.45798154412615283,0.7802085791948,0.048822001567535515,0.042533196954926744,0.2929247976002826,0.5604115069187448,0.8402792136204411,0.9104589334477262,0.045321933486776295,0.28330268985953,0.2346707546183485,0.001404382310470384,0.0027060225089423377,0.5759833925252668,0.10974313877883657,0.0020351060192192005,0.6068412859032357,0.7904264205790454,0.07711428981596333,0.046023868467765836,0.07721482089051752,0.6376299838811537,0.8176233718783755,0.4225099807634354,1.9551661394085782,0.060288841743459554,0.07608479658323047,0.6279216207002198,0.03229404140498329,6.692629778028429e-5,0.5739786079990256,0.0014038628835233381,0.3094559821547762,0.007757785328405717,0.021374983540894323,0.8123402049699198,0.31392466575349465,0.6302270533964629,0.0062096948669093386,0.3139257460989174,0.919844794380654,0.014664328355938495,0.0009427746884874405,0.6301813417184063,1.0130241333628809,0.6817234665116183,0.01455447774864616,0.3148433452955237,0.6244785665245842,1.093437831796254,0.002072156372275742,0.07631251716313645,0.007366541803191027,0.8698537215360587,0.0005326646201537989,0.7176302787943197,0.0006009003397441987,0.6767161279604346,0.26897569553692385,0.1837461592187763,0.915322542675163,0.18220928776563272,0.21877467493704011,0.21644537658006535,0.0007606224233524056,0.5862257504137056,0.6698023193479432,0.6757793674942045,0.24979186885454818,0.09572987962184235,0.3186211146831268,0.007414640777997355,0.9738542519082696,0.44892560547511995,0.6688032846362489,0.19170995512961114,0.006819985784232453,0.5657305249022686,0.0019276670535447106,0.004994914366584835,0.3346378334558243,0.07365547521527052,0.0008926701513359685,0.24706202690802528,0.07064595399745473,0.08306864874701006,0.5253223014795808,0.8841463259406476,0.8485731353211453,0.16043587143749635,0.06426994563022484,0.028789842942967762,0.11004455863440603,0.16805196426887326,0.6328583345611078,0.26767135450040114,0.6367131773737614,0.040892736508495335,0.42379374643615986,0.044686703383951344,0.15210726226668903,0.6710368615952244,0.4406762272532562,0.37510044164917855,0.3105032079612416,0.006272902225253155,0.00024238391776883284,0.010953075512728144,0.005696280695221712,0.4503536569764521,0.005725091201540821,0.21223789460741757,0.6125743457914046,0.9940589518242309,0.006062770245038182,0.2277196033179808,0.20487300843710382,0.44524067270552925,0.5196672951358207,0.2560101696169331,0.2821230061799287,0.331577123129025,0.022670813063118547,0.7291248011249156,0.00269239512986397,0.27467740522833217,0.005174539385566074,0.44639528303445813,0.060359866406840615,0.7567948449200088,0.6763572213405947,0.2589546158879482,0.05941579660185931,0.3412050188266263,0.12389933650760959,0.017957651505827833,0.5733587074736124,0.004669659516632351,0.009711449013186142,0.037837332493908006,0.0008039394430718557,0.16783749059985015,2.708092740761777,0.14751156511700936,0.0004870167042160451,0.004369151325950838,0.0010909182285278975,0.005975062084394225,0.10190500159732922,0.011807336432197479,0.010460622072135146,0.947474089258251,0.02249915555350198,0.17066917596707362,0.36774544410462184,0.12649066486291355,0.07155708208291933,0.4719257519900392,0.5507559492883956,0.2876038963859576,0.039911726760507346,0.5634649210881479,0.09976767873390585,0.026261107341287265,0.46239223138982677,0.051648092291644486,0.07199191663585892,0.9159199749940883,0.9993810518334191,0.4249292275936548,0.02433790330070759,0.22908566716226886,0.872909623137318,1.0074027867552762,0.8895879955352223,0.005086530851695318,0.0036479334081376607,0.03635001143041354,0.7373653302609167,0.08527152996999662,0.5843537517241332,0.01621112387972357,0.4295241054896503,0.5801962296678495,0.15309997726511293,0.22487777971348197,0.26229732663244837,0.13028361212479045,0.021083063863663494,0.5708846878283177,0.56545942319371,0.26619670596813905,0.4102697760069512,0.9873784917973147,0.35965494625786126,0.31026064620306926,0.6369475318189384,0.21192941036283372,0.02061872749671096,0.20600829977541202,0.1457320178673172,0.8225411666067414,0.7594368437442066,0.028579404008220805,0.05932362400650661,0.024534336209792618,0.8181663825393342,0.5589792514944629,0.02409636224323411,0.415697020712035,0.2867125304162811,0.3293498621615798,0.013438028328121904,0.007444332477733853,3.3291002431718018,0.04886296187322246,0.006611910555613613,0.0007772984998683265,0.6760785736813535,0.0005842749045833463,0.20946027446990667,0.6959319496091931,0.1903012361624289,0.20033880549478386,0.3947837480468073,0.02433172611426475,1.2982581200066183,0.30460268270275664,0.283725889245437,0.8503565477574715,0.002466055751020085,0.5907651483720424,0.061010263944081086,0.07856897570606095,0.008718332391702655,0.21296107297436706,0.2074545104529944,0.8994720003951925,0.05201531719968371,0.942052644617629,0.9595032294272358,0.13700704105065192,0.21494276786773195,0.0018477804569412568,0.03846489078061955,0.012978857249430981,0.2739758859203076,0.01425183778400059,0.0021456074918368524,0.02103711150625651,0.025590939788319975,0.05501469042083811,0.03169751110062699,0.0038272882936525882,0.476365615166605,0.2577009663469211,0.1612049947307496,0.09772873707096348,0.13585024302304174,0.135101632345861,0.24880827921106702,0.05423430408685667,0.1494925640164529,0.22342328590078742,0.0066899024163056195,0.49290914135082137,0.911081008328594,0.6646956667128616,0.30398310596662376,0.11337453795862101,0.023442458145319138,0.0030497402192447725,0.9993813534624126,0.991255608537252,0.39227895755809256,0.0003964653645871843,0.1938985500173024,0.14249134190126858,0.8522740197582874,0.14544117597478082,1.0868168256429254,0.19394951058822507,0.0033782513434824006,0.016345539652218785,0.03451765606030179,0.6389668059477379,0.02862295138255979,0.06921570510064301,0.004761634162703211,0.0012845659617633305,1.1532670105698952,0.21605731912824738,0.0034621171305454974,0.04380629983778029,0.7707434038179862,0.23998245674702948,0.05263046535815248,0.796423221708744,0.38152682807773325,0.0003605605346279463,0.6470317261852312,0.010434484297800384,0.4399256217264555,0.00441504495366198,0.005484105370325948,0.007270812200631214,0.9987333733376521,0.006127309386174893,0.4056676771350478,0.24570085051839055,0.07008043065933044,1.2422812756410664,0.00326906285491068,0.007319807341874613,0.010298337792747398,0.6775982289244326,0.5764400196701306,0.8820956620147535,0.20238623969938127,0.3508515814973445,0.011361300277603346,0.3678147745221842,0.054312916675042934,0.8563272774353284,0.005665985193597403,0.10539605347124208,0.17710703469230799,0.5496638834513555,0.5678168242758056,0.0015075556514877058,0.08321475315805386,0.19694000774436618,0.09369310462044926,0.002524762856659143,0.0014705694743099966,0.0002249900178080621,0.01945546369862872,0.0467767069688112,0.0056652029712900235,0.00033118266310772874,0.8803029388728312,0.16817097279032572,0.0027258724515947935,0.13141431932646544,0.01809576633448042,0.23312000788351972,0.1404144816927771,0.03802404190458442,0.08784105999001207,0.3070094081489155,0.010144934883892065,0.004291118090192903,0.97788751716208,0.1775017995484254,0.017976022840105133,0.005850610024717695,0.0751961627561936,0.034739315831176266,0.29842945051172154,1.5836704700898898,0.19228895627160464,0.8104048110413696,0.0005196741479357403,0.9548829953650152,0.8201117992880739,0.10327221911009013,0.1306555984421403,0.014324812653568483,0.12648313684305892,0.2193961509019229,0.6487506018441908,0.00041755813966860855,0.012668508528209131,0.0006396692041409694,0.0901494495490446,0.6859430734694016,1.4404523576958188,0.6638366749757987,0.09472899211637878,0.9713565737913714,0.7628279151372919,0.13117852429361973,0.0070253400307872735,0.8622605866832389,0.8021417733320196,0.9169466498221703,0.005008125013742024,0.0290741724031599,0.0006062333837808425,0.23488479073999374,0.34366401158792037,0.1585447710069159,0.6015665468947307,0.9297370642173686,0.03457310112648561,0.6848533702990104,0.03785028719616188,0.029234945155397492,0.8241015770489984,0.05676287017844017,0.024995767668693547,0.3558385962228934,0.7628513082885168,0.08041886513401403,0.5388249368796724,0.030536717114921213,0.024945705529026023,0.052157455056965,0.6827179703169827],"x":[0.8652067819323279,0.7806554983929679,0.22297319495578627,0.2863959369324032,0.8671917082257434,0.41564405253519254,0.7078673192808536,0.7524032550364164,0.7239824987024157,0.516574338819993,0.7286719333787963,0.5897600002842975,0.35632433506338623,0.5748601465562679,0.3779169995088949,0.3905311091336876,0.5493147128296432,0.6459586916079876,0.14848532236619327,0.992915257826811,0.11652919031930087,0.19500331060895704,0.5809237174747823,0.22031181446156434,0.7285948310575026,0.3616106954932845,0.8774382090534041,0.6650829534418772,0.16794221863521241,0.526079147195577,0.06704903982067467,0.6562600480669343,0.859085952896697,0.085957299704984,0.9598119515494814,0.1582373736162015,0.7491652736485166,0.9128090611875499,0.6770862892502614,0.04442566736857345,0.24952501601344856,0.17384893516748656,0.0529509643052426,0.65669124632256,0.6536454691638691,0.028585645164189932,0.42722058643639427,0.734298651084401,0.023663823010713347,0.19377870347924264,0.6566228500294138,0.6898472493534411,0.36757998024704963,0.3001119136914947,0.7723308546786181,0.6434679444736822,0.6880498403432642,0.39156156072236925,0.5322540274618843,0.8824290598533258,0.6675451195023256,0.7229328010015847,0.796007456603224,0.4665311498222757,0.26019306804060927,0.052075704117914956,0.8693097691628293,0.03796816410102566,0.8335083112822197,0.2800920368732116,0.8628553764673319,0.17733853391087417,0.08405765385121478,0.3078547356723149,0.13109518753308502,0.1786023264701515,0.7445285385946001,0.24361478305078288,0.8633164080751852,0.46959098507263697,0.17356083330841177,0.4655742634665714,0.34244084428532573,0.6625737293960858,0.4557915012081295,0.029015792133643803,0.37745998983412754,0.5385936381297738,0.6026759804660657,0.216155925809822,0.8097703385152553,0.015756694597439003,0.6815725605127174,0.9577762407690564,0.46510032342949503,0.4822704754556506,0.7456016074958092,0.5653867882057995,0.8764065732159101,0.3666307221095173,0.49964450911666547,0.27135655229697475,0.5374089106217952,0.06491848044945536,0.00594122250934026,0.02734291431687841,0.6607209903139857,0.49243495244600544,0.034513594292598926,0.49863965043366565,0.5266626779742063,0.6117538840798493,0.8015953333727535,0.1418548025220896,0.895372082794933,0.16524726489825325,0.12863754833858088,0.35615515122501495,0.23952128447417986,0.20688014249825093,0.9859968889671267,0.6074425583531757,0.26588190874710094,0.6120307910772429,0.7937341205199375,0.7798661275866734,0.8381935179133357,0.9199150993444944,0.8711711503386586,0.20185814003635527,0.08198761059753767,0.36524953304422003,0.03338478723587657,0.8432088012476509,0.2326738813946141,0.5976277253705231,0.7577806599610013,0.8732235123912544,0.15819688977149093,0.10674297257752441,0.5001122079521816,0.7156314358855473,0.21158786305875976,0.740663722835851,0.03556776351060109,0.10729756456337802,0.06889045900234247,0.7000839948782047,0.7976380926700601,0.12450970642178061,0.900795364046123,0.9540428542199271,0.16808087379499925,0.27420581127053034,0.20524214272866703,0.9155252093731632,0.29427068997032957,0.906702579987487,0.4922358053944187,0.06623458550714578,0.8491664409373219,0.8114948086681848,0.6184259055037944,0.23162662377273513,0.6457228236153103,0.9283484711845211,0.8163056949208498,0.071486292794533,0.3724237437095659,0.6817568932298874,0.2873549121010006,0.813897098800834,0.9775596460547462,0.13462972786206717,0.3773746341155866,0.5777003994646981,0.8877844125627936,0.8760786625617691,0.6522887703531177,0.0566394596057298,0.5261758593697046,0.2794596343956557,0.8423242310777119,0.9939433499885166,0.12006057104189916,0.44810352736920755,0.48164793591053945,0.7530122032854938,0.6034738227744814,0.9187592244400518,0.6670294493388162,0.35560303359154855,0.9772724342913701,0.7485294283040458,0.2299975101293077,0.202482374516338,0.3312104350928047,0.9927331590409583,0.9862222872522344,0.6902709380268099,0.5087567828184894,0.9413753983837352,0.44820053872137766,0.6007982913896508,0.5812975563482057,0.6044019384160757,0.8125349679758429,0.3330546267195216,0.24069800112008166,0.25034947752717507,0.6370171883880016,0.02864189017581098,0.08335850009543067,0.7276325451493186,0.683830419910608,0.4618194022979729,0.5174292620991654,0.7559024697564725,0.3190607381740258,0.4827999913168348,0.8793383020447818,0.6100114060835973,0.36518259181649526,0.6200670793631775,0.2694724725889315,0.5245986063031249,0.094055325784832,0.5032828579873507,0.48338330804314555,0.1816414078767885,0.5588530181530307,0.38287895582890585,0.716956088039101,0.43376192842555183,0.8657781811281531,0.9789476964594188,0.8763997715542875,0.9290393127985419,0.9327301211968588,0.7610437592667174,0.14825692013763492,0.579026311814967,0.521859168822632,0.8487725156184787,0.7619193629429428,0.5529719559459723,0.18265258178629096,0.7383078781087435,0.0313462605014494,0.9223611127230162,0.32676346660470235,0.3593345479129586,0.05012594734937603,0.5801152301475143,0.35520790292960225,0.958025295453736,0.24673806639791795,0.729239990368582,0.5614165004373362,0.3594291280853408,0.7672851806595513,0.9774209512926593,0.2787647400346389,0.39945752590615813,0.4821530185604834,0.5832535523105036,0.7396811908081646,0.5685222781205703,0.8867156520120667,0.6001320669986996,0.5801861865606972,0.03978619642617032,0.282455899056437,0.18973691046732455,0.7718145535113088,0.6714117041573158,0.3882439324923439,0.31173729322159627,0.9132571288478617,0.6577131890415429,0.8222060748968258,0.9481232911259414,0.38539996779419305,0.4793689801033658,0.12443792171555246,0.23657903522285717,0.05322592534829784,0.11905139756902483,0.286656441318782,0.3707670863102783,0.0689910736732382,0.7243116271605126,0.6537601525548156,0.1871956739977223,0.9305004910063668,0.9498301718624358,0.6350019779097302,0.4253764493845784,0.15806862224380858,0.026923618503752245,0.8821420518004359,0.22974106222304247,0.8466267673588082,0.3880913364510339,0.2531043682151739,0.7400042150781654,0.03359816212706779,0.5670221507537125,0.877456643927752,0.7888748929320593,0.30395078981971846,0.3545451661912882,0.3909174184338968,0.004976676329387697,0.9392624197103812,0.2993670995981177,0.539219945416695,0.510620246676218,0.3081289613700655,0.8307077227740292,0.8704314419336356,0.2361540617680744,0.4773677323874057,0.846981162065463,0.7829293853978772,0.9095146828120402,0.09353881710398593,0.25041972125185685,0.7419923955890617,0.14114643000899663,0.617705878638418,0.5343841845790935,0.9200594791102741,0.0718640863519151,0.5185821164453339,0.2835612266189007,0.36586607483622546,0.9191978846818929,0.5482938990796964,0.9077225564476534,0.8790688479526474,0.5945290078417753,0.4087521063254449,0.14335142770337272,0.8025377271240626,0.4729785684864243,0.9281688683081473,0.6318848767113572,0.5247388903601602,0.6927139608063952,0.861351820149862,0.3930091018865156,0.021073346863587306,0.561677714203026,0.8290781643503893,0.1622009947407732,0.9859562656091347,0.37531826961644654,0.4396816904815617,0.17694876876508947,0.10655539524371571,0.5251886945285127,0.7879165612512404,0.09081701142200482,0.6880345178319671,0.0817333662125832,0.3207745656611922,0.38905768993125434,0.7829720488889658,0.78639051572107,0.1497016881074913,0.24297826359876007,0.16432946220735056,0.7562025190767754,0.027565064134059014,0.2455011745117277,0.7947070991291323,0.5986429380443985,0.21955777564084245,0.6370661802781428,0.21032029841662747,0.07581594905057765,0.31380341175124027,0.43399252026017043,0.26920266018051175,0.7080173281541349,0.20018934941567745,0.8281354820193199,0.9667000043550755,0.3309715208289683,0.7866252845277202,0.3122466352865503,0.71987079665244,0.7649714420112501,0.6828304666629657,0.33420211112487874,0.19996648362983493,0.31550235812035754,0.6218340004561034,0.056394281494183796,0.6304556586216468,0.38909494221510155,0.7002713472999025,0.8122735926508946,0.31295301673456577,0.8147073751164609,0.5354715895524014,0.35516044575831374,0.8607879240938678,0.1944379308104094,0.9219036877543219,0.567952301096529,0.019409667035143796,0.08887706813556173,0.45516962346985745,0.7482719191450713,0.6693105158366035,0.9388795990236047,0.2621869419408587,0.5344175723940152,0.23171640031951912,0.9938631247738439,0.8314502917990532,0.6514184133486745,0.6774715305222976,0.2828134923992629,0.05049377447220427,0.31240744814098576,0.22076695631358056,0.3033509282052762,0.2233182702412142,0.9197556716310211,0.7605584829983849,0.9756703177865953,0.5096766311861105,0.5888484265042191,0.34013847862453206,0.705941635321415,0.7062473239999587,0.7484845863634884,0.9046501524681672,0.7823308161163576,0.37169774649522447,0.19550845961496832,0.9986912046907233,0.819033954917868,0.2654552830070409,0.7344651765304533,0.4951624711693958,0.3812968754274042,0.40912761653737895,0.3795439167624086,0.15474324953937724,0.39996377650424386,0.3421342888044341,0.10172303607048683,0.9008915979486873,0.048121303243934044,0.7539607491694358,0.29458260368122935,0.6542260362790364,0.6389600888078757,0.10579672100545778,0.6514786459643165,0.8142620849499529,0.9853328882324752,0.5678833750828316,0.7723777937949721,0.08870817285431953,0.762173500891826,0.873629916959838,0.12900644069689626,0.5220598018182321,0.8327619502352297,0.10585219428068338,0.9071772638887936,0.7151575144173645,0.6299543376193424,0.4294589279715697,0.4346678504511887,0.09955318399844404,0.11671878741473307,0.5125121248974605,0.9703533397379593,0.806177323978509,0.019981782718271335,0.17253911439864744,0.8190030391321208,0.6962787201821212,0.5713781569968461,0.2488270081473618,0.28087157294936826,0.5999207991277304,0.2048759496118897,0.21389017216519335,0.7928524191508086,0.3906145089150166,0.7444486662418786,0.16043158745812636,0.1883550285867197,0.36228356706467424,0.49678184270014825,0.7208543970919776,0.4910350550071394,0.6745288719169888,0.31437693882208007,0.5733992203350917,0.7884726978485299,0.329829839661415,0.13259925782778992,0.8751293114347514,0.7443036925329896,0.06498332847395627,0.7922477739994307,0.042977088706209754,0.5056169875851433,0.9992407407618369,0.24437690435860038,0.12671203720451985,0.8685127334250324,0.8146131043551692,0.6125657697607585,0.9004132616240843,0.16413736233318543,0.7738159930731341,0.23602404054019077,0.16755583022698195,0.6287156844485462,0.5914638637478573,0.6462754632613139,0.3128055859405341,0.666030797069042,0.14204627158949967,0.7874916971540213,0.8277874265558713,0.4279801424263976,0.8124237259231497,0.3748278661030704,0.004382067254899535,0.2995766260569861,0.5396561324784277,0.4883566421572456,0.5335065592606574,0.5212880942309737,0.0753858458944574,0.4098151457157688,0.7714201340251241,0.4345890640999237,0.7508641496124395,0.6557037676742175,0.5339727517685511,0.5097200393726244,0.3255968860423366,0.8453428618051122,0.32199717159296193,0.33626616191026426,0.0950308154642574,0.8448767768288663,0.20176234305359797,0.6893381419728815,0.980047895976172,0.3554142624919088,0.5629670121058306,0.8523375301638316,0.45141526151769273,0.8228785028881334,0.836354697594295,0.9162669101128542,0.06398163680094826,0.0587919082306565,0.8652640133305982,0.957348735026331,0.9377218566464876,0.6568301216360948,0.30392984668165357,0.5807807185810778,0.161715729585707,0.9133097231037004,0.7737384166785808,0.8336903107658553,0.2828278437625449,0.45062899623727004,0.38190662119997687,0.9770213229522808,0.24668859919672426,0.36427604325333496,0.2599329877116372,0.9151561423364134,0.4974864359191631,0.08394656182676807,0.007959688400800191,0.3333347061647727,0.033593455154412366,0.5057109130907085,0.7018996499663988,0.23134652925797328,0.07738016354507815,0.028069152993000168,0.9268957903864621,0.5373102165047312,0.7193936932004124,0.892955914953321,0.6710176311768454,0.867414140305327,0.5013502031286554,0.8718735355404139,0.6851692984865354,0.7264445157313326,0.6059026286390297,0.5891505333525342,0.6070554172831104,0.2989222345416971,0.7483064838952611,0.09951164498494403,0.2573239394340687,0.7185981996606372,0.933359036174674,0.36255374117997397,0.0597700842818083,0.4475930938646453,0.9763395820667728,0.08232214754156009,0.8935551368180932,0.6208199904155802,0.5776487770097753,0.46111030841335965,0.0727822325121461,0.46815538797311795,0.16190963097859012,0.702636609392481,0.2935452629452855,0.2515498346932068,0.46240112485949836,0.8712914464406645,0.5621188866725997,0.18888275129667842,0.1320022582732625,0.8750929720403005,0.5517152825328118,0.27658870323843243,0.6295567190427951,0.7623394760341802,0.4287645792267074,0.5795680008695399,0.27835394478157216,0.8549778385840199,0.30281538255693663,0.8226885894206415,0.32298929777717666,0.8134291419622488,0.8047820716876739,0.08536711615920978,0.2775455555644111,0.4328511697591815,0.8235430063421922,0.8312307426694894,0.6392268962322636,0.28323511902479503,0.8923119973787994,0.8283128280606575,0.5303586100942563,0.1794692895458876,0.8407509904476245,0.022794436161552856,0.23578116143365402,0.043441296739516355,0.6054241269396823,0.78560176448908,0.24414762232891674,0.9562134515954335,0.7265626891884265,0.3852057242257938,0.40383928725607565,0.7517020662274765,0.2897099504758154,0.540752224391662,0.3917442771646704,0.2908797106031906,0.044832663273616014,0.3372014545931037,0.6844403434738673,0.6917402804331738,0.6464906039489826,0.23753112174320767,0.9038019174136724,0.7802455951477767,0.2666754244258167,0.7564096841207011,0.3505684174200667,0.8281751431141569,0.5460824779989548,0.46754932454593634,0.06583993280057321,0.08420648952098109,0.17749648761138626,0.23712675820421358,0.6565797120571135,0.9715400477246947,0.6140387396176334,0.9616958071358408,0.48819041406866504,0.7190488796917496,0.2606288060539237,0.498925509581025,0.11503542355105711,0.7482114778722102,0.6793145598739725,0.3838210266713331,0.15216686245095046,0.12583166782898014,0.3856048358722779,0.17538232559261213,0.8435161609885944,0.6082143846787373,0.7529085172352612,0.8313500066639166,0.4962294953888702,0.7998412125933263,0.32565542590360796,0.5599433479539948,0.7072681721860874,0.38567539855924826,0.4941082191492625,0.40954977828665906,0.10898491744322225,0.784823147507755,0.6004005466893823,0.1185925914041488,0.6401318210283917,0.8814051685804476,0.643969672815442,0.7404047056400709,0.5106216837701354,0.9297523732413462,0.5433469589101136,0.8239648868484011,0.828362365009014,0.7112093041486034,0.6726116547148207,0.5957428109850991,0.559787228731581,0.8260674386838771,0.1018965064779187,0.7526275336192059,0.3797163870140665,0.8525609163253463,0.39006882154539957,0.437929687862217,0.10566521317404809,0.0728094993398063,0.24491189474087904,0.5762331683203099,0.6671873188365907,0.6571326043264487,0.6619176421930573,0.2614745271527237,0.6921397396263935,0.5190590782688846,0.12901673278860581,0.031144614877307353,0.7268088275402136,0.46767458332503,0.7312561450312189,0.015986177388762846,0.8515915634970872,0.09947689343959576,0.5860468253755575,0.7260663173013957,0.375814575016719,0.06672262949844132,0.5701471885094123,0.48802067256643866,0.8457922879483468,0.9152885360298362,0.24599064976975793,0.5445095863232621,0.17730899455383908,0.13719909696968435,0.9060712263575641,0.7114918627532336,0.06752570491508902,0.43841116249955125,0.141672208110049,0.1822295181160618,0.017631038517759157,0.41725652506665445,0.30411531240505174,0.5141106906673085,0.33678663088298233,0.4942453500803421,0.693395966551686,0.3110118830116757,0.6998311714200012,0.09052948274125905,0.4870301387698739,0.7300494054205631,0.9881994703880659,0.3805856067388307,0.25894515829479636,0.42003665458648887,0.13572339792086563,0.188336372118032,0.30349279120431194,0.9260324362558419,0.8389517357601723,0.9447433406839365,0.381795208225016,0.6764737454351195,0.883818886613708,0.31260749536281796,0.8068932398508211,0.46234922495415565,0.0692036170213226,0.3573764190715538,0.19117397371201372,0.27696755165230846,0.9273631868901755,0.9681174452403796,0.6978267577466875,0.25052644652061673,0.6431745930815107,0.9552057780815137,0.07597200877110533,0.4009524097098498,0.34250992332350383,0.7726105982564633,0.2532540787835782,0.7884718768171026,0.11321937922942982,0.43876032167161116,0.4188498229513731,0.7982521523290069,0.29909969772023715,0.23622275048966368,0.7286830956850363,0.5301965806209685,0.8132888397596061,0.8123536250448464,0.7011075678835945,0.7427246044269544,0.452464870906339,0.6782023634778676,0.47330944166405997,0.4573320736867257,0.8192754018488524,0.7292056792218755,0.16076019220156312,0.9797718664461994,0.495145484964997,0.8025160406328591,0.2862433748581499,0.14730057260621,0.32501643698502636,0.37302904778040546,0.36574472178710415,0.634900071950494,0.10919705791375645,0.3192250107730139,0.3389428609025482,0.2727938412972224,0.38851271892138484,0.4064612078985761,0.6612866878033179,0.0010351977411369173,0.1000529222783435,0.7274158544910811,0.9625135597677699,0.23822543659771767,0.5221549229433675,0.2733420935318067,0.2988542845629385,0.6958868939915068,0.5400532858780362,0.7263571723167253,0.5096013734177025,0.5310185478399447,0.9912897451252054,0.7831702831440892,0.9205570023829279,0.7212811596057247,0.7010998680007958,0.8067475494562373,0.19439113687712228,0.926572341478225,0.4795852273810215,0.031962972423541514,0.4419599041210993,0.295043699289423,0.0580244812931352,0.30940177069336317,0.9159433580507488,0.45902529967722416,0.747608160657353,0.15305942890212965,0.5825796090387181,0.6945706188959762,0.9509242298832512,0.2849196438733783,0.7578340292245764,0.12277420673728345,0.4377564687771467,0.5973271881556916,0.7220232152447472,0.6561065312186023,0.8345958705594629,0.8451261825777729,0.10677684389126041,0.2608592158610097,0.01793495531306144,0.6355272818047037,0.3759732308877386,0.8042253960878232,0.11534154850979128,0.4912677090812825,0.2931801163525549,0.8434079795737779,0.9794276716032173,0.24156581300550517,0.31798311612288055,0.4211680678896055,0.8777517865079794,0.5936005610637436,0.29763772259858334,0.3111152863699802,0.8236397355713605,0.7457261705351714,0.9607254507364382,0.4477283312140661,0.4068370098245908,0.7470420717365844,0.9285480687440033,0.15534894647368702,0.24854818380320376,0.6547797856027109,0.375642007913755,0.4113909245047689,0.245023380691054,0.534913760733658,0.4542899745261477,0.9773098829695759,0.6541670682873775,0.9138294556863562,0.5687068814398497,0.37474885330504426,0.2611810785977404,0.7309858323900298,0.5716690634474508,0.8139122423906513,0.8126018116230198,0.5854253000885505,0.8503668023144666,0.18260931841126626,0.025329606057623355,0.8314102886970569,0.33331008272304974,0.020526224985927044,0.2500824961845416,0.2607449673371429,0.5398082806507405,0.7198428415076923,0.3347188683822335,0.5171082110095826,0.8985653774209839,0.5041477643889567,0.8714197458871376,0.7490498653750739,0.08968229195700483,0.5552325109188592,0.6725501018471478,0.26746353202548256,0.15827460257123804,0.8572331777650171,0.8821228632206335,0.7908967851309889,0.5676317124845516,0.17860341758844211,0.11066219617009909,0.662638366363764,0.9486251809909252,0.9196181028568959,0.656916063071471,0.30190378349732017,0.2265774060994723,0.6080964599830947,0.015936582244886033,0.943051607475027,0.11378037431197918,0.43318688564430285,0.8559123376453268,0.17425477659564437,0.3878956670959828,0.43683382903779533,0.1370944148323241,0.1352075192229545,0.46306981544911285,0.6183841015799569,0.6686540831992245,0.4943341151354832,0.8575082035818151,0.1294801069060616],"s":[0.5315941027474669,0.021993937081646653,0.2548033030702521,0.9187878543959991,0.9110449751247549,0.5331815450011943,0.072178148918558,0.17347338817174185,0.14514079594036322,0.5768317511231618,0.46677962587762334,0.5426399402709372,0.6219373020947665,0.7658468703316295,0.04586394194361487,0.35819936866144575,0.9172029507939914,0.098523093903371,0.5624694380235506,0.4499565647689261,0.6014151750642944,0.836212030985084,0.6854212624984728,0.5782514528947562,0.741226875738056,0.21728140022115294,0.7506990495657471,0.92803126022779,0.0014907802844621454,0.2755179112346282,0.9746740640515108,0.7315646875882105,0.12746575864888632,0.5703173805726403,0.3964923762291046,0.2602581526683012,0.3920341352406145,0.08734380154009624,0.28990605296214866,0.4492517442489308,0.40775759993048366,0.7603135756688235,0.12907884187653962,0.7063551225870353,0.20418404760066022,0.523111881250178,0.37248622536765863,0.12560380094475843,0.6775149700344694,0.6786022784749544,0.6352569989911698,0.7148356650487389,0.14418310738462603,0.16763095085542634,0.40518198472337574,0.5165435876986593,0.09386783177318647,0.05144867404805353,0.02054427677994508,0.7142594953448556,0.16130048317229573,0.040762156209556366,0.27039874188103297,0.9093024602792568,0.9038562267117094,0.7759286356657067,0.22016129793686323,0.5963900990838504,0.7855560931697527,0.5131816872294352,0.6819298249883137,0.5698276944861183,0.5362130480322405,0.20813211860408476,0.8598067358237089,0.02629053999773423,0.8044749197479331,0.8184183383690082,0.3194345614179319,0.761933114553142,0.6703138047886728,0.10912650626183718,0.7853485912634581,0.6044133275996855,0.22551797312525235,0.9700471221571494,0.6285235964123714,0.8098932444930325,0.8498426656553439,0.27856402959107696,0.5008441375012194,0.28721254887782943,0.6999382019984006,0.35450144038046183,0.6467083005939929,0.020041474364703937,0.37992495686682637,0.5415490006719466,0.49799514861432925,0.38342185117866223,0.89869896703399,0.2831871677399296,0.2999306364153449,0.17090005919910634,0.7624515088337893,0.31259031818634475,0.9293704126283959,0.8941700721719898,0.7845402844284153,0.0522529813390773,0.5442327810387939,0.8203763106668693,0.27961880040241005,0.23698244225534482,0.2214169526182772,0.41778648314112177,0.9343471956752816,0.3811979642124259,0.1460596032644237,0.46460892051884417,0.8590956836492012,0.8650652756584145,0.7098996777426854,0.4027755558135222,0.33832937181304357,0.681748352586709,0.09737498329380512,0.3302462471450245,0.6484477970492315,0.6956788669144158,0.4686656651685479,0.7350945973338134,0.1835101319040231,0.07706673381679874,0.33387360141769196,0.16696320395911024,0.33562314688406514,0.958857679800833,0.4410933019563643,0.6879351129014006,0.8005368606714625,0.6551042964981848,0.30871462554509366,0.37530435765728987,0.3536557257964372,0.6198121181371752,0.10957026994591401,0.24580769147609605,0.25951504778797774,0.3421772119957833,0.9151263747864153,0.5071368302497956,0.08813176647817489,0.4784592602324833,0.9190826267874499,0.1301497789837438,0.36138873700335705,0.6906803136260757,0.8614194816226297,0.06366999362299541,0.2736475645071921,0.8483874210775038,0.24967772523968024,0.3243302490404316,0.4304888797252928,0.6699177731099368,0.06322922650844953,0.4731883670592776,0.08997120819360593,0.6820220623258644,0.37154238026075226,0.9520348160088801,0.3009835307390396,0.04196177234233156,0.12336407654520198,0.6977942989755788,0.3947556099137479,0.16355655461884933,0.1585557170202827,0.8712256654010213,0.006992010052126796,0.6366031435646293,0.04837367697922157,0.479734075391417,0.2938897186417113,0.6504385005944131,0.2073386578022609,0.813116703786636,0.47280111270642333,0.5867249871700788,0.5639462251282019,0.3659786849186768,0.88714344570442,0.8986968704215299,0.6043503075081802,0.09615186106918916,0.5644578269456564,0.9050897740432637,0.9326014051186713,0.014735667353606319,0.6746271295819228,0.30860429497550146,0.9006265068006212,0.7122464503277854,0.8557645747615732,0.19750941127351718,0.6209579060210622,0.43464550906643984,0.18386445844976662,0.17367026478989978,0.44342991013943256,0.8960632257264658,0.20298319050845226,0.3158012917211732,0.5443622794596639,0.8554982410802592,0.7250076294020693,0.689191142335732,0.5046891946211844,0.612527035498285,0.9016374695654705,0.6645642328543411,0.7957891757038056,0.9765896352694388,0.18516960647393899,0.7717359334838034,0.6914406988124211,0.08336945976757515,0.2699054976202737,0.1427069411998656,0.5290141626940505,0.31677833789991916,0.3823125922777313,0.333036864007241,0.34395657784365063,0.6720967178948409,0.4040875503937913,0.1630340046344505,0.8760786190010439,0.3881400373581194,0.1108006392379366,0.4777783167647749,0.07385731484611435,0.12034378251457034,0.5519877778016318,0.7090687679309164,0.21152130108504297,0.9013857557788592,0.724421368552753,0.6373002486135451,0.9812139022431066,0.9438208450085626,0.4215644756515522,0.9880724898047479,0.5027102657014524,0.7112710300957663,0.3473067125232103,0.8246872889662444,0.6856166960403864,0.31302986305319513,0.19312319319322468,0.6481568681712011,0.49586917988801527,0.43581842822850847,0.24794292169435606,0.10937029949471211,0.6398865896820429,0.26213269090516467,0.495882572182029,0.8559427249830893,0.7490565634240216,0.7160283624519559,0.9816797969624609,0.9690103509576717,0.11237460804621113,0.060694715101335506,0.6961411684153964,0.17896386603256498,0.7274422071884568,0.38749863887899205,0.33014563052202317,0.8100741111811505,0.14570491580106015,0.666820627138442,0.6816320651606411,0.024945581075493717,0.8829714112333391,0.4863885630342153,0.6818799879731456,0.23247486691020725,0.053911958014699835,0.006008104920748547,0.7551707250915238,0.8151311534994823,0.5328744830730263,0.2728346134369135,0.8157634936083924,0.7691938672269669,0.2483627234496435,0.5326084271628646,0.7990003813394866,0.21733552463426253,0.4727346713810121,0.04782965729450872,0.3126572719938536,0.856119308892155,0.16849028657757814,0.7646130073339057,0.7278470745091612,0.17449206861447708,0.1880683108119916,0.3242641089343241,0.9712523585152122,0.3804565218850329,0.08914803057080811,0.48162568779877457,0.30859169732441405,0.11699047146929575,0.8480460827673575,0.7174513593619292,0.24923201692670394,0.4663717168594088,0.8592743182405307,0.36731796948674056,0.06568925370808554,0.5760309605885148,0.07326802154230849,0.5087778928451503,0.3635828330301496,0.9538786499978129,0.28852881365709737,0.5733110888896356,0.9457297865262932,0.40779778633697794,0.0992069998722287,0.31992988665532995,0.8295820538477752,0.5837767566519243,0.5297566757157555,0.9275831906925147,0.4995149751414296,0.03107324808462364,0.3265106071087345,0.16625501454944347,0.45180712190262273,0.04396632332800898,0.14175192047687046,0.3791117500651342,0.7231896219423668,0.5489397550173221,0.37445247409416593,0.3055766640502404,0.0723002477181065,0.13319962790135942,0.07544222115438592,0.6774362464212489,0.6740768152582779,0.6559331758576354,0.41559182971369135,0.6318588316699605,0.18989382776714714,0.02229718259128033,0.37653180709733514,0.8246164401306455,0.8266453678952745,0.5324304653275842,0.2571416466450722,0.1321291481678939,0.621081704153235,0.3416483889344555,0.7548521542129885,0.001882535809594632,0.8365830336471329,0.33131194443866296,0.42441285475841584,0.8570111411203796,0.5874044177219009,0.024845005465951697,0.6547975777027817,0.5647028964708618,0.932937345997511,0.9977830516111941,0.5795126105106454,0.7050480301310196,0.22243862395108827,0.8633123574501884,0.6475412980515816,0.8824472780539021,0.5484206301291066,0.944513010572245,0.8495074915440044,0.3598861428472584,0.5006080925772545,0.9228672548324013,0.39385971825503985,0.40048405902670936,0.18015366535074961,0.03992142193517667,0.6830634009736918,0.4217485015733309,0.11143995426947151,0.7860452310445658,0.25550846801037475,0.9691142911586814,0.5060956107252053,0.9847666901356533,0.5961780449045251,0.3092598248473215,0.8654309085242087,0.3521732167289886,0.5003522627608936,0.8911568060245378,0.30295485732111205,0.19664570991032582,0.029922069278948138,0.40026640833019145,0.892067390838045,0.9579359731666957,0.4493429991654434,0.5004788096807089,0.44775654432476086,0.6467593786417316,0.0521345723782749,0.9709376662505664,0.39921580443314997,0.44696307570997873,0.45266475872478806,0.021121923923237418,0.5153049089573045,0.35364094044176864,0.931215935429984,0.7128249348261029,0.873815620914826,0.7687575864393548,0.5541623185046816,0.315042872683325,0.23926386985982329,0.47571453918161444,0.20796599378765346,0.20144396586848123,0.4382408942224225,0.9723144844235618,0.7194114046628495,0.7940284713096339,0.48881612864973367,0.2551379363876196,0.17706184635702282,0.24555956202514184,0.003181500985523167,0.5625790856188859,0.7347814840240703,0.7958791692570186,0.31036993738798957,0.5916293006240156,0.9822285410445162,0.5110044945996626,0.7574349061658832,0.6228529024974883,0.43303384257681077,0.4993769422065164,0.60246144293215,0.31939203234328883,0.43516327889838813,0.8795270524761516,0.7253548156668224,0.578711612552262,0.7957481590175015,0.42659021823919696,0.36702526799340807,0.5504479324039038,0.9369336845502005,0.7926831028186512,0.9829930622480305,0.14215309826093736,0.6668874411884229,0.14142495840978864,0.19656756699447908,0.08885148880277938,0.002054782917468856,0.47886425713455916,0.317207539199428,0.613074831957988,0.3647476413407169,0.5077220837906309,0.10543547641710238,0.23908102651565755,0.7577682724321637,0.6798765600649066,0.4160656352513261,0.23321675879636783,0.574378701969904,0.2934374943008238,0.18790371228277225,0.9116106683081802,0.2730539748537171,0.8108787969920799,0.6489026459729892,0.7892624498811232,0.9859434230056332,0.6432516529499979,0.22931428229910322,0.9755888601737395,0.15700289109778898,0.06653329262960894,0.6929096845173202,0.8699055131123872,0.1857199640362972,0.2656956416696459,0.2777264712423295,0.9733168504174945,0.511008206793752,0.7987371413714692,0.8676930910883598,0.051625829012109214,0.47894065499501126,0.381833364119067,0.40594739160640025,0.24343232216518418,0.12624704526843233,0.17442963753666452,0.8723830066525269,0.7892133230984311,0.6194789530592424,0.5037248400001437,0.29994801560035733,0.8863173592727636,0.1619926839401551,0.4160012131302382,0.1492471405114475,0.4272787515822991,0.13661532100926577,0.9806784676481515,0.9244310072717681,0.51575356215334,0.676763170381596,0.13055899294100803,0.47270664635410564,0.6190828787427287,0.1699045897334568,0.20176104974705278,0.5731897251105627,0.27502813161358297,0.2642686052097858,0.23249919498800842,0.7426989467163772,0.11118326733136907,0.272881903162286,0.015237372846372832,0.8697841524375443,0.5762867389541237,0.7420366044695519,0.5768501288390535,0.4393754778025476,0.8967711800890772,0.008605607412102145,0.7162345992031749,0.6666123310017582,0.9000562122338347,0.5344858121858624,0.12501285539156282,0.5763991064793674,0.5064441440060847,0.2957338543781587,0.07454410911290754,0.6263100606921475,0.3456067922240105,0.8376109218099921,0.03731963103007763,0.3146524400005859,0.7921734375943448,0.4936975782712665,0.5465940209562636,0.3031726400043582,0.6865639526416663,0.36051945524448104,0.3281455906431878,0.09900806624755076,0.526079355139552,0.9028088632862679,0.5122293153670909,0.9387351666317887,0.2815826572747937,0.9984850591449048,0.3701538644358442,0.39943898823272805,0.5021800414956956,0.5189262777160286,0.012328825304907864,0.9541735540611214,0.09647748909416842,0.6377098098840241,0.20785351614011116,0.7306568277805829,0.13209748744015948,0.9077190475373531,0.09957605984324669,0.007829981128448349,0.4862279950450683,0.9843755404830676,0.48920930642309624,0.49770847125634665,0.22865792019659215,0.22093331146966833,0.48470306136965036,0.4649211584948598,0.603007399633732,0.41426832823636506,0.4488848968906025,0.17254167113506225,0.7673625026673252,0.8229934145961795,0.039826771124357174,0.5038664309551739,0.6701432025806984,0.41253768633473653,0.9729053803322414,0.5850354477562565,0.6413925350412664,0.8247161740685589,0.8094403509931245,0.22264075188471621,0.3033228932816143,0.9092437267460682,0.4748009136932385,0.3501019591081336,0.05107615035696744,0.2895302787716163,0.4779257683649476,0.45362023616977254,0.42558394424559776,0.773662443194997,0.9032739270209831,0.37458350851962274,0.07191298565324256,0.8262618342311743,0.6765847396554858,0.35194568784828517,0.5220083059301313,0.3206884381221846,0.27010295373555104,0.9096489217466246,0.36706496537236344,0.35571467761992004,0.8381151583327591,0.5243148009849745,0.7713565722914166,0.9079527556020237,0.29224119772945434,0.7346934160797165,0.38563050811382094,0.9312284625054259,0.46364560345262107,0.750098696065191,0.36756331758963157,0.4982405286993823,0.4120370015704249,0.7929759282500113,0.8441751037156346,0.8504041512678993,0.5070108852573691,0.7365141895128273,0.5033395134505887,0.07476992138513827,0.4006634541766423,0.8206308815374894,0.9225548876185585,0.6909076116739103,0.9956743338618721,0.6494244484540557,0.06269065296462983,0.4726060400471572,0.33177239989560325,0.7414027267425491,0.13683743256314718,0.07515676227307866,0.6537139330390178,0.164237098730029,0.19457574049654403,0.30943389929317666,0.09216828447076852,0.059282536363117755,0.7777155285631145,0.23455343103773774,0.7088887402666162,0.3835677643170563,0.0698145043008731,0.9253084135270808,0.5942501442063677,0.8128672018285776,0.8378585461470749,0.2226429591747232,0.21546624964937755,0.2833571352816662,0.8775225852274766,0.41382698721906497,0.3781594291671744,0.22399492614048522,0.32001021459386325,0.4861463748889172,0.03374433186683534,0.32847738356423806,0.49682120515703065,0.3520758916015163,0.2936453752050545,0.8315879922718865,0.09152939672134042,0.18280444167614962,0.5243533053670204,0.35352524515201833,0.7834423785528373,0.6274428835683294,0.5061619683754541,0.2195974507459102,0.7511169119818788,0.722840107640629,0.6940669828964525,0.9154866315863759,0.2787844110476936,0.9027143331148741,0.8400156126018219,0.15229648774947036,0.7440044630562106,0.3484799640731775,0.9001071514792505,0.8580303026800542,0.3086338377430422,0.501365020602186,0.7330741723013383,0.6010408591746246,0.3672365356465743,0.4806188333586854,0.038471261364224185,0.41804068947773687,0.8260970068413567,0.05864706695026545,0.45713739134582654,0.016350065455800644,0.44639056402238886,0.01424198538767052,0.3123980979350811,0.3705975473520253,0.6306136929653599,0.7005012071158212,0.111615874263441,0.7999203369131576,0.23015223398783413,0.05611696073970074,0.10527647719293265,0.19521189966792774,0.8418836874584192,0.7838368069477621,0.576395512178471,0.5012632283138359,0.13855453845198085,0.1472785956127407,0.44803931441734135,0.9396066862668937,0.32641158392146874,0.3600847997218215,0.26246206196885535,0.19767402278637314,0.5497017789067666,0.8182716514465105,0.7252590290094278,0.7170536245924028,0.3529602246003072,0.5535027639750258,0.22912405707551198,0.466433756929042,0.3565017780654762,0.6134035690127706,0.7118004982690398,0.049864864616401716,0.4442254401609984,0.48466595196284956,0.934356519332173,0.4445036725485685,0.10576019624934174,0.021798553098190565,0.052865125775799715,0.4404368721484262,0.34236425907908274,0.9642842207363544,0.25510278953606647,0.6627600739362549,0.645030382697108,0.12623698224477864,0.5141608592479276,0.39960645048192367,0.43855961693918877,0.3250837755521996,0.9549720904424084,0.15556708469218972,0.6470003519443932,0.8923516555426305,0.5595021724922002,0.734319636870334,0.5736459597508305,0.7932208359305548,0.6412878331989704,0.17542738129429591,0.30944198874975837,0.7963534079177506,0.45896611325886383,0.04959223566507864,0.8050837640035844,0.46884383629353166,0.5660299079660926,0.4650391664845024,0.18433307514137098,0.5765973578597894,0.35490506915273334,0.24181974899409253,0.31332093296287433,0.06744669993680086,0.3463775286116413,0.33785721312589945,0.9895838660397787,0.8066175173730215,0.16795458490031545,0.07296289211402307,0.08770806902643602,0.3298964134983715,0.288634317947593,0.4227989208141041,0.5039188616031627,0.6882918960542412,0.782106759022124,0.035927732167632564,0.6874206080796881,0.17436758415825815,0.7276967947804862,0.8453183093168464,0.004220523228774642,0.7744188908407061,0.006961827534204046,0.5756942866860337,0.6684792291197201,0.09576384184557463,0.3401565065929979,0.448282719382072,0.0818765131191379,0.4391670038701194,0.4446405591797171,0.5416445848746356,0.022428314190341858,0.030777318300099,0.38905375100231976,0.01655574813410543,0.31560672029596226,0.889890321109484,0.6772428633838812,0.25834954792878606,0.307264863415724,0.6609687987193622,0.3972454247459365,0.8627399382721104,0.0016246889123108232,0.7336965011441863,0.8901810528759826,0.9866654393442191,0.18059490312590576,0.4812865571683773,0.8169871099704646,0.3990980616538169,0.4445252917283906,0.07489985504852648,0.4582761421021513,0.43355086909738305,0.8227603428601449,0.47521237150853546,0.38037683759721586,0.829180082250649,0.34815244734239625,0.13035156345271104,0.9464801739968831,0.9253661802921886,0.43484298431832524,0.31357811558144055,0.037636083295938594,0.19282356413979795,0.582772130854897,0.5312135170259711,0.7191022286883633,0.2956399650981163,0.4093916330662448,0.8167145896978616,0.16772599026378754,0.7735479889318904,0.18619733895911317,0.7796240069112084,0.5585076191657607,0.20184009072862485,0.3602241289573145,0.35996904238982985,0.9040179557443246,0.5966325736483389,0.38796293474450483,0.3062876689587126,0.49402489181381193,0.8349869699970089,0.7428047668857929,0.7047481460414307,0.5507055820376183,0.8078327673135783,0.4684273384929618,0.2673676508279119,0.679990812023038,0.8972594814980528,0.2808414277174265,0.0444630881082102,0.9879786716896506,0.9867633102490185,0.13584620052434726,0.5042404786716339,0.33426139246146347,0.2945575946495145,0.8971620320574156,0.5050165313776431,0.7004156483543551,0.844397630639784,0.8080048955194874,0.7164220178741396,0.3863834592554425,0.12735608402149112,0.4528194835412769,0.48864043146910174,0.45712122284758805,0.11946110200061932,0.12172924992075695,0.6690814778349219,0.9158212096577643,0.46971105432795834,0.6387326447657053,0.868145881919087,0.529944267055728,0.6100945234030071,0.30388163525817324,0.7638682545811148,0.6668176321841515,0.30654466603660957,0.14300057146924705,0.5810807307003418,0.578666295927692,0.4238156473636463,0.8299853444286645,0.697002262016718,0.6695753100484225,0.20389305163761628,0.8047299777590966,0.7423993178997477,0.7315027725352752,0.7253917245823953,0.7202380371020993,0.628139122840218,0.7834910194444107,0.9819536115653891,0.7346027527561143,0.956143948552916,0.651357521974903,0.24327465305598306,0.054412548830512275,0.08725178957242918,0.7706267211618942,0.2248091349107526,0.20850715186904045,0.8494010480634855,0.93889307002667,0.9266826531005738,0.7881421519697474,0.46739951115726064,0.8114588254061748,0.4027941678296878,0.9822702405927912,0.9124423944242896,0.05175648487681461,0.23470849016720874,0.8623014501947586,0.02927501877779881,0.2191696108233483,0.7429066540044609,0.6815906322815952,0.6353917338010817,0.4355926286201317,0.7144379357464858,0.19581887365450834,0.5176732705102312,0.002749214522327792,0.2598737264205657,0.9560692748883963,0.0406879377961018,0.854652148123193,0.2706440940388901,0.05521259854483751,0.2746300365057006,0.475814885097654,0.3589196837677733,0.28165192639364767,0.3951285486737146,0.7871394014879634],"mu":[-1.8905825582897506,-2.7300356988249885,-1.8680544551112233,-1.3420764139239516,-0.7104942546992166,-1.143648862136244,-7.324690601450872,-3.121802748054241,-9.344768591257502,-4.186287099392027,-5.932650982429493,-9.375050507839688,-4.1377022041373905,-1.2634440524819923,-4.3371836166181055,-0.32461952916672754,-5.701375670120761,-9.607121969450072,-8.641350587603224,-0.10871588791885323,-3.282306371204111,-3.019100418876466,-8.325325065359719,-9.891735014192962,-8.145591650410179,-9.705950070910124,-1.530574413751462,-5.3145031289122935,-4.317037671537869,-1.6908110755199912,-6.849350654853518,-1.689758779808841,-7.8124262535959215,-0.7574833484445787,-7.900566893899088,-9.174871327651733,-0.6605016152262833,-7.571786445785069,-1.1788476665627279,-8.426328587937979,-0.9986033996407584,-5.901866042021789,-9.348744335683246,-5.989389695227252,-1.2485126064760466,-9.64127024109376,-6.168029185117312,-9.602948845877838,-0.11039474401976168,-9.400144404663845,-9.712411074750591,-0.7925859842028871,-0.8461103895111965,-7.47454672158036,-6.058601005297717,-7.861193419189703,-9.77129422005249,-9.958549966396424,-5.533008651649918,-8.133958827053007,-3.5613097385854475,-4.254622709059223,-0.6636404311540645,-3.921122597145721,-2.75965734918199,-7.621289549553573,-3.694338194542639,-2.942698271133335,-9.712233369687105,-1.3559303820802238,-2.278411403638796,-3.532087541095217,-8.933384895575053,-4.322479042211302,-6.144347713097962,-9.96313581112873,-2.9002211833988767,-3.464970169986845,-1.2398010166170148,-5.22233241851837,-9.307301014092813,-0.3662120648289413,-6.962582812303015,-0.5124931601445648,-8.00657279335198,-4.745834071012935,-9.812469274139609,-3.140134194370503,-9.796004932682044,-5.816216780518264,-3.716996361330338,-3.6733669736326613,-4.782654485526308,-6.176842477922968,-4.31554901846833,-2.9972421116877856,-0.32782021769584446,-8.501325967153967,-5.0294030828733804,-4.4045058309886524,-9.774107624217939,-2.5486703067924954,-7.58893183318796,-5.971834468929098,-2.320053109640159,-6.728094176709258,-1.3206238506029333,-6.779078138135066,-5.864858001435733,-9.795065908102936,-4.450000622971315,-9.227285399583602,-1.0989787325407896,-2.999950024907625,-6.4400138975787025,-8.931710582070064,-2.326644287279871,-6.9010889375667706,-9.015342763415182,-6.495127677072796,-0.9535746869923001,-5.046039014168231,-8.279750855680382,-0.33852981678174743,-0.19921688365699408,-4.346930824197979,-8.737499048000936,-6.26949808602923,-5.354011603076508,-8.661118779741525,-8.154241437321074,-5.093935515788894,-0.8349556139254233,-2.5294395091873434,-9.436845738202722,-3.1078608387057804,-6.0280986973345785,-2.9236116555450464,-0.1032215235427425,-7.318088681795598,-3.274062034832974,-6.182522212427813,-8.865039944694036,-1.4567062911462236,-7.664027615316751,-7.880146794949907,-0.3664248518512192,-7.3800945351902865,-6.3631235087602045,-7.851753571815183,-6.802568384836634,-0.9817723808572842,-7.683555074017998,-3.0808325876013676,-9.623855231688873,-5.286504269828136,-3.495639450848611,-2.8575583854344067,-6.768717430837469,-3.0839692074420078,-7.860697218243793,-7.375620535910448,-3.5634151980578377,-0.7132866743302291,-5.848197329427212,-2.711850269643139,-2.6041200027773037,-6.3559765354479225,-4.245216934611033,-9.160896011099007,-8.258941081338689,-4.74462307833913,-6.51795203833212,-8.30456939864443,-1.2169466621493297,-9.39185754936317,-6.180045430665895,-2.296030448144355,-6.876128261681416,-3.462534390249643,-8.297141060130581,-7.144123439745902,-8.739289153363117,-0.6259674162939377,-4.256008421638997,-0.4104570071630542,-7.578278430262275,-6.306846799900132,-0.7824647870319112,-8.47872828235351,-8.800950109639034,-3.74476007623336,-2.8317692227498137,-2.509548881707988,-2.471324086480575,-4.288311159922591,-9.25532137900885,-5.191405686863179,-6.921667360589017,-8.075632847657335,-7.433711943443488,-7.7888075051299355,-7.398902798870736,-0.1872056176570025,-6.155412567396105,-0.559466724344726,-5.746792913721944,-3.3024345308714653,-6.372133247554153,-7.5735496818367665,-1.158834630903376,-6.54906121104421,-8.314194831547649,-7.622755928346612,-8.760289117629176,-9.231939914959026,-2.930337331953523,-1.6931308112526144,-4.089768336886895,-9.684316301484774,-5.635180162090205,-1.896614937909813,-1.6123690031075721,-2.3550592548338933,-0.1187786941660951,-5.393524033509385,-3.139659665013792,-4.762993506880589,-4.193331284038888,-0.5372397134233742,-0.9221287822965141,-3.921265998561525,-0.3710608694664552,-4.094615216948472,-3.144649890895681,-5.139049316187789,-8.153942003664518,-0.2357480684940727,-9.933773087310094,-0.7142949887794137,-5.407939166990776,-5.648395709567762,-2.9773339900135953,-5.905142890242841,-7.358737932615044,-9.218570643130787,-1.5725634928505539,-4.957066749692805,-3.4442743736983594,-7.805360984981533,-1.9742209578048775,-9.884564913781988,-8.681222385022132,-1.7917449581912126,-1.4931846179070485,-5.355134560205032,-7.763151730018938,-0.800890757529289,-2.271640148924121,-0.8485548722706793,-5.672657617453645,-5.151226903638535,-6.617613199826091,-8.06699322106332,-6.55141457210976,-6.079802272364969,-6.534919347836796,-0.06875405489350506,-8.863815712591677,-7.049527528412051,-9.917964218555447,-9.835566064343073,-0.6616682904664817,-1.9983403986697823,-0.9789807921070115,-8.65596288019687,-5.633921755871032,-5.02702209397391,-1.2446205255789033,-2.1636274692081003,-8.824911383404416,-8.488774235790032,-3.0379925833437182,-2.55813991878284,-7.049621785653349,-4.012056464140965,-0.021804327208487795,-1.7384071657820765,-3.0744657520336838,-8.006077102101672,-1.7586223557593894,-5.4734482973506005,-4.240832011691564,-1.2451996071729243,-4.206528557495419,-3.120093228192,-7.16921762585798,-7.066471695623598,-2.5431297835072675,-4.415993216452634,-4.375886806909042,-6.00186955503712,-9.583029364502417,-0.41754686828746834,-8.646518905580345,-1.4156436281998053,-8.7247253071013,-4.235391588748736,-4.121966530584233,-6.142032904146895,-8.238007567366987,-9.244827460458511,-5.095131276458655,-9.576653365195371,-6.423487065640563,-2.491757635373044,-7.819388675056061,-4.149802312187754,-9.920174752964538,-6.372010185566457,-3.9253533768940763,-9.781588642620136,-0.9964417097570721,-2.4560414498068495,-5.919152624147818,-2.1917802270443554,-4.760276452055294,-7.245949656677442,-2.552723728963169,-4.907062284424823,-6.394884828608285,-3.881905214262895,-5.520079668989533,-8.307175697030065,-2.7358200532160337,-2.53946882608741,-8.555023057236985,-5.000238141633602,-1.8205703902907011,-2.7727814572746556,-1.5487866338221212,-0.972425207761749,-4.835160218393703,-9.418842268207388,-6.629814453978781,-4.641351000647404,-5.226846169355392,-1.9607968954772392,-8.46554628117383,-6.822188095841217,-1.7422064417261152,-0.4484826734427316,-9.723761172481657,-1.768240749652903,-6.006513453323697,-2.561238424999761,-8.186095426534393,-9.775436223775777,-7.494544537863581,-6.403081779475803,-2.0648590085530993,-5.900360321411638,-3.8083025797877146,-2.2632484047372103,-5.74423380353241,-2.629954840034885,-2.6665610300231557,-8.679552147251457,-5.835848920121545,-2.351810599468218,-9.81591000073093,-2.2053440457692797,-2.9136708035526726,-9.65075384360979,-0.14664656673401,-4.74607047168184,-4.605749938232431,-2.893482439154711,-2.4599604603563807,-6.349462739504601,-9.82142002677101,-2.6417395820875034,-9.989294116358458,-1.433116832448098,-8.056294912882318,-4.243550671579992,-3.963618954781516,-3.5046001079188827,-8.897078995731638,-9.587532182338272,-0.7001108419771018,-3.562512657990624,-2.8555355035649477,-6.7737149289468075,-5.654729188410023,-3.1312253669490597,-5.842005568530579,-1.890331232810658,-7.503579845874054,-8.186436289179742,-8.91693860074957,-1.9915304041226856,-2.103985957838881,-2.011913943574213,-0.48380067789204784,-4.948927368870086,-5.051617225379794,-2.410878394998901,-4.410062670974444,-7.850891681703358,-7.402645025914176,-8.205861947995972,-0.33395699090104314,-3.169049901310501,-3.839970400312611,-1.3092964223796377,-3.946191617954735,-9.685089452818277,-9.849126374371028,-8.778355492359944,-9.835208462099494,-8.617982677998759,-5.405529415735824,-1.436322992063097,-8.881949634935278,-5.5915526490296426,-8.85291607167693,-0.46064993697154,-0.9657503609959073,-5.068138705525069,-3.4673118281769577,-1.7011681594034744,-1.5963916926512423,-0.4825146641114686,-8.102561809762145,-5.244908383379787,-9.04107314967484,-8.343800754398867,-6.0145920398736745,-5.007478761659899,-5.068232425924912,-1.5457816482736364,-3.469790661250376,-8.458942851594042,-7.591389215889985,-6.588941441378049,-3.8904658033757777,-5.309949078205576,-7.499623571784621,-0.2290630560327256,-8.45470481706483,-2.7610098338411415,-9.902235623176608,-6.461120683511796,-9.205948198085387,-3.9360314778383887,-0.9580747274848389,-5.079365007610761,-9.527213476260952,-5.48441582605453,-8.05181098280325,-1.6845457710304101,-4.35810777291784,-2.00521235541667,-1.522283129052311,-9.523568411808208,-0.7250686105382931,-2.205037387244495,-9.768585477737805,-1.6030881665259478,-8.264388078992608,-6.637443148797313,-4.248462026278497,-7.983952962473855,-4.851007721797838,-2.7127993867188893,-8.054219974409412,-0.49681153242472575,-7.618298525271419,-6.446551253878054,-4.762598596843861,-8.214140425412461,-0.4185593856938885,-2.950640519945713,-5.044587077294098,-3.5208427698497657,-5.388388213603131,-3.1007124328884506,-9.164720277609838,-2.254494060044938,-7.391265020085065,-9.152373989994336,-1.0685558436564735,-6.647255055651802,-0.9945218050846028,-5.892575638783335,-1.2548673753625494,-6.985739884167361,-6.633799198773513,-2.688640251752228,-5.046654492283061,-8.051156124758425,-1.6595652490734514,-4.2145215209819025,-1.3888384768785245,-3.4731868709012503,-7.629914541028542,-6.369155396197057,-1.47640563934188,-0.3670103105183786,-5.579728445209701,-2.5598328239646695,-6.255635742114906,-6.461320796690591,-9.755513042527028,-7.778955856998293,-8.614802034386289,-2.456438128029612,-6.248333660928194,-9.595977520229974,-7.483014740659311,-6.439777078392419,-7.795027065520063,-6.3439840136789805,-3.7642965872166934,-0.8738842198602503,-1.6991985335340232,-3.5165355588518254,-0.17556184624077042,-4.688618379341385,-4.838627065846632,-0.9494419259108766,-5.22310873715506,-4.774452879423312,-7.817592477606235,-7.585494283889824,-9.306948137011574,-4.389770251390264,-8.966610865881488,-6.4519893249991185,-6.746726485642727,-0.8617710932589606,-1.5868754728988432,-3.876947352701059,-8.442198274748838,-5.293683815025682,-3.3477367866092855,-4.586616168961513,-9.17839676760491,-6.798632547003547,-8.842683908100842,-4.127674354014815,-8.38609821240168,-8.376762776491383,-6.515468734138581,-1.9161232586837729,-1.5344742309757708,-8.544013248329566,-7.820118798312854,-0.4006670570267423,-8.094283300166474,-3.3197942360274957,-0.2776607356112426,-3.5826109091139657,-4.01626993574181,-8.533942009739185,-2.2841815609252003,-6.394889430795089,-1.414823480888221,-5.789565912859724,-8.425719134790654,-0.09858662657022066,-4.154683609578349,-6.343033892660806,-2.2758482721399975,-4.128584614960049,-9.527388747708523,-8.99081233412289,-7.926068048380477,-8.752591347791128,-2.10962658062128,-9.28021020413408,-2.8672933868437145,-8.331049882916199,-0.5647191566109067,-4.386009181937238,-5.536287410267944,-8.973868273745927,-4.567320791155152,-4.709297953071361,-9.881683952334953,-2.3664958914031398,-7.4176712834967695,-5.985486423390325,-5.623638540307427,-5.311134179062604,-7.483630282592298,-6.2106420813714625,-2.6431497537573967,-5.974798855653525,-2.059792345750735,-1.7012207398090906,-9.842625587101814,-7.173178152690145,-1.2819383279504737,-3.1136174047158183,-9.243608546359104,-0.9373919915083073,-0.4179315542668327,-4.96425977034238,-5.813939595737827,-8.568773794420713,-0.929933077520817,-2.097035944867063,-3.4203901984957197,-0.4540565542200725,-3.5986050645458456,-7.354755345019523,-7.852424031923267,-8.174752495884249,-9.92573573630425,-6.756249835187688,-9.05723357677758,-2.1265196761805627,-8.529861972113794,-8.341705986335128,-2.865625290104943,-2.6537128263459997,-2.9063378594168454,-7.448116630231601,-4.241005071460416,-0.675676433106327,-9.239128498237568,-8.003234170742735,-1.504733449628477,-0.07449175412883813,-2.929373984265158,-5.256955707787054,-2.1890161520348816,-1.7355585632857373,-0.8327467233336527,-8.279068886107499,-6.090707008053602,-9.20421398489074,-0.6276760796283676,-9.821575000311714,-1.517076437513818,-9.133517858506892,-1.5013173213473752,-1.8201697249426885,-3.597620293998254,-1.0666522431226433,-6.3951251548725585,-3.607945257131957,-2.215497457425555,-8.881262621129459,-1.5636957451631628,-1.7534776226091298,-1.8331252693778088,-2.047801454397147,-4.92340373573083,-6.447965959343174,-5.840977451389769,-1.1683040747670548,-3.6612684126756,-9.32082530568107,-3.234493299540986,-8.07754666467002,-2.5039698494252383,-6.543897515321184,-7.5718441368595535,-2.9119998069326436,-6.835460172094113,-9.36376092017734,-4.82860814006041,-5.297816248355778,-6.368711851872204,-2.2312252643116492,-2.7535570410942656,-0.49165976212107054,-2.6774730775226496,-4.736731699093855,-5.546632797376465,-9.489078515328389,-2.2014029148242464,-0.5926267153505149,-5.325726190160567,-1.069762440506723,-9.510674670629824,-2.217016279733941,-5.736338833008839,-4.063570164660186,-6.067803887997794,-9.838228596535965,-5.574488873451302,-4.988147124574523,-7.7787239310966,-8.738058782645306,-7.597678484835568,-5.375582069637175,-1.721429942075423,-7.485465053528384,-6.000628242498718,-1.053554338200533,-0.18305250580193277,-6.83405056711128,-2.215669954937982,-4.306443650993181,-5.348767005280428,-5.329373958336998,-3.7882142282676345,-7.2892675519228,-1.376365310531129,-6.835099367437016,-1.1448239499729307,-7.86879272136386,-3.341633903208807,-6.685295372360405,-2.9263514574547345,-5.7188778133781915,-0.42108730230596025,-1.375102488273623,-2.8341092761161812,-7.465938673245873,-9.998609135307246,-2.7862734241963527,-6.951201468750508,-4.795470979973839,-8.784537646261734,-5.460774979800139,-5.337702465652468,-9.626251075451231,-3.644318420249526,-0.31329209030192207,-3.5254077156776042,-9.55449222691551,-6.559313264096023,-9.831710978502308,-7.612582541582674,-3.930140172757741,-8.058167067912475,-6.119221657758056,-0.6119009534529862,-5.056834206975207,-5.068734730443616,-1.2486138821660853,-5.30259007628874,-6.030097317222831,-7.1133495007132375,-8.277102961496583,-5.338834326276434,-5.917099588553773,-1.1464844788939454,-3.528336079038732,-5.522361000807767,-3.036701890050222,-5.481144142623993,-5.161019762457446,-0.708272346181591,-0.02340869576836102,-1.224558632627215,-8.182831479056116,-2.94474836904145,-8.516381209262317,-0.8287574413136234,-1.1965146788560221,-9.317790806167213,-7.794798312741582,-8.955550721955207,-4.580195718820351,-4.686311380616905,-1.5250881936844873,-4.877066538403739,-1.2384672681817088,-2.3085456279512506,-4.308475729622474,-8.473552459258368,-9.756791203704946,-2.2500254847001555,-5.42748789005077,-8.323103505172435,-1.3855803932659438,-9.560165342765423,-4.908632230235453,-0.7331644056741671,-2.7434965180744686,-3.856326978127216,-1.1063164262075964,-4.6957778939603445,-8.01235817079495,-2.401026428382007,-6.673544295506302,-0.30711759351577994,-3.1020596631757047,-7.9825251022339465,-4.268282494511205,-4.864799193875708,-0.7366584482774741,-2.5180285787123746,-9.161181567563656,-6.47442736772134,-6.662910626877096,-3.9824244461782876,-4.9963448497878655,-5.84437828835558,-0.052265469457932756,-8.046222845251949,-7.794669128097896,-8.434848719034509,-1.2696879890851576,-9.70470882916247,-3.477698120808206,-5.244871940464957,-4.70052572227138,-8.411285192855294,-3.410516986936707,-4.187155426985174,-2.964396488773835,-2.548521233693428,-5.040029598821125,-0.257666729432251,-6.298860324596356,-6.941638187973693,-7.030365160492645,-7.528292952735745,-6.478597048249862,-6.306458924899401,-2.9206897243997676,-0.9360108887649599,-7.089541522674607,-0.1635038264164379,-0.8462329539542668,-7.004956006525593,-6.508200899761539,-9.451143230998007,-6.1449505939886,-5.822424436811023,-2.2626176595565806,-6.073669438596603,-8.417148338662987,-8.68593743033081,-5.41224025998307,-6.27975109495051,-7.697877157912167,-7.218013562670825,-1.0175587895015825,-8.434897108824845,-2.11955616522417,-4.696943097437629,-2.621812402724222,-7.374266865398997,-9.555268229575518,-9.002826054078296,-5.152984882163187,-4.365716768664772,-8.054924777526882,-6.612563900038689,-0.29171870178535064,-1.5114827193824865,-4.727886329243017,-6.258905467561364,-9.255706295107286,-9.020680547798472,-0.5989334645848965,-0.11401004296177186,-1.5316000401217655,-8.146883369679179,-6.9686228032115665,-3.895860513497522,-0.8943892556368227,-6.563011082854759,-0.04997952229028213,-3.694058475980202,-7.982156383749903,-8.086848712132177,-7.199529951859802,-2.890649157536942,-4.7910162694568825,-3.0541986506127694,-7.4151067988835155,-9.538698097400932,-0.31215597085074487,-7.972657184800549,-7.066655202236425,-6.591668872909702,-8.155732199254842,-3.7368155508906375,-9.993406726232386,-3.9800561744577356,-3.131977655988847,-9.805700155994671,-1.1892860492768231,-6.153462725660299,-5.397610157427244,-9.434170835049894,-8.592741135496812,-5.809503321270144,-0.07527671626198496,-6.842198112799629,-7.397969105937614,-3.732603197665698,-5.032342052207872,-0.34978621735441084,-9.065697102922636,-6.980146866464459,-5.7368226627448475,-3.6575512081368156,-2.312309716340901,-7.01873958954261,-2.5971169705289676,-2.787038097906278,-7.336972035706895,-8.856960279838209,-5.944478202891457,-0.6525484158918049,-6.29305189276444,-2.441116339569158,-7.490680960321403,-2.0165656996489756,-1.6939476355347183,-8.729194364046599,-4.882699737133322,-5.714333309955113,-7.687229694346054,-7.284463317018792,-9.00767474370821,-9.152044830906812,-8.955220565873194,-7.536822668617848,-6.943454403379386,-9.42976835093122,-1.0364365801050113,-7.263361436263709,-9.486146241809873,-5.885659687870168,-9.945580708144163,-6.0942530702265,-3.752014839222637,-7.651764374396892,-3.3427354109212493,-1.9076506079764277,-5.054586921068392,-9.913333177297545,-0.269376135769146,-6.696547697984505,-6.458419467390604,-9.476723916276866,-3.852240995669438,-4.190802240926645,-2.742298709730231,-0.36766221344274097,-9.190558042375628,-8.321360384152596,-9.914733227178127,-0.358043157115322,-9.682251862071745,-9.483388149397527,-8.039607688341007,-8.763091053425956,-3.4170590487779706,-4.564448685145659,-0.8393012184200432,-8.6707306389761,-9.184937387423922,-8.513125327134945,-3.2664556337148554,-4.3099275476141585,-0.23520248012038447,-1.722590025932611,-9.088825484363916,-0.2405950996792594,-1.463480463321074,-2.548674887000497,-7.951800221630241,-1.1215059970420471,-1.235197386412521,-0.7935495094953926,-8.91453710238479,-3.730845501371909,-8.129444954702878,-2.8568545861989603,-3.771862451841037,-8.279937491795067,-1.0301304064979,-4.584841783687066,-3.6280284127612794,-3.377242151903692,-7.558213678426792,-4.223727457235762,-1.3746632995303054,-7.397047400353984,-8.996244443468324,-7.5535070257893855,-2.0027274926598793,-5.500796698774337,-1.2372021114248577,-5.362161485503831,-7.531639939589021,-3.673463487913866,-3.0801557425751103]}

},{}],130:[function(require,module,exports){
module.exports={"expected":[1636.1383556086244,1.6646604475696127,2449.873618247612,2.593588345298862,438.4458344557375,7.062996261426472,32166.95008970249,1.5849309045521418,2.5599377138462622,27.48201133571592,1.4843050597094858,3.2274897050731957,1.1658909572500642,1.4610270440520134,2353.9707801170002,3.353883844388337,482.0323935300514,1.2337308488533538,2.00983659137369,11.035595258082248,3.9464183053361275,5.441296373955871,19611.269409362038,1.3536890500257421,1235.7228013078504,3.2167614707896903,25.326141054588405,2.750099803842638,6464.55751680054,2.469493684963191,1.1458864142597422,14.669747005832031,11.04578878440333,18.05716502845117,6.792834690940318,1833.9849243750668,11213.1686979105,1.000268723980246,5.263730241990044,1.20245862239431,31.158056743545924,277.88637950405547,2.1228126711164035,29.896462805629962,149.66786340458668,5.4722760067124225,6678.718080174958,1.4600867369211201,77.90313120924407,427.64923151485414,1.342893869478607,2.869611513790059,1745.9914474888087,950.0290997110575,60.0154913680422,958.2237140985517,661.3993116443406,1.1950540557571423,2659.7444165203924,1.3062893151658106,8.41422903333164,46.07031514753024,1.1876720303631756,6.2577596755599725,2.983408961216844,5.349010283027072,7.3378016968629645,61.779070942562065,62.46559844192608,73.01168944251798,1.1174829927370233,5.817441696917645,1.124784812254068,4.191140128217543,6.6653672150688035,2.7669052428640866,2604.323472888909,1.7436079061481713,3.1924969135296006,1.0945239850868442,82983.2784131052,3.1619941094531407,36.702916743994344,512.363222085519,6.654357833581383,1.1401507764661931,972.172047536963,461.69224125466457,329.99005159355886,57.07298480221919,1.1021324324699064,9.777918925214236,10.37251426630599,316.5148391025813,2.666986457010797,11.991689977359853,1.3378712678984632,2.011407246701253,4.920760273967102,4.19807316765315,1.0189095083407866,1.3562349589754128,89.7792858888348,1.4280568249119672,90.9374514094859,10.196624934590242,2.0810632639623847,1.0009792348439532,1.2905146956028868,50.98716162462541,907.7803131800216,16.582598227028733,1.7587145987663488,10.99953099819321,2.2438431563424026,19.302019591629882,321.67133678248746,18.281209537606486,1.4921555469713959,1.1691667181386975,1604.3075032865381,1.807288600874327,4.97623172227085,3.3296534909183966,3.243550357933097,2.5560527150844914,812.6142375993608,1.2902692729474086,47.53599279141267,1.39972781134968,33.089829177962876,74.15827690061026,1.0388006012149353,9.273923879772742,2.753910225189648,35.21548555761388,2.771753979406423,609.9532226242129,1.1197959076032002,1878.9588640714776,42.44837215081461,1.8554696920629996,316.78028107949893,1.6496904607635685,1.0494020862701139,1.6483020433249083,7.977713224168388,1.6739081980968775,8.612359423523364,9.995509768727315,1.3596378520918349,16.50714022449387,7.1904061555007095,2.2503730457802296,100.43281532537424,2.205716536326242,3.013163462057112,2.0926097311754983,20.864147241393773,1084.4581160155844,2.9761498219188147,986.481086330593,51.475188914900315,2.5353960453949487,1.0474868317933324,490.28693786168185,29.491727767090463,9.71598789506327,440.8736907565377,1.8106085842711743,290.1115058214603,10.058328369859048,1.397208467706277,2.965882895993381,1.9236526578415412,1.1686875992839392,2.1924104247149185,6.404187123288032,10017.470280363197,6.492816881987071,283.09860484273054,44.780805953709915,2.261084618314548,101.05591798603093,10.851318861847357,18.211250253055354,5.239649888663489,2156.631778811744,7.422191875142387,6.13199531664448,1.360887295774903,33.20025350139844,1.6755265331899627,14602.64208243437,1.5797689022346622,17050.868580972914,524.164911197105,18693.799782591363,1.132156141163017,2.9413664364919407,56.23073684147706,1.6065474181690318,370.85752650928913,3.3498201693377294,1.3565449035932495,1.7785213628387213,5.0240706579971475,13.628725035448275,2.6787596456930824,20.19370667415137,4.248023945902739,4.130285997247113,1.7532001097457806,3.719941128578374,72.5643638393839,4.8847163068464585,11.92554402497108,2.3236887577274437,6.836847368676156,1.5485727420454616,7.621671206067462,2.2469177773290063,3.7383764225014073,1.8622415862065749,6.932362740667613,11.060269895221987,1.0899733442112867,2.161265466283584,1.0428003840985047,403.19447745124194,344.2103565893118,1.0176621447205756,20.111873081980058,3.1937175758064082,1.323843747999325,1.6449950108806124,4.164992919518351,5.412602446587956,15.691217035907828,1.269416613121805,213.13436646941423,589.6152382975325,2.889195529648991,2.3280408162618595,76.676708047762,1.6669121114955945,28.98258533849313,2.2062800755486864,2.7251592181914606,5.480523809018439,1.5878478056295593,1239.889865725253,1.1102293925341027,25.6401108331154,1.3808166989295334,23.48317074442275,68.11354006241179,3.2911968423601645,740.8858764998337,7.335472528921313,1.3815402181805398,5.61174111381115,1.048050830771103,2915.021404088383,308.1947605155563,12.790891786866535,4.654108497823864,378.09395431379954,256.8537939363629,68.55035001253337,27.991911352217272,3458.2641070939158,1.0879095376588346,515.5833675230456,19.578999071640336,1240.344127456831,41.060958686245776,33.41298469193262,7.743360065213694,24.505625168408184,3.014988826329796,6.613107261522983,5860.330052392187,2.0463031309436537,21.86505481982911,3.235538139101945,22.233187589184805,112.63992238781444,2.0782325131872255,8.827559238087215,1.3636723455476838,1.2157338072278856,1.5310336745573268,2.4509785022137787,15.959116708540284,1.0060961542191538,322.8190804020621,268.32912642265853,186.45797787146637,1.2209937344970756,105.37118798366664,1528.4443374705193,1.1194689265179114,97.4944725887237,520.0609926225276,1.926179211019269,10.813758994892272,38.0390112278372,10.649622513790398,106.18030120752861,38.2119621338008,3.3427069245683043,15.576227375443496,30.09729006404607,1.8442219497707155,107.52055808374043,1.3893183820288817,1.3504708202624607,22419.212285183923,1175.5770053728947,23.451744539172854,113.92212502569177,10.830845321774888,1.0094144378073775,1741.4161162889739,9.668104859919845,68.88352385894689,71.0815602998143,1.0807571123896809,8.929726459502605,1.258339777297864,1526.981620195416,37.18595439666337,7.383119180607008,1.9269262374483176,2.1920999114107174,496.5926847549392,5.74080166637339,1.157771915051375,1.0863434441743247,1.5362921509270255,2.7605086325276704,3.588329838326297,84.5176721530653,50.540975876581996,25.855410721249985,1.3203938894746838,3.145716373863323,907.090652393495,109.86913564190135,3.3313598355382696,1865.2150833025023,16.10161548940129,1.6904855276946182,3.6841266254485903,7.040685195513421,3.9552052500914114,60794.753235933335,11.819956012760539,1538.2702373102295,34.19701881057236,2.452154478482675,12.430960468515607,2.6276681537592284,21.58542342713572,436.3287476718296,898.6282973722493,157.27390699780372,1.307603132903724,30.61665980748953,1.0565547332957133,9454.310173457332,4438.77485470145,3.2756635188356635,2.5820240874152875,2.155940048972839,1.9936095969552299,714.4464781227025,72.02845694569864,15.734206331808329,14.181823870385308,1.4163984863705374,1.290872135480379,1.3112639917090398,2.9190689818171727,2.4586292431152414,196.8277276880358,13.88588305986251,39.85587789604271,6.709851283893606,13.952287945634401,12.67037163048523,2.0998500351472065,1.0413644073446262,2.701914707541711,15.20123545659748,3.308565316314704,232.9861800574197,1.0306986084888683,8.241348491240874,13.095356228296406,97.19497405611871,4.555673286137218,1.3836671355340444,1.2895923117381818,93.23120133924681,105.83866257725036,55.6996718295256,229.79462368337778,1.0048120161098881,1.0166882819424596,2.1463845989025225,155.78480106295453,16.635916673608577,165.9019786630591,1.0863145250272128,2.538172118525637,1082.3951632601163,121.51032936440807,7.143944047076666,67.95400779806957,5.597772950510329,123.49849262329988,13.606287251212088,1.2488470115587456,1.6999840951883012,433.94573846375926,6.639054618618544,986.9870385591043,2.0487139604883673,1.0048697869541279,299.7577204805658,1.0024165026731335,90.14516761420691,18850.93589764076,20.046760232896464,816.7811067675531,294.24217149762364,2.5466683466182083,2.8806968090673566,2.2045853804316797,2.4945231950679227,5.164143553369267,1.107279572612248,5.330377544112773,1.013383710973203,83.816922077399,174.68416688767832,70.30560409163255,59.190037099176834,2.396066718945905,10800.718441333307,7.7533497268054195,94.57640701014462,1.6046162060657672,1.529255992848217,5277.339601914451,5.211324763756653,5.293481215349813,1.095000157739012,678.0924869674895,10.410713611884201,2.717313871712297,1032.3141947548718,4.437356096125093,240.45346673165048,8.71674103692292,2497.6386578183187,18.52982313878398,157.12413422592857,4.779143139274933,2.6944359128671294,1518.7814521326568,2094.54591567967,6.8154514198854095,6.503827198776948,687.1832824862078,43.086114479542196,63.222974728681905,353.7619466718038,3.7247084290994974,1.1192824270376238,1.4271930246703262,1.2451982964269335,7.9551935487316285,1.391438345763447,9.781812960360691,9.726038926477411,3.489099107855982,7.26319819086094,8.522441519757782,4.785501296677968,62.05210439928589,16.034176674066725,2.1747434174399047,1.748499932680582,2.051959212390785,138.7408240697922,68.79109203209552,6.112766900097607,1.3802154068504657,2.056789357534519,4.652029554238897,5.746303015789662,1.2067698190814609,3.114940827025409,2.7946552920512087,7.663539408882827,238.37577494715282,3.1382443401627196,1.1940662133541808,8.60298759251729,4.436209840292793,48.675539353897655,191.28437685909932,5.627378927542905,3.876298545586308,59.939741187690714,1.9660122679742407,70.75546890221231,2.1038598901536205,3.5579481092232053,56.13572041398104,3.0273683040831254,4.867018906874698,3.442923386179929,13.529693369925127,1.0377345696792946,11.273615908586633,2.1035673658677982,46.01251083213592,2.759101459176668,3.1538753185959156,590.9725860913554,37.22278607511321,1.0993229686114965,27.94463550622251,23.53521349283409,1.0207154045491074,31.777306034851346,1.4552837494477682,6.754722751194308,502.53293263007055,6.158986341559438,12.211256399912916,1.3421045980825654,20.974664130864088,212.12648635699765,4.505235420997707,7.007255867650214,29.735872853025977,246.652296447152,33.38968403634446,4.936246765439147,19.345381639905096,1.2268611717637299,33.042152723877784,1.2352675407510239,35.575760909149025,2.6610433459431277,3.778637851689736,4.511548386998873,3.838583621010193,2573.9172241522547,22.54394638553259,115.45192751300358,17.082153452590187,3.0869887794339546,14.453416944788149,71.2929668101949,25.826766096022162,3.6249240249348413,20.385807563661224,1.2353738654051107,2.5398952617532258,2142.2464681991214,5.188620193275511,17.420022980854483,12.416297785683442,1.918330739126149,1.652138112214146,22.802643609168015,288.92740574630824,20.149376661794538,1182.3095947371562,2.2364141842932166,10.706715584785242,1.0133773261465513,10.951204880967829,57.09065694717475,1.8524087434093908,2.4341993136708875,1.4673530610307508,280.7771463686301,2.0397136596314147,1380.1741575263816,2.9429992929101836,2.411118820836727,1.6161531466188257,23.36852146450074,2.560356966697473,32.79255811299851,141.7272086835347,1.183978747593076,2.448179486585711,55.04876680321272,27.04226790894701,4.230926587491624,1.3655161591522689,179.3864901961038,7.61819669573364,44.111331245994045,416.3234425348582,5.1565323861406664,27.846681400032335,1.3300344206049612,1.0487954193158153,694.1702672679971,3.5551974586291752,109.73936177423809,4.197452131625998,15.119377705228215,67.68256131131437,2.47652565397138,1.347039397203503,2.352718229168143,1.5861651051745034,2.0449900773278284,566.2491452028594,1.3908682819182163,49.670286775320385,20.51148284145617,4.4556342328471255,1.7847567898016574,1.2657613941627521,8.073449161653114,397.1430267933936,993.0463069659922,9.915683141170977,20.77805315545712,197.00997991955222,28.845152103461825,3.888655755841898,7.106661419401173,13.737834863663752,26.685933737802127,8.655765154321754,24.4226089151504,2.7756220392869566,72.68609090315418,2.4408235573772936,2.4565513518443236,15.740532920591587,3.1160128573540122,298.5480153064978,1564.1412428690962,3.109398210240615,42.42517534189033,17.548901789738714,435.60893651623604,252.32592600788544,2.390344235165929,5.527328628394383,3.03373173919809,87.61529632867182,40.787069271440764,4.716424910082058,13.477942801027568,11.701153747184303,5.1430830795299585,2.099012717705459,11.822702455118753,26.910611267898922,1.6571084382687753,53.885893997836384,312.66056876068757,445.69166992577215,198.00267175906535,139.52280639284902,4.871532099724714,1.3209899241245415,396.9706295948027,254058.67494998168,2.3258306003858245,2461.228436251757,205.2603737798376,1.700751798599701,2.8793003937377293,10929.971954630018,6.153262148790814,80.80623914225265,6.576092101038212,1.7434753094127167,1.636863315194845,1.0014536373532625,149.4543601488012,598.2331757643882,11.42281221509347,1.644684265883483,6.670184089573422,2.4329731029695205,1.2039533940435043,1.3797455177650142,1.4202341364559623,214.75122172690678,73.12310677098799,16.44605434205464,5.67844377189342,1.946003820229831,19317.58157461403,73.3420917267412,78.80030536384002,1.3096902971521538,2.478927354320094,52.58885704110743,5.422563056542705,9.324257244215154,9.331234118210126,2.268963512041664,19.967843191307626,3.7118776945961574,1.7433985186316698,1.3427834946549237,91.49080035663425,2.3575352360147925,122.00122934996931,1.1943560652198961,819.6517858791387,144.00569435136072,321.47899207397467,11.814794288321433,2443.012519718601,16.25935650863109,1.0171370082308844,326.7929323126415,1.0460464508775897,2.687544757283101,2.526826076275853,16.356433477853265,3.4729395128299427,406.62819822963036,1095.5332400323312,2747.0158419724053,91.84352767032583,2.9076007546280915,325.35067711810643,3893.3493773704176,160.5302197364711,15.687863932568568,4.800617234639535,1898.0695208570294,3.3015192501344304,8.189915103003665,1.5360903645359276,1.1727910841013534,2.5330159191334465,1.6148692769542963,1.220672450586696,1.0240837320396525,2.0652701153751862,1.3713197026016115,6.219314583386517,12.326697508421827,1.869765116622845,144.42192812579424,1937.171865535091,4.328996790669867,3.1067875962850864,14.108319355436462,1.6438239590335049,12.753143816544991,110.12301042267767,2.910408708078088,83.1985720252187,9.032821131306678,4.07329829410344,804.3750139628479,1.196424505419066,9.899640445103243,1.1045789031125708,1.2028209431017336,6.45680913615666,1.2913572151956327,1324.0837096260414,6.319377742028849,12611.09505666858,21.720346250426743,11.220830486819658,2.6727908705969514,1.0254922861715938,4.726864054501757,265.455543965576,1.4142736839344332,172.62191935559218,1590.8793672662594,13.418635251337575,3.0994292584039407,76.78261904353475,4.099883347134809,106.64704685794106,42.20654053951416,23.11228315378353,59.83524978245434,1.0816097118420591,934.2678054394418,7.114268065641696,3.1231273325168134,1.8645249490554754,1.0669878172176024,1.0425112015209732,10.801181010984646,31.41864277784544,1001.166787000032,12811.247321738574,15.46106061155287,70.40666459048205,3.1809649994354814,2.327535591405756,12.213012692877859,4.75985486211828,1.4987052846624251,2.2194809118524454,5.519690498655642,3.1152833449469854,20.338330265517133,1.477778473085437,485.85227485281877,74.09931640561742,2.853332632598249,1.876440862978705,4.768991727030236,83.14920222314115,2.9238622341942895,16.67396894354545,10.264711418798496,147.14554140308152,109.8179471928042,58.63596546015189,4.4420172280593615,4.4729115414164085,2.4771769922687032,422.1319768466357,801.5536533607778,1.3317851983096363,12.23909176508736,2.745388771962307,1.8411812360734943,130.78958439941673,3.644437240512408,723.7072458515999,605.6808010833014,1.5470581234677143,24.419961291757406,79.83912103344504,2.5972665536836477,23.94893586957778,12.065488386167269,1.0261042918553527,8.086903346434898,3.7941002891953706,95.79500410373882,1778.141762406616,15.735946412802512,1.0177917137639845,1.481525337779959,66.68922636940292,4.018152572753967,1.0445415983877686,2.999589588468714,2.9626055374479474,2.2958840454985494,3.5309058313406947,52.30821772222368,122.78028570240028,1.6031177647111718,12.028000349354972,104.57302195526333,33651.45788507005,1.986879074401241,8.230928219608384,2.4506251234077614,4.191821701599216,3.4355493409647857,1.8221314542056677,1.8724466962378894,696.1016630599993,2.0440586893909707,4517.764167380001,178.0526669893526,2.2268784965574735,1.5815097998898011,1.3276836479731988,17.649926116447194,55.700878017857434,19.090808169539866,28.222336005333965,6.410762610853906,2.197660017398359,2051.752399562777,1.00172875929152,1.6101630843169001,1.3719843271307117,103852.75955243279,1.2286252486979645,26.615142865179404,970.1376074124267,1.4511771158561482,7.126660157676559,7.503699703909758,1.1495690898120885,1.9528163328406571,2813.811233085535,1.9501423055266798,10.837067669911335,1.4653937257462701,32.52033791723152,2.1344408939432222,62.68870743046262,4.908751380526359,1.083696484864982,22.246717139437777,80.27425331673219,4236.832407280403,9963.25878214621,5.196014432098347,2.2092971718542227,1.3413398896251019,32.6730476846795,9.70511585798632,19.131702816017285,1.6094179295042397,45.80199195934098,1.1819378691260678,6.230013511838657,1.742710356341804,4.243212087476266,48.61783178872881,18.28928220640003,324.6758633660423,1543.3259418731427,127.42774597705838,6.533027485425078,3.0503130044750586,1.3699077675226274,2.6425810060745456,6.937726710779328,1.378334065411191,1.0892147578911382,2.2627094439109663,1.5040291427023533,37.66801243556516,1.5879557654226544,80.90584891799588,7270.740744657708,3.0866518029010717,3.867086215016934,1.119944633844924,5.083846613757703,14.321864841996012,4071.175061521166,289.0897887041336,29.14743568220295,3.1822958002016644,4.709371268866226,1.5802819433243809,16.69332690548872,11.747005529157116,2.323632776518833,33.50703066229524,2.48811742005682,14.176694980617853,556.585536264968,5.022460658653192,7.479223103266866,1790.4494166735392,4.3048059885103935,1.6949836742044173,6.806368046990605,304.3917674473911,812.3975274846916,1.311268413333601,1.8135070912188063,1.1413623448763868,260.8905244279132,1.3912784891204903,1.1932027313855151,1.2653317679774267,11.690177373659884,20.177115618252294,3.9706083750935717,2.704507483614712,11.198346284799884,2.1913679379643685,260.3768531547317,2.6548809476957413,6.702353791608876,1.7851870864512325,15.802882605666145,1.4079603655023611,668.7722391243191],"x":[0.9161023637406491,0.17702999938388286,0.9769395639801468,0.8718489985212314,0.7541359776478129,0.3521891983328933,0.9889375234099496,0.1594357333671652,0.34123064883952314,0.7128467467974318,0.09089012093848803,0.642835571916788,0.018814311089015323,0.18621196686816877,0.8155090744300055,0.31938527743376555,0.8932559134627569,0.20966797837359774,0.18384683762528709,0.5725445073099191,0.523212829443302,0.17371662685842226,0.9234207364949465,0.07469605333309448,0.7108031572377835,0.3024670601140653,0.6377136650355295,0.10718703104540195,0.8966514599486102,0.45911184686551776,0.0634170993670744,0.8180670188048136,0.4383220437874735,0.49720603922836326,0.6687123495748608,0.9816017523484328,0.9452245180984706,0.009199405309135544,0.3175107511901971,0.11510731251848894,0.6223479815746458,0.9537663793512576,0.7501438235693807,0.728889829764489,0.8490804607266944,0.1989090045610875,0.9662372518901539,0.12313148806673735,0.8418319155750154,0.697488789590266,0.12935455725336387,0.8535093765478159,0.7824108514489425,0.8924020992332897,0.5975620939721644,0.9113379041547311,0.9387685751070616,0.05309760426744825,0.8267023934630733,0.18502371965124054,0.28489796714658877,0.45200197528371766,0.2528860487495861,0.22844770364054812,0.26565110972688344,0.36127189298806495,0.45105755198779596,0.7914355763858438,0.5535259520525013,0.7341712101429525,0.07236681959459212,0.5375979467360243,0.2269614960119295,0.3590708148440014,0.9891818453992471,0.12269578691764904,0.9407337080420424,0.22504138110853855,0.36885261632497013,0.13060988139176022,0.9709159007000225,0.17410284194923809,0.40793739271841534,0.7816500876816825,0.9397968473756491,0.024598443580743368,0.7602251070879955,0.9782787755011526,0.8258730371921499,0.9813215451565402,0.31806155097840016,0.8869317287948768,0.5785995041075829,0.5724854220752182,0.5937233235214299,0.7274179010684452,0.06243928651135833,0.2833040913734881,0.8576757422476224,0.8609187854409275,0.0347451247282653,0.500728116370319,0.9007282606560407,0.2835417983078561,0.8225252792650146,0.30806581286953527,0.08653911068397901,0.0012055962275601129,0.08145469722275833,0.8138440425492202,0.7032263727887078,0.7898482127237803,0.16109214647815473,0.8930167762355339,0.4865693987851831,0.4441735168054721,0.9945426732559022,0.4076215461828685,0.5255154418420409,0.33539465540575364,0.7231565252922874,0.5544672301859976,0.29757790689681074,0.17481662306706536,0.1557111699593996,0.22252210460085986,0.8670553258802163,0.028196645316054703,0.9605304822131495,0.1378295787701418,0.500439752514477,0.7911126493817144,0.2468978657950902,0.6941174643005616,0.14554544324940855,0.6374395158956268,0.3154344810832126,0.793667938806526,0.02420646644524216,0.8838286854167277,0.6582409803257894,0.3784477507271875,0.6587927977912473,0.29883904521516014,0.046129398716684644,0.4656208628400831,0.3493526715681554,0.44656854041741934,0.9257859469406331,0.2922715473666566,0.03173518898937444,0.3015040244742915,0.2027533767590386,0.6073987249781658,0.9726395759312587,0.31136683898625805,0.16413157361663533,0.14758437899625276,0.5940066894922009,0.7589661492007322,0.4298580718968823,0.9835755953708074,0.534288341885991,0.2541750125443232,0.011433391582138963,0.8760036460945009,0.531411458005906,0.7168197574502717,0.6193890892108957,0.07003377857302251,0.9697067177959133,0.30273556358860776,0.0434261342780673,0.20454749160862562,0.5020282193438954,0.019169320139607482,0.5556431545309448,0.7443471218973352,0.9697060270300732,0.22551493921505372,0.6763166777142346,0.45863763452941986,0.2140437746916104,0.9645887620600755,0.7221621308565709,0.9708125694157703,0.49109794917268745,0.7391848257617795,0.697791746691049,0.908908778740201,0.13364496078967036,0.5621314323126378,0.7151391775684257,0.9724485315008204,0.09558197581043903,0.9242519205434334,0.7774373735181732,0.8813691964966457,0.2228531626029291,0.20736446296386823,0.6039309269959623,0.09072053977665884,0.5991432542554169,0.7222752792498996,0.03877571232673094,0.43016501373556104,0.24784016200960646,0.7887157962220122,0.2900214113871127,0.9230238884332007,0.923071121506577,0.17708673100241556,0.09261353500890035,0.14331113355086122,0.9153278726717577,0.8484473119592535,0.9859907876796146,0.5897763208156652,0.34587832288298537,0.11033700843353378,0.4441689555438324,0.11219373552236989,0.9519725101537908,0.5944291725592343,0.5290854681734376,0.29572618408934703,0.09676088222577772,0.34748335374919903,0.02374881826601216,0.8018791703827957,0.9117437466478906,0.04098398734618591,0.6490417231798831,0.30762330681389227,0.6522256213079596,0.129588917105514,0.338050140992014,0.6386171996235068,0.8338771774422258,0.10903758987057066,0.9157102718021042,0.7600508473503065,0.1887319528959106,0.7199644625734154,0.9276008357537568,0.32640987504919816,0.43521307007114074,0.3909762530091079,0.12399820472145429,0.494743379328364,0.07891332956622299,0.8332098120791016,0.13752081070947875,0.6185681018406235,0.8915009060254504,0.5321524492371612,0.7904940002646599,0.2852988417385458,0.8101688961036217,0.25604768023886115,0.1649468668328793,0.2715926520651235,0.13256707105512922,0.9266005082976454,0.6762671376727594,0.9981089990527434,0.37554667878289205,0.9567833426440158,0.6951643576970068,0.8114258562524144,0.5338495299040522,0.8786517929033715,0.4660615345641099,0.6989986512199962,0.6401315540780124,0.9857725560595625,0.42848275583329154,0.3452862894320581,0.31979557994506513,0.895995422677452,0.16457299680862203,0.539471682229334,0.9089384388663759,0.3939883140985918,0.5663673976278203,0.6885199392158043,0.6238149660912444,0.8229615966910608,0.6556821534438426,0.4811585401909575,0.6059149940541495,0.11900610975377579,0.0851253112076793,0.2286759517018513,0.3570777114081296,0.09168580114089564,0.7295043473570826,0.7536349114743346,0.7701882417590444,0.3047249385224773,0.823806495861136,0.6751058850081766,0.036058273646835115,0.4995652213799291,0.9548342814446014,0.09278056352375219,0.48610169488185906,0.5525933602897746,0.9817481656017566,0.5611842141160144,0.4299119632107047,0.14645631884278099,0.3513248026403515,0.9539904222979141,0.2038744152678258,0.7089999714312705,0.2426703167068851,0.5177578670521432,0.8561712400075583,0.7535901849706166,0.4048182466834438,0.80307512660757,0.6881260410153469,0.16959722296796143,0.9362466722829423,0.3162358669510663,0.9020865210614324,0.8523236199887287,0.5949724696246779,0.5776194432088939,0.03738608590356307,0.8397487648384527,0.6408078631131782,0.7565529360749654,0.2205950272760031,0.42464001412663843,0.9833684740871507,0.17347857936039857,0.34366085179069494,0.368174919836608,0.44326599544804135,0.384826305549576,0.6362947177088578,0.517501111719022,0.5559858079420794,0.33148033085134765,0.14468743866577194,0.15108788349903723,0.9378877712108953,0.7456123698791668,0.28351483653285947,0.7655695255039683,0.3520846449574182,0.09529479410183606,0.2543407066741734,0.8270053267476503,0.42060595161114156,0.9906131226733728,0.6266535944992966,0.8635036851450928,0.9908935257987619,0.10054537505407524,0.9108011636949069,0.13487775113509648,0.45265835636275575,0.962791960319255,0.6436751206195097,0.5587030172470062,0.15559727093464049,0.3265609957047064,0.3593044705305266,0.8555388450506916,0.9585228683416505,0.28523300325355105,0.22374230574795884,0.0816487784197466,0.07108773191295881,0.9390239353438798,0.9064348983148054,0.39004254048975073,0.8400262784564765,0.05442691193896598,0.08932780482997082,0.340631700510746,0.5038385435439443,0.4979239423741628,0.980615708747516,0.44693720078194676,0.43698747262895576,0.21966508631503578,0.7971172261417458,0.5908844932508821,0.10105477658618711,0.042193215611838086,0.11877875757873402,0.42967667847614743,0.21618170904508993,0.7472677667299565,0.004283941932005986,0.4909858125132658,0.6959445765750794,0.46047915308443876,0.35033888680511716,0.03305170408483349,0.053787678155558405,0.7606602971771528,0.4651088193431747,0.46548705486451336,0.6149911152678094,0.0802641805935671,0.011036976609927196,0.35156642362679436,0.7870336151144806,0.9141347042301728,0.7060601008701859,0.20989150306387883,0.1996178009741909,0.7300183718997744,0.5214804931038626,0.9208500906696442,0.5546457879874356,0.704137600247936,0.5030637622950995,0.3680098927515194,0.05941737788418844,0.8966134732309423,0.8612821182887704,0.3205818970588916,0.692257866379361,0.8909246663147046,0.005811285278679579,0.8528775087831102,0.0007623822777687028,0.9556611673485038,0.9808229469433496,0.5457660681836265,0.771462708095503,0.7741080797151902,0.7710290916074651,0.1347338699075762,0.27234941436408544,0.1124664995818574,0.39461601623004516,0.01424770380140683,0.41131314792611695,0.1392338488911422,0.49386294213344994,0.658473852258457,0.48568164970488903,0.49977260523929345,0.08740543742847051,0.9854697294092647,0.2983111780198169,0.8978971375285028,0.30950425784105695,0.2608585011152751,0.876323429482377,0.2583563934609112,0.7182658790633889,0.011071711188683775,0.9456726089673255,0.30101109131381754,0.16444014819416064,0.9852051067675249,0.6714612399615896,0.7043730079644543,0.425765627127612,0.8292428527532163,0.441495268837341,0.9696092552121078,0.5829607672101791,0.1106376180542028,0.7003994213464197,0.7686374389335418,0.7591210080373294,0.2987707858753168,0.7135007352630494,0.8365259479188447,0.8148026407411226,0.7826522431142544,0.8354759251175323,0.3264119913781971,0.7210382843925227,0.022205385736088212,0.2926286423951574,0.3500167808902246,0.44432827646056317,0.5963460912566094,0.12755632892722546,0.91867468738362,0.42049539345970577,0.970400255656169,0.8485468757358166,0.8830090675425277,0.10103822046637978,0.9306521344638272,0.7047796246138762,0.7297436861093047,0.4926221461488145,0.2014497784938094,0.11483474775162206,0.10258489334792475,0.1585305336732199,0.3212230034418755,0.13507480377616332,0.25338533077439385,0.13251134524756747,0.5767282656749768,0.7610990970441689,0.14162599349253946,0.023444102637352193,0.3328093341216505,0.7919719652805497,0.40775365452407764,0.8209073309085064,0.23844896906631186,0.31897013554086406,0.9909550336401016,0.12041376184465391,0.4376122999548955,0.38205124195680873,0.1543457355363549,0.3814666812430858,0.5168356136301129,0.3897701768842834,0.42096525360424475,0.6278656778245499,0.16422289910943277,0.5378085054051653,0.7231755352993532,0.3790977109932816,0.13463794411366425,0.7546647068780059,0.920810242100861,0.5109640046398118,0.12056157518339772,0.6133521914111915,0.4931681508438108,0.007369767449571629,0.6905028454466904,0.06017254450891141,0.7927513492524314,0.6530292348610189,0.6130966603322432,0.7487252154795947,0.09799236370381981,0.32089502515668444,0.5858257143143055,0.3890033304170255,0.31284168580686234,0.6617238554445288,0.9752455962696731,0.5645613028137388,0.3508594606304609,0.3301658834743344,0.06510834052742309,0.5538034797161999,0.15542294542810753,0.35528394025333854,0.8319967376145867,0.24773957183201034,0.17717115361239721,0.7463477501461808,0.8565324031511761,0.5068220108912338,0.5147431722220808,0.4641702085931436,0.576572289831305,0.5158615623530327,0.8107174872987224,0.6742260647551139,0.4250337008840739,0.4109825968883072,0.16690847476194715,0.37452373039979303,0.9607830137575353,0.5141575910522771,0.31288572442652796,0.3620539313524034,0.1318362529656627,0.1261546560857676,0.7450487546677296,0.617755898059954,0.6237643528539787,0.7367782405358576,0.10074789414820873,0.7749194575237894,0.008189006252184772,0.787809457145014,0.4355803430626839,0.06908281554051654,0.19291682452874226,0.2990688853018679,0.5756793886101557,0.23673235336366938,0.9794631789692589,0.392284803740097,0.13982036647590013,0.15639595970266718,0.48117268884173336,0.19546726365089362,0.611910397323348,0.6059490547991526,0.08420911985577662,0.22271296631053428,0.45834451333814163,0.5935692291834396,0.39004730747384087,0.0796534121493595,0.8243191402450429,0.6944420257658348,0.5547991385629345,0.6808547919700056,0.696590529912317,0.7391364254678676,0.03661475408361081,0.0115230461931346,0.9850892084483507,0.2543577695162762,0.7742526333984352,0.35870074124019324,0.48254447956513835,0.5231428785201135,0.13360437490811905,0.10607952809086107,0.6770142885819799,0.3123078361288263,0.17758917054443613,0.6728283143884333,0.07592006630189485,0.48936927805272146,0.7007539104801126,0.16405649415690737,0.12497037731793381,0.3726919798790138,0.4237230500377944,0.8354339017555383,0.9311921360540316,0.33310252876973356,0.44443910415237364,0.7569858634412978,0.462198783256627,0.2829279912622489,0.5659006485245988,0.5312684820204143,0.4517916861701883,0.4423664588149654,0.7300698780596395,0.2789654899371017,0.4861014471701752,0.09538817273372047,0.15684632496300233,0.4196220074399013,0.5360778939216242,0.5701144219489451,0.6961028770106283,0.6342216641692142,0.6766097233517772,0.512888411306575,0.5935846952229142,0.6050300508521036,0.5151569084348822,0.344179983491788,0.7785767180594669,0.686679230359347,0.5054581679696386,0.36566548103779417,0.36463272681076164,0.7372650085385202,0.49898860819118096,0.7308451698263014,0.7745989258870716,0.8140105006809117,0.2626183545278524,0.4926090463901318,0.9878819155132299,0.7124150686949617,0.6608639132447454,0.7584086921635853,0.5617098549922375,0.07178929898418973,0.8280069843377427,0.9845708992788538,0.27794637087438634,0.8647519595818804,0.7836579872504053,0.13717138697755793,0.35447160443627657,0.8694168593299207,0.2135377845581623,0.5604564888998353,0.7341975818272546,0.05859988098649538,0.48434990281165446,0.007679808179987813,0.7411161512894187,0.6724083836846177,0.32094318086516616,0.05072173904867561,0.31847439897478425,0.2046413829871081,0.029238016087599572,0.09716960042291056,0.26043033902512147,0.8221682339285594,0.8773339244123273,0.30897140653274957,0.3010454967598415,0.2001362053435647,0.8730016751356722,0.7804196441944551,0.7672233077493436,0.26491004224370296,0.825519776163858,0.5112367598611132,0.5109914205104142,0.3679650304430637,0.3962483013710776,0.09941931126837344,0.9209432220482106,0.4287905826053058,0.7197914853667946,0.08753577964994097,0.4891441576463076,0.20521837748817617,0.4801008861961209,0.23444614248331597,0.9817574847743276,0.4994758307194169,0.8911417793630445,0.5209362575208196,0.8273970894332681,0.9085161143909792,0.003752939508908426,0.614695533098562,0.09995561229345751,0.6326557852543804,0.5492590304215046,0.5407169701200794,0.8217265659495405,0.8747828233199426,0.7919339536884871,0.9913816042448818,0.6899266872478127,0.10920496577307603,0.741709705004705,0.9663615212869838,0.4966111509164288,0.31662354862541053,0.2298465190141905,0.9480238528036453,0.52234421008921,0.5038199959630796,0.18927500363041116,0.05347428640621077,0.1763809395949223,0.07313181464345697,0.2758205578910462,0.008977648505615221,0.31457984939452377,0.095863294254658,0.5693462747156173,0.6315574157146298,0.18299288293519766,0.6742850874095181,0.8587691122301484,0.1564249471196384,0.4607508748081499,0.39143181277906813,0.09582047623023704,0.4688431453730806,0.49781357456298436,0.4182702252163737,0.9018072993319901,0.7383716318060567,0.4446952222066036,0.7719226541128268,0.5050051159353246,0.3056961408484322,0.149441321874195,0.5816756926282911,0.3748237488321138,0.06740594975371228,0.6832443186054695,0.27835866141759835,0.9635523912679036,0.5448182868981073,0.7576289826417719,0.2810575589276658,0.04481506376197708,0.15614117517742288,0.7420133791902315,0.25367821112732436,0.5519612134595735,0.7369224187614389,0.37406696574228815,0.14301798429686463,0.6976531537298858,0.7224426575875134,0.4659368958108663,0.5031718869233264,0.3320740227775225,0.9507132319539247,0.017034800382478066,0.9139614028234082,0.6452884319299825,0.19100267906963753,0.07877911794245973,0.015335232053574677,0.02210147749923297,0.9410495163754122,0.5079144888775644,0.6525900754239655,0.994529071732704,0.9806801913264649,0.9380142975775803,0.15352564104243793,0.9359981688350982,0.6373601196296734,0.6869162311957102,0.46483576087768586,0.9633779803174651,0.6378223156264167,0.1259478036046553,0.8548374674773458,0.12750640758831322,0.7998744877776656,0.9735746089699147,0.16098768441394018,0.8330414964536941,0.7208731439140257,0.5576974741566187,0.3578851170306627,0.8123289545317907,0.6696966180203943,0.7478801790621261,0.5651185367643958,0.8154220741380216,0.28014961732126076,0.3663630311022297,0.45952136744861316,0.8370462131141074,0.8012089921757648,0.6327986613857053,0.3013338957974061,0.1518081215890077,0.7433219755367775,0.6513579363296809,0.14697831045049625,0.6459030468780882,0.8806614672344855,0.2317997992128571,0.989748424683323,0.45300696092910164,0.23189012606518666,0.97874229038757,0.573609653330363,0.016427526671799697,0.5327657781078063,0.22474331738966424,0.4659797287083156,0.8846490907297562,0.279971272923885,0.0044011309512075325,0.586961339797353,0.446501626981088,0.6317393819707613,0.04192216177228403,0.2032374388935798,0.5566358845836799,0.750140540883647,0.4185517910111245,0.4100792976882779,0.8853043819048374,0.053867439983098064,0.4970775149207223,0.6433673098368431,0.9620256006442065,0.252898341363744,0.4740664743652081,0.5474018328730825,0.6954875825756925,0.13591024396423568,0.06903099549717018,0.40672306587718876,0.672297776419809,0.12835116059405438,0.8257595413729044,0.5170375900929933,0.6138385044021124,0.4169524549035575,0.17151153350351644,0.5497686522838705,0.6377132810312873,0.886049725683661,0.6897092508297991,0.7578492683899238,0.09990173912357436,0.8153009088736516,0.0040757697711670815,0.06380598443219032,0.07213309869445261,0.9884049701592887,0.10030327331701372,0.4825813999154551,0.9969538278064598,0.06983872971199578,0.8510264097173523,0.21010733471118992,0.1819456592037696,0.10524219952836211,0.7898586696656438,0.5342326163711977,0.9090696098029909,0.4099661227447091,0.8086075098296086,0.1407103925620785,0.49738045537994724,0.9318027296501739,0.14263789777887426,0.7253965405384981,0.44199676710738234,0.8942810911973715,0.9173157594403802,0.6863643133324289,0.7061429085389446,0.8708021771460155,0.35847107708439885,0.3025903707008424,0.38279539523042394,0.06639621841295984,0.6855847045703019,0.7947690322875054,0.9393424493676554,0.3602270437848898,0.7295108985452672,0.8491573960134637,0.9077087724534021,0.5460338809655683,0.9278193378680482,0.7633217605090923,0.4565565256044408,0.16444165305501568,0.8045687060458602,0.4468178532181697,0.3319665675896617,0.8033941929192971,0.024223123304266014,0.19031519056593882,0.07466217888145299,0.5313474929301487,0.5159455402586091,0.7143201399742884,0.8897054932299853,0.763638714837606,0.4199442624353964,0.021285319386848522,0.7810628119887066,0.6162544937848662,0.8442349720805031,0.8679862317144769,0.45400254111427096,0.27724001053825353,0.1861005966671676,0.061684903943660885,0.9603749657456233,0.5568206215341382,0.5378067034317284,0.4137045060761755,0.09771737602202002,0.5053390683463659,0.9142017515094965,0.4067309939834982,0.4858423307898767,0.75761199084678,0.16562770829469176,0.35088067908910525,0.6406501804118472,0.8391491533158892,0.6985285979440288,0.02799978408862347,0.1889931544372545,0.015570244911077058,0.8544355127354264,0.06957970736797825,0.5922447989821509,0.03259191989345611,0.7526019275428812,0.6723771325733914,0.7679601584868152,0.16408296129450228,0.8373497761959485,0.23529293890604586,0.7120161206736344,0.9065594312675742,0.2252416832822619,0.22378069198498296,0.42171759760698113,0.42493666256478035,0.8016229536019275],"s":[0.6319340238459048,0.43689592525665,0.42469406982298263,0.44708428583141147,0.4975300135450873,0.7636205372606226,0.8745602831094701,0.500542013480521,0.10805335611052036,0.8405120790655147,0.5059675894040956,0.6276908199335627,0.3430159603598113,0.42985139846146136,0.783281837407243,0.11850224728257586,0.9560388603171115,0.4983574425028776,0.06469326301031231,0.8365169930321963,0.9314443050526187,0.4146882077734093,0.7489447631450143,0.14503748692684137,0.26389168767746196,0.7799459969547655,0.7735901452510154,0.5721625651405737,0.5986209205037101,0.837601906016985,0.49823337313935556,0.873546907573099,0.2807294463549004,0.37532297135502746,0.00507366559316158,0.7519441936173223,0.7877945866904519,0.39129683885514854,0.15845557815119382,0.24822362373714602,0.3885446385042637,0.06996941272374291,0.2562405252935305,0.7498728576246596,0.3642715545118802,0.5594052182098352,0.9774732903375314,0.8735537345322177,0.9576616023633646,0.9561824644065429,0.8375353302514832,0.5150575882422632,0.6478520140896977,0.12920912576183707,0.35975928066594176,0.6210592557005987,0.8195708575926621,0.8751020467399055,0.6934622982764,0.19906919002371182,0.20884918899756721,0.7642686975213684,0.056347425605364876,0.4112660092504876,0.9113818119616002,0.7567425036947912,0.19195942376582154,0.3508799199238821,0.8230190040901069,0.36369887561889946,0.6642308545728401,0.2917072093686637,0.3373968705964121,0.08599311083800387,0.1940662246617766,0.2315540819534343,0.06437246377029426,0.8474283513862704,0.8916224638800438,0.4720217893129772,0.8664265441886312,0.18825707653683343,0.5294987955209378,0.7002093845068607,0.31989218205428616,0.7291549685323913,0.6636646343841786,0.3118410410716601,0.916253656642207,0.012056178315371424,0.22582521966510427,0.8833607909684962,0.9353802273101981,0.6266119288092304,0.16542780138717839,0.3879083614555263,0.7099454770741658,0.6007346200388606,0.7291559508044245,0.6282207132444566,0.0073857709461104815,0.28044055016153946,0.5082423530745395,0.6208474527276922,0.9695931681374339,0.9033905580263131,0.5403891574621071,0.4562100255582837,0.44133066782903896,0.29469860985356067,0.5592221227077847,0.2653581193640977,0.9862240338753758,0.4086062643475845,0.7910639043657075,0.7328511162657247,0.2831679882945204,0.6676940648586049,0.32116340042281344,0.760233866036069,0.9388969407414713,0.44397721745989416,0.16863150629323687,0.7375450217353099,0.28333520348646646,0.9123976116728241,0.6856488265380183,0.049939123882140724,0.8994064554689136,0.3174879470600136,0.25353736855772,0.7466882504122649,0.17644804706423733,0.06468719564313719,0.6918434115089505,0.39727343732935316,0.7844564900586515,0.6825015243531669,0.9423149197014637,0.5386954392434207,0.285483744626565,0.3434839154549363,0.022051134850499032,0.6206531231180092,0.07744693872212771,0.3016488926296239,0.5768150955602689,0.7740375306184328,0.10123837820235604,0.9530672237469879,0.8787538737337226,0.030312211261266597,0.45645230228745204,0.6551415541662855,0.16359078874344557,0.8221443543876643,0.4274677873894597,0.32475125008065264,0.08880924990646877,0.7626217190462836,0.6882838048502979,0.23432857039565613,0.7249588273915644,0.7340383897634304,0.16452232242722853,0.7560526488328838,0.38553963248534084,0.4723615867405173,0.3172219165829542,0.5189477004926384,0.864712163794588,0.43390286158847324,0.9356459495743741,0.7430716066496681,0.36001500397585007,0.571875979227807,0.7528316838913884,0.7737247014057553,0.6183748802550975,0.4646701053699036,0.429899508977273,0.40313762478290216,0.06244568496159397,0.35847167749281916,0.17602937573211053,0.12721491124503514,0.13613292320775683,0.9369891636195353,0.689463164051078,0.9279029830694145,0.8963320932855514,0.41959422263442514,0.32782814907942504,0.8437568760044498,0.3716716941814422,0.9764547986552117,0.27032297774136915,0.9824614076236964,0.9698044736572673,0.5927612547299299,0.0905353938459239,0.5610828233749987,0.08085109423607917,0.40192714044096367,0.1873137996580807,0.08297078996673535,0.5131660839752901,0.8182423111572197,0.364051922882906,0.4228568680379008,0.7986688907183537,0.7020634285057059,0.34252925538945367,0.9993908531373668,0.6721853517054808,0.2563433502720962,0.4923302811677104,0.8091580065565696,0.7923195831348557,0.9418227604386964,0.5254928899244931,0.7644968060894739,0.22598457307252318,0.5353272379951113,0.5399852799177078,0.17963174476505794,0.6697037003470301,0.3909783987237385,0.8340776861302786,0.02340325151086975,0.0678384929019793,0.30207923305724527,0.5609318748693679,0.025939991917615313,0.3876295410963986,0.9628674531925632,0.3494646997689017,0.4353690157553012,0.21130933553032327,0.5372531011511876,0.6080590089841647,0.13680950133598535,0.10843559926789981,0.8494400395408708,0.37746600203474157,0.0010574185724363527,0.22940538152997925,0.8095394802993241,0.6487970315233149,0.36685323286655724,0.29479719277628447,0.5568073496970276,0.5285153518757535,0.24457821945581015,0.4406042263666661,0.5944067587413613,0.8160639754850196,0.23813890259042703,0.33055464393507616,0.10322613501751565,0.2143275004535934,0.6214096175334891,0.47138165679103183,0.5774514469385581,0.2742895174988933,0.673148179451476,0.9429071177016333,0.583145412330389,0.3420345478915252,0.7087726427239167,0.14379390057139907,0.20381069419995734,0.3598161074217485,0.5590294850687316,0.5242027102447064,0.8909580417247482,0.8517187010714853,0.6597088665433648,0.5402107009293866,0.09031977044414297,0.3965857429779778,0.8917037766196592,0.3860042207918528,0.24028793412360727,0.2449539621141985,0.8790860662014253,0.9465423947213512,0.4297350600736576,0.7297588902038545,0.0981380319130849,0.38291610317791136,0.27452170073418114,0.8202851003812246,0.015438177953087218,0.7017786090896685,0.6557462842926691,0.5938698892672545,0.5545004300929108,0.43650717218989077,0.2521193125983483,0.990966753835193,0.8621667954940042,0.1759976740326421,0.4309781452859778,0.15452895110591758,0.22669310482488725,0.3758609136252018,0.8652015075881903,0.08243765944369841,0.8287157084065981,0.5039583875165317,0.5257225094196396,0.03022636309532567,0.3400138366663539,0.9528156261139189,0.7910890358215152,0.6138012203804368,0.19935493638539126,0.9842410575237754,0.24914693661073195,0.44271807506474126,0.9031282041100122,0.7917694415173095,0.0900757071343683,0.9015903820625781,0.3890888861535997,0.6678460762260825,0.7781874397449513,0.17285572798271032,0.647096734203247,0.5015624340090783,0.954033294778228,0.174608507658486,0.4865025671608134,0.07346136118460977,0.9357048434224611,0.08099482526327484,0.7004005188775961,0.19671350412578525,0.2721111771331295,0.3238935786834236,0.099290201696411,0.7363664759862787,0.2557588497296017,0.37586734638165353,0.7337567975352337,0.2897237219678275,0.46616725604080966,0.9498366790479249,0.11288363474550045,0.44321933299568017,0.12011524836519971,0.8313295132505152,0.6701834325089964,0.08537360765622304,0.02287055689948647,0.15010871006249316,0.934734368136201,0.7077532454258568,0.9544527623838142,0.8183947762331218,0.4651850376519422,0.012162606679338328,0.6023090412262715,0.26385017463668814,0.5524259550222377,0.8050470665553591,0.8957164575623979,0.14519187865574446,0.9489278842309403,0.00629770688929332,0.8444392557505189,0.21129181273682818,0.176991844333531,0.25118671937976966,0.8502837803230701,0.8935002564314394,0.1709072073182305,0.630992464281205,0.49341299784670545,0.9151623064663523,0.8960736226131594,0.51246447611185,0.9574697480039036,0.7288522117401071,0.07478738340894253,0.4194513935784001,0.3980978537924824,0.8087764205856998,0.9872460727008527,0.8690124270373056,0.6457893681189137,0.6530083785045839,0.2580794783624254,0.16808509646663028,0.5883865986424217,0.49087814592621837,0.6158706896411035,0.10434870802494034,0.9509055786071965,0.7424363862033476,0.5434166583348017,0.3280035821560494,0.15739170635192967,0.6260412752701408,0.7064864130676021,0.9215557192537429,0.4073092110014591,0.8147977907194401,0.10008643676312956,0.24811643793633453,0.30548544167444924,0.04424243193310051,0.4990610631564223,0.97301711127846,0.7627648373491511,0.6130062390621982,0.3503659866216351,0.2506487729856728,0.5406030648017937,0.44159548625684586,0.9241030029933166,0.8027769063124892,0.6832471822232158,0.2220262605319312,0.4609109803015887,0.40793877172312887,0.569804787047224,0.9901101305282278,0.2770746362817482,0.23577528213247212,0.8411215257248221,0.10791744612126353,0.050036293700103096,0.677648930637623,0.36295366847124844,0.2397126300650263,0.2790736047895779,0.6984219104286209,0.43404605623328063,0.4108694487493929,0.9041128410426305,0.05463147449791794,0.21362994517083966,0.1613311779538087,0.4268808716205297,0.841196830111336,0.44783550757965895,0.07248459709845934,0.1659296678682023,0.3721419067412728,0.306286984889778,0.7861920790365462,0.9303920955480811,0.9861700591347939,0.40172271562340023,0.7227743293984834,0.7860178015655379,0.7692758019836998,0.5751865609154931,0.604333230319825,0.5662724220017801,0.9780718840303435,0.5733913342544557,0.02763070608770568,0.8679504395133752,0.6697082768836073,0.8380458770659283,0.6607718810256171,0.7556755729518425,0.33901463950244004,0.39976807458740615,0.6521551181316774,0.25332166850591076,0.4952295317614015,0.15924673627306052,0.2795338615060954,0.6248975888458039,0.5445521866585639,0.7525563294080513,0.7298473129740892,0.30177223361816763,0.18220680240743037,0.7515232559477392,0.16673519838416584,0.3850474932717003,0.7858141879890479,0.15652168900079166,0.014338303748736791,0.938591616798852,0.5154985456208532,0.7308257520539001,0.3622971728940103,0.7376692450484554,0.5090009490996887,0.034296586939610574,0.11443572495189858,0.37294199610693757,0.8561132658423223,0.3875573555274816,0.8851448899356367,0.9335558300196682,0.32300103694728155,0.440832435142805,0.8847149956364371,0.520822126795333,0.6616420521181712,0.897371218892661,0.313848542739404,0.11618726953996039,0.1011624049749198,0.22735587839595972,0.8515779633828291,0.8197011201070565,0.9379516517110664,0.7821322829915527,0.6201108110518792,0.008533521284545431,0.7505288570793929,0.4449901751590859,0.9173001073442084,0.8392085051235627,0.9620240879332616,0.21710256150074092,0.5466696420315054,0.06873741551410917,0.1366568595867903,0.30370446837178977,0.5578003223476631,0.8375208347239735,0.6681872095331651,0.0977628485321207,0.2702333188676993,0.4066596275817611,0.5150015130631942,0.7672820672514478,0.33439961796654116,0.23130734957094923,0.9550719437727595,0.07879737657764085,0.09666643802216446,0.45302380088812044,0.529622519125625,0.7801755948904849,0.5978875381430167,0.5218296043822881,0.9007029152953938,0.041290561393760195,0.4252322007532847,0.9168669237794846,0.2121968524387059,0.33488798910258155,0.1802561591586156,0.7332298139464097,0.04196740815681865,0.9908198006775961,0.6650065976012094,0.7156868406937713,0.5692513877400158,0.3533672915435133,0.7249590724194994,0.5239970833501459,0.8415967791128487,0.6179469997675797,0.016703975890021594,0.5752566981068923,0.3724349251522596,0.10731520395088867,0.4466557634883399,0.4466400540860551,0.06382389745959927,0.03814396833571965,0.9305215083263607,0.5500326353467231,0.9178541239714684,0.5805817260176374,0.5514149413141196,0.007686288777678074,0.29041878595992454,0.2818190111552099,0.4134089576900326,0.9445184805953544,0.018652330064464095,0.22310899714201238,0.03251706102092444,0.8263722350562308,0.2253466044178125,0.49499694462508415,0.11687588713093588,0.5387442989606284,0.08322246826484436,0.44215466089686073,0.9854028261442467,0.9880154099715281,0.0674582461542772,0.6410096462922814,0.8381360846949637,0.8903074079982403,0.6711876020408336,0.7880438601182391,0.5676199929538601,0.7441931844549561,0.9939182209824655,0.0017376389842378437,0.4264268530732225,0.8543610554627965,0.10438439443107006,0.06752572601944729,0.47395995978587613,0.323344890828414,0.8963497289381308,0.7262542243630368,0.7982828064028928,0.3261991498647887,0.9411803993479313,0.6346037938846687,0.6056925387106504,0.8863195986778778,0.5197780183588885,0.5215836585807136,0.9020491240070874,0.9465729697469121,0.4913045052654854,0.6772017565102899,0.23940275093992192,0.14621802451365884,0.20027520791422293,0.9610340114632181,0.39228402780078886,0.8177757433872284,0.346281957659053,0.9962456160026534,0.12829939018552938,0.5412801720363616,0.9053444694081574,0.09158501905222383,0.2857284461508258,0.07723998878377247,0.7549046976859806,0.8955988386278153,0.09098280966782712,0.5955229956790202,0.2858905241132048,0.5045561515952688,0.826218706647396,0.6186231602907946,0.3926933505425576,0.8943071521552053,0.7526882861111917,0.3753656771082914,0.16926119260116135,0.879128116003242,0.7590169203803274,0.9029298579042113,0.05713701865135312,0.8638226976123442,0.09036697576644315,0.8601588167628775,0.4443741428863557,0.8538678695568194,0.13870266987593216,0.46998940136618295,0.39419777405276335,0.16625197010920667,0.828997209093359,0.27133682874098697,0.7349536467368036,0.5589344573722586,0.12366023641213064,0.9083268277955148,0.6872686899964362,0.6515463388232701,0.345335767850637,0.3447950787494565,0.8102248541475778,0.7858326114841048,0.5159970791338913,0.22487973202220468,0.4655696845818873,0.11702131667716764,0.05953830430556439,0.2563577549365288,0.9678263254458763,0.07966326036151328,0.9905737419091121,0.19451512969461415,0.2577950861824132,0.5548852495105681,0.9815551300222007,0.6050985069055306,0.4274914296892254,0.9806875065000009,0.9103828946975991,0.9049852267577014,0.5109175357931661,0.7147795654975255,0.8574482152252767,0.9654151208858512,0.7497011541311942,0.6051686516662667,0.8668621783335797,0.8871447116409097,0.8668035412462374,0.6242014056650864,0.3663288929755353,0.9432513236806273,0.7837137440269306,0.7842455759447982,0.10662654456431508,0.9327842044743084,0.9626328431705182,0.18919558292043837,0.9467195706472318,0.5855987283218262,0.5873934610659186,0.9746259270858699,0.2898137993955372,0.38868949914452466,0.5106786723542176,0.1801225677523972,0.38817823967544074,0.6167647480553171,0.21194980841139355,0.14358275425189948,0.27000991293922794,0.8491634126027694,0.19536758954502909,0.3353775715133005,0.8968867087547991,0.41902671395973257,0.1537248497549264,0.04511230580143044,0.9468269693704625,0.10960608491223245,0.8252239202991085,0.2609130460328939,0.10968032049567622,0.5595737443990023,0.4384184571461762,0.37313146015030085,0.7282634104104406,0.7898410395225768,0.9181303509194731,0.6361440714732682,0.9125736535052809,0.6888288011770116,0.9025072337490945,0.5887217814561498,0.9822156485639233,0.88156701204231,0.6296287731702452,0.5657162372630036,0.5867020371782368,0.4297933497957167,0.042412365694392884,0.10651370067075439,0.21881622222718744,0.953103164570122,0.1967768932576066,0.4569767808618128,0.6279290940404798,0.784934700633722,0.3414810960020216,0.4359083277700222,0.4189833581604683,0.03822342572027759,0.3222302499788372,0.5237041238914741,0.5869738233562498,0.7960995736867154,0.0028319945544623693,0.21454168279075558,0.19936754733824125,0.26610650278268877,0.00959143551791275,0.22120939332223832,0.1642152068549274,0.31175307902677796,0.8155966406760091,0.637047319853866,0.2973583504420505,0.931463902964432,0.8203496904000851,0.9682953812712765,0.02033369300301424,0.13983073740228558,0.9932179174975382,0.4762443449610869,0.9952066900348115,0.9635757731358432,0.2634593254778559,0.6325674621511637,0.2544962452673274,0.5732689359174137,0.10082294025970673,0.08745840832769813,0.053153318917005254,0.40682126113928163,0.4499868600812831,0.9954649092623629,0.24725380852340817,0.478197225785884,0.7247190416972888,0.9406893023361516,0.05775925214305566,0.11528167095585173,0.09149519626740821,0.0664140119310952,0.477652215426394,0.5823049566147054,0.7979793182199004,0.5020574323211338,0.8335902613507424,0.2707940501126156,0.8375887815513896,0.5135380718220048,0.1424655092072129,0.24256047782004364,0.9432618860728821,0.061821338167602935,0.042116294373454766,0.046312573093936216,0.6047511412548456,0.7682341061549269,0.40946682577353033,0.31306550901082275,0.3994599475399838,0.3602792885730206,0.06956189778783428,0.04075436064425908,0.9063032674079057,0.0457782148713175,0.4603883476671997,0.14579467861919104,0.40355699781556975,0.49198272607897775,0.5154867970784294,0.6597847828975771,0.7193009312446332,0.6142153001534343,0.9667154598501326,0.21687668784648673,0.8746988475907493,0.1881740107465022,0.21729309933262653,0.3159791054034049,0.24688463254785953,0.162366142972042,0.5464741387957359,0.5166269621781785,0.5363978435211576,0.33498121355986354,0.7334204213184627,0.592129785382145,0.0016093310906160063,0.08789946093366807,0.4886276354413548,0.5648749718701243,0.8011829855838981,0.921842670259275,0.5446892135439823,0.013013554163327612,0.9577887239899512,0.667582901373752,0.630294912471314,0.4904513905489012,0.8998320788499117,0.41026238112371405,0.07848062716293991,0.34521626392721916,0.23264084082000558,0.71625925757411,0.9945457868261236,0.36345443592981774,0.26310664223877644,0.7736919137326543,0.9957937790019886,0.7022457761140808,0.6575444835890991,0.5602595400995254,0.8780270254218507,0.9682095853240773,0.5580999424602338,0.7078440804846649,0.2417218705338242,0.18844968657916228,0.37424413061675144,0.42597977020669364,0.45732509640899943,0.03591049064914076,0.5051953890365577,0.9937312547129742,0.8862794949391744,0.6850331068638995,0.7612957428273337,0.9544202940652289,0.11434579372995923,0.15162093503713847,0.001760952724578324,0.414159842871062,0.9136517753736093,0.838912350296809,0.9402939248993858,0.6196570184115651,0.9772582811525046,0.8061137847091291,0.13468696817405013,0.30422788254015454,0.44912576315982977,0.2579749379583023,0.5392906054600102,0.5370202967745734,0.644794483114167,0.11230310529401377,0.6491337982104033,0.05818543829354228,0.24526927405524357,0.09686733802055914,0.23545988505356252,0.2319769158534224,0.4156897157683994,0.845671001515045,0.8781162068775237,0.1872421343837971,0.12843043246330188,0.585549362419195,0.2921728347141226,0.8072926341769966,0.5408521518839708,0.33516382328145533,0.40109967379063094,0.8803553482934163,0.2933581323485446,0.4757775797049042,0.051470128306840834,0.29035250878388585,0.5208219037887205,0.7198944992154628,0.9460466261552118,0.9355445261599378,0.8895033184583432,0.4644444715150451,0.13876704969821496,0.13338073441037923,0.4308475477175664,0.18253614633386706,0.4541744939727115,0.4066743174250145,0.15240984094963417,0.5771451642626724,0.06906524233152322,0.5581120272613909,0.3947009932816421,0.48635878961938905,0.1737802729851048,0.8538221590566191,0.6255059327220569,0.20222669038268815,0.1955558890905782,0.10647287033570496,0.2672007974325701,0.1422302136261382,0.7329834336551604,0.7342667386825052,0.23451853045146787,0.7554776461638211,0.4216215347202694,0.15678845685333487,0.879825434195451,0.6873743722545811,0.9568618164250695,0.6211389394343951,0.9151216591038138,0.34934546913082754,0.4822150729174228,0.7365611685653497,0.7887426024974296,0.2896838697857982,0.18163486228114678,0.982473984332638,0.06094758754296059,0.9326298541483045,0.6477934700675392,0.28868011293156237,0.15538756975197887,0.376851824026468,0.7230733753228462,0.3228515820375486,0.6961054001757205,0.855970060906728,0.9383798178156817,0.9965337417787401,0.1793578686236701,0.151132896523841,0.2884684090623233,0.35988170450301116,0.6589439608434953,0.6705607100617892,0.9990966531739658,0.0012194491496066995],"mu":[7.390995794479598,2.8230337228566227,7.6797043189045455,0.7905991058688322,7.743804625820092,5.204383731711046,8.587001664570177,2.822721326441806,2.748128505152563,3.6918315312022787,4.307019063259769,1.3811849233267925,8.154274332167713,1.9793481723818873,8.545738320879746,3.7815193749290144,4.8994573815242255,0.9158209160511532,3.795663436335912,3.47637552495093,1.8082004568263454,9.702389159045122,9.653910959418152,4.051625339540889,9.933622499129019,3.5544142388044264,4.380440185768418,9.380263988730555,9.195204519354554,1.4107482776395774,2.121442906507276,1.9926334217841046,5.422993485044467,5.703043771238885,2.8649828294789725,6.4818529695971865,8.616938455747489,0.026890109715556054,5.217690293265709,1.590038526350388,5.368329572613291,5.892298139720394,0.9214359068665479,3.905050478884542,5.707098235236665,8.44227639379521,6.17641526234491,2.9187634215794622,3.4062082977557306,7.4185219911793965,2.129377086198434,0.8356252257242924,8.946172167877165,7.658572058973463,6.7229671242185045,6.877661151965864,5.539637597912308,3.2889875823276538,8.795041803804597,1.4320215974604134,7.455629858984636,8.0210467588316,0.6788080746215774,7.963572295559354,3.7444397973670718,4.292592088000797,4.3911842224338615,5.0456786388237855,6.804255743532268,5.680497820036967,1.4823812689385218,3.199555519131574,0.4755314781328024,3.9864113919186317,1.8556293082005415,8.283914131507453,8.353999188170897,2.2013702116682587,2.6462853622197713,0.6435932163563707,9.905275893089625,6.602046991822865,8.640773927188405,7.274274890007117,1.8534993485572793,5.3105505338486765,8.443315534380226,6.109536572268633,5.527492608579241,4.121075959364426,0.2790220314505998,1.0324569136503103,3.110912008145643,9.66999604703001,1.6253868428593266,3.2300970417214603,4.610003551490536,2.296920324965692,0.9775977580342587,1.041048582095907,0.539150103586512,0.5433345335688444,4.579798624158538,1.075009781816163,3.733576795637128,7.112889659668107,8.427160479978495,0.8114309601424319,3.104971198647637,4.712321680069012,9.303186990142407,3.4627151679222434,3.24481200753727,2.428121472645277,1.1331757336661985,6.257466314744735,5.670429988111851,6.822285730858571,0.6715653258488219,0.14002095575129214,8.927154046811836,0.8838722858319703,5.378515286862209,6.723452612914804,7.536162655857995,3.9084428825006134,6.955543634256212,9.038226742652586,2.064175847392873,2.4169411116742356,6.939103375578426,4.609613081512018,0.14152792718407747,3.2039074232838427,6.845196391709969,5.418047912867041,2.905999882295811,7.399991166160344,4.638861094544822,8.070593594150326,5.605106983656574,1.559492102446376,8.740018510233769,1.4835594850262823,1.0448773827535374,1.0031386630201355,5.7504645316816205,0.6947681476360379,2.3101523531334323,7.428280593292877,9.640363981027571,9.298899524140008,9.66010494424065,0.8816678808443013,4.695974687585361,2.186602623038698,6.670746192892696,4.977698231721437,5.106761246332501,8.379732478348917,2.192002630151544,6.9188211926219285,6.889238279308405,3.432356971890689,4.057237170205346,6.080152841294351,6.236378217860723,2.8982337887049625,9.72640259906073,8.44577195566162,4.104086625758652,7.530846176954126,7.639620073786677,5.127808736481296,1.1949579829623036,8.121504515617593,0.8611851879208254,1.6595643904204116,8.79540971466593,8.214834121517711,8.136211839371338,8.165269401101066,3.810205316308337,4.572549307436848,3.2645879952624113,2.9633142717534477,3.3575618637124682,9.068629016057807,2.278126163716443,0.09819496173454345,2.128177068992716,6.064966989923204,0.5929233933015365,8.242680698737285,4.762422445198585,8.117983358200968,7.95957216877764,9.009748025514497,0.20674252133832338,5.08233973009935,6.663909439924747,5.1787806318389284,9.867348062976983,1.4761952516194898,7.861987767936562,1.3336417802058453,6.40529649330178,2.2787491765455914,3.334060212268375,2.9694471485189644,0.323445901431445,7.8650182677192815,6.044330805057663,8.929763391430455,3.88755044898631,1.776246827280783,2.0848257887905874,0.7386470252824506,5.191379458451935,3.802048217970977,4.367071989035476,7.107603036835086,1.3039532047645652,0.7558256613318726,3.398569169111869,8.111264159852693,0.8188876413010293,2.13001850155486,1.7375291276292315,7.480977002492695,6.399772104740682,0.42103864071425745,4.27229517665374,3.774359260897906,0.2653883201996554,3.6422437721949863,4.152198003247804,2.439914954831821,3.2396811957598803,2.1360167166897814,5.227332554642466,8.36999393057561,5.617962650014623,0.17959780194808816,4.451390498519256,1.565432675046785,7.697940268014363,1.5876169756255054,7.9989693246455795,3.3278146302140943,5.848050574770777,8.088745543042442,0.6970718534766229,5.1832948100150915,0.06122905123510991,5.61101471882896,4.310098673535714,4.148796337903917,8.00691924394705,7.778131141912359,1.9469437785487353,6.176752701383674,0.3055088395157668,8.04250118078638,8.389404784668288,1.6513407105117017,3.5208529211968287,5.59922895157122,7.845220398321424,4.446388376398531,6.223108462589244,9.213208750610235,0.08059734035561483,8.555305685829591,4.3457455389542865,5.196323798437533,8.13448443878231,9.910867629081348,6.24540040219411,3.558172926278802,6.663177887469887,2.7329268976733645,9.312594689731416,1.779870882532979,5.390540766283467,0.6911018469571739,3.915830088003409,5.479312240229335,0.4905167970367774,4.518693808382464,0.3631037067720544,1.626736431724265,4.909348457989687,3.9202497045147733,7.462001591266134,0.0013586460602477146,7.466280143526058,7.01450217769202,6.537153109948157,0.6233066837713785,3.774526928080617,9.916767717357814,3.1279409661134916,9.012531415128752,6.511993261351654,7.057626605591604,4.783551758931579,5.8441535177398745,2.398503652990782,7.626652670407921,8.291710903234117,8.173155041210903,7.8148776881672655,3.3804768457017986,2.693799221103088,5.772627334955249,1.2034754813902415,0.5463297682379298,9.692369343505138,9.303252404260885,7.661561484217579,4.529250915139837,2.666637569466226,0.052987209211914355,6.123402761527821,7.095346709485668,3.926129923799775,3.9796192765393523,0.10118528855628028,3.3724278466470192,6.131017880732097,6.992150681632319,5.610499039621255,2.333589929573958,2.971481754434806,1.2013956180780805,6.302127193211129,9.93318653962092,0.4043768678176396,0.1799483192986795,0.8916371948462576,2.6323882630829587,1.3927312934374392,8.51781130033045,6.9244332842403615,9.512600876809445,1.9009105949279181,7.531168214884687,5.001890476382633,6.28692591511707,4.152411902260262,9.819073145219102,7.480571980272885,5.438885799960569,5.124062933570633,2.3592556175164425,3.2535602050082324,8.560352597711102,3.3866447124809196,6.649826977706301,2.035025153768717,8.885201344702034,2.766782043800544,7.082096132019067,6.734533827902663,5.77487042554182,9.806067702888567,8.243246459012365,1.7182571228794274,9.977529627109531,0.15308727004180955,9.429711946647178,8.69017119216646,4.145118532109768,4.216335307837513,9.311664323746191,9.612090537071644,6.9527266038342805,4.0435989193242605,6.907329323873828,1.6202796131892194,6.324109043936357,2.819599349128672,0.26260963085912525,1.6645687547274068,1.802126444388883,5.0852348254114705,5.768697090899084,7.942172915312236,8.308022213143927,2.0854951374781283,3.8706406127187054,7.270240822802276,0.9560003340464451,8.362647818067403,6.083493951237036,5.4487569181133715,6.790698167150793,7.058103206762334,3.5045657813818987,2.9980190972550558,9.710560337374206,4.266032437092779,9.823784083755855,4.693644836693254,5.264446126168427,9.329016028869912,8.507493732157235,8.10322754964217,0.05848583488834436,1.4984381701118799,2.1183449534929655,6.412026472455001,2.671537419185912,5.889789148634583,0.19184966278874338,4.542134969753484,9.420179272594172,9.150364137185038,1.649605693061571,7.424787175721281,1.2651391652898547,9.008562526700086,6.8049295550506095,3.735177332450166,0.25871960304509,6.804864000776241,5.731658502552959,8.591387114005691,0.6901665156350156,0.8354227293819272,5.436271185192192,3.16583499047715,4.7063305100405195,9.14320046608206,5.373489138977215,8.618004923336978,7.2424242490134505,0.5209703177674663,7.810955086846995,2.826724239496241,7.9759919201386165,4.158408620072949,7.151393220145328,4.050851180347874,0.053702191538218536,8.355799300497111,7.617018168560454,8.752259901127882,8.142534095065685,9.97749764139712,9.26739667074935,6.556745504868338,3.2075715409418426,1.0166209860432907,1.5588977675343019,8.892416181336698,6.123535666748603,1.5332489954189366,8.190946656185623,6.248037789336138,7.622898822585775,5.818075166097067,6.440267496672261,2.2182850872074478,6.768255100030032,4.762559809411407,8.250551029187278,6.286016658145968,4.051329790700553,2.571641712894399,8.92977392177972,9.930419194245507,9.866720606538369,2.206280439988235,6.254508441415383,9.062763338251864,3.902546543848504,4.662253086940973,6.6615038608801225,0.7232446728878572,0.2961787568347951,0.45372725047150064,9.855116365272497,7.073490677705088,0.8578993369112986,4.661571682077081,3.7904731082951204,9.796754702509126,0.12760017784107625,4.908927010077118,0.5471163508301191,4.675485463189661,2.198240340713169,7.646177989914773,0.5985930137453233,1.0046717669249294,6.588146254639744,7.955746191413564,8.936881141672313,2.6576130970609557,6.882238083061598,9.669978386015057,5.340065580222544,1.2166941317776159,4.370404808318973,7.659964208217898,2.685658075137376,7.066310709769281,8.072092184436578,7.5650247244639175,6.438142391193676,0.7331691126477669,9.059748126994364,4.820282758204025,7.002591734215553,4.043249213458062,4.130583097817877,5.502162147853841,9.588521743867975,1.3948115481407464,8.043189887371165,9.949770007901275,2.1029841041598307,3.8654864808491984,2.9335990216556507,4.129461737021627,0.20061056345131334,4.220430549581009,0.06107317574251869,9.815527254208327,7.535914692520274,1.4301164452085113,6.667429133896898,6.85038785061276,0.6683618647038392,5.315123226480338,6.360914109141024,2.7710864390486045,5.001974939059095,6.234491940084896,2.129638687713784,9.210179117132265,2.2970776707270812,2.8685832343713558,2.958741404816332,9.04318071957999,9.143026577530623,3.7527134854692967,5.778471654233135,5.077206532836218,5.461102730274474,6.1838337280273485,4.233218560959353,8.971665535840053,3.0350032409545213,5.893392214322006,1.2279477223834934,9.860991180101772,1.0003154034019568,5.14947600434009,8.423621516349357,0.7799263084056207,8.569938492867609,6.1468298755652695,8.93692305197364,6.007241613105727,1.944058930827206,5.0052639708663875,4.984437425604662,4.817914550691507,3.0289384769188876,6.7192605504253455,1.1831107279349795,1.9479969064088287,7.381506945293877,2.937939262687508,9.133081357671994,6.9071395624719045,4.924166605520042,3.9443020605107515,2.836081532338708,9.171838060489335,4.763192161922114,9.601641800273251,7.875558155237583,2.994114266229908,1.6194408805469007,3.0203555518878433,9.073771660559306,8.92309381052668,4.549217894571418,0.7900456942012024,8.743692802779304,3.0092629417364303,6.603385911211368,2.281045139973601,6.111196151869089,2.953127242851139,6.03226718300407,4.705722259763885,5.102443601704172,7.036422169656462,2.0054900431476863,3.9533576335287757,8.163886221352685,5.544556763990767,3.6951406608885207,3.881653519860553,6.15031393829732,1.8489257866985342,6.315346294791297,8.05907189859293,2.2306383174408118,3.16951657142285,7.7650816668434,4.127567939053176,4.656839249502067,4.8730220345751025,5.700692484238528,3.5012695891279977,4.8608641158329124,7.844317596929928,6.686566751241491,2.798353615573783,1.2398553271283963,1.4564976159895027,3.755925028655487,9.2470750162033,4.2621084878710525,7.883035734365535,2.8939365086153646,9.103208967640628,4.57503660784038,0.10957911906841922,4.923268547628181,7.048724822137437,7.401537076470621,6.568099969019907,6.205952484074302,6.969006646488955,6.9971084063166655,4.761911670612886,3.2216506148100033,4.292174934243221,6.977044230354967,4.765471175500384,3.228446277344883,3.395650222400113,8.703473976805732,9.350285742251593,5.529521847782006,6.156543845126343,1.3359125123232363,9.99305489384919,9.578296987985926,1.780166509682386,4.597572817632518,5.4164524885958665,9.45330659876047,9.1220432491808,1.5006654438960343,4.878957935416723,1.3898175243840027,5.6326072366727225,7.275043568192457,3.908730119533592,6.94334394895635,3.3176362425346895,2.5520003599102314,0.3903631291393439,2.5936002597718577,3.8807597486964474,1.8717291981245565,7.530396985587742,4.471304957053999,8.23470808467855,7.946692304876155,6.2288465537605076,2.8062372014707093,3.877337579222069,7.135949490551945,9.582420694312603,3.0339328512606922,6.923396537727857,6.744984814562713,3.85658115291732,2.8015755634465345,8.629098348749249,8.379626103154333,7.664785791149205,1.0984005739727754,9.406068235979657,0.317847436208909,0.18584534947275522,6.0628427782384815,8.58218018685559,7.080328441011985,9.762455947325233,5.7642988787147225,4.089115976332973,6.3104036466629925,3.19237970009951,1.1786963800991046,6.343641910538656,3.0483251134159506,8.74418815184788,5.458462786202373,3.3228807828095697,9.545295824122901,3.954118114310121,5.6463542180490105,0.6194461844291044,0.5918719284605078,7.4515365622251295,2.4323764388378977,6.016446744150288,5.537028172567342,8.198400505564827,3.20154636173527,2.9514239476684856,0.288388215142692,3.360664754789602,9.216324676055688,4.154408637798522,9.401993209767491,0.7428309012322565,6.6449393803634464,9.239140556569831,6.207789179989842,4.719927344750177,9.425576301893248,1.0338827797471595,4.527530392186105,8.659677917844723,0.43918211457191214,1.5501244112561907,1.3954060916159805,4.994124917911005,1.320723735658611,5.965259486034018,7.884040358215561,5.637265669580456,6.0590717298675045,9.62353366647158,7.16068016976376,6.53989475156483,9.934728156873224,8.175016248579947,6.527277976288534,7.249596521849064,2.0032391978555997,3.879966013554801,2.2101757065972505,2.980460321221392,5.2660452398980695,6.547529912577796,0.30099263353178474,2.6502662947653377,2.1966860301581947,3.231748475586045,2.589586819005172,3.854049091124363,3.3625579892614255,7.174738463369725,8.81169484974398,9.34092135169141,2.2483073591735425,6.535924972327416,5.086959474282995,5.429907507963989,9.406661863767408,2.526664857027723,4.795523279733558,2.9805888225923582,3.122328059218822,8.6323323326543,0.2737157269840429,7.157656972153063,0.5655129006142334,0.2320261657903333,4.417834882330586,3.718647850979133,9.253028025993101,6.622995085795235,9.768322875780449,4.660744823784988,2.895374113887492,3.027643361118233,0.49321602488964,9.929967640919976,6.992377956260798,1.3392974010714442,9.023487788554895,9.991479356529352,6.936948435746631,7.908955853949637,6.0270241171865795,1.7034400160437513,9.199900632865766,7.387105397699562,9.330856852771607,3.294004637389485,4.580504416380609,7.478625319273224,3.0265270385813503,5.959772054925876,7.907695449401386,4.222387697944605,1.8713659004914085,1.2452356923930186,6.5720737745569195,9.75103660249901,9.387145787901831,1.1822298155928923,4.0919704694924715,7.532276428717433,0.8104023184419384,2.84798471962153,2.2670144080444965,0.8690619361893059,0.8241798688994151,2.2739059598149525,8.899500452124823,3.2780048288858077,3.0423369627550434,7.516103827426708,4.20526626067973,6.511562433684306,0.7532399579655857,1.0019458107011303,7.924662413212853,2.8719919854888443,3.4353924868782837,3.293338565556976,6.361809870225825,8.06045553097254,4.340531703373083,5.080845610140883,3.8576827761942645,1.2151356105283195,7.156723881485982,7.093688313547537,0.415751105175699,8.288389532864587,6.6276751669527245,0.7458177582954528,7.453848348815752,8.72623598031179,9.899324527706579,6.821936251642615,1.8395943099075063,2.1163786677724783,9.401007915897031,4.115998182405354,3.232433560681096,4.110134101753038,1.5600487693025822,3.322676954077073,5.614483088529276,9.55814133290884,8.458841138458329,9.410734895786314,4.003764941793502,0.26718074934511504,9.227013519924121,1.2467315441684002,1.0278929471131693,5.402828142741754,1.8406537105180254,1.0404849483950507,2.649805703353305,8.941654386672164,5.234222673174232,8.755194150746332,4.487973023340621,5.983236507390258,9.886155133987701,2.533257429285025,4.195700033255989,0.8812745812688294,0.7585210555402999,9.011055954533667,8.634909416606792,1.502977959934293,9.696523660952003,5.540573936038406,9.934184039711395,9.84136684863705,1.30295087895268,0.9216825615812141,1.3712646781030546,4.445833260434107,5.776284802198292,2.30195641309644,3.6021633601164393,2.4353062811679815,7.877898169498893,9.354148955798502,0.422639085239751,7.3776611994785535,4.300762221189904,9.070310645832542,1.989299622743519,5.976974631905996,5.420395612005848,5.329843270391692,2.1750674948928173,9.52230168890564,0.7461598616101472,6.308954228477683,9.655572224521979,0.8694221850660355,2.6024065607200075,0.640994477338368,4.301495731679581,5.37447672638671,8.312268743916807,1.6210981703794514,0.5508791457492079,4.063817492273067,9.375706422333804,7.8027230420559395,9.98309620552691,2.3822293171527265,0.699127314924608,0.21224685761611406,9.330694210704406,7.363754519417092,7.638863842560191,7.1495887909473055,4.566361334778398,0.09572732681025764,1.5713746524508099,1.5403508711994873,1.8785166644235662,4.16716032159385,2.276126358153787,9.701374227758246,5.8517240142755185,5.139123547523443,3.9464622686124784,6.776795950213057,0.36756039052342704,2.0366988770798455,5.816630530637075,0.11375586694604589,3.5213213157156242,4.283308259578051,5.42565703580415,6.825279243836075,0.6243402594144065,5.962210122047374,9.62346332428976,1.4377856413671597,2.693883425511936,5.308242811722746,2.0288853799233597,4.280346064414715,9.829444235730541,6.424797361571574,7.412951230150533,3.927021349075961,8.160362887395966,7.412818759511747,1.7865486622736748,4.25852290587557,1.5459244922257764,7.936700387233144,9.252131808942261,4.417140825102088,6.25694038325461,3.37972794053911,4.043051619257518,9.582928293892984,8.664793603066165,1.1352755265394832,2.904154915457555,6.768528485507508,8.23115540377339,9.678293659608105,2.8764286922713245,8.481256301406647,6.392453449823703,4.743204886501012,0.15756225773345012,7.192599793886314,3.1353560515527756,3.887642409294507,0.6852150944140756,5.823968039129825,0.8990132804094908,3.321793978065748,7.784948826180127,0.9500296392857921,8.398209356961598,2.4286998743940003,6.224554417853225,0.06065332054616013,8.115338952462505]}

},{}],131:[function(require,module,exports){
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
var exp = require( '@stdlib/math/base/special/exp' );
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
	var mgf = factory( 0.0, 1.0 );
	t.equal( typeof mgf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 0.0, 1.0 );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, 1.0 );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 1.0, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `s`, the created function always returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 0.0, -1.0 );

	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 0.0, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( PINF, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NINF, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `s = 0`, the created function evaluates the MGF of the degenerate distribution', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 0.0, 0.0 );

	y = mgf( 0.5 );
	t.equal( y, 1.0, 'returns exp( 0.0 * 0.5 )' );

	mgf = factory( 2.0, 0.0 );
	y = mgf( 0.5 );
	t.equal( y, exp( 1.0 ), 'returns exp( 2.0 * 0.5 )' );

	y = mgf( 2.0 );
	t.equal( y, exp( 4.0 ), 'returns exp( 2.0 * 2.0 )' );

	t.end();
});

tape( 'the created function evaluates the MGF for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var mgf;
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
		mgf = factory( mu[i], s[i] );
		y = mgf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 2.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the MGF for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var mgf;
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
		mgf = factory( mu[i], s[i] );
		y = mgf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 2.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the MGF for `x` given large variance ( = large `s`)', function test( t ) {
	var expected;
	var delta;
	var mgf;
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
		mgf = factory( mu[i], s[i] );
		y = mgf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 2.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/mgf/test/test.factory.js")
},{"./../lib/factory.js":125,"./fixtures/julia/large_variance.json":128,"./fixtures/julia/negative_mean.json":129,"./fixtures/julia/positive_mean.json":130,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":55,"@stdlib/constants/float64/pinf":57,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/abs":66,"@stdlib/math/base/special/exp":75,"tape":286}],132:[function(require,module,exports){
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
var mgf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `mgf` functions', function test( t ) {
	t.equal( typeof mgf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/mgf/test/test.js")
},{"./../lib":126,"tape":286}],133:[function(require,module,exports){
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
var mgf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = mgf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a negative `s`, the function returns `NaN`', function test( t ) {
	var y;

	y = mgf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the MGF for `x` given positive `mu`', function test( t ) {
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
		y = mgf( x[i], mu[i], s[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 2.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the MGF for `x` given negative `mu`', function test( t ) {
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
		y = mgf( x[i], mu[i], s[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 2.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the MGF for `x` given large variance ( = large `s` )', function test( t ) {
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
		y = mgf( x[i], mu[i], s[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', mu: '+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 2.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/mgf/test/test.mgf.js")
},{"./../lib":126,"./fixtures/julia/large_variance.json":128,"./fixtures/julia/negative_mean.json":129,"./fixtures/julia/positive_mean.json":130,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":55,"@stdlib/constants/float64/pinf":57,"@stdlib/math/base/assert/is-nan":64,"@stdlib/math/base/special/abs":66,"tape":286}],134:[function(require,module,exports){
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

},{"./is_number.js":137}],135:[function(require,module,exports){
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

},{"./is_number.js":137,"./zero_pad.js":141}],136:[function(require,module,exports){
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

},{"./main.js":139}],137:[function(require,module,exports){
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

},{"./format_double.js":134,"./format_integer.js":135,"./is_string.js":138,"./space_pad.js":140,"./zero_pad.js":141}],140:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
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

},{"./main.js":143}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{"./main.js":146}],145:[function(require,module,exports){
arguments[4][138][0].apply(exports,arguments)
},{"dup":138}],146:[function(require,module,exports){
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

},{"./is_string.js":145,"@stdlib/string/base/format-interpolate":136,"@stdlib/string/base/format-tokenize":142}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

},{}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":150}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":152}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":156}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
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

},{"./define_property.js":154}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":153,"./has_define_property_support.js":155,"./polyfill.js":157}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":144}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":159,"./polyfill.js":160,"@stdlib/assert/has-tostringtag-support":24}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":161}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":161,"./tostringtag.js":162,"@stdlib/assert/has-own-property":20}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":147}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){

},{}],165:[function(require,module,exports){
arguments[4][164][0].apply(exports,arguments)
},{"dup":164}],166:[function(require,module,exports){
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
},{"base64-js":163,"buffer":166,"ieee754":269}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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
},{"_process":276}],169:[function(require,module,exports){
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

},{"events":167,"inherits":270,"readable-stream/lib/_stream_duplex.js":171,"readable-stream/lib/_stream_passthrough.js":172,"readable-stream/lib/_stream_readable.js":173,"readable-stream/lib/_stream_transform.js":174,"readable-stream/lib/_stream_writable.js":175,"readable-stream/lib/internal/streams/end-of-stream.js":179,"readable-stream/lib/internal/streams/pipeline.js":181}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
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
},{"./_stream_readable":173,"./_stream_writable":175,"_process":276,"inherits":270}],172:[function(require,module,exports){
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
},{"./_stream_transform":174,"inherits":270}],173:[function(require,module,exports){
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
},{"../errors":170,"./_stream_duplex":171,"./internal/streams/async_iterator":176,"./internal/streams/buffer_list":177,"./internal/streams/destroy":178,"./internal/streams/from":180,"./internal/streams/state":182,"./internal/streams/stream":183,"_process":276,"buffer":166,"events":167,"inherits":270,"string_decoder/":285,"util":164}],174:[function(require,module,exports){
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
},{"../errors":170,"./_stream_duplex":171,"inherits":270}],175:[function(require,module,exports){
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
},{"../errors":170,"./_stream_duplex":171,"./internal/streams/destroy":178,"./internal/streams/state":182,"./internal/streams/stream":183,"_process":276,"buffer":166,"inherits":270,"util-deprecate":294}],176:[function(require,module,exports){
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
},{"./end-of-stream":179,"_process":276}],177:[function(require,module,exports){
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
},{"buffer":166,"util":164}],178:[function(require,module,exports){
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
},{"_process":276}],179:[function(require,module,exports){
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
},{"../../../errors":170}],180:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],181:[function(require,module,exports){
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
},{"../../../errors":170,"./end-of-stream":179}],182:[function(require,module,exports){
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
},{"../../../errors":170}],183:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":167}],184:[function(require,module,exports){
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

},{"./":185,"get-intrinsic":260}],185:[function(require,module,exports){
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

},{"es-define-property":245,"es-errors/type":251,"function-bind":259,"get-intrinsic":260,"set-function-length":280}],186:[function(require,module,exports){
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

},{"./lib/is_arguments.js":187,"./lib/keys.js":188}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],189:[function(require,module,exports){
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

},{"es-define-property":245,"es-errors/syntax":250,"es-errors/type":251,"gopd":261}],190:[function(require,module,exports){
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

},{"define-data-property":189,"has-property-descriptors":262,"object-keys":274}],191:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],192:[function(require,module,exports){
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

},{"./ToNumber":223,"./ToPrimitive":225,"./Type":230}],193:[function(require,module,exports){
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

},{"../helpers/isFinite":238,"../helpers/isNaN":239,"../helpers/isPrefixOf":240,"./ToNumber":223,"./ToPrimitive":225,"es-errors/type":251,"get-intrinsic":260}],194:[function(require,module,exports){
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

},{"call-bind/callBound":184,"es-errors/type":251}],195:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":253}],196:[function(require,module,exports){
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

},{"./DayWithinYear":199,"./InLeapYear":203,"./MonthFromTime":213,"es-errors/eval":246}],197:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":244,"./floor":234}],198:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":234}],199:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":197,"./DayFromYear":198,"./YearFromTime":232}],200:[function(require,module,exports){
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

},{"./modulo":235}],201:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":242,"./IsAccessorDescriptor":204,"./IsDataDescriptor":206,"es-errors/type":251}],202:[function(require,module,exports){
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

},{"../helpers/timeConstants":244,"./floor":234,"./modulo":235}],203:[function(require,module,exports){
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

},{"./DaysInYear":200,"./YearFromTime":232,"es-errors/eval":246}],204:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":242,"es-errors/type":251,"hasown":268}],205:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":271}],206:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":242,"es-errors/type":251,"hasown":268}],207:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":204,"./IsDataDescriptor":206,"./IsPropertyDescriptor":208,"es-errors/type":251}],208:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":242}],209:[function(require,module,exports){
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

},{"../helpers/isFinite":238,"../helpers/timeConstants":244}],210:[function(require,module,exports){
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

},{"../helpers/isFinite":238,"./DateFromTime":196,"./Day":197,"./MonthFromTime":213,"./ToInteger":222,"./YearFromTime":232,"./floor":234,"./modulo":235,"get-intrinsic":260}],211:[function(require,module,exports){
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

},{"../helpers/isFinite":238,"../helpers/timeConstants":244,"./ToInteger":222}],212:[function(require,module,exports){
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

},{"../helpers/timeConstants":244,"./floor":234,"./modulo":235}],213:[function(require,module,exports){
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

},{"./DayWithinYear":199,"./InLeapYear":203}],214:[function(require,module,exports){
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

},{"../helpers/isNaN":239}],215:[function(require,module,exports){
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

},{"../helpers/timeConstants":244,"./floor":234,"./modulo":235}],216:[function(require,module,exports){
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

},{"./Type":230}],217:[function(require,module,exports){
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


},{"../helpers/isFinite":238,"./ToNumber":223,"./abs":233,"get-intrinsic":260}],218:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":244,"./DayFromYear":198}],219:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":244,"./modulo":235}],220:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],221:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":223}],222:[function(require,module,exports){
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

},{"../helpers/isFinite":238,"../helpers/isNaN":239,"../helpers/sign":243,"./ToNumber":223,"./abs":233,"./floor":234}],223:[function(require,module,exports){
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

},{"./ToPrimitive":225,"call-bind/callBound":184,"safe-regex-test":279}],224:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":254}],225:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":256}],226:[function(require,module,exports){
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

},{"./IsCallable":205,"./ToBoolean":220,"./Type":230,"es-errors/type":251,"hasown":268}],227:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":260}],228:[function(require,module,exports){
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

},{"../helpers/isFinite":238,"../helpers/isNaN":239,"../helpers/sign":243,"./ToNumber":223,"./abs":233,"./floor":234,"./modulo":235}],229:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":223}],230:[function(require,module,exports){
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

},{}],231:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":197,"./modulo":235}],232:[function(require,module,exports){
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

},{"call-bind/callBound":184,"get-intrinsic":260}],233:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":260}],234:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],235:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":241}],236:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":244,"./modulo":235}],237:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":192,"./5/AbstractRelationalComparison":193,"./5/Canonicalize":194,"./5/CheckObjectCoercible":195,"./5/DateFromTime":196,"./5/Day":197,"./5/DayFromYear":198,"./5/DayWithinYear":199,"./5/DaysInYear":200,"./5/FromPropertyDescriptor":201,"./5/HourFromTime":202,"./5/InLeapYear":203,"./5/IsAccessorDescriptor":204,"./5/IsCallable":205,"./5/IsDataDescriptor":206,"./5/IsGenericDescriptor":207,"./5/IsPropertyDescriptor":208,"./5/MakeDate":209,"./5/MakeDay":210,"./5/MakeTime":211,"./5/MinFromTime":212,"./5/MonthFromTime":213,"./5/SameValue":214,"./5/SecFromTime":215,"./5/StrictEqualityComparison":216,"./5/TimeClip":217,"./5/TimeFromYear":218,"./5/TimeWithinDay":219,"./5/ToBoolean":220,"./5/ToInt32":221,"./5/ToInteger":222,"./5/ToNumber":223,"./5/ToObject":224,"./5/ToPrimitive":225,"./5/ToPropertyDescriptor":226,"./5/ToString":227,"./5/ToUint16":228,"./5/ToUint32":229,"./5/Type":230,"./5/WeekDay":231,"./5/YearFromTime":232,"./5/abs":233,"./5/floor":234,"./5/modulo":235,"./5/msFromTime":236}],238:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":239}],239:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],240:[function(require,module,exports){
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

},{"call-bind/callBound":184}],241:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],242:[function(require,module,exports){
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

},{"es-errors/type":251,"hasown":268}],243:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],244:[function(require,module,exports){
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

},{}],245:[function(require,module,exports){
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

},{"get-intrinsic":260}],246:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],247:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],248:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],249:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],250:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],251:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],252:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],253:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":251}],254:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":255,"./RequireObjectCoercible":253}],255:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],256:[function(require,module,exports){
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

},{"./helpers/isPrimitive":257,"is-callable":271}],257:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],258:[function(require,module,exports){
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

},{}],259:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":258}],260:[function(require,module,exports){
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

},{"es-errors":247,"es-errors/eval":246,"es-errors/range":248,"es-errors/ref":249,"es-errors/syntax":250,"es-errors/type":251,"es-errors/uri":252,"function-bind":259,"has-proto":263,"has-symbols":264,"hasown":268}],261:[function(require,module,exports){
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

},{"get-intrinsic":260}],262:[function(require,module,exports){
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

},{"es-define-property":245}],263:[function(require,module,exports){
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

},{}],264:[function(require,module,exports){
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

},{"./shams":265}],265:[function(require,module,exports){
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

},{}],266:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":265}],267:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":259}],268:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":259}],269:[function(require,module,exports){
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

},{}],270:[function(require,module,exports){
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

},{}],271:[function(require,module,exports){
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

},{}],272:[function(require,module,exports){
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

},{"call-bind/callBound":184,"has-tostringtag/shams":266}],273:[function(require,module,exports){
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

},{"./isArguments":275}],274:[function(require,module,exports){
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

},{"./implementation":273,"./isArguments":275}],275:[function(require,module,exports){
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

},{}],276:[function(require,module,exports){
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

},{}],277:[function(require,module,exports){
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
},{"_process":276,"through":292,"timers":293}],278:[function(require,module,exports){
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

},{"buffer":166}],279:[function(require,module,exports){
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

},{"call-bind/callBound":184,"es-errors/type":251,"is-regex":272}],280:[function(require,module,exports){
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

},{"define-data-property":189,"es-errors/type":251,"get-intrinsic":260,"gopd":261,"has-property-descriptors":262}],281:[function(require,module,exports){
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

},{"es-abstract/es5":237,"function-bind":259}],282:[function(require,module,exports){
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

},{"./implementation":281,"./polyfill":283,"./shim":284,"define-properties":190,"function-bind":259}],283:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":281}],284:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":283,"define-properties":190}],285:[function(require,module,exports){
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
},{"safe-buffer":278}],286:[function(require,module,exports){
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
},{"./lib/default_stream":287,"./lib/results":289,"./lib/test":290,"_process":276,"defined":191,"through":292,"timers":293}],287:[function(require,module,exports){
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
},{"_process":276,"fs":165,"through":292}],288:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":276,"timers":293}],289:[function(require,module,exports){
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
},{"_process":276,"events":167,"function-bind":259,"has":267,"inherits":270,"object-inspect":291,"resumer":277,"through":292,"timers":293}],290:[function(require,module,exports){
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
},{"./next_tick":288,"deep-equal":186,"defined":191,"events":167,"has":267,"inherits":270,"path":168,"string.prototype.trim":282}],291:[function(require,module,exports){
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

},{}],292:[function(require,module,exports){
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
},{"_process":276,"stream":169}],293:[function(require,module,exports){
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
},{"process/browser.js":276,"timers":293}],294:[function(require,module,exports){
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
},{}]},{},[131,132,133]);
